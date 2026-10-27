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

        if (!G) {
            // 如果父页面还没准备好，等 100 毫秒再试，最多试 20 次（2秒）
            if (retryCount < 20) {
                retryCount++;
                setTimeout(init, 100);
            } else {
                document.getElementById('content').innerHTML = `
                    <div style="color:red; padding:20px; text-align:center;">
                        ❌ 游戏加载超时！<br>
                        请检查父页面 js/main.js 是否报错。
                    </div>`;
            }
            return;
        }

        // 成功拿到 Game 对象，开始渲染
        console.log('✅ 成功获取 Game 对象，开始渲染主页');
        bindEvents();
        
        if (typeof G.initPage === 'function') {
            G.initPage('home', renderHome);
        } else {
            document.getElementById('content').innerHTML = '<div style="color:red; padding:20px;">缺少 initPage 渲染方法</div>';
        }
    };

    // 启动
    init();
})();
