import { useEffect } from 'react';

import M_View from '../m_view/index';
import Util from '../../util/util';

/**
 * 渲染UI
 *
 * @returns DOM
 */
export default function M_UI({ ui }) {
  //存储所有组件的Key和Ref
  const ComponentInstantMap = {};
  window.__Mokelay.ComponentInstantMap = ComponentInstantMap;

  //检查UI配置的合法性
  useEffect(() => {}, []);

  //处理标题
  document.title = Util.executeStr(ui['title'] || '');

  //处理数据源DSList
  window.__Mokelay.DataSource_List = ui['dsList'] || [];

  //处理自定义变量
  window.__Mokelay.VarCenter.set('CustomVar', {});
  var customVars = ui['customVars'] || [];
  window.__Mokelay.CustomVarDesc = [];
  customVars.map(function (cv) {
    window.__Mokelay.CustomVarDesc.push(cv);

    var varPath = 'CustomVar.' + cv['varCodeName'];

    var valueAssignType = cv['valueAssignType'] || 'VarValue';
    if (valueAssignType == 'VarValue') {
      //直接赋值
      window.__Mokelay.VarCenter.set(varPath, cv['varValue']);
    } else if (valueAssignType == 'RemoteValue') {
      // window.__Mokelay.VarCenter.set(varPath, null);
      //通过DS来获取
      var dsUUID = cv['dsUUID'];
      var dsInputParamsValue = cv['dsInputParamsValue'];

      //当赋值后，触发的action,action处理需要和m_view合并
      //TODO 临时解决方案
      //1. 这里为了防止重复on， 用一个全局变量window.__Mokelay.VarOnMap来控制
      //2. 用setTimeou方法，解决window.__Mokelay.ComponentInstantMap为的空的问题
      // window.__Mokelay.VarCenter.off(varPath, f);
      if (!window.__Mokelay.VarOnMap) {
        window.__Mokelay.VarOnMap = {};
      }
      if (!window.__Mokelay.VarOnMap[ui['uuid']]) {
        window.__Mokelay.VarOnMap[ui['uuid']] = true;

        var valueChangeActions = cv['valueChangeActions'] || [];
        if (valueChangeActions.length > 0) {
          valueChangeActions.forEach(function (act) {
            var f = function (newData) {
              console.log('###Begin to update var action###');
              console.log(newData);
              console.log('################################');
              var targetUUId = act['targetUUId'];
              var methodCodeName = act['methodCodeName'];
              var paramsData = act['paramsData'];

              var comIns = window.__Mokelay.ComponentInstantMap[targetUUId];
              if (comIns && comIns['ref']) {
                var targetEl = comIns['ref'];
                var method = targetEl['current'][methodCodeName];
                if (method) {
                  method(null, ...Util.dataTransferAll(paramsData));
                } else {
                  console.log('Can not find method:' + methodCodeName);
                }
              } else {
                console.log('Can not find target dom:' + targetUUId);
                console.log('Begin Show window.__Mokelay.ComponentInstantMap');
                console.log(window.__Mokelay.ComponentInstantMap);
                console.log('End Show window.__Mokelay.ComponentInstantMap');
              }
            };

            console.log(varPath + ' is on .');
            window.__Mokelay.VarCenter.on(varPath, function (newData) {
              setTimeout(f, 1, newData);
            });
          });
        }
      }

      //远程开始获取数据
      Util.loadByDS(dsUUID, dsInputParamsValue)
        .then(function (r) {
          //一旦设置了值，则触发action
          window.__Mokelay.VarCenter.set(varPath, r['data']);
        })
        .catch(function (r) {
          console.log(r);
        });
    }
  });

  return ui['view'] ? <M_View initView={ui['view']} /> : <div>NO View</div>;
}
