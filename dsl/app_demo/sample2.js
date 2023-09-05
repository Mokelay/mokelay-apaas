export default {
	uuid:"sample2",
	appUUID:"app_demo",
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
				value:"测试一下_1",
			}
		],
		styles:[],
		events:[],

		children:[
			{
				uuid:"view_2",
				name:"文本",
				component:"M_Text",
				category:"Single",

				attributes:[
					{
						varCodeName:"content",
						value:"测试一下_2",
					}
				]
			}
		],
		modals:[{}]
	},
	customVars:[],
	customFuncs:[]
}