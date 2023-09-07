/**
 *  Text
 *
 * */

import { forwardRef, useRef, useImperativeHandle } from 'react';

const M_Text = forwardRef(function M_Text({ content, maxLine = 1 }, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        updateContent() {
          console.log('Update content...');
        },
      };
    },
    [],
  );

  return <span>{content}</span>;
});

export default M_Text;
