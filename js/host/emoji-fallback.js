/* ===== 手写区 · 线性图标降级（v28）=====
   问题：部分浏览器 / WebView / 桌面 Linux 没有彩色 emoji 字体，
   界面上几百个 .emoji 图标会显示成空白方框（豆腐块），九宫格状态、
   时间胶囊、食材卡片尤其明显。

   方案：用项目自带的 Material Icons 字体（css/fonts/material-icons.woff2，
   随包分发，不依赖系统字体）做替代。检测、标注、同步全部在本文件完成，
   CSS 规则在 css/icon-fallback.css，父页与 pages/* iframe 同时引入。

   设计约束（重要）：
   1) 绝不改 DOM 结构、绝不移动节点 —— 本项目所有界面由共享作用域里的
      React 渲染，手动搬节点会与虚拟 DOM 打架（此前踩过白屏）。
   2) 全部用「加属性 + 属性选择器」实现，切回彩色表情时只需移除
      <html data-tm-icon-line>，界面原样恢复，零副作用。
   3) 原 emoji 字符从文本节点的 nodeValue 里摘掉（不增删节点），原值存在
      节点对象上，切回彩色表情时完整写回；「🍬甜味」这类混合内容的中文
      标签自然保留，不丢信息。CSS 只负责用 ::before 画图标。
   4) 检测只用 canvas 像素法。document.fonts.check('Noto Color Emoji')
      在缺字体的环境仍返回 true（实测），不可靠。

   暴露：window.__cakeEmojiSupported / __cakeIconLine / __cakeIconStyle，
        window.__cakeSetIconStyle('auto'|'emoji'|'line')（设置中心调用）。
   偏好键：localStorage['sweet-icon-style']，缺省 auto。
========================================================================== */
(function () {
  'use strict';

  var PREF_KEY = 'sweet-icon-style';
  var ATTR_LINE = 'data-tm-icon-line';
  var ATTR_STYLE = 'data-tm-icon-style';
  var RE_EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/u;
  var RE_EMOJI_ALL = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}]/gu;
  /* 裸文本里要替换掉的彩色 emoji（含 ZWJ 组合与变体选择符），
     不含 ✕ ✓ ✂ ⚠ 这类常见文本符号，避免误伤。 */
  var RE_LOOSE = /(?:[\u{1F300}-\u{1FAFF}]\uFE0F?)(?:\u200D(?:[\u{1F300}-\u{1FAFF}]\uFE0F?))*/gu;
  var BULLET = '◆';

  /* ---- 1. 彩色 emoji 支持检测（canvas 像素法）---- */
  function supportsColorEmoji() {
    try {
      var c = document.createElement('canvas');
      c.width = c.height = 40;
      var ctx = c.getContext('2d', { willReadFrequently: true });
      if (!ctx) return true;                 /* 拿不到 2d 上下文：宁可不降级 */
      ctx.textBaseline = 'top';
      ctx.font = '32px sans-serif';
      ctx.fillStyle = '#000';
      var probes = ['\u{1F389}', '\u{1F3C5}', '\u{1F353}', '\u{1F4B0}'];
      for (var i = 0; i < probes.length; i++) {
        ctx.clearRect(0, 0, 40, 40);
        ctx.fillText(probes[i], 0, 0);
        var d = ctx.getImageData(0, 0, 40, 40).data;
        var colored = 0;
        for (var j = 0; j < d.length; j += 4) {
          if (d[j + 3] < 20) continue;
          var mx = Math.max(d[j], d[j + 1], d[j + 2]);
          var mn = Math.min(d[j], d[j + 1], d[j + 2]);
          if (mx - mn > 24) colored++;
        }
        if (colored >= 12) return true;     /* 有彩色像素 => 有彩色 emoji 字体 */
      }
      return false;                          /* 全灰阶 => 豆腐块 / 黑白轮廓 */
    } catch (e) {
      return true;                           /* 检测异常时不降级，避免误伤 */
    }
  }

  function pref() {
    try {
      var v = localStorage.getItem(PREF_KEY);
      return (v === 'emoji' || v === 'line') ? v : 'auto';
    } catch (e) { return 'auto'; }
  }

  var supported = supportsColorEmoji();
  var lineActive = false;

  /* ---- 2. Unicode 区段分类兜底（与 gen_icon_css.py 的 CAT 一致）---- */
  function catOf(cp) {
    if (cp >= 0x1F340 && cp <= 0x1F37F) return 'food';
    if (cp >= 0x1F950 && cp <= 0x1F9C2) return 'food';
    if (cp >= 0x1FAD0 && cp <= 0x1FADF) return 'food';
    if (cp >= 0x1F330 && cp <= 0x1F33F) return 'plant';
    if (cp >= 0x1F400 && cp <= 0x1F43F) return 'animal';
    if (cp >= 0x1F980 && cp <= 0x1F9AF) return 'animal';
    if (cp >= 0x1F450 && cp <= 0x1F45F) return 'cloth';
    if (cp >= 0x1F460 && cp <= 0x1F487) return 'cloth';
    if (cp >= 0x1F9E0 && cp <= 0x1F9EF) return 'cloth';
    if (cp >= 0x1FA70 && cp <= 0x1FA8F) return 'cloth';
    if (cp >= 0x1F3E0 && cp <= 0x1F3F0) return 'home';
    if (cp >= 0x1F6C0 && cp <= 0x1F6CF) return 'home';
    if (cp >= 0x1FA90 && cp <= 0x1FAAF) return 'home';
    if (cp >= 0x1F600 && cp <= 0x1F64F) return 'mood';
    if (cp >= 0x1F680 && cp <= 0x1F6FF) return 'travel';
    if ((cp >= 0x2600 && cp <= 0x26FF) || (cp >= 0x1F300 && cp <= 0x1F32F)) return 'weather';
    if (cp >= 0x1F4C0 && cp <= 0x1F4DF) return 'doc';
    if (cp >= 0x1F500 && cp <= 0x1F5FF) return 'tool';
    if (cp >= 0x1F380 && cp <= 0x1F3CF) return 'award';
    if ((cp >= 0x1F490 && cp <= 0x1F49F) || cp === 0x2764) return 'heart';
    if (cp >= 0x1F900 && cp <= 0x1F9FF) return 'food';
    return 'misc';
  }

  function firstEmoji(text) {
    var m = RE_EMOJI.exec(text);
    RE_EMOJI.lastIndex = 0;
    return m ? m[0] : null;
  }

  /* ---- 3. 标注 + 清理 .emoji ----
     早期版本只用 CSS font-size:0 隐藏原 emoji，但本项目 iframe 有自己的
     字体放大体系（#container / text-2xl 等），优先级压过了隐藏规则，
     原 emoji 字符仍显示成豆腐块。改为直接把 emoji 字符从**现有文本节点**
     里摘掉（只赋 nodeValue，绝不增删节点，React 安全），原值存在节点对象上，
     切回彩色表情时完整写回。混合内容「🍬甜味」会自然留下「甜味」，不丢标签。 */
  function spanSource(el) {
    var parts = [];
    for (var k = 0; k < el.childNodes.length; k++) {
      var t = el.childNodes[k];
      if (t.nodeType === 3) parts.push(t.__tmOrig !== undefined ? t.__tmOrig : (t.nodeValue || ''));
      else parts.push(t.textContent || '');
    }
    return parts.join('');
  }

  function restoreTextNodes(el) {
    for (var k = 0; k < el.childNodes.length; k++) {
      var t = el.childNodes[k];
      if (t.nodeType === 3 && t.__tmOrig !== undefined) {
        try { t.nodeValue = t.__tmOrig; } catch (e) {}
        delete t.__tmOrig;
      }
    }
  }

  function markSpans(doc, on) {
    var list = doc.querySelectorAll('.emoji');
    for (var i = 0; i < list.length; i++) {
      var el = list[i];
      if (!on) {
        restoreTextNodes(el);
        el.removeAttribute('data-tm-e');
        el.removeAttribute('data-tm-ecat');
        el.removeAttribute('data-tm-noicon');
        continue;
      }
      /* 回收 React 新写入的文本：降级时我们已把 emoji 从 nodeValue 摘掉并存进
         __tmOrig；但 React 复用同一个 <span>、只把文本换成新 emoji（😄→🙂）时，
         它按虚拟 DOM 写入完整新文本，__tmOrig 却还停在旧值。若不刷新，下面
         spanSource 仍按旧 __tmOrig 算 key（图标不换），新 emoji 也残留成方框。
         这正是「连续游玩后旧图标 + 空方框」的根因。检测到 nodeValue 里重新出现
         emoji，就把 __tmOrig 更新为当前真实文本。 */
      for (var k0 = 0; k0 < el.childNodes.length; k0++) {
        var t0 = el.childNodes[k0];
        if (t0.nodeType !== 3) continue;
        var v0 = t0.nodeValue || '';
        if (RE_EMOJI.test(v0)) { RE_EMOJI.lastIndex = 0; t0.__tmOrig = v0; }
      }
      /* 每次都从「原文」重算 key，React 换内容时图标也跟着换 */
      var e = firstEmoji(spanSource(el));
      if (!e) { el.setAttribute('data-tm-noicon', '1'); continue; }
      var key = e.replace(/[\uFE0E\uFE0F\u200D]/g, '');
      if (!key) { el.setAttribute('data-tm-noicon', '1'); continue; }
      el.setAttribute('data-tm-e', key);
      el.setAttribute('data-tm-ecat', catOf(key.codePointAt(0)));
      el.removeAttribute('data-tm-noicon');
      /* 只改文本节点的 nodeValue，中文标签原样留着。
         以 __tmOrig（已刷新的最新原文）为准重算，避免残留新写入的 emoji。 */
      for (var k = 0; k < el.childNodes.length; k++) {
        var t = el.childNodes[k];
        if (t.nodeType !== 3) continue;
        var orig = t.__tmOrig !== undefined ? t.__tmOrig : (t.nodeValue || '');
        var next = orig.replace(RE_EMOJI_ALL, '').replace(/[\uFE0E\uFE0F\u200D]/g, '');
        if (next !== (t.nodeValue || '')) {
          try { t.nodeValue = next; } catch (err) {}
        }
      }
    }
  }

  /* ---- 4. 裸文本 emoji 前缀（「🌙 夜间」等装饰前缀）----
     只在降级时替换成 ◆；原始值存在节点对象上，切回彩色表情时完整恢复。
     不改节点归属，React 用 nodeValue= 更新时天然幂等。 */
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, OPTION: 1, TITLE: 1, NOSCRIPT: 1 };
  function textNodes(doc, on) {
    if (lineActive !== on) return;
    var w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    var n;
    while ((n = w.nextNode())) {
      var p = n.parentNode;
      if (!p) continue;
      if (SKIP_TAGS[p.nodeName]) continue;
      if (p.closest && p.closest('.emoji')) continue;   /* 由 ::before 处理 */
      var v = n.nodeValue || '';
      if (!v) continue;
      if (on) {
        if (n.__tmOrig !== undefined) {
          /* 同上：React 更新了已处理的裸文本节点，nodeValue 又出现 emoji 时
             刷新原文，让下面的删除逻辑对新内容重新生效。 */
          if (!RE_EMOJI.test(v)) continue;
          RE_EMOJI.lastIndex = 0;
          n.__tmOrig = v;
        }
        if (!/[\u{1F300}-\u{1FAFF}]/u.test(v)) continue;
        var orig = v;
        /* 裸文本里的 emoji 都是「装饰前缀 + 中文标签 / 数字」，直接删掉最干净：
           「🌙 关灯」→「关灯」、「💰30」→「30」。删完若为空才留一个中性菱形，
           避免按钮变成空白。切勿替换成 ◆ 铺满全屏，视觉上比豆腐块还吵。 */
        var next = v.replace(RE_LOOSE, '').replace(/^[\s\uFE0E\uFE0F\u200D]+/, '');
        if (!next.trim()) next = BULLET;
        if (next !== orig) {
          n.__tmOrig = orig;
          try { n.nodeValue = next; } catch (e) {}
        }
      } else {
        if (n.__tmOrig === undefined) continue;
        try { n.nodeValue = n.__tmOrig; } catch (e) {}
        delete n.__tmOrig;
      }
    }
  }

  /* ---- 5. 文档枚举与属性同步 ---- */
  function docs() {
    var out = [document];
    var fs = document.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for (var i = 0; i < fs.length; i++) {
      try {
        var d = fs[i].contentDocument;
        if (d && d.documentElement && d.body && d.getElementById('root')) out.push(d);
      } catch (e) {}
    }
    return out;
  }

  var bound = new WeakSet();
  function bindObserver(doc) {
    if (bound.has(doc)) return;
    bound.add(doc);
    try {
      var pending = null;
      var obs = new MutationObserver(function () {
        if (pending) return;
        pending = setTimeout(function () {
          pending = null;
          if (lineActive) { markSpans(doc, true); textNodes(doc, true); }
        }, 24);
      });
      obs.observe(doc.body, { childList: true, subtree: true, characterData: true });
    } catch (e) {}
  }

  function apply(force) {
    var p = pref();
    var want = (p === 'line') || (p === 'auto' && !supported);
    var changed = (want !== lineActive);
    lineActive = want;
    window.__cakeEmojiSupported = supported;
    window.__cakeIconLine = want;
    window.__cakeIconStyle = p;

    var ds = docs();
    for (var i = 0; i < ds.length; i++) {
      var d = ds[i];
      try {
        var h = d.documentElement;
        if (want) h.setAttribute(ATTR_LINE, '1'); else h.removeAttribute(ATTR_LINE);
        h.setAttribute(ATTR_STYLE, p);
      } catch (e) {}
      if (want) bindObserver(d);
      /* 无条件执行：iframe 是 React 动态创建的，首次出现在 docs() 时
         changed/force 都是 false；若只在 changed||force 时处理，新帧里的
         「🌙 关灯」「📦 待送达」和食材图标永远漏掉，方框就留在界面上。
         两个函数自身幂等（已处理节点带 __tmOrig），重复调用无副作用。 */
      markSpans(d, want);
      textNodes(d, want);
    }
    return want;
  }

  window.__cakeSetIconStyle = function (mode) {
    try {
      if (mode === 'auto') localStorage.removeItem(PREF_KEY);
      else if (mode === 'emoji' || mode === 'line') localStorage.setItem(PREF_KEY, mode);
      else return window.__cakeIconLine;
    } catch (e) {}
    return apply(true);
  };

  apply(true);
  /* iframe 由 React 动态创建 / 切换，定时补漏；React 重渲染覆盖标注时也靠它补回 */
  setInterval(function () { apply(false); }, 400);
  window.addEventListener('resize', function () { apply(false); });
  window.addEventListener('storage', function (e) {
    if (e.key === PREF_KEY) apply(true);
  });
})();
