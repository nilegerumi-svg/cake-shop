// js/data/attributes/index.js

import './flavor.js';
import './texture.js';
import './aroma.js';
import './temperature.js';
import './important_shelf_life/index.js'; // 👈 引入保质期文件夹

window.Cake = window.Cake || {};
window.Cake.ATTRIBUTES = {
    flavor: window.Cake.ATTRIBUTES_FLAVOR,
    texture: window.Cake.ATTRIBUTES_TEXTURE,
    aroma: window.Cake.ATTRIBUTES_AROMA,
    temperature: window.Cake.ATTRIBUTES_TEMPERATURE
};

console.log('📦 [Attributes] 属性与保质期字典装载完毕');
