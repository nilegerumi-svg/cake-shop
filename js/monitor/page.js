// js/monitor/page.js
(() => {
    'use strict';
    const Cake = window.parent.Cake || window.Cake;
    if (!Cake) return;

    // 监听存档变化
    window.addEventListener('storage', (e) => {
        // 只监听特定的存档 key，避免其他数据干扰
        if (e.key && e.key !== Cake.SAVE_KEY) return;

        // 重新从存储读取数据
        try {
            Cake.store.state = Cake.loadStateFromStorage();
        } catch (_) { return; }

        // 如果当前页面有渲染函数，则触发重绘
        // （利用之前的 __syncing 防止死循环）
        Cake.__syncing = true;
        try {
            if (typeof Cake.refreshPage === 'function') {
                Cake.refreshPage();
            }
        } catch (_) {}
        Cake.__syncing = false;
    });
})();
