#!/usr/bin/env node
/*
 * tools/version-assets.js — 静态资源版本号统一工具
 *
 * 为什么需要：站点托管在 GitHub Pages，静态资源默认只有 10 分钟缓存且不带 ETag 语义，
 * 一次发版窗口内浏览器可能拿到「新 HTML + 旧 JS」或「旧 HTML + 新 JS」的混合组合；
 * 而 js/app.bundle.js 与 js/data/index.js 又都是在运行时用代码算 URL 去 fetch / import
 * 子模块，手写 ?v= 根本覆盖不到它们。
 *
 * 本工具做三件事，全部基于内容哈希，改哪个文件只有那个文件失效：
 *   1. 写入 js/app.bundle.js 的 TM_VERSION
 *      = f(56 个模块联合哈希, 加载器自身去掉该行后的哈希)
 *      模块或加载器任一变更都会让整批模块 URL 一起失效（模块共享作用域，本就须整批一致）。
 *   2. 写入 js/data/index.js 的 DATA_VERSION
 *      = js/data 下全部数据文件的联合哈希
 *   3. 给 index.html 与 pages/*\/index.html 中所有本地 js/css 引用写上 ?v=<内容哈希前 8 位>
 *
 * 用法：
 *   node tools/version-assets.js            # 写入
 *   node tools/version-assets.js --check    # 只报告差异，不写文件（退出码 1 表示需要更新）
 *
 * 约定：每次改完代码、提交前跑一次。幂等——内容没变时重复运行不产生任何改动。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const CHECK_ONLY = process.argv.includes('--check');

const md5 = (buf) => crypto.createHash('md5').update(buf).digest('hex');
const short = (buf) => md5(buf).slice(0, 8);
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

const report = { written: [], unchanged: [], skipped: [], errors: [] };

/* ---------- 通用：读文件（保留原始字节用于哈希，文本用于改写） ---------- */
function read(p) {
  return fs.readFileSync(p, 'utf8');
}
function writeIfChanged(file, before, after, label) {
  if (before === after) {
    report.unchanged.push(label);
    return false;
  }
  if (CHECK_ONLY) {
    report.written.push(label + '（需更新，--check 未写入）');
    return true;
  }
  fs.writeFileSync(file, after, 'utf8');
  report.written.push(label);
  return true;
}

/* ---------- 1. 计算 TM_VERSION ---------- */
const bundlePath = path.join(ROOT, 'js/app.bundle.js');
let tmVersion = null;
let bundleBefore = null;

function computeTmVersion() {
  const src = read(bundlePath);
  const m = src.match(/const TM_SOURCE_PARTS = \[([\s\S]*?)\];/);
  if (!m) throw new Error('js/app.bundle.js 中找不到 TM_SOURCE_PARTS');
  // 只取数组里的字符串字面量，避免 eval 引入安全顾虑
  const parts = [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
  if (!parts.length) throw new Error('TM_SOURCE_PARTS 解析为空');

  const h = crypto.createHash('md5');
  let missing = [];
  for (const name of parts) {
    const f = path.join(ROOT, 'js/src', name);
    if (!fs.existsSync(f)) {
      missing.push(name);
      continue;
    }
    h.update(name);
    h.update('\0');
    h.update(fs.readFileSync(f));
    h.update('\0');
  }
  if (missing.length) throw new Error('以下模块缺失，无法计算版本：' + missing.join(', '));
  const moduleHash = h.digest('hex');

  // 加载器自身哈希：剔除 TM_VERSION 那一行，避免「写入版本号 -> 内容变 -> 版本号再变」的自指循环
  const stripped = src.replace(/const TM_VERSION = '[^']*';/, "const TM_VERSION = '';");
  const loaderHash = md5(stripped);

  return { version: md5(moduleHash + '|' + loaderHash).slice(0, 8), count: parts.length };
}

try {
  const { version, count } = computeTmVersion();
  tmVersion = version;
  bundleBefore = read(bundlePath);
  const after = bundleBefore.replace(
    /const TM_VERSION = '[^']*';/,
    `const TM_VERSION = '${version}';`
  );
  if (after === bundleBefore && !bundleBefore.includes(`'${version}'`)) {
    report.errors.push('js/app.bundle.js：未能定位 TM_VERSION 赋值语句');
  }
  writeIfChanged(bundlePath, bundleBefore, after, `js/app.bundle.js  TM_VERSION=${version}（${count} 模块）`);
} catch (e) {
  report.errors.push('计算 TM_VERSION 失败：' + e.message);
}

/* ---------- 2. 计算 DATA_VERSION ---------- */
let dataVersion = null;
const dataIndexPath = path.join(ROOT, 'js/data/index.js');

function walkFiles(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(p, acc);
    else if (e.name.endsWith('.js')) acc.push(p);
  }
  return acc;
}

try {
  const dataDir = path.join(ROOT, 'js/data');
  const files = walkFiles(dataDir).sort();
  const h = crypto.createHash('md5');
  for (const f of files) {
    // 用相对路径参与哈希，保证跨机器、跨盘符结果一致
    h.update(path.relative(dataDir, f).replace(/\\/g, '/'));
    h.update('\0');
    // index.js 自身写了 DATA_VERSION，直接哈希会自指（写入后内容变 -> 版本再变）。
    // 与 TM_VERSION 同样处理：剔除该行后再参与哈希。
    const buf = fs.readFileSync(f);
    if (f === dataIndexPath) {
      h.update(buf.toString('utf8').replace(/const DATA_VERSION = '[^']*';/, "const DATA_VERSION = '';"));
    } else {
      h.update(buf);
    }
    h.update('\0');
  }
  const version = h.digest('hex').slice(0, 8);
  dataVersion = version;
  const before = read(dataIndexPath);
  const after = before.replace(
    /const DATA_VERSION = '[^']*';/,
    `const DATA_VERSION = '${version}';`
  );
  writeIfChanged(dataIndexPath, before, after, `js/data/index.js  DATA_VERSION=${version}（${files.length} 数据文件）`);
} catch (e) {
  report.errors.push('计算 DATA_VERSION 失败：' + e.message);
}

/* ---------- 3. 改写 HTML 中的 js/css 引用 ---------- */
const HTML_TARGETS = [path.join(ROOT, 'index.html')];
const pagesDir = path.join(ROOT, 'pages');
if (fs.existsSync(pagesDir)) {
  for (const d of fs.readdirSync(pagesDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const f = path.join(pagesDir, d.name, 'index.html');
    if (fs.existsSync(f)) HTML_TARGETS.push(f);
  }
}

// 匹配 src="..." / href="..." 且以 .js / .css 结尾（可带既有 query）
const REF_RE = /(\b(?:src|href)\s*=\s*)(["'])([^"'\s>]+?\.(?:js|css))(?:\?[^"'\s>]*)?\2/g;

let refTotal = 0;
let refChanged = 0;

for (const htmlFile of HTML_TARGETS) {
  const before = read(htmlFile);
  let changedInFile = 0;

  const after = before.replace(REF_RE, (full, prefix, quote, ref) => {
    // 跳过外链与协议地址
    if (/^(?:https?:)?\/\//i.test(ref) || /^(?:data|blob|mailto):/i.test(ref)) return full;
    if (ref.startsWith('/')) {
      report.skipped.push(`${rel(htmlFile)}: 根路径引用 ${ref}（未处理）`);
      return full;
    }
    const abs = path.resolve(path.dirname(htmlFile), ref);
    if (!fs.existsSync(abs)) {
      report.skipped.push(`${rel(htmlFile)}: 目标不存在 ${ref}`);
      return full;
    }

    refTotal++;
    let version;
    const relFromRoot = rel(abs);
    if (relFromRoot === 'js/app.bundle.js') {
      // 加载器版本只能用 TM_VERSION：它自身内容随 TM_VERSION 变动，直接取内容哈希会自指
      if (!tmVersion) return full;
      version = tmVersion;
    } else if (relFromRoot === 'js/data/index.js') {
      if (!dataVersion) return full;
      version = dataVersion;
    } else {
      version = short(fs.readFileSync(abs));
    }

    const next = `${prefix}${quote}${ref}?v=${version}${quote}`;
    if (next !== full) {
      changedInFile++;
      refChanged++;
    }
    return next;
  });

  writeIfChanged(htmlFile, before, after,
    `${rel(htmlFile)}  引用版本更新 ${changedInFile} 条`);
}

/* ---------- 输出 ---------- */
console.log('=== 资源版本号' + (CHECK_ONLY ? '（只检查）' : '') + ' ===');
console.log('待处理 HTML：' + HTML_TARGETS.map(rel).join(', '));
console.log('扫描本地 js/css 引用：' + refTotal + ' 条，更新 ' + refChanged + ' 条\n');

if (report.written.length) {
  console.log('已更新：');
  for (const x of report.written) console.log('  ✓ ' + x);
}
if (report.unchanged.length) {
  console.log('无变化：');
  for (const x of report.unchanged) console.log('  · ' + x);
}
if (report.skipped.length) {
  console.log('已跳过：');
  for (const x of report.skipped) console.log('  − ' + x);
}
if (report.errors.length) {
  console.log('\n错误：');
  for (const x of report.errors) console.log('  ✗ ' + x);
}

const needsWork = report.written.length > 0 || report.errors.length > 0;
if (CHECK_ONLY) {
  console.log(needsWork ? '\n需要更新（--check）' : '\n全部已是最新');
  process.exit(needsWork ? 1 : 0);
}
process.exit(report.errors.length ? 1 : 0);
