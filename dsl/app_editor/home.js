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
        uuid: 'view_1_1',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'content',
            value: '这是Mokelay编辑器应用',
          },
        ],
      },
      {
        uuid: 'view_1_2',
        name: '文本2',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'content',
            value: '用于测试编辑器的',
          },
        ],
      },
    ],
  },
};
