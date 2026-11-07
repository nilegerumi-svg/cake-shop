// js/data/gardening/seeds.js（阳台种花：种子 → 花瓣）
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.GARDEN_SEEDS = {
        seed_daisy: {
            id: 'seed_daisy', name: '雏菊种子', emoji: '🌼',
            flower: 'daisy_petal', flowerName: '雏菊花瓣',
            growDays: 2, water: 1,
            desc: '小朵白黄相间，两天开花，花瓣可入酱。'
        },
        seed_rose: {
            id: 'seed_rose', name: '玫瑰种子', emoji: '🌹',
            flower: 'rose_petal', flowerName: '玫瑰花瓣',
            growDays: 3, water: 1,
            desc: '香气最浓，三天开花，是玫瑰酱的主料。'
        },
        seed_sunflower: {
            id: 'seed_sunflower', name: '向日葵种子', emoji: '🌻',
            flower: 'sunflower_petal', flowerName: '向日葵花瓣',
            growDays: 3, water: 1,
            desc: '大朵向阳，花瓣厚实，可做花酱或装饰。'
        },
        seed_peony: {
            id: 'seed_peony', name: '牡丹种子', emoji: '🌺',
            flower: 'peony_petal', flowerName: '牡丹花瓣',
            growDays: 4, water: 2,
            desc: '雍容大朵，四天开花，花瓣可装饰入酱。'
        }
    };
    console.log('🌱 [Data/Gardening] 阳台种子装载完毕:', Object.keys(window.Cake.GARDEN_SEEDS).length, '种');
})();
