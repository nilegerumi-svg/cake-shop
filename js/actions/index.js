// js/actions/index.js

// 1. 引入基础玩法动作
import './bakery.js';
import './shop.js';
import './social.js';
import './system.js';

// 2. 引入娱乐与休息模块（区块自治：娱乐系统内部自己管理 map / rest / walk）
import './entertainment/index.js';

(() => {
    'use strict';
    console.log('⚙️ 所有动作系统(actions)装载完毕！');
})();
