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

    // 🌟 统一调度器（已补全真实逻辑，拒绝爆栈）
    Cake.triggerRest = (region, location, action) => {
        try {
            // 1. 检查区域
            const regConfig = Cake.Actions.Rest[region];
            if (!regConfig) {
                Cake.addLog?.(`❌ 未知的休息区域: ${region}`);
                return;
            }

            // 2. 检查地点
            const locConfig = regConfig[location];
            if (!locConfig) {
                Cake.addLog?.(`❌ 在 ${region} 找不到地点: ${location}`);
                return;
            }

            // 3. 检查动作是否被允许（比如公园不能睡觉）
            const baseConfig = locConfig[action];
            if (!baseConfig) {
                const actionName = action === 'nap' ? '小憩' : '睡觉';
                Cake.addLog?.(`❌ 当前位置不支持【${actionName}】。`);
                Cake.refreshPage?.();
                return;
            }

            // 4. 基础结算
            let totalEnergy = baseConfig.energy || 0;
            let totalTime = baseConfig.time || 0;
            let logs = [`✨ 你开始了【${baseConfig.name}】。`];

            // 5. 触发事件监视器（抽取额外事件）
            const ev = Cake.RestMonitor?.check(region, location, action);
            if (ev) {
                logs.push(ev.text);
                totalEnergy += (ev.energyBonus || 0);
            }

            // 6. 执行到底层核心 (调用 nap.js 或 sleep.js)
            if (action === 'nap') {
                Cake.RestSys.nap({ energy: totalEnergy, time: totalTime, logs });
            } else if (action === 'sleep') {
                // 处理跨天逻辑
                let sleepTime = totalTime;
                if (sleepTime === 'next_day') {
                    const state = Cake.store.state;
                    const currentHour = state.hour || 8;
                    const currentMinute = state.minute || 0;
                    sleepTime = currentHour < 8 
                        ? (8 - currentHour) * 60 - currentMinute 
                        : (24 - currentHour + 8) * 60 - currentMinute;
                }
                Cake.RestSys.sleep({ time: sleepTime, logs });
            }

        } catch (error) {
            console.error('[RestSystem Error]', error);
            Cake.addLog?.(`❌ 休息系统报错: ${error.message}`);
            Cake.refreshPage?.();
        }
    };

    // 🌟 快捷接口，供主页直接调用
    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 事件驱动型休息系统注册表已装载！');
})();
