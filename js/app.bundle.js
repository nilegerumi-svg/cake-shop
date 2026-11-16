/*
 * js/app.bundle.js — 逆向源码的拼接加载器（手写）
 *
 * 原 1.8MB 压缩成品（无 source map）已逆向为可读源码，按功能域拆分到
 * js/src/ 下共 56 个模块文件，并做过一轮「大文件拆分」（>100KB 的按声明 /
 * 语句 / 数据段边界再切，切点均落在语义边界，拼接结果与切前等价）。
 * 模块数必须与下方 TM_SOURCE_PARTS 条目数一致（当前 56 项），增删模块时两处同改。
 * 例外：react/react-dom-bundle.js 是 React DOM 生产构建的单个模块工厂函数，438 条
 * 语句共享同一函数作用域，任何跨文件切分都会破坏 var / function 提升，故保持完整。
 * 运行时按 TM_SOURCE_PARTS 的顺序依次取回全部模块，拼成与原压缩包语义
 * 一致的源码，再作为 ES 模块执行（保留顶层 await 与模块作用域）。
 *
 * 重要限制（逆向而非反编译）：
 *   - 压缩时变量名、注释、原始目录结构已被丢弃，无法恢复；模块文件内的
 *     标识符仍是 Eo / ht 这类压缩名，仅供阅读定位，不是原名。
 *   - 全部分模块属同一作用域，跨文件引用照旧；模块边界落在「语句边界」，
 *     但一个大函数内部不会跨文件，单文件可独立阅读。
 *   - 新增/修改功能：直接在对应域文件夹改文件，并在 TM_SOURCE_PARTS 该
 *     位置插入；切勿调整顺序，否则拼接结果改变，游戏无法运行。
 *   - 换行约束见 .gitattributes（js/src/ 下各模块文件仅限 LF）。
 */
const TM_SOURCE_PARTS = [
    "react/react-namespace.js",
    "react/react-dom-bundle.js",
    "npc/lunar-weather-time.js",
    "npc/ingredients-pantry.js",
    "npc/recipes-mashed-potato.js",
    "npc/npc-zhao-weimin.js",
    "npc/npc-profile-helpers.js",
    "recipe/npc-family-group.js",
    "night/night-events-relations.js",
    "night/newyear-ambient-lines.js",
    "garden/festival-solarterm-lines.js",
    "calendar/npc-relations-festivals.js",
    "garden/text-match-mbti.js",
    "garden/npc-daily-lines-ahe.js",
    "garden/npc-daily-lines-songxiaoyu.js",
    "calendar/conversation-lines.js",
    "shop/fishing-allergen.js",
    "shop/core-state-time.js",
    "shop/buy-craft-actions.js",
    "shop/bundle-packs.js",
    "shop/craft-achievement.js",
    "shop/npc-encounter-actions.js",
    "night/aquarium-day-advance.js",
    "night/state-sanitize.js",
    "audio/save-load-speech.js",
    "audio/howler-loader.js",
    "audio/howler-instance.js",
    "audio/bgm-data-part1.js",
    "audio/bgm-data-part2.js",
    "a11y/audio-speech.js",
    "calendar/voice-command-hooks.js",
    "a11y/home-interior-sections.js",
    "a11y/workshop-sewing-sections.js",
    "a11y/rooftop-collection-sections.js",
    "shop/shop-operations-panels.js",
    "a11y/store-kitchen-sections.js",
    "a11y/processing-baking-sections.js",
    "calendar/home-ingredient-panels.js",
    "a11y/game-action-creators.js",
    "meta/events-newspaper-fishing.js",
    "a11y/town-street-sections.js",
    "a11y/school-market-travel-sections.js",
    "a11y/city-events-sections.js",
    "calendar/town-map-travel-panels.js",
    "a11y/outfit-shops-sections.js",
    "calendar/street-store-shelter-panels.js",
    "calendar/profile-status-panels.js",
    "a11y/codex-npc-filter-sections.js",
    "react/npc-profile-panels.js",
    "meta/achievements-milestones.js",
    "meta/main-story-system.js",
    "a11y/topbar-tabbar.js",
    "calendar/calendar-recipebook-panels.js",
    "a11y/system-dialogs.js",
    "a11y/phone-app-shell.js",
    "react/console-meta-selector.js"
];

// 模块版本号：由 tools/version-assets.js 自动写入，请勿手改。
// 取值 = 前 56 个模块内容联合哈希 + 本文件（剔除本行后）内容哈希，因此
// 「任一模块变更」与「加载器自身变更」都会改变它，进而让全部模块 URL 一起失效，
// 避免浏览器缓存导致新旧模块混拼。
const TM_VERSION = 'fffe4e8f';

const TM_BASE = new URL('./src/', import.meta.url);
const TM_QS = TM_VERSION && TM_VERSION !== '00000000' ? '?v=' + TM_VERSION : '';

const TM_CODE = await Promise.all(TM_SOURCE_PARTS.map(async (name) => {
    const res = await fetch(new URL(name + TM_QS, TM_BASE), { credentials: 'same-origin' });
    if (!res.ok) throw new Error('[Source] 模块加载失败: ' + name + ' (HTTP ' + res.status + ')');
    return res.text();
}));

// 拼接结果与原始压缩包语义一致，交给一个 Blob 模块执行即可复现原行为
const TM_URL = URL.createObjectURL(new Blob(TM_CODE, { type: 'text/javascript;charset=utf-8' }));
try {
    await import(TM_URL);
} finally {
    URL.revokeObjectURL(TM_URL);
}
window.__cakeBundlePartsLoaded = TM_SOURCE_PARTS.length;
console.log('[Source] 已按 ' + TM_SOURCE_PARTS.length + ' 个逆向模块装载完毕');
