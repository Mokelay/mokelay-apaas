import React from 'react';
import { Outlet } from 'react-router-dom';

export default function BasicLayout(props) {
  return (
    <div className="mokelay-container">
      <Outlet />
    </div>
  );
}
