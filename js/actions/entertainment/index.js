// js/actions/entertainment/index.js

// 区块自治：这里只 import 自己区块内的文件，不做任何全局登记。
import './map/index.js';        // → monitor + town + location-actions
import './common_events.js';
import './rest/index.js';       // → nap + sleep + monitor + town/events
import './walk.js';

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
    if (!Cake) {
        console.warn('⚠️ [娱乐系统] 未找到 Cake，跳过 Entertainment 挂载');
        return;
    }

    if (Cake.__entertainmentLoaded) {
        console.log('🎮 [娱乐系统] 已加载，跳过重复初始化');
        return;
    }
    Cake.__entertainmentLoaded = true;

    // 可选：分组命名空间（纯糖，非必需，也不参与任何全局注册）
    Cake.Entertainment = {
        get rest()          { return Cake.rest; },
        get sleep()         { return Cake.sleep; },
        get walk()          { return Cake.walk; },
        get triggerRest()   { return Cake.triggerRest; },
        get locations()     { return Cake.LOCATIONS; },
        get regions()       { return Cake.REGIONS; },
        get actions()       { return Cake.ACTION_TYPES; },
        get events()        { return Cake.COMMON_WALK_EVENTS; },
    };

    console.log('🎮 娱乐与外出系统已装载');
})();
