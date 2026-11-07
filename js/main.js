// js/main.js
'use strict';

// 过滤微信自带报错
window.addEventListener('error', (e) => {
    if (e.message && (e.message.includes('LIDNotifyId') || e.message.includes('WeixinJSBridge'))) return;
    console.error('🚨 [全局捕获] 浏览器原生错误:', e.message);
}, true);

import { initEngine } from './engine/index.js';

console.log('🚀 [Main] 引擎模块开始加载');

const MODULES = [
    { path: '../data/index.js',    name: '🚦 正在加载数据字典' },
    { path: '../core/index.js',    name: '🟱 正在加载核心引擎' },
    { path: '../shared.js',        name: '🟩 正在加载跨页面共享层' }, // 👈 必须放在 core 后面
    { path: '../actions/index.js', name: '🎮 正在加载行为与探索动作' },
    { path: '../host/index.js',    name: '🏥 正在加载宿主控制台' }
];

initEngine(MODULES);
