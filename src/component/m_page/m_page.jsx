/**
 * M_Page
 *
 * */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function M_Page({ schema }) {
  const navigate = useNavigate();

  // 测试代码，演示navigate的用法，实际渲染不需要这段, 可以把统一的view渲染放这里
  const onClick = React.useCallback(() => {
    navigate('/404');
  }, [navigate]);

  return <a onClick={onClick}>{schema?.view?.children}</a>;
}
