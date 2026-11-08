// js/host/rainbow-filter.js
// 注入七色分层滤镜（每层 opacity .15，赤橙黄绿青蓝紫）
(function () {
    'use strict';
    if (window.__rainbowFilterInstalled) return;
    window.__rainbowFilterInstalled = true;

    function mount() {
        if (document.querySelector('.rainbow-filter')) return;
        var wrap = document.createElement('div');
        wrap.className = 'rainbow-filter';
        wrap.setAttribute('aria-hidden', 'true');
        for (var i = 0; i < 7; i++) wrap.appendChild(document.createElement('span'));
        document.body.appendChild(wrap);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, { once: true });
    } else {
        mount();
    }

    // 提供开关：window.rainbowFilter(true/false)
    window.rainbowFilter = function (on) {
        document.documentElement.classList.toggle('no-rainbow-filter', !on);
    };
})();
