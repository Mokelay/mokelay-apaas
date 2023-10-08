import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Util from './util/util';

/**
 * 加载UI的信息
 *
 * @returns M_UI_Loader
 */
const APP_UI_Loader = forwardRef(function APP_UI_Loader({ ...args }, ref) {
  //UI信息
  const [ui, updateUI] = useState(null);
  //监控initView的变黄，如果有变化，强制更新
  useEffect(() => {}, []);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

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
            var _ui = JSON.parse(e.data);
            // console.log('receive data from parent:');
            // console.log(_ui);
            updateUI(_ui);
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
    return <window.__Mokelay.ComponentMap.M_UI ui={ui} />;
  }
});

APP_UI_Loader.displayName = 'APP_UI_Loader';

export default APP_UI_Loader;
