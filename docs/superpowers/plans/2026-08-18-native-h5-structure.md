# Native H5 Structure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable native HTML/CSS/JavaScript single-page H5 template that runs by opening `index.html` directly.

**Architecture:** `index.html` owns the application shell and in-document view templates. Ordered classic scripts attach configuration, utilities, routing, and startup behavior to one `window.Joyce` namespace; hash routing avoids server requirements. CSS is split into reset, design tokens, shared rules, and entry-page rules.

**Tech Stack:** HTML5, CSS3, ES5-compatible classic browser scripts with modern DOM APIs, PowerShell acceptance checks

---

## File Map

- Create `index.html`: document shell, app mount point, and home view template.
- Create `css/reset.css`: browser-default normalization.
- Create `css/variables.css`: design tokens and safe-area variables.
- Create `css/common.css`: global layout and reusable utility rules.
- Create `css/index.css`: home-view presentation.
- Create `js/config.js`: namespace creation and immutable configuration.
- Create `js/utils.js`: route normalization helper.
- Create `js/router.js`: hash matching, template rendering, and fallback handling.
- Create `js/app.js`: DOM-ready application startup.
- Create `assets/images/.gitkeep`, `assets/icons/.gitkeep`, and `assets/fonts/.gitkeep`: retain empty asset directories.
- Create `favicon.ico`: empty replaceable icon placeholder.
- Create `README.md`: usage and extension documentation.

### Task 1: Static Asset Skeleton

**Files:**
- Create: `assets/images/.gitkeep`
- Create: `assets/icons/.gitkeep`
- Create: `assets/fonts/.gitkeep`
- Create: `favicon.ico`

- [ ] **Step 1: Run the failing structure check**

```powershell
$required = @(
  'assets/images/.gitkeep',
  'assets/icons/.gitkeep',
  'assets/fonts/.gitkeep',
  'favicon.ico'
)
$missing = $required | Where-Object { -not (Test-Path -LiteralPath $_ -PathType Leaf) }
if ($missing.Count -ne 4) { throw "Expected four missing placeholders; found $($missing.Count)." }
```

Expected: command succeeds only because all four required files are initially absent.

- [ ] **Step 2: Create the asset placeholders**

Create these four empty files:

```text
assets/images/.gitkeep
assets/icons/.gitkeep
assets/fonts/.gitkeep
favicon.ico
```

- [ ] **Step 3: Run the passing structure check**

```powershell
$required = @(
  'assets/images/.gitkeep',
  'assets/icons/.gitkeep',
  'assets/fonts/.gitkeep',
  'favicon.ico'
)
$missing = $required | Where-Object { -not (Test-Path -LiteralPath $_ -PathType Leaf) }
if ($missing) { throw "Missing files: $($missing -join ', ')" }
```

Expected: exit code `0` with no output.

- [ ] **Step 4: Commit**

```powershell
git add -- assets favicon.ico
git commit -m "chore: scaffold H5 asset directories"
```

### Task 2: Application Shell and Styles

**Files:**
- Create: `index.html`
- Create: `css/reset.css`
- Create: `css/variables.css`
- Create: `css/common.css`
- Create: `css/index.css`

- [ ] **Step 1: Run the failing document check**

```powershell
if (Test-Path -LiteralPath 'index.html') { throw 'index.html unexpectedly exists.' }
if (Test-Path -LiteralPath 'css/index.css') { throw 'css/index.css unexpectedly exists.' }
```

Expected: exit code `0` because the document and stylesheet do not exist yet.

- [ ] **Step 2: Create `index.html`**

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#ffffff">
    <title>Joyce H5</title>
    <link rel="icon" href="data:,">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/variables.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/index.css">
    <script defer src="js/config.js"></script>
    <script defer src="js/utils.js"></script>
    <script defer src="js/router.js"></script>
    <script defer src="js/app.js"></script>
  </head>
  <body>
    <main id="app" class="app" aria-live="polite"></main>

    <template id="view-home">
      <section class="home page">
        <h1 class="home__title">Joyce H5</h1>
        <p class="home__description">原生 H5 单页应用模板已准备就绪。</p>
      </section>
    </template>
  </body>
</html>
```

- [ ] **Step 3: Create `css/reset.css`**

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
h1,
p {
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  min-height: 100vh;
}

button,
input,
textarea,
select {
  font: inherit;
}

img,
svg {
  display: block;
  max-width: 100%;
}
```

- [ ] **Step 4: Create `css/variables.css`**

```css
:root {
  --color-background: #f5f7fa;
  --color-surface: #ffffff;
  --color-text: #1f2937;
  --color-text-muted: #6b7280;
  --color-primary: #2563eb;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-size-base: 16px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --radius-md: 12px;
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
}
```

- [ ] **Step 5: Create `css/common.css` and `css/index.css`**

`css/common.css`:

```css
html {
  background: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family);
  font-size: var(--font-size-base);
}

body {
  min-width: 320px;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  min-height: 100dvh;
}

.page {
  min-height: inherit;
  padding: calc(var(--space-lg) + var(--safe-top))
    calc(var(--space-md) + var(--safe-right))
    calc(var(--space-lg) + var(--safe-bottom))
    calc(var(--space-md) + var(--safe-left));
}

.is-hidden {
  display: none !important;
}
```

`css/index.css`:

```css
.home {
  display: grid;
  align-content: center;
  justify-items: center;
  background: var(--color-surface);
  text-align: center;
}

.home__title {
  color: var(--color-primary);
  font-size: clamp(2rem, 10vw, 3.5rem);
  line-height: 1.1;
}

.home__description {
  max-width: 32rem;
  margin-top: var(--space-md);
  color: var(--color-text-muted);
  line-height: 1.7;
}
```

- [ ] **Step 6: Run the passing document check**

```powershell
$document = Get-Content -Raw -LiteralPath 'index.html'
$required = @('css/reset.css', 'css/variables.css', 'css/common.css', 'css/index.css', 'view-home', 'id="app"')
$missing = $required | Where-Object { -not $document.Contains($_) }
if ($missing) { throw "index.html is missing: $($missing -join ', ')" }
if ((Get-Content -Raw 'css/common.css') -notmatch 'overflow-x:\s*hidden') { throw 'Horizontal overflow protection is missing.' }
```

Expected: exit code `0` with no output.

- [ ] **Step 7: Commit**

```powershell
git add -- index.html css
git commit -m "feat: add native H5 application shell"
```

### Task 3: Namespace and Hash Router

**Files:**
- Create: `js/config.js`
- Create: `js/utils.js`
- Create: `js/router.js`
- Create: `js/app.js`

- [ ] **Step 1: Run the failing script check**

```powershell
$required = @('js/config.js', 'js/utils.js', 'js/router.js', 'js/app.js')
$existing = $required | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf }
if ($existing) { throw "Scripts unexpectedly exist: $($existing -join ', ')" }
```

Expected: exit code `0` because none of the scripts exist yet.

- [ ] **Step 2: Create `js/config.js`**

```javascript
(function (window) {
  'use strict';

  var Joyce = window.Joyce = window.Joyce || {};

  Joyce.config = Object.freeze({
    defaultRoute: '/',
    rootSelector: '#app'
  });
}(window));
```

- [ ] **Step 3: Create `js/utils.js`**

```javascript
(function (window) {
  'use strict';

  var Joyce = window.Joyce;

  Joyce.utils = Object.freeze({
    normalizeRoute: function (hash) {
      var route = String(hash || '').replace(/^#/, '');

      if (!route || route === '/') {
        return Joyce.config.defaultRoute;
      }

      return route.charAt(0) === '/' ? route : '/' + route;
    }
  });
}(window));
```

- [ ] **Step 4: Create `js/router.js`**

```javascript
(function (window, document) {
  'use strict';

  var Joyce = window.Joyce;
  var routes = Object.freeze({
    '/': 'view-home'
  });
  var started = false;

  function render() {
    var root = document.querySelector(Joyce.config.rootSelector);
    var route = Joyce.utils.normalizeRoute(window.location.hash);
    var templateId = routes[route] || routes[Joyce.config.defaultRoute];
    var template = document.getElementById(templateId);

    if (!root || !template || template.tagName !== 'TEMPLATE') {
      if (root) {
        root.textContent = '页面加载失败，请刷新后重试。';
      }
      window.console.error('Joyce H5: view root or template is missing.');
      return;
    }

    root.replaceChildren(template.content.cloneNode(true));
  }

  Joyce.router = Object.freeze({
    render: render,
    start: function () {
      if (started) {
        return;
      }

      started = true;
      window.addEventListener('hashchange', render);
      render();
    }
  });
}(window, document));
```

- [ ] **Step 5: Create `js/app.js`**

```javascript
(function (window, document) {
  'use strict';

  function bootstrap() {
    window.Joyce.router.start();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
  } else {
    bootstrap();
  }
}(window, document));
```

- [ ] **Step 6: Run syntax and dependency-order checks**

```powershell
$scripts = @('js/config.js', 'js/utils.js', 'js/router.js', 'js/app.js')
foreach ($script in $scripts) {
  node --check $script
  if ($LASTEXITCODE -ne 0) { throw "Syntax check failed: $script" }
}
$document = Get-Content -Raw -LiteralPath 'index.html'
$positions = $scripts | ForEach-Object { $document.IndexOf($_) }
if ($positions -contains -1) { throw 'One or more script tags are missing.' }
for ($index = 1; $index -lt $positions.Count; $index++) {
  if ($positions[$index] -le $positions[$index - 1]) { throw 'Scripts are not in dependency order.' }
}
```

Expected: four successful Node syntax checks and exit code `0`.

- [ ] **Step 7: Commit**

```powershell
git add -- js
git commit -m "feat: add file-compatible hash router"
```

### Task 4: Documentation and Acceptance Verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: Run the failing documentation check**

```powershell
if (Test-Path -LiteralPath 'README.md') { throw 'README.md unexpectedly exists.' }
```

Expected: exit code `0` because the README is absent.

- [ ] **Step 2: Create `README.md`**

```markdown
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
```

- [ ] **Step 3: Run complete structural checks**

```powershell
$required = @(
  'index.html',
  'css/reset.css',
  'css/variables.css',
  'css/common.css',
  'css/index.css',
  'js/config.js',
  'js/utils.js',
  'js/router.js',
  'js/app.js',
  'assets/images/.gitkeep',
  'assets/icons/.gitkeep',
  'assets/fonts/.gitkeep',
  'favicon.ico',
  'README.md'
)
$missing = $required | Where-Object { -not (Test-Path -LiteralPath $_ -PathType Leaf) }
if ($missing) { throw "Missing project files: $($missing -join ', ')" }
git diff --check
if ($LASTEXITCODE -ne 0) { throw 'Whitespace validation failed.' }
```

Expected: exit code `0` with no missing-file or whitespace errors.

- [ ] **Step 4: Perform browser acceptance checks**

Open `index.html` directly and verify:

1. The page displays “Joyce H5” and the ready message.
2. Developer Tools shows no JavaScript console errors.
3. Changing the URL hash to `#/` renders the home view.
4. Changing the hash to `#/unknown` falls back to the home view.
5. At a 320 px viewport width, the page has no horizontal scrollbar.

- [ ] **Step 5: Commit**

```powershell
git add -- README.md
git commit -m "docs: explain native H5 template usage"
```

- [ ] **Step 6: Verify clean handoff state**

```powershell
git status --short
git log --oneline -5
```

Expected: no output from `git status --short`; recent history contains the asset, shell, router, and README commits.
