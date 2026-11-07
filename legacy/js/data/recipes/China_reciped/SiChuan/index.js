// js/data/recipes/China_reciped/SiChuan/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_SICHUAN = {
        'dish:mapo_tofu': {
            name: '麻婆豆腐',
            skill: 'cook',
            cuisine: 'sichuan',
            size: 'medium',
            energy: 12,
            ing: {
                soybean: 2,
                pork_belly: 1,
                doubanjiang: 1,
                chili: 2,
                sichuan_pepper: 1,
                garlic: 1,
                scallion: 1,
                starch: 1,
                oil: 1
            },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 50,
                minSkillLevel: 2,
                minRecipeProf: 4,
                perfectTools: ['pickle_jar']
            },
            output: {
                type: 'food', key: 'dish:mapo_tofu',
                attrs: {
                    flavor: { spicy: 80, numbing: 70, umami: 40, salty: 30 },
                    texture: { smooth: 60, tender: 40 }
                }
            }
        },

        'dish:fish_flavored_eggplant': {
            name: '鱼香茄子',
            skill: 'cook',
            cuisine: 'sichuan',
            size: 'medium',
            energy: 14,
            ing: {
                eggplant: 3,
                pork_belly: 1,
                chili: 2,
                garlic: 2,
                ginger: 1,
                sugar: 1,
                vinegar: 1,
                soy_sauce_light: 1,
                starch: 1,
                oil: 2
            },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 55,
                minSkillLevel: 3,
                minRecipeProf: 6,
                perfectTools: ['wok_iron_big']
            },
            output: {
                type: 'food', key: 'dish:fish_flavored_eggplant',
                attrs: {
                    flavor: { spicy: 50, sour: 40, sweet: 40, umami: 30 },
                    texture: { mushy: 50, tender: 40 }
                }
            }
        }
    };
})();
