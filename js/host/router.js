// js/host/router.js
(() => {
    'use strict';

    const mainFrame = document.getElementById('mainFrame');
    if (!mainFrame) return;

    // 🌟 核心 1：路径规范化（最高优先级纠错）
    const normalizePage = (href) => {
        const t = (href || '').trim().replace(/^\.\//, '');
        if (!t) return null;
        if (/^(https?:)?\/\//.test(t) || /^javascript:/i.test(t)) return null;
        
        // 处理各种子页面瞎写的错误路径
        if (t === 'game.html' || t === 'index.html' || t === '/') return 'pages/home.html';
        
        // 如果包含了 pages/entertainment/ 或者只是相对于子页面的 pages/...
        if (t.includes('pages/entertainment/')) {
            return t.substring(t.indexOf('pages/')); // 强行截取正确的部分
        }
        
        if (t.startsWith('pages/')) return t;
        return `pages/${t}`;
    };

    // 🌟 核心 2：父页面主导的跳转函数
    const navigateTo = (href) => {
        const target = normalizePage(href);
        if (!target) return false;
        
        // 如果当前不在目标页，强制通过父容器切换 src
        if (mainFrame.getAttribute('src') !== target) {
            mainFrame.src = target;
        }
        return true;
    };

    // 暴露给子页面调用的全局导航接口
    window.HostRouter = { navigateTo };

    // 🌟 核心 3：彻底拦截 iframe 内部的 A 标签点击
    const bindLinkInterceptor = (doc) => {
        if (!doc || doc.__navBound) return;
        doc.__navBound = true;

        doc.addEventListener('click', (e) => {
            const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link || link.target === '_blank') return;

            const href = link.getAttribute('href');
            if (!href || href === '#' || /^javascript:/i.test(href)) return;

            // 🚨 如果拦截到了内部链接，无论它写得多离谱，都交给父页面处理
            if (navigateTo(href)) {
                e.preventDefault(); // 阻止子页面自己的默认跳转
            }
        });
    };

    bindLinkInterceptor(document);
    mainFrame.addEventListener('load', () => {
        try {
            const doc = mainFrame.contentDocument;
            bindLinkInterceptor(doc);

            // 🚨 终极防呆：如果子页面自己瞎跳导致 404（地址栏没有正确的 .html）
            const url = mainFrame.contentWindow.location.pathname;
            if (!url.endsWith('.html')) {
                // 如果它跳进了一个奇怪的文件夹，强行拉回主页
                navigateTo('pages/home.html');
            }
        } catch (_) { /* 跨域时忽略 */ }
    });
})();
