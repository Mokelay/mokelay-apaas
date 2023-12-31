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
      return {
        postMessage: function ({ ...args }, message) {
          iframeRef.current.contentWindow.postMessage(JSON.stringify(message), '*');
        },
        getBoundingClientRect: function () {
          return iframeRef.current.getBoundingClientRect();
        },
        getMokelay: function () {
          return iframeRef.current.contentWindow.__Mokelay;
        },
        getWindow: function () {
          return iframeRef.current.contentWindow;
        },
      };
    },
    [],
  );

  useEffect(() => {
    var f = function (e) {
      if (onLoad) {
        onLoad({ e: e });
      }
    };
    iframeRef.current.addEventListener('load', f);
    return () => {
      if (iframeRef && iframeRef.current) {
        iframeRef.current.removeEventListener('load', f);
      }
    };
  }, []);

  return <iframe ref={iframeRef} src={url} style={sx} />;
});

M_Iframe.displayName = 'M_Iframe';

export default M_Iframe;
