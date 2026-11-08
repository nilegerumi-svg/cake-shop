#!/usr/bin/env node
/*
 * tools/verify-content.js — 内容级（字段级）一致性校验
 *
 * 用途：拿一份基线 HTML（离线包/概念版），逐对象逐字段验证项目 js/ 中是否存在
 *       "同样的键值"，与代码写法无关：
 *         - 键：带引号 / 不带引号 都算
 *         - 值：单引号 / 双引号 / 反引号 都算；压缩布尔 !0/!1 与 true/false 等价
 *         - 空白、键序、尾逗号不敏感
 *       跳过：嵌套结构（数组/对象值）、超长文案（>60 字符，易被换行转义差异干扰）。
 *
 * 用法：
 *   node tools/verify-content.js <基线.html> [项目根目录=仓库根] [--report 输出.txt]
 *
 * 输出：控制台摘要 + 失败明细文件；退出码 0=零差异，1=有差异。
 * 说明：这是"真接线"回迁数据的回归工具——(离线包/旧版) 的每个数据字段
 *       都必须在数据层或 bundle 原样存在，防止重构搬运时改坏内容。
 */
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (!args.length || args[0] === '-h' || args[0] === '--help') {
  console.log('用法: node tools/verify-content.js <基线.html> [项目根] [--report 文件]');
  process.exit(2);
}
const BASE = args[0];
const ROOT = args[1] && !args[1].startsWith('--') ? args[1] : path.join(__dirname, '..');
const repIdx = args.indexOf('--report');
const REP = repIdx > -1 ? args[repIdx + 1] : path.join(ROOT, 'verify-content-report.txt');

function bracePairs(text) {
  const pairs = []; const stack = []; let inStr = null, esc = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '{') stack.push(i);
    else if (c === '}') { const s = stack.pop(); if (s !== undefined) pairs.push([s, i]); }
  }
  return pairs;
}
function idObjects(text) {
  const pairs = bracePairs(text);
  pairs.sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
  const rx = /(?:"|')?\bid(?:"|')?\s*:\s*["'`]([^"'`]{1,80})["'`]/g;
  const out = []; const seen = new Set(); let m;
  while ((m = rx.exec(text))) {
    let best = null;
    for (const [s, e] of pairs) { if (s <= m.index && e >= m.index + m[0].length) { best = [s, e]; break; } }
    if (!best) continue;
    const key = best[0] + ':' + best[1]; if (seen.has(key)) continue; seen.add(key);
    if (best[1] - best[0] > 40000) continue;
    out.push({ id: m[1], body: text.slice(best[0], best[1] + 1) });
  }
  return out;
}
function scalars(body) {
  const list = [];
  let depth = 0, inStr = null, esc = false, i = 1;
  const n = body.length - 1;
  while (i < n) {
    const c = body[i];
    if (inStr) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === inStr) inStr = null; i++; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = c; i++; continue; }
    if (c === '{' || c === '[' || c === '(') { depth++; i++; continue; }
    if (c === '}' || c === ']' || c === ')') { depth--; i++; continue; }
    if (depth !== 0) { i++; continue; }
    const km = /^(?:"([^"]+)"|'([^']+)'|([A-Za-z_$][\w$]*))\s*:/.exec(body.slice(i, i + 130));
    if (!km) { i++; continue; }
    const key = km[1] || km[2] || km[3];
    let j = i + km[0].length, s2 = null, e2 = false, start = j, d2 = 0;
    while (j < n) {
      const v = body[j];
      if (s2) { if (e2) e2 = false; else if (v === '\\') e2 = true; else if (v === s2) s2 = null; j++; continue; }
      if (v === '"' || v === "'" || v === '`') { s2 = v; j++; continue; }
      if (v === '{' || v === '[' || v === '(') { d2++; j++; continue; }
      if (v === '}' || v === ']' || v === ')') { if (d2 === 0) break; d2--; j++; continue; }
      if (v === ',' && d2 === 0) break;
      j++;
    }
    let raw = body.slice(start, j).trim();
    if (d2 !== 0 || /^[{[]/.test(raw) || raw.length > 60) { i = j + 1; continue; }
    list.push({ key, raw });
    i = j + 1;
  }
  return list;
}
function normVal(raw) {
  let v = String(raw).trim();
  if (v === '!0') return 'true';
  if (v === '!1') return 'false';
  if (/^["'`]/.test(v)) v = v.slice(1);
  if (/["'`]$/.test(v)) v = v.slice(0, -1);
  return v.replace(/\s+/g, '');
}
// 归一目标文本：去空白、统一引号为双引号、!0/!1 → true/false
function canon(s) {
  return s
    .replace(/\s+/g, '')
    .replace(/['`]/g, '"')
    .replace(/:!0(?=[,}\]])/g, ':true')
    .replace(/:!1(?=[,}\]])/g, ':false');
}

const baseText = fs.readFileSync(BASE, 'utf8');
function walk(dir, acc) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== '.git' && e.name !== 'tools') walk(p, acc); }
    else if (e.name.endsWith('.js')) acc.push(p);
  }
  return acc;
}
const projFiles = walk(path.join(ROOT, 'js'), []);
const hay = canon(projFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n;\n'));

const objs = idObjects(baseText);
let objOk = 0, fieldTotal = 0, fieldMiss = 0;
const fails = [];
for (const o of objs) {
  const list = scalars(o.body);
  if (!list.length) continue;
  const miss = [];
  for (const pr of list) {
    fieldTotal++;
    const v = normVal(pr.raw);
    if (!v) continue;
    const k = pr.key;
    const variants = [
      k + ':' + v,
      '"' + k + '":' + v,
      k + ':"' + v + '"',
      '"' + k + '":"' + v + '"'
    ];
    let hit = false;
    for (const cand of variants) {
      const c1 = cand.replace(/['`]/g, '"').replace(/:!0(?=[,}\]"])/g, ':true').replace(/:!1(?=[,}\]"])/g, ':false');
      if (hay.includes(c1)) { hit = true; break; }
    }
    if (!hit) { miss.push(k + '=' + pr.raw.slice(0, 40)); fieldMiss++; }
  }
  if (miss.length === 0) objOk++;
  else fails.push({ id: o.id, miss, body: o.body.replace(/\s+/g, ' ').slice(0, 240) });
}

const lines = [];
lines.push('verify-content.js');
lines.push('baseline: ' + BASE);
lines.push('project : ' + ROOT + '  (js files: ' + projFiles.length + ')');
lines.push('');
lines.push('OBJECTS=' + objs.length + '  fully-matched=' + objOk + '  with-missing-field=' + fails.length);
lines.push('FIELDS  checked=' + fieldTotal + '  missing=' + fieldMiss +
  '  (' + (fieldTotal ? (100 * (fieldTotal - fieldMiss) / fieldTotal).toFixed(2) : '100.00') + '% present)');
lines.push('');
if (fails.length) {
  lines.push('MISSING DETAIL:');
  for (const f of fails.slice(0, 200)) lines.push('  [' + f.id + '] ' + f.miss.join(' , '));
}
const text = lines.join('\n');
fs.writeFileSync(REP, text, 'utf8');
console.log(text);
console.log('\nreport -> ' + REP);
process.exit(fails.length ? 1 : 0);
