/*
 * 符号还原（推断性重命名，非原名）— 本文件顶层标识符已按函数体语义
 * 推断重命名以便阅读。变量名在压缩时已丢失，此处为基于用法的近似推断，
 * 不代表原始源码命名。局部参数与属性名未改动。
 * 安全替换 26 个，跳过(有遮蔽) 0 个，替换点 57 处，语法校验 通过。
 */
function renderAchievementItem({ state: e, achievement: n }) {
  const a = e.achievements[n.id] !== void 0,
    o = calcProgressPercent(n.progress(e)),
    l = CATEGORY_LABELS[n.category];
  return jsxRuntime.jsxs("div", {
    "data-testid": `achievement-${n.id}`,
    className: `game-card ${a ? "border-[#ffd54f]/80" : "opacity-90"}`,
    style: a ? { background: "linear-gradient(135deg,#fffdf5,#fff3bf22)" } : void 0,
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex items-center gap-3",
        children: [
          jsxRuntime.jsx("span", {
            className: `flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${a ? "bg-[#fff3bf]" : "bg-[#f3e3cb] grayscale"}`,
            children: a
              ? jsxRuntime.jsx("span", { className: "emoji", children: n.emoji })
              : jsxRuntime.jsx("span", { className: "emoji", children: "🔒" }),
          }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("p", {
                className: "font-black text-[#4a2c17]",
                children: [
                  n.name,
                  jsxRuntime.jsxs("span", {
                    className:
                      "ml-1.5 rounded-full bg-[#f3e3cb] px-1.5 py-px text-[10px] font-bold text-[#8a6a4a]",
                    children: [CATEGORY_ICONS[n.category], " ", l],
                  }),
                ],
              }),
              jsxRuntime.jsxs("p", {
                className: "mt-0.5 flex items-center gap-1 text-xs text-[#b08a6a]",
                children: [
                  jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: n.desc }),
                  jsxRuntime.jsx(SpeakButton, {
                    text: `${n.name}。${n.desc}`,
                    label: "",
                    ariaLabel: `朗读成就${n.name}`,
                    testId: `btn-achievement-speak-${n.id}`,
                    className: "btn-xs shrink-0",
                  }),
                ],
              }),
            ],
          }),
          a && jsxRuntime.jsx("span", { className: "emoji shrink-0 text-xl", children: "✨" }),
        ],
      }),
      !a &&
        jsxRuntime.jsxs("div", {
          className: "mt-2 flex items-center gap-2",
          children: [
            jsxRuntime.jsx("div", {
              className: "bar-track flex-1",
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": o,
              "aria-label": `${n.name}进度 ${n.progress(e).current}/${n.progress(e).target}`,
              children: jsxRuntime.jsx("div", {
                className: "bar-fill",
                style: { width: `${o}%`, background: "linear-gradient(90deg,#ffb3c1,#ff6b81)" },
              }),
            }),
            jsxRuntime.jsxs("span", {
              className: "num shrink-0 text-[11px] font-black text-[#b08a6a]",
              children: [n.progress(e).current, "/", n.progress(e).target],
            }),
          ],
        }),
    ],
  });
}

const ACHIEVEMENT_CATEGORIES = [
    { id: "all", label: "全部类别", emoji: "🏛️" },
    { id: "bake", label: "烘焙", emoji: "🍳" },
    { id: "shop", label: "经营", emoji: "🏪" },
    { id: "town", label: "小镇", emoji: "🏘️" },
    { id: "fate", label: "好感", emoji: "💕" },
  ],
  UNLOCK_FILTERS = [
    { id: "all", label: "全部状态", emoji: "🗂️" },
    { id: "unlocked", label: "已解锁", emoji: "✨" },
    { id: "locked", label: "未解锁", emoji: "🔒" },
  ];

function AchievementList({ state: e, filter: n, onFilter: s }) {
  const [a, o] = React.useState("all"),
    l = ALL_ACHIEVEMENTS.filter((u) => {
      if (n !== "all" && u.category !== n) return !1;
      const f = e.achievements[u.id] !== void 0;
      return !((a === "unlocked" && !f) || (a === "locked" && f));
    }),
    c = ALL_ACHIEVEMENTS.filter((u) => e.achievements[u.id] !== void 0).length;
  return renderWithSpeech(
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsx("div", {
          className: "flex flex-wrap gap-1.5",
          children: ACHIEVEMENT_CATEGORIES.map((u) =>
            jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                "data-testid": `btn-filter-${u.id}`,
                onClick: () => s(u.id),
                className: `rounded-full px-3 py-1.5 text-xs font-black ${n === u.id ? "bg-[#ff6b81] text-white" : "bg-[#f3e3cb] text-[#6b4226]"}`,
                children: [jsxRuntime.jsx("span", { className: "emoji", children: u.emoji }), " ", u.label],
              },
              u.id,
            ),
          ),
        }),
        jsxRuntime.jsxs("div", {
          className: "flex flex-wrap gap-1.5",
          children: [
            UNLOCK_FILTERS.map((u) =>
              jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `btn-status-${u.id}`,
                  onClick: () => o(u.id),
                  className: `rounded-full px-3 py-1.5 text-xs font-black ${a === u.id ? "bg-[#7c5cbf] text-white" : "bg-[#efe6f7] text-[#6b4fa0]"}`,
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: u.emoji }),
                    " ",
                    u.label,
                  ],
                },
                u.id,
              ),
            ),
            jsxRuntime.jsxs("span", {
              className: "ml-auto self-center text-[11px] font-bold text-[#b08a6a]",
              children: [
                "已解锁 ",
                jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: c }),
                " / ",
                ALL_ACHIEVEMENTS.length,
              ],
            }),
          ],
        }),
        l.length === 0
          ? jsxRuntime.jsx("p", {
              className:
                "rounded-xl bg-[#fff8e1] px-3 py-4 text-center text-xs font-bold text-[#b08a6a]",
              children: "当前筛选下没有成就，换个条件试试",
            })
          : jsxRuntime.jsx("div", {
              className: "grid grid-cols-1 gap-2.5",
              children: l.map((u) => jsxRuntime.jsx(renderAchievementItem, { state: e, achievement: u }, u.id)),
            }),
      ],
    }),
  );
}

function AchievementDetail({ state: e, milestoneId: n, onClaim: s }) {
  const a = MILESTONES.find((f) => f.id === n);
  if (!a) return null;
  const o = getMilestoneState(e, a.id),
    l = calcProgressPercent(a.progress(e)),
    c = o === 2,
    u = o === 1;
  return jsxRuntime.jsxs(
    "div",
    {
      "data-testid": `milestone-${a.id}`,
      className: `game-card ${u ? "border-[#ffc53d]/70" : ""}`,
      children: [
        jsxRuntime.jsxs("div", {
          className: "flex items-start justify-between gap-2",
          children: [
            jsxRuntime.jsxs("div", {
              className: "min-w-0",
              children: [
                jsxRuntime.jsxs("p", {
                  className: "font-black text-[#4a2c17]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: a.emoji }),
                    " ",
                    a.name,
                    u &&
                      jsxRuntime.jsx("span", {
                        className:
                          "ml-1.5 rounded-full bg-[#fff3bf] px-1.5 py-px text-[10px] font-black text-[#b8860b]",
                        children: "可领取",
                      }),
                    c &&
                      jsxRuntime.jsx("span", {
                        className:
                          "ml-1.5 rounded-full bg-[#e3f2fd] px-1.5 py-px text-[10px] font-black text-[#c62828]",
                        children: "已领取",
                      }),
                  ],
                }),
                jsxRuntime.jsxs("p", {
                  className: "mt-0.5 flex items-center gap-1 text-xs text-[#b08a6a]",
                  children: [
                    jsxRuntime.jsx("span", { className: "min-w-0 flex-1", children: a.desc }),
                    jsxRuntime.jsx(SpeakButton, {
                      text: `${a.name}。${a.desc}。奖励：${formatRewards(a.rewards)}`,
                      label: "",
                      ariaLabel: `朗读里程碑${a.name}`,
                      testId: `btn-milestone-speak-${a.id}`,
                      className: "btn-xs shrink-0",
                    }),
                  ],
                }),
                jsxRuntime.jsxs("p", {
                  className: "mt-1 text-xs font-black text-[#e65100]",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
                    " ",
                    formatRewards(a.rewards),
                  ],
                }),
              ],
            }),
            jsxRuntime.jsxs("span", {
              className: "shrink-0 text-sm font-black text-[#b08a6a]",
              children: [
                jsxRuntime.jsx("span", { className: "num", children: a.progress(e).current }),
                "/",
                a.progress(e).target,
              ],
            }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2 flex items-center gap-2",
          children: [
            jsxRuntime.jsx("div", {
              className: "bar-track flex-1",
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-valuenow": l,
              "aria-label": `${a.name}进度 ${a.progress(e).current}/${a.progress(e).target}`,
              children: jsxRuntime.jsx("div", {
                className: "bar-fill",
                style: {
                  width: `${l}%`,
                  background: u
                    ? "linear-gradient(90deg,#ffd54f,#ffc53d)"
                    : "linear-gradient(90deg,#f3e3cb,#e8c9a0)",
                },
              }),
            }),
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": `btn-claim-${a.id}`,
              onClick: () => s(a.id),
              disabled: !u,
              className: `btn-chunky btn-xs shrink-0 ${u ? "btn-yellow" : "btn-ghost"}`,
              children: c
                ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "✅" }), " 已领取"],
                  })
                : u
                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
                        " 领取奖励",
                      ],
                    })
                  : "未达成",
            }),
          ],
        }),
      ],
    },
    a.id,
  );
}

function MilestonePanel({ state: e, onClaimed: n }) {
  const s = countCompletedMilestones(e),
    a = MILESTONES.filter((l) => e.milestones[l.id] === 2).length,
    o = (l) => {
      const c = claimMilestone(e, l);
      c.ok && n(c.state, c.message, c.rewards);
    };
  return renderWithSpeech(
    jsxRuntime.jsxs(jsxRuntime.Fragment, {
      children: [
        jsxRuntime.jsxs("section", {
          className: "game-card",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-0.5 font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }), " 里程碑奖励"],
            }),
            jsxRuntime.jsxs("p", {
              className: "text-xs font-bold text-[#b08a6a]",
              children: [
                "达成里程碑后可手动领取金币和食材奖励，已领取 ",
                jsxRuntime.jsx("span", { className: "num text-[#c62828]", children: a }),
                " / ",
                MILESTONES.length,
              ],
            }),
            s > 0 &&
              jsxRuntime.jsxs("p", {
                className:
                  "mt-1.5 inline-block rounded-full bg-[#ffe9ef] px-2.5 py-0.5 text-[11px] font-black text-[#e5484d]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "🔔" }),
                  " 有 ",
                  s,
                  " 项奖励待领取",
                ],
              }),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "space-y-2.5",
          children: MILESTONES.map((l) => jsxRuntime.jsx(AchievementDetail, { state: e, milestoneId: l.id, onClaim: o }, l.id)),
        }),
      ],
    }),
  );
}

const MAX_LOG_ENTRIES = 10;

function pad2(e) {
  return e < 10 ? `0${e}` : String(e);
}

function formatDateTime(e) {
  const n = new Date(e);
  return `${pad2(n.getMonth() + 1)}-${pad2(n.getDate())} ${pad2(n.getHours())}:${pad2(n.getMinutes())}`;
}

function TimelineLog({
  open: e,
  onClose: n,
  game: s,
  currentSlot: a,
  onSwitchSlot: o,
  onLoadSlot: l,
  showToast: c,
}) {
  const [u, f] = React.useState(() => new Array(MAX_LOG_ENTRIES).fill(null)),
    [g, x] = React.useState(!1),
    [m, p] = React.useState(null),
    [y, j] = React.useState(null),
    [v, w] = React.useState(""),
    [N, S] = React.useState(!1),
    [C, V] = React.useState(""),
    [E, F] = React.useState(!1),
    J = React.useRef(null),
    H = React.useRef(null),
    R = React.useCallback(async () => {
      x(!0);
      try {
        const D = await listSaveSlots();
        f(D);
      } catch {
        c("读取档位列表失败", "error");
      } finally {
        x(!1);
      }
    }, [c]);
  React.useEffect(() => {
    e && (w(""), j(null), S(!1), R());
  }, [e, R]);
  const se = async (D) => {
      p(D);
      try {
        (await upsertSave(s, D))
          ? (o(D), c(`已保存到档位 ${D}`, "success"), await R())
          : c("保存失败，请稍后再试", "error");
      } catch {
        c("保存失败，请稍后再试", "error");
      } finally {
        p(null);
      }
    },
    be = async (D) => {
      p(D);
      try {
        (await l(D)) ? n() : c("该档位暂无存档", "error");
      } catch {
        c("读取档位失败，请稍后再试", "error");
      } finally {
        p(null);
      }
    },
    Ie = async (D) => {
      p(D);
      try {
        const O = await loadSaveSlot(D);
        if (!O) {
          c("该档位暂无存档，无法导出", "error");
          return;
        }
        (w(buildSaveFileText(D, O)), j(D), S(!1), c("已生成导出文本，可下载或复制", "success"));
      } catch {
        c("导出失败，请稍后再试", "error");
      } finally {
        p(null);
      }
    },
    xe = async () => {
      if (!v || y == null) return;
      const D = `tianmi-save-${y}.js`;
      try {
        (await saveFileNative({ data: utf8ToBase64(v), fileName: D }), c("已开始保存 .js 文件", "success"));
      } catch {
        c("当前环境无法直接保存文件，请使用「复制文本」后自行粘贴保存", "error");
      }
    },
    ye = async () => {
      var O;
      if (!v) return;
      let D = !1;
      try {
        (O = navigator.clipboard) != null &&
          O.writeText &&
          (await navigator.clipboard.writeText(v), (D = !0));
      } catch {
        D = !1;
      }
      if (!D)
        try {
          const K = J.current;
          K && (K.focus(), K.select(), (D = document.execCommand("copy")));
        } catch {
          D = !1;
        }
      D
        ? (S(!0),
          H.current && window.clearTimeout(H.current),
          (H.current = window.setTimeout(() => S(!1), 1600)),
          c("已复制导出文本", "success"))
        : c("复制失败，请手动选择文本复制", "error");
    },
    P = async () => {
      F(!0);
      try {
        const D = await chooseFileNative(),
          O = await readFileNative({ filePath: D.filePath, encoding: "utf8" });
        (V(O), c(`已读取文件 ${D.fileName}`, "success"));
      } catch (D) {
        (typeof globalThis.__instrumentedCatchMonitor == "function" &&
          globalThis.__instrumentedCatchMonitor(D),
          (D instanceof Error ? D.name : "") !== "USER_CANCEL" &&
            c("读取文件失败，请尝试粘贴文本导入", "error"));
      } finally {
        F(!1);
      }
    },
    ne = async (D) => {
      const O = parseSaveFileText(C);
      if (!O) {
        c("导入内容不是有效的存档文件，请检查后重试", "error");
        return;
      }
      p(D);
      try {
        (await updateSaveMeta(D, O))
          ? (c(`已导入到档位 ${D}`, "success"), await R())
          : c("导入失败，请稍后再试", "error");
      } catch {
        c("导入失败，请稍后再试", "error");
      } finally {
        p(null);
      }
    };
  return jsxRuntime.jsx(Modal, {
    open: e,
    title: "🗂️ 存档管理",
    onClose: n,
    children: jsxRuntime.jsxs("div", {
      className: "space-y-3",
      children: [
        jsxRuntime.jsxs("div", {
          className: "flex flex-wrap items-center gap-2",
          children: [
            jsxRuntime.jsxs("span", {
              className:
                "shrink-0 rounded-full bg-[#fff3bf] px-2.5 py-1 text-xs font-black text-[#b8860b]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "📍" }), " 当前档位：", a],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-save-mgr-load-current",
              onClick: () => void be(a),
              disabled: m !== null,
              className: "btn-chunky btn-sm btn-green",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "📖" }), " 读取当前档位"],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-save-mgr-refresh",
              onClick: () => void R(),
              disabled: g || m !== null,
              className: "btn-chunky btn-sm btn-brown",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🔄" }),
                " ",
                g ? "刷新中…" : "刷新",
              ],
            }),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "space-y-2",
          children: u.map((D, O) => {
            const K = O + 1,
              Y = K === a,
              I = m === K;
            return jsxRuntime.jsxs(
              "div",
              {
                "data-testid": `slot-card-${K}`,
                className: `rounded-2xl border-2 p-3 ${Y ? "border-[#ff6b81] bg-[#ffe9ef]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "mb-1.5 flex items-center justify-between gap-2",
                    children: [
                      jsxRuntime.jsxs("p", {
                        className: "text-sm font-black text-[#4a2c17]",
                        children: [
                          jsxRuntime.jsx("span", { className: "emoji", children: "💾" }),
                          " 档位 ",
                          K,
                        ],
                      }),
                      Y &&
                        jsxRuntime.jsx("span", {
                          className:
                            "shrink-0 rounded-full bg-[#e04a63] px-2 py-0.5 text-[11px] font-black text-white",
                          children: "📍当前",
                        }),
                    ],
                  }),
                  D
                    ? jsxRuntime.jsxs("p", {
                        className: "mb-2 text-xs font-bold text-[#b08a6a]",
                        children: [
                          "玩家：",
                          D.playerName,
                          " · 第 ",
                          D.day,
                          " 天 · 更新于 ",
                          formatDateTime(D.updatedAt),
                        ],
                      })
                    : jsxRuntime.jsx("p", {
                        className: "mb-2 text-xs font-bold text-[#c9b39a]",
                        children: "空档位",
                      }),
                  jsxRuntime.jsxs("div", {
                    className: "flex flex-wrap gap-1.5",
                    children: [
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-slot-save-${K}`,
                        onClick: () => void se(K),
                        disabled: I,
                        className: "btn-chunky btn-sm btn-green",
                        children: I ? "保存中…" : "存",
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-slot-load-${K}`,
                        onClick: () => void be(K),
                        disabled: I,
                        className: "btn-chunky btn-sm btn-brown",
                        children: "读",
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-slot-export-${K}`,
                        onClick: () => void Ie(K),
                        disabled: I,
                        className: "btn-chunky btn-sm btn-orange",
                        children: "导出",
                      }),
                      jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-slot-import-${K}`,
                        onClick: () => void ne(K),
                        disabled: I,
                        className: "btn-chunky btn-sm btn-pink",
                        children: "导入到这格",
                      }),
                    ],
                  }),
                ],
              },
              K,
            );
          }),
        }),
        v !== "" &&
          jsxRuntime.jsxs("div", {
            className: "rounded-2xl border-2 border-[#d8e9d0] bg-[#f2fae9] p-3",
            children: [
              jsxRuntime.jsxs("p", {
                className: "mb-1.5 text-xs font-black text-[#4a2c17]",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "📤" }),
                  " 导出预览（档位 ",
                  y ?? "-",
                  "）",
                ],
              }),
              jsxRuntime.jsx("textarea", {
                ref: J,
                "data-testid": "textarea-save-mgr-export",
                readOnly: !0,
                rows: 6,
                value: v,
                className:
                  "w-full rounded-xl border border-[#d0c4a8] bg-[#fffdf8] p-2 font-mono text-[11px] leading-relaxed text-[#4a2c17]",
              }),
              jsxRuntime.jsxs("div", {
                className: "mt-2 flex flex-wrap gap-2",
                children: [
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": "btn-save-mgr-download",
                    onClick: () => void xe(),
                    className: "btn-chunky btn-sm btn-green",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "⬇️" }),
                      " 下载 .js 文件",
                    ],
                  }),
                  jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": "btn-save-mgr-copy",
                    onClick: () => void ye(),
                    className: "btn-chunky btn-sm btn-orange",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: "📋" }),
                      " ",
                      N ? "已复制✓" : "复制文本",
                    ],
                  }),
                ],
              }),
            ],
          }),
        jsxRuntime.jsxs("div", {
          className: "rounded-2xl border-2 border-[#f0dcc0] bg-[#fff8ef] p-3",
          children: [
            jsxRuntime.jsxs("p", {
              className: "mb-1.5 text-xs font-black text-[#4a2c17]",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "📥" }), " 导入存档"],
            }),
            jsxRuntime.jsx("textarea", {
              "data-testid": "textarea-save-mgr-import",
              rows: 3,
              value: C,
              onChange: (D) => V(D.target.value),
              placeholder: "粘贴存档文本，或点击右侧按钮选择 .js 文件",
              className:
                "w-full rounded-xl border border-[#d0c4a8] bg-[#fffdf8] p-2 text-[12px] leading-relaxed text-[#4a2c17]",
            }),
            jsxRuntime.jsx("div", {
              className: "mt-2",
              children: jsxRuntime.jsxs("button", {
                type: "button",
                "data-testid": "btn-save-mgr-pick-file",
                onClick: () => void P(),
                disabled: E,
                className: "btn-chunky btn-sm btn-brown",
                children: [
                  jsxRuntime.jsx("span", { className: "emoji", children: "📁" }),
                  " ",
                  E ? "选择中…" : "选择本地 .js 文件",
                ],
              }),
            }),
            jsxRuntime.jsx("p", {
              className: "mt-2 text-[11px] font-bold text-[#b08a6a]",
              children:
                "在目标档位卡片点击「导入到这格」，把上方内容写入该档位；导入会覆盖该档位现有存档。",
            }),
          ],
        }),
      ],
    }),
  });
}

function AchievementPanel({
  state: e,
  commit: n,
  onSave: s,
  onRestart: a,
  currentSlot: o,
  onSwitchSlot: l,
  onLoadSlot: c,
  showToast: u,
}) {
  const [f, g] = React.useState("achieve"),
    [x, m] = React.useState("all"),
    [p, y] = React.useState(!1),
    j = ALL_ACHIEVEMENTS.filter((N) => e.achievements[N.id] !== void 0).length,
    v = countCompletedMilestones(e),
    w = (N, S, C) => {
      n(N, `${S}（${formatRewards(C)}）`, "success");
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx("section", {
          className: "game-card",
          style: { background: "linear-gradient(135deg,#fff8e1,#ffe9ef)" },
          children: jsxRuntime.jsxs(jsxRuntime.Fragment, {
            children: [
              jsxRuntime.jsxs("div", {
                className: "flex items-center justify-between gap-2",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "whitespace-nowrap text-[13px] font-black text-[#4a2c17]",
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏛️" }), " 成就殿堂"],
                  }),
                  jsxRuntime.jsx("span", {
                    className:
                      "shrink-0 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-black",
                    style: { background: "#fff3bf", color: "#8a6100" },
                    children:
                      f === "achieve"
                        ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
                              " 荣誉墙",
                            ],
                          })
                        : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                            children: [
                              jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
                              " 奖励库",
                            ],
                          }),
                  }),
                ],
              }),
              /* v31：统计独占一行，不再和「荣誉墙」抢宽度（原来被挤到折行） */
              jsxRuntime.jsxs("p", {
                className: "mt-1 text-[10px] font-bold",
                style: { whiteSpace: "nowrap", color: "#8a6a4a" },
                children: [
                  "已解锁 ",
                  jsxRuntime.jsx("span", { className: "num text-[#e04a63]", children: j }),
                  " / ",
                  ALL_ACHIEVEMENTS.length,
                  " 项成就",
                ],
              }),
            ],
          }),
        }),
        jsxRuntime.jsxs("div", {
          /* v31：三颗按钮挤在一行时「重新启动游戏」会折成两行，改为 2 列，
             重启独占一整行（也更符合它是危险操作的地位）。 */
          className: "grid grid-cols-2 gap-2",
          children: [
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-save-game",
              onClick: s,
              className: "btn-chunky btn-sm btn-green whitespace-nowrap",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "💾" }), " 存档"],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-open-save-manager",
              onClick: () => y(!0),
              className: "btn-chunky btn-sm btn-orange whitespace-nowrap",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🗂️" }), " 存档管理"],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-restart-game",
              onClick: a,
              className: "btn-chunky btn-sm btn-brown col-span-2 whitespace-nowrap",
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🔄" }), " 重新启动游戏"],
            }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "flex gap-2",
          children: [
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-view-achieve",
              onClick: () => g("achieve"),
              className: `flex flex-1 items-center justify-center whitespace-nowrap rounded-xl border-2 px-2 py-2 text-[10px] font-black ${f === "achieve" ? "border-[#ff6b81] bg-[#ffe9ef]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
              style: { color: f === "achieve" ? "#e04a63" : "#8a6a4a" },
              children: [jsxRuntime.jsx("span", { className: "emoji", children: "🏛️" }), " 成就殿堂"],
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "btn-view-milestone",
              onClick: () => g("milestone"),
              className: `relative flex flex-1 items-center justify-center whitespace-nowrap rounded-xl border-2 px-2 py-2 text-[10px] font-black ${f === "milestone" ? "border-[#ffc53d] bg-[#fff8e1]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
              style: { color: f === "milestone" ? "#8a6100" : "#8a6a4a" },
              children: [
                jsxRuntime.jsx("span", { className: "emoji", children: "🎁" }),
                " 里程碑奖励",
                v > 0 &&
                  jsxRuntime.jsx("span", {
                    "data-testid": "milestone-badge",
                    className:
                      "absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e5484d] px-1 text-[11px] font-black text-white",
                    children: v,
                  }),
              ],
            }),
          ],
        }),
        f === "milestone"
          ? jsxRuntime.jsx(MilestonePanel, { state: e, onClaimed: w })
          : jsxRuntime.jsx(AchievementList, { state: e, filter: x, onFilter: m }),
        jsxRuntime.jsx(TimelineLog, {
          open: p,
          onClose: () => y(!1),
          game: e,
          currentSlot: o,
          onSwitchSlot: l,
          onLoadSlot: c,
          showToast: u,
        }),
      ],
    }),
  );
}

const FRAME_SYS_PREFIX = "sys-",
  THEME_DEBOUNCE_MS = 100,
  frameRegistry = new Map();

function registerFrame(e, n) {
  frameRegistry.set(e, n);
}

function unregisterFrame(e) {
  frameRegistry.delete(e);
}

function readCurrentTheme() {
  const e = document.documentElement,
    n = document.getElementById("container"),
    s = getComputedStyle(e),
    a = Array.from(e.classList).filter((o) => o.startsWith(FRAME_SYS_PREFIX));
  return {
    night: e.classList.contains("night"),
    blind: (n == null ? void 0 : n.classList.contains("blind-mode")) ?? !1,
    fontScale: s.getPropertyValue("--player-font-scale").trim() || "1",
    sysFontScale: s.getPropertyValue("--sys-font-scale").trim() || "1",
    a11yClasses: a,
  };
}

function postThemeToFrame(e, n) {
  if (e)
    try {
      e.postMessage({ type: "frame:theme", payload: n }, "*");
    } catch {}
}

function broadcastTheme(e) {
  frameRegistry.forEach((n) => postThemeToFrame(n, e));
}

function sendFrameCommand(e, n, s) {
  const a = frameRegistry.get(e) ?? null;
  if (a)
    try {
      a.postMessage({ type: "frame:command", command: n, payload: s }, "*");
    } catch {}
}

function observeThemeChanges(e) {
  let n = null,
    s = null;
  const a = document.documentElement,
    o = new MutationObserver(u),
    l = new MutationObserver(u),
    c = () => {
      const g = document.getElementById("container");
      !g ||
        g === s ||
        (l.disconnect(),
        l.observe(g, { attributes: !0, attributeFilter: ["class", "style"] }),
        (s = g));
    };
  function u() {
    (n != null && window.clearTimeout(n),
      (n = window.setTimeout(() => {
        ((n = null), c(), e(readCurrentTheme()));
      }, THEME_DEBOUNCE_MS)));
  }
  (o.observe(a, { attributes: !0, attributeFilter: ["class", "style"] }), c());
  const f = () => u();
  return (
    window.addEventListener("resize", f),
    document.addEventListener("visibilitychange", f),
    window.addEventListener("orientationchange", f),
    () => {
      (n != null && window.clearTimeout(n),
        o.disconnect(),
        l.disconnect(),
        window.removeEventListener("resize", f),
        document.removeEventListener("visibilitychange", f),
        window.removeEventListener("orientationchange", f));
    }
  );
}

let _cachedStyleRules = null;

function collectStyleRules() {
  if (_cachedStyleRules != null) return _cachedStyleRules;
  const e = [];
  for (const n of Array.from(document.styleSheets))
    try {
      const s = n.cssRules;
      for (let a = 0; a < s.length; a += 1) e.push(s[a].cssText);
    } catch {}
  return (
    (_cachedStyleRules = e.join(`
`)),
    _cachedStyleRules
  );
}

function buildFrameBootstrapScript(e) {
  return [
    "(function () {",
    "  var FRAME_ID = " + JSON.stringify(e) + ";",
    "  var reported = false;",
    "  var savedFocus = null;",
    "",
    "  // 子文档全局兜底：未捕获异常 / Promise 拒绝上报主框架（渲染错误由面板错误边界兜住）",
    "  function reportError(msg) {",
    "    try {",
    '      window.parent.postMessage({ type: "flash-app-error", payload: { type: "flash-app-error", message: msg, errorType: "frame-window-error", frameId: FRAME_ID } }, "*");',
    "    } catch (err) {}",
    "  }",
    '  window.addEventListener("error", function (ev) {',
    '    var m = (ev && ev.error && ev.error.message) ? ev.error.message : (ev && ev.message ? ev.message : "unknown");',
    "    reportError(m);",
    "  });",
    '  window.addEventListener("unhandledrejection", function (ev) {',
    "    var r = ev && ev.reason;",
    "    var m = (r && r.message) ? r.message : String(r);",
    "    reportError(m);",
    "  });",
    "",
    "  // 只接受形如 sys-xxx 的系统类名与纯数值缩放比",
    "  var SYS_CLASS_RE = /^sys-[A-Za-z0-9_-]+$/;",
    "  var SCALE_RE = /^\\d+(?:\\.\\d+)?$/;",
    "",
    "  function applyTheme(msg) {",
    "    var p = (msg && msg.payload) || {};",
    "    var root = document.documentElement;",
    '    var container = document.getElementById("container");',
    "    var night = !!p.night;",
    "    var blind = !!p.blind;",
    '    root.classList.toggle("night", night);',
    '    if (typeof p.fontScale === "string" && SCALE_RE.test(p.fontScale)) {',
    '      root.style.setProperty("--player-font-scale", p.fontScale);',
    "    }",
    '    if (typeof p.sysFontScale === "string" && SCALE_RE.test(p.sysFontScale)) {',
    '      root.style.setProperty("--sys-font-scale", p.sysFontScale);',
    "    }",
    "    if (Array.isArray(p.a11yClasses)) {",
    "      var sys = [];",
    "      for (var i = 0; i < root.classList.length; i += 1) {",
    "        var c = root.classList[i];",
    '        if (c.indexOf("sys-") === 0) sys.push(c);',
    "      }",
    "      for (var j = 0; j < sys.length; j += 1) root.classList.remove(sys[j]);",
    "      for (var k = 0; k < p.a11yClasses.length; k += 1) {",
    "        var cls = p.a11yClasses[k];",
    '        if (typeof cls === "string" && SYS_CLASS_RE.test(cls)) root.classList.add(cls);',
    "      }",
    "    }",
    "    if (container) {",
    '      container.classList.toggle("night", night);',
    '      container.classList.toggle("blind-mode", blind);',
    "    }",
    "    if (!reported) {",
    "      reported = true;",
    "      try {",
    '        window.parent.postMessage({ type: "frame:ready", frameId: FRAME_ID }, "*");',
    "      } catch (err) {}",
    "    }",
    "  }",
    "",
    '  window.addEventListener("message", function (ev) {',
    "    // 只接受同源父窗口的指令：阻断跨源页面嵌入后伪造 frame:theme（同源脚本不在此防护范围）",
    "    if (ev.source !== window.parent || ev.origin !== location.origin) return;",
    "    var data = ev.data;",
    "    if (!data || !data.type) return;",
    '    if (data.type === "frame:theme") applyTheme(data);',
    '    if (data.type === "frame:save-focus") {',
    "      var ae = document.activeElement;",
    "      savedFocus = (ae && ae !== document.body && ae.focus) ? ae : null;",
    "    }",
    '    if (data.type === "frame:restore-focus") {',
    "      if (savedFocus && savedFocus.focus) {",
    "        try { savedFocus.focus(); } catch (err) {}",
    "      }",
    "      savedFocus = null;",
    "    }",
    "  });",
    "",
    '  document.addEventListener("pointerdown", function (ev) {',
    "    var t = ev.target;",
    "    if (!t || !t.closest) return;",
    '    if (t.closest("[data-testid=\\"blind-ask-banner\\"]")) return;',
    '    if (t.closest("button, input, select, textarea, a, [role=\\"button\\"], label")) return;',
    "    try {",
    '      window.parent.postMessage({ type: "frame:pointerdown" }, "*");',
    "    } catch (err) {}",
    "  }, true);",
    "",
    "  // 输入框聚焦：被软键盘遮挡时滚到可视区中间（小程序/手机端防键盘挡字）",
    '  document.addEventListener("focusin", function (ev) {',
    "    var t = ev.target;",
    '    if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" && t.tagName !== "SELECT")) return;',
    "    try {",
    "      var rect = t.getBoundingClientRect();",
    "      var vh = window.innerHeight || document.documentElement.clientHeight;",
    "      if (rect.top < 0 || rect.bottom > vh) {",
    '        t.scrollIntoView({ block: "center" });',
    "      }",
    "    } catch (err) {}",
    "  }, true);",
    "",
    "  // 双指触摸时禁止页面缩放（小程序 WebView 内双指缩放会打乱布局）",
    '  document.addEventListener("touchmove", function (ev) {',
    "    if (ev.touches && ev.touches.length > 1) ev.preventDefault();",
    "  }, { passive: false });",
    "})();",
  ].join(`
`);
}

function buildFrameDocument(e) {
  const n = collectStyleRules(),
    s = buildFrameBootstrapScript(e);
  return [
    "<!doctype html>",
    "<html>",
    "<head>",
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
    "<style>",
    n,
    "#container { min-height: 100%; overflow-x: hidden; }",
    "body { height: auto !important; min-height: 100%; overflow-y: auto; overflow-x: hidden; -webkit-overflow-scrolling: touch; }",
    "html { overflow-y: auto; overflow-x: hidden; }",
    "#root { overflow-x: hidden; }",
    "</style>",
    "</head>",
    "<body>",
    '<div id="container" class="min-h-screen">',
    '<div id="root" class="panel-scroll pt-2 pb-32"></div>',
    "</div>",
    "<script>",
    s,
    "<\/script>",
    "</body>",
    "</html>",
  ].join("");
}

class FrameErrorBoundary extends React.Component {
  constructor() {
    (super(...arguments), (this.state = { hasError: !1, message: "" }));
  }
  static getDerivedStateFromError(n) {
    return { hasError: !0, message: n instanceof Error ? n.message : String(n) };
  }
  componentDidCatch(n, s) {
    try {
      window.parent.postMessage(
        {
          type: "flash-app-error",
          payload: {
            type: "flash-app-error",
            message: n instanceof Error ? n.message : String(n),
            stack: n instanceof Error ? n.stack : void 0,
            componentStack: s.componentStack ?? void 0,
            errorType: "panel-error-boundary",
            frameId: this.props.frameId,
          },
        },
        "*",
      );
    } catch {}
  }
  render() {
    return this.state.hasError
      ? jsxRuntime.jsxs("div", {
          style: {
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "32px 24px",
            textAlign: "center",
          },
          children: [
            jsxRuntime.jsx("p", { style: { fontSize: "30px", margin: 0 }, children: "🍰" }),
            jsxRuntime.jsx("p", {
              style: { fontSize: "17px", fontWeight: 800, margin: 0, color: "#5d4037" },
              children: "这块页面出了点小问题",
            }),
            jsxRuntime.jsx("p", {
              style: { fontSize: "13px", lineHeight: 1.7, margin: 0, color: "#8d6e63" },
              children: "点下方按钮重新加载试试；如果一直出现，请把提示发给开发者。",
            }),
            this.state.message !== "" &&
              jsxRuntime.jsx("p", {
                style: {
                  fontSize: "11px",
                  lineHeight: 1.5,
                  color: "#8d6e63",
                  background: "#fff",
                  border: "1px solid #efebe9",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  maxWidth: "100%",
                  wordBreak: "break-all",
                  margin: 0,
                },
                children: this.state.message.slice(0, 200),
              }),
            jsxRuntime.jsx("button", {
              type: "button",
              onClick: () => {
                try {
                  window.location.reload();
                } catch {
                  window.location.href = window.location.href;
                }
              },
              style: {
                marginTop: "6px",
                padding: "10px 28px",
                borderRadius: "999px",
                border: "0",
                background: "#8d6e63",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
              },
              children: "重新加载",
            }),
          ],
        })
      : this.props.children;
  }
}

function PanelFrame({ frameId: e, active: n, className: s, children: a }) {
  const [o, l] = React.useState(!1),
    c = React.useRef(null),
    u = React.useRef(null),
    f = React.useRef(!1),
    g = React.useRef(a);
  ((g.current = a),
    React.useEffect(() => {
      n && !f.current && ((f.current = !0), l(!0));
    }, [n]));
  const x = "pages/" + e + "/index.html",
    m = () => {
      var w;
      const p = c.current,
        y = p == null ? void 0 : p.contentDocument;
      if (!p || !y) return;
      (registerFrame(e, p.contentWindow), postThemeToFrame(p.contentWindow, readCurrentTheme()));
      const j = y.getElementById("root");
      if (!j) return;
      (u.current || (u.current = ReactDOM.createRoot(j)),
        u.current.render(jsxRuntime.jsx(FrameErrorBoundary, { frameId: e, children: g.current })));
      const v = p;
      ((w = v.__cardTintCleanup) == null || w.call(v), (v.__cardTintCleanup = observeCardDepths(y)));
    };
  return (
    React.useEffect(() => {
      u.current && u.current.render(jsxRuntime.jsx(FrameErrorBoundary, { frameId: e, children: a }));
    }, [a, e]),
    React.useEffect(() => {
      const p = c.current;
      return () => {
        var y, j;
        (unregisterFrame(e),
          (y = p == null ? void 0 : p.__cardTintCleanup) == null || y.call(p),
          (j = u.current) == null || j.unmount(),
          (u.current = null),
          (f.current = !1));
      };
    }, [e]),
    o
      ? jsxRuntime.jsx("iframe", {
          ref: c,
          title: `panel-${e}`,
          "data-testid": `panel-frame-${e}`,
          src: x,
          onLoad: m,
          className: s,
          style: { display: n ? "block" : "none", width: "100%", height: "100%", border: 0 },
        })
      : null
  );
}
