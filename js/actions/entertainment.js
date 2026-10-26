window.Cake = window.Cake || {};
(function () {
    function rest() {
        var state = window.Cake.store.state;
        if (state.energy >= 100) {
            if (window.Cake.addLog) window.Cake.addLog('😴 精力已经全满啦，不需要休息。');
            if (window.Cake.refreshPage) window.Cake.refreshPage();
            return;
        }
        var before = state.energy;
        state.energy = Math.min(100, state.energy + 40);
        var gain = state.energy - before;
        if (window.Cake.addLog) window.Cake.addLog('😴 你休息了一下，精力 +' + gain + '（当前' + state.energy + '）');
        
        // 保存状态并刷新页面
        if (window.Cake.saveState) window.Cake.saveState();
        if (window.Cake.refreshPage) window.Cake.refreshPage();
    }

    function walk(location) {
        location = location || 'home';
        var state = window.Cake.store.state;
        
        if (state.energy < 8) { 
            if (window.Cake.addLog) window.Cake.addLog('😵 精力不足 8 点，无法出门散步！'); 
            if (window.Cake.refreshPage) window.Cake.refreshPage(); 
            return; 
        }
        
        var before = state.energy;
        state.energy -= 8; // 固定扣除 8 点体力

        // 1. 抽取事件
        var CHARACTERS = window.Cake.CHARACTERS || {};
        var WALK_EVENTS = window.Cake.WALK_EVENTS || [];
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
        var chosen = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : { text: "安静地走了一圈。" };

        // 记录好感
        var beforeAff = {};
        for (var c0 in state.characters) {
            if (!Object.prototype.hasOwnProperty.call(state.characters, c0)) continue;
            if (state.characters[c0].met) beforeAff[c0] = state.characters[c0].affection;
        }

        // 应用原版事件效果
        if (window.Cake.applyEventEffects && chosen !== undefined) {
            window.Cake.applyEventEffects(chosen);
        }

        // 2. 地点数值奖励
        var extraLog = "";
        if (location === 'park') {
            state.reputation = (state.reputation || 0) + 2;
            extraLog = "【街心公园】声望 +2。";
        } else if (location === 'street') {
            state.money = (state.money || 0) + 15;
            extraLog = "【商业街】金币 +15。";
        } else if (location === 'river') {
            state.energy = Math.min(100, state.energy + 3);
            extraLog = "【河边】体力额外恢复了 3 点。";
        } else {
            extraLog = "【家园周围】熟悉的小路，让人感到安心。";
        }

        // 3. 写日志
        var delta = state.energy - before;
        var sign = delta >= 0 ? '+' : '';
        var locName = { home: '家园周围', park: '街心公园', street: '商业街', river: '河边' }[location] || '附近';
        
        if (window.Cake.addLog) {
            window.Cake.addLog('🚶‍♀️ 去' + locName + '散步（⚡' + sign + delta + '）：' + (chosen.text || '') + ' ' + extraLog);
        }

        // 4. 触发好感与成就
        var triggeredCid = null;
        for (var c1 in state.characters) {
            if (!Object.prototype.hasOwnProperty.call(state.characters, c1)) continue;
            var cs1 = state.characters[c1];
            if (cs1.met && cs1.affection !== beforeAff[c1]) { triggeredCid = c1; break; }
        }
        if (triggeredCid && window.Cake.checkAffEvent) window.Cake.checkAffEvent(triggeredCid);
        if (window.Cake.checkAchievements) window.Cake.checkAchievements();

        // 5. 最关键：保存并刷新
        if (window.Cake.saveState) window.Cake.saveState();
        if (window.Cake.refreshPage) window.Cake.refreshPage();
    }

    window.Cake.rest = rest;
    window.Cake.walk = walk;
})();
