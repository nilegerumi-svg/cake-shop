// furniture_decor.js（分类：decor，共 3 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'FURNITURE';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["f_rug"] = {
        "id": "f_rug",
        "name": "地毯",
        "emoji": "🧶",
        "desc": "软软的脚感",
        "category": "decor",
        "buyPrice": 180,
        "level": 1,
        "decor": 5
    };

    window.Cake[NS]["f_plant"] = {
        "id": "f_plant",
        "name": "花架",
        "emoji": "🪴",
        "desc": "养几盆绿植",
        "category": "decor",
        "buyPrice": 160,
        "level": 1,
        "decor": 6
    };

    window.Cake[NS]["f_painting"] = {
        "id": "f_painting",
        "name": "挂画",
        "emoji": "🖼️",
        "desc": "墙上的风景",
        "category": "decor",
        "buyPrice": 220,
        "level": 1,
        "decor": 7
    };
})();
