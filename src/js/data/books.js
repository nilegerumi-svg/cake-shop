// js\data\books.js（新版数据）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.BOOKS = {
    "book_basic": {
        "id": "book_basic",
        "name": "蛋糕基础入门",
        "emoji": "📗",
        "desc": "从香草蛋糕讲起，掌握松软的秘密",
        "energy": 8,
        "recipes": [
            "vanilla_cake"
        ],
        "knowledgeGain": 2,
        "price": 60,
        "library": true
    },
    "book_choco": {
        "id": "book_choco",
        "name": "巧克力魔法书",
        "emoji": "📕",
        "desc": "可可的浓度与温度，都是魔法",
        "energy": 10,
        "recipes": [
            "chocolate_cake"
        ],
        "knowledgeGain": 2,
        "price": 120,
        "library": true
    },
    "book_strawberry": {
        "id": "book_strawberry",
        "name": "草莓甜心笔记",
        "emoji": "📗",
        "desc": "春日限定的果香配方都在这里",
        "energy": 12,
        "recipes": [
            "strawberry_cake"
        ],
        "knowledgeGain": 2,
        "price": 150,
        "library": true
    },
    "book_apple": {
        "id": "book_apple",
        "name": "苹果派手作指南",
        "emoji": "📙",
        "desc": "酥皮的层次，秋天的味道",
        "energy": 10,
        "recipes": [
            "apple_pie"
        ],
        "knowledgeGain": 2,
        "price": 120,
        "library": true
    },
    "book_materials": {
        "id": "book_materials",
        "name": "食材与手感图鉴",
        "emoji": "📒",
        "desc": "反复研读，加深对每一种材料的理解",
        "energy": 6,
        "repeatable": true,
        "knowledgeGain": 3,
        "price": 80,
        "library": true
    },
    "book_cheese": {
        "id": "book_cheese",
        "name": "芝士与慕斯工坊",
        "emoji": "📘",
        "desc": "浓醇芝士与轻盈慕斯的进阶课",
        "energy": 14,
        "recipes": [
            "cheese_cake",
            "mango_mousse",
            "matcha_mousse"
        ],
        "knowledgeGain": 3,
        "price": 220
    },
    "book_master": {
        "id": "book_master",
        "name": "大师的婚礼蛋糕",
        "emoji": "📚",
        "desc": "终极配方！层层叠叠的梦幻之作",
        "energy": 20,
        "recipes": [
            "wedding_cake"
        ],
        "knowledgeGain": 3,
        "price": 480
    },
    "book_cookie": {
        "id": "book_cookie",
        "name": "饼干与酥点笔记",
        "emoji": "📔",
        "desc": "曲奇与饼干的酥脆秘诀",
        "energy": 10,
        "recipes": [
            "chocolate_cookie",
            "oatmeal_cookie"
        ],
        "knowledgeGain": 3,
        "price": 160,
        "library": true
    },
    "book_pudding": {
        "id": "book_pudding",
        "name": "布丁研究所",
        "emoji": "🧪",
        "desc": "嫩滑布丁的进阶实验手册",
        "energy": 12,
        "recipes": [
            "vanilla_pudding",
            "chocolate_pudding"
        ],
        "knowledgeGain": 3,
        "price": 160,
        "library": true
    },
    "book_season": {
        "id": "book_season",
        "name": "四季果香图鉴",
        "emoji": "📓",
        "desc": "时令水果点心的灵感集",
        "energy": 12,
        "recipes": [
            "blueberry_muffin",
            "pumpkin_pie",
            "strawberry_pudding",
            "peach_tart"
        ],
        "knowledgeGain": 3,
        "price": 180,
        "library": true
    },
    "book_fish": {
        "id": "book_fish",
        "name": "河边鲜味图鉴",
        "emoji": "🐟",
        "desc": "泥鳅鲫鱼鲤鱼，螺蛳河蟹扇贝，鳜鱼黄鳝翘嘴锦鲤，节气限定桃花鳜银鱼白露鲈雪鳞鲤，季节限定江刀鱼鳑鲏河鳗芦花鳊细鳞鱼，二十四节气鱼菜花塘鳢桂花鳜鳡鱼，夜间限定鲶鱼刀鳅虾虎鱼，河鲜做法大全",
        "energy": 10,
        "recipes": [
            "fried_fish",
            "crucian_soup",
            "honey_grilled_fish",
            "crispy_loach",
            "snail_stir",
            "steamed_crab",
            "chili_fish_head",
            "garlic_scallop",
            "steamed_mandarin",
            "eel_pot",
            "qingtuan",
            "lemongrass_shrimp",
            "pumpkin_cake",
            "ginger_wine_soup",
            "knife_wonton",
            "eel_teriyaki",
            "goby_steamed_egg",
            "osmanthus_mandarin_dish",
            "night_fry_snail",
            "catfish_tofu_soup",
            "salt_pepper_eel"
        ],
        "knowledgeGain": 3,
        "price": 200,
        "library": true
    },
    "book_drink": {
        "id": "book_drink",
        "name": "鲜榨果汁手册",
        "emoji": "🧃",
        "desc": "当季水果的清爽打开方式",
        "energy": 8,
        "recipes": [
            "strawberry_juice",
            "mango_juice",
            "peach_juice",
            "apple_juice",
            "lemon_soda"
        ],
        "knowledgeGain": 2,
        "price": 140,
        "library": true
    },
    "book_icecream": {
        "id": "book_icecream",
        "name": "冰淇淋工坊",
        "emoji": "🍦",
        "desc": "冰凉绵密的夏日秘密",
        "energy": 10,
        "recipes": [
            "vanilla_icecream",
            "strawberry_icecream",
            "chocolate_icecream",
            "mango_icecream",
            "matcha_icecream"
        ],
        "knowledgeGain": 2,
        "price": 160,
        "library": true
    },
    "book_coffee": {
        "id": "book_coffee",
        "name": "咖啡师手记",
        "emoji": "☕",
        "desc": "从美式到提拉米苏的咖啡进阶课",
        "energy": 12,
        "recipes": [
            "tiramisu",
            "americano",
            "latte",
            "cappuccino",
            "mocha",
            "caramel_macchiato"
        ],
        "knowledgeGain": 3,
        "price": 240
    },
    "book_snack": {
        "id": "book_snack",
        "name": "轻食下午茶",
        "emoji": "🥐",
        "desc": "司康贝果可颂，配咖啡的小食宝典",
        "energy": 10,
        "recipes": [
            "scone",
            "bagel",
            "croissant",
            "ham_sandwich"
        ],
        "knowledgeGain": 3,
        "price": 160,
        "library": true
    },
    "book_foreign": {
        "id": "book_foreign",
        "name": "世界风味厨房",
        "emoji": "🍝",
        "desc": "意面披萨咖喱，跨越大洋的美味",
        "energy": 14,
        "recipes": [
            "pasta",
            "pizza",
            "curry_rice"
        ],
        "knowledgeGain": 3,
        "price": 320
    },
    "book_cuisine_basic": {
        "id": "book_cuisine_basic",
        "name": "家常菜入门",
        "emoji": "📖",
        "desc": "鸡蛋羹、炒时蔬，把家味做进店里的第一课",
        "energy": 8,
        "recipes": [
            "steamed_egg",
            "garlic_cabbage"
        ],
        "knowledgeGain": 2,
        "price": 80,
        "library": true
    },
    "book_cn_north": {
        "id": "book_cn_north",
        "name": "北方菜谱·鲁味",
        "emoji": "🥢",
        "desc": "糖醋鲤鱼、葱爆羊肉，咸鲜醇厚的鲁菜经典",
        "energy": 12,
        "recipes": [
            "sweet_sour_carp",
            "onion_lamb"
        ],
        "knowledgeGain": 3,
        "price": 280,
        "library": true
    },
    "book_cn_west": {
        "id": "book_cn_west",
        "name": "川湘风味录",
        "emoji": "🌶️",
        "desc": "麻婆豆腐、宫保鸡丁、剁椒鱼头，火辣鲜香两省名菜",
        "energy": 14,
        "recipes": [
            "mapo_tofu",
            "kungpao_chicken",
            "fish_fragrant_pork",
            "chopped_chili_fish",
            "pepper_pork"
        ],
        "knowledgeGain": 3,
        "price": 360
    },
    "book_cn_east": {
        "id": "book_cn_east",
        "name": "江南雅馔",
        "emoji": "🏮",
        "desc": "苏浙徽三地：松鼠桂鱼、东坡肉、臭鳜鱼，精致与醇厚并济",
        "energy": 14,
        "recipes": [
            "squirrel_fish",
            "lion_head",
            "dongpo_pork",
            "west_lake_fish",
            "stinky_mandarin",
            "hairy_tofu"
        ],
        "knowledgeGain": 3,
        "price": 380
    },
    "book_cn_south": {
        "id": "book_cn_south",
        "name": "粤闽鲜味记",
        "emoji": "🦐",
        "desc": "白切鸡、虾饺、荔枝肉、佛跳墙，清鲜与醇香交汇",
        "energy": 14,
        "recipes": [
            "white_cut_chicken",
            "shrimp_dumpling",
            "lychee_pork",
            "buddha_jump"
        ],
        "knowledgeGain": 3,
        "price": 380
    },
    "book_fr": {
        "id": "book_fr",
        "name": "法式料理之美",
        "emoji": "🥖",
        "desc": "红酒炖牛肉、洋葱汤，慢工细活的法餐哲学",
        "energy": 14,
        "recipes": [
            "beef_bourguignon",
            "french_onion_soup"
        ],
        "knowledgeGain": 3,
        "price": 340
    },
    "book_it": {
        "id": "book_it",
        "name": "意式厨房",
        "emoji": "🍕",
        "desc": "千层面与肉丸，把意大利的浓郁端上桌",
        "energy": 12,
        "recipes": [
            "lasagna",
            "italian_meatball"
        ],
        "knowledgeGain": 3,
        "price": 300
    },
    "book_jp": {
        "id": "book_jp",
        "name": "和风食帖",
        "emoji": "🍣",
        "desc": "寿司、天妇罗、味噌汤，一期一会的日料心法",
        "energy": 12,
        "recipes": [
            "sushi_roll",
            "tempura",
            "miso_soup"
        ],
        "knowledgeGain": 3,
        "price": 300
    },
    "book_kr": {
        "id": "book_kr",
        "name": "韩味小馆",
        "emoji": "🍗",
        "desc": "石锅拌饭与韩式炸鸡，热辣下饭的韩食日常",
        "energy": 12,
        "recipes": [
            "bibimbap",
            "korean_fried_chicken"
        ],
        "knowledgeGain": 3,
        "price": 280
    },
    "book_th": {
        "id": "book_th",
        "name": "泰式风味手册",
        "emoji": "🍍",
        "desc": "冬阴功与菠萝炒饭，酸辣鲜甜的东南亚风情",
        "energy": 12,
        "recipes": [
            "tom_yum",
            "pineapple_fried_rice"
        ],
        "knowledgeGain": 3,
        "price": 300
    },
    "book_us": {
        "id": "book_us",
        "name": "美式快餐宝典",
        "emoji": "🍟",
        "desc": "薯条、烤牛排，豪爽直给的美国味道",
        "energy": 10,
        "recipes": [
            "fries",
            "grilled_steak"
        ],
        "knowledgeGain": 2,
        "price": 240,
        "library": true
    }
};
})();
