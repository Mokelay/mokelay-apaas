import { v4 as uuidv4 } from 'uuid';

/** lego 类型映射到flow节点上 */
const Lego2FlowNodeMap = {
  read: 'lego-node',
};

/**
 * 将api的dsl转换成flow识别的格式
 */
export const dsl2flow = (dsl) => {
  const flow = {
    nodes: [],
    edges: [],
  };

  const start = [100, 100];
  // TODO 暂时只有串行，后面加分支
  dsl.reduce((pre, item, index) => {
    if (pre) {
      // 第一个节点没有线
      flow.edges.push({
        id: uuidv4(),
        type: 'polyline',
        sourceNodeId: pre.id,
        targetNodeId: item.id,
      });
    }
    flow.nodes.push({
      id: item.id,
      // text: { x: start[0], y: start[1] + 100 * index, value: item.description },
      type: getFlowNodeType(item.legoAlias),
      x: start[0],
      y: start[1] + 100 * index,
      properties: item,
    });
    return item;
  }, null);

  return flow;
};

/**
 * lego类型映射， 找不到默认lego-node
 * @param {*} legoType
 */
function getFlowNodeType(legoType) {
  return Lego2FlowNodeMap[legoType] || 'lego-node';
}
