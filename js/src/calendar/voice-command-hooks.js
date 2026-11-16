function getSpeechErrorMessage(e) {
  switch (e) {
    case "not-allowed":
      return "麦克风权限被拒绝，无法收音。请在浏览器或系统设置中允许使用麦克风。";
    case "no-speech":
      return "没有听到声音，请靠近麦克风再说一次。";
    case "network":
      return "语音识别网络出错，请稍后再试。";
    case "audio-capture":
      return "没有找到可用的麦克风，请检查设备。";
    case "service":
      return "语音识别服务暂不可用，请稍后再试。";
    default:
      return "语音识别失败，请重试。";
  }
}

const TAB_KEYWORDS = [
    { tab: "fate", words: ["通讯录", "联系人", "聊天列表", "手机通讯", "通讯"] },
    { tab: "profile", words: ["我的档案", "个人信息", "我的资料", "档案"] },
    { tab: "achieve", words: ["成就", "里程碑"] },
    { tab: "market", words: ["订购", "订货", "采购", "批发市场", "农贸市场", "订购页"] },
    { tab: "town", words: ["商店街", "小镇", "去镇上", "出门", "外出", "地图"] },
    { tab: "home", module: "kitchen", words: ["烘焙", "做蛋糕", "制作点心", "烤蛋糕", "一楼厨房"] },
    { tab: "home", module: "store", words: ["店铺", "开店", "营业", "店面", "蛋糕店", "一楼店面"] },
    { tab: "home", words: ["回家", "回家里", "回到家里", "打开家", "首页", "小楼", "家"] },
  ],
  CMD_NEXT_DAY = ["休息一天", "过一天", "睡一觉", "睡觉", "到明天", "新的一天", "进入下一天", "过完今天"],
  CMD_NIGHT_MODE = ["夜间模式", "切换夜间", "夜晚模式", "切到夜间", "夜间"],
  CMD_DAY_MODE = ["白天模式", "日间模式", "切回白天", "切回日间", "白天"],
  CMD_SAVE = ["保存存档", "保存游戏", "存档"],
  CMD_LOAD = ["读取存档", "读档", "加载存档", "读存档"],
  CMD_CHAT = ["聊天", "说话", "聊聊", "聊一聊", "搭话", "对话", "聊"],
  CMD_GIFT = ["送点心", "送礼物", "送礼", "送东西", "送", "礼物"],
  CMD_SCHEDULE = ["的行程", "在哪", "在哪里", "在做什么", "在干嘛", "位置", "行程"],
  CMD_TIME = ["现在几点", "几点", "什么时间", "当前时间", "几点钟"],
  CMD_MONEY = ["多少钱", "余额", "存款", "钱包", "金钱", "金币", "钱"],
  CMD_MOOD = ["心情", "情绪"],
  CMD_FESTIVAL = ["节日", "生日", "庆典", "有什么活动", "活动"],
  CMD_READ_PAGE = ["当前页面", "页面内容", "重读", "再读一遍", "再读一次", "我在哪", "当前页"],
  CMD_STATUS = ["当前状态", "我的状态", "综合状态", "状态如何", "状态怎么样", "情况", "状态"],
  CMD_QUICK_PANEL = ["打开快捷指令", "打开快捷面板", "快捷指令面板", "快捷面板", "指令面板", "快捷指令"],
  CMD_FAVORITE = ["收藏", "加入常用", "设为常用"],
  CMD_LAST_TOAST = ["最新弹窗", "最近弹窗", "刚才的弹窗", "刚才弹窗", "刚弹出的窗口"],
  CMD_CLOSEST = ["最亲近的伙伴", "最亲近", "关系最好的伙伴", "好感度最高的伙伴"],
  CMD_COMBINED = ["组合播报", "综合播报", "时间金钱心情", "当前时间金钱心情", "全部播报", "一起播报"],
  CMD_HELP = ["帮助", "怎么用", "有哪些指令", "指令示例", "可用指令", "不知道说什么", "说什么"],
  NPC_NAME_INDEX = Object.values(NPC_RUNTIME_DATA)
    .map((e) => ({ id: e.id, name: e.name }))
    .sort((e, n) => n.name.length - e.name.length);

function findNpcIdInText(e) {
  var n;
  return (n = NPC_NAME_INDEX.find((s) => e.includes(s.name))) == null ? void 0 : n.id;
}

function includesAny(e, n) {
  return n.some((s) => e.includes(s));
}

function parseVoiceCommand(e) {
  const n = e.replace(/[，。！？、,.!?]/g, "").trim();
  if (!n) return { type: "unknown" };
  if (includesAny(n, CMD_HELP)) return { type: "help" };
  const s = CMD_FAVORITE.find((o) => n.includes(o));
  if (s) {
    const o = n.replace(s, "").trim(),
      l = parseVoiceCommand(o);
    return l.type === "unknown" ||
      l.type === "help" ||
      l.type === "favorite" ||
      l.type === "openQuickPanel"
      ? { type: "help" }
      : { type: "favorite", target: l };
  }
  if (includesAny(n, CMD_QUICK_PANEL)) return { type: "openQuickPanel" };
  if (includesAny(n, CMD_LOAD)) return { type: "load" };
  if (includesAny(n, CMD_SAVE)) return { type: "save" };
  for (const o of TAB_KEYWORDS) if (includesAny(n, o.words)) return { type: "nav", tab: o.tab, module: o.module };
  if (includesAny(n, CMD_NEXT_DAY)) return { type: "nextDay" };
  if (includesAny(n, CMD_NIGHT_MODE) || includesAny(n, CMD_DAY_MODE)) return { type: "toggleNight" };
  if (includesAny(n, CMD_CLOSEST)) return { type: "special", special: "chatClosest" };
  const a = findNpcIdInText(n);
  return a
    ? includesAny(n, CMD_GIFT)
      ? { type: "gift", npcId: a }
      : includesAny(n, CMD_SCHEDULE)
        ? { type: "schedule", npcId: a }
        : includesAny(n, CMD_CHAT)
          ? { type: "chat", npcId: a }
          : { type: "chat", npcId: a }
    : includesAny(n, CMD_CHAT) || includesAny(n, CMD_GIFT) || includesAny(n, CMD_SCHEDULE)
      ? { type: "help" }
      : includesAny(n, CMD_LAST_TOAST)
        ? { type: "special", special: "readLatestModal" }
        : includesAny(n, CMD_COMBINED)
          ? { type: "queryCombo" }
          : includesAny(n, CMD_TIME)
            ? { type: "queryTime" }
            : includesAny(n, CMD_MONEY)
              ? { type: "queryMoney" }
              : includesAny(n, CMD_MOOD)
                ? { type: "queryMood" }
                : includesAny(n, CMD_FESTIVAL)
                  ? { type: "queryFestival" }
                  : includesAny(n, CMD_READ_PAGE)
                    ? { type: "queryPage" }
                    : includesAny(n, CMD_STATUS)
                      ? { type: "queryStatus" }
                      : { type: "unknown" };
}

const SPEECH_UNSUPPORTED_MSG = "当前设备或浏览器不支持语音识别，无法使用语音指令。您可以继续使用点击操作。",
  SPEECH_HELP_TEXT =
    "可用语音指令有：一，页面导航：打开小楼厨房，打开小楼店面，打开订购，去小镇，打开通讯录，查看档案，打开成就。二，日常操作：休息一天，保存存档，读取存档，切换夜间模式。三，伙伴互动：和苏晚晴聊天，送点心给陈叙白。四，信息查询：现在几点，我有多少钱，我的心情，今天有什么节日，当前页面，我的状态。五，快捷指令：说「打开快捷指令」呼出快捷指令面板，点按大按钮即可执行；说「收藏休息一天」可以把常用指令加入面板顶部的「我的常用」区。说完指令后，我会用语音回答执行结果。",
  TAB_DESCRIPTIONS = {
    home: "小楼：一楼店面可以开店营业、装修店铺、招聘员工、整理货架，一楼厨房可以吃饭、备料烘焙、研发配方；二楼卧室与阳台、三楼书房与收藏架、天台看天气观星。",
    bake: "小楼一楼厨房：吃饭、备料烘焙、研发配方。",
    shop: "小楼一楼店面：开店营业、装修店铺、招聘员工、整理货架。",
    market: "订购：从供应商处订购食材、包装和杂货，补充厨房库存。",
    town: "小镇：出门去公园、河边、商店街、医院、图书馆等地点探索，认识新伙伴。",
    fate: "通讯：手机通讯录，查看已认识伙伴，可以聊天、送礼、约会。",
    profile: "档案：我的状态、技能、穿搭、健康档案、人际关系与设置。",
    achieve: "成就：查看已达成和未达成的成就与里程碑奖励。",
  },
  SEASON_NAMES = ["春季", "夏季", "秋季", "冬季"];

function VoiceCommandBar({
  enabled: e,
  game: n,
  tab: s,
  night: a,
  goTab: o,
  handleNextDay: l,
  handleManualSave: c,
  toggleNight: u,
  commit: f,
  setGame: g,
  onOpenQuickPanel: x,
  onFavorite: m,
  readLatestModal: p,
}) {
  const [y, j] = React.useState(!1),
    [v, w] = React.useState(""),
    [N, S] = React.useState(() => isSpeechRecognitionSupported()),
    C = React.useRef(n);
  C.current = n;
  const V = React.useRef(a);
  V.current = a;
  const E = React.useRef(s);
  E.current = s;
  const F = React.useRef(y);
  F.current = y;
  const J = React.useRef(e);
  J.current = e;
  const H = React.useRef(!1),
    R = React.useCallback(() => {
      announce(SPEECH_HELP_TEXT);
    }, []),
    se = React.useCallback(() => {
      const D = C.current,
        O = findClosestNpcId(D);
      if (!O) {
        announce("还没有认识的伙伴，先去小镇或商店街认识新朋友吧。");
        return;
      }
      const K = NPC_RUNTIME_DATA[O],
        Y = chatWithNpc(D, O);
      if (!Y.ok) {
        announce(Y.message);
        return;
      }
      (f(Y.state, `好感度 +${Y.affectionGain ?? 3}`, "success", !1),
        announce(Y.firstMeet ? `初见·${K.name}。${Y.line}` : (Y.line ?? Y.message)));
    }, [f]),
    be = React.useCallback(
      (D) => {
        var K;
        const O = C.current;
        switch (D.type) {
          case "nav":
            D.tab && o(D.tab, D.module);
            break;
          case "nextDay":
            l();
            break;
          case "toggleNight": {
            const Y = !V.current;
            (u(), vibrateShort(), announce(Y ? "已切换到夜间模式。" : "已切换到日间模式。"));
            break;
          }
          case "save":
            c();
            break;
          case "load":
            (async () => {
              const Y = await loadCurrentSaveMeta();
              Y ? (g(Y), vibrateShort(), announce("读档完成，已恢复最近的存档。")) : announce("没有找到存档。");
            })();
            break;
          case "chat":
          case "gift":
          case "schedule": {
            const Y = D.npcId,
              I = Y ? NPC_RUNTIME_DATA[Y] : void 0;
            if (!I || !O) {
              announce("还不认识这位伙伴，先去小镇或商店街找到对方，触发初见剧情后再互动吧。");
              break;
            }
            if (!(O.metNpcs ?? []).includes(Y)) {
              announce(`你还没有认识${I.name}。先去小镇或商店街找到对方，触发初见剧情后再互动吧。`);
              break;
            }
            if (D.type === "chat") {
              const U = chatWithNpc(O, Y);
              if (!U.ok) {
                announce(U.message);
                break;
              }
              (f(U.state, `好感度 +${U.affectionGain ?? 3}`, "success", !1),
                announce(U.firstMeet ? `初见·${I.name}。${U.line}` : (U.line ?? U.message)));
              break;
            }
            if (D.type === "gift") {
              const U = (O.carried ?? []).find((ve) => ve.kind === "snack" || ve.kind === "food");
              if (!U) {
                announce(
                  "身上没有可送的点心：先在📱手机里把点心装进随身携带，再去小楼一楼厨房烘焙也行。",
                );
                break;
              }
              const fe = giveFoodGift(O, Y, U.id);
              if (!fe.ok) {
                announce(fe.message);
                break;
              }
              (f(fe.state, "好感度提升", "success", !1), announce(fe.line ?? fe.message));
              break;
            }
            announce("这可说不好，TA 们行踪不定，自己去街上碰碰运气吧");
            break;
          }
          case "queryTime": {
            if (!O) break;
            const Y = SEASON_NAMES[O.season] ?? "",
              I = WEATHER_TYPES[weatherOfDay(O.day)];
            announce(
              `现在是游戏第${O.day}天，${Y}，${formatSolarDate(O.day)}，${formatLunarDate(O.day)}，上午${O.hour}点，天气${(I == null ? void 0 : I.label) ?? ""}，${(I == null ? void 0 : I.desc) ?? ""}。`,
            );
            break;
          }
          case "queryMoney": {
            if (!O) break;
            announce(`钱包里有${O.coins}元，银行存款${O.bankSavings ?? 0}元。`);
            break;
          }
          case "queryMood": {
            if (!O) break;
            announce(
              `心情值${O.mood}，精力${O.energy}，健康${O.health}，饱食度${O.satiety}，个人卫生${O.hygiene ?? 100}，个人魅力${calcCharm(O)}。`,
            );
            break;
          }
          case "queryFestival": {
            if (!O) break;
            const Y = getActiveFestival(O.day),
              I = getBirthdayNpcs(O),
              U = [];
            (Y && U.push(`今天是${Y.name}${Y.desc ? `，${Y.desc}` : ""}`),
              I.length > 0 &&
                U.push(
                  `今天过生日的伙伴有：${I.map((fe) => `${fe.emoji}${fe.name}`).join("、")}，别忘了送上祝福和礼物。`,
                ),
              announce(U.length > 0 ? U.join("。") : "今天没有节日，也没有伙伴过生日。"));
            break;
          }
          case "queryPage": {
            const Y = E.current;
            announce(`当前页面是${TAB_DISPLAY_NAMES[Y] ?? ""}页。${TAB_DESCRIPTIONS[Y] ?? ""}`);
            break;
          }
          case "queryStatus": {
            if (!O) break;
            const Y = SEASON_NAMES[O.season] ?? "";
            announce(
              `游戏第${O.day}天，${Y}，天气${((K = WEATHER_TYPES[weatherOfDay(O.day)]) == null ? void 0 : K.label) ?? ""}。钱包${O.coins}元，心情${O.mood}，精力${O.energy}，健康${O.health}，饱食度${O.satiety}，卫生${O.hygiene ?? 100}，魅力${calcCharm(O)}，交涉技能${O.negotiation ?? 0}。`,
            );
            break;
          }
          case "queryCombo": {
            if (!O) break;
            const Y = SEASON_NAMES[O.season] ?? "",
              I = WEATHER_TYPES[weatherOfDay(O.day)];
            announce(
              `现在是游戏第${O.day}天，${Y}，${formatSolarDate(O.day)}，${formatLunarDate(O.day)}，上午${O.hour}点，天气${(I == null ? void 0 : I.label) ?? ""}。钱包里有${O.coins}元，银行存款${O.bankSavings ?? 0}元，心情值${O.mood}。`,
            );
            break;
          }
          case "special":
            D.special === "chatClosest" ? se() : D.special === "readLatestModal" ? p() : R();
            break;
          case "openQuickPanel":
            x();
            break;
          case "favorite":
            D.target ? m(D.target) : R();
            break;
          case "help":
            R();
            break;
          default:
            R();
            break;
        }
      },
      [o, l, c, u, f, g, R, se, x, m, p],
    ),
    Ie = React.useCallback(
      (D) => {
        if (H.current || !J.current) return;
        H.current = !0;
        const O = parseVoiceCommand(D);
        if (O.type === "unknown") {
          window.setTimeout(() => {
            ((H.current = !1), R());
          }, 150);
          return;
        }
        (announce(`好的，收到：${D}`),
          window.setTimeout(() => {
            try {
              if (!J.current) return;
              be(O);
            } finally {
              window.setTimeout(() => {
                H.current = !1;
              }, 700);
            }
          }, 1600));
      },
      [be, R],
    ),
    xe = React.useRef(null),
    ye = React.useCallback(
      () => (
        xe.current ||
          ((xe.current = createSpeechRecognizer({
            onInterim: (D) => w(D),
            onFinal: Ie,
            onError: (D) => announce(getSpeechErrorMessage(D)),
            onEnd: () => {
              (j(!1), w(""));
            },
          })),
          xe.current.supported || S(!1)),
        xe.current
      ),
      [Ie],
    ),
    P = React.useCallback(() => {
      const D = ye();
      if (!D.supported) {
        announce(SPEECH_UNSUPPORTED_MSG);
        return;
      }
      F.current ? D.stop() : (vibrateShort(), w(""), D.start(), j(!0));
    }, [ye]),
    ne = React.useCallback(() => {
      ye().stop();
    }, [ye]);
  return (
    React.useEffect(() => {
      !e && F.current && (ye().abort(), j(!1), w(""));
    }, [e, ye]),
    React.useEffect(
      () => () => {
        var D;
        try {
          (D = xe.current) == null || D.abort();
        } catch {}
      },
      [],
    ),
    {
      supported: N,
      listening: y,
      interim: v,
      toggle: P,
      stop: ne,
      playHelp: R,
      executeCommand: be,
      chatClosest: se,
    }
  );
}

function useGameCommit({ game: R0, blindMode: e, showToast: n, setGame: s }) {
  const [a, o] = React.useState(!1),
    [l, c] = React.useState(null),
    /* 上一帧饱食度：进食动作（做简餐/吃成品/苏记/快餐/美食街/捞金鱼/随机事件）
       都表现为饱食度上升，统一在这里识别并标记 ateToday，避免逐入口打点遗漏。 */
    lastSatRef = React.useRef(null),
    /* 当前存档饱食度基准：用 ref 同步，避免把 game 放进 commit 依赖导致其引用频繁重建。
       读档后第一次 commit 若就是进食，lastSatRef 仍为 null，此时以读档时的饱食度为基准，
       才能正确识别「读档后当天第一次进食」（否则会被漏判为未进食）。 */
    baseSatRef = React.useRef(null),
    u = React.useCallback(() => {
      try {
        stopTTS();
      } catch {}
    }, []),
    f = React.useCallback(() => {
      (u(), c(null));
    }, [u]);
  React.useEffect(() => {
    if (R0 && typeof R0.satiety == "number") baseSatRef.current = R0.satiety;
  }, [R0 && R0.satiety]);
  return {
    commit: React.useCallback(
      (x, m, p = "info", y = !0) => {
        /* 饱食度比上一帧高 => 这次提交里玩家吃了东西，标记「今天已进食」并清零计数器。
           原地修改的 state 直接改字段即可；跨天函数据此决定连续未进食 +1 还是清零。 */
        try {
          if (x && typeof x.satiety === "number") {
            const prev = lastSatRef.current !== null ? lastSatRef.current : baseSatRef.current;
            if (prev !== null && x.satiety > prev) {
              x.ateToday = !0;
              x.hungryDays = 0;
            }
            lastSatRef.current = x.satiety;
          }
        } catch (err) {}
        const { state: j, unlocked: v } = checkAchievements(x);
        /* 死亡系统：存档只在「跨天」时进行（见 useAutoSpeakDay），不再每次操作都写盘。
           这样磁盘上始终保存着最近一次存活的跨天存档，玩家死亡后读档可回到死亡前。 */
        if ((s(j), v.length > 0)) {
          (c((N) => [...(N ?? []), ...v]), u());
          const w = `成就解锁！${v.map((N) => `${N.name}。${N.desc}`).join("。")}`;
          e ? announce(w) : speakText(w);
        }
        return (m && n(m, p, y && v.length === 0), j);
      },
      [n, u, e, s],
    ),
    saving: a,
    setSaving: o,
    newAch: l,
    closeAch: f,
  };
}

function buildStatusAnnouncement(e) {
  const {
    age: n,
    playerName: s,
    shopName: a,
    gender: o,
    season: d,
    showToast: l,
    setGame: c,
    setPhase: u,
    blindPlayedAnnounced: f,
    setSaving: g,
    blindMode: x,
  } = e;
  try {
    const m = Number(n);
    if (!Number.isFinite(m) || m < 20) return (l("年龄需设置为 20 岁及以上", "error"), !1);
    const p = s.trim() || "店主",
      y = a.trim() || "甜蜜物语",
      j = createNewGameState(p, y, o, Math.min(99, Math.floor(m)));
    {
      const sv = { spring: 0, summer: 1, autumn: 2, winter: 3 }[d];
      if (sv != null && sv > 0) {
        let b = 1;
        for (; seasonIndexOf(b) !== sv;) b += 1;
        ((j.day = b), (j.season = seasonIndexOf(b)));
      }
    }
    return (
      (j.newbieTipsShown = 1),
      c(j),
      u("playing"),
      (f.current = !0),
      g(!0),
      saveCurrentSlot(j).finally(() => g(!1)),
      l("新店开张啦！", "success"),
      x &&
        (vibrateShort(), announce("新店开张啦！当前页面是小楼，您可以在一楼厨房制作点心，或在一楼店面开店营业。")),
      !0
    );
  } catch (m) {
    return (
      typeof globalThis.__instrumentedCatchMonitor == "function" &&
        globalThis.__instrumentedCatchMonitor(m),
      l("开局遇到点问题，请重试", "error"),
      !1
    );
  }
}

function buildTodaySummary({
  next: e,
  weather: n,
  delivered: s,
  deliveredGoods: a,
  expired: o,
  wagePaid: l,
  wageShort: c,
  utilityPaid: u,
  utilityShort: f,
  truckFeePaid: g,
  truckFeeShort: x,
  fishDied: m,
  noSleep: p,
  starving: y,
  govDone: j,
  newbieTip: v,
  sleptOvernight: q,
}) {
  const w = [],
    N = WEATHER_TYPES[n];
  (w.push(`${N.emoji} 今天${N.label}`), N.outdoor || w.push("雨雪天户外活动不便"));
  q && w.push("🌙 一觉睡到天亮，精力充沛、心情舒畅（心情 +6）");
  const S = getActiveFestival(e.day);
  S && w.push(`${S.emoji} 今天是${S.name}！${S.tip ?? "小镇格外热闹"}`);
  const C = getBirthdayNpcs(e);
  (C.length > 0 &&
    w.push(`🎂 ${C.map((E) => `${E.emoji}${E.name}`).join("、")}今天过生日，记得去送祝福`),
    s && s > 0 && w.push(`${s} 份订购食材到货`),
    a && a > 0 && w.push(`📦 镇里订购的 ${a} 件货品已送到店里`),
    o && o > 0 && w.push(`${o} 件点心过期`),
    l && l > 0 && w.push(`员工工资 -¥${l}`),
    c && c > 0 && w.push(`工资欠付 ¥${c}`),
    u && u > 0 && w.push(`水电费 -¥${u}`),
    f && f > 0 && w.push(`水电欠费 ¥${f}`),
    g && g > 0 && w.push(`🚚 餐车月度维护 ¥${Ec} + 水电 ¥${Ic} 已缴纳`),
    x && x > 0 && w.push("钱包见底，餐车的维护费和水电费先记账了"),
    m && w.push("🐟 金鱼翻肚皮了…缸要清理干净才能再捞"),
    j && j.length > 0 && w.push(`🏛️ 线上政务办结：${j.join("；")}`),
    p && w.push("昨晚没睡觉，健康 -12"),
    y && w.push("昨晚饿着肚子，健康 -5、心情 -5，快去做点吃的吧"),
    v && w.push(`📬 市政府留言：${v}`));
  const V = (E) => (/[。！？…]$/.test(E) ? E : `${E}。`);
  return w.length > 0
    ? `新的一天开始了。
${w.map(V).join(`
`)}`
    : "新的一天开始了。";
}

function useAutoSpeakDay(e, r) {
  const { game: n, autoSpeakDay: s, blindMode: a, commit: o } = e;
  if (!n) return;
  const {
      state: l,
      expired: c,
      delivered: u,
      deliveredGoods: f,
      wagePaid: g,
      wageShort: x,
      noSleep: m,
      utilityPaid: p,
      utilityShort: y,
      truckFeePaid: j,
      truckFeeShort: v,
      fishDied: w,
      starving: N,
      weather: S,
      govDone: C,
      newbieTip: V,
      sleptOvernight: q,
    } = advanceToNextDay(n, r),
    E = buildTodaySummary({
      next: l,
      weather: S,
      delivered: u,
      deliveredGoods: f,
      expired: c,
      wagePaid: g,
      wageShort: x,
      utilityPaid: p,
      utilityShort: y,
      truckFeePaid: j,
      truckFeeShort: v,
      fishDied: w,
      noSleep: m,
      starving: N,
      govDone: C,
      newbieTip: V,
      sleptOvernight: q,
    }),
    F = s || a;
  (o(l, E, "info", !F),
    /* 死亡系统：只在跨天时自动存档，且判死的那一天不写盘——
       磁盘因此始终保留最近一次「存活」的跨天存档，死亡后点「读档」能回到死亡前。 */
    !l.dead && saveCurrentSlot(l).catch(() => {}),
    F && (a ? announce(E) : (stopTTS(), speakText(E))));
}

function useSaveGame(e) {
  const { game: n, setSaving: s, showToast: a } = e;
  n &&
    (s(!0),
    saveCurrentSlot(n)
      .then((r) => (r ? a("💾 存档已保存", "success") : a("存档失败，请稍后再试", "error")))
      .catch(() => a("存档失败，请稍后再试", "error"))
      .finally(() => s(!1)));
}

function useLoadGame(e) {
  const { setGame: n, setTab: s, setPhase: a, closeAch: o, showToast: l } = e;
  deleteCurrentSave()
    .then(() => {
      (n(null), s("home"), a("title"), o(), l("已重新开始，旧存档已清除", "info"));
    })
    .catch(() => l("清除存档失败，请稍后再试", "error"));
}

function useRunCustomerFlow(e) {
  const { game: n, commit: s } = e;
  if (!n) return;
  const a = runCustomerFlow(n, !0);
  if (!a.ok) {
    s(a.state, a.message, "error");
    return;
  }
  s(a.state, a.message, "success");
}

function useGameActions({
  game: e,
  blindMode: n,
  autoSpeakDay: s,
  playerName: a,
  shopName: o,
  gender: l,
  age: c,
  season: d,
  showToast: u,
  commit: f,
  setGame: g,
  setTab: x,
  setPhase: m,
  setSaving: p,
  closeAch: y,
  blindPlayedAnnounced: j,
}) {
  const v = React.useCallback(
      () =>
        buildStatusAnnouncement({
          age: c,
          playerName: a,
          shopName: o,
          gender: l,
          season: d,
          showToast: u,
          setGame: g,
          setPhase: m,
          blindPlayedAnnounced: j,
          setSaving: p,
          blindMode: n,
        }),
      [c, a, o, l, d, u, g, m, j, p, n],
    ),
    w = React.useCallback(
      () => {
        if (e && e.dead) { u("店主已经饿得走不动了，请先复活或重新开始", "error"); return; }
        return useAutoSpeakDay({ game: e, autoSpeakDay: s, blindMode: n, commit: f });
      },
      [e, s, n, f, u],
    ),
    R = React.useCallback(
      () => {
        if (e && e.dead) { u("店主已经饿得走不动了，请先复活或重新开始", "error"); return; }
        return useAutoSpeakDay({ game: e, autoSpeakDay: s, blindMode: n, commit: f }, { sleptOvernight: !0 });
      },
      [e, s, n, f, u],
    ),
    N = React.useCallback(() => useSaveGame({ game: e, setSaving: p, showToast: u }), [e, p, u]),
    S = React.useCallback(
      () => useLoadGame({ setGame: g, setTab: x, setPhase: m, closeAch: y, showToast: u }),
      [g, x, m, y, u],
    ),
    C = React.useCallback(() => useRunCustomerFlow({ game: e, commit: f }), [e, f]);
  return {
    handleStart: v,
    handleNextDay: w,
    handleSleepOvernight: R,
    handleManualSave: N,
    handleRestart: S,
    handleEmployeeSell: C,
  };
}

function useBlindMode() {
  const [e, n] = React.useState(() => {
    try {
      return window.localStorage.getItem("sweet-night") === "1";
    } catch {
      return !1;
    }
  });
  React.useEffect(() => {
    document.documentElement.classList.toggle("night", e);
  }, [e]);
  const s = React.useCallback(() => {
    n((a) => {
      const o = !a;
      try {
        window.localStorage.setItem("sweet-night", o ? "1" : "0");
      } catch {}
      return o;
    });
  }, []);
  return { night: e, toggleNight: s };
}

const FONT_SCALE_MAP = { small: 0.8, mediumSmall: 0.85, medium: 0.9, large: 1, xlarge: 1.15 };

function useFontScale(e, n = 1) {
  (React.useEffect(() => {
    const s = () => {
      const a = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
        o = Math.min(1.8, Math.max(0.85, a / 16)),
        l = e ? Math.max(1.4, o * n) : o * n;
      document.documentElement.style.setProperty("--player-font-scale", l.toFixed(3));
    };
    return (
      s(),
      window.addEventListener("resize", s),
      document.addEventListener("visibilitychange", s),
      () => {
        (window.removeEventListener("resize", s),
          document.removeEventListener("visibilitychange", s));
      }
    );
  }, [e, n]),
    React.useEffect(
      () =>
        watchSystemA11yPrefs(() => {
          const o = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
            l = Math.min(1.8, Math.max(0.85, o / 16));
          document.documentElement.style.setProperty("--sys-font-scale", l.toFixed(3));
        }),
      [],
    ));
}

const INTERACTIVE_TAGS = new Set([
  "BUTTON",
  "A",
  "INPUT",
  "TEXTAREA",
  "SELECT",
  "LABEL",
  "OPTION",
  "SVG",
  "PATH",
  "NAV",
]);

function isInteractiveElement(e) {
  var f;
  const n = e.tagName;
  if (INTERACTIVE_TAGS.has(n)) return !1;
  const s = typeof e.className == "string" ? e.className : "";
  if (!s.includes("game-card") && !s.includes("rounded")) return !1;
  const a = ((f = e.ownerDocument) == null ? void 0 : f.defaultView) ?? null,
    o = a ? a.getComputedStyle(e) : null;
  if (!o) return !1;
  const l = o.borderRadius;
  if (!l || l === "0px" || l === "0") return !1;
  const c = o.backgroundColor;
  if (!c || c === "transparent" || c === "rgba(0, 0, 0, 0)") return !1;
  const u = o.position;
  return !(u === "absolute" || u === "fixed" || u === "sticky");
}

function getCardDepth(e) {
  let n = 1,
    s = e.parentElement;
  for (; s && n < 7;) (isInteractiveElement(s) && (n += 1), (s = s.parentElement));
  return n;
}

function markCardDepths(e, n) {
  const s = new Set(e.querySelectorAll('[class*="rounded"], .game-card'));
  for (const a of n) s.add(a);
  for (const a of s)
    if (isInteractiveElement(a)) {
      const o = getCardDepth(a);
      (a.getAttribute("data-card-depth") !== String(o) &&
        a.setAttribute("data-card-depth", String(o)),
        n.add(a));
    } else
      (a.hasAttribute("data-card-depth") || n.has(a)) &&
        (a.removeAttribute("data-card-depth"), n.delete(a));
}

function observeCardDepths(e) {
  const n = new Set(),
    s = e.defaultView ?? window;
  let a = 0;
  const o = () => {
    a ||
      (a = s.requestAnimationFrame(() => {
        ((a = 0), markCardDepths(e, n));
      }));
  };
  let l = null;
  const c = () => {
    l == null || l.disconnect();
    const u = e.body ?? e.documentElement;
    ((l = new MutationObserver(o)),
      l.observe(u, { childList: !0, subtree: !0, attributes: !0, attributeFilter: ["class"] }));
  };
  if ((o(), e.body)) c();
  else {
    const u = new MutationObserver(() => {
      e.body && (u.disconnect(), c(), o());
    });
    (u.observe(e.documentElement, { childList: !0, subtree: !0 }), (l = u));
  }
  return () => {
    (a && s.cancelAnimationFrame(a), l == null || l.disconnect());
    for (const u of n) u.removeAttribute("data-card-depth");
    n.clear();
  };
}

function GameContainer() {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      id: "container",
      className: "flex min-h-screen flex-col items-center justify-center",
      children: [
        jsxRuntime.jsx("span", { className: "emoji animate-bounce text-6xl", children: "🍰" }),
        jsxRuntime.jsx("p", { className: "mt-3 font-black text-[#ffd970]", children: "甜蜜物语加载中…" }),
      ],
    }),
  );
}

function CharacterSetupForm({
  playerName: e,
  onPlayerName: n,
  shopName: s,
  onShopName: a,
  onRandomName: o,
  onRandomShop: l,
  gender: c,
  onGender: u,
  age: f,
  onAge: g,
  season: d,
  onSeason: i,
  onStart: x,
}) {
  return jsxRuntime.jsxs("div", {
    className: "game-card mt-8 space-y-4",
    children: [
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsx("label", {
            htmlFor: "player-name",
            className: "mb-1 block text-sm font-black text-[#4a2c17]",
            children: "店主名字",
          }),
          jsxRuntime.jsxs("div", {
            className: "flex items-stretch gap-2",
            children: [
              jsxRuntime.jsx("input", {
                id: "player-name",
                "data-testid": "input-player-name",
                value: e,
                onChange: (m) => n(m.target.value),
                placeholder: "比如：林小雨",
                maxLength: 12,
                className:
                  "min-w-0 flex-1 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-3 py-2.5 text-base font-bold text-[#4a2c17] outline-none placeholder:text-[#d4bc9f] focus:border-[#ff6b81]",
              }),
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-random-name",
                onClick: o,
                "aria-label": "随机店主名字",
                className: "btn-chunky btn-sm shrink-0",
                style: { background: "#fff3bf", borderColor: "#e0a800", color: "#7a5200" },
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎲" }), " 随机"],
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsx("label", {
            htmlFor: "shop-name",
            className: "mb-1 block text-sm font-black text-[#4a2c17]",
            children: "店名",
          }),
          jsxRuntime.jsxs("div", {
            className: "flex items-stretch gap-2",
            children: [
              jsxRuntime.jsx("input", {
                id: "shop-name",
                "data-testid": "input-shop-name",
                value: s,
                onChange: (m) => a(m.target.value),
                placeholder: "比如：街角甜品屋",
                maxLength: 12,
                className:
                  "min-w-0 flex-1 rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-3 py-2.5 text-base font-bold text-[#4a2c17] outline-none placeholder:text-[#d4bc9f] focus:border-[#ff6b81]",
              }),
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-random-shop",
                onClick: l,
                "aria-label": "随机店名",
                className: "btn-chunky btn-sm shrink-0",
                style: { background: "#fff3bf", borderColor: "#e0a800", color: "#7a5200" },
                children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎲" }), " 随机"],
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsx("p", {
            className: "mb-1 block text-sm font-black text-[#4a2c17]",
            children: "角色性别（决定可购买的服饰）",
          }),
          jsxRuntime.jsxs("div", {
            className: "flex gap-2",
            children: [
              jsxRuntime.jsxs("label", {
                "data-testid": "gender-female",
                className: `flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 text-base font-black ${c === "female" ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-[#fffdf8] text-[#6b4226]"}`,
                children: [
                  jsxRuntime.jsx("input", {
                    type: "radio",
                    name: "gender",
                    className: "sr-only",
                    checked: c === "female",
                    onChange: () => u("female"),
                  }),
                  jsxRuntime.jsx("span", { className: "emoji", children: "👩" }),
                  " 女生",
                ],
              }),
              jsxRuntime.jsxs("label", {
                "data-testid": "gender-male",
                className: `flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border-2 px-3 py-2.5 text-base font-black ${c === "male" ? "border-[#4fc3f7] bg-[#e1f5fe] text-[#c62828]" : "border-[#f0dcc0] bg-[#fffdf8] text-[#6b4226]"}`,
                children: [
                  jsxRuntime.jsx("input", {
                    type: "radio",
                    name: "gender",
                    className: "sr-only",
                    checked: c === "male",
                    onChange: () => u("male"),
                  }),
                  jsxRuntime.jsx("span", { className: "emoji", children: "👨" }),
                  " 男生",
                ],
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsx("label", {
            htmlFor: "player-age",
            className: "mb-1 block text-sm font-black text-[#4a2c17]",
            children: "角色年龄（不得小于 20 岁）",
          }),
          jsxRuntime.jsx("input", {
            id: "player-age",
            "data-testid": "input-player-age",
            type: "number",
            min: 20,
            max: 99,
            value: f,
            onChange: (m) => g(m.target.value),
            placeholder: "25",
            className:
              "w-full rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-3 py-2.5 text-base font-bold text-[#4a2c17] outline-none placeholder:text-[#d4bc9f] focus:border-[#ff6b81]",
          }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        children: [
          jsxRuntime.jsx("p", {
            className: "mb-1 block text-sm font-black text-[#4a2c17]",
            children: "开始季节（决定开局日期与节气天气）",
          }),
          jsxRuntime.jsxs("div", {
            className: "flex flex-wrap gap-2",
            children: [
              ["spring", "🌸", "春季"],
              ["summer", "☀️", "夏季"],
              ["autumn", "🍂", "秋季"],
              ["winter", "❄️", "冬季"],
            ].map((sV) =>
              jsxRuntime.jsxs(
                "label",
                {
                  "data-testid": `season-${sV[0]}`,
                  className: `flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-xl border-2 px-2 py-2.5 text-sm font-black ${d === sV[0] ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-[#fffdf8] text-[#6b4226]"}`,
                  children: [
                    jsxRuntime.jsx("input", {
                      type: "radio",
                      name: "start-season",
                      className: "sr-only",
                      checked: d === sV[0],
                      onChange: () => i(sV[0]),
                    }),
                    jsxRuntime.jsxs("span", { className: "emoji", children: [sV[1], " ", sV[2]] }, sV[0]),
                  ],
                },
                sV[0],
              ),
            ),
          }),
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-start",
        onClick: x,
        className: "btn-chunky btn-pink w-full py-3 text-lg",
        children: ["开始经营 ", jsxRuntime.jsx("span", { className: "emoji", children: "🚀" })],
      }),
      jsxRuntime.jsx("p", {
        className: "text-center text-[11px] leading-relaxed text-[#ffd9a0]",
        children: "烘焙点心 → 上架售卖 → 赚钱研发新配方，注意食材会变质，小镇和伙伴也别错过！",
      }),
    ],
  });
}

function TitleScreen({
  playerName: e,
  onPlayerName: n,
  shopName: s,
  onShopName: a,
  onRandomName: o,
  onRandomShop: l,
  gender: c,
  onGender: u,
  age: f,
  onAge: g,
  season,
  onSeason,
  blindMode: x,
  blindAsk: m,
  toast: p,
  onToastDone: y,
  onStart: j,
  onEnableBlind: v,
  onDismissBlind: w,
  onDisableBlind: N,
}) {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      id: "container",
      className: `title-screen flex min-h-screen flex-col px-6 ${x ? "blind-mode" : ""}`,
      children: [
        jsxRuntime.jsxs("div", {
          className: "bounce-in mx-auto text-center",
          children: [
            jsxRuntime.jsxs("p", {
              className: "text-6xl",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🍰" }),
                jsxRuntime.jsx("span", { className: "emoji", children: "🏪" }),
              ],
            }),
            jsxRuntime.jsx("h1", {
              className: "mt-3 text-4xl font-black tracking-wide text-[#ffd970]",
              children: "甜蜜物语",
            }),
            jsxRuntime.jsx("p", {
              className: "mt-1.5 text-sm font-bold text-[#ffd9a0]",
              children: "开一家属于自己的蛋糕店吧",
            }),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "mt-2.5 flex justify-center",
          children: x
            ? jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-title-blind-off",
                onClick: N,
                className: "btn-chunky btn-sm shrink-0",
                style: { background: "#fff3bf", borderColor: "#b8860b", color: "#6d4c00" },
                children: [
                  jsxRuntime.jsx("span", {
                    className: "material-icons",
                    style: { fontSize: 15 },
                    "aria-hidden": "true",
                    children: "accessibility_new",
                  }),
                  "盲人模式已开启 · 点击关闭",
                ],
              })
            : jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-title-blind-on",
                onClick: v,
                className: "btn-chunky btn-sm shrink-0",
                style: { background: "#fff3bf", borderColor: "#b8860b", color: "#6d4c00" },
                children: [
                  jsxRuntime.jsx("span", {
                    className: "material-icons",
                    style: { fontSize: 15 },
                    "aria-hidden": "true",
                    children: "accessibility_new",
                  }),
                  "盲人模式",
                ],
              }),
        }),
        x &&
          jsxRuntime.jsx("div", {
            className: "blind-ask-banner mt-3",
            "data-testid": "blind-title-tip",
            children: jsxRuntime.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                jsxRuntime.jsx("span", {
                  className: "material-icons shrink-0",
                  style: { fontSize: 20 },
                  "aria-hidden": "true",
                  children: "accessibility_new",
                }),
                jsxRuntime.jsx("p", {
                  className: "min-w-0 flex-1 text-sm font-black leading-snug text-[#3e2723]",
                  children: "盲人模式已开启：名字与店名已自动填写，点击「开始经营」即可开始游戏",
                }),
              ],
            }),
          }),
        m && jsxRuntime.jsx(BlindModeAskBanner, { onEnable: v, onDismiss: w, onReplay: () => announce(BLIND_ASK_TEXT) }),
        jsxRuntime.jsx(CharacterSetupForm, {
          playerName: e,
          onPlayerName: n,
          shopName: s,
          onShopName: a,
          onRandomName: o,
          onRandomShop: l,
          gender: c,
          onGender: u,
          age: f,
          onAge: g,
          season,
          onSeason,
          onStart: j,
        }),
        jsxRuntime.jsx(ToastNotice, { toast: p, onDone: y }),
      ],
    }),
  );
}

function speak(e) {
  try {
    isBlindModeEnabled() ? announce(e) : announceA11y(e);
  } catch {}
}

function CollapsibleHeader({ open: e, onToggle: n, title: s, right: a, tone: o }) {
  const l = () => {
    (speak(`「${s}」已${e ? "收起" : "展开"}`), n());
  };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "mb-2 flex items-center justify-between gap-2",
      children: [
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": `fold-${s}`,
          "aria-expanded": e,
          onClick: l,
          className: "flex min-w-0 flex-1 items-center gap-1 text-left",
          children: [
            jsxRuntime.jsx("span", {
              className: `fold-title-text material-icons shrink-0 text-lg transition-transform ${e ? "" : "-rotate-90"}`,
              style: { color: o ?? "#c62828" },
              "aria-hidden": "true",
              children: "expand_more",
            }),
            jsxRuntime.jsx("span", {
              className: "fold-title-text truncate font-black",
              style: { color: o ?? "#c62828" },
              children: segmentByEmoji(s),
            }),
            jsxRuntime.jsx("span", {
              className: "shrink-0 text-[10px] font-bold text-[#b08a6a]",
              children: e ? "收起" : "展开",
            }),
          ],
        }),
        a &&
          jsxRuntime.jsx("span", {
            className: "block shrink-0 text-right",
            style: { maxWidth: "46%", lineHeight: 1.4 },
            children: a,
          }),
      ],
    }),
  );
}

function SectionCard(e) {
  const { title: n, emoji: s, sub: a, open: o, onToggle: l, testId: c, children: u } = e,
    f = () => {
      (speak(`「${n}」已${o ? "收起" : "展开"}${a ? `，${a}` : ""}`), l());
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("section", {
      className: "game-card ",
      children: [
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": c,
          "aria-expanded": o,
          onClick: f,
          className: "flex w-full items-center gap-2 text-left active:scale-[0.99]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji text-2xl leading-none", children: s }),
            jsxRuntime.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsx("span", {
                  className: "block text-base font-black text-[#4a2c17]",
                  children: n,
                }),
                a &&
                  jsxRuntime.jsx("span", {
                    className: "block truncate text-[11px] font-bold text-[#b08a6a]",
                    children: a,
                  }),
              ],
            }),
            jsxRuntime.jsx("span", {
              "aria-hidden": "true",
              className: `shrink-0 text-base font-black text-[#4a2c17] transition-transform duration-200 ${o ? "" : "-rotate-90"}`,
              children: "▾",
            }),
          ],
        }),
        o && jsxRuntime.jsx("div", { className: "mt-2.5", children: u }),
      ],
    }),
  );
}

function CardSection({
  title: e,
  open: n,
  onToggle: s,
  right: a,
  tone: o,
  className: l,
  style: c,
  children: u,
}) {
  return jsxRuntime.jsxs("section", {
    className: l ?? "game-card",
    style: c,
    children: [
      jsxRuntime.jsx(CollapsibleHeader, { open: n, onToggle: s, title: e, right: a, tone: o }),
      n && jsxRuntime.jsx("div", { className: "mt-1 space-y-2", children: u }),
    ],
  });
}

function BookRow({ book: e, state: n, onRead: s }) {
  const a = n.home,
    o = a.readBooks.includes(e.id),
    l = n.energy >= e.energy && (!o || e.repeatable),
    c = getBookProgress(a, e.id);
  return jsxRuntime.jsxs("div", {
    className: `flex flex-col rounded-xl bg-[#fbf3e4] p-2.5 ${o && !e.repeatable ? "opacity-60" : ""}`,
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center justify-between",
        children: [
          jsxRuntime.jsx("span", { className: "emoji text-2xl", children: e.emoji }),
          o &&
            !e.repeatable &&
            jsxRuntime.jsx("span", {
              className:
                "rounded-full bg-[#e3f2fd] px-1.5 py-px text-[9px] font-bold text-[#c62828]",
              children: "已读 ✓",
            }),
          e.repeatable &&
            jsxRuntime.jsx("span", {
              className:
                "rounded-full bg-[#fff3e0] px-1.5 py-px text-[9px] font-bold text-[#e65100]",
              children: "可反复",
            }),
        ],
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-1 line-clamp-1 text-sm font-black text-[#4a2c17]",
        children: ["《", e.name, "》"],
      }),
      jsxRuntime.jsx("p", {
        className: "mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-[#b08a6a]",
        children: e.desc,
      }),
      jsxRuntime.jsxs("p", {
        className: "mt-0.5 text-[10px] font-bold text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
          e.energy,
          " 精力 · 理解度 +",
          e.knowledgeGain,
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-1",
        children: [
          jsxRuntime.jsxs("div", {
            className: "flex justify-between text-[9px] font-bold text-[#b08a6a]",
            children: [
              jsxRuntime.jsx("span", { children: "阅读进度" }),
              jsxRuntime.jsxs("span", { className: "num", children: [c, "%"] }),
            ],
          }),
          jsxRuntime.jsx("div", {
            className: "bar-track mt-0.5",
            style: { height: 8 },
            role: "progressbar",
            "aria-valuemin": 0,
            "aria-valuemax": 100,
            "aria-valuenow": c,
            "aria-label": `阅读进度 ${c}%`,
            children: jsxRuntime.jsx("div", {
              className: "bar-fill",
              style: { width: `${c}%`, background: "linear-gradient(90deg,#ffe082,#ffc53d)" },
            }),
          }),
        ],
      }),
      jsxRuntime.jsx("button", {
        type: "button",
        "data-testid": `btn-read-${e.id}`,
        onClick: () => s(e.id),
        disabled: !l,
        className: "btn-chunky btn-xs btn-yellow mt-1.5 w-full",
        children: o && !e.repeatable ? "读完" : "阅读",
      }),
    ],
  });
}

const READ_FILTERS = [
  { id: "all", label: "全部" },
  { id: "unread", label: "未读" },
  { id: "read", label: "已读" },
  { id: "repeatable", label: "可反复" },
];

function BooksPanel({ state: e, commit: n, open: s, onToggle: a }) {
  const [o, l] = React.useState("all"),
    c = e.home,
    u = BOOKS_GAME.filter((g) => {
      if (!c.ownedBooks.includes(g.id)) return !1;
      const x = c.readBooks.includes(g.id);
      return o === "unread" ? !x : o === "read" ? x : o === "repeatable" ? !!g.repeatable : !0;
    }),
    f = (g) => {
      const x = readBook(e, g);
      n(x.state, x.message, x.ok ? "success" : "error");
    };
  return jsxRuntime.jsxs("section", {
    className: "game-card",
    children: [
      jsxRuntime.jsx(CollapsibleHeader, {
        open: s,
        onToggle: a,
        title: "📚 书架",
        right: jsxRuntime.jsx("span", {
          className: "text-[10px] font-bold text-[#b08a6a]",
          children: "只显示已购买的书 · 阅读解锁新食谱",
        }),
      }),
      s &&
        jsxRuntime.jsxs("div", {
          className: "mt-1",
          children: [
            jsxRuntime.jsxs("p", {
              className:
                "rounded-lg bg-[#fff3bf] px-2 py-1 text-[10px] font-bold leading-relaxed text-[#b8860b]",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "📖" }),
                " 没买的书不会出现在家里：去「商店街 · 书店」购买；河边图书馆的书只能在馆内借阅、不能带走。",
              ],
            }),
            jsxRuntime.jsx("div", {
              className: "mt-2 flex flex-wrap gap-1.5",
              children: READ_FILTERS.map((g) =>
                jsxRuntime.jsx(
                  "button",
                  {
                    type: "button",
                    "data-testid": `book-filter-${g.id}`,
                    onClick: () => l(g.id),
                    className: `rounded-full border-2 px-2.5 py-1 text-xs font-black ${o === g.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                    children: g.label,
                  },
                  g.id,
                ),
              ),
            }),
            jsxRuntime.jsx("div", {
              className: "mt-2 grid grid-cols-2 gap-2",
              children: u.map((g) => jsxRuntime.jsx(BookRow, { book: g, state: e, onRead: f }, g.id)),
            }),
          ],
        }),
    ],
  });
}
