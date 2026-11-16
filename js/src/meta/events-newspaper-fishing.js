/*
 * 符号还原（推断性重命名，非原名）— 本文件顶层标识符已按函数体语义
 * 推断重命名以便阅读。变量名在压缩时已丢失，此处为基于用法的近似推断，
 * 不代表原始源码命名。局部参数与属性名未改动。
 * 安全替换 13 个，跳过(有遮蔽) 0 个，替换点 33 处，语法校验 通过。
 */
function renderEventCard({ state: e, onCatchLoach: n }) {
  return jsxRuntime.jsxs("div", {
    className: "flex gap-3 rounded-xl border-2 border-[#81c784] bg-[#fbfdf6] p-2.5",
    children: [
      jsxRuntime.jsx("div", {
        className: "flex w-[20%] shrink-0 items-center justify-center",
        children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "🪱" }),
      }),
      jsxRuntime.jsxs("div", {
        className: "min-w-0 flex-1",
        children: [
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-sm font-black text-[#4a2c17]",
                children: [
                  "公园抓泥鳅",
                  jsxRuntime.jsxs("span", {
                    className: "ml-1.5 text-[10px] font-bold text-[#558b2f]",
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "🌳" }), " 公园"],
                  }),
                ],
              }),
              jsxRuntime.jsxs("p", {
                className: "text-[11px] text-[#b08a6a]",
                children: ["在泥塘里摸泥鳅，免费收获（今日 ", e.caughtToday, "/", LOACH_DAILY_LIMIT, " 次）"],
              }),
              jsxRuntime.jsxs("p", {
                className: "text-[10px] font-bold text-[#6b4226]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                  "8 精力 · 泥鳅可做鱼饵也能做菜",
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "mt-1.5 flex flex-wrap items-center gap-1.5",
            children: jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "btn-catch-loach",
              onClick: n,
              disabled: e.caughtToday >= LOACH_DAILY_LIMIT || e.energy < 8,
              className: "btn-chunky btn-xs btn-green",
              children: "抓泥鳅",
            }),
          }),
        ],
      }),
    ],
  });
}

function ParkActivityPanel({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      MapPlaceCard({
        keyId: "park-exercise",
        title: "🏃 锻炼",
        emoji: "🏃",
        sub: `今日 ${n.exercisedToday}/${DAILY_EXERCISE_LIMIT} 次 · 消耗精力恢复健康、提升运动技能`,
        open: e.isCatOpen("park", "exercise"),
        onToggle: () => e.toggleCat("park", "exercise"),
        border: "border-[#7cb342]",
        bg: "bg-[#fbfdf6]",
        titleColor: "text-[#33691e]",
        subColor: "text-[#558b2f]",
        testId: "map-cat-park-exercise",
        children: EXERCISES.filter((s) => s.location === "park").map((s) =>
          jsxRuntime.jsx(ExerciseCard, { state: n, ex: s, onExercise: e.onExercise }, s.id),
        ),
      }),
      MapPlaceCard({
        keyId: "park-loach",
        title: "🪱 公园抓泥鳅",
        emoji: "🪱",
        sub: `今日 ${n.caughtToday}/${LOACH_DAILY_LIMIT} 次 · 免费收获，泥鳅可做鱼饵也能做菜`,
        open: e.isCatOpen("park", "loach"),
        onToggle: () => e.toggleCat("park", "loach"),
        border: "border-[#8d9c6c]",
        bg: "bg-[#fbfdf6]",
        titleColor: "text-[#4e342e]",
        subColor: "text-[#7a6a52]",
        testId: "map-cat-park-loach",
        children: jsxRuntime.jsx(renderEventCard, { state: n, onCatchLoach: e.onCatchLoach }),
      }),
      jsxRuntime.jsx(SushiStallSection, { state: n, commit: e.commit, testId: "park-sec-sushi-stall" }),
      e.hereNpcsAt("park").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("park"),
          locId: "park",
          badgeText: "🟢 公共场合",
        }),
    ],
  });
}

function FireflyLayer({ hour: e }) {
  const n = React.useMemo(() => {
    if (!isNightHour(e)) return [];
    const s = 10 + Math.floor(Math.random() * 5);
    return Array.from({ length: s }, (a, o) => ({
      id: o,
      left: `${3 + Math.random() * 90}%`,
      top: `${4 + Math.random() * 84}%`,
      delay: `${Math.random() * 3}s`,
      flicker: `${2 + Math.random() * 2.2}s`,
      drift: `${5 + Math.random() * 8}s`,
    }));
  }, [e]);
  return n.length === 0
    ? null
    : jsxRuntime.jsx("div", {
        className: "pointer-events-none absolute inset-0 overflow-hidden",
        "aria-hidden": "true",
        "data-testid": "fireflies",
        children: n.map((s) =>
          jsxRuntime.jsx(
            "span",
            {
              className: "firefly",
              style: {
                left: s.left,
                top: s.top,
                animationDelay: `${s.delay}, 0s`,
                animationDuration: `${s.flicker}, ${s.drift}`,
              },
            },
            s.id,
          ),
        ),
      });
}

const CATCH_TYPES = [
    { type: "loach", label: "泥鳅（公园抓）", ingId: "loach" },
    { type: "worm", label: "蚯蚓", ingId: "earthworm" },
    { type: "premium", label: "大物饵", ingId: "premium_bait" },
  ],
  BAIT_MAP = SEASON_BAITS.map((e) => ({ type: e.type, label: e.name, ingId: e.baitId })),
  NIGHT_BAIT = { ingId: "bait_night" };

function BaitSelector({ state: e, onFish: n, onEnterRodShop: s, onSetBait: a, onMakeBait: o }) {
  var y, j, v, w;
  const l = e.fishBaitType ?? "loach",
    c =
      ((y = CATCH_TYPES.find((N) => N.type === l)) == null ? void 0 : y.ingId) ??
      ((j = BAIT_MAP.find((N) => N.type === l)) == null ? void 0 : j.ingId) ??
      (l === "night" ? NIGHT_BAIT.ingId : "loach"),
    u = ((v = e.ingredients[c]) == null ? void 0 : v.qty) ?? 0,
    f = currentSolarTerm(e.day).name,
    g = SEASON_BAITS.filter((N) => N.terms.includes(f)),
    x = isNightHour(e.hour),
    m = ((w = e.ingredients.bait_night) == null ? void 0 : w.qty) ?? 0,
    p = (e.products ?? [])
      .filter((N) => N.recipeId === "night_fry_snail")
      .reduce((N, S) => N + (S.qty ?? 0), 0);
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      !e.fishingRod &&
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-map-buy-rod-hint",
          onClick: s,
          className: "btn-chunky btn-xs btn-yellow w-full",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🎣" }),
            " 还没有鱼竿？去商店街鱼竿店看看",
          ],
        }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#64b5f6] bg-[#fbfdf6] p-2.5",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex gap-3",
            children: [
              jsxRuntime.jsx("div", {
                className: "flex w-[20%] shrink-0 items-center justify-center",
                children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "🎣" }),
              }),
              jsxRuntime.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "text-sm font-black text-[#4a2c17]",
                        children: [
                          "河边钓鱼",
                          jsxRuntime.jsxs("span", {
                            className: "ml-1.5 text-[10px] font-bold text-[#c62828]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "🏞️" }),
                              " 河边",
                            ],
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[11px] text-[#b08a6a]",
                        children: [
                          "需要鱼竿 + 鱼饵（今日 ",
                          e.fishedToday,
                          "/",
                          FISHING_DAILY_LIMIT,
                          " 次，当前鱼饵 ",
                          u,
                          " 份）",
                        ],
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[10px] font-bold text-[#6b4226]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                          "8 精力 · 收获鲫鱼/鲤鱼 · 罕见被鱼咬伤",
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                    children: jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": "btn-fish",
                      onClick: n,
                      disabled: !e.fishingRod || e.fishedToday >= FISHING_DAILY_LIMIT || u < 1 || e.energy < 8,
                      className: "btn-chunky btn-xs btn-brown",
                      children: e.fishingRod ? "钓鱼" : "先买鱼竿",
                    }),
                  }),
                ],
              }),
            ],
          }),
          x &&
            jsxRuntime.jsxs("p", {
              className:
                "mt-1.5 rounded-lg border border-[#b39ddb] bg-[#ede7f6] px-2 py-1 text-[10px] font-black text-[#4a148c]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🌙" }),
                " 夜钓中：夜行鱼就着月光出动了，用夜香螺饵试试",
              ],
            }),
          jsxRuntime.jsxs("div", {
            className: "mt-2 flex flex-wrap items-center gap-1.5",
            children: [
              CATCH_TYPES.map((N) => {
                var V;
                const S = ((V = e.ingredients[N.ingId]) == null ? void 0 : V.qty) ?? 0,
                  C = l === N.type;
                return jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-testid": `btn-bait-${N.type}`,
                    onClick: () => a(N.type),
                    className: `rounded-full border-2 px-2.5 py-1 text-[10px] font-black active:scale-95 ${C ? "border-[#64b5f6] bg-[#e1f5fe] text-[#0277bd]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "emoji",
                        children: N.type === "loach" || N.type === "worm" ? "🪱" : "🦐",
                      }),
                      " ",
                      N.label,
                      " ×",
                      S,
                    ],
                  },
                  N.type,
                );
              }),
              jsxRuntime.jsx("span", {
                className: "text-[10px] font-bold text-[#b08a6a]",
                children: "鱼饵在农贸市场买",
              }),
            ],
          }),
          x &&
            m > 0 &&
            jsxRuntime.jsxs("div", {
              className: "mt-1.5 flex flex-wrap items-center gap-1.5",
              children: [
                jsxRuntime.jsxs("button", {
                  type: "button",
                  "data-testid": "btn-bait-night",
                  onClick: () => a("night"),
                  className: `rounded-full border-2 px-2.5 py-1 text-[10px] font-black active:scale-95 ${l === "night" ? "border-[#b39ddb] bg-[#ede7f6] text-[#4a148c]" : "border-[#e1bee7] bg-white text-[#7b1fa2]"}`,
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🌙" }),
                    " 夜香螺饵 ×",
                    m,
                  ],
                }),
                jsxRuntime.jsx("span", {
                  className: "text-[10px] font-bold text-[#b08a6a]",
                  children: "夜香螺饵不可买，晚上用夜市炒螺现场制",
                }),
              ],
            }),
          BAIT_MAP.some((N) => {
            var S;
            return (((S = e.ingredients[N.ingId]) == null ? void 0 : S.qty) ?? 0) > 0;
          }) &&
            jsxRuntime.jsx("div", {
              className: "mt-1.5 flex flex-wrap items-center gap-1.5",
              children: BAIT_MAP.map((N) => {
                var V;
                const S = ((V = e.ingredients[N.ingId]) == null ? void 0 : V.qty) ?? 0;
                if (S < 1) return null;
                const C = l === N.type;
                return jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-testid": `btn-bait-${N.type}`,
                    onClick: () => a(N.type),
                    className: `rounded-full border-2 px-2.5 py-1 text-[10px] font-black active:scale-95 ${C ? "border-[#a5d6a7] bg-[#e8f5e9] text-[#2e7d32]" : "border-[#dcedc8] bg-white text-[#558b2f]"}`,
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "emoji",
                        children:
                          N.label === "青团饵"
                            ? "🟢"
                            : N.label === "酸香虾饵"
                              ? "🍤"
                              : N.label === "甜香糕饵"
                                ? "🎃"
                                : "🥣",
                      }),
                      " ",
                      N.label,
                      " ×",
                      S,
                    ],
                  },
                  N.type,
                );
              }),
            }),
          (g.length > 0 || x) &&
            jsxRuntime.jsxs("div", {
              className: "mt-2 rounded-xl border-2 border-dashed border-[#a5d6a7] bg-[#f1f8e9] p-2",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-[10px] font-black text-[#2e7d32]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🍳" }),
                    " 现场制饵",
                    x ? `（${f} · 夜钓中）` : `（${f}）`,
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "text-[9px] font-bold text-[#558b2f]",
                  children:
                    "1 份节气料理 → 3 个节气饵（对应节气窗口钓限定鱼）；1 份夜市炒螺 → 3 个夜香螺饵（仅夜间）",
                }),
                jsxRuntime.jsxs("div", {
                  className: "mt-1 flex flex-wrap gap-1.5",
                  children: [
                    g.map((N) => {
                      const S = (e.products ?? [])
                        .filter((C) => C.recipeId === N.dishId)
                        .reduce((C, V) => C + (V.qty ?? 0), 0);
                      return jsxRuntime.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-testid": `btn-make-bait-${N.type}`,
                          onClick: () => o(N.type),
                          disabled: S < 1,
                          className:
                            "rounded-full border-2 border-[#a5d6a7] bg-white px-2.5 py-1 text-[10px] font-black text-[#2e7d32] active:scale-95 disabled:opacity-40",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: N.emoji }),
                            " ",
                            N.name,
                            "（需 ",
                            N.dishName,
                            " ×",
                            S,
                            "）",
                          ],
                        },
                        N.type,
                      );
                    }),
                    x &&
                      jsxRuntime.jsxs("button", {
                        type: "button",
                        "data-testid": "btn-make-bait-night",
                        onClick: () => o("night"),
                        disabled: p < 1,
                        className:
                          "rounded-full border-2 border-[#b39ddb] bg-white px-2.5 py-1 text-[10px] font-black text-[#4a148c] active:scale-95 disabled:opacity-40",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🌙" }),
                          " 夜香螺饵（需 夜市炒螺 ×",
                          p,
                          "）",
                        ],
                      }),
                  ],
                }),
              ],
            }),
        ],
      }),
    ],
  });
}

function FishingPanel({ ctx: e }) {
  var c;
  const { state: n } = e,
    s = n.fishBaitType ?? "loach",
    a =
      s === "worm"
        ? "earthworm"
        : s === "premium"
          ? "premium_bait"
          : s === "spring"
            ? "bait_spring"
            : s === "summer"
              ? "bait_summer"
              : s === "autumn"
                ? "bait_autumn"
                : s === "winter"
                  ? "bait_winter"
                  : s === "night"
                    ? "bait_night"
                    : "loach",
    o = ((c = n.ingredients[a]) == null ? void 0 : c.qty) ?? 0,
    l =
      s === "loach"
        ? "泥鳅"
        : s === "worm"
          ? "蚯蚓"
          : s === "premium"
            ? "大物饵"
            : s === "spring"
              ? "青团饵"
              : s === "summer"
                ? "酸香虾饵"
                : s === "autumn"
                  ? "甜香糕饵"
                  : s === "winter"
                    ? "姜酒温饵"
                    : "夜香螺饵";
  return jsxRuntime.jsxs("div", {
    className: "relative space-y-2",
    children: [
      jsxRuntime.jsx(FireflyLayer, { hour: n.hour }),
      jsxRuntime.jsx("p", {
        className:
          "rounded-xl border-2 border-[#90caf9] bg-[#e3f2fd] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#c62828]",
        children:
          "公园抓泥鳅 → 商店街鱼竿店买鱼竿 → 河边钓鱼。河里的鱼偶尔会咬人，受伤会掉健康（罕见）。",
      }),
      MapPlaceCard({
        keyId: "river-exercise",
        title: "🏃 锻炼",
        emoji: "🏃",
        sub: `今日 ${n.exercisedToday}/${DAILY_EXERCISE_LIMIT} 次 · 河边散步骑行，吹吹风心情好`,
        open: e.isCatOpen("river", "exercise"),
        onToggle: () => e.toggleCat("river", "exercise"),
        border: "border-[#42a5f5]",
        bg: "bg-[#f0f7ff]",
        titleColor: "text-[#0d47a1]",
        subColor: "text-[#c62828]",
        testId: "map-cat-river-exercise",
        children: EXERCISES.filter((u) => u.location === "river").map((u) =>
          jsxRuntime.jsx(ExerciseCard, { state: n, ex: u, onExercise: e.onExercise }, u.id),
        ),
      }),
      MapPlaceCard({
        keyId: "river-gather",
        title: "🦐 徒手捞虾摸螺",
        emoji: "🦐",
        sub: `今日 ${n.riverGatheredToday ?? 0}/${RIVER_GATHER_LIMIT} 次 · 不需要鱼竿鱼饵，浅滩直接下手`,
        open: e.isCatOpen("river", "gather"),
        onToggle: () => e.toggleCat("river", "gather"),
        border: "border-[#80cbc4]",
        bg: "bg-[#e0f2f1]",
        titleColor: "text-[#00695c]",
        subColor: "text-[#c62828]",
        testId: "map-cat-river-gather",
        children: jsxRuntime.jsx("div", {
          className: "rounded-xl border-2 border-[#80cbc4] bg-[#fbfdf6] p-2.5",
          children: jsxRuntime.jsxs("div", {
            className: "flex gap-3",
            children: [
              jsxRuntime.jsx("div", {
                className: "flex w-[20%] shrink-0 items-center justify-center",
                children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "🦐" }),
              }),
              jsxRuntime.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "text-sm font-black text-[#4a2c17]",
                        children: [
                          "河边捞虾捡田螺",
                          jsxRuntime.jsxs("span", {
                            className: "ml-1.5 text-[10px] font-bold text-[#c62828]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "🏞️" }),
                              " 河边",
                            ],
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[11px] text-[#b08a6a]",
                        children: [
                          "挽起裤脚在浅滩徒手捞：河虾、白虾、小龙虾、田螺，运气好能碰上罗氏沼虾（今日 ",
                          n.riverGatheredToday ?? 0,
                          "/",
                          RIVER_GATHER_LIMIT,
                          " 次）",
                        ],
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[10px] font-bold text-[#6b4226]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                          "8 精力 · 30 分钟 · 不占钓鱼次数 · 捞到的虾能熬虾酱",
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                    children: jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": "btn-river-gather",
                      onClick: e.onRiverGather,
                      disabled: (n.riverGatheredToday ?? 0) >= RIVER_GATHER_LIMIT || n.energy < 8,
                      className: "btn-chunky btn-xs btn-green",
                      children: "捞虾摸螺",
                    }),
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      MapPlaceCard({
        keyId: "river-fish",
        title: "🎣 河边钓鱼",
        emoji: "🎣",
        sub: `今日 ${n.fishedToday}/${FISHING_DAILY_LIMIT} 次 · ${l}饵料 ${o} 份`,
        open: e.isCatOpen("river", "fish"),
        onToggle: () => e.toggleCat("river", "fish"),
        border: "border-[#b39ddb]",
        bg: "bg-[#e8f1fb]",
        titleColor: "text-[#0d47a1]",
        subColor: "text-[#c62828]",
        testId: "map-cat-river-fish",
        children: jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx(BaitSelector, {
              state: n,
              onFish: e.onFish,
              onEnterRodShop: e.onEnterRodShop,
              onSetBait: e.onSetFishBait,
              onMakeBait: e.onMakeBait,
            }),
            jsxRuntime.jsxs("div", {
              className:
                "mt-1.5 flex gap-2 rounded-xl border-2 border-[#90caf9] bg-[#f0f7ff] px-2.5 py-2",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex w-[20%] shrink-0 items-center justify-center",
                  children: jsxRuntime.jsx("span", { className: "emoji text-xl", children: "🎣" }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsx("p", {
                          className: "text-xs font-black text-[#0d47a1]",
                          children: "河边渔具摊 · 鱼饲料",
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[10px] font-bold text-[#b08a6a]",
                          children: ["金鱼的口粮，喂食恢复健康（现有 ", n.fishFeed ?? 0, " 份）"],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: jsxRuntime.jsxs("button", {
                        type: "button",
                        "data-testid": "btn-river-buy-fish-feed",
                        className: "btn-chunky btn-xs btn-yellow",
                        onClick: e.onBuyFishFeed,
                        disabled: n.coins < FISH_FEED_PRICE,
                        children: ["买 1 份 ¥", FISH_FEED_PRICE],
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      e.hereNpcsAt("river").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("river"),
          locId: "river",
          badgeText: "🟢 公共场合",
          extraAction: {
            label: "伴钓",
            testIdPrefix: "btn-companion-fish",
            onClick: (u) => e.onCompanionFish(u),
          },
        }),
    ],
  });
}

const NEWSPAPER_ISSUES = [
  {
    head: "镇历三年 · 夏月初九日 · 商务版 · 第 41 期",
    title: "集市街新气象　韩氏货栈隆重开张",
    body: "本报讯　位于集市街的韩氏货栈昨日正式开张。店主韩某某年纪轻轻，进货踏实、待人和气，开张首日便引来不少乡邻捧场。韩某某拱手道：「小本生意，讲的就是个实在。」不少老主顾当场就订下了往后的货。",
  },
  {
    head: "镇历六年 · 秋月廿八日 · 农事版 · 第 52 期",
    title: "镇郊温室建成　腊月也有鲜菜上市",
    body: "本报讯　镇郊温室日前落成投用，主要赞助者之一的田某某到场剪彩。温室内温度湿度均可调节，反季蔬菜长势喜人，首批鲜菜随即供往集市。农户们算了笔账：往年落雪吃菜难，往后冬天也有青翠下锅。田某某笑言：「菜好，日子就差不了。」",
  },
  {
    head: "镇历八年 · 冬月廿二日 · 社会版 · 第 63 期",
    title: "清理整顿见成效　商户韩某某被依法查处",
    body: "本报讯　本县近期开展清理整顿，一批违法人员被依法查处。本地商户韩某某名列其中，经查其经营往来存在多项问题，被依法判刑，名下货栈一并停业。乡邻议论纷纷，都说平日看着体面，里子早就不干净了。具体案情本报不作细表。",
  },
  {
    head: "镇历十一年 · 夏月十九日 · 社会版 · 第 71 期",
    title: "台风过境　全镇协力修棚补屋",
    body: "本报讯　上旬台风过境，镇上部分棚舍受损、街面积水，所幸无人员伤亡。风歇当日，邻里便自发帮着排水、修棚，商户们你出钉子我出木板。镇政府随后下发修缮补助，镇长带人挨街查看灾情。有老街坊说：「天要刮风拦不住，人心齐是真金白银。」",
  },
  {
    head: "镇历十三年 · 秋月十六日 · 农事版 · 第 88 期",
    title: "枝头出良种　何某某团队育成改良柿子",
    body: "本报讯　由农业部门老领导何某某主持的研究项目传来捷报：历经数年改良的柿子新品种试种喜人——皮厚耐放、甜度高，摘下来就能吃，不再涩口。据悉，该项目此前曾因用地纠纷一度停滞，何某某带人重新选址、从头再来，方有今日。果农们说：「跟着何家的苗下地，心里踏实。」",
  },
  {
    head: "镇历十四年 · 秋月十四日 · 农事版 · 第 90 期",
    title: "温室引种改良柿　反季挂果丰收在望",
    body: "本报讯　镇郊温室引种何某某团队的改良柿苗，棚内长势喜人，头茬果即将上市。温室赞助方田某某说：「好苗配上好棚，柿子甜得能招蜜蜂。」两家人还在棚里合计了来年的推广盘子，说是要让周边乡镇也尝上这口甜。",
  },
  {
    head: "镇历十五年 · 春月初二日 · 要闻版 · 第 97 期",
    title: "年轻干部履新　赵为民出任本镇镇长",
    body: "本报讯　经上级任命，赵为民出任本镇镇长。赵为民出身普通，早年在县里做文书，回镇后一双腿往田里跑、挨家挨户问百姓的事，口碑颇佳。履新当日他表示：「官不大，事不少；百姓的事，一件一件办。」据悉，多位老领导对其评价颇高。",
  },
  {
    head: "镇历十七年 · 秋月廿六日 · 要闻版 · 第 102 期",
    title: "风调雨顺话丰年　粮菜双收集市旺",
    body: "本报讯　今年风调雨顺，田里粮食、温室蔬菜双双丰收，集市摊位比往年多出一排。果农们说，今年的果子甜度高、卖相好，树上的还没下完，预订的就排上了。镇里趁势办了丰收集市，赵镇长到场给种田能手发了红榜。",
  },
  {
    head: "镇历二十二年 · 秋月十八日 · 社会版 · 第 126 期",
    title: "韩家为女招赘　沈姓才俊入赘成礼",
    body: "本报讯　本镇韩家为女招婿，喜事连办三日，宾客盈门。新娘韩雅琴是韩家独女，新郎沈国豪仪表堂堂、为人精干，入赘后将在韩家产业做事。韩某某逢人便夸女婿能干。乡邻纷纷道贺：「强强联合，好日子在后头。」",
  },
  {
    head: "镇历二十三年 · 春月十二日 · 社会版 · 第 132 期",
    title: "本地商人韩某某多项违法行为获刑入狱",
    body: "本报讯　经审理查明，本地商人韩某某因多项违法行为，近日被依法判处有期徒刑。据悉，其违法事项涉及经营往来中的多项违规行为，具体案情本报不作细表。判决生效后，其名下店铺已暂停营业，相关善后事宜正在处理中。本报提醒广大商户：诚信经营，方能长久。",
  },
  {
    head: "镇历二十三年 · 春月十九日 · 社会版 · 第 134 期",
    title: "韩家招赘续闻　女婿被逼入赘另有隐情？",
    body: "本报讯　本镇韩家为女儿招赘一事，近日成为街头巷尾热议的话题。据知情人士透露，韩家女婿沈国豪当年系被逼入赘，原被当作顶罪人选，婚事背后另有隐情。截至发稿，韩家与沈家均未对此作出公开回应。本报将继续关注。",
  },
  {
    head: "镇历二十三年 · 冬月初五日 · 政务版 · 第 139 期",
    title: "镇长走访商户稳人心　韩家善后获政府支持",
    body: "本报讯　韩某某获刑后，其名下产业的善后一度成为镇上热议。近日，赵镇长带队走访相关商户，明确表示善后依法依规、手续从简、扶持到位。韩某某之女韩女士接手处理善后事务，赵镇长称赞其「办事实在、有担当」。镇里还捎了句话：案子是案子，日子是日子，商户的生计不能停。",
  },
  {
    head: "镇历二十四年 · 春月十九日 · 商务版 · 第 140 期",
    title: "沈氏机械厂挂牌　主营造冷设备",
    body: "本报讯　沈某某创办的沈氏机械厂昨日挂牌。沈某某此前在韩家产业历练两年，此番从零起盘，专攻制冷设备。他放出话来：「东西好不好，用十年见分晓。」首批设备已下线，前来问价的商户不少。有乡邻打趣：韩家姑爷自己当老板了。",
  },
  {
    head: "镇历二十五年 · 春月十二日 · 社会版 · 第 142 期",
    title: "何家闺女出阁　新郎为中学体育老师",
    body: "本报讯　机关家属院何家嫁女，新郎是镇中学的体育高老师。席间有人打趣：何家这样的门第，闺女自个儿挑了个教书的。何家二老只说，孩子看得对眼，比什么都强。街坊们道贺之余都夸新郎实诚：「一看就是会疼人的。」",
  },
  {
    head: "镇历二十六年 · 夏月初七日 · 经济版 · 第 147 期",
    title: "老厂宣布停工　百余名工人面临再就业",
    body: "本报讯　镇上老牌纺织厂因订单锐减、设备老化，日前宣布停工，百余名工人陆续待业。告示贴出当日，不少老工人在厂门口围着看了又看，半天没人说话。有工人说：「厂子在的时候没觉得，这一停，心里空落落的。」镇里回应：再就业安置方案已在拟定中。",
  },
  {
    head: "镇历二十六年 · 秋月廿三日 · 民生版 · 第 148 期",
    title: "再就业培训班开课　镇政府牵线搭桥",
    body: "本报讯　针对停工待业人员，镇政府牵线的再就业培训班日前开课，首期开设司机、烹饪、缝纫等课程，报名十分踊跃。赵镇长到场查看开课情况，叮嘱工作人员：「手续能简则简，岗位能多则多。」有学员笑称：这把年纪再学手艺，晚了点，总比在家干坐着强。",
  },
  {
    head: "镇历二十七年 · 冬月十一日 · 民生版 · 第 151 期",
    title: "寒冬里的一把葱　邻里互助暖人心",
    body: "本报讯　入冬以来，镇上待业人家日子紧巴，邻里间的互助却热乎起来：有人把自己种的葱成捆送到街坊门口，有人帮着照看孩子，集市上的零工摊前也排起了队。有街坊感慨：「钱紧的日子见过，人心这么齐的镇子还是头回见。」",
  },
  {
    head: "镇历二十八年 · 春月十四日 · 社会版 · 第 153 期",
    title: "送上门的门路　韩女士善举获交口称赞",
    body: "本报讯　自纺织厂停工以来，本地人士韩女士走街串巷，挨家送物资、帮着打听门路，经她牵线重新上工的家庭已有数十户。有受助工人说：「人家送来的不只是东西，是念想。」韩女士表示，善事不分大小，「在于用心」。",
  },
  {
    head: "镇历二十九年 · 冬月廿七日 · 商务版 · 第 155 期",
    title: "沈氏制冷订单盈门　质保口碑传开",
    body: "本报讯　入冬以来，沈氏机械厂的制冷设备订单排到了年后。据了解，该厂设备故障率低、售后上门快，回头的老主顾带来了大半订单。沈某某仍那句老话：「做生意要讲良心。」据悉，厂里正琢磨把制冷的手艺往别处使使——至何处，厂里卖了个关子。",
  },
  {
    head: "镇历三十一年 · 秋月十六日 · 农事版 · 第 157 期",
    title: "温室扩建一新　平价鲜菜供全镇",
    body: "本报讯　镇郊温室完成扩建，赞助方田家追加投入，新棚面积翻了一倍。入冬后鲜菜以平价直供集市，摊主们省了外调的运费，买菜的街坊得了实惠。田某某还是那套说辞：「菜篮子稳了，日子才稳。」",
  },
  {
    head: "镇历三十四年 · 春月廿四日 · 商务版 · 第 159 期",
    title: "沈氏汽车下线　本地制造驶出厂门",
    body: "本报讯　沈氏机械厂更名沈氏集团后的首批汽车昨日下线。多年制冷手艺用在了车用设备上，整车测试表现不俗。沈某某亲自为头车揭幕，笑称「造车是制冷的远房亲戚，一家的手艺」。据悉，首批订单不少是镇上跑运输的老主顾下的。",
  },
  {
    head: "镇历三十七年 · 冬月十五日 · 商务版 · 第 164 期",
    title: "沈氏速冻食品上市　锅一热就是一顿饭",
    body: "本报讯　沈氏集团速冻食品系列近日上市，饺子、丸子等首批十余种。厂里把造汽车品控的那股较真劲搬到了吃食上，冷链一路到位。主妇们尝过后说：「下班回家锅一热，热热乎乎就是一顿。」业内人士称，这是本地食品行当头一遭。",
  },
  {
    head: "镇历四十年 · 夏月廿一日 · 商务版 · 第 167 期",
    note: "（十来年前的旧报纸，纸页微黄）",
    title: "沈氏快餐首店开业　现做现卖明厨亮灶",
    body: "本报讯　沈氏集团旗下快餐连锁首店昨日在镇上开业，主打现做现卖、明厨亮灶，速冻系列改成门店现包现蒸。开业当日队伍排到街角，沈某某亲自在门口招呼：「开店和造车一个理，料要真。」据悉，二期门店已在筹备。",
  },
  {
    head: "镇历四十二年 · 秋月十九日 · 社会版 · 第 170 期",
    note: "（十来年前的旧报纸，纸页微黄）",
    title: "温室再助公益　爱心菜送进困难户",
    body: "本报讯　镇郊温室与本镇慈善基金结成老搭档：每逢节令，由田家温室赞助的平价爱心菜准时送到困难户门口，一送就是好些年。慈善基金的韩女士代收好意，数着账把菜一户户送到。田某某说：「出钱是小事，长长久久才是心意。」",
  },
  {
    head: "镇历四十四年 · 夏月十九日 · 社会版 · 第 175 期",
    note: "（近两年归档的报纸，墨迹尚新）",
    title: "收容所毛孩子网络走红　镜头后面有个甜姑娘",
    body: "本报讯　镇上收容所的猫猫狗狗近来在网上走红，视频里给狗做饭的志愿者姑娘被网友唤作「甜姐姐」，粉丝数蹭蹭上涨。据了解，不少流浪猫狗经她宣传找到了新家。收容所表示：走红不图别的，盼它们都有个家。",
  },
  {
    head: "镇历四十四年 · 秋月十六日 · 社会版 · 第 177 期",
    note: "（近两年归档的报纸，墨迹尚新）",
    title: "广场新雕塑落成　原型是条狗",
    body: "本报讯　广场上落成一座狗形雕塑，由本地慈善人士韩女士出资捐建，模样正是收容所里走红的那条狗。落成当日围观者众，韩女士致辞感谢「把美好留在小镇的人」。至于图纸出自谁手，她照旧笑而不提，只说：「年轻人的眼睛里有新镇子。」",
  },
  {
    head: "镇历四十四年 · 冬月十九日 · 社会版 · 第 179 期",
    note: "（近两年归档的报纸，墨迹尚新）",
    title: "网红狗有了新家　收容所收到一箩筐申请",
    body: "本报讯　广场上那座雕塑的原型——收容所网红狗——日前被一户好心人家正式收养。消息传开，申请领养的街坊排起了队，收容所提醒：领养要看缘分，更要看责任心。志愿者姑娘乐得直拍手：「一个个都有家，比涨粉还高兴。」",
  },
  {
    head: "镇历四十五年 · 夏月十三日 · 商务版 · 第 182 期",
    note: "（近两年归档的报纸，墨迹尚新）",
    title: "沈氏上新宠物零食　头一份送进收容所",
    body: "本报讯　沈氏集团近日推出宠物零食系列，上市头一批全数送到收容所，毛孩子们先尝为快。宣传片由镇上那位十万粉丝的年轻博主操刀，镜头里的毛狗吃得头都不抬。沈氏方面表示：卖零食是生意，让它们吃好是本分。",
  },
];

const NEWSPAPER_ADS = [
  { since: 0, text: "志强包子 · 百年老号——一屉热乎，暖到脚底。" },
  { since: 0, text: "苏记老铺——祖传桃酥，一口酥到心里。" },
  { since: 6, text: "田家温室——落雪天，也有青翠下锅。" },
  { since: 0, text: "镇银行储蓄柜——家底，从一张存单攒起。" },
  { since: 0, text: "林家果园——果子树上熟，预订从速。" },
  { since: 0, text: "镇图书馆报刊室——常年开放，旧报纸免费翻阅。" },
  { since: 24, text: "沈氏机械——制冷设备，十年不坏。" },
  { since: 44, text: "动物收容所——领养代替购买，多陪它一程。" },
];

function parseIssueYear(h) {
  const n = { 零: 0, 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
  let m = h.slice(2).split(" ·")[0].replace(/年.*$/, "");
  let y = 0;
  if (m.length > 1 && m[1] === "十") {
    y = n[m[0]] * 10;
    if (m[2]) y += n[m[2]] || 0;
  } else if (m[0] === "十") {
    y = 10;
    if (m[1]) y += n[m[1]] || 0;
  } else {
    y = n[m[0]] || 0;
  }
  return y;
}

function pickNewspaperAd(s, u) {
  const a = NEWSPAPER_ADS.filter((x) => x.since <= parseIssueYear(u.head));
  return a[s % a.length].text;
}

function NewspaperPanel({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState(0),
    [o, l] = React.useState(!1),
    c = () =>
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: BOOKS_GAME
          .filter((p) => p.library)
          .map((p) => {
            const x = n.home.readBooks.includes(p.id),
              m = getBookProgress(n.home, p.id),
              g = n.hour >= LIBRARY_OPEN_HOUR && n.hour < LIBRARY_CLOSE_HOUR,
              y = n.energy >= p.energy && g && n.hour + 1 <= LIBRARY_CLOSE_HOUR;
            return jsxRuntime.jsxs(
              "div",
              {
                className: "flex flex-col rounded-xl border-2 border-[#bcaaa4] bg-[#fffdf8] p-2",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-xl", children: p.emoji }),
                      x &&
                        jsxRuntime.jsx("span", {
                          className:
                            "rounded-full bg-[#e3f2fd] px-1.5 py-px text-[9px] font-bold text-[#c62828]",
                          children: "读过 ✓",
                        }),
                    ],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "mt-0.5 line-clamp-1 text-xs font-black text-[#4a2c17]",
                    children: ["《", p.name, "》"],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-[#b08a6a]",
                    children: p.desc,
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "mt-0.5 text-[9px] font-bold text-[#6b4226]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                      p.energy,
                      " 精力 · 理解度 +",
                      p.knowledgeGain,
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "mt-1",
                    children: [
                      jsxRuntime.jsxs("div", {
                        className: "flex justify-between text-[9px] font-bold text-[#b08a6a]",
                        children: [
                          jsxRuntime.jsx("span", { children: "借阅进度" }),
                          jsxRuntime.jsxs("span", { className: "num", children: [m, "%"] }),
                        ],
                      }),
                      jsxRuntime.jsx("div", {
                        className: "bar-track mt-0.5",
                        style: { height: 6 },
                        role: "progressbar",
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        "aria-valuenow": m,
                        "aria-label": `借阅进度 ${m}%`,
                        children: jsxRuntime.jsx("div", {
                          className: "bar-fill",
                          style: {
                            width: `${m}%`,
                            background: "linear-gradient(90deg,#b39ddb,#7e57c2)",
                          },
                        }),
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": `btn-library-${p.id}`,
                    onClick: () => e.onLibraryRead(p.id),
                    disabled: !y,
                    className: "btn-chunky btn-xs btn-brown mt-1 w-full",
                    children: n.hour >= LIBRARY_CLOSE_HOUR ? "已闭馆" : n.hour + 1 > LIBRARY_CLOSE_HOUR ? "来不及读完" : "借阅阅读",
                  }),
                ],
              },
              p.id,
            );
          }),
      }),
    u = NEWSPAPER_ISSUES[s],
    f = () =>
      n.hour < LIBRARY_OPEN_HOUR || n.hour >= LIBRARY_CLOSE_HOUR
        ? jsxRuntime.jsx("div", {
            className: "overflow-hidden rounded-xl border-2 border-[#a1887f] bg-[#f6ecd8] p-3",
            "aria-label": "旧报纸收藏 · 图书馆已闭馆",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-center text-xs font-black text-[#5d4037]",
                children: "🔒 图书馆已闭馆",
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 text-center text-[10px] font-bold leading-relaxed text-[#795548]",
                children: "旧报纸只在开放时间（上午 10 点到下午 6 点）可读，明儿再来翻吧。",
              }),
            ],
          })
        : jsxRuntime.jsxs("div", {
            className: "space-y-2",
            children: [
              jsxRuntime.jsxs("div", {
                className: "overflow-hidden rounded-xl border-2 border-[#b08968] bg-[#f6ecd8] p-3",
                "aria-label": `旧报纸第 ${s + 1} 版：${u.title}`,
                children: [
                  jsxRuntime.jsx("p", {
                    className: "text-center text-sm font-black tracking-widest text-[#5d4037]",
                    children: "甜蜜小镇日报",
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-center text-[8px] font-bold tracking-[0.3em] text-[#8d6e63]",
                    children: "SWEET TOWN DAILY",
                  }),
                  jsxRuntime.jsx("p", {
                    className:
                      "mt-1 border-y-2 border-double border-[#a1887f] py-0.5 text-center text-[8px] font-bold text-[#795548]",
                    children: u.head,
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-1 text-center text-[8px] font-bold text-[#a1887f]",
                    children: u.note || "（图书馆档案室收藏的旧报纸，纸页已泛黄）",
                  }),
                  jsxRuntime.jsx("p", {
                    className:
                      "mt-2 border-t-2 border-[#a1887f] pt-1.5 text-center text-[11px] font-black leading-snug text-[#3e2723]",
                    children: u.title,
                  }),
                  jsxRuntime.jsx("p", {
                    className:
                      "mt-1 whitespace-pre-wrap text-[10px] font-bold leading-relaxed text-[#4e342e]",
                    children: u.body,
                  }),
                  jsxRuntime.jsxs("div", {
                    className:
                      "mt-2 flex items-center justify-between border-t border-dashed border-[#a1887f] pt-1.5",
                    children: [
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-news-prev",
                        disabled: s === 0,
                        onClick: () => {
                          const p = Math.max(0, s - 1);
                          a(p);
                          const x = NEWSPAPER_ISSUES[p];
                          speak(`旧报纸第 ${p + 1} 版：${x.title}。${x.body}`);
                        },
                        className: "btn-chunky btn-xs btn-brown",
                        children: "◀ 上一版",
                      }),
                      jsxRuntime.jsxs("span", {
                        className: "text-[9px] font-black text-[#795548]",
                        children: ["第 ", s + 1, " / ", NEWSPAPER_ISSUES.length, " 版"],
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-news-next",
                        disabled: s === NEWSPAPER_ISSUES.length - 1,
                        onClick: () => {
                          const p = Math.min(NEWSPAPER_ISSUES.length - 1, s + 1);
                          a(p);
                          const x = NEWSPAPER_ISSUES[p];
                          speak(`旧报纸第 ${p + 1} 版：${x.title}。${x.body}`);
                        },
                        className: "btn-chunky btn-xs btn-brown",
                        children: "下一版 ▶",
                      }),
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("p", {
                "data-testid": "news-ad",
                className:
                  "rounded-lg border border-dashed border-[#b08968] bg-[#fdf6e3] px-2 py-1 text-[9px] font-bold text-[#8d6e63]",
                children: ["【报缝广告】", pickNewspaperAd(s, u)],
              }),
              jsxRuntime.jsx("p", {
                className:
                  "rounded-lg bg-[#efe3cf] px-2 py-1 text-[9px] font-bold leading-relaxed text-[#6d4c41]",
                children:
                  "这些旧报纸静静躺在图书馆的报刊架上，年头最老的四十来年、最近的也落了灰，按先后排好——一版一版翻下去，镇上的旧事就慢慢串起来了。泛黄的纸页里，常常藏着老一辈不提的当年。",
              }),
            ],
          });
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsx("p", {
        className:
          "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
        children:
          "图书馆的书只能当场借阅、不能带走：读到的知识和解锁的配方照样进脑子。闭馆前得看完；想随时读可以到商店街书店买回家。",
      }),
      MapPlaceCard({
        keyId: "library-read",
        title: "📚 借阅阅读",
        emoji: "📚",
        sub:
          n.hour >= LIBRARY_OPEN_HOUR && n.hour < LIBRARY_CLOSE_HOUR
            ? `🟢 营业中 · 今日 ${BOOKS_GAME.filter((p) => p.library).length} 本可借`
            : `🔒 ${LIBRARY_OPEN_HOUR}:00-${LIBRARY_CLOSE_HOUR}:00 开放`,
        open: e.isCatOpen("library", "read"),
        onToggle: () => e.toggleCat("library", "read"),
        border: "border-[#9575cd]",
        bg: "bg-[#fbf7ff]",
        titleColor: "text-[#4527a0]",
        subColor: "text-[#6d4c41]",
        testId: "map-cat-library-read",
        children: c(),
      }),
      MapPlaceCard({
        keyId: "library-news",
        title: "📰 旧报纸收藏",
        emoji: "📰",
        sub:
          n.hour >= LIBRARY_OPEN_HOUR && n.hour < LIBRARY_CLOSE_HOUR
            ? `🟢 开放中 · 共 ${NEWSPAPER_ISSUES.length} 版可翻阅`
            : `🔒 ${LIBRARY_OPEN_HOUR}:00-${LIBRARY_CLOSE_HOUR}:00 开放`,
        openHoursKey: "news",
        open: o,
        onToggle: () => {
          const p = !o;
          if ((l(p), p)) {
            const x = NEWSPAPER_ISSUES[s];
            speak(
              n.hour >= LIBRARY_OPEN_HOUR && n.hour < LIBRARY_CLOSE_HOUR
                ? `旧报纸第 ${s + 1} 版：${x.title}。${x.body}`
                : "图书馆已闭馆，旧报纸上午十点到下午六点可读",
            );
          }
        },
        border: "border-[#a1887f]",
        bg: "bg-[#fbf5ea]",
        titleColor: "text-[#5d4037]",
        subColor: "text-[#795548]",
        testId: "map-cat-library-news",
        children: f(),
      }),
      e.hereNpcsAt("library").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("library"),
          locId: "library",
          badgeText: "🟢 公共场合",
        }),
    ],
  });
}
