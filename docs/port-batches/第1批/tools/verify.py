#!/usr/bin/env python3
# 第一批验证：本地 http 服务 + 无头浏览器打开克隆仓库的 index.html
# 只看三件事：零脚本错误、游戏正常挂载、新增悬浮面板按钮可访问
import os, sys, threading, subprocess, glob, time
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
R = BASE + "/clone/cake-shop"
os.chdir(R)

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

srv = ThreadingHTTPServer(("127.0.0.1", 0), Quiet)
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()

from playwright.sync_api import sync_playwright

# 探测 chromium
exe = None
for p in glob.glob("/root/.cache/ms-playwright/chromium*/chrome-linux/chrome") + \
         glob.glob("/root/.cache/ms-playwright/chromium*/chrome-linux64/chrome"):
    exe = p; break
if not exe:
    exe = subprocess.check_output("which chromium chromium-browser google-chrome 2>/dev/null | head -1", shell=True, text=True).strip() or None

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path=exe,
        args=["--no-sandbox", "--disable-dev-shm-usage"])
    pg = browser.new_page()
    errs, cons = [], []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: cons.append(m.text) if m.type == "error" else None)
    pg.goto(f"http://127.0.0.1:{port}/index.html", wait_until="domcontentloaded", timeout=60000)
    try:
        pg.wait_for_function("document.querySelector('#root') && document.querySelector('#root').children.length>0", timeout=45000)
        mounted = True
    except Exception:
        mounted = False
    pg.wait_for_timeout(2500)

    print("=== 加载结果 ===")
    print("  #root 挂载:", "是" if mounted else "否")
    print("  pageerror:", len(errs))
    for e in errs[:8]: print("     !", e[:180])
    print("  console.error:", len(cons))
    for c in cons[:8]: print("     !", c[:180])

    print("\n=== 新增悬浮面板按钮（无障碍标签）===")
    for bid, label in [("tm-people-btn", "人物志"), ("tm-wall-btn", "文案墙"), ("tm-regs-btn", "熟客簿")]:
        info = pg.evaluate("""(id)=>{const e=document.getElementById(id);
            if(!e) return null;
            return {text:(e.textContent||'').trim().slice(0,20),
                    aria:e.getAttribute('aria-label'),
                    visible:!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)};}""", bid)
        print(f"  {label:<8}({bid:<16})", info if info else "未挂载")

    print("\n=== 数据桥（仓库 bundle 现状）===")
    bridges = pg.evaluate("""()=>{const ks=['__TM_NPC__','__TM_ITEM_MAP__','__TM_LONG_PROFILES__','__TM_AFF_GET__','__TM_WALL_SCROLL__'];
        const o={};for(const k of ks){o[k]=(k in window)?typeof window[k]:'缺失';}return o;}""")
    for k, v in bridges.items(): print(f"  {k:<24}{v}")

    print("\n=== 新增样式表是否生效 ===")
    for f in ["people.css", "wall.css", "pc-hover.css"]:
        n = pg.evaluate("""(f)=>[...document.styleSheets].filter(s=>(s.href||'').includes(f)).length""", f)
        print(f"  css/{f:<16}{'已加载' if n else '未加载'}")

    browser.close()

srv.shutdown()
