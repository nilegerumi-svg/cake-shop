// js/actions/entertainment/rest/index.js

// 导出就绪 Promise：父模块 import 后 await restReady，
// 确保 Cake.triggerRest / sleep / nap 已挂载（内部含提前 return 守卫，故不拆包重排）
export const restReady = (async () => {
    'use strict';
    console.log('🛌 [Rest] 开始逐个加载休息子模块...');

    // 1. 引入核心拆分文件（动态加载防崩溃）
    const REST_MODULES = [
        './nap.js',
        './sleep.js',
        './monitor.js',
        './town/index.js'
    ];

    for (const path of REST_MODULES) {
        try {
            // 加上 3 秒超时防卡死
            const timeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('加载超时')), 3000)
            );
            await Promise.race([import(path), timeout]);
            console.log(`✅ [Rest] 成功加载: ${path}`);
        } catch (err) {
            console.warn(`⚠️ [Rest] 子模块加载失败，已跳过 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    // 👈 核心绝杀：把 deepFreeze 挂载到全局 Cake 上！
    // 这样不管内部哪个子文件调用了 deepFreeze，都能找到它！
    window.Cake = window.Cake || {};
    window.Cake.deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) window.Cake.deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

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

    if (Cake.__restLoaded) {
        console.log('🛌 [Rest] 已加载，跳过重复初始化');
        return;
    }
    Cake.__restLoaded = true;

    const num = (v, fallback = 0) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : fallback;
    };

    /* ==================== 区域注册表 ==================== */
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = Cake.Actions.Rest || {};
    if (Cake.TownRestConfig) {
        Cake.Actions.Rest.town = Cake.TownRestConfig;
    } else {
        console.warn('⚠️ [Rest] Cake.TownRestConfig 未就绪，town 区域可能不可用');
    }

    /* ==================== 统一调度器 ==================== */

    Cake.triggerRest = (region, location, action) => {
        try {
            const state = Cake.store && Cake.store.state;
            if (!state) {
                Cake.addLog?.('❌ 游戏状态未就绪。');
                Cake.refreshPage?.();
                return;
            }

            const regionCfg = Cake.Actions && Cake.Actions.Rest && Cake.Actions.Rest[region];
            if (!regionCfg) {
                Cake.addLog?.('❌ 未知的休息区域。');
                Cake.refreshPage?.();
                return;
            }

            const locCfg = regionCfg[location];
            if (!locCfg) {
                Cake.addLog?.('❌ 这里无法休息。');
                Cake.refreshPage?.();
                return;
            }

            const actionCfg = locCfg[action];
            if (!actionCfg) {
                Cake.addLog?.(`❌ 这里无法进行「${action === 'sleep' ? '睡觉' : '小憩'}」。`);
                Cake.refreshPage?.();
                return;
            }

            let ev = null;
            if (Cake.RestMonitor && typeof Cake.RestMonitor.check === 'function') {
                try {
                    ev = Cake.RestMonitor.check(region, location, action);
                } catch (err) {
                    console.warn('⚠️ [Rest] RestMonitor.check 异常，按无事发生处理', err);
                }
            }

            const logs = [];
            if (ev && ev.text) logs.push(ev.text);

            if (action === 'sleep') {
                let time = actionCfg.time;
                if (time === 'next_day') {
                    const cur = num(state.hour, 8) * 60 + num(state.minute, 0);
                    time = 24 * 60 + 8 * 60 - cur;
                }

                if (Cake.RestSys && typeof Cake.RestSys.sleep === 'function') {
                    Cake.RestSys.sleep({ time: num(time, 0), logs });
                } else {
                    console.error('❌ [Rest] Cake.RestSys.sleep 未加载');
                    Cake.addLog?.('❌ 睡觉功能暂不可用，请刷新重试。');
                    Cake.refreshPage?.();
                }
            } else {
                let energy = num(actionCfg.energy, 0);
                if (ev && Number.isFinite(Number(ev.energyBonus))) {
                    energy += Number(ev.energyBonus);
                }

                if (Cake.RestSys && typeof Cake.RestSys.nap === 'function') {
                    Cake.RestSys.nap({ energy, time: num(actionCfg.time, 0), logs });
                } else {
                    console.error('❌ [Rest] Cake.RestSys.nap 未加载');
                    Cake.addLog?.('❌ 小憩功能暂不可用，请刷新重试。');
                    Cake.refreshPage?.();
                }
            }
        } catch (error) {
            console.error('❌ [Rest] 休息调度出错：', error);
            try {
                Cake.addLog?.('❌ 休息时出了点小状况，请稍后再试。');
                Cake.refreshPage?.();
            } catch (_) { /* ignore */ }
        }
    };

    /* ==================== 快捷接口 ==================== */

    /* ---- 睡觉白名单 ----
     * 只有列在这里的地点才允许睡觉；以后开放旅馆等新地点，只需往数组里加 key。
     * 注意 state.currentLocation 目前只有 'home' / 'town' 两级（见 js/core/store.js 的 allowLocation），
     * 因此玩家在镇上任何地方（含地图内页）都不在白名单内。
     */
    Cake.SLEEP_WHITELIST = Object.freeze(['home']);

    // 白名单判定：region 目前只有 town，地点 key 必须同时存在于白名单与休息配置中
    Cake.canSleepAt = (region, location) => {
        const list = Cake.SLEEP_WHITELIST || [];
        if (!list.includes(location)) return false;

        const regionCfg = Cake.Actions && Cake.Actions.Rest && Cake.Actions.Rest[region];
        return !!(regionCfg && regionCfg[location] && regionCfg[location].sleep);
    };

    // 解析玩家当前所在地点：调用方可显式指定，否则以存档位置为准
    const resolveLocation = (opts) => {
        const state = Cake.store && Cake.store.state;
        return {
            region: (opts && opts.region) || 'town',
            location: (opts && opts.location) || (state && state.currentLocation) || 'home'
        };
    };

    Cake.rest = () => {
        return Cake.triggerRest('town', 'home', 'nap');
    };

    // 👈 小憩快捷接口：娱乐页「休息」按钮依赖它
    Cake.nap = () => {
        return Cake.triggerRest('town', 'home', 'nap');
    };

    // 睡觉：受白名单约束，只有在家里才能触发
    Cake.sleep = (opts) => {
        const { region, location } = resolveLocation(opts);

        if (!Cake.canSleepAt(region, location)) {
            const msg = '🛌 只有回到家里才能睡觉哦，先去「主页」回家吧。';
            Cake.addLog?.(msg);
            Cake.refreshPage?.();
            return { success: false, message: msg };
        }

        const res = Cake.triggerRest(region, location, 'sleep');
        return (res && typeof res === 'object') ? res : { success: true };
    };

    console.log('🛌 事件驱动型休息系统注册表已装载！');
})();
