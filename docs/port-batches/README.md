# 移植批次归档

这里是从早期增量交付包（`cake-shop-port-batch1~4.zip`）中整建制收进来的过程资料，**仅供追溯**。

## 与当前仓库的关系

四批移植的**代码成果已全部并入当前仓库**，本目录只保留当时的：

- `README-第X批.md`：当批的交付说明
- `manifest.json`：当批的文件清单与校验值
- `第X批移植清单.md`：逐文件改动明细
- `patch/`：接线片段、移植前原版备份
- `tools/`：当批使用的生成 / 校验脚本

换句话说：**删掉本目录不影响运行**，它只是把"怎么改的"留档。

## 四批做了什么

| 批次 | 内容 | 落地位置 |
|---|---|---|
| 第一批 | 修复原包缺失的 `index.html` 与 3 张样式表（`pc-hover` / `people` / `wall`），补 `js/host` 下 4 个宿主脚本（长档案、PC 输入、人物、墙面） | `index.html`、`css/`、`js/host/` |
| 第二批 | NPC 档案数据 `profiles_v53.js` 与索引，宿主桥接 `tm-bridges.js` | `js/data/characters/npcs/`、`js/host/tm-bridges.js` |
| 第三批 | 配方扩充 `v53_additions.js`，并入数据总索引 | `js/data/recipes/`、`js/data/index.js` |
| 第四批 | 定价表 `v53_pricing.js`，并入数据总索引 | `js/data/recipes/`、`js/data/index.js` |

## 另：拆包工具链

早期把 12 个 `app-0X.js` 拆成 12 文件夹 / 37 功能格，再逐句还原为源码的脚本（`split_bundle_dirs.py`、`apply_split.py`、`verify_split.py` 等）保存在开发环境 `/tmp` 下，未随包分发——它们的产物就是本仓库的 `js/src/`。
