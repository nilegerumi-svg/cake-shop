// js/actions/entertainment/map/index.js

import './monitor.js';
import './town/index.js';

(() => {
    'use strict';
    
    window.Cake = window.Cake || {};
    const Cake = window.parent.Cake || window.Cake;

    // 🌟 全局地点大字典
    Cake.LOCATIONS = {};

    if (!Cake.REGION_TOWN) {
        console.error("❌ [Map] 严重错误：REGION_TOWN 不存在，城镇数据挂载失败！");
        return; 
    }

    // 汇总城镇区域（加上防崩过滤，防止 undefined 混入）
    for (const [key, loc] of Object.entries(Cake.REGION_TOWN)) {
        if (loc) {
            Cake.LOCATIONS[key] = loc;
        } else {
            console.warn(`⚠️ [Map] 地点 [${key}] 数据为 undefined，已被过滤。`);
        }
    }

    console.log("🗺️ [Map] 全局 LOCATIONS 最终装载结果:", Object.keys(Cake.LOCATIONS));
})();
