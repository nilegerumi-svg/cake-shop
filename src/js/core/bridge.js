// js/core/bridge.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};
    const Cake = window.Cake;

    const inIframe = window.parent !== window;

    // ==========================================
    // 模式一：子页面（iframe 内部）
    // ==========================================
    if (inIframe) {
        if (Cake.bridge && Cake.bridge.__client) return;

        // 子页面的广播器：发送消息给父页面
        Cake.emit = function (eventName, data = {}) {
            window.parent.postMessage({
                type: 'CAKE_EVENT',
                event: eventName,
                data: data
            }, '*');
        };

        Cake.bridge = {
            __client: true,
            inIframe: true,
            emit: Cake.emit
        };
        
        console.log('🌉 [Bridge] 子页面通信桥接装载完毕');
        return; // 子页面不执行下面的父页面逻辑
    }

    // ==========================================
    // 模式二：父页面（主框架）
    // ==========================================
    if (Cake.bridge && Cake.bridge.__host) return;

    const instanceId = `h:${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
    
    // 监听所有子页面发来的消息
    window.addEventListener('message', (e) => {
        const msg = e.data;
        if (!msg || typeof msg !== 'object' || msg.type !== 'CAKE_EVENT') return;

        // 处理 UI 刷新事件
        if (msg.event === 'refresh_ui') {
            if (typeof Cake.renderAll === 'function') {
                Cake.renderAll();
            }
        }
        
        // 如果你有其他事件（比如弹出提示），可以在这里继续写 if (msg.event === 'xxx')
    });

    // 父页面自己的事件触发机制（比如主页面点按钮时也能触发刷新）
    window.dispatchEventEvent = function(eventName, data) {
        if (eventName === 'refresh_ui' && typeof Cake.renderAll === 'function') {
            Cake.renderAll();
        }
    };

    Cake.emit = function (eventName, data = {}) {
        window.dispatchEventEvent(eventName, data);
    };

    Cake.bridge = {
        __host: true,
        inIframe: false,
        instanceId,
        emit: Cake.emit
    };

    console.log('🌉 [Bridge] 父页面通信总线装载完毕');
})();
