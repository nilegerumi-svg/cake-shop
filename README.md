# cake-shop
为了客户


游戏地址：
https://nilegerumi-svg.github.io/cake-shop/

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
        │           ├→ common_events.js
        │           ├→ rest/index.js → nap + sleep + monitor + town/index.js
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
        │           ├─ map/index.js → monitor.js + town/index.js
        │           │     └─ town/index.js → monitor.js + home/park/street/river/index.js
        │           ├─ common_events.js
        │           ├─ rest/index.js
        │           │     ├─ nap.js / sleep.js / monitor.js
        │           │     └─ town/index.js → events/index.js → common + place/home + place/park
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

pages/xxx.html（bake / buy / love / profile / recipe / shop / entertainment/index / map）
  ├─ js/core/*.js（store / state / utils / modal / effects / render）
  ├─ js/data/*.js
  ├─ js/actions/*.js
  ├─ js/shared.js
  └─ 内联 boot() → G.initPage('xxx', renderXxx)

pages/log.html
  └─ 内联脚本（轮询 parent.Cake.store.state.log + 接收 message 日志）
