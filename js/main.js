// js/main.js
// 把之前的 alert 删掉，用最干净的静态加载
import './data/index.js';
import './core/index.js';
import './time/index.js';
import './actions/index.js';
import './shared.js';
import './host/index.js';
import './monitor.js';

console.log('🚀 [Main] 甜蜜物语全系统启动完毕！');

// 🌟 核心：向全局广播，引擎已经彻底准备好了
window.dispatchEvent(new Event('cake-ready'));
