export default {
  uuid: 'home',
  appUUID: 'mokelay',
  title: 'Home',
  view: {
    uuid: 'home_page',
    name: 'page',
    component: 'M_Page',
    children: [
      {
				uuid:"view_1_1",
				name:"文本1",
				component:"M_Text",
				category:"Single",
				attributes:[
					{
						varCodeName:"content",
						value:"'Hello word!'"
					}
				]
			}
    ]
  },
};
