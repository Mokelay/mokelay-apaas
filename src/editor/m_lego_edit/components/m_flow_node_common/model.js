import { HtmlNodeModel } from '@logicflow/core';
import { NODE_WIDTH, NODE_HEIGHT } from '../const';

const NEXT_X_DISTANCE = 200;
const NEXT_Y_DISTANCE = 100;

/**
 * 自定义html节点模型对象
 */
export default class LegoNodeModel extends HtmlNodeModel {
  setAttributes() {
    this.width = NODE_WIDTH;
    // this.height = NODE_HEIGHT + 13 * 2;
    this.height = NODE_HEIGHT;
    this.text.editable = false;
    this.sourceRules.push({
      message: '只允许从下边的锚点连出',
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return targetAnchor.type === 'incomming';
      },
    });
  }
  setHeight(val) {
    this.height = val;
  }
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    style.hover.stroke = 'none';
    return style;
  }
  getNodeName() {
    return this.properties.description;
  }
  // getNodeClassName() {
  //   return 'common';
  // }
  getDefaultAnchor() {
    const { id, x, y, width, height } = this;
    const anchors = [];
    anchors.push({
      x,
      y: y - height / 2,
      id: `${id}_incomming`,
      edgeAddable: false,
      type: 'incomming',
    });
    anchors.push({
      x,
      y: y + height / 2,
      id: `${id}_outgoing`,
      type: 'outgoing',
    });
    return anchors;
  }
  addNode(node, nextY = 0) {
    const isDeep = nextY !== 0;
    const nodeModel = this.graphModel.getNodeModelById(node.sourceId);
    const leftTopX = node.x + NEXT_X_DISTANCE - 50 - 10;
    const leftTopY = node.y + nextY - 40 - 8;
    const rightBottomX = node.x + NEXT_X_DISTANCE + 50 + 10;
    const rightBottomY = node.y + nextY + 40 + 8;
    const existElements = this.graphModel.getAreaElement(
      this.getHtmlPoint([leftTopX, leftTopY]),
      this.getHtmlPoint([rightBottomX, rightBottomY]),
    );
    if (existElements.length) {
      this.addNode(node, nextY + NEXT_Y_DISTANCE);
      return;
    }
    const newNode = this.graphModel.addNode({
      type: node.type,
      x: node.x + NEXT_X_DISTANCE,
      y: node.y + nextY,
      properties: node.properties,
    });
    let startPoint;
    let endPoint;
    if (isDeep) {
      startPoint = {
        x: node.x,
        y: node.y + nodeModel.height / 2,
      };
      endPoint = {
        x: newNode.x - newNode.width / 2,
        y: newNode.y,
      };
    }
    this.graphModel.addEdge({
      sourceNodeId: node.sourceId,
      targetNodeId: newNode.id,
      startPoint,
      endPoint,
    });
    this.graphModel.selectElementById(newNode.id);
    this.graphModel.showContextMenu(newNode);
  }
}
