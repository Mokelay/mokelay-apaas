/* eslint-disable react/prop-types */
import { useState, useRef, useEffect, createElement, forwardRef, useImperativeHandle } from 'react';
import Util from '../../util/util';

/**
 * 统一的View渲染函数
 * 适用于任何UI的render，比如Page, Container,编辑器面板等
 *
 * @param {统一View JSON对象} view
 * @returns
 */
const M_View = forwardRef(function M_View({ initView }, ref) {
  const [view, updateView] = useState(initView);

  //监控initView的变黄，如果有变化，强制更新
  useEffect(() => {
    updateView(initView);
  }, [initView]);

  useImperativeHandle(
    ref,
    () => {
      return {
        //重新加载DSL
        reloadDSL(viewDSL) {
          console.log('reloadDSL...');
          updateView(viewDSL);
        },
        //获取DSL
        getDSL() {
          return view;
        },
      };
    },
    [],
  );

  var viewRef = useRef(null);
  //处理属性
  var attributes = view['attributes'] || [];
  var pros = {};
  attributes.map(function (attr) {
    var proName = attr['varCodeName'];
    // 针对String类型的value，统一解析变量
    // console.log(Util.resolveVar('xxx{{Is_Edit_Status}}aa'));
    // console.log(Util.executeStr("xxx{{getQueryValue('ui')}}aa"));
    var proValue = attr['value'];
    if (typeof proValue == 'string') {
      proValue = Util.executeStr(proValue);
      //TODO 可以再加上国际化逻辑
    }
    pros[proName] = proValue;
  });

  //处理Key
  pros['key'] = view['uuid'];

  //处理ref
  pros['ref'] = viewRef;
  window.__Mokelay.ComponentInstantMap[pros['key']] = {
    ref: pros['ref'],
    component: view['component'],
  };

  //处理样式
  pros['styles'] = view['styles'] || {};

  //处理动作
  var editStatus = window.__Mokelay.VarCenter.get('InternalVar.Is_Edit_Status');
  if (editStatus) {
    //TODO 这段逻辑如何可配置话
    //如果是编辑状态，不渲染任何事件，并且判断是不是容器，如果是容器，需要增加编辑所需要的事件和数据；
    if (view['category'] == 'Container') {
      var f = function ({ e: e }) {
        // TODO 封装需要传递给父级编辑层的数据
        var data = {};
        // console.log(e);
        data['containerUUID'] = view['uuid'];
        data['eventName'] = e._reactName;
        if (e.target) {
          data['rect'] = e.target.getBoundingClientRect();
        }

        // console.log(e.target.getBoundingClientRect());
        for (var k in e) {
          if (typeof e[k] !== 'function' && typeof e[k] !== 'object') {
            data[k] = e[k];
          }
        }
        //console.log(JSON.stringify(data));

        window.parent.postMessage(JSON.stringify(data), '*');
      };
      //TODO 注册一系列需要编辑的交互事件
      pros['onMouseDown'] = f;
      pros['onMouseUp'] = f;
      pros['onMouseLeave'] = f;
      pros['onMouseEnter'] = f;
      pros['onMouseMove'] = f;
      pros['onClick'] = f;
    }
  } else {
    //如果是非编辑状态，渲染配置的actions
    var actions = view['actions'] || [];
    var _actMap = {};
    actions.map(function (action) {
      var eventCodeName = action['eventCodeName'];
      if (!_actMap[eventCodeName]) {
        _actMap[eventCodeName] = [];
      }
      _actMap[eventCodeName].push(action);
    });
    for (var eventCodeName in _actMap) {
      var _acts = _actMap[eventCodeName];
      pros[eventCodeName] = function ({ ...args }) {
        _acts.forEach(function (_act) {
          // console.log(a);
          Util.eventEmit(args, _act);
        });
      };
    }
  }

  //处理模态
  // var modals = view['modals'];
  //TODO 每一层的modal处理方式抽象

  //处理子节点
  var childViews = view['children'] || [];

  return createElement(window.__Mokelay.ComponentMap[view['component']], pros, childViews);
});

export default M_View;
