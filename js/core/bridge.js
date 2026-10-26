// js/core/bridge.js
window.Cake = window.Cake || {};

(function () {
    var inIframe = window.parent !== window;
    var instanceId = (inIframe ? 'f:' : 'h:') +
                     Math.random().toString(36).slice(2, 10) +
                     Date.now().toString(36);
    var listeners = [];
    var hostBroadcaster = null;

    window.addEventListener('message', function (e) {
        if (e.source !== window.parent) return;
        var msg = e.data;
        if (!msg || typeof msg !== 'object' || !msg.type) return;
        if (msg.sourceId && msg.sourceId === instanceId) return;
        for (var i = 0; i < listeners.length; i++) {
            try { listeners[i](msg); } catch (err) {
                if (window.console) console.error('[bridge] listener error', err);
            }
        }
    });

    function postToHost(type, payload) {
        if (!inIframe) return false;
        try {
            window.parent.postMessage(
                Object.assign({ type: type, sourceId: instanceId }, payload || {}), '*');
            return true;
        } catch (_) { return false; }
    }

    function onHostMessage(fn) {
        if (typeof fn === 'function') listeners.push(fn);
    }

    function setHostBroadcaster(fn) { hostBroadcaster = fn; }

    function notifyStateChanged() {
        if (inIframe) {
            postToHost('state-changed');
        } else if (hostBroadcaster) {
            try { hostBroadcaster(instanceId); } catch (_) {}
        }
    }

    window.Cake.bridge = {
        inIframe: inIframe,
        instanceId: instanceId,
        postToHost: postToHost,
        onHostMessage: onHostMessage,
        setHostBroadcaster: setHostBroadcaster,
        notifyStateChanged: notifyStateChanged
    };
})();
