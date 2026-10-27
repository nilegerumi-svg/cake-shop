// js/entertainment/index.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 1. 核心功能自检 (确保底层的休息和散步已经加载)
    if (!Cake.rest) console.error('❌ [娱乐系统] rest 模块未加载！');
    if (!Cake.walk) console.error('❌ [娱乐系统] walk 模块未加载！');
    if (!Cake.LOCATIONS) console.error('❌ [娱乐系统] 地图数据未加载！');

    // 2. 整合成一个独立的命名空间，方便以后扩展或外部调用
    Cake.Entertainment = {
        rest: Cake.rest,
        walk: Cake.walk,
        locations: Cake.LOCATIONS,
        events: Cake.COMMON_WALK_EVENTS,
        
        // 未来你可以在这里添加更多接口，比如：看海、看电影等
        // watchMovie: ... 
    };

    console.log('🎮 娱乐与外出系统已成功装载！');
})();
