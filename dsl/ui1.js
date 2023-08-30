export default {
	uuid:"ui_1",
	appUUID:"app_1234",
	title:"测试页面",
	status:"Dev",
	description:"这是一个测试DSL",
	icon:"", //待定
	view:{
		uuid:"view_1",
		name:"文本",
		component:"M_Text",
		category:"Single",

		attributes:[
			{
				varCodeName:"content",
				value:"测试一下",
			}
		],
		styles:[],
		events:[],

		children:[],
		modals:[{}]
	},
	customVars:[],
	customFuncs:[]
}