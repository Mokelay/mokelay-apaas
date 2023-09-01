import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import App from './app';

import './styles/index.less';

// 加载MUI基础组件库
import M_Page from './component/m_page/m_page.jsx';
import M_Text from './component/m_text/m_text.jsx';
import M_Button from './component/m_button/m_button.jsx';
import M_Block from './component/m_block/m_block.jsx';

// 如果是编辑器状态，加载编辑器组件
import M_Layout_Edit from './editor/m_layout_edit/m_layout_edit.jsx';

// 加载自定义组件库，加载完成后，后续还可以还可以动态加载

// 初始化全局配置
window.__Mokelay = {};

//加载内置巴斯
import internalBuzzs from './util/internal_buzzs.jsx';

// 加载内置变量
window.__Mokelay.InternalVar = internalBuzzs['internalVar'];
window.__Mokelay.InternalVarDesc = internalBuzzs['internalVarDesc'];
// 加载内置函数
window.__Mokelay.InternalFunc = internalBuzzs['internalFunc'];
window.__Mokelay.InternalFuncDesc = internalBuzzs['internalFuncDesc'];

// 通过URL获取页面参数，获取页面DSL， 目前可以先从dsl/目录里本地加载，方便测试

//App信息
import app from '../dsl/app.js';
//UI信息
import ui0 from '../dsl/ui0.js';
import ui1 from '../dsl/ui1.js';
//依赖的数据源
import data from '../dsl/data.js';

//统一的View渲染
var _render = function (view) {
  //处理属性
  var attributes = view['attributes'] || [];
  var pros = {};
  attributes.map(function (attr) {
    pros[attr['varCodeName']] = attr['value'];
  });
  pros['key'] = view['uuid'];

  //处理样式
  var styles = view['styles'];

  //处理动作
  var actions = view['actions'];

  //处理模态
  var modals = view['modals'];

  //处理子节点
  var children = [];
  var childViews = view['children'] || [];
  childViews.map(function (childView) {
    children.push(_render(childView));
  });

  return createElement(eval(view['component']), pros, children);
};

// 渲染DSL
createRoot(document.getElementById('root')).render(<App />); //  view的渲染放在m_page里
