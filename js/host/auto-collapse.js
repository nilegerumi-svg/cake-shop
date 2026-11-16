
/* 矮屏（如横屏手机）与小屏机型：自动收起顶栏两组，把空间让给内容区；
   用户手动收起/展开过（本地有记录）则完全尊重手动选择，绝不干预。

   v25 例外：翻盖式竖折（moto razr）合盖外屏只有 352x355 ~ 424x360，
   物理高度不足以容纳展开的顶栏（≥270px，实测 540px 会超过整个视口）。
   此时必须强制收起并忽略手动标记 —— 否则用户点一次「展开」，writeFlagPref
   写入 localStorage 后 hasPref() 永久为真、本函数彻底退出，再合盖时内容区
   只剩 8px 且无法自动恢复（不可逆死锁）。外屏的全部功能改由
   js/host/compact-entry.js 注入的常驻浮动入口访问，无需展开顶栏。 */
(function () {
  function tight() {
    try { return window.innerHeight < 520 || window.innerWidth <= 360; } catch (e) { return false; }
  }
  function compact() {
    /* 与 layout-sync.js 的 compact 档同源；脚本未就绪时用本地判据兜底 */
    if (typeof window.__cakeLayoutCompact === 'boolean') return window.__cakeLayoutCompact;
    try {
      return window.innerHeight <= 440 && window.matchMedia('(pointer: coarse)').matches;
    } catch (e) { return false; }
  }
  var KEYS = ['tm_topbar_collapse_status', 'tm_topbar_collapse_tools'];
  function hasPref() {
    try {
      return window.localStorage.getItem(KEYS[0]) !== null
          || window.localStorage.getItem(KEYS[1]) !== null;
    } catch (e) { return true; }
  }
  function clearPref() {
    for (var i = 0; i < KEYS.length; i++) {
      try { window.localStorage.removeItem(KEYS[i]); } catch (e) {}
    }
  }
  /* 顶栏按钮的 onClick 会把折叠状态写进 localStorage（topbar-tabbar.js 的 writeFlagPref）。
     自动收起是「点击按钮」实现的，若不还原这两个键，hasPref() 会把自动行为误判成用户手动选择，
     从此 apply() 永久退出 —— 实测横屏 844×390 自动收起后切回竖屏，顶栏卡在收起态，
     手册 / 设置入口一直不可达。用户自己点按钮留下的键则不会被清除，手动选择依然被尊重。 */
  function snapshot() {
    var o = {};
    for (var i = 0; i < KEYS.length; i++) {
      try { o[KEYS[i]] = window.localStorage.getItem(KEYS[i]); } catch (e) { o[KEYS[i]] = null; }
    }
    return o;
  }
  function restore(o) {
    for (var i = 0; i < KEYS.length; i++) {
      try {
        if (o[KEYS[i]] === null) window.localStorage.removeItem(KEYS[i]);
        else window.localStorage.setItem(KEYS[i], o[KEYS[i]]);
      } catch (e) {}
    }
  }
  function stateOf(sel) {
    var el = document.querySelector(sel);
    if (!el) return null;
    return el.getAttribute('aria-expanded') === 'false' ? 'collapsed' : 'expanded';
  }
  function topbar() { return !!document.querySelector('.top-bar'); }
  function setTo(want) {
    var snap = snapshot();   /* 自动操作前后原样还原，避免污染「用户手动」标记 */
    if (want) {
      var a = document.querySelector('[data-testid="btn-topbar-status-toggle"]');
      if (a && a.getAttribute('aria-expanded') === 'true') a.click();
      var b = document.querySelector('[data-testid="btn-topbar-tools-toggle"]');
      if (b && b.getAttribute('aria-expanded') === 'true') b.click();
    } else {
      var c = document.querySelector('[data-testid="btn-topbar-status-toggle"]');
      if (c && c.getAttribute('aria-expanded') === 'false') c.click();
      var d = document.querySelector('[data-testid="btn-topbar-tools-toggle"]');
      if (d && d.getAttribute('aria-expanded') === 'false') d.click();
    }
    restore(snap);
  }
  var applied = null;
  var ST = '[data-testid="btn-topbar-status-toggle"]';
  var TL = '[data-testid="btn-topbar-tools-toggle"]';
  function apply() {
    if (!topbar()) return;
    /* --- 翻盖外屏：强制收起，物理空间不允许展开（不受手动标记影响） --- */
    if (compact()) {
      var s = stateOf(ST), t = stateOf(TL);
      if (s === null || t === null) return;
      if (s !== 'collapsed' || t !== 'collapsed') setTo(true);
      applied = 'compact';   /* 离开 compact 后强制重新按正常逻辑判定一次 */
      return;
    }
    /* --- 其余档位：完全尊重用户手动选择 ---
       刚离开翻盖外屏时例外：外屏期间的按钮操作（含被强制收起前的那次点击）
       属于「外屏保护行为」，不构成长期偏好。若原样留下，hasPref() 会让本函数
       永久退出，实测展开内屏后顶栏卡在收起态、手册 / 设置入口 0/0 不可达。
       清掉这两个键，让布局按设备默认恢复一次；此后用户再手动操作会重新写入
       并被正常尊重。 */
    if (applied === 'compact') clearPref();
    if (hasPref()) return;
    var want = tight();
    if (applied === want) return;
    var s2 = stateOf(ST);
    var t2 = stateOf(TL);
    if (s2 === null || t2 === null) return;
    var need = want ? (s2 !== 'collapsed' || t2 !== 'collapsed') : (s2 !== 'expanded' || t2 !== 'expanded');
    if (!need) { applied = want; return; }
    setTo(want);
    applied = want;
  }
  setInterval(apply, 800);
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', function () { setTimeout(apply, 350); });
})();
