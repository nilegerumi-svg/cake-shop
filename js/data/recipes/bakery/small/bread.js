// js/data/recipes/bakery/small/bread.js
(function () {
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_SMALL_BREAD = {
        'bread:milk_toast': {
            name: '牛奶吐司',
            skill: 'bakery',
            size: 'small',
            energy: 6,
            ing: { flour_high: 2, sugar: 1, chicken_egg: 1, milk: 1, butter: 1, yeast: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 50,
                minSkillLevel: 1,
                minRecipeProf: 3,
                perfectTools: []
            },
            output: {
                type: 'food', key: 'bread:milk_toast',
                attrs: { flavor: { sweet: 30 }, texture: { chewy: 50, tender: 40 } }
            }
        },

        'bread:butter_roll': {
            name: '黄油餐包',
            skill: 'bakery',
            size: 'small',
            energy: 7,
            ing: { flour_high: 1, sugar: 1, chicken_egg: 1, milk: 1, butter: 2, yeast: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 55,
                minSkillLevel: 2,
                minRecipeProf: 4,
                perfectTools: []
            },
            output: {
                type: 'food', key: 'bread:butter_roll',
                attrs: { flavor: { sweet: 40 }, texture: { tender: 60, fatty: 30 } }
            }
        }
    };
})();
