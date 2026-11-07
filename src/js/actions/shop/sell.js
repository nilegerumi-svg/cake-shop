// js/actions/shop/sell.js —— 售卖系统聚合入口
// 顶层 await：确保顾客自动售卖与手动售卖子模块挂载完毕
try {
    await import('./sell/customer.js');
} catch (err) {
    console.warn('⚠️ [Actions/Shop] 顾客售卖子模块加载失败:', err && err.message);
}

try {
    await import('./sell/manual.js');
} catch (err) {
    console.warn('⚠️ [Actions/Shop] 手动售卖子模块加载失败:', err && err.message);
}

console.log('🛒 [Actions/Shop] 售卖系统（顾客/手动/白名单）装载完毕');