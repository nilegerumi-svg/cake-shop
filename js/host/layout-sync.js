
/* ===== 手写区 · 设备布局档位同步（v25） =====
   问题史：
   v23：父文档与 panel-frame iframe 各自用 @media(min-width:768px) 判断是否进入
        「PC 放大档」，但 iframe 的媒体查询视口是 iframe 自身宽度（比父容器窄 32~68px），
        于是 768×1024 平板、800×800 窄窗口出现「父页 html 32px / 帧 html 16px」混搭；
        手机横屏 844×390 因宽度 ≥768 被误判成 PC，内容区只剩 ~109px。
        方案：父页唯一决策（宽 ≥768 且高 ≥560），把结果写成 <html data-tm-wide> 同步给
        每个 panel-frame iframe 文档，iframe 侧改用 css/frame-wide.css 的属性选择器。

   v24（书本式横折 / 平板）：触屏设备展开态宽度 641~1024 横跨原 768 断点，实测
        767→768 只差 1px 字号却从 16px 翻到 32px、展开横屏内容区只剩 96px。
        方案：wide 收窄为「桌面鼠标专属」，新增 fold「宽屏触屏」档（16px 不放大 + 铺满）。

   v25（本次 · 翻盖式竖折 moto razr）：用户设备是 razr 系列，形态与书本式横折相反 ——
        内屏（展开）6.9~7.0" 2640x1080 / 2992x1224，22:9 细长，CSS 宽只有 360~412px，
        根本不会触发 fold(≥641)；外屏（合盖）3.6~4.0" 1056x1066 / 1272x1080，
        近似正方形的超矮屏，CSS 约 352x355 ~ 424x360。实测四个真实缺陷：
          ① 合盖外屏只要手动展开过一次顶栏，writeFlagPref 写入标记后 auto-collapse
             永久退出，再合盖顶栏 540px > 视口 355px、内容区 8px，游戏不可逆地不可玩；
          ② 外屏自动收起后 TopBarToolRow 整行不渲染，手册 / 设置入口 0/0 且无处可达；
          ③ 展开内屏顶栏 495px / 内容区 273px 头重脚轻，且 360→393 宽度仅差 33px
             顶栏却从 109px 跳到 495px（tight() 的 innerWidth<=360 硬阈值）；
          ④ 外屏顶栏 109 + 页签 104 吃掉 60% 高度，内容区仅 141px，楼层卡片竖排断字。
        方案：新增两个互斥档位，解决形态差异 ——
          compact「翻盖外屏 / 超矮触屏」：粗指针 + 高 ≤440
              → 顶栏页签压缩、弹窗占满、host 注入常驻功能入口、强制收起防死锁
          slim  「细长竖屏」：粗指针 + 高 ≥700 + 高宽比 ≥2.05
              → 温和压缩顶栏内部留白（不收起任何组、不隐藏任何按钮、入口常驻）
        优先级：compact > wide > fold > slim > phone，档位互斥，属性由父页唯一决策
        并同步到所有 panel-frame iframe 文档，避免上下层判定分叉（v23 的教训）。
        物理开合是连续尺寸变化且不重载页面，故保留 resize + orientationchange +
        visualViewport + 250ms 轮询四重触发。

   暴露：window.__cakeLayoutMode ('compact'|'wide'|'fold'|'slim'|'phone')、
        window.__cakeLayoutWide (v23 兼容，仅 wide 为 true)、window.__cakeLayoutFold、
        window.__cakeLayoutCompact、window.__cakeLayoutSlim。
========================================================================== */
(function () {
  var MQ_WIDE = '(min-width:768px) and (min-height:560px)';
  var MQ_FOLD = '(min-width:641px) and (min-height:560px)';
  function mq(q) { try { return window.matchMedia(q).matches; } catch (e) { return false; } }
  function coarse() {
    /* 粗指针 = 触屏。桌面无触屏设备 pointer:fine；带触屏的笔记本以主指针为准。 */
    try { return window.matchMedia('(pointer: coarse)').matches; } catch (e) { return false; }
  }
  function mode() {
    var isTouch = coarse();
    var w = window.innerWidth, h = window.innerHeight;
    if (isTouch && h <= 440) return 'compact';           /* 翻盖外屏 / 超矮横屏 */
    if (!isTouch && mq(MQ_WIDE)) return 'wide';          /* 桌面鼠标：保持既有放大档 */
    if (isTouch && mq(MQ_FOLD)) return 'fold';           /* 书本式折叠展开 / 平板触屏 */
    if (isTouch && h >= 700 && w > 0 && h / w >= 2.05) return 'slim';  /* 22:9 细长竖屏 */
    return 'phone';
  }
  function docs() {
    var list = [document.documentElement];
    var fs = document.querySelectorAll('iframe[data-testid^="panel-frame-"]');
    for (var i = 0; i < fs.length; i++) {
      try {
        var d = fs[i].contentDocument;
        /* about:blank / 未加载完的帧没有 #root，跳过，等下次扫描补上 */
        if (d && d.documentElement && d.getElementById('root')) list.push(d.documentElement);
      } catch (e) {}
    }
    return list;
  }
  var ATTRS = ['data-tm-wide', 'data-tm-fold', 'data-tm-compact', 'data-tm-slim'];
  function sync() {
    var m = mode();
    var active = (m === 'phone') ? null : 'data-tm-' + m;
    window.__cakeLayoutMode = m;
    window.__cakeLayoutWide = (m === 'wide');       /* v23 兼容 */
    window.__cakeLayoutFold = (m === 'fold');
    window.__cakeLayoutCompact = (m === 'compact');
    window.__cakeLayoutSlim = (m === 'slim');
    var ds = docs();
    for (var i = 0; i < ds.length; i++) {
      try {
        for (var k = 0; k < ATTRS.length; k++) {
          if (ATTRS[k] === active) ds[i].setAttribute(ATTRS[k], '1');
          else ds[i].removeAttribute(ATTRS[k]);
        }
      } catch (e) {}
    }
    return m;
  }
  sync();
  setInterval(sync, 250);
  window.addEventListener('resize', sync);
  window.addEventListener('orientationchange', function () { setTimeout(sync, 300); });
  /* 折叠屏物理展开 / 收起、软键盘弹起会改变可视视口，部分厂商不派发 window.resize */
  if (window.visualViewport && window.visualViewport.addEventListener) {
    window.visualViewport.addEventListener('resize', sync);
  }
})();
