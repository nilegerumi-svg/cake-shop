// js/data/ingredients/nuts_v53.js
// 【移植补缺 · v53 坚果与坚果粉】
// 背景：第三批移植的 8 道 v53 新增配方里，有 6 道用到了 cashew_powder / peanut /
//   peanut_powder / almond_powder / walnut / walnut_powder / pistachio_powder，
//   而仓库的食材表（INGREDIENTS_GAME）里根本没有这 10 个 id —— 缺料导致这 6 道
//   配方永远做不出来（烘焙入口会判「食材不足」），加工台也没有磨粉选项。
// 来源：甜蜜物语-离线版-v53.html 框架区物品对照表，字段（price / shelfLife /
//   season / category / source / desc）逐字沿用，未做任何调参。
// 结构：原果 5 项（category: nut）可被杂货店直接进货；粉末 5 项带 source:"process"，
//   不进杂货店，只能由加工台的「磨xx粉」配方产出（见 js/src/shop/fishing-allergen.js）。
// 接线：js/data/index.js 在全部模块装载完毕后并入 INGREDIENTS_GAME，只新增不覆盖。
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.INGREDIENTS_GAME_NUTS = {
        peanut: {
            id: 'peanut',
            name: '花生',
            emoji: '🥜',
            price: 9,
            shelfLife: 40,
            season: 'all',
            category: 'nut',
            desc: '焙香后碾碎特别香，点心的脆口担当',
        },
        walnut: {
            id: 'walnut',
            name: '核桃',
            emoji: '🌰',
            price: 12,
            shelfLife: 45,
            season: 'all',
            category: 'nut',
            desc: '烘焙坚果之王，烤后油润回甘',
        },
        almond: {
            id: 'almond',
            name: '杏仁',
            emoji: '🫘',
            price: 15,
            shelfLife: 40,
            season: 'all',
            category: 'nut',
            desc: '可整粒可磨粉，西点灵魂坚果',
        },
        cashew: {
            id: 'cashew',
            name: '腰果',
            emoji: '🌙',
            price: 16,
            shelfLife: 35,
            season: 'all',
            category: 'nut',
            desc: '月牙形的油润坚果，奶香十足',
        },
        pistachio: {
            id: 'pistachio',
            name: '开心果',
            emoji: '🫒',
            price: 24,
            shelfLife: 30,
            season: 'all',
            category: 'nut',
            desc: '裂口浅绿的高档坚果，自带优雅',
        },
        peanut_powder: {
            id: 'peanut_powder',
            name: '花生粉',
            emoji: '🥜',
            price: 16,
            shelfLife: 25,
            season: 'all',
            category: 'processed',
            source: 'process',
            desc: '焙香花生磨的细粉，油润喷香',
        },
        walnut_powder: {
            id: 'walnut_powder',
            name: '核桃粉',
            emoji: '🌰',
            price: 20,
            shelfLife: 25,
            season: 'all',
            category: 'processed',
            source: 'process',
            desc: '核桃仁低温研磨，果香浓郁',
        },
        almond_powder: {
            id: 'almond_powder',
            name: '杏仁粉',
            emoji: '🥣',
            price: 26,
            shelfLife: 25,
            season: 'all',
            category: 'processed',
            source: 'process',
            desc: '细腻西点杏仁粉，酥松的关键',
        },
        cashew_powder: {
            id: 'cashew_powder',
            name: '腰果粉',
            emoji: '🌙',
            price: 24,
            shelfLife: 25,
            season: 'all',
            category: 'processed',
            source: 'process',
            desc: '奶香腰果磨的细粉，香滑温柔',
        },
        pistachio_powder: {
            id: 'pistachio_powder',
            name: '开心果粉',
            emoji: '🫒',
            price: 36,
            shelfLife: 20,
            season: 'all',
            category: 'processed',
            source: 'process',
            desc: '浅绿果仁磨成的贵族粉',
        },
    };
})();
