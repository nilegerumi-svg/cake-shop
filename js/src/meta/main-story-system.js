// js/src/meta/main-story-system.js
// 主线系统（仅系统可见）——驱动叙事推进的内部引擎。
// 设计要点（见需求）：玩家侧只看到「委托 / 通知」手册；主线本身对玩家隐藏，
// 由系统在后台推进，并在推进时向玩家手册投放「委托」（接到的任务）与「通知」（已发生的事件）。
(function () {
  'use strict';

  // 主线步骤定义：顺序即剧情推进顺序。title/emoji/desc 取自 window.Cake.QUESTS（若有），否则用兜底。
  // commissionText：系统把该步骤「委托」给玩家时，写进手册的委托文案。
  // notifyText：系统完成该步骤时，推送给玩家的通知文案。
  var QUESTS = (window.Cake && window.Cake.QUESTS) || [];
  function q(key, fallback) {
    var found = QUESTS.find(function (x) { return x.key === key; });
    return found ? found : fallback;
  }

  var MAIN_STORY = [
    {
      id: 'meet_mayor',
      title: q('meet_mayor', { title: '向镇长报到' }).title,
      emoji: q('meet_mayor', { emoji: '🏛️' }).emoji,
      desc: q('meet_mayor', { desc: '镇长亲自在市政府等你报到，把《新人店主手册》交到你手上' }).desc,
      commissionText: '镇长邀请你到小镇「市政府」报到，领取《新人店主手册》。',
      notifyText: '你已向镇长报到，正式成为街角甜品屋的店主！',
    },
    {
      id: 'first_bake',
      title: q('first_bake', { title: '学烤第一炉' }).title,
      emoji: q('first_bake', { emoji: '🧁' }).emoji,
      desc: q('first_bake', { desc: '镇长带你去店里认门，托师傅教你烤出第一炉蛋糕' }).desc,
      commissionText: '跟着师傅学烤第一炉蛋糕。在「订购」面板备齐低筋面粉、鸡蛋、糖，再进后厨开烤。',
      notifyText: '第一炉蛋糕出炉啦，香气飘满整条街！',
    },
    {
      id: 'subsidy',
      title: q('subsidy', { title: '办扶持补贴' }).title,
      emoji: q('subsidy', { emoji: '💴' }).emoji,
      desc: q('subsidy', { desc: '书记员替你办妥新人扶持计划，每月 800 元补贴，还叮嘱你别忘了来领' }).desc,
      commissionText: '到政务窗口办理「新人扶持计划」，每月可领 800 元补贴，记得按时来领。',
      notifyText: '新人扶持计划已办妥，今后每月都有 800 元补贴入账。',
    },
  ];

  // 初始化：确保 state.mainStory 与 state.handbook 结构存在（系统内部 / 玩家手册）。
  function ensureState(state) {
    if (!state) return state;
    if (!state.mainStory || typeof state.mainStory !== 'object') state.mainStory = { steps: {}, version: 1 };
    if (!state.mainStory.steps || typeof state.mainStory.steps !== 'object') state.mainStory.steps = {};
    if (!state.handbook || typeof state.handbook !== 'object') state.handbook = { commissions: [], notifications: [] };
    if (!Array.isArray(state.handbook.commissions)) state.handbook.commissions = [];
    if (!Array.isArray(state.handbook.notifications)) state.handbook.notifications = [];
    return state;
  }

  // 新游戏开局：系统把主线第一步「委托」给玩家，并写入一条欢迎通知。
  // 后续步骤在推进时由 advanceMainStory 依次委托。
  function seedHandbook(state) {
    ensureState(state);
    var now = Date.now();
    // 欢迎通知（系统发送，玩家在手册「通知」里看到）
    if (!state.handbook.notifications.some(function (n) { return n.key === 'welcome'; })) {
      state.handbook.notifications.unshift({
        key: 'welcome',
        icon: '👋',
        text: '欢迎来到甜蜜物语！打开「手册」随时查看你接到的委托与最新通知。',
        day: state.day || 1,
        ts: now,
      });
    }
    // 委托主线第一步
    grantCommission(state, 'meet_mayor');
    return state;
  }

  // 系统把一个主线步骤作为「委托」交给玩家（写进手册 commissions）。
  function grantCommission(state, stepId) {
    ensureState(state);
    var step = MAIN_STORY.find(function (s) { return s.id === stepId; });
    if (!step) return state;
    if (state.handbook.commissions.some(function (c) { return c.id === stepId; })) return state;
    if (state.mainStory.steps[stepId] && state.mainStory.steps[stepId].done) return state;
    state.handbook.commissions.push({
      id: stepId,
      title: step.title,
      emoji: step.emoji,
      text: step.commissionText,
      status: 'active', // active | done
      ts: Date.now(),
    });
    return state;
  }

  // 系统推进主线：标记某步骤完成（玩家不可见），把对应委托置为 done，并推送一条通知。
  // 返回是否真的发生了推进（用于决定是否触发后续委托）。
  function advanceMainStory(state, stepId) {
    ensureState(state);
    var step = MAIN_STORY.find(function (s) { return s.id === stepId; });
    if (!step) return false;
    if (state.mainStory.steps[stepId] && state.mainStory.steps[stepId].done) return false;
    state.mainStory.steps[stepId] = { done: true, doneTs: Date.now() };
    // 委托 -> done
    var comm = state.handbook.commissions.find(function (c) { return c.id === stepId; });
    if (comm) comm.status = 'done';
    // 推送通知
    state.handbook.notifications.unshift({
      key: 'done_' + stepId,
      icon: step.emoji,
      text: step.notifyText,
      day: state.day || 1,
      ts: Date.now(),
    });
    // 触发下一步委托（主线顺序推进）
    var idx = MAIN_STORY.findIndex(function (s) { return s.id === stepId; });
    if (idx >= 0 && idx + 1 < MAIN_STORY.length) {
      grantCommission(state, MAIN_STORY[idx + 1].id);
    }
    return true;
  }

  // 玩家侧入口：在手册里「汇报」某个委托完成 —— 实际调用系统的 advanceMainStory。
  // 这样玩家只操作「委托/通知」手册，主线在系统内部推进。
  function reportCommission(state, stepId) {
    return advanceMainStory(state, stepId);
  }

  // 按天推进时，系统往玩家手册「通知」里投放当日发生的事件摘要。
  // 只记里程碑（每 7 天的经营周记、当天节日），用固定 key 去重，避免天天刷屏；
  // 不触碰 mainStory 步骤与委托状态，符合「主线只在系统内部推进」的约定。
  function rollDayNotices(state) {
    ensureState(state);
    var day = state.day || 1;
    var now = Date.now();
    function push(key, icon, text) {
      if (state.handbook.notifications.some(function (n) { return n.key === key; })) return;
      state.handbook.notifications.unshift({
        key: key, icon: icon, text: text, day: day, ts: now,
      });
    }
    if (day % 7 === 0) {
      push('week_' + day, '📔',
        '开店第 ' + day + ' 天了，街坊都认得这家甜品屋了。把这段日子的收支与往来记进手册吧。');
    }
    try {
      if (typeof getActiveFestival === 'function') {
        var f = getActiveFestival(day);
        if (f && f.name) {
          push('festival_' + day, f.emoji || '🎊',
            '今天是' + f.name + '，' + (f.tip || '小镇格外热闹') + '。');
        }
      }
    } catch (e) {}
    return state;
  }

  // 纯查询：主线完成进度（系统内部使用，不进 UI）。
  function mainStoryProgress(state) {
    ensureState(state);
    var done = MAIN_STORY.filter(function (s) { return state.mainStory.steps[s.id] && state.mainStory.steps[s.id].done; }).length;
    return { total: MAIN_STORY.length, done: done, allDone: done === MAIN_STORY.length };
  }

  // 暴露到 window.Cake 供其它模块（系统内部）调用；玩家 UI 不应读取 mainStory。
  window.Cake = window.Cake || {};
  window.Cake.MAIN_STORY = MAIN_STORY;
  window.Cake.mainStoryApi = {
    ensureState: ensureState,
    seedHandbook: seedHandbook,
    grantCommission: grantCommission,
    advanceMainStory: advanceMainStory,
    reportCommission: reportCommission,
    rollDayNotices: rollDayNotices,
    mainStoryProgress: mainStoryProgress,
  };
})();
