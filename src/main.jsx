import { createRoot } from 'react-dom/client';
import { StrictMode, useEffect, useState } from 'react';
import {
  Navigate,
  createHashRouter,
  RouterProvider,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';

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

/**
 * 加载UI的信息
 *
 * @returns M_UI
 */
var APP_UI_Loader = function ({ initUI }) {
  //UI信息
  const [ui, updateUI] = useState(initUI);

  // console.log('begin to load ..:');
  // console.log(ui);
  // return <div>AAA</div>;

  //把搜索参数放到VarCenter中，提供给界面配置用
  window.__Mokelay.VarCenter.set(
    'InternalVar.URL_Search_Params',
    new URLSearchParams(useLocation().search),
  );

  //获取Router中的Params参数
  const params = useParams();
  const appUUID = params['app_uuid'];
  const uiUUID = params['ui_uuid'];

  //重定向对象
  const navigate = useNavigate();

  //检查UI配置的合法性
  useEffect(() => {
    var app = null;
    if (!window.__Mokelay.Is_Edit_Status) {
      try {
        Util.get('/dsl/ui/' + appUUID + '.json')
          .then(function (res) {
            app = res['data'];

            Util.get(
              '/dsl/ui/' +
                appUUID +
                '/' +
                (typeof uiUUID == 'undefined' ? app['pages']['Page_Default'] : uiUUID) +
                '.json',
            )
              .then(function (res) {
                updateUI(res['data']);
              })
              .catch(function (res) {
                // console.log(res);
                //找不到页面，返回404
                updateUI(null);
                navigate('/' + appUUID + '/' + app['pages']['Page_404']);
              });
          })
          .catch(function () {
            //找不到APP ，默认导航到app_editor应用
            updateUI(null);
            navigate('/app_editor');
          });
      } catch (err) {
        // console.log(err);
      }
    } else {
      //编辑状态的UI信息来自Message
      var f = function (e) {
        // console.log(e);
        try {
          if (typeof e.data == 'string') {
            // console.log('receive data from parent:');
            // console.log(JSON.parse(e.data));
            updateUI(JSON.parse(e.data));
          }
        } catch (error) {
          console.log(error);
        }
      };

      window.addEventListener('message', f);
    }
  }, [uiUUID]);

  if (ui == null) {
    return <div>NO UI</div>;
  } else {
    // console.log('M_UI Render...');
    return <window.__Mokelay.ComponentMap.M_UI ui={ui} />;
  }
};

const router = createHashRouter([
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
]);

/**
 * 开始正式渲染页面，挂载到root节点
 */
window.__Mokelay.Root = {};
if (!window.__Mokelay.Root.El) {
  window.__Mokelay.Root.El = createRoot(document.getElementById('root'));
}
window.__Mokelay.Root.El.render(<RouterProvider router={router} />);
