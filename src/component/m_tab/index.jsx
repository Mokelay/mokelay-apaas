import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

/**
 * M_Tab
 *
 * */
// eslint-disable-next-line no-unused-vars

const M_Tab = forwardRef(function M_Tab({ tabs = [], index = 0 }, ref) {
  const [value, setValue] = useState(index);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  const changeTab = (event, newValue) => {
    console.log('change tab');
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={changeTab}
      variant="scrollable"
      scrollButtons="auto"
      aria-label="scrollable auto tabs example"
    >
      {tabs.map((t) => (
        <Tab label={t.label} key={t.value} />
      ))}
    </Tabs>
  );
});
export default M_Tab;
