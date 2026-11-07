// js/actions/system.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // 统一的报错返回
    Cake.fail = function (msg) {
        if (Cake.addLog) Cake.addLog(msg, 'error');
        return { success: false, message: msg };
    };

    // 统一的成功提示
    Cake.success = function (msg) {
        if (Cake.addLog) Cake.addLog(msg, 'success');
        return { success: true, message: msg };
    };

    // 日志系统（后续接入 UI）
    if (!Cake.addLog) {
        Cake.addLog = function (msg, type = 'info') {
            console.log(`[LOG][${type}] ${msg}`);
        };
    }

    // 刷新引擎（后续接入 UI）
    if (!Cake.refreshPage) {
        Cake.refreshPage = function () {
            console.log('🔄 [System] 触发 UI 刷新');
        };
    }
})();
