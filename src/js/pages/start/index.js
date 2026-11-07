// js/pages/start/index.js
// 新版开始设置：名字/店名/性别/年龄/季节/盲人模式 → 开始经营
(() => {
    'use strict';

    const Cake = window.Cake || null;
    const $ = (id) => document.getElementById(id);
    const finish = () => { if (typeof window.appLoadingComplete === 'function') window.appLoadingComplete(); };
    const fail = (msg) => { if (typeof window.appLoadingFail === 'function') window.appLoadingFail(msg); console.error('❌ [Start]', msg); };

    const nameInput = $('playerName');
    const shopInput = $('shopName');
    const ageInput = $('playerAge');
    const btnStart = $('btnStart');
    const genderGroup = $('genderGroup');
    const seasonGroup = $('seasonGroup');
    const formError = $('formError');

    if (!nameInput || !shopInput || !ageInput || !btnStart || !genderGroup || !seasonGroup) {
        fail('开始页 DOM 结构缺失，请检查 index.html');
        return;
    }

    // ---------- 选项状态 ----------
    let gender = 'female';
    let season = 'spring';
    const BLIND_KEY = 'sweet-blind-mode';

    const NAMES = ['林小雨', '苏晚晴', '陈小满', '田甜', '林知夏', '温言舟', '沈嘉禾', '周晓芸'];
    const SHOPS = ['街角甜品屋', '甜梦小栈', '梧桐蛋糕房', '春分甜屋', '云朵烘焙坊', '小满甜品店'];

    const randomOf = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // ---------- 选择组绑定 ----------
    function bindChoice(group, attr, setter) {
        if (!group) return;
        group.querySelectorAll('[' + attr + ']').forEach((btn) => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('[' + attr + ']').forEach((b) => {
                    const on = b === btn;
                    b.classList.toggle('selected', on);
                    b.setAttribute('aria-checked', String(on));
                });
                setter(btn.getAttribute(attr));
            });
        });
    }
    bindChoice(genderGroup, 'data-gender', (v) => { gender = v; });
    bindChoice(seasonGroup, 'data-season', (v) => { season = v; });

    // ---------- 随机按钮 ----------
    document.querySelectorAll('[data-random]').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-random');
            if (target === 'playerName') nameInput.value = randomOf(NAMES);
            if (target === 'shopName') shopInput.value = randomOf(SHOPS);
        });
    });

    // ---------- 盲人模式询问 ----------
    function speak(text) {
        try {
            if (!('speechSynthesis' in window)) return;
            const u = new SpeechSynthesisUtterance(text);
            u.lang = 'zh-CN';
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(u);
        } catch (_) {}
    }
    const blindOn = $('blindOn');
    const blindOff = $('blindOff');
    const blindReplay = $('blindReplay');
    if (blindOn) blindOn.addEventListener('click', () => {
        try { localStorage.setItem(BLIND_KEY, '1'); } catch (_) {}
        speak('盲人游戏模式已开启。');
        showError('✅ 盲人模式已开启，进入游戏后会有语音播报。', true);
    });
    if (blindOff) blindOff.addEventListener('click', () => {
        try { localStorage.setItem(BLIND_KEY, '0'); } catch (_) {}
    });
    if (blindReplay) blindReplay.addEventListener('click', () => {
        speak('是否开启盲人游戏模式？不会自动开启，请选择立即开启或不需要。');
    });

    // ---------- 错误提示 ----------
    function showError(msg, ok) {
        if (!formError) return;
        formError.textContent = msg;
        formError.classList.add('show');
        formError.style.background = ok ? '#eef5e8' : '';
        formError.style.borderColor = ok ? '#b8d6a3' : '';
        formError.style.color = ok ? '#558b2f' : '';
    }
    function clearError() {
        if (formError) formError.classList.remove('show');
    }

    // ---------- 开始经营 ----------
    btnStart.addEventListener('click', () => {
        clearError();
        const playerName = (nameInput.value || '').trim().slice(0, 12) || '小甜心';
        const shopName = (shopInput.value || '').trim().slice(0, 12) || '甜蜜小屋';
        const age = Number(ageInput.value) || 25;
        if (age < 20) { showError('角色年龄不得小于 20 岁。'); return; }

        try {
            if (Cake && typeof Cake.createEmptyState === 'function') {
                const state = Cake.createEmptyState();
                state.playerName = playerName;
                state.shop.name = shopName;
                state.gender = gender;
                state.playerGender = gender;
                state.age = age;
                state.playerAge = age;
                if (!state.time) state.time = {};
                state.time.season = season;
                state.startSeason = season;

                if (Cake.store) Cake.store.state = state;
                if (typeof Cake.saveState === 'function') Cake.saveState();
            } else {
                localStorage.setItem('playerName', playerName);
                localStorage.setItem('shopName', shopName);
                localStorage.setItem('playerGender', gender);
                localStorage.setItem('playerAge', String(age));
                localStorage.setItem('startSeason', season);
            }
        } catch (err) {
            console.error('保存初始状态失败:', err);
        }

        // 跳转到游戏主页（新版两页式：设置页 → 游戏页）
        window.location.href = 'game.html';
    });

    finish();
})();
