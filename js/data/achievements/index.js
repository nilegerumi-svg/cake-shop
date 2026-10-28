(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    // 延迟取状态：只有真正调用 cond() 时才读 Cake.store，
    // 避免 data 模块加载阶段（core 尚未挂载 store）访问不到。
    const getState = () => {
        if (!Cake.store || !Cake.store.state) return null;
        return Cake.store.state;
    };

    const anyAffectionAtLeast = (threshold) => {
        const s = getState();
        if (!s || !s.characters || typeof s.characters !== 'object') return false;
        return Object.values(s.characters).some(
            (c) => c && Number.isFinite(Number(c.affection)) && Number(c.affection) >= threshold
        );
    };

    const LIST = [
        {
            id: 'firstSell', name: '第一桶金', desc: '卖出第一个蛋糕', icon: '💰',
            cond: () => { const s = getState(); return !!s && Number(s.totalCakes) >= 1; },
        },
        {
            id: 'star', name: '甜点新星', desc: '声望达到50', icon: '⭐',
            cond: () => { const s = getState(); return !!s && Number(s.reputation) >= 50; },
        },
        {
            id: 'fame', name: '名扬全城', desc: '声望达到150', icon: '🌟',
            cond: () => { const s = getState(); return !!s && Number(s.reputation) >= 150; },
        },
        {
            id: 'legend', name: '甜点传奇', desc: '声望达到350', icon: '👑',
            cond: () => { const s = getState(); return !!s && Number(s.reputation) >= 350; },
        },
        {
            id: 'allRecipes', name: '蛋糕图鉴全收集', desc: '解锁全部配方', icon: '📖',
            cond: () => {
                const s = getState();
                if (!s || !s.recipes || !Cake.RECIPES) return false;
                return Object.keys(s.recipes).length >= Object.keys(Cake.RECIPES).length;
            },
        },
        {
            id: 'rich', name: '富甲一方', desc: '资产达到10000', icon: '💎',
            cond: () => { const s = getState(); return !!s && Number(s.money) >= 10000; },
        },
        {
            id: 'heart', name: '心动时刻', desc: '某位角色好感达到50', icon: '💓',
            cond: () => anyAffectionAtLeast(50),
        },
        {
            id: 'lover', name: '甜蜜恋人', desc: '某位角色好感达到100', icon: '💍',
            cond: () => anyAffectionAtLeast(100),
        },
        {
            id: 'decor', name: '装修达人', desc: '装饰度达到30', icon: '🛋️',
            cond: () => { const s = getState(); return !!s && Number(s.decoration) >= 30; },
        },
        {
            id: 'shop5', name: '五星店铺', desc: '店铺升到5级', icon: '🏪',
            cond: () => { const s = getState(); return !!s && Number(s.shopLevel) >= 5; },
        },
        {
            id: 'day30', name: '百日纪念', desc: '经营满30天', icon: '📅',
            cond: () => { const s = getState(); return !!s && Number(s.day) >= 30; },
        },
    ];

    // 顶层数组 + 每个成就对象都冻结，cond 是函数，冻结不影响其调用
    window.Cake.ACHIEVEMENTS = Object.freeze(LIST.map(Object.freeze));
})();
