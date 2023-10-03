import './style.css';

/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const M_Iframe = forwardRef(function M_Iframe({ url, onLoad, styles }, ref) {
  const iframeRef = useRef(null);
  styles = styles || {};

  var layoutSX = styles['layout'] || {};
  // 尺寸交由容器来设置
  // var dimensionsSX = styles['dimensions'] || {};
  var dimensionsSX = {};
  var borderSX = styles['border'] || {};
  var sx = Object.assign({ width: '100%', height: '100%' }, layoutSX, dimensionsSX, borderSX);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  useEffect(() => {
    if (onLoad) {
      var f = function (e) {
        onLoad({ e: e });
      };
      iframeRef.current.addEventListener('load', f);
      return () => {
        if (iframeRef && iframeRef.current) {
          iframeRef.current.removeEventListener('load', f);
        }
      };
    }
  }, []);

  return <iframe ref={iframeRef} src={url} style={sx} />;
});

export default M_Iframe;
