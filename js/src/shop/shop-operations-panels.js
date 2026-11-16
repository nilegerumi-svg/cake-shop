const CAKE_EMOJIS = ["🍰", "🧁", "🍓", "🍫", "🥧", "🍯"];

function MemoryMatchGame({ onFinish: e, disabled: n }) {
  const [s, a] = React.useState(() => {
      const p = [...CAKE_EMOJIS, ...CAKE_EMOJIS];
      for (let y = p.length - 1; y > 0; y -= 1) {
        const j = Math.floor(Math.random() * (y + 1));
        [p[y], p[j]] = [p[j], p[y]];
      }
      return p.map((y, j) => ({ id: j, emoji: y }));
    }),
    [o, l] = React.useState([]),
    [c, u] = React.useState([]),
    [f, g] = React.useState(!1),
    x = (p) => {
      if (f || n || o.includes(p) || c.includes(p)) return;
      const y = [...o, p];
      if ((l(y), y.length === 2)) {
        g(!0);
        const [j, v] = y;
        if (s[j].emoji === s[v].emoji) {
          const w = [...c, j, v];
          (u(w), l([]), g(!1), w.length === s.length && e(!0));
        } else
          window.setTimeout(() => {
            (l([]), g(!1));
          }, 700);
      }
    },
    m = c.length === s.length;
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsx("div", {
          className: "grid grid-cols-4 gap-2",
          children: s.map((p, y) => {
            const j = o.includes(y) || c.includes(y);
            return jsxRuntime.jsx(
              "button",
              {
                type: "button",
                "data-testid": `memory-card-${y}`,
                "aria-label": `第 ${y + 1} 张牌${j ? `，内容为 ${p.emoji}` : "，未翻开"}`,
                onClick: () => x(y),
                disabled: n || f || j,
                className: `flex h-14 items-center justify-center rounded-xl border-2 text-2xl transition-all ${j ? "border-[#ffc9d4] bg-[#fff0f3]" : "border-[#f0dcc0] bg-[#f7e8d2]"}`,
                children: j ? p.emoji : "❓",
              },
              p.id,
            );
          }),
        }),
        m &&
          jsxRuntime.jsxs("p", {
            className: "mt-2 text-center text-sm font-black text-[#c62828]",
            children: ["全部配对成功！", jsxRuntime.jsx("span", { className: "emoji", children: "🎉" })],
          }),
      ],
    }),
  );
}

function BusinessLogDialog({ open: e, log: n, onClose: s }) {
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "🛎️ 营业记录",
      onClose: s,
      children: jsxRuntime.jsx("div", {
        className: "space-y-1.5",
        children: n.map((a, o) =>
          jsxRuntime.jsx(
            "p",
            {
              className: `rounded-lg px-3 py-2 text-sm font-bold ${a.includes("买走") ? "bg-[#e3f2fd] text-[#c62828]" : "bg-[#f3e3cb] text-[#8a6a4a]"}`,
              children: a,
            },
            o,
          ),
        ),
      }),
    }),
  );
}

function SpeakButton({
  text: e,
  label: n = "朗读",
  className: s = "",
  testId: a = "btn-speak",
  ariaLabel: o,
}) {
  const [l, c] = React.useState(!1),
    u = React.useRef(!1),
    f = React.useRef(e);
  f.current = e;
  const g = () => {
      ((u.current = !1), c(!1));
      try {
        stopTTS();
      } catch {}
    },
    x = async () => {
      if (u.current) {
        g();
        return;
      }
      ((u.current = !0),
        c(!0),
        await speakText(f.current, {
          shouldStop: () => !u.current,
          onDone: () => {
            ((u.current = !1), c(!1));
          },
        }));
    };
  return (
    React.useEffect(() => {
      u.current && g();
    }, [e]),
    React.useEffect(
      () => () => {
        if (u.current)
          try {
            stopTTS();
          } catch {}
      },
      [],
    ),
    jsxRuntime.jsxs("button", {
      type: "button",
      "data-testid": a,
      "aria-label": o ?? (n ? void 0 : "朗读"),
      onClick: x,
      className: `btn-chunky ${l ? "btn-yellow" : "btn-pink"} ${s}`,
      children: [
        jsxRuntime.jsx("span", {
          className: "material-icons",
          style: { fontSize: 16 },
          "aria-hidden": "true",
          children: l ? "stop" : "volume_up",
        }),
        l ? "停止" : n,
      ],
    })
  );
}

function ShopOpenPanel({ state: e, personalBonus: n, dineSeats: s, open: a, onToggle: o, onOpen: l }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card border-[#ff6b81]/30",
      style: { background: "linear-gradient(135deg,#fff0f3,#ffe9ef)" },
      children: [
        jsxRuntime.jsx(CollapsibleHeader, {
          open: a,
          onToggle: o,
          title: "🏪 开店营业",
          right: jsxRuntime.jsxs("span", {
            className: "text-xs font-bold text-[#b08a6a]",
            children: [
              "今日剩余客流批次：",
              jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: e.visits }),
            ],
          }),
        }),
        a &&
          jsxRuntime.jsxs("div", {
            className: "mt-1 space-y-1.5",
            children: [
              (() => {
                const c = getActiveFestival(e.day);
                if (!c) return null;
                const u = getFestivalSellMultiplier(e.day);
                return jsxRuntime.jsxs("div", {
                  className:
                    "flex flex-wrap items-center justify-between gap-2 rounded-xl border-2 border-[#ffcc80] bg-[#fff8e1] px-2 py-1",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className:
                        "min-w-0 flex-1 text-[10px] font-black leading-relaxed text-[#b8860b]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: c.emoji }),
                        " 今日节日：",
                        c.name,
                        "！",
                        c.tip ?? "",
                        u > 0 ? ` 今日点心成交率 +${Math.round(u * 100)}%` : "",
                      ],
                    }),
                    jsxRuntime.jsx(SpeakButton, {
                      text: `今日节日：${c.name}！${c.tip ?? ""}${u > 0 ? `，今日点心成交率提升百分之${Math.round(u * 100)}` : ""}`,
                      label: "朗读",
                      testId: "btn-shop-festival-speak",
                      className: "btn-xs shrink-0",
                    }),
                  ],
                });
              })(),
              jsxRuntime.jsx("p", {
                className: "text-[11px] text-[#b08a6a]",
                children: "定价越高，单笔赚越多，但客人越容易嫌贵",
              }),
              jsxRuntime.jsxs("p", {
                className: "text-[11px] font-bold text-[#c62828]",
                children: ["亲自接待客人：每成交一单交涉技能 +1，个人魅力加成 +", n, "%"],
              }),
              jsxRuntime.jsxs("p", {
                className: "text-[11px] font-bold text-[#8d6e63]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🪑" }),
                  " ",
                  s > 0
                    ? `店内已有 ${s} 种堂食席位（桌/椅/凳），客人可以坐下吃完再走，一桌最多点两份`
                    : "把桌/椅/凳摆进店铺可开放堂食席位，客人可以坐着吃完再走（一桌最多点两份）",
                ],
              }),
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-open-shop",
                onClick: l,
                className: "btn-chunky btn-pink mt-1 w-full",
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛎️" }), " 营业"],
              }),
            ],
          }),
      ],
    }),
  );
}

const SPEED_OPTIONS = [0.5, 0.8, 1, 1.2, 1.5, 2, 2.5, 3],
  FURNITURE_ACTION_LABELS = {
    f_shelf: "🗃️ 整理货架",
    f_cashier: "🧾 盘点账目",
    f_table: "🍽️ 招待堂食",
    f_chair: "💺 坐下歇脚",
    f_juicer: "🍹 榨果汁",
    f_coffee: "☕ 煮咖啡",
    f_fridge: "🧊 查看保鲜",
    f_ac: "❄️ 查看舒适",
  },
  FURNITURE_ACTION_DESCS = {
    f_shelf: "花 10 精力整理货架，点心保鲜期 +1 天",
    f_cashier: "花 10 精力盘点账目，把暂存营业额收进口袋（小费按营业额算）",
    f_table: "花 10 精力招呼客人，直接卖出一份货架点心",
    f_chair: "花 1 小时歇脚，精力 +20",
    f_juicer: "消耗 1 份水果榨果汁，心情 +4、精力 +4",
    f_coffee: "煮一杯咖啡：精力 +8、心情 +4（每天一次）",
    f_fridge: "冰箱在店里保鲜：全部食材新鲜度下降减半",
    f_ac: "空调让店里更舒适：客人成交率 +2%、睡觉回复心情 +2",
  };

function getSellableProducts(e) {
  return e.products.filter((n) => {
    var s;
    return (
      n.quality !== "fail" &&
      !e.shelves.some((a) => a.pid === n.pid) &&
      (((s = RECIPE_RUNTIME_DATA[n.recipeId]) == null ? void 0 : s.system) ?? "bakery") !== "cuisine"
    );
  });
}

function getCuisineProducts(e) {
  return e.products.filter((n) => {
    var s;
    return (((s = RECIPE_RUNTIME_DATA[n.recipeId]) == null ? void 0 : s.system) ?? "bakery") === "cuisine";
  });
}

function getPlacedFurnitureKinds(e) {
  const n = [],
    s = new Set();
  for (const a of e.shopPlacements ?? []) {
    const o = a.slice(0, a.lastIndexOf("_"));
    if (s.has(o)) continue;
    s.add(o);
    const l = FURNITURE_MAP[o];
    l && n.push({ fid: o, name: l.name, emoji: l.emoji });
  }
  return n;
}

function countSeatingKinds(e) {
  const n = new Set(["f_table", "f_chair", "f_stool"]),
    s = new Set();
  for (const a of e.shopPlacements ?? []) {
    const o = a.slice(0, a.lastIndexOf("_"));
    n.has(o) && s.add(o);
  }
  return s.size;
}

function calcTipBonus(e) {
  return Math.min(12, Math.round(e * 0.08 * 10) / 10);
}

function calcCharmBonus(e) {
  return Math.min(10, Math.round(e * 0.1 * 10) / 10);
}

function ShopCharmPanel({ state: e, open: n, onToggle: s }) {
  const a = getEarnedStar(e),
    o = calcDecorScore(e),
    l = calcShopScore(e),
    c = calcTipBonus(l);
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: "店铺魅力",
      emoji: "✨",
      sub: `Lv.${a}/10 · 装饰度 ${o} · 成交率加成 +${c}%`,
      open: n,
      onToggle: s,
      testId: "shop-sec-charm",
      children: [
        jsxRuntime.jsxs("div", {
          className: "grid grid-cols-3 gap-2 text-center",
          children: [
            jsxRuntime.jsxs("div", {
              className: "rounded-xl bg-white/80 p-2",
              children: [
                jsxRuntime.jsx("p", {
                  className: "text-[11px] font-bold text-[#b08a6a]",
                  children: "店铺等级",
                }),
                jsxRuntime.jsxs("p", {
                  className: "num text-lg font-black text-[#4a2c17]",
                  children: ["Lv.", a, "/10"],
                }),
                jsxRuntime.jsxs("p", {
                  className: "num text-[9px] font-bold text-[#b08a6a]",
                  children: ["营业额 ", e.stats.earned, " / ", a * 3e3],
                }),
                jsxRuntime.jsxs("p", {
                  className: "num text-[9px] font-bold text-[#2e7d32]",
                  children: ["货架容量 ", shelfCapacity(e), " 格"],
                }),
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "rounded-xl bg-white/80 p-2",
              children: [
                jsxRuntime.jsx("p", {
                  className: "text-[11px] font-bold text-[#b08a6a]",
                  children: "装修装饰度",
                }),
                jsxRuntime.jsx("p", { className: "num text-lg font-black text-[#4a2c17]", children: o }),
                jsxRuntime.jsx("p", {
                  className: "text-[9px] font-bold text-[#b08a6a]",
                  children: "家具摆进店铺",
                }),
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "rounded-xl bg-white/80 p-2",
              children: [
                jsxRuntime.jsx("p", {
                  className: "text-[11px] font-bold text-[#b08a6a]",
                  children: "成交率加成",
                }),
                jsxRuntime.jsxs("p", {
                  className: "num text-lg font-black text-[#c62828]",
                  children: ["+", c, "%"],
                }),
                jsxRuntime.jsx("p", {
                  className: "text-[9px] font-bold text-[#b08a6a]",
                  children: "上限 +12%",
                }),
              ],
            }),
          ],
        }),
        jsxRuntime.jsxs("p", {
          className: "mt-2 text-[11px] font-bold leading-relaxed text-[#a08030]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🛋️" }),
            " 蛋糕店自带基础陈设（装饰度 10），把「家 · 家具」里的家具摆进店铺可进一步提升装饰度；装饰度越高，在家睡觉回复的心情越多。",
          ],
        }),
        jsxRuntime.jsxs("p", {
          className: "mt-1.5 text-[11px] font-bold leading-relaxed text-[#a08030]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "📦" }),
            " 店铺等级每 +1 级，货架容量 +3 格（上限 30 格），能摆的点心更多；",
            jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
            " 每天结算水电费 ¥",
            dailyUtilityFee(e),
            "（基础 8 元 + 等级 + 厨具），金币不够会欠费。",
          ],
        }),
      ],
    }),
  );
}

function ShopUpgradePanel({
  state: e,
  placedFurniture: n,
  open: s,
  onToggle: a,
  onInteract: o,
  onUpgrade: l,
  interactBlock: c,
}) {
  const u = getShopLevel(e),
    f = countShopPlacements(e),
    g = getNextShopLevel(e),
    x = 300 * u;
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: "店内家具（点按钮互动）",
      emoji: "🛋️",
      sub: `已摆放 ${n.length} 件 · 整理保鲜 / 盘点入账 / 招待堂食 / 坐下歇脚`,
      open: s,
      onToggle: a,
      testId: "shop-sec-furniture",
      children: [
        jsxRuntime.jsxs("div", {
          className: "mb-2 rounded-xl border-2 border-[#f0dcc0] bg-[#fff8ef] p-2.5",
          children: [
            jsxRuntime.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex w-[20%] shrink-0 items-center justify-center",
                  children: jsxRuntime.jsx("span", { className: "emoji text-xl", children: "📈" }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "text-sm font-black text-[#4a2c17]",
                          children: [
                            "店铺升级 ",
                            jsxRuntime.jsxs("span", {
                              className: "num text-[#e04a63]",
                              children: ["Lv.", u, "/10"],
                            }),
                          ],
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[11px] font-bold leading-relaxed text-[#b08a6a]",
                          children: [
                            "店内可拜访大家具 ",
                            jsxRuntime.jsxs("span", {
                              className: "num font-black text-[#6b4226]",
                              children: [f, "/", g, " 件"],
                            }),
                            "（Lv.1 可拜访 2 件，每升 1 级 +1 件，Lv.10 = 11 件；装饰小家具不占名额）",
                          ],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-shop-upgrade",
                        onClick: l,
                        disabled: u >= 10 || e.coins < x,
                        className: "btn-chunky btn-xs btn-orange",
                        children: u >= 10 ? "已满级" : `升级 Lv.${u + 1}（¥${x}）`,
                      }),
                    }),
                  ],
                }),
              ],
            }),
            u < 10 &&
              jsxRuntime.jsxs("p", {
                className: "mt-1.5 text-[10px] font-bold leading-relaxed text-[#a08030]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🔓" }),
                  " 下一级解锁：可拜访大家具 ",
                  g,
                  " → ",
                  g + 1,
                  " 件；升级费用 300 × 当前等级。",
                ],
              }),
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
          children:
            "货架、收银台、桌椅都不是摆件：整理保鲜、盘点入账、招待堂食、坐下歇脚，每件家具都有真实用途。卖出的点心钱会先存在收银台，记得去盘点。",
        }),
        n.length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-2 text-center text-sm text-[#b08a6a]",
              children: "店里还没有家具，去「家 · 家具」摆几件进来吧",
            })
          : jsxRuntime.jsx("div", {
              className: "space-y-2",
              children: n.map((m) =>
                jsxRuntime.jsxs(
                  "div",
                  {
                    className:
                      "flex gap-2.5 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-2.5",
                    children: [
                      jsxRuntime.jsx("div", {
                        className: "flex w-[20%] shrink-0 items-center justify-center",
                        children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: m.emoji }),
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("p", {
                                className: "text-sm font-black text-[#4a2c17]",
                                children: m.name,
                              }),
                              jsxRuntime.jsx("p", {
                                className: "text-[11px] font-bold text-[#b08a6a]",
                                children: FURNITURE_ACTION_DESCS[m.fid] ?? `花 5 精力打理${m.name}，心情 +3`,
                              }),
                              m.fid === "f_cashier" &&
                                (e.cashRegister ?? 0) > 0 &&
                                jsxRuntime.jsxs("span", {
                                  className:
                                    "mt-0.5 inline-block rounded-full bg-[#fff3bf] px-2 py-px text-[10px] font-black text-[#b8860b]",
                                  children: [
                                    jsxRuntime.jsx("span", { className: "emoji", children: "🧾" }),
                                    " 暂存营业额 ¥",
                                    e.cashRegister,
                                  ],
                                }),
                            ],
                          }),
                          jsxRuntime.jsx("div", {
                            className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                            children: jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": `btn-interact-${m.fid}`,
                              onClick: () => o(m.fid),
                              className: "btn-chunky btn-xs btn-brown",
                              children:
                                FURNITURE_ACTION_LABELS[m.fid] ??
                                jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                  children: [
                                    jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
                                    " 打理",
                                  ],
                                }),
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  m.fid,
                ),
              ),
            }),
        c && jsxRuntime.jsx("div", { className: "mt-2", children: c }),
      ],
    }),
  );
}

function EmployeePanel({ state: e, open: n, onToggle: s }) {
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: "员工招聘",
      emoji: "🧑‍🍳",
      sub:
        e.employees.length > 0
          ? `已雇佣 ${e.employees.length} 位员工 · 离店也能营业`
          : "去「小镇 · 商店街」招聘摊位雇佣店员",
      open: n,
      onToggle: s,
      testId: "shop-sec-staff",
      children: [
        jsxRuntime.jsx("p", {
          className: "text-[11px] font-bold leading-relaxed text-[#b08a6a]",
          children:
            "不在店里就没法亲自卖货；雇佣员工后，离开店铺时也能用顶栏的「员工营业」继续卖货（员工接待不涨交涉技能）。员工工资日结：每天结算一次日薪。",
        }),
        jsxRuntime.jsxs("p", {
          className:
            "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🏘️" }),
            " 去「小镇 · 商店街」的招聘摊位就能见到顾一鸣和唐晓雨，雇佣后他们会来店里上班。",
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2 flex flex-wrap gap-1.5",
          children: [
            e.employees.map((a) => {
              const o = EMPLOYEE_MAP[a];
              return o
                ? jsxRuntime.jsxs(
                    "span",
                    {
                      className:
                        "rounded-full bg-[#e3f2fd] px-2.5 py-1 text-xs font-black text-[#c62828]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: o.emoji }),
                        " ",
                        o.name,
                        " 已雇佣 ✓",
                      ],
                    },
                    a,
                  )
                : null;
            }),
            e.employees.length === 0 &&
              jsxRuntime.jsx("span", {
                className: "rounded-full bg-[#f3e3cb] px-2.5 py-1 text-xs font-bold text-[#8a6a4a]",
                children: "还没有员工",
              }),
          ],
        }),
      ],
    }),
  );
}

function ShopSkillPanel({ state: e, talkOpen: n, onTalkToggle: s, tasteOpen: a, onTasteToggle: o }) {
  var l, c;
  return renderWithSpeech(
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsxs(SectionCard, {
          title: "交涉技能",
          emoji: "🗣️",
          sub: `${e.negotiation}/100 · 亲自接待成交可提升，每 10 级为魅力 +1`,
          open: n,
          onToggle: s,
          testId: "shop-sec-talk",
          children: [
            jsxRuntime.jsx("div", {
              className: "bar-track",
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": e.negotiation,
              "aria-label": `交涉技能 ${e.negotiation}/100`,
              children: jsxRuntime.jsx("div", {
                className: "bar-fill",
                style: {
                  width: `${e.negotiation}%`,
                  background: "linear-gradient(90deg,#ce93d8,#ab47bc)",
                },
              }),
            }),
            jsxRuntime.jsxs("p", {
              className: "mt-1.5 text-[11px] font-bold leading-relaxed text-[#b08a6a]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
                " 亲自接待并成交可提升交涉技能，每 10 级为个人魅力 +1；个人魅力越高，亲自营业时成交率越高（上限 +10%）。新衣服去商店街的服装店买，发型去理发店做。",
              ],
            }),
          ],
        }),
        jsxRuntime.jsx(SectionCard, {
          title: `今日小镇口味偏好：${((l = CAKE_THEME_MAP[e.dailyTaste]) == null ? void 0 : l.label) ?? "甜味"}`,
          emoji: ((c = CAKE_THEME_MAP[e.dailyTaste]) == null ? void 0 : c.emoji) ?? "🍬",
          sub: "上架对味的点心，客人更容易买单（+18% 成交率）",
          open: a,
          onToggle: o,
          testId: "shop-sec-taste",
          children: jsxRuntime.jsx("p", {
            className: "text-[11px] font-bold text-[#a08030]",
            children: "上架对味的点心，客人更容易买单（+18% 成交率）",
          }),
        }),
      ],
    }),
  );
}

function ShelfPanel({ state: e, capacity: n, open: s, onToggle: a, onUnstock: o, onSetMult: l }) {
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: `货架（${e.shelves.length}/${n}）`,
      emoji: "🛒",
      sub: "一格放一组成品，客人按份买走，价格显示每份单价",
      open: s,
      onToggle: a,
      testId: "shop-sec-shelf",
      children: [
        jsxRuntime.jsx("p", {
          className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
          children: "货架一格放一组成品，客人按份买走（一次 1 份），价格显示的是每份单价。",
        }),
        e.shelves.length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-3 text-center text-sm text-[#b08a6a]",
              children: "货架空空，从背包上架点心吧",
            })
          : jsxRuntime.jsx(CollapsibleSection, {
              title: "🛒 货架明细",
              summary: `共 ${e.shelves.length} 格在售`,
              count: e.shelves.length,
              testId: "sub-collapse-shelf",
              tone: "#6b4226",
              children: jsxRuntime.jsx("div", {
                className: "space-y-2",
                children: e.shelves.map((c) => {
                  var m, p;
                  const u = e.products.find((y) => y.pid === c.pid);
                  if (!u) return null;
                  const f = RECIPE_RUNTIME_DATA[u.recipeId],
                    g = QUALITY_META[u.quality],
                    x = getFinalProductPrice(u, c.mult);
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: "rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] p-3",
                      children: [
                        jsxRuntime.jsxs("div", {
                          className: "flex items-center gap-2",
                          children: [
                            jsxRuntime.jsx("div", {
                              className: "flex w-[20%] shrink-0 items-center justify-center",
                              children: jsxRuntime.jsx("span", {
                                className: "emoji text-xl",
                                children: (f == null ? void 0 : f.emoji) ?? "🍰",
                              }),
                            }),
                            jsxRuntime.jsxs("div", {
                              className: "min-w-0 flex-1",
                              children: [
                                jsxRuntime.jsxs("div", {
                                  children: [
                                    jsxRuntime.jsx("p", {
                                      className: "text-sm font-bold text-[#4a2c17]",
                                      children:
                                        u.customName ?? (f == null ? void 0 : f.name) ?? "点心",
                                    }),
                                    jsxRuntime.jsxs("span", {
                                      className: `badge ${`badge-${u.quality}`}`,
                                      children: [
                                        jsxRuntime.jsx("span", { className: "emoji", children: g.emoji }),
                                        " ",
                                        g.label,
                                        " · 保质 ",
                                        u.remaining,
                                        " 天",
                                      ],
                                    }),
                                    f &&
                                      jsxRuntime.jsxs("span", {
                                        className: "ml-1.5 text-[10px] font-bold text-[#b8860b]",
                                        children: [
                                          jsxRuntime.jsx("span", {
                                            className: "emoji",
                                            children: (m = CAKE_THEME_MAP[f.taste]) == null ? void 0 : m.emoji,
                                          }),
                                          " ",
                                          (p = CAKE_THEME_MAP[f.taste]) == null ? void 0 : p.label,
                                          f.taste === e.dailyTaste &&
                                            jsxRuntime.jsx("span", {
                                              className: "text-[#e04a63]",
                                              children: " · 今日大卖",
                                            }),
                                        ],
                                      }),
                                    jsxRuntime.jsxs("span", {
                                      className: "ml-1.5 text-[10px] font-bold text-[#b08a6a]",
                                      children: [
                                        jsxRuntime.jsxs("span", {
                                          className: "num text-[#e04a63]",
                                          children: ["¥", x],
                                        }),
                                        "/份 · 库存 ",
                                        u.qty ?? 1,
                                        " 份",
                                      ],
                                    }),
                                  ],
                                }),
                                jsxRuntime.jsx("div", {
                                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                                  children: jsxRuntime.jsx("button", {
                                    type: "button",
                                    "data-testid": `btn-unstock-${c.pid}`,
                                    onClick: () => o(c.pid),
                                    className: "btn-chunky btn-xs btn-ghost",
                                    children: "下架",
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                        jsxRuntime.jsx("div", {
                          className: "mt-2 flex flex-wrap gap-1",
                          children: SPEED_OPTIONS.map((y) =>
                            jsxRuntime.jsxs(
                              "button",
                              {
                                type: "button",
                                "data-testid": `btn-mult-${c.pid}-${y}`,
                                onClick: () => l(c.pid, y),
                                className: `rounded-lg px-2 py-1 text-xs font-black ${c.mult === y ? "bg-[#ff6b81] text-white" : "bg-[#f3e3cb] text-[#6b4226]"}`,
                                children: [y, "x"],
                              },
                              y,
                            ),
                          ),
                        }),
                      ],
                    },
                    c.pid,
                  );
                }),
              }),
            }),
      ],
    }),
  );
}

function PendingShelfPanel({ state: e, stockable: n, cuisineCount: s, open: a, onToggle: o, onStock: l }) {
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: `待上架（${n.length}）`,
      emoji: "📦",
      sub: "把背包里的点心成品摆上货架",
      open: a,
      onToggle: o,
      testId: "shop-sec-stock",
      children: [
        s > 0 &&
          jsxRuntime.jsxs("p", {
            className:
              "mb-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🍳" }),
              " 背包里还有 ",
              s,
              " 组家常料理：蛋糕店只卖烘焙点心，料理可以留着自己吃、送人，或去收容所捐给小动物。",
            ],
          }),
        n.length === 0
          ? jsxRuntime.jsx("p", {
              className: "py-3 text-center text-sm text-[#b08a6a]",
              children: "没有可上架的成品（失败品除外）",
            })
          : jsxRuntime.jsx(CollapsibleSection, {
              title: "📦 可上架成品",
              summary: `共 ${n.length} 组待上架`,
              count: n.length,
              testId: "sub-collapse-stock",
              tone: "#6b4226",
              children: jsxRuntime.jsx("div", {
                className: "space-y-2",
                children: n.map((c) => {
                  var g, x, m, p;
                  const u = RECIPE_RUNTIME_DATA[c.recipeId],
                    f = QUALITY_META[c.quality];
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: "flex gap-2 rounded-xl bg-[#fbf3e4] px-3 py-2",
                      children: [
                        jsxRuntime.jsx("div", {
                          className: "flex w-[20%] shrink-0 items-center justify-center",
                          children: jsxRuntime.jsx("span", {
                            className: "emoji text-xl",
                            children: (u == null ? void 0 : u.emoji) ?? "🍰",
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
                                    (u == null ? void 0 : u.name) ?? "点心",
                                    jsxRuntime.jsxs("span", {
                                      className: "num ml-1 text-[#e04a63]",
                                      children: ["x", c.qty ?? 1],
                                    }),
                                  ],
                                }),
                                jsxRuntime.jsxs("span", {
                                  className: `badge ${`badge-${c.quality}`}`,
                                  children: [
                                    jsxRuntime.jsx("span", { className: "emoji", children: f.emoji }),
                                    " ",
                                    f.label,
                                    " · 保质 ",
                                    c.remaining,
                                    " 天",
                                  ],
                                }),
                                u &&
                                  jsxRuntime.jsxs("span", {
                                    className: "ml-1.5 text-[10px] font-bold text-[#b8860b]",
                                    children: [
                                      jsxRuntime.jsx("span", {
                                        className: "emoji",
                                        children: (g = BAKE_SIZE_OPTIONS[u.size]) == null ? void 0 : g.emoji,
                                      }),
                                      " ",
                                      (x = BAKE_SIZE_OPTIONS[u.size]) == null ? void 0 : x.label,
                                      " · ",
                                      jsxRuntime.jsx("span", {
                                        className: "emoji",
                                        children: (m = CAKE_THEME_MAP[u.taste]) == null ? void 0 : m.emoji,
                                      }),
                                      " ",
                                      (p = CAKE_THEME_MAP[u.taste]) == null ? void 0 : p.label,
                                      u.taste === e.dailyTaste &&
                                        jsxRuntime.jsx("span", {
                                          className: "text-[#e04a63]",
                                          children: " · 今日大卖",
                                        }),
                                    ],
                                  }),
                              ],
                            }),
                            jsxRuntime.jsx("div", {
                              className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                              children: jsxRuntime.jsx("button", {
                                type: "button",
                                "data-testid": `btn-stock-${c.pid}`,
                                onClick: () => l(c.pid, 1),
                                className: "btn-chunky btn-xs btn-green",
                                children: "上架",
                              }),
                            }),
                          ],
                        }),
                      ],
                    },
                    c.pid,
                  );
                }),
              }),
            }),
      ],
    }),
  );
}

function useShopPanelState(e, n) {
  const [s, a] = React.useState(!1),
    [o, l] = React.useState([]),
    [c, u] = React.useState({
      open: !0,
      charm: !1,
      furniture: !1,
      staff: !1,
      talk: !1,
      taste: !1,
      shelf: !0,
      stock: !0,
    });
  return {
    showLog: s,
    setShowLog: a,
    lastLog: o,
    openSecs: c,
    toggleSec: (y) => u((j) => ({ ...j, [y]: !(j[y] ?? !1) })),
    handleOpen: () => {
      const y = runCustomerFlow(e);
      if (!y.ok) {
        n(y.state, y.message, "error");
        return;
      }
      (l(y.log), a(!0), n(y.state, y.message, "success"));
    },
    handleStock: (y, j) => {
      const v = placeOnShelf(e, y, j);
      if (!v.ok) {
        n(v.state, v.message, "error");
        return;
      }
      n(v.state, v.message, "success");
    },
    handleInteract: (y) => {
      const j = placeFurnitureInShop(e, y);
      n(j.state, j.message, j.ok ? "success" : "error");
    },
    handleUpgrade: () => {
      const y = upgradeShop(e);
      n(y.state, y.message, y.ok ? "success" : "error");
    },
  };
}

function DeliveryOrdersPanel({ state: e, commit: n }) {
  const [s, a] = React.useState(!0),
    o = getPendingDeliveries(e),
    l = Array.isArray(e.deliveryOrders) ? e.deliveryOrders : [];
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "landline-sec-toggle",
        "aria-expanded": s,
        onClick: () => a((c) => !c),
        className: "flex w-full items-center gap-2 text-left active:scale-[0.99]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-2xl leading-none", children: "☎️" }),
          jsxRuntime.jsxs("span", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsx("span", {
                className: "block text-base font-black text-[#4a2c17]",
                children: "店内座机 · 外卖热线",
              }),
              jsxRuntime.jsxs("span", {
                className: "block truncate text-[11px] font-bold text-[#b08a6a]",
                children: ["待送达 ", o.length, " 单 · 今日外卖 ", l.length, " 单"],
              }),
            ],
          }),
          jsxRuntime.jsx("span", {
            "aria-hidden": "true",
            className: `shrink-0 text-base font-black text-[#4a2c17] transition-transform duration-200 ${s ? "" : "-rotate-90"}`,
            children: "▾",
          }),
        ],
      }),
      s &&
        jsxRuntime.jsxs("div", {
          className: "mt-2.5 space-y-2",
          children: [
            jsxRuntime.jsxs("div", {
              className: "rounded-xl bg-[#f3edf9] px-3 py-2",
              children: [
                jsxRuntime.jsx("p", {
                  className: "text-[11px] font-black text-[#4a148c]",
                  children: "📦 待送达",
                }),
                o.length === 0
                  ? jsxRuntime.jsx("p", {
                      className: "mt-1 text-[10px] font-bold text-[#7b1fa2]",
                      children: "没有在途外卖，订餐后明天 8:00 送到店里",
                    })
                  : jsxRuntime.jsx("div", {
                      className: "mt-1 space-y-1",
                      children: o.map((c) =>
                        jsxRuntime.jsxs(
                          "p",
                          {
                            className: "text-[10px] font-bold text-[#6a1b9a]",
                            children: [
                              c.shopEmoji,
                              " ",
                              c.shopName,
                              "：",
                              c.items.map((u) => `${u.name}×${u.qty}`).join("、"),
                              "（",
                              jsxRuntime.jsxs("span", { className: "num", children: ["¥", c.total] }),
                              "，明天 8:00 送达）",
                            ],
                          },
                          c.id,
                        ),
                      ),
                    }),
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "rounded-xl bg-[#fff3e0] px-3 py-2",
              children: [
                jsxRuntime.jsx("p", {
                  className: "text-[11px] font-black text-[#bf360c]",
                  children: "🛵 今日外卖单",
                }),
                l.length === 0
                  ? jsxRuntime.jsx("p", {
                      className: "mt-1 text-[10px] font-bold text-[#a08030]",
                      children: "今天还没有外卖订单，明天早上会来新单",
                    })
                  : jsxRuntime.jsx("div", {
                      className: "mt-1 space-y-1.5",
                      children: l.map((c) => {
                        var u;
                        return jsxRuntime.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-2 rounded-lg bg-white px-2 py-1.5",
                            children: [
                              jsxRuntime.jsxs("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                  jsxRuntime.jsxs("p", {
                                    className: "text-[10px] font-black text-[#4a2c17]",
                                    children: [
                                      c.npcEmoji,
                                      " ",
                                      c.npcName,
                                      " 订「",
                                      ((u = RECIPE_RUNTIME_DATA[c.recipeId]) == null ? void 0 : u.name) ??
                                        c.recipeId,
                                      "」",
                                      jsxRuntime.jsxs("span", { className: "num", children: ["×", c.qty] }),
                                    ],
                                  }),
                                  jsxRuntime.jsxs("p", {
                                    className: "text-[9px] font-bold text-[#b08a6a]",
                                    children: [
                                      "第 ",
                                      c.day,
                                      " 天下单 · ",
                                      jsxRuntime.jsxs("span", {
                                        className: "num",
                                        children: ["¥", c.price],
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                              jsxRuntime.jsx("button", {
                                type: "button",
                                "data-testid": `btn-landline-fulfill-${c.id}`,
                                onClick: () => {
                                  const f = shipDeliveryOrder(e, c.id);
                                  n(f.state, f.message, f.ok ? "success" : "error");
                                },
                                className: "btn-chunky btn-xs btn-green shrink-0",
                                children: "备货发货",
                              }),
                            ],
                          },
                          c.id,
                        );
                      }),
                    }),
              ],
            }),
          ],
        }),
    ],
  });
}
