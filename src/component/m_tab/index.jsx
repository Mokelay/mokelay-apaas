/**
 * M_Tab
 *
 * */
// eslint-disable-next-line no-unused-vars
import { forwardRef, useRef, useImperativeHandle } from 'react';

const M_Tab = forwardRef(function M_Tab(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );
});
export default M_Tab;
