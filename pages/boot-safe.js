(function () {
    'use strict';

    function getCake() {
        if (window.parent && window.parent !== window) {
            return window.parent.Cake || window.Cake || null;
        }
        return window.Cake || null;
    }

    function showFatalError(message, targetId = 'content') {
        const box = document.getElementById(targetId);
        if (!box) return;
        box.innerHTML = `
            <div style="
                background:#ff4d4f;
                color:white;
                border-radius:12px;
                padding:20px;
                font-family:monospace;
                font-size:14px;
                line-height:1.6;
                word-break:break-all;
                box-shadow:0 4px 15px rgba(255,77,79,0.3);
                margin:20px;
            ">
                <h3 style="margin:0 0 8px 0;">🚨 致命错误</h3>
                <div>${message}</div>
            </div>
        `;
    }

    function waitForCake(onReady, opts = {}) {
        const {
            timeout = 15000,
            interval = 100,
            required = (Cake) => !!(Cake && Cake.store && Cake.store.state),
            onTimeout = null,
            targetId = 'content'
        } = opts;

        const startedAt = Date.now();

        function tick() {
            const Cake = getCake();
            if (required(Cake)) {
                onReady(Cake);
                return;
            }

            if (Date.now() - startedAt >= timeout) {
                const msg = onTimeout ? onTimeout() : '游戏引擎或数据未加载完成，请刷新页面重试。';
                showFatalError(msg, targetId);
                return;
            }

            setTimeout(tick, interval);
        }

        tick();
    }

    window.safePageBoot = {
        getCake,
        showFatalError,
        waitForCake
    };
})();
