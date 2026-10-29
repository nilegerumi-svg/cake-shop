// js/data/seasons/index.js
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    // 我们设定每个季节持续 30 天
    const SEASON_LENGTH = 30;

    window.Cake.SEASONS = Object.freeze({
        spring: { name: '春', emoji: '🌸', desc: '万物复苏，草莓与樱花的季节。' },
        summer: { name: '夏', emoji: '🌊', desc: '炎炎夏日，适合清凉的冰品和水果。' },
        autumn: { name: '秋', emoji: '🍁', desc: '金秋送爽，南瓜与栗子大丰收。' },
        winter: { name: '冬', emoji: '❄️', desc: '寒冬腊月，热乎乎的甜点最治愈。' }
    });

    // 根据天数获取当前季节
    window.Cake.getSeasonByDay = function (day) {
        // 假设第 1 天是春天
        const index = Math.floor((day - 1) / SEASON_LENGTH) % 4;
        const keys = ['spring', 'summer', 'autumn', 'winter'];
        return keys[index];
    };
})();
