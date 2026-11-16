function RelationGroupCard({ label: e, emoji: n, title: s, color: a, activeColor: o, testId: l }) {
  const [c, u] = React.useState(!0),
    f = RELATIONSHIP_PAIRS.filter((g) => g.label === e);
  return jsxRuntime.jsxs("div", {
    className: "rounded-2xl border-2 border-[#f8bbd0] bg-[#fff0f3] p-2.5",
    style: { borderColor: o, background: e === "已婚" ? "#fff5f5" : "#fff0f3" },
    children: [
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": l,
        "aria-expanded": c,
        onClick: () => u((g) => !g),
        className: "flex w-full items-center gap-1.5 text-left active:scale-[0.99]",
        children: [
          jsxRuntime.jsxs("span", {
            className: "min-w-0 flex-1 text-[11px] font-black",
            style: { color: a },
            children: [
              jsxRuntime.jsx("span", { className: "emoji", children: n }),
              " ",
              s,
              jsxRuntime.jsxs("span", {
                className: "ml-1 text-[9px] font-bold",
                style: { color: o },
                children: [f.length, " 对"],
              }),
            ],
          }),
          jsxRuntime.jsx("span", {
            "aria-hidden": "true",
            className: `shrink-0 text-xs font-black transition-transform duration-200 ${c ? "" : "-rotate-90"}`,
            style: { color: a },
            children: "▾",
          }),
        ],
      }),
      c &&
        jsxRuntime.jsx("div", {
          className: "mt-1.5 space-y-1",
          children: f.map((g) => {
            const x = NPC_ALL.find((p) => p.id === g.a),
              m = NPC_ALL.find((p) => p.id === g.b);
            return !x || !m
              ? null
              : jsxRuntime.jsxs(
                  "p",
                  {
                    className: "text-[10px] font-bold leading-relaxed text-[#6b4226]",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: n }),
                      " ",
                      jsxRuntime.jsx("span", { className: "emoji", children: x.emoji }),
                      " ",
                      x.name,
                      " × ",
                      jsxRuntime.jsx("span", { className: "emoji", children: m.emoji }),
                      " ",
                      m.name,
                      jsxRuntime.jsx("span", {
                        className: "ml-1 rounded-full bg-white px-1.5 py-px text-[9px] font-black",
                        style: { color: a },
                        children: e,
                      }),
                    ],
                  },
                  `${g.a}-${g.b}`,
                );
          }),
        }),
    ],
  });
}

function HighAffectionNpcList({ state: e, treeOpenCats: n, treeIsOpen: s, toggleTreeCat: a, metOf: o, onSelect: l }) {
  const c = getHighAffectionNpcIds(e);
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("div", {
        className:
          "flex items-center gap-2 rounded-2xl border-2 border-[#c8e6c9] bg-white/80 p-2.5",
        children: [
          jsxRuntime.jsx("span", {
            className:
              "emoji flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe9ef] text-xl",
            children: "🧑‍🍳",
          }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("p", {
                className: "text-sm font-black text-[#2e7d32]",
                children: [e.playerName, "（主角）"],
              }),
              jsxRuntime.jsxs("p", {
                className: "text-[10px] font-bold text-[#558b2f]",
                children: [e.shopName, " 店主 · 好感度会决定你在 TA 心中的位置"],
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx(groupNpcsByArea, {
        catKey: "player-lover",
        title: "恋人",
        ids: c.lover,
        emoji: "❤️",
        color: "#e04a63",
        empty: "还没有恋人：多聊天、送礼、约会，好感度 60 以上就会出现在这里",
        open: s("player-lover"),
        onToggle: () => a("player-lover"),
        onSelect: l,
        metOf: o,
      }),
      jsxRuntime.jsx(groupNpcsByArea, {
        catKey: "player-children",
        title: "子女 · 看着长大的孩子们",
        ids: c.children,
        emoji: "👶",
        color: "#ff8c42",
        empty: "还没有缘分照顾到的孩子：多陪陪小镇的小朋友们吧",
        open: s("player-children"),
        onToggle: () => a("player-children"),
        onSelect: l,
        metOf: o,
      }),
      jsxRuntime.jsx(groupNpcsByArea, {
        catKey: "player-best",
        title: "最重要的朋友",
        ids: c.best,
        emoji: "💛",
        color: "#b8860b",
        empty: "还没有最重要的朋友：好感度 40-59 的伙伴会出现在这里",
        open: s("player-best"),
        onToggle: () => a("player-best"),
        onSelect: l,
        metOf: o,
      }),
      jsxRuntime.jsx(groupNpcsByArea, {
        catKey: "player-friends",
        title: "普通朋友",
        ids: c.friends,
        emoji: "🤝",
        color: "#6b4226",
        empty: "还没有普通朋友：去小镇地图上认识伙伴吧",
        open: s("player-friends"),
        onToggle: () => a("player-friends"),
        onSelect: l,
        metOf: o,
      }),
      jsxRuntime.jsxs("div", {
        className: "space-y-2",
        children: [
          jsxRuntime.jsx(RelationGroupCard, {
            label: "恋爱中",
            emoji: "💞",
            title: "小镇的情侣",
            color: "#ad1457",
            activeColor: "#d81b60",
            testId: "btn-town-couple-toggle",
          }),
          jsxRuntime.jsx(RelationGroupCard, {
            label: "已婚",
            emoji: "💍",
            title: "小镇的夫妻",
            color: "#c62828",
            activeColor: "#e57373",
            testId: "btn-town-spouse-toggle",
          }),
        ],
      }),
    ],
  });
}

function NpcProfileCard({
  state: e,
  npcId: n,
  treeOpenCats: s,
  treeIsOpen: a,
  toggleTreeCat: o,
  npcTreeOpen: l,
  onToggleNpcTree: c,
  metOf: u,
  onBack: f,
  onSelect: g,
}) {
  const x = NPC_ALL.find((v) => v.id === n);
  if (!x) return null;
  const m = u(n),
    p = buildFamilyRelations(n),
    y = NPC_BIOS[n] ?? [],
    j = l[n] ?? !1;
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex gap-2 rounded-2xl border-2 border-[#c8e6c9] bg-white/80 p-2.5",
        children: [
          jsxRuntime.jsx("div", {
            className: "flex w-[20%] shrink-0 items-center justify-center",
            children: jsxRuntime.jsx("span", {
              className:
                "emoji flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl",
              children: m ? x.emoji : "❓",
            }),
          }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("div", {
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "text-sm font-black text-[#2e7d32]",
                    children: [
                      m ? x.name : "？？？",
                      " ",
                      jsxRuntime.jsx("span", {
                        className: "text-[10px] font-bold text-[#558b2f]",
                        children: m ? x.title : "尚未认识",
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-[10px] font-bold text-[#558b2f]",
                    children: m
                      ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: "📍" }),
                            " ",
                            NPC_RESIDENCE[x.id] ? `${NPC_RESIDENCE[x.id].area}·${NPC_RESIDENCE[x.id].detail}` : x.place,
                          ],
                        })
                      : `出现地点：${x.place}`,
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                children: jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "btn-tree-back",
                  onClick: f,
                  className: "btn-chunky btn-xs btn-green",
                  children: "← 我的关系树",
                }),
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": `btn-tree-npc-toggle-${n}`,
        "aria-expanded": j,
        onClick: c,
        className:
          "flex w-full items-center gap-2 rounded-xl border-2 border-[#c8e6c9] bg-[#f1f8e9] px-2.5 py-1.5 text-left active:scale-[0.99]",
        children: [
          jsxRuntime.jsx("span", {
            className: "min-w-0 flex-1 text-[10px] font-black text-[#2e7d32]",
            children: j
              ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "👥" }),
                    " 收起关系树（只显示名字）",
                  ],
                })
              : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji", children: "👥" }),
                    " 展开 TA 的关系树（父母 · 恋人 · 朋友…）",
                  ],
                }),
          }),
          jsxRuntime.jsx("span", {
            "aria-hidden": "true",
            className: `shrink-0 text-xs font-black text-[#2e7d32] transition-transform duration-200 ${j ? "" : "-rotate-90"}`,
            children: "▾",
          }),
        ],
      }),
      j &&
        jsxRuntime.jsxs(jsxRuntime.Fragment, {
          children: [
            jsxRuntime.jsx(groupNpcsByArea, {
              catKey: "npc-lover",
              title: "恋人 / 配偶",
              ids: p.lover,
              emoji: "❤️",
              color: "#e04a63",
              empty: "暂无所属的恋人",
              open: a("npc-lover"),
              onToggle: () => o("npc-lover"),
              onSelect: g,
              metOf: u,
            }),
            jsxRuntime.jsx(groupNpcsByArea, {
              catKey: "npc-parents",
              title: "父母",
              ids: p.parents,
              emoji: "👨‍👩‍👧",
              color: "#8d6e63",
              empty: "暂无登记",
              open: a("npc-parents"),
              onToggle: () => o("npc-parents"),
              onSelect: g,
              metOf: u,
            }),
            jsxRuntime.jsx(groupNpcsByArea, {
              catKey: "npc-children",
              title: "子女",
              ids: p.children,
              emoji: "👶",
              color: "#ff8c42",
              empty: "暂无子女",
              open: a("npc-children"),
              onToggle: () => o("npc-children"),
              onSelect: g,
              metOf: u,
            }),
            jsxRuntime.jsx(groupNpcsByArea, {
              catKey: "npc-siblings",
              title: "兄弟姐妹",
              ids: p.siblings,
              emoji: "👫",
              color: "#66bb6a",
              empty: "暂无兄弟姐妹",
              open: a("npc-siblings"),
              onToggle: () => o("npc-siblings"),
              onSelect: g,
              metOf: u,
            }),
            p.eternalFriends.length > 0 &&
              jsxRuntime.jsx(groupNpcsByArea, {
                catKey: "npc-eternal",
                title: "永恒挚友",
                ids: p.eternalFriends,
                emoji: "💖",
                color: "#7b1fa2",
                empty: "暂无",
                open: a("npc-eternal"),
                onToggle: () => o("npc-eternal"),
                onSelect: g,
                metOf: u,
              }),
            jsxRuntime.jsx(groupNpcsByArea, {
              catKey: "npc-best",
              title: "最重要的朋友",
              ids: p.bestFriends,
              emoji: "💛",
              color: "#b8860b",
              empty: "暂无",
              open: a("npc-best"),
              onToggle: () => o("npc-best"),
              onSelect: g,
              metOf: u,
            }),
            jsxRuntime.jsx(groupNpcsByArea, {
              catKey: "npc-friends",
              title: "普通朋友 / 同事",
              ids: p.friends,
              emoji: "🤝",
              color: "#6b4226",
              empty: "暂无",
              open: a("npc-friends"),
              onToggle: () => o("npc-friends"),
              onSelect: g,
              metOf: u,
            }),
            y.length > 0 &&
              jsxRuntime.jsxs("div", {
                className: "rounded-2xl border-2 border-[#f0dcc0] bg-[#fbf3e4] p-2.5",
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "mb-1 text-[11px] font-black text-[#6b4226]",
                    children: [jsxRuntime.jsx("span", { className: "emoji", children: "📌" }), " 关于 TA"],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-[10px] font-bold leading-relaxed text-[#8d6e63]",
                    children: y.join(" · "),
                  }),
                ],
              }),
          ],
        }),
    ],
  });
}

function RelationTreeCard({ state: e, open: n, onToggle: s }) {
  const [a, o] = React.useState("player"),
    [l, c] = React.useState({ lover: !0 }),
    [u, f] = React.useState({}),
    g = (p) => l[p] ?? !1,
    x = (p) => c((y) => ({ ...y, [p]: !(y[p] ?? !1) })),
    m = (p) => (e.metNpcs ?? []).includes(p);
  return jsxRuntime.jsxs(StatusCard, {
    id: "tree",
    title: "人际关系树",
    emoji: "🌳",
    titleColor: "#2e7d32",
    badge: jsxRuntime.jsx("span", {
      className: "rounded-full bg-[#fff3bf] px-2 py-0.5 text-[10px] font-black text-[#b8860b]",
      children: "点名字查看 TA 的关系树",
    }),
    open: n,
    onToggle: s,
    style: { background: "linear-gradient(135deg,#e8f5e9,#f1f8e9)" },
    children: [
      jsxRuntime.jsx("p", {
        className: "mb-2 text-[10px] font-bold leading-relaxed text-[#558b2f]",
        children: segmentByEmoji(
          `🌳 以「${e.playerName}」的关系树为起点：恋人、子女、最重要的朋友、普通朋友四个分区都可以折叠；点任意一个名字，就能看到 TA 自己的关系树。💞 小镇里藏着不少情侣和夫妻哦。`,
        ),
      }),
      a === "player"
        ? jsxRuntime.jsx(HighAffectionNpcList, {
            state: e,
            treeOpenCats: l,
            treeIsOpen: g,
            toggleTreeCat: x,
            metOf: m,
            onSelect: o,
          })
        : jsxRuntime.jsx(NpcProfileCard, {
            state: e,
            npcId: a,
            treeOpenCats: l,
            treeIsOpen: g,
            toggleTreeCat: x,
            npcTreeOpen: u,
            onToggleNpcTree: () => f((p) => ({ ...p, [a]: !(p[a] ?? !1) })),
            metOf: m,
            onBack: () => o("player"),
            onSelect: o,
          }),
    ],
  });
}

const AREA_OPTIONS = ["居民区", "别墅区", "学校", "动物收容所", "其他"],
  RESIDENCE_OPTIONS = ["梧桐里小区", "安康苑小区", "文苑小区", "苏记老宅", "听澜别墅", "学生宿舍"];

function groupNpcsByResidence(e) {
  const n = new Map();
  for (const s of e) {
    const a = NPC_RESIDENCE[s.id],
      o =
        (a == null ? void 0 : a.area) ??
        (EMPLOYEES.some((u) => u.id === s.id) ? "其他" : (s.place ?? "其他")),
      l = (a == null ? void 0 : a.detail) ?? "其他";
    n.has(o) || n.set(o, new Map());
    const c = n.get(o);
    (c.has(l) || c.set(l, []), c.get(l).push(s));
  }
  return n;
}

function sortByListOrder(e, n) {
  return [...e].sort((s, a) => {
    const o = n.indexOf(s[0]),
      l = n.indexOf(a[0]);
    return (o === -1 ? 99 : o) - (l === -1 ? 99 : l);
  });
}

function groupNpcsByGenderAge({ list: e, state: n }) {
  const s = new Map();
  for (const a of e) {
    const o = NPC_GENDERS[a.id] ?? "其他",
      l = npcAgeGroup(a.id, n.day);
    s.has(o) || s.set(o, new Map());
    const c = s.get(o);
    (c.has(l) || c.set(l, []), c.get(l).push(a));
  }
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: [...s.entries()].map(([a, o]) =>
      jsxRuntime.jsxs(
        "div",
        {
          className: "rounded-xl border border-[#f0e0b0] bg-white/60 p-1.5",
          children: [
            jsxRuntime.jsx("p", {
              className: "text-[10px] font-black text-[#b8860b]",
              children:
                a === "男"
                  ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                      children: [jsxRuntime.jsx("span", { className: "emoji", children: "👨" }), " 男"],
                    })
                  : a === "女"
                    ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                        children: [jsxRuntime.jsx("span", { className: "emoji", children: "👩" }), " 女"],
                      })
                    : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🧑" }), " 其他"],
                      }),
            }),
            AGE_GROUPS.filter((l) => o.has(l)).map((l) =>
              jsxRuntime.jsxs(
                "div",
                {
                  className: "mt-1",
                  children: [
                    jsxRuntime.jsx("p", {
                      className: "text-[10px] font-bold text-[#8a6a4a]",
                      children:
                        l === "儿童"
                          ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "🧒" }),
                                " 儿童",
                              ],
                            })
                          : l === "成人"
                            ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                children: [
                                  jsxRuntime.jsx("span", { className: "emoji", children: "🧑" }),
                                  " 成人",
                                ],
                              })
                            : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                children: [
                                  jsxRuntime.jsx("span", { className: "emoji", children: "👴" }),
                                  " 老人",
                                ],
                              }),
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1 grid grid-cols-2 gap-1.5",
                      children: (o.get(l) ?? []).map((c) => {
                        const u = EMPLOYEES.some((g) => g.id === c.id),
                          f = (n.metNpcs ?? []).includes(c.id) || (u && n.employees.includes(c.id));
                        return jsxRuntime.jsxs(
                          "div",
                          {
                            className: "flex gap-2 rounded-xl bg-[#fbf3e4] p-2",
                            children: [
                              jsxRuntime.jsx("div", {
                                className: "flex w-[20%] shrink-0 items-center justify-center",
                                children: jsxRuntime.jsx("span", {
                                  className: "emoji text-2xl",
                                  children: c.emoji,
                                }),
                              }),
                              jsxRuntime.jsx("div", {
                                className: "min-w-0 flex-1",
                                children: jsxRuntime.jsxs("div", {
                                  children: [
                                    jsxRuntime.jsxs("p", {
                                      className: "text-sm font-black text-[#4a2c17]",
                                      children: [
                                        c.name,
                                        jsxRuntime.jsx("span", {
                                          "data-testid": `profile-met-${c.id}`,
                                          className: `ml-1 rounded-full px-1.5 py-px text-[9px] font-black ${f ? "bg-[#e3f2fd] text-[#c62828]" : "bg-[#f3e3cb] text-[#8a6a4a]"}`,
                                          children: f
                                            ? jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                                children: [
                                                  jsxRuntime.jsx("span", {
                                                    className: "emoji",
                                                    children: "✅",
                                                  }),
                                                  " 已认识",
                                                ],
                                              })
                                            : jsxRuntime.jsxs(jsxRuntime.Fragment, {
                                                children: [
                                                  jsxRuntime.jsx("span", {
                                                    className: "emoji",
                                                    children: "🕐",
                                                  }),
                                                  " 尚未见面",
                                                ],
                                              }),
                                        }),
                                      ],
                                    }),
                                    jsxRuntime.jsx("p", {
                                      className: "text-[10px] font-bold text-[#b08a6a]",
                                      children: c.title,
                                    }),
                                    "birthday" in c && c.birthday
                                      ? jsxRuntime.jsxs("p", {
                                          className: "text-[9px] font-bold text-[#c2185b]",
                                          children: [
                                            jsxRuntime.jsx("span", { className: "emoji", children: "🎂" }),
                                            " 生日 ",
                                            c.birthday.month,
                                            "月",
                                            c.birthday.day,
                                            "日",
                                          ],
                                        })
                                      : null,
                                  ],
                                }),
                              }),
                            ],
                          },
                          c.id,
                        );
                      }),
                    }),
                  ],
                },
                l,
              ),
            ),
          ],
        },
        a,
      ),
    ),
  });
}

function NpcGroupedGrid({
  area: e,
  detailMap: n,
  areaOpen: s,
  detailOpen: a,
  state: o,
  onToggleArea: l,
  onToggleDetail: c,
}) {
  const u = [...n.values()].reduce((g, x) => g + x.length, 0),
    f = sortByListOrder([...n.entries()], RESIDENCE_OPTIONS);
  return jsxRuntime.jsxs(
    "div",
    {
      className: "overflow-hidden rounded-2xl border-2 border-[#f0dcc0] bg-[#fffdf8]",
      children: [
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": `meet-area-${e}`,
          "aria-expanded": s,
          onClick: l,
          className: "flex w-full items-center gap-2 px-2.5 py-2 text-left active:scale-[0.99]",
          children: [
            jsxRuntime.jsx("span", {
              className: "text-base leading-none",
              children: segmentByEmoji(
                e === "居民区"
                  ? "🏘️"
                  : e === "别墅区"
                    ? "🏰"
                    : e === "学校"
                      ? "🏫"
                      : e === "动物收容所"
                        ? "🐶"
                        : "📍",
              ),
            }),
            jsxRuntime.jsxs("span", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsx("span", {
                  className: "block text-xs font-black text-[#4a2c17]",
                  children: e,
                }),
                jsxRuntime.jsxs("span", {
                  className: "block truncate text-[9px] font-bold text-[#b08a6a]",
                  children: [u, " 位伙伴"],
                }),
              ],
            }),
            jsxRuntime.jsx("span", {
              "aria-hidden": "true",
              className: `shrink-0 text-sm font-black text-[#b08a6a] transition-transform duration-200 ${s ? "" : "-rotate-90"}`,
              children: "▾",
            }),
          ],
        }),
        s &&
          jsxRuntime.jsx("div", {
            className: "space-y-2 px-2 pb-2",
            children: f.map(([g, x]) => {
              const m = a[g] ?? !1;
              return jsxRuntime.jsxs(
                "div",
                {
                  className: "overflow-hidden rounded-xl border-2 border-[#f0e0b0] bg-white/70",
                  children: [
                    jsxRuntime.jsxs("button", {
                      type: "button",
                      "data-testid": `meet-detail-${g}`,
                      "aria-expanded": m,
                      onClick: () => c(g),
                      className:
                        "flex w-full items-center gap-2 px-2 py-1.5 text-left active:scale-[0.99]",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "text-sm leading-none",
                          children: jsxRuntime.jsx("span", { className: "emoji", children: "🏠" }),
                        }),
                        jsxRuntime.jsx("span", {
                          className:
                            "min-w-0 flex-1 truncate text-[11px] font-black text-[#6b4226]",
                          children: g,
                        }),
                        jsxRuntime.jsxs("span", {
                          className:
                            "shrink-0 rounded-full bg-[#fff3bf] px-1.5 py-px text-[9px] font-black text-[#b8860b]",
                          children: [x.length, " 人"],
                        }),
                        jsxRuntime.jsx("span", {
                          "aria-hidden": "true",
                          className: `shrink-0 text-xs font-black text-[#b08a6a] transition-transform duration-200 ${m ? "" : "-rotate-90"}`,
                          children: "▾",
                        }),
                      ],
                    }),
                    m &&
                      jsxRuntime.jsx("div", {
                        className: "space-y-1.5 p-1.5",
                        children: jsxRuntime.jsx(groupNpcsByGenderAge, { list: x, state: o }),
                      }),
                  ],
                },
                g,
              );
            }),
          }),
      ],
    },
    e,
  );
}

function NpcFilterPanel({ state: e, filter: n, open: s, onToggle: a, reveal: o }) {
  const { filteredChars: l } = n,
    [c, u] = React.useState({ 居民区: !0 }),
    [f, g] = React.useState({ 梧桐里小区: !0 });
  return (
    React.useEffect(() => {
      if (!o) return;
      const x = groupNpcsByResidence([...NPC_ALL, ...EMPLOYEES]);
      for (const [m, p] of x)
        for (const [y, j] of p)
          if (j.some((v) => v.id === o.npcId)) {
            (u((v) => ({ ...v, [m]: !0 })), g((v) => ({ ...v, [y]: !0 })));
            return;
          }
    }, [o]),
    jsxRuntime.jsxs(StatusCard, {
      id: "meet",
      title: "认识伙伴",
      emoji: "🙋",
      titleColor: "#4a2c17",
      open: s,
      onToggle: a,
      children: [
        jsxRuntime.jsx("p", {
          className: "mb-2 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children:
            "小镇的全部伙伴（含家长与工作人员）：可按居住地、性别、年龄段筛选，再按居住区域与小区折叠分组浏览。",
        }),
        jsxRuntime.jsx("div", { className: "mb-2", children: jsxRuntime.jsx(NpcFilterBar, { ...buildNpcFilterProps(n), prefix: "meet" }) }),
        jsxRuntime.jsx("div", {
          className: "space-y-2",
          children: sortByListOrder([...groupNpcsByResidence(l).entries()], AREA_OPTIONS).map(([x, m]) =>
            jsxRuntime.jsx(
              NpcGroupedGrid,
              {
                area: x,
                detailMap: m,
                areaOpen: c[x] ?? !1,
                detailOpen: f,
                state: e,
                onToggleArea: () => u((p) => ({ ...p, [x]: !(p[x] ?? !1) })),
                onToggleDetail: (p) => g((y) => ({ ...y, [p]: !(y[p] ?? !1) })),
              },
              x,
            ),
          ),
        }),
        l.length === 0 &&
          jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#f3e3cb] px-2.5 py-2 text-center text-[10px] font-bold text-[#8a6a4a]",
            children: "没有符合条件的伙伴：换个居住地、性别或年龄段试试，或点「全部」清除筛选。",
          }),
        jsxRuntime.jsxs("p", {
          className: "mt-2 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children: [
            jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
            " 所有伙伴都要在小镇地图上见面才能认识：去「商店街」街上会遇到苏晚晴、陈叙白、林知夏，招聘摊位能见到顾一鸣和唐晓雨；认识后才会出现在手机通讯录里。列表按居住区域与小区分组，点标题即可折叠/展开。",
          ],
        }),
      ],
    })
  );
}

function toggleItem(e, n) {
  return e.includes(n) ? e.filter((s) => s !== n) : [...e, n];
}

function useSearchHistory(e) {
  const [n, s] = React.useState([]),
    [a, o] = React.useState([]),
    [l, c] = React.useState([]),
    u = (p, y) => toggleItem(p, y),
    f = (p) => {
      var y;
      return (
        ((y = NPC_RESIDENCE[p.id]) == null ? void 0 : y.area) ??
        (EMPLOYEES.some((j) => j.id === p.id) ? "其他" : (p.place ?? "其他"))
      );
    },
    g = (p) => {
      if (n.length > 0 && !n.includes(f(p))) return !1;
      const y = NPC_GENDERS[p.id] ?? "其他";
      if (a.length > 0 && !a.includes(y)) return !1;
      const j = npcAgeGroup(p.id, e.day);
      return !(l.length > 0 && !l.includes(j));
    },
    m = [...NPC_ALL, ...EMPLOYEES].filter(g);
  return {
    areaSel: n,
    genderSel: a,
    ageSel: l,
    setAreaSel: s,
    setGenderSel: o,
    setAgeSel: c,
    toggleSel: u,
    areaOf: f,
    matchChar: g,
    filteredChars: m,
  };
}

const PROFILE_TABS = [
    { id: "me", label: "个人状况", emoji: "🧼" },
    { id: "learn", label: "熟练图鉴", emoji: "📜" },
    { id: "tree", label: "人际关系", emoji: "🌳" },
    { id: "meet", label: "认识伙伴", emoji: "🙋" },
  ],
  PROFILE_SECTION_TOGGLES = {
    status: !0,
    health: !1,
    rep: !1,
    skill: !1,
    recipe: !1,
    book: !1,
    codex: !1,
    tree: !0,
    meet: !0,
  },
  SEARCH_KIND_LABELS = { char: "角色", recipe: "食谱", book: "书籍", codex: "图鉴" },
  SEARCH_HISTORY_KEY = "sweet-profile-search-history",
  SEARCH_HISTORY_LIMIT = 10,
  readSearchHistory = () => {
    try {
      const e = window.localStorage.getItem(SEARCH_HISTORY_KEY);
      if (!e) return [];
      const n = JSON.parse(e);
      return Array.isArray(n)
        ? n
            .filter(
              (s) => !!s && typeof s == "object" && typeof s.q == "string" && s.q.trim() !== "",
            )
            .slice(0, SEARCH_HISTORY_LIMIT)
        : [];
    } catch {
      return [];
    }
  };

function ProfilePage({ state: e }) {
  var xe, ye;
  const [n, s] = React.useState("me"),
    [a, o] = React.useState(PROFILE_SECTION_TOGGLES),
    l = useSearchHistory(e),
    c = (P) => a[P] ?? !1,
    u = (P) => o((ne) => ({ ...ne, [P]: !(ne[P] ?? !1) })),
    [f, g] = React.useState(""),
    [x, m] = React.useState(!1),
    [p, y] = React.useState(null),
    j = React.useRef(null),
    [v, w] = React.useState(readSearchHistory),
    N = (P) => {
      const ne = (P ?? "").trim();
      ne &&
        w((D) => {
          const O = [{ q: ne, t: Date.now() }, ...D.filter((K) => K.q !== ne)].slice(0, SEARCH_HISTORY_LIMIT);
          try {
            window.localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(O));
          } catch {}
          return O;
        });
    },
    S = () => {
      w([]);
      try {
        window.localStorage.removeItem(SEARCH_HISTORY_KEY);
      } catch {}
    },
    C = React.useMemo(() => {
      var O;
      const P = [],
        ne = (K, Y) => {
          const I = (K ?? "").trim();
          !I ||
            P.some((U) => U.name === I) ||
            P.length >= 8 ||
            P.push({ emoji: Y ?? "⭐", name: I });
        },
        D = new Set(Object.keys(e.recipes ?? {}));
      for (const K of RECIPES_ALL) D.has(K.id) && ne(K.name, K.emoji);
      for (const K of [...NPC_ALL, ...EMPLOYEES]) ne(K.name, K.emoji);
      for (const K of BOOKS_GAME)
        (((O = e.home) == null ? void 0 : O.ownedBooks) ?? []).includes(K.id) &&
          ne(K.name, K.emoji);
      for (const K of INGREDIENTS_LIST) ne(K.name, K.emoji);
      return P;
    }, [e.recipes, (xe = e.home) == null ? void 0 : xe.ownedBooks]),
    V = (P) => {
      (y(P),
        j.current && window.clearTimeout(j.current),
        (j.current = window.setTimeout(() => y(null), 2600)));
    };
  React.useEffect(
    () => () => {
      j.current && window.clearTimeout(j.current);
    },
    [],
  );
  const E = async () => {
      if (x) {
        try {
          await window.lingguang.asr.stop();
        } catch {}
        return;
      }
      try {
        (y(null),
          m(!0),
          await window.lingguang.asr.start({
            lang: "zh-CN",
            interim: !0,
            onText: ({ text: P }) => g(P),
            onError: (P) => {
              V(P.message ?? "语音识别失败，请重试");
            },
            onEnd: () => m(!1),
          }));
      } catch {
        (m(!1), V("无法启动语音识别，请检查麦克风权限"));
      }
    },
    [F, J] = React.useState("food"),
    [H, R] = React.useState(null),
    se = f.trim().toLowerCase(),
    be = React.useMemo(() => {
      var ne;
      if (!se) return null;
      const P = [];
      for (const D of [...NPC_ALL, ...EMPLOYEES]) {
        const O = D.name ?? "",
          K = D.title ?? "",
          Y = D.place ?? "";
        (O.toLowerCase().includes(se) ||
          K.toLowerCase().includes(se) ||
          Y.toLowerCase().includes(se)) &&
          P.push({
            kind: "char",
            key: `char-${D.id}`,
            emoji: D.emoji ?? "🙋",
            name: O,
            sub: K || Y,
            npcId: D.id,
          });
      }
      for (const D of RECIPES_ALL)
        D.id in (e.recipes ?? {}) &&
          (D.name ?? "").toLowerCase().includes(se) &&
          P.push({ kind: "recipe", key: `recipe-${D.id}`, emoji: D.emoji ?? "📜", name: D.name });
      for (const D of BOOKS_GAME)
        (((ne = e.home) == null ? void 0 : ne.ownedBooks) ?? []).includes(D.id) &&
          (D.name ?? "").toLowerCase().includes(se) &&
          P.push({ kind: "book", key: `book-${D.id}`, emoji: D.emoji ?? "📚", name: D.name });
      for (const D of INGREDIENTS_LIST)
        (D.name ?? "").toLowerCase().includes(se) &&
          P.push({
            kind: "codex",
            key: `food-${D.id}`,
            emoji: D.emoji ?? "🍎",
            name: D.name,
            tab: "food",
          });
      for (const D of FISH_SIZE_PARK) {
        const O = INGREDIENT_MAP[D.ingId];
        O &&
          (O.name ?? "").toLowerCase().includes(se) &&
          P.push({
            kind: "codex",
            key: `fish-${D.ingId}`,
            emoji: O.emoji ?? "🐟",
            name: O.name,
            tab: "fish",
          });
      }
      for (const D of [...CRAFT_TOOLS, ...COOKWARES, ...SEWING_TOOLS_GAME])
        (D.name ?? "").toLowerCase().includes(se) &&
          P.push({
            kind: "codex",
            key: `tool-${D.id}`,
            emoji: D.emoji ?? "🛠️",
            name: D.name,
            tab: "tool",
          });
      return P.slice(0, 40);
    }, [se, e.recipes, (ye = e.home) == null ? void 0 : ye.ownedBooks]),
    Ie = (P) => {
      (N(f),
        g(""),
        P.kind === "char"
          ? (l.setAreaSel([]),
            l.setGenderSel([]),
            l.setAgeSel([]),
            s("meet"),
            o((ne) => ({ ...ne, meet: !0 })),
            R((ne) => ({ nonce: ((ne == null ? void 0 : ne.nonce) ?? 0) + 1, npcId: P.npcId })))
          : P.kind === "recipe"
            ? (s("learn"), o((ne) => ({ ...ne, recipe: !0 })))
            : P.kind === "book"
              ? (s("learn"), o((ne) => ({ ...ne, book: !0 })))
              : (s("learn"), o((ne) => ({ ...ne, codex: !0 })), J(P.tab)));
    };
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "space-y-4",
      children: [
        jsxRuntime.jsx("div", {
          className: "flex flex-wrap gap-1.5",
          children: PROFILE_TABS.map((P) =>
            jsxRuntime.jsxs(
              "button",
              {
                type: "button",
                "data-testid": `profile-subtab-${P.id}`,
                onClick: () => s(P.id),
                "aria-pressed": n === P.id,
                className: `rounded-full border-2 px-3 py-1.5 text-xs font-black active:scale-95 ${n === P.id ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                children: [jsxRuntime.jsx("span", { className: "emoji", children: P.emoji }), " ", P.label],
              },
              P.id,
            ),
          ),
        }),
        jsxRuntime.jsxs("div", {
          className: "relative",
          children: [
            jsxRuntime.jsxs("div", {
              className:
                "flex items-center gap-2 rounded-full border-2 border-[#f0dcc0] bg-white px-3 py-2 shadow-sm",
              children: [
                jsxRuntime.jsx("span", {
                  "aria-hidden": "true",
                  className: "shrink-0 text-base leading-none",
                  children: jsxRuntime.jsx("span", { className: "emoji", children: "🔍" }),
                }),
                jsxRuntime.jsx("input", {
                  type: "text",
                  value: f,
                  onChange: (P) => g(P.target.value),
                  onBlur: () => N(f),
                  placeholder: x ? "正在聆听…" : "快捷搜索：伙伴、食谱、书籍、图鉴…",
                  "data-testid": "profile-search-input",
                  autoComplete: "off",
                  autoCapitalize: "off",
                  spellCheck: !1,
                  className:
                    "min-w-0 flex-1 bg-transparent text-xs font-bold text-[#4a2c17] outline-none placeholder:text-[#c9a87f]",
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "profile-search-voice",
                  onClick: E,
                  "aria-label": x ? "停止语音输入" : "语音输入搜索",
                  className: `shrink-0 rounded-full px-2 py-0.5 text-sm leading-none transition active:scale-90 ${x ? "animate-pulse bg-[#ff6b81] text-white" : "bg-[#fff1e6] text-[#b08a6a]"}`,
                  children: jsxRuntime.jsx("span", { className: "emoji", children: x ? "⏹" : "🎤" }),
                }),
                f &&
                  jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "profile-search-clear",
                    onClick: () => g(""),
                    className:
                      "shrink-0 rounded-full bg-[#f3e3cb] px-2 py-0.5 text-[10px] font-black text-[#8a6a4a] active:scale-90",
                    children: "✕",
                  }),
              ],
            }),
            (x || p) &&
              jsxRuntime.jsx("div", {
                className: `mt-1.5 rounded-xl border-2 px-3 py-2 text-[10px] font-bold ${x ? "border-[#ffd9c9] bg-[#fff6f0] text-[#d4535c]" : "border-[#ffd9d9] bg-[#fff5f5] text-[#d4535c]"}`,
                children: x ? "🎤 正在聆听，说完再点一下麦克风结束" : p,
              }),
            !f &&
              jsxRuntime.jsxs("div", {
                className: "mt-2 space-y-2",
                children: [
                  C.length > 0 &&
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsx("p", {
                          className: "mb-1 px-1 text-[10px] font-black text-[#8a6a4a]",
                          /* v31：裸 emoji 不经过 .emoji 降级，缺彩色字体时会变成
                             豆腐块（10 天实玩里「常用搜索」前就是一个 □）。 */
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
                            " 常用搜索",
                          ],
                        }),
                        jsxRuntime.jsx("div", {
                          className: "flex gap-1.5 overflow-x-auto pb-1",
                          children: C.map((P) =>
                            jsxRuntime.jsxs(
                              "button",
                              {
                                type: "button",
                                "data-testid": `profile-quickword-${P.name}`,
                                onClick: () => {
                                  (g(P.name), N(P.name));
                                },
                                className:
                                  "shrink-0 rounded-full border border-[#f0dcc0] bg-white px-2.5 py-1 text-[10px] font-bold text-[#6b4226] active:bg-[#ffe9ef]",
                                children: [
                                  jsxRuntime.jsx("span", { className: "emoji", children: P.emoji }),
                                  " ",
                                  P.name,
                                ],
                              },
                              P.name,
                            ),
                          ),
                        }),
                      ],
                    }),
                  v.length > 0 &&
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsxs("div", {
                          className: "mb-1 flex items-center justify-between px-1",
                          children: [
                            jsxRuntime.jsx("p", {
                              className: "text-[10px] font-black text-[#8a6a4a]",
                              children: [
                                jsxRuntime.jsx("span", { className: "emoji", children: "🕘" }),
                                " 搜索历史",
                              ],
                            }),
                            jsxRuntime.jsx("button", {
                              type: "button",
                              "data-testid": "profile-search-history-clear",
                              onClick: S,
                              className:
                                "rounded-full bg-[#f3e3cb] px-2 py-0.5 text-[9px] font-black text-[#8a6a4a] active:scale-90",
                              children: "清空",
                            }),
                          ],
                        }),
                        jsxRuntime.jsx("div", {
                          className: "flex flex-wrap gap-1.5",
                          children: v.map((P) =>
                            jsxRuntime.jsxs(
                              "button",
                              {
                                type: "button",
                                "data-testid": `profile-search-history-${P.q}`,
                                onClick: () => {
                                  (g(P.q), N(P.q));
                                },
                                className:
                                  "rounded-full border border-[#ffd9c9] bg-[#fff6f0] px-2.5 py-1 text-[10px] font-bold text-[#b06a5a] active:scale-95",
                                children: ["🕘 ", P.q],
                              },
                              P.q,
                            ),
                          ),
                        }),
                      ],
                    }),
                ],
              }),
            be &&
              be.length > 0 &&
              jsxRuntime.jsx("div", {
                className:
                  "mt-1.5 max-h-72 overflow-y-auto rounded-2xl border-2 border-[#f0dcc0] bg-white p-1.5 shadow-lg",
                children: be.map((P) =>
                  jsxRuntime.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-testid": `profile-search-result-${P.key}`,
                      onClick: () => Ie(P),
                      className:
                        "flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left active:bg-[#ffe9ef]",
                      children: [
                        jsxRuntime.jsx("span", {
                          className: "shrink-0 text-base leading-none",
                          children: jsxRuntime.jsx("span", { className: "emoji", children: P.emoji }),
                        }),
                        jsxRuntime.jsxs("span", {
                          className: "min-w-0 flex-1",
                          children: [
                            jsxRuntime.jsx("span", {
                              className: "block truncate text-xs font-black text-[#4a2c17]",
                              children: P.name,
                            }),
                            P.kind === "char" &&
                              P.sub &&
                              jsxRuntime.jsx("span", {
                                className: "block truncate text-[9px] font-bold text-[#b08a6a]",
                                children: P.sub,
                              }),
                          ],
                        }),
                        jsxRuntime.jsx("span", {
                          className:
                            "shrink-0 rounded-full bg-[#fbf3e4] px-1.5 py-px text-[9px] font-black text-[#b08a6a]",
                          children: SEARCH_KIND_LABELS[P.kind],
                        }),
                      ],
                    },
                    P.key,
                  ),
                ),
              }),
            be &&
              be.length === 0 &&
              jsxRuntime.jsx("div", {
                className:
                  "mt-1.5 rounded-2xl border-2 border-[#f0dcc0] bg-white p-3 text-center text-xs font-bold text-[#b08a6a]",
                children: "没有找到相关档案内容，换个关键词试试",
              }),
          ],
        }),
        n === "me" &&
          jsxRuntime.jsxs("div", {
            className: "space-y-4",
            children: [
              jsxRuntime.jsx(HygienePanel, { state: e, open: c("status"), onToggle: () => u("status") }),
              jsxRuntime.jsx(HealthRecordsPanel, { state: e, open: c("health"), onToggle: () => u("health") }),
              jsxRuntime.jsx(ReputationPanel, { state: e, open: c("rep"), onToggle: () => u("rep") }),
              jsxRuntime.jsx(FurnitureExpPanel, { state: e, open: c("skill"), onToggle: () => u("skill") }),
            ],
          }),
        n === "learn" &&
          jsxRuntime.jsxs("div", {
            className: "space-y-4",
            children: [
              jsxRuntime.jsx(RecipeMasteryPanel, { state: e, open: c("recipe"), onToggle: () => u("recipe") }),
              jsxRuntime.jsx(BookCollectionPanel, { state: e, open: c("book"), onToggle: () => u("book") }),
              jsxRuntime.jsx(CodexPanel, {
                state: e,
                filter: l,
                open: c("codex"),
                onToggle: () => u("codex"),
                codexTab: F,
                onCodexTabChange: J,
              }),
            ],
          }),
        n === "tree" && jsxRuntime.jsx(RelationTreeCard, { state: e, open: c("tree"), onToggle: () => u("tree") }),
        n === "meet" &&
          jsxRuntime.jsx(NpcFilterPanel, { state: e, filter: l, open: c("meet"), onToggle: () => u("meet"), reveal: H }),
      ],
    }),
  );
}
