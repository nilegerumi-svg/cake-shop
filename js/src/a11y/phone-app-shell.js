function PhoneMapPage({ ctx: e }) {
  const [n, s] = React.useState(null),
    a = (o) => {
      e.onGoPlace && e.onGoPlace(o);
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "phone-app-bg space-y-2 rounded-2xl p-2",
      children: [
        jsxRuntime.jsxs("p", {
          className:
            "rounded-xl bg-[#e8f5e9] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#2e7d32]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }),
            " 小镇按街道分区：点街道展开子地点，再选要去的地方；选完自动跳回小镇地图。",
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "space-y-1.5",
          children: MAP_DISTRICTS.map((o) => {
            const l = n === o.id,
              c = o.places.map((u) => MAP_PLACES.find((f) => f.id === u)).filter((u) => !!u);
            return jsxRuntime.jsxs(
              "div",
              {
                className: "overflow-hidden rounded-xl border-2 border-[#a5d6a7] bg-[#f7fbf3]",
                children: [
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": `btn-phone-map-street-${o.id}`,
                    "aria-expanded": l,
                    onClick: () => s(l ? null : o.id),
                    className:
                      "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-lg leading-none", children: o.emoji }),
                      jsxRuntime.jsxs("span", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "block truncate text-[11px] font-black text-[#2e7d32]",
                            children: o.name,
                          }),
                          jsxRuntime.jsx("span", {
                            className: "block truncate text-[9px] font-bold text-[#8d9c8d]",
                            children: o.desc,
                          }),
                        ],
                      }),
                      jsxRuntime.jsx("span", {
                        className: "material-icons shrink-0 text-[#b08a6a]",
                        style: { fontSize: 16 },
                        "aria-hidden": "true",
                        children: l ? "expand_less" : "expand_more",
                      }),
                    ],
                  }),
                  l &&
                    jsxRuntime.jsx("div", {
                      className: "space-y-1 border-t-2 border-[#e8f5e9] bg-white/70 p-1.5",
                      children: c.map((u) =>
                        jsxRuntime.jsxs(
                          "button",
                          {
                            type: "button",
                            "data-testid": `btn-phone-map-place-${u.id}`,
                            onClick: () => a(u.id),
                            className: `town-node-${u.id} flex w-full items-center gap-2 rounded-lg border-2 px-2 py-1.5 text-left active:scale-[0.99]`,
                            children: [
                              jsxRuntime.jsx("span", {
                                className: "emoji text-base leading-none",
                                children: u.emoji,
                              }),
                              jsxRuntime.jsxs("span", {
                                className: "min-w-0 flex-1",
                                children: [
                                  jsxRuntime.jsx("span", {
                                    className:
                                      "block truncate text-[10px] font-black text-[#4a2c17]",
                                    children: u.name,
                                  }),
                                  jsxRuntime.jsx("span", {
                                    className: "block truncate text-[8px] font-bold text-[#b08a6a]",
                                    children: u.tag,
                                  }),
                                ],
                              }),
                              jsxRuntime.jsx("span", {
                                className: "material-icons shrink-0 text-[#b08a6a]",
                                style: { fontSize: 14 },
                                "aria-hidden": "true",
                                children: "chevron_right",
                              }),
                            ],
                          },
                          u.id,
                        ),
                      ),
                    }),
                ],
              },
              o.id,
            );
          }),
        }),
      ],
    }),
  );
}

function AchievementsPage({ ctx: e }) {
  const [n, s] = React.useState("achieve"),
    [a, o] = React.useState("all"),
    { state: l, commit: c } = e,
    u = ALL_ACHIEVEMENTS.filter((x) => l.achievements[x.id] !== void 0).length,
    f = countCompletedMilestones(l),
    g = (x, m, p) => {
      c(x, `${m}（${formatRewards(p)}）`, "success");
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "phone-app-bg space-y-2 rounded-2xl p-2",
      children: [
        jsxRuntime.jsx("section", {
          className: "rounded-2xl border-2 border-[#ffc53d] bg-[#fff8e1] px-2.5 py-2",
          children: jsxRuntime.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [
              jsxRuntime.jsxs("div", {
                className: "min-w-0",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "font-black text-[#4a2c17]",
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎯" }), " 人生目标"],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "mt-0.5 text-[10px] font-bold text-[#b08a6a]",
                    children: [
                      "已解锁 ",
                      jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: u }),
                      " / ",
                      ALL_ACHIEVEMENTS.length,
                      " 项成就",
                    ],
                  }),
                ],
              }),
              f > 0 &&
                jsxRuntime.jsxs("span", {
                  "data-testid": "phone-goal-badge",
                  "aria-label": `${f} 项里程碑奖励待领取`,
                  className:
                    "flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-[#e5484d] px-1.5 text-[11px] font-black text-white",
                  children: ["🎁 ", f],
                }),
            ],
          }),
        }),
        jsxRuntime.jsxs("div", {
          className: "flex gap-2",
          children: [
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-phone-goal-view-achieve",
              onClick: () => s("achieve"),
              className: `flex flex-1 items-center justify-center whitespace-nowrap rounded-xl border-2 px-2 py-1.5 text-[10px] font-black ${n === "achieve" ? "border-[#ff6b81] bg-[#ffe9ef]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
              style: { color: n === "achieve" ? "#e04a63" : "#8a6a4a" },
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏛️" }), " 成就殿堂"],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-phone-goal-view-milestone",
              onClick: () => s("milestone"),
              className: `relative flex flex-1 items-center justify-center whitespace-nowrap rounded-xl border-2 px-2 py-1.5 text-[10px] font-black ${n === "milestone" ? "border-[#ffc53d] bg-[#fff8e1]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
              style: { color: n === "milestone" ? "#8a6100" : "#8a6a4a" },
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
                " 里程碑奖励",
                f > 0 &&
                  jsxRuntime.jsx("span", {
                    "data-testid": "phone-goal-milestone-badge",
                    "aria-label": `${f} 项待领取`,
                    className:
                      "absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[9px] font-black text-white",
                    children: f,
                  }),
              ],
            }),
          ],
        }),
        n === "milestone"
          ? jsxRuntime.jsx(MilestonePanel, { state: l, onClaimed: g })
          : jsxRuntime.jsx(AchievementList, { state: l, filter: a, onFilter: o }),
      ],
    }),
  );
}

function ShopOrderPage({ ctx: e }) {
  const { state: n, commit: s } = e,
    [a, o] = React.useState("order"),
    [l, c] = React.useState({}),
    u = (y) => l[y] ?? 1,
    f = (y, j) => {
      const v = Math.max(1, Math.min(9, j));
      c((w) => ({ ...w, [y]: v }));
    },
    g = getPendingDeliveries(n),
    x = Array.isArray(n.deliveryOrders) ? n.deliveryOrders : [],
    m = (y) => {
      const j = orderFoodDelivery(n, y, u(y));
      (s(j.state, j.message, j.ok ? "success" : "error"), j.ok && c((v) => ({ ...v, [y]: 1 })));
    },
    p = (y) => {
      const j = shipDeliveryOrder(n, y);
      s(j.state, j.message, j.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex gap-1 rounded-xl bg-[#e3f2fd] p-1",
        children: [
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-delivery-tab-order",
            onClick: () => o("order"),
            className: `btn-chunky btn-xs flex-1 ${a === "order" ? "btn-blue" : "btn-ghost"}`,
            children: "🛵 订别人的",
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-delivery-tab-mine",
            onClick: () => o("mine"),
            className: `btn-chunky btn-xs flex-1 ${a === "mine" ? "btn-blue" : "btn-ghost"}`,
            children: "🏠 我的店",
          }),
        ],
      }),
      a === "order"
        ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsxs("p", {
                className:
                  "rounded-xl bg-[#e8f5e9] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#2e7d32]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🛵" }),
                  " 小镇外卖平台：满 ¥",
                  FREE_DELIVERY_THRESHOLD,
                  " 免配送费，否则配送费 ¥",
                  DELIVERY_FEE,
                  "，明天 8:00 送到店里。",
                ],
              }),
              DELIVERY_SHOPS.map((y) =>
                jsxRuntime.jsxs(
                  "div",
                  {
                    className: "rounded-xl border-2 border-[#90caf9] bg-[#f4f9ff] p-2",
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "text-xs font-black text-[#0d47a1]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: y.emoji }),
                          " ",
                          y.name,
                          jsxRuntime.jsx("span", {
                            className: "block text-[9px] font-bold text-[#64a3d8]",
                            children: y.desc,
                          }),
                        ],
                      }),
                      jsxRuntime.jsx("div", {
                        className: "mt-1.5 space-y-1.5",
                        children: y.items.map((j) => {
                          const v = u(j.id),
                            w = j.price * v,
                            N = w >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE,
                            S = w + N;
                          return jsxRuntime.jsxs(
                            "div",
                            {
                              className: "rounded-lg bg-white px-2 py-1.5",
                              children: [
                                jsxRuntime.jsxs("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    jsxRuntime.jsx("span", {
                                      className: "emoji text-base",
                                      children: j.emoji,
                                    }),
                                    jsxRuntime.jsxs("div", {
                                      className: "min-w-0 flex-1",
                                      children: [
                                        jsxRuntime.jsxs("p", {
                                          className: "text-[10px] font-black text-[#4a2c17]",
                                          children: [
                                            j.name,
                                            " · ",
                                            jsxRuntime.jsxs("span", {
                                              className: "num",
                                              children: ["¥", j.price],
                                            }),
                                          ],
                                        }),
                                        jsxRuntime.jsx("p", {
                                          className: "text-[8px] font-bold text-[#b08a6a]",
                                          children: j.desc,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                                jsxRuntime.jsxs("div", {
                                  className: "mt-1 flex items-center justify-between gap-2",
                                  children: [
                                    jsxRuntime.jsxs("div", {
                                      className: "flex items-center gap-1",
                                      children: [
                                        jsxRuntime.jsx("button", {
                                          type: "button",
                                          "data-testid": `btn-delivery-minus-${j.id}`,
                                          onClick: () => f(j.id, v - 1),
                                          disabled: v <= 1,
                                          className: "btn-chunky btn-xs btn-blue",
                                          children: "−",
                                        }),
                                        jsxRuntime.jsx("span", {
                                          className:
                                            "num w-5 text-center text-[11px] font-black text-[#0d47a1]",
                                          children: v,
                                        }),
                                        jsxRuntime.jsx("button", {
                                          type: "button",
                                          "data-testid": `btn-delivery-plus-${j.id}`,
                                          onClick: () => f(j.id, v + 1),
                                          disabled: v >= 9,
                                          className: "btn-chunky btn-xs btn-blue",
                                          children: "+",
                                        }),
                                      ],
                                    }),
                                    jsxRuntime.jsxs("p", {
                                      className: "text-[10px] font-bold text-[#bf360c]",
                                      children: [
                                        "小计 ",
                                        jsxRuntime.jsxs("span", { className: "num", children: ["¥", w] }),
                                      ],
                                    }),
                                    jsxRuntime.jsx("button", {
                                      type: "button",
                                      "data-testid": `btn-delivery-order-${j.id}`,
                                      onClick: () => m(j.id),
                                      className: "btn-chunky btn-xs btn-orange shrink-0",
                                      children: "下单",
                                    }),
                                  ],
                                }),
                                jsxRuntime.jsxs("p", {
                                  className:
                                    "mt-0.5 text-right text-[8px] font-bold text-[#a08030]",
                                  children: [
                                    "合计 ",
                                    jsxRuntime.jsxs("span", { className: "num", children: ["¥", S] }),
                                    "（",
                                    N === 0 ? "满 ¥30 免配送费" : `配送费 ¥${N}`,
                                    "）",
                                  ],
                                }),
                              ],
                            },
                            j.id,
                          );
                        }),
                      }),
                    ],
                  },
                  y.id,
                ),
              ),
              jsxRuntime.jsxs("div", {
                className: "rounded-xl border-2 border-dashed border-[#b39ddb] bg-[#f3edf9] p-2",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "text-xs font-black text-[#4a148c]",
                    children: ["📦 待送达", g.length > 0 ? `（${g.length} 单）` : ""],
                  }),
                  g.length === 0
                    ? jsxRuntime.jsx("p", {
                        className: "mt-1 text-[10px] font-bold text-[#7b1fa2]",
                        children: "没有在途外卖，下单后明天 8:00 送到店里",
                      })
                    : jsxRuntime.jsx("div", {
                        className: "mt-1.5 space-y-1",
                        children: g.map((y) =>
                          jsxRuntime.jsxs(
                            "p",
                            {
                              className: "text-[10px] font-bold text-[#6a1b9a]",
                              children: [
                                y.shopEmoji,
                                " ",
                                y.shopName,
                                "：",
                                y.items.map((j) => `${j.emoji} ${j.name}×${j.qty}`).join("、"),
                                " 合计 ",
                                jsxRuntime.jsxs("span", { className: "num", children: ["¥", y.total] }),
                                " · 明天 8:00 送达",
                              ],
                            },
                            y.id,
                          ),
                        ),
                      }),
                ],
              }),
            ],
          })
        : jsxRuntime.jsxs("div", {
            className: "rounded-xl border-2 border-[#ffcc80] bg-[#fffaf3] p-2",
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-xs font-black text-[#6b4226]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }),
                  " 我的店 · 今日外卖单",
                  x.length > 0 ? `（${x.length} 单）` : "",
                ],
              }),
              x.length === 0
                ? jsxRuntime.jsx("p", {
                    className: "mt-1 text-[10px] font-bold text-[#b08a6a]",
                    children: "今天还没有外卖订单，明天早上会来新单",
                  })
                : jsxRuntime.jsx("div", {
                    className: "mt-1.5 space-y-1.5",
                    children: x.map((y) => {
                      var j;
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
                                    y.npcEmoji,
                                    " ",
                                    y.npcName,
                                    " 订「",
                                    ((j = RECIPE_RUNTIME_DATA[y.recipeId]) == null ? void 0 : j.name) ?? y.recipeId,
                                    "」",
                                    jsxRuntime.jsxs("span", { className: "num", children: ["×", y.qty] }),
                                  ],
                                }),
                                jsxRuntime.jsxs("p", {
                                  className: "text-[9px] font-bold text-[#b08a6a]",
                                  children: [
                                    "第 ",
                                    y.day,
                                    " 天下单 · ",
                                    jsxRuntime.jsxs("span", { className: "num", children: ["¥", y.price] }),
                                  ],
                                }),
                              ],
                            }),
                            jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": `btn-delivery-fulfill-${y.id}`,
                              onClick: () => p(y.id),
                              className: "btn-chunky btn-xs btn-green shrink-0",
                              children: "备货发货",
                            }),
                          ],
                        },
                        y.id,
                      );
                    }),
                  }),
            ],
          }),
    ],
  });
}

function PhoneAppDialog({ open: e, state: n, commit: s, onClose: a, onGoPlace: o }) {
  const [l, c] = React.useState(null);
  React.useEffect(() => {
    e && c(null);
  }, [e]);
  const u = PHONE_TABS.find((m) => m.id === l),
    f = countCompletedMilestones(n);
  let g = null;
  const x = () => c(null);
  return (
    l === "chat"
      ? (g = jsxRuntime.jsx(PhonePage, { ctx: { state: n, commit: s, onBack: x } }))
      : l === "shop"
        ? (g = jsxRuntime.jsx(NameRosterPage, { ctx: { state: n, commit: s, onBack: x } }))
        : l === "web"
          ? (g = jsxRuntime.jsx(RecipeBookPanel, { ctx: { state: n, commit: s, onBack: x } }))
          : l === "time"
            ? (g = jsxRuntime.jsx(CalendarPanel, { ctx: { state: n, commit: s, onBack: x } }))
            : l === "memo"
              ? (g = jsxRuntime.jsx(NpcRosterPanel, { ctx: { state: n, commit: s, onBack: x } }))
              : l === "gov"
                ? (g = jsxRuntime.jsx(ApplicationFormPanel, { ctx: { state: n, commit: s, onBack: x } }))
                : l === "map"
                  ? (g = jsxRuntime.jsx(PhoneMapPage, { ctx: { state: n, commit: s, onBack: x, onGoPlace: o } }))
                  : l === "goal"
                    ? (g = jsxRuntime.jsx(AchievementsPage, { ctx: { state: n, commit: s, onBack: x } }))
                    : l === "delivery" &&
                      (g = jsxRuntime.jsx(ShopOrderPage, { ctx: { state: n, commit: s, onBack: x } })),
    renderWithSpeech(
      jsxRuntime.jsx(Modal, {
        open: e,
        title: u ? `${u.emoji} ${u.name}` : "📱 手机",
        onClose: a,
        sheetClass: "modal-sheet-phone",
        children: jsxRuntime.jsx("div", {
          className: "phone-app-bg space-y-2 rounded-2xl p-2",
          children: l
            ? jsxRuntime.jsxs("div", {
                className: "space-y-2",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-phone-back-desktop",
                        onClick: () => c(null),
                        className:
                          "btn-chunky btn-xs btn-gray flex min-h-9 shrink-0 items-center px-2.5 !text-[#8b5a2b]",
                        children: "← 返回桌面",
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "min-w-0 flex-1 truncate text-[11px] font-black text-[#4a2c17]",
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "emoji",
                            children: u == null ? void 0 : u.emoji,
                          }),
                          " ",
                          u == null ? void 0 : u.name,
                          jsxRuntime.jsx("span", {
                            className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                            children: u == null ? void 0 : u.desc,
                          }),
                        ],
                      }),
                    ],
                  }),
                  g,
                ],
              })
            : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  jsxRuntime.jsxs("p", {
                    className:
                      "rounded-xl bg-[#e3f2fd] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#0d47a1]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "📱" }),
                      " 手机桌面：通讯、购物、上网、时间、备忘录、在线政务、手机地图、人生目标、外卖都在这里；带不下的货会自动转订购，满 5 件免配送费。",
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "grid grid-cols-3 gap-2",
                    children: PHONE_TABS.map((m) =>
                      jsxRuntime.jsxs(
                        "button",
                        {
                          type: "button",
                          "data-testid": m.testId,
                          onClick: () => c(m.id),
                          className:
                            "relative flex flex-col items-center gap-0.5 rounded-2xl border-2 border-[#e8d9c3] bg-[#fffaf3] px-1 py-2.5 shadow-sm active:scale-95",
                          children: [
                            jsxRuntime.jsx("span", {
                              className: "emoji text-2xl leading-none",
                              children: m.emoji,
                            }),
                            jsxRuntime.jsx("span", {
                              className: "text-[10px] font-black text-[#4a2c17]",
                              children: m.name,
                            }),
                            jsxRuntime.jsx("span", {
                              className:
                                "text-center text-[8px] font-bold leading-tight text-[#b08a6a]",
                              children: m.desc,
                            }),
                            m.id === "goal" &&
                              f > 0 &&
                              jsxRuntime.jsx("span", {
                                "data-testid": "phone-goal-badge",
                                "aria-label": `${f} 项里程碑奖励待领取`,
                                className:
                                  "absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[10px] font-black text-white",
                                children: f,
                              }),
                          ],
                        },
                        m.id,
                      ),
                    ),
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-center text-[9px] font-bold text-[#b08a6a]",
                    children:
                      "送礼物前记得先装到身上；镇内买的东西装不下会自动转订购，次日 8:00 送到店里。",
                  }),
                ],
              }),
        }),
      }),
    )
  );
}

function BagDialog({ open: e, state: n, commit: s, onClose: a }) {
  const o = countCarried(n),
    l = carryCapacity(n),
    c = n.hasBag ? 10 : 2,
    u = (g) => {
      s(g.state, g.message, g.ok ? "success" : "error");
    },
    f = (g) => {
      var x, m;
      return g.kind === "flower"
        ? "💐"
        : g.kind === "fish"
          ? "🐟"
          : g.kind === "deco"
            ? (((x = FURNITURE_MAP[g.refId]) == null ? void 0 : x.emoji) ?? "🪑")
            : (((m = RECIPE_RUNTIME_DATA[g.refId]) == null ? void 0 : m.emoji) ?? "🍰");
    };
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "🎒 随身物品",
      onClose: a,
      sheetClass: "modal-sheet-green",
      children: jsxRuntime.jsxs("div", {
        className: "space-y-3",
        "data-testid": "carry-modal",
        children: [
          jsxRuntime.jsxs("p", {
            className:
              "rounded-xl border-2 border-[#ffc53d] bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🎒" }),
              " ",
              n.hasBag
                ? `帆布背包已就位（上限 10 件，当前 ${o}/${l}）`
                : `徒手最多带 2 件（当前 ${o}/${l}），杂货铺有帆布背包卖`,
              n.hasFoodBox ? "；保温食盒在身（料理 ≤4）" : "",
              n.hasFishBucket ? "；活鱼桶在身（活鱼 ≤5）" : "",
            ],
          }),
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsxs("p", {
                className: "mb-1.5 text-xs font-black text-[#4a2c17]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🧳" }),
                  " 携带格（",
                  o,
                  "/",
                  c,
                  "）",
                ],
              }),
              jsxRuntime.jsx("div", {
                className: `grid gap-1.5 ${n.hasBag ? "grid-cols-5" : "grid-cols-2"}`,
                children: Array.from({ length: c }).map((g, x) => {
                  const m = (n.carried ?? [])[x];
                  return jsxRuntime.jsx(
                    "div",
                    {
                      "data-testid": `carry-slot-${x}`,
                      className: `flex min-h-[64px] flex-col items-center justify-center gap-0.5 rounded-xl border-2 px-1 py-1.5 text-center ${m ? "border-[#c8e6c9] bg-[#f1f8e9]" : "border-[#e8e8e8] bg-[#f0f0f0]"}`,
                      children: m
                        ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                            children: [
                              jsxRuntime.jsx("span", {
                                className: "emoji text-lg leading-none",
                                children: f(m),
                              }),
                              jsxRuntime.jsx("span", {
                                className:
                                  "w-full truncate text-[9px] font-black leading-tight text-[#4a2c17]",
                                children: m.name,
                              }),
                              jsxRuntime.jsxs("span", {
                                className: "text-[9px] font-black leading-tight text-[#b8860b]",
                                children: ["×", m.qty],
                              }),
                            ],
                          })
                        : jsxRuntime.jsx("span", {
                            className: "text-[10px] font-bold text-[#c9c9c9]",
                            children: "空",
                          }),
                    },
                    x,
                  );
                }),
              }),
            ],
          }),
          (n.carried ?? []).length > 0 &&
            jsxRuntime.jsxs("div", {
              className: "rounded-xl border-2 border-[#c8e6c9] bg-[#f7fbf3] p-2",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "mb-1.5 text-xs font-black text-[#2e7d32]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "📤" }),
                    " 已携带物品（点击放回）",
                  ],
                }),
                jsxRuntime.jsx("div", {
                  className: "space-y-1",
                  children: (n.carried ?? []).map((g) => {
                    const x = g.quality ? QUALITY_META[g.quality] : null;
                    return jsxRuntime.jsxs(
                      "div",
                      {
                        className: "flex gap-2 rounded-lg bg-white px-2 py-1",
                        children: [
                          jsxRuntime.jsx("div", {
                            className: "flex w-[20%] shrink-0 items-center justify-center",
                            children: jsxRuntime.jsx("span", {
                              className: "emoji text-base",
                              children: f(g),
                            }),
                          }),
                          jsxRuntime.jsxs("div", {
                            className: "min-w-0 flex-1",
                            children: [
                              jsxRuntime.jsx("div", {
                                children: jsxRuntime.jsxs("span", {
                                  className: "text-[10px] font-bold text-[#4a2c17]",
                                  children: [
                                    g.name,
                                    " ×",
                                    g.qty,
                                    x
                                      ? jsxRuntime.jsx("span", {
                                          className: "ml-1 text-[8px] text-[#b08a6a]",
                                          children: x.label,
                                        })
                                      : null,
                                  ],
                                }),
                              }),
                              jsxRuntime.jsx("div", {
                                className: "mt-1 flex flex-wrap items-center gap-1.5",
                                children: jsxRuntime.jsx("button", {
                                  type: "button",
                                  "data-testid": `btn-carry-uncarry-${g.id}`,
                                  onClick: () => u(unpackCarriedItem(n, g.id)),
                                  className: "btn-chunky btn-xs btn-yellow",
                                  children: "放回",
                                }),
                              }),
                            ],
                          }),
                        ],
                      },
                      g.id,
                    );
                  }),
                }),
              ],
            }),
          jsxRuntime.jsx("p", {
            className: "text-center text-[9px] font-bold text-[#b08a6a]",
            children:
              "送礼物前记得先装到身上；镇内买的东西装不下会自动转订购，次日 8:00 送到店里。",
          }),
        ],
      }),
    }),
  );
}

function RestartDialog({ open: e, onClose: n, onConfirm: s }) {
  return jsxRuntime.jsxs(Modal, {
    open: e,
    title: "🔄 重新启动游戏",
    onClose: n,
    children: [
      jsxRuntime.jsxs("div", {
        className: "space-y-2",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-center text-sm font-bold text-[#4a2c17]",
            children:
              "重新启动会清除当前所有存档进度，包括金币、食谱、家具与成就，确定要重新开始吗？",
          }),
          jsxRuntime.jsx("p", {
            className: "text-center text-xs font-bold text-[#b08a6a]",
            children: "此操作无法撤销",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-4 flex justify-center gap-2",
        children: [
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-restart-cancel",
            onClick: n,
            className: "btn-chunky btn-ghost",
            children: "再想想",
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-restart-confirm",
            onClick: s,
            className: "btn-chunky btn-pink",
            children: "确认重新开始",
          }),
        ],
      }),
    ],
  });
}

function AchievementUnlockDialog({ ach: e, onClose: n }) {
  return jsxRuntime.jsxs(Modal, {
    open: e !== null && e.length > 0,
    title: "🏆 成就解锁！",
    onClose: n,
    children: [
      jsxRuntime.jsx("div", {
        className: "space-y-2",
        children: (e ?? []).map((s, a) =>
          jsxRuntime.jsxs(
            "div",
            {
              className: "rounded-2xl bg-[#fff3bf] p-3",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-center text-base font-black text-[#b8860b]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
                    " ",
                    s.emoji,
                    " ",
                    s.name,
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-1 text-center text-xs font-bold text-[#8a6a4a]",
                  children: s.desc,
                }),
              ],
            },
            `${s.id}-${a}`,
          ),
        ),
      }),
      jsxRuntime.jsx("div", {
        className: "mt-4 flex justify-center",
        children: jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": "modal-close",
          "aria-label": "关闭成就提示",
          onClick: n,
          className: "btn-chunky btn-pink",
          children: "太棒了！",
        }),
      }),
    ],
  });
}

const FEMALE_NAME_POOL = [
    "林小雨",
    "苏小满",
    "夏暖暖",
    "江晚晴",
    "顾甜甜",
    "叶知秋",
    "沈星晚",
    "陈圆圆",
    "白露",
    "周栀",
    "许桃桃",
    "唐果果",
    "宋绵绵",
    "温小暖",
    "安晴",
    "许诺",
    "乔安",
    "田心",
    "阮糖",
    "米粒",
  ],
  MALE_NAME_POOL = [
    "林一凡",
    "苏子墨",
    "夏远",
    "江一帆",
    "顾言",
    "叶青",
    "沈亦舟",
    "陈默",
    "白屿",
    "周野",
    "许知行",
    "唐磊",
    "宋屿",
    "温言",
    "安城",
    "许明远",
    "乔野",
    "田昊",
    "阮清",
    "米航",
  ],
  SHOP_NAME_POOL = [
    "街角甜品屋",
    "蜜语蛋糕坊",
    "甜心小屋",
    "云朵烘焙",
    "糖霜物语",
    "奶油森林",
    "莓果时光",
    "暖阳烘焙",
    "小满甜品",
    "蜜糖工坊",
    "月亮点心铺",
    "樱语蛋糕店",
    "麦香小屋",
    "甜橙烘焙",
    "星星甜品店",
    "云上蛋糕房",
    "蜜桃烘焙屋",
    "糖心作坊",
    "花见甜品",
    "暖手烘焙",
  ],
  pickRandomEntry = (e) => e[Math.floor(Math.random() * e.length)];

function GameApp() {
  const [e, n] = React.useState("loading"),
    [s, a] = React.useState(null),
    [o, l] = React.useState(() => getCurrentSlot()),
    [c, u] = React.useState("home"),
    [f, g] = React.useState({ token: 0, module: "store" }),
    [x, m] = React.useState(null),
    [p, y] = React.useState("林小雨"),
    [j, v] = React.useState("街角甜品屋"),
    [w, N] = React.useState("female"),
    [S, C] = React.useState("25"),
    [sN, tN] = React.useState("spring"),
    [V, E] = React.useState(!1),
    [F, J] = React.useState(!1),
    [H, R] = React.useState(!1),
    [se, be] = React.useState(null),
    [Ie, xe] = React.useState(!1),
    [ye, P] = React.useState(!1),
    [handbookOpen, setHandbookOpen] = React.useState(!1),
    [settingsOpen, setSettingsOpen] = React.useState(!1),
    [guideOpen, setGuideOpen] = React.useState(!1),
    [inventoryOpen, setInventoryOpen] = React.useState(!1),
    /* 翻盖外屏（compact 档）顶栏被强制收起、TopBarToolRow 整行不渲染，
       手册 / 设置 / 引导 / 库存改由 js/host/compact-entry.js 注入的常驻浮动入口
       通过本 API 打开。setter 引用稳定，逐帧重新赋值无副作用。 */
    [__compactDialogApi] = React.useState(() => {
      window.__cakeOpenDialog = (name) => {
        if (name === "handbook") setHandbookOpen(!0);
        else if (name === "settings") setSettingsOpen(!0);
        else if (name === "guide") setGuideOpen(!0);
        else if (name === "inventory") setInventoryOpen(!0);
      };
      return !0;
    }),
    [ne, D] = React.useState(null),
    {
      blindMode: O,
      setBlindMode: K,
      blindAsk: Y,
      dismissBlindAsk: I,
      enableBlind: U,
      replayBlindAsk: fe,
    } = useBlindModeAsk(e),
    [ve, Ae] = React.useState(() => readVoiceSettings().autoSpeakDay),
    [Ne, Te] = React.useState(() => readVoiceSettings().voiceCommand),
    [Se, Oe] = React.useState(!1),
    [nt, Yt] = React.useState(() => readQuickFavorites()),
    [he, Ye] = React.useState(""),
    Pe = React.useRef("");
  Pe.current = he;
  const [Ss, us] = React.useState(""),
    [As, pe] = React.useState(170),
    { night: nn, toggleNight: de } = useBlindMode(),
    Ke = React.useRef(null),
    za = React.useRef(Y);
  ((za.current = Y),
    React.useEffect(() => setupSystemA11ySync(), []),
    React.useEffect(() => observeCardDepths(document), []),
    React.useEffect(() => {
      const te = () => startBackgroundMusic();
      return (
        window.addEventListener("pointerdown", te),
        window.addEventListener("keydown", te),
        () => {
          (window.removeEventListener("pointerdown", te),
            window.removeEventListener("keydown", te));
        }
      );
    }, []),
    React.useEffect(() => {
      bindAudioVisibilityHandlers();
    }, []),
    React.useEffect(() => {
      const te = (qe) => {
        const Ce = qe.target;
        if (
          !(Ce instanceof HTMLInputElement) &&
          !(Ce instanceof HTMLTextAreaElement) &&
          !(Ce instanceof HTMLSelectElement)
        )
          return;
        const ot = Ce,
          xn = ot.getBoundingClientRect(),
          Ya = window.innerHeight || document.documentElement.clientHeight;
        if (xn.top < 0 || xn.bottom > Ya)
          try {
            ot.scrollIntoView({ block: "center" });
          } catch {}
      };
      return (
        document.addEventListener("focusin", te),
        () => document.removeEventListener("focusin", te)
      );
    }, []),
    React.useEffect(() => {
      const te = (qe) => {
        qe.touches.length > 1 && qe.preventDefault();
      };
      return (
        document.addEventListener("touchmove", te, { passive: !1 }),
        () => document.removeEventListener("touchmove", te)
      );
    }, []),
    React.useEffect(() => {
      if (e !== "playing") return;
      const te = () => {
        const Ya = document.querySelector(".top-bar"),
          Ar = document.querySelector(".tab-bar"),
          Dn = Ya ? Ya.getBoundingClientRect().height : 0,
          Hi = Ar ? Ar.getBoundingClientRect().height : 0;
        Dn > 0 && Hi > 0 && pe(Math.ceil(Dn + Hi));
      };
      te();
      const qe = new ResizeObserver(te),
        Ce = document.querySelector(".top-bar"),
        ot = document.querySelector(".tab-bar");
      (Ce && qe.observe(Ce), ot && qe.observe(ot), window.addEventListener("resize", te));
      const xn = window.setTimeout(te, 350);
      return () => {
        (qe.disconnect(), window.removeEventListener("resize", te), window.clearTimeout(xn));
      };
    }, [e]));
  const yr = s ? FONT_SCALE_MAP[s.fontScale ?? "mediumSmall"] : 1;
  (useFontScale(O, yr),
    React.useEffect(() => {
      let te = !0;
      return (
        (async () => {
          let qe = null;
          try {
            qe = await loadCurrentSaveMeta();
          } catch {
            qe = null;
          }
          if (te)
            if (qe)
              try {
                const Ce = chargeTruckMonthlyFee(qe);
                (a(
                    window.Cake && window.Cake.mainStoryApi
                      ? window.Cake.mainStoryApi.seedHandbook(Ce.state)
                      : Ce.state,
                  ),
                  n("playing"),
                  Ce.message && m({ id: Date.now(), text: Ce.message, kind: "info" }));
              } catch {
                if (!te) return;
                (n("title"),
                  m({ id: Date.now(), text: "存档读取失败，已为你打开新游戏入口", kind: "error" }));
              }
            else n("title");
        })(),
        () => {
          te = !1;
        }
      );
    }, []));
  const Tn = React.useCallback(
    (te, qe = "info", Ce = !0) => {
      (Ke.current && window.clearTimeout(Ke.current),
        m({ id: Date.now(), text: te, kind: qe }),
        Ce && O && announce(te));
    },
    [O],
  );
  React.useEffect(() => {
    if (!x) {
      us("");
      return;
    }
    (us(x.text), announceA11y(x.text));
  }, [x]);
  const jr = React.useCallback((te) => {
      (setCurrentSlot(te), l(te));
    }, []),
    kr = React.useCallback(
      async (te) => {
        try {
          const qe = await loadSaveMetaBySlot(te);
          if (!qe) return !1;
          (setCurrentSlot(te), l(te));
          const Ce = chargeTruckMonthlyFee(qe);
          return (
            a(Ce.state),
            Ce.message ? Tn(Ce.message, "info") : Tn(`已读取档位 ${te}`, "success"),
            !0
          );
        } catch {
          return (Tn("档位读取失败，请稍后再试", "error"), !1);
        }
      },
      [Tn],
    ),
    {
      commit: On,
      saving: Pa,
      setSaving: vr,
      newAch: Fn,
      closeAch: Ln,
    } = useGameCommit({ game: s, blindMode: O, showToast: Tn, setGame: a });
  React.useEffect(() => {
    const te = (qe) => {
      if (qe.key !== "Escape") return;
      const Ce = document.getElementById("global-modal-root"),
        ot = Ce ? Array.from(Ce.querySelectorAll('[data-testid="modal-close"]')) : [],
        xn = ot[ot.length - 1];
      if (xn) {
        xn.click();
        return;
      }
      if (Se) {
        Oe(!1);
        return;
      }
      if (Ie) {
        xe(!1);
        return;
      }
      if (ye) {
        P(!1);
        return;
      }
      if (V) {
        E(!1);
        return;
      }
      if (H) {
        R(!1);
        return;
      }
      if (F) {
        J(!1);
        return;
      }
      Fn && Fn.length > 0 && Ln();
    };
    return (
      window.addEventListener("keydown", te),
      () => window.removeEventListener("keydown", te)
    );
  }, [Se, Ie, ye, V, H, F, Fn, Ln]);
  const { blindPlayedAnnounced: nd } = useBlindAnnounce({
      game: s,
      phase: e,
      tab: c,
      blindMode: O,
      playerName: p,
      shopName: j,
      setPlayerName: y,
      setShopName: v,
    }),
    {
      handleStart: Gi,
      handleNextDay: Ui,
      handleSleepOvernight: Xi,
      handleManualSave: Nr,
      handleRestart: zi,
      handleEmployeeSell: Pi,
    } = useGameActions({
      game: s,
      blindMode: O,
      autoSpeakDay: ve,
      playerName: p,
      shopName: j,
      gender: w,
      age: S,
      season: sN,
      showToast: Tn,
      commit: On,
      setGame: a,
      setTab: u,
      setPhase: n,
      setSaving: vr,
      closeAch: Ln,
      blindPlayedAnnounced: nd,
    }),
    Yi = React.useCallback(() => {
      (stopSpeech(), setBlindModeEnabled(!1), K(!1), I());
    }, [I, K]),
    Qi = React.useCallback(() => {
      const te = Gi();
      return (te && D(INTRO_TIPS[0]), te);
    }, [Gi]),
    fa = React.useCallback(() => {
      (J(!0), O ? (vibrateShort(), announce("已打开手机")) : (us("已打开手机"), announceA11y("已打开手机")));
    }, [O]),
    gn = React.useCallback(
      (te, qe) => {
        if (te === "fate") {
          fa();
          return;
        }
        (te === "bake"
          ? ((te = "home"), (qe = qe ?? "kitchen"))
          : te === "shop" && ((te = "home"), (qe = qe ?? "store")),
          u(te),
          te === "home" && g((ot) => ({ token: ot.token + 1, module: qe ?? ot.module })));
        const Ce = TAB_DISPLAY_NAMES[te] ?? "";
        O ? (vibrateShort(), announce(`已切换到${Ce}页面`)) : (us(`已切换到${Ce}页面`), announceA11y(`已切换到${Ce}页面`));
      },
      [O, fa],
    );
  React.useEffect(() => {
    const te = (qe) => {
      const Ce = qe.data;
      Ce &&
        (Ce.type === "frame:pointerdown" && za.current && I(),
        Ce.type === "flash-app-bridge" &&
          Ce.kind === "modal:open" &&
          typeof Ce.text == "string" &&
          Ye(Ce.text));
    };
    return (
      window.addEventListener("message", te),
      () => window.removeEventListener("message", te)
    );
  }, [I]);
  const Es = React.useCallback(() => {
      const te = Pe.current;
      announce(te ? `最近打开的弹窗：${te}` : "当前还没有打开过弹窗。");
    }, []),
    wr = React.useCallback((te) => {
      const qe = describeQuickAction(te);
      (Yt((Ce) => {
        if (Ce.some((xn) => isSameQuickAction(xn, te))) return Ce;
        const ot = [...Ce, te];
        return (saveQuickFavorites(ot), ot);
      }),
        announce(`已把「${qe}」加入常用快捷指令。`));
    }, []),
    _r = React.useCallback((te) => {
      Yt((qe) => {
        const Ce = toggleQuickFavorite(qe, te);
        return (saveQuickFavorites(Ce), Ce);
      });
    }, []),
    Bn = VoiceCommandBar({
      enabled: O && Ne,
      game: s,
      tab: c,
      night: nn,
      goTab: gn,
      handleNextDay: Ui,
      handleManualSave: Nr,
      toggleNight: de,
      commit: On,
      setGame: a,
      onOpenQuickPanel: () => Oe(!0),
      onFavorite: wr,
      readLatestModal: Es,
    }),
    qr = React.useCallback(() => {
      (Oe((te) => !te), Bn.stop());
    }, [Bn]),
    Cr = () => {
      (E(!1), zi());
    },
    Ji = React.useCallback(() => {
      y(pickRandomEntry(w === "male" ? MALE_NAME_POOL : FEMALE_NAME_POOL));
    }, [w]),
    Sr = React.useCallback(() => {
      v(pickRandomEntry(SHOP_NAME_POOL));
    }, []);
  if (e === "loading") return jsxRuntime.jsx(GameContainer, {});
  if (e === "title")
    return jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsx(TitleScreen, {
          playerName: p,
          onPlayerName: y,
          shopName: j,
          onShopName: v,
          onRandomName: Ji,
          onRandomShop: Sr,
          gender: w,
          onGender: N,
          age: S,
          onAge: C,
          season: sN,
          onSeason: tN,
          blindMode: O,
          blindAsk: Y,
          toast: x,
          onToastDone: () => m(null),
          onStart: Qi,
          onEnableBlind: U,
          onDismissBlind: I,
          onDisableBlind: Yi,
        }),
        jsxRuntime.jsx("div", { className: "bgm-toggle-title", children: jsxRuntime.jsx(MuteToggleButton, { light: !0 }) }),
      ],
    });
  if (!s) return null;
  const ha = countCompletedMilestones(s),
    Ki = s.employees.length > 0,
    pa = s.hasBag ? `携带 ${countCarried(s)}/${carryCapacity(s)}` : `徒手 ${countCarried(s)}/${carryCapacity(s)}`,
    sd = (s.pendingOrders ?? []).reduce(
      (te, qe) => te + qe.entries.reduce((Ce, ot) => Ce + ot.qty, 0),
      0,
    );
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      id: "container",
      className: `${nn ? "night min-h-screen" : "min-h-screen"} ${O ? "blind-mode" : ""}`,
      children: [
        jsxRuntime.jsx(TopBar, {
          game: s,
          tab: c,
          blindMode: O,
          night: nn,
          saving: Pa,
          hasEmployee: Ki,
          onVoice: () => xe(!0),
          onFont: () => P(!0),
          onNight: de,
          onEmployeeSell: Pi,
          onNextDay: Ui,
          onHandbook: () => setHandbookOpen(!0),
          onSettings: () => setSettingsOpen(!0),
        }),
        Y &&
          jsxRuntime.jsx("div", {
            className: "px-4 pt-2",
            children: jsxRuntime.jsx(BlindModeAskBanner, { onEnable: U, onDismiss: I, onReplay: fe }),
          }),
        jsxRuntime.jsx("div", {
          className: "panel-scroll panel-area px-4 pt-2",
          style: { height: `calc(100dvh - ${As}px)`, minHeight: `calc(100dvh - ${As}px)` },
          children: jsxRuntime.jsx(TopBarStatusPanel, {
            tab: c,
            game: s,
            commit: On,
            goTab: gn,
            homeFocus: f,
            onSave: Nr,
            onRestart: () => E(!0),
            currentSlot: o,
            onSwitchSlot: jr,
            onLoadSlot: kr,
            showToast: Tn,
            townOpenReq: se,
            onSleepOvernight: Xi,
          }),
        }),
        jsxRuntime.jsx(TabBar, {
          tab: c,
          pendingCount: ha,
          onGo: gn,
          onPhoneApp: fa,
          onPhone: () => J(!0),
          onTown: () => J(!1),
          onCarry: () => R(!0),
          carriedLabel: pa,
          arriving: sd,
        }),
        O &&
          Ne &&
          jsxRuntime.jsx(VoiceCommandButton, {
            listening: Bn.listening,
            interim: Bn.interim,
            quickOpen: Se,
            onToggle: Bn.toggle,
            onQuick: qr,
            night: nn,
          }),
        O &&
          Ne &&
          jsxRuntime.jsx(QuickActionsPanel, {
            open: Se,
            onClose: () => Oe(!1),
            night: nn,
            favorites: nt,
            onToggleFavorite: _r,
            onExecute: Bn.executeCommand,
            onHelp: Bn.playHelp,
          }),
        jsxRuntime.jsx(VoiceSettingsDialog, {
          open: Ie,
          onClose: () => xe(!1),
          blindMode: O,
          onBlindChange: (te) => K(te),
          voiceCommand: Ne,
          onVoiceCommandChange: Te,
        }),
        jsxRuntime.jsx(FontSettingsDialog, {
          open: ye,
          onClose: () => P(!1),
          fontScale: (s == null ? void 0 : s.fontScale) ?? "mediumSmall",
          onFontScaleChange: (te) => {
            if (!s) return;
            const qe = {
              small: "小",
              mediumSmall: "中",
              medium: "中偏大",
              large: "大",
              xlarge: "特大",
            };
            On({ ...s, fontScale: te }, `字体大小已切换为「${qe[te]}」`, "info");
          },
        }),
        jsxRuntime.jsx(HandbookDialog, {
          open: handbookOpen,
          state: s,
          commit: On,
          onClose: () => setHandbookOpen(!1),
          onOpenGuide: () => setGuideOpen(!0),
          onOpenInventory: () => setInventoryOpen(!0),
        }),
        jsxRuntime.jsx(SettingsDialog, {
          open: settingsOpen,
          state: s,
          commit: On,
          onClose: () => setSettingsOpen(!1),
          night: nn,
          onNight: de,
          blindMode: O,
          onBlindChange: K,
          voiceCommand: Ne,
          onVoiceCommandChange: Te,
          onOpenGuide: () => setGuideOpen(!0),
          onOpenInventory: () => setInventoryOpen(!0),
          onFontDialog: () => P(!0),
          onVoiceDialog: () => xe(!0),
        }),
        jsxRuntime.jsx(InventoryOverviewDialog, {
          open: inventoryOpen,
          state: s,
          onClose: () => setInventoryOpen(!1),
        }),
        jsxRuntime.jsx(TutorialOverlay, {
          open: guideOpen,
          state: s,
          commit: On,
          onClose: () => setGuideOpen(!1),
        }),
        jsxRuntime.jsx(RestartDialog, { open: V, onClose: () => E(!1), onConfirm: Cr }),
        jsxRuntime.jsx(DeathDialog, {
          open: !!(s && s.dead),
          state: s,
          /* 死亡系统：读档回到死亡前。判死那天不写盘，当前槽磁盘上即最近一次存活的跨天存档。 */
          onLoad: async () => {
            try {
              const save = await loadSaveMetaBySlot(getCurrentSlot());
              if (!save) { Tn("没有可读取的存档，只能重新开店", "error"); return; }
              const Ce = chargeTruckMonthlyFee(save);
              a(Ce.state);
              n("playing");
              Tn("已读档，回到死亡之前。记得先吃点东西！", "success");
            } catch (err) {
              Tn("读档失败，请稍后再试", "error");
            }
          },
          onRestart: Cr,
        }),
        jsxRuntime.jsx(PhoneAppDialog, {
          open: F,
          state: s,
          commit: On,
          onClose: () => J(!1),
          onGoPlace: (te) => {
            (J(!1),
              c === "town"
                ? sendFrameCommand("town", "town:open-map", { loc: te })
                : (gn("town"),
                  be((qe) => ({ token: ((qe == null ? void 0 : qe.token) ?? 0) + 1, loc: te }))));
          },
        }),
        c === "town" && jsxRuntime.jsx(BagDialog, { open: H, state: s, commit: On, onClose: () => R(!1) }),
        jsxRuntime.jsx(AchievementUnlockDialog, { ach: Fn, onClose: Ln }),
        ne &&
          jsxRuntime.jsx(Modal, {
            open: !0,
            title: "🏡 新店开张",
            onClose: () => D(null),
            children: jsxRuntime.jsxs("div", {
              className: "space-y-2",
              children: [
                jsxRuntime.jsx("p", {
                  className:
                    "rounded-2xl bg-[#fff3bf] p-3 text-center text-xs font-black leading-relaxed text-[#8a5a00]",
                  children: ne,
                }),
                jsxRuntime.jsx("p", {
                  className: "text-center text-[10px] font-bold text-[#b08a6a]",
                  children: "接下来每天「新的一天」开场都会再送你一条新手提示，共 7 天。",
                }),
              ],
            }),
          }),
        jsxRuntime.jsx("div", {
          role: "status",
          "aria-live": "polite",
          className: "sr-only",
          "data-testid": "a11y-live",
          children: Ss,
        }),
        jsxRuntime.jsx(ToastNotice, { toast: x, onDone: () => m(null) }),
        jsxRuntime.jsx("div", {
          id: "global-modal-root",
          style: { position: "fixed", inset: 0, zIndex: 90, pointerEvents: "none" },
        }),
      ],
    }),
  );
}
