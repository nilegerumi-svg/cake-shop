# cake-shop
为了客户


游戏地址：
https://nilegerumi-svg.github.io/cake-shop/

目录树：

cake-shop/
│
├── index.html                          # 开始页（选头像、起名字）
├── game.html                           # 游戏外壳（header + nav + mainFrame + logFrame + footer）
├── monitor.js                          # 根目录启动器（错误捕获 + 加载 js/main.js + iframe 监控）
│
├── css/
│   └── styles.css                      # 全局样式（含 modal / char-card / achievement / ing-tag 等）
│
├── pages/                              # iframe 内容页
│   ├── home.html                       # 主页（内联脚本：握手 + 轮询 parent.Game + 渲染）
│   ├── log.html                        # 小店日记（读 parent.Cake.store.state.log + 接收 message 日志）
│   ├── bake.html                       # 烘焙页
│   ├── buy.html                        # 采购页
│   ├── love.html                       # 缘分页（角色卡 + 送礼）
│   ├── profile.html                    # 我的档案页（成就 + 存档 + 结局）
│   ├── recipe.html                     # 配方图鉴页
│   ├── shop.html                       # 店铺经营页（升级 / 装饰 / 定价 / 开店）
│   └── entertainment/
│       ├── index.html                  # 娱乐与外出（休息 / 散步入口）
│       └── map.html                    # 地图页（地点列表 + 出发散步）
│
└── js/
    ├── main.js                         # 引擎主控（状态机 + 按 MODULES 顺序 import 模块）
    ├── shared.js                       # 父页面 Game 兼容层（LIVE_KEYS → Cake 代理）
    ├── monitor.js                      # ⚠️ 兼容存根（委托到根目录 monitor.js）
    │
    ├── core/                           # 核心层（由 core/index.js 统一加载）
    │   ├── index.js                    # import store → bridge → utils → state → modal → effects → render
    │   ├── store.js                    # Cake.store（getter/setter + DEFAULT_STATE）
    │   ├── bridge.js                   # 父页面专用跨 iframe 消息桥
    │   ├── utils.js                    # $ / escapeHtml / addLog / affLevel / ingredientTags 等
    │   ├── state.js                    # SAVE_KEY / defaultState / mergeWithDefault / saveState / loadStateFromStorage
    │   ├── modal.js                    # showModal / closeModal
    │   ├── effects.js                  # applyEventEffects / checkAchievements / checkAffEvent
    │   └── render.js                   # renderHeader/Nav/Footer/Log / refreshPage / initPage
    │
    ├── data/                           # 数据层（由 data/index.js 统一加载）
    │   ├── index.js                    # import 全部数据文件
    │   ├── ingredients.js              # Cake.INGREDIENTS（deepFreeze）
    │   ├── recipes.js                  # Cake.RECIPES（deepFreeze）
    │   ├── bundles.js                  # Cake.BUNDLES（deepFreeze）
    │   ├── characters.js               # Cake.CHARACTERS / AFF_EVENTS / CHAT_DIALOGUES / DATE_DIALOGUES / MEETINGS
    │   ├── events.js                   # Cake.RANDOM_EVENTS / WALK_EVENTS（deepFreeze）
    │   ├── shop-config.js              # Cake.SHOP_UPGRADE_COSTS
    │   └── achievements.js             # Cake.ACHIEVEMENTS（数组 + 每项冻结）
    │
    ├── time/
    │   └── index.js                    # Cake.advanceTime / getTimeString / getPeriodString
    │
    ├── monitor/                        # 运行期监控中心（由 main.js MODULES 加载）
    │   ├── index.js                    # 模块自检（DOMContentLoaded 后延迟执行）
    │   ├── page.js                     # storage 事件 → 重新 loadStateFromStorage + refreshPage
    │   └── time.js                     # 包装 advanceTime，检测跨天 + 通知父页面 refreshPage
    │
    ├── host/                           # 宿主环境（由 main.js MODULES 加载，最后）
    │   ├── index.js                    # import error → router → sync → main
    │   ├── error.js                    # 错误捕获（若根 monitor.js 已接管则跳过）
    │   ├── router.js                   # 拦截 iframe 内 <a>，统一走 HostRouter.navigateTo
    │   ├── sync.js                     # Cake.bridge.setHostBroadcaster → 同步 state 到 iframe
    │   └── main.js                     # ResizeObserver --footer-h + 首屏 initPage('home')
    │
    ├── actions/                        # 玩法动作（由 actions/index.js 统一加载）
    │   ├── index.js                    # import bakery → shop → social → system → entertainment/index
    │   ├── bakery.js                   # bakeCake / buyIngredient / buyBundle / researchRecipe
    │   ├── shop.js                     # upgradeShop / decorateShop / setPriceRate / openShop
    │   ├── social.js                   # social / toggleGiftPanel / giveGift
    │   ├── system.js                   # showEnding / saveGame / loadGame / resetGame
    │   │
    │   └── entertainment/
    │       ├── index.js                # import map/index → common_events → rest/index → walk
    │       ├── walk.js                 # Cake.walk（调用 MapMonitor.checkWalkEvent + applyEventEffects）
    │       ├── common_events.js        # Cake.COMMON_WALK_EVENTS
    │       │
    │       ├── map/
    │       │   ├── index.js            # 汇总 Cake.REGION_TOWN → Cake.LOCATIONS
    │       │   ├── monitor.js          # Cake.MapMonitor.checkWalkEvent（加权随机）
    │       │   └── town/
    │       │       ├── index.js        # 汇总 _MAP_DATA_* → Cake.REGION_TOWN
    │       │       ├── monitor.js      # Cake.TOWN_EVENTS
    │       │       ├── home/index.js   # Cake._MAP_DATA_HOME
    │       │       ├── park/index.js   # Cake._MAP_DATA_PARK
    │       │       ├── street/index.js # Cake._MAP_DATA_STREET
    │       │       └── river/index.js  # Cake._MAP_DATA_RIVER
    │       │
    │       └── rest/
    │           ├── index.js            # Cake.triggerRest / Cake.rest / Cake.sleep
    │           ├── monitor.js          # Cake.RestMonitor.check
    │           ├── nap.js              # Cake.RestSys.nap
    │           ├── sleep.js            # Cake.RestSys.sleep
    │           └── town/
    │               ├── index.js        # Cake.TownRestConfig
    │               └── events/
    │                   ├── index.js    # import common + place/home + place/park
    │                   ├── common.js   # Cake.REST_EVENTS['town_common']
    │                   └── place/
    │                       ├── home.js # Cake.REST_EVENTS['town_home_nap' / 'town_home_sleep']
    │                       └── park.js # Cake.REST_EVENTS['town_park_nap']
    │
    └── pages/                          # 页面级脚本（由 index.html / pages/home.html 加载）
        ├── index.js                    # import router.js
        ├── router.js                   # 按 pathname 分发到 start/index.js 或 home/index.js
        ├── start/
        │   └── index.js                # 开始页逻辑（头像选择 / 存档检测 / 跳转 game.html）
        └── home/                       # ⚠️ 死代码（pages/home.html 自带内联脚本，不会加载这三个）
            ├── index.js
            ├── view.js
            └── events.js



浏览器打开 index.html
  │
  ├─ 兜底脚本执行（错误捕获 / 10s 超时 / 3s 软完成 / MutationObserver）
  │
  ├─ <script src="js/core/store.js">           → window.Cake.store 就绪
  ├─ <script src="js/core/state.js">           → Cake.SAVE_KEY / defaultState / saveState 就绪
  ├─ <script type="module" src="js/pages/index.js">
  │     └→ js/pages/router.js
  │           └→ js/pages/start/index.js
  │                 ├─ 绑定头像 / 输入框 / 按钮
  │                 ├─ 读 localStorage 判断是否有存档 → 显示「继续游戏」
  │                 └─ 末尾调用 window.appLoadingComplete()  ← 关闭 loading 屏
  │
  └─ 点击「开始新游戏」→ localStorage 写入 → location.href = 'game.html'


  game.html
  │
  ├─ 内联脚本：解析 logFrame.src = new URL('pages/log.html', baseURI).href
  │
  ├─ <script src="monitor.js">                  ← 根目录启动器
  │     ├─ IS_START_PAGE 检测（不会触发）
  │     ├─ 监听全局 error / unhandledrejection
  │     ├─ attachFrameMonitor(mainFrame / logFrame)
  │     ├─ 动态 <script type="module" src="js/main.js">
  │     │     └→ js/main.js 状态机 IDLE → INITIALIZING
  │     │           │
  │     │           ├─ await import('./data/index.js')
  │     │           │     └→ ingredients / recipes / bundles / characters / events / shop-config / achievements
  │     │           │
  │     │           ├─ await import('./core/index.js')
  │     │           │     └→ store → bridge → utils → state → modal → effects → render
  │     │           │
  │     │           ├─ await import('./time/index.js')
  │     │           │     └→ Cake.advanceTime / getTimeString / getPeriodString
  │     │           │
  │     │           ├─ await import('./actions/index.js')
  │     │           │     ├→ bakery.js / shop.js / social.js / system.js
  │     │           │     └→ entertainment/index.js
  │     │           │           ├→ map/index.js
  │     │           │           │     ├→ monitor.js（Cake.MapMonitor）
  │     │           │           │     └→ town/index.js
  │     │           │           │           ├→ monitor.js（Cake.TOWN_EVENTS）
  │     │           │           │           ├→ home / park / street / river/index.js
  │     │           │           │           └→ 汇总 Cake.REGION_TOWN
  │     │           │           │     └→ 汇总 Cake.LOCATIONS
  │     │           │           ├→ common_events.js（Cake.COMMON_WALK_EVENTS）
  │     │           │           ├→ rest/index.js
  │     │           │           │     ├→ nap.js / sleep.js / monitor.js
  │     │           │           │     ├→ town/index.js（Cake.TownRestConfig）
  │     │           │           │     └→ Cake.triggerRest / Cake.rest / Cake.sleep
  │     │           │           └→ walk.js（Cake.walk）
  │     │           │
  │     │           ├─ await import('./shared.js')
  │     │           │     └→ window.Game 兼容层（LIVE_KEYS → Cake 代理）
  │     │           │
  │     │           ├─ await import('./monitor/index.js')
  │     │           │     ├→ time.js（包装 advanceTime 检测跨天）
  │     │           │     ├→ page.js（storage → loadStateFromStorage + refreshPage）
  │     │           │     └→ 自检（延迟到 DOMContentLoaded 后）
  │     │           │
  │     │           ├─ await import('./host/index.js')
  │     │           │     ├→ error.js（若根 monitor.js 已接管则跳过）
  │     │           │     ├→ router.js（iframe <a> 拦截 + HostRouter.navigateTo）
  │     │           │     ├→ sync.js（Cake.bridge.setHostBroadcaster）
  │     │           │     └→ main.js（ResizeObserver --footer-h + initPage('home')）
  │     │           │
  │     │           └─ safeReady() → game-ready 事件
  │     │
  │     ├─ 收到 game-ready → markEngineReady()
  │     └─ 同时等待 mainFrame 的 home-ready / load
  │
  └─ tryBoot() 成功 → finishLoading() 隐藏 loading 屏
        │
        ├─ mainFrame.src = 'pages/home.html'
        │     └→ home.html 内联脚本
        │           ├─ 握手：postMessage({ type: 'home-ready' })
        │           ├─ 轮询 window.parent.Game（最多 20s）
        │           └─ 渲染主页卡片（资金 / 声望 / 精力 / 库存蛋糕 / 快速行动）
        │
        └─ logFrame.src = 'pages/log.html'
              └→ log.html 内联脚本
                    ├─ 轮询 window.parent.Cake.store.state.log（最多 10s）
                    ├─ 监听 message({ type: 'log' }) 显示系统日志
                    └─ 渲染日记列表（按天分组 + 搜索 + 加载更多）


pages/*.html
  │
  ├─ <script src="../js/core/store.js">       ← Cake.store 就绪
  ├─ <script src="../js/data/*.js">           ← 数据就绪（如果该页需要）
  ├─ <script src="../js/core/state.js">       ← 存档系统就绪
  ├─ <script src="../js/core/utils.js">       ← 工具函数就绪
  ├─ <script src="../js/core/modal.js">       ← 弹窗就绪
  ├─ <script src="../js/core/effects.js">     ← 事件效果就绪
  ├─ <script src="../js/core/render.js">      ← refreshPage / initPage 就绪
  ├─ <script src="../js/actions/*.js">        ← 玩法函数就绪
  ├─ <script src="../js/shared.js">           ← ⚠️ 子页面走「跳过代理」分支，不挂 window.Game
  │
  └─ 内联脚本 boot() 轮询 window.parent.Game
        └→ 就绪后 bindClick() + G.initPage('xxx', renderXxx)



用户点击「烘焙」
  → bake.html 按钮 → Game.bakeCake(name)
  → Cake.bakeCake（js/actions/bakery.js）
      ├─ 检查 recipes / energy / ingredients
      ├─ consumeIngredients + state.cakes[name]++ + state.energy -= 20
      ├─ Cake.addLog
      ├─ Cake.checkAchievements
      └─ Cake.refreshPage
            └→ render.js refreshPage
                  ├─ Cake.saveState()（写 localStorage + notifyStateChanged）
                  └─ renderAll()（父页面 header / nav / footer / log）

用户点击「散步」
  → entertainment/index.html → HostRouter.navigateTo('pages/entertainment/map.html')
  → map.html 点击地点 → Cake.walk(locKey)
  → js/actions/entertainment/walk.js
      ├─ 检查 energy >= locConfig.cost
      ├─ state.energy -= cost
      ├─ Cake.MapMonitor.checkWalkEvent(locKey, state)
      │     └→ 合并 COMMON_WALK_EVENTS + TOWN_EVENTS + locConfig.events
      │         → 过滤 condition → 按权重随机抽取
      ├─ Cake.applyEventEffects(chosen)
      ├─ Cake.checkAffEvent(触发的角色)
      ├─ Cake.checkAchievements
      ├─ Cake.saveState
      └─ Cake.refreshPage → 600ms 后返回 entertainment/index.html

用户点击「睡觉」
  → home.html「睡觉」→ Game.sleep()
  → Cake.sleep → Cake.triggerRest('town', 'home', 'sleep')
  → js/actions/entertainment/rest/index.js
      ├─ 查 Cake.Actions.Rest.town.home.sleep = { time: 'next_day' }
      ├─ 计算距次日 08:00 的分钟数
      ├─ Cake.RestMonitor.check('town', 'home', 'sleep')
      │     └→ 查 town_home_sleep（50% good_morning）
      │         → 未中则查 town_common（fly 只匹配 nap，不触发）
      ├─ Cake.RestSys.sleep({ time, logs })
      │     ├─ state.energy = 100
      │     └─ Cake.advanceTime(time)
      │           ├─ 跨天 → handleNextDay → 恢复体力 + 写日志
      │           └─ Cake.saveState + Cake.refreshPage
      └─ 若 advanceTime 未定义，降级 saveState + refreshPage
