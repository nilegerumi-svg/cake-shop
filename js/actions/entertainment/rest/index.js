// js/actions/entertainment/rest/index.js

// 1. 引入核心拆分文件
import './nap.js';
import './sleep.js';
import './monitor.js';

// 2. 引入区域注册表
import './town/index.js';

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
    // ⚠️ 不覆盖已有区域：town/index.js 可能已经挂了 Cake.Actions.Rest.town
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

            // 1. 查区域配置
            const regionCfg = Cake.Actions && Cake.Actions.Rest && Cake.Actions.Rest[region];
            if (!regionCfg) {
                Cake.addLog?.('❌ 未知的休息区域。');
                Cake.refreshPage?.();
                return;
            }

            // 2. 查地点配置
            const locCfg = regionCfg[location];
            if (!locCfg) {
                Cake.addLog?.('❌ 这里无法休息。');
                Cake.refreshPage?.();
                return;
            }

            // 3. 查动作配置
            const actionCfg = locCfg[action];
            if (!actionCfg) {
                Cake.addLog?.(`❌ 这里无法进行「${action === 'sleep' ? '睡觉' : '小憩'}」。`);
                Cake.refreshPage?.();
                return;
            }

            // 4. 抽取休息事件（可能为 null）
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

            // 5. 分流执行
            if (action === 'sleep') {
                let time = actionCfg.time;
                if (time === 'next_day') {
                    const cur = num(state.hour, 8) * 60 + num(state.minute, 0);
                    time = 24 * 60 + 8 * 60 - cur;   // 距次日 08:00 的分钟数
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

    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 事件驱动型休息系统注册表已装载！');
})();
