function OutfitSlotGrid({ state: e }) {
  return jsxRuntime.jsx("div", {
    className: "mt-2 grid grid-cols-4 gap-1.5",
    children: SLOT_ORDER.map((n) => {
      var o, l;
      const s = ((l = (o = e.outfits) == null ? void 0 : o.equipped) == null ? void 0 : l[n]) ?? "",
        a = OUTFIT_MAP[s];
      return jsxRuntime.jsxs(
        "div",
        {
          className: "rounded-xl bg-white/60 p-1.5 text-center",
          children: [
            jsxRuntime.jsx("p", {
              className: "text-base",
              children: jsxRuntime.jsx("span", {
                className: "emoji",
                children: (a == null ? void 0 : a.emoji) ?? "·",
              }),
            }),
            jsxRuntime.jsx("p", {
              className: "truncate text-[9px] font-bold text-[#b08a6a]",
              children: SLOT_LABELS[n],
            }),
          ],
        },
        n,
      );
    }),
  });
}

function HygienePanel({ state: e, open: n, onToggle: s }) {
  const a = Math.min(100, Math.max(0, e.hygiene ?? 100)),
    o = e.combedToday === !0,
    l = Math.floor((e.negotiation ?? 0) / 10),
    c = outfitBeautyBonus(e),
    u = hairBeautyBonus(e),
    f = Math.round((a / 100) * 5),
    g = calcCharm(e);
  return jsxRuntime.jsxs(StatusCard, {
    id: "status",
    title: "个人状态",
    emoji: "🧼",
    titleColor: "#4a2c17",
    open: n,
    onToggle: s,
    style: { background: "linear-gradient(135deg,#ffe9ef,#fff0f3)" },
    children: [
      jsxRuntime.jsx("div", {
        className: "flex items-center justify-between",
        children: jsxRuntime.jsx("span", {
          "data-testid": "profile-combed",
          className: `rounded-full px-2.5 py-1 text-xs font-black ${o ? "bg-[#e3f2fd] text-[#c62828]" : "bg-[#fff3e0] text-[#e65100]"}`,
          children: segmentByEmoji(o ? "已梳洗 ✓" : "未梳洗·魅力打折 ⚠️"),
        }),
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[11px] font-bold text-[#6b4226]",
        children: [
          segmentByEmoji(e.gender === "male" ? "♂ 男生" : "♀ 女生"),
          " · ",
          e.age ?? 25,
          " 岁 · 成衣店与缝纫图样，会照你的喜好备上不同款式",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-2 flex items-center gap-2",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-lg", children: "🫧" }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-xs font-black text-[#6b4226]",
                children: ["个人卫生 ", a, "/100", o ? "" : "（魅力 ×0.85）"],
              }),
              jsxRuntime.jsx("div", {
                className: "bar-track mt-1",
                children: jsxRuntime.jsx("div", {
                  className: "bar-fill",
                  style: {
                    width: `${a}%`,
                    background: `linear-gradient(90deg,#f8bbd0,${a >= 60 ? "#ec407a" : a >= 30 ? "#ffb74d" : "#ef5350"})`,
                  },
                }),
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[11px] font-bold leading-relaxed text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 每天在家「",
          jsxRuntime.jsx("span", { className: "emoji", children: "🚿" }),
          " 卫生间」梳洗可 +8 卫生并梳头，之后还能在「",
          jsxRuntime.jsx("span", { className: "emoji", children: "💇" }),
          " 镜前梳妆」换发型；烘焙、锻炼、摸泥鳅、钓鱼都会弄脏自己，卫生太低时聊天魅力都会打折。",
        ],
      }),
      jsxRuntime.jsx(AppearancePanel, { state: e }),
      jsxRuntime.jsx(OutfitSlotGrid, { state: e }),
      jsxRuntime.jsxs("div", {
        className: "mt-2 flex items-center gap-2 rounded-2xl bg-white/70 p-3",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "✨" }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-xs font-bold text-[#b08a6a]",
                children: "个人魅力大数值",
              }),
              jsxRuntime.jsx("p", { className: "num text-3xl font-black text-[#e04a63]", children: g }),
              jsxRuntime.jsxs("p", {
                className: "mt-0.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                children: [
                  "交涉 ",
                  jsxRuntime.jsxs("span", { className: "num text-[#c62828]", children: ["+", l] }),
                  " · ",
                  "穿搭 ",
                  jsxRuntime.jsxs("span", { className: "num text-[#c62828]", children: ["+", c] }),
                  " · ",
                  "发型 ",
                  jsxRuntime.jsxs("span", { className: "num text-[#c62828]", children: ["+", u] }),
                  !o && jsxRuntime.jsx("span", { className: "text-[#e65100]", children: "（未梳洗减半）" }),
                  " · ",
                  "卫生 ",
                  jsxRuntime.jsxs("span", { className: "num text-[#c62828]", children: ["+", f] }),
                  !o && jsxRuntime.jsx("span", { className: "text-[#e65100]", children: " · 整体 ×0.85" }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function HealthRecordsPanel({ state: e, open: n, onToggle: s }) {
  const a = [...(Array.isArray(e.healthRecords) ? e.healthRecords : [])].sort(
      (l, c) => c.day - l.day || c.hour - l.hour || c.createdAt - l.createdAt,
    ),
    o = healthTier(e.health ?? 100);
  return jsxRuntime.jsxs(StatusCard, {
    id: "health",
    title: "健康档案",
    emoji: "🩺",
    titleColor: "#2e7d32",
    badge: jsxRuntime.jsxs("span", {
      "data-testid": "profile-health",
      className: `rounded-full px-2.5 py-1 text-xs font-black ${e.health >= 70 ? "bg-[#e8f5e9] text-[#2e7d32]" : e.health >= 40 ? "bg-[#fff8e1] text-[#b8860b]" : "bg-[#ffebee] text-[#c62828]"}`,
      children: [
        jsxRuntime.jsx("span", { className: "emoji", children: o.emoji }),
        " 健康 ",
        e.health,
        "/100",
      ],
    }),
    open: n,
    onToggle: s,
    style: { background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)" },
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-[11px] font-bold leading-relaxed text-[#558b2f]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 去医院挂号看诊后，本次就诊会记在这里：日期时段、天气、接诊医生、诊断、处置用药、花费与健康变化都会留档。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "mt-2 space-y-2",
        children:
          a.length === 0
            ? jsxRuntime.jsx("p", {
                className:
                  "rounded-xl bg-white/80 px-3 py-4 text-center text-xs font-black text-[#8a9a5b]",
                children: "还没有就诊记录，注意身体哦",
              })
            : a.map((l) => {
                var c, u;
                return jsxRuntime.jsxs(
                  "div",
                  {
                    "data-testid": `health-record-${l.id}`,
                    className: "rounded-xl bg-white/85 p-2.5",
                    children: [
                      jsxRuntime.jsxs("div", {
                        className: "flex items-center justify-between gap-1",
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "text-xs font-black text-[#2e7d32]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "📅" }),
                              " ",
                              formatSolarDate(l.day),
                              " · ",
                              formatLunarDate(l.day),
                            ],
                          }),
                          jsxRuntime.jsxs("span", {
                            className: "shrink-0 text-[10px] font-bold text-[#8a9a5b]",
                            children: [
                              jsxRuntime.jsx("span", {
                                className: "emoji",
                                children: ((c = WEATHER_TYPES[l.weather]) == null ? void 0 : c.emoji) ?? "☀️",
                              }),
                              " ",
                              ((u = WEATHER_TYPES[l.weather]) == null ? void 0 : u.label) ?? "晴天",
                              " · ",
                              formatHour(l.hour),
                            ],
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("div", {
                        className:
                          "mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] font-bold text-[#6b4226]",
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "truncate",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "👨‍⚕️" }),
                              " 接诊医生：",
                              l.doctor,
                            ],
                          }),
                          jsxRuntime.jsxs("p", {
                            className: "truncate text-right",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "💰" }),
                              " 花费 ¥",
                              l.cost,
                            ],
                          }),
                          jsxRuntime.jsxs("p", {
                            className: "col-span-2",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "🩺" }),
                              " 初步诊断：",
                              l.diagnosis,
                            ],
                          }),
                          jsxRuntime.jsxs("p", {
                            className: "col-span-2",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "💊" }),
                              " 处置用药：",
                              l.treatment,
                            ],
                          }),
                          jsxRuntime.jsxs("p", {
                            className: "col-span-2",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "❤️" }),
                              " 健康值：",
                              jsxRuntime.jsx("span", { className: "num", children: l.healthBefore }),
                              " → ",
                              jsxRuntime.jsx("span", { className: "num", children: l.healthAfter }),
                              jsxRuntime.jsxs("span", {
                                className:
                                  l.healthAfter >= l.healthBefore
                                    ? "text-[#2e7d32]"
                                    : "text-[#c62828]",
                                children: [
                                  "（",
                                  l.healthAfter >= l.healthBefore ? "+" : "",
                                  l.healthAfter - l.healthBefore,
                                  "）",
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  l.id,
                );
              }),
      }),
    ],
  });
}

function ReputationPanel({ state: e, open: n, onToggle: s }) {
  const a = calcReputation(e);
  return jsxRuntime.jsxs(StatusCard, {
    id: "rep",
    title: "声望",
    emoji: "🏅",
    titleColor: "#4a2c17",
    badge: jsxRuntime.jsx("span", {
      "data-testid": "reputation-value",
      className: "num rounded-full bg-[#fff3bf] px-2.5 py-1 text-sm font-black text-[#b8860b]",
      children: a,
    }),
    open: n,
    onToggle: s,
    style: { background: "linear-gradient(135deg,#fff8e1,#ffe9ef)" },
    children: [
      jsxRuntime.jsx("p", {
        className: "text-[11px] font-bold leading-relaxed text-[#6b4226]",
        children:
          "声望来自经营口碑与成就：营业额越高、完美点心越多、成交单数越多、成就与里程碑越多、研发的食谱越多，声望就越高，是小镇居民对你的认可。",
      }),
      jsxRuntime.jsx("div", {
        className: "mt-2 flex flex-wrap gap-1",
        children: [
          { label: "营业额", v: Math.floor(e.stats.earned / 80) },
          { label: "完美点心", v: (e.stats.perfects ?? 0) * 2 },
          { label: "成交单数", v: Math.floor((e.stats.sold ?? 0) / 5) },
          {
            label: "成就+里程碑",
            v:
              (Object.keys(e.achievements ?? {}).length +
                Object.values(e.milestones ?? {}).filter((o) => o === 2).length) *
              8,
          },
          { label: "研发食谱", v: Object.keys(e.recipes ?? {}).length * 3 },
        ].map((o) =>
          jsxRuntime.jsxs(
            "span",
            {
              className:
                "rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-black text-[#6b4226]",
              children: [o.label, " ", jsxRuntime.jsxs("span", { className: "num", children: ["+", o.v] })],
            },
            o.label,
          ),
        ),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-white/70 px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#558b2f]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🐶" }),
          " 注意：给动物收容所捐点心只增加友好度，不会增加声望。",
        ],
      }),
    ],
  });
}

function FurnitureExpPanel({ state: e, open: n, onToggle: s }) {
  var c, u, f;
  const a = getFurnitureLevel(e),
    o = (((c = e.home) == null ? void 0 : c.furnitureExp) ?? 0) % 50,
    l = Math.min(100, Math.round((o / 50) * 100));
  return jsxRuntime.jsx(StatusCard, {
    id: "skill",
    title: "技能总览",
    emoji: "🎯",
    titleColor: "#4a2c17",
    open: n,
    onToggle: s,
    children: jsxRuntime.jsxs("div", {
      className: "grid grid-cols-1 gap-2",
      children: [
        jsxRuntime.jsx(ProgressBar, {
          label: "料理技能",
          emoji: "👨‍🍳",
          value: e.cookSkill ?? 0,
          color: "#ff6b81",
          extra: "研发实验成功 +2",
        }),
        jsxRuntime.jsx(ProgressBar, {
          label: "烘焙技能",
          emoji: "🧁",
          value: e.bakeSkill ?? 0,
          color: "#ff8c42",
          extra: "每次烘焙 +1",
        }),
        jsxRuntime.jsxs("div", {
          className: "rounded-xl bg-[#fbf3e4] p-2.5",
          children: [
            jsxRuntime.jsxs("div", {
              className: "flex items-center justify-between",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-xs font-black text-[#4a2c17]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🔨" }),
                    " 制造技能 ",
                    jsxRuntime.jsxs("span", {
                      className: "num ml-1 text-[#b8860b]",
                      children: ["Lv.", a, "/10"],
                    }),
                    jsxRuntime.jsxs("span", {
                      className: "ml-1 text-[10px] font-bold text-[#b08a6a]",
                      children: ["本级 ", o, "/50 经验"],
                    }),
                  ],
                }),
                jsxRuntime.jsxs("span", {
                  className: "num text-xs font-black text-[#b8860b]",
                  children: [l, "%"],
                }),
              ],
            }),
            jsxRuntime.jsx("div", {
              className: "bar-track mt-1",
              style: { height: 8 },
              children: jsxRuntime.jsx("div", {
                className: "bar-fill",
                style: { width: `${l}%`, background: "linear-gradient(90deg,#ffe082,#ffc53d)" },
              }),
            }),
          ],
        }),
        jsxRuntime.jsx(ProgressBar, {
          label: "工具熟练度",
          emoji: "🛠️",
          value: ((u = e.home) == null ? void 0 : u.toolSkill) ?? 0,
          color: "#8d6e63",
        }),
        jsxRuntime.jsx(ProgressBar, {
          label: "材料理解度",
          emoji: "📖",
          value: ((f = e.home) == null ? void 0 : f.materialKnowledge) ?? 0,
          color: "#c62828",
        }),
        jsxRuntime.jsx(ProgressBar, {
          label: "缝纫技能",
          emoji: "✂️",
          value: e.sewingSkill ?? 0,
          color: "#ec407a",
          extra: "缝纫成功 +4 · 失败 +2",
        }),
        jsxRuntime.jsx(ProgressBar, {
          label: "运动技能",
          emoji: "🏃",
          value: e.sportSkill ?? 0,
          color: "#66bb6a",
          extra: "锻炼提升",
        }),
        jsxRuntime.jsx(ProgressBar, {
          label: "交涉技能",
          emoji: "🗣️",
          value: e.negotiation ?? 0,
          color: "#c62828",
          extra: "亲自接待成交 +1",
        }),
      ],
    }),
  });
}

function RecipeMasteryPanel({ state: e, open: n, onToggle: s }) {
  const a = RECIPES_ALL.filter((o) => o.id in e.recipes);
  return jsxRuntime.jsx(StatusCard, {
    id: "recipe",
    title: `食谱熟练度（已研发 ${a.length}）`,
    emoji: "📜",
    titleColor: "#4a2c17",
    open: n,
    onToggle: s,
    children:
      a.length === 0
        ? jsxRuntime.jsx("p", {
            className: "py-2 text-center text-sm text-[#b08a6a]",
            children: "还没有研发配方，去小楼一楼厨房研发吧",
          })
        : jsxRuntime.jsx("div", {
            className: "grid grid-cols-2 gap-2",
            children: a.map((o) => {
              const l = e.recipes[o.id] ?? 0,
                c = Math.min(5, Math.floor(l / 20)),
                u = Math.min(100, l);
              return jsxRuntime.jsxs(
                "div",
                {
                  "data-testid": `recipe-progress-${o.id}`,
                  className: "rounded-xl bg-[#fbf3e4] p-2.5",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex items-center justify-between gap-1",
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "min-w-0 truncate text-sm font-black text-[#4a2c17]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: o.emoji }),
                            " ",
                            o.name,
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          className: "num shrink-0 text-[11px] font-black text-[#e04a63]",
                          children: ["Lv.", c, "/5"],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "bar-track mt-1",
                      style: { height: 8 },
                      children: jsxRuntime.jsx("div", {
                        className: "bar-fill",
                        style: {
                          width: `${u}%`,
                          background: "linear-gradient(90deg,#ffb3c1,#ff6b81)",
                        },
                      }),
                    }),
                  ],
                },
                o.id,
              );
            }),
          }),
  });
}

function BookCollectionPanel({ state: e, open: n, onToggle: s }) {
  const a = BOOKS_GAME.filter((o) => e.home.ownedBooks.includes(o.id));
  return jsxRuntime.jsxs(StatusCard, {
    id: "book",
    title: "书籍阅读进度",
    emoji: "📚",
    titleColor: "#4a2c17",
    open: n,
    onToggle: s,
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-lg bg-[#fff3bf] px-2 py-1 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "📖" }),
          " 只展示家里已有的书：去「商店街 · 书店」买书，或到河边图书馆借阅（不带走）。",
        ],
      }),
      a.length === 0
        ? jsxRuntime.jsx("p", {
            className: "py-2 text-center text-sm text-[#b08a6a]",
            children: "还没有书，去书店买一本吧",
          })
        : jsxRuntime.jsx("div", {
            className: "grid grid-cols-2 gap-2",
            children: a.map((o) => {
              const l = e.home.readBooks.includes(o.id),
                c = getBookProgress(e.home, o.id);
              return jsxRuntime.jsxs(
                "div",
                {
                  "data-testid": `book-progress-${o.id}`,
                  className: "rounded-xl bg-[#fbf3e4] p-2.5",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex items-center justify-between gap-1",
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "min-w-0 truncate text-sm font-black text-[#4a2c17]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: o.emoji }),
                            " 《",
                            o.name,
                            "》",
                          ],
                        }),
                        jsxRuntime.jsxs("span", {
                          className: "num shrink-0 text-[11px] font-black text-[#b8860b]",
                          children: [c, "%"],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "bar-track mt-1",
                      style: { height: 8 },
                      children: jsxRuntime.jsx("div", {
                        className: "bar-fill",
                        style: {
                          width: `${c}%`,
                          background: "linear-gradient(90deg,#ffe082,#ffc53d)",
                        },
                      }),
                    }),
                    jsxRuntime.jsx("p", {
                      className: "mt-1 text-[9px] font-bold text-[#b08a6a]",
                      children:
                        l && !o.repeatable
                          ? "已读 ✓"
                          : o.repeatable
                            ? "可反复研读（每次 +25%）"
                            : "未读",
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

const INGREDIENT_CATEGORY_NAMES = [
    ["grain", "五谷"],
    ["dairy", "蛋奶"],
    ["meat", "肉禽"],
    ["veg", "蔬果"],
    ["fruit", "水果"],
    ["fish", "水产"],
    ["flower", "花材"],
    ["sweet", "糖巧"],
    ["seasoning", "调味"],
    ["other", "其他"],
  ],
  INGREDIENT_CATEGORY_EMOJIS = {
    fish: "🐟",
    fruit: "🍎",
    veg: "🥬",
    meat: "🥩",
    dairy: "🥛",
    grain: "🌾",
    flower: "🌼",
    sweet: "🍬",
    seasoning: "🧂",
  };

function getFishingPlaceLabel(e) {
  switch (e) {
    case "river":
      return "🏞️ 河边钓";
    case "nightmarket":
      return "🌃 夜市捞";
    case "market":
      return "🦐 市场买";
    case "park":
      return "🌳 公园摸";
    case "balcony":
      return "🌼 阳台种植";
    case "process":
      return "🍳 加工";
    default:
      return "🏪 商店";
  }
}

function FishCollectionPanel({ state: e, openCats: n, onToggleCat: s }) {
  const [a, o] = React.useState(null);
  return jsxRuntime.jsxs("div", {
    className: "mt-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-1.5 flex items-start gap-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🍎" }),
              " 曾经拥有过或现在库存里的食材都会点亮；灰色是还没入手过的。河鲜在河边钓、海鲜在农贸市场买、泥鳅在公园摸、花瓣在阳台种花收获。点分类标题可以折叠/展开，点条目看详情。",
            ],
          }),
          jsxRuntime.jsx(SpeakButton, {
            text: "食材图鉴：曾经拥有过或现在库存里的食材都会点亮，灰色是还没入手过的。河鲜在河边钓、海鲜在农贸市场买、泥鳅在公园摸、花瓣在阳台种花收获。点分类标题可以折叠或展开，点条目查看详情。",
            label: "朗读",
            testId: "codex-food-intro-speak",
            className: "btn-xs shrink-0",
          }),
        ],
      }),
      INGREDIENT_CATEGORY_NAMES.map(([l, c]) => {
        const u = INGREDIENTS_LIST.filter((x) => x.category === l);
        if (u.length === 0) return null;
        const f = u.filter((x) => {
            var m;
            return (
              (e.seenIngredients ?? []).includes(x.id) ||
              (((m = e.ingredients[x.id]) == null ? void 0 : m.qty) ?? 0) > 0
            );
          }).length,
          g = n[l] ?? !1;
        return jsxRuntime.jsxs(
          "div",
          {
            className: "mb-2 overflow-hidden rounded-2xl border-2 border-[#f0dcc0] bg-[#fffdf8]",
            children: [
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": `codex-food-cat-${l}`,
                "aria-expanded": g,
                onClick: () => s(l),
                className:
                  "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "text-base leading-none",
                    children: segmentByEmoji(INGREDIENT_CATEGORY_EMOJIS[l] ?? "📦"),
                  }),
                  jsxRuntime.jsxs("span", {
                    className: "min-w-0 flex-1 text-xs font-black text-[#4a2c17]",
                    children: [
                      c,
                      jsxRuntime.jsxs("span", {
                        className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                        children: ["已点亮 ", f, "/", u.length],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("span", {
                    "aria-hidden": "true",
                    className: `shrink-0 text-sm font-black text-[#b08a6a] transition-transform duration-200 ${g ? "" : "-rotate-90"}`,
                    children: "▾",
                  }),
                ],
              }),
              g &&
                jsxRuntime.jsx("div", {
                  className: "grid grid-cols-3 gap-1.5 px-2 pb-2",
                  children: u.map((x) => {
                    var y;
                    const m =
                        (e.seenIngredients ?? []).includes(x.id) ||
                        (((y = e.ingredients[x.id]) == null ? void 0 : y.qty) ?? 0) > 0,
                      p = getFishingPlaceLabel(x.source);
                    return jsxRuntime.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-testid": `codex-food-${x.id}`,
                        onClick: () => o(x),
                        className: `rounded-xl p-2 text-center active:scale-[0.97] ${m ? "bg-[#fff8e1]" : "bg-[#f3e3cb] opacity-70"}`,
                        children: [
                          jsxRuntime.jsx("p", {
                            className: "text-xl",
                            children: jsxRuntime.jsx("span", {
                              className: "emoji",
                              children: m ? x.emoji : "❓",
                            }),
                          }),
                          jsxRuntime.jsx("p", {
                            className: "mt-0.5 truncate text-[11px] font-black text-[#4a2c17]",
                            children: m ? x.name : "？？？",
                          }),
                          jsxRuntime.jsx("p", {
                            className: "text-[9px] font-bold text-[#b08a6a]",
                            children: m ? segmentByEmoji(`${INGREDIENT_CATEGORY_LABELS[x.category] ?? x.category} · ${p}`) : "尚未获得",
                          }),
                        ],
                      },
                      x.id,
                    );
                  }),
                }),
            ],
          },
          l,
        );
      }),
      a &&
        jsxRuntime.jsx(Modal, {
          open: !0,
          title: `${a.emoji} ${a.name}`,
          onClose: () => o(null),
          children: jsxRuntime.jsxs("div", {
            className: "space-y-2",
            children: [
              jsxRuntime.jsx("p", {
                className:
                  "rounded-2xl bg-[#fff3bf] p-3 text-center text-sm font-black leading-relaxed text-[#8a5a00]",
                children: a.desc || "暂无介绍，等待你亲自发现它的用法。",
              }),
              jsxRuntime.jsxs("div", {
                className: "space-y-1 text-center",
                children: [
                  jsxRuntime.jsx("p", {
                    className: "text-[11px] font-bold text-[#4a2c17]",
                    children: segmentByEmoji(`分类 ${INGREDIENT_CATEGORY_LABELS[a.category] ?? a.category}`),
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-[11px] font-bold text-[#4a2c17]",
                    children: segmentByEmoji(`来源 ${getFishingPlaceLabel(a.source)}`),
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[11px] font-bold text-[#4a2c17]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "⏳" }),
                      " 保质期 ",
                      a.shelfLife,
                      " 天",
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "flex justify-center",
                children: jsxRuntime.jsx(SpeakButton, {
                  text: `${a.name}。${a.desc || ""} 分类${INGREDIENT_CATEGORY_LABELS[a.category] ?? a.category}。来源${getFishingPlaceLabel(a.source).replace(/[^\u4e00-\u9fa5]/g, "")}。保质期${a.shelfLife}天。`,
                  label: "朗读详情",
                  testId: `codex-food-detail-speak-${a.id}`,
                  className: "btn-xs",
                }),
              }),
            ],
          }),
        }),
    ],
  });
}

function FishSizePanel({ state: e }) {
  var g;
  const [n, s] = React.useState(null),
    a = n ? (FISH_SIZE_PARK.find((x) => x.ingId === n) ?? null) : null,
    o = a ? INGREDIENT_MAP[a.ingId] : null,
    l = a ? (((g = e.fishRecords) == null ? void 0 : g[a.ingId]) ?? 0) : 0,
    c = FISH_SIZE_PARK.filter((x) => !RIVER_FISH_IDS.has(x.ingId)),
    u = c.filter((x) => {
      var m;
      return (((m = e.fishRecords) == null ? void 0 : m[x.ingId]) ?? 0) > 0;
    }).length,
    f = c.length;
  return jsxRuntime.jsxs("div", {
    className: "mt-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "mb-1.5 flex items-start gap-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🐟" }),
              " 鱼获图鉴：记录每种鱼钓到/买到过的最大尺寸（上限 60cm）。钓到更大的鱼会自动刷新纪录；尺寸范围是这种鱼可能长到的大小。点条目看详情。（虾类请到「🦐 虾类」分页查看）",
            ],
          }),
          jsxRuntime.jsx(SpeakButton, {
            text: "鱼获图鉴：记录每种鱼钓到或买到过的最大尺寸，上限六十厘米。钓到更大的鱼会自动刷新纪录；尺寸范围是这种鱼可能长到的大小。虾类请到虾类分页查看。点条目查看详情。",
            label: "朗读",
            testId: "codex-fish-intro-speak",
            className: "btn-xs shrink-0",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 overflow-hidden rounded-2xl border-2 border-[#b3e5fc] bg-[#fffdf8]",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex items-center gap-2 border-b-2 border-[#e3f2fd] px-2.5 py-2",
            children: [
              jsxRuntime.jsx("span", {
                className: "text-base leading-none",
                children: jsxRuntime.jsx("span", { className: "emoji", children: "🐟" }),
              }),
              jsxRuntime.jsxs("p", {
                className: "min-w-0 flex-1 text-xs font-black text-[#01579b]",
                children: [
                  "鱼类收集",
                  jsxRuntime.jsxs("span", {
                    className: "ml-1 text-[9px] font-bold text-[#0277bd]",
                    children: ["已点亮 ", u, "/", f],
                  }),
                ],
              }),
              jsxRuntime.jsxs("p", {
                className: "shrink-0 text-[10px] font-black text-[#c62828]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🏆" }),
                  " 大物纪录 ",
                  e.stats.bigFish ?? 0,
                  " 次",
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "bar-track mx-2.5 mt-2",
            role: "progressbar",
            "aria-label": "鱼类图鉴收集进度",
            "aria-valuemin": 0,
            "aria-valuemax": f,
            "aria-valuenow": u,
            children: jsxRuntime.jsx("div", {
              className: "bar-fill bg-[#4fc3f7]",
              style: { width: `${f > 0 ? (u / f) * 100 : 0}%` },
            }),
          }),
          jsxRuntime.jsx("div", {
            className: "grid grid-cols-2 gap-1.5 p-2.5",
            children: c.map((x) => {
              var V;
              const m = INGREDIENT_MAP[x.ingId],
                p = ((V = e.fishRecords) == null ? void 0 : V[x.ingId]) ?? 0,
                y = p > 0,
                v =
                  Array.isArray(x.solarTerms) && x.solarTerms.length > 0
                    ? `${(m == null ? void 0 : m.emoji) ?? "🐟"} ${x.solarTerms.length === 1 ? x.solarTerms[0] : `${x.solarTerms[0]}-${x.solarTerms[x.solarTerms.length - 1]}`}`
                    : null,
                N = (x.nightOnly ? "🌙 夜钓限定" : null) ?? v,
                S =
                  x.source === "river"
                    ? "🏞️ 河边"
                    : x.source === "market"
                      ? "🦐 市场"
                      : x.source === "park"
                        ? "🌳 公园"
                        : "🏪 商店",
                C = y
                  ? `${(m == null ? void 0 : m.name) ?? x.ingId}，尺寸 ${x.minCm} 到 ${x.maxCm} 厘米，个人纪录 ${p} 厘米${N ? `，${N.replace(/[^\u4e00-\u9fa5]/g, "")}` : ""}。${x.note}`
                  : `未获得的神秘鱼类${N ? `，${N.replace(/[^\u4e00-\u9fa5]/g, "")}` : ""}`;
              return jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `codex-fish-${x.ingId}`,
                  "aria-label": C,
                  onClick: () => s(x.ingId),
                  className: `rounded-xl p-2 text-left active:scale-[0.97] ${y ? "bg-[#e1f5fe]" : "bg-[#f3e3cb] opacity-70"}`,
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        jsxRuntime.jsx("div", {
                          className: "flex w-[20%] shrink-0 items-center justify-center",
                          children: jsxRuntime.jsx("span", {
                            className: "emoji text-xl",
                            children: (m == null ? void 0 : m.emoji) ?? "🐟",
                          }),
                        }),
                        jsxRuntime.jsx("div", {
                          className: "min-w-0 flex-1",
                          children: jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsxs("p", {
                                className: "text-xs font-black text-[#01579b]",
                                children: [
                                  y ? ((m == null ? void 0 : m.name) ?? x.ingId) : "？？？",
                                  N &&
                                    jsxRuntime.jsxs("span", {
                                      className: "ml-1 text-[9px] font-bold text-[#e65100]",
                                      children: ["（", N, "）"],
                                    }),
                                ],
                              }),
                              jsxRuntime.jsxs("p", {
                                className: "text-[9px] font-bold text-[#0277bd]",
                                children: [
                                  segmentByEmoji(`${S} · ${x.minCm}-${x.maxCm}cm`),
                                  jsxRuntime.jsx("span", {
                                    className: `ml-1 rounded-full px-1.5 py-px text-[9px] font-black ${y ? "bg-white text-[#01579b]" : "bg-[#e8d9c3] text-[#8a6a4a]"}`,
                                    children: y
                                      ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                          children: [
                                            jsxRuntime.jsx("span", { className: "emoji", children: "📏" }),
                                            " 纪录 ",
                                            p,
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
                        "mt-1 flex items-center gap-1 text-[9px] font-bold leading-relaxed text-[#4fc3f7]",
                      children: [
                        jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: x.note }),
                        jsxRuntime.jsx("span", {
                          className:
                            "shrink-0 rounded-full bg-[#e1f5fe] px-1.5 py-px text-[8px] font-black text-[#0277bd]",
                          children: "详情 ›",
                        }),
                      ],
                    }),
                    p >= 50 &&
                      jsxRuntime.jsxs("p", {
                        className: "mt-0.5 text-[9px] font-black text-[#c62828]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🏅" }),
                          " 大物纪录（≥50cm）",
                        ],
                      }),
                    p >= 60 &&
                      jsxRuntime.jsxs("p", {
                        className: "text-[9px] font-black text-[#c62828]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🏆" }),
                          " 已达上限 60cm",
                        ],
                      }),
                  ],
                },
                x.ingId,
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
                  "rounded-2xl bg-[#e1f5fe] p-3 text-center text-sm font-black leading-relaxed text-[#01579b]",
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
                    className: "text-[11px] font-bold text-[#0277bd]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🏅" }),
                      " 个人纪录 ",
                      l > 0 ? `${l}cm` : "尚未钓到",
                    ],
                  }),
                  a.nightOnly &&
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-bold text-[#e65100]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🌙" }),
                        " 夜钓限定：夜间 20 点后用夜香螺饵才钓得到",
                      ],
                    }),
                  Array.isArray(a.solarTerms) &&
                    a.solarTerms.length > 0 &&
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-bold text-[#e65100]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "☀️" }),
                        " 节气限定：",
                        a.solarTerms.join("、"),
                        " 用对应节气饵才钓得到",
                      ],
                    }),
                  l >= 50 &&
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-black text-[#c62828]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🏅" }),
                        " 大物纪录（≥50cm）",
                      ],
                    }),
                  l >= 60 &&
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-black text-[#c62828]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🏆" }),
                        " 已达上限 60cm",
                      ],
                    }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "flex justify-center",
                children: jsxRuntime.jsx(SpeakButton, {
                  text: `${o.name}。${a.note} 常见尺寸${a.minCm}到${a.maxCm}厘米。个人纪录${l > 0 ? l + "厘米" : "尚未钓到"}。${a.nightOnly ? "夜钓限定：夜间二十点后用夜香螺饵才钓得到。" : ""}${Array.isArray(a.solarTerms) && a.solarTerms.length > 0 ? `节气限定：${a.solarTerms.join("、")}用对应节气饵才钓得到。` : ""}${l >= 50 ? "大物纪录五十厘米以上。" : ""}`,
                  label: "朗读详情",
                  testId: `codex-fish-detail-speak-${a.ingId}`,
                  className: "btn-xs",
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
