(function () {
    'use strict';

    function getCake() {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) {}
        return window.Cake || null;
    }

    async function ensureCakeRuntime() {
        const existing = getCake();
        if (existing && existing.store && existing.store.state) {
            return existing;
        }

        try {
            const coreEntry = new URL('../../js/core/index.js', window.location.href).href;
            await import(coreEntry);
        } catch (err) {
            console.warn('[boot-safe] fallback import core/index.js failed:', err);
        }

        const next = getCake();
        if (next && next.store && next.store.state) {
            return next;
        }
        return null;
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

    // 引擎是否仍在加载中（初始化中 / 文件进度仍在变动）：
    // 此时不应判定"超时"，避免正常加载被误报致命错误
    function engineStillLoading() {
        try {
            const tops = window === window.top ? window : window.top;
            const state = tops.__engineState;
            if (state === 'INITIALIZING') return true;
            const info = tops.__loadInfo;
            if (info && Number.isFinite(info.total) && info.total > 0) {
                if (info.done < info.total) return true;
            }
            return false;
        } catch (_) { return false; }
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
        let settled = false;

        const tick = async () => {
            if (settled) return;

            const Cake = getCake();
            if (required(Cake)) {
                settled = true;
                onReady(Cake);
                return;
            }

            if (Date.now() - startedAt >= timeout) {
                // 引擎仍在加载（初始化中 / 文件进度变动中）不算超时，继续等待
                if (engineStillLoading()) {
                    setTimeout(() => { tick(); }, interval);
                    return;
                }

                const fallback = await ensureCakeRuntime();
                if (required(fallback)) {
                    settled = true;
                    onReady(fallback);
                    return;
                }

                const msg = onTimeout ? onTimeout() : '游戏引擎或数据未加载完成，请刷新页面重试。';
                showFatalError(msg, targetId);
                settled = true;
                return;
            }

            setTimeout(() => { tick(); }, interval);
        };

        tick();
    }

    window.safePageBoot = {
        getCake,
        ensureCakeRuntime,
        showFatalError,
        waitForCake
    };
})();
