(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    // 成就判定都要读实时状态，抽一个 getter 少写重复代码
    const getState = () => Cake.store.state;

    // 是否有任意角色好感达到阈值
    const anyAffectionAtLeast = (threshold) =>
        Object.values(getState().characters).some((c) => c.affection >= threshold);

    window.Cake.ACHIEVEMENTS = Object.freeze([
        {
            id: 'firstSell', name: '第一桶金', desc: '卖出第一个蛋糕', icon: '💰',
            cond: () => getState().totalCakes >= 1,
        },
        {
            id: 'star', name: '甜点新星', desc: '声望达到50', icon: '⭐',
            cond: () => getState().reputation >= 50,
        },
        {
            id: 'fame', name: '名扬全城', desc: '声望达到150', icon: '🌟',
            cond: () => getState().reputation >= 150,
        },
        {
            id: 'legend', name: '甜点传奇', desc: '声望达到350', icon: '👑',
            cond: () => getState().reputation >= 350,
        },
        {
            id: 'allRecipes', name: '蛋糕图鉴全收集', desc: '解锁全部配方', icon: '📖',
            cond: () => Object.keys(getState().recipes).length >= Object.keys(Cake.RECIPES).length,
        },
        {
            id: 'rich', name: '富甲一方', desc: '资产达到10000', icon: '💎',
            cond: () => getState().money >= 10000,
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
            cond: () => getState().decoration >= 30,
        },
        {
            id: 'shop5', name: '五星店铺', desc: '店铺升到5级', icon: '🏪',
            cond: () => getState().shopLevel >= 5,
        },
        {
            id: 'day30', name: '百日纪念', desc: '经营满30天', icon: '📅',
            cond: () => getState().day >= 30,
        },
    ].map((achievement) => Object.freeze(achievement)));
})();
