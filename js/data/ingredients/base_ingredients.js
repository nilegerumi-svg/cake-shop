// js/data/ingredients/base_ingredients.js（离线包表 fk）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.BASE_INGREDIENTS = [
    {
        "id": "jar",
        "name": "空罐头",
        "emoji": "🫙",
        "price": 3,
        "shelfLife": 9999,
        "season": "all",
        "category": "grain",
        "desc": "装酱装点心的空罐，耐放不坏，订购次日送达"
    },
    {
        "id": "flour",
        "name": "面粉",
        "emoji": "🌾",
        "price": 6,
        "shelfLife": 60,
        "season": "all",
        "category": "grain",
        "desc": "烘焙点心最常用的基础粉"
    },
    {
        "id": "oat",
        "name": "燕麦",
        "emoji": "🥣",
        "price": 9,
        "shelfLife": 15,
        "season": "all",
        "category": "grain",
        "desc": "谷物香气浓，耐存放"
    },
    {
        "id": "sugar",
        "name": "白糖",
        "emoji": "🍬",
        "price": 8,
        "shelfLife": 60,
        "season": "all",
        "category": "sweet",
        "desc": "甜味点心都离不开它"
    },
    {
        "id": "eggs",
        "name": "鸡蛋",
        "emoji": "🥚",
        "price": 12,
        "shelfLife": 8,
        "season": "all",
        "category": "dairy",
        "desc": "蛋香浓郁，点心灵魂"
    },
    {
        "id": "milk",
        "name": "牛奶",
        "emoji": "🥛",
        "price": 10,
        "shelfLife": 7,
        "season": "all",
        "category": "dairy",
        "desc": "香醇液体，提味增香"
    },
    {
        "id": "butter",
        "name": "黄油",
        "emoji": "🧈",
        "price": 15,
        "shelfLife": 10,
        "season": "all",
        "category": "dairy",
        "desc": "奶香浓郁，酥点常客"
    },
    {
        "id": "cream",
        "name": "淡奶油",
        "emoji": "🍦",
        "price": 18,
        "shelfLife": 6,
        "season": "all",
        "category": "dairy",
        "desc": "打发后绵密轻盈"
    },
    {
        "id": "chocolate",
        "name": "巧克力",
        "emoji": "🍫",
        "price": 20,
        "shelfLife": 15,
        "season": "all",
        "category": "sweet",
        "desc": "微苦回甘，甜点常客"
    },
    {
        "id": "cheese",
        "name": "奶酪",
        "emoji": "🧀",
        "price": 22,
        "shelfLife": 8,
        "season": "all",
        "category": "dairy",
        "desc": "咸香浓郁，可盐可甜"
    },
    {
        "id": "honey",
        "name": "蜂蜜",
        "emoji": "🍯",
        "price": 24,
        "shelfLife": 20,
        "season": "all",
        "category": "sweet",
        "desc": "天然清甜，润口留香"
    },
    {
        "id": "matcha",
        "name": "抹茶粉",
        "emoji": "🍵",
        "price": 20,
        "shelfLife": 15,
        "season": "all",
        "category": "other",
        "desc": "微苦茶香，日式点心"
    },
    {
        "id": "coconut",
        "name": "椰蓉",
        "emoji": "🥥",
        "price": 14,
        "shelfLife": 12,
        "season": "all",
        "category": "other",
        "desc": "椰香扑鼻，松软香甜"
    },
    {
        "id": "meat",
        "name": "鲜肉",
        "emoji": "🥩",
        "price": 25,
        "shelfLife": 4,
        "season": "all",
        "category": "meat",
        "desc": "当天鲜肉，趁新鲜做菜"
    },
    {
        "id": "lemon",
        "name": "柠檬",
        "emoji": "🍋",
        "price": 9,
        "shelfLife": 6,
        "season": "all",
        "category": "fruit",
        "desc": "酸香提味，去腥解腻"
    },
    {
        "id": "potato",
        "name": "土豆",
        "emoji": "🥔",
        "price": 8,
        "shelfLife": 12,
        "season": "all",
        "category": "veg",
        "desc": "绵软百搭，蒸煮皆宜"
    },
    {
        "id": "onion",
        "name": "洋葱",
        "emoji": "🧅",
        "price": 7,
        "shelfLife": 10,
        "season": "all",
        "category": "veg",
        "desc": "辛香开胃，炒菜提香"
    },
    {
        "id": "pumpkin",
        "name": "南瓜",
        "emoji": "🎃",
        "price": 12,
        "shelfLife": 10,
        "season": "autumn",
        "category": "veg",
        "desc": "秋日限定，粉糯清甜"
    },
    {
        "id": "strawberry",
        "name": "草莓",
        "emoji": "🍓",
        "price": 16,
        "shelfLife": 5,
        "season": "spring",
        "category": "fruit",
        "desc": "春日限定，酸甜多汁"
    },
    {
        "id": "mango",
        "name": "芒果",
        "emoji": "🥭",
        "price": 18,
        "shelfLife": 5,
        "season": "summer",
        "category": "fruit",
        "desc": "夏日限定，香甜软糯"
    },
    {
        "id": "blueberry",
        "name": "蓝莓",
        "emoji": "🫐",
        "price": 22,
        "shelfLife": 5,
        "season": "summer",
        "category": "fruit",
        "desc": "夏日限定，清甜微酸"
    },
    {
        "id": "peach",
        "name": "蜜桃",
        "emoji": "🍑",
        "price": 15,
        "shelfLife": 5,
        "season": "summer",
        "category": "fruit",
        "desc": "夏日限定，水润香甜"
    },
    {
        "id": "apple",
        "name": "苹果",
        "emoji": "🍎",
        "price": 10,
        "shelfLife": 8,
        "season": "autumn",
        "category": "fruit",
        "desc": "秋日限定，脆甜多汁"
    },
    {
        "id": "banana",
        "name": "香蕉",
        "emoji": "🍌",
        "price": 10,
        "shelfLife": 6,
        "season": "all",
        "category": "fruit",
        "desc": "软糯香甜，四季常有"
    },
    {
        "id": "red_bean",
        "name": "红豆",
        "emoji": "🫘",
        "price": 12,
        "shelfLife": 10,
        "season": "winter",
        "category": "grain",
        "desc": "冬日限定，沙糯回甘"
    },
    {
        "id": "coffee_bean",
        "name": "咖啡豆",
        "emoji": "☕",
        "price": 25,
        "shelfLife": 20,
        "season": "all",
        "category": "other",
        "desc": "现磨现用，香醇提神"
    },
    {
        "id": "tomato",
        "name": "番茄",
        "emoji": "🍅",
        "price": 8,
        "shelfLife": 6,
        "season": "summer",
        "category": "veg",
        "desc": "夏日限定，酸甜多汁"
    },
    {
        "id": "pasta",
        "name": "意面",
        "emoji": "🍝",
        "price": 14,
        "shelfLife": 30,
        "season": "all",
        "category": "grain",
        "desc": "麦香弹牙，西餐主食"
    },
    {
        "id": "curry",
        "name": "咖喱块",
        "emoji": "🍛",
        "price": 12,
        "shelfLife": 60,
        "season": "all",
        "category": "other",
        "desc": "辛香浓郁，一煮就香"
    },
    {
        "id": "loach",
        "name": "泥鳅",
        "emoji": "🪱",
        "price": 10,
        "shelfLife": 3,
        "season": "all",
        "category": "fish",
        "desc": "公园摸的，鲜嫩小河鲜"
    },
    {
        "id": "crucian",
        "name": "鲫鱼",
        "emoji": "🐟",
        "price": 15,
        "shelfLife": 2,
        "season": "all",
        "category": "fish",
        "desc": "家常河鲜，炖汤最鲜"
    },
    {
        "id": "carp",
        "name": "鲤鱼",
        "emoji": "🐠",
        "price": 20,
        "shelfLife": 2,
        "season": "all",
        "category": "fish",
        "desc": "河鲜常客，红烧入味"
    }
];
})();
