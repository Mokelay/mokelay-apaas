/* eslint-disable react/prop-types */
import { useRef, createElement } from 'react';

/**
 * 统一的View渲染函数
 * 适用于任何UI的render，比如Page, Container,编辑器面板等
 *
 * @param {统一View JSON对象} view
 * @returns
 */
export function RenderView({ view }) {
  var ref = useRef(null);
  //处理属性
  var attributes = view['attributes'] || [];
  var pros = {};
  attributes.map(function (attr) {
    var proName = attr['varCodeName'];
    // 针对String类型的value，是否统一解析变量
    var proValue = attr['value'];
    pros[proName] = proValue;
  });

  //处理Key
  pros['key'] = view['uuid'];

  //处理ref
  pros['ref'] = ref;
  window.__Mokelay.ComponentInstantMap[pros['key']] = pros['ref'];

  //处理样式
  // var styles = view['styles'];

  //处理动作
  var editStatus = window.__Mokelay.InternalVar.Is_Edit_Status;
  if (editStatus) {
    //TODO 这段逻辑如何可配置话
    //如果是编辑状态，不渲染任何事件，并且判断是不是容器，如果是容器，需要增加编辑所需要的事件和数据；
    if (view['category'] == 'Container') {
      var f = function (e) {
        // TODO 封装需要传递给父级编辑层的数据
        var data = {};
        data['targetUUID'] = view['uuid'];
        data['eventName'] = e._reactName;
        data['clientX'] = e.clientX;
        data['clientY'] = e.clientY;
        window.parent.postMessage(JSON.stringify(data), '*');
      };
      //TODO 注册一系列需要编辑的交互事件
      pros['onMouseDown'] = f;
      pros['onMouseUp'] = f;
      pros['onMouseLeave'] = f;
      pros['onMouseEnter'] = f;
      pros['onMouseMove'] = f;
    }
  } else {
    //如果是非编辑状态，渲染配置的actions
    var actions = view['actions'] || [];
    actions.map(function (action) {
      var eventCodeName = action['eventCodeName'];
      var targetUUId = action['targetUUId'];
      var methodCodeName = action['methodCodeName'];
      //TODO 处理参数传递
      // var paramsData = action['paramsData'];
      pros[eventCodeName] = function () {
        var targetEl = window.__Mokelay.ComponentInstantMap[targetUUId];
        if (targetEl) {
          var method = targetEl['current'][methodCodeName];
          if (method) {
            method();
          } else {
            console.log('Can not find method:' + methodCodeName);
          }
        } else {
          console.log('Can not find target dom:' + targetUUId);
        }
      };
    });
  }

  //处理模态
  // var modals = view['modals'];
  //TODO 每一层的modal处理方式抽象

  //处理子节点
  var children = [];
  var childViews = view['children'] || [];
  childViews.map(function (childView) {
    children.push(<RenderView view={childView} key={childView['uuid']} />);
  });
  return createElement(window.__Mokelay.ComponentMap[view['component']], pros, children);
}
