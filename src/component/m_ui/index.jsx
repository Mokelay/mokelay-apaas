import { useLocation, useNavigate, useLoaderData, useRouteError } from 'react-router-dom';
import { useEffect } from 'react';

import M_View from '../m_view/index';
import Util from '../../util/util';

/**
 * 渲染UI
 *
 * @returns DOM
 */
export default function M_UI() {
  const navigate = useNavigate();
  //把搜索参数放到VarCenter中，提供给界面配置用
  window.__Mokelay.VarCenter.set(
    'InternalVar.URL_Search_Params',
    new URLSearchParams(useLocation().search),
  );

  let error = useRouteError();

  var ui = {};
  if (!error) {
    const loaderData = useLoaderData() || {};
    ui = loaderData['ui'];
  }

  //存储所有组件的Key和Ref
  const ComponentInstantMap = {};
  window.__Mokelay.ComponentInstantMap = ComponentInstantMap;

  useEffect(() => {
    //如果UI配置不合法，则转到404页面
    if (error) {
      if (error.appInvalid) {
        //APP 不存在，默认到编辑APP首页
        navigate('/app_editor/');
      } else if (error.uiInvalid) {
        //UI不存在
        var app = error['app'];
        var appUUID = error['appUUID'];
        navigate('/' + appUUID + '/' + app['pages']['Page_404']);
      }
    }
  }, []);

  //处理标题
  document.title = Util.executeStr(ui['title'] || '');

  //处理数据源DSList
  window.__Mokelay.DataSource_List = ui['dsList'] || [];

  //处理自定义变量
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
      var valueChangeActions = cv['valueChangeActions'] || [];
      if (valueChangeActions.length > 0) {
        valueChangeActions.forEach(function (act) {
          window.__Mokelay.VarCenter.on(varPath, function (newData) {
            console.log('update action ');
            console.log(newData);
            var targetUUId = act['targetUUId'];
            var methodCodeName = act['methodCodeName'];
            var paramsData = act['paramsData'];

            var comIns = window.__Mokelay.ComponentInstantMap[targetUUId];
            var targetEl = comIns['ref'];
            if (targetEl) {
              var method = targetEl['current'][methodCodeName];
              if (method) {
                method(null, ...Util.dataTransferAll(paramsData));
              } else {
                console.log('Can not find method:' + methodCodeName);
              }
            } else {
              console.log('Can not find target dom:' + targetUUId);
            }
          });
        });
      }

      //远程开始获取数据
      Util.loadByDS(dsUUID, dsInputParamsValue)
        .then(function (r) {
          window.__Mokelay.VarCenter.set(varPath, r['data']);
        })
        .catch(function (r) {
          console.log(r);
        });
    }
  });

  return ui['view'] ? <M_View initView={ui['view']} /> : <></>;
}
