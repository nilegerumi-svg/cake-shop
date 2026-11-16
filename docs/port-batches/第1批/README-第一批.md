# 第一批移植（增量包，非最终包）

## 这批做了什么
把 v53 新增、仓库缺独立文件的 7 个只读手写块，按仓库既有层级落成独立文件，并在 index.html 接线。
- 落点全在现成的 css/ 与 js/host/，**没有新造目录**
- 正文逐字取自 v53，7/7 一致；4 个脚本 node --check 通过
- 本地离线浏览器验证：#root 挂载、pageerror 0、三个面板可点开、无障碍标签可读

## 怎么应用
把 upload/ 里的文件按相对路径覆盖到仓库根目录即可。
若 index.html 已有别的改动，不要整体覆盖，改用 patch/index.html.接线7行.txt 手工追加 7 行。
patch/ 里另存了移植前原版 index.html 供比对。

## 明确没动
12 个分片、加载器、js/data/ 全部、css/pc-layout.css（仓库 1080px PC 增强，v53 是 520px 手机版，不同分支）、
.gitattributes、README、pages、既有 9 个已一致的手写块。

## 已知遗留（后续批次）
人物志能开但显示「共 0 人」——仓库 bundle 缺 __TM_NPC__ / __TM_ITEM_MAP__ / __TM_AFF_GET__ 三个数据桥。
文案墙、熟客簿数据自足可用。心理系统、夜市逻辑仓库 bundle 已含，无需重搬。
v53 主程序包内部的手写注入与 397 个待下沉数据对象，属于 bundle / 数据层，留待后续。

详见 upload/docs/第一批移植清单.md；tools/ 内为可复现脚本。
