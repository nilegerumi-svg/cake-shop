// js/actions/entertainment/map/location_actions.js
(() => {
    'use strict';

    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) return;

    // 防重复挂载
    if (Cake.__locationActionsLoaded) {
        console.log('🎬 [LocationActions] 地点动作系统已加载，跳过重复初始化');
        return;
    }
    Cake.__locationActionsLoaded = true;

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    /* ==================== 动作类型注册表（未来扩展点 ①） ==================== */
    // 新增地点功能时，在这里登记动作类型，并可包含 isValid 校验规则
    Cake.ACTION_TYPES = Cake.ACTION_TYPES || Object.freeze({
        walk:  { name: '散步', emoji: '🚶‍♀️' },
        nap:   { name: '小憩', emoji: '😴' },
        sleep: { 
            name: '睡觉', 
            emoji: '🛌',
            // 🌟 为了可扩展性，增加 isValid 限制：
            // 睡觉只允许在 town/home 进行，或者未来在配置中声明了 isPrivate 的特殊地点进行
            isValid: (regionId, locKey, locCfg) => {
                if (regionId === 'town' && locKey === 'home') return true;
                if (locCfg && locCfg.isPrivate === true) return true;
                return false;
            }
        },
        // 未来示例：
        // forage: { name: '采集', emoji: '🌿' },
        // chat:   { name: '闲聊', emoji: '💬' },
    });

    /* ==================== 查询某地点可用的动作（未来扩展点 ②） ==================== */
    Cake.getLocationActions = (regionId, locationKey) => {
        const list = [];

        const regionLocs = (typeof Cake.getRegionLocations === 'function'
            ? Cake.getRegionLocations(regionId)
            : null) || {};
        const locCfg = regionLocs[locationKey] || (Cake.LOCATIONS && Cake.LOCATIONS[locationKey]);
        if (!locCfg) return list;

        // 1) 散步：所有地点都支持
        list.push({
            key: 'walk',
            name: '散步',
            emoji: '🚶‍♀️',
            desc: `消耗 ${num(locCfg.cost, 8)} 精力 · 耗时 ${num(locCfg.time, 0)} 分钟`,
            energyCost: num(locCfg.cost, 8),
        });

        // 2) 休息动作：从 Rest 配置懒读取（rest 模块可能晚于 map 加载）
        const restRegion = Cake.Actions && Cake.Actions.Rest && Cake.Actions.Rest[regionId];
        const locRest = restRegion && restRegion[locationKey];

        if (locRest) {
            if (locRest.nap) {
                list.push({
                    key: 'nap',
                    name: '小憩',
                    emoji: '😴',
                    desc: `恢复 ${num(locRest.nap.energy, 0)} 精力 · 耗时 ${num(locRest.nap.time, 0)} 分钟`,
                });
            }
            if (locRest.sleep) {
                // 👇 通过 ACTION_TYPES 的校验规则，限定睡觉只能在特殊单元内渲染
                const sleepType = Cake.ACTION_TYPES.sleep;
                const canSleep = sleepType && typeof sleepType.isValid === 'function' 
                    ? sleepType.isValid(regionId, locationKey, locCfg)
                    : true;

                if (canSleep) {
                    list.push({
                        key: 'sleep',
                        name: '睡觉',
                        emoji: '🛌',
                        desc: '精力回满 · 睡到次日 08:00',
                    });
                }
            }
        }

        // 3) 未来动作扩展点：例如
        // if (Cake.LOCATION_EXTRA_ACTIONS && Cake.LOCATION_EXTRA_ACTIONS[locationKey]) { ... }

        return list;
    };

    /* ==================== 统一动作分发（未来扩展点 ③） ==================== */
    Cake.performLocationAction = (regionId, locationKey, actionKey) => {
        if (actionKey === 'walk') {
            if (typeof Cake.walk === 'function') return Cake.walk(locationKey);
            console.error('❌ [LocationActions] Cake.walk 未加载');
            return null;
        }

        if (actionKey === 'nap' || actionKey === 'sleep') {
            // 👇 双重保护：即使恶意篡改前端数据，也要拦截非法的 sleep 请求
            if (actionKey === 'sleep') {
                const locCfg = Cake.LOCATIONS && Cake.LOCATIONS[locationKey];
                const sleepType = Cake.ACTION_TYPES.sleep;
                const canSleep = sleepType && typeof sleepType.isValid === 'function' 
                    ? sleepType.isValid(regionId, locationKey, locCfg)
                    : true;

                if (!canSleep) {
                    Cake.addLog?.('❌ 这里不能睡觉，只能在自己家里（或私人领地）睡。');
                    Cake.refreshPage?.();
                    return null;
                }
            }

            if (typeof Cake.triggerRest === 'function') {
                return Cake.triggerRest(regionId, locationKey, actionKey);
            }
            console.error('❌ [LocationActions] Cake.triggerRest 未加载');
            return null;
        }

        // 未来动作扩展点
        console.warn(`⚠️ [LocationActions] 未知动作: ${actionKey}`);
        return null;
    };

    console.log('🎬 [LocationActions] 地点动作系统已装载');
})();
