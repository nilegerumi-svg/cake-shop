// js/host/router.js
(() => {
    const mainFrame = document.getElementById('mainFrame');
    if (!mainFrame) return;

    const normalizePage = (href) => {
        const t = (href || '').trim().replace(/^\.\//, '');
        if (!t) return null;
        if (/^(https?:)?\/\//.test(t) || /^javascript:/i.test(t)) return null;
        if (t === 'game.html' || t === 'index.html') return 'pages/home.html';
        if (t.startsWith('pages/')) return t;
        return `pages/${t}`;
    };

    const navigateTo = (href) => {
        const target = normalizePage(href);
        if (!target) return false;
        if (mainFrame.getAttribute('src') !== target) mainFrame.src = target;
        return true;
    };

    const bindLinkInterceptor = (doc) => {
        if (!doc || doc.__navBound) return;
        doc.__navBound = true;

        doc.addEventListener('click', (e) => {
            const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!link || link.target === '_blank') return;

            const href = link.getAttribute('href');
            if (!href || href === '#' || /^javascript:/i.test(href)) return;
            if (!/^[\w./-]+\.html(#.*)?$/.test(href)) return;

            if (navigateTo(href)) e.preventDefault();
        });
    };

    // 拦截主页面自己的链接
    bindLinkInterceptor(document);

    // 挂载到全局
    window.HostRouter = { navigateTo, bindLinkInterceptor };
})();
