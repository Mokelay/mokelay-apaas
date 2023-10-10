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

import M_Text from '../m_text';

import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

const M_Tree = forwardRef(function M_Tree(
  { initData, initExpanded = [], initSelected = [], onItemSelect },
  ref,
) {
  const [data, setData] = useState(initData);
  const [expanded, setExpanded] = useState(initExpanded);
  const [selected, setSelected] = useState(initSelected);
  const [editNodeId, setEditNodeId] = useState(null);

  //接收来自渲染层的事件和数据
  useEffect(() => {
    setEditNodeId(editNodeId);
  }, [editNodeId]);

  useImperativeHandle(
    ref,
    () => {
      return {
        loadData: function ({ ...args }, d) {
          // console.log('####Tree begin to load Data####');
          // console.log(d);
          // console.log(args);
          // console.log('###############################');

          setData(d);
          //默认展开所有children节点
          //TODO 如何配置展开的节点
          if (d) {
            var _expanded = [];

            var _f = function (_d) {
              if (_d['children'] && _d['children'].length > 0) {
                _expanded.push(_d['id']);

                _d['children'].forEach(function (__d) {
                  _f(__d);
                });
              }
            };
            _f(d);
            setExpanded(_expanded);
          }
        },
        //SelectItems
        selectItems: function ({ ...args }, selectIds) {
          // console.log('select item ..');
          // console.log(arguments);
          setSelected(_.isArray(selectIds) ? selectIds : [selectIds]);
        },
      };
    },
    [],
  );

  //Node Select Event
  function onNodeSelect(e, nodeId) {
    setSelected([nodeId]);
    if (onItemSelect) {
      var parentId = null;
      var isParent = false;

      var _check = function (node, parent) {
        if (node['id'] == nodeId) {
          parentId = parent ? parent['id'] : null;
          var children = node['children'];
          isParent = children && children.length > 0;
        } else {
          var children = node['children'];
          if (children && children.length > 0) {
            children.forEach(function (n) {
              _check(n, node);
            });
          }
        }
      };

      _check(data, null);

      onItemSelect({
        e: e,
        id: nodeId,
        isParent: isParent,
        parentId: parentId,
      });
      // console.log('parentId:' + parentId);
      // console.log('isParent:' + isParent);
    }
  }

  //Tree Node 内容修改
  function treeNodeLabelChange() {
    //TODO 如何同步出更多信息的event？
    setEditNodeId(null);
  }

  //Tree Node开始编辑
  function treeNodeEdit({ e, textId }) {
    // console.log(e);
    // console.log(textId);
    setEditNodeId(textId);
  }

  //取消编辑
  function treeNodeEditCancel() {
    setEditNodeId(null);
  }

  const renderTree = (nodes) =>
    nodes && (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <M_Text
            textId={nodes.id}
            initContent={nodes.name}
            supportEdit={editNodeId == null || editNodeId == nodes.id}
            onContentChange={treeNodeLabelChange}
            onContentEdit={treeNodeEdit}
            onContentEditCancel={treeNodeEditCancel}
          />
        }
      >
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </TreeItem>
    );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeSelect={onNodeSelect}
    >
      {renderTree(data)}
    </TreeView>
  );
});

M_Tree.displayName = 'M_Tree';

export default M_Tree;
