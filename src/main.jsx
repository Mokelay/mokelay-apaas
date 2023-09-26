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

//加载APP，UI的信息
var APP_UI_Loader = async function ({ params, request }) {
  // debugger;
  // console.log(arguments);
  //获取Params参数
  var appUUID = params['app_uuid'];
  var uiUUID = params['ui_uuid'];

  var app = null;
  var ui = null;
  try {
    var appFetch = await fetch('/dsl/ui/' + appUUID + '.json');
    if (appFetch.ok) {
      app = await appFetch.json();

      var uiFetch = await fetch(
        '/dsl/ui/' +
          appUUID +
          '/' +
          (typeof uiUUID == 'undefined' ? app['pages']['Page_Default'] : uiUUID) +
          '.json',
      );

      if (uiFetch.ok) {
        ui = await uiFetch.json();
      }
    }
  } catch (err) {
    // console.log(err);
  }

  if (app == null || ui == null) {
    throw {
      appUUID: appUUID,
      uiUUID: uiUUID,
      app: app,
      ui: ui,
    };
  } else {
    return {
      ui: ui,
    };
  }
};

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to={'/app_editor/'} />,
  },
  {
    path: '/:app_uuid/',
    element: <window.__Mokelay.ComponentMap.M_UI />,
    errorElement: <window.__Mokelay.ComponentMap.M_UI />,
    loader: APP_UI_Loader,
  },
  {
    path: '/:app_uuid/:ui_uuid',
    element: <window.__Mokelay.ComponentMap.M_UI />,
    errorElement: <window.__Mokelay.ComponentMap.M_UI />,
    loader: APP_UI_Loader,
  },
]);

/**
 * 开始正式渲染页面，挂载到root节点
 */
window.__Mokelay.Root = {};
if (!window.__Mokelay.Root.El) {
  window.__Mokelay.Root.El = createRoot(document.getElementById('root'));
}
window.__Mokelay.Root.El.render(<RouterProvider router={router} />);
