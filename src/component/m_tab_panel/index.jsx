import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import M_View from '../m_view/index';

/**
 * M_Tabs
 *
 * */
// eslint-disable-next-line no-unused-vars

const M_Tab_Panel = forwardRef(function M_Tab_Panel(
  {
    value,
    spacing = 0,
    children = [],
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onClick,
    onDrag,
  },
  ref,
) {
  useImperativeHandle(
    ref,
    () => {
      return {
        getChildrenMap() {
          // return childMap.current;
        },
      };
    },
    [],
  );

  let childMap = useRef({});

  //Child Render
  function ChildRender({ view }) {
    const gridRef = useRef(null);
    childMap.current[view['uuid']] = gridRef;

    //TODO 这里每个子元素的dimensions样式全部交给了容器来管理
    //TODO 是否有更优美的方式？
    //从Children里面获取到样式，并且读取尺寸样式(dimensions)进行控制
    var styles = view['styles'] || {};
    var dimensions = styles['dimensions'] || {};
    var xs = dimensions['xs'] || 12;
    return (
      <Grid item xs={xs} ref={gridRef} sx={dimensions}>
        <M_View initView={view} />
      </Grid>
    );
  }

  return (
    <TabPanel value={value}>
      <Box sx={{ flexGrow: 1 }} ref={ref}>
        <Grid
          container
          spacing={spacing}
          onMouseDown={
            onMouseDown &&
            function (e) {
              onMouseDown({ e: e });
            }
          }
          onMouseEnter={
            onMouseEnter &&
            function (e) {
              onMouseEnter({ e: e });
            }
          }
          onMouseLeave={
            onMouseLeave &&
            function (e) {
              onMouseLeave({ e: e });
            }
          }
          onMouseMove={
            onMouseMove &&
            function (e) {
              onMouseMove({ e: e });
            }
          }
          onMouseOut={
            onMouseOut &&
            function (e) {
              onMouseOut({ e: e });
            }
          }
          onMouseOver={
            onMouseOver &&
            function (e) {
              onMouseOver({ e: e });
            }
          }
          onMouseUp={
            onMouseUp &&
            function (e) {
              onMouseUp({ e: e });
            }
          }
          onClick={
            onClick &&
            function (e) {
              onClick({ e: e });
            }
          }
          onDrag={
            onDrag &&
            function (e) {
              onDrag({ e: e });
            }
          }
        >
          {children.map(function (view) {
            return <ChildRender view={view} key={'m_tab_panel_child_' + view.uuid} />;
          })}
        </Grid>
      </Box>
    </TabPanel>
  );
});
export default M_Tab_Panel;
