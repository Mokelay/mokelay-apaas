var data = [
	{
		uuid:"data_1",
		name:"接口数据1",
		apiName:"load_data_list",
		method:"get",
		inputs:[
			{
				name:"参数1",
				varName:"param1"
			},{
				name:"参数2",
				varName:"param2"
			},{
				name:"参数3",
				varName:"param3"
			}
		],
		outputs:[
			{
				name:"用户信息",
				dataType:"Object"
				varName: "userInfo",
				objDesc:[
					{
						name:"字段1",
						varName:"field1"
					},{
						name:"字段2",
						varName:"field2"
					}
				]

			},{
				name:"用户列表",
				dataType:"Array"
				varName: "userList",
				objDesc:[
					{
						name:"字段1",
						varName:"field1"
					},{
						name:"字段2",
						varName:"field2"
					}
				]							
			}
		]
	}
];