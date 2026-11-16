# 第四批移植（增量包，非最终包）

## 这批做了什么
按你的「跟进」，把 v53 相对仓库的 **126 项 baseCost 涨价**同步过来。
做法沿用前三批范式：`js/data/recipes/v53_pricing.js` 只放一个价格映射，
由 `js/data/index.js` 在所有模块装载完毕后**原地覆盖** `RECIPES_GAME[id].baseCost`。
`merged_for_game.js`（仓库跑通的 247 道配方）一个字没改，删补丁即可完整回滚。

## 为什么确认「改了会生效」
bundle 顶层 `ge = window.Cake.RECIPES_GAME` 是引用赋值，三处 `.baseCost` 读取
（定价 / 随机事件售价 / 寿司摊结算）全走 `ge`；`app-01.js` 首行
`await window.__cakeDataReady` 保证 bundle 在数据层之后执行。
所以覆盖必须**原地改属性**，不能替换整表 —— 这点已写进接线注释。

## 怎么应用
`upload/` 按相对路径覆盖到仓库根目录。本批基于第三批（需先接好 v53_additions.js）。
`index.js` 若已有别的改动，用 `patch/接线片段.txt` 手工追加 2 处；
`patch/` 内另存「第三批完成态」原版供 diff 复核。

## 明确没纳入
- `scone` / `tiramisu` 是**整配方重构**（食材、类别、口味、保质期全改），
  不是调价，且与第三批的 `scone_cuisine` / `tiramisu_cuisine` 是不同 id，待你定夺。
- 熟客簿写入、长档案、397 个待下沉对象，仍未触碰。

## 验证
零 pageerror / 零 console.error；126 项 applied 126 / bad 0 / miss 0；
抽样新价逐项比对 ✓；其它字段零污染；第三批成果无回归；2 文件语法校验通过。
`tools/` 内有可复现的生成与验证脚本。详见 `upload/docs/第四批移植清单.md`。
