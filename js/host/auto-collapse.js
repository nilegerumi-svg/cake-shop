
/* 矮屏（如横屏手机）与小屏机型：自动收起顶栏两组，把空间让给内容区；
   用户手动收起/展开过（本地有记录）则完全尊重手动选择，绝不干预。 */
(function () {
  function tight() {
    try { return window.innerHeight < 520 || window.innerWidth <= 360; } catch (e) { return false; }
  }
  function hasPref() {
    try {
      return window.localStorage.getItem('tm_topbar_collapse_status') !== null
          || window.localStorage.getItem('tm_topbar_collapse_tools') !== null;
    } catch (e) { return true; }
  }
  function stateOf(sel) {
    var el = document.querySelector(sel);
    if (!el) return null;
    return el.getAttribute('aria-expanded') === 'false' ? 'collapsed' : 'expanded';
  }
  function topbar() { return !!document.querySelector('.top-bar'); }
  function setTo(want) {
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
  }
  var applied = null;
  function apply() {
    if (!topbar() || hasPref()) return;
    var want = tight();
    if (applied === want) return;
    var s = stateOf('[data-testid="btn-topbar-status-toggle"]');
    var t = stateOf('[data-testid="btn-topbar-tools-toggle"]');
    if (s === null || t === null) return;
    var need = want ? (s !== 'collapsed' || t !== 'collapsed') : (s !== 'expanded' || t !== 'expanded');
    if (!need) { applied = want; return; }
    setTo(want);
    applied = want;
  }
  setInterval(apply, 800);
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', function () { setTimeout(apply, 350); });
})();
