function FishDexPage({ state: e }) {
  var g, x;
  const [n, s] = React.useState(null),
    a = n ? (FISH_SIZE_RIVER.find((m) => m.ingId === n) ?? null) : null,
    o = a ? INGREDIENT_MAP[a.ingId] : null,
    l = a ? (((g = e.fishRecords) == null ? void 0 : g[a.ingId]) ?? 0) : 0,
    c = a ? (((x = e.shrimpCatchCount) == null ? void 0 : x[a.ingId]) ?? 0) : 0,
    u = FISH_SIZE_RIVER.filter((m) => {
      var p;
      return (((p = e.fishRecords) == null ? void 0 : p[m.ingId]) ?? 0) > 0;
    }).length,
    f = FISH_SIZE_RIVER.length;
  return jsxRuntime.jsxs("div", {
    className: "mt-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-1.5 flex items-start gap-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🦐" }),
              " 虾类图鉴：记录每种虾捞到/买到过的最大尺寸与累计获得次数。河边浅滩能徒手捞到河虾、白虾、小龙虾，运气好还有罗氏沼虾；虾仁和虾皮在商店/市场买。捞到更大的虾会自动刷新纪录。点条目看详情。",
            ],
          }),
          jsxRuntime.jsx(SpeakButton, {
            text: "虾类图鉴：记录每种虾捞到或买到过的最大尺寸与累计获得次数。河边浅滩能徒手捞到河虾、白虾、小龙虾，运气好还有罗氏沼虾；虾仁和虾皮在商店或市场买。捞到更大的虾会自动刷新纪录。点条目查看详情。",
            label: "朗读",
            testId: "codex-shrimp-intro-speak",
            className: "btn-xs shrink-0",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 overflow-hidden rounded-2xl border-2 border-[#f8bbd0] bg-[#fffdf8]",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex items-center gap-2 border-b-2 border-[#fce4ec] px-2.5 py-2",
            children: [
              jsxRuntime.jsx("span", {
                className: "text-base leading-none",
                children: jsxRuntime.jsx("span", { className: "emoji", children: "🦐" }),
              }),
              jsxRuntime.jsxs("p", {
                className: "min-w-0 flex-1 text-xs font-black text-[#ad1457]",
                children: [
                  "虾类收集",
                  jsxRuntime.jsxs("span", {
                    className: "ml-1 text-[9px] font-bold text-[#d81b60]",
                    children: ["已点亮 ", u, "/", f],
                  }),
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "bar-track mx-2.5 mt-2",
            role: "progressbar",
            "aria-label": "虾类图鉴收集进度",
            "aria-valuemin": 0,
            "aria-valuemax": f,
            "aria-valuenow": u,
            children: jsxRuntime.jsx("div", {
              className: "bar-fill bg-[#f48fb1]",
              style: { width: `${f > 0 ? (u / f) * 100 : 0}%` },
            }),
          }),
          jsxRuntime.jsx("div", {
            className: "grid grid-cols-2 gap-1.5 p-2.5",
            children: FISH_SIZE_RIVER.map((m) => {
              var S, C;
              const p = INGREDIENT_MAP[m.ingId],
                y = ((S = e.fishRecords) == null ? void 0 : S[m.ingId]) ?? 0,
                j = ((C = e.shrimpCatchCount) == null ? void 0 : C[m.ingId]) ?? 0,
                v = y > 0,
                w =
                  m.source === "river"
                    ? "🏞️ 河边徒手捞"
                    : m.source === "market"
                      ? "🦐 市场"
                      : "🏪 商店",
                N = v
                  ? `${(p == null ? void 0 : p.name) ?? m.ingId}，尺寸 ${m.minCm} 到 ${m.maxCm} 厘米，个人纪录 ${y} 厘米，累计获得 ${j} 次。${m.note}`
                  : "未获得的神秘虾类";
              return jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `codex-shrimp-${m.ingId}`,
                  "aria-label": N,
                  onClick: () => s(m.ingId),
                  className: `rounded-xl p-2 text-left active:scale-[0.97] ${v ? "bg-[#fce4ec]" : "bg-[#f3e3cb] opacity-70"}`,
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        jsxRuntime.jsx("div", {
                          className: "flex w-[20%] shrink-0 items-center justify-center",
                          children: jsxRuntime.jsx("span", {
                            className: "emoji text-xl",
                            children: (p == null ? void 0 : p.emoji) ?? "🦐",
                          }),
                        }),
                        jsxRuntime.jsx("div", {
                          className: "min-w-0 flex-1",
                          children: jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("p", {
                                className: "text-xs font-black text-[#ad1457]",
                                children: v ? ((p == null ? void 0 : p.name) ?? m.ingId) : "？？？",
                              }),
                              jsxRuntime.jsxs("p", {
                                className: "text-[9px] font-bold text-[#d81b60]",
                                children: [
                                  segmentByEmoji(`${w} · ${m.minCm}-${m.maxCm}cm`),
                                  jsxRuntime.jsx("span", {
                                    className: `ml-1 rounded-full px-1.5 py-px text-[9px] font-black ${v ? "bg-white text-[#ad1457]" : "bg-[#e8d9c3] text-[#8a6a4a]"}`,
                                    children: v
                                      ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                          children: [
                                            jsxRuntime.jsx("span", { className: "emoji", children: "📏" }),
                                            " 纪录 ",
                                            y,
                                            "cm",
                                          ],
                                        })
                                      : "？？？",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className:
                        "mt-1 flex items-center gap-1 text-[9px] font-bold leading-relaxed text-[#f06292]",
                      children: [
                        jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: m.note }),
                        jsxRuntime.jsx("span", {
                          className:
                            "shrink-0 rounded-full bg-[#fce4ec] px-1.5 py-px text-[8px] font-black text-[#d81b60]",
                          children: "详情 ›",
                        }),
                      ],
                    }),
                    v &&
                      jsxRuntime.jsxs("p", {
                        className: "mt-0.5 text-[9px] font-black text-[#e04a63]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🎣" }),
                          " 累计获得 ",
                          j,
                          " 次",
                        ],
                      }),
                  ],
                },
                m.ingId,
              );
            }),
          }),
        ],
      }),
      a &&
        o &&
        jsxRuntime.jsx(Modal, {
          open: !0,
          title: `${o.emoji} ${o.name}`,
          onClose: () => s(null),
          children: jsxRuntime.jsxs("div", {
            className: "space-y-2",
            children: [
              jsxRuntime.jsx("p", {
                className:
                  "rounded-2xl bg-[#fce4ec] p-3 text-center text-sm font-black leading-relaxed text-[#ad1457]",
                children: a.note,
              }),
              jsxRuntime.jsxs("div", {
                className: "space-y-1 text-center",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "text-[11px] font-bold text-[#4a2c17]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "📏" }),
                      " 常见尺寸 ",
                      a.minCm,
                      "-",
                      a.maxCm,
                      "cm",
                    ],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[11px] font-bold text-[#d81b60]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🏅" }),
                      " 个人纪录 ",
                      l > 0 ? `${l}cm` : "尚未捞到/买到",
                    ],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[11px] font-black text-[#e04a63]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🎣" }),
                      " 累计获得 ",
                      c,
                      " 次",
                    ],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[11px] font-bold text-[#6b4226]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "📍" }),
                      " 获取途径：",
                      a.source === "river"
                        ? "河边浅滩徒手捞虾"
                        : a.source === "market"
                          ? "农贸市场购买"
                          : "商店购买",
                    ],
                  }),
                  a.ingId === "crayfish" &&
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-bold text-[#e65100]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "☀️" }),
                        " 夏天（立夏～立秋）小龙虾更活跃，更容易捞到",
                      ],
                    }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "flex justify-center",
                children: jsxRuntime.jsx(SpeakButton, {
                  text: `${o.name}。${a.note} 常见尺寸${a.minCm}到${a.maxCm}厘米。个人纪录${l > 0 ? l + "厘米" : "尚未捞到或买到"}。累计获得${c}次。获取途径：${a.source === "river" ? "河边浅滩徒手捞虾" : a.source === "market" ? "农贸市场购买" : "商店购买"}。`,
                  label: "朗读详情",
                  testId: `codex-shrimp-detail-speak-${a.ingId}`,
                  className: "btn-xs",
                }),
              }),
            ],
          }),
        }),
    ],
  });
}

function FishDexHint({ state: e }) {
  return jsxRuntime.jsxs("div", {
    className: "mt-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-1.5 flex items-start gap-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "📜" }),
              " 食谱图鉴：已研发的会显示完整信息，没研发的是灰色谜题。甜点在蛋糕店研发，家常料理在厨房研发，部分食谱要靠看书或伙伴赠送解锁。",
            ],
          }),
          jsxRuntime.jsx(SpeakButton, {
            text: "食谱图鉴：已研发的会显示完整信息，没研发的是灰色谜题。甜点在蛋糕店研发，家常料理在厨房研发，部分食谱要靠看书或伙伴赠送解锁。",
            label: "朗读",
            testId: "codex-recipe-intro-speak",
            className: "btn-xs shrink-0",
          }),
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: RECIPES_ALL.map((n) => {
          const s = n.id in (e.recipes ?? {});
          return jsxRuntime.jsxs(
            "div",
            {
              "data-testid": `codex-recipe-${n.id}`,
              className: `rounded-xl p-2 ${s ? "bg-[#ffe9ef]" : "bg-[#f3e3cb] opacity-70"}`,
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex gap-2",
                  children: [
                    jsxRuntime.jsx("div", {
                      className: "flex w-[20%] shrink-0 items-center justify-center",
                      children: jsxRuntime.jsx("span", {
                        className: "emoji text-xl",
                        children: s ? n.emoji : "🔒",
                      }),
                    }),
                    jsxRuntime.jsx("div", {
                      className: "min-w-0 flex-1",
                      children: jsxRuntime.jsxs("div", {
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "text-xs font-black text-[#4a2c17]",
                            children: [
                              s ? n.name : "？？？",
                              s &&
                                jsxRuntime.jsxs("span", {
                                  className:
                                    "ml-1 rounded-full bg-white px-1.5 py-px text-[9px] font-black text-[#e04a63]",
                                  children: [
                                    "Lv.",
                                    Math.min(5, Math.floor((e.recipes[n.id] ?? 0) / 20)),
                                  ],
                                }),
                            ],
                          }),
                          jsxRuntime.jsx("p", {
                            className: "text-[9px] font-bold text-[#b08a6a]",
                            children: s
                              ? `${n.category}${n.subcategory ? " · " + n.subcategory : ""}`
                              : "尚未研发",
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
                s &&
                  jsxRuntime.jsxs("p", {
                    className: "mt-1 text-[9px] font-bold leading-relaxed text-[#b08a6a]",
                    children: [
                      "食材 ",
                      Object.entries(n.ings)
                        .map(([a, o]) => {
                          var l;
                          return `${((l = INGREDIENT_MAP[a]) == null ? void 0 : l.name) ?? a}x${o}`;
                        })
                        .join(" "),
                    ],
                  }),
                s &&
                  n.desc &&
                  jsxRuntime.jsxs("p", {
                    className:
                      "mt-1 flex items-center gap-1 text-[9px] leading-relaxed text-[#a67c52]",
                    children: [
                      jsxRuntime.jsxs("span", {
                        className: "min-w-0 flex-1",
                        children: ["「", n.desc, "」"],
                      }),
                      jsxRuntime.jsx(SpeakButton, {
                        text: `${n.name}：${n.desc}`,
                        label: "",
                        ariaLabel: `朗读${n.name}介绍`,
                        testId: `codex-recipe-desc-speak-${n.id}`,
                        className: "btn-xs shrink-0",
                      }),
                    ],
                  }),
              ],
            },
            n.id,
          );
        }),
      }),
    ],
  });
}

function TOOL_TAB_GROUPS({ state: e, openCats: n, onToggleCat: s }) {
  const a = [
    {
      key: "hand",
      label: "🔨 手工工具",
      list: CRAFT_TOOLS,
      ownedOf: (o) => {
        var l;
        return (((l = e.home) == null ? void 0 : l.tools) ?? []).includes(o.id);
      },
      skillOf: (o) => {
        var l, c;
        return (
          ((c = (l = e.home) == null ? void 0 : l.toolSkillMap) == null ? void 0 : c[o.id]) ?? 0
        );
      },
      color: "#b8860b",
      priceNote: (o) => (o.price ? `¥${o.price} 购入` : "开局自带"),
    },
    {
      key: "cook",
      label: "🍳 厨具",
      list: COOKWARES,
      ownedOf: (o) => (e.cookwares ?? []).includes(o.id),
      skillOf: (o) => {
        var l;
        return ((l = e.cookwareSkill) == null ? void 0 : l[o.id]) ?? 0;
      },
      color: "#e04a63",
      priceNote: (o) => (o.price ? `¥${o.price} 购入` : "开局自带"),
    },
    {
      key: "sew",
      label: "✂️ 缝纫工具",
      list: SEWING_TOOLS_GAME,
      ownedOf: (o) => (e.sewingTools ?? []).includes(o.id),
      skillOf: () => 0,
      color: "#ad1457",
      priceNote: (o) => (o.price ? `¥${o.price} 购入` : "开局自带"),
    },
  ];
  return jsxRuntime.jsxs("div", {
    className: "mt-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-1.5 flex items-start gap-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🛠️" }),
              " 工具图鉴分三组：手工工具、厨具、缝纫工具，点标题可以折叠/展开。基础工具开局自带，进阶的在商店街买；每件工具/厨具都有自己的熟练度，用得多才更顺手。",
            ],
          }),
          jsxRuntime.jsx(SpeakButton, {
            text: "工具图鉴分三组：手工工具、厨具、缝纫工具，点标题可以折叠或展开。基础工具开局自带，进阶的在商店街买；每件工具或厨具都有自己的熟练度，用得多才更顺手。",
            label: "朗读",
            testId: "codex-tool-intro-speak",
            className: "btn-xs shrink-0",
          }),
        ],
      }),
      a.map((o) => {
        const l = o.list.filter((u) => o.ownedOf(u)).length,
          c = n[o.key] ?? !1;
        return jsxRuntime.jsxs(
          "div",
          {
            className: "mb-2 overflow-hidden rounded-2xl border-2 border-[#f0dcc0] bg-[#fffdf8]",
            children: [
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": `codex-tool-cat-${o.key}`,
                "aria-expanded": c,
                onClick: () => s(o.key),
                className:
                  "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
                children: [
                  jsxRuntime.jsxs("span", {
                    className: "min-w-0 flex-1 text-xs font-black text-[#4a2c17]",
                    children: [
                      o.label,
                      jsxRuntime.jsxs("span", {
                        className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                        children: ["已拥有 ", l, "/", o.list.length],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("span", {
                    "aria-hidden": "true",
                    className: `shrink-0 text-sm font-black text-[#b08a6a] transition-transform duration-200 ${c ? "" : "-rotate-90"}`,
                    children: "▾",
                  }),
                ],
              }),
              c &&
                jsxRuntime.jsx("div", {
                  className: "grid grid-cols-2 gap-1.5 px-2 pb-2",
                  children: o.list.map((u) => {
                    const f = o.ownedOf(u),
                      g = o.skillOf(u);
                    return jsxRuntime.jsx(
                      "div",
                      {
                        "data-testid": `codex-tool-${u.id}`,
                        className: `rounded-xl p-2 ${f ? "bg-[#fbf3e4]" : "bg-[#f3e3cb] opacity-70"}`,
                        children: jsxRuntime.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            jsxRuntime.jsx("div", {
                              className: "flex w-[20%] shrink-0 items-center justify-center",
                              children: jsxRuntime.jsx("span", {
                                className: "emoji text-xl",
                                children: f ? u.emoji : "❓",
                              }),
                            }),
                            jsxRuntime.jsx("div", {
                              className: "min-w-0 flex-1",
                              children: jsxRuntime.jsxs("div", {
                                children: [
                                  jsxRuntime.jsxs("p", {
                                    className: "text-xs font-black text-[#4a2c17]",
                                    children: [
                                      f ? u.name : "？？？",
                                      f &&
                                        g > 0 &&
                                        jsxRuntime.jsxs("span", {
                                          className: "num ml-1 text-[10px] font-black",
                                          style: { color: o.color },
                                          children: [g, "/100"],
                                        }),
                                    ],
                                  }),
                                  jsxRuntime.jsx("p", {
                                    className: "text-[9px] font-bold text-[#b08a6a]",
                                    children: f
                                      ? u.price !== void 0
                                        ? o.priceNote(u)
                                        : `成功率 +${u.bonus}%`
                                      : "尚未获得",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      },
                      u.id,
                    );
                  }),
                }),
            ],
          },
          o.key,
        );
      }),
    ],
  });
}

function buildNpcFilterProps(e) {
  return {
    areaSel: e.areaSel,
    genderSel: e.genderSel,
    ageSel: e.ageSel,
    onClearArea: () => e.setAreaSel([]),
    onClearGender: () => e.setGenderSel([]),
    onClearAge: () => e.setAgeSel([]),
    onToggleArea: (n) => e.setAreaSel((s) => e.toggleSel(s, n)),
    onToggleGender: (n) => e.setGenderSel((s) => e.toggleSel(s, n)),
    onToggleAge: (n) => e.setAgeSel((s) => e.toggleSel(s, n)),
  };
}

const NPC_AREA_OPTIONS = ["居民区", "别墅区", "学校", "动物收容所", "其他"],
  areaLabelOf = (e) =>
    e === "居民区"
      ? "🏘️ 居民区"
      : e === "别墅区"
        ? "🏰 别墅区"
        : e === "学校"
          ? "🏫 学校"
          : e === "动物收容所"
            ? "🐶 收容所"
            : "📍 其他",
  chipClass = (e, n) =>
    `rounded-full border-2 px-2.5 py-1 text-[10px] font-black active:scale-95 ${e ? n : "border-[#f0dcc0] bg-white text-[#6b4226]"}`;

function NpcFilterBar({
  prefix: e,
  variant: n = "plain",
  areas: s = NPC_AREA_OPTIONS,
  areaLabel: a = areaLabelOf,
  areaSel: o,
  genderSel: l,
  ageSel: c,
  onClearArea: u,
  onToggleArea: f,
  onClearGender: g,
  onToggleGender: x,
  onClearAge: m,
  onToggleAge: p,
}) {
  const y = jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsxs("p", {
            className: "mb-1 text-[10px] font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "📍" }), " 按居住地筛选"],
          }),
          jsxRuntime.jsxs("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `${e}-filter-area-all`,
                "aria-pressed": o.length === 0,
                onClick: u,
                className: chipClass(o.length === 0, "border-[#7c3aed] bg-[#f3e8ff] text-[#c62828]"),
                children: "全部居住地",
              }),
              s.map((j) =>
                jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    "data-testid": `${e}-filter-area-${j}`,
                    "aria-pressed": o.includes(j),
                    onClick: () => f(j),
                    className: chipClass(o.includes(j), "border-[#7c3aed] bg-[#f3e8ff] text-[#c62828]"),
                    children: a(j),
                  },
                  j,
                ),
              ),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsxs("p", {
            className: "mb-1 text-[10px] font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "👫" }), " 按性别筛选"],
          }),
          jsxRuntime.jsxs("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `${e}-filter-gender-all`,
                "aria-pressed": l.length === 0,
                onClick: g,
                className: chipClass(l.length === 0, "border-[#e65100] bg-[#ffe9e3] text-[#e65100]"),
                children: "全部性别",
              }),
              ["男", "女"].map((j) =>
                jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    "data-testid": `${e}-filter-gender-${j}`,
                    "aria-pressed": l.includes(j),
                    onClick: () => x(j),
                    className: chipClass(l.includes(j), "border-[#e65100] bg-[#ffe9e3] text-[#e65100]"),
                    children: j === "男" ? "👨 男" : "👩 女",
                  },
                  j,
                ),
              ),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsxs("p", {
            className: "mb-1 text-[10px] font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎂" }), " 按年龄段筛选"],
          }),
          jsxRuntime.jsxs("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `${e}-filter-age-all`,
                "aria-pressed": c.length === 0,
                onClick: m,
                className: chipClass(c.length === 0, "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]"),
                children: "全部年龄段",
              }),
              AGE_GROUPS.map((j) =>
                jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    "data-testid": `${e}-filter-age-${j}`,
                    "aria-pressed": c.includes(j),
                    onClick: () => p(j),
                    className: chipClass(c.includes(j), "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]"),
                    children: j === "儿童" ? "🧒 儿童" : j === "成人" ? "🧑 成人" : "👴 老人",
                  },
                  j,
                ),
              ),
            ],
          }),
        ],
      }),
    ],
  });
  return n === "card"
    ? renderWithSpeech(jsxRuntime.jsx("section", { className: "game-card", children: y }))
    : jsxRuntime.jsx("div", {
        className: "space-y-2 rounded-2xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-2",
        children: y,
      });
}

const NPC_AREA_ORDER = ["居民区", "别墅区", "学校", "动物收容所", "其他"];

function NpcGroupedByArea({ state: e, filter: n }) {
  const { filteredChars: s } = n,
    a = (() => {
      const o = new Map();
      for (const l of s) {
        const c = n.areaOf(l);
        (o.has(c) || o.set(c, []), o.get(c).push(l));
      }
      return [...o.entries()].sort((l, c) => {
        const u = NPC_AREA_ORDER.indexOf(l[0]),
          f = NPC_AREA_ORDER.indexOf(c[0]);
        return (u === -1 ? 99 : u) - (f === -1 ? 99 : f);
      });
    })();
  return jsxRuntime.jsxs("div", {
    className: "mt-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-1.5 flex items-start gap-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "💞" }),
              " 角色关系图鉴：按居住地址分类展示小镇伙伴们的住址与关系网。已认识的角色点亮，未认识的是问号——按时间表去公共场合碰面吧。可按居住地、性别、年龄段筛选。",
            ],
          }),
          jsxRuntime.jsx(SpeakButton, {
            text: "角色关系图鉴：按居住地址分类展示小镇伙伴们的住址与关系网。已认识的角色点亮，未认识的是问号，按时间表去公共场合碰面吧。可按居住地、性别、年龄段筛选。",
            label: "朗读",
            testId: "codex-relation-intro-speak",
            className: "btn-xs shrink-0",
          }),
        ],
      }),
      jsxRuntime.jsx("div", { className: "mb-2", children: jsxRuntime.jsx(NpcFilterBar, { ...buildNpcFilterProps(n), prefix: "codex" }) }),
      s.length === 0
        ? jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#f3e3cb] px-2.5 py-2 text-center text-[10px] font-bold text-[#8a6a4a]",
            children: "没有符合条件的伙伴：换个居住地、性别或年龄段试试，或点「全部」清除筛选。",
          })
        : jsxRuntime.jsx("div", {
            className: "space-y-2.5",
            children: a.map(([o, l]) =>
              jsxRuntime.jsxs(
                "div",
                {
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "mb-1 text-[11px] font-black text-[#7e57c2]",
                      children: [
                        o === "居民区"
                          ? jsxRuntime.jsx("span", { className: "emoji", children: "🏘️" })
                          : o === "别墅区"
                            ? jsxRuntime.jsx("span", { className: "emoji", children: "🏰" })
                            : o === "学校"
                              ? jsxRuntime.jsx("span", { className: "emoji", children: "🏫" })
                              : o === "动物收容所"
                                ? jsxRuntime.jsx("span", { className: "emoji", children: "🐶" })
                                : jsxRuntime.jsx("span", { className: "emoji", children: "📍" }),
                        " ",
                        o,
                        jsxRuntime.jsxs("span", {
                          className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                          children: [l.length, " 人"],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "grid grid-cols-1 gap-1.5",
                      children: l.map((c) => {
                        const u = EMPLOYEES.some((m) => m.id === c.id),
                          f = (e.metNpcs ?? []).includes(c.id) || (u && e.employees.includes(c.id)),
                          g = NPC_RESIDENCE[c.id],
                          x = NPC_BIOS[c.id] ?? [];
                        return jsxRuntime.jsxs(
                          "div",
                          {
                            "data-testid": `codex-relation-${c.id}`,
                            className: `rounded-xl p-2 ${f ? "bg-[#f3e5f5]" : "bg-[#f3e3cb] opacity-70"}`,
                            children: [
                              jsxRuntime.jsxs("div", {
                                className: "flex gap-2",
                                children: [
                                  jsxRuntime.jsx("div", {
                                    className: "flex w-[20%] shrink-0 items-center justify-center",
                                    children: jsxRuntime.jsx("span", {
                                      className: "emoji text-xl",
                                      children: f ? c.emoji : "❓",
                                    }),
                                  }),
                                  jsxRuntime.jsx("div", {
                                    className: "min-w-0 flex-1",
                                    children: jsxRuntime.jsxs("div", {
                                      children: [
                                        jsxRuntime.jsxs("p", {
                                          className: "text-xs font-black text-[#4a2c17]",
                                          children: [
                                            f ? c.name : "？？？",
                                            jsxRuntime.jsx("span", {
                                              className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                                              children: f ? c.title : "尚未见面",
                                            }),
                                          ],
                                        }),
                                        jsxRuntime.jsxs("p", {
                                          className: "text-[9px] font-bold text-[#7e57c2]",
                                          children: [
                                            f
                                              ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                                  children: [
                                                    jsxRuntime.jsx("span", {
                                                      className: "emoji",
                                                      children: "📍",
                                                    }),
                                                    " ",
                                                    g ? `${g.area}·${g.detail}` : c.place,
                                                  ],
                                                })
                                              : `出现地点：${c.place}`,
                                            jsxRuntime.jsx("span", {
                                              className: `ml-1 rounded-full px-1.5 py-px text-[9px] font-black ${f ? "bg-[#e3f2fd] text-[#c62828]" : "bg-[#e8d9c3] text-[#8a6a4a]"}`,
                                              children: f
                                                ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                                    children: [
                                                      jsxRuntime.jsx("span", {
                                                        className: "emoji",
                                                        children: "✅",
                                                      }),
                                                      " 已认识",
                                                    ],
                                                  })
                                                : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                                    children: [
                                                      jsxRuntime.jsx("span", {
                                                        className: "emoji",
                                                        children: "🕐",
                                                      }),
                                                      " 未认识",
                                                    ],
                                                  }),
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                              f &&
                                x.length > 0 &&
                                jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-1 text-[9px] font-bold leading-relaxed text-[#8d6e63]",
                                  children: [
                                    jsxRuntime.jsx("span", { className: "emoji", children: "🔗" }),
                                    " ",
                                    x.join(" · "),
                                  ],
                                }),
                            ],
                          },
                          c.id,
                        );
                      }),
                    }),
                  ],
                },
                o,
              ),
            ),
          }),
    ],
  });
}

const CODEX_TABS = [
  { id: "food", label: "🍎 食材" },
  { id: "fish", label: "🐟 鱼类" },
  { id: "shrimp", label: "🦐 虾类" },
  { id: "recipe", label: "📜 食谱" },
  { id: "tool", label: "🛠️ 工具" },
  { id: "relation", label: "💞 关系" },
];

function CodexPanel({ state: e, filter: n, open: s, onToggle: a, codexTab: o, onCodexTabChange: l }) {
  const [c, u] = React.useState("food"),
    f = o ?? c,
    g = (j) => {
      l ? l(j) : u(j);
    },
    [x, m] = React.useState({ grain: !0 }),
    [p, y] = React.useState({ hand: !0 });
  return jsxRuntime.jsxs(StatusCard, {
    id: "codex",
    title: "图鉴",
    emoji: "📖",
    titleColor: "#4a2c17",
    badge: jsxRuntime.jsx("span", {
      className: "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
      children: "收集进度一目了然",
    }),
    open: s,
    onToggle: a,
    children: [
      jsxRuntime.jsx("div", {
        className: "flex flex-wrap gap-1.5",
        children: CODEX_TABS.map((j) =>
          jsxRuntime.jsx(
            "button",
            {
              type: "button",
              "data-testid": `codex-tab-${j.id}`,
              "aria-pressed": f === j.id,
              onClick: () => g(j.id),
              className: `rounded-full border-2 px-2.5 py-1 text-[11px] font-black active:scale-95 ${f === j.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: j.label,
            },
            j.id,
          ),
        ),
      }),
      f === "food" &&
        jsxRuntime.jsx(FishCollectionPanel, {
          state: e,
          openCats: x,
          onToggleCat: (j) => m((v) => ({ ...v, [j]: !(v[j] ?? !1) })),
        }),
      f === "fish" && jsxRuntime.jsx(FishSizePanel, { state: e }),
      f === "shrimp" && jsxRuntime.jsx(FishDexPage, { state: e }),
      f === "recipe" && jsxRuntime.jsx(FishDexHint, { state: e }),
      f === "tool" &&
        jsxRuntime.jsx(TOOL_TAB_GROUPS, {
          state: e,
          openCats: p,
          onToggleCat: (j) => y((v) => ({ ...v, [j]: !(v[j] ?? !1) })),
        }),
      f === "relation" && jsxRuntime.jsx(NpcGroupedByArea, { state: e, filter: n }),
    ],
  });
}

function buildFamilyRelations(e) {
  const n = {
      lover: new Set(),
      parents: new Set(),
      children: new Set(),
      siblings: new Set(),
      bestFriends: new Set(),
      friends: new Set(),
      eternalFriends: new Set(),
    },
    s = NPC_FAMILY_TREE[e];
  s &&
    [
      "lover",
      "parents",
      "children",
      "siblings",
      "bestFriends",
      "friends",
      "eternalFriends",
    ].forEach((o) => {
      for (const l of s[o] ?? []) n[o].add(l);
    });
  for (const [o, l] of Object.entries(NPC_FAMILY_TREE))
    o !== e &&
      [
        "lover",
        "parents",
        "children",
        "siblings",
        "bestFriends",
        "friends",
        "eternalFriends",
      ].forEach((c) => {
        (l[c] ?? []).includes(e) &&
          n[
            {
              lover: "lover",
              parents: "children",
              children: "parents",
              siblings: "siblings",
              bestFriends: "bestFriends",
              friends: "friends",
              eternalFriends: "eternalFriends",
            }[c]
          ].add(o);
      });
  const a = NPC_PARTNER_MAP[e];
  return (
    a && n.lover.add(a.partner),
    Object.fromEntries(Object.entries(n).map(([o, l]) => [o, [...l]]))
  );
}

function getHighAffectionNpcIds(e) {
  const n = NPC_ALL.filter((l) => (e.affection[l.id] ?? 0) >= 60).map((l) => l.id),
    s = NPC_IDS.filter((l) => (e.affection[l] ?? 0) >= 15),
    a = NPC_ALL.filter((l) => {
      const c = e.affection[l.id] ?? 0;
      return c >= 40 && c < 60;
    }).map((l) => l.id),
    o = NPC_ALL.filter((l) => {
      const c = e.affection[l.id] ?? 0;
      return c >= 5 && c < 40;
    }).map((l) => l.id);
  return { lover: n, children: s, best: a, friends: o };
}

function NpcRelationChip({ npcId: e, met: n, onSelect: s }) {
  const a = NPC_ALL.find((l) => l.id === e);
  if (!a) return null;
  const o = NPC_PARTNER_MAP[e];
  return jsxRuntime.jsxs("button", {
    type: "button",
    "data-testid": `tree-person-${e}`,
    onClick: () => s(e),
    className: `flex min-w-0 items-center gap-1.5 rounded-xl border-2 px-2 py-1.5 text-left active:scale-95 ${n ? "border-[#f0dcc0] bg-[#fffdf8]" : "border-[#eee0cc] bg-[#f7efe2] opacity-80"}`,
    children: [
      jsxRuntime.jsx("span", { className: "emoji text-lg leading-none", children: n ? a.emoji : "❓" }),
      jsxRuntime.jsxs("span", {
        className: "min-w-0 flex-1",
        children: [
          jsxRuntime.jsxs("span", {
            className: "block text-[11px] font-black text-[#4a2c17]",
            children: [
              n ? a.name : "？？？",
              o &&
                jsxRuntime.jsx("span", {
                  className: "ml-0.5 text-[10px]",
                  children:
                    o.label === "已婚"
                      ? jsxRuntime.jsx("span", { className: "emoji", children: "💍" })
                      : jsxRuntime.jsx("span", { className: "emoji", children: "❤️" }),
                }),
            ],
          }),
          jsxRuntime.jsx("span", {
            className: "block text-[9px] font-bold text-[#b08a6a]",
            children: n ? a.title : "尚未认识",
          }),
        ],
      }),
      jsxRuntime.jsx("span", {
        "aria-hidden": "true",
        className: "shrink-0 text-[10px] font-black text-[#e04a63]",
        children: "›",
      }),
    ],
  });
}

const RESIDENCE_NAMES = ["梧桐里小区", "安康苑小区", "文苑小区", "苏记老宅", "听澜别墅", "学生宿舍"];

function groupNpcsByArea({
  catKey: e,
  title: n,
  ids: s,
  emoji: a,
  color: o,
  empty: l,
  open: c,
  onToggle: u,
  onSelect: f,
  metOf: g,
}) {
  const x = (() => {
    var p;
    const m = new Map();
    for (const y of s) {
      const j = ((p = NPC_RESIDENCE[y]) == null ? void 0 : p.detail) ?? "其他";
      (m.has(j) || m.set(j, []), m.get(j).push(y));
    }
    return [...m.entries()].sort((y, j) => {
      const v = RESIDENCE_NAMES.indexOf(y[0]),
        w = RESIDENCE_NAMES.indexOf(j[0]);
      return (v === -1 ? 99 : v) - (w === -1 ? 99 : w);
    });
  })();
  return jsxRuntime.jsxs(
    "div",
    {
      className: "overflow-hidden rounded-2xl border-2 border-[#c8e6c9] bg-white/80",
      children: [
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": `tree-cat-${e}`,
          "aria-expanded": c,
          onClick: u,
          className: "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji text-base leading-none", children: a }),
            jsxRuntime.jsx("span", {
              className: "min-w-0 flex-1",
              children: jsxRuntime.jsx("span", {
                className: "block truncate text-xs font-black",
                style: { color: o },
                children: n,
              }),
            }),
            jsxRuntime.jsxs("span", {
              className:
                "shrink-0 rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-black text-[#b8860b]",
              children: [s.length, " 人"],
            }),
            jsxRuntime.jsx("span", {
              "aria-hidden": "true",
              className: `shrink-0 text-sm font-black transition-transform duration-200 ${c ? "" : "-rotate-90"}`,
              style: { color: o },
              children: "▾",
            }),
          ],
        }),
        c &&
          jsxRuntime.jsx("div", {
            className: "px-2 pb-2",
            children:
              s.length === 0
                ? jsxRuntime.jsx("p", {
                    className:
                      "rounded-xl bg-[#fbf3e4] px-2.5 py-2 text-center text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                    children: l,
                  })
                : x.map(([m, p]) =>
                    jsxRuntime.jsxs(
                      "div",
                      {
                        className: "mb-2 last:mb-0",
                        children: [
                          jsxRuntime.jsxs("p", {
                            className:
                              "mb-1 flex items-center gap-1.5 text-[10px] font-black text-[#558b2f]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }),
                              jsxRuntime.jsx("span", { className: "truncate", children: m }),
                              jsxRuntime.jsxs("span", {
                                className:
                                  "shrink-0 rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-black text-[#b8860b]",
                                children: [p.length, " 人"],
                              }),
                            ],
                          }),
                          jsxRuntime.jsx("div", {
                            className: "grid grid-cols-2 gap-1.5",
                            children: p.map((y) =>
                              jsxRuntime.jsx(NpcRelationChip, { npcId: y, met: g(y), onSelect: f }, y),
                            ),
                          }),
                        ],
                      },
                      m,
                    ),
                  ),
          }),
      ],
    },
    e,
  );
}
