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

    // 👈 新增：屏幕级报错展示器
    const showScreenError = (msg, err) => {
        console.error(msg, err);
        let el = document.getElementById('render-fatal-error');
        if (!el) {
            el = document.createElement('div');
            el.id = 'render-fatal-error';
            el.style.cssText = 'position:fixed;top:0;left:0;right:0;background:rgba(220,38,38,0.95);color:white;padding:15px;z-index:9999999;font-family:monospace;font-size:12px;text-align:left;word-break:break-all;';
            document.body.appendChild(el);
        }
        el.innerHTML = `<h3>🚨 UI 渲染崩溃！</h3><div>${msg}</div><div style="margin-top:5px;opacity:0.8;">${err ? err.stack : ''}</div>`;
    };

    // 核心刷新逻辑
    Cake.renderAll = () => {
        // 👈 强制捕捉任何一个渲染错误，并在屏幕上显示
        try {
            if (typeof Cake.renderHeader !== 'function') throw new Error('找不到 renderHeader 函数');
            Cake.renderHeader();
        } catch (err) { showScreenError('顶部 Header 渲染失败', err); }

        try {
            if (typeof Cake.renderNav !== 'function') throw new Error('找不到 renderNav 函数');
            Cake.renderNav(currentActiveTab);
        } catch (err) { showScreenError('导航栏 Nav 渲染失败', err); }

        try {
            Cake.renderFooter();
            Cake.renderInventory();
            Cake.renderFoods();
        } catch (err) { showScreenError('底部或背包渲染失败', err); }

        if (typeof currentRender === 'function') {
            try { currentRender(); } catch (err) { 
                console.error('[Render] 子页面渲染异常:', err); 
                // 子页面报错我们只在控制台看，不强行阻断主外壳
            }
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

    // 兼容老代码
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
