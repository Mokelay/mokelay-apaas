

## DS编辑器
    * 支持json (静态数据源)
    * 支持选择mokelay接口 (动态数据源)
        * 支持入参配置
        * 支持出参格式化
```
ds: {
    type: 'json/mokelay',
    content: [{...}], // json内容
    mokelayDs: {},// mokelay原本的ds配置
}

```
