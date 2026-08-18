# Joyce H5

一个无需安装依赖或构建工具的原生 H5 单页应用模板。

## 运行

双击项目根目录中的 `index.html`，浏览器即可直接打开应用。

## 目录约定

- `css/`：样式重置、设计变量、公共样式和页面样式。
- `js/`：全局配置、工具函数、hash 路由和应用入口。
- `assets/`：图片、图标和字体资源。
- `index.html`：应用壳层及 `<template>` 视图模板。

## 添加视图

1. 在 `index.html` 中添加具有唯一 ID 的 `<template>`。
2. 在 `js/router.js` 的 `routes` 对象中把 hash 路径映射到该模板 ID。
3. 在 `css/index.css` 中添加视图所需样式。

页面跳转示例：`<a href="#/">首页</a>`。
