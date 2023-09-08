import { forwardRef, useImperativeHandle } from 'react';

/**
 *  Table
 *
 * */
const M_Table = forwardRef(function M_Table({ children }, ref) {
  //暴露对外函数
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <span>{children}</span>;
});

export default M_Table;
