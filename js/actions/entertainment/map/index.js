// js/entertainment/map/index.js

// 引入城镇区域（它内部会自动加载自己的地点）
import './town/index.js';

// 未来如果有别的区域：
// import './seaside/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 全局地点大字典
    Cake.LOCATIONS = {};

    // 汇总城镇区域
    if (Cake.REGION_TOWN) {
        Object.assign(Cake.LOCATIONS, Cake.REGION_TOWN);
    }
})();
