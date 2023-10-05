/* eslint-disable react/prop-types */
/**
 *  M_Text_Field
 *
 * */

import { useState, forwardRef, useImperativeHandle } from 'react';
import TextField from '@mui/material/TextField';

const M_Text_Field = forwardRef(function M_Text_Field({ ...args }, ref) {
  // const [content, setContent] = useState(initContent);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <TextField {...args} />;
});

export default M_Text_Field;
