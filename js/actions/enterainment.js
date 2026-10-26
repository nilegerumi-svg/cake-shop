window.Cake = window.Cake || {};
(function () {
    // 😴 休息逻辑 (原版：+40精力)
    function rest() {
        var state = window.Cake.store.state;
        var before = state.energy;
        state.energy = Math.min(100, state.energy + 40);
        var gain = state.energy - before;
        var text = gain > 0 ? '精力 +' + gain : '精力已满';
        window.Cake.addLog('😴 你休息了一下，' + text + '（当前' + state.energy + '）');
        window.Cake.refreshPage();
    }

    // 🚶‍♀️ 散步逻辑 (原版：-8精力，触发随机事件、好感、成就)
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

        // 记录散步前的好感，事件生效后对变化角色补触发好感事件
        var beforeAff = {};
        for (var c0 in state.characters) {
            if (!Object.prototype.hasOwnProperty.call(state.characters, c0)) continue;
            if (state.characters[c0].met) beforeAff[c0] = state.characters[c0].affection;
        }

        window.Cake.applyEventEffects(chosen);

        var delta = state.energy - before;
        var sign = delta >= 0 ? '+' : '';
        window.Cake.addLog('🚶‍♀️ 出门散步（⚡' + sign + delta + '）：' + chosen.text);

        // 对本次好感有变化的角色触发好感事件
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

    // 挂载到 Cake 全局对象，供 shared.js 调用
    window.Cake.rest = rest;
    window.Cake.walk = walk;
})();
