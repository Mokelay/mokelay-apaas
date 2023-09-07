/**
 * M_Page
 *
 * */

// import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// eslint-disable-next-line react/prop-types
export default function M_Page({ children }) {
  children = children || [];
  //TODO xs={4} 的设置是在容器里，还是在组件里？
  // eslint-disable-next-line react/prop-types
  const ChildrenViews = children.map((view) => (
    <Grid key={view.key} item xs={8}>
      {view}
    </Grid>
  ));

  const mouseDown = function () {
    console.log('mouse down..');
  };
  const mouseEnter = function () {
    console.log('mouse enter..');
  };
  const mouseLeave = function () {
    console.log('mouse leave..');
  };
  const mouseMove = function (e) {
    console.log(e);
    console.log('mouse move..');
  };
  const mouseOut = function () {
    console.log('mouse out..');
  };
  const mouseOver = function () {
    console.log('mouse over..');
  };
  const mouseUp = function () {
    console.log('mouse up..');
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        onMouseDown={mouseDown}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
        onMouseOut={mouseOut}
        onMouseOver={mouseOver}
        onMouseUp={mouseUp}
      >
        {ChildrenViews}
      </Grid>
    </Box>
  );
}
