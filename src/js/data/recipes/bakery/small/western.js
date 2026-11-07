// js/data/recipes/bakery/small/western.js
// 补充西点食谱：覆盖此前没有食谱的食材（苹果/柠檬/菠萝/芝士/玉米面/红薯/琼脂/小苏打）
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_SMALL_WESTERN = {
        'cake:apple_pie': {
            name: '苹果派',
            skill: 'bakery',
            size: 'small',
            energy: 12,
            ing: { apple: 3, flour_low: 2, sugar: 1, butter: 1, chicken_egg: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'cake:apple_pie', attrs: { flavor: { sweet: 60, sour: 20 }, texture: { crispy: 50, tender: 40 } } }
        },
        'cake:lemon_tart': {
            name: '柠檬塔',
            skill: 'bakery',
            size: 'small',
            energy: 10,
            ing: { lemon: 2, sugar: 2, butter: 1, flour_low: 1, chicken_egg: 2 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 55, minSkillLevel: 2, minRecipeProf: 4, perfectTools: [] },
            output: { type: 'food', key: 'cake:lemon_tart', attrs: { flavor: { sour: 70, sweet: 40 }, texture: { crispy: 40, smooth: 50 } } }
        },
        'cake:pineapple_tart': {
            name: '菠萝挞',
            skill: 'bakery',
            size: 'small',
            energy: 11,
            ing: { pineapple: 2, sugar: 1, butter: 1, flour_low: 2 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'cake:pineapple_tart', attrs: { flavor: { sweet: 50, sour: 40 }, texture: { crispy: 40, tender: 50 } } }
        },
        'cake:cheesecake': {
            name: '纽约芝士蛋糕',
            skill: 'bakery',
            size: 'small',
            energy: 14,
            ing: { cheese: 2, cream: 1, chicken_egg: 2, sugar: 1, flour_low: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 60, minSkillLevel: 2, minRecipeProf: 5, perfectTools: ['freezer'] },
            output: { type: 'food', key: 'cake:cheesecake', attrs: { flavor: { sweet: 50, umami: 20 }, texture: { smooth: 70, tender: 40 } } }
        },
        'cake:corn_muffin': {
            name: '玉米马芬',
            skill: 'bakery',
            size: 'small',
            energy: 8,
            ing: { corn: 2, flour_low: 1, milk: 1, sugar: 1, chicken_egg: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'cake:corn_muffin', attrs: { flavor: { sweet: 50, umami: 10 }, texture: { mushy: 40, tender: 50 } } }
        },
        'bread:sweet_potato_roll': {
            name: '红薯软欧包',
            skill: 'bakery',
            size: 'small',
            energy: 12,
            ing: { sweet_potato: 2, flour_high: 2, milk: 1, butter: 1, yeast: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 2, minRecipeProf: 4, perfectTools: [] },
            output: { type: 'food', key: 'bread:sweet_potato_roll', attrs: { flavor: { sweet: 50 }, texture: { chewy: 50, mushy: 30 } } }
        },
        'bread:soda_cracker': {
            name: '苏打饼干',
            skill: 'bakery',
            size: 'small',
            energy: 6,
            ing: { flour_low: 2, baking_soda: 1, butter: 1, salt: 1, milk: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: { minIngredientQuality: 40, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'bread:soda_cracker', attrs: { flavor: { salty: 30 }, texture: { crispy: 70 } } }
        },
        'dessert:fruit_jelly': {
            name: '水果果冻',
            skill: 'bakery',
            size: 'small',
            energy: 6,
            ing: { agar: 1, apple: 1, lemon: 1, sugar: 1 },
            tools: [{ tech: 'freeze', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dessert:fruit_jelly', attrs: { flavor: { sweet: 50, sour: 30 }, texture: { smooth: 80 } } }
        }
    };
})();
