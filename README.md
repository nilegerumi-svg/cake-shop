# 🍰 甜蜜物语 (Sweet Story) · 高自由度蛋糕店模拟器

> 一款纯前端开发、高度模块化的女性向 / 模拟经营 Web 游戏。
> 你刚刚接手了街角一间小小的蛋糕店。在这里，你可以自由烘焙每一款蛋糕、研究解锁新配方、管理货架与定价、邂逅温柔的邻居们，甚至——谈一场甜甜的恋爱。💕

---

## ✨ 核心特色 (Features)

*   🍳 **硬核制作系统**：烘焙与料理双线并行，共 **27 个配方**。配方按尺寸（小/中/大）与菜系（家常/川/粤/鲁/苏/浙/湘/徽/闽）严格物理分目录。
*   🏆 **四维品质体系**：最终品质由【食材品质 + 厨艺熟练度 + 配方熟练度 + 工具熟练度】共同决定，配方声明的风味属性画像也参与优良判定，可触发「完美✨ / 优良👍 / 普通 / 失败💀」四档结果。
*   📈 **可见的成长曲线**：烘焙工坊实时显示技能等级、配方熟练度与距离完美品质的差距；「我的档案」汇总技能总览。
*   🌸 **动态四季与时间**：内置游戏时钟，每季 30 天。时令白名单限制应季生鲜（春天草莓、冬天红豆），基础原料与工具全年可购。跨天自动结算精力、卫生度与食材变质。
*   🥬 **保质期与分级变质**：86 种食材按分类（肉/蛋/奶/果/菜/谷物/调料/辅料/建材）拥有差异化保质期。食材随剩余期限逐级劣化——新鲜 → 即将变质 → 发酸发臭 → 彻底腐烂，并同步扣减品质，直接影响成品档次。
*   🗺️ **多层级地图探索**：总地图 → 城镇 → 具体地点（家园/公园/商业街/河边）。每个地点支持散步探索、随机事件、小憩；**商店内嵌在地点内部**，到达即可就地采购。
*   🛒 **完整经济闭环**：订购材料（需等待快递送达） → 烘焙/烹饪 → 上架货架 → 手动卖出或接待顾客自动售卖 → 调整售价策略与卫生度。
*   🎁 **材料包系统**：基础烘焙包、进阶包、水果包、巧克力包一键订购，到货后按内容逐件入库。
*   💕 **缘分与羁绊**：随机遇见特定 NPC，通过聊天、约会、赠送喜欢的蛋糕来提升好感度，解锁专属剧情与奖励。
*   📱 **移动端适配**：布局全部采用比例单位与视口弹性尺寸，窄屏下网格自动折叠、日志面板让位给主内容区，320px 起可正常游玩。
*   🛡️ **全链路防崩溃**：从底层到 UI 实现层层错误捕获、动态加载兜底、显式报错天网，杜绝白屏死机。日志默认只显示玩家关心的内容，排障时可用 `setLogVerbose(true)` 开启详细模式。

---

## 🛠️ 技术架构 (Tech Stack & Architecture)

本项目采用**纯原生开发** (Vanilla HTML/CSS/JS)，未使用任何第三方框架，极致追求代码的模块化与底层逻辑的严谨性。

*   **多 Iframe 外壳架构**：[game.html](game.html) 作为主外壳负责状态栏、导航与日志终端；[pages/](pages/) 下的各个子页面通过 iframe 挂载，实现互不干扰、无需整页刷新的丝滑切换。
*   **自研生命周期状态机**：[js/engine/](js/engine/) 严格控制引擎的 `IDLE → INITIALIZING → READY` 状态，防止并发冲突，并提供运行状态全局标记。
*   **高内聚低耦合的数据层**：[js/data/](js/data/) 下的物品、配方、角色、成就全部分类拆分为独立文件，通过动态 `import` 按需加载，并统一合并到 `window.Cake`。
*   **严格的加载时序**：所有聚合模块（data / core / actions 及其子层）均采用**顶层 await** 串联子模块，确保引擎宣布就绪时配方、食材、动作已全部挂载完毕，杜绝「数据合并早于子模块加载」的竞态。
*   **跨页面通信与广播**：基于 `postMessage` 与自定义 `CustomEvent` 总线，子页面操作后能瞬间唤醒父页面更新数据；多标签页通过 `localStorage` + `storage` 事件实时同步。
*   **统一引擎门面**：所有页面逻辑通过父页面的 `window.Cake` 门面（共享代理 `Game`）访问状态与方法，子页面不直接持有状态副本。
*   **子页面统一引导**：所有 iframe 子页面通过 [pages/boot-safe.js](pages/boot-safe.js) 的 `waitForCake` 等待引擎与所需数据就绪后再渲染，超时给出显式提示而非静默白屏。

---

## 📁 目录结构 (Directory Structure)

```text
cake-shop/
├── index.html               # 开始页（取名、选头像、创档/继续）
├── game.html                # 游戏主外壳（顶栏 / 导航 / 主 iframe / 日志 / 页脚动作）
├── css/
│   ├── styles.css           # 全局基础样式与主题变量
│   └── game-shell.css       # 游戏外壳布局样式
├── pages/                   # HTML 视图层（各子页面含独立内联脚本或本地 js）
│   ├── boot-safe.js         # 子页面引擎等待器（waitForCake）
│   ├── home/                # 主页（客厅：休息 / 查看信息）
│   ├── bake/                # 烘焙工坊（烘焙制作）
│   ├── buy/                 # 采购中心（食材 / 工具 / 材料包订购）
│   ├── shop/                # 店铺经营（营业开关 / 货架手动卖出 / 定价 / 清洁）
│   ├── larder/              # 食材库（全部食材图鉴、库存与保质期分类）
│   ├── recipe/              # 配方图鉴（烘焙 / 料理分类、研发解锁）
│   ├── entertainment/       # 娱乐（小憩 / 地图探索入口）
│   │   └── map/             #   ├─ index.html 总地图
│   │                        #   ├─ town.html  城镇
│   │                        #   └─ location.html 地点详情与动作
│   ├── love/                # 缘分系统（角色列表 / 详情对话 / 约会 / 送礼）
│   ├── profile/             # 玩家档案（成就 / 工具 / 仓库 / 存档管理）
│   └── log/                 # 底边控制台日志（支持折叠）
├── js/
│   ├── main.js              # 启动入口，配置加载模块列表
│   ├── shared.js            # 跨页面共享层（Game 动态代理）
│   ├── engine/              # 核心状态机引擎 (constants/task/utils/index)
│   ├── core/                # 核心系统（schema/migrate/store/time_engine/utils/bridge/modal/effects/render）
│   ├── data/                # 静态数据（食材/配方/工具/角色/季节/成就/材料包/商店事件）
│   ├── actions/             # 业务逻辑（system/craft 制作/shop 经营/entertainment 娱乐与地图/social 社交）
│   └── host/                # 宿主环境（游戏外壳/monitor 监控/router/sync/log-bridge）
└── README.md                # 本文档
```

---

## 🚀 快速开始 (Quick Start)

1. **本地运行**：不需要构建工具，直接双击 [index.html](index.html) 或用任意静态服务器（如 `python -m http.server`）打开即可游玩。
2. **创建存档**：在开始页输入玩家名、店铺名、选择头像，点击「开始新游戏」。
3. **首次开局**：初始拥有面粉、糖、鸡蛋、牛奶各一份与基础烘焙工具，并已解锁「经典麦芬蛋糕」，可在烘焙工坊直接制作第一个成品；其余配方需在配方图鉴中研发解锁。

> 💡 提示：现代浏览器对 `file://` 协议下的动态 `import()` 支持有限，若看到「模块加载失败」，请改用本地静态服务器访问，体验最佳。

---

## 🎮 玩法指南 (Gameplay Guide)

### 一日流程
1. **早上** 起床（页脚「睡觉」跨天），精力回满。⚠️ 睡觉**只能在家里**触发，人在镇上时会提示先回家。
2. **采购**：去采购中心订购当日所需食材（2 小时后送达），也可一键购买材料包；出门探索时，走到**商业街 / 公园 / 河边**可在地点内直接购物。
3. **制作**：回烘焙工坊，选择已解锁配方，消耗食材与精力烘焙；工作台会显示当前技能等级、配方熟练度与距离完美品质的差距。
4. **经营**：到店铺页点击「开始营业」，顾客会按概率自动进店购买；也可在货架上手动卖出。
5. **探索**：精力有余时去总地图 → 城镇 → 家园/公园/商业街/河边散步，触发随机事件、拾取物资或小憩回精。
6. **社交**：在缘分系统与角色聊天、约会、送礼提升好感度。
7. **收尾**：注意卫生度与售价策略（价格倍率），睡前整理货架、清理废品与变质食材。

### 食材保鲜须知
食材入库即带**总保质期**（按分类差异极大：肉类 3~5 天、蛋 7~10 天、奶/果 5~8 天、蔬菜 4~7 天、谷物与辅料约半年、调料一年以上、建材不会腐坏）。剩余期限越少，状态越差：

| 状态 | 触发条件 | 影响 |
| --- | --- | --- |
| ✨ 新鲜 | 剩余 > 40% | 无惩罚 |
| ⚠️ 即将变质 | 剩余 ≤ 40% | 品质 −10 |
| 🤢 发酸发臭 | 剩余 ≤ 20% | 品质 −50 |
| ☠️ 彻底腐烂 | 剩余 ≤ 5% 或已过期 | 不可食用，需清理 |

品质会直接传导到成品：用变质食材做出的蛋糕档次明显更低。可在「我的 → 食材仓库」查看每种食材的最短剩余天数与最低品质。

### 系统速览
| 系统 | 位置 | 说明 |
| --- | --- | --- |
| 烘焙 / 料理 | 配方图鉴 + 烘焙工坊 | 研发解锁新配方，制作消耗精力与时间；工作台显示熟练度与完美门槛 |
| 订购 / 材料包 | 采购中心 | 订单 2 小时送达，材料包整包到货逐件入库；基础原料与工具全年可购 |
| 货架 / 售卖 | 店铺经营 | 手动卖出按品质折价；营业时顾客自动购买 |
| 地图探索 | 娱乐 → 地图 | 4 个地点（家园/公园/商业街/河边），可探索、小憩；商店内嵌在地点内 |
| 保质期 / 变质 | 我的 → 食材仓库 | 分级变质状态、剩余天数与品质一览 |
| 缘分好感 | 缘分 | 聊天/约会/送礼提升好感，解锁剧情 |
| 技能熟练度 | 我的 → 技能熟练度 | 烘焙/料理等级与已掌握配方的熟练度总览 |
| 成就 | 我的 → 成就殿堂 | 销售/声望/配方/社交四类成就 |

---

## 🔧 更新日志 (Changelog)

### v1.5 · 加载体验、整页滚动与食材图鉴

> 本轮聚焦于加载界面体验（进度明细 + 超时误报修复 + 并行提速）、嵌套子页面整页滚动架构改造、食材仓库升级为真正的食材图鉴，以及色弱适配落实到页面渲染层。

#### ⏳ 加载体验优化
*   **加载界面文件进度明细** —— [game.html](game.html) 加载界面新增"正在读取：xxx"与"剩余文件：N 个"两行明细；[js/host/monitor/index.js](js/host/monitor/index.js) 新增 `setLoadTotal`/`loadTick` 文件级进度上报机制，各聚合模块（data/core/actions/recipes/ingredients）逐文件上报，玩家可看到剩余文件数持续递减，不会误以为卡死。引擎就绪时明细归零并显示"🎉 已就绪"。
*   **加载超时误报修复** —— [pages/boot-safe.js](pages/boot-safe.js) 新增 `engineStillLoading()` 检测：引擎仍处于 `INITIALIZING` 状态或文件进度未走完时，不判定为超时、不显示"🚨 致命错误"，避免正常加载被误报。
*   **并行加载提速** —— 数据层 [js/data/index.js](js/data/index.js)、食材层 [js/data/ingredients/index.js](js/data/ingredients/index.js)、配方层 [js/data/recipes/index.js](js/data/recipes/index.js) 的独立子模块改为 `Promise.all` 并行加载（原先串行逐个 await），减少加载总耗时。

#### 📜 整页滚动架构改造
*   **嵌套子页面拼成纵向长条** —— [css/game-shell.css](css/game-shell.css) 从"固定高度 + 内部滚动"改为"整页拼接长条 + 外壳统一滚动"：body 改为 `overflow-y: auto`，`.app-wrapper` 高度 `auto`，`.main-pane`/`.log-pane` 改为 `flex: 0 0 auto; overflow: visible`，iframe 不再有固定高度。
*   **iframe 高度自适应** —— [game.html](game.html) 新增 `autoResizeIframe`：用 `ResizeObserver` 监听子页面 body 尺寸变化（非定时轮询），子页面内容多高 iframe 就多高，嵌套页面像纵向长条一样随外壳整页滚动，子页面内部不再各自滚动。
*   **子页面样式配合** —— [pages/home/index.html](pages/home/index.html) body 从 `height:100%; overflow-y:auto` 改为 `height:auto; overflow:visible`；[pages/log/style.css](pages/log/style.css) 同步改为自然高度，日记列表不再内部滚动。
*   **日志折叠简化** —— [pages/log/player.js](pages/log/player.js) 折叠逻辑不再手动操作父面板（外壳 ResizeObserver 会自动同步 iframe 高度），只控制自身列表 `max-height`。

#### 📖 食材图鉴
*   **"我的 → 食材仓库"升级为食材图鉴** —— [pages/profile/inventory.html](pages/profile/inventory.html) 彻底重写为图鉴式卡片网格（`.atlas-grid`）：窄屏 2 列、宽屏 3 列；**只展示已持有的食材**，未持有的不出现；每张卡片展示 emoji、名称、库存份数、最短剩余天数、最低品质与变质徽标。[pages/profile/page.js](pages/profile/page.js) 入口文案与图标同步改为"📖 食材图鉴"。
*   **底栏食材库同步改造** —— [pages/larder/index.js](pages/larder/index.js) 改为只展示已持有食材（`ownedIds` 过滤）；[pages/larder/style.css](pages/larder/style.css) 网格改为 2 列 / 3 列布局。

#### ♿ 色弱适配落实到页面
*   **店铺状态符号辅助** —— [pages/shop/page.js](pages/shop/page.js) 的 `setStatus` 成功/错误状态增加 `✅`/`❌` 符号前缀，不单靠颜色区分。
*   **全局 ok/lack 符号** —— v1.4 已在 CSS 层加 `✓`/`✗` 符号，本轮确认各页面渲染路径覆盖。

#### ✅ 验证
全部改动通过静态校验（193 个 JS 文件零语法错误、6 个 CSS 文件括号平衡）。加载界面文件进度持续变动、超时误报消除、数据层并行加载提速、嵌套子页面整页滚动、食材图鉴只展示持有食材且 2/3 列网格。

---

### v1.4 · 布局统一、无障碍适配与模块化深化

> 本轮聚焦于布局一致性、无障碍（色弱/字号）适配与模块化深化。修复了宽度百分比不一致、文案截断、折叠留白与底栏按钮被覆盖等多个问题。

#### 🎨 布局与视觉修复
*   **宽度体系统一** —— [css/game-shell.css](css/game-shell.css) 中 `.split-container`（日记+主内容区）增加 `max-width: var(--app-max-width)` 并居中，与顶部栏、底栏同宽对齐，消除娱乐区/日记与其余页面宽度百分比不一致的问题。
*   **文案截断修复** —— 全 CSS 系统补齐自动换行：`.card`、`.item-desc`、`.log-entry` 等文本容器统一 `word-break: break-word; overflow-wrap: anywhere`；底栏重构为"提示条 + 按钮行"两层结构，提示条允许换行，不再因宽度不足被隐藏。
*   **日志折叠留白修复** —— 日志收起时外层 `.log-pane` 通过 `player.js` 同步添加 `.collapsed` 类并收缩 `flex-basis`，下方主内容区紧贴信息栏，不再产生中间空白。
*   **底栏按钮被覆盖漏洞** —— [js/core/render/footer.js](js/core/render/footer.js) 原先用 `el.innerHTML` 把整个 `#footer`（含"睡觉/营业/食材库"按钮）覆盖成一句提示文案，既挤压文案又清空按钮。已改为只更新独立提示条 `#footerHint`，按钮稳定保留。
*   **死变量清理** —— 移除已无引用的 `--footer-h` 变量。

#### ♿ 无障碍适配
*   **色弱友好** —— 全局"有料/缺料、够用/不够"状态（`.ok`/`.lack`）不再单靠红绿区分，新增 `✓`/`✗` 符号前缀辅助识别；变质徽标（临期/变质/腐烂）保留文字标签，弱化对颜色对比的依赖。
*   **字号随玩家设置缩放** —— 核心 CSS（[css/styles.css](css/styles.css)、[css/game-shell.css](css/game-shell.css)、[pages/log/style.css](pages/log/style.css)）全部 `font-size` 由固定 `px` 改为 `rem`，根字号设为 `100%`，玩家调整浏览器/系统字号时全站随之缩放。

#### 📦 模块化拆分（延续 v1.3 思路，不改变父路径）
*   **js/actions/shop/sell.js**（8.1KB）→ 拆为 [sell/customer.js](js/actions/shop/sell/customer.js)（顾客自动售卖+失败品清理）与 [sell/manual.js](js/actions/shop/sell/manual.js)（手动卖出+售卖白名单），原文件保留为顶层 await 聚合入口。
*   **js/actions/entertainment/map/location_actions.js**（8KB）→ 拆为 [location_actions/query.js](js/actions/entertainment/map/location_actions/query.js)（区域/地点/商店查询）与 [location_actions/actions.js](js/actions/entertainment/map/location_actions/actions.js)（动作列表生成与执行），原文件保留为聚合入口。

#### 🐛 顺带修复
*   **顾客购买白名单对齐** —— [sell/customer.js](js/actions/shop/sell/customer.js) 的顾客自动购买逻辑补上 `skill === 'bakery'` 过滤，与店铺手动售卖白名单口径一致，避免顾客买走料理类成品。

#### ✅ 验证
全部改动通过静态校验（所有 JS 脚本语法检查通过）与浏览器实机验证：娱乐区/日记宽度与顶栏对齐、提示文案完整换行显示、日志收起无留白、底栏按钮稳定可用、色弱下状态可辨、字号随系统设置缩放、拆分后售卖与地点系统正常挂载。

---

### v1.3 · UI 优化与架构清理

> 本轮聚焦于 UI 体验优化、代码架构清理与模块化拆分。修复了多个影响游戏体验的显示问题，新增食材库主界面，并对大文件进行拆分以提升可维护性。

#### 🎨 UI 优化
*   **娱乐页宽度统一** —— 娱乐链路四页（娱乐首页、总地图、城镇、地点）原先使用固定 `aspect-ratio: 4/5` 居中卡片样式，与烘焙/采购等页面通栏布局不一致。已统一改为通栏流式布局，移除 PC 断点卡片宽度规则，确保所有页面宽度体系一致。
*   **小店日记样式对齐** —— [pages/log/style.css](pages/log/style.css) 原先使用米黄底色（`#fffaf0`）+ 深粉标题，与全局粉色系（`--pink-*` 变量、`#fff0f5`）不一致。已全面对齐全局粉色系风格，并引入全局样式表。
*   **移除"家园周围"的睡觉动作** —— [js/actions/entertainment/rest/town/index.js](js/actions/entertainment/rest/town/index.js) 中 `home` 配置了 `sleep`，导致地点页会往"家园周围"塞一个睡觉按钮。但睡觉白名单注释明确写着"只有家里能睡、镇上也应是白名单外"，而"家园周围"是城镇地图内的位置（人在外），按设计不应显示睡觉。已移除 `home` 的 `sleep` 配置。
*   **商店弹窗分类选购** —— [pages/entertainment/map/location.html](pages/entertainment/map/location.html) 中商店由平铺改为"商店"按钮 + 弹窗分类选购，商品按食材/工具/建材分类，避免平铺占用过多空间。
*   **日志折叠功能** —— [pages/log/index.html](pages/log/index.html) 头部增加折叠/展开切换按钮，[pages/log/player.js](pages/log/player.js) 实现折叠逻辑：折叠时仅展示最近 3 条日记，列表高度随信息量自然变化（CSS `max-height` 控制），状态持久化到 `localStorage`。
*   **店铺白名单与商品名称修复** —— [pages/shop/index.html](pages/shop/index.html) 原先把 `state.inventory`（食材库存台账）当货架商品渲染，而它只存 id、不含名称/价格，导致显示"未知商品"，还能卖掉任何原材料。已改为只渲染 `state.foods`（成品糕点），名称/emoji 从配方表回查；[js/actions/shop/sell.js](js/actions/shop/sell.js) 新增 `Cake.sellFood` 接口与白名单常量 `Cake.SHOP_SELL_EXTRA_ALLOW`，店铺只允许卖出烘焙糕点类（`skill === 'bakery'`），额外最多放行牛奶（`milk`）。

#### ✨ 新增功能
*   **食材库主界面** —— 新增 [pages/larder/](pages/larder/) 目录（index.html + style.css + index.js），按保质期分类（肉/蔬菜/谷物/蛋/奶/水果/调料/辅料/建材）展示全部食材图鉴，显示库存数量、最短剩余天数、变质状态。底栏新增"📦 食材库"按钮，点击后主内容区切换到食材库页面。
*   **休息事件库接线** —— [js/actions/entertainment/rest/index.js](js/actions/entertainment/rest/index.js) 将 `rest/town/events/index.js` 挂进休息系统加载清单，使小憩/睡觉可触发随机事件（如"家里小憩"触发甜梦、"公园小憩"触发苍蝇等）。

#### 🗑️ 死代码清理
*   **js/actions/entertainment/map/monitor.js** —— 以完整 `<script>` 标签包裹的旧版整页脚本，不是模块入口；全项目无任何引用。已删除。
*   **js/host/main.js** —— 首屏渲染逻辑与 `monitor/index.js` 重复；全项目无引用（真正的入口是 `js/main.js`）。已删除。
*   **js/shop/ 目录** —— 与 `js/data/shop/` 内容重复；`js/data/index.js` 引用的是 `./shop/index.js`（即 `js/data/shop`），`js/shop` 无任何引用。已删除整个目录。
*   **js/data/tool/meta/index.js** —— 文件头注释写的是"recipes/meta"，内容是 `RECIPES_META`，但全项目没有任何地方引用 `RECIPES_META`，也无任何文件 import 它；是放错位置的孤儿文件。已删除。

#### 📦 大文件拆分
为提升可维护性，对体积较大的 HTML 页面进行模块化拆分（不改变父文件夹路径，拆到同目录独立 JS 文件）：
*   **pages/entertainment/map/location.html** —— 18.6KB → 5.9KB HTML + 10.9KB [location.js](pages/entertainment/map/location.js)
*   **pages/shop/index.html** —— 11KB → 3.8KB HTML + 6.4KB [page.js](pages/shop/page.js)
*   **pages/profile/index.html** —— 12KB → 2.7KB HTML + 8KB [page.js](pages/profile/page.js)

#### ✅ 验证
全部改动通过静态校验（所有 JS 脚本语法检查通过、CSS 括号平衡与变量引用正确）与浏览器实机验证：引擎加载画面完整展示、小店日记位置正确、娱乐页宽度统一、商店弹窗分类选购正常、店铺只卖糕点、食材库页面正常渲染、日志折叠功能可用。

---

### v1.2 · 实机测试修复与系统接线

> 基于实机测试反馈的一轮集中修复。重点解决了**引擎加载竞态**这一类导致多个页面静默失效的根因，并把此前「已定义但从未被调用」的保质期与属性两套数据系统真正接入玩法。

#### 🔴 阻断性问题（导致功能完全不可用）
*   **模块加载竞态（核心根因）** —— 14 个聚合模块使用 `(async () => {...})()` 包裹，父模块的 `await import()` 只等模块体同步执行完、**等不到内部 await**。导致 `Cake.RECIPES` 合并时烘焙配方尚未就位、`Cake.craft` 在引擎宣布就绪后才挂载。已全部改为**顶层 await**（[js/data/index.js](js/data/index.js)、[js/data/recipes/](js/data/recipes/) 各层、[js/data/ingredients/](js/data/ingredients/) 各层、[js/core/index.js](js/core/index.js)、[js/actions/index.js](js/actions/index.js)、[js/actions/craft/index.js](js/actions/craft/index.js)、[js/host/index.js](js/host/index.js)、[js/actions/entertainment/index.js](js/actions/entertainment/index.js)）。
*   **无法烘焙** —— 除竞态外还有两处：① [js/actions/craft/index.js](js/actions/craft/index.js) 引用 `'./shared.js'`，而真实文件名是 `_shared.js`，导致 `addProficiencyExp` 从未挂载、制作时必然抛异常；② [pages/bake/index.html](pages/bake/index.html) 未引入 `boot-safe.js`，页面在引擎未就绪时顶层同步取 `Cake` 后静默退出。两者均已修复。
*   **城镇页整页失效** —— [pages/entertainment/map/town.html](pages/entertainment/map/town.html) 内联模块顶层写了 `if (!Cake) return;`。ES module 顶层不允许 `return`，属 `SyntaxError`，**整个脚本从不执行**。同时其跳转参数为 `?loc=`，而地点页读取的是 `?id=`，参数名不匹配。已改为引擎等待器 + 事件委托 + 参数对齐。
*   **缘分页整页失效** —— [pages/love/index.html](pages/love/index.html) 与 [pages/love/detail.html](pages/love/detail.html) 同源问题（顶层 `return`，详情页还含顶层 `throw`）。已统一改为引擎等待器，角色缺失时友好提示。
*   **「我的」三个子页打不开** —— [achievements.html](pages/profile/achievements.html)、[tools.html](pages/profile/tools.html)、[inventory.html](pages/profile/inventory.html) 均在顶层同步取 `Cake` 且无等待逻辑，引擎未就绪即静默 `return`，页面停在空白 DOM。已全部接入 `boot-safe.js`。
*   **采购页空白 / 工具买不到** —— ① [pages/buy/index.js](pages/buy/index.js) 与烘焙页同款的顶层同步取引擎缺陷，已改为等待器；② [js/data/index.js](js/data/index.js) 把商店清单写成 `'./shop/index.js'`，而真实路径是 `js/shop/index.js`，导致 `SHOP_ITEMS` 永不定义；③ 季节白名单把**工具与基础原料一并过滤**，新玩家第一天连烤箱都买不到。三者均已修复，春季工具可见数从 0 恢复到 5。

#### 🟡 设计完善
*   **配方扩充 6 → 27 个** —— 补齐八大菜系（川/粤/鲁/苏/浙/湘/徽/闽各 2 个，此前 8 个菜系目录全为空文件且未在上层登记合并），新增小尺寸面包与甜点 5 个。全部严格遵循「叶子文件 → 尺寸/菜系 index → 总库」的三层合并约定，并逐层登记 `import` 与 `Object.assign`。
*   **商店内嵌到地点** —— 按根目录设计，商店不再是独立顶层地点。移除了设计外的 `market` 地点（它无详细数据、点进去必然显示「未知地点」），改为 `Cake.getLocationShop(region, loc)`，商业街/公园/河边到达即可就地采购，城镇列表也会标注「可购物」。
*   **两套地点数据冲突** —— 此前 [location_actions.js](js/actions/entertainment/map/location_actions.js) 内联了一套含 `market` 的地点数据，并用 `=` 整体覆盖 [town/index.js](js/actions/entertainment/map/town/index.js) 正规注册的 `REGIONS`，造成运行时两套数据并存。已改为从 `REGION_TOWN` 派生，地点详细数据回归单一来源。
*   **保质期系统接线** —— 原先 `spoil.js` 的分级变质状态机零调用、腐烂只有二元 `isRotten`，且保质期分类匹配率为 **0/83**（`tags[0]` 存的是 aromatic/sour 等风味词，与规则的 meat/grain 等分类完全对不上，所有食材都落到 default 7 天）。现按**来源目录**为 86 种食材打上 `shelfCategory`，补齐蛋/奶/果/辅料/建材 5 类规则，新增 `createInventoryItem` 统一入库（记录总保质期）与 `getItemSpoilage` 分级计算，并接入跨天结算与仓库页展示。
*   **属性系统接线** —— `Cake.ATTRIBUTES` 四维字典（风味/口感/香气/温度）此前零消费方，配方里的 `output.attrs` 只是静态摆设。现已参与优良品质判定（`calcAttrScore`，**不影响完美品质的四维门槛**以保持平衡），并在两个配方图鉴中渲染为可读的风味画像。
*   **熟练度可视化** —— 熟练度计算链路本身是通的（`addProficiencyExp` → `quality.js` 消费，配方也确实填写了 `minSkillLevel`/`minRecipeProf`），但**没有任何 UI 展示**，玩家看不到数值变化因而误判为「没被调用」。现烘焙工作台显示技能等级、配方熟练度进度条与距完美品质的具体差距；「我的档案」新增技能总览。
*   **睡觉白名单** —— 新增 `Cake.SLEEP_WHITELIST` 与 `Cake.canSleepAt(region, loc)`。此前 `Cake.sleep()` 硬编码 `triggerRest('town','home','sleep')`，玩家在公园点睡觉也会被当作在家睡觉；且 `Cake.ACTION_TYPES` 全项目未定义，`?? true` 兜底让校验形同虚设。现依据存档位置判定，页脚与地图内所有入口统一走白名单，非家中触发时给出可读提示。
*   **日志降噪** —— [js/host/log-bridge.js](js/host/log-bridge.js) 原先 hook 全部 `console.log/info/warn/error` 并镜像到底部面板，全项目 70+ 处装载日志持续刷屏。现默认只转发 `warn`/`error`（保留排错能力），系统日志面板默认折叠，需要时可 `setLogVerbose(true)` 开启详细模式。玩家日记走独立的 `state.log` 通道，不受影响。
*   **移动端适配** —— 布局中的固定像素改为比例单位与视口弹性尺寸：`.grid-2/.grid-3` 改用 `repeat(n, minmax(0, 1fr))` 纯比例列宽（并在 ≤420px 三列降两列、≤340px 统一单列）；外壳分栏从 `game.html` 的**内联样式**（优先级高于样式表，导致 CSS 规则失效）迁移到 `--footer-h` 变量统一管理的 `.main-pane/.log-pane`；底栏高度、日志面板高度改按视口百分比伸缩；地图三页固定 `aspect-ratio: 4/5` 的卡片补上 `max-height` 与内部滚动，避免矮屏裁切。320px 起可正常游玩，无横向溢出。

#### 🟢 顺带修复
*   **婚礼蛋糕永远做不出来** —— 它要求 `tech:'freeze'` 与 `perfectTools: ['stencil','large_oven']`，但工具库中两者都不存在。已补上带 `freeze` 技法的商用冷藏柜与多层大烤炉。
*   **建材类食材从未被合并** —— `INGREDIENTS_MATERIALS`（木材/生铁/精密零件）定义了却不在 `ingredients/index.js` 的合并清单里，河边商店只能买到 3 件工具。已补入清单，商店恢复 6 件。
*   **保质期规则重复定义** —— `attributes` 与 `ingredients` 两处各有一份逐字相同的 `SHELF_LIFE_RULES`，后者覆盖前者。已确立 `attributes` 为唯一权威来源，`ingredients` 版改为兜底守卫。
*   **导航未记录位置** —— `currentLocation` 仅在点击「主页/烘焙」时被写为 `home`，娱乐与地图流程完全不写位置，导致睡觉白名单形同虚设。现改为娱乐页标记 `town`、其余页面标记 `home`。
*   **店铺模块引擎获取无防御** —— `actions/shop/index.js` 的 `getCake()` 直接取 `window.parent.Cake`，父窗口不可用时抛错导致 `toggleShopStatus`/`cleanShop` 全部丢失。已加防御并改为顶层 await 加载卖出子模块。

#### ✅ 验证
全部改动通过静态校验（181 个 JS + 15 个 HTML 内联模块语法、CSS 括号平衡与变量引用）与 Node 沙箱行为验证：33 个引擎 API 全部挂载、120 天 × 8 tick 长周期模拟无异常、全 0 资源与越界畸形数据不崩溃、存档序列化与迁移正常、27 个配方的食材/工具/技法/属性键引用全部有效，49 项回归断言通过。

### v1.1 · 功能补全

> 本节记录上一轮迭代修复的功能断点，均为在**不改变目录结构与设计目的**前提下的补齐性修改。

#### 新增 / 修复
*   **手动售卖** —— 新增 `Cake.sellItem(index)`，店铺货架「卖出」按钮真正可用；按食材基础价与品质折价结算。
*   **材料包购买** —— 新增 `Cake.buyBundle(bundleId, qty)`，采购页材料包可一键下单，2 小时后按内容送达入库。
*   **小憩接口** —— 新增 `Cake.nap()`，娱乐页与主页「休息」按钮恢复可用（回复 40 精力、推进 60 分钟）。
*   **地点动作系统** —— 补全 `Cake.performLocationAction` 与 `Cake.getLocationActions`，地点页自动生成「散步探索 / 小憩 / 睡觉」动作；探索消耗精力与时间并触发地点随机事件。
*   **地图链路对齐** —— 总地图/城镇/地点三个页面统一数据源与跳转逻辑，地点列表、动作按钮、精力校验全部联通。
*   **制作装配修复** —— [js/actions/craft/index.js](js/actions/craft/index.js) 此前只声明子模块清单却从未执行加载，导致烘焙/订购/研发/清理整条制作系统未挂载；现已补加载循环。
*   **店铺装配修复** —— [js/actions/shop/index.js](js/actions/shop/index.js) 补加载卖出子模块 [js/actions/shop/sell.js](js/actions/shop/sell.js)。
*   **熟练度函数** —— 补全制作系统依赖的 `Cake.addProficiencyExp`（技能/配方经验增长，100 经验升 1 级）。
*   **存档键层级** —— `Cake.SAVE_KEY` 挂到引擎顶层，修复多标签页存档实时同步与「重新开始」清档分支。
*   **睡觉按钮** —— 修复页脚「睡觉」被未定义校验函数永久锁死的问题。

---

## 📄 许可证 (License)

本项目为个人学习与娱乐用途的开源项目，仅供交流参考。游戏内文案、图片资源如涉及第三方素材，版权归原作者所有。