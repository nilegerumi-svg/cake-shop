// js/pages/home/index.js

import { renderHome } from './view.js';
import { bindEvents } from './events.js';

(() => {
    'use strict';
    console.log('🏠 主页脚本开始运行...');

    let retryCount = 0;

    const init = () => {
        // 实时去父页面找 Game 对象
        const G = window.parent.Game || window.Game;

        // 🚨 核心修改：不仅要有 G，还要等数据 (state) 和 渲染器 (initPage) 都就绪！
        if (!G || !G.state || typeof G.initPage !== 'function') {
            if (retryCount < 50) { // 延长到 50 次（约 5 秒），防止手机网络慢
                retryCount++;
                setTimeout(init, 100);
            } else {
                document.getElementById('content').innerHTML = `
                    <div style="color:red; padding:20px; text-align:center;">
                        ❌ 游戏引擎加载超时！<br>
                        请检查父页面的 main.js 或 render.js 是否报错。
                    </div>`;
            }
            return;
        }

        // 🌟 只有完全就绪了，才执行绑定和渲染
        console.log('✅ 引擎和数据完全就绪，开始渲染主页');
        bindEvents();
        G.initPage('home', renderHome);
    };

    // 启动等待
    init();
})();
