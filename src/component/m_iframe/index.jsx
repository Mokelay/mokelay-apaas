/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { forwardRef, useImperativeHandle } from 'react';

const M_Iframe = forwardRef(function M_Iframe({ url }, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <iframe ref={ref} src={url} width="400px" height="300px" />;
});

export default M_Iframe;
