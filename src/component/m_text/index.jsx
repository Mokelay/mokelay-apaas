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

  var keyDown = function (e) {
    // console.log(e);
    var newContent = e.target.value;
    if (e.keyCode == 13) {
      //回车，确认
      setEditing(false);
      if (content != newContent) {
        if (onContentChange) {
          onContentChange({ e: e, content: newContent });
        }
        setContent(newContent);
      }
    } else if (e.keyCode == 27) {
      //ESC ，取消
      setEditing(false);
    }
  };

  return (
    <span ref={ref} onDoubleClick={dbClick}>
      {!editing && content}
      {editing && <input defaultValue={content} onKeyDown={keyDown} />}
    </span>
  );
});

M_Text.displayName = 'M_Text';

export default M_Text;
