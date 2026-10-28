# cake-shop
为了客户


游戏地址：
https://nilegerumi-svg.github.io/cake-shop/

game.html
  → monitor.js（根目录）→ js/main.js
  → MODULES 依次加载：
      data → core → time → actions → shared
      → monitor/index.js（自检 + 挂载 time.js / page.js）
      → host/index.js
  → game-ready
  → mainFrame 加载 pages/home.html
  → logFrame 加载 pages/log.html
