// furniture_storage.js（分类：storage，共 2 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'FURNITURE';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["f_bookshelf"] = {
        "id": "f_bookshelf",
        "name": "书架",
        "emoji": "📚",
        "desc": "摆满甜点食谱",
        "category": "storage",
        "buyPrice": 200,
        "level": 1,
        "decor": 8
    };

    window.Cake[NS]["f_fish_fridge"] = {
        "id": "f_fish_fridge",
        "name": "河鲜冷藏柜",
        "emoji": "🧊",
        "desc": "鱼类食材放包里坏得慢：变质速度减半",
        "category": "storage",
        "buyPrice": 560,
        "level": 1,
        "decor": 5
    };
})();
