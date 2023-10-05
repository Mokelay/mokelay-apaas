import axios from 'axios';
import _ from 'lodash';
import Qs from 'qs';

export default {
  //Ajax invoke
  invoke: function (options) {
    var t = this;
    return new Promise((resolve, reject) => {
      if (!t.ajax) {
        t.ajax = axios.create({
          baseURL: window.__Mokelay.API_HOST,
          timeout: 30000,
          withCredentials: true,
        });
      }
      t.ajax(options)
        .then(function (response) {
          //TODO 如何处理微信容器，已经SSO登录
          if (
            response &&
            response['data'] &&
            response['data']['code'] &&
            response['data']['code'] == -420
          ) {
            //TODO
            //微信端没有登录，跳转微信授权
            // location.href = response['data']['message'] || window._TY_SSOURL;
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

  //POST API
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

  //GET API
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

  //通过DS来获取数据
  loadByDS: function (dsUUID, param, options) {
    var t = this;
    var ds = t.getDSByUUID(dsUUID);

    if (ds != null) {
      var url = t.executeStr(ds['url']);
      var method = ds['method'];
      if (method == 'GET') {
        return this.get(url, param, options);
      } else if (method == 'POST') {
        return this.post(url, param, options);
      }
    } else {
      throw 'no ds config find.';
    }
  },

  //通过UUID获取真实DS
  getDSByUUID: function (dsUUID) {
    var dsList = window.__Mokelay.DataSource_List;
    var ds = null;
    dsList.forEach(function (_ds) {
      if (_ds['uuid'] == dsUUID) {
        ds = _ds;
      }
    });
    return ds;
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

  //Get TemplateObject
  getTemplateObject: function (currentData) {
    return Object.assign(
      {},
      window.__Mokelay.VarCenter.get('InternalVar'),
      window.__Mokelay.InternalFunc,
      window.__Mokelay.VarCenter.get('CustomVar'),
      currentData,
    );
  },

  /**
   * 执行字符串
   * @param {字符串} str
   * @returns
   */
  executeStr: function (str) {
    _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
    var compiled = _.template(str);
    var data = this.getTemplateObject();
    // console.log(data);
    return compiled(data);
  },
  //替换Keys
  replaceKeysDeep: function (obj, keysMap) {
    var t = this;
    return _.transform(obj, function (result, value, key) {
      var currentKey = keysMap[key] || key;
      result[currentKey] = _.isObject(value) ? t.replaceKeysDeep(value, keysMap) : value;
    });
  },

  //Data Format
  dataFormat: function (data, dataType) {
    if (data == null || typeof data == 'undefined') {
      return null;
    } else if (dataType == 'String') {
      return _.toString(data);
    } else if (dataType == 'Integer') {
      return _.toInteger(data);
    } else if (dataType == 'Float') {
      return _.toNumber(data);
    } else if (dataType == 'Boolean') {
      return !!data;
    } else if (dataType == 'Date' || dataType == 'DateTime') {
      return new Date(data);
    } else {
      return JSON.parse(data);
    }
  },

  //Data Transfer ALl
  dataTransferAll: function (dataTransferArr, currentData) {
    var t = this;
    var r = [];
    if (dataTransferArr) {
      dataTransferArr.forEach(function (d) {
        r.push(t.dataTransfer(d, currentData));
      });
    }
    return r;
  },

  //Data Transfer
  dataTransfer: function (dataTransfer, currentData) {
    var t = this;
    if (typeof dataTransfer == 'object') {
      //如何事配置，则进行解析
      var dataType = dataTransfer['dataType'] || 'String';

      var sourceType = dataTransfer['sourceType'];
      if (sourceType == 'DataByInput') {
        //输入获取
        return t.dataFormat(dataTransfer['dataByInput'], dataType);
      } else if (sourceType == 'DataByChooseVar') {
        //选择变量获取
        var optVarPath = dataTransfer['optVarPath'];
        var transferType = dataTransfer['transferType'];
        var transferConfig = dataTransfer['transferConfig'];

        var rootObj = t.getTemplateObject(currentData);
        console.log('###Template Obj:###');
        console.log(rootObj);
        console.log('###################');
        var v = _.get(rootObj, optVarPath);
        if (transferType == 'FieldKeyTransfer') {
          //转化Tree/Object/Array中的节点字段配置
          v = t.replaceKeysDeep(v, transferConfig);
        }
        return v;
      }
    } else {
      //直接返回
      return dataTransfer;
    }
  },

  /**
   * 统一的Event Emit
   * 主要调用来源
   * 1. m_ui 自定义变量的event
   * 2. m_view 组件的event
   * @param {*} args
   * @param {*} act
   */
  eventEmit: function (args, act) {
    var t = this;
    var targetUUId = act['targetUUId'];
    var methodCodeName = act['methodCodeName'];
    var paramsData = act['paramsData'] || [];

    var targetRef = window.__Mokelay.ComponentInstantMap[targetUUId];
    if (targetRef && targetRef['ref'] && targetRef['ref']['current']) {
      var targetEl = targetRef['ref']['current'];
      var method = targetEl[methodCodeName];
      if (method) {
        method(args, ...t.dataTransferAll(paramsData, args));
      } else {
        console.error('Can not find method:' + methodCodeName);
      }
    } else {
      console.error('Can not find target dom:' + targetUUId);
      console.error('Begin Show window.__Mokelay.ComponentInstantMap');
      console.error(window.__Mokelay.ComponentInstantMap);
      console.error('End Show window.__Mokelay.ComponentInstantMap');
    }
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
 * 将下面的字符串(str)
    "edit.html#{{getQueryValue('ui',{pathname:'/abc',search:'?a=222'})}}"
    解析成
    "edit.html#{{内置函数_获取URL Query值('参数名:ui','路由对象:/abc', 内置变量.是否编辑状态)}}"

  TODO: 暂时还不支持嵌套变量, {{xxxxxx{{internalVar.isEditStatus}}xxxxx}} 还无法解析
 * @param {字符串} str
 * @param {方法描述Tree} funcDescTree
 * @param {变量描述Tree} varDescTree
 */
function transferFunc(str, funcDescTree, varDescTree) {
  let result = str;
  // const regex = /{{(.+?)}}/g;
  // const regex = /{{((?:[^{}]|(?:{{.*?}}))+?)}}/g;
  const regex = /{{.*?}}/g; // TODO 嵌套内容还没有支持上
  const matches = str.match(regex);
  console.log('matches: ', matches);

  if (matches) {
    for (const match of matches) {
      const expression = match.substring(2, match.length - 2);
      const funcRegex = /(.+?)\((.+?)\)/;
      const funcMatch = expression.match(funcRegex);
      console.log('funcMatch: ', funcMatch, expression);

      if (funcMatch) {
        const funcName = funcMatch[1];
        // 将 "'ui',{pathname:'/abc',search:'?a=222'},{{xxx.xxx}}" 匹配成三个参数
        const paramRegex = /('.*?'|".*?"|{.*?}|{{.*?}}|\d+|false|true)/g;
        const params = funcMatch[2].match(paramRegex);
        console.log('params: ', params);

        for (const funcDesc of funcDescTree) {
          if (funcDesc.funcCodeName === funcName) {
            let transferParams = [];
            // for (const param of params) {
            for (let i = 0; i < params.length; i++) {
              const param = params[i];
              const paramDesc = funcDesc?.params?.[i];
              if (paramDesc) {
                let transferredParam = '';
                if (paramDesc.varDataType === 'Object') {
                  let paramValue = param;
                  try {
                    paramValue = eval('(' + param + ')'); // 因为参数不是标准json格式，所以这里用eval
                  } catch (e) {
                    console.warn('参数格式化失败:', e);
                  }
                  transferredParam = `${paramDesc.varShowName}:${
                    getObjectValueByKey(paramDesc.objShowName, paramValue, varDescTree) || param
                  }`;
                } else {
                  transferredParam = `${paramDesc.varShowName}:${getValueFromVarDesc(
                    param,
                    varDescTree,
                  )}`;
                }
                transferParams.push(transferredParam);
              } else {
                // 没有描述，直接返回英文
                transferParams.push(param);
              }
            }
            const transferFunc = `${funcDesc.funcShowName}(${transferParams.join(',')})`;
            result = result.replace(match, transferFunc);
            break;
          }
        }
      }
    }
  }
  return result;
}

// 先匹配嵌套双括号，替换成指定内容 TODO
function getSubStr(str) {
  // str.replace(/{{((?:{{[^{}]*}}|[^{}])*)}}/g, "")
}

function getObjectValueByKey(key, obj, varDesc) {
  if (typeof obj === 'string') {
    return getValueFromVarDesc(obj, varDesc);
  }
  return obj?.[key];
}

function getValueFromVarDesc(param, varDesc) {
  if (typeof param !== 'string') {
    return param;
  }
  if (/{{.*}}/.test(param)) {
    // 变量
    return transferVar(param, varDesc);
  }
  return param;
}
