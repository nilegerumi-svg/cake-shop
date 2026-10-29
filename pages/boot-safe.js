(function () {
    'use strict';

    function getCake() {
        return window.parent.Cake || window.Cake || null;
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
            timeout = 10000,
            interval = 100,
            onTimeout = null,
            required = (Cake) => !!(Cake && Cake.store && Cake.store.state),
            targetId = 'content'
        } = opts;

        let count = 0;
        const start = Date.now();

        function tick() {
            const Cake = getCake();
            if (required(Cake)) {
                onReady(Cake);
                return;
            }

            count++;
            if (Date.now() - start >= timeout) {
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
