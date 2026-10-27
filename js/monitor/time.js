// js/monitor/time.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 记录上一次的天数
    let lastDay = null;

    // 监听时间变化
    Cake.MonitorTime = {
        init: () => {
            lastDay = Cake.store.state.day;
        },
        update: (oldDay, newDay) => {
            if (newDay > oldDay) {
                console.log(`🕒 [监视器] 跨天发生：第 ${oldDay} 天 -> 第 ${newDay} 天`);
                
                // 在这里触发跨天事件
                // 💡 扩展点：比如 Cake.addLog('🏠 房东来收租了...') 等等

                // 如果当前在子页面，通知页面重绘
                if (window.parent.Cake && window.parent.Cake.refreshPage) {
                    window.parent.Cake.refreshPage();
                }
            }
        }
    };

    // 挂载到全局时间引擎里（挂靠到 advanceTime 之后）
    const originalAdvanceTime = Cake.advanceTime;
    if (originalAdvanceTime) {
        Cake.advanceTime = (minutes) => {
            const oldDay = Cake.store.state.day;
            originalAdvanceTime(minutes); // 执行原本的推进
            const newDay = Cake.store.state.day;
            
            // 触发监视器检查
            Cake.MonitorTime.update(oldDay, newDay);
        };
    }
})();
