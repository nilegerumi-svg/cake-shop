window.Cake = window.Cake || {};

// 食材配置：顶层冻结，防止运行时误改价格或名称
window.Cake.INGREDIENTS = Object.freeze({
    flour:     { name: '面粉',   emoji: '🌾', price: 8  },
    egg:       { name: '鸡蛋',   emoji: '🥚', price: 12 },
    sugar:     { name: '糖',     emoji: '🍬', price: 6  },
    butter:    { name: '黄油',   emoji: '🧈', price: 18 },
    cream:     { name: '奶油',   emoji: '🍦', price: 22 },
    fruit:     { name: '水果',   emoji: '🍓', price: 28 },
    chocolate: { name: '巧克力', emoji: '🍫', price: 30 },
    nuts:      { name: '坚果',   emoji: '🥜', price: 25 },
});
