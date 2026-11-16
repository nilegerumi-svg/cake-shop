function TownSummaryStrip({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#b2dfdb] bg-[#e0f2f1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#00695c]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏥" }),
          " 镇医院白天门诊：挂号看诊能快速恢复健康（每小时 1 次），医生和护士白天都在这里上班。雨雪天户外活动不便时，医院照常营业。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "rounded-xl border-2 border-[#80cbc4] bg-[#f5fdfc] p-2.5",
        children: jsxRuntime.jsxs("div", {
          className: "flex gap-3",
          children: [
            jsxRuntime.jsx("div", {
              className: "flex w-[20%] shrink-0 items-center justify-center",
              children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "🩺" }),
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsx("p", {
                      className: "text-sm font-black text-[#00695c]",
                      children: "门诊看诊",
                    }),
                    jsxRuntime.jsx("p", {
                      className: "text-[11px] text-[#4db6ac]",
                      children: "花 ¥50 挂号，恢复 30 点健康（健康满时无需看诊）",
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[10px] font-bold text-[#6b4226]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                        "4 精力 · 耗时 1 小时 · 当前健康 ",
                        jsxRuntime.jsx("span", { className: "num", children: n.health }),
                        "/",
                        MAX_HEALTH,
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[10px] font-bold text-[#558b2f]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "👨‍⚕️" }),
                        " 接诊医生：当日值班医生 · 看诊后记入「档案 → 健康档案」",
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsx("div", {
                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                  children: jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-hospital-visit",
                    onClick: () => {
                      const s = visitDoctor(n);
                      e.commit(s.state, s.message, s.ok ? "success" : "error");
                    },
                    disabled: n.health >= MAX_HEALTH || n.coins < 50 || n.hour >= 22,
                    className: "btn-chunky btn-xs btn-green",
                    children: "挂号 ¥50",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      e.hereNpcsAt("hospital").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("hospital"),
          locId: "hospital",
          badgeText: "🟢 公共场合",
        }),
    ],
  });
}

function StreetIntroNotice({ ctx: e }) {
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0e0b0] bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏘️" }),
          " 商店街是小镇的商业中心：食材商店、服装店、理发店、鱼竿店、家具店、书店、综合超市都开在这条街上；员工招聘摊位也在这里。",
          jsxRuntime.jsx("span", { className: "emoji", children: "🍰" }),
          " 苏记甜品面包店是苏家的家族产业，家里人轮流当班；水果摊的店员白天也都在上班，想认识他们来这里准没错。",
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-map-enter-street",
        onClick: e.onEnterStreet,
        className: "btn-chunky btn-sm btn-yellow w-full",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏪" }),
          " 进入商店街（逛店铺 · 招聘店员）",
        ],
      }),
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0e0b0] bg-[#fffaf3] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🚶" }),
          " 街道上不站人：店员们都在各自的店铺里当班——进店就能见到 TA 们，认识新朋友也请直接进店。",
        ],
      }),
    ],
  });
}

function NightMarketSection({ ctx: e }) {
  const { state: n } = e,
    s = isWeekend(n.day),
    a = isNightMarketOpen(n);
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#ff7043] bg-[#fff3e0] px-2.5 py-1.5",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-black text-[#6b4226]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🌃" }),
              " 广场夜市",
              jsxRuntime.jsx("span", {
                className:
                  "ml-1.5 rounded-full bg-[#ffcc80] px-2 py-0.5 text-[10px] font-black text-[#6b4226]",
                children: a
                  ? "🎉 今晚开张"
                  : s
                    ? `今晚有夜市（18 点后开张，现在 ${Math.floor(n.hour)} 点）`
                    : "休息日晚开放",
              }),
            ],
          }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
            children: a
              ? "🎏 夜市开张了：食品、衣服、玩具、套圈、捞金鱼、气球城堡一字排开，伙伴们也在夜市里闲逛。"
              : "夜市只在休息日（周六/周日）的晚上 18 点后摆摊，今晚来早了就散散步等等看。",
          }),
        ],
      }),
      a &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            NIGHT_MARKET_STALLS.map((o) => {
              const l = STALL_FURNITURE_MAP[o.id],
                c = l ? FURNITURE_MAP[l] : void 0;
              return jsxRuntime.jsxs(
                "div",
                {
                  className: "rounded-xl border-2 border-[#ffcc80] bg-[#fffaf3] p-2",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex gap-2",
                      children: [
                        jsxRuntime.jsx("div", {
                          className: "flex w-[20%] shrink-0 items-center justify-center",
                          children: jsxRuntime.jsx("span", {
                            className: "emoji text-xl",
                            children: o.emoji,
                          }),
                        }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("div", {
                              children: [
                                jsxRuntime.jsx("p", {
                                  className: "text-[11px] font-black text-[#4a2c17]",
                                  children: o.name,
                                }),
                                jsxRuntime.jsx("p", {
                                  className: "text-[10px] leading-relaxed text-[#b08a6a]",
                                  children: o.desc,
                                }),
                              ],
                            }),
                            jsxRuntime.jsxs("div", {
                              className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                              children: [
                                jsxRuntime.jsx("button", {
                                  type: "button",
                                  "data-testid": `btn-night-market-browse-${o.id}`,
                                  className: "btn-chunky btn-xs btn-yellow",
                                  onClick: () => e.onStallBrowse(o.id),
                                  children: "看看",
                                }),
                                o.kind === "fish" &&
                                  jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                    children: [
                                      jsxRuntime.jsx("button", {
                                        type: "button",
                                        "data-testid": "btn-night-market-goldfish-eat",
                                        className: "btn-chunky btn-xs btn-orange",
                                        onClick: e.onGoldfishEat,
                                        disabled: n.energy < 6,
                                        children: "捞来吃掉",
                                      }),
                                      jsxRuntime.jsx("button", {
                                        type: "button",
                                        "data-testid": "btn-night-market-goldfish-home",
                                        className: "btn-chunky btn-xs btn-green",
                                        onClick: e.onGoldfishHome,
                                        disabled: n.energy < 6,
                                        children: "带回家",
                                      }),
                                      jsxRuntime.jsx("button", {
                                        type: "button",
                                        "data-testid": "btn-night-market-goldfish-cook",
                                        onClick: e.onGoldfishCook,
                                        disabled: n.energy < 6,
                                        className: "btn-chunky btn-xs btn-brown",
                                        children: "带回去做菜",
                                      }),
                                    ],
                                  }),
                                c &&
                                  jsxRuntime.jsxs("button", {
                                    type: "button",
                                    "data-testid": `btn-night-market-buy-toy-${l}`,
                                    className: "btn-chunky btn-xs btn-green",
                                    onClick: () => e.onBuyFurniture(c.id),
                                    disabled: n.coins < (c.buyPrice ?? 0),
                                    children: ["买", c.name, " ¥", c.buyPrice],
                                  }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    o.kind === "clothes" &&
                      jsxRuntime.jsx("div", {
                        className: "mt-1.5 flex flex-wrap gap-1.5",
                        children: STALL_OUTFIT_IDS.map((u) => {
                          const f = OUTFIT_MAP[u];
                          return f
                            ? jsxRuntime.jsxs(
                                "button",
                                {
                                  type: "button",
                                  "data-testid": `btn-night-market-buy-outfit-${u}`,
                                  className: "btn-chunky btn-xs btn-orange",
                                  onClick: () => e.onBuyOutfit(u),
                                  disabled: n.coins < f.price || n.outfits.owned.includes(u),
                                  children: [f.emoji, " ", f.name, " ¥", f.price],
                                },
                                u,
                              )
                            : null;
                        }),
                      }),
                    o.kind === "fish" &&
                      jsxRuntime.jsxs(jsxRuntime.Fragment, {
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "mt-1 text-[10px] font-bold text-[#b08a6a]",
                            children: [
                              "🐟 捞到金鱼可以吃掉（饱食 +20、心情 +4），也可以带回家养在水族缸里（先在家具店买个水族缸）。也可以选「带回去做菜」，直接获得金鱼食材，回家在厨房做金鱼料理。鱼饲料 ¥",
                              FISH_FEED_PRICE,
                              "/份，家里的金鱼靠它续命。",
                            ],
                          }),
                          jsxRuntime.jsxs("div", {
                            className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                            children: [
                              jsxRuntime.jsxs("span", {
                                className:
                                  "rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[10px] font-black text-[#0d47a1]",
                                children: ["🐟 鱼饲料 ×", n.fishFeed ?? 0],
                              }),
                              jsxRuntime.jsxs("button", {
                                type: "button",
                                "data-testid": "btn-night-market-buy-fish-feed",
                                className: "btn-chunky btn-xs btn-yellow shrink-0",
                                onClick: e.onBuyFishFeed,
                                disabled: n.coins < FISH_FEED_PRICE,
                                children: ["买 1 份鱼饲料 ¥", FISH_FEED_PRICE],
                              }),
                            ],
                          }),
                        ],
                      }),
                    o.kind === "castle" &&
                      jsxRuntime.jsx("p", {
                        className: "mt-1 text-[10px] font-bold text-[#b08a6a]",
                        children: "🎈 气球城堡只让小孩子进，你在外面看看就好。",
                      }),
                  ],
                },
                o.id,
              );
            }),
            jsxRuntime.jsxs("div", {
              className: "rounded-xl border-2 border-[#ff7043] bg-[#fff3e0] p-2.5",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-xs font-black text-[#6b4226]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🚚" }),
                    " 你的餐车摊位",
                  ],
                }),
                n.nightMarketTruck
                  ? hasValidPermit(n)
                    ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                        children: [
                          jsxRuntime.jsxs("p", {
                            className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                            children: [
                              "自己看料理摊卖料理（¥1.3 倍）；",
                              n.employees.length > 0
                                ? "店员在时会帮你看蛋糕摊卖糕点，两份一起卖。"
                                : "店里还没有店员，只能卖料理。",
                              "收入先进收银台，回店里盘点账目就能入账。",
                            ],
                          }),
                          jsxRuntime.jsxs("button", {
                            type: "button",
                            "data-testid": "btn-night-market-sell",
                            className: "btn-chunky btn-xs btn-orange mt-2",
                            onClick: e.onNightMarketSell,
                            disabled: n.energy < 4,
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "🍢" }),
                              " 出摊卖一轮（30 分钟 · 4 精力）",
                            ],
                          }),
                        ],
                      })
                    : jsxRuntime.jsx("p", {
                        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#c62828]",
                        children:
                          "⏰ 餐车还在，但这个月的摆摊资格已过期了——先去市政府重新办理资格（¥200），本月底前就能继续出摊。",
                      })
                  : jsxRuntime.jsx("p", {
                      className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                      children:
                        "摆摊需要两样：① 去市政府办理「夜市摆摊资格」（¥200，按月有效）；② 购买一辆餐车（¥2000，一次性）。办齐后，夜市夜 18 点后就能开张。",
                    }),
              ],
            }),
            jsxRuntime.jsx(SushiStallSection, { state: n, commit: e.commit, testId: "night-sec-sushi-stall" }),
          ],
        }),
    ],
  });
}

function CharmSection({ ctx: e }) {
  const { state: n } = e,
    s = calcCharm(n),
    a = Math.min(FLOWER_PLAZA_MAX_PRICE, FLOWER_PLAZA_BASE_PRICE + Math.floor(s / 2));
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#ffc53d] bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏟️" }),
          " 广场是小镇最热闹的地方：听听街头艺人唱歌、看看手作小摊，运气好还能偶遇伙伴们，聊聊天增进感情。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "rounded-xl border-2 border-[#ffc53d] bg-[#fffdf8] p-2.5",
        children: jsxRuntime.jsxs("div", {
          className: "flex gap-3",
          children: [
            jsxRuntime.jsx("div", {
              className: "flex w-[20%] shrink-0 items-center justify-center",
              children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "🎡" }),
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsx("p", {
                      className: "text-sm font-black text-[#4a2c17]",
                      children: "广场逛逛",
                    }),
                    jsxRuntime.jsx("p", {
                      className: "text-[11px] text-[#b08a6a]",
                      children: "花 1 小时听歌看摊：心情 +8、健康 +1，有机会偶遇伙伴好感 +1",
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[10px] font-bold text-[#6b4226]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                        "8 精力 · 每日不限次数",
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsx("div", {
                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                  children: jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-plaza-stroll",
                    onClick: e.onPlazaStroll,
                    disabled: n.energy < 8 || n.hour >= 22,
                    className: "btn-chunky btn-xs btn-yellow",
                    children: "逛逛",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      jsxRuntime.jsx("div", {
        className: "rounded-xl border-2 border-[#a5d6a7] bg-[#fffdf8] p-2.5",
        children: jsxRuntime.jsxs("div", {
          className: "flex gap-3",
          children: [
            jsxRuntime.jsx("div", {
              className: "flex w-[20%] shrink-0 items-center justify-center",
              children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "💐" }),
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsx("p", {
                      className: "text-sm font-black text-[#4a2c17]",
                      children: "广场摆摊卖花",
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] text-[#b08a6a]",
                      children: [
                        "把阳台收获的鲜花带到广场摆摊：魅力越高卖得越好（当前魅力 ",
                        s,
                        "，预计每朵 ¥",
                        a,
                        "）",
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[10px] font-bold text-[#6b4226]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                        "8 精力 · 1 小时 · 今日 ",
                        n.plazaFlowerSoldToday ?? 0,
                        "/",
                        FLOWER_PLAZA_DAILY_LIMIT,
                        " 朵 · 阳台鲜花 ",
                        n.homeFlowers ?? 0,
                        " 朵",
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsx("div", {
                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                  children: jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-plaza-sell-flower",
                    onClick: e.onSellFlowerPlaza,
                    disabled:
                      (n.homeFlowers ?? 0) < 1 ||
                      (n.plazaFlowerSoldToday ?? 0) >= FLOWER_PLAZA_DAILY_LIMIT ||
                      n.energy < 8,
                    className: "btn-chunky btn-xs btn-green",
                    children: "卖 1 朵",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      jsxRuntime.jsx(NightMarketSection, { ctx: e }),
      e.hereNpcsAt("plaza").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("plaza"),
          locId: "plaza",
          badgeText: "🟢 公共场合",
        }),
    ],
  });
}

function NpcMeetCard({ ctx: e, npcId: n, badgeText: s }) {
  const { state: a, setDialogue: o } = e,
    l = NPC_ROOMS[n],
    c = NPC_RUNTIME_DATA[n];
  if (!l || !c) return null;
  const u = (a.metNpcs ?? []).includes(n);
  return jsxRuntime.jsxs(
    "div",
    {
      className: "rounded-xl border-2 border-[#e8d5b8] bg-[#fffdf8] p-2.5",
      children: [
        jsxRuntime.jsxs("div", {
          className: "flex gap-2",
          children: [
            jsxRuntime.jsx("div", {
              className: "flex w-[20%] shrink-0 items-center justify-center",
              children: jsxRuntime.jsx("span", {
                className:
                  "emoji flex h-10 w-10 items-center justify-center rounded-xl bg-[#fbf3e4] text-xl",
                children: l.emoji,
              }),
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsx("p", {
                      className: "text-sm font-black text-[#4a2c17]",
                      children: l.name,
                    }),
                    jsxRuntime.jsxs("span", {
                      className:
                        "mt-0.5 inline-block rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-bold text-[#b8860b]",
                      children: [
                        segmentByEmoji(s),
                        " · ",
                        jsxRuntime.jsx("span", { className: "emoji", children: c.emoji }),
                        " ",
                        u ? c.name : "？？？",
                      ],
                    }),
                  ],
                }),
                u
                  ? jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: jsxRuntime.jsxs("button", {
                        type: "button",
                        "data-testid": `btn-visit-room-${n}`,
                        onClick: () => o({ title: `🚪 拜访 · ${l.name}`, text: l.visit }),
                        className: "btn-chunky btn-xs btn-pink",
                        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }), " 拜访"],
                      }),
                    })
                  : jsxRuntime.jsxs("span", {
                      className:
                        "mt-1 inline-block rounded-full bg-[#fdecea] px-2 py-0.5 text-[9px] font-bold text-[#b3415e]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🔒" }),
                        " 认识后可拜访",
                      ],
                    }),
              ],
            }),
          ],
        }),
        jsxRuntime.jsx("p", {
          className:
            "mt-1.5 rounded-lg bg-[#fbf3e4] px-2 py-1 text-[10px] font-bold leading-relaxed text-[#6b4226]",
          children: l.desc,
        }),
      ],
    },
    n,
  );
}

function ResidentialAreaSection({ ctx: e }) {
  const { hour: n, day: s } = e.state,
    a = Object.keys(NPC_RESIDENCE).filter((c) => NPC_RESIDENCE[c].area === "居民区"),
    o = (c) => {
      const u = getNpcLocationAt(c, n, s).place;
      return (
        u === "residential" ||
        u === "wenyuan" ||
        u === "ankang" ||
        u === "wutongli" ||
        u === "sujizhai"
      );
    },
    l = (() => {
      var u;
      const c = new Map();
      for (const f of a) {
        const g = ((u = NPC_RESIDENCE[f]) == null ? void 0 : u.detail) ?? "其他";
        (c.has(g) || c.set(g, []), c.get(g).push(f));
      }
      return [...c.entries()].map(([f, g]) => [f, g.filter(o)]);
    })();
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0dcc0] bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏘️" }),
          " 居民区是镇上大多数伙伴和家长们的家，按不同小区划分：梧桐里、安康苑、文苑、苏记老宅，各小区都有门卫，陌生人不能随便进。想认识住户，白天去商店街、医院、学校、图书馆就能碰到 TA 们；认识之后，等 TA 们傍晚回家就可以来拜访了。",
        ],
      }),
      l.map(([c, u], f) =>
        MapPlaceCard({
          keyId: `res-${c}`,
          title: `🏡 ${c} · 此刻 ${u.length} 位在家`,
          emoji: "🏡",
          sub: "不在家的住户此刻在镇上各处忙，晚点回来",
          open: e.isCatOpen("residential", c) || f === 0,
          onToggle: () => e.toggleCat("residential", c),
          border: "border-[#e8d5b8]",
          bg: "bg-[#fffdf8]",
          titleColor: "text-[#4a2c17]",
          subColor: "text-[#b08a6a]",
          testId: `res-cat-${c}`,
          children:
            u.length > 0
              ? u.map((g) =>
                  jsxRuntime.jsx(
                    NpcDetailCard,
                    { ctx: e.ctx, npcId: g, badgeText: `🏡 ${c}`, locId: "residential" },
                    g,
                  ),
                )
              : jsxRuntime.jsx("p", {
                  className:
                    "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#8a6a4a]",
                  children:
                    "此刻该小区没有住户在家，白天去商店街、医院、学校、图书馆更容易碰到 TA 们。",
                }),
        }),
      ),
      MapPlaceCard({
        keyId: "res-rooms",
        title: "🚪 个人房间",
        emoji: "🚪",
        sub: `${a.filter((c) => NPC_ROOMS[c]).length} 间房间 · 人在家时才能敲门拜访`,
        open: e.isCatOpen("residential", "rooms"),
        onToggle: () => e.toggleCat("residential", "rooms"),
        border: "border-[#f0dcc0]",
        bg: "bg-[#fbf3e4]",
        titleColor: "text-[#4a2c17]",
        subColor: "text-[#b08a6a]",
        testId: "res-cat-rooms",
        children: jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx("p", {
              className:
                "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
              children: "每位住户都有自己的房间：等 TA 在家时就能敲门拜访，看看 TA 的小天地。",
            }),
            a.filter(o).length > 0
              ? a
                  .filter(o)
                  .map((c) => jsxRuntime.jsx(NpcMeetCard, { ctx: e.ctx, npcId: c, badgeText: "🏡 居民区住户" }, c))
              : jsxRuntime.jsx("p", {
                  className:
                    "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#8a6a4a]",
                  children: "此刻住户们都不在家，等傍晚回家后再来敲门。",
                }),
          ],
        }),
      }),
    ],
  });
}

const DISTRICT_DISPLAY_NAMES = {
  wenyuan: "文苑小区",
  ankang: "安康苑小区",
  wutongli: "梧桐里小区",
  sujizhai: "苏记老宅",
};

function ResidentialAreaDetail({ ctx: e, area: n }) {
  const s = DISTRICT_DISPLAY_NAMES[n] ?? "本小区",
    { hour: a, day: o } = e.state,
    l = Object.keys(NPC_RESIDENCE).filter((g) => {
      var x;
      return (((x = NPC_RESIDENCE[g]) == null ? void 0 : x.detail) ?? "").includes(s);
    }),
    c = (g) => {
      const x = getNpcLocationAt(g, a, o).place;
      return x === "residential" || x === n;
    },
    u = l.filter(c),
    f = u.filter((g) => NPC_ROOMS[g]);
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0dcc0] bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏘️" }),
          " ",
          s,
          "是居民区拆分后的小区之一，共有 ",
          l.length,
          " 位住户。各小区都有门卫，陌生人不能随便进；想认识住户，白天去东/西商店街、医院、学校、图书馆就能碰到 TA 们，认识之后等 TA 们傍晚回家再来拜访。",
        ],
      }),
      MapPlaceCard({
        keyId: `res-area-${n}`,
        title: `🏡 ${s} · 此刻 ${u.length} 位在家`,
        emoji: "🏡",
        sub: "不在家的住户此刻在镇上各处忙，晚点回来",
        open: !0,
        onToggle: () => e.toggleCat(n, s),
        border: "border-[#e8d5b8]",
        bg: "bg-[#fffdf8]",
        titleColor: "text-[#4a2c17]",
        subColor: "text-[#b08a6a]",
        testId: `res-area-${n}-residents`,
        children:
          u.length > 0
            ? u.map((g) => jsxRuntime.jsx(NpcDetailCard, { ctx: e.ctx, npcId: g, badgeText: `🏡 ${s}`, locId: n }, g))
            : jsxRuntime.jsxs("p", {
                className:
                  "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#8a6a4a]",
                children: [
                  "此刻 ",
                  s,
                  " 没有住户在家，白天去商店街、医院、学校、图书馆更容易碰到 TA 们。",
                ],
              }),
      }),
      MapPlaceCard({
        keyId: `res-area-${n}-rooms`,
        title: "🚪 个人房间",
        emoji: "🚪",
        sub: `${l.filter((g) => NPC_ROOMS[g]).length} 间房间 · 人在家时才能敲门拜访`,
        open: !1,
        onToggle: () => e.toggleCat(n, "rooms"),
        border: "border-[#f0dcc0]",
        bg: "bg-[#fbf3e4]",
        titleColor: "text-[#4a2c17]",
        subColor: "text-[#b08a6a]",
        testId: `res-area-${n}-rooms`,
        children: jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx("p", {
              className:
                "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
              children: "每位住户都有自己的房间：等 TA 在家时就能敲门拜访，看看 TA 的小天地。",
            }),
            f.length > 0
              ? f.map((g) => jsxRuntime.jsx(NpcMeetCard, { ctx: e.ctx, npcId: g, badgeText: `🏡 ${s}` }, g))
              : jsxRuntime.jsx("p", {
                  className:
                    "rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#8a6a4a]",
                  children: "此刻住户们都不在家，等傍晚回家后再来敲门。",
                }),
          ],
        }),
      }),
    ],
  });
}

function HiringStallSection({ state: e, onHire: n }) {
  const s = e;
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-1.5 text-sm font-black text-[#6b4226]",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧑‍🍳" }), " 招聘摊位"],
        }),
        jsxRuntime.jsx("div", {
          className: "space-y-1.5",
          children: EMPLOYEES.map((a) => {
            const o = s.employees.includes(a.id),
              l = o || (s.metNpcs ?? []).includes(a.id);
            return jsxRuntime.jsxs(
              "div",
              {
                className: "flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5",
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
                            className: "text-sm font-black text-[#4a2c17]",
                            children: [
                              a.name,
                              jsxRuntime.jsx("span", {
                                className: "ml-1.5 text-[10px] font-bold text-[#b08a6a]",
                                children: a.title,
                              }),
                              o &&
                                jsxRuntime.jsx("span", {
                                  className: "ml-1 text-[10px] font-bold text-[#c62828]",
                                  children: "已雇佣 ✓",
                                }),
                            ],
                          }),
                          jsxRuntime.jsxs("p", {
                            className: "text-[11px] text-[#b08a6a]",
                            children: ["日薪 ¥", a.wage ?? 60, " · 一次雇佣长期看店"],
                          }),
                        ],
                      }),
                      jsxRuntime.jsx("div", {
                        className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                        children: jsxRuntime.jsx("button", {
                          type: "button",
                          "data-testid": `btn-street-hire-${a.id}`,
                          onClick: () => n(a.id),
                          disabled: o || s.coins < a.hireCost,
                          className: "btn-chunky btn-xs btn-green",
                          children: o
                            ? "已雇佣"
                            : l
                              ? `雇佣 💰${a.hireCost}`
                              : `初识+雇佣 💰${a.hireCost}`,
                        }),
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
    }),
  );
}

const SHOP_KIND_META = {
    grocery: { emoji: "🥕", name: "食材商店", tag: "现货食材" },
    clothes: { emoji: "👗", name: "服装店", tag: "12 部位穿搭" },
    salon: { emoji: "💈", name: "理发店", tag: "复杂发型" },
    rod: { emoji: "🎣", name: "鱼竿店", tag: "钓鱼装备" },
    furniture: { emoji: "🛋️", name: "家具店", tag: "家具 · 木料" },
    bookstore: { emoji: "📖", name: "书店", tag: "买书回家读" },
    fabric: { emoji: "🧵", name: "布料行", tag: "布料 · 针线" },
    bank: { emoji: "🏦", name: "银行", tag: "存取款 · 日结利息" },
    suji: { emoji: "🍰", name: "苏记甜品面包店", tag: "家族产业" },
    fruit: { emoji: "🍉", name: "水果摊", tag: "85 折水果" },
    veg: { emoji: "🥬", name: "菜市场", tag: "85 折蔬菜" },
    fastfood: { emoji: "🍜", name: "快餐店", tag: "吃饭补饱食" },
    supermarket: { emoji: "🏬", name: "综合超市", tag: "厨具装备" },
    flower: { emoji: "💐", name: "花店", tag: "买花送礼" },
  },
  STREET_META = {
    eaststreet: {
      name: "东商店街",
      emoji: "🏪",
      desc: "商店街拆分后的东半条街：食材商店、服装店、理发店、鱼竿店、家具店、书店、布料行和银行都开在街边，员工招聘摊位也在这边。",
    },
    weststreet: {
      name: "西商店街",
      emoji: "🏪",
      desc: "商店街拆分后的西半条街：苏记甜品面包店、水果摊、菜市场、快餐店、综合超市和花店都开在街边，苏家甜品与果蔬摊位的店员白天都在当班。",
    },
  };

function StreetShopList({ ctx: e, street: n }) {
  const s = STREET_META[n] ?? STREET_META.eaststreet,
    a = n === "eaststreet" ? EAST_STREET_SHOP_IDS : WEST_STREET_SHOP_IDS,
    o = a.flatMap((u) => (SHOP_NPC_IDS[u] ?? []).map((f) => f)).filter((u, f, g) => g.indexOf(u) === f),
    [l, c] = React.useState(!1);
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0e0b0] bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: s.emoji }),
          " ",
          s.name,
          "是商店街拆分后的独立地点：",
          s.desc,
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-2",
        children: a.map((u) => {
          const f = SHOP_KIND_META[u];
          return f
            ? jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `btn-street-area-store-${u}`,
                  onClick: () => e.onEnterShop(u),
                  className:
                    "flex flex-col items-center rounded-xl border-2 border-[#ffc53d] bg-[#fff8e1] p-3 active:scale-95",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "text-3xl",
                      children: jsxRuntime.jsx("span", { className: "emoji", children: f.emoji }),
                    }),
                    jsxRuntime.jsx("p", {
                      className: "mt-1 text-sm font-black text-[#b8860b]",
                      children: f.name,
                    }),
                    jsxRuntime.jsx("p", {
                      className: "text-[10px] font-bold text-[#e65100]",
                      children: f.tag,
                    }),
                  ],
                },
                u,
              )
            : null;
        }),
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": `btn-map-enter-${n}`,
        onClick: e.onEnterStreet,
        className: "btn-chunky btn-sm btn-yellow w-full",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏪" }),
          " 进入",
          s.name,
          "（逛店铺 · 招聘店员）",
        ],
      }),
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0e0b0] bg-[#fffaf3] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🚶" }),
          " 街道上不站人：店员们都在各自的店铺里当班——进店就能见到 TA 们，认识新朋友也请直接进店。",
          s.name,
          "共 ",
          a.length,
          " 家店铺、",
          o.length,
          " 位常驻店员。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#f0dcc0] bg-[#fffaf3] p-2",
        children: [
          jsxRuntime.jsx(CollapsibleHeader, {
            open: l,
            onToggle: () => c((u) => !u),
            title: "💼 招聘摊位",
            tone: "#6b4226",
            right: jsxRuntime.jsx("span", {
              className: "text-[10px] font-bold text-[#b08a6a]",
              children: "雇佣店员看店",
            }),
          }),
          l && jsxRuntime.jsx(HiringStallSection, { state: e.state, onHire: e.onHire }),
        ],
      }),
    ],
  });
}

function ShenFamilySection({ ctx: e }) {
  const n = ["shen_jiaoyan", "shen_jiahe"],
    { hour: s, day: a } = e.state,
    o = (c) => {
      const u = getNpcLocationAt(c, s, a).place;
      return u === "residential" || u === "villa";
    },
    l = n.filter(o);
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0e0b0] bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏰" }),
          " 一对兄妹住在镇郊的独栋别墅里，门禁森严，陌生人进不去。想认识他们，白天去收容所、图书馆或公园碰碰运气；认识之后，等他们回家就可以来别墅拜访了。",
        ],
      }),
      l.length > 0
        ? l.map((c) =>
            jsxRuntime.jsx(NpcDetailCard, { ctx: e.ctx, npcId: c, badgeText: "🏰 别墅区", locId: "villa" }, c),
          )
        : jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
            children: "此刻别墅里没人，兄妹俩白天常在收容所、图书馆或公园，傍晚才回家。",
          }),
      jsxRuntime.jsxs("div", {
        className: "space-y-1.5",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#4a2c17]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }), " 个人房间"],
          }),
          jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
            children: "兄妹俩在别墅里各有各的房间，人在家时就能登门拜访。",
          }),
          l.length > 0
            ? l.map((c) => jsxRuntime.jsx(NpcMeetCard, { ctx: e.ctx, npcId: c, badgeText: "🏰 别墅区" }, c))
            : jsxRuntime.jsx("p", {
                className:
                  "rounded-xl bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
                children: "此刻没人在家，等傍晚回来再敲门。",
              }),
        ],
      }),
    ],
  });
}

function NpcRosterCard({ ctx: e, npcId: n, badgeText: s }) {
  const { state: a, handleMeet: o, handleBlockedMeet: l, toggleNpcDetail: c, npcDetailOpen: u } = e,
    f = NPC_RUNTIME_DATA[n];
  if (!f) return null;
  const g = (a.metNpcs ?? []).includes(n),
    x = npcSchoolStage(n, a.day) === "away",
    m = npcGradeLabel(n, a.day),
    p = getNpcLocationAt(n, a.hour, a.day),
    y = isSchoolPlace(p.place),
    j = u[n] ?? !1,
    v = f.intro,
    w = v.length > 40 ? `${v.slice(0, 40)}…` : v;
  return jsxRuntime.jsxs(
    "div",
    {
      className: "rounded-2xl border-2 border-[#c8e6c9] bg-[#f1f8e9] p-2.5",
      children: [
        jsxRuntime.jsxs("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [
            jsxRuntime.jsx("span", {
              className:
                "emoji flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl",
              children: f.emoji,
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-[140px] flex-1",
              style: { minWidth: 140 },
              children: [
                jsxRuntime.jsx("p", {
                  className: "truncate text-sm font-black text-[#2e7d32]",
                  children: g
                    ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                        children: [
                          f.name,
                          " ",
                          jsxRuntime.jsx("span", {
                            className: "text-[10px] font-bold text-[#558b2f]",
                            children: f.title,
                          }),
                        ],
                      })
                    : jsxRuntime.jsx("span", { className: "text-[#8d9c8d]", children: "？？？" }),
                }),
                jsxRuntime.jsxs("span", {
                  className:
                    "mt-0.5 inline-block rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-bold text-[#b8860b]",
                  children: [
                    segmentByEmoji(s),
                    " · ",
                    jsxRuntime.jsx("span", { className: "emoji", children: "🌱" }),
                    " ",
                    m,
                  ],
                }),
              ],
            }),
            x
              ? jsxRuntime.jsxs("span", {
                  className:
                    "shrink-0 rounded-full bg-[#e0e0e0] px-2 py-0.5 text-[10px] font-black text-[#616161]",
                  children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎓" }), " 已毕业离镇"],
                })
              : g
                ? jsxRuntime.jsxs("span", {
                    className:
                      "shrink-0 rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "✅" }), " 已认识"],
                  })
                : y
                  ? jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": `btn-blocked-student-${n}`,
                      onClick: () => l(n, p),
                      className: "btn-chunky btn-xs btn-ghost shrink-0",
                      children: [jsxRuntime.jsx("span", { className: "emoji", children: "🔒" }), " 在校内"],
                    })
                  : jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": `btn-meet-student-${n}`,
                      onClick: () => o(n, p.place),
                      className: "btn-chunky btn-xs btn-green shrink-0",
                      children: [jsxRuntime.jsx("span", { className: "emoji", children: "🙋" }), " 认识 TA"],
                    }),
          ],
        }),
        !g &&
          y &&
          jsxRuntime.jsx("p", {
            className:
              "mt-1.5 rounded-lg bg-[#fdecea] px-2 py-1 text-[10px] font-bold leading-relaxed text-[#b3415e]",
            children: segmentByEmoji(
              `🔒 这位学生正在${p.activity}，非师生进不去学校。等 TA 放学、周末或节日再在校门口、商店街、公园碰面吧。`,
            ),
          }),
        jsxRuntime.jsxs("p", {
          className:
            "mt-1.5 rounded-lg bg-[#fff8e1] px-2 py-1 text-[10px] font-bold leading-relaxed text-[#a08030]",
          children: [
            g ? (j ? v : w) : "？？？",
            g &&
              v.length > 40 &&
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `btn-student-intro-${n}`,
                onClick: () => c(n),
                className:
                  "ml-1 rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-black text-[#b8860b] active:scale-95",
                children: j ? "▲ 收起" : "▼ 展开介绍",
              }),
          ],
        }),
      ],
    },
    n,
  );
}
