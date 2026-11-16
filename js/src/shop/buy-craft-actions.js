function ensureToolSkillMap(e, n) {
  const s = e.home.toolSkillMap ?? {};
  if (Object.keys(s).length === 0) {
    const o = e.home.tools.length > 0 ? e.home.tools : ["basic"],
      l = Math.floor((e.home.toolSkill ?? 0) / o.length);
    for (const c of o) s[c] = l;
  }
  const a = bestToolId(e);
  s[a] = Math.min(100, Math.max(0, (s[a] ?? 0) + n));
}

function buyTool(e, n) {
  const s = CRAFT_TOOL_MAP[n];
  if (!s || s.price === void 0) return { state: e, ok: !1, message: "工具不存在" };
  if (e.home.tools.includes(n)) return { state: e, ok: !1, message: "已经拥有这件工具" };
  if (e.coins < s.price) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  ((a.coins -= s.price), (a.stats.spent += s.price), a.home.tools.push(n));
  const o = a.home.toolSkillMap ?? {};
  if (Object.keys(o).length === 0) {
    const u = a.home.tools,
      f = Math.floor((a.home.toolSkill ?? 0) / Math.max(1, u.length));
    for (const g of u) o[g] = f;
  }
  const l = Object.values(o),
    c = l.length > 0 ? Math.floor(l.reduce((u, f) => u + f, 0) / l.length) : 0;
  return (
    (o[n] = Math.min(100, Math.max(10, c))),
    { state: a, ok: !0, message: `购入「${s.name}」，制作成功率 +${s.bonus}%` }
  );
}

function buyMaterial(e, n, s) {
  const a = MATERIAL_MAP[n];
  if (!a) return { state: e, ok: !1, message: "材料不存在" };
  const o = a.price * s;
  if (e.coins < o) return { state: e, ok: !1, message: "金币不足" };
  const l = deepClone(e);
  return (
    (l.coins -= o),
    (l.stats.spent += o),
    (l.home.materials[n] = (l.home.materials[n] ?? 0) + s),
    { state: l, ok: !0, message: `购入 ${a.name} x${s}` }
  );
}

function buyFurniture(e, n, s) {
  const a = FURNITURE_MAP[n];
  if (!a || a.buyPrice === void 0) return { state: e, ok: !1, message: "这件家具不能直接购买" };
  if (e.coins < a.buyPrice) return { state: e, ok: !1, message: "金币不足" };
  const o = deepClone(e);
  ((o.coins -= a.buyPrice), (o.stats.spent += a.buyPrice));
  const l = WOOD_MAP.pine,
    c = COLOR_MAP[s ?? "natural"] ?? COLOR_MAP.natural;
  return (
    o.home.furniture.push({
      fid: n,
      material: l.id,
      color: c.id,
      desc: `${l.name}·${c.name}的${a.name}`,
      crafted: !1,
      floor: floorForFurniture(n),
    }),
    { state: o, ok: !0, message: `买到了「${a.name}」！` }
  );
}

function placeFurniture(e, n, s) {
  if (s !== "1f" && s !== "2f" && s !== "3f" && s !== "b1")
    return { state: e, ok: !1, message: "家具只能摆放在 1F/2F/3F，或撤到 B1 地下室" };
  const a = e.home.furniture[n];
  if (!a) return { state: e, ok: !1, message: "家具不存在" };
  if (a.floor === s) return { state: e, ok: !1, message: `这件家具已经在${FLOOR_LABELS[s]}了` };
  const o = deepClone(e);
  if (((o.home.furniture[n] = { ...o.home.furniture[n], floor: s }), s === "b1")) {
    const l = makePlacementId(a.fid, n);
    return (
      (o.shopPlacements = (o.shopPlacements ?? []).filter((c) => c !== l)),
      { state: o, ok: !0, message: "已撤到 B1 地下室（家具仓库），也从店铺撤下了" }
    );
  }
  return { state: o, ok: !0, message: `已搬到 ${FLOOR_LABELS[s]}` };
}

function countFurnitureOnFloor(e, n) {
  return e.home.furniture.filter((s) => getFloor(s) === n).length;
}

function getSewingToolBonus(e) {
  let n = 0;
  for (const s of e.sewingTools ?? []) {
    const a = SEWING_TOOL_MAP[s];
    a && a.bonus > n && (n = a.bonus);
  }
  return n;
}

function buySewingTool(e, n) {
  const s = SEWING_TOOL_MAP[n];
  if (!s || s.price === void 0) return { state: e, ok: !1, message: "工具不存在" };
  if ((e.sewingTools ?? []).includes(n)) return { state: e, ok: !1, message: "已经拥有这件工具" };
  if (e.coins < s.price) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  return (
    (a.coins -= s.price),
    (a.stats.spent += s.price),
    (a.sewingTools = [...(a.sewingTools ?? []), n]),
    { state: a, ok: !0, message: `购入「${s.name}」，缝纫成功率 +${s.bonus}%` }
  );
}

function calcSewingSuccessRate(e, n, s = !1) {
  const a =
    0.35 + ((e.sewingSkill ?? 0) / 100) * 0.3 + getSewingToolBonus(e) / 100 - (n - 1) * 0.09 - (s ? 0.12 : 0);
  return Math.max(0.1, Math.min(0.95, a * __tmPsychSR(e)));
}

function getFabricInfo(e) {
  const n = MATERIAL_MAP[e],
    s = FABRIC_TYPES[e];
  return {
    name: (n == null ? void 0 : n.name) ?? "布料",
    colorName: (s == null ? void 0 : s.colorName) ?? "原色",
    pattern: (s == null ? void 0 : s.pattern) ?? "素色",
  };
}

function craftSewingItem(e, n, s, a = !1) {
  var j;
  if (!MATERIAL_MAP[s] || !FABRIC_TYPES[s]) return { state: e, ok: !1, message: "布料选择无效" };
  let l = SEWING_MAP[n];
  if (a) {
    const v = Object.values(SEWING_MAP).filter((w) => {
      const N = OUTFIT_MAP[w.outfitId];
      return !(N != null && N.gender) || N.gender === "unisex" || N.gender === e.gender;
    });
    if (v.length === 0) return { state: e, ok: !1, message: "没有可凭感觉做的款式" };
    l = v[Math.floor(Math.random() * v.length)];
  }
  if (!l) return { state: e, ok: !1, message: "配方不存在" };
  const c = OUTFIT_MAP[l.outfitId];
  if (!c) return { state: e, ok: !1, message: "款式不存在" };
  if (c.gender && c.gender !== "unisex" && c.gender !== e.gender)
    return {
      state: e,
      ok: !1,
      message: `这件是${c.gender === "male" ? "男" : "女"}装，你的角色穿不了`,
    };
  if (e.energy < 10) return { state: e, ok: !1, message: "精力不足" };
  const u = checkTimeBlocked(e, TIME_COST.craftClothing / 60);
  if (u) return { state: e, ok: !1, message: u };
  const f = deepClone(e),
    g = [
      [s, 1],
      ["thread", l.thread],
    ];
  (l.button && g.push(["button", l.button]), l.ribbon && g.push(["ribbon", l.ribbon]));
  for (const [v, w] of g) {
    const N = f.home.materials[v] ?? 0;
    if (N < w) {
      const S = ((j = MATERIAL_MAP[v]) == null ? void 0 : j.name) ?? v;
      return { state: e, ok: !1, message: `材料不足：还缺 ${S} x${w - N}` };
    }
  }
  for (const [v, w] of g)
    ((f.home.materials[v] -= w), f.home.materials[v] <= 0 && delete f.home.materials[v]);
  ((f.energy -= 10), decayMood(f, 10), consumeSatiety(f, TIME_COST.craftClothing / 60), advanceHours(f, TIME_COST.craftClothing));
  const x = calcSewingSuccessRate(f, l.difficulty, a),
    m = Math.random() < x;
  f.sewingSkill = Math.min(100, (f.sewingSkill ?? 0) + (m ? 4 : 2));
  const p = getFabricInfo(s),
    y = `用${p.name}缝的${c.name}（${p.colorName} · ${p.pattern}）`;
  if (m) {
    f.outfits.owned.includes(c.id) || f.outfits.owned.push(c.id);
    const v = { outfitId: c.id, fabricId: s, desc: y };
    return (
      (f.sewnClothes = [...(f.sewnClothes ?? []), v]),
      {
        state: f,
        ok: !0,
        message: `缝制成功！${y}，魅力 +${c.charm}（成功率 ${Math.round(x * 100)}%）`,
        success: !0,
        outfitId: c.id,
        desc: y,
      }
    );
  }
  return {
    state: f,
    ok: !0,
    message: `没缝好……布料和针线白搭了，缝纫技能 +2（成功率 ${Math.round(x * 100)}%）`,
    success: !1,
  };
}

function getCropCareProgress(e) {
  return (e.wateredCount ?? 0) + (e.fertilized ?? 0);
}

function isCropMature(e) {
  const n = SEED_MAP[e.seedId];
  return n ? getCropCareProgress(e) >= n.days : !1;
}

function buySeed(e, n) {
  var o;
  const s = SEED_MAP[n];
  if (!s) return { state: e, ok: !1, message: "这种子不认识哦" };
  if (e.coins < s.price) return { state: e, ok: !1, message: `金币不够，${s.name}要 ¥${s.price}` };
  const a = deepClone(e);
  return (
    (a.coins -= s.price),
    (a.stats.spent += s.price),
    (a.seeds = { ...(a.seeds ?? {}), [n]: (((o = a.seeds) == null ? void 0 : o[n]) ?? 0) + 1 }),
    { state: a, ok: !0, message: `买了${s.name}（¥${s.price}），收进阳台种子盒` }
  );
}

function buyFertilizer(e) {
  if (e.coins < FERTILIZER_PRICE) return { state: e, ok: !1, message: `金币不够，小袋肥料要 ¥${FERTILIZER_PRICE}` };
  const n = deepClone(e);
  return (
    (n.coins -= FERTILIZER_PRICE),
    (n.stats.spent += FERTILIZER_PRICE),
    (n.fertilizer = (n.fertilizer ?? 0) + 1),
    { state: n, ok: !0, message: `买了一袋小袋肥料（¥${FERTILIZER_PRICE}），施肥能加快作物生长` }
  );
}

function handleFlowerPotAction(e, n, s) {
  var c;
  if (!Number.isInteger(n) || n < 1 || n > MAX_POTS) return { state: e, ok: !1, message: "没有这个花盆" };
  const a = SEED_MAP[s];
  if (!a) return { state: e, ok: !1, message: "这种子不认识哦" };
  const o = Array.isArray(e.plants) ? e.plants : [];
  if (o.some((u) => u.slot === n))
    return { state: e, ok: !1, message: `第 ${n} 号花盆里已经种了东西` };
  if ((((c = e.seeds) == null ? void 0 : c[s]) ?? 0) < 1)
    return { state: e, ok: !1, message: `没有${a.name}，去农贸市场买一点吧` };
  const l = deepClone(e);
  return (
    (l.seeds = { ...l.seeds, [s]: l.seeds[s] - 1 }),
    l.seeds[s] <= 0 && delete l.seeds[s],
    (l.plants = [
      ...o.filter((u) => u.slot !== n),
      { slot: n, seedId: s, plantedDay: l.day, wateredToday: !0, wateredCount: 0, fertilized: 0 },
    ].sort((u, f) => u.slot - f.slot)),
    {
      state: l,
      ok: !0,
      message: `在 ${n} 号花盆种下${a.name}（生长 ${a.days} 天），今天已经浇过水了，记得每天来浇水`,
    }
  );
}

function waterPlant(e, n) {
  const s = Array.isArray(e.plants) ? e.plants : [],
    a = s.find((c) => c.slot === n);
  if (!a) return { state: e, ok: !1, message: "这个花盆里还没有种东西" };
  if (a.wateredToday) return { state: e, ok: !1, message: "今天已经浇过水啦，明天再来" };
  const o = SEED_MAP[a.seedId],
    l = deepClone(e);
  return (
    (l.plants = s.map((c) => (c.slot === n ? { ...c, wateredToday: !0 } : c))),
    { state: l, ok: !0, message: `${o ? o.name : "作物"}浇过水了，明天会长大一点` }
  );
}

function fertilizePlant(e, n) {
  const s = Array.isArray(e.plants) ? e.plants : [],
    a = s.find((f) => f.slot === n);
  if (!a) return { state: e, ok: !1, message: "这个花盆里还没有种东西" };
  if ((e.fertilizer ?? 0) < 1)
    return { state: e, ok: !1, message: "没有小袋肥料，去农贸市场买一袋吧" };
  const o = SEED_MAP[a.seedId],
    l = deepClone(e);
  ((l.fertilizer = (l.fertilizer ?? 0) - 1),
    (l.plants = s.map((f) => (f.slot === n ? { ...f, fertilized: (f.fertilized ?? 0) + 1 } : f))));
  const c = l.plants.find((f) => f.slot === n),
    u = c ? isCropMature(c) : !1;
  return {
    state: l,
    ok: !0,
    message: u
      ? `施了肥，${o ? o.name : "作物"}长势喜人，已经可以收获啦！`
      : `施了肥，${o ? o.name : "作物"}长得更快了（进度 +1）`,
  };
}

function harvestPlant(e, n) {
  var c;
  const s = Array.isArray(e.plants) ? e.plants : [],
    a = s.find((u) => u.slot === n);
  if (!a) return { state: e, ok: !1, message: "这个花盆里还没有种东西" };
  if (!isCropMature(a)) return { state: e, ok: !1, message: "还没成熟，再浇几天水吧" };
  const o = SEED_MAP[a.seedId];
  if (!o) return { state: e, ok: !1, message: "这株作物不认识了" };
  const l = deepClone(e);
  if (((l.plants = s.filter((u) => u.slot !== n)), o.kind === "veggie" || o.kind === "fruit")) {
    const u = l.ingredients[o.harvestId];
    return (
      u ? (u.qty += 1) : (l.ingredients[o.harvestId] = { qty: 1, freshness: 0 }),
      INGREDIENT_MAP[o.harvestId] &&
        !l.seenIngredients.includes(o.harvestId) &&
        (l.seenIngredients = [...l.seenIngredients, o.harvestId]),
      {
        state: l,
        ok: !0,
        message: `收获${o.harvestName}×1，收进食材袋（${((c = INGREDIENT_MAP[o.harvestId]) == null ? void 0 : c.name) ?? o.harvestName}）`,
      }
    );
  }
  if (o.kind === "flower") {
    l.homeFlowers = (l.homeFlowers ?? 0) + 1;
    const u = SEED_TO_PETAL_MAP[a.seedId];
    let f = "";
    if (u && INGREDIENT_MAP[u]) {
      const g = l.ingredients[u];
      (g ? (g.qty += 1) : (l.ingredients[u] = { qty: 1, freshness: 0 }),
        l.seenIngredients.includes(u) || (l.seenIngredients = [...l.seenIngredients, u]),
        (f = `，「${INGREDIENT_MAP[u].name}」×1 收进食材袋`));
    }
    return {
      state: l,
      ok: !0,
      message: `摘下${o.harvestName}×1（阳台现有鲜花 ${l.homeFlowers} 朵）${f}：花瓣可装饰蛋糕或熬酱，鲜花还能扎成花束送人`,
    };
  }
  return (
    (l.homeBonsai = (l.homeBonsai ?? 0) + 1),
    {
      state: l,
      ok: !0,
      message: `${o.harvestName}养成啦，摆进家里当装饰（家里现有盆景 ${l.homeBonsai} 件）`,
    }
  );
}

function clearPlantPot(e, n) {
  const s = Array.isArray(e.plants) ? e.plants : [];
  if (!s.find((l) => l.slot === n)) return { state: e, ok: !1, message: "这个花盆里还没有种东西" };
  const o = deepClone(e);
  return (
    (o.plants = s.filter((l) => l.slot !== n)),
    { state: o, ok: !0, message: "把花盆腾空了，可以种新的" }
  );
}

function harvestBalconyFlowers(e) {
  if ((e.homeFlowers ?? 0) < 1) return { state: e, ok: !1, message: "阳台还没有收好的鲜花" };
  const n = deepClone(e);
  return (
    (n.homeFlowers = (n.homeFlowers ?? 0) - 1),
    (n.flowerBouquets = (n.flowerBouquets ?? 0) + 1),
    {
      state: n,
      ok: !0,
      message: `把阳台的花扎成一束收进背包（背包花束 ×${n.flowerBouquets}），见到伙伴时当面送吧`,
    }
  );
}

function sellBalconyFlowers(e) {
  if ((e.homeFlowers ?? 0) < 1) return { state: e, ok: !1, message: "阳台还没有收好的鲜花" };
  const n = deepClone(e);
  return (
    (n.homeFlowers = (n.homeFlowers ?? 0) - 1),
    (n.homeFlowerDecor = (n.homeFlowerDecor ?? 0) + 1),
    {
      state: n,
      ok: !0,
      message: `把花插进花瓶摆在家里（家里装饰花 ×${n.homeFlowerDecor}，装饰度 +2）`,
    }
  );
}

function updateAllPlants(e) {
  const n = [];
  (Array.isArray(e.plants) || (e.plants = []),
    (e.plants = e.plants.map((s) => {
      const a = s.wateredToday === !0;
      return {
        ...s,
        wateredToday: !1,
        wateredCount: a ? (s.wateredCount ?? 0) + 1 : (s.wateredCount ?? 0),
      };
    })));
  for (const s of e.plants) {
    const a = SEED_MAP[s.seedId];
    a && isCropMature(s) && n.push(`${a.name}成熟了，去阳台收获吧`);
  }
  return n;
}

function processFestivalSouvenirs(e) {
  const n = [],
    s = Array.isArray(e.festivalSouvenirs) ? e.festivalSouvenirs : [];
  for (const a of FESTIVAL_SOUVENIRS)
    s.includes(a.festivalId) &&
      n.push({
        key: `fest_${a.festivalId}`,
        emoji: a.emoji,
        name: a.name,
        desc: `节日特殊纪念品：${a.desc}`,
      });
  for (const a of ALL_ACHIEVEMENTS)
    a.check(e) &&
      n.push({
        key: `ach_${a.id}`,
        emoji: a.emoji,
        name: `${a.name}纪念章`,
        desc: `成就「${a.name}」：${a.desc}`,
      });
  for (const [a, o] of Object.entries(e.fishRecords ?? {})) {
    const l = INGREDIENT_MAP[a];
    l &&
      n.push({
        key: `fish_${a}`,
        emoji: l.emoji,
        name: `${l.name}标本`,
        desc: `钓到过 ${o}cm 的${l.name}，做成标本收进收藏架`,
      });
  }
  return n;
}

function isCollectionPlaced(e, n) {
  const s = Array.isArray(e.collectionsPlaced) ? e.collectionsPlaced : [],
    a = deepClone(e);
  return s.includes(n)
    ? ((a.collectionsPlaced = s.filter((o) => o !== n)),
      { state: a, ok: !0, message: "把收藏品从架上取下来了" })
    : s.length >= 8
      ? { state: e, ok: !1, message: "收藏架摆满了（最多 8 件），先取下一件吧" }
      : ((a.collectionsPlaced = [...s, n]),
        { state: a, ok: !0, message: "收藏品摆上架了，家里更有味道（装饰度 +2）" });
}

function getCollectionBonus(e) {
  var n;
  return (((n = e.collectionsPlaced) == null ? void 0 : n.length) ?? 0) * 2;
}

function getDayWeather(e) {
  const n = weatherOfDay(e.day),
    s = WEATHER_TYPES[n];
  return { weatherId: n, label: s.label, emoji: s.emoji, desc: s.desc, outdoor: s.outdoor };
}

function checkStargazingAvailable(e) {
  var s;
  if ((e.hour ?? 0) < STARGAZING_HOUR)
    return { ok: !1, reason: `现在才 ${e.hour} 点，晚上 ${STARGAZING_HOUR} 点后再来天台观星` };
  const n = weatherOfDay(e.day);
  return isSunny(n)
    ? e.stargazedToday
      ? { ok: !1, reason: "今晚已经观过星了，明天再来吧" }
      : { ok: !0, reason: "" }
    : {
        ok: !1,
        reason: `今晚${((s = WEATHER_TYPES[n]) == null ? void 0 : s.label) ?? "天气不佳"}，云层把星星挡住了，改天晴夜再来`,
      };
}

function pickConstellation(e) {
  const n = STARS_GAME;
  return n[Math.max(0, Math.abs(e) % n.length)].id;
}

function stargaze(e) {
  const n = checkStargazingAvailable(e);
  if (!n.ok) return { state: e, ok: !1, message: n.reason };
  const s = deepClone(e),
    a = pickConstellation(s.day);
  ((s.stargazedToday = !0),
    (s.stargazingSeen ?? []).includes(a) || (s.stargazingSeen = [...(s.stargazingSeen ?? []), a]),
    (s.mood = Math.min(MAX_MOOD, (s.mood ?? 100) + 8)));
  const o = STAR_MAP[a];
  return {
    state: s,
    ok: !0,
    message: `在天台看到了「${(o == null ? void 0 : o.name) ?? a}」${(o == null ? void 0 : o.emoji) ?? ""}，心情 +8${(s.stargazingSeen ?? []).includes(a) ? "" : "，星图点亮了一颗"}（观星图鉴 ${(s.stargazingSeen ?? []).length}/${STARS_GAME.length}）`,
  };
}

const FISH_TYPES = new Set([
    "crucian",
    "carp",
    "grass_carp",
    "silver_carp",
    "bass",
    "snakehead",
    "yellow_catfish",
    "river_shrimp",
    "river_crab",
    "snail",
    "mandarin_fish",
    "swamp_eel",
    "topmouth_culter",
    "koi",
    "peach_mandarin",
    "icefish",
    "autumn_bass",
    "winter_carp",
    "knife_fish",
    "bitterling",
    "river_eel",
    "bream",
    "lenok",
    "goby",
    "osmanthus_mandarin",
    "yellowcheek",
    "night_catfish",
    "spiny_eel",
    "gudgeon",
  ]),
  MAX_FISH_PER_SPECIES = 6;

function countFishInTank(e) {
  return (Array.isArray(e.fishTank) ? e.fishTank : []).reduce((n, s) => n + (s.qty ?? 0), 0);
}

function addFishToTank(e, n) {
  var f;
  const s = INGREDIENT_MAP[n];
  if (!s || s.category !== "fish" || !FISH_TYPES.has(n))
    return { state: e, ok: !1, message: "这种鱼不能入养护缸" };
  if ((((f = e.ingredients[n]) == null ? void 0 : f.qty) ?? 0) < 1)
    return { state: e, ok: !1, message: `背包里没有${s.name}了` };
  if (countFishInTank(e) >= MAX_FISH_PER_SPECIES)
    return { state: e, ok: !1, message: "缸住不下啦（最多 6 条），先取出几条再做菜吧" };
  const o = deepClone(e);
  ((o.ingredients[n].qty -= 1), o.ingredients[n].qty <= 0 && delete o.ingredients[n]);
  const l = Array.isArray(o.fishTank) ? o.fishTank : [],
    c = o.fishRecords[n] ?? 0,
    u = l.find((g) => g.ingId === n);
  return (
    u
      ? ((u.qty += 1), (u.record = Math.max(u.record ?? 0, c)))
      : l.push({ ingId: n, qty: 1, record: c }),
    (o.fishTank = l),
    { state: o, ok: !0, message: `把 1 条${s.name}放进养护缸养着（入缸不变质）` }
  );
}

function takeFishFromTank(e, n) {
  const s = Array.isArray(e.fishTank) ? e.fishTank : [],
    a = s.find((f) => f.ingId === n);
  if (!a || (a.qty ?? 0) < 1) return { state: e, ok: !1, message: "缸里没有这种鱼" };
  const o = INGREDIENT_MAP[n],
    l = deepClone(e),
    c = a.record ?? 0;
  l.fishRecords[n] = Math.max(l.fishRecords[n] ?? 0, c);
  const u = l.ingredients[n];
  return (
    u ? (u.qty += 1) : (l.ingredients[n] = { qty: 1, freshness: 0 }),
    (l.fishTank = s
      .map((f) => (f.ingId === n ? { ...f, qty: f.qty - 1 } : f))
      .filter((f) => f.qty > 0)),
    {
      state: l,
      ok: !0,
      message: `从养护缸取出 1 条${(o == null ? void 0 : o.name) ?? "鱼"}，随取随做`,
    }
  );
}

function checkRecipeResearchable(e, n) {
  const s = RECIPE_RUNTIME_DATA[n];
  if (!s) return { ok: !1, reason: "配方不存在" };
  if (n in e.recipes) return { ok: !1, reason: "已研发" };
  if (s.giftNpc) {
    const a = NPC_RUNTIME_DATA[s.giftNpc];
    return {
      ok: !1,
      reason: `这是「${(a == null ? void 0 : a.name) ?? "收容所伙伴"}」珍藏的外国料理，需要与 TA 交好并提升收容所友好度后获赠`,
    };
  }
  if (s.bookId) {
    const a = BOOK_MAP[s.bookId];
    return { ok: !1, reason: `需要在家阅读《${(a == null ? void 0 : a.name) ?? "对应书籍"}》解锁` };
  }
  if (e.coins < s.unlockCost) return { ok: !1, reason: "金币不足" };
  if (s.needRecipes) {
    for (const a of s.needRecipes)
      if (!(a in e.recipes)) return { ok: !1, reason: "需要先研发前置配方" };
  }
  return { ok: !0 };
}

function researchRecipe(e, n) {
  const s = checkRecipeResearchable(e, n);
  if (!s.ok) return { state: e, ok: !1, message: s.reason ?? "无法研发" };
  const a = RECIPE_RUNTIME_DATA[n],
    o = deepClone(e);
  ((o.coins -= a.unlockCost), (o.stats.spent += a.unlockCost));
  const l = calcCookingBonus(o);
  if (Math.random() < l)
    return (
      (o.recipes[n] = 0),
      (o.cookSkill = Math.min(100, o.cookSkill + 2)),
      (o.home.toolSkill = Math.min(100, o.home.toolSkill + 1)),
      ensureToolSkillMap(o, 1),
      {
        state: o,
        ok: !0,
        message: `研发成功！成功掌握「${a.name}」（成功率 ${Math.round(l * 100)}%）`,
        success: !0,
      }
    );
  const u = 8 + Math.floor(Math.random() * 8);
  injurePlayer(o, u);
  const f = `工具熟练度 ${o.home.toolSkill} · 烹饪熟练度 ${o.cookSkill} · 材料理解度 ${o.home.materialKnowledge}（成功率 ${Math.round(l * 100)}%）`;
  return {
    state: o,
    ok: !0,
    message: `研发「${a.name}」失败，炉火/刀具出了点事故，受了点伤，健康 -${u}。${f}`,
    success: !1,
  };
}

function calcCookingBonus(e) {
  var l;
  const s = (toolSkillMapOf(e) / 100) * 0.18,
    a = ((e.cookSkill ?? 0) / 100) * 0.18,
    o = ((((l = e.home) == null ? void 0 : l.materialKnowledge) ?? 0) / 100) * 0.11;
  return Math.max(
    0.1,
    Math.min(0.92, Math.max(0.35, Math.min(0.92, 0.45 + s + a + o)) * __tmPsychSR(e)),
  );
}

function buyIngredient(e, n, s, a = 1) {
  const o = INGREDIENT_MAP[n];
  if (!o) return { state: e, ok: !1, message: "食材不存在" };
  const l = Math.ceil(o.price * s * a);
  if (e.coins < l) return { state: e, ok: !1, message: "金币不足" };
  const c = deepClone(e);
  ((c.coins -= l), (c.stats.spent += l));
  const u = c.ingredients[n];
  return (
    u ? (u.qty += s) : (c.ingredients[n] = { qty: s, freshness: 0 }),
    (c.seenIngredients ?? []).includes(n) ||
      (c.seenIngredients = [...(c.seenIngredients ?? []), n]),
    recordCatch(c, n, s),
    { state: c, ok: !0, message: `购入 ${o.name} x${s}` }
  );
}

function countFreshIngredients(e) {
  const n = deepClone(e);
  let s = 0;
  for (const [a, o] of Object.entries(n.ingredients))
    o.freshness === 3 && (delete n.ingredients[a], (s += 1));
  return (s > 0 && (n.stats.cleanups += s), { state: n, removed: s });
}

function getProductStock(e, n) {
  const s = deepClone(e),
    a = s.products.find((o) => o.pid === n);
  return (
    a &&
      ((a.qty = (a.qty ?? 1) - 1),
      a.qty <= 0 &&
        ((s.products = s.products.filter((o) => o.pid !== n)),
        (s.shelves = s.shelves.filter((o) => o.pid !== n)))),
    s
  );
}

function calcRecipeIngredientCost(e) {
  var a;
  const n = RECIPE_RUNTIME_DATA[e];
  if (!n) return 0;
  let s = 0;
  for (const [o, l] of Object.entries(n.ings))
    s += (((a = INGREDIENT_MAP[o]) == null ? void 0 : a.price) ?? 0) * l;
  return s;
}

function getFinalProductPrice(e, n) {
  if (typeof e.customPrice == "number" && e.customPrice > 0) return e.customPrice;
  const s = RECIPE_RUNTIME_DATA[e.recipeId],
    a = s ? Math.max(s.baseCost, Math.ceil(calcRecipeIngredientCost(s.id) / 5)) : 0;
  return Math.round(a * QUALITY_META[e.quality].mult * n);
}

function getProcessingMethod(e, n) {
  var c, u;
  const s = PROCESSING_RECIPE_MAP[n];
  if (!s) return { ok: !1, reason: "加工方法不存在" };
  if (Array.isArray(s.needRecipes) && s.needRecipes.length > 0) {
    for (const f of s.needRecipes)
      if (!(f in e.recipes))
        return { ok: !1, reason: "还没有解锁这道加工：先在食谱里学会对应料理" };
  }
  let a;
  if ((s.ingsFish ?? 0) > 0 && ((a = findFishIngredient(e)), !a))
    return { ok: !1, reason: "需要一条鲜鱼（河边钓、市场买都行，腐烂的不能用）" };
  let o;
  if ((s.ingsShrimp ?? 0) > 0 && ((o = findShrimpIngredient(e)), !o))
    return { ok: !1, reason: "需要一只虾类食材（河边捞的河虾、商店的虾仁都行，腐烂的不能用）" };
  for (const [f, g] of Object.entries(s.ings)) {
    const x = e.ingredients[f];
    if (!x || x.qty < g)
      return {
        ok: !1,
        reason: `材料不够：${((c = INGREDIENT_MAP[f]) == null ? void 0 : c.name) ?? f} 还差 ${g - ((x == null ? void 0 : x.qty) ?? 0)} 份`,
      };
    if (x.freshness === 3)
      return { ok: !1, reason: `${((u = INGREDIENT_MAP[f]) == null ? void 0 : u.name) ?? f} 已腐烂，不能用了` };
  }
  if (s.packOnly && (e.home.jarQty ?? 0) < 1)
    return { ok: !1, reason: "需要 1 个空罐头（订购界面有售）" };
  if (e.energy < 4) return { ok: !1, reason: "精力不足，先休息一下吧" };
  const l = checkTimeBlocked(e, TIME_COST.process / 60);
  return l ? { ok: !1, reason: l } : { ok: !0, fishId: a, shrimpId: o };
}

function findShrimpIngredient(e) {
  var n;
  for (const [s, a] of Object.entries(e.ingredients))
    if (
      !(!a || a.qty <= 0 || a.freshness === 3) &&
      ((n = INGREDIENT_MAP[s]) == null ? void 0 : n.shrimp) === !0
    )
      return s;
}

function findFishIngredient(e) {
  var n;
  for (const [s, a] of Object.entries(e.ingredients))
    if (
      !(!a || a.qty <= 0 || a.freshness === 3) &&
      ((n = INGREDIENT_MAP[s]) == null ? void 0 : n.category) === "fish"
    )
      return s;
}

function processIngredient(e, n) {
  var y, j;
  const s = getProcessingMethod(e, n);
  if (!s.ok) return { state: e, ok: !1, message: s.reason ?? "无法加工" };
  const a = PROCESSING_RECIPE_MAP[n],
    o = deepClone(e);
  advanceHours(o, TIME_COST.process);
  const l = consumeSatiety(o, TIME_COST.process / 60);
  (decayMood(o, 4), (o.energy = Math.max(0, o.energy - 4)));
  for (const [v, w] of Object.entries(a.ings)) {
    const N = o.ingredients[v];
    N && ((N.qty -= w), N.qty <= 0 && delete o.ingredients[v]);
  }
  if ((a.ingsFish ?? 0) > 0 && s.fishId) {
    const v = o.ingredients[s.fishId];
    v && ((v.qty -= a.ingsFish ?? 1), v.qty <= 0 && delete o.ingredients[s.fishId]);
  }
  if ((a.ingsShrimp ?? 0) > 0 && s.shrimpId) {
    const v = o.ingredients[s.shrimpId];
    v && ((v.qty -= a.ingsShrimp ?? 1), v.qty <= 0 && delete o.ingredients[s.shrimpId]);
  }
  // 产出物的食材元数据：下面 return 的提示语要用它拼名字。
  // 原压缩码写作 `if (!a.packOnly) { const c = INGREDIENT_MAP[a.out], … }`，
  // 而 return 在块外引用 c —— 打包时的作用域裁剪问题，运行到这一步必抛
  // `c is not defined`，整次加工（含已扣的食材与精力）全部作废。
  let c;
  if (!a.packOnly) {
    c = INGREDIENT_MAP[a.out];
    const u = o.ingredients[a.out];
    (u ? (u.qty += a.outQty) : (o.ingredients[a.out] = { qty: a.outQty, freshness: 0 }),
      c &&
        !(o.seenIngredients ?? []).includes(a.out) &&
        (o.seenIngredients = [...(o.seenIngredients ?? []), a.out]));
  }
  let f = "";
  if (a.jarRecipe) {
    const v = RECIPE_RUNTIME_DATA[a.jarRecipe];
    if ((o.home.jarQty ?? 0) >= 1) {
      o.home.jarQty -= 1;
      (o.products.push({
        pid: makeId(a.jarRecipe),
        recipeId: a.jarRecipe,
        quality: "good",
        remaining: (v == null ? void 0 : v.shelfDays) ?? 14,
        qty: 1,
      }),
        (f = `，另装罐「${(v == null ? void 0 : v.name) ?? a.jarRecipe}」1 罐可上架售卖`));
    } else f = "，没有空罐头，这锅没能装罐（订购界面有售）";
  }
  ((o.cookSkill = Math.min(100, (o.cookSkill ?? 0) + 1)),
    (o.hygiene = Math.max(0, (o.hygiene ?? 100) - 4)),
    (o.home.materialKnowledge = Math.min(100, o.home.materialKnowledge + 1)));
  const g = s.fishId ? (((y = INGREDIENT_MAP[s.fishId]) == null ? void 0 : y.name) ?? "鱼") : "",
    x = g ? `（用了${g}）` : "",
    m = s.shrimpId ? (((j = INGREDIENT_MAP[s.shrimpId]) == null ? void 0 : j.name) ?? "虾") : "",
    p = m ? `（用了${m}）` : "";
  return {
    state: o,
    ok: !0,
    message: `${a.emoji} ${a.name}完成，得到${(c == null ? void 0 : c.name) ?? a.out}×${a.outQty}${f}${x}${p}${l ? "（饿着肚子干活，好难受）" : ""}`,
  };
}

function sellRandomShelfItem(e, n, s) {
  const a = [...e.shelves];
  if (a.length === 0) return { sold: !1, line: "" };
  const o = a[Math.floor(Math.random() * a.length)],
    l = e.products.find((f) => f.pid === o.pid);
  if (!l) return ((e.shelves = e.shelves.filter((f) => f.pid !== o.pid)), { sold: !1, line: "" });
  const c = RECIPE_RUNTIME_DATA[l.recipeId];
  let u = SPEED_PRICE_MULTIPLIER[String(o.mult)] ?? 0.5;
  if (
    (c && c.taste === e.dailyTaste && (u = Math.min(0.98, u + 0.18)),
    (u = Math.max(
      0.05,
      Math.min(
        0.98,
        u + s.moodFactor + s.shopBonus + s.personalBonus + s.weekendBonus + s.festivalMult,
      ),
    )),
    Math.random() < u)
  ) {
    const f = getFinalProductPrice(l, o.mult);
    return (
      (e.cashRegister = (e.cashRegister ?? 0) + f),
      (e.stats.sold += 1),
      (e.stats.earned += f),
      (l.qty = (l.qty ?? 1) - 1),
      l.qty <= 0 &&
        ((e.products = e.products.filter((g) => g.pid !== o.pid)),
        (e.shelves = e.shelves.filter((g) => g.pid !== o.pid))),
      { sold: !0, line: "", name: (c == null ? void 0 : c.name) ?? "点心" }
    );
  }
  return { sold: !1, line: `${n} 看了看${(c == null ? void 0 : c.name) ?? "点心"}，嫌贵走了` };
}

function generateCustomerVisit(e, n) {
  const s = [],
    a = 1 + Math.floor(Math.random() * 2);
  for (let l = 0; l < a; l += 1) {
    const c = CROWD_NAMES[Math.floor(Math.random() * CROWD_NAMES.length)];
    if (e.shelves.length === 0) break;
    const u = n.dineInSeats > 0 && Math.random() < 0.6,
      f = sellRandomShelfItem(e, c, n);
    if (f.sold)
      if (u) {
        const g = sellRandomShelfItem(e, c, n),
          x = g.sold && g.name ? `${f.name}和${g.name}` : f.name;
        s.push(`${c} 在店里坐下点了${x}（堂食）`);
      } else s.push(`${c} 打包带走了${f.name}`);
    else f.line && s.push(f.line);
  }
  const o = s.filter((l) => l.includes("买走") || l.includes("点了")).length;
  return { log: s, soldCount: o };
}

function runCustomerFlow(e, n = !1) {
  if (e.visits <= 0)
    return { state: e, ok: !1, message: "今日客流已用完，休息一晚再来吧", log: [] };
  if (e.shelves.length === 0)
    return { state: e, ok: !1, message: "货架空空如也，先上架点心吧", log: [] };
  if (n && e.employees.length === 0)
    return { state: e, ok: !1, message: "没有员工看店，回店里亲自营业或先雇佣员工吧", log: [] };
  const s = checkTimeBlocked(e, TIME_COST.openShop / 60);
  if (s) return { state: e, ok: !1, message: s, log: [] };
  const a = deepClone(e);
  (advanceHours(a, TIME_COST.openShop), (a.visits -= 1));
  const o = consumeSatiety(a, TIME_COST.openShop / 60),
    l = ((e.mood - 50) / 100) * 0.1,
    c = Math.min(0.12, calcShopScore(e) * 8e-4),
    u = (a.shopPlacements ?? []).some((F) => F.slice(0, F.lastIndexOf("_")) === "f_ac"),
    f = c + (u ? 0.02 : 0),
    g = n ? 0 : Math.min(0.1, calcCharm(e) * 0.001),
    x = isWeekendDay(e.day) ? 0.05 : 0,
    m = getFestivalSellMultiplier(e.day),
    p = n ? EMPLOYEE_MAP[e.employees[0]] : void 0,
    y = new Set();
  for (const F of a.shopPlacements ?? []) {
    const J = F.slice(0, F.lastIndexOf("_"));
    SEATING_FURNITURE.has(J) && y.add(J);
  }
  const j = {
      moodFactor: l,
      shopBonus: f,
      personalBonus: g,
      weekendBonus: x,
      festivalMult: m,
      dineInSeats: y.size,
    },
    { log: v, soldCount: w } = generateCustomerVisit(a, j);
  n || (a.negotiation = Math.min(100, (a.negotiation ?? 0) + w));
  const N = p ? `${p.name}替你` : "你",
    S = j.dineInSeats > 0 ? `，${j.dineInSeats} 张桌席可堂食` : "",
    C = randomEncounter(a),
    V = m > 0 ? `，节日加成今日单价 +${Math.round(m * 100)}%` : "",
    E = C.text ? ` ${C.text}` : "";
  return {
    state: C.state,
    ok: !0,
    message: `${N}接待了 ${v.length} 位客人，成交 ${w} 单${S}${V}，钱款已存入收银台（到店内点收银台盘点入账）${o ? "（饿着肚子卖货，快撑不住了）" : ""}${E}`,
    log: [...v, ...(C.text ? [C.text] : [])],
  };
}

const DAYS_PER_YEAR = 183,
  SPRING_START_DAY = 1,
  SPRING_END_DAY = 7,
  SUMMER_START_DAY = 8,
  SUMMER_END_DAY = 15,
  MAX_STAT_VALUE = 100;

function dayOfYear(e) {
  return ((e - 1) % DAYS_PER_YEAR) + 1;
}

function isSpring(e) {
  const n = dayOfYear(e);
  return n >= SPRING_START_DAY && n <= SPRING_END_DAY;
}

function isSummer(e) {
  const n = dayOfYear(e);
  return n >= SUMMER_START_DAY && n <= SUMMER_END_DAY;
}

function daysUntilYearEnd(e) {
  const n = dayOfYear(e);
  return isSpring(e) ? 0 : DAYS_PER_YEAR - n + 1;
}

const CHARITY_DURATION_DAYS = 3,
  CHARITY_PRICE_FACTOR = 1.6;

function applyCharitySale(e) {
  if (e.charityApplied)
    return { state: e, ok: !1, message: "你已经报名本次义卖了，义卖期记得来市政府摆摊" };
  if (!isSpring(e.day))
    return {
      state: e,
      ok: !1,
      message: isSummer(e.day)
        ? "义卖正在进行中，报名已截止，等下一次吧"
        : `现在不是报名期，距下次报名还有 ${daysUntilYearEnd(e.day)} 天`,
    };
  if (e.coins < MAX_STAT_VALUE) return { state: e, ok: !1, message: `报名费 ¥${MAX_STAT_VALUE}，金币不够啦` };
  const n = deepClone(e);
  return (
    (n.coins -= MAX_STAT_VALUE),
    (n.charityApplied = !0),
    { state: n, ok: !0, message: "报名成功！义卖期开始时来市政府摆摊，把料理卖出好价钱吧" }
  );
}

function runCharitySale(e) {
  if (!e.charityApplied) return { state: e, ok: !1, message: "还没报名义卖，先找镇长秘书报名吧" };
  if (!isSummer(e.day))
    return {
      state: e,
      ok: !1,
      message: isSpring(e.day)
        ? "现在还在报名期，义卖还没开始，等义卖期再来摆摊"
        : "义卖期已经结束了，等下一次义卖吧",
    };
  if ((e.charitySoldToday ?? 0) >= CHARITY_DURATION_DAYS)
    return { state: e, ok: !1, message: `今天的义卖份额卖完了，明天再来（每天最多 ${CHARITY_DURATION_DAYS} 份）` };
  const n = e.products.filter((u) => {
    var f;
    return (
      u.quality !== "fail" &&
      (u.qty ?? 1) > 0 &&
      (((f = RECIPE_RUNTIME_DATA[u.recipeId]) == null ? void 0 : f.system) ?? "bakery") === "cuisine"
    );
  });
  if (n.length === 0)
    return {
      state: e,
      ok: !1,
      message: "背包里没有可卖的料理（家常料理才能上义卖摊），先去做几份吧",
    };
  if (e.energy < 4) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, TIME_COST.charitySell / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  (advanceHours(a, TIME_COST.charitySell),
    (a.energy = Math.max(0, a.energy - 4)),
    (a.charitySoldToday = (a.charitySoldToday ?? 0) + 1));
  const o = n[Math.floor(Math.random() * n.length)],
    l = RECIPE_RUNTIME_DATA[o.recipeId],
    c = getFinalProductPrice(o, CHARITY_PRICE_FACTOR);
  return (
    (a.coins += c),
    (a.stats.earned += c),
    (a.stats.sold += 1),
    (o.qty = (o.qty ?? 1) - 1),
    o.qty <= 0 && (a.products = a.products.filter((u) => u.pid !== o.pid)),
    {
      state: a,
      ok: !0,
      message: `义卖摊上，「${(l == null ? void 0 : l.name) ?? "料理"}」以 ¥${c} 被街坊买走！收入直接进钱包（今日 ${a.charitySoldToday}/${CHARITY_DURATION_DAYS}）`,
    }
  );
}

const BUSINESS_EVENT_COST = 200,
  BUSINESS_EVENT_MATERIALS = [
    ["flour", 5],
    ["sugar", 3],
    ["egg", 2],
  ],
  BUSINESS_EVENT_MIN_DAYS = 3,
  BUSINESS_EVENT_MAX_DAYS = 5;

function hostBusinessEvent(e) {
  var s, a;
  if (e.coins < BUSINESS_EVENT_COST) return { state: e, ok: !1, message: `举办商业活动需要 ¥${BUSINESS_EVENT_COST}，金币不够啦` };
  for (const [o, l] of BUSINESS_EVENT_MATERIALS) {
    const c = ((s = e.ingredients[o]) == null ? void 0 : s.qty) ?? 0;
    if (c < l)
      return {
        state: e,
        ok: !1,
        message: `材料不够：${((a = INGREDIENT_MAP[o]) == null ? void 0 : a.name) ?? o} 还差 ${l - c} 份`,
      };
  }
  const n = deepClone(e);
  n.coins -= BUSINESS_EVENT_COST;
  for (const [o, l] of BUSINESS_EVENT_MATERIALS)
    ((n.ingredients[o].qty -= l), n.ingredients[o].qty <= 0 && delete n.ingredients[o]);
  return (
    (n.commercialBoostDays = Math.min(5, (n.commercialBoostDays ?? 0) + BUSINESS_EVENT_MIN_DAYS)),
    {
      state: n,
      ok: !0,
      message: `商业活动筹办成功！政府帮你造势，接下来 ${BUSINESS_EVENT_MIN_DAYS} 天每天额外 +${BUSINESS_EVENT_MAX_DAYS} 客流`,
    }
  );
}

let charitySaleCount = 0;

function buyIngredientBulk(e, n, s) {
  const a = INGREDIENT_MAP[n];
  if (!a) return { state: e, ok: !1, message: "食材不存在" };
  const o = a.price * s;
  if (e.coins < o) return { state: e, ok: !1, message: "金币不足" };
  const l = deepClone(e);
  ((l.coins -= o), (l.stats.spent += o), (charitySaleCount += 1));
  const c = { id: `o_${Date.now()}_${charitySaleCount}`, ingId: n, qty: s, cost: o, arriveDay: l.day + 1 };
  return (l.orders.push(c), { state: l, ok: !0, message: `已下单 ${a.name} x${s}，明天送达` });
}

function removeOrder(e, n) {
  const s = deepClone(e),
    a = s.orders.find((o) => o.id === n);
  return (a && ((s.orders = s.orders.filter((o) => o.id !== n)), (s.coins += a.cost)), s);
}

function buyIngredientDiscounted(e, n) {
  const s = INGREDIENT_MAP[n];
  if (!s) return { state: e, ok: !1, message: "食材不存在" };
  const a = Math.ceil(s.price * 0.85);
  if (e.coins < a) return { state: e, ok: !1, message: "金币不足" };
  const o = deepClone(e);
  ((o.coins -= a), (o.stats.spent += a));
  const l = o.ingredients[n];
  return (
    l ? (l.qty += 1) : (o.ingredients[n] = { qty: 1, freshness: 0 }),
    (o.seenIngredients ?? []).includes(n) ||
      (o.seenIngredients = [...(o.seenIngredients ?? []), n]),
    recordCatch(o, n),
    { state: o, ok: !0, message: `从摊位买了新鲜${s.name} x1（¥${a}，比食材商店便宜）` }
  );
}

function getShopLevel(e) {
  return Math.min(
    10,
    Math.max(1, typeof e.shopUpgradeLevel == "number" ? Math.floor(e.shopUpgradeLevel) : 1),
  );
}

function getNextShopLevel(e) {
  return getShopLevel(e) + 1;
}

function countShopPlacements(e) {
  const n = new Set();
  let s = 0;
  for (const a of e.shopPlacements ?? []) {
    const o = a.slice(0, a.lastIndexOf("_"));
    if (n.has(o)) continue;
    n.add(o);
    const l = FURNITURE_MAP[o];
    l && (l.size ?? "big") !== "small" && (s += 1);
  }
  return s;
}

function upgradeShop(e) {
  const n = getShopLevel(e);
  if (n >= 10) return { state: e, ok: !1, message: "店铺已经升到最高级 Lv.10 啦" };
  const s = 300 * n;
  if (e.coins < s)
    return { state: e, ok: !1, message: `升级到 Lv.${n + 1} 需要 ¥${s}，口袋里的金币不够` };
  const a = deepClone(e);
  return (
    (a.coins -= s),
    (a.shopUpgradeLevel = n + 1),
    {
      state: a,
      ok: !0,
      message: `店铺升级到 Lv.${n + 1}！店内可拜访大家具增加到 ${a.shopUpgradeLevel + 1} 件（升级费用 ¥${s}）`,
    }
  );
}

function makePlacementId(e, n) {
  return `${e}_${n}`;
}

function toggleShopPlacement(e, n) {
  const s = deepClone(e);
  if (s.shopPlacements.includes(n))
    return (
      (s.shopPlacements = s.shopPlacements.filter((l) => l !== n)),
      { state: s, ok: !0, message: "已从店铺撤下这件家具" }
    );
  const a = n.slice(0, n.lastIndexOf("_")),
    o = FURNITURE_MAP[a];
  if (o && (o.size ?? "big") !== "small" && floorForFurniture(a) === "1f") {
    const l = countShopPlacements(s),
      c = getNextShopLevel(s);
    if (l >= c)
      return {
        state: e,
        ok: !1,
        message: `店里可拜访大家具已满（${l}/${c} 件），去「店铺 · 装修」的店铺升级提高上限`,
      };
  }
  return (s.shopPlacements.push(n), { state: s, ok: !0, message: "已摆进店铺，装饰度提升了！" });
}

function tidyShelves(e, n) {
  if (n.shelves.length === 0)
    return { state: e, ok: !1, message: "货架上没有点心，先上架几件再整理吧" };
  if (n.energy < 10) return { state: e, ok: !1, message: "精力不足（需要 10 点），先休息一下" };
  n.energy -= 10;
  let s = 0;
  for (const a of n.shelves) {
    const o = n.products.find((l) => l.pid === a.pid);
    o && o.remaining < 99 && ((o.remaining += 1), (s += 1));
  }
  return {
    state: n,
    ok: !0,
    message: s > 0 ? `整理完货架，${s} 件点心保鲜期 +1 天` : "货架上的点心还很新鲜，暂时不用整理",
  };
}

function collectCashRegister(e, n) {
  const s = n.cashRegister ?? 0;
  if (s <= 0)
    return { state: e, ok: !1, message: "收银台里没有待入账的营业额，卖出点心的钱会先暂存在这里" };
  if (n.energy < 10) return { state: e, ok: !1, message: "精力不足（需要 10 点），先休息一下" };
  ((n.energy -= 10), (n.coins += s), (n.cashRegister = 0));
  const a = Math.min(20, Math.floor(s / 50));
  return (
    (n.coins += a),
    (n.mood = Math.min(MAX_MOOD, n.mood + 2)),
    {
      state: n,
      ok: !0,
      message:
        a > 0
          ? `盘点账目：营业额 ¥${s} 已入账，客人还留下 ¥${a} 小费！心情也变好了`
          : `盘点账目：营业额 ¥${s} 已入账，心情也变好了`,
    }
  );
}

function serveCustomers(e, n) {
  if (n.shelves.length === 0)
    return { state: e, ok: !1, message: "桌上没有可招待的点心，先去货架上架吧" };
  if (n.energy < 10) return { state: e, ok: !1, message: "精力不足（需要 10 点），先休息一下" };
  n.energy -= 10;
  const s = n.shelves[Math.floor(Math.random() * n.shelves.length)],
    a = n.products.find((c) => c.pid === s.pid);
  if (!a)
    return (
      (n.shelves = n.shelves.filter((c) => c.pid !== s.pid)),
      { state: n, ok: !0, message: "桌上那盘点心不见了，顺手把空位清掉了" }
    );
  const o = RECIPE_RUNTIME_DATA[a.recipeId],
    l = getFinalProductPrice(a, s.mult);
  return (
    (n.cashRegister = (n.cashRegister ?? 0) + l),
    (n.stats.sold += 1),
    (n.stats.earned += l),
    (a.qty = (a.qty ?? 1) - 1),
    a.qty <= 0 &&
      ((n.products = n.products.filter((c) => c.pid !== a.pid)),
      (n.shelves = n.shelves.filter((c) => c.pid !== a.pid))),
    {
      state: n,
      ok: !0,
      message: `你招呼客人坐下品尝，卖出了${(o == null ? void 0 : o.name) ?? "点心"}，¥${l} 已存入收银台！`,
    }
  );
}

function advanceHour(e, n) {
  const s = checkTimeBlocked(e, 1);
  return s
    ? { state: e, ok: !1, message: s }
    : ((n.hour += 1),
      (n.energy = Math.min(MAX_ENERGY, n.energy + 20)),
      { state: n, ok: !0, message: "在软垫椅上打了个盹，精力 +20（过了 1 小时）" });
}

function consumeEnergy(e, n, s) {
  return n.energy < 5
    ? { state: e, ok: !1, message: "精力不足（需要 5 点），先休息一下" }
    : ((n.energy -= 5),
      (n.mood = Math.min(MAX_MOOD, n.mood + 3)),
      { state: n, ok: !0, message: `你顺手打理了一下${s}，店里更温馨了，心情 +3` });
}

const JUICE_RECIPES = {
  strawberry: "strawberry_juice",
  mango: "mango_juice",
  peach: "peach_juice",
  apple: "apple_juice",
};

function checkJuiceIngredients(e, n) {
  var u;
  const s = Object.entries(n.ingredients).find(([f, g]) => {
    var x;
    return (
      ((x = INGREDIENT_MAP[f]) == null ? void 0 : x.category) === "fruit" &&
      ((g == null ? void 0 : g.qty) ?? 0) > 0
    );
  });
  if (!s) return { state: e, ok: !1, message: "背包里没有水果可榨，去农贸市场买点水果吧" };
  const [a, o] = s;
  ((o.qty -= 1),
    o.qty <= 0 && delete n.ingredients[a],
    (n.mood = Math.min(MAX_MOOD, n.mood + 4)),
    (n.energy = Math.min(MAX_ENERGY, n.energy + 4)));
  const l = JUICE_RECIPES[a];
  let c = "";
  if (l) {
    const f = RECIPE_RUNTIME_DATA[l];
    (n.products.push({
      pid: makeId(l),
      recipeId: l,
      quality: "good",
      remaining: (f == null ? void 0 : f.shelfDays) ?? 2,
      qty: 1,
    }),
      (c = `，多榨出一杯「${(f == null ? void 0 : f.name) ?? "鲜榨果汁"}」可上架售卖`));
  }
  return {
    state: n,
    ok: !0,
    message: `用${((u = INGREDIENT_MAP[a]) == null ? void 0 : u.name) ?? "水果"}榨了一杯果汁，心情 +4、精力 +4${c}`,
  };
}

function drinkCoffee(e, n) {
  return (n.coffeeUsedDay ?? 0) === n.day
    ? { state: e, ok: !1, message: "今天已经喝过咖啡啦，明天再来一杯" }
    : ((n.coffeeUsedDay = n.day),
      (n.energy = Math.min(MAX_ENERGY, n.energy + 8)),
      (n.mood = Math.min(MAX_MOOD, n.mood + 4)),
      { state: n, ok: !0, message: "煮了一杯热咖啡，精力 +8、心情 +4（每天一次）" });
}

function placeFurnitureInShop(e, n) {
  const s = FURNITURE_MAP[n];
  if (!s) return { state: e, ok: !1, message: "这件家具不存在" };
  if (!(e.shopPlacements ?? []).some((l) => l.slice(0, l.lastIndexOf("_")) === n))
    return { state: e, ok: !1, message: `${s.name}还没摆进店铺，先去「家 · 家具」摆进来吧` };
  const o = deepClone(e);
  return n === "f_shelf"
    ? tidyShelves(e, o)
    : n === "f_cashier"
      ? collectCashRegister(e, o)
      : n === "f_table"
        ? serveCustomers(e, o)
        : n === "f_chair"
          ? advanceHour(e, o)
          : n === "f_juicer"
            ? checkJuiceIngredients(e, o)
            : n === "f_coffee"
              ? drinkCoffee(e, o)
              : n === "f_fridge"
                ? { state: o, ok: !0, message: "冰箱正在店里保鲜：全部食材新鲜度下降减半" }
                : n === "f_ac"
                  ? { state: o, ok: !0, message: "空调正在运转：客人成交率 +2%、睡觉回复心情 +2" }
                  : consumeEnergy(e, o, s.name);
}

function buildFurnitureCatalog() {
  return [...DEFAULT_HOME_FURNITURE, ...DEFAULT_SHOP_PLACEMENTS].map((e) => {
    var n, s, a;
    return {
      ...e,
      desc: `${(n = WOOD_MAP[e.material]) == null ? void 0 : n.name}·${(s = COLOR_MAP[e.color]) == null ? void 0 : s.name}的${((a = FURNITURE_MAP[e.fid]) == null ? void 0 : a.name) ?? ""}`,
      floor: floorForFurniture(e.fid),
    };
  });
}

function buildShopFurnitureList() {
  return DEFAULT_SHOP_PLACEMENTS.map((e, n) => makePlacementId(e.fid, DEFAULT_HOME_FURNITURE.length + n));
}

function createInitialShopState() {
  return {
    furniture: buildFurnitureCatalog(),
    materials: { ...DEFAULT_CRAFT_MATERIALS },
    readBooks: [],
    ownedBooks: ["book_basic"],
    tools: ["basic"],
    toolSkill: 0,
    toolSkillMap: { basic: 0 },
    materialKnowledge: 0,
    furnitureExp: 0,
    sleptToday: 0,
    playedToday: 0,
    bookProgress: {},
    jarQty: 100,
  };
}

function getInitialBookList() {
  return [...DEFAULT_COOKWARES];
}

function createInitialIngredients() {
  const e = {};
  for (const [n, s] of Object.entries(MATERIAL_BASE_COST)) e[n] = { qty: s, freshness: 0 };
  return e;
}

function getIngredientIds() {
  return Object.keys(MATERIAL_BASE_COST);
}

function createNewGameState(e, n, s = "female", a = 25) {
  const o = defaultAppearance();
  return {
    playerName: e,
    shopName: n,
    coins: 200,
    day: 1,
    season: 3,
    energy: MAX_ENERGY,
    seenIngredients: getIngredientIds(),
    ingredients: createInitialIngredients(),
    products: [],
    recipes: { classic_muffin: 0, egg_fried_rice: 0, tomato_egg: 0 },
    affection: { xiaotian: 0, ahe: 0, xiaomei: 0 },
    shelves: [],
    visits: BASE_DAILY_VISITS + (isWeekendDay(1) ? 1 : 0),
    explores: 0,
    chattedToday: [],
    chatHourKey: "",
    chatCountsThisHour: {},
    datedToday: [],
    stats: createEmptyCounters(),
    achievements: {},
    milestones: {},
    home: createInitialShopState(),
    orders: [],
    mood: MAX_MOOD,
    dailyTaste: randomInjuryType(),
    health: MAX_HEALTH,
    satiety: 70,
    hungryDays: 0,
    ateToday: false,
    dead: false,
    deathCause: "starve",
    hour: DAY_START_HOUR,
    sportSkill: 0,
    exercisedToday: 0,
    negotiation: 0,
    ...o,
    cashRegister: 0,
    employees: [],
    shopPlacements: buildShopFurnitureList(),
    cookSkill: 0,
    metNpcs: [],
    hygiene: 100,
    combedToday: !1,
    bakeSkill: 0,
    fishingRod: !1,
    caughtToday: 0,
    fishedToday: 0,
    cookwares: getInitialBookList(),
    cookwareSkill: {},
    shelterFriendliness: 0,
    shelterDonatedToday: 0,
    shelterEventsToday: 0,
    gender: s,
    age: Math.min(99, Math.max(20, Math.floor(a))),
    sewingSkill: 0,
    sewingTools: ["sew_basic"],
    sewnClothes: [],
    healthRecords: [],
    fishRecords: {},
    shrimpCatchCount: {},
    fishBaitType: "loach",
    fishTank: [],
    fishOrderCooldown: 0,
    vehicles: [],
    bankSavings: 0,
    flowerBouquets: 0,
    encounteredToday: [],
    charityApplied: !1,
    charitySoldToday: 0,
    commercialBoostDays: 0,
    foodStreetInvest: 0,
    nightMarketPermit: !1,
    nightMarketPermitMonth: "",
    nightMarketTruck: !1,
    truckFeePaidMonth: "",
    fishFeed: 0,
    aquariumFish: !1,
    aquariumHealth: 0,
    aquariumCleanliness: 100,
    aquariumDirty: !1,
    aquariumDirtyDay: 0,
    aquariumLastFeedDay: 0,
    aquariumDecor: [],
    seeds: {},
    fertilizer: 0,
    plants: [],
    homeFlowers: 0,
    homeFlowerDecor: 0,
    homeBonsai: 0,
    riverGatheredToday: 0,
    plazaFlowerSoldToday: 0,
    flowerShopPitchToday: 0,
    collectionsPlaced: [],
    festivalSouvenirs: [],
    stargazingSeen: [],
    stargazedToday: !1,
    todayEvents: [],
    birthdayCelebrated: [],
    fontScale: "mediumSmall",
    hasBag: !1,
    hasFoodBox: !1,
    hasFishBucket: !1,
    carried: [],
    pendingOrders: [],
    govTickets: [],
    deliveredHistory: [],
    shopUpgradeLevel: 1,
    coffeeUsedDay: 0,
    floorLights: {},
    foodDeliveries: [],
    deliveryOrders: [],
    sushiStall: [],
    customCakeCounter: 0,
    coastDoneToday: [],
    subsidyClaimed: [],
    tutorial: {},
    newbieTipsShown: 0,
    handbook: { commissions: [], notifications: [] },
    mainStory: { steps: {}, version: 1 },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  // 开局播种玩家手册（委托 + 通知）与主线状态；mainStoryApi 由加载器注入 window.Cake。
  if (window.Cake && window.Cake.mainStoryApi) window.Cake.mainStoryApi.seedHandbook(state);
  return state;
}
