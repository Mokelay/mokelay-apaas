/* eslint-disable react/prop-types */
/**
 *  M_Text_Field
 *
 * */

import { useState, forwardRef, useImperativeHandle } from 'react';
import TextField from '@mui/material/TextField';

const M_Text_Field = forwardRef(function M_Text_Field(
  { label, variant = 'outlined', defaultValue, name, required },
  ref,
) {
  // const [content, setContent] = useState(initContent);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return (
    <TextField
      required={required}
      label={label}
      name={name}
      variant={variant}
      defaultValue={defaultValue}
    />
  );
});

export default M_Text_Field;
