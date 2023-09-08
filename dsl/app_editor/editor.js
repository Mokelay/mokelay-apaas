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
        uuid: 'view_iframe',
        name: '编辑Ifram',
        component: 'M_Iframe',
        category: 'Single',
        attributes: [{ varCodeName: 'url', value: '/#/app_demo/home' }],
      },
      {
        uuid: 'view_layout_edit',
        name: '编辑器',
        component: 'M_Layout_Edit',
        category: 'Single',
        attributes: [],
      },
    ],
  },
};
