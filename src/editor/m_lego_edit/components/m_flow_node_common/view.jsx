/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
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
  const { model = {}, graphModel, isSelected, isHovered, disabled, properties = {} } = props;

  const name = (model.getNodeName && model.getNodeName()) || '未知';
  const logo = (model.getNodeLogo && model.getNodeLogo()) || defaultLogo;
  const cls = (model.getNodeClassName && model.getNodeClassName()) || '';

  const inputFields = model.getInputFields && model.getInputFields();
  const outputFields = model.getOutputFields && model.getOutputFields();

  return (
    <div className={cn(['node-wrap', properties.status, 'base', cls, properties.executeStatus])}>
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
  );
}
