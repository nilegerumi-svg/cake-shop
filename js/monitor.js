// js/monitor.js — 兼容存根
// 真正的启动器是根目录 ../monitor.js。
// 本文件不再重复实现，只负责委托，避免两份逻辑漂移。
// ⚠️ 开始页（index.html）不要加载本文件，它只用于 game.html 之类的游戏外壳。
(function () {
    'use strict';

    if (window.__rootMonitorLoaded || window.__jsMonitorStubLoaded) return;
    window.__jsMonitorStubLoaded = true;

    // 开始页防御：绝不加载启动器
    if (document.querySelector('.start-card') || document.getElementById('btnStart')) {
        console.log('📄 [js/monitor.js] 开始页环境，跳过启动器加载');
        return;
    }

    let src;
    try { src = new URL('../monitor.js', document.baseURI).href; }
    catch (_) { src = '../monitor.js'; }

    console.log('🛡️ [js/monitor.js] 委托到根目录启动器:', src);
    const s = document.createElement('script');
    s.src = src;
    s.onerror = function () {
        console.error('❌ [js/monitor.js] 根目录 monitor.js 加载失败');
        if (window.appLoadingFail) window.appLoadingFail('启动器加载失败，请刷新重试');
    };
    document.head.appendChild(s);
})();
