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
        uuid: 'view_1_2_a',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容2',
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_1_3',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容3',
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_1_4',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容4',
          },
        ],
        style: [],
        events: [],
      },

      {
        uuid: 'view_1_5',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容1eee',
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
        uuid: 'view_1_6_a',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容2gggg',
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_7_3',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容3ffff',
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_1_8',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容4eee',
          },
        ],
        style: [],
        events: [],
      },

      {
        uuid: 'view_1_10',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容1dddd',
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
        uuid: 'view_1_2_a1',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容2ccc',
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_1_32',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容3bbb',
          },
        ],
        style: [],
        events: [],
      },
      {
        uuid: 'view_1_34',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '文本内容4aaa',
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
