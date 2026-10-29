// js/pages/error-handler.js
(function () {
    'use strict';

    // 1. 捕获同步 JS 报错
    window.addEventListener('error', (e) => {
        handleError(e.message || '未知的脚本错误', e.filename, e.lineno);
    }, true);

    // 2. 捕获 Promise 异步报错
    window.addEventListener('unhandledrejection', (e) => {
        handleError(e.reason?.message || String(e.reason) || '未处理的 Promise 异常');
    });

    // 3. 核心处理函数
    function handleError(msg, file, line) {
        console.error('[子页面崩溃]', msg, file, line);

        // ① 通知父页面（让顶部显示红条）
        if (window.parent && window.parent !== window) {
            try {
                window.parent.postMessage({
                    type: 'log',
                    level: 'error',
                    msg: `[页面异常] ${msg}`,
                    time: Date.now()
                }, '*');
            } catch (_) {}
        }

        // ② 在子页面内显示友好的错误遮罩，防止大白屏
        showFriendlyError(msg);
    }

    function showFriendlyError(msg) {
        // 如果已经有遮罩了，就不重复建
        if (document.getElementById('page-error-overlay')) return;

        const div = document.createElement('div');
        div.id = 'page-error-overlay';
        div.style.cssText = `
            position: fixed; inset: 0; z-index: 9999;
            background: rgba(255, 240, 245, 0.95);
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 20px; text-align: center; color: #c81e3f; font-family: sans-serif;
        `;
        div.innerHTML = `
            <div style="font-size: 40px; margin-bottom: 15px;">🍰💥</div>
            <h2 style="margin: 0 0 10px 0; font-size: 18px;">哎呀，小店出了点状况</h2>
            <p style="font-size: 13px; color: #666; max-width: 300px; word-break: break-all;">
                ${msg}
            </p>
            <button onclick="window.location.reload()" style="
                margin-top: 20px; padding: 10px 24px; border: none; border-radius: 50px;
                background: #ff8fa3; color: white; font-size: 15px; font-weight: bold;
                cursor: pointer; box-shadow: 0 4px 10px rgba(255,143,163,0.4);
            ">重新加载页面</button>
        `;
        document.body.appendChild(div);
    }

    // 4. 暴露一个安全执行器（供页面主动包裹高危代码）
    window.CakeSafe = {
        run: function (fn, context = '操作') {
            try {
                return fn();
            } catch (err) {
                handleError(`${context}失败: ${err.message}`);
                return null;
            }
        }
    };
})();
