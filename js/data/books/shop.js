// books/shop.js（商店购买，共 12 本）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.BOOKS = window.Cake.BOOKS || {};

    window.Cake.BOOKS["book_cheese"] = {
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
    };

    window.Cake.BOOKS["book_master"] = {
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
    };

    window.Cake.BOOKS["book_coffee"] = {
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
    };

    window.Cake.BOOKS["book_foreign"] = {
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
    };

    window.Cake.BOOKS["book_cn_west"] = {
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
    };

    window.Cake.BOOKS["book_cn_east"] = {
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
    };

    window.Cake.BOOKS["book_cn_south"] = {
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
    };

    window.Cake.BOOKS["book_fr"] = {
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
    };

    window.Cake.BOOKS["book_it"] = {
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
    };

    window.Cake.BOOKS["book_jp"] = {
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
    };

    window.Cake.BOOKS["book_kr"] = {
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
    };

    window.Cake.BOOKS["book_th"] = {
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
    };
})();
