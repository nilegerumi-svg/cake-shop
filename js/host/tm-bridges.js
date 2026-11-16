// js/host/tm-bridges.js
// 【第二批移植 · 数据桥】把仓库数据层 window.Cake.* 与存档，投影成
// v53 手写只读面板（js/host/people.js、wall.js）原本依赖的 window.__TM_* 桥。
//
// 为什么需要：v53 里这些桥是「框架区手写注入」，挂在 React 根组件作用域，
// 直接返回活 state；仓库的 app.bundle 是压缩成品，不能改内部。但仓库与 v53
// 用的是同一套存档键 sweet-offline-saves，且数据已按 js/data/ 分层挂到
// window.Cake，故在此做一次只读投影，数据仍只有一份，不设中间适配层。
//
// 落点：js/host/（与 people.js 同层，沿用既有层级），无新目录。
(function () {
    'use strict';

    // 先建立稳定引用：面板在打开时才读这些全局，异步填充不影响引用。
    var NPC = window.__TM_NPC__ = window.__TM_NPC__ || [];
    var IMAP = window.__TM_ITEM_MAP__ = window.__TM_ITEM_MAP__ || {};

    // 【第三批】原先 8 道 v53 独有配方只在桥里补名称（EXTRA_NAMES），
    // 现已作为完整配方下沉到 js/data/recipes/v53_additions.js 并并入
    // Cake.RECIPES_GAME。桥不再持有任何数据，退回纯投影。

    // 存档读取：sweet-offline-saves 是 JSON 字符串，且 main 里还有一批字段被
    // 二次序列化过（ingredients / products / recipes / shelves / home / stats /
    // achievements / outfits / orders / met_npcs …）。v53 的面板读这些字段时
    // 当对象用，只 parse 一个 affection 会让其余字段全是字符串——判断库存、
    // 产物、家具、穿搭时全部落空。这里统一按「看起来像 JSON 就 parse」还原。
    function revive(v) {
        if (typeof v !== 'string' || !v) return v;
        var c = v.charAt(0);
        if (c !== '{' && c !== '[' && c !== '"') return v;   // "2026-3" / "creamy" 这类纯文本原样保留
        try { return JSON.parse(v); } catch (e) { return v; }
    }
    function readState() {
        try {
            var raw = localStorage.getItem('sweet-offline-saves');
            if (!raw) return null;
            var root = JSON.parse(raw);
            var m = root && root.main;
            if (!m || typeof m !== 'object') return null;
            for (var k in m) {
                if (!Object.prototype.hasOwnProperty.call(m, k)) continue;
                m[k] = revive(m[k]);
            }
            if (!m.affection || typeof m.affection !== 'object') m.affection = {};
            return m;
        } catch (e) { return null; }
    }

    window.__TM_STATE_GET__ = function () { return readState(); };
    window.__TM_AFF_GET__ = function () {
        var s = readState();
        return (s && s.affection) || {};
    };

    function put(map, id, name) {
        if (!id || !name) return;
        if (!map[id]) map[id] = { id: id, name: name };
    }

    function build() {
        var C = window.Cake || {};

        // 1) 镇民：Cake.NPCS 与 v53 Zt 的 58 个 id 完全一致，按对象值投影为数组
        var npcs = C.NPCS || {};
        for (var id in npcs) {
            if (!Object.prototype.hasOwnProperty.call(npcs, id)) continue;
            var n = npcs[id];
            if (!n || !n.name) continue;
            var exists = false;
            for (var i = 0; i < NPC.length; i++) if (NPC[i].id === n.id) { exists = true; break; }
            if (!exists) NPC.push(n);
        }

        // 2) 物品对照表：食材 + 配方 + 商店物品，统一投成 id -> {name}
        var groups = [C.INGREDIENTS_GAME, C.RECIPES_GAME, C.ITEMS, C.PRODUCTS];
        for (var g = 0; g < groups.length; g++) {
            var grp = groups[g];
            if (!grp) continue;
            if (Array.isArray(grp)) {
                for (var j = 0; j < grp.length; j++) put(IMAP, grp[j] && grp[j].id, grp[j] && grp[j].name);
            } else {
                for (var k in grp) {
                    if (!Object.prototype.hasOwnProperty.call(grp, k)) continue;
                    put(IMAP, k, grp[k] && grp[k].name);
                }
            }
        }
        window.__TM_BRIDGES_READY = true;
        console.log('🔗 [Bridges] 已投影', NPC.length, '位镇民 /', Object.keys(IMAP).length, '项物品');
    }

    // js/data/index.js 是 type=module（defer），本文件是同步脚本，会先执行；
    // 等 window.Cake.NPCS 齐备再投影，避免读到半加载的数据层。
    function wait() {
        var C = window.Cake;
        // 第三批：额外等 RECIPES_GAME 已并入 v53 新配方（macaron 是标记 id），
        // 否则物品桥会漏掉这 8 项。数据层是并行加载，顺序不能假设。
        if (C && C.NPCS && Object.keys(C.NPCS).length >= 58 &&
            C.RECIPES_GAME && C.RECIPES_GAME.macaron) { build(); return; }
        setTimeout(wait, 40);
    }
    wait();
})();
