# 🍰 甜蜜物语蛋糕店模拟器

**在线游玩**：<https://nilegerumi-svg.github.io/cake-shop/>

---

## 开发声明

- 本游戏的代码由 AI 生成：底层由 deepseek 生成，框架与产品构思由作者主导，后续迭代由其他模型参与。
- 简单说：作者是**策划 + 测试 + 网页设计**，感谢 AI 们的劳动。

---

## 这是什么

一款纯前端、移动端优先的蛋糕店模拟经营游戏。从上手第一天起，你要经营「街角甜品屋」：进货、烘焙、上架、开店卖货、和镇上的邻居打交道，在四季与节气里把小店做大。

> 当前线上版本为 **灵光闪（React）版**，界面与交互为该版本的现成实现。

---

## 核心玩法

- **🏠 小楼（经营中枢）**
  - 1F：店面 · 厨房 · 家具工坊
  - 2F：卧室 · 阳台
  - 3F：书房 · 收藏
  - B1：地下室
  - 天台：观星 / 天气
  - 可「开店营业 / 收摊」、查看货架（6 格）、待上架、店内家具、店铺魅力 Lv、交涉技能、外卖热线、员工招聘、出门去小镇。
- **📦 订购**：食材按分类（五谷 / 蛋奶 / 水果 / 糖巧 / 肉禽 / 蔬果 / 水产 / 调味 / 其他）下单，次日一早送达；`+1` / `+5` 批量订购。
- **📱 通讯**：镇上的 NPC 伙伴，聊天与好感。
- **🗂️ 档案**：个人状况、熟练图鉴、人际关系、认识伙伴、健康档案、声望、技能总览。
- **🏆 成就**：成就殿堂（116 项）+ 荣誉墙 + 里程碑奖励 + 存档管理（含重新启动游戏）。

### 状态与压力

角色有 **钱 / 精力 / 心情 / 健康 / 饱食 / 店铺卫生 / 声望 / 等级** 等状态。饿着肚子营业会掉饱食 → 精力、心情、健康一起掉；不睡觉会疲劳。想赚钱就要在「进货花钱」和「卖货回本」之间平衡。

### 季节 / 天气 / 节气

每季 30 天，顶栏实时显示：天气、星期、季节、节气、第 N 天、日期。

---

## 内容数据量

数据已按旧版文件夹体系拆成 `js/data/` 下的 **35 个分类目录**，由 [js/data/index.js](js/data/index.js) **并行加载**（`Promise.all` + 顶层 await），加载界面会实时显示「已就绪 / 剩余文件数」。

| 数据 | 规模 | 说明 |
| --- | --- | --- |
| 食材 | **188** 种 | 含分类、价格、保质期与描述 |
| 食谱 | **247** 道 | 烘焙 + 中式菜系 + 离线包补齐 |
| 镇民 NPC | **62** 位 | 58 位来自离线包 + 旧版 4 位，含 MBTI / 背景 / 四季行程 |
| 家具 | **63** 件 | 12 大类 |
| 书籍 | **27** 本 | |
| 星图 | **12** 颗 | |
| 节日 | **13** 个 | 每节 3 项活动 |
| 成就 | **116** 项 | 探索 / 烘焙 / 缘分 / 店铺 / 小镇 / 里程碑 |

> **接线原则**：打包产物（`app.bundle.js`）**直读** `window.Cake.*_GAME` 数据字典，不设中间适配层；离线包提取的描述会在数据层加载后自动回填到食谱 / 食材。

---

## 界面与适配

- **PC 宽屏**（≥768px）：内容列统一收窄为 **1080px 居中**（手机版 600px × 1.8 倍），根字号提到 **32px**（约手机端 2 倍，由 `--player-font-scale:2` / `--fs` 驱动），两侧留深色背景；顶栏、标签栏、弹窗、语音钮同步对齐到 1080 列。相关规则见 [css/pc-layout.css](css/pc-layout.css) 与 [css/adapt.css](css/adapt.css)，并内联在 `index.html` 与各面板页的 `pc-inline` 块中（内联是为了绕开浏览器 CSS 缓存，改了立刻可见）。
- **平板 / 小屏 / 横屏 / 刘海屏**：见 [css/adapt.css](css/adapt.css)。安全区由 `env(safe-area-inset-*)` 适配；≤360px 字号收紧到 14px；横屏矮屏（高 ≤560px）压缩顶栏把空间让给内容。
- **滑动**：左右滑动切换底部标签；键盘 `Alt + ←/→` 也可切换（[js/host/swipe.js](js/host/swipe.js)）。触摸惯性、长按转触、弹窗内优先滚动等细节见 [js/host/panel-autofit.js](js/host/panel-autofit.js) 顶部「手写区」注释与 `docs/` 中的修复史。
- **盲人模式**：开始页可「立即开启」，进入游戏后有语音播报；弹窗正文自动放大；点不到内容时会语音提示。
- **夜间模式**：顶栏可切换，弹窗同步深色。
- **统一弹窗**：除手机界面（`.modal-sheet-phone`）外，所有弹窗统一卡片外观与文字排版（[css/modal.css](css/modal.css)）。
- **减少动态效果**：尊重系统 `prefers-reduced-motion`，自动关闭动画与平滑滚动。
- **键盘可达**：统一可见焦点环；`Esc` 关闭弹窗；图标按钮自动补中文 `aria-label`。

---

## 目录结构

```text
cake-shop/
├── index.html            # 应用外壳（React 挂载点 + 宿主脚本 + PC 内联样式）
├── css/
│   ├── game.css          # 现成 UI 主样式（≈271KB，打包产物）
│   ├── frame-base.css    # iframe 面板基础样式（≈275KB）
│   ├── adapt.css         # 适配增强：安全区 / 触屏滚动 / PC 1080 / 小屏 / 横屏 / 无障碍
│   ├── pc-layout.css     # PC 宽屏居中与两侧暗色背景
│   ├── modal.css         # 统一弹窗 + 弹窗文字排版
│   ├── safe-area.css / device-adapt.css
│   └── a11y.css / hide-scrollbar.css / open-tip.css
├── js/
│   ├── app.bundle.js     # 现成 UI 打包（React，≈1.8MB）
│   ├── frame-bootstrap.js# iframe 面板引导：主题 / 字号 / 焦点 / 错误上报 / 键盘防遮挡
│   ├── boot/             # 启动兜底：errors.js / a11y-shim.js（语音兜底、空点提示、close 中文化）
│   ├── host/             # 宿主增强（全部为手写可读区，以 tm- 前缀标记）
│   │   ├── panel-autofit.js  # 触摸滚动管线 + iframe 面板高度自适应 + PC 鼠标桥接
│   │   ├── swipe.js          # 左右滑动 / Alt+←→ 切换标签
│   │   ├── panel-reader.js   # 面板内容朗读
│   │   ├── auto-collapse.js  # 矮屏 / 小屏自动收起顶栏
│   │   ├── a11y.js           # aria-label / role / 实时播报区注入
│   │   └── open-tip.js       # 「文件预览」环境提示
│   └── data/             # 模块化数据（35 个分类目录，并行加载）
│       ├── ingredients/  recipes/  tool/  characters/npcs/   # 食材 / 食谱 / 工具 / 镇民
│       ├── world/ town/  festivals/ seasons/ time/ weather/  # 小镇地点 / 节日 / 季节 / 时间 / 天气
│       ├── furniture/ sewing/ outfits/ books/ stars/ shelter/ fishing/ gardening/
│       ├── food/ products/ items/ bundles/ shop/ phone/ player/ quests/ activities/
│       ├── attributes/   # 风味 / 口感 / 香气 / 温度 / 保质期
│       ├── achievements/ # 成就（探索 / 烘焙 / 缘分 / 店铺 / 小镇 / 里程碑）
│       ├── newspapers/   # 旧报纸
│       ├── extracted/ topics/ ui/ misc/ descriptions.js       # 离线包提取内容与文案
│       ├── health.js / solar_terms.js / subsidy.js / systems.js / systems2.js
│       └── */merged_for_game.js   # 各域「离线包 → 游戏字典」的合并结果
├── pages/                # 6 个 iframe 面板（各自独立文档，互不干扰）
│   ├── home/     # 小楼（经营中枢）
│   ├── market/   # 订购
│   ├── town/     # 小镇
│   ├── fate/     # 通讯 / 缘分
│   ├── profile/  # 档案
│   └── achieve/  # 成就
├── docs/
│   └── 疾病与心理系统.md  # 健康 / 心情 / 饱食逻辑导出
└── README.md
```

> 历史上另有「旧版分层 + 合并数据（180 食材 / 235 食谱）」的独立实现，现已不在仓库中，可在 git 提交历史里查阅。

---

## 技术说明

- **纯静态托管**：无需服务器，GitHub Pages 直接部署。
- **外壳 + iframe 面板**：主页面负责顶栏、标签、状态与弹窗；6 个内容面板通过 iframe 挂载，切换时不整页刷新。面板高度由 [js/host/panel-autofit.js](js/host/panel-autofit.js) 随内容自适应，因此页面表现为**一条纵向长页整体滚动**，面板内部不再有各自的滚动条。
- **跨文档只用 postMessage**：外壳与面板之间通过 `frame:theme`（主题 / 字号 / 盲人模式）、`frame:ready`、`frame:save-focus` / `frame:restore-focus`（切换标签时保留焦点）、`frame:pointerdown`、`flash-app-error`（面板异常上报）等消息通信，不跨文档读写 DOM，避免被浏览器安全策略拦截。
- **手写区与打包区分明**：`app.bundle.js` / `game.css` 是打包压缩产物，不逐行解读、不在其内部打补丁；所有增强一律以 `tm-` 前缀的手写 CSS / JS 叠加实现，可读可维护。
- **无障碍**：内置盲人模式与语音播报；键盘可操作；焦点环统一；`aria-label` 自动补齐。

---

## 本地运行

```bash
# 任选其一
python -m http.server 8000
# 或
npx serve .
```

打开 `http://localhost:8000` 即可。

> ⚠️ 请勿用「文件预览 / 直接双击」方式打开：该环境会限制交互，页面会弹出提示，建议用浏览器打开或部署后访问。

---

## 许可

个人项目，仅供学习与娱乐。
