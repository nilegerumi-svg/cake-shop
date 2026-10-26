// js/core/utils.js
window.Cake = window.Cake || {};

(function () {
    // 核心工具函数
    function $(id) {
        return document.getElementById(id);
    }

    function randomPick(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function escapeHtml(str) {
        return String(str == null ? '' : str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function addLog(text, day) {
        var s = window.Cake.store.state;
        s.log = s.log || [];
        s.log.push({ day: day == null ? s.day : day, text: text });
        if (s.log.length > 60) s.log.shift();
    }

    function fail(message) {
        addLog(message);
        if (typeof window.Cake.refreshPage === 'function') {
            window.Cake.refreshPage();
        }
        return false;
    }

    function affLevel(a) {
        if (a >= 100) return '💖 挚爱';
        if (a >= 80) return '💗 心动';
        if (a >= 60) return '💞 亲密';
        if (a >= 40) return '🤝 朋友';
        if (a >= 20) return '👋 相识';
        return '😶 陌生';
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
            parts.push(
                '<span class="' + cls + '">' + ING[k].emoji + ING[k].name +
                ' ' + have + '/' + v + '</span>'
            );
        }
        return parts.join('');
    }

    // ── 关键：全部挂载到 window.Cake 下 ──
    window.Cake.$ = $;
    window.Cake.randomPick = randomPick;
    window.Cake.escapeHtml = escapeHtml;
    window.Cake.addLog = addLog;
    window.Cake.fail = fail;
    window.Cake.affLevel = affLevel;
    window.Cake.hasIngredients = hasIngredients;
    window.Cake.consumeIngredients = consumeIngredients;
    window.Cake.ingredientTags = ingredientTags;
    
    // 兼容全局 $ 调用
    if (typeof window.$ === 'undefined') {
        window.$ = $;
    }
})();
