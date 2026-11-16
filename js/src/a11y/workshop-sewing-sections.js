function ToolBenchSection({ state: e, commit: n, open: s, onToggle: a }) {
  const o = e.home,
    l = bestToolBonus(e),
    c = (u) => {
      const f = buyTool(e, u);
      n(f.state, f.message, f.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs(CardSection, {
    title: "🧰 工具台与我的工具",
    open: s,
    onToggle: a,
    children: [
      jsxRuntime.jsxs("section", {
        className: "game-card",
        children: [
          jsxRuntime.jsxs("p", {
            className: "font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧰" }), " 工具台"],
          }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-xs text-[#b08a6a]",
            children: "更好的工具能提升手工制作成功率，多动手也能提高工具熟练度",
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-3",
            children: [
              jsxRuntime.jsxs("div", {
                className:
                  "mb-1 flex items-center justify-between text-xs font-bold text-[#6b4226]",
                children: [
                  jsxRuntime.jsx("span", { children: "工具熟练度" }),
                  jsxRuntime.jsxs("span", { className: "num", children: [o.toolSkill, "/100"] }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "bar-track",
                role: "progressbar",
                "aria-valuemin": 0,
                "aria-valuemax": 100,
                "aria-valuenow": o.toolSkill,
                "aria-label": `工具熟练度 ${o.toolSkill}/100`,
                children: jsxRuntime.jsx("div", {
                  className: "bar-fill",
                  style: {
                    width: `${o.toolSkill}%`,
                    background: "linear-gradient(90deg,#ffe082,#ffc53d)",
                  },
                }),
              }),
              jsxRuntime.jsxs("p", {
                className: "mt-2 text-center text-[11px] font-bold text-[#e04a63]",
                children: ["当前工具加成：+", l, "%"],
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx("section", {
        className: "game-card",
        children: jsxRuntime.jsx(CollapsibleSection, {
          title: "🔩 我的工具",
          summary: `共 ${CRAFT_TOOLS.length} 件工具`,
          count: CRAFT_TOOLS.length,
          testId: "sub-collapse-tools",
          tone: "#c62828",
          children: jsxRuntime.jsx("div", {
            className: "space-y-2",
            children: CRAFT_TOOLS.map((u) => {
              const f = o.tools.includes(u.id);
              return jsxRuntime.jsxs(
                "div",
                {
                  className: `flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5 ${f ? "" : "opacity-70"}`,
                  children: [
                    jsxRuntime.jsx("div", {
                      className: "flex w-[20%] shrink-0 items-center justify-center",
                      children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: u.emoji }),
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-sm font-black text-[#4a2c17]",
                              children: [
                                u.name,
                                f &&
                                  jsxRuntime.jsx("span", {
                                    className: "ml-1 text-[10px] font-bold text-[#c62828]",
                                    children: "已拥有 ✓",
                                  }),
                              ],
                            }),
                            jsxRuntime.jsx("p", {
                              className: "text-[11px] text-[#b08a6a]",
                              children: u.desc,
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#e65100]",
                              children: ["成功率 +", u.bonus, "%"],
                            }),
                          ],
                        }),
                        u.price !== void 0 &&
                          jsxRuntime.jsx("div", {
                            className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                            children: jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": `btn-buy-tool-${u.id}`,
                              "aria-label": f
                                ? `已拥有工具${u.name}`
                                : `购买工具${u.name}，需要 ${u.price} 元${e.coins < u.price ? "，金币不足" : ""}`,
                              onClick: () => c(u.id),
                              disabled: f || e.coins < u.price,
                              className: "btn-chunky btn-xs btn-yellow",
                              children: f
                                ? "拥有"
                                : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                    children: [
                                      jsxRuntime.jsx("span", {
                                        className: "emoji",
                                        "aria-hidden": "true",
                                        children: "💰",
                                      }),
                                      " ",
                                      u.price,
                                    ],
                                  }),
                            }),
                          }),
                      ],
                    }),
                  ],
                },
                u.id,
              );
            }),
          }),
        }),
      }),
    ],
  });
}

function SewingDialog({
  state: e,
  sewingPattern: n,
  sewingFreestyle: s,
  sewingFabric: a,
  onFabric: o,
  onClose: l,
  onConfirm: c,
}) {
  var f, g;
  const u = e.home;
  return jsxRuntime.jsx(Modal, {
    open: n !== null,
    title: s ? "🎲 凭感觉做" : "✂️ 选择布料",
    onClose: l,
    children:
      n &&
      jsxRuntime.jsxs("div", {
        className: "space-y-4",
        children: [
          jsxRuntime.jsxs("div", {
            className: "rounded-2xl bg-[#fce4ec] p-3 text-center",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-3xl",
                children: segmentByEmoji(s ? "🎲" : (((f = SEWING_MAP[n]) == null ? void 0 : f.emoji) ?? "👚")),
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 font-black text-[#4a2c17]",
                children: s
                  ? "凭感觉做一件"
                  : (((g = SEWING_MAP[n]) == null ? void 0 : g.name) ?? "缝制衣服"),
              }),
              !s &&
                SEWING_MAP[n] &&
                jsxRuntime.jsxs("p", {
                  className:
                    "mt-0.5 rounded-full bg-[#fff3bf] px-2 py-px text-[11px] font-bold text-[#b8860b]",
                  children: ["成功率 ", Math.round(calcSewingSuccessRate(e, SEWING_MAP[n].difficulty) * 100), "%"],
                }),
              s &&
                jsxRuntime.jsx("p", {
                  className:
                    "mt-0.5 rounded-full bg-[#fff3bf] px-2 py-px text-[11px] font-bold text-[#b8860b]",
                  children: "成功率再 -12%，随机出一件适合你性别的款式",
                }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("p", {
                className: "mb-1.5 text-sm font-black text-[#6b4226]",
                children: "选择布料（决定花纹 / 颜色 / 材质）",
              }),
              jsxRuntime.jsx("div", {
                className: "grid grid-cols-2 gap-1.5",
                children: MATERIALS.filter((x) => FABRIC_TYPES[x.id]).map((x) => {
                  const m = u.materials[x.id] ?? 0,
                    p = FABRIC_TYPES[x.id];
                  return jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-testid": `sew-fabric-${x.id}`,
                      onClick: () => o(x.id),
                      disabled: m <= 0,
                      className: `flex flex-col rounded-xl border-2 p-2 text-left ${a === x.id ? "border-[#ff6b81] bg-[#ffe9ef]" : "border-[#f0dcc0] bg-white"} ${m <= 0 ? "opacity-50" : ""}`,
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "text-xs font-black text-[#4a2c17]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: x.emoji }),
                            " ",
                            x.name,
                            " ",
                            jsxRuntime.jsxs("span", { className: "num text-[#e04a63]", children: ["x", m] }),
                          ],
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[9px] font-bold text-[#ad1457]",
                          children: [p.colorName, " · ", p.pattern],
                        }),
                        jsxRuntime.jsx("p", {
                          className:
                            "mt-0.5 line-clamp-2 text-[9px] leading-relaxed text-[#b08a6a]",
                          children: p.desc,
                        }),
                      ],
                    },
                    x.id,
                  );
                }),
              }),
            ],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-sew-confirm",
            onClick: c,
            className: "btn-chunky btn-pink w-full py-3 text-base",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "✂️" }),
              " 开始缝制（10 精力 · 1 小时）",
            ],
          }),
        ],
      }),
  });
}

function SewingTableSection({ state: e }) {
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsxs("p", {
        className: "font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "✂️" }), " 缝纫台"],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-0.5 text-xs text-[#b08a6a]",
        children:
          "买布料和针线，在家就能给自己做衣服；衣服的花纹、颜色、材质由所选布料决定，做出来的衣服可以立刻穿上。",
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-3",
        children: [
          jsxRuntime.jsxs("div", {
            className: "mb-1 flex items-center justify-between text-xs font-bold text-[#6b4226]",
            children: [
              jsxRuntime.jsx("span", { children: "缝纫技能" }),
              jsxRuntime.jsxs("span", { className: "num", children: [e.sewingSkill ?? 0, "/100"] }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "bar-track",
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": e.sewingSkill ?? 0,
            "aria-label": `缝纫技能 ${e.sewingSkill ?? 0}/100`,
            children: jsxRuntime.jsx("div", {
              className: "bar-fill",
              style: {
                width: `${e.sewingSkill ?? 0}%`,
                background: "linear-gradient(90deg,#f8bbd0,#ec407a)",
              },
            }),
          }),
          jsxRuntime.jsxs("p", {
            className: "mt-2 text-center text-[11px] font-bold text-[#e04a63]",
            children: ["当前工具加成：+", getSewingToolBonus(e), "%（只取最高一件）"],
          }),
        ],
      }),
    ],
  });
}

function FabricStorageSection({ state: e, expandedFabric: n, onToggleFold: s }) {
  const a = e.home;
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsxs("p", {
        className: "mb-1 font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧵" }), " 布料仓"],
      }),
      jsxRuntime.jsx("p", {
        className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
        children:
          "布料决定成衣的花纹、颜色和材质；针线、纽扣、缎带是缝纫耗材。去「小镇 · 商店街 · 布料行」补充。",
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-2",
        children: MATERIALS.filter(
          (o) => FABRIC_TYPES[o.id] || o.id === "thread" || o.id === "button" || o.id === "ribbon",
        ).map((o) => {
          const l = a.materials[o.id] ?? 0,
            c = FABRIC_TYPES[o.id],
            u = c ? `${c.colorName} · ${c.pattern} · ${c.desc}` : "缝纫耗材",
            f = u.length > 13,
            g = !!n[o.id];
          return jsxRuntime.jsxs(
            "div",
            {
              className: "flex flex-col rounded-xl bg-[#fce4ec] p-2.5",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center gap-1.5",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-xl leading-none", children: o.emoji }),
                    jsxRuntime.jsxs("p", {
                      className: "min-w-0 flex-1 text-xs font-black leading-tight text-[#ad1457]",
                      children: [
                        o.name,
                        " ",
                        jsxRuntime.jsxs("span", { className: "num", children: ["x", l] }),
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: `mt-1 text-[10px] font-bold leading-snug text-[#d81b60] ${f && !g ? "line-clamp-2" : ""}`,
                  children: u,
                }),
                f &&
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": `btn-fold-fabric-${o.id}`,
                    onClick: () => s(o.id),
                    className: "mt-0.5 self-start text-[10px] font-black text-[#ad1457]",
                    children: g ? "收起 ▲" : "展开 ▼",
                  }),
              ],
            },
            o.id,
          );
        }),
      }),
    ],
  });
}

function SewingToolsSection({ state: e, onBuy: n }) {
  return renderWithSpeech(
    jsxRuntime.jsx("section", {
      className: "game-card",
      children: jsxRuntime.jsx(CollapsibleSection, {
        title: "🧰 缝纫工具",
        summary: `共 ${SEWING_TOOLS_GAME.length} 件工具`,
        count: SEWING_TOOLS_GAME.length,
        testId: "sub-collapse-sewing-tools",
        tone: "#c62828",
        children: jsxRuntime.jsx("div", {
          className: "space-y-2",
          children: SEWING_TOOLS_GAME.map((s) => {
            const a = (e.sewingTools ?? []).includes(s.id);
            return jsxRuntime.jsxs(
              "div",
              {
                className: `flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5 ${a ? "" : "opacity-80"}`,
                children: [
                  jsxRuntime.jsx("div", {
                    className: "flex w-[20%] shrink-0 items-center justify-center",
                    children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: s.emoji }),
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [
                      jsxRuntime.jsxs("div", {
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "text-sm font-black text-[#4a2c17]",
                            children: [
                              s.name,
                              a &&
                                jsxRuntime.jsx("span", {
                                  className: "ml-1 text-[10px] font-bold text-[#c62828]",
                                  children: "已拥有 ✓",
                                }),
                            ],
                          }),
                          jsxRuntime.jsx("p", { className: "text-[11px] text-[#b08a6a]", children: s.desc }),
                          jsxRuntime.jsxs("p", {
                            className: "text-[10px] font-bold text-[#e65100]",
                            children: ["缝纫成功率 +", s.bonus, "%"],
                          }),
                        ],
                      }),
                      s.price !== void 0 &&
                        jsxRuntime.jsx("div", {
                          className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                          children: jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-buy-sewing-tool-${s.id}`,
                            "aria-label": a
                              ? `已拥有工具${s.name}`
                              : `购买工具${s.name}，需要 ${s.price} 元${e.coins < s.price ? "，金币不足" : ""}`,
                            onClick: () => n(s.id),
                            disabled: a || e.coins < s.price,
                            className: "btn-chunky btn-xs btn-yellow",
                            children: a
                              ? "拥有"
                              : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                  children: [
                                    jsxRuntime.jsx("span", {
                                      className: "emoji",
                                      "aria-hidden": "true",
                                      children: "💰",
                                    }),
                                    " ",
                                    s.price,
                                  ],
                                }),
                          }),
                        }),
                    ],
                  }),
                ],
              },
              s.id,
            );
          }),
        }),
      }),
    }),
  );
}

function SewingPatternCard({ pattern: e, state: n, isOpen: s, onToggleFold: a, onSew: o }) {
  const l = OUTFIT_MAP[e.outfitId],
    c = Math.round(calcSewingSuccessRate(n, e.difficulty) * 100),
    u =
      l != null && l.gender && l.gender !== "unisex"
        ? l.gender === "male"
          ? "♂ 男装"
          : "♀ 女装"
        : "",
    f = e.desc.length > 11;
  return jsxRuntime.jsxs("div", {
    className: "flex flex-col rounded-xl border-2 border-[#f8bbd0] bg-[#fffdf8] p-2.5",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-start gap-2",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-2xl leading-none", children: e.emoji }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-[13px] font-black leading-tight text-[#4a2c17]",
                children: e.name,
              }),
              (u || l) &&
                jsxRuntime.jsxs("p", {
                  className: "mt-0.5 text-[10px] font-bold leading-snug text-[#c62828]",
                  children: [
                    CLOTHING_SLOTS[e.category] ?? e.category,
                    u ? ` · ${u}` : "",
                    l ? ` · ${SLOT_LABELS[l.slot]}` : "",
                  ],
                }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: `mt-1.5 text-[11px] font-bold leading-snug text-[#b08a6a] ${f && !s ? "line-clamp-2" : ""}`,
        children: e.desc,
      }),
      f &&
        jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": `btn-fold-pattern-${e.id}`,
          onClick: () => a(e.id),
          className: "mt-0.5 self-start text-[10px] font-black text-[#e04a63]",
          children: s ? "收起 ▲" : "展开 ▼",
        }),
      jsxRuntime.jsxs("p", {
        className: "mt-1.5 text-[10px] font-bold leading-snug text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🧵" }),
          " 针线 x",
          e.thread,
          e.button ? ` · ⚪ 纽扣 x${e.button}` : "",
          e.ribbon
            ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  " ",
                  "· ",
                  jsxRuntime.jsx("span", { className: "emoji", children: "🎗️" }),
                  " 缎带 x",
                  e.ribbon,
                ],
              })
            : null,
          " ",
          "· 难度 Lv.",
          e.difficulty,
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-auto flex items-center justify-between gap-1 pt-1.5",
        children: [
          jsxRuntime.jsxs("span", {
            className: `rounded-full px-1.5 py-px text-[10px] font-bold ${c >= 60 ? "bg-[#e3f2fd] text-[#c62828]" : c >= 40 ? "bg-[#fff3bf] text-[#b8860b]" : "bg-[#ffebee] text-[#c62828]"}`,
            children: ["成功率 ", c, "%"],
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": `btn-sew-${e.id}`,
            onClick: () => o(e.id),
            className: "btn-chunky btn-xs btn-pink",
            children: "缝制",
          }),
        ],
      }),
    ],
  });
}

function SewingPatternList({
  state: e,
  patternCat: n,
  expanded: s,
  onCat: a,
  onToggleFold: o,
  onSew: l,
  onFreestyle: c,
}) {
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card",
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-1 font-black text-[#4a2c17]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "📋" }),
            " 服装配方（照配方做）",
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
          children: "按配方缝制成功率更高；缝纫技能越高越稳，成功 +4、失败也 +2 技能。",
        }),
        jsxRuntime.jsxs("div", {
          className: "mb-2 flex flex-wrap gap-1",
          children: [
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "pattern-cat-all",
              onClick: () => a("all"),
              className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${n === "all" ? "border-[#ec407a] bg-[#fce4ec] text-[#ad1457]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: "全部",
            }),
            Object.entries(CLOTHING_SLOTS).map(([u, f]) =>
              jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "data-testid": `pattern-cat-${u}`,
                  onClick: () => a(u),
                  className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${n === u ? "border-[#ec407a] bg-[#fce4ec] text-[#ad1457]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                  children: f,
                },
                u,
              ),
            ),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "grid grid-cols-2 gap-2",
          children: SEWING_GAME.filter((u) => n === "all" || u.category === n).map((u) =>
            jsxRuntime.jsx(SewingPatternCard, { pattern: u, state: e, isOpen: !!s[u.id], onToggleFold: o, onSew: l }, u.id),
          ),
        }),
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-sew-freestyle",
          onClick: c,
          className: "btn-chunky btn-sm btn-brown mt-2 w-full",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🎲" }),
            " 凭感觉做（随机出一件适合你的款式，成功率更低）",
          ],
        }),
      ],
    }),
  );
}

function WardrobeSection({ state: e, onWear: n }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card",
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-2 font-black text-[#4a2c17]",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "👚" }), " 已缝制的衣服"],
        }),
        e.sewnClothes.length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-2 text-center text-sm text-[#b08a6a]",
              children: "还没缝过衣服，选个配方和布料试试手吧",
            })
          : jsxRuntime.jsx("div", {
              className: "space-y-1.5",
              children: e.sewnClothes.map((s, a) => {
                const o = OUTFIT_MAP[s.outfitId],
                  l = e.outfits.equipped[(o == null ? void 0 : o.slot) ?? ""] === s.outfitId;
                return jsxRuntime.jsxs(
                  "div",
                  {
                    className: "flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5",
                    children: [
                      jsxRuntime.jsx("div", {
                        className: "flex w-[20%] shrink-0 items-center justify-center",
                        children: jsxRuntime.jsx("span", {
                          className: "emoji text-2xl",
                          children: (o == null ? void 0 : o.emoji) ?? "👚",
                        }),
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsxs("p", {
                                className: "text-sm font-black text-[#4a2c17]",
                                children: [
                                  s.desc,
                                  l &&
                                    jsxRuntime.jsx("span", {
                                      className: "ml-1 text-[10px] font-bold text-[#c62828]",
                                      children: "穿戴中 ✓",
                                    }),
                                ],
                              }),
                              jsxRuntime.jsx("p", {
                                className: "text-[10px] font-bold text-[#b08a6a]",
                                children: o ? `${SLOT_LABELS[o.slot]} · 魅力 +${o.charm}` : "",
                              }),
                            ],
                          }),
                          jsxRuntime.jsx("div", {
                            className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                            children: jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": `btn-wear-sewn-${a}`,
                              onClick: () => n(s.outfitId),
                              disabled: l,
                              className: "btn-chunky btn-xs btn-brown",
                              children: l ? "已穿戴" : "穿戴",
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  `${s.outfitId}-${a}`,
                );
              }),
            }),
      ],
    }),
  );
}

function SewingWorkshopPanel({ state: e, commit: n, open: s, onToggle: a }) {
  const [o, l] = React.useState("all"),
    [c, u] = React.useState(null),
    [f, g] = React.useState(!1),
    [x, m] = React.useState("fabric_cotton"),
    [p, y] = React.useState({}),
    [j, v] = React.useState({}),
    w = e.home,
    N = (E) => {
      const F = buySewingTool(e, E);
      n(F.state, F.message, F.ok ? "success" : "error");
    },
    S = (E, F) => {
      (u(E), g(F));
      const J = Object.keys(FABRIC_TYPES).find((H) => (w.materials[H] ?? 0) > 0);
      m(J ?? "fabric_cotton");
    },
    C = () => {
      if (!c) return;
      const E = craftSewingItem(e, c, x, f);
      (E.ok && E.success && u(null),
        n(E.state, E.message, E.ok ? (E.success ? "success" : "info") : "error"));
    },
    V = (E) => {
      const F = equipOutfit(e, E);
      n(F.state, F.message, F.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsxs(CardSection, {
        title: "🧵 缝纫",
        open: s,
        onToggle: a,
        children: [
          jsxRuntime.jsx(SewingTableSection, { state: e }),
          jsxRuntime.jsx(SewingToolsSection, { state: e, onBuy: N }),
          jsxRuntime.jsx(FabricStorageSection, {
            state: e,
            expandedFabric: p,
            onToggleFold: (E) => y((F) => ({ ...F, [E]: !F[E] })),
          }),
          jsxRuntime.jsx(SewingPatternList, {
            state: e,
            patternCat: o,
            expanded: j,
            onCat: l,
            onToggleFold: (E) => v((F) => ({ ...F, [E]: !F[E] })),
            onSew: (E) => S(E, !1),
            onFreestyle: () => S("freestyle", !0),
          }),
          jsxRuntime.jsx(WardrobeSection, { state: e, onWear: V }),
        ],
      }),
      jsxRuntime.jsx(SewingDialog, {
        state: e,
        sewingPattern: c,
        sewingFreestyle: f,
        sewingFabric: x,
        onFabric: m,
        onClose: () => u(null),
        onConfirm: C,
      }),
    ],
  });
}

const PLANT_KIND_LABELS = { veggie: "小型蔬菜", fruit: "小型水果", flower: "鲜花", bonsai: "盆景" };

function BalconyGardenPanel({ state: e, commit: n, open: s, onToggle: a }) {
  const [o, l] = React.useState("all"),
    [c, u] = React.useState(null),
    f = React.useRef({}),
    g = Array.isArray(e.plants) ? e.plants : [],
    x = e.seeds ?? {},
    m = Array.from(new Set(SEEDS.map((C) => C.kind))),
    p = new Set(g.map((C) => C.slot)),
    y = () => {
      for (let C = 1; C <= MAX_POTS; C += 1) if (!p.has(C)) return C;
      return 1;
    },
    j = (C) => {
      n(C.state, C.message, C.ok ? "success" : "error");
    },
    v = SEEDS.filter((C) => o === "all" || C.kind === o),
    w = SEEDS.filter((C) => (x[C.id] ?? 0) > 0),
    N = (C, V) => {
      var F;
      (V == null || V.focus(),
        g.find((J) => J.slot === C) ? (F = f.current[C]) == null || F.focus() : u(C));
    },
    S = (C, V) => {
      (j(handleFlowerPotAction(e, C, V)), u(null));
    };
  return renderWithSpeech(
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsxs(CardSection, {
          title: "🪴 阳台 · 种植",
          open: s,
          onToggle: a,
          right: jsxRuntime.jsxs("span", {
            className: "rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-[#558b2f]",
            children: [
              "肥料 ×",
              e.fertilizer ?? 0,
              " · 鲜花 ×",
              e.homeFlowers ?? 0,
              " · 盆景 ×",
              e.homeBonsai ?? 0,
            ],
          }),
          children: [
            jsxRuntime.jsxs("section", {
              className: "game-card",
              style: { background: "linear-gradient(135deg,#e8f5e9,#dcedc8)" },
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "font-black text-[#33691e]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🪴" }),
                        " 阳台 · 种植",
                      ],
                    }),
                    jsxRuntime.jsxs("span", {
                      className:
                        "rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-[#558b2f]",
                      children: [
                        "肥料 ×",
                        e.fertilizer ?? 0,
                        " · 鲜花 ×",
                        e.homeFlowers ?? 0,
                        " · 盆景 ×",
                        e.homeBonsai ?? 0,
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-1 text-[11px] font-bold leading-relaxed text-[#558b2f]",
                  children:
                    "花盆可以种小型蔬菜、水果、鲜花和盆景：每天浇一次水才会长，小袋肥料能加快生长；成熟后收获——蔬果进食材袋，鲜花可以收进背包送人或摆在家里，盆景摆进家里当装饰。",
                }),
                jsxRuntime.jsx("div", {
                  className: "mt-2 grid grid-cols-2 gap-2",
                  children: Array.from({ length: MAX_POTS }, (C, V) => V + 1).map((C) => {
                    const V = g.find((R) => R.slot === C),
                      E = V ? SEED_MAP[V.seedId] : void 0,
                      F = V ? getCropCareProgress(V) : 0,
                      J = V ? isCropMature(V) : !1,
                      H = V
                        ? `种了${(E == null ? void 0 : E.name) ?? "作物"}，生长进度 ${F}/${(E == null ? void 0 : E.days) ?? 0} 天，${J ? "已成熟可以收获" : `还需 ${Math.max(0, ((E == null ? void 0 : E.days) ?? 0) - F)} 天成熟`}，${V.wateredToday ? "今天已浇水" : "今天还没浇水"}`
                        : "空着，可以选个种子种下";
                    return jsxRuntime.jsxs(
                      "div",
                      {
                        role: "group",
                        tabIndex: 0,
                        "aria-label": `${C} 号花盆，${H}${V ? "，按回车键操作浇水施肥收获" : "，按回车键选种子种下"}`,
                        onClick: (R) => N(C, R.currentTarget),
                        onKeyDown: (R) => {
                          (R.key === "Enter" || R.key === " ") &&
                            (R.preventDefault(), N(C, R.currentTarget));
                        },
                        className: `cursor-pointer rounded-xl p-2 outline-none focus-visible:ring-2 focus-visible:ring-[#66bb6a] ${V ? "bg-white/90" : "bg-[#fffde7]"}`,
                        children: [
                          jsxRuntime.jsxs("div", {
                            className: "flex items-center justify-between",
                            children: [
                              jsxRuntime.jsxs("p", {
                                className: "text-[11px] font-black text-[#4a2c17]",
                                children: [C, " 号花盆"],
                              }),
                              V &&
                                E &&
                                jsxRuntime.jsxs("span", {
                                  className: "text-[10px] font-bold text-[#558b2f]",
                                  children: [E.emoji, " ", E.name],
                                }),
                            ],
                          }),
                          V
                            ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                children: [
                                  jsxRuntime.jsxs("div", {
                                    className: "mt-1.5",
                                    children: [
                                      jsxRuntime.jsxs("div", {
                                        className:
                                          "mb-0.5 flex justify-between text-[10px] font-bold text-[#6b4226]",
                                        children: [
                                          jsxRuntime.jsx("span", {
                                            children: J
                                              ? "🌱 成熟啦，可以收获"
                                              : V.wateredToday
                                                ? "💧 今天浇过水"
                                                : "⏰ 今天还没浇水",
                                          }),
                                          jsxRuntime.jsxs("span", {
                                            className: "num",
                                            children: [F, "/", (E == null ? void 0 : E.days) ?? 0],
                                          }),
                                        ],
                                      }),
                                      jsxRuntime.jsx("div", {
                                        className: "bar-track",
                                        role: "progressbar",
                                        "aria-valuemin": 0,
                                        "aria-valuemax": (E == null ? void 0 : E.days) ?? 1,
                                        "aria-valuenow": F,
                                        "aria-label": `${(E == null ? void 0 : E.name) ?? "作物"}生长进度 ${F}/${(E == null ? void 0 : E.days) ?? 0}`,
                                        children: jsxRuntime.jsx("div", {
                                          className: "bar-fill",
                                          style: {
                                            width: `${Math.min(100, Math.round((F / Math.max(1, (E == null ? void 0 : E.days) ?? 1)) * 100))}%`,
                                            background: "linear-gradient(90deg,#a5d6a7,#66bb6a)",
                                          },
                                        }),
                                      }),
                                    ],
                                  }),
                                  jsxRuntime.jsxs("div", {
                                    className: "mt-1.5 flex flex-wrap gap-1",
                                    children: [
                                      jsxRuntime.jsx("button", {
                                        ref: (R) => {
                                          f.current[C] = R;
                                        },
                                        type: "button",
                                        "data-testid": `btn-water-${C}`,
                                        onClick: () => j(waterPlant(e, C)),
                                        disabled: V.wateredToday,
                                        className: "btn-chunky btn-xs btn-blue",
                                        children: "💧 浇水",
                                      }),
                                      jsxRuntime.jsx("button", {
                                        type: "button",
                                        "data-testid": `btn-fertilize-${C}`,
                                        onClick: () => j(fertilizePlant(e, C)),
                                        disabled: (e.fertilizer ?? 0) < 1,
                                        className: "btn-chunky btn-xs btn-yellow",
                                        children: "🌿 施肥",
                                      }),
                                      J &&
                                        jsxRuntime.jsx("button", {
                                          type: "button",
                                          "data-testid": `btn-harvest-${C}`,
                                          onClick: () => j(harvestPlant(e, C)),
                                          className: "btn-chunky btn-xs btn-orange",
                                          children: "🧺 收获",
                                        }),
                                      jsxRuntime.jsx("button", {
                                        type: "button",
                                        "data-testid": `btn-clear-${C}`,
                                        onClick: () => j(clearPlantPot(e, C)),
                                        className: "btn-chunky btn-xs btn-ghost",
                                        children: "🗑️ 拔掉",
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : jsxRuntime.jsx("p", {
                                className:
                                  "mt-1.5 pb-1 text-center text-[11px] font-bold text-[#b08a6a]",
                                children: "空着 · 点这里选个种子种下",
                              }),
                        ],
                      },
                      C,
                    );
                  }),
                }),
              ],
            }),
            (e.homeFlowers ?? 0) > 0 &&
              jsxRuntime.jsxs("section", {
                className: "game-card",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "font-black text-[#4a2c17]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "💐" }),
                      " 阳台收好的鲜花 ×",
                      e.homeFlowers ?? 0,
                    ],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-1 text-[11px] font-bold text-[#b08a6a]",
                    children:
                      "花可以收进背包当花束，见面时当面送给伙伴（好感 +3）；也可以插进花瓶摆在家里（装饰度 +2）。",
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "mt-2 flex gap-2",
                    children: [
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-flowers-bouquet",
                        onClick: () => j(harvestBalconyFlowers(e)),
                        className: "btn-chunky btn-xs btn-pink flex-1",
                        children: "🎀 收进背包当花束",
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-flowers-decor",
                        onClick: () => j(sellBalconyFlowers(e)),
                        className: "btn-chunky btn-xs btn-orange flex-1",
                        children: "🏺 摆进家里当装饰",
                      }),
                    ],
                  }),
                  (e.homeFlowerDecor ?? 0) > 0 &&
                    jsxRuntime.jsxs("p", {
                      className: "mt-1.5 text-[10px] font-bold text-[#6b4226]",
                      children: [
                        "家里已摆装饰花 ×",
                        e.homeFlowerDecor,
                        "（装饰度 +",
                        (e.homeFlowerDecor ?? 0) * 2,
                        "）",
                      ],
                    }),
                  (e.homeBonsai ?? 0) > 0 &&
                    jsxRuntime.jsxs("p", {
                      className: "mt-0.5 text-[10px] font-bold text-[#6b4226]",
                      children: [
                        "家里盆景 ×",
                        e.homeBonsai,
                        "（装饰度 +",
                        (e.homeBonsai ?? 0) * 3,
                        "）",
                      ],
                    }),
                ],
              }),
            jsxRuntime.jsxs("section", {
              className: "game-card",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "font-black text-[#4a2c17]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🌰" }),
                        " 种子盒与肥料",
                      ],
                    }),
                    jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": "btn-buy-fertilizer",
                      onClick: () => j(buyFertilizer(e)),
                      disabled: (e.coins ?? 0) < FERTILIZER_PRICE,
                      className: "btn-chunky btn-xs btn-yellow",
                      children: ["🌿 买小袋肥料 ¥", FERTILIZER_PRICE, "（现有 ×", e.fertilizer ?? 0, "）"],
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-1 text-[11px] font-bold text-[#b08a6a]",
                  children:
                    "种子在「小镇 · 农贸市场」也能买到，这里列出家里已有的种子库存；点「种下」就能种进空花盆。",
                }),
                jsxRuntime.jsxs("div", {
                  className: "mt-2 flex flex-wrap gap-1.5",
                  children: [
                    jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": "seed-cat-all",
                      onClick: () => l("all"),
                      className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${o === "all" ? "border-[#66bb6a] bg-[#e8f5e9] text-[#2e7d32]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                      children: "全部",
                    }),
                    m.map((C) =>
                      jsxRuntime.jsx(
                        "button",
                        {
                          type: "button",
                          "data-testid": `seed-cat-${C}`,
                          onClick: () => l(C),
                          className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${o === C ? "border-[#66bb6a] bg-[#e8f5e9] text-[#2e7d32]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                          children: PLANT_KIND_LABELS[C] ?? C,
                        },
                        C,
                      ),
                    ),
                  ],
                }),
                jsxRuntime.jsx(CollapsibleSection, {
                  title: "🌰 种子库存",
                  summary: `共 ${v.length} 种种子（有 ${Object.values(x).reduce((C, V) => C + V, 0)} 份）`,
                  count: v.length,
                  testId: "sub-collapse-seeds",
                  tone: "#558b2f",
                  children: jsxRuntime.jsx("div", {
                    className: "mt-2 grid grid-cols-2 gap-1.5",
                    children: v.map((C) => {
                      const V = x[C.id] ?? 0,
                        E = MAX_POTS - g.length;
                      return jsxRuntime.jsxs(
                        "div",
                        {
                          className: "rounded-xl bg-[#f1f8e9] px-2 py-1.5",
                          children: [
                            jsxRuntime.jsxs("div", {
                              className: "flex items-center justify-between",
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji text-lg", children: C.emoji }),
                                jsxRuntime.jsxs("span", {
                                  className: "num text-[11px] font-bold text-[#558b2f]",
                                  children: ["x", V],
                                }),
                              ],
                            }),
                            jsxRuntime.jsx("p", {
                              className: "mt-0.5 truncate text-xs font-black text-[#33691e]",
                              children: C.name,
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#7cb342]",
                              children: [PLANT_KIND_LABELS[C.kind], " · ", C.days, " 天 · ¥", C.price],
                            }),
                            jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": `btn-plant-${C.id}`,
                              "aria-label": `把${C.name}种进空花盆，需要 1 份种子${V < 1 ? "，种子不足" : E < 1 ? "，没有空花盆" : ""}`,
                              onClick: () => j(handleFlowerPotAction(e, y(), C.id)),
                              disabled: V < 1 || E < 1,
                              className: "btn-chunky btn-xs btn-green mt-1 w-full",
                              children:
                                V < 1 ? "没种子（农贸市场买）" : E < 1 ? "花盆满了" : "🌱 种下",
                            }),
                          ],
                        },
                        C.id,
                      );
                    }),
                  }),
                }),
                jsxRuntime.jsxs("p", {
                  className:
                    "mt-2 rounded-xl bg-[#e8f5e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#558b2f]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
                    " 种下当天算浇过水；忘记浇水的那天不长进度。肥料可叠加使用，每袋进度 +1。小袋肥料在农贸市场 ¥",
                    FERTILIZER_PRICE,
                    "/袋。",
                  ],
                }),
              ],
            }),
          ],
        }),
        c !== null &&
          jsxRuntime.jsxs(Modal, {
            open: !0,
            title: `🌱 ${c} 号花盆 · 选个种子`,
            onClose: () => u(null),
            children: [
              jsxRuntime.jsxs("p", {
                className: "mb-2 text-xs font-bold text-[#6b4226]",
                children: [
                  "家里有的种子点一下就能种进 ",
                  c,
                  " 号花盆；没有种子就去小镇 · 农贸市场买几袋。",
                ],
              }),
              w.length > 0
                ? jsxRuntime.jsx("div", {
                    className: "grid grid-cols-2 gap-1.5",
                    children: w.map((C) =>
                      jsxRuntime.jsxs(
                        "div",
                        {
                          className: "rounded-xl bg-[#f1f8e9] px-2 py-1.5",
                          children: [
                            jsxRuntime.jsxs("div", {
                              className: "flex items-center justify-between",
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji text-lg", children: C.emoji }),
                                jsxRuntime.jsxs("span", {
                                  className: "num text-[11px] font-bold text-[#558b2f]",
                                  children: ["x", x[C.id] ?? 0],
                                }),
                              ],
                            }),
                            jsxRuntime.jsx("p", {
                              className: "mt-0.5 truncate text-xs font-black text-[#33691e]",
                              children: C.name,
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#7cb342]",
                              children: [PLANT_KIND_LABELS[C.kind], " · ", C.days, " 天"],
                            }),
                            jsxRuntime.jsxs("button", {
                              type: "button",
                              "data-testid": `btn-plant-pot-${c}-${C.id}`,
                              onClick: () => S(c, C.id),
                              className: "btn-chunky btn-xs btn-green mt-1 w-full",
                              children: ["🌱 种进 ", c, " 号盆"],
                            }),
                          ],
                        },
                        C.id,
                      ),
                    ),
                  })
                : jsxRuntime.jsxs("div", {
                    className: "rounded-xl bg-[#fff8e1] px-3 py-4 text-center",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "text-xs font-black text-[#4a2c17]",
                        children: "家里还没有种子",
                      }),
                      jsxRuntime.jsx("p", {
                        className: "mt-1 text-[11px] font-bold text-[#b08a6a]",
                        children: "去小镇 · 农贸市场买几袋种子，回来就能种啦。",
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-plant-modal-close",
                        onClick: () => u(null),
                        className: "btn-chunky btn-xs btn-green mt-2",
                        children: "知道了",
                      }),
                    ],
                  }),
            ],
          }),
      ],
    }),
  );
}
