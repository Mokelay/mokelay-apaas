import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 全局样式
import './styles/index.less';

/**
 * 加载基础组件库
 */
// eslint-disable-next-line react-refresh/only-export-components
const ComponentMap = {};
const baseComponents = import.meta.globEager(['./component/*/index.jsx', './editor/*/index.jsx']);
Object.values(baseComponents).forEach(function (baseComp) {
  var compName = baseComp.default.name;
  if (compName == undefined) {
    compName = baseComp.default.render.name;
  }
  ComponentMap[compName] = baseComp.default;
});
window.__Mokelay.ComponentMap = ComponentMap;

/**
 * TODO 加载自定义组件库，加载完成后，后续还可以还可以动态加载
 */

/**
 * 存储编辑状态的全局变量
 */
window.__Mokelay._Edit = {};

import Util from './util/util';
window.__Mokelay.Util = Util;

//数据中心，内置变量和自定义变量统一的管理，更新的事件管理
import JSONWatch from './util/json_watch';
window.__Mokelay.VarCenter = new JSONWatch({});

/**
 * 加载内置巴斯 = 内置函数+内置变量
 */
import InternalBuzzs from './util/internal_buzzs.jsx';
// 加载内置变量
window.__Mokelay.VarCenter.set('InternalVar', InternalBuzzs['internalVar']);
window.__Mokelay.VarCenter.set('CustomVar', {});
window.__Mokelay.InternalVarDesc = InternalBuzzs['internalVarDesc'];
// 加载内置函数
window.__Mokelay.InternalFunc = InternalBuzzs['internalFunc'];
window.__Mokelay.InternalFuncDesc = InternalBuzzs['internalFuncDesc'];

/**
 * 开始正式渲染页面，挂载到root节点
 */
window.__Mokelay.Root = {};
if (!window.__Mokelay.Root.El) {
  window.__Mokelay.Root.El = createRoot(document.getElementById('root'));
}
window.__Mokelay.Root.El.render(
  // <StrictMode>
  <Router>
    <Routes>
      {/* 处理默认首页 */}
      {/* TODO 如何配置全局的默认首页 */}
      <Route index element={<Navigate to={'/app_editor/'} />} />

      {/* 读取本地JS配置，方便联调 */}
      <Route path="/:app_uuid/">
        {/* APP的默认首页*/}
        <Route index element={<window.__Mokelay.ComponentMap.M_UI />} />

        {/* 对应到APP的具体页面 */}
        <Route path="/:app_uuid/:ui_uuid" element={<window.__Mokelay.ComponentMap.M_UI />} />
      </Route>

      {/* 单独处理layout */}
      {/* <Route path="/" element={<BasicLayout />}></Route> */}
    </Routes>
  </Router>,
  /* </StrictMode>, */
);
