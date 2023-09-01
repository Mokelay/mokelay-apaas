import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom';
import BasicLayout from './layouts/BasicLayout';

export default function(props) {

    return (
        <HashRouter>
    <Routes>
      <Route path="/" element={<BasicLayout />}>
        <Route index element={<Home />} />
        {routers.map(([path, P]) => {
          return <Route key={path} path={path} element={<P />} />;
        })}
      </Route>
    </Routes>
  </HashRouter>
    )
}