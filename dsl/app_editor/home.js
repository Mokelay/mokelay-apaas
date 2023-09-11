export default {
  uuid: 'editor',
  appUUID: 'app_editor',
  title: 'Home',
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
            value: '欢迎来到Mokelay编辑器',
          },
        ],
      },
      {
        uuid: 'view_iframe',
        name: '编辑Ifram',
        component: 'M_Iframe',
        category: 'Single',
        attributes: [{ varCodeName: 'url', value: "edit.html#{{getQueryValue('ui')}}" }],
      },
      {
        uuid: 'view_layout_edit',
        name: '编辑器',
        component: 'M_Layout_Edit',
        category: 'Single',
        attributes: [],
      },
    ],
    actions: [
      {
        eventCodeName: 'onMouseDown',
        targetUUId: 'view_1_1_d',
        methodCodeName: 'updateContent',
        paramsData: ['更新下内容...'],
      },
    ],
  },
};
