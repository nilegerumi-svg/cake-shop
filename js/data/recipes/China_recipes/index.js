// js/data/recipes/China_recipes/index.js

// 严格注意大小写，必须和 GitHub 上的文件夹名称一模一样！
import './AnHui/index.js';
import './FuJian/index.js';
import './HuNan/index.js';
import './HuaiYang/index.js';
import './ShanDong/index.js';
import './SiChuan/index.js';
import './ZheJiang/index.js';
import './cantonese/index.js';     // 注意：这个文件夹首字母是小写 c
import './home_cooking.js';
import './home_cooking_more.js';
import './indian_cuisine.js';
import './korean_cuisine.js';
import './vietnamese_cuisine.js';
import './american_cuisine.js';
import './french_cuisine.js';
import './sichuan_cuisine.js';
import './home_cooking_extra_1.js';
import './home_cooking_extra_2.js';
import './home_cooking_extra_3.js';
import './shandong_cuisine.js';
import './german_cuisine.js';
import './hunan_cuisine.js';
import './spanish_cuisine.js';
import './huaiyang_cuisine.js';
import './japanese_cuisine.js';
import './british_cuisine.js';
import './cantonese_cuisine.js';
import './thai_cuisine.js';
import './anhui_cuisine.js';
import './italian_cuisine.js';
import './fujian_cuisine.js';

window.Cake = window.Cake || {};
window.Cake.RECIPES_CHINA = Object.assign(
    {},
    window.Cake.RECIPES_CHINA_HOME || {},
    window.Cake.RECIPES_CHINA_HOME_MORE || {},
    window.Cake.RECIPES_CHINA_IMPORTED || {},
    // 八大菜系
    window.Cake.RECIPES_CHINA_SICHUAN || {},
    window.Cake.RECIPES_CHINA_CANTONESE || {},
    window.Cake.RECIPES_CHINA_SHANDONG || {},
    window.Cake.RECIPES_CHINA_HUAIYANG || {},
    window.Cake.RECIPES_CHINA_HUNAN || {},
    window.Cake.RECIPES_CHINA_ANHUI || {},
    window.Cake.RECIPES_CHINA_FUJIAN || {},
    window.Cake.RECIPES_CHINA_ZHEJIANG || {}
);

console.log('🥢 [Recipes/China] 中国菜系装载完毕');
console.log('📦 [Data/Recipes/China] 中国八大菜系装载完毕');
