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