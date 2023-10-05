/* eslint-disable no-redeclare */
/* eslint-disable react/prop-types */
import './style.css';
import { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import M_Iframe from '../../component/m_iframe/index';
import M_View_Operation from './m_view_operation/index';
import DSL from '../../util/dsl';

import SmartButtonOutlinedIcon from '@mui/icons-material/SmartButtonOutlined';

/**
 * M_Ui_Edit
 * 包含 top-area left-area main-area right-area bottom-area 5个区域
 *
 *
 */
const M_Ui_Edit = forwardRef(function M_Ui_Edit({ styles, onViewSelect }, ref) {
  // const [active, setActive] = useState(false);

  //Edit Iframe
  const editIframe = useRef(null);

  //编辑区域位置
  const [editPosition, setEditPosition] = useState({ left: 0, top: 0, width: 0, height: 0 });
  //编辑View
  const [opZone, setOpZone] = useState(null);
  //编辑区域内所有子节点
  const [childrenPositions, setChildrenPositions] = useState([]);

  // 是否开始resize
  const [resizeStart, setResizeStart] = useState(false);

  // TODO 待重构
  // //所有View的坐标
  // const [allView, setAllView] = useState({});
  // //鼠标所在的View的坐标
  // const [mouseViewUUID, setMouseViewUUID] = useState(null);
  // //需要操作的View UUID
  // const [workViewUUID, setWorkViewUUID] = useState(null);

  //暴露对外函数
  useImperativeHandle(
    ref,
    () => {
      return {
        //Load DSL
        loadDSL: function ({ ...args }, dsl) {
          //用全局变量来确保iframe加载完成后进行post message
          if (window.__Mokelay._Edit._Iframe_Loaded) {
            editIframe.current.postMessage({}, dsl);
          } else {
            setTimeout(function () {
              editIframe.current.postMessage({}, dsl);
            }, 1000);
          }
        },
        //Select View
        selectView: function ({ e }, viewUUID, isContainer, containerUUID) {
          // console.log('Select view:');
          // console.log(arguments);
          //只对非容器的View做选择处理
          if (!isContainer) {
            var data = { x: e.clientX, y: e.clientY };
            data['eventName'] = 'onSelectView';
            data['containerUUID'] = containerUUID;
            data['viewUUID'] = viewUUID;

            console.log(data);
            actionEvent(data);
          }
        },
      };
    },
    [],
  );

  //接收来自渲染层的事件和数据
  useEffect(() => {
    var f = function (e) {
      try {
        if (typeof e.data == 'string') {
          actionEvent(JSON.parse(e.data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener('message', f);
    return () => {
      window.removeEventListener('message', f);
    };
  }, []);

  /**
   * 激活布局编辑
   *
   * @param {*} e
   */
  function active({ e }) {
    //激活编辑模式
    // setActive(true);

    //设置编辑区域位置
    window.__Mokelay._Edit._Iframe_Loaded = true;
    setEditPosition(editIframe.current.getBoundingClientRect());
  }

  /**
   * Action Event
   * @param {*} data
   */
  function actionEvent(data) {
    var mousePosition = { x: data.clientX, y: data.clientY };
    var eventName = data['eventName'];

    if (data['containerUUID']) {
      window.__Mokelay._Edit._Container_UUID = data['containerUUID'];
    }
    // console.log(eventName + ',' + new Date().getTime());

    //获取容器布局对象
    var containerRef =
      editIframe.current.getMokelay().ComponentInstantMap[window.__Mokelay._Edit._Container_UUID][
        'ref'
      ];
    var childMap = containerRef.current.getChildrenMap() || {};
    //获取容器内所有的组件列表的位置坐标
    //获取鼠标所在的组件的位置坐标
    var _allView = {};
    var _mouseViewUUID = null;
    for (var k in childMap) {
      var rect = childMap[k].current.getBoundingClientRect();
      _allView[k] = rect;

      if (
        _mouseViewUUID == null &&
        mousePosition.x >= rect.x &&
        mousePosition.x <= rect.x + rect.width &&
        mousePosition.y >= rect.y &&
        mousePosition.y <= rect.y + rect.height
      ) {
        _mouseViewUUID = k;
      }
    }

    if (eventName == 'onMouseEnter') {
      //激活编辑div
      // setActive(true);

      //显示鼠标所在dom，或者显示所有dom
      setChildrenPositions(
        _mouseViewUUID != null ? [_allView[_mouseViewUUID]] : Object.values(_allView),
      );

      //监听渲染层的iframe事件
      var f = function () {
        actionEvent({
          x: data.clientX,
          y: data.clientY,
          eventName: 'onScroll',
          containerUUID: window.__Mokelay._Edit._Container_UUID,
        });
      };
      editIframe.current.getWindow().removeEventListener('scroll', f);
      editIframe.current.getWindow().addEventListener('scroll', f);
    } else if (eventName == 'onMouseMove') {
      // 显示鼠标所在的dom，虚框显示
      // console.log('on mouse move');
      setChildrenPositions(
        _mouseViewUUID != null ? [_allView[_mouseViewUUID]] : Object.values(_allView),
      );
    } else if (eventName == 'onMouseDown') {
      //TODO
      // console.log('mouse donw..');
    } else if (eventName == 'onMouseUp') {
      //TODO
      // console.log('mouse up..');
    } else if (eventName == 'onClick') {
      //显示选中的dom，并且记录到window下面
      setOpZone(_allView[_mouseViewUUID] || null);

      //把编辑的UUID记录到window下面
      window.__Mokelay._Edit._Edit_View_UUID = _mouseViewUUID || null;

      //把选中的View通过事件fire出去
      if (onViewSelect) {
        onViewSelect({ viewUUID: _mouseViewUUID });
      }
    } else if (eventName == 'onSelectView') {
      //激活编辑div
      // setActive(true);

      //显示选中的dom，并且记录到window下面
      setOpZone(_allView[data['viewUUID']] || null);

      //把编辑的UUID记录到window下面
      window.__Mokelay._Edit._Edit_View_UUID = _mouseViewUUID || null;
    } else if (eventName == 'onScroll') {
      setChildrenPositions(
        _mouseViewUUID != null ? [_allView[_mouseViewUUID]] : Object.values(_allView),
      );
      setOpZone(_allView[window.__Mokelay._Edit._Edit_View_UUID] || null);
    } else if (eventName == 'onResizeBegin') {
      setResizeStart(true);
    } else if (eventName == 'onResizeEnd') {
      setResizeStart(false);
      var gridNumber = data['gridNumber'];
      // console.log(gridNumber);
      //更新DSL
      DSL.updateGridNumber(window.__Mokelay._Edit._Edit_View_UUID, gridNumber);
    } else if (eventName == 'onMouseLeave') {
      // console.log('leave.............');
      // setActive(false);
    }
  }

  return (
    <>
      <M_Iframe url="edit.html" styles={styles} onLoad={active} ref={editIframe}></M_Iframe>
      <div
        className={'ui-edit-container ui-border ui-border-selecting'}
        style={
          resizeStart
            ? {
                left: editPosition.left,
                top: editPosition.top,
                width: editPosition.width + 'px',
                height: editPosition.height + 'px',
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22400%22%3E%20%3Cg%20opacity%3D%220.8%22%3E%20%20%3Cline%20id%3D%22svg_2%22%20y2%3D%22400%22%20x2%3D%22100%22%20y1%3D%220%22%20x1%3D%22100%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_3%22%20y2%3D%22400%22%20x2%3D%22200%22%20y1%3D%220%22%20x1%3D%22200%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_4%22%20y2%3D%22400%22%20x2%3D%22300%22%20y1%3D%220%22%20x1%3D%22300%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_5%22%20y2%3D%22400%22%20x2%3D%22400%22%20y1%3D%220%22%20x1%3D%22400%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_6%22%20y2%3D%22400%22%20x2%3D%22500%22%20y1%3D%220%22%20x1%3D%22500%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_7%22%20y2%3D%22400%22%20x2%3D%22600%22%20y1%3D%220%22%20x1%3D%22600%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_8%22%20y2%3D%22400%22%20x2%3D%22700%22%20y1%3D%220%22%20x1%3D%22700%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_9%22%20y2%3D%22400%22%20x2%3D%22800%22%20y1%3D%220%22%20x1%3D%22800%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_10%22%20y2%3D%22400%22%20x2%3D%22900%22%20y1%3D%220%22%20x1%3D%22900%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_11%22%20y2%3D%22400%22%20x2%3D%221000%22%20y1%3D%220%22%20x1%3D%221000%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_12%22%20y2%3D%22400%22%20x2%3D%221100%22%20y1%3D%220%22%20x1%3D%221100%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%2F%3E%20%3C%2Fg%3E%3C%2Fsvg%3E")',
                backgroundPosition: 'center center',
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
              }
            : {
                left: editPosition.left,
                top: editPosition.top,
                width: editPosition.width + 'px',
                height: editPosition.height + 'px',
              }
        }
      >
        {/* 显示View的操作 */}
        <M_View_Operation
          position={editPosition}
          opZone={opZone}
          onResizeBegin={actionEvent}
          onResizeEnd={actionEvent}
        />

        {/* 显示所有View的虚框 */}
        {<ShowViewBorders position={editPosition} childrenPositions={childrenPositions} />}

        {/* 显示拖动ICON */}
        {false && <DragIcon />}
      </div>
    </>
  );
});

/**
 * 鼠标进入，展示所有元素的虚框
 *
 * @returns
 */
function ShowViewBorders({ position, childrenPositions }) {
  const Rects = childrenPositions.map(function (p, i) {
    return (
      <rect
        key={i}
        x={p.x}
        y={p.y}
        height={p.height}
        width={p.width}
        strokeWidth={1}
        stroke="#3370FF"
        strokeDasharray="3 3"
      />
    );
  });
  // console.log(Rects);

  return (
    <svg
      width={position.width}
      height={position.height}
      fill="transparent"
      style={
        {
          // transform: 'translate(-10px, -10px)'
        }
      }
    >
      {Rects}
    </svg>
  );
}

/**
 * 拖动元素的icon
 * @returns EL
 */
function DragIcon() {
  return (
    <div
      className="canvas-ghost-container"
      style={{
        // transform: 'translate(570.405px, 322.979px)',
        opacity: '0.8',
      }}
    >
      <div className="canvas-ghost-icon">
        <SmartButtonOutlinedIcon />
      </div>
      <div className="canvas-ghost-title">按钮</div>
    </div>
  );
}

export default M_Ui_Edit;
