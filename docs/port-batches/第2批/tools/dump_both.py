#!/usr/bin/env python3
# 修正版：用 functools.partial 给每个服务绑定独立 directory，避免 chdir 互相污染
import threading, glob, json, functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
V = BASE + "/play"; R = BASE + "/clone/cake-shop"
save = json.load(open(V + "/save.json"))

def serve(d):
    class Q(SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Q, directory=d)
    s = ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s
s1, s2 = serve(V), serve(R)
from playwright.sync_api import sync_playwright
exe = glob.glob("/root/.cache/ms-playwright/chromium*/chrome-linux/chrome")
with sync_playwright() as p:
    b = p.chromium.launch(headless=True, executable_path=exe[0] if exe else None,
        args=["--no-sandbox", "--disable-dev-shm-usage"])
    v = b.new_page()
    v.add_init_script("(()=>{const d=%s;for(const k in d){try{localStorage.setItem(k,d[k])}catch(e){}}})()" % json.dumps(save, ensure_ascii=False))
    v.goto(f"http://127.0.0.1:{s1.server_address[1]}/index.html", wait_until="domcontentloaded", timeout=60000)
    v.wait_for_function("document.querySelector('#root')&&document.querySelector('#root').children.length>0", timeout=45000)
    v.wait_for_function("window.__TM_NPC__ && window.__TM_NPC__.length>0", timeout=20000)
    vd = v.evaluate("""()=>({title:document.title, npc:window.__TM_NPC__||[], item:window.__TM_ITEM_MAP__||{}})""")
    json.dump(vd, open("/tmp/v53_dump.json","w"), ensure_ascii=False)

    r = b.new_page()
    r.goto(f"http://127.0.0.1:{s2.server_address[1]}/index.html", wait_until="domcontentloaded", timeout=60000)
    try:
        r.wait_for_function("window.__cakeDataReady", timeout=30000); r.evaluate("()=>window.__cakeDataReady")
    except Exception: pass
    r.wait_for_timeout(400)
    rd = r.evaluate("""()=>{const C=window.Cake||{};
        return {title:document.title, NPCS:C.NPCS||{}, NPCS_GAME:C.NPCS_GAME||{},
                NPC_BACKSTORY:C.NPC_BACKSTORY||{}, INGREDIENTS_GAME:C.INGREDIENTS_GAME||{},
                RECIPES_GAME:C.RECIPES_GAME||{}, RECIPES:C.RECIPES||{}, ITEMS:C.ITEMS||[],
                allKeys:Object.keys(C)};}""")
    json.dump(rd, open("/tmp/repo_dump.json","w"), ensure_ascii=False)
    b.close()
s1.shutdown(); s2.shutdown()
print("v53  :", vd["title"][:40], "npc", len(vd["npc"]), "item", len(vd["item"]))
print("repo :", rd["title"][:40], "NPCS", len(rd["NPCS"]), "NPCS_GAME", len(rd["NPCS_GAME"]), "ING", len(rd["INGREDIENTS_GAME"]))
