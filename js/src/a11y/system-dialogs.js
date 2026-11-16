// js/src/a11y/system-dialogs.js
// 玩家侧系统面板：委托/通知手册、统一设置中心、库存总览、新手引导浮层。
// 顶层 function 声明，处于与 Modal / deepClone 相同的共享作用域，供 phone-app-shell 顶层渲染直接引用。

// ============ A1：委托 / 通知手册（玩家可见）============
// 玩家只在这里看到「委托」（接到的任务）与「通知」（系统发生的事件）；主线系统本身对玩家隐藏。
function HandbookDialog({ open: e, state: n, commit: s, onClose: a, onOpenGuide: g, onOpenInventory: v }) {
  const t = (n && n.handbook) || { commissions: [], notifications: [] };
  const commissions = Array.isArray(t.commissions) ? t.commissions : [];
  const notifications = Array.isArray(t.notifications) ? t.notifications : [];
  const activeCount = commissions.filter((c) => c.status !== "done").length;
  const report = (id, title) => {
    const next = deepClone(n);
    if (window.Cake && window.Cake.mainStoryApi) window.Cake.mainStoryApi.reportCommission(next, id);
    s(next, `已汇报委托：${title}`, "success");
  };
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "📖 我的手册",
      onClose: a,
      sheetClass: "modal-sheet",
      children: jsxRuntime.jsxs("div", {
        className: "space-y-4",
        "data-testid": "handbook-modal",
        children: [
          jsxRuntime.jsxs("p", {
            className:
              "rounded-xl border-2 border-[#ffc53d] bg-[#fff8e1] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: "📖" }),
              " 这里记着你接到的委托和镇上捎来的消息。事情办妥了，就回来点「汇报完成」，往后会有新的事等着你。",
            ],
          }),
          // 手册内快捷入口：新手引导 / 库存总览
          jsxRuntime.jsxs("div", {
            className: "flex flex-wrap gap-1.5",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-handbook-guide",
                onClick: () => g && g(),
                className: "btn-chunky btn-xs btn-blue shrink-0",
                children: "📘 新手引导",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-handbook-inventory",
                onClick: () => v && v(),
                className: "btn-chunky btn-xs btn-green shrink-0",
                children: "📦 库存总览",
              }),
            ],
          }),
          // 委托
          jsxRuntime.jsxs("section", {
            children: [
              jsxRuntime.jsxs("h3", {
                className: "mb-1.5 flex items-center gap-1 text-xs font-black text-[#4a2c17]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "📝" }),
                  " 委托",
                  activeCount > 0
                    ? jsxRuntime.jsx("span", {
                        className: "rounded-full bg-[#ff7043] px-1.5 text-[9px] font-black text-white",
                        children: activeCount,
                      })
                    : null,
                ],
              }),
              commissions.length === 0
                ? jsxRuntime.jsx("p", {
                    className: "rounded-xl bg-[#f0f0f0] px-2.5 py-2 text-[10px] text-[#999]",
                    children: "暂无委托。",
                  })
                : jsxRuntime.jsx(
                    "div",
                    {
                      className: "space-y-1.5",
                      children: commissions.map((c) =>
                        jsxRuntime.jsxs(
                          "div",
                          {
                            "data-testid": `commission-${c.id}`,
                            className: `rounded-xl border-2 px-2.5 py-2 ${
                              c.status === "done"
                                ? "border-[#c8e6c9] bg-[#f1f8e9] opacity-70"
                                : "border-[#ffd8a8] bg-[#fff4e6]"
                            }`,
                            children: [
                              jsxRuntime.jsxs("div", {
                                className: "flex items-center justify-between gap-2",
                                children: [
                                  jsxRuntime.jsxs("p", {
                                    className: "text-[11px] font-black text-[#4a2c17]",
                                    children: [
                                      jsxRuntime.jsx("span", { className: "emoji", children: c.emoji || "📌" }),
                                      " ",
                                      c.title,
                                    ],
                                  }),
                                  c.status === "done"
                                    ? jsxRuntime.jsx("span", {
                                        className: "text-[9px] font-black text-[#2e7d32]",
                                        children: "✓ 已汇报",
                                      })
                                    : null,
                                ],
                              }),
                              jsxRuntime.jsx("p", {
                                className: "mt-0.5 text-[10px] leading-relaxed text-[#6b4a2f]",
                                children: c.text,
                              }),
                              c.status !== "done"
                                ? jsxRuntime.jsx(
                                    "button",
                                    {
                                      type: "button",
                                      "data-testid": `report-commission-${c.id}`,
                                      onClick: () => report(c.id, c.title),
                                      className: "btn-chunky btn-yellow btn-xs mt-1.5 shrink-0",
                                      children: "汇报完成",
                                    },
                                  )
                                : null,
                            ],
                          },
                          c.id,
                        ),
                      ),
                    },
                  ),
            ],
          }),
          // 通知
          jsxRuntime.jsxs("section", {
            children: [
              jsxRuntime.jsxs("h3", {
                className: "mb-1.5 flex items-center gap-1 text-xs font-black text-[#4a2c17]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🔔" }),
                  " 通知",
                  notifications.length > 1
                    ? jsxRuntime.jsx("span", {
                        className: "ml-auto text-[9px] font-bold text-[#b08a6a]",
                        children: "↓ 可下滑查看更多",
                      })
                    : null,
                ],
              }),
              notifications.length === 0
                ? jsxRuntime.jsx("p", {
                    className: "rounded-xl bg-[#f0f0f0] px-2.5 py-2 text-[10px] text-[#999]",
                    children: "暂无通知。",
                  })
                : jsxRuntime.jsx(
                    "div",
                    {
                      className: "space-y-1.5",
                      children: notifications.map((nt, i) =>
                        jsxRuntime.jsxs(
                          "div",
                          {
                            "data-testid": `notification-${i}`,
                            className: "rounded-xl border-2 border-[#e3f2fd] bg-[#f5faff] px-2.5 py-1.5",
                            children: [
                              jsxRuntime.jsxs("p", {
                                className: "text-[10px] leading-relaxed text-[#37474f]",
                                children: [
                                  jsxRuntime.jsx("span", { className: "emoji", children: nt.icon || "🔔" }),
                                  " ",
                                  nt.text,
                                ],
                              }),
                              nt.day
                                ? jsxRuntime.jsx("p", {
                                    className: "mt-0.5 text-[9px] text-[#90a4ae]",
                                    children: `第 ${nt.day} 天`,
                                  })
                                : null,
                            ],
                          },
                          i,
                        ),
                      ),
                    },
                  ),
            ],
          }),
        ],
      }),
    }),
  );
}

// ============ B1：统一设置中心 ============
// 把散落在顶栏/各面板的偏好收口到一处。就地开关复用顶层既有回调（不重复造持久化逻辑）。
function SettingsDialog({
  open: e,
  state: n,
  commit: s,
  onClose: a,
  night: nn,
  onNight: de,
  blindMode: blind,
  onBlindChange: setBlind,
  onFontDialog: openFont,
  onVoiceDialog: openVoice,
  onOpenGuide: openGuide,
  onOpenInventory: openInventory,
}) {
  const fontScales = [
    { id: "small", label: "小" },
    { id: "mediumSmall", label: "中" },
    { id: "medium", label: "中偏大" },
    { id: "large", label: "大" },
    { id: "xlarge", label: "特大" },
  ];
  const cur = (n && n.fontScale) || "mediumSmall";
  const setFont = (id, label) => {
    if (!n) return;
    s({ ...n, fontScale: id }, `字体大小已切换为「${label}」`, "info");
  };
  const card = "rounded-xl border-2 border-[#e8d9c5] bg-[#fffdf8] px-2.5 py-2";
  const head = "mb-1 text-[11px] font-black text-[#4a2c17]";
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "⚙️ 设置中心",
      onClose: a,
      sheetClass: "modal-sheet",
      children: jsxRuntime.jsxs("div", {
        className: "space-y-3",
        "data-testid": "settings-modal",
        children: [
          // 显示
          jsxRuntime.jsxs("div", {
            className: card,
            children: [
              jsxRuntime.jsx("p", { className: head, children: "🖥️ 显示" }),
              jsxRuntime.jsxs("div", {
                className: "flex flex-wrap gap-1.5",
                children: [
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-setting-night",
                    onClick: de,
                    className: "btn-chunky btn-xs btn-brown shrink-0",
                    children: nn ? "☀️ 切到白天" : "🌙 切到夜间",
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-setting-font",
                    onClick: () => openFont && openFont(),
                    className: "btn-chunky btn-xs btn-yellow shrink-0",
                    children: "🔤 字体大小（更多档位）",
                  }),
                ],
              }),
              jsxRuntime.jsxs("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-1",
                children: [
                  jsxRuntime.jsx("span", { className: "text-[10px] font-bold text-[#8a6a4a]", children: "快速选档：" }),
                  fontScales.map((f) =>
                    jsxRuntime.jsx("button", {
                      key: f.id,
                      type: "button",
                      "data-testid": `btn-font-${f.id}`,
                      onClick: () => setFont(f.id, f.label),
                      className: `btn-chunky btn-xs shrink-0 ${cur === f.id ? "btn-green" : "btn-gray"}`,
                      children: f.label,
                    }),
                  ),
                ],
              }),
              jsxRuntime.jsxs("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-1",
                children: [
                  jsxRuntime.jsx("span", {
                    className: "text-[10px] font-bold text-[#8a6a4a]",
                    children: "图标风格：",
                  }),
                  [
                    { id: "auto", label: "自动" },
                    { id: "emoji", label: "彩色表情" },
                    { id: "line", label: "线性图标" },
                  ].map((it) =>
                    jsxRuntime.jsx("button", {
                      key: it.id,
                      type: "button",
                      "data-testid": `btn-icon-style-${it.id}`,
                      onClick: () => {
                        if (window.__cakeSetIconStyle) window.__cakeSetIconStyle(it.id);
                        if (n && s) s({ ...n }, `图标风格已切换为「${it.label}」`, "info");
                      },
                      className: "btn-chunky btn-xs btn-gray shrink-0",
                      children: it.label,
                    }),
                  ),
                ],
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 text-[9px] leading-relaxed text-[#a0825e]",
                children: "浏览器缺少彩色表情字体时会自动改用线性图标，图标字体随游戏自带；也可在此手动指定。",
              }),
            ],
          }),
          // 声音
          jsxRuntime.jsxs("div", {
            className: card,
            children: [
              jsxRuntime.jsx("p", { className: head, children: "🔊 声音" }),
              jsxRuntime.jsxs("div", {
                className: "flex flex-wrap items-center gap-1.5",
                children: [
                  jsxRuntime.jsx(MuteToggleButton, {}),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-setting-voice",
                    onClick: () => openVoice && openVoice(),
                    className: "btn-chunky btn-xs btn-pink shrink-0",
                    children: "🎤 语音朗读与语音指令",
                  }),
                ],
              }),
            ],
          }),
          // 无障碍
          jsxRuntime.jsxs("div", {
            className: card,
            children: [
              jsxRuntime.jsx("p", { className: head, children: "🦯 无障碍" }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-setting-blind",
                onClick: () => setBlind && setBlind(!blind),
                className: "btn-chunky btn-xs btn-blue shrink-0",
                children: blind ? "🦯 关闭盲人模式" : "🦯 开启盲人模式",
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 text-[9px] leading-relaxed text-[#a0825e]",
                children: "盲人模式提供语音读屏、语音指令与快捷操作面板。",
              }),
            ],
          }),
          // 信息与入口
          jsxRuntime.jsxs("div", {
            className: card,
            children: [
              jsxRuntime.jsx("p", { className: head, children: "📚 帮助与信息" }),
              jsxRuntime.jsxs("div", {
                className: "flex flex-wrap gap-1.5",
                children: [
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-setting-guide",
                    onClick: () => openGuide && openGuide(),
                    className: "btn-chunky btn-xs btn-blue shrink-0",
                    children: "📘 新手引导",
                  }),
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-setting-inventory",
                    onClick: () => openInventory && openInventory(),
                    className: "btn-chunky btn-xs btn-green shrink-0",
                    children: "📦 库存总览",
                  }),
                ],
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 text-[9px] leading-relaxed text-[#a0825e]",
                children: "游戏会在每天跨天时自动存档到本地；可在「档案」页手动存档 / 读档 / 切换存档位。",
              }),
            ],
          }),
        ],
      }),
    }),
  );
}

// ============ C1：统一背包 / 库存总览 ============
// 把分散在储藏室、装修、书房、鱼缸等多处的库存聚合成一屏"我总共有什么"。
function InventoryOverviewDialog({ open: e, state: n, onClose: a }) {
  const s = n || {};
  const IMAP = typeof INGREDIENT_MAP !== "undefined" ? INGREDIENT_MAP : (window.Cake && window.Cake.INGREDIENT_MAP) || {};
  const ing = s.ingredients || {};
  const ingEntries = Object.entries(ing).filter(([, val]) => {
    const q = typeof val === "number" ? val : val && typeof val.qty === "number" ? val.qty : 0;
    return q > 0;
  });
  const ingTotal = ingEntries.reduce((acc, [, val]) => acc + (typeof val === "number" ? val : val.qty || 0), 0);
  const arrLen = (x) => (Array.isArray(x) ? x.length : 0);
  const objLen = (x) => (x && typeof x === "object" ? Object.keys(x).length : 0);
  const home = s.home || {};
  const cards = [
    { icon: "🧺", label: "食材种类", value: ingEntries.length, unit: "种" },
    { icon: "📦", label: "食材总件", value: ingTotal, unit: "件" },
    { icon: "🍰", label: "成品料理", value: arrLen(s.products), unit: "份" },
    { icon: "🪑", label: "家具", value: arrLen(home.furniture), unit: "件" },
    { icon: "🎒", label: "随身携带", value: arrLen(s.carried), unit: "件" },
    { icon: "🔍", label: "已发现食材", value: arrLen(s.seenIngredients), unit: "种" },
    { icon: "🌱", label: "种子", value: objLen(s.seeds), unit: "类" },
    { icon: "🐟", label: "鱼缸活鱼", value: arrLen(s.fishTank), unit: "条" },
    { icon: "🏅", label: "节日纪念", value: arrLen(s.festivalSouvenirs), unit: "件" },
    { icon: "⭐", label: "观星记录", value: arrLen(s.stargazingSeen), unit: "条" },
    { icon: "🧵", label: "缝制成衣", value: arrLen(s.sewnClothes), unit: "件" },
    { icon: "💰", label: "金币", value: s.coins || 0, unit: "枚" },
  ];
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "📦 库存总览",
      onClose: a,
      sheetClass: "modal-sheet",
      children: jsxRuntime.jsxs("div", {
        className: "space-y-3",
        "data-testid": "inventory-modal",
        children: [
          jsxRuntime.jsx("p", {
            className: "rounded-xl border-2 border-[#c8e6c9] bg-[#f1f8e9] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#2e7d32]",
            children: "一屏汇总你名下所有物资：食材、成品、家具、收藏与随身物品。",
          }),
          jsxRuntime.jsx("div", {
            className: "grid grid-cols-3 gap-1.5",
            children: cards.map((c) =>
              jsxRuntime.jsxs(
                "div",
                {
                  key: c.label,
                  className: "rounded-xl border-2 border-[#eee0cc] bg-[#fffdf8] px-1.5 py-1.5 text-center",
                  children: [
                    jsxRuntime.jsx("div", { className: "text-lg leading-none", children: c.icon }),
                    jsxRuntime.jsxs("div", {
                      className: "mt-0.5 text-sm font-black text-[#4a2c17]",
                      children: [c.value, jsxRuntime.jsx("span", { className: "ml-0.5 text-[9px] font-bold text-[#a0825e]", children: c.unit })],
                    }),
                    jsxRuntime.jsx("div", { className: "text-[9px] font-bold text-[#8a6a4a]", children: c.label }),
                  ],
                },
                c.label,
              ),
            ),
          }),
          // 食材明细
          jsxRuntime.jsxs("section", {
            children: [
              jsxRuntime.jsx("h3", { className: "mb-1 text-[11px] font-black text-[#4a2c17]", children: "🧺 食材明细" }),
              ingEntries.length === 0
                ? jsxRuntime.jsx("p", { className: "rounded-xl bg-[#f0f0f0] px-2.5 py-2 text-[10px] text-[#999]", children: "储藏室空空如也，去「订购」补货吧。" })
                : jsxRuntime.jsx("div", {
                    className: "flex flex-wrap gap-1",
                    children: ingEntries.map(([id, val]) => {
                      const q = typeof val === "number" ? val : val.qty || 0;
                      const meta = IMAP[id] || {};
                      return jsxRuntime.jsxs(
                        "span",
                        {
                          key: id,
                          className: "rounded-lg border-2 border-[#ffe0b2] bg-[#fff8e1] px-1.5 py-0.5 text-[10px] font-bold text-[#6b4a2f]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: meta.emoji || "🧺" }),
                            " ",
                            meta.name || id,
                            " ×",
                            q,
                          ],
                        },
                        id,
                      );
                    }),
                  }),
            ],
          }),
        ],
      }),
    }),
  );
}

// ============ B2：结构化新手引导（分步浮层）============
// 用分步卡片替代 save-load-speech.js 里那段超长语音说明；按需从手册/设置打开，不干扰开场流程。
function TutorialOverlay({ open: e, state: n, commit: s, onClose: a }) {
  // 引导步骤放在函数内（局部常量），避免与 city-events-sections.js 的同名顶层常量冲突。
  const GUIDE_STEPS = [
    { emoji: "🏠", title: "经营你的小楼", text: "在「小楼」里管理作息：吃饭、洗漱、梳妆、睡眠推进到第二天。留意精力、心情、健康三条状态。" },
    { emoji: "🛒", title: "订购与补给", text: "在「订购」买食材，或直接购入「材料补给包」一次凑齐一炉所需；外卖订单也会在这里送达。" },
    { emoji: "👩‍🍳", title: "烘焙与售卖", text: "进后厨按配方烤制蛋糕，把成品上架，顾客会来光顾；攒金币升级店面、添置家具。" },
    { emoji: "🏘️", title: "小镇与社交", text: "去「小镇」逛街，和 58 位镇民聊天、送礼、约会，参与 13 个节日；还有钓鱼、种植、观星等玩法。" },
    { emoji: "📖", title: "手册与委托", text: "打开「手册」查看接到的委托与各类通知；事情办妥了就点「汇报完成」，镇上会有新的事等着你。" },
    { emoji: "⚙️", title: "设置与帮助", text: "「设置」里可切换夜间模式、字体、语音与无障碍；新手引导随时可回看。游戏会自动存档。" },
  ];
  const [step, setStep] = React.useState(0);
  const total = GUIDE_STEPS.length;
  const idx = ((step % total) + total) % total;
  const cur = GUIDE_STEPS[idx];
  const done = () => {
    setStep(0);
    a && a();
  };
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "📘 新手引导",
      onClose: done,
      sheetClass: "modal-sheet",
      children: jsxRuntime.jsxs("div", {
        className: "space-y-3",
        "data-testid": "tutorial-modal",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-center text-[10px] font-black text-[#a0825e]",
            children: ["第 ", idx + 1, " / ", total, " 步"],
          }),
          jsxRuntime.jsxs("div", {
            className: "rounded-2xl border-2 border-[#ffd8a8] bg-[#fff4e6] px-3 py-4 text-center",
            children: [
              jsxRuntime.jsx("div", { className: "text-4xl leading-none", children: cur.emoji }),
              jsxRuntime.jsx("h3", { className: "mt-2 text-sm font-black text-[#4a2c17]", children: cur.title }),
              jsxRuntime.jsx("p", { className: "mt-1.5 text-[11px] leading-relaxed text-[#6b4a2f]", children: cur.text }),
            ],
          }),
          jsxRuntime.jsxs("div", {
            className: "flex items-center justify-between gap-2",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-tutorial-prev",
                onClick: () => setStep(idx - 1 < 0 ? total - 1 : idx - 1),
                className: "btn-chunky btn-xs btn-gray shrink-0",
                children: "← 上一步",
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-tutorial-next",
                onClick: () => (idx === total - 1 ? done() : setStep(idx + 1)),
                className: "btn-chunky btn-xs btn-green shrink-0",
                children: idx === total - 1 ? "完成 ✓" : "下一步 →",
              }),
            ],
          }),
          jsxRuntime.jsx("button", {
            type: "button",
            "data-testid": "btn-tutorial-close",
            onClick: done,
            className: "btn-chunky btn-xs btn-brown w-full",
            children: "跳过引导",
          }),
        ],
      }),
    }),
  );
}

// ============ 死亡系统 · 死亡弹窗（连续一周未进食）============
// 真死：不可原地复活，唯一的即时出路是「读档」回到死亡前的存活存档。
// 「重新开店」是冷静期选项——玩家在弹窗停留超过 6 秒才浮现，避免误触把整局丢掉。
// 由主屏根据 state.dead 常驻渲染：点遮罩 / Esc 关不掉（推进入口在 dead 时已被拦截）。
function DeathDialog({ open: e, state: n, onLoad: l0, onRestart: a }) {
  const [restartReady, setRestartReady] = React.useState(!1);
  /* 每次弹窗从关闭→打开都重新开始 6 秒冷静期；读档/重开后 dead 变 false，弹窗关闭。 */
  React.useEffect(() => {
    if (!e) { setRestartReady(!1); return; }
    const timer = setTimeout(() => setRestartReady(!0), 6000);
    return () => clearTimeout(timer);
  }, [e]);
  if (!e) return null;
  /* 死亡系统：饿死与心境离世共用真死流程，仅死因文案不同。 */
  const byPsych = n && n.deathCause === "psych";
  const bodyText = byPsych
    ? "长久的心境煎熬终于压垮了你。这一天，你在抑郁与恍惚里没能醒来——这是真的离世，再没有「咬牙复活」这回事。"
    : "连续七天粒米未进，你终于没能撑住。这一次是真的饿死了——再没有「咬牙复活」这回事。";
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: byPsych ? "🕯️ 店主没能醒来" : "🕯️ 店主饿死了",
      onClose: () => {
        try { window.__cakeToast && window.__cakeToast("店主已经离世，请「读档」回到死亡前", "info"); } catch (err) {}
      },
      sheetClass: "modal-sheet",
      children: jsxRuntime.jsxs("div", {
        className: "space-y-3",
        "data-testid": "death-modal",
        "data-cause": byPsych ? "psych" : "starve",
        children: [
          jsxRuntime.jsx("p", {
            className: "rounded-xl border-2 border-[#e5484d] bg-[#fff0f0] p-3 text-center text-sm font-black leading-relaxed text-[#a02020]",
            children: bodyText,
          }),
          jsxRuntime.jsx("p", {
            className: "text-center text-xs font-bold leading-relaxed text-[#8a6a4a]",
            children: "「读档」可回到死亡前最近一次存档（跨天时自动保存）；若你想放弃这一局，再等一会儿会出现「重新开店」。",
          }),
          jsxRuntime.jsxs("div", {
            className: "mt-2 flex flex-col items-center gap-2",
            children: [
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": "btn-death-load",
                onClick: l0,
                className: "btn-chunky btn-green w-full",
                children: "📖 读档（回到死亡前）",
              }),
              restartReady
                ? jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-death-restart",
                    onClick: a,
                    className: "btn-chunky btn-pink w-full",
                    children: "重新开店（从头开始）",
                  })
                : jsxRuntime.jsx("p", {
                    "data-testid": "death-restart-hint",
                    className: "text-center text-[11px] text-[#b09a80]",
                    children: "冷静一下……想从头开始的话，选项稍后出现。",
                  }),
            ],
          }),
        ],
      }),
    }),
  );
}
