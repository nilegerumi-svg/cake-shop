// js/data/outfits/index.js（可购买/穿着的服装）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.OUTFITS = [
    {
        "id": "o_dress_elegant",
        "name": "优雅连衣裙",
        "emoji": "👗",
        "slot": "dress",
        "price": 300,
        "charm": 8,
        "desc": "低调优雅的日常款",
        "gender": "female"
    },
    {
        "id": "o_dress_suit",
        "name": "淑女套装",
        "emoji": "💃",
        "slot": "dress",
        "price": 800,
        "charm": 14,
        "desc": "全场目光的焦点",
        "gender": "female"
    },
    {
        "id": "o_dress_retro",
        "name": "复古洋装",
        "emoji": "🎀",
        "slot": "dress",
        "price": 1200,
        "charm": 18,
        "desc": "复古风满满的洋装",
        "gender": "female"
    },
    {
        "id": "o_dress_lace",
        "name": "蕾丝纱裙",
        "emoji": "👰",
        "slot": "dress",
        "price": 2000,
        "charm": 24,
        "desc": "轻盈梦幻的纱裙",
        "gender": "female"
    },
    {
        "id": "o_dress_ball",
        "name": "晚宴礼裙",
        "emoji": "✨",
        "slot": "dress",
        "price": 3200,
        "charm": 32,
        "desc": "宴会上的绝对主角",
        "gender": "female"
    },
    {
        "id": "o_top_apron",
        "name": "甜点围裙",
        "emoji": "👩‍🍳",
        "slot": "top",
        "price": 0,
        "charm": 2,
        "desc": "开店必备的围裙"
    },
    {
        "id": "o_top_shirt",
        "name": "泡泡袖衬衫",
        "emoji": "👚",
        "slot": "top",
        "price": 180,
        "charm": 5,
        "desc": "甜美可爱的衬衫"
    },
    {
        "id": "o_top_knit",
        "name": "奶油针织衫",
        "emoji": "🧶",
        "slot": "top",
        "price": 360,
        "charm": 9,
        "desc": "软乎乎的针织上衣"
    },
    {
        "id": "o_top_silk",
        "name": "真丝衬衫",
        "emoji": "🦢",
        "slot": "top",
        "price": 700,
        "charm": 14,
        "desc": "顺滑有光泽的丝绸"
    },
    {
        "id": "o_top_tshirt",
        "name": "纯棉T恤",
        "emoji": "👕",
        "slot": "top",
        "price": 120,
        "charm": 3,
        "desc": "日常百搭的纯棉T恤"
    },
    {
        "id": "o_top_polo",
        "name": "翻领Polo衫",
        "emoji": "🏌️",
        "slot": "top",
        "price": 260,
        "charm": 6,
        "desc": "精神利落的翻领上衣",
        "gender": "male"
    },
    {
        "id": "o_bottom_home",
        "name": "家常短裤",
        "emoji": "🩳",
        "slot": "bottom",
        "price": 0,
        "charm": 1,
        "desc": "开店初始自带的舒适短裤"
    },
    {
        "id": "o_bottom_skirt",
        "name": "百褶短裙",
        "emoji": "👗",
        "slot": "bottom",
        "price": 150,
        "charm": 4,
        "desc": "转起来很好看的短裙",
        "gender": "female"
    },
    {
        "id": "o_bottom_pants",
        "name": "休闲长裤",
        "emoji": "👖",
        "slot": "bottom",
        "price": 220,
        "charm": 5,
        "desc": "干活方便的日常裤"
    },
    {
        "id": "o_bottom_long",
        "name": "及踝长裙",
        "emoji": "🌾",
        "slot": "bottom",
        "price": 450,
        "charm": 9,
        "desc": "摇曳生姿的长裙",
        "gender": "female"
    },
    {
        "id": "o_bottom_wide",
        "name": "阔腿裤",
        "emoji": "🕶️",
        "slot": "bottom",
        "price": 650,
        "charm": 12,
        "desc": "潇洒利落的阔腿裤"
    },
    {
        "id": "o_bottom_chino",
        "name": "卡其长裤",
        "emoji": "👖",
        "slot": "bottom",
        "price": 380,
        "charm": 8,
        "desc": "挺括耐穿的卡其裤",
        "gender": "male"
    },
    {
        "id": "o_coat_vest",
        "name": "甜点师马甲",
        "emoji": "🧥",
        "slot": "coat",
        "price": 450,
        "charm": 10,
        "desc": "专业感十足的马甲"
    },
    {
        "id": "o_coat_cardigan",
        "name": "开衫毛衣",
        "emoji": "🧶",
        "slot": "coat",
        "price": 400,
        "charm": 9,
        "desc": "温柔的开衫外套"
    },
    {
        "id": "o_coat_trench",
        "name": "经典风衣",
        "emoji": "🧥",
        "slot": "coat",
        "price": 900,
        "charm": 15,
        "desc": "走路带风的风衣"
    },
    {
        "id": "o_coat_wool",
        "name": "羊毛大衣",
        "emoji": "🧣",
        "slot": "coat",
        "price": 1500,
        "charm": 20,
        "desc": "冬天最暖的外套"
    },
    {
        "id": "o_coat_hoodie",
        "name": "连帽卫衣",
        "emoji": "🧢",
        "slot": "coat",
        "price": 280,
        "charm": 7,
        "desc": "宽松舒服的连帽卫衣"
    },
    {
        "id": "o_coat_blazer",
        "name": "英伦西装外套",
        "emoji": "🤵",
        "slot": "coat",
        "price": 1200,
        "charm": 18,
        "desc": "挺括有型的西装外套",
        "gender": "male"
    },
    {
        "id": "o_socks_white",
        "name": "白棉袜",
        "emoji": "🧦",
        "slot": "socks",
        "price": 0,
        "charm": 1,
        "desc": "干净的白色棉袜"
    },
    {
        "id": "o_socks_lace",
        "name": "蕾丝花边袜",
        "emoji": "🎀",
        "slot": "socks",
        "price": 80,
        "charm": 2,
        "desc": "精致的花边袜",
        "gender": "female"
    },
    {
        "id": "o_socks_wool",
        "name": "羊毛袜",
        "emoji": "🧦",
        "slot": "socks",
        "price": 120,
        "charm": 3,
        "desc": "软糯保暖的羊毛袜"
    },
    {
        "id": "o_shoes_flat",
        "name": "舒适平底鞋",
        "emoji": "👟",
        "slot": "shoes",
        "price": 0,
        "charm": 2,
        "desc": "站一天也不累的平底鞋"
    },
    {
        "id": "o_shoes_pumps",
        "name": "浅口单鞋",
        "emoji": "👠",
        "slot": "shoes",
        "price": 250,
        "charm": 5,
        "desc": "优雅的浅口单鞋",
        "gender": "female"
    },
    {
        "id": "o_shoes_boots",
        "name": "小短靴",
        "emoji": "🥾",
        "slot": "shoes",
        "price": 450,
        "charm": 8,
        "desc": "利落帅气的小短靴"
    },
    {
        "id": "o_shoes_heel",
        "name": "高跟鞋",
        "emoji": "👠",
        "slot": "shoes",
        "price": 600,
        "charm": 10,
        "desc": "气场全开的高跟鞋",
        "gender": "female"
    },
    {
        "id": "o_shoes_sneakers",
        "name": "小白鞋",
        "emoji": "👟",
        "slot": "shoes",
        "price": 320,
        "charm": 7,
        "desc": "清爽百搭的运动小白鞋",
        "gender": "male"
    },
    {
        "id": "o_umbrella_plain",
        "name": "素色雨伞",
        "emoji": "☂️",
        "slot": "umbrella",
        "price": 0,
        "charm": 1,
        "desc": "普普通通但很实用"
    },
    {
        "id": "o_umbrella_dots",
        "name": "波点雨伞",
        "emoji": "🌂",
        "slot": "umbrella",
        "price": 100,
        "charm": 3,
        "desc": "俏皮的波点伞"
    },
    {
        "id": "o_umbrella_lace",
        "name": "蕾丝伞",
        "emoji": "👒",
        "slot": "umbrella",
        "price": 280,
        "charm": 6,
        "desc": "遮阳又遮雨的蕾丝伞",
        "gender": "female"
    },
    {
        "id": "o_umbrella_paper",
        "name": "油纸伞",
        "emoji": "🏮",
        "slot": "umbrella",
        "price": 380,
        "charm": 8,
        "desc": "古风满满的油纸伞"
    },
    {
        "id": "o_hand_bow",
        "name": "蝴蝶结手链",
        "emoji": "🎀",
        "slot": "handwear",
        "price": 350,
        "charm": 6,
        "desc": "甜美的蝴蝶结手链"
    },
    {
        "id": "o_hand_silver",
        "name": "银手镯",
        "emoji": "🥈",
        "slot": "handwear",
        "price": 450,
        "charm": 8,
        "desc": "素雅的银手镯"
    },
    {
        "id": "o_hand_pearl",
        "name": "珍珠手链",
        "emoji": "📿",
        "slot": "handwear",
        "price": 600,
        "charm": 9,
        "desc": "温润的珍珠手链",
        "gender": "female"
    },
    {
        "id": "o_hand_rose",
        "name": "玫瑰手链",
        "emoji": "🌹",
        "slot": "handwear",
        "price": 900,
        "charm": 13,
        "desc": "优雅的玫瑰手链",
        "gender": "female"
    },
    {
        "id": "o_hand_watch",
        "name": "复古腕表",
        "emoji": "⌚",
        "slot": "handwear",
        "price": 520,
        "charm": 10,
        "desc": "沉稳大气的腕表",
        "gender": "male"
    },
    {
        "id": "o_belt_ribbon",
        "name": "缎带腰带",
        "emoji": "🎀",
        "slot": "belt",
        "price": 150,
        "charm": 4,
        "desc": "系出纤细腰身",
        "gender": "female"
    },
    {
        "id": "o_belt_chain",
        "name": "链条腰带",
        "emoji": "⛓️",
        "slot": "belt",
        "price": 300,
        "charm": 7,
        "desc": "时尚的链条腰带"
    },
    {
        "id": "o_belt_pearl",
        "name": "珍珠腰带",
        "emoji": "🫧",
        "slot": "belt",
        "price": 550,
        "charm": 11,
        "desc": "华美的珍珠腰带",
        "gender": "female"
    },
    {
        "id": "o_belt_leather",
        "name": "牛皮腰带",
        "emoji": "🪢",
        "slot": "belt",
        "price": 280,
        "charm": 6,
        "desc": "结实的牛皮腰带",
        "gender": "male"
    },
    {
        "id": "o_head_pin",
        "name": "草莓发卡",
        "emoji": "🍓",
        "slot": "headwear",
        "price": 120,
        "charm": 3,
        "desc": "甜甜的草莓发卡"
    },
    {
        "id": "o_head_hat",
        "name": "贝雷帽",
        "emoji": "🎩",
        "slot": "headwear",
        "price": 250,
        "charm": 5,
        "desc": "文艺范的贝雷帽"
    },
    {
        "id": "o_head_flower",
        "name": "花环发饰",
        "emoji": "🌸",
        "slot": "headwear",
        "price": 350,
        "charm": 7,
        "desc": "别一朵小花在发间",
        "gender": "female"
    },
    {
        "id": "o_head_crown",
        "name": "水晶发箍",
        "emoji": "👑",
        "slot": "headwear",
        "price": 480,
        "charm": 9,
        "desc": "闪闪发光的水晶发箍",
        "gender": "female"
    },
    {
        "id": "o_head_cap",
        "name": "棒球帽",
        "emoji": "🧢",
        "slot": "headwear",
        "price": 180,
        "charm": 4,
        "desc": "遮阳又帅气的棒球帽",
        "gender": "male"
    },
    {
        "id": "o_bag_cross",
        "name": "斜挎小包",
        "emoji": "👝",
        "slot": "bag",
        "price": 280,
        "charm": 5,
        "desc": "小巧的斜挎包"
    },
    {
        "id": "o_bag_tote",
        "name": "帆布托特包",
        "emoji": "👜",
        "slot": "bag",
        "price": 350,
        "charm": 6,
        "desc": "能装很多点心的托特包"
    },
    {
        "id": "o_bag_hand",
        "name": "手提包",
        "emoji": "💼",
        "slot": "bag",
        "price": 600,
        "charm": 9,
        "desc": "精致的手提包"
    },
    {
        "id": "o_bag_clutch",
        "name": "晚宴手包",
        "emoji": "🌙",
        "slot": "bag",
        "price": 900,
        "charm": 14,
        "desc": "晚宴必备的手拿包",
        "gender": "female"
    },
    {
        "id": "o_bag_backpack",
        "name": "双肩包",
        "emoji": "🎒",
        "slot": "bag",
        "price": 420,
        "charm": 8,
        "desc": "能装能背的双肩包",
        "gender": "male"
    },
    {
        "id": "o_raincoat_clear",
        "name": "透明雨衣",
        "emoji": "🧊",
        "slot": "raincoat",
        "price": 150,
        "charm": 3,
        "desc": "下雨天也不怕"
    },
    {
        "id": "o_raincoat_yellow",
        "name": "小黄雨衣",
        "emoji": "🐤",
        "slot": "raincoat",
        "price": 220,
        "charm": 4,
        "desc": "童趣的小黄雨衣"
    },
    {
        "id": "o_raincoat_pink",
        "name": "樱花雨衣",
        "emoji": "🌸",
        "slot": "raincoat",
        "price": 350,
        "charm": 7,
        "desc": "粉嫩的樱花雨衣",
        "gender": "female"
    },
    {
        "id": "o_under_basic",
        "name": "基础内衣",
        "emoji": "👙",
        "slot": "underwear",
        "price": 0,
        "charm": 1,
        "desc": "干净贴身的基础内衣",
        "gender": "unisex"
    },
    {
        "id": "o_under_sport",
        "name": "运动背心",
        "emoji": "🎽",
        "slot": "underwear",
        "price": 120,
        "charm": 3,
        "desc": "透气吸汗的运动背心，男女皆宜",
        "gender": "unisex"
    },
    {
        "id": "o_under_lace",
        "name": "蕾丝胸罩",
        "emoji": "🎀",
        "slot": "underwear",
        "price": 220,
        "charm": 4,
        "desc": "精致柔美的蕾丝胸罩",
        "gender": "female"
    },
    {
        "id": "o_pants_basic",
        "name": "基础内裤",
        "emoji": "🩲",
        "slot": "underpants",
        "price": 0,
        "charm": 1,
        "desc": "干净舒适的纯棉内裤",
        "gender": "unisex"
    },
    {
        "id": "o_pants_sport",
        "name": "运动短裤",
        "emoji": "🩳",
        "slot": "underpants",
        "price": 100,
        "charm": 2,
        "desc": "透气利落的运动内搭短裤",
        "gender": "unisex"
    },
    {
        "id": "o_pants_lace",
        "name": "蕾丝内裤",
        "emoji": "💗",
        "slot": "underpants",
        "price": 150,
        "charm": 3,
        "desc": "精致可爱的蕾丝内裤",
        "gender": "female"
    },
    {
        "id": "o_stall_tshirt",
        "name": "地摊印花T恤",
        "emoji": "👕",
        "slot": "top",
        "price": 12,
        "charm": 1,
        "desc": "夜市地摊货，印花洗几次就掉，胜在便宜",
        "gender": "unisex"
    },
    {
        "id": "o_stall_sandals",
        "name": "塑料凉鞋",
        "emoji": "🩴",
        "slot": "shoes",
        "price": 8,
        "charm": 1,
        "desc": "地摊塑料凉鞋，雨天不怕湿，穿坏不心疼",
        "gender": "unisex"
    },
    {
        "id": "o_stall_strawhat",
        "name": "草编帽",
        "emoji": "👒",
        "slot": "headwear",
        "price": 15,
        "charm": 1,
        "desc": "地摊草编帽，老板自己戴着当活招牌",
        "gender": "unisex"
    },
    {
        "id": "o_stall_handkerchief",
        "name": "花手帕",
        "emoji": "🧣",
        "slot": "handwear",
        "price": 10,
        "charm": 1,
        "desc": "老印花的花手帕，叠得整整齐齐",
        "gender": "unisex"
    },
    {
        "id": "o_stall_socks",
        "name": "卡通短袜",
        "emoji": "🧦",
        "slot": "socks",
        "price": 8,
        "charm": 1,
        "desc": "一捆一捆卖的卡通短袜，小孩最爱",
        "gender": "unisex"
    },
    {
        "id": "o_stall_sweater",
        "name": "起球旧毛衣",
        "emoji": "🧶",
        "slot": "coat",
        "price": 30,
        "charm": 2,
        "desc": "起球的旧毛衣，便宜是便宜，穿出去谁认得",
        "gender": "unisex"
    },
    {
        "id": "o_stall_jeans",
        "name": "大码旧牛仔",
        "emoji": "👖",
        "slot": "bottom",
        "price": 25,
        "charm": 2,
        "desc": "看着旧，洗洗就是新样子",
        "gender": "unisex"
    },
    {
        "id": "o_stall_slippers",
        "name": "荧光塑料拖鞋",
        "emoji": "🩴",
        "slot": "shoes",
        "price": 10,
        "charm": 1,
        "desc": "夜里特别亮眼的荧光拖鞋",
        "gender": "unisex"
    }
];
})();
