import axios from 'axios';
import _ from 'lodash';
import Qs from 'qs';

export default {
  invoke: function (options) {
    return new Promise((resolve, reject) => {
      if (!util.ajax) {
        util.ajax = axios.create({
          baseURL: window._TY_APIHost,
          timeout: 30000,
          withCredentials: true,
        });
      }
      util
        .ajax(options)
        .then(function (response) {
          if (
            response &&
            response['data'] &&
            response['data']['code'] &&
            response['data']['code'] == -420 &&
            util.isWX()
          ) {
            //微信端没有登录，跳转微信授权
            location.href = response['data']['message'] || window._TY_SSOURL;
          } else if (
            response &&
            response['data'] &&
            response['data']['code'] &&
            response['data']['code'] <= -400
          ) {
            //所有Code小于等于-400都是属于没有登录授权的，统一走SSOURL配置路径
            if (response['data']['code'] == -401) {
              location.href = window._RS_SSOURL;
            } else {
              location.href = window._TY_SSOURL;
            }
          } else {
            resolve(response);
          }
          // if (response && response['data'] && response['data']['code'] && response['data']['code'] == -420 && util.isWX()) {
          //     //微信端没有登录，跳转微信授权
          //     location.href = response['data']['message'] || window._TY_SSOURL;
          // } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -401) {
          //     //龙眼专用 未登录
          //     location.href = window._TY_SSOURL;
          // } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -400) {
          //     //TY E端未登录
          //     location.href = document.location.protocol + "//" + document.location.host + "/#/ty-login";
          // } else if (response && response['data'] && response['data']['code'] && response['data']['code'] == -410) {
          //     //TY B端未登录
          //     location.href = document.location.protocol + "//" + document.location.host + "/#/ty_b_login";
          // } else {
          //     resolve(response);
          // }
        })
        .catch(function (error) {
          reject(error);
        });
    });
  },

  post: function (url, param, options) {
    return this.invoke(
      _.assignIn(
        {
          url: url,
          method: 'post',
          data: Qs.stringify(param),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
        options,
      ),
    );
  },

  get: function (url, param, options) {
    return this.invoke(
      _.assignIn(
        {
          url: url,
          method: 'get',
          params: param,
        },
        options,
      ),
    );
  },

  resolve: function (str) {
    //TODO
  },

  /**
   * 解析字符串变量
   *
   * VarCodeName -> VarShowName
   *
   * DEMO
   * xxx{{Is_Edit_Status}}xxxaa
   * =>
   * xxx{{内置变量_是否编辑状态}}xxxaa
   *
   * Current_Object:{a:1,b:2,c:"你好",d:"e"}
   * "{{Current_Object}}" => "你好"
   * "{{Current_Object.b}}" => "2"
   *
   * @param {字符串} str
   */
  resolveVar: function (str) {
    return transferVar(str, window.__Mokelay.InternalVarDesc);
  },
  /**
   * 解析字符串函数
   * "edit.html#{{getQueryValue('ui',{a:1,b:2})}}"
   * =>
   * "edit.html#{{内置函数_获取URL Query值('参数名:ui','')}}"
   * {{内置函数名(参数1:参数值，参数2:参数值...)}}
   *
   * @param {字符串} str
   * @returns
   */
  resolveFunc: function (str) {
    return transferFunc(str, window.__Mokelay.InternalFuncDesc);
  },

  /**
   * 执行字符串
   * @param {字符串} str
   * @returns
   */
  executeStr: function (str) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    var compiled = _.template(str);
    var data = Object.assign({}, window.__Mokelay.InternalVar, window.__Mokelay.InternalFunc);
    // console.log(data);
    return compiled(data);
  },
};

/**
 * 根据树形结构的属性描述
 * [
		{
			uuid:"internalVar",
			varShowName:"内置变量",
			varCodeName:"internalVar",
			varDataType:"Object",
			varDataDesc:[{
        uuid:"isEditStatus",
        varShowName:"是否编辑状态",
        varCodeName:"isEditStatus",
        varDataType:"Boolean",
        defaultValue:null
      },{
        uuid:"localStorage",
        varShowName:"本地缓存",
        varCodeName:"localStorage",
        varDataType:"Object",
        defaultValue:null,
        varDataDesc:[{
          uuid:"phone",
          varShowName:"手机号",
          varCodeName:"phone",
          varDataType:"String",
          defaultValue:null
        }],
      }],
			defaultValue:null
		}
	]
 *
 * 将下面字符串
 * xxx{{internalVar.isEditStatus}}xxxaa{{internalVar.localStorage.phone}}xxxx
 * 转换成中文
 * xxx{{内置变量.是否编辑状态}}xxxaa{{内置变量.本地缓存.手机号}}xxxx
 *
 */
function transferVar(str, descTree) {
  for (let i = 0; i < descTree.length; i++) {
    const varData = descTree[i];
    const varCodeName = varData.varCodeName;
    const varShowName = varData.varShowName;
    str = str.replace(new RegExp(`{{${varCodeName}}}`, 'g'), `{{${varShowName}}}`);
    if (varData.varDataDesc) {
      str = transferVarNested(str, varData.varDataDesc, varCodeName, varShowName);
    }
  }
  return str;
}
function transferVarNested(str, varDataDesc, parentCodeName, parentShowName) {
  for (let i = 0; i < varDataDesc.length; i++) {
    const nestedVarData = varDataDesc[i];
    const nestedCodeName = `${parentCodeName}.${nestedVarData.varCodeName}`;
    const nestedShowName = `${parentShowName}.${nestedVarData.varShowName}`;
    str = str.replace(new RegExp(`{{${nestedCodeName}}}`, 'g'), `{{${nestedShowName}}}`);
    if (nestedVarData.varDataDesc) {
      str = transferVarNested(str, nestedVarData.varDataDesc, nestedCodeName, nestedShowName);
    }
  }
  return str;
}

/**
 * 解析方法
 *
 * @param {字符串} str
 * @param {方法描述Tree} descTree
 */
function transferFunc(str, descTree) {
  //TODO
}
