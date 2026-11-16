function CollectionShelfSection({ state: e, commit: n, open: s, onToggle: a }) {
  const [o, l] = React.useState(null),
    [c, u] = React.useState(!1),
    f = processFestivalSouvenirs(e),
    g = Array.isArray(e.collectionsPlaced) ? e.collectionsPlaced : [],
    x = getCollectionBonus(e),
    m = c ? f.filter((y) => g.includes(y.key)) : f,
    p = (y) => {
      n(y.state, y.message, y.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs(CardSection, {
    title: "🏆 三楼 · 收藏架（节日纪念品）",
    open: s,
    onToggle: a,
    style: { background: "linear-gradient(135deg,#fff8e1,#ffecb3)" },
    right: jsxRuntime.jsxs("span", {
      className: "rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-[#b08a6a]",
      children: ["已摆 ", g.length, "/8 · 装饰度 +", x],
    }),
    children: [
      jsxRuntime.jsx("p", {
        className: "text-[11px] font-bold leading-relaxed text-[#b08a6a]",
        children:
          "收藏架现在专收节日特殊纪念品：每个大型节日去会场参加活动，就能拿到一件独一无二的纪念品；把纪念品摆上收藏架，家里更有味道（每件装饰度 +2，最多 8 件）。点「查看来历」能翻出每件纪念品背后的故事。",
      }),
      jsxRuntime.jsxs("div", {
        className: "flex items-center gap-1.5",
        children: [
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "collection-filter-placed",
            onClick: () => u((y) => !y),
            className: `rounded-full border-2 px-2.5 py-1 text-[11px] font-black ${c ? "border-[#ffb74d] bg-[#fff3e0] text-[#e65100]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
            children: c ? "只看已摆放" : "查看全部收藏",
          }),
          jsxRuntime.jsx("span", {
            className: "text-[10px] font-bold text-[#b08a6a]",
            children: c
              ? `已摆上架的 ${g.length} 件`
              : `可收藏 ${f.length} 件（含已摆 ${g.length} 件）`,
          }),
        ],
      }),
      m.length === 0
        ? jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-white/80 px-3 py-2 text-center text-[11px] font-bold text-[#b08a6a]",
            children: c
              ? "收藏架上还空着，去「查看全部收藏」挑一件摆上来吧"
              : "还没有节日纪念品：去小镇的节日会场参加活动就能拿到；以前的成就纪念章和鱼标本也会出现在这里",
          })
        : jsxRuntime.jsx(CollapsibleSection, {
            title: "🏆 收藏品列表",
            summary: `已摆 ${g.length} 件，可收藏 ${f.length} 件`,
            count: m.length,
            testId: "sub-collapse-collection",
            tone: "#e65100",
            children: jsxRuntime.jsx("div", {
              className: "grid grid-cols-2 gap-1.5",
              role: "list",
              "aria-label": `收藏品列表，已摆放 ${g.length} 件，还有 ${Math.max(0, f.length - g.length)} 件可以摆放`,
              children: m.map((y) => {
                const j = g.includes(y.key),
                  v = o === y.key;
                return jsxRuntime.jsxs(
                  "div",
                  {
                    className: `rounded-xl p-2 ${j ? "bg-[#ffe0b2]" : "bg-white/85"}`,
                    children: [
                      jsxRuntime.jsxs("div", {
                        className: "flex items-center justify-between gap-1",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji text-xl", children: y.emoji }),
                          j &&
                            jsxRuntime.jsx("span", {
                              className:
                                "rounded-full bg-[#e65100] px-1.5 py-0.5 text-[9px] font-black text-white",
                              children: "已摆放",
                            }),
                        ],
                      }),
                      jsxRuntime.jsx("p", {
                        className: "mt-0.5 truncate text-xs font-black text-[#4a2c17]",
                        children: y.name,
                      }),
                      jsxRuntime.jsx("p", {
                        className: `mt-0.5 text-[10px] font-bold leading-relaxed text-[#8d6e63] ${v ? "" : "line-clamp-2"}`,
                        children: y.desc,
                      }),
                      v &&
                        jsxRuntime.jsxs("p", {
                          className:
                            "mt-1 rounded-lg bg-[#fff8e1] px-2 py-1 text-[10px] font-bold leading-relaxed text-[#6b4226]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: "📜" }),
                            " 来历：",
                            y.desc,
                          ],
                        }),
                      jsxRuntime.jsxs("div", {
                        className: "mt-1.5 flex gap-1",
                        children: [
                          jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-collection-detail-${y.key}`,
                            onClick: () => l(v ? null : y.key),
                            className: "btn-chunky btn-xs btn-brown flex-1",
                            children: v ? "收起" : "查看来历",
                          }),
                          jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-collection-toggle-${y.key}`,
                            onClick: () => p(isCollectionPlaced(e, y.key)),
                            disabled: !j && g.length >= 8,
                            className: `btn-chunky btn-xs ${j ? "btn-ghost" : "btn-orange"} flex-1`,
                            children: j ? "取下" : "摆上架",
                          }),
                        ],
                      }),
                    ],
                  },
                  y.key,
                );
              }),
            }),
          }),
    ],
  });
}

function RooftopWeatherSection({ state: e, commit: n, open: s, onToggle: a }) {
  const o = getDayWeather(e),
    l = checkStargazingAvailable(e),
    c = Array.isArray(e.stargazingSeen) ? e.stargazingSeen : [],
    u = pickConstellation(e.day),
    f = STAR_MAP[u],
    g = (x) => {
      n(x.state, x.message, x.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs(CardSection, {
    title: "🌤️ 天台 · 看天气",
    open: s,
    onToggle: a,
    right: jsxRuntime.jsxs("span", {
      className: "rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-[#0277bd]",
      children: ["第 ", e.day, " 天 · ", e.hour, " 点"],
    }),
    children: [
      jsxRuntime.jsxs("section", {
        className: "game-card",
        style: { background: "linear-gradient(135deg,#e3f2fd,#b3e5fc)" },
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              jsxRuntime.jsxs("p", {
                className: "font-black text-[#01579b]",
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "🌤️" }), " 天台 · 看天气"],
              }),
              jsxRuntime.jsxs("span", {
                className: "rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-[#0277bd]",
                children: ["第 ", e.day, " 天 · ", e.hour, " 点"],
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-2 flex items-center gap-3 rounded-xl bg-white/85 px-3 py-2.5",
            children: [
              jsxRuntime.jsx("span", { className: "emoji text-3xl", children: o.emoji }),
              jsxRuntime.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsx("p", { className: "text-sm font-black text-[#01579b]", children: o.label }),
                  jsxRuntime.jsx("p", {
                    className: "text-[11px] font-bold leading-relaxed text-[#4a6b7f]",
                    children: o.desc,
                  }),
                ],
              }),
            ],
          }),
          jsxRuntime.jsxs("p", {
            className:
              "mt-2 rounded-xl bg-white/70 px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#0277bd]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
              " 温馨提示：",
              o.outdoor
                ? "适合出门逛逛，说不定能碰上熟人"
                : "天气不好，出门前记得看路线；今晚大概率看不到星星",
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("section", {
        className: "game-card",
        style: { background: "linear-gradient(135deg,#ede7f6,#d1c4e9)" },
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              jsxRuntime.jsxs("p", {
                className: "font-black text-[#4a148c]",
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "🔭" }), " 天台 · 观星"],
              }),
              jsxRuntime.jsxs("span", {
                className: "rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold text-[#6a1b9a]",
                children: ["星图 ", c.length, "/", STARS_GAME.length],
              }),
            ],
          }),
          jsxRuntime.jsx("p", {
            className: "mt-1 text-[11px] font-bold leading-relaxed text-[#7b5aa6]",
            children:
              "晚上 19 点后、天气晴朗时可以在天台观星：每晚认一颗星（心情 +8），点亮星图收藏。雨天、阴天或白天看不到星星。",
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-2 flex items-center gap-2 rounded-xl bg-white/85 px-3 py-2",
            role: "group",
            "aria-label": `今晚的星是${(f == null ? void 0 : f.name) ?? u}，${(f == null ? void 0 : f.desc) ?? "等一个晴夜来认星星吧"}`,
            children: [
              jsxRuntime.jsx("span", {
                className: "emoji text-2xl",
                children: (f == null ? void 0 : f.emoji) ?? "⭐",
              }),
              jsxRuntime.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "text-xs font-black text-[#4a148c]",
                    children: ["今晚的星：", (f == null ? void 0 : f.name) ?? u],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-[10px] font-bold leading-relaxed text-[#7b5aa6]",
                    children: (f == null ? void 0 : f.desc) ?? "等一个晴夜来认星星吧",
                  }),
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-stargaze",
            onClick: () => g(stargaze(e)),
            disabled: !l.ok,
            "aria-label": l.ok
              ? `观星，点亮${(f == null ? void 0 : f.name) ?? u}，心情加 8`
              : `现在不能观星：${l.reason}`,
            className: "btn-chunky btn-xs btn-brown mt-2 w-full",
            children: l.ok
              ? `🔭 观星（心情 +8，点亮「${(f == null ? void 0 : f.name) ?? u}」）`
              : l.reason,
          }),
          jsxRuntime.jsx(CollapsibleSection, {
            title: "🌟 星图",
            summary: `已点亮 ${c.length}/${STARS_GAME.length}`,
            count: STARS_GAME.length,
            testId: "sub-collapse-starmap",
            tone: "#6a1b9a",
            children: jsxRuntime.jsx("div", {
              className: "mt-2 grid grid-cols-4 gap-1.5",
              role: "list",
              "aria-label": `星图进度，已点亮 ${c.length} 颗，共 ${STARS_GAME.length} 颗`,
              children: STARS_GAME.map((x) => {
                const m = c.includes(x.id);
                return jsxRuntime.jsxs(
                  "div",
                  {
                    "data-testid": `star-${x.id}`,
                    role: "listitem",
                    "aria-label": `${x.name}，${m ? "已点亮" : "未探索"}`,
                    className: `rounded-lg px-1 py-1.5 text-center ${m ? "bg-[#ede7f6]" : "bg-white/60 opacity-60"}`,
                    children: [
                      jsxRuntime.jsx("p", { className: "text-lg", children: m ? x.emoji : "🌑" }),
                      jsxRuntime.jsx("p", {
                        className: "mt-0.5 truncate text-[9px] font-black text-[#4a148c]",
                        children: x.name,
                      }),
                      jsxRuntime.jsx("p", {
                        className: "text-[8px] font-bold text-[#9575cd]",
                        children: m ? "已点亮" : "未探索",
                      }),
                    ],
                  },
                  x.id,
                );
              }),
            }),
          }),
        ],
      }),
    ],
  });
}

const FRESHWATER_FISH_IDS = new Set([
  "crucian",
  "carp",
  "grass_carp",
  "silver_carp",
  "bass",
  "snakehead",
  "yellow_catfish",
  "river_shrimp",
  "river_crab",
  "snail",
  "mandarin_fish",
  "swamp_eel",
  "topmouth_culter",
  "koi",
  "night_catfish",
  "spiny_eel",
  "gudgeon",
]);

function describeFurnitureAction(e) {
  return e === "f_bed"
    ? { label: "睡觉 / 小睡", icon: "😴", kind: "sleep" }
    : [
          "f_table",
          "f_tea_table",
          "f_desk",
          "f_showcase",
          "f_sideboard",
          "f_chair",
          "f_stool",
          "f_rocking",
        ].includes(e)
      ? { label: "吃饭（去 1F 厨房）", icon: "🍽️", kind: "eat" }
      : e === "f_cashier"
        ? { label: "查看今日营收", icon: "🧾", kind: "cashier" }
        : e === "f_bookshelf"
          ? { label: "阅读（去 3F 书房）", icon: "📚", kind: "read" }
          : e === "f_vanity"
            ? { label: "梳妆（去 2F）", icon: "🪞", kind: "vanity" }
            : AQUARIUM_FURNITURE_IDS.includes(e)
              ? { label: "查看金鱼", icon: "🐠", kind: "aquarium" }
              : e === "f_fishtank"
                ? { label: "河鲜养护缸", icon: "🐠", kind: "fishtank" }
                : e === "f_wardrobe"
                  ? { label: "换装（去服装店）", icon: "🚪", kind: "wardrobe" }
                  : e === "f_juicer"
                    ? { label: "榨果汁", icon: "🍹", kind: "juicer" }
                    : e === "f_coffee"
                      ? { label: "煮咖啡", icon: "☕", kind: "coffee" }
                      : e === "f_fridge"
                        ? { label: "食材保鲜（自动生效）", icon: "🧊", kind: "decor" }
                        : e === "f_ac"
                          ? { label: "店内舒适（自动生效）", icon: "❄️", kind: "decor" }
                          : null;
}

function FurnitureInteractionPanel({
  state: e,
  commit: n,
  onGoFloor: s,
  floor: a,
  open: o,
  onToggle: l,
  embedded: c,
  onSleepOvernight: sleepOvernightAction,
}) {
  const u = e.home,
    f = (u.tools ?? []).includes("sew_machine"),
    [g, x] = React.useState(!1),
    m = new Map();
  for (const v of u.furniture ?? []) {
    const w = FURNITURE_MAP[v.fid];
    w && (w.size ?? "big") === "big" && getFloor(v) === a && m.set(v.fid, (m.get(v.fid) ?? 0) + 1);
  }
  const p = [];
  for (const [v, w] of m) {
    const N = FURNITURE_MAP[v];
    p.push({
      fid: v,
      def: { name: N.name, emoji: N.emoji },
      count: w,
      spec: describeFurnitureAction(v) ?? { label: "装饰摆件", icon: "🪑", kind: "decor" },
    });
  }
  if (
    (f &&
      a === "3f" &&
      p.push({
        fid: "sew_machine",
        def: { name: "脚踏缝纫机", emoji: "🧵" },
        count: 1,
        spec: { label: "缝纫（去 3F）", icon: "🧵", kind: "sew" },
      }),
    p.length === 0)
  )
    return null;
  const y = (v) => {
      n(v.state, v.message, v.ok ? "success" : "error");
    },
    j = (v) => {
      v.kind === "sleep"
        ? y(takeNap(e))
        : v.kind === "eat"
          ? (speak(`前往${v.label}`), s("1f"))
          : v.kind === "read" || v.kind === "sew"
            ? (speak(`前往${v.label}`), s("3f"))
            : v.kind === "vanity"
              ? (speak(`前往${v.label}`), s("2f"))
              : v.kind === "aquarium"
                ? (speak(`查看${v.label}`), s(a))
                : v.kind === "fishtank"
                  ? x(!0)
                  : v.kind === "juicer"
                    ? y(checkJuiceIngredients(e, deepClone(e)))
                    : v.kind === "coffee"
                      ? y(drinkCoffee(e, deepClone(e)))
                      : v.kind === "wardrobe" &&
                        n(e, "换装请到「商店街 · 服装店」，那里有镜子可以试穿", "info");
    };
  return c
    ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
          jsxRuntime.jsx(CollapsibleSection, {
            title: `🪑 本层大件（${FLOOR_LABELS[a]}）`,
            summary: `共 ${p.length} 件可互动`,
            count: p.length,
            testId: `sub-collapse-interact-${a}`,
            tone: "#6b4226",
            children: jsxRuntime.jsx("div", {
              className: "grid grid-cols-2 gap-1.5",
              role: "list",
              "aria-label": `${FLOOR_LABELS[a]}的大件家具，共 ${p.length} 件`,
              children: p.map((v) => {
                var w, N, S, C, V, E, F, J, H, R;
                return jsxRuntime.jsxs(
                  "div",
                  {
                    role: "listitem",
                    "aria-label": `${v.def.name}，${v.spec.label}${v.count > 1 ? `，共 ${v.count} 件` : ""}`,
                    className: "flex gap-2 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
                    children: [
                      jsxRuntime.jsx("div", {
                        className: "flex w-[20%] shrink-0 items-center justify-center",
                        children: jsxRuntime.jsx("span", {
                          className: "emoji text-xl",
                          children: v.def.emoji,
                        }),
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsxs("p", {
                                className: "text-xs font-black text-[#4a2c17]",
                                children: [
                                  v.def.name,
                                  v.count > 1 &&
                                    jsxRuntime.jsxs("span", {
                                      className: "ml-1 text-[10px] font-bold text-[#b08a6a]",
                                      children: ["×", v.count],
                                    }),
                                ],
                              }),
                              jsxRuntime.jsxs("p", {
                                className: "text-[10px] font-bold text-[#b08a6a]",
                                children: [
                                  (w = v.spec) == null ? void 0 : w.icon,
                                  " ",
                                  (N = v.spec) == null ? void 0 : N.label,
                                ],
                              }),
                              ((S = v.spec) == null ? void 0 : S.kind) === "cashier" &&
                                jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-0.5 rounded-md bg-[#fff3e0] px-1.5 py-0.5 text-[10px] font-black text-[#e65100]",
                                  children: [
                                    "暂存营业额 ¥",
                                    e.cashRegister ?? 0,
                                    "（店铺盘点可入账）",
                                  ],
                                }),
                              ((C = v.spec) == null ? void 0 : C.kind) === "aquarium" &&
                                jsxRuntime.jsx("p", {
                                  className:
                                    "mt-0.5 rounded-md bg-[#e1f5fe] px-1.5 py-0.5 text-[10px] font-bold text-[#0277bd]",
                                  children: e.aquariumFish
                                    ? `金鱼健康 ${e.aquariumHealth ?? 0} · 缸清洁 ${e.aquariumCleanliness ?? 0}`
                                    : "缸里没有金鱼",
                                }),
                              ((V = v.spec) == null ? void 0 : V.kind) === "fishtank" &&
                                jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-0.5 rounded-md bg-[#e1f5fe] px-1.5 py-0.5 text-[10px] font-bold text-[#0277bd]",
                                  children: ["缸内 ", countFishInTank(e), "/", MAX_FISH_PER_SPECIES, " 条 · 入缸不变质"],
                                }),
                            ],
                          }),
                          ((E = v.spec) == null ? void 0 : E.kind) !== "decor" &&
                            ((F = v.spec) == null ? void 0 : F.kind) !== "cashier" &&
                            ((J = v.spec) == null ? void 0 : J.kind) !== "aquarium" &&
                            jsxRuntime.jsx("div", {
                              className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                              children: jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                children: [
                                  jsxRuntime.jsx("button", {
                                    type: "button",
                                    "data-testid": `btn-interact-${v.fid}`,
                                    onClick: () => j(v.spec),
                                    disabled:
                                      ((H = v.spec) == null ? void 0 : H.kind) === "sleep" &&
                                      (e.home.sleptToday ?? 0) >= 2,
                                    className: "btn-chunky btn-xs btn-brown",
                                    children:
                                      ((R = v.spec) == null ? void 0 : R.kind) === "sleep" &&
                                      (e.home.sleptToday ?? 0) >= 2
                                        ? "睡够了"
                                        : ((R = v.spec) == null ? void 0 : R.kind) === "sleep"
                                          ? "💤 小睡"
                                          : "互动",
                                  }),
                                  ((H = v.spec) == null ? void 0 : H.kind) === "sleep" &&
                                    jsxRuntime.jsx("button", {
                                      type: "button",
                                      "data-testid": `btn-sleep-overnight-${v.fid}`,
                                      "aria-label": "一觉睡到明天早上",
                                      onClick: () => sleepOvernightAction && sleepOvernightAction(),
                                      className: "btn-chunky btn-xs btn-gray",
                                      children: "🌙 睡到明早",
                                    }),
                                ],
                              }),
                            }),
                        ],
                      }),
                    ],
                  },
                  v.fid,
                );
              }),
            }),
          }),
          jsxRuntime.jsx(Modal, {
            open: g,
            title: "🐟 河鲜养护缸",
            onClose: () => x(!1),
            children: jsxRuntime.jsxs("div", {
              className: "space-y-2",
              children: [
                jsxRuntime.jsx("p", {
                  className:
                    "rounded-xl border-2 border-[#90caf9] bg-[#e1f5fe] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#0277bd]",
                  children: "钓来的活鱼入缸养着不会变质，随取随做；缸内鱼不参与每日变质。",
                }),
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-xs font-black text-[#4a2c17]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🐠" }),
                        " 缸内（",
                        countFishInTank(e),
                        "/",
                        MAX_FISH_PER_SPECIES,
                        "）",
                      ],
                    }),
                    (e.fishTank ?? []).length === 0
                      ? jsxRuntime.jsx("p", {
                          className:
                            "mt-1 rounded-lg bg-[#f3e3cb] px-2 py-1.5 text-[10px] font-bold text-[#8a6a4a]",
                          children: "缸里空空的，去河边钓几条活鱼进来吧",
                        })
                      : jsxRuntime.jsx("div", {
                          className: "mt-1 space-y-1.5",
                          children: (e.fishTank ?? []).map((v) => {
                            const w = INGREDIENT_MAP[v.ingId];
                            return jsxRuntime.jsxs(
                              "div",
                              {
                                className: "flex gap-2 rounded-xl bg-[#e1f5fe] px-2 py-1.5",
                                children: [
                                  jsxRuntime.jsx("div", {
                                    className: "flex w-[20%] shrink-0 items-center justify-center",
                                    children: jsxRuntime.jsx("span", {
                                      className: "emoji text-lg",
                                      children: (w == null ? void 0 : w.emoji) ?? "🐟",
                                    }),
                                  }),
                                  jsxRuntime.jsxs("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                      jsxRuntime.jsxs("div", {
                                        children: [
                                          jsxRuntime.jsxs("p", {
                                            className: "text-xs font-black text-[#01579b]",
                                            children: [
                                              (w == null ? void 0 : w.name) ?? v.ingId,
                                              " ",
                                              jsxRuntime.jsxs("span", {
                                                className: "text-[10px] font-bold text-[#0277bd]",
                                                children: ["×", v.qty],
                                              }),
                                            ],
                                          }),
                                          jsxRuntime.jsxs("p", {
                                            className: "text-[10px] font-bold text-[#b08a6a]",
                                            children: ["纪录 ", v.record ?? 0, "cm"],
                                          }),
                                        ],
                                      }),
                                      jsxRuntime.jsx("div", {
                                        className: "mt-1 flex flex-wrap items-center gap-1.5",
                                        children: jsxRuntime.jsx("button", {
                                          type: "button",
                                          "data-testid": `btn-tank-take-${v.ingId}`,
                                          onClick: () => y(takeFishFromTank(e, v.ingId)),
                                          className: "btn-chunky btn-xs btn-yellow",
                                          children: "取出",
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              v.ingId,
                            );
                          }),
                        }),
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-xs font-black text-[#4a2c17]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🎒" }),
                        " 背包里的活鱼",
                      ],
                    }),
                    Object.entries(e.ingredients).filter(
                      ([v, w]) => FRESHWATER_FISH_IDS.has(v) && ((w == null ? void 0 : w.qty) ?? 0) > 0,
                    ).length === 0
                      ? jsxRuntime.jsx("p", {
                          className:
                            "mt-1 rounded-lg bg-[#f3e3cb] px-2 py-1.5 text-[10px] font-bold text-[#8a6a4a]",
                          children: "背包里没有可入缸的活鱼",
                        })
                      : jsxRuntime.jsx("div", {
                          className: "mt-1 space-y-1.5",
                          children: Object.entries(e.ingredients)
                            .filter(
                              ([v, w]) => FRESHWATER_FISH_IDS.has(v) && ((w == null ? void 0 : w.qty) ?? 0) > 0,
                            )
                            .map(([v, w]) => {
                              const N = INGREDIENT_MAP[v];
                              return jsxRuntime.jsxs(
                                "div",
                                {
                                  className: "flex gap-2 rounded-xl bg-[#fbf3e4] px-2 py-1.5",
                                  children: [
                                    jsxRuntime.jsx("div", {
                                      className:
                                        "flex w-[20%] shrink-0 items-center justify-center",
                                      children: jsxRuntime.jsx("span", {
                                        className: "emoji text-lg",
                                        children: (N == null ? void 0 : N.emoji) ?? "🐟",
                                      }),
                                    }),
                                    jsxRuntime.jsxs("div", {
                                      className: "min-w-0 flex-1",
                                      children: [
                                        jsxRuntime.jsx("div", {
                                          children: jsxRuntime.jsxs("p", {
                                            className: "text-xs font-black text-[#4a2c17]",
                                            children: [
                                              (N == null ? void 0 : N.name) ?? v,
                                              " ",
                                              jsxRuntime.jsxs("span", {
                                                className: "text-[10px] font-bold text-[#b08a6a]",
                                                children: ["×", w.qty],
                                              }),
                                            ],
                                          }),
                                        }),
                                        jsxRuntime.jsx("div", {
                                          className: "mt-1 flex flex-wrap items-center gap-1.5",
                                          children: jsxRuntime.jsx("button", {
                                            type: "button",
                                            "data-testid": `btn-tank-put-${v}`,
                                            onClick: () => y(addFishToTank(e, v)),
                                            disabled: countFishInTank(e) >= MAX_FISH_PER_SPECIES,
                                            className: "btn-chunky btn-xs btn-blue",
                                            children: "入缸",
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                v,
                              );
                            }),
                        }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : jsxRuntime.jsxs(jsxRuntime.Fragment, {
        children: [
          jsxRuntime.jsxs(CardSection, {
            title: "🪑 大家具互动",
            open: o,
            onToggle: l,
            right: jsxRuntime.jsx("span", {
              className:
                "rounded-full bg-[#f3e3cb] px-2 py-0.5 text-[10px] font-black text-[#6b4226]",
              children: FLOOR_LABELS[a],
            }),
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-[11px] font-bold leading-relaxed text-[#b08a6a]",
                children: [
                  "家具按楼层摆放、不同楼层不通用，这里只显示",
                  a === "1f" ? " 1F" : a === "2f" ? " 2F" : " 3F",
                  "的大件家具：床能睡觉，餐桌去厨房吃饭，收银台看今日营收，书架去书房阅读，水族缸看金鱼，缝纫机去缝纫。",
                ],
              }),
              jsxRuntime.jsx(CollapsibleSection, {
                title: `🪑 本层大件（${FLOOR_LABELS[a]}）`,
                summary: `共 ${p.length} 件可互动`,
                count: p.length,
                testId: `sub-collapse-interact-${a}`,
                tone: "#6b4226",
                children: jsxRuntime.jsx("div", {
                  className: "grid grid-cols-2 gap-1.5",
                  role: "list",
                  "aria-label": `${FLOOR_LABELS[a]}的大件家具，共 ${p.length} 件`,
                  children: p.map((v) => {
                    var w, N, S, C, V, E, F, J, H, R;
                    return jsxRuntime.jsxs(
                      "div",
                      {
                        role: "listitem",
                        "aria-label": `${v.def.name}，${v.spec.label}${v.count > 1 ? `，共 ${v.count} 件` : ""}`,
                        className: "flex gap-2 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
                        children: [
                          jsxRuntime.jsx("div", {
                            className: "flex w-[20%] shrink-0 items-center justify-center",
                            children: jsxRuntime.jsx("span", {
                              className: "emoji text-xl",
                              children: v.def.emoji,
                            }),
                          }),
                          jsxRuntime.jsxs("div", {
                            className: "min-w-0 flex-1",
                            children: [
                              jsxRuntime.jsxs("div", {
                                children: [
                                  jsxRuntime.jsxs("p", {
                                    className: "text-xs font-black text-[#4a2c17]",
                                    children: [
                                      v.def.name,
                                      v.count > 1 &&
                                        jsxRuntime.jsxs("span", {
                                          className: "ml-1 text-[10px] font-bold text-[#b08a6a]",
                                          children: ["×", v.count],
                                        }),
                                    ],
                                  }),
                                  jsxRuntime.jsxs("p", {
                                    className: "text-[10px] font-bold text-[#b08a6a]",
                                    children: [
                                      (w = v.spec) == null ? void 0 : w.icon,
                                      " ",
                                      (N = v.spec) == null ? void 0 : N.label,
                                    ],
                                  }),
                                  ((S = v.spec) == null ? void 0 : S.kind) === "cashier" &&
                                    jsxRuntime.jsxs("p", {
                                      className:
                                        "mt-0.5 rounded-md bg-[#fff3e0] px-1.5 py-0.5 text-[10px] font-black text-[#e65100]",
                                      children: [
                                        "暂存营业额 ¥",
                                        e.cashRegister ?? 0,
                                        "（店铺盘点可入账）",
                                      ],
                                    }),
                                  ((C = v.spec) == null ? void 0 : C.kind) === "aquarium" &&
                                    jsxRuntime.jsx("p", {
                                      className:
                                        "mt-0.5 rounded-md bg-[#e1f5fe] px-1.5 py-0.5 text-[10px] font-bold text-[#0277bd]",
                                      children: e.aquariumFish
                                        ? `金鱼健康 ${e.aquariumHealth ?? 0} · 缸清洁 ${e.aquariumCleanliness ?? 0}`
                                        : "缸里没有金鱼",
                                    }),
                                  ((V = v.spec) == null ? void 0 : V.kind) === "fishtank" &&
                                    jsxRuntime.jsxs("p", {
                                      className:
                                        "mt-0.5 rounded-md bg-[#e1f5fe] px-1.5 py-0.5 text-[10px] font-bold text-[#0277bd]",
                                      children: ["缸内 ", countFishInTank(e), "/", MAX_FISH_PER_SPECIES, " 条 · 入缸不变质"],
                                    }),
                                ],
                              }),
                              ((E = v.spec) == null ? void 0 : E.kind) !== "decor" &&
                                ((F = v.spec) == null ? void 0 : F.kind) !== "cashier" &&
                                ((J = v.spec) == null ? void 0 : J.kind) !== "aquarium" &&
                                jsxRuntime.jsx("div", {
                                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                                  children: jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                    children: [
                                      jsxRuntime.jsx("button", {
                                        type: "button",
                                        "data-testid": `btn-interact-${v.fid}`,
                                        onClick: () => j(v.spec),
                                        disabled:
                                          ((H = v.spec) == null ? void 0 : H.kind) === "sleep" &&
                                          (e.home.sleptToday ?? 0) >= 2,
                                        className: "btn-chunky btn-xs btn-brown",
                                        children:
                                          ((R = v.spec) == null ? void 0 : R.kind) === "sleep" &&
                                          (e.home.sleptToday ?? 0) >= 2
                                            ? "睡够了"
                                            : ((R = v.spec) == null ? void 0 : R.kind) === "sleep"
                                              ? "💤 小睡"
                                              : "互动",
                                      }),
                                      ((H = v.spec) == null ? void 0 : H.kind) === "sleep" &&
                                        jsxRuntime.jsx("button", {
                                          type: "button",
                                          "data-testid": `btn-sleep-overnight-${v.fid}`,
                                          "aria-label": "一觉睡到明天早上",
                                          onClick: () => sleepOvernightAction && sleepOvernightAction(),
                                          className: "btn-chunky btn-xs btn-gray",
                                          children: "🌙 睡到明早",
                                        }),
                                    ],
                                  }),
                                }),
                            ],
                          }),
                        ],
                      },
                      v.fid,
                    );
                  }),
                }),
              }),
            ],
          }),
          jsxRuntime.jsx(Modal, {
            open: g,
            title: "🐟 河鲜养护缸",
            onClose: () => x(!1),
            children: jsxRuntime.jsxs("div", {
              className: "space-y-2",
              children: [
                jsxRuntime.jsx("p", {
                  className:
                    "rounded-xl border-2 border-[#90caf9] bg-[#e1f5fe] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#0277bd]",
                  children: "钓来的活鱼入缸养着不会变质，随取随做；缸内鱼不参与每日变质。",
                }),
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-xs font-black text-[#4a2c17]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🐠" }),
                        " 缸内（",
                        countFishInTank(e),
                        "/",
                        MAX_FISH_PER_SPECIES,
                        "）",
                      ],
                    }),
                    (e.fishTank ?? []).length === 0
                      ? jsxRuntime.jsx("p", {
                          className:
                            "mt-1 rounded-lg bg-[#f3e3cb] px-2 py-1.5 text-[10px] font-bold text-[#8a6a4a]",
                          children: "缸里空空的，去河边钓几条活鱼进来吧",
                        })
                      : jsxRuntime.jsx("div", {
                          className: "mt-1 space-y-1.5",
                          children: (e.fishTank ?? []).map((v) => {
                            const w = INGREDIENT_MAP[v.ingId];
                            return jsxRuntime.jsxs(
                              "div",
                              {
                                className: "flex gap-2 rounded-xl bg-[#e1f5fe] px-2 py-1.5",
                                children: [
                                  jsxRuntime.jsx("div", {
                                    className: "flex w-[20%] shrink-0 items-center justify-center",
                                    children: jsxRuntime.jsx("span", {
                                      className: "emoji text-lg",
                                      children: (w == null ? void 0 : w.emoji) ?? "🐟",
                                    }),
                                  }),
                                  jsxRuntime.jsxs("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                      jsxRuntime.jsxs("div", {
                                        children: [
                                          jsxRuntime.jsxs("p", {
                                            className: "text-xs font-black text-[#01579b]",
                                            children: [
                                              (w == null ? void 0 : w.name) ?? v.ingId,
                                              " ",
                                              jsxRuntime.jsxs("span", {
                                                className: "text-[10px] font-bold text-[#0277bd]",
                                                children: ["×", v.qty],
                                              }),
                                            ],
                                          }),
                                          jsxRuntime.jsxs("p", {
                                            className: "text-[10px] font-bold text-[#b08a6a]",
                                            children: ["纪录 ", v.record ?? 0, "cm"],
                                          }),
                                        ],
                                      }),
                                      jsxRuntime.jsx("div", {
                                        className: "mt-1 flex flex-wrap items-center gap-1.5",
                                        children: jsxRuntime.jsx("button", {
                                          type: "button",
                                          "data-testid": `btn-tank-take-${v.ingId}`,
                                          onClick: () => y(takeFishFromTank(e, v.ingId)),
                                          className: "btn-chunky btn-xs btn-yellow",
                                          children: "取出",
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              v.ingId,
                            );
                          }),
                        }),
                  ],
                }),
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-xs font-black text-[#4a2c17]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🎒" }),
                        " 背包里的活鱼",
                      ],
                    }),
                    Object.entries(e.ingredients).filter(
                      ([v, w]) => FRESHWATER_FISH_IDS.has(v) && ((w == null ? void 0 : w.qty) ?? 0) > 0,
                    ).length === 0
                      ? jsxRuntime.jsx("p", {
                          className:
                            "mt-1 rounded-lg bg-[#f3e3cb] px-2 py-1.5 text-[10px] font-bold text-[#8a6a4a]",
                          children: "背包里没有可入缸的活鱼",
                        })
                      : jsxRuntime.jsx("div", {
                          className: "mt-1 space-y-1.5",
                          children: Object.entries(e.ingredients)
                            .filter(
                              ([v, w]) => FRESHWATER_FISH_IDS.has(v) && ((w == null ? void 0 : w.qty) ?? 0) > 0,
                            )
                            .map(([v, w]) => {
                              const N = INGREDIENT_MAP[v];
                              return jsxRuntime.jsxs(
                                "div",
                                {
                                  className: "flex gap-2 rounded-xl bg-[#fbf3e4] px-2 py-1.5",
                                  children: [
                                    jsxRuntime.jsx("div", {
                                      className:
                                        "flex w-[20%] shrink-0 items-center justify-center",
                                      children: jsxRuntime.jsx("span", {
                                        className: "emoji text-lg",
                                        children: (N == null ? void 0 : N.emoji) ?? "🐟",
                                      }),
                                    }),
                                    jsxRuntime.jsxs("div", {
                                      className: "min-w-0 flex-1",
                                      children: [
                                        jsxRuntime.jsx("div", {
                                          children: jsxRuntime.jsxs("p", {
                                            className: "text-xs font-black text-[#4a2c17]",
                                            children: [
                                              (N == null ? void 0 : N.name) ?? v,
                                              " ",
                                              jsxRuntime.jsxs("span", {
                                                className: "text-[10px] font-bold text-[#b08a6a]",
                                                children: ["×", w.qty],
                                              }),
                                            ],
                                          }),
                                        }),
                                        jsxRuntime.jsx("div", {
                                          className: "mt-1 flex flex-wrap items-center gap-1.5",
                                          children: jsxRuntime.jsx("button", {
                                            type: "button",
                                            "data-testid": `btn-tank-put-${v}`,
                                            onClick: () => y(addFishToTank(e, v)),
                                            disabled: countFishInTank(e) >= MAX_FISH_PER_SPECIES,
                                            className: "btn-chunky btn-xs btn-blue",
                                            children: "入缸",
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                },
                                v,
                              );
                            }),
                        }),
                  ],
                }),
              ],
            }),
          }),
        ],
      });
}
