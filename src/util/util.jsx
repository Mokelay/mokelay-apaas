import axios from 'axios';
import _ from 'lodash';
import Qs from 'qs';
import { createElement, useRef } from 'react';

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

  /**
   * 统一的View渲染函数
   * 适用于任何UI的render，比如Page, Container,编辑器面板等
   *
   * @param {统一View JSON对象} view
   * @returns
   */
  renderView: function (view) {
    var ref = useRef(null);
    var t = this;
    //处理属性
    var attributes = view['attributes'] || [];
    var pros = {};
    attributes.map(function (attr) {
      var proName = attr['varCodeName'];
      // 针对String类型的value，是否统一解析变量
      var proValue = attr['value'];
      pros[proName] = proValue;
    });

    //处理Key
    pros['key'] = view['uuid'];

    //处理ref
    pros['ref'] = ref;
    window.__Mokelay.ComponentInstantMap[pros['key']] = pros['ref'];

    //处理样式
    var styles = view['styles'];

    //处理动作
    var actions = view['actions'] || [];
    actions.map(function (action) {
      var eventCodeName = action['eventCodeName'];
      var targetUUId = action['targetUUId'];
      var methodCodeName = action['methodCodeName'];
      //TODO 处理参数传递
      // var paramsData = action['paramsData'];

      pros[eventCodeName] = function () {
        var targetEl = window.__Mokelay.ComponentInstantMap[targetUUId];
        if (targetEl) {
          var method = targetEl['current'][methodCodeName];
          if (method) {
            method();
          } else {
            console.log('Can not find method:' + methodCodeName);
          }
        } else {
          console.log('Can not find target dom:' + targetUUId);
        }
      };
    });

    //处理模态
    var modals = view['modals'];
    //每一层的modal处理方式抽象

    //处理子节点
    var children = [];
    var childViews = view['children'] || [];
    childViews.map(function (childView) {
      children.push(t.renderView(childView));
    });
    return createElement(window.__Mokelay.ComponentMap[view['component']], pros, children);
  },

  /**
   * 解析字符串
   * DEMO
   * {{内置变量_是否编辑状态}} {{内置变量_localStorage.item.abc}}
   * => {{window.__Mokelay.InternalVar['Is_Edit_Status']}} {{window.__Mokelay.InternalVar['localStorage']['item']['abc']}}
   * @param {字符串} str
   */
  resolve: function (str) {
    return transfer(str, window.__Mokelay.InternalVarDesc);
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
function transfer(str, descTree) {
  for (let i = 0; i < descTree.length; i++) {
    const varData = descTree[i];
    const varCodeName = varData.varCodeName;
    const varShowName = varData.varShowName;
    str = str.replace(new RegExp(`{{${varCodeName}}}`, 'g'), `{{${varShowName}}}`);
    if (varData.varDataDesc) {
      str = transferNested(str, varData.varDataDesc, varCodeName, varShowName);
    }
  }
  return str;
}
function transferNested(str, varDataDesc, parentCodeName, parentShowName) {
  for (let i = 0; i < varDataDesc.length; i++) {
    const nestedVarData = varDataDesc[i];
    const nestedCodeName = `${parentCodeName}.${nestedVarData.varCodeName}`;
    const nestedShowName = `${parentShowName}.${nestedVarData.varShowName}`;
    str = str.replace(new RegExp(`{{${nestedCodeName}}}`, 'g'), `{{${nestedShowName}}}`);
    if (nestedVarData.varDataDesc) {
      str = transferNested(str, nestedVarData.varDataDesc, nestedCodeName, nestedShowName);
    }
  }
  return str;
}
