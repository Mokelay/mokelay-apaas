import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import SmartButtonOutlinedIcon from '@mui/icons-material/SmartButtonOutlined';

/**
 * 显示针对每个View的操作
 */
const M_View_Operation = function ({ position, opZone, onResizeBegin, onResizeEnd }) {
  //Bar ref
  const barRef = useRef(null);
  //是否开始Resize
  const [beginResize, setBeginResize] = useState(false);
  //是否右边resize
  const [rightResize, setRightResize] = useState(false);
  //占用的grid数字
  const [gridNumber, setGridNumber] = useState(0);
  // const isINOpt = useRef(false);

  function deleteView() {
    // console.log(e);
    // e.preventDefault();
    console.log('delete view...');
  }
  function copyViewDSL() {
    console.log('copy view dsl...');
  }

  function createCopyDSL() {
    console.log('create copy dsl...');
  }

  //Mouse Leave
  function mouseLeave() {
    // isINOpt.current = false;
  }

  //Mouse Enter
  function mouseEnter() {
    // isINOpt.current = true;
  }

  function resize(e) {
    var clientX = e.clientX;
    var isRightResize = e.target.className.indexOf('right-handler') > 0;
    // console.log('#############################');
    // console.log(e);
    // console.log(isRightResize);
    // console.log('position.left:' + position.left);
    // console.log('position.width:' + position.width);
    // console.log('opZone.x:' + opZone.x);
    // console.log('opZone.left:' + opZone.left);
    // console.log('opZone.width:' + opZone.width);
    // console.log('clientX:' + clientX);

    //设置Resize Width
    if (isRightResize) {
      //右边Resize
      var resizeWidth = clientX - position.left - opZone.left;
      if (clientX > 0 && resizeWidth > 0) {
        barRef.current.style.width = resizeWidth + 'px';
        // console.log('position.width:' + position.width);
        // console.log('resizeWidth:' + resizeWidth);
        setGridNumber((resizeWidth / (position.width / 12)).toFixed());
      }
    } else {
      //左边Resize
      var resizeWidth = opZone.width + opZone.left - (clientX - position.left);
      var resizeLeft = opZone.left - (resizeWidth - opZone.width);

      if (clientX > 0 && resizeWidth > 0 && resizeLeft > 0) {
        barRef.current.style.left = resizeLeft + 'px';
        barRef.current.style.width = resizeWidth + 'px';

        // console.log('resizeWidth:' + resizeWidth);
        // console.log('resizeLeft:' + resizeLeft);
        setGridNumber((resizeWidth / (position.width / 12)).toFixed());
      }
    }
    // console.log('#############################');
  }

  //开始resize
  function resizeBegin(e) {
    setBeginResize(true);
    setRightResize(e.target.className.indexOf('right-handler') > 0);

    if (onResizeBegin) {
      onResizeBegin({
        eventName: 'onResizeBegin',
        clientX: e.clientX,
        clientY: e.clientY,
      });
    }
  }
  //结束resize
  function resizeEnd(e) {
    //停止Resize
    setBeginResize(false);

    //复原Width/Left
    // barRef.current.style.width = opZone.width + 'px';
    // barRef.current.style.left = opZone.left + 'px';

    if (onResizeEnd) {
      //把grid number 数据传递出去
      onResizeEnd({
        eventName: 'onResizeEnd',
        clientX: e.clientX,
        clientY: e.clientY,
        gridNumber: gridNumber,
      });
    }
  }
  return (
    opZone && (
      <div
        className="ui-border ui-border-selecting"
        ref={barRef}
        onMouseLeave={mouseLeave}
        onMouseEnter={mouseEnter}
        style={{
          top: opZone.top + 'px',
          left: opZone.left + 'px',
          width: opZone.width + 'px',
          height: opZone.height + 'px',
          zIndex: 10,
        }}
      >
        <div
          className="action-bar"
          style={{
            height: '24px',
            marginTop: opZone.height + 'px',
          }}
        >
          <div className="view-context">
            <SmartButtonOutlinedIcon fontSize="small" />
            <span className="label">按钮</span>
          </div>
          <div className="view-actions">
            <div className="action-item" onClick={deleteView}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </div>
            <div className="action-item" onClick={createCopyDSL}>
              <DifferenceOutlinedIcon fontSize="small" />
            </div>
            <div className="action-item" onClick={copyViewDSL}>
              <ContentCopyOutlinedIcon fontSize="small" />
            </div>
          </div>
        </div>
        <div className="width-modifier" style={{ pointerEvents: 'all' }} draggable="true">
          <div
            className="modifier-handler left-handler"
            style={{
              transform: 'translate(-50%, -50%)',
              transformOrigin: 'left top',
              pointerEvents: 'all',
            }}
            draggable="true"
            onDragStart={resizeBegin}
            onDrag={resize}
            onDragEnd={resizeEnd}
          />
          <div
            className="modifier-handler right-handler"
            style={{
              transform: 'translate(50%, -50%)',
              transformOrigin: 'right top',
              pointerEvents: 'all',
            }}
            draggable="true"
            onDragStart={resizeBegin}
            onDrag={resize}
            onDragEnd={resizeEnd}
          />
          {beginResize && (
            <div className={rightResize ? 'state-tip pos-right' : 'state-tip pos-left'}>
              {gridNumber}
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default M_View_Operation;
