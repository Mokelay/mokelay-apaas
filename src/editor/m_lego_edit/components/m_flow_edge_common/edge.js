import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { PolylineEdge, PolylineEdgeModel, h } from '@logicflow/core';
import { LINE_OFFSET } from '../../util/const';
import View from './view';
import './index.less';

const DISTANCE = 12;
const ICON_HEIGHT = 24;
const ICON_WIDTH = 24;
const WORD_HEIGHT = 24;

class LegoEdge extends PolylineEdge {
  constructor(props) {
    super(props);

    // this.ViewElement = createElement(View, {
    //   model: props.model,
    //   graphModel: props.graphModel,
    //   disabled: props.graphModel.editConfigModel.isSilentMode,
    //   isSelected: props.model.isSelected,
    //   isHovered: props.model.isHovered,
    //   properties: props.model.getProperties(),
    // });
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

  getText() {
    // 几种情况的处理：1.一个节点连出多条边 2.一个节点的入口连入多条边 3.线的回连
    const { graphModel } = this.props;
    const { pointsList, text, sourceNodeId, targetNodeId } = this.props.model;
    if (!pointsList || pointsList.length === 0) return null;
    let width = 0;
    let height = 0;
    let direction = '';
    const positionData = {};
    const targetInlines = graphModel.getNodeIncomingEdge(targetNodeId);
    // 如果后一个节点入口有多条线
    if (targetInlines.length && targetInlines.length > 1) {
      let lastPoint = {},
        lastPrePoint = {};
      if (pointsList.length >= 4) {
        lastPoint = pointsList[pointsList.length - 2];
        lastPrePoint = pointsList[pointsList.length - 3];
      } else {
        lastPoint = {
          x: pointsList[0].x + LINE_OFFSET,
          y: pointsList[0].y,
        };
        lastPrePoint = pointsList[0];
      }
      width = Math.abs(lastPoint.x - lastPrePoint.x);
      height = Math.abs(lastPoint.y - lastPrePoint.y);
      direction = '';
      positionData.x = (lastPoint.x + lastPrePoint.x) / 2 - ICON_HEIGHT / 2;
      positionData.y = (lastPoint.y + lastPrePoint.y) / 2 - ICON_HEIGHT / 2;
    } else {
      const lastPoint = pointsList[pointsList.length - 1];
      const lastPrePoint = pointsList[pointsList.length - 2];
      // let maxWidth = Math.max(Math.abs(lastPoint.x - lastPrePoint.x), Math.abs(lastPoint.y - lastPrePoint.y));
      width = Math.abs(lastPoint.x - lastPrePoint.x);
      height = Math.abs(lastPoint.y - lastPrePoint.y);
      direction = '';
      if (lastPoint.x < lastPrePoint.x) {
        // 箭头向左
        direction = 'row';
        positionData.x = lastPoint.x + DISTANCE;
        positionData.y = lastPoint.y - ICON_HEIGHT / 2;
      } else if (lastPoint.y < lastPrePoint.y) {
        // 箭头向上
        direction = 'column';
        positionData.x = lastPoint.x - ICON_WIDTH / 2;
        positionData.y = lastPoint.y + DISTANCE + ICON_HEIGHT / 2;
      } else if (lastPoint.y > lastPrePoint.y) {
        // 箭头向下
        direction = 'column-reverse';
        positionData.x = lastPoint.x - ICON_WIDTH / 2;
        positionData.y = lastPoint.y - DISTANCE - ICON_HEIGHT / 2 - WORD_HEIGHT;
      } else {
        // 箭头向右
        direction = 'row-reverse';
        positionData.x = lastPoint.x - DISTANCE - width;
        positionData.y = lastPoint.y - ICON_HEIGHT / 2;
      }
    }

    const { model } = this.props;
    const id = model.id;

    setTimeout(() => {
      const addContainer = document.querySelector('#' + 'line_' + id).querySelector('.add-wrapper');
      // this.vm.$mount(addContainer);
      if (!this.vm) {
        this.vm = createRoot(addContainer);
      }
      this.vm.render(
        createElement(View, {
          model: this.props.model,
          graphModel: this.props.graphModel,
          disabled: this.props.graphModel.editConfigModel.isSilentMode,
          isSelected: this.props.model.isSelected,
          isHovered: this.props.model.isHovered,
          properties: this.props.model.getProperties(),
        }),
      );
    }, 0);

    return h(
      'foreignObject',
      {
        ...positionData,
        id: 'line_' + id,
        // style: `z-index: 20; width: ${width ? width : height}px; height: 30px `,
        style: `z-index: 20; width: 84px; height: 44px `,
      },
      [
        h(
          'div',
          {
            style: `display:flex;width: 100%;flex-direction: ${direction};`,
          },
          [
            h('div', {
              className: 'add-wrapper',
            }),
          ],
        ),
      ],
    );
  }
}

export default LegoEdge;
