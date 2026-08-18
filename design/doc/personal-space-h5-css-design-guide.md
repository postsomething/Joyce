# 可爱俏皮私人个人空间 H5 --- CSS 设计规范

## 1. 设计定位

整体风格定义为：

> **Soft Kawaii App UI（柔和可爱系 App UI）**

核心关键词：

-   奶白底色
-   浅粉 + 浅蓝主色
-   超大圆角
-   柔和阴影
-   白色毛绒玩偶 Mascot
-   轻渐变
-   大量留白
-   低饱和度
-   少量手绘元素
-   手机 App 化体验

设计原则：

> CSS 本身保持现代、干净、克制；可爱感主要由毛绒玩偶
> IP、粉蓝配色、小图标、文案和微动效提供。

------------------------------------------------------------------------

## 2. 全局颜色变量

``` css
:root {
  --pink: #ff8fb3;
  --pink-light: #ffe8f0;
  --pink-soft: #fff3f7;

  --blue: #8fcaff;
  --blue-light: #e8f5ff;
  --blue-soft: #f3f9ff;

  --bg: #fffafb;
  --card: #ffffff;

  --text-primary: #263653;
  --text-secondary: #75819a;
  --text-light: #aab2c3;

  --purple: #c9adff;
  --yellow: #ffe3a0;
  --mint: #bcebdc;

  --radius-lg: 28px;
  --radius-md: 20px;
  --radius-sm: 14px;
}
```

推荐颜色占比：

  类型             比例
  -------------- ------
  奶白 / 白色       55%
  浅粉              20%
  浅蓝              15%
  其他马卡龙色       5%
  深色文字           5%

粉色和蓝色负责制造氛围，白色负责保持现代感和高级感。

------------------------------------------------------------------------

## 3. 页面背景

避免直接使用大面积纯粉色，采用非常轻的粉蓝环境光效果。

``` css
body {
  background:
    radial-gradient(
      circle at 10% 10%,
      rgba(255, 207, 224, .28),
      transparent 30%
    ),
    radial-gradient(
      circle at 90% 20%,
      rgba(185, 224, 255, .25),
      transparent 32%
    ),
    #fffafb;

  color: var(--text-primary);
}
```

视觉目标：

-   左上区域有非常淡的粉色环境光
-   右上或右侧出现淡蓝环境光
-   页面主体仍然接近奶白色
-   不要出现强烈、明显的渐变分界

------------------------------------------------------------------------

## 4. 手机 H5 主容器

按照手机 App 进行布局。

``` css
.app {
  width: 100%;
  max-width: 430px;
  min-height: 100vh;

  margin: 0 auto;
  padding: 20px 18px 100px;
}
```

效果：

-   手机浏览：100% 屏幕宽度
-   PC 浏览：居中显示手机尺寸内容
-   底部预留导航栏空间

------------------------------------------------------------------------

## 5. 卡片系统

卡片是整个 UI 的核心组件。

### 5.1 基础卡片

``` css
.card {
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(255,255,255,.9);
  border-radius: 24px;

  box-shadow:
    0 8px 30px rgba(85, 75, 110, .07);

  padding: 18px;
}
```

避免：

-   黑色或明显边框
-   强烈阴影
-   所有卡片都使用重玻璃效果
-   所有卡片完全相同

### 5.2 白色卡片

``` css
.card-white {
  background: #fff;
}
```

### 5.3 浅粉卡片

``` css
.card-pink {
  background:
    linear-gradient(
      135deg,
      #fff2f7,
      #ffe7f0
    );
}
```

### 5.4 浅蓝卡片

``` css
.card-blue {
  background:
    linear-gradient(
      135deg,
      #f2f9ff,
      #e5f3ff
    );
}
```

------------------------------------------------------------------------

## 6. Today 粉蓝渐变卡

首页 Today 是最重要的视觉卡片之一。

``` css
.today-card {
  background:
    linear-gradient(
      120deg,
      #fff0f5 0%,
      #f9efff 48%,
      #e8f5ff 100%
    );

  border-radius: 28px;

  box-shadow:
    0 10px 35px rgba(119, 102, 150, .08);

  border:
    1px solid rgba(255,255,255,.85);
}
```

颜色关系：

**浅粉 → 极浅紫 → 浅蓝**

使用淡紫作为中间过渡，避免粉蓝直接碰撞。

------------------------------------------------------------------------

## 7. 毛绒玩偶 Mascot

毛绒玩偶不是普通图片，而是整个个人空间的视觉 IP。

### 7.1 基础使用

``` css
.bear {
  position: absolute;

  right: -5px;
  bottom: -8px;

  width: 135px;
  height: auto;

  object-fit: contain;

  filter:
    drop-shadow(
      0 8px 15px rgba(80,70,90,.08)
    );
}
```

设计重点：

-   PNG 使用透明背景
-   允许玩偶突破卡片边界
-   不要全部放进规则图片框
-   与文字产生空间互动
-   避免玩偶遮挡主要信息

### 7.2 玩偶尺寸层级

  场景                    推荐宽度
  ------------------- ------------
  Hero / 首页主视觉     140--160px
  Today                 110--130px
  Little Things           75--90px
  空状态                 90--110px
  小装饰                  35--50px

不要所有玩偶使用相同尺寸。

### 7.3 玩偶状态设计

不同页面或状态使用不同动作：

-   首页：抱爱心
-   Moments：拿相机
-   Music：戴耳机
-   日记：看书
-   下午茶：喝奶茶
-   夜间：睡觉
-   雨天：雨衣 / 雨伞
-   空数据：从盒子探头
-   收藏：抱着小熊
-   心愿：抱星星或爱心

玩偶应该成为 App 的"情绪表达系统"。

------------------------------------------------------------------------

## 8. 字体系统

正文保持现代 App 风格。

``` css
body {
  font-family:
    "PingFang SC",
    "Microsoft YaHei",
    sans-serif;
}
```

只有以下一级标题可以使用更圆润、手写感的字体：

-   Hi, 小莓
-   Today
-   Moments
-   Music
-   Little Things
-   About Me

不要全站使用卡通字体。

### 字号层级

``` css
.page-title {
  font-size: 28px;
  font-weight: 700;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
}

.body-text {
  font-size: 14px;
  line-height: 1.7;
}

.caption {
  font-size: 12px;
  color: var(--text-secondary);
}
```

------------------------------------------------------------------------

## 9. 标签 Chip

适用于：

-   地点
-   MBTI
-   天气
-   在线状态
-   兴趣标签

``` css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  height: 34px;
  padding: 0 12px;

  border-radius: 999px;

  background: #fff3f7;

  font-size: 13px;
}
```

粉蓝交替：

``` css
.chip:nth-child(2n) {
  background: #edf7ff;
}
```

示例：

-   `📍 Hangzhou`
-   `♡ INFP`
-   `☁ 26℃`

------------------------------------------------------------------------

## 10. Moments 图片区域

不要做传统朋友圈九宫格，推荐现代照片流或两列瀑布流。

``` css
.moment-image {
  width: 100%;
  aspect-ratio: 1 / 1.18;

  object-fit: cover;

  border-radius: 18px;
}
```

标题：

``` css
.moment-title {
  margin-top: 9px;

  font-size: 13px;
  font-weight: 500;
}
```

辅助信息：

``` css
.moment-meta {
  margin-top: 5px;

  font-size: 11px;
  color: #a1a8b6;
}
```

设计原则：

> 图片本身 + 轻文字 + 大量留白。

避免每张照片都使用厚重的独立卡片。

------------------------------------------------------------------------

## 11. 快捷功能入口

适用于：

-   日记
-   相册
-   收藏
-   计划
-   心愿

``` css
.quick-icon {
  width: 54px;
  height: 54px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background: #fff0f5;
}
```

建议颜色交替：

-   日记：浅粉
-   相册：浅蓝
-   收藏：浅粉
-   计划：浅蓝
-   心愿：浅紫

图标建议使用细线 Icon，而不是大量复杂 Emoji。

------------------------------------------------------------------------

## 12. Music 卡片

音乐区域整体偏浅蓝。

``` css
.music-card {
  background:
    linear-gradient(
      135deg,
      #f5f9ff,
      #e7f3ff
    );

  border-radius: 24px;
}
```

唱片动画：

``` css
.disc {
  width: 90px;
  height: 90px;

  border-radius: 50%;

  animation:
    rotate 10s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
```

播放按钮使用主粉：

``` css
.play {
  background: #ff88ae;
  color: white;

  width: 48px;
  height: 48px;

  border-radius: 50%;
}
```

核心品牌组合：

> **浅蓝播放器 + 粉色播放按钮**

------------------------------------------------------------------------

## 13. Little Things 卡片

Little Things 应该更像私人日记、碎碎念。

``` css
.little-card {
  position: relative;

  min-height: 140px;

  padding: 20px;

  background:
    linear-gradient(
      135deg,
      #fff5f8,
      #fff0f5
    );

  border-radius: 24px;

  overflow: hidden;
}
```

布局建议：

-   左侧：标题 + 一两句私人文字
-   右下角：对应状态的玩偶
-   下方：轮播圆点
-   背景可以有极淡水滴、云朵、爱心等装饰

------------------------------------------------------------------------

## 14. 底部导航栏

H5 最重要的 App 化组件之一。

``` css
.bottom-nav {
  position: fixed;

  left: 50%;
  bottom: 0;

  transform: translateX(-50%);

  width: min(430px, 100%);
  height: 78px;

  display: grid;
  grid-template-columns: repeat(5, 1fr);

  background: rgba(255,255,255,.94);

  backdrop-filter: blur(18px);

  border-radius: 26px 26px 0 0;

  box-shadow:
    0 -8px 30px rgba(80,70,100,.07);
}
```

未选中：

``` css
.nav-item {
  color: #8792aa;
}
```

选中：

``` css
.nav-item.active {
  color: #ff7fa8;
}
```

选中图标可以增加浅粉胶囊背景：

``` css
.nav-item.active .icon {
  background: #fff0f5;
}
```

推荐 Tab：

1.  Space
2.  Moments
3.  About
4.  Music
5.  More

------------------------------------------------------------------------

## 15. 动效规范

动效关键词：

> **慢、软、轻、弹**

基础过渡：

``` css
.interactive {
  transition:
    transform .25s ease,
    opacity .25s ease,
    box-shadow .25s ease;
}
```

### 卡片进入

``` css
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
```

### 玩偶轻浮动

``` css
@keyframes bearFloat {
  0%,100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }
}
```

### 点击反馈

``` css
.button:active {
  transform: scale(.96);
}
```

避免：

-   快速旋转
-   大幅缩放
-   强烈闪烁
-   大量粒子
-   长时间复杂动画

------------------------------------------------------------------------

## 16. 装饰元素

允许少量使用：

-   `♡`
-   `✦`
-   `☁`
-   `☆`
-   `✿`
-   小爪印
-   小水滴
-   小音符

``` css
.decoration {
  position: absolute;
  opacity: .45;
  pointer-events: none;
}
```

装饰色：

``` text
#FF9DBB
#9FD5FF
#C6AEFF
```

原则：

> 装饰负责增加气氛，不负责承载信息，也不能抢玩偶和内容的视觉焦点。

------------------------------------------------------------------------

## 17. 页面模块建议

### Space

-   Hi / 用户名称
-   简短签名
-   Today
-   快捷入口
-   Moments Preview
-   Now Playing
-   Little Things

### Moments

-   顶部玩偶：拿相机
-   分类：全部 / 日常 / 旅行 / 美食 / 心情
-   两列瀑布流
-   图片详情
-   日期和一句话描述

### About

-   顶部玩偶
-   基本信息
-   MBTI
-   喜欢的季节
-   喜欢的颜色
-   音乐
-   食物
-   想去的地方
-   Personal Tags

### Music

-   顶部玩偶：耳机状态
-   Now Playing
-   黑胶唱片动画
-   我的歌单
-   最近循环
-   喜欢的音乐类型

### More

-   日记本
-   相册
-   计划表
-   心愿清单
-   纪念日
-   小组件
-   主题换肤
-   来访记录
-   隐私设置
-   关于

------------------------------------------------------------------------

## 18. 整体 CSS 设计体系

``` text
STYLE
│
├── Background
│   └── 奶白 + 极淡粉蓝环境渐变
│
├── Card
│   ├── 20–28px 大圆角
│   ├── 白 / 浅粉 / 浅蓝
│   └── 极轻阴影
│
├── Color
│   ├── Pink   #FF8FB3
│   ├── Blue   #8FCAFF
│   ├── Cream  #FFFAFB
│   └── Navy   #263653
│
├── Mascot
│   ├── 白色毛绒玩偶
│   ├── 浅蓝衣服
│   ├── 粉色腮红
│   └── 根据页面状态改变动作
│
├── Typography
│   ├── 标题：圆润 / 少量手写感
│   └── 正文：现代无衬线
│
├── Icon
│   └── 细线粉蓝 Icon
│
├── Motion
│   ├── Float
│   ├── Fade
│   ├── Scale
│   └── Soft Bounce
│
└── Feeling
    └── 可爱 × 温柔 × 私人 × 现代 App
```

------------------------------------------------------------------------

## 19. 最终设计原则

整套私人个人空间 H5 不应该表现成传统的"粉色卡通网页"。

更准确的目标是：

> **一个以白色毛绒玩偶为视觉 IP，以浅粉与浅蓝为品牌色，具有现代移动 App
> 体验的私人数字空间。**

推荐整体比例：

-   **70% 现代 App UI**
-   **20% Soft Kawaii**
-   **10% 玩偶 / 手绘 / 趣味细节**

通过克制的 CSS
体系保证现代感，再通过玩偶、状态、音乐、照片和私人文案建立个性与可爱感。
