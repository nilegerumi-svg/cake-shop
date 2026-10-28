# cake-shop
为了客户


游戏地址：
https://nilegerumi-svg.github.io/cake-shop/

时间轴 ──────────────────────────────────────────────────────────→

index.html
  ├─ 兜底脚本
  ├─ store.js / state.js
  ├─ js/pages/index.js → router.js → start/index.js
  └─ appLoadingComplete()

点击「开始新游戏」
  ↓
game.html
  ├─ monitor.js（根目录）
  │     └─ 动态加载 js/main.js
  │
  └─ main.js
        ├─ data → core → time → actions（含 entertainment）
        ├─ shared.js → window.Game
        ├─ monitor/index.js → time / page 监视器
        └─ host/index.js → error / router / sync / main
              │
              └─ safeReady() → game-ready
                    │
                    ├─ monitor.js: markEngineReady()
                    │
                    └─ monitor.js: mainFrame.src = pages/home.html
                          │
                          └─ pages/home.html
                                └─ js/pages/index.js → router.js → home/index.js
                                      ├─ startHandshake() → postMessage('home-ready')
                                      └─ waitEngine() → 轮询 window.parent.Game
                                            │
                                            ├─ monitor.js 收到 home-ready → 回 ack
                                            │     └─ markHomeReady(true)
                                            │
                                            └─ Game 就绪 → bindEvents + initPage('home', renderHome)
                                                  └─ refreshPage → renderAll
                                                        ├─ 父页面 header / nav / footer
                                                        └─ renderHome() → iframe #content

tryBoot()（engineReady && homeReady）
  └─ finishLoading() → loading 屏隐藏

──────────── 进入游戏运行期 ────────────

用户点击 navBar → HostRouter.navigateTo → mainFrame.src
iframe 加载新页面 → boot() 轮询 Game → initPage('xxx', renderXxx)
用户操作 → Game.xxx → Cake.xxx → 修改 state → saveState + refreshPage
  → 父页面 renderAll → 子页面 renderXxx
  → bridge 广播 state-sync → 其它 iframe 同步






加载关系图：
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
