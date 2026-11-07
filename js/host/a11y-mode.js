// js/host/a11y-mode.js
// 无障碍语音模式（盲人辅助）：TTS 播报日志/操作 + 常驻开关
(function () {
    'use strict';
    const KEY = 'sweet-blind-mode';
    let enabled = false;
    try { enabled = window.localStorage.getItem(KEY) === '1'; } catch (_) {}

    const supported = (typeof window !== 'undefined') && ('speechSynthesis' in window) && (typeof window.SpeechSynthesisUtterance === 'function');

    const speak = (text) => {
        if (!enabled || !text || !supported) return;
        try {
            const clean = String(text).replace(/\s+/g, ' ').trim().slice(0, 160);
            if (!clean) return;
            const u = new SpeechSynthesisUtterance(clean);
            u.lang = 'zh-CN';
            u.rate = 1;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(u);
        } catch (_) {}
    };

    const updateBtn = () => {
        const b = document.getElementById('a11yToggle');
        if (!b) return;
        b.setAttribute('aria-pressed', String(enabled));
        b.setAttribute('aria-label', enabled ? '关闭无障碍语音播报' : '开启无障碍语音播报');
        b.textContent = enabled ? '🔊 语音开' : '🔈 语音关';
    };

    const toggle = () => {
        enabled = !enabled;
        try { window.localStorage.setItem(KEY, enabled ? '1' : '0'); } catch (_) {}
        updateBtn();
        if (enabled) speak('无障碍语音模式已开启，接下来会播报操作与事件。');
        else { try { window.speechSynthesis.cancel(); } catch (_) {} }
        try { window.dispatchEvent(new CustomEvent('a11y-mode-change', { detail: { enabled } })); } catch (_) {}
        return enabled;
    };

    window.A11y = {
        speak: speak,
        announce: speak,
        toggle: toggle,
        get enabled() { return enabled; },
        get supported() { return supported; }
    };

    // 常驻浮动开关（不受 header 重渲染影响）
    const mount = () => {
        if (document.getElementById('a11yToggle')) { updateBtn(); return; }
        const b = document.createElement('button');
        b.id = 'a11yToggle';
        b.type = 'button';
        b.style.cssText = 'position:fixed;right:12px;bottom:72px;z-index:60;background:#fffdf8;border:1px solid #f0dcc0;border-radius:14px;padding:6px 10px;font-size:12px;font-weight:bold;color:#4a2c17;cursor:pointer;box-shadow:0 2px 8px rgba(180,120,60,.18);font-family:inherit;';
        b.addEventListener('click', toggle);
        document.body.appendChild(b);
        updateBtn();
    };

    // 页面就绪后挂载
    if (document.body) mount();
    else document.addEventListener('DOMContentLoaded', mount);

    // 钩子：把日志与播报串联
    const hookLog = () => {
        const Cake = window.Cake;
        if (Cake && typeof Cake.addLog === 'function' && !Cake.__a11yHooked) {
            Cake.__a11yHooked = true;
            const orig = Cake.addLog;
            Cake.addLog = function (msg) {
                try { speak(msg); } catch (_) {}
                return orig.apply(this, arguments);
            };
        }
        if (typeof window.sendLog === 'function' && !window.__a11ySendHooked) {
            window.__a11ySendHooked = true;
            const origSend = window.sendLog;
            window.sendLog = function (msg, level) {
                if (level !== 'warn' && level !== 'error') { try { speak(msg); } catch (_) {} }
                return origSend.apply(this, arguments);
            };
        }
    };
    const iv = setInterval(() => {
        if (window.Cake && typeof window.Cake.addLog === 'function') { hookLog(); clearInterval(iv); }
    }, 500);
    setTimeout(hookLog, 4000);

    // 子页面可通过 postMessage 请求播报
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'a11y-announce') speak(e.data.text);
    });

    // 启动时若已开启，主动播报一次
    if (enabled) setTimeout(() => speak('无障碍语音模式已开启'), 1800);
})();
