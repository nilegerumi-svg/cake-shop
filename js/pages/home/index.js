// js/pages/home/index.js
import { renderHome } from './view.js';
import { bindEvents } from './events.js';

(() => {
    'use strict';

    console.log('🏠 [Home] 主页脚本开始运行...');

    const contentEl = document.getElementById('content');
    if (!contentEl) {
        console.error('❌ [Home] 未找到 #content');
        return;
    }

    /* =========================================================
     * 一、握手协议（迁移自 pages/home.html 内联脚本）
     * 发送：{ type: 'home-ready', bubble: true }
     * 回执：{ type: 'home-ready-ack' }（由父页面 monitor.js 回）
     * ========================================================= */
    const MSG = { type: 'home-ready', bubble: true };
    const ACK_TYPE = 'home-ready-ack';

    const EVT_ACKED  = 'home-ready-acked';
    const EVT_FAILED = 'home-ready-failed';

    const RETRY_DELAYS = [150, 400, 900, 1800, 3600];
    const ACK_TIMEOUT = 1500;

    let stopped = true;
    let retryIndex = 0;
    let timer = null;
    let generation = 0;

    const targets = new Set();

    const opaque = (
        location.origin === 'null' ||
        location.protocol === 'file:' ||
        location.protocol === 'data:' ||
        location.protocol === 'blob:'
    );

    const isSameOrigin = (win) => {
        try { void win.location.href; return true; }
        catch (_) { return false; }
    };

    const originFor = (win) => {
        if (!opaque && isSameOrigin(win)) return location.origin;
        return '*';
    };

    const resolveTargets = () => {
        targets.clear();
        if (window.parent && window.parent !== window) {
            targets.add(window.parent);
        }
    };

    const clearTimer = () => {
        if (timer) { clearTimeout(timer); timer = null; }
    };

    const send = () => {
        if (stopped) return;

        for (const win of Array.from(targets)) {
            try {
                if (win.closed) { targets.delete(win); continue; }
            } catch (_) {
                targets.delete(win);
                continue;
            }
            try {
                win.postMessage(MSG, originFor(win));
            } catch (e) {
                console.warn('[home-ready] postMessage failed, drop target', e);
                targets.delete(win);
            }
        }

        if (targets.size === 0) {
            fail('no-target');
            return;
        }

        clearTimer();
        timer = setTimeout(() => {
            timer = null;
            if (!stopped) scheduleRetry();
        }, ACK_TIMEOUT);
    };

    const scheduleRetry = () => {
        if (stopped) return;
        if (retryIndex >= RETRY_DELAYS.length) {
            fail('retries-exhausted');
            return;
        }
        const delay = RETRY_DELAYS[retryIndex++];
        clearTimer();
        timer = setTimeout(() => {
            timer = null;
            if (!stopped) send();
        }, delay);
    };

    const isKnownSource = (src) => {
        if (!src) return false;
        for (const win of targets) if (win === src) return true;
        return false;
    };

    const onMessage = (e) => {
        if (!e.data || e.data.type !== ACK_TYPE) return;
        if (!isKnownSource(e.source)) return;
        if (!opaque && isSameOrigin(e.source) && e.origin !== location.origin) return;

        stop('acked');
        try {
            window.dispatchEvent(new CustomEvent(EVT_ACKED, { detail: { generation } }));
        } catch (_) {}
    };

    const fail = (reason) => {
        stop(reason);
        try {
            window.dispatchEvent(new CustomEvent(EVT_FAILED, { detail: { reason, generation } }));
        } catch (_) {}
    };

    const stop = (reason) => {
        if (stopped) return;
        stopped = true;
        clearTimer();
        window.removeEventListener('message', onMessage);
        try {
            window.dispatchEvent(new CustomEvent('home-ready-stopped', {
                detail: { reason, generation }
            }));
        } catch (_) {}
    };

    const startHandshake = () => {
        clearTimer();
        stopped = false;
        retryIndex = 0;
        generation += 1;

        resolveTargets();
        if (targets.size === 0) {
            stopped = true;
            return;
        }

        window.removeEventListener('message', onMessage);
        window.addEventListener('message', onMessage);
        send();
    };

    /* =========================================================
     * 二、轮询父页面引擎
     * 引擎就绪后：bindEvents + G.initPage('home', renderHome)
     * ========================================================= */
    const MAX_TRIES = 200;      // 200 × 100ms = 20s
    const POLL_INTERVAL = 100;

    let tries = 0;
    let booted = false;

    const getEngine = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Game) {
                return window.parent.Game;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Game || null;
    };

    const waitEngine = () => {
        if (booted) return;

        const G = getEngine();

        if (G && G.state && typeof G.initPage === 'function') {
            booted = true;
            console.log('✅ [Home] 引擎就绪，开始渲染主页');

            // 绑定事件委托（内部有 dataset.bound 幂等保护）
            try { bindEvents(); } catch (err) {
                console.error('❌ [Home] bindEvents 失败:', err);
            }

            // 交给父页面统一渲染：header / nav / footer + iframe content
            try {
                G.initPage('home', renderHome);
            } catch (err) {
                console.error('❌ [Home] initPage 失败:', err);
                contentEl.innerHTML = `<div class="render-error">❌ 主页初始化失败：${err && err.message || err}</div>`;
            }
            return;
        }

        if (++tries >= MAX_TRIES) {
            console.error('❌ [Home] 等待父页面 Game 超时');
            contentEl.innerHTML = `
                <div class="render-error">
                    ❌ 游戏引擎加载超时，请检查父页面 main.js 是否报错，或刷新重试。
                </div>`;
            return;
        }

        setTimeout(waitEngine, POLL_INTERVAL);
    };

    /* =========================================================
     * 三、生命周期
     * ========================================================= */
    window.addEventListener('pagehide', () => {
        stop('pagehide');
    });

    window.addEventListener('pageshow', (e) => {
        if (!e.persisted) return;
        // bfcache 恢复：重握手 + 重轮询
        tries = 0;
        booted = false;
        startHandshake();
        waitEngine();
    });

    /* =========================================================
     * 四、启动
     * ========================================================= */
    startHandshake();
    waitEngine();

    // 调试钩子
    window.HomePage = {
        startHandshake,
        reRender: () => {
            const G = getEngine();
            if (G && G.state && typeof G.refreshPage === 'function') {
                G.refreshPage();
            }
        },
    };
})();
