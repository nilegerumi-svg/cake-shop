// 由新版概念版迁入（旧版 schema）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_LARGE_IMPORTED = {
        'layer_cake': { name: '千层蛋糕', skill: 'bakery', size: 'large', energy: 18, ing: {flour_low: 3, chicken_egg: 3, cream: 3, sugar: 2, milk: 2}, tools: [], qualityReq: { minIngredientQuality: 60, minSkillLevel: 3, minRecipeProf: 6, perfectTools: ["oven_pro"] }, output: { type: 'food', key: 'layer_cake', attrs: {flavor: {sweet: 30, umami: 20}, texture: {smooth: 60, fatty: 20}} } },
        'wedding_cake': { name: '婚礼蛋糕', skill: 'bakery', size: 'large', energy: 18, ing: {flour_low: 3, chicken_egg: 3, cream: 3, sugar: 2, strawberry: 2}, tools: [], qualityReq: { minIngredientQuality: 60, minSkillLevel: 3, minRecipeProf: 6, perfectTools: ["oven_pro"] }, output: { type: 'food', key: 'wedding_cake', attrs: {flavor: {sweet: 30, umami: 20}, texture: {smooth: 60, fatty: 20}} } },
    };
})();
