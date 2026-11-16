#!/usr/bin/env python3
# 比对 v53 手写可读区 与 仓库 css/ js/host/ js/boot/ 的既有文件
# 目的：确定「第一批移植」到底该搬哪些块（只看事实，不做推断）
import re, os, hashlib, json

BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
V53 = BASE + "/play/index.html"
R   = BASE + "/clone/cake-shop"

html = open(V53, encoding="utf-8").read()
start = html.find('<style id="tm-safe-area-env">')
tail = html[start:] if start > 0 else html

pat = re.compile(r'<(style|script)\s+id="(tm-[^"]+)"[^>]*>(.*?)</\1>', re.S | re.I)
blocks = []
for m in pat.finditer(tail):
    tag, bid, body = m.group(1), m.group(2), m.group(3)
    blocks.append(dict(tag=tag, id=bid, raw=len(body), n=len(re.sub(r"\s+", "", body)),
                       h=hashlib.sha256(re.sub(r"\s+", "", body).encode()).hexdigest()[:10],
                       head=re.sub(r"\s+", " ", body.strip())[:56]))

def norm(s):
    return re.sub(r"\s+", "", s)

repo = {}
for d in ("css", "js/host", "js/boot"):
    p = os.path.join(R, d)
    for f in sorted(os.listdir(p)):
        fp = os.path.join(p, f)
        if os.path.isfile(fp):
            s = open(fp, encoding="utf-8", errors="replace").read()
            repo[d + "/" + f] = dict(size=len(s), n=len(norm(s)),
                                     h=hashlib.sha256(norm(s).encode()).hexdigest()[:10])

# v53 手写块 -> 仓库层级的既有落点（按仓库已验证的命名）
LANDING = {
 "tm-safe-area-env": "css/safe-area.css",
 "tm-device-adapt":  "css/device-adapt.css",
 "tm-pc-layout":     "css/pc-layout.css",
 "tm-auto-collapse": "js/host/auto-collapse.js",
 "tm-a11y-style":    "css/a11y.css",
 "tm-a11y":          "js/host/a11y.js",
 "tm-hide-scrollbar":"css/hide-scrollbar.css",
 "tm-panel-autofit": "js/host/panel-autofit.js",
 "tm-open-tip-style":"css/open-tip.css",
 "tm-open-tip-script":"js/host/open-tip.js",
 "tm-people-style":  "css/people.css",
 "tm-people-script": "js/host/people.js",
 "tm-wall-style":    "css/wall.css",
 "tm-wall-script":   "js/host/wall.js",
 "tm-pc-hover":      "css/pc-hover.css",
 "tm-pc-input":      "js/host/pc-input.js",
 "tm-long-profiles": "js/host/long-profiles.js",
}

print("=== v53 手写块 -> 仓库落点 ===")
print(f"{'块 id':<24}{'类型':<8}{'字符':>7}  {'落点':<30}状态")
rows = []
for b in blocks:
    land = LANDING.get(b["id"], "(无既有落点)")
    r = repo.get(land)
    if r is None:
        state = "仓库缺文件 → 第一批候选"
    elif r["h"] == b["h"]:
        state = "已一致"
    else:
        state = f"内容不同 (仓库 {r['n']} / v53 {b['n']})"
    print(f"{b['id']:<24}{b['tag']:<8}{b['n']:>7}  {land:<30}{state}")
    rows.append(dict(**b, landing=land, state=state))
print(f"\n共 {len(blocks)} 个手写块")

print("\n=== 仓库里有、v53 手写区没直接对应的文件 ===")
landed = {v["landing"] for v in rows}
for k, v in repo.items():
    if k not in landed:
        print(f"  {k:<34}{v['size']:>8} B")

json.dump(dict(blocks=rows, repo=repo), open(BASE + "/port/diff.json", "w"), ensure_ascii=False, indent=1)
print("\n事实表已存 port/diff.json")
