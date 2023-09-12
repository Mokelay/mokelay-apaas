### URL参数
    uuid: 需要编辑的页面 唯一id

### 属性说明

* ds说明
    * 参数是uuid
    * 返回信息是页面的完整信息：
        * 页面uuid
        * 页面渲染的 schema  （schema里是否要包含使用到的组件库, 包括默认基础组件库 和自定义组件库）
        * pageName
        * components [页面用到的组件, 基础组件和自定义组件]

    

### editor 对象
    * componentMap
        * component
        * componentMeta
    * 


### 依赖m-page方法
    getClientRects(dom) // 获取某个节点的宽高
        返回 : {width,height,x,y}
    getNodeInstance(dom) // 获取某个节点组件实例
        返回 : {uuid, ReactNode,...}
    setDraggingState(boolean) // 设置拖拽状态，true为拖拽状态，组件需要有拖拽中的样式变化, 设置为false结束

    schemaUpdate(schema) // 更新schema数据， 同时刷新页面 (需要考虑 局部刷新, 不然性能会很差)
    
> 渲染层不需要拖拽的api， 拖拽直接在编辑蒙层行操作，拖拽结束，修改schema，触发页面刷新


### 渲染Node要求
    组件dom上需要标识 schema中组件uuid、
    容器dom需要标识 可拖入标识
    
