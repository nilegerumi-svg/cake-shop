// js/actions/shop/index.js
(function () {
    'use strict';
    const Cake = window.Cake;

    // 开关门营业
    Cake.toggleShopStatus = function () {
        const state = Cake.store.state;
        const shop = state.shop;
        const currentMins = state.time.hour * 60 + state.time.minute;

        if (!shop.isOpen) {
            if (currentMins < shop.openTime) return Cake.fail(`⏰ 还没到营业时间`);
            if (currentMins >= shop.closeTime) return Cake.fail('🌙 已经过了营业时间，早点休息吧');
            if (shop.stats.cleanliness < 20) return Cake.fail('🧹 店里太脏了，先打扫吧！');
            
            shop.isOpen = true;
            Cake.addLog('🔔 店铺开始营业！');
        } else {
            shop.isOpen = false;
            Cake.addLog('🔕 店铺已打烊。');
        }
        Cake.refreshPage();
    };

    // 打扫卫生
    Cake.cleanShop = function () {
        const state = Cake.store.state;
        if (state.energy < 10) return Cake.fail('⚡ 太累了，打扫不动了。');
        if (state.shop.stats.cleanliness >= 100) return Cake.fail('✨ 店里已经很干净了。');

        state.energy -= 10;
        state.shop.stats.cleanliness = Math.min(100, state.shop.stats.cleanliness + 30);
        
        Cake.advanceTime(30); // 打扫耗时 30 分钟
        Cake.addLog('🧹 你花时间打扫了店铺，卫生度提升了。');
        Cake.refreshPage();
    };
})();
console.log('🏪 [Actions/Shop] 店铺经营系统装载完毕');
