const PROCESSING_RECIPE_IDS = [
  "p_strawberry_jam",
  "p_peach_jam",
  "p_blueberry_jam",
  "p_rose_jam",
  "p_fish_paste",
  "p_shrimp_paste",
  "p_veg_juice",
  "p_pack_strawberry_jam",
  "p_pack_peach_jam",
  "p_pack_blueberry_jam",
  "p_pack_rose_jam",
  "p_pack_fish_paste",
  "p_pack_shrimp_paste",
  "p_grind_peanut_powder",
  "p_grind_walnut_powder",
  "p_grind_almond_powder",
  "p_grind_cashew_powder",
  "p_grind_pistachio_powder",
];

function ProcessingSection({ state: e, commit: n }) {
  const [s, a] = React.useState(!0),
    o = PROCESSING_RECIPE_IDS.map((c) => PROCESSING_RECIPES.find((u) => u.id === c)).filter((c) => !!c),
    l = (c) => {
      const u = processIngredient(e, c);
      n(u.state, u.message, u.ok ? "success" : "error");
    };
  return renderWithSpeech(
    jsxRuntime.jsx(SectionCard, {
      title: "加工台 · 熬酱榨汁 / 坚果磨粉",
      emoji: "🍲",
      sub: `熬酱榨汁 / 坚果磨粉：成品进食材袋供蛋糕定制，带罐的另装 1 罐可上架售卖（30 分钟 · 4 精力）· 空罐头 ×${e.home.jarQty ?? 0}`,
      open: s,
      onToggle: () => a((c) => !c),
      testId: "home-sec-process-station",
      children: jsxRuntime.jsx("div", {
        className: "space-y-2",
        children: o.map((c) => {
          var x;
          const u = getProcessingMethod(e, c.id),
            f = Object.entries(c.ings)
              .map(([m, p]) => {
                var y;
                return `${((y = INGREDIENT_MAP[m]) == null ? void 0 : y.name) ?? m}×${p}`;
              })
              .join(" + "),
            g = (c.ingsFish ?? 0) > 0 ? `${f ? " + " : ""}鲜鱼×${c.ingsFish}` : "";
          return jsxRuntime.jsx(
            "div",
            {
              className: "rounded-xl bg-[#fbf3e4] px-2.5 py-2",
              children: jsxRuntime.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji shrink-0 text-base", children: c.emoji }),
                  jsxRuntime.jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "text-[11px] font-black text-[#4a2c17]",
                        children: c.name,
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                        children: [
                          "消耗 ",
                          f || "—",
                          g,
                          " · 30 分钟 · 4 精力",
                          jsxRuntime.jsxs("span", {
                            className: "text-[#2e7d32]",
                            children: [
                              " → ",
                              ((x = INGREDIENT_MAP[c.out]) == null ? void 0 : x.name) ?? c.out,
                              c.jarRecipe ? "×1 + 装罐成品×1" : "×" + (c.outQty ?? 1),
                            ],
                          }),
                        ],
                      }),
                      !u.ok &&
                        jsxRuntime.jsx("p", {
                          className: "mt-0.5 text-[10px] font-bold text-[#c62828]",
                          children: u.reason,
                        }),
                    ],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": `btn-process-${c.id}`,
                    onClick: () => l(c.id),
                    disabled: !u.ok,
                    className: "btn-chunky btn-sm btn-green text-[10px]! shrink-0",
                    children: "加工",
                  }),
                ],
              }),
            },
            c.id,
          );
        }),
      }),
    }),
  );
}

function RecipeCard({ recipe: e, state: n, onBake: s }) {
  const a = validateBake(n, e.id),
    o = n.recipes[e.id] ?? 0,
    l = Math.min(5, Math.floor(o / 20)),
    c = BAKE_SIZE_OPTIONS[e.size],
    u = CAKE_THEME_MAP[e.taste],
    f = getRecipeCookware(e.id),
    g = COOKWARE_MAP[f],
    x = n.cookwares.includes(f),
    m = e.cookwarePerfect,
    p = m ? COOKWARE_MAP[m] : void 0,
    y = !m || n.cookwares.includes(m);
  return jsxRuntime.jsxs("div", {
    className: "flex flex-col rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-2.5",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-start justify-between gap-1",
        children: [
          jsxRuntime.jsxs("p", {
            className: "min-w-0 leading-tight",
            children: [
              jsxRuntime.jsx("span", { className: "emoji text-xl", children: e.emoji }),
              jsxRuntime.jsx("span", {
                className: "ml-1 text-sm font-black text-[#4a2c17]",
                children: e.name,
              }),
            ],
          }),
          jsxRuntime.jsxs("span", {
            className: "shrink-0 text-[10px] font-bold text-[#b08a6a]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }), e.bakeCost],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex justify-between text-[9px] font-bold text-[#b08a6a]",
            children: [
              jsxRuntime.jsxs("span", { children: ["熟练度 Lv.", l, "/5"] }),
              jsxRuntime.jsxs("span", { className: "num", children: [Math.min(100, o), "/100"] }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "bar-track mt-0.5",
            style: { height: 8 },
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": Math.min(100, o),
            "aria-label": `${e.name}熟练度 ${Math.min(100, o)}/100`,
            children: jsxRuntime.jsx("div", {
              className: "bar-fill",
              style: {
                width: `${Math.min(100, o)}%`,
                background: "linear-gradient(90deg,#ffb3c1,#ff6b81)",
              },
            }),
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1 flex flex-wrap gap-1",
        children: [
          jsxRuntime.jsxs("span", {
            className: "rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-bold text-[#b8860b]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: c.emoji }),
              " ",
              c.label,
              "×",
              c.yield,
            ],
          }),
          jsxRuntime.jsxs("span", {
            className: "rounded-full bg-[#ffe9ef] px-1.5 py-px text-[9px] font-bold text-[#e04a63]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: u.emoji }), " ", u.label],
          }),
          jsxRuntime.jsx("span", {
            className: "rounded-full bg-[#e3f2fd] px-1.5 py-px text-[9px] font-bold text-[#c62828]",
            children: RECIPE_CATEGORY_LABELS[e.category] ?? e.category,
          }),
          e.subcategory &&
            jsxRuntime.jsxs("span", {
              className:
                "rounded-full bg-[#ffe9e3] px-1.5 py-px text-[9px] font-bold text-[#e65100]",
              children: [
                (e.system ?? "bakery") === "cuisine" ? `${CUISINE_GROUP_LABELS[cuisineGroupOf(e.subcategory)]} · ` : "",
                CUISINE_LABELS[e.subcategory] ?? e.subcategory,
              ],
            }),
          jsxRuntime.jsxs("span", {
            className: `rounded-full px-1.5 py-px text-[9px] font-bold ${x ? "bg-[#ede7f6] text-[#c62828]" : "bg-[#ffebee] text-[#c62828]"}`,
            children: [
              jsxRuntime.jsx("span", {
                className: "emoji",
                children: (g == null ? void 0 : g.emoji) ?? "🍳",
              }),
              " 需",
              (g == null ? void 0 : g.name) ?? "对应厨具",
              x ? " ✓" : "",
            ],
          }),
          p &&
            jsxRuntime.jsxs("span", {
              className: `rounded-full px-1.5 py-px text-[9px] font-bold ${y ? "bg-[#fff3e0] text-[#e65100]" : "bg-[#ffebee] text-[#c62828]"}`,
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
                " 完美需",
                p.name,
                y ? " ✓" : "（未持有）",
              ],
            }),
        ],
      }),
      !a.ok &&
        a.reason &&
        jsxRuntime.jsxs("p", {
          className:
            "mt-1 rounded-lg bg-[#ffebee] px-1.5 py-1 text-[9px] font-bold leading-relaxed text-[#c62828]",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "⚠️" }), " ", a.reason],
        }),
      jsxRuntime.jsx("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#6b4226]",
        children: Object.entries(e.ings).map(([j, v]) => {
          var V, E;
          const w = INGREDIENT_MAP[j],
            N = ((V = n.ingredients[j]) == null ? void 0 : V.qty) ?? 0,
            S = ((E = n.ingredients[j]) == null ? void 0 : E.freshness) === 3,
            C = N >= v && !S;
          return jsxRuntime.jsxs(
            "span",
            {
              className: "text-[#c62828]",
              children: [
                jsxRuntime.jsx("span", {
                  className: "emoji",
                  children: (w == null ? void 0 : w.emoji) ?? "❓",
                }),
                (w == null ? void 0 : w.name) ?? j,
                " ",
                N,
                "/",
                v,
              ],
            },
            j,
          );
        }),
      }),
      jsxRuntime.jsx("button", {
        type: "button",
        "data-testid": `btn-bake-${e.id}`,
        onClick: () => s(e.id),
        disabled: !a.ok,
        className: "btn-chunky btn-sm btn-pink mt-1.5 w-full",
        children: (e.system ?? "bakery") === "cuisine" ? "烹饪" : "烘焙",
      }),
    ],
  });
}

function BakeHintBox({
  sysChips: e,
  catChips: n,
  groupChips: s,
  subChips: a,
  sizeChips: o,
  shownUnlocked: l,
}) {
  return jsxRuntime.jsxs("div", {
    className: "mb-2 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 text-xs font-black text-[#4a2c17]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🎛️" }),
          " 筛选（烘焙甜品 / 家常料理）",
        ],
      }),
      e,
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗂️" }), " 大类分类"],
      }),
      n,
      l.some((c) => (c.system ?? "bakery") === "cuisine") &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🥢" }), " 中餐 / 外国菜"],
            }),
            s,
            jsxRuntime.jsxs("p", {
              className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🍽️" }), " 菜系子分类"],
            }),
            a,
          ],
        }),
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "📏" }), " 尺寸分类"],
      }),
      o,
    ],
  });
}

function BakingRecipeList({
  state: e,
  commit: n,
  open: s,
  onToggle: a,
  sysTitle: o,
  sysChips: l,
  catChips: c,
  groupChips: u,
  subChips: f,
  sizeChips: g,
  shownUnlocked: x,
}) {
  const m = (p) => {
    const y = bakeRecipe(e, p);
    if (!y.ok) {
      n(y.state, y.message, "error");
      return;
    }
    n(y.state, y.message, "success");
  };
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: s,
        onToggle: a,
        title: `🍳 制作工坊${o}`,
        right: jsxRuntime.jsx("span", {
          className: "text-[10px] font-bold text-[#b08a6a]",
          children: "小份产量多 · 大份量少价高",
        }),
      }),
      s &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx(BakeHintBox, {
              sysChips: l,
              catChips: c,
              groupChips: u,
              subChips: f,
              sizeChips: g,
              shownUnlocked: x,
            }),
            x.length === 0
              ? jsxRuntime.jsx("p", {
                  className: "py-3 text-center text-sm text-[#b08a6a]",
                  children: "该分类下还没有已研发的配方",
                })
              : jsxRuntime.jsx("div", {
                  className: "grid grid-cols-2 gap-2",
                  children: x.map((p) => jsxRuntime.jsx(RecipeCard, { recipe: p, state: e, onBake: m }, p.id)),
                }),
          ],
        }),
    ],
  });
}

function ResearchRecipeCard({ recipe: e, state: n, onUnlock: s }) {
  const a = checkRecipeResearchable(n, e.id),
    o = Math.round(calcCookingBonus(n) * 100);
  return jsxRuntime.jsxs(
    "div",
    {
      className: "flex flex-col rounded-xl bg-[#f7e8d2] p-2.5",
      children: [
        jsxRuntime.jsx("p", {
          className: "text-xl",
          children: jsxRuntime.jsx("span", { className: "emoji", children: e.emoji }),
        }),
        jsxRuntime.jsx("p", {
          className: "mt-1 text-sm font-black leading-tight text-[#4a2c17]",
          children: e.name,
        }),
        e.subcategory &&
          jsxRuntime.jsxs("span", {
            className:
              "mt-0.5 inline-block w-fit rounded-full bg-[#ffe9e3] px-1.5 py-px text-[9px] font-bold text-[#e65100]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🥢" }),
              " ",
              (e.system ?? "bakery") === "cuisine" ? `${CUISINE_GROUP_LABELS[cuisineGroupOf(e.subcategory)]} · ` : "",
              CUISINE_LABELS[e.subcategory] ?? e.subcategory,
            ],
          }),
        jsxRuntime.jsx("p", {
          className: "mt-0.5 text-[10px] leading-relaxed text-[#b08a6a]",
          children: e.desc,
        }),
        e.needRecipes &&
          jsxRuntime.jsxs("p", {
            className: "mt-1 text-[9px] font-bold leading-relaxed text-[#e65100]",
            children: [
              "需先研：",
              e.needRecipes
                .map((l) => {
                  var c;
                  return ((c = RECIPE_RUNTIME_DATA[l]) == null ? void 0 : c.name) ?? l;
                })
                .join("、"),
            ],
          }),
        jsxRuntime.jsxs("p", {
          className: "mt-1 text-[9px] font-bold text-[#e65100]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🔬" }),
            " 成功率 ",
            o,
            "% · 失败受伤",
          ],
        }),
        jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": `btn-unlock-${e.id}`,
          "aria-label": `研发配方${e.name}${e.unlockCost > 0 ? `，需要 ${e.unlockCost} 金币` : "，免费研发"}${a.ok ? "" : `，${a.reason ?? "条件不满足"}`}`,
          onClick: () => s(e.id),
          disabled: !a.ok,
          className: "btn-chunky btn-xs btn-brown gold-text mt-1.5 w-full",
          children:
            e.unlockCost > 0
              ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", "aria-hidden": "true", children: "💰" }),
                    " ",
                    e.unlockCost,
                  ],
                })
              : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", "aria-hidden": "true", children: "✨" }),
                    " 免费研发",
                  ],
                }),
        }),
      ],
    },
    e.id,
  );
}

function ResearchRecipeList({
  state: e,
  commit: n,
  open: s,
  onToggle: a,
  rSysChips: o,
  rCatChips: l,
  rGroupChips: c,
  rSubChips: u,
  rSizeChips: f,
  rShownLocked: g,
}) {
  const x = (m) => {
    const p = researchRecipe(e, m);
    if (!p.ok) {
      n(p.state, p.message, "error");
      return;
    }
    n(p.state, p.message, p.success ? "success" : "error");
  };
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, { open: s, onToggle: a, title: "🔬 配方研发" }),
      s &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsxs("div", {
              className: "mb-2 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-2.5",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "mb-1.5 text-xs font-black text-[#4a2c17]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🎛️" }),
                    " 筛选（烘焙甜品 / 家常料理）",
                  ],
                }),
                o,
                jsxRuntime.jsxs("p", {
                  className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
                  children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗂️" }), " 大类分类"],
                }),
                l,
                g.some((m) => (m.system ?? "bakery") === "cuisine") &&
                  jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🥢" }),
                          " 中餐 / 外国菜",
                        ],
                      }),
                      c,
                      jsxRuntime.jsxs("p", {
                        className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🍽️" }),
                          " 菜系子分类",
                        ],
                      }),
                      u,
                    ],
                  }),
                jsxRuntime.jsxs("p", {
                  className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
                  children: [jsxRuntime.jsx("span", { className: "emoji", children: "📏" }), " 尺寸分类"],
                }),
                f,
              ],
            }),
            g.length === 0
              ? jsxRuntime.jsx("p", {
                  className:
                    "rounded-xl bg-[#fbf3e4] px-2.5 py-2 text-[11px] font-bold leading-relaxed text-[#b08a6a]",
                  children:
                    "当前没有可研发的配方：免费食谱（✨ 免费研发）开局即可直接研；进阶食谱需要在家阅读书籍解锁、攒够金币或研出前置配方后，会在这里出现。",
                })
              : jsxRuntime.jsx("div", {
                  className: "grid grid-cols-2 gap-2",
                  children: g.map((m) => jsxRuntime.jsx(ResearchRecipeCard, { recipe: m, state: e, onUnlock: x }, m.id)),
                }),
          ],
        }),
    ],
  });
}

function DiscardProductsSection({ state: e, commit: n, open: s, onToggle: a }) {
  const o = (l) => {
    n(getProductStock(e, l), "已丢弃", "info");
  };
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, { open: s, onToggle: a, title: "🎒 成品背包" }),
      s &&
        (e.products.length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-3 text-center text-sm text-[#b08a6a]",
              children: "还没有点心成品，先去小楼一楼厨房烘焙一炉吧",
            })
          : jsxRuntime.jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: e.products.map((l) => {
                const c = RECIPE_RUNTIME_DATA[l.recipeId],
                  u = QUALITY_META[l.quality],
                  f = c ? CAKE_THEME_MAP[c.taste] : null;
                return jsxRuntime.jsxs(
                  "div",
                  {
                    className: "flex flex-col rounded-xl bg-[#fbf3e4] p-2.5",
                    children: [
                      jsxRuntime.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "emoji text-2xl",
                            children: (c == null ? void 0 : c.emoji) ?? "🍰",
                          }),
                          jsxRuntime.jsxs("span", {
                            className: "num text-xl font-black text-[#e04a63]",
                            children: ["x", l.qty ?? 1],
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "mt-1 truncate text-sm font-bold text-[#4a2c17]",
                        children: [
                          (c == null ? void 0 : c.name) ?? "点心",
                          f &&
                            jsxRuntime.jsxs("span", {
                              className: "emoji ml-1 text-[10px] font-bold text-[#e04a63]",
                              children: [f.emoji, f.label],
                            }),
                        ],
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "mt-1 flex flex-wrap items-center gap-1",
                        children: [
                          jsxRuntime.jsxs("span", {
                            className: `badge ${`badge-${l.quality}`}`,
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: u.emoji }),
                              " ",
                              u.label,
                            ],
                          }),
                          jsxRuntime.jsxs("span", {
                            className: "text-[10px] font-bold text-[#b08a6a]",
                            children: ["保质 ", l.remaining, " 天"],
                          }),
                          ((c == null ? void 0 : c.system) ?? "bakery") === "cuisine" &&
                            jsxRuntime.jsxs("span", {
                              className:
                                "rounded-full bg-[#ffebee] px-1.5 py-px text-[10px] font-bold text-[#c62828]",
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "🍳" }),
                                " 料理 · 不能上架蛋糕店",
                              ],
                            }),
                        ],
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-discard-${l.pid}`,
                        onClick: () => o(l.pid),
                        className: "btn-chunky btn-xs btn-ghost mt-1.5 w-full",
                        children: "丢弃 1 个",
                      }),
                    ],
                  },
                  l.pid,
                );
              }),
            })),
    ],
  });
}

const CHIP_ACTIVE_CLS = "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]",
  CHIP_IDLE_CLS = "border-[#f0dcc0] bg-white text-[#6b4226]";

function FilterChipGroup({
  testIdPrefix: e,
  allLabel: n,
  options: s,
  selected: a,
  onToggle: o,
  onClear: l,
  activeCls: c = CHIP_ACTIVE_CLS,
}) {
  return jsxRuntime.jsxs("div", {
    className: "flex flex-wrap gap-1.5",
    children: [
      jsxRuntime.jsx("button", {
        type: "button",
        "data-testid": `${e}-all`,
        "aria-pressed": a.length === 0,
        onClick: l,
        className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${a.length === 0 ? c : CHIP_IDLE_CLS}`,
        children: n,
      }),
      s.map((u) =>
        jsxRuntime.jsxs(
          "button",
          {
            type: "button",
            "data-testid": `${e}-${u.id}`,
            "aria-pressed": a.includes(u.id),
            onClick: () => o(u.id),
            className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${a.includes(u.id) ? c : CHIP_IDLE_CLS}`,
            children: [
              u.emoji ? jsxRuntime.jsxs("span", { className: "emoji", children: [u.emoji, " "] }) : "",
              u.label,
            ],
          },
          u.id,
        ),
      ),
    ],
  });
}

function RecipeFilterChips({
  sysOptions: e,
  catOptions: n,
  groupOptions: s,
  subOptions: a,
  sizeOptions: o,
  sysSel: l,
  catSel: c,
  groupSel: u,
  subSel: f,
  sizeSel: g,
  onSys: x,
  onCat: m,
  onGroup: p,
  onSub: y,
  onSize: j,
  clearSys: v,
  clearCat: w,
  clearGroup: N,
  clearSub: S,
  clearSize: C,
}) {
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "recipe-sys",
        allLabel: "全部体系",
        options: e,
        selected: l,
        onToggle: x,
        onClear: v,
        activeCls: "border-[#7c3aed] bg-[#f3e8ff] text-[#c62828]",
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "recipe-cat",
        allLabel: "全部",
        options: n,
        selected: c,
        onToggle: m,
        onClear: w,
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "recipe-group",
        allLabel: "全部",
        options: s,
        selected: u,
        onToggle: p,
        onClear: N,
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "recipe-sub",
        allLabel: "全部菜系",
        options: a,
        selected: f,
        onToggle: y,
        onClear: S,
        activeCls: "border-[#e65100] bg-[#ffe9e3] text-[#e65100]",
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "recipe-size",
        allLabel: "全部尺寸",
        options: o,
        selected: g,
        onToggle: j,
        onClear: C,
      }),
    ],
  });
}

function ResearchFilterChips({
  freeOptions: e,
  sysOptions: n,
  catOptions: s,
  groupOptions: a,
  subOptions: o,
  sizeOptions: l,
  freeSel: c,
  sysSel: u,
  catSel: f,
  groupSel: g,
  subSel: x,
  sizeSel: m,
  onFree: p,
  onSys: y,
  onCat: j,
  onGroup: v,
  onSub: w,
  onSize: N,
  clearFree: S,
  clearSys: C,
  clearCat: V,
  clearGroup: E,
  clearSub: F,
  clearSize: J,
}) {
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 mt-2.5 text-[11px] font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "✨" }), " 免费食谱"],
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "rrecipe-free",
        allLabel: "全部食谱",
        options: e,
        selected: c,
        onToggle: p,
        onClear: S,
        activeCls: "border-[#c8a24b] bg-[#fff3d6] text-[#9a6b1f]",
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "rrecipe-sys",
        allLabel: "全部体系",
        options: n,
        selected: u,
        onToggle: y,
        onClear: C,
        activeCls: "border-[#7c3aed] bg-[#f3e8ff] text-[#c62828]",
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "rrecipe-cat",
        allLabel: "全部",
        options: s,
        selected: f,
        onToggle: j,
        onClear: V,
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "rrecipe-group",
        allLabel: "全部",
        options: a,
        selected: g,
        onToggle: v,
        onClear: E,
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "rrecipe-sub",
        allLabel: "全部菜系",
        options: o,
        selected: x,
        onToggle: w,
        onClear: F,
        activeCls: "border-[#e65100] bg-[#ffe9e3] text-[#e65100]",
      }),
      jsxRuntime.jsx(FilterChipGroup, {
        testIdPrefix: "rrecipe-size",
        allLabel: "全部尺寸",
        options: l,
        selected: m,
        onToggle: N,
        onClear: J,
      }),
    ],
  });
}

const RECIPE_CATEGORY_OPTIONS = Object.keys(RECIPE_SYSTEM_LABELS).map((e) => ({ id: e, label: RECIPE_SYSTEM_LABELS[e], emoji: RECIPE_SYSTEM_EMOJI[e] })),
  RECIPE_GROUP_OPTIONS = Object.keys(CUISINE_GROUP_LABELS).map((e) => ({ id: e, label: CUISINE_GROUP_LABELS[e], emoji: CUISINE_GROUP_EMOJI[e] })),
  RECIPE_KIND_OPTIONS = Object.keys(BAKE_SIZE_OPTIONS).map((e) => ({
    id: e,
    label: `${BAKE_SIZE_OPTIONS[e].label}（一炉 ${BAKE_SIZE_OPTIONS[e].yield} 个）`,
    emoji: BAKE_SIZE_OPTIONS[e].emoji,
  })),
  RESEARCH_MODE_OPTIONS = [{ id: "free", label: "免费研发", emoji: "✨" }];

function toSystemOptions(e) {
  return e.map((n) => ({ id: n, label: RECIPE_CATEGORY_LABELS[n] ?? n }));
}

function toCategoryOptions(e) {
  return e.map((n) => ({ id: n, label: CUISINE_LABELS[n] ?? n }));
}

function RecipeResearchForm(e) {
  const [n, s] = React.useState([]),
    [a, o] = React.useState([]),
    [l, c] = React.useState([]),
    [u, f] = React.useState([]),
    [g, x] = React.useState([]),
    [m, p] = React.useState([]),
    [y, j] = React.useState([]),
    [v, w] = React.useState([]),
    [N, S] = React.useState([]),
    [C, V] = React.useState([]),
    [E, F] = React.useState([]),
    [J, H] = React.useState(!0),
    [R, se] = React.useState(!0),
    [be, Ie] = React.useState(!0),
    [xe, ye] = React.useState(!0),
    [P, ne] = React.useState(!0),
    D = (he) => he.system ?? "bakery",
    O = (he) => n.length === 0 || n.includes(D(he)),
    K = RECIPES_ALL.filter((he) => he.id in e.recipes && O(he)),
    Y = RECIPES_ALL.filter((he) => !(he.id in e.recipes) && O(he)),
    I = Array.from(new Set(K.concat(Y).map((he) => he.category))),
    U = Array.from(
      new Set(
        K.concat(Y)
          .map((he) => he.subcategory)
          .filter((he) => !!he),
      ),
    ).filter((he) => u.length === 0 || u.includes(cuisineGroupOf(he))),
    ve = ((he) =>
      he
        .filter((Ye) => a.length === 0 || a.includes(Ye.category))
        .filter(
          (Ye) => u.length === 0 || (Ye.subcategory !== void 0 && u.includes(cuisineGroupOf(Ye.subcategory))),
        )
        .filter((Ye) => l.length === 0 || l.includes(Ye.subcategory ?? "")))(K).filter(
      (he) => g.length === 0 || g.includes(he.size),
    ),
    Ae = RECIPES_ALL.filter((he) => !(he.id in e.recipes) && checkRecipeResearchable(e, he.id).ok),
    Ne = Ae.filter((he) => m.length === 0 || m.includes(D(he))),
    Te = Array.from(new Set(Ne.map((he) => he.category))),
    Se = Array.from(new Set(Ne.map((he) => he.subcategory).filter((he) => !!he))).filter(
      (he) => N.length === 0 || N.includes(cuisineGroupOf(he)),
    ),
    Oe = Ae.filter(
      (he) =>
        !(
          (E.length > 0 && he.unlockCost !== 0) ||
          (m.length > 0 && !m.includes(D(he))) ||
          (y.length > 0 && !y.includes(he.category)) ||
          (N.length > 0 && (he.subcategory === void 0 || !N.includes(cuisineGroupOf(he.subcategory)))) ||
          (v.length > 0 && !v.includes(he.subcategory ?? "")) ||
          (C.length > 0 && !C.includes(he.size))
        ),
    ),
    nt =
      n.length === 1
        ? n[0] === "cuisine"
          ? "（家常料理）"
          : n[0] === "bakery"
            ? "（烘焙甜品）"
            : ""
        : "";
  return {
    sysSel: n,
    setSysSel: s,
    catSel: a,
    setCatSel: o,
    subSel: l,
    setSubSel: c,
    groupSel: u,
    setGroupSel: f,
    sizeSel: g,
    setSizeSel: x,
    rSysSel: m,
    setRSysSel: p,
    rCatSel: y,
    setRCatSel: j,
    rSubSel: v,
    setRSubSel: w,
    rGroupSel: N,
    setRGroupSel: S,
    rSizeSel: C,
    setRSizeSel: V,
    rFreeSel: E,
    setRFreeSel: F,
    openInv: J,
    setOpenInv: H,
    openCw: R,
    setOpenCw: se,
    openWorkshop: be,
    setOpenWorkshop: Ie,
    openResearch: xe,
    setOpenResearch: ye,
    openBag: P,
    setOpenBag: ne,
    sysTitle: nt,
    toggle: (he, Ye) => (Pe) => Ye(he.includes(Pe) ? he.filter((Ss) => Ss !== Pe) : [...he, Pe]),
    shownUnlocked: ve,
    rShownLocked: Oe,
    sysOptions: RECIPE_CATEGORY_OPTIONS,
    catOptions: toSystemOptions(I),
    groupOptions: RECIPE_GROUP_OPTIONS,
    subOptions: toCategoryOptions(U),
    sizeOptions: RECIPE_KIND_OPTIONS,
    rCatOptions: toSystemOptions(Te),
    rSubOptions: toCategoryOptions(Se),
    freeOptions: RESEARCH_MODE_OPTIONS,
  };
}

const KITCHEN_MODULE_TABS = [
  { id: "eat", label: "吃饭背包", icon: "restaurant", hint: "吃饭 · 烹饪熟练度 · 成品背包" },
  { id: "inv", label: "库存厨具", icon: "inventory_2", hint: "食材库存 · 厨具" },
  { id: "cake", label: "定制蛋糕", icon: "cake", hint: "定制蛋糕 · 接单制作" },
  { id: "workshop", label: "制作料理", icon: "cooking", hint: "制作工坊 · 烘焙料理" },
  { id: "research", label: "配方研发", icon: "science", hint: "研发新食谱" },
  { id: "process", label: "加工台", icon: "blender", hint: "熬酱榨汁" },
];

function KitchenModuleTabs({ current: e, onChange: n }) {
  return jsxRuntime.jsx("div", {
    className: "grid grid-cols-3 gap-1.5",
    "data-testid": "home-1f-kitchen-tabs",
    children: KITCHEN_MODULE_TABS.map((s) =>
      jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          "data-testid": `home-1f-kitchen-tab-${s.id}`,
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

function KitchenModulePanel({ state: e, commit: n }) {
  const [s, a] = React.useState("eat"),
    {
      sysSel: o,
      setSysSel: l,
      catSel: c,
      setCatSel: u,
      subSel: f,
      setSubSel: g,
      groupSel: x,
      setGroupSel: m,
      sizeSel: p,
      setSizeSel: y,
      rSysSel: j,
      setRSysSel: v,
      rCatSel: w,
      setRCatSel: N,
      rSubSel: S,
      setRSubSel: C,
      rGroupSel: V,
      setRGroupSel: E,
      rSizeSel: F,
      setRSizeSel: J,
      rFreeSel: H,
      setRFreeSel: R,
      openInv: se,
      setOpenInv: be,
      openCw: Ie,
      setOpenCw: xe,
      openWorkshop: ye,
      setOpenWorkshop: P,
      openResearch: ne,
      setOpenResearch: D,
      openBag: O,
      setOpenBag: K,
      sysTitle: Y,
      toggle: I,
      shownUnlocked: U,
      rShownLocked: fe,
      sysOptions: ve,
      catOptions: Ae,
      groupOptions: Ne,
      subOptions: Te,
      sizeOptions: Se,
      rCatOptions: Oe,
      rSubOptions: nt,
      freeOptions: Yt,
    } = RecipeResearchForm(e),
    [he, Ye] = React.useState(!0);
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx(KitchenModuleTabs, { current: s, onChange: a }),
        jsxRuntime.jsxs("div", {
          className: s === "eat" ? "space-y-4" : "hidden space-y-4",
          children: [
            jsxRuntime.jsx(KitchenDiningSection, { state: e, commit: n, open: he, onToggle: () => Ye((Pe) => !Pe) }),
            jsxRuntime.jsx(ChefHintLine, { state: e }),
            jsxRuntime.jsx(DiscardProductsSection, { state: e, commit: n, open: O, onToggle: () => K((Pe) => !Pe) }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: s === "inv" ? "space-y-4" : "hidden space-y-4",
          children: [
            jsxRuntime.jsx(IngredientFreshnessSection, { state: e, commit: n, open: se, onToggle: () => be((Pe) => !Pe) }),
            jsxRuntime.jsx(KitchenwareSection, { state: e, open: Ie, onToggle: () => xe((Pe) => !Pe) }),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: s === "cake" ? "" : "hidden",
          children: [jsxRuntime.jsx(AllergenFilterPanel, { state: e, commit: n }), jsxRuntime.jsx(CBW, { state: e, commit: n })],
        }),
        jsxRuntime.jsx("div", {
          className: s === "workshop" ? "" : "hidden",
          children: jsxRuntime.jsx(BakingRecipeList, {
            state: e,
            commit: n,
            open: ye,
            onToggle: () => P((Pe) => !Pe),
            sysTitle: Y,
            sysChips: jsxRuntime.jsx(RecipeFilterChips, {
              sysOptions: ve,
              catOptions: Ae,
              groupOptions: Ne,
              subOptions: Te,
              sizeOptions: Se,
              sysSel: o,
              catSel: c,
              groupSel: x,
              subSel: f,
              sizeSel: p,
              onSys: I(o, l),
              onCat: I(c, u),
              onGroup: I(x, m),
              onSub: I(f, g),
              onSize: I(p, y),
              clearSys: () => l([]),
              clearCat: () => u([]),
              clearGroup: () => m([]),
              clearSub: () => g([]),
              clearSize: () => y([]),
            }),
            catChips: null,
            groupChips: null,
            subChips: null,
            sizeChips: null,
            shownUnlocked: U,
          }),
        }),
        jsxRuntime.jsx("div", {
          className: s === "research" ? "" : "hidden",
          children: jsxRuntime.jsx(ResearchRecipeList, {
            state: e,
            commit: n,
            open: ne,
            onToggle: () => D((Pe) => !Pe),
            rSysChips: jsxRuntime.jsx(ResearchFilterChips, {
              freeOptions: Yt,
              sysOptions: ve,
              catOptions: Oe,
              groupOptions: Ne,
              subOptions: nt,
              sizeOptions: Se,
              freeSel: H,
              sysSel: j,
              catSel: w,
              groupSel: V,
              subSel: S,
              sizeSel: F,
              onFree: I(H, R),
              onSys: I(j, v),
              onCat: I(w, N),
              onGroup: I(V, E),
              onSub: I(S, C),
              onSize: I(F, J),
              clearFree: () => R([]),
              clearSys: () => v([]),
              clearCat: () => N([]),
              clearGroup: () => E([]),
              clearSub: () => C([]),
              clearSize: () => J([]),
            }),
            rCatChips: null,
            rGroupChips: null,
            rSubChips: null,
            rSizeChips: null,
            rShownLocked: fe,
          }),
        }),
        jsxRuntime.jsx("div", {
          className: s === "process" ? "" : "hidden",
          children: jsxRuntime.jsx(ProcessingSection, { state: e, commit: n }),
        }),
      ],
    }),
  );
}

const FURNITURE_MODULE_TABS = [
  { id: "owned", label: "持有家具", icon: "weekend", hint: "已拥有家具 · 摆放互动" },
  { id: "material", label: "家具材料", icon: "inventory", hint: "材料仓 · 材料理解度" },
  { id: "craft", label: "家具制作", icon: "handyman", hint: "手工制作新家具" },
];

function FurnitureModuleTabs({ current: e, onChange: n }) {
  return jsxRuntime.jsx("div", {
    className: "grid grid-cols-3 gap-1.5",
    "data-testid": "home-1f-furniture-tabs",
    children: FURNITURE_MODULE_TABS.map((s) =>
      jsxRuntime.jsxs(
        "button",
        {
          type: "button",
          "data-testid": `home-1f-furniture-tab-${s.id}`,
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

function FurnitureModulePanel({ state: e, commit: n }) {
  const [s, a] = React.useState("owned"),
    [o, l] = React.useState(!0);
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx(FurnitureModuleTabs, { current: s, onChange: a }),
        jsxRuntime.jsx("div", {
          className: s === "owned" ? "" : "hidden",
          children: jsxRuntime.jsx(FloorFurnishingPanel, {
            state: e,
            commit: n,
            floor: "1f",
            open: o,
            onToggle: () => l((c) => !c),
            mode: "owned",
          }),
        }),
        jsxRuntime.jsx("div", {
          className: s === "material" ? "" : "hidden",
          children: jsxRuntime.jsx(FloorFurnishingPanel, {
            state: e,
            commit: n,
            floor: "1f",
            open: o,
            onToggle: () => l((c) => !c),
            mode: "material",
          }),
        }),
        jsxRuntime.jsx("div", {
          className: s === "craft" ? "" : "hidden",
          children: jsxRuntime.jsx(FloorFurnishingPanel, {
            state: e,
            commit: n,
            floor: "1f",
            open: o,
            onToggle: () => l((c) => !c),
            mode: "craft",
          }),
        }),
      ],
    }),
  );
}

const FLOOR_OVERVIEW_TABS = [
    {
      id: "1f",
      /* code / name 分开渲染：楼层号独占一行，避免「1F 店面·厨房·工坊」
         在窄屏被拆成三行、把卡片撑高。label 仍供读屏与播报使用。 */
      code: "1F",
      name: "店面·厨房·工坊",
      label: "1F 店面·厨房·工坊",
      icon: "storefront",
      hint: "开店营业、烘焙料理与家具制作",
    },
    { id: "2f", code: "2F", name: "卧室·阳台", label: "2F 卧室·阳台", icon: "balcony", hint: "休息、梳洗、娱乐与阳台种植" },
    { id: "3f", code: "3F", name: "书房·收藏", label: "3F 书房·收藏", icon: "menu_book", hint: "阅读、工具、缝纫与收藏架" },
    { id: "b1", code: "B1", name: "地下室", label: "B1 地下室", icon: "warehouse", hint: "家具仓库 · 未摆放的家具" },
    { id: "roof", code: "天台", name: "观星·看天气", label: "天台", icon: "nightlight", hint: "看天气、观星" },
  ],
  FLOOR1_TABS = [
    { id: "store", label: "店面", icon: "storefront", hint: "收银营业 · 装修 · 员工 · 货架" },
    {
      id: "kitchen",
      label: "厨房",
      icon: "ramen_dining",
      hint: "吃饭 · 定制蛋糕 · 熬酱 · 烘焙 · 研发 · 厨具",
    },
    { id: "furniture", label: "家具工坊", icon: "chair", hint: "家具分类 · 手工制作 · 摆放" },
  ],
  FLOOR2_TABS = [
    { id: "bedroom", label: "卧室", icon: "bed", hint: "睡觉 · 梳洗 · 化妆 · 玩游戏" },
    { id: "balcony", label: "阳台", icon: "local_florist", hint: "花盆种植 · 种子盒 · 肥料" },
  ],
  FLOOR3_TABS = [
    { id: "study", label: "书房", icon: "menu_book", hint: "阅读 · 工具 · 缝纫" },
    { id: "collection", label: "收藏", icon: "workspace_premium", hint: "节日纪念品收藏架" },
  ];

function ModuleTabBar({ items: e, current: n, onChange: s, testIdPrefix: a }) {
  var o;
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsx("div", {
        className: "grid gap-1.5",
        style: { gridTemplateColumns: `repeat(${e.length}, minmax(0, 1fr))` },
        children: e.map((l) =>
          jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              "data-testid": `${a}-${l.id}`,
              "aria-pressed": n === l.id,
              "aria-label": `${l.label}模块，${l.hint}`,
              onClick: () => {
                (n !== l.id && speak(`已切换到${l.label}模块，${l.hint}`), s(l.id));
              },
              className: `rounded-xl border-2 px-1.5 py-2 text-center transition-colors ${n === l.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: [
                jsxRuntime.jsx("span", {
                  className: "material-icons",
                  style: { fontSize: 18 },
                  "aria-hidden": "true",
                  children: l.icon,
                }),
                jsxRuntime.jsx("span", {
                  className: "mt-0.5 block text-[11px] font-black leading-tight",
                  children: l.label,
                }),
              ],
            },
            l.id,
          ),
        ),
      }),
      jsxRuntime.jsx("p", {
        className: "-mt-2 text-center text-[10px] font-bold text-[#b08a6a]",
        children: (o = e.find((l) => l.id === n)) == null ? void 0 : o.hint,
      }),
    ],
  });
}
