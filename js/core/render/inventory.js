// js/core/render/inventory.js
window.Cake = window.Cake || {};
(() => {
    const Cake = window.Cake;

    Cake.renderInventory = () => {
        const el = Cake.$('ui-inventory');
        if (!el) return;

        const state = Cake.store?.state;
        if (!state || !state.inventory || state.inventory.length === 0) {
            el.innerHTML = '<div class="muted">背包空空如也</div>';
            return;
        }

        const summary = {};
        state.inventory.forEach(item => {
            if (!summary[item.id]) {
                summary[item.id] = { count: 0, rotten: 0, name: '', emoji: '' };
                const itemData = Cake.INGREDIENTS[item.id];
                summary[item.id].name = itemData ? itemData.name : item.id;
                summary[item.id].emoji = itemData ? itemData.emoji : '❓';
            }
            summary[item.id].count++;
            if (item.isRotten) summary[item.id].rotten++;
        });

        el.innerHTML = Object.values(summary).map(s => {
            const rottenText = s.rotten > 0 ? `<span style="font-size:11px; margin-left:2px;">(烂${s.rotten})</span>` : '';
            const tagClass = s.rotten > 0 ? 'ing-tag lack' : 'ing-tag ok';
            return `<span class="${tagClass}">${s.emoji} ${s.name} ×${s.count} ${rottenText}</span>`;
        }).join('');
    };

    Cake.renderFoods = () => {
        const el = Cake.$('ui-foods');
        if (!el) return;

        const state = Cake.store?.state;
        if (!state || !state.foods || Object.keys(state.foods).length === 0) {
            el.innerHTML = '<div class="muted">货架上还没有成品</div>';
            return;
        }

        let html = '<div class="ing-row" style="justify-content:flex-start;">';
        for (const [recipeKey, data] of Object.entries(state.foods)) {
            const recipe = Cake.RECIPES[recipeKey];
            const name = recipe ? recipe.name : recipeKey;
            const parts = [];
            if (data.perfect > 0) parts.push(`<span style="color:var(--pink-500)">✨完美 ${data.perfect}</span>`);
            if (data.good > 0) parts.push(`<span style="color:var(--green-ok)">👍优良 ${data.good}</span>`);
            if (data.normal > 0) parts.push(`<span>普通 ${data.normal}</span>`);
            if (data.failed > 0) parts.push(`<span style="color:var(--text-muted)">💀失败 ${data.failed}</span>`);

            if (parts.length > 0) {
                html += `<div class="ing-tag" style="padding: 8px 12px; background: #fff;">
                    <strong>${name}</strong>: ${parts.join(' | ')}
                </div>`;
            }
        }
        html += '</div>';
        el.innerHTML = html;
    };
})();
