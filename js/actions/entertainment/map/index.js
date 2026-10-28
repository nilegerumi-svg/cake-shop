// js/actions/entertainment/map/index.js

import './monitor.js';
import './town/index.js';

(() => {
    'use strict';

    // 跨域守卫：iframe 中访问 parent 可能抛错
    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) {
        console.warn('⚠️ [Map] 未找到 Cake，跳过 LOCATIONS 汇总');
        return;
    }

    // 防重复挂载
    if (Cake.__mapLocationsLoaded) {
        console.log('🗺️ [Map] LOCATIONS 已汇总，跳过重复初始化');
        return;
    }
    Cake.__mapLocationsLoaded = true;

    // ⚠️ 不直接覆盖：保留已挂载的地点，合并新地点
    Cake.LOCATIONS = Cake.LOCATIONS || {};

    if (!Cake.REGION_TOWN) {
        console.error('❌ [Map] 严重错误：REGION_TOWN 不存在，城镇数据挂载失败！');
        // 不清空已有 LOCATIONS，避免地图页直接空掉
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

    console.log('🗺️ [Map] 全局 LOCATIONS 最终装载结果:', Object.keys(Cake.LOCATIONS));
})();
