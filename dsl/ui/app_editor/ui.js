export default {
  uuid: 'editor_ui',
  appUUID: 'app_editor',
  title: 'UI Editor',
  view: {
    uuid: 'view_edit_page',
    name: 'page',
    component: 'M_Page',

    children: [
      {
        uuid: 'view_1_1_d',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '欢迎来到Mokelay UI编辑器',
          },
        ],
        styles: { dimensions: { xs: 12 } },
      },
      {
        uuid: 'view_tree',
        name: '组件树',
        component: 'M_Tree',
        category: 'Single',
        attributes: [],
        styles: { dimensions: { xs: 2 } },
      },
      {
        uuid: 'view_iframe',
        name: '编辑Ifram',
        component: 'M_Iframe',
        category: 'Single',
        attributes: [{ varCodeName: 'url', value: "edit.html#{{getQueryValue('ui')}}" }],
        styles: {
          dimensions: { xs: 8 },
          border: { border: 'none' },
        },
        actions: [
          {
            eventCodeName: 'onLoad',
            targetUUId: 'view_layout_edit',
            methodCodeName: 'active',
            paramsData: [],
          },
        ],
      },
      {
        uuid: 'view_1_2_3_d',
        name: '文本2',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '属性面板',
          },
        ],
        styles: { dimensions: { xs: 2 } },
      },
      {
        uuid: 'view_layout_edit',
        name: '编辑器',
        component: 'M_Ui_Edit',
        category: 'Single',
        attributes: [],
      },
    ],
    // actions: [
    //   {
    //     eventCodeName: 'onMouseDown',
    //     targetUUId: 'view_1_1_d',
    //     methodCodeName: 'updateContent',
    //     paramsData: ['更新下内容...'],
    //   },
    // ],
  },
};
