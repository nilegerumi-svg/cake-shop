// js/host/monitor/error-ui.js
(function () {
    'use strict';

    let overlayEl = null;
    const errorCounts = new Map();

    function ensureOverlay() {
        if (overlayEl && overlayEl.isConnected) return;
        let existing = document.getElementById('error-overlay');
        if (existing) {
            overlayEl = existing;
            return;
        }
        overlayEl = document.createElement('div');
        overlayEl.id = 'error-overlay';
        // 样式直接写这里，或者在 css 里写
        overlayEl.style.cssText = 'display:none; position:fixed; top:0; left:0; right:0; max-height:40vh; overflow:auto; z-index:999999; background:rgba(220,38,38,0.95); color:#fff; font:12px/1.5 monospace; padding:10px; word-break:break-all; pointer-events:none;';
        (document.body || document.documentElement).appendChild(overlayEl);
    }

    window.CakeMonitorUI = {
        showError: function (msg) {
            ensureOverlay();
            overlayEl.style.display = 'block';

            const text = String(msg || '未知错误');
            const existing = errorCounts.get(text);
            if (existing && existing.el.isConnected) {
                existing.count++;
                existing.el.textContent = `🚨 系统异常: ${text} (×${existing.count})`;
                return;
            }
            
            const div = document.createElement('div');
            div.style.cssText = 'border-bottom:1px solid #fff; padding:5px 0;';
            div.textContent = '🚨 系统异常: ' + text;
            overlayEl.appendChild(div);
            errorCounts.set(text, { el: div, count: 1 });
        }
    };
})();
