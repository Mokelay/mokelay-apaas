/* eslint-disable react/prop-types */
/**
 *  Link
 *
 * */
import { Link } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
// import { useState } from 'react';

const M_Link = forwardRef(function M_Link({ text, url }, ref) {
  //暴露出的方法
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return (
    <Link href={url} underline="hover">
      {text}
    </Link>
  );
});

M_Link.displayName = 'M_Link';

export default M_Link;
