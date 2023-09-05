import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import {HashRouter as Router, Routes, Route , Navigate,useParams,useNavigate,useLocation } from 'react-router-dom';

// 全局样式
import './styles/index.less';

// 加载MUI基础组件库
// TODO 需要批量处理
import M_Page from './component/m_page/m_page.jsx';
import M_Text from './component/m_text/m_text.jsx';
import M_Button from './component/m_button/m_button.jsx';
import M_Block from './component/m_block/m_block.jsx';
import M_Table from './component/m_table/m_table.jsx';

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
import appList from '../dsl/app_list.js';

//依赖的数据源
import data from '../dsl/data.js';

//导入UI配置信息，开发环境为JS Config， 生产环境为接口获取
const appMap = {};
appList.map(function(_app){
  appMap[_app['uuid']] = {
    app:_app,
    uiMap:{}
  }
});
const fs = import.meta.globEager('../dsl/*/*.js');
Object.keys(fs).forEach(function (f) {
  var _tmp = f.split("/");
  if(_tmp.length == 4){
    const appUUID = _tmp[2];
    const uiUUID = f.substr(f.lastIndexOf('/')+1,f.lastIndexOf('.')-f.lastIndexOf('/')-1);
    if(appMap[appUUID]){
      appMap[appUUID]['uiMap'][uiUUID] = fs[f].default;
    }
  }
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
    var proName = attr['varCodeName'];
    // 针对String类型的value，是否统一解析变量
    var proValue = attr['value'];
    pros[proName] = proValue;
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

  //TODO eval的处理不是太好
  return createElement(eval(view['component']), pros, children);
};

/**
 * 渲染UI
 * 
 * @returns DOM
 */
function UIRender(){
  //获取Params参数
  var params = useParams() || {};
  var appUUID = params['app_uuid'];
  var uiUUID = params['ui_uuid'];

  var appInfo = appMap[appUUID];

  if(appInfo){
    var app = appInfo['app'];
    var uiMap = appInfo['uiMap']; 

    //APP默认首页
    var pageDefault = app['pages']['Page_Default'];
    //APP的404页面
    var page404 = app['pages']['Page_404'];

    if(typeof uiUUID == "undefined"){
      //处理APP首页
      return _render(uiMap[pageDefault]['view']);
    }else{
      //获取目标UI
      var ui = uiMap[uiUUID];

      if(ui){
        return _render(ui['view']);
      }else{
        // 如果找不到配置，则返回该APP配置的404页面
        return _render(uiMap[page404]['view']);
      }
    }
  }else{
    //TODO 找不到对应的APP信息，如何配置页面？
  }
}

// 渲染DSL
createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* 处理默认首页 */}
      {/* TODO 如何配置全局的默认首页 */}
      <Route index element={<Navigate to={"/app_demo/home"} />} />

      {/* 读取本地JS配置，方便联调 */}
      <Route path="/:app_uuid/">
        {/* APP的默认首页*/}
        <Route index element={<UIRender/>} />

        {/* 对应到APP的具体页面 */}
        <Route path="/:app_uuid/:ui_uuid" element={<UIRender/>} />
      </Route>

      {/* 单独处理layout */}
      {/* <Route path="/" element={<BasicLayout />}></Route> */}
    </Routes>
  </Router>
);