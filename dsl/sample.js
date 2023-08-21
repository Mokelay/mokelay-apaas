var app = {
	uuid:"app_1234",
	name:"测试应用"
};


var data = [
	{
		uuid:"data_1",
		name:"接口数据1",
		apiName:"load_data_list",
		method:"get",
		inputs:[
			{
				name:"参数1",
				valName:"param1"
			},{
				name:"参数2",
				valName:"param2"
			},{
				name:"参数3",
				valName:"param3"
			}
		],
		outputs:[
			{
				name:"用户信息",
				dataType:"Object"
				valName: "userInfo",
				objDesc:[
					{
						name:"字段1",
						valName:"field1"
					},{
						name:"字段2",
						valName:"field2"
					}
				]

			},{
				name:"用户列表",
				dataType:"Array"
				valName: "userList",
				objDesc:[
					{
						name:"字段1",
						valName:"field1"
					},{
						name:"字段2",
						valName:"field2"
					}
				]							
			}
		]
	}
];

var ui = {
	uuid:"ui_1",
	title:"测试页面",
	status:"Dev",
	description:"这是一个测试DSL",
	icon:"", //待定
	view:{
		uuid:"view_1",
		name:"页面",
		component:"m-page",
		category:"Container",
		layouts:"",//待定
		attributes:{},
		style:{},
		events:{},
		children:[
			{
				uuid:"view_1_1",
				name:"文本1",
				component:"m-text",
				category:"Single",
				attributes:{},
				style:{},
				events:{},
			},{
				uuid:"view_1_2",
				name:"数据表格1",
				component:"m-table",
				category:"Single",
				attributes:{
					ds:{
						uuid:"data_1",
						inputConfig:[
							{
								valName:"param1",
								valValue:"val1"
							},{
								valName:"param2",
								valValue:"{{自定义变量_XXX}}"
							},{
								valName:"param3",
								valValue:"{{内置变量_query['param3']}}"
							}
						],
						outputConfig:{
							valName: "userList"
						}
					},
					fields:[
						{}
					]
				},
				style:{},
				events:{},
			}
		],
		modals:[
			{}
		]
	},
	buzzs:{
		val:[
		],
		func:[
		]
	}
}


var component_desc = {}