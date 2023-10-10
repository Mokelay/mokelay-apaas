import { NODE_HEIGHT, LEGO_NODE_HEIGHT, LEGO_NODE_EDIT_HEIGHT } from './const';

/**
 * 校验是否没有IO字段 配置
 * @param {*} nodeInfo
 * @returns
 */
export const noIOFields = (nodeInfo) => {
  const { inputFields, outputFields } = nodeInfo || {};
  return (
    (!Array.isArray(inputFields) || inputFields.length === 0) &&
    (!Array.isArray(outputFields) || outputFields.length === 0)
  );
};

/**
 * 计算上一个node节点的高度， 用于dsl转换成图表数据的x y 值计算
 * @param {*} nodeInfo
 */
export const calcPreNodeHeight = (nodeInfo) => {
  if (!nodeInfo) return 0;
  const noIOFiledFlag = noIOFields(nodeInfo);
  return noIOFiledFlag ? NODE_HEIGHT : LEGO_NODE_HEIGHT;
};
