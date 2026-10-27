// js/actions/entertainment/map/index.js

// 🌟 1. 引入地图事件监视器（它负责抽取通用事件和地点专属事件）
import './monitor.js';

// 🌟 2. 引入城镇区域（它内部会自动加载 town 下的所有地点）
import './town/index.js';

// 未来如果有别的区域，就在这里添加：
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

    // 未来汇总其他区域：
    // if (Cake.REGION_SEASIDE) {
    //     Object.assign(Cake.LOCATIONS, Cake.REGION_SEASIDE);
    // }
})();
