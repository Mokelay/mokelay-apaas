export default {
  uuid: 'editor_lego',
  appUUID: 'app_editor',
  title: 'Lego Editor',
  view: {
    uuid: 'view_edit_page',
    name: 'page',
    component: 'M_Page',

    styles: {
      layout: {},
      spacing: {},
      background: {},
      border: {},
      shadow: {},
    },

    children: [
      {
        uuid: 'view_link_1',
        name: '链接1',
        component: 'M_Link',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'text',
            value: 'UI 编辑器',
          },
          {
            varCodeName: 'url',
            value: '#/app_editor/ui?ui=/app_demo/sample1',
          },
        ],
      },
      {
        uuid: 'view_link_2',
        name: '链接2',
        component: 'M_Link',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'text',
            value: 'Lego 编辑器',
          },
          {
            varCodeName: 'url',
            value: '#/app_editor/lego',
          },
        ],
      },
      {
        uuid: 'view_link_3',
        name: '链接3',
        component: 'M_Link',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'text',
            value: 'Model 编辑器',
          },
          {
            varCodeName: 'url',
            value: '#/app_editor/model',
          },
        ],
      },
    ],
    actions: [{}],
  },
};