// js/actions/entertainment/map/location_actions.js

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

    // 👈 新增：获取某地点的可执行动作列表（供地点页渲染按钮）
    Cake.getLocationActions = function (regionId, locationId) {
        const loc = (typeof Cake.getLocationInfo === 'function')
            ? Cake.getLocationInfo(regionId, locationId)
            : null;
        if (!loc) return [];

        // 若地点已显式配置动作，直接采用
        if (Array.isArray(loc.actions) && loc.actions.length > 0) return loc.actions;

        const actions = [];

        // 1. 散步探索（地点配置有随机事件的才可探索）
        if (Array.isArray(loc.events) && loc.events.length > 0) {
            actions.push({
                key: 'explore',
                type: 'explore',
                name: '散步探索',
                emoji: '🚶',
                desc: `消耗 ${Number(loc.cost) || 0} 精力，可能会遇到有趣的事`,
                cost: Number(loc.cost) || 0,
                time: Number(loc.time) || 0
            });
        }

        // 2. 休息动作（复用休息系统配置表）
        const restCfg = Cake.Actions && Cake.Actions.Rest && Cake.Actions.Rest[regionId];
        const locRest = restCfg && restCfg[locationId];
        if (locRest) {
            if (locRest.nap) {
                actions.push({
                    key: 'nap',
                    type: 'rest',
                    name: locRest.nap.name || '小憩',
                    emoji: '😌',
                    desc: `回复 ${Number(locRest.nap.energy) || 0} 精力`,
                    cost: 0,
                    time: Number(locRest.nap.time) || 0
                });
            }
            if (locRest.sleep) {
                actions.push({
                    key: 'sleep',
                    type: 'rest',
                    name: locRest.sleep.name || '睡觉',
                    emoji: '🛌',
                    desc: '好好睡一觉，醒来精力全满',
                    cost: 0,
                    time: 0
                });
            }
        }

        return actions;
    };

    // 👈 新增：执行地点动作（探索 / 小憩 / 睡觉）
    Cake.performLocationAction = function (regionId, locationId, actionKey) {
        const state = Cake.store && Cake.store.state;
        if (!state) return Cake.fail ? Cake.fail('❌ 游戏状态未就绪') : { success: false, message: '❌ 游戏状态未就绪' };

        const loc = (typeof Cake.getLocationInfo === 'function')
            ? Cake.getLocationInfo(regionId, locationId)
            : null;
        const locName = (loc && loc.name) || locationId || '这里';

        // 休息类动作转发给统一的休息系统
        if (actionKey === 'nap' || actionKey === 'sleep' || actionKey === 'rest') {
            // 睡觉必须走白名单判定，避免绕过校验
            if (actionKey === 'sleep') {
                if (typeof Cake.sleep !== 'function') {
                    return Cake.fail ? Cake.fail('❌ 睡觉功能未加载') : { success: false, message: '❌ 睡觉功能未加载' };
                }
                const sleepRes = Cake.sleep({ region: regionId, location: locationId });
                if (Cake.emit) Cake.emit('refresh_ui');
                return sleepRes || { success: true };
            }

            if (typeof Cake.triggerRest !== 'function') {
                return Cake.fail ? Cake.fail('❌ 休息功能未加载') : { success: false, message: '❌ 休息功能未加载' };
            }
            Cake.triggerRest(regionId, locationId, actionKey === 'rest' ? 'nap' : actionKey);
            if (Cake.emit) Cake.emit('refresh_ui');
            return { success: true };
        }

        // 探索动作：消耗精力与时间，触发该地点的随机事件
        const cost = Number(loc && loc.cost) || 0;
        const time = Number(loc && loc.time) || 0;

        if (state.energy < cost) {
            return Cake.fail ? Cake.fail('⚡ 精力不足，无法探索这里。') : { success: false, message: '⚡ 精力不足' };
        }
        state.energy = Math.max(0, state.energy - cost);

        const pool = (loc && Array.isArray(loc.events) && loc.events.length > 0)
            ? loc.events
            : (Cake.COMMON_WALK_EVENTS || []);
        const evt = (pool.length > 0 && typeof Cake.randomPick === 'function') ? Cake.randomPick(pool) : null;

        if (evt) {
            if (evt.text && typeof Cake.addLog === 'function') {
                Cake.addLog(`📍 ${locName}：${evt.text}`);
            }
            if (typeof Cake.applyEventEffects === 'function') {
                Cake.applyEventEffects(evt);
            }
        } else if (typeof Cake.addLog === 'function') {
            Cake.addLog(`📍 在 ${locName} 散步了一圈。`);
        }

        // 时间流逝（内部会保存并刷新）
        if (time > 0 && typeof Cake.advanceTime === 'function') {
            Cake.advanceTime(time);
        } else {
            if (Cake.saveState) Cake.saveState();
            if (Cake.emit) Cake.emit('refresh_ui');
        }
        return { success: true };
    };
})();

console.log('🗺️ [Map] 地图区域与动作系统装载完毕');
