function TopBarStatusPanel({
  tab: e,
  game: n,
  commit: s,
  goTab: a,
  homeFocus: o,
  onSave: l,
  onRestart: c,
  currentSlot: u,
  onSwitchSlot: f,
  onLoadSlot: g,
  showToast: x,
  townOpenReq: m,
  onSleepOvernight: sleepOvernightAction,
}) {
  return (
    React.useEffect(() => observeThemeChanges((y) => broadcastTheme(y)), []),
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx(PanelFrame, {
          frameId: "home",
          active: e === "home",
          children: jsxRuntime.jsx(HomePanel, {
            state: n,
            commit: s,
            onGoTab: a,
            homeFocus: o,
            onSleepOvernight: sleepOvernightAction,
          }),
        }),
        jsxRuntime.jsx(PanelFrame, {
          frameId: "market",
          active: e === "market",
          children: jsxRuntime.jsx(IngredientMarketPanel, { state: n, commit: s }),
        }),
        jsxRuntime.jsx(PanelFrame, {
          frameId: "town",
          active: e === "town",
          children: jsxRuntime.jsx(TownPanelRoot, { state: n, commit: s, onGoTab: (p, y) => a(p, y), openReq: m }),
        }),
        // 【C2 清理】通讯已全量并入手机 App：底部「手机」标签与语音「打开通讯录」
        // 都走 gn()→fa() 直接开手机，永不把 tab 切到 "fate"，故下面这个 PanelFrame
        // 永远 active=false、连 iframe 都不会创建。保留它仅为不动 6 帧渲染骨架，
        // 占位内容已精简为极简节点，孤儿文件 pages/fate/index.html 已删除。
        jsxRuntime.jsx(PanelFrame, {
          frameId: "fate",
          active: e === "fate",
          children: jsxRuntime.jsx("div", {}),
        }),
        jsxRuntime.jsx(PanelFrame, {
          frameId: "profile",
          active: e === "profile",
          children: jsxRuntime.jsx(ProfilePage, { state: n, commit: s }),
        }),
        jsxRuntime.jsx(PanelFrame, {
          frameId: "achieve",
          active: e === "achieve",
          children: jsxRuntime.jsx(AchievementPanel, {
            state: n,
            commit: s,
            onSave: l,
            onRestart: c,
            currentSlot: u,
            onSwitchSlot: f,
            onLoadSlot: g,
            showToast: x,
          }),
        }),
      ],
    })
  );
}

function StatusBadge({ testId: e, emoji: n, value: s, bg: a, color: o, danger: u, hint: d }) {
  /* 状态归零时给危险态：红色描边 + 呼吸感底色，并在 title 里指明去哪补，
     让「长期游玩后四个胶囊长期显示 0」不再是毫无反馈的死数字。 */
  return jsxRuntime.jsxs("span", {
    "data-testid": e,
    "data-tm-danger": u ? "1" : void 0,
    title: d || void 0,
    className: "rounded-full px-2.5 py-1 text-sm font-black",
    style: {
      background: a,
      color: o,
      whiteSpace: "nowrap",
      textAlign: "center",
      display: "block",
      border: u ? "2px solid #e53935" : void 0,
      boxShadow: u ? "0 0 0 2px #ffcdd2" : void 0,
    },
    children: [
      jsxRuntime.jsx("span", { className: "emoji", children: n }),
      " ",
      jsxRuntime.jsx("span", { className: "num", children: s }),
    ],
  });
}

function TopBarStatBadges({ game: e, mood: n, health: s, satiety: a }) {
  return jsxRuntime.jsxs("div", {
    className: "tm-stat-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(86px, 1fr))",
      gap: "5px",
      width: "100%",
    },
    children: [
      jsxRuntime.jsx(StatusBadge, { emoji: "💰", value: e.coins, bg: "#fff3bf", color: "#7a5500" }),
      jsxRuntime.jsx(StatusBadge, { emoji: "⚡", value: e.energy, bg: "#e8f5e9", color: "#2e7d32" }),
      jsxRuntime.jsx(StatusBadge, {
        testId: "mood-chip",
        emoji: n.emoji,
        value: e.mood,
        bg: "#ffe9ef",
        color: "#e04a63",
        danger: e.mood <= 20,
        hint: "心情偏低，去店里逛逛或找熟客聊聊",
      }),
      jsxRuntime.jsx(StatusBadge, {
        testId: "health-chip",
        emoji: s.emoji,
        value: e.health,
        bg: "#e8e0f7",
        color: "#c62828",
        danger: e.health <= 20,
        hint: "健康告急，去 2F 卧室一觉睡到明早可恢复",
      }),
      jsxRuntime.jsx(StatusBadge, {
        testId: "hygiene-chip",
        emoji: "🫧",
        value: e.hygiene ?? 100,
        bg: "#fce4ec",
        color: "#d81b60",
        danger: (e.hygiene ?? 100) <= 20,
        hint: "该洗漱了，去 2F 浴室清洁一下",
      }),
      jsxRuntime.jsx(StatusBadge, {
        testId: "satiety-chip",
        emoji: a.emoji,
        value: e.satiety ?? 70,
        bg: "#ffedd5",
        color: "#c2410c",
        danger: (e.satiety ?? 70) <= 20,
        hint: "饿着肚子，去 1F 厨房做点吃的",
      }),
      jsxRuntime.jsx(StatusBadge, {
        testId: "charm-chip",
        emoji: "✨",
        value: calcCharm(e),
        bg: "#fdf3ff",
        color: "#c62828",
      }),
      jsxRuntime.jsx(StatusBadge, {
        testId: "reputation-chip",
        emoji: "🏅",
        value: calcReputation(e),
        bg: "#fff3bf",
        color: "#7a5500",
      }),
    ],
  });
}

function DayWeatherChip({ game: e }) {
  const n = weekdayOf(e.day),
    s = weatherOfDay(e.day),
    a = WEATHER_TYPES[s],
    o = seasonIndexOf(e.day),
    l = SEASON_NAME_TABLE[Object.keys(SEASON_NAME_TABLE)[o]],
    c = solarTermRangeOf(e.day),
    u = currentSolarTerm(e.day);
  return jsxRuntime.jsxs("div", {
    className: "flex flex-wrap items-center gap-1.5",
    children: [
      jsxRuntime.jsxs("span", {
        className: "rounded-full bg-[#e0f7fa] px-2 py-0.5 text-[11px] font-black text-[#00695c]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: a.emoji }), " ", a.label],
      }),
      jsxRuntime.jsxs("span", {
        className: "rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[11px] font-black text-[#c62828]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: WEATHER_ICONS[n] }),
          " ",
          WEEKDAY_NAMES[n],
          isWeekendDay(e.day) ? "·周末" : "",
        ],
      }),
      jsxRuntime.jsxs("span", {
        className: "rounded-full bg-[#f3e3cb] px-2 py-0.5 text-[11px] font-black text-[#6b4226]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: SEASON_EMOJI[l] }),
          " ",
          l,
          "第 ",
          jsxRuntime.jsx("span", { className: "num", children: c }),
          " 天 · ",
          jsxRuntime.jsx("span", { className: "emoji", children: u.emoji }),
          " ",
          u.name,
        ],
      }),
      jsxRuntime.jsxs("span", {
        className:
          "rounded-full border-2 border-[#ffc53d] bg-[#fff8e1] px-2 py-0.5 text-[11px] font-black text-[#7a5500]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "📅" }), " ", formatSolarDate(e.day)],
      }),
      jsxRuntime.jsxs("span", {
        className:
          "rounded-full border-2 border-[#ce93d8] bg-[#fdf3ff] px-2 py-0.5 text-[11px] font-black text-[#c62828]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🌙" }), " ", formatLunarDate(e.day)],
      }),
      jsxRuntime.jsxs("span", {
        className: "rounded-full bg-[#ede7f6] px-2 py-0.5 text-[11px] font-black text-[#c62828]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🕐" }), " ", formatHour(e.hour)],
      }),
    ],
  });
}

function MuteToggleButton({ light: e = !1 }) {
  const [n, s] = React.useState(() => isAudioMuted());
  return jsxRuntime.jsxs("button", {
    type: "button",
    "data-testid": "btn-bgm-toggle",
    "aria-pressed": !n,
    onClick: () => {
      const o = toggleAudioMuted();
      s(o);
      speak(o ? "背景音乐已关闭" : "背景音乐已开启");
    },
    className: "btn-chunky btn-xs shrink-0",
    style: e
      ? { background: "#fff3bf", borderColor: "#b8860b", color: "#6d4c00" }
      : { background: "#fde8e8", borderColor: "#efb3b3", color: "#a94442" },
    children: [
      jsxRuntime.jsx("span", {
        className: "material-icons",
        style: { fontSize: 14 },
        "aria-hidden": "true",
        children: n ? "music_off" : "music_note",
      }),
      " ",
      n ? "音乐关" : "音乐开",
    ],
  });
}

function TopBarToolRow({
  game: e,
  tab: n,
  blindMode: s,
  night: a,
  hasEmployee: o,
  onVoice: l,
  onFont: c,
  onNight: u,
  onEmployeeSell: f,
  onNextDay: g,
  onHandbook: h,
  onSettings: b,
}) {
  return jsxRuntime.jsxs("div", {
    className: "flex flex-wrap items-center gap-1.5",
    children: [
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-handbook",
        onClick: () => {
          (h == null || h(), vibrateShort());
        },
        className: "btn-chunky btn-xs shrink-0",
        style: { background: "#e8f5e9", borderColor: "#81c784", color: "#1b5e20" },
        children: [
          jsxRuntime.jsx("span", {
            className: "material-icons",
            style: { fontSize: 14 },
            "aria-hidden": "true",
            children: "menu_book",
          }),
          " 手册",
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-settings",
        onClick: () => {
          (b == null || b(), vibrateShort());
        },
        className: "btn-chunky btn-xs shrink-0",
        style: { background: "#eceff1", borderColor: "#b0bec5", color: "#37474f" },
        children: [
          jsxRuntime.jsx("span", {
            className: "material-icons",
            style: { fontSize: 14 },
            "aria-hidden": "true",
            children: "settings",
          }),
          " 设置",
        ],
      }),
      s &&
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-blind-help",
          onClick: () => {
            (vibrateShort(), announce(BLIND_GUIDE_TEXT));
          },
          className: "btn-chunky btn-xs shrink-0",
          style: { background: "#fff3bf", borderColor: "#b8860b", color: "#6d4c00" },
          children: [
            jsxRuntime.jsx("span", {
              className: "material-icons",
              style: { fontSize: 14 },
              "aria-hidden": "true",
              children: "accessibility_new",
            }),
            " 盲人帮助",
          ],
        }),
      jsxRuntime.jsx(MuteToggleButton, {}),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-voice-settings",
        onClick: l,
        className: "btn-chunky btn-xs shrink-0",
        style: { background: "#f3e5f5", borderColor: "#ce93d8", color: "#6a1b9a" },
        children: [
          jsxRuntime.jsx("span", {
            className: "material-icons",
            style: { fontSize: 14 },
            "aria-hidden": "true",
            children: "record_voice_over",
          }),
          " 语音",
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-font-settings",
        onClick: c,
        className: "btn-chunky btn-xs shrink-0",
        style: { background: "#fff8e1", borderColor: "#ffc53d", color: "#7a5500" },
        children: [
          jsxRuntime.jsx("span", {
            className: "material-icons",
            style: { fontSize: 14 },
            "aria-hidden": "true",
            children: "text_fields",
          }),
          " 字体",
        ],
      }),
      jsxRuntime.jsx("button", {
        type: "button",
        "data-testid": "btn-night-toggle",
        "aria-pressed": a,
        onClick: () => {
          (u(), speak(a ? "已切换到白天模式" : "已切换到夜间模式"));
        },
        className: "btn-chunky btn-xs shrink-0",
        style: a
          ? { background: "#4a2c2e", borderColor: "#a98d74", color: "#ecd9c8" }
          : { background: "#f3e3cb", borderColor: "#d9b98c", color: "#c62828" },
        children: a ? "☀️ 白天" : "🌙 夜间",
      }),
      o &&
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-employee-sell",
          onClick: f,
          disabled: e.visits <= 0 || e.shelves.length === 0,
          className: "btn-chunky btn-sm btn-green shrink-0",
          children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧑‍🍳" }), " 员工营业"],
        }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-next-day",
        onClick: g,
        title: "跳过今天（不睡觉，健康会下降）；想睡觉请到 2F 卧室「一觉睡到明早」",
        className: "btn-chunky btn-sm btn-brown shrink-0",
        children: [
          jsxRuntime.jsx("span", {
            className: "material-icons",
            style: { fontSize: 14 },
            "aria-hidden": "true",
            children: "fast_forward",
          }),
          " 跳过今天",
        ],
      }),
    ],
  });
}

const TOPBAR_COLLAPSE_STATUS_KEY = "tm_topbar_collapse_status",
  TOPBAR_COLLAPSE_TOOLS_KEY = "tm_topbar_collapse_tools";

function readFlagPref(e) {
  try {
    return window.localStorage.getItem(e) === "1";
  } catch {
    return !1;
  }
}

function writeFlagPref(e, n) {
  try {
    window.localStorage.setItem(e, n ? "1" : "0");
  } catch {}
}

function TopBar({
  game: e,
  tab: n,
  blindMode: s,
  night: a,
  saving: o,
  hasEmployee: l,
  onVoice: c,
  onFont: u,
  onNight: f,
  onEmployeeSell: g,
  onNextDay: x,
  onHandbook: n2,
  onSettings: n3,
}) {
  const m = moodTier(e.mood),
    p = healthTier(e.health),
    y = satietyTier(e.satiety ?? 70),
    [j, v] = React.useState(() => readFlagPref(TOPBAR_COLLAPSE_STATUS_KEY)),
    [w, N] = React.useState(() => readFlagPref(TOPBAR_COLLAPSE_TOOLS_KEY)),
    S = () => {
      const V = !j;
      (v(V),
        writeFlagPref(TOPBAR_COLLAPSE_STATUS_KEY, V),
        speak(`「状态栏」已${V ? "收起" : "展开"}${V ? "，只显示一行摘要" : "，显示店名与资源徽章"}`));
    },
    C = () => {
      const V = !w;
      (N(V),
        writeFlagPref(TOPBAR_COLLAPSE_TOOLS_KEY, V),
        speak(
          `「时间与功能」已${V ? "收起" : "展开"}${V ? "，只显示一行摘要" : "，显示天气日期与功能按钮"}`,
        ));
    };
  return jsxRuntime.jsxs("div", {
    className: "top-bar px-4 pb-2 pt-3",
    children: [
      j
        ? jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-topbar-status-toggle",
            "aria-expanded": !1,
            onClick: S,
            className:
              "flex w-full items-center gap-1.5 rounded-lg bg-white/20 px-2 py-1 text-left active:scale-[0.99]",
            children: [
              jsxRuntime.jsxs("span", {
                className: "min-w-0 flex-1 truncate text-[13px] font-black text-[#fff3e2]",
                /* v31：这里原本拼的是裸 emoji「💰9959 ⚡76 😄90 💪100」，
                   缺彩色字体的机器上会被降级脚本换成 ◆ 并挤爆 320 窄屏，
                   截断后只剩「◆ 9…」。改写成中文标签，任何字体都读得懂。 */
                children: [
                  e.shopName,
                  " · 店主 ",
                  e.playerName,
                  " · 金币 ",
                  e.coins,
                  " · 精力 ",
                  e.energy,
                ],
              }),
              jsxRuntime.jsx("span", {
                className: "material-icons shrink-0 text-base text-[#ffd9a0]",
                "aria-hidden": "true",
                children: "expand_more",
              }),
            ],
          })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsxs("div", {
                className: "flex items-center justify-between",
                style: { gap: "8px" },
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "min-w-0 flex-1 truncate",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "text-[13px] font-black text-[#fff3e2]",
                        children: e.shopName,
                      }),
                      jsxRuntime.jsx("span", {
                        className: "text-[11px] font-bold text-[#ffd9a0]",
                        children: [" · 店主 ", e.playerName],
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-topbar-status-toggle",
                    "aria-expanded": !0,
                    "aria-label": "收起状态栏",
                    onClick: S,
                    className:
                      "flex shrink-0 items-center rounded-full bg-white/20 px-1 py-1 active:scale-95",
                    children: jsxRuntime.jsx("span", {
                      className: "material-icons text-base text-[#ffd9a0]",
                      "aria-hidden": "true",
                      children: "expand_less",
                    }),
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                style: { marginTop: "6px" },
                children: jsxRuntime.jsx(TopBarStatBadges, {
                  game: e, mood: m, health: p, satiety: y,
                }),
              }),
            ],
          }),
      w
        ? jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-topbar-tools-toggle",
            "aria-expanded": !1,
            onClick: C,
            className:
              "mt-2 flex w-full items-center gap-1.5 rounded-lg bg-white/20 px-2 py-1 text-left active:scale-[0.99]",
            children: [
              jsxRuntime.jsxs("span", {
                className: "min-w-0 flex-1 truncate text-[13px] font-black text-[#fff3e2]",
                /* v31：裸「📅」在缺字体环境会被换成 ◆，窄屏截断后只剩「◆2026年…」 */
                children: [formatSolarDate(e.day), " · 第 ", e.day, " 天 · 时间与功能已收起"],
              }),
              jsxRuntime.jsx("span", {
                className: "material-icons shrink-0 text-base text-[#ffd9a0]",
                "aria-hidden": "true",
                children: "expand_more",
              }),
            ],
          })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsx("div", { className: "mt-2", children: jsxRuntime.jsx(DayWeatherChip, { game: e }) }),
              jsxRuntime.jsx("div", {
                className: "mt-2",
                children: jsxRuntime.jsx(TopBarToolRow, {
                  game: e,
                  tab: n,
                  blindMode: s,
                  night: a,
                  hasEmployee: l,
                  onVoice: c,
                  onFont: u,
                  onNight: f,
                  onEmployeeSell: g,
                  onNextDay: x,
                  onHandbook: n2,
                  onSettings: n3,
                }),
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-topbar-tools-toggle",
                "aria-expanded": !0,
                "aria-label": "收起时间与功能",
                onClick: C,
                /* v31：这里原来是一个 144px 宽的空灰胶囊，里面只有一个小箭头，
                   玩家看不出它是按钮（10 天实玩里被误认为加载条）。补上「收起」二字。 */
                className:
                  "mx-auto mt-1.5 flex items-center justify-center gap-0.5 rounded-full bg-white/20 px-3 py-0.5 active:scale-95",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "font-black leading-none",
                    style: { fontSize: "calc(9px * var(--fs))", color: "#ffe3bd" },
                    children: "收起",
                  }),
                  jsxRuntime.jsx("span", {
                    className: "material-icons text-sm text-[#ffd9a0]",
                    "aria-hidden": "true",
                    children: "expand_less",
                  }),
                ],
              }),
            ],
          }),
      o &&
        jsxRuntime.jsx("p", {
          className: "mt-1 text-right text-[10px] font-bold text-[#ffd9a0]",
          children: "存档中…",
        }),
    ],
  });
}

const TAB_BAR_ITEMS = [
  { id: "home", label: "小楼", icon: "cottage" },
  { id: "market", label: "订购", icon: "local_shipping" },
  { id: "fate", label: "手机", icon: "phone_iphone" },
  { id: "profile", label: "档案", icon: "badge" },
  { id: "achieve", label: "成就", icon: "emoji_events" },
];

function TabBar({
  tab: e,
  pendingCount: n,
  onGo: s,
  onPhoneApp: a,
  onPhone: o,
  onTown: l,
  onCarry: c,
  carriedLabel: u,
  arriving: f,
}) {
  return e === "town"
    ? jsxRuntime.jsxs("nav", {
        className: "tab-bar",
        "data-testid": "tab-bar-town",
        role: "tablist",
        "aria-label": "小镇底部操作栏",
        children: [
          jsxRuntime.jsxs("div", {
            role: "tab",
            "aria-selected": "true",
            tabIndex: 0,
            className: "tab-item active",
            onClick: () => (l == null ? void 0 : l()),
            onKeyDown: (g) => {
              (g.key === "Enter" || g.key === " ") && (g.preventDefault(), l == null || l());
            },
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                "aria-hidden": "true",
                children: "map",
              }),
              jsxRuntime.jsx("span", { children: "小镇" }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            role: "tab",
            "aria-selected": "false",
            tabIndex: 0,
            className: "tab-item",
            onClick: () => (o == null ? void 0 : o()),
            onKeyDown: (g) => {
              (g.key === "Enter" || g.key === " ") && (g.preventDefault(), o == null || o());
            },
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                "aria-hidden": "true",
                children: "smartphone",
              }),
              jsxRuntime.jsx("span", { children: "手机" }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            role: "tab",
            "aria-selected": "false",
            "data-testid": "tab-town-carry",
            tabIndex: 0,
            className: "tab-item",
            "aria-label": `随身携带：${u ?? "0/2"}`,
            onClick: () => (c == null ? void 0 : c()),
            onKeyDown: (g) => {
              (g.key === "Enter" || g.key === " ") && (g.preventDefault(), c == null || c());
            },
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                "aria-hidden": "true",
                children: "backpack",
              }),
              jsxRuntime.jsx("span", { children: u ?? "徒手 0/2" }),
              (f ?? 0) > 0 &&
                jsxRuntime.jsx("span", {
                  "data-testid": "tab-town-arriving-badge",
                  "aria-label": `${f} 件订购货品待配送`,
                  className:
                    "absolute right-0 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[10px] font-black text-white",
                  children: f,
                }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            role: "tab",
            "aria-selected": "false",
            tabIndex: 0,
            className: "tab-item",
            onClick: () => s("home"),
            onKeyDown: (g) => {
              (g.key === "Enter" || g.key === " ") && (g.preventDefault(), s("home"));
            },
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                "aria-hidden": "true",
                children: "cottage",
              }),
              jsxRuntime.jsx("span", { children: "回小楼" }),
            ],
          }),
        ],
      })
    : jsxRuntime.jsx("nav", {
        className: "tab-bar",
        "data-testid": "tab-bar",
        role: "tablist",
        "aria-label": "页面导航",
        children: TAB_BAR_ITEMS.map((g) =>
          jsxRuntime.jsxs(
            "div",
            {
              "data-testid": `tab-${g.id}`,
              role: "tab",
              "aria-selected": e === g.id,
              "aria-label": g.label,
              tabIndex: 0,
              className: `tab-item ${e === g.id ? "active" : ""}`,
              onClick: () => {
                if (g.id === "fate") {
                  a == null || a();
                  return;
                }
                s(g.id);
              },
              onKeyDown: (x) => {
                if (x.key === "Enter" || x.key === " ") {
                  if ((x.preventDefault(), g.id === "fate")) {
                    a == null || a();
                    return;
                  }
                  s(g.id);
                }
              },
              children: [
                jsxRuntime.jsx("span", {
                  className: "material-icons",
                  "aria-hidden": "true",
                  children: g.icon,
                }),
                jsxRuntime.jsx("span", { children: g.label }),
                g.id === "achieve" &&
                  n > 0 &&
                  jsxRuntime.jsx("span", {
                    "data-testid": "tab-achieve-badge",
                    "aria-label": `${n} 个新成就`,
                    className:
                      "absolute right-0 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[10px] font-black text-white",
                    children: n,
                  }),
              ],
            },
            g.id,
          ),
        ),
      });
}

const PHONE_TABS = [
    {
      id: "chat",
      name: "通讯",
      emoji: "📞",
      desc: "聊天 · 电话邀约",
      testId: "btn-phone-app-chat",
    },
    { id: "shop", name: "购物", emoji: "🛒", desc: "订购 · 待送达", testId: "btn-phone-app-shop" },
    { id: "web", name: "上网", emoji: "🌐", desc: "食谱 · 秘诀", testId: "btn-phone-app-web" },
    { id: "time", name: "时间", emoji: "🕐", desc: "日历 · 节气", testId: "btn-phone-app-time" },
    { id: "memo", name: "备忘录", emoji: "📒", desc: "生日 · 档案", testId: "btn-phone-app-memo" },
    { id: "gov", name: "在线政务", emoji: "🏛️", desc: "义卖 · 改名", testId: "btn-phone-app-gov" },
    { id: "map", name: "手机地图", emoji: "🗺️", desc: "小镇地图", testId: "btn-phone-app-map" },
    {
      id: "goal",
      name: "人生目标",
      emoji: "🎯",
      desc: "成就 · 奖励",
      testId: "btn-phone-app-goal",
    },
    {
      id: "delivery",
      name: "外卖",
      emoji: "🛵",
      desc: "订外卖 · 接单",
      testId: "btn-phone-app-delivery",
    },
  ],
  ROSTER_AREA_ORDER = ["居民区", "别墅区", "动物收容所", "学校"],
  ROSTER_RESIDENCE_ORDER = ["梧桐里小区", "安康苑小区", "文苑小区", "苏记老宅", "听澜别墅", "学生宿舍"];

function buildRosterEntries(e) {
  return NPC_ALL.filter((n) => (e.metNpcs ?? []).includes(n.id)).map((n) => ({
    npc: n,
    residence: NPC_RESIDENCE[n.id],
  }));
}

function filterRosterEntries(e, n, s) {
  const { areaSel: a, genderSel: o, ageSel: l } = s;
  return e.filter(({ npc: c, residence: u }) => {
    const f = (u == null ? void 0 : u.area) ?? "其他";
    if (a.length > 0 && !a.includes(f)) return !1;
    const g = NPC_GENDERS[c.id] ?? "其他";
    if (o.length > 0 && !o.includes(g)) return !1;
    const x = npcAgeGroup(c.id, n.day);
    return !(l.length > 0 && !l.includes(x));
  });
}

function groupRosterByArea(e) {
  var s, a;
  const n = new Map();
  for (const o of e) {
    const l = ((s = o.residence) == null ? void 0 : s.area) ?? "其他",
      c = ((a = o.residence) == null ? void 0 : a.detail) ?? "其他";
    n.has(l) || n.set(l, new Map());
    const u = n.get(l);
    (u.has(c) || u.set(c, []), u.get(c).push(o));
  }
  return n;
}

function sortByOrder(e, n) {
  return [...e].sort((s, a) => {
    const o = n.indexOf(s[0]),
      l = n.indexOf(a[0]);
    return (o === -1 ? 99 : o) - (l === -1 ? 99 : l);
  });
}

function ModalTextDialog({ dialogue: e, onClose: n }) {
  const s = ((e == null ? void 0 : e.text) ?? "").split(/\n+/).filter(Boolean);
  return jsxRuntime.jsxs(Modal, {
    open: e !== null,
    title: (e == null ? void 0 : e.title) ?? "",
    onClose: n,
    noUnderline: !0,
    wide: !0,
    children: [
      jsxRuntime.jsx("div", {
        className: "dialogue-card rounded-2xl bg-[#ffb74d] p-4",
        children:
          s.length > 1
            ? jsxRuntime.jsx("div", {
                className: "space-y-2.5",
                children: s.map((a, o) =>
                  jsxRuntime.jsx(
                    "p",
                    {
                      className:
                        "break-words whitespace-pre-wrap text-center text-lg font-bold leading-relaxed text-black",
                      children: segmentByEmoji(a),
                    },
                    o,
                  ),
                ),
              })
            : jsxRuntime.jsx("p", {
                className:
                  "break-words whitespace-pre-wrap text-center text-lg font-bold leading-relaxed text-black",
                children: segmentByEmoji((e == null ? void 0 : e.text) ?? ""),
              }),
      }),
      jsxRuntime.jsxs("div", {
        className: "mt-4 flex justify-center gap-3",
        children: [
          jsxRuntime.jsx(SpeakButton, { text: (e == null ? void 0 : e.text) ?? "", testId: "btn-dialogue-speak" }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-dialogue-close",
            onClick: n,
            className: "btn-chunky btn-pink",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "✖" }), " 关闭"],
          }),
        ],
      }),
    ],
  });
}

const AREA_EMOJI = { 居民区: "🏘️", 别墅区: "🏰", 学校: "🏫", 动物收容所: "🐶", 其他: "📍" };

function PhonePage({ ctx: e }) {
  const { state: n, commit: s } = e,
    [a, o] = React.useState(null),
    [l, c] = React.useState([]),
    [u, f] = React.useState([]),
    [g, x] = React.useState([]),
    [m, p] = React.useState(!0),
    [y, j] = React.useState({}),
    [v, w] = React.useState({}),
    N = {
      areaSel: l,
      genderSel: u,
      ageSel: g,
      setAreaSel: c,
      setGenderSel: f,
      setAgeSel: x,
      toggleSel: toggleItem,
    },
    S = buildRosterEntries(n),
    C = filterRosterEntries(S, n, { areaSel: l, genderSel: u, ageSel: g }),
    V = sortByOrder([...groupRosterByArea(C).entries()], ROSTER_AREA_ORDER),
    E = (H) => {
      const R = chatWithNpc(n, H);
      if (!R.ok) {
        s(R.state, R.message, "error");
        return;
      }
      const se = NPC_RUNTIME_DATA[H],
        be = R.affectionGain ?? ((n.hygiene ?? 100) < 40 ? 1 : 3);
      (o({
        title: R.firstMeet ? `✨ 初见 · ${(se == null ? void 0 : se.name) ?? ""}` : "💬 聊天",
        text: R.line ?? R.message,
      }),
        s(R.state, R.firstMeet ? `初次相遇，好感度 +${be}` : `好感度 +${be}`, "success"));
    },
    F = (H) => {
      const R = dateNpc(n, H);
      if (!R.ok) {
        s(R.state, R.message, "error");
        return;
      }
      const se = NPC_RUNTIME_DATA[H];
      (o({ title: "🌙 约会", text: R.line ?? R.message }),
        s(R.state, `和${(se == null ? void 0 : se.name) ?? ""}的约会很愉快，好感度 +6`, "success"));
    },
    J = (H) => {
      const R = NPC_RUNTIME_DATA[H],
        se = n.affection[H] ?? 0,
        be = getAffectionTier(se),
        Ie = se >= 30;
      return jsxRuntime.jsxs(
        "div",
        {
          className: "rounded-xl border-2 border-[#90caf9] bg-[#f4faff] px-2 py-1.5",
          children: [
            jsxRuntime.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                jsxRuntime.jsx("span", { className: "emoji shrink-0 text-lg", children: R.emoji }),
                jsxRuntime.jsxs("p", {
                  className: "min-w-0 flex-1 text-[12px] font-black leading-tight text-[#4a2c17]",
                  children: [
                    R.name,
                    jsxRuntime.jsx("span", {
                      className: "ml-1 text-[9px] font-bold text-[#b08a6a]",
                      children: R.title,
                    }),
                  ],
                }),
                jsxRuntime.jsxs("span", {
                  className: "shrink-0 text-[9px] font-bold text-[#0d47a1]",
                  children: [be.emoji, " ", be.label, "（", se, "）"],
                }),
              ],
            }),
            jsxRuntime.jsxs("div", {
              className: "mt-1 flex gap-1.5",
              children: [
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": `btn-phone-chat-${H}`,
                  onClick: () => E(H),
                  className: "btn-chunky btn-xs btn-blue flex-1",
                  children: "💬 聊天",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": `btn-phone-date-${H}`,
                  onClick: () => F(H),
                  disabled: !Ie,
                  className: "btn-chunky btn-xs btn-pink flex-1 disabled:opacity-40",
                  children: "📅 邀约",
                }),
              ],
            }),
          ],
        },
        H,
      );
    };
  return jsxRuntime.jsxs("div", {
    className: "phone-app-bg space-y-2 rounded-2xl p-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#e3f2fd] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#0d47a1]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "📞" }),
          " 只有在地图上见过面的伙伴才会出现在通讯录；聊天每日可多次（每小时每个伙伴最多 3 次），好感度 30+ 可电话邀约出门/约会。",
        ],
      }),
      S.length === 0
        ? jsxRuntime.jsxs("div", {
            className:
              "rounded-xl border-2 border-dashed border-[#90caf9] bg-[#f7fbff] p-4 text-center",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-3xl",
                children: jsxRuntime.jsx("span", { className: "emoji", children: "📵" }),
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 font-black text-[#4a2c17]",
                children: "通讯录还是空的",
              }),
              jsxRuntime.jsx("p", {
                className: "mt-0.5 text-[11px] font-bold text-[#b08a6a]",
                children: "去小镇的地图上逛逛，遇见伙伴打过招呼后，TA 就会出现在这里",
              }),
            ],
          })
        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsxs("div", {
                className: "overflow-hidden rounded-2xl border-2 border-[#90caf9] bg-[#eaf4ff]",
                children: [
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": "btn-chat-filter-toggle",
                    "aria-expanded": m,
                    onClick: () => p((H) => !H),
                    className:
                      "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
                    children: [
                      jsxRuntime.jsx("span", {
                        "aria-hidden": "true",
                        className: `shrink-0 text-sm font-black text-[#0d47a1] transition-transform duration-200 ${m ? "" : "-rotate-90"}`,
                        children: "▾",
                      }),
                      jsxRuntime.jsxs("span", {
                        className: "min-w-0 flex-1 text-[11px] font-black text-[#0d47a1]",
                        children: [
                          "📌 筛选 ",
                          jsxRuntime.jsx("span", {
                            className: "font-bold text-[#4a7fbf]",
                            children: "（居住地 · 性别 · 年龄段）",
                          }),
                        ],
                      }),
                      jsxRuntime.jsxs("span", {
                        className:
                          "shrink-0 rounded-full bg-[#cfe6ff] px-2 py-0.5 text-[9px] font-black text-[#0d47a1]",
                        children: [C.length, "/", S.length, " 人"],
                      }),
                    ],
                  }),
                  m &&
                    jsxRuntime.jsx("div", {
                      className: "border-t-2 border-[#d3e6fb] p-2",
                      children: jsxRuntime.jsx(NpcFilterBar, { ...buildNpcFilterProps(N), prefix: "chat" }),
                    }),
                ],
              }),
              C.length === 0
                ? jsxRuntime.jsxs("div", {
                    className:
                      "rounded-xl border-2 border-dashed border-[#90caf9] bg-[#f7fbff] p-4 text-center",
                    children: [
                      jsxRuntime.jsx("p", {
                        className: "text-3xl",
                        children: jsxRuntime.jsx("span", { className: "emoji", children: "🔍" }),
                      }),
                      jsxRuntime.jsx("p", {
                        className: "mt-1 font-black text-[#4a2c17]",
                        children: "没有符合条件的伙伴",
                      }),
                      jsxRuntime.jsx("p", {
                        className: "mt-0.5 text-[11px] font-bold text-[#b08a6a]",
                        children: "换个居住地、性别或年龄段试试，或点「全部」清除筛选。",
                      }),
                    ],
                  })
                : jsxRuntime.jsx("div", {
                    className: "space-y-2",
                    children: V.map(([H, R]) => {
                      const se = [...R.values()].reduce((xe, ye) => xe + ye.length, 0),
                        be = y[H] ?? !0,
                        Ie = sortByOrder([...R.entries()], ROSTER_RESIDENCE_ORDER);
                      return jsxRuntime.jsxs(
                        "div",
                        {
                          className:
                            "overflow-hidden rounded-2xl border-2 border-[#90caf9] bg-[#f4faff]",
                          children: [
                            jsxRuntime.jsxs("button", {
                              type: "button",
                              "data-testid": `chat-area-${H}`,
                              "aria-expanded": be,
                              onClick: () => j((xe) => ({ ...xe, [H]: !(xe[H] ?? !0) })),
                              className:
                                "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
                              children: [
                                jsxRuntime.jsx("span", {
                                  className: "text-base leading-none",
                                  children: jsxRuntime.jsx("span", {
                                    className: "emoji",
                                    children: AREA_EMOJI[H] ?? "📍",
                                  }),
                                }),
                                jsxRuntime.jsxs("span", {
                                  className: "min-w-0 flex-1",
                                  children: [
                                    jsxRuntime.jsx("span", {
                                      className: "block text-xs font-black text-[#4a2c17]",
                                      children: H,
                                    }),
                                    jsxRuntime.jsxs("span", {
                                      className:
                                        "block truncate text-[9px] font-bold text-[#b08a6a]",
                                      children: [se, " 位伙伴"],
                                    }),
                                  ],
                                }),
                                jsxRuntime.jsx("span", {
                                  "aria-hidden": "true",
                                  className: `shrink-0 text-sm font-black text-[#b08a6a] transition-transform duration-200 ${be ? "" : "-rotate-90"}`,
                                  children: "▾",
                                }),
                              ],
                            }),
                            be &&
                              jsxRuntime.jsx("div", {
                                className: "space-y-1.5 px-2 pb-2",
                                children: Ie.map(([xe, ye]) => {
                                  const P = v[xe] ?? !0;
                                  return jsxRuntime.jsxs(
                                    "div",
                                    {
                                      className:
                                        "overflow-hidden rounded-xl border-2 border-[#cfe3f8] bg-white/70",
                                      children: [
                                        jsxRuntime.jsxs("button", {
                                          type: "button",
                                          "data-testid": `chat-detail-${xe}`,
                                          "aria-expanded": P,
                                          onClick: () =>
                                            w((ne) => ({ ...ne, [xe]: !(ne[xe] ?? !0) })),
                                          className:
                                            "flex w-full items-center gap-2 px-2 py-1.5 text-left active:scale-[0.99]",
                                          children: [
                                            jsxRuntime.jsx("span", {
                                              className: "text-sm leading-none",
                                              children: jsxRuntime.jsx("span", {
                                                className: "emoji",
                                                children: "🏠",
                                              }),
                                            }),
                                            jsxRuntime.jsx("span", {
                                              className:
                                                "min-w-0 flex-1 truncate text-[11px] font-black text-[#6b4226]",
                                              children: xe,
                                            }),
                                            jsxRuntime.jsxs("span", {
                                              className:
                                                "shrink-0 rounded-full bg-[#e3f2fd] px-1.5 py-px text-[9px] font-black text-[#0d47a1]",
                                              children: [ye.length, " 人"],
                                            }),
                                            jsxRuntime.jsx("span", {
                                              "aria-hidden": "true",
                                              className: `shrink-0 text-xs font-black text-[#b08a6a] transition-transform duration-200 ${P ? "" : "-rotate-90"}`,
                                              children: "▾",
                                            }),
                                          ],
                                        }),
                                        P &&
                                          jsxRuntime.jsx("div", {
                                            className: "space-y-1.5 p-1.5",
                                            children: ye.map((ne) => J(ne.npc.id)),
                                          }),
                                      ],
                                    },
                                    xe,
                                  );
                                }),
                              }),
                          ],
                        },
                        H,
                      );
                    }),
                  }),
            ],
          }),
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#a08030]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 电话邀约 = 约 TA 出门约会，好感度达到 30 才打得通；未成年人不能约会哦。",
        ],
      }),
      jsxRuntime.jsx(ModalTextDialog, { dialogue: a, onClose: () => o(null) }),
    ],
  });
}

const FLOWER_GIFT_PRICE = 30;

function NameRosterPage({ ctx: e }) {
  const { state: n, commit: s } = e,
    [a, o] = React.useState([]),
    [l, c] = React.useState(!1),
    u = (y) => {
      o((j) => {
        const v = j.find((w) => w.kind === y.kind && w.refId === y.refId);
        return v ? j.map((w) => (w === v ? { ...w, qty: w.qty + 1 } : w)) : [...j, y];
      });
    },
    f = () => {
      const y = checkoutCart(n, a);
      (s(y.state, y.message, y.ok ? "success" : "error"), y.ok && o([]));
    },
    g = a.reduce((y, j) => y + j.qty, 0),
    x = a.reduce((y, j) => y + j.unitPrice * j.qty, 0),
    m = INGREDIENTS_LIST.filter((y) => !y.source),
    p = (n.pendingOrders ?? []).reduce((y, j) => y + j.entries.reduce((v, w) => v + w.qty, 0), 0);
  return jsxRuntime.jsxs("div", {
    className: "phone-app-bg space-y-2 rounded-2xl p-2",
    children: [
      jsxRuntime.jsxs("p", {
        className:
          "rounded-xl bg-[#e8f5e9] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#2e7d32]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🛒" }),
          " 线上订购与镇内结算同一套规则：能装进随身携带的当场带走，其余订购配送——满 5 件免配送费，1-4 件每件 ¥2，次日 8:00 送到店里。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-[#a5d6a7] bg-[#f4fbf1] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#2e7d32]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛍️" }), " 线上订购"],
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-1.5 grid grid-cols-2 gap-1.5",
            children: [
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-phone-shop-add-flower",
                onClick: () =>
                  u({ kind: "flower", refId: "bouquet", name: "花束", unitPrice: FLOWER_GIFT_PRICE, qty: 1 }),
                className: "btn-chunky btn-xs btn-pink flex flex-col items-center px-1 py-1.5",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji text-base", children: "💐" }),
                  jsxRuntime.jsxs("span", { className: "text-[10px] font-black", children: ["花束 ¥", FLOWER_GIFT_PRICE] }),
                  jsxRuntime.jsx("span", {
                    className: "text-[8px] font-bold text-[#a08030]",
                    children: "礼物 · 可直接装身上",
                  }),
                ],
              }),
              jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-phone-shop-add-rod",
                onClick: () =>
                  u({ kind: "tool", refId: "fishing_rod", name: "鱼竿", unitPrice: FISHING_ROD_PRICE, qty: 1 }),
                disabled: n.fishingRod,
                className:
                  "btn-chunky btn-xs btn-yellow flex flex-col items-center px-1 py-1.5 disabled:opacity-50",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji text-base", children: "🎣" }),
                  jsxRuntime.jsx("span", {
                    className: "text-[10px] font-black",
                    children: n.fishingRod ? "已拥有鱼竿 ✓" : `鱼竿 ¥${FISHING_ROD_PRICE}`,
                  }),
                  jsxRuntime.jsx("span", {
                    className: "text-[8px] font-bold text-[#a08030]",
                    children: "订购 · 次日送到",
                  }),
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-phone-shop-toggle-food",
            onClick: () => c((y) => !y),
            className:
              "mt-1.5 w-full rounded-lg bg-[#dcedc8] px-2 py-1 text-left text-[11px] font-black text-[#33691e]",
            children: l ? "▾ 收起食材清单" : `▸ 展开食材清单（${m.length} 种）`,
          }),
          l &&
            jsxRuntime.jsx("div", {
              className: "mt-1.5 grid grid-cols-2 gap-1.5",
              children: m.map((y) =>
                jsxRuntime.jsxs(
                  "div",
                  {
                    className: "flex gap-1 rounded-lg bg-white px-1.5 py-1",
                    children: [
                      jsxRuntime.jsx("div", {
                        className: "flex w-[20%] shrink-0 items-center justify-center",
                        children: jsxRuntime.jsx("span", { className: "emoji text-sm", children: y.emoji }),
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("p", {
                                className: "text-[10px] font-black text-[#4a2c17]",
                                children: y.name,
                              }),
                              jsxRuntime.jsxs("p", {
                                className: "text-[8px] font-bold text-[#b08a6a]",
                                children: [
                                  INGREDIENT_CATEGORY_LABELS[y.category] ?? y.category,
                                  " · ¥",
                                  Math.ceil(y.price * 1.2),
                                ],
                              }),
                            ],
                          }),
                          jsxRuntime.jsx("div", {
                            className: "mt-1 flex flex-wrap items-center gap-1",
                            children: jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": `btn-phone-shop-add-${y.id}`,
                              onClick: () =>
                                u({
                                  kind: "ingredient",
                                  refId: y.id,
                                  name: y.name,
                                  unitPrice: Math.ceil(y.price * 1.2),
                                  qty: 1,
                                }),
                              className: "btn-chunky btn-xs btn-green",
                              children: "+",
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  y.id,
                ),
              ),
            }),
          g > 0 &&
            jsxRuntime.jsx("div", {
              className: "mt-2 rounded-xl border-2 border-[#ff8a65] bg-[#fff3e0] p-2",
              children: jsxRuntime.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "min-w-0 flex-1 text-[11px] font-black text-[#bf360c]",
                    children: [
                      "🧾 购物篮 ",
                      g,
                      " 件 · ¥",
                      x,
                      jsxRuntime.jsx("span", {
                        className: "block text-[9px] font-bold text-[#a08030]",
                        children: "5 件以上免配送费（1-4 件 ¥2/件，次日 8:00 送达）",
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-phone-shop-checkout",
                    onClick: f,
                    className: "btn-chunky btn-sm btn-brown shrink-0",
                    children: "🧾 结算",
                  }),
                ],
              }),
            }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-dashed border-[#b39ddb] bg-[#f3edf9] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#4a148c]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "📦" }),
              " 待送达",
              p > 0 ? `（${p} 件）` : "",
            ],
          }),
          (n.pendingOrders ?? []).length === 0
            ? jsxRuntime.jsx("p", {
                className: "mt-1 text-[10px] font-bold text-[#7b1fa2]",
                children: "没有在途订单，线上订购后第二天 8:00 送到店里",
              })
            : jsxRuntime.jsx("div", {
                className: "mt-1.5 space-y-1",
                children: (n.pendingOrders ?? []).map((y) =>
                  jsxRuntime.jsxs(
                    "p",
                    {
                      className: "text-[10px] font-bold text-[#6a1b9a]",
                      children: [
                        y.entries.map((j) => `${j.name}×${j.qty}`).join("、"),
                        "（¥",
                        y.goodsCost + y.fee,
                        "，第 ",
                        y.arriveDay,
                        " 天送达）",
                      ],
                    },
                    y.id,
                  ),
                ),
              }),
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "rounded-xl border-2 border-dashed border-[#ffcc80] bg-[#fffaf3] p-2",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-xs font-black text-[#6b4226]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗂️" }), " 已送达历史"],
          }),
          (n.deliveredHistory ?? []).length === 0
            ? jsxRuntime.jsx("p", {
                className: "mt-1 text-[10px] font-bold text-[#b08a6a]",
                children: "还没有送达记录，订过货之后会记在这里",
              })
            : jsxRuntime.jsx("div", {
                className: "mt-1.5 space-y-1",
                children: (n.deliveredHistory ?? [])
                  .slice(-10)
                  .reverse()
                  .map((y) =>
                    jsxRuntime.jsxs(
                      "p",
                      {
                        className: "text-[10px] font-bold text-[#8d6e63]",
                        children: ["第 ", y.day, " 天 · ", y.summary, "（¥", y.cost, "）"],
                      },
                      y.id,
                    ),
                  ),
              }),
        ],
      }),
    ],
  });
}
