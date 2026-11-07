// pages/bake/index.js
// 厨房/工坊：展示全部 235 个食谱（烘焙/料理），可直接制作
(() => {
    'use strict';
    let Cake = null;
    let tab = 'bakery';
    let q = '';

    const CUISINE = { home: '家常', sichuan: '川菜', cantonese: '粤菜', shandong: '鲁菜', huaiyang: '淮扬', hunan: '湘菜', anhui: '徽菜', fujian: '闽菜', zhejiang: '浙菜' };
    const SIZE = { small: '小份', medium: '中份', large: '大份' };

    function esc(v) { return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
    function toast(msg) {
        const t = document.getElementById('toast');
        if (!t) return; t.textContent = msg; t.style.opacity = '1';
        clearTimeout(t.__timer); t.__timer = setTimeout(() => { t.style.opacity = '0'; }, 2000);
    }
    function ingNames(ing) {
        const parts = [];
        for (const [id, qty] of Object.entries(ing || {})) {
            const item = Cake.INGREDIENTS?.[id];
            parts.push((item?.emoji || '') + (item?.name || id) + '×' + qty);
        }
        return parts.join(' ');
    }
    function hasIng(ing) {
        if (typeof Cake.hasIngredients === 'function') { try { return !!Cake.hasIngredients(ing); } catch (_) {} }
        // 兜底：自己数库存
        const inv = Cake.store.state.inventory || [];
        const need = {};
        for (const [id, qty] of Object.entries(ing || {})) need[id] = (need[id] || 0) + qty;
        for (const [id, qty] of Object.entries(need)) {
            const have = inv.filter(x => x && x.id === id && !x.isRotten).length;
            if (have < qty) return false;
        }
        return true;
    }

    function render() {
        const el = document.getElementById('content');
        if (!el || !Cake) return;
        const state = Cake.store.state;
        const recipes = Cake.RECIPES || {};
        const kw = q.trim().toLowerCase();

        // 分组
        const groups = {};
        for (const [key, r] of Object.entries(recipes)) {
            if (tab === 'bakery' && r.skill !== 'bakery') continue;
            if (tab === 'cook' && r.skill !== 'cook') continue;
            if (kw && !String(r.name || '').toLowerCase().includes(kw)) continue;
            const g = tab === 'bakery' ? (SIZE[r.size] || '其他') : (CUISINE[r.cuisine] || r.cuisine || '其他');
            (groups[g] = groups[g] || []).push([key, r]);
        }

        const bakeryN = Object.values(recipes).filter(r => r.skill === 'bakery').length;
        const cookN = Object.values(recipes).filter(r => r.skill === 'cook').length;

        let html = `<div class="kit-head"><h2>🍳 厨房 · 工坊</h2><p class="muted">⬡ 精力 ${state.energy ?? 0}/${state.maxEnergy ?? 100} · 共 ${Object.keys(recipes).length} 个食谱</p></div>`;
        html += `<div class="sub-tabs" role="tablist">
            <button type="button" class="sub-tab ${tab==='bakery'?'active':''}" data-tab="bakery" role="tab" aria-selected="${tab==='bakery'}">🍰 烘焙（${bakeryN}）</button>
            <button type="button" class="sub-tab ${tab==='cook'?'active':''}" data-tab="cook" role="tab" aria-selected="${tab==='cook'}">🍲 料理（${cookN}）</button>
        </div>`;
        html += `<input type="search" class="search" id="search" placeholder="搜索食谱…" aria-label="搜索食谱" value="${esc(q)}">`;

        const names = Object.keys(groups);
        if (names.length === 0) html += `<div class="muted">没有找到匹配的食谱</div>`;
        for (const g of names) {
            const items = groups[g].sort((a, b) => String(a[1].name).localeCompare(String(b[1].name), 'zh'));
            html += `<div class="cat-title">${esc(g)} <span class="muted">(${items.length})</span></div><div class="grid">`;
            for (const [key, r] of items) {
                const ok = hasIng(r.ing);
                const enoughEnergy = (state.energy ?? 0) >= (r.energy || 0);
                const disabled = !ok || !enoughEnergy;
                html += `<div class="rec-card">
                    <div class="rec-row">
                        <span class="rec-emoji" aria-hidden="true">${r.emoji || '🍽️'}</span>
                        <span class="rec-body">
                            <span class="rec-name">${esc(r.name)}</span>
                            <span class="rec-meta">${SIZE[r.size] || ''} · ⚡${r.energy || 0}${r.skill === 'cook' ? ' · ' + (CUISINE[r.cuisine] || r.cuisine || '') : ''}</span>
                            <span class="rec-ing">${esc(ingNames(r.ing))}</span>
                        </span>
                        <button type="button" class="craft-btn" data-craft="${esc(key)}" ${disabled ? 'disabled' : ''} aria-label="制作${esc(r.name)}">${ok ? '制作' : '缺料'}</button>
                    </div>
                </div>`;
            }
            html += `</div>`;
        }
        el.innerHTML = html;
    }

    function craft(key) {
        if (!Cake || typeof Cake.craft !== 'function') { toast('制作功能不可用'); return; }
        const res = Cake.craft(key, 1);
        if (res && res.success === false) { toast('❌ ' + (res.message || '制作失败')); return; }
        toast('✅ 制作成功：' + (Cake.RECIPES?.[key]?.name || ''));
        if (Cake.refreshPage) Cake.refreshPage();
        render();
    }

    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-tab]');
        if (t) { tab = t.dataset.tab; render(); return; }
        const b = e.target.closest('[data-craft]');
        if (b && !b.disabled) craft(b.dataset.craft);
    });
    document.addEventListener('input', (e) => {
        if (e.target && e.target.id === 'search') {
            q = e.target.value; render();
            const s = document.getElementById('search'); if (s) s.focus();
        }
    });

    if (window.safePageBoot) {
        window.safePageBoot.waitForCake((ready) => {
            Cake = ready;
            render();
            if (typeof Cake.initPage === 'function') Cake.initPage('bake', render, false);
        }, {
            timeout: 15000,
            required: (g) => !!(g && g.store?.state && g.RECIPES && Object.keys(g.RECIPES).length > 0),
            onTimeout: () => '厨房：游戏引擎或食谱数据加载超时，请刷新页面重试。',
            targetId: 'content'
        });
    } else {
        Cake = window.parent?.Cake || window.Cake;
        if (Cake && Cake.store?.state) render();
    }
})();
