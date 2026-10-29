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
    window.Cake.RECIPES_CHINA_HOME
    // 以后你的八大菜系（sichuan, cantonese等）写好了也加在这里
);

console.log('🥢 [Recipes/China] 中国菜系装载完毕');
console.log('📦 [Data/Recipes/China] 中国八大菜系装载完毕');
