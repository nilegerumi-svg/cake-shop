// js/host/panel-reader.js
// 盲人模式补充：面板切换时朗读该面板的开头内容（标签切换/操作播报由游戏自带 TTS 负责）
(function () {
    'use strict';
    if (window.__panelReaderInstalled) return;
    window.__panelReaderInstalled = true;

    function isBlind() {
        const c = document.getElementById('container');
        return !!(c && c.classList.contains('blind-mode'));
    }

    function speak(text) {
        if (!isBlind() || !text) return;
        try {
            if (!('speechSynthesis' in window)) return;
            const u = new SpeechSynthesisUtterance(String(text).replace(/\s+/g, ' ').trim().slice(0, 110));
            u.lang = 'zh-CN';
            u.rate = 1;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(u);
        } catch (_) {}
    }

    let lastKey = '';
    function readVisiblePanel() {
        if (!isBlind()) return;
        const frames = Array.from(document.querySelectorAll('iframe')).filter((f) => f.offsetWidth > 0);
        const f = frames[frames.length - 1];
        if (!f) return;
        const src = f.getAttribute('src') || '';
        let d = null;
        try { d = f.contentDocument; } catch (_) { return; }
        if (!d || !d.body) return;
        const text = (d.body.innerText || '').replace(/\s+/g, ' ').trim();
        if (!text) return;
        // 用 src + 前 20 字做去重键，避免同一面板重复朗读
        const key = src + '|' + text.slice(0, 20);
        if (key === lastKey) return;
        lastKey = key;
        // 去掉开头的图标/英文标签噪声，取一段可读正文
        const clean = text.replace(/^[A-Za-z0-9_\-\s·|]+/, '').trim();
        speak(clean || text);
    }

    // 面板切换会新建 iframe：监听 DOM 变化后延迟朗读
    const mo = new MutationObserver(() => {
        setTimeout(readVisiblePanel, 700);
    });
    try { mo.observe(document.body, { childList: true, subtree: true }); } catch (_) {}

    // 定时兜底（首次进入 / 面板内内容更新）
    setInterval(() => { if (isBlind()) readVisiblePanel(); }, 4000);

    // 供其他脚本手动触发
    window.readVisiblePanel = readVisiblePanel;
})();
