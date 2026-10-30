// pages/log/player.js
(() => {
    'use strict';

    const PAGE = 200;
    const TOP_THRESHOLD = 24;
    const RETRY_MAX = 100;
    const SEARCH_DEBOUNCE = 120;
    // 折叠时仅展示最近 3 条日记
    const COLLAPSE_SHOW = 3;
    const COLLAPSE_KEY = 'cake_log_collapsed';

    const logList = document.getElementById('logList');
    const listBody = document.getElementById('listBody');
    const countEl = document.getElementById('logCount');
    const searchInput = document.getElementById('logSearch');
    const loadMoreBtn = document.getElementById('loadMore');
    const jumpBtn = document.getElementById('jumpBtn');
    const collapseBtn = document.getElementById('logCollapse');

    const state = {
        logs: [], sig: null, query: '', collapsed: new Set(),
        groups: [], nextIndex: 0, pendingNew: false,
        isCollapsed: false
    };

    const el = (tag, cls) => { const node = document.createElement(tag); if (cls) node.className = cls; return node; };

    function getCake() {
        try { const p = window.parent; if (!p || p === window) return window.Cake || null; return p.Cake || null; } 
        catch (e) { return window.Cake || null; }
    }
    function getStore() { const Cake = getCake(); return Cake && Cake.store ? Cake.store : null; }
    function getLogs() { const store = getStore(); const logs = store && store.state ? store.state.log : null; return Array.isArray(logs) ? logs : []; }

    function signature(logs) {
        if (!logs.length) return '0';
        const last = logs[logs.length - 1];
        if (!last) return logs.length + '|?';
        return logs.length + '|' + (last.day == null ? '' : last.day) + '|' + (last.text == null ? '' : last.text);
    }

    function compareDay(a, b) {
        const na = Number(a), nb = Number(b);
        const va = !isNaN(na), vb = !isNaN(nb);
        if (va && vb) return nb - na;
        if (va) return -1; if (vb) return 1;
        return String(b).localeCompare(String(a), 'zh-Hans-CN');
    }

    function appendHighlighted(parent, text, query) {
        const q = query.trim();
        if (!q) { parent.appendChild(document.createTextNode(text)); return; }
        const lowerText = text.toLowerCase(), lowerQ = q.toLowerCase(), len = lowerQ.length;
        let from = 0, idx;
        while ((idx = lowerText.indexOf(lowerQ, from)) !== -1) {
            if (idx > from) parent.appendChild(document.createTextNode(text.slice(from, idx)));
            const mark = document.createElement('mark');
            mark.textContent = text.slice(idx, idx + len);
            parent.appendChild(mark);
            from = idx + len;
        }
        if (from < text.length) parent.appendChild(document.createTextNode(text.slice(from)));
    }

    function buildGroups(logs, query) {
        const q = query.trim().toLowerCase(), map = new Map();
        for (let i = 0; i < logs.length; i++) {
            const item = logs[i]; if (!item) continue;
            const text = item.text == null ? '' : String(item.text), day = item.day;
            if (q) {
                const hitText = text.toLowerCase().indexOf(q) !== -1;
                const hitDay = String(day == null ? '' : day).toLowerCase().indexOf(q) !== -1;
                if (!hitText && !hitDay) continue;
            }
            const key = String(day == null ? '' : day);
            if (!map.has(key)) map.set(key, []);
            map.get(key).push({ day: day, text: text, index: i });
        }
        const keys = Array.from(map.keys());
        keys.sort(compareDay);
        return keys.map((key) => {
            const items = map.get(key);
            items.sort((a, b) => b.index - a.index);
            return { day: items[0].day, key: key, items: items };
        });
    }

    function renderGroup(group) {
        const wrap = el('div', 'day-group');
        const head = el('div', 'day-head');
        const title = el('span');
        title.textContent = '第' + (group.day == null ? '?' : group.day) + '天';
        const cnt = el('span', 'day-count');
        cnt.textContent = group.items.length + ' 条';
        const arrow = el('span', 'day-arrow');
        head.append(title, cnt, arrow);

        const body = el('div', 'day-body');
        for (let i = 0; i < group.items.length; i++) {
            const row = el('div', 'log-entry');
            appendHighlighted(row, group.items[i].text, state.query);
            body.appendChild(row);
        }

        const isCollapsed = !state.query.trim() && state.collapsed.has(group.key);
        body.hidden = isCollapsed;
        arrow.textContent = isCollapsed ? '▸' : '▾';

        head.addEventListener('click', () => {
            const willCollapse = !body.hidden;
            body.hidden = willCollapse;
            arrow.textContent = willCollapse ? '▸' : '▾';
            if (state.query.trim()) return;
            if (willCollapse) state.collapsed.add(group.key); else state.collapsed.delete(group.key);
        });
        wrap.append(head, body);
        return wrap;
    }

    function renderGroups(fromIndex, limit) {
        const frag = document.createDocumentFragment();
        let count = 0, i = fromIndex;
        while (i < state.groups.length && count < limit) {
            frag.appendChild(renderGroup(state.groups[i]));
            count += state.groups[i].items.length; i++;
        }
        return { frag: frag, nextIndex: i };
    }

    function updateCount() {
        const total = state.logs.length;
        if (state.query.trim()) {
            let matched = 0;
            for (let i = 0; i < state.groups.length; i++) matched += state.groups[i].items.length;
            countEl.textContent = '匹配 ' + matched + ' / 共 ' + total + ' 条';
        } else {
            countEl.textContent = '共 ' + total + ' 条';
        }
    }

    function updateLoadMore() { loadMoreBtn.hidden = state.nextIndex >= state.groups.length; }
    function showEmpty(msg) { const box = el('div', 'empty'); box.textContent = msg; listBody.replaceChildren(box); loadMoreBtn.hidden = true; }

    /* ==================== 折叠 / 展开 ==================== */
    function applyCollapsedUI() {
        if (!collapseBtn) return;
        // 折叠只控制容器高度（CSS max-height），完整列表仍在 DOM 中，
        // 因此"折叠界面长度随信息量大小改变"天然成立；展开即恢复完整列表。
        logList.classList.toggle('collapsed', state.isCollapsed);
        collapseBtn.textContent = state.isCollapsed ? '展开 ▴' : '收起 ▾';
        collapseBtn.setAttribute('aria-expanded', String(!state.isCollapsed));
        loadMoreBtn.hidden = state.isCollapsed || state.nextIndex >= state.groups.length;

        // 同步外层·日记面板高度：折叠时收缩，避免收起后下方留白
        try {
            const parentDoc = window.parent && window.parent.document;
            if (parentDoc && parentDoc !== document) {
                const pane = parentDoc.querySelector('.log-pane');
                if (pane) {
                    pane.classList.toggle('collapsed', state.isCollapsed);
                    pane.style.flexBasis = state.isCollapsed ? 'clamp(96px, 16vh, 150px)' : '';
                }
            }
        } catch (_) { /* 跨域忽略 */ }
    }

    function rebuild(opts) {
        const toTop = !!(opts && opts.toTop);
        state.groups = buildGroups(state.logs, state.query);
        state.nextIndex = 0;
        if (state.groups.length === 0) {
            showEmpty(state.query.trim() ? '没有匹配的日记～' : '暂无记录，快去创造故事吧～');
            updateCount(); if (toTop) logList.scrollTop = 0; return;
        }
        const result = renderGroups(0, PAGE);
        state.nextIndex = result.nextIndex;
        listBody.replaceChildren(result.frag);
        updateLoadMore(); updateCount(); applyCollapsedUI();
        if (toTop) logList.scrollTop = 0;
    }

    function appendMore() {
        if (state.nextIndex >= state.groups.length) return;
        const result = renderGroups(state.nextIndex, PAGE);
        listBody.appendChild(result.frag);
        state.nextIndex = result.nextIndex;
        updateLoadMore();
    }

    function isNearTop() { return logList.scrollTop <= TOP_THRESHOLD; }
    function hideJump() { state.pendingNew = false; jumpBtn.classList.remove('show'); }

    function refresh(force) {
        const logs = getLogs(), sig = signature(logs);
        if (!force && sig === state.sig) return;
        const firstLoad = state.sig === null;
        state.logs = logs; state.sig = sig;
        if (force || firstLoad || isNearTop()) { hideJump(); rebuild({ toTop: true }); } 
        else { state.pendingNew = true; jumpBtn.classList.add('show'); }
    }

    logList.addEventListener('scroll', () => {
        if (state.pendingNew && isNearTop()) { hideJump(); rebuild({ toTop: true }); }
    }, { passive: true });

    jumpBtn.addEventListener('click', () => refresh(true));
    loadMoreBtn.addEventListener('click', appendMore);

    // 折叠 / 展开切换
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            state.isCollapsed = !state.isCollapsed;
            try { localStorage.setItem(COLLAPSE_KEY, state.isCollapsed ? '1' : '0'); } catch (_) {}
            applyCollapsedUI();
        });
        try { state.isCollapsed = localStorage.getItem(COLLAPSE_KEY) === '1'; } catch (_) {}
    }

    let searchTimer = null;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            state.logs = getLogs(); state.sig = signature(state.logs);
            state.query = searchInput.value; hideJump(); rebuild({ toTop: true });
        }, SEARCH_DEBOUNCE);
    });

    window.addEventListener('storage', (e) => {
        if (e.storageArea && e.storageArea !== window.localStorage) return;
        refresh(false);
    });
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(false); });
    window.__cakeShopRefresh = function () { refresh(true); };

    (function boot() {
        let attempts = 0;
        (function tryConnect() {
            const store = getStore();
            if (store && store.state) { refresh(true); return; }
            if (++attempts > RETRY_MAX) { showEmpty('无法连接到商店数据'); return; }
            setTimeout(tryConnect, 100);
        })();
        // 同步一次折叠状态（外层日记面板收缩），保证刷新后仍生效
        applyCollapsedUI();
    })();
})();
