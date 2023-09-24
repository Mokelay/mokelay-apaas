export default {
  version: '1.0.0',
  name: '树组件',
  icon: '', //如何配置？
  tagName: 'M_Tree',
  attributesDesc: [{}],
  methodsDesc: [
    {
      uuid: 'm_tree_func_001',
      funcShowName: '加载数据',
      funcCodeName: 'loadData',
      params: [
        {
          uuid: 'func_vars_001',
          varShowName: 'Tree对象',
          varCodeName: 'd',
          varDataType: 'Tree',
          subVariableDesc: [
            {
              uuid: 'func_vars_001_001',
              varShowName: 'ID',
              varCodeName: 'id',
              varDataType: 'String',
            },
            {
              uuid: 'func_vars_001_002',
              varShowName: '名称',
              varCodeName: 'name',
              varDataType: 'String',
            },
            {
              uuid: 'func_vars_001_003',
              varShowName: 'Tree节点',
              varCodeName: 'children',
              varDataType: 'TreeNodes',
            },
          ],
        },
      ],
      returnValue: {},
    },
  ],
  eventsDesc: [{}],
  attributesEditorView: {},
  supportAttributeConfig: true,
  supportActionConfig: true,
  supportStyleConfig: true,
};
