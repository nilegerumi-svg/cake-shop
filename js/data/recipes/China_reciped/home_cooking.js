// js/data/recipes/China_reciped/home_cooking.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_HOME = {
        
        // 1. 番茄炒蛋（新手必学）
        'dish:tomato_egg': {
            name: '番茄炒蛋',
            skill: 'cook',       // 👈 对应料理技能
            cuisine: 'home',     // 家常菜系
            size: 'medium',      // 按盘子大小算，一盘够吃一顿
            energy: 10,
            ing: { 
                tomato: 2, 
                chicken_egg: 3, 
                salt: 1, 
                oil: 1 
            },
            tools: [
                { tech: 'stirfry', role: 'required' } // 需要炒（stirfry）技法，炒锅正好带这个技法
            ],
            qualityReq: {
                minIngredientQuality: 40,
                minSkillLevel: 1,
                minRecipeProf: 2,
                perfectTools: []
            },
            output: {
                type: 'food', key: 'dish:tomato_egg',
                attrs: { 
                    flavor: { sour: 40, umami: 30, salty: 20 }, 
                    texture: { tender: 60 } 
                }
            }
        },

        // 2. 黄金蛋炒饭（消耗米饭）
        'dish:egg_fried_rice': {
            name: '黄金蛋炒饭',
            skill: 'cook',
            cuisine: 'home',
            size: 'medium',
            energy: 15,
            ing: { 
                japonica_rice: 1, // 东北粳米
                chicken_egg: 2, 
                scallion: 1,      // 大葱
                salt: 1, 
                oil: 1 
            },
            tools: [
                { tech: 'stirfry', role: 'required' }
            ],
            qualityReq: {
                minIngredientQuality: 50,
                minSkillLevel: 2,
                minRecipeProf: 5,
                perfectTools: ['wok_iron_big'] // 想要完美品质？得去买鲁菜大铁锅！
            },
            output: {
                type: 'food', key: 'dish:egg_fried_rice',
                attrs: { 
                    flavor: { umami: 40, salty: 20 }, 
                    texture: { crispy: 30, tender: 40 } 
                }
            }
        }
    };
})();
