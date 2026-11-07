// js/actions/entertainment/map/location_actions/query.js —— 地点与商店查询
(function () {
    'use strict';
    const Cake = window.Cake;

    /* ==================== 区域元数据（派生，不另立一套地点数据） ====================
     * 地点的详细数据（events / cost / time）唯一来源是 town/index.js 汇总的 Cake.REGION_TOWN，
     * 这里只负责把区域元数据补全成总地图页需要的形状，避免再维护第二套地点清单。
     * 商店内嵌在地点内部：某地点配了商店（Cake.TOWN_SHOPS[locId]）即可就地购物。
     */
    const townRegion = (Cake.REGIONS && Cake.REGIONS.town) || {};
    const townLocations = Cake.REGION_TOWN || {};

    Cake.REGIONS = Object.assign({}, Cake.REGIONS, {
        town: Object.assign({}, townRegion, {
            id: 'town',
            name: townRegion.name || '城镇',
            emoji: townRegion.emoji || '🏘️',
            desc: townRegion.desc || '商店、公园与河流交织的温馨城镇。',
            // 地点数据的挂载点，map/index.js 会据此汇总 Cake.LOCATIONS
            locationsKey: 'REGION_TOWN',
            // 总地图页按此数组列出可进入的地点
            locations: Object.keys(townLocations)
        })
    });

    // 提供辅助查询方法
    Cake.getRegionLocations = function (regionId) {
        const region = Cake.REGIONS[regionId];
        if (!region) return null;
        // 优先按 locationsKey 取详细地点数据，保证 events/cost/time 完整
        const locKey = region.locationsKey || `REGION_${regionId.toUpperCase()}`;
        return Cake[locKey] || region.locations || null;
    };

    // 👈 统一地点查询：优先返回带事件/动作的详细数据，其次区域配置
    Cake.getLocationInfo = function (regionId, locationId) {
        const locs = (typeof Cake.getRegionLocations === 'function')
            ? Cake.getRegionLocations(regionId)
            : null;
        const base = locs && (locs[locationId] || (Array.isArray(locs) ? locs.find((x) => x.id === locationId || x.key === locationId) : null)) || null;
        const detailed = (Cake.REGION_TOWN && Cake.REGION_TOWN[locationId]) || null;
        return detailed || base;
    };

    // 👈 地点商店：商店内嵌在地点内部，去到该地点即可就地购物
    // 惰性读取 TOWN_SHOPS，因为商店模块的加载晚于地图模块
    Cake.getLocationShop = function (regionId, locationId) {
        const shops = Cake.TOWN_SHOPS || null;
        const shop = shops && shops[locationId];
        if (!shop) return null;

        const items = (typeof Cake.getShopItems === 'function')
            ? Cake.getShopItems(locationId)
            : [];

        return { shop, items };
    };
})();