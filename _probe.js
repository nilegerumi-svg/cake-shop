(function () {
  'use strict';
  function report(m) { try { fetch('/PROBE/' + encodeURIComponent(m)); } catch (e) {} }
  function btn(re) { return Array.from(document.querySelectorAll('button')).find(b => re.test((b.textContent || '').replace(/\s+/g, ''))); }
  setTimeout(() => {
    const root = document.getElementById('root');
    report('BOOT root=' + (root ? root.children.length : -1) + ' buttons=' + document.querySelectorAll('button').length);
    const s = btn(/开始经营/);
    report('START=' + (s ? 'yes' : 'no'));
    if (s) s.click();
    setTimeout(() => {
      report('GAME ok=' + (document.getElementById('container') ? 'yes' : 'no'));
      document.title = 'DONE';
    }, 5000);
  }, 3000);
})();
