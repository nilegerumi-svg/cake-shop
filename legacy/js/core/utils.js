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

        // 新日志弹窗提醒：作为"玩家回忆"，重要事件弹出弹窗让玩家不会忽略
        // 只对 success 类型（成就解锁、卖出、订购到货等有意义事件）弹窗，不弹 warn/error/info
        if (type === 'success' && typeof Cake.showModal === 'function') {
            try {
                Cake.showModal('📜 小店日记', `<p style="margin:0;">${escapeHtml(text)}</p>`);
            } catch (_) {}
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

    /* ==================== 保质期系统接线 ==================== */

    // 统一创建库存项：记录总保质期 shelfLife，分级变质才计算得出来
    const createInventoryItem = (itemId, opts = {}) => {
        const state = Cake.store?.state;
        const day = Number.isFinite(Number(opts.day))
            ? Number(opts.day)
            : ((state && state.time && state.time.day) || 1);
        const quality = Number.isFinite(Number(opts.quality)) ? Number(opts.quality) : 50;

        const itemData = (Cake.INGREDIENTS || {})[itemId];
        // 保质期分类优先取合并时打好的 shelfCategory，
        // 旧数据没有该字段时退回首个 tag，最后兜底 default
        const category = (itemData && itemData.shelfCategory)
            || (itemData && itemData.tags && itemData.tags[0])
            || 'default';
        const shelfLife = (typeof Cake.getRandomShelfLife === 'function')
            ? Cake.getRandomShelfLife(category)
            : 7;

        return {
            id: itemId,
            quality: quality,
            shelfLife: shelfLife,               // 总保质期（天），用于分级变质
            expireDay: day + shelfLife,         // 绝对到期日
            isRotten: false
        };
    };

    // 计算某库存项当前的变质状态（fresh / warning / spoiled / rotten）
    const getItemSpoilage = (item) => {
        if (!item) return null;
        if (typeof Cake.getSpoilageState !== 'function') return null;

        const state = Cake.store?.state;
        const day = (state && state.time && state.time.day) || 1;
        const remaining = Number(item.expireDay) - Number(day);

        // 旧存档没有 shelfLife 字段：退化为「过期即腐烂」的二元判断
        const total = Number(item.shelfLife);
        if (!Number.isFinite(total) || total <= 0) {
            return Cake.getSpoilageState(1, remaining > 0 ? 1 : 0);
        }
        return Cake.getSpoilageState(total, remaining);
    };

    /* ==================== 属性系统接线 ==================== */

    // 把配方的 output.attrs 渲染成可读标签（使用 ATTRIBUTES 字典的中文名与 emoji）
    const describeAttrs = (attrs) => {
        if (!attrs || typeof attrs !== 'object') return '';

        const DICT = Cake.ATTRIBUTES || {};
        const parts = [];

        for (const [dim, values] of Object.entries(attrs)) {
            if (!values || typeof values !== 'object') continue;
            const dict = DICT[dim] || {};

            for (const [key, score] of Object.entries(values)) {
                const num = Math.round(Number(score) || 0);
                if (num <= 0) continue;
                const meta = dict[key];
                const label = meta ? `${meta.emoji || ''}${meta.name || key}` : key;
                parts.push(`<span class="attr-tag" title="${dim}">${label} ${num}</span>`);
            }
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
        // 👈 保质期系统
        createInventoryItem,
        getItemSpoilage,
        // 👈 属性系统
        describeAttrs,
    });

    if (typeof window.$ === 'undefined') {
        window.$ = $;
    }
})();
