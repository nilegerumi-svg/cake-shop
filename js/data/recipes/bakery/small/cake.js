// js/data/recipes/bakery/small/cakes.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_SMALL_CAKES = {
        'cake:muffin': {
            name: '经典麦芬蛋糕',
            skill: 'bakery',
            size: 'small', // 👈 必须加上这个！
            energy: 5,
            ing: { flour_low: 1, sugar: 1, chicken_egg: 1, milk: 1 },
            tools: [{ tech: 'bake', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 50, 
                minSkillLevel: 1,         
                minRecipeProf: 3,         
                perfectTools: []          
            },
            output: {
                type: 'food', key: 'cake:muffin',
                attrs: { flavor: { sweet: 60 }, texture: { tender: 70 } }
            }
        },
        'cake:cupcake': {
            name: '奶油纸杯蛋糕',
            skill: 'bakery',
            size: 'small', // 👈 这里也要加上！
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
