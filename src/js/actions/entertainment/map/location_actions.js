// js/actions/entertainment/map/location_actions.js —— 地点系统聚合入口
// 顶层 await：确保地点查询与动作子模块挂载完毕
try {
    await import('./location_actions/query.js');
} catch (err) {
    console.warn('⚠️ [Map] 地点查询子模块加载失败:', err && err.message);
}

try {
    await import('./location_actions/actions.js');
} catch (err) {
    console.warn('⚠️ [Map] 地点动作子模块加载失败:', err && err.message);
}

console.log('🗺️ [Map] 地图区域与动作系统装载完毕');