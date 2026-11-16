
/* ═══ 长角色档案区（v29 占位）═══
   用途：给每个角色留一段不限长度的完整档案（纯文本游戏，放得下）。
   数据源：会话工作目录 npc_chats 目录下各角色的 背景故事.md，二轮润色定稿后填入。
   填法：一人一键，键必须用镇民档案库 Ov 里的 id（例如 "shen_guohao"）；
         值用 sections 数组，每段一个 heading 配一段 text；只填玩家可解锁的内容。
   读取：window.__TM_LONG_PROFILES__[id]；「人物志」界面的挂接方式待定，勿先造界面。
   现状：占位空表，尚未填入任何角色。
*/
window.__TM_LONG_PROFILES__ = window.__TM_LONG_PROFILES__ || {};
/* 填档模板（示例保留勿删，照抄改字即可）：
window.__TM_LONG_PROFILES__["shen_guohao"] = {
  title: "沈氏集团董事长",
  updated: "2026-11-08",
  sections: [
    { heading: "家底", text: "……" },
    { heading: "那桩婚事", text: "……" }
  ]
};
*/
