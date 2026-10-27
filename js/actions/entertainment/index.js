// js/entertainment/index.js

// 1. 引入整个地图系统（连带拉取城镇及所有地点）
import './map/index.js';

// 2. 引入底层逻辑
import './common_events.js';
import './rest.js';
import './walk.js';

// 3. 自检与暴露
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    if (!Cake.rest) console.error('❌ [娱乐系统] rest 模块未加载！');
    if (!Cake.walk) console.error('❌ [娱乐系统] walk 模块未加载！');
    if (!Cake.LOCATIONS) console.error('❌ [娱乐系统] 地图数据未加载！');

    Cake.Entertainment = {
        rest: Cake.rest,
        walk: Cake.walk,
        locations: Cake.LOCATIONS,
        events: Cake.COMMON_WALK_EVENTS
    };

    console.log('🎮 娱乐与外出系统已成功装载！当前地点数:', Object.keys(Cake.LOCATIONS).length);
})();
