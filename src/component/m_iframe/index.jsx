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
  var dimensionsSX = styles['dimensions'] || {};
  var borderSX = styles['border'] || {};
  var sx = Object.assign({}, layoutSX, dimensionsSX, borderSX);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  useEffect(() => {
    if (onLoad) {
      iframeRef.current.addEventListener('load', onLoad);
      return () => {
        if (iframeRef && iframeRef.current) {
          iframeRef.current.removeEventListener('load', onLoad);
        }
      };
    }
  }, []);

  return <iframe ref={iframeRef} src={url} style={sx} />;
});

export default M_Iframe;
