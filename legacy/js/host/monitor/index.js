// js/host/monitor/index.js
import './error-ui.js';

(function () {
    'use strict';
    if (window.__rootMonitorLoaded) return;
    window.__rootMonitorLoaded = true;

    window.addEventListener('error', (e) => {
        if (e.message && (e.message.includes('LIDNotifyId') || e.message.includes('WeixinJSBridge'))) return;
        window.CakeMonitorUI.showError(e.message || '全局脚本错误');
    }, true);

    window.updateLoadingProgress = (text, percent, detail) => {
        const textEl = document.getElementById('loading-text');
        const barEl = document.getElementById('loading-bar');
        if (textEl && text) textEl.innerText = text;
        if (barEl && percent !== undefined) barEl.style.width = `${percent}%`;
        if (detail) {
            const fileEl = document.getElementById('loading-file');
            if (fileEl && detail.file) fileEl.textContent = '正在读取：' + detail.file;
            const remainEl = document.getElementById('loading-remain');
            if (remainEl && Number.isFinite(detail.remaining)) {
                remainEl.textContent = '剩余文件：' + Math.max(0, detail.remaining) + ' 个';
            }
        }
    };

    // ===== 文件级加载进度（供各层聚合模块上报） =====
    // 让玩家看到"剩余文件数在变动"，避免误以为卡死
    window.__loadInfo = { total: 0, done: 0, file: '', counted: new Set() };
    window.setLoadTotal = (n, key) => {
        if (Number.isFinite(n) && n > 0) {
            // 同一来源（key）只累加一次，避免重载导致总量虚增
            if (typeof key === 'string' && key) {
                if (window.__loadInfo.counted.has(key)) return;
                window.__loadInfo.counted.add(key);
            }
            window.__loadInfo.total += Math.floor(n);
        }
        refreshLoadInfo();
    };
    window.loadTick = (file) => {
        const L = window.__loadInfo;
        if (typeof file === 'string' && file) L.file = file;
        L.done++;
        refreshLoadInfo();
    };
    function refreshLoadInfo() {
        const L = window.__loadInfo;
        const fileEl = document.getElementById('loading-file');
        const remainEl = document.getElementById('loading-remain');
        if (fileEl) fileEl.textContent = '正在读取：' + (L.file || '初始化…');
        if (remainEl) remainEl.textContent = '剩余文件：' + Math.max(0, L.total - L.done) + ' 个';
        const barEl = document.getElementById('loading-bar');
        if (barEl && L.total > 0) {
            const percent = Math.min(96, Math.round((L.done / L.total) * 96));
            barEl.style.width = percent + '%';
        }
    }

    // 兜底放行：即使引擎迟迟未就绪，也平滑收起加载遮罩
    const forceKillLoading = () => {
        console.log('🔧 [Monitor] 就绪超时，放行加载遮罩层');
        gracefulHideLoading();
    };

    // 加载遮罩最短展示时长：避免模块加载过快导致加载画面一闪而过
    const LOADING_MIN_MS = 1200;
    const LOADING_FADE_MS = 400;
    const loadingShownAt = Date.now();

    // 平滑隐藏加载遮罩：先把进度条拉满，再保证至少展示 LOADING_MIN_MS 后淡出
    const gracefulHideLoading = () => {
        const barEl = document.getElementById('loading-bar');
        if (barEl) barEl.style.width = '100%';

        // 完成收尾：文件明细归零，界面显示"已就绪"
        try {
            const info = window.__loadInfo;
            if (info) {
                info.done = Math.max(info.done, info.total);
            }
            const fileEl = document.getElementById('loading-file');
            const remainEl = document.getElementById('loading-remain');
            if (fileEl) fileEl.textContent = '正在读取：引擎已就绪 🎉';
            if (remainEl) remainEl.textContent = '剩余文件：0 个';
        } catch (_) {}

        const remaining = LOADING_MIN_MS - (Date.now() - loadingShownAt);
        const doHide = () => {
            const loadingEl = document.getElementById('app-loading');
            if (!loadingEl || !loadingEl.isConnected) return;
            loadingEl.style.transition = 'opacity 0.4s ease';
            loadingEl.style.setProperty('opacity', '0', 'important');
            setTimeout(() => {
                if (!loadingEl.isConnected) return;
                loadingEl.style.setProperty('display', 'none', 'important');
                if (loadingEl.parentNode) loadingEl.parentNode.removeChild(loadingEl);
            }, LOADING_FADE_MS);
        };
        if (remaining > 0) setTimeout(doHide, remaining);
        else doHide();
    };

    let renderCheckCount = 0;
    const tryRender = () => {
        if (window.Cake && typeof window.Cake.renderAll === 'function') {
            try {
                window.Cake.renderAll();
                forceKillLoading(); // 画完立刻杀遮罩
            } catch (err) {
                console.error('❌ [Monitor] 渲染时报错:', err);
            }
        } else {
            renderCheckCount++;
            if (renderCheckCount < 50) {
                setTimeout(tryRender, 100);
            } else {
                forceKillLoading();
            }
        }
    };

    window.addEventListener('game-ready', () => {
        tryRender();
    });

    const script = document.createElement('script');
    script.type = 'module';
    script.src = new URL('js/main.js', document.baseURI).href;
    // 引擎模块脚本本身加载完成不代表内部模块装载完毕（内部多为顶层 await 串联），
    // 因此这里不能像之前那样过早收起加载画面；真正的收起动作由 game-ready 渲染完成后触发。
    script.onerror = () => { window.CakeMonitorUI.showError('无法加载 js/main.js'); forceKillLoading(); };
    document.body.appendChild(script);
})();
