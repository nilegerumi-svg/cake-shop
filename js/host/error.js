// js/host/error.js
(function () {
    'use strict';
    window.addEventListener('error', function (event) {
        console.error('💥 [Host/Error] 捕获到全局错误:', event.message);
        // 可以在这里弹个提示框，或者上报给后台
        alert(`哎呀，烤炉好像炸了！(错误信息: ${event.message})`);
    });
    
    window.addEventListener('unhandledrejection', function (event) {
        console.error('💥 [Host/Error] 未处理的 Promise 错误:', event.reason);
    });
})();
