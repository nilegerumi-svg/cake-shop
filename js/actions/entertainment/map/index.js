// js/entertainment/map/index.js
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

    // 💡 未来扩展：如果你加了大海区域 (seaside)
    // if (Cake.REGION_SEASIDE) {
    //     Object.assign(Cake.LOCATIONS, Cake.REGION_SEASIDE);
    // }
})();
