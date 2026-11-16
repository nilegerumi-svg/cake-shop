// js/data/recipes/merged_for_game_part2.js
// merged_for_game.js 的后半张配方表：主表装载后追加（只新增、不覆盖，键序与原表一致）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPES_GAME = window.Cake.RECIPES_GAME || {};
    Object.assign(window.Cake.RECIPES_GAME, {
"tempura": {
    "id": "tempura",
    "name": "天妇罗拼盘",
    "emoji": "🍤",
    "ings": {
      "shrimp": 2,
      "flour": 2,
      "eggs": 1,
      "oil": 1
    },
    "baseCost": 108,
    "unlockCost": 280,
    "bakeCost": 13,
    "shelfDays": 1,
    "size": "medium",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "japanese",
    "bookId": "book_jp",
    "cookware": "cw_fryer",
    "desc": "海鲜与时蔬裹薄浆快炸，衣薄如蝉翼。炸物的巅峰美学，蘸汁趁热吃才不辜负。"
  },
  "miso_soup": {
    "id": "miso_soup",
    "name": "味噌汤",
    "emoji": "🍵",
    "ings": {
      "tofu": 1,
      "kelp": 1,
      "scallion": 1,
      "soy_sauce": 1
    },
    "baseCost": 42,
    "unlockCost": 120,
    "bakeCost": 9,
    "shelfDays": 2,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "japanese",
    "bookId": "book_jp",
    "cookware": "cw_pot",
    "desc": "味噌溶入高汤，豆腐海带轻煮。每天开场的暖胃汤，喝的是家的味道。"
  },
  "oden": {
    "id": "oden",
    "name": "关东煮",
    "emoji": "🍢",
    "ings": {
      "tofu": 2,
      "kelp": 1,
      "sausage": 1,
      "potato": 1,
      "soy_sauce": 1
    },
    "baseCost": 76,
    "unlockCost": 260,
    "bakeCost": 10,
    "shelfDays": 2,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "japanese",
    "cookware": "cw_pot",
    "giftNpc": "xu_xiaoman",
    "desc": "萝卜豆腐鱼丸在酱油高汤里慢煮入味。冬夜街边的暖意，一串热汤最抚人心。"
  },
  "bibimbap": {
    "id": "bibimbap",
    "name": "石锅拌饭",
    "emoji": "🥙",
    "ings": {
      "rice": 2,
      "meat": 1,
      "eggs": 1,
      "carrot": 1,
      "kimchi": 1
    },
    "baseCost": 82,
    "unlockCost": 210,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "korean",
    "bookId": "book_kr",
    "cookware": "cw_pan",
    "desc": "五彩蔬菜码在米饭上，加辣酱与煎蛋拌开。石锅的锅巴是灵魂，拌得越匀越香。"
  },
  "korean_fried_chicken": {
    "id": "korean_fried_chicken",
    "name": "韩式炸鸡",
    "emoji": "🍗",
    "ings": {
      "chicken": 2,
      "flour": 2,
      "chili": 1,
      "sugar": 1
    },
    "baseCost": 98,
    "unlockCost": 260,
    "bakeCost": 13,
    "shelfDays": 1,
    "size": "medium",
    "taste": "sweet",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "korean",
    "bookId": "book_kr",
    "cookware": "cw_fryer",
    "desc": "炸鸡裹甜辣酱，外皮酥脆挂汁。配剧神器，原味甜辣双拼更过瘾。"
  },
  "army_stew": {
    "id": "army_stew",
    "name": "部队锅",
    "emoji": "🥘",
    "ings": {
      "sausage": 2,
      "bacon": 1,
      "kimchi": 2,
      "tofu": 1,
      "pasta": 1
    },
    "baseCost": 118,
    "unlockCost": 360,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "korean",
    "cookware": "cw_pot",
    "giftNpc": "xu_xiaoman",
    "desc": "火腿泡菜香肠烩于一锅，拉面吸汤。咕嘟咕嘟煮开的热闹火锅，是食欲与气氛的双重满足。"
  },
  "naengmyeon": {
    "id": "naengmyeon",
    "name": "韩式冷面",
    "emoji": "🍜",
    "ings": {
      "pasta": 2,
      "eggs": 1,
      "kimchi": 1,
      "vinegar": 1,
      "cucumber": 1
    },
    "baseCost": 78,
    "unlockCost": 260,
    "bakeCost": 10,
    "shelfDays": 2,
    "size": "medium",
    "taste": "sour",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "korean",
    "cookware": "cw_pot",
    "giftNpc": "xu_xiaoman",
    "desc": "荞麦面冰镇后配牛肉清汤，醋辣酱调味。冰爽弹牙，是三伏天的救星。"
  },
  "kimchi_fried_rice": {
    "id": "kimchi_fried_rice",
    "name": "泡菜炒饭",
    "emoji": "🍛",
    "ings": {
      "rice": 2,
      "kimchi": 2,
      "bacon": 1,
      "scallion": 1
    },
    "baseCost": 66,
    "unlockCost": 220,
    "bakeCost": 9,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "korean",
    "cookware": "cw_wok",
    "giftNpc": "xu_xiaoman",
    "desc": "泡菜与米饭同炒，酸辣开胃。深夜食堂的标配，盖一颗溏心蛋就是圆满。"
  },
  "tom_yum": {
    "id": "tom_yum",
    "name": "冬阴功汤",
    "emoji": "🥣",
    "ings": {
      "shrimp": 2,
      "chili": 2,
      "lemon": 1,
      "onion": 1,
      "kelp": 1
    },
    "baseCost": 112,
    "unlockCost": 290,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "medium",
    "taste": "sour",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "thai",
    "bookId": "book_th",
    "cookware": "cw_pot",
    "desc": "柠檬叶、香茅与小米辣熬出酸辣汤底，鲜虾点题。一口酸辣直通灵魂，是泰餐的名片。"
  },
  "pineapple_fried_rice": {
    "id": "pineapple_fried_rice",
    "name": "泰式菠萝炒饭",
    "emoji": "🍍",
    "ings": {
      "rice": 2,
      "shrimp": 1,
      "pineapple": 2,
      "scallion": 1
    },
    "baseCost": 95,
    "unlockCost": 250,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "fruity",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "thai",
    "bookId": "book_th",
    "cookware": "cw_wok",
    "desc": "菠萝挖壳盛炒饭，果肉与虾仁腰果同炒。热带风情装进果壳里，颜值即正义。"
  },
  "pad_thai": {
    "id": "pad_thai",
    "name": "泰式炒河粉",
    "emoji": "🍜",
    "ings": {
      "rice_noodle": 2,
      "shrimp": 2,
      "eggs": 1,
      "lime": 1,
      "scallion": 1
    },
    "baseCost": 96,
    "unlockCost": 320,
    "bakeCost": 11,
    "shelfDays": 2,
    "size": "medium",
    "taste": "sour",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "thai",
    "cookware": "cw_wok",
    "giftNpc": "tian_tian",
    "desc": "河粉与虾米豆腐干炒合，花生碎柠檬提味。街头小吃的王牌，酸甜咸辣一锅端。"
  },
  "green_curry": {
    "id": "green_curry",
    "name": "绿咖喱鸡",
    "emoji": "🍛",
    "ings": {
      "chicken": 2,
      "coconut_milk": 2,
      "lemongrass": 1,
      "chili": 1,
      "basil": 1
    },
    "baseCost": 112,
    "unlockCost": 360,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "thai",
    "cookware": "cw_pot",
    "giftNpc": "tian_tian",
    "desc": "青咖喱酱与椰浆同煮，鸡肉茄子入味。香料的辛与椰浆的甜互相成全，是泰式咖喱的温柔版。"
  },
  "mango_sticky_rice": {
    "id": "mango_sticky_rice",
    "name": "芒果糯米饭",
    "emoji": "🥭",
    "ings": {
      "rice": 2,
      "mango": 2,
      "coconut_milk": 1,
      "sugar": 1
    },
    "baseCost": 86,
    "unlockCost": 280,
    "bakeCost": 10,
    "shelfDays": 2,
    "size": "small",
    "taste": "sweet",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "thai",
    "cookware": "cw_steamer",
    "giftNpc": "tian_tian",
    "desc": "糯米蒸透淋椰浆，配熟芒果切片。甜糯与果香的双重奏，泰式甜品的顶流。"
  },
  "burger": {
    "id": "burger",
    "name": "香煎汉堡",
    "emoji": "🍔",
    "ings": {
      "flour": 2,
      "meat": 2,
      "cheese": 2,
      "tomato": 2
    },
    "baseCost": 88,
    "unlockCost": 210,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "american",
    "bookId": "book_foreign",
    "cookware": "cw_pan",
    "desc": "牛肉饼煎出焦壳，夹生菜番茄与酱料。快餐形态之王，多汁是底线。"
  },
  "cheeseburger": {
    "id": "cheeseburger",
    "name": "芝士汉堡",
    "emoji": "🍔",
    "ings": {
      "meat": 2,
      "flour": 2,
      "cheese": 1,
      "tomato": 1
    },
    "baseCost": 96,
    "unlockCost": 320,
    "bakeCost": 11,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "american",
    "cookware": "cw_pan",
    "giftNpc": "tian_tian",
    "desc": "芝士片在热肉饼上融化拉丝，咸香加倍。点单率常年第一的美式经典。"
  },
  "grilled_steak": {
    "id": "grilled_steak",
    "name": "香烤牛排",
    "emoji": "🥩",
    "ings": {
      "meat": 3,
      "butter": 1,
      "pepper": 1,
      "garlic": 1
    },
    "baseCost": 125,
    "unlockCost": 320,
    "bakeCost": 14,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "american",
    "bookId": "book_us",
    "cookware": "cw_grill",
    "cookwarePerfect": "cw_grill",
    "desc": "厚切牛排高温封汁，滋滋作响。静置回汁后切开，粉嫩的断面是火候的勋章。"
  },
  "bbq_ribs": {
    "id": "bbq_ribs",
    "name": "烧烤肋排",
    "emoji": "🍖",
    "ings": {
      "meat": 3,
      "honey": 2,
      "chili": 1,
      "garlic": 1
    },
    "baseCost": 138,
    "unlockCost": 400,
    "bakeCost": 14,
    "shelfDays": 2,
    "size": "large",
    "taste": "sweet",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "american",
    "cookware": "cw_grill",
    "giftNpc": "tian_tian",
    "desc": "猪肋排低温慢烤，蜜汁酱挂壳发亮。手撕脱骨的快感，是烧烤的终极浪漫。"
  },
  "fries": {
    "id": "fries",
    "name": "黄金薯条",
    "emoji": "🍟",
    "ings": {
      "potato": 3,
      "oil": 1
    },
    "baseCost": 38,
    "unlockCost": 100,
    "bakeCost": 9,
    "shelfDays": 2,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "american",
    "bookId": "book_us",
    "cookware": "cw_fryer",
    "desc": "土豆条炸两遍，外皮酥脆内里绵软。蘸番茄酱或蘸什么都好，是快餐世界的永恒配角。"
  },
  "corn_chowder": {
    "id": "corn_chowder",
    "name": "玉米浓汤",
    "emoji": "🥣",
    "ings": {
      "corn": 2,
      "cream": 1,
      "milk": 1,
      "potato": 1
    },
    "baseCost": 58,
    "unlockCost": 200,
    "bakeCost": 9,
    "shelfDays": 2,
    "size": "small",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "american",
    "cookware": "cw_pot",
    "giftNpc": "tian_tian",
    "desc": "玉米粒与培根熬进奶油汤，浓稠香甜。冷天喝一碗，从胃里暖起来。"
  },
  "fish_and_chips": {
    "id": "fish_and_chips",
    "name": "炸鱼薯条",
    "emoji": "🐟",
    "ings": {
      "crucian": 2,
      "flour": 2,
      "potato": 2,
      "oil": 1
    },
    "baseCost": 88,
    "unlockCost": 300,
    "bakeCost": 11,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "british",
    "cookware": "cw_fryer",
    "giftNpc": "shen_jiahe",
    "desc": "鳕鱼裹糊炸脆配粗薯条。报纸包着吃才够地道，淋点醋解腻是老规矩。"
  },
  "roast_beef": {
    "id": "roast_beef",
    "name": "英式烤牛肉",
    "emoji": "🥩",
    "ings": {
      "meat": 3,
      "potato": 2,
      "onion": 1,
      "garlic": 1
    },
    "baseCost": 132,
    "unlockCost": 380,
    "bakeCost": 14,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "british",
    "cookware": "cw_grill",
    "giftNpc": "shen_jiahe",
    "desc": "牛里脊整块烘烤，外层焦香内里粉嫩。周日餐桌的传统大菜，配烤土豆是标配。"
  },
  "shepherd_pie": {
    "id": "shepherd_pie",
    "name": "牧羊人派",
    "emoji": "🥧",
    "ings": {
      "meat": 2,
      "potato": 3,
      "onion": 1,
      "cheese": 1
    },
    "baseCost": 102,
    "unlockCost": 340,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "british",
    "cookware": "cw_oven",
    "giftNpc": "shen_jiahe",
    "desc": "肉末炖浓盖土豆泥焗烤，挖一勺有肉有菜。乡村人家的暖胃派，朴实的满足。"
  },
  "yorkshire_pudding": {
    "id": "yorkshire_pudding",
    "name": "约克郡布丁",
    "emoji": "🍮",
    "ings": {
      "flour": 2,
      "milk": 2,
      "eggs": 2
    },
    "baseCost": 52,
    "unlockCost": 180,
    "bakeCost": 9,
    "shelfDays": 1,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "british",
    "cookware": "cw_oven",
    "giftNpc": "shen_jiahe",
    "desc": "面糊进炉鼓成小碗，外脆内软。不是甜布丁，而是承装肉汁的咸点容器。"
  },
  "beef_bourguignon": {
    "id": "beef_bourguignon",
    "name": "红酒炖牛肉",
    "emoji": "🍷",
    "ings": {
      "meat": 3,
      "rice_wine": 1,
      "onion": 2,
      "carrot": 2,
      "potato": 2
    },
    "baseCost": 145,
    "unlockCost": 360,
    "bakeCost": 16,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "french",
    "bookId": "book_fr",
    "cookware": "cw_claypot",
    "cookwarePerfect": "cw_claypot",
    "desc": "牛肉与红酒慢炖数小时，肉酥汁醇。时间是最好的调料，锅盖一开满屋酒香。"
  },
  "french_onion_soup": {
    "id": "french_onion_soup",
    "name": "法式洋葱汤",
    "emoji": "🧅",
    "ings": {
      "onion": 3,
      "cheese": 1,
      "butter": 1,
      "flour": 1
    },
    "baseCost": 78,
    "unlockCost": 200,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "french",
    "bookId": "book_fr",
    "cookware": "cw_pot",
    "desc": "洋葱慢炒至焦糖化，炖汤盖芝士面包焗烤。芝士拉丝是仪式感，小酒馆的招牌。"
  },
  "french_escargot": {
    "id": "french_escargot",
    "name": "法式烤蜗牛",
    "emoji": "🐌",
    "ings": {
      "garlic": 2,
      "butter": 2,
      "basil": 1
    },
    "baseCost": 88,
    "unlockCost": 320,
    "bakeCost": 11,
    "shelfDays": 2,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "french",
    "cookware": "cw_oven",
    "cookwarePerfect": "cw_pro_oven",
    "giftNpc": "shen_jiaoyan",
    "desc": "蜗牛填蒜香黄油回炉焗烤。别怕，叉子专挑壳里的那口鲜，黄油蘸面包才是精髓。"
  },
  "provencal_ratatouille": {
    "id": "provencal_ratatouille",
    "name": "普罗旺斯炖菜",
    "emoji": "🍆",
    "ings": {
      "tomato": 3,
      "onion": 1,
      "garlic": 1,
      "basil": 1,
      "potato": 2
    },
    "baseCost": 86,
    "unlockCost": 300,
    "bakeCost": 11,
    "shelfDays": 2,
    "size": "medium",
    "taste": "fruity",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "french",
    "cookware": "cw_pot",
    "giftNpc": "shen_jiaoyan",
    "desc": "茄子西葫芦番茄慢炖，橄榄油与香草提味。南法的田园炖菜，配色像落日。"
  },
  "french_crepe": {
    "id": "french_crepe",
    "name": "法式可丽饼",
    "emoji": "🥞",
    "ings": {
      "flour": 2,
      "milk": 2,
      "eggs": 1,
      "honey": 1
    },
    "baseCost": 62,
    "unlockCost": 220,
    "bakeCost": 9,
    "shelfDays": 1,
    "size": "small",
    "taste": "sweet",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "french",
    "cookware": "cw_pan",
    "giftNpc": "shen_jiaoyan",
    "desc": "面糊摊成薄如蝉翼的饼皮，裹巧克力或糖浆。街头饼摊的甜咸两吃，卷起来边走边吃。"
  },
  "bratwurst_platter": {
    "id": "bratwurst_platter",
    "name": "德式香肠拼盘",
    "emoji": "🌭",
    "ings": {
      "sausage": 3,
      "potato": 2,
      "onion": 1,
      "cabbage": 1
    },
    "baseCost": 108,
    "unlockCost": 340,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "german",
    "cookware": "cw_pan",
    "giftNpc": "gu_yifan",
    "desc": "德式香肠煎至爆皮，配酸菜芥末酱。啤酒节的硬核吃法，肉香扎实管饱。"
  },
  "pork_knuckle": {
    "id": "pork_knuckle",
    "name": "德国猪肘",
    "emoji": "🍖",
    "ings": {
      "meat": 3,
      "garlic": 2,
      "honey": 1,
      "rice_wine": 1
    },
    "baseCost": 148,
    "unlockCost": 420,
    "bakeCost": 15,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "german",
    "cookware": "cw_grill",
    "giftNpc": "gu_yifan",
    "desc": "猪肘先煮后烤，外皮脆如薄冰、内里多汁。配一杯啤酒，就是节庆的仪式感。"
  },
  "sauerkraut_stew": {
    "id": "sauerkraut_stew",
    "name": "酸菜炖肉",
    "emoji": "🍲",
    "ings": {
      "meat": 2,
      "cabbage": 2,
      "bacon": 1,
      "potato": 2
    },
    "baseCost": 92,
    "unlockCost": 300,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "sour",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "german",
    "cookware": "cw_pot",
    "giftNpc": "gu_yifan",
    "desc": "发酵酸菜与猪肉慢炖，酸香解腻。德国家庭的冬日炖锅，越炖越有滋味。"
  },
  "potato_dumplings": {
    "id": "potato_dumplings",
    "name": "德式土豆丸子",
    "emoji": "🥔",
    "ings": {
      "potato": 3,
      "flour": 1,
      "eggs": 1
    },
    "baseCost": 62,
    "unlockCost": 220,
    "bakeCost": 9,
    "shelfDays": 2,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "german",
    "cookware": "cw_steamer",
    "giftNpc": "gu_yifan",
    "desc": "土豆泥搓丸水煮，Q 弹扎实。吸饱肉汁才是它的使命，主食里的温柔担当。"
  },
  "german_apple_pork": {
    "id": "german_apple_pork",
    "name": "德式苹果炖猪排",
    "emoji": "🍎",
    "ings": {
      "meat": 2,
      "apple": 2,
      "onion": 1,
      "rice_wine": 1
    },
    "baseCost": 108,
    "unlockCost": 340,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "fruity",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "german",
    "cookware": "cw_claypot",
    "giftNpc": "gu_yifan",
    "desc": "猪排煎香后与苹果同焖，果酸软化肉质。甜咸交织，是代代相传的私房味。"
  },
  "pasta": {
    "id": "pasta",
    "name": "番茄肉酱意面",
    "emoji": "🍝",
    "ings": {
      "pasta": 2,
      "meat": 2,
      "tomato": 3
    },
    "baseCost": 92,
    "unlockCost": 220,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "bookId": "book_foreign",
    "cookware": "cw_pot",
    "desc": "意面煮至弹牙，裹上慢熬番茄肉酱。家常的灵魂在于酱汁要能挂住每一根面条。"
  },
  "lasagna": {
    "id": "lasagna",
    "name": "芝士千层面",
    "emoji": "🍝",
    "ings": {
      "pasta": 2,
      "cheese": 2,
      "meat": 2,
      "tomato": 3
    },
    "baseCost": 138,
    "unlockCost": 340,
    "bakeCost": 15,
    "shelfDays": 2,
    "size": "large",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "bookId": "book_it",
    "cookware": "cw_oven",
    "cookwarePerfect": "cw_pro_oven",
    "desc": "面皮、肉酱与白酱层层交叠，芝士焗出焦壳。切开每层分明的断面，是妈妈们的骄傲。"
  },
  "italian_meatball": {
    "id": "italian_meatball",
    "name": "意式肉丸",
    "emoji": "🍡",
    "ings": {
      "meat": 2,
      "flour": 1,
      "eggs": 1,
      "tomato": 2
    },
    "baseCost": 92,
    "unlockCost": 230,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "bookId": "book_it",
    "cookware": "cw_pan",
    "desc": "牛肉丸揉入面包糠与芝士，炖进茄汁。弹牙多汁，配面配面包都合适。"
  },
  "italian_risotto": {
    "id": "italian_risotto",
    "name": "意式烩饭",
    "emoji": "🍚",
    "ings": {
      "rice": 2,
      "mushroom": 2,
      "butter": 1,
      "cheese": 1
    },
    "baseCost": 92,
    "unlockCost": 320,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "cookware": "cw_pot",
    "giftNpc": "shen_jiaoyan",
    "desc": "大米与高汤分次慢煮，搅出奶润质地。讲究米芯微韧，收尾撒芝士与黄油最香。"
  },
  "pizza": {
    "id": "pizza",
    "name": "芝士披萨",
    "emoji": "🍕",
    "ings": {
      "flour": 3,
      "cheese": 3,
      "tomato": 3,
      "meat": 2
    },
    "baseCost": 150,
    "unlockCost": 350,
    "bakeCost": 16,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "bookId": "book_foreign",
    "cookware": "cw_oven",
    "desc": "面饼铺番茄酱与芝士高温烤制，饼边微焦带孔洞。拉丝是它的礼貌，趁热吃是它的规矩。"
  },
  "margherita_pizza": {
    "id": "margherita_pizza",
    "name": "玛格丽特披萨",
    "emoji": "🍕",
    "ings": {
      "flour": 2,
      "tomato": 2,
      "cheese": 2,
      "basil": 1
    },
    "baseCost": 108,
    "unlockCost": 380,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "large",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "italian",
    "cookware": "cw_oven",
    "cookwarePerfect": "cw_pro_oven",
    "giftNpc": "shen_jiaoyan",
    "desc": "番茄、马苏里拉与罗勒，红白绿三色如国旗。为王后而生的极简款，经典永不过时。"
  },
  "paella": {
    "id": "paella",
    "name": "西班牙海鲜饭",
    "emoji": "🥘",
    "ings": {
      "rice": 2,
      "shrimp": 2,
      "sausage": 1,
      "tomato": 2,
      "lime": 1
    },
    "baseCost": 128,
    "unlockCost": 380,
    "bakeCost": 14,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "spanish",
    "cookware": "cw_pan",
    "giftNpc": "lin_xiaolu",
    "desc": "大平底锅焖饭，藏红花染出金黄，海鲜铺面。锅巴被当地人视为珍宝，铲锅底最抢手。"
  },
  "tortilla_espanola": {
    "id": "tortilla_espanola",
    "name": "西班牙土豆蛋饼",
    "emoji": "🍳",
    "ings": {
      "potato": 3,
      "eggs": 2,
      "onion": 1,
      "oil": 1
    },
    "baseCost": 62,
    "unlockCost": 220,
    "bakeCost": 9,
    "shelfDays": 1,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "spanish",
    "cookware": "cw_pan",
    "giftNpc": "lin_xiaolu",
    "desc": "土豆洋葱与鸡蛋慢煎成厚蛋饼，冷热皆宜。家家的存粮，切角配面包都好吃。"
  },
  "gambas_ajillo": {
    "id": "gambas_ajillo",
    "name": "蒜香虾",
    "emoji": "🦐",
    "ings": {
      "shrimp": 3,
      "garlic": 2,
      "chili": 1,
      "oil": 1
    },
    "baseCost": 92,
    "unlockCost": 300,
    "bakeCost": 10,
    "shelfDays": 1,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "spanish",
    "cookware": "cw_pan",
    "giftNpc": "lin_xiaolu",
    "desc": "橄榄油小火煸蒜片与辣椒，鲜虾滋滋作响。下酒的好菜，面包要留着蘸油。"
  },
  "gazpacho": {
    "id": "gazpacho",
    "name": "西班牙凉菜汤",
    "emoji": "🍅",
    "ings": {
      "tomato": 3,
      "onion": 1,
      "garlic": 1,
      "cucumber": 1
    },
    "baseCost": 56,
    "unlockCost": 200,
    "bakeCost": 8,
    "shelfDays": 1,
    "size": "small",
    "taste": "sour",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "spanish",
    "cookware": "cw_blender",
    "giftNpc": "lin_xiaolu",
    "desc": "番茄青椒与面包打泥冷藏，冰爽酸甜。农民的智慧，是夏天田野上的解暑汤。"
  },
  "churros": {
    "id": "churros",
    "name": "吉事果",
    "emoji": "🥖",
    "ings": {
      "flour": 2,
      "sugar": 2,
      "milk": 1,
      "oil": 1
    },
    "baseCost": 48,
    "unlockCost": 160,
    "bakeCost": 8,
    "shelfDays": 1,
    "size": "small",
    "taste": "sweet",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "spanish",
    "cookware": "cw_fryer",
    "giftNpc": "lin_xiaolu",
    "desc": "面糊挤条油炸，滚上肉桂糖霜。蘸浓巧克力热饮才是经典吃法，糖霜簌簌落。"
  },
  "butter_chicken": {
    "id": "butter_chicken",
    "name": "黄油咖喱鸡",
    "emoji": "🍛",
    "ings": {
      "chicken": 2,
      "yogurt": 1,
      "cream": 1,
      "butter": 1,
      "curry": 1
    },
    "baseCost": 118,
    "unlockCost": 360,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "indian",
    "cookware": "cw_pot",
    "giftNpc": "lin_xiaolu",
    "desc": "烤鸡块浸入番茄黄油咖喱，浓稠柔滑。国民咖喱，配馕一蘸一个满足。"
  },
  "naan": {
    "id": "naan",
    "name": "印度烤饼",
    "emoji": "🫓",
    "ings": {
      "flour": 2,
      "yogurt": 1,
      "butter": 1
    },
    "baseCost": 42,
    "unlockCost": 140,
    "bakeCost": 8,
    "shelfDays": 1,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "indian",
    "cookware": "cw_grill",
    "giftNpc": "lin_xiaolu",
    "desc": "面团贴入炉膛高温烤制，起泡鼓胀带麦香。撕一块蘸尽咖喱，才算吃完整。"
  },
  "biryani": {
    "id": "biryani",
    "name": "印度香饭",
    "emoji": "🍚",
    "ings": {
      "rice": 2,
      "chicken": 2,
      "yogurt": 1,
      "onion": 1,
      "garlic": 1
    },
    "baseCost": 112,
    "unlockCost": 340,
    "bakeCost": 13,
    "shelfDays": 2,
    "size": "large",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "indian",
    "cookware": "cw_claypot",
    "giftNpc": "lin_xiaolu",
    "desc": "香料腌肉与香米层层焖蒸，米粒染成金黄。开盖那一刻香气扑面，是盛宴的主食。"
  },
  "tandoori_chicken": {
    "id": "tandoori_chicken",
    "name": "坦都里烤鸡",
    "emoji": "🍗",
    "ings": {
      "chicken": 2,
      "yogurt": 1,
      "chili": 1,
      "ginger": 1,
      "garlic": 1
    },
    "baseCost": 106,
    "unlockCost": 320,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "indian",
    "cookware": "cw_grill",
    "giftNpc": "lin_xiaolu",
    "desc": "酸奶香料腌足一夜，入炉炭烤出红亮外皮。烟熏香扑鼻，是北地的骄傲。"
  },
  "aloo_masala": {
    "id": "aloo_masala",
    "name": "玛萨拉土豆",
    "emoji": "🥔",
    "ings": {
      "potato": 3,
      "tomato": 2,
      "curry": 1,
      "onion": 1,
      "garlic": 1
    },
    "baseCost": 72,
    "unlockCost": 240,
    "bakeCost": 10,
    "shelfDays": 2,
    "size": "small",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "indian",
    "cookware": "cw_wok",
    "giftNpc": "lin_xiaolu",
    "desc": "土豆块与孜然姜黄同炒，酥软入味。街头小吃的平价王者，卷饼配饭都合适。"
  },
  "pho": {
    "id": "pho",
    "name": "越南河粉",
    "emoji": "🍜",
    "ings": {
      "rice_noodle": 2,
      "meat": 2,
      "scallion": 1,
      "lime": 1
    },
    "baseCost": 82,
    "unlockCost": 280,
    "bakeCost": 11,
    "shelfDays": 2,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "vietnamese",
    "cookware": "cw_pot",
    "giftNpc": "zheng_zixuan",
    "desc": "牛骨清汤熬足数小时，河粉烫熟浇汤。薄荷与青柠随个人添减，清清爽爽一碗。"
  },
  "spring_rolls": {
    "id": "spring_rolls",
    "name": "越南春卷",
    "emoji": "🥗",
    "ings": {
      "flour": 1,
      "shrimp": 2,
      "cabbage": 1,
      "mint": 1,
      "carrot": 1
    },
    "baseCost": 72,
    "unlockCost": 240,
    "bakeCost": 9,
    "shelfDays": 1,
    "size": "small",
    "taste": "fruity",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "vietnamese",
    "cookware": "cw_knife",
    "giftNpc": "zheng_zixuan",
    "desc": "米纸包住鲜虾薄荷与米粉，透亮清爽。不油炸才见真功夫，蘸鱼露才是灵魂。"
  },
  "banh_mi": {
    "id": "banh_mi",
    "name": "越南法棍",
    "emoji": "🥖",
    "ings": {
      "flour": 2,
      "meat": 1,
      "carrot": 1,
      "cabbage": 1,
      "butter": 1
    },
    "baseCost": 78,
    "unlockCost": 260,
    "bakeCost": 10,
    "shelfDays": 1,
    "size": "medium",
    "taste": "savory",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "vietnamese",
    "cookware": "cw_oven",
    "giftNpc": "zheng_zixuan",
    "desc": "法棍夹腌菜香菜与肉，是两种风味的混血。街边的酥脆声响，就是清晨的滋味。"
  },
  "sugarcane_shrimp": {
    "id": "sugarcane_shrimp",
    "name": "甘蔗虾",
    "emoji": "🦐",
    "ings": {
      "shrimp": 2,
      "sugar": 1,
      "flour": 1,
      "oil": 1
    },
    "baseCost": 86,
    "unlockCost": 280,
    "bakeCost": 10,
    "shelfDays": 1,
    "size": "small",
    "taste": "sweet",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "vietnamese",
    "cookware": "cw_fryer",
    "giftNpc": "zheng_zixuan",
    "desc": "虾泥裹上甘蔗段炭烤，虾香混着蔗甜。啃完甘蔗才叫完整，创意又实在。"
  },
  "vietnamese_coconut_chicken": {
    "id": "vietnamese_coconut_chicken",
    "name": "越南椰香鸡",
    "emoji": "🍗",
    "ings": {
      "chicken": 2,
      "coconut_milk": 2,
      "lemongrass": 1,
      "garlic": 1
    },
    "baseCost": 108,
    "unlockCost": 340,
    "bakeCost": 12,
    "shelfDays": 2,
    "size": "medium",
    "taste": "creamy",
    "category": "cuisine",
    "system": "cuisine",
    "subcategory": "vietnamese",
    "cookware": "cw_pot",
    "giftNpc": "zheng_zixuan",
    "desc": "椰浆与香茅慢炖鸡肉，汤色乳白温润。家常的温柔，配米饭正合适。"
  },
  "strawberry_jam_jar": {
    "id": "strawberry_jam_jar",
    "name": "草莓酱罐头",
    "emoji": "🍓",
    "ings": {},
    "baseCost": 39,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 20,
    "size": "small",
    "taste": "sweet",
    "category": "drink",
    "desc": "新鲜草莓加糖慢熬，果肉保留大颗，趁热装罐锁鲜。开盖即食或抹在吐司上，像把春天封进了玻璃罐。"
  },
  "peach_jam_jar": {
    "id": "peach_jam_jar",
    "name": "蜜桃酱罐头",
    "emoji": "🍑",
    "ings": {},
    "baseCost": 36,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 20,
    "size": "small",
    "taste": "sweet",
    "category": "drink",
    "desc": "熟透蜜桃去皮熬酱，果肉化开一半、留一半。果香四溢、甜而不腻，配面包配酸奶都合适。"
  },
  "blueberry_jam_jar": {
    "id": "blueberry_jam_jar",
    "name": "蓝莓酱罐头",
    "emoji": "🫐",
    "ings": {},
    "baseCost": 45,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 20,
    "size": "small",
    "taste": "sweet",
    "category": "drink",
    "desc": "蓝莓加柠檬汁慢熬，深紫的酱体微酸回甘。早餐抹面包的绝配，颜色也好看。"
  },
  "rose_jam_jar": {
    "id": "rose_jam_jar",
    "name": "玫瑰酱罐头",
    "emoji": "🌹",
    "ings": {},
    "baseCost": 51,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 20,
    "size": "small",
    "taste": "sweet",
    "category": "drink",
    "desc": "可食玫瑰花瓣加糖慢熬成花酱，花香清雅不腻。冲水、抹面包都合适，是最浪漫的一罐。"
  },
  "fish_paste_jar": {
    "id": "fish_paste_jar",
    "name": "鱼酱罐头",
    "emoji": "🐟",
    "ings": {},
    "baseCost": 45,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 12,
    "size": "small",
    "taste": "savory",
    "category": "drink",
    "desc": "鲜鱼肉熬成浓酱装罐，咸鲜厚重。开罐拌饭拌面一勺入魂，是渔家存鲜的老法子。"
  },
  "shrimp_paste_jar": {
    "id": "shrimp_paste_jar",
    "name": "虾酱罐头",
    "emoji": "🦐",
    "ings": {},
    "baseCost": 51,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 12,
    "size": "small",
    "taste": "savory",
    "category": "drink",
    "desc": "河虾熬成红亮虾膏装罐，咸鲜带甘。小小一勺能让整锅汤提鲜，是厨房里的点睛之笔。"
  },
  "veg_juice_jar": {
    "id": "veg_juice_jar",
    "name": "蔬菜汁（瓶装）",
    "emoji": "🥤",
    "ings": {},
    "baseCost": 21,
    "unlockCost": 0,
    "bakeCost": 0,
    "shelfDays": 6,
    "size": "small",
    "taste": "fruity",
    "category": "drink",
    "desc": "胡萝卜等时蔬现榨装瓶，原汁原味。冰镇后清爽解腻，喝完瓶子还能留着装豆子。"
  },
  "cake:muffin": {
    "id": "cake:muffin",
    "name": "经典麦芬蛋糕",
    "emoji": "🍰",
    "ings": {
      "flour_low": 1,
      "sugar": 1,
      "eggs": 1,
      "milk": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "cake:cupcake": {
    "id": "cake:cupcake",
    "name": "奶油纸杯蛋糕",
    "emoji": "🍰",
    "ings": {
      "flour_low": 1,
      "sugar": 1,
      "eggs": 1,
      "butter": 1,
      "cream": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 60,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": []
    }
  },
  "bread:milk_toast": {
    "id": "bread:milk_toast",
    "name": "牛奶吐司",
    "emoji": "🍰",
    "ings": {
      "flour_high": 2,
      "sugar": 1,
      "eggs": 1,
      "milk": 1,
      "butter": 1,
      "yeast": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "bread:butter_roll": {
    "id": "bread:butter_roll",
    "name": "黄油餐包",
    "emoji": "🍰",
    "ings": {
      "flour_high": 1,
      "sugar": 1,
      "eggs": 1,
      "milk": 1,
      "butter": 2,
      "yeast": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 55,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "dessert:egg_tart": {
    "id": "dessert:egg_tart",
    "name": "葡式蛋挞",
    "emoji": "🍰",
    "ings": {
      "flour_low": 1,
      "eggs": 2,
      "milk": 1,
      "cream": 1,
      "sugar": 1,
      "butter": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 55,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": []
    }
  },
  "dessert:milk_pudding": {
    "id": "dessert:milk_pudding",
    "name": "牛奶布丁",
    "emoji": "🍰",
    "ings": {
      "milk": 2,
      "eggs": 1,
      "sugar": 1,
      "gelatin": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": [
        "freezer"
      ]
    }
  },
  "dessert:strawberry_daifuku": {
    "id": "dessert:strawberry_daifuku",
    "name": "草莓大福",
    "emoji": "🍰",
    "ings": {
      "glutinous_rice": 2,
      "sugar": 1,
      "strawberry": 2,
      "red_bean": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 60,
      "minSkillLevel": 2,
      "minRecipeProf": 6,
      "perfectTools": []
    }
  },
  "cake:apple_pie": {
    "id": "cake:apple_pie",
    "name": "苹果派",
    "emoji": "🍰",
    "ings": {
      "apple": 3,
      "flour_low": 2,
      "sugar": 1,
      "butter": 1,
      "eggs": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "酥皮包住肉桂苹果馅焗烤，是美式家常的代表甜点。趁热配一球香草冰淇淋，冷热交融最经典。",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "cake:lemon_tart": {
    "id": "cake:lemon_tart",
    "name": "柠檬塔",
    "emoji": "🍰",
    "ings": {
      "lemon": 2,
      "sugar": 2,
      "butter": 1,
      "flour_low": 1,
      "eggs": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "柠檬汁与蛋黄熬成凝冻，倒进酥塔壳冷藏定型。酸得明亮、甜得克制，餐后来一块最解腻。",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 55,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "cake:pineapple_tart": {
    "id": "cake:pineapple_tart",
    "name": "菠萝挞",
    "emoji": "🍰",
    "ings": {
      "pineapple": 2,
      "sugar": 1,
      "butter": 1,
      "flour_low": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "cake:cheesecake": {
    "id": "cake:cheesecake",
    "name": "纽约芝士蛋糕",
    "emoji": "🍰",
    "ings": {
      "cheese": 2,
      "cream": 1,
      "eggs": 2,
      "sugar": 1,
      "flour_low": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 60,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": [
        "freezer"
      ]
    }
  },
  "cake:corn_muffin": {
    "id": "cake:corn_muffin",
    "name": "玉米马芬",
    "emoji": "🍰",
    "ings": {
      "corn": 2,
      "flour_low": 1,
      "milk": 1,
      "sugar": 1,
      "eggs": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "bread:sweet_potato_roll": {
    "id": "bread:sweet_potato_roll",
    "name": "红薯软欧包",
    "emoji": "🍰",
    "ings": {
      "sweet_potato": 2,
      "flour_high": 2,
      "milk": 1,
      "butter": 1,
      "yeast": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "bread:soda_cracker": {
    "id": "bread:soda_cracker",
    "name": "苏打饼干",
    "emoji": "🍰",
    "ings": {
      "flour_low": 2,
      "baking_soda": 1,
      "butter": 1,
      "salt": 1,
      "milk": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 40,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dessert:fruit_jelly": {
    "id": "dessert:fruit_jelly",
    "name": "水果果冻",
    "emoji": "🍰",
    "ings": {
      "agar": 1,
      "apple": 1,
      "lemon": 1,
      "sugar": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "freeze",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "cake:black_forest_6": {
    "id": "cake:black_forest_6",
    "name": "6寸黑森林蛋糕",
    "emoji": "🍰",
    "ings": {
      "flour_low": 2,
      "sugar": 2,
      "eggs": 2,
      "milk": 1,
      "cherry": 3,
      "chocolate": 2,
      "cream": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 70,
      "minSkillLevel": 3,
      "minRecipeProf": 10,
      "perfectTools": [
        "stencil"
      ]
    }
  },
  "cake:wedding": {
    "id": "cake:wedding",
    "name": "三层定制婚礼蛋糕",
    "emoji": "🍰",
    "ings": {
      "flour_low": 10,
      "sugar": 10,
      "eggs": 10,
      "milk": 5,
      "butter": 5,
      "cream": 10,
      "strawberry": 10
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "large",
    "taste": "sweet",
    "category": "cake",
    "desc": "",
    "cookware": "bake",
    "qualityReq": {
      "minIngredientQuality": 85,
      "minSkillLevel": 5,
      "minRecipeProf": 20,
      "perfectTools": [
        "stencil",
        "large_oven"
      ]
    }
  },
  "dish:tomato_egg": {
    "id": "dish:tomato_egg",
    "name": "番茄炒蛋",
    "emoji": "🍰",
    "ings": {
      "tomato": 2,
      "eggs": 3,
      "salt": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "番茄出汁与炒蛋同烩，酸甜平衡。国民下饭菜，家家有自己的一版配方。",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 40,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:egg_fried_rice": {
    "id": "dish:egg_fried_rice",
    "name": "黄金蛋炒饭",
    "emoji": "🍰",
    "ings": {
      "japonica_rice": 1,
      "eggs": 2,
      "scallion": 1,
      "salt": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "隔夜饭配蛋液大火快炒，粒粒分明裹金。简单却见功夫，锅气是灵魂。",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": [
        "wok_iron_big"
      ]
    }
  },
  "dish:braised_beef": {
    "id": "dish:braised_beef",
    "name": "红烧牛肉",
    "emoji": "🍰",
    "ings": {
      "beef": 3,
      "ginger": 1,
      "garlic": 1,
      "scallion": 1,
      "star_anise": 1,
      "soy_sauce_light": 1,
      "soy_sauce_dark": 1,
      "sugar": 1,
      "rice_wine": 1,
      "oil": 1,
      "msg": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 55,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": [
        "claypot"
      ]
    }
  },
  "dish:seared_wagyu": {
    "id": "dish:seared_wagyu",
    "name": "香煎和牛",
    "emoji": "🍰",
    "ings": {
      "wagyu": 2,
      "salt": 1,
      "oil": 1,
      "garlic": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 65,
      "minSkillLevel": 3,
      "minRecipeProf": 6,
      "perfectTools": [
        "wok_iron_big"
      ]
    }
  },
  "dish:iberico_char_siu": {
    "id": "dish:iberico_char_siu",
    "name": "伊比利亚叉烧",
    "emoji": "🍰",
    "ings": {
      "iberico": 3,
      "soy_sauce_light": 1,
      "soy_sauce_dark": 1,
      "sugar": 2,
      "ginger": 1,
      "garlic": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "roast",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 60,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": [
        "roast_oven"
      ]
    }
  },
  "dish:garlic_sprout_pork": {
    "id": "dish:garlic_sprout_pork",
    "name": "蒜苗回锅肉",
    "emoji": "🍰",
    "ings": {
      "garlic_sprout": 3,
      "pork_belly": 2,
      "doubanjiang": 1,
      "garlic": 1,
      "oil": 1,
      "soy_sauce_light": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "dish:shredded_potato": {
    "id": "dish:shredded_potato",
    "name": "醋溜土豆丝",
    "emoji": "🍰",
    "ings": {
      "potato": 3,
      "vinegar": 1,
      "garlic": 1,
      "chili": 1,
      "salt": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "dish:smashed_cucumber": {
    "id": "dish:smashed_cucumber",
    "name": "拍黄瓜",
    "emoji": "🍰",
    "ings": {
      "cucumber": 2,
      "garlic": 2,
      "vinegar": 1,
      "salt": 1,
      "sesame_oil": 1,
      "chili": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 40,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:stir_fried_spinach": {
    "id": "dish:stir_fried_spinach",
    "name": "蒜蓉菠菜",
    "emoji": "🍰",
    "ings": {
      "spinach": 3,
      "garlic": 2,
      "oil": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:bok_choy_egg": {
    "id": "dish:bok_choy_egg",
    "name": "上汤上海青",
    "emoji": "🍰",
    "ings": {
      "bok_choy": 3,
      "eggs": 2,
      "garlic": 1,
      "salt": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "dish:onion_egg": {
    "id": "dish:onion_egg",
    "name": "洋葱炒蛋",
    "emoji": "🍰",
    "ings": {
      "onion": 2,
      "eggs": 3,
      "oil": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:carrot_ribs_soup": {
    "id": "dish:carrot_ribs_soup",
    "name": "胡萝卜排骨汤",
    "emoji": "🍰",
    "ings": {
      "carrot": 2,
      "pork_ribs": 2,
      "ginger": 1,
      "salt": 1,
      "scallion": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stew",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": [
        "stone_pot"
      ]
    }
  },
  "dish:radish_ribs_soup": {
    "id": "dish:radish_ribs_soup",
    "name": "白萝卜排骨汤",
    "emoji": "🍰",
    "ings": {
      "white_radish": 2,
      "pork_ribs": 2,
      "ginger": 1,
      "salt": 1,
      "scallion": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stew",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "dish:wood_ear_pork": {
    "id": "dish:wood_ear_pork",
    "name": "木耳炒肉",
    "emoji": "🍰",
    "ings": {
      "wood_ear": 2,
      "pork_belly": 2,
      "garlic": 1,
      "oil": 1,
      "soy_sauce_light": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "dish:preserved_egg_congee": {
    "id": "dish:preserved_egg_congee",
    "name": "皮蛋瘦肉粥",
    "emoji": "🍰",
    "ings": {
      "preserved_egg": 1,
      "japonica_rice": 1,
      "pork_belly": 1,
      "scallion": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "米粒熬到开花，皮蛋与瘦肉丝沉浮其间。绵密咸香，是宵夜与早餐通吃的经典粥品。",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": [
        "claypot"
      ]
    }
  },
  "dish:duck_egg_stirfry": {
    "id": "dish:duck_egg_stirfry",
    "name": "鸭蛋炒青椒",
    "emoji": "🍰",
    "ings": {
      "duck_egg": 2,
      "green_pepper": 2,
      "oil": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:braised_quail_egg": {
    "id": "dish:braised_quail_egg",
    "name": "卤鹌鹑蛋",
    "emoji": "🍰",
    "ings": {
      "quail_egg": 6,
      "star_anise": 1,
      "soy_sauce_light": 1,
      "soy_sauce_dark": 1,
      "sugar": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "dish:stir_fried_squid": {
    "id": "dish:stir_fried_squid",
    "name": "辣炒鱿鱼",
    "emoji": "🍰",
    "ings": {
      "squid": 2,
      "chili": 2,
      "garlic": 1,
      "ginger": 1,
      "oil": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "dish:tuna_sashimi": {
    "id": "dish:tuna_sashimi",
    "name": "金枪鱼刺身",
    "emoji": "🍰",
    "ings": {
      "tuna": 2,
      "soy_sauce_light": 1,
      "sesame_oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "small",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 60,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": []
    }
  },
  "dish:black_rice_congee": {
    "id": "dish:black_rice_congee",
    "name": "黑米粥",
    "emoji": "🍰",
    "ings": {
      "black_rice": 2,
      "sugar": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stew",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:millet_congee": {
    "id": "dish:millet_congee",
    "name": "小米粥",
    "emoji": "🍰",
    "ings": {
      "millet": 2,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stew",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 40,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:mung_bean_soup": {
    "id": "dish:mung_bean_soup",
    "name": "绿豆汤",
    "emoji": "🍰",
    "ings": {
      "mung_bean": 2,
      "sugar": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stew",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 40,
      "minSkillLevel": 1,
      "minRecipeProf": 2,
      "perfectTools": []
    }
  },
  "dish:scallion_noodles": {
    "id": "dish:scallion_noodles",
    "name": "葱油拌面",
    "emoji": "🍰",
    "ings": {
      "noodles": 2,
      "scallion": 2,
      "soy_sauce_light": 1,
      "sesame_oil": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "home",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 45,
      "minSkillLevel": 1,
      "minRecipeProf": 3,
      "perfectTools": []
    }
  },
  "dish:mapo_tofu": {
    "id": "dish:mapo_tofu",
    "name": "麻婆豆腐",
    "emoji": "🍰",
    "ings": {
      "soybean": 2,
      "pork_belly": 1,
      "doubanjiang": 1,
      "chili": 2,
      "pepper": 1,
      "garlic": 1,
      "scallion": 1,
      "starch": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "sichuan",
    "desc": "豆腐嫩而不散，肉末与豆瓣酱炒出红亮。麻、辣、鲜、香、烫五味俱全，川菜下饭之王。",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 50,
      "minSkillLevel": 2,
      "minRecipeProf": 4,
      "perfectTools": [
        "pickle_jar"
      ]
    }
  },
  "dish:fish_flavored_eggplant": {
    "id": "dish:fish_flavored_eggplant",
    "name": "鱼香茄子",
    "emoji": "🍰",
    "ings": {
      "eggplant": 3,
      "pork_belly": 1,
      "chili": 2,
      "garlic": 2,
      "ginger": 1,
      "sugar": 1,
      "vinegar": 1,
      "soy_sauce_light": 1,
      "starch": 1,
      "oil": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "sichuan",
    "desc": "",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 55,
      "minSkillLevel": 3,
      "minRecipeProf": 6,
      "perfectTools": [
        "wok_iron_big"
      ]
    }
  },
  "dish:cantonese_roast_duck": {
    "id": "dish:cantonese_roast_duck",
    "name": "广式烧鸭",
    "emoji": "🍰",
    "ings": {
      "duck": 1,
      "huangjiu": 1,
      "sugar": 1,
      "salt": 1,
      "star_anise": 1,
      "ginger": 1,
      "oyster_sauce": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "cantonese",
    "desc": "",
    "cookware": "roast",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 65,
      "minSkillLevel": 3,
      "minRecipeProf": 8,
      "perfectTools": [
        "roast_oven"
      ]
    }
  },
  "dish:steamed_pomfret": {
    "id": "dish:steamed_pomfret",
    "name": "清蒸鲳鱼",
    "emoji": "🍰",
    "ings": {
      "silver_pomfret": 1,
      "ginger": 2,
      "scallion": 2,
      "soy_sauce_light": 1,
      "rice_wine": 1,
      "sesame_oil": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "cantonese",
    "desc": "",
    "cookware": "steam",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 70,
      "minSkillLevel": 3,
      "minRecipeProf": 7,
      "perfectTools": [
        "steamer_bamboo"
      ]
    }
  },
  "dish:sweet_sour_carp": {
    "id": "dish:sweet_sour_carp",
    "name": "糖醋鲤鱼",
    "emoji": "🍰",
    "ings": {
      "carp": 1,
      "sugar": 2,
      "vinegar": 2,
      "starch": 2,
      "salt": 1,
      "ginger": 1,
      "garlic": 1,
      "oil": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "shandong",
    "desc": "鲤鱼改刀挂糊炸至定型，浇糖醋汁上桌。头尾翘起的造型是讲究，外脆里嫩、酸甜开胃。",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 60,
      "minSkillLevel": 3,
      "minRecipeProf": 7,
      "perfectTools": [
        "wok_iron_big"
      ]
    }
  },
  "dish:scallion_lamb": {
    "id": "dish:scallion_lamb",
    "name": "葱爆羊肉",
    "emoji": "🍰",
    "ings": {
      "lamb": 2,
      "scallion": 3,
      "ginger": 1,
      "soy_sauce_dark": 1,
      "huangjiu": 1,
      "salt": 1,
      "oil": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "shandong",
    "desc": "羊肉片与葱段旺火爆炒，葱香压住膻味。北方家常菜的担当，锅气十足。",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 65,
      "minSkillLevel": 4,
      "minRecipeProf": 9,
      "perfectTools": [
        "wok_iron_big"
      ]
    }
  },
  "dish:lion_head_meatball": {
    "id": "dish:lion_head_meatball",
    "name": "清炖狮子头",
    "emoji": "🍰",
    "ings": {
      "pork_belly": 3,
      "eggs": 1,
      "cabbage": 2,
      "shiitake": 1,
      "starch": 1,
      "ginger": 1,
      "scallion": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "huaiyang",
    "desc": "",
    "cookware": "steam",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 65,
      "minSkillLevel": 3,
      "minRecipeProf": 8,
      "perfectTools": [
        "steamer_bamboo"
      ]
    }
  },
  "dish:crab_soup": {
    "id": "dish:crab_soup",
    "name": "文思蟹粉羹",
    "emoji": "🍰",
    "ings": {
      "crab": 2,
      "enoki": 1,
      "shiitake": 1,
      "chicken": 1,
      "starch": 2,
      "ginger": 1,
      "eggs": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "huaiyang",
    "desc": "",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 75,
      "minSkillLevel": 4,
      "minRecipeProf": 10,
      "perfectTools": [
        "claypot_yixing"
      ]
    }
  },
  "dish:hunan_stir_fry_pork": {
    "id": "dish:hunan_stir_fry_pork",
    "name": "农家小炒肉",
    "emoji": "🍰",
    "ings": {
      "pork_belly": 2,
      "green_pepper": 3,
      "chili": 2,
      "garlic": 2,
      "doubanjiang": 1,
      "soy_sauce_light": 1,
      "rice_wine": 1,
      "oil": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "hunan",
    "desc": "五花肉片与青辣椒爆炒，豆豉点睛。香辣过瘾的国民下饭菜，辣得痛快、香得踏实。",
    "cookware": "stirfry",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 55,
      "minSkillLevel": 2,
      "minRecipeProf": 5,
      "perfectTools": [
        "wok_iron_big"
      ]
    }
  },
  "dish:smoked_pork_with_bamboo": {
    "id": "dish:smoked_pork_with_bamboo",
    "name": "腊肉炒笋",
    "emoji": "🍰",
    "ings": {
      "pork_ribs": 2,
      "lettuce": 1,
      "chili": 2,
      "garlic": 1,
      "ginger": 1,
      "soy_sauce_dark": 1,
      "rice_wine": 1,
      "oil": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "hunan",
    "desc": "",
    "cookware": "smoke",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 65,
      "minSkillLevel": 3,
      "minRecipeProf": 8,
      "perfectTools": [
        "smoke_rack"
      ]
    }
  },
  "dish:stinky_mandarin_fish": {
    "id": "dish:stinky_mandarin_fish",
    "name": "徽州臭鳜鱼",
    "emoji": "🍰",
    "ings": {
      "hairtail": 1,
      "chili": 2,
      "doubanjiang": 1,
      "garlic": 2,
      "ginger": 2,
      "rice_wine": 2,
      "soy_sauce_dark": 1,
      "oil": 2
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "anhui",
    "desc": "",
    "cookware": "ferment",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 70,
      "minSkillLevel": 4,
      "minRecipeProf": 9,
      "perfectTools": [
        "pickle_jar"
      ]
    }
  },
  "dish:stone_pot_chicken": {
    "id": "dish:stone_pot_chicken",
    "name": "石锅山菌鸡",
    "emoji": "🍰",
    "ings": {
      "chicken": 1,
      "matsutake": 1,
      "shiitake": 2,
      "enoki": 1,
      "ginger": 1,
      "huangjiu": 1,
      "salt": 1,
      "scallion": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "anhui",
    "desc": "",
    "cookware": "stew",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 70,
      "minSkillLevel": 3,
      "minRecipeProf": 8,
      "perfectTools": [
        "stone_pot"
      ]
    }
  },
  "dish:buddha_jumps_over_wall": {
    "id": "dish:buddha_jumps_over_wall",
    "name": "佛跳墙",
    "emoji": "🍰",
    "ings": {
      "shrimp": 2,
      "clam": 2,
      "chicken": 1,
      "matsutake": 2,
      "shiitake": 2,
      "pigeon": 1,
      "huangjiu": 2,
      "ginger": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "large",
    "taste": "sweet",
    "category": "fujian",
    "desc": "鲍参翅肚与酒同坛煨足时辰，启坛荤香四溢。山珍海味收于一坛，是宴席上的头牌。",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 85,
      "minSkillLevel": 5,
      "minRecipeProf": 15,
      "perfectTools": [
        "jar_fotiaoqiang"
      ]
    }
  },
  "dish:shrimp_balls": {
    "id": "dish:shrimp_balls",
    "name": "闽南虾丸汤",
    "emoji": "🍰",
    "ings": {
      "shrimp": 3,
      "starch": 1,
      "eggs": 1,
      "lettuce": 1,
      "ginger": 1,
      "salt": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "fujian",
    "desc": "",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 65,
      "minSkillLevel": 3,
      "minRecipeProf": 6,
      "perfectTools": [
        "claypot"
      ]
    }
  },
  "dish:dongpo_pork": {
    "id": "dish:dongpo_pork",
    "name": "东坡肉",
    "emoji": "🍰",
    "ings": {
      "pork_belly": 3,
      "huangjiu": 3,
      "sugar": 2,
      "soy_sauce_dark": 2,
      "ginger": 2,
      "scallion": 2,
      "star_anise": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "zhejiang",
    "desc": "五花肉方块慢煨数小时，红亮酥糯。慢著火、少著水，火候足时它自美的传世名菜。",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 70,
      "minSkillLevel": 4,
      "minRecipeProf": 9,
      "perfectTools": [
        "claypot_yixing"
      ]
    }
  },
  "dish:west_lake_fish": {
    "id": "dish:west_lake_fish",
    "name": "西湖醋鱼",
    "emoji": "🍰",
    "ings": {
      "carp": 1,
      "vinegar": 2,
      "sugar": 2,
      "ginger": 2,
      "soy_sauce_light": 1,
      "starch": 1,
      "rice_wine": 1
    },
    "baseCost": 30,
    "unlockCost": 50,
    "bakeCost": 10,
    "shelfDays": 3,
    "size": "medium",
    "taste": "sweet",
    "category": "zhejiang",
    "desc": "草鱼氽熟浇糖醋芡，酸甜微嫩。杭州名菜讲究「现杀现做」，鱼肉嫩得像蟹肉。",
    "cookware": "braise",
    "system": "cuisine",
    "qualityReq": {
      "minIngredientQuality": 75,
      "minSkillLevel": 3,
      "minRecipeProf": 8,
      "perfectTools": [
        "claypot"
      ]
    }
  }
    });
})();
