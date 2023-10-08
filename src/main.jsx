import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Navigate, createHashRouter, RouterProvider } from 'react-router-dom';

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
    if (baseComp.default.render.name && baseComp.default.render.name.length > 0) {
      compName = baseComp.default.render.name;
    } else {
      compName = baseComp.default.render.displayName;
    }
    if (baseComp.default.displayName) {
      compName = baseComp.default.displayName;
    }
  }
  ComponentMap[compName] = baseComp.default;
});
window.__Mokelay.ComponentMap = ComponentMap;

/**
 * 加载组件库的DESC
 *
 * TODO 仅在编辑器中需要加载,渲染状态不需要
 */
// eslint-disable-next-line react-refresh/only-export-components
const ComponentDescMap = {};
const descComponents = import.meta.globEager(['./component/*/desc.jsx', './editor/*/desc.jsx']);
Object.values(descComponents).forEach(function (descComp) {
  // console.log(descComp);
  var compName = descComp.default.tagName;
  if (compName == undefined) {
    compName = descComp.default.render.name;
  }
  ComponentDescMap[compName] = descComp.default;
});
window.__Mokelay.ComponentDescMap = ComponentDescMap;

/**
 * TODO 加载自定义组件库，加载完成后，后续还可以还可以动态加载
 */

/**
 * 存储编辑状态的全局变量
 */
window.__Mokelay._Edit = {};

/**
 * 全局Util
 */
import Util from './util/util';
window.__Mokelay.Util = Util;

/**
 * 数据中心，内置变量和自定义变量统一的管理，更新的事件管理
 */
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

import APP_UI_Loader from './app_ui_loader';

var router = null;
if (window.__Mokelay.Is_Edit_Status) {
  router = [
    {
      path: '/',
      element: <APP_UI_Loader key="app_loader" />,
    },
  ];
} else {
  router = [
    {
      path: '/',
      element: <Navigate to={'/app_editor/'} />,
    },
    {
      path: '/:app_uuid/',
      element: <APP_UI_Loader key="appHome" />,
    },
    {
      path: '/:app_uuid/:ui_uuid',
      element: <APP_UI_Loader key="appUI" />,
    },
  ];
}

/**
 * 开始正式渲染页面，挂载到root节点
 */
window.__Mokelay.Root = {};
if (!window.__Mokelay.Root.El) {
  window.__Mokelay.Root.El = createRoot(document.getElementById('root'));
}
window.__Mokelay.Root.El.render(<RouterProvider router={createHashRouter(router)} />);
