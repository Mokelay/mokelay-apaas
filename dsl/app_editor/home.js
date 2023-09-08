export default {
  uuid: 'home',
  appUUID: 'app_editor',
  title: 'Home',
  view: {
    uuid: 'home_page',
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
            value: '这是Mokelay编辑器应用',
          },
        ],
      },
      {
        uuid: 'view_1_2_e',
        name: '文本2',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '用于测试编辑器的',
          },
        ],
      },
    ],
    actions: [
      {
        eventCodeName: 'onMouseDown',
        targetUUId: 'view_1_1_d',
        methodCodeName: 'updateContent',
      },
    ],
  },
};
