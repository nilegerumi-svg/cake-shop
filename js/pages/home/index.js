// js/pages/home/index.js

import { renderHome } from './view.js';
import { bindEvents } from './events.js';

(() => {
    'use strict';

    const boot = () => {
        const G = window.parent.Game || window.Game;
        
        if (!G) {
            // 如果父页面还没准备好，等 100 毫秒再试，最多试 10 次
            let retries = 0;
            const timer = setInterval(() => {
                const G_retry = window.parent.Game || window.Game;
                if (G_retry) {
                    clearInterval(timer);
                    init(G_retry);
                } else if (++retries > 10) {
                    clearInterval(timer);
                    document.getElementById('content').innerHTML = '<div style="color:red; padding:20px;">初始化超时: 无法获取 Game 对象</div>';
                }
            }, 100);
            return;
        }
        
        init(G);
    };

    const init = (G) => {
        bindEvents();
        if (typeof G.initPage === 'function') {
            G.initPage('home', renderHome);
        } else {
            document.getElementById('content').innerHTML = '<div style="color:red; padding:20px;">缺少 initPage 渲染方法</div>';
        }
    };

    boot();
})();
