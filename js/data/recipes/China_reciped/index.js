// js/data/recipes/China_reciped/index.js

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

window.Cake = window.Cake || {};
window.Cake.RECIPES_CHINA = Object.assign(
    {},
    window.Cake.RECIPES_CHINA_HOME || {},
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
