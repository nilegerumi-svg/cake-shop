// js/data/recipes/bakery/medium/cakes.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_MEDIUM_CAKES = {
        'cake:black_forest_6': {
            name: '6寸黑森林蛋糕',
            skill: 'bakery',
            energy: 20,
            ing: { flour_low: 2, sugar: 2, chicken_egg: 2, milk: 1, cherry: 3, chocolate: 2, cream: 1 },
            tools: [
                { tech: 'bake', role: 'required' },
                { id: 'mixer', role: 'bonus' }
            ],
            qualityReq: {
                minIngredientQuality: 70,
                minSkillLevel: 3,
                minRecipeProf: 10,
                perfectTools: ['stencil'] // 必须有裱花嘴才能触发完美
            },
            output: {
                type: 'food', key: 'cake:black_forest_6',
                attrs: { flavor: { sweet: 70, bitter: 20 }, texture: { tender: 80, smooth: 70 } }
            }
        }
    };
})();
