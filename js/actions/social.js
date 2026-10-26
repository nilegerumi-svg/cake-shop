// js/actions/social.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    /* ==================== 工具函数 ==================== */

    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // 校验角色存在且已相遇；失败时写日志并刷新，返回 null
    const ensureMet = (cid) => {
        const c = Cake.CHARACTERS[cid];
        const s = Cake.store.state.characters[cid];

        if (!c || !s) {
            Cake.addLog('❌ 未知角色');
            Cake.refreshPage();
            return null;
        }
        if (!s.met) {
            Cake.addLog(`🔒 你还没有遇到${c.name}。`);
            Cake.refreshPage();
            return null;
        }
        return { c, s };
    };

    // 好感增加（上限 100），返回用于日志展示的文案
    const gainAffection = (s, gain) => {
        const before = s.affection;
        s.affection = Math.min(100, s.affection + gain);
        const actual = s.affection - before;
        return actual > 0 ? `好感 +${actual}` : '好感已满';
    };

    /* ==================== 聊天 / 邀约 ==================== */

    const social = (cid, type) => {
        const state = Cake.store.state;

        const ctx = ensureMet(cid);
        if (!ctx) return;
        const { c, s } = ctx;

        if (type === 'chat') {
            if (state.energy < 8) {
                Cake.addLog('😵 精力不足！');
                Cake.refreshPage();
                return;
            }

            state.energy -= 8;

            const gain = 3 + Math.floor(Math.random() * 3);
            const affText = gainAffection(s, gain);
            const dialogue = pickRandom(Cake.CHAT_DIALOGUES[cid]);

            Cake.addLog(`💬 与${c.name}聊天，${affText}。${dialogue}`);
            Cake.checkAffEvent(cid);
            Cake.checkAchievements();
        }

        if (type === 'date') {
            if (s.affection < 40) {
                Cake.addLog(`💭 和${c.name}的关系还不够亲密（需好感40）。`);
                Cake.refreshPage();
                return;
            }
            if (state.energy < 12) {
                Cake.addLog('😵 精力不足！');
                Cake.refreshPage();
                return;
            }
            if (state.money < 50) {
                Cake.addLog('💸 邀约需要50元。');
                Cake.refreshPage();
                return;
            }

            state.energy -= 12;
            state.money -= 50;

            const gain = 7 + Math.floor(Math.random() * 3);
            const affText = gainAffection(s, gain);
            const dialogue = pickRandom(Cake.DATE_DIALOGUES[cid]);

            Cake.addLog(`🌹 与${c.name}约会，${affText}。${dialogue}`);
            Cake.checkAffEvent(cid);
            Cake.checkAchievements();
        }

        Cake.refreshPage();
    };

    /* ==================== 送礼面板开关 ==================== */

    const toggleGiftPanel = (cid) => {
        const state = Cake.store.state;
        state.giftPanelFor = state.giftPanelFor === cid ? null : cid;
        Cake.refreshPage();
    };

    /* ==================== 赠送蛋糕 ==================== */

    const giveGift = (cid, cake) => {
        const state = Cake.store.state;

        const ctx = ensureMet(cid);
        if (!ctx) return;
        const { c, s } = ctx;

        if ((state.cakes[cake] || 0) <= 0) {
            Cake.addLog('❌ 没有这个蛋糕了。');
            Cake.refreshPage();
            return;
        }
        if (state.energy < 8) {
            Cake.addLog('😵 精力不足！');
            Cake.refreshPage();
            return;
        }

        state.cakes[cake]--;
        if (state.cakes[cake] <= 0) delete state.cakes[cake];
        state.energy -= 8;

        const liked = c.likes.includes(cake);
        const gain = liked ? 10 : 4;
        const affText = gainAffection(s, gain);

        Cake.addLog(`🎁 你将${cake}送给了${c.name}，${affText}${liked ? ' 💕（超喜欢！）' : ''}`);
        state.giftPanelFor = null;

        Cake.checkAffEvent(cid);
        Cake.checkAchievements();
        Cake.refreshPage();
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, { social, toggleGiftPanel, giveGift });
})();
