/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { forwardRef, useImperativeHandle } from 'react';
import { useState } from 'react';

const M_Text = forwardRef(function M_Text({ initContent, maxLine = 1 }, ref) {
  const [content, setContent] = useState(initContent);

  useImperativeHandle(
    ref,
    () => {
      return {
        updateContent({ ...args }, newContent) {
          console.log('Begin to update content:' + newContent);
          setContent(newContent);
        },
      };
    },
    [],
  );

  return <span ref={ref}>{content}</span>;
});

export default M_Text;
