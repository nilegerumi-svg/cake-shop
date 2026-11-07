// js/data/bundles/index.js
import './basic.js';
import './pro.js';
import './fruit.js';
import './choc.js';

(function () {
    'use strict';

    window.Cake = window.Cake || {};
    
    // 递归冻结，防止数据被意外修改
    const deepFreeze = (obj) => {
        if (obj === null || typeof obj !== 'object' || Object.isFrozen(obj)) return obj;
        for (const key of Object.keys(obj)) deepFreeze(obj[key]);
        return Object.freeze(obj);
    };

    // 👈 在这里把所有包汇总成一个大的数组
    const allBundles = [
        ...(window.Cake.BUNDLE_BASIC || []),
        ...(window.Cake.BUNDLE_PRO || []),
        ...(window.Cake.BUNDLE_FRUIT || []),
        ...(window.Cake.BUNDLE_CHOC || [])
    ];

    window.Cake.BUNDLES = deepFreeze(allBundles);

    console.log('🎁 [Data/Bundles] 材料包系统装载完毕，共', window.Cake.BUNDLES.length, '种');
})();
