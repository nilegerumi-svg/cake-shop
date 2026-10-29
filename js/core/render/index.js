// js/core/render/index.js
import './header.js';
import './nav.js';
import './footer.js';
import './inventory.js';

window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;
    let currentRender = null;
    let currentActiveTab = 'home';

    // 核心刷新逻辑
    Cake.renderAll = () => {
        try {
            Cake.renderHeader();
            Cake.renderNav(currentActiveTab);
            Cake.renderFooter();
            Cake.renderInventory();
            Cake.renderFoods();
            // log.js 可以在这里引入渲染，或者单独由子页面渲染
        } catch (err) {
            console.error('[Render] 主页面渲染失败:', err);
        }

        if (typeof currentRender === 'function') {
            try { currentRender(); } catch (err) { console.error('[Render] 子页面渲染异常:', err); }
        }
    };

    // 供全局调用的刷新方法
    Cake.refreshPage = () => {
        if (!Cake.__syncing && typeof Cake.saveState === 'function') Cake.saveState();
        Cake.renderAll();
    };

    // 供子页面 initPage 调用的注册接口
    Cake.initPage = (activeTab, renderFn, showLog = false) => {
        currentActiveTab = activeTab || 'home';
        if (renderFn !== undefined) {
            currentRender = typeof renderFn === 'function' ? renderFn : null;
        }
        const logWrap = Cake.$('logPanelWrap');
        if (logWrap) logWrap.style.display = showLog ? 'block' : 'none';
        Cake.refreshPage();
    };

    // 兼容老代码，如果你还有页面调用 Cake.renderLog，可以保留
    Cake.renderLog = () => {
         const list = Cake.$('logList');
         if (!list) return;
         const state = Cake.store?.state;
         if (!state) return;
         const logs = Array.isArray(state.log) ? state.log : [];
         list.innerHTML = logs.length === 0 ? '<div class="muted">暂无记录</div>' : logs.slice().reverse().map(l =>
             `<div class="log-item"><span class="log-day">第${l.day || 1}天</span> ${Cake.escapeHtml(l.text || '')}</div>`
         ).join('');
    };

    // 监听跨 iframe 的数据同步
    window.addEventListener('storage', (e) => {
        if (!Cake.SAVE_KEY || (e.key && e.key !== Cake.SAVE_KEY)) return;
        try { if (Cake.loadStateFromStorage) Cake.store.state = Cake.loadStateFromStorage(); } catch (_) { return; }
        Cake.__syncing = true;
        try { Cake.renderAll(); } catch (_) {}
        Cake.__syncing = false;
    });

    console.log('🎨 [Render] 模块化渲染引擎装载完毕');
})();
