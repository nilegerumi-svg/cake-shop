// js/actions/index.js

// 1. 引入基础玩法动作
import './bakery.js';
import './shop.js';
import './social.js';
import './system.js';

// 2. 引入娱乐与休息模块
// ⚠️ 这个文件必须存在，并且要挂载：
//    Cake.LOCATIONS / Cake.walk / Cake.Entertainment /
//    Cake.COMMON_WALK_EVENTS / Cake.TOWN_EVENTS / Cake.rest / Cake.sleep
// 否则 map.html / entertainment/index.html 会显示「数据为空」，home.html 的「小憩 / 睡觉」会静默失效。
import './entertainment/index.js';

(() => {
    'use strict';
    console.log('⚙️ 所有动作系统(actions)装载完毕！');
})();
