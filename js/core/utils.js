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

    const addLog = (text, day) => {
        // 防护：极早期没拿到 state 时直接返回，避免报错
        const s = Cake.store?.state;
        if (!s) return;

        s.log = s.log || [];
        s.log.push({ day: day ?? s.day, text });
        if (s.log.length > 60) s.log.shift();
    };

    const fail = (message) => {
        addLog(message);
        if (typeof Cake.refreshPage === 'function') {
            Cake.refreshPage();
        }
        return false;
    };

    const affLevel = (a) => {
        if (a >= 100) return '💖 挚爱';
        if (a >= 80)  return '💗 心动';
        if (a >= 60)  return '💞 亲密';
        if (a >= 40)  return '🤝 朋友';
        if (a >= 20)  return '👋 相识';
        return '😶 陌生';
    };

    /* ==================== 食材相关 ==================== */

    const hasIngredients = (ing) => {
        const s = Cake.store?.state;
        if (!s) return false;

        for (const k of Object.keys(ing)) {
            if ((s.ingredients[k] || 0) < ing[k]) return false;
        }
        return true;
    };

    const consumeIngredients = (ing) => {
        const s = Cake.store?.state;
        if (!s) return;

        for (const k of Object.keys(ing)) {
            s.ingredients[k] = (s.ingredients[k] || 0) - ing[k];
        }
    };

    const ingredientTags = (ing) => {
        const s = Cake.store?.state;
        if (!s) return '';

        const ING = Cake.INGREDIENTS || {};
        const parts = [];

        for (const k of Object.keys(ing)) {
            if (!ING[k]) continue; // 防止未知食材报错

            const v = ing[k];
            const have = s.ingredients[k] || 0;
            const cls = have >= v ? 'ok' : 'lack';
            parts.push(
                `<span class="${cls}">${ING[k].emoji}${ING[k].name} ${have}/${v}</span>`
            );
        }
        return parts.join('');
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
    });

    // 兼容全局 $ 调用
    if (typeof window.$ === 'undefined') {
        window.$ = $;
    }
})();
