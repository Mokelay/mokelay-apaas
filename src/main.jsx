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

// 加载内置变量
window.__Mokelay.InternalVar = {
	//内置变量_是否编辑状态
	Is_Edit_Status:true,
	//内置变量_所处终端
	Current_Terminal:"PC"
}


// 加载内置函数
window.__Mokelay.InternalFunc = {

}

// 通过URL获取页面参数，获取页面DSL， 目前可以先从dsl/目录里本地加载，方便测试
import app from '../dsl/app.js';
import ui from '../dsl/ui.js';
import data from '../dsl/data.js';

// 渲染DSL
const rootElement = document.getElementById('root');
console.log(app);
console.log(ui);
console.log(data);