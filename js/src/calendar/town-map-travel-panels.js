function buildPanelContext(e) {
  return {
    state: e.state,
    commit: e.commit,
    ctx: e.ctx,
    mapCat: e.mapCat,
    onMapCat: e.onMapCat,
    openCats: e.openCats,
    onOpenCats: e.onOpenCats,
    seasonName: e.seasonName,
    hereNpcsAt: (n) => Object.keys(SCHEDULE_COPY).filter((s) => getNpcLocationAt(s, e.state.hour, e.state.day).place === n),
    onFestivalActivity: e.onFestivalActivity,
    isCatOpen: (n, s) => e.openCats[`${n}-${s}`] ?? (s === e.mapCat || s === "here"),
    toggleCat: (n, s) => {
      const a = `${n}-${s}`;
      (e.onMapCat(s), e.onOpenCats((o) => ({ ...o, [a]: !(o[a] ?? s === e.mapCat) })));
    },
    toggleHereCat: (n) => {
      const s = `${n}-here`;
      e.onOpenCats((a) => ({ ...a, [s]: !(a[s] ?? !0) }));
    },
    marketGone: e.marketGone,
    onMarketGone: e.onMarketGone,
    gardenGone: e.gardenGone,
    onGardenGone: e.onGardenGone,
    orchardGone: e.orchardGone,
    onOrchardGone: e.onOrchardGone,
    renameName: e.renameName,
    onRenameName: e.onRenameName,
    renameShopName: e.renameShopName,
    onRenameShopName: e.onRenameShopName,
    onExercise: e.onExercise,
    onCatchLoach: e.onCatchLoach,
    onRiverGather: e.onRiverGather,
    onSellFlowerPlaza: e.onSellFlowerPlaza,
    onFish: e.onFish,
    onCompanionFish: e.onCompanionFish,
    onMakeBait: e.onMakeBait,
    onSetFishBait: e.onSetFishBait,
    onSellFish: e.onSellFish,
    onOrderFishCatch: e.onOrderFishCatch,
    onLibraryRead: e.onLibraryRead,
    onBuyTransport: e.onBuyTransport,
    onGoMarket: e.onGoMarket,
    onGoGarden: e.onGoGarden,
    onGoOrchard: e.onGoOrchard,
    onMarketBuy: e.onMarketBuy,
    onApplyCharity: e.onApplyCharity,
    onCharitySell: e.onCharitySell,
    onCommercial: e.onCommercial,
    onRenamePlayer: e.onRenamePlayer,
    onRenameShop: e.onRenameShop,
    onSchoolGate: e.onSchoolGate,
    onPlazaStroll: e.onPlazaStroll,
    onEnterStreet: e.onEnterStreet,
    onEnterRodShop: e.onEnterRodShop,
    onEnterShop: e.onEnterShop,
    onHire: e.onHire,
    onEnterShelter: () => {
      e.onOpenShelter();
    },
    onGoHome: e.onGoHome,
    onGoShop: e.onGoShop,
    onGoBake: e.onGoBake,
    onNightMarketPermit: e.onNightMarketPermit,
    onNightMarketTruck: e.onNightMarketTruck,
    onNightMarketSell: e.onNightMarketSell,
    onGoldfishEat: e.onGoldfishEat,
    onGoldfishHome: e.onGoldfishHome,
    onGoldfishCook: e.onGoldfishCook,
    onBuyFishFeed: e.onBuyFishFeed,
    onStallBrowse: e.onStallBrowse,
    onBuyOutfit: e.onBuyOutfit,
    onBuyFurniture: e.onBuyFurniture,
    onTravel: (n) => {
      (e.onMapLoc(n),
        e.onMapCat(n === "park" || n === "river" ? "exercise" : "read"),
        e.onMarketGone(!1),
        e.onGardenGone(!1),
        e.onOrchardGone(!1));
    },
  };
}

const MAP_LOCATION_IDS = new Set(MAP_DISTRICTS.map((e) => e.id));

function TownMapView(e) {
  const { state: n, open: s, onClose: a } = e,
    o = MAP_PLACES.find((f) => f.id === e.mapLoc) ?? MAP_PLACES[3],
    l = buildPanelContext(e),
    c = MAP_LOCATION_IDS.has(e.mapLoc);
  let u;
  if (e.mapLoc === "streets") u = "🗺️ 小镇地图 / 街道总览";
  else if (c) {
    const f = MAP_DISTRICTS.find((g) => g.id === e.mapLoc);
    u = `🗺️ 小镇地图 / ${(f == null ? void 0 : f.name) ?? e.mapLoc}`;
  } else {
    const f = MAP_DISTRICTS.find((g) => g.places.includes(e.mapLoc));
    u = f ? `🗺️ 小镇地图 / ${f.name} / ${o.name}` : `🗺️ 小镇地图 / ${o.name}`;
  }
  return jsxRuntime.jsx(Modal, {
    open: s,
    title: u,
    onClose: a,
    sheetClass: "modal-sheet-green",
    children: jsxRuntime.jsx("div", {
      className: "space-y-3",
      children:
        e.mapLoc === "streets"
          ? jsxRuntime.jsx(TownMapPanel, { ctx: l, onOpenFoodStreet: e.onOpenFoodStreet })
          : c
            ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  jsxRuntime.jsx(DistrictDetailPanel, { ctx: l, streetId: e.mapLoc }),
                  e.mapLoc === "tianyuan" &&
                    jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": "btn-open-suburb",
                      onClick: e.onOpenSuburb,
                      className: "btn-chunky btn-sm btn-blue w-full",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🚌" }),
                        " 去郊区大地图（农贸市场 · 菜园 · 果园 · 海岸）",
                      ],
                    }),
                ],
              })
            : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                children: [
                  (() => {
                    const f = MAP_DISTRICTS.find((x) => x.places.includes(e.mapLoc)),
                      g = f ? f.id : "streets";
                    return jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": "btn-map-back",
                      onClick: () => l.onTravel(g),
                      className: "btn-chunky btn-sm btn-brown w-full",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🗺️" }),
                        " ",
                        f ? `← 返回${f.name}` : "← 返回街道总览",
                      ],
                    });
                  })(),
                  jsxRuntime.jsx(MapNodeCard, { mapLocInfo: o, state: n, api: l }),
                  jsxRuntime.jsx(FestivalHostBanner, { ctx: l, mapLoc: e.mapLoc }),
                  e.mapLoc === "park" && jsxRuntime.jsx(ParkActivityPanel, { ctx: l }),
                  e.mapLoc === "river" && jsxRuntime.jsx(FishingPanel, { ctx: l }),
                  e.mapLoc === "library" && jsxRuntime.jsx(NewspaperPanel, { ctx: l }),
                  e.mapLoc === "hospital" && jsxRuntime.jsx(TownSummaryStrip, { ctx: l }),
                  e.mapLoc === "street" && jsxRuntime.jsx(StreetIntroNotice, { ctx: l }),
                  e.mapLoc === "eaststreet" && jsxRuntime.jsx(StreetShopList, { ctx: l, street: "eaststreet" }),
                  e.mapLoc === "weststreet" && jsxRuntime.jsx(StreetShopList, { ctx: l, street: "weststreet" }),
                  e.mapLoc === "plaza" && jsxRuntime.jsx(CharmSection, { ctx: l }),
                  e.mapLoc === "residential" && jsxRuntime.jsx(ResidentialAreaSection, { ctx: l }),
                  e.mapLoc === "wenyuan" && jsxRuntime.jsx(ResidentialAreaDetail, { ctx: l, area: "wenyuan" }),
                  e.mapLoc === "ankang" && jsxRuntime.jsx(ResidentialAreaDetail, { ctx: l, area: "ankang" }),
                  e.mapLoc === "wutongli" && jsxRuntime.jsx(ResidentialAreaDetail, { ctx: l, area: "wutongli" }),
                  e.mapLoc === "sujizhai" && jsxRuntime.jsx(ResidentialAreaDetail, { ctx: l, area: "sujizhai" }),
                  e.mapLoc === "villa" && jsxRuntime.jsx(ShenFamilySection, { ctx: l }),
                  e.mapLoc === "school" && jsxRuntime.jsx(SchoolSection, { ctx: l }),
                  e.mapLoc === "middleschool" && jsxRuntime.jsx(MiddleSchoolSection, { ctx: l }),
                  e.mapLoc === "highschool" && jsxRuntime.jsx(HighSchoolSection, { ctx: l }),
                  e.mapLoc === "market" && jsxRuntime.jsx(SeafoodMarketPage, { ctx: l }),
                  e.mapLoc === "garden" && jsxRuntime.jsx(VeggieFarmPage, { ctx: l }),
                  e.mapLoc === "orchard" && jsxRuntime.jsx(OrchardPage, { ctx: l }),
                  e.mapLoc === "government" && jsxRuntime.jsx(CityHallPage, { ctx: l }),
                  e.mapLoc === "shelter" && jsxRuntime.jsx(ShelterEntryPage, { ctx: l }),
                  e.mapLoc === "home" && jsxRuntime.jsx(HomeEntryPage, { ctx: l }),
                  e.mapLoc === "bakery" && jsxRuntime.jsx(ShopEntryPage, { ctx: l }),
                  e.mapLoc === "amusement" && jsxRuntime.jsx(AmusementParkPage, { ctx: l }),
                ],
              }),
    }),
  });
}

function TownMapDialog({ state: e, commit: n, onGoTab: s, ctx: a, actions: o, open: l, onClose: c }) {
  return jsxRuntime.jsx(TownMapView, {
    state: e,
    commit: n,
    onGoTab: s,
    ctx: a,
    open: l,
    onClose: c,
    mapLoc: o.mapLoc,
    onMapLoc: o.setMapLoc,
    mapCat: o.mapCat,
    onMapCat: o.setMapCat,
    marketGone: o.marketGone,
    onMarketGone: o.setMarketGone,
    gardenGone: o.gardenGone,
    onGardenGone: o.setGardenGone,
    orchardGone: o.orchardGone,
    onOrchardGone: o.setOrchardGone,
    renameName: o.renameName,
    onRenameName: o.setRenameName,
    renameShopName: o.renameShopName,
    onRenameShopName: o.setRenameShopName,
    openCats: o.openCats,
    onOpenCats: o.setOpenCats,
    seasonName: o.seasonName,
    onExercise: o.handleExercise,
    onCatchLoach: o.handleCatchLoach,
    onRiverGather: o.handleRiverGather,
    onSellFlowerPlaza: o.handleSellFlowerPlaza,
    onFish: o.handleFish,
    onCompanionFish: o.handleCompanionFish,
    onMakeBait: o.handleMakeBait,
    onSetFishBait: o.handleSetFishBait,
    onSellFish: o.handleSellFish,
    onOrderFishCatch: o.handleOrderFishCatch,
    onLibraryRead: o.handleLibraryRead,
    onBuyTransport: o.handleBuyTransport,
    onGoMarket: o.handleGoMarket,
    onGoGarden: o.handleGoGarden,
    onGoOrchard: o.handleGoOrchard,
    onMarketBuy: o.handleMarketBuy,
    onApplyCharity: o.handleApplyCharity,
    onCharitySell: o.handleCharitySell,
    onCommercial: o.handleCommercial,
    onRenamePlayer: o.handleRenamePlayer,
    onRenameShop: o.handleRenameShop,
    onSchoolGate: o.handleSchoolGate,
    onPlazaStroll: o.handlePlazaStroll,
    onFestivalActivity: o.handleFestivalActivity,
    onEnterStreet: () => o.setStreetOpen(!0),
    onEnterRodShop: () => {
      (o.setStreetView("rod"), o.setStreetOpen(!0));
    },
    onEnterShop: (u) => {
      (o.setStreetView(u), o.setStreetOpen(!0));
    },
    onHire: o.handleHire,
    onOpenShelter: () => o.setShelterOpen(!0),
    onGoHome: () => {
      (o.setMapOpen(!1), s == null || s("home", "bedroom"));
    },
    onGoShop: () => {
      (o.setMapOpen(!1), s == null || s("home", "store"));
    },
    onGoBake: () => {
      (o.setMapOpen(!1), s == null || s("home", "kitchen"));
    },
    onNightMarketPermit: o.handleNightMarketPermit,
    onNightMarketTruck: o.handleNightMarketTruck,
    onNightMarketSell: o.handleNightMarketSell,
    onGoldfishEat: o.handleGoldfishEat,
    onGoldfishHome: o.handleGoldfishHome,
    onGoldfishCook: o.handleGoldfishCook,
    onBuyFishFeed: o.handleBuyFishFeed,
    onStallBrowse: o.handleStallBrowse,
    onBuyOutfit: o.handleBuyOutfit,
    onBuyFurniture: o.handleBuyFurniture,
    onOpenSuburb: o.openSuburb,
    onOpenFoodStreet: o.openFoodStreet,
  });
}

function SeasidePanel({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState(!1),
    o = () => {
      const c = travelToBeach(n);
      (e.commit(c.state, c.message, c.ok ? "success" : "error"), c.ok && a(!0));
    },
    l = (c) => {
      const u = doBeachActivity(n, c);
      e.commit(u.state, u.message, u.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl border-2 border-[#b3e5fc] bg-[#e0f7fa] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#01579b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🌊" }),
          " 海边：堆沙堡 / 游泳 / 冲浪 / 日光浴，放松心情",
        ],
      }),
      s
        ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-leave-coast",
                onClick: () => a(!1),
                className: "btn-chunky btn-xs btn-brown",
                children: "← 返回郊区",
              }),
              jsxRuntime.jsx("div", {
                className: "space-y-1.5",
                children: BEACH_ACTIVITIES.map((c) => {
                  const u = (n.coastDoneToday ?? []).includes(c.id),
                    f = [
                      c.mood > 0 ? `心情 +${c.mood}` : "",
                      c.health ? `健康 +${c.health}` : "",
                      c.sport ? `运动 +${c.sport}` : "",
                    ]
                      .filter(Boolean)
                      .join(" · ");
                  return jsxRuntime.jsxs(
                    "div",
                    {
                      className: `flex items-center gap-2.5 rounded-xl border-2 p-2.5 ${u ? "border-[#b0bec5] bg-[#eceff1]" : "border-[#4fc3f7] bg-[#e0f7fa]"}`,
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji text-2xl", children: c.emoji }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: `text-[11px] font-black ${u ? "text-[#607d8b]" : "text-[#01579b]"}`,
                              children: [
                                c.name,
                                u &&
                                  jsxRuntime.jsx("span", {
                                    className: "ml-1 text-[9px]",
                                    children: "（今天玩过了）",
                                  }),
                              ],
                            }),
                            jsxRuntime.jsx("p", {
                              className: `text-[10px] font-bold ${u ? "text-[#90a4ae]" : "text-[#0277bd]"}`,
                              children: c.desc,
                            }),
                          ],
                        }),
                        jsxRuntime.jsxs("div", {
                          className: "shrink-0 text-right",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: `text-[10px] font-bold ${u ? "text-[#90a4ae]" : "text-[#6b4226]"}`,
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                                " ",
                                c.energy,
                                " 精力",
                              ],
                            }),
                            jsxRuntime.jsx("p", {
                              className: "text-[10px] font-bold text-[#2e7d32]",
                              children: f,
                            }),
                          ],
                        }),
                        jsxRuntime.jsx("button", {
                          type: "button",
                          "data-testid": `btn-coast-${c.id}`,
                          onClick: () => l(c.id),
                          disabled: u,
                          className: "btn-chunky btn-xs btn-blue",
                          children: u ? "今天玩过了" : "去玩",
                        }),
                      ],
                    },
                    c.id,
                  );
                }),
              }),
            ],
          })
        : (n.vehicles ?? []).length === 0
          ? jsxRuntime.jsxs("p", {
              className:
                "rounded-xl border-2 border-[#ffe0b2] bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🚫" }),
                " 还没有交通工具，先去商店街买公交卡/三轮车/私家车",
              ],
            })
          : jsxRuntime.jsxs("div", {
              className: "flex gap-3 rounded-xl border-2 border-[#4fc3f7] bg-[#e0f7fa] p-2.5",
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
                          children: "出发去海边",
                        }),
                        jsxRuntime.jsx("p", {
                          className: "text-[11px] text-[#0288d1]",
                          children: "耗时 1 小时 · 到达后尽情玩耍",
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
                      children: jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": "btn-go-coast",
                        onClick: o,
                        disabled: n.energy < 5 || n.hour + 1 > 22,
                        className: "btn-chunky btn-xs btn-blue",
                        children: "🚌 乘车前往海边（约 1 小时）",
                      }),
                    }),
                  ],
                }),
              ],
            }),
    ],
  });
}

const TRAVEL_LOCATIONS = [
  {
    id: "market",
    emoji: "🦐",
    name: "农贸市场",
    hint: "🚌 乘车前往 · 海鲜水产",
    btnClass: "btn-blue",
    testId: "btn-suburb-market",
  },
  {
    id: "garden",
    emoji: "🥬",
    name: "郊外菜园",
    hint: "🚌 乘车前往 · 自种自卖",
    btnClass: "btn-green",
    testId: "btn-suburb-garden",
  },
  {
    id: "orchard",
    emoji: "🍎",
    name: "郊外果园",
    hint: "🚌 乘车前往 · 自采自卖",
    btnClass: "btn-orange",
    testId: "btn-suburb-orchard",
  },
  {
    id: "coast",
    emoji: "🌊",
    name: "海岸",
    hint: "🚌 乘车前往 · 放松心情",
    btnClass: "btn-yellow",
    testId: "btn-suburb-coast",
  },
];

function TravelDialog({ open: e, onClose: n, view: s, onView: a, ctx: o }) {
  const l = TRAVEL_LOCATIONS.find((c) => c.id === s);
  return jsxRuntime.jsx(Modal, {
    open: e,
    title:
      s === "suburb" ? "🚌 郊区大地图" : `🚌 郊区大地图 / ${(l == null ? void 0 : l.name) ?? ""}`,
    onClose: n,
    sheetClass: "modal-sheet-green",
    children:
      s === "suburb"
        ? jsxRuntime.jsxs("div", {
            className: "space-y-3",
            children: [
              jsxRuntime.jsxs("p", {
                className:
                  "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🚌" }),
                  " 农贸市场、郊外菜园、郊外果园和新开放的海岸都在这里，和城镇一样是独立大地图。",
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: TRAVEL_LOCATIONS.map((c) =>
                  jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-testid": c.testId,
                      onClick: () => a(c.id),
                      className: `btn-chunky btn-sm ${c.btnClass} flex w-full flex-col items-center gap-0.5 py-2.5`,
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "emoji text-xl leading-none",
                          children: c.emoji,
                        }),
                        jsxRuntime.jsx("span", {
                          className: "text-[10px] font-black leading-tight",
                          children: c.name,
                        }),
                        jsxRuntime.jsx("span", {
                          className: "text-[9px] font-bold leading-tight opacity-90",
                          children: c.hint,
                        }),
                      ],
                    },
                    c.id,
                  ),
                ),
              }),
            ],
          })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-suburb-back",
                onClick: () => a("suburb"),
                className: "btn-chunky btn-xs btn-brown mb-2",
                children: "← 返回郊区",
              }),
              s === "market" && jsxRuntime.jsx(SeafoodMarketPage, { ctx: o }),
              s === "garden" && jsxRuntime.jsx(VeggieFarmPage, { ctx: o }),
              s === "orchard" && jsxRuntime.jsx(OrchardPage, { ctx: o }),
              s === "coast" && jsxRuntime.jsx(SeasidePanel, { ctx: o }),
            ],
          }),
  });
}

function SuburbContainer({ state: e, commit: n, ctx: s, actions: a, open: o, onClose: l }) {
  const c = {
      state: e,
      commit: n,
      onGoTab: void 0,
      ctx: s,
      open: o,
      onClose: l,
      mapLoc: a.mapLoc,
      onMapLoc: a.setMapLoc,
      mapCat: a.mapCat,
      onMapCat: a.setMapCat,
      marketGone: a.marketGone,
      onMarketGone: a.setMarketGone,
      gardenGone: a.gardenGone,
      onGardenGone: a.setGardenGone,
      orchardGone: a.orchardGone,
      onOrchardGone: a.setOrchardGone,
      renameName: a.renameName,
      onRenameName: a.setRenameName,
      renameShopName: a.renameShopName,
      onRenameShopName: a.setRenameShopName,
      openCats: a.openCats,
      onOpenCats: a.setOpenCats,
      seasonName: a.seasonName,
      onExercise: a.handleExercise,
      onCatchLoach: a.handleCatchLoach,
      onFish: a.handleFish,
      onCompanionFish: a.handleCompanionFish,
      onMakeBait: a.handleMakeBait,
      onSetFishBait: a.handleSetFishBait,
      onSellFish: a.handleSellFish,
      onOrderFishCatch: a.handleOrderFishCatch,
      onRiverGather: a.handleRiverGather,
      onSellFlowerPlaza: a.handleSellFlowerPlaza,
      onLibraryRead: a.handleLibraryRead,
      onBuyTransport: a.handleBuyTransport,
      onGoMarket: a.handleGoMarket,
      onGoGarden: a.handleGoGarden,
      onGoOrchard: a.handleGoOrchard,
      onMarketBuy: a.handleMarketBuy,
      onApplyCharity: a.handleApplyCharity,
      onCharitySell: a.handleCharitySell,
      onCommercial: a.handleCommercial,
      onRenamePlayer: a.handleRenamePlayer,
      onRenameShop: a.handleRenameShop,
      onSchoolGate: a.handleSchoolGate,
      onPlazaStroll: a.handlePlazaStroll,
      onFestivalActivity: a.handleFestivalActivity,
      onEnterStreet: () => a.setStreetOpen(!0),
      onEnterRodShop: () => {
        (a.setStreetView("rod"), a.setStreetOpen(!0));
      },
      onEnterShop: (f) => {
        (a.setStreetView(f), a.setStreetOpen(!0));
      },
      onHire: a.handleHire,
      onOpenShelter: () => a.setShelterOpen(!0),
      onGoHome: () => a.setMapOpen(!1),
      onGoShop: () => a.setMapOpen(!1),
      onGoBake: () => a.setMapOpen(!1),
      onNightMarketPermit: a.handleNightMarketPermit,
      onNightMarketTruck: a.handleNightMarketTruck,
      onNightMarketSell: a.handleNightMarketSell,
      onGoldfishEat: a.handleGoldfishEat,
      onGoldfishHome: a.handleGoldfishHome,
      onGoldfishCook: a.handleGoldfishCook,
      onBuyFishFeed: a.handleBuyFishFeed,
      onStallBrowse: a.handleStallBrowse,
      onBuyOutfit: a.handleBuyOutfit,
      onBuyFurniture: a.handleBuyFurniture,
      onOpenSuburb: a.openSuburb,
      onOpenFoodStreet: a.openFoodStreet,
    },
    u = buildPanelContext(c);
  return jsxRuntime.jsx(TravelDialog, { open: o, onClose: l, view: a.suburbView, onView: a.setSuburbView, ctx: u });
}

function NightStallDialog({ open: e, onClose: n, view: s, onView: a, ctx: o }) {
  const { state: l } = o,
    c = NIGHT_STALL_MENU.find((u) => u.id === s);
  return jsxRuntime.jsx(Modal, {
    open: e,
    title: s === "street" ? "🍜 美食街" : `🍜 美食街 / ${(c == null ? void 0 : c.stall) ?? ""}`,
    onClose: n,
    sheetClass: "modal-sheet-green",
    children:
      s === "street"
        ? jsxRuntime.jsxs("div", {
            className: "space-y-3",
            children: [
              jsxRuntime.jsxs("p", {
                className:
                  "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🏗️" }),
                  " 美食街是市政府招商引资建成的小吃一条街：红油串串、小笼包、炭火烤串、酸辣粉、糖水铺……各家摊位现做现吃，从早热闹到晚。",
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "grid grid-cols-2 gap-2",
                children: NIGHT_STALL_MENU.map((u) =>
                  jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-testid": `btn-foodstreet-${u.id}`,
                      onClick: () => a(u.id),
                      className:
                        "btn-chunky btn-sm btn-orange flex w-full flex-col items-center gap-0.5 py-2.5",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "emoji text-xl leading-none",
                          children: u.stallEmoji,
                        }),
                        jsxRuntime.jsx("span", {
                          className: "text-[10px] font-black leading-tight",
                          children: u.stall,
                        }),
                        jsxRuntime.jsxs("span", {
                          className: "text-[9px] font-bold leading-tight opacity-90",
                          children: [u.emoji, " ", u.name, " · ¥", u.cost],
                        }),
                      ],
                    },
                    u.id,
                  ),
                ),
              }),
            ],
          })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-foodstreet-back",
                onClick: () => a("street"),
                className: "btn-chunky btn-xs btn-brown mb-2",
                children: "← 返回美食街",
              }),
              c &&
                jsxRuntime.jsxs("div", {
                  className: "space-y-2",
                  children: [
                    jsxRuntime.jsxs("div", {
                      className: "flex gap-3 rounded-xl border-2 border-[#ffb74d] bg-[#fffdf8] p-3",
                      children: [
                        jsxRuntime.jsx("div", {
                          className: "flex w-[18%] shrink-0 items-center justify-center",
                          children: jsxRuntime.jsx("span", {
                            className: "text-3xl",
                            children: jsxRuntime.jsx("span", { className: "emoji", children: c.stallEmoji }),
                          }),
                        }),
                        jsxRuntime.jsxs("div", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsxs("p", {
                              className: "text-sm font-black text-[#e65100]",
                              children: [c.stall, " · ", c.name],
                            }),
                            jsxRuntime.jsx("p", {
                              className: "text-[11px] font-bold text-[#b08a6a]",
                              children: c.desc,
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#6b4226]",
                              children: [
                                "饱食 +",
                                c.satiety,
                                " · 精力 +",
                                c.energy,
                                " · 心情 +",
                                c.mood,
                              ],
                            }),
                            jsxRuntime.jsxs("p", {
                              className: "text-[10px] font-bold text-[#6b4226]",
                              children: [
                                "¥",
                                c.cost,
                                " · 耗时 30 分钟 · 当前饱食 ",
                                l.satiety ?? 70,
                                "/100",
                              ],
                            }),
                            jsxRuntime.jsx("div", {
                              className: "mt-2",
                              children: jsxRuntime.jsx("button", {
                                type: "button",
                                "data-testid": `btn-foodstreet-eat-${c.id}`,
                                onClick: () => {
                                  const u = eatNightStall(l, c.id);
                                  o.commit(u.state, u.message, u.ok ? "success" : "error");
                                },
                                className: "btn-chunky btn-xs btn-yellow",
                                children: "吃一份",
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className:
                        "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
                        " 美食街全天营业，各家摊位都是现做；饱食度满的时候吃不下，先饿一饿再来。",
                      ],
                    }),
                  ],
                }),
            ],
          }),
  });
}

function NightMarketContainer({ state: e, commit: n, ctx: s, actions: a, open: o, onClose: l }) {
  const c = {
      state: e,
      commit: n,
      onGoTab: void 0,
      ctx: s,
      open: o,
      onClose: l,
      mapLoc: a.mapLoc,
      onMapLoc: a.setMapLoc,
      mapCat: a.mapCat,
      onMapCat: a.setMapCat,
      marketGone: a.marketGone,
      onMarketGone: a.setMarketGone,
      gardenGone: a.gardenGone,
      onGardenGone: a.setGardenGone,
      orchardGone: a.orchardGone,
      onOrchardGone: a.setOrchardGone,
      renameName: a.renameName,
      onRenameName: a.setRenameName,
      renameShopName: a.renameShopName,
      onRenameShopName: a.setRenameShopName,
      openCats: a.openCats,
      onOpenCats: a.setOpenCats,
      seasonName: a.seasonName,
      onExercise: a.handleExercise,
      onCatchLoach: a.handleCatchLoach,
      onFish: a.handleFish,
      onCompanionFish: a.handleCompanionFish,
      onMakeBait: a.handleMakeBait,
      onSetFishBait: a.handleSetFishBait,
      onSellFish: a.handleSellFish,
      onOrderFishCatch: a.handleOrderFishCatch,
      onRiverGather: a.handleRiverGather,
      onSellFlowerPlaza: a.handleSellFlowerPlaza,
      onLibraryRead: a.handleLibraryRead,
      onBuyTransport: a.handleBuyTransport,
      onGoMarket: a.handleGoMarket,
      onGoGarden: a.handleGoGarden,
      onGoOrchard: a.handleGoOrchard,
      onMarketBuy: a.handleMarketBuy,
      onApplyCharity: a.handleApplyCharity,
      onCharitySell: a.handleCharitySell,
      onCommercial: a.handleCommercial,
      onRenamePlayer: a.handleRenamePlayer,
      onRenameShop: a.handleRenameShop,
      onSchoolGate: a.handleSchoolGate,
      onPlazaStroll: a.handlePlazaStroll,
      onFestivalActivity: a.handleFestivalActivity,
      onEnterStreet: () => a.setStreetOpen(!0),
      onEnterRodShop: () => {
        (a.setStreetView("rod"), a.setStreetOpen(!0));
      },
      onEnterShop: (f) => {
        (a.setStreetView(f), a.setStreetOpen(!0));
      },
      onHire: a.handleHire,
      onOpenShelter: () => a.setShelterOpen(!0),
      onGoHome: () => a.setMapOpen(!1),
      onGoShop: () => a.setMapOpen(!1),
      onGoBake: () => a.setMapOpen(!1),
      onNightMarketPermit: a.handleNightMarketPermit,
      onNightMarketTruck: a.handleNightMarketTruck,
      onNightMarketSell: a.handleNightMarketSell,
      onGoldfishEat: a.handleGoldfishEat,
      onGoldfishHome: a.handleGoldfishHome,
      onGoldfishCook: a.handleGoldfishCook,
      onBuyFishFeed: a.handleBuyFishFeed,
      onStallBrowse: a.handleStallBrowse,
      onBuyOutfit: a.handleBuyOutfit,
      onBuyFurniture: a.handleBuyFurniture,
      onOpenSuburb: a.openSuburb,
      onOpenFoodStreet: a.openFoodStreet,
    },
    u = buildPanelContext(c);
  return jsxRuntime.jsx(NightStallDialog, {
    open: o,
    onClose: l,
    view: a.foodStreetView,
    onView: a.setFoodStreetView,
    ctx: u,
  });
}

function GroceryStorePanel({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState([]),
    o = (f) => {
      const g = checkoutCart(n, f);
      (e.commit(g.state, g.message, g.ok ? "success" : "error"), g.ok && a([]));
    },
    l = (f) => {
      a((g) => {
        const x = g.find((m) => m.kind === "ingredient" && m.refId === f.id);
        return x
          ? g.map((m) => (m === x ? { ...m, qty: m.qty + 1 } : m))
          : [
              ...g,
              {
                kind: "ingredient",
                refId: f.id,
                name: f.name,
                unitPrice: Math.ceil(f.price * 1.2),
                qty: 1,
              },
            ];
      });
    },
    c = (e.shopCat === "all" ? INGREDIENTS_LIST : INGREDIENTS_LIST.filter((f) => f.category === e.shopCat)).filter(
      (f) => !f.source,
    ),
    u = [
      {
        kind: "bag",
        name: "帆布背包",
        emoji: "🎒",
        desc: "携带上限 2 → 10 件",
        price: BAG_PRICE,
        owned: n.hasBag,
      },
      {
        kind: "foodbox",
        name: "保温食盒",
        emoji: "🍱",
        desc: "料理/蛋糕随身带 ≤4 件",
        price: FOODBOX_PRICE,
        owned: n.hasFoodBox,
      },
      {
        kind: "fishbucket",
        name: "活鱼桶",
        emoji: "🪣",
        desc: "活鱼随身带 ≤5 条",
        price: FISHBUCKET_PRICE,
        owned: n.hasFishBucket,
      },
    ];
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
          " 点「买」进购物篮，🧾 结算时一起付款：能装进随身携带的当场带走，其余订购配送（满 5 件免配送费，次日 8:00 送达）",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 rounded-xl border-2 border-[#ffc53d] bg-[#fffdf8] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-black text-[#b8860b]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "🎒" }),
              " 携带装备（买一次一直用）",
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "mt-1.5 grid grid-cols-3 gap-1.5",
            children: u.map((f) =>
              jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `btn-buy-${f.kind}`,
                  onClick: () => {
                    const g = buyCarryItem(n, f.kind);
                    e.commit(g.state, g.message, g.ok ? "success" : "error");
                  },
                  disabled: f.owned || n.coins < f.price,
                  className:
                    "btn-chunky btn-xs btn-yellow flex flex-col items-center px-1 py-1.5 disabled:opacity-50",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-base", children: f.emoji }),
                    jsxRuntime.jsx("span", {
                      className: "text-[9px] font-black",
                      children: f.owned ? "已拥有 ✓" : `${f.name} ¥${f.price}`,
                    }),
                    jsxRuntime.jsx("span", {
                      className: "text-[8px] font-bold leading-tight text-[#a08030]",
                      children: f.desc,
                    }),
                  ],
                },
                f.kind,
              ),
            ),
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 flex flex-wrap gap-1",
        children: [
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "shop-cat-all",
            onClick: () => e.onShopCat("all"),
            className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${e.shopCat === "all" ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
            children: "全部",
          }),
          Object.entries(INGREDIENT_CATEGORY_LABELS)
            .filter(([f]) =>
              [
                "grain",
                "dairy",
                "fruit",
                "sweet",
                "meat",
                "veg",
                "fish",
                "seasoning",
                "other",
              ].includes(f),
            )
            .map(([f, g]) =>
              jsxRuntime.jsx(
                "button",
                {
                  type: "button",
                  "data-testid": `shop-cat-${f}`,
                  onClick: () => e.onShopCat(f),
                  className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${e.shopCat === f ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                  children: g,
                },
                f,
              ),
            ),
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: c.map((f) => {
          const g = f.season === "all" || f.season === e.seasonName,
            x = n.ingredients[f.id],
            m = (x == null ? void 0 : x.qty) ?? 0;
          return jsxRuntime.jsxs(
            "div",
            {
              className: `flex flex-col rounded-xl bg-[#fbf3e4] px-2 py-1.5 ${g ? "" : "opacity-50"}`,
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-lg", children: f.emoji }),
                    jsxRuntime.jsxs("span", {
                      className: "num text-[11px] font-bold text-[#b08a6a]",
                      children: ["x", m],
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-0.5 truncate text-sm font-bold text-[#4a2c17]",
                  children: f.name,
                }),
                jsxRuntime.jsxs("p", {
                  className: "text-[10px] font-bold text-[#c62828]",
                  children: [INGREDIENT_CATEGORY_LABELS[f.category] ?? f.category, " · ¥", Math.ceil(f.price * 1.2)],
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": `btn-shop-buy-${f.id}`,
                  onClick: () => l(f),
                  disabled: !g,
                  className: "btn-chunky btn-xs btn-yellow mt-1 w-full",
                  children: "买",
                }),
              ],
            },
            f.id,
          );
        }),
      }),
      jsxRuntime.jsx(CartSummaryBar, { items: s, onCheckout: o }),
    ],
  });
}

function StoreStaffSection({ store: e, ctx: n, openCats: s, onOpenCats: a }) {
  const o = (SHOP_NPC_IDS[e] ?? []).filter((g) => getNpcLocationAt(g, n.state.hour, n.state.day).place === e);
  if ((SHOP_NPC_IDS[e] ?? []).length === 0) return null;
  const c = `${e}-staff`,
    u = s[c] ?? !0,
    f = () => a((g) => ({ ...g, [c]: !(g[c] ?? !0) }));
  return MapPlaceCard({
    keyId: `store-staff-${e}`,
    title: `👥 当班店员 · 此刻 ${o.length} 位在店`,
    emoji: "👥",
    sub: "按时间表在店里上班，下班后回家不在店里",
    open: u,
    onToggle: f,
    border: "border-[#c8e6c9]",
    bg: "bg-[#f1f8e9]",
    titleColor: "text-[#2e7d32]",
    subColor: "text-[#558b2f]",
    testId: `store-staff-${e}`,
    children:
      o.length > 0
        ? o.map((g) => jsxRuntime.jsx(NpcDetailCard, { ctx: n, npcId: g, badgeText: "🏪 店员", locId: e }, g))
        : jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#558b2f]",
            children: "此刻店里没有当班店员（休息时段或休息日），营业时段再来就能见到。",
          }),
  });
}

function CharmPanel({ api: e }) {
  var s, a;
  const { state: n } = e;
  return MapPlaceCard({
    keyId: "clothes-charm",
    title: "个人魅力",
    emoji: "✨",
    sub: `当前 ${e.charm} · 交涉 +${Math.floor(n.negotiation / 10)} · 穿搭 +${e.outfitTotal} · 卫生 +${Math.round(((n.hygiene ?? 100) / 100) * 5)}`,
    open: e.openCats["clothes-charm"] ?? !0,
    onToggle: () => e.onOpenCats((o) => ({ ...o, "clothes-charm": !(o["clothes-charm"] ?? !0) })),
    border: "border-[#f3d9e4]",
    bg: "bg-[#fdf3ff]",
    titleColor: "text-[#c62828]",
    subColor: "text-[#b08a6a]",
    testId: "clothes-cat-charm",
    children: jsxRuntime.jsxs("div", {
      className: "rounded-xl bg-[#fff7fb] p-2.5 text-center",
      children: [
        jsxRuntime.jsx("p", { className: "text-xs font-bold text-[#c62828]", children: "个人魅力" }),
        jsxRuntime.jsxs("p", {
          className: "num mt-0.5 text-3xl font-black text-[#c62828]",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "✨" }), " ", e.charm],
        }),
        jsxRuntime.jsxs("p", {
          className: "mt-1 text-[11px] font-bold leading-relaxed text-[#b08a6a]",
          children: [
            "交涉 ",
            jsxRuntime.jsxs("span", {
              className: "num text-[#c62828]",
              children: ["+", Math.floor(n.negotiation / 10)],
            }),
            " · ",
            "穿搭 ",
            jsxRuntime.jsxs("span", { className: "num text-[#c62828]", children: ["+", e.outfitTotal] }),
            " · ",
            "发型",
            " ",
            jsxRuntime.jsxs("span", {
              className: "num text-[#c62828]",
              children: [
                "+",
                n.combedToday
                  ? (((s = e.hairDef) == null ? void 0 : s.charm) ?? 0)
                  : Math.floor((((a = e.hairDef) == null ? void 0 : a.charm) ?? 0) / 2),
              ],
            }),
            " · ",
            "卫生 ",
            jsxRuntime.jsxs("span", {
              className: "num text-[#c62828]",
              children: ["+", Math.round(((n.hygiene ?? 100) / 100) * 5)],
            }),
          ],
        }),
        jsxRuntime.jsxs("p", {
          className: "mt-0.5 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children: [
            "卫生值 ",
            jsxRuntime.jsx("span", { className: "num", children: n.hygiene ?? 100 }),
            "/100 · 今日",
            segmentByEmoji(n.combedToday ? "已梳洗 ✓（发型全值）" : "未梳洗 ⚠️（发型减半，整体魅力 ×0.85）"),
            " ",
            "· 亲自接待成交可提升交涉技能，每 10 级为个人魅力 +1",
          ],
        }),
      ],
    }),
  });
}
