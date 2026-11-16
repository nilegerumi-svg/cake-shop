const HOME_STORE_TABS = [
  { id: "store", label: "店面", icon: "storefront", hint: "开店营业 · 员工 · 谈心 · 座机" },
  { id: "charm", label: "魅力货架", icon: "star", hint: "店铺魅力 · 货架 · 待上架成品" },
  { id: "furniture", label: "装修家具", icon: "chair", hint: "店内家具 · 摆放互动" },
];

function StoreSubTabs({ current: e, onChange: n }) {
  return jsxRuntime.jsx("div", {
    className: "grid grid-cols-3 gap-1.5",
    "data-testid": "home-1f-store-tabs",
    children: HOME_STORE_TABS.map((s) =>
      jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          "data-testid": `home-1f-store-tab-${s.id}`,
          "aria-pressed": e === s.id,
          "aria-label": `${s.label}，${s.hint}`,
          onClick: () => {
            (e !== s.id && speak(`已切换到${s.label}，${s.hint}`), n(s.id));
          },
          className: `rounded-xl border-2 px-1 py-1.5 text-center transition-colors ${e === s.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
          children: [
            jsxRuntime.jsx("span", {
              className: "material-icons align-middle",
              style: { fontSize: 15 },
              "aria-hidden": "true",
              children: s.icon,
            }),
            jsxRuntime.jsx("span", {
              className: "ml-0.5 text-[11px] font-black leading-tight",
              children: s.label,
            }),
          ],
        },
        s.id,
      ),
    ),
  });
}

function StoreFrontPanel({ state: e, commit: n, onGoTab: s, interactBlock: a }) {
  const [o, l] = React.useState("store"),
    {
      showLog: c,
      setShowLog: u,
      lastLog: f,
      openSecs: g,
      toggleSec: x,
      handleOpen: m,
      handleStock: p,
      handleInteract: y,
      handleUpgrade: j,
    } = useShopPanelState(e, n),
    v = getSellableProducts(e),
    w = getCuisineProducts(e).length,
    N = getPlacedFurnitureKinds(e),
    S = countSeatingKinds(e),
    C = calcCharmBonus(calcCharm(e));
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx(StoreSubTabs, { current: o, onChange: l }),
        jsxRuntime.jsxs("div", {
          className: o === "store" ? "space-y-4" : "hidden space-y-4",
          children: [
            jsxRuntime.jsx(ShopOpenPanel, {
              state: e,
              personalBonus: C,
              dineSeats: S,
              open: g.open,
              onToggle: () => x("open"),
              onOpen: m,
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-home-go-town",
              "aria-label": "出门去小镇，离开店铺",
              onClick: () => {
                (speak("离开店铺，前往小镇"), s("town"));
              },
              className: "btn-chunky btn-green w-full",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }), " 出门去小镇"],
            }),
            jsxRuntime.jsx(EmployeePanel, { state: e, open: g.staff, onToggle: () => x("staff") }),
            jsxRuntime.jsx(ShopSkillPanel, {
              state: e,
              talkOpen: g.talk,
              onTalkToggle: () => x("talk"),
              tasteOpen: g.taste,
              onTasteToggle: () => x("taste"),
            }),
            jsxRuntime.jsx(DeliveryOrdersPanel, { state: e, commit: n }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: o === "charm" ? "space-y-4" : "hidden space-y-4",
          children: [
            jsxRuntime.jsx(ShopCharmPanel, { state: e, open: g.charm, onToggle: () => x("charm") }),
            jsxRuntime.jsx(ShelfPanel, {
              state: e,
              capacity: shelfCapacity(e),
              open: g.shelf,
              onToggle: () => x("shelf"),
              onUnstock: (V) => n(removeFromShelf(e, V), "已下架", "info"),
              onSetMult: (V, E) => n(setShelfMultiplier(e, V, E), "", "info"),
            }),
            jsxRuntime.jsx(PendingShelfPanel, {
              state: e,
              stockable: v,
              cuisineCount: w,
              open: g.stock,
              onToggle: () => x("stock"),
              onStock: p,
            }),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: o === "furniture" ? "" : "hidden",
          children: jsxRuntime.jsx(ShopUpgradePanel, {
            state: e,
            placedFurniture: N,
            open: g.furniture,
            onToggle: () => x("furniture"),
            onInteract: y,
            onUpgrade: j,
            interactBlock: a,
          }),
        }),
        jsxRuntime.jsx(BusinessLogDialog, { open: c, log: f, onClose: () => u(!1) }),
      ],
    }),
  );
}

function ProductCard({ product: e, state: n, gain: s, onEat: a }) {
  const o = RECIPE_RUNTIME_DATA[e.recipeId];
  if (!o) return null;
  const l = e.quality === "fail";
  return jsxRuntime.jsxs("div", {
    className: "flex flex-col rounded-xl bg-white/85 p-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-xl", children: o.emoji }),
          jsxRuntime.jsxs("span", {
            className: "num text-sm font-black text-[#c2410c]",
            children: ["x", e.qty ?? 1],
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-0.5 truncate text-xs font-black text-[#431407]",
        children: o.name,
      }),
      jsxRuntime.jsxs("p", {
        className: `text-[9px] font-bold ${l ? "text-[#dc2626]" : "text-[#9a3412]"}`,
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: QUALITY_META[e.quality].emoji }),
          " ",
          QUALITY_META[e.quality].label,
          " · 饱食度 +",
          s,
          l && " · 吃了会闹肚子！",
        ],
      }),
      jsxRuntime.jsx("button", {
        type: "button",
        "data-testid": `btn-eat-${e.pid}`,
        onClick: () => a(e.pid),
        disabled: (n.satiety ?? 70) >= MAX_SATIETY,
        className: "btn-chunky btn-xs btn-orange mt-1 w-full",
        children: "吃 1 个",
      }),
    ],
  });
}

function calcProductEatValue(e, n) {
  const s = e.products.find((c) => c.pid === n);
  if (!s) return 0;
  const a = RECIPE_RUNTIME_DATA[s.recipeId],
    o = a ? (a.size === "large" ? 55 : a.size === "medium" ? 40 : 25) : 25;
  if (s.quality === "fail") return 12;
  const l = s.quality === "perfect" ? 1.5 : s.quality === "good" ? 1.2 : 1;
  return Math.round(o * l);
}

function KitchenDiningSection({ state: e, commit: n, open: s, onToggle: a }) {
  const o = satietyTier(e.satiety ?? 70);
  return jsxRuntime.jsxs("section", {
    className: "game-card border-[#fdba74]/40",
    style: { background: "linear-gradient(135deg,#fff7ed,#ffedd5)" },
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: s,
        onToggle: a,
        title: "🍚 厨房 · 吃饭",
        tone: "#c2410c",
        right: jsxRuntime.jsx("span", { className: "emoji text-3xl", children: "🥘" }),
      }),
      s &&
        jsxRuntime.jsxs("div", {
          className: "mt-1",
          children: [
            jsxRuntime.jsx("p", {
              className: "text-xs font-bold text-[#9a3412]",
              children:
                "饱食度每小时 -2；饿到归 0 会掉体力（精力）、心情和健康，吃饱才有力气开店！",
            }),
            jsxRuntime.jsxs("div", {
              className: "mt-2 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2",
              children: [
                jsxRuntime.jsx("span", { className: "emoji text-xl", children: o.emoji }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-xs font-black text-[#c2410c]",
                      children: [o.label, " ", e.satiety ?? 70, "/", MAX_SATIETY],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "bar-track mt-1",
                      role: "progressbar",
                      "aria-valuemin": 0,
                      "aria-valuemax": 100,
                      "aria-valuenow": Math.round(((e.satiety ?? 70) / MAX_SATIETY) * 100),
                      "aria-label": `${o.label} ${e.satiety ?? 70}/${MAX_SATIETY}`,
                      children: jsxRuntime.jsx("div", {
                        className: "bar-fill",
                        style: {
                          width: `${Math.round(((e.satiety ?? 70) / MAX_SATIETY) * 100)}%`,
                          background: `linear-gradient(90deg,#fed7aa,${o.color})`,
                        },
                      }),
                    }),
                  ],
                }),
              ],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-eat-simple",
              onClick: () => {
                const l = cookSimpleMeal(e);
                n(l.state, l.message, l.ok ? "success" : "error");
              },
              disabled: (e.satiety ?? 70) >= MAX_SATIETY,
              className: "btn-chunky btn-sm btn-orange mt-2 w-full",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🍳" }),
                " 简单用餐：米饭 + 煎蛋 + 小葱（耗 米1 蛋1 葱1 油1 · 饱食度 +40，精力 +10，1 小时）",
              ],
            }),
            e.products.length > 0 &&
              jsxRuntime.jsxs("div", {
                className: "mt-2",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "mb-1.5 text-xs font-black text-[#9a3412]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🥡" }),
                      " 吃成品（料理和点心都能吃，品质越好恢复越多）",
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "grid max-h-56 grid-cols-2 gap-1.5 overflow-y-auto pr-0.5",
                    children: e.products.map((l) =>
                      jsxRuntime.jsx(
                        ProductCard,
                        {
                          product: l,
                          state: e,
                          gain: calcProductEatValue(e, l.pid),
                          onEat: (c) => {
                            const u = eatProduct(e, c);
                            n(u.state, u.message, u.ok ? "success" : "error");
                          },
                        },
                        l.pid,
                      ),
                    ),
                  }),
                ],
              }),
          ],
        }),
    ],
  });
}

function ChefHintLine({ state: e }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("p", {
      className:
        "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#6b4226]",
      children: [
        jsxRuntime.jsx("span", { className: "emoji", children: "👨‍🍳" }),
        " 烹饪熟练度 ",
        jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: e.cookSkill ?? 0 }),
        "/100：每次制作 +1，熟练度越高研发新食谱越不容易失败受伤。",
        jsxRuntime.jsx("br", {}),
        jsxRuntime.jsx("span", { className: "emoji", children: "🍚" }),
        " 饱食度 ",
        jsxRuntime.jsx("span", { className: "num text-[#e65100]", children: e.satiety ?? 70 }),
        "/100：每小时 -2，饿着肚子干活会掉精力、心情和健康，记得回家吃饭。",
      ],
    }),
  );
}

function IngredientFreshnessSection({ state: e, commit: n, open: s, onToggle: a }) {
  const o = Object.values(e.ingredients).some((c) => c.freshness === 3),
    l = () => {
      const { state: c, removed: u } = countFreshIngredients(e);
      n(c, u > 0 ? `清理了 ${u} 种腐烂食材` : "没有腐烂食材需要清理", u > 0 ? "success" : "info");
    };
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: s,
        onToggle: a,
        title: "🧺 食材库存",
        right: o
          ? jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "btn-clean-rotten",
              onClick: l,
              className: "btn-chunky btn-xs btn-red",
              children: "清理腐烂",
            })
          : void 0,
      }),
      s &&
        (Object.keys(e.ingredients).length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-3 text-center text-sm text-[#b08a6a]",
              children: "食材空空如也，去采购或小镇逛逛吧",
            })
          : jsxRuntime.jsx(CollapsibleSection, {
              title: "🧺 食材清单",
              summary: `共 ${Object.keys(e.ingredients).length} 种食材`,
              count: Object.keys(e.ingredients).length,
              testId: "sub-collapse-inventory",
              tone: "#6b4226",
              children: jsxRuntime.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: Object.entries(e.ingredients).map(([c, u]) => {
                  const f = INGREDIENT_MAP[c];
                  if (!f) return null;
                  const g = FRESHNESS_LABELS[u.freshness];
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji text-xl", children: f.emoji }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "truncate text-sm font-bold text-[#4a2c17]",
                              children: [
                                f.name,
                                " ",
                                jsxRuntime.jsxs("span", {
                                  className: "num text-[#b08a6a]",
                                  children: ["x", u.qty],
                                }),
                              ],
                            }),
                            jsxRuntime.jsxs("span", {
                              className: `inline-block rounded-full px-1.5 py-px text-[10px] font-bold ${`fresh-${u.freshness}`}`,
                              children: [
                                g.emoji
                                  ? jsxRuntime.jsxs("span", { className: "emoji", children: [g.emoji, " "] })
                                  : "",
                                g.label,
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    c,
                  );
                }),
              }),
            })),
    ],
  });
}

function KitchenwareSection({ state: e, open: n, onToggle: s }) {
  return jsxRuntime.jsxs("section", {
    className: "game-card border-[#f8bbd0]/40",
    style: { background: "linear-gradient(135deg,#ffe9ef,#fff0f3)" },
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: n,
        onToggle: s,
        title: "🍳 厨具",
        tone: "#e04a63",
        right: jsxRuntime.jsx("span", {
          className: "text-[10px] font-bold text-[#e04a63]",
          children: "去「商店街 · 综合超市」购买新厨具",
        }),
      }),
      n &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx("p", {
              className: "mt-0.5 text-[11px] font-bold leading-relaxed text-[#6b4226]",
              children:
                "部分料理需要对应厨具才能制作；部分料理要持有指定厨具才能达成完美品质。用得越多熟练度越高，每 33 点提升一档品质加成。",
            }),
            jsxRuntime.jsx(CollapsibleSection, {
              title: "🍳 厨具一览",
              summary: `共 ${COOKWARES.length} 件厨具`,
              count: COOKWARES.length,
              testId: "sub-collapse-cookware",
              tone: "#e04a63",
              children: jsxRuntime.jsx("div", {
                className: "mt-2 grid grid-cols-2 gap-1.5",
                children: COOKWARES.map((a) => {
                  var c;
                  const o = e.cookwares.includes(a.id),
                    l = ((c = e.cookwareSkill) == null ? void 0 : c[a.id]) ?? 0;
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-2 rounded-xl bg-white/80 p-2 ${o ? "" : "opacity-60"}`,
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji text-xl", children: a.emoji }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "truncate text-xs font-black text-[#4a2c17]",
                              children: [a.name, " ", o ? "✓" : "未拥有"],
                            }),
                            o
                              ? jsxRuntime.jsxs("div", {
                                  className: "mt-0.5 flex items-center gap-1",
                                  children: [
                                    jsxRuntime.jsx("div", {
                                      className: "bar-track flex-1",
                                      style: { height: 5 },
                                      role: "progressbar",
                                      "aria-valuemin": 0,
                                      "aria-valuemax": 100,
                                      "aria-valuenow": l,
                                      "aria-label": `${a.name}熟练度 ${l}/100`,
                                      children: jsxRuntime.jsx("div", {
                                        className: "bar-fill",
                                        style: {
                                          width: `${l}%`,
                                          background: "linear-gradient(90deg,#f8bbd0,#ec407a)",
                                        },
                                      }),
                                    }),
                                    jsxRuntime.jsx("span", {
                                      className: "num text-[9px] font-bold text-[#e04a63]",
                                      children: l,
                                    }),
                                  ],
                                })
                              : jsxRuntime.jsx("p", {
                                  className: "truncate text-[9px] font-bold text-[#8d6e63]",
                                  children: a.perfectFor,
                                }),
                          ],
                        }),
                      ],
                    },
                    a.id,
                  );
                }),
              }),
            }),
          ],
        }),
    ],
  });
}

const CBW_COLORS = [
  { id: "white", name: "白麦", price: 0 },
  { id: "wheat", name: "全麦", price: 4 },
  { id: "rye", name: "黑麦", price: 6 },
  { id: "bran", name: "麸皮褐麦", price: 3 },
];

const CBW_KINDS = [
  { id: "staple", name: "主食", price: 4, sugar: 2, butter: 1, desc: "高油高糖，扎实管饱" },
  { id: "fancy", name: "花色", price: 6, sugar: 1, butter: 0, desc: "馅料选择更多" },
  {
    id: "cooked",
    name: "调理",
    price: 12,
    sugar: 1,
    butter: 0,
    needBread: !0,
    desc: "用 1 份现成面包做底",
  },
  {
    id: "shortening",
    name: "酥油",
    price: 10,
    sugar: 1,
    butter: 2,
    desc: "高油难做，烘焙熟练度越高越稳",
  },
];

const CBW_STYLES = [
  { id: "soft", name: "软面包", price: 0 },
  { id: "hard", name: "硬面包", price: 2 },
  { id: "softskin", name: "松皮面包", price: 5 },
  { id: "crispy", name: "脆皮面包", price: 8 },
];

const CBW_SIZES = [
  { id: "bun", name: "小餐包", price: 0, flour: 2 },
  { id: "snack", name: "点心面包", price: 8, flour: 2 },
  { id: "fast", name: "快餐面包", price: 15, flour: 3 },
];

const CBW_FILLS = [
  { id: "none", name: "不加馅", price: 0, ings: null },
  { id: "strawberry_jam", name: "草莓酱", price: 10, ings: { strawberry_jam: 1 } },
  { id: "peach_jam", name: "蜜桃酱", price: 10, ings: { peach_jam: 1 } },
  { id: "blueberry_jam", name: "蓝莓酱", price: 11, ings: { blueberry_jam: 1 } },
  { id: "rose_jam", name: "玫瑰酱", price: 12, ings: { rose_jam: 1 } },
  { id: "fish_paste", name: "鱼酱", price: 12, ings: { fish_paste: 1 } },
  { id: "shrimp_paste", name: "虾酱", price: 13, ings: { shrimp_paste: 1 } },
  { id: "sweet_bean_paste", name: "甜面酱", price: 8, ings: { sweet_bean_paste: 1 } },
  { id: "ketchup", name: "番茄酱", price: 8, ings: { ketchup: 1 } },
  { id: "meat", name: "鲜肉", price: 12, ings: { meat: 1 } },
];

const CBW_CREAMS = [
  { id: "none", name: "不加奶油", price: 0, ings: null },
  { id: "cream", name: "淡奶油", price: 8, ings: { cream: 1 } },
];

const CBW_BREADIDS = ["toast", "honey_bread", "banana_bread", "honey_roll", "banh_mi", "churros"];

function CBW_cfg(e, sel) {
  const color = CBW_COLORS.find((c) => c.id === sel.color),
    kind = CBW_KINDS.find((c) => c.id === sel.kind),
    style = CBW_STYLES.find((c) => c.id === sel.style),
    size = CBW_SIZES.find((c) => c.id === sel.size),
    fill = CBW_FILLS.find((c) => c.id === sel.fill),
    cream = CBW_CREAMS.find((c) => c.id === sel.cream);
  const ings = { flour: size.flour };
  if (kind.sugar) ings.sugar = (ings.sugar ?? 0) + kind.sugar;
  if (kind.butter) ings.butter = (ings.butter ?? 0) + kind.butter;
  if (fill && fill.ings)
    for (const [k, v] of Object.entries(fill.ings)) ings[k] = (ings[k] ?? 0) + v;
  if (cream && cream.ings)
    for (const [k, v] of Object.entries(cream.ings)) ings[k] = (ings[k] ?? 0) + v;
  const price =
    12 +
    color.price +
    kind.price +
    style.price +
    size.price +
    (fill ? fill.price : 0) +
    (cream ? cream.price : 0);
  const name = `${color.name}${fill && fill.id !== "none" ? fill.name + "馅" : ""}${cream && cream.id !== "none" ? "奶油" : ""}${style.name}（${kind.name}·${size.name}）`;
  return { color, kind, style, size, fill, cream, ings, price, name };
}

function __tmBreadBake(e, sel) {
  const cfg = CBW_cfg(e, sel);
  const busy = checkTimeBlocked(e, TIME_COST.bakeMedium / 60);
  if (busy) return { state: e, ok: !1, message: busy };
  const hasBread = (p0) =>
    (p0.qty ?? 0) > 0 &&
    p0.quality !== "fail" &&
    (CBW_BREADIDS.includes(p0.recipeId) || (p0.customName ?? "").includes("面包"));
  if (cfg.kind.needBread && !e.products.some(hasBread))
    return {
      state: e,
      ok: !1,
      message: "调理面包要拿 1 份现成面包当底，先烤一个普通面包或自研一个吧",
    };
  for (const [k, v] of Object.entries(cfg.ings)) {
    const S = e.ingredients[k];
    if (!S || S.qty < v)
      return {
        state: e,
        ok: !1,
        message: `材料不够：${(INGREDIENT_MAP[k] == null ? void 0 : INGREDIENT_MAP[k].name) ?? k} 还差 ${v - ((S == null ? void 0 : S.qty) ?? 0)} 份`,
      };
    if (S.freshness === 3) return { state: e, ok: !1, message: "有食材已经腐烂，不能用了" };
  }
  const u = deepClone(e);
  advanceHours(u, TIME_COST.bakeMedium / 60);
  consumeSatiety(u, TIME_COST.bakeMedium / 60);
  decayMood(u, 12);
  u.energy = Math.max(0, u.energy - 12);
  for (const [k, v] of Object.entries(cfg.ings)) {
    const S = u.ingredients[k];
    S.qty -= v;
    S.qty <= 0 && delete u.ingredients[k];
  }
  if (cfg.kind.needBread) {
    const i0 = u.products.findIndex(hasBread);
    if (i0 >= 0) {
      const p0 = u.products[i0];
      p0.qty = (p0.qty ?? 1) - 1;
      p0.qty <= 0 && (u.products = u.products.filter((q0, i2) => i2 !== i0));
    }
  }
  const skill = u.bakeSkill ?? 0;
  const okp = cfg.kind.id === "shortening" ? Math.min(0.95, 0.5 + skill / 200) : 0.95;
  const fail = Math.random() > okp;
  const price = fail ? Math.max(1, Math.floor(cfg.price * 0.25)) : cfg.price;
  u.products.push({
    pid: `cbread_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
    recipeId: "toast",
    quality: fail ? "fail" : "good",
    remaining: 3,
    qty: 1,
    customName: (fail ? "烤失败的" : "") + cfg.name,
    customPrice: price,
  });
  u.bakeSkill = Math.min(100, skill + 2);
  u.hygiene = Math.max(0, (u.hygiene ?? 100) - 6);
  if (!fail) {
    const key = [sel.color, sel.kind, sel.style, sel.size, sel.fill, sel.cream].join("|");
    const CR = Array.isArray(u.customRecipes) ? u.customRecipes : [];
    const idx = CR.findIndex((r0) => r0.key === key);
    const entry = {
      key,
      sel: {
        color: sel.color,
        kind: sel.kind,
        style: sel.style,
        size: sel.size,
        fill: sel.fill,
        cream: sel.cream,
      },
      name: cfg.name,
      price: cfg.price,
      count: 1,
    };
    if (idx >= 0) {
      entry.count = (CR[idx].count ?? 1) + 1;
      CR.splice(idx, 1);
      CR.push(entry);
    } else if (CR.length < 12) {
      CR.push(entry);
    }
    u.customRecipes = CR.slice(-12);
  }
  return {
    state: u,
    ok: !0,
    message: fail
      ? `😅 「烤失败的${cfg.name}」出炉了…炉温没控好，只能当低价处理品（烘焙 +2）`
      : `🍞 「${cfg.name}」出炉了！定价 ¥${cfg.price}，已放进库存（烘焙 +2）`,
  };
}

function CBW({ state: e, commit: n }) {
  const [s, a] = React.useState(!0),
    [A0, A1] = React.useState(!1),
    [o, l] = React.useState(CBW_COLORS[0].id),
    [c, u] = React.useState(CBW_KINDS[0].id),
    [f, g] = React.useState(CBW_STYLES[0].id),
    [x, m] = React.useState(CBW_SIZES[0].id),
    [p, y] = React.useState(CBW_FILLS[0].id),
    [w, z] = React.useState(CBW_CREAMS[0].id);
  const sel = { color: o, kind: c, style: f, size: x, fill: p, cream: w },
    cfg = CBW_cfg(e, sel);
  const hasBread = (p0) =>
    (p0.qty ?? 0) > 0 &&
    p0.quality !== "fail" &&
    (CBW_BREADIDS.includes(p0.recipeId) || (p0.customName ?? "").includes("面包"));
  const groups = [
    { id: "color", name: "面粉颜色", emoji: "🌾", list: CBW_COLORS, val: o, set: l },
    { id: "kind", name: "类别", emoji: "🥖", list: CBW_KINDS, val: c, set: u },
    { id: "style", name: "口感", emoji: "🍞", list: CBW_STYLES, val: f, set: g },
    { id: "size", name: "尺寸", emoji: "📦", list: CBW_SIZES, val: x, set: m },
    { id: "fill", name: "馅料", emoji: "🍓", list: CBW_FILLS, val: p, set: y },
    { id: "cream", name: "奶油", emoji: "🍦", list: CBW_CREAMS, val: w, set: z },
  ];
  const ingOk = Object.entries(cfg.ings).every(
    ([k, v]) => ((e.ingredients[k] == null ? void 0 : e.ingredients[k].qty) ?? 0) >= v,
  );
  const breadOk = !cfg.kind.needBread || e.products.some(hasBread);
  const skill = e.bakeSkill ?? 0;
  const okp = cfg.kind.id === "shortening" ? Math.min(0.95, 0.5 + skill / 200) : 0.95;
  const V = () => {
    const E = __tmBreadBake(e, sel);
    n(E.state, E.message, E.ok ? "success" : "error");
  };
  const rowElems = groups.map((G) => {
    const opts = G.list.map((J) => {
      const H = J.id === G.val;
      return jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          "data-testid": `cbw-opt-${G.id}-${J.id}`,
          "aria-pressed": H,
          onClick: () => G.set(J.id),
          className: `btn-chunky btn-sm text-[10px]! ${H ? "btn-pink ring-2 ring-[#e04a63]" : "btn-ghost"}`,
          children: [J.name, jsxRuntime.jsxs("span", { className: "num", children: ["+¥", J.price] })],
        },
        J.id,
      );
    });
    return jsxRuntime.jsxs(
      "div",
      {
        children: [
          jsxRuntime.jsxs("p", {
            className: "mb-1 text-[11px] font-black text-[#4a2c17]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: G.emoji }),
              " ",
              G.name,
              G.id === "kind" && cfg.kind.desc
                ? jsxRuntime.jsx("span", {
                    className: "ml-1.5 text-[10px] font-bold text-[#b08a6a]",
                    children: cfg.kind.desc,
                  })
                : null,
            ],
          }),
          jsxRuntime.jsx("div", { className: "flex flex-wrap gap-1.5", children: opts }),
        ],
      },
      G.id,
    );
  });
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: "自研面包 · 自家研发",
      emoji: "🍞",
      sub: "面粉颜色→类别→口感→尺寸→馅料→奶油，全自由搭配；调理面包用现成面包做底（45 分钟 · 12 精力）",
      open: s,
      onToggle: () => a((E) => !E),
      testId: "home-sec-custom-bread",
      children: [
        jsxRuntime.jsx("div", { className: "space-y-2.5", children: rowElems }),
        (() => {
          const CR = Array.isArray(e.customRecipes) ? e.customRecipes : [],
            full = CR.length >= 12;
          return jsxRuntime.jsxs("div", {
            className: "mt-2 rounded-xl bg-[#fdf6ec] px-2.5 py-2",
            "data-testid": "cbw-my-recipes",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                className: "flex w-full items-center gap-1 text-left",
                onClick: () => A1((E0) => !E0),
                children: jsxRuntime.jsxs("p", {
                  className: "text-[11px] font-black text-[#4a2c17]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "📖" }),
                    " 我的配方（",
                    CR.length,
                    "/12）",
                    jsxRuntime.jsx("span", {
                      className: "ml-1 text-[10px] font-bold text-[#b08a6a]",
                      children: A0 ? "收起 ▴" : "展开 ▾",
                    }),
                  ],
                }),
              }),
              A0 &&
                jsxRuntime.jsx("div", {
                  className: "mt-1.5 space-y-1",
                  children:
                    CR.length === 0
                      ? jsxRuntime.jsx("p", {
                          className: "text-[10px] font-bold text-[#b08a6a]",
                          children:
                            "还没有收藏的自研配方——烤成功一次就会自动记下来，下次一键照着做",
                        })
                      : CR.map((r0, i0) => {
                          const valid = ["color", "kind", "style", "size", "fill", "cream"].every(
                            (g0) => {
                              const L = {
                                color: CBW_COLORS,
                                kind: CBW_KINDS,
                                style: CBW_STYLES,
                                size: CBW_SIZES,
                                fill: CBW_FILLS,
                                cream: CBW_CREAMS,
                              }[g0];
                              return (
                                L &&
                                L.some((J0) => J0.id === (r0.sel == null ? void 0 : r0.sel[g0]))
                              );
                            },
                          );
                          if (!valid) return null;
                          return jsxRuntime.jsxs(
                            "div",
                            {
                              className: "flex items-center gap-1",
                              children: [
                                jsxRuntime.jsx("button", {
                                  type: "button",
                                  "data-testid": `cbw-recipe-use-${i0}`,
                                  className:
                                    "btn-chunky btn-sm btn-ghost flex-1 text-left text-[10px]!",
                                  onClick: () => {
                                    l(r0.sel.color);
                                    u(r0.sel.kind);
                                    g(r0.sel.style);
                                    m(r0.sel.size);
                                    y(r0.sel.fill);
                                    z(r0.sel.cream);
                                  },
                                  children: [
                                    `${r0.name}`,
                                    ` ¥${r0.price}`,
                                    r0.count > 1 ? ` ×${r0.count}` : "",
                                  ].join(""),
                                }),
                                jsxRuntime.jsx("button", {
                                  type: "button",
                                  "data-testid": `cbw-recipe-del-${i0}`,
                                  className: "btn-chunky btn-sm btn-ghost text-[10px]!",
                                  "aria-label": `删除配方${r0.name}`,
                                  onClick: () => {
                                    const C0 = Array.isArray(e.customRecipes)
                                      ? e.customRecipes.filter((J0, K0) => K0 !== i0)
                                      : [];
                                    n(
                                      { ...e, customRecipes: C0 },
                                      "已删除配方「" + r0.name + "」",
                                      "info",
                                    );
                                  },
                                  children: "🗑",
                                }),
                              ],
                            },
                            `cr-${i0}`,
                          );
                        }),
                }),
              full
                ? null
                : jsxRuntime.jsx("p", {
                    className: "mt-1 text-[10px] font-bold text-[#b08a6a]",
                    children:
                      "烤成功一炉就会自动记成配方，最多收藏 12 个；展开后点一下就能照着重做",
                  }),
            ],
          });
        })(),
        jsxRuntime.jsxs("p", {
          className:
            "mt-2.5 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold text-[#b8860b]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "💰" }),
            " 预估售价 ¥",
            cfg.price,
            " · 成功率 ",
            Math.round(okp * 100),
            "%",
            cfg.kind.needBread ? " · 需现成面包×1（会消耗 1 份库存面包）" : null,
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2.5 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1 text-[11px] font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧺" }), " 食材检查"],
            }),
            jsxRuntime.jsx("div", {
              className: "flex flex-wrap gap-x-3 gap-y-1",
              children: Object.entries(cfg.ings).map(([k, v]) => {
                var R, se;
                const J = (e.ingredients[k] == null ? void 0 : e.ingredients[k].qty) ?? 0,
                  H = J < v;
                return jsxRuntime.jsxs(
                  "span",
                  {
                    "data-testid": `cbw-ing-${k}`,
                    className: `text-[11px] font-bold ${H ? "text-[#c62828]" : "text-[#4a2c17]"}`,
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "emoji",
                        children: (INGREDIENT_MAP[k] == null ? void 0 : INGREDIENT_MAP[k].emoji) ?? "🧺",
                      }),
                      " ",
                      (INGREDIENT_MAP[k] == null ? void 0 : INGREDIENT_MAP[k].name) ?? k,
                      " ",
                      jsxRuntime.jsxs("span", { className: "num", children: ["库存 ", J, "/", v] }),
                      H && " ⚠️",
                    ],
                  },
                  k,
                );
              }),
            }),
            cfg.kind.needBread
              ? jsxRuntime.jsx("p", {
                  className: `mt-1 text-[11px] font-bold ${breadOk ? "text-[#2e7d32]" : "text-[#c62828]"}`,
                  children: breadOk
                    ? "✅ 库存里有现成面包做底"
                    : "⚠️ 库存里没有现成面包，先烤一个普通面包或自研一个",
                })
              : null,
          ],
        }),
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-custom-bread-build",
          onClick: V,
          className: "btn-chunky btn-green mt-2.5 w-full text-[11px]!",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🍞" }),
            " 开烤（¥",
            cfg.price,
            "）",
          ],
        }),
      ],
    }),
  );
}

function AllergenFilterPanel({ state: e, commit: n }) {
  const [s, a] = React.useState(!0),
    [o, l] = React.useState(ALLERGEN_GROUPS[0].options[0].id),
    [c, u] = React.useState(ALLERGEN_GROUPS[1].options[0].id),
    [f, g] = React.useState(ALLERGEN_GROUPS[2].options[0].id),
    [x, m] = React.useState(ALLERGEN_GROUPS[3].options[0].id),
    [p, y] = React.useState("none"),
    j = { base: o, cream: c, fill: f, top: x },
    v = { base: l, cream: u, fill: g, top: m },
    w = {};
  for (const E of ALLERGEN_GROUPS) {
    const F = E.options.find((J) => J.id === j[E.id]);
    if (F) for (const [J, H] of Object.entries(F.ings)) w[J] = (w[J] ?? 0) + H;
  }
  const N = Object.entries(w),
    S = N.every(([E, F]) => {
      var J;
      return (((J = e.ingredients[E]) == null ? void 0 : J.qty) ?? 0) >= F;
    }),
    C = calcCustomCakePrice({ base: o, cream: c, fill: f, top: x }),
    V = () => {
      const E = bakeCustomCake(e, { base: o, cream: c, fill: f, top: x, allergy: p });
      n(E.state, E.message, E.ok ? "success" : "error");
    };
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: "定制蛋糕 · 接单制作",
      emoji: "🎂",
      sub: "按蛋糕胚→奶油→馅料→顶部装饰四层定制，接单前先问客人过敏原",
      open: s,
      onToggle: () => a((E) => !E),
      testId: "home-sec-custom-cake",
      children: [
        jsxRuntime.jsx("div", {
          className: "space-y-2.5",
          children: ALLERGEN_GROUPS.map((E) => {
            const F = j[E.id];
            return jsxRuntime.jsxs(
              "div",
              {
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "mb-1 text-[11px] font-black text-[#4a2c17]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: E.emoji }),
                      " ",
                      E.name,
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "flex flex-wrap gap-1.5",
                    children: E.options.map((J) => {
                      const H = J.id === F;
                      return jsxRuntime.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-testid": `cc-opt-${E.id}-${J.id}`,
                          "aria-pressed": H,
                          onClick: () => {
                            var R;
                            return (R = v[E.id]) == null ? void 0 : R.call(v, J.id);
                          },
                          className: `btn-chunky btn-sm text-[10px]! ${H ? "btn-pink ring-2 ring-[#e04a63]" : "btn-ghost"}`,
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: J.emoji }),
                            " ",
                            J.name,
                            jsxRuntime.jsxs("span", { className: "num", children: ["+¥", J.price] }),
                          ],
                        },
                        J.id,
                      );
                    }),
                  }),
                ],
              },
              E.id,
            );
          }),
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2.5 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1 text-[11px] font-black text-[#4a2c17]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🤧" }),
                " 客人对什么过敏？",
              ],
            }),
            jsxRuntime.jsx("div", {
              className: "flex flex-wrap gap-1.5",
              children: ALLERGEN_OPTIONS.map((E) => {
                const F = E.id === p;
                return jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-testid": `cc-allergy-${E.id}`,
                    "aria-pressed": F,
                    onClick: () => y(E.id),
                    className: `btn-chunky btn-sm text-[10px]! ${F ? "btn-pink ring-2 ring-[#e04a63]" : "btn-ghost"}`,
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: E.emoji }),
                      " ",
                      E.name,
                    ],
                  },
                  E.id,
                );
              }),
            }),
          ],
        }),
        jsxRuntime.jsxs("p", {
          className:
            "mt-2.5 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold text-[#b8860b]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "💰" }),
            " 预估售价 ",
            jsxRuntime.jsxs("span", { className: "num", children: ["¥", C] }),
            "（含 ¥",
            CUSTOM_CAKE_BASE_PRICE,
            " 基准价）",
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2.5 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1 text-[11px] font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧺" }), " 食材检查"],
            }),
            N.length === 0
              ? jsxRuntime.jsx("p", {
                  className: "py-1 text-[11px] font-bold text-[#b08a6a]",
                  children: "还没有选中任何选项",
                })
              : jsxRuntime.jsx("div", {
                  className: "flex flex-wrap gap-x-3 gap-y-1",
                  children: N.map(([E, F]) => {
                    var R, se, be;
                    const J = ((R = e.ingredients[E]) == null ? void 0 : R.qty) ?? 0,
                      H = J < F;
                    return jsxRuntime.jsxs(
                      "span",
                      {
                        "data-testid": `cc-ing-${E}`,
                        className: `text-[11px] font-bold ${H ? "text-[#c62828]" : "text-[#4a2c17]"}`,
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "emoji",
                            children: ((se = INGREDIENT_MAP[E]) == null ? void 0 : se.emoji) ?? "🧺",
                          }),
                          " ",
                          ((be = INGREDIENT_MAP[E]) == null ? void 0 : be.name) ?? E,
                          " ",
                          jsxRuntime.jsxs("span", { className: "num", children: ["库存 ", J, "/", F] }),
                          H && " ⚠️",
                        ],
                      },
                      E,
                    );
                  }),
                }),
            jsxRuntime.jsx("p", {
              className: `mt-1 text-[11px] font-black ${S ? "text-[#2e7d32]" : "text-[#c62828]"}`,
              children: S
                ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "✅" }),
                      " 食材齐备，可以接单",
                    ],
                  })
                : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "⚠️" }),
                      " 食材不足，先去采购或加工吧",
                    ],
                  }),
            }),
          ],
        }),
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-custom-cake-build",
          onClick: V,
          className: "btn-chunky btn-green mt-2.5 w-full text-[11px]!",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🎂" }),
            " 接单制作（¥",
            C,
            "）",
          ],
        }),
      ],
    }),
  );
}
