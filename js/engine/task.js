// js/engine/task.js
import { ENGINE_STATES } from './constants.js';
import { makeCancelError } from './utils.js';

export function createInitTask(generation, context) {
    let cancelled = false;
    const cleanups = [];
    const cancelHooks = new Set();

    const isCancelled = () =>
        cancelled || generation !== context.initGeneration || context.currentState === ENGINE_STATES.CANCELLED;

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
