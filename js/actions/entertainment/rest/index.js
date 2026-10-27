// js/entertainment/rest/index.js
import './core.js';
import './monitor.js';
import './town/events/home.js';
import './town/events/park.js';
import './town/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = {
        town: Cake.TownRestConfig
    };

    /**
     * 🌟 统一触发引擎
     */
    Cake.triggerRest = (region, location, action) => {
        const regConfig = Cake.Actions.Rest[region];
        if (!regConfig || !regConfig[location]) {
            Cake.addLog?.(`❌ 这里无法休息。`);
            Cake.refreshPage?.();
            return;
        }

        const baseConfig = regConfig[location][action];
        if (!baseConfig) {
            Cake.addLog?.(`❌ 当前位置不支持【${action === 'nap' ? '小憩' : '睡觉'}】。`);
            Cake.refreshPage?.();
            return;
        }

        // 1. 获取基础数值
        let totalEnergy = baseConfig.energy || 0;
        let totalTime = baseConfig.time || 0;
        let logs = [`✨ 你开始了【${baseConfig.name}】。`];

        // 2. 调用监视器，检查是否触发特殊事件
        const ev = Cake.RestMonitor.check(region, location, action);
        if (ev) {
            logs.push(ev.text); // 加入事件文案
            totalEnergy += (ev.energyBonus || 0); // 叠加额外奖励
        }

        // 3. 执行核心逻辑
        if (action === 'nap') {
            Cake.RestSys.nap({ energy: totalEnergy, time: totalTime, logs });
        } else if (action === 'sleep') {
            // 睡觉处理跨天时间
            let sleepTime = totalTime;
            if (sleepTime === 'next_day') {
                const state = Cake.store.state;
                sleepTime = state.hour < 8 
                    ? (8 - state.hour) * 60 - state.minute 
                    : (24 - state.hour + 8) * 60 - state.minute;
            }
            Cake.RestSys.sleep({ time: sleepTime, logs });
        }
    };

    // 🌟 兼容主页默认调用
    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 事件驱动型休息系统已装载！');
})();
