// js/entertainment/map/index.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 构建地点地址表
    Cake.LOCATIONS = {
        home: Cake._MAP_DATA_HOME,
        park: Cake._MAP_DATA_PARK,
        street: Cake._MAP_DATA_STREET,
        river: Cake._MAP_DATA_RIVER
    };

    // 清理临时数据（保持内存干净）
    delete Cake._MAP_DATA_HOME;
    delete Cake._MAP_DATA_PARK;
    delete Cake._MAP_DATA_STREET;
    delete Cake._MAP_DATA_RIVER;
})();
