// js/pages/home/index.js

// 1. 引入视图和事件
import { renderHome } from './view.js';
import { bindEvents } from './events.js';

// 2. (未来扩展) 如果你加了一个签到模块
// import { initSignIn } from './features/daily-signin.js';

(() => {
    'use strict';
    const G = window.parent.Game || window.Game;

    if (!G) {
        document.getElementById('content').innerHTML = '<div style="color:red; padding:20px;">页面初始化失败: 缺少 Game 对象</div>';
        return;
    }

    // 3. 绑定事件
    bindEvents();

    // 4. (未来扩展) 初始化签到
    // initSignIn();

    // 5. 交给父页面的渲染引擎接管
    if (typeof G.initPage === 'function') {
        G.initPage('home', renderHome);
    }
})();
