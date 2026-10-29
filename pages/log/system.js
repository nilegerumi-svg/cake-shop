// pages/log/system.js
(() => {
    'use strict';

    const RUNTIME_MAX = 500;
    const RUNTIME_DISPLAY_MAX = 100;
    
    let runtimeLogs = [];
    let runtimeCollapsed = false;
    const runtimeBody = document.getElementById('runtimeBody');

    function el(tag, cls) {
        const node = document.createElement(tag);
        if (cls) node.className = cls;
        return node;
    }

    function renderRuntime() {
        if (!runtimeBody) return;
        runtimeBody.replaceChildren();

        if (runtimeLogs.length === 0) return;

        const wrap = el('div', 'runtime-group');
        const head = el('div', 'runtime-head');
        const title = el('span');
        title.textContent = '🛠️ 系统日志';

        const cnt = el('span', 'runtime-count');
        cnt.textContent = runtimeLogs.length + ' 条';

        const clearBtn = el('button', 'runtime-clear');
        clearBtn.type = 'button';
        clearBtn.textContent = '清空';
        clearBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            runtimeLogs = [];
            renderRuntime();
        });

        const arrow = el('span', 'runtime-arrow');
        arrow.textContent = runtimeCollapsed ? '▸' : '▾';
        head.append(title, cnt, clearBtn, arrow);

        const body = el('div', 'runtime-body');
        if (runtimeCollapsed) body.classList.add('hidden');

        const start = Math.max(0, runtimeLogs.length - RUNTIME_DISPLAY_MAX);
        for (let i = start; i < runtimeLogs.length; i++) {
            const item = runtimeLogs[i];
            const row = el('div', 'runtime-entry ' + (item.level || 'info'));
            const t = new Date(item.time || Date.now());
            const hh = String(t.getHours()).padStart(2, '0');
            const mm = String(t.getMinutes()).padStart(2, '0');
            const ss = String(t.getSeconds()).padStart(2, '0');
            row.textContent = `[${hh}:${mm}:${ss}] [${(item.level || 'info').toUpperCase()}] ${item.msg}`;
            body.appendChild(row);
        }

        head.addEventListener('click', () => {
            runtimeCollapsed = !runtimeCollapsed;
            body.classList.toggle('hidden', runtimeCollapsed);
            arrow.textContent = runtimeCollapsed ? '▸' : '▾';
        });

        wrap.append(head, body);
        runtimeBody.appendChild(wrap);
    }

    // 监听父页面通过 postMessage 发来的 console 镜像
    window.addEventListener('message', (e) => {
        if (e.origin !== location.origin) return;
        if (!e.data || typeof e.data !== 'object') return;

        if (e.data.type === 'log') {
            runtimeLogs.push({
                level: e.data.level || 'info',
                msg: String(e.data.msg == null ? '' : e.data.msg),
                time: e.data.time || Date.now()
            });
            if (runtimeLogs.length > RUNTIME_MAX) runtimeLogs.splice(0, runtimeLogs.length - RUNTIME_MAX);
            renderRuntime();
        } else if (e.data.type === 'clear') {
            runtimeLogs = [];
            renderRuntime();
        }
    });
})();
