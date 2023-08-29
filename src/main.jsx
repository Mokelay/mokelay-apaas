import React from 'react'
import ReactDOM from 'react-dom/client'


// 加载MUI基础组件库
import Button from '@mui/material/Button';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// 如果是编辑器状态，加载编辑器组件

// 加载自定义组件库，加载完成后，后续还可以还可以动态加载


// 初始化全局配置
window.__Mokelay = {
};


//加载内置巴斯
import internalBuzzs from './util/internal_buzzs.jsx';

// 加载内置变量
window.__Mokelay.InternalVar = internalBuzzs['internalVar'];
// 加载内置函数
window.__Mokelay.InternalFunc = internalBuzzs['internalFunc'];

// 通过URL获取页面参数，获取页面DSL， 目前可以先从dsl/目录里本地加载，方便测试

//App信息
import app from '../dsl/app.js';
//UI信息
import ui from '../dsl/ui.js';
//依赖的数据源
import data from '../dsl/data.js';

// 渲染DSL
const rootElement = document.getElementById('root');
console.log(app);
console.log(ui);
console.log(data);