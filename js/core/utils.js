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

    const addLog = (text, type = 'info') => {
        const s = Cake.store?.state;
        if (!s) return;

        s.log = s.log || [];
        s.log.push({ day: s.time?.day ?? 1, time: Cake.getTimeString ? Cake.getTimeString() : '', text, type });
        if (s.log.length > 60) s.log.shift();

        // 存档
        if (typeof Cake.saveState === 'function') Cake.saveState();
        
        // 广播刷新
        if (typeof Cake.emit === 'function') {
            Cake.emit('refresh_ui');
        }
    };

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

    /* ==================== 食材品质生成引擎 ==================== */
    
    // 👈 新增：随机生成食材品质 (0-100)
    const getRandomIngredientQuality = () => {
        const r = Math.random();
        if (r < 0.10) return Math.floor(Math.random() * 40);      // 10% 概率：低劣 (0-39)
        if (r < 0.70) return Math.floor(40 + Math.random() * 30); // 60% 概率：普通 (40-69)
        if (r < 0.95) return Math.floor(70 + Math.random() * 20); // 25% 概率：优良 (70-89)
        return Math.floor(90 + Math.random() * 11);               // 5%  概率：完美 (90-100)
    };

    /* ==================== 食材相关（基于 inventory 数组） ==================== */

    const hasIngredients = (ing) => {
        const s = Cake.store?.state;
        if (!s || !s.inventory) return false;

        for (const k of Object.keys(ing)) {
            const count = s.inventory.filter(i => i.id === k && !i.isRotten).length;
            if (count < ing[k]) return false;
        }
        return true;
    };

    const consumeIngredients = (ing) => {
        const s = Cake.store?.state;
        if (!s || !s.inventory) return;

        for (const k of Object.keys(ing)) {
            let need = ing[k];
            const available = s.inventory
                .map((item, index) => ({ ...item, _index: index }))
                .filter(i => i.id === k && !i.isRotten)
                .sort((a, b) => a.expireDay - b.expireDay);

            for (let i = 0; i < available.length && need > 0; i++) {
                s.inventory.splice(available[i]._index, 1);
                need--;
            }
        }
    };

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
        getRandomIngredientQuality, // 👈 挂载随机品质引擎
        hasIngredients,
        consumeIngredients,
        ingredientTags,
        getTimeString,
    });

    if (typeof window.$ === 'undefined') {
        window.$ = $;
    }
})();
