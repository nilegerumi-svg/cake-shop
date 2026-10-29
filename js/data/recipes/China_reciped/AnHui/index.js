// js/data/recipes/China_reciped/AnHui/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_ANHUI = {
        'dish:stinky_mandarin_fish': {
            name: '徽州臭鳜鱼',
            skill: 'cook',
            cuisine: 'anhui',
            size: 'medium',
            energy: 24,
            ing: {
                hairtail: 1,
                chili: 2,
                doubanjiang: 1,
                garlic: 2,
                ginger: 2,
                cooking_wine: 2,
                soy_sauce_dark: 1,
                oil: 2
            },
            tools: [{ tech: 'ferment', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 70,
                minSkillLevel: 4,
                minRecipeProf: 9,
                perfectTools: ['pickle_jar']
            },
            output: {
                type: 'food', key: 'dish:stinky_mandarin_fish',
                attrs: {
                    flavor: { umami: 80, spicy: 45, salty: 45 },
                    texture: { tender: 75, chewy: 30 }
                }
            }
        },

        'dish:stone_pot_chicken': {
            name: '石锅山菌鸡',
            skill: 'cook',
            cuisine: 'anhui',
            size: 'medium',
            energy: 20,
            ing: {
                chicken: 1,
                matsutake: 1,
                shiitake: 2,
                enoki: 1,
                ginger: 1,
                huangjiu: 1,
                salt: 1,
                scallion: 1
            },
            tools: [{ tech: 'stew', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 70,
                minSkillLevel: 3,
                minRecipeProf: 8,
                perfectTools: ['stone_pot']
            },
            output: {
                type: 'food', key: 'dish:stone_pot_chicken',
                attrs: {
                    flavor: { umami: 85, sweet: 15 },
                    texture: { tender: 70 }
                }
            }
        }
    };
})();
