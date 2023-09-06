/**
 * M_Page
 *
 * */

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function M_Page({ children }) {
  children = children || [];
  //TODO xs={4} 的设置是在容器里，还是在组件里？
  const ChildrenViews = children.map( view => <Grid key={view.key} item xs={8}>{view}</Grid>);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {ChildrenViews}
      </Grid>
    </Box>
  );
}
