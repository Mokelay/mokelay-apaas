/* eslint-disable react/prop-types */
/**
 *  Tree
 *
 * */

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { useState, forwardRef, useImperativeHandle } from 'react';

const M_Tree = forwardRef(function M_Tree({ initData }, ref) {
  const [data, setData] = useState(initData);

  useImperativeHandle(
    ref,
    () => {
      return {
        loadData: function (d) {
          setData(d);
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
    <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
      {renderTree(data)}
    </TreeView>
  );
});

export default M_Tree;
