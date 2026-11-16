function OutfitCurrentCard({ api: e }) {
  const { state: n } = e;
  return MapPlaceCard({
    keyId: "clothes-worn",
    title: "当前穿搭",
    emoji: "🧥",
    sub: "查看各部位穿戴中的服装",
    open: e.openCats["clothes-worn"] ?? !0,
    onToggle: () => e.onOpenCats((s) => ({ ...s, "clothes-worn": !(s["clothes-worn"] ?? !0) })),
    border: "border-[#f3d9e4]",
    bg: "bg-[#fdf3ff]",
    titleColor: "text-[#c62828]",
    subColor: "text-[#b08a6a]",
    testId: "clothes-cat-worn",
    children: jsxRuntime.jsx("div", {
      className: "grid grid-cols-4 gap-2",
      children: SLOT_ORDER.map((s) => {
        const a = n.outfits.equipped[s],
          o = OUTFIT_MAP[a];
        return jsxRuntime.jsxs(
          "div",
          {
            "data-testid": `equip-slot-${s}`,
            className: "rounded-xl bg-[#fff7fb] p-1.5 text-center",
            children: [
              jsxRuntime.jsx("p", {
                className: "text-xl",
                children: jsxRuntime.jsx("span", {
                  className: "emoji",
                  children: (o == null ? void 0 : o.emoji) ?? SLOT_EMOJIS[s],
                }),
              }),
              jsxRuntime.jsx("p", {
                className: "mt-0.5 truncate text-[10px] font-black text-[#c62828]",
                children: (o == null ? void 0 : o.name) ?? "未穿戴",
              }),
              jsxRuntime.jsx("p", { className: "text-[9px] font-bold text-[#b08a6a]", children: SLOT_LABELS[s] }),
            ],
          },
          s,
        );
      }),
    }),
  });
}

function OutfitListPanel({ api: e }) {
  const { state: n } = e,
    s = OUTFITS.filter((a) =>
      e.outfitCat !== "all" && a.slot !== e.outfitCat
        ? !1
        : !a.gender || a.gender === "unisex" || a.gender === n.gender,
    );
  return MapPlaceCard({
    keyId: "clothes-buy",
    title: "选购与换装（按部位）",
    emoji: "🛍️",
    sub: `当前角色：${n.gender === "male" ? "♂ 男生" : "♀ 女生"} · 只展示你能穿的款式`,
    open: e.openCats["clothes-buy"] ?? !0,
    onToggle: () => e.onOpenCats((a) => ({ ...a, "clothes-buy": !(a["clothes-buy"] ?? !0) })),
    border: "border-[#f3d9e4]",
    bg: "bg-[#fdf3ff]",
    titleColor: "text-[#c62828]",
    subColor: "text-[#b08a6a]",
    testId: "clothes-cat-buy",
    children: jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsxs("div", {
          className: "mb-2 flex flex-wrap gap-1",
          children: [
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "outfit-cat-all",
              onClick: () => e.onOutfitCat("all"),
              className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${e.outfitCat === "all" ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
              children: "全部",
            }),
            SLOT_ORDER.map((a) =>
              jsxRuntime.jsxs(
                "button",
                {
                  type: "button",
                  "data-testid": `outfit-cat-${a}`,
                  onClick: () => e.onOutfitCat(a),
                  className: `rounded-full border-2 px-2 py-px text-[10px] font-black ${e.outfitCat === a ? "border-[#ff6b81] bg-[#ffe9ef] text-[#e04a63]" : "border-[#f0dcc0] bg-white text-[#6b4226]"}`,
                  children: [SLOT_EMOJIS[a], " ", SLOT_LABELS[a]],
                },
                a,
              ),
            ),
          ],
        }),
        jsxRuntime.jsx("div", {
          className: "grid grid-cols-2 gap-1.5",
          children: s.map((a) => {
            const o = n.outfits.owned.includes(a.id),
              l = n.outfits.equipped[a.slot] === a.id;
            return jsxRuntime.jsxs(
              "div",
              {
                className: `flex flex-col rounded-xl bg-[#fbf3e4] p-2 ${o && !l ? "opacity-80" : ""}`,
                children: [
                  jsxRuntime.jsx("p", {
                    className: "text-center text-2xl",
                    children: jsxRuntime.jsx("span", { className: "emoji", children: a.emoji }),
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "mt-0.5 truncate text-center text-xs font-black text-[#4a2c17]",
                    children: [
                      a.name,
                      l &&
                        jsxRuntime.jsx("span", {
                          className: "text-[9px] font-bold text-[#c62828]",
                          children: " 穿戴中 ✓",
                        }),
                    ],
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-center text-[9px] font-bold text-[#c62828]",
                    children: [
                      SLOT_LABELS[a.slot],
                      " · 魅力 +",
                      a.charm,
                      a.gender &&
                        a.gender !== "unisex" &&
                        jsxRuntime.jsxs("span", {
                          className: "text-[#c62828]",
                          children: [" · ", a.gender === "male" ? "♂ 男装" : "♀ 女装"],
                        }),
                    ],
                  }),
                  o
                    ? jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-equip-${a.id}`,
                        onClick: () => e.onEquip(a.id),
                        disabled: l,
                        className: "btn-chunky btn-xs btn-brown mt-1 w-full",
                        children: l ? "已穿戴" : "穿戴",
                      })
                    : jsxRuntime.jsx("button", {
                        type: "button",
                        "data-testid": `btn-buy-outfit-${a.id}`,
                        "aria-label":
                          a.price === 0
                            ? `免费领取服装${a.name}`
                            : `购买服装${a.name}，需要 ${a.price} 元${n.coins < a.price ? "，金币不足" : ""}`,
                        onClick: () => e.onBuyOutfit(a.id),
                        disabled: a.price === 0 || n.coins < a.price,
                        className: "btn-chunky btn-xs btn-yellow mt-1 w-full",
                        children: a.price === 0 ? "免费" : `💰 ${a.price}`,
                      }),
                ],
              },
              a.id,
            );
          }),
        }),
      ],
    }),
  });
}

function ClothesShopPage({ ctx: e }) {
  return jsxRuntime.jsxs("div", {
    className: "space-y-2",
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "clothes", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsx(CharmPanel, { api: e }),
      jsxRuntime.jsx(OutfitCurrentCard, { api: e }),
      jsxRuntime.jsx(OutfitListPanel, { api: e }),
    ],
  });
}

function SalonPage({ ctx: e }) {
  var s, a, o, l;
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "salon", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 rounded-2xl bg-[#fff3e6] p-3 text-center",
        children: [
          jsxRuntime.jsx("p", { className: "text-xs font-bold text-[#e65100]", children: "当前发型" }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-2xl",
            children: ((s = e.hairDef) == null ? void 0 : s.emoji) ?? "💇",
          }),
          jsxRuntime.jsxs("p", {
            className: "mt-0.5 font-black text-[#4a2c17]",
            children: [
              ((a = e.hairDef) == null ? void 0 : a.name) ?? "未设置",
              " ",
              jsxRuntime.jsxs("span", {
                className: "num text-[#e65100]",
                children: [
                  "魅力 +",
                  n.combedToday
                    ? (((o = e.hairDef) == null ? void 0 : o.charm) ?? 0)
                    : Math.floor((((l = e.hairDef) == null ? void 0 : l.charm) ?? 0) / 2),
                ],
              }),
            ],
          }),
          jsxRuntime.jsx("p", {
            className: "mt-0.5 text-[10px] font-bold text-[#b08a6a]",
            children: n.combedToday
              ? "今日已梳洗，发型全值生效"
              : "今日未梳洗，发型魅力减半，记得早上梳洗",
          }),
        ],
      }),
      jsxRuntime.jsx("p", {
        className: "mb-1.5 text-sm font-black text-[#6b4226]",
        children: "复杂发型（染烫、编发、盘发）",
      }),
      jsxRuntime.jsx("p", {
        className: "mb-2 text-[11px] font-bold text-[#b08a6a]",
        children: "复杂发型要到理发店花钱做，做完永久拥有；基础发型在家自己梳就行。",
      }),
      jsxRuntime.jsx("div", {
        className: "space-y-1.5",
        children: HAIRSTYLES.filter((c) => c.type === "salon").map((c) => {
          var g, x;
          const u = (((g = n.hairstyle) == null ? void 0 : g.owned) ?? []).includes(c.id),
            f = ((x = n.hairstyle) == null ? void 0 : x.equipped) === c.id;
          return jsxRuntime.jsxs(
            "div",
            {
              className: "flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex w-[20%] shrink-0 items-center justify-center",
                  children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: c.emoji }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "text-sm font-black text-[#4a2c17]",
                          children: [
                            c.name,
                            f &&
                              jsxRuntime.jsx("span", {
                                className: "ml-1 text-[10px] font-bold text-[#c62828]",
                                children: "当前 ✓",
                              }),
                          ],
                        }),
                        jsxRuntime.jsx("p", { className: "text-[11px] text-[#b08a6a]", children: c.desc }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[10px] font-bold text-[#e04a63]",
                          children: ["魅力 +", c.charm],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: u
                        ? jsxRuntime.jsx("button", {
                            type: "button",
                            "data-testid": `btn-salon-equip-${c.id}`,
                            onClick: () => e.onStyleHair(c.id),
                            disabled: f,
                            className: "btn-chunky btn-xs btn-brown",
                            children: f ? "已梳好" : "换上",
                          })
                        : jsxRuntime.jsxs("button", {
                            type: "button",
                            "data-testid": `btn-salon-buy-${c.id}`,
                            "aria-label": `购买发型${c.name}，需要 ${c.price} 金币${n.coins < c.price ? "，金币不足" : ""}`,
                            onClick: () => e.onBuyHairstyle(c.id),
                            disabled: n.coins < c.price,
                            className: "btn-chunky btn-xs btn-yellow",
                            children: [
                              jsxRuntime.jsx("span", {
                                className: "emoji",
                                "aria-hidden": "true",
                                children: "💰",
                              }),
                              " ",
                              c.price,
                            ],
                          }),
                    }),
                  ],
                }),
              ],
            },
            c.id,
          );
        }),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 基础发型（清爽短发、元气马尾、齐肩短发、双丸子头）不用花钱，在家「镜前梳妆」随时换。",
        ],
      }),
    ],
  });
}

function RodShopPage({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState([]),
    o = (l) => {
      const c = checkoutCart(n, l);
      (e.commit(c.state, c.message, c.ok ? "success" : "error"), c.ok && a([]));
    };
  return jsxRuntime.jsxs("div", {
    className: "rounded-xl bg-[#e3f2fd] p-3",
    children: [
      jsxRuntime.jsxs("div", {
        className: "flex gap-3",
        children: [
          jsxRuntime.jsx("div", {
            className: "flex w-[20%] shrink-0 items-center justify-center",
            children: jsxRuntime.jsx("span", {
              className: "text-3xl",
              children: jsxRuntime.jsx("span", { className: "emoji", children: "🎣" }),
            }),
          }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("div", {
                children: [
                  jsxRuntime.jsxs("p", {
                    className: "font-black text-[#c62828]",
                    children: [
                      "鱼竿 ",
                      n.fishingRod ? "（已拥有）" : "",
                      n.fishingRod &&
                        jsxRuntime.jsx("span", {
                          className:
                            "ml-1.5 rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[10px] font-black text-[#c62828]",
                          children: "已拥有 ✓",
                        }),
                    ],
                  }),
                  jsxRuntime.jsx("p", {
                    className: "mt-0.5 text-[11px] font-bold text-[#558b2f]",
                    children:
                      "钓鱼必备，买一次用一辈子；鱼竿不能随身携带，结算后次日 8:00 送到店里",
                  }),
                ],
              }),
              !n.fishingRod &&
                jsxRuntime.jsx("div", {
                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                  children: jsxRuntime.jsxs("button", {
                    type: "button",
                    "data-testid": "btn-buy-rod",
                    "aria-label": `购买鱼竿，需要 ${FISHING_ROD_PRICE} 金币${n.coins < FISHING_ROD_PRICE ? "，金币不足" : ""}`,
                    onClick: () =>
                      a([
                        { kind: "tool", refId: "fishing_rod", name: "鱼竿", unitPrice: FISHING_ROD_PRICE, qty: 1 },
                      ]),
                    disabled: n.coins < FISHING_ROD_PRICE,
                    className: "btn-chunky btn-sm btn-brown",
                    children: [
                      jsxRuntime.jsx("span", { className: "emoji", "aria-hidden": "true", children: "💰" }),
                      " ",
                      FISHING_ROD_PRICE,
                    ],
                  }),
                }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsx(CartSummaryBar, { items: s, onCheckout: o }),
    ],
  });
}

function FurnitureShopPage({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState({});
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "furniture", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#f1f8e9] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#558b2f]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🛋️" }),
          " 大家具摆进房间/店铺占位置；装饰小家具（桌布/摆件/挂饰/缸内装饰）不占大位置，颜色可选，摆进店铺同样提升装饰度。做衣服的布料、针线、纽扣和缎带去「",
          jsxRuntime.jsx("span", { className: "emoji", children: "🧵" }),
          " 布料行」。",
        ],
      }),
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 text-sm font-black text-[#6b4226]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🪵" }), " 手工材料"],
      }),
      jsxRuntime.jsx("div", {
        className: "mb-3 grid grid-cols-3 gap-1.5",
        children: MATERIALS.filter(
          (o) => !FABRIC_TYPES[o.id] && o.id !== "thread" && o.id !== "button" && o.id !== "ribbon",
        ).map((o) =>
          jsxRuntime.jsxs(
            "button",
            {
              type: "button",
              "data-testid": `btn-buy-material-${o.id}`,
              "aria-label": `购买5份${o.name}，需要 ${o.price * 5} 元${n.coins < o.price * 5 ? "，金币不足" : ""}`,
              onClick: () => e.onBuyMaterial(o.id, 5),
              disabled: n.coins < o.price * 5,
              className: "btn-chunky btn-xs btn-ghost",
              children: [
                jsxRuntime.jsx("span", { className: "emoji", "aria-hidden": "true", children: o.emoji }),
                " +5（¥",
                o.price * 5,
                "）",
              ],
            },
            o.id,
          ),
        ),
      }),
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 text-sm font-black text-[#6b4226]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🛋️" }), " 大家具"],
      }),
      jsxRuntime.jsx("div", {
        className: "space-y-1.5",
        children: FURNITURE_GAME.filter((o) => (o.size ?? "big") === "big" && o.buyPrice !== void 0).map((o) =>
          jsxRuntime.jsxs(
            "div",
            {
              className: "flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex w-[20%] shrink-0 items-center justify-center",
                  children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: o.emoji }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsx("p", {
                          className: "text-sm font-black text-[#4a2c17]",
                          children: o.name,
                        }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[11px] text-[#b08a6a]",
                          children: [o.desc, " · ", FURNITURE_CATEGORY_LABELS[o.category] ?? o.category],
                        }),
                      ],
                    }),
                    jsxRuntime.jsx("div", {
                      className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                      children: jsxRuntime.jsxs("button", {
                        type: "button",
                        "data-testid": `btn-buy-furniture-${o.id}`,
                        "aria-label": `购买家具${o.name}，需要 ${o.buyPrice} 元${n.coins < (o.buyPrice ?? 0) ? "，金币不足" : ""}`,
                        onClick: () => e.onBuyFurniture(o.id),
                        disabled: n.coins < (o.buyPrice ?? 0),
                        className: "btn-chunky btn-xs btn-green",
                        children: [
                          jsxRuntime.jsx("span", {
                            className: "emoji",
                            "aria-hidden": "true",
                            children: "💰",
                          }),
                          " ",
                          o.buyPrice,
                        ],
                      }),
                    }),
                  ],
                }),
              ],
            },
            o.id,
          ),
        ),
      }),
      jsxRuntime.jsxs("p", {
        className: "mb-1.5 mt-3 text-sm font-black text-[#6b4226]",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "🎀" }), " 装饰小家具"],
      }),
      jsxRuntime.jsx("div", {
        className: "space-y-1.5",
        children: FURNITURE_GAME.filter((o) => (o.size ?? "big") === "small" && o.buyPrice !== void 0).map(
          (o) => {
            const l = s[o.id] ?? "natural";
            return jsxRuntime.jsxs(
              "div",
              {
                className: "rounded-xl bg-[#fbf3e4] p-2.5",
                children: [
                  jsxRuntime.jsxs("div", {
                    className: "flex gap-2.5",
                    children: [
                      jsxRuntime.jsx("div", {
                        className: "flex w-[20%] shrink-0 items-center justify-center",
                        children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: o.emoji }),
                      }),
                      jsxRuntime.jsxs("div", {
                        className: "min-w-0 flex-1",
                        children: [
                          jsxRuntime.jsxs("div", {
                            children: [
                              jsxRuntime.jsx("p", {
                                className: "text-sm font-black text-[#4a2c17]",
                                children: o.name,
                              }),
                              jsxRuntime.jsxs("p", {
                                className: "text-[11px] text-[#b08a6a]",
                                children: [o.desc, " · ", FURNITURE_CATEGORY_LABELS[o.category] ?? o.category],
                              }),
                            ],
                          }),
                          jsxRuntime.jsx("div", {
                            className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                            children: jsxRuntime.jsxs("button", {
                              type: "button",
                              "data-testid": `btn-buy-furniture-${o.id}`,
                              "aria-label": `购买装饰小家具${o.name}，需要 ${o.buyPrice} 元${n.coins < (o.buyPrice ?? 0) ? "，金币不足" : ""}`,
                              onClick: () => e.onBuyFurniture(o.id, l),
                              disabled: n.coins < (o.buyPrice ?? 0),
                              className: "btn-chunky btn-xs btn-green",
                              children: [
                                jsxRuntime.jsx("span", {
                                  className: "emoji",
                                  "aria-hidden": "true",
                                  children: "💰",
                                }),
                                " ",
                                o.buyPrice,
                              ],
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("div", {
                    className: "mt-1.5 flex flex-wrap items-center gap-1",
                    children: [
                      jsxRuntime.jsx("span", {
                        className: "text-[10px] font-bold text-[#b08a6a]",
                        children: "颜色：",
                      }),
                      COLOR_TYPES.map((c) =>
                        jsxRuntime.jsx(
                          "button",
                          {
                            type: "button",
                            "data-testid": `btn-decor-color-${o.id}-${c.id}`,
                            "aria-label": `选择${c.name}`,
                            onClick: () => a((u) => ({ ...u, [o.id]: c.id })),
                            className: `flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] ${l === c.id ? "border-[#ff6b81] ring-2 ring-[#ffb3c1]" : "border-[#e6cfae]"}`,
                            style: { backgroundColor: c.hex },
                            title: c.name,
                            children: jsxRuntime.jsx("span", { className: "emoji", children: c.emoji }),
                          },
                          c.id,
                        ),
                      ),
                    ],
                  }),
                ],
              },
              o.id,
            );
          },
        ),
      }),
    ],
  });
}

function FabricShopPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "fabric", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#fce4ec] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#ad1457]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🧵" }),
          " 布料的种类决定手缝衣服的花纹、颜色和材质；针线、纽扣、缎带是缝纫耗材。买回家后在「家 · 缝纫」页就能动手做衣服。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: MATERIALS.filter(
          (s) => FABRIC_TYPES[s.id] || s.id === "thread" || s.id === "button" || s.id === "ribbon",
        ).map((s) => {
          const a = n.home.materials[s.id] ?? 0,
            o = FABRIC_TYPES[s.id];
          return jsxRuntime.jsxs(
            "div",
            {
              className: `flex flex-col rounded-xl p-2 ${o ? "bg-[#fbf3e4]" : "bg-[#fdf3ff]"}`,
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-xl", children: s.emoji }),
                    jsxRuntime.jsxs("span", {
                      className: "num text-[10px] font-bold text-[#b08a6a]",
                      children: ["已有 x", a],
                    }),
                  ],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-0.5 text-xs font-black text-[#4a2c17]",
                  children: s.name,
                }),
                jsxRuntime.jsxs("p", {
                  className: "text-[9px] font-bold text-[#ad1457]",
                  children: [o ? `${o.colorName} · ${o.pattern}` : "缝纫耗材", " · ¥", s.price],
                }),
                jsxRuntime.jsxs("button", {
                  type: "button",
                  "data-testid": `btn-buy-fabric-${s.id}`,
                  "aria-label": `购买5份${s.name}，需要 ${s.price * 5} 元${n.coins < s.price * 5 ? "，金币不足" : ""}`,
                  onClick: () => e.onBuyMaterial(s.id, 5),
                  disabled: n.coins < s.price * 5,
                  className: "btn-chunky btn-xs btn-pink mt-1 w-full",
                  children: ["+5（¥", s.price * 5, "）"],
                }),
              ],
            },
            s.id,
          );
        }),
      }),
    ],
  });
}

function BookstorePage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "bookstore", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#f3e5f5] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#c62828]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "📖" }),
          " 买回家的书才会出现在家里的书架上；图书馆能借到的书也可以买回家慢慢读，芝士与慕斯、婚礼蛋糕、咖啡、外国菜四本进阶书只有书店有售。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "grid grid-cols-2 gap-1.5",
        children: BOOKS_GAME.map((s) => {
          const a = n.home.ownedBooks.includes(s.id);
          return jsxRuntime.jsxs(
            "div",
            {
              className: `flex flex-col rounded-xl bg-[#fbf3e4] p-2 ${a ? "opacity-70" : ""}`,
              children: [
                jsxRuntime.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [
                    jsxRuntime.jsx("span", { className: "emoji text-xl", children: s.emoji }),
                    a
                      ? jsxRuntime.jsx("span", {
                          className:
                            "rounded-full bg-[#e3f2fd] px-1.5 py-px text-[9px] font-bold text-[#c62828]",
                          children: "在家 ✓",
                        })
                      : s.library
                        ? jsxRuntime.jsx("span", {
                            className:
                              "rounded-full bg-[#fff3e0] px-1.5 py-px text-[9px] font-bold text-[#e65100]",
                            children: "可借阅",
                          })
                        : jsxRuntime.jsx("span", {
                            className:
                              "rounded-full bg-[#f3e5f5] px-1.5 py-px text-[9px] font-bold text-[#c62828]",
                            children: "仅书店",
                          }),
                  ],
                }),
                jsxRuntime.jsxs("p", {
                  className: "mt-0.5 line-clamp-1 text-xs font-black text-[#4a2c17]",
                  children: ["《", s.name, "》"],
                }),
                jsxRuntime.jsx("p", {
                  className: "mt-0.5 line-clamp-2 text-[10px] leading-relaxed text-[#b08a6a]",
                  children: s.desc,
                }),
                jsxRuntime.jsxs("p", {
                  className: "mt-0.5 text-[9px] font-bold text-[#6b4226]",
                  children: [
                    "¥",
                    s.price,
                    " · ",
                    jsxRuntime.jsx("span", { className: "emoji", children: "⚡" }),
                    s.energy,
                    " 精力",
                  ],
                }),
                jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": `btn-buy-book-${s.id}`,
                  "aria-label": a
                    ? `已购买《${s.name}》`
                    : `购买《${s.name}》，需要 ${s.price} 元${n.coins < s.price ? "，金币不足" : ""}`,
                  onClick: () => e.onBuyBook(s.id),
                  disabled: a || n.coins < s.price,
                  className: "btn-chunky btn-xs btn-yellow mt-1 w-full",
                  children: a ? "已购买" : `💰 ${s.price}`,
                }),
              ],
            },
            s.id,
          );
        }),
      }),
    ],
  });
}

function SupermarketPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, {
        store: "supermarket",
        ctx: e.ctx,
        openCats: e.openCats,
        onOpenCats: e.onOpenCats,
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#ede7f6] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#c62828]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏬" }),
          " 部分料理需要对应厨具才能制作，部分料理要持有指定厨具才能达成完美品质；用得越多，单件厨具熟练度越高，品质越稳定。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "space-y-1.5",
        children: COOKWARES.map((s) => {
          var l;
          const a = n.cookwares.includes(s.id),
            o = ((l = n.cookwareSkill) == null ? void 0 : l[s.id]) ?? 0;
          return jsxRuntime.jsxs(
            "div",
            {
              className: "flex gap-2.5 rounded-xl bg-[#fbf3e4] p-2.5",
              children: [
                jsxRuntime.jsx("div", {
                  className: "flex w-[20%] shrink-0 items-center justify-center",
                  children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: s.emoji }),
                }),
                jsxRuntime.jsxs("div", {
                  className: "min-w-0 flex-1",
                  children: [
                    jsxRuntime.jsxs("div", {
                      children: [
                        jsxRuntime.jsxs("p", {
                          className: "text-sm font-black text-[#4a2c17]",
                          children: [
                            s.name,
                            s.price === void 0
                              ? jsxRuntime.jsx("span", {
                                  className:
                                    "ml-1.5 rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[10px] font-black text-[#c62828]",
                                  children: "初始自带",
                                })
                              : a
                                ? jsxRuntime.jsx("span", {
                                    className:
                                      "ml-1.5 rounded-full bg-[#e3f2fd] px-2 py-0.5 text-[10px] font-black text-[#c62828]",
                                    children: "已拥有 ✓",
                                  })
                                : null,
                          ],
                        }),
                        jsxRuntime.jsx("p", { className: "text-[11px] text-[#b08a6a]", children: s.desc }),
                        jsxRuntime.jsxs("p", {
                          className: "text-[10px] font-bold text-[#c62828]",
                          children: [
                            jsxRuntime.jsx("span", { className: "emoji", children: "✨" }),
                            " 助完美：",
                            s.perfectFor,
                          ],
                        }),
                        a &&
                          jsxRuntime.jsxs("div", {
                            className: "mt-1",
                            children: [
                              jsxRuntime.jsxs("div", {
                                className:
                                  "flex justify-between text-[9px] font-bold text-[#b08a6a]",
                                children: [
                                  jsxRuntime.jsx("span", { children: "熟练度" }),
                                  jsxRuntime.jsxs("span", { className: "num", children: [o, "/100"] }),
                                ],
                              }),
                              jsxRuntime.jsx("div", {
                                className: "bar-track mt-0.5",
                                style: { height: 6 },
                                role: "progressbar",
                                "aria-valuemin": 0,
                                "aria-valuemax": 100,
                                "aria-valuenow": o,
                                "aria-label": `${s.name}熟练度 ${o}/100`,
                                children: jsxRuntime.jsx("div", {
                                  className: "bar-fill",
                                  style: {
                                    width: `${o}%`,
                                    background: "linear-gradient(90deg,#f8bbd0,#ec407a)",
                                  },
                                }),
                              }),
                            ],
                          }),
                      ],
                    }),
                    s.price !== void 0 &&
                      !a &&
                      jsxRuntime.jsx("div", {
                        className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                        children: jsxRuntime.jsxs("button", {
                          type: "button",
                          "data-testid": `btn-buy-cookware-${s.id}`,
                          "aria-label": `购买厨具${s.name}，需要 ${s.price} 元${n.coins < (s.price ?? 0) ? "，金币不足" : ""}`,
                          onClick: () => e.onBuyCookware(s.id),
                          disabled: n.coins < (s.price ?? 0),
                          className: "btn-chunky btn-xs btn-yellow",
                          children: [
                            jsxRuntime.jsx("span", {
                              className: "emoji",
                              "aria-hidden": "true",
                              children: "💰",
                            }),
                            " ",
                            s.price,
                          ],
                        }),
                      }),
                  ],
                }),
              ],
            },
            s.id,
          );
        }),
      }),
    ],
  });
}

function SujiShopPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "suji", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#fff8e1] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🍰" }),
          " 苏记甜品面包店是苏家的家族产业，家里人轮流在店里当班。累了坐下来吃份现烤甜点，补饱食、提心情。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "flex gap-3 rounded-xl border-2 border-[#ffc53d] bg-[#fffdf8] p-2.5",
        children: [
          jsxRuntime.jsx("div", {
            className: "flex w-[20%] shrink-0 items-center justify-center",
            children: jsxRuntime.jsx("span", {
              className: "text-2xl",
              children: jsxRuntime.jsx("span", { className: "emoji", children: "🍮" }),
            }),
          }),
          jsxRuntime.jsxs("div", {
            className: "min-w-0 flex-1",
            children: [
              jsxRuntime.jsxs("div", {
                children: [
                  jsxRuntime.jsx("p", {
                    className: "text-sm font-black text-[#b8860b]",
                    children: "现烤甜点配热茶",
                  }),
                  jsxRuntime.jsx("p", {
                    className: "text-[11px] text-[#b08a6a]",
                    children: "饱食 +35 · 心情 +5 · 精力 +4",
                  }),
                  jsxRuntime.jsxs("p", {
                    className: "text-[10px] font-bold text-[#6b4226]",
                    children: ["¥15 · 耗时 1 小时 · 当前饱食 ", n.satiety ?? 70, "/100"],
                  }),
                ],
              }),
              jsxRuntime.jsx("div", {
                className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                children: jsxRuntime.jsx("button", {
                  type: "button",
                  "data-testid": "btn-suji-eat",
                  onClick: () => {
                    const s = eatAtSuji(n);
                    e.commit(s.state, s.message, s.ok ? "success" : "error");
                  },
                  className: "btn-chunky btn-xs btn-yellow",
                  children: "来一份",
                }),
              }),
            ],
          }),
        ],
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "👨‍👩‍👧" }),
          " 在这里能碰到当班的苏家店员，想认识新朋友就进店逛逛。",
        ],
      }),
    ],
  });
}

function BankPage({ ctx: e }) {
  const { state: n } = e;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "bank", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#e3f2fd] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#0d47a1]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "🏦" }),
          " 银行活期存款每天日结 0.8% 利息（单日封顶 ¥50）。把钱存进来吃利息，随存随取，不收手续费。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 rounded-xl border-2 border-[#90caf9] bg-[#f5fcff] p-2.5 text-center",
        children: [
          jsxRuntime.jsxs("p", {
            className: "text-[11px] font-bold text-[#1565c0]",
            children: [jsxRuntime.jsx("span", { className: "emoji", children: "💳" }), " 活期存款"],
          }),
          jsxRuntime.jsxs("p", {
            className: "num text-3xl font-black text-[#0d47a1]",
            children: ["¥", n.bankSavings ?? 0],
          }),
          jsxRuntime.jsxs("p", {
            className: "mt-0.5 text-[10px] font-bold text-[#4fc3f7]",
            children: ["口袋现金 ¥", n.coins, " · 每天日结利息（封顶 ¥50/天）"],
          }),
        ],
      }),
      jsxRuntime.jsx("p", { className: "mb-1 text-xs font-black text-[#0d47a1]", children: "存入" }),
      jsxRuntime.jsx("div", {
        className: "mb-2 flex flex-wrap gap-1.5",
        children: [100, 500, 1e3, -1].map((s) =>
          jsxRuntime.jsx(
            "button",
            {
              type: "button",
              "data-testid": `btn-bank-dep-${s}`,
              "aria-label":
                s === -1
                  ? `存入全部口袋现金 ${n.coins} 元`
                  : `存入 ${s} 元${n.coins < s ? "，余额不足" : ""}`,
              onClick: () => {
                const a = s === -1 ? n.coins : s,
                  o = depositCoins(n, a);
                e.commit(o.state, o.message, o.ok ? "success" : "error");
              },
              disabled: n.coins <= 0,
              className: "btn-chunky btn-xs btn-blue",
              children: s === -1 ? "全部" : `¥${s}`,
            },
            s,
          ),
        ),
      }),
      jsxRuntime.jsx("p", { className: "mb-1 text-xs font-black text-[#0d47a1]", children: "取出" }),
      jsxRuntime.jsx("div", {
        className: "flex flex-wrap gap-1.5",
        children: [100, 500, 1e3, -1].map((s) =>
          jsxRuntime.jsx(
            "button",
            {
              type: "button",
              "data-testid": `btn-bank-wd-${s}`,
              "aria-label":
                s === -1
                  ? `取出全部存款 ${n.bankSavings ?? 0} 元`
                  : `取出 ${s} 元${(n.bankSavings ?? 0) < s ? "，存款不足" : ""}`,
              onClick: () => {
                const a = s === -1 ? (n.bankSavings ?? 0) : s,
                  o = withdrawCoins(n, a);
                e.commit(o.state, o.message, o.ok ? "success" : "error");
              },
              disabled: (n.bankSavings ?? 0) <= 0,
              className: "btn-chunky btn-xs btn-brown",
              children: s === -1 ? "全部" : `¥${s}`,
            },
            s,
          ),
        ),
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-[#fff3bf] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#b8860b]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 存钱不吃亏：利息按天结算，每天最多多拿 ¥50；取钱随时到账。何静白天在银行柜台上班。",
        ],
      }),
    ],
  });
}

const BOUQUET_PRICE = 30;

function FlowerShopPage({ ctx: e }) {
  const { state: n } = e,
    [s, a] = React.useState([]),
    o = (p) => {
      const y = checkoutCart(n, p);
      (e.commit(y.state, y.message, y.ok ? "success" : "error"), y.ok && a([]));
    },
    l = (n.carried ?? []).filter((p) => p.kind === "flower").reduce((p, y) => p + y.qty, 0),
    c = e.charm ?? 0,
    u = n.negotiation ?? 0,
    f = c >= FLOWER_SHOP_CHARM_MIN,
    g = u >= FLOWER_SHOP_NEGOTIATION_MIN,
    x = Math.min(FLOWER_SHOP_MAX_PRICE, FLOWER_SHOP_BASE_PRICE + Math.max(0, c - FLOWER_SHOP_CHARM_MIN)),
    m = (n.flowerShopPitchToday ?? 0) >= 1;
  return jsxRuntime.jsxs("div", {
    children: [
      jsxRuntime.jsx(StoreStaffSection, { store: "flower", ctx: e.ctx, openCats: e.openCats, onOpenCats: e.onOpenCats }),
      jsxRuntime.jsxs("p", {
        className:
          "mb-2 rounded-xl bg-[#fce4ec] px-2.5 py-1.5 text-[11px] font-bold leading-relaxed text-[#ad1457]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💐" }),
          " 花店是宋小雨开的：买束花当面送出，好感 +3。每束 ¥30，点「买」进购物篮，🧾 结算时花束会直接装进随身携带（身上满额则订购配送）。",
        ],
      }),
      jsxRuntime.jsxs("div", {
        className: "mb-2 flex items-center gap-2 rounded-xl bg-[#fff3f5] px-2.5 py-2",
        children: [
          jsxRuntime.jsx("span", {
            className: "text-xl",
            children: jsxRuntime.jsx("span", { className: "emoji", children: "🎒" }),
          }),
          jsxRuntime.jsxs("p", {
            className: "flex-1 text-[11px] font-black text-[#ad1457]",
            children: ["随身携带花束 × ", l, "（背包里还有 ", n.flowerBouquets ?? 0, " 束可装入）"],
          }),
        ],
      }),
      jsxRuntime.jsxs("button", {
        type: "button",
        "data-testid": "btn-flower-home",
        onClick: () =>
          a((p) => [
            ...p,
            { kind: "flower", refId: "bouquet", name: "花束", unitPrice: BOUQUET_PRICE, qty: 1 },
          ]),
        className: "btn-chunky btn-sm btn-pink w-full",
        children: [jsxRuntime.jsx("span", { className: "emoji", children: "💐" }), " 买一束花（¥30）"],
      }),
      jsxRuntime.jsxs("p", {
        className:
          "mt-2 rounded-xl bg-[#fff8f0] px-2.5 py-1.5 text-[10px] font-bold leading-relaxed text-[#a08030]",
        children: [
          jsxRuntime.jsx("span", { className: "emoji", children: "💡" }),
          " 花装进随身携带后，去公园、广场、商店街等 TA 在的地方，点伙伴卡片上的「",
          jsxRuntime.jsx("span", { className: "emoji", children: "💐" }),
          " 送花」当面送出；没带在身上可送不出去哦。",
        ],
      }),
      jsxRuntime.jsx("div", {
        className: "mt-2 rounded-xl border-2 border-[#f48fb1] bg-[#fff3f5] p-2.5",
        children: jsxRuntime.jsxs("div", {
          className: "flex gap-3",
          children: [
            jsxRuntime.jsx("div", {
              className: "flex w-[20%] shrink-0 items-center justify-center",
              children: jsxRuntime.jsx("span", { className: "emoji text-2xl", children: "🏡" }),
            }),
            jsxRuntime.jsxs("div", {
              className: "min-w-0 flex-1",
              children: [
                jsxRuntime.jsxs("div", {
                  children: [
                    jsxRuntime.jsx("p", {
                      className: "text-sm font-black text-[#ad1457]",
                      children: "推销阳台鲜花",
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[11px] text-[#b08a6a]",
                      children: [
                        "把自家阳台种的鲜花推销给花店：需要魅力 ≥ ",
                        FLOWER_SHOP_CHARM_MIN,
                        " 且交涉技能 ≥ ",
                        FLOWER_SHOP_NEGOTIATION_MIN,
                        "，魅力越高收购价越好（当前魅力 ",
                        c,
                        " / 交涉 ",
                        u,
                        "）",
                      ],
                    }),
                    jsxRuntime.jsxs("p", {
                      className: "text-[10px] font-bold text-[#6b4226]",
                      children: [
                        jsxRuntime.jsx("span", { className: "emoji", children: "💎" }),
                        " 预计每朵 ¥",
                        x,
                        " · 每日限 1 单 · 阳台鲜花 ",
                        n.homeFlowers ?? 0,
                        " 朵 · 成交后宋小雨好感 +3、交涉 +2",
                      ],
                    }),
                  ],
                }),
                jsxRuntime.jsx("div", {
                  className: "mt-1.5 flex flex-wrap items-center gap-1.5",
                  children: jsxRuntime.jsx("button", {
                    type: "button",
                    "data-testid": "btn-flower-pitch",
                    onClick: e.onPitchFlower,
                    disabled: !f || !g || m || (n.homeFlowers ?? 0) < 1 || n.energy < 8,
                    className: "btn-chunky btn-xs btn-pink",
                    children: m ? "今日已谈成一单" : f && g ? "推销 1 朵" : "魅力/交涉不足",
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      jsxRuntime.jsx(CartSummaryBar, { items: s, onCheckout: o }),
    ],
  });
}
