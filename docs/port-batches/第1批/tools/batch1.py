#!/usr/bin/env python3
# 第一批移植：把 v53 新增且仓库缺独立文件的 7 个手写只读块，
# 按仓库既有层级 css/ + js/host/ 落成独立文件，并接进 index.html。
# 原则：块正文逐字取自 v53，不改写、不重排；仓库既有成果一律不动。
import re, os, json, hashlib

BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
V53  = BASE + "/play/index.html"
R    = BASE + "/clone/cake-shop"
PORT = BASE + "/port"

# (块 id, 标签, 仓库内落点, index.html 接线行)
TARGETS = [
    ("tm-people-style",  "style",  "css/people.css",            '<link rel="stylesheet" href="css/people.css">'),
    ("tm-people-script", "script", "js/host/people.js",          '<script id="tm-people-script" src="js/host/people.js"></script>'),
    ("tm-wall-style",    "style",  "css/wall.css",              '<link rel="stylesheet" href="css/wall.css">'),
    ("tm-wall-script",   "script", "js/host/wall.js",            '<script id="tm-wall-script" src="js/host/wall.js"></script>'),
    ("tm-pc-hover",      "style",  "css/pc-hover.css",           '<link rel="stylesheet" href="css/pc-hover.css">'),
    ("tm-pc-input",      "script", "js/host/pc-input.js",        '<script id="tm-pc-input" src="js/host/pc-input.js"></script>'),
    ("tm-long-profiles", "script", "js/host/long-profiles.js",   '<script id="tm-long-profiles" src="js/host/long-profiles.js"></script>'),
]

html = open(V53, encoding="utf-8").read()
start = html.find('<style id="tm-safe-area-env">')
assert start > 0, "未找到手写可读区起点"
tail = html[start:]
pat = re.compile(r'<(style|script)\s+id="(tm-[^"]+)"[^>]*>(.*?)</\1>', re.S | re.I)
found = {}
for m in pat.finditer(tail):
    found[m.group(2)] = (m.group(1), m.group(3))

# 备份原 index.html 到工作区（不进仓库）
idx_path = R + "/index.html"
idx = open(idx_path, encoding="utf-8").read()
open(PORT + "/index.before-batch1.html", "w", encoding="utf-8", newline="\n").write(idx)

report = []
for bid, tag, land, wire in TARGETS:
    assert bid in found, "v53 中找不到块 " + bid
    got_tag, body = found[bid]
    assert got_tag == tag, f"{bid} 标签不符: {got_tag} != {tag}"
    dest = os.path.join(R, land)
    assert not os.path.exists(dest), "落点已存在，拒绝覆盖: " + land
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    # 正文逐字保留，仅统一行尾为 LF、确保单个结尾换行
    text = body.replace("\r\n", "\n").replace("\r", "\n")
    with open(dest, "w", encoding="utf-8", newline="\n") as f:
        f.write(text.rstrip("\n") + "\n")
    h = hashlib.sha256(re.sub(r"\s+", "", body).encode()).hexdigest()[:10]
    report.append(dict(id=bid, tag=tag, landing=land, bytes=len(text.encode()), norm_sha=h[:10]))

# 接线：插在 body 尾部既有 host 脚本之后，保持 v53 的相对顺序
anchor = '<script src="js/host/panel-reader.js"></script>'
assert anchor in idx, "index.html 接线锚点不存在"
if 'js/host/people.js' in idx:
    print("已接过错，跳过接线")
else:
    wires = "\n".join(t[3] for t in TARGETS)
    idx = idx.replace(anchor, anchor + "\n" + wires, 1)
    with open(idx_path, "w", encoding="utf-8", newline="\n") as f:
        f.write(idx)

json.dump(report, open(PORT + "/batch1-report.json", "w"), ensure_ascii=False, indent=1)
print("=== 第一批落地 ===")
for r in report:
    print(f"  {r['id']:<22} -> {r['landing']:<30}{r['bytes']:>7} B")
print("\nindex.html 已接线 7 行；原文件备份于 port/index.before-batch1.html")
