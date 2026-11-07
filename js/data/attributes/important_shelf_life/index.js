// js/data/attributes/important_shelf_life/index.js
import './shelf_life.js';
import './spoil.js';

window.Cake = window.Cake || {};
window.Cake.SHELF_LIFE = {
    RULES: window.Cake.SHELF_LIFE_RULES,
    STATES: window.Cake.SPOILAGE_STATES,
    getRandomShelfLife: window.Cake.getRandomShelfLife,
    getSpoilageState: window.Cake.getSpoilageState
};

console.log('⏳ [ShelfLife] 保质期与变质系统装载完毕');
