window.Cake = window.Cake || {};
(function () {
    function upgradeShop() {
        var state = window.Cake.store.state;
        if (state.shopLevel >= 5) { window.Cake.addLog('🌟 店铺已是最高等级！'); window.Cake.refreshPage(); return; }
        var cost = window.Cake.SHOP_UPGRADE_COSTS[state.shopLevel];
        if (!cost || state.money < cost) { window.Cake.addLog('💸 升级需要' + (cost || '未知费用') + '元！'); window.Cake.refreshPage(); return; }
        if (state.energy < 5) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
        state.money -= cost;
        state.energy -= 5;
        state.shopLevel++;
        window.Cake.addLog('🏪 店铺升级至 Lv.' + state.shopLevel + '！客流量提升～');
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function decorateShop() {
        var state = window.Cake.store.state;
        if (state.money < 100) { window.Cake.addLog('💸 装饰需要100元！'); window.Cake.refreshPage(); return; }
        if (state.energy < 5) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
        state.money -= 100;
        state.energy -= 5;
        state.decoration++;
        window.Cake.addLog('🌸 装饰度 +1（当前' + state.decoration + '），小店更温馨了！');
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function setPriceRate(rate) {
        var state = window.Cake.store.state;
        state.priceRate = rate;
        window.Cake.addLog('💰 定价调整为 ' + rate.toFixed(1) + 'x');
        window.Cake.refreshPage();
    }

    function openShop() {
        var state = window.Cake.store.state;
        var RECIPES = window.Cake.RECIPES;
        var CHARACTERS = window.Cake.CHARACTERS;

        var cakeNames = [];
        for (var n in state.cakes) {
            if (!Object.prototype.hasOwnProperty.call(state.cakes, n)) continue;
            if ((state.cakes[n] || 0) > 0 && RECIPES[n]) cakeNames.push(n);
        }

        if (cakeNames.length === 0 && !confirm('没有库存蛋糕，开店会损失 3 点声望，确定继续吗？')) return;

        var lines = [];
        function pushLine(html, text) {
            lines.push({ html: html, text: text == null ? html : text, day: state.day });
        }
        var earned = 0, sold = 0, lost = 0;

        if (cakeNames.length === 0) {
            state.reputation = Math.max(0, state.reputation - 3);
            pushLine('😢 今天没有蛋糕可以卖，顾客们都失望地离开了……（声望 -3）');
        } else {
            var count = Math.floor(2 + Math.random() * 3 + state.shopLevel + Math.floor(state.reputation / 25));
            if (state.priceRate > 1.1) count = Math.floor(count * 0.8);
            if (state.priceRate < 0.9) count = Math.floor(count * 1.2);
            count = Math.min(Math.max(count, 1), 14);

            for (var i = 0; i < count; i++) {
                var budget = 50 + state.shopLevel * 40 + Math.random() * state.reputation * 2 + Math.random() * 150;
                var available = [];
                for (var j = 0; j < cakeNames.length; j++) {
                    var cn = cakeNames[j];
                    if ((state.cakes[cn] || 0) > 0 && RECIPES[cn].price * state.priceRate <= budget) available.push(cn);
                }
                if (available.length === 0) { lost++; continue; }
                var pick = available[Math.floor(Math.random() * available.length)];
                var price = Math.round(RECIPES[pick].price * state.priceRate);
                state.cakes[pick]--;
                if (state.cakes[pick] <= 0) delete state.cakes[pick];
                state.money += price;
                earned += price;
                sold++;
                state.totalCakes++;
                state.reputation += RECIPES[pick].rep + Math.floor(state.decoration / 10);
            }
            state.totalEarned += earned;
            pushLine('👥 今天来了 ' + count + ' 位顾客');
            pushLine('🧁 卖出了 ' + sold + ' 个蛋糕，收入 <b>' + earned + '</b> 元', '🧁 卖出了 ' + sold + ' 个蛋糕，收入 ' + earned + ' 元');
            if (lost > 0) pushLine('😔 ' + lost + ' 位顾客没有找到合适的蛋糕离开了');
        }

        if (Math.random() < 0.35) {
            var RANDOM_EVENTS = window.Cake.RANDOM_EVENTS;
            var evPool = [];
            for (var ei = 0; ei < RANDOM_EVENTS.length; ei++) {
                var ev = RANDOM_EVENTS[ei];
                var blocked = false;
                for (var cid in CHARACTERS) {
                    if (!Object.prototype.hasOwnProperty.call(CHARACTERS, cid)) continue;
                    if (ev[cid] && (!state.characters[cid] || !state.characters[cid].met)) { blocked = true; break; }
                }
                if (!blocked) evPool.push(ev);
            }
            var pool = evPool.length ? evPool : RANDOM_EVENTS;
            var chosen = pool[Math.floor(Math.random() * pool.length)];

            // ✨ 本次改动：记录随机事件前的好感，事件生效后对变化角色静默触发好感事件，
            // 把好感事件文本合并进「今日营业」弹窗，避免被后续 showModal 覆盖。
            var beforeAff = {};
            for (var c0 in state.characters) {
                if (!Object.prototype.hasOwnProperty.call(state.characters, c0)) continue;
                if (state.characters[c0].met) beforeAff[c0] = state.characters[c0].affection;
            }

            window.Cake.applyEventEffects(chosen);
            pushLine('✨ 事件：' + chosen.text);

            for (var c1 in state.characters) {
                if (!Object.prototype.hasOwnProperty.call(state.characters, c1)) continue;
                var cs1 = state.characters[c1];
                if (cs1.met && cs1.affection !== beforeAff[c1]) {
                    var evs = window.Cake.checkAffEvent(c1, true);
                    for (var e2 = 0; e2 < evs.length; e2++) {
                        pushLine('💫 与' + CHARACTERS[c1].name + '的好感事件：' + evs[e2].text);
                    }
                }
            }
        }

        window.Cake.checkAchievements();

        var beforeEnergy = state.energy;
        state.energy = Math.min(100, state.energy + 50);
        var energyGain = state.energy - beforeEnergy;
        var energyText = energyGain > 0 ? '精力 +' + energyGain : '精力已满';
        state.day++;
        pushLine('🌙 夜晚休息，' + energyText + '（当前 ' + state.energy + '）');
        pushLine('📅 新的一天开始啦！今天是第 <b>' + state.day + '</b> 天', '📅 新的一天开始啦！今天是第 ' + state.day + ' 天');

        if (state.money < 80) {
            state.money += 100;
            pushLine('💌 家人寄来了 100 元生活费，要加油哦！');
        }

        var MEETINGS = window.Cake.MEETINGS;
        var pending = [];
        for (var d in MEETINGS) {
            if (!Object.prototype.hasOwnProperty.call(MEETINGS, d)) continue;
            var dnum = parseInt(d, 10);
            var pcid = MEETINGS[d];
            if (state.day >= dnum && state.characters[pcid] && !state.characters[pcid].met) {
                pending.push({ day: dnum, cid: pcid });
            }
        }
        pending.sort(function (a, b) { return a.day - b.day; });

        if (pending.length > 0) {
            var pcid2 = pending[0].cid;
            state.characters[pcid2].met = true;
            var metText = CHARACTERS[pcid2].metText;
            pushLine(
                '💫 <b>邂逅 ' + CHARACTERS[pcid2].name + '！</b>' + metText,
                '💫 邂逅 ' + CHARACTERS[pcid2].name + '！' + metText
            );
        }

        for (var li = 0; li < lines.length; li++) {
            window.Cake.addLog(lines[li].text, lines[li].day);
        }
        window.Cake.checkAchievements();
        window.Cake.refreshPage();

        var modalBody = [];
        for (var mi = 0; mi < lines.length; mi++) {
            modalBody.push('<p>' + lines[mi].html + '</p>');
        }
        window.Cake.showModal('🏪 今日营业', modalBody.join(''));
    }

    window.Cake.upgradeShop = upgradeShop;
    window.Cake.decorateShop = decorateShop;
    window.Cake.setPriceRate = setPriceRate;
    window.Cake.openShop = openShop;
})();