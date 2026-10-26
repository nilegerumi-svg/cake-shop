window.Cake = window.Cake || {};
window.Cake.ACHIEVEMENTS = [
    { id: 'firstSell',  name: '第一桶金',     desc: '卖出第一个蛋糕',        icon: '💰', cond: function () { return window.Cake.store.state.totalCakes >= 1; } },
    { id: 'star',       name: '甜点新星',     desc: '声望达到50',            icon: '⭐', cond: function () { return window.Cake.store.state.reputation >= 50; } },
    { id: 'fame',       name: '名扬全城',     desc: '声望达到150',           icon: '🌟', cond: function () { return window.Cake.store.state.reputation >= 150; } },
    { id: 'legend',     name: '甜点传奇',     desc: '声望达到350',           icon: '👑', cond: function () { return window.Cake.store.state.reputation >= 350; } },
    { id: 'allRecipes', name: '蛋糕图鉴全收集', desc: '解锁全部配方',        icon: '📖', cond: function () { return Object.keys(window.Cake.store.state.recipes).length >= Object.keys(window.Cake.RECIPES).length; } },
    { id: 'rich',       name: '富甲一方',     desc: '资产达到10000',         icon: '💎', cond: function () { return window.Cake.store.state.money >= 10000; } },
    { id: 'heart',      name: '心动时刻',     desc: '某位角色好感达到50',    icon: '💓', cond: function () { var ch = window.Cake.store.state.characters; for (var k in ch) if (ch[k].affection >= 50) return true; return false; } },
    { id: 'lover',      name: '甜蜜恋人',     desc: '某位角色好感达到100',   icon: '💍', cond: function () { var ch = window.Cake.store.state.characters; for (var k in ch) if (ch[k].affection >= 100) return true; return false; } },
    { id: 'decor',      name: '装修达人',     desc: '装饰度达到30',          icon: '🛋️', cond: function () { return window.Cake.store.state.decoration >= 30; } },
    { id: 'shop5',      name: '五星店铺',     desc: '店铺升到5级',           icon: '🏪', cond: function () { return window.Cake.store.state.shopLevel >= 5; } },
    { id: 'day30',      name: '百日纪念',     desc: '经营满30天',            icon: '📅', cond: function () { return window.Cake.store.state.day >= 30; } },
];