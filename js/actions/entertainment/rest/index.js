// js/entertainment/rest/index.js
import './core.js';
import './town/index.js';

(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 🌟 建立统一的全局命名空间
    Cake.Actions = Cake.Actions || {};
    Cake.Actions.Rest = {
        town: Cake.RestTown,
    };

    /**
     * 🌟 终极统一触发器
     * @param {string} region 区域 (如 'town')
     * @param {string} location 地点 (如 'home', 'park')
     * @param {string} action 动作 (如 'nap', 'sleep')
     */
    Cake.triggerRest = (region, location, action) => {
        const reg = Cake.Actions.Rest[region];
        if (!reg) {
            Cake.addLog?.(`❌ 未知区域: ${region}`);
            return;
        }

        // 拼接方法名，比如 'home' + 'Nap' -> 'homeNap'
        const actionName = `${location}${action.charAt(0).toUpperCase() + action.slice(1)}`;
        
        if (typeof reg[actionName] === 'function') {
            reg[actionName]();
        } else {
            Cake.addLog?.(`❌ 在 ${location} 无法进行 ${action} 操作。`);
            Cake.refreshPage?.();
        }
    };

    // 🌟 兼容主页的旧按钮，默认在家里休息/睡觉
    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 休息系统已装载，支持区域:', Object.keys(Cake.Actions.Rest));
})();
