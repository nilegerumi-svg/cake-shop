function deepCloneState(e) {
  return JSON.parse(JSON.stringify(e));
}

const getStats = (e) => e.stats,
  countRecipes = (e) => Object.keys(e.recipes).length,
  maxAffection = (e) => Math.max(0, ...Object.values(e.affection));

function createEmptyCounters() {
  return {
    baked: 0,
    perfects: 0,
    sold: 0,
    earned: 0,
    spent: 0,
    chats: 0,
    gifted: 0,
    dated: 0,
    explores: 0,
    exercises: 0,
    cleanups: 0,
    fishes: 0,
    loaches: 0,
    injuries: 0,
    bigFish: 0,
    maxCoins: 0,
  };
}

const CATEGORY_LABELS = { bake: "烘焙", shop: "经营", town: "小镇", fate: "好感" },
  CATEGORY_ICONS = { bake: "🍳", shop: "🏪", town: "🏘️", fate: "💕" },
  ACHIEVEMENTS_BAKE = [
    {
      id: "bake_1",
      category: "bake",
      name: "初出茅庐",
      emoji: "🧁",
      desc: "完成第一次烘焙",
      check: (e) => getStats(e).baked >= 1,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 1), target: 1 }),
    },
    {
      id: "bake_10",
      category: "bake",
      name: "烘焙新手",
      emoji: "🥐",
      desc: "累计烘焙 10 次",
      check: (e) => getStats(e).baked >= 10,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 10), target: 10 }),
    },
    {
      id: "bake_50",
      category: "bake",
      name: "烘焙达人",
      emoji: "🍩",
      desc: "累计烘焙 50 次",
      check: (e) => getStats(e).baked >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 50), target: 50 }),
    },
    {
      id: "bake_100",
      category: "bake",
      name: "烘焙大师",
      emoji: "🏆",
      desc: "累计烘焙 100 次",
      check: (e) => getStats(e).baked >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 100), target: 100 }),
    },
    {
      id: "perfect_5",
      category: "bake",
      name: "完美主义者",
      emoji: "✨",
      desc: "制作出 5 个完美品质点心",
      check: (e) => getStats(e).perfects >= 5,
      progress: (e) => ({ current: Math.min(getStats(e).perfects, 5), target: 5 }),
    },
    {
      id: "perfect_20",
      category: "bake",
      name: "精益求精",
      emoji: "💎",
      desc: "制作出 20 个完美品质点心",
      check: (e) => getStats(e).perfects >= 20,
      progress: (e) => ({ current: Math.min(getStats(e).perfects, 20), target: 20 }),
    },
    {
      id: "recipe_5",
      category: "bake",
      name: "蛋糕爱好者",
      emoji: "📖",
      desc: "研发 5 种配方",
      check: (e) => countRecipes(e) >= 5,
      progress: (e) => ({ current: Math.min(countRecipes(e), 5), target: 5 }),
    },
    {
      id: "recipe_10",
      category: "bake",
      name: "美食家",
      emoji: "👨‍🍳",
      desc: "研发 10 种配方",
      check: (e) => countRecipes(e) >= 10,
      progress: (e) => ({ current: Math.min(countRecipes(e), 10), target: 10 }),
    },
    {
      id: "recipe_all",
      category: "bake",
      name: "甜品大师",
      emoji: "👑",
      desc: "研发全部配方",
      check: (e) => countRecipes(e) >= RECIPES_ALL.length,
      progress: (e) => ({ current: Math.min(countRecipes(e), RECIPES_ALL.length), target: RECIPES_ALL.length }),
    },
    {
      id: "bake_300",
      category: "bake",
      name: "烘焙狂人",
      emoji: "🏵️",
      desc: "累计烘焙 300 次",
      check: (e) => getStats(e).baked >= 300,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 300), target: 300 }),
    },
    {
      id: "perfect_50",
      category: "bake",
      name: "匠人之心",
      emoji: "💍",
      desc: "制作出 50 个完美品质点心",
      check: (e) => getStats(e).perfects >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).perfects, 50), target: 50 }),
    },
    {
      id: "bake_skill_50",
      category: "bake",
      name: "面点师傅",
      emoji: "🥖",
      desc: "烘焙技能达到 50",
      check: (e) => e.bakeSkill >= 50,
      progress: (e) => ({ current: Math.min(e.bakeSkill, 50), target: 50 }),
    },
    {
      id: "bake_skill_100",
      category: "bake",
      name: "烘焙宗师",
      emoji: "🎓",
      desc: "烘焙技能达到 100",
      check: (e) => e.bakeSkill >= 100,
      progress: (e) => ({ current: Math.min(e.bakeSkill, 100), target: 100 }),
    },
    {
      id: "cook_skill_50",
      category: "bake",
      name: "厨艺精进",
      emoji: "🍲",
      desc: "烹饪熟练度达到 50",
      check: (e) => e.cookSkill >= 50,
      progress: (e) => ({ current: Math.min(e.cookSkill, 50), target: 50 }),
    },
    {
      id: "bake_500",
      category: "bake",
      name: "烘焙之神",
      emoji: "🏅",
      desc: "累计烘焙 500 次",
      check: (e) => getStats(e).baked >= 500,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 500), target: 500 }),
    },
    {
      id: "perfect_100",
      category: "bake",
      name: "完美百炼",
      emoji: "💠",
      desc: "制作出 100 个完美品质点心",
      check: (e) => getStats(e).perfects >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).perfects, 100), target: 100 }),
    },
    {
      id: "recipe_20",
      category: "bake",
      name: "菜谱收藏家",
      emoji: "📚",
      desc: "研发 20 种配方",
      check: (e) => countRecipes(e) >= 20,
      progress: (e) => ({ current: Math.min(countRecipes(e), 20), target: 20 }),
    },
    {
      id: "cook_skill_80",
      category: "bake",
      name: "灶台老手",
      emoji: "🍳",
      desc: "烹饪熟练度达到 80",
      check: (e) => e.cookSkill >= 80,
      progress: (e) => ({ current: Math.min(e.cookSkill, 80), target: 80 }),
    },
    {
      id: "cook_skill_100",
      category: "bake",
      name: "厨神附体",
      emoji: "🥘",
      desc: "烹饪熟练度达到 100",
      check: (e) => e.cookSkill >= 100,
      progress: (e) => ({ current: Math.min(e.cookSkill, 100), target: 100 }),
    },
    {
      id: "custom_cake_1",
      category: "bake",
      name: "心意定制",
      emoji: "🎂",
      desc: "制作第 1 个定制蛋糕",
      check: (e) => (e.customCakeCounter ?? 0) >= 1,
      progress: (e) => ({ current: Math.min(e.customCakeCounter ?? 0, 1), target: 1 }),
    },
    {
      id: "custom_cake_10",
      category: "bake",
      name: "蛋糕艺术家",
      emoji: "🧁",
      desc: "累计制作 10 个定制蛋糕",
      check: (e) => (e.customCakeCounter ?? 0) >= 10,
      progress: (e) => ({ current: Math.min(e.customCakeCounter ?? 0, 10), target: 10 }),
    },
  ],
  ACHIEVEMENTS_SHOP = [
    {
      id: "earn_500",
      category: "shop",
      name: "第一桶金",
      emoji: "🪙",
      desc: "累计收入 500 金币",
      check: (e) => getStats(e).earned >= 500,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 500), target: 500 }),
    },
    {
      id: "earn_5000",
      category: "shop",
      name: "万元户",
      emoji: "💰",
      desc: "累计收入 5000 金币",
      check: (e) => getStats(e).earned >= 5e3,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 5e3), target: 5e3 }),
    },
    {
      id: "earn_20000",
      category: "shop",
      name: "大富翁",
      emoji: "🏦",
      desc: "累计收入 20000 金币",
      check: (e) => getStats(e).earned >= 2e4,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 2e4), target: 2e4 }),
    },
    {
      id: "sold_10",
      category: "shop",
      name: "小有名气",
      emoji: "🍰",
      desc: "卖出 10 件点心",
      check: (e) => getStats(e).sold >= 10,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 10), target: 10 }),
    },
    {
      id: "sold_50",
      category: "shop",
      name: "回头客",
      emoji: "🤝",
      desc: "卖出 50 件点心",
      check: (e) => getStats(e).sold >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 50), target: 50 }),
    },
    {
      id: "sold_200",
      category: "shop",
      name: "门庭若市",
      emoji: "🎉",
      desc: "卖出 200 件点心",
      check: (e) => getStats(e).sold >= 200,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 200), target: 200 }),
    },
    {
      id: "coin_1000",
      category: "shop",
      name: "小有积蓄",
      emoji: "🧧",
      desc: "持有 1000 金币",
      check: (e) => e.coins >= 1e3,
      progress: (e) => ({ current: Math.min(e.coins, 1e3), target: 1e3 }),
    },
    {
      id: "coin_10000",
      category: "shop",
      name: "富甲一方",
      emoji: "🏝️",
      desc: "持有 10000 金币",
      check: (e) => e.coins >= 1e4,
      progress: (e) => ({ current: Math.min(e.coins, 1e4), target: 1e4 }),
    },
    {
      id: "earn_50000",
      category: "shop",
      name: "金碧辉煌",
      emoji: "🏆",
      desc: "累计收入 50000 金币",
      check: (e) => getStats(e).earned >= 5e4,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 5e4), target: 5e4 }),
    },
    {
      id: "sold_500",
      category: "shop",
      name: "供不应求",
      emoji: "🔥",
      desc: "卖出 500 件点心",
      check: (e) => getStats(e).sold >= 500,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 500), target: 500 }),
    },
    {
      id: "coin_50000",
      category: "shop",
      name: "小镇首富",
      emoji: "💎",
      desc: "持有 50000 金币",
      check: (e) => e.coins >= 5e4,
      progress: (e) => ({ current: Math.min(e.coins, 5e4), target: 5e4 }),
    },
    {
      id: "employee_1",
      category: "shop",
      name: "开店帮手",
      emoji: "👩‍🍳",
      desc: "雇佣第 1 名员工",
      check: (e) => (e.employees ?? []).length >= 1,
      progress: (e) => ({ current: Math.min((e.employees ?? []).length, 1), target: 1 }),
    },
    {
      id: "employee_3",
      category: "shop",
      name: "团队壮大",
      emoji: "🧑‍🍳",
      desc: "雇佣 3 名员工",
      check: (e) => (e.employees ?? []).length >= 3,
      progress: (e) => ({ current: Math.min((e.employees ?? []).length, 3), target: 3 }),
    },
    {
      id: "upgrade_3",
      category: "shop",
      name: "店面升级",
      emoji: "📈",
      desc: "店铺升级到 Lv.3",
      check: (e) => (e.shopUpgradeLevel ?? 1) >= 3,
      progress: (e) => ({ current: Math.min(e.shopUpgradeLevel ?? 1, 3), target: 3 }),
    },
    {
      id: "upgrade_6",
      category: "shop",
      name: "豪华店面",
      emoji: "🏬",
      desc: "店铺升级到 Lv.6",
      check: (e) => (e.shopUpgradeLevel ?? 1) >= 6,
      progress: (e) => ({ current: Math.min(e.shopUpgradeLevel ?? 1, 6), target: 6 }),
    },
    {
      id: "earn_100000",
      category: "shop",
      name: "百万甜心",
      emoji: "🏰",
      desc: "累计收入 100000 金币",
      check: (e) => getStats(e).earned >= 1e5,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 1e5), target: 1e5 }),
    },
    {
      id: "sold_1000",
      category: "shop",
      name: "千单达成",
      emoji: "🚀",
      desc: "卖出 1000 件点心",
      check: (e) => getStats(e).sold >= 1e3,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 1e3), target: 1e3 }),
    },
    {
      id: "coin_100000",
      category: "shop",
      name: "糖果巨富",
      emoji: "👑",
      desc: "持有 100000 金币",
      check: (e) => e.coins >= 1e5,
      progress: (e) => ({ current: Math.min(e.coins, 1e5), target: 1e5 }),
    },
    {
      id: "upgrade_10",
      category: "shop",
      name: "殿堂级店面",
      emoji: "🏆",
      desc: "店铺升级到满级 Lv.10",
      check: (e) => (e.shopUpgradeLevel ?? 1) >= 10,
      progress: (e) => ({ current: Math.min(e.shopUpgradeLevel ?? 1, 10), target: 10 }),
    },
    {
      id: "shelf_10",
      category: "shop",
      name: "货架满满",
      emoji: "🧺",
      desc: "货架上同时摆上 10 件点心",
      check: (e) => (e.shelves ?? []).length >= 10,
      progress: (e) => ({ current: Math.min((e.shelves ?? []).length, 10), target: 10 }),
    },
    {
      id: "shelf_20",
      category: "shop",
      name: "琳琅满目",
      emoji: "🗄️",
      desc: "货架上同时摆上 20 件点心",
      check: (e) => (e.shelves ?? []).length >= 20,
      progress: (e) => ({ current: Math.min((e.shelves ?? []).length, 20), target: 20 }),
    },
    {
      id: "employee_2",
      category: "shop",
      name: "双人成行",
      emoji: "👥",
      desc: "雇佣全部 2 名员工",
      check: (e) => (e.employees ?? []).length >= 2,
      progress: (e) => ({ current: Math.min((e.employees ?? []).length, 2), target: 2 }),
    },
    {
      id: "truck_1",
      category: "shop",
      name: "移动美食家",
      emoji: "🚚",
      desc: "买下夜市餐车",
      check: (e) => e.nightMarketTruck === !0,
      progress: (e) => ({ current: e.nightMarketTruck === !0 ? 1 : 0, target: 1 }),
    },
  ],
  ACHIEVEMENTS_ALL = [...ACHIEVEMENTS_BAKE, ...ACHIEVEMENTS_SHOP];

let idCounter = 0;

function makeId(e) {
  return ((idCounter += 1), `${e}_${Date.now()}_${idCounter}`);
}

function deepClone(e) {
  return JSON.parse(JSON.stringify(e));
}

function checkTimeBlocked(e, n) {
  return n <= 0
    ? null
    : e.hour + n > DAY_END_HOUR
      ? `现在${formatHour(e.hour)}，太晚了，该休息了（明天再继续）`
      : null;
}

const TIME_COST = {
  chat: 10,
  gift: 15,
  date: 90,
  encounter: 10,
  giveFlower: 10,
  buyFlower: 15,
  eatProduct: 15,
  eatSimple: 30,
  eatSuji: 45,
  eatFastfood: 30,
  bakeSmall: 30,
  bakeMedium: 45,
  bakeLarge: 60,
  openShop: 60,
  charitySell: 90,
  nightMarketSell: 30,
  goldfishCatch: 15,
  exercise: 40,
  read: 60,
  libraryRead: 60,
  playGame: 20,
  craftFurniture: 120,
  craftClothing: 60,
  shelterDonate: 20,
  shelterEvent: 60,
  stroll: 30,
  hospital: 60,
  sleep: 60,
  catchLoach: 30,
  fish: 45,
  gatherRiver: 30,
  schoolGate: 15,
  process: 30,
  coastPlay: 30,
};

function advanceHours(e, n) {
  n > 0 && (e.hour += n / 60);
}

function stackProducts(e, n) {
  const s = new Map(),
    a = [];
  for (const f of e) {
    const g =
        f.customName || f.customPrice
          ? `custom|${f.pid}`
          : `${f.recipeId}|${f.quality}|${f.remaining}`,
      x = s.get(g);
    x ? (x.qty += f.qty ?? 1) : (s.set(g, { ...f, qty: f.qty ?? 1 }), a.push(g));
  }
  const o = a.map((f) => s.get(f)),
    l = new Map();
  for (const f of o) l.set(f.pid, f.pid);
  for (const f of e) {
    const g =
      f.customName || f.customPrice ? void 0 : s.get(`${f.recipeId}|${f.quality}|${f.remaining}`);
    g && g.pid !== f.pid && l.set(f.pid, g.pid);
  }
  const c = [],
    u = new Set();
  for (const f of n) {
    const g = l.get(f.pid);
    g && (u.has(g) || (u.add(g), c.push({ pid: g, mult: f.mult })));
  }
  return { products: o, shelves: c };
}

function moodDecayAmount(e) {
  if (e <= 0) return 0;
  const n = e / 6,
    s = (e * 7) / 9;
  return Math.max(1, Math.round(n + Math.random() * (s - n)));
}

function decayMood(e, n) {
  e.mood = Math.max(0, e.mood - moodDecayAmount(n));
}

const SATIETY_PER_HOUR = 2,
  HUNGER_ENERGY_LOSS = 3,
  HUNGER_MOOD_LOSS = 2,
  HUNGER_HEALTH_LOSS = 1;

function consumeSatiety(e, n) {
  if (n <= 0) return (e.satiety ?? 70) <= 0;
  const s = e.satiety ?? 70;
  return (
    (e.satiety = Math.max(0, Math.round(s - n * SATIETY_PER_HOUR))),
    e.satiety <= 0
      ? ((e.energy = Math.max(0, Math.round(e.energy - HUNGER_ENERGY_LOSS * n))),
        (e.mood = Math.max(0, Math.round(e.mood - HUNGER_MOOD_LOSS * n))),
        (e.health = Math.max(0, Math.round(e.health - HUNGER_HEALTH_LOSS * n))),
        !0)
      : !1
  );
}

function cookSimpleMeal(e) {
  var o, l;
  const n = { rice: 1, eggs: 1, scallion: 1, oil: 1 };
  if ((e.satiety ?? 70) >= MAX_SATIETY) return { state: e, ok: !1, message: "已经吃饱啦，再吃就要撑着了" };
  for (const [c, u] of Object.entries(n)) {
    const f = e.ingredients[c];
    if (!f || f.qty < u) {
      const g = ((o = INGREDIENT_MAP[c]) == null ? void 0 : o.name) ?? c;
      return { state: e, ok: !1, message: `做简餐还缺 ${g} x${u}（去订购或商店街买点食材吧）` };
    }
    if (f.freshness === 3)
      return {
        state: e,
        ok: !1,
        message: `${((l = INGREDIENT_MAP[c]) == null ? void 0 : l.name) ?? c} 已腐烂，不能吃`,
      };
  }
  const s = checkTimeBlocked(e, TIME_COST.eatSimple / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  for (const [c, u] of Object.entries(n)) {
    const f = a.ingredients[c];
    f && ((f.qty -= u), f.qty <= 0 && delete a.ingredients[c]);
  }
  return (
    advanceHours(a, TIME_COST.eatSimple),
    (a.satiety = Math.min(MAX_SATIETY, (a.satiety ?? 70) + 40)),
    (a.energy = Math.min(MAX_ENERGY, a.energy + 10)),
    (a.mood = Math.min(MAX_MOOD, a.mood + 4)),
    {
      state: a,
      ok: !0,
      message: "下厨做了顿简餐：米饭、煎蛋配小葱，吃饱喝足！饱食度 +40，精力 +10，心情 +4",
    }
  );
}

function eatProduct(e, n) {
  const s = e.products.find((x) => x.pid === n);
  if (!s) return { state: e, ok: !1, message: "成品不存在" };
  const a = RECIPE_RUNTIME_DATA[s.recipeId];
  if (!a) return { state: e, ok: !1, message: "食谱不存在" };
  if ((e.satiety ?? 70) >= MAX_SATIETY) return { state: e, ok: !1, message: "已经吃饱啦，再吃就要撑着了" };
  const o = checkTimeBlocked(e, TIME_COST.eatProduct / 60);
  if (o) return { state: e, ok: !1, message: o };
  const l = deepClone(e),
    c = l.products.find((x) => x.pid === n);
  (c &&
    ((c.qty = (c.qty ?? 1) - 1),
    c.qty <= 0 &&
      ((l.products = l.products.filter((x) => x.pid !== n)),
      (l.shelves = l.shelves.filter((x) => x.pid !== n)))),
    advanceHours(l, TIME_COST.eatProduct));
  const u = a.size === "large" ? 55 : a.size === "medium" ? 40 : 25;
  if (s.quality === "fail")
    return (
      (l.satiety = Math.min(MAX_SATIETY, (l.satiety ?? 70) + 12)),
      (l.health = Math.max(0, (l.health ?? 100) - 6)),
      (l.mood = Math.max(0, (l.mood ?? 100) - 3)),
      {
        state: l,
        ok: !0,
        message: `硬着头皮吃了「${a.name}」…味道一言难尽，饱食度 +12，但闹肚子了，健康 -6，心情 -3`,
      }
    );
  const f = s.quality === "perfect" ? 1.5 : s.quality === "good" ? 1.2 : 1,
    g = Math.round(u * f);
  return (
    (l.satiety = Math.min(MAX_SATIETY, (l.satiety ?? 70) + g)),
    (l.energy = Math.min(MAX_ENERGY, l.energy + Math.round(g / 4))),
    (l.mood = Math.min(MAX_MOOD, l.mood + 3)),
    {
      state: l,
      ok: !0,
      message: `吃掉了「${a.name}」（${QUALITY_META[s.quality].label}），饱食度 +${g}，精力 +${Math.round(g / 4)}，心情 +3`,
    }
  );
}

function injurePlayer(e, n) {
  ((e.health = Math.max(0, e.health - Math.max(1, Math.round(n)))),
    (e.stats.injuries = (e.stats.injuries ?? 0) + 1));
}

function randomInjuryType() {
  return CAKE_THEME_IDS[Math.floor(Math.random() * CAKE_THEME_IDS.length)];
}

const SEATING_FURNITURE = new Set(["f_table", "f_chair", "f_stool"]);

function defaultAppearance() {
  return {
    outfits: { owned: [...INITIAL_OWNED_OUTFITS], equipped: { ...DEFAULT_OUTFIT } },
    hairstyle: { owned: [], equipped: DEFAULT_HAIRSTYLE },
  };
}

function renamePlayer(e, n) {
  const s = n.trim();
  if (!s) return { state: e, ok: !1, message: "名字不能为空" };
  if (s.length > 8) return { state: e, ok: !1, message: "名字最长 8 个字" };
  if (e.coins < MAX_STAT_VALUE) return { state: e, ok: !1, message: `改名费 ¥${MAX_STAT_VALUE}，金币不够啦` };
  const a = deepClone(e);
  return (
    (a.coins -= MAX_STAT_VALUE),
    (a.playerName = s),
    { state: a, ok: !0, message: `改名成功！从今往后，你就是「${s}」了` }
  );
}

function renameShop(e, n) {
  const s = n.trim();
  if (!s) return { state: e, ok: !1, message: "店名不能为空" };
  if (s.length > 10) return { state: e, ok: !1, message: "店名最长 10 个字" };
  if (e.coins < MAX_STAT_VALUE) return { state: e, ok: !1, message: `改名费 ¥${MAX_STAT_VALUE}，金币不够啦` };
  const a = deepClone(e);
  return (
    (a.coins -= MAX_STAT_VALUE),
    (a.shopName = s),
    { state: a, ok: !0, message: `改店名成功！「${s}」的招牌挂起来了` }
  );
}

function outfitBeautyBonus(e) {
  var s, a, o;
  let n = 0;
  for (const l of SLOT_ORDER) {
    const c = (a = (s = e.outfits) == null ? void 0 : s.equipped) == null ? void 0 : a[l];
    c && (n += ((o = OUTFIT_MAP[c]) == null ? void 0 : o.charm) ?? 0);
  }
  return n;
}

function buyOutfit(e, n) {
  const s = OUTFIT_MAP[n];
  if (!s) return { state: e, ok: !1, message: "服饰不存在" };
  if (e.outfits.owned.includes(n)) return { state: e, ok: !1, message: "已经拥有这件服饰" };
  if (e.coins < s.price) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  return (
    (a.coins -= s.price),
    (a.stats.spent += s.price),
    a.outfits.owned.push(n),
    { state: a, ok: !0, message: `购入「${s.name}」，魅力 +${s.charm}` }
  );
}

function equipOutfit(e, n) {
  const s = OUTFIT_MAP[n];
  if (!s) return { state: e, ok: !1, message: "服饰不存在" };
  if (!e.outfits.owned.includes(n)) return { state: e, ok: !1, message: "还没有这件服饰" };
  const a = deepClone(e);
  return (
    (a.outfits.equipped = { ...a.outfits.equipped, [s.slot]: n }),
    { state: a, ok: !0, message: `已换上「${s.name}」` }
  );
}

function hairBeautyBonus(e) {
  var s, a;
  const n =
    ((a = HAIRSTYLE_MAP[((s = e.hairstyle) == null ? void 0 : s.equipped) ?? ""]) == null
      ? void 0
      : a.charm) ?? 0;
  return e.combedToday === !0 ? n : Math.floor(n / 2);
}

function buyHairstyle(e, n) {
  var o, l;
  const s = HAIRSTYLE_MAP[n];
  if (!s) return { state: e, ok: !1, message: "发型不存在" };
  if (s.type === "basic") return { state: e, ok: !1, message: "基础发型在家自己梳就行，不用花钱" };
  if ((((o = e.hairstyle) == null ? void 0 : o.owned) ?? []).includes(n))
    return { state: e, ok: !1, message: "已经做过这个发型啦" };
  if (e.coins < s.price) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  return (
    (a.coins -= s.price),
    (a.stats.spent += s.price),
    (a.hairstyle = {
      owned: [...(((l = a.hairstyle) == null ? void 0 : l.owned) ?? []), n],
      equipped: n,
    }),
    { state: a, ok: !0, message: `在理发店做好了「${s.name}」，魅力 +${s.charm}` }
  );
}

function applyHairstyle(e, n) {
  var o;
  const s = HAIRSTYLE_MAP[n];
  if (!s) return { state: e, ok: !1, message: "发型不存在" };
  if (s.type === "salon" && !(((o = e.hairstyle) == null ? void 0 : o.owned) ?? []).includes(n))
    return { state: e, ok: !1, message: "这个复杂发型需要去商店街的理发店先做好" };
  const a = deepClone(e);
  return (
    (a.hairstyle = { ...(a.hairstyle ?? { owned: [], equipped: DEFAULT_HAIRSTYLE }), equipped: n }),
    { state: a, ok: !0, message: `梳好了「${s.name}」，清爽出门！` }
  );
}

function calcCharm(e) {
  const n = e.combedToday === !0,
    s = Math.floor((e.negotiation ?? 0) / 10),
    a = outfitBeautyBonus(e),
    o = hairBeautyBonus(e),
    l = Math.round(((e.hygiene ?? 100) / 100) * 5),
    c = s + a + o + l;
  return n ? c : Math.floor(c * 0.85);
}

function getEarnedStar(e) {
  return calcEarnedStar(e.stats.earned);
}

function calcReputation(e) {
  const n = e.stats ?? {};
  return (
    Math.floor((n.earned ?? 0) / 80) +
    (n.perfects ?? 0) * 2 +
    Math.floor((n.sold ?? 0) / 5) +
    Object.keys(e.achievements ?? {}).length * 8 +
    Object.values(e.milestones ?? {}).filter((s) => s === 2).length * 8 +
    Object.keys(e.recipes ?? {}).length * 3
  );
}

const BASE_SHELF_SLOTS = 6;

function shelfCapacity(e) {
  return Math.min(30, BASE_SHELF_SLOTS + (getEarnedStar(e) - 1) * 3);
}

function dailyUtilityFee(e) {
  var a;
  const n = getEarnedStar(e),
    s = Math.max(0, (((a = e.cookwares) == null ? void 0 : a.length) ?? 1) - 1);
  return 8 + (n - 1) * 4 + s * 2;
}

function calcDecorScore(e) {
  var s;
  let n = 0;
  for (const a of e.shopPlacements) {
    const o = a.split("_")[0];
    n += ((s = FURNITURE_MAP[o]) == null ? void 0 : s.decor) ?? 0;
  }
  return n;
}

function calcShopScore(e) {
  return getEarnedStar(e) * 10 + calcDecorScore(e);
}

function depositCoins(e, n) {
  const s = Math.floor(n);
  if (s <= 0) return { state: e, ok: !1, message: "存款金额不对哦" };
  if (e.coins < s) return { state: e, ok: !1, message: "口袋里没有那么多金币" };
  const a = deepClone(e);
  return (
    (a.coins -= s),
    (a.bankSavings = (typeof a.bankSavings == "number" ? a.bankSavings : 0) + s),
    { state: a, ok: !0, message: `存入 ¥${s}，活期存款现有 ¥${a.bankSavings}（每天日结利息）` }
  );
}

function withdrawCoins(e, n) {
  const s = Math.floor(n);
  if (s <= 0) return { state: e, ok: !1, message: "取款金额不对哦" };
  const a = typeof e.bankSavings == "number" ? e.bankSavings : 0;
  if (a < s) return { state: e, ok: !1, message: `存款只有 ¥${a}` };
  const o = deepClone(e);
  return (
    (o.bankSavings = a - s),
    (o.coins += s),
    { state: o, ok: !0, message: `取出 ¥${s}，存款还剩 ¥${o.bankSavings}` }
  );
}

function changeAffection(e, n, s) {
  const a = e.affection[n] ?? 0,
    o = Math.min(MAX_AFFECTION, Math.max(0, a + s));
  return ((e.affection[n] = o), o);
}

function addIngredient(e, n, s) {
  if (!INGREDIENT_MAP[n]) return !1;
  const a = e.ingredients[n];
  return (
    a ? (a.qty += s) : (e.ingredients[n] = { qty: s, freshness: 0 }),
    (e.seenIngredients ?? []).includes(n) ||
      (e.seenIngredients = [...(e.seenIngredients ?? []), n]),
    !0
  );
}

function localizeGender(e, n) {
  return e
    .replaceAll("小伙子/姑娘", n === "male" ? "小伙子" : "姑娘")
    .replaceAll("姑娘/小伙子", n === "male" ? "小伙子" : "姑娘")
    .replaceAll("姐姐/哥哥", n === "male" ? "哥哥" : "姐姐");
}

function applyRewards(e, n, s) {
  var l, c;
  const a = [];
  if (s.coins)
    if (s.coins > 0)
      ((e.coins += s.coins), (e.stats.earned += s.coins), a.push(`金币 +${s.coins}`));
    else {
      const u = Math.min(e.coins, -s.coins);
      ((e.coins -= u), (e.stats.spent += u), a.push(`金币 -${u}`));
    }
  if (
    (s.mood &&
      ((e.mood = Math.min(MAX_MOOD, Math.max(0, (e.mood ?? 100) + s.mood))),
      a.push(`心情 ${s.mood >= 0 ? "+" : ""}${s.mood}`)),
    s.energy &&
      ((e.energy = Math.min(100, Math.max(0, e.energy + s.energy))),
      a.push(`精力 ${s.energy >= 0 ? "+" : ""}${s.energy}`)),
    s.health &&
      ((e.health = Math.min(MAX_HEALTH, Math.max(0, e.health + s.health))), a.push(`健康 +${s.health}`)),
    s.satiety &&
      ((e.satiety = Math.min(MAX_SATIETY, Math.max(0, (e.satiety ?? 70) + s.satiety))),
      a.push(`饱食度 ${s.satiety >= 0 ? "+" : ""}${s.satiety}`)),
    s.ingredient)
  ) {
    const u = 1 + Math.floor(Math.random() * 3);
    addIngredient(e, s.ingredient, u) &&
      a.push(`${((l = INGREDIENT_MAP[s.ingredient]) == null ? void 0 : l.name) ?? "食材"} ×${u}`);
  }
  if (s.affection && s.affection > 0) {
    const f = (Array.isArray(e.metNpcs) ? e.metNpcs : []).filter((g) => !!NPC_RUNTIME_DATA[g]);
    if (f.length > 0) {
      const g = f[Math.floor(Math.random() * f.length)];
      ((e.affection[g] = changeAffection(e, g, s.affection)),
        a.push(`${((c = NPC_RUNTIME_DATA[g]) == null ? void 0 : c.name) ?? "伙伴"}好感 +${s.affection}`));
    }
  }
  (s.explores && (e.explores = (e.explores ?? 0) + s.explores),
    s.cookSkillBonus &&
      ((e.cookSkill = Math.min(100, (e.cookSkill ?? 0) + s.cookSkillBonus)),
      a.push(`烹饪熟练 +${s.cookSkillBonus}`)),
    s.found && a.push(s.found));
  const o = a.length > 0 ? `（${a.join("，")}）` : "";
  return `${localizeGender(n, e.gender ?? "female")}${o}`;
}

function getActiveFestival(e) {
  const n = dayToDate(e),
    s = getLunarDate(e);
  for (const a of FESTIVALS)
    if (a.lunar) {
      if (s.month === a.month && s.day === a.day) return a;
    } else if (n.month === a.month && n.day === a.day) return a;
  return null;
}

function getFestivalByDay(e) {
  const n = getActiveFestival(e);
  return n ? (FESTIVAL_GAME_MAP[n.id] ?? null) : null;
}

function doFestivalActivity(e, n) {
  const s = getFestivalByDay(e.day),
    a = s == null ? void 0 : s.activities.find((x) => x.id === n);
  if (!s || !a) return { state: e, ok: !1, message: "今天的节日会场没有这项活动" };
  if (e.energy < a.energy) return { state: e, ok: !1, message: "精力不足，先休息一下吧" };
  const o = checkTimeBlocked(e, a.minutes / 60);
  if (o) return { state: e, ok: !1, message: o };
  const l = deepClone(e);
  ((l.energy -= a.energy),
    advanceHours(l, a.minutes),
    consumeSatiety(l, a.minutes / 60),
    (l.mood = Math.min(MAX_MOOD, (l.mood ?? 100) + a.mood)),
    (l.health = Math.min(MAX_HEALTH, (l.health ?? 100) + a.health)));
  const c = a.health > 0 ? `，健康 +${a.health}` : "",
    u = FESTIVAL_SOUVENIR_MAP[s.festivalId],
    f = Array.isArray(e.festivalSouvenirs) ? e.festivalSouvenirs : [];
  let g = `${a.line}（${s.name} · 心情 +${a.mood}${c}）`;
  return (
    u &&
      !f.includes(s.festivalId) &&
      ((l.festivalSouvenirs = [...f, s.festivalId]),
      (g += `，还获得了节日纪念品「${u.emoji} ${u.name}」，可以摆上三楼的收藏架`)),
    { state: l, ok: !0, message: g }
  );
}

function getFestivalVisitsBonus(e) {
  var n;
  return ((n = getActiveFestival(e)) == null ? void 0 : n.visitsBonus) ?? 0;
}

function getFestivalSellMultiplier(e) {
  var n;
  return ((n = getActiveFestival(e)) == null ? void 0 : n.sellMult) ?? 0;
}

function isNpcBirthday(e, n) {
  const s = NPC_RUNTIME_DATA[n],
    a = s == null ? void 0 : s.birthday;
  if (!a) return !1;
  const o = dayToDate(e.day);
  return o.month === a.month && o.day === a.day;
}

function getBirthdayNpcs(e) {
  const n = [],
    s = dayToDate(e.day),
    a = Array.isArray(e.metNpcs) ? e.metNpcs : [];
  for (const o of Object.values(NPC_RUNTIME_DATA)) {
    const l = o.birthday;
    l &&
      s.month === l.month &&
      s.day === l.day &&
      a.includes(o.id) &&
      n.push({ id: o.id, name: o.name, emoji: o.emoji });
  }
  return n;
}

function giveBirthdayGift(e, n) {
  const s = NPC_RUNTIME_DATA[n];
  if (!s || !isNpcBirthday(e, n)) return { state: e, text: null };
  const a = Array.isArray(e.birthdayCelebrated) ? e.birthdayCelebrated : [];
  if (a.includes(n)) return { state: e, text: null };
  const o = { ...e, birthdayCelebrated: [...a, n] };
  return (
    (o.affection[n] = changeAffection(o, n, 6)),
    (o.mood = Math.min(MAX_MOOD, (o.mood ?? 100) + 5)),
    {
      state: o,
      text: `🎂 今天是${s.name}的生日！${s.name}眼睛一亮：「你怎么知道今天是我生日？……谢谢你记得！」（好感 +6，心情 +5）`,
    }
  );
}

function birthdayAffectionBonus(e, n) {
  return isNpcBirthday(e, n) ? 8 : 0;
}

function getAvailableEvents(e, n) {
  const s = Array.isArray(e.todayEvents) ? e.todayEvents : [],
    a = EVENTS_ALL.filter((g) => g.loc === n && !s.includes(g.id));
  if (a.length === 0 || Math.random() >= 0.3) return { state: e, text: null };
  const o = a.reduce((g, x) => g + (x.weight ?? 1), 0);
  let l = Math.random() * o,
    c = a[0];
  for (const g of a)
    if (((l -= g.weight ?? 1), l <= 0)) {
      c = g;
      break;
    }
  const u = { ...e, todayEvents: [...s, c.id] },
    f = applyRewards(u, c.text, c);
  return { state: u, text: `✨ 遇见小事件：${f}` };
}

function randomEncounter(e) {
  if (Math.random() >= 0.3) return { state: e, text: null };
  const n = RANDOM_EVENTS.reduce((u, f) => u + (f.weight ?? 1), 0);
  let s = Math.random() * n,
    a = RANDOM_EVENTS[0];
  for (const u of RANDOM_EVENTS)
    if (((s -= u.weight ?? 1), s <= 0)) {
      a = u;
      break;
    }
  const o = { ...e },
    l = [];
  if (a.coinsBonus)
    if (a.coinsBonus > 0)
      ((o.cashRegister = (o.cashRegister ?? 0) + a.coinsBonus),
        (o.stats.earned += a.coinsBonus),
        l.push(`收银台 +¥${a.coinsBonus}`));
    else {
      const u = Math.min(o.coins, -a.coinsBonus);
      ((o.coins -= u), (o.stats.spent += u), l.push(`损失 ¥${u}`));
    }
  if (
    (a.mood &&
      ((o.mood = Math.min(MAX_MOOD, Math.max(0, (o.mood ?? 100) + a.mood))),
      l.push(`心情 ${a.mood >= 0 ? "+" : ""}${a.mood}`)),
    a.visitsBonus &&
      ((o.visits = Math.max(0, o.visits + a.visitsBonus)),
      l.push(`客流 ${a.visitsBonus >= 0 ? "+" : ""}${a.visitsBonus}`)),
    a.productLoss && a.productLoss > 0)
  ) {
    const u = a.productLoss,
      f = o.products.filter((g) => g.qty > 0);
    for (let g = 0; g < u && f.length > 0; g += 1) {
      const x = f[Math.floor(Math.random() * f.length)];
      ((x.qty = (x.qty ?? 1) - 1),
        x.qty <= 0 &&
          ((o.products = o.products.filter((m) => m.pid !== x.pid)),
          (o.shelves = o.shelves.filter((m) => m.pid !== x.pid)),
          f.splice(f.indexOf(x), 1)));
    }
    l.push("损失点心");
  }
  (a.cookSkill &&
    ((o.cookSkill = Math.min(100, (o.cookSkill ?? 0) + a.cookSkill)),
    l.push(`烹饪熟练 +${a.cookSkill}`)),
    a.negotiation &&
      ((o.negotiation = Math.min(100, (o.negotiation ?? 0) + a.negotiation)),
      l.push(`交涉 +${a.negotiation}`)),
    a.sellMult && ((o.visits = Math.max(0, o.visits + 1)), l.push("剩余客流 +1")));
  const c = l.length > 0 ? `（${l.join("，")}）` : "";
  return { state: o, text: `🎊 店里的小插曲：${localizeGender(a.text, o.gender ?? "female")}${c}` };
}

function hireEmployee(e, n) {
  const s = EMPLOYEE_MAP[n];
  if (!s) return { state: e, ok: !1, message: "员工不存在" };
  if (e.employees.includes(n)) return { state: e, ok: !1, message: "已经雇佣了这位员工" };
  if (e.coins < s.hireCost) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  ((a.coins -= s.hireCost), (a.stats.spent += s.hireCost), a.employees.push(n));
  const o = !(a.metNpcs ?? []).includes(n);
  return (
    o && (a.metNpcs = [...(a.metNpcs ?? []), n]),
    {
      state: a,
      ok: !0,
      message: `「${s.name}」加入了你的店铺，离店时也能替你卖货了！`,
      firstMeet: o,
    }
  );
}

function placeOnShelf(e, n, s) {
  var c;
  const a = e.products.find((u) => u.pid === n);
  if (!a) return { state: e, ok: !1, message: "商品不存在" };
  if (a.quality === "fail") return { state: e, ok: !1, message: "失败品不能上架" };
  if ((((c = RECIPE_RUNTIME_DATA[a.recipeId]) == null ? void 0 : c.system) ?? "bakery") === "cuisine")
    return {
      state: e,
      ok: !1,
      message: "家常料理不能上架蛋糕店，点心才行（料理留着自己吃或送人吧）",
    };
  if (e.shelves.some((u) => u.pid === n)) return { state: e, ok: !1, message: "已上架" };
  const o = shelfCapacity(e);
  if (e.shelves.length >= o)
    return { state: e, ok: !1, message: `货架已满（${o} 格），提升店铺等级可扩充容量` };
  const l = deepClone(e);
  return (l.shelves.push({ pid: n, mult: s }), { state: l, ok: !0, message: "已上架货架" });
}

function removeFromShelf(e, n) {
  const s = deepClone(e);
  return ((s.shelves = s.shelves.filter((a) => a.pid !== n)), s);
}

function setShelfMultiplier(e, n, s) {
  const a = deepClone(e);
  return ((a.shelves = a.shelves.map((o) => (o.pid === n ? { ...o, mult: s } : o))), a);
}

function getRecipeCookware(e) {
  var n;
  return ((n = RECIPE_RUNTIME_DATA[e]) == null ? void 0 : n.cookware) ?? "cw_oven";
}

function rollBakeQuality(e, n, s, a, o, l) {
  const c = RECIPE_RUNTIME_DATA[e],
    u = Math.min(3, Math.floor(Math.max(0, o) / 33)),
    f = Math.min(5, Math.floor(s / 20)) + u,
    g = ((a - 50) / 100) * 0.2;
  let x = (0.1 + f * 0.02) * (1 + g),
    m = 0.3 + f * 0.03,
    p = (0.15 - f * 0.01) * (1 - g);
  (c != null && c.cookwarePerfect && !l && (x = 0),
    n === 1 && ((x *= 0.6), (m *= 0.9), (p += 0.05)),
    n >= 2 && ((x = 0), (m *= 0.6), (p += 0.15)));
  const y = Math.random();
  return y < p ? "fail" : y < p + m ? "good" : y < p + m + x ? "perfect" : "normal";
}

function getQualityTier(e) {
  return e.perfect > 0 ? "perfect" : e.good > 0 ? "good" : e.normal > 0 ? "normal" : "fail";
}

function validateBake(e, n) {
  const s = RECIPE_RUNTIME_DATA[n];
  if (!s) return { ok: !1, reason: "配方不存在" };
  if (!(n in e.recipes)) return { ok: !1, reason: "尚未研发此配方" };
  const a = s.cookware ?? "cw_oven";
  if (!(e.cookwares ?? []).includes(a)) {
    const o = COOKWARE_MAP[a];
    return {
      ok: !1,
      reason: `需要厨具「${(o == null ? void 0 : o.name) ?? "对应厨具"}」才能制作（综合超市购买）`,
    };
  }
  if (e.energy < s.bakeCost) return { ok: !1, reason: "精力不足" };
  for (const [o, l] of Object.entries(s.ings)) {
    const c = e.ingredients[o];
    if (!c || c.qty < l) return { ok: !1, reason: "食材不足" };
    if (c.freshness === 3) return { ok: !1, reason: "食材已腐烂，无法使用" };
  }
  return { ok: !0 };
}

function bakeRecipe(e, n) {
  var S, C;
  const s = validateBake(e, n);
  if (!s.ok) return { state: e, ok: !1, message: s.reason ?? "无法烘焙" };
  const a = RECIPE_RUNTIME_DATA[n],
    o = a.size === "large" ? TIME_COST.bakeLarge : a.size === "medium" ? TIME_COST.bakeMedium : TIME_COST.bakeSmall,
    l = checkTimeBlocked(e, o / 60);
  if (l) return { state: e, ok: !1, message: l };
  const c = getRecipeCookware(n),
    u = deepClone(e);
  advanceHours(u, o);
  const f = consumeSatiety(u, o / 60);
  let g = 0;
  for (const [V, E] of Object.entries(a.ings)) {
    const F = u.ingredients[V];
    F && ((g = Math.max(g, F.freshness)), (F.qty -= E), F.qty <= 0 && delete u.ingredients[V]);
  }
  ((u.energy -= a.bakeCost), decayMood(u, a.bakeCost));
  const x = BAKE_SIZE_OPTIONS[a.size],
    m = x ? x.yield : 1,
    p = u.recipes[n] ?? 0,
    y = ((S = u.cookwareSkill) == null ? void 0 : S[c]) ?? 0,
    j = !a.cookwarePerfect || (u.cookwares ?? []).includes(a.cookwarePerfect),
    v = { perfect: 0, good: 0, normal: 0, fail: 0 };
  for (let V = 0; V < m; V += 1) {
    const E = rollBakeQuality(n, g, p, u.mood, y, j);
    ((v[E] += 1),
      u.products.push({ pid: makeId(n), recipeId: n, quality: E, remaining: a.shelfDays, qty: 1 }));
  }
  ((u.recipes[n] = p + 10),
    (u.cookwareSkill = {
      ...(u.cookwareSkill ?? {}),
      [c]: Math.min(100, (((C = u.cookwareSkill) == null ? void 0 : C[c]) ?? 0) + 2),
    }),
    (u.stats.baked += m),
    (u.stats.perfects += v.perfect),
    (u.home.materialKnowledge = Math.min(100, u.home.materialKnowledge + 1)),
    (u.cookSkill = Math.min(100, u.cookSkill + 1)),
    (u.hygiene = Math.max(0, (u.hygiene ?? 100) - 6)),
    (u.bakeSkill = Math.min(100, (u.bakeSkill ?? 0) + 1)));
  const w = stackProducts(u.products, u.shelves);
  ((u.products = w.products), (u.shelves = w.shelves));
  const N = Object.keys(v)
    .filter((V) => v[V] > 0)
    .map((V) => `${QUALITY_META[V].label} ${v[V]}`)
    .join(" · ");
  return {
    state: u,
    ok: !0,
    message: `一炉出炉 ${m} 个！${N}${f ? "（饿着肚子干活，好难受）" : ""}`,
    quality: getQualityTier(v),
  };
}

function washUp(e) {
  if (e.combedToday) return { state: e, ok: !1, message: "今天已经梳洗过啦" };
  if (e.energy < 2) return { state: e, ok: !1, message: "精力不足，先休息一下吧" };
  const n = deepClone(e);
  return (
    (n.energy -= 2),
    (n.hygiene = Math.min(100, (n.hygiene ?? 100) + 8)),
    (n.combedToday = !0),
    { state: n, ok: !0, message: "梳好头发、用过卫生间，清爽出门！个人卫生 +8" }
  );
}

function takeNap(e) {
  if (e.home.sleptToday >= 2) return { state: e, ok: !1, message: "今天已经睡得够多啦" };
  const n = checkTimeBlocked(e, TIME_COST.sleep / 60);
  if (n) return { state: e, ok: !1, message: n };
  const s = deepClone(e);
  ((s.home.sleptToday += 1), advanceHours(s, TIME_COST.sleep), consumeSatiety(s, TIME_COST.sleep / 60));
  const a = Math.min(45, MAX_ENERGY - s.energy);
  s.energy = Math.min(MAX_ENERGY, s.energy + 45);
  const o = (s.shopPlacements ?? []).some((f) => f.slice(0, f.lastIndexOf("_")) === "f_ac"),
    l = Math.min(20, Math.floor(calcDecorScore(s) / 8)),
    c = Math.min(MAX_MOOD - s.mood, 15 + l + (o ? 2 : 0));
  s.mood = Math.min(MAX_MOOD, s.mood + c);
  const u = c > 0 ? `，心情 +${c}` : "";
  return { state: s, ok: !0, message: `在家舒舒服服睡了一觉，精力 +${a}${u}` };
}

function getBookProgress(e, n) {
  var a;
  const s = BOOK_MAP[n];
  return s
    ? s.repeatable
      ? Math.min(100, Math.max(0, Math.floor(((a = e.bookProgress) == null ? void 0 : a[n]) ?? 0)))
      : e.readBooks.includes(n)
        ? 100
        : 0
    : 0;
}

function readBook(e, n) {
  var x;
  const s = BOOK_MAP[n];
  if (!s) return { state: e, ok: !1, message: "书籍不存在" };
  const a = deepClone(e);
  if (!(a.home.ownedBooks ?? []).includes(n))
    return {
      state: e,
      ok: !1,
      message: "你还没有这本书，去商店街的书店购买吧（或到河边图书馆借阅）",
    };
  const l = a.home.readBooks.includes(n);
  if (l && !s.repeatable) return { state: e, ok: !1, message: "这本书已经读完啦" };
  if (a.energy < s.energy) return { state: e, ok: !1, message: "精力不足，读不动了" };
  const c = checkTimeBlocked(e, TIME_COST.read / 60);
  if (c) return { state: e, ok: !1, message: c };
  ((a.hour += TIME_COST.read / 60), (a.energy -= s.energy), decayMood(a, s.energy), consumeSatiety(a, TIME_COST.read / 60));
  const u = { ...(a.home.bookProgress ?? {}) };
  (s.repeatable
    ? (l || a.home.readBooks.push(n), (u[n] = Math.min(100, (u[n] ?? 0) + 25)))
    : l || (a.home.readBooks.push(n), (u[n] = 100)),
    (a.home.bookProgress = u),
    (a.home.materialKnowledge = Math.min(100, a.home.materialKnowledge + s.knowledgeGain)));
  const f = [];
  for (const m of s.recipes ?? [])
    m in a.recipes || ((a.recipes[m] = 0), f.push(((x = RECIPE_RUNTIME_DATA[m]) == null ? void 0 : x.name) ?? m));
  const g =
    f.length > 0
      ? `读完《${s.name}》，解锁了 ${f.join("、")}！`
      : `读完《${s.name}》，材料理解度 +${s.knowledgeGain}`;
  return { state: a, ok: !0, message: g };
}

function buyBook(e, n) {
  const s = BOOK_MAP[n];
  if (!s) return { state: e, ok: !1, message: "书籍不存在" };
  if ((e.home.ownedBooks ?? []).includes(n))
    return { state: e, ok: !1, message: "家里已经有这本书啦" };
  if (e.coins < s.price) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  return (
    (a.coins -= s.price),
    (a.stats.spent += s.price),
    (a.home.ownedBooks = [...(a.home.ownedBooks ?? []), n]),
    { state: a, ok: !0, message: `买到了《${s.name}》，已经摆在家的书架上了！` }
  );
}

function buyCookware(e, n) {
  const s = COOKWARE_MAP[n];
  if (!s || s.price === void 0) return { state: e, ok: !1, message: "厨具不存在" };
  if ((e.cookwares ?? []).includes(n)) return { state: e, ok: !1, message: "已经拥有这件厨具" };
  if (e.coins < s.price) return { state: e, ok: !1, message: "金币不足" };
  const a = deepClone(e);
  return (
    (a.coins -= s.price),
    (a.stats.spent += s.price),
    (a.cookwares = [...(a.cookwares ?? []), n]),
    { state: a, ok: !0, message: `购入「${s.name}」，现在可以制作对应料理了！` }
  );
}

function borrowBook(e, n) {
  var u;
  const s = BOOK_MAP[n];
  if (!s) return { state: e, ok: !1, message: "书籍不存在" };
  if (!s.library)
    return { state: e, ok: !1, message: `《${s.name}》图书馆里没有，去商店街的书店购买吧` };
  if (e.hour < LIBRARY_OPEN_HOUR) return { state: e, ok: !1, message: `图书馆 ${LIBRARY_OPEN_HOUR}:00 才开门，现在还没开` };
  if (e.hour >= LIBRARY_CLOSE_HOUR) return { state: e, ok: !1, message: `图书馆已经闭馆了（${LIBRARY_CLOSE_HOUR}:00 关门）` };
  if (e.hour + 1 > LIBRARY_CLOSE_HOUR)
    return { state: e, ok: !1, message: `快闭馆了，来不及看完一本（图书馆 ${LIBRARY_CLOSE_HOUR}:00 关门）` };
  if (e.energy < s.energy) return { state: e, ok: !1, message: "精力不足，读不动了" };
  const a = deepClone(e);
  (advanceHours(a, TIME_COST.libraryRead),
    (a.energy -= s.energy),
    decayMood(a, s.energy),
    consumeSatiety(a, TIME_COST.libraryRead / 60),
    (a.home.materialKnowledge = Math.min(100, a.home.materialKnowledge + s.knowledgeGain)));
  const o = [];
  for (const f of s.recipes ?? [])
    f in a.recipes || ((a.recipes[f] = 0), o.push(((u = RECIPE_RUNTIME_DATA[f]) == null ? void 0 : u.name) ?? f));
  const l =
      o.length > 0
        ? `在图书馆借阅《${s.name}》，解锁了 ${o.join("、")}！（借的书不能带走）`
        : `在图书馆借阅《${s.name}》，材料理解度 +${s.knowledgeGain}！（借的书不能带走）`,
    c = getAvailableEvents(a, "library");
  return { state: c.state, ok: !0, message: `${l}${c.text ? ` ${c.text}` : ""}` };
}

function playHomeGame(e, n) {
  if (e.home.playedToday >= 3) return { state: e, ok: !1, message: "今天玩够啦，明天再来" };
  if (e.energy < 10) return { state: e, ok: !1, message: "精力不足，先休息一下吧" };
  const s = checkTimeBlocked(e, TIME_COST.playGame / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  if (
    ((a.home.playedToday += 1),
    advanceHours(a, TIME_COST.playGame),
    consumeSatiety(a, TIME_COST.playGame / 60),
    (a.energy -= 10),
    decayMood(a, 10),
    n)
  ) {
    const o = 40 + Math.floor(Math.random() * 11);
    return ((a.coins += o), { state: a, ok: !0, message: `游戏通关！赢到了 ${o} 金币`, reward: o });
  }
  return { state: a, ok: !0, message: "游戏没能通关，不过放松了一下", reward: 0 };
}

function bestToolBonus(e) {
  let n = 0;
  for (const s of e.home.tools) {
    const a = CRAFT_TOOL_MAP[s];
    a && a.bonus > n && (n = a.bonus);
  }
  return n;
}

function bestToolId(e) {
  let n = e.home.tools[0] ?? "basic",
    s = -1;
  for (const a of e.home.tools) {
    const o = CRAFT_TOOL_MAP[a];
    o && o.bonus > s && ((s = o.bonus), (n = a));
  }
  return n;
}

function toolSkillMapOf(e) {
  const n = e.home.toolSkillMap ?? {};
  return Object.keys(n).length > 0
    ? Math.min(100, Math.max(0, Math.floor(n[bestToolId(e)] ?? 0)))
    : Math.min(100, Math.max(0, Math.floor(e.home.toolSkill ?? 0)));
}
