/* eslint-disable react/prop-types */
/**
 *  Switch
 *
 * */
import { forwardRef, useImperativeHandle } from 'react';
// import { useState } from 'react';

const M_Switch = forwardRef(function M_Switch({}, ref) {
  //暴露出的方法
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <></>;
});

M_Switch.displayName = 'M_Switch';

export default M_Switch;
