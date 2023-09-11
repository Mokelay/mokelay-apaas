/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const M_Iframe = forwardRef(function M_Iframe({ url, onLoad }, ref) {
  const iframeRef = useRef(null);

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

  return <iframe ref={iframeRef} src={url} width="400px" height="300px" />;
});

export default M_Iframe;
