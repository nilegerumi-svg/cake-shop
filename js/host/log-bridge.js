(function () {
    'use strict';

    if (window.__cakeLogBridgeInstalled) return;
    window.__cakeLogBridgeInstalled = true;

    const targetOrigin = (location.origin === 'null' ? '*' : location.origin);
    const logLevels = ['log', 'info', 'warn', 'error'];

    const safeStringify = (value) => {
        if (typeof value === 'string') return value;
        if (value instanceof Error) return `${value.name}: ${value.message}`;
        if (value === null) return 'null';
        if (value === undefined) return 'undefined';

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

    const formatArgs = (args) => args.map((a) => safeStringify(a)).join(' ');

    const nativeConsole = {};
    logLevels.forEach((lvl) => {
        const fn = console[lvl];
        nativeConsole[lvl] = typeof fn === 'function' ? fn.bind(console) : null;
    });

    const sendToFrame = (payload) => {
        const frame = document.getElementById('logFrame');
        if (!frame || !frame.contentWindow) {
            return false;
        }

        try {
            frame.contentWindow.postMessage(payload, targetOrigin);
            return true;
        } catch (_) {
            return false;
        }
    };

    const reportConsoleFailure = (err) => {
        try {
            if (nativeConsole.error) {
                nativeConsole.error.call(console, '[cake-log-bridge] native console call failed:', err);
            }
        } catch (_) {}
    };

    const sendLog = (msg, level = 'info') => {
        sendToFrame({
            type: 'log',
            level,
            time: Date.now(),
            msg: safeStringify(msg)
        });
    };

    window.sendLog = (msg, level = 'info') => sendLog(msg, level);
    window.clearLog = () => sendToFrame({ type: 'clear' });

    logLevels.forEach((lvl) => {
        const original = nativeConsole[lvl];

        console[lvl] = (...args) => {
            if (original) {
                try {
                    original.apply(console, args);
                } catch (err) {
                    reportConsoleFailure(err);
                }
            }

            try {
                const text = formatArgs(args);
                const mappedLevel = lvl === 'log' ? 'info' : lvl;

                sendToFrame({
                    type: 'log',
                    level: mappedLevel,
                    time: Date.now(),
                    msg: text
                });
            } catch (err) {
                reportConsoleFailure(err);
            }
        };
    });
})();
