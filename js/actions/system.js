window.Cake = window.Cake || {};
(function () {
    // 💡 注意：rest() 和 walk() 已经拆分到 entertainment.js 里了

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
    }

    // 挂载到全局
    window.Cake.computeEnding = computeEnding;
    window.Cake.showEnding = showEnding;
    window.Cake.saveGame = saveGame;
    window.Cake.loadGame = loadGame;
})();
