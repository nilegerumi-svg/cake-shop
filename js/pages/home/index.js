// js/pages/home/index.js
import { renderHome } from './view.js';
import { bindEvents } from './events.js';

(() => {
    'use strict';
    console.log('🏠 主页脚本开始运行...');

    let retryCount = 0;

    const init = () => {
        const G = window.parent.Game || window.Game;

        // 等待引擎、数据和渲染器彻底就绪
        if (!G || !G.state || typeof G.initPage !== 'function') {
            if (retryCount < 50) {
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

        console.log('✅ 引擎和数据完全就绪，开始渲染主页');
        bindEvents();
        G.initPage('home', renderHome);
    };

    init();
})();
