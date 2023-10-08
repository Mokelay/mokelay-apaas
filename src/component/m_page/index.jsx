/* eslint-disable react/prop-types */
/**
 * M_Page
 *
 * */

// import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import M_Container from '../m_container/index';

// eslint-disable-next-line react/prop-types
const M_Page = forwardRef(function M_Page({ ...props }, ref) {
  const containerRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        getChildrenMap() {
          return containerRef.current.getChildrenMap();
        },
      };
    },
    [],
  );

  // console.log('##### Render M_Page :');
  // console.log(props);
  // console.log('#####################');

  return <M_Container {...props} ref={containerRef} />;
});

M_Page.displayName = 'M_Page';

export default M_Page;
