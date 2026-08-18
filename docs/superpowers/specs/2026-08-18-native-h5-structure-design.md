# 原生 H5 单页应用目录设计

## 目标

创建一个通用、轻量、可直接双击 `index.html` 运行的 H5 单页应用模板。项目只使用原生 HTML、CSS 和 JavaScript，不依赖包管理器、构建工具或本地服务器。

## 约束

- 必须能在 `file://` 环境运行。
- 不使用 ES Modules、`fetch` 动态模板或其他依赖 HTTP 服务的能力。
- JavaScript 使用带 `defer` 的普通脚本按依赖顺序加载。
- 全局变量统一收敛到一个应用命名空间，避免无控制的全局污染。
- 页面切换采用 URL hash，刷新后仍能恢复当前视图。
- 初始模板只提供一个首页视图和可扩展的基础设施，不加入具体业务。

## 目录结构

```text
Joyce/
├─ index.html
├─ css/
│  ├─ reset.css
│  ├─ variables.css
│  ├─ common.css
│  └─ index.css
├─ js/
│  ├─ config.js
│  ├─ utils.js
│  ├─ router.js
│  └─ app.js
├─ assets/
│  ├─ images/
│  │  └─ .gitkeep
│  ├─ icons/
│  │  └─ .gitkeep
│  └─ fonts/
│     └─ .gitkeep
├─ favicon.ico
└─ README.md
```

## 文件职责

- `index.html`：应用入口、页面容器和 `<template>` 视图模板。
- `css/reset.css`：统一浏览器默认样式。
- `css/variables.css`：维护颜色、字号、间距和安全区等设计变量。
- `css/common.css`：维护全局布局、基础组件和通用工具类。
- `css/index.css`：维护首页及应用当前业务样式。
- `js/config.js`：创建应用命名空间并保存不可变配置。
- `js/utils.js`：提供无业务状态的通用函数。
- `js/router.js`：解析 hash、匹配视图并把对应模板渲染到页面容器。
- `js/app.js`：绑定生命周期事件并启动应用。
- `assets/`：按图片、图标、字体分类存放静态资源。
- `README.md`：说明运行方式、目录约定和扩展方式。
- `favicon.ico`：站点图标占位文件。

## 运行与数据流

浏览器打开 `index.html` 后，带 `defer` 的脚本依次创建命名空间、注册工具、初始化路由并启动应用。路由读取当前 hash；空 hash 与 `#/` 均匹配首页。路由从 `index.html` 内对应的 `<template>` 克隆内容并渲染到根容器。`hashchange` 事件触发后重复匹配与渲染过程。

## 异常处理

- 未知路由回退至首页，避免空白页面。
- 找不到视图模板时，在根容器显示简短错误提示并输出控制台错误。
- 初始化逻辑等待 DOM 可用，避免脚本顺序或加载时机导致空节点访问。

## 验证

- 双击 `index.html` 后能显示首页内容，不出现控制台错误。
- 修改 hash 为 `#/` 或未知路径时，页面均能稳定渲染首页。
- 在常见移动端宽度下没有横向滚动条。
- CSS 和 JavaScript 文件职责与加载顺序符合上述约定。

## 范围外事项

本次不加入业务页面、第三方依赖、接口请求、构建部署配置、自动化测试框架或 PWA 能力。
