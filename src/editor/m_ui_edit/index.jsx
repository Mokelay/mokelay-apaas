import './style.css';
import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

/**
 * M_Ui_Edit
 * 包含 top-area left-area main-area right-area bottom-area 5个区域
 *
 *
 */
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
          window.__Mokelay._Edit_Iframe = e.target;
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

    //获取容器布局对象
    var containerRef =
      window.__Mokelay._Edit_Iframe.contentWindow.__Mokelay.ComponentInstantMap[containerUUID];
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

      window.__Mokelay._Edit_Iframe.contentWindow.removeEventListener('scroll', f);
      window.__Mokelay._Edit_Iframe.contentWindow.addEventListener('scroll', f);
    } else if (eventName == 'onMouseMove') {
      _executeAction();
    } else if (eventName == 'onClick') {
      setOpZone(_allView[_mouseViewUUID] || null);

      //把编辑的UUID记录到window下面
      window.__Mokelay._Edit_View_UUID = _mouseViewUUID || null;
    } else if (eventName == 'onScroll') {
      _executeAction();
      setOpZone(_allView[window.__Mokelay._Edit_View_UUID] || null);
    } else if (eventName == 'onMouseLeave') {
      setActive(false);
    }
  }

  /**
   * Resize
   */
  function resizeView() {
    //TODO
    var editMokelay = window.__Mokelay._Edit_Iframe.contentWindow.__Mokelay;
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
          position={window.__Mokelay._Edit_Iframe.getBoundingClientRect()}
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
      }}
    >
      {/* 这个SVG对象还没弄清楚存在的必要性？ */}
      {/* <svg
        width={position.width + 20}
        height={position.height + 20}
        fill="transparent"
        style={{ transform: 'translate(-10px, -10px)' }}
      >
        <rect
          x={10}
          y={10}
          height={position.height}
          width={position.width}
          strokeWidth={1}
          stroke="#3370FF"
          strokeDasharray="3 3"
        />
      </svg> */}
    </div>
  );
}

/**
 * 显示针对每个View的操作
 */
function ShowViewOperation({ opZone }) {
  // console.log(opZone);
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
              <svg
                fill="currentColor"
                stroke="none"
                preserveAspectRatio="xMidYMid meet"
                width="1em"
                height="1em"
                viewBox="0 0 480 480"
                className="done-icon "
                style={{ color: 'currentcolor' }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M66 113.664C54.9543 113.664 46 122.543 46 133.496V250.504C46 261.457 54.9543 270.336 66 270.336H116L125 310H66C32.8629 310 6 283.363 6 250.504V133.496C6 100.637 32.8629 74 66 74H414C447.137 74 474 100.637 474 133.496V248.521C474 281.38 447.137 306.034 414 306.034L358 268.353H414C425.046 268.353 434 259.474 434 248.521V133.496C434 122.543 425.046 113.664 414 113.664H66Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M152.46 235.443C148.349 215.386 169.626 199.722 187.556 209.605L356.277 302.599C376.628 313.816 370.751 344.521 347.696 347.429L289.738 354.741L343.85 429.2L311.492 452.715L258.866 380.301L236.652 427.723C226.887 448.568 196.221 445.043 191.441 422.526L172.983 335.579L152.46 235.443ZM293.91 313.898L198.605 261.368L212.141 327.41L220.664 367.559L237.169 332.324C240.662 324.868 247.731 319.724 255.899 318.693L293.91 313.898Z"
                />
              </svg>
              <span className="label" data-tip="按钮" data-testid="label">
                按钮
              </span>
            </div>
          </div>
          <div className="nclc-context-actions">
            <div className="nclc-context-actionitem">
              <span className="universe-icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-icon="DeleteTrashOutlined"
                >
                  <path
                    d="M8 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2h5a1 1 0 1 1 0 2h-1v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H3a1 1 0 0 1 0-2h5ZM6 6v14h12V6H6Zm4 3a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
            <div className="nclc-context-actionitem">
              <span className="universe-icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-icon="BulkAddOutlined"
                >
                  <path
                    d="M11 10.5a1 1 0 1 0-2 0V13H6.5a1 1 0 1 0 0 2H9v2.5a1 1 0 1 0 2 0V15h2.5a1 1 0 1 0 0-2H11v-2.5Z"
                    fill="currentColor"
                  />
                  <path
                    d="M6 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4Zm14 12V4H8v2h8a2 2 0 0 1 2 2v8h2Zm-4-8H4v12h12V8Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
            <div className="nclc-context-actionitem">
              <span className="universe-icon">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  data-icon="CopyOutlined"
                >
                  <path
                    d="M9 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12a1 1 0 1 1-2 0V4h-9a1 1 0 0 1-1-1Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5 6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5Zm0 2h10v12H5V8Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="nclc-grid-width-modifier" style={{}}>
          {/* <div className="position-preview" /> */}
          <div className="modifier-border">
            {/* <svg
              width={592}
              height={863}
              fill="transparent"
              style={{ transform: 'translate(-10px, -86px)' }}
            >
              <rect x={10} y={86} height={42} width="74.09375" strokeWidth={2} stroke="#3370FF" />
            </svg> */}
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
            {/* <div className="drag-state-tip">取消</div> */}
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
      {/* <rect
        x={10}
        y={10}
        height={50}
        width={1140}
        strokeWidth={1}
        stroke="#3370FF"
        strokeDasharray="3 3"
      />
      <rect
        x={10}
        y={60}
        height={38}
        width={1140}
        strokeWidth={1}
        stroke="#3370FF"
        strokeDasharray="3 3"
      /> */}
    </svg>
  );
}

/**
 * 拖动元素的icon
 * @returns EL
 */
function DragIcon() {
  return (
    // <div className="global-accessory-layer" style={{}}>
    <div
      data-role="ghost"
      className="canvas-ghost-container"
      style={{
        // transform: 'translate(570.405px, 322.979px)',
        opacity: '0.8',
      }}
    >
      <div className="canvas-ghost-icon">
        <svg
          fill="currentColor"
          stroke="none"
          preserveAspectRatio="xMidYMid meet"
          width="1em"
          height="1em"
          viewBox="0 0 480 480"
          className="done-icon "
          style={{ color: 'currentcolor' }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M66 113.664C54.9543 113.664 46 122.543 46 133.496V250.504C46 261.457 54.9543 270.336 66 270.336H116L125 310H66C32.8629 310 6 283.363 6 250.504V133.496C6 100.637 32.8629 74 66 74H414C447.137 74 474 100.637 474 133.496V248.521C474 281.38 447.137 306.034 414 306.034L358 268.353H414C425.046 268.353 434 259.474 434 248.521V133.496C434 122.543 425.046 113.664 414 113.664H66Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M152.46 235.443C148.349 215.386 169.626 199.722 187.556 209.605L356.277 302.599C376.628 313.816 370.751 344.521 347.696 347.429L289.738 354.741L343.85 429.2L311.492 452.715L258.866 380.301L236.652 427.723C226.887 448.568 196.221 445.043 191.441 422.526L172.983 335.579L152.46 235.443ZM293.91 313.898L198.605 261.368L212.141 327.41L220.664 367.559L237.169 332.324C240.662 324.868 247.731 319.724 255.899 318.693L293.91 313.898Z"
          />
        </svg>
      </div>
      <div className="canvas-ghost-title">按钮</div>
    </div>
    // </div>
  );
}

export default M_Ui_Edit;
