function getRelationIds(e) {
  const n = NPC_FAMILY_TREE[e],
    s = new Set();
  for (const a of ["lover", "bestFriends", "friends", "siblings", "eternalFriends"])
    for (const o of (n == null ? void 0 : n[a]) ?? []) s.add(o);
  return [...s];
}

function getRelatedNpcs(e) {
  var a;
  const n = [],
    s = getRelationIds(e);
  for (const o of s) {
    const l = NPC_RUNTIME_DATA[o];
    if (!l) continue;
    const c = ((a = RECIPE_RUNTIME_DATA[l.likes]) == null ? void 0 : a.name) ?? l.likes,
      u = NPC_SEASON_DISHES[o];
    if (
      (n.push({
        id: `friend-${e}-${o}-talk`,
        category: "friend",
        text: `${l.name}最近怎么样，见面总想问问 TA 的近况。`,
        tags: ["朋友", l.name],
      }),
      l.birthday &&
        n.push({
          id: `friend-${e}-${o}-birthday`,
          category: "friend_birthday",
          text: `${l.name}的生日是${l.birthday.month}月${l.birthday.day}日，日子我记着呢。`,
          tags: ["朋友的生日", l.name],
        }),
      c &&
        n.push({
          id: `friend-${e}-${o}-like`,
          category: "friend_hobby",
          text: `${l.name}最爱${c}，一说起这个眼睛都亮了。`,
          tags: ["朋友的爱好", l.name],
        }),
      u)
    )
      for (const f of u.leisure.slice(0, 2))
        n.push({
          id: `friend-${e}-${o}-hobby-${f}`,
          category: "friend_hobby",
          text: `${l.name}闲下来就爱${f}，这点我门儿清。`,
          tags: ["朋友的爱好", l.name],
        });
  }
  return n;
}

function hasRelations(e) {
  return getRelationIds(e).some((n) => !!NPC_RUNTIME_DATA[n]);
}

const NPC_GROUP_CORE = [
    "xiaotian",
    "ahe",
    "xiaomei",
    "wen_yanzhou",
    "yang_yinuo",
    "su_jianguo",
    "su_lihua",
    "zhou_ziang",
    "song_xiaoyu",
    "fang_yuanshan",
    "fang_xuemei",
    "chen_yuan",
    "wang_fang",
    "gao_jianjun",
    "he_jing",
    "su_zhiyuan",
    "liu_qing",
    "du_ruoxi",
    "bai_qiuqiu",
    "shen_jiaoyan",
    "shen_jiahe",
    "gu_yifan",
    "xu_xiaoman",
    "tian_tian",
    "zheng_zixuan",
    "lin_xiaolu",
    "zhao_weimin",
    "song_yanan",
  ],
  NPC_GROUP_STUDENT = ["duoduo", "dabao", "fang_tangtang", "chen_xiaobei", "su_xiaoya", "gao_yang"],
  NPC_GROUP_ELDER = [
    "wang_xiuying",
    "chen_yongfu",
    "lin_dahai",
    "zhao_chunmei",
    "tian_guanglin",
    "sun_yumei",
    "xu_deming",
    "liu_guifang",
    "wen_shouren",
    "luo_xiuqing",
    "yang_zhiqiang",
    "chen_meihua",
    "gu_zhengping",
    "chen_hulan",
    "zheng_haibo",
    "wu_lijuan",
    "lin_mo",
    "zhou_xiaoyun",
    "du_guodong",
    "jiang_xue",
    "bai_shijie",
    "yao_jing",
    "shen_guohao",
    "han_yaqin",
  ];

function buildNpcFactProfile(e) {
  const n = {
      work: NPC_HOBBY_LINES[e] ?? [],
      hobby: NPC_FREE_TIME_LINES[e] ?? [],
      favoriteFood: NPC_FAVORITE_DISHES[e] ?? [],
      favoriteSolarTerm: NPC_BIRTH_SOLAR_TERM[e] ?? "",
      dislikedSolarTerm: NPC_FAVORITE_SOLAR_TERM[e] ?? "",
      workAttitude: NPC_MOTTOS[e] ?? [],
      family: NPC_FAMILY_LINES[e] ?? [],
    },
    s = NPC_PARTNER_LINES[e];
  return (s && (n.lover = s), e in NPC_FRIEND_LINES && (n.parentsDaily = NPC_FRIEND_LINES[e]), n);
}

function buildNpcFactProfiles(e) {
  const n = {};
  for (const s of e) n[s] = buildNpcFactProfile(s);
  return n;
}

buildNpcFactProfiles(NPC_GROUP_CORE);

buildNpcFactProfiles(NPC_GROUP_STUDENT);

buildNpcFactProfiles(NPC_GROUP_ELDER);

const NPC_FACT_PROFILES = buildNpcFactProfiles([...NPC_GROUP_CORE, ...NPC_GROUP_STUDENT, ...NPC_GROUP_ELDER]);

function getActiveSolarTerm(e) {
  const n = dayToDate(e),
    s = getLunarDate(e);
  for (const a of FESTIVALS)
    if (a.lunar) {
      if (s.month === a.month && s.day === a.day) return a;
    } else if (n.month === a.month && n.day === a.day) return a;
  return null;
}

function getUpcomingBirthdayFriend(e, n) {
  var u, f;
  const s = dayToDate(e),
    a = new Set(),
    o = NPC_FAMILY_TREE[n];
  for (const g of ["lover", "bestFriends", "friends", "siblings", "eternalFriends"])
    for (const x of (o == null ? void 0 : o[g]) ?? []) a.add(x);
  const l = NPC_PARTNER_MAP[n];
  l && a.add(l.partner);
  const c = s.month * 100 + s.day;
  for (const g of a) {
    const x = (u = NPC_RUNTIME_DATA[g]) == null ? void 0 : u.birthday;
    if (!x) continue;
    let p = x.month * 100 + x.day - c;
    if ((p < -300 && (p += 366), p >= 0 && p <= 3))
      return { friend: ((f = NPC_RUNTIME_DATA[g]) == null ? void 0 : f.name) ?? "TA" };
  }
  return null;
}

function buildFestivalSmallTalk(e, n) {
  const s = [],
    a = (x, m, p, y, j = []) => {
      s.push({ id: x, category: m, text: p, lines: y, tags: j });
    },
    o = getActiveSolarTerm(e.day);
  if (o) {
    const x = slotOfHour(e.hour),
      m = getNpcLocationAt(n, e.hour, e.day),
      p = FESTIVAL_ACTIVITY_LABELS[o.id] ?? "过节",
      y = isStallSeller(n),
      j = (F) => y || !isStallWorkText(F);
    actionModeOf(n);
    const v = festivalModeBaseOf(o.id),
      w = [...v.base, ...v.close]
        .map((F) => F.replaceAll("{festival}", o.name).replaceAll("{short}", p))
        .filter(j),
      N = festivalAmbientLine(o.id, m.place, x)
        .map((F) => F.replaceAll("{festival}", o.name).replaceAll("{short}", p))
        .filter(j),
      S = (FESTIVAL_CHAT_LINES[o.id] ?? []).map((F) => F.replaceAll("{festival}", o.name)).filter(j),
      C = getFestivalEventByMode(n, e.day, e.hour),
      V = C ? (GROUP_CHAT_LINES[C] ?? []).map((F) => F.replaceAll("{festival}", o.name)).filter(j) : [],
      E = [...w, ...N, ...V, ...S].filter((F, J, H) => H.indexOf(F) === J);
    if (
      (E.length > 0 &&
        a(`sit-festival-${o.id}`, "general", `今天是${o.name}，镇上的气氛跟平时不一样。`, E, [
          o.name,
        ]),
      C)
    ) {
      const F = ACTION_GROUPS[C];
      for (const [J, H] of (GROUP_CHAT_LINES[C] ?? []).entries())
        j(H) &&
          s.push({
            id: `sit-festival-mode-${C}-${J}`,
            category: "general",
            text: `过节时（${(F == null ? void 0 : F.name) ?? ""}）聊聊今天的见闻。`,
            lines: [H.replaceAll("{festival}", o.name)],
            tags: [o.name, (F == null ? void 0 : F.name) ?? ""],
          });
    }
    for (const F of festivalModeLinesOf(o.id))
      (!y && (isStallWorkText(F.text) || (F.lines ?? []).some((J) => isStallWorkText(J)))) ||
        s.push({
          id: `sit-festival-mode-${F.id}`,
          category: "general",
          text: F.text,
          lines: F.lines && F.lines.length > 0 ? F.lines : [F.text],
          tags: F.tags ?? [o.name],
        });
  }
  e.charityApplied &&
    CHARITY_CHAT_LINES.forEach((x, m) => {
      a(`sit-charity-${m + 1}`, "general", "义卖还在进行中，大家都很热心。", [x], ["义卖"]);
    });
  const l = getUpcomingBirthdayFriend(e.day, n);
  l &&
    BIRTHDAY_CHAT_LINES.forEach((x, m) => {
      a(
        `sit-birthday-${m + 1}`,
        "friend_birthday",
        `${l.friend}的生日快到了，得提前准备起来。`,
        [x.replaceAll("{friend}", l.friend)],
        ["朋友的生日", l.friend],
      );
    });
  const c = weatherOfDay(e.day);
  (WEATHER_CHAT_LINES[c] ?? []).forEach((x, m) => {
    a(`sit-weather-${c}-${m + 1}`, "general", "今天的天气，正好值得聊两句。", [x], ["天气"]);
  });
  const u = slotOfHour(e.hour);
  (TIMESLOT_CHAT_LINES[u] ?? []).forEach((x, m) => {
    a(`sit-time-${u}-${m + 1}`, "general", "这个时间点，有些话正应景。", [x], ["时段"]);
  });
  const f = affectionTierOf(e.affection[n] ?? 0);
  f !== "stranger" &&
    (RELATION_CHAT_LINES[f] ?? []).forEach((x, m) => {
      a(`sit-relation-${f}-${m + 1}`, "general", "咱们的交情，有些话想当面跟你说。", [x], ["关系"]);
    });
  const g = NPC_SEASON_DISHES[n];
  if (g) {
    const x = SEASON_NAME_TABLE[Object.keys(SEASON_NAME_TABLE)[seasonIndexOf(e.day)]];
    g.season === x
      ? a(
          `sit-season-${n}`,
          "general",
          `现在正是我最喜欢的${g.season}。`,
          [`现在正是我最喜欢的${g.season}，天气好得让人想做很多点心！`],
          ["季节", "偏好"],
        )
      : a(
          `sit-season-${n}`,
          "general",
          `我最喜欢的季节是${g.season}。`,
          [`我最喜欢的季节是${g.season}，可惜现在是${x}……各有各的好吧。`],
          ["季节", "偏好"],
        );
  }
  return s;
}

const usedLineTextSet = new Set([
  ...GENERAL_CHAT_LINES.map((e) => e.text),
  ...Object.values(MODE_LINES)
    .flat()
    .map((e) => e.text),
  ...Object.values(SOLAR_TERM_LINES)
    .flat()
    .map((e) => e.text),
]);

function getUnusedSmallTalk(e, n) {
  return buildFestivalSmallTalk(e, n).filter((s) => !usedLineTextSet.has(s.text));
}

function buildNpcFactLines(e, n) {
  const s = [],
    a = (o, l, c, u) => {
      s.push({ id: `npc-${e}-${o}-${c}`, category: o, text: l, weight: u, tags: [o] });
    };
  return (
    n.work.forEach((o, l) => a("work", o, l + 1)),
    n.hobby.forEach((o, l) => a("hobby", o, l + 1)),
    n.favoriteFood.forEach((o, l) => a("favorite_food", o, l + 1)),
    a("favorite_solar_term", `我特别喜欢${n.favoriteSolarTerm}那阵子，做什么都有滋味。`, 1),
    a("disliked_solar_term", `我最怕${n.dislikedSolarTerm}，那日子真不好过。`, 1),
    n.workAttitude.forEach((o, l) => a("work_attitude", o, l + 1)),
    n.family.forEach((o, l) => a("family", o, l + 1)),
    (n.lover ?? []).forEach((o, l) => a("lover", o, l + 1)),
    (n.parentsDaily ?? []).forEach((o, l) => a("parents_daily", o, l + 1)),
    s
  );
}

function buildAllNpcLines(e, n) {
  const s = [];
  s.push(...GENERAL_CHAT_LINES);
  const a = actionModeOf(e);
  (s.push(...modeLinesOf(a)), s.push(...(n === void 0 ? Object.values(SOLAR_TERM_LINES).flat() : solarTermLines(n))));
  const o = NPC_FACT_PROFILES[e];
  return (o && s.push(...buildNpcFactLines(e, o)), hasRelations(e) && s.push(...getRelatedNpcs(e)), s);
}

function filterLinesByWeight(e, n) {
  const s = Math.max(0, n);
  return e.filter((a) => (TOPIC_CATEGORY_WEIGHTS[a.category] ?? 0) <= s);
}

[
  ...GENERAL_CHAT_LINES,
  ...Object.values(MODE_LINES).flat(),
  ...Object.values(SOLAR_TERM_LINES).flat(),
  ...Object.values(NPC_FACT_PROFILES).flatMap((e, n) => buildNpcFactLines(Object.keys(NPC_FACT_PROFILES)[n], e)),
];

const FESTIVALS_GAME = window.Cake.FESTIVALS_GAME,
  FESTIVAL_GAME_MAP = Object.fromEntries(FESTIVALS_GAME.map((e) => [e.festivalId, e]));

function getNpcRole(e) {
  var s;
  if (hasNpcProfile(e)) return "student";
  const n = ((s = NPC_RUNTIME_DATA[e]) == null ? void 0 : s.title) ?? "";
  return /老师|教师/.test(n)
    ? "teacher"
    : /医生|护士|兽医/.test(n)
      ? "medical"
      : /镇长|秘书/.test(n)
        ? "government"
        : /志愿者|收容所|会计|资助人/.test(n)
          ? "shelter"
          : /摊主|店主|甜品|面包|面点|服装|花店/.test(n)
            ? "shop"
            : "resident";
}

const INTRO_LINES_ANY = {
    any: {
      dawn: [
        "天刚蒙蒙亮，{name}在{loc}遇见你这个生面孔，笑着先开了口：「早呀！你就是蛋糕店的新店主吧？{bucketLabel}出来走走，正好碰上。」",
        "清晨的{loc}还带着露水气，{name}见到你停下脚步：「起这么早呀？我是{name}，就住镇上——你是新来的店主吧？」",
      ],
      morning: [
        "上午的{loc}阳光正好，{name}笑着招呼：「你好呀，新店主！我是{name}，以后常来镇上走动呀。」",
        "{name}在{loc}见到你，热情地自我介绍：「你就是新开的蛋糕店店主吧？我是{name}，镇上的事都熟，有事找我！」",
      ],
      noon: [
        "正午的{loc}暖洋洋的，{name}擦了擦汗：「中午好呀，新店主！我是{name}——这个点出来逛，正好请你尝尝我们家的东西。」",
        "{name}在{loc}歇脚，看见你便笑道：「{bucketLabel}好！我是{name}，听说你刚来镇上开蛋糕店？」",
      ],
      afternoon: [
        "午后的{loc}人来人往，{name}见到你，笑着说：「你好，新店主！我是{name}。{bucketLabel}的小镇最热闹，以后常出来逛逛。」",
        "{name}在{loc}忙完手里的活，抬头看见你：「是蛋糕店的新店主吧？我是{name}，回头去你店里坐坐。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}遇见你，笑着说：「{bucketLabel}好呀！我是{name}——新店主吧？欢迎来我们小镇！」",
        "{name}在{loc}收好东西，见你面生，主动打招呼：「天快黑了还出来逛？我是{name}，以后多多关照。」",
      ],
      night: [
        "夜晚的{loc}灯火温柔，{name}轻声说：「晚上好呀，新店主！我是{name}——这么晚还能遇见，也是缘分。」",
        "{name}在{loc}散步，见到你停下来：「晚上好！我是{name}。新开的蛋糕店是你家的吧？我听说过你。」",
      ],
      late: [
        "深夜的{loc}安安静静，{name}压低声音：「这么晚还一个人逛？我是{name}——{bucketLabel}了，早点回去歇着吧。」",
        "四周静悄悄的，{name}在{loc}遇见你，小声说：「新店主吧？我是{name}。{bucketLabel}了，改天店里见。」",
      ],
    },
  },
  INTRO_LINES_STUDENT = {
    school: {
      dawn: [
        "清晨的校门口还很安静，{name}背着书包正要进门，看见你好奇地问：「你是新来的店主姐姐/哥哥吗？我是{name}——这么早就来学校啦？」",
      ],
      morning: [
        "上午的校园里传来朗朗书声，{name}在教室外遇见你，笑着小声说：「你是蛋糕店的新店主吧？我是{name}，下课了可以去你店里玩吗？」",
      ],
      noon: [
        "中午的学校操场热闹起来，{name}拉着同学跑过来：「你就是新店主？我是{name}！听大家说你家的蛋糕特别好吃，是真的吗？」",
      ],
      afternoon: [
        "下午放学铃响了，{name}背着书包从校门口出来，看见你眼睛一亮：「新店主姐姐/哥哥！我是{name}——今天放学早，能去你店里看看吗？」",
      ],
      evening: [
        "傍晚的校园安静下来，{name}刚结束社团活动，见到你说：「你是新来的店主吧？我是{name}——{bucketLabel}了，我该回家啦，改天去你店里！」",
      ],
    },
    street: {
      afternoon: [
        "放学后的商店街全是学生，{name}和同学结伴路过，看见你兴奋地打招呼：「你是蛋糕店的新店主吧？我是{name}！我们班同学都说要一起去你家买蛋糕呢！」",
      ],
      evening: [
        "傍晚{name}在商店街的文具店前挑东西，抬头看见你：「新店主好！我是{name}——{bucketLabel}放学路上最热闹，你家的店开在这儿生意一定好。」",
      ],
    },
    park: {
      afternoon: [
        "下午的公园里，{name}和玩伴正在{activity}，看见你跑过来：「新店主姐姐/哥哥！我是{name}——你也是来公园玩的吗？」",
      ],
    },
    library: {
      morning: [
        "上午的图书馆安安静静，{name}抱着一摞书从书架后探出头：「嘘——我是{name}。你是新来的店主吧？这里说话要小声哦。」",
      ],
    },
    home: {
      late: [
        "深夜的家门口，{name}刚从同学家回来，打着哈欠说：「这么晚还没回家？我是{name}——{bucketLabel}了，明天还要上学呢，你也早点休息！」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}还没什么人，{name}揉着眼睛遇见你：「早呀，新店主！我是{name}——{bucketLabel}就要去上学啦，先跟你说声你好！」",
      ],
      morning: [
        "上午{name}在{loc}遇见你，好奇地打量：「你就是新来的蛋糕店店主？我是{name}！我们班上好多同学都想去你店里看看呢。」",
      ],
      noon: [
        "正午{name}在{loc}见到你，笑着说：「{bucketLabel}好呀，新店主！我是{name}——你家的蛋糕什么时候开卖呀？我都等不及啦！」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，蹦蹦跳跳地介绍自己：「新店主姐姐/哥哥！我是{name}——以后放学了可以去你店里玩吗？」",
      ],
      evening: [
        "傍晚{name}在{loc}看见你，规规矩矩地鞠了个躬：「{bucketLabel}好，新店主！我是{name}——妈妈说新邻居要多打招呼。」",
      ],
      night: [
        "夜晚的{loc}路灯下，{name}小声说：「晚上好呀，新店主！我是{name}——这么晚还在外面？我该回家写作业啦。」",
      ],
      late: [
        "深夜的{loc}静悄悄的，{name}打着哈欠说：「{bucketLabel}啦，新店主！我是{name}——明天还要早起上学呢，你也早点睡！」",
      ],
    },
  },
  INTRO_LINES_TEACHER = {
    school: {
      dawn: [
        "清晨的校园还空荡荡的，{name}夹着教案走进校门，看见你这个生面孔，温和地点头：「早呀！我是{name}，镇上的老师——你是新来的蛋糕店店主吧？」",
      ],
      morning: [
        "上午的走廊传来上课铃声，{name}刚从教室出来，见到你笑着说：「你好，新店主！我是{name}——在镇上教书好些年了，欢迎你来我们小镇。」",
      ],
      noon: [
        "中午{name}在办公室门口遇见你，温和地说：「{bucketLabel}好！我是{name}，镇上的老师——听说你开了蛋糕店？孩子们都盼着去呢。」",
      ],
      afternoon: [
        "下午的校园放学了，{name}送走学生，看见你站在门口，笑道：「新店主吧？我是{name}——放学后的校园可安静了，想逛逛随时欢迎。」",
      ],
      evening: [
        "傍晚{name}批完作业从学校出来，遇见你说：「{bucketLabel}好呀，新店主！我是{name}——天快黑了，要不要一起走一段？」",
      ],
    },
    street: {
      morning: [
        "上午的商店街，{name}正{activity}，看见你便停下来：「你是蛋糕店的新店主吧？我是{name}——在镇上教书。以后学生去你店里，还请多关照。」",
      ],
      evening: [
        "傍晚{name}在商店街买完菜，遇见你笑着说：「{bucketLabel}好！我是{name}——新店主吧？改天带孩子们去你店里尝尝点心。」",
      ],
    },
    home: {
      late: [
        "深夜的家门口，{name}刚备完课出来倒垃圾，看见你惊讶道：「这么晚还在外面？我是{name}——{bucketLabel}了，快回去休息吧，改天店里见。」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}很安静，{name}见到你，温和地笑了笑：「早呀，新店主！我是{name}，镇上的老师——{bucketLabel}出来走走，正好遇见你。」",
      ],
      morning: [
        "上午{name}在{loc}遇见你，微笑着说：「你好，新店主！我是{name}——在镇上教书。新搬来的吧？有需要帮忙的尽管说。」",
      ],
      noon: [
        "正午{name}在{loc}歇脚，见到你说：「{bucketLabel}好呀！我是{name}——你是蛋糕店的新店主吧？孩子们都念叨着你家的点心呢。」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，温和地说：「新店主吧？我是{name}——{bucketLabel}出来逛逛正好，熟悉熟悉小镇。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}笑着跟你打招呼：「{bucketLabel}好！我是{name}——欢迎你来小镇，以后常来往。」",
      ],
      night: [
        "夜晚的{loc}很安静，{name}轻声说：「晚上好呀，新店主！我是{name}——明天还要上课，先回去备课了，改天去你店里坐坐。」",
      ],
      late: [
        "深夜的{loc}几乎没人了，{name}压低声音：「{bucketLabel}啦，新店主！我是{name}——早点休息，养足精神好开店。」",
      ],
    },
  },
  INTRO_LINES_MEDICAL = {
    hospital: {
      dawn: [
        "清晨的医院大厅还亮着灯，{name}刚交完班，看见你便笑了笑：「早呀！我是{name}，镇医院的——你是新来的蛋糕店店主吧？这么早就出门啦？」",
      ],
      morning: [
        "上午{name}在医院走廊里遇见你，温和地说：「你好，新店主！我是{name}——在医院工作。身体不舒服随时来找我。」",
      ],
      noon: [
        "中午{name}在休息室里吃饭，见你过来便招呼：「{bucketLabel}好！我是{name}——新店主吧？医生建议：按时吃饭，开店再忙也别饿着。」",
      ],
      afternoon: [
        "下午{name}在药房前遇见你，笑道：「新店主？我是{name}——{bucketLabel}的医院人少些了，你也别太累，注意休息。」",
      ],
      evening: [
        "傍晚{name}准备下班，脱下白大褂看见你：「{bucketLabel}好呀，新店主！我是{name}——下班路上正好遇见你，改天去店里坐坐。」",
      ],
    },
    street: {
      morning: [
        "上午的商店街，{name}正{activity}，看见你便停下来：「你是蛋糕店的新店主吧？我是{name}，镇医院的——开店辛苦，记得按时吃饭。」",
      ],
      night: [
        "夜晚{name}值完班走在商店街上，见到你轻声说：「晚上好，新店主！我是{name}——刚下夜班。你也早点回去休息，熬夜伤身。」",
      ],
    },
    home: {
      late: [
        "深夜的家门口，{name}刚下夜班回来，看见你叮嘱道：「这么晚还在外面？我是{name}——{bucketLabel}了，快回去歇着吧，健康最重要。」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}空气清新，{name}见到你，笑着说：「早呀，新店主！我是{name}，镇医院的——{bucketLabel}的空气最好，多呼吸两口。」",
      ],
      morning: [
        "上午{name}在{loc}遇见你，温和地打招呼：「你好，新店主！我是{name}——在医院上班。新来小镇有不适应的，随时来找我。」",
      ],
      noon: [
        "正午{name}在{loc}歇脚，见到你叮嘱道：「{bucketLabel}好呀！我是{name}——天气热，记得多喝水，别中暑了。」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，笑着说：「新店主吧？我是{name}——{bucketLabel}出来走走挺好，别一直闷在店里。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}笑着跟你打招呼：「{bucketLabel}好！我是{name}——上了一天班，出来透透气正好遇见你。」",
      ],
      night: [
        "夜晚的{loc}很安静，{name}轻声说：「晚上好呀，新店主！我是{name}——这个点还在外面？早点休息，身体要紧。」",
      ],
      late: [
        "深夜的{loc}几乎没人了，{name}压低声音：「{bucketLabel}啦，新店主！我是{name}——听医生的，快去睡觉。」",
      ],
    },
  },
  INTRO_LINES_GOVERNMENT = {
    government: {
      morning: [
        "上午的镇政府门口人来人往，{name}刚开完会出来，看见你便伸出手：「你好呀，新店主！我是{name}，在镇政府工作——欢迎你到我们小镇开店！」",
      ],
      noon: [
        "中午{name}在镇政府食堂门口遇见你，笑着说：「{bucketLabel}好！我是{name}——新店主吧？镇上的事都归我们管，有事随时来找。」",
      ],
      afternoon: [
        "下午{name}在办公室里处理文件，见你探头进来，温和地说：「新店主吧？我是{name}——找我有事？还是刚来小镇想认认路？」",
      ],
      evening: [
        "傍晚{name}下班从镇政府出来，看见你笑道：「{bucketLabel}好呀，新店主！我是{name}——今天刚听说你家的蛋糕店开张了，恭喜！」",
      ],
    },
    street: {
      morning: [
        "上午的商店街，{name}正{activity}，看见你便停下来：「你是蛋糕店的新店主吧？我是{name}，在镇政府工作——开店手续有不懂的，来问我。」",
      ],
      night: [
        "夜晚{name}在商店街散步，见到你笑着说：「晚上好，新店主！我是{name}——镇上的夜晚也挺热闹吧？以后常出来走走。」",
      ],
    },
    plaza: {
      noon: [
        "正午的广场，{name}在查看公告栏，回头看见你：「新店主吧？我是{name}——镇上的活动都在这儿贴通知，没事可以来看看。」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}还静悄悄的，{name}见到你，精神抖擞地说：「早呀，新店主！我是{name}，在镇政府工作——{bucketLabel}出来走走，正好认识认识。」",
      ],
      morning: [
        "上午{name}在{loc}遇见你，微笑着介绍自己：「你好，新店主！我是{name}——镇政府欢迎你，以后有什么需要帮忙的尽管开口。」",
      ],
      noon: [
        "正午{name}在{loc}歇脚，见到你便笑道：「{bucketLabel}好呀！我是{name}——新开的蛋糕店是你家的吧？镇上都传开了。」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，温和地说：「新店主吧？我是{name}——{bucketLabel}出来逛逛挺好，熟悉熟悉我们小镇。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}笑着跟你打招呼：「{bucketLabel}好！我是{name}——欢迎来我们小镇，以后常来往。」",
      ],
      night: [
        "夜晚的{loc}很安静，{name}轻声说：「晚上好呀，新店主！我是{name}——这么晚还能遇见，看来你也是个夜猫子。」",
      ],
      late: [
        "深夜的{loc}几乎没人了，{name}压低声音：「{bucketLabel}啦，新店主！我是{name}——早点休息，明天还要开店呢。」",
      ],
    },
  },
  INTRO_LINES_SHELTER = {
    shelter: {
      dawn: [
        "清晨的收容所里传来几声狗叫，{name}正在{activity}，看见你便擦了擦手：「早呀！我是{name}，在收容所帮忙——你是新来的蛋糕店店主吧？」",
      ],
      morning: [
        "上午{name}在收容所门口喂流浪猫，抬头看见你：「你好，新店主！我是{name}——收容所的志愿者。有空可以来帮忙看看小动物。」",
      ],
      noon: [
        "中午{name}在收容所食堂吃饭，见你进来便招呼：「{bucketLabel}好！我是{name}——新店主吧？这些小家伙可喜欢甜点了，欢迎常来。」",
      ],
      afternoon: [
        "下午{name}给动物们洗完澡，出来透气时遇见你：「新店主？我是{name}——收容所的。{bucketLabel}这边安静，逛累了可以来坐坐。」",
      ],
      evening: [
        "傍晚{name}锁好收容所的门，看见你笑道：「{bucketLabel}好呀，新店主！我是{name}——下班啦，改天带你去看看新来的小狗。」",
      ],
    },
    street: {
      morning: [
        "上午的商店街，{name}正{activity}，看见你便停下来：「你是蛋糕店的新店主吧？我是{name}，收容所的——你家的点心要是卖不完，可以捐给小动物们尝尝？」",
      ],
      afternoon: [
        "午后{name}在商店街给收容所采购猫粮，遇见你说：「新店主吧？我是{name}——{bucketLabel}出来采购，正好认识你。」",
      ],
    },
    park: {
      afternoon: [
        "下午的公园里，{name}正带着收容所的小狗散步，看见你笑着说：「新店主！我是{name}——这是收容所的狗狗，很乖吧？{bucketLabel}来公园正好遇见你。」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}空气很好，{name}见到你，笑着说：「早呀，新店主！我是{name}，收容所的志愿者——{bucketLabel}出来走走，正好遇见你。」",
      ],
      morning: [
        "上午{name}在{loc}遇见你，热情地打招呼：「你好，新店主！我是{name}——在动物收容所帮忙。以后有吃不完的点心，记得想着我们的小动物呀。」",
      ],
      noon: [
        "正午{name}在{loc}歇脚，见到你便笑道：「{bucketLabel}好呀！我是{name}——新店主吧？听说你家的蛋糕可香了，小动物们有口福了。」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，温和地说：「新店主吧？我是{name}——收容所的。{bucketLabel}出来逛逛，正好认识认识。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}笑着跟你打招呼：「{bucketLabel}好！我是{name}——刚忙完收容所的活，出来透透气。」",
      ],
      night: [
        "夜晚的{loc}很安静，{name}轻声说：「晚上好呀，新店主！我是{name}——收容所的小家伙们都睡了，你也早点休息。」",
      ],
      late: [
        "深夜的{loc}几乎没人了，{name}压低声音：「{bucketLabel}啦，新店主！我是{name}——早点回去歇着吧，明天还要开店呢。」",
      ],
    },
  },
  INTRO_LINES_STREET = {
    street: {
      dawn: [
        "清晨的商店街刚开门，{name}正在{activity}，看见你便擦着手迎出来：「早呀！我是{name}，这条街上的——你是新来的蛋糕店店主吧？同行，以后多关照！」",
      ],
      morning: [
        "上午{name}在自家铺子前忙活，看见你路过，笑着招呼：「新店主！我是{name}——咱俩算半个同行。你家的蛋糕店开张了？改天去尝尝！」",
      ],
      noon: [
        "正午{name}在店里扒了口饭，见你进来便放下碗：「{bucketLabel}好呀！我是{name}——这条街上的铺子我都熟，新店主有事尽管来问。」",
      ],
      afternoon: [
        "午后{name}在铺子前歇脚，看见你便招手：「新店主！我是{name}——{bucketLabel}这条街人最多，你家的店开在这儿，生意准差不了。」",
      ],
      evening: [
        "傍晚{name}正收拾摊位，抬头看见你：「{bucketLabel}好呀，新店主！我是{name}——今天收摊早，正好跟你聊聊这条街的生意经。」",
      ],
      night: [
        "夜晚的商店街渐渐安静，{name}关上店门，看见你笑道：「晚上好，新店主！我是{name}——打烊啦，你也早点回去歇着。」",
      ],
    },
    market: {
      dawn: [
        "清晨的农贸市场已经热闹起来，{name}正{activity}，看见你便招呼：「早呀！我是{name}——你是蛋糕店的新店主吧？以后要水果蔬菜，来这儿找我！」",
      ],
      morning: [
        "上午{name}在摊位前称货，抬头看见你：「新店主！我是{name}——咱镇上做吃的都是一家人，你店里的材料要新鲜的，找我准没错。」",
      ],
      noon: [
        "正午{name}在摊位上啃着馒头，看见你便笑：「{bucketLabel}好呀！我是{name}——新店主吧？逛累了过来坐，尝尝刚进的水果。」",
      ],
      afternoon: [
        "午后{name}在摊前整理货架，见到你说：「新店主？我是{name}——{bucketLabel}市场人少了些，正好跟你说说话。」",
      ],
    },
    home: {
      late: [
        "深夜的家门口，{name}刚盘完今天的账，看见你打了个哈欠：「这么晚还没回去？我是{name}——{bucketLabel}了，开店的人最懂开店的人，早点歇着吧。」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}还带着凉意，{name}见到你，笑着说：「早呀，新店主！我是{name}，在镇上做买卖的——{bucketLabel}出来转转，正好遇见你。」",
      ],
      morning: [
        "上午{name}在{loc}遇见你，热情地介绍自己：「你好，新店主！我是{name}——这条街做生意都讲究和气，以后常来往！」",
      ],
      noon: [
        "正午{name}在{loc}歇脚，见到你便笑道：「{bucketLabel}好呀！我是{name}——新开的蛋糕店是你家的吧？改天一定去捧场。」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，笑着说：「新店主吧？我是{name}——{bucketLabel}出来逛逛，正好认识认识，以后进货采买多关照。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}笑着跟你打招呼：「{bucketLabel}好！我是{name}——收摊了？改天一起喝杯茶，聊聊生意经。」",
      ],
      night: [
        "夜晚的{loc}很安静，{name}轻声说：「晚上好呀，新店主！我是{name}——开店不容易，早点回去休息，明天才有精神。」",
      ],
      late: [
        "深夜的{loc}几乎没人了，{name}压低声音：「{bucketLabel}啦，新店主！我是{name}——做买卖讲究养精蓄锐，快回去睡吧。」",
      ],
    },
  },
  INTRO_LINES_STREET_ELDER = {
    street: {
      morning: [
        "上午的商店街刚开张，{name}拎着东西路过，看见你便笑：「新店主吧？我是{name}，在镇上住了好些年了——这条街上的铺子我都熟。」",
        "{name}在商店街的店门口歇脚，见到你主动招呼：「你好呀！我是{name}。听说蛋糕店是你开的？改天一定去捧场。」",
      ],
      noon: [
        "正午的商店街人声嘈杂，{name}凑过来跟你说话：「新来的店主！我是{name}——{bucketLabel}这条街最热闹，你家的店生意肯定好。」",
      ],
      afternoon: [
        "午后{name}在商店街闲逛，见到你说：「你是蛋糕店的新店主吧？我是{name}，住镇上的——以后缺什么跟我说，街坊都乐意帮忙。」",
      ],
      evening: [
        "傍晚的商店街亮起灯，{name}收工回家路过，看见你笑道：「{bucketLabel}好呀！我是{name}——新店主吧？欢迎来我们小镇。」",
      ],
    },
    park: {
      dawn: [
        "清晨的公园里只有遛弯的人，{name}慢跑着经过你身边，停下来喘口气：「早呀，新店主！我是{name}，{bucketLabel}来公园走走对身体好。」",
      ],
      evening: [
        "傍晚的公园坐满乘凉的人，{name}在长椅上歇着，见你过来便招手：「新来的店主吧？我是{name}——晚上公园最舒服，常来坐坐。」",
      ],
    },
    plaza: {
      noon: [
        "正午的广场没什么人，{name}在喷泉边歇着，见你过来便笑着说：「你就是新店主？我是{name}——{bucketLabel}广场清净，逛累了可以来歇歇脚。」",
      ],
      night: [
        "夜晚的广场灯光明亮，{name}在散步，见到你笑着说：「晚上好，新店主！我是{name}——晚上广场凉快，散步的人可多了。」",
      ],
    },
    river: {
      morning: [
        "早上的河边风凉凉的，{name}正在{activity}，抬头看见你：「早呀！我是{name}，住河边上——你就是新来的蛋糕店店主吧？」",
      ],
      night: [
        "夜晚的河边安静极了，{name}在水边{activity}，见到你轻声说：「晚上好，新店主！我是{name}——河边晚上最清净，适合想事情。」",
      ],
    },
    home: {
      late: [
        "深夜的家门口，{name}正要进门，回头看见你：「这么晚还没回去？我是{name}，就住这儿——{bucketLabel}了，早点休息，改天店里见。」",
      ],
    },
    any: {
      dawn: [
        "清晨的{loc}静悄悄的，{name}见到你这个新面孔，笑着说：「早呀！我是{name}，镇上的老住户了——{bucketLabel}出来走走，正好遇见你。」",
      ],
      morning: [
        "上午的{loc}渐渐热闹起来，{name}看见你，笑着介绍自己：「你好，新店主！我是{name}——以后在这镇上有什么不懂的，尽管来问我。」",
      ],
      noon: [
        "正午的{loc}太阳正好，{name}停下脚步跟你说话：「{bucketLabel}好呀！我是{name}，新开的蛋糕店是你家的吧？街坊们都念叨着呢。」",
      ],
      afternoon: [
        "午后{name}在{loc}遇见你，笑着说：「你是蛋糕店的新店主吧？我是{name}——{bucketLabel}出来逛逛，正好认识认识。」",
      ],
      evening: [
        "傍晚的{loc}亮起灯，{name}笑着跟你打招呼：「{bucketLabel}好！我是{name}——新店主吧？欢迎来我们小镇，以后常来往。」",
      ],
      night: [
        "夜晚的{loc}很安静，{name}轻声说：「晚上好呀，新店主！我是{name}——这么晚还能认识新朋友，真有缘。」",
      ],
      late: [
        "深夜的{loc}几乎没人了，{name}压低声音：「{bucketLabel}啦，新店主！我是{name}——改天再好好聊，快回去歇着吧。」",
      ],
    },
  },
  INTRO_LINES_BY_ROLE = {
    ...INTRO_LINES_ANY,
    student: INTRO_LINES_STUDENT,
    teacher: INTRO_LINES_TEACHER,
    medical: INTRO_LINES_MEDICAL,
    government: INTRO_LINES_GOVERNMENT,
    shelter: INTRO_LINES_SHELTER,
    shop: INTRO_LINES_STREET,
    resident: INTRO_LINES_STREET_ELDER,
  };

function pickLineByRole(e, n, s, a) {
  const o = e[n];
  if (!o) return [];
  const l = o[s];
  if (l) {
    const u = l[a];
    if (u && u.length > 0) return u;
    const f = l["*"];
    if (f && f.length > 0) return f;
  }
  const c = o.any;
  if (c) {
    const u = c[a];
    if (u && u.length > 0) return u;
    const f = c["*"];
    if (f && f.length > 0) return f;
  }
  return [];
}

function getIntroLines(e, n, s) {
  const a = getNpcRole(e),
    o = placeKeyOf(n);
  return pickLineByRole(INTRO_LINES_BY_ROLE, a, o, s) || pickLineByRole(INTRO_LINES_BY_ROLE, "any", o, s) || [];
}

const FESTIVAL_TIME_LINES = {
  dawn: [
    "{bucketLabel}的{loc}还静悄悄的，{name}正和{companions}一起{festivalActivity}，见你一个人逛，压低声音招呼：「{festival}快乐！起这么早，正好一块儿过节。」",
    "清晨的{loc}人还不多，{name}和{companions}正{festivalActivity}，回头看见你，笑着招招手：「{festival}快乐！新店主吧？来，一起过个早节。」",
  ],
  morning: [
    "上午的{loc}热闹起来，{name}和{companions}正{festivalActivity}，看见你便笑着招手：「{festival}快乐！你是蛋糕店的新店主吧？来，一起过节！」",
    "{loc}里的节日气氛正浓，{name}正和{companions}一起{festivalActivity}，见你面生，热情地招呼：「{festival}快乐！早上好呀，一起玩吧！」",
  ],
  noon: [
    "正午的{loc}暖洋洋的，{name}和{companions}正{festivalActivity}，见你面生，招呼道：「{festival}快乐！吃了吗？我们正过节呢，一起吧！」",
    "{name}正和{companions}在{loc}{festivalActivity}，看见你擦擦汗笑道：「{festival}快乐！{bucketLabel}了，歇歇脚，一起过节呀。」",
  ],
  afternoon: [
    "午后的{loc}人渐渐多了，{name}正和{companions}一起{festivalActivity}，抬头看见你，笑着说：「{festival}快乐！新店主吧？正好，一起热闹热闹。」",
    "{name}和{companions}在{loc}里正{festivalActivity}，见你走过来，招手道：「{festival}快乐！{bucketLabel}的阳光正好，一起过节吧！」",
  ],
  evening: [
    "傍晚的{loc}亮起灯，{name}和{companions}正{festivalActivity}，看见你便挥挥手：「{festival}快乐！天快黑了，来得正是时候，一起过节呀！」",
    "黄昏的{loc}彩灯一盏接一盏亮起来，{name}正和{companions}一起{festivalActivity}，见你走近，笑着说：「{festival}快乐！晚上最热闹，一起吧。」",
  ],
  night: [
    "夜晚的{loc}灯火通明，{name}正和{companions}一起{festivalActivity}，见到你轻声招呼：「{festival}快乐！晚上过节最热闹，来，一起吧。」",
    "{name}和{companions}在{loc}里正{festivalActivity}，看见你站在人群外，连忙招手：「{festival}快乐！别站着看，一起来过节呀！」",
  ],
  late: [
    "深夜的{loc}渐渐安静，{name}和{companions}还没散，见你过来便小声说：「{festival}快乐！这么晚还出来？{bucketLabel}了，一起走一段吧。」",
    "{loc}的灯火暗了大半，{name}正和{companions}结束{festivalActivity}往回走，回头看见你，轻声笑道：「{festival}快乐！{bucketLabel}啦，早点回去歇着吧。」",
  ],
};

function pickFestivalTimeLine(e) {
  const n = FESTIVAL_TIME_LINES[e] ?? FESTIVAL_TIME_LINES.night ?? [];
  return n[Math.floor(Math.random() * n.length)] ?? "";
}

const INTRO_LINES_NEW_YEAR = {
    new_year: [
      "春节庙会的人声和锣鼓声混成一片，{name}正{activity}，一抬头瞧见你，把手里的年货往怀里一搂，笑盈盈地开口：「过年好呀！你就是新搬来镇上的店主吧？」",
      "正月初一的{venue}里鞭炮味还没散尽，{name}挤在人群里{activity}，看见你这个生面孔，热情地凑过来：「大过年的还一个人在街上逛？走，跟我们一块儿逛庙会去！」",
    ],
    lantern: [
      "{venue}里花灯一盏接一盏亮起来，{name}正在{activity}，看见你便提着花灯走过来：「今晚的灯谜特别有意思，要不要一起猜？」",
      "元宵节的{venue}人潮涌动，{name}端着刚买的汤圆{activity}，见你面生，笑着招呼：「来一碗吗？黑芝麻馅的，可甜了。」",
    ],
    new_year_solar: [
      "元旦的{venue}挂满彩带，{name}正在{activity}，看见你这个新面孔，笑着挥手：「新年快乐！你是蛋糕店的新店主吧？以后常来玩！」",
      "{venue}里放着热闹的音乐，{name}手里攥着刚买的小彩带{activity}，一见到你就说：「新年第一天就遇见新朋友，运气真好！」",
    ],
    valentine: [
      "情人节的花市里玫瑰香得发甜，{name}正在{activity}，抬头看见你，笑道：「你也来挑花？……你是蛋糕店的新店主对不对？我听说过你！」",
      "{venue}里全是成双成对的人，{name}抱着刚挑的玫瑰{activity}，见到你倒不尴尬：「一个人来逛花市？正好，帮我参谋参谋哪束好看！」",
    ],
    sakura: [
      "樱花正开得盛，{venue}的野餐垫一块挨着一块，{name}正{activity}，看见你便招手：「快来看！这棵树的樱花落下来像下雪一样！」",
      "春日的樱花被风吹得纷纷扬扬，{name}在{venue}里{activity}，抬头看见你，笑道：「你就是新来的店主？听说你的蛋糕可好吃了！」",
    ],
    labor: [
      "劳动节的{venue}里游戏棚一个接一个，{name}正{activity}，看见你这个生面孔，开心地喊：「来玩套圈吗？我教你！」",
      "游园会的大喇叭放着欢快的歌，{name}夹在人堆里{activity}，见到你就停下来：「放假还出来逛？走，一起看表演去！」",
    ],
    sweet_fest: [
      "{venue}的甜品摊一路排开，{name}正{activity}，看见你眼睛一亮：「你是蛋糕店店主吧？全镇就等你家的点心参评了！」",
      "甜蜜节的空气都是甜的，{name}手里举着试吃的小叉子{activity}，看见你便笑着招手：「快来尝尝！我正纠结把票投给谁呢。」",
    ],
    qixi: [
      "七夕的{venue}里河灯星星点点，{name}正{activity}，看见你便轻声笑道：「你也来放河灯？许的什么愿呀？」",
      "夏夜的风吹得河灯明明灭灭，{name}在{venue}里{activity}，见到你这个新面孔，温柔地说：「第一次来河边过七夕吧？这里的星星特别亮。」",
    ],
    mid_autumn: [
      "中秋的月亮又圆又亮，{venue}的长桌摆满月饼，{name}正{activity}，看见你便递过来一块：「尝尝，莲蓉馅的！你是新来的店主吧？」",
      "{venue}里飘着桂花香，{name}手里掰着半块月饼{activity}，见你走近，笑着问：「一个人过中秋？来，坐下一起吃月饼赏月。」",
    ],
    harvest: [
      "丰收节的{venue}堆满新摘的瓜果，{name}正{activity}，看见你便塞给你一个果子：「刚摘的，可甜了！你是镇上蛋糕店的新店主吧？」",
      "金黄的麦穗扎成的拱门下人来人往，{name}挎着装满水果的篮子{activity}，见到你笑着说：「丰收节快乐！这季节的果子做点心最合适。」",
    ],
    national: [
      "国庆的{venue}挂满国旗，{name}正{activity}，看见你这个新面孔，热情地招呼：「今晚有庆祝演出，一起来看呀！」",
      "庆祝晚会的歌声飘满{venue}，{name}拿着小旗子{activity}，见到你就说：「你是新搬来的吧？国庆节快乐，欢迎来我们小镇！」",
    ],
    winter_solstice: [
      "冬至的{venue}里大锅冒着白汽，{name}正{activity}，看见你便招手：「快来！刚出锅的饺子，趁热吃！」",
      "冬至大如年，{venue}里热气腾腾，{name}端着碗汤圆{activity}，见你站在外头，笑着拉你：「站那儿吹风干嘛，进来喝碗汤暖暖身子！」",
    ],
    christmas: [
      "平安夜的{venue}彩灯全亮了，{name}正{activity}，看见你便递过来一颗糖果：「圣诞快乐！你是蛋糕店的新店主吧？店里还缺礼物盒吗？」",
      "颂歌在{venue}里轻轻回荡，{name}裹着围巾{activity}，见到你这个生面孔，笑着说：「平安夜快乐！街上暖和，一起逛逛吧。」",
    ],
  },
  INTRO_LINES_FESTIVAL = [
    "{venue}里热闹非凡，{name}正{activity}，看见你这个生面孔，笑着先开了口：「你好呀！你就是蛋糕店的新店主吧？{festival}快乐！」",
    "{festival}的{venue}到处都是过节的人，{name}在人群里{activity}，见到你便停下来打招呼：「第一次见你，是新搬来的吗？{festival}快乐！」",
  ],
  SOLAR_TERM_DESCS = {
    小寒: "一年中最冷的日子刚开始，大家裹紧了棉衣",
    大寒: "冷到极点的时节，屋檐下挂着冰凌",
    立春: "冬天终于收尾，柳条开始泛青",
    雨水: "细雨润物，河边的泥土变得松软",
    惊蛰: "春雷一响，虫子和小草都醒了过来",
    春分: "昼夜平分，阳光正好",
    清明: "草长莺飞的踏青时节",
    谷雨: "雨生百谷，田里绿油油一片",
    立夏: "夏天开了个头，蝉鸣渐起",
    小满: "麦穗开始灌浆，田野悄悄饱满起来",
    芒种: "有芒的麦子要收了，忙忙碌碌",
    夏至: "一年里白天最长的一天，太阳火辣辣",
    小暑: "暑气渐盛，树荫下才凉快",
    大暑: "一年最热的时候，风扇转个不停",
    立秋: "暑气未消，早晚已有了凉意",
    处暑: "暑天到此收尾，秋风开始探头",
    白露: "早晚草叶上凝出露珠，秋意渐浓",
    秋分: "昼夜再次平分，桂花香满街",
    寒露: "露水一天比一天凉",
    霜降: "清晨的草地结了薄霜",
    立冬: "冬天正式开场，大家都添了衣裳",
    小雪: "天上飘起零星雪花",
    大雪: "雪越下越大，屋顶白了一片",
    冬至: "一年里黑夜最长的一天，饺子汤圆暖身",
  },
  INTRO_LINES_GENERIC = [
    "{name}在{loc}遇见你这个生面孔，笑着先开了口：「你好呀，新店主！{bucketLabel}好，以后常来往！」",
    "{name}在{loc}停下脚步，看着你笑道：「你就是蛋糕店的新店主吧？我是{name}，欢迎来我们小镇！」",
  ],
  SEASONS = ["spring", "summer", "autumn", "winter"];

function pickRandom(e) {
  return e[Math.floor(Math.random() * e.length)] ?? "";
}

function fillTemplate(e, n) {
  let s = e;
  for (const [a, o] of Object.entries(n)) s = s.replaceAll(`{${a}}`, o);
  return s;
}

function composeFestivalLine(e, n, s, a) {
  const { name: o, place: l, locName: c, activity: u, bucket: f, bucketLabel: g } = e,
    x = FESTIVAL_ACTIVITY_LABELS[n.id] ?? "过节",
    m = festivalNpcLine(n.id, l, f);
  if (m.length > 0)
    return fillTemplate(pickRandom(m), { name: o, loc: c, venue: s, festival: n.name, activity: u, short: x });
  if (a.length > 0) {
    const y = a
        .slice(0, 2)
        .map((v) => v.name)
        .join("、"),
      j = pickFestivalTimeLine(f);
    if (j)
      return fillTemplate(j, {
        name: o,
        companions: y,
        festivalActivity: x,
        festival: n.name,
        loc: c,
        bucketLabel: g,
        activity: u,
      });
  }
  const p = INTRO_LINES_NEW_YEAR[n.id] ?? INTRO_LINES_FESTIVAL;
  return fillTemplate(pickRandom(p), { name: o, festival: n.name, venue: s, activity: u, loc: c });
}

function composeIntroLine(e) {
  const { npcId: n, place: s, locName: a, bucket: o, bucketLabel: l, name: c, activity: u } = e,
    f = getIntroLines(n, s, o);
  return f.length > 0
    ? fillTemplate(pickRandom(f), { name: c, loc: a, activity: u, bucketLabel: l })
    : fillTemplate(pickRandom(INTRO_LINES_GENERIC), { name: c, loc: a, bucketLabel: l });
}

function buildMeetLine(e, n, s) {
  const a = NPC_RUNTIME_DATA[n],
    o = (a == null ? void 0 : a.name) ?? "TA",
    l = getNpcLocationAt(n, e.hour, e.day),
    c = s && s !== "home" && s !== "bakery" ? s : l.place,
    u = PLACE_LABELS[c] ?? c,
    f = slotOfHour(e.hour),
    g = TIME_SLOT_LABELS[f],
    x = seasonIndexOf(e.day),
    m = SEASON_NAME_TABLE[SEASONS[x] ?? "spring"],
    p = currentSolarTerm(e.day),
    y = isFestivalDay(e.day),
    j = FESTIVALS.find((V) => V.id === y) ?? null,
    v = y ? FESTIVAL_GAME_MAP[y] : null,
    w = j ? groupCompanions(e.day, e.hour, n) : [],
    N = {
      name: o,
      npcId: n,
      place: c,
      locName: u,
      activity: l.activity,
      bucket: f,
      bucketLabel: g,
    },
    S = j ? composeFestivalLine(N, j, (v == null ? void 0 : v.name) ?? "节日会场", w) : composeIntroLine(N),
    C = (j == null ? void 0 : j.name) ?? (SOLAR_TERM_DESCS[p.name] ? p.name : m);
  return { text: S, tag: C };
}

const RELATION_THRESHOLD = 20,
  TOPIC_LINES = {
    mode_builtin: {
      base: [
        "说到今儿这事——{topic} 正说到我心坎上了。",
        "你一提这个我就来劲，{topic}",
        "{topic} 这话我记在心里好几天了。",
        "嗐，{topic} 我早想找人念叨念叨。",
      ],
      close: [
        "也就跟你说这个我才放得开，{topic}",
        "{topic} 换别人我都不好意思提，跟你说没事。",
        "你说到点子上了，{topic} 我连细节都记得。",
        "{topic} 你懂我，我都不用多解释。",
      ],
    },
    general: {
      base: [
        "说到这个嘛——{topic} 我倒也留意着。",
        "嗯，{topic} 镇上这事我也有听说。",
        "{topic} 你消息还挺灵通，我正想说这个。",
        "嗐，{topic} 回头咱俩都去看看。",
      ],
      close: [
        "{topic} 有你陪我聊这些，日子都热闹了。",
        "跟你说个实话，{topic} 我其实挺在意的。",
        "{topic} 这话我只想跟你聊，别人听了也白搭。",
        "哈哈，{topic} 跟你说话就是痛快。",
      ],
    },
    work: {
      base: [
        "说到干活——{topic} 我这一天就是这么过的。",
        "你问这个正好，{topic} 忙是忙，心里踏实。",
        "{topic} 手上这点事，我早摸出规律了。",
        "嗐，{topic} 站一天下来腿都是酸的，但值得。",
      ],
      close: [
        "{topic} 跟你说说我都能再多干俩小时。",
        "也就你问，{topic} 我平时都不跟人细说。",
        "{topic} 你来了，我连累都觉得没那么累了。",
        "跟你说个心里话，{topic} 我是真喜欢这份活。",
      ],
    },
    hobby: {
      base: [
        "说到闲下来的时候——{topic} 就是我放松的法子。",
        "你一提爱好我就话多，{topic}",
        "{topic} 忙里偷闲就靠这个续命了。",
        "嗐，{topic} 我隔三差五就得来一回。",
      ],
      close: [
        "{topic} 要是你在旁边，那就更有意思了。",
        "跟你说，{topic} 我最享受的就是这份自在。",
        "{topic} 下次咱们可以一起，我教你两手。",
        "也就你面前我才说，{topic} 是我最宝贝的事。",
      ],
    },
    solar_term: {
      base: [
        "说到节气——{topic} 老辈人留下的讲究，我信。",
        "{topic} 一到这个时节，镇上氛围就不一样。",
        "嗐，{topic} 我每年都按老规矩过。",
        "你提这个我熟，{topic} 该吃什么该干什么我都门儿清。",
      ],
      close: [
        "{topic} 跟你一起过，感觉会比往年都有滋味。",
        "跟你说个悄悄话，{topic} 我最惦记的还是家里那口热乎的。",
        "{topic} 你要是得空，咱们一道准备准备？",
        "{topic} 有你在，这些日子才不算白过。",
      ],
    },
    friend: {
      base: [
        "说到朋友——{topic} 我常想着多聚聚。",
        "嗯，{topic} 认识这么久了，情分都在。",
        "{topic} 我得抽空去看看 TA 了。",
        "嗐，{topic} 朋友之间就该常走动。",
      ],
      close: [
        "{topic} 好朋友里有你，我这心里就热乎。",
        "跟你说，{topic} 我把 TA 当自家人处。",
        "{topic} 这话我只跟你掏心窝子说。",
        "{topic} 下次叫上你一起，人多热闹。",
      ],
    },
    friend_birthday: {
      base: [
        "说到生日——{topic} 日子我掐着指头算呢。",
        "嗯，{topic} 我得提前准备点心意。",
        "{topic} 到时候可得热闹热闹。",
        "嗐，{topic} 礼物我还没想好送啥。",
      ],
      close: [
        "{topic} 到时候你可一定得来，我第一个请你。",
        "跟你说，{topic} 我想送个特别的，你帮我拿个主意？",
        "{topic} 有你在，这个生日会更难忘。",
        "{topic} 我连当天要说什么都想好了，得有你见证。",
      ],
    },
    friend_hobby: {
      base: [
        "说到 TA 的爱好——{topic} 这点我最清楚。",
        "嗯，{topic} 一说这个 TA 眼睛都放光。",
        "{topic} 我还跟着学了两手呢。",
        "嗐，{topic} 投其所好，朋友处得才长久。",
      ],
      close: [
        "{topic} 你要是感兴趣，我带你一起找 TA 玩。",
        "跟你说，{topic} 我陪 TA 玩过好几回，挺有意思。",
        "{topic} 下次咱们仨约一块儿，准热闹。",
        "{topic} 这事我只跟你念叨，别人可不知道。",
      ],
    },
    favorite_food: {
      base: [
        "说到吃的——{topic} 我光想想就馋。",
        "你一提这个我就饿了，{topic}",
        "{topic} 这味道在我这儿排第一。",
        "嗐，{topic} 哪天路过我都要捎上一份。",
      ],
      close: [
        "{topic} 下次咱们一块儿去，我请你尝尝我常点的。",
        "跟你说，{topic} 我最知道哪家做得地道。",
        "{topic} 想起这个味道，连累都忘了。",
        "{topic} 有你在旁边，我吃着都觉得更香。",
      ],
    },
    favorite_solar_term: {
      base: [
        "说到节气——{topic} 一到这时候我就浑身舒坦。",
        "嗯，{topic} 这个时节做什么都顺。",
        "{topic} 每年我都盼着它早点来。",
        "嗐，{topic} 连风都是甜的。",
      ],
      close: [
        "{topic} 要是能和你一起过这个时节，就更好了。",
        "跟你说，{topic} 我连那阵子的安排都想好了。",
        "{topic} 这事我只跟你分享，别人我可不说。",
        "{topic} 到时候我第一个告诉你。",
      ],
    },
    disliked_solar_term: {
      base: [
        "说到节气——{topic} 一到这时候我就犯愁。",
        "嗯，{topic} 那阵子是真不好熬。",
        "{topic} 每年那几天我都得咬着牙过。",
        "嗐，{topic} 别提了，想起来就头疼。",
      ],
      close: [
        "{topic} 有你听我念叨两句，我心里能舒坦不少。",
        "跟你说，{topic} 那阵子我总盼着有人陪。",
        "{topic} 这委屈我只跟你一个人倒。",
        "{topic} 到时候你可得多跟我说说话。",
      ],
    },
    work_attitude: {
      base: [
        "说到干活的态度——{topic} 我认这个理。",
        "嗯，{topic} 手上活不能糊弄。",
        "{topic} 这是我做事的老规矩。",
        "嗐，{topic} 对得起自己这份工就行。",
      ],
      close: [
        "{topic} 这话我也就跟你说得这么透。",
        "跟你说，{topic} 我是越干越有感情了。",
        "{topic} 有你的认可，我这活干得更有劲。",
        "{topic} 你懂我的坚持，我就知足了。",
      ],
    },
    family: {
      base: [
        "说到家里人——{topic} 想起来心里就暖。",
        "嗯，{topic} 一家人和和气气最要紧。",
        "{topic} 家里的事，再小也上心。",
        "嗐，{topic} 家人就是我的后盾。",
      ],
      close: [
        "{topic} 这些话我也只跟你细说过。",
        "跟你说，{topic} 家人好，我什么都好。",
        "{topic} 以后有机会，带你见见他们。",
        "{topic} 有你听我说这些，我特别踏实。",
      ],
    },
    lover: {
      base: [
        "说到那个人——{topic} 一想起来心就软了。",
        "嗯，{topic} 我这人你也知道，藏不住事。",
        "{topic} 愿 TA 每天都好好的。",
        "嗐，{topic} 一说到 TA 我就话多。",
      ],
      close: [
        "{topic} 这些话我只想跟你说说，心里舒坦。",
        "跟你说，{topic} 我心里最软的地方就是 TA。",
        "{topic} 有你陪我聊这些，我踏实多了。",
        "{topic} 你是最懂我这份心的人。",
      ],
    },
    parents_daily: {
      base: [
        "说到爸妈——{topic} 他们一辈子操劳惯了。",
        "嗯，{topic} 我劝也劝不住，随他们高兴。",
        "{topic} 老人家的日子，简单也充实。",
        "嗐，{topic} 我隔三差五就回去看看。",
      ],
      close: [
        "{topic} 这些话我只跟你念叨过，别往外传。",
        "跟你说，{topic} 我总想着让他们少操点心。",
        "{topic} 改天带你去尝尝他们的手艺。",
        "{topic} 有你听我说说家里的事，我特别安心。",
      ],
    },
  },
  MBTI_STYLE_LINES = {
    ISTJ: {
      label: MBTI_LABELS.ISTJ,
      starters: ["依我看，", "照老规矩，", "先把事情捋清楚——"],
      closers: ["这事得按章程来。", "我心里有数，错不了。", "办完这事，我再跟你细说。"],
    },
    ISFJ: {
      label: MBTI_LABELS.ISFJ,
      starters: ["我寻思着，", "其实我一直记着，", "别急，慢慢来——"],
      closers: ["你没事就好。", "有我看着呢，放心。", "回头我再去照应照应。"],
    },
    INFJ: {
      label: MBTI_LABELS.INFJ,
      starters: ["我总觉得，", "说起来你可能不信，", "这事背后还有层意思——"],
      closers: ["心里有光，路就不会偏。", "我信你会懂的。", "有些事，点到为止就好。"],
    },
    INTJ: {
      label: MBTI_LABELS.INTJ,
      starters: ["从长远看，", "按我的判断，", "先想清楚再动手——"],
      closers: ["目标明确，就不怕路远。", "这事值得好好规划一下。", "把每一步都算好，准没错。"],
    },
    ISTP: {
      label: MBTI_LABELS.ISTP,
      starters: ["试过才知道，", "别光说，上手看看——", "照我这个法子，"],
      closers: ["试过就知道行不行了。", "手上见真章。", "这么干，利索。"],
    },
    ISFP: {
      label: MBTI_LABELS.ISFP,
      starters: ["感觉这样挺好的，", "随心就好——", "你看，这样多舒服，"],
      closers: ["好看比什么都重要。", "顺心就好。", "有这份心情就值了。"],
    },
    INFP: {
      label: MBTI_LABELS.INFP,
      starters: ["要是大家都能……", "我悄悄跟你说，", "心里头想着，"],
      closers: ["心里有光就好。", "温柔一点，日子就暖了。", "愿我们都好好的。"],
    },
    INTP: {
      label: MBTI_LABELS.INTP,
      starters: ["按逻辑推一下，", "这个有意思——", "让我琢磨琢磨，"],
      closers: ["这事儿值得再琢磨琢磨。", "逻辑上说得通。", "回头我再研究研究。"],
    },
    ESTP: {
      label: MBTI_LABELS.ESTP,
      starters: ["别想了，走起！", "要我说，", "直接点——"],
      closers: ["干就完了！", "痛快最重要！", "说干就干，不磨叽！"],
    },
    ESFP: {
      label: MBTI_LABELS.ESFP,
      starters: ["哇，跟你说，", "你猜怎么着，", "我可太开心了——"],
      closers: ["开心最重要啦！", "越想越乐呵！", "这不得好好乐一乐！"],
    },
    ENFP: {
      label: MBTI_LABELS.ENFP,
      starters: ["哇塞你猜怎么着，", "我跟你说个有意思的，", "光是想想就激动——"],
      closers: ["越想越兴奋！", "这主意棒呆啦！", "咱们一起试试嘛！"],
    },
    ENTP: {
      label: MBTI_LABELS.ENTP,
      starters: ["换个角度想，", "你别说，还真有门道——", "要我说啊，"],
      closers: ["这主意我还能想出八个！", "有意思，值得再掰扯掰扯。", "换条路，保准更妙。"],
    },
    ESTJ: {
      label: MBTI_LABELS.ESTJ,
      starters: ["听我的，", "按计划走，", "这事得这么办——"],
      closers: ["按计划走准没错。", "规矩立起来，事就好办。", "定了就照办，不回头。"],
    },
    ESFJ: {
      label: MBTI_LABELS.ESFJ,
      starters: ["需要帮忙就说一声，", "我正想跟你说呢，", "大家伙儿都照顾着点——"],
      closers: ["大家伙儿好好的就行。", "有需要随时喊我！", "人多才热闹，才好办事。"],
    },
    ENFJ: {
      label: MBTI_LABELS.ENFJ,
      starters: ["咱们一起想办法，", "我相信你能行——", "来，我陪你一起，"],
      closers: ["有你在，我就放心了。", "咱们一起，准能成。", "日子会越来越好的。"],
    },
    ENTJ: {
      label: MBTI_LABELS.ENTJ,
      starters: ["目标很明确，", "这事必须成——", "听我的安排，"],
      closers: ["这事必须成。", "效率就是生命。", "定了目标，就全力以赴。"],
    },
  };

function hashString(e) {
  let n = 0;
  for (let s = 0; s < e.length; s += 1) n = (n * 31 + e.charCodeAt(s)) >>> 0;
  return n;
}

const BUSY_LINES = {
    mode_builtin: {
      starters: ["正忙着呢，", "手头的事刚告一段落，", "这不刚忙完——"],
      closers: ["忙完这段再好好聊。", "活儿不等人，回头细说。", "干完这趟咱再接着唠。"],
    },
    general: {
      starters: ["说起来啊，", "你听我说，", "今天正好想到——"],
      closers: ["小镇的日子，就是这样。", "有空常来坐坐。", "平平常常的日子，最舒坦。"],
    },
    work: {
      starters: ["说到干活，", "忙归忙，", "手头的事再多——"],
      closers: ["活儿再忙，也得上心。", "干哪行，都得讲个踏实。", "把活干漂亮，比啥都强。"],
    },
    hobby: {
      starters: ["聊到这个我可来劲了，", "闲下来就爱琢磨——", "要说爱好，"],
      closers: ["这爱好，我放不下。", "一玩起来就停不下来。", "人总得有点念想。"],
    },
    solar_term: {
      starters: ["节气一到，", "眼瞅着节气又变了——", "这节气啊，"],
      closers: ["节气不等人。", "过日子，就指着节气走。", "该添衣添衣，该进补进补。"],
    },
    friend: {
      starters: ["说到朋友，", "我那几个老友——", "朋友之间，"],
      closers: ["朋友处久了，就是家人。", "有朋友在，心里就踏实。", "这份交情，我记着呢。"],
    },
    friend_birthday: {
      starters: ["朋友过生日，", "生日一到，", "记着朋友的生日——"],
      closers: ["生日这天，可得好好过。", "到时候得好好热闹热闹。", "这份心意，比啥都金贵。"],
    },
    friend_hobby: {
      starters: ["说起朋友的爱好，", "我那朋友就爱——", "朋友那点爱好，"],
      closers: ["各有各的爱好，挺好。", "他高兴，我也跟着乐。", "爱琢磨的人，日子不闷。"],
    },
    favorite_food: {
      starters: ["说到吃，", "好吃的我可不含糊，", "提起美食——"],
      closers: ["这味道，惦记一辈子。", "吃好了，啥都顺。", "吃到心头好，一天都美。"],
    },
    favorite_solar_term: {
      starters: ["最喜欢的节气，", "一到这个节气——", "这个节气，我可盼着呢。"],
      closers: ["那几天，我得好好过。", "就等它来呢。", "光是想想就高兴。"],
    },
    disliked_solar_term: {
      starters: ["要说最怕的节气，", "这节气我可真受不了——", "最头疼的就是它，"],
      closers: ["那几天熬过去就好了。", "一到那时候，我就犯愁。", "忍忍也就过去了。"],
    },
    work_attitude: {
      starters: ["干活这事，", "我这人做事——", "别看我平时话少，"],
      closers: ["事在人为，我信这个。", "踏实干，总没错。", "做一行，爱一行。"],
    },
    family: {
      starters: ["说到家人，", "家里的事——", "提起家里人，"],
      closers: ["家人平平安安，就最好。", "家，永远是我的靠山。", "一家人齐齐整整，比啥都强。"],
    },
    lover: {
      starters: ["说到心上人，", "提起那一位——", "心里装着一个人，"],
      closers: ["有那一位在，日子就甜。", "心里有人，干啥都有劲。", "这份惦记，我天天都有。"],
    },
    parents_daily: {
      starters: ["说起爸妈，", "爹妈那边——", "提到家里老人，"],
      closers: ["老人安康，就是福。", "常回家看看，准没错。", "他们念叨我，我也惦记他们。"],
    },
  },
  SENTENCE_END_RE = /[。！？!?～~…]$/;
