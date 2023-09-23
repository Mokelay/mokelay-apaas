import { useParams, useLocation } from 'react-router-dom';
import { useRef } from 'react';

import M_View from '../m_view/index';
import Util from '../../util/util';

/**
 * 通过URL获取页面参数，获取页面DSL，目前可以先从dsl/ui/目录里本地加载，方便测试
 */
//App信息
import appList from '../../../dsl/ui/app_list.js';
//导入UI配置信息，开发环境为JS Config， 生产环境为接口获取
const appMap = {};
appList.map(function (_app) {
  appMap[_app['uuid']] = {
    app: _app,
    uiMap: {},
  };
});
const fs = import.meta.globEager('../../../dsl/ui/*/*.js');
Object.keys(fs).forEach(function (f) {
  var _tmp = f.split('/');
  if (_tmp.length == 7) {
    const appUUID = _tmp[5];
    const uiUUID = f.substr(f.lastIndexOf('/') + 1, f.lastIndexOf('.') - f.lastIndexOf('/') - 1);
    if (appMap[appUUID]) {
      appMap[appUUID]['uiMap'][uiUUID] = fs[f].default;
    }
  }
});
// console.log(appMap);

/**
 * 渲染UI
 *
 * @returns DOM
 */
export default function M_UI() {
  var params = useParams() || {};

  //把目前URL里的query参数存储到内置变量中
  window.__Mokelay.InternalVar.URL_Search_Params = new URLSearchParams(useLocation().search);

  //存储所有组件的Key和Ref
  const ComponentInstantMap = {};
  window.__Mokelay.ComponentInstantMap = ComponentInstantMap;

  //获取Params参数
  var appUUID = params['app_uuid'];
  var uiUUID = params['ui_uuid'];

  var appInfo = appMap[appUUID];

  if (appInfo) {
    var app = appInfo['app'];
    var uiMap = appInfo['uiMap'];

    //APP默认首页
    var pageDefault = app['pages']['Page_Default'];
    //APP的404页面
    var page404 = app['pages']['Page_404'];

    var renderUI = null;
    if (typeof uiUUID == 'undefined') {
      //默认显示APP首页
      renderUI = uiMap[pageDefault];
    } else {
      //获取目标UI
      renderUI = uiMap[uiUUID];
      if (!renderUI) {
        // 如果找不到配置，则返回该APP配置的404页面
        renderUI = uiMap[page404];
      }
    }
    document.title = Util.executeStr(renderUI['title']);

    //自定义变量
    var customVars = renderUI['customVars'] || [];

    //TODO 是否要放在window下？
    var rootUIRef = useRef(null);
    window.__Mokelay.Root.UIRef = rootUIRef;
    return <M_View initView={renderUI['view']} ref={rootUIRef} />;
  } else {
    //TODO 找不到对应的APP信息，如何配置页面？
    return <div>Can not found any app</div>;
  }
}
