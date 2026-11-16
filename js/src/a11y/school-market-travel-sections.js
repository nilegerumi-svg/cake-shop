function NpcListRenderer({ ctx: e, ids: n, render: s }) {
  var l;
  const { state: a } = e;
  if (n.length === 0)
    return jsxRuntime.jsx("p", {
      className:
        "rounded-xl bg-[#fbf3e4] px-2.5 py-2 text-center text-[10px] font-bold text-[#b08a6a]",
      children: "这里暂时没有伙伴",
    });
  const o = new Map();
  for (const c of n) {
    const u = ((l = NPC_RESIDENCE[c]) == null ? void 0 : l.detail) ?? "其他",
      f = NPC_GENDERS[c] ?? "其他",
      g = npcAgeGroup(c, a.day);
    o.has(u) || o.set(u, new Map());
    const x = o.get(u);
    x.has(f) || x.set(f, new Map());
    const m = x.get(f);
    (m.has(g) || m.set(g, []), m.get(g).push(c));
  }
  return [...o.entries()].map(([c, u]) => {
    const f = [...u.values()].reduce(
      (g, x) => g + [...x.values()].reduce((m, p) => m + p.length, 0),
      0,
    );
    return jsxRuntime.jsxs(
      "div",
      {
        className: "space-y-1.5",
        children: [
          jsxRuntime.jsxs("p", {
            className: "flex items-center gap-1.5 text-[11px] font-black text-[#6b4226]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }),
              jsxRuntime.jsx("span", { className: "truncate", children: c }),
              jsxRuntime.jsxs("span", {
                className:
                  "shrink-0 rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-black text-[#b8860b]",
                children: [f, " 位"],
              }),
            ],
          }),
          [...u.entries()].map(([g, x]) =>
            jsxRuntime.jsxs(
              "div",
              {
                className: "space-y-1.5 rounded-xl border border-[#f0e0b0] bg-white/70 p-1.5",
                children: [
                  jsxRuntime.jsx("p", {
                    className: "text-[10px] font-black text-[#b8860b]",
                    children:
                      g === "男"
                        ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "👨" }),
                              " 男",
                            ],
                          })
                        : g === "女"
                          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "👩" }),
                                " 女",
                              ],
                            })
                          : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "🧑" }),
                                " 其他",
                              ],
                            }),
                  }),
                  AGE_GROUPS.filter((m) => x.has(m)).map((m) =>
                    jsxRuntime.jsxs(
                      "div",
                      {
                        children: [
                          jsxRuntime.jsx("p", {
                            className: "text-[10px] font-bold text-[#8a6a4a]",
                            children:
                              m === "儿童"
                                ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                    children: [
                                      jsxRuntime.jsx("span", { className: "emoji", children: "🧒" }),
                                      " 儿童",
                                    ],
                                  })
                                : m === "成人"
                                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                      children: [
                                        jsxRuntime.jsx("span", { className: "emoji", children: "🧑" }),
                                        " 成人",
                                      ],
                                    })
                                  : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                      children: [
                                        jsxRuntime.jsx("span", { className: "emoji", children: "👴" }),
                                        " 老人",
                                      ],
                                    }),
                          }),
                          jsxRuntime.jsx("div", {
                            className: "mt-1 space-y-1.5",
                            children: (x.get(m) ?? []).map((p) => s(p)),
                          }),
                        ],
                      },
                      m,
                    ),
                  ),
                ],
              },
              g,
            ),
          ),
        ],
      },
      c,
    );
  });
}

function SchoolSection({ ctx: e }) {
  const { state: n } = e,
    { hour: s, day: a } = n,
    o = currentVacation(a),
    l = (m) => getNpcLocationAt(m, s, a).place === "school",
    c = ["gu_yifan"].filter(l),
    u = STUDENT_NPC_IDS.filter(l),
    f = NPC_IDS.filter((m) => npcSchoolPlace(m, a) === "school" && l(m)),
    g = (m) => e.openCats[`school-${m}`] ?? !0,
    x = (m) => e.onOpenCats((p) => ({ ...p, [`school-${m}`]: !(p[`school-${m}`] ?? !0) }));
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏫" }),
          " 幼儿园·小学合并校不对外开放，非师生进不去。孩子们在这里上学，有学生住校；幼儿园、小学都有老师带班任教。放学时段校门口能看到学生们的日常，运气好还能碰到来接孩子的家长；放学后校园里就没人了。",
        ],
      }),
      o
        ? jsxRuntime.jsxs("p", {
            className:
              "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🏖️" }),
              " 现在是",
              o,
              "，学校放假中，校门口安安静静的，等开学再来看看吧。",
            ],
          })
        : jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-school-gate-event",
            onClick: e.onSchoolGate,
            disabled: n.energy < 4 || n.hour >= 22,
            className: "btn-chunky btn-sm btn-pink w-full",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }),
              " 校门口看看（放学时段 16-18 点 · 耗 4 精力）",
            ],
          }),
      c.map((m) =>
        jsxRuntime.jsx(NpcDetailCard, { ctx: e.ctx, npcId: m, badgeText: "🏫 学校宿舍", locId: "school" }, m),
      ),
      MapPlaceCard({
        keyId: "school-teachers",
        title: `👩‍🏫 幼儿园老师 · 此刻 ${u.length} 位在校`,
        emoji: "👩‍🏫",
        sub: "老师们按时间表在校带班，放学后回家",
        open: g("teachers"),
        onToggle: () => x("teachers"),
        border: "border-[#c8e6c9]",
        bg: "bg-[#f1f8e9]",
        titleColor: "text-[#2e7d32]",
        subColor: "text-[#558b2f]",
        testId: "school-cat-teachers",
        children:
          u.length > 0
            ? jsxRuntime.jsx(NpcListRenderer, {
                ctx: e.ctx,
                ids: u,
                render: (m) =>
                  jsxRuntime.jsx(
                    NpcDetailCard,
                    { ctx: e.ctx, npcId: m, badgeText: "👩‍🏫 幼儿园老师", locId: "school" },
                    m,
                  ),
              })
            : jsxRuntime.jsx("p", {
                className:
                  "rounded-xl bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#558b2f]",
                children:
                  "此刻老师们不在学校（放学、周末、节日或寒暑假），白天上课时段再来就能碰到。",
              }),
      }),
      MapPlaceCard({
        keyId: "school-students",
        title: `🧒 本校学生 · 此刻 ${f.length} 位在校`,
        emoji: "🧒",
        sub: "上学时段在校，放学后回家，长大后会升学或毕业离镇",
        open: g("students"),
        onToggle: () => x("students"),
        border: "border-[#c8e6c9]",
        bg: "bg-[#f1f8e9]",
        titleColor: "text-[#2e7d32]",
        subColor: "text-[#558b2f]",
        testId: "school-cat-students",
        children:
          f.length > 0
            ? jsxRuntime.jsx(NpcListRenderer, {
                ctx: e.ctx,
                ids: f,
                render: (m) => jsxRuntime.jsx(NpcRosterCard, { ctx: e.ctx, npcId: m, badgeText: "🎒 幼儿园·小学" }, m),
              })
            : jsxRuntime.jsx("p", {
                className:
                  "rounded-xl bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#558b2f]",
                children: "此刻没有学生在校（放学、周末、节日或寒暑假），上学时段再来。",
              }),
      }),
    ],
  });
}

function MiddleSchoolSection({ ctx: e }) {
  const { state: n } = e,
    { hour: s, day: a } = n,
    o = currentVacation(a),
    l = NPC_IDS.filter((c) => npcSchoolPlace(c, a) === "middleschool" && getNpcLocationAt(c, s, a).place === "middleschool");
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏫" }),
          " 广场中学不对外开放，非师生进不去。放学时段校门口很热闹，能碰到学生们出校门、家长来接、同学约着去商店街；放学后校园里就没人了。",
        ],
      }),
      o
        ? jsxRuntime.jsxs("p", {
            className:
              "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🏖️" }),
              " 现在是",
              o,
              "，学校放假中，校门口安安静静的，等开学再来看看吧。",
            ],
          })
        : jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-middleschool-gate-event",
            onClick: e.onSchoolGate,
            disabled: n.energy < 4 || n.hour >= 22,
            className: "btn-chunky btn-sm btn-pink w-full",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }),
              " 校门口看看（放学时段 16-18 点 · 耗 4 精力）",
            ],
          }),
      jsxRuntime.jsxs("div", {
        className: "space-y-1.5",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#4a2c17]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🧑‍🎓" }),
              " 本校学生 · 此刻 ",
              l.length,
              " 位在校",
            ],
          }),
          l.length > 0
            ? l.map((c) => jsxRuntime.jsx(NpcRosterCard, { ctx: e.ctx, npcId: c, badgeText: "🏫 广场中学" }, c))
            : jsxRuntime.jsx("p", {
                className:
                  "rounded-xl bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
                children: "此刻没有学生在校（放学、周末、节日或寒暑假），上学时段再来。",
              }),
        ],
      }),
    ],
  });
}

function HighSchoolSection({ ctx: e }) {
  const { state: n } = e,
    { hour: s, day: a } = n,
    o = currentVacation(a),
    l = NPC_IDS.filter((c) => npcSchoolPlace(c, a) === "highschool" && getNpcLocationAt(c, s, a).place === "highschool");
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏫" }),
          " 高中不对外开放，非师生进不去。备考氛围浓厚，放学时段校门口能看到学生们讨论题目、结伴回家；放学后校园里就没人了。",
        ],
      }),
      o
        ? jsxRuntime.jsxs("p", {
            className:
              "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🏖️" }),
              " 现在是",
              o,
              "，学校放假中，校门口安安静静的，等开学再来看看吧。",
            ],
          })
        : jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-highschool-gate-event",
            onClick: e.onSchoolGate,
            disabled: n.energy < 4 || n.hour >= 22,
            className: "btn-chunky btn-sm btn-pink w-full",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }),
              " 校门口看看（放学时段 16-18 点 · 耗 4 精力）",
            ],
          }),
      jsxRuntime.jsxs("div", {
        className: "space-y-1.5",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#4a2c17]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🧑‍🎓" }),
              " 本校学生 · 此刻 ",
              l.length,
              " 位在校",
            ],
          }),
          l.length > 0
            ? l.map((c) => jsxRuntime.jsx(NpcRosterCard, { ctx: e.ctx, npcId: c, badgeText: "🏫 高中" }, c))
            : jsxRuntime.jsx("p", {
                className:
                  "rounded-xl bg-[#f3e5f5] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
                children: "此刻没有学生在校（放学、周末、节日或寒暑假），上学时段再来。",
              }),
        ],
      }),
    ],
  });
}

function TransportPurchaseHint({ state: e, onBuyTransport: n, destLabel: s = "农贸市场" }) {
  return jsxRuntime.jsxs("div", {
    className: "space-y-1.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛞" }), " 先置办一种交通工具"],
      }),
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          "商店街有交通出行服务，公交卡最实惠、小三轮能拉货、私家车最快。买任意一种就能随时出发去",
          s,
          "。",
        ],
      }),
      VEHICLES.map((a) => {
        const o = (e.vehicles ?? []).includes(a.id);
        return jsxRuntime.jsxs(
          "div",
          {
            className: "flex gap-2.5 rounded-xl border-2 border-[#b3e5fc] bg-[#f5fcff] p-2.5",
            children: [
              jsxRuntime.jsx("div", {
                className: "flex w-[20%] shrink-0 items-center justify-center",
                children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: a.emoji }),
              }),
              jsxRuntime.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "text-sm font-black text-[#01579b]",
                        children: [
                          a.name,
                          jsxRuntime.jsx("span", {
                            className:
                              "ml-1.5 rounded-full bg-[#e1f5fe] px-1.5 py-px text-[9px] font-black text-[#0277bd]",
                            children: a.badge,
                          }),
                        ],
                      }),
                      jsxRuntime.jsx("p", { className: "text-[11px] text-[#4fc3f7]", children: a.desc }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[10px] font-bold text-[#6b4226]",
                        children: ["价格 ¥", a.price, " · 一次性拥有"],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                    children: jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": `btn-buy-transport-${a.id}`,
                      onClick: () => n(a.id),
                      disabled: o || e.coins < a.price,
                      className: "btn-chunky btn-xs btn-blue",
                      children: o ? "已拥有 ✓" : "购买",
                    }),
                  }),
                ],
              }),
            ],
          },
          a.id,
        );
      }),
    ],
  });
}

function VehicleTravelBar({ state: e, onGoMarket: n }) {
  return jsxRuntime.jsxs("div", {
    className: "space-y-1.5",
    children: [
      jsxRuntime.jsx("div", {
        className: "flex flex-wrap gap-1.5",
        children: (e.vehicles ?? []).map((s) => {
          const a = VEHICLES.find((o) => o.id === s);
          return a
            ? jsxRuntime.jsxs(
                "span",
                {
                  className:
                    "rounded-full border-2 border-[#b3e5fc] bg-white px-2 py-0.5 text-[10px] font-black text-[#0277bd]",
                  children: [jsxRuntime.jsx("span", { className: "emoji", children: a.emoji }), " ", a.name],
                },
                s,
              )
            : null;
        }),
      }),
      jsxRuntime.jsxs("div", {
        className: "flex gap-3 rounded-xl border-2 border-[#64b5f6] bg-[#f5fcff] p-2.5",
        children: [
          jsxRuntime.jsx("div", {
            className: "flex w-[20%] shrink-0 items-center justify-center",
            children: jsxRuntime.jsx("span", {
              className: "text-2xl",
              children: jsxRuntime.jsx("span", { className: "emoji", children: "🚌" }),
            }),
          }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("div", {
                children: [
                  jsxRuntime.jsx("p", {
                    className: "text-sm font-black text-[#01579b]",
                    children: "出发去农贸市场",
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[11px] text-[#4fc3f7]",
                    children: ["耗时 ", ic, " 小时 · 到达后选购海鲜水产"],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[10px] font-bold text-[#6b4226]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                      "5 精力 · 路上吃点干粮",
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                children: jsxRuntime.jsxs("button", {
                  type: "button",
                  "data-testid": "btn-go-market",
                  onClick: n,
                  disabled: e.energy < 5 || e.hour + ic > 22,
                  className: "btn-chunky btn-xs btn-blue",
                  children: ["出发 ", jsxRuntime.jsx("span", { className: "emoji", children: "🚌" })],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function CartSummaryBar({ items: e, onCheckout: n }) {
  if (!e || e.length === 0) return null;
  const s = e.reduce((o, l) => o + l.qty, 0),
    a = e.reduce((o, l) => o + l.unitPrice * l.qty, 0);
  return jsxRuntime.jsx("div", {
    className:
      "sticky bottom-2 z-10 mt-2 rounded-xl border-2 border-[#ff8a65] bg-[#fff3e0] p-2 shadow-lg",
    children: jsxRuntime.jsxs("div", {
      className: "flex items-center gap-2",
      children: [
        jsxRuntime.jsxs("p", {
          className: "min-w-0 flex-1 text-[11px] font-black text-[#bf360c]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🧾" }),
            " 购物篮 ",
            s,
            " 件 · ¥",
            a,
            jsxRuntime.jsx("span", {
              className: "block text-[9px] font-bold text-[#a08030]",
              children: "5 件以上免配送费（1-4 件 ¥2/件，次日 8:00 送达）",
            }),
          ],
        }),
        jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": "btn-checkout-basket",
          onClick: () => n(e),
          className: "btn-chunky btn-sm btn-brown shrink-0",
          children: "🧾 结算",
        }),
      ],
    }),
  });
}

function SeafoodMarketSection({ state: e, onCheckout: n }) {
  const [s, a] = React.useState([]),
    o = Object.keys(SEASON_NAME_TABLE)[seasonIndexOf(e.day)];
  return jsxRuntime.jsxs("div", {
    className: "space-y-1.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#4a2c17]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🦞" }),
          " 海鲜摊 · 点「买」进购物篮（市场价，🧾 结算后次日 8:00 送达）",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: INGREDIENTS_LIST
          .filter((l) => l.source === "market")
          .map((l) => {
            const c = l.season === "all" || l.season === o,
              u = e.ingredients[l.id],
              f = (u == null ? void 0 : u.qty) ?? 0;
            return jsxRuntime.jsxs(
              "div",
              {
                className: `flex flex-col rounded-xl bg-[#e1f5fe] px-2 py-1.5 ${c ? "" : "opacity-50"}`,
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-lg", children: l.emoji }),
                      jsxRuntime.jsxs("span", {
                        className: "num text-[11px] font-bold text-[#0277bd]",
                        children: ["x", f],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-0.5 truncate text-sm font-bold text-[#01579b]",
                    children: l.name,
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[10px] font-bold text-[#c62828]",
                    children: [INGREDIENT_CATEGORY_LABELS[l.category] ?? l.category, " · ¥", l.price],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": `btn-market-buy-${l.id}`,
                    "aria-label": `购买${l.name}一份，需要 ${l.price} 元${c ? (e.coins < l.price ? "，金币不足" : "") : "，当前季节无货"}`,
                    onClick: () =>
                      a((g) => {
                        const x = g.find((m) => m.kind === "ingredient" && m.refId === l.id);
                        return x
                          ? g.map((m) => (m === x ? { ...m, qty: m.qty + 1 } : m))
                          : [
                              ...g,
                              {
                                kind: "ingredient",
                                refId: l.id,
                                name: l.name,
                                unitPrice: l.price,
                                qty: 1,
                              },
                            ];
                      }),
                    disabled: !c || e.coins < l.price,
                    className: "btn-chunky btn-xs btn-blue mt-1 w-full",
                    children: "买",
                  }),
                ],
              },
              l.id,
            );
          }),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#e1f5fe] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#0277bd]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 海鲜同河鲜一样会保鲜有限天数，买回来趁新鲜做菜。🧾 结算时海鲜自动转订购配送（满 5 件免配送费）。",
        ],
      }),
      jsxRuntime.jsx(CartSummaryBar, {
        items: s,
        onCheckout: (l) => {
          n(l) && a([]);
        },
      }),
    ],
  });
}

const PLANT_KIND_NAMES = { veggie: "小型蔬菜", fruit: "小型水果", flower: "鲜花", bonsai: "盆景" };

function SeedStockSection({ state: e, commit: n }) {
  const s = e.seeds ?? {},
    a = (o) => {
      n(o.state, o.message, o.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs("div", {
    className: "mt-2 space-y-1.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#4a2c17]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🌱" }),
          " 种子肥料摊 · 阳台种植（二楼阳台用）",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: SEEDS.map((o) => {
          const l = s[o.id] ?? 0;
          return jsxRuntime.jsxs(
            "div",
            {
              className: "rounded-xl bg-[#e8f5e9] px-2 py-1.5",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-lg", children: o.emoji }),
                    jsxRuntime.jsxs("span", {
                      className: "num text-[11px] font-bold text-[#2e7d32]",
                      children: ["x", l],
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-0.5 truncate text-sm font-bold text-[#33691e]",
                  children: o.name,
                }),
                jsxRuntime.jsxs("p", {
                  className: "text-[10px] font-bold text-[#558b2f]",
                  children: [PLANT_KIND_NAMES[o.kind] ?? o.kind, " · ", o.days, " 天 · ¥", o.price],
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": `btn-market-seed-${o.id}`,
                  "aria-label": `购买${o.name}一份，需要 ${o.price} 元${e.coins < o.price ? "，金币不足" : ""}`,
                  onClick: () => a(buySeed(e, o.id)),
                  disabled: e.coins < o.price,
                  className: "btn-chunky btn-xs btn-green mt-1 w-full",
                  children: "买种子",
                }),
              ],
            },
            o.id,
          );
        }),
      }),
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between rounded-xl bg-[#fff8e1] px-2.5 py-2",
        children: [
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-xs font-black text-[#4a2c17]",
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "🌿" }), " 小袋肥料"],
              }),
              jsxRuntime.jsxs("p", {
                className: "text-[10px] font-bold text-[#b08a6a]",
                children: ["施肥加快作物生长（进度 +1），现有 ×", e.fertilizer ?? 0],
              }),
            ],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-market-fertilizer",
            onClick: () => a(buyFertilizer(e)),
            disabled: e.coins < FERTILIZER_PRICE,
            className: "btn-chunky btn-xs btn-yellow shrink-0",
            children: ["¥", FERTILIZER_PRICE, " 买一袋"],
          }),
        ],
      }),
    ],
  });
}

function FishInventorySection({ state: e, onSellFish: n, onOrderFishCatch: s }) {
  const a = Object.entries(e.ingredients)
      .filter(([c, u]) => {
        const f = INGREDIENT_MAP[c];
        return (
          (f == null ? void 0 : f.category) === "fish" &&
          c !== "goldfish" &&
          ((u == null ? void 0 : u.qty) ?? 0) > 0
        );
      })
      .map(([c, u]) => ({ id: c, def: INGREDIENT_MAP[c], qty: u.qty })),
    o = e.fishOrderCooldown ?? 0,
    l = o <= 0 && e.coins >= FISH_ORDER_PRICE;
  return jsxRuntime.jsxs("div", {
    className: "mt-2 space-y-1.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#4a2c17]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🐡" }), " 河鲜摊 · 卖鱼与订购"],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#b3e5fc] bg-[#fbfdf6] px-2.5 py-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[10px] font-bold text-[#0277bd]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "💰" }),
              " 卖鱼：钓到的鱼按纪录尺寸估价（纪录越大越值钱），卖一条耗 1 小时",
            ],
          }),
          a.length === 0
            ? jsxRuntime.jsx("p", {
                className:
                  "mt-1.5 rounded-lg bg-[#e1f5fe] px-2 py-1.5 text-[10px] font-bold text-[#0277bd]",
                children: "背包里还没有鱼，去河边钓几条吧",
              })
            : jsxRuntime.jsx("div", {
                className: "mt-1.5 space-y-1.5",
                children: a.map(({ id: c, def: u, qty: f }) => {
                  const g = Math.min(60, e.fishRecords[c] ?? 0),
                    x = Math.round(u.price * (0.6 + g / 60));
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: "flex gap-2 rounded-xl bg-[#e1f5fe] px-2 py-1.5",
                      children: [
                        jsxRuntime.jsx("div", {
                          className: "flex w-[20%] shrink-0 items-center justify-center",
                          children: jsxRuntime.jsx("span", {
                            className: "emoji text-lg",
                            children: u.emoji,
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
                                    u.name,
                                    " ",
                                    jsxRuntime.jsxs("span", {
                                      className: "text-[10px] font-bold text-[#0277bd]",
                                      children: ["×", f],
                                    }),
                                  ],
                                }),
                                jsxRuntime.jsxs("p", {
                                  className: "text-[10px] font-bold text-[#b08a6a]",
                                  children: ["纪录 ", g, "cm · 单价 ¥", x],
                                }),
                              ],
                            }),
                            jsxRuntime.jsx("div", {
                              className: "mt-1 flex flex-wrap items-center gap-1.5",
                              children: jsxRuntime.jsx("button", {
                                type: "button",
                                "data-testid": `btn-market-sell-fish-${c}`,
                                onClick: () => n(c),
                                className: "btn-chunky btn-xs btn-yellow",
                                children: "卖一条",
                              }),
                            }),
                          ],
                        }),
                      ],
                    },
                    c,
                  );
                }),
              }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "flex gap-2 rounded-xl border-2 border-[#b3e5fc] bg-[#fff8e1] px-2.5 py-2",
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
                  jsxRuntime.jsxs("p", {
                    className: "text-xs font-black text-[#4a2c17]",
                    children: ["订购渔获 · ¥", FISH_ORDER_PRICE, "/网"],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[10px] font-bold text-[#b08a6a]",
                    children: [
                      "次日到货，40% 概率出 40cm+ 大货",
                      o > 0 ? ` · 下次可订：${o} 天后` : " · 现在就能订",
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                children: jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "btn-market-order-fish",
                  onClick: s,
                  disabled: !l,
                  className: "btn-chunky btn-xs btn-blue",
                  children: "订购",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function SeafoodMarketPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#b3e5fc] bg-[#e1f5fe] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#0277bd]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🦐" }),
          " 农贸市场在镇郊，海鲜水产又鲜又全：带鱼、黄花鱼、鱿鱼、蛤蜊、生蚝、扇贝……这里买不到的东西，河边也钓不到；反过来，河鲜只出在河边。去农贸市场必须有公交卡、小三轮或私家车，一趟往返耗 1 小时。",
        ],
      }),
      (n.vehicles ?? []).length === 0
        ? jsxRuntime.jsx(TransportPurchaseHint, { state: n, onBuyTransport: e.onBuyTransport })
        : e.marketGone
          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "btn-leave-market",
                  onClick: () => e.onMarketGone(!1),
                  className: "btn-chunky btn-xs btn-brown",
                  children: "← 返回镇中心",
                }),
                jsxRuntime.jsx(SeafoodMarketSection, {
                  state: n,
                  onCheckout: (s) => {
                    const a = checkoutCart(n, s);
                    return (e.commit(a.state, a.message, a.ok ? "success" : "error"), a.ok);
                  },
                }),
                jsxRuntime.jsx(SeedStockSection, { state: n, commit: e.commit }),
                jsxRuntime.jsx(FishInventorySection, {
                  state: n,
                  onSellFish: e.onSellFish,
                  onOrderFishCatch: e.onOrderFishCatch,
                }),
              ],
            })
          : jsxRuntime.jsx(VehicleTravelBar, { state: n, onGoMarket: e.onGoMarket }),
    ],
  });
}

function VeggieFarmPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#a5d6a7] bg-[#e8f5e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#2e7d32]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🥬" }),
          " 菜摊老板在郊区有片小菜园自种自卖：下地、浇水、看收成，贴摊补摊都是 TA 一手一脚。隔壁水果摊的便宜货，也是自家地里出的。来郊外菜园必须有公交卡、小三轮或私家车，一趟往返耗 1 小时。",
        ],
      }),
      (n.vehicles ?? []).length === 0
        ? jsxRuntime.jsx(TransportPurchaseHint, { state: n, onBuyTransport: e.onBuyTransport, destLabel: "郊外菜园" })
        : e.gardenGone
          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "btn-leave-garden",
                  onClick: () => e.onGardenGone(!1),
                  className: "btn-chunky btn-xs btn-brown",
                  children: "← 返回镇中心",
                }),
                jsxRuntime.jsxs("p", {
                  className:
                    "rounded-xl border-2 border-[#a5d6a7] bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#2e7d32]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🌱" }),
                    " 菜园主人带你下地逛了一圈：菜畦整整齐齐，浇水、松土、摘菜都是 TA 一个人忙活，收成好的时候就往摊上补货，菜价自然便宜。隔壁水果摊的老板也来园子边上进货，说这儿的东西新鲜。",
                  ],
                }),
                e.hereNpcsAt("garden").length > 0 &&
                  jsxRuntime.jsx(NpcGroupStrip, {
                    ctx: e.ctx,
                    npcIds: e.hereNpcsAt("garden"),
                    locId: "garden",
                    badgeText: "🟢 公共场合",
                  }),
              ],
            })
          : jsxRuntime.jsxs("div", {
              className: "space-y-1.5",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex flex-wrap gap-1.5",
                  children: (n.vehicles ?? []).map((s) => {
                    const a = VEHICLES.find((o) => o.id === s);
                    return a
                      ? jsxRuntime.jsxs(
                          "span",
                          {
                            className:
                              "rounded-full border-2 border-[#a5d6a7] bg-white px-2 py-0.5 text-[10px] font-black text-[#2e7d32]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: a.emoji }),
                              " ",
                              a.name,
                            ],
                          },
                          s,
                        )
                      : null;
                  }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "flex gap-3 rounded-xl border-2 border-[#66bb6a] bg-[#f1f8e9] p-2.5",
                  children: [
                    jsxRuntime.jsx("div", {
                      className: "flex w-[20%] shrink-0 items-center justify-center",
                      children: jsxRuntime.jsx("span", {
                        className: "text-2xl",
                        children: jsxRuntime.jsx("span", { className: "emoji", children: "🥬" }),
                      }),
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("p", {
                              className: "text-sm font-black text-[#1b5e20]",
                              children: "出发去郊外菜园",
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[11px] text-[#66bb6a]",
                              children: ["耗时 ", Bo, " 小时 · 到达后下地逛逛"],
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#6b4226]",
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                                "5 精力 · 路上吃点干粮",
                              ],
                            }),
                          ],
                        }),
                        jsxRuntime.jsx("div", {
                          className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                          children: jsxRuntime.jsxs("button", {
                            type: "button",
                            "data-testid": "btn-go-garden",
                            onClick: e.onGoGarden,
                            disabled: n.energy < 5 || n.hour + Bo > 22,
                            className: "btn-chunky btn-xs btn-green",
                            children: ["🌱 下地逛逛（往返 ", Bo, " 小时）"],
                          }),
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

function OrchardPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#ffcc80] bg-[#fff3e0] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#e65100]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🍎" }),
          " 郊区果园自采自卖，隔壁水果摊的水果便宜，就是因为这儿是自家园子，省了中间倒腾的手续。进园看看果树、尝尝刚摘的果子，就知道小镇水果便宜的来头。来郊外果园必须有公交卡、小三轮或私家车，一趟往返耗 1 小时。",
        ],
      }),
      (n.vehicles ?? []).length === 0
        ? jsxRuntime.jsx(TransportPurchaseHint, { state: n, onBuyTransport: e.onBuyTransport, destLabel: "郊外果园" })
        : e.orchardGone
          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "btn-leave-orchard",
                  onClick: () => e.onOrchardGone(!1),
                  className: "btn-chunky btn-xs btn-brown",
                  children: "← 返回镇中心",
                }),
                jsxRuntime.jsxs("p", {
                  className:
                    "rounded-xl border-2 border-[#ffcc80] bg-[#fff8f0] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#e65100]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🍎" }),
                    " 果园里果子挂满枝头，主人让你随便尝。他说水果摊的果子便宜，就是因为这儿自采自卖、不走中间商。你拎着刚摘的果子，心里盘算着明天做蛋糕该用哪种。",
                  ],
                }),
                e.hereNpcsAt("orchard").length > 0 &&
                  jsxRuntime.jsx(NpcGroupStrip, {
                    ctx: e.ctx,
                    npcIds: e.hereNpcsAt("orchard"),
                    locId: "orchard",
                    badgeText: "🟢 公共场合",
                  }),
              ],
            })
          : jsxRuntime.jsxs("div", {
              className: "space-y-1.5",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex flex-wrap gap-1.5",
                  children: (n.vehicles ?? []).map((s) => {
                    const a = VEHICLES.find((o) => o.id === s);
                    return a
                      ? jsxRuntime.jsxs(
                          "span",
                          {
                            className:
                              "rounded-full border-2 border-[#ffcc80] bg-white px-2 py-0.5 text-[10px] font-black text-[#e65100]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: a.emoji }),
                              " ",
                              a.name,
                            ],
                          },
                          s,
                        )
                      : null;
                  }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "flex gap-3 rounded-xl border-2 border-[#ffa726] bg-[#fff8f0] p-2.5",
                  children: [
                    jsxRuntime.jsx("div", {
                      className: "flex w-[20%] shrink-0 items-center justify-center",
                      children: jsxRuntime.jsx("span", {
                        className: "text-2xl",
                        children: jsxRuntime.jsx("span", { className: "emoji", children: "🍎" }),
                      }),
                    }),
                    jsxRuntime.jsxs("div", {
                      className: "min-w-0 flex-1",
                      children: [
                        jsxRuntime.jsxs("div", {
                          children: [
                            jsxRuntime.jsx("p", {
                              className: "text-sm font-black text-[#bf360c]",
                              children: "出发去郊外果园",
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[11px] text-[#ffa726]",
                              children: ["耗时 ", Do, " 小时 · 到达后进园看看"],
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#6b4226]",
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                                "5 精力 · 路上吃点干粮",
                              ],
                            }),
                          ],
                        }),
                        jsxRuntime.jsx("div", {
                          className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                          children: jsxRuntime.jsxs("button", {
                            type: "button",
                            "data-testid": "btn-go-orchard",
                            onClick: e.onGoOrchard,
                            disabled: n.energy < 5 || n.hour + Do > 22,
                            className: "btn-chunky btn-xs btn-orange",
                            children: ["🍎 进园看看（往返 ", Do, " 小时）"],
                          }),
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
