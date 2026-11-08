/*
 * js/app.bundle.js — 打包产物的拆分加载器（手写）
 *
 * 原 1.8MB 压缩成品已按固定字节切成同目录 js/app.bundle/ 下的 12 个有序分片。
 * 本文件按序取回全部分片、拼成与原始 app.bundle.js 逐字节一致的源码，
 * 再作为 ES 模块执行（保留其顶层 await 与模块作用域），运行语义与原文件相同。
 *
 * 拆分收益：仓库内不再有单个超大文件；改动只影响命中的分片，
 * 浏览器可按分片粒度缓存，无需每次重传整包。
 *
 * 维护提示：分片由脚本机械切分，请勿手工编辑；如需更新打包产物，
 * 重新生成 app.bundle.* 分片即可（本加载器按数组顺序拼接）。
 */
const TM_BUNDLE_PARTS = ["app-01.js","app-02.js","app-03.js","app-04.js","app-05.js","app-06.js","app-07.js","app-08.js","app-09.js","app-10.js","app-11.js","app-12.js"];

const TM_BASE = new URL('./app.bundle/', import.meta.url);

const TM_CODE = await Promise.all(TM_BUNDLE_PARTS.map(async (name) => {
    const res = await fetch(new URL(name, TM_BASE), { credentials: 'same-origin' });
    if (!res.ok) throw new Error('[Bundle] 分片加载失败: ' + name + ' (HTTP ' + res.status + ')');
    return res.text();
}));

// 拼接结果与拆分前逐字节一致，交给一个 Blob 模块执行即可复现原行为
const TM_URL = URL.createObjectURL(new Blob(TM_CODE, { type: 'text/javascript;charset=utf-8' }));
try {
    await import(TM_URL);
} finally {
    URL.revokeObjectURL(TM_URL);
}
window.__cakeBundlePartsLoaded = TM_BUNDLE_PARTS.length;
console.log('[Bundle] 已按 ' + TM_BUNDLE_PARTS.length + ' 个分片装载完毕');
