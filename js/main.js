// js/main.js
'use strict';

console.log('🚀 [Engine] main.js 引擎模块加载');

const ENGINE_STATES = Object.freeze({
    IDLE: 'idle',
    INITIALIZING: 'initializing',
    READY: 'ready',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
});

let currentState = ENGINE_STATES.IDLE;
let isReadyFired = false;
let initGeneration = 0;
let activeTask = null;

// js/main.js 中只改这一段
const MODULES = [
    { path: './data/index.js',    name: '🚦 正在加载配方与色彩数据' },
    { path: './core/index.js',    name: '🟱 正在加载底层渲染引擎' },
    { path: './time/index.js',    name: '🕒 正在加载时间系统' },
    { path: './actions/index.js', name: '🎮 正在加载地图与音乐动作' },
    { path: './shared.js',        name: '🟩 正在加载跨页面共享层' },
    { path: './monitor/index.js', name: '👁️ 正在加载全局监控中心' },  // ← 新增
    { path: './host/index.js',    name: '🏥 正在加载访客主体控制台' }
];

const TRANSITIONS = Object.freeze({
    [ENGINE_STATES.IDLE]: [ENGINE_STATES.INITIALIZING],
    [ENGINE_STATES.INITIALIZING]: [
        ENGINE_STATES.INITIALIZING,
        ENGINE_STATES.READY,
        ENGINE_STATES.FAILED,
        ENGINE_STATES.CANCELLED,
        ENGINE_STATES.IDLE
    ],
    [ENGINE_STATES.READY]: [],
    [ENGINE_STATES.FAILED]: [ENGINE_STATES.INITIALIZING, ENGINE_STATES.IDLE],
    [ENGINE_STATES.CANCELLED]: [ENGINE_STATES.INITIALIZING, ENGINE_STATES.IDLE]
});

const canTransitionTo = (target) => TRANSITIONS[currentState]?.includes(target) ?? false;

function makeCancelError(reason = 'INIT_CANCELLED') {
    const err = new Error(reason);
    err.__cancelled = true;
    return err;
}

function safeStringify(obj) {
    try {
        return JSON.stringify(obj, (_k, v) => {
            if (v instanceof Error) return { name: v.name, message: v.message };
            if (typeof v === 'bigint') return v.toString();
            if (typeof v === 'symbol') return v.toString();
            if (typeof v === 'function') return '[function]';
            return v;
        });
    } catch {
        try { return String(obj); } catch { return '[unserializable]'; }
    }
}

function defGlobal(key, value) {
    try {
        Object.defineProperty(window, key, {
            value, writable: false, configurable: true, enumerable: true
        });
        return;
    } catch (_) {}
    try { window[key] = value; } catch (e) {
        console.warn(`⚠️ [Engine] 无法定义全局 ${key}`, e);
    }
}

function syncGlobalState(error = null) {
    defGlobal('__engineState', currentState);
    defGlobal('__engineReady', currentState === ENGINE_STATES.READY);
    defGlobal('__engineFailed', currentState === ENGINE_STATES.FAILED);
    defGlobal('__engineError', error ? (error.message || String(error)) : null);
}

function transition(nextState, payload = null) {
    if (!canTransitionTo(nextState)) {
        console.error(`❌ [Engine] 非法状态转换: ${currentState} -> ${nextState}`);
        return false;
    }
    currentState = nextState;
    syncGlobalState(
        (nextState === ENGINE_STATES.FAILED || nextState === ENGINE_STATES.CANCELLED)
            ? payload : null
    );
    return true;
}

function emit(name, detail) {
    try { window.dispatchEvent(new CustomEvent(name, { detail })); }
    catch (e) { console.warn(`⚠️ [Engine] emit(${name}) 失败`, e); }
}

/* ============================================================
   defineGame —— 合并式，不覆盖 shared.js 已挂载的 Game 兼容层
   契约：
     - Game.state      → 游戏存档（由 shared.js 定义，禁止覆盖）
     - Game.getState() → 引擎状态（本模块提供，仅缺失时补充）
     - Game.version / Game.startedAt / Game.getEngineState → 引擎元信息
   ============================================================ */
function defineGame() {
    const existing = (window.Game && typeof window.Game === 'object') ? window.Game : {};

    const meta = {
        version: '1.0.0',
        startedAt: Date.now(),
        getEngineState: () => currentState,
        getState: () => currentState
    };

    for (const key of Object.keys(meta)) {
        if (key in existing) continue;
        try {
            Object.defineProperty(existing, key, {
                value: meta[key],
                writable: false,
                configurable: true,
                enumerable: true
            });
        } catch (_) {
            try { existing[key] = meta[key]; } catch (_) {}
        }
    }

    if (window.Game !== existing) {
        try {
            Object.defineProperty(window, 'Game', {
                value: existing,
                writable: false,
                configurable: true,
                enumerable: true
            });
        } catch (_) {
            try { window.Game = existing; } catch (e) {
                console.warn('⚠️ [Engine] 无法定义 window.Game', e);
            }
        }
    }
}

function ready() {
    if (currentState === ENGINE_STATES.READY) {
        if (isReadyFired) console.warn('⚠️ [Engine] ready() 已调用过');
        return false;
    }
    if (currentState !== ENGINE_STATES.INITIALIZING) {
        console.warn(`⚠️ [Engine] 非 INITIALIZING 状态禁止 ready(): ${currentState}`);
        return false;
    }

    defineGame();

    if (!transition(ENGINE_STATES.READY)) return false;

    isReadyFired = true;
    emit('game-ready', { state: ENGINE_STATES.READY, timestamp: Date.now() });
    console.log('✅ [Engine] 引擎就绪');
    return true;
}

function safeReady(task) {
    if (currentState !== ENGINE_STATES.INITIALIZING) return;
    if (task.isCancelled()) return;

    const fire = () => {
        if (task.isCancelled()) return;
        if (currentState === ENGINE_STATES.INITIALIZING) ready();
    };

    if (document.readyState === 'loading') {
        let done = false;
        const cleanup = () => {
            if (done) return;
            done = true;
            document.removeEventListener('DOMContentLoaded', onDOM);
            window.removeEventListener('load', onLoad);
        };
        const onDOM = () => { cleanup(); fire(); };
        const onLoad = () => { cleanup(); fire(); };
        document.addEventListener('DOMContentLoaded', onDOM, { once: true });
        window.addEventListener('load', onLoad, { once: true });
        task.addCleanup(cleanup);
    } else {
        fire();
    }
}

function markFailed(err, generation) {
    if (generation !== undefined && generation !== initGeneration) return false;
    if (currentState === ENGINE_STATES.READY) return false;
    if (currentState !== ENGINE_STATES.INITIALIZING) return false;

    let message = '', stack = '', normalized = err;
    if (err instanceof Error) {
        message = err.message; stack = err.stack || '';
    } else if (err && typeof err === 'object') {
        message = err.message || safeStringify(err);
        stack = err.stack || '';
        if (!(err instanceof Error)) {
            normalized = new Error(message);
            normalized.cause = err;
        }
    } else {
        message = String(err);
        normalized = new Error(message);
    }

    if (!transition(ENGINE_STATES.FAILED, normalized)) return false;

    emit('game-error', {
        error: normalized, message, stack,
        state: ENGINE_STATES.FAILED, timestamp: Date.now()
    });
    console.error('❌ [Engine] 初始化失败:', err);
    return true;
}

function createInitTask(generation) {
    let cancelled = false;
    const cleanups = [];
    const cancelHooks = new Set();

    const isCancelled = () =>
        cancelled || generation !== initGeneration || currentState === ENGINE_STATES.CANCELLED;

    const addCleanup = (fn) => {
        if (typeof fn !== 'function') return;
        if (isCancelled()) {
            try { fn(); } catch (e) { console.warn('⚠️ [Engine] cleanup error', e); }
            return;
        }
        cleanups.push(fn);
    };

    const addCancelHook = (fn) => {
        if (typeof fn !== 'function') return;
        if (cancelled) {
            try { fn(makeCancelError('INIT_CANCELLED')); } catch (_) {}
            return;
        }
        cancelHooks.add(fn);
    };

    const runCleanups = () => {
        while (cleanups.length) {
            try { cleanups.pop()(); } catch (e) { console.warn('⚠️ [Engine] cleanup error', e); }
        }
    };

    const cancel = (reason = 'INIT_CANCELLED') => {
        if (cancelled) return;
        cancelled = true;
        runCleanups();
        const err = makeCancelError(reason);
        for (const hook of cancelHooks) {
            try { hook(err); } catch (e) { console.warn('⚠️ [Engine] cancel hook error', e); }
        }
        cancelHooks.clear();
    };

    return {
        generation,
        get cancelled() { return isCancelled(); },
        cleanups, isCancelled, addCleanup, addCancelHook, cancel, runCleanups
    };
}

async function init() {
    if (currentState === ENGINE_STATES.READY) {
        console.warn('⚠️ [Engine] 已 READY，禁止重新 init，请刷新页面');
        return false;
    }

    const generation = ++initGeneration;

    if (activeTask) {
        const prev = activeTask;
        activeTask = null;
        prev.cancel('INIT_SUPERSEDED');
    }

    isReadyFired = false;

    if (!transition(ENGINE_STATES.INITIALIZING)) {
        console.error(`❌ [Engine] 无法进入 INITIALIZING: ${currentState}`);
        return false;
    }

    const task = createInitTask(generation);
    activeTask = task;

    const onCancelEvent = () => task.cancel('CANCEL_BY_EVENT');
    window.addEventListener('game-cancel-init', onCancelEvent, { once: true });
    task.addCleanup(() => window.removeEventListener('game-cancel-init', onCancelEvent));

    try {
        window.updateLoadingProgress?.('初始化引擎…', 5);

        for (let i = 0; i < MODULES.length; i++) {
            if (task.isCancelled()) return false;
            const mod = MODULES[i];
            const percent = 5 + Math.round((i / MODULES.length) * 85);
            window.updateLoadingProgress?.(`${mod.name} (${mod.path})…`, percent);
            await import(mod.path);
        }

        if (task.isCancelled()) return false;

        window.updateLoadingProgress?.('引擎就绪…', 95);
        safeReady(task);
        return true;

    } catch (err) {
        if (err && err.__cancelled) {
            if (task.generation !== initGeneration) return false;
            if (currentState === ENGINE_STATES.INITIALIZING) {
                if (transition(ENGINE_STATES.CANCELLED, err)) {
                    emit('game-cancelled', { generation: task.generation, reason: err.message });
                    console.log('ℹ️ [Engine] 初始化已取消');
                }
            }
            return false;
        }
        if (task.generation !== initGeneration) return false;
        markFailed(err, task.generation);
        return false;

    } finally {
        if (activeTask === task) {
            task.runCleanups();
            activeTask = null;
        }
    }
}

window.resetEngine = () => {
    if (currentState === ENGINE_STATES.READY) {
        console.warn('⚠️ [Engine] 已 READY，禁止 reset，请刷新页面');
        return false;
    }
    if (currentState === ENGINE_STATES.IDLE) return true;

    const prev = activeTask;
    activeTask = null;
    prev?.cancel('RESET');
    isReadyFired = false;

    if (!transition(ENGINE_STATES.IDLE)) {
        console.error(`❌ [Engine] reset 失败: ${currentState} -> ${ENGINE_STATES.IDLE}`);
        return false;
    }
    emit('game-reset', { timestamp: Date.now() });
    return true;
};

window.cancelEngineInit = () => {
    if (currentState !== ENGINE_STATES.INITIALIZING) return false;
    const task = activeTask;
    activeTask = null;
    const err = makeCancelError('MANUAL_CANCEL');
    task?.cancel('MANUAL_CANCEL');
    if (!transition(ENGINE_STATES.CANCELLED, err)) return false;
    emit('game-cancelled', { generation: initGeneration, reason: 'MANUAL_CANCEL' });
    return true;
};

init();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, ready, markFailed };
}
