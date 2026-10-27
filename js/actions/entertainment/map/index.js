// js/entertainment/map/index.js
(() => {
    'use strict';
    window.Cake = window.Cake || {};

    // 初始化地点库
    window.Cake.LOCATIONS = {};

    // 从注册表合并数据
    if (window.Cake._MAP_REGISTRY) {
        // 可以在这里做一个排序逻辑，确保家园在最前面
        const orderedKeys = ['home', 'park', 'street', 'river'];
        
        for (const key of orderedKeys) {
            if (window.Cake._MAP_REGISTRY[key]) {
                window.Cake.LOCATIONS[key] = window.Cake._MAP_REGISTRY[key];
            }
        }

        // 清理临时注册表
        delete window.Cake._MAP_REGISTRY;
    }
})();
