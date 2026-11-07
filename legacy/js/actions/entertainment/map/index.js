// js/actions/entertainment/map/index.js
// 导出就绪 Promise：父模块 import 后 await mapReady，
// 确保 Cake.LOCATIONS 与 getRegionLocations 已汇总完成
export const mapReady = (async () => {
    'use strict';
    console.log('🗺️ [Map] 开始加载总地图子模块...');

    const MAP_MODULES = [
        './town/index.js',
        './location_actions.js'
    ];

    for (const path of MAP_MODULES) {
        try {
            const timeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('加载超时')), 3000)
            );
            await Promise.race([import(path), timeout]);
        } catch (err) {
            console.warn(`⚠️ [Map] 子模块加载失败或超时，已跳过 -> ${path}`);
        }
    }

    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) return window.parent.Cake;
        } catch (_) {}
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) {
        console.warn('⚠️ [Map] 未找到 Cake，跳过总地图汇总');
        return;
    }

    if (Cake.__mapLocationsLoaded) return;
    Cake.__mapLocationsLoaded = true;

    Cake.LOCATIONS = Cake.LOCATIONS || {};
    const regions = Cake.REGIONS || {};

    for (const [regionId, region] of Object.entries(regions)) {
        if (!region) continue;
        
        // 👈 究极防呆：不管 locationsKey 有没有被覆盖，强行算出应该去拿哪个数据
        let locKey = region.locationsKey || `REGION_${regionId.toUpperCase()}`;
        
        const locs = Cake[locKey];
        if (!locs || typeof locs !== 'object') {
            console.warn(`⚠️ [Map] 区域 [${regionId}] 地点数据缺失（${locKey}）`);
            continue;
        }

        for (const [key, loc] of Object.entries(locs)) {
            if (loc) Cake.LOCATIONS[key] = loc;
        }
    }

    // 供外部调用的接口，也加上同样的兜底
    Cake.getRegionLocations = (regionId) => {
        const region = Cake.REGIONS && Cake.REGIONS[regionId];
        if (!region) return null;
        const locKey = region.locationsKey || `REGION_${regionId.toUpperCase()}`;
        return Cake[locKey] || null;
    };

    console.log(
        '🗺️ [Map] 总地图最终装载结果：',
        '区域:', Object.keys(regions),
        '地点:', Object.keys(Cake.LOCATIONS)
    );
})();
