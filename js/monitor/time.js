// js/monitor/time.js
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

    // 防重复挂载：避免 advanceTime 被套娃包装
    if (Cake.__monitorTimeLoaded) {
        console.log('🕒 [监视器] 时间监视器已加载，跳过重复初始化');
        return;
    }

    // advanceTime 可能还没定义，做一个延迟挂载
    const mount = () => {
        if (Cake.__monitorTimeLoaded) return true;
        if (typeof Cake.advanceTime !== 'function') return false;

        Cake.__monitorTimeLoaded = true;

        let lastDay = null;

        Cake.MonitorTime = {
            init: () => {
                try { lastDay = Cake.store.state.day; } catch (_) { lastDay = null; }
            },
            update: (oldDay, newDay) => {
                if (newDay > oldDay) {
                    console.log(`🕒 [监视器] 跨天发生：第 ${oldDay} 天 -> 第 ${newDay} 天`);

                    // 扩展点：跨天副作用在这里加
                    // try { Cake.addLog('🏠 房东来收租了...'); } catch (_) {}

                    // 若当前是子页面，通知父页面重绘
                    try {
                        if (window.parent && window.parent !== window &&
                            window.parent.Cake && typeof window.parent.Cake.refreshPage === 'function') {
                            window.parent.Cake.refreshPage();
                        }
                    } catch (_) { /* 跨域忽略 */ }
                }
            }
        };

        const originalAdvanceTime = Cake.advanceTime;

        Cake.advanceTime = function (minutes) {
            let oldDay = null;
            try { oldDay = Cake.store.state.day; } catch (_) {}

            const result = originalAdvanceTime.call(this, minutes);

            // 同步返回值：直接读 newDay
            // Promise 返回值：等 resolve 后再读（避免读到旧 day）
            if (result && typeof result.then === 'function') {
                result.then(() => {
                    try {
                        const newDay = Cake.store.state.day;
                        if (oldDay !== null && newDay > oldDay) {
                            Cake.MonitorTime.update(oldDay, newDay);
                        }
                    } catch (_) {}
                }).catch(() => { /* 原函数已自己处理错误 */ });
            } else {
                try {
                    const newDay = Cake.store.state.day;
                    if (oldDay !== null && newDay > oldDay) {
                        Cake.MonitorTime.update(oldDay, newDay);
                    }
                } catch (_) {}
            }

            return result;
        };

        return true;
    };

    if (mount()) return;

    // advanceTime 还没准备好：轮询挂载，最多 10s
    let tries = 0;
    const MAX_TRIES = 100; // 100 × 100ms = 10s
    const timer = setInterval(() => {
        if (mount()) {
            clearInterval(timer);
            return;
        }
        if (++tries >= MAX_TRIES) {
            clearInterval(timer);
            console.warn('⚠️ [监视器] advanceTime 始终未定义，时间监视器未挂载');
        }
    }, 100);
})();
