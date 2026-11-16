const FESTIVAL_ENCOUNTER_LINES = [
  "{name}正和{companions}一起{festivalActivity}，看见你眼睛一亮：「{festival}快乐！过来一起呀！」",
  "节日的人潮里，{name}和{companions}正{festivalActivity}，见你过来，笑着招手：「{festival}快乐！走，一起玩！」",
];

function talkStory(e, n, s) {
  const a = NPC_RUNTIME_DATA[n];
  if (!a) return { state: e, ok: !1, message: "角色不存在" };
  if (!(e.metNpcs ?? []).includes(n))
    return { state: e, ok: !1, message: `先认识${a.name}，才能聊出故事` };
  if (hasNpcProfile(n) && npcSchoolStage(n, e.day) === "away")
    return { state: e, ok: !1, message: `${a.name}已经高中毕业，去外地上大学了，暂时见不到` };
  const o = getNpcLocationAt(n, e.hour, e.day);
  if (o.place !== s)
    return {
      state: e,
      ok: !1,
      message: `${a.name}现在不在${PLACE_LABELS[s] ?? s}，TA 在${PLACE_LABELS[o.place] ?? o.place}呢`,
    };
  if (isSchoolPlace(o.place))
    return {
      state: e,
      ok: !1,
      message: `${a.name}在校内上课/住校，非师生进不去，等 TA 出来再聊吧`,
    };
  if ((e.encounteredToday ?? []).includes(n))
    return { state: e, ok: !1, message: `今天和${a.name}的故事已经聊过啦，明天再碰面吧` };
  const l = checkTimeBlocked(e, TIME_COST.encounter / 60);
  if (l) return { state: e, ok: !1, message: l };
  const c = deepClone(e);
  (advanceHours(c, TIME_COST.encounter),
    consumeSatiety(c, TIME_COST.encounter / 60),
    (c.encounteredToday = [...(c.encounteredToday ?? []), n]));
  const u = c.hour - TIME_COST.encounter / 60,
    f = slotOfHour(u),
    g = affectionTierOf(c.affection[n] ?? 0),
    x = buildEncounterLine(n, g, s, f, isWeekendDay(c.day), c.day, e.hour);
  ((c.affection[n] = changeAffection(c, n, 2)),
    (c.mood = Math.min(MAX_MOOD, (c.mood ?? 100) + 3)),
    (c.stats.chats += 1));
  const m = `🕐 ${TIME_SLOT_LABELS[f]}的相遇 · ${a.name}`;
  return { state: c, ok: !0, message: `${m}：${x}（好感 +2，心情 +3）`, line: `${m}：${x}` };
}

function buildEncounterLine(e, n, s, a, o, l, c) {
  var V;
  const u = ((V = NPC_RUNTIME_DATA[e]) == null ? void 0 : V.name) ?? "TA",
    f = (E) => E.replaceAll("{name}", u);
  if (s === "plaza" && isWeekend(l) && c >= 18) {
    const E = nightlyStallCount(e, l),
      F = E.length > 0 ? E[Math.floor(Math.random() * E.length)] : null,
      J = F ? STALL_FLAVOR_LINES[F.kind] : void 0;
    if (J && J.length > 0)
      return `${u}在夜市${(F == null ? void 0 : F.name) ?? ""}边停下脚步：${J[Math.floor(Math.random() * J.length)]}`;
  }
  const g = (E) => E[Math.floor(Math.random() * E.length)] ?? "",
    x = (E) =>
      E.tiers.includes(n) &&
      (!E.places || E.places.includes(s)) &&
      (!E.times || E.times.includes(a)) &&
      (E.weekend === void 0 || E.weekend === o),
    m = ENCOUNTERS_ALL.filter(x),
    p = ENCOUNTERS_ALL.filter(
      (E) =>
        E.tiers.includes(n) &&
        (!E.places || E.places.includes(s)) &&
        (!E.times || E.times.includes(a)) &&
        E.weekend === void 0,
    ),
    y = ENCOUNTERS_ALL.filter(
      (E) => E.tiers.includes(n) && (!E.places || E.places.includes(s)) && E.weekend === void 0,
    ),
    j = ENCOUNTERS_ALL.filter((E) => E.tiers.includes(n) && E.weekend === void 0),
    w = (m.length > 0 ? m : p.length > 0 ? p : y.length > 0 ? y : j.length > 0 ? j : ENCOUNTERS_ALL).flatMap(
      (E) => E.lines,
    ),
    N = [],
    S = getActiveFestival(l);
  if (S) {
    const E = mutualRelationKind(l, c, e),
      F = groupCompanions(l, c, e);
    if (E && F.length > 0) {
      const J = F.slice(0, 2)
          .map((R) => R.name)
          .join("、"),
        H = FESTIVAL_ACTIVITY_LABELS[S.id] ?? "过节";
      for (const R of FESTIVAL_ENCOUNTER_LINES)
        N.push(
          f(R)
            .replaceAll("{companions}", J)
            .replaceAll("{festivalActivity}", H)
            .replaceAll("{festival}", S.name),
        );
    } else for (const J of FESTIVAL_GREETING_LINES.festival ?? []) N.push(J.replaceAll("{festival}", S.name));
  }
  const C = findFriendBirthdaySoon(l, e);
  if (C) for (const E of FESTIVAL_GREETING_LINES.friendBirthday ?? []) N.push(E.replaceAll("{friend}", C.friend));
  return (
    N.length > 0 && Math.random() < 0.5 && w.push(...N),
    f(g(w) || `${u}在小镇碰见你，笑着聊了几句，临别时约好下次再见。`)
  );
}

function meetNpc(e, n, s) {
  const a = NPC_RUNTIME_DATA[n];
  if (!a) return { state: e, ok: !1, message: "角色不存在" };
  if (hasNpcProfile(n) && npcSchoolStage(n, e.day) === "away")
    return {
      state: e,
      ok: !1,
      message: `${a.name}已经高中毕业，去外地上大学了，只有寒暑假才能见到`,
    };
  const o = deepClone(e);
  if ((o.metNpcs ?? []).includes(n)) return { state: o, ok: !1, message: `你已经认识${a.name}啦` };
  const c = buildMeetLine(e, n, s);
  return (
    (o.metNpcs = [...(o.metNpcs ?? []), n]),
    (o.affection[n] = changeAffection(o, n, 2)),
    { state: o, ok: !0, message: `初次见面，认识了${a.name}（好感 +2）`, line: c.text, tag: c.tag }
  );
}

function grantIngredient(e, n, s) {
  const a = e.ingredients[n];
  (a ? (a.qty += s) : (e.ingredients[n] = { qty: s, freshness: 0 }),
    (e.seenIngredients ?? []).includes(n) ||
      (e.seenIngredients = [...(e.seenIngredients ?? []), n]));
}

const BAG_PRICE = 180,
  FOODBOX_PRICE = 120,
  FISHBUCKET_PRICE = 100,
  FREE_SHIPPING_THRESHOLD = 5,
  SHIPPING_FEE = 2;

let carriedIdCounter = 0;

function countCarried(e) {
  return (e.carried ?? []).reduce((n, s) => n + s.qty, 0);
}

function carryCapacity(e) {
  return e.hasBag ? 10 : 2;
}

function unpackCarriedItem(e, n) {
  const s = (e.carried ?? []).find((l) => l.id === n);
  if (!s) return { state: e, ok: !1, message: "这件东西不在身上" };
  const a = deepClone(e),
    o = (a.carried ?? []).filter((l) => l.id !== n);
  if (s.kind === "snack" || s.kind === "food") {
    const l = RECIPE_RUNTIME_DATA[s.refId],
      c = s.quality ?? "normal",
      u = a.products.find((f) => f.recipeId === s.refId && f.quality === c);
    u
      ? (u.qty = (u.qty ?? 0) + s.qty)
      : a.products.push({
          pid: `p_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
          recipeId: s.refId,
          quality: c,
          remaining: (l == null ? void 0 : l.shelfDays) ?? 2,
          qty: s.qty,
        });
  } else if (s.kind === "flower") a.flowerBouquets = (a.flowerBouquets ?? 0) + s.qty;
  else if (s.kind === "fish") {
    const l = INGREDIENT_MAP[s.refId],
      c = a.ingredients[s.refId];
    (c ? (c.qty += s.qty) : (a.ingredients[s.refId] = { qty: s.qty, freshness: 0 }),
      l &&
        !(a.seenIngredients ?? []).includes(s.refId) &&
        (a.seenIngredients = [...(a.seenIngredients ?? []), s.refId]));
  }
  return ((a.carried = o), { state: a, ok: !0, message: `已把${s.name}放回` });
}

function checkoutCart(e, n) {
  if (!n || n.length === 0) return { state: e, ok: !1, message: "购物篮是空的，先挑几样吧" };
  const s = n.reduce((m, p) => m + p.unitPrice * p.qty, 0);
  let a = carryCapacity(e) - countCarried(e);
  const o = [],
    l = [];
  for (const m of n)
    if (m.kind === "flower" && a > 0) {
      const p = Math.min(m.qty, a);
      (p > 0 && o.push({ ...m, qty: p }), p < m.qty && l.push({ ...m, qty: m.qty - p }), (a -= p));
    } else l.push(m);
  const c = l.reduce((m, p) => m + p.qty, 0),
    u = c >= FREE_SHIPPING_THRESHOLD ? 0 : c * SHIPPING_FEE,
    f = s + u;
  if (e.coins < f) return { state: e, ok: !1, message: `金币不足，还差 ¥${f - e.coins}` };
  const g = deepClone(e);
  ((g.coins -= f), (g.stats.spent = (g.stats.spent ?? 0) + f));
  for (const m of o)
    ((carriedIdCounter += 1),
      (g.carried = [
        ...(g.carried ?? []),
        { id: `c_${Date.now()}_${carriedIdCounter}`, kind: "flower", refId: "bouquet", name: m.name, qty: m.qty },
      ]));
  if (l.length > 0) {
    const m = l.map((p) => ({ kind: p.kind, refId: p.refId, name: p.name, qty: p.qty }));
    g.pendingOrders = [
      ...(g.pendingOrders ?? []),
      {
        id: `po_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
        entries: m,
        goodsCost: s,
        fee: u,
        arriveDay: g.day + 1,
      },
    ];
  }
  const x = [];
  if (o.length > 0) {
    const m = o.map((p) => `${p.name}×${p.qty}`).join("、");
    x.push(`${m}直接装进随身携带（${countCarried(g)}/${carryCapacity(g)}）`);
  }
  if (l.length > 0) {
    const m = l.map((p) => `${p.name}×${p.qty}`).join("、");
    x.push(`${m}${u > 0 ? `已付配送费 ¥${u}` : "满 5 件免配送费"}，明天 8:00 送到店里`);
  }
  return { state: g, ok: !0, message: `🧾 结算完成（¥${f}）：${x.join("；")}` };
}

function buyCarryItem(e, n) {
  const s =
    n === "bag"
      ? { price: BAG_PRICE, name: "帆布背包", emoji: "🎒", desc: "携带上限从 2 件提升到 10 件" }
      : n === "foodbox"
        ? { price: FOODBOX_PRICE, name: "保温食盒", emoji: "🍱", desc: "料理/蛋糕类最多可随身带 4 件" }
        : { price: FISHBUCKET_PRICE, name: "活鱼桶", emoji: "🪣", desc: "活鱼最多可随身带 5 条" };
  if (n === "bag" ? e.hasBag : n === "foodbox" ? e.hasFoodBox : e.hasFishBucket)
    return { state: e, ok: !1, message: `${s.name}已经有了` };
  if (e.coins < s.price) return { state: e, ok: !1, message: `金币不足，${s.name}要 ¥${s.price}` };
  const o = deepClone(e);
  return (
    (o.coins -= s.price),
    (o.stats.spent = (o.stats.spent ?? 0) + s.price),
    n === "bag" ? (o.hasBag = !0) : n === "foodbox" ? (o.hasFoodBox = !0) : (o.hasFishBucket = !0),
    { state: o, ok: !0, message: `${s.emoji} 买到${s.name}！${s.desc}` }
  );
}

function deliverPendingOrders(e) {
  const n = (e.pendingOrders ?? []).filter((a) => a.arriveDay <= e.day);
  if (n.length === 0) return 0;
  e.pendingOrders = (e.pendingOrders ?? []).filter((a) => a.arriveDay > e.day);
  let s = 0;
  for (const a of n) {
    e.deliveredHistory = [
      ...(e.deliveredHistory ?? []),
      {
        id: a.id,
        day: e.day,
        summary: a.entries.map((o) => `${o.name}×${o.qty}`).join("、"),
        cost: a.goodsCost + a.fee,
      },
    ];
    for (const o of a.entries) {
      if (o.kind === "ingredient" && o.refId === "jar") {
        e.home.jarQty = (e.home.jarQty ?? 0) + o.qty;
      } else if (o.kind === "ingredient") {
        const l = INGREDIENT_MAP[o.refId],
          c = e.ingredients[o.refId];
        (c ? (c.qty += o.qty) : (e.ingredients[o.refId] = { qty: o.qty, freshness: 0 }),
          l &&
            !(e.seenIngredients ?? []).includes(o.refId) &&
            (e.seenIngredients = [...(e.seenIngredients ?? []), o.refId]));
      } else if (o.kind === "snack" || o.kind === "food") {
        const l = RECIPE_RUNTIME_DATA[o.refId],
          c = e.products.find((u) => u.recipeId === o.refId && u.quality === "normal");
        c
          ? (c.qty = (c.qty ?? 0) + o.qty)
          : e.products.push({
              pid: `p_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
              recipeId: o.refId,
              quality: "normal",
              remaining: (l == null ? void 0 : l.shelfDays) ?? 2,
              qty: o.qty,
            });
      } else
        o.kind === "flower"
          ? (e.flowerBouquets = (e.flowerBouquets ?? 0) + o.qty)
          : o.kind === "tool" && o.refId === "fishing_rod" && (e.fishingRod = !0);
      s += o.qty;
    }
  }
  return s;
}

function doExercise(e, n) {
  const s = EXERCISE_MAP[n];
  if (!s) return { state: e, ok: !1, message: "锻炼项目不存在" };
  const a = WEATHER_TYPES[weatherOfDay(e.day)];
  if (!a.outdoor && (s.location === "park" || s.location === "river"))
    return { state: e, ok: !1, message: `${a.emoji} 今天${a.label}，户外锻炼不安全，改天再来吧` };
  if (e.exercisedToday >= DAILY_EXERCISE_LIMIT) return { state: e, ok: !1, message: "今天锻炼得够多了，明天再来吧" };
  if (e.energy < s.energy) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const o = checkTimeBlocked(e, TIME_COST.exercise / 60);
  if (o) return { state: e, ok: !1, message: o };
  const l = deepClone(e);
  ((l.exercisedToday += 1), advanceHours(l, TIME_COST.exercise));
  const c = consumeSatiety(l, TIME_COST.exercise / 60);
  ((l.energy -= s.energy), decayMood(l, s.energy), (l.stats.exercises += 1));
  const u = Math.floor(l.sportSkill / 20),
    f = Math.min(MAX_HEALTH - l.health, s.healthGain + u);
  l.health = Math.min(MAX_HEALTH, l.health + f);
  const g = s.skillGain + (f >= s.healthGain ? 1 : 0);
  ((l.sportSkill = Math.min(100, l.sportSkill + g)),
    (l.mood = Math.min(MAX_MOOD, l.mood + s.moodGain)),
    (l.hygiene = Math.max(0, (l.hygiene ?? 100) - 8)));
  const x = getAvailableEvents(l, s.location === "park" ? "park" : "river");
  return {
    state: x.state,
    ok: !0,
    message: `${s.name}完成！健康 +${f}，运动技能 +${g}，心情 +${s.moodGain}，卫生 -8${c ? "（饿着肚子运动，头晕眼花）" : ""}${x.text ? ` ${x.text}` : ""}`,
  };
}

function catchLoach(e) {
  const n = WEATHER_TYPES[weatherOfDay(e.day)];
  if (!n.outdoor)
    return {
      state: e,
      ok: !1,
      message: `${n.emoji} 今天${n.label}，泥塘湿滑危险，改天再来抓泥鳅吧`,
    };
  if (e.caughtToday >= LOACH_DAILY_LIMIT) return { state: e, ok: !1, message: "今天抓到的泥鳅够多了，明天再来吧" };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, TIME_COST.catchLoach / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.caughtToday += 1), advanceHours(a, TIME_COST.catchLoach), consumeSatiety(a, TIME_COST.catchLoach / 60), (a.energy -= 8), decayMood(a, 8));
  const o = 1 + (Math.random() < 0.4 ? 1 : 0);
  (grantIngredient(a, "loach", o),
    (a.stats.loaches = (a.stats.loaches ?? 0) + 1),
    (a.hygiene = Math.max(0, (a.hygiene ?? 100) - 3)));
  const l = getAvailableEvents(a, "park");
  return {
    state: l.state,
    ok: !0,
    message: `在公园泥塘里摸到 ${o} 条泥鳅！泥鳅可以当鱼饵，也能做成香酥泥鳅${l.text ? ` ${l.text}` : ""}`,
  };
}

function baitToIngredient(e) {
  switch (e) {
    case "worm":
      return "earthworm";
    case "premium":
      return "premium_bait";
    case "spring":
      return "bait_spring";
    case "summer":
      return "bait_summer";
    case "autumn":
      return "bait_autumn";
    case "winter":
      return "bait_winter";
    case "night":
      return "bait_night";
    default:
      return "loach";
  }
}

function getBaitName(e) {
  return (
    {
      loach: "泥鳅",
      worm: "蚯蚓",
      premium: "腥香大物饵",
      spring: "青团饵",
      summer: "酸香虾饵",
      autumn: "甜香糕饵",
      winter: "姜酒温饵",
      night: "夜香螺饵",
    }[e] ?? "泥鳅"
  );
}

function isSeasonBait(e) {
  return e === "spring" || e === "summer" || e === "autumn" || e === "winter";
}

function isNightBait(e) {
  return e === "night";
}

function buyFishingRod(e) {
  if (e.fishingRod) return { state: e, ok: !1, message: "已经有鱼竿啦" };
  if (e.coins < FISHING_ROD_PRICE) return { state: e, ok: !1, message: "金币不足" };
  const n = deepClone(e);
  return (
    (n.coins -= FISHING_ROD_PRICE),
    (n.stats.spent += FISHING_ROD_PRICE),
    (n.fishingRod = !0),
    { state: n, ok: !0, message: `买到鱼竿啦！带上泥鳅去河边钓鱼吧（¥${FISHING_ROD_PRICE}）` }
  );
}

function goFishing(e, n) {
  var F, J;
  const s = WEATHER_TYPES[weatherOfDay(e.day)];
  if (!s.outdoor)
    return { state: e, ok: !1, message: `${s.emoji} 今天${s.label}，河边风大浪急，改天再来钓鱼吧` };
  if (!e.fishingRod) return { state: e, ok: !1, message: "还没有鱼竿，先去商店买一根吧" };
  if (e.fishedToday >= FISHING_DAILY_LIMIT) return { state: e, ok: !1, message: "今天钓得够多啦，明天再来" };
  if (n && !NPC_RUNTIME_DATA[n]) return { state: e, ok: !1, message: "这位伙伴不在河边" };
  const a = e.fishBaitType ?? "loach",
    o = baitToIngredient(a),
    l = INGREDIENT_MAP[o];
  if ((((F = e.ingredients[o]) == null ? void 0 : F.qty) ?? 0) < 1)
    return {
      state: e,
      ok: !1,
      message: `没有${(l == null ? void 0 : l.name) ?? "鱼饵"}了${isNightBait(a) ? "，晚上用夜市炒螺在河边现场制饵吧" : isSeasonBait(a) ? "，用节气料理在河边现场制饵吧" : "，去农贸市场买一点吧"}`,
    };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const u = checkTimeBlocked(e, TIME_COST.fish / 60);
  if (u) return { state: e, ok: !1, message: u };
  const f = deepClone(e);
  ((f.fishedToday += 1),
    advanceHours(f, TIME_COST.fish),
    consumeSatiety(f, TIME_COST.fish / 60),
    (f.energy -= 8),
    decayMood(f, 8),
    (f.ingredients[o].qty -= 1),
    f.ingredients[o].qty <= 0 && delete f.ingredients[o],
    (f.stats.fishes = (f.stats.fishes ?? 0) + 1),
    (f.hygiene = Math.max(0, (f.hygiene ?? 100) - 3)));
  const g = currentSolarTerm(e.day).name,
    x = isNightHour(e.hour);
  if (Math.random() < RARE_FISH_CHANCE) {
    const H = 6 + Math.floor(Math.random() * 8);
    injurePlayer(f, H);
    let R = `鱼上钩了！但收线时不小心被鱼咬了一口，健康 -${H}（河里的鱼可不好惹）`;
    return (n && (R += ` ${fishingCompanionEvent(f, n, a)}`), { state: f, ok: !0, message: R, bitten: !0 });
  }
  const m = rollCatch(a, g, x),
    p = FISH_SIZE_PARK.find((H) => H.ingId === m.ingId),
    y = p ? (((J = INGREDIENT_MAP[m.ingId]) == null ? void 0 : J.name) ?? "河鲜") : "河鲜",
    j = m.sizeCm,
    v = f.fishRecords[m.ingId] ?? 0;
  (j > v && (f.fishRecords[m.ingId] = j), recordCatch(f, m.ingId), grantIngredient(f, m.ingId, 1));
  const w = j >= BIG_FISH_CM;
  w && (f.stats.bigFish = (f.stats.bigFish ?? 0) + 1);
  let N = "";
  m.ingId === "koi" &&
    ((f.mood = Math.min(100, (f.mood ?? 100) + 10)), (N = "🍀 好运连连，今天做什么都顺！"));
  const S = p != null && p.note ? `（${p.note}）` : "",
    C = j > v && v > 0 ? "，刷新了你的鱼类图鉴纪录！" : "",
    V = getAvailableEvents(f, "river");
  let E = `${w ? "🏆 大物纪录！" : ""}钓到一条 ${j}cm 的${y}！${S}${C}${N}${V.text ? ` ${V.text}` : ""}`;
  return (
    n && (E += ` ${fishingCompanionEvent(f, n, a)}`),
    { state: V.state, ok: !0, message: E, caught: m.ingId, sizeCm: j }
  );
}

function fishingCompanionEvent(e, n, s) {
  var g;
  const a = NPC_RUNTIME_DATA[n],
    o = (a == null ? void 0 : a.name) ?? "伙伴";
  if ((changeAffection(e, n, 3), Math.random() < 0.25))
    return `🤝 ${o}并排钓了一小时：TA 收了三次竿都空军了，你笑出了声（好感 +3）`;
  let l = rollCatch(s),
    c = !1;
  if (Math.random() < 0.3) {
    const x = ["mandarin_fish", "swamp_eel", "topmouth_culter", "koi"],
      m = x[Math.floor(Math.random() * x.length)] ?? "mandarin_fish",
      p = FISH_SIZE_PARK.find((y) => y.ingId === m) ?? { minCm: 10, maxCm: 30 };
    ((l = {
      ingId: m,
      sizeCm: Math.min(MAX_FISH_CM, Math.round(p.minCm + Math.random() * (p.maxCm - p.minCm))),
    }),
      (c = !0));
  }
  const u = ((g = INGREDIENT_MAP[l.ingId]) == null ? void 0 : g.name) ?? "河鲜";
  let f = `🤝 ${o}并排钓了一小时：TA 钓到一条 ${l.sizeCm}cm 的${u}！`;
  if (Math.random() < 0.3) {
    grantIngredient(e, l.ingId, 1);
    const x = e.fishRecords[l.ingId] ?? 0;
    (l.sizeCm > x && (e.fishRecords[l.ingId] = l.sizeCm), recordCatch(e, l.ingId), (f += "还把鱼塞给了你"));
  }
  return (c && (f += "（TA 说是运气好）"), (f += "（好感 +3）"), f);
}

function makeNightBait(e) {
  if (!isNightHour(e.hour)) return { state: e, ok: !1, message: "夜香螺饵只在晚上做（20:00 到凌晨 5:00）" };
  if (!e.products.find((o) => o.recipeId === "night_fry_snail" && (o.qty ?? 0) > 0))
    return { state: e, ok: !1, message: "背包里没有夜市炒螺，做一份再来制饵吧" };
  const s = deepClone(e),
    a = s.products.find((o) => o.recipeId === "night_fry_snail" && (o.qty ?? 0) > 0);
  return (
    a &&
      ((a.qty = (a.qty ?? 1) - 1),
      a.qty <= 0 &&
        ((s.products = s.products.filter((o) => o.pid !== a.pid)),
        (s.shelves = s.shelves.filter((o) => o.pid !== a.pid)))),
    grantIngredient(s, "bait_night", 3),
    { state: s, ok: !0, message: "用 1 份夜市炒螺制出 3 个夜香螺饵！" }
  );
}

function makeSeasonBait(e, n) {
  const s = SEASON_BAITS.find((u) => u.type === n);
  if (!s) return { state: e, ok: !1, message: "这不是节气饵" };
  const a = currentSolarTerm(e.day).name;
  if (!s.terms.includes(a))
    return {
      state: e,
      ok: !1,
      message: `现在不是制「${s.name}」的时节（${s.terms[0]}～${s.terms[s.terms.length - 1]}）`,
    };
  if (!e.products.find((u) => u.recipeId === s.dishId && (u.qty ?? 0) > 0))
    return { state: e, ok: !1, message: `背包里没有${s.dishName}，做一份再来制饵吧` };
  const l = deepClone(e),
    c = l.products.find((u) => u.recipeId === s.dishId && (u.qty ?? 0) > 0);
  return (
    c &&
      ((c.qty = (c.qty ?? 1) - 1),
      c.qty <= 0 &&
        ((l.products = l.products.filter((u) => u.pid !== c.pid)),
        (l.shelves = l.shelves.filter((u) => u.pid !== c.pid)))),
    grantIngredient(l, s.baitId, 3),
    { state: l, ok: !0, message: `用 1 份${s.dishName}制出 3 个${s.name}！` }
  );
}

function changeBait(e, n) {
  const s = deepClone(e);
  return (
    (s.fishBaitType = n),
    { state: s, ok: !0, message: `鱼饵已换成「${getBaitName(n)}」（切换免费）` }
  );
}

function sellFish(e, n) {
  var f;
  const s = INGREDIENT_MAP[n];
  if (!s || s.category !== "fish") return { state: e, ok: !1, message: "这条不能卖" };
  if ((((f = e.ingredients[n]) == null ? void 0 : f.qty) ?? 0) < 1)
    return { state: e, ok: !1, message: `背包里没有${s.name}了` };
  const o = checkTimeBlocked(e, 1);
  if (o) return { state: e, ok: !1, message: o };
  const l = deepClone(e);
  advanceHours(l, 60);
  const c = Math.min(60, l.fishRecords[n] ?? 0),
    u = Math.round(s.price * (0.6 + c / 60));
  return (
    (l.ingredients[n].qty -= 1),
    l.ingredients[n].qty <= 0 && delete l.ingredients[n],
    (l.coins += u),
    (l.stats.earned = (l.stats.earned ?? 0) + u),
    { state: l, ok: !0, message: `卖出 1 条${s.name}，赚了 ¥${u}（纪录 ${c}cm）` }
  );
}

function orderFishDelivery(e) {
  if ((e.fishOrderCooldown ?? 0) > 0)
    return { state: e, ok: !1, message: `订购渔获还要再等 ${e.fishOrderCooldown} 天` };
  if (e.coins < FISH_ORDER_PRICE) return { state: e, ok: !1, message: "金币不足" };
  const n = deepClone(e);
  return (
    (n.coins -= FISH_ORDER_PRICE),
    (n.stats.spent = (n.stats.spent ?? 0) + FISH_ORDER_PRICE),
    n.orders.push({
      id: `o_fish_${Date.now()}_${Math.floor(Math.random() * 1e6)}`,
      ingId: FISH_ORDER_TYPE,
      qty: 1,
      cost: FISH_ORDER_PRICE,
      arriveDay: n.day + 1,
    }),
    (n.fishOrderCooldown = FISH_ORDER_COOLDOWN_DAYS),
    { state: n, ok: !0, message: "已花 ¥60 预订一网河鲜，明天到农贸市场取货" }
  );
}

const RIVER_GATHER_TABLE = [
  { ingId: "river_shrimp", weight: 34, min: 1, max: 2 },
  { ingId: "snail", weight: 26, min: 1, max: 2 },
  { ingId: "white_shrimp", weight: 16, min: 1, max: 2 },
  { ingId: "crayfish", weight: 12, min: 1, max: 1 },
  { ingId: "giant_prawn", weight: 6, min: 1, max: 1 },
  { ingId: "empty", weight: 6, min: 0, max: 0 },
];

function getFishSizeRange(e) {
  const n = FISH_SIZE_RIVER.find((a) => a.ingId === e);
  if (n) return { minCm: n.minCm, maxCm: n.maxCm };
  const s = FISH_SIZE_PARK.find((a) => a.ingId === e);
  return s ? { minCm: s.minCm, maxCm: s.maxCm } : { minCm: 2, maxCm: 8 };
}

function gatherAtRiver(e) {
  const n = WEATHER_TYPES[weatherOfDay(e.day)];
  if (!n.outdoor)
    return {
      state: e,
      ok: !1,
      message: `${n.emoji} 今天${n.label}，河边水急浪大，改天再来捞虾摸螺吧`,
    };
  if ((e.riverGatheredToday ?? 0) >= RIVER_GATHER_LIMIT)
    return { state: e, ok: !1, message: "今天捞得够多啦，明天再来" };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, TIME_COST.gatherRiver / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.riverGatheredToday = (a.riverGatheredToday ?? 0) + 1),
    advanceHours(a, TIME_COST.gatherRiver),
    consumeSatiety(a, TIME_COST.gatherRiver / 60),
    (a.energy -= 8),
    decayMood(a, 8),
    (a.hygiene = Math.max(0, (a.hygiene ?? 100) - 3)));
  let o = RIVER_GATHER_TABLE;
  seasonIndexOf(a.day) === 1 &&
    (o = o.map((w) => (w.ingId === "crayfish" ? { ...w, weight: w.weight * 2 } : w)));
  const l = o.reduce((w, N) => w + N.weight, 0);
  let c = Math.random() * l,
    u = o[0];
  for (const w of o)
    if (((c -= w.weight), c <= 0)) {
      u = w;
      break;
    }
  if (u.ingId === "empty") {
    const w = getAvailableEvents(a, "river");
    return {
      state: w.state,
      ok: !0,
      message: `摸了个寂寞，浅滩的虾今天都躲起来了…${w.text ? ` ${w.text}` : ""}`,
    };
  }
  const f = u.min + Math.floor(Math.random() * (u.max - u.min + 1)),
    g = INGREDIENT_MAP[u.ingId],
    x = getFishSizeRange(u.ingId),
    m = Math.min(MAX_FISH_CM, Math.round(x.minCm + Math.random() * (x.maxCm - x.minCm))),
    p = a.fishRecords[u.ingId] ?? 0;
  (m > p && (a.fishRecords[u.ingId] = m), recordCatch(a, u.ingId), grantIngredient(a, u.ingId, f));
  const y = m > p && p > 0 ? "，刷新了图鉴纪录！" : "",
    j = getAvailableEvents(a, "river");
  let v = `在河边浅滩捞到 ${f} 只${(g == null ? void 0 : g.name) ?? "河鲜"}（约 ${m}cm）${y}！虾蟹田螺可以直接做菜，也能拿去加工台熬虾酱`;
  return (
    u.ingId === "crayfish" &&
      (v = `夏天河沟里的小龙虾正肥，徒手逮到 ${f} 只（约 ${m}cm）${y}！小心别被夹到`),
    u.ingId === "giant_prawn" &&
      (v = `运气爆棚！捞到稀有的罗氏沼虾 ${f} 只（约 ${m}cm）${y}，虾膏厚得很`),
    u.ingId === "snail" &&
      (v = `在河滩石头缝里摸到 ${f} 只田螺（约 ${m}cm）${y}！先养一养吐沙再嗦`),
    j.text && (v += ` ${j.text}`),
    { state: j.state, ok: !0, message: v, caught: u.ingId, sizeCm: m }
  );
}

function shelterTier(e) {
  return e >= HONOR_VOLUNTEER_FRIENDLINESS ? 2 : e >= VOLUNTEER_FRIENDLINESS ? 1 : 0;
}

function getShelterTierInfo(e) {
  const n = e.shelterFriendliness ?? 0;
  let s = SHELTER_TIERS[0],
    a = SHELTER_TIERS[SHELTER_TIERS.length - 1];
  for (const c of SHELTER_TIERS) n >= c.min && (s = c);
  for (const c of SHELTER_TIERS)
    if (c.min > n) {
      a = c;
      break;
    }
  const o = a.min - s.min || 1,
    l = a.min > n ? Math.min(1, (n - s.min) / o) : 1;
  return { label: s.label, emoji: s.emoji, progress: Math.round(l * 100) };
}

function donateToShelter(e, n) {
  const s = e.products.find((p) => p.pid === n);
  if (!s) return { state: e, ok: !1, message: "点心不存在" };
  if (s.quality === "fail") return { state: e, ok: !1, message: "失败品可不能捐给动物们吃" };
  if ((e.shelterDonatedToday ?? 0) >= SHELTER_DONATE_LIMIT)
    return { state: e, ok: !1, message: `收容所今天的捐赠份额已满（${SHELTER_DONATE_LIMIT} 份），明天再来吧` };
  const a = checkTimeBlocked(e, TIME_COST.shelterDonate / 60);
  if (a) return { state: e, ok: !1, message: a };
  const o = deepClone(e);
  (advanceHours(o, TIME_COST.shelterDonate), consumeSatiety(o, TIME_COST.shelterDonate / 60));
  const l = o.products.find((p) => p.pid === n);
  l &&
    ((l.qty = (l.qty ?? 1) - 1),
    l.qty <= 0 &&
      ((o.products = o.products.filter((p) => p.pid !== n)),
      (o.shelves = o.shelves.filter((p) => p.pid !== n))));
  const c = s.quality === "perfect" ? 6 : s.quality === "good" ? 4 : 2;
  ((o.shelterFriendliness = Math.min(200, (o.shelterFriendliness ?? 0) + c)),
    (o.shelterDonatedToday = (o.shelterDonatedToday ?? 0) + 1));
  const u = shelterTier(o.shelterFriendliness),
    f = shelterTier(e.shelterFriendliness ?? 0),
    g = u > f,
    x =
      u >= 2
        ? " 🎉 友好度突破 140，你成为收容所的荣誉志愿者！更多活动解锁！"
        : u >= 1
          ? ` 🎉 友好度达到 ${VOLUNTEER_FRIENDLINESS}，收容所正式邀请你成为志愿者！可以来参加动物们的活动了！`
          : "",
    m = RECIPE_RUNTIME_DATA[s.recipeId];
  return {
    state: o,
    ok: !0,
    message: `把「${(m == null ? void 0 : m.name) ?? "点心"}」捐给了收容所的小动物们，友好度 +${c}（捐赠不涨声望）${x}`,
    gain: c,
    invited: g,
  };
}

function shelterPlayEvent(e) {
  const n = shelterTier(e.shelterFriendliness ?? 0);
  if (n < 1)
    return {
      state: e,
      ok: !1,
      message: "成为志愿者后才能参加收容所的活动（友好度达到 60 会被邀请）",
    };
  if ((e.shelterEventsToday ?? 0) >= SHELTER_EVENT_LIMIT)
    return { state: e, ok: !1, message: `今天已经陪动物们玩够啦（${SHELTER_EVENT_LIMIT} 次），明天再来` };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, TIME_COST.shelterEvent / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  (advanceHours(a, TIME_COST.shelterEvent),
    (a.energy -= 8),
    decayMood(a, 8),
    consumeSatiety(a, TIME_COST.shelterEvent / 60),
    (a.shelterEventsToday = (a.shelterEventsToday ?? 0) + 1));
  const o = SHELTER_EVENTS.filter((c) => c.tier <= n),
    l = o[Math.floor(Math.random() * o.length)];
  if (
    (l.mood && (a.mood = Math.min(MAX_MOOD, a.mood + l.mood)),
    l.friendly &&
      (a.shelterFriendliness = Math.min(200, (a.shelterFriendliness ?? 0) + l.friendly)),
    l.tool && ((a.home.toolSkill = Math.min(100, a.home.toolSkill + l.tool)), ensureToolSkillMap(a, l.tool)),
    l.cook && (a.cookSkill = Math.min(100, a.cookSkill + l.cook)),
    l.health && (a.health = Math.min(MAX_HEALTH, a.health + l.health)),
    l.coins && (a.coins += l.coins),
    l.ingredient)
  ) {
    const c = INGREDIENTS_LIST[Math.floor(Math.random() * INGREDIENTS_LIST.length)];
    c && grantIngredient(a, c.id, l.ingredient);
  }
  return { state: a, ok: !0, message: l.text };
}

function learnRecipeFromNpc(e, n, s) {
  const a = NPC_RUNTIME_DATA[n];
  if (!a) return { state: e, ok: !1, message: "角色不存在" };
  if (!(e.metNpcs ?? []).includes(n))
    return { state: e, ok: !1, message: `先去小镇找到${a.name}打个招呼吧` };
  const l = (NPC_RECIPE_TEACH[n] ?? []).find((x) => x.recipeId === s);
  if (!l) return { state: e, ok: !1, message: "这位伙伴没有这份食谱" };
  if (s in e.recipes) return { state: e, ok: !1, message: "这份食谱你已经学会啦" };
  const c = e.affection[n] ?? 0,
    u = e.shelterFriendliness ?? 0;
  if (c < l.affection || u < l.friendliness)
    return {
      state: e,
      ok: !1,
      message: `条件未满足：需要与${a.name}的好感度达到 ${l.affection}、收容所友好度达到 ${l.friendliness}（当前 ${c} / ${u}）`,
    };
  const f = deepClone(e);
  ((f.recipes[s] = 0), (f.affection[n] = changeAffection(f, n, 3)));
  const g = RECIPE_RUNTIME_DATA[s];
  return {
    state: f,
    ok: !0,
    message: `${l.line}（已学会「${(g == null ? void 0 : g.name) ?? "新食谱"}」，好感度 +3）`,
    claimed: !0,
  };
}

function strollPlaza(e) {
  const n = WEATHER_TYPES[weatherOfDay(e.day)];
  if (!n.outdoor)
    return {
      state: e,
      ok: !1,
      message: `${n.emoji} 今天${n.label}，广场上没什么人，改天再来逛逛吧`,
    };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下吧" };
  const s = checkTimeBlocked(e, TIME_COST.stroll / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.energy -= 8),
    advanceHours(a, TIME_COST.stroll),
    (a.mood = Math.min(MAX_MOOD, a.mood + 8)),
    (a.health = Math.min(MAX_HEALTH, a.health + 1)),
    (a.explores = (a.explores ?? 0) + 1));
  const o = Array.isArray(a.metNpcs)
    ? a.metNpcs.filter((c) => !(hasNpcProfile(c) && npcSchoolStage(c, a.day) === "away"))
    : [];
  if (o.length > 0 && Math.random() < 0.35) {
    const c = o[Math.floor(Math.random() * o.length)],
      u = NPC_RUNTIME_DATA[c];
    if (u) {
      a.affection[c] = changeAffection(a, c, 1);
      const f = getAvailableEvents(a, "plaza");
      return {
        state: f.state,
        ok: !0,
        message: `在广场碰到了${u.name}，一起聊了会天：心情 +8，好感 +1！${f.text ? ` ${f.text}` : ""}`,
      };
    }
  }
  const l = getAvailableEvents(a, "plaza");
  return {
    state: l.state,
    ok: !0,
    message: `在广场逛了一圈，听听街头艺人的歌、看看手作小摊：心情 +8，精力 -8。${l.text ? ` ${l.text}` : ""}`,
  };
}

const REGISTRATION_FEE = 50,
  TREATMENT_AMOUNT = 30,
  DOCTOR_NAMES = ["当日值班医生"];

function diagnoseIllness(e) {
  var c, u;
  const n = weatherOfDay(e.day),
    s = (e.satiety ?? 70) <= 0,
    a = (((c = e.home) == null ? void 0 : c.sleptToday) ?? 0) <= 0,
    o = (((u = e.stats) == null ? void 0 : u.injuries) ?? 0) > 0,
    l = seasonIndexOf(e.day) === 1 && (n === "sunny" || n === "cloudy");
  return n === "rain" || n === "storm" || n === "snow"
    ? { diagnosis: "淋雨受凉（天气湿冷，户外着了凉）", treatment: "输液驱寒 + 开感冒药，注意保暖" }
    : l
      ? { diagnosis: "中暑（高温天体力透支，身体过热）", treatment: "输液降温 + 静养建议，多喝水" }
      : s
        ? {
            diagnosis: "肠胃不适（饮食不规律，饿过头伤了胃）",
            treatment: "开胃药调理 + 清淡饮食建议",
          }
        : a
          ? {
              diagnosis: "疲劳过度（长时间熬夜未休息）",
              treatment: "输液补充 + 静养建议，保证睡眠",
            }
          : o
            ? {
                diagnosis: "外伤（劳作或意外磕碰导致）",
                treatment: "清创包扎 + 消炎药，注意伤口卫生",
              }
            : {
                diagnosis: "疲劳过度（身体状态欠佳，过度劳累）",
                treatment: "静养建议 + 开维生素补充",
              };
}

function visitDoctor(e) {
  if (e.health >= MAX_HEALTH) return { state: e, ok: !1, message: "你身体棒得很，不用看医生" };
  if (e.coins < REGISTRATION_FEE) return { state: e, ok: !1, message: `挂号费 ¥${REGISTRATION_FEE}，金币不够啦` };
  const n = checkTimeBlocked(e, TIME_COST.hospital / 60);
  if (n) return { state: e, ok: !1, message: n };
  const s = deepClone(e),
    a = s.health;
  ((s.coins -= REGISTRATION_FEE),
    (s.stats.spent += REGISTRATION_FEE),
    advanceHours(s, TIME_COST.hospital),
    consumeSatiety(s, TIME_COST.hospital / 60),
    (s.energy = Math.max(0, s.energy - 4)));
  const o = Math.min(MAX_HEALTH - s.health, TREATMENT_AMOUNT);
  s.health = Math.min(MAX_HEALTH, s.health + o);
  const { diagnosis: l, treatment: c } = diagnoseIllness(s),
    u = DOCTOR_NAMES[(s.healthRecords ?? []).length % DOCTOR_NAMES.length],
    f = {
      id: `hr_${Date.now()}_${(s.healthRecords ?? []).length}`,
      day: s.day,
      hour: s.hour - 1,
      weather: weatherOfDay(s.day),
      doctor: u,
      diagnosis: l,
      treatment: c,
      cost: REGISTRATION_FEE,
      healthBefore: a,
      healthAfter: s.health,
      createdAt: Date.now(),
    };
  s.healthRecords = [...(s.healthRecords ?? []), f];
  const g = getAvailableEvents(s, "hospital");
  return {
    state: g.state,
    ok: !0,
    message: `挂了号、看了诊，健康 +${o}（挂号费 ¥${REGISTRATION_FEE}），本次就诊已记入健康档案${g.text ? ` ${g.text}` : ""}`,
  };
}

function eatAtSuji(e) {
  if (e.coins < 15) return { state: e, ok: !1, message: "钱包空空，买不起 ¥15 的甜点" };
  if ((e.satiety ?? 70) >= MAX_SATIETY) return { state: e, ok: !1, message: "已经吃饱啦，再吃就撑着了" };
  const s = checkTimeBlocked(e, TIME_COST.eatSuji / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  return (
    (a.coins -= 15),
    (a.stats.spent += 15),
    advanceHours(a, TIME_COST.eatSuji),
    consumeSatiety(a, TIME_COST.eatSuji / 60),
    (a.satiety = Math.min(MAX_SATIETY, (a.satiety ?? 70) + 35)),
    (a.mood = Math.min(MAX_MOOD, (a.mood ?? 100) + 5)),
    (a.energy = Math.min(MAX_ENERGY, a.energy + 4)),
    {
      state: a,
      ok: !0,
      message: "在苏记甜品面包店吃了份现烤甜点配热茶：饱食度 +35，心情 +5，精力 +4（¥15）",
    }
  );
}

const FASTFOOD_MENU = [
  {
    id: "chaofan",
    name: "现炒蛋炒饭",
    emoji: "🍚",
    desc: "锅气十足的蛋炒饭，配一碗紫菜汤",
    cost: 22,
    satiety: 45,
    energy: 5,
    mood: 3,
  },
  {
    id: "tomato_egg",
    name: "番茄炒蛋盖饭",
    emoji: "🍅",
    desc: "酸甜开胃，盖在热米饭上",
    cost: 18,
    satiety: 40,
    energy: 4,
    mood: 4,
  },
  {
    id: "qingjiao_rou",
    name: "青椒肉丝盖饭",
    emoji: "🫑",
    desc: "肉丝嫩、青椒脆，下饭一绝",
    cost: 24,
    satiety: 48,
    energy: 6,
    mood: 2,
  },
  {
    id: "yuxiang",
    name: "鱼香肉丝套餐",
    emoji: "🥘",
    desc: "鱼香口味咸甜微辣，配例汤和米饭",
    cost: 26,
    satiety: 50,
    energy: 6,
    mood: 4,
  },
  {
    id: "gongbao",
    name: "宫保鸡丁套餐",
    emoji: "🍗",
    desc: "鸡丁花生香辣过瘾，配小菜米饭",
    cost: 25,
    satiety: 48,
    energy: 6,
    mood: 5,
  },
  {
    id: "huiguorou",
    name: "回锅肉盖饭",
    emoji: "🥩",
    desc: "肥而不腻，蒜苗提香，分量十足",
    cost: 28,
    satiety: 52,
    energy: 7,
    mood: 3,
  },
];

function eatFastfood(e, n = "chaofan") {
  const s = FASTFOOD_MENU.find((c) => c.id === n) ?? FASTFOOD_MENU[0],
    a = s.cost;
  if (e.coins < a) return { state: e, ok: !1, message: `钱包空空，吃不起 ¥${a} 的${s.name}` };
  if ((e.satiety ?? 70) >= MAX_SATIETY) return { state: e, ok: !1, message: "已经吃饱啦，再吃就撑着了" };
  const o = checkTimeBlocked(e, TIME_COST.eatFastfood / 60);
  if (o) return { state: e, ok: !1, message: o };
  const l = deepClone(e);
  return (
    (l.coins -= a),
    (l.stats.spent += a),
    advanceHours(l, TIME_COST.eatFastfood),
    consumeSatiety(l, TIME_COST.eatFastfood / 60),
    (l.satiety = Math.min(MAX_SATIETY, (l.satiety ?? 70) + s.satiety)),
    (l.energy = Math.min(MAX_ENERGY, l.energy + s.energy)),
    (l.mood = Math.min(MAX_MOOD, (l.mood ?? 100) + s.mood)),
    {
      state: l,
      ok: !0,
      message: `在街角快餐店吃了份${s.name}：饱食度 +${s.satiety}，精力 +${s.energy}，心情 +${s.mood}（¥${a}）`,
    }
  );
}

const NIGHT_STALL_MENU = [
  {
    id: "malatang",
    name: "麻辣烫",
    emoji: "🍲",
    stall: "红油串串铺",
    stallEmoji: "🌶️",
    desc: "自选串串，红油热汤一锅端",
    cost: 25,
    satiety: 45,
    energy: 5,
    mood: 6,
  },
  {
    id: "xiaolongbao",
    name: "小笼包",
    emoji: "🥟",
    stall: "一笼鲜",
    stallEmoji: "🥢",
    desc: "现蒸现吃，皮薄汁多",
    cost: 20,
    satiety: 35,
    energy: 4,
    mood: 5,
  },
  {
    id: "kaochuan",
    name: "炭火烤串",
    emoji: "🍢",
    stall: "老街烤串",
    stallEmoji: "🔥",
    desc: "滋滋冒油的羊肉串和烤茄子",
    cost: 30,
    satiety: 40,
    energy: 6,
    mood: 8,
  },
  {
    id: "suanlafen",
    name: "酸辣粉",
    emoji: "🍜",
    stall: "酸辣粉王",
    stallEmoji: "🥣",
    desc: "酸辣开胃，红薯粉弹牙",
    cost: 22,
    satiety: 42,
    energy: 5,
    mood: 5,
  },
  {
    id: "tangshui",
    name: "糖水铺甜汤",
    emoji: "🍧",
    stall: "甜心糖水铺",
    stallEmoji: "🍧",
    desc: "红豆沙、杨枝甘露，甜到心里",
    cost: 15,
    satiety: 15,
    energy: 2,
    mood: 6,
  },
];

function eatNightStall(e, n) {
  const s = NIGHT_STALL_MENU.find((l) => l.id === n);
  if (!s) return { state: e, ok: !1, message: "这家摊位今天没开门" };
  if (e.coins < s.cost)
    return { state: e, ok: !1, message: `钱包空空，吃不起 ¥${s.cost} 的${s.name}` };
  if ((e.satiety ?? 70) >= MAX_SATIETY) return { state: e, ok: !1, message: "已经吃饱啦，再吃就撑着了" };
  const a = checkTimeBlocked(e, TIME_COST.eatFastfood / 60);
  if (a) return { state: e, ok: !1, message: a };
  const o = deepClone(e);
  return (
    (o.coins -= s.cost),
    (o.stats.spent += s.cost),
    advanceHours(o, TIME_COST.eatFastfood),
    consumeSatiety(o, TIME_COST.eatFastfood / 60),
    (o.satiety = Math.min(MAX_SATIETY, (o.satiety ?? 70) + s.satiety)),
    (o.energy = Math.min(MAX_ENERGY, o.energy + s.energy)),
    (o.mood = Math.min(MAX_MOOD, (o.mood ?? 100) + s.mood)),
    {
      state: o,
      ok: !0,
      message: `在美食街「${s.stall}」吃了份${s.name}：饱食度 +${s.satiety}，精力 +${s.energy}，心情 +${s.mood}（¥${s.cost}）`,
    }
  );
}

const AMUSEMENT_RIDES = [
  {
    id: "ferris",
    name: "摩天轮",
    emoji: "🎡",
    desc: "转到最高点看小镇全景，一圈 45 分钟",
    cost: 30,
    minutes: 45,
    mood: 8,
    energy: -2,
    satiety: -5,
  },
  {
    id: "carousel",
    name: "旋转木马",
    emoji: "🎠",
    desc: "慢悠悠转圈，找回童心的 20 分钟",
    cost: 15,
    minutes: 20,
    mood: 5,
    energy: 0,
    satiety: -2,
  },
  {
    id: "coaster",
    name: "过山车",
    emoji: "🎢",
    desc: "俯冲失重超刺激，30 分钟热血沸腾",
    cost: 40,
    minutes: 30,
    mood: 10,
    energy: -5,
    satiety: -8,
  },
  {
    id: "bumper",
    name: "碰碰车",
    emoji: "🚗",
    desc: "撞来撞去笑不停，25 分钟尽兴而归",
    cost: 25,
    minutes: 25,
    mood: 6,
    energy: -3,
    satiety: -3,
  },
];

function playAmusementRide(e, n) {
  const s = AMUSEMENT_RIDES.find((l) => l.id === n);
  if (!s) return { state: e, ok: !1, message: "游乐园没有这个项目" };
  if (e.coins < s.cost)
    return { state: e, ok: !1, message: `钱包空空，玩不起 ¥${s.cost} 的${s.name}` };
  const a = checkTimeBlocked(e, s.minutes / 60);
  if (a) return { state: e, ok: !1, message: a };
  const o = deepClone(e);
  return (
    (o.coins -= s.cost),
    (o.stats.spent += s.cost),
    advanceHours(o, s.minutes),
    consumeSatiety(o, s.minutes / 60),
    (o.mood = Math.min(MAX_MOOD, (o.mood ?? 100) + s.mood)),
    (o.energy = Math.min(MAX_ENERGY, Math.max(0, o.energy + s.energy))),
    (o.satiety = Math.min(MAX_SATIETY, Math.max(0, (o.satiety ?? 70) + s.satiety))),
    {
      state: o,
      ok: !0,
      message: `在游乐园玩了「${s.name}」：心情 +${s.mood}，精力 ${s.energy >= 0 ? "+" : ""}${s.energy}，饱食 -${Math.abs(s.satiety)}（¥${s.cost}）`,
    }
  );
}

function buyVehicle(e, n) {
  const s = VEHICLES.find((l) => l.id === n);
  if (!s) return { state: e, ok: !1, message: "没有这种交通工具" };
  const a = e.vehicles ?? [];
  if (a.includes(n)) return { state: e, ok: !1, message: `已经有${s.name}啦` };
  if (e.coins < s.price)
    return { state: e, ok: !1, message: `金币不足（${s.name}需要 ¥${s.price}）` };
  const o = deepClone(e);
  return (
    (o.coins -= s.price),
    (o.stats.spent += s.price),
    (o.vehicles = [...a, n]),
    { state: o, ok: !0, message: `入手${s.name}！以后可以去农贸市场买海鲜啦（花费 ¥${s.price}）` }
  );
}

function travelToMarket(e) {
  const n = e.vehicles ?? [];
  if (n.length === 0)
    return { state: e, ok: !1, message: "还没有任何交通工具，先去商店街买公交卡/三轮车/私家车吧" };
  if (e.energy < 5) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, ic);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.hour += ic), (a.energy -= 5), consumeSatiety(a, 1));
  const o = VEHICLES.find((c) => c.id === n[0]),
    l = getAvailableEvents(a, "market");
  return {
    state: l.state,
    ok: !0,
    message: `搭${(o == null ? void 0 : o.emoji) ?? ""}${(o == null ? void 0 : o.name) ?? "交通工具"}来到农贸市场，海鲜摊的吆喝声老远就能听见！${l.text ? ` ${l.text}` : ""}`,
  };
}

function travelToGarden(e) {
  const n = e.vehicles ?? [];
  if (n.length === 0)
    return { state: e, ok: !1, message: "还没有任何交通工具，先去商店街买公交卡/三轮车/私家车吧" };
  if (e.energy < 5) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, Bo);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.hour += Bo), (a.energy -= 5), consumeSatiety(a, 1));
  const o = VEHICLES.find((c) => c.id === n[0]),
    l = getAvailableEvents(a, "garden");
  return {
    state: l.state,
    ok: !0,
    message: `搭${(o == null ? void 0 : o.emoji) ?? ""}${(o == null ? void 0 : o.name) ?? "交通工具"}来到郊外菜园，菜园主人正弯着腰给菜苗浇水，抬头看见你直乐！${l.text ? ` ${l.text}` : ""}`,
  };
}

function travelToOrchard(e) {
  const n = e.vehicles ?? [];
  if (n.length === 0)
    return { state: e, ok: !1, message: "还没有任何交通工具，先去商店街买公交卡/三轮车/私家车吧" };
  if (e.energy < 5) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, Do);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.hour += Do), (a.energy -= 5), consumeSatiety(a, 1));
  const o = VEHICLES.find((c) => c.id === n[0]),
    l = getAvailableEvents(a, "orchard");
  return {
    state: l.state,
    ok: !0,
    message: `搭${(o == null ? void 0 : o.emoji) ?? ""}${(o == null ? void 0 : o.name) ?? "交通工具"}来到郊外果园，果香扑面而来，树上沉甸甸的果子看着就喜人！${l.text ? ` ${l.text}` : ""}`,
  };
}

const RANDOM_NPC_NAMES = ["小林", "小雨", "阿泽", "小菲", "浩然", "思思", "俊俊", "甜甜"];

function isNightMarketOpen(e) {
  return isWeekend(e.day) && e.hour >= 18 && e.hour < 24;
}

function getYearMonthKey(e) {
  const n = dayToDate(e.day);
  return `${n.year}-${n.month}`;
}

function hasValidPermit(e) {
  return (
    e.nightMarketPermit === !0 && !!e.nightMarketPermitMonth && e.nightMarketPermitMonth === getYearMonthKey(e)
  );
}

function getPermitStatus(e) {
  return e.nightMarketPermit !== !0 ? "none" : hasValidPermit(e) ? "valid" : "expired";
}

function applyPermit(e) {
  if (hasValidPermit(e)) return { state: e, ok: !1, message: "这个月的摆摊资格已经办好了，下个月记得再来续办" };
  if (e.coins < js) return { state: e, ok: !1, message: `摆摊资格办理费 ¥${js}，金币不够啦` };
  const n = deepClone(e);
  ((n.coins -= js),
    (n.stats.spent += js),
    (n.nightMarketPermit = !0),
    (n.nightMarketPermitMonth = getYearMonthKey(n)));
  const s = e.nightMarketPermit === !0;
  return {
    state: n,
    ok: !0,
    message: s
      ? "夜市摆摊资格已续办，本月底前都有效！休息日晚上就能去广场开张"
      : "夜市摆摊资格办好了！本月内有效，下个月记得来续办；再去买一辆餐车就能开张",
  };
}

function buyFoodTruck(e) {
  if (!hasValidPermit(e))
    return e.nightMarketPermit === !0
      ? { state: e, ok: !1, message: "这个月的摆摊资格已过期，先到窗口续办资格（¥200），再买餐车" }
      : { state: e, ok: !1, message: "还没有夜市摆摊资格，先到窗口把资格办了" };
  if (e.nightMarketTruck === !0)
    return { state: e, ok: !1, message: "餐车已经有了，休息日晚上去广场开张吧" };
  if (e.coins < bi)
    return { state: e, ok: !1, message: `餐车要 ¥${bi}，这是辆昂贵的新餐车，金币不够啦` };
  const n = deepClone(e);
  return (
    (n.coins -= bi),
    (n.stats.spent += bi),
    (n.nightMarketTruck = !0),
    (n.truckFeePaidMonth = getYearMonthKey(n)),
    {
      state: n,
      ok: !0,
      message:
        "餐车到手，擦得锃亮！就等休息日晚上去广场摆夜市了（每月还有维护费 ¥80 + 水电 ¥40，跨月第一天自动扣缴）",
    }
  );
}

function chargeTruckMonthlyFee(e) {
  if (e.nightMarketTruck !== !0) return { state: e, paid: 0, short: 0, message: "" };
  const n = getYearMonthKey(e);
  if (e.truckFeePaidMonth === n) return { state: e, paid: 0, short: 0, message: "" };
  const s = deepClone(e),
    a = Math.min(dc, s.coins);
  s.coins -= a;
  const o = dc - a;
  return (
    (s.truckFeePaidMonth = n),
    (s.stats.spent += a),
    o > 0
      ? { state: s, paid: a, short: o, message: "钱包见底，餐车的维护费和水电费先记账了" }
      : { state: s, paid: a, short: o, message: `🚚 餐车月度维护 ¥${Ec} + 水电 ¥${Ic} 已缴纳` }
  );
}

function openNightMarketStall(e) {
  var u;
  if (e.nightMarketTruck === !0 && !hasValidPermit(e))
    return {
      state: e,
      ok: !1,
      message: "这个月的摆摊资格已过期，先去市政府续办资格（¥200）再来出摊",
    };
  if (!hasValidPermit(e) || e.nightMarketTruck !== !0)
    return { state: e, ok: !1, message: "还没有摆摊资格或餐车，先去市政府办资格、买餐车" };
  if (!isNightMarketOpen(e))
    return {
      state: e,
      ok: !1,
      message: "夜市还没开张：休息日晚上 18 点后、非节日夜晚，广场才摆夜市",
    };
  if (e.energy < 4) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const n = checkTimeBlocked(e, TIME_COST.nightMarketSell / 60);
  if (n) return { state: e, ok: !1, message: n };
  const s = e.products.filter((f) => {
      var g;
      return (
        f.quality !== "fail" &&
        (f.qty ?? 1) > 0 &&
        (((g = RECIPE_RUNTIME_DATA[f.recipeId]) == null ? void 0 : g.system) ?? "bakery") === "cuisine"
      );
    }),
    a = e.products.filter((f) => {
      var g;
      return (
        f.quality !== "fail" &&
        (f.qty ?? 1) > 0 &&
        (((g = RECIPE_RUNTIME_DATA[f.recipeId]) == null ? void 0 : g.system) ?? "bakery") === "bakery"
      );
    });
  if (s.length === 0 && (e.employees.length === 0 || a.length === 0))
    return {
      state: e,
      ok: !1,
      message: "餐车空空如也：带份料理来自己卖，或者烤点糕点让店员看着蛋糕摊",
    };
  const o = deepClone(e);
  (advanceHours(o, TIME_COST.nightMarketSell), (o.energy = Math.max(0, o.energy - 4)), consumeSatiety(o, TIME_COST.nightMarketSell / 60));
  const l = [];
  let c = 0;
  if (s.length > 0) {
    const f = s[Math.floor(Math.random() * s.length)],
      g = RECIPE_RUNTIME_DATA[f.recipeId],
      x = getFinalProductPrice(f, 1.3);
    ((c += x),
      (o.cashRegister = (o.cashRegister ?? 0) + x),
      (o.stats.earned += x),
      (o.stats.sold += 1),
      (f.qty = (f.qty ?? 1) - 1),
      f.qty <= 0 && (o.products = o.products.filter((m) => m.pid !== f.pid)),
      l.push(`「${(g == null ? void 0 : g.name) ?? "料理"}」¥${x}`));
  }
  if ((((u = o.employees) == null ? void 0 : u.length) ?? 0) > 0 && a.length > 0) {
    const f = a[Math.floor(Math.random() * a.length)],
      g = RECIPE_RUNTIME_DATA[f.recipeId],
      x = getFinalProductPrice(f, 1.3);
    ((c += x),
      (o.cashRegister = (o.cashRegister ?? 0) + x),
      (o.stats.earned += x),
      (o.stats.sold += 1),
      (f.qty = (f.qty ?? 1) - 1),
      f.qty <= 0 && (o.products = o.products.filter((m) => m.pid !== f.pid)),
      l.push(`店员卖的「${(g == null ? void 0 : g.name) ?? "糕点"}」¥${x}`));
  }
  return { state: o, ok: !0, message: `夜市开张：${l.join("、")}，收入 ¥${c} 已存入收银台` };
}
