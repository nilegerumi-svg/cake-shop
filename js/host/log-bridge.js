// js/host/log-bridge.js
(function () {
    'use strict';
    const targetOrigin = (location.origin === 'null' ? '*' : location.origin);
    const toLogFrame = (payload) => {
        const f = document.getElementById('logFrame');
        if (!f || !f.contentWindow) return;
        try { f.contentWindow.postMessage(payload, targetOrigin); } catch (_) {}
    };
    
    window.sendLog = (msg, level) => toLogFrame({ type: 'log', msg, level, time: Date.now() });
    window.clearLog = () => toLogFrame({ type: 'clear' });

    ['log', 'warn', 'error'].forEach((lvl) => {
        const orig = console[lvl];
        console[lvl] = (...args) => {
            orig.apply(console, args);
            try {
                toLogFrame({
                    type: 'log',
                    level: lvl === 'log' ? 'info' : lvl,
                    time: Date.now(),
                    msg: args.map(a => {
                        if (typeof a === 'string') return a;
                        try { return JSON.stringify(a); } catch { return String(a); }
                    }).join(' ')
                });
            } catch (_) {}
        };
    });
})();
