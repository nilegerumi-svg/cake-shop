// js/data/index.js
// 顶层 await：保证调用方 await import() 时，全部数据字典已装载完毕
console.log('🟢 [Data] 开始加载 Data 模块...');

const DATA_MODULES = [
    './attributes/index.js',
    './ingredients/index.js',
    './recipes/index.js',
    './tool/index.js',
    './characters/index.js',
    './world/index.js',
    './gardening/index.js',
    './festivals/index.js',
    './topics/index.js',
    './extracted/index.js',
    './furniture/index.js',
    './sewing/index.js',
    './books/index.js',
    './stars.js',
    './solar_terms.js',
    './newspapers/index.js',
    './health.js',
    './seasons/index.js',
    './achievements/index.js',
    './bundles/index.js',
    './usually_shop_events/index.js',
    './shop/index.js',
    './descriptions.js',
    './ingredients/detailed_descs.js',
    './ingredients/merged_for_game.js',
    './ingredients/nuts_v53.js',
    './recipes/merged_for_game.js',
    './recipes/v53_additions.js',
    './recipes/v53_pricing.js',
    './characters/merged_for_game.js',
    './stars_merged.js',
    './books/merged_for_game.js',
    './sewing/merged_for_game.js',
    './furniture/merged_for_game.js',
    './festivals/merged_for_game.js',
    './subsidy.js',
    './systems.js',
    './systems2.js'
];

// 数据层版本号：由 tools/version-assets.js 自动写入，请勿手改。
// 取值 = js/data 下全部数据文件内容的联合哈希，任一数据文件变更即改变，
// 使下面的动态 import 全部换 URL 重新拉取，避免缓存导致「代码新、数据旧」。
const DATA_VERSION = '89b5279b';
const withV = (p) =>
    DATA_VERSION && DATA_VERSION !== '00000000' ? p + (p.indexOf('?') > -1 ? '&' : '?') + 'v=' + DATA_VERSION : p;

// 数据子模块互相独立（各自向 window.Cake 挂载数据），可并行加载提速；
// 文件级进度上报让加载界面的"剩余文件数"持续变动。
window.setLoadTotal?.(DATA_MODULES.length);

// ⚠ __cakeDataReady 必须是「模块装载 + 全部后置合并」都完成后才 resolve。
// 早期写法是 Promise.all(...) 直接赋值、合并逻辑写在 await 之后：而
// js/app.bundle.js 也 await 同一个 promise，两边续体抢跑，bundle 往往先执行，
// 于是它用 Object.values() 建 INGREDIENTS_LIST / RECIPE_RUNTIME_DATA 时拿到的是
// **未合并的旧快照**——坚果与 v53 新增配方在运行时的表里查无此项（缺料、名字
// 显示成英文 id、存档净化时被当成未知食材丢掉）。合并搬进 promise 链内部后，
// bundle 拿到的一定是合并后的完整表。
window.__cakeDataReady = (async () => {
    await Promise.all(DATA_MODULES.map(async (path) => {
        try {
            console.log(`⏳ [Data] 准备加载: ${path}`);
            await import(withV(path));
            window.loadTick?.(path);
            console.log(`✅ [Data] 加载成功: ${path}`);
        } catch (err) {
            // 如果这里报错，说明是这个具体的文件404或者有语法错误
            console.error(`❌ [Data] 致命错误！加载 ${path} 失败:`);
            console.error(err);
            // 抛出带有文件名的错误
            throw new Error(`Data 目录下的文件报错或找不到: ${path} (${err.message || '未知错误'})`);
        }
    }));

    console.log('📦 [Data] 所有核心数据层装载完毕');

    // 【大文件拆分】merged_for_game.js 因超过 100KB 被切成主表（前 130 道）+ 续篇
    // （后 117 道）。续篇必须等主表装载完毕再追加，才能保持与原对象字面量一致的
    // 键序；用串行 import 而不是塞进 DATA_MODULES，避免并行加载打乱顺序。
    await import(withV('./recipes/merged_for_game_part2.js'));

    // 【第三批移植 · v53 新增 8 道配方】DATA_MODULES 是并行加载，不保证
    // v53_additions.js 与 merged_for_game.js 的先后，故等全部模块装载完毕后再
    // 统一并入主表。只新增、不覆盖任何既有配方。
    (() => {
        const C = window.Cake || {};
        const extra = C.RECIPES_GAME_V53;
        if (!extra) return;
        C.RECIPES_GAME = C.RECIPES_GAME || {};
        let n = 0;
        for (const id of Object.keys(extra)) {
            if (C.RECIPES_GAME[id]) continue;
            C.RECIPES_GAME[id] = extra[id];
            n++;
        }
        console.log('📖 [Recipes/v53] 新增配方已并入', n, '道，当前', Object.keys(C.RECIPES_GAME).length, '道');
    })();

    // 【移植补缺 · v53 坚果与坚果粉】8 道新增配方里有 6 道要用腰果粉 / 花生 /
    // 花生粉 / 杏仁粉 / 核桃 / 核桃粉 / 开心果粉，而 INGREDIENTS_GAME 里没有这
    // 10 个 id，缺料做不出来、存档净化还会把它们当未知食材丢掉。只新增不覆盖。
    (() => {
        const C = window.Cake || {};
        const nuts = C.INGREDIENTS_GAME_NUTS;
        if (!nuts) return;
        C.INGREDIENTS_GAME = C.INGREDIENTS_GAME || {};
        let n = 0;
        for (const id of Object.keys(nuts)) {
            if (C.INGREDIENTS_GAME[id]) continue;
            C.INGREDIENTS_GAME[id] = nuts[id];
            n++;
        }
        console.log('🥜 [Ingredients/nuts] 坚果与坚果粉已并入', n, '项');
    })();

    // 【第四批移植 · v53 定价跟进】等全部模块装载完毕后，把 126 项新 baseCost
    // 覆盖到既有配方。必须「原地改属性」：bundle 顶层 ge = window.Cake.RECIPES_GAME
    // 持的是对象引用，若在此替换整表，ge 会指向旧表导致补丁失效。
    // 只覆盖已存在的配方、只改 baseCost 一个字段；删掉 v53_pricing.js 与本段即可回滚。
    (() => {
        const C = window.Cake || {};
        const patch = C.RECIPE_BASECOST_V53;
        const g = C.RECIPES_GAME;
        if (!patch || !g) return;
        let n = 0, miss = 0;
        for (const id of Object.keys(patch)) {
            if (!g[id]) { miss++; continue; }
            g[id].baseCost = patch[id];
            n++;
        }
        console.log('💰 [Recipes/v53] 定价已跟进', n, '项', miss ? ('（缺 ' + miss + ' 项）') : '');
    })();

    // 用离线包提取的描述回填到食谱/食材（旧 schema 没有 desc 字段）
    (() => {
        const C = window.Cake || {};
        const D = C.DESCRIPTIONS || {};
        if (!Object.keys(D).length) return;
        let filled = 0;
        for (const key of Object.keys(C)) {
            if (!/^(INGREDIENTS|RECIPES_|RECIPES$)/.test(key)) continue;
            const obj = C[key];
            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) continue;
            for (const v of Object.values(obj)) {
                if (v && typeof v === 'object' && !v.desc && typeof v.name === 'string' && D[v.name]) { v.desc = D[v.name]; filled++; }
            }
        }
        console.log('📝 [Data] 已用离线包描述回填', filled, '条');

        // 旧版精细食材按 id 补充描述
        const DD = C.INGREDIENT_DESCS_DETAILED || {};
        let filled2 = 0;
        for (const [id, desc] of Object.entries(DD)) {
            const ing = C.INGREDIENTS && C.INGREDIENTS[id];
            if (ing && !ing.desc) { ing.desc = desc; filled2++; }
        }
        if (filled2) console.log('📝 [Data] 精细食材补充描述', filled2, '条');
    })();
})();

await window.__cakeDataReady;
