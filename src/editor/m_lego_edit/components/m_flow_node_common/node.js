import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { HtmlNode, h } from '@logicflow/core';
import View from './view';

/**
 * 自定义HTML节点视图对象
 */
export default class LegoNodeView extends HtmlNode {
  constructor(props) {
    super(props);
    this.root = document.createElement('div');
    this.reactComponent = View;
  }
  shouldUpdate() {
    const data = {
      ...this.props.model.properties,
      isSelected: this.props.model.isSelected,
      isHovered: this.props.model.isHovered,
    };
    if (this.preProperties && this.preProperties === JSON.stringify(data)) return;
    this.preProperties = JSON.stringify(data);
    return true;
  }
  setHtml(rootEl) {
    if (!this.vm) {
      rootEl.appendChild(this.root);
      this.vm = createRoot(this.root);
      this.vm.render(
        createElement(this.reactComponent, {
          model: this.props.model,
          graphModel: this.props.graphModel,
          disabled: this.props.graphModel.editConfigModel.isSilentMode,
          isSelected: this.props.model.isSelected,
          isHovered: this.props.model.isHovered,
          properties: this.props.model.getProperties(),
        }),
      );
    }
  }
  getAnchorShape(anchorData) {
    const { x, y, type } = anchorData;
    return h('rect', {
      x: x - 3,
      y: y - 3,
      width: 6,
      height: 6,
      className: `custom-anchor ${type === 'incomming' ? 'incomming-anchor' : 'outgoing-anchor'}`,
    });
  }
}
