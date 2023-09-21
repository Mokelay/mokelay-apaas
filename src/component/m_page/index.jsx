/* eslint-disable react/prop-types */
/**
 * M_Page
 *
 * */

// import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// eslint-disable-next-line react/prop-types
const M_Page = forwardRef(function M_Page(
  {
    spacing = 0,
    children,
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
        getChildrenMap() {
          return childMap.current;
        },
      };
    },
    [],
  );

  children = children || [];

  // const [childrenRefs, setChildrenRefs] = useState([]);

  //TODO xs={4} 的设置是在容器里，还是在组件里？
  //TODO Chilref的这个实现方式是否科学？
  // eslint-disable-next-line react/prop-types
  let childMap = useRef({});
  const ChildrenViews = children.map(function (view) {
    // console.log(view);
    const gridRef = useRef(null);
    childMap.current[view['key']] = gridRef;

    //TODO 这里每个子元素的dimensions样式全部交给了容器来管理
    //从Children里面获取到样式，并且读取尺寸样式(dimensions)进行控制
    var viewDSL = view['props']['view'] || {};
    var styles = viewDSL['styles'] || {};
    var dimensions = styles['dimensions'] || {};
    var xs = dimensions['xs'] || 12;
    return (
      <Grid key={view.key} item xs={xs} ref={gridRef}>
        {view}
      </Grid>
    );
  });

  return (
    <Box sx={{ flexGrow: 1 }} ref={ref}>
      <Grid
        container
        spacing={spacing}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onMouseOver={onMouseOver}
        onMouseUp={onMouseUp}
        onClick={onClick}
        onDrag={onDrag}
      >
        {ChildrenViews}
      </Grid>
    </Box>
  );
});
export default M_Page;
