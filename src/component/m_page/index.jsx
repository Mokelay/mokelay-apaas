/* eslint-disable react/prop-types */
/**
 * M_Page
 *
 * */

// import React from 'react';
// eslint-disable-next-line no-unused-vars
import { forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// eslint-disable-next-line react/prop-types
const M_Page = forwardRef(function M_Page(
  {
    children,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
  },
  ref,
) {
  useImperativeHandle(
    ref,
    () => {
      return {
        //刷新
        refresh() {
          console.log('refresh this page...');
        },
        //Resize
        resizeView() {
          console.log('resize this view...');
        },
        sortView() {
          console.log('sort this view...');
        },
        addNewView() {
          console.log('add new view...');
        },
        copyView() {
          console.log('copy view...');
        },
        createCopyView() {
          console.log('create copy view...');
        },
        deleteView() {
          console.log('delete view...');
        },
      };
    },
    [],
  );

  children = children || [];
  //TODO xs={4} 的设置是在容器里，还是在组件里？
  // eslint-disable-next-line react/prop-types
  const ChildrenViews = children.map((view) => (
    <Grid key={view.key} item xs={12}>
      {view}
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }} ref={ref}>
      <Grid
        container
        spacing={2}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onMouseUp={onMouseUp}
      >
        {ChildrenViews}
      </Grid>
    </Box>
  );
});
export default M_Page;
