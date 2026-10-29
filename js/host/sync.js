// js/host/sync.js
(function () {
    'use strict';
    const Cake = window.Cake;

    Cake.saveGame = function () {
        if (!Cake.store || !Cake.store.state) return;
        try {
            localStorage.setItem('cake_shop_save', JSON.stringify(Cake.store.state));
            console.log('💾 [Host/Sync] 游戏已自动保存');
        } catch (e) {
            console.error('❌ [Host/Sync] 保存失败', e);
        }
    };

    Cake.loadGame = function () {
        try {
            const raw = localStorage.getItem('cake_shop_save');
            if (raw) {
                const parsed = JSON.parse(raw);
                // 使用 migrate 处理旧存档
                return Cake.migrateState ? Cake.migrateState(parsed) : parsed;
            }
        } catch (e) {
            console.error('❌ [Host/Sync] 读取存档失败', e);
        }
        return null;
    };
})();
