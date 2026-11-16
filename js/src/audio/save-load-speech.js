async function updateSaveRow(e, n = MAIN_SLOT_ID) {
  const s = buildSaveMetaRow(e),
    a = await runSqlExec({
      sql: "update player_saves set player_name = ?, shop_name = ?, coins = ?, day = ?, season = ?, energy = ?, ingredients = ?, products = ?, recipes = ?, affection = ?, shelves = ?, visits = ?, explores = ?, chatted_today = ?, dated_today = ?, stats = ?, achievements = ?, claimed_milestones = ?, home = ?, orders = ?, mood = ?, daily_taste = ?, health = ?, hour = ?, sport_skill = ?, exercised_today = ?, negotiation = ?, outfits = ?, employees = ?, shop_placements = ?, cook_skill = ?, met_npcs = ?, fishing_rod = ?, caught_today = ?, fished_today = ?, updated_at = ? where id = ?",
      binds: [
        s.player_name,
        s.shop_name,
        s.coins,
        s.day,
        s.season,
        s.energy,
        s.ingredients,
        s.products,
        s.recipes,
        s.affection,
        s.shelves,
        s.visits,
        s.explores,
        s.chatted_today,
        s.dated_today,
        s.stats,
        s.achievements,
        s.claimed_milestones,
        s.home,
        s.orders,
        s.mood,
        s.daily_taste,
        s.health,
        s.hour,
        s.sport_skill,
        s.exercised_today,
        s.negotiation,
        s.outfits,
        s.employees,
        s.shop_placements,
        s.cook_skill,
        s.met_npcs,
        s.fishing_rod,
        s.caught_today,
        s.fished_today,
        s.updated_at,
        n,
      ],
    });
  if (!a.success) throw new Error(a.message || "update failed");
  return a.data.rowsAffected > 0;
}

async function insertSaveRow(e, n = MAIN_SLOT_ID) {
  const s = buildSaveMetaRow(e);
  return (
    await runSqlExec({
      sql: "insert into player_saves (id, player_name, shop_name, coins, day, season, energy, ingredients, products, recipes, affection, shelves, visits, explores, chatted_today, dated_today, stats, achievements, claimed_milestones, home, orders, mood, daily_taste, health, hour, sport_skill, exercised_today, negotiation, outfits, employees, shop_placements, cook_skill, met_npcs, fishing_rod, caught_today, fished_today, created_at, updated_at) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      binds: [
        n,
        s.player_name,
        s.shop_name,
        s.coins,
        s.day,
        s.season,
        s.energy,
        s.ingredients,
        s.products,
        s.recipes,
        s.affection,
        s.shelves,
        s.visits,
        s.explores,
        s.chatted_today,
        s.dated_today,
        s.stats,
        s.achievements,
        s.claimed_milestones,
        s.home,
        s.orders,
        s.mood,
        s.daily_taste,
        s.health,
        s.hour,
        s.sport_skill,
        s.exercised_today,
        s.negotiation,
        s.outfits,
        s.employees,
        s.shop_placements,
        s.cook_skill,
        s.met_npcs,
        s.fishing_rod,
        s.caught_today,
        s.fished_today,
        s.created_at,
        s.updated_at,
      ],
    })
  ).success;
}

async function deleteSaveRow(e = MAIN_SLOT_ID) {
  try {
    return (await runSqlExec({ sql: "delete from player_saves where id = ?", binds: [e] })).success;
  } catch {
    return !1;
  }
}

async function upsertSave(e, n) {
  const s = slotKeyOf(n);
  try {
    return (await updateSaveRow(e, s)) ? !0 : await insertSaveRow(e, s);
  } catch {
    return !1;
  }
}

async function saveCurrentSlot(e) {
  return upsertSave(e, getCurrentSlot());
}

async function deleteSaveSlot(e) {
  return deleteSaveRow(slotKeyOf(e));
}

async function deleteCurrentSave() {
  return deleteSaveSlot(getCurrentSlot());
}

async function listSaveSlots() {
  const e = Array.from({ length: SLOT_COUNT }, (a, o) => slotKeyOf(o + 1)),
    n = await runSql({
      sql: `select id, player_name, day, updated_at from player_saves where id in (${e.map(() => "?").join(",")})`,
      binds: e,
    }),
    s = new Array(SLOT_COUNT).fill(null);
  if (!n.success) return s;
  for (const a of n.data) {
    const o = slotIndexFromKey(a.id);
    o >= 1 &&
      o <= SLOT_COUNT &&
      (s[o - 1] = {
        slot: o,
        playerName: typeof a.player_name == "string" ? a.player_name : "",
        day: typeof a.day == "number" ? a.day : 0,
        updatedAt: typeof a.updated_at == "number" ? a.updated_at : 0,
      });
  }
  return s;
}

async function loadSaveSlot(e) {
  try {
    const n = await runSql({ sql: "select * from player_saves where id = ? limit 1", binds: [slotKeyOf(e)] });
    return n.success ? (n.data[0] ?? null) : null;
  } catch {
    return null;
  }
}

async function updateSaveMeta(e, n) {
  const s = slotKeyOf(e),
    a = Date.now(),
    o = [
      "player_name",
      "shop_name",
      "coins",
      "day",
      "season",
      "energy",
      "ingredients",
      "products",
      "recipes",
      "affection",
      "shelves",
      "visits",
      "explores",
      "chatted_today",
      "dated_today",
      "stats",
      "achievements",
      "claimed_milestones",
      "home",
      "orders",
      "mood",
      "daily_taste",
      "health",
      "hour",
      "sport_skill",
      "exercised_today",
      "negotiation",
      "outfits",
      "employees",
      "shop_placements",
      "cook_skill",
      "met_npcs",
      "fishing_rod",
      "caught_today",
      "fished_today",
    ],
    l = o.map((c) => n[c] ?? null);
  (() => {
    const hi = o.indexOf("home"),
      hv = l[hi];
    if (typeof n.psych == "object" && n.psych) {
      if (typeof hv == "string") {
        try {
          const ho = JSON.parse(hv);
          ho.psych = n.psych;
          l[hi] = JSON.stringify(ho);
        } catch {}
      } else if (hv && typeof hv == "object") {
        try {
          const ho = { ...hv };
          ho.psych = n.psych;
          l[hi] = JSON.stringify(ho);
        } catch {}
      }
    }
  })();
  try {
    const c = await runSqlExec({
      sql: `update player_saves set ${o.map((f) => `${f} = ?`).join(", ")}, updated_at = ? where id = ?`,
      binds: [...l, a, s],
    });
    return c.success && c.data.rowsAffected > 0
      ? !0
      : (
          await runSqlExec({
            sql: `insert into player_saves (id, ${o.join(", ")}, created_at, updated_at) values (?, ${o.map(() => "?").join(", ")}, ?, ?)`,
            binds: [s, ...l, typeof n.created_at == "number" ? n.created_at : a, a],
          })
        ).success;
  } catch {
    return !1;
  }
}

function utf8ToBase64(e) {
  const n = new TextEncoder().encode(e);
  let s = "";
  for (const a of n) s += String.fromCharCode(a);
  return btoa(s);
}

function base64ToUtf8(e) {
  try {
    const n = atob(e),
      s = new Uint8Array(n.length);
    for (let a = 0; a < n.length; a += 1) s[a] = n.charCodeAt(a);
    return new TextDecoder("utf-8").decode(s);
  } catch {
    return "";
  }
}

function padTwo(e) {
  return e < 10 ? `0${e}` : String(e);
}

function formatLocalDateTime(e) {
  const n = new Date(e);
  return `${n.getFullYear()}-${padTwo(n.getMonth() + 1)}-${padTwo(n.getDate())} ${padTwo(n.getHours())}:${padTwo(n.getMinutes())}`;
}

function buildSaveFileText(e, n, s = Date.now()) {
  const a = utf8ToBase64(JSON.stringify(n));
  return [
    "// ============================================================",
    "// 甜蜜物语蛋糕店模拟器 · 存档导出文件",
    `// 档位：${e}　玩家：${n.player_name ?? ""}　导出时间：${formatLocalDateTime(s)}`,
    "// 使用方法：打开游戏「成就殿堂」→「🗂️ 存档管理」，",
    "// 选择目标档位点击「导入到这格」，选择本文件或粘贴全部内容即可。",
    "// 注意：导入会覆盖目标档位的现有存档，请谨慎操作。",
    "// ============================================================",
    `const TIANMI_SAVE_DATA = "${a}";`,
    "",
  ].join(`
`);
}

function parseSaveFileText(e) {
  if (typeof e != "string") return null;
  const n = /TIANMI_SAVE_DATA\s*=\s*"([A-Za-z0-9+/=]+)"/.exec(e);
  if (!n) return null;
  const s = base64ToUtf8(n[1]);
  if (!s) return null;
  try {
    const a = JSON.parse(s);
    return !a ||
      typeof a != "object" ||
      typeof a.player_name != "string" ||
      typeof a.shop_name != "string"
      ? null
      : a;
  } catch {
    return null;
  }
}

const EMOJI_PATTERN = new RegExp(
  "\\p{Extended_Pictographic}(\\uFE0F)?(?:\\u200D\\p{Extended_Pictographic}(\\uFE0F)?)*",
  "gu",
);

function segmentByEmoji(e, n = "e") {
  if (!e) return [e ?? ""];
  const s = [];
  let a = 0,
    o = 0;
  for (const l of e.matchAll(EMOJI_PATTERN)) {
    const c = l.index ?? 0;
    (c > a && s.push(e.slice(a, c)),
      s.push(jsxRuntime.jsx("span", { className: "emoji", children: l[0] }, `${n}-${o++}`)),
      (a = c + l[0].length));
  }
  return (a < e.length && s.push(e.slice(a)), s.length > 0 ? s : [e]);
}

const CJK_PATTERN = /[\u3400-\u4dbf\u4e00-\u9fff]+/g,
  FORM_TAGS = new Set(["button", "input", "textarea", "select", "option"]);

function segmentByCjk(e, n = "h") {
  if (!e) return [e];
  const s = [];
  let a = 0,
    o = 0;
  for (const l of e.matchAll(CJK_PATTERN)) {
    const c = l.index ?? 0;
    (c > a && s.push(e.slice(a, c)),
      s.push(jsxRuntime.jsx("span", { className: "han-u", children: l[0] }, `${n}-${o++}`)),
      (a = c + l[0].length));
  }
  return (a < e.length && s.push(e.slice(a)), s.length > 0 ? s : [e]);
}

const PRICE_PATTERN = /[+-]?(?:¥|￥)?\d[\d,]*(?:\.\d+)?/g;

function segmentByPrice(e, n = "p") {
  if (!e) return [e];
  const s = [];
  let a = 0,
    o = 0;
  for (const l of e.matchAll(PRICE_PATTERN)) {
    const c = l.index ?? 0;
    (c > a && s.push(e.slice(a, c)),
      s.push(jsxRuntime.jsx("span", { className: "nowrap", children: l[0] }, `${n}-${o++}`)),
      (a = c + l[0].length));
  }
  return (a < e.length && s.push(e.slice(a)), s.length > 0 ? s : [e]);
}

const CJK_CHAR_PATTERN = /[\u3400-\u4dbf\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;

function splitTextRun(e) {
  const n = [];
  let s = 0;
  for (; s < e.length;) {
    const a = e.slice(s);
    EMOJI_PATTERN.lastIndex = 0;
    const o = EMOJI_PATTERN.exec(a);
    if (o && o.index === 0) {
      (n.push({ text: o[0], width: 1.2 }), (s += o[0].length));
      continue;
    }
    PRICE_PATTERN.lastIndex = 0;
    const l = PRICE_PATTERN.exec(a);
    if (l && l.index === 0) {
      (n.push({ text: l[0], width: Math.max(1.6, l[0].length * 0.55) }), (s += l[0].length));
      continue;
    }
    const c = e[s];
    (n.push({ text: c, width: CJK_CHAR_PATTERN.test(c) ? 1 : 0.55 }), (s += 1));
  }
  return n;
}

function wrapWordsForSpeech(e, n) {
  if (!e) return e;
  const s = [];
  for (const a of e.split(`
`)) {
    const o = splitTextRun(a),
      l = [];
    let c = "",
      u = 0;
    for (const f of o)
      (u + f.width > n && c.length > 0 && (l.push(c), (c = ""), (u = 0)),
        (c += f.text),
        (u += f.width));
    (l.push(c),
      s.push(
        l.join(`
`),
      ));
  }
  return s.join(`
`);
}

function toSpeechSegments(e, n = "p") {
  if (typeof e == "string") return segmentByPrice(e, n);
  if (typeof e == "number" || typeof e == "boolean" || e == null) return e;
  if (Array.isArray(e)) return e.map((s, a) => toSpeechSegments(s, `${n}-${a}`));
  if (React.isValidElement(e)) {
    const s = e,
      a = s.type,
      o = typeof s.props.className == "string" ? s.props.className : "";
    if (
      (typeof a == "string" && FORM_TAGS.has(a)) ||
      o.includes("emoji") ||
      o.includes("material-icons") ||
      o.includes("nowrap")
    )
      return e;
    const l = s.props.children;
    if (typeof l == "function") return e;
    const c = toSpeechSegments(l, n);
    return c === l ? e : React.cloneElement(s, void 0, c);
  }
  return e;
}

function renderWithSpeech(e, n = "r") {
  if (typeof e == "string") return segmentByCjk(e, n);
  if (typeof e == "number" || typeof e == "boolean" || e == null) return e;
  if (Array.isArray(e)) return e.map((s, a) => renderWithSpeech(s, `${n}-${a}`));
  if (React.isValidElement(e)) {
    const s = e,
      a = s.type,
      o = typeof s.props.className == "string" ? s.props.className : "";
    if ((typeof a == "string" && FORM_TAGS.has(a)) || o.includes("emoji") || o.includes("material-icons"))
      return e;
    const l = s.props.children;
    if (typeof l == "function") return e;
    const c = renderWithSpeech(l, n);
    return c === l ? e : React.cloneElement(s, void 0, c);
  }
  return e;
}

function LaceWave({ tone: e = "dark" }) {
  const n = e === "light" ? "lace-wave lace-wave--light" : "lace-wave";
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [
      jsxRuntime.jsx("span", { "aria-hidden": "true", className: `${n} lace-wave-t` }),
      jsxRuntime.jsx("span", { "aria-hidden": "true", className: `${n} lace-wave-b` }),
      jsxRuntime.jsx("span", { "aria-hidden": "true", className: `${n} lace-wave-l` }),
      jsxRuntime.jsx("span", { "aria-hidden": "true", className: `${n} lace-wave-r` }),
    ],
  });
}

function indentClassNames(e) {
  return (
    e &&
    e
      .split(
        `
`,
      )
      .map((n) => (n.trim() ? `　　${n}` : n)).join(`
`)
  );
}

const EVENT_TITLE_PATTERN = /^(📬|✨ 遇见小事件|🎊 店里的小插曲)/;

function splitEventTitle(e) {
  if (!e) return [];
  const n = e.split(`
`);
  let s = 0,
    a = n.length;
  for (; s < a && !n[s].trim();) s += 1;
  for (; a > s && !n[a - 1].trim();) a -= 1;
  const o = [];
  let l = [];
  const c = () => {
    l.length > 0 &&
      (o.push(
        l.join(`
`),
      ),
      (l = []));
  };
  for (let u = s; u < a; u += 1) {
    const f = n[u],
      g = f.trim();
    if (g === "") {
      c();
      continue;
    }
    (l.length > 0 && EVENT_TITLE_PATTERN.test(g) && c(), l.push(f));
  }
  return (c(), o);
}

function ToastNotice({ toast: e, onDone: n }) {
  if (
    (React.useEffect(() => {
      if (!e) return;
      /* info = 每日结算事件窗。过去它永不自动收起，连玩一个月要手动点 30 次，
         文案还逐字重复；现在给一个较长的停留（文案多、要读），到点自动关闭，
         其它短提示仍 2.2 秒。手动「关闭」按钮始终保留。 */
      const o = window.setTimeout(() => n(), e.kind === "info" ? 6000 : 2200);
      return () => window.clearTimeout(o);
    }, [e, n]),
    !e)
  )
    return null;
  const s = e.kind === "info",
    a =
      e.kind === "error" ? "bg-[#e5484d]" : e.kind === "success" ? "bg-[#43a047]" : "bg-[#7e57c2]";
  if (s) {
    const o = splitEventTitle(e.text);
    return toSpeechSegments(
      jsxRuntime.jsx(
        "div",
        {
          className:
            "toast-wrap toast-wrap-event pointer-events-none fixed inset-0 z-[100] flex overflow-y-auto",
          children: jsxRuntime.jsxs("div", {
            className: `modal-lace toast-box toast-box-event pointer-events-auto relative m-auto flex flex-col rounded-3xl text-[18px] font-bold leading-[2] text-white shadow-xl ${a}`,
            style: {
              width: "min(86vw, 320px)",
              aspectRatio: "auto",
              maxHeight: "min(78vh, 620px)",
            },
            children: [
              jsxRuntime.jsx(LaceWave, { tone: "light" }),
              jsxRuntime.jsx("div", {
                className:
                  "min-h-0 flex-1 overflow-y-auto whitespace-pre-wrap break-words px-[22px] pb-4 pt-[22px]",
                children: o.map((l, c) =>
                  jsxRuntime.jsx(
                    "div",
                    { className: c > 0 ? "mt-[2em]" : void 0, children: segmentByEmoji(wrapWordsForSpeech(indentClassNames(l), 9)) },
                    c,
                  ),
                ),
              }),
              jsxRuntime.jsx("div", {
                className: "mt-2 flex shrink-0 items-center justify-center px-4 pb-4",
                children: jsxRuntime.jsxs("button", {
                  type: "button",
                  "data-testid": "toast-close",
                  "aria-label": "关闭事件提示",
                  onClick: n,
                  className:
                    "flex h-10 items-center justify-center gap-1.5 rounded-full bg-white/25 px-5 text-[13px] text-white",
                  children: [
                    jsxRuntime.jsx("span", {
                      className: "material-icons",
                      "aria-hidden": "true",
                      style: { fontSize: 20 },
                      children: "close",
                    }),
                    "关闭",
                  ],
                }),
              }),
            ],
          }),
        },
        e.id,
      ),
    );
  }
  return toSpeechSegments(
    jsxRuntime.jsx("div", {
      className:
        "toast-wrap pointer-events-none fixed inset-0 z-[100] flex items-center justify-center px-6",
      children: jsxRuntime.jsx("div", {
        className: `toast-box whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm font-bold text-white shadow-lg ${a}`,
        children: segmentByEmoji(e.text),
      }),
    }),
  );
}

var ReactDOMInstance = loadReactDomModule();

const BLIND_MODE_KEY = "sweet-blind-mode",
  BLIND_ASKED_KEY = "sweet-blind-asked";

function isBlindModeEnabled() {
  try {
    return storageGetItem(BLIND_MODE_KEY) === "1";
  } catch {
    return !1;
  }
}

function setBlindModeEnabled(e) {
  try {
    storageSetItem(BLIND_MODE_KEY, e ? "1" : "0");
  } catch {}
}

function hasBlindModePref() {
  try {
    return storageGetItem(BLIND_MODE_KEY) !== null;
  } catch {
    return !1;
  }
}

function hasAskedBlindMode() {
  try {
    return window.sessionStorage.getItem(BLIND_ASKED_KEY) === "1";
  } catch {
    return !1;
  }
}

function markBlindModeAsked() {
  try {
    window.sessionStorage.setItem(BLIND_ASKED_KEY, "1");
  } catch {}
}

const VOICE_SETTINGS_KEY = "sweet-voice-settings",
  DEFAULT_VOICE_SETTINGS = {
    voiceType: "common",
    speed: "normal",
    autoSpeakDay: !0,
    blindVoice: "app",
    voiceCommand: !0,
    muted: !1,
  };

function readVoiceSettings() {
  try {
    const e = storageGetItem(VOICE_SETTINGS_KEY);
    if (e) {
      const n = JSON.parse(e);
      return {
        voiceType:
          n.voiceType === "fairy_tale" || n.voiceType === "short_play" ? n.voiceType : "common",
        speed: n.speed === "slow" || n.speed === "fast" ? n.speed : "normal",
        autoSpeakDay: typeof n.autoSpeakDay == "boolean" ? n.autoSpeakDay : !0,
        blindVoice: n.blindVoice === "system" ? "system" : "app",
        voiceCommand: typeof n.voiceCommand == "boolean" ? n.voiceCommand : !0,
        muted: typeof n.muted == "boolean" ? n.muted : !1,
      };
    }
  } catch {}
  return { ...DEFAULT_VOICE_SETTINGS };
}

function saveVoiceSettings(e) {
  try {
    storageSetItem(VOICE_SETTINGS_KEY, JSON.stringify(e));
  } catch {}
}

const VOICE_TYPE_LABELS = { common: "普通音色", fairy_tale: "童话音色", short_play: "短剧音色" },
  VOICE_TYPE_EMOJI = { common: "🗣️", fairy_tale: "🧚", short_play: "🎭" },
  SPEECH_SPEED_LABELS = { slow: "慢速", normal: "标准", fast: "快速" },
  SPEECH_SPEED_EMOJI = { slow: "🐢", normal: "🚶", fast: "🏃" },
  SPEECH_RATE_MS = { slow: 900, normal: 350, fast: 100 };

function stripMarkdown(e) {
  const n = (e ?? "")
    .replace(/[*#_~`[\](){}|>]/g, "")
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  return n
    ? (n.match(/[^。！？!?；;\n]+[。！？!?；;\n]*/g) ?? []).map((a) => a.trim()).filter(Boolean)
    : [];
}

async function speakText(e, n) {
  var u, f, g, x, m;
  const s = readVoiceSettings();
  if (s.muted) {
    (u = n == null ? void 0 : n.onDone) == null || u.call(n);
    return;
  }
  const a = (n == null ? void 0 : n.voiceType) ?? s.voiceType,
    o = (n == null ? void 0 : n.speed) ?? s.speed,
    l = SPEECH_RATE_MS[o],
    c = stripMarkdown(e);
  if (c.length === 0) {
    (f = n == null ? void 0 : n.onDone) == null || f.call(n);
    return;
  }
  try {
    for (
      let p = 0;
      p < c.length && !((g = n == null ? void 0 : n.shouldStop) != null && g.call(n));
      p++
    ) {
      try {
        await playTTS(c[p], { lang: "zh", voiceType: a });
      } catch {
        break;
      }
      p < c.length - 1 &&
        l > 0 &&
        !((x = n == null ? void 0 : n.shouldStop) != null && x.call(n)) &&
        (await new Promise((y) => window.setTimeout(y, l)));
    }
  } finally {
    (m = n == null ? void 0 : n.onDone) == null || m.call(n);
  }
}

const LIVE_REGION_ID = "a11y-live-global";

let speechSeq = 0,
  lastSpeakAt = 0;

function markSpeakTime() {
  lastSpeakAt = Date.now();
}

function isSpeakingRecently(e = 2e3) {
  return Date.now() - lastSpeakAt < e;
}

function stopSpeech() {
  speechSeq += 1;
  try {
    stopTTS();
  } catch {}
}

function ensureLiveRegion(e) {
  try {
    let n = document.getElementById(LIVE_REGION_ID);
    (n ||
      ((n = document.createElement("div")),
      (n.id = LIVE_REGION_ID),
      n.setAttribute("role", "status"),
      n.setAttribute("aria-live", "polite"),
      n.setAttribute("aria-atomic", "true"),
      (n.style.cssText =
        "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;"),
      document.body.appendChild(n)),
      (n.textContent = ""),
      window.setTimeout(() => {
        const s = document.getElementById(LIVE_REGION_ID);
        s && (s.textContent = e);
      }, 30));
  } catch {}
  try {
    announceA11y(e);
  } catch {}
}

function announce(e) {
  if (readVoiceSettings().muted) return;
  const n = ++speechSeq;
  try {
    stopTTS();
  } catch {}
  if (readVoiceSettings().blindVoice === "system") {
    ensureLiveRegion(e);
    return;
  }
  speakText(e, { speed: "slow", shouldStop: () => n !== speechSeq });
}

function vibrateShort() {
  try {
    vibrateDevice({ mode: "short", intensity: "light" });
  } catch {}
}

let fullscreenActive = !1,
  fullscreenDismissed = !1,
  fullscreenListeners = [];

function notifyFullscreenListeners(e) {
  const n = fullscreenListeners.splice(0);
  for (const s of n) s(e);
}

window.addEventListener("message", (e) => {
  const n = e.data;
  !n ||
    n.type !== "flash-app-bridge" ||
    n.kind !== "fullscreen:changed" ||
    ((fullscreenActive = !!n.active), (fullscreenDismissed = !1), notifyFullscreenListeners(fullscreenActive));
});

const onFullscreenChange = () => {
  document.fullscreenElement || ((fullscreenDismissed = !1), notifyFullscreenListeners(!1));
};

document.addEventListener("fullscreenchange", onFullscreenChange);

document.addEventListener("webkitfullscreenchange", onFullscreenChange);

function requestFullscreenAsync(e) {
  return new Promise((n) => {
    let s = !1,
      a = 0;
    function o(l) {
      s || ((s = !0), window.clearTimeout(a), n(l ? "full" : "failed"));
    }
    ((a = window.setTimeout(() => {
      if (s) return;
      s = !0;
      const l = fullscreenListeners.indexOf(o);
      (l >= 0 && fullscreenListeners.splice(l, 1), (fullscreenDismissed = !1), n("unknown"));
    }, e)),
      fullscreenListeners.push(o));
  });
}

async function getFullscreenState() {
  try {
    if (document.fullscreenElement) return "full";
    if (isInFrame()) return fullscreenActive ? "full" : (fullscreenDismissed || ((fullscreenDismissed = !0), requestFullscreen()), requestFullscreenAsync(800));
    const e = document.documentElement;
    if (typeof e.requestFullscreen == "function") return (await e.requestFullscreen(), "full");
    if (typeof e.webkitRequestFullscreen == "function")
      return (e.webkitRequestFullscreen(), "full");
  } catch {
    return "failed";
  }
  return "failed";
}

function isFullscreenAvailable() {
  var e;
  try {
    if (document.fullscreenElement || fullscreenActive) return !0;
    const n = ((e = window.screen) == null ? void 0 : e.height) ?? 0;
    if (n > 0 && window.innerHeight < n - 120) return !1;
  } catch {}
  return !0;
}

const BLIND_ASK_TEXT =
    "您好，欢迎来到甜蜜物语蛋糕店！请问您是否需要开启盲人游戏模式？盲人模式不会自动开启，如果您需要，请点击「立即开启」按钮，开启后全程语音引导您操作。如果您不需要，请点击「不需要」按钮，之后不会再询问。您也可以随时在语音设置中开启或关闭。",
  BLIND_ENABLED_TEXT =
    "已为您开启盲人游戏模式！接下来，游戏中的页面切换和操作结果，都会自动为您语音播报。屏幕底部有五个页面，点击即可切换（使用系统读屏时可双击激活），切换后会自动朗读页面名称。屏幕右下角有一个语音指令按钮：点击后可以直接说出指令来操作游戏，例如「打开小楼厨房」「去小镇」「休息一天」「和苏晚晴聊天」「现在几点」。点击顶部语音按钮，可以调整音色、语速，也可以随时关闭盲人模式。祝您游戏愉快！",
  FULLSCREEN_HINT_TEXT =
    "另外，如果屏幕上方或角落有展开全屏的按钮，请点击它展开全屏，体验更佳。如果找不到，请忽略，游戏在窗口内也可以正常使用语音操作。",
  BLIND_GUIDE_TEXT =
    "盲人游戏模式使用指南：一，屏幕底部有五个页面：小楼、订购、通讯、档案、成就，点击即可切换（使用系统读屏时可双击激活），切换后会自动朗读页面名称。小楼一楼店面有「出门去小镇」按钮，也可以直接说「去小镇」前往小镇。二，屏幕顶部的语音按钮，可以调整朗读音色和语速，可以试听普通朗读效果，也可以试听盲人朗读的慢速语速，以及在这里关闭盲人模式。三，休息一天按钮可以推进游戏时间，每次进入新的一天，会自动播报天气、节日、生日和重要事项。四，屏幕右下角的语音指令按钮：点击后开始收音，说出指令即可操作游戏，例如「打开小楼厨房」「去小镇」「打开通讯录」「查看档案」可以切换页面；「休息一天」「保存存档」「读取存档」「切换夜间模式」可以执行操作；「和苏晚晴聊天」「送点心给陈叙白」可以互动；「现在几点」「我有多少钱」「我的心情」「今天有什么节日」「当前页面」「我的状态」可以查询信息。识别和结果都会语音播报，长按按钮可以重听指令示例。五，游戏中的对话、送礼、约会、成就解锁等，都会自动朗读。六，如果遇到不确定的按钮，点击后系统会播报操作结果，请放心操作。七，小楼共有四层：一楼店面、厨房与家具工坊，二楼卧室与阳台，三楼书房与收藏，还有天台。点顶部楼层按钮可以切换，切换后会播报楼层名；每层内部又分子界面——一楼分「店面」「厨房」「家具工坊」，二楼分「卧室」「阳台」，三楼分「书房」「收藏」，点子界面按钮即可切换，也会播报。八，各楼层的功能卡片都可以点标题展开或收起：收起时只留标题和一行摘要，再点标题即可展开，操作后会播报「已展开」或「已收起」；列表比较长的小卡片（食材、厨具、工具、种子、收藏、星图、家具等）也同样点标题展开收起。九，二楼阳台可以种菜种花：每个花盆都会播报状态——空着、种了什么、还有几天成熟、今天有没有浇水；点「浇水」「施肥」「收获」按钮即可照料，操作结果会播报。十，天台可以看天气和观星：晚上七点后、天气晴朗时，点「观星」按钮就能点亮今晚的星并播报星名和星图进度；雨天、阴天或白天看不到星星，按钮会播报原因。十一，一楼店面有「出门去小镇」按钮，点它离开店铺去小镇；在小镇点「回店铺」按钮回到小楼一楼店面，位置变化都会播报。十二，小镇地图上的居民区已拆成四个小区：文苑小区、安康苑、梧桐里和苏记老宅；商店街也拆成东商店街和西商店街。地图上的每个地点都能直接进入，地点详情里可以逛街、办事或和在场伙伴互动。平日和周末的空闲时段（早晨出门前、午后、傍晚、晚上），伙伴们会按各自的爱好随机行动——居家、闲逛、运动、文艺、社交、采购等，每个地点同一小时最多 5 人，满了会自动换别的活动。十三，节日期间，伙伴们按十二种通用节日模式行动（集市摆摊、看表演、游园赏景等），每个地点同一小时最多 5 人；摆摊收摊只有成年摊主才会参与，未成年和老师、医生、司机等非摊主职业的伙伴过节会改去看表演、游园赏景、探亲访友等活动。";

function Modal({
  open: e,
  title: n,
  onClose: s,
  children: a,
  noUnderline: o,
  sheetClass: l,
  wide: c,
}) {
  const u = React.useRef(null),
    f = React.useRef(!1),
    g = React.useRef(n);
  g.current = n;
  const x = React.useRef(null);
  if (
    (React.useEffect(() => {
      if (!e) return;
      const j = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (((x.current = j), j instanceof HTMLIFrameElement && j.contentWindow))
        try {
          j.contentWindow.postMessage({ type: "frame:save-focus" }, "*");
        } catch {}
      const v = window.setTimeout(() => {
        var w;
        (w = u.current) == null || w.focus();
      }, 80);
      return () => window.clearTimeout(v);
    }, [e]),
    React.useEffect(() => {
      if (e) return;
      const j = x.current;
      if (((x.current = null), !j)) return;
      const v = window.setTimeout(() => {
        var w;
        if (j instanceof HTMLIFrameElement) {
          try {
            (w = j.contentWindow) == null || w.postMessage({ type: "frame:restore-focus" }, "*");
          } catch {}
          return;
        }
        if (j.isConnected && typeof j.focus == "function")
          try {
            j.focus();
          } catch {}
      }, 60);
      return () => window.clearTimeout(v);
    }, [e]),
    React.useEffect(() => {
      var S;
      if (!e) {
        f.current = !1;
        return;
      }
      if (f.current) return;
      f.current = !0;
      const j = document.getElementById("container");
      if (!(j != null && j.classList.contains("blind-mode"))) return;
      let v = "";
      try {
        const C = u.current.cloneNode(true);
        C.querySelectorAll(".material-icons,[aria-hidden=true]").forEach((x) => x.remove());
        const P = [...C.querySelectorAll("p,h1,h2,h3,h4,h5,h6,li")]
          .map((x) => (x.textContent ?? "").replace(/\s+/g, " ").trim())
          .filter((x) => x.length >= 8);
        v = [...new Set(P)].map((x) => (/[。！？；]$/.test(x) ? x : x + "。")).join("");
        v || (v = (C.textContent ?? "").replace(/\s+/g, " ").trim());
      } catch (_) {
        v = (((S = u.current) == null ? void 0 : S.textContent) ?? "").replace(/\s+/g, " ").trim();
      }
      const a = `${g.current}。${v}`.slice(0, 240),
        w = a + (a.match(/[。！？；]$/) ? "" : "。") + "点右上角「关闭」可关闭弹窗。";
      try {
        window.parent.postMessage({ type: "flash-app-bridge", kind: "modal:open", text: w }, "*");
      } catch {}
      const N = window.setTimeout(() => {
        announce(w);
      }, 600);
      return () => window.clearTimeout(N);
    }, [e]),
    !e)
  )
    return null;
  const m = jsxRuntime.jsxs("div", {
      className: "fixed inset-0 z-[80] flex items-end justify-center sm:items-center",
      style: { pointerEvents: "auto" },
      children: [
        jsxRuntime.jsx("div", {
          className: "absolute inset-0 bg-black/45",
          onClick: s,
          "data-testid": "modal-mask",
          "aria-hidden": "true",
        }),
        jsxRuntime.jsxs("div", {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": n.replace(/[*#_~`\[\](){}|>]/g, ""),
          className: `modal-lace modal-sheet pop-in relative w-full ${c ? "max-w-2xl" : "max-w-md"} rounded-t-3xl ${l ?? "bg-[#fdf6ea]"} p-5 shadow-2xl sm:rounded-3xl`,
          style: {
            maxHeight: "78vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
          children: [
            jsxRuntime.jsx(LaceWave, {}),
            jsxRuntime.jsxs("div", {
              className: "mb-3 flex items-center justify-between",
              children: [
                jsxRuntime.jsx("p", {
                  className: "text-lg font-black text-[#4a2c17]",
                  children: segmentByEmoji(n, "t"),
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "modal-close",
                  "aria-label": "关闭弹窗",
                  onClick: s,
                  className:
                    "flex h-12 w-12 items-center justify-center rounded-full bg-[#f0dcc0] text-[#6b4226]",
                  children: jsxRuntime.jsx("span", {
                    className: "material-icons",
                    "aria-hidden": "true",
                    style: { fontSize: 24 },
                    children: "close",
                  }),
                }),
              ],
            }),
            jsxRuntime.jsx("div", {
              className: "overflow-y-auto",
              style: { flex: 1 },
              ref: u,
              tabIndex: -1,
              children: a,
            }),
          ],
        }),
      ],
    }),
    p = o ? m : renderWithSpeech(m),
    y = document.getElementById("global-modal-root");
  return y ? ReactDOMInstance.createPortal(p, y) : p;
}

var Xu = {};

var howlerLoaded;
