var data = [
	{
		uuid:"data_1",
		name:"接口数据1",
		apiName:"load_data_list", // legao的alias
		method:"GET",
		inputs:[
			{
				varShowName:"参数1",
				varCodeName:"param1",
				varDataType:"String"
			},{
				varShowName:"参数2",
				varCodeName:"param2",
				varDataType:"Integer"
			},{
				varShowName:"参数3",
				varCodeName:"param3",
				varDataType:"Boolean"
			}
		],
		outputs:[
			{
				varShowName:"用户信息",
				varCodeName: "userInfo",
				varDataType:"Object"
				varDataDesc:[
					{
						name:"字段1",
						varName:"field1"
					},{
						name:"字段2",
						varName:"field2"
					}
				]

			},{
				varShowName:"用户列表",
				varCodeName: "userList",
				varDataType:"Array"
				varDataDesc:[
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