/**
 * M_Tab
 *
 * */
// eslint-disable-next-line no-unused-vars
import { forwardRef, useImperativeHandle } from 'react';

const M_Tab = forwardRef(function M_Tab(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <span ref={ref}></span>;
});
export default M_Tab;
