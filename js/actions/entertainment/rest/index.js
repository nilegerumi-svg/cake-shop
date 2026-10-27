// js/actions/entertainment/rest/index.js

// 1. 引入核心组件
import './core.js';
import './monitor.js';

// 2. 引入各个区域的注册表 (未来加海滨就加一行 import './seaside/index.js')
import './town/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // ==========================================
    // 🌟 1. 构建统一注册表 (Registry)
    // ==========================================
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = {
        // 将城镇的数据注册进来
        town: Cake.TownRestConfig
        // 💡 未来扩展：seaside: Cake.SeasideRestConfig
    };

    // ==========================================
    // 🌟 2. 统一调度器 (包含严密报错)
    // ==========================================
    Cake.triggerRest = (region, location, action) => {
        try {
            // 检查区域是否存在
            const regConfig = Cake.Actions.Rest[region];
            if (!regConfig) {
                throw new Error(`未知的休息区域: ${region}`);
            }

            // 检查地点是否存在
            const locConfig = regConfig[location];
            if (!locConfig) {
                throw new Error(`在 ${region} 找不到地点: ${location}`);
            }

            // 检查动作是否支持（比如公园没有 sleep）
            const baseConfig = locConfig[action];
            if (!baseConfig) {
                const actionName = action === 'nap' ? '小憩' : '睡觉';
                Cake.addLog?.(`❌ 当前位置不支持【${actionName}】。`);
                Cake.refreshPage?.();
                return;
            }

            // --- 验证通过，开始结算 ---
            let totalEnergy = baseConfig.energy || 0;
            let totalTime = baseConfig.time || 0;
            let logs = [`✨ 你开始了【${baseConfig.name}】。`];

            // 调用监视器，检查是否触发事件
            const ev = Cake.RestMonitor.check(region, location, action);
            if (ev) {
                logs.push(ev.text);
                totalEnergy += (ev.energyBonus || 0);
            }

            // 执行核心逻辑
            if (action === 'nap') {
                Cake.RestSys.nap({ energy: totalEnergy, time: totalTime, logs });
            } else if (action === 'sleep') {
                let sleepTime = totalTime;
                if (sleepTime === 'next_day') {
                    const state = Cake.store.state;
                    sleepTime = state.hour < 8 
                        ? (8 - state.hour) * 60 - state.minute 
                        : (24 - state.hour + 8) * 60 - state.minute;
                }
                Cake.RestSys.sleep({ time: sleepTime, logs });
            }
        } catch (error) {
            // 兜底报错：防止代码崩溃白屏
            console.error('[RestSystem Error]', error);
            Cake.addLog?.(`❌ 休息系统报错: ${error.message}`);
            Cake.refreshPage?.();
        }
    };

    // ==========================================
    // 🌟 3. 兼容主页的快捷接口
    // ==========================================
    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 事件驱动型休息系统注册表已装载，包含区域:', Object.keys(Cake.Actions.Rest));
})();
