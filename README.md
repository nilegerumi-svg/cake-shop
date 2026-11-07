# 🍰 甜蜜物语蛋糕店 (Sweet Story Bakery)

高自由度女性向 / 模拟经营蛋糕店网页游戏。当前线上版本由「灵光闪」离线单文件版拆分而来：面板通过 iframe 以真实页面承载。

## 线上访问

GitHub Pages：<https://nilegerumi-svg.github.io/cake-shop/>

## 目录结构

```
├── index.html              # 应用外壳（React 宿主 + 底部导航）
├── css/
│   ├── game.css            # 游戏主样式（昼夜主题/页签/面板/弹窗/地图）
│   ├── frame-base.css      # 注入到每个面板 iframe 的基础样式
│   └── *.css               # 宿主自适应/无障碍/滚动等手写块
├── js/
│   ├── app.bundle.js       # 主程序包（打包成品，勿逐行改）
│   ├── frame-bootstrap.js  # 面板 iframe 共用引导脚本
│   ├── boot/               # 启动期错误捕获与无障碍垫片
│   └── host/               # 宿主：面板自适应/无障碍/触摸滚动/打开提示
├── pages/                  # 6 个面板（真实 iframe 页面）
│   ├── home/index.html     # 店面（1F 店面·厨房·工坊 / 2F 卧室）
│   ├── market/index.html   # 市场
│   ├── town/index.html     # 小镇
│   ├── fate/index.html     # 缘分
│   ├── profile/index.html  # 我的档案
│   └── achieve/index.html  # 成就殿堂
├── legacy/                 # 旧版（纯原生多 iframe 实现），仅归档参考
└── .nojekyll
```

## 面板加载方式

外壳 (`index.html`) 中的 React 宿主为每个面板创建一个 `<iframe src="pages/<id>/index.html">`。
每个面板页面由三部分组成：

1. `css/frame-base.css` —— 与宿主一致的完整样式；
2. `<div id="root">` —— React 通过 portal 渲染面板内容的挂载点；
3. `js/frame-bootstrap.js` —— 读取 `<html data-frame-id="…">`，负责异常上报、主题同步、焦点管理等。

> 面板内容由主包 (`js/app.bundle.js`) 在运行时渲染进 iframe 的 `#root`；页面文件只负责承载与引导。

## 说明

- `js/app.bundle.js` 是打包压缩产物（打包运行时 → React 运行时 → 游戏数据 → 组件 → 音效库），请在原构建工具中修改源码后重新构建，勿直接逐行编辑。
- 存档保存在浏览器 `localStorage`，与旧版（`legacy/`）不互通。
