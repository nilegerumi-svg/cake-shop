// js/actions/index.js

// 1. 引入基础玩法动作
import './bakery.js';
import './shop.js';
import './social.js';
import './system.js';

// 2. 引入娱乐与休息模块 (根据你的最新架构，它应该在这个路径下)
import './entertainment/index.js';

(() => {
    'use strict';
    console.log('⚙️ 所有动作系统(actions)装载完毕！');
})();
