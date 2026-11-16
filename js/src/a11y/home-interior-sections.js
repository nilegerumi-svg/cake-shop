function HygieneSection({ state: e, commit: n, open: s, onToggle: a }) {
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: s,
        onToggle: a,
        title: "🚿 卫生间",
        right: jsxRuntime.jsxs("span", {
          className: "text-[10px] font-bold text-[#6b4226]",
          children: [
            "卫生 ",
            jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: e.hygiene ?? 100 }),
            "/100 · 今日",
            segmentByEmoji(e.combedToday ? "已梳洗 ✓" : "未梳洗 ⚠️"),
          ],
        }),
      }),
      s &&
        jsxRuntime.jsxs("div", {
          className: "mt-1",
          children: [
            jsxRuntime.jsx("p", {
              className: "text-xs text-[#b08a6a]",
              children:
                "每天早上梳头发+上厕所，维持个人卫生，梳头决定今日发型状态；未梳洗时魅力打折",
            }),
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "btn-home-bathroom",
              onClick: () => {
                const o = washUp(e);
                n(o.state, o.message, o.ok ? "success" : "error");
              },
              disabled: e.combedToday,
              className: "btn-chunky btn-sm btn-brown mt-2 w-full whitespace-normal leading-tight",
              children: e.combedToday
                ? "今日已梳洗 ✓"
                : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsxs("span", {
                        className: "block",
                        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚿" }), " 梳洗"],
                      }),
                      jsxRuntime.jsx("span", {
                        className: "block text-[9px] font-bold opacity-80",
                        children: "（-2 精力）",
                      }),
                    ],
                  }),
            }),
          ],
        }),
    ],
  });
}

function GroomingSection({ state: e, commit: n, open: s, onToggle: a }) {
  var o, l, c, u, f, g, x, m;
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, { open: s, onToggle: a, title: "💇 镜前梳妆" }),
      s &&
        jsxRuntime.jsxs("div", {
          className: "mt-1",
          children: [
            jsxRuntime.jsx("p", {
              className: "text-xs font-bold text-[#b08a6a]",
              children:
                "基础发型在家随时能梳；染烫、编发、盘发等复杂发型要去商店街的理发店做好，做完后也能在这里换上。",
            }),
            jsxRuntime.jsxs("div", {
              className: "mt-2 flex items-center gap-2 rounded-xl bg-[#fff3e6] p-2.5",
              children: [
                jsxRuntime.jsx("span", {
                  className: "emoji text-2xl",
                  children:
                    ((l = HAIRSTYLE_MAP[((o = e.hairstyle) == null ? void 0 : o.equipped) ?? ""]) == null
                      ? void 0
                      : l.emoji) ?? "💇",
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-sm font-black text-[#4a2c17]",
                      children: [
                        "当前发型：",
                        ((u = HAIRSTYLE_MAP[((c = e.hairstyle) == null ? void 0 : c.equipped) ?? ""]) == null
                          ? void 0
                          : u.name) ?? "未设置",
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[10px] font-bold text-[#e65100]",
                      children: [
                        "魅力 +",
                        e.combedToday
                          ? (((g = HAIRSTYLE_MAP[((f = e.hairstyle) == null ? void 0 : f.equipped) ?? ""]) ==
                            null
                              ? void 0
                              : g.charm) ?? 0)
                          : Math.floor(
                              (((m = HAIRSTYLE_MAP[((x = e.hairstyle) == null ? void 0 : x.equipped) ?? ""]) ==
                              null
                                ? void 0
                                : m.charm) ?? 0) / 2,
                            ),
                        !e.combedToday && "（未梳洗减半）",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            jsxRuntime.jsx("div", {
              className: "mt-2 grid grid-cols-2 gap-1.5",
              children: HAIRSTYLES.filter((p) => {
                var y;
                return (
                  p.type === "basic" ||
                  (((y = e.hairstyle) == null ? void 0 : y.owned) ?? []).includes(p.id)
                );
              }).map((p) => {
                var j;
                const y = ((j = e.hairstyle) == null ? void 0 : j.equipped) === p.id;
                return jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-testid": `btn-home-hair-${p.id}`,
                    onClick: () => {
                      const v = applyHairstyle(e, p.id);
                      n(v.state, v.message, v.ok ? "success" : "error");
                    },
                    disabled: y,
                    className: `flex flex-col items-center rounded-xl border-2 p-2 ${y ? "border-[#ff8a65] bg-[#ffe9e3]" : "border-[#f0dcc0] bg-[#fbf3e4]"}`,
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-xl", children: p.emoji }),
                      jsxRuntime.jsxs("p", {
                        className: "mt-0.5 truncate text-xs font-black text-[#4a2c17]",
                        children: [
                          p.name,
                          y && jsxRuntime.jsx("span", { className: "text-[#c62828]", children: " ✓" }),
                        ],
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[9px] font-bold text-[#e04a63]",
                        children: ["魅力 +", p.charm],
                      }),
                    ],
                  },
                  p.id,
                );
              }),
            }),
          ],
        }),
    ],
  });
}

function SleepSection({ state: e, commit: n, open: s, onToggle: a, onSleepOvernight: sleepOvernightAction }) {
  const o = e.home,
    l = o.sleptToday >= 2;
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: s,
        onToggle: a,
        title: "🛏️ 睡觉",
        right: jsxRuntime.jsxs("span", {
          className: "text-[10px] font-bold text-[#b08a6a]",
          children: ["今日 ", o.sleptToday, "/2"],
        }),
      }),
      s &&
        jsxRuntime.jsxs("div", {
          className: "mt-1 space-y-2",
          children: [
            jsxRuntime.jsxs("p", {
              className: "text-xs text-[#b08a6a]",
              children: [
                "小睡：+45 精力，花 1 小时（今日 ",
                o.sleptToday,
                "/2）。一觉睡到明早：直接进入第二天早晨，精力大幅恢复、心情 +6。",
              ],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-home-sleep",
              "aria-label": "小睡一会儿，恢复四十五点精力",
              onClick: () => {
                const c = takeNap(e);
                n(c.state, c.message, c.ok ? "success" : "error");
              },
              disabled: l,
              className: "btn-chunky btn-sm btn-brown w-full",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "💤" }),
                l ? " 今天睡够了" : " 小睡一会儿",
              ],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-home-sleep-overnight",
              "aria-label": "一觉睡到明天早上，直接进入下一天",
              onClick: () => {
                sleepOvernightAction && sleepOvernightAction();
              },
              className: "btn-chunky btn-sm btn-gray w-full",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🌙" }),
                " 一觉睡到明早",
              ],
            }),
          ],
        }),
    ],
  });
}

function CraftingDialog({
  state: e,
  crafting: n,
  materialId: s,
  colorId: a,
  onMaterial: o,
  onColor: l,
  onClose: c,
  onConfirm: u,
}) {
  var f, g, x, m, p, y;
  return jsxRuntime.jsx(Modal, {
    open: n !== null,
    title: "🔨 手工制作",
    onClose: c,
    children:
      n &&
      jsxRuntime.jsxs("div", {
        className: "space-y-4",
        children: [
          jsxRuntime.jsxs("div", {
            className: "rounded-2xl bg-[#fbf3e4] p-3 text-center",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-3xl",
                children: jsxRuntime.jsx("span", {
                  className: "emoji",
                  children: (f = FURNITURE_MAP[n]) == null ? void 0 : f.emoji,
                }),
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 font-black text-[#4a2c17]",
                children: (g = FURNITURE_MAP[n]) == null ? void 0 : g.name,
              }),
              jsxRuntime.jsx("p", {
                className: "text-xs text-[#b08a6a]",
                children: (x = FURNITURE_MAP[n]) == null ? void 0 : x.desc,
              }),
              jsxRuntime.jsxs("p", {
                className:
                  "mt-1 rounded-full bg-[#fff3bf] px-2 py-px text-[11px] font-bold text-[#b8860b]",
                children: ["成功率 ", Math.round(calcCraftChance(e, n) * 100), "%"],
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("p", {
                className: "mb-1.5 text-sm font-black text-[#6b4226]",
                children: "选择材质",
              }),
              jsxRuntime.jsx("div", {
                className: "flex flex-wrap gap-1.5",
                children: WOOD_TYPES.map((j) =>
                  jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-testid": `craft-material-${j.id}`,
                      onClick: () => o(j.id),
                      className: `rounded-full border-2 px-2.5 py-1 text-xs font-bold ${s === j.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: j.emoji }),
                        " ",
                        j.name,
                      ],
                    },
                    j.id,
                  ),
                ),
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("p", {
                className: "mb-1.5 text-sm font-black text-[#6b4226]",
                children: "选择颜料",
              }),
              jsxRuntime.jsx("div", {
                className: "flex flex-wrap gap-1.5",
                children: COLOR_TYPES.map((j) =>
                  jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-testid": `craft-color-${j.id}`,
                      onClick: () => l(j.id),
                      className: `flex items-center gap-1 rounded-full border-2 px-2.5 py-1 text-xs font-bold ${a === j.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "inline-block h-3 w-3 rounded-full",
                          style: { background: j.hex },
                        }),
                        jsxRuntime.jsx("span", { className: "emoji", children: j.emoji }),
                        " ",
                        j.name,
                      ],
                    },
                    j.id,
                  ),
                ),
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "rounded-2xl bg-[#fff0f3] p-3",
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-center text-sm font-black text-[#4a2c17]",
                children: [
                  "即将制作：",
                  (m = WOOD_MAP[s]) == null ? void 0 : m.name,
                  "·",
                  (p = COLOR_MAP[a]) == null ? void 0 : p.name,
                  "的",
                  (y = FURNITURE_MAP[n]) == null ? void 0 : y.name,
                ],
              }),
              jsxRuntime.jsx("p", {
                className: "mt-0.5 text-center text-[11px] text-[#b08a6a]",
                children: "材质与颜料会决定这件家具的描述与外观",
              }),
            ],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-craft-confirm",
            onClick: u,
            className: "btn-chunky btn-pink w-full py-3 text-base",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🔨" }),
              " 开始制作（10 精力）",
            ],
          }),
        ],
      }),
  });
}

function FurnitureCategoryTabs({ title: e, categories: n, value: s, testIdPrefix: a, activeClass: o, onChange: l }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card",
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-2 font-black text-[#4a2c17]",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗂️" }), " ", e],
        }),
        jsxRuntime.jsxs("div", {
          className: "flex flex-wrap gap-1.5",
          children: [
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": `${a}-all`,
              onClick: () => l("all"),
              className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${s === "all" ? o : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: "全部",
            }),
            n.map((c) =>
              jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "data-testid": `${a}-${c}`,
                  onClick: () => l(c),
                  className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${s === c ? o : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                  children: FURNITURE_CATEGORY_LABELS[c] ?? c,
                },
                c,
              ),
            ),
          ],
        }),
      ],
    }),
  );
}

const AUTO_EXPAND_MAX_ITEMS = 8;

function CollapsibleSection({ title: e, summary: n, count: s, defaultOpen: a, testId: o, tone: l, children: c }) {
  const [u, f] = React.useState(() => a ?? (s ?? 0) <= AUTO_EXPAND_MAX_ITEMS),
    g = () => {
      const x = !u;
      (f(x),
        speak(`「${e}」已${x ? "展开" : "收起"}${x ? `，${n}` : s !== void 0 ? `，共 ${s} 项` : ""}`));
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "rounded-xl border border-[#f0dcc0] bg-white/70 px-2.5 py-2",
      children: [
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": o,
          "aria-expanded": u,
          onClick: g,
          className: "flex w-full items-center gap-1.5 text-left active:scale-[0.99]",
          children: [
            jsxRuntime.jsx("span", {
              className: `material-icons shrink-0 text-base transition-transform ${u ? "" : "-rotate-90"}`,
              style: { color: l ?? "#c62828" },
              "aria-hidden": "true",
              children: "expand_more",
            }),
            jsxRuntime.jsx("span", {
              className: "min-w-0 flex-1 truncate text-xs font-black text-[#4a2c17]",
              children: e,
            }),
            u
              ? jsxRuntime.jsx("span", {
                  className: "shrink-0 text-[10px] font-bold text-[#b08a6a]",
                  children: "收起",
                })
              : jsxRuntime.jsxs("span", {
                  className: "shrink-0 text-[10px] font-bold text-[#b08a6a]",
                  children: [n, " · 展开"],
                }),
          ],
        }),
        u && jsxRuntime.jsx("div", { className: "mt-1.5", children: c }),
      ],
    }),
  );
}

const FLOOR_IDS = ["1f", "2f", "3f", "b1"];

function PlacedFurnitureList({ state: e, furnCat: n, furnKind: s, floor: a, onTogglePlace: o, onMoveFloor: l }) {
  const c = new Set(e.shopPlacements),
    u = e.home.furniture
      .map((f, g) => ({ f, i: g }))
      .filter(({ f }) => {
        const g = FURNITURE_MAP[f.fid];
        return !g || (g.size ?? "big") !== s || (n !== "all" && g.category !== n)
          ? !1
          : getFloor(f) === a;
      });
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card",
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-1 font-black text-[#4a2c17]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🛋️" }),
            " 已拥有的",
            s === "big" ? "大家具" : "装饰小家具",
            jsxRuntime.jsxs("span", {
              className:
                "ml-1.5 rounded-full bg-[#f3e3cb] px-2 py-0.5 text-[10px] font-black text-[#6b4226]",
              children: ["本层 · ", FLOOR_LABELS[a]],
            }),
          ],
        }),
        jsxRuntime.jsxs("p", {
          className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
          children: [
            "家具按楼层摆放、不同楼层不通用：这里只显示",
            a === "1f" ? " 1F 店面·厨房" : a === "2f" ? " 2F 卧室·阳台" : " 3F 书房·收藏",
            "的家具；想搬去其他楼层点下面的「1F/2F/3F」。想买新家具？去「小镇 · 商店街 · 家具店」；手工材料也都在那里买。",
            s === "small" && " 装饰小家具可以摆进店铺，也能放进水族缸装饰。",
          ],
        }),
        u.length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-2 text-center text-sm text-[#b08a6a]",
              children: "这一层还空荡荡的，买一件或亲手做一件，或去其他楼层看看",
            })
          : jsxRuntime.jsx(CollapsibleSection, {
              title: `🛋️ 已拥有的${s === "big" ? "大家具" : "装饰小家具"}`,
              summary: `本层 ${u.length} 件`,
              count: u.length,
              testId: `sub-collapse-owned-${a}-${s}`,
              tone: "#6b4226",
              children: jsxRuntime.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: u.map(({ f, i: g }) => {
                  var v, w;
                  const x = FURNITURE_MAP[f.fid];
                  if (!x) return null;
                  const m = COLOR_MAP[f.color],
                    p = makePlacementId(f.fid, g),
                    y = c.has(p),
                    j = getFloor(f);
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: "rounded-xl bg-[#fbf3e4] p-2.5",
                      children: [
                        jsxRuntime.jsx("p", {
                          className: "text-center text-2xl",
                          children: jsxRuntime.jsx("span", { className: "emoji", children: x.emoji }),
                        }),
                        jsxRuntime.jsx("p", {
                          className: "mt-1 truncate text-center text-xs font-black text-[#4a2c17]",
                          children: f.desc,
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-center text-[10px] font-bold text-[#b08a6a]",
                          children: [
                            FURNITURE_CATEGORY_LABELS[x.category] ?? x.category,
                            " · ",
                            jsxRuntime.jsx("span", {
                              className: "emoji",
                              children: (v = WOOD_MAP[f.material]) == null ? void 0 : v.emoji,
                            }),
                            " ",
                            (w = WOOD_MAP[f.material]) == null ? void 0 : w.name,
                            " · ",
                            jsxRuntime.jsx("span", {
                              className: "emoji",
                              children: m == null ? void 0 : m.emoji,
                            }),
                            " ",
                            m == null ? void 0 : m.name,
                            f.crafted &&
                              jsxRuntime.jsx("span", { className: "text-[#e04a63]", children: " · 手作" }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          className: "mt-1.5 flex items-center justify-center gap-1",
                          children: [
                            jsxRuntime.jsx("span", {
                              className: "text-[9px] font-black text-[#b08a6a]",
                              children: "楼层",
                            }),
                            FLOOR_IDS.map((N) =>
                              jsxRuntime.jsx(
                                "button",
                                {
                                  type: "button",
                                  "data-testid": `btn-furniture-floor-${p}-${N}`,
                                  onClick: () => l(g, N),
                                  disabled: j === N,
                                  className: `rounded-md px-1.5 py-0.5 text-[9px] font-black ${j === N ? "bg-[#ff6b81] text-white" : "border border-[#e8cfae] bg-white text-[#6b4226]"}`,
                                  children: N.toUpperCase(),
                                },
                                N,
                              ),
                            ),
                          ],
                        }),
                        jsxRuntime.jsx("button", {
                          type: "button",
                          "data-testid": `btn-place-${p}`,
                          onClick: () => o(p),
                          className: `btn-chunky btn-xs mt-1.5 w-full ${y ? "btn-yellow" : "btn-ghost"}`,
                          children: y ? `🏪 在店铺（装饰 +${x.decor ?? 0}）` : "🏪 摆进店铺",
                        }),
                      ],
                    },
                    `${f.fid}-${g}`,
                  );
                }),
              }),
            }),
      ],
    }),
  );
}

function AquariumSection({ state: e, commit: n, floor: s }) {
  var j;
  const a = e.aquariumFish === !0,
    o = e.aquariumDirty === !0,
    l = e.aquariumLastFeedDay === e.day,
    c = e.fishFeed ?? 0,
    u = (e.aquariumLastFeedDay ?? 0) > 0 && e.day - (e.aquariumLastFeedDay ?? 0) > 1,
    f = e.home.furniture.find((v) => AQUARIUM_FURNITURE_IDS.includes(v.fid) && (!s || getFloor(v) === s)),
    g = f ? (((j = FURNITURE_MAP[f.fid]) == null ? void 0 : j.name) ?? "水族缸") : "水族缸",
    x = calcAquariumDecorScore(e),
    m = countAquariumDecor(e),
    p = hasAllAquariumDecor(e),
    y = e.home.furniture
      .map((v, w) => {
        var N;
        return {
          f: v,
          def: FURNITURE_MAP[v.fid],
          color: ((N = COLOR_MAP[v.color]) == null ? void 0 : N.name) ?? "",
          key: `${v.fid}_${w}`,
        };
      })
      .filter((v) => !!v.def && v.def.category === "aqua_decor")
      .filter((v) => !s || getFloor(v.f) === s || (e.aquariumDecor ?? []).includes(v.key));
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card",
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-1 font-black text-[#4a2c17]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🐠" }),
            " ",
            g,
            " · 观赏度 ",
            x,
          ],
        }),
        jsxRuntime.jsxs("p", {
          className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
          children: [
            "夜市捞金鱼摊捞到金鱼选「带回家」，金鱼就住进这里。鱼饲料 ¥",
            FISH_FEED_PRICE,
            "/份：夜市捞金鱼摊、河边渔具摊都有卖。在水族缸里摆上彩色鹅卵石、水草、小桥（≥3 件）观赏度更高，金鱼也更精神（每日健康损耗减半）。",
          ],
        }),
        a
          ? jsxRuntime.jsxs("div", {
              className: "space-y-1 rounded-xl bg-[#e3f2fd] p-2",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-xs font-black text-[#0d47a1]",
                  children: [
                    "🐟 金鱼健康度 ",
                    e.aquariumHealth ?? 0,
                    "/100 · 缸清洁度 ",
                    e.aquariumCleanliness ?? 0,
                    "/100",
                  ],
                }),
                jsxRuntime.jsxs("p", {
                  className: "text-[10px] font-bold leading-relaxed text-[#0d47a1]",
                  children: [
                    o
                      ? "🧹 缸该清理了！缸太脏，金鱼每天都会掉健康"
                      : l
                        ? "🍚 今天喂过啦，金鱼吃得饱饱的"
                        : "🍽️ 今天还没喂食",
                    u && " · 缺食太久，金鱼每天都会掉健康",
                    p && " · ✨ 装饰满啦：金鱼每日健康损耗减半",
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  className: "flex flex-wrap gap-1.5 pt-1",
                  children: [
                    jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": "btn-aquarium-feed",
                      onClick: () => {
                        const v = feedAquariumFish(e);
                        n(v.state, v.message, v.ok ? "success" : "error");
                      },
                      disabled: l || c < 1,
                      className: "btn-chunky btn-xs btn-orange",
                      children: ["🍚 喂食（每天一次 · 鱼饲料 ×", c, "）"],
                    }),
                    jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": "btn-aquarium-clean",
                      onClick: () => {
                        const v = cleanAquarium(e);
                        n(v.state, v.message, v.ok ? "success" : "error");
                      },
                      className: "btn-chunky btn-xs btn-green",
                      children: "🧹 清理（+30 清洁度）",
                    }),
                    jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": "btn-aquarium-cook",
                      onClick: () => {
                        const v = cookAquariumFish(e);
                        n(v.state, v.message, v.ok ? "success" : "error");
                      },
                      className: "btn-chunky btn-xs btn-orange",
                      children: "🔪 捞出做菜",
                    }),
                  ],
                }),
              ],
            })
          : jsxRuntime.jsxs("div", {
              className: "space-y-1 rounded-xl bg-[#e8f1fb] p-2",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-xs font-black text-[#0d47a1]",
                  children: ["缸里空空的 · 清洁度 ", e.aquariumCleanliness ?? 0, "/100"],
                }),
                jsxRuntime.jsx("p", {
                  className: "text-[10px] font-bold leading-relaxed text-[#0d47a1]",
                  children: o
                    ? "🧹 缸该清理了！清理干净才能捞新鱼住进来"
                    : "去夜市捞金鱼摊捞一条，选「带回家」就能养在这里",
                }),
                jsxRuntime.jsx("div", {
                  className: "flex flex-wrap gap-1.5 pt-1",
                  children: jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-aquarium-clean",
                    onClick: () => {
                      const v = cleanAquarium(e);
                      n(v.state, v.message, v.ok ? "success" : "error");
                    },
                    className: "btn-chunky btn-xs btn-green",
                    children: "🧹 清理（+30 清洁度）",
                  }),
                }),
              ],
            }),
        jsxRuntime.jsxs("div", {
          className: "mt-2 rounded-xl bg-[#fff3e0] p-2",
          children: [
            jsxRuntime.jsx("p", { className: "text-xs font-black text-[#6b4226]", children: "🪸 缸内装饰" }),
            jsxRuntime.jsxs("p", {
              className: "mt-0.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
              children: [
                "摆进缸里的装饰件（在「装饰小家具 · 缸内装饰」里买，颜色可选）能提升观赏度；已布置 ",
                m,
                "/3 · 满 3 件金鱼健康损耗减半。",
              ],
            }),
            y.length === 0
              ? jsxRuntime.jsx("p", {
                  className: "py-1.5 text-center text-[11px] font-bold text-[#b08a6a]",
                  children: "还没有缸内装饰，去家具店买点彩色鹅卵石、水草或小桥摆件吧",
                })
              : jsxRuntime.jsx("div", {
                  className: "mt-1 space-y-1",
                  children: y.map(({ def: v, color: w, key: N }) => {
                    const S = (e.aquariumDecor ?? []).includes(N);
                    return jsxRuntime.jsxs(
                      "div",
                      {
                        className: "flex gap-2 rounded-lg bg-[#fffaf3] px-2 py-1.5",
                        children: [
                          jsxRuntime.jsx("div", {
                            className: "flex w-[20%] shrink-0 items-center justify-center",
                            children: jsxRuntime.jsx("span", {
                              className: "emoji text-lg",
                              children: v.emoji,
                            }),
                          }),
                          jsxRuntime.jsxs("div", {
                            className: "min-w-0 flex-1",
                            children: [
                              jsxRuntime.jsxs("div", {
                                children: [
                                  jsxRuntime.jsxs("p", {
                                    className: "text-[11px] font-black text-[#4a2c17]",
                                    children: [
                                      v.name,
                                      w &&
                                        jsxRuntime.jsxs("span", {
                                          className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                                          children: ["· ", w],
                                        }),
                                    ],
                                  }),
                                  jsxRuntime.jsx("p", {
                                    className: "text-[9px] text-[#b08a6a]",
                                    children: v.desc,
                                  }),
                                ],
                              }),
                              jsxRuntime.jsx("div", {
                                className: "mt-1 flex flex-wrap items-center gap-1.5",
                                children: jsxRuntime.jsx("button", {
                                  type: "button",
                                  "data-testid": `btn-aquarium-decor-${N}`,
                                  onClick: () => {
                                    const C = toggleAquariumDecor(e, N);
                                    n(C.state, C.message, C.ok ? "success" : "error");
                                  },
                                  className: `btn-chunky btn-xs ${S ? "btn-yellow" : "btn-ghost"}`,
                                  children: S ? "取出" : "放进缸里",
                                }),
                              }),
                            ],
                          }),
                        ],
                      },
                      N,
                    );
                  }),
                }),
          ],
        }),
      ],
    }),
  );
}

function CraftRecipeCard({ furniture: e, state: n, isOpen: s, onToggleFold: a, onCraft: o }) {
  const l = n.home,
    c = Math.round(calcCraftChance(n, e.id) * 100),
    u = Object.entries(e.materials ?? {}).some(([x, m]) => (l.materials[x] ?? 0) < m),
    f = Object.entries(e.materials ?? {})
      .map(([x, m]) => {
        const p = l.materials[x] ?? 0,
          y = MATERIAL_MAP[x];
        return `${(y == null ? void 0 : y.emoji) ?? ""}${(y == null ? void 0 : y.name) ?? x} ${p}/${m}`;
      })
      .join(" · "),
    g = f.length > 14;
  return jsxRuntime.jsxs("div", {
    className: "flex flex-col rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-2.5",
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
              jsxRuntime.jsxs("p", {
                className: "mt-0.5 text-[10px] font-bold leading-snug text-[#e65100]",
                children: ["难度 Lv.", e.level, " · ", FURNITURE_CATEGORY_LABELS[e.category] ?? e.category],
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: `mt-1.5 text-[11px] font-bold leading-snug text-[#b08a6a] ${g && !s ? "line-clamp-2" : ""}`,
        children: f,
      }),
      g &&
        jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": `btn-fold-craft-${e.id}`,
          onClick: () => a(e.id),
          className: "mt-0.5 self-start text-[10px] font-black text-[#e04a63]",
          children: s ? "收起 ▲" : "展开 ▼",
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
            "data-testid": `btn-craft-${e.id}`,
            onClick: () => o(e.id),
            disabled: u,
            className: "btn-chunky btn-xs btn-brown",
            children: "制作",
          }),
        ],
      }),
    ],
  });
}

function FurnitureCatalogGrid({
  state: e,
  furnCat: n,
  furnKind: s,
  expanded: a,
  onCat: o,
  onToggleFold: l,
  onCraft: c,
}) {
  const u = FURNITURE_GAME.filter((g) => (g.size ?? "big") === s),
    f = Array.from(new Set(u.map((g) => g.category)));
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsxs("div", {
          className: "mb-2 flex flex-wrap gap-1",
          children: [
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "craft-cat-all",
              onClick: () => o("all"),
              className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${n === "all" ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: "全部",
            }),
            f.map((g) =>
              jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "data-testid": `craft-cat-${g}`,
                  onClick: () => o(g),
                  className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${n === g ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                  children: FURNITURE_CATEGORY_LABELS[g] ?? g,
                },
                g,
              ),
            ),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "grid grid-cols-2 gap-2",
          children: u
            .filter((g) => g.materials && (n === "all" || g.category === n))
            .map((g) =>
              jsxRuntime.jsx(
                CraftRecipeCard,
                { furniture: g, state: e, isOpen: !!a[g.id], onToggleFold: l, onCraft: c },
                g.id,
              ),
            ),
        }),
      ],
    }),
  );
}

function DecorShowcaseCard({ decor: e }) {
  return jsxRuntime.jsxs("section", {
    className: "game-card border-[#ffc53d]/30",
    style: { background: "linear-gradient(135deg,#fff8e1,#ffecb3)" },
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          jsxRuntime.jsxs("p", {
            className: "font-black text-[#b8860b]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛋️" }), " 店铺装修"],
          }),
          jsxRuntime.jsxs("span", {
            className:
              "num rounded-full bg-[#fff3bf] px-2.5 py-1 text-sm font-black text-[#b8860b]",
            children: ["装饰度 ", e],
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-1 text-[11px] font-bold leading-relaxed text-[#a08030]",
        children:
          "家具和家里通用，把拥有的家具「摆进店铺」即可提升店铺装饰度 → 店铺魅力提升、成交率更高，睡觉回复的心情也更多。",
      }),
    ],
  });
}

function MaterialStorageSummary({ state: e }) {
  const n = e.home;
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsx("p", {
        className: "mb-1 text-sm font-black text-[#6b4226]",
        children: "材料仓（按分类）",
      }),
      jsxRuntime.jsx("div", {
        className: "mb-3 grid grid-cols-2 gap-2",
        children: MATERIALS.map((s) => {
          const a = n.materials[s.id] ?? 0;
          return jsxRuntime.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 rounded-xl bg-[#f3e3cb] px-2.5 py-2",
              children: [
                jsxRuntime.jsx("span", { className: "emoji text-base leading-none", children: s.emoji }),
                jsxRuntime.jsxs("span", {
                  className: "min-w-0 flex-1 text-[11px] font-black text-[#6b4226]",
                  children: [s.name, " ", jsxRuntime.jsxs("span", { className: "num", children: ["x", a] })],
                }),
                jsxRuntime.jsx("span", {
                  className: "shrink-0 text-[9px] font-bold text-[#b08a6a]",
                  children: INGREDIENT_CATEGORY_LABELS[s.category] ?? s.category,
                }),
              ],
            },
            s.id,
          );
        }),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🛒" }),
          " 材料不够？去「商店街 · 家具店」就能买到木料、钉子、颜料等手工材料。",
        ],
      }),
    ],
  });
}

function FloorFurnishingPanel({ state: e, commit: n, floor: s, open: a, onToggle: o, mode: l }) {
  const [c, u] = React.useState("big"),
    [f, g] = React.useState("all"),
    [x, m] = React.useState(null),
    [p, y] = React.useState("pine"),
    [j, v] = React.useState("natural"),
    [w, N] = React.useState({}),
    S = e.home,
    C = Array.from(new Set(FURNITURE_GAME.filter((P) => (P.size ?? "big") === c).map((P) => P.category))),
    V = getFurnitureLevel(e),
    E = calcDecorScore(e),
    F = S.furniture.some((P) => AQUARIUM_FURNITURE_IDS.includes(P.fid) && getFloor(P) === s),
    J = (P) => {
      const ne = toggleShopPlacement(e, P);
      n(ne.state, ne.message, ne.ok ? "success" : "error");
    },
    H = (P, ne) => {
      const D = placeFurniture(e, P, ne);
      n(D.state, D.message, D.ok ? "success" : "info");
    },
    R = (P) => {
      (m(P), y("pine"), v("natural"));
    },
    se = jsxRuntime.jsxs("section", {
      className: "game-card",
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-2 font-black text-[#4a2c17]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🧰" }),
            " ",
            s === "1f" ? "家具大类" : `本层家具 · ${FLOOR_LABELS[s]}`,
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "flex flex-wrap gap-1.5",
          children: [
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "furniture-kind-big",
              onClick: () => {
                (u("big"), g("all"));
              },
              className: `rounded-full border-2 px-3 py-1 text-xs font-black ${c === "big" ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: "🛋️ 大家具",
            }),
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "furniture-kind-small",
              onClick: () => {
                (u("small"), g("all"));
              },
              className: `rounded-full border-2 px-3 py-1 text-xs font-black ${c === "small" ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: "🎀 装饰小家具",
            }),
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "mt-1.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children:
            c === "big"
              ? "桌椅、收纳、灯具、床具、水族缸等大件家具。家具按楼层摆放：床/梳妆/衣柜在 2F，桌椅/收银台在 1F，书架/书桌在 3F，水族缸等装饰大件可自选楼层。"
              : "桌布、摆件、挂饰、缸内装饰等小物件，不占大位置，摆进店铺同样提升装饰度；缸内装饰还能摆进水族缸。",
        }),
      ],
    }),
    be = jsxRuntime.jsx(FurnitureCategoryTabs, {
      title: `${c === "big" ? "大家具" : "装饰小家具"}分类`,
      categories: C,
      value: f,
      testIdPrefix: "furniture-cat",
      activeClass: "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]",
      onChange: g,
    }),
    Ie = jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        be,
        jsxRuntime.jsx(PlacedFurnitureList, {
          state: e,
          furnCat: f,
          furnKind: c,
          floor: s,
          onTogglePlace: J,
          onMoveFloor: H,
        }),
        F && jsxRuntime.jsx(AquariumSection, { state: e, commit: n, floor: s }),
      ],
    }),
    xe = (P) =>
      jsxRuntime.jsxs("section", {
        className: "game-card",
        children: [
          jsxRuntime.jsxs("p", {
            className: "mb-1 font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🔨" }), " 手工制作"],
          }),
          jsxRuntime.jsxs("p", {
            className: "mb-2 text-xs text-[#b08a6a]",
            children: [
              "消耗材料制作家具，成功率 = 家具等级 Lv.",
              V,
              "（+",
              V * 5,
              "%）+ 工具熟练度 ",
              S.toolSkill,
              "（+",
              Math.round((S.toolSkill / 100) * 20),
              "%）+ 材料理解度 ",
              S.materialKnowledge,
              "（+",
              Math.round((S.materialKnowledge / 100) * 20),
              "%）+ 工具加成 ",
              bestToolBonus(e),
              "%",
            ],
          }),
          P && jsxRuntime.jsx(MaterialStorageSummary, { state: e }),
          jsxRuntime.jsx(FurnitureCatalogGrid, {
            state: e,
            furnCat: f,
            furnKind: c,
            expanded: w,
            onCat: g,
            onToggleFold: (ne) => N((D) => ({ ...D, [ne]: !D[ne] })),
            onCraft: R,
          }),
        ],
      }),
    ye =
      s === "1f" &&
      jsxRuntime.jsx(CraftingDialog, {
        state: e,
        crafting: x,
        materialId: p,
        colorId: j,
        onMaterial: y,
        onColor: v,
        onClose: () => m(null),
        onConfirm: () => {
          if (!x) return;
          const P = craftFurniture(e, x, p, j);
          (P.ok && P.success && m(null),
            n(P.state, P.message, P.ok ? (P.success ? "success" : "info") : "error"));
        },
      });
  return l === "owned"
    ? jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [s === "1f" && jsxRuntime.jsx(DecorShowcaseCard, { decor: E }), se, Ie] })
    : l === "material"
      ? jsxRuntime.jsxs("section", {
          className: "game-card",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1 font-black text-[#4a2c17]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "📦" }),
                " 家具材料 · 材料理解度",
              ],
            }),
            jsxRuntime.jsxs("p", {
              className: "mb-2 text-[11px] font-bold leading-relaxed text-[#b08a6a]",
              children: [
                "材料理解度 ",
                jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: S.materialKnowledge }),
                "：理解度越高，手工制作成功率越高（每 100 点 +20%）。 工具熟练度 ",
                jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: S.toolSkill }),
                " 同样加成制作成功率（每 100 点 +20%）；做家具、用工具都会积累这两项。",
              ],
            }),
            jsxRuntime.jsx(MaterialStorageSummary, { state: e }),
          ],
        })
      : l === "craft"
        ? jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [xe(!1), ye] })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsxs(CardSection, {
                title: s === "1f" ? "🧰 家具大类与手工制作" : `🧰 本层家具 · ${FLOOR_LABELS[s]}`,
                open: a,
                onToggle: o,
                right:
                  s === "1f"
                    ? void 0
                    : jsxRuntime.jsxs("span", {
                        className: "text-[10px] font-bold text-[#b08a6a]",
                        children: ["本层 ", S.furniture.filter((P) => getFloor(P) === s).length, " 件"],
                      }),
                children: [
                  s === "1f" && jsxRuntime.jsx(DecorShowcaseCard, { decor: E }),
                  se,
                  Ie,
                  s === "1f"
                    ? xe(!0)
                    : jsxRuntime.jsxs("p", {
                        className:
                          "rounded-xl bg-[#f3e3cb]/70 px-3 py-2 text-[11px] font-bold leading-relaxed text-[#6b4226]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🔨" }),
                          " 制作新家具请到 1F 店面·厨房的家具工坊；新家具会自动摆放到它的默认楼层，也可以在这里把它们搬去其他楼层。",
                        ],
                      }),
                ],
              }),
              ye,
            ],
          });
}
