(function () {
  var FRAME_ID = (document.documentElement.getAttribute("data-frame-id") || "");
  var reported = false;
  var savedFocus = null;

  // 子文档全局兜底：未捕获异常 / Promise 拒绝上报主框架（渲染错误由面板错误边界兜住）
  function reportError(msg) {
    try {
      window.parent.postMessage({ type: "flash-app-error", payload: { type: "flash-app-error", message: msg, errorType: "frame-window-error", frameId: FRAME_ID } }, "*");
    } catch (err) {}
  }
  window.addEventListener("error", function (ev) {
    var m = (ev && ev.error && ev.error.message) ? ev.error.message : (ev && ev.message ? ev.message : "unknown");
    reportError(m);
  });
  window.addEventListener("unhandledrejection", function (ev) {
    var r = ev && ev.reason;
    var m = (r && r.message) ? r.message : String(r);
    reportError(m);
  });

  function applyTheme(msg) {
    var p = (msg && msg.payload) || {};
    var root = document.documentElement;
    var container = document.getElementById("container");
    var night = !!p.night;
    var blind = !!p.blind;
    root.classList.toggle("night", night);
    if (typeof p.fontScale === "string" && p.fontScale !== "") {
      root.style.setProperty("--player-font-scale", p.fontScale);
    }
    if (typeof p.sysFontScale === "string" && p.sysFontScale !== "") {
      root.style.setProperty("--sys-font-scale", p.sysFontScale);
    }
    if (Array.isArray(p.a11yClasses)) {
      var sys = [];
      for (var i = 0; i < root.classList.length; i += 1) {
        var c = root.classList[i];
        if (c.indexOf("sys-") === 0) sys.push(c);
      }
      for (var j = 0; j < sys.length; j += 1) root.classList.remove(sys[j]);
      for (var k = 0; k < p.a11yClasses.length; k += 1) root.classList.add(p.a11yClasses[k]);
    }
    if (container) {
      container.classList.toggle("night", night);
      container.classList.toggle("blind-mode", blind);
    }
    if (!reported) {
      reported = true;
      try {
        window.parent.postMessage({ type: "frame:ready", frameId: FRAME_ID }, "*");
      } catch (err) {}
    }
  }

  window.addEventListener("message", function (ev) {
    var data = ev.data;
    if (!data || !data.type) return;
    if (data.type === "frame:theme") applyTheme(data);
    if (data.type === "frame:save-focus") {
      var ae = document.activeElement;
      savedFocus = (ae && ae !== document.body && ae.focus) ? ae : null;
    }
    if (data.type === "frame:restore-focus") {
      if (savedFocus && savedFocus.focus) {
        try { savedFocus.focus(); } catch (err) {}
      }
      savedFocus = null;
    }
  });

  document.addEventListener("pointerdown", function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    if (t.closest("[data-testid=\"blind-ask-banner\"]")) return;
    if (t.closest("button, input, select, textarea, a, [role=\"button\"], label")) return;
    try {
      window.parent.postMessage({ type: "frame:pointerdown" }, "*");
    } catch (err) {}
  }, true);

  // 输入框聚焦：被软键盘遮挡时滚到可视区中间（小程序/手机端防键盘挡字）
  document.addEventListener("focusin", function (ev) {
    var t = ev.target;
    if (!t || (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" && t.tagName !== "SELECT")) return;
    try {
      var rect = t.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < 0 || rect.bottom > vh) {
        t.scrollIntoView({ block: "center" });
      }
    } catch (err) {}
  }, true);

  // 双指触摸时禁止页面缩放（小程序 WebView 内双指缩放会打乱布局）
  document.addEventListener("touchmove", function (ev) {
    if (ev.touches && ev.touches.length > 1) ev.preventDefault();
  }, { passive: false });
})();