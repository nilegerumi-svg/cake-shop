// js/actions/entertainment/map/town/index.js

import './monitor.js'; 
import './home/index.js';
import './park/index.js';
import './street/index.js';
import './river/index.js';

(() => {
    'use strict';
    
    // 🌟 不再写 if (!Cake) return; 而是强制建一个
    window.Cake = window.Cake || {};
    // 如果在 iframe 里，尝试取父页面的；如果没有父页面，就用当前页面的
    const Cake = window.parent.Cake || window.Cake;

    console.log("🏘️ [Town] 城镇模块开始执行，当前 Cake 是否就绪:", !!Cake);

    // 如果发现底层数据没拿到，大概率是 home/index.js 报错了
    if (!Cake._MAP_DATA_HOME) {
        console.error("❌ [Town] 警告：未读取到 _MAP_DATA_HOME，请检查 home/index.js 是否加载或报错！");
    }

    // 城镇地点字典
    Cake.REGION_TOWN = {
        home: Cake._MAP_DATA_HOME,
        park: Cake._MAP_DATA_PARK,
        street: Cake._MAP_DATA_STREET,
        river: Cake._MAP_DATA_RIVER
    };
    
    console.log("🏘️ [Town] 城镇字典装载完毕:", Object.keys(Cake.REGION_TOWN));
})();
