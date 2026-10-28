// js/main.js
'use strict';

console.log('🚀 [Engine] main.js 引擎模块加载');

// ==================== 状态机定义 ====================
const ENGINE_STATES = Object.freeze({
    IDLE: 'idle',
    INITIALIZING: 'initializing',
    READY: 'ready',
    FAILED: 'failed',
    CANCELLED: 'cancelled'
});

// ==================== 唯一状态真相 ====================
let currentState = ENGINE_STATES.IDLE;
let isReadyFired = false;
let initGeneration = 0;

// 当前初始化任务
let activeTask = null;

// ==================== 业务模块清单 ====================
// ⚠️ 不要 import './monitor.js'，那是启动器，会循环导入
const MODULES = [
    { path: './data/index.js',    name: '🚦 正在加载配方与色彩数据' },
    { path: './core/index.js',    name: '🟱 正在加载底层渲染引擎' },
    { path: './time/index.js',    name: '🕒 正在加载时间系统' },
    { path: './actions/index.js', name: '🎮 正在加载地图与音乐动作' },
    { path: './shared.js',        name: '🟩 正在加载跨页面共享层' },
    { path: './host/index.js',    name: '🏥 正在加载访客主体控制台' }
];

// ==================== 合法状态转移表 ====================
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

const canTransitionTo = (target) =>
    TRANSITIONS[currentState]?.includes(target) ?? false;

// ==================== 取消错误 ====================
function makeCancelError(reason = 'INIT_CANCELLED') {
    const err = new Error(reason);
    err.__cancelled = true;
    return err;
}

// ==================== 安全序列化 ====================
// 函数 replacer：支持嵌套对象、Error、BigInt、Symbol、Function
function safeStringify(obj) {
    try {
        return JSON.stringify(obj, (_k, v) => {
            if (v instanceof Error) {
                return { name: v.name, message: v.message };
            }
            if (typeof v === 'bigint') return v.toString();
            if (typeof v === 'symbol') return v.toString();
            if (typeof v === 'function') return '[function]';
            return v;
        });
    } catch {
        try { return String(obj); } catch { return '[unserializable]'; }
    }
}

// ==================== 全局状态同步（只读视图） ====================
function defGlobal(key, value) {
    try {
        Object.defineProperty(window, key, {
            value,
            writable: false,
            configurable: true,
            enumerable: true
        });
        return;
    } catch { /* 降级 */ }

    try {
        window[key] = value;
    } catch (e) {
        console.warn(`⚠️ [Engine] 无法定义全局 ${key}`, e);
    }
}

function syncGlobalState(error = null) {
    defGlobal('__engineState', currentState);
    defGlobal('__engineReady', currentState === ENGINE_STATES.READY);
    defGlobal('__engineFailed', currentState === ENGINE_STATES.FAILED);
    defGlobal(
        '__engineError',
        error ? (error.message || String(error)) : null
    );
}

// ==================== 统一状态转移 ====================
function transition(nextState, payload = null) {
    if (!canTransitionTo(nextState)) {
        console.error(`❌ [Engine] 非法状态转换: ${currentState} -> ${nextState}`);
        return false;
    }

    currentState = nextState;

    // FAILED / CANCELLED 都保留原因，方便外部排查
    syncGlobalState(
        (nextState === ENGINE_STATES.FAILED ||
         nextState === ENGINE_STATES.CANCELLED)
            ? payload
            : null
    );
    return true;
}

// ==================== 事件工具 ====================
function emit(name, detail) {
    try {
        window.dispatchEvent(new CustomEvent(name, { detail }));
    } catch (e) {
        console.warn(`⚠️ [Engine] emit(${name}) 失败`, e);
    }
}

// ==================== Game 定义 ====================
function defineGame() {
    const game = Object.seal({
        version: '1.0.0',
        startedAt: Date.now(),
        get state() {
            return currentState;
        },
        getState: () => currentState
    });

    try {
        Object.defineProperty(window, 'Game', {
            value: game,
            writable: false,
            configurable: true,
            enumerable: true
        });
    } catch {
        try {
            window.Game = game;
        } catch (e) {
            console.warn('⚠️ [Engine] 无法定义 window.Game', e);
        }
    }
}

// ==================== ready ====================
function ready() {
    if (currentState === ENGINE_STATES.READY) {
        if (isReadyFired) {
            console.warn('⚠️ [Engine] ready() 已调用过');
        }
        return false;
    }

    if (currentState !== ENGINE_STATES.INITIALIZING) {
        console.warn(`⚠️ [Engine] 非 INITIALIZING 状态禁止 ready(): ${currentState}`);
        return false;
    }

    // 先定义 Game，避免 transition 成功后 Game 定义失败导致状态/事件不一致
    defineGame();

    if (!transition(ENGINE_STATES.READY)) return false;

    isReadyFired = true;

    emit('game-ready', {
        state: ENGINE_STATES.READY,
        timestamp: Date.now()
    });

    console.log('✅ [Engine] 引擎就绪');
    return true;
}

// ==================== safeReady（防死锁） ====================
function safeReady(task) {
    if (currentState !== ENGINE_STATES.INITIALIZING) return;
    if (task.isCancelled()) return;

    const fire = () => {
        if (task.isCancelled()) return;
        if (currentState === ENGINE_STATES.INITIALIZING) {
            ready();
        }
    };

    if (document.readyState === 'loading') {
        let done = false;

        const cleanup = () => {
            if (done) return;
            done = true;
            document.removeEventListener('DOMContentLoaded', onDOM);
            window.removeEventListener('load', onLoad);
        };

        const onDOM = () => {
            cleanup();
            fire();
        };

        const onLoad = () => {
            cleanup();
            fire();
        };

        document.addEventListener('DOMContentLoaded', onDOM, { once: true });
        window.addEventListener('load', onLoad, { once: true });

        // addCleanup 内部处理"已取消则立即执行"的竞态
        task.addCleanup(cleanup);
    } else {
        fire();
    }
}

// ==================== markFailed ====================
function markFailed(err, generation) {
    // generation 守卫：旧任务不得污染新任务
    if (generation !== undefined && generation !== initGeneration) return false;
    if (currentState === ENGINE_STATES.READY) return false;
    if (currentState !== ENGINE_STATES.INITIALIZING) return false;

    let message = '';
    let stack = '';
    let normalized = err;

    if (err instanceof Error) {
        message = err.message;
        stack = err.stack || '';
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
        error: normalized,
        message,
        stack,
        state: ENGINE_STATES.FAILED,
        timestamp: Date.now()
    });

    console.error('❌ [Engine] 初始化失败:', err);
    return true;
}

// ==================== 初始化任务 ====================
function createInitTask(generation) {
    let cancelled = false;
    const cleanups = [];
    const cancelHooks = new Set();

    const isCancelled = () =>
        cancelled ||
        generation !== initGeneration ||
        currentState === ENGINE_STATES.CANCELLED;

    // 已取消则立即执行，避免 cleanup 泄漏
    const addCleanup = (fn) => {
        if (typeof fn !== 'function') return;
        if (isCancelled()) {
            try {
                fn();
            } catch (e) {
                console.warn('⚠️ [Engine] cleanup error', e);
            }
            return;
        }
        cleanups.push(fn);
    };

    // 已取消则立即以取消错误回调
    const addCancelHook = (fn) => {
        if (typeof fn !== 'function') return;
        if (cancelled) {
            try {
                fn(makeCancelError('INIT_CANCELLED'));
            } catch { /* ignore */ }
            return;
        }
        cancelHooks.add(fn);
    };

    const runCleanups = () => {
        while (cleanups.length) {
            try {
                cleanups.pop()();
            } catch (e) {
                console.warn('⚠️ [Engine] cleanup error', e);
            }
        }
    };

    // 不返回 rejected Promise，避免 unhandledrejection；
    // 通过 cancelHooks 让挂起的 await 以 __cancelled 错误结束
    const cancel = (reason = 'INIT_CANCELLED') => {
        if (cancelled) return;
        cancelled = true;
        runCleanups();

        const err = makeCancelError(reason);
        for (const hook of cancelHooks) {
            try {
                hook(err);
            } catch (e) {
                console.warn('⚠️ [Engine] cancel hook error', e);
            }
        }
        cancelHooks.clear();
    };

    return {
        generation,
        get cancelled() {
            return isCancelled();
        },
        cleanups,
        isCancelled,
        addCleanup,
        addCancelHook,
        cancel,
        runCleanups
    };
}

// ==================== init ====================
// 返回值语义：
//   true  —— 初始化流程已启动（真正"就绪"以 game-ready 事件为准）
//   false —— 已被拒绝 / 被取消 / 失败，或已处于 READY
async function init() {
    if (currentState === ENGINE_STATES.READY) {
        console.warn('⚠️ [Engine] 已 READY，禁止重新 init，请刷新页面');
        return false;
    }

    const generation = ++initGeneration;

    // 真取消上一个任务
    if (activeTask) {
        const prev = activeTask;
        activeTask = null;
        prev.cancel('INIT_SUPERSEDED');
    }

    // 先清 isReadyFired，再尝试转移，避免失败路径遗留脏值
    isReadyFired = false;

    if (!transition(ENGINE_STATES.INITIALIZING)) {
        console.error(`❌ [Engine] 无法进入 INITIALIZING: ${currentState}`);
        return false;
    }

    const task = createInitTask(generation);
    activeTask = task;

    // 外部可通过 window.dispatchEvent(new CustomEvent('game-cancel-init'))
    // 或 window.cancelEngineInit() 取消
    const onCancelEvent = () => task.cancel('CANCEL_BY_EVENT');
    window.addEventListener('game-cancel-init', onCancelEvent, { once: true });
    task.addCleanup(() =>
        window.removeEventListener('game-cancel-init', onCancelEvent)
    );

    try {
        window.updateLoadingProgress?.('初始化引擎…', 5);

        for (let i = 0; i < MODULES.length; i++) {
            // 每轮检查取消；动态 import 本身不可打断，取消最多延迟一个模块
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
            // 旧任务：直接退出，不得改状态、不得发事件
            if (task.generation !== initGeneration) return false;

            if (currentState === ENGINE_STATES.INITIALIZING) {
                if (transition(ENGINE_STATES.CANCELLED, err)) {
                    emit('game-cancelled', {
                        generation: task.generation,
                        reason: err.message
                    });
                    console.log('ℹ️ [Engine] 初始化已取消');
                }
            }
            return false;
        }

        // 旧任务的非取消错误同样不得污染新任务
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

// ==================== 公共 API ====================

window.resetEngine = () => {
    if (currentState === ENGINE_STATES.READY) {
        console.warn('⚠️ [Engine] 已 READY，禁止 reset，请刷新页面');
        return false;
    }

    // 幂等：已经 IDLE 直接成功
    if (currentState === ENGINE_STATES.IDLE) {
        return true;
    }

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

    emit('game-cancelled', {
        generation: initGeneration,
        reason: 'MANUAL_CANCEL'
    });

    return true;
};

// ==================== 启动 ====================
init();

// ==================== CommonJS ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { init, ready, markFailed };
}
