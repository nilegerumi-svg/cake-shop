// js/actions/entertainment/index.js
// 顶层 await：保证地图、休息、散步、商店子模块装载完毕后，娱乐系统才对外可用
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
        const mod = await import(path);
        // 地图与休息模块导出就绪 Promise，需要真正等它们完成挂载
        const ready = mod && (mod.mapReady || mod.restReady);
        if (ready && typeof ready.then === 'function') {
            try { await ready; } catch (err) {
                console.warn(`⚠️ [Entertainment] 子模块初始化未完成 -> ${path}`, err && err.message);
            }
        }
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

// 顶层 await 不允许 return，改用条件分支保留原有守卫语义
if (!Cake) {
    console.warn('⚠️ [娱乐系统] 未找到 Cake，跳过 Entertainment 挂载');
} else if (Cake.__entertainmentLoaded) {
    console.log('🎮 [娱乐系统] 已加载，跳过重复初始化');
} else {
    Cake.__entertainmentLoaded = true;

    Cake.Entertainment = {
        get rest()          { return Cake.rest; },
        get sleep()         { return Cake.sleep; },
        get nap()           { return Cake.nap; },
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
}
