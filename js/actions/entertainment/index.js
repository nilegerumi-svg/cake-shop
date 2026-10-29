// js/actions/entertainment/index.js
(async () => {
    'use strict';
    console.log('🎮 [娱乐系统] 开始逐个加载子模块...');

    const ENT_MODULES = [
        './map/index.js',
        './common_events.js',
        './rest/index.js',
        './walk.js',
        './shop/index.js'
    ];

    for (const path of ENT_MODULES) {
        try {
            await import(path);
        } catch (err) {
            // 👈 终极报错放大镜：直接告诉你到底是谁路径不对/404了！
            console.warn(`⚠️ [Entertainment] 致命错误！子模块加载失败 -> ${path}`);
            console.warn(`原因: ${err.message}`);
        }
    }

    // ==== 下面是原有的挂载逻辑 ====
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

    Cake.Entertainment = {
        get rest()          { return Cake.rest; },
        get sleep()         { return Cake.sleep; },
        get walk()          { return Cake.walk; },
        get triggerRest()   { return Cake.triggerRest; },
        get locations()     { return Cake.LOCATIONS; },
        get regions()       { return Cake.REGIONS; },
        get actions()       { return Cake.ACTION_TYPES; },
        get events()        { return Cake.COMMON_WALK_EVENTS; },
        
        get townShops()     { return Cake.TOWN_SHOPS; },      
        get getShopItems()  { return Cake.getShopItems; },    
        get orderItem()     { return Cake.orderItem; }        
    };

    console.log('🎮 娱乐与外出系统（含地图商城）装载完毕');
})();
