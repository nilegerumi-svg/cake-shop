// js/pages/index.js
// 页面系统入口：根据当前路径决定加载 start 还是 home
// 注意：start/index.js 与 home/index.js 都在各自初始化完成后负责收尾
import '../core/schema.js';
import '../core/store.js';
import '../shared.js';
import './router.js';
console.log('⚙️ 页面系统入口已装载');
