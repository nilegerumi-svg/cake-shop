function clampStatValue(e) {
  return typeof e == "number" && e >= 0 ? Math.min(100, Math.floor(e)) : 0;
}

function sanitizeTools(e) {
  const n = Array.isArray(e.tools) ? e.tools.filter((o) => typeof o == "string" && !!CRAFT_TOOL_MAP[o]) : [];
  n.includes("basic") || n.unshift("basic");
  const s = safeParseJson(
      typeof e.toolSkillMap == "string" ? e.toolSkillMap : JSON.stringify(e.toolSkillMap ?? {}),
      {},
    ),
    a = {};
  for (const [o, l] of Object.entries(s))
    CRAFT_TOOL_MAP[o] && typeof l == "number" && (a[o] = Math.min(100, Math.max(0, Math.floor(l))));
  if (Object.keys(a).length === 0) {
    const o =
        typeof e.toolSkill == "number" && e.toolSkill >= 0
          ? Math.min(100, Math.floor(e.toolSkill))
          : 0,
      l = Math.floor(o / Math.max(1, n.length));
    for (const c of n) a[c] = l;
  }
  return { tools: n, toolSkill: clampStatValue(e.toolSkill), toolSkillMap: a };
}

function sanitizeCraftQueue(e) {
  const n = safeParseJson(e, []),
    s = [];
  for (const a of n) {
    if (
      typeof (a == null ? void 0 : a.id) != "string" ||
      typeof (a == null ? void 0 : a.ingId) != "string" ||
      !INGREDIENT_MAP[a.ingId]
    )
      continue;
    const o = typeof a.qty == "number" && a.qty > 0 ? Math.floor(a.qty) : 0,
      l = typeof a.cost == "number" && a.cost >= 0 ? Math.floor(a.cost) : 0,
      c = typeof a.arriveDay == "number" && a.arriveDay >= 1 ? Math.floor(a.arriveDay) : 1;
    o <= 0 || s.push({ id: a.id, ingId: a.ingId, qty: o, cost: l, arriveDay: c });
  }
  return s;
}

function sanitizeHomeObject(e) {
  const n = safeParseJson(e, {});
  return n && typeof n == "object" ? n : {};
}

function sanitizeWardrobe(e) {
  var w;
  const n = safeParseJson(e, {}),
    s = typeof n.equipped == "object" && n.equipped !== null ? n.equipped : {},
    a = typeof n.hairstyle == "object" && n.hairstyle !== null ? n.hairstyle : {},
    o = (N) => (typeof N != "string" ? "" : (APRON_TO_OUTFIT[N] ?? N)),
    l = Array.isArray(n.owned) ? n.owned : [],
    c = [],
    u = [];
  for (const N of l) {
    const S = o(N);
    OUTFIT_MAP[S] && !c.includes(S)
      ? c.push(S)
      : HAIRSTYLE_MAP[S] && HAIRSTYLE_MAP[S].type === "salon" && !u.includes(S) && u.push(S);
  }
  const f = { ...DEFAULT_OUTFIT };
  for (const N of SLOT_ORDER) {
    const S = s[N];
    typeof S == "string" && OUTFIT_MAP[S] && OUTFIT_MAP[S].slot === N && (f[N] = S);
  }
  const g = o(s.clothes);
  g && OUTFIT_MAP[g] && (f[OUTFIT_MAP[g].slot] = g);
  const x = o(s.accessory);
  x && OUTFIT_MAP[x] && (f[OUTFIT_MAP[x].slot] = x);
  let m = "";
  const p = s.hair,
    y = o(p);
  HAIRSTYLE_MAP[y] && (m = y);
  const j = a.equipped;
  typeof j == "string" && HAIRSTYLE_MAP[j] && (m = j);
  const v = Array.isArray(a.owned) ? a.owned : [];
  for (const N of v)
    typeof N == "string" && HAIRSTYLE_MAP[N] && HAIRSTYLE_MAP[N].type === "salon" && !u.includes(N) && u.push(N);
  (!m || (((w = HAIRSTYLE_MAP[m]) == null ? void 0 : w.type) === "salon" && !u.includes(m))) && (m = DEFAULT_HAIRSTYLE);
  for (const N of SLOT_ORDER) {
    const S = f[N];
    if (S && OUTFIT_MAP[S] && OUTFIT_MAP[S].slot === N) c.includes(S) || c.push(S);
    else {
      const C = DEFAULT_OUTFIT[N];
      C ? ((f[N] = C), c.includes(C) || c.push(C)) : (f[N] = "");
    }
  }
  for (const N of INITIAL_OWNED_OUTFITS) c.includes(N) || c.push(N);
  return { outfits: { owned: c, equipped: f }, hairstyle: { owned: u, equipped: m } };
}

function sanitizeSeenList(e, n) {
  const s = safeParseJson(e, []),
    a = [],
    o = new Set();
  for (const l of s) {
    if (typeof l != "string") continue;
    const c = l.lastIndexOf("_");
    if (c <= 0) continue;
    const u = l.slice(0, c),
      f = Number(l.slice(c + 1));
    !Number.isInteger(f) ||
      f < 0 ||
      f >= n.length ||
      (n[f].fid === u && (o.has(l) || (o.add(l), a.push(l))));
  }
  return a;
}

function mergeShopPlacements(e, n) {
  var o, l, c;
  const s = [...e.furniture],
    a = [...n];
  for (const u of DEFAULT_SHOP_PLACEMENTS) {
    const f = s.findIndex((g) => g.fid === u.fid);
    if (f >= 0) a.some((g) => g.startsWith(`${u.fid}_`)) || a.push(makePlacementId(u.fid, f));
    else {
      const g = `${((o = WOOD_MAP[u.material]) == null ? void 0 : o.name) ?? ""}·${((l = COLOR_MAP[u.color]) == null ? void 0 : l.name) ?? ""}的${((c = FURNITURE_MAP[u.fid]) == null ? void 0 : c.name) ?? ""}`;
      (s.push({
        fid: u.fid,
        material: u.material,
        color: u.color,
        desc: g,
        crafted: !1,
        floor: floorForFurniture(u.fid),
      }),
        a.push(makePlacementId(u.fid, s.length - 1)));
    }
  }
  return { home: { ...e, furniture: s }, placements: a };
}

const clampToRange = (e, n) => (typeof e == "number" && e >= 0 ? Math.min(n, Math.floor(e)) : 0);

function sanitizeHome(e) {
  const n = sanitizeHomeObject(e),
    s = sanitizeCraftedFurniture(n.furniture),
    a = sanitizeMaterials(n.materials),
    { readBooks: o, ownedBooks: l, bookProgress: c } = sanitizeBooks(n),
    { tools: u, toolSkill: f, toolSkillMap: g } = sanitizeTools(n);
  return {
    furniture: s,
    materials: a,
    readBooks: o,
    ownedBooks: l,
    tools: u,
    toolSkill: f,
    toolSkillMap: g,
    materialKnowledge: clampToRange(n.materialKnowledge, 100),
    furnitureExp: clampToRange(n.furnitureExp, 99999),
    sleptToday: clampToRange(n.sleptToday, 9),
    playedToday: clampToRange(n.playedToday, 9),
    bookProgress: c,
  };
}

const MAIN_SLOT_ID = "main",
  SLOT_COUNT = 10;

function slotKeyOf(e) {
  return e === 1 ? MAIN_SLOT_ID : `slot_${e}`;
}

function slotIndexFromKey(e) {
  if (e === MAIN_SLOT_ID) return 1;
  const n = /^slot_(\d+)$/.exec(e ?? ""),
    s = n ? Number(n[1]) : NaN;
  return Number.isInteger(s) && s >= 2 && s <= SLOT_COUNT ? s : 1;
}

const isEmbedded = window.parent !== window,
  pendingBridgeRequests = new Map(),
  bridgeReadyCallbacks = [];

let bridgeRequestSeq = 0,
  bridgeReady = !1,
  isMemoryStoreMode = !1,
  memoryStore = {},
  readyCallbacksFlushed = !1;

function isBridgeMessage(e) {
  return !e || typeof e != "object" ? !1 : e.type === "flash-app-bridge";
}

const BRIDGE_KEY_RE = /^[A-Za-z0-9_.:-]{1,128}$/,
  BRIDGE_MAX_DEPTH = 5,
  BRIDGE_MAX_ITEMS = 5e3,
  BRIDGE_MAX_STRING = 16e6,
  // 单次清洗的节点预算：结构克隆保留引用共享，若不限总量，5 层 × 5000 宽的共享引用可放大到 10^14 级遍历
  BRIDGE_MAX_NODES = 5e5;

function isPlainBridgeObject(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}

function isBlockedBridgeKey(e) {
  return e === "__proto__" || e === "constructor" || e === "prototype";
}

function newBridgeBudget() {
  return { left: BRIDGE_MAX_NODES };
}

function sanitizeBridgeValue(e, n, s) {
  const a = s || newBridgeBudget();
  if (a.left <= 0) return void 0;
  a.left -= 1;
  const o = typeof e;
  if (o == "string") return e.length <= BRIDGE_MAX_STRING ? e : void 0;
  if (o == "number") return Number.isFinite(e) ? e : void 0;
  if (o == "boolean" || e === null) return e;
  if (o != "object" || n >= BRIDGE_MAX_DEPTH) return void 0;
  if (Array.isArray(e)) {
    const l = [];
    for (const c of e.slice(0, BRIDGE_MAX_ITEMS)) {
      const u = sanitizeBridgeValue(c, n + 1, a);
      u !== void 0 && l.push(u);
    }
    return l;
  }
  const l = {};
  for (const c of Object.keys(e).slice(0, BRIDGE_MAX_ITEMS)) {
    if (isBlockedBridgeKey(c)) continue;
    const u = sanitizeBridgeValue(e[c], n + 1, a);
    u !== void 0 && (l[c] = u);
  }
  return l;
}

// 宿主快照只接受「受限键名 + 原始值」的扁平 KV，外部对象不直接成为存储内容
function sanitizeMemorySnapshot(e) {
  const n = Object.create(null);
  if (!isPlainBridgeObject(e)) return n;
  const s = newBridgeBudget();
  let a = 0;
  for (const o of Object.keys(e)) {
    if (a >= BRIDGE_MAX_ITEMS || s.left <= 0) break;
    if (isBlockedBridgeKey(o) || !BRIDGE_KEY_RE.test(o)) continue;
    const l = sanitizeBridgeValue(e[o], 0, s);
    (typeof l == "string" || typeof l == "number" || typeof l == "boolean") &&
      ((n[o] = String(l)), (a += 1));
  }
  return n;
}

function sanitizeBridgeReply(e) {
  return {
    success: e.success === !0,
    message: typeof e.message == "string" ? e.message.slice(0, 500) : void 0,
    data: sanitizeBridgeValue(e.data, 0, newBridgeBudget()),
  };
}

function flushReadyCallbacks() {
  if (readyCallbacksFlushed) return;
  readyCallbacksFlushed = !0;
  const e = bridgeReadyCallbacks.splice(0);
  for (const n of e) n();
}

function resolveBridgeRequest(e, n) {
  const s = pendingBridgeRequests.get(e);
  s && (pendingBridgeRequests.delete(e), window.clearTimeout(s.timer), s.resolve(n));
}

window.addEventListener("message", (e) => {
  // 桥接回包只认父窗口（宿主可能跨源，故不校验 origin）：避免任意页面伪造存储快照与 DB 回包
  if (e.source !== window.parent) return;
  const n = e.data;
  if (isBridgeMessage(n))
    switch (n.kind) {
      case "shell:ready":
        ((bridgeReady = !0),
          n.snapshot && typeof n.snapshot == "object"
            ? ((memoryStore = sanitizeMemorySnapshot(n.snapshot)),
              (memoryStoreMap = null),
              (isMemoryStoreMode = !0))
            : void 0,
          flushReadyCallbacks());
        break;
      case "db:reply": {
        const s = sanitizeBridgeReply(n);
        resolveBridgeRequest(n.requestId, { success: s.success, data: s.data ?? [], message: s.message });
        break;
      }
      case "file:reply": {
        const s = sanitizeBridgeReply(n);
        resolveBridgeRequest(n.requestId, { success: s.success, data: s.data ?? null, message: s.message });
        break;
      }
      case "tts:done":
        resolveBridgeRequest(n.requestId, void 0);
        break;
    }
});

isEmbedded && window.parent.postMessage({ type: "flash-app-bridge", kind: "game:hello" }, "*");

function waitBridgeReady(e = 800) {
  return bridgeReady
    ? Promise.resolve(!0)
    : isEmbedded
      ? new Promise((n) => {
          const s = window.setTimeout(() => {
            (flushReadyCallbacks(), n(bridgeReady));
          }, e);
          bridgeReadyCallbacks.push(() => {
            (window.clearTimeout(s), n(bridgeReady));
          });
        })
      : Promise.resolve(!1);
}

function isInFrame() {
  return isEmbedded;
}

function usesMemoryStore() {
  return isMemoryStoreMode;
}

function getMemoryStore() {
  return memoryStore;
}

function getPendingRequests() {
  return pendingBridgeRequests;
}

function callBridge(e, n) {
  const s = ++bridgeRequestSeq,
    a = new Promise((o, l) => {
      const c = window.setTimeout(() => {
        (pendingBridgeRequests.delete(s), l(new Error("桥接请求超时")));
      }, n);
      pendingBridgeRequests.set(s, { kind: e, resolve: (u) => o(u), reject: l, timer: c });
    });
  return { requestId: s, promise: a };
}

let memoryStoreMap = null;

function ensureMemoryStoreMap() {
  return (memoryStoreMap || (memoryStoreMap = new Map(Object.entries(getMemoryStore()))), memoryStoreMap);
}

function storageGetItem(e) {
  if (usesMemoryStore()) {
    const n = ensureMemoryStoreMap();
    return n.has(e) ? (n.get(e) ?? null) : null;
  }
  try {
    return window.localStorage.getItem(e);
  } catch {
    return null;
  }
}

function storageSetItem(e, n) {
  const s = String(n);
  if ((usesMemoryStore() && ensureMemoryStoreMap().set(e, s), isInFrame())) {
    window.parent.postMessage(
      { type: "flash-app-bridge", kind: "storage:set", key: e, value: s },
      "*",
    );
    return;
  }
  try {
    window.localStorage.setItem(e, s);
  } catch {}
}

function readOfflineSaves() {
  try {
    const r = localStorage.getItem("sweet-offline-saves");
    const t = r ? JSON.parse(r) : null;
    return t && typeof t == "object" ? t : {};
  } catch {
    return {};
  }
}

function writeOfflineSaves(t) {
  try {
    localStorage.setItem("sweet-offline-saves", JSON.stringify(t));
  } catch {}
}

function isOfflineSaveMode() {
  try {
    return typeof window.lingguang == "undefined" || !window.lingguang.db;
  } catch {
    return !1;
  }
}

function offlineSelect(e) {
  const t = readOfflineSaves();
  if (/from\s+player_saves\s+where\s+id\s*=\s*\?\s*limit\s*1\s*$/i.test(e.sql)) {
    const id = String((e.binds || [])[0]);
    const row = t[id];
    return { success: !0, data: row ? [row] : [] };
  }
  if (/from\s+player_saves\s+where\s+id\s+in\s*\(/i.test(e.sql))
    return { success: !0, data: Object.keys(t).map((k) => t[k]) };
  return null;
}

function offlineWrite(e) {
  const t = readOfflineSaves();
  let m = e.sql.match(/^update\s+player_saves\s+set\s+([\s\S]+?)\s+where\s+id\s*=\s*\?\s*$/i);
  if (m) {
    const cols = m[1].split(",").map((s) => s.trim());
    if (!cols.every((c) => /^[a-z_]+\s*=\s*\?$/i.test(c))) return null;
    const binds = e.binds || [];
    const id = String(binds[binds.length - 1]);
    const row = t[id] || { id: id };
    cols.forEach((c, i) => {
      row[c.replace(/\s*=\s*\?$/, "").trim()] = binds[i];
    });
    t[id] = row;
    writeOfflineSaves(t);
    return { success: !0, data: { rowsAffected: 1 } };
  }
  m = e.sql.match(/^insert\s+into\s+player_saves\s*\(([^)]+)\)\s*values\s*\(([^)]+)\)\s*$/i);
  if (m) {
    const cols = m[1].split(",").map((s) => s.trim());
    const qs = m[2].split(",").map((s) => s.trim());
    if (cols.length !== qs.length || !qs.every((x) => x === "?")) return null;
    const binds = e.binds || [];
    if (binds.length < cols.length) return null;
    const row = {};
    cols.forEach((c, i) => {
      row[c] = binds[i];
    });
    t[String(row.id)] = row;
    writeOfflineSaves(t);
    return { success: !0 };
  }
  m = e.sql.match(/^delete\s+from\s+player_saves\s+where\s+id\s*=\s*\?\s*$/i);
  if (m) {
    const id = String((e.binds || [])[0]);
    delete t[id];
    writeOfflineSaves(t);
    return { success: !0 };
  }
  return null;
}

function runSql(e) {
  if (!isInFrame()) {
    if (isOfflineSaveMode()) {
      const r = offlineSelect(e);
      if (r) return r;
      return { success: !1, message: "db unavailable" };
    }
    return window.lingguang.db.query(e);
  }
  const { requestId: n, promise: s } = callBridge("db", 2e4);
  return (
    window.parent.postMessage(
      { type: "flash-app-bridge", kind: "db:query", requestId: n, sql: e.sql, binds: e.binds },
      "*",
    ),
    s
  );
}

async function runSqlExec(e) {
  if (!isInFrame()) {
    if (isOfflineSaveMode()) {
      const w = offlineWrite(e);
      if (w) return w;
      return { success: !1, message: "db unavailable" };
    }
    return window.lingguang.db.execute(e);
  }
  const { requestId: n, promise: s } = callBridge("db", 2e4);
  return (
    window.parent.postMessage(
      { type: "flash-app-bridge", kind: "db:execute", requestId: n, sql: e.sql, binds: e.binds },
      "*",
    ),
    s
  );
}

async function callNativeMethod(e, n) {
  var l;
  if (!isInFrame()) {
    const c = n === "file:choose" ? "chooseFile" : n === "file:read" ? "readFile" : "saveFile",
      u = (l = window.lingguang) == null ? void 0 : l[c];
    if (typeof u != "function") throw new Error("fs unavailable");
    return await u(e);
  }
  const { requestId: s, promise: a } = callBridge("file", 3e4);
  window.parent.postMessage(
    {
      type: "flash-app-bridge",
      kind: n,
      requestId: s,
      filePath: typeof e.filePath == "string" ? e.filePath : void 0,
      encoding: typeof e.encoding == "string" ? e.encoding : void 0,
      data: typeof e.data == "string" ? e.data : void 0,
      fileName: typeof e.fileName == "string" ? e.fileName : void 0,
    },
    "*",
  );
  const o = await a;
  if (!o.success) {
    const c = new Error(o.message || "file operation failed");
    throw ((c.name = o.message || "FILE_ERROR"), c);
  }
  return o.data;
}

async function chooseFileNative() {
  return callNativeMethod({}, "file:choose");
}

async function readFileNative(e) {
  const n = await callNativeMethod({ filePath: e.filePath, encoding: e.encoding ?? "utf8" }, "file:read");
  return typeof (n == null ? void 0 : n.data) == "string" ? n.data : "";
}

async function saveFileNative(e) {
  const n = await callNativeMethod({ data: e.data, fileName: e.fileName }, "file:save");
  return (n == null ? void 0 : n.success) === !0;
}

function playTTS(e, n) {
  if (!isInFrame())
    return window.playTTS(e, {
      lang: n == null ? void 0 : n.lang,
      voiceType: n == null ? void 0 : n.voiceType,
    });
  const { requestId: s, promise: a } = callBridge("tts", 6e4);
  return (
    window.parent.postMessage(
      {
        type: "flash-app-bridge",
        kind: "tts:speak",
        requestId: s,
        text: e,
        lang: n == null ? void 0 : n.lang,
        voiceType: n == null ? void 0 : n.voiceType,
      },
      "*",
    ),
    a
  );
}

function stopTTS() {
  if (isInFrame()) {
    const e = getPendingRequests();
    for (const [n, s] of Array.from(e.entries()))
      s.kind === "tts" &&
        (e.delete(n), window.clearTimeout(s.timer), s.reject(new Error("朗读已停止")));
    window.parent.postMessage({ type: "flash-app-bridge", kind: "tts:stop" }, "*");
    return;
  }
  try {
    window.stopAllTTS();
  } catch {}
}

function vibrateDevice(e) {
  var n, s;
  if (isInFrame()) {
    window.parent.postMessage(
      { type: "flash-app-bridge", kind: "vibrate", mode: e.mode, intensity: e.intensity },
      "*",
    );
    return;
  }
  try {
    (s = (n = window.lingguang) == null ? void 0 : n.vibrate) == null || s.call(n, e);
  } catch {}
}

function requestFullscreen() {
  isInFrame() && window.parent.postMessage({ type: "flash-app-bridge", kind: "fullscreen:request" }, "*");
}

function announceA11y(e) {
  isInFrame() &&
    window.parent.postMessage({ type: "flash-app-bridge", kind: "a11y:announce", text: e }, "*");
}

const CURRENT_SLOT_KEY = "tianmi_current_slot";

function getCurrentSlot() {
  const e = storageGetItem(CURRENT_SLOT_KEY),
    n = Number(e);
  return Number.isInteger(n) && n >= 1 && n <= SLOT_COUNT ? n : 1;
}

function setCurrentSlot(e) {
  const n = Number.isInteger(e) && e >= 1 && e <= SLOT_COUNT ? e : 1;
  storageSetItem(CURRENT_SLOT_KEY, String(n));
}

function hydrateStateCore(e, n) {
  const s = Array.isArray(n.cookwares)
      ? n.cookwares.filter((c) => typeof c == "string" && !!COOKWARE_MAP[c])
      : [],
    a = s.includes("cw_oven") ? s : ["cw_oven", ...s],
    o = safeParseJson(
      typeof n.cookwareSkill == "string" ? n.cookwareSkill : JSON.stringify(n.cookwareSkill ?? {}),
      {},
    ),
    l = {};
  for (const [c, u] of Object.entries(o))
    COOKWARE_MAP[c] && typeof u == "number" && (l[c] = Math.min(100, Math.max(0, Math.floor(u))));
  return {
    playerName: typeof e.player_name == "string" ? e.player_name : "店主",
    shopName: typeof e.shop_name == "string" ? e.shop_name : "甜蜜物语",
    coins: typeof e.coins == "number" && e.coins >= 0 ? Math.floor(e.coins) : 0,
    day: typeof e.day == "number" && e.day >= 1 ? Math.floor(e.day) : 1,
    season:
      typeof e.season == "number" && e.season >= 0 && e.season <= 3 ? Math.floor(e.season) : 0,
    energy:
      typeof e.energy == "number" && e.energy >= 0 ? Math.min(100, Math.floor(e.energy)) : 100,
    visits: typeof e.visits == "number" && e.visits >= 0 ? Math.floor(e.visits) : 0,
    explores: typeof e.explores == "number" && e.explores >= 0 ? Math.floor(e.explores) : 0,
    chattedToday: sanitizeStringArray(e.chatted_today),
    chatHourKey: typeof n.chatHourKey == "string" ? n.chatHourKey : "",
    chatCountsThisHour: (() => {
      const c = n.chatCountsThisHour,
        u = typeof c == "object" && c !== null ? c : {},
        f = {};
      for (const [g, x] of Object.entries(u))
        typeof x == "number" && x > 0 && (f[g] = Math.min(3, Math.floor(x)));
      return f;
    })(),
    datedToday: sanitizeStringArray(e.dated_today),
    mood: typeof e.mood == "number" && e.mood >= 0 ? Math.min(100, Math.floor(e.mood)) : 100,
    health:
      typeof e.health == "number" && e.health >= 0 ? Math.min(100, Math.floor(e.health)) : 100,
    hour:
      typeof e.hour == "number" && e.hour >= 0 ? Math.min(23, Math.max(0, Math.floor(e.hour))) : 8,
    sportSkill:
      typeof e.sport_skill == "number" && e.sport_skill >= 0
        ? Math.min(100, Math.floor(e.sport_skill))
        : 0,
    exercisedToday:
      typeof e.exercised_today == "number" && e.exercised_today >= 0
        ? Math.min(9, Math.floor(e.exercised_today))
        : 0,
    negotiation:
      typeof e.negotiation == "number" && e.negotiation >= 0
        ? Math.min(100, Math.floor(e.negotiation))
        : 0,
    employees: sanitizeStringArray(e.employees).filter((c) => !!EMPLOYEE_MAP[c]),
    metNpcs: sanitizeStringArray(e.met_npcs).filter((c) => !!NPC_RUNTIME_DATA[c] || !!EMPLOYEE_MAP[c]),
    fishingRod: e.fishing_rod === 1,
    caughtToday:
      typeof e.caught_today == "number" && e.caught_today >= 0
        ? Math.min(9, Math.floor(e.caught_today))
        : 0,
    fishedToday:
      typeof e.fished_today == "number" && e.fished_today >= 0
        ? Math.min(9, Math.floor(e.fished_today))
        : 0,
    cookwares: a,
    cookwareSkill: l,
    createdAt: typeof e.created_at == "number" ? e.created_at : Date.now(),
    updatedAt: typeof e.updated_at == "number" ? e.updated_at : Date.now(),
  };
}

function hydrateStateHome(e) {
  const n = (s, a) =>
    typeof s == "number" && !Number.isNaN(s) ? Math.min(100, Math.max(0, Math.floor(s))) : a;
  return {
    cashRegister:
      typeof e.cashRegister == "number" && e.cashRegister >= 0 ? Math.floor(e.cashRegister) : 0,
    gender: e.gender === "male" ? "male" : "female",
    age: typeof e.age == "number" && e.age >= 20 ? Math.min(99, Math.floor(e.age)) : 25,
    sewingSkill: n(e.sewingSkill, 0),
    sewingTools: (() => {
      const s = Array.isArray(e.sewingTools)
        ? e.sewingTools.filter((a) => typeof a == "string" && !!SEWING_TOOL_MAP[a])
        : [];
      return s.includes("sew_basic") ? s : ["sew_basic", ...s];
    })(),
    hygiene: n(e.hygiene, 100),
    combedToday: e.combedToday === !0,
    satiety:
      typeof e.satiety == "number" && !Number.isNaN(e.satiety)
        ? Math.min(100, Math.max(0, Math.floor(e.satiety)))
        : 70,
    hungryDays:
      typeof e.hungryDays == "number" && Number.isFinite(e.hungryDays) && e.hungryDays >= 0
        ? Math.floor(e.hungryDays)
        : 0,
    ateToday: e.ateToday === !0,
    dead: e.dead === !0,
    deathCause: e.deathCause === "psych" ? "psych" : "starve",
    bakeSkill: n(e.bakeSkill, 0),
    customRecipes: (() => {
      const s0 = Array.isArray(e.customRecipes) ? e.customRecipes : [],
        out = [];
      for (const r1 of s0) {
        if (typeof r1 != "object" || r1 === null || !r1.sel) continue;
        const L = {
          color: CBW_COLORS,
          kind: CBW_KINDS,
          style: CBW_STYLES,
          size: CBW_SIZES,
          fill: CBW_FILLS,
          cream: CBW_CREAMS,
        };
        let ok0 = true;
        for (const g1 of ["color", "kind", "style", "size", "fill", "cream"]) {
          const v1 = r1.sel[g1];
          if (typeof v1 != "string" || !L[g1].some((x1) => x1.id === v1)) {
            ok0 = false;
            break;
          }
        }
        if (ok0)
          out.push({
            key: ["color", "kind", "style", "size", "fill", "cream"]
              .map((g1) => r1.sel[g1])
              .join("|"),
            sel: r1.sel,
            name: typeof r1.name == "string" ? r1.name.slice(0, 30) : "自研面包",
            price: typeof r1.price == "number" && r1.price > 0 ? Math.floor(r1.price) : 12,
            count: typeof r1.count == "number" && r1.count >= 1 ? Math.floor(r1.count) : 1,
          });
        if (out.length >= 12) break;
      }
      return out;
    })(),
    shelterFriendliness:
      typeof e.shelterFriendliness == "number"
        ? Math.min(200, Math.max(0, Math.floor(e.shelterFriendliness)))
        : 0,
    shelterDonatedToday:
      typeof e.shelterDonatedToday == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.shelterDonatedToday)))
        : 0,
    shelterEventsToday:
      typeof e.shelterEventsToday == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.shelterEventsToday)))
        : 0,
    bankSavings:
      typeof e.bankSavings == "number" && e.bankSavings >= 0 ? Math.floor(e.bankSavings) : 0,
    flowerBouquets:
      typeof e.flowerBouquets == "number" && e.flowerBouquets >= 0
        ? Math.floor(e.flowerBouquets)
        : 0,
    charityApplied: e.charityApplied === !0,
    charitySoldToday:
      typeof e.charitySoldToday == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.charitySoldToday)))
        : 0,
    commercialBoostDays:
      typeof e.commercialBoostDays == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.commercialBoostDays)))
        : 0,
    foodStreetInvest:
      typeof e.foodStreetInvest == "number"
        ? Math.min(100, Math.max(0, Math.floor(e.foodStreetInvest)))
        : 0,
    nightMarketPermit: e.nightMarketPermit === !0,
    nightMarketPermitMonth:
      typeof e.nightMarketPermitMonth == "string" ? e.nightMarketPermitMonth : "",
    nightMarketTruck: e.nightMarketTruck === !0,
    truckFeePaidMonth: typeof e.truckFeePaidMonth == "string" ? e.truckFeePaidMonth : "",
    fishFeed: typeof e.fishFeed == "number" && e.fishFeed >= 0 ? Math.floor(e.fishFeed) : 0,
    aquariumFish: e.aquariumFish === !0,
    aquariumHealth: n(e.aquariumHealth, 0),
    aquariumCleanliness: n(e.aquariumCleanliness, 100),
    aquariumDirty: e.aquariumDirty === !0,
    aquariumDirtyDay:
      typeof e.aquariumDirtyDay == "number" && e.aquariumDirtyDay >= 0
        ? Math.floor(e.aquariumDirtyDay)
        : 0,
    aquariumLastFeedDay:
      typeof e.aquariumLastFeedDay == "number" && e.aquariumLastFeedDay >= 0
        ? Math.floor(e.aquariumLastFeedDay)
        : 0,
    aquariumDecor: Array.isArray(e.aquariumDecor)
      ? e.aquariumDecor.filter((s) => typeof s == "string")
      : [],
    seeds: (() => {
      const s = e.seeds;
      if (typeof s != "object" || s === null) return {};
      const a = {};
      for (const [o, l] of Object.entries(s))
        typeof l == "number" && l > 0 && (a[o] = Math.min(99, Math.floor(l)));
      return a;
    })(),
    fertilizer:
      typeof e.fertilizer == "number" && e.fertilizer >= 0
        ? Math.min(99, Math.floor(e.fertilizer))
        : 0,
    plants: (() => {
      const s = Array.isArray(e.plants) ? e.plants : [],
        a = [];
      for (const o of s) {
        if (typeof o != "object" || o === null) continue;
        const l = o,
          c = typeof l.slot == "number" && l.slot >= 1 && l.slot <= 4 ? Math.floor(l.slot) : 0;
        c &&
          typeof l.seedId == "string" &&
          a.push({
            slot: c,
            seedId: l.seedId,
            plantedDay:
              typeof l.plantedDay == "number" && l.plantedDay >= 1 ? Math.floor(l.plantedDay) : 1,
            wateredToday: l.wateredToday === !0,
            wateredCount:
              typeof l.wateredCount == "number" && l.wateredCount >= 0
                ? Math.min(30, Math.floor(l.wateredCount))
                : 0,
            fertilized:
              typeof l.fertilized == "number" && l.fertilized >= 0
                ? Math.min(30, Math.floor(l.fertilized))
                : 0,
          });
      }
      return a.sort((o, l) => o.slot - l.slot);
    })(),
    homeFlowers:
      typeof e.homeFlowers == "number" && e.homeFlowers >= 0
        ? Math.min(99, Math.floor(e.homeFlowers))
        : 0,
    homeFlowerDecor:
      typeof e.homeFlowerDecor == "number" && e.homeFlowerDecor >= 0
        ? Math.min(99, Math.floor(e.homeFlowerDecor))
        : 0,
    homeBonsai:
      typeof e.homeBonsai == "number" && e.homeBonsai >= 0
        ? Math.min(99, Math.floor(e.homeBonsai))
        : 0,
    plazaFlowerSoldToday:
      typeof e.plazaFlowerSoldToday == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.plazaFlowerSoldToday)))
        : 0,
    flowerShopPitchToday:
      typeof e.flowerShopPitchToday == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.flowerShopPitchToday)))
        : 0,
    riverGatheredToday:
      typeof e.riverGatheredToday == "number"
        ? Math.min(9, Math.max(0, Math.floor(e.riverGatheredToday)))
        : 0,
    collectionsPlaced: Array.isArray(e.collectionsPlaced)
      ? e.collectionsPlaced.filter((s) => typeof s == "string")
      : [],
    festivalSouvenirs: Array.isArray(e.festivalSouvenirs)
      ? e.festivalSouvenirs.filter((s) => typeof s == "string")
      : [],
    stargazingSeen: Array.isArray(e.stargazingSeen)
      ? e.stargazingSeen.filter((s) => typeof s == "string")
      : [],
    stargazedToday: e.stargazedToday === !0,
    fishBaitType: ["worm", "premium", "spring", "summer", "autumn", "winter", "night"].includes(
      e.fishBaitType,
    )
      ? e.fishBaitType
      : "loach",
    fishTank: (() => {
      const s = Array.isArray(e.fishTank) ? e.fishTank : [],
        a = [];
      for (const o of s) {
        if (typeof o != "object" || o === null) continue;
        const l = o;
        if (typeof l.ingId != "string") continue;
        const c = typeof l.qty == "number" && l.qty > 0 ? Math.min(6, Math.floor(l.qty)) : 0;
        c <= 0 ||
          a.push({
            ingId: l.ingId,
            qty: c,
            record: typeof l.record == "number" && l.record > 0 ? Math.floor(l.record) : 0,
          });
      }
      return a;
    })(),
    fishOrderCooldown:
      typeof e.fishOrderCooldown == "number" && e.fishOrderCooldown >= 0
        ? Math.min(9, Math.floor(e.fishOrderCooldown))
        : 0,
    fontScale: ["small", "mediumSmall", "medium", "large", "xlarge"].includes(e.fontScale)
      ? e.fontScale
      : "medium",
    hasBag: e.hasBag === !0,
    hasFoodBox: e.hasFoodBox === !0,
    hasFishBucket: e.hasFishBucket === !0,
    carried: (() => {
      const s = Array.isArray(e.carried) ? e.carried : [],
        a = [];
      for (const o of s) {
        if (typeof o != "object" || o === null) continue;
        const l = o;
        if (typeof l.id != "string" || typeof l.refId != "string") continue;
        const c = l.kind;
        if (c !== "snack" && c !== "food" && c !== "flower" && c !== "deco" && c !== "fish")
          continue;
        const u = typeof l.qty == "number" && l.qty > 0 ? Math.min(99, Math.floor(l.qty)) : 0;
        if (u <= 0) continue;
        const f =
          typeof l.quality == "string" &&
          (l.quality === "perfect" ||
            l.quality === "good" ||
            l.quality === "normal" ||
            l.quality === "fail")
            ? l.quality
            : void 0;
        a.push({
          id: l.id,
          kind: c,
          refId: l.refId,
          name: typeof l.name == "string" ? l.name : l.refId,
          qty: u,
          quality: f,
        });
      }
      return a;
    })(),
    pendingOrders: (() => {
      const s = Array.isArray(e.pendingOrders) ? e.pendingOrders : [],
        a = [];
      for (const o of s) {
        if (typeof o != "object" || o === null) continue;
        const l = o;
        if (typeof l.id != "string" || !Array.isArray(l.entries)) continue;
        const c = [];
        for (const u of l.entries) {
          if (typeof u != "object" || u === null) continue;
          const f = u,
            g = f.kind;
          if (
            (g !== "ingredient" &&
              g !== "snack" &&
              g !== "food" &&
              g !== "flower" &&
              g !== "tool") ||
            typeof f.refId != "string"
          )
            continue;
          const x = typeof f.qty == "number" && f.qty > 0 ? Math.min(999, Math.floor(f.qty)) : 0;
          x <= 0 ||
            c.push({
              kind: g,
              refId: f.refId,
              name: typeof f.name == "string" ? f.name : f.refId,
              qty: x,
            });
        }
        c.length !== 0 &&
          a.push({
            id: l.id,
            entries: c,
            goodsCost:
              typeof l.goodsCost == "number" && l.goodsCost >= 0 ? Math.floor(l.goodsCost) : 0,
            fee: typeof l.fee == "number" && l.fee >= 0 ? Math.floor(l.fee) : 0,
            arriveDay:
              typeof l.arriveDay == "number" && l.arriveDay >= 1 ? Math.floor(l.arriveDay) : 1,
          });
      }
      return a;
    })(),
    govTickets: (() => {
      const s = Array.isArray(e.govTickets) ? e.govTickets : [],
        a = [],
        o = new Set([
          "charity_apply",
          "charity_sell",
          "commercial",
          "rename_player",
          "rename_shop",
          "relief",
        ]);
      for (const l of s) {
        if (typeof l != "object" || l === null) continue;
        const c = l;
        if (typeof c.id != "string" || typeof c.kind != "string" || !o.has(c.kind)) continue;
        const u = c.payload;
        a.push({
          id: c.id,
          kind: c.kind,
          payload: { name: typeof (u == null ? void 0 : u.name) == "string" ? u.name : void 0 },
          submitDay:
            typeof c.submitDay == "number" && c.submitDay >= 1 ? Math.floor(c.submitDay) : 1,
          applyDay: typeof c.applyDay == "number" && c.applyDay >= 1 ? Math.floor(c.applyDay) : 1,
        });
      }
      return a;
    })(),
    deliveredHistory: (() => {
      const s = Array.isArray(e.deliveredHistory) ? e.deliveredHistory : [],
        a = [];
      for (const o of s) {
        if (typeof o != "object" || o === null) continue;
        const l = o;
        typeof l.id == "string" &&
          a.push({
            id: l.id,
            day: typeof l.day == "number" && l.day >= 1 ? Math.floor(l.day) : 1,
            summary: typeof l.summary == "string" ? l.summary : "",
            cost: typeof l.cost == "number" && l.cost >= 0 ? Math.floor(l.cost) : 0,
          });
      }
      return a;
    })(),
    shopUpgradeLevel:
      typeof e.shopUpgradeLevel == "number" && e.shopUpgradeLevel >= 1
        ? Math.min(10, Math.floor(e.shopUpgradeLevel))
        : 1,
    coffeeUsedDay:
      typeof e.coffeeUsedDay == "number" && e.coffeeUsedDay >= 1 ? Math.floor(e.coffeeUsedDay) : 0,
    floorLights: (() => {
      const s = e.floorLights,
        a = {};
      if (typeof s == "object" && s !== null)
        for (const o of ["1f", "2f", "3f", "roof"]) a[o] = s[o] !== !1;
      return a;
    })(),
    foodDeliveries: Array.isArray(e.foodDeliveries)
      ? e.foodDeliveries.filter(
          (s) => typeof s == "object" && s !== null && typeof s.id == "string",
        )
      : [],
    deliveryOrders: Array.isArray(e.deliveryOrders)
      ? e.deliveryOrders.filter(
          (s) => typeof s == "object" && s !== null && typeof s.id == "string",
        )
      : [],
    sushiStall: Array.isArray(e.sushiStall)
      ? e.sushiStall.filter((s) => typeof s == "object" && s !== null && typeof s.pid == "string")
      : [],
    customCakeCounter:
      typeof e.customCakeCounter == "number" && e.customCakeCounter >= 0
        ? Math.floor(e.customCakeCounter)
        : 0,
    coastDoneToday: Array.isArray(e.coastDoneToday)
      ? e.coastDoneToday.filter((s) => typeof s == "string")
      : [],
    subsidyClaimed: Array.isArray(e.subsidyClaimed)
      ? e.subsidyClaimed.filter((s) => typeof s == "string")
      : [],
    tutorial: (() => {
      const s = e.tutorial;
      if (typeof s != "object" || s === null) return {};
      const a = {};
      for (const [o, l] of Object.entries(s)) l === !0 && (a[o] = !0);
      return a;
    })(),
    newbieTipsShown:
      typeof e.newbieTipsShown == "number" && e.newbieTipsShown >= 0 && e.newbieTipsShown <= 7
        ? Math.floor(e.newbieTipsShown)
        : 7,
  };
}

function hydrateStateExtra(e, n) {
  return {
    sewnClothes: (() => {
      const s = Array.isArray(n.sewnClothes) ? n.sewnClothes : [],
        a = [];
      for (const o of s) {
        if (typeof o != "object" || o === null) continue;
        const l = o;
        if (typeof l.outfitId != "string" || !OUTFIT_MAP[l.outfitId]) continue;
        const c = typeof l.fabricId == "string" && MATERIAL_MAP[l.fabricId] ? l.fabricId : "fabric_cotton";
        a.push({
          outfitId: l.outfitId,
          fabricId: c,
          desc: typeof l.desc == "string" ? l.desc : "",
        });
      }
      return a;
    })(),
    healthRecords: (() => {
      const s = Array.isArray(n.healthRecords) ? n.healthRecords : [],
        a = [],
        o = (l) =>
          typeof l == "string" && ["sunny", "cloudy", "rain", "storm", "snow"].includes(l)
            ? l
            : "sunny";
      for (const l of s) {
        if (typeof l != "object" || l === null) continue;
        const c = l,
          u = typeof c.day == "number" && c.day >= 1 ? Math.floor(c.day) : 1;
        a.push({
          id: typeof c.id == "string" ? c.id : `hr_${u}_${a.length}`,
          day: u,
          hour: typeof c.hour == "number" ? Math.min(23, Math.max(0, Math.floor(c.hour))) : 8,
          weather: o(c.weather),
          doctor: typeof c.doctor == "string" ? c.doctor : "当日值班医生",
          diagnosis: typeof c.diagnosis == "string" ? c.diagnosis : "疲劳过度",
          treatment: typeof c.treatment == "string" ? c.treatment : "静养建议",
          cost: typeof c.cost == "number" && c.cost >= 0 ? Math.floor(c.cost) : 0,
          healthBefore:
            typeof c.healthBefore == "number"
              ? Math.min(100, Math.max(0, Math.floor(c.healthBefore)))
              : 0,
          healthAfter:
            typeof c.healthAfter == "number"
              ? Math.min(100, Math.max(0, Math.floor(c.healthAfter)))
              : 0,
          createdAt: typeof c.createdAt == "number" ? c.createdAt : Date.now(),
        });
      }
      return a;
    })(),
    seenIngredients: (() => {
      const s = new Set(Object.keys(MATERIAL_BASE_COST));
      for (const o of Object.keys(sanitizeIngredients(e.ingredients))) s.add(o);
      const a = Array.isArray(n.seenIngredients) ? n.seenIngredients : [];
      for (const o of a) typeof o == "string" && INGREDIENT_MAP[o] && s.add(o);
      return [...s];
    })(),
    fishRecords: (() => {
      const s = safeParseJson(
          typeof n.fishRecords == "string" ? n.fishRecords : JSON.stringify(n.fishRecords ?? {}),
          {},
        ),
        a = {};
      for (const [o, l] of Object.entries(s))
        INGREDIENT_MAP[o] &&
          typeof l == "number" &&
          !Number.isNaN(l) &&
          (a[o] = Math.min(50, Math.max(1, Math.floor(l))));
      return a;
    })(),
    shrimpCatchCount: (() => {
      const s = safeParseJson(
          typeof n.shrimpCatchCount == "string"
            ? n.shrimpCatchCount
            : JSON.stringify(n.shrimpCatchCount ?? {}),
          {},
        ),
        a = {};
      for (const [o, l] of Object.entries(s))
        INGREDIENT_MAP[o] && typeof l == "number" && !Number.isNaN(l) && l > 0 && (a[o] = Math.floor(l));
      return a;
    })(),
    vehicles: (Array.isArray(n.vehicles) ? n.vehicles : []).filter(
      (a) => typeof a == "string" && VEHICLES.some((o) => o.id === a),
    ),
    encounteredToday: (Array.isArray(n.encounteredToday) ? n.encounteredToday : []).filter(
      (a) => typeof a == "string" && !!NPC_RUNTIME_DATA[a],
    ),
    todayEvents: (Array.isArray(n.todayEvents) ? n.todayEvents : []).filter(
      (a) => typeof a == "string",
    ),
    birthdayCelebrated: (Array.isArray(n.birthdayCelebrated) ? n.birthdayCelebrated : []).filter(
      (a) => typeof a == "string",
    ),
  };
}

async function querySaveMeta(e) {
  try {
    const n = await runSql({
      sql: "select player_name, shop_name, coins, day, season, energy, ingredients, products, recipes, affection, shelves, visits, explores, chatted_today, dated_today, stats, achievements, claimed_milestones, home, orders, mood, daily_taste, health, hour, sport_skill, exercised_today, negotiation, outfits, employees, shop_placements, cook_skill, met_npcs, fishing_rod, caught_today, fished_today, created_at, updated_at from player_saves where id = ? limit 1",
      binds: [e],
    });
    if (!n.success) throw new Error(n.message || "query failed");
    const s = n.data[0];
    if (!s) return null;
    const a = sanitizeProducts(s.products),
      o = sanitizePriceMultipliers(s.shelves),
      l = stackProducts(a, o),
      c = l.shelves.filter((j) => {
        var w;
        const v = l.products.find((N) => N.pid === j.pid);
        return v
          ? (((w = RECIPE_RUNTIME_DATA[v.recipeId]) == null ? void 0 : w.system) ?? "bakery") !== "cuisine"
          : !1;
      }),
      u = sanitizeHomeObject(s.home),
      f = sanitizeHome(s.home),
      g = sanitizeSeenList(s.shop_placements, f.furniture),
      { home: x, placements: m } = mergeShopPlacements(f, g),
      { outfits: p, hairstyle: y } = sanitizeWardrobe(s.outfits);
    return {
      ...hydrateStateCore(s, u),
      ingredients: sanitizeIngredients(s.ingredients),
      products: l.products,
      recipes: sanitizeRecipeProgress(s.recipes),
      affection: sanitizeAffection(s.affection),
      shelves: c,
      stats: sanitizeCounters(s.stats),
      achievements: sanitizeCounterMap(
        s.achievements,
        ALL_ACHIEVEMENTS.map((j) => j.id),
      ),
      milestones: sanitizeFlagMap(
        s.claimed_milestones,
        MILESTONES.map((j) => j.id),
      ),
      home: (x.jarQty ?? (x.jarQty = 100), x),
      psych: (() => {
        const p = u && u.psych;
        return p && typeof p == "object" ? p : void 0;
      })(),
      orders: sanitizeCraftQueue(s.orders),
      dailyTaste: sanitizeThemeId(s.daily_taste),
      outfits: p,
      hairstyle: y,
      shopPlacements: m,
      cookSkill:
        typeof s.cook_skill == "number" && s.cook_skill >= 0
          ? Math.min(100, Math.floor(s.cook_skill))
          : 0,
      ...hydrateStateHome(u),
      ...hydrateStateExtra(s, u),
    };
  } catch {
    return null;
  }
}

function loadSaveMetaBySlot(e) {
  return querySaveMeta(slotKeyOf(e));
}

function loadCurrentSaveMeta() {
  return loadSaveMetaBySlot(getCurrentSlot());
}

function buildSaveMetaRow(e) {
  const n = Date.now();
  return {
    player_name: e.playerName,
    shop_name: e.shopName,
    coins: e.coins,
    day: e.day,
    season: e.season,
    energy: e.energy,
    ingredients: JSON.stringify(e.ingredients),
    products: JSON.stringify(e.products),
    recipes: JSON.stringify(e.recipes),
    affection: JSON.stringify(e.affection),
    shelves: JSON.stringify(e.shelves),
    visits: e.visits,
    explores: e.explores,
    chatted_today: JSON.stringify(e.chattedToday),
    dated_today: JSON.stringify(e.datedToday),
    stats: JSON.stringify(e.stats),
    achievements: JSON.stringify(e.achievements),
    claimed_milestones: JSON.stringify(e.milestones),
    home: JSON.stringify({
      ...e.home,
      psych: typeof e.psych == "object" && e.psych ? e.psych : null,
      chatHourKey: e.chatHourKey ?? "",
      chatCountsThisHour: e.chatCountsThisHour ?? {},
      hygiene: e.hygiene ?? 100,
      combedToday: e.combedToday === !0,
      satiety: e.satiety ?? 70,
      /* 死亡机制：hungryDays / ateToday / dead 在运行时 state 里是顶层字段，
         读档却由 hydrateStateHome 从 home 子对象恢复。因此存档时必须一并写进
         home JSON，否则读档归零、连续未进食计数丢失，死亡机制在「存档-继续」
         流程下会失效。采用日计数器，不依赖绝对 day，老存档缺字段按 0/false 兜底。 */
      hungryDays:
        typeof e.hungryDays == "number" && Number.isFinite(e.hungryDays) && e.hungryDays >= 0
          ? Math.floor(e.hungryDays)
          : 0,
      ateToday: e.ateToday === !0,
      dead: e.dead === !0,
      /* 死亡系统死因："starve"（饿死）/ "psych"（心境离世），老存档缺字段按饿死兜底。 */
      deathCause: e.deathCause === "psych" ? "psych" : "starve",
      bakeSkill: e.bakeSkill ?? 0,
      customRecipes: Array.isArray(e.customRecipes) ? e.customRecipes : [],
      cookwares: e.cookwares ?? ["cw_oven"],
      cookwareSkill: e.cookwareSkill ?? {},
      shelterFriendliness: e.shelterFriendliness ?? 0,
      shelterDonatedToday: e.shelterDonatedToday ?? 0,
      shelterEventsToday: e.shelterEventsToday ?? 0,
      gender: e.gender ?? "female",
      age: e.age ?? 25,
      sewingSkill: e.sewingSkill ?? 0,
      sewingTools: e.sewingTools ?? ["sew_basic"],
      sewnClothes: e.sewnClothes ?? [],
      cashRegister: e.cashRegister ?? 0,
      healthRecords: Array.isArray(e.healthRecords) ? e.healthRecords : [],
      seenIngredients: Array.isArray(e.seenIngredients) ? e.seenIngredients : [],
      fishRecords: e.fishRecords ?? {},
      shrimpCatchCount: e.shrimpCatchCount ?? {},
      fishBaitType: ["worm", "premium", "spring", "summer", "autumn", "winter", "night"].includes(
        e.fishBaitType,
      )
        ? e.fishBaitType
        : "loach",
      fishTank: Array.isArray(e.fishTank) ? e.fishTank : [],
      fishOrderCooldown:
        typeof e.fishOrderCooldown == "number" && e.fishOrderCooldown >= 0
          ? Math.floor(e.fishOrderCooldown)
          : 0,
      vehicles: Array.isArray(e.vehicles) ? e.vehicles : [],
      bankSavings: typeof e.bankSavings == "number" ? e.bankSavings : 0,
      flowerBouquets:
        typeof e.flowerBouquets == "number" && e.flowerBouquets >= 0
          ? Math.floor(e.flowerBouquets)
          : 0,
      encounteredToday: Array.isArray(e.encounteredToday) ? e.encounteredToday : [],
      charityApplied: e.charityApplied === !0,
      charitySoldToday: typeof e.charitySoldToday == "number" ? e.charitySoldToday : 0,
      commercialBoostDays: typeof e.commercialBoostDays == "number" ? e.commercialBoostDays : 0,
      foodStreetInvest:
        typeof e.foodStreetInvest == "number" && e.foodStreetInvest >= 0
          ? Math.min(100, Math.floor(e.foodStreetInvest))
          : 0,
      nightMarketPermit: e.nightMarketPermit === !0,
      nightMarketPermitMonth:
        typeof e.nightMarketPermitMonth == "string" ? e.nightMarketPermitMonth : "",
      nightMarketTruck: e.nightMarketTruck === !0,
      truckFeePaidMonth: typeof e.truckFeePaidMonth == "string" ? e.truckFeePaidMonth : "",
      fishFeed: typeof e.fishFeed == "number" && e.fishFeed >= 0 ? Math.floor(e.fishFeed) : 0,
      aquariumFish: e.aquariumFish === !0,
      aquariumHealth:
        typeof e.aquariumHealth == "number"
          ? Math.min(100, Math.max(0, Math.floor(e.aquariumHealth)))
          : 0,
      aquariumCleanliness:
        typeof e.aquariumCleanliness == "number"
          ? Math.min(100, Math.max(0, Math.floor(e.aquariumCleanliness)))
          : 100,
      aquariumDirty: e.aquariumDirty === !0,
      aquariumDirtyDay:
        typeof e.aquariumDirtyDay == "number" && e.aquariumDirtyDay >= 0
          ? Math.floor(e.aquariumDirtyDay)
          : 0,
      aquariumLastFeedDay:
        typeof e.aquariumLastFeedDay == "number" && e.aquariumLastFeedDay >= 0
          ? Math.floor(e.aquariumLastFeedDay)
          : 0,
      aquariumDecor: Array.isArray(e.aquariumDecor) ? e.aquariumDecor : [],
      seeds: e.seeds ?? {},
      fertilizer:
        typeof e.fertilizer == "number" && e.fertilizer >= 0 ? Math.floor(e.fertilizer) : 0,
      plants: Array.isArray(e.plants) ? e.plants : [],
      homeFlowers:
        typeof e.homeFlowers == "number" && e.homeFlowers >= 0 ? Math.floor(e.homeFlowers) : 0,
      homeFlowerDecor:
        typeof e.homeFlowerDecor == "number" && e.homeFlowerDecor >= 0
          ? Math.floor(e.homeFlowerDecor)
          : 0,
      homeBonsai:
        typeof e.homeBonsai == "number" && e.homeBonsai >= 0 ? Math.floor(e.homeBonsai) : 0,
      plazaFlowerSoldToday:
        typeof e.plazaFlowerSoldToday == "number" && e.plazaFlowerSoldToday >= 0
          ? Math.floor(e.plazaFlowerSoldToday)
          : 0,
      flowerShopPitchToday:
        typeof e.flowerShopPitchToday == "number" && e.flowerShopPitchToday >= 0
          ? Math.floor(e.flowerShopPitchToday)
          : 0,
      riverGatheredToday:
        typeof e.riverGatheredToday == "number" && e.riverGatheredToday >= 0
          ? Math.floor(e.riverGatheredToday)
          : 0,
      collectionsPlaced: Array.isArray(e.collectionsPlaced) ? e.collectionsPlaced : [],
      festivalSouvenirs: Array.isArray(e.festivalSouvenirs) ? e.festivalSouvenirs : [],
      stargazingSeen: Array.isArray(e.stargazingSeen) ? e.stargazingSeen : [],
      stargazedToday: e.stargazedToday === !0,
      todayEvents: Array.isArray(e.todayEvents) ? e.todayEvents : [],
      birthdayCelebrated: Array.isArray(e.birthdayCelebrated) ? e.birthdayCelebrated : [],
      fontScale: ["small", "mediumSmall", "medium", "large", "xlarge"].includes(e.fontScale)
        ? e.fontScale
        : "mediumSmall",
      hasBag: e.hasBag === !0,
      hasFoodBox: e.hasFoodBox === !0,
      hasFishBucket: e.hasFishBucket === !0,
      carried: Array.isArray(e.carried) ? e.carried : [],
      pendingOrders: Array.isArray(e.pendingOrders) ? e.pendingOrders : [],
      govTickets: Array.isArray(e.govTickets) ? e.govTickets : [],
      deliveredHistory: Array.isArray(e.deliveredHistory) ? e.deliveredHistory : [],
      shopUpgradeLevel:
        typeof e.shopUpgradeLevel == "number" && e.shopUpgradeLevel >= 1
          ? Math.min(10, Math.floor(e.shopUpgradeLevel))
          : 1,
      coffeeUsedDay:
        typeof e.coffeeUsedDay == "number" && e.coffeeUsedDay >= 1
          ? Math.floor(e.coffeeUsedDay)
          : 0,
      floorLights: (() => {
        const a = e.floorLights,
          o = {};
        for (const l of ["1f", "2f", "3f", "roof"])
          o[l] = typeof a == "object" && a !== null && typeof a[l] == "boolean" ? a[l] : !0;
        return o;
      })(),
    }),
    orders: JSON.stringify(e.orders),
    mood: e.mood,
    daily_taste: e.dailyTaste,
    health: e.health,
    hour: e.hour,
    sport_skill: e.sportSkill,
    exercised_today: e.exercisedToday,
    negotiation: e.negotiation,
    outfits: JSON.stringify({
      ...e.outfits,
      hairstyle: e.hairstyle ?? { owned: [], equipped: DEFAULT_HAIRSTYLE },
    }),
    employees: JSON.stringify(e.employees),
    shop_placements: JSON.stringify(e.shopPlacements),
    cook_skill: e.cookSkill ?? 0,
    met_npcs: JSON.stringify(e.metNpcs ?? []),
    fishing_rod: e.fishingRod ? 1 : 0,
    caught_today: e.caughtToday ?? 0,
    fished_today: e.fishedToday ?? 0,
    created_at: e.createdAt,
    updated_at: n,
  };
}
