// js/core/store.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    let _state = null;
    const SAVE_KEY = 'cake_shop_save';

    const ensureState = () => {
        if (!_state) {
            if (typeof window.Cake.createEmptyState === 'function') {
                _state = window.Cake.createEmptyState();
            } else {
                console.error('❌ [Store] 找不到 createEmptyState，请检查 schema.js 是否加载！');
                _state = { version: 1, money: 100, time: { day: 1, hour: 8, minute: 0 } };
            }
        }
        return _state;
    };

    window.Cake.store = {
        get state() {
            return ensureState();
        },
        set state(val) {
            _state = val;
            // 设置状态时自动保存一次
            window.Cake.saveState();
        },
        
        SAVE_KEY: SAVE_KEY,

        // 👈 检查是否有存档（开始页用）
        hasSave: function () {
            try {
                return !!localStorage.getItem(SAVE_KEY);
            } catch (_) {
                return false;
            }
        },

        saveState: function () {
            if (!_state) return;
            try {
                localStorage.setItem(SAVE_KEY, JSON.stringify(_state));
            } catch (e) {
                console.warn('⚠️ [Store] 存档保存失败:', e);
            }
        },

        loadStateFromStorage: function () {
            try {
                const raw = localStorage.getItem(SAVE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    if (typeof window.Cake.migrateState === 'function') {
                        _state = window.Cake.migrateState(parsed);
                    } else {
                        _state = parsed;
                    }
                } else {
                    _state = ensureState();
                }
            } catch (e) {
                console.warn('⚠️ [Store] 存档读取失败，将使用新存档:', e);
                _state = ensureState();
            }
            return _state;
        }
    };

    // 把常用方法提升到 Cake 根对象，方便调用
    window.Cake.hasSave = window.Cake.store.hasSave;
    window.Cake.saveState = window.Cake.store.saveState;
    window.Cake.loadStateFromStorage = window.Cake.store.loadStateFromStorage;

    console.log('📦 [Store] 状态容器与存档系统装载完毕');
})();
