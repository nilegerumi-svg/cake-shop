// js/data/festivals/calendar.js（离线包表 Oi）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.FESTIVAL_CALENDAR = [
    {
        "id": "new_year",
        "name": "春节",
        "emoji": "🧧",
        "lunar": true,
        "month": 1,
        "day": 1,
        "desc": "小镇家家户户张灯结彩，爆竹声此起彼伏，是一年里最热闹的日子。",
        "visitsBonus": 4,
        "moodBonus": 20,
        "sellMult": 0.15,
        "tip": "全城喜庆：客流大增，点心更受欢迎"
    },
    {
        "id": "lantern",
        "name": "元宵节",
        "emoji": "🏮",
        "lunar": true,
        "month": 1,
        "day": 15,
        "desc": "广场挂满花灯，猜灯谜、吃汤圆，孩子们提着灯笼满街跑。",
        "visitsBonus": 2,
        "moodBonus": 10,
        "sellMult": 0.08,
        "tip": "花灯夜市：傍晚后客流更旺"
    },
    {
        "id": "new_year_solar",
        "name": "元旦",
        "emoji": "🎆",
        "month": 1,
        "day": 1,
        "desc": "新年第一天，小镇广场放起烟花，大家互道新年快乐。",
        "visitsBonus": 2,
        "moodBonus": 10,
        "tip": "新年新气象：今日客流增加"
    },
    {
        "id": "valentine",
        "name": "情人节",
        "emoji": "💝",
        "month": 2,
        "day": 14,
        "desc": "满街都是玫瑰与巧克力，蛋糕店的情人节限定点心格外抢手。",
        "visitsBonus": 3,
        "sellMult": 0.12,
        "tip": "甜点热卖：蛋糕格外好卖"
    },
    {
        "id": "sakura",
        "name": "樱花节",
        "emoji": "🌸",
        "month": 3,
        "day": 25,
        "desc": "河边与公园的樱花全开了，小镇办起樱花野餐会，赏花的人络绎不绝。",
        "visitsBonus": 2,
        "moodBonus": 10,
        "sellMult": 0.06,
        "tip": "樱花野餐：外出心情更好"
    },
    {
        "id": "labor",
        "name": "劳动节",
        "emoji": "🎉",
        "month": 5,
        "day": 1,
        "desc": "全镇放假，大家结伴逛街野餐，蛋糕店也迎来了休假客流。",
        "visitsBonus": 3,
        "sellMult": 0.06,
        "tip": "假日客流：逛街的人变多了"
    },
    {
        "id": "sweet_fest",
        "name": "甜蜜节",
        "emoji": "🍬",
        "month": 6,
        "day": 6,
        "desc": "小镇一年一度的甜品狂欢节，每家甜品店都摆出看家点心，评选「小镇第一甜」。",
        "visitsBonus": 4,
        "sellMult": 0.2,
        "tip": "甜品节：蛋糕销量与单价双加成"
    },
    {
        "id": "qixi",
        "name": "七夕",
        "emoji": "💫",
        "lunar": true,
        "month": 7,
        "day": 7,
        "desc": "牛郎织女相会的日子，情侣们互赠点心与花束，夜晚的广场星星特别亮。",
        "visitsBonus": 2,
        "sellMult": 0.1,
        "tip": "约会圣地：情侣订单变多"
    },
    {
        "id": "mid_autumn",
        "name": "中秋节",
        "emoji": "🌕",
        "lunar": true,
        "month": 8,
        "day": 15,
        "desc": "月亮又圆又亮，家家户户吃月饼赏月，蛋糕店也推出了月饼点心。",
        "visitsBonus": 3,
        "sellMult": 0.1,
        "tip": "赏月节：点心礼盒热卖"
    },
    {
        "id": "harvest",
        "name": "丰收节",
        "emoji": "🌾",
        "month": 9,
        "day": 22,
        "desc": "果园与农田迎来大丰收，农贸市场摆满新鲜瓜果，镇民一起庆祝丰收。",
        "visitsBonus": 2,
        "moodBonus": 8,
        "tip": "丰收喜悦：今日心情更好"
    },
    {
        "id": "national",
        "name": "国庆节",
        "emoji": "🎇",
        "month": 10,
        "day": 1,
        "desc": "小镇挂起国旗，广场办起庆祝演出，大家放假出游。",
        "visitsBonus": 3,
        "sellMult": 0.08,
        "tip": "长假客流：今日顾客更多"
    },
    {
        "id": "winter_solstice",
        "name": "冬至",
        "emoji": "🥟",
        "month": 12,
        "day": 21,
        "desc": "冬至大如年，家家户户包饺子、吃汤圆，暖暖和和过冬。",
        "visitsBonus": 2,
        "moodBonus": 8,
        "tip": "冬至进补：点心配热饮更受欢迎"
    },
    {
        "id": "christmas",
        "name": "平安夜",
        "emoji": "🎄",
        "month": 12,
        "day": 24,
        "desc": "小镇的街道亮起彩灯，圣诞老人给孩子们发糖果，蛋糕店挤满了买礼物的人。",
        "visitsBonus": 3,
        "sellMult": 0.12,
        "tip": "礼物季：点心礼盒热销"
    }
];
})();
