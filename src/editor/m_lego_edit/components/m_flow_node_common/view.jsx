/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import { useHover } from 'ahooks';
import './index.less';

export const defaultLogo =
  'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_anniu@2x.png';

// FVT 的css
const FVTTag = {
  request: 'fvt_request',
  constant: 'fvt_constant',
  session: 'fvt_session',
  output: 'fvt_output',
};

/**
 * 自定义HTML节点视图
 * @param {*} props
 * @returns
 */
export default function LegoView(props) {
  const { model = {}, graphModel, isSelected, isHovered, disabled } = props;

  const properties = model.getProperties();

  const name = (model.getNodeName && model.getNodeName()) || '未知';
  const logo = (model.getNodeLogo && model.getNodeLogo()) || defaultLogo;
  const cls = (model.getNodeClassName && model.getNodeClassName()) || '';
  const inputFields = model.getInputFields && model.getInputFields();
  const outputFields = model.getOutputFields && model.getOutputFields();

  const mouseStartTime = React.useRef();
  const ref = React.useRef(null);
  const isHovering = useHover(ref, {
    onEnter: () => {
      if (model.properties && model.properties.status === 'selected') return;
      model.setProperties({
        status: 'hovered',
      });
    },
    onLeave: () => {
      if (model.properties && model.properties.status === 'selected') return;
      model.setProperties({
        status: 'normal',
      });
    },
  });

  const deleteNode = () => {
    graphModel.eventCenter.emit(`node:delete-node`, model);
  };

  // 选择节点
  const goConfig = () => {
    graphModel.eventCenter.emit(`node:select-click`, model);
  };

  // 节点按下
  const handleMousedown = () => {
    mouseStartTime.current = new Date().getTime();
    console.log('mouseStartTime.current:', mouseStartTime.current);
  };
  // 节点鼠标释放
  const handleMouseup = () => {
    const mousedownDuration = new Date().getTime() - mouseStartTime.current;
    console.log('mousedownDuration: ', mousedownDuration);
    // 非拖拽才显示抽屉
    if (mousedownDuration < 1000) {
      setTimeout(() => {
        graphModel.eventCenter.emit(`node:select-click`, model);
      }, 100);
    }
  };

  console.log('properties.status: ', properties.status);

  return (
    <div
      ref={ref}
      className={cn(['node-wrap', properties.status, 'base', cls, properties.executeStatus])}
      onMouseDown={handleMousedown}
      onMouseUp={handleMouseup}
    >
      <div>
        {Array.isArray(inputFields) && inputFields.length > 0 && (
          <div className="node-inputfields">
            {inputFields.map((field, index) => {
              return (
                <span className={`node-tag ${FVTTag[field.fvt] || ''}`} key={index}>
                  {field.name}
                </span>
              );
            })}
          </div>
        )}

        <div className="node-title">
          <span className="node-name">{name}</span>
        </div>
        {Array.isArray(outputFields) && outputFields.length > 0 && (
          <div className="node-outputfields">
            {outputFields.map((field, index) => {
              return (
                <span className={`node-tag ${field.response ? 'fvt_response' : ''}`} key={index}>
                  {field.name}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
