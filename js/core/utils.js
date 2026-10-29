// js/core/utils.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};
    const Cake = window.Cake;

    /* ==================== 核心工具函数 ==================== */

    const $ = (id) => document.getElementById(id);

    const randomPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const escapeHtml = (str) =>
        String(str ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');

    // 👈 修复：适配新的 state.time.day 和 state.log
    // js/core/utils.js (节选，替换原有的 addLog)
    const addLog = (text, type = 'info') => {
        const s = Cake.store?.state;
        if (!s) return;

        s.log = s.log || [];
        s.log.push({ day: s.time?.day ?? 1, time: Cake.getTimeString ? Cake.getTimeString() : '', text, type });
        if (s.log.length > 60) s.log.shift();

        // 存档
        if (typeof Cake.saveState === 'function') Cake.saveState();
        
        // 👈 广播刷新：如果是父页面，直接刷新 UI；如果是子页面，发消息给父页面刷新
        if (typeof Cake.emit === 'function') {
            Cake.emit('refresh_ui');
        }
    };

    // 👈 修复：调用统一报错
    const fail = (message) => {
        addLog(message, 'error');
        return { success: false, message };
    };

    const affLevel = (a) => {
        if (a >= 100) return '💖 挚爱';
        if (a >= 80)  return '💗 心动';
        if (a >= 60)  return '💞 亲密';
        if (a >= 40)  return '🤝 朋友';
        if (a >= 20)  return '👋 相识';
        return '🤍 陌生';
    };

    /* ==================== 食材相关（基于 inventory 数组） ==================== */

    // 👈 修复：检查背包数组里是否有足够的、未腐烂的食材
    const hasIngredients = (ing) => {
        const s = Cake.store?.state;
        if (!s || !s.inventory) return false;

        for (const k of Object.keys(ing)) {
            // 统计该食材且没烂的数量
            const count = s.inventory.filter(i => i.id === k && !i.isRotten).length;
            if (count < ing[k]) return false;
        }
        return true;
    };

    // 👈 修复：从背包数组中扣除食材（优先扣除快过期的）
    const consumeIngredients = (ing) => {
        const s = Cake.store?.state;
        if (!s || !s.inventory) return;

        for (const k of Object.keys(ing)) {
            let need = ing[k];
            // 找到该食材，按过期时间升序（快过期的先消耗）
            const available = s.inventory
                .map((item, index) => ({ ...item, _index: index }))
                .filter(i => i.id === k && !i.isRotten)
                .sort((a, b) => a.expireDay - b.expireDay);

            for (let i = 0; i < available.length && need > 0; i++) {
                s.inventory.splice(available[i]._index, 1); // 从背包删掉这个实例
                need--;
            }
        }
    };

    // 👈 修复：渲染配方所需的食材标签（基于 inventory）
    const ingredientTags = (ing) => {
        const s = Cake.store?.state;
        if (!s) return '';

        const ING = Cake.INGREDIENTS || {};
        const parts = [];

        for (const k of Object.keys(ing)) {
            if (!ING[k]) continue;

            const v = ing[k];
            const have = s.inventory ? s.inventory.filter(i => i.id === k && !i.isRotten).length : 0;
            const cls = have >= v ? 'ok' : 'lack';
            parts.push(
                `<span class="${cls}">${ING[k].emoji}${ING[k].name} ${have}/${v}</span>`
            );
        }
        return parts.join('');
    };

    /* ==================== 补充缺失的渲染工具 ==================== */
    
    // 👈 补充：时间格式化（render.js 需要）
    const getTimeString = () => {
        const state = Cake.store?.state;
        if (!state || !state.time) return '08:00';
        const h = String(state.time.hour).padStart(2, '0');
        const m = String(state.time.minute).padStart(2, '0');
        return `${h}:${m}`;
    };

    /* ==================== 挂载到 window.Cake 下 ==================== */

    Object.assign(Cake, {
        $,
        randomPick,
        escapeHtml,
        addLog,
        fail,
        affLevel,
        hasIngredients,
        consumeIngredients,
        ingredientTags,
        getTimeString, // 👈 挂载
    });

    if (typeof window.$ === 'undefined') {
        window.$ = $;
    }
})();
