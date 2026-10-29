// js/data/seasons/index.js
import './spring.js';
import './summer.js';
import './autumn.js';
import './winter.js';

(function () {
    'use strict';
    window.Cake = window.Cake || {};
    const Cake = window.Cake;

    // 把四个季节合并成字典
    Cake.SEASONS = Object.freeze({
        spring: Cake.SEASON_SPRING,
        summer: Cake.SEASON_SUMMER,
        autumn: Cake.SEASON_AUTUMN,
        winter: Cake.SEASON_WINTER
    });

    const SEASON_LENGTH = 30; // 每个季节 30 天

    // 根据天数推算当前季节 ID
    Cake.getSeasonByDay = function (day) {
        const index = Math.floor((day - 1) / SEASON_LENGTH) % 4;
        const keys = ['spring', 'summer', 'autumn', 'winter'];
        return keys[index];
    };

    // 👈 核心逻辑：判断某物品是否在当前季节允许出现
    Cake.isItemAvailableInSeason = function (itemId) {
        const state = Cake.store?.state;
        if (!state || !state.time) return true;
        
        const currentSeasonId = state.time.season || 'spring';
        const seasonData = Cake.SEASONS[currentSeasonId];
        
        if (!seasonData || !seasonData.whitelist) return true; // 如果没有配置白名单，默认放行
        
        return seasonData.whitelist.includes(itemId);
    };

    console.log('🌸 [Data/Seasons] 季节白名单引擎装载完毕');
})();
