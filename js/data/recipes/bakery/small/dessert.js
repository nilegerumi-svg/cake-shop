// js/data/recipes/bakery/small/dessert.js
(function () {
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_SMALL_DESSERT = {
        'dessert:egg_tart': {
            name: '葡式蛋挞',
            skill: 'bakery',
            size: 'small',
            energy: 8,
            ing: { flour_low: 1, chicken_egg: 2, milk: 1, cream: 1, sugar: 1, butter: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 55,
                minSkillLevel: 2,
                minRecipeProf: 5,
                perfectTools: []
            },
            output: {
                type: 'food', key: 'dessert:egg_tart',
                attrs: { flavor: { sweet: 70 }, texture: { crispy: 40, smooth: 60 } }
            }
        },

        'dessert:milk_pudding': {
            name: '牛奶布丁',
            skill: 'bakery',
            size: 'small',
            energy: 5,
            ing: { milk: 2, chicken_egg: 1, sugar: 1, gelatin: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 50,
                minSkillLevel: 1,
                minRecipeProf: 2,
                perfectTools: ['freezer']
            },
            output: {
                type: 'food', key: 'dessert:milk_pudding',
                attrs: { flavor: { sweet: 60 }, texture: { smooth: 80, mushy: 30 } }
            }
        },

        'dessert:strawberry_daifuku': {
            name: '草莓大福',
            skill: 'bakery',
            size: 'small',
            energy: 6,
            ing: { glutinous_rice: 2, sugar: 1, strawberry: 2, red_bean: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 60,
                minSkillLevel: 2,
                minRecipeProf: 6,
                perfectTools: []
            },
            output: {
                type: 'food', key: 'dessert:strawberry_daifuku',
                attrs: { flavor: { sweet: 75, sour: 20 }, texture: { chewy: 80, smooth: 50 } }
            }
        }
    };
})();
