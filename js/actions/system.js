window.Cake = window.Cake || {};
(function () {
    function rest() {
        var state = window.Cake.store.state;
        var before = state.energy;
        state.energy = Math.min(100, state.energy + 40);
        var gain = state.energy - before;
        var text = gain > 0 ? '精力 +' + gain : '精力已满';
        window.Cake.addLog('😴 你休息了一下，' + text + '（当前' + state.energy + '）');
        window.Cake.refreshPage();
    }

    function walk() {
        var state = window.Cake.store.state;
        if (state.energy < 8) { window.Cake.addLog('😵 精力不足，无法出门散步！'); window.Cake.refreshPage(); return; }
        var before = state.energy;
        state.energy -= 8;

        var CHARACTERS = window.Cake.CHARACTERS;
        var WALK_EVENTS = window.Cake.WALK_EVENTS;
        var evPool = [];
        for (var i = 0; i < WALK_EVENTS.length; i++) {
            var ev = WALK_EVENTS[i];
            var blocked = false;
            for (var cid in CHARACTERS) {
                if (!Object.prototype.hasOwnProperty.call(CHARACTERS, cid)) continue;
                if (ev[cid] && (!state.characters[cid] || !state.characters[cid].met)) { blocked = true; break; }
            }
            if (!blocked) evPool.push(ev);
        }
        var pool = evPool.length ? evPool : WALK_EVENTS;
        var chosen = pool[Math.floor(Math.random() * pool.length)];

        // ✨ 本次改动：记录散步前的好感，事件生效后对变化角色补触发好感事件
        var beforeAff = {};
        for (var c0 in state.characters) {
            if (!Object.prototype.hasOwnProperty.call(state.characters, c0)) continue;
            if (state.characters[c0].met) beforeAff[c0] = state.characters[c0].affection;
        }

        window.Cake.applyEventEffects(chosen);

        var delta = state.energy - before;
        var sign = delta >= 0 ? '+' : '';
        window.Cake.addLog('🚶‍♀️ 出门散步（⚡' + sign + delta + '）：' + chosen.text);

        // ✨ 本次改动：对本次好感有变化的角色触发好感事件（会弹模态框）
        var triggeredCid = null;
        for (var c1 in state.characters) {
            if (!Object.prototype.hasOwnProperty.call(state.characters, c1)) continue;
            var cs1 = state.characters[c1];
            if (cs1.met && cs1.affection !== beforeAff[c1]) { triggeredCid = c1; break; }
        }
        if (triggeredCid) window.Cake.checkAffEvent(triggeredCid);

        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    function computeEnding() {
        var state = window.Cake.store.state;
        var RECIPES = window.Cake.RECIPES;
        var CHARACTERS = window.Cake.CHARACTERS;
        var allRecipes = Object.keys(state.recipes).length === Object.keys(RECIPES).length;
        var maxEntry = ['linmo', { affection: -1 }];
        for (var cid in state.characters) {
            if (!Object.prototype.hasOwnProperty.call(state.characters, cid)) continue;
            if (!CHARACTERS[cid]) continue;
            if (state.characters[cid].affection > maxEntry[1].affection) maxEntry = [cid, state.characters[cid]];
        }
        var maxAff = maxEntry[1].affection;
        if (state.reputation >= 350 && state.money >= 15000 && allRecipes) return { type: 'queen', char: null };
        if (maxAff >= 100 && state.reputation >= 120) return { type: 'marriage', char: maxEntry[0] };
        if (state.money >= 30000 && state.shopLevel >= 5) return { type: 'tycoon', char: null };
        if (state.reputation >= 150) return { type: 'warm', char: null };
        return { type: 'normal', char: null };
    }

    function showEnding() {
        var state = window.Cake.store.state;
        var e = computeEnding();
        var titles = { queen: '👑 甜品女王', marriage: '💍 甜蜜婚礼', tycoon: '💎 商业大亨', warm: '🏡 温馨小店', normal: '🌱 平凡之路' };
        var texts = {
            queen: '你成为了甜品界的传奇女王！所有蛋糕图鉴全收集，声望与财富无人能及。你的小店成了全城最甜蜜的传说。',
            marriage: '你与' + window.Cake.CHARACTERS[e.char].name + window.Cake.CHARACTERS[e.char].emoji + '携手走进了幸福的殿堂。以后的日子，有蛋糕，有花，有爱。',
            tycoon: '你打造了五星级蛋糕帝国，分店开遍全城。虽然忙碌，但钱包和梦想一样充实。',
            warm: '你开出了一家温馨的小店，每天都有人为了你的蛋糕露出笑容。平凡，却最幸福。',
            normal: '创业的路上还在继续，故事尚未完结。只要心怀甜蜜，未来就有无限可能。',
        };
        window.Cake.showModal('🌟 ' + titles[e.type],
            '<p>' + texts[e.type] + '</p>' +
            '<p class="muted" style="margin-top:10px;">当前数据：第' + state.day + '天 · ' + state.money + '元 · 声望' + state.reputation + ' · 店铺Lv.' + state.shopLevel + '</p>' +
            '<p>你可以继续经营，追求其他结局～</p>');
    }

    function saveGame() {
        if (window.Cake.saveState()) {
            window.Cake.addLog('💾 存档成功！');
            window.Cake.showModal('💾 存档', '<p>你的甜蜜故事已经保存好啦～</p>');
        } else {
            window.Cake.showModal('😢 存档失败', '<p>浏览器存储不可用。</p>');
        }
        window.Cake.refreshPage();
    }

    function loadGame() {
        if (!window.Cake.hasSave()) {
            window.Cake.showModal('📂 读取存档', '<p>没有找到存档。</p>');
            return;
        }
        window.Cake.store.state = window.Cake.loadStateFromStorage();
        window.Cake.addLog('📂 读取存档成功，欢迎回来～');
        window.Cake.refreshPage();
        var state = window.Cake.store.state;
        window.Cake.showModal('📂 读取存档',
            '<p>欢迎回来，' + window.Cake.escapeHtml(state.playerName) + '！<br>' +
            '你的「' + window.Cake.escapeHtml(state.shopName) + '」已经经营到第' + state.day + '天了。</p>');
    }

    function resetGame() {
        if (confirm('确定要重新开始吗？当前进度将被清除。')) {
            try { localStorage.removeItem(window.Cake.SAVE_KEY); } catch (e) {}
            location.href = 'index.html';
        }
    }

    window.Cake.rest = rest;
    window.Cake.walk = walk;
    window.Cake.computeEnding = computeEnding;
    window.Cake.showEnding = showEnding;
    window.Cake.saveGame = saveGame;
    window.Cake.loadGame = loadGame;
    window.Cake.resetGame = resetGame;
})();