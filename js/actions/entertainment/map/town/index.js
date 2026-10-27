// js/actions/entertainment/map/town/index.js

// 🌟 引入城镇监视器（装载城镇事件）
import './monitor.js'; 

// 引入城镇下的所有地点
import './home/index.js';
import './park/index.js';
import './street/index.js';
import './river/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 临时打个 log 看看底层数据到底有没有拿到！
    // 如果这里打印出 undefined，说明你的 home/index.js 等文件没有挂载成功
    console.log("🏘️ [Town] 检查底层数据:", {
        home: Cake._MAP_DATA_HOME,
        park: Cake._MAP_DATA_PARK
    });

    // 城镇地点字典
    Cake.REGION_TOWN = {
        home: Cake._MAP_DATA_HOME,
        park: Cake._MAP_DATA_PARK,
        street: Cake._MAP_DATA_STREET,
        river: Cake._MAP_DATA_RIVER
    };
    
    console.log("🏘️ [Town] 城镇字典装载完毕:", Object.keys(Cake.REGION_TOWN));
})();
