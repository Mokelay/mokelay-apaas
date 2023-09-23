import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';

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

  const [app, setApp] = useState(null);
  const [ui, setUI] = useState(null);
  //TODO 是否要放在window下？
  var rootUIRef = useRef(null);
  window.__Mokelay.Root.UIRef = rootUIRef;

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
          //APP的404页面
          var page404 = _app['pages']['Page_404'];

          //TODO 如何处理404
          var renderUUID = typeof uiUUID == 'undefined' ? pageDefault : uiUUID;

          Util.get('/dsl/ui/' + appUUID + '/' + renderUUID + '.json')
            .then(function (r2) {
              setApp(_app);
              setUI(r2['data']);
            })
            .catch(function (rej) {
              // console.log(rej);
              navigate('/' + appUUID + '/' + page404);
            });
        }
      })
      .catch(function (r3) {
        setApp(null);
        setUI(null);
      });
  }, [params]);

  if (app != null && ui != null) {
    document.title = Util.executeStr(ui['title']);
    //TODO 自定义变量处理
    var customVars = ui['customVars'] || [];
    customVars.map(function () {});

    return <M_View initView={ui['view']} ref={rootUIRef} />;
  } else {
    //TODO 找不到对应的APP信息，如何配置页面？
    return <div>Can not found any app</div>;
  }
}
