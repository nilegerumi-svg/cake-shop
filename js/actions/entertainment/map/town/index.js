// js/actions/entertainment/map/town/index.js

import './monitor.js';
import './home/index.js';
import './park/index.js';
import './street/index.js';
import './river/index.js';

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
        console.warn('⚠️ [Town] 未找到 Cake，跳过 REGION_TOWN 汇总');
        return;
    }

    // 防重复挂载
    if (Cake.__townRegionLoaded) {
        console.log('🏘️ [Town] REGION_TOWN 已汇总，跳过重复初始化');
        return;
    }
    Cake.__townRegionLoaded = true;

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    console.log('🏘️ [Town] 城镇模块开始执行，当前 Cake 是否就绪:', !!Cake);

    /* ==================== 1. 注册区域元数据（供「总地图」页展示） ==================== */
    Cake.REGIONS = Cake.REGIONS || {};
    Cake.REGIONS.town = deepFreeze({
        id: 'town',
        name: '城镇',
        emoji: '🏘️',
        desc: '商店、公园与河流交织的温馨城镇。',
        locationsKey: 'REGION_TOWN',   // 该区域的地点数据挂载点
    });

    /* ==================== 2. 汇总区域地点 ==================== */
    // ⚠️ 不直接覆盖：保留已有地点，合并新地点
    Cake.REGION_TOWN = Cake.REGION_TOWN || {};

    // 地点数据来源表
    const SOURCES = [
        ['home',   '_MAP_DATA_HOME',   '🏡 家园周围'],
        ['park',   '_MAP_DATA_PARK',   '🌳 街心公园'],
        ['street', '_MAP_DATA_STREET', '🛍️ 商业街'],
        ['river',  '_MAP_DATA_RIVER',  '🌊 河边'],
    ];

    const missing = [];

    for (const [key, dataKey, label] of SOURCES) {
        const data = Cake[dataKey];
        if (!data || typeof data !== 'object') {
            console.error(`❌ [Town] 未读取到 ${dataKey}（${label}），请检查对应文件是否加载或报错！`);
            missing.push(dataKey);
            continue;
        }
        // 只在数据合法时覆盖，避免 undefined 混入
        Cake.REGION_TOWN[key] = data;
    }

    console.log(
        '🏘️ [Town] 城镇字典装载完毕:',
        Object.keys(Cake.REGION_TOWN),
        missing.length ? `（缺失: ${missing.join(', ')}）` : ''
    );
})();
