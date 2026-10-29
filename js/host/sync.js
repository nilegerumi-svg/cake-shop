// js/host/sync.js (重写对齐)
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.saveGame = function () {
        if (!Cake.store || !Cake.store.state) return;
        try {
            localStorage.setItem('cake_shop_save', JSON.stringify(Cake.store.state));
        } catch (e) {
            console.error('❌ 保存失败', e);
        }
    };

    // 👈 对齐 main.js 的接口名
    Cake.loadStateFromStorage = function () {
        try {
            const raw = localStorage.getItem('cake_shop_save');
            if (raw) {
                return Cake.migrateState(JSON.parse(raw));
            }
        } catch (e) {
            console.error('❌ 读取存档失败', e);
        }
        return Cake.createEmptyState();
    };
})();
