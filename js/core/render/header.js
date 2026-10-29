// js/core/render/header.js
window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;
    const num = (v, fallback = 0) => Number.isFinite(Number(v)) ? Number(v) : fallback;

    Cake.renderHeader = () => {
        const el = Cake.$('header');
        // 如果是 iframe 或者没有元素，直接返回
        if (!el || window.self !== window.top) return;

        const state = Cake.store?.state;
        if (!state) return;

        const energy = Math.max(0, Math.min(100, num(state.energy, 80)));
        const pct = Math.round(energy);
        const esc = Cake.escapeHtml;
        const timeStr = Cake.getTimeString ? Cake.getTimeString() : '08:00';

        el.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <div class="header-left" style="display: flex; align-items: center; gap: 6px; font-weight: bold; font-size: 15px; color: var(--pink-600);">
                    <span class="shop-emoji" style="font-size: 20px;">👩‍🍳</span>
                    <span>${esc(state.shop?.name ?? '甜蜜小屋')}</span>
                </div>
                <div class="header-stats" style="display: flex; gap: 8px; font-size: 13px; color: var(--text-mid); font-weight: bold;">
                    <span>📅 ${num(state.time?.day, 1)}天 ${timeStr}</span>
                    <span>💰 ${num(state.money, 100)}</span>
                    <span>🧹 ${num(state.shop?.stats?.cleanliness, 100)}%</span>
                </div>
            </div>
            <div class="energy-wrap" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
                <span>⚡</span>
                <div class="energy-bar" style="flex: 1; height: 6px; background: var(--pink-100); border-radius: 4px; overflow: hidden;">
                    <div class="energy-bar-fill" style="height: 100%; width: ${pct}%; background: var(--pink-400);"></div>
                </div>
                <span style="color: var(--text-muted); width: 45px; text-align: right;">${pct}/${state.maxEnergy || 100}</span>
            </div>`;
    };
})();
