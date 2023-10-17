/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import './index.less';

/**
 * 属性面板
 * @param {*} props
 */
export default function PropertyPanel(props) {
  const { lf } = props;
  const MView = window.__Mokelay.ComponentMap.M_View;

  const [showDrawer, setShowDrawer] = React.useState(false);
  const [propertiesViewDesc, setpropertiesViewDesc] = React.useState(null);
  const [propertiesViewData, setpropertiesViewData] = React.useState(null);

  const currentNode = React.useRef();

  React.useEffect(() => {
    console.log('lf: ', lf);

    // 点击空白
    lf?.on('blank:click', () => {
      setShowDrawer(false);
    });
    // 点击边
    lf?.on('edge:option-click', (model) => {
      currentNode.current = model;
      setShowDrawer(true);
    });
    // 点击节点
    lf?.on('node:select-click', (model) => {
      console.log('model ===>>>', model);
      currentNode.current = model;
      const properties = model.getProperties();

      switch (model.type) {
        case 'lego-node':
          // 点击lego节点 的处理逻辑
          const { viewDesc, ...otherProperties } = properties;
          setpropertiesViewDesc(viewDesc); // 设置节点view的描述
          setpropertiesViewData(otherProperties); // 设置节点数据
          setShowDrawer(true);
          break;
        case 'lego-flow-node-if':
          // TODO 条件节点点击

          break;
      }
    });
  }, [lf]);

  // 属性change
  const onPropertiesChange = (propertiesValue) => {
    // 回填到model中
    currentNode.current.setProperties(propertiesValue);
  };

  return (
    <>
      <SwipeableDrawer open={showDrawer} anchor="right" onClose={() => setShowDrawer(false)}>
        <div style={{ width: '600px', padding: '12px' }}>
          <h3>属性面板</h3>
          <div className="mokelay-property-panel">
            {/* TODO  View 组件可能 需要value 和 onChange 属性 */}
            {/* <MView
            initView={propertiesViewDesc}
            value={propertiesViewData}
            onChange={onPropertiesChange}
          /> */}
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}
