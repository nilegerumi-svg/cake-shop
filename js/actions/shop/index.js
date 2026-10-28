// js/actions/shop/index.js
(() => {
    'use strict';

    window.Cake = window.Cake || {};

    const Cake = window.Cake;

    /* ==================== 常量 ==================== */

    const DECORATE_COST = 100;
    const UPGRADE_ENERGY = 5;
    const DECORATE_ENERGY = 5;

    /* ==================== 店铺升级 ==================== */

    const upgradeShop = () => {
        const state = Cake.store.state;
        const costs = Cake.SHOP_UPGRADE_COSTS;

        // costs = { 1: 800, 2: 2000, 3: 5000, 4: 10000 }
        // 最高可升级到的等级 = max key + 1 = 5
        const MAX_SOURCE_LEVEL = Math.max(...Object.keys(costs).map(Number));

        if (state.shopLevel > MAX_SOURCE_LEVEL) {
            return Cake.fail('🏪 店铺已是最高等级！');
        }

        const cost = costs[state.shopLevel];

        if (!cost) {
            return Cake.fail(`❌ 升级费用数据异常（等级 ${state.shopLevel}）`);
        }
        if (state.money < cost) {
            return Cake.fail(`💸 升级需要 ${cost} 元！`);
        }
        if (state.energy < UPGRADE_ENERGY) {
            return Cake.fail('⚡ 精力不足！');
        }

        state.money -= cost;
        state.energy -= UPGRADE_ENERGY;
        state.shopLevel++;

        Cake.addLog(`🏪 店铺升级至 Lv.${state.shopLevel}！客流量提升～`);
        if (typeof Cake.checkAchievements === 'function') Cake.checkAchievements();
        Cake.refreshPage();
    };

    /* ==================== 店铺装饰 ==================== */

    const decorateShop = () => {
        const state = Cake.store.state;

        if (state.money < DECORATE_COST) {
            return Cake.fail(`💸 装饰需要 ${DECORATE_COST} 元！`);
        }
        if (state.energy < DECORATE_ENERGY) {
            return Cake.fail('⚡ 精力不足！');
        }

        state.money -= DECORATE_COST;
        state.energy -= DECORATE_ENERGY;
        state.decoration++;

        Cake.addLog(`🎀 装饰度 +1（当前${state.decoration}），小店更温馨了！`);
        if (typeof Cake.checkAchievements === 'function') Cake.checkAchievements();
        Cake.refreshPage();
    };

    /* ==================== 定价调整 ==================== */

    const setPriceRate = (rate) => {
        const state = Cake.store.state;

        const r = Number(rate);
        if (!Number.isFinite(r) || r <= 0) {
            return Cake.fail('⚠️ 定价系数不合法！');
        }

        // 限制在合理区间，防止 0 / 负数导致卖蛋糕倒扣钱
        state.priceRate = Math.min(1.5, Math.max(0.8, r));

        Cake.addLog(`💰 定价调整为 ${state.priceRate.toFixed(1)}x`);
        Cake.refreshPage();
    };

    /* ==================== 开店营业 ==================== */

    const openShop = () => {
        const state = Cake.store.state;
        const RECIPES = Cake.RECIPES;
        const esc = Cake.escapeHtml;

        const cakeNames = Object.keys(state.cakes).filter(
            (n) => (state.cakes[n] || 0) > 0 && RECIPES[n]
        );

        const lines = [];
        const pushLine = (html) => lines.push(html);

        let earned = 0;
        let sold = 0;
        let lost = 0;

        if (cakeNames.length === 0) {
            state.reputation = Math.max(0, state.reputation - 3);
            const msg = '😢 今天没有蛋糕可以卖，顾客们都失望地离开了……（声望 -3）';
            pushLine(msg);
            Cake.addLog(msg);
        } else {
            let count = Math.floor(
                2 + Math.random() * 3 + state.shopLevel +
                Math.floor(state.reputation / 25)
            );
            if (state.priceRate > 1.1) count = Math.floor(count * 0.8);
            if (state.priceRate < 0.9) count = Math.floor(count * 1.2);
            count = Math.min(Math.max(count, 1), 14);

            for (let i = 0; i < count; i++) {
                const budget =
                    50 + state.shopLevel * 40 +
                    Math.random() * state.reputation * 2 +
                    Math.random() * 150;

                const available = cakeNames.filter(
                    (cn) =>
                        (state.cakes[cn] || 0) > 0 &&
                        RECIPES[cn].price * state.priceRate <= budget
                );

                if (available.length === 0) {
                    lost++;
                    continue;
                }

                const pick = Cake.randomPick(available);
                const price = Math.round(RECIPES[pick].price * state.priceRate);

                state.cakes[pick]--;
                state.money += price;
                state.reputation += 1;

                earned += price;
                sold++;
                pushLine(`🧂 卖出 ${RECIPES[pick].emoji}${esc(pick)}，收入 ${price} 元`);
            }

            state.totalCakes += sold;
            state.totalEarned += earned;

            if (sold > 0) {
                Cake.addLog(
                    `🛋️ 今天卖出了 ${sold} 个蛋糕，赚了 ${earned} 元！` +
                    (lost > 0 ? `（有 ${lost} 位顾客没买到想要的）` : '')
                );
            } else {
                Cake.addLog('💔 今天顾客预算太低了，什么都没卖出去！');
            }
        }

        const summary = sold > 0
            ? `<p>卖出 <b>${sold}</b> 个蛋糕，收入 <b>${earned}</b> 元` +
              (lost > 0 ? `，有 ${lost} 位顾客没买到想要的` : '') + `</p>`
            : '<p>今天没有卖出任何蛋糕。</p>';

        Cake.showModal(
            '🧾 今日营业报告',
            `<div class="shop-report">${summary}<hr>${lines.map((l) => `<p>${l}</p>`).join('')}</div>`
        );

        if (typeof Cake.checkAchievements === 'function') {
            try { Cake.checkAchievements(); } catch (_) { /* ignore */ }
        }
        Cake.refreshPage();
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, { upgradeShop, decorateShop, setPriceRate, openShop });
})();
