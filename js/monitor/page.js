// js/monitor/page.js
(() => {
    'use strict';

    const getCake = () => {
        try {
            if (window.parent && window.parent !== window && window.parent.Cake) {
                return window.parent.Cake;
            }
        } catch (_) { /* 跨域忽略 */ }
        return window.Cake || null;
    };

    const Cake = getCake();
    if (!Cake) return;

    // 防重复挂载
    if (Cake.__monitorPageLoaded) {
        console.log('📄 [监视器] 存档监视器已加载，跳过重复初始化');
        return;
    }
    Cake.__monitorPageLoaded = true;

    // 每个页面只监听一次
    if (window.__monitorPageBound) return;
    window.__monitorPageBound = true;

    window.addEventListener('storage', (e) => {
        // 只关心存档 key：Cake.SAVE_KEY 不存在时不拦截（宽松模式）
        if (e.key && typeof Cake.SAVE_KEY === 'string' && e.key !== Cake.SAVE_KEY) {
            return;
        }

        // 重新从存储读取数据
        if (typeof Cake.loadStateFromStorage !== 'function') return;

        let nextState;
        try {
            nextState = Cake.loadStateFromStorage();
        } catch (err) {
            console.warn('⚠️ [监视器] loadStateFromStorage 失败:', err);
            return;
        }
        if (!nextState) return;

        try {
            if (Cake.store) Cake.store.state = nextState;
        } catch (_) { return; }

        // 防止 refreshPage 内部再次写 storage 导致死循环
        Cake.__syncing = true;
        try {
            if (typeof Cake.refreshPage === 'function') {
                Cake.refreshPage();
            }
        } catch (err) {
            console.warn('⚠️ [监视器] refreshPage 失败:', err);
        } finally {
            Cake.__syncing = false;
        }
    });
})();
