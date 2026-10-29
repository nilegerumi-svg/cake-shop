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

    /* ==================== 全年常备物资 ====================
     * 时令白名单只应限制「应季生鲜」（果蔬、肉禽、水产），
     * 基础粉面、蛋奶、调味料与基建材料属于全年常备，否则新开局会连烤箱都买不到。
     */
    const BASE_PANTRY = Object.freeze([
        // 基础粉面与谷物
        'flour_low', 'flour_high', 'starch', 'noodles',
        'japonica_rice', 'glutinous_rice', 'black_rice', 'millet',
        'mung_bean', 'red_bean', 'soybean',
        // 蛋奶
        'chicken_egg', 'duck_egg', 'quail_egg', 'century_egg',
        'milk', 'butter', 'cream', 'cheese',
        // 调味与辅料
        'sugar', 'salt', 'oil', 'vinegar', 'soy_sauce_light', 'soy_sauce_dark',
        'oyster_sauce', 'doubanjiang', 'cooking_wine', 'huangjiu', 'sesame_oil',
        'msg', 'yeast', 'baking_soda', 'gelatin', 'agar',
        'garlic', 'ginger', 'scallion', 'onion',
        'chili', 'sichuan_pepper', 'star_anise',
        // 基建材料（造工具用）
        'wood', 'iron', 'parts'
    ]);

    Cake.BASE_PANTRY = BASE_PANTRY;

    const isBasePantry = (itemId) => BASE_PANTRY.indexOf(itemId) !== -1;

    // 👈 核心逻辑：判断某物品是否在当前季节允许出现
    Cake.isItemAvailableInSeason = function (itemId) {
        // 工具与材料包不受时令限制
        if (Cake.TOOLS && Cake.TOOLS[itemId]) return true;
        if (Array.isArray(Cake.BUNDLES) && Cake.BUNDLES.some((b) => b && b.id === itemId)) return true;

        // 全年常备的基础原料直接放行
        if (isBasePantry(itemId)) return true;

        const state = Cake.store?.state;
        if (!state || !state.time) return true;

        const currentSeasonId = state.time.season || 'spring';
        const seasonData = Cake.SEASONS[currentSeasonId];

        if (!seasonData || !seasonData.whitelist) return true; // 如果没有配置白名单，默认放行

        return seasonData.whitelist.includes(itemId);
    };

    console.log('🌸 [Data/Seasons] 季节白名单引擎装载完毕');
})();
