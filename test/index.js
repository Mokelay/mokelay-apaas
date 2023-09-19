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
 *
 *
将下面的字符串(str)
"edit.html#{{getQueryValue('ui',{pathname:'/abc',search:'?a=222'}, {{internalVar.isEditStatus}})}}"
解析成
"edit.html#{{内置函数_获取URL Query值('参数名:ui','路由对象:/abc', 内置变量.是否编辑状态)}}"

实现函数 transferFunc(str, descTree)
 *
 * @param {*} str
 * @param {*} descTree
 * @returns
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
                transferredParam = param;
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

// 先匹配嵌套双括号，替换成指定内容
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

//变量依赖描述
const varTree = [
  {
    uuid: 'internalVar',
    varShowName: '内置变量',
    varCodeName: 'internalVar',
    varDataType: 'Object',
    varDataDesc: [
      {
        uuid: 'isEditStatus',
        varShowName: '是否编辑状态',
        varCodeName: 'isEditStatus',
        varDataType: 'Boolean',
        defaultValue: null,
      },
      {
        uuid: 'localStorage',
        varShowName: '本地缓存',
        varCodeName: 'localStorage',
        varDataType: 'Object',
        defaultValue: null,
        varDataDesc: [
          {
            uuid: 'phone',
            varShowName: '手机号',
            varCodeName: 'phone',
            varDataType: 'String',
            defaultValue: null,
          },
        ],
      },
    ],
    defaultValue: null,
  },
];

// 函数 依赖描述
const descTree = [
  {
    uuid: '',
    funcShowName: '内置函数_隐藏组件',
    funcCodeName: 'hideView',
    params: [
      {
        varShowName: '组件UUID',
        varCodeName: 'viewUUID',
        varDataType: 'String',
      },
    ],
    returnDataType: null,
  },
  {
    uuid: '',
    funcShowName: '内置函数_获取URL参数',
    funcCodeName: 'getQueryValue',
    params: [
      {
        varShowName: '组件UI',
        varCodeName: 'ui',
        varDataType: 'String',
      },
      {
        varShowName: '路由对象',
        varCodeName: 'obj',
        varDataType: 'Object',
        objShowName: 'pathname',
        subVariableDesc: [
          {
            varShowName: '路径',
            varCodeName: 'pathname',
            varDataType: 'String',
          },
          {
            varShowName: '参数',
            varCodeName: 'search',
            varDataType: 'String',
          },
        ],
      },
      {
        varShowName: '额外变量',
        varCodeName: 'extra',
        varDataType: 'String',
      },
    ],
    returnDataType: null,
  },
];

// const testStr ="edit.html#{{getQueryValue('ui',{pathname:'/abc',search:'?a=222'}, {{internalVar.isEditStatus}})}}";
const testStr = "edit.html#{{getQueryValue('ui',{pathname:'/abc',search:'?a=222'})}}";
console.log('src: ', testStr);
const result = transferFunc(testStr, descTree, varTree);
console.log('dist: ', result);
