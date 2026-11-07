// js/data/recipes/China_reciped/home_cooking_more.js
// 补充家常菜谱：覆盖此前没有食谱的食材（牛肉/和牛/伊比利亚猪/土豆/黄瓜/菠菜/上海青/洋葱/胡萝卜/白萝卜/木耳/
// 皮蛋/鸭蛋/鹌鹑蛋/鱿鱼/金枪鱼/黑米/小米/绿豆/挂面/蒜苗/玉米面等）
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_CHINA_HOME_MORE = {
        'dish:braised_beef': {
            name: '红烧牛肉',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 18,
            ing: { beef: 3, ginger: 1, garlic: 1, scallion: 1, star_anise: 1, soy_sauce_light: 1, soy_sauce_dark: 1, sugar: 1, cooking_wine: 1, oil: 1, msg: 1 },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: { minIngredientQuality: 55, minSkillLevel: 2, minRecipeProf: 5, perfectTools: ['claypot'] },
            output: { type: 'food', key: 'dish:braised_beef', attrs: { flavor: { umami: 60, salty: 40, sweet: 20 }, texture: { tender: 60, fatty: 20 } } }
        },
        'dish:seared_wagyu': {
            name: '香煎和牛',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 20,
            ing: { wagyu: 2, salt: 1, oil: 1, garlic: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 65, minSkillLevel: 3, minRecipeProf: 6, perfectTools: ['wok_iron_big'] },
            output: { type: 'food', key: 'dish:seared_wagyu', attrs: { flavor: { umami: 70, salty: 20 }, texture: { fatty: 70, tender: 50 } } }
        },
        'dish:iberico_char_siu': {
            name: '伊比利亚叉烧',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 19,
            ing: { iberico: 3, soy_sauce_light: 1, soy_sauce_dark: 1, sugar: 2, ginger: 1, garlic: 1 },
            tools: [{ tech: 'roast', role: 'required' }],
            qualityReq: { minIngredientQuality: 60, minSkillLevel: 2, minRecipeProf: 5, perfectTools: ['roast_oven'] },
            output: { type: 'food', key: 'dish:iberico_char_siu', attrs: { flavor: { sweet: 50, umami: 50, salty: 20 }, texture: { fatty: 50, tender: 50 } } }
        },
        'dish:garlic_sprout_pork': {
            name: '蒜苗回锅肉',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 15,
            ing: { garlic_sprout: 3, pork_belly: 2, doubanjiang: 1, garlic: 1, oil: 1, soy_sauce_light: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 2, minRecipeProf: 4, perfectTools: [] },
            output: { type: 'food', key: 'dish:garlic_sprout_pork', attrs: { flavor: { umami: 50, spicy: 30, salty: 30 }, texture: { crispy: 30, fatty: 40 } } }
        },
        'dish:shredded_potato': {
            name: '醋溜土豆丝',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 12,
            ing: { potato: 3, vinegar: 1, garlic: 1, chili: 1, salt: 1, oil: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'dish:shredded_potato', attrs: { flavor: { sour: 40, salty: 20 }, texture: { crispy: 60 } } }
        },
        'dish:smashed_cucumber': {
            name: '拍黄瓜',
            skill: 'cook', cuisine: 'home', size: 'small', energy: 6,
            ing: { cucumber: 2, garlic: 2, vinegar: 1, salt: 1, sesame_oil: 1, chili: 1 },
            tools: [],
            qualityReq: { minIngredientQuality: 40, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:smashed_cucumber', attrs: { flavor: { sour: 30, salty: 30, spicy: 20 }, texture: { crispy: 70 } } }
        },
        'dish:stir_fried_spinach': {
            name: '蒜蓉菠菜',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 10,
            ing: { spinach: 3, garlic: 2, oil: 1, salt: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:stir_fried_spinach', attrs: { flavor: { umami: 30, salty: 20 }, texture: { tender: 50 } } }
        },
        'dish:bok_choy_egg': {
            name: '上汤上海青',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 11,
            ing: { bok_choy: 3, chicken_egg: 2, garlic: 1, salt: 1, oil: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'dish:bok_choy_egg', attrs: { flavor: { umami: 40, salty: 20 }, texture: { tender: 60 } } }
        },
        'dish:onion_egg': {
            name: '洋葱炒蛋',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 12,
            ing: { onion: 2, chicken_egg: 3, oil: 1, salt: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:onion_egg', attrs: { flavor: { sweet: 20, umami: 40 }, texture: { tender: 60 } } }
        },
        'dish:carrot_ribs_soup': {
            name: '胡萝卜排骨汤',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 15,
            ing: { carrot: 2, pork_ribs: 2, ginger: 1, salt: 1, scallion: 1 },
            tools: [{ tech: 'stew', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 2, minRecipeProf: 4, perfectTools: ['stone_pot'] },
            output: { type: 'food', key: 'dish:carrot_ribs_soup', attrs: { flavor: { umami: 60, sweet: 20 }, texture: { tender: 50, smooth: 40 } } }
        },
        'dish:radish_ribs_soup': {
            name: '白萝卜排骨汤',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 15,
            ing: { white_radish: 2, pork_ribs: 2, ginger: 1, salt: 1, scallion: 1 },
            tools: [{ tech: 'stew', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 2, minRecipeProf: 4, perfectTools: [] },
            output: { type: 'food', key: 'dish:radish_ribs_soup', attrs: { flavor: { umami: 60, sweet: 10 }, texture: { tender: 50, mushy: 30 } } }
        },
        'dish:wood_ear_pork': {
            name: '木耳炒肉',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 14,
            ing: { wood_ear: 2, pork_belly: 2, garlic: 1, oil: 1, soy_sauce_light: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'dish:wood_ear_pork', attrs: { flavor: { umami: 50, salty: 20 }, texture: { crispy: 50, fatty: 30 } } }
        },
        'dish:century_egg_congee': {
            name: '皮蛋瘦肉粥',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 13,
            ing: { century_egg: 1, japonica_rice: 1, pork_belly: 1, scallion: 1, salt: 1 },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 1, minRecipeProf: 3, perfectTools: ['claypot'] },
            output: { type: 'food', key: 'dish:century_egg_congee', attrs: { flavor: { umami: 50, salty: 20 }, texture: { mushy: 60, smooth: 40 } } }
        },
        'dish:duck_egg_stirfry': {
            name: '鸭蛋炒青椒',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 12,
            ing: { duck_egg: 2, green_pepper: 2, oil: 1, salt: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:duck_egg_stirfry', attrs: { flavor: { umami: 40, salty: 20 }, texture: { tender: 50, smooth: 30 } } }
        },
        'dish:braised_quail_egg': {
            name: '卤鹌鹑蛋',
            skill: 'cook', cuisine: 'home', size: 'small', energy: 8,
            ing: { quail_egg: 6, star_anise: 1, soy_sauce_light: 1, soy_sauce_dark: 1, sugar: 1, salt: 1 },
            tools: [{ tech: 'braise', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'dish:braised_quail_egg', attrs: { flavor: { umami: 40, salty: 30, sweet: 20 }, texture: { smooth: 60 } } }
        },
        'dish:stir_fried_squid': {
            name: '辣炒鱿鱼',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 15,
            ing: { squid: 2, chili: 2, garlic: 1, ginger: 1, oil: 1, salt: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 50, minSkillLevel: 2, minRecipeProf: 4, perfectTools: [] },
            output: { type: 'food', key: 'dish:stir_fried_squid', attrs: { flavor: { spicy: 50, umami: 40, salty: 20 }, texture: { chewy: 60 } } }
        },
        'dish:tuna_sashimi': {
            name: '金枪鱼刺身',
            skill: 'cook', cuisine: 'home', size: 'small', energy: 12,
            ing: { tuna: 2, soy_sauce_light: 1, sesame_oil: 1 },
            tools: [],
            qualityReq: { minIngredientQuality: 60, minSkillLevel: 2, minRecipeProf: 4, perfectTools: [] },
            output: { type: 'food', key: 'dish:tuna_sashimi', attrs: { flavor: { umami: 70, salty: 20 }, texture: { smooth: 60, tender: 40 } } }
        },
        'dish:black_rice_congee': {
            name: '黑米粥',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 11,
            ing: { black_rice: 2, sugar: 1, salt: 1 },
            tools: [{ tech: 'stew', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:black_rice_congee', attrs: { flavor: { sweet: 30 }, texture: { mushy: 60 } } }
        },
        'dish:millet_congee': {
            name: '小米粥',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 10,
            ing: { millet: 2, salt: 1 },
            tools: [{ tech: 'stew', role: 'required' }],
            qualityReq: { minIngredientQuality: 40, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:millet_congee', attrs: { flavor: { umami: 20 }, texture: { mushy: 60 } } }
        },
        'dish:mung_bean_soup': {
            name: '绿豆汤',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 9,
            ing: { mung_bean: 2, sugar: 1 },
            tools: [{ tech: 'stew', role: 'required' }],
            qualityReq: { minIngredientQuality: 40, minSkillLevel: 1, minRecipeProf: 2, perfectTools: [] },
            output: { type: 'food', key: 'dish:mung_bean_soup', attrs: { flavor: { sweet: 30 }, texture: { smooth: 50 } } }
        },
        'dish:scallion_noodles': {
            name: '葱油拌面',
            skill: 'cook', cuisine: 'home', size: 'medium', energy: 13,
            ing: { noodles: 2, scallion: 2, soy_sauce_light: 1, sesame_oil: 1, oil: 1 },
            tools: [{ tech: 'stirfry', role: 'required' }],
            qualityReq: { minIngredientQuality: 45, minSkillLevel: 1, minRecipeProf: 3, perfectTools: [] },
            output: { type: 'food', key: 'dish:scallion_noodles', attrs: { flavor: { umami: 40, salty: 20 }, texture: { chewy: 60 } } }
        }
    };
})();
