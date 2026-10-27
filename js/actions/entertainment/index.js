// js/entertainment/index.js

// 1. 引入具体地图数据包 (必须靠前)
import './map/town/home/index.js';
import './map/town/park/index.js';
import './map/town/street/index.js';
import './map/town/river/index.js';

// 2. 引入注册表
import './map/town/index.js';
import './map/index.js';

// 3. 引入底层逻辑
import './common_events.js';
import './rest.js';
import './walk.js';

// 4. 最后执行聚合与自检逻辑
(() => {
    'use strict';
    // 因为模块化后 this 是 undefined，我们还是安全地从 window 取
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
