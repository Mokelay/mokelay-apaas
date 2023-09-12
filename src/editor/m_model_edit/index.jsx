import { useEffect, forwardRef, useImperativeHandle } from 'react';

/**
 * M_Model_Edit
 */
const M_Model_Edit = forwardRef(function M_Model_Edit(props, ref) {
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

export default M_Model_Edit;
