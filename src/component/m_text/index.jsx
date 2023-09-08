/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { forwardRef, useRef, useImperativeHandle } from 'react';
import { useState } from 'react';

const M_Text = forwardRef(function M_Text({ initContent, maxLine = 1 }, ref) {
  const [content, setContent] = useState(initContent);

  useImperativeHandle(
    ref,
    () => {
      return {
        updateContent(newContent) {
          setContent(newContent);
          console.log('Update content...');
        },
      };
    },
    [],
  );

  return <span ref={ref}>{content}</span>;
});

export default M_Text;
