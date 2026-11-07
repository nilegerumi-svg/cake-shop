// js/host/swipe.js — 滑动切换底部标签（父页面手势）
(function () {
    'use strict';
    if (window.__cakeSwipeInstalled) return;
    window.__cakeSwipeInstalled = true;

    const THRESHOLD = 55;      // 水平位移阈值
    const RATIO = 1.4;         // 水平/垂直比例，避免误触纵向滚动
    const IGNORE = 'input,textarea,select,button,a,[role="button"],[contenteditable="true"]';

    let sx = 0, sy = 0, tracking = false, moved = false;

    const tabs = () => Array.from(document.querySelectorAll('.tab-bar .tab-item'));
    const activeIndex = (list) => list.findIndex((el) => el.classList.contains('active'));

    function switchTab(dir) {
        const list = tabs();
        if (list.length < 2) return;
        let i = activeIndex(list);
        if (i < 0) i = 0;
        const next = (i + dir + list.length) % list.length;
        const btn = list[next];
        if (btn) {
            try { btn.click(); } catch (_) {}
        }
    }

    document.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) { tracking = false; return; }
        const t = e.target;
        if (t && t.closest && t.closest(IGNORE)) { tracking = false; return; }
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        tracking = true;
        moved = false;
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (!tracking || e.touches.length !== 1) return;
        const dx = Math.abs(e.touches[0].clientX - sx);
        const dy = Math.abs(e.touches[0].clientY - sy);
        if (dx > 12 && dx > dy) { moved = true; }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!tracking) return;
        tracking = false;
        const t = e.changedTouches && e.changedTouches[0];
        if (!t) return;
        const dx = t.clientX - sx;
        const dy = t.clientY - sy;
        if (Math.abs(dx) < THRESHOLD) return;
        if (Math.abs(dx) < Math.abs(dy) * RATIO) return;   // 偏纵向滑动手势，交给滚动
        if (!moved) return;
        switchTab(dx < 0 ? 1 : -1);   // 左滑 → 下一个标签；右滑 → 上一个
    }, { passive: true });

    // 键盘：Alt+←/→ 也能切换标签（无障碍）
    document.addEventListener('keydown', (e) => {
        if (!e.altKey) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); switchTab(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); switchTab(1); }
    });
})();
