function makeBaitAction(e, n) {
  const s = n === "night" ? makeNightBait(e.state) : makeSeasonBait(e.state, n);
  commitResult(e, s);
}

function changeBaitAction(e, n) {
  const s = changeBait(e.state, n);
  commitResult(e, s);
}

function sellFishAction(e, n) {
  const s = sellFish(e.state, n);
  commitResult(e, s);
}

function orderFishDeliveryAction(e) {
  const n = orderFishDelivery(e.state);
  commitResult(e, n);
}

function buyOutfitAction(e, n) {
  const s = buyOutfit(e.state, n);
  (commitOrRollback(e, s), s.ok && e.commit(s.state, s.message, "success"));
}

function equipOutfitAction(e, n) {
  const s = equipOutfit(e.state, n);
  commitResult(e, s);
}

function buyHairstyleAction(e, n) {
  const s = buyHairstyle(e.state, n);
  commitResult(e, s);
}

function applyHairstyleAction(e, n) {
  const s = applyHairstyle(e.state, n);
  commitResult(e, s);
}

function hireEmployeeAction(e, n) {
  const s = hireEmployee(e.state, n);
  if (commitOrRollback(e, s)) {
    if (s.firstMeet) {
      const o = EMPLOYEE_MAP[n];
      e.setDialogue({
        title: `✨ 初见 · ${(o == null ? void 0 : o.name) ?? ""}`,
        text: (o == null ? void 0 : o.intro) ?? s.message,
      });
    }
    e.commit(s.state, s.message, "success");
  }
}

function buyFurnitureAction(e, n, s) {
  const a = buyFurniture(e.state, n, s);
  commitResult(e, a);
}

function buyBookAction(e, n) {
  const s = buyBook(e.state, n);
  commitResult(e, s);
}

function borrowBookAction(e, n) {
  const s = borrowBook(e.state, n);
  commitResult(e, s);
}

function buyCookwareAction(e, n) {
  const s = buyCookware(e.state, n);
  commitResult(e, s);
}

function buyMaterialAction(e, n, s) {
  const a = buyMaterial(e.state, n, s);
  commitResult(e, a);
}

function renamePlayerAction(e) {
  const n = renamePlayer(e.state, e.renameName);
  commitOrRollback(e, n) &&
    (e.setRenameName(n.state.playerName),
    e.setDialogue({ title: "📛 改名成功", text: n.message }),
    e.commit(n.state, n.message, "success"));
}

function renameShopAction(e) {
  const n = renameShop(e.state, e.renameShopName);
  commitOrRollback(e, n) &&
    (e.setRenameShopName(n.state.shopName),
    e.setDialogue({ title: "🏪 改店名成功", text: n.message }),
    e.commit(n.state, n.message, "success"));
}

function applyCharitySaleAction(e) {
  const n = applyCharitySale(e.state);
  commitResult(e, n);
}

function runCharitySaleAction(e) {
  const n = runCharitySale(e.state);
  commitResult(e, n);
}

function hostBusinessEventAction(e) {
  const n = hostBusinessEvent(e.state);
  commitResult(e, n);
}

function donateToShelterAction(e, n) {
  const s = donateToShelter(e.state, n);
  commitResult(e, s);
}

function shelterPlayEventAction(e) {
  const n = shelterPlayEvent(e.state);
  commitOrRollback(e, n) && (e.setShelterMsg(n.message), e.commit(n.state, n.message, "success"));
}

function strollPlazaAction(e) {
  const n = strollPlaza(e.state);
  commitResult(e, n);
}

function applyPermitAction(e) {
  commitResult(e, applyPermit(e.state));
}

function buyFoodTruckAction(e) {
  commitResult(e, buyFoodTruck(e.state));
}

function openNightMarketStallAction(e) {
  commitResult(e, openNightMarketStall(e.state));
}

function eatOutAction(e) {
  commitResult(e, catchGoldfish(e.state, "eat"));
}

function goHomeAction(e) {
  commitResult(e, catchGoldfish(e.state, "home"));
}

function cookMealAction(e) {
  commitResult(e, catchGoldfish(e.state, "cook"));
}

function advanceOneHourAction(e) {
  commitResult(e, buyFishFeed(e.state, 1));
}

function visitNightStallAction(e, n) {
  const s = NIGHT_MARKET_STALL_MAP[n];
  if (!s) {
    e.commit(e.state, "这个摊位今晚没出摊", "error");
    return;
  }
  const a = STALL_FLAVOR_LINES[s.kind],
    o = a.length > 0 ? a[Math.floor(Math.random() * a.length)] : "";
  e.setDialogue({
    title: `${s.emoji} ${s.name}`,
    text: `${s.desc}

${o}`,
  });
}

function useTownUiState(e) {
  const [n, s] = React.useState(!1),
    [a, o] = React.useState("street"),
    [l, c] = React.useState("all"),
    [u, f] = React.useState("all"),
    [g, x] = React.useState(null),
    [m, p] = React.useState(!1),
    [y, j] = React.useState(null),
    [v, w] = React.useState(!1),
    [N, S] = React.useState("park"),
    [C, V] = React.useState("exercise"),
    [E, F] = React.useState(null),
    [J, H] = React.useState(!1),
    [R, se] = React.useState(!1),
    [be, Ie] = React.useState(!1),
    [xe, ye] = React.useState(!1),
    [P, ne] = React.useState("suburb"),
    [D, O] = React.useState(!1),
    [K, Y] = React.useState("street"),
    [I, U] = React.useState(e.playerName),
    [fe, ve] = React.useState(e.shopName),
    [Ae, Ne] = React.useState({}),
    [Te, Se] = React.useState({});
  return {
    streetOpen: n,
    setStreetOpen: s,
    streetView: a,
    setStreetView: o,
    shopCat: l,
    setShopCat: c,
    outfitCat: u,
    setOutfitCat: f,
    dialogue: g,
    setDialogue: x,
    shelterOpen: m,
    setShelterOpen: p,
    shelterMsg: y,
    setShelterMsg: j,
    mapOpen: v,
    setMapOpen: w,
    mapLoc: N,
    setMapLoc: S,
    mapCat: C,
    setMapCat: V,
    scheduleNpc: E,
    setScheduleNpc: F,
    marketGone: J,
    setMarketGone: H,
    gardenGone: R,
    setGardenGone: se,
    orchardGone: be,
    setOrchardGone: Ie,
    renameName: I,
    setRenameName: U,
    renameShopName: fe,
    setRenameShopName: ve,
    openCats: Ae,
    setOpenCats: Ne,
    npcDetailOpen: Te,
    toggleNpcDetail: (Ye) => Se((Pe) => ({ ...Pe, [Ye]: !(Pe[Ye] ?? !1) })),
    openMapAt: (Ye) => {
      (S(Ye),
        V(Ye === "park" || Ye === "river" ? "exercise" : "read"),
        H(!1),
        se(!1),
        Ie(!1),
        w(!0));
    },
    suburbOpen: xe,
    setSuburbOpen: ye,
    suburbView: P,
    setSuburbView: ne,
    openSuburb: () => {
      (ne("suburb"), ye(!0));
    },
    foodStreetOpen: D,
    setFoodStreetOpen: O,
    foodStreetView: K,
    setFoodStreetView: Y,
    openFoodStreet: () => {
      (Y("street"), O(!0));
    },
  };
}

function StreetSection({ state: e, commit: n }) {
  var nn;
  const {
      streetOpen: s,
      setStreetOpen: a,
      streetView: o,
      setStreetView: l,
      shopCat: c,
      setShopCat: u,
      outfitCat: f,
      setOutfitCat: g,
      dialogue: x,
      setDialogue: m,
      shelterOpen: p,
      setShelterOpen: y,
      shelterMsg: j,
      setShelterMsg: v,
      mapOpen: w,
      setMapOpen: N,
      mapLoc: S,
      setMapLoc: C,
      mapCat: V,
      setMapCat: E,
      scheduleNpc: F,
      setScheduleNpc: J,
      marketGone: H,
      setMarketGone: R,
      gardenGone: se,
      setGardenGone: be,
      orchardGone: Ie,
      setOrchardGone: xe,
      renameName: ye,
      setRenameName: P,
      renameShopName: ne,
      setRenameShopName: D,
      openCats: O,
      setOpenCats: K,
      npcDetailOpen: Y,
      toggleNpcDetail: I,
      openMapAt: U,
      suburbOpen: fe,
      setSuburbOpen: ve,
      suburbView: Ae,
      setSuburbView: Ne,
      openSuburb: Te,
      foodStreetOpen: Se,
      setFoodStreetOpen: Oe,
      foodStreetView: nt,
      setFoodStreetView: Yt,
      openFoodStreet: he,
    } = useTownUiState(e),
    Ye = seasonIndexOf(e.day),
    Pe = SEASON_NAME_TABLE[Object.keys(SEASON_NAME_TABLE)[Ye]],
    Ss = calcCharm(e),
    us = outfitBeautyBonus(e),
    As = HAIRSTYLE_MAP[((nn = e.hairstyle) == null ? void 0 : nn.equipped) ?? ""],
    pe = {
      state: e,
      commit: n,
      setDialogue: m,
      setMarketGone: R,
      setGardenGone: be,
      setOrchardGone: xe,
      setShelterMsg: v,
      setRenameName: P,
      setRenameShopName: D,
      renameName: ye,
      renameShopName: ne,
    };
  return {
    streetOpen: s,
    setStreetOpen: a,
    streetView: o,
    setStreetView: l,
    shopCat: c,
    setShopCat: u,
    outfitCat: f,
    setOutfitCat: g,
    dialogue: x,
    setDialogue: m,
    shelterOpen: p,
    setShelterOpen: y,
    shelterMsg: j,
    setShelterMsg: v,
    mapOpen: w,
    setMapOpen: N,
    mapLoc: S,
    setMapLoc: C,
    mapCat: V,
    setMapCat: E,
    scheduleNpc: F,
    setScheduleNpc: J,
    marketGone: H,
    setMarketGone: R,
    gardenGone: se,
    setGardenGone: be,
    orchardGone: Ie,
    setOrchardGone: xe,
    renameName: ye,
    setRenameName: P,
    renameShopName: ne,
    setRenameShopName: D,
    openCats: O,
    setOpenCats: K,
    npcDetailOpen: Y,
    toggleNpcDetail: I,
    seasonName: Pe,
    charm: Ss,
    outfitTotal: us,
    hairDef: As,
    suburbOpen: fe,
    setSuburbOpen: ve,
    suburbView: Ae,
    setSuburbView: Ne,
    openSuburb: Te,
    foodStreetOpen: Se,
    setFoodStreetOpen: Oe,
    foodStreetView: nt,
    setFoodStreetView: Yt,
    openFoodStreet: he,
    handleMeet: (de, Ke) => meetNpcAction(pe, de, Ke),
    handleBlockedMeet: (de, Ke) => buildGateMessage(pe, de, Ke),
    handleClaimGift: (de, Ke) => learnRecipeAction(pe, de, Ke),
    handleEncounter: (de, Ke) => talkStoryAction(pe, de, Ke),
    handleGiveFlower: (de, Ke) => giveFlowerAction(pe, de, Ke),
    handleSchoolGate: () => visitSchoolGateAction(pe),
    handleFestivalActivity: (de) => doFestivalAction(pe, de),
    handleExercise: (de) => doExerciseAction(pe, de),
    handleBuy: (de, Ke) => buyIngredientPremiumAction(pe, de, Ke),
    handleBuyTransport: (de) => buyVehicleAction(pe, de),
    handleGoMarket: () => travelToMarketAction(pe),
    handleGoGarden: () => travelToGardenAction(pe),
    handleGoOrchard: () => travelToOrchardAction(pe),
    handleMarketBuy: (de) => buyIngredientAction(pe, de),
    handleCatchLoach: () => catchLoachAction(pe),
    handleRiverGather: () => gatherAtRiverAction(pe),
    handleSellFlowerPlaza: () => sellFlowersAtPlazaAction(pe),
    handlePitchFlower: () => sellFlowersToShopAction(pe),
    handleBuyRod: () => buyFishingRodAction(pe),
    handleFish: () => goFishingAction(pe),
    handleCompanionFish: (de) => goFishingWithCompanionAction(pe, de),
    handleMakeBait: (de) => makeBaitAction(pe, de),
    handleSetFishBait: (de) => changeBaitAction(pe, de),
    handleSellFish: (de) => sellFishAction(pe, de),
    handleOrderFishCatch: () => orderFishDeliveryAction(pe),
    handleRenamePlayer: () => renamePlayerAction(pe),
    handleRenameShop: () => renameShopAction(pe),
    handleApplyCharity: () => applyCharitySaleAction(pe),
    handleCharitySell: () => runCharitySaleAction(pe),
    handleCommercial: () => hostBusinessEventAction(pe),
    handleBuyOutfit: (de) => buyOutfitAction(pe, de),
    handleEquip: (de) => equipOutfitAction(pe, de),
    handleBuyHairstyle: (de) => buyHairstyleAction(pe, de),
    handleStyleHair: (de) => applyHairstyleAction(pe, de),
    handleHire: (de) => hireEmployeeAction(pe, de),
    handleBuyFurniture: (de, Ke) => buyFurnitureAction(pe, de, Ke),
    handleBuyBook: (de) => buyBookAction(pe, de),
    handleLibraryRead: (de) => borrowBookAction(pe, de),
    handleBuyCookware: (de) => buyCookwareAction(pe, de),
    handleBuyMaterial: (de, Ke) => buyMaterialAction(pe, de, Ke),
    handleShelterDonate: (de) => donateToShelterAction(pe, de),
    handleShelterEvent: () => shelterPlayEventAction(pe),
    handlePlazaStroll: () => strollPlazaAction(pe),
    handleNightMarketPermit: () => applyPermitAction(pe),
    handleNightMarketTruck: () => buyFoodTruckAction(pe),
    handleNightMarketSell: () => openNightMarketStallAction(pe),
    handleGoldfishEat: () => eatOutAction(pe),
    handleGoldfishHome: () => goHomeAction(pe),
    handleGoldfishCook: () => cookMealAction(pe),
    handleBuyFishFeed: () => advanceOneHourAction(pe),
    handleStallBrowse: (de) => visitNightStallAction(pe, de),
    openMapAt: U,
  };
}

const MAP_DISTRICTS = [
    {
      id: "binhe",
      name: "滨河路",
      emoji: "🏞️",
      desc: "河边与图书馆沿河而建",
      places: ["river", "library"],
      x: "30%",
      y: "74%",
    },
    {
      id: "xuelu",
      name: "学府路",
      emoji: "🏫",
      desc: "学校、广场中学与高中都在这里",
      places: ["school", "middleschool", "highschool"],
      x: "8%",
      y: "58%",
    },
    {
      id: "zhengwu",
      name: "政务街",
      emoji: "🏛️",
      desc: "市政府与医院",
      places: ["government", "hospital"],
      x: "55%",
      y: "8%",
    },
    {
      id: "anjuan",
      name: "安居巷",
      emoji: "🏘️",
      desc: "四个小区、苏记老宅与别墅区",
      places: ["wenyuan", "ankang", "wutongli", "sujizhai", "villa"],
      x: "10%",
      y: "32%",
    },
    {
      id: "tianyuan",
      name: "田园路",
      emoji: "🌾",
      desc: "农贸市场、菜园、果园与收容所",
      places: ["market", "garden", "orchard", "shelter"],
      x: "78%",
      y: "80%",
    },
    {
      id: "qingcao",
      name: "青草坡",
      emoji: "🌳",
      desc: "公园",
      places: ["park"],
      x: "92%",
      y: "30%",
    },
    {
      id: "zhongyang",
      name: "中央广场",
      emoji: "🏟️",
      desc: "小镇广场",
      places: ["plaza"],
      x: "47%",
      y: "36%",
    },
    {
      id: "shangjie",
      name: "商店街",
      emoji: "🏪",
      desc: "东商店街与西商店街的店铺",
      places: ["eaststreet", "weststreet"],
      x: "30%",
      y: "47%",
    },
    {
      id: "huanle",
      name: "欢乐街",
      emoji: "🎡",
      desc: "新开的游乐园就在这条街",
      places: ["amusement"],
      x: "70%",
      y: "56%",
    },
  ],
  MAP_PLACES = [
    {
      id: "home",
      name: "我家",
      emoji: "🏠",
      tag: "睡觉·看书·梳妆",
      desc: "回家睡觉、看书、镜前梳妆，还能在家做家常菜、摆家具。",
      x: "3%",
      y: "6%",
      zone: "private",
    },
    {
      id: "bakery",
      name: "蛋糕店",
      emoji: "🍰",
      tag: "经营·烘焙",
      desc: "蛋糕店是主业：开店接待客人、烘焙点心、研发新配方。",
      x: "25%",
      y: "4%",
      zone: "public",
    },
    {
      id: "hospital",
      name: "医院",
      emoji: "🏥",
      tag: "看病·门诊",
      desc: "镇医院白天门诊：挂号看诊能快速恢复健康，医生和护士白天都在这里上班。",
      x: "47%",
      y: "4%",
      zone: "public",
    },
    {
      id: "highschool",
      name: "高中",
      emoji: "🏫",
      tag: "高中·备考",
      desc: "医院附近的高中：学生们在这里备考，语文老师也在这里任教。备考氛围浓厚，校门口常有学生们的日常。",
      x: "69%",
      y: "5%",
      zone: "public",
    },
    {
      id: "villa",
      name: "别墅区",
      emoji: "🏰",
      tag: "私人别墅",
      desc: "镇郊的独栋别墅，门禁森严。想认识住在这里的伙伴，去收容所、图书馆或公园找找吧。",
      x: "89%",
      y: "6%",
      zone: "private",
    },
    {
      id: "wenyuan",
      name: "文苑小区",
      emoji: "🏘️",
      tag: "伙伴的家·文苑",
      desc: "居民区拆分为四个小区，文苑小区是其中住户最多的一片：普通居民大多住这儿，各户都有门卫，陌生人不能随便进。",
      x: "4%",
      y: "28%",
      zone: "public",
    },
    {
      id: "ankang",
      name: "安康苑",
      emoji: "🏘️",
      tag: "伙伴的家·安康",
      desc: "安康苑是居民区的一个小区，紧邻商店街，住户们白天都在镇上各处上班，傍晚才回家。",
      x: "13%",
      y: "38%",
      zone: "public",
    },
    {
      id: "wutongli",
      name: "梧桐里",
      emoji: "🏘️",
      tag: "伙伴的家·梧桐",
      desc: "梧桐里靠河，是居民区的一个小区：住户们白天多在河边、店里忙活，想认识他们就照时间表去碰面。",
      x: "5%",
      y: "48%",
      zone: "public",
    },
    {
      id: "sujizhai",
      name: "苏记老宅",
      emoji: "🏮",
      tag: "苏家老宅",
      desc: "苏记老宅是苏家的祖宅，长辈们住在这里，老宅常有晚辈回来探望。",
      x: "14%",
      y: "57%",
      zone: "public",
    },
    {
      id: "eaststreet",
      name: "东商店街",
      emoji: "🏪",
      tag: "东街·店铺",
      desc: "商店街拆成东西两条街：东商店街有食材商店、服装店、理发店、鱼竿店、家具店、书店、布料行和银行，员工招聘摊位也在这边。",
      x: "25%",
      y: "30%",
      zone: "public",
    },
    {
      id: "weststreet",
      name: "西商店街",
      emoji: "🏪",
      tag: "西街·店铺",
      desc: "西商店街有苏记甜品面包店、水果摊、菜市场、快餐店、综合超市和花店：苏家甜品和果蔬摊位都在这条街上，店员白天都在当班。",
      x: "30%",
      y: "42%",
      zone: "public",
    },
    {
      id: "plaza",
      name: "小镇广场",
      emoji: "🏟️",
      tag: "休闲·偶遇",
      desc: "广场是小镇最热闹的地方：听听街头艺人、看看手作小摊，运气好还能偶遇伙伴们。",
      x: "47%",
      y: "36%",
      zone: "public",
    },
    {
      id: "middleschool",
      name: "广场中学",
      emoji: "🏫",
      tag: "初中",
      desc: "小镇广场旁的初中：学生们在这里上初一，体育老师在这里教体育。校园公共区域开放，放学时校门口很热闹。",
      x: "69%",
      y: "34%",
      zone: "public",
    },
    {
      id: "park",
      name: "公园",
      emoji: "🌳",
      tag: "锻炼·遛弯",
      desc: "晨跑、健身操、抓泥鳅都在公园；锻炼能恢复健康、提升运动技能，午后还常能碰到遛狗散步的伙伴。",
      x: "89%",
      y: "34%",
      zone: "public",
    },
    {
      id: "school",
      name: "学校",
      emoji: "🏫",
      tag: "幼儿园·小学",
      desc: "幼儿园·小学合并校：孩子们在这里上学，老师们在这里任教，还有学生住校。非师生进不去，放学时在校门口能看到学生们的日常。",
      x: "4%",
      y: "68%",
      zone: "private",
    },
    {
      id: "river",
      name: "河边",
      emoji: "🏞️",
      tag: "散步·钓鱼",
      desc: "河边散步、骑行、钓鱼，吹吹风心情好；带上鱼竿和泥鳅饵料就能开钓，河鲜种类丰富。",
      x: "26%",
      y: "80%",
      zone: "public",
    },
    {
      id: "library",
      name: "图书馆",
      emoji: "📚",
      tag: "借书阅读",
      desc: "河边图书馆 10:00-18:00 开放，借书只能当场读、不能带走，读到的知识照样进脑子。",
      x: "47%",
      y: "66%",
      zone: "public",
    },
    {
      id: "market",
      name: "农贸市场",
      emoji: "🦐",
      tag: "海鲜·需乘车",
      desc: "农贸市场在镇郊，海鲜水产又鲜又全：带鱼、黄花鱼、鱿鱼、生蚝、蛤蜊……必须先有公交卡、小三轮或私家车才能去，一趟往返耗 1 小时。",
      x: "67%",
      y: "80%",
      zone: "public",
    },
    {
      id: "garden",
      name: "郊外菜园",
      emoji: "🥬",
      tag: "下地·需乘车",
      desc: "菜摊老板在郊区有片小菜园自种自卖，下地、浇水、看收成，还能听 TA 唠贴摊补摊的讲究；隔壁水果摊的便宜货，也是这么来的。得有公交卡、小三轮或私家车才能去，一趟往返耗 1 小时。",
      x: "55%",
      y: "92%",
      zone: "public",
    },
    {
      id: "orchard",
      name: "郊外果园",
      emoji: "🍎",
      tag: "采果·需乘车",
      desc: "郊区果园自采自卖，隔壁水果摊的水果便宜，就是因为这儿是自家园子。进园看看果树、尝尝刚摘的果子，明白小镇水果便宜的来头。得有公交卡、小三轮或私家车才能去，一趟往返耗 1 小时。",
      x: "82%",
      y: "92%",
      zone: "public",
    },
    {
      id: "government",
      name: "市政府",
      emoji: "🏛️",
      tag: "改名·义卖·活动",
      desc: "市政府可以改名、改姓、改店名；政府每半年举办一次义卖活动，报名后能摆摊卖料理；也可以自己出资金和材料，请政府帮忙举办商业活动。镇长和秘书白天都在这里办公。",
      x: "36%",
      y: "54%",
      zone: "public",
    },
    {
      id: "shelter",
      name: "动物收容所",
      emoji: "🐶",
      tag: "捐赠·志愿",
      desc: "把多做的点心捐给流浪动物，攒友好度当志愿者；收容所对外开放，志愿者们每周有 2-3 天来当值，平时住在镇上各自的家里。",
      x: "88%",
      y: "64%",
      zone: "public",
    },
    {
      id: "amusement",
      name: "游乐园",
      emoji: "🎡",
      tag: "游乐·放松",
      desc: "欢乐街新开的游乐园：摩天轮、旋转木马、过山车、碰碰车，玩一圈心情大好，周末常有学生来玩。",
      x: "70%",
      y: "56%",
      zone: "public",
    },
  ],
  EAST_STREET_SHOP_IDS = ["grocery", "clothes", "salon", "rod", "furniture", "bookstore", "fabric", "bank"],
  WEST_STREET_SHOP_IDS = ["suji", "fruit", "veg", "fastfood", "supermarket", "flower"];

Object.fromEntries([...EAST_STREET_SHOP_IDS.map((e) => [e, "eaststreet"]), ...WEST_STREET_SHOP_IDS.map((e) => [e, "weststreet"])]);

const SHOP_NPC_IDS = {
  suji: ["xiaotian", "ahe", "tian_tian", "su_jianguo", "su_lihua", "wang_xiuying"],
  fruit: ["xiaomei", "zhao_chunmei"],
  veg: ["tian_guanglin", "wang_fang"],
  fastfood: ["sun_yumei"],
  furniture: ["chen_yongfu"],
  supermarket: ["wu_lijuan"],
  bank: ["he_jing"],
  flower: ["song_xiaoyu"],
  clothes: ["liu_qing"],
  salon: ["yao_jing"],
  bookstore: ["bai_shijie"],
  fabric: ["chen_meihua"],
};

function MapPlaceCard(e) {
  const {
    keyId: n,
    title: s,
    emoji: a,
    sub: o,
    open: l,
    onToggle: c,
    border: u,
    bg: f,
    titleColor: g,
    subColor: x,
    testId: m,
    children: p,
  } = e;
  return renderWithSpeech(
    jsxRuntime.jsxs(
      "div",
      {
        className: `overflow-hidden rounded-2xl border-2 ${u} ${f}`,
        children: [
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": m,
            "aria-expanded": l,
            onClick: c,
            className: "flex w-full items-center gap-2 px-3 py-2.5 text-left active:scale-[0.99]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji text-xl leading-none", children: a }),
              jsxRuntime.jsxs("span", {
                className: "min-w-0 flex-1",
                children: [
                  jsxRuntime.jsx("span", { className: `block text-sm font-black ${g}`, children: segmentByEmoji(s) }),
                  o &&
                    jsxRuntime.jsx("span", {
                      className: `block truncate text-[10px] font-bold ${x}`,
                      children: segmentByEmoji(o),
                    }),
                ],
              }),
              jsxRuntime.jsx("span", {
                "aria-hidden": "true",
                className: `shrink-0 text-base font-black ${g} transition-transform duration-200 ${l ? "" : "-rotate-90"}`,
                children: "▾",
              }),
            ],
          }),
          l && jsxRuntime.jsx("div", { className: "space-y-2 px-2.5 pb-2.5", children: p }),
        ],
      },
      n,
    ),
  );
}

function NpcRecipeGiftsPanel({ ctx: e, npcId: n, value: s, progress: a, detailOpen: o, onToggle: l }) {
  const { state: c, handleClaimGift: u } = e,
    f = NPC_RECIPE_TEACH[n] ?? [];
  return jsxRuntime.jsxs("div", {
    className: "mt-1.5 overflow-hidden rounded-xl border-2 border-[#e8f5e9] bg-white/70",
    children: [
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": `btn-npc-detail-${n}`,
        onClick: l,
        className: "flex w-full items-center gap-2 px-2 py-1.5 text-left active:scale-[0.99]",
        children: [
          jsxRuntime.jsx("span", {
            className: "text-sm leading-none",
            children: jsxRuntime.jsx("span", { className: "emoji", children: "💗" }),
          }),
          jsxRuntime.jsx("span", {
            className: "min-w-0 flex-1 text-[10px] font-black text-[#2e7d32]",
            children: "好感进度 · 可领取的食谱礼物",
          }),
          jsxRuntime.jsx("span", {
            "aria-hidden": "true",
            className: `shrink-0 text-xs font-black text-[#558b2f] transition-transform duration-200 ${o ? "" : "-rotate-90"}`,
            children: "▾",
          }),
        ],
      }),
      o &&
        jsxRuntime.jsxs("div", {
          className: "px-2 pb-2",
          children: [
            jsxRuntime.jsx("div", {
              className: "bar-track",
              style: { height: 5 },
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": Math.round(a * 100),
              "aria-label": `好感进度 ${Math.round(a * 100)}%`,
              children: jsxRuntime.jsx("div", {
                className: "bar-fill",
                style: {
                  width: `${Math.round(a * 100)}%`,
                  background: "linear-gradient(90deg,#c8e6c9,#43a047)",
                },
              }),
            }),
            jsxRuntime.jsx("div", {
              className: "mt-1.5 space-y-1",
              children: f.map((g) => {
                const x = RECIPE_RUNTIME_DATA[g.recipeId],
                  m = g.recipeId in c.recipes,
                  p = s >= g.affection && (c.shelterFriendliness ?? 0) >= g.friendliness;
                return jsxRuntime.jsxs(
                  "div",
                  {
                    className: "flex gap-1.5 rounded-lg bg-white/85 px-2 py-1.5",
                    children: [
                      jsxRuntime.jsx("div", {
                        className: "flex w-[20%] shrink-0 items-center justify-center",
                        children: jsxRuntime.jsx("span", {
                          className: "text-lg",
                          children: jsxRuntime.jsx("span", {
                            className: "emoji",
                            children: (x == null ? void 0 : x.emoji) ?? "🍽️",
                          }),
                        }),
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsxs("p", {
                                className: "text-[11px] font-black text-[#2e7d32]",
                                children: [
                                  (x == null ? void 0 : x.name) ?? g.recipeId,
                                  (x == null ? void 0 : x.subcategory) &&
                                    jsxRuntime.jsx("span", {
                                      className: "ml-1 text-[9px] font-bold text-[#e65100]",
                                      children: CUISINE_LABELS[x.subcategory] ?? x.subcategory,
                                    }),
                                ],
                              }),
                              jsxRuntime.jsx("p", {
                                className: "text-[9px] font-bold text-[#558b2f]",
                                children: segmentByEmoji(`💗好感 ${g.affection} · 🐾友好 ${g.friendliness}`),
                              }),
                            ],
                          }),
                          jsxRuntime.jsx("div", {
                            className: "mt-1 flex flex-wrap items-center gap-1.5",
                            children: m
                              ? jsxRuntime.jsxs("span", {
                                  className: "text-[10px] font-black text-[#2e7d32]",
                                  children: [
                                    jsxRuntime.jsx("span", { className: "emoji", children: "✅" }),
                                    " 已学会",
                                  ],
                                })
                              : p
                                ? jsxRuntime.jsxs("button", {
                                    type: "button",
                                    "data-testid": `btn-claim-gift-${g.recipeId}`,
                                    onClick: () => u(n, g.recipeId),
                                    className: "btn-chunky btn-xs btn-green",
                                    children: [
                                      jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
                                      " 领取",
                                    ],
                                  })
                                : jsxRuntime.jsx("span", {
                                    className: "text-[9px] font-bold text-[#8d6e63]",
                                    children: "未达成",
                                  }),
                          }),
                        ],
                      }),
                    ],
                  },
                  g.recipeId,
                );
              }),
            }),
          ],
        }),
    ],
  });
}

function NpcActionButtons({ ctx: e, npcId: n, met: s, here: a, status: o, locId: l, value: c, level: u }) {
  const { handleMeet: f, handleBlockedMeet: g, handleEncounter: x, handleGiveFlower: m } = e;
  return s
    ? a && o.access === "public"
      ? jsxRuntime.jsxs("div", {
          className: "flex shrink-0 flex-wrap items-center gap-1",
          children: [
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": `btn-chat-${n}`,
              onClick: () => x(n, l),
              className: "btn-chunky btn-xs btn-green shrink-0",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "💬" }), " 聊聊"],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": `btn-flower-${n}`,
              onClick: () => m(n, l),
              className: "btn-chunky btn-xs btn-deepred shrink-0",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "💐" }), " 送花"],
            }),
          ],
        })
      : jsxRuntime.jsxs("span", {
          className:
            "shrink-0 rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: u.emoji }),
            " ",
            u.label,
            " ",
            c,
          ],
        })
    : a
      ? o.access === "public"
        ? jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": `btn-meet-${n}`,
            onClick: () => f(n, l),
            className: "btn-chunky btn-xs btn-green shrink-0",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🙋" }), " 初次见面"],
          })
        : jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": `btn-blocked-${n}`,
            onClick: () => g(n, o),
            className: "btn-chunky btn-xs btn-ghost shrink-0",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🔒" }), " 拜访受限"],
          })
      : jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": `btn-find-${n}`,
          onClick: () => g(n, o),
          className: "btn-chunky btn-xs btn-ghost shrink-0",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "📍" }), " 去找TA"],
        });
}

function NpcDetailCard({ ctx: e, npcId: n, badgeText: s, locId: a }) {
  const { state: o, toggleNpcDetail: l, npcDetailOpen: c } = e,
    u = NPC_RUNTIME_DATA[n];
  if (!u) return null;
  const f = (o.metNpcs ?? []).includes(n),
    g = o.affection[n] ?? 0,
    x = getAffectionTier(g),
    m = getNpcLocationAt(n, o.hour, o.day),
    p = m.place === a;
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
              children: u.emoji,
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-[140px] flex-1",
              style: { minWidth: 140 },
              children: [
                jsxRuntime.jsxs("p", {
                  className: "truncate text-sm font-black text-[#2e7d32]",
                  children: [
                    f
                      ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                          children: [
                            u.name,
                            " ",
                            jsxRuntime.jsx("span", {
                              className: "text-[10px] font-bold text-[#558b2f]",
                              children: u.title,
                            }),
                          ],
                        })
                      : jsxRuntime.jsx("span", { className: "text-[#8d9c8d]", children: "？？？" }),
                    f && isNpcBirthday(o, n) && jsxRuntime.jsx("span", { className: "emoji ml-0.5", children: "🎂" }),
                  ],
                }),
                jsxRuntime.jsx("span", {
                  className:
                    "mt-0.5 inline-block rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-bold text-[#b8860b]",
                  children: segmentByEmoji(s),
                }),
                g >= z2 &&
                  jsxRuntime.jsx("span", {
                    className:
                      "mt-0.5 inline-block rounded-full bg-[#e1f5fe] px-1.5 py-px text-[9px] font-bold text-[#0277bd]",
                    children: mbtiOf(n),
                  }),
              ],
            }),
            jsxRuntime.jsx(NpcActionButtons, {
              ctx: e,
              npcId: n,
              met: f,
              here: p,
              status: m,
              locId: a,
              value: g,
              level: x,
            }),
          ],
        }),
        f &&
          jsxRuntime.jsx(NpcRecipeGiftsPanel, {
            ctx: e,
            npcId: n,
            value: g,
            progress: x.progress,
            detailOpen: !!c[n],
            onToggle: () => l(n),
          }),
      ],
    },
    n,
  );
}

function NpcGroupStrip({ ctx: e, npcIds: n, locId: s, badgeText: a, maxShown: o = 4, extraAction: l }) {
  const [c, u] = React.useState(null),
    [f, g] = React.useState(!1);
  if (!Array.isArray(n) || n.length === 0)
    return jsxRuntime.jsxs("p", {
      className:
        "rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
      children: [
        jsxRuntime.jsx("span", { className: "emoji", children: "👥" }),
        " 此刻这里没有熟悉的伙伴。",
      ],
    });
  const x = f ? n : n.slice(0, o),
    m = n.length - x.length,
    p = new Set(e.state.metNpcs ?? []);
  return jsxRuntime.jsxs("div", {
    className: "space-y-1.5",
    children: [
      x.map((y) => {
        const j = NPC_RUNTIME_DATA[y];
        if (!j) return null;
        const v = getNpcLocationAt(y, e.state.hour, e.state.day),
          w = c === y,
          N = p.has(y),
          S = N ? j.name : "？？？",
          C = N ? j.title : "";
        return jsxRuntime.jsxs(
          "div",
          {
            className: "rounded-xl border-2 border-[#e8f5e9] bg-[#f7fbf3] p-1.5",
            children: [
              jsxRuntime.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": `here-npc-row-${y}`,
                    "aria-expanded": w,
                    "aria-label": `${S}，${v.activity}${w ? "，点击收起详情" : "，点击展开详情"}`,
                    onClick: () => u(w ? null : y),
                    className:
                      "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-1 py-0.5 text-left active:scale-[0.99]",
                    children: [
                      jsxRuntime.jsx("span", {
                        className:
                          "emoji flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-base",
                        children: j.emoji,
                      }),
                      jsxRuntime.jsxs("span", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("span", {
                            className: "block truncate text-xs font-black text-[#2e7d32]",
                            children: [
                              S,
                              " ",
                              C &&
                                jsxRuntime.jsx("span", {
                                  className: "text-[10px] font-bold text-[#558b2f]",
                                  children: C,
                                }),
                            ],
                          }),
                          jsxRuntime.jsxs("span", {
                            className: "block truncate text-[10px] font-bold text-[#8d6e63]",
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: v.emoji }),
                              " ",
                              v.activity,
                            ],
                          }),
                        ],
                      }),
                      jsxRuntime.jsx("span", {
                        className: "material-icons shrink-0 text-[#b08a6a]",
                        style: { fontSize: 16 },
                        "aria-hidden": "true",
                        children: w ? "expand_less" : "expand_more",
                      }),
                    ],
                  }),
                  l &&
                    jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": `${l.testIdPrefix}-${y}`,
                      "aria-label": `和${S}${l.label}`,
                      onClick: () => l.onClick(y),
                      className:
                        "shrink-0 rounded-full border-2 border-[#ffe0b2] bg-white px-2 py-0.5 text-[10px] font-black text-[#e65100] active:scale-95",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🤝" }),
                        " ",
                        l.label,
                      ],
                    }),
                ],
              }),
              w &&
                jsxRuntime.jsx("div", {
                  className: "mt-1.5",
                  children: jsxRuntime.jsx(NpcDetailCard, { ctx: e, npcId: y, badgeText: a, locId: s }),
                }),
            ],
          },
          y,
        );
      }),
      m > 0 &&
        jsxRuntime.jsx("button", {
          type: "button",
          "data-testid": "here-npcs-more",
          onClick: () => g((y) => !y),
          className:
            "w-full rounded-xl border-2 border-dashed border-[#c8e6c9] bg-white/70 px-3 py-1.5 text-center text-[11px] font-black text-[#2e7d32] active:scale-[0.99]",
          children: f ? "收起，只看前几位" : `还有 ${m} 位伙伴在这里 · 展开全部`,
        }),
    ],
  });
}

function SushiStallSection({ state: e, commit: n, testId: s = "home-sec-sushi-stall" }) {
  const [a, o] = React.useState(!0),
    l = Array.isArray(e.sushiStall) ? e.sushiStall : [],
    c = listSushiStallStock(e),
    u = (g) => {
      const x = addToSushiStall(e, g);
      n(x.state, x.message, x.ok ? "success" : "error");
    },
    f = (g) => {
      const x = removeFromSushiStall(e, g);
      n(x.state, x.message, x.ok ? "success" : "error");
    };
  return renderWithSpeech(
    jsxRuntime.jsxs(SectionCard, {
      title: "寿司摊 · 出摊卖货",
      emoji: "🍣",
      sub: "在公园青草坡 / 夜市中央广场出摊：把做好的寿司/鱼丸摆上摊，明早自动卖完入账（售价 1.25 倍）",
      open: a,
      onToggle: () => o((g) => !g),
      testId: s,
      children: [
        jsxRuntime.jsxs("div", {
          className: "rounded-xl bg-[#fbf3e4] px-2.5 py-2",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1 text-[11px] font-black text-[#4a2c17]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🏮" }),
                " 当前摊位",
                l.length > 0 &&
                  jsxRuntime.jsxs("span", {
                    className: "num ml-1 text-[#b8860b]",
                    children: ["（", l.length, "/3 种）"],
                  }),
              ],
            }),
            l.length === 0
              ? jsxRuntime.jsx("p", {
                  className: "py-1 text-[11px] font-bold text-[#b08a6a]",
                  children: "摊上还没摆东西，明早就不会有入账啦",
                })
              : jsxRuntime.jsx("div", {
                  className: "space-y-1.5",
                  children: l.map((g) => {
                    const x = RECIPE_RUNTIME_DATA[g.recipeId];
                    return jsxRuntime.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-2 rounded-lg bg-white/70 px-2 py-1.5",
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "emoji shrink-0 text-base",
                            children: (x == null ? void 0 : x.emoji) ?? "🍣",
                          }),
                          jsxRuntime.jsxs("span", {
                            className:
                              "min-w-0 flex-1 truncate text-[11px] font-bold text-[#4a2c17]",
                            children: [
                              (x == null ? void 0 : x.name) ?? g.recipeId,
                              jsxRuntime.jsxs("span", {
                                className: "num ml-1 text-[#e04a63]",
                                children: ["x", g.qty],
                              }),
                            ],
                          }),
                          jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-stall-take-${g.recipeId}`,
                            onClick: () => f(g.recipeId),
                            className: "btn-chunky btn-sm btn-ghost text-[10px]!",
                            children: "撤下一份",
                          }),
                        ],
                      },
                      g.pid,
                    );
                  }),
                }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2.5 rounded-xl bg-[#fbf3e4] px-2.5 py-2",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1 text-[11px] font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛒" }), " 可摆料理"],
            }),
            c.length === 0
              ? jsxRuntime.jsxs("p", {
                  className: "py-1 text-[11px] font-bold text-[#b08a6a]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🍳" }),
                    " 先去厨房做寿司或鱼丸吧",
                  ],
                })
              : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [
                    l.length >= 3 &&
                      jsxRuntime.jsxs("p", {
                        className:
                          "mb-1.5 rounded-lg bg-[#fff3bf] px-2 py-1 text-[10px] font-bold text-[#b8860b]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "⚠️" }),
                          " 寿司摊最多摆 3 种料理，先撤下一份再摆新的",
                        ],
                      }),
                    jsxRuntime.jsx("div", {
                      className: "space-y-1.5",
                      children: c.map((g) => {
                        const x = RECIPE_RUNTIME_DATA[g.recipeId];
                        return jsxRuntime.jsxs(
                          "div",
                          {
                            className: "flex items-center gap-2 rounded-lg bg-white/70 px-2 py-1.5",
                            children: [
                              jsxRuntime.jsx("span", {
                                className: "emoji shrink-0 text-base",
                                children: (x == null ? void 0 : x.emoji) ?? g.emoji,
                              }),
                              jsxRuntime.jsxs("span", {
                                className:
                                  "min-w-0 flex-1 truncate text-[11px] font-bold text-[#4a2c17]",
                                children: [
                                  (x == null ? void 0 : x.name) ?? g.name,
                                  jsxRuntime.jsxs("span", {
                                    className: "num ml-1 text-[#2e7d32]",
                                    children: ["库存 x", g.qty],
                                  }),
                                ],
                              }),
                              jsxRuntime.jsx("button", {
                                type: "button",
                                "data-testid": `btn-stall-place-${g.recipeId}`,
                                onClick: () => u(g.recipeId),
                                className: "btn-chunky btn-sm btn-green text-[10px]!",
                                children: "摆上一份",
                              }),
                            ],
                          },
                          g.recipeId,
                        );
                      }),
                    }),
                  ],
                }),
          ],
        }),
      ],
    }),
  );
}

function ExerciseCard({ state: e, ex: n, onExercise: s }) {
  const a = e.exercisedToday >= DAILY_EXERCISE_LIMIT || e.energy < n.energy;
  return jsxRuntime.jsxs(
    "div",
    {
      className: "flex gap-3 rounded-xl border-2 border-[#9ccc65] bg-[#fbfdf6] p-2.5",
      children: [
        jsxRuntime.jsx("div", {
          className: "flex w-[20%] shrink-0 items-center justify-center",
          children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: n.emoji }),
        }),
        jsxRuntime.jsxs("div", {
          className: "min-w-0 flex-1",
          children: [
            jsxRuntime.jsxs("div", {
              children: [
                jsxRuntime.jsxs("p", {
                  className: "text-sm font-black text-[#4a2c17]",
                  children: [
                    n.name,
                    jsxRuntime.jsx("span", {
                      className: "ml-1.5 text-[10px] font-bold text-[#558b2f]",
                      children:
                        n.location === "park"
                          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "🌳" }),
                                " 公园",
                              ],
                            })
                          : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "🏞️" }),
                                " 河边",
                              ],
                            }),
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", { className: "text-[11px] text-[#b08a6a]", children: n.desc }),
                jsxRuntime.jsxs("p", {
                  className: "text-[10px] font-bold text-[#6b4226]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                    n.energy,
                    " 精力 · 健康 +",
                    n.healthGain,
                    " · 运动技能 +",
                    n.skillGain,
                    " · 卫生 -8",
                  ],
                }),
              ],
            }),
            jsxRuntime.jsx("div", {
              className: "mt-1.5 flex flex-wrap items-center gap-1.5",
              children: jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `btn-exercise-${n.id}`,
                onClick: () => s(n.id),
                disabled: a,
                className: "btn-chunky btn-xs btn-green",
                children: "锻炼",
              }),
            }),
          ],
        }),
      ],
    },
    n.id,
  );
}
