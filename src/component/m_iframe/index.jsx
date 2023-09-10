/* eslint-disable react/prop-types */
/**
 *  Text
 *
 * */

import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';

const M_Iframe = forwardRef(function M_Iframe({ url }, ref) {
  const iframeRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  useEffect(() => {
    var f = function (e) {
      // console.log(e);
      iframeRef.current.contentWindow.postMessage('msg from edit', '*');
      // window.parent.postMessage(JSON.stringify(data), '*');
    };
    // console.log();
    iframeRef.current.addEventListener('load', f);
    return () => {
      if (iframeRef && iframeRef.current) {
        iframeRef.current.removeEventListener('load', f);
      }
    };
  }, []);

  return <iframe ref={iframeRef} src={url} width="400px" height="300px" />;
});

export default M_Iframe;
