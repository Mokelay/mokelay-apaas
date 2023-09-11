export default {
  uuid: 'editor_model',
  appUUID: 'app_editor',
  title: 'Model Editor',
  view: {
    uuid: 'view_edit_model_page',
    name: 'page',
    component: 'M_Page',

    children: [
      {
        uuid: 'view_model_text',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '欢迎来到Mokelay 模型编辑器',
          },
        ],
      },
    ],
    actions: [
      {
        eventCodeName: 'onMouseDown',
        targetUUId: 'view_model_text',
        methodCodeName: 'updateContent',
        paramsData: ['更新下内容...'],
      },
    ],
  },
};
