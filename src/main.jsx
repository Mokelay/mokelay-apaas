import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom';

// 全局样式
import './styles/index.less';

// 加载基础组件库
// eslint-disable-next-line react-refresh/only-export-components
const ComponentMap = {};
const baseComponents = import.meta.globEager(['./component/*/index.jsx', './editor/*/index.jsx']);
// console.log(baseComponents);
Object.values(baseComponents).forEach(function (baseComp) {
  var compName = baseComp.default.name;
  if (compName == undefined) {
    compName = baseComp.default.render.name;
  }
  ComponentMap[compName] = baseComp.default;
});

// 加载自定义组件库，加载完成后，后续还可以还可以动态加载

// 初始化全局配置
window.__Mokelay.ComponentMap = ComponentMap;

//加载内置巴斯
import InternalBuzzs from './util/internal_buzzs.jsx';

// 加载内置变量
window.__Mokelay.InternalVar = InternalBuzzs['internalVar'];
window.__Mokelay.InternalVarDesc = InternalBuzzs['internalVarDesc'];
// 加载内置函数
window.__Mokelay.InternalFunc = InternalBuzzs['internalFunc'];
window.__Mokelay.InternalFuncDesc = InternalBuzzs['internalFuncDesc'];

// 通过URL获取页面参数，获取页面DSL， 目前可以先从dsl/目录里本地加载，方便测试

//App信息
import appList from '../dsl/app_list.js';
//导入UI配置信息，开发环境为JS Config， 生产环境为接口获取
const appMap = {};
appList.map(function (_app) {
  appMap[_app['uuid']] = {
    app: _app,
    uiMap: {},
  };
});
const fs = import.meta.globEager('../dsl/*/*.js');
Object.keys(fs).forEach(function (f) {
  var _tmp = f.split('/');
  if (_tmp.length == 4) {
    const appUUID = _tmp[2];
    const uiUUID = f.substr(f.lastIndexOf('/') + 1, f.lastIndexOf('.') - f.lastIndexOf('/') - 1);
    if (appMap[appUUID]) {
      appMap[appUUID]['uiMap'][uiUUID] = fs[f].default;
    }
  }
});

import { RenderView } from './RenderView';
/**
 * 渲染UI
 *
 * @returns DOM
 */
// eslint-disable-next-line react-refresh/only-export-components
function UIRender() {
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

    if (typeof uiUUID == 'undefined') {
      //处理APP首页
      return <RenderView view={uiMap[pageDefault]['view']} />;
    } else {
      //获取目标UI
      var ui = uiMap[uiUUID];

      if (ui) {
        return <RenderView view={ui['view']} />;
      } else {
        // 如果找不到配置，则返回该APP配置的404页面
        return <RenderView view={uiMap[page404]['view']} />;
      }
    }
  } else {
    //TODO 找不到对应的APP信息，如何配置页面？
    return <div>Can not found any app</div>;
  }
}

// 渲染DSL
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* 处理默认首页 */}
        {/* TODO 如何配置全局的默认首页 */}
        <Route index element={<Navigate to={'/app_demo/home'} />} />

        {/* 读取本地JS配置，方便联调 */}
        <Route path="/:app_uuid/">
          {/* APP的默认首页*/}
          <Route index element={<UIRender />} />

          {/* 对应到APP的具体页面 */}
          <Route path="/:app_uuid/:ui_uuid" element={<UIRender />} />
        </Route>

        {/* 单独处理layout */}
        {/* <Route path="/" element={<BasicLayout />}></Route> */}
      </Routes>
    </Router>
  </StrictMode>,
);
