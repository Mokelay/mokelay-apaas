/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import './index.less';

export const defaultLogo =
  'https://s3-gzpu.didistatic.com/tiyan-base-store/form-editor/pc/icon_anniu@2x.png';

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

  return (
    <div className={cn(['node-wrap', properties.status, 'base', cls, properties.executeStatus])}>
      <div className="node-title">
        <span className="node-icon">
          <img src={logo} alt="" />
        </span>
        <span className="node-name">{name}</span>
      </div>
    </div>
  );
}
