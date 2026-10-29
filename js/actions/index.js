// js/actions/index.js

import './system.js';              // 1. 系统底层（最先加载）
import './craft/index.js';         // 核心制作
import './entertainment/index.js'; // 地图与探索
import './shop/index.js';          // 店铺开关与打扫
import './social/index.js';        // 社交互动

console.log('⚙️ [Actions] 所有行为操作层装载完毕');
