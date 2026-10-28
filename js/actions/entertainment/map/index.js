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
        console.warn('⚠️ [Map] 未找到 Cake，跳过总地图汇总');
        return;
    }

    // 防重复挂载
    if (Cake.__mapLocationsLoaded) {
        console.log('🗺️ [Map] 总地图已汇总，跳过重复初始化');
        return;
    }
    Cake.__mapLocationsLoaded = true;

    // ⚠️ 不直接覆盖：保留已挂载的地点，合并新地点
    Cake.LOCATIONS = Cake.LOCATIONS || {};

    // 汇总所有「已注册区域」的地点到全局 LOCATIONS（walk 用这张总表）
    const regions = Cake.REGIONS || {};
    if (Object.keys(regions).length === 0) {
        console.error('❌ [Map] 严重错误：REGIONS 为空，没有任何区域注册！');
        return;
    }

    for (const [regionId, region] of Object.entries(regions)) {
        if (!region) continue;
        const locs = region.locationsKey ? Cake[region.locationsKey] : null;
        if (!locs || typeof locs !== 'object') {
            console.warn(`⚠️ [Map] 区域 [${regionId}] 地点数据缺失（${region.locationsKey}）`);
            continue;
        }
        for (const [key, loc] of Object.entries(locs)) {
            if (loc) {
                Cake.LOCATIONS[key] = loc;
            } else {
                console.warn(`⚠️ [Map] 地点 [${key}] 数据为 undefined，已被过滤。`);
            }
        }
    }

    // 通用接口：按区域 id 取该区域的地点
    Cake.getRegionLocations = (regionId) => {
        const region = Cake.REGIONS && Cake.REGIONS[regionId];
        if (!region || !region.locationsKey) return null;
        return Cake[region.locationsKey] || null;
    };

    console.log(
        '🗺️ [Map] 总地图最终装载结果：',
        '区域:', Object.keys(regions),
        '地点:', Object.keys(Cake.LOCATIONS)
    );
})();
