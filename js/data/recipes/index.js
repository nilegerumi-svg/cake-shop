//js/data/recipes/index.js
window.Cake = window.Cake || {};

(() => {
    'use strict';

    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    window.Cake.RECIPES = deepFreeze({
        '海绵蛋糕': {
            emoji: '🍰',
            ing: { flour: 2, egg: 2, sugar: 1 },
            price: 80, rep: 2,
            desc: '松软香甜的基础蛋糕，新手必学。',
        },
        '草莓奶油蛋糕': {
            emoji: '🍓',
            ing: { flour: 2, egg: 2, sugar: 1, cream: 1, fruit: 1 },
            price: 150, rep: 4,
            desc: '人气最高的招牌，少女心满满。',
        },
        '巧克力慕斯': {
            emoji: '🍫',
            ing: { chocolate: 2, cream: 1, sugar: 1, egg: 1 },
            price: 180, rep: 5,
            desc: '丝滑浓郁，微苦回甘。',
            unlock: { money: 300, rep: 10, shop: 1 },
        },
        '抹茶千层': {
            emoji: '🍵',
            ing: { flour: 2, egg: 2, cream: 2, sugar: 1 },
            price: 200, rep: 6,
            desc: '层层叠叠的茶香，清新雅致。',
            unlock: { money: 500, rep: 25, shop: 1 },
        },
        '提拉米苏': {
            emoji: '☕',
            ing: { flour: 1, egg: 2, sugar: 1, cream: 1, chocolate: 1 },
            price: 220, rep: 7,
            desc: '带我走，浪漫的意大利经典。',
            unlock: { money: 700, rep: 40, shop: 2 },
        },
        '马卡龙': {
            emoji: '🌸',
            ing: { sugar: 2, flour: 1, egg: 1, nuts: 1 },
            price: 260, rep: 8,
            desc: '五彩缤纷的甜蜜小圆饼。',
            unlock: { money: 1000, rep: 60, shop: 2 },
        },
        '红丝绒蛋糕': {
            emoji: '❤️',
            ing: { flour: 2, egg: 2, sugar: 1, butter: 2, cream: 1 },
            price: 320, rep: 10,
            desc: '如红宝石般华丽，口感绵密。',
            unlock: { money: 1500, rep: 80, shop: 3 },
        },
        '星空蛋糕': {
            emoji: '✨',
            ing: { flour: 2, egg: 3, sugar: 2, cream: 2, chocolate: 1, fruit: 1 },
            price: 450, rep: 15,
            desc: '深邃星河，梦幻的颜值担当。',
            unlock: { money: 2500, rep: 120, shop: 4 },
        },
        '婚礼蛋糕': {
            emoji: '💍',
            ing: { flour: 3, egg: 4, sugar: 2, butter: 3, cream: 3, fruit: 2, nuts: 1 },
            price: 800, rep: 25,
            desc: '象征幸福的顶级蛋糕，需要精湛技艺。',
            unlock: { money: 5000, rep: 200, shop: 5 },
        },
    });
})();
