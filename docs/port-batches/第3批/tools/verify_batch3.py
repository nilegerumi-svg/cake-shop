#!/usr/bin/env python3
# 第三批验证：8 道配方下沉、桥纯投影、既有数据不被覆盖、熟客簿写入实测
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
IDS = ['cashew_cake', 'peanut_cookie', 'almond_cookie', 'macaron',
       'walnut_bread', 'pistachio_icecream', 'scone_cuisine', 'tiramisu_cuisine']

with sync_playwright() as p:
    b = p.chromium.launch(headless=True, executable_path=exe[0] if exe else None,
        args=["--no-sandbox", "--disable-dev-shm-usage"])
    pg = b.new_page()
    pg.add_init_script("(()=>{const d=%s;for(const k in d){try{localStorage.setItem(k,d[k])}catch(e){}}})()" % json.dumps(save, ensure_ascii=False))
    errs, cons, dialogs = [], [], []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: cons.append(m.text) if m.type == "error" else None)
    pg.on("dialog", lambda d: (dialogs.append(d.message), d.accept()))
    pg.goto(f"http://127.0.0.1:{port}/index.html", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_function("document.querySelector('#root')&&document.querySelector('#root').children.length>0", timeout=45000)
    try:
        pg.wait_for_function("window.__TM_BRIDGES_READY===true", timeout=25000)
        ready = True
    except Exception:
        ready = False
    pg.wait_for_timeout(900)

    print("=== 加载 ===")
    print("  #root 挂载:", pg.evaluate("!!(document.querySelector('#root')&&document.querySelector('#root').children.length)"))
    print("  __TM_BRIDGES_READY:", ready)
    print("  pageerror:", len(errs), " console.error:", len(cons))
    for e in errs[:5]: print("     !", e[:160])
    for c in cons[:5]: print("     !", c[:160])

    print("\n=== 8 道配方下沉 ===")
    print(pg.evaluate("""(ids)=>{
        const C=window.Cake||{}, g=C.RECIPES_GAME||{};
        return {
          total:Object.keys(g).length,
          v53Key:!!C.RECIPES_GAME_V53,
          present:ids.filter(k=>!!g[k]).length,
          detail:ids.map(k=>g[k]? `${k}:${g[k].name}/ings${Object.keys(g[k].ings||{}).length}/cost${g[k].baseCost}`:`${k}:缺失`)
        };
    }""", IDS))

    print("\n=== 既有配方未被覆盖（保真抽查）===")
    print(pg.evaluate("""()=>{
        const g=(window.Cake||{}).RECIPES_GAME||{};
        return {banana_bread:g.banana_bread&&g.banana_bread.baseCost,
                honey_bread:g.honey_bread&&g.honey_bread.baseCost,
                说明:'仓库基准应为 70 / 65；若为 74 等则被 v53 调价覆盖'};
    }"""))

    print("\n=== 物品桥纯投影（8 项名称）===")
    print(pg.evaluate("""(ids)=>{
        const m=window.__TM_ITEM_MAP__||{};
        return {total:Object.keys(m).length,
                names:ids.map(k=>m[k]?`${k}→${m[k].name}`:`${k}→缺失`)};
    }""", IDS))

    print("\n=== 人物志仍可开 ===")
    print("  __TM_NPC__ 人数:", pg.evaluate("(window.__TM_NPC__||[]).length"))
    label = pg.evaluate("""()=>{
        const b=[...document.querySelectorAll('button')].find(x=>((x.getAttribute('aria-label')||'')+' '+(x.textContent||'')).includes('人物志'));
        if(!b) return null; b.click(); return b.getAttribute('aria-label')||b.textContent;
    }""")
    pg.wait_for_timeout(400)
    txt = pg.evaluate("document.body.innerText||''")
    print("  点击按钮:", label)
    print("  面板含「共 58 人」:", "共 58 人" in txt or "58 人" in txt)
    print("  面板含「芒果慕斯」:", "芒果慕斯" in txt)

    print("\n=== 熟客簿写入实测（第二批遗留）===")
    before = pg.evaluate("""()=>{
        const r=JSON.parse(localStorage.getItem('sweet-offline-saves')||'{}');const m=r.main||{};
        return {coins:m.coins, regulars:(m.regulars||[]).length};
    }""")
    print("  登记前存档:", before)
    pg.evaluate("document.querySelector('#tm-regs-btn')?.click()")
    pg.wait_for_timeout(350)
    btns = pg.evaluate("""()=>[...document.querySelectorAll('button')].filter(b=>(b.textContent||'').includes('登记 ¥5')).length""")
    print("  面板内「登记 ¥5」按钮数:", btns)
    if btns:
        pg.evaluate("""()=>{const b=[...document.querySelectorAll('button')].find(x=>(x.textContent||'').includes('登记 ¥5'));b&&b.click();}""")
        pg.wait_for_timeout(500)
    after = pg.evaluate("""()=>{
        const r=JSON.parse(localStorage.getItem('sweet-offline-saves')||'{}');const m=r.main||{};
        return {coins:m.coins, regulars:(m.regulars||[]).length};
    }""")
    print("  登记后存档:", after)
    print("  dialogs:", dialogs[:3])
    print("  结论:", "写入生效" if after != before else "写入未生效（改动落在临时副本，未落盘）")
    print("  pageerror 累计:", len(errs))

    b.close()
