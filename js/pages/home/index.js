// js/pages/home/index.js

import { renderHome } from './view.js';
import { bindEvents } from './events.js';

(() => {
    'use strict';
    const G = window.parent.Game || window.Game;

    if (!G) {
        document.getElementById('content').innerHTML = '<div style="color:red; padding:20px;">页面初始化失败: 缺少 Game 对象</div>';
        return;
    }

    // 绑定事件
    bindEvents();

    // 交给父页面的渲染引擎接管
    if (typeof G.initPage === 'function') {
        G.initPage('home', renderHome);
    }
})();
