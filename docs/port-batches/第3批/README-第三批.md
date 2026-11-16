# 第三批移植（增量包，非最终包）

## 这批做了什么
把第二批临时挂在桥里的 8 个配方名，换成 v53 的 8 道**完整配方**，
正式下沉到 `js/data/recipes/v53_additions.js`，由 `js/data/index.js` 汇总时并入主表。
桥（`js/host/tm-bridges.js`）删掉硬编码，退回纯投影。
落点全在现成格子，不新造目录，12 分片与加载器一个没动。

**只新增、不覆盖**：`merged_for_game.js` 及全部既有配方原样保留。
验证 247→255 道，`banana_bread=70` / `honey_bread=65` 未被 v53 调价污染。

## 怎么应用
`upload/` 按相对路径覆盖到仓库根目录。两个改动文件（`js/data/index.js`、
`js/host/tm-bridges.js`）若已有别的改动，用 `patch/接线片段.txt` 手工追加 4 处；
`patch/` 内另存两份「移植前原版」供 diff 复核。

## 两个明确「没做」，都有实测依据
1. **熟客簿写入**：`readState()` 每次返回新对象，面板改的是临时副本，
   实测点击「登记 ¥5」后存档 `coins/regulars` 完全不变；且仓库 bundle 里
   `regulars` 0 处，主程序没有熟客系统。要完整复现必须动 bundle，本批不做假闭环。
2. **126 项 baseCost 调价**：v53 是静态逐项调价（1.0x~2.0x），
   大面积覆盖会动到经济平衡，待你确认口径后单独开批。

详见 `upload/docs/第三批移植清单.md`；`tools/` 为可复现的生成与验证脚本。
