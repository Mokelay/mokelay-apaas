/* eslint-disable react/prop-types */
/**
 *  Text
 * TODO Input使用MUI的组件
 *
 * */

import { forwardRef, useImperativeHandle } from 'react';
import { useState } from 'react';

const M_Text = forwardRef(function M_Text(
  { textId, initContent, supportEdit = false, onContentChange, onContentEdit, onContentEditCancel },
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

  var dbClick = function (e) {
    if (supportEdit) {
      setEditing(true);
      if (onContentEdit) {
        onContentEdit({ e: e, textId: textId });
      }
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
      } else if (onContentEditCancel) {
        //没有内容变化，则触发编辑取消事件
        onContentEditCancel({ e: e });
      }
    } else if (e.keyCode == 27) {
      //ESC ，取消
      setEditing(false);
      if (onContentEditCancel) {
        onContentEditCancel({ e: e });
      }
    }
  };

  return (
    <span ref={ref} onDoubleClick={dbClick} textid={textId}>
      {!editing && content}
      {editing && <input defaultValue={content} onKeyDown={keyDown} />}
    </span>
  );
});

M_Text.displayName = 'M_Text';

export default M_Text;
