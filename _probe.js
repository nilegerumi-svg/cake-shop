(function () {
  'use strict';
  function report(m) { try { fetch('/PROBE/' + encodeURIComponent(m)); } catch (e) {} }
  function btn(re) { return Array.from(document.querySelectorAll('button')).find(b => re.test((b.textContent || '').replace(/\s+/g, ''))); }
  function closeModals() {
    document.querySelectorAll('.modal-sheet, [class*="modal"]').forEach(s => {
      for (const b of s.querySelectorAll('button')) {
        const t = (b.textContent || '').trim();
        const a = b.getAttribute('aria-label') || '';
        if (t === '✕' || t === '×' || /关闭|close/i.test(t) || /关闭|close/i.test(a)) { try { b.click(); } catch (e) {} }
      }
    });
  }
  function vframe() { const fs = Array.from(document.querySelectorAll('iframe')).filter(f => f.offsetWidth > 0); return fs.length ? fs[fs.length - 1] : null; }
  function vdoc() { try { const f = vframe(); return f && f.contentDocument; } catch (e) { return null; } }
  function fbtn(re) {
    const d = vdoc(); if (!d) return null;
    return Array.from(d.querySelectorAll('button, [role="button"]')).find(b => re.test((b.textContent || '').replace(/\s+/g, ' ')));
  }
  function status() {
    const top = document.querySelector('.top-bar') || document.body;
    return (top.innerText || '').replace(/\s+/g, ' ').slice(0, 70);
  }
  setTimeout(() => {
    const s = btn(/开始经营/);
    if (s) s.click();
    setTimeout(closeModals, 3500);
    setTimeout(() => {
      report('T0 ' + status());
      // 1) 订购：点第一个 +1
      const tab = Array.from(document.querySelectorAll('.tab-item'))[1];
      if (tab) tab.click();
      setTimeout(() => {
        const b1 = fbtn(/\+1/);
        let n = 0;
        for (let i = 0; i < 5 && b1; i++) { try { b1.click(); n++; } catch (e) {} }
        report('ORDERED ' + n);
        // 2) 回小楼
        const home = Array.from(document.querySelectorAll('.tab-item'))[0];
        if (home) home.click();
        setTimeout(() => {
          // 3) 开店营业
          const open = fbtn(/开店营业/);
          if (open) open.click();
          report('OPEN=' + (open ? 'yes' : 'no'));
          // 4) 休息 10 天
          let d = 0;
          function rest() {
            if (d >= 10) { report('DONE ' + status()); document.title = 'PLAY-DONE'; return; }
            const r = btn(/休息一天/);
            if (!r) { report('NO-REST ' + d); document.title = 'PLAY-DONE'; return; }
            r.click(); d++;
            setTimeout(() => { if (d % 3 === 0) report('D' + d + ' ' + status()); rest(); }, 1100);
          }
          setTimeout(rest, 1500);
        }, 2500);
      }, 2500);
    }, 5000);
  }, 3000);
})();
