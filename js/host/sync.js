// js/host/sync.js
(() => {
    'use strict';

    const frames = [
        document.getElementById('mainFrame'),
        document.getElementById('logFrame')
    ].filter(Boolean);

    const targetOrigin = (location.origin === 'null' ? '*' : location.origin);

    const handleStateChanged = (sourceId) => {
        const Cake = window.Cake;
        if (!Cake || !Cake.store) return;

        try {
            if (typeof Cake.loadStateFromStorage === 'function') {
                const loaded = Cake.loadStateFromStorage();
                if (loaded) Cake.store.state = loaded;
            }
        } catch (err) {
            console.warn('[host] load state failed', err);
        }

        try {
            if (typeof Cake.renderHeader === 'function') Cake.renderHeader();
            if (typeof Cake.renderNav === 'function') Cake.renderNav();
            if (typeof Cake.renderFooter === 'function') Cake.renderFooter();
        } catch (err) {
            console.warn('[host] render failed', err);
        }

        const msg = { type: 'state-sync', sourceId };
        for (const f of frames) {
            try { f.contentWindow.postMessage(msg, targetOrigin); } catch (_) {}
        }
    };

    const registerBroadcaster = () => {
        const bridge = window.Cake && window.Cake.bridge;
        if (bridge && typeof bridge.setHostBroadcaster === 'function') {
            bridge.setHostBroadcaster(handleStateChanged);
            return true;
        }
        return false;
    };

    if (!registerBroadcaster()) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', registerBroadcaster, { once: true });
        } else {
            setTimeout(registerBroadcaster, 0);
        }
    }
})();
