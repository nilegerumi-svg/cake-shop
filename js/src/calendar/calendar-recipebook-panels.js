const RECIPE_CATEGORY_TABS = [
    { id: "bakery", label: "🍰 甜品烘焙" },
    { id: "drink", label: "🍹 饮品" },
    { id: "cuisine", label: "🍳 家常料理" },
  ],
  BAKERY_CATEGORIES = ["cake", "snack", "dessert", "bread"],
  DRINK_CATEGORIES = ["drink", "coffee", "icecream"],
  GUIDE_SECTIONS_SHOP = [
    {
      title: "开店营业",
      text: "店里摆上做好的点心就能接待顾客；节日与活动期间客流与单价会有加成，多留意顶上的节日横幅。",
    },
    {
      title: "料理品质",
      text: "点心的品质越高、卖价越好；用对应厨具制作更容易做出「完美」品质，卖相和口碑都会更好。",
    },
    {
      title: "义卖报名与摆摊",
      text: "义卖每 183 天一轮：前 7 天报名（¥100），第 8-15 天到市政府摆摊，每天最多卖 3 份家常料理，按 1.6 倍定价。",
    },
    {
      title: "商业活动",
      text: "在市政府花 ¥200 加面粉×5、糖×3、蛋×2 举办商业活动，客流加成最多持续 5 天。",
    },
    {
      title: "线上订购与配送",
      text: "手机购物与镇内结算同一套规则：随身装不下的自动转订购，满 5 件免配送费，1-4 件每件 ¥2，次日 8:00 送到店里。",
    },
    {
      title: "随身携带",
      text: "徒手最多带 2 件，帆布背包上限 10 件；礼物、小装饰、料理（保温食盒）与活鱼（活鱼桶）才能随身带，建材不能带。",
    },
    {
      title: "送礼与好感",
      text: "礼物要先在手机里装到身上才能送出；好感度 30 可电话邀约，40 解锁备忘录里的生日与 MBTI，70 解锁人物背景。",
    },
    {
      title: "生日祝福",
      text: "伙伴生日当天聊天和送礼都有额外好感加成，备忘录会标出今天过生日的伙伴。",
    },
    {
      title: "存档读档",
      text: "每天结束会自动存档，也可以随时手动存档；多留几个档位，换着体验不同玩法。",
    },
    {
      title: "盲人模式",
      text: "右上角可开启盲人模式，关键操作与弹窗内容都会语音播报，还支持语音指令快捷操作。",
    },
  ];

function ExpandButton({ open: e, onToggle: n, testId: s, title: a, right: o }) {
  return jsxRuntime.jsxs("button", {
    type: "button",
    "data-testid": s,
    "aria-expanded": e,
    onClick: n,
    className: "flex w-full items-center gap-1.5 py-0.5 text-left active:scale-[0.99]",
    children: [
      jsxRuntime.jsx("span", {
        "aria-hidden": "true",
        className: `material-icons shrink-0 text-lg text-[#6b4226] transition-transform ${e ? "" : "-rotate-90"}`,
        children: "expand_more",
      }),
      jsxRuntime.jsx("span", {
        className: "min-w-0 flex-1 truncate text-[11px] font-black text-[#6b4226]",
        children: a,
      }),
      o &&
        jsxRuntime.jsx("span", { className: "shrink-0 text-[9px] font-bold text-[#b08a6a]", children: o }),
    ],
  });
}

function RecipeBookPanel({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState(null),
    [o, l] = React.useState("bakery"),
    [c, u] = React.useState(!1),
    [f, g] = React.useState(""),
    [x, m] = React.useState({}),
    p = (C) => a((V) => (V === C ? null : C)),
    y = (C) => m((V) => ({ ...V, [C]: !V[C] })),
    j = React.useMemo(
      () =>
        Object.values(RECIPE_RUNTIME_DATA)
          .filter((V) => {
            if (
              (c && (V.unlockCost ?? 0) !== 0) ||
              !(o === "bakery"
                ? BAKERY_CATEGORIES.includes(V.category)
                : o === "drink"
                  ? DRINK_CATEGORIES.includes(V.category)
                  : (V.system ?? "bakery") === "cuisine")
            )
              return !1;
            const F = f.trim();
            return F ? V.name.includes(F) || V.desc.includes(F) : !0;
          })
          .sort((V, E) => V.name.localeCompare(E.name, "zh")),
      [o, f, c],
    ),
    v = React.useMemo(
      () =>
        Object.values(RECIPE_RUNTIME_DATA)
          .filter((V) =>
            o === "bakery"
              ? BAKERY_CATEGORIES.includes(V.category)
              : o === "drink"
                ? DRINK_CATEGORIES.includes(V.category)
                : (V.system ?? "bakery") === "cuisine",
          )
          .filter((V) => (n.recipes[V.id] ?? -1) >= 0).length,
      [o, n.recipes],
    ),
    w = FISH_SIZE_PARK.filter((C) => C.source === "river" && !C.solarTerms && !C.nightOnly),
    N = ["mandarin_fish", "swamp_eel", "topmouth_culter", "koi"],
    S = N.map((C) => {
      var V;
      return ((V = INGREDIENT_MAP[C]) == null ? void 0 : V.name) ?? C;
    }).join("、");
  return jsxRuntime.jsx("div", {
    className: "phone-app-bg space-y-2 rounded-2xl p-2",
    children: jsxRuntime.jsxs("div", {
      className: "space-y-1.5",
      children: [
        jsxRuntime.jsxs("div", {
          className: "rounded-xl border-2 border-[#f0dcc0] bg-[#fffaf3] px-2 py-1.5",
          children: [
            jsxRuntime.jsx(ExpandButton, {
              open: s === "recipes",
              onToggle: () => p("recipes"),
              testId: "btn-phone-web-tab-recipes",
              title: "📖 食谱大全",
              right: `已解锁 ${v}`,
            }),
            s === "recipes" &&
              jsxRuntime.jsxs("div", {
                className: "mt-1.5 space-y-2",
                children: [
                  jsxRuntime.jsx("div", {
                    className: "flex gap-1",
                    children: RECIPE_CATEGORY_TABS.map((C) =>
                      jsxRuntime.jsx(
                        "button",
                        {
                          type: "button",
                          "data-testid": `btn-phone-web-group-${C.id}`,
                          onClick: () => l(C.id),
                          className: `btn-chunky btn-xs flex-1 ${o === C.id ? "btn-yellow" : "btn-gray"}`,
                          children: C.label,
                        },
                        C.id,
                      ),
                    ),
                  }),
                  jsxRuntime.jsx("div", {
                    className: "flex gap-1",
                    children: jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": "btn-phone-web-free",
                      "aria-pressed": c,
                      onClick: () => u((C) => !C),
                      className: `btn-chunky btn-xs flex-1 ${c ? "btn-green" : "btn-gray"}`,
                      children: ["✨ 免费食谱", c ? " · 已筛选" : ""],
                    }),
                  }),
                  jsxRuntime.jsx("input", {
                    "data-testid": "input-phone-web-search",
                    value: f,
                    onChange: (C) => g(C.target.value),
                    placeholder: "🔍 搜食谱名字或做法",
                    className:
                      "w-full rounded-xl border-2 border-[#d7c09a] bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#4a2c17] outline-none placeholder:text-[#c9b28c]",
                  }),
                  j.length === 0
                    ? jsxRuntime.jsx("div", {
                        className:
                          "rounded-xl border-2 border-dashed border-[#c9b28c] bg-[#fdf6ea] p-4 text-center",
                        children: jsxRuntime.jsx("p", {
                          className: "text-[11px] font-black text-[#b08a6a]",
                          children: "没有搜到匹配的食谱，换个关键词试试",
                        }),
                      })
                    : jsxRuntime.jsx("div", {
                        className: "space-y-1.5",
                        children: j.map((C) => {
                          const V = (n.recipes[C.id] ?? -1) >= 0,
                            E = Object.entries(C.ings)
                              .map(([F, J]) => {
                                var H;
                                return `${((H = INGREDIENT_MAP[F]) == null ? void 0 : H.name) ?? F}×${J}`;
                              })
                              .join("、");
                          return jsxRuntime.jsxs(
                            "div",
                            {
                              className: `rounded-xl border-2 px-2 py-1.5 ${V ? "border-[#a5d6a7] bg-[#f4fbf1]" : "border-[#e0d3bd] bg-[#faf4e9]"}`,
                              children: [
                                jsxRuntime.jsxs("p", {
                                  className: "text-[11px] font-black text-[#4a2c17]",
                                  children: [
                                    jsxRuntime.jsx("span", { className: "emoji", children: C.emoji }),
                                    " ",
                                    C.name,
                                    V
                                      ? jsxRuntime.jsx("span", {
                                          className:
                                            "ml-1 rounded-md bg-[#2e7d32] px-1.5 py-0.5 text-[8px] font-black text-white",
                                          children: "已解锁",
                                        })
                                      : jsxRuntime.jsx("span", {
                                          className:
                                            "ml-1 rounded-md bg-[#b08a6a] px-1.5 py-0.5 text-[8px] font-black text-white",
                                          children: "🔒 未解锁",
                                        }),
                                  ],
                                }),
                                V
                                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                      children: [
                                        jsxRuntime.jsxs("p", {
                                          className: "mt-0.5 text-[9px] font-bold text-[#558b2f]",
                                          children: ["食材：", E],
                                        }),
                                        jsxRuntime.jsx("p", {
                                          className:
                                            "mt-0.5 text-[9px] font-bold leading-relaxed text-[#6d4c2f]",
                                          children: C.desc,
                                        }),
                                      ],
                                    })
                                  : jsxRuntime.jsx("p", {
                                      className: "mt-0.5 text-[9px] font-bold text-[#b08a6a]",
                                      children:
                                        C.unlockCost > 0
                                          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                              children: [
                                                "？？？ · 花 ¥",
                                                C.unlockCost,
                                                " 研发解锁（研究台 / 书里都有线索）",
                                              ],
                                            })
                                          : jsxRuntime.jsx(jsxRuntime.Fragment, {
                                              children: "？？？ · 免费研发解锁（研究台就能直接研）",
                                            }),
                                    }),
                              ],
                            },
                            C.id,
                          );
                        }),
                      }),
                ],
              }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "rounded-xl border-2 border-[#f0dcc0] bg-[#fffaf3] px-2 py-1.5",
          children: [
            jsxRuntime.jsx(ExpandButton, {
              open: s === "help",
              onToggle: () => p("help"),
              testId: "btn-phone-web-tab-help",
              title: "💡 营业帮助",
              right: `共 ${GUIDE_SECTIONS_SHOP.length} 条`,
            }),
            s === "help" &&
              jsxRuntime.jsx("div", {
                className: "mt-1.5 space-y-1.5",
                children: GUIDE_SECTIONS_SHOP.map((C, V) =>
                  jsxRuntime.jsxs(
                    "div",
                    {
                      className: "rounded-xl border-2 border-[#ffe0b2] bg-[#fff8e1] px-2 py-1.5",
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "text-[11px] font-black text-[#b8860b]",
                          children: [
                            jsxRuntime.jsxs("span", { className: "emoji", children: [V + 1, "."] }),
                            " ",
                            C.title,
                          ],
                        }),
                        jsxRuntime.jsx("p", {
                          className: "mt-0.5 text-[9px] font-bold leading-relaxed text-[#8d6e63]",
                          children: C.text,
                        }),
                      ],
                    },
                    C.title,
                  ),
                ),
              }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "rounded-xl border-2 border-[#f0dcc0] bg-[#fffaf3] px-2 py-1.5",
          children: [
            jsxRuntime.jsx(ExpandButton, {
              open: s === "fish",
              onToggle: () => p("fish"),
              testId: "btn-phone-web-tab-fish",
              title: "🎣 钓鱼秘诀",
              right: "4 组",
            }),
            s === "fish" &&
              jsxRuntime.jsxs("div", {
                className: "mt-1.5 space-y-1.5",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl border-2 border-[#b3e5fc] bg-[#f0f9ff] px-2 py-1.5",
                    children: [
                      jsxRuntime.jsx(ExpandButton, {
                        open: !!x.basic,
                        onToggle: () => y("basic"),
                        testId: "fold-fish-basic",
                        title: "① 基础鱼",
                        right: x.basic ? "收起" : "展开",
                      }),
                      x.basic &&
                        jsxRuntime.jsxs("div", {
                          className: "mt-1 space-y-1.5",
                          children: [
                            jsxRuntime.jsx("p", {
                              className: "text-[9px] font-bold leading-relaxed text-[#4a6e8a]",
                              children:
                                "泥鳅（默认）各凭本事；蚯蚓对小杂鱼 ×2.5（黄鳝还额外 ×2）。",
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[9px] font-bold leading-relaxed text-[#4a6e8a]",
                              children: [
                                "🐟 常驻河鲜（",
                                w.length,
                                " 种）：",
                                w
                                  .map((C) => {
                                    var V;
                                    return `${((V = INGREDIENT_MAP[C.ingId]) == null ? void 0 : V.name) ?? C.ingId}${N.includes(C.ingId) ? "（稀）" : ""}`;
                                  })
                                  .join("、"),
                                "。",
                              ],
                            }),
                            jsxRuntime.jsxs("div", {
                              className:
                                "rounded-xl border-2 border-[#ffcc80] bg-[#fff8e1] px-2 py-1.5",
                              children: [
                                jsxRuntime.jsx("p", {
                                  className: "text-[11px] font-black text-[#b8860b]",
                                  children: "🏆 大物纪录",
                                }),
                                jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-0.5 text-[9px] font-bold leading-relaxed text-[#a08030]",
                                  children: [
                                    "钓到 ≥",
                                    BIG_FISH_CM,
                                    "cm 的鱼就触发「大物纪录」并计数，图鉴里会挂 🏅 徽标；尺寸上限 60cm，鱼类在河鲜养护缸里养着不会坏。",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl border-2 border-[#b3e5fc] bg-[#f0f9ff] px-2 py-1.5",
                    children: [
                      jsxRuntime.jsx(ExpandButton, {
                        open: !!x.rare,
                        onToggle: () => y("rare"),
                        testId: "fold-fish-rare",
                        title: "② 常驻稀有",
                        right: x.rare ? "收起" : "展开",
                      }),
                      x.rare &&
                        jsxRuntime.jsxs("div", {
                          className: "mt-1 space-y-1.5",
                          children: [
                            jsxRuntime.jsx("p", {
                              className: "text-[9px] font-bold leading-relaxed text-[#4a6e8a]",
                              children:
                                "腥香大物饵对大鱼 ×2.5、对 4 种稀有河鲜 ×3，尺寸两次取大更易出大物。",
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[9px] font-bold leading-relaxed text-[#4a6e8a]",
                              children: [
                                "常驻河鲜里的 4 种稀有：",
                                S,
                                "——要用腥香大物饵才更容易碰到，锦鲤还有好运加成。",
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl border-2 border-[#c8e6c9] bg-[#f4fbf1] px-2 py-1.5",
                    children: [
                      jsxRuntime.jsx(ExpandButton, {
                        open: !!x.season,
                        onToggle: () => y("season"),
                        testId: "fold-fish-season",
                        title: "③ 节气限定",
                        right: x.season ? "收起" : "展开",
                      }),
                      x.season &&
                        jsxRuntime.jsxs("div", {
                          className: "mt-1 space-y-0.5",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-[11px] font-black text-[#2e7d32]",
                              children: ["🌿 节气限定鱼（", SEASONAL_FISH_TABLE.length, " 条）"],
                            }),
                            SEASONAL_FISH_TABLE.map((C) => {
                              var E;
                              const V = SEASON_BAITS.find((F) => F.type === C.bait);
                              return jsxRuntime.jsxs(
                                "p",
                                {
                                  className: "text-[9px] font-bold leading-relaxed text-[#558b2f]",
                                  children: [
                                    "· ",
                                    ((E = INGREDIENT_MAP[C.ingId]) == null ? void 0 : E.name) ?? C.ingId,
                                    "：",
                                    C.terms.join("、"),
                                    "用",
                                    V ? `${V.emoji}${V.name}` : "对应节气饵",
                                    "才有机会",
                                  ],
                                },
                                C.ingId,
                              );
                            }),
                            jsxRuntime.jsx("p", {
                              className: "text-[9px] font-bold text-[#8d6e63]",
                              children:
                                "节气饵整个季节都能在河边「现场制饵」（1 份节气料理 → 3 个饵），但每条鱼只在自己的节气小窗口里上钩。",
                            }),
                          ],
                        }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "rounded-xl border-2 border-[#e1bee7] bg-[#faf0fc] px-2 py-1.5",
                    children: [
                      jsxRuntime.jsx(ExpandButton, {
                        open: !!x.night,
                        onToggle: () => y("night"),
                        testId: "fold-fish-night",
                        title: "④ 夜间限定",
                        right: x.night ? "收起" : "展开",
                      }),
                      x.night &&
                        jsxRuntime.jsxs("div", {
                          className: "mt-1 space-y-0.5",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-[11px] font-black text-[#7b1fa2]",
                              children: ["🌙 夜间限定鱼（", NIGHT_FISH_TABLE.length, " 条）"],
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[9px] font-bold leading-relaxed text-[#7b4a94]",
                              children: [
                                NIGHT_FISH_TABLE
                                  .map((C) => {
                                    var V;
                                    return ((V = INGREDIENT_MAP[C.ingId]) == null ? void 0 : V.name) ?? C.ingId;
                                  })
                                  .join("、"),
                                "：只在 20:00-5:00 的夜里出没，用「夜香螺饵」才能钓到（夜间用 1 份夜市炒螺现场制 3 个饵）。",
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  });
}

const SEASON_LABELS = ["🌸 春", "☀️ 夏", "🍂 秋", "❄️ 冬"];

function formatHourBucket(e) {
  return e >= 5 && e < 8
    ? "🌅 清晨（5-8 点）"
    : e >= 8 && e < 12
      ? "☀️ 上午（8-12 点）"
      : e >= 12 && e < 16
        ? "🌤️ 午后（12-16 点）"
        : e >= 16 && e < 20
          ? "🌇 傍晚（16-20 点）"
          : "🌙 夜间（20-4 点）";
}

const WEEKDAY_LABELS = ["日", "一", "二", "三", "四", "五", "六"];

function CalendarPanel({ ctx: e }) {
  const { state: n } = e,
    s = dayToDate(n.day),
    a = currentSolarTerm(n.day),
    o = getActiveFestival(n.day),
    l = getBirthdayNpcs(n),
    c = s.year,
    u = s.month,
    f = new Date(Date.UTC(c, u - 1, 1)).getUTCDay(),
    g = new Date(Date.UTC(c, u, 0)).getUTCDate(),
    x = (p) => Math.round((Date.UTC(c, u - 1, p) - Date.UTC(2026, 1, 17)) / 864e5) + 1,
    m = [];
  for (let p = 1; p <= g; p += 1) {
    const y = x(p),
      j = SOLAR_TERMS.find((w) => w.month === u && w.day === p),
      v = FESTIVALS.find((w) => {
        if (w.lunar) {
          const N = getLunarDate(y);
          return N.month === w.month && N.day === w.day;
        }
        return w.month === u && w.day === p;
      });
    m.push({
      d: p,
      gameDay: y,
      isToday: y === n.day,
      isPast: y < n.day,
      termEmoji: j == null ? void 0 : j.emoji,
      festEmoji: v == null ? void 0 : v.emoji,
      festName: v == null ? void 0 : v.name,
    });
  }
  return jsxRuntime.jsxs("div", {
    className: "phone-app-bg space-y-2 rounded-2xl p-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#b39ddb] bg-[#f3edf9] px-2.5 py-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#4a148c]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🕐" }),
              " 第 ",
              n.day,
              " 天 · ",
              formatHourBucket(n.hour),
            ],
          }),
          jsxRuntime.jsxs("p", {
            className: "mt-0.5 text-[10px] font-bold text-[#6a1b9a]",
            children: [formatSolarDate(n.day), " · ", formatLunarDate(n.day)],
          }),
          jsxRuntime.jsxs("p", {
            className:
              "mt-1 inline-flex items-center gap-1 rounded-lg bg-white px-2 py-0.5 text-[10px] font-black text-[#4a148c]",
            children: [SEASON_LABELS[seasonIndexOf(n.day)], " · ", a.emoji, " ", a.name],
          }),
          o &&
            jsxRuntime.jsxs("p", {
              className:
                "mt-1.5 rounded-lg bg-[#fde8e8] px-2 py-1 text-[10px] font-black leading-relaxed text-[#b3261e]",
              children: [o.emoji, " ", o.name, "：", o.desc, o.tip ? `（${o.tip}）` : ""],
            }),
          l.length > 0 &&
            jsxRuntime.jsxs("p", {
              className:
                "mt-1.5 rounded-lg bg-[#fff3e0] px-2 py-1 text-[10px] font-black text-[#bf360c]",
              children: [
                "🎂 今天过生日：",
                l.map((p) => `${p.emoji}${p.name}`).join("、"),
                "——去聊聊或送份礼吧！",
              ],
            }),
          !o &&
            l.length === 0 &&
            jsxRuntime.jsx("p", {
              className: "mt-1.5 text-[9px] font-bold text-[#9575cd]",
              children: "今天没有节日，也没有伙伴过生日，是平平淡淡的好日子。",
            }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#b39ddb] bg-[#faf5fe] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-black text-[#4a148c]",
            children: [
              "📅 ",
              c,
              "年",
              u,
              "月 · 共 ",
              g,
              " 天",
              jsxRuntime.jsx("span", {
                className: "ml-1 text-[8px] font-bold text-[#9575cd]",
                children: "节气/节日标记在格子里",
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-1.5 grid grid-cols-7 gap-1 text-center",
            children: [
              WEEKDAY_LABELS.map((p) =>
                jsxRuntime.jsx(
                  "span",
                  { className: "text-[9px] font-black text-[#b39ddb]", children: p },
                  p,
                ),
              ),
              Array.from({ length: f }).map((p, y) => jsxRuntime.jsx("span", {}, `blank-${y}`)),
              m.map((p) =>
                jsxRuntime.jsxs(
                  "div",
                  {
                    "data-testid": p.isToday ? "calendar-today" : void 0,
                    className: `relative flex flex-col items-center justify-center rounded-lg py-1 text-[10px] font-black ${p.isToday ? "bg-[#7b1fa2] text-white shadow" : p.isPast ? "bg-[#efe7f7] text-[#b39ddb]" : "bg-white text-[#4a2c17]"}`,
                    children: [
                      jsxRuntime.jsx("span", { children: p.d }),
                      (p.termEmoji || p.festEmoji) &&
                        jsxRuntime.jsx("span", {
                          className: "text-[8px] leading-none",
                          "aria-hidden": "true",
                          children: p.festEmoji ?? p.termEmoji,
                        }),
                    ],
                  },
                  p.d,
                ),
              ),
            ],
          }),
          jsxRuntime.jsx("p", {
            className: "mt-1.5 text-[8px] font-bold leading-relaxed text-[#9575cd]",
            children:
              "说明：格子里的图标是当天节气或节日；紫色高亮是今天，灰色是已经过去的日子。节日按公历/农历各自对照，节气按公历推算。",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-dashed border-[#b39ddb] bg-[#faf5fe] p-2",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-[11px] font-black text-[#4a148c]",
            children: "🌿 本月节气",
          }),
          jsxRuntime.jsx("div", {
            className: "mt-1 flex flex-wrap gap-1",
            children: SOLAR_TERMS.filter((p) => p.month === u).map((p) =>
              jsxRuntime.jsxs(
                "span",
                {
                  className: `rounded-lg px-1.5 py-0.5 text-[9px] font-black ${p.name === a.name ? "bg-[#7b1fa2] text-white" : "bg-[#e8def5] text-[#6a1b9a]"}`,
                  children: [p.emoji, " ", p.name, " ", p.day, "日"],
                },
                p.name,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}

function NpcRosterPanel({ ctx: e }) {
  const { state: n } = e,
    s = (n.metNpcs ?? [])
      .map((a) => NPC_RUNTIME_DATA[a])
      .filter((a) => !!a)
      .sort((a, o) => (n.affection[o.id] ?? 0) - (n.affection[a.id] ?? 0));
  return jsxRuntime.jsxs("div", {
    className: "phone-app-bg space-y-2 rounded-2xl p-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#e8eaf6] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#3949ab]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "📒" }),
          " 备忘录记着相遇过的伙伴：好感 ≥40 解锁生日与 MBTI，≥70 解锁人物背景；多聊天、多送礼、多赴约吧。",
        ],
      }),
      s.length === 0
        ? jsxRuntime.jsxs("div", {
            className:
              "rounded-xl border-2 border-dashed border-[#9fa8da] bg-[#f7f8ff] p-4 text-center",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-3xl",
                children: jsxRuntime.jsx("span", { className: "emoji", children: "🗒️" }),
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 font-black text-[#4a2c17]",
                children: "备忘录还是空的",
              }),
              jsxRuntime.jsx("p", {
                className: "mt-0.5 text-[11px] font-bold text-[#b08a6a]",
                children: "去小镇地图上走一走，遇见伙伴后 TA 就会记在这里",
              }),
            ],
          })
        : jsxRuntime.jsx("div", {
            className: "space-y-1.5",
            children: s.map((a) => {
              const o = n.affection[a.id] ?? 0,
                l = getAffectionTier(o),
                c = NPC_MBTI_BG_INDEX[a.id],
                u = a.birthday,
                f = isNpcBirthday(n, a.id),
                g = Math.min(100, Math.round((o / 70) * 100));
              return jsxRuntime.jsxs(
                "div",
                {
                  className: "rounded-xl border-2 border-[#c5cae9] bg-[#f7f8ff] px-2 py-1.5",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex items-center gap-2",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji text-lg", children: a.emoji }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-[12px] font-black text-[#4a2c17]",
                              children: [
                                a.name,
                                jsxRuntime.jsx("span", {
                                  className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                                  children: a.title,
                                }),
                                f &&
                                  jsxRuntime.jsx("span", {
                                    className:
                                      "ml-1 rounded-md bg-[#fde8e8] px-1 py-0.5 text-[8px] font-black text-[#b3261e]",
                                    children: "🎂 今天生日",
                                  }),
                              ],
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[9px] font-bold text-[#3949ab]",
                              children: [l.emoji, " ", l.label, "（", o, "）"],
                            }),
                          ],
                        }),
                      ],
                    }),
                    o < 40
                      ? jsxRuntime.jsxs("p", {
                          className:
                            "mt-1 rounded-lg bg-[#f0f0fa] px-2 py-1 text-[9px] font-bold text-[#7986cb]",
                          children: [
                            "🔒 相处还不够，还摸不透 TA（进度 ",
                            g,
                            "%），好感到 40 就能看到生日和 MBTI 啦",
                          ],
                        })
                      : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "mt-1 text-[9px] font-bold leading-relaxed text-[#5c6bc0]",
                              children: [
                                "🎂 生日 ",
                                u ? `${u.month} 月 ${u.day} 日` : "？？？",
                                " · 🧠 MBTI：",
                                (c == null ? void 0 : c.mbti) ?? "？？？",
                              ],
                            }),
                            o >= 70
                              ? jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-1 rounded-lg bg-[#e8f5e9] px-2 py-1 text-[9px] font-bold leading-relaxed text-[#2e7d32]",
                                  children: [
                                    "📖 ",
                                    (c == null ? void 0 : c.bg) ??
                                      "TA 的档案还在整理中，多相处相处吧",
                                  ],
                                })
                              : jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-1 rounded-lg bg-[#f0f0fa] px-2 py-1 text-[9px] font-bold text-[#7986cb]",
                                  children: ["🔒 人物背景需要好感 ≥70（进度 ", g, "%）"],
                                }),
                          ],
                        }),
                  ],
                },
                a.id,
              );
            }),
          }),
    ],
  });
}

const APPLICATION_LABELS = {
    charity_apply: "义卖报名",
    charity_sell: "义卖摆摊",
    commercial: "商业活动",
    rename_player: "改名",
    rename_shop: "改店名",
    relief: "应急救助金",
  },
  GUIDE_SECTIONS_ONLINE = [
    {
      title: "线上办结",
      text: "在线提交的申请统一生成工单，次日 8:00 窗口办结生效；费用与材料按窗口办结当天结算。",
    },
    {
      title: "义卖报名",
      text: `义卖周期 183 天：前 7 天报名（¥${MAX_STAT_VALUE}），第 8-15 天摆摊，每天最多 ${CHARITY_DURATION_DAYS} 份料理（1.6 倍定价）。`,
    },
    { title: "商业活动", text: "¥200 + 面粉×5 + 糖×3 + 蛋×2，办结后客流加成最多持续 5 天。" },
    { title: "改名", text: `改名费 ¥${MAX_STAT_VALUE}：人物名最长 8 个字，店名最长 10 个字。` },
    {
      title: "查询进度",
      text: "「在办工单」里可以看到待办结的申请；办结结果会在第二天开场时播报。",
    },
  ];

function CollapsibleButton({ open: e, onToggle: n, title: s, right: a }) {
  return jsxRuntime.jsxs("button", {
    type: "button",
    "aria-expanded": e,
    onClick: n,
    className: "flex w-full items-center gap-1.5 py-0.5 text-left active:scale-[0.99]",
    children: [
      jsxRuntime.jsx("span", {
        "aria-hidden": "true",
        className: `material-icons shrink-0 text-lg text-[#6b4226] transition-transform ${e ? "" : "-rotate-90"}`,
        children: "expand_more",
      }),
      jsxRuntime.jsx("span", {
        className: "min-w-0 flex-1 truncate text-[11px] font-black text-[#6b4226]",
        children: s,
      }),
      a &&
        jsxRuntime.jsx("span", { className: "shrink-0 text-[9px] font-bold text-[#b08a6a]", children: a }),
    ],
  });
}

function ApplicationFormPanel({ ctx: e }) {
  const { state: n, commit: s } = e,
    [a, o] = React.useState(""),
    [l, c] = React.useState(""),
    [u, f] = React.useState(!1),
    [g, x] = React.useState(!1),
    m = (w, N = {}) => {
      const S = submitGovApplication(n, w, N);
      (s(S.state, S.message, S.ok ? "success" : "error"),
        S.ok && w === "rename_player" && o(""),
        S.ok && w === "rename_shop" && c(""));
    },
    p = n.govTickets ?? [],
    y = (w) => hasGovTicketOfKind(n, w),
    j = n.charityApplied
      ? "✅ 已报名本次义卖"
      : isSpring(n.day)
        ? "📣 报名期进行中（周期前 7 天，¥100）"
        : isSummer(n.day)
          ? "⏳ 义卖正在进行中，报名已截止"
          : `📅 非报名期，距下次报名还有 ${daysUntilYearEnd(n.day)} 天`,
    v = n.charityApplied
      ? isSummer(n.day)
        ? `义卖进行中 · 今日已卖 ${n.charitySoldToday ?? 0}/${CHARITY_DURATION_DAYS} 份`
        : isSpring(n.day)
          ? "还在报名期，义卖还没开始"
          : "义卖期已结束，等下一次吧"
      : "需先线上报名义卖";
  return jsxRuntime.jsxs("div", {
    className: "phone-app-bg space-y-2 rounded-2xl p-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#e3f2fd] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#0d47a1]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏛️" }),
          " 小镇在线政务：线上提交申请，次日 8:00 窗口统一办结；与市政府柜台同规则、同费用，办结结果第二天开场播报。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-dashed border-[#90caf9] bg-[#f4faff] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-black text-[#0d47a1]",
            children: ["📋 在办工单（", p.length, "）"],
          }),
          p.length === 0
            ? jsxRuntime.jsx("p", {
                className: "mt-1 text-[9px] font-bold text-[#b08a6a]",
                children: "没有待办结的申请，需要办什么事就往下提交吧",
              })
            : jsxRuntime.jsx("div", {
                className: "mt-1.5 space-y-1",
                children: p.map((w) =>
                  jsxRuntime.jsxs(
                    "p",
                    {
                      className:
                        "rounded-lg bg-white px-2 py-1 text-[9px] font-bold text-[#1565c0]",
                      children: [
                        APPLICATION_LABELS[w.kind],
                        " · 第 ",
                        w.applyDay,
                        " 天 8:00 办结",
                        w.kind === "rename_player" || w.kind === "rename_shop"
                          ? `（${w.payload.name ?? ""}）`
                          : "",
                      ],
                    },
                    w.id,
                  ),
                ),
              }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#ffcc80] bg-[#fff8e1] p-2",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-[11px] font-black text-[#b8860b]",
            children: "🎪 义卖报名",
          }),
          jsxRuntime.jsx("p", { className: "mt-0.5 text-[9px] font-bold text-[#a08030]", children: j }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-phone-gov-charity-apply",
            onClick: () => m("charity_apply"),
            disabled: n.charityApplied || !isSpring(n.day) || y("charity_apply"),
            className: "btn-chunky btn-xs btn-yellow mt-1.5 w-full disabled:opacity-40",
            children: y("charity_apply") ? "⏳ 工单提交中…" : `📱 线上报名（¥${MAX_STAT_VALUE}，次日办结）`,
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#ffcc80] bg-[#fff8e1] p-2",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-[11px] font-black text-[#b8860b]",
            children: "🧺 义卖营业（线上摆摊）",
          }),
          jsxRuntime.jsx("p", { className: "mt-0.5 text-[9px] font-bold text-[#a08030]", children: v }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-phone-gov-charity-sell",
            onClick: () => m("charity_sell"),
            disabled: !n.charityApplied || !isSummer(n.day) || y("charity_sell"),
            className: "btn-chunky btn-xs btn-brown mt-1.5 w-full disabled:opacity-40",
            children: y("charity_sell")
              ? "⏳ 工单提交中…"
              : "📱 线上摆摊（明日自动卖出 1 份料理并结算收入）",
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-1 rounded-lg bg-[#fffaf3] px-1.5 py-0.5",
            children: [
              jsxRuntime.jsx(CollapsibleButton, {
                open: g,
                onToggle: () => x((w) => !w),
                title: "摆摊说明",
                right: g ? "收起" : "展开",
              }),
              g &&
                jsxRuntime.jsx("p", {
                  className: "text-[8px] font-bold text-[#c9a25c]",
                  children: "办结时需要背包里有家常料理且份额未满，否则会办结失败并提示原因。",
                }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#ffe0b2] bg-[#fffaf3] p-2",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-[11px] font-black text-[#6b4226]",
            children: "📣 商业活动",
          }),
          jsxRuntime.jsxs("p", {
            className: "mt-0.5 text-[9px] font-bold text-[#8d6e63]",
            children: [
              "费用 ¥200 + 面粉×5 + 糖×3 + 蛋×2，客流加成最多 5 天",
              n.commercialBoostDays > 0 ? `（当前加成还剩 ${n.commercialBoostDays} 天）` : "",
            ],
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-phone-gov-commercial",
            onClick: () => m("commercial"),
            disabled: y("commercial"),
            className: "btn-chunky btn-xs btn-green mt-1.5 w-full disabled:opacity-40",
            children: y("commercial") ? "⏳ 工单提交中…" : "📱 线上报名（次日办结，扣款扣料）",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#ffe0b2] bg-[#fffaf3] p-2",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-[11px] font-black text-[#6b4226]",
            children: "🛟 应急救助金",
          }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-[9px] font-bold text-[#8d6e63]",
            children: "金币低于 ¥150 可申请，每月一次，次日办结到账 ¥300",
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-phone-gov-relief",
            onClick: () => m("relief"),
            disabled: y("relief") || n.home.reliefMonth === formatYearMonth(n.day),
            className: "btn-chunky btn-xs btn-yellow mt-1.5 w-full disabled:opacity-40",
            children:
              n.home.reliefMonth === formatYearMonth(n.day) ? "✅ 本月已办过" : "📱 申请救助金（次日办结）",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#ffe0b2] bg-[#fffaf3] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-black text-[#6b4226]",
            children: ["✏️ 改名（¥", MAX_STAT_VALUE, "/次，次日办结）"],
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-1.5 flex items-center gap-1.5",
            children: [
              jsxRuntime.jsx("input", {
                "data-testid": "input-phone-gov-name",
                value: a,
                maxLength: 8,
                onChange: (w) => o(w.target.value),
                placeholder: `现在叫「${n.playerName}」，改一个吧（≤8 字）`,
                className:
                  "min-w-0 flex-1 rounded-lg border-2 border-[#d7c09a] bg-white px-2 py-1 text-[10px] font-bold text-[#4a2c17] outline-none placeholder:text-[#c9b28c]",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-phone-gov-rename-player",
                onClick: () => m("rename_player", { name: a }),
                disabled: y("rename_player"),
                className: "btn-chunky btn-xs btn-brown shrink-0 disabled:opacity-40",
                children: y("rename_player") ? "⏳" : "提交",
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-1.5 flex items-center gap-1.5",
            children: [
              jsxRuntime.jsx("input", {
                "data-testid": "input-phone-gov-shop",
                value: l,
                maxLength: 10,
                onChange: (w) => c(w.target.value),
                placeholder: `现在叫「${n.shopName}」，改店名（≤10 字）`,
                className:
                  "min-w-0 flex-1 rounded-lg border-2 border-[#d7c09a] bg-white px-2 py-1 text-[10px] font-bold text-[#4a2c17] outline-none placeholder:text-[#c9b28c]",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-phone-gov-rename-shop",
                onClick: () => m("rename_shop", { name: l }),
                disabled: y("rename_shop"),
                className: "btn-chunky btn-xs btn-brown shrink-0 disabled:opacity-40",
                children: y("rename_shop") ? "⏳" : "提交",
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-dashed border-[#ffcc80] bg-[#fffaf3] p-2",
        children: [
          jsxRuntime.jsx(CollapsibleButton, {
            open: u,
            onToggle: () => f((w) => !w),
            title: "🧭 办事指南",
            right: "线上提交，次日 8:00 窗口办结",
          }),
          u &&
            jsxRuntime.jsx("div", {
              className: "mt-1 space-y-1",
              children: GUIDE_SECTIONS_ONLINE.map((w) =>
                jsxRuntime.jsxs(
                  "p",
                  {
                    className: "text-[9px] font-bold leading-relaxed text-[#8d6e63]",
                    children: [
                      jsxRuntime.jsxs("span", {
                        className: "text-[#6b4226]",
                        children: ["· ", w.title, "："],
                      }),
                      w.text,
                    ],
                  },
                  w.title,
                ),
              ),
            }),
        ],
      }),
    ],
  });
}
