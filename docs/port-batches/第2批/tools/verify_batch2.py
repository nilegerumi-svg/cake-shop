#!/usr/bin/env python3
# 第二批验证：带存档进主界面，确认 4 个桥、人物志 58 人、档案字段、隐藏关系门槛
import os, threading, glob, json, functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
R = BASE + "/clone/cake-shop"
save = json.load(open(BASE + "/play/save.json"))
class Q(SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
s = ThreadingHTTPServer(("127.0.0.1", 0), functools.partial(Q, directory=R))
port = s.server_address[1]
threading.Thread(target=s.serve_forever, daemon=True).start()
from playwright.sync_api import sync_playwright
exe = glob.glob("/root/.cache/ms-playwright/chromium*/chrome-linux/chrome")
with sync_playwright() as p:
    b = p.chromium.launch(headless=True, executable_path=exe[0] if exe else None,
        args=["--no-sandbox", "--disable-dev-shm-usage"])
    pg = b.new_page()
    pg.add_init_script("(()=>{const d=%s;for(const k in d){try{localStorage.setItem(k,d[k])}catch(e){}}})()" % json.dumps(save, ensure_ascii=False))
    errs, cons = [], []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: cons.append(m.text) if m.type == "error" else None)
    pg.goto(f"http://127.0.0.1:{port}/index.html", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_function("document.querySelector('#root')&&document.querySelector('#root').children.length>0", timeout=45000)
    try:
        pg.wait_for_function("window.__TM_BRIDGES_READY===true", timeout=20000)
        ready = True
    except Exception:
        ready = False
    pg.wait_for_timeout(1000)

    print("=== 加载 ===")
    print("  #root 挂载:", pg.evaluate("!!(document.querySelector('#root')&&document.querySelector('#root').children.length)"))
    print("  __TM_BRIDGES_READY:", ready)
    print("  pageerror:", len(errs))
    for e in errs[:6]: print("     !", e[:170])
    print("  console.error:", len(cons))
    for c in cons[:6]: print("     !", c[:170])

    print("\n=== 四个桥 ===")
    br = pg.evaluate("""()=>{
        const N=window.__TM_NPC__||[], I=window.__TM_ITEM_MAP__||{};
        return {
          npcLen:N.length,
          npcHasHidden:N.filter(n=>n.hiddenRels&&n.hiddenRels.length).length,
          npcHasRels:N.filter(n=>n.rels&&n.rels.length).length,
          npcHasGift:N.filter(n=>n.giftLine).length,
          itemLen:Object.keys(I).length,
          itemSample:I['macaron'], itemSample2:I['strawberry_cake'],
          aff:window.__TM_AFF_GET__?window.__TM_AFF_GET__():null,
          stateOk:window.__TM_STATE_GET__?!!window.__TM_STATE_GET__():false
        };}""")
    for k, v in br.items(): print(f"  {k:<18}", json.dumps(v, ensure_ascii=False)[:180])

    print("\n=== 打开人物志 ===")
    pg.evaluate("()=>document.getElementById('tm-people-btn').click()")
    pg.wait_for_timeout(600)
    info = pg.evaluate("""()=>{const w=document.getElementById('tm-people-panel');
        return {hidden:w.hidden, head:(w.textContent||'').trim().replace(/\\s+/g,' ').slice(0,110),
                rows:w.querySelectorAll('.tm-people-item').length,
                details:Array.from(w.querySelectorAll('.tm-people-detail')).slice(0,1)
                    .map(d=>(d.textContent||'').trim().replace(/\\s+/g,' ').slice(0,220))};}""")
    print("  ", json.dumps(info, ensure_ascii=False)[:600])

    print("\n=== 搜索「韩雅琴」验证长档案/隐藏关系入口 ===")
    pg.evaluate("""()=>{const i=document.querySelector('#tm-people-panel input');
        if(i){i.value='韩雅琴';i.dispatchEvent(new Event('input',{bubbles:true}));}}""")
    pg.wait_for_timeout(500)
    print("  ", pg.evaluate("""()=>{const w=document.getElementById('tm-people-panel');
        return (w.textContent||'').trim().replace(/\\s+/g,' ').slice(0,240);}"""))
    b.close()
s.shutdown()
