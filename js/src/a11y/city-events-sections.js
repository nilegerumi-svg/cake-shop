function RenameOfficeSection({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#d7ccc8] bg-[#fbf7f2] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#4a2c17]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "📛" }),
          " 改名改姓 / 换店名（每次 ¥",
          MAX_STAT_VALUE,
          "）",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-2 space-y-2",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              jsxRuntime.jsx("input", {
                type: "text",
                value: e.renameName,
                maxLength: 8,
                onChange: (s) => e.onRenameName(s.target.value),
                "data-testid": "input-rename-player",
                placeholder: "你的名字（最长 8 字）",
                className:
                  "min-w-0 flex-1 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-2.5 py-1.5 text-sm font-bold text-[#4a2c17] outline-none placeholder:text-[#d4bc9f] focus:border-[#ff6b81]",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-rename-player",
                onClick: e.onRenamePlayer,
                disabled: n.coins < MAX_STAT_VALUE,
                className: "btn-chunky btn-xs btn-brown shrink-0",
                children: "改名",
              }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "flex items-center gap-2",
            children: [
              jsxRuntime.jsx("input", {
                type: "text",
                value: e.renameShopName,
                maxLength: 10,
                onChange: (s) => e.onRenameShopName(s.target.value),
                "data-testid": "input-rename-shop",
                placeholder: "店铺名字（最长 10 字）",
                className:
                  "min-w-0 flex-1 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-2.5 py-1.5 text-sm font-bold text-[#4a2c17] outline-none placeholder:text-[#d4bc9f] focus:border-[#ff6b81]",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-rename-shop",
                onClick: e.onRenameShop,
                disabled: n.coins < MAX_STAT_VALUE,
                className: "btn-chunky btn-xs btn-brown shrink-0",
                children: "改店名",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function CharitySaleSection({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#ffcc80] bg-[#fffaf3] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#6b4226]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎪" }), " 半年一度 · 义卖活动"],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
        children: segmentByEmoji(
          isSpring(n.day)
            ? "📝 现在是报名期：花 ¥100 报名，义卖期就能摆摊卖料理（家常料理不能上架蛋糕店，正好在义卖卖）"
            : isSummer(n.day)
              ? "🎉 义卖进行中！报名过的店主今天可以摆摊（每天最多 3 份）"
              : `义卖每半年一次，距下次报名还有 ${daysUntilYearEnd(n.day)} 天`,
        ),
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-2 flex flex-wrap items-center gap-2",
        children: [
          jsxRuntime.jsx("span", {
            className:
              "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
            children: segmentByEmoji(n.charityApplied ? "✅ 已报名本次义卖" : "未报名"),
          }),
          jsxRuntime.jsxs("span", {
            className:
              "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
            children: ["今日义卖 ", n.charitySoldToday ?? 0, "/", CHARITY_DURATION_DAYS],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-charity-apply",
            onClick: e.onApplyCharity,
            disabled: n.charityApplied || !isSpring(n.day) || n.coins < MAX_STAT_VALUE,
            className: "btn-chunky btn-xs btn-orange shrink-0",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "📝" }), " 报名义卖 ¥", MAX_STAT_VALUE],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-charity-sell",
            onClick: e.onCharitySell,
            disabled:
              !n.charityApplied || !isSummer(n.day) || (n.charitySoldToday ?? 0) >= CHARITY_DURATION_DAYS || n.energy < 4,
            className: "btn-chunky btn-xs btn-green shrink-0",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🍳" }),
              " 义卖摆摊（卖 1 份料理）",
            ],
          }),
        ],
      }),
    ],
  });
}

function BusinessEventSection({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#c8e6c9] bg-[#f1f8e9] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#2e7d32]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🎉" }),
          " 商业活动（自出资金 + 材料）",
        ],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#558b2f]",
        children: [
          "花 ¥200 + 面粉×5、白糖×3、鸡蛋×2，请政府帮忙办一场商业活动：接下来 ",
          BUSINESS_EVENT_MIN_DAYS,
          " 天，每天额外 +",
          BUSINESS_EVENT_MAX_DAYS,
          " 客流。当前加成剩余",
          " ",
          jsxRuntime.jsx("span", { className: "num", children: n.commercialBoostDays ?? 0 }),
          " 天。",
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-commercial-event",
        onClick: e.onCommercial,
        disabled: n.coins < 200,
        className: "btn-chunky btn-xs btn-green mt-2",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🎊" }),
          " 举办商业活动（¥200 + 面粉5·白糖3·鸡蛋2）",
        ],
      }),
    ],
  });
}

function NightMarketPermitSection({ ctx: e }) {
  const { state: n } = e,
    s = getPermitStatus(n),
    a = s === "valid",
    o = n.nightMarketTruck === !0,
    l = o && n.truckFeePaidMonth === getYearMonthKey(n);
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#ffcc80] bg-[#fffaf3] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#6b4226]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🌃" }), " 夜市摆摊资格"],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏮" }),
          " 休息日（周六/周日）的晚上，广场会摆起夜市。想摆摊得先办资格，再买一辆餐车——两样齐备，夜市夜 18 点后就能去广场开张。资格按游戏自然月有效（每月 ¥",
          js,
          "），下个月起需重新办理；餐车一次性购买、长期有效。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-2 flex flex-wrap items-center gap-2",
        children: [
          jsxRuntime.jsx("span", {
            className:
              "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
            children: a ? "✅ 本月资格有效" : s === "expired" ? "⏰ 本月资格已过期" : "未办资格",
          }),
          jsxRuntime.jsx("span", {
            className:
              "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
            children: o ? "🚚 已购餐车" : "未购餐车",
          }),
          jsxRuntime.jsx("span", {
            className:
              "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
            children: o ? (l ? "✅ 本月餐车费已缴" : "⏰ 本月餐车费待缴") : `餐车月费 ¥${dc}`,
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-night-market-permit",
            onClick: e.onNightMarketPermit,
            disabled: a || n.coins < js,
            className: "btn-chunky btn-xs btn-orange shrink-0",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "📋" }),
              " ",
              s === "expired" ? `重新办理 ¥${js}` : `办理资格 ¥${js}`,
            ],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-night-market-truck",
            onClick: e.onNightMarketTruck,
            disabled: !a || o || n.coins < bi,
            className: "btn-chunky btn-xs btn-green shrink-0",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚚" }), " 购买餐车 ¥", bi],
          }),
        ],
      }),
      !a &&
        s === "expired" &&
        jsxRuntime.jsxs("p", {
          className: "mt-1.5 text-[10px] font-bold leading-relaxed text-[#c62828]",
          children: ["⏰ 上个月办的资格已过期，点「重新办理 ¥", js, "」续办，本月底前都有效。"],
        }),
      o &&
        jsxRuntime.jsxs("p", {
          className: "mt-1.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children: [
            "🚚 餐车持有者每月固定支出：维护费 ¥",
            Ec,
            " + 水电费 ¥",
            Ic,
            "（共 ¥",
            dc,
            "），进入新月份第一天自动扣缴；金币不足会先记账，不会扣成负数。",
          ],
        }),
    ],
  });
}

function RookieSupportSection({ ctx: e }) {
  const { state: n } = e,
    s = getMonthsSinceStart(n),
    a = s > 12,
    o = hasClaimedMonthlySubsidy(n);
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#a5d6a7] bg-[#e8f5e9] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#2e5d3a]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "💴" }), " 新人店主扶持计划"],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#4e7a57]",
        children: [
          "开店第一年，市政府每月补贴 ",
          jsxRuntime.jsx("strong", { children: "¥800" }),
          "，来柜台找书记员领取就行。现在是开店第 ",
          s,
          " 个月。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-2 flex flex-wrap items-center gap-2",
        children: [
          jsxRuntime.jsx("span", {
            className:
              "rounded-full bg-[#c8e6c9] px-2 py-0.5 text-[10px] font-black text-[#2e5d3a]",
            children: a ? "✅ 扶持计划已结束" : o ? "✅ 本月已领" : `第 ${s}/12 个月可领`,
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-claim-subsidy",
            onClick: () => {
              const l = claimMonthlySubsidy(n);
              e.commit(l.state, l.message, l.ok ? "success" : "error");
            },
            disabled: a || o,
            className: "btn-chunky btn-xs btn-green shrink-0",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "💰" }), " 领取本月补贴 ¥800"],
          }),
        ],
      }),
    ],
  });
}

const TUTORIAL_STEPS = [
  {
    key: "meet_mayor",
    title: "向镇长报到",
    emoji: "🏛️",
    desc: "镇长亲自在市政府等你报到，把《新人店主手册》交到你手上",
  },
  {
    key: "first_bake",
    title: "学烤第一炉",
    emoji: "🧁",
    desc: "镇长带你去店里认门，托师傅教你烤出第一炉蛋糕",
  },
  {
    key: "subsidy",
    title: "办扶持补贴",
    emoji: "💴",
    desc: "书记员替你办妥新人扶持计划，每月 800 元补贴，还叮嘱你别忘了来领",
  },
];

function TutorialSection({ ctx: e }) {
  const { state: n } = e,
    s = n.tutorial ?? {},
    a = s.tutorial_done === !0;
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#b39ddb] bg-[#f3e5f5] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#4a2c8a]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧭" }), " 新手引导 · 镇长带路"],
      }),
      a
        ? jsxRuntime.jsx("p", {
            className: "mt-1 text-[10px] font-bold leading-relaxed text-[#7b5aa6]",
            children:
              "✅ 新手引导全部完成！市政府随时欢迎你，镇长和书记员都盼着你的小店越开越红火！",
          })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("p", {
                className: "mt-1 text-[10px] font-bold leading-relaxed text-[#7b5aa6]",
                children: "市长寄语：开店头几天，镇长和书记员都惦记着你，跟着一步步认门学手艺吧！",
              }),
              jsxRuntime.jsx("div", {
                className: "mt-2 space-y-1.5",
                children: TUTORIAL_STEPS.map((o, l) => {
                  const c = s[o.key] === !0;
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-2",
                      children: [
                        jsxRuntime.jsx("span", {
                          className:
                            "rounded-full bg-[#e1bee7] px-2 py-0.5 text-[10px] font-black text-[#6a3d9a]",
                          children: c ? "✅" : l + 1,
                        }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-black text-[#4a2c8a]",
                              children: [o.emoji, " ", o.title],
                            }),
                            jsxRuntime.jsx("p", {
                              className: "text-[9px] font-bold leading-tight text-[#9c7cc0]",
                              children: o.desc,
                            }),
                          ],
                        }),
                        !c &&
                          jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-tutorial-${o.key}`,
                            onClick: () => {
                              let u = markTutorialDone(n, o.key).state;
                              (TUTORIAL_STEPS.every((g) => {
                                var x;
                                return (
                                  g.key === o.key ||
                                  ((x = u.tutorial) == null ? void 0 : x[g.key]) === !0
                                );
                              }) && (u = markTutorialDone(u, "tutorial_done").state),
                                e.commit(u, "引导进度已更新", "info"));
                            },
                            className: "btn-chunky btn-xs btn-orange shrink-0",
                            children: "完成",
                          }),
                      ],
                    },
                    o.key,
                  );
                }),
              }),
            ],
          }),
    ],
  });
}

function FoodStreetInvestSection({ ctx: e }) {
  const { state: n } = e,
    s = Math.min(100, Math.max(0, Math.floor(n.foodStreetInvest ?? 0))),
    a = isFoodStreetBuilt(n),
    o = Math.ceil((100 - s) / FOOD_STREET_INVEST_STEP);
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl border-2 border-[#ffe0b2] bg-[#fff8f0] p-2.5",
    children: [
      jsxRuntime.jsxs("p", {
        className: "text-xs font-black text-[#e65100]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏗️" }), " 投资美食街"],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#a15c22]",
        children: [
          "市政府计划把镇西空地建成美食街：每期投资 ¥",
          FOOD_STREET_INVEST_COST,
          " 推进 ",
          FOOD_STREET_INVEST_STEP,
          "%，",
          a
            ? "已全部建成！"
            : `累计进度满 100% 后正式开放，小镇地图会新增「美食街」。当前已投 ${s}%，还差 ${o} 期。`,
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "mt-2 h-2.5 w-full overflow-hidden rounded-full bg-[#f0e0cc]",
        children: jsxRuntime.jsx("div", {
          className:
            "h-full rounded-full bg-gradient-to-r from-[#ffab40] to-[#e65100] transition-all",
          style: { width: `${s}%` },
          "data-testid": "foodstreet-progress-bar",
        }),
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-right text-[10px] font-black text-[#e65100]",
        children: [
          a ? jsxRuntime.jsx("span", { className: "emoji", children: "🎉" }) : null,
          " ",
          s,
          "%",
          a ? " · 已建成" : "",
        ],
      }),
      !a &&
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-foodstreet-invest",
          onClick: () => {
            const l = investFoodStreet(n);
            e.commit(l.state, l.message, l.ok ? "success" : "error");
          },
          disabled: n.coins < FOOD_STREET_INVEST_COST,
          className: "btn-chunky btn-xs btn-orange mt-2",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "💰" }),
            " 投资一期（¥",
            FOOD_STREET_INVEST_COST,
            " · +",
            FOOD_STREET_INVEST_STEP,
            "%）",
          ],
        }),
      a &&
        jsxRuntime.jsxs("p", {
          className:
            "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🍜" }),
            " 美食街已建成开放：回小镇地图街道总览，点「美食街」就能进去逛。",
          ],
        }),
    ],
  });
}

function CityHallPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#d7ccc8] bg-[#f5f0eb] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6d4c41]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏛️" }),
          " 市政府是小镇的政务中心：可以改名、改姓、改店名；政府每隔约半年举办一次义卖活动，报名后能在义卖期摆摊卖家常料理；还能自己出资金和材料，请政府帮忙举办商业活动。新开店的店主还有「新人店主扶持计划」，镇长、秘书白天都在这里办公。",
        ],
      }),
      jsxRuntime.jsx(TutorialSection, { ctx: e }),
      jsxRuntime.jsx(RookieSupportSection, { ctx: e }),
      jsxRuntime.jsx(RenameOfficeSection, { ctx: e }),
      jsxRuntime.jsx(CharitySaleSection, { ctx: e }),
      jsxRuntime.jsx(BusinessEventSection, { ctx: e }),
      jsxRuntime.jsx(FoodStreetInvestSection, { ctx: e }),
      jsxRuntime.jsx(NightMarketPermitSection, { ctx: e }),
      e.hereNpcsAt("government").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("government"),
          locId: "government",
          badgeText: "🏛️ 市政府",
        }),
    ],
  });
}

function ShelterEntryPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#c8e6c9] bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#2e7d32]",
        children: [
          "友好度 ",
          n.shelterFriendliness ?? 0,
          "/200 · 今日捐赠 ",
          n.shelterDonatedToday ?? 0,
          "/",
          SHELTER_DONATE_LIMIT,
          " 份；友好度到 60 成为志愿者，140 成为荣誉志愿者。收容所对外开放，志愿者们每周有 2-3 天来当值，其余时间在镇上各自的家里；想找他们，有空常来收容所或居民区走走。",
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-map-enter-shelter",
        onClick: e.onEnterShelter,
        className: "btn-chunky btn-sm btn-green w-full",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🐶" }),
          " 进入动物收容所（捐赠 · 志愿活动 · 认识伙伴）",
        ],
      }),
    ],
  });
}

function HomeEntryPage({ ctx: e }) {
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f0dcc0] bg-[#fbf3e4] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }),
          " 家里是休息的小天地：2F 卧室睡觉恢复精力、梳洗化妆提升魅力，3F 书房看书涨知识，还能摆家具、在阳台种花。",
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-map-go-home",
        onClick: e.onGoHome,
        className: "btn-chunky btn-sm btn-brown w-full",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🛏️" }),
          " 回小楼 · 卧室（睡觉 · 梳妆 · 看书）",
        ],
      }),
    ],
  });
}

function ShopEntryPage({ ctx: e }) {
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f5b0c2] bg-[#fff0f3] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b3415e]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🍰" }),
          " 蛋糕店是主业：开店接待客人卖点心、烘焙研发新配方，店里还能请员工帮忙看店。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "grid grid-cols-2 gap-2",
        children: [
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-map-go-shop",
            onClick: e.onGoShop,
            className: "btn-chunky btn-sm btn-pink w-full",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛒" }), " 回小楼 · 店面"],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-map-go-bake",
            onClick: e.onGoBake,
            className: "btn-chunky btn-sm btn-yellow w-full",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧁" }), " 回小楼 · 厨房"],
          }),
        ],
      }),
    ],
  });
}

function AmusementParkPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#f8bbd0] bg-[#fdf2f6] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#ad1457]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🎡" }),
          " 欢乐街的游乐园：摩天轮、旋转木马、过山车、碰碰车随便玩。玩项目要花钱、花时间，但心情会大涨，周末常能遇到结伴来玩的学生们。",
        ],
      }),
      AMUSEMENT_RIDES.map((s) =>
        jsxRuntime.jsxs(
          "div",
          {
            className: "flex gap-3 rounded-xl border-2 border-[#f8bbd0] bg-[#fffdf8] p-2.5",
            children: [
              jsxRuntime.jsx("div", {
                className: "flex w-[16%] shrink-0 items-center justify-center",
                children: jsxRuntime.jsx("span", {
                  className: "text-2xl",
                  children: jsxRuntime.jsx("span", { className: "emoji", children: s.emoji }),
                }),
              }),
              jsxRuntime.jsxs("div", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsxs("div", {
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "text-sm font-black text-[#ad1457]",
                        children: s.name,
                      }),
                      jsxRuntime.jsx("p", {
                        className: "text-[10px] font-bold text-[#b08a6a]",
                        children: s.desc,
                      }),
                      jsxRuntime.jsxs("p", {
                        className: "text-[10px] font-bold text-[#6b4226]",
                        children: [
                          "¥",
                          s.cost,
                          " · 耗时 ",
                          s.minutes,
                          " 分钟 · 心情 +",
                          s.mood,
                          " · 精力 ",
                          s.energy >= 0 ? "+" : "",
                          s.energy,
                          " · 饱食 -",
                          Math.abs(s.satiety),
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("div", {
                    className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                    children: jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": `btn-amusement-${s.id}`,
                      onClick: () => {
                        const a = playAmusementRide(n, s.id);
                        e.commit(a.state, a.message, a.ok ? "success" : "error");
                      },
                      className: "btn-chunky btn-xs btn-pink",
                      children: "玩一次",
                    }),
                  }),
                ],
              }),
            ],
          },
          s.id,
        ),
      ),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 玩游乐项目会消耗精力和饱食度，玩累了记得回家休息或去快餐店吃一顿。",
        ],
      }),
      e.hereNpcsAt("amusement").length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, {
          ctx: e.ctx,
          npcIds: e.hereNpcsAt("amusement"),
          locId: "amusement",
          badgeText: "🎡 游乐园",
        }),
    ],
  });
}

function MapNodeCard({ mapLocInfo: e, state: n }) {
  return jsxRuntime.jsxs("div", {
    className: `town-node-${e.id} rounded-2xl border-2 p-3 text-center`,
    children: [
      jsxRuntime.jsx("p", {
        className: "text-2xl",
        children: jsxRuntime.jsx("span", { className: "emoji", children: e.emoji }),
      }),
      jsxRuntime.jsx("p", { className: "mt-0.5 text-sm font-black text-[#4a2c17]", children: e.name }),
      jsxRuntime.jsx("p", {
        className: "mt-0.5 text-[11px] font-bold leading-relaxed text-[#b08a6a]",
        children: e.desc,
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1.5 flex flex-wrap items-center justify-center gap-1.5",
        children: [
          jsxRuntime.jsxs("span", {
            className:
              "rounded-full bg-[#fff8e1] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🕐" }), " ", formatHourShort(n.hour)],
          }),
          jsxRuntime.jsx("span", {
            className: `rounded-full px-2 py-0.5 text-[10px] font-black ${e.zone === "public" ? "bg-[#e8f5e9] text-[#2e7d32]" : "bg-[#fdecea] text-[#b3415e]"}`,
            children:
              e.zone === "public"
                ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🟢" }),
                      " 公共区域 · 可自由进出",
                    ],
                  })
                : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🔒" }),
                      " 私人区域 · 需先认识住户",
                    ],
                  }),
          }),
        ],
      }),
    ],
  });
}

function FestivalHostBanner({ ctx: e, mapLoc: n }) {
  const { state: s } = e,
    a = getFestivalByDay(s.day);
  if (
    !a ||
    !(n === a.hostPlace || (a.hostPlace === "street" && (n === "eaststreet" || n === "weststreet")))
  )
    return null;
  const l = e.hereNpcsAt(a.hostPlace),
    c = ACTION_GROUPS[festivalEventGroupOf(a.festivalId)];
  return jsxRuntime.jsxs("div", {
    className:
      "space-y-2 rounded-2xl border-2 border-[#ff8a65] bg-gradient-to-br from-[#fff3e0] to-[#ffe0b2] p-2.5",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-2xl", children: a.emoji }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-sm font-black text-[#4a2c17]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🎪" }),
                  " 今日节日会场：",
                  a.name,
                ],
              }),
              jsxRuntime.jsx("p", {
                className: "text-[10px] font-bold leading-relaxed text-[#8a6a4a]",
                children: a.desc,
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "space-y-1.5",
        children: a.activities.map((u) =>
          jsxRuntime.jsxs(
            "div",
            {
              className: "flex gap-2 rounded-xl border-2 border-[#ffcc80] bg-[#fffdf8] p-2",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex w-[20%] shrink-0 items-center justify-center",
                  children: jsxRuntime.jsx("span", { className: "emoji text-lg", children: u.emoji }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsx("p", {
                          className: "text-[11px] font-black text-[#4a2c17]",
                          children: u.name,
                        }),
                        jsxRuntime.jsx("p", { className: "text-[10px] text-[#b08a6a]", children: u.desc }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[9px] font-bold text-[#6b4226]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                            u.energy,
                            " 精力 · ",
                            jsxRuntime.jsx("span", { className: "emoji", children: "🕐" }),
                            u.minutes,
                            " 分钟",
                            u.mood > 0 ? ` · 心情 +${u.mood}` : "",
                            u.health > 0 ? ` · 健康 +${u.health}` : "",
                          ],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-festival-activity-${u.id}`,
                        onClick: () => e.onFestivalActivity(u.id),
                        disabled: s.energy < u.energy,
                        className: "btn-chunky btn-xs btn-brown",
                        children: "参加",
                      }),
                    }),
                  ],
                }),
              ],
            },
            u.id,
          ),
        ),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🚦" }),
          " 节日伙伴按 12 种通用模式行动，主模式「",
          (c == null ? void 0 : c.name) ?? "过节",
          "」；每处地点最多 ",
          GROUP_EVENT_MIN,
          " 人，满了会自动分流到别的公共地点，不会挤成一团。",
        ],
      }),
      l.length > 0 &&
        jsxRuntime.jsx(NpcGroupStrip, { ctx: e.ctx, npcIds: l, locId: a.hostPlace, badgeText: `🎪 ${a.name}` }),
    ],
  });
}

const MAP_NODE_POSITIONS = {
  binhe: { x: "34%", y: "72%" },
  xuelu: { x: "13%", y: "58%" },
  zhengwu: { x: "55%", y: "9%" },
  anjuan: { x: "12%", y: "33%" },
  tianyuan: { x: "74%", y: "80%" },
  qingcao: { x: "87%", y: "30%" },
  zhongyang: { x: "49%", y: "36%" },
  shangjie: { x: "26%", y: "47%" },
  huanle: { x: "68%", y: "58%" },
};

function TownMapPanel({ ctx: e, onOpenFoodStreet: n }) {
  const s = isFoodStreetBuilt(e.state);
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-3",
      children: [
        jsxRuntime.jsxs("p", {
          className:
            "rounded-xl border-2 border-[#a5d6a7] bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#2e7d32]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }),
            " 小镇按街道分区：点绿色街道卡片进分区选地点；商店街、欢乐街也都在这张地图上。",
          ],
        }),
        jsxRuntime.jsxs("div", {
          className:
            "town-map relative w-full overflow-hidden rounded-2xl border-2 border-[#a5d6a7]/70 shadow-inner",
          style: { height: 470 },
          "data-testid": "town-minimap-overview",
          children: [
            jsxRuntime.jsxs("svg", {
              className: "town-minimap-river pointer-events-none absolute inset-0 h-full w-full",
              viewBox: "0 0 100 100",
              preserveAspectRatio: "none",
              "aria-hidden": "true",
              children: [
                jsxRuntime.jsx("path", {
                  className: "river-main",
                  d: "M-8 112 C 16 100, 26 86, 44 80 C 60 76, 72 68, 108 62",
                  fill: "none",
                  strokeWidth: "7",
                  strokeLinecap: "round",
                  opacity: "0.8",
                }),
                jsxRuntime.jsx("path", {
                  className: "river-line",
                  d: "M-8 112 C 16 100, 26 86, 44 80 C 60 76, 72 68, 108 62",
                  fill: "none",
                  strokeWidth: "2",
                  strokeDasharray: "3 2.4",
                  strokeLinecap: "round",
                  opacity: "0.65",
                }),
              ],
            }),
            jsxRuntime.jsx("div", {
              className:
                "town-road town-road-h pointer-events-none absolute left-0 right-0 top-[30%]",
            }),
            jsxRuntime.jsx("div", {
              className: "town-road town-road-v pointer-events-none absolute left-[46%] top-0",
              style: { height: "72%" },
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-lg opacity-70",
              style: { left: "1%", top: "1%" },
              children: "⛰️",
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-sm opacity-75",
              style: { left: "16%", top: "13%" },
              children: "🌳",
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-sm opacity-75",
              style: { left: "69%", top: "15%" },
              children: "🌳",
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-sm opacity-70",
              style: { left: "58%", top: "86%" },
              children: "🌾",
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-sm opacity-75",
              style: { left: "88%", top: "87%" },
              children: "🌳",
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-xs opacity-70",
              style: { left: "30%", top: "86%" },
              children: "🦆",
            }),
            MAP_DISTRICTS.map((a) => {
              const o = MAP_NODE_POSITIONS[a.id] ?? { x: a.x, y: a.y };
              return jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `btn-street-overview-${a.id}`,
                  "aria-label": `${a.name}，${a.places.length} 处地点`,
                  onClick: () => e.onTravel(a.id),
                  className:
                    "town-node town-node-streets absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border-2 px-1 py-1 text-center shadow-sm active:scale-95",
                  style: { left: o.x, top: o.y, width: "21%" },
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "emoji text-base leading-none drop-shadow-sm",
                      children: a.emoji,
                    }),
                    jsxRuntime.jsx("span", {
                      className:
                        "mt-0.5 w-full truncate text-[9px] font-black leading-tight text-[#2e7d32]",
                      children: a.name,
                    }),
                  ],
                },
                a.id,
              );
            }),
            jsxRuntime.jsx(FireflyLayer, { hour: e.state.hour }),
          ],
        }),
        jsxRuntime.jsx("div", {
          className:
            "flex flex-wrap items-center gap-x-3 gap-y-1 px-0.5 text-[9px] font-bold text-[#8a6a4a]",
          children: jsxRuntime.jsxs("span", {
            className: "flex items-center gap-1",
            children: [
              jsxRuntime.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-[#4e9a58]" }),
              " 街道分区 · 点击进入",
            ],
          }),
        }),
        s &&
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-open-foodstreet",
            onClick: n,
            className: "btn-chunky btn-sm btn-orange w-full",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🍜" }),
              " 美食街（已建成）· 去逛逛",
            ],
          }),
        jsxRuntime.jsxs("p", {
          className:
            "rounded-xl border-2 border-[#f0dcc0] bg-[#fffaf3] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
            " 商店街点进去就是东西店铺街；游乐园在欢乐街；农贸市场、郊外菜园、郊外果园在镇郊，要先备好公交卡、小三轮或私家车才能去。听说市政府最近在筹办「投资美食街」，投资进度满 100% 就会新增美食街地图。",
          ],
        }),
      ],
    }),
  );
}

function NpcHomesList({ onGoLocation: e }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsxs("p", {
          className: "mb-1.5 text-sm font-black text-[#6b4226]",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }), " 伙伴们的住处"],
        }),
        jsxRuntime.jsxs("p", {
          className:
            "mb-2 rounded-xl bg-[#fbf3e4] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#6b4226]",
          children: [
            "伙伴们不住在商店街啦：普通居民住在",
            jsxRuntime.jsx("span", { className: "emoji", children: "🏘️" }),
            "居民区（按小区细分），也有人住在",
            jsxRuntime.jsx("span", { className: "emoji", children: "🏰" }),
            "别墅区或",
            jsxRuntime.jsx("span", { className: "emoji", children: "🏫" }),
            "学校宿舍；收容所的志愿者们在镇上有自己的家，分布在各个小区，每周只有两三天去收容所当值。去小镇地图上拜访他们吧！",
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "flex flex-wrap gap-1.5",
          children: ["residential", "villa", "school", "shelter"].map((n) => {
            const s = MAP_PLACES.find((a) => a.id === n);
            return jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                "data-testid": `btn-street-go-${n}`,
                onClick: () => e(n),
                className:
                  "rounded-full border-2 border-[#f0dcc0] bg-[#fffdf8] px-2.5 py-1 text-[11px] font-black text-[#6b4226] active:scale-95",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: s == null ? void 0 : s.emoji }),
                  " ",
                  s == null ? void 0 : s.name,
                ],
              },
              n,
            );
          }),
        }),
      ],
    }),
  );
}

function DistrictDetailPanel({ ctx: e, streetId: n }) {
  const s = MAP_DISTRICTS.find((c) => c.id === n),
    [a, o] = React.useState(!1);
  if (!s) return null;
  const l = s.places.map((c) => MAP_PLACES.find((u) => u.id === c)).filter((c) => !!c);
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-3",
      children: [
        jsxRuntime.jsxs("div", {
          className: "rounded-2xl border-2 border-[#a5d6a7] bg-[#f1f8e9] p-3 text-center",
          children: [
            jsxRuntime.jsx("p", {
              className: "text-2xl",
              children: jsxRuntime.jsx("span", { className: "emoji", children: s.emoji }),
            }),
            jsxRuntime.jsx("p", { className: "mt-0.5 text-sm font-black text-[#2e7d32]", children: s.name }),
            jsxRuntime.jsx("p", {
              className: "mt-0.5 text-[11px] font-bold leading-relaxed text-[#8d9c8d]",
              children: s.desc,
            }),
            jsxRuntime.jsxs("div", {
              className: "mt-1.5 flex flex-wrap items-center justify-center gap-1.5",
              children: [
                jsxRuntime.jsxs("span", {
                  className:
                    "rounded-full bg-[#fff8e1] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🕐" }),
                    " ",
                    formatHourShort(e.state.hour),
                  ],
                }),
                jsxRuntime.jsxs("span", {
                  className:
                    "rounded-full bg-[#e8f5e9] px-2 py-0.5 text-[10px] font-black text-[#2e7d32]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🟢" }),
                    " 公共区域 · 可自由进出",
                  ],
                }),
              ],
            }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1.5 text-xs font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "📍" }), " 这条街上的地点"],
            }),
            jsxRuntime.jsx("div", {
              className: "grid grid-cols-2 gap-2",
              children: l.map((c) =>
                jsxRuntime.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-testid": `btn-street-place-${c.id}`,
                    "aria-label": `前往${c.name}`,
                    onClick: () => e.onTravel(c.id),
                    className: `town-node-${c.id} flex flex-col items-start gap-0.5 rounded-2xl border-2 px-2.5 py-2 text-left shadow-sm active:scale-95`,
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-lg leading-none", children: c.emoji }),
                      jsxRuntime.jsx("span", {
                        className: "text-[11px] font-black text-[#4a2c17]",
                        children: c.name,
                      }),
                      jsxRuntime.jsx("span", {
                        className: "truncate text-[9px] font-bold text-[#b08a6a]",
                        children: c.tag,
                      }),
                    ],
                  },
                  c.id,
                ),
              ),
            }),
          ],
        }),
        n === "anjuan" &&
          jsxRuntime.jsxs("div", {
            className: "rounded-xl border-2 border-[#f0dcc0] bg-[#fffaf3] p-2",
            children: [
              jsxRuntime.jsx(CollapsibleHeader, {
                open: a,
                onToggle: () => o((c) => !c),
                title: "🏠 谁住哪儿",
                tone: "#6b4226",
                right: jsxRuntime.jsx("span", {
                  className: "text-[10px] font-bold text-[#b08a6a]",
                  children: "拜访伙伴住处",
                }),
              }),
              a && jsxRuntime.jsx(NpcHomesList, { onGoLocation: (c) => e.onTravel(c) }),
            ],
          }),
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-street-back-overview",
          onClick: () => e.onTravel("streets"),
          className: "btn-chunky btn-sm btn-brown w-full",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }), " ← 返回街道总览"],
        }),
      ],
    }),
  );
}
