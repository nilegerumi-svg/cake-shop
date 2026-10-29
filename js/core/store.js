// js/core/store.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    let _state = null;

    // 我们的统一存档 Key
    const SAVE_KEY = 'cake_shop_save';

    const ensureState = () => {
        if (!_state) {
            // 安全兜底：如果没初始化，调用 schema.js 生成一个全新状态
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
        
        // 暴露存档 Key 给 render.js 使用
        SAVE_KEY: SAVE_KEY,

        // 👈 统一的保存接口
        saveState: function () {
            if (!_state) return;
            try {
                localStorage.setItem(SAVE_KEY, JSON.stringify(_state));
            } catch (e) {
                console.warn('⚠️ [Store] 存档保存失败:', e);
            }
        },

        // 👈 统一的读取接口 (供 host/main.js 调用)
        loadStateFromStorage: function () {
            try {
                const raw = localStorage.getItem(SAVE_KEY);
                if (raw) {
                    const parsed = JSON.parse(raw);
                    // 用 migrate.js 洗一遍数据，保证兼容旧版本
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

    // 为了兼容之前代码里用到的 Cake.saveState() 和 Cake.loadStateFromStorage()，将它们提升到最外层
    window.Cake.saveState = window.Cake.store.saveState;
    window.Cake.hasSave = function () {
        try {
            return !!localStorage.getItem(SAVE_KEY);
        } catch (_) {
            return false;
        }
    };
    
    window.Cake.loadStateFromStorage = window.Cake.store.loadStateFromStorage;

    console.log('📦 [Store] 状态容器与存档系统装载完毕');
})();
