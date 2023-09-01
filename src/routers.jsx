import React from 'react';
import MPage from '@/component/m_page/m_page';

const routers = [];
const pages = import.meta.globEager('./pages/**/schema.js');

// 所有pages下的schema.js文件都是一个页面,  路由为文件路径
Object.keys(pages).forEach(function (key) {
  const mpath = key.match(/\/pages(\/.+)\//);
  if (mpath && mpath[1]) {
    routers.push([mpath[1], () => <MPage schema={pages[key].default} />]);
  }
});

export default routers;
