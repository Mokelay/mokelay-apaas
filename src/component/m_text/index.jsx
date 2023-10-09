/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { forwardRef, useImperativeHandle } from 'react';
import { useState } from 'react';

const M_Text = forwardRef(function M_Text(
  { initContent, maxLine = 1, supportEdit = false, onContentChange },
  ref,
) {
  const [content, setContent] = useState(initContent);
  const [editing, setEditing] = useState(false);

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

  var dbClick = function () {
    if (supportEdit) {
      setEditing(true);
    }
  };

  var contentChange = function (e) {
    //TODO
    //监控keyCode = "Enter"
    if (onContentChange) {
      onContentChange({ e: e, content: content });
    }
  };

  return (
    <span ref={ref} onDoubleClick={dbClick}>
      {!editing && content}
      {editing && <input value={content} onChange={contentChange} />}
    </span>
  );
});

M_Text.displayName = 'M_Text';

export default M_Text;
