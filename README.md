# cake-shop
为了客户


游戏地址：
https://nilegerumi-svg.github.io/cake-shop/

index.html
  → js/pages/index.js → router.js → start/index.js
  → 点击「开始新游戏」→ game.html

game.html
  → monitor.js（根目录）→ js/main.js → 7 个模块（含 shared.js）
  → game-ready → mainFrame 加载 pages/home.html
  → pages/home.html 内联脚本：握手 + 轮询 parent.Game + 渲染
  → logFrame 加载 pages/log.html：读取 parent.Cake.store.state.log + 接收 message 日志
