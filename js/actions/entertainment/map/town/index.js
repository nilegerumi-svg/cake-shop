// js/entertainment/map/town/index.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 城镇地点字典
    Cake.REGION_TOWN = {
        home: Cake._MAP_DATA_HOME,
        park: Cake._MAP_DATA_PARK,
        street: Cake._MAP_DATA_STREET,
        river: Cake._MAP_DATA_RIVER
    };

    // 清理临时数据包
    delete Cake._MAP_DATA_HOME;
    delete Cake._MAP_DATA_PARK;
    delete Cake._MAP_DATA_STREET;
    delete Cake._MAP_DATA_RIVER;
})();
