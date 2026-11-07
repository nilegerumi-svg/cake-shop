// js/data/baking/kinds.js（离线包表 CBW_KINDS）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.CAKE_KINDS = [
    {
        "id": "staple",
        "name": "主食",
        "price": 4,
        "sugar": 2,
        "butter": 1,
        "desc": "高油高糖，扎实管饱"
    },
    {
        "id": "fancy",
        "name": "花色",
        "price": 6,
        "sugar": 1,
        "butter": 0,
        "desc": "馅料选择更多"
    },
    {
        "id": "cooked",
        "name": "调理",
        "price": 12,
        "sugar": 1,
        "butter": 0,
        "needBread": true,
        "desc": "用 1 份现成面包做底"
    },
    {
        "id": "shortening",
        "name": "酥油",
        "price": 10,
        "sugar": 1,
        "butter": 2,
        "desc": "高油难做，烘焙熟练度越高越稳"
    }
];
})();
