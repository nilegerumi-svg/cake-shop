window.Cake = window.Cake || {};
(function () {
    function social(cid, type) {
        var state = window.Cake.store.state;
        var c = window.Cake.CHARACTERS[cid];
        var s = state.characters[cid];
        if (!c || !s) { window.Cake.addLog('❌ 未知角色'); window.Cake.refreshPage(); return; }
        if (!s.met) { window.Cake.addLog('🔒 你还没有遇到' + c.name + '。'); window.Cake.refreshPage(); return; }

        if (type === 'chat') {
            if (state.energy < 8) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
            state.energy -= 8;
            var gain = 3 + Math.floor(Math.random() * 3);
            var before = s.affection;
            s.affection = Math.min(100, s.affection + gain);
            var actual = s.affection - before;
            var affText = actual > 0 ? '好感 +' + actual : '好感已满';
            var dialogues = window.Cake.CHAT_DIALOGUES[cid];
            window.Cake.addLog('💬 与' + c.name + '聊天，' + affText + '。' + dialogues[Math.floor(Math.random() * dialogues.length)]);
            window.Cake.checkAffEvent(cid);
            window.Cake.checkAchievements();
        }

        if (type === 'date') {
            if (s.affection < 40) { window.Cake.addLog('💭 和' + c.name + '的关系还不够亲密（需好感40）。'); window.Cake.refreshPage(); return; }
            if (state.energy < 12) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
            if (state.money < 50) { window.Cake.addLog('💸 邀约需要50元。'); window.Cake.refreshPage(); return; }
            state.energy -= 12;
            state.money -= 50;
            var gain2 = 7 + Math.floor(Math.random() * 3);
            var before2 = s.affection;
            s.affection = Math.min(100, s.affection + gain2);
            var actual2 = s.affection - before2;
            var affText2 = actual2 > 0 ? '好感 +' + actual2 : '好感已满';
            var dd = window.Cake.DATE_DIALOGUES[cid];
            window.Cake.addLog('🌹 与' + c.name + '约会，' + affText2 + '。' + dd[Math.floor(Math.random() * dd.length)]);
            window.Cake.checkAffEvent(cid);
            window.Cake.checkAchievements();
        }
        window.Cake.refreshPage();
    }

    function toggleGiftPanel(cid) {
        var state = window.Cake.store.state;
        state.giftPanelFor = state.giftPanelFor === cid ? null : cid;
        window.Cake.refreshPage();
    }

    function giveGift(cid, cake) {
        var state = window.Cake.store.state;
        var c = window.Cake.CHARACTERS[cid];
        var s = state.characters[cid];
        if (!c || !s) { window.Cake.addLog('❌ 未知角色'); window.Cake.refreshPage(); return; }
        if (!s.met) { window.Cake.addLog('🔒 你还没有遇到' + c.name + '。'); window.Cake.refreshPage(); return; }
        if ((state.cakes[cake] || 0) <= 0) { window.Cake.addLog('❌ 没有这个蛋糕了。'); window.Cake.refreshPage(); return; }
        if (state.energy < 8) { window.Cake.addLog('😵 精力不足！'); window.Cake.refreshPage(); return; }
        state.cakes[cake]--;
        if (state.cakes[cake] <= 0) delete state.cakes[cake];
        state.energy -= 8;
        var liked = c.likes.indexOf(cake) !== -1;
        var gain = liked ? 10 : 4;
        var before = s.affection;
        s.affection = Math.min(100, s.affection + gain);
        var actual = s.affection - before;
        var affText = actual > 0 ? '好感 +' + actual : '好感已满';
        window.Cake.addLog('🎁 你将' + cake + '送给了' + c.name + '，' + affText + (liked ? ' 💕（超喜欢！）' : ''));
        state.giftPanelFor = null;
        window.Cake.checkAffEvent(cid);
        window.Cake.checkAchievements();
        window.Cake.refreshPage();
    }

    window.Cake.social = social;
    window.Cake.toggleGiftPanel = toggleGiftPanel;
    window.Cake.giveGift = giveGift;
})();