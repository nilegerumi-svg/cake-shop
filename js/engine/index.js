// js/engine/index.js
import { ENGINE_STATES, TRANSITIONS } from './constants.js';
import { safeStringify, defGlobal, makeCancelError } from './utils.js';
import { createInitTask } from './task.js';

const context = {
    currentState: ENGINE_STATES.IDLE,
    isReadyFired: false,
    initGeneration: 0,
    activeTask: null
};

function canTransitionTo(target) {
    return TRANSITIONS[context.currentState]?.includes(target) ?? false;
}

function syncGlobalState(error = null) {
    defGlobal('__engineState', context.currentState);
    defGlobal('__engineReady', context.currentState === ENGINE_STATES.READY);
    defGlobal('__engineFailed', context.currentState === ENGINE_STATES.FAILED);
    defGlobal('__engineError', error ? (error.message || String(error)) : null);
}

function transition(nextState, payload = null) {
    if (!canTransitionTo(nextState)) {
        console.error(`❌ [Engine] 非法状态转换: ${context.currentState} -> ${nextState}`);
        return false;
    }
    context.currentState = nextState;
    syncGlobalState(
        (nextState === ENGINE_STATES.FAILED || nextState === ENGINE_STATES.CANCELLED) ? payload : null
    );
    return true;
}

function emit(name, detail) {
    try { window.dispatchEvent(new CustomEvent(name, { detail })); }
    catch (e) { console.warn(`⚠️ [Engine] emit(${name}) 失败`, e); }
}

function defineGame() {
    const existing = (window.Game && typeof window.Game === 'object') ? window.Game : {};
    const meta = {
        version: '1.0.0',
        startedAt: Date.now(),
        getEngineState: () => context.currentState,
        getState: () => context.currentState
    };

    for (const key of Object.keys(meta)) {
        if (key in existing) continue;
        try { Object.defineProperty(existing, key, { value: meta[key], writable: false, configurable: true, enumerable: true }); } 
        catch (_) { try { existing[key] = meta[key]; } catch (_) {} }
    }

    if (window.Game !== existing) {
        try { Object.defineProperty(window, 'Game', { value: existing, writable: false, configurable: true, enumerable: true }); } 
        catch (_) { try { window.Game = existing; } catch (_) {} }
    }
}

function ready() {
    if (context.currentState === ENGINE_STATES.READY) return false;
    if (context.currentState !== ENGINE_STATES.INITIALIZING) return false;

    defineGame();
    if (!transition(ENGINE_STATES.READY)) return false;

    context.isReadyFired = true;
    emit('game-ready', { state: ENGINE_STATES.READY, timestamp: Date.now() });
    console.log('✅ [Engine] 引擎就绪');
    return true;
}

function markFailed(err, generation) {
    if (generation !== undefined && generation !== context.initGeneration) return false;
    if (context.currentState === ENGINE_STATES.READY || context.currentState !== ENGINE_STATES.INITIALIZING) return false;

    let message = '', stack = '', normalized = err;
    if (err instanceof Error) { message = err.message; stack = err.stack || ''; } 
    else if (err && typeof err === 'object') {
        message = err.message || safeStringify(err); stack = err.stack || '';
        if (!(err instanceof Error)) { normalized = new Error(message); normalized.cause = err; }
    } else { message = String(err); normalized = new Error(message); }

    if (!transition(ENGINE_STATES.FAILED, normalized)) return false;

    emit('game-error', { error: normalized, message, stack, state: ENGINE_STATES.FAILED, timestamp: Date.now() });
    console.error('❌ [Engine] 初始化失败:', err);
    return true;
}

export async function initEngine(MODULES) {
    if (context.currentState === ENGINE_STATES.READY) return false;

    const generation = ++context.initGeneration;
    if (context.activeTask) { context.activeTask.cancel('INIT_SUPERSEDED'); }
    context.isReadyFired = false;

    if (!transition(ENGINE_STATES.INITIALIZING)) return false;

    const task = createInitTask(generation, context);
    context.activeTask = task;

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
            
            try {
                await import(mod.path);
            } catch (importErr) {
                console.error(`❌ [Engine] 模块加载失败 -> ${mod.path}`, importErr);
                throw new Error(`无法加载模块: ${mod.path} - ${importErr.message || '文件不存在'}`);
            }
        }

        if (task.isCancelled()) return false;

        window.updateLoadingProgress?.('引擎就绪…', 95);
        // 兼容 DOMContentLoaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => ready(), { once: true });
        } else {
            ready();
        }
        return true;

    } catch (err) {
        if (err && err.__cancelled) {
            if (context.currentState === ENGINE_STATES.INITIALIZING) {
                if (transition(ENGINE_STATES.CANCELLED, err)) emit('game-cancelled', { generation, reason: err.message });
            }
            return false;
        }
        markFailed(err, task.generation);
        return false;
    } finally {
        if (context.activeTask === task) {
            task.runCleanups();
            context.activeTask = null;
        }
    }
}

// 暴露全局重置接口
window.resetEngine = () => {
    if (context.currentState === ENGINE_STATES.IDLE) return true;
    if (context.currentState === ENGINE_STATES.READY) return false;
    
    context.activeTask?.cancel('RESET');
    context.isReadyFired = false;
    if (!transition(ENGINE_STATES.IDLE)) return false;
    emit('game-reset', { timestamp: Date.now() });
    return true;
};
