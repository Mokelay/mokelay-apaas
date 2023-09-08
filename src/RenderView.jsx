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

  //处理模态
  // var modals = view['modals'];
  //每一层的modal处理方式抽象

  //处理子节点
  var children = [];
  var childViews = view['children'] || [];
  childViews.map(function (childView) {
    children.push(<RenderView view={childView} key={childView['uuid']} />);
  });
  return createElement(window.__Mokelay.ComponentMap[view['component']], pros, children);
}
