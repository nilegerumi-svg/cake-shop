function HomeFurniturePanel({ state: e, commit: n }) {
  var l;
  const s = e.home.furniture.map((c, u) => ({ f: c, i: u })).filter(({ f: c }) => getFloor(c) === "b1"),
    a = new Map();
  for (const c of s) {
    const u = ((l = FURNITURE_MAP[c.f.fid]) == null ? void 0 : l.category) ?? "other",
      f = a.get(u) ?? [];
    (f.push(c), a.set(u, f));
  }
  const o = (c, u) => {
    const f = placeFurniture(e, c, u);
    n(f.state, f.message, f.ok ? "success" : "info");
  };
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    "data-testid": "home-b1-warehouse",
    children: [
      jsxRuntime.jsxs("p", {
        className: "font-black text-[#4a2c17]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "📦" }),
          " B1 地下室 · 家具仓库",
          jsxRuntime.jsxs("span", {
            className:
              "ml-1.5 rounded-full bg-[#f3e3cb] px-2 py-0.5 text-[10px] font-black text-[#6b4226]",
            children: ["共 ", s.length, " 件"],
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-1 text-[11px] font-bold leading-relaxed text-[#b08a6a]",
        children:
          "未摆放到任何楼层/店铺的家具自动存放在这里；地下室是纯仓库，不能摆放或布置。想重新用家具，点「1F/2F/3F」搬回对应楼层。",
      }),
      s.length === 0
        ? jsxRuntime.jsx("p", {
            className: "mt-2 rounded-xl bg-[#fbf3e4] px-3 py-2 text-xs font-bold text-[#8a6a4a]",
            children:
              "地下室空空的，所有家具都已摆放在楼层或店铺里；在其它楼层把家具「撤到 B1」就会回到这里。",
          })
        : jsxRuntime.jsx("div", {
            className: "mt-2 space-y-2",
            children: [...a.entries()].map(([c, u]) => {
              var f;
              return jsxRuntime.jsxs(
                "div",
                {
                  className: "rounded-xl bg-[#fbf3e4] p-2",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-xs font-black text-[#6b4226]",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "emoji",
                          children: ((f = FURNITURE_MAP[u[0].f.fid]) == null ? void 0 : f.emoji) ?? "🪑",
                        }),
                        " ",
                        FURNITURE_CATEGORY_LABELS[c] ?? c,
                        " · ",
                        u.length,
                        " 件",
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1 space-y-1",
                      children: u.map(({ f: g, i: x }) => {
                        const m = FURNITURE_MAP[g.fid];
                        return jsxRuntime.jsxs(
                          "div",
                          {
                            className: "flex gap-2 rounded-lg bg-white/70 px-2 py-1.5",
                            children: [
                              jsxRuntime.jsx("div", {
                                className: "flex w-[20%] shrink-0 items-center justify-center",
                                children: jsxRuntime.jsx("span", {
                                  className: "emoji text-lg",
                                  children: (m == null ? void 0 : m.emoji) ?? "🪑",
                                }),
                              }),
                              jsxRuntime.jsxs("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                  jsxRuntime.jsx("div", {
                                    children: jsxRuntime.jsx("p", {
                                      className: "text-[11px] font-black text-[#4a2c17]",
                                      children: (m == null ? void 0 : m.name) ?? g.fid,
                                    }),
                                  }),
                                  jsxRuntime.jsx("div", {
                                    className: "mt-1 flex flex-wrap items-center gap-1",
                                    children: ["1f", "2f", "3f"].map((p) =>
                                      jsxRuntime.jsx(
                                        "button",
                                        {
                                          type: "button",
                                          "data-testid": `btn-b1-move-${x}-${p}`,
                                          "aria-label": `把${(m == null ? void 0 : m.name) ?? g.fid}搬到${p.toUpperCase()}`,
                                          onClick: () => o(x, p),
                                          className:
                                            "rounded-md border border-[#e8cfae] bg-white px-1.5 py-0.5 text-[9px] font-black text-[#6b4226] active:scale-95",
                                          children: p.toUpperCase(),
                                        },
                                        p,
                                      ),
                                    ),
                                  }),
                                ],
                              }),
                            ],
                          },
                          `${g.fid}-${x}`,
                        );
                      }),
                    }),
                  ],
                },
                c,
              );
            }),
          }),
    ],
  });
}

function getFloorDefaults(e) {
  switch (e) {
    case "kitchen":
    case "furniture":
      return { floor: "1f", m1: e, m2: "bedroom", m3: "study" };
    case "bedroom":
    case "balcony":
      return { floor: "2f", m1: "store", m2: e, m3: "study" };
    case "study":
    case "collection":
      return { floor: "3f", m1: "store", m2: "bedroom", m3: e };
    default:
      return { floor: "1f", m1: "store", m2: "bedroom", m3: "study" };
  }
}

function HomePanel({ state: e, commit: n, onGoTab: s, homeFocus: a, onSleepOvernight: sleepOvernightAction }) {
  var H;
  const [o, l] = React.useState("1f"),
    [c, u] = React.useState("store"),
    [f, g] = React.useState("bedroom"),
    [x, m] = React.useState("study"),
    [p, y] = React.useState({
      interact: !1,
      bath: !0,
      makeup: !1,
      sleep: !0,
      game: !1,
      balcony: !0,
      furniture2: !1,
      book: !1,
      tools: !1,
      sewing: !1,
      collection: !1,
      furniture3: !1,
      roof: !0,
    }),
    j = (R) => y((se) => ({ ...se, [R]: !se[R] })),
    v = (a == null ? void 0 : a.token) ?? 0,
    w = a == null ? void 0 : a.module;
  React.useEffect(() => {
    const R = getFloorDefaults(w);
    (l(R.floor), u(R.m1), g(R.m2), m(R.m3));
  }, [v, w]);
  const N = e.home,
    S = moodTier(e.mood),
    C = getFurnitureLevel(e),
    V = e.floorLights ?? {},
    E = o === "b1" ? !0 : V[o] !== !1,
    F = isNightHour(e.hour) && !E,
    J = () => {
      var be;
      const R = { ...V };
      R[o] = !E;
      const se = ((be = FLOOR_OVERVIEW_TABS.find((Ie) => Ie.id === o)) == null ? void 0 : be.label) ?? o;
      n({ ...e, floorLights: R }, E ? `🌙 ${se} 灯已关` : `💡 ${se} 灯已开`, "info");
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx("div", {
          className: "grid grid-cols-5 gap-1.5",
          style: { gridTemplateColumns: "repeat(auto-fit, minmax(104px, 1fr))" },
          children: FLOOR_OVERVIEW_TABS.map((R) =>
            jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                "data-testid": `home-floor-${R.id}`,
                "aria-pressed": o === R.id,
                "aria-label": `${R.label}，${R.hint}`,
                onClick: () => {
                  (o !== R.id && speak(`已切换到${R.label}，${R.hint}`), l(R.id));
                },
                className: `flex flex-col items-center justify-center rounded-xl border-2 px-1.5 py-2 text-center transition-colors ${o === R.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                children: [
                  jsxRuntime.jsx("span", {
                    className: "material-icons",
                    style: { fontSize: 18 },
                    "aria-hidden": "true",
                    children: R.icon,
                  }),
                  jsxRuntime.jsx("span", {
                    /* 字号跟 --fs（玩家字体缩放）走，别用未生成的 Tailwind 任意值类 */
                    className: "mt-0.5 block font-black",
                    style: { fontSize: "calc(12px * var(--fs))", lineHeight: 1.1 },
                    children: R.code,
                  }),
                  jsxRuntime.jsx("span", {
                    className: "mt-1 block font-black",
                    style: { fontSize: "calc(9px * var(--fs))", lineHeight: 1.28 },
                    children: R.name,
                  }),
                ],
              },
              R.id,
            ),
          ),
        }),
        jsxRuntime.jsx("p", {
          /* v31：这行提示原本是浅棕字直接压在深红条纹背景上，对比度不足
             （实测 2.4:1）。改成浅色药丸底 + 深棕字，任何背景下都读得清。 */
          className:
            "-mt-2 mx-auto rounded-lg px-2.5 py-1 text-center font-bold leading-snug shadow-sm",
          style: {
            width: "fit-content",
            maxWidth: "100%",
            background: "#fff8e1",
            color: "#6b3a1c",
            fontSize: "calc(10px * var(--fs))",
          },
          children: (H = FLOOR_OVERVIEW_TABS.find((R) => R.id === o)) == null ? void 0 : H.hint,
        }),
        o === "1f" &&
          jsxRuntime.jsxs("section", {
            className: "game-card",
            children: [
              jsxRuntime.jsxs("div", {
                className: "flex items-center justify-between gap-1.5",
                children: [
                  jsxRuntime.jsxs("p", {
                    /* v31：标题原先没有字号类，继承到 32px 后与右侧统计挤在一行，
                       两边各自折行（「我的/家」「本层 5 件·/9 件」）。 */
                    className: "min-w-0 flex-1 truncate font-black",
                    style: { fontSize: "calc(13px * var(--fs))", color: "#4a2c17" },
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }), " 我的小家"],
                  }),
                  jsxRuntime.jsxs("span", {
                    className: "shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 font-bold",
                    style: {
                      fontSize: "calc(9px * var(--fs))",
                      background: "#f3e3cb",
                      color: "#6b4226",
                    },
                    children: ["本层 ", countFurnitureOnFloor(e, o), "/", N.furniture.length, " 件"],
                  }),
                ],
              }),
              jsxRuntime.jsxs("div", {
                className: "tm-home-stats mt-2 grid grid-cols-3 gap-2 text-center",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl bg-[#fbf3e4] p-2",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "whitespace-nowrap font-bold",
                        style: { fontSize: "calc(10px * var(--fs))", color: "#b08a6a" },
                        children: "家具等级",
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "num whitespace-nowrap font-black",
                        style: { fontSize: "calc(15px * var(--fs))", color: "#4a2c17" },
                        children: ["Lv.", C, "/10"],
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl bg-[#fbf3e4] p-2",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "whitespace-nowrap font-bold",
                        style: { fontSize: "calc(10px * var(--fs))", color: "#b08a6a" },
                        children: "工具熟练度",
                      }),
                      jsxRuntime.jsx("p", {
                        className: "num whitespace-nowrap font-black",
                        style: { fontSize: "calc(15px * var(--fs))", color: "#4a2c17" },
                        children: N.toolSkill,
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl bg-[#fbf3e4] p-2",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "whitespace-nowrap font-bold",
                        style: { fontSize: "calc(10px * var(--fs))", color: "#b08a6a" },
                        children: "材料理解度",
                      }),
                      jsxRuntime.jsx("p", {
                        className: "num whitespace-nowrap font-black",
                        style: { fontSize: "calc(15px * var(--fs))", color: "#4a2c17" },
                        children: N.materialKnowledge,
                      }),
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsxs("div", {
                /* v31：原来 flex + flexWrap:"wrap" 让「耗精力会掉心情」被挤成
                   第二行、正好压在进度条上（截图里「元气/满满」「100/1/00」）。
                   改成「一行数值 + 一行进度条」的定式布局。 */
                className: "mt-2 rounded-xl bg-[#ffe9ef] px-3 py-2",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "emoji",
                        style: { fontSize: "calc(14px * var(--fs))" },
                        children: S.emoji,
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "min-w-0 flex-1 truncate font-black",
                        style: { fontSize: "calc(11px * var(--fs))", color: "#e04a63" },
                        children: [S.label, " ", e.mood, "/", MAX_MOOD],
                      }),
                      jsxRuntime.jsx("span", {
                        className: "shrink-0 whitespace-nowrap font-bold",
                        style: { fontSize: "calc(8px * var(--fs))", color: "#8a6a4a" },
                        children: "耗精力会掉心情",
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "bar-track mt-1",
                    role: "progressbar",
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-valuenow": Math.round((e.mood / MAX_MOOD) * 100),
                    "aria-label": `${S.label} ${e.mood}/${MAX_MOOD}`,
                    children: jsxRuntime.jsx("div", {
                      className: "bar-fill",
                      style: {
                        width: `${Math.round((e.mood / MAX_MOOD) * 100)}%`,
                        background: `linear-gradient(90deg,#ffb3c1,${S.color})`,
                      },
                    }),
                  }),
                ],
              }),
            ],
          }),
        o !== "b1" &&
          jsxRuntime.jsxs("section", {
            className: "game-card flex items-center justify-between gap-2",
            "data-testid": `home-light-${o}`,
            children: [
              jsxRuntime.jsxs("p", {
                className: "min-w-0 flex-1 text-[11px] font-black leading-tight text-[#4a2c17]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: E ? "💡" : "🌙" }),
                  " ",
                  E ? "灯已开" : "灯已关",
                  F &&
                    jsxRuntime.jsx("span", {
                      className: "ml-1 text-[9px] font-bold text-[#8a6a4a]",
                      children: "（夜间本层会变暗）",
                    }),
                ],
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `btn-home-light-toggle-${o}`,
                "aria-pressed": E,
                "aria-label": E ? "关灯" : "开灯",
                onClick: J,
                className: "btn-chunky btn-xs btn-gray flex min-h-9 shrink-0 items-center px-2.5",
                children: E ? "🌙 关灯" : "💡 开灯",
              }),
            ],
          }),
        jsxRuntime.jsxs("div", {
          className: F ? "floor-night-dark space-y-4" : "space-y-4",
          children: [
            o !== "1f" &&
              jsxRuntime.jsx(FurnitureInteractionPanel, {
                state: e,
                commit: n,
                onGoFloor: l,
                floor: o,
                open: p.interact,
                onToggle: () => j("interact"),
                onSleepOvernight: sleepOvernightAction,
              }),
            o === "1f" &&
              jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  jsxRuntime.jsx("div", {
                    className:
                      "sticky top-0 z-20 rounded-2xl border-2 border-[#f0dcc0] bg-[#fdf6ea]/95 p-2 shadow-md",
                    "data-testid": "home-1f-module-sticky",
                    children: jsxRuntime.jsx(ModuleTabBar, {
                      items: FLOOR1_TABS,
                      current: c,
                      onChange: u,
                      testIdPrefix: "home-1f-module",
                    }),
                  }),
                  jsxRuntime.jsx("div", {
                    className: c === "store" ? "" : "hidden",
                    children: s
                      ? jsxRuntime.jsx(StoreFrontPanel, {
                          state: e,
                          commit: n,
                          onGoTab: s,
                          interactBlock: jsxRuntime.jsx(FurnitureInteractionPanel, {
                            state: e,
                            commit: n,
                            onGoFloor: l,
                            floor: "1f",
                            open: p.interact,
                            onToggle: () => j("interact"),
                            embedded: !0,
                            onSleepOvernight: sleepOvernightAction,
                          }),
                        })
                      : jsxRuntime.jsx(StoreFrontPanel, {
                          state: e,
                          commit: n,
                          onGoTab: () => {},
                          interactBlock: jsxRuntime.jsx(FurnitureInteractionPanel, {
                            state: e,
                            commit: n,
                            onGoFloor: l,
                            floor: "1f",
                            open: p.interact,
                            onToggle: () => j("interact"),
                            embedded: !0,
                            onSleepOvernight: sleepOvernightAction,
                          }),
                        }),
                  }),
                  jsxRuntime.jsx("div", {
                    className: c === "kitchen" ? "" : "hidden",
                    children: jsxRuntime.jsx(KitchenModulePanel, { state: e, commit: n }),
                  }),
                  jsxRuntime.jsx("div", {
                    className: c === "furniture" ? "" : "hidden",
                    children: jsxRuntime.jsx(FurnitureModulePanel, { state: e, commit: n }),
                  }),
                ],
              }),
            o === "2f" &&
              jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  jsxRuntime.jsx(ModuleTabBar, { items: FLOOR2_TABS, current: f, onChange: g, testIdPrefix: "home-2f-module" }),
                  jsxRuntime.jsxs("div", {
                    className: f === "bedroom" ? "" : "hidden",
                    children: [
                      jsxRuntime.jsx(HygieneSection, { state: e, commit: n, open: p.bath, onToggle: () => j("bath") }),
                      jsxRuntime.jsx(GroomingSection, {
                        state: e,
                        commit: n,
                        open: p.makeup,
                        onToggle: () => j("makeup"),
                      }),
                      jsxRuntime.jsx(SleepSection, {
                        state: e,
                        commit: n,
                        open: p.sleep,
                        onToggle: () => j("sleep"),
                        onSleepOvernight: sleepOvernightAction,
                      }),
                      jsxRuntime.jsxs(CardSection, {
                        title: "🎮 玩游戏",
                        open: p.game,
                        onToggle: () => j("game"),
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "text-xs text-[#b08a6a]",
                            children: [
                              "翻牌配对小游戏，消耗 10 精力，通关赢金币（今日 ",
                              N.playedToday,
                              "/3）",
                            ],
                          }),
                          jsxRuntime.jsx(MemoryMatchGame, {
                            onFinish: (R) => {
                              const se = playHomeGame(e, R);
                              n(se.state, se.message, se.ok ? (R ? "success" : "info") : "error");
                            },
                            disabled: N.playedToday >= 3 || e.energy < 10,
                          }),
                        ],
                      }),
                      jsxRuntime.jsx(FloorFurnishingPanel, {
                        state: e,
                        commit: n,
                        floor: "2f",
                        open: p.furniture2,
                        onToggle: () => j("furniture2"),
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: f === "balcony" ? "" : "hidden",
                    children: jsxRuntime.jsx(BalconyGardenPanel, {
                      state: e,
                      commit: n,
                      open: p.balcony,
                      onToggle: () => j("balcony"),
                    }),
                  }),
                ],
              }),
            o === "3f" &&
              jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  jsxRuntime.jsx(ModuleTabBar, { items: FLOOR3_TABS, current: x, onChange: m, testIdPrefix: "home-3f-module" }),
                  jsxRuntime.jsxs("div", {
                    className: x === "study" ? "" : "hidden",
                    children: [
                      jsxRuntime.jsx(BooksPanel, { state: e, commit: n, open: p.book, onToggle: () => j("book") }),
                      jsxRuntime.jsx(ToolBenchSection, { state: e, commit: n, open: p.tools, onToggle: () => j("tools") }),
                      jsxRuntime.jsx(SewingWorkshopPanel, {
                        state: e,
                        commit: n,
                        open: p.sewing,
                        onToggle: () => j("sewing"),
                      }),
                      jsxRuntime.jsx(FloorFurnishingPanel, {
                        state: e,
                        commit: n,
                        floor: "3f",
                        open: p.furniture3,
                        onToggle: () => j("furniture3"),
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: x === "collection" ? "" : "hidden",
                    children: jsxRuntime.jsx(CollectionShelfSection, {
                      state: e,
                      commit: n,
                      open: p.collection,
                      onToggle: () => j("collection"),
                    }),
                  }),
                ],
              }),
            o === "b1" && jsxRuntime.jsx(HomeFurniturePanel, { state: e, commit: n }),
            o === "roof" &&
              jsxRuntime.jsx(RooftopWeatherSection, { state: e, commit: n, open: p.roof, onToggle: () => j("roof") }),
          ],
        }),
      ],
    }),
  );
}

function OrderHeader({ seasonName: e }) {
  return jsxRuntime.jsxs("section", {
    className: "order-head rounded-2xl border-2 border-[#f8bbd0] p-3.5",
    style: { background: "linear-gradient(135deg,#ffffff,#ffe9ef)" },
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between gap-2",
        children: [
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-base font-black text-[#4a2c17]",
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "📦" }), " 食材订购"],
              }),
              jsxRuntime.jsxs("p", {
                className: "mt-0.5 text-xs font-bold text-[#6b4226]",
                children: [
                  "当前时令：",
                  jsxRuntime.jsx("span", { className: "emoji", children: SEASON_EMOJI[e] }),
                  " ",
                  e,
                  jsxRuntime.jsx("span", {
                    className:
                      "ml-1.5 rounded-full bg-[#ffe9ef] px-2 py-px text-[10px] font-black text-[#e04a63]",
                    children: "时令食材更便宜新鲜",
                  }),
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("span", { className: "emoji text-3xl", children: "🚚" }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className:
          "order-tip mt-2 rounded-xl bg-white/80 px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#4a2c17]",
        children:
          "下单后次日一早送达；想立刻拿到手，就去小镇商店街的「食材商店」现货购买（会贵 20%）。河鲜要去河边钓、海鲜要去农贸市场买，这里不接单哦。",
      }),
    ],
  });
}

const INGREDIENT_CATEGORIES = ["grain", "dairy", "fruit", "sweet", "meat", "veg", "fish", "seasoning", "other"],
  CATEGORY_STYLES = {
    grain: { chip: "bg-[#fef3c7] text-[#92400e]", text: "#92400e" },
    dairy: { chip: "bg-[#ede9fe] text-[#c62828]", text: "#c62828" },
    fruit: { chip: "bg-[#ede7f6] text-[#c62828]", text: "#c62828" },
    sweet: { chip: "bg-[#fce7f3] text-[#be185d]", text: "#be185d" },
    meat: { chip: "bg-[#fee2e2] text-[#b91c1c]", text: "#b91c1c" },
    veg: { chip: "bg-[#dcfce7] text-[#15803d]", text: "#15803d" },
    fish: { chip: "bg-[#f3e5f5] text-[#c62828]", text: "#c62828" },
    seasoning: { chip: "bg-[#ffedd5] text-[#9a3412]", text: "#9a3412" },
    other: { chip: "bg-[#f3e3cb] text-[#6b4226]", text: "#6b4226" },
  };

function CategoryFilter({ catFilter: e, onSelect: n }) {
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx("p", { className: "mb-2 text-sm font-black text-[#4a2c17]", children: "按分类筛选" }),
      jsxRuntime.jsxs("div", {
        className: "flex flex-wrap gap-1.5",
        children: [
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "market-cat-all",
            "aria-pressed": e === "all",
            onClick: () => n("all"),
            className: `rounded-full border-2 px-3 py-1 text-xs font-black transition-colors ${e === "all" ? "border-[#ff6b81] bg-[#ff6b81] text-white" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
            children: "全部",
          }),
          INGREDIENT_CATEGORIES.map((s) =>
            jsxRuntime.jsx(
              "button",
              {
                type: "button",
                "data-testid": `market-cat-${s}`,
                "aria-pressed": e === s,
                onClick: () => n(s),
                className: `rounded-full border-2 px-3 py-1 text-xs font-black transition-colors ${e === s ? "border-[#ff6b81] bg-[#ff6b81] text-white" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                children: INGREDIENT_CATEGORY_LABELS[s],
              },
              s,
            ),
          ),
        ],
      }),
    ],
  });
}

function IngredientRow({ def: e, state: n, seasonName: s, onOrder: a }) {
  const o = e.season === "all" || e.season === s,
    l = n.ingredients[e.id],
    c = (l == null ? void 0 : l.qty) ?? 0,
    u = CATEGORY_STYLES[e.category] ?? CATEGORY_STYLES.other;
  return jsxRuntime.jsxs("div", {
    className: `flex flex-col rounded-xl border-2 bg-white p-2.5 shadow-sm ${o ? "border-[#f0dcc0]" : "border-[#f0dcc0] opacity-55"}`,
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-2xl", children: e.emoji }),
          jsxRuntime.jsxs("span", {
            className: "num rounded-full bg-[#f3e5f5] px-2 py-px text-xs font-black text-[#c62828]",
            children: ["x", c],
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-1 truncate text-sm font-black text-[#4a2c17]",
        children: e.name,
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1 flex flex-wrap gap-1",
        children: [
          jsxRuntime.jsx("span", {
            className: `rounded-full px-1.5 py-px text-[9px] font-bold ${u.chip}`,
            children: INGREDIENT_CATEGORY_LABELS[e.category] ?? e.category,
          }),
          jsxRuntime.jsxs("span", {
            className:
              "rounded-full bg-[#fff7ed] px-1.5 py-px text-[9px] font-black text-[#ea580c]",
            children: ["¥", e.price],
          }),
          e.season !== "all" &&
            jsxRuntime.jsxs("span", {
              className:
                "rounded-full bg-[#ede7f6] px-1.5 py-px text-[9px] font-bold text-[#c62828]",
              children: [SEASON_EMOJI[e.season], "限定"],
            }),
        ],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-0.5 text-[10px] font-bold text-[#b08a6a]",
        children: ["保质 ", e.shelfLife, " 天"],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1.5 grid grid-cols-2 gap-1.5",
        children: [
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": `btn-order-${e.id}-1`,
            onClick: () => a(e.id, 1),
            disabled: !o,
            className: "btn-chunky btn-xs btn-pink",
            children: "+1 订购",
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": `btn-order-${e.id}-5`,
            onClick: () => a(e.id, 5),
            disabled: !o,
            className: "btn-chunky btn-xs btn-ghost",
            children: "+5 订购",
          }),
        ],
      }),
      !o &&
        jsxRuntime.jsx("p", {
          className: "mt-1 text-center text-[9px] font-bold text-[#b08a6a]",
          children: "非当季 · 暂停订购",
        }),
    ],
  });
}

function PendingDeliveryList({ state: e, onCancel: n }) {
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-2 flex items-center justify-between",
        children: [
          jsxRuntime.jsxs("p", {
            className: "font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚚" }), " 待送达订单"],
          }),
          jsxRuntime.jsxs("span", {
            className: "num rounded-full bg-[#ffe9ef] px-2 py-px text-xs font-black text-[#e04a63]",
            children: [e.orders.length, " 笔"],
          }),
        ],
      }),
      e.orders.length === 0
        ? jsxRuntime.jsx("p", {
            className: "py-3 text-center text-sm font-bold text-[#b08a6a]",
            children: "还没有订单，订购的食材明天一早送到",
          })
        : jsxRuntime.jsx("div", {
            className: "space-y-2",
            children: e.orders.map((s) => {
              const a = INGREDIENT_MAP[s.ingId];
              return jsxRuntime.jsxs(
                "div",
                {
                  className: "flex gap-2.5 rounded-xl border-2 border-[#f0dcc0] bg-white px-3 py-2",
                  children: [
                    jsxRuntime.jsx("div", {
                      className: "flex w-[20%] shrink-0 items-center justify-center",
                      children: jsxRuntime.jsx("span", {
                        className: "text-xl",
                        children: jsxRuntime.jsx("span", {
                          className: "emoji",
                          children: (a == null ? void 0 : a.emoji) ?? "❓",
                        }),
                      }),
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-sm font-bold text-[#4a2c17]",
                              children: [
                                (a == null ? void 0 : a.name) ?? s.ingId,
                                " ",
                                jsxRuntime.jsxs("span", { className: "num", children: ["x", s.qty] }),
                              ],
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[11px] font-bold text-[#b08a6a]",
                              children: [
                                jsxRuntime.jsxs("span", {
                                  className: "text-[#ea580c]",
                                  children: ["¥", s.cost],
                                }),
                                " · ",
                                s.arriveDay - e.day === 1 ? "明天送达" : `第 ${s.arriveDay} 天送达`,
                              ],
                            }),
                          ],
                        }),
                        jsxRuntime.jsx("div", {
                          className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                          children: jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-cancel-order-${s.id}`,
                            onClick: () => n(s.id),
                            className: "btn-chunky btn-xs btn-ghost",
                            children: "取消",
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
    ],
  });
}

const INGREDIENT_FILTERS = [
  { id: "buy", label: "可购买", emoji: "🛒" },
  { id: "unavailable", label: "不可购买", emoji: "🌙" },
  { id: "pending", label: "待送达", emoji: "🚚" },
];

function IngredientMarketPanel({ state: e, commit: n }) {
  const [s, a] = React.useState("buy"),
    [o, l] = React.useState("all"),
    [c, u] = React.useState(""),
    f = seasonIndexOf(e.day),
    g = SEASON_NAME_TABLE[Object.keys(SEASON_NAME_TABLE)[f]],
    x = React.useMemo(() => INGREDIENTS_LIST.filter((N) => !N.source), []),
    m = (N) => N.season === "all" || N.season === g,
    p = (N) => {
      if (!c.trim()) return !0;
      const S = c.trim().toLowerCase();
      return (
        (N.name ?? "").toLowerCase().includes(S) ||
        (N.desc ?? "").toLowerCase().includes(S) ||
        (INGREDIENT_CATEGORY_LABELS[N.category] ?? N.category).toLowerCase().includes(S)
      );
    },
    y = x
      .filter((N) => m(N))
      .filter((N) => o === "all" || N.category === o)
      .filter(p),
    j = x
      .filter((N) => !m(N))
      .filter((N) => o === "all" || N.category === o)
      .filter(p),
    v = (N, S) => {
      const C = buyIngredientBulk(e, N, S);
      if (!C.ok) {
        n(C.state, C.message, "error");
        return;
      }
      n(C.state, C.message, "success");
    },
    w = (N) => {
      n(removeOrder(e, N), "订单已取消，金币已退回", "info");
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx(BundlePacksPanel, { state: e, commit: n }),
        jsxRuntime.jsx(OrderHeader, { seasonName: g }),
        jsxRuntime.jsx("div", {
          className: "flex gap-1.5",
          children: INGREDIENT_FILTERS.map((N) => {
            const S = s === N.id,
              C = N.id === "buy" ? y.length : N.id === "unavailable" ? j.length : e.orders.length;
            return jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                "data-testid": `btn-order-tab-${N.id}`,
                onClick: () => a(N.id),
                className: `relative flex-1 rounded-xl border-2 px-2 py-2 text-xs font-black ${S ? (N.id === "pending" ? "border-[#b39ddb] bg-[#f3edf9] text-[#4a148c]" : "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]") : "border-[#f0dcc0] bg-[#fffdf8] text-[#b08a6a]"}`,
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: N.emoji }),
                  " ",
                  N.label,
                  jsxRuntime.jsx("span", {
                    className: `ml-0.5 num text-[10px] ${S ? "" : "text-[#c8a97e]"}`,
                    children: C,
                  }),
                ],
              },
              N.id,
            );
          }),
        }),
        s === "pending"
          ? jsxRuntime.jsx(PendingDeliveryList, { state: e, onCancel: w })
          : jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsxs("div", {
                  className:
                    "flex items-center gap-1.5 rounded-xl border-2 border-[#f0dcc0] bg-white px-2.5 py-1.5",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-sm", children: "🔍" }),
                    jsxRuntime.jsx("input", {
                      "data-testid": "input-order-search",
                      value: c,
                      onChange: (N) => u(N.target.value),
                      placeholder: s === "buy" ? "搜索可购买的食材…" : "搜索食材…",
                      className:
                        "min-w-0 flex-1 bg-transparent text-sm font-bold text-[#4a2c17] outline-none placeholder:text-[#d8bfa0]",
                    }),
                    c &&
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-order-search-clear",
                        onClick: () => u(""),
                        className: "btn-chunky btn-xs btn-ghost",
                        children: "清空",
                      }),
                  ],
                }),
                jsxRuntime.jsx(CategoryFilter, { catFilter: o, onSelect: l }),
                s === "buy"
                  ? y.length === 0
                    ? jsxRuntime.jsx("p", {
                        className:
                          "rounded-xl bg-[#fff8e1] px-3 py-4 text-center text-xs font-bold text-[#b08a6a]",
                        children: c
                          ? "没有找到匹配的食材，换个关键词试试"
                          : "当季食材已经全部订购过了？去待送达看看",
                      })
                    : jsxRuntime.jsx("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: y.map((N) =>
                          jsxRuntime.jsx(IngredientRow, { def: N, state: e, seasonName: g, onOrder: v }, N.id),
                        ),
                      })
                  : j.length === 0
                    ? jsxRuntime.jsx("p", {
                        className:
                          "rounded-xl bg-[#fff8e1] px-3 py-4 text-center text-xs font-bold text-[#b08a6a]",
                        children: c ? "没有找到匹配的食材" : "太棒了，当前没有买不到的食材",
                      })
                    : jsxRuntime.jsx("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: j.map((N) =>
                          jsxRuntime.jsx(IngredientRow, { def: N, state: e, seasonName: g, onOrder: v }, N.id),
                        ),
                      }),
              ],
            }),
      ],
    }),
  );
}

function commitResult(e, n, s) {
  e.commit(n.state, n.message, s ?? (n.ok ? "success" : "error"));
}

function commitOrRollback(e, n) {
  return n.ok ? n : (e.commit(n.state, n.message, "error"), null);
}

function meetNpcAction(e, n, s) {
  const a = meetNpc(e.state, n, s);
  if (!commitOrRollback(e, a)) return;
  const l = NPC_RUNTIME_DATA[n],
    c = a.tag ? `（${a.tag}）` : "";
  (e.setDialogue({
    title: `✨ 初见 · ${(l == null ? void 0 : l.name) ?? ""}${c}`,
    text: a.line ?? a.message,
  }),
    e.commit(a.state, `初次相遇${l ? `，认识了${l.name}` : ""}！`, "success"));
}

function buildGateMessage(e, n, s) {
  const a = NPC_RUNTIME_DATA[n],
    o = {
      residential: `小区门卫拦住了你：「哎，你找谁？小区外人不能随便进。」听说是来找${(a == null ? void 0 : a.name) ?? "住户"}的，门卫摆摆手：「TA 白天都在商店街或医院上班，苏记甜品面包店、水果摊，去那儿准能碰到。」`,
      wenyuan: `文苑小区门卫拦住了你：「哎，你找谁？小区外人不能随便进。」听说是来找${(a == null ? void 0 : a.name) ?? "住户"}的，门卫摆摆手：「TA 白天都在西商店街或医院上班，去那儿准能碰到。」`,
      ankang: `安康苑的门卫拦住了你：「哎，你找谁？小区外人不能随便进。」听说是来找${(a == null ? void 0 : a.name) ?? "住户"}的，门卫摆摆手：「TA 白天都在商店街或医院上班，去那儿准能碰到。」`,
      wutongli: `梧桐里的门卫拦住了你：「哎，你找谁？小区外人不能随便进。」听说是来找${(a == null ? void 0 : a.name) ?? "住户"}的，门卫摆摆手：「TA 白天都在东商店街或学校上班，去那儿准能碰到。」`,
      sujizhai: `苏记老宅的护院拦住了你：「这里是苏家老宅，外人不能随便进。」听说是来找${(a == null ? void 0 : a.name) ?? "住户"}的，他摆摆手：「TA 白天都在苏记甜品店或西商店街忙活，去那儿准能碰到。」`,
      eaststreet: `东商店街的街坊叫住了你：「TA 现在不在这条街上。」${(a == null ? void 0 : a.name) ?? "TA"}白天多在${s.activity ? "店铺" : "东商店街"}附近忙，改个时间段再来这条街转转吧。`,
      weststreet: `西商店街的街坊叫住了你：「TA 现在不在这条街上。」${(a == null ? void 0 : a.name) ?? "TA"}白天多在${s.activity ? "店铺" : "西商店街"}附近忙，改个时间段再来这条街转转吧。`,
      hospital: `医院前台护士拦住你：「探视时间才能进病房哦。」${(a == null ? void 0 : a.name) ?? "TA"}现在在忙别的。白天 TA 大多在医院值班，改个时间段再来吧。`,
      villa: `别墅区门禁对讲机里传来声音：「这里是私人住宅，访客需要住户确认。」${(a == null ? void 0 : a.name) ?? "对方"}现在不在家。TA 白天常去收容所、图书馆和公园，去那儿碰碰运气吧。`,
      school: `学校保安拦住了你：「学校重地，非师生不得入内！」${(a == null ? void 0 : a.name) ?? "这位同学"}正在上课或住校。想认识 TA，可以等放学时段在校门口转转，或去动物收容所找找。`,
      middleschool: `广场中学的门卫拦住了你：「非本校师生不能进！」${(a == null ? void 0 : a.name) ?? "TA"}正在上课。想认识 TA，等放学时段在校门口转转，或去商店街、公园碰碰运气。`,
      highschool: `高中保安拦住了你：「学校重地，非师生不得入内！」${(a == null ? void 0 : a.name) ?? "TA"}正在上课或自习。想认识 TA，等放学时段在校门口转转吧。`,
      away: `${(a == null ? void 0 : a.name) ?? "TA"}已经高中毕业，去外地上大学了，现在不在镇上。等 TA 假期回来，再找机会见面吧。`,
      shelter: `${(a == null ? void 0 : a.name) ?? "TA"}现在在宿舍休息，宿舍不接待访客。白天再来收容所大厅，就能碰到 TA 了。`,
    },
    l =
      s.access === "private"
        ? buildNpcScheduleHint(e, n, s, o)
        : `${(a == null ? void 0 : a.name) ?? "TA"}现在不在这里。改个时间段再来，或去镇上的公共场合逛逛，说不定能碰上 TA。`;
  e.setDialogue({
    title: `🚧 ${s.access === "private" ? "拜访受限" : "TA 不在这里"} · ${(a == null ? void 0 : a.name) ?? ""}`,
    text: l,
  });
}

function buildNpcScheduleHint(e, n, s, a) {
  const o = NPC_RUNTIME_DATA[n],
    l = a[s.place],
    c = getActiveFestival(e.state.day),
    u = getFestivalByDay(e.state.day);
  return c && u && l
    ? `${l}对了，今天是${c.name}，TA 白天大多在${u.name}（${PLACE_LABELS[u.hostPlace] ?? "小镇"}）过节，去那儿准能碰到。`
    : (l ?? `${(o == null ? void 0 : o.name) ?? "TA"}现在在休息，改个时间段再来吧。`);
}

function learnRecipeAction(e, n, s) {
  const a = learnRecipeFromNpc(e.state, n, s);
  if (!commitOrRollback(e, a)) return;
  const l = NPC_RUNTIME_DATA[n];
  (e.setDialogue({ title: `🎁 ${(l == null ? void 0 : l.name) ?? ""} 赠你食谱`, text: a.message }),
    e.commit(a.state, a.message, "success"));
}

function talkStoryAction(e, n, s) {
  var l;
  const a = talkStory(e.state, n, s);
  commitOrRollback(e, a) &&
    (e.setDialogue({
      title: ((l = a.line) == null ? void 0 : l.split("：")[0]) ?? "💬 相遇",
      text: a.line ?? a.message,
    }),
    e.commit(a.state, a.message, "success"));
}

function giveFlowerAction(e, n, s) {
  var l;
  const a = giveFlower(e.state, n, s);
  commitOrRollback(e, a) &&
    (e.setDialogue({
      title: `💐 送花给 ${((l = NPC_RUNTIME_DATA[n]) == null ? void 0 : l.name) ?? ""}`,
      text: a.line ?? a.message,
    }),
    e.commit(a.state, a.message, "success"));
}

function visitSchoolGateAction(e) {
  const n = visitSchoolGate(e.state);
  e.commit(n.state, n.message, "info");
}

function doFestivalAction(e, n) {
  const s = doFestivalActivity(e.state, n);
  commitResult(e, s);
}

function doExerciseAction(e, n) {
  const s = doExercise(e.state, n);
  commitResult(e, s);
}

function buyIngredientPremiumAction(e, n, s) {
  const a = buyIngredient(e.state, n, s, 1.2);
  (commitOrRollback(e, a), a.ok && e.commit(a.state, a.message, "success"));
}

function buyVehicleAction(e, n) {
  const s = buyVehicle(e.state, n);
  (commitOrRollback(e, s), s.ok && e.commit(s.state, s.message, "success"));
}

function travelToMarketAction(e) {
  const n = travelToMarket(e.state);
  commitOrRollback(e, n) && (e.setMarketGone(!0), e.commit(n.state, n.message, "success"));
}

function travelToGardenAction(e) {
  const n = travelToGarden(e.state);
  commitOrRollback(e, n) && (e.setGardenGone(!0), e.commit(n.state, n.message, "success"));
}

function travelToOrchardAction(e) {
  const n = travelToOrchard(e.state);
  commitOrRollback(e, n) && (e.setOrchardGone(!0), e.commit(n.state, n.message, "success"));
}

function buyIngredientAction(e, n) {
  const s = buyIngredient(e.state, n, 1, 1);
  (commitOrRollback(e, s), s.ok && e.commit(s.state, s.message, "success"));
}

function catchLoachAction(e) {
  const n = catchLoach(e.state);
  commitResult(e, n);
}

function gatherAtRiverAction(e) {
  const n = gatherAtRiver(e.state);
  commitResult(e, n);
}

function sellFlowersAtPlazaAction(e) {
  const n = sellFlowersAtPlaza(e.state);
  commitResult(e, n);
}

function sellFlowersToShopAction(e) {
  const n = pitchFlowersToShop(e.state);
  commitResult(e, n);
}

function buyFishingRodAction(e) {
  const n = buyFishingRod(e.state);
  commitResult(e, n);
}

function goFishingAction(e) {
  const n = goFishing(e.state);
  commitResult(e, n, n.ok ? (n.bitten ? "error" : "success") : "error");
}

function goFishingWithCompanionAction(e, n) {
  const s = goFishing(e.state, n);
  commitResult(e, s, s.ok ? (s.bitten ? "error" : "success") : "error");
}
