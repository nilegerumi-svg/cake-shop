// js/engine/utils.js
export function safeStringify(obj) {
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

export function defGlobal(key, value) {
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

export function makeCancelError(reason = 'INIT_CANCELLED') {
    const err = new Error(reason);
    err.__cancelled = true;
    return err;
}
