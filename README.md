# 为研发降本，为企业提效
# Reduce costs for R&D and Improve efficiency for enterprises
## mokelay-client-core



## 保证代码格式化一致 需要安装如下插件

- EditorConfig for VS Code: 必装插件，用于读取项目中的 .editorconfig 文件，统一项目中的缩进、换行等风格
- ESLint: 必装插件，用于读取项目中的 .eslintrc  和 .eslintignore  文件 ，对代码进行实时校验，同时提供命令工具，快速修复一些代码格式问题。
- Prettier - Code formatter: 格式化代码用


vscode配置文件增加如下配置：

```JSON
{
  "editor.formatOnSave": true,

  "[markdown]": {
    // md文件不要格式化
    "editor.formatOnSave": false
  },
  "[Nunjucks]": {
    // njk文件不要格式化
    "editor.formatOnSave": false
  },
  "[json]": {
    // json文件不要格式化
    "editor.formatOnSave": false
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "vscode.css-language-features"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue"
  ],
  "eslint.options": {
    "extensions": [".js", ".ts", ".vue", ".jsx", ".tsx"]
  },
  "eslint.workingDirectories": [
    {
      "mode": "auto"
    }
  ]
}

```
