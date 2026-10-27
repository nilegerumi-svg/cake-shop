// js/entertainment/map/index.js
(() => {
    'use strict';
    
    // 如果已经是父页面的数据，直接用
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 确保 LOCATIONS 是对象
    Cake.LOCATIONS = Cake.LOCATIONS || {};

    // 如果存在临时注册表，全量合并进去
    if (Cake._MAP_REGISTRY) {
        Object.assign(Cake.LOCATIONS, Cake._MAP_REGISTRY);
        // 🚨 注意：这里绝对不能用 delete 删掉 _MAP_REGISTRY
        // 否则 iframe 里再次加载时会导致数据丢失
    }
})();
