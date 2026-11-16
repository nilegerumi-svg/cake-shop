var reactDomModuleLoaded;

function loadReactDomModule() {
  if (reactDomModuleLoaded) return reactDomModule.exports;
  reactDomModuleLoaded = 1;
  function e() {
    if (!(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    ))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
  }
  return (e(), (reactDomModule.exports = createReactDom()), reactDomModule.exports);
}

var reactDomBundleLoaded;

function loadReactDomBundle() {
  if (reactDomBundleLoaded) return reactDomExports;
  reactDomBundleLoaded = 1;
  var e = loadReactDomModule();
  return ((reactDomExports.createRoot = e.createRoot), (reactDomExports.hydrateRoot = e.hydrateRoot), reactDomExports);
}

var ReactDOM = loadReactDomBundle();

const SEASON_NAME_TABLE = { spring: "春季", summer: "夏季", autumn: "秋季", winter: "冬季" },
  SEASON_EMOJI = { spring: "🌸", summer: "☀️", autumn: "🍂", winter: "❄️" },
  GAME_START_DATE = { year: 2026, month: 2, day: 17 };

function dayToDate(e) {
  const n = new Date(Date.UTC(GAME_START_DATE.year, GAME_START_DATE.month - 1, GAME_START_DATE.day + Math.max(0, e - 1)));
  return { year: n.getUTCFullYear(), month: n.getUTCMonth() + 1, day: n.getUTCDate() };
}

const LUNAR_INFO = [
    19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192,
    53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396,
    11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951,
    51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416,
    86869, 19872, 42416, 83315, 21168, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352,
    21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400,
    46752, 103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189,
    18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888,
    30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390,
    21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200,
    30371, 38608, 19195, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864,
    42359, 42160, 43600, 111189, 27936, 44448, 84835, 37744, 18936, 18800, 25776, 92326, 59984,
    27424, 108228, 43744, 41696, 53987, 51552, 54615, 54432, 55888, 23893, 22176, 42704, 21972,
    21200, 43448, 43344, 46240, 46758, 44368, 21920, 43940, 42416, 21168, 45683, 26928, 29495,
    27296, 44368, 84821, 19296, 42352, 21732, 53600, 59752, 54560, 55968, 92838, 22224, 19168,
    43476, 41680, 53584, 62034, 54560,
  ],
  LUNAR_MONTH_NAMES = [
    "正月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "冬月",
    "腊月",
  ],
  LUNAR_DAY_NAMES = [
    "初一",
    "初二",
    "初三",
    "初四",
    "初五",
    "初六",
    "初七",
    "初八",
    "初九",
    "初十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
    "廿一",
    "廿二",
    "廿三",
    "廿四",
    "廿五",
    "廿六",
    "廿七",
    "廿八",
    "廿九",
    "三十",
  ];

function leapMonthDays(e) {
  let n = 348;
  for (let s = 32768; s > 8; s >>= 1) n += LUNAR_INFO[e - 1900] & s ? 1 : 0;
  return n + leapMonthDayCount(e);
}

function leapMonthOf(e) {
  return LUNAR_INFO[e - 1900] & 15;
}

function leapMonthDayCount(e) {
  return leapMonthOf(e) ? (LUNAR_INFO[e - 1900] & 65536 ? 30 : 29) : 0;
}

function lunarMonthDayCount(e, n) {
  return LUNAR_INFO[e - 1900] & (65536 >> n) ? 30 : 29;
}

function toLunarDate(e, n, s) {
  let a = Math.floor((Date.UTC(e, n - 1, s) - Date.UTC(1900, 0, 31)) / 864e5),
    o = 1900,
    l = 0;
  for (o = 1900; o < 2101 && a > 0; o++) ((l = leapMonthDays(o)), (a -= l));
  a < 0 && ((a += l), o--);
  const c = o,
    u = leapMonthOf(o);
  let f = !1;
  for (o = 1; o < 13 && a > 0; o++)
    (u > 0 && o === u + 1 && !f ? (--o, (f = !0), (l = leapMonthDayCount(c))) : (l = lunarMonthDayCount(c, o)),
      f && o === u + 1 && (f = !1),
      (a -= l));
  return (
    a === 0 && u > 0 && o === u + 1 && (f ? (f = !1) : ((f = !0), --o)),
    a < 0 && ((a += l), --o),
    { year: c, month: o, day: a + 1, leap: f }
  );
}

function getLunarDate(e) {
  const n = dayToDate(e);
  return toLunarDate(n.year, n.month, n.day);
}

function lunarMonthName(e) {
  return LUNAR_MONTH_NAMES[Math.max(0, Math.min(11, e - 1))] ?? `${e}月`;
}

function lunarDayName(e) {
  return LUNAR_DAY_NAMES[Math.max(0, Math.min(29, e - 1))] ?? `${e}日`;
}

function formatLunarDate(e) {
  const n = getLunarDate(e);
  return `${n.leap ? "闰" : ""}${lunarMonthName(n.month)}${lunarDayName(n.day)}`;
}

function formatSolarDate(e) {
  const n = dayToDate(e);
  return `${n.year}年${n.month}月${n.day}日`;
}

const SOLAR_TERMS = [
  { name: "小寒", month: 1, day: 5, emoji: "🥶" },
  { name: "大寒", month: 1, day: 20, emoji: "🧊" },
  { name: "立春", month: 2, day: 4, emoji: "🌱" },
  { name: "雨水", month: 2, day: 19, emoji: "🌧️" },
  { name: "惊蛰", month: 3, day: 5, emoji: "🐛" },
  { name: "春分", month: 3, day: 20, emoji: "🌸" },
  { name: "清明", month: 4, day: 5, emoji: "🍃" },
  { name: "谷雨", month: 4, day: 20, emoji: "🌾" },
  { name: "立夏", month: 5, day: 5, emoji: "☀️" },
  { name: "小满", month: 5, day: 21, emoji: "🌾" },
  { name: "芒种", month: 6, day: 5, emoji: "🌾" },
  { name: "夏至", month: 6, day: 21, emoji: "☀️" },
  { name: "小暑", month: 7, day: 7, emoji: "🥵" },
  { name: "大暑", month: 7, day: 23, emoji: "🔥" },
  { name: "立秋", month: 8, day: 7, emoji: "🍂" },
  { name: "处暑", month: 8, day: 23, emoji: "🌤️" },
  { name: "白露", month: 9, day: 7, emoji: "💧" },
  { name: "秋分", month: 9, day: 23, emoji: "🍁" },
  { name: "寒露", month: 10, day: 8, emoji: "🌬️" },
  { name: "霜降", month: 10, day: 23, emoji: "❄️" },
  { name: "立冬", month: 11, day: 7, emoji: "🥶" },
  { name: "小雪", month: 11, day: 22, emoji: "🌨️" },
  { name: "大雪", month: 12, day: 7, emoji: "❄️" },
  { name: "冬至", month: 12, day: 21, emoji: "🥟" },
];

function seasonIndexOf(e) {
  const n = dayToDate(e),
    s = n.month * 100 + n.day;
  return s >= 204 && s < 505 ? 0 : s >= 505 && s < 807 ? 1 : s >= 807 && s < 1107 ? 2 : 3;
}

function solarTermRangeOf(e) {
  const n = dayToDate(e),
    s = n.month * 100 + n.day;
  let a;
  return (
    s >= 204 && s < 505
      ? (a = { year: n.year, month: 2, day: 4 })
      : s >= 505 && s < 807
        ? (a = { year: n.year, month: 5, day: 5 })
        : s >= 807 && s < 1107
          ? (a = { year: n.year, month: 8, day: 7 })
          : (a =
              s >= 1107
                ? { year: n.year, month: 11, day: 7 }
                : { year: n.year - 1, month: 11, day: 7 }),
    Math.round(
      (Date.UTC(n.year, n.month - 1, n.day) - Date.UTC(a.year, a.month - 1, a.day)) / 864e5,
    ) + 1
  );
}

function currentSolarTerm(e) {
  const n = dayToDate(e),
    s = n.month * 100 + n.day;
  let a = null;
  for (const o of SOLAR_TERMS) s >= o.month * 100 + o.day && (a = { name: o.name, emoji: o.emoji });
  return a ?? { name: "冬至", emoji: "🥟" };
}

const WEATHER_TYPES = {
  sunny: { label: "晴天", emoji: "☀️", desc: "阳光明媚，适合出门走走", outdoor: !0 },
  cloudy: { label: "多云", emoji: "⛅", desc: "云朵遮住太阳，风很舒服", outdoor: !0 },
  rain: { label: "小雨", emoji: "🌧️", desc: "细雨绵绵，户外活动不太方便", outdoor: !1 },
  storm: { label: "雷雨", emoji: "⛈️", desc: "电闪雷鸣，不宜外出", outdoor: !1 },
  snow: { label: "下雪", emoji: "🌨️", desc: "雪花飘飘，路面湿滑小心", outdoor: !1 },
};

function weatherOfDay(e) {
  const n = Math.abs(Math.floor(Math.max(1, e) * 2654435761)) % 100,
    s = seasonIndexOf(e),
    a = {
      0: [
        ["sunny", 34],
        ["cloudy", 30],
        ["rain", 26],
        ["storm", 6],
        ["snow", 4],
      ],
      1: [
        ["sunny", 40],
        ["cloudy", 26],
        ["rain", 18],
        ["storm", 14],
        ["snow", 2],
      ],
      2: [
        ["sunny", 36],
        ["cloudy", 32],
        ["rain", 20],
        ["storm", 8],
        ["snow", 4],
      ],
      3: [
        ["sunny", 28],
        ["cloudy", 26],
        ["rain", 14],
        ["storm", 4],
        ["snow", 28],
      ],
    },
    o = a[s] ?? a[0];
  let l = 0;
  for (const [c, u] of o) if (((l += u), n < l)) return c;
  return "sunny";
}

const WEEKDAY_NAMES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  WEATHER_ICONS = ["🌅", "🌤️", "☁️", "🌦️", "🌥️", "🎉", "🎊"],
  DAY_START_HOUR = 8,
  DAY_END_HOUR = 22,
  DAILY_EXERCISE_LIMIT = 4;

function weekdayOf(e) {
  return (((e - 1) % 7) + 7) % 7;
}

function isWeekendDay(e) {
  const n = weekdayOf(e);
  return n === 5 || n === 6;
}

function schoolVacationOf(e) {
  const n = dayToDate(e);
  return (n.month === 1 && n.day >= 15) || n.month === 2
    ? "winter"
    : n.month === 7 || n.month === 8
      ? "summer"
      : null;
}

function currentVacation(e) {
  const n = schoolVacationOf(e);
  return n === "winter" ? "寒假" : n === "summer" ? "暑假" : "";
}

function formatHour(e) {
  const n = Math.max(0, Math.min(23, Math.floor(e))),
    s = Math.round((e - Math.floor(e)) * 60) % 60,
    a = s > 0 ? ` ${s} 分` : "";
  return n < 6
    ? `凌晨 ${n} 点${a}`
    : n < 12
      ? `早上 ${n} 点${a}`
      : n === 12
        ? `中午 12 点${a}`
        : n < 18
          ? `下午 ${n - 12} 点${a}`
          : `晚上 ${n - 12} 点${a}`;
}

function formatHourShort(e) {
  const n = Math.max(0, Math.min(23, Math.floor(e))),
    s = Math.round((e - Math.floor(e)) * 60) % 60;
  return `${String(n).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const TIME_SLOT_LABELS = {
  dawn: "早晨",
  morning: "上午",
  noon: "中午",
  afternoon: "下午",
  evening: "傍晚",
  night: "晚上",
  late: "深夜",
};

function slotOfHour(e) {
  return e < 7
    ? "dawn"
    : e < 11
      ? "morning"
      : e < 13
        ? "noon"
        : e < 17
          ? "afternoon"
          : e < 19
            ? "evening"
            : e < 22
              ? "night"
              : "late";
}

const MAX_ENERGY = 100,
  MAX_MOOD = 100,
  MAX_HEALTH = 100,
  MAX_SATIETY = 100,
  BASE_DAILY_VISITS = 4,
  LIBRARY_OPEN_HOUR = 10,
  LIBRARY_CLOSE_HOUR = 18,
  BAKE_SIZE_OPTIONS = {
    small: { label: "小份", emoji: "🍬", yield: 6 },
    medium: { label: "中份", emoji: "🍰", yield: 3 },
    large: { label: "大份", emoji: "🎂", yield: 1 },
  },
  CAKE_THEME_MAP = {
    sweet: { label: "甜味", emoji: "🍬" },
    creamy: { label: "奶香", emoji: "🥛" },
    fruity: { label: "果香", emoji: "🍓" },
    sour: { label: "酸甜", emoji: "🍋" },
    savory: { label: "咸香", emoji: "🥩" },
    nutty: { label: "坚果", emoji: "🌰" },
    bitter: { label: "微苦", emoji: "🍵" },
  },
  CAKE_THEME_IDS = Object.keys(CAKE_THEME_MAP).filter((e) => e !== "nutty"),
  RECIPE_CATEGORY_LABELS = {
    cake: "蛋糕",
    bread: "面包",
    dessert: "甜点",
    snack: "咖啡小食",
    drink: "果汁",
    icecream: "冰淇淋",
    coffee: "咖啡",
    cuisine: "料理",
  },
  RECIPE_SYSTEM_LABELS = { bakery: "烘焙甜品", cuisine: "家常料理" },
  RECIPE_SYSTEM_EMOJI = { bakery: "🍰", cuisine: "🍳" },
  CUISINE_LABELS = {
    home: "家常菜",
    lu: "鲁菜",
    chuan: "川菜",
    yue: "粤菜",
    su: "苏菜",
    min: "闽菜",
    zhe: "浙菜",
    xiang: "湘菜",
    hui: "徽菜",
    french: "法餐",
    italian: "意餐",
    japanese: "日料",
    korean: "韩餐",
    thai: "泰餐",
    american: "美式",
    british: "英餐",
    german: "德餐",
    spanish: "西班牙菜",
    indian: "印度菜",
    vietnamese: "越南菜",
  },
  CUISINE_GROUP_LABELS = { chinese: "中餐", foreign: "外国菜" },
  CUISINE_GROUP_EMOJI = { chinese: "🥢", foreign: "🌏" },
  CHINESE_CUISINE_IDS = new Set(["home", "lu", "chuan", "yue", "su", "min", "zhe", "xiang", "hui"]);

function cuisineGroupOf(e) {
  return e && CHINESE_CUISINE_IDS.has(e) ? "chinese" : "foreign";
}

const INGREDIENT_CATEGORY_LABELS = {
    grain: "五谷",
    dairy: "蛋奶",
    fruit: "水果",
    sweet: "糖巧",
    meat: "肉禽",
    veg: "蔬果",
    fish: "水产",
    bait: "鱼饵",
    seasoning: "调味",
    processed: "加工",
    sauce: "酱料",
    flower: "花材",
    other: "其他",
    wood: "木质",
    hardware: "五金",
    paint: "涂料",
    fabric: "织物",
    glass: "玻璃",
    glue: "粘合",
  },
  FURNITURE_CATEGORY_LABELS = {
    table: "桌椅",
    storage: "收纳",
    light: "灯具",
    decor: "装饰",
    bedding: "床具",
    toy: "玩具",
    aquarium: "水族",
    tablecloth: "桌布",
    ornament: "摆件",
    hanging: "挂饰",
    aqua_decor: "缸内装饰",
    appliance: "家电",
  };

function healthTier(e) {
  return e >= 70
    ? { label: "活力充沛", emoji: "💪", color: "#66bb6a" }
    : e >= 40
      ? { label: "状态尚可", emoji: "😌", color: "#aed581" }
      : e > 0
        ? { label: "有点疲惫", emoji: "😮‍💨", color: "#ffb74d" }
        : { label: "身体告急", emoji: "🤒", color: "#ef5350" };
}

function moodTier(e) {
  return e >= 70
    ? { label: "元气满满", emoji: "😄", color: "#ff8fab" }
    : e >= 40
      ? { label: "心情平静", emoji: "🙂", color: "#ffb3c1" }
      : e > 0
        ? { label: "有点低落", emoji: "🥱", color: "#c9a3c4" }
        : { label: "心情糟糕", emoji: "😞", color: "#9d8c9c" };
}

function satietyTier(e) {
  return e >= 70
    ? { label: "酒足饭饱", emoji: "🍚", color: "#fb923c" }
    : e >= 40
      ? { label: "有点饿了", emoji: "🍙", color: "#fdba74" }
      : e > 0
        ? { label: "饥肠辘辘", emoji: "😩", color: "#f97316" }
        : { label: "饿晕了", emoji: "💫", color: "#ea580c" };
}

function affectionTierOf(e) {
  return e >= 100 ? "lover" : e >= 50 ? "close" : e >= 20 ? "friend" : "stranger";
}
