// furniture_table.js（分类：table，共 4 项）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    var NS = 'FURNITURE';
    window.Cake[NS] = window.Cake[NS] || {};

    window.Cake[NS]["f_table"] = {
        "id": "f_table",
        "name": "小圆桌",
        "emoji": "🪑",
        "desc": "喝茶看书的角落",
        "category": "table",
        "buyPrice": 120,
        "level": 1,
        "decor": 4
    };

    window.Cake[NS]["f_cashier"] = {
        "id": "f_cashier",
        "name": "收银台",
        "emoji": "🧾",
        "desc": "开店收银的柜台",
        "category": "table",
        "buyPrice": 280,
        "level": 1,
        "decor": 9
    };

    window.Cake[NS]["f_showcase"] = {
        "id": "f_showcase",
        "name": "甜品展示台",
        "emoji": "🍰",
        "desc": "把最得意的点心摆在台面上",
        "category": "table",
        "buyPrice": 480,
        "level": 3,
        "materials": {
            "wood": 3,
            "glass": 2,
            "glue": 1
        },
        "decor": 10
    };

    window.Cake[NS]["f_vanity"] = {
        "id": "f_vanity",
        "name": "梳妆台",
        "emoji": "🪞",
        "desc": "梳洗打扮的专属角落",
        "category": "table",
        "buyPrice": 680,
        "level": 4,
        "materials": {
            "wood": 4,
            "glass": 2,
            "nail": 2,
            "paint": 2
        },
        "decor": 11
    };
})();
