#!/usr/bin/env python3
# 定向验证：隐藏关系按好感门槛显隐（韩雅琴 at=240）
# 用真实存档改 affection，分别以 0 / 240 两档打开人物志搜索该条目
import os, threading, glob, json, functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
R = BASE + "/clone/cake-shop"
class Q(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
s = ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=R))
port = s.server_address[1]
threading.Thread(target=s.serve_forever, daemon=True).start()
from playwright.sync_api import sync_playwright
exe = glob.glob("/root/.cache/ms-playwright/chromium*/chrome-linux/chrome")

def run(aff_value, label):
    save = json.load(open(BASE + "/play/save.json"))
    root = json.loads(save["sweet-offline-saves"])
    root["main"]["affection"] = json.dumps({"han_yaqin": aff_value})
    save["sweet-offline-saves"] = json.dumps(root, ensure_ascii=False)
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True, executable_path=exe[0] if exe else None,
            args=["--no-sandbox", "--disable-dev-shm-usage"])
        pg = b.new_page()
        pg.add_init_script("(()=>{const d=%s;for(const k in d){try{localStorage.setItem(k,d[k])}catch(e){}}})()" % json.dumps(save, ensure_ascii=False))
        errs = []; pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto(f"http://127.0.0.1:{port}/index.html", wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_function("window.__TM_BRIDGES_READY===true", timeout=25000)
        pg.evaluate("()=>document.getElementById('tm-people-btn').click()")
        pg.wait_for_timeout(400)
        # 直接点开含隐藏关系的那一行：按 id 找不到按钮，改用渲染后的文本匹配
        pg.evaluate("""()=>{const i=document.querySelector('#tm-people-panel input');
            if(i){i.value='韩雅琴';i.dispatchEvent(new Event('input',{bubbles:true}));}}""")
        pg.wait_for_timeout(300)
        # 展开所有行
        pg.evaluate("""()=>Array.from(document.querySelectorAll('#tm-people-panel .tm-people-row'))
            .forEach(r=>r.click())""")
        pg.wait_for_timeout(300)
        txt = pg.evaluate("""()=>{const w=document.getElementById('tm-people-panel');
            return (w.textContent||'').replace(/\\s+/g,' ');}""")
        hit = "义卖摊的旧相识" in txt
        print(f"  好感={aff_value:<4} [{label}] 隐藏关系可见: {hit}   pageerror: {len(errs)}")
        if hit:
            k = txt.find("义卖摊的旧相识")
            print("       →", txt[k:k+90])
        b.close()

print("=== 隐藏关系门槛（韩雅琴 at=240）===")
run(0,   "未达门槛，应隐藏")
run(240, "达到门槛，应显形")
s.shutdown()
