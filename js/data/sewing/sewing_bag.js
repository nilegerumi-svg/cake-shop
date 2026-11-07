// sewing_bag.js（分类：bag，共 3 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'SEWING';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["cp_tote"] = {
        "id": "cp_tote",
        "outfitId": "o_bag_tote",
        "name": "帆布托特包",
        "emoji": "👜",
        "category": "bag",
        "difficulty": 2,
        "thread": 3,
        "desc": "能装点心的大托特包"
    };

    window.Cake[NS]["cp_bag_cross"] = {
        "id": "cp_bag_cross",
        "outfitId": "o_bag_cross",
        "name": "斜挎小包",
        "emoji": "👝",
        "category": "bag",
        "difficulty": 2,
        "thread": 2,
        "button": 1,
        "desc": "小巧的斜挎包，装零钱和钥匙刚好"
    };

    window.Cake[NS]["cp_bag_hand"] = {
        "id": "cp_bag_hand",
        "outfitId": "o_bag_hand",
        "name": "手提包",
        "emoji": "💼",
        "category": "bag",
        "difficulty": 3,
        "thread": 3,
        "button": 2,
        "desc": "精致的手提包，见客也不怯场"
    };
})();
