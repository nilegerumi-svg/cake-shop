window.Cake = window.Cake || {};

(() => {
    'use strict';

    // 深冻结：虽然当前每项都是扁平对象，但统一用 deepFreeze 防未来加嵌套字段
    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    window.Cake.INGREDIENTS = deepFreeze({
        flour:     { name: '面粉',   emoji: '🌾', price: 8  },
        egg:       { name: '鸡蛋',   emoji: '🥚', price: 12 },
        sugar:     { name: '糖',     emoji: '🍬', price: 6  },
        butter:    { name: '黄油',   emoji: '🧈', price: 18 },
        cream:     { name: '奶油',   emoji: '🍦', price: 22 },
        fruit:     { name: '水果',   emoji: '🍓', price: 28 },
        chocolate: { name: '巧克力', emoji: '🍫', price: 30 },
        nuts:      { name: '坚果',   emoji: '🥜', price: 25 },
    });
})();
