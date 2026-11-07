// js/data/characters/tiers.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.AFFECTION_TIERS = {
    "tiers": [
        {
            "key": "stranger",
            "label": "陌生",
            "min": 0
        },
        {
            "key": "friend",
            "label": "朋友",
            "min": 20
        },
        {
            "key": "close",
            "label": "亲近",
            "min": 50
        },
        {
            "key": "lover",
            "label": "恋人",
            "min": 100
        }
    ],
    "desc": "好感度四档：陌生（<20）→ 朋友（≥20）→ 亲近（≥50）→ 恋人（≥100）"
};
})();
