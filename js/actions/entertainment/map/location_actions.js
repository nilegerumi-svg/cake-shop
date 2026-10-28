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

    if (Cake.__locationActionsLoaded) return;
    Cake.__locationActionsLoaded = true;

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    /* ==================== 动作类型注册表 ==================== */
    Cake.ACTION_TYPES = Cake.ACTION_TYPES || Object.freeze({
        walk:  { name: '散步', emoji: '🚶‍♀️' },
        nap:   { name: '小憩', emoji: '😴' },
        sleep: { 
            name: '睡觉', 
            emoji: '🛌',
            // 🌟 严格白名单：目前只有 town/home 才能睡觉
            isValid: (regionId, locKey) => regionId === 'town' && locKey === 'home'
        },
    });

    /* ==================== 查询某地点可用的动作 ==================== */
    Cake.getLocationActions = (regionId, locationKey) => {
        const list = [];

        const regionLocs = (typeof Cake.getRegionLocations === 'function'
            ? Cake.getRegionLocations(regionId)
            : null) || {};
        const locCfg = regionLocs[locationKey] || (Cake.LOCATIONS && Cake.LOCATIONS[locationKey]);
        if (!locCfg) return list;

        // 1) 散步
        list.push({
            key: 'walk',
            name: '散步',
            emoji: '🚶‍♀️',
            desc: `消耗 ${num(locCfg.cost, 8)} 精力 · 耗时 ${num(locCfg.time, 0)} 分钟`,
            energyCost: num(locCfg.cost, 8),
        });

        // 2) 休息动作
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
                // 👇 严格通过 ACTION_TYPES 校验，只有 town/home 能渲染出睡觉按钮
                const canSleep = Cake.ACTION_TYPES.sleep?.isValid?.(regionId, locationKey) ?? false;
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

        return list;
    };

    /* ==================== 统一动作分发 ==================== */
    Cake.performLocationAction = (regionId, locationKey, actionKey) => {
        if (actionKey === 'walk') {
            if (typeof Cake.walk === 'function') return Cake.walk(locationKey);
            return null;
        }

        if (actionKey === 'nap' || actionKey === 'sleep') {
            // 👇 拦截恶意调用：如果试图在非 home 地点睡觉
            if (actionKey === 'sleep') {
                const canSleep = Cake.ACTION_TYPES.sleep?.isValid?.(regionId, locationKey) ?? false;
                if (!canSleep) {
                    Cake.addLog?.('❌ 这里不能睡觉，只能在自己家里睡。');
                    Cake.refreshPage?.();
                    return null;
                }
            }

            if (typeof Cake.triggerRest === 'function') {
                return Cake.triggerRest(regionId, locationKey, actionKey);
            }
            return null;
        }

        return null;
    };
})();
