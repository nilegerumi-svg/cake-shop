// js/core/bridge.js — 只给父页面(game.html)用
window.Cake = window.Cake || {};
(function () {
    var inIframe = window.parent !== window;
    if (inIframe) return; // 子页面走 state.js 的兜底实现
    if (window.Cake.bridge && window.Cake.bridge.__host) return;

    var instanceId = 'h:' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
    var hostBroadcaster = null;

    window.addEventListener('message', function (e) {
        var msg = e.data;
        if (!msg || typeof msg !== 'object') return;
        if (msg.type !== 'state-changed') return;
        // 只接受自己 iframe 发来的
        if (!e.source || e.source.parent !== window) return;
        if (hostBroadcaster) {
            try { hostBroadcaster(msg.sourceId); } catch (_) {}
        }
    });

    window.Cake.bridge = {
        __host: true,
        inIframe: false,
        instanceId: instanceId,
        onStateChanged: function () {},           // 父页面不监听
        setHostBroadcaster: function (fn) { hostBroadcaster = fn; },
        notifyStateChanged: function () {
            if (hostBroadcaster) {
                try { hostBroadcaster(instanceId); } catch (_) {}
            }
        }
    };
})();
