// js/actions/system.js（仅展示 computeEnding 的修改部分）
function computeEnding() {
    var state = window.Cake.store.state;
    var RECIPES = window.Cake.RECIPES;
    var CHARACTERS = window.Cake.CHARACTERS;
    var allRecipes = Object.keys(state.recipes).length ===
        Object.keys(RECIPES).length;

    var maxEntry = [null, { affection: -1 }];

    for (var cid in state.characters) {
        if (!Object.prototype.hasOwnProperty.call(state.characters, cid)) continue;
        if (!CHARACTERS[cid]) continue;
        if (state.characters[cid].affection > maxEntry[1].affection) {
            maxEntry = [cid, state.characters[cid]];
        }
    }

    var maxAff = maxEntry[1].affection;

    if (state.reputation >= 350 && state.money >= 15000 && allRecipes) {
        return { type: 'queen', char: null };
    }
    if (maxAff >= 100 && state.reputation >= 120 && maxEntry[0]) {
        return { type: 'marriage', char: maxEntry[0] };
    }
    if (state.money >= 30000 && state.shopLevel >= 5) {
        return { type: 'tycoon', char: null };
    }
    if (state.reputation >= 150) {
        return { type: 'warm', char: null };
    }
    return { type: 'normal', char: null };
}
