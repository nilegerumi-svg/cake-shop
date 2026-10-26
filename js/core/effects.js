window.Cake = window.Cake || {};
(function () {
    function applyEventEffects(ev) {
        var state = window.Cake.store.state;
        var CHARACTERS = window.Cake.CHARACTERS;
        if (ev.money) {
            state.money = Math.max(0, state.money + ev.money);
            if (ev.money > 0) state.totalEarned += ev.money;
        }
        if (ev.rep) state.reputation = Math.max(0, state.reputation + ev.rep);
        if (ev.energy) state.energy = Math.max(0, Math.min(100, state.energy + ev.energy));
        if (ev.ing) {
            for (var k in ev.ing) {
                if (!Object.prototype.hasOwnProperty.call(ev.ing, k)) continue;
                state.ingredients[k] = Math.max(0, (state.ingredients[k] || 0) + ev.ing[k]);
            }
        }
        for (var cid in CHARACTERS) {
            if (!Object.prototype.hasOwnProperty.call(CHARACTERS, cid)) continue;
            var c = state.characters[cid];
            if (ev[cid] && c && c.met) {
                c.affection = Math.min(100, c.affection + ev[cid]);
            }
        }
    }

    function checkAchievements() {
        var state = window.Cake.store.state;
        var ACHIEVEMENTS = window.Cake.ACHIEVEMENTS;
        for (var i = 0; i < ACHIEVEMENTS.length; i++) {
            var a = ACHIEVEMENTS[i];
            if (!state.achievements[a.id] && a.cond()) {
                state.achievements[a.id] = true;
                window.Cake.addLog('🏅 达成成就：' + a.name + '！');
            }
        }
    }

    // ✨ 本次改动：新增 silent 参数；silent=true 时不弹模态框，直接返回触发的 ev 数组，
    // 方便 openShop 把好感事件合并进「今日营业」弹窗里。
    function checkAffEvent(cid, silent) {
        var state = window.Cake.store.state;
        var s = state.characters[cid];
        var evts = window.Cake.AFF_EVENTS[cid];
        if (!s || !evts) return [];

        var thresholds = [20, 40, 60, 80, 100];
        var triggered = [];
        for (var i = 0; i < thresholds.length; i++) {
            var t = thresholds[i];
            if (s.affection >= t && s.eventsTriggered.indexOf(t) === -1 && evts[t]) {
                s.eventsTriggered.push(t);
                var ev = evts[t];
                applyEventEffects(ev);
                triggered.push(ev);
            }
        }
        if (triggered.length === 0) return [];

        for (var j = 0; j < triggered.length; j++) {
            window.Cake.addLog('💫 与' + window.Cake.CHARACTERS[cid].name + '的好感事件触发！');
        }

        if (!silent) {
            var body = [];
            for (var k = 0; k < triggered.length; k++) {
                body.push('<p>' + triggered[k].text + '</p>');
            }
            window.Cake.showModal('💫 ' + window.Cake.CHARACTERS[cid].name + ' · 好感事件', body.join(''));
        }

        checkAchievements();
        return triggered;
    }

    window.Cake.applyEventEffects = applyEventEffects;
    window.Cake.checkAchievements = checkAchievements;
    window.Cake.checkAffEvent = checkAffEvent;
})();