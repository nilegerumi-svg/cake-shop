// js/host/rainbow-filter.js
// 按卡片嵌套层级分配彩虹层：最外 = 赤(1) → 最内 = 紫(7)
(function () {
    'use strict';
    if (window.__rainbowFilterInstalled) return;
    window.__rainbowFilterInstalled = true;

    var CARD_SEL = '.game-card, [class*="game-card"], .rounded-xl, [class*="rounded-xl"]';

    function depthOf(el) {
        var d = 0, p = el.parentElement;
        while (p) {
            try { if (p.matches && p.matches(CARD_SEL)) d++; } catch (e) {}
            p = p.parentElement;
        }
        return d + 1; // 自己算第 1 层
    }

    function apply(root) {
        var doc = root || document;
        var list;
        try { list = doc.querySelectorAll(CARD_SEL); } catch (e) { return; }
        for (var i = 0; i < list.length; i++) {
            var el = list[i];
            var d = depthOf(el);
            if (d > 7) d = 7; // 最多 7 层（紫）
            for (var k = 1; k <= 7; k++) el.classList.remove('rainbow-depth-' + k);
            el.classList.add('rainbow-depth-' + d);
        }
    }

    function applyAll() {
        apply(document);
        var frames = document.querySelectorAll('iframe');
        for (var i = 0; i < frames.length; i++) {
            try {
                var d = frames[i].contentDocument;
                if (d && d.body) apply(d);
            } catch (e) {}
        }
    }

    // 定时重扫（面板切换会新建 iframe / 重渲染卡片）
    setInterval(applyAll, 1500);
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAll, { once: true });
    } else {
        applyAll();
    }

    // 开关
    window.rainbowFilter = function (on) {
        document.documentElement.classList.toggle('no-rainbow-filter', !on);
    };
})();
