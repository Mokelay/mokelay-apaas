import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import M_View from '../m_view/index';
import Util from '../../util/util';

/**
 * 渲染UI
 *
 * @returns DOM
 */
export default function M_UI() {
  var params = useParams() || {};
  const navigate = useNavigate();

  //TODO 默认UI DSL
  var _Default_UI = {
    title: 'Home',
    view: {
      uuid: 'view_default_page',
      name: '默认页面',
      component: 'M_Page',
      category: 'Container',
    },
  };
  const [ui, setUI] = useState(_Default_UI);

  //把目前URL里的query参数存储到内置变量中
  window.__Mokelay.InternalVar.URL_Search_Params = new URLSearchParams(useLocation().search);

  //存储所有组件的Key和Ref
  const ComponentInstantMap = {};
  window.__Mokelay.ComponentInstantMap = ComponentInstantMap;

  //获取Params参数
  var appUUID = params['app_uuid'];
  var uiUUID = params['ui_uuid'];

  useEffect(() => {
    Util.get('/dsl/ui/' + appUUID + '.json')
      .then(function (r) {
        var _app = r['data'];
        if (_app) {
          //APP默认首页
          var pageDefault = _app['pages']['Page_Default'];

          Util.get(
            '/dsl/ui/' +
              appUUID +
              '/' +
              (typeof uiUUID == 'undefined' ? pageDefault : uiUUID) +
              '.json',
          )
            .then(function (r2) {
              setUI(r2['data']);
            })
            .catch(function (rej) {
              //APP的404页面
              var page404 = _app['pages']['Page_404'];
              navigate('/' + appUUID + '/' + page404);
            });
        }
      })
      .catch(function (err) {
        console.log(err);
        setUI(_Default_UI);
      });
  }, [params]);

  //处理标题
  document.title = Util.executeStr(ui['title']);

  //处理数据源DSList
  window.__Mokelay.DataSource_List = ui['dsList'] || [];

  //处理自定义变量
  var customVars = ui['customVars'] || [];
  window.__Mokelay.CustomVarDesc = [];
  window.__Mokelay.CustomVar = {};
  customVars.map(function (cv) {
    window.__Mokelay.CustomVarDesc.push(cv);
    var valueAssignType = cv['valueAssignType'] || 'VarValue';
    if (valueAssignType == 'VarValue') {
      //直接赋值
      window.__Mokelay.CustomVar[cv['varCodeName']] = cv['varValue'];
    } else if (valueAssignType == 'RemoteValue') {
      //通过DS来获取
      var dsUUID = cv['dsUUID'];
      var dsInputParamsValue = cv['dsInputParamsValue'];
      Util.loadByDS(dsUUID, dsInputParamsValue)
        .then(function (r) {
          window.__Mokelay.CustomVar[cv['varCodeName']] = r['data'];

          //当赋值后，触发的action,action处理需要和m_view合并
          var valueChangeActions = cv['valueChangeActions'] || [];
          if (valueChangeActions.length > 0) {
            valueChangeActions.forEach(function (act) {
              var targetUUId = act['targetUUId'];
              var methodCodeName = act['methodCodeName'];

              var targetEl = window.__Mokelay.ComponentInstantMap[targetUUId];
              if (targetEl) {
                var method = targetEl['current'][methodCodeName];
                if (method) {
                  // method(e, ...paramsData);
                  //TODO 针对菜单单独处理
                  //TODO 如何做两面的数据格式转化配置？
                  var _copy = function (node) {
                    var n = {};
                    n['id'] = node['uuid'];
                    n['name'] = node['name'];

                    var children = node['children'];
                    if (children) {
                      n['children'] = [];
                      children.map(function (c) {
                        n['children'].push(_copy(c));
                      });
                    }

                    return n;
                  };
                  method(null, _copy(r['data']['view']));
                } else {
                  console.log('Can not find method:' + methodCodeName);
                }
              } else {
                console.log('Can not find target dom:' + targetUUId);
              }
            });
          }
        })
        .catch(function (r) {
          console.log(r);
        });
    }
  });

  return <M_View initView={ui['view']} />;
}
