// js/actions/entertainment/index.js

// 1. 引入整个地图系统（连带拉取城镇及所有地点）
import './map/index.js';

// 2. 引入底层逻辑
import './common_events.js';

// 🌟 注意这里：rest 已经变成了文件夹系统，必须要引入文件夹里的 index.js
import './rest/index.js'; 

import './walk.js';

// 3. 自检与暴露
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 严密的自检机制
    if (!Cake.rest) console.error('❌ [娱乐系统] rest 模块未加载！');
    if (!Cake.walk) console.error('❌ [娱乐系统] walk 模块未加载！');
    if (!Cake.LOCATIONS) console.error('❌ [娱乐系统] 地图数据未加载！');
    if (!Cake.triggerRest) console.error('❌ [娱乐系统] 休息调度器未加载！');

    // 构建统一的娱乐模块命名空间
    Cake.Entertainment = {
        // 底层通用动作
        rest: Cake.rest,
        sleep: Cake.sleep,
        walk: Cake.walk,
        
        // 事件驱动器
        triggerRest: Cake.triggerRest,
        
        // 地图数据
        locations: Cake.LOCATIONS,
        events: Cake.COMMON_WALK_EVENTS
    };

    console.log('🎮 娱乐与外出系统已成功装载！当前地点数:', Object.keys(Cake.LOCATIONS || {}).length);
})();
