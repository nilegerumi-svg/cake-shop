// js/actions/entertainment/index.js

// 1. 引入整个地图系统（连带拉取城镇及所有地点）
import './map/index.js';

// 2. 引入底层逻辑
// ⚠️ 如果 common_events.js 放在 js/entertainment/，把下面改成：
//    import '../../entertainment/common_events.js';
import './common_events.js';

// 3. rest 文件夹系统
import './rest/index.js';

// 4. 散步动作
import './walk.js';

// 5. 自检与暴露
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

    // 防重复挂载
    if (Cake.__entertainmentLoaded) {
        console.log('🎮 [娱乐系统] 已加载，跳过重复初始化');
        return;
    }

    /* ---------------- 自检 ---------------- */
    const REQUIRED = [
        ['rest',         'Cake.rest'],
        ['sleep',        'Cake.sleep'],
        ['walk',         'Cake.walk'],
        ['triggerRest',  'Cake.triggerRest'],
        ['LOCATIONS',    'Cake.LOCATIONS'],
    ];

    const missing = [];
    for (const [key, label] of REQUIRED) {
        if (!Cake[key]) {
            console.error(`❌ [娱乐系统] ${label} 未加载！`);
            missing.push(key);
        }
    }
    if (!Cake.MapMonitor) {
        console.warn('⚠️ [娱乐系统] Cake.MapMonitor 未加载，walk 将使用兜底事件池');
    }

    /* ---------------- 命名空间 ---------------- */
    // 用 getter 延迟取值，避免 import 顺序变化导致引用过期
    const Entertainment = {};
    for (const key of ['rest', 'sleep', 'walk', 'triggerRest']) {
        Object.defineProperty(Entertainment, key, {
            configurable: true,
            enumerable: true,
            get: () => Cake[key],
        });
    }
    Object.defineProperty(Entertainment, 'locations', {
        configurable: true,
        enumerable: true,
        get: () => Cake.LOCATIONS,
    });
    Object.defineProperty(Entertainment, 'events', {
        configurable: true,
        enumerable: true,
        get: () => Cake.COMMON_WALK_EVENTS,
    });

    Cake.Entertainment = Object.freeze(Entertainment);
    Cake.__entertainmentLoaded = true;

    const locCount = Cake.LOCATIONS ? Object.keys(Cake.LOCATIONS).length : 0;
    console.log(`🎮 娱乐与外出系统已装载！地点数: ${locCount}` +
        (missing.length ? `（缺失: ${missing.join(', ')}）` : ''));
})();
