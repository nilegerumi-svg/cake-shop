// books/library.js（图书馆借阅，共 15 本）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.BOOKS = window.Cake.BOOKS || {};

    window.Cake.BOOKS["book_basic"] = {
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
    };

    window.Cake.BOOKS["book_choco"] = {
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
    };

    window.Cake.BOOKS["book_strawberry"] = {
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
    };

    window.Cake.BOOKS["book_apple"] = {
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
    };

    window.Cake.BOOKS["book_materials"] = {
        "id": "book_materials",
        "name": "食材与手感图鉴",
        "emoji": "📒",
        "desc": "反复研读，加深对每一种材料的理解",
        "energy": 6,
        "repeatable": true,
        "knowledgeGain": 3,
        "price": 80,
        "library": true
    };

    window.Cake.BOOKS["book_cookie"] = {
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
    };

    window.Cake.BOOKS["book_pudding"] = {
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
    };

    window.Cake.BOOKS["book_season"] = {
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
    };

    window.Cake.BOOKS["book_fish"] = {
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
    };

    window.Cake.BOOKS["book_drink"] = {
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
    };

    window.Cake.BOOKS["book_icecream"] = {
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
    };

    window.Cake.BOOKS["book_snack"] = {
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
    };

    window.Cake.BOOKS["book_cuisine_basic"] = {
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
    };

    window.Cake.BOOKS["book_cn_north"] = {
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
    };

    window.Cake.BOOKS["book_us"] = {
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
    };
})();
