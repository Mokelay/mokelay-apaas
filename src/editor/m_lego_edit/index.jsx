import { useEffect, forwardRef, useImperativeHandle } from 'react';

/**
 * M_Lego_Edit
 */
const M_Lego_Edit = forwardRef(function M_Lego_Edit(props, ref) {
  //暴露对外函数
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  useEffect(() => {}, []);

  return <></>;
});

export default M_Lego_Edit;
