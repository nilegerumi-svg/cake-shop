#!/usr/bin/env python3
# 第四批验证：126 项定价跟进、ge 引用一致性、既有字段未污染、游戏链路端到端
import os, threading, glob, json, functools
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
BASE = "/root/.codebuddy/artifact/2f8a7d30-9c21-4f0b-1d71-08fab29ed000"
R = BASE + "/clone/cake-shop"
save = json.load(open(BASE + "/play/save.json"))
patch = json.load(open("/tmp/basecost_patch.json"))

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
    pg.wait_for_function("window.__TM_BRIDGES_READY===true", timeout=25000)
    pg.wait_for_timeout(900)

    print("=== 加载 ===")
    print("  #root 挂载:", pg.evaluate("!!(document.querySelector('#root')&&document.querySelector('#root').children.length)"))
    print("  pageerror:", len(errs), " console.error:", len(cons))
    for e in errs[:5]: print("     !", e[:160])
    for c in cons[:5]: print("     !", c[:160])

    print("\n=== 126 项定价是否全部生效 ===")
    res = pg.evaluate("""(patch)=>{
        const g=(window.Cake||{}).RECIPES_GAME||{};
        let ok=0, bad=[], miss=[];
        for(const id of Object.keys(patch)){
            if(!g[id]){miss.push(id);continue;}
            if(g[id].baseCost===patch[id]) ok++;
            else bad.push(id+':'+g[id].baseCost+'≠'+patch[id]);
        }
        return {total:Object.keys(g).length, patchCount:Object.keys(patch).length,
                applied:ok, bad:bad.slice(0,5), miss:miss.slice(0,5),
                patchKey:!!(window.Cake||{}).RECIPE_BASECOST_V53};
    }""", patch)
    print(" ", res)

    print("\n=== bundle 取数时序（静态证据，纯读取不写值）===")
    # 不改动任何数据：ge = window.Cake.RECIPES_GAME 是引用赋值，
    # 且 app-01.js 首行 await window.__cakeDataReady 保证 bundle 在数据层之后执行。
    print(pg.evaluate("""()=>{
        const g=window.Cake.RECIPES_GAME;
        return {定价补丁已挂:!!window.Cake.RECIPE_BASECOST_V53,
                主表对象存在:!!g, 配方数:Object.keys(g||{}).length,
                说明:'ge 为引用赋值；覆盖发生在 await __cakeDataReady 之后、bundle 执行之前'};
    }"""))

    print("\n=== 抽样：新价 / 未受影响项（与补丁逐项比对）===")
    print(pg.evaluate("""(patch)=>{
        const g=window.Cake.RECIPES_GAME;
        const ids=['vanilla_cake','chocolate_cake','cappuccino','blueberry_cake',
                   'banana_bread','honey_bread','macaron','cashew_cake'];
        return ids.map(k=>{
            const cur=g[k]&&g[k].baseCost, exp=patch[k];
            return k+'='+cur+(exp!==undefined?(cur===exp?' ✓新价':' ✗期望'+exp):' (不在补丁内)');
        });
    }""", patch))

    print("\n=== 其它字段未被污染（抽查几个已调价配方）===")
    print(pg.evaluate("""()=>{
        const g=window.Cake.RECIPES_GAME;
        return ['vanilla_cake','scone','tiramisu'].map(k=>{
            const o=g[k]||{};
            return k+': ings='+JSON.stringify(o.ings)+' shelfDays='+o.shelfDays+' unlockCost='+o.unlockCost+' category='+o.category;
        });
    }"""))

    print("\n=== 第三批成果无回归 ===")
    print(pg.evaluate("""()=>{
        const C=window.Cake||{}, g=C.RECIPES_GAME||{};
        return {配方总数:Object.keys(g).length,
                第三批8道:['cashew_cake','peanut_cookie','almond_cookie','macaron','walnut_bread','pistachio_icecream','scone_cuisine','tiramisu_cuisine'].filter(k=>g[k]).length,
                npc桥:(window.__TM_NPC__||[]).length,
                物品桥:Object.keys(window.__TM_ITEM_MAP__||{}).length};
    }"""))

    print("\n=== 零错误复核 ===")
    print("  pageerror:", len(errs), " console.error:", len(cons))
    b.close()
