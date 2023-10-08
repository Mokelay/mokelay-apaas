import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import TabPanel from '@mui/lab/TabPanel';

import M_Container from '../m_container';

/**
 * M_Tabs
 *
 * */
// eslint-disable-next-line no-unused-vars

const M_Tab_Panel = forwardRef(function M_Tab_Panel({ value, ...props }, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        getChildrenMap() {
          return containerRef.current.getChildrenMap();
        },
        updateChildren({ ...args }, children) {
          // console.log(args);
          // console.log(children);
          containerRef.current.updateChildren(children);
        },
      };
    },
    [],
  );

  return (
    <TabPanel value={value}>
      <M_Container {...props} ref={containerRef} />
    </TabPanel>
  );
});

M_Tab_Panel.displayName = 'M_Tab_Panel';

export default M_Tab_Panel;
