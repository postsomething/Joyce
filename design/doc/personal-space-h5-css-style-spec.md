# Personal Space H5 CSS Style Spec

本文件以 `design/images/index.png` 和 `design/images/other.png` 为主，作为页面实现时的 CSS 风格基准。原 `personal-space-h5-css-design-guide.md` 可作为参考，但最终视觉优先级以设计图为准。

## 1. 视觉定位

整体风格是一个手机端个人空间 App，而不是传统网页。

关键词：

- 奶白背景
- 浅粉与浅蓝主色
- 大圆角卡片
- 柔和阴影
- 半透明玻璃感
- 白色毛绒玩偶 IP
- 细线图标
- 少量手绘装饰
- 移动端底部导航
- 信息密度适中、留白充足

比例建议：

- 现代 App UI：70%
- Soft Kawaii 氛围：20%
- 玩偶、手绘、趣味细节：10%

CSS 本身应保持干净克制，可爱感主要由色彩、圆角、玩偶、图标和文案承担。

## 2. 页面尺寸与布局

以手机端浏览为主。桌面端只做居中手机画布，不拉伸成宽屏网页。

```css
:root {
  --app-max-width: 430px;
  --app-min-width: 320px;
  --bottom-nav-height: 82px;
}

html {
  background: #fffafb;
}

body {
  min-width: var(--app-min-width);
  margin: 0;
  color: var(--text-primary);
  font-family: "PingFang SC", "Microsoft YaHei", -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.app {
  width: 100%;
  max-width: var(--app-max-width);
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 22px 16px calc(var(--bottom-nav-height) + 24px);
  position: relative;
  overflow: hidden;
}
```

实现原则：

- `body` 和 `.app` 都不能出现横向滚动。
- 桌面浏览时内容居中，保持手机比例。
- 页面底部必须给 fixed bottom nav 留空间。
- 页面模块之间的垂直间距以 18px 到 28px 为主。

## 3. 色彩系统

设计图的主色不是强粉或强蓝，而是低饱和、带奶油感的粉蓝。

```css
:root {
  --pink: #ff8fb3;
  --pink-deep: #ff6f9d;
  --pink-light: #ffe8f0;
  --pink-soft: #fff3f7;

  --blue: #8fcaff;
  --blue-deep: #6faef5;
  --blue-light: #e8f5ff;
  --blue-soft: #f3f9ff;

  --purple: #c9adff;
  --purple-soft: #f4eeff;
  --yellow: #ffe3a0;
  --yellow-soft: #fff7df;
  --mint: #bcebdc;
  --mint-soft: #f0fbf7;

  --bg: #fffafb;
  --card: #ffffff;

  --text-primary: #263653;
  --text-secondary: #75819a;
  --text-light: #aab2c3;
  --text-pink: #ff7fa8;
}
```

使用比例：

- 奶白和白色：55% 到 65%
- 浅粉：15% 到 20%
- 浅蓝：12% 到 18%
- 紫、黄、薄荷等点缀：5% 以内
- 深色文字：5% 到 8%

禁止：

- 大面积纯粉背景。
- 强蓝色按钮或链接。
- 高饱和紫蓝渐变。
- 黑色重描边。

## 4. 背景

设计图背景是接近白色的粉蓝环境光，不能做明显的网页渐变块。

```css
body {
  background:
    radial-gradient(circle at 8% 8%, rgba(255, 207, 224, .30), transparent 30%),
    radial-gradient(circle at 92% 16%, rgba(185, 224, 255, .24), transparent 34%),
    radial-gradient(circle at 42% 48%, rgba(255, 237, 245, .32), transparent 36%),
    #fffafb;
}
```

设计要求：

- 背景应非常淡，主体仍接近奶白。
- 页面顶部可以有粉色环境光，右侧可以有蓝色环境光。
- 不出现清晰渐变边界。
- 装饰图案只能作为气氛，不能抢内容焦点。

## 5. 字体系统

正文使用系统中文无衬线。标题可以有轻微手写感，但不要全站卡通字体。

```css
:root {
  --font-body: "PingFang SC", "Microsoft YaHei", -apple-system,
    BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-display: "Comic Sans MS", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.page-title {
  font-size: 30px;
  line-height: 1.15;
  font-weight: 700;
  color: var(--text-primary);
}

.page-subtitle {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.section-title {
  font-size: 18px;
  line-height: 1.3;
  font-weight: 700;
  color: var(--text-primary);
}

.card-title {
  font-size: 15px;
  line-height: 1.35;
  font-weight: 650;
}

.body-text {
  font-size: 14px;
  line-height: 1.7;
}

.caption {
  font-size: 12px;
  line-height: 1.4;
  color: var(--text-secondary);
}
```

可使用 display 字体的内容：

- `Hi, 小莓`
- `Today`
- `happy`
- `Moments`
- `About me`
- `Music`
- `More`
- `Little Things`

其他内容保持现代 App 正文字体。

## 6. 卡片系统

卡片是设计图的核心视觉语言。所有主要模块都应基于统一卡片系统。

```css
:root {
  --radius-xl: 28px;
  --radius-lg: 24px;
  --radius-md: 20px;
  --radius-sm: 14px;
  --shadow-card: 0 10px 34px rgba(85, 75, 110, .08);
  --shadow-soft: 0 6px 20px rgba(85, 75, 110, .06);
}

.card {
  background: rgba(255, 255, 255, .92);
  border: 1px solid rgba(255, 255, 255, .86);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.card-pad {
  padding: 18px;
}
```

卡片变体：

```css
.card-white {
  background: rgba(255, 255, 255, .94);
}

.card-pink {
  background: linear-gradient(135deg, #fff5f8 0%, #ffeaf2 100%);
}

.card-blue {
  background: linear-gradient(135deg, #f6fbff 0%, #e8f5ff 100%);
}

.card-mix {
  background: linear-gradient(120deg, #fff0f5 0%, #f9efff 48%, #e8f5ff 100%);
}
```

注意：

- 卡片阴影必须轻。
- 不使用黑色或灰色硬边框。
- 卡片圆角通常 24px 到 28px。
- 小图片圆角 16px 到 18px。

## 7. 玩偶与图片占位

设计图中玩偶是视觉 IP。真实图片暂缺时，需要预留明确位置，不能完全省略。

占位实现建议：

```css
.mascot {
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 999px;
  background:
    radial-gradient(circle at 50% 45%, #ffffff 0 42%, transparent 43%),
    radial-gradient(circle at 50% 55%, #fff3f7 0 65%, transparent 66%),
    linear-gradient(135deg, #fff8fb, #eaf6ff);
  box-shadow: 0 10px 24px rgba(85, 75, 110, .08);
}

.mascot::before {
  content: "";
  width: 46%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #fff;
}
```

尺寸层级：

- 首页 hero 玩偶：140px 到 170px。
- Today 卡片玩偶：110px 到 130px。
- About 头像：118px 到 132px。
- Little Things 玩偶：78px 到 96px。
- 列表/封面小图：44px 到 60px。

原则：

- 玩偶可以轻微越出卡片边界。
- 玩偶不能遮挡主要文字。
- 不同页面的玩偶状态应有差异：相机、耳机、爱心、雨衣等。
- 后续真实素材应优先使用透明 PNG。

## 8. 装饰元素

装饰元素包括爱心、云朵、星星、花、爪印、音符、水滴。

```css
.deco {
  position: absolute;
  pointer-events: none;
  opacity: .48;
  color: var(--pink);
  line-height: 1;
}

.deco-blue {
  color: var(--blue);
}

.deco-purple {
  color: var(--purple);
}
```

要求：

- 装饰数量少而分散。
- 透明度 0.35 到 0.55。
- 不覆盖按钮、文字、头像。
- 不作为主要信息表达。

## 9. Header 区域

首页 Header 包含状态栏感留白、问候标题、说明文案、右侧圆形搜索/通知按钮、右侧 hero 玩偶。

```css
.page-head {
  position: relative;
  min-height: 170px;
  padding-top: 8px;
}

.head-actions {
  position: absolute;
  top: 16px;
  right: 0;
  display: flex;
  gap: 12px;
}

.icon-button {
  width: 52px;
  height: 52px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, .82);
  box-shadow: var(--shadow-soft);
  color: var(--text-primary);
}
```

设计要求：

- Header 标题左对齐。
- 右侧按钮为白色圆形，不使用矩形按钮。
- 首页 hero 玩偶偏右，和个人卡片形成前后层次。

## 10. 个人资料卡

首页个人卡是第一屏核心内容，应包含头像、昵称、账号、签名和 chip。

```css
.profile-card {
  display: grid;
  grid-template-columns: 86px 1fr;
  gap: 16px;
  padding: 18px;
  border-radius: 26px;
}

.avatar {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff4f8, #eaf6ff);
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--pink-soft);
  color: var(--text-primary);
  font-size: 13px;
}

.chip:nth-child(2n) {
  background: var(--blue-soft);
}
```

## 11. 快捷入口

首页快捷入口和 More 页功能入口都使用圆形/圆角图标底。

```css
.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}

.quick-item {
  display: grid;
  justify-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-size: 13px;
}

.quick-icon {
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  background: var(--pink-soft);
  color: var(--pink);
}

.quick-item:nth-child(2n) .quick-icon {
  background: var(--blue-soft);
  color: var(--blue-deep);
}
```

要求：

- 图标使用细线风格。
- 首页快捷入口一行 5 个。
- More 页功能入口一行 4 个。
- 文字不换成大 emoji，emoji 只可少量点缀。

## 12. Today 卡片

Today 卡片是首页最重要的情绪卡片，应使用粉到蓝的柔和渐变。

```css
.today-card {
  position: relative;
  min-height: 132px;
  padding: 20px;
  overflow: hidden;
  border-radius: 28px;
  background: linear-gradient(120deg, #fff0f5 0%, #f9efff 48%, #e8f5ff 100%);
  box-shadow: 0 10px 35px rgba(119, 102, 150, .08);
}

.today-word {
  font-family: var(--font-display);
  font-size: 32px;
  line-height: 1.1;
  color: var(--pink);
}

.today-date {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}
```

设计要求：

- 左侧放 Today、happy 和一句今日文案。
- 右下预留玩偶图，可越出卡片底边。
- 底部元信息用小图标加文字。

## 13. Moments 模块

首页 Moments 是横向预览，Moments 页面是两列图片流。

```css
.moment-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 14px;
}

.moment-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.moment-image {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 16px;
  object-fit: cover;
  background: linear-gradient(135deg, #fff4f8, #e8f5ff);
}

.moment-title {
  margin-top: 9px;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
  color: var(--text-primary);
}

.moment-meta {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-secondary);
}
```

要求：

- 图片本身是主角，不给每张图套厚重卡片。
- 图片圆角比大卡片小。
- 文字短，日期和 likes 信息轻。

## 14. Music 模块

音乐区域整体偏浅蓝，播放按钮使用主粉。

```css
.music-card {
  padding: 18px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f7fbff 0%, #e8f5ff 100%);
}

.disc {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  background:
    radial-gradient(circle, #ffe5ef 0 18%, #111 19% 60%, #222 61% 100%);
  box-shadow: 0 12px 22px rgba(38, 54, 83, .14);
}

.play-button {
  width: 48px;
  height: 48px;
  border: 0;
  border-radius: 50%;
  background: var(--pink-deep);
  color: #fff;
  box-shadow: 0 8px 18px rgba(255, 111, 157, .28);
}
```

## 15. Little Things 卡片

Little Things 是私人碎片卡片，背景偏粉，右下角预留小玩偶。

```css
.little-card {
  position: relative;
  min-height: 146px;
  padding: 20px;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(135deg, #fff8fb 0%, #fff0f5 100%);
}

.dots {
  display: flex;
  gap: 7px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d8ddea;
}

.dot.active {
  width: 18px;
  background: var(--pink);
}
```

## 16. 页面分区规则

Space：

- 顶部问候和操作按钮。
- 个人资料卡。
- 快捷入口。
- Today 情绪卡。
- Moments 横向预览。
- Now Playing 与 Little Things 双卡片。

Moments：

- 顶部标题和副标题。
- 右上玩偶/装饰。
- 分类 tabs。
- 两列图片流。
- 中下方粉色悬浮加号按钮。

About：

- 顶部标题和副标题。
- 基本信息大卡片，右侧头像。
- 喜好信息 2 到 3 列小卡片。

Music：

- 顶部标题和副标题。
- 大播放器卡片。
- 歌单列表卡片。

More：

- 顶部标题和玩偶。
- 常用功能 4 列宫格。
- 设置列表卡片。

## 17. 底部导航

底部导航固定在手机画布底部，是全局核心组件。

```css
.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 20;
  transform: translateX(-50%);
  width: min(var(--app-max-width), 100%);
  height: var(--bottom-nav-height);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding: 8px 10px calc(8px + env(safe-area-inset-bottom, 0px));
  border-radius: 26px 26px 0 0;
  background: rgba(255, 255, 255, .94);
  box-shadow: 0 -8px 30px rgba(80, 70, 100, .07);
  backdrop-filter: blur(18px);
}

.nav-item {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 4px;
  border: 0;
  background: transparent;
  color: #8792aa;
  font-size: 11px;
}

.nav-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
}

.nav-item.active {
  color: var(--pink-deep);
}

.nav-item.active .nav-icon {
  background: var(--pink-soft);
}
```

Tab 顺序：

1. Space
2. Moments
3. About
4. Music
5. More

## 18. 交互与动效

动效应轻、慢、软，只作为反馈。

```css
.interactive {
  transition:
    transform .24s ease,
    opacity .24s ease,
    box-shadow .24s ease;
}

.interactive:active {
  transform: scale(.96);
}

@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes mascotFloat {
  0%, 100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}
```

禁止：

- 大幅缩放。
- 快速闪烁。
- 复杂粒子动画。
- 过强弹跳。
- 页面切换时大面积位移。

## 19. 实现检查清单

开发完成后，CSS 应满足：

- 手机端 375px、390px、430px 下无横向滚动。
- 底部导航不遮挡最后一屏内容。
- 首页第一屏能看到问候、个人卡片、快捷入口和 Today 的主要区域。
- 卡片圆角和阴影统一。
- 页面整体不偏纯粉、纯蓝或紫蓝渐变。
- 每个 Tab 都有对应的主视觉和内容骨架。
- 玩偶素材缺失时，占位区域仍然保留设计图的空间关系。
- 文字不溢出按钮、chip、卡片和导航。
- 桌面端内容保持手机画布居中，不拉宽。
