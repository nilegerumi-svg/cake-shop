const FESTIVAL_ACTIVITY_LABELS = {
    new_year: "逛庙会",
    lantern: "赏花灯",
    new_year_solar: "看烟花",
    valentine: "逛花市",
    sakura: "赏樱花",
    labor: "逛游园会",
    sweet_fest: "逛甜品市集",
    qixi: "放河灯",
    mid_autumn: "赏月",
    harvest: "庆丰收",
    national: "看演出",
    winter_solstice: "逛暖冬集市",
    christmas: "逛彩灯夜市",
  },
  FAMILY_MEMBER_GROUPS = [
    ["ahe", "gao_jianjun", "fang_yuanshan", "chen_yuan"],
    ["lin_xiaolu", "du_ruoxi", "song_xiaoyu"],
    ["jiang_xue", "du_ruoxi", "zhao_weimin"],
    ["gu_yifan", "zheng_zixuan"],
    ["shen_jiahe", "yang_yinuo", "zhou_ziang"],
    ["xiaotian", "ahe", "wang_xiuying", "su_lihua", "tian_tian"],
    ["wen_shouren", "fang_xuemei", "he_jing", "su_zhiyuan"],
    ["xiaomei", "lin_dahai", "zhao_chunmei", "tian_guanglin"],
    ["wen_yanzhou", "song_yanan", "su_jianguo", "zhao_weimin"],
  ],
  FAMILY_LINKS = {};

for (const e of FAMILY_MEMBER_GROUPS)
  for (const n of e) {
    FAMILY_LINKS[n] || (FAMILY_LINKS[n] = new Set());
    for (const s of e) s !== n && FAMILY_LINKS[n].add(s);
  }

const RELATION_KINDS = ["partner", "family", "friend", "hobby"],
  MAX_RELATION_DEPTH = 4;

function relationKindOf(e, n) {
  var o;
  const s = getPartnerRelation(e);
  if (s && s.partner === n) return "partner";
  const a = getFamilyOf(e);
  if (a) {
    if (
      (Array.isArray(a.children) && a.children.includes(n)) ||
      (Array.isArray(a.parents) && a.parents.includes(n)) ||
      (Array.isArray(a.siblings) && a.siblings.includes(n))
    )
      return "family";
    if (
      (Array.isArray(a.bestFriends) && a.bestFriends.includes(n)) ||
      (Array.isArray(a.eternalFriends) && a.eternalFriends.includes(n)) ||
      (Array.isArray(a.friends) && a.friends.includes(n))
    )
      return "friend";
  }
  return (o = FAMILY_LINKS[e]) != null && o.has(n) ? "hobby" : null;
}

const relationGroupCache = new Map();

function getRelationGroups(e, n) {
  var g;
  if (!isFestivalDay(e)) return [];
  const s = `${e}-${n}`,
    a = relationGroupCache.get(s);
  if (a) return a;
  const o = [],
    l = new Set(),
    c = Object.keys(NPC_RUNTIME_DATA).sort(),
    u = (x) => getFestivalEventById(x, e, n),
    f = (x, m) => {
      const p = u(x);
      return !!p && p.access === "public" && p.place === m;
    };
  for (const x of c) {
    if (l.has(x)) continue;
    const m = u(x);
    if (!m || m.access !== "public") continue;
    const p = (g = getPartnerRelation(x)) == null ? void 0 : g.partner;
    !p ||
      l.has(p) ||
      !f(p, m.place) ||
      (o.push({ members: [x, p], type: "partner" }), l.add(x), l.add(p));
  }
  for (const x of c) {
    if (l.has(x)) continue;
    const m = u(x);
    if (!m || m.access !== "public") continue;
    let p = null,
      y = 1 / 0;
    for (const N of o)
      if (!(N.members.length >= MAX_RELATION_DEPTH))
        for (const S of N.members) {
          const C = relationKindOf(x, S),
            V = C ? RELATION_KINDS.indexOf(C) : 1 / 0;
          V < y && ((p = N), (y = V));
        }
    if (p) {
      (p.members.push(x), l.add(x));
      continue;
    }
    const j = { members: [x], type: "friend" },
      v = [];
    for (const N of c) {
      if (N === x || l.has(N)) continue;
      const S = relationKindOf(x, N);
      S && v.push({ id: N, level: RELATION_KINDS.indexOf(S) });
    }
    v.sort((N, S) => N.level - S.level);
    let w = null;
    for (const N of v) {
      if (j.members.length >= MAX_RELATION_DEPTH) break;
      f(N.id, m.place) &&
        (j.members.push(N.id),
        l.add(N.id),
        (w === null || N.level < RELATION_KINDS.indexOf(w)) && (w = RELATION_KINDS[N.level] ?? "friend"));
    }
    ((j.type = w ?? "friend"), o.push(j));
  }
  return (relationGroupCache.set(s, o), o);
}

function closestGroupMember(e, n) {
  let s = null,
    a = 1 / 0;
  for (const o of n.members) {
    if (o === e) continue;
    const l = relationKindOf(e, o),
      c = l ? RELATION_KINDS.indexOf(l) : 1 / 0;
    c < a && ((s = o), (a = c));
  }
  return s;
}

function findSharedGroup(e, n, s) {
  const a = getRelationGroups(e, n).find((o) => o.members.includes(s));
  return a && a.members.length >= 2 ? a : null;
}

function mutualRelationKind(e, n, s) {
  const a = findSharedGroup(e, n, s);
  if (!a) return null;
  const o = closestGroupMember(s, a);
  return o ? relationKindOf(s, o) : null;
}

function groupCompanions(e, n, s) {
  const a = findSharedGroup(e, n, s);
  return a
    ? a.members
        .filter((o) => o !== s)
        .map((o) => {
          var l;
          return { id: o, name: ((l = NPC_RUNTIME_DATA[o]) == null ? void 0 : l.name) ?? "" };
        })
        .filter((o) => o.name.length > 0)
    : [];
}

function pickGroupChatPartner(e, n, s, a) {
  var g;
  if (!a || a.access !== "public") return null;
  const o = findSharedGroup(e, n, s);
  if (!o) return null;
  const l = closestGroupMember(s, o);
  if (!l) return null;
  const c = isFestivalDay(e),
    u = c ? FESTIVAL_ACTIVITY_LABELS[c] : void 0,
    f = (g = NPC_RUNTIME_DATA[l]) == null ? void 0 : g.name;
  return !u || !f ? null : { ...a, activity: `和${f}一起${u}`, access: "public" };
}

const NIGHT_MARKET_STALLS = [
    {
      id: "nm_food1",
      name: "食品摊·关东煮",
      emoji: "🍢",
      kind: "food",
      desc: "热腾腾的关东煮，汤底是老板的祖传配方",
    },
    {
      id: "nm_food2",
      name: "食品摊·炸物",
      emoji: "🍤",
      kind: "food",
      desc: "刚出锅的炸物，油香飘出半条街",
    },
    {
      id: "nm_clothes",
      name: "衣服摊",
      emoji: "👕",
      kind: "clothes",
      desc: "地摊货衣服，便宜又热闹",
    },
    {
      id: "nm_toy1",
      name: "玩具摊·积木",
      emoji: "🧱",
      kind: "toy",
      desc: "一筐筐积木堆成小山，孩子们挑花了眼",
    },
    {
      id: "nm_toy2",
      name: "玩具摊·布偶",
      emoji: "🧸",
      kind: "toy",
      desc: "软乎乎的布偶挂了一排，个个都想要",
    },
    {
      id: "nm_toy3",
      name: "玩具摊·小车",
      emoji: "🚗",
      kind: "toy",
      desc: "小汽车嘀嘀响，路过的小孩都走不动道",
    },
    {
      id: "nm_ring1",
      name: "套圈玩偶摊·橡皮鸭",
      emoji: "🎯",
      kind: "ring",
      desc: "铁圈叮当响，套中橡皮鸭就是真本事",
    },
    {
      id: "nm_ring2",
      name: "套圈玩偶摊·长耳兔",
      emoji: "⭕",
      kind: "ring",
      desc: "长耳兔玩偶摆了一排，看着就眼馋",
    },
    {
      id: "nm_fish",
      name: "捞金鱼摊",
      emoji: "🐟",
      kind: "fish",
      desc: "纸网一碰水就破，捞到全靠手稳",
    },
    {
      id: "nm_castle",
      name: "气球城堡",
      emoji: "🎈",
      kind: "castle",
      desc: "孩子们在里面蹦跳，大人在外面看着乐",
    },
  ],
  NIGHT_MARKET_STALL_MAP = Object.fromEntries(NIGHT_MARKET_STALLS.map((e) => [e.id, e])),
  STALL_FLAVOR_LINES = {
    food: [
      "刚起锅的关东煮冒着白气，摊主舀汤的手就没停过，排队的人都说这口汤最解乏。",
      "炸物摊的铁网架上一排金黄，老板喊着“趁热吃”，香味把路过的人都勾了过去。",
      "摊主说今晚的萝卜炖得最透，吸饱了汤汁，一咬就化在嘴里。",
      "关东煮的鱼丸弹弹的，旁边的小孩踮着脚看锅，眼巴巴等老板多舀一勺汤。",
      "炸物刚出锅滋滋响，油花一溅，围观的街坊齐声“哇”了一下。",
      "摊主边忙边唠，说夜市摆一晚比白天开店还热闹，就是脚底板受不了。",
      "竹签串成一排的关东煮转眼就空了大半，老板又往锅里添了一屉。",
      "热汤下肚，浑身的凉气都散了，摊主笑着问要不要再加点葱花。",
    ],
    clothes: [
      "地摊上的衣服按颜色摊开，老板说都是清仓价，错过今晚可就没这价了。",
      "花手帕叠得整整齐齐，老板娘拿起来比划，说印花都是老花样，最耐看。",
      "塑料凉鞋摆了一地，老板说雨天不怕湿，穿坏了也不心疼。",
      "大码的旧牛仔挂得歪歪扭扭，老板说看着旧，洗洗就是新样子。",
      "卡通短袜一捆一捆卖，小孩挑得认真，大人在一旁掏零钱。",
      "荧光拖鞋在黑夜里特别亮眼，年轻人蹲下来试了又试。",
      "草编帽扣在老板自己脑袋上招揽生意，说是“活招牌”。",
      "起球的旧毛衣堆在角落，老板说便宜是便宜，穿出去谁认得。",
    ],
    toy: [
      "玩具摊前围了一圈小孩，老板举着布偶逗得大家咯咯笑。",
      "积木一筐筐摆开，孩子们蹲在地上比谁堆得高，谁也不服谁。",
      "小汽车在摊板上滑来滑去，老板说“嘀嘀”一响，小孩就走不动道了。",
      "布偶挂了一排，老板娘说每只都是手工缝的，抱回家能当枕头。",
      "积木摊的老板现场搭了个小房子，说买回去照着搭，保准不亏。",
      "小孩攥着零钱在摊前站了老半天，终于挑中一只最顺眼的。",
      "玩具摊的灯最亮，五颜六色的小玩意儿晃得人眼睛都挪不开。",
      "摊主说夜市快收摊时最好讲价，大人听了都笑。",
    ],
    ring: [
      "铁圈叮叮当当落在玩偶上又弹开，围观的人比套圈的人还紧张。",
      "橡皮鸭排得整整齐齐，老板说套中哪只拿哪只，绝不赖账。",
      "长耳兔玩偶最靠后，老板说那是“镇摊之宝”，套中的人今晚运气爆棚。",
      "套圈的绳子被人拉得绷直，铁圈飞出去的弧线引来一片吸气声。",
      "老板往地上又摆了两排小玩偶，说加码不加价，套中就是赚到。",
      "有人连套三次都差一点，旁边的小孩急得直跺脚。",
      "长耳兔的耳朵软塌塌垂下来，套中的人举着它绕场炫耀了一圈。",
      "摊主说套圈讲究手稳心定，十圈九个空也是常有的事。",
    ],
    fish: [
      "捞金鱼的纸网一碰水就破，孩子们蹲在池边屏住呼吸，谁也不敢出声。",
      "金鱼在水里甩着尾巴游得飞快，摊主说越机灵的越难捞。",
      "有小孩刚把网子伸下去，网就破了，逗得围观的人哈哈大笑。",
      "摊主给池子换了清水，说晚上灯光一照，金鱼最精神。",
      "捞到金鱼的小孩小心翼翼地捧着塑料袋，比得了奖状还高兴。",
      "金鱼池边围的人换了一茬又一茬，纸网一摞一摞地卖。",
      "摊主说金鱼带回家要好好养，水族缸、换水一样都不能少。",
      "有人捞了三次终于成功，摊主挑了大拇指，说“手稳！”",
    ],
    castle: [
      "气球城堡里孩子们蹦蹦跳跳，笑声隔着老远都听得见。",
      "城堡里的小孩子排着队滑滑梯，一个接一个，笑得直不起腰。",
      "工作人员守在城堡门口，说只让小孩子进，大人就在外面看看。",
      "彩色气球拱门在灯下亮闪闪的，孩子们在里面追着玩。",
      "城堡里传来“再来一次”的喊声，家长们在外面举着手机拍个不停。",
      "小孩从城堡里探出脑袋，朝外面的家长比了个“耶”。",
      "气球城堡的充气机嗡嗡响，老板说今晚不闭摊，孩子们玩够为止。",
      "看着孩子们在城堡里疯跑，外面的大人也跟着笑，夜市的快乐一半在这里。",
    ],
  },
  STALL_OUTFIT_IDS = [
    "o_stall_tshirt",
    "o_stall_sandals",
    "o_stall_strawhat",
    "o_stall_handkerchief",
    "o_stall_socks",
    "o_stall_sweater",
    "o_stall_jeans",
    "o_stall_slippers",
  ],
  STALL_FURNITURE_MAP = {
    nm_toy1: "f_toy_blocks",
    nm_toy2: "f_toy_doll",
    nm_toy3: "f_toy_car",
    nm_ring1: "f_toy_duck",
    nm_ring2: "f_toy_rabbit",
  },
  js = 200,
  bi = 2e3,
  Ec = 80,
  Ic = 40,
  dc = Ec + Ic,
  FISH_FEED_PRICE = 5;

function isWeekend(e) {
  return isWeekendDay(e) && !isFestivalDay(e);
}

const MIN_EVENTS_FOR_GROUP = 5,
  SOCIAL_EVENT_TABLE = {
    A: {
      id: "A",
      name: "居家生活",
      emoji: "🏠",
      events: [
        {
          id: "A1",
          text: "在家做饭收拾",
          emoji: "🍳",
          place: "@home",
          access: "private",
          when: ["morning", "evening"],
        },
        {
          id: "A2",
          text: "在家午睡小憩",
          emoji: "😴",
          place: "@home",
          access: "private",
          when: ["afternoon"],
        },
        {
          id: "A3",
          text: "在家看电视",
          emoji: "📺",
          place: "@home",
          access: "private",
          when: ["evening", "night"],
        },
        {
          id: "A4",
          text: "在家养花浇花",
          emoji: "🌷",
          place: "@home",
          access: "private",
          when: ["morning", "afternoon"],
        },
        {
          id: "A5",
          text: "在家打扫房间",
          emoji: "🧹",
          place: "@home",
          access: "private",
          when: ["morning", "afternoon"],
        },
        {
          id: "A6",
          text: "在家晒被子",
          emoji: "☀️",
          place: "@home",
          access: "private",
          when: ["morning"],
        },
        {
          id: "A7",
          text: "在家写写日记",
          emoji: "📔",
          place: "@home",
          access: "private",
          when: ["night"],
        },
        {
          id: "A8",
          text: "在家整理相册",
          emoji: "📸",
          place: "@home",
          access: "private",
          when: ["afternoon"],
        },
        {
          id: "A9",
          text: "在家听广播",
          emoji: "📻",
          place: "@home",
          access: "private",
          when: ["morning", "evening"],
        },
        {
          id: "A10",
          text: "在家修修补补",
          emoji: "🛠️",
          place: "@home",
          access: "private",
          when: ["afternoon"],
        },
      ],
    },
    B: {
      id: "B",
      name: "镇上闲逛",
      emoji: "🚶",
      events: [
        {
          id: "B1",
          text: "在广场遛弯看人下棋",
          emoji: "♟️",
          place: "plaza",
          access: "public",
          when: ["morning", "afternoon", "evening"],
        },
        {
          id: "B2",
          text: "在公园散步",
          emoji: "🌳",
          place: "park",
          access: "public",
          when: ["morning", "afternoon", "evening"],
        },
        {
          id: "B3",
          text: "在商店街逛橱窗",
          emoji: "🛍️",
          place: "street",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "B4",
          text: "在街口和熟人唠嗑",
          emoji: "💬",
          place: "street",
          access: "public",
          when: ["morning", "afternoon", "evening"],
        },
        {
          id: "B5",
          text: "在广场看人下棋支招",
          emoji: "♟️",
          place: "plaza",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "B6",
          text: "在广场看演出彩排",
          emoji: "🎪",
          place: "plaza",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "B7",
          text: "沿街遛弯看新招牌",
          emoji: "🏬",
          place: "street",
          access: "public",
          when: ["morning", "evening"],
        },
        {
          id: "B8",
          text: "在桥边看风景",
          emoji: "🌉",
          place: "river",
          access: "public",
          when: ["morning", "evening"],
        },
      ],
    },
    C: {
      id: "C",
      name: "户外运动",
      emoji: "🏃",
      events: [
        {
          id: "C1",
          text: "在河边钓鱼",
          emoji: "🎣",
          place: "river",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "C2",
          text: "在河边抓泥鳅",
          emoji: "🐟",
          place: "river",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "C3",
          text: "在河边散步看船",
          emoji: "🚢",
          place: "river",
          access: "public",
          when: ["evening"],
        },
        {
          id: "C4",
          text: "在公园锻炼",
          emoji: "🏃",
          place: "park",
          access: "public",
          when: ["morning", "evening"],
        },
        {
          id: "C5",
          text: "在公园晨跑",
          emoji: "🏃‍♀️",
          place: "park",
          access: "public",
          when: ["morning"],
        },
        {
          id: "C6",
          text: "在公园放风筝",
          emoji: "🪁",
          place: "park",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "C7",
          text: "在河边打水漂",
          emoji: "🪨",
          place: "river",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "C8",
          text: "在田埂散步",
          emoji: "🌾",
          place: "garden",
          access: "public",
          when: ["morning", "afternoon"],
        },
      ],
    },
    D: {
      id: "D",
      name: "文艺安静",
      emoji: "📚",
      events: [
        {
          id: "D1",
          text: "在图书馆借书阅读",
          emoji: "📚",
          place: "library",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "D2",
          text: "去收容所帮忙照看小动物",
          emoji: "🐾",
          place: "shelter",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "D3",
          text: "去农贸市场转转挑新鲜货",
          emoji: "🥬",
          place: "market",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "D4",
          text: "去收容所给猫狗梳毛",
          emoji: "🐱",
          place: "shelter",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "D5",
          text: "去农贸市场挑新鲜食材",
          emoji: "🧺",
          place: "market",
          access: "public",
          when: ["morning"],
        },
        {
          id: "D6",
          text: "在家整理收藏",
          emoji: "🗃️",
          place: "@home",
          access: "private",
          when: ["afternoon"],
        },
        {
          id: "D7",
          text: "在河边写生画画",
          emoji: "🎨",
          place: "river",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "D8",
          text: "在公园长椅上看书",
          emoji: "📖",
          place: "park",
          access: "public",
          when: ["afternoon"],
        },
      ],
    },
    E: {
      id: "E",
      name: "社交往来",
      emoji: "🍪",
      events: [
        {
          id: "E1",
          text: "带点心去邻居家串门",
          emoji: "🍪",
          place: "community",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "E2",
          text: "约邻居喝茶聊天",
          emoji: "☕",
          place: "community",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "E3",
          text: "和邻居结伴散步",
          emoji: "🚶",
          place: "community",
          access: "public",
          when: ["evening"],
        },
        {
          id: "E4",
          text: "约邻居喝茶下棋",
          emoji: "♟️",
          place: "community",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "E5",
          text: "帮邻居搭把手",
          emoji: "👐",
          place: "community",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "E6",
          text: "和邻居结伴去河边",
          emoji: "🏞️",
          place: "community",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "E7",
          text: "在小区门口和街坊聊天",
          emoji: "💬",
          place: "community",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "E8",
          text: "去邻居家借东西唠家常",
          emoji: "🏠",
          place: "community",
          access: "public",
          when: ["afternoon", "evening"],
        },
      ],
    },
    F: {
      id: "F",
      name: "购物消费",
      emoji: "🛒",
      events: [
        {
          id: "F1",
          text: "去商店街买日用品",
          emoji: "🧴",
          place: "street",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "F2",
          text: "去超市逛逛",
          emoji: "🛒",
          place: "street",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "F3",
          text: "去花店买束花",
          emoji: "💐",
          place: "street",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "F4",
          text: "去布料行看新花样",
          emoji: "🧵",
          place: "street",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "F5",
          text: "去书店翻翻新书",
          emoji: "📖",
          place: "street",
          access: "public",
          when: ["afternoon", "evening"],
        },
        {
          id: "F6",
          text: "去杂货铺补点货",
          emoji: "🧺",
          place: "street",
          access: "public",
          when: ["morning", "afternoon"],
        },
        {
          id: "F7",
          text: "给家里添点小东西",
          emoji: "🏺",
          place: "street",
          access: "public",
          when: ["afternoon"],
        },
        {
          id: "F8",
          text: "去农贸市场买点干货",
          emoji: "🥜",
          place: "market",
          access: "public",
          when: ["morning", "afternoon"],
        },
      ],
    },
    G: {
      id: "G",
      name: "校园少年",
      emoji: "🎒",
      events: [
        {
          id: "G1",
          text: "在家写作业",
          emoji: "✏️",
          place: "@home",
          access: "private",
          when: ["afternoon", "evening"],
          minorOnly: !0,
        },
        {
          id: "G2",
          text: "和小伙伴在公园打球",
          emoji: "⚽",
          place: "park",
          access: "public",
          when: ["afternoon"],
          minorOnly: !0,
        },
        {
          id: "G3",
          text: "和同学在广场玩游戏",
          emoji: "🎮",
          place: "plaza",
          access: "public",
          when: ["afternoon", "evening"],
          minorOnly: !0,
        },
        {
          id: "G4",
          text: "在家帮爸妈干活",
          emoji: "🧺",
          place: "@home",
          access: "private",
          when: ["morning", "afternoon", "evening"],
          minorOnly: !0,
        },
        {
          id: "G5",
          text: "在小区跳绳踢毽子",
          emoji: "🪢",
          place: "community",
          access: "public",
          when: ["afternoon"],
          minorOnly: !0,
        },
        {
          id: "G6",
          text: "在家看漫画",
          emoji: "📚",
          place: "@home",
          access: "private",
          when: ["evening", "night"],
          minorOnly: !0,
        },
        {
          id: "G7",
          text: "在学校帮老师擦黑板",
          emoji: "🧽",
          place: "school",
          access: "public",
          when: ["afternoon"],
          minorOnly: !0,
        },
        {
          id: "G8",
          text: "和同学讨论作业",
          emoji: "📝",
          place: "community",
          access: "public",
          when: ["afternoon"],
          minorOnly: !0,
        },
      ],
    },
    H: {
      id: "H",
      name: "家庭团聚",
      emoji: "🥢",
      events: [
        {
          id: "H1",
          text: "在家做晚饭",
          emoji: "🍲",
          place: "@home",
          access: "private",
          when: ["evening"],
        },
        {
          id: "H2",
          text: "和家人吃团圆饭",
          emoji: "🥢",
          place: "@home",
          access: "private",
          when: ["evening"],
        },
        {
          id: "H3",
          text: "在家和家人看电视",
          emoji: "📺",
          place: "@home",
          access: "private",
          when: ["evening", "night"],
        },
        {
          id: "H4",
          text: "早早洗漱上床休息",
          emoji: "🛏️",
          place: "@home",
          access: "private",
          when: ["night"],
        },
        {
          id: "H5",
          text: "帮家人摆碗筷",
          emoji: "🥄",
          place: "@home",
          access: "private",
          when: ["evening"],
        },
        {
          id: "H6",
          text: "饭后陪家人聊天",
          emoji: "💬",
          place: "@home",
          access: "private",
          when: ["evening", "night"],
        },
        {
          id: "H7",
          text: "给外地的孩子写信打电话",
          emoji: "📞",
          place: "@home",
          access: "private",
          when: ["evening", "night"],
        },
        {
          id: "H8",
          text: "听长辈讲老故事",
          emoji: "📖",
          place: "@home",
          access: "private",
          when: ["night"],
        },
      ],
    },
  },
  EVENT_GROUP_IDS = ["A", "B", "C", "D", "E", "F", "G", "H"],
  BASE_EVENT_WEIGHTS = { A: 0.2, B: 0.15, C: 0.1, D: 0.1, E: 0.15, F: 0.15, G: 0, H: 0.15 },
  ELDER_EVENT_WEIGHTS = { A: 0.3, B: 0.1, C: 0, D: 0.25, E: 0.1, F: 0.05, G: 0, H: 0.2 },
  WEEKEND_EVENT_WEIGHTS = { A: 0.3, B: 0, C: 0, D: 0, E: 0.1, F: 0, G: 0.3, H: 0.3 },
  NPC_EVENT_WEIGHT_OVERRIDES = {
    wang_fang: { A: 0.1, B: 0.25, C: 0.05, D: 0.05, E: 0.15, F: 0.25, G: 0, H: 0.15 },
    zhao_chunmei: { A: 0.1, B: 0.25, C: 0.05, D: 0.05, E: 0.15, F: 0.25, G: 0, H: 0.15 },
    gao_jianjun: { A: 0.15, B: 0.15, C: 0.3, D: 0.05, E: 0.1, F: 0.05, G: 0, H: 0.2 },
    wen_shouren: { A: 0.3, B: 0.05, C: 0, D: 0.3, E: 0.1, F: 0.05, G: 0, H: 0.2 },
    su_zhiyuan: { A: 0.2, B: 0.05, C: 0.05, D: 0.3, E: 0.15, F: 0.05, G: 0, H: 0.2 },
    wen_yanzhou: { A: 0.25, B: 0.05, C: 0.05, D: 0.25, E: 0.1, F: 0.05, G: 0, H: 0.25 },
    yang_yinuo: { A: 0.25, B: 0.05, C: 0.05, D: 0.25, E: 0.1, F: 0.05, G: 0, H: 0.25 },
    chen_hulan: { A: 0.25, B: 0.05, C: 0.05, D: 0.25, E: 0.1, F: 0.05, G: 0, H: 0.25 },
    chen_yuan: { A: 0.15, B: 0.3, C: 0.1, D: 0.05, E: 0.1, F: 0.1, G: 0, H: 0.2 },
    lin_dahai: { A: 0.15, B: 0.3, C: 0.1, D: 0.05, E: 0.1, F: 0.1, G: 0, H: 0.2 },
    gu_yifan: { A: 0.1, B: 0.15, C: 0.05, D: 0.3, E: 0.2, F: 0.05, G: 0, H: 0.15 },
    xu_xiaoman: { A: 0.1, B: 0.15, C: 0.05, D: 0.3, E: 0.2, F: 0.05, G: 0, H: 0.15 },
    lin_xiaolu: { A: 0.1, B: 0.15, C: 0.05, D: 0.3, E: 0.2, F: 0.05, G: 0, H: 0.15 },
    tian_tian: { A: 0.2, B: 0.1, C: 0.05, D: 0.2, E: 0.1, F: 0.1, G: 0, H: 0.25 },
    shen_jiaoyan: { A: 0.15, B: 0.1, C: 0.05, D: 0.3, E: 0.1, F: 0.05, G: 0, H: 0.25 },
  };

function getEventWeights(e) {
  const n = isMinorNpc(e) ? WEEKEND_EVENT_WEIGHTS : ageGroupOfNpc(e) === "elder" ? ELDER_EVENT_WEIGHTS : BASE_EVENT_WEIGHTS,
    s = NPC_EVENT_WEIGHT_OVERRIDES[e];
  return s ? { ...n, ...s } : n;
}

function resolveNpcPlaceKey(e, n) {
  return e === "@home" || e === "community" ? residenceAreaKeyOf(n) : e === "street" ? streetSideOf(n) : e;
}

const WORKING_LINE_PATTERN =
  /上班|值班|当值|上课|补课|出诊|坐诊|站柜台|进货|加班|工作|出摊|摆摊|收摊|看店|开店|门诊|查房|批改|备课|执勤|巡逻|站岗|帮工/;

function isNpcWorkingNow(e, n, s) {
  const o = isWeekendDay(n) ? NPC_SCHEDULES[e] : isNpcWorkingDay(e, n) ? NPC_SCHEDULES_ALL[e] : (EXTRA_SCHEDULES[e] ?? NPC_SCHEDULES_ALL[e]);
  return !Array.isArray(o) || o.length === 0
    ? !1
    : o.some((l) => s >= l.start && s < l.end && l.access === "public" && WORKING_LINE_PATTERN.test(l.activity));
}

function timeSlotOf(e, n) {
  return n < 6 || n >= 24
    ? null
    : isWeekendDay(e)
      ? n < 12
        ? "morning"
        : n < 17
          ? "afternoon"
          : n < 21
            ? "evening"
            : "night"
      : n < 8
        ? "morning"
        : n >= 12 && n < 14
          ? "afternoon"
          : n >= 17 && n < 19
            ? "evening"
            : n >= 21
              ? "night"
              : null;
}

const WEIGHT_SCALE = 100;

function pickWeightedEvent(e, n) {
  const s = e.reduce((o, l) => o + Math.round(l.w * WEIGHT_SCALE), 0);
  if (s <= 0 || e.length === 0) return null;
  let a = hashStringSeed(n, s);
  for (const o of e) {
    const l = Math.round(o.w * WEIGHT_SCALE);
    if (a < l) return o.ev;
    a -= l;
  }
  return e[e.length - 1].ev;
}

function rollEventsForNpc(e, n, s) {
  const a = getEventWeights(e),
    o = [];
  for (const l of EVENT_GROUP_IDS) {
    const c = a[l];
    if (!(c <= 0))
      for (const u of SOCIAL_EVENT_TABLE[l].events)
        u.when.includes(n) && ((u.minorOnly && !isMinorNpc(e)) || s.has(u.id) || o.push({ ev: u, w: c }));
  }
  return o;
}

const eventPoolCache = new Map();

function getNpcEventPool(e, n) {
  const s = `${e}:${n}`,
    a = eventPoolCache.get(s);
  if (a) return a;
  const o = new Set(),
    l = {},
    c = ["morning", "afternoon", "evening", "night"];
  for (const u of c) {
    const f = pickWeightedEvent(rollEventsForNpc(e, u, o), `${e}:daily-plan-${u}-v2:${n}`);
    ((l[u] = f), f && o.add(f.id));
  }
  return (eventPoolCache.set(s, l), l);
}

function pickEventForGroup(e, n, s, a, o, l) {
  const c = new Set();
  for (const f of Object.values(o)) f && c.add(f.id);
  const u = rollEventsForNpc(e, a, c).filter((f) => (f.ev.access !== "public" ? !0 : !l(resolveNpcPlaceKey(f.ev.place, e))));
  return pickWeightedEvent(u, `${e}:daily-cap-${a}-v2:${n}:${s}`);
}

let eventCache = null;

function buildEventMap(e, n) {
  var u;
  const s = new Map(),
    a = new Map(),
    o = timeSlotOf(e, n);
  if (!o) return { map: s, counts: a };
  if (isFestivalDay(e)) return { map: s, counts: a };
  if (isWeekend(e) && n >= 18) return { map: s, counts: a };
  const l = Object.keys(NPC_RUNTIME_DATA).sort(
      (f, g) => hashStringSeed(`${f}:daily-cap-order-v1:${e}`, 1e6) - hashStringSeed(`${g}:daily-cap-order-v1:${e}`, 1e6),
    ),
    c = (f) => (a.get(f) ?? 0) >= MIN_EVENTS_FOR_GROUP;
  for (const f of l) {
    if (isNpcWorkingNow(f, e, n)) continue;
    const g = getNpcEventPool(f, e);
    let x = g[o] ?? null;
    if ((x && x.access === "public" && c(resolveNpcPlaceKey(x.place, f)) && (x = pickEventForGroup(f, e, n, o, g, c)), !x)) {
      const p = residenceAreaKeyOf(f);
      s.set(f, {
        start: n,
        end: n + 1,
        place: p,
        activity: "在家歇会儿",
        emoji: "🛋️",
        access: "private",
      });
      continue;
    }
    const m = resolveNpcPlaceKey(x.place, f);
    (x.access === "public" && a.set(m, (a.get(m) ?? 0) + 1),
      s.set(f, {
        start: n,
        end: n + 1,
        place: m,
        activity: x.text.replaceAll("{name}", ((u = NPC_RUNTIME_DATA[f]) == null ? void 0 : u.name) ?? ""),
        emoji: x.emoji,
        access: x.access,
      }));
  }
  return { map: s, counts: a };
}

function pickAvailableEvents(e, n, s) {
  if (isFestivalDay(n) || (isWeekend(n) && s >= 18) || !timeSlotOf(n, s) || isNpcWorkingNow(e, n, s)) return null;
  const a = `${n}-${s}`;
  return ((!eventCache || eventCache.key !== a) && (eventCache = { key: a, ...buildEventMap(n, s) }), eventCache.map.get(e) ?? null);
}

function nightlyStallCount(e, n) {
  const s = NIGHT_MARKET_STALLS.length,
    a = 2 + hashStringSeed(`${e}:night-market-count-v1:${n}`, 2),
    o = hashStringSeed(`${e}:night-market-stalls-v1:${n}`, s),
    l = 1 + hashStringSeed(`${e}:night-market-step-v1:${n}`, 3),
    c = [];
  for (let u = 0; u < a; u += 1) c.push(NIGHT_MARKET_STALLS[(o + u * l) % s]);
  return c;
}

function willAttendNightMarket(e, n) {
  return hashStringSeed(`${e}:night-market-attend-v1:${n}`, 10) < 7;
}

function getNightMarketSchedule(e, n) {
  return !isWeekend(n) || !willAttendNightMarket(e, n)
    ? null
    : {
        start: 18,
        end: 24,
        place: "plaza",
        activity: `逛夜市（${nightlyStallCount(e, n)
          .map((o) => o.name)
          .join("、")}）`,
        emoji: "🏮",
        access: "public",
      };
}

function getNightMarketAt(e, n, s) {
  return n < 18 || n >= 24 ? null : getNightMarketSchedule(e, s);
}

function getLocationLines(e, n, s) {
  const a = s ? NPC_SCHEDULES[e] : isNpcWorkingDay(e, n) ? NPC_SCHEDULES_ALL[e] : (EXTRA_SCHEDULES[e] ?? NPC_SCHEDULES_ALL[e]);
  return Array.isArray(a) ? a : [];
}

function resolveStreetPlace(e, n) {
  return n && n.place === "street" ? { ...n, place: streetSideOf(e) } : n;
}

function getNpcLocationAt(e, n, s) {
  var g;
  const a = typeof s == "number" ? s : 1;
  if (hasNpcProfile(e) && npcSchoolStage(e, a) === "away")
    return {
      start: 0,
      end: 24,
      place: "away",
      activity: "在外地上大学",
      emoji: "🎓",
      access: "private",
    };
  const o = getFestivalEventById(e, a, n);
  if (o) return pickGroupChatPartner(a, n, e, o) ?? o;
  const l = getNightMarketAt(e, n, a);
  if (l) return l;
  const c = pickAvailableEvents(e, a, n);
  if (c) {
    const x = buildScheduleIndex(a, n)[e];
    return x && isPublicActivity(c) && x.place === c.place
      ? resolveStreetPlace(e, {
          ...c,
          place: x.place,
          activity: `和${x.partnerName}一起${x.activity}`,
          emoji: x.emoji,
          access: "public",
        })
      : c;
  }
  const u = typeof s == "number" && isWeekendDay(s),
    f = getLocationLines(e, a, u);
  if (Array.isArray(f) && f.length > 0) {
    const x = sortSchedules(f, e),
      m = x.find((y) => n >= y.start && n < y.end);
    if (m) {
      const y = currentVacation(a);
      if (y && isSchoolPlace(m.place)) {
        const w = residenceAreaKeyOf(e);
        return {
          ...m,
          place: w,
          activity: `在家过${y}`,
          emoji: y === "寒假" ? "⛄" : "🏖️",
          access: "private",
        };
      }
      const j = buildScheduleIndex(a, n)[e];
      if (j && isPublicActivity(m))
        return resolveStreetPlace(e, {
          ...m,
          place: j.place,
          activity: `和${j.partnerName}一起${j.activity}`,
          emoji: j.emoji,
          access: "public",
        });
      const v = npcSchoolPlace(e, a);
      return v && m.place === "school"
        ? { ...m, place: v, access: "private" }
        : isSchoolPlace(m.place)
          ? { ...m, access: "private" }
          : resolveStreetPlace(e, m);
    }
    const p = ((g = x.find((y) => y.access === "private")) == null ? void 0 : g.place) ?? residenceAreaKeyOf(e);
    if (n < 6)
      return { start: 0, end: 6, place: p, activity: "在家睡觉", emoji: "😴", access: "private" };
    if (n < 8)
      return { start: 6, end: 8, place: p, activity: "在家休息", emoji: "🏠", access: "private" };
    if (n >= 22)
      return { start: 22, end: 24, place: p, activity: "在家睡觉", emoji: "😴", access: "private" };
  }
  return {
    start: 0,
    end: 24,
    place: "plaza",
    activity: "在小镇闲逛",
    emoji: "🚶",
    access: "public",
  };
}

const NPC_SEASON_DISHES_A = {
    xiaotian: {
      season: "春季",
      solarTerm: "谷雨",
      dishes: ["草莓蛋糕", "马卡龙", "奶油泡芙"],
      leisure: ["逛花市", "研究新食谱", "和叙白斗嘴"],
    },
    ahe: {
      season: "秋季",
      solarTerm: "白露",
      dishes: ["苹果派", "法棍", "欧包"],
      leisure: ["揉面团", "河边钓鱼", "看面包纪录片"],
    },
    xiaomei: {
      season: "夏季",
      solarTerm: "芒种",
      dishes: ["芒果慕斯", "水蜜桃", "蜜桃挞"],
      leisure: ["照看果园", "河边吹风", "摆水果摊"],
    },
    shen_jiaoyan: {
      season: "冬季",
      solarTerm: "大雪",
      dishes: ["红酒炖牛肉", "法式浓汤"],
      leisure: ["喂猫狗", "环球旅行", "收藏各地菜谱"],
    },
    shen_jiahe: {
      season: "秋季",
      solarTerm: "秋分",
      dishes: ["司康", "英式下午茶"],
      leisure: ["记账", "喝下午茶", "织毛衣"],
    },
    xu_xiaoman: {
      season: "春季",
      solarTerm: "惊蛰",
      dishes: ["日式炸猪排", "关东煮"],
      leisure: ["照顾小动物", "研究日料", "给猫梳毛"],
    },
    gu_yifan: {
      season: "冬季",
      solarTerm: "冬至",
      dishes: ["德国猪肘", "香肠拼盘"],
      leisure: ["遛狗", "研究德国菜", "骑行"],
    },
    tian_tian: {
      season: "夏季",
      solarTerm: "夏至",
      dishes: ["绿咖喱鸡", "芒果糯米饭"],
      leisure: ["研究东南亚菜", "给小动物做饭", "逛夜市"],
    },
    zheng_zixuan: {
      season: "秋季",
      solarTerm: "白露",
      dishes: ["越南河粉", "越南小吃"],
      leisure: ["骑行", "夜骑看星星", "调车"],
    },
    lin_xiaolu: {
      season: "春季",
      solarTerm: "春分",
      dishes: ["西班牙海鲜饭", "印度咖喱"],
      leisure: ["画画", "做菜", "画领养海报"],
    },
    wen_yanzhou: {
      season: "秋季",
      solarTerm: "寒露",
      dishes: ["养生汤", "清淡家常菜"],
      leisure: ["河边散步", "看医书", "泡茶"],
    },
    yang_yinuo: {
      season: "冬季",
      solarTerm: "小雪",
      dishes: ["司康", "热红茶"],
      leisure: ["织毛衣", "逛早市", "做手工"],
    },
    su_jianguo: {
      season: "秋季",
      solarTerm: "秋分",
      dishes: ["芒果慕斯", "老式点心"],
      leisure: ["翻配方本", "和老友下棋", "遛弯"],
    },
    su_lihua: {
      season: "春季",
      solarTerm: "谷雨",
      dishes: ["草莓蛋糕", "老式面包"],
      leisure: ["烤面包", "和街坊唠嗑", "做针线"],
    },
  },
  NPC_SEASON_DISHES_B = {
    du_ruoxi: {
      season: "春季",
      solarTerm: "清明",
      dishes: ["桃子挞", "手工饼干"],
      leisure: ["做手工", "带孩子们做游戏", "画简笔画"],
    },
    bai_qiuqiu: {
      season: "夏季",
      solarTerm: "小暑",
      dishes: ["草莓蛋糕", "奶茶"],
      leisure: ["睡懒觉", "看绘本", "扎辫子"],
    },
    zhou_ziang: {
      season: "春季",
      solarTerm: "惊蛰",
      dishes: ["苹果派", "家常菜"],
      leisure: ["陪朵朵玩", "备课", "做手工"],
    },
    song_xiaoyu: {
      season: "春季",
      solarTerm: "谷雨",
      dishes: ["草莓蛋糕", "花茶"],
      leisure: ["插花", "逛花市", "陪朵朵画画"],
    },
    fang_yuanshan: {
      season: "秋季",
      solarTerm: "白露",
      dishes: ["南瓜派", "家常菜"],
      leisure: ["钓鱼", "教孩子写作业", "看球赛"],
    },
    fang_xuemei: {
      season: "秋季",
      solarTerm: "秋分",
      dishes: ["司康", "红茶"],
      leisure: ["整理书架", "读绘本", "给糖糖包书皮"],
    },
    chen_yuan: {
      season: "冬季",
      solarTerm: "冬至",
      dishes: ["炸猪排", "热汤面"],
      leisure: ["擦车", "听收音机", "钓鱼"],
    },
    wang_fang: {
      season: "夏季",
      solarTerm: "大暑",
      dishes: ["海鲜饭", "家常菜"],
      leisure: ["做菜", "收摊后串门", "和街坊聊天"],
    },
    gao_jianjun: {
      season: "夏季",
      solarTerm: "大暑",
      dishes: ["红酒炖牛肉", "烧烤"],
      leisure: ["晨跑", "看球赛", "钓鱼"],
    },
    he_jing: {
      season: "秋季",
      solarTerm: "白露",
      dishes: ["香草蛋糕", "清茶"],
      leisure: ["整理错题本", "逛公园", "读书"],
    },
    su_zhiyuan: {
      season: "秋季",
      solarTerm: "霜降",
      dishes: ["桃子挞", "清茶"],
      leisure: ["批改作文", "逛书店", "练书法"],
    },
    liu_qing: {
      season: "春季",
      solarTerm: "春分",
      dishes: ["芒果慕斯", "精致甜点"],
      leisure: ["逛服装店", "喝下午茶", "看时装杂志"],
    },
    zhao_weimin: {
      season: "秋季",
      solarTerm: "秋分",
      dishes: ["红豆糯米糍", "家乡菜"],
      leisure: ["听街头艺人唱歌", "看报纸", "遛弯"],
    },
    song_yanan: {
      season: "春季",
      solarTerm: "谷雨",
      dishes: ["草莓果汁", "小点心"],
      leisure: ["河边散步", "看剧", "整理档案"],
    },
  },
  NPC_SEASON_DISHES = { ...NPC_SEASON_DISHES_A, ...NPC_SEASON_DISHES_B },
  FESTIVAL_CHAT_LINES = {
    new_year: [
      "春节的饺子包好了吗？我家还得再蒸两屉！",
      "除夕夜的爆竹声最热闹，记得给店里也贴张福字！",
      "过年这几天，镇上的亲戚都串门来了，忙并快乐着！",
      "舞狮队一早就到广场表演了，锣鼓震天响",
      "压岁钱要好好收着，攒起来买点喜欢的",
    ],
    lantern: [
      "元宵节广场的花灯都挂起来了，猜灯谜去不去？",
      "汤圆还是黑芝麻馅的好吃，你说呢？",
      "元宵的花灯会可热闹了，我打算带孩子去看看。",
      "广场的花灯一盏比一盏好看，看得人眼花",
      "提着灯笼逛灯会，孩子们最开心了",
    ],
    new_year_solar: [
      "元旦广场要放烟花，一起去看呀！",
      "新年第一天，店里生意肯定红火！",
      "元旦这几天大家都放假，街上全是人。",
      "新的一年新的开始，大家都许了愿吧？",
      "跨年倒计时的时候，全镇的人都挤在广场上",
    ],
    valentine: [
      "情人节玫瑰和巧克力都脱销了，你的蛋糕可别断货呀！",
      "情人节限定点心卖得怎么样？我家那位都在打听。",
      "情人节那天，店里肯定全是成双成对的客人。",
      "花市上的玫瑰今天开得特别好，香气扑鼻",
      "告白墙前围了好多人，都在写心里话呢",
    ],
    sakura: [
      "樱花节河边的花全开了，野餐会你报名了吗？",
      "樱花落下来的时候，配蛋糕吃最浪漫！",
      "樱花节这几天，公园到处都是拍照的人。",
      "树下的野餐垫一块接一块，花瓣直往便当盒里落",
      "今年樱花开得比往年都盛，别错过呀",
    ],
    labor: [
      "劳动节放假，广场上全是逛街的人，你的店要忙坏了吧？",
      "五一去哪儿玩？还是打算在店里大干一场？",
      "劳动节就该好好歇歇，可开店的人哪歇得住呀。",
      "游园会上的套圈摊前排了好长的队",
      "劳动节好好犒劳一下自己，吃顿好的",
    ],
    sweet_fest: [
      "甜蜜节就要到了，今年「小镇第一甜」非你家莫属！",
      "甜蜜节的评选我可等着吃你家的新品呢！",
      "甜蜜节全镇的甜品店都出摊了，想想就开心！",
      "投票箱前排着长队，都想给自家最服气的那家投一票",
      "从市集这头吃到那头，今天先不减肥了",
    ],
    qixi: [
      "七夕晚上广场星星特别亮，听说还有放河灯的活动。",
      "七夕情侣都出来约会了，你的点心可要备足呀！",
      "七夕的牛郎织女相会，河边肯定全是看星星的人。",
      "河灯一点一点飘远，许的愿也跟着走了",
      "今晚的星星真亮，传说牛郎织女就在鹊桥相会",
    ],
    mid_autumn: [
      "中秋的月饼吃腻了，还是你家的点心实在！",
      "中秋节月亮圆，记得赏月的时候配块蛋糕。",
      "中秋团圆饭，饭后要是能来块点心就更圆满了。",
      "今晚的月亮又圆又亮，跟玉盘似的",
      "月饼和柚子都备齐了，就等月亮升起来",
    ],
    harvest: [
      "丰收节农贸市场摆满了新果子，做点心正好用！",
      "丰收节镇上有庆祝会，一起去热闹热闹？",
      "丰收的季节，果园的果子甜得能滴出蜜来。",
      "麦穗扎的拱门立在市场门口，金灿灿一片",
      "新摘的果子又脆又甜，一口气能尝好几种",
    ],
    national: [
      "国庆广场有庆祝演出，人山人海的。",
      "长假大家都出来玩了，你的店可得备足货！",
      "国庆这几天，走亲戚的人一波接一波。",
      "舞台上的合唱一响，全场都跟着哼起来",
      "夜市摊位的彩灯一亮，过节的气氛就来了",
    ],
    winter_solstice: [
      "冬至要吃饺子，也别忘了来块热乎的蛋糕。",
      "冬至一过天就冷了，注意保暖呀。",
      "冬至大如年，家里的汤圆和饺子都得备上。",
      "商店街的大锅支起来了，羊肉汤冒着白汽",
      "冬至晚上一家人围桌吃饺子，暖烘烘的",
    ],
    christmas: [
      "平安夜街上亮起彩灯，你店里的礼物盒还够吗？",
      "平安夜给孩子们备点糖果，他们会乐坏的！",
      "圣诞的彩灯一亮，整条街都暖洋洋的。",
      "圣诞树下的颂歌一响，路人都放慢了脚步",
      "彩灯拱门下面人来人往，到处亮晶晶的",
    ],
  },
  CHARITY_CHAT_LINES = [
    "义卖这几天，镇上的爱心人士可真不少！",
    "义卖的份额卖得怎么样了？记得留点给我呀！",
    "听说义卖款要用来修镇上的图书馆，我可得多买几份！",
    "义卖摊前排了好长的队，大家都在献爱心呢。",
  ],
  BIRTHDAY_CHAT_LINES = [
    "对了，{friend}的生日快到了，我正琢磨送点什么好。",
    "{friend}过两天过生日，我准备做份点心送去，你觉得 TA 会喜欢什么口味？",
    "还记得{friend}的生日吗？我可记着呢，得提前备礼物。",
    "{friend}生日那天，我想请 TA 来店里坐坐，你也要来呀！",
    "今天是{friend}的生日！我准备了一早上礼物，TA 肯定想不到。",
  ],
  WEATHER_CHAT_LINES = {
    sunny: [
      "今天太阳这么好，不出来走走可惜了。",
      "晴天的点心最好卖，大家心情都好。",
      "阳光把河面晒得亮晶晶的，真好看。",
    ],
    cloudy: [
      "多云天风很舒服，适合在河边坐一下午。",
      "这种天气最适合烤点东西，满屋都是香味。",
      "云朵把太阳遮住一半，凉快多了。",
    ],
    rain: [
      "下雨天路上没什么人，正好在店里研究新配方。",
      "小雨天记得带伞，淋湿了容易感冒。",
      "雨点打在窗台上，像在给点心打拍子。",
    ],
    storm: [
      "雷雨天别出门，店里点心的香气可别被吓跑了。",
      "打雷了，我家的猫吓得钻床底去了。",
      "这种天气最适合窝在屋里，泡壶茶等雨停。",
    ],
    snow: [
      "下雪了！窗外的雪景配热茶最舒服。",
      "雪天路滑，出门小心点，店里的暖气可别关。",
      "雪花一片一片落下来，把小镇都染白了。",
    ],
  },
  TIMESLOT_CHAT_LINES = {
    dawn: ["这么早就起来了？晨光里的镇子最安静。", "早起的鸟儿有虫吃，早开的店有客来！"],
    morning: ["早上的空气真好，刚出炉的面包最香。", "上午的太阳晒在身上暖洋洋的。"],
    noon: ["中午啦，该吃饭了，你也别饿着肚子忙。", "正午的太阳有点晒，来店里歇歇脚？"],
    afternoon: ["下午茶时间到了，要不要来块点心？", "午后的风把蛋糕香味吹得到处都是。"],
    evening: ["傍晚的霞光真好看，一天又过去了。", "傍晚镇上的人最多，大家都出来遛弯了。"],
    night: ["晚上的星星真亮，适合想心事。", "夜里安静，最适合研究新配方。"],
    late: ["这么晚还不睡？熬夜可不好。", "深夜的镇子静悄悄的，只有路灯还亮着。"],
  },
  RELATION_CHAT_LINES = {
    friend: [
      "咱们认识这么久了，你有什么事可得跟我说。",
      "跟你聊天最轻松了。",
      "最近镇上发生了好多事，都想跟你说说。",
    ],
    close: [
      "跟你在一起的时候，时间总是过得特别快。",
      "你是我在小镇上最信得过的人之一。",
      "最近总觉得，有你在身边踏实多了。",
      "你做的点心，我总是第一个想尝。",
    ],
    lover: [
      "今天也想你了，见到你真好。",
      "和你在一起的每一天，都像蛋糕一样甜。",
      "别太累，你还有我呢。",
      "以后的日子，也想和你一起过。",
    ],
  },
  FESTIVAL_GREETING_LINES = {
    festival: [
      "{name}看见你，眼睛一亮：「今天{festival}，镇上可热闹了，一起逛逛？」",
      "节日的街道上，{name}朝你招手：「{festival}快乐！今天店里的点心卖得还好吗？」",
      "{name}提着刚买的东西迎面走来：「{festival}到了，我还说去你店里买点吃的当节礼呢。」",
      "广场上张灯结彩，{name}站在人群里冲你笑：「{festival}的晚上，果然还是小镇最热闹。」",
    ],
    friendBirthday: [
      "{name}边走边念叨：「{friend}的生日快到了，我正想着送点什么……」看见你，笑着问你意见。",
      "{name}举着一个小礼物盒：「给{friend}准备的生日礼物！你说 TA 会喜欢吗？」",
      "{name}掰着手指算：「再过几天就是{friend}的生日了，我得提前订份你家的蛋糕！」",
    ],
  },
  PLACE_ALIAS_MAP = {
    river: "river",
    park: "park",
    plaza: "plaza",
    street: "street",
    market: "market",
    home: "home",
    residential: "home",
    wenyuan: "home",
    ankang: "home",
    wutongli: "home",
    sujizhai: "home",
    eaststreet: "street",
    weststreet: "street",
    villa: "home",
    school: "school",
    library: "library",
    shelter: "shelter",
    hospital: "hospital",
    government: "government",
    bakery: "bakery",
    suji: "street",
    fruit: "street",
    veg: "street",
    fastfood: "street",
    furniture: "street",
    supermarket: "street",
    bank: "street",
    flower: "street",
    clothes: "street",
    salon: "street",
    bookstore: "street",
    fabric: "street",
    away: "street",
  };

function placeKeyOf(e) {
  return PLACE_ALIAS_MAP[e] ?? "plaza";
}
