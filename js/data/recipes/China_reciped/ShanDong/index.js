// js/data/recipes/China_reciped/ShanDong/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_SHANDONG = {
        'dish:sweet_sour_carp': {
            name: '糖醋鲤鱼',
            skill: 'cook',
            cuisine: 'shandong',
            size: 'medium',
            energy: 18,
            ing: {
                carp: 1,
                sugar: 2,
                vinegar: 2,
                starch: 2,
                salt: 1,
                ginger: 1,
                garlic: 1,
                oil: 2
            },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 60,
                minSkillLevel: 3,
                minRecipeProf: 7,
                perfectTools: ['wok_iron_big']
            },
            output: {
                type: 'food', key: 'dish:sweet_sour_carp',
                attrs: {
                    flavor: { sour: 70, sweet: 70, umami: 30 },
                    texture: { crispy: 60, tender: 50 }
                }
            }
        },

        'dish:scallion_lamb': {
            name: '葱爆羊肉',
            skill: 'cook',
            cuisine: 'shandong',
            size: 'medium',
            energy: 16,
            ing: {
                lamb: 2,
                scallion: 3,
                ginger: 1,
                soy_sauce_dark: 1,
                huangjiu: 1,
                salt: 1,
                oil: 2
            },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 65,
                minSkillLevel: 4,
                minRecipeProf: 9,
                perfectTools: ['wok_iron_big']
            },
            output: {
                type: 'food', key: 'dish:scallion_lamb',
                attrs: {
                    flavor: { umami: 60, salty: 40 },
                    texture: { tender: 70 }
                }
            }
        }
    };
})();
