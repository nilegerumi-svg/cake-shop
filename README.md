# cake-shop
为了客户

游戏地址：
https://nilegerumi-svg.github.io/cake-shop/

///////工作逻辑///////
////////////////////////
///////////////////////
index.html
  │  兜底脚本 + store.js + state.js
  │  js/pages/index.js (module) → router.js → start/index.js
  │  appLoadingComplete() 关闭 loading
  ▼
「开始新游戏」→ 写存档 → game.html
  │
  ├─ monitor.js（根目录）
  │     ├─ 错误监听 + iframe 监控
  │     └─ 动态 <script type="module" src="js/main.js">
  │
  └─ js/main.js 状态机
        IDLE → INITIALIZING
        │
        ├─ await import('./data/index.js')
        ├─ await import('./core/index.js')
        ├─ await import('./time/index.js')
        ├─ await import('./actions/index.js')
        │     └→ entertainment/index.js
        │           ├→ map/index.js → monitor + town/index.js
        │           │     └→ town/index.js → monitor + home/park/street/river/index.js
        │           ├→ common_events.js
        │           ├→ rest/index.js → nap + sleep + monitor + town/index.js
        │           │     └→ town/index.js → events/index.js → common + place/home + place/park
        │           └→ walk.js
        ├─ await import('./shared.js')          ← window.Game 兼容层
        ├─ await import('./monitor/index.js')   ← time / page 监视器 + 自检
        └─ await import('./host/index.js')      ← error / router / sync / main
              │
              └─ safeReady() → game-ready
  │
  ├─ monitor.js 收到 game-ready → markEngineReady()
  │
  ├─ 同时 mainFrame.src = pages/home.html
  │     └→ pages/home.html
  │           └→ <script type="module" src="../js/pages/index.js">
  │                 └→ router.js → home.html 分支
  │                       └→ js/pages/home/index.js
  │                             ├─ startHandshake() → postMessage('home-ready')
  │                             └─ waitEngine() → 轮询 window.parent.Game
  │
  ├─ monitor.js 收到 home-ready → 回 ack → markHomeReady(true)
  │
  └─ tryBoot() 成功 → finishLoading() 隐藏 loading 屏
        │
        └─ 引擎 + 主页 + 握手 全部就绪


//////////页面层级///////////
////////////////////////////
///////////////////////////
娱乐首页（pages/entertainment/index.html）
  └─ 🗺️ 外出地图 → 总地图（pages/entertainment/map/index.html）
        │   显示「区域」列表（城镇 / 未来更多区域）
        └─ 🏘️ 城镇（pages/entertainment/map/town.html）
              │   显示「地点」列表（home/park/street/river）
              └─ 点击地点 → 散步（walk，消耗精力 + 推进时间）


//////////核心系统///////////
////////////////////////////
///////////////////////////

【时间系统】js/time/index.js
  - Cake.advanceTime(minutes)  推进时间，跨天自动 +30 精力并写日志
  - Cake.getTimeString()       返回 HH:MM
  - Cake.getPeriodString()     返回时段文案（清晨/上午/…/深夜）
  - 监视器包装：js/monitor/time.js 在 advanceTime 外层监听「跨天」事件

【休息系统】js/actions/entertainment/rest/
  - Cake.triggerRest(region, location, action)  统一调度器
  - Cake.rest()  = 小憩（town/home/nap）  恢复精力 + 推进 60 分钟
  - Cake.sleep() = 睡觉（town/home/sleep） 精力回满 + 推进到次日 08:00
  - Cake.RestSys.nap / Cake.RestSys.sleep  底层实现
  - Cake.RestMonitor.check  抽取休息事件（地点专属 + 区域通用）

【散步系统】js/actions/entertainment/walk.js
  - Cake.walk(location)  扣精力 + 抽取事件 + 推进时间（locConfig.time 分钟）
  - 地点 time 字段：home 30 / park 45 / street 30 / river 45（分钟）

【区域地图】js/actions/entertainment/map/
  - Cake.REGIONS           区域注册表（town / 未来区域）
  - Cake.REGION_TOWN       城镇地点表
  - Cake.LOCATIONS         所有地点汇总（walk 用）
  - Cake.getRegionLocations(regionId)  按区域取地点

【Game 兼容层】js/shared.js
  - window.Game 代理 window.Cake
  - ⚠️ rest / sleep / walk 用「普通属性」包装暴露，绝不放进 LIVE_KEYS
    （否则 setter 会把真实 Cake.xxx 覆盖成自引用函数 → 无限递归）


//////////目录树///////////
////////////////////////////
///////////////////////////

index.html
  ├─ js/core/store.js
  ├─ js/core/state.js
  └─ js/pages/index.js ──→ router.js ──→ start/index.js

game.html
  ├─ monitor.js（根目录）
  └─ 动态 js/main.js
        ├─ js/data/index.js
        │     ├─ ingredients.js / recipes.js / bundles.js
        │     ├─ characters.js / events.js / shop-config.js
        │     └─ achievements.js
        ├─ js/core/index.js
        │     ├─ store.js / bridge.js / utils.js / state.js
        │     └─ modal.js / effects.js / render.js
        ├─ js/time/index.js
        ├─ js/actions/index.js
        │     ├─ bakery.js / shop.js / social.js / system.js
        │     └─ entertainment/index.js
        │           ├─ map/index.js ──→ monitor.js + town/index.js
        │           │     └─ town/index.js ──→ monitor.js + home/park/street/river/index.js
        │           ├─ common_events.js
        │           ├─ rest/index.js ──→ nap.js + sleep.js + monitor.js + town/index.js
        │           │     └─ town/index.js ──→ events/index.js ──→ common + place/home + place/park
        │           └─ walk.js
        ├─ js/shared.js
        ├─ js/monitor/index.js
        │     ├─ time.js
        │     └─ page.js
        └─ js/host/index.js
              ├─ error.js
              ├─ router.js
              ├─ sync.js
              └─ main.js

pages/home.html
  └─ js/pages/index.js ──→ router.js ──→ home/index.js
        ├─ view.js（renderHome）
        └─ events.js（bindEvents）

pages/entertainment/
  ├─ index.html（娱乐首页）
  └─ map/
       ├─ index.html（🗺️ 总地图 · 区域列表）
       └─ town.html（🏘️ 城镇 · 地点列表 → 散步）

pages/xxx.html（bake / buy / love / profile / recipe / shop）
  ├─ js/core/*.js（store / state / utils / modal / effects / render）
  ├─ js/data/*.js
  ├─ js/actions/*.js（bakery / shop / social / system）
  ├─ js/shared.js
  └─ 内联 boot() → G.initPage('xxx', renderXxx)

pages/log.html
  └─ 内联脚本（轮询 parent.Cake.store.state.log + 接收 message 日志）
