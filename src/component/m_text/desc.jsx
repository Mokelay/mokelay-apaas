export default {
  name: '文本',
  icon: '', //如何配置？
  tagName: 'M_Text',
  attributesDesc: [{}],
  methodsDesc: [{}],
  eventsDesc: [{}],
  attributesEditorView: [
    {
      uuid: 'view_panel_attribute_01',
      name: '文本',
      component: 'M_Text',
      category: 'Single',
      attributes: [
        {
          varCodeName: 'initContent',
          value: '组件属性设置',
        },
      ],
      styles: {
        dimensions: {
          xs: 12,
        },
      },
    },
  ],
  supportAttributeConfig: true,
  supportActionConfig: true,
  supportStyleConfig: true,
};
