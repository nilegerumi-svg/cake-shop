// js/data/weather/index.js（离线包表 bt）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.WEATHER = {
    "sunny": {
        "label": "晴天",
        "emoji": "☀️",
        "desc": "阳光明媚，适合出门走走",
        "outdoor": true
    },
    "cloudy": {
        "label": "多云",
        "emoji": "⛅",
        "desc": "云朵遮住太阳，风很舒服",
        "outdoor": true
    },
    "rain": {
        "label": "小雨",
        "emoji": "🌧️",
        "desc": "细雨绵绵，户外活动不太方便",
        "outdoor": false
    },
    "storm": {
        "label": "雷雨",
        "emoji": "⛈️",
        "desc": "电闪雷鸣，不宜外出",
        "outdoor": false
    },
    "snow": {
        "label": "下雪",
        "emoji": "🌨️",
        "desc": "雪花飘飘，路面湿滑小心",
        "outdoor": false
    }
};
})();
