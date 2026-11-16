#!/usr/bin/env python3
# 从 v53 运行时 dump 重新生成 v53_additions.js（可复现第三批数据源）
# 前置：先跑第二包 tools/dump_both.py 得到 v53_dump.json（含框架区物品表 ge）
import json
v = json.load(open('/tmp/v53_dump.json'))['item']
ids = ['cashew_cake','peanut_cookie','almond_cookie','macaron',
       'walnut_bread','pistachio_icecream','scone_cuisine','tiramisu_cuisine']
add = {k: v[k] for k in ids}
body = json.dumps(add, ensure_ascii=False, indent=2)
src = """// js/data/recipes/v53_additions.js
// 【第三批移植 · v53 新增配方】
// 来源：甜蜜物语-离线版-v53.html 框架区物品对照表 ge（window.__TM_ITEM_MAP__ 的源）。
// 仓库 RECIPES_GAME（merged_for_game.js）中这 8 道完全缺失，v53 带完整配方数据。
// 本文件只挂一个独立键 RECIPES_GAME_V53，由 js/data/index.js 在所有模块装载
// 完毕后统一并入 RECIPES_GAME；并行加载不保证顺序，故不在此处直接 assign。
// 接线原则与仓库一致：数据放 js/data/，bundle 直读 window.Cake，不设适配层。
// 只新增、绝不覆盖任何既有配方。
(function () {
    'use strict';
    window.Cake = window.Cake || {};

    window.Cake.RECIPES_GAME_V53 = """ + body + """;

    console.log('📖 [Recipes/v53] 已装载', Object.keys(window.Cake.RECIPES_GAME_V53).length, '道新增配方');
})();
"""
open('v53_additions.js', 'w', encoding='utf-8', newline='\n').write(src)
print('生成 v53_additions.js,', len(src), 'B,', len(ids), '道配方')
