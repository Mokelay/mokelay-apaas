/* eslint-disable react/prop-types */
/**
 *  Tree
 *
 * */
import _ from 'lodash';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { useState, forwardRef, useImperativeHandle } from 'react';

const M_Tree = forwardRef(function M_Tree({ initData, initExpanded = [], initSelected = [] }, ref) {
  const [data, setData] = useState(initData);
  const [expanded, setExpanded] = useState(initExpanded);
  const [selected, setSelected] = useState(initSelected);

  useImperativeHandle(
    ref,
    () => {
      return {
        loadData: function ({ ...args }, d) {
          console.log('####Tree begin to load Data####');
          console.log(d);
          console.log(args);
          console.log('###############################');

          setData(d);
          //默认展开第一级
          //TODO 如何配置展开的节点
          if (d) {
            setExpanded([d['id']]);
          }
        },
        //SelectItems
        selectItems: function ({ ...args }, selectIds) {
          console.log('select item ..');
          console.log(arguments);

          setSelected(_.isArray(selectIds) ? selectIds : [selectIds]);
        },
      };
    },
    [],
  );

  const renderTree = (nodes) =>
    nodes && (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
    >
      {renderTree(data)}
    </TreeView>
  );
});

export default M_Tree;
