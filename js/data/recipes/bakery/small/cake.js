// js/data/recipes/bakery/small/cakes.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_SMALL_CAKES = {
        'cake:muffin': {
            name: '经典麦芬蛋糕',
            skill: 'bakery',
            energy: 5,
            ing: { flour_low: 1, sugar: 1, chicken_egg: 1, milk: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            // 四维品质门槛
            qualityReq: {
                minIngredientQuality: 50, // 食材品质
                minSkillLevel: 1,         // 厨艺熟练度
                minRecipeProf: 3,         // 配方熟练度
                perfectTools: []          // 工具（无需特定神器）
            },
            output: {
                type: 'food', key: 'cake:muffin',
                attrs: { flavor: { sweet: 60 }, texture: { tender: 70 } }
            }
        },
        'cake:cupcake': {
            name: '奶油纸杯蛋糕',
            skill: 'bakery',
            energy: 8,
            ing: { flour_low: 1, sugar: 1, chicken_egg: 1, butter: 1, cream: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 60,
                minSkillLevel: 2,
                minRecipeProf: 5,
                perfectTools: []
            },
            output: {
                type: 'food', key: 'cake:cupcake',
                attrs: { flavor: { sweet: 80 }, texture: { tender: 60, smooth: 80 } }
            }
        }
    };
})();
