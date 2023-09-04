import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import {HashRouter as Router, Routes, Route , Navigate,useParams,useLocation } from 'react-router-dom';

// 全局样式
import './styles/index.less';

// 加载MUI基础组件库
// TODO 需要批量处理
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
//依赖的数据源
import data from '../dsl/data.js';

//导入UI配置信息，开发环境为JS Config， 生产环境为接口获取
const uiConfigList = import.meta.globEager('../dsl/pages/*.js');
const uiMap = {};
Object.keys(uiConfigList).forEach(function (uiConfig) {
  const uiName = uiConfig.substr(uiConfig.lastIndexOf('/')+1,uiConfig.lastIndexOf('.')-uiConfig.lastIndexOf('/')-1);
  uiMap[uiName] = uiConfigList[uiConfig].default;
});

/**
 * 统一的View渲染函数
 * 适用于任何UI的render，比如Page, Container,编辑器面板等
 * 
 * @param {统一View JSON对象} view 
 * @returns 
 */
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
  var actions = view['actions'] || [];
  // actions.map();

  //处理模态
  var modals = view['modals'];
  //每一层的modal处理方式抽象

  //处理子节点
  var children = [];
  var childViews = view['children'] || [];
  childViews.map(function (childView) {
    children.push(_render(childView));
  });

  return createElement(eval(view['component']), pros, children);
};

/**
 * 渲染UI
 * 
 * @returns DOM
 */
function UIRender(){
  var params = useParams() || {};
  var uiUUID = params['ui_uuid'];
  var ui = uiMap[uiUUID];
  if(ui){
    return _render(ui['view']);
  }else{
    // 如果找不到配置，则返回到404页面
    return _render(uiMap[app['pages']['Page_404']]['view']);
  }
}

// 渲染DSL
createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* 处理默认首页 */}
      <Route index path="/" element={<Navigate to={app['pages']['Page_Default']} />} />

      {/* 读取本地JS配置，方便联调 */}
      <Route path="/:ui_uuid" element={<UIRender/>} />

      {/* 单独处理layout */}
      {/* <Route path="/" element={<BasicLayout />}></Route> */}
    </Routes>
  </Router>
);