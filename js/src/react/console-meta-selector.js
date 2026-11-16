(function () {
  ((console.error = function (...e) {
    console.log("[console.error]", ...e);
  }),
    (console.warn = function (...e) {
      console.log("[console.warn]", ...e);
    }));
})();

(function () {
  if (
    typeof Promise < "u" &&
    typeof Symbol < "u" &&
    typeof Object.assign == "function" &&
    typeof window.requestAnimationFrame == "function"
  )
    return;
  const n = document.getElementById("root");
  throw (
    n &&
      (n.innerHTML =
        '<div style="min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px 24px;background:#fff7e6;color:#5d4037;font-family:system-ui,-apple-system,sans-serif;text-align:center;"><p style="font-size:20px;font-weight:800;margin:0;">浏览器版本过旧</p><p style="font-size:13px;line-height:1.7;margin:0;">当前浏览器无法运行游戏，请升级到最新版本（或换用手机/电脑上较新的浏览器）后再试。</p></div>'),
    new Error("Browser too old")
  );
})();

const BUILD_TIME_META_SELECTOR = 'meta[name="asap-build-time"]',
  fallbackString = (e, n) => (e !== void 0 && e !== "" ? e : n),
  getBuildTime = () => {
    var e;
    return ((e = document.querySelector(BUILD_TIME_META_SELECTOR)) == null ? void 0 : e.content) ?? "";
  },
  getArtifactId = () => {
    var e, n;
    try {
      return (
        ((n = (e = window.lingguang) == null ? void 0 : e._getArtifactId) == null
          ? void 0
          : n.call(e)) ?? ""
      );
    } catch {
      return "";
    }
  },
  getArtifactVersion = () => {
    var e, n;
    try {
      return (
        ((n = (e = window.lingguang) == null ? void 0 : e._getArtifactVersion) == null
          ? void 0
          : n.call(e)) ?? ""
      );
    } catch {
      return "";
    }
  },
  reportAppError = (e) => {
    const n = {
      type: "flash-app-error",
      ...e,
      message: fallbackString(e.message, "Unknown react error"),
      artifactId: fallbackString(e.artifactId, getArtifactId()),
      artifactVersion: fallbackString(e.artifactVersion, getArtifactVersion()),
      traceId: fallbackString(e.traceId, window.trace_id ?? ""),
      sessionId: fallbackString(e.sessionId, window._flashAppSessionId ?? ""),
      timestamp: e.timestamp ?? Date.now(),
      buildTime: fallbackString(e.buildTime, getBuildTime()),
    };
    window.parent !== window &&
      window.parent.postMessage({ type: "flash-app-error", payload: n }, "*");
  };

class RootErrorBoundary extends React.Component {
  state = { hasError: !1, message: "" };
  static getDerivedStateFromError(n) {
    return { hasError: !0, message: n instanceof Error ? n.message : String(n) };
  }
  componentDidCatch(n, s) {
    const a = s.componentStack ?? "";
    reportAppError({
      message: fallbackString(n.message, "Unknown react error"),
      ...(n.stack !== void 0 ? { stack: n.stack } : {}),
      ...(a !== "" ? { componentStack: a } : {}),
      errorType: "react-error-boundary",
    });
  }
  render() {
    return this.state.hasError
      ? jsxRuntime.jsxs("div", {
          style: {
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
            padding: "32px 24px",
            background: "#fff7e6",
            color: "#5d4037",
            fontFamily: "system-ui, -apple-system, sans-serif",
            textAlign: "center",
          },
          children: [
            jsxRuntime.jsx("p", {
              style: { fontSize: "22px", fontWeight: 800, margin: 0 },
              children: "游戏出了点小问题",
            }),
            jsxRuntime.jsxs("p", {
              style: { fontSize: "14px", lineHeight: 1.7, margin: 0 },
              children: [
                "可能是这次运行遇到意外状况。点下方按钮重新加载试试；",
                jsxRuntime.jsx("br", {}),
                "如果一直出现，请把页面提示发给开发者。",
              ],
            }),
            this.state.message !== "" &&
              jsxRuntime.jsx("p", {
                style: {
                  fontSize: "11px",
                  lineHeight: 1.5,
                  color: "#8d6e63",
                  background: "#fff",
                  border: "1px solid #efebe9",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  maxWidth: "100%",
                  wordBreak: "break-all",
                  margin: 0,
                },
                children: this.state.message.slice(0, 200),
              }),
            jsxRuntime.jsx("button", {
              type: "button",
              onClick: () => {
                try {
                  window.location.reload();
                } catch {
                  window.location.href = window.location.href;
                }
              },
              style: {
                marginTop: "6px",
                padding: "10px 28px",
                borderRadius: "999px",
                border: "0",
                background: "#8d6e63",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 700,
              },
              children: "重新加载",
            }),
          ],
        })
      : this.props.children;
  }
}

document.getElementById("root");

window.addEventListener("error", (e) => {
  const n = e.error ?? new Error(e.message ?? "unknown error");
  reportAppError({
    message: n instanceof Error && n.message !== "" ? n.message : String(n),
    ...(n instanceof Error && n.stack !== void 0 ? { stack: n.stack } : {}),
    errorType: "window-error",
  });
});

window.addEventListener("unhandledrejection", (e) => {
  const n = e.reason,
    s = n instanceof Error ? n : new Error(String(n));
  reportAppError({
    message: s.message,
    ...(s.stack !== void 0 ? { stack: s.stack } : {}),
    errorType: "unhandled-rejection",
  });
});

(async () => {
  try {
    await waitBridgeReady(800);
  } catch {}
  const e = document.getElementById("root");
  if (!e) throw new Error("Root element #root not found");
  try {
    ReactDOM.createRoot(e).render(
      jsxRuntime.jsx(React.StrictMode, { children: jsxRuntime.jsx(RootErrorBoundary, { children: jsxRuntime.jsx(GameApp, {}) }) }),
    );
  } catch (n) {
    (typeof globalThis.__instrumentedCatchMonitor == "function" &&
      globalThis.__instrumentedCatchMonitor(n),
      reportAppError({ message: n instanceof Error ? n.message : String(n), errorType: "mount-failed" }),
      e &&
        (e.innerHTML =
          '<div style="min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px 24px;background:#fff7e6;color:#5d4037;font-family:system-ui,-apple-system,sans-serif;text-align:center;"><p style="font-size:20px;font-weight:800;margin:0;">游戏启动出了点问题</p><p style="font-size:13px;line-height:1.7;margin:0;">请点击下方按钮重新加载试试；如果一直出现，请把页面提示发给开发者。</p><button type="button" onclick="window.location.reload()" style="margin-top:12px;padding:10px 28px;border-radius:999px;border:0;background:#8d6e63;color:#fff;font-size:15px;font-weight:700;">重新加载</button></div>'));
  }
})();
