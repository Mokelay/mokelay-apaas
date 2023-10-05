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
      name: '输入框',
      component: 'M_Text_Field',
      category: 'Single',
      attributes: [
        {
          varCodeName: 'label',
          value: '文本内容',
        },
        {
          varCodeName: 'variant',
          value: 'outlined',
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
