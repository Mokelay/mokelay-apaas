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
        uuid: 'view_1_1',
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
    ],
  },
};
