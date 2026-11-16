function getFurnitureLevel(e) {
  return Math.min(10, Math.floor(e.home.furnitureExp / 5));
}

function calcCraftChance(e, n) {
  const s = FURNITURE_MAP[n];
  if (!s) return 0;
  const a =
    0.3 +
    getFurnitureLevel(e) * 0.05 +
    (toolSkillMapOf(e) / 100) * 0.2 +
    (e.home.materialKnowledge / 100) * 0.2 +
    bestToolBonus(e) / 100 -
    (s.level - 1) * 0.08;
  return Math.max(0.1, Math.min(0.95, a * __tmPsychSR(e)));
}

function checkCraftMaterials(e, n) {
  var s;
  if (!n.materials) return "这件家具不需要手工制作";
  for (const [a, o] of Object.entries(n.materials)) {
    const l = e.home.materials[a] ?? 0;
    if (l < o) return `材料不足：还缺 ${((s = MATERIAL_MAP[a]) == null ? void 0 : s.name) ?? a} x${o - l}`;
  }
  for (const [a, o] of Object.entries(n.materials))
    ((e.home.materials[a] -= o), e.home.materials[a] <= 0 && delete e.home.materials[a]);
  return null;
}

function craftFurniture(e, n, s, a) {
  const o = FURNITURE_MAP[n];
  if (!o) return { state: e, ok: !1, message: "家具不存在" };
  if (!o.materials) return { state: e, ok: !1, message: "这件家具不需要手工制作" };
  if (!WOOD_MAP[s] || !COLOR_MAP[a]) return { state: e, ok: !1, message: "材质或颜料选择无效" };
  if (e.energy < 10) return { state: e, ok: !1, message: "精力不足" };
  const l = checkTimeBlocked(e, TIME_COST.craftFurniture / 60);
  if (l) return { state: e, ok: !1, message: l };
  const c = deepClone(e),
    u = checkCraftMaterials(c, o);
  if (u) return { state: e, ok: !1, message: u };
  ((c.energy -= 10), decayMood(c, 10), consumeSatiety(c, TIME_COST.craftFurniture / 60));
  const f = calcCraftChance(c, n),
    g = Math.random() < f;
  ((c.home.furnitureExp += g ? 3 : 1),
    (c.home.toolSkill = Math.min(100, c.home.toolSkill + (g ? 4 : 2))),
    ensureToolSkillMap(c, g ? 4 : 2),
    (c.home.materialKnowledge = Math.min(100, c.home.materialKnowledge + (g ? 2 : 1))),
    advanceHours(c, TIME_COST.craftFurniture));
  const x = WOOD_MAP[s],
    m = COLOR_MAP[a],
    p = `${x.name}·${m.name}的${o.name}`;
  return g
    ? (c.home.furniture.push({ fid: n, material: s, color: a, desc: p, crafted: !0, floor: floorForFurniture(n) }),
      { state: c, ok: !0, message: `制作成功！${p} 摆进家里了`, success: !0, desc: p })
    : { state: c, ok: !0, message: "制作失败了……材料白费了，练练手艺再来吧", success: !1 };
}

const ACHIEVEMENTS_TOWN = [
    {
      id: "explore_5",
      category: "town",
      name: "迈开脚步",
      emoji: "🏃",
      desc: "锻炼身体 5 次",
      check: (e) => getStats(e).exercises >= 5,
      progress: (e) => ({ current: Math.min(getStats(e).exercises, 5), target: 5 }),
    },
    {
      id: "explore_20",
      category: "town",
      name: "健康达人",
      emoji: "💪",
      desc: "锻炼身体 20 次",
      check: (e) => getStats(e).exercises >= 20,
      progress: (e) => ({ current: Math.min(getStats(e).exercises, 20), target: 20 }),
    },
    {
      id: "explore_50",
      category: "town",
      name: "运动健将",
      emoji: "🥇",
      desc: "锻炼身体 50 次",
      check: (e) => getStats(e).exercises >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).exercises, 50), target: 50 }),
    },
    {
      id: "sport_50",
      category: "town",
      name: "身强体壮",
      emoji: "🏋️",
      desc: "运动技能达到 50",
      check: (e) => e.sportSkill >= 50,
      progress: (e) => ({ current: Math.min(e.sportSkill, 50), target: 50 }),
    },
    {
      id: "fish_1",
      category: "town",
      name: "河边初钓",
      emoji: "🎣",
      desc: "完成第一次钓鱼",
      check: (e) => getStats(e).fishes >= 1,
      progress: (e) => ({ current: Math.min(getStats(e).fishes, 1), target: 1 }),
    },
    {
      id: "fish_10",
      category: "town",
      name: "钓鱼高手",
      emoji: "🐟",
      desc: "累计钓鱼 10 次",
      check: (e) => getStats(e).fishes >= 10,
      progress: (e) => ({ current: Math.min(getStats(e).fishes, 10), target: 10 }),
    },
    {
      id: "loach_5",
      category: "town",
      name: "摸泥鳅小能手",
      emoji: "🪱",
      desc: "累计抓到 5 次泥鳅",
      check: (e) => getStats(e).loaches >= 5,
      progress: (e) => ({ current: Math.min(getStats(e).loaches, 5), target: 5 }),
    },
    {
      id: "day_10",
      category: "town",
      name: "久居小镇",
      emoji: "🏘️",
      desc: "经营满 10 天",
      check: (e) => e.day >= 10,
      progress: (e) => ({ current: Math.min(e.day, 10), target: 10 }),
    },
    {
      id: "day_120",
      category: "town",
      name: "四季轮回",
      emoji: "🍃",
      desc: "经营满 120 天，走过四季",
      check: (e) => e.day >= 120,
      progress: (e) => ({ current: Math.min(e.day, 120), target: 120 }),
    },
    {
      id: "day_30",
      category: "town",
      name: "月满小镇",
      emoji: "🌙",
      desc: "经营满 30 天",
      check: (e) => e.day >= 30,
      progress: (e) => ({ current: Math.min(e.day, 30), target: 30 }),
    },
    {
      id: "day_365",
      category: "town",
      name: "周年庆典",
      emoji: "🎂",
      desc: "经营满 365 天",
      check: (e) => e.day >= 365,
      progress: (e) => ({ current: Math.min(e.day, 365), target: 365 }),
    },
    {
      id: "bigfish_1",
      category: "town",
      name: "大鱼上钩",
      emoji: "🐋",
      desc: "钓到第一条大物（≥50cm）",
      check: (e) => getStats(e).bigFish >= 1,
      progress: (e) => ({ current: Math.min(getStats(e).bigFish, 1), target: 1 }),
    },
    {
      id: "bigfish_5",
      category: "town",
      name: "钓鱼传奇",
      emoji: "🏅",
      desc: "累计钓到 5 条大物",
      check: (e) => getStats(e).bigFish >= 5,
      progress: (e) => ({ current: Math.min(getStats(e).bigFish, 5), target: 5 }),
    },
    {
      id: "met_10",
      category: "town",
      name: "广结善缘",
      emoji: "🧑‍🤝‍🧑",
      desc: "认识 10 位伙伴",
      check: (e) => (e.metNpcs ?? []).length >= 10,
      progress: (e) => ({ current: Math.min((e.metNpcs ?? []).length, 10), target: 10 }),
    },
    {
      id: "met_25",
      category: "town",
      name: "小镇名人",
      emoji: "⭐",
      desc: "认识 25 位伙伴",
      check: (e) => (e.metNpcs ?? []).length >= 25,
      progress: (e) => ({ current: Math.min((e.metNpcs ?? []).length, 25), target: 25 }),
    },
    {
      id: "shelter_50",
      category: "town",
      name: "收容所之友",
      emoji: "🐾",
      desc: "收容所友好度达到 50",
      check: (e) => e.shelterFriendliness >= 50,
      progress: (e) => ({ current: Math.min(e.shelterFriendliness, 50), target: 50 }),
    },
    {
      id: "shelter_150",
      category: "town",
      name: "暖心天使",
      emoji: "🕊️",
      desc: "收容所友好度达到 150",
      check: (e) => e.shelterFriendliness >= 150,
      progress: (e) => ({ current: Math.min(e.shelterFriendliness, 150), target: 150 }),
    },
    {
      id: "bank_1000",
      category: "town",
      name: "存钱罐",
      emoji: "🏦",
      desc: "银行存款达到 1000",
      check: (e) => e.bankSavings >= 1e3,
      progress: (e) => ({ current: Math.min(e.bankSavings, 1e3), target: 1e3 }),
    },
    {
      id: "fest_3",
      category: "town",
      name: "节庆收藏家",
      emoji: "🎐",
      desc: "获得 3 件节日纪念品",
      check: (e) => (e.festivalSouvenirs ?? []).length >= 3,
      progress: (e) => ({ current: Math.min((e.festivalSouvenirs ?? []).length, 3), target: 3 }),
    },
    {
      id: "star_10",
      category: "town",
      name: "星空守望者",
      emoji: "🌌",
      desc: "点亮 10 颗星星",
      check: (e) => (e.stargazingSeen ?? []).length >= 10,
      progress: (e) => ({ current: Math.min((e.stargazingSeen ?? []).length, 10), target: 10 }),
    },
    {
      id: "sew_1",
      category: "town",
      name: "针线初体验",
      emoji: "🪡",
      desc: "亲手缝制第 1 件衣服",
      check: (e) => (e.sewnClothes ?? []).length >= 1,
      progress: (e) => ({ current: Math.min((e.sewnClothes ?? []).length, 1), target: 1 }),
    },
    {
      id: "sew_5",
      category: "town",
      name: "缝纫巧手",
      emoji: "🧵",
      desc: "亲手缝制 5 件衣服",
      check: (e) => (e.sewnClothes ?? []).length >= 5,
      progress: (e) => ({ current: Math.min((e.sewnClothes ?? []).length, 5), target: 5 }),
    },
    {
      id: "exercise_100",
      category: "town",
      name: "百炼成钢",
      emoji: "🏆",
      desc: "锻炼身体 100 次",
      check: (e) => getStats(e).exercises >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).exercises, 100), target: 100 }),
    },
    {
      id: "sport_100",
      category: "town",
      name: "运动满级",
      emoji: "💯",
      desc: "运动技能达到 100",
      check: (e) => e.sportSkill >= 100,
      progress: (e) => ({ current: Math.min(e.sportSkill, 100), target: 100 }),
    },
    {
      id: "fish_30",
      category: "town",
      name: "垂钓常客",
      emoji: "🎏",
      desc: "累计钓鱼 30 次",
      check: (e) => getStats(e).fishes >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).fishes, 30), target: 30 }),
    },
    {
      id: "fish_50",
      category: "town",
      name: "河边传说",
      emoji: "🐠",
      desc: "累计钓鱼 50 次",
      check: (e) => getStats(e).fishes >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).fishes, 50), target: 50 }),
    },
    {
      id: "loach_20",
      category: "town",
      name: "摸鱼大师",
      emoji: "🪱",
      desc: "累计抓到 20 次泥鳅",
      check: (e) => getStats(e).loaches >= 20,
      progress: (e) => ({ current: Math.min(getStats(e).loaches, 20), target: 20 }),
    },
    {
      id: "bigfish_10",
      category: "town",
      name: "大物猎手",
      emoji: "🐳",
      desc: "累计钓到 10 条大物",
      check: (e) => getStats(e).bigFish >= 10,
      progress: (e) => ({ current: Math.min(getStats(e).bigFish, 10), target: 10 }),
    },
    {
      id: "fishdex_10",
      category: "town",
      name: "图鉴入门",
      emoji: "🐡",
      desc: "鱼类图鉴收录 10 种",
      check: (e) => Object.keys(e.fishRecords ?? {}).length >= 10,
      progress: (e) => ({
        current: Math.min(Object.keys(e.fishRecords ?? {}).length, 10),
        target: 10,
      }),
    },
    {
      id: "fishdex_25",
      category: "town",
      name: "水产行家",
      emoji: "🐟",
      desc: "鱼类图鉴收录 25 种",
      check: (e) => Object.keys(e.fishRecords ?? {}).length >= 25,
      progress: (e) => ({
        current: Math.min(Object.keys(e.fishRecords ?? {}).length, 25),
        target: 25,
      }),
    },
    {
      id: "met_40",
      category: "town",
      name: "小镇社交王",
      emoji: "🏙️",
      desc: "认识 40 位伙伴",
      check: (e) => (e.metNpcs ?? []).length >= 40,
      progress: (e) => ({ current: Math.min((e.metNpcs ?? []).length, 40), target: 40 }),
    },
    {
      id: "shelter_200",
      category: "town",
      name: "毛孩子守护神",
      emoji: "🐕",
      desc: "收容所友好度达到 200",
      check: (e) => e.shelterFriendliness >= 200,
      progress: (e) => ({ current: Math.min(e.shelterFriendliness, 200), target: 200 }),
    },
    {
      id: "bank_5000",
      category: "town",
      name: "理财新星",
      emoji: "🏦",
      desc: "银行存款达到 5000",
      check: (e) => e.bankSavings >= 5e3,
      progress: (e) => ({ current: Math.min(e.bankSavings, 5e3), target: 5e3 }),
    },
    {
      id: "bank_20000",
      category: "town",
      name: "存款大户",
      emoji: "💰",
      desc: "银行存款达到 20000",
      check: (e) => e.bankSavings >= 2e4,
      progress: (e) => ({ current: Math.min(e.bankSavings, 2e4), target: 2e4 }),
    },
    {
      id: "fest_6",
      category: "town",
      name: "节日收藏家",
      emoji: "🎑",
      desc: "获得 6 件节日纪念品",
      check: (e) => (e.festivalSouvenirs ?? []).length >= 6,
      progress: (e) => ({ current: Math.min((e.festivalSouvenirs ?? []).length, 6), target: 6 }),
    },
    {
      id: "fest_10",
      category: "town",
      name: "节庆全勤王",
      emoji: "🏮",
      desc: "获得 10 件节日纪念品",
      check: (e) => (e.festivalSouvenirs ?? []).length >= 10,
      progress: (e) => ({ current: Math.min((e.festivalSouvenirs ?? []).length, 10), target: 10 }),
    },
    {
      id: "star_all",
      category: "town",
      name: "银河漫游者",
      emoji: "🌌",
      desc: "点亮全部 12 颗星星",
      check: (e) => (e.stargazingSeen ?? []).length >= 12,
      progress: (e) => ({ current: Math.min((e.stargazingSeen ?? []).length, 12), target: 12 }),
    },
    {
      id: "sew_10",
      category: "town",
      name: "裁缝铺老板",
      emoji: "🧵",
      desc: "亲手缝制 10 件衣服",
      check: (e) => (e.sewnClothes ?? []).length >= 10,
      progress: (e) => ({ current: Math.min((e.sewnClothes ?? []).length, 10), target: 10 }),
    },
    {
      id: "sewing_skill_50",
      category: "town",
      name: "缝纫学徒",
      emoji: "✂️",
      desc: "缝纫技能达到 50",
      check: (e) => e.sewingSkill >= 50,
      progress: (e) => ({ current: Math.min(e.sewingSkill, 50), target: 50 }),
    },
    {
      id: "sewing_skill_100",
      category: "town",
      name: "国手裁缝",
      emoji: "🧶",
      desc: "缝纫技能达到 100",
      check: (e) => e.sewingSkill >= 100,
      progress: (e) => ({ current: Math.min(e.sewingSkill, 100), target: 100 }),
    },
    {
      id: "tool_skill_100",
      category: "town",
      name: "工具大师",
      emoji: "🔧",
      desc: "工具熟练度达到 100",
      check: (e) => {
        var n;
        return (((n = e.home) == null ? void 0 : n.toolSkill) ?? 0) >= 100;
      },
      progress: (e) => {
        var n;
        return {
          current: Math.min(((n = e.home) == null ? void 0 : n.toolSkill) ?? 0, 100),
          target: 100,
        };
      },
    },
    {
      id: "material_100",
      category: "town",
      name: "材料通",
      emoji: "📚",
      desc: "材料理解度达到 100",
      check: (e) => {
        var n;
        return (((n = e.home) == null ? void 0 : n.materialKnowledge) ?? 0) >= 100;
      },
      progress: (e) => {
        var n;
        return {
          current: Math.min(((n = e.home) == null ? void 0 : n.materialKnowledge) ?? 0, 100),
          target: 100,
        };
      },
    },
    {
      id: "furniture_10",
      category: "town",
      name: "装修大师",
      emoji: "👑",
      desc: "家具等级升到 Lv.10",
      check: (e) => getFurnitureLevel(e) >= 10,
      progress: (e) => ({ current: Math.min(getFurnitureLevel(e), 10), target: 10 }),
    },
    {
      id: "craft_1",
      category: "town",
      name: "木工初体验",
      emoji: "🛋️",
      desc: "亲手制作第 1 件家具",
      check: (e) => {
        var n;
        return (
          (((n = e.home) == null ? void 0 : n.furniture) ?? []).filter((s) => s.crafted === !0)
            .length >= 1
        );
      },
      progress: (e) => {
        var n;
        return {
          current: Math.min(
            (((n = e.home) == null ? void 0 : n.furniture) ?? []).filter((s) => s.crafted === !0)
              .length,
            1,
          ),
          target: 1,
        };
      },
    },
    {
      id: "craft_10",
      category: "town",
      name: "匠人作坊",
      emoji: "🛏️",
      desc: "亲手制作 10 件家具",
      check: (e) => {
        var n;
        return (
          (((n = e.home) == null ? void 0 : n.furniture) ?? []).filter((s) => s.crafted === !0)
            .length >= 10
        );
      },
      progress: (e) => {
        var n;
        return {
          current: Math.min(
            (((n = e.home) == null ? void 0 : n.furniture) ?? []).filter((s) => s.crafted === !0)
              .length,
            10,
          ),
          target: 10,
        };
      },
    },
    {
      id: "books_5",
      category: "town",
      name: "书虫初长成",
      emoji: "📖",
      desc: "读完 5 本书",
      check: (e) => {
        var n;
        return (((n = e.home) == null ? void 0 : n.readBooks) ?? []).length >= 5;
      },
      progress: (e) => {
        var n;
        return {
          current: Math.min((((n = e.home) == null ? void 0 : n.readBooks) ?? []).length, 5),
          target: 5,
        };
      },
    },
    {
      id: "books_20",
      category: "town",
      name: "博览群书",
      emoji: "📚",
      desc: "读完 20 本书",
      check: (e) => {
        var n;
        return (((n = e.home) == null ? void 0 : n.readBooks) ?? []).length >= 20;
      },
      progress: (e) => {
        var n;
        return {
          current: Math.min((((n = e.home) == null ? void 0 : n.readBooks) ?? []).length, 20),
          target: 20,
        };
      },
    },
    {
      id: "flowers_10",
      category: "town",
      name: "花满阳台",
      emoji: "🌸",
      desc: "累计收获 10 束鲜花",
      check: (e) => (e.homeFlowers ?? 0) >= 10,
      progress: (e) => ({ current: Math.min(e.homeFlowers ?? 0, 10), target: 10 }),
    },
    {
      id: "bonsai_1",
      category: "town",
      name: "方寸山水",
      emoji: "🪴",
      desc: "收获第 1 盆盆景",
      check: (e) => (e.homeBonsai ?? 0) >= 1,
      progress: (e) => ({ current: Math.min(e.homeBonsai ?? 0, 1), target: 1 }),
    },
    {
      id: "aquarium_1",
      category: "town",
      name: "金鱼入缸",
      emoji: "🐠",
      desc: "在水族缸里养起第一条金鱼",
      check: (e) => e.aquariumFish === !0,
      progress: (e) => ({ current: e.aquariumFish === !0 ? 1 : 0, target: 1 }),
    },
    {
      id: "aquarium_decor",
      category: "town",
      name: "水底乐园",
      emoji: "🧸",
      desc: "水族缸布置 3 件装饰",
      check: (e) => (e.aquariumDecor ?? []).length >= 3,
      progress: (e) => ({ current: Math.min((e.aquariumDecor ?? []).length, 3), target: 3 }),
    },
    {
      id: "vehicles_3",
      category: "town",
      name: "出行自由",
      emoji: "🚗",
      desc: "集齐公交卡、小三轮与私家车",
      check: (e) => (e.vehicles ?? []).length >= 3,
      progress: (e) => ({ current: Math.min((e.vehicles ?? []).length, 3), target: 3 }),
    },
    {
      id: "health_100",
      category: "town",
      name: "元气满满",
      emoji: "💖",
      desc: "健康值达到 100",
      check: (e) => e.health >= 100,
      progress: (e) => ({ current: Math.min(e.health, 100), target: 100 }),
    },
  ],
  ACHIEVEMENTS_FATE = [
    {
      id: "aff_20",
      category: "fate",
      name: "初次相识",
      emoji: "🤝",
      desc: "与任一伙伴好感度达到 20",
      check: (e) => maxAffection(e) >= 20,
      progress: (e) => ({ current: Math.min(maxAffection(e), 20), target: 20 }),
    },
    {
      id: "aff_50",
      category: "fate",
      name: "好朋友",
      emoji: "💛",
      desc: "与任一伙伴好感度达到 50",
      check: (e) => maxAffection(e) >= 50,
      progress: (e) => ({ current: Math.min(maxAffection(e), 50), target: 50 }),
    },
    {
      id: "aff_80",
      category: "fate",
      name: "挚友",
      emoji: "💖",
      desc: "与任一伙伴好感度达到 80",
      check: (e) => maxAffection(e) >= 80,
      progress: (e) => ({ current: Math.min(maxAffection(e), 80), target: 80 }),
    },
    {
      id: "date_1",
      category: "fate",
      name: "甜蜜约会",
      emoji: "🌙",
      desc: "完成第 1 次约会",
      check: (e) => getStats(e).dated >= 1,
      progress: (e) => ({ current: Math.min(getStats(e).dated, 1), target: 1 }),
    },
    {
      id: "date_10",
      category: "fate",
      name: "情投意合",
      emoji: "💘",
      desc: "累计约会 10 次",
      check: (e) => getStats(e).dated >= 10,
      progress: (e) => ({ current: Math.min(getStats(e).dated, 10), target: 10 }),
    },
    {
      id: "gift_10",
      category: "fate",
      name: "送礼达人",
      emoji: "🎁",
      desc: "累计送礼 10 次",
      check: (e) => getStats(e).gifted >= 10,
      progress: (e) => ({ current: Math.min(getStats(e).gifted, 10), target: 10 }),
    },
    {
      id: "aff_100",
      category: "fate",
      name: "知己知彼",
      emoji: "💞",
      desc: "与任一伙伴好感度达到 100",
      check: (e) => maxAffection(e) >= 100,
      progress: (e) => ({ current: Math.min(maxAffection(e), 100), target: 100 }),
    },
    {
      id: "friend_3",
      category: "fate",
      name: "朋友圈",
      emoji: "👫",
      desc: "与 3 位伙伴好感度达到 50",
      check: (e) => Object.values(e.affection ?? {}).filter((n) => n >= 50).length >= 3,
      progress: (e) => ({
        current: Math.min(Object.values(e.affection ?? {}).filter((n) => n >= 50).length, 3),
        target: 3,
      }),
    },
    {
      id: "gift_50",
      category: "fate",
      name: "慷慨大方",
      emoji: "🎀",
      desc: "累计送礼 50 次",
      check: (e) => getStats(e).gifted >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).gifted, 50), target: 50 }),
    },
    {
      id: "date_30",
      category: "fate",
      name: "两情相悦",
      emoji: "💑",
      desc: "累计约会 30 次",
      check: (e) => getStats(e).dated >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).dated, 30), target: 30 }),
    },
    {
      id: "chat_100",
      category: "fate",
      name: "谈天说地",
      emoji: "💬",
      desc: "累计聊天 100 次",
      check: (e) => getStats(e).chats >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).chats, 100), target: 100 }),
    },
    {
      id: "chat_500",
      category: "fate",
      name: "话痨之王",
      emoji: "🗣️",
      desc: "累计聊天 500 次",
      check: (e) => getStats(e).chats >= 500,
      progress: (e) => ({ current: Math.min(getStats(e).chats, 500), target: 500 }),
    },
    {
      id: "aff_120",
      category: "fate",
      name: "亲密无间",
      emoji: "💗",
      desc: "与任一伙伴好感度达到 120",
      check: (e) => maxAffection(e) >= 120,
      progress: (e) => ({ current: Math.min(maxAffection(e), 120), target: 120 }),
    },
    {
      id: "aff_150",
      category: "fate",
      name: "此生不渝",
      emoji: "❤️",
      desc: "与任一伙伴好感度达到 150",
      check: (e) => maxAffection(e) >= 150,
      progress: (e) => ({ current: Math.min(maxAffection(e), 150), target: 150 }),
    },
    {
      id: "friend_5",
      category: "fate",
      name: "好友满堂",
      emoji: "👯",
      desc: "与 5 位伙伴好感度达到 50",
      check: (e) => Object.values(e.affection ?? {}).filter((n) => n >= 50).length >= 5,
      progress: (e) => ({
        current: Math.min(Object.values(e.affection ?? {}).filter((n) => n >= 50).length, 5),
        target: 5,
      }),
    },
    {
      id: "friend_80_3",
      category: "fate",
      name: "知心小圈",
      emoji: "💝",
      desc: "与 3 位伙伴好感度达到 80",
      check: (e) => Object.values(e.affection ?? {}).filter((n) => n >= 80).length >= 3,
      progress: (e) => ({
        current: Math.min(Object.values(e.affection ?? {}).filter((n) => n >= 80).length, 3),
        target: 3,
      }),
    },
    {
      id: "gift_100",
      category: "fate",
      name: "赠礼大师",
      emoji: "🎁",
      desc: "累计送礼 100 次",
      check: (e) => getStats(e).gifted >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).gifted, 100), target: 100 }),
    },
    {
      id: "chat_1000",
      category: "fate",
      name: "小镇社牛",
      emoji: "🗨️",
      desc: "累计聊天 1000 次",
      check: (e) => getStats(e).chats >= 1e3,
      progress: (e) => ({ current: Math.min(getStats(e).chats, 1e3), target: 1e3 }),
    },
    {
      id: "date_50",
      category: "fate",
      name: "白头之约",
      emoji: "💒",
      desc: "累计约会 50 次",
      check: (e) => getStats(e).dated >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).dated, 50), target: 50 }),
    },
  ],
  ACHIEVEMENTS_TOWN_FATE = [...ACHIEVEMENTS_TOWN, ...ACHIEVEMENTS_FATE],
  ALL_ACHIEVEMENTS = [...ACHIEVEMENTS_ALL, ...ACHIEVEMENTS_TOWN_FATE],
  MILESTONES = [
    {
      id: "m_open",
      name: "开业大吉",
      emoji: "🎊",
      desc: "顺利开张营业",
      check: (e) => e.day >= 1,
      progress: () => ({ current: 1, target: 1 }),
      rewards: [{ type: "coins", amount: 200 }],
    },
    {
      id: "m_bake",
      name: "熟练烘焙",
      emoji: "🥖",
      desc: "累计烘焙 30 次",
      check: (e) => getStats(e).baked >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 30), target: 30 }),
      rewards: [
        { type: "coins", amount: 300 },
        { type: "ingredient", ingId: "butter", amount: 5 },
      ],
    },
    {
      id: "m_earn",
      name: "财富积累",
      emoji: "💰",
      desc: "累计收入 3000 金币",
      check: (e) => getStats(e).earned >= 3e3,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 3e3), target: 3e3 }),
      rewards: [{ type: "coins", amount: 500 }],
    },
    {
      id: "m_recipe",
      name: "研发先锋",
      emoji: "🔬",
      desc: "研发 6 种配方",
      check: (e) => countRecipes(e) >= 6,
      progress: (e) => ({ current: Math.min(countRecipes(e), 6), target: 6 }),
      rewards: [
        { type: "coins", amount: 400 },
        { type: "ingredient", ingId: "chocolate", amount: 5 },
      ],
    },
    {
      id: "m_explore",
      name: "活力满满",
      emoji: "🏃",
      desc: "锻炼身体 30 次",
      check: (e) => getStats(e).exercises >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).exercises, 30), target: 30 }),
      rewards: [
        { type: "coins", amount: 300 },
        { type: "ingredient", ingId: "honey", amount: 3 },
      ],
    },
    {
      id: "m_date",
      name: "甜蜜时光",
      emoji: "💕",
      desc: "累计约会 5 次",
      check: (e) => getStats(e).dated >= 5,
      progress: (e) => ({ current: Math.min(getStats(e).dated, 5), target: 5 }),
      rewards: [
        { type: "coins", amount: 200 },
        { type: "ingredient", ingId: "cream", amount: 3 },
      ],
    },
    {
      id: "m_perfect",
      name: "完美大师",
      emoji: "✨",
      desc: "制作出 30 个完美品质点心",
      check: (e) => getStats(e).perfects >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).perfects, 30), target: 30 }),
      rewards: [
        { type: "coins", amount: 500 },
        { type: "ingredient", ingId: "strawberry", amount: 5 },
      ],
    },
    {
      id: "m_year",
      name: "四季之主",
      emoji: "🏅",
      desc: "经营满 120 天，走过完整四季",
      check: (e) => e.day >= 120,
      progress: (e) => ({ current: Math.min(e.day, 120), target: 120 }),
      rewards: [
        { type: "coins", amount: 1e3 },
        { type: "ingredient", ingId: "matcha", amount: 5 },
      ],
    },
    {
      id: "m_sold",
      name: "人气小店",
      emoji: "🍰",
      desc: "累计卖出 300 件点心",
      check: (e) => getStats(e).sold >= 300,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 300), target: 300 }),
      rewards: [
        { type: "coins", amount: 600 },
        { type: "ingredient", ingId: "cream", amount: 5 },
      ],
    },
    {
      id: "m_fish",
      name: "垂钓能手",
      emoji: "🎣",
      desc: "累计钓鱼 20 次",
      check: (e) => getStats(e).fishes >= 20,
      progress: (e) => ({ current: Math.min(getStats(e).fishes, 20), target: 20 }),
      rewards: [
        { type: "coins", amount: 400 },
        { type: "ingredient", ingId: "honey", amount: 3 },
      ],
    },
    {
      id: "m_furniture",
      name: "家装达人",
      emoji: "🛋️",
      desc: "家具等级升到 Lv.5",
      check: (e) => getFurnitureLevel(e) >= 5,
      progress: (e) => ({ current: Math.min(getFurnitureLevel(e), 5), target: 5 }),
      rewards: [{ type: "coins", amount: 800 }],
    },
    {
      id: "m_aff",
      name: "心意相通",
      emoji: "💖",
      desc: "与任一伙伴好感度达到 100",
      check: (e) => Math.max(0, ...Object.values(e.affection ?? {})) >= 100,
      progress: (e) => ({
        current: Math.min(Math.max(0, ...Object.values(e.affection ?? {})), 100),
        target: 100,
      }),
      rewards: [
        { type: "coins", amount: 500 },
        { type: "ingredient", ingId: "strawberry", amount: 5 },
      ],
    },
    {
      id: "m_earn2",
      name: "财富进阶",
      emoji: "🤑",
      desc: "累计收入达到 10000 金币",
      check: (e) => getStats(e).earned >= 1e4,
      progress: (e) => ({ current: Math.min(getStats(e).earned, 1e4), target: 1e4 }),
      rewards: [
        { type: "coins", amount: 1e3 },
        { type: "ingredient", ingId: "eggs", amount: 5 },
      ],
    },
    {
      id: "m_sold2",
      name: "销量百件",
      emoji: "🎂",
      desc: "累计卖出 100 件点心",
      check: (e) => getStats(e).sold >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).sold, 100), target: 100 }),
      rewards: [
        { type: "coins", amount: 600 },
        { type: "ingredient", ingId: "sugar", amount: 5 },
      ],
    },
    {
      id: "m_bake2",
      name: "烘焙大师",
      emoji: "🥐",
      desc: "累计烘焙 100 次",
      check: (e) => getStats(e).baked >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).baked, 100), target: 100 }),
      rewards: [
        { type: "coins", amount: 800 },
        { type: "ingredient", ingId: "milk", amount: 5 },
      ],
    },
    {
      id: "m_perfect2",
      name: "完美宗师",
      emoji: "🌟",
      desc: "制作出 100 个完美品质点心",
      check: (e) => getStats(e).perfects >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).perfects, 100), target: 100 }),
      rewards: [
        { type: "coins", amount: 1e3 },
        { type: "ingredient", ingId: "mango", amount: 5 },
      ],
    },
    {
      id: "m_chat",
      name: "谈笑风生",
      emoji: "💬",
      desc: "累计聊天 50 次",
      check: (e) => getStats(e).chats >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).chats, 50), target: 50 }),
      rewards: [
        { type: "coins", amount: 500 },
        { type: "ingredient", ingId: "coffee_bean", amount: 3 },
      ],
    },
    {
      id: "m_gift",
      name: "送礼高手",
      emoji: "🎁",
      desc: "累计送出礼物 20 次",
      check: (e) => getStats(e).gifted >= 20,
      progress: (e) => ({ current: Math.min(getStats(e).gifted, 20), target: 20 }),
      rewards: [
        { type: "coins", amount: 500 },
        { type: "ingredient", ingId: "cheese", amount: 3 },
      ],
    },
    {
      id: "m_date2",
      name: "热恋进行时",
      emoji: "🌹",
      desc: "累计约会 15 次",
      check: (e) => getStats(e).dated >= 15,
      progress: (e) => ({ current: Math.min(getStats(e).dated, 15), target: 15 }),
      rewards: [
        { type: "coins", amount: 800 },
        { type: "ingredient", ingId: "peach", amount: 5 },
      ],
    },
    {
      id: "m_fish2",
      name: "钓鱼大师",
      emoji: "🐠",
      desc: "累计钓鱼 50 次",
      check: (e) => getStats(e).fishes >= 50,
      progress: (e) => ({ current: Math.min(getStats(e).fishes, 50), target: 50 }),
      rewards: [
        { type: "coins", amount: 800 },
        { type: "ingredient", ingId: "blueberry", amount: 5 },
      ],
    },
    {
      id: "m_bigfish",
      name: "大物猎人",
      emoji: "🏆",
      desc: "钓到 5 条大物（≥50cm）",
      check: (e) => getStats(e).bigFish >= 5,
      progress: (e) => ({ current: Math.min(getStats(e).bigFish, 5), target: 5 }),
      rewards: [
        { type: "coins", amount: 600 },
        { type: "ingredient", ingId: "matcha", amount: 5 },
      ],
    },
    {
      id: "m_loach",
      name: "摸鱼大王",
      emoji: "🪱",
      desc: "抓到 20 条泥鳅",
      check: (e) => getStats(e).loaches >= 20,
      progress: (e) => ({ current: Math.min(getStats(e).loaches, 20), target: 20 }),
      rewards: [
        { type: "coins", amount: 400 },
        { type: "ingredient", ingId: "honey", amount: 3 },
      ],
    },
    {
      id: "m_exercise2",
      name: "健身达人",
      emoji: "💪",
      desc: "累计锻炼身体 100 次",
      check: (e) => getStats(e).exercises >= 100,
      progress: (e) => ({ current: Math.min(getStats(e).exercises, 100), target: 100 }),
      rewards: [
        { type: "coins", amount: 700 },
        { type: "ingredient", ingId: "tomato", amount: 5 },
      ],
    },
    {
      id: "m_explore2",
      name: "小镇探险家",
      emoji: "🗺️",
      desc: "累计外出探索 30 次",
      check: (e) => getStats(e).explores >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).explores, 30), target: 30 }),
      rewards: [
        { type: "coins", amount: 500 },
        { type: "ingredient", ingId: "apple", amount: 5 },
      ],
    },
    {
      id: "m_clean",
      name: "清洁标兵",
      emoji: "🧹",
      desc: "累计打扫整理 30 次",
      check: (e) => getStats(e).cleanups >= 30,
      progress: (e) => ({ current: Math.min(getStats(e).cleanups, 30), target: 30 }),
      rewards: [
        { type: "coins", amount: 400 },
        { type: "ingredient", ingId: "lemon", amount: 3 },
      ],
    },
    {
      id: "m_maxcoins",
      name: "日进斗金",
      emoji: "👑",
      desc: "单日持有金币达到 5000",
      check: (e) => getStats(e).maxCoins >= 5e3,
      progress: (e) => ({ current: Math.min(getStats(e).maxCoins, 5e3), target: 5e3 }),
      rewards: [
        { type: "coins", amount: 1e3 },
        { type: "ingredient", ingId: "cheese", amount: 5 },
      ],
    },
    {
      id: "m_aff3",
      name: "情谊满园",
      emoji: "💝",
      desc: "有 3 位伙伴好感度达到 100",
      check: (e) => Object.values(e.affection ?? {}).filter((n) => n >= 100).length >= 3,
      progress: (e) => ({
        current: Math.min(Object.values(e.affection ?? {}).filter((n) => n >= 100).length, 3),
        target: 3,
      }),
      rewards: [
        { type: "coins", amount: 800 },
        { type: "ingredient", ingId: "strawberry", amount: 5 },
      ],
    },
    {
      id: "m_recipe2",
      name: "研发大师",
      emoji: "📚",
      desc: "研发 12 种配方",
      check: (e) => countRecipes(e) >= 12,
      progress: (e) => ({ current: Math.min(countRecipes(e), 12), target: 12 }),
      rewards: [
        { type: "coins", amount: 1e3 },
        { type: "ingredient", ingId: "coffee_bean", amount: 5 },
      ],
    },
    {
      id: "m_furniture2",
      name: "豪华宅邸",
      emoji: "🏰",
      desc: "家具等级升到 Lv.10",
      check: (e) => getFurnitureLevel(e) >= 10,
      progress: (e) => ({ current: Math.min(getFurnitureLevel(e), 10), target: 10 }),
      rewards: [
        { type: "coins", amount: 1500 },
        { type: "ingredient", ingId: "coconut", amount: 5 },
      ],
    },
    {
      id: "m_year2",
      name: "周年庆典",
      emoji: "🎆",
      desc: "经营满 365 天",
      check: (e) => e.day >= 365,
      progress: (e) => ({ current: Math.min(e.day, 365), target: 365 }),
      rewards: [
        { type: "coins", amount: 2e3 },
        { type: "ingredient", ingId: "red_bean", amount: 5 },
      ],
    },
  ];

function checkAchievements(e) {
  const n = deepCloneState(e);
  n.stats = { ...n.stats, maxCoins: Math.max(n.stats.maxCoins, n.coins) };
  const s = [];
  for (const a of ALL_ACHIEVEMENTS)
    n.achievements[a.id] === void 0 &&
      a.check(n) &&
      ((n.achievements[a.id] = Date.now()), s.push(a));
  return { state: n, unlocked: s };
}

function getMilestoneState(e, n) {
  const s = e.milestones[n];
  if (s === 1 || s === 2) return s;
  const a = MILESTONES.find((o) => o.id === n);
  return a && a.check(e) ? 1 : 0;
}

function countCompletedMilestones(e) {
  return MILESTONES.filter((n) => getMilestoneState(e, n.id) === 1).length;
}

function claimMilestone(e, n) {
  const s = MILESTONES.find((o) => o.id === n);
  if (!s) return { state: e, ok: !1, message: "里程碑不存在", rewards: [] };
  if (getMilestoneState(e, n) !== 1) return { state: e, ok: !1, message: "还没有达成领取条件", rewards: [] };
  const a = deepCloneState(e);
  for (const o of s.rewards)
    if (o.type === "coins") a.coins += o.amount;
    else if (o.type === "ingredient" && o.ingId) {
      const l = a.ingredients[o.ingId];
      l ? (l.qty += o.amount) : (a.ingredients[o.ingId] = { qty: o.amount, freshness: 0 });
    }
  return (
    (a.milestones[n] = 2),
    { state: a, ok: !0, message: `领取「${s.name}」奖励！`, rewards: s.rewards }
  );
}

function formatRewards(e) {
  return e
    .map((n) => {
      if (n.type === "coins") return `💰 ${n.amount} 金币`;
      const s = INGREDIENT_MAP[n.ingId ?? ""];
      return `${(s == null ? void 0 : s.emoji) ?? ""}${(s == null ? void 0 : s.name) ?? ""} x${n.amount}`;
    })
    .join(" + ");
}

function calcProgressPercent(e) {
  return e.target <= 0 ? 100 : Math.min(100, Math.round((e.current / e.target) * 100));
}

const dailyPickRegistry = {};

function pickDailyRandom(e, n) {
  const s = dailyPickRegistry[e],
    a = s && s.day === Number(e.split("-")[0]) ? new Set(s.used) : new Set(),
    o = n.filter((u) => !a.has(u)),
    l = o.length > 0 ? o : n,
    c = l[Math.floor(Math.random() * l.length)] ?? "";
  return (c && (dailyPickRegistry[e] = { day: Number(e.split("-")[0]), used: [...a, c].slice(-40) }), c);
}

function findFriendBirthdaySoon(e, n) {
  var c, u;
  const s = dayToDate(e),
    a = NPC_FAMILY_TREE[n],
    o = new Set();
  for (const f of ["lover", "bestFriends", "friends", "siblings", "eternalFriends"])
    for (const g of (a == null ? void 0 : a[f]) ?? []) o.add(g);
  const l = NPC_PARTNER_MAP[n];
  l && o.add(l.partner);
  for (const f of o) {
    const g = (c = NPC_RUNTIME_DATA[f]) == null ? void 0 : c.birthday;
    if (!g) continue;
    const x = s.month * 100 + s.day;
    let p = g.month * 100 + g.day - x;
    if ((p < -300 && (p += 366), p >= 0 && p <= 3))
      return { friend: ((u = NPC_RUNTIME_DATA[f]) == null ? void 0 : u.name) ?? "TA", days: p };
  }
  return null;
}

function chatWithNpc(e, n) {
  const s = NPC_RUNTIME_DATA[n];
  if (!s) return { state: e, ok: !1, message: "角色不存在" };
  if (hasNpcProfile(n) && npcSchoolStage(n, e.day) === "away")
    return { state: e, ok: !1, message: `${s.name}已经高中毕业，去外地上大学了，暂时联系不上` };
  if (isSchoolPlace(getNpcLocationAt(n, e.hour, e.day).place))
    return {
      state: e,
      ok: !1,
      message: `${s.name}正在校内上课/自习，手机静音着，等 TA 放学再联系吧`,
    };
  const a = `${e.day}-${e.hour}`,
    l = (e.chatHourKey === a ? (e.chatCountsThisHour ?? {}) : {})[n] ?? 0;
  if (l >= 3)
    return {
      state: e,
      ok: !1,
      message: `${s.name}这个小时已经聊过 3 次了，让 TA 歇口气，下个小时再聊吧`,
    };
  const c = checkTimeBlocked(e, TIME_COST.chat / 60);
  if (c) return { state: e, ok: !1, message: c };
  const u = deepClone(e);
  (advanceHours(u, TIME_COST.chat),
    consumeSatiety(u, TIME_COST.chat / 60),
    u.chatHourKey !== a && ((u.chatHourKey = a), (u.chatCountsThisHour = {})),
    (u.chatCountsThisHour[n] = l + 1));
  const f = (u.hygiene ?? 100) < 40,
    g = f ? 1 : 3;
  ((u.affection[n] = changeAffection(u, n, g)), (u.stats.chats += 1));
  const x = f ? "（卫生值太低，聊天有点尴尬，好感度只 +1）" : "";
  if (!(u.metNpcs ?? []).includes(n)) {
    u.metNpcs = [...(u.metNpcs ?? []), n];
    const v = giveBirthdayGift(u, n);
    return {
      state: v.state,
      ok: !0,
      message: `${s.intro}${x}${v.text ? ` ${v.text}` : ""}`,
      line: s.intro,
      firstMeet: !0,
      affectionGain: g,
    };
  }
  const p = u.affection[n] ?? 0;
  if (Math.random() < 0.65) {
    const v = pickChatLine(n, p, u.day, u);
    if (v) {
      const N = `「${TOPIC_CATEGORY_LABELS[v.category]}」${v.line}`,
        S = giveBirthdayGift(u, n);
      return {
        state: S.state,
        ok: !0,
        message: `${N}${x}${S.text ? ` ${S.text}` : ""}`,
        line: `${N}${x}`,
        affectionGain: g,
      };
    }
  }
  const y = mbtiStyleLine(n, pickDailyRandom(`${u.day}-${n}`, s.chats), "general"),
    j = giveBirthdayGift(u, n);
  return {
    state: j.state,
    ok: !0,
    message: `${y}${x}${j.text ? ` ${j.text}` : ""}`,
    line: `${y}${x}`,
    affectionGain: g,
  };
}

function giveFoodGift(e, n, s) {
  var p;
  const a = NPC_RUNTIME_DATA[n];
  if (!a) return { state: e, ok: !1, message: "角色不存在" };
  const o = (e.carried ?? []).find((y) => y.id === s && (y.kind === "snack" || y.kind === "food"));
  if (!o) return { state: e, ok: !1, message: "这份点心没带在身上，先在📱手机里把礼物装上" };
  const c = o.refId === a.likes;
  if (hasNpcProfile(n) && npcSchoolStage(n, e.day) === "away")
    return { state: e, ok: !1, message: `${a.name}已经高中毕业，去外地上大学了，暂时联系不上` };
  if (isSchoolPlace(getNpcLocationAt(n, e.hour, e.day).place))
    return {
      state: e,
      ok: !1,
      message: `${a.name}在校内上课/自习，礼物先收好，等 TA 放学再当面送吧`,
    };
  const u = checkTimeBlocked(e, TIME_COST.gift / 60);
  if (u) return { state: e, ok: !1, message: u };
  const f = deepClone(e);
  (advanceHours(f, TIME_COST.gift), consumeSatiety(f, TIME_COST.gift / 60));
  const g = (p = f.carried) == null ? void 0 : p.find((y) => y.id === o.id);
  g &&
    ((g.qty = (g.qty ?? 1) - 1),
    g.qty <= 0 && (f.carried = (f.carried ?? []).filter((y) => y.id !== o.id)));
  const x = birthdayAffectionBonus(e, n);
  ((f.affection[n] = changeAffection(f, n, (c ? 16 : 8) + x)), (f.stats.gifted += 1));
  const m = x > 0 ? ` 🎂生日当天收礼，${a.name}特别开心，好感额外 +${x}！` : "";
  return {
    state: f,
    ok: !0,
    message: `${c ? a.loveGiftLine : a.giftLine}${m}`,
    line: `${c ? a.loveGiftLine : a.giftLine}${m}`,
  };
}

function giveFlower(e, n, s) {
  var x;
  const a = NPC_RUNTIME_DATA[n];
  if (!a) return { state: e, ok: !1, message: "角色不存在" };
  if (!(e.metNpcs ?? []).includes(n))
    return { state: e, ok: !1, message: `先认识${a.name}，才能当面送花` };
  const o = (e.carried ?? []).find((m) => m.kind === "flower");
  if (!o || (o.qty ?? 0) < 1)
    return { state: e, ok: !1, message: "花束没带在身上：先在📱手机里把花装进随身携带" };
  const l = getNpcLocationAt(n, e.hour, e.day);
  if (l.place !== s)
    return {
      state: e,
      ok: !1,
      message: `${a.name}现在不在${PLACE_LABELS[s] ?? s}，TA 在${PLACE_LABELS[l.place] ?? l.place}呢，当面才能送`,
    };
  if (isSchoolPlace(l.place))
    return { state: e, ok: !1, message: `${a.name}在校内，非师生进不去，等 TA 放学再送吧` };
  const c = checkTimeBlocked(e, TIME_COST.giveFlower / 60);
  if (c) return { state: e, ok: !1, message: c };
  const u = deepClone(e);
  (advanceHours(u, TIME_COST.giveFlower), consumeSatiety(u, TIME_COST.giveFlower / 60));
  const f = (x = u.carried) == null ? void 0 : x.find((m) => m.kind === "flower");
  (f &&
    ((f.qty = (f.qty ?? 1) - 1),
    f.qty <= 0 && (u.carried = (u.carried ?? []).filter((m) => m.id !== f.id))),
    (u.affection[n] = changeAffection(u, n, 3)),
    (u.mood = Math.min(MAX_MOOD, (u.mood ?? 100) + 6)),
    (u.stats.gifted += 1));
  const g = isWeekendDay(u.day)
    ? `${a.name}接过花，捧着闻了闻，眼睛弯起来：「休息日还能收到花，这一天都值了。谢谢你，我很喜欢。」（好感 +3，心情 +6）`
    : `${a.name}接过花，脸上泛起笑意：「你怎么知道我喜欢这个颜色？当面送花才最动人——我收下啦。」（好感 +3，心情 +6）`;
  return { state: u, ok: !0, message: g, line: g };
}

function dateNpc(e, n) {
  const s = NPC_RUNTIME_DATA[n];
  if (!s) return { state: e, ok: !1, message: "角色不存在" };
  if (hasNpcProfile(n)) {
    if (npcSchoolStage(n, e.day) === "away")
      return { state: e, ok: !1, message: `${s.name}已经高中毕业，去外地上大学了，暂时约不了` };
    if (npcAgeOn(n, e.day) < 18)
      return { state: e, ok: !1, message: `${s.name}还是未成年人，不能约会哦` };
  }
  if (e.datedToday.includes(n)) return { state: e, ok: !1, message: "今天已经约过会了" };
  if ((e.affection[n] ?? 0) < 30) return { state: e, ok: !1, message: "好感度达到 30 才能约会哦" };
  const a = checkTimeBlocked(e, TIME_COST.date / 60);
  if (a) return { state: e, ok: !1, message: a };
  const o = deepClone(e);
  return (
    advanceHours(o, TIME_COST.date),
    consumeSatiety(o, TIME_COST.date / 60),
    o.datedToday.push(n),
    (o.affection[n] = changeAffection(o, n, 6)),
    (o.stats.dated += 1),
    { state: o, ok: !0, message: s.dateLine, line: s.dateLine }
  );
}

function getAffectionTier(e) {
  const n = Math.min(MAX_AFFECTION, Math.max(0, e));
  let s = AFFECTION_TIERS[0],
    a = null;
  for (let c = 0; c < AFFECTION_TIERS.length; c += 1) n >= AFFECTION_TIERS[c].min && (s = AFFECTION_TIERS[c]);
  for (let c = 0; c < AFFECTION_TIERS.length; c += 1)
    if (AFFECTION_TIERS[c].min > n) {
      a = AFFECTION_TIERS[c];
      break;
    }
  const o = a ? a.min - s.min : 100 - s.min,
    l = a ? Math.min(1, Math.max(0, (n - s.min) / o)) : 1;
  return { label: s.label, emoji: s.emoji, progress: l };
}
