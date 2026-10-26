// js/actions/system.js（仅展示 computeEnding 的修改部分）
const computeEnding = () => {
    const { store, RECIPES, CHARACTERS } = window.Cake;
    const state = store.state;

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
