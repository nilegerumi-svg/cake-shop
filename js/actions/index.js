// js/actions/index.js

// 1. 引入系统级基础操作（比如日志、刷新页面等）
import './system.js';

// 2. 引入各个独立的行为模块
import './bakerly/index.js';       // ⚠️ 注意：你截图里的文件夹叫 bakerly，这里保持一致
import './craft/index.js';
import './entertainment/index.js';
import './shop/index.js';
import './social/index.js';

console.log('📦 [Actions] 行为操作层装载完毕');
