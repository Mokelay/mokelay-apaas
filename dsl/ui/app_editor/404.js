export default {
  uuid: '404',
  appUUID: 'app_editor',
  title: '404',
  view: {
    uuid: '404_page',
    name: 'page',
    component: 'M_Page',
    children: [
      {
        uuid: 'view_1_1_a',
        name: '文本1',
        component: 'M_Text',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'initContent',
            value: '404, page not found!',
          },
        ],
      },
      {
        uuid: 'view_link_return',
        name: '链接2',
        component: 'M_Link',
        category: 'Single',
        attributes: [
          {
            varCodeName: 'text',
            value: '返回首页',
          },
          {
            varCodeName: 'url',
            value: '#/app_editor/',
          },
        ],
      },
    ],
  },
};
