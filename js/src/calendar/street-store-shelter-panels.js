function FastfoodStorePanel({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "fastfood", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#fff3e6] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#e65100]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🍜" }),
          " 街角快餐店是孙玉梅开的：现炒套餐管饱又实惠，赶时间填肚子首选。菜单上有六款现炒，天天不重样。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "space-y-2",
        children: FASTFOOD_MENU.map((s) =>
          jsxRuntime.jsxs(
            "div",
            {
              className: "flex gap-3 rounded-xl border-2 border-[#ffab91] bg-[#fffdf8] p-2.5",
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
                          className: "text-sm font-black text-[#e65100]",
                          children: s.name,
                        }),
                        jsxRuntime.jsx("p", {
                          className: "text-[10px] font-bold text-[#b08a6a]",
                          children: s.desc,
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[10px] font-bold text-[#6b4226]",
                          children: [
                            "饱食 +",
                            s.satiety,
                            " · 精力 +",
                            s.energy,
                            " · 心情 +",
                            s.mood,
                          ],
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[10px] font-bold text-[#6b4226]",
                          children: [
                            "¥",
                            s.cost,
                            " · 耗时 30 分钟 · 当前饱食 ",
                            n.satiety ?? 70,
                            "/100",
                          ],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-fastfood-eat-${s.id}`,
                        onClick: () => {
                          const a = eatFastfood(n, s.id);
                          e.commit(a.state, a.message, a.ok ? "success" : "error");
                        },
                        className: "btn-chunky btn-xs btn-yellow",
                        children: "吃一份",
                      }),
                    }),
                  ],
                }),
              ],
            },
            s.id,
          ),
        ),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 饱食度满的时候吃不下东西，先饿一饿再来；快餐店全天营业，什么时候来都有热乎的。",
        ],
      }),
    ],
  });
}

function FruitStorePanel({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "fruit", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#f1f8e9] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#2e7d32]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🍉" }),
          " 水果摊是镇上的水果铺，老板和熟客常来帮忙：现货 85 折，比食材商店更划算，当季水果最多。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: INGREDIENTS_LIST
          .filter((s) => s.category === "fruit" && !s.source)
          .map((s) => {
            var c;
            const a = s.season === "all" || s.season === e.seasonName,
              o = ((c = n.ingredients[s.id]) == null ? void 0 : c.qty) ?? 0,
              l = Math.ceil(s.price * 0.85);
            return jsxRuntime.jsxs(
              "div",
              {
                className: `flex flex-col rounded-xl bg-[#f1f8e9] px-2 py-1.5 ${a ? "" : "opacity-50"}`,
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-lg", children: s.emoji }),
                      jsxRuntime.jsxs("span", {
                        className: "num text-[11px] font-bold text-[#558b2f]",
                        children: ["x", o],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-0.5 truncate text-sm font-bold text-[#2e7d32]",
                    children: s.name,
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[10px] font-bold text-[#c62828]",
                    children: ["¥", l, "（85折）"],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": `btn-fruit-buy-${s.id}`,
                    onClick: () => {
                      const u = buyIngredientDiscounted(n, s.id);
                      e.commit(u.state, u.message, u.ok ? "success" : "error");
                    },
                    disabled: !a || n.coins < l,
                    className: "btn-chunky btn-xs btn-green mt-1 w-full",
                    children: "买",
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

function VegStorePanel({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "veg", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#f7f9ee] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#4e6b2c]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🥬" }),
          " 菜市场是熟悉的菜农们的摊位：蔬菜现货 85 折，清晨最新鲜，做家常菜和研发料理都划算。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: INGREDIENTS_LIST
          .filter((s) => s.category === "veg" && !s.source)
          .map((s) => {
            var c;
            const a = s.season === "all" || s.season === e.seasonName,
              o = ((c = n.ingredients[s.id]) == null ? void 0 : c.qty) ?? 0,
              l = Math.ceil(s.price * 0.85);
            return jsxRuntime.jsxs(
              "div",
              {
                className: `flex flex-col rounded-xl bg-[#f7f9ee] px-2 py-1.5 ${a ? "" : "opacity-50"}`,
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji text-lg", children: s.emoji }),
                      jsxRuntime.jsxs("span", {
                        className: "num text-[11px] font-bold text-[#6b8e3a]",
                        children: ["x", o],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-0.5 truncate text-sm font-bold text-[#4e6b2c]",
                    children: s.name,
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[10px] font-bold text-[#c62828]",
                    children: ["¥", l, "（85折）"],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": `btn-veg-buy-${s.id}`,
                    onClick: () => {
                      const u = buyIngredientDiscounted(n, s.id);
                      e.commit(u.state, u.message, u.ok ? "success" : "error");
                    },
                    disabled: !a || n.coins < l,
                    className: "btn-chunky btn-xs btn-yellow mt-1 w-full",
                    children: "买",
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

const STORE_LABELS = {
  grocery: "食材商店",
  clothes: "服装店",
  salon: "理发店",
  rod: "鱼竿店",
  furniture: "家具店",
  fabric: "布料行",
  bookstore: "书店",
  supermarket: "综合超市",
  suji: "苏记甜品",
  bank: "银行",
  flower: "花店",
  fastfood: "快餐店",
  fruit: "水果摊",
  veg: "菜市场",
};

function StreetViewPanel(e) {
  const { state: n, open: s, onClose: a, view: o, onView: l } = e,
    c = {
      state: n,
      commit: e.commit,
      ctx: e.ctx,
      openCats: e.openCats,
      onOpenCats: e.onOpenCats,
      seasonName: e.seasonName,
      charm: e.charm,
      outfitTotal: e.outfitTotal,
      hairDef: e.hairDef,
      shopCat: e.shopCat,
      onShopCat: e.onShopCat,
      outfitCat: e.outfitCat,
      onOutfitCat: e.onOutfitCat,
      onHire: e.onHire,
      onBuy: e.onBuy,
      onBuyOutfit: e.onBuyOutfit,
      onEquip: e.onEquip,
      onBuyHairstyle: e.onBuyHairstyle,
      onStyleHair: e.onStyleHair,
      onBuyRod: e.onBuyRod,
      onBuyFurniture: e.onBuyFurniture,
      onBuyMaterial: e.onBuyMaterial,
      onBuyBook: e.onBuyBook,
      onBuyCookware: e.onBuyCookware,
      onPitchFlower: e.onPitchFlower,
    };
  return jsxRuntime.jsxs(Modal, {
    open: s,
    title: o === "street" ? "🏘️ 商店街" : `🏘️ 商店街 / ${STORE_LABELS[o] ?? ""}`,
    onClose: a,
    sheetClass: "modal-sheet-green",
    children: [
      o !== "street" &&
        jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": "btn-street-back",
          onClick: () => l("street"),
          className: "btn-chunky btn-xs btn-brown mb-2",
          children: "← 返回商店街",
        }),
      o === "street" &&
        jsxRuntime.jsxs("div", {
          className: "space-y-3",
          children: [
            jsxRuntime.jsxs("p", {
              className:
                "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🚶" }),
                " 东/西商店街的店铺请从小镇地图直接点卡片进店；这里保留街道快捷入口。",
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "grid grid-cols-2 gap-2",
              children: [
                jsxRuntime.jsxs("button", {
                  type: "button",
                  "data-testid": "btn-street-quick-east",
                  onClick: () => e.onGoLocation("eaststreet"),
                  className: "btn-chunky btn-sm btn-yellow w-full",
                  children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏪" }), " 去东商店街"],
                }),
                jsxRuntime.jsxs("button", {
                  type: "button",
                  "data-testid": "btn-street-quick-west",
                  onClick: () => e.onGoLocation("weststreet"),
                  className: "btn-chunky btn-sm btn-yellow w-full",
                  children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏪" }), " 去西商店街"],
                }),
              ],
            }),
          ],
        }),
      o === "grocery" && jsxRuntime.jsx(GroceryStorePanel, { ctx: c }),
      o === "clothes" && jsxRuntime.jsx(ClothesShopPage, { ctx: c }),
      o === "salon" && jsxRuntime.jsx(SalonPage, { ctx: c }),
      o === "rod" && jsxRuntime.jsx(RodShopPage, { ctx: c }),
      o === "furniture" && jsxRuntime.jsx(FurnitureShopPage, { ctx: c }),
      o === "fabric" && jsxRuntime.jsx(FabricShopPage, { ctx: c }),
      o === "bookstore" && jsxRuntime.jsx(BookstorePage, { ctx: c }),
      o === "supermarket" && jsxRuntime.jsx(SupermarketPage, { ctx: c }),
      o === "suji" && jsxRuntime.jsx(SujiShopPage, { ctx: c }),
      o === "bank" && jsxRuntime.jsx(BankPage, { ctx: c }),
      o === "flower" && jsxRuntime.jsx(FlowerShopPage, { ctx: c }),
      o === "fastfood" && jsxRuntime.jsx(FastfoodStorePanel, { ctx: c }),
      o === "fruit" && jsxRuntime.jsx(FruitStorePanel, { ctx: c }),
      o === "veg" && jsxRuntime.jsx(VegStorePanel, { ctx: c }),
    ],
  });
}

function StreetDialog({ state: e, commit: n, ctx: s, actions: a, open: o, onClose: l }) {
  return jsxRuntime.jsx(StreetViewPanel, {
    state: e,
    commit: n,
    ctx: s,
    open: o,
    onClose: l,
    view: a.streetView,
    onView: a.setStreetView,
    shopCat: a.shopCat,
    onShopCat: a.setShopCat,
    outfitCat: a.outfitCat,
    onOutfitCat: a.setOutfitCat,
    openCats: a.openCats,
    onOpenCats: a.setOpenCats,
    seasonName: a.seasonName,
    charm: a.charm,
    outfitTotal: a.outfitTotal,
    hairDef: a.hairDef,
    onHire: a.handleHire,
    onBuy: a.handleBuy,
    onBuyOutfit: a.handleBuyOutfit,
    onEquip: a.handleEquip,
    onBuyHairstyle: a.handleBuyHairstyle,
    onStyleHair: a.handleStyleHair,
    onBuyRod: a.handleBuyRod,
    onBuyFurniture: a.handleBuyFurniture,
    onBuyMaterial: a.handleBuyMaterial,
    onBuyBook: a.handleBuyBook,
    onBuyCookware: a.handleBuyCookware,
    onPitchFlower: a.handlePitchFlower,
    onGoLocation: (c) => {
      (a.setStreetOpen(!1), a.setMapLoc(c), a.setMapCat("read"), a.setMapOpen(!0));
    },
  });
}

function ShelterTierInfo({ state: e }) {
  const n = getShelterTierInfo(e);
  return jsxRuntime.jsxs("div", {
    className: "rounded-2xl bg-[#e8f5e9] p-3 text-center",
    children: [
      jsxRuntime.jsx("p", { className: "text-xs font-bold text-[#2e7d32]", children: "收容所友好度" }),
      jsxRuntime.jsxs("p", {
        className: "mt-0.5 text-2xl",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: n.emoji }), " ", n.label],
      }),
      jsxRuntime.jsxs("p", {
        className: "num text-sm font-black text-[#2e7d32]",
        children: [e.shelterFriendliness ?? 0, "/200"],
      }),
      jsxRuntime.jsx("div", {
        className: "bar-track mt-1.5",
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": n.progress,
        "aria-label": `收容所友好度 ${e.shelterFriendliness ?? 0}/200`,
        children: jsxRuntime.jsx("div", {
          className: "bar-fill",
          style: { width: `${n.progress}%`, background: "linear-gradient(90deg,#c8e6c9,#43a047)" },
        }),
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 text-[10px] font-bold leading-relaxed text-[#558b2f]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
          " 把多做的点心捐给小动物：只涨友好度、不涨声望。友好度到 60 会被邀请成为志愿者，140 成为荣誉志愿者，解锁更多有趣事件！",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1.5 flex items-center justify-between rounded-xl bg-[#fff3bf] px-2.5 py-1.5",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-black text-[#b8860b]",
            children: ["今日已捐赠 ", e.shelterDonatedToday ?? 0, "/", SHELTER_DONATE_LIMIT, " 份"],
          }),
          jsxRuntime.jsx("span", {
            className: "text-[10px] font-bold text-[#e65100]",
            children: "每份耗时 1 小时",
          }),
        ],
      }),
    ],
  });
}

function ShelterGateHint({ state: e, msg: n, onEvent: s }) {
  const a = shelterTier(e.shelterFriendliness ?? 0);
  return a < 1
    ? jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#fbf3e4] px-2.5 py-2 text-[11px] font-bold leading-relaxed text-[#8a6a4a]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🦺" }),
          " 还不是志愿者：友好度达到 60 时，收容所会正式邀请你成为志愿者，之后就能参加动物们的活动了。",
        ],
      })
    : jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#a5d6a7] bg-[#f1f8e9] p-2.5",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex items-center justify-between",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-sm font-black text-[#2e7d32]",
                children: segmentByEmoji(a >= 2 ? "🏅 荣誉志愿者" : "🦺 志愿者"),
              }),
              jsxRuntime.jsxs("span", {
                className: "text-[10px] font-bold text-[#558b2f]",
                children: ["今日活动 ", e.shelterEventsToday ?? 0, "/", SHELTER_EVENT_LIMIT],
              }),
            ],
          }),
          n &&
            jsxRuntime.jsxs("p", {
              className:
                "mt-1.5 rounded-lg bg-white/80 px-2 py-1.5 text-[11px] font-bold leading-relaxed text-[#2e7d32]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🐾" }), " ", n],
            }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-shelter-event",
            onClick: s,
            disabled: (e.shelterEventsToday ?? 0) >= SHELTER_EVENT_LIMIT || e.energy < 8,
            className: "btn-chunky btn-sm btn-green mt-2 w-full",
            children: (e.shelterEventsToday ?? 0) >= SHELTER_EVENT_LIMIT ? "今天玩够啦" : "陪小动物玩 ⚡8 精力",
          }),
        ],
      });
}

function ShelterDonateList({ state: e, onDonate: n }) {
  const s = e.products.filter((a) => a.quality !== "fail");
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 text-sm font-black text-[#4a2c17]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🍰" }),
          " 可捐赠的点心（失败品除外）",
        ],
      }),
      s.length === 0
        ? jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#fbf3e4] px-2.5 py-2 text-center text-[11px] font-bold text-[#b08a6a]",
            children: "背包里没有可捐赠的点心，先去小楼一楼厨房烘焙一些吧",
          })
        : jsxRuntime.jsx("div", {
            className: "grid grid-cols-2 gap-1.5",
            children: s.map((a) => {
              const o = RECIPE_RUNTIME_DATA[a.recipeId],
                l = QUALITY_META[a.quality],
                c = a.quality === "perfect" ? 6 : a.quality === "good" ? 4 : 2;
              return jsxRuntime.jsxs(
                "div",
                {
                  className: "flex flex-col rounded-xl bg-[#fbf3e4] p-2",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "text-lg",
                          children: (o == null ? void 0 : o.emoji) ?? "🍰",
                        }),
                        jsxRuntime.jsxs("span", {
                          className: `badge ${`badge-${a.quality}`}`,
                          children: [
                            (l == null ? void 0 : l.emoji) ?? "",
                            " ",
                            (l == null ? void 0 : l.label) ?? a.quality,
                          ],
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "mt-0.5 truncate text-xs font-black text-[#4a2c17]",
                      children: [(o == null ? void 0 : o.name) ?? "点心", " x", a.qty ?? 1],
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[9px] font-bold text-[#2e7d32]",
                      children: ["友好度 +", c],
                    }),
                    jsxRuntime.jsx("button", {
                      type: "button",
                      "data-testid": `btn-shelter-donate-${a.pid}`,
                      onClick: () => n(a.pid),
                      disabled: (e.shelterDonatedToday ?? 0) >= SHELTER_DONATE_LIMIT,
                      className: "btn-chunky btn-xs btn-green mt-1 w-full",
                      children: "捐赠",
                    }),
                  ],
                },
                a.pid,
              );
            }),
          }),
    ],
  });
}

function ShelterDialog(e) {
  const { state: n, open: s, onClose: a } = e,
    l = Object.keys(NPC_WORK_DAYS)
      .map((c) => NPC_RUNTIME_DATA[c])
      .filter((c) => !!c);
  return jsxRuntime.jsx(Modal, {
    open: s,
    title: "🐶 动物收容所",
    onClose: a,
    sheetClass: "modal-sheet-green",
    children: jsxRuntime.jsxs("div", {
      className: "space-y-3",
      children: [
        jsxRuntime.jsx(ShelterTierInfo, { state: n }),
        jsxRuntime.jsx(ShelterGateHint, { state: n, msg: e.msg, onEvent: e.onEvent }),
        jsxRuntime.jsxs("div", {
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1.5 text-sm font-black text-[#4a2c17]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🤝" }),
                " 收容所伙伴（可攻略）",
              ],
            }),
            jsxRuntime.jsx("p", {
              className:
                "mb-2 rounded-xl bg-[#e8f5e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#2e7d32]",
              children:
                "收容所里住着一群小动物，4 位志愿者每周有 2-3 天来当值，平时住在镇上各自的家里；还有几位伙伴住在镇郊别墅和学校宿舍，想认识他们就去对应地点逛逛。 先在这里打个招呼认识伙伴，之后就能在手机通讯录里聊天、送礼、约会。每位伙伴都珍藏了外国料理食谱：与 TA 的好感度 + 收容所友好度达标后，就会把食谱送给你！",
            }),
            jsxRuntime.jsx("div", {
              className: "space-y-2",
              children: l.map((c) =>
                jsxRuntime.jsx(
                  NpcDetailCard,
                  {
                    ctx: e.ctx,
                    npcId: c.id,
                    badgeText: "🦺 志愿者 · 每周三天值班",
                    locId: "shelter",
                  },
                  c.id,
                ),
              ),
            }),
          ],
        }),
        jsxRuntime.jsx(ShelterDonateList, { state: n, onDonate: e.onDonate }),
      ],
    }),
  });
}

function DialogueDialog(e) {
  const { dialogue: n, onClose: s } = e,
    a = ((n == null ? void 0 : n.text) ?? "").split(/\n+/).filter(Boolean);
  return jsxRuntime.jsxs(Modal, {
    open: n !== null,
    title: (n == null ? void 0 : n.title) ?? "",
    onClose: s,
    noUnderline: !0,
    wide: !0,
    children: [
      jsxRuntime.jsx("div", {
        className: "dialogue-card rounded-2xl bg-[#ffb74d] p-4",
        children:
          a.length > 1
            ? jsxRuntime.jsx("div", {
                className: "space-y-2.5",
                children: a.map((o, l) =>
                  jsxRuntime.jsx(
                    "p",
                    {
                      className:
                        "break-words whitespace-pre-wrap text-center text-lg font-bold leading-relaxed text-black",
                      children: segmentByEmoji(o),
                    },
                    l,
                  ),
                ),
              })
            : jsxRuntime.jsx("p", {
                className:
                  "break-words whitespace-pre-wrap text-center text-lg font-bold leading-relaxed text-black",
                children: segmentByEmoji((n == null ? void 0 : n.text) ?? ""),
              }),
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-4 flex justify-center gap-3",
        children: [
          jsxRuntime.jsx(SpeakButton, {
            text: (n == null ? void 0 : n.text) ?? "",
            testId: "btn-street-dialogue-speak",
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-street-dialogue-close",
            onClick: s,
            className: "btn-chunky btn-pink",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "✖" }), " 关闭"],
          }),
        ],
      }),
    ],
  });
}

function FestivalBanner({ state: e, onOpenVenue: n }) {
  const s = getActiveFestival(e.day),
    a = getFestivalByDay(e.day),
    o = getBirthdayNpcs(e);
  return !s && o.length === 0
    ? null
    : jsxRuntime.jsxs("div", {
        className: "mt-2 space-y-1.5",
        children: [
          s &&
            jsxRuntime.jsxs("div", {
              className: "rounded-xl border-2 border-[#ffcc80] bg-[#fff8e1] px-2.5 py-2",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between gap-2",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-black text-[#b8860b]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: s.emoji }),
                        " 今日节日：",
                        s.name,
                      ],
                    }),
                    jsxRuntime.jsx(SpeakButton, {
                      text: `今日节日：${s.name}。${s.desc}${s.tip ? `，${s.tip}` : ""}`,
                      label: "朗读",
                      testId: "btn-festival-speak",
                      className: "btn-xs shrink-0",
                    }),
                  ],
                }),
                jsxRuntime.jsxs("p", {
                  className: "text-[10px] font-bold leading-relaxed text-[#8a6a4a]",
                  children: [s.desc, s.tip ? `（${s.tip}）` : ""],
                }),
                a &&
                  n &&
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": "btn-open-festival-venue",
                    onClick: () => n(a.hostPlace),
                    className: "btn-chunky btn-xs btn-brown mt-1.5 w-full",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "🎪" }),
                      " 去节日会场：",
                      a.name,
                      "（",
                      PLACE_LABELS[a.hostPlace] ?? "小镇",
                      "）",
                    ],
                  }),
              ],
            }),
          o.length > 0 &&
            jsxRuntime.jsxs("div", {
              className: "rounded-xl border-2 border-[#f8bbd0] bg-[#fce4ec] px-2.5 py-2",
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between gap-2",
                  children: [
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] font-black text-[#c2185b]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🎂" }),
                        " 今天过生日的伙伴：",
                        o.map((l) => `${l.emoji}${l.name}`).join("、"),
                      ],
                    }),
                    jsxRuntime.jsx(SpeakButton, {
                      text: `今天过生日的伙伴：${o.map((l) => `${l.name}`).join("、")}。找到他们聊聊天送上祝福，生日当天送礼好感更高！`,
                      label: "朗读",
                      testId: "btn-birthday-speak",
                      className: "btn-xs shrink-0",
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "text-[10px] font-bold leading-relaxed text-[#ad1457]",
                  children: "找到 TA 聊聊天送上祝福，生日当天送礼好感更高！",
                }),
              ],
            }),
        ],
      });
}

function WeatherPanel({ state: e, onOpenMap: n }) {
  const s = WEATHER_TYPES[weatherOfDay(e.day)],
    [a, o] = React.useState(!1);
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card border-[#d9b98c]/40",
      style: { background: "linear-gradient(160deg,#fffdf8,#fdf6ea)" },
      children: [
        jsxRuntime.jsxs("div", {
          className: "flex items-center justify-between",
          children: [
            jsxRuntime.jsxs("p", {
              className: "font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }), " 小镇地图"],
            }),
            jsxRuntime.jsxs("span", {
              className:
                "rounded-full border-2 border-[#ffc53d] bg-[#fff8e1] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: s.emoji }),
                " ",
                s.label,
                " · ",
                jsxRuntime.jsx("span", { className: "emoji", children: "🕐" }),
                " ",
                formatHourShort(e.hour),
              ],
            }),
          ],
        }),
        jsxRuntime.jsx(FestivalBanner, { state: e, onOpenVenue: n }),
        jsxRuntime.jsxs("div", {
          className: "town-map relative mt-2 w-full overflow-hidden rounded-2xl",
          style: { aspectRatio: "16/11" },
          "data-testid": "town-minimap",
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
              style: { height: "62%" },
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-sm opacity-75",
              style: { left: "16%", top: "13%" },
              children: "🌳",
            }),
            jsxRuntime.jsx("span", {
              className: "emoji pointer-events-none absolute text-sm opacity-75",
              style: { left: "70%", top: "15%" },
              children: "🌳",
            }),
            MAP_DISTRICTS.map((l) =>
              jsxRuntime.jsxs(
                "div",
                {
                  "data-testid": `map-node-${l.id}`,
                  className: "absolute flex flex-col items-center justify-center text-center",
                  style: { left: l.x, top: l.y, width: "9%" },
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "emoji text-[15px] leading-none drop-shadow-sm",
                      children: l.emoji,
                    }),
                    jsxRuntime.jsx("span", {
                      className:
                        "mt-0.5 w-full truncate text-[8px] font-black leading-tight text-[#4a2c17]",
                      children: l.name,
                    }),
                  ],
                },
                l.id,
              ),
            ),
            jsxRuntime.jsx(FireflyLayer, { hour: e.hour }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2 space-y-1 text-[9px] font-bold text-[#8a6a4a]",
          children: [
            jsxRuntime.jsxs("div", {
              className: "flex flex-wrap items-center gap-x-3 gap-y-1",
              children: [
                jsxRuntime.jsxs("span", {
                  className: "flex items-center gap-1",
                  children: [
                    jsxRuntime.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-[#66bb6a]" }),
                    " 公共区域 · 可自由进出",
                  ],
                }),
                jsxRuntime.jsxs("span", {
                  className: "flex items-center gap-1",
                  children: [
                    jsxRuntime.jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-[#b0718a]" }),
                    " 私人区域 · 需先认识住户",
                  ],
                }),
              ],
            }),
            jsxRuntime.jsxs("p", {
              className: "leading-relaxed",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🎯" }),
                " 点击下方按钮打开小镇地图 · 先选街道，再进地点；进入地点可和在场伙伴聊天互动。",
              ],
            }),
          ],
        }),
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-open-town-map",
          onClick: () => n("streets"),
          className: "btn-chunky btn-sm btn-brown mt-2 w-full",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }),
            " 打开小镇地图 · 选择行动",
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-2 py-1",
          children: [
            jsxRuntime.jsx(CollapsibleHeader, {
              open: a,
              onToggle: () => o((l) => !l),
              title: "📌 玩法说明",
              tone: "#6b4226",
            }),
            a &&
              jsxRuntime.jsxs("div", {
                className: "space-y-1.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                children: [
                  jsxRuntime.jsx("p", {
                    children:
                      "小镇按街道分区：地图上先显示街道/大区，点进街道再选地点。滨河路有河边与图书馆，学府路是学校、广场中学与高中，政务街是市政府与医院，安居巷住着四个小区、苏记老宅与别墅区，田园路通农贸市场、菜园、果园与收容所，青草坡是公园，中央广场就是小镇广场；商店街点进去就是东西店铺街，欢乐街有游乐园，我家和蛋糕店从「回小楼」直达。进入地点的小地图里，能看到此刻在场的伙伴，可以聊天、送礼或伴钓。农贸市场、郊外菜园和郊外果园都在镇郊，要先备好公交卡、小三轮或私家车才能去。",
                  }),
                  jsxRuntime.jsxs("p", {
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
                      " 公园能锻炼、抓泥鳅；河边能散步、钓鱼，河鲜种类不少；图书馆在河畔，10-18 点开放借阅；广场听听歌、偶遇伙伴；店铺分东商店街和西商店街两条街——服装、家具、书店、银行在东街，甜品、水果菜市、超市花店在西街；海鲜要去农贸市场买，想逛郊外的自种菜园、自采果园，也得先备好公交卡/小三轮/私家车；身体不舒服可以去医院挂号看诊；伙伴们各住文苑小区、安康苑、梧桐里、苏记老宅和别墅区，也有伙伴住学校宿舍，收容所的志愿者每周有 2-3 天去当值、平时在镇上有自己的家——想认识他们，就去对应街道的地点上碰面；多做的点心可以送到动物收容所。",
                    ],
                  }),
                ],
              }),
          ],
        }),
      ],
    }),
  );
}

const MAP_LOCATION_ID_SET = new Set(MAP_PLACES.map((e) => e.id));

function TownPanelRoot({ state: e, commit: n, onGoTab: s, openReq: a }) {
  const o = StreetSection({ state: e, commit: n }),
    l = React.useRef(o);
  ((l.current = o),
    React.useEffect(() => {
      const u = (x) => {
          var y;
          const m = x.data;
          if (!m || m.type !== "frame:command" || m.command !== "town:open-map") return;
          const p = (y = m.payload) == null ? void 0 : y.loc;
          typeof p != "string" || !MAP_LOCATION_ID_SET.has(p) || l.current.openMapAt(p);
        },
        f = document.querySelector('iframe[data-testid="panel-frame-town"]'),
        g = (f == null ? void 0 : f.contentWindow) ?? window;
      return (g.addEventListener("message", u), () => g.removeEventListener("message", u));
    }, []),
    React.useEffect(() => {
      !a || a.token === 0 || (MAP_LOCATION_ID_SET.has(a.loc) && l.current.openMapAt(a.loc));
    }, [a]));
  const c = {
    state: e,
    handleMeet: o.handleMeet,
    handleBlockedMeet: o.handleBlockedMeet,
    handleEncounter: o.handleEncounter,
    handleGiveFlower: o.handleGiveFlower,
    handleClaimGift: o.handleClaimGift,
    toggleNpcDetail: o.toggleNpcDetail,
    npcDetailOpen: o.npcDetailOpen,
    setScheduleNpc: o.setScheduleNpc,
    setDialogue: o.setDialogue,
  };
  return renderWithSpeech(
    jsxRuntime.jsx("div", {
      className: "space-y-4",
      children: jsxRuntime.jsxs("div", {
        className: "town-view-green min-h-full rounded-2xl p-3",
        children: [
          s &&
            jsxRuntime.jsx("section", {
              className: "game-card border-[#ff6b81]/30",
              style: { background: "linear-gradient(135deg,#fff0f3,#ffe9ef)" },
              children: jsxRuntime.jsxs("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "min-w-0 flex-1",
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "font-black text-[#4a2c17]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }),
                          " 逛够了就回小楼",
                        ],
                      }),
                      jsxRuntime.jsx("p", {
                        className: "mt-0.5 text-[11px] font-bold text-[#b08a6a]",
                        children: "回一楼店面继续开店营业、整理货架，或去一楼厨房烘焙",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": "btn-town-back-shop",
                    "aria-label": "回店铺，回到小楼一楼店面",
                    onClick: () => {
                      (speak("回到小楼一楼店面"), s("home", "store"));
                    },
                    className: "btn-chunky btn-sm btn-brown shrink-0",
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "🚪" }), " 回店铺"],
                  }),
                ],
              }),
            }),
          jsxRuntime.jsx(WeatherPanel, { state: e, mapLoc: o.mapLoc, onOpenMap: o.openMapAt }),
          jsxRuntime.jsx(TownMapDialog, {
            state: e,
            commit: n,
            onGoTab: s,
            ctx: c,
            actions: o,
            open: o.mapOpen,
            onClose: () => o.setMapOpen(!1),
          }),
          jsxRuntime.jsx(StreetDialog, {
            state: e,
            commit: n,
            ctx: c,
            actions: o,
            open: o.streetOpen,
            onClose: () => o.setStreetOpen(!1),
          }),
          jsxRuntime.jsx(SuburbContainer, {
            state: e,
            commit: n,
            ctx: c,
            actions: o,
            open: o.suburbOpen,
            onClose: () => o.setSuburbOpen(!1),
          }),
          jsxRuntime.jsx(NightMarketContainer, {
            state: e,
            commit: n,
            ctx: c,
            actions: o,
            open: o.foodStreetOpen,
            onClose: () => o.setFoodStreetOpen(!1),
          }),
          jsxRuntime.jsx(ShelterDialog, {
            state: e,
            commit: n,
            ctx: c,
            open: o.shelterOpen,
            onClose: () => o.setShelterOpen(!1),
            msg: o.shelterMsg,
            onEvent: o.handleShelterEvent,
            onDonate: o.handleShelterDonate,
          }),
          jsxRuntime.jsx(DialogueDialog, { dialogue: o.dialogue, onClose: () => o.setDialogue(null) }),
        ],
      }),
    }),
  );
}

function ProgressBar({ label: e, emoji: n, value: s, color: a, extra: o }) {
  const l = Math.min(100, Math.max(0, s));
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl bg-[#fbf3e4] p-2.5",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#4a2c17]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: n }),
              " ",
              e,
              o &&
                jsxRuntime.jsx("span", {
                  className: "ml-1 text-[10px] font-bold text-[#b08a6a]",
                  children: o,
                }),
            ],
          }),
          jsxRuntime.jsxs("span", {
            className: "skill-num num text-xs font-black",
            style: { color: a },
            children: [l, "/100"],
          }),
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "bar-track mt-1",
        style: { height: 8 },
        children: jsxRuntime.jsx("div", {
          className: "bar-fill",
          style: { width: `${l}%`, background: `linear-gradient(90deg, ${a}66, ${a})` },
        }),
      }),
    ],
  });
}

function StatusCard({
  id: e,
  title: n,
  emoji: s,
  titleColor: a,
  badge: o,
  style: l,
  open: c,
  onToggle: u,
  children: f,
}) {
  const g = a ?? "#4a2c17";
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    style: l,
    children: [
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": `sec-toggle-${e}`,
        onClick: u,
        "aria-expanded": c,
        className: "flex w-full items-center gap-2 text-left active:scale-[0.99]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-xl leading-none", children: s }),
          jsxRuntime.jsx("span", {
            className: "min-w-0 flex-1",
            children: jsxRuntime.jsx("span", {
              className: "block truncate text-sm font-black",
              style: { color: g },
              children: n,
            }),
          }),
          o &&
            jsxRuntime.jsx("span", {
              className:
                "shrink-0 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
              children: o,
            }),
          jsxRuntime.jsx("span", {
            "aria-hidden": "true",
            className: `shrink-0 text-base font-black transition-transform duration-200 ${c ? "" : "-rotate-90"}`,
            style: { color: g },
            children: "▾",
          }),
        ],
      }),
      c && jsxRuntime.jsx("div", { className: "mt-2", children: f }),
    ],
  });
}

function AppearancePanel({ state: e }) {
  var a;
  const n = HAIRSTYLE_MAP[((a = e.hairstyle) == null ? void 0 : a.equipped) ?? ""],
    s = outfitBeautyBonus(e);
  return jsxRuntime.jsxs("div", {
    className: "mt-2 grid grid-cols-3 gap-1.5",
    children: [
      jsxRuntime.jsxs("div", {
        className: "rounded-xl bg-white/70 p-2 text-center",
        children: [
          jsxRuntime.jsx("p", { className: "text-[10px] font-bold text-[#b08a6a]", children: "当前发型" }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-lg",
            children: jsxRuntime.jsx("span", {
              className: "emoji",
              children: (n == null ? void 0 : n.emoji) ?? "💇",
            }),
          }),
          jsxRuntime.jsx("p", {
            className: "truncate text-[10px] font-black text-[#4a2c17]",
            children: (n == null ? void 0 : n.name) ?? "未设置",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl bg-white/70 p-2 text-center",
        children: [
          jsxRuntime.jsx("p", { className: "text-[10px] font-bold text-[#b08a6a]", children: "穿搭部位" }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-lg",
            children: jsxRuntime.jsx("span", { className: "emoji", children: "🧥" }),
          }),
          jsxRuntime.jsxs("p", {
            className: "text-[10px] font-black text-[#4a2c17]",
            children: [
              SLOT_ORDER.filter((o) => {
                var l, c;
                return (
                  (((c = (l = e.outfits) == null ? void 0 : l.equipped) == null ? void 0 : c[o]) ??
                    "") !== ""
                );
              }).length,
              "/",
              SLOT_ORDER.length,
              " 件",
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl bg-white/70 p-2 text-center",
        children: [
          jsxRuntime.jsx("p", { className: "text-[10px] font-bold text-[#b08a6a]", children: "穿搭魅力" }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-lg",
            children: jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
          }),
          jsxRuntime.jsxs("p", {
            className: "num text-[10px] font-black text-[#e04a63]",
            children: ["+", s],
          }),
        ],
      }),
    ],
  });
}
