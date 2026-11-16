
/* ===== 手写区 · 顶栏收起态的常驻功能入口 =====
   背景：顶栏一旦收起，TopBarToolRow 整行不渲染，手册 / 设置 / 新手引导 /
   库存总览四个入口全部消失（实测 btn-handbook / btn-settings 均为 0）。
   收起态有两类来源：
     ① compact 档（moto razr 合盖外屏 352x355 等）由 auto-collapse.js 强制收起；
     ② 窄屏 / 矮屏由 tight() 自动收起，例如 razr 展开内屏 DPR3 的 360x780、
        书本式折叠外屏 344x840、手机横屏 844x390。
   本脚本在「顶栏已渲染、处于收起态、且手册按钮不在 DOM」时往主文档注入一个
   浮动「☰」按钮 + 小菜单，通过 phone-app-shell 暴露的
   window.__cakeOpenDialog(name) 打开对应面板；顶栏展开后自动移除。
   样式见 css/razr.css。与 layout-sync.js / auto-collapse.js 一样采用 host 层
   轮询，不侵入 React 渲染。 */
(function () {
  var ID = 'tm-compact-entry';
  /* v26：合盖外屏把右下四个浮层收起后，功能改由本菜单代理打开。
     前四项走 __cakeOpenDialog；后四项用选择器触发原按钮的 click()
     —— display:none 的元素 .click() 仍会派发事件，host 面板逻辑完全不动。 */
  var ITEMS = [
    ['handbook', '📖', '手册', ''],
    ['settings', '⚙️', '设置', ''],
    ['guide', '📘', '新手引导', ''],
    ['inventory', '📦', '库存总览', ''],
    ['people', '📖', '人物志', '#tm-people-btn'],
    ['regs', '🧾', '熟客簿', '#tm-regs-btn'],
    ['wall', '🥄', '文案墙', '#tm-wall-btn'],
    ['voice', '🎙️', '语音指令', '[data-testid="btn-voice-command"]'],
  ];
  function closeMenu(root) { root.classList.remove('tmce-open'); }
  function build() {
    var root = document.createElement('div');
    root.id = ID;
    var menu = document.createElement('div');
    menu.className = 'tmce-menu';
    menu.setAttribute('data-testid', 'compact-entry-menu');
    menu.setAttribute('role', 'menu');
    for (var i = 0; i < ITEMS.length; i++) {
      (function (item) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tmce-item';
        b.setAttribute('role', 'menuitem');
        b.setAttribute('data-testid', 'btn-compact-' + item[0]);
        b.textContent = item[1] + ' ' + item[2];
        b.addEventListener('click', function (ev) {
          ev.stopPropagation();
          closeMenu(root);
          var sel = item[3];
          if (sel) {
            var target = document.querySelector(sel);
            if (target) target.click();
          } else {
            var fn = window.__cakeOpenDialog;
            if (typeof fn === 'function') fn(item[0]);
          }
        });
        menu.appendChild(b);
      })(ITEMS[i]);
    }
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'tmce-btn';
    btn.setAttribute('data-testid', 'btn-compact-entry');
    btn.setAttribute('aria-label', '功能菜单：手册 / 设置 / 新手引导 / 库存总览 / 人物志 / 熟客簿 / 文案墙 / 语音指令');
    btn.setAttribute('aria-haspopup', 'menu');
    btn.textContent = '☰';
    btn.addEventListener('click', function (ev) {
      ev.stopPropagation();
      root.classList.toggle('tmce-open');
    });
    root.appendChild(menu);
    root.appendChild(btn);
    document.body.appendChild(root);
    document.addEventListener('pointerdown', function (ev) {
      if (!root.contains(ev.target)) closeMenu(root);
    }, true);
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') closeMenu(root);
    });
    return root;
  }
  /* 不直接用 getElementById：若页面上有同名 id 的 script 标签（本文件初版就撞过），
     getElementById 会先返回 script，导致 build() 永远不执行且无任何报错。
     改用属性选择器筛出自己创建的 DIV。 */
  function findRoot() {
    var all = document.querySelectorAll('[id="' + ID + '"]');
    for (var i = 0; i < all.length; i++) if (all[i].tagName === 'DIV') return all[i];
    return null;
  }
  function needEntry() {
    if (window.__cakeLayoutCompact === true) return true;
    var st = document.querySelector('[data-testid="btn-topbar-status-toggle"]');
    if (!st) return false;                              /* 应用未渲染完，不判定，避免闪烁 */
    if (st.getAttribute('aria-expanded') !== 'false') return false;  /* 展开态：入口本就在 */
    return document.querySelectorAll('[data-testid="btn-handbook"]').length === 0;
  }
  /* 动态贴到顶栏右下角：不同档位顶栏高度不同（82~109px），
     固定 top 会落在内容区。按钮只占顶栏内部，不遮挡楼层卡片。 */
  function place(root) {
    var tb = document.querySelector('.top-bar');
    if (!tb) return;
    var r = tb.getBoundingClientRect();
    root.style.top = Math.max(2, Math.round(r.bottom - 34)) + 'px';
  }
  function sync() {
    var on = needEntry();
    var el = findRoot();
    if (on && !el) el = build();
    else if (!on && el) { el.remove(); el = null; }
    if (on && el) place(el);
    try {
      if (on) document.documentElement.setAttribute('data-tm-entry', '1');
      else document.documentElement.removeAttribute('data-tm-entry');
    } catch (e) {}
  }
  sync();
  setInterval(sync, 300);
  window.addEventListener('resize', sync);
  window.addEventListener('orientationchange', function () { setTimeout(sync, 300); });
})();
