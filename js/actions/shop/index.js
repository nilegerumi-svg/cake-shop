// 顶层 await：确保卖出子模块（手动卖出 / 顾客结账 / 清理废品）已挂载
try {
    await import('./sell.js');
} catch (err) {
    console.warn('⚠️ [Actions/Shop] 出售子模块加载失败:', err && err.message);
}

(function () {
    'use strict';

    function getCake() {
        // 防御：某些环境下 window.parent 不可用，直接取属性会抛错导致整个模块失效
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    }

    function ensureStateShape(Cake) {
        if (!Cake || !Cake.store) return false;
        const state = Cake.store.state;
        if (!state) return false;

        state.shop = state.shop || {};
        state.shop.stats = state.shop.stats || {};
        state.shop.stats.cleanliness = Number(state.shop.stats.cleanliness ?? 100);
        state.shop.isOpen = !!state.shop.isOpen;
        state.shop.openTime = Number(state.shop.openTime ?? 8 * 60);
        state.shop.closeTime = Number(state.shop.closeTime ?? 21 * 60);
        state.shop.priceRate = Number(state.shop.priceRate ?? 1);

        return true;
    }

    function safeFail(msg) {
        return { success: false, message: msg };
    }

    function initShopActions(Cake) {
        if (!Cake || !Cake.store || !Cake.store.state) {
            return false;
        }

        if (Cake.__shopActionsInitialized) {
            return true;
        }
        Cake.__shopActionsInitialized = true;

        const getState = () => {
            if (!Cake.store || !Cake.store.state) return null;
            return Cake.store.state;
        };

        Cake.toggleShopStatus = function () {
            try {
                const state = getState();
                if (!state) return safeFail('店铺状态尚未初始化');

                const shop = state.shop || {};
                const time = state.time || { day: 1, hour: 8, minute: 0 };
                const currentMins = (Number(time.hour) || 8) * 60 + (Number(time.minute) || 0);

                if (!shop.isOpen) {
                    if (currentMins < Number(shop.openTime ?? 8 * 60)) {
                        return safeFail('⏰ 还没到营业时间');
                    }
                    if (currentMins >= Number(shop.closeTime ?? 21 * 60)) {
                        return safeFail('🌙 已经过了营业时间，早点休息吧');
                    }
                    if (Number(shop.stats?.cleanliness ?? 100) < 20) {
                        return safeFail('🧹 店里太脏了，顾客不会进来的，先打扫吧！');
                    }

                    shop.isOpen = true;
                    if (typeof Cake.addLog === 'function') {
                        Cake.addLog('🔔 店铺开始营业！', 'success');
                    }
                } else {
                    shop.isOpen = false;
                    if (typeof Cake.addLog === 'function') {
                        Cake.addLog('🔕 店铺已打烊。');
                    }
                }

                if (typeof Cake.emit === 'function') {
                    try { Cake.emit('refresh_ui'); } catch (_) {}
                }

                return { success: true };
            } catch (err) {
                console.error('[Shop] toggleShopStatus 出错:', err);
                return safeFail(err?.message || '切换营业状态失败');
            }
        };

        Cake.cleanShop = function () {
            try {
                const state = getState();
                if (!state) return safeFail('店铺状态尚未初始化');

                const shop = state.shop || {};
                const cleanliness = Number(shop.stats?.cleanliness ?? 100);
                const energy = Number(state.energy ?? 0);

                if (energy < 10) {
                    return safeFail('⚡ 太累了，打扫不动了。');
                }
                if (cleanliness >= 100) {
                    return safeFail('✨ 店里已经很干净了。');
                }

                state.energy = Math.max(0, energy - 10);
                shop.stats.cleanliness = Math.min(100, cleanliness + 30);

                if (typeof Cake.advanceTime === 'function') {
                    Cake.advanceTime(30);
                }

                if (typeof Cake.addLog === 'function') {
                    Cake.addLog('🧹 你花时间打扫了店铺，卫生度提升了。', 'success');
                }

                if (typeof Cake.emit === 'function') {
                    try { Cake.emit('refresh_ui'); } catch (_) {}
                }

                return { success: true };
            } catch (err) {
                console.error('[Shop] cleanShop 出错:', err);
                return safeFail(err?.message || '打扫失败');
            }
        };

        Cake.refreshShopUI = function () {
            try {
                if (typeof Cake.emit === 'function') {
                    Cake.emit('refresh_ui');
                }
                if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('refresh_ui'));
                }
            } catch (_) {
                // ignore
            }
        };

        ensureStateShape(Cake);

        if (typeof Cake.emit === 'function') {
            try { Cake.emit('refresh_ui'); } catch (_) {}
        }

        console.log('🏪 [Actions/Shop] 店铺经营与售卖系统装载完毕');
        return true;
    }

    function boot() {
        const Cake = getCake();

        if (Cake && Cake.store && Cake.store.state) {
            initShopActions(Cake);
            return;
        }

        if (window.__shopBootTimer) return;

        window.__shopBootTimer = setInterval(() => {
            const readyCake = getCake();
            if (readyCake && readyCake.store && readyCake.store.state) {
                clearInterval(window.__shopBootTimer);
                window.__shopBootTimer = null;
                initShopActions(readyCake);
            }
        }, 150);
    }

    boot();
})();
