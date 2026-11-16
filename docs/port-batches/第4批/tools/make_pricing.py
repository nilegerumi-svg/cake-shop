#!/usr/bin/env python3
# 从 v53 / 仓库运行时 dump 重新生成 v53_pricing.js（可复现第四批数据源）
# 前置：第二包 tools/dump_both.py 得到 v53_dump.json（ge 表）与 repo_dump.json
import json
V = json.load(open('/tmp/v53_dump.json'))['item']
RG = json.load(open('/tmp/repo_dump.json'))['RECIPES_GAME']
patch = {}
for k, v in V.items():
    if k not in RG: continue
    o = RG[k]
    if 'baseCost' not in v or 'baseCost' not in o: continue
    if v['baseCost'] != o['baseCost']:
        patch[k] = v['baseCost']
body = json.dumps(patch, ensure_ascii=False, indent=2, sort_keys=True)
src = """// js/data/recipes/v53_pricing.js
// 【第四批移植 · v53 定价跟进】126 项 baseCost 增量补丁，由 js/data/index.js 应用。
// 只覆盖已存在配方的 baseCost 一个字段；删掉本文件与接线即可回滚。
(function () {
    'use strict';
    window.Cake = window.Cake || {};
    window.Cake.RECIPE_BASECOST_V53 = """ + body + """;
    console.log('💰 [Recipes/v53] 已装载', Object.keys(window.Cake.RECIPE_BASECOST_V53).length, '项定价跟进');
})();
"""
open('v53_pricing.js', 'w', encoding='utf-8', newline='\n').write(src)
print('生成 v53_pricing.js,', len(src), 'B,', len(patch), '项')
