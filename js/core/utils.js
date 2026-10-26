window.Cake = window.Cake || {};
(function () {
    function $(id) { return document.getElementById(id); }
    function randomPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function escapeHtml(str) {
        return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    }
    function addLog(text, day) {
        var s = window.Cake.store.state;
        s.log.push({ day: day == null ? s.day : day, text: text });
        if (s.log.length > 60) s.log.shift();
    }
    function affLevel(a) {
        if (a >= 100) return '💞 挚爱';
        if (a >= 80)  return '💗 心动';
        if (a >= 60)  return '💕 亲密';
        if (a >= 40)  return '💛 朋友';
        if (a >= 20)  return '💚 相识';
        return '🤍 陌生';
    }
    function hasIngredients(ing) {
        var s = window.Cake.store.state;
        for (var k in ing) {
            if (!Object.prototype.hasOwnProperty.call(ing, k)) continue;
            if ((s.ingredients[k] || 0) < ing[k]) return false;
        }
        return true;
    }
    function consumeIngredients(ing) {
        var s = window.Cake.store.state;
        for (var k in ing) {
            if (!Object.prototype.hasOwnProperty.call(ing, k)) continue;
            s.ingredients[k] = (s.ingredients[k] || 0) - ing[k];
        }
    }
    function ingredientTags(ing) {
        var s = window.Cake.store.state;
        var ING = window.Cake.INGREDIENTS;
        var parts = [];
        for (var k in ing) {
            if (!Object.prototype.hasOwnProperty.call(ing, k)) continue;
            var v = ing[k];
            var have = s.ingredients[k] || 0;
            var cls = have >= v ? 'ok' : 'lack';
            parts.push('<span class="ing-tag ' + cls + '">' + ING[k].emoji + ING[k].name + ' ' + have + '/' + v + '</span>');
        }
        return parts.join('');
    }

    window.Cake.$ = $;
    window.Cake.randomPick = randomPick;
    window.Cake.escapeHtml = escapeHtml;
    window.Cake.addLog = addLog;
    window.Cake.affLevel = affLevel;
    window.Cake.hasIngredients = hasIngredients;
    window.Cake.consumeIngredients = consumeIngredients;
    window.Cake.ingredientTags = ingredientTags;
})();