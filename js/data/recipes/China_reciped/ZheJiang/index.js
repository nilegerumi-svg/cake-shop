// js/data/recipes/China_reciped/ZheJiang/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_ZHEJIANG = {
        'dish:dongpo_pork': {
            name: '东坡肉',
            skill: 'cook',
            cuisine: 'zhejiang',
            size: 'medium',
            energy: 22,
            ing: {
                pork_belly: 3,
                huangjiu: 3,
                sugar: 2,
                soy_sauce_dark: 2,
                ginger: 2,
                scallion: 2,
                star_anise: 1
            },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 70,
                minSkillLevel: 4,
                minRecipeProf: 9,
                perfectTools: ['claypot_yixing']
            },
            output: {
                type: 'food', key: 'dish:dongpo_pork',
                attrs: {
                    flavor: { sweet: 60, umami: 65, salty: 40 },
                    texture: { tender: 85, fatty: 50 }
                }
            }
        },

        'dish:west_lake_fish': {
            name: '西湖醋鱼',
            skill: 'cook',
            cuisine: 'zhejiang',
            size: 'medium',
            energy: 18,
            ing: {
                carp: 1,
                vinegar: 2,
                sugar: 2,
                ginger: 2,
                soy_sauce_light: 1,
                starch: 1,
                cooking_wine: 1
            },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 75,
                minSkillLevel: 3,
                minRecipeProf: 8,
                perfectTools: ['claypot']
            },
            output: {
                type: 'food', key: 'dish:west_lake_fish',
                attrs: {
                    flavor: { sour: 80, sweet: 55, umami: 35 },
                    texture: { tender: 80 }
                }
            }
        }
    };
})();
