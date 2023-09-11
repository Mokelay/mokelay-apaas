export default {
  uuid: 'sample1',
  appUUID: 'app_demo',
  title: '测试页面',
  status: 'Dev',
  description: '这是一个测试DSL',
  icon: '', //待定
  view: {
    uuid: 'view_1',
    name: '页面',
    component: 'M_Page',
    category: 'Container',

    attributes: [],
    styles: [],
    events: [],

    children: [
      {
        uuid: 'view_1_1',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容1',
            i18n: true,
            i18nConfig: {
              'zh-cn': '文本内容1',
              'en-us': 'Text Content 1',
            },
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_1_2',
        name: '数据表格1',
        component: 'M_Table',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'ds',
            value: {
              uuid: 'data_1',
              inputConfig: [
                {
                  varName: 'param1',
                  varValue: 'var1',
                },
                {
                  varName: 'param2',
                  varValue: '{{自定义变量_XXX}}',
                },
                {
                  varName: 'param3',
                  varValue: "{{内置变量_query['param3']}}",
                },
              ],
              outputConfig: {
                varName: 'userList',
              },
            },
          },
        ],
        styles: [],
        actions: [],
      },
    ],
    modals: [{}],
  },
  customVars: [],
  customFuncs: [],
};
