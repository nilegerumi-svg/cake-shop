// js/data/activities/rides.js（离线包表 $y）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.PARK_RIDES = [
    {
        "id": "ferris",
        "name": "摩天轮",
        "emoji": "🎡",
        "desc": "转到最高点看小镇全景，一圈 45 分钟",
        "cost": 30,
        "minutes": 45,
        "mood": 8,
        "energy": -2,
        "satiety": -5
    },
    {
        "id": "carousel",
        "name": "旋转木马",
        "emoji": "🎠",
        "desc": "慢悠悠转圈，找回童心的 20 分钟",
        "cost": 15,
        "minutes": 20,
        "mood": 5,
        "energy": 0,
        "satiety": -2
    },
    {
        "id": "coaster",
        "name": "过山车",
        "emoji": "🎢",
        "desc": "俯冲失重超刺激，30 分钟热血沸腾",
        "cost": 40,
        "minutes": 30,
        "mood": 10,
        "energy": -5,
        "satiety": -8
    },
    {
        "id": "bumper",
        "name": "碰碰车",
        "emoji": "🚗",
        "desc": "撞来撞去笑不停，25 分钟尽兴而归",
        "cost": 25,
        "minutes": 25,
        "mood": 6,
        "energy": -3,
        "satiety": -3
    }
];
})();
