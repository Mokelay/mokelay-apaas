export default {
  uuid: 'home',
  appUUID: 'app_demo_2',
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
            varCodeName: 'initContent',
            value: 'Hello word From APP DEMO 2!',
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
            varCodeName: 'initContent',
            value: 'Hello word2!',
          },
        ],
      },
    ],
  },
};
