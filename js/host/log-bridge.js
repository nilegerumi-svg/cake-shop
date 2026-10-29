(function () {
    'use strict';

    if (window.__cakeLogBridgeInstalled) return;
    window.__cakeLogBridgeInstalled = true;

    const targetOrigin = (location.origin === 'null' ? '*' : location.origin);

    const safeStringify = (value) => {
        if (typeof value === 'string') return value;
        if (value instanceof Error) return `${value.name}: ${value.message}`;
        try {
            return JSON.stringify(value);
        } catch (_) {
            try {
                return String(value);
            } catch {
                return Object.prototype.toString.call(value);
            }
        }
    };

    const toLogFrame = (payload) => {
        const frame = document.getElementById('logFrame');
        if (!frame || !frame.contentWindow) return;
        try {
            frame.contentWindow.postMessage(payload, targetOrigin);
        } catch (_) {}
    };

    const sendLog = (msg, level = 'info') => {
        toLogFrame({
            type: 'log',
            level,
            time: Date.now(),
            msg: safeStringify(msg)
        });
    };

    window.sendLog = (msg, level = 'info') => sendLog(msg, level);
    window.clearLog = () => toLogFrame({ type: 'clear' });

    ['log', 'info', 'warn', 'error'].forEach((lvl) => {
        const original = console[lvl];
        console[lvl] = (...args) => {
            try {
                original.apply(console, args);
            } catch (_) {}

            try {
                const text = args
                    .map((a) => safeStringify(a))
                    .join(' ');

                toLogFrame({
                    type: 'log',
                    level: lvl === 'log' ? 'info' : lvl,
                    time: Date.now(),
                    msg: text
                });
            } catch (_) {}
        };
    });
})();
