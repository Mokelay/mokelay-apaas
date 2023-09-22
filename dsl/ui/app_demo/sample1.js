var longTextEl = [];
for (var i = 0; i < 70; i++) {
  longTextEl.push({
    uuid: 'view_sample_' + i,
    name: '文本' + i,
    component: 'M_Text',
    category: 'Single',
    attributes: [
      {
        varCodeName: 'initContent',
        value: '文本内容' + i,
      },
    ],
    styles: { dimensions: { xs: 1 } },
    events: [],
  });
}
const sample1 = {
  uuid: 'sample1',
  appUUID: 'app_demo',
  title: '测试页面',
  status: 'Dev',
  description: '这是一个测试DSL',
  icon: '', //待定
  view: {
    uuid: 'view_1',
    name: '页面',
    component: 'M_Page',
    category: 'Container',
    attributes: [
      {
        varCodeName: 'spacing',
        value: 0.5,
      },
    ],
    styles: {},
    events: [],
    modals: [{}],
  },
  customVars: [],
  customFuncs: [],
};

sample1['view']['children'] = longTextEl;

export default sample1;
