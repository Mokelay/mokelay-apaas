export default {
  uuid: 'editor_lego',
  appUUID: 'app_editor',
  title: 'Lego Editor',
  view: {
    uuid: 'view_edit_page',
    name: 'page',
    component: 'M_Page',

    children: [
      {
        uuid: 'view_lego_text',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '欢迎来到Mokelay LEGO编辑器',
          },
        ],
      },
    ],
    actions: [
      {
        eventCodeName: 'onMouseDown',
        targetUUId: 'view_lego_text',
        methodCodeName: 'updateContent',
        paramsData: ['更新下内容...'],
      },
    ],
  },
};
