export default {
  /*
	内置变量描述
		内置变量_是否编辑状态
		内置变量_所处终端
		内置变量_当前语言
		内置变量_路径
		内置变量_Query
		内置变量_路由参数
		内置变量_hash
		内置变量_屏幕高度
		内置变量_屏幕宽度
		内置变量_localStorage
		内置变量_sessionStorage
		内置变量_navigator
	*/
  internalVarDesc: [
    {
      uuid: 'internal_is_edit_status',
      varShowName: '内置变量_是否编辑状态',
      varCodeName: 'Is_Edit_Status',
      varDataType: 'Boolean',
      varDataDesc: {},
      defaultValue: null,
    },
  ],

  //内置变量
  internalVar: {
    //内置变量_是否编辑状态
    Is_Edit_Status: window.__Mokelay.Is_Edit_Status,
    //内置变量_所处终端
    Current_Terminal: 'PC',
    //内置变量_URL Query 参数对象
    URL_Search_Params: null,
    //内置变量_当前语言
    Current_Lang: 'zh_cn',
  },

  //内置函数
  internalFunc: {
    //内置函数_设置页面标题
    setTitle: function (title) {
      document.title = title;
    },

    //内置函数_打开链接
    openUrl: function (url) {},

    //内置函数_显示组件
    showView: function (viewUUID) {},

    //内置函数_隐藏组件
    hideView: function (viewUUID) {},

    //内置函数_获取URL Query值
    getQueryValue: function (queryName) {
      var urlSP = window.__Mokelay.InternalVar.URL_Search_Params;
      if (urlSP) {
        return urlSP.get(queryName);
      } else {
        return null;
      }
    },
  },

  //内置函数描述
  internalFuncDesc: [
    {
      uuid: '',
      funcShowName: '内置函数_设置页面标题',
      funcCodeName: 'setTitle',
      params: [
        {
          varShowName: '页面标题',
          varCodeName: 'title',
          varDataType: 'String',
        },
      ],
      returnDataType: null,
    },
    {
      uuid: '',
      funcShowName: '内置函数_打开链接',
      funcCodeName: 'openUrl',
      params: [
        {
          varShowName: 'URL地址',
          varCodeName: 'url',
          varDataType: 'String',
        },
      ],
      returnDataType: null,
    },
    {
      uuid: '',
      funcShowName: '内置函数_显示组件',
      funcCodeName: 'showView',
      params: [
        {
          varShowName: '组件UUID',
          varCodeName: 'viewUUID',
          varDataType: 'String',
        },
      ],
      returnDataType: null,
    },
    {
      uuid: '',
      funcShowName: '内置函数_隐藏组件',
      funcCodeName: 'hideView',
      params: [
        {
          varShowName: '组件UUID',
          varCodeName: 'viewUUID',
          varDataType: 'String',
        },
      ],
      returnDataType: null,
    },
  ],
};
