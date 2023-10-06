/* eslint-disable react/prop-types */
/**
 * M_Container
 *
 * */

// import React from 'react';
// eslint-disable-next-line no-unused-vars
import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import M_View from '../m_view/index';

// eslint-disable-next-line react/prop-types
const M_Container = forwardRef(function M_Container({ ...args }, ref) {
  var {
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
    ...rest
  } = args;

  useImperativeHandle(
    ref,
    () => {
      return {
        getChildrenMap() {
          return childMap.current;
        },
        //Update Children
        updateChildren: function (children) {
          if (children == null) {
            children = [];
          }
          setChildren(children);
        },
      };
    },
    [],
  );
  console.log(
    '######Render M_Container :',
    window.__Mokelay.Is_Edit_Status ? '(Edit Status = true)' : '',
    '########',
  );
  console.log(args);
  console.table(args['children']);
  console.log('#############################');
  const [nodes, setChildren] = useState(children);

  //监控children的变黄，如果有变化，强制更新
  //TODO 如果是其他变量有变化呢？
  useEffect(() => {
    setChildren(children);
  }, [children]);

  //TODO xs={4} 的设置是在容器里，还是在组件里？
  //TODO Chilref的这个实现方式是否科学？
  // eslint-disable-next-line react/prop-types
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
        {nodes.map(function (view) {
          return <ChildRender view={view} key={'m_c_c_' + view.uuid} />;
        })}
      </Grid>
    </Box>
  );
});

export default M_Container;
