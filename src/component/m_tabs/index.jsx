import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import M_View from '../m_view/index';

/**
 * M_Tabs
 *
 * */
// eslint-disable-next-line no-unused-vars

const M_Tabs = forwardRef(function M_Tabs({ tabs = [], children = [], index = 0 }, ref) {
  const [value, setValue] = useState(index);

  useImperativeHandle(
    ref,
    () => {
      return {
        getChildrenMap() {
          return childMap.current;
        },
        // updateTabView: function (index, children) {},
      };
    },
    [],
  );

  let childMap = useRef({});

  //Child Render
  //必须指定是M_TabPanel
  function ChildRender({ view }) {
    const tabRef = useRef(null);
    childMap.current[view['uuid']] = tabRef;
    return <M_View initView={view} ref={tabRef} />;
  }

  const changeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <TabContext value={value.toString()}>
        <TabList onChange={changeTab} variant="scrollable" scrollButtons="auto">
          {tabs.map((t, index) => (
            <Tab label={t.label} value={index.toString()} key={t.value} />
          ))}
        </TabList>

        {/* 每个Tab的容器 */}
        {children.map(function (view) {
          return <ChildRender view={view} key={'m_tabs_child_' + view.uuid} />;
        })}
      </TabContext>
    </>
  );
});
export default M_Tabs;
