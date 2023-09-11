export default [
  {
    uuid: 'app_demo',
    icon: '',
    name: '测试应用',
    description: '用于测试的一个应用',
    i18n: true,
    languageSupport: ['zh-cn', 'en-us'],
    pages: {
      Page_Default: 'home',
      Page_404: '404',
    },
    i18nName: [
      {
        lang: 'zh-cn',
        content: '测试应用',
      },
      {
        lang: 'en-us',
        content: 'Test App',
      },
    ],
    i18nDescription: [
      {
        lang: 'zh-cn',
        content: '用于测试的一个应用',
      },
      {
        lang: 'en-us',
        content: 'Just for Test.',
      },
    ],
  },
  {
    uuid: 'app_editor',
    icon: '',
    name: 'Mokelay编辑器',
    description: '用于页面搭建',
    i18n: true,
    languageSupport: ['zh-cn', 'en-us'],
    pages: {
      Page_Default: 'ui',
      Page_404: '404',
    },
    i18nName: [
      {
        lang: 'zh-cn',
        content: '测试应用',
      },
      {
        lang: 'en-us',
        content: 'Test App',
      },
    ],
    i18nDescription: [
      {
        lang: 'zh-cn',
        content: '用于测试的一个应用',
      },
      {
        lang: 'en-us',
        content: 'Just for Test.',
      },
    ],
  },
];
