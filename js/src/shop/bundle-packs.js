// js/src/shop/bundle-packs.js
// 材料补给包系统：花金币一键购入一批常用食材。
// 数据来自 window.Cake.BUNDLES（js/data/bundles/），每个包含 { id, name, emoji, desc, cost, contents:{食材id:数量} }。
// 购买动作照搬 shop/buy-craft-actions.js 的 buyIngredient 范式：扣 coins、记 stats.spent、
// 写入 e.ingredients[id] = { qty, freshness:0 }、维护 seenIngredients 与 recordCatch。

function buyBundle(e, n) {
  const list = window.Cake.BUNDLES || [];
  const b = list.find((x) => x.id === n);
  if (!b) return { state: e, ok: !1, message: "材料包不存在" };
  if (e.coins < b.cost) return { state: e, ok: !1, message: "金币不足，先去赚点钱吧" };

  const c = deepClone(e);
  c.coins -= b.cost;
  c.stats.spent = (c.stats.spent ?? 0) + b.cost;

  const got = [];
  for (const [id, qty] of Object.entries(b.contents)) {
    const ing = INGREDIENT_MAP[id];
    if (!ing) return { state: e, ok: !1, message: `材料「${id}」不存在，无法购买` };
    const u = c.ingredients[id];
    u ? (u.qty += qty) : (c.ingredients[id] = { qty, freshness: 0 });
    (c.seenIngredients ?? []).includes(id) ||
      (c.seenIngredients = [...(c.seenIngredients ?? []), id]);
    recordCatch(c, id, qty);
    got.push(`${ing.name}×${qty}`);
  }
  return {
    state: c,
    ok: !0,
    message: `已购入「${b.name}」：${got.join("、")}`,
  };
}

function BundlePacksPanel({ state: e, commit: n }) {
  const list = window.Cake.BUNDLES || [];
  if (list.length === 0) return null;

  return jsxRuntime.jsxs("div", {
    className: "rounded-2xl border-2 border-[#f3d9b0] bg-[#fffaf0] p-3 space-y-2",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex flex-wrap items-center gap-x-2",
        style: { rowGap: "2px" },
        children: [
          jsxRuntime.jsx("span", { className: "text-xl", children: "🎁" }),
          jsxRuntime.jsx("span", {
            className: "shrink-0 text-sm font-black text-[#8a5a2b]",
            style: { whiteSpace: "nowrap" },
            children: "材料补给包",
          }),
          jsxRuntime.jsx("span", {
            className: "text-[11px] font-bold text-[#b08a6a]",
            style: { whiteSpace: "nowrap" },
            children: "花金币一键补齐常用食材",
          }),
        ],
      }),
      ...list.map((b) => {
        const afford = e.coins >= b.cost;
        const rows = Object.entries(b.contents).map(([id, qty]) => {
          const ing = INGREDIENT_MAP[id];
          return {
            name: ing ? ing.name : id,
            emoji: ing ? ing.emoji || "📦" : "❓",
            qty,
            ok: !!ing,
          };
        });
        return jsxRuntime.jsxs(
          "div",
          {
            className: "rounded-xl border border-[#f0dcc0] bg-white/70 p-2",
            children: [
              jsxRuntime.jsxs("div", {
                className: "flex items-center justify-between",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex items-center gap-1.5",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", children: b.emoji || "🎁" }),
                      jsxRuntime.jsx("span", {
                        className: "text-sm font-black text-[#6a4a2b]",
                        children: b.name,
                      }),
                    ],
                  }),
                  jsxRuntime.jsx("span", {
                    className: "text-[11px] font-bold text-[#b08a6a]",
                    children: `💰${b.cost}`,
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "mt-1 flex flex-wrap gap-1",
                children: rows.map((r) =>
                  jsxRuntime.jsxs(
                    "span",
                    {
                      className: `rounded-lg px-1.5 py-0.5 text-[11px] font-bold ${
                        r.ok
                          ? "bg-[#f3edf9] text-[#4a148c]"
                          : "bg-[#ffe9ef] text-[#e04a63]"
                      }`,
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: r.emoji }),
                        ` ${r.name}×${r.qty}`,
                      ],
                    },
                    r.name,
                  ),
                ),
              }),
              jsxRuntime.jsx("button", {
                type: "button",
                "data-testid": `btn-buy-bundle-${b.id}`,
                disabled: !afford,
                onClick: () => {
                  const r = buyBundle(e, b.id);
                  n(r.state, r.message, r.ok ? "success" : "error");
                },
                className: `mt-1.5 w-full rounded-xl py-1.5 text-xs font-black ${
                  afford
                    ? "bg-[#ff6b81] text-white active:scale-95"
                    : "bg-[#eee] text-[#aaa]"
                }`,
                children: afford ? "购入" : "金币不足",
              }),
            ],
          },
          b.id,
        );
      }),
    ],
  });
}
