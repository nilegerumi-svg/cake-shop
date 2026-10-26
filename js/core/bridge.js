// js/core/bridge.js — 只给父页面(game.html)用
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    const inIframe = window.parent !== window;
    if (inIframe) return; // 子页面走 state.js 的兜底实现

    if (Cake.bridge && Cake.bridge.__host) return;

    const instanceId = `h:${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
    let hostBroadcaster = null;

    window.addEventListener('message', (e) => {
        const msg = e.data;
        if (!msg || typeof msg !== 'object') return;
        if (msg.type !== 'state-changed') return;

        // 只接受自己 iframe 发来的
        if (!e.source || e.source.parent !== window) return;

        if (hostBroadcaster) {
            try { hostBroadcaster(msg.sourceId); } catch (_) { /* ignore */ }
        }
    });

    Cake.bridge = {
        __host: true,
        inIframe: false,
        instanceId,
        onStateChanged: () => {},                   // 父页面不监听
        setHostBroadcaster: (fn) => { hostBroadcaster = fn; },
        notifyStateChanged: () => {
            if (hostBroadcaster) {
                try { hostBroadcaster(instanceId); } catch (_) { /* ignore */ }
            }
        },
    };
})();
