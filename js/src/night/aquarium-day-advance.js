function catchGoldfish(e, n) {
  if (!isNightMarketOpen(e)) return { state: e, ok: !1, message: "夜市还没开张，捞金鱼摊没出摊" };
  if (e.energy < 6) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, TIME_COST.goldfishCatch / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  return (
    advanceHours(a, TIME_COST.goldfishCatch),
    (a.energy = Math.max(0, a.energy - 6)),
    Math.random() >= 0.65
      ? { state: a, ok: !1, message: "纸网一碰水就破了，金鱼甩着尾巴溜走，再来一次！" }
      : n === "eat"
        ? ((a.satiety = Math.min(MAX_SATIETY, (a.satiety ?? 70) + 20)),
          (a.mood = Math.min(MAX_MOOD, (a.mood ?? 100) + 4)),
          {
            state: a,
            ok: !0,
            message: "捞到一条小金鱼！摊主帮你现炸，香喷喷地吃掉了：饱食度 +20，心情 +4",
          })
        : n === "cook"
          ? (grantIngredient(a, "goldfish", 1),
            {
              state: a,
              ok: !0,
              message:
                "捞到一条小金鱼！装进食材袋带回去，可以做金鱼料理（香酥金鱼、金鱼豆腐汤、清蒸金鱼、糖醋金鱼）",
            })
          : ((a.mood = Math.min(MAX_MOOD, (a.mood ?? 100) + 1)),
            hasAquarium(a)
              ? a.aquariumDirty
                ? {
                    state: a,
                    ok: !0,
                    message: "捞到一条小金鱼！不过缸还没清理干净，清理干净再养吧（心情 +1）",
                  }
                : a.aquariumFish
                  ? {
                      state: a,
                      ok: !0,
                      message:
                        "捞到一条小金鱼！不过缸里已经有一条金鱼啦，先照顾好缸里的这位吧（心情 +1）",
                    }
                  : ((a.aquariumFish = !0),
                    (a.aquariumHealth = 100),
                    (a.aquariumLastFeedDay = a.day),
                    (a.aquariumDirtyDay = 0),
                    {
                      state: a,
                      ok: !0,
                      message:
                        "捞到一条小金鱼！放进水族缸里养起来了，记得每天喂食（鱼饲料在夜市和河边有售），缸脏了要及时清理",
                    })
              : {
                  state: a,
                  ok: !0,
                  message: "捞到一条小金鱼！不过家里还没有水族缸，先买个水族缸再养吧（心情 +1）",
                })
  );
}

function hasAquarium(e) {
  return e.home.furniture.some((n) => AQUARIUM_FURNITURE_IDS.includes(n.fid));
}

function countAquariumDecor(e) {
  return Array.isArray(e.aquariumDecor) ? e.aquariumDecor.length : 0;
}

function hasAllAquariumDecor(e) {
  return countAquariumDecor(e) >= 3;
}

function calcAquariumDecorScore(e) {
  var a;
  const n = e.home.furniture.find((o) => AQUARIUM_FURNITURE_IDS.includes(o.fid));
  let s = n ? (((a = FURNITURE_MAP[n.fid]) == null ? void 0 : a.decor) ?? 0) : 0;
  if (Array.isArray(e.aquariumDecor))
    for (const o of e.aquariumDecor) {
      const l = o.lastIndexOf("_"),
        c = l >= 0 ? o.slice(0, l) : "",
        u = FURNITURE_MAP[c];
      u && (s += u.decor ?? 0);
    }
  return s;
}

function toggleAquariumDecor(e, n) {
  const s = n.lastIndexOf("_");
  if (s <= 0) return { state: e, ok: !1, message: "装饰键格式不对" };
  const a = n.slice(0, s),
    o = parseInt(n.slice(s + 1), 10),
    l = FURNITURE_MAP[a];
  if (!l || l.category !== "aqua_decor")
    return { state: e, ok: !1, message: "只有缸内装饰（彩色鹅卵石、水草、小桥摆件）能放进水族缸" };
  if (
    !Number.isInteger(o) ||
    o < 0 ||
    o >= e.home.furniture.length ||
    e.home.furniture[o].fid !== a
  )
    return { state: e, ok: !1, message: "这件装饰不在你的家具里，无法放进水族缸" };
  const c = deepClone(e),
    u = Array.isArray(c.aquariumDecor) ? [...c.aquariumDecor] : [],
    f = u.indexOf(n);
  return f >= 0
    ? (u.splice(f, 1),
      (c.aquariumDecor = u),
      { state: c, ok: !0, message: `把「${l.name}」从水族缸里取出来了` })
    : (u.push(n),
      (c.aquariumDecor = u),
      { state: c, ok: !0, message: `把「${l.name}」放进水族缸里了，观赏度更高啦` });
}

function cookAquariumFish(e) {
  if (!hasAquarium(e)) return { state: e, ok: !1, message: "家里还没有水族缸，先去家具店买一个吧" };
  if (e.aquariumFish !== !0)
    return { state: e, ok: !1, message: "缸里没有金鱼，去夜市捞一条放进来吧" };
  const n = deepClone(e);
  return (
    (n.aquariumFish = !1),
    (n.aquariumHealth = 0),
    (n.aquariumLastFeedDay = 0),
    grantIngredient(n, "goldfish", 1),
    {
      state: n,
      ok: !0,
      message: "从水族缸里捞出金鱼，直接下锅！食材袋里多了 1 条金鱼（缸空空的，可以去夜市再捞）",
    }
  );
}

function buyFishFeed(e, n = 1) {
  const s = Math.max(1, Math.floor(n)),
    a = FISH_FEED_PRICE * s;
  if (e.coins < a) return { state: e, ok: !1, message: `鱼饲料 ¥${FISH_FEED_PRICE}/份，金币不够啦` };
  const o = deepClone(e);
  return (
    (o.coins -= a),
    (o.stats.spent += a),
    (o.fishFeed = (o.fishFeed ?? 0) + s),
    { state: o, ok: !0, message: `买到了 ${s} 份鱼饲料（¥${a}），回家喂给水族缸里的金鱼吧` }
  );
}

function feedAquariumFish(e) {
  if (!hasAquarium(e)) return { state: e, ok: !1, message: "家里还没有水族缸，先去家具店买一个吧" };
  if (!e.aquariumFish) return { state: e, ok: !1, message: "缸里没有金鱼，去夜市捞一条放进来吧" };
  if (e.aquariumLastFeedDay === e.day)
    return { state: e, ok: !1, message: "今天已经喂过啦，金鱼一天吃一顿就够" };
  if ((e.fishFeed ?? 0) < 1)
    return {
      state: e,
      ok: !1,
      message: "没有鱼饲料了，去夜市捞金鱼摊或河边渔具摊买几份吧（¥5/份）",
    };
  const n = deepClone(e);
  return (
    (n.fishFeed -= 1),
    (n.aquariumLastFeedDay = e.day),
    (n.aquariumHealth = Math.min(100, (n.aquariumHealth ?? 0) + 20)),
    { state: n, ok: !0, message: `金鱼吃得欢！健康度 +20（现在 ${n.aquariumHealth}/100）` }
  );
}

function cleanAquarium(e) {
  if (!hasAquarium(e)) return { state: e, ok: !1, message: "家里还没有水族缸，先去家具店买一个吧" };
  const n = deepClone(e);
  return (
    (n.aquariumCleanliness = Math.min(100, (n.aquariumCleanliness ?? 0) + 30)),
    (n.aquariumDirty = !1),
    (n.aquariumDirtyDay = 0),
    {
      state: n,
      ok: !0,
      message: `水族缸清理干净了（清洁度 ${n.aquariumCleanliness}/100），金鱼住得舒服多了`,
    }
  );
}

let govTicketSeq = 0;

function nextDayOf(e) {
  return e.day + 1;
}

function pushGovTicket(e, n, s) {
  govTicketSeq += 1;
  const a = {
    id: `gt_${Date.now()}_${govTicketSeq}`,
    kind: n,
    payload: s,
    submitDay: e.day,
    applyDay: nextDayOf(e),
  };
  e.govTickets = [...(e.govTickets ?? []), a];
}

function submitGovApplication(e, n, s = {}) {
  var a, o;
  if (((e.govTickets ?? []).map((l) => l.kind), n === "charity_apply")) {
    if (e.charityApplied)
      return { state: e, ok: !1, message: "你已经报名本次义卖了，义卖期记得来摆摊" };
    if (!isSpring(e.day))
      return {
        state: e,
        ok: !1,
        message: isSummer(e.day)
          ? "义卖正在进行中，线上报名已截止，等下一次吧"
          : "现在不是报名期，线上报名暂未开放",
      };
    if (e.coins < MAX_STAT_VALUE) return { state: e, ok: !1, message: `报名费 ¥${MAX_STAT_VALUE}，金币不够啦` };
    const l = deepClone(e);
    return (
      pushGovTicket(l, n, s),
      {
        state: l,
        ok: !0,
        message: `📱 义卖报名已提交！明天 8:00 窗口办结（报名费 ¥${MAX_STAT_VALUE} 届时扣除）`,
      }
    );
  }
  if (n === "charity_sell") {
    if (!e.charityApplied) return { state: e, ok: !1, message: "还没报名义卖，先线上报名吧" };
    if (!isSummer(e.day))
      return {
        state: e,
        ok: !1,
        message: isSpring(e.day) ? "现在还在报名期，义卖还没开始" : "义卖期已经结束了，等下一次义卖吧",
      };
    const l = deepClone(e);
    return (
      pushGovTicket(l, n, s),
      {
        state: l,
        ok: !0,
        message: "📱 线上摆摊申请已提交！明天 8:00 办结，届时自动卖出 1 份料理并结算收入",
      }
    );
  }
  if (n === "commercial") {
    if (e.coins < 200) return { state: e, ok: !1, message: "举办商业活动需要 ¥200，金币不够啦" };
    for (const [c, u] of [
      ["flour", 5],
      ["sugar", 3],
      ["egg", 2],
    ]) {
      const f = ((a = e.ingredients[c]) == null ? void 0 : a.qty) ?? 0;
      if (f < u)
        return {
          state: e,
          ok: !1,
          message: `材料不够：${((o = INGREDIENT_MAP[c]) == null ? void 0 : o.name) ?? c} 还差 ${u - f} 份`,
        };
    }
    const l = deepClone(e);
    return (
      pushGovTicket(l, n, s),
      { state: l, ok: !0, message: "📱 商业活动申请已提交！明天 8:00 办结，届时扣款扣料并开始造势" }
    );
  }
  if (n === "relief") {
    const m0 = formatYearMonth(e.day);
    if (e.home.reliefMonth === m0)
      return { state: e, ok: !1, message: "这个月的应急救助金已经领过了，下个月再来吧" };
    if (e.coins >= 150)
      return {
        state: e,
        ok: !1,
        message: "店里还有余粮，救助金留给真正困难的时候（金币低于 ¥150 才能申请）",
      };
    const l = deepClone(e);
    return (
      pushGovTicket(l, n, s),
      {
        state: l,
        ok: !0,
        message: "📱 应急救助金申请已提交！明天 8:00 窗口办结（镇政府应急关怀，每月最多一次）",
      }
    );
  }
  if (n === "rename_player" || n === "rename_shop") {
    const l = (s.name ?? "").trim(),
      c = n === "rename_player" ? 8 : 10;
    if (!l)
      return { state: e, ok: !1, message: n === "rename_player" ? "名字不能为空" : "店名不能为空" };
    if (l.length > c)
      return {
        state: e,
        ok: !1,
        message: `${n === "rename_player" ? "名字" : "店名"}最长 ${c} 个字`,
      };
    if (e.coins < MAX_STAT_VALUE) return { state: e, ok: !1, message: `改名费 ¥${MAX_STAT_VALUE}，金币不够啦` };
    const u = deepClone(e);
    return (
      pushGovTicket(u, n, { name: l }),
      {
        state: u,
        ok: !0,
        message: `📱 改名申请已提交！明天 8:00 窗口办结（改名费 ¥${MAX_STAT_VALUE} 届时扣除）`,
      }
    );
  }
  return { state: e, ok: !1, message: "不支持的政务申请" };
}

function hasGovTicketOfKind(e, n) {
  return (e.govTickets ?? []).some((s) => s.kind === n);
}

function formatYearMonth(e) {
  const n = dayToDate(e);
  return `${n.year}-${n.month}`;
}

function getMonthsSinceStart(e) {
  const [n, s] = formatYearMonth(1).split("-").map(Number),
    [a, o] = formatYearMonth(e.day).split("-").map(Number);
  return Math.max(1, (a - n) * 12 + (o - s) + 1);
}

function claimMonthlySubsidy(e) {
  const n = getMonthsSinceStart(e);
  if (n > 12) return { state: e, ok: !1, message: "第一年的扶持计划已经结束啦，往后就得靠自己啦" };
  const s = formatYearMonth(e.day);
  if ((e.subsidyClaimed ?? []).includes(s))
    return { state: e, ok: !1, message: "这个月的补贴已经领过了，下个月再来吧" };
  const a = deepClone(e);
  return (
    (a.coins += 800),
    (a.subsidyClaimed = [...(a.subsidyClaimed ?? []), s]),
    {
      state: a,
      ok: !0,
      message: `💴 领到本月扶持补贴 ¥800！这是开店第 ${n} 个月，扶持计划还剩 ${12 - n} 个月`,
    }
  );
}

function hasClaimedMonthlySubsidy(e) {
  return (e.subsidyClaimed ?? []).includes(formatYearMonth(e.day));
}

const FOOD_STREET_INVEST_COST = 2e3,
  FOOD_STREET_INVEST_STEP = 10;

function isFoodStreetBuilt(e) {
  return (e.foodStreetInvest ?? 0) >= 100;
}

function investFoodStreet(e) {
  if (isFoodStreetBuilt(e)) return { state: e, ok: !1, message: "美食街已经建成啦，去小镇地图逛逛吧" };
  if (e.coins < FOOD_STREET_INVEST_COST) return { state: e, ok: !1, message: `一期投资需要 ¥${FOOD_STREET_INVEST_COST}，金币不够啦` };
  const n = deepClone(e);
  ((n.coins -= FOOD_STREET_INVEST_COST), (n.stats.spent += FOOD_STREET_INVEST_COST));
  const s = n.foodStreetInvest ?? 0,
    a = Math.min(100, s + FOOD_STREET_INVEST_STEP);
  return (
    (n.foodStreetInvest = a),
    a >= 100
      ? {
          state: n,
          ok: !0,
          message: "🎉 美食街投资进度 100%！美食街正式建成开放，快回小镇地图看看新地图吧！",
        }
      : {
          state: n,
          ok: !0,
          message: `向市政府投资美食街 ¥${FOOD_STREET_INVEST_COST}：进度 ${s}% → ${a}%（累计 100% 建成）`,
        }
  );
}

function markTutorialDone(e, n) {
  const s = deepClone(e);
  return (
    (s.tutorial = { ...(s.tutorial ?? {}), [n]: !0 }),
    { state: s, ok: !0, message: "引导进度已记录" }
  );
}

function settleGovTickets(e) {
  const n = (e.govTickets ?? []).filter((a) => a.applyDay <= e.day);
  if (n.length === 0) return [];
  e.govTickets = (e.govTickets ?? []).filter((a) => a.applyDay > e.day);
  const s = [];
  for (const a of n)
    if (a.kind === "charity_apply") {
      if (e.charityApplied || e.coins < MAX_STAT_VALUE) {
        s.push("义卖报名未办结（金币不足或已报名）");
        continue;
      }
      ((e.coins -= MAX_STAT_VALUE), (e.charityApplied = !0), s.push("义卖报名已办结，义卖期可以摆摊啦"));
    } else if (a.kind === "charity_sell") {
      const o = runCharitySale(e);
      if (!o.ok) {
        s.push(`义卖摆摊未办结：${o.message}`);
        continue;
      }
      (Object.assign(e, o.state), s.push("义卖摆摊办结，料理已卖出"));
    } else if (a.kind === "commercial") {
      const o = hostBusinessEvent(e);
      if (!o.ok) {
        s.push(`商业活动未办结：${o.message}`);
        continue;
      }
      (Object.assign(e, o.state), s.push("商业活动办结，客流加成开始生效"));
    } else if (a.kind === "relief") {
      ((e.coins += 300),
        (e.home.reliefMonth = formatYearMonth(e.day)),
        s.push("🛟 应急救助金办结，到账 ¥300（镇政府应急关怀）"));
    } else if (a.kind === "rename_player") {
      const o = renamePlayer(e, a.payload.name ?? "");
      if (!o.ok) {
        s.push(`改名未办结：${o.message}`);
        continue;
      }
      (Object.assign(e, o.state), s.push(`改名办结，现在你叫「${e.playerName}」了`));
    } else if (a.kind === "rename_shop") {
      const o = renameShop(e, a.payload.name ?? "");
      if (!o.ok) {
        s.push(`改店名未办结：${o.message}`);
        continue;
      }
      (Object.assign(e, o.state), s.push(`改店名办结，「${e.shopName}」的招牌挂起来了`));
    }
  return s;
}

const FLOWER_SHOP_NPC_ID = "song_xiaoyu";

function sellFlowersAtPlaza(e) {
  const n = WEATHER_TYPES[weatherOfDay(e.day)];
  if (!n.outdoor)
    return {
      state: e,
      ok: !1,
      message: `${n.emoji} 今天${n.label}，广场上没什么人，改天再来摆摊卖花吧`,
    };
  if ((e.homeFlowers ?? 0) < 1)
    return { state: e, ok: !1, message: "阳台还没有收好的鲜花，先回家种花收获吧" };
  if ((e.plazaFlowerSoldToday ?? 0) >= FLOWER_PLAZA_DAILY_LIMIT)
    return { state: e, ok: !1, message: "今天广场上的花卖得够多了，明天再来摆摊吧" };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下吧" };
  const s = checkTimeBlocked(e, TIME_COST.stroll / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  (advanceHours(a, TIME_COST.stroll),
    consumeSatiety(a, TIME_COST.stroll / 60),
    (a.energy -= 8),
    (a.plazaFlowerSoldToday = (a.plazaFlowerSoldToday ?? 0) + 1),
    (a.homeFlowers = Math.max(0, (a.homeFlowers ?? 0) - 1)));
  const o = calcCharm(e),
    l = Math.min(FLOWER_PLAZA_MAX_PRICE, FLOWER_PLAZA_BASE_PRICE + Math.floor(o / 2));
  ((a.coins += l), (a.stats.earned = (a.stats.earned ?? 0) + l));
  const c = getAvailableEvents(a, "plaza");
  return {
    state: c.state,
    ok: !0,
    message: `在广场摆摊卖出 1 朵花，赚了 ¥${l}${o >= 8 ? "（你的魅力让路人更愿意掏钱）" : ""}！${c.text ? ` ${c.text}` : ""}`,
  };
}

function pitchFlowersToShop(e) {
  const n = calcCharm(e);
  if (n < FLOWER_SHOP_CHARM_MIN)
    return {
      state: e,
      ok: !1,
      message: `花店的宋小雨只肯收熟脸的花：个人魅力达到 ${FLOWER_SHOP_CHARM_MIN} 再来试试（当前 ${n}）`,
    };
  if ((e.negotiation ?? 0) < FLOWER_SHOP_NEGOTIATION_MIN)
    return {
      state: e,
      ok: !1,
      message: `要说服宋小雨收购阳台花，交涉技能得达到 ${FLOWER_SHOP_NEGOTIATION_MIN}（当前 ${e.negotiation ?? 0}）`,
    };
  if ((e.flowerShopPitchToday ?? 0) >= 1)
    return { state: e, ok: !1, message: "今天已经跟花店谈成一单了，明天再来吧" };
  if ((e.homeFlowers ?? 0) < 1)
    return { state: e, ok: !1, message: "阳台还没有收好的鲜花，先回家种花收获吧" };
  if (e.energy < 8) return { state: e, ok: !1, message: "精力不足，先休息一下吧" };
  const s = checkTimeBlocked(e, TIME_COST.buyFlower / 60);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  (advanceHours(a, TIME_COST.buyFlower),
    consumeSatiety(a, TIME_COST.buyFlower / 60),
    (a.energy -= 8),
    (a.flowerShopPitchToday = 1),
    (a.homeFlowers = Math.max(0, (a.homeFlowers ?? 0) - 1)));
  const o = Math.max(0, n - FLOWER_SHOP_CHARM_MIN),
    l = Math.min(FLOWER_SHOP_MAX_PRICE, FLOWER_SHOP_BASE_PRICE + o);
  return (
    (a.coins += l),
    (a.stats.earned = (a.stats.earned ?? 0) + l),
    (a.negotiation = Math.min(100, (a.negotiation ?? 0) + 2)),
    changeAffection(a, FLOWER_SHOP_NPC_ID, 3),
    {
      state: a,
      ok: !0,
      message: `跟宋小雨谈成了！她以 ¥${l} 收购了你 1 朵阳台花（魅力加成 +¥${o}），她夸你的花水灵：好感 +3，交涉技能 +2`,
    }
  );
}

const RANDOM_STUDENT_LABELS = ["一个穿校服的学生", "一个扎马尾的学生", "一个戴眼镜的学生", "一个背着书包的学生"],
  RANDOM_PARENT_LABELS = ["一位来接孩子的家长", "一位路过的家长", "一位在门口等候的大人"];

function visitSchoolGate(e) {
  if (e.energy < 4) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const n = checkTimeBlocked(e, TIME_COST.schoolGate / 60);
  if (n) return { state: e, ok: !1, message: n };
  const s = getActiveFestival(e.day);
  if (s)
    return {
      state: e,
      ok: !1,
      message: `今天是${s.name}，学校放假，校门口安安静静的，没有学生出入。`,
    };
  if (isWeekendDay(e.day))
    return { state: e, ok: !1, message: "今天是周末，学校休息，校门口安安静静的，没有学生出入。" };
  const a = currentVacation(e.day);
  if (a)
    return {
      state: e,
      ok: !1,
      message: `正值${a}，学校大门紧闭，校门口安安静静的，一个学生都没有。等开学再来看看吧。`,
    };
  const o = Math.floor(e.hour);
  if (o < 16)
    return {
      state: e,
      ok: !1,
      message: `现在${formatHour(e.hour)}，还没到放学时段（下午 4 点到 6 点），校门口没什么人。`,
    };
  if (o >= 18)
    return {
      state: e,
      ok: !1,
      message: "放学时段已经过了（下午 4 点到 6 点），校门口安静下来，明天放学再来看看吧。",
    };
  const l = deepClone(e);
  (advanceHours(l, TIME_COST.schoolGate),
    (l.energy -= 4),
    (l.mood = Math.min(MAX_MOOD, l.mood + 4)),
    (l.explores = (l.explores ?? 0) + 1));
  const c = Array.isArray(e.metNpcs) ? e.metNpcs : [],
    u = NPC_IDS.filter((N) => npcSchoolStage(N, l.day) !== "away"),
    f = u
      .filter((N) => c.includes(N))
      .map((N) => {
        var S;
        return ((S = NPC_RUNTIME_DATA[N]) == null ? void 0 : S.name) ?? N;
      }),
    g = Object.values(NPC_RUNTIME_DATA)
      .filter((N) => c.includes(N.id) && !u.includes(N.id))
      .map((N) => N.name),
    x = (N) => N[Math.floor(Math.random() * N.length)],
    m = () => (f.length > 0 ? x(f) : x(RANDOM_STUDENT_LABELS)),
    p = () => (g.length > 0 ? x(g) : x(RANDOM_PARENT_LABELS)),
    y = Object.keys(RANDOM_CHAT_LINES),
    j = y[Math.floor(Math.random() * y.length)];
  let v = x(RANDOM_CHAT_LINES[j] ?? []);
  if (j === "路人学生之间") v = v.split("{a}").join(x(RANDOM_NPC_NAMES)).split("{b}").join(x(RANDOM_NPC_NAMES));
  else if (j === "路人学生与学生NPC") v = v.split("{a}").join(x(RANDOM_NPC_NAMES)).split("{npc}").join(m());
  else if (j === "学生NPC与成人NPC") v = v.split("{npc}").join(m()).split("{adult}").join(p());
  else if (j === "学生NPC与路人NPC") v = v.split("{npc}").join(m()).split("{a}").join(x(RANDOM_NPC_NAMES));
  else {
    const N = m();
    let S = m();
    (S === N &&
      f.length > 1 &&
      ((S = f[Math.floor(Math.random() * f.length)]), S === N && (S = f.find((C) => C !== N) ?? S)),
      (v = v.split("{npc}").join(N).split("{other}").join(S)));
  }
  const w = getAvailableEvents(l, "school");
  return {
    state: w.state,
    ok: !0,
    message: `在校门口看了一会儿学生们的日常——
${v}
（心情 +4）${
      w.text
        ? `
${w.text}`
        : ""
    }`,
  };
}

function payEmployeeWages(e) {
  let n = 0,
    s = 0;
  for (const a of e.employees) {
    const o = EMPLOYEE_MAP[a];
    if (!o) continue;
    const l = o.wage ?? 60,
      c = Math.min(l, e.coins);
    ((e.coins -= c), (n += c), c < l && (s += l - c));
  }
  return { wagePaid: n, wageShort: s };
}

function payUtilityBill(e, n) {
  const s = Math.min(n, e.coins);
  return ((e.coins -= s), { utilityPaid: s, utilityShort: n - s });
}

function accrueBankInterest(e) {
  const n = typeof e.bankSavings == "number" && e.bankSavings > 0 ? e.bankSavings : 0;
  if (n <= 0) return;
  const s = Math.min(50, Math.floor(n * 0.008));
  s > 0 && ((e.bankSavings = n + s), (e.stats.earned += s));
}

function deliverArrivedOrders(e, n) {
  const s = e.orders.filter((a) => a.arriveDay <= e.day);
  if (s.length === 0) return n;
  e.orders = e.orders.filter((a) => a.arriveDay > e.day);
  for (const a of s) {
    if (a.ingId === FISH_ORDER_TYPE) {
      const l = rollSeaCatch(),
        c = e.fishRecords[l.ingId] ?? 0;
      (l.sizeCm > c && (e.fishRecords[l.ingId] = l.sizeCm), recordCatch(e, l.ingId));
      const u = e.ingredients[l.ingId];
      (u ? (u.qty += 1) : (e.ingredients[l.ingId] = { qty: 1, freshness: 0 }),
        (e.seenIngredients ?? []).includes(l.ingId) ||
          (e.seenIngredients = [...(e.seenIngredients ?? []), l.ingId]),
        (n += 1));
      continue;
    }
    const o = e.ingredients[a.ingId];
    (o ? (o.qty += a.qty) : (e.ingredients[a.ingId] = { qty: a.qty, freshness: 0 }),
      recordCatch(e, a.ingId, a.qty),
      (n += a.qty));
  }
  return n;
}

function dailySpoilIngredients(e) {
  const n = (e.home.furniture ?? []).some((l) => l.fid === "f_fish_fridge"),
    s = (e.shopPlacements ?? []).some((l) => l.slice(0, l.lastIndexOf("_")) === "f_fridge");
  for (const [l, c] of Object.entries(e.ingredients)) {
    const u = INGREDIENT_MAP[l],
      f = (u == null ? void 0 : u.category) === "fish";
    (s && e.day % 2 === 1) ||
      (f && n && e.day % 2 === 1) ||
      (c.freshness < 3 && (c.freshness = c.freshness + 1));
  }
  for (const l of e.products) l.remaining -= 1;
  let a = 0;
  e.products = e.products.filter((l) => (l.remaining <= 0 ? ((a += 1), !1) : !0));
  const o = stackProducts(e.products, e.shelves);
  return (
    (e.products = o.products),
    (e.shelves = o.shelves.filter((l) => e.products.some((c) => c.pid === l.pid))),
    a
  );
}

let idSequence = 0;

function newEntityId(e) {
  return ((idSequence += 1), `${e}_${Date.now()}_${idSequence}`);
}

function orderFoodDelivery(e, n, s) {
  const a = DELIVERY_ITEM_INDEX[n];
  if (!a) return { state: e, ok: !1, message: "这个外卖商品不存在" };
  const o = Math.max(1, Math.min(9, Math.floor(s))),
    l = a.item.price * o,
    c = l >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE,
    u = l + c;
  if (e.coins < u) return { state: e, ok: !1, message: `金币不够，这单要 ¥${u}` };
  const f = deepClone(e);
  ((f.coins -= u), (f.stats.spent += u));
  const g = {
    id: newEntityId("fd"),
    shopId: a.shop.id,
    shopName: a.shop.name,
    shopEmoji: a.shop.emoji,
    items: [{ name: a.item.name, emoji: a.item.emoji, qty: o, price: a.item.price }],
    fee: c,
    total: u,
    arriveDay: f.day + 1,
  };
  f.foodDeliveries = [...(f.foodDeliveries ?? []), g];
  const x = c === 0 ? "（满 ¥30 免配送费）" : `（配送费 ¥${c}）`;
  return {
    state: f,
    ok: !0,
    message: `已下单 ${a.shop.name}「${a.item.name}」x${o}，共 ¥${u}${x}，明天 8:00 送到店里`,
  };
}

function settleFoodDeliveries(e) {
  const n = (e.foodDeliveries ?? []).filter((a) => a.arriveDay <= e.day);
  if (n.length === 0) return [];
  e.foodDeliveries = (e.foodDeliveries ?? []).filter((a) => a.arriveDay > e.day);
  const s = [];
  for (const a of n) {
    const o = a.items.map((l) => `${l.emoji} ${l.name} x${l.qty}`).join("、");
    s.push(`外卖送达：${a.shopEmoji} ${a.shopName}（${o}）已放进店内柜子，随时取用`);
  }
  return s;
}

function getPendingDeliveries(e) {
  return Array.isArray(e.foodDeliveries) ? e.foodDeliveries.filter((n) => n.arriveDay > e.day) : [];
}

function generateDeliveryOrders(e) {
  const n = Object.keys(e.recipes ?? {}).filter((o) => {
    var l;
    return (((l = RECIPE_RUNTIME_DATA[o]) == null ? void 0 : l.system) ?? "bakery") === "bakery";
  });
  if (n.length === 0) return 0;
  const s = 1 + Math.floor(Math.random() * 2);
  let a = 0;
  for (let o = 0; o < s; o += 1) {
    const l = n[Math.floor(Math.random() * n.length)],
      c = RECIPE_RUNTIME_DATA[l],
      u = COURIER_NAMES[Math.floor(Math.random() * COURIER_NAMES.length)],
      f = 1 + Math.floor(Math.random() * 2),
      g = Math.round(c.baseCost * f * 1.25),
      x = {
        id: newEntityId("do"),
        npcId: u.id,
        npcName: u.name,
        npcEmoji: u.emoji,
        recipeId: l,
        qty: f,
        price: g,
        day: e.day,
      };
    ((e.deliveryOrders = [...(e.deliveryOrders ?? []), x]), (a += 1));
  }
  return a;
}

function shipDeliveryOrder(e, n) {
  const s = Array.isArray(e.deliveryOrders) ? e.deliveryOrders : [],
    a = s.find((f) => f.id === n);
  if (!a) return { state: e, ok: !1, message: "这单不存在或已处理" };
  let o = 0;
  for (const f of e.products) f.recipeId === a.recipeId && (o += f.qty ?? 1);
  if (o < a.qty) {
    const f = RECIPE_RUNTIME_DATA[a.recipeId];
    return {
      state: e,
      ok: !1,
      message: `还差 ${a.qty - o} 份「${(f == null ? void 0 : f.name) ?? a.recipeId}」，先去厨房做出来吧`,
    };
  }
  const l = deepClone(e);
  let c = a.qty;
  for (const f of l.products) {
    if (c <= 0) break;
    if (f.recipeId !== a.recipeId) continue;
    const g = Math.min(c, f.qty ?? 1);
    ((f.qty = (f.qty ?? 1) - g),
      (c -= g),
      f.qty <= 0 &&
        ((l.products = l.products.filter((x) => x.pid !== f.pid)),
        (l.shelves = (l.shelves ?? []).filter((x) => x.pid !== f.pid))));
  }
  ((l.deliveryOrders = s.filter((f) => f.id !== n)),
    (l.cashRegister = (l.cashRegister ?? 0) + a.price),
    (l.stats.sold += a.qty),
    (l.stats.earned += a.price));
  const u = RECIPE_RUNTIME_DATA[a.recipeId];
  return {
    state: l,
    ok: !0,
    message: `${a.npcEmoji} ${a.npcName}的外卖已发货（${(u == null ? void 0 : u.name) ?? a.recipeId} x${a.qty}），¥${a.price} 存入收银台`,
  };
}

const SUSHI_STALL_RECIPE_IDS = ["sushi_roll", "fish_ball", "tempura"];

function listSushiStallStock(e) {
  const n = [];
  for (const s of SUSHI_STALL_RECIPE_IDS) {
    if (!(s in (e.recipes ?? {}))) continue;
    const a = RECIPE_RUNTIME_DATA[s],
      o = e.products.filter((l) => l.recipeId === s).reduce((l, c) => l + (c.qty ?? 1), 0);
    n.push({
      recipeId: s,
      name: (a == null ? void 0 : a.name) ?? s,
      emoji: (a == null ? void 0 : a.emoji) ?? "🍣",
      qty: o,
    });
  }
  return n;
}

function addToSushiStall(e, n) {
  if (!SUSHI_STALL_RECIPE_IDS.includes(n)) return { state: e, ok: !1, message: "寿司摊只收寿司和鱼丸" };
  if ((e.sushiStall ?? []).length >= 3)
    return { state: e, ok: !1, message: "寿司摊最多摆 3 种料理" };
  const s = e.products.find((f) => f.recipeId === n && (f.qty ?? 1) > 0);
  if (!s) {
    const f = RECIPE_RUNTIME_DATA[n];
    return {
      state: e,
      ok: !1,
      message: `没有「${(f == null ? void 0 : f.name) ?? n}」可摆，先去做一份吧`,
    };
  }
  const a = deepClone(e),
    o = a.products.find((f) => f.pid === s.pid);
  if (!o) return { state: e, ok: !1, message: "商品不见了" };
  ((o.qty = (o.qty ?? 1) - 1),
    o.qty <= 0 &&
      ((a.products = a.products.filter((f) => f.pid !== o.pid)),
      (a.shelves = (a.shelves ?? []).filter((f) => f.pid !== o.pid))));
  const l = [...(a.sushiStall ?? [])],
    c = l.find((f) => f.recipeId === n);
  (c ? (c.qty += 1) : l.push({ pid: `stall_${n}`, recipeId: n, qty: 1 }), (a.sushiStall = l));
  const u = RECIPE_RUNTIME_DATA[n];
  return {
    state: a,
    ok: !0,
    message: `🍣 已把「${(u == null ? void 0 : u.name) ?? n}」摆上寿司摊，明早自动卖完入账`,
  };
}

function removeFromSushiStall(e, n) {
  if (!(Array.isArray(e.sushiStall) ? e.sushiStall : []).find((u) => u.recipeId === n))
    return { state: e, ok: !1, message: "寿司摊上没有这个" };
  const o = deepClone(e),
    l = o.sushiStall.find((u) => u.recipeId === n);
  if (!l) return { state: e, ok: !1, message: "寿司摊上没有这个" };
  ((l.qty -= 1), l.qty <= 0 && (o.sushiStall = o.sushiStall.filter((u) => u.recipeId !== n)));
  const c = RECIPE_RUNTIME_DATA[n];
  return (
    o.products.push({
      pid: makeId(n),
      recipeId: n,
      quality: "good",
      remaining: (c == null ? void 0 : c.shelfDays) ?? 2,
      qty: 1,
    }),
    {
      state: o,
      ok: !0,
      message: `已从寿司摊撤下「${(c == null ? void 0 : c.name) ?? n}」，退回成品背包`,
    }
  );
}

function sellSushiStallStock(e) {
  const n = Array.isArray(e.sushiStall) ? e.sushiStall : [];
  if (n.length === 0) return 0;
  let s = 0;
  for (const a of n) {
    const o = RECIPE_RUNTIME_DATA[a.recipeId];
    if (!o) continue;
    const l = Math.round(o.baseCost * a.qty * 1.25);
    s += l;
  }
  return (
    (e.sushiStall = []),
    s > 0 &&
      ((e.cashRegister = (e.cashRegister ?? 0) + s),
      (e.stats.sold += n.reduce((a, o) => a + o.qty, 0)),
      (e.stats.earned += s)),
    s
  );
}

function bakeCustomCake(e, n) {
  var j, v;
  const s = Object.fromEntries(ALLERGEN_GROUPS.map((w) => [w.id, w])),
    a = { base: n.base, cream: n.cream, fill: n.fill, top: n.top },
    o = [];
  for (const w of ALLERGEN_GROUPS.map((N) => N.id)) {
    const N = s[w],
      S = N == null ? void 0 : N.options.find((C) => C.id === a[w]);
    if (!S) return { state: e, ok: !1, message: `${(N == null ? void 0 : N.name) ?? w}还没选好` };
    o.push({
      layer: w,
      name: S.name,
      emoji: S.emoji,
      price: S.price,
      ings: S.ings,
      allergy: S.allergy,
    });
  }
  if (n.allergy !== "none" && hasAllergenConflict(Object.values(a), n.allergy)) {
    const w = ((j = ALLERGEN_OPTIONS.find((N) => N.id === n.allergy)) == null ? void 0 : j.name) ?? n.allergy;
    return { state: e, ok: !1, message: `客人对${w}过敏！请换掉含${w}的选项` };
  }
  const l = {};
  for (const w of o) for (const [N, S] of Object.entries(w.ings)) l[N] = (l[N] ?? 0) + S;
  for (const [w, N] of Object.entries(l)) {
    const S = e.ingredients[w];
    if (!S || S.qty < N)
      return {
        state: e,
        ok: !1,
        message: `材料不够：${w} 还差 ${N - ((S == null ? void 0 : S.qty) ?? 0)} 份`,
      };
    if (S.freshness === 3) return { state: e, ok: !1, message: "有食材已经腐烂，不能用了" };
  }
  const c = checkTimeBlocked(e, TIME_COST.bakeMedium / 60);
  if (c) return { state: e, ok: !1, message: c };
  const u = deepClone(e);
  advanceHours(u, TIME_COST.bakeMedium);
  const f = consumeSatiety(u, TIME_COST.bakeMedium / 60);
  (decayMood(u, 6), (u.energy = Math.max(0, u.energy - 10)));
  for (const [w, N] of Object.entries(l)) {
    const S = u.ingredients[w];
    S && ((S.qty -= N), S.qty <= 0 && delete u.ingredients[w]);
  }
  const g = [],
    x = o.find((w) => w.layer === "base");
  x && g.push(x.name.replace("戚风", "").replace("胚", ""));
  for (const w of ["cream", "fill", "top"]) {
    const N = o.find((S) => S.layer === w);
    N &&
      (w === "cream"
        ? g.push(N.name.replace("奶油", ""))
        : w === "fill"
          ? g.push(N.name.replace("夹心", ""))
          : g.push(N.name.replace("装饰", "").replace("塔顶", "").replace("糖霜", "")));
  }
  const m = `${g.filter(Boolean).join("")}定制蛋糕`,
    p = CUSTOM_CAKE_BASE_PRICE + o.reduce((w, N) => w + N.price, 0);
  ((u.customCakeCounter = (u.customCakeCounter ?? 0) + 1),
    u.products.push({
      pid: `custom_${Date.now()}_${u.customCakeCounter}`,
      recipeId: CUSTOM_CAKE_RECIPE_ID,
      quality: "good",
      remaining: 2,
      qty: 1,
      customName: m,
      customPrice: p,
    }),
    (u.bakeSkill = Math.min(100, (u.bakeSkill ?? 0) + 2)),
    (u.cookSkill = Math.min(100, (u.cookSkill ?? 0) + 1)),
    (u.hygiene = Math.max(0, (u.hygiene ?? 100) - 6)));
  const y =
    n.allergy === "none"
      ? "客人不过敏"
      : `已避开${((v = ALLERGEN_OPTIONS.find((w) => w.id === n.allergy)) == null ? void 0 : v.name) ?? ""}过敏原`;
  return {
    state: u,
    ok: !0,
    message: `🎂 「${m}」做好了（¥${p}），已收进成品背包可上架出售（${y}）${f ? "（饿着肚子干活，好难受）" : ""}`,
  };
}

function calcCustomCakePrice(e) {
  var a;
  let n = CUSTOM_CAKE_BASE_PRICE;
  const s = Object.fromEntries(ALLERGEN_GROUPS.map((o) => [o.id, o]));
  for (const [o, l] of Object.entries(e)) {
    const c = (a = s[o]) == null ? void 0 : a.options.find((u) => u.id === l);
    c && (n += c.price);
  }
  return n;
}

function travelToBeach(e) {
  const n = e.vehicles ?? [];
  if (n.length === 0)
    return { state: e, ok: !1, message: "还没有任何交通工具，先去商店街买公交卡/三轮车/私家车吧" };
  if (e.energy < 5) return { state: e, ok: !1, message: "精力不足，先休息一下" };
  const s = checkTimeBlocked(e, 1);
  if (s) return { state: e, ok: !1, message: s };
  const a = deepClone(e);
  ((a.hour += 1), (a.energy -= 5), consumeSatiety(a, 1));
  const o = VEHICLES.find((l) => l.id === n[0]);
  return {
    state: a,
    ok: !0,
    message: `搭${(o == null ? void 0 : o.emoji) ?? ""}${(o == null ? void 0 : o.name) ?? "交通工具"}来到海边，海风带着咸味扑面而来！`,
  };
}

const BEACH_ACTIVITIES = [
  { id: "sandcastle", name: "堆沙堡", emoji: "🏰", desc: "挖沙堆塔，童心满满", energy: 8, mood: 8 },
  {
    id: "swim",
    name: "游泳",
    emoji: "🏊",
    desc: "下海游两圈，浑身舒坦",
    energy: 15,
    mood: 6,
    health: 3,
  },
  {
    id: "surf",
    name: "冲浪",
    emoji: "🏄",
    desc: "踏浪而行，挑战平衡",
    energy: 20,
    mood: 12,
    sport: 3,
  },
  {
    id: "sunbathe",
    name: "日光浴",
    emoji: "🌞",
    desc: "躺在沙滩上晒太阳",
    energy: 6,
    mood: 6,
    health: 2,
  },
];

function doBeachActivity(e, n) {
  const s = BEACH_ACTIVITIES.find((u) => u.id === n);
  if (!s) return { state: e, ok: !1, message: "没有这个活动" };
  if ((e.coastDoneToday ?? []).includes(n))
    return { state: e, ok: !1, message: `${s.name}今天已经玩过了，明天再来` };
  if (e.energy < s.energy)
    return { state: e, ok: !1, message: `精力不够，${s.name}需要 ${s.energy} 点精力` };
  const a = checkTimeBlocked(e, TIME_COST.coastPlay / 60);
  if (a) return { state: e, ok: !1, message: a };
  const o = deepClone(e);
  advanceHours(o, TIME_COST.coastPlay);
  const l = consumeSatiety(o, TIME_COST.coastPlay / 60);
  ((o.energy = Math.max(0, o.energy - s.energy)),
    (o.mood = Math.min(100, (o.mood ?? 80) + s.mood)),
    s.health && (o.health = Math.min(100, (o.health ?? 80) + s.health)),
    s.sport && (o.sportSkill = Math.min(100, (o.sportSkill ?? 0) + s.sport)),
    (o.coastDoneToday = [...(o.coastDoneToday ?? []), n]));
  const c = [];
  return (
    s.mood > 0 && c.push(`心情 +${s.mood}`),
    s.health && c.push(`健康 +${s.health}`),
    s.sport && c.push(`运动技能 +${s.sport}`),
    {
      state: o,
      ok: !0,
      message: `${s.emoji} ${s.name}玩得很开心（${c.join("，")}）${l ? "（饿着肚子玩，好难受）" : ""}`,
    }
  );
}

function __tmPsych(s) {
  const p =
    s.psych ??
    (s.psych = {
      dep: 0,
      dis: 0,
      lowDays: 0,
      deepDays: 0,
      sleepless: 0,
      disDays: 0,
      stable: 0,
      stableD: 0,
      med: 0,
      bipolar: false,
    });
  return p;
}

function __tmPsychSR(e) {
  const p = e && e.psych;
  if (!p || p.bipolar) return 1;
  const m = { 1: 0.9, 2: 0.75, 3: 0.5 },
    d = { 1: 0.8, 2: 0.65 };
  return Math.min(m[p.dep] ?? 1, d[p.dis] ?? 1);
}

function __tmPsychTick(n) {
  const p = __tmPsych(n);
  const mood = n.mood ?? 100,
    health = n.health ?? 100;
  if (mood < 25) {
    p.lowDays++;
    p.deepDays++;
  } else if (mood < 40) {
    p.lowDays++;
    p.deepDays = 0;
  } else {
    p.lowDays = 0;
    p.deepDays = 0;
  }
  if (p.dep === 0 && p.lowDays >= 3) p.dep = 1;
  else if (p.dep === 1 && (p.deepDays >= 3 || p.lowDays >= 8)) p.dep = 2;
  else if (p.dep === 2 && p.deepDays >= 8) p.dep = 3;
  if (n.__tmSlept) {
    p.sleepless++;
  } else {
    p.sleepless = 0;
  }
  if (p.dis > 0) p.disDays++;
  if (p.dis === 0 && p.sleepless >= 2) p.dis = 1;
  if (p.dis === 1 && p.disDays >= 5) p.dis = 2;
  const okMood = mood >= 40,
    okMed = (p.med ?? 0) > 0;
  if (p.dep > 0) {
    if (okMed && okMood) {
      p.stable++;
    } else {
      p.stable = 0;
    }
    if (p.stable >= 3) {
      p.dep--;
      p.stable = 0;
    }
  }
  if (p.dis > 0) {
    if (okMed && okMood && health >= 60) {
      p.stableD++;
    } else {
      p.stableD = 0;
    }
    if (p.stableD >= 3) {
      p.dis--;
      p.disDays = 0;
      p.stableD = 0;
    }
  }
  if (p.med > 0) p.med--;
  if (p.bipolar) {
    n.hour = 21;
  } else {
    const L = { dep: { 1: 1, 2: 2, 3: 3 }, dis: { 1: 4, 2: 5 } };
    const a = L.dep[p.dep] ?? 0,
      b = L.dis[p.dis] ?? 0;
    const h = Math.max(a, b);
    if (h > 0) n.hour = Math.min(21, DAY_START_HOUR + h);
  }
  n.__tmSlept = false;
}

/* ============ 死亡系统 · 心境相关每日死亡概率 ============
   每天结束时按店主当日心境掷一次死亡概率：
   - 双相（bipolar）：3%～10% 之间——每天在区间内取一个费率再判定。
   - 重度抑郁（dep>=3）：固定 5%。
   - 中度抑郁（dep===2）：固定 3%。
   - 轻度抑郁（dep===1）/ 正常：不因心境致死。
   判定用当天（跨天前）的 psych 状态，不依赖会被 tick 动态升降的结果，
   以保证「中度就是 3%、重度就是 5%」的确定语义。
   双相优先于抑郁等级判定（双相是独立且更重的诊断）。 */
function __tmPsychMortality(n) {
  const p = (n && n.psych) || {},
    bipolar = p.bipolar === !0,
    dep = Math.max(0, Math.floor(typeof p.dep == "number" ? p.dep : 0));
  if (bipolar) {
    /* 3%～10% 区间。测试钩子 __CAKE_DEATH_TEST.bipolarRate 可覆盖区间内费率。 */
    const t = window.__CAKE_DEATH_TEST || {},
      hi = 0.1,
      lo = 0.03;
    if (typeof t.bipolarRate == "number") return Math.min(hi, Math.max(lo, t.bipolarRate));
    return lo + Math.random() * (hi - lo);
  }
  if (dep >= 3) return 0.05;
  if (dep === 2) return 0.03;
  return 0;
}

/* 掷一次「今日是否因心境离世」。测试钩子 __CAKE_DEATH_TEST.roll 可覆盖判定随机数，
   __CAKE_DEATH_TEST.forceCause 可强制死因，便于精确验证概率边界而不靠碰运气。 */
function __tmPsychDeathRoll(n) {
  const rate = __tmPsychMortality(n);
  if (rate <= 0) return null;
  const t = window.__CAKE_DEATH_TEST || {},
    roll = typeof t.roll == "number" ? t.roll : Math.random();
  return roll < rate ? "psych" : null;
}

function advanceToNextDay(e, r) {
  var F;
  const n = deepClone(e),
    sleptOvernight = (r == null ? void 0 : r.sleptOvernight) === !0;
  ((n.day += 1), (n.season = seasonIndexOf(n.day)));
  /* 死亡机制：连续超过一周（7 天）没有进食即自动死亡。
     ateToday 由 commit 层在饱食度上升（=玩家吃了东西）时置位，覆盖全部进食入口。
     用「日计数器」而非绝对天数锚点，避免老存档迁移时 day 被覆盖导致误判。
     今天吃过 → 清零并翻页；没吃 → 连续未进食 +1；满 7 天判死。 */
  if (n.ateToday === !0) {
    n.hungryDays = 0;
    n.ateToday = !1;
  } else {
    n.hungryDays = Math.max(0, (typeof n.hungryDays == "number" ? n.hungryDays : 0) + 1);
  }
  if (!n.dead && n.hungryDays >= 7) { n.dead = true; n.deathCause = "starve"; }
  /* 死亡系统 · 心境相关每日死亡概率：用跨天前的当日心境判定，此时 __tmPsychTick 尚未执行。
     饿死已判死则不重复掷骰。判定命中写入 deathCause="psych"，供死亡弹窗显示不同死因文案。 */
  if (!n.dead && __tmPsychDeathRoll(n) === "psych") { n.dead = true; n.deathCause = "psych"; }
  const s = weatherOfDay(n.day),
    a = WEATHER_TYPES[s].outdoor;
  ((n.health = Math.max(0, n.health - 5)),
    (n.hygiene = Math.max(0, (n.hygiene ?? 100) - 4)),
    (n.combedToday = !1));
  let o = !1;
  ((n.satiety = Math.max(0, (n.satiety ?? 70) - 12)),
    n.satiety <= 0 &&
      ((o = !0),
      (n.health = Math.max(0, n.health - 5)),
      (n.mood = Math.max(0, (n.mood ?? 100) - 5))));
  let l = !1;
  ((n.__tmSlept = sleptOvernight ? !1 : n.home.sleptToday <= 0),
    n.__tmSlept && ((l = !0), (n.health = Math.max(0, n.health - 12))));
  const { wagePaid: c, wageShort: u } = payEmployeeWages(n),
    { utilityPaid: f, utilityShort: g } = payUtilityBill(n, dailyUtilityFee(n)),
    x = chargeTruckMonthlyFee(n);
  let m = !1;
  if (n.aquariumFish) {
    const J = (((F = n.aquariumDecor) == null ? void 0 : F.length) ?? 0) >= 3;
    ((n.aquariumDirtyDay = (n.aquariumDirtyDay ?? 0) + 1),
      !n.aquariumDirty &&
        (n.aquariumDirtyDay >= 3 || (n.aquariumDirtyDay >= 2 && Math.random() < 0.5)) &&
        (n.aquariumDirty = !0),
      n.aquariumDirty &&
        ((n.aquariumCleanliness = Math.max(0, (n.aquariumCleanliness ?? 0) - 15)),
        (n.aquariumHealth = Math.max(0, (n.aquariumHealth ?? 0) - (J ? 10 : 15)))),
      (n.aquariumLastFeedDay ?? 0) > 0 &&
        n.day - n.aquariumLastFeedDay > 1 &&
        (n.aquariumHealth = Math.max(0, (n.aquariumHealth ?? 0) - (J ? 5 : 10))),
      n.aquariumHealth <= 0 &&
        ((n.aquariumFish = !1),
        (n.aquariumHealth = 0),
        (n.aquariumDirty = !0),
        (n.aquariumDirtyDay = 0),
        (m = !0)));
  }
  ((n.fishOrderCooldown = Math.max(0, (n.fishOrderCooldown ?? 0) - 1)),
    (n.energy = Math.min(
      MAX_ENERGY,
      Math.round(
        MAX_ENERGY *
          (sleptOvernight
            ? 0.9 + 0.1 * (n.health / MAX_HEALTH)
            : 0.55 + 0.45 * (n.health / MAX_HEALTH)),
      ),
    )),
    (n.mood = a ? Math.min(MAX_MOOD, (n.mood ?? 100) + 8) : Math.max(0, (n.mood ?? 100) - 8)),
    sleptOvernight && (n.mood = Math.min(MAX_MOOD, (n.mood ?? 100) + 6)));
  const p = getActiveFestival(n.day);
  (p != null && p.moodBonus && (n.mood = Math.min(MAX_MOOD, n.mood + p.moodBonus)),
    (n.hour = DAY_START_HOUR),
    __tmPsychTick(n),
    (n.dailyTaste = randomInjuryType()),
    (n.visits =
      BASE_DAILY_VISITS +
      (isWeekendDay(n.day) ? 1 : 0) +
      Math.floor(Math.random() * 2) +
      ((n.commercialBoostDays ?? 0) > 0 ? BUSINESS_EVENT_MAX_DAYS : 0) +
      getFestivalVisitsBonus(n.day)),
    (n.chattedToday = []),
    (n.chatHourKey = ""),
    (n.chatCountsThisHour = {}),
    (n.datedToday = []),
    (n.todayEvents = []),
    (n.birthdayCelebrated = []),
    updateAllPlants(n),
    (n.stargazedToday = !1),
    (n.charitySoldToday = 0),
    dayOfYear(n.day) > SUMMER_END_DAY && (n.charityApplied = !1),
    (n.commercialBoostDays = Math.max(0, (n.commercialBoostDays ?? 0) - 1)),
    (n.home.sleptToday = 0),
    (n.home.playedToday = 0),
    (n.exercisedToday = 0),
    (n.caughtToday = 0),
    (n.fishedToday = 0),
    (n.riverGatheredToday = 0),
    (n.plazaFlowerSoldToday = 0),
    (n.flowerShopPitchToday = 0),
    (n.shelterDonatedToday = 0),
    (n.shelterEventsToday = 0),
    accrueBankInterest(n));
  const y = deliverArrivedOrders(n, 0),
    j = deliverPendingOrders(n),
    v = settleGovTickets(n),
    w = dailySpoilIngredients(n),
    N = settleFoodDeliveries(n);
  N.length > 0 && (n.todayEvents = [...n.todayEvents, ...N]);
  const S = generateDeliveryOrders(n),
    C = sellSushiStallStock(n);
  n.coastDoneToday = [];
  /* 系统侧：跨天时由内部主线往玩家手册投放里程碑通知（每 7 天经营周记 / 当天节日）。
     只写手册通知，不改主线步骤与委托，也不影响结算返回值；失败一律静默。 */
  try {
    var __msApi = window.Cake && window.Cake.mainStoryApi;
    if (__msApi && typeof __msApi.rollDayNotices === "function") __msApi.rollDayNotices(n);
  } catch (e) {}
  let V;
  const E = Math.min(
    INTRO_TIPS.length,
    Math.max(0, typeof n.newbieTipsShown == "number" ? n.newbieTipsShown : INTRO_TIPS.length),
  );
  return (
    E < INTRO_TIPS.length && ((V = INTRO_TIPS[E]), (n.newbieTipsShown = E + 1)),
    {
      state: n,
      expired: w,
      delivered: y,
      deliveredGoods: j,
      govDone: v,
      wagePaid: c,
      wageShort: u,
      noSleep: l,
      utilityPaid: f,
      utilityShort: g,
      truckFeePaid: x.paid,
      truckFeeShort: x.short,
      fishDied: m,
      starving: o,
      weather: s,
      sleptOvernight: sleptOvernight,
      deliveredFood: N.length,
      deliveryOrders: S,
      sushiIncome: C,
      newbieTip: V,
    }
  );
}

function safeParseJson(e, n) {
  if (!e) return n;
  try {
    return JSON.parse(e);
  } catch {
    return n;
  }
}

function sanitizeStringArray(e) {
  const n = safeParseJson(e, []);
  return Array.isArray(n) ? n.filter((s) => typeof s == "string") : [];
}

function sanitizeThemeId(e) {
  return typeof e == "string" && e in CAKE_THEME_MAP ? e : "sweet";
}

function sanitizeCounterMap(e, n) {
  const s = safeParseJson(e, {}),
    a = {},
    o = new Set(n);
  for (const [l, c] of Object.entries(s))
    o.has(l) && typeof c == "number" && c >= 0 && (a[l] = Math.floor(c));
  return a;
}

function sanitizeFlagMap(e, n) {
  const s = safeParseJson(e, {}),
    a = {},
    o = new Set(n);
  for (const [l, c] of Object.entries(s)) o.has(l) && (c === 1 || c === 2) && (a[l] = c);
  return a;
}

function sanitizeIngredients(e) {
  const n = safeParseJson(e, {}),
    s = {};
  for (const [a, o] of Object.entries(n)) {
    if (!INGREDIENT_MAP[a]) continue;
    const l = typeof (o == null ? void 0 : o.qty) == "number" && o.qty > 0 ? Math.floor(o.qty) : 0,
      c = typeof (o == null ? void 0 : o.freshness) == "number" ? o.freshness : 0,
      u = Math.min(3, Math.max(0, c));
    l > 0 && (s[a] = { qty: l, freshness: u });
  }
  return s;
}

function sanitizeProducts(e) {
  const n = safeParseJson(e, []),
    s = [];
  for (const a of n) {
    if (
      typeof (a == null ? void 0 : a.pid) != "string" ||
      typeof (a == null ? void 0 : a.recipeId) != "string" ||
      !RECIPE_RUNTIME_DATA[a.recipeId]
    )
      continue;
    const o =
        a.quality === "perfect" ||
        a.quality === "good" ||
        a.quality === "normal" ||
        a.quality === "fail"
          ? a.quality
          : "normal",
      l = typeof a.remaining == "number" && a.remaining > 0 ? Math.floor(a.remaining) : 0;
    if (l <= 0) continue;
    const c = typeof a.qty == "number" && a.qty > 0 ? Math.floor(a.qty) : 1,
      u = { pid: a.pid, recipeId: a.recipeId, quality: o, remaining: l, qty: c };
    (typeof a.customName == "string" && a.customName && (u.customName = a.customName.slice(0, 30)),
      typeof a.customPrice == "number" &&
        a.customPrice > 0 &&
        (u.customPrice = Math.floor(a.customPrice)),
      s.push(u));
  }
  return s;
}

function sanitizeRecipeProgress(e) {
  const n = safeParseJson(e, {}),
    s = {};
  for (const [a, o] of Object.entries(n))
    RECIPE_RUNTIME_DATA[a] && (s[a] = typeof o == "number" && o >= 0 ? Math.floor(o) : 0);
  return s;
}

function sanitizeAffection(e) {
  const n = safeParseJson(e, {}),
    s = {};
  for (const [a, o] of Object.entries(n))
    NPC_RUNTIME_DATA[a] && (s[a] = typeof o == "number" && o >= 0 ? Math.floor(o) : 0);
  return s;
}

function sanitizePriceMultipliers(e) {
  const n = safeParseJson(e, []),
    s = [];
  for (const a of n) {
    if (typeof (a == null ? void 0 : a.pid) != "string") continue;
    const o = typeof a.mult == "number" && a.mult >= 0.3 && a.mult <= 5 ? a.mult : 1;
    s.push({ pid: a.pid, mult: o });
  }
  return s;
}

function sanitizeCounters(e) {
  const n = safeParseJson(e, {}),
    s = createEmptyCounters(),
    a = [
      "baked",
      "perfects",
      "sold",
      "earned",
      "spent",
      "chats",
      "gifted",
      "dated",
      "explores",
      "exercises",
      "cleanups",
      "fishes",
      "loaches",
      "injuries",
      "bigFish",
      "maxCoins",
    ];
  for (const o of a) {
    const l = n[o];
    s[o] = typeof l == "number" && l >= 0 ? Math.floor(l) : 0;
  }
  return s;
}

function sanitizeCraftedFurniture(e) {
  const n = Array.isArray(e) ? e : [],
    s = [];
  for (const a of n) {
    if (typeof a != "object" || a === null) continue;
    const o = a;
    if (typeof o.fid != "string" || !FURNITURE_MAP[o.fid]) continue;
    const l = typeof o.material == "string" && WOOD_MAP[o.material] ? o.material : "pine",
      c = typeof o.color == "string" && COLOR_MAP[o.color] ? o.color : "natural",
      u = o.floor === "1f" || o.floor === "2f" || o.floor === "3f" ? o.floor : floorForFurniture(o.fid);
    s.push({
      fid: o.fid,
      material: l,
      color: c,
      desc: typeof o.desc == "string" ? o.desc : `${WOOD_MAP[l].name}·${COLOR_MAP[c].name}的${FURNITURE_MAP[o.fid].name}`,
      crafted: o.crafted === !0,
      floor: u,
    });
  }
  return s;
}

function sanitizeMaterials(e) {
  const n = safeParseJson(typeof e == "string" ? e : JSON.stringify(e ?? {}), {}),
    s = {};
  for (const [a, o] of Object.entries(n))
    MATERIAL_MAP[a] && typeof o == "number" && o > 0 && (s[a] = Math.floor(o));
  return s;
}

function sanitizeBooks(e) {
  const n = Array.isArray(e.readBooks) ? e.readBooks.filter((c) => typeof c == "string") : [],
    s = Array.isArray(e.ownedBooks)
      ? e.ownedBooks.filter((c) => typeof c == "string" && !!BOOK_MAP[c])
      : [],
    a = [];
  for (const c of [...s, ...n]) BOOK_MAP[c] && !a.includes(c) && a.push(c);
  a.length === 0 && a.push("book_basic");
  const o = safeParseJson(
      typeof e.bookProgress == "string" ? e.bookProgress : JSON.stringify(e.bookProgress ?? {}),
      {},
    ),
    l = {};
  for (const [c, u] of Object.entries(o))
    BOOK_MAP[c] && typeof u == "number" && (l[c] = Math.min(100, Math.max(0, Math.floor(u))));
  return { readBooks: n, ownedBooks: a, bookProgress: l };
}
