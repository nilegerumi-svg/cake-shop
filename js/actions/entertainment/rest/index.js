// js/actions/entertainment/rest/index.js

// 1. 引入核心拆分文件
import './nap.js';
import './sleep.js';
import './monitor.js';

// 2. 引入区域注册表
import './town/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 统一注册表
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = {
        town: Cake.TownRestConfig
    };

    // 🌟 统一调度器
    Cake.triggerRest = (region, location, action) => {
        try {
            const state = Cake.store.state;

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

            // 3. 查动作配置（例如 park 没有 sleep）
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
                } catch (_) { /* 事件判定失败则按无事发生处理 */ }
            }

            const logs = [];
            if (ev && ev.text) logs.push(ev.text);

            // 5. 分流执行
            if (action === 'sleep') {
                // 睡觉：睡到第二天早上 8:00
                let time = actionCfg.time;
                if (time === 'next_day') {
                    const cur = (state.hour ?? 8) * 60 + (state.minute ?? 0);
                    time = 24 * 60 + 8 * 60 - cur;   // 距次日 08:00 的分钟数
                }
                if (Cake.RestSys && typeof Cake.RestSys.sleep === 'function') {
                    Cake.RestSys.sleep({ time: Number(time) || 0, logs });
                }
            } else {
                // 小憩：基础恢复 + 事件加成（如苍蝇 -5、甜梦 +15）
                let energy = Number(actionCfg.energy) || 0;
                if (ev && Number.isFinite(Number(ev.energyBonus))) {
                    energy += Number(ev.energyBonus);
                }
                if (Cake.RestSys && typeof Cake.RestSys.nap === 'function') {
                    Cake.RestSys.nap({ energy, time: Number(actionCfg.time) || 0, logs });
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

    // 🌟 快捷接口
    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 事件驱动型休息系统注册表已装载！');
})();
