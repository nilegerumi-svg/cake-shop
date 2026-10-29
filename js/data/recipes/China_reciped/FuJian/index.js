// js/data/recipes/China_reciped/FuJian/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_FUJIAN = {
        'dish:buddha_jumps_over_wall': {
            name: '佛跳墙',
            skill: 'cook',
            cuisine: 'fujian',
            size: 'large',
            energy: 40,
            ing: {
                shrimp: 2,
                clam: 2,
                chicken: 1,
                matsutake: 2,
                shiitake: 2,
                pigeon: 1,
                huangjiu: 2,
                ginger: 1,
                salt: 1
            },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 85,
                minSkillLevel: 5,
                minRecipeProf: 15,
                perfectTools: ['jar_fotiaoqiang']
            },
            output: {
                type: 'food', key: 'dish:buddha_jumps_over_wall',
                attrs: {
                    flavor: { umami: 95, sweet: 20 },
                    texture: { tender: 90, smooth: 50 }
                }
            }
        },

        'dish:shrimp_balls': {
            name: '闽南虾丸汤',
            skill: 'cook',
            cuisine: 'fujian',
            size: 'medium',
            energy: 16,
            ing: {
                shrimp: 3,
                starch: 1,
                chicken_egg: 1,
                lettuce: 1,
                ginger: 1,
                salt: 1
            },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: {
                minIngredientQuality: 65,
                minSkillLevel: 3,
                minRecipeProf: 6,
                perfectTools: ['claypot']
            },
            output: {
                type: 'food', key: 'dish:shrimp_balls',
                attrs: {
                    flavor: { umami: 65, sweet: 20, salty: 25 },
                    texture: { chewy: 65, smooth: 40 }
                }
            }
        }
    };
})();
