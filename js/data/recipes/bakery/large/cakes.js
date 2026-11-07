// js/data/recipes/bakery/large/cakes.js
(function () {
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_LARGE_CAKES = {
        'cake:wedding': {
            name: '三层定制婚礼蛋糕',
            skill: 'bakery',
            size: 'large', // 👈 核心修复：必须加上这个大尺寸标签！
            energy: 50,
            ing: { flour_low: 10, sugar: 10, chicken_egg: 10, milk: 5, butter: 5, cream: 10, strawberry: 10 },
            tools: [
                { tech: 'bake', role: 'required' },
                { tech: 'freeze', role: 'required' },
                { id: 'mixer', role: 'required' }
            ],
            qualityReq: {
                minIngredientQuality: 85,
                minSkillLevel: 5,
                minRecipeProf: 20,
                perfectTools: ['stencil', 'large_oven']
            },
            output: {
                type: 'food', key: 'cake:wedding',
                attrs: { flavor: { sweet: 90 }, texture: { tender: 90, smooth: 90 } }
            }
        }
    };
})();
