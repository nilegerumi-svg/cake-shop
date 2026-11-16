// js/host/swipe.js — 统一触摸手势：左右滑动切换底部标签
// 体系说明见 docs/已知问题与修复.md「触摸体系修正」。
// 关键：游戏主内容渲染在 panel-frame iframe 里，而 iframe 是独立文档、
// 触摸事件不会冒泡到外壳。旧版只挂父 document，导致内容区滑动切页形同虚设，
// 故这里对每个可见 iframe 的 contentDocument 也挂一份（同源，可直接访问）。
// 与 panel-autofit.js 的分工：本块只认「明显横向」手势并切页，
// 纵向滚动交给软件滚动管线；两者共享同一套阈值常量，互不抢手势。
(function () {
    'use strict';
    if (window.__cakeSwipeInstalled) return;
    window.__cakeSwipeInstalled = true;

    var THRESHOLD = 55;      // 触发切页的水平位移（px）
    var RATIO = 1.4;         // 水平/垂直比例，低于此值视为纵向滚动
    var EDIT = 'input, textarea, select, [contenteditable="true"], [contenteditable=""]';

    // 只认主导航（手机 App 的 5 项）。小镇视图的底部栏是 4 个「动作」按钮
    // （手机 / 随身携带 / 回小楼），滑动误触代价大，故不参与切页。
    // tab-fate 是 C2 清理后的占位：点它只会开手机 App、永不激活面板，
    // 若算进循环，玩家左滑经过「订购」后会永远卡住，必须跳过。
    function tabs() {
        var bar = document.querySelector('nav.tab-bar[data-testid="tab-bar"]');
        if (!bar) return [];
        return Array.prototype.filter.call(bar.querySelectorAll('.tab-item'), function (el) {
            return (el.getAttribute('data-testid') || '') !== 'tab-fate';
        });
    }
    function activeIndex(list) {
        for (var i = 0; i < list.length; i++) if (list[i].classList.contains('active')) return i;
        return -1;
    }
    function switchTab(dir) {
        var list = tabs();
        if (list.length < 2) return;
        var i = activeIndex(list);
        if (i < 0) i = 0;
        var btn = list[(i + dir + list.length) % list.length];
        if (btn) { try { btn.click(); } catch (_) {} }
    }
    window.__cakeSwitchTab = switchTab;   // 供语音 / 其它桥复用，避免重复实现

    // 滑动结束后浏览器仍会向起手元素补发一次 click。切页成功后必须吞掉它，
    // 否则「滑到下一页」会顺手把起手处那个按钮也点掉。
    // 注意顺序：switchTab() 里的 btn.click() 是同步派发，必须先执行再装拦截。
    function suppressNextClick(doc) {
        var kill = function (ev) {
            try { ev.preventDefault(); ev.stopPropagation(); } catch (_) {}
            doc.removeEventListener('click', kill, true);
        };
        doc.addEventListener('click', kill, true);
        setTimeout(function () { doc.removeEventListener('click', kill, true); }, 350);
    }

    function attach(doc) {
        if (!doc || doc.__cakeSwipeDoc) return;
        doc.__cakeSwipeDoc = true;
        var sx = 0, sy = 0, tracking = false, moved = false;

        doc.addEventListener('touchstart', function (e) {
            // PC 鼠标桥（panel-autofit.js）合成的事件只用于滚动，不参与切页
            if (e.__tmSynth) { tracking = false; return; }
            if (e.touches.length !== 1) { tracking = false; return; }
            var t = e.target;
            // 编辑控件让路：光标定位、选中文本、长按粘贴菜单都要保留
            if (t && t.closest && t.closest(EDIT)) { tracking = false; return; }
            // 不再一刀切忽略 button / [role=button]：游戏内容区几乎全是按钮，
            // 旧版从按钮上起手直接 tracking=false，手势根本走不到判定。
            // 改为「滑动优先、点击兜底」：位移不够阈值就什么也不做，click 正常生效。
            sx = e.touches[0].clientX;
            sy = e.touches[0].clientY;
            tracking = true;
            moved = false;
        }, { passive: true });

        doc.addEventListener('touchmove', function (e) {
            if (!tracking || e.__tmSynth || e.touches.length !== 1) return;
            var dx = Math.abs(e.touches[0].clientX - sx);
            var dy = Math.abs(e.touches[0].clientY - sy);
            if (dx > 12 && dx > dy * RATIO) moved = true;
        }, { passive: true });

        doc.addEventListener('touchend', function (e) {
            if (!tracking) return;
            tracking = false;
            if (e.__tmSynth) return;
            var t = e.changedTouches && e.changedTouches[0];
            if (!t) return;
            var dx = t.clientX - sx, dy = t.clientY - sy;
            if (Math.abs(dx) < THRESHOLD) return;
            if (Math.abs(dx) < Math.abs(dy) * RATIO) return;   // 偏纵向：交给滚动
            if (!moved) return;                                  // 位移是终点瞬移，不算手势
            switchTab(dx < 0 ? 1 : -1);   // 左滑 → 下一个标签；右滑 → 上一个
            suppressNextClick(doc);
        }, { passive: true });

        doc.addEventListener('touchcancel', function () { tracking = false; }, { passive: true });
    }

    function scan() {
        var fs = document.querySelectorAll('iframe[data-testid^="panel-frame-"]');
        for (var i = 0; i < fs.length; i++) {
            try {
                var d = fs[i].contentDocument;
                if (d && d.body) attach(d);
            } catch (_) {}
        }
    }
    attach(document);
    setInterval(scan, 400);
    window.addEventListener('pageshow', scan);

    // 键盘：Alt+←/→ 也能切换标签（无障碍）
    document.addEventListener('keydown', function (e) {
        if (!e.altKey) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); switchTab(-1); }
        else if (e.key === 'ArrowRight') { e.preventDefault(); switchTab(1); }
    });
})();
