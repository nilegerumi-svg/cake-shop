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

    // 🌟 统一调度器（这里不用改，直接调用 Cake.RestSys.nap 或 .sleep）
    Cake.triggerRest = (region, location, action) => {
        try {
            // ...（这里保留你刚才相同的代码）...
        } catch (error) {
            // ... 报错拦截 ...
        }
    };

    // 🌟 快捷接口
    Cake.rest = () => Cake.triggerRest('town', 'home', 'nap');
    Cake.sleep = () => Cake.triggerRest('town', 'home', 'sleep');

    console.log('🛌 事件驱动型休息系统注册表已装载！');
})();
