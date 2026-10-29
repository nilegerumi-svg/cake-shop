// js/pages/error-handler.js
(function () {
    'use strict';

    function sendToParent(msg) {
        try {
            // 直接通过 postMessage 甩给父页面
            window.parent.postMessage({
                type: 'page-error', // 约定的错误事件类型
                msg: msg,
                time: Date.now()
            }, '*');
        } catch (_) {}
    }

    // 1. 捕获同步 JS 报错
    window.addEventListener('error', (e) => {
        sendToParent(e.message || '子页面未知脚本错误');
    }, true);

    // 2. 捕获 Promise 异步报错
    window.addEventListener('unhandledrejection', (e) => {
        sendToParent(e.reason?.message || String(e.reason) || '子页面未处理的 Promise 异常');
    });
})();
