// js/main.js
'use strict';

// 👈 新增：拦截浏览器原生的模块加载错误
window.addEventListener('error', (e) => {
    console.error('🚨 [全局捕获] 捕获到浏览器原生错误:', e.message);
    if (e.filename) console.error('出错文件:', e.filename);
    if (e.lineno) console.error('出错行号:', e.lineno);
}, true);

import { initEngine } from './engine/index.js';

console.log('🚀 [Main] 引擎模块开始加载');

const MODULES = [
    { path: './data/index.js',    name: '🚦 正在加载数据字典' },
    { path: './core/index.js',    name: '🟱 正在加载核心引擎与时间系统' },
    { path: './actions/index.js', name: '🎮 正在加载行为与探索动作' },
    { path: './shared.js',        name: '🟩 正在加载跨页面共享层' },
    { path: './host/index.js',    name: '🏥 正在加载宿主控制台' }
];

initEngine(MODULES);
