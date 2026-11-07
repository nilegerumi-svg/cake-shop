// js/data/recipes/China_reciped/HuNan/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_HUNAN = {
        'dish:hunan_stir_fry_pork': {
            name: '农家小炒肉',
            skill: 'cook',
            cuisine: 'hunan',
            size: 'medium',
            energy: 14,
            ing: {
                pork_belly: 2,
                green_pepper: 3,
                chili: 2,
                garlic: 2,
                doubanjiang: 1,
                soy_sauce_light: 1,
                cooking_wine: 1,
                oil: 2
            },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 55,
                minSkillLevel: 2,
                minRecipeProf: 5,
                perfectTools: ['wok_iron_big']
            },
            output: {
                type: 'food', key: 'dish:hunan_stir_fry_pork',
                attrs: {
                    flavor: { spicy: 75, salty: 40, umami: 40 },
                    texture: { tender: 60, fatty: 30 }
                }
            }
        },

        'dish:smoked_pork_with_bamboo': {
            name: '腊肉炒笋',
            skill: 'cook',
            cuisine: 'hunan',
            size: 'medium',
            energy: 18,
            ing: {
                pork_ribs: 2,
                lettuce: 1,
                chili: 2,
                garlic: 1,
                ginger: 1,
                soy_sauce_dark: 1,
                cooking_wine: 1,
                oil: 1
            },
            tools: [{ tech: 'smoke', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 65,
                minSkillLevel: 3,
                minRecipeProf: 8,
                perfectTools: ['smoke_rack']
            },
            output: {
                type: 'food', key: 'dish:smoked_pork_with_bamboo',
                attrs: {
                    flavor: { spicy: 45, umami: 70, salty: 45 },
                    texture: { chewy: 55, crispy: 30 }
                }
            }
        }
    };
})();
