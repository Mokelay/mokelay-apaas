/**
 * M_Page
 *
 * */

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function M_Page({ children }) {
  children = children || [];
  const ChildrenViews = children.map( view => <Grid key={view.key} item xs={4}>{view}</Grid>);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {ChildrenViews}
      </Grid>
    </Box>
  );
}
