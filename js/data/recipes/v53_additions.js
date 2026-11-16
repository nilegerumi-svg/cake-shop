// js/data/recipes/v53_additions.js
// 【第三批移植 · v53 新增配方】
// 来源：甜蜜物语-离线版-v53.html 框架区物品对照表 ge（window.__TM_ITEM_MAP__ 的源）。
// 仓库 RECIPES_GAME（merged_for_game.js）中这 8 道完全缺失，v53 带完整配方数据。
// 本文件只挂一个独立键 RECIPES_GAME_V53，由 js/data/index.js 在所有模块装载
// 完毕后统一并入 RECIPES_GAME；并行加载不保证顺序，故不在此处直接 assign。
// 接线原则与仓库一致：数据放 js/data/，bundle 直读 window.Cake，不设适配层。
// 只新增、绝不覆盖任何既有配方。
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_GAME_V53 = {
  "cashew_cake": {
    "id": "cashew_cake",
    "name": "腰果奶油蛋糕",
    "emoji": "🍰",
    "ings": {
      "flour": 2,
      "cashew_powder": 1,
      "cream": 2,
      "eggs": 2,
      "sugar": 2
    },
    "baseCost": 135,
    "unlockCost": 200,
    "bakeCost": 14,
    "shelfDays": 3,
    "size": "medium",
    "taste": "nutty",
    "category": "cake",
    "desc": "腰果粉替进面糊，再铺满整粒腰果慢烤，双重奶香。绵密不腻，配咖啡是柜台的隐藏王牌。"
  },
  "peanut_cookie": {
    "id": "peanut_cookie",
    "name": "花生酥",
    "emoji": "🍘",
    "ings": {
      "flour": 2,
      "peanut": 1,
      "peanut_powder": 1,
      "butter": 1,
      "sugar": 2,
      "eggs": 1
    },
    "baseCost": 96,
    "unlockCost": 150,
    "bakeCost": 10,
    "shelfDays": 7,
    "size": "small",
    "taste": "nutty",
    "category": "snack",
    "cookwarePerfect": "cw_pro_oven",
    "desc": "烤香的花生连粉带粒揉进面团，压出花纹慢火烤酥。老字号点心铺的看家货，一掰就簌簌掉渣。"
  },
  "almond_cookie": {
    "id": "almond_cookie",
    "name": "杏仁曲奇",
    "emoji": "🥠",
    "ings": {
      "flour": 2,
      "butter": 2,
      "almond_powder": 2,
      "sugar": 1
    },
    "baseCost": 123,
    "unlockCost": 180,
    "bakeCost": 11,
    "shelfDays": 6,
    "size": "small",
    "taste": "nutty",
    "category": "snack",
    "cookwarePerfect": "cw_pro_oven",
    "desc": "杏仁粉替换部分面粉，烤出格外酥松的曲奇。一口咬下杏仁香直冲鼻腔，配红茶是下午茶顶配。"
  },
  "macaron": {
    "id": "macaron",
    "name": "马卡龙",
    "emoji": "🌈",
    "ings": {
      "almond_powder": 2,
      "sugar": 2,
      "eggs": 2
    },
    "baseCost": 111,
    "unlockCost": 220,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "small",
    "taste": "sweet",
    "category": "dessert",
    "cookwarePerfect": "cw_pro_oven",
    "desc": "杏仁粉打发烤出圆润的裙边，两片夹起云朵般的夹心。色彩缤纷的小圆饼，是甜柜台的门面担当。"
  },
  "walnut_bread": {
    "id": "walnut_bread",
    "name": "核桃面包",
    "emoji": "🍞",
    "ings": {
      "flour": 2,
      "walnut": 1,
      "walnut_powder": 1,
      "milk": 1,
      "sugar": 1
    },
    "baseCost": 80,
    "unlockCost": 150,
    "bakeCost": 12,
    "shelfDays": 4,
    "size": "medium",
    "taste": "nutty",
    "category": "bread",
    "desc": "核桃仁与核桃粉双重入面团，慢烤出深浅两种坚果香。外皮脆香、内里湿润，切片厚吃最过瘾。"
  },
  "pistachio_icecream": {
    "id": "pistachio_icecream",
    "name": "开心果冰淇淋",
    "emoji": "🍨",
    "ings": {
      "milk": 2,
      "cream": 2,
      "pistachio_powder": 2,
      "sugar": 2
    },
    "baseCost": 173,
    "unlockCost": 210,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "creamy",
    "category": "icecream",
    "cookware": "cw_blender",
    "desc": "浅绿果浆旋进冰淇淋，坚果香清贵不甜腻。入口先是奶油滑，后味是开心果的悠长回香。"
  },
  "scone_cuisine": {
    "id": "scone_cuisine",
    "name": "英式司康",
    "emoji": "🫓",
    "ings": {
      "flour": 2,
      "milk": 1,
      "eggs": 1,
      "butter": 1
    },
    "baseCost": 59,
    "unlockCost": 160,
    "bakeCost": 8,
    "shelfDays": 1,
    "size": "small",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "british",
    "cookware": "cw_oven",
    "giftNpc": "shen_jiahe",
    "desc": "英式下午茶的标配，黄油搓入面粉快烤而成。外皮微脆内里酥松，对半掰开抹奶油果酱最正宗。"
  },
  "tiramisu_cuisine": {
    "id": "tiramisu_cuisine",
    "name": "提拉米苏",
    "emoji": "🍰",
    "ings": {
      "eggs": 2,
      "cream": 2,
      "coffee_bean": 1,
      "sugar": 2
    },
    "baseCost": 122,
    "unlockCost": 400,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "medium",
    "taste": "bitter",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "cookware": "cw_blender",
    "giftNpc": "shen_jiaoyan",
    "desc": "意大利语意为「带我走」。手指饼干浸咖啡液，与马斯卡彭奶酪糊层层交叠，冷藏后撒上可可粉。入口即化，酒香与咖啡香交织。"
  }
};

    console.log('📖 [Recipes/v53] 已装载', Object.keys(window.Cake.RECIPES_GAME_V53).length, '道新增配方');
})();
