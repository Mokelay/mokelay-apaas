import { PolylineEdgeModel, h } from '@logicflow/core';
import { pointFilter } from '../../util';
import { NODE_HEIGHT, LINE_OFFSET } from '../../util/const';

export default class LegoEdgeModel extends PolylineEdgeModel {
  initEdgeData(data) {
    super.initEdgeData(data);
    this.offset = LINE_OFFSET;
  }
  setAttributes() {
    this.offset = LINE_OFFSET;
    if (this.properties.executeStatus === 'executed') {
      this.setZIndex();
    } else {
      this.setZIndex(0);
    }
  }
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    style.stroke = '#8790A0';
    style.strokeDasharray = '3 2';
    style.strokeWidth = 1;
    if (this.isHovered || this.isSelected) {
      style.stroke = '#33DD89';
    }
    return style;
  }
  getEdgeAnimationStyle() {
    const style = super.getEdgeAnimationStyle();
    style.animationDuration = '20s';
    const { executeStatus } = this.properties;
    if (executeStatus) {
      style.strokeDasharray = '8 3';
      style.stroke = executeStatus === 'executed' ? 'rgb(79 235 151 / 80%)' : 'red';
      if (executeStatus === 'execute-failed') {
        style.strokeDasharray = null;
      }
    } else {
      style.strokeDasharray = '8 3';
      style.stroke = '#33DD89';
    }
    return style;
  }
  setHovered(flag) {
    super.setHovered(flag);
    this.setZIndex(flag ? 999 : 0);
  }
  setSelected(flag) {
    super.setSelected(flag);
    this.setZIndex(flag ? 999 : 0);
  }
  setZIndex(index) {
    if (this.isHovered || this.isSelected || this.properties.executeStatus) {
      super.setZIndex(999);
      this.openEdgeAnimation();
    } else {
      this.closeEdgeAnimation();
      super.setZIndex(index);
    }
  }
  initPoints() {
    if (this.pointsList && this.pointsList.length > 0) {
      this.points = this.pointsList.map((point) => `${point.x},${point.y}`).join(' ');
      return;
    }
    const { startPoint, endPoint } = this;
    const { x: x1, y: y1 } = startPoint;
    const { x: x2, y: y2 } = endPoint;
    const betterDistance = this.offset * 2;
    // 1. 起点在终点左边
    if (x1 - x2 < -betterDistance) {
      this.pointsList = pointFilter([
        {
          x: x1,
          y: y1,
        },
        {
          x: x1 + this.offset,
          y: y1,
        },
        {
          x: x1 + this.offset,
          y: y2,
        },
        {
          x: x2,
          y: y2,
        },
      ]);
      this.points = this.pointsList.map((point) => `${point.x},${point.y}`).join(' ');
    } else if (x1 - x2 > betterDistance) {
      // 起点在右边，终点在左边
      this.pointsList = pointFilter([
        {
          x: x1,
          y: y1,
        },
        {
          x: x1 + this.offset,
          y: y1,
        },
        {
          x: x1 + this.offset,
          y: y2 + NODE_HEIGHT,
        },
        {
          x: x2 - NODE_HEIGHT / 2,
          y: y2 + NODE_HEIGHT,
        },
        {
          x: x2 - NODE_HEIGHT / 2,
          y: y2,
        },
        {
          x: x2,
          y: y2,
        },
      ]);
      this.points = this.pointsList.map((point) => `${point.x},${point.y}`).join(' ');
    } else {
      super.initPoints();
    }
  }
}
