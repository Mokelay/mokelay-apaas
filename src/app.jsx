import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BasicLayout from './layouts/basic-layout';
import routers from './routers';

/**
 * 文件路径即为页面路由
 * @param {*} props
 * @returns
 */
export default function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index path="/" element={<Navigate to="/home" />} />
          {routers.map(([path, P]) => {
            return <Route key={path} path={path} element={<P />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
