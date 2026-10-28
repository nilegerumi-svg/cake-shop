
// js/data/attributes/flavor.js
// 这是味道属性的“字典”，只定义有哪些味道，以及取值范围。
// 没有任何逻辑，只有纯数据。

(function () {
    'use strict';

    // 先确保全局的 Cake 对象存在（如果别的文件已经创建过，就复用）
    window.Cake = window.Cake || {};

    // 把味道字典挂到 Cake 上，名字叫 ATTRIBUTES_FLAVOR
    // 以后其他文件就可以通过 Cake.ATTRIBUTES_FLAVOR 来读取它
    window.Cake.ATTRIBUTES_FLAVOR = {
        sweet:   { name: '甜', min: 0, max: 100, emoji: '🍬' },
        sour:    { name: '酸', min: 0, max: 100, emoji: '🍋' },
        salty:   { name: '咸', min: 0, max: 100, emoji: '🧂' },
        bitter:  { name: '苦', min: 0, max: 100, emoji: '☕' },
        umami:   { name: '鲜', min: 0, max: 100, emoji: '🍄' },
        spicy:   { name: '辣', min: 0, max: 100, emoji: '🌶️' },
        numbing: { name: '麻', min: 0, max: 100, emoji: '⚡' }
    };
})();
