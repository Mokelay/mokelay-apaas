/**
 * M_Code_Editor
 *
 * */

import { forwardRef, useImperativeHandle } from 'react';
// import { useState } from 'react';
import Editor from '@monaco-editor/react';

const M_Code_Editor = forwardRef(function M_Code_Editor({ code }, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <Editor height="100px" language="javascript" theme="vs-dark" value={code} />;
});

M_Code_Editor.displayName = 'M_Code_Editor';

export default M_Code_Editor;
