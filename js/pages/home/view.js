// js/pages/home/view.js
// 新版 UI：小楼（一楼/二楼/三楼/天台/地下室，逐层房间卡片）
export const renderHome = () => {
    const G = window.parent.Game || window.Game;
    const contentEl = document.getElementById('content');

    if (!contentEl) return;
    if (!G || !G.state) {
        contentEl.innerHTML = '<h2 style="color:#c62828;text-align:center;margin-top:50px;">❌ 致命错误：找不到游戏数据</h2>';
        return;
    }

    const escape = (typeof G.escapeHtml === 'function')
        ? G.escapeHtml
        : (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const num = (v, fallback = 0) => { const n = Number(v); return Number.isFinite(n) ? n : fallback; };

    try {
        const s = G.state;
        const day = num(s.time?.day, 1);
        const money = num(s.money, 0);
        const energy = num(s.energy, 100);
        const maxEnergy = num(s.maxEnergy, 100);
        const shopName = s.shop?.name || '甜蜜小屋';

        // 小楼楼层与房间
        const floors = [
            { name: '一楼', emoji: '🏠', rooms: [
                { icon: '🏪', name: '店面', desc: '开店营业 · 装修 · 员工 · 货架', nav: '../shop/index.html' },
                { icon: '🍰', name: '厨房', desc: '吃饭 · 备料烘焙 · 研发配方', nav: '../bake/index.html' },
                { icon: '🥘', name: '工坊', desc: '制作料理 · 熬酱榨汁', nav: '../recipe/index.html' },
            ]},
            { name: '二楼', emoji: '🛏️', rooms: [
                { icon: '😴', name: '卧室', desc: '小憩 · 睡觉恢复精力', action: 'sleep' },
                { icon: '🌻', name: '阳台', desc: '种菜种花（待开放）', soon: true },
            ]},
            { name: '三楼', emoji: '📚', rooms: [
                { icon: '📖', name: '书房', desc: '读书 · 食谱图鉴（待开放）', soon: true },
                { icon: '🗃️', name: '收藏架', desc: '收藏 · 星图（待开放）', soon: true },
            ]},
            { name: '天台', emoji: '🌌', rooms: [
                { icon: '🔭', name: '观星台', desc: '看天气 · 观星（待开放）', soon: true },
            ]},
            { name: '地下室', emoji: '📦', rooms: [
                { icon: '🧺', name: '仓库', desc: '食材库 · 存储整理', nav: '../larder/index.html' },
            ]},
        ];

        let html = `
            <div class="home-head">
                <h2>🏠 ${escape(shopName)}</h2>
                <p class="muted">第 ${day} 天 · 💰 ${money} · ⚡ ${energy}/${maxEnergy}</p>
            </div>`;

        for (const floor of floors) {
            html += `<section class="floor" aria-label="${floor.name}">
                <h3 class="floor-title"><span aria-hidden="true">${floor.emoji}</span> ${floor.name}</h3>
                <div class="room-grid">`;
            for (const r of floor.rooms) {
                const attr = r.nav ? `data-nav="${r.nav}"` : (r.action ? `data-action="${r.action}"` : '');
                const soon = r.soon ? '<span class="soon">待开放</span>' : '';
                html += `
                    <button type="button" class="room-card" ${attr}>
                        <span class="room-icon" aria-hidden="true">${r.icon}</span>
                        <span class="room-body">
                            <span class="room-name">${r.name} ${soon}</span>
                            <span class="room-desc">${r.desc}</span>
                        </span>
                        <span class="room-arrow" aria-hidden="true">›</span>
                    </button>`;
            }
            html += `</div></section>`;
        }

        contentEl.innerHTML = html;
    } catch (err) {
        contentEl.innerHTML = `<div class="render-error">❌ 渲染发生异常：${escape(err.message)}</div>`;
    }
};
