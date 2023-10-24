import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import LogicFlow from '@logicflow/core';
import { Dagre } from '@logicflow/layout';
import { MiniMap, SelectionSelect, Menu } from '@logicflow/extension';
import LegoNode from './components/m_flow_node_common';
import LegoEdge from './components/m_flow_edge_common';

import PropertyPanel from './components/m_flow_property_panel';

import { dsl2flow } from './util/dsl2flow';
import dsl from '@dsl/lego/ty-login.js';

import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';

/**
 * M_Lego_Edit
 */
const M_Lego_Edit = forwardRef(function M_Lego_Edit(props, ref) {
  const refContainer = React.useRef();
  const lf = React.useRef();
  const [_, forceUpdate] = React.useState({});

  //暴露对外函数
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  useEffect(() => {
    const logicflow = new LogicFlow({
      container: refContainer.current,
      plugins: [MiniMap, SelectionSelect, Menu, Dagre],
      autoExpand: false,
      hoverOutline: false,
      edgeSelectedOutline: false,
      edgeType: 'lego-edge',
      grid: {
        size: 10,
        visible: true,
      },
      width: 1024,
      height: 600,
    });

    logicflow.batchRegister([LegoNode, LegoEdge]);
    logicflow.render(dsl2flow(dsl));
    logicflow.setTheme({
      arrow: {
        offset: 4,
        verticalLength: 3,
      },
      snapline: {
        stroke: '#2961EF', // 对齐线颜色
        strokeWidth: 1, // 对齐线宽度
      },
      bezier: {
        stroke: '#afafaf',
        strokeWidth: 2,
      },
    });

    // window.setTimeout(() => {
    //   // 渲染完后美化布局
    //   logicflow.extension.dagre &&
    //     logicflow.extension.dagre.layout({
    //       nodesep: 2,
    //       ranksep: 20,
    //       begin: [100, 100],
    //     });
    // }, 1000);

    logicflow.translate(450, 0);
    lf.current = logicflow;
    window.lf = logicflow; // 挂到window，方便调试
    forceUpdate({}); // 刷新页面
  }, []);

  return (
    <div>
      <div ref={refContainer} className="mokelay-flow" />
      {lf.current && <PropertyPanel lf={lf.current} />}
    </div>
  );
});

export default M_Lego_Edit;
