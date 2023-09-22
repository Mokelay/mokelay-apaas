import './style.css';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import SmartButtonOutlinedIcon from '@mui/icons-material/SmartButtonOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';

/**
 * M_Ui_Edit
 * 包含 top-area left-area main-area right-area bottom-area 5个区域
 *
 *
 */
//存储编辑状态的全局变量
window.__Mokelay._Edit = {};

const M_Ui_Edit = forwardRef(function M_Ui_Edit(props, ref) {
  const [active, setActive] = useState(false);

  const [opZone, setOpZone] = useState(null);
  const [childrenPositions, setChildrenPositions] = useState([]);

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
        /**
         * 激活布局编辑
         */
        active: function (e) {
          //激活编辑模式
          // setActive(true);
          //设置编辑层所在iframe
          window.__Mokelay._Edit._Iframe = e.target;

          //TODO 实现加载node tree ，不是很完美的实现方式，临时方案，后面优化
          setTimeout(function () {
            var editDSL =
              window.__Mokelay._Edit._Iframe.contentWindow.__Mokelay.Root.UIRef.current.getDSL();

            var _copy = function (node) {
              var n = {};
              n['id'] = node['uuid'];
              n['name'] = node['name'];

              var children = node['children'];
              if (children) {
                n['children'] = [];
                children.map(function (c) {
                  n['children'].push(_copy(c));
                });
              }

              return n;
            };
            // console.log(_copy(editDSL));
            window.__Mokelay.ComponentInstantMap.view_tree.current.loadData(_copy(editDSL));
          }, 0);
        },
        action: function () {
          resizeView();
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
   * Action Event
   * @param {*} data
   */
  function actionEvent(data) {
    var mousePosition = { x: data.clientX, y: data.clientY };
    var eventName = data['eventName'];
    var containerUUID = data['containerUUID'];
    // console.log(eventName + ',' + new Date().getTime());

    //获取容器布局对象
    var containerRef =
      window.__Mokelay._Edit._Iframe.contentWindow.__Mokelay.ComponentInstantMap[containerUUID];
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

    var _executeAction = function () {
      if (_mouseViewUUID != null) {
        setChildrenPositions([_allView[_mouseViewUUID]]);
      } else {
        setChildrenPositions(Object.values(_allView));
      }
    };

    if (eventName == 'onMouseEnter') {
      setActive(true);

      _executeAction();

      //监听渲染层的iframe事件
      var f = function () {
        actionEvent({
          x: data.clientX,
          y: data.clientY,
          eventName: 'onScroll',
          containerUUID: containerUUID,
        });
      };

      window.__Mokelay._Edit._Iframe.contentWindow.removeEventListener('scroll', f);
      window.__Mokelay._Edit._Iframe.contentWindow.addEventListener('scroll', f);
    } else if (eventName == 'onMouseMove') {
      _executeAction();
    } else if (eventName == 'onClick') {
      setOpZone(_allView[_mouseViewUUID] || null);

      //把编辑的UUID记录到window下面
      window.__Mokelay._Edit._Edit_View_UUID = _mouseViewUUID || null;
    } else if (eventName == 'onScroll') {
      _executeAction();
      setOpZone(_allView[window.__Mokelay._Edit._Edit_View_UUID] || null);
    } else if (eventName == 'onMouseLeave') {
      // console.log('leave.............');
      // setActive(false);
    }
  }

  /**
   * Resize
   */
  function resizeView() {
    //TODO
    var editMokelay = window.__Mokelay._Edit._Iframe.contentWindow.__Mokelay;
    editMokelay.ComponentInstantMap.home_page.current.resizeView();
  }

  /**
   * 排序
   */
  function sortView() {}

  /**
   * 新加
   */
  function addNewView() {}

  /**
   * 拷贝DSL
   */
  function copyView() {}

  /**
   * 创建副本
   */
  function createCopyView() {}

  /**
   * 删除UI
   */
  function deleteView() {}

  return (
    <>
      {active && (
        <Layout_Edit
          position={window.__Mokelay._Edit._Iframe.getBoundingClientRect()}
          childrenPositions={childrenPositions}
          opZone={opZone}
        />
      )}
    </>
  );
});

function Layout_Edit({ position, childrenPositions, opZone }) {
  return (
    <>
      <div className="nclc-selecting-box" style={{ left: position.left, top: position.top }}>
        {/* 显示View的操作 */}
        <ShowViewOperation opZone={opZone} />

        {/* 显示UI的Border */}
        {<ShowUIBorder position={position} />}

        {/* 显示所有View的虚框 */}
        {<ShowViewBorders position={position} childrenPositions={childrenPositions} />}
      </div>
      {/* 显示拖动ICON */}
      {true && <DragIcon />}
    </>
  );
}

/**
 * 显示UI看板的Border
 * @returns EL
 */
function ShowUIBorder({ position }) {
  return (
    <div
      className="nclc-border nclc-border-selecting"
      style={{
        width: position.width + 'px',
        height: position.height + 'px',
        // top: position.top + 'px',
        // left: position.left + 'px',
        transform: 'translate3d(0px, 0px, 0px)',

        backgroundImage:
          'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221200%22%20height%3D%22400%22%3E%20%3Cg%20opacity%3D%220.8%22%3E%20%20%3Cline%20id%3D%22svg_2%22%20y2%3D%22400%22%20x2%3D%22100%22%20y1%3D%220%22%20x1%3D%22100%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_3%22%20y2%3D%22400%22%20x2%3D%22200%22%20y1%3D%220%22%20x1%3D%22200%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_4%22%20y2%3D%22400%22%20x2%3D%22300%22%20y1%3D%220%22%20x1%3D%22300%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_5%22%20y2%3D%22400%22%20x2%3D%22400%22%20y1%3D%220%22%20x1%3D%22400%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_6%22%20y2%3D%22400%22%20x2%3D%22500%22%20y1%3D%220%22%20x1%3D%22500%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_7%22%20y2%3D%22400%22%20x2%3D%22600%22%20y1%3D%220%22%20x1%3D%22600%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_8%22%20y2%3D%22400%22%20x2%3D%22700%22%20y1%3D%220%22%20x1%3D%22700%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_9%22%20y2%3D%22400%22%20x2%3D%22800%22%20y1%3D%220%22%20x1%3D%22800%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_10%22%20y2%3D%22400%22%20x2%3D%22900%22%20y1%3D%220%22%20x1%3D%22900%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_11%22%20y2%3D%22400%22%20x2%3D%221000%22%20y1%3D%220%22%20x1%3D%221000%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%20%2F%3E%20%20%3Cline%20id%3D%22svg_12%22%20y2%3D%22400%22%20x2%3D%221100%22%20y1%3D%220%22%20x1%3D%221100%22%20stroke-width%3D%222%22%20stroke%3D%22%23bacefd%22%2F%3E%20%3C%2Fg%3E%3C%2Fsvg%3E")',
        backgroundPosition: 'center center',
        backgroundSize: '100%',
        backgroundRepeat: 'repeat',
      }}
    ></div>
  );
}

/**
 * 显示针对每个View的操作
 */
function ShowViewOperation({ opZone }) {
  // console.log(opZone);
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
  return (
    opZone && (
      <div
        className="nclc-border nclc-border-selecting"
        style={{
          top: opZone.top + 'px',
          left: opZone.left + 'px',
          width: opZone.width + 'px',
          height: opZone.height + 'px',
          // transform: 'translate3d(' + opZone.left + 'px, ' + opZone.top + 'px, 0px)',
          zIndex: 10,
        }}
      >
        <div
          className="nclc-border-actionbar"
          style={{
            // top: opZone.top + 'px',
            // left: opZone.left + 'px',
            height: '24px',
            marginTop: opZone.height + 'px',
          }}
        >
          <div className="nclc-context-crumbs" data-testid="crumbs">
            <div className="nclc-context-crumbs-item">
              <SmartButtonOutlinedIcon fontSize="small" />
              <span className="label" data-tip="按钮" data-testid="label">
                按钮
              </span>
            </div>
          </div>
          <div className="view-actions">
            <div className="nclc-context-actionitem" onClick={deleteView}>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </div>
            <div className="nclc-context-actionitem" onClick={createCopyDSL}>
              <DifferenceOutlinedIcon fontSize="small" />
            </div>
            <div className="nclc-context-actionitem" onClick={copyViewDSL}>
              <ContentCopyOutlinedIcon fontSize="small" />
            </div>
          </div>
        </div>
        <div className="nclc-grid-width-modifier" style={{}}>
          {/* <div className="position-preview" /> */}
          <div className="modifier-border">
            <div
              className="modifier-handler left-handler"
              style={{
                transform: 'translate(-50%, -50%)',
                transformOrigin: 'left top',
              }}
            />
            <div
              className="modifier-handler right-handler"
              style={{
                transform: 'translate(50%, -50%)',
                transformOrigin: 'right top',
              }}
            />
          </div>
        </div>
      </div>
    )
  );
}

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
      data-role="ghost"
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
