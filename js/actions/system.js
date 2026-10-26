// js/actions/system.js
window.Cake = window.Cake || {};

(() => {
    'use strict';

    const Cake = window.Cake;

    /* ==================== 结局计算 ==================== */

    const computeEnding = () => {
        const state = Cake.store.state;
        const RECIPES = Cake.RECIPES;
        const CHARACTERS = Cake.CHARACTERS;

        // 是否解锁全部配方
        const allRecipes =
            Object.keys(state.recipes).length === Object.keys(RECIPES).length;

        // 找出好感最高的已登场角色
        let maxCid = null;
        let maxChar = { affection: -1 };

        for (const [cid, c] of Object.entries(state.characters)) {
            if (!CHARACTERS[cid]) continue;
            if (c.affection > maxChar.affection) {
                maxCid = cid;
                maxChar = c;
            }
        }

        const maxAff = maxChar.affection;

        // 结局优先级判定
        if (state.reputation >= 350 && state.money >= 15000 && allRecipes) {
            return { type: 'queen', char: null };
        }
        if (maxAff >= 100 && state.reputation >= 120 && maxCid) {
            return { type: 'marriage', char: maxCid };
        }
        if (state.money >= 30000 && state.shopLevel >= 5) {
            return { type: 'tycoon', char: null };
        }
        if (state.reputation >= 150) {
            return { type: 'warm', char: null };
        }
        return { type: 'normal', char: null };
    };

    /* ==================== 查看结局 ==================== */

    const showEnding = () => {
        const ending = computeEnding();
        const CHARACTERS = Cake.CHARACTERS || {};
        let title = '🌟 当前结局评估';
        let body = '';

        switch (ending.type) {
            case 'queen':
                title = '👑 甜点女王';
                body = '<p>你的名声传遍了全城，成为了当之无愧的甜点女王！所有的配方都已经掌握，财富与声望双丰收。</p>';
                break;
            case 'marriage':
                title = '💍 甜蜜恋曲';
                body = `<p>在经营店铺的这段日子里，你与「${CHARACTERS[ending.char]?.name || '某个人'}」的心越靠越近。</p><p>事业与爱情双丰收，你们共同走向了幸福的下一个篇章～</p>`;
                break;
            case 'tycoon':
                title = '💰 商业大亨';
                body = '<p>你的店铺已经扩张到了极限，日进斗金。虽然还不是最有名的，但你已经是个成功的商人了。</p>';
                break;
            case 'warm':
                title = '☕ 温馨小店';
                body = '<p>你的小店名气不小，街坊邻居们都很喜欢这里。虽然还没达到巅峰，但每天都很充实快乐。</p>';
                break;
            case 'normal':
            default:
                title = '🌱 小店的日常';
                body = '<p>万事开头难，你的甜蜜物语才刚刚开始。继续努力烘焙、经营和邂逅吧！</p>';
                break;
        }

        Cake.showModal(title, body);
    };

    /* ==================== 存档 & 读档 & 重置 ==================== */

    const saveGame = () => {
        if (Cake.saveState()) {
            Cake.showModal('💾 保存成功', '<p>游戏进度已成功保存！下次可以从这里继续。</p>');
        } else {
            Cake.showModal('❌ 保存失败', '<p>浏览器存储空间可能已满或被禁用，无法保存进度。</p>');
        }
    };

    const loadGame = () => {
        const loaded = Cake.loadStateFromStorage();
        if (loaded) {
            Cake.store.state = loaded;
            Cake.refreshPage();
            Cake.showModal('📂 读取成功', '<p>已成功载入上次保存的进度。</p>');
        } else {
            Cake.showModal('❌ 读取失败', '<p>没有找到可用的存档。</p>');
        }
    };

    const resetGame = () => {
        if (!confirm('⚠️ 确定要重新开始吗？当前所有进度将被清空，且无法恢复。')) {
            return;
        }
        
        try {
            localStorage.removeItem(Cake.SAVE_KEY);
        } catch (e) { /* ignore */ }

        // 重置内存中的状态
        Cake.store.state = Cake.defaultState();
        
        // 保存空状态并刷新页面
        Cake.saveState();
        Cake.refreshPage();
        
        // 如果是在主页，可以顺便跳转，如果想留在当前页面也可以
        Cake.showModal('🔄 重新开始', '<p>一切已重新开始，祝你玩得开心！</p>');
    };

    /* ==================== 挂载 ==================== */

    Object.assign(Cake, {
        showEnding,
        saveGame,
        loadGame,
        resetGame,
    });

})();
