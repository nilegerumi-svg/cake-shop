// js/data/recipes/China_reciped/cantonese/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_CANTONESE = {
        'dish:cantonese_roast_duck': {
            name: '广式烧鸭',
            skill: 'cook',
            cuisine: 'cantonese',
            size: 'medium',
            energy: 22,
            ing: {
                duck: 1,
                huangjiu: 1,
                sugar: 1,
                salt: 1,
                star_anise: 1,
                ginger: 1,
                oyster_sauce: 1
            },
            tools: [{ tech: 'roast', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 65,
                minSkillLevel: 3,
                minRecipeProf: 8,
                perfectTools: ['roast_oven']
            },
            output: {
                type: 'food', key: 'dish:cantonese_roast_duck',
                attrs: {
                    flavor: { umami: 60, sweet: 30, salty: 30 },
                    texture: { crispy: 70, fatty: 40 }
                }
            }
        },

        'dish:steamed_pomfret': {
            name: '清蒸鲳鱼',
            skill: 'cook',
            cuisine: 'cantonese',
            size: 'medium',
            energy: 15,
            ing: {
                silver_pomfret: 1,
                ginger: 2,
                scallion: 2,
                soy_sauce_light: 1,
                cooking_wine: 1,
                sesame_oil: 1,
                salt: 1
            },
            tools: [{ tech: 'steam', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 70,
                minSkillLevel: 3,
                minRecipeProf: 7,
                perfectTools: ['steamer_bamboo']
            },
            output: {
                type: 'food', key: 'dish:steamed_pomfret',
                attrs: {
                    flavor: { umami: 70, salty: 20 },
                    texture: { tender: 80 }
                }
            }
        }
    };
})();
