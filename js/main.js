// js/main.js
'use strict';

import { initEngine } from './engine/index.js';

console.log('🚀 [Main] 引擎模块开始加载');

// 👈 以后你的模块路径如果404，直接在这里改！
const MODULES = [
    { path: './data/index.js',    name: '🚦 正在加载数据字典' },
    { path: './core/index.js',    name: '🟱 正在加载核心引擎与时间系统' },
    { path: './actions/index.js', name: '🎮 正在加载行为与探索动作' },
    { path: './shared.js',        name: '🟩 正在加载跨页面共享层' },
    { path: './host/index.js',    name: '🏥 正在加载宿主控制台' }
];

// 启动引擎
initEngine(MODULES);
