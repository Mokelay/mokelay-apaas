var desc = {
	name:"页面",
	icon:"", //如何配置？
	tagName: "m-page",
	attributesDesc:[
		{
			varShowName: "View配置列表",
			varCodeName,"views",
			varDataType:"Array",
			varDataDesc:null, //此处描述View的数据结构，因为不是用于配置的，所以就不用写DSL了
			defaultValue:[]
		}
	],
	methodsDesc:[
		{
			funcShowName:"刷新页面",
			funcCodeName:"refresh",
			params:[],
			returnDataType:null
		},
		{
			funcShowName:"调整页面大小",
			funcCodeName:"resize",
			params:[
				{
					varShowName: "宽度",
					varCodeName,"width",
					varDataType:"Integer",
					defaultValue:1024
				},
				{
					varShowName: "高度",
					varCodeName,"height",
					varDataType:"Integer",
					defaultValue:768
				}
			],
			returnDataType:null
		},
		{
			funcShowName:"",
			funcCodeName:"",
			params:[]
		}
	],
	eventsDesc:[
		{
			eventShowName:"鼠标滑入",
			eventCodeName:"mousemovein"
			params:[]
		},
		{
			eventShowName:"鼠标滑出",
			eventCodeName:"mousemoveout"
			params:[]
		}
	],
	attributesEditorView:null,
	supportAttributeConfig:false,
	supportActionConfig:true,
	supportStyleConfig:true
}