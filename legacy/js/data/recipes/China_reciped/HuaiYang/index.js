// js/data/recipes/China_reciped/HuaiYang/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_HUAIYANG = {
        'dish:lion_head_meatball': {
            name: '清炖狮子头',
            skill: 'cook',
            cuisine: 'huaiyang',
            size: 'medium',
            energy: 20,
            ing: {
                pork_belly: 3,
                chicken_egg: 1,
                cabbage: 2,
                shiitake: 1,
                starch: 1,
                ginger: 1,
                scallion: 1,
                salt: 1
            },
            tools: [{ tech: 'steam', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 65,
                minSkillLevel: 3,
                minRecipeProf: 8,
                perfectTools: ['steamer_bamboo']
            },
            output: {
                type: 'food', key: 'dish:lion_head_meatball',
                attrs: {
                    flavor: { umami: 70, salty: 25 },
                    texture: { tender: 85, smooth: 40 }
                }
            }
        },

        'dish:crab_soup': {
            name: '文思蟹粉羹',
            skill: 'cook',
            cuisine: 'huaiyang',
            size: 'medium',
            energy: 24,
            ing: {
                crab: 2,
                enoki: 1,
                shiitake: 1,
                chicken: 1,
                starch: 2,
                ginger: 1,
                chicken_egg: 1,
                salt: 1
            },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 75,
                minSkillLevel: 4,
                minRecipeProf: 10,
                perfectTools: ['claypot_yixing']
            },
            output: {
                type: 'food', key: 'dish:crab_soup',
                attrs: {
                    flavor: { umami: 85, sweet: 20 },
                    texture: { smooth: 80 }
                }
            }
        }
    };
})();
