// js/core/index.js

// 1. 最底层：状态容器与通信桥接
import './store.js';
import './bridge.js';

// 2. 工具与状态管理
import './utils.js';
import './state.js';

// 3. 界面与特效
import './modal.js';
import './effects.js';

// 4. 渲染引擎（依赖以上所有）
import './render.js';

console.log('🧱 [Core] 核心引擎与渲染系统装载完毕');
