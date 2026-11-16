let audioTracks = [],
  audioStarted = !1,
  audioMuted = readMutedPref(),
  audioHtml5Fallback = !1,
  audioWatchBound = !1,
  activeTrackIndex = 0,
  trackFadeTimer = null;

function readMutedPref() {
  try {
    return window.localStorage.getItem(BGM_MUTED_KEY) === "1";
  } catch {
    return !1;
  }
}

function saveMutedPref(e) {
  try {
    window.localStorage.setItem(BGM_MUTED_KEY, e ? "1" : "0");
  } catch {}
}

function clearTrackFadeTimer() {
  trackFadeTimer !== null && (window.clearInterval(trackFadeTimer), (trackFadeTimer = null));
}

function watchTrackEnd(e) {
  (clearTrackFadeTimer(),
    (trackFadeTimer = window.setInterval(() => {
      try {
        const n = audioTracks[e];
        if (!n) return;
        if (!n.playing()) {
          audioStarted && !audioMuted && crossfadeToTrack(e);
          return;
        }
        const s = typeof n.seek() == "number" ? n.seek() : 0;
        (Number.isFinite(n.duration()) && n.duration() > 0 ? n.duration() : BGM_FALLBACK_DURATION) - s <= BGM_FADE_OUT_SEC + 0.05 &&
          crossfadeToTrack(e);
      } catch {}
    }, BGM_CHECK_INTERVAL_MS)));
}

function crossfadeToTrack(e) {
  const n = 1 - e,
    s = audioTracks[n];
  if (s) {
    try {
      (s.volume(0), s.seek(0), s.play(), s.fade(0, BGM_VOLUME, BGM_FADE_MS));
    } catch {}
    ((activeTrackIndex = n), watchTrackEnd(n));
  }
}

function playActiveTrack() {
  const e = audioTracks[activeTrackIndex];
  if (e) {
    try {
      (e.volume(BGM_VOLUME), e.playing() || e.play());
    } catch {}
    watchTrackEnd(activeTrackIndex);
  }
}

function pauseAllTracks() {
  (clearTrackFadeTimer(),
    audioTracks.forEach((e) => {
      try {
        e.pause();
      } catch {}
    }));
}

function ensureAudioTracks() {
  if (audioTracks.length === 0)
    for (let e = 0; e < 2; e += 1) {
      const n = new HowlerLib.Howl({
        src: audioHtml5Fallback ? BGM_SOURCES.slice(1) : BGM_SOURCES,
        html5: !0,
        loop: !1,
        volume: BGM_VOLUME,
        autoplay: !1,
      });
      (n.on("playerror", () => {
        if (!audioHtml5Fallback) {
          audioHtml5Fallback = !0;
          try {
            audioTracks.forEach((s) => s.unload());
          } catch {}
          if (((audioTracks = []), (activeTrackIndex = 0), clearTrackFadeTimer(), audioStarted && !audioMuted))
            try {
              (ensureAudioTracks(), playActiveTrack());
            } catch {}
        }
      }),
        audioTracks.push(n));
    }
  return audioTracks;
}

function startBackgroundMusic() {
  if (!audioStarted && ((audioStarted = !0), !audioMuted))
    try {
      ensureAudioTracks();
      const e = audioTracks[activeTrackIndex];
      (e.volume(BGM_VOLUME), e.seek(0), e.play(), watchTrackEnd(activeTrackIndex));
    } catch {}
}

function isAudioMuted() {
  return audioMuted;
}

function setAudioMuted(e) {
  if (audioMuted !== e) {
    ((audioMuted = e), saveMutedPref(audioMuted));
    try {
      audioMuted ? pauseAllTracks() : (ensureAudioTracks(), playActiveTrack());
    } catch {}
  }
}

function toggleAudioMuted() {
  ((audioMuted = !audioMuted), saveMutedPref(audioMuted));
  try {
    audioMuted ? pauseAllTracks() : (ensureAudioTracks(), playActiveTrack());
  } catch {}
  return audioMuted;
}

function bindAudioVisibilityHandlers() {
  if (audioWatchBound) return;
  audioWatchBound = !0;
  const e = () => {
      pauseAllTracks();
    },
    n = () => {
      if (!(!audioStarted || audioMuted))
        try {
          (ensureAudioTracks(), playActiveTrack());
        } catch {}
    };
  (document.addEventListener("visibilitychange", () => {
    document.hidden ? e() : n();
  }),
    window.addEventListener("blur", e),
    window.addEventListener("focus", n));
}

function OptionRadioGroup({ title: e, name: n, options: s, value: a, activeClass: o, onChange: l }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsx("p", { className: "mb-1.5 text-sm font-black text-[#4a2c17]", children: e }),
        jsxRuntime.jsx("div", {
          className: "grid grid-cols-3 gap-2",
          children: s.map((c) =>
            jsxRuntime.jsxs(
              "label",
              {
                "data-testid": c.testId,
                className: `flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 text-center ${a === c.value ? o : "border-[#f0dcc0] bg-[#fffdf8]"}`,
                children: [
                  jsxRuntime.jsx("input", {
                    type: "radio",
                    name: n,
                    className: "sr-only",
                    checked: a === c.value,
                    onChange: () => l(c.value),
                  }),
                  jsxRuntime.jsx("span", { className: "text-xl", children: c.emoji }),
                  jsxRuntime.jsx("span", {
                    className: "text-xs font-black text-[#4a2c17]",
                    children: c.label,
                  }),
                ],
              },
              c.value,
            ),
          ),
        }),
      ],
    }),
  );
}

function ToggleSettingRow({
  testId: e,
  inputTestId: n,
  icon: s,
  label: a,
  desc: o,
  checked: l,
  accentClass: c,
  onChange: u,
}) {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      children: [
        jsxRuntime.jsxs("label", {
          "data-testid": e,
          className:
            "flex cursor-pointer items-center justify-between rounded-xl border-2 border-[#f0dcc0] bg-[#fffdf8] px-3 py-2.5",
          children: [
            jsxRuntime.jsxs("span", {
              className: "flex items-center gap-1.5 text-sm font-black text-[#4a2c17]",
              children: [
                jsxRuntime.jsx("span", {
                  className: "material-icons",
                  style: { fontSize: 16 },
                  "aria-hidden": "true",
                  children: s,
                }),
                " ",
                a,
              ],
            }),
            jsxRuntime.jsx("input", {
              type: "checkbox",
              "data-testid": n,
              className: c,
              checked: l,
              onChange: (f) => u(f.target.checked),
            }),
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children: o,
        }),
      ],
    }),
  );
}

function BlindVoicePreviewBox({ playing: e, onToggle: n }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "rounded-xl border-2 border-[#b8860b] bg-[#fff8e1] p-2.5",
      children: [
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-blind-voice-try",
          onClick: n,
          className: `btn-chunky w-full ${e ? "btn-yellow" : "btn-brown"}`,
          children: [
            jsxRuntime.jsx("span", {
              className: "material-icons",
              style: { fontSize: 16 },
              "aria-hidden": "true",
              children: e ? "stop" : "record_voice_over",
            }),
            e ? "停止盲人试听" : "盲人朗读语速试听",
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
          children:
            "盲人游戏模式下的自动播报固定使用慢速语速，点击即可试听盲人朗读的实际效果（跟随当前音色），再点一下停止。",
        }),
      ],
    }),
  );
}

function SystemA11yNotice({ prefs: e }) {
  const n = [
    e.reducedMotion ? "减少动画" : "",
    e.highContrast || e.forcedColors ? "增强对比" : "",
    e.fontScale > 1.02 ? "大字体" : "",
  ].filter(Boolean);
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      className: "rounded-xl border-2 border-[#4fc3f7] bg-[#e1f5fe] p-2.5",
      children: [
        jsxRuntime.jsxs("p", {
          className: "flex items-center gap-1.5 text-sm font-black text-[#0d47a1]",
          children: [
            jsxRuntime.jsx("span", {
              className: "material-icons",
              style: { fontSize: 16 },
              "aria-hidden": "true",
              children: "settings_accessibility",
            }),
            " ",
            "系统无障碍适配",
          ],
        }),
        jsxRuntime.jsx("p", {
          className: "mt-1 text-[11px] font-bold leading-relaxed text-[#1565c0]",
          children: e.anyEnabled
            ? `已自动跟随系统设置：${n.join("、")}。`
            : "未检测到系统无障碍设置，保持默认显示。",
        }),
        jsxRuntime.jsx("p", {
          className: "mt-0.5 text-[10px] font-bold leading-relaxed text-[#0d47a1]",
          children:
            "开启系统「减少动态效果」「增强对比度」「更大字体」时，本应用会自动跟随调整，方便弱视与光敏玩家使用。",
        }),
        jsxRuntime.jsx("p", {
          className: "mt-0.5 text-[10px] font-bold leading-relaxed text-[#0d47a1]",
          children:
            "若手机已开启系统读屏（TalkBack、旁白等），请把上方「盲人播报方式」切为「交给系统读屏」，即可用系统读屏的滑动浏览与双击操作游玩，播报不会重复。",
        }),
      ],
    }),
  );
}

const VOICE_TYPE_OPTIONS = [
    { value: "common", testId: "voice-common" },
    { value: "fairy_tale", testId: "voice-fairy-tale" },
    { value: "short_play", testId: "voice-short-play" },
  ],
  SPEECH_SPEED_OPTIONS = [
    { value: "slow", testId: "speed-slow" },
    { value: "normal", testId: "speed-normal" },
    { value: "fast", testId: "speed-fast" },
  ];

function applySystemPrefClasses(e) {
  const n = document.documentElement;
  (n.classList.toggle("sys-reduced-motion", e.reducedMotion),
    n.classList.toggle("sys-high-contrast", e.highContrast),
    n.classList.toggle("sys-forced-colors", e.forcedColors),
    n.classList.toggle("sys-large-font", e.fontScale > 1.02),
    n.style.setProperty("--sys-font-scale", e.fontScale.toFixed(3)));
}

function matchesMediaQuery(e) {
  try {
    return window.matchMedia(e).matches;
  } catch {
    return !1;
  }
}

function getRootFontScale() {
  try {
    const e = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    return Math.min(1.6, Math.max(0.85, e / 16));
  } catch {
    return 1;
  }
}

function readSystemA11yPrefs() {
  const e = matchesMediaQuery("(prefers-reduced-motion: reduce)"),
    n = matchesMediaQuery("(prefers-contrast: more)") || matchesMediaQuery("(prefers-contrast: custom)"),
    s = matchesMediaQuery("(forced-colors: active)"),
    a = getRootFontScale();
  return {
    reducedMotion: e,
    highContrast: n,
    forcedColors: s,
    fontScale: a,
    anyEnabled: e || n || s || a > 1.02,
  };
}

function watchSystemA11yPrefs(e) {
  const s = [
      "(prefers-reduced-motion: reduce)",
      "(prefers-contrast: more)",
      "(prefers-contrast: custom)",
      "(forced-colors: active)",
    ].map((l) => {
      try {
        return window.matchMedia(l);
      } catch {
        return null;
      }
    }),
    a = () => e(readSystemA11yPrefs()),
    o = [];
  return (
    s.forEach((l) => {
      if (!l) return;
      const c = () => a();
      try {
        (l.addEventListener("change", c), o.push(c));
      } catch {
        try {
          (l.addListener(c), o.push(c));
        } catch {
          o.push(null);
        }
      }
    }),
    window.addEventListener("resize", a),
    document.addEventListener("visibilitychange", a),
    window.addEventListener("orientationchange", a),
    () => {
      (s.forEach((l, c) => {
        const u = o[c];
        if (!(!l || !u))
          try {
            l.removeEventListener("change", u);
          } catch {
            try {
              l.removeListener(u);
            } catch {}
          }
      }),
        window.removeEventListener("resize", a),
        document.removeEventListener("visibilitychange", a),
        window.removeEventListener("orientationchange", a));
    }
  );
}

function setupSystemA11ySync() {
  return (applySystemPrefClasses(readSystemA11yPrefs()), watchSystemA11yPrefs(applySystemPrefClasses));
}

function useBlindVoicePreview(e, n) {
  const [s, a] = React.useState(!1),
    o = React.useRef(!1);
  return (
    React.useEffect(() => {
      if (!e || !n || isSpeakingRecently()) return;
      const c = window.setTimeout(() => {
        announce(
          "语音朗读设置：可以调整音色、语速，试听当前效果，试听盲人朗读语速，开关新一天自动播报，以及开关盲人游戏模式。",
        );
      }, 400);
      return () => window.clearTimeout(c);
    }, [e, n]),
    React.useEffect(
      () => () => {
        if (o.current)
          try {
            stopTTS();
          } catch {}
      },
      [],
    ),
    {
      blindPlaying: s,
      tryBlindVoice: async () => {
        if (o.current) {
          ((o.current = !1), a(!1));
          try {
            stopTTS();
          } catch {}
          return;
        }
        ((o.current = !0), a(!0));
        try {
          stopTTS();
        } catch {}
        await speakText(
          "这是盲人朗读试听。盲人游戏模式下，所有提示和播报都会使用这样的慢速语速。请确认您能听清楚。",
          {
            speed: "slow",
            shouldStop: () => !o.current,
            onDone: () => {
              ((o.current = !1), a(!1));
            },
          },
        );
      },
    }
  );
}

function useVoiceSettingsState({ open: e, blindMode: n, onBlindChange: s }) {
  const [a, o] = React.useState(() => readVoiceSettings()),
    [l, c] = React.useState(!1),
    [u, f] = React.useState(() => readSystemA11yPrefs()),
    { blindPlaying: g, tryBlindVoice: x } = useBlindVoicePreview(e, n);
  return (
    React.useEffect(() => watchSystemA11yPrefs((v) => f(v)), []),
    {
      settings: a,
      trying: l,
      blindPlaying: g,
      sysPrefs: u,
      toggleBlind: (j) => {
        (stopSpeech(),
          markSpeakTime(),
          setBlindModeEnabled(j),
          s(j),
          j ? (vibrateShort(), announce("盲人游戏模式已开启。")) : announce("盲人游戏模式已关闭。"));
      },
      update: (j) => {
        o((v) => {
          const w = { ...v, ...j };
          return (saveVoiceSettings(w), w);
        });
      },
      tryVoice: async (j, v) => {
        if (!l) {
          c(!0);
          try {
            (stopTTS(), await speakText("你好呀，欢迎来到甜蜜物语蛋糕店！", { voiceType: j, speed: v }));
          } catch {
          } finally {
            c(!1);
          }
        }
      },
      tryBlindVoice: x,
    }
  );
}

function VoiceSettingsDialog({
  open: e,
  onClose: n,
  blindMode: s,
  onBlindChange: a,
  voiceCommand: o,
  onVoiceCommandChange: l,
}) {
  const {
    settings: c,
    trying: u,
    blindPlaying: f,
    sysPrefs: g,
    toggleBlind: x,
    update: m,
    tryVoice: p,
    tryBlindVoice: y,
  } = useVoiceSettingsState({ open: e, blindMode: s, onBlindChange: a });
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "🔊 语音朗读设置",
      onClose: n,
      children: jsxRuntime.jsxs("div", {
        className: "space-y-4",
        children: [
          jsxRuntime.jsx(ToggleSettingRow, {
            testId: "toggle-mute-mode",
            inputTestId: "input-mute-mode",
            icon: "volume_off",
            label: "静音模式",
            desc: "开启后关闭背景音乐与所有语音朗读（新一天自动播报、盲人播报、试听都不再发声）。",
            checked: c.muted,
            accentClass: "h-5 w-5 accent-[#4a2c17]",
            onChange: (j) => {
              (m({ muted: j }), setAudioMuted(j), stopSpeech());
            },
          }),
          jsxRuntime.jsx(OptionRadioGroup, {
            title: "音色",
            name: "voice-kind",
            options: VOICE_TYPE_OPTIONS.map((j) => ({ ...j, label: VOICE_TYPE_LABELS[j.value], emoji: VOICE_TYPE_EMOJI[j.value] })),
            value: c.voiceType,
            activeClass: "border-[#ff6b81] bg-[#ffe9ef]",
            onChange: (j) => m({ voiceType: j }),
          }),
          jsxRuntime.jsx(OptionRadioGroup, {
            title: "语速",
            name: "speak-speed",
            options: SPEECH_SPEED_OPTIONS.map((j) => ({ ...j, label: SPEECH_SPEED_LABELS[j.value], emoji: SPEECH_SPEED_EMOJI[j.value] })),
            value: c.speed,
            activeClass: "border-[#4fc3f7] bg-[#e1f5fe]",
            onChange: (j) => m({ speed: j }),
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "btn-voice-try",
            onClick: () => void p(c.voiceType, c.speed),
            className: "btn-chunky btn-brown w-full",
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                style: { fontSize: 16 },
                "aria-hidden": "true",
                children: "graphic_eq",
              }),
              u ? "试听中…" : "试听当前音色语速",
            ],
          }),
          jsxRuntime.jsx(BlindVoicePreviewBox, { playing: f, onToggle: () => void y() }),
          jsxRuntime.jsx(ToggleSettingRow, {
            testId: "toggle-auto-speak-day",
            inputTestId: "input-auto-speak-day",
            icon: "campaign",
            label: "新一天自动播报",
            desc: "开启后，每次「休息一天」进入新一天时，会自动朗读天气、节日、生日与重要事项，方便视障玩家了解当天动态。",
            checked: c.autoSpeakDay,
            accentClass: "h-5 w-5 accent-[#ff6b81]",
            onChange: (j) => m({ autoSpeakDay: j }),
          }),
          jsxRuntime.jsxs("div", {
            children: [
              jsxRuntime.jsx("p", {
                className: "mb-1.5 text-sm font-black text-[#4a2c17]",
                children: "盲人播报方式",
              }),
              jsxRuntime.jsxs("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                  jsxRuntime.jsxs("label", {
                    "data-testid": "opt-blind-voice-app",
                    className: `flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 text-center ${c.blindVoice === "app" ? "border-[#b8860b] bg-[#fff8e1]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
                    children: [
                      jsxRuntime.jsx("input", {
                        type: "radio",
                        name: "blind-voice",
                        className: "sr-only",
                        checked: c.blindVoice === "app",
                        onChange: () => m({ blindVoice: "app" }),
                      }),
                      jsxRuntime.jsx("span", { className: "text-xl", children: "🔊" }),
                      jsxRuntime.jsx("span", {
                        className: "text-xs font-black text-[#4a2c17]",
                        children: "应用内朗读",
                      }),
                    ],
                  }),
                  jsxRuntime.jsxs("label", {
                    "data-testid": "opt-blind-voice-system",
                    className: `flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 text-center ${c.blindVoice === "system" ? "border-[#b8860b] bg-[#fff8e1]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
                    children: [
                      jsxRuntime.jsx("input", {
                        type: "radio",
                        name: "blind-voice",
                        className: "sr-only",
                        checked: c.blindVoice === "system",
                        onChange: () => m({ blindVoice: "system" }),
                      }),
                      jsxRuntime.jsx("span", { className: "text-xl", children: "📱" }),
                      jsxRuntime.jsx("span", {
                        className: "text-xs font-black text-[#4a2c17]",
                        children: "交给系统读屏",
                      }),
                    ],
                  }),
                ],
              }),
              jsxRuntime.jsx("p", {
                className: "mt-1 text-[10px] font-bold leading-relaxed text-[#b08a6a]",
                children:
                  "手机已开启系统读屏（如 TalkBack、旁白）时，请选「交给系统读屏」：播报走系统无障碍通道，不会与应用内朗读双重发声；未开启系统读屏时保持「应用内朗读」。",
              }),
            ],
          }),
          jsxRuntime.jsx(SystemA11yNotice, { prefs: g }),
          jsxRuntime.jsx(ToggleSettingRow, {
            testId: "toggle-voice-command",
            inputTestId: "input-voice-command",
            icon: "record_voice_over",
            label: "语音指令（盲人模式）",
            desc: "开启后，屏幕右下角会出现语音指令按钮：点击后说出指令即可操作游戏，例如「打开小楼厨房」「去小镇」「休息一天」「和苏晚晴聊天」「现在几点」；识别与执行结果都会语音播报。默认随盲人模式开启。",
            checked: c.voiceCommand,
            accentClass: "h-5 w-5 accent-[#b8860b]",
            onChange: (j) => {
              (m({ voiceCommand: j }), l(j));
            },
          }),
          jsxRuntime.jsx(ToggleSettingRow, {
            testId: "toggle-blind-mode",
            inputTestId: "input-blind-mode",
            icon: "accessibility_new",
            label: "盲人游戏模式",
            desc: "开启后自动展开全屏（如系统允许），所有页面切换、操作结果、对话与事件都会自动语音播报，适合视障玩家使用。",
            checked: s,
            accentClass: "h-5 w-5 accent-[#b8860b]",
            onChange: x,
          }),
        ],
      }),
    }),
  );
}

function FontSettingsDialog({ open: e, onClose: n, fontScale: s, onFontScaleChange: a }) {
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "🔤 字体设置",
      onClose: n,
      children: jsxRuntime.jsxs("div", {
        className: "space-y-4",
        children: [
          jsxRuntime.jsxs("div", {
            className: "rounded-xl border-2 border-[#ffc53d] bg-[#fffaf3] p-2.5",
            children: [
              jsxRuntime.jsxs("p", {
                className: "flex items-center gap-1.5 text-sm font-black text-[#b8860b]",
                children: [jsxRuntime.jsx("span", { "aria-hidden": "true", children: "🔤" }), " 字体设置"],
              }),
              jsxRuntime.jsx("p", {
                className: "mt-0.5 text-[10px] font-bold text-[#b08a6a]",
                children: "五档字号即时生效：小/中/中偏大/大/特大",
              }),
              jsxRuntime.jsx("div", {
                className: "mt-2 grid grid-cols-3 gap-2",
                children: [
                  { value: "small", label: "小", emoji: "S", testId: "opt-font-small" },
                  { value: "mediumSmall", label: "中", emoji: "M", testId: "opt-font-medium" },
                  {
                    value: "medium",
                    label: "中偏大",
                    emoji: "M+",
                    testId: "opt-font-medium-large",
                  },
                  { value: "large", label: "大", emoji: "L", testId: "opt-font-large" },
                  { value: "xlarge", label: "特大", emoji: "XL", testId: "opt-font-xlarge" },
                ].map((o) =>
                  jsxRuntime.jsxs(
                    "label",
                    {
                      "data-testid": o.testId,
                      className: `flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 px-2 py-2.5 text-center ${s === o.value ? "border-[#ffc53d] bg-[#fff8e1]" : "border-[#f0dcc0] bg-[#fffdf8]"}`,
                      children: [
                        jsxRuntime.jsx("input", {
                          type: "radio",
                          name: "font-size",
                          className: "sr-only",
                          checked: s === o.value,
                          onChange: () => a(o.value),
                        }),
                        jsxRuntime.jsx("span", { className: "text-xl", children: o.emoji }),
                        jsxRuntime.jsx("span", {
                          className: "text-xs font-black text-[#4a2c17]",
                          children: o.label,
                        }),
                      ],
                    },
                    o.value,
                  ),
                ),
              }),
            ],
          }),
          jsxRuntime.jsx("p", {
            className:
              "rounded-xl bg-[#fff3bf] p-2.5 text-center text-[11px] font-bold leading-relaxed text-[#8a5a00]",
            children:
              "字体大小会立即应用到全部页面文字；系统开启大字体时，游戏会在此基础上继续放大。",
          }),
        ],
      }),
    }),
  );
}

function BlindModeAskBanner({ onEnable: e, onDismiss: n, onReplay: s }) {
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      "data-testid": "blind-ask-banner",
      className: "blind-ask-banner",
      role: "alert",
      "aria-live": "polite",
      children: [
        jsxRuntime.jsxs("div", {
          className: "flex items-center gap-2",
          children: [
            jsxRuntime.jsx("span", {
              className: "material-icons shrink-0",
              style: { fontSize: 20 },
              "aria-hidden": "true",
              children: "accessibility_new",
            }),
            jsxRuntime.jsx("p", {
              className: "min-w-0 flex-1 text-sm font-black leading-snug text-[#3e2723]",
              children:
                "是否开启盲人游戏模式？不会自动开启，请选择下方按钮；也可随时在语音设置中调整",
            }),
          ],
        }),
        jsxRuntime.jsxs("div", {
          className: "mt-2 flex flex-wrap items-center gap-2",
          children: [
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "blind-enable",
              onClick: e,
              className: "btn-chunky btn-pink btn-sm",
              children: "立即开启",
            }),
            jsxRuntime.jsx("button", {
              type: "button",
              "data-testid": "blind-dismiss",
              onClick: n,
              className: "btn-chunky btn-ghost btn-sm",
              children: "不需要",
            }),
            jsxRuntime.jsxs("button", {
              type: "button",
              "data-testid": "blind-replay",
              onClick: s,
              className: "btn-chunky btn-yellow btn-sm",
              children: [
                jsxRuntime.jsx("span", {
                  className: "material-icons",
                  style: { fontSize: 15 },
                  "aria-hidden": "true",
                  children: "volume_up",
                }),
                " 重播询问",
              ],
            }),
          ],
        }),
      ],
    }),
  );
}

const LONG_PRESS_MS = 600;

function VoiceCommandButton({ listening: e, interim: n, quickOpen: s, onToggle: a, onQuick: o, night: l }) {
  const c = React.useRef(null),
    v9 = React.useRef(null),
    [u, f] = React.useState(!1),
    z8 = function () {
      try {
        (window.__tmConsumeTouch || (window.parent && window.parent.__tmConsumeTouch))();
      } catch (z3) {}
    },
    g = React.useCallback(() => {
      c.current !== null && (window.clearTimeout(c.current), (c.current = null));
    }, []),
    x = React.useCallback(
      (z1) => {
        ((v9.current = { x: z1.clientX, y: z1.clientY }),
          f(!1),
          g(),
          (c.current = window.setTimeout(() => {
            (f(!0), z8(), o());
          }, LONG_PRESS_MS)));
      },
      [g, o],
    ),
    y9 = React.useCallback(
      (z1) => {
        const z2 = v9.current;
        z2 &&
          c.current !== null &&
          Math.abs(z1.clientX - z2.x) + Math.abs(z1.clientY - z2.y) > 8 &&
          ((v9.current = null), g());
      },
      [g],
    ),
    m = React.useCallback(() => {
      g();
    }, [g]);
  return renderWithSpeech(
    jsxRuntime.jsxs("div", {
      "data-testid": "voice-command-entry",
      className: "voice-command-fixed",
      children: [
        n &&
          !s &&
          jsxRuntime.jsxs("div", {
            className: `mb-2 max-w-[240px] rounded-xl border-2 px-3 py-2 text-xs font-black leading-relaxed shadow ${l ? "border-[#5d4037] bg-[#2c1a12] text-[#ffe9c4]" : "border-[#f0dcc0] bg-[#fffdf8] text-[#4a2c17]"}`,
            children: ["🎙️ ", n],
          }),
        jsxRuntime.jsxs("button", {
          type: "button",
          "data-testid": "btn-voice-command",
          "aria-label": s
            ? "关闭快捷指令面板"
            : e
              ? "停止语音指令"
              : "语音指令，长按打开快捷指令面板",
          "aria-pressed": s ? !0 : e,
          onPointerDown: x,
          onPointerMove: y9,
          onPointerUp: m,
          onPointerLeave: g,
          onPointerCancel: g,
          onClick: () => {
            if (!u) {
              if (s) {
                o();
                return;
              }
              a();
            }
          },
          className: `btn-chunky tm-voice-btn relative h-14 w-14 flex-col !px-0 !py-0 ${s ? "btn-green" : e ? "btn-yellow voice-listening" : l ? "btn-night" : "btn-pink"}`,
          children: [
            jsxRuntime.jsx("span", {
              className: "material-icons",
              style: { fontSize: 22 },
              "aria-hidden": "true",
              children: s ? "apps" : e ? "mic" : "mic_none",
            }),
            jsxRuntime.jsx("span", {
              className: "text-[10px] font-black leading-none",
              children: s ? "指令" : e ? "聆听中" : "语音",
            }),
            e && !s && jsxRuntime.jsx("span", { className: "voice-pulse" }),
          ],
        }),
      ],
    }),
  );
}

const TAB_DISPLAY_NAMES = {
    home: "小楼",
    bake: "烘焙",
    shop: "店铺",
    market: "订购",
    town: "小镇",
    fate: "通讯",
    profile: "档案",
    achieve: "成就",
  },
  QUICK_FAVORITES_KEY = "sweet-quick-favorites",
  QUICK_ACTION_TYPES = new Set([
    "nav",
    "nextDay",
    "toggleNight",
    "save",
    "load",
    "chat",
    "gift",
    "schedule",
    "queryTime",
    "queryMoney",
    "queryMood",
    "queryFestival",
    "queryPage",
    "queryStatus",
    "queryCombo",
    "special",
  ]);

function isValidQuickAction(e) {
  if (!e || typeof e != "object") return !1;
  const n = e;
  return typeof n.type == "string" && QUICK_ACTION_TYPES.has(n.type);
}

function readQuickFavorites() {
  try {
    const e = storageGetItem(QUICK_FAVORITES_KEY);
    if (e) {
      const n = JSON.parse(e);
      if (Array.isArray(n)) return n.filter(isValidQuickAction);
    }
  } catch {}
  return [];
}

function saveQuickFavorites(e) {
  try {
    storageSetItem(QUICK_FAVORITES_KEY, JSON.stringify(e));
  } catch {}
}

function isSameQuickAction(e, n) {
  return (
    e.type === n.type &&
    (e.tab ?? "") === (n.tab ?? "") &&
    (e.module ?? "") === (n.module ?? "") &&
    (e.npcId ?? "") === (n.npcId ?? "") &&
    (e.special ?? "") === (n.special ?? "")
  );
}

function toggleQuickFavorite(e, n) {
  return e.some((s) => isSameQuickAction(s, n)) ? e.filter((s) => !isSameQuickAction(s, n)) : [...e, n];
}

function describeQuickAction(e) {
  var n, s, a;
  switch (e.type) {
    case "nav":
      return e.tab === "home" && e.module
        ? `打开小楼${e.module === "kitchen" ? "厨房" : "店面"}`
        : `打开${TAB_DISPLAY_NAMES[e.tab ?? "bake"] ?? ""}页面`;
    case "nextDay":
      return "休息一天";
    case "toggleNight":
      return "切换夜间模式";
    case "save":
      return "保存存档";
    case "load":
      return "读取存档";
    case "chat":
      return `和${((n = NPC_RUNTIME_DATA[e.npcId ?? ""]) == null ? void 0 : n.name) ?? "伙伴"}聊天`;
    case "gift":
      return `送点心给${((s = NPC_RUNTIME_DATA[e.npcId ?? ""]) == null ? void 0 : s.name) ?? "伙伴"}`;
    case "schedule":
      return `查看${((a = NPC_RUNTIME_DATA[e.npcId ?? ""]) == null ? void 0 : a.name) ?? "伙伴"}的行程`;
    case "queryTime":
      return "现在几点";
    case "queryMoney":
      return "我有多少钱";
    case "queryMood":
      return "我的心情";
    case "queryFestival":
      return "查看今日生日与节日";
    case "queryPage":
      return "重读当前页面";
    case "queryStatus":
      return "我的状态";
    case "queryCombo":
      return "当前时间金钱心情";
    case "special":
      return e.special === "chatClosest" ? "和最亲近的伙伴聊天" : "重读最新弹窗";
    default:
      return "快捷指令";
  }
}

function findClosestNpcId(e) {
  if (!e) return;
  const n = e.metNpcs;
  if (!Array.isArray(n) || n.length === 0) return;
  const s = e.affection ?? {};
  let a,
    o = Number.NEGATIVE_INFINITY;
  for (const l of n) {
    const c = typeof s[l] == "number" ? s[l] : 0;
    c > o && ((o = c), (a = l));
  }
  return a;
}

const QUICK_ACTION_GROUPS = [
    {
      title: "游戏进度",
      items: [
        {
          key: "next-day",
          emoji: "😴",
          label: "休息一天",
          desc: "结束今天，进入新的一天",
          cmd: { type: "nextDay" },
        },
        {
          key: "save",
          emoji: "💾",
          label: "保存存档",
          desc: "保存当前进度",
          cmd: { type: "save" },
        },
        {
          key: "load",
          emoji: "📂",
          label: "读取存档",
          desc: "读取最近的存档",
          cmd: { type: "load" },
        },
      ],
    },
    {
      title: "页面跳转",
      items: [
        {
          key: "nav-bake",
          emoji: "🍰",
          label: "打开小楼厨房",
          desc: "小楼一楼厨房：吃饭、烘焙、研发配方",
          cmd: { type: "nav", tab: "home", module: "kitchen" },
        },
        {
          key: "nav-shop",
          emoji: "🏪",
          label: "打开小楼店面",
          desc: "小楼一楼店面：开店营业、装修、员工、货架",
          cmd: { type: "nav", tab: "home", module: "store" },
        },
        {
          key: "nav-town",
          emoji: "🏘️",
          label: "去小镇",
          desc: "从小楼一楼店面「出门去小镇」，或直接语音前往",
          cmd: { type: "nav", tab: "town" },
        },
        { key: "nav-fate", emoji: "📱", label: "打开通讯录", cmd: { type: "nav", tab: "fate" } },
        {
          key: "nav-profile",
          emoji: "📋",
          label: "查看档案",
          cmd: { type: "nav", tab: "profile" },
        },
      ],
    },
    {
      title: "社交",
      items: [
        {
          key: "chat-closest",
          emoji: "💬",
          label: "和最亲近的伙伴聊天",
          desc: "和好感度最高的伙伴聊聊天",
          cmd: { type: "special", special: "chatClosest" },
        },
        {
          key: "festival",
          emoji: "🎂",
          label: "查看今日生日与节日",
          cmd: { type: "queryFestival" },
        },
        { key: "combo", emoji: "⏰", label: "当前时间金钱心情", cmd: { type: "queryCombo" } },
      ],
    },
    {
      title: "信息重读",
      items: [
        { key: "page", emoji: "📄", label: "重读当前页面", cmd: { type: "queryPage" } },
        {
          key: "modal",
          emoji: "🪟",
          label: "重读最新弹窗",
          cmd: { type: "special", special: "readLatestModal" },
        },
      ],
    },
  ],
  QUICK_TILE_LONG_PRESS_MS = 600;

function quickActionKey(e) {
  return `${e.type}|${e.tab ?? ""}|${e.npcId ?? ""}|${e.special ?? ""}`;
}

function QuickActionTile({
  testId: e,
  emoji: n,
  label: s,
  desc: a,
  favorited: o,
  night: l,
  onTap: c,
  onLongPress: u,
}) {
  const f = React.useRef(null),
    h9 = React.useRef(null),
    [g, x] = React.useState(!1),
    z8 = function () {
      try {
        (window.__tmConsumeTouch || (window.parent && window.parent.__tmConsumeTouch))();
      } catch (z3) {}
    },
    m = React.useCallback(() => {
      f.current !== null && (window.clearTimeout(f.current), (f.current = null));
    }, []),
    p = React.useCallback(
      (z1) => {
        ((h9.current = { x: z1.clientX, y: z1.clientY }),
          x(!1),
          m(),
          (f.current = window.setTimeout(() => {
            (x(!0), z8(), vibrateShort(), u());
          }, QUICK_TILE_LONG_PRESS_MS)));
      },
      [m, u],
    ),
    r9 = React.useCallback(
      (z1) => {
        const z2 = h9.current;
        z2 &&
          f.current !== null &&
          Math.abs(z1.clientX - z2.x) + Math.abs(z1.clientY - z2.y) > 8 &&
          ((h9.current = null), m());
      },
      [m],
    );
  return jsxRuntime.jsxs("button", {
    type: "button",
    "data-testid": e,
    "aria-label": `${s}${a ? `，${a}` : ""}${o ? "，已加入常用，长按取消收藏" : "，长按加入常用"}`,
    onPointerDown: p,
    onPointerMove: r9,
    onPointerUp: m,
    onPointerLeave: m,
    onPointerCancel: m,
    onClick: () => {
      g || c();
    },
    className: `btn-chunky w-full flex-row justify-between !px-4 !py-3.5 text-base ${o ? "btn-green" : l ? "btn-night" : "btn-pink"}`,
    children: [
      jsxRuntime.jsxs("span", {
        className: "flex items-center gap-2",
        children: [
          jsxRuntime.jsx("span", { className: "text-xl", "aria-hidden": "true", children: n }),
          jsxRuntime.jsx("span", { children: s }),
        ],
      }),
      jsxRuntime.jsx("span", {
        className: `material-icons text-base ${o ? "" : "opacity-40"}`,
        "aria-hidden": "true",
        children: o ? "star" : "star_border",
      }),
    ],
  });
}

function QuickActionsPanel({
  open: e,
  onClose: n,
  night: s,
  favorites: a,
  onToggleFavorite: o,
  onExecute: l,
  onHelp: c,
}) {
  return renderWithSpeech(
    jsxRuntime.jsx(Modal, {
      open: e,
      title: "⚡ 快捷指令",
      onClose: n,
      children: jsxRuntime.jsxs("div", {
        className: "space-y-3",
        children: [
          jsxRuntime.jsx("p", {
            className: "text-xs font-bold leading-relaxed text-[#b08a6a]",
            children:
              "点按按钮即可执行指令；长按任意按钮可加入或取消「我的常用」。关闭面板请点下方「返回」，或再次点击屏幕右下角的语音按钮。",
          }),
          a.length > 0 &&
            jsxRuntime.jsxs("section", {
              "aria-label": "我的常用",
              children: [
                jsxRuntime.jsx("p", {
                  className: "mb-1.5 text-sm font-black text-[#4a2c17]",
                  children: "⭐ 我的常用",
                }),
                jsxRuntime.jsx("div", {
                  className: "space-y-2",
                  children: a.map((u) =>
                    jsxRuntime.jsx(
                      QuickActionTile,
                      {
                        testId: `quick-fav-${quickActionKey(u)}`,
                        emoji: "⭐",
                        label: describeQuickAction(u),
                        favorited: !0,
                        night: s,
                        onTap: () => l(u),
                        onLongPress: () => {
                          (o(u), announce(`已取消收藏「${describeQuickAction(u)}」。`));
                        },
                      },
                      quickActionKey(u),
                    ),
                  ),
                }),
              ],
            }),
          QUICK_ACTION_GROUPS.map((u) =>
            jsxRuntime.jsxs(
              "section",
              {
                "aria-label": u.title,
                children: [
                  jsxRuntime.jsx("p", {
                    className: "mb-1.5 text-sm font-black text-[#4a2c17]",
                    children: u.title,
                  }),
                  jsxRuntime.jsx("div", {
                    className: "space-y-2",
                    children: u.items.map((f) => {
                      const g = a.some((x) => isSameQuickAction(x, f.cmd));
                      return jsxRuntime.jsx(
                        QuickActionTile,
                        {
                          testId: `quick-${f.key}`,
                          emoji: f.emoji,
                          label: f.label,
                          desc: f.desc,
                          favorited: g,
                          night: s,
                          onTap: () => l(f.cmd),
                          onLongPress: () => {
                            (o(f.cmd),
                              announce(
                                g
                                  ? `已取消收藏「${f.label}」。`
                                  : `已收藏「${f.label}」，已置顶到我的常用区。`,
                              ));
                          },
                        },
                        f.key,
                      );
                    }),
                  }),
                ],
              },
              u.title,
            ),
          ),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "quick-help",
            onClick: c,
            className: "btn-chunky btn-ghost w-full !py-3 text-base",
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                "aria-hidden": "true",
                style: { fontSize: 20 },
                children: "record_voice_over",
              }),
              "听指令示例",
            ],
          }),
          jsxRuntime.jsxs("button", {
            type: "button",
            "data-testid": "quick-back",
            onClick: n,
            className: "btn-chunky btn-brown w-full !py-3.5 text-base",
            children: [
              jsxRuntime.jsx("span", {
                className: "material-icons",
                "aria-hidden": "true",
                style: { fontSize: 20 },
                children: "arrow_back",
              }),
              "返回",
            ],
          }),
        ],
      }),
    }),
  );
}

function useBlindModeAsk(e) {
  const [n, s] = React.useState(() => isBlindModeEnabled()),
    [a, o] = React.useState(!1),
    l = React.useRef(!1),
    c = React.useCallback(() => {
      (markBlindModeAsked(), setBlindModeEnabled(!1), o(!1));
    }, []),
    u = React.useCallback(() => {
      (markBlindModeAsked(),
        stopSpeech(),
        markSpeakTime(),
        setBlindModeEnabled(!0),
        s(!0),
        o(!1),
        vibrateShort(),
        (async () => {
          let g = "unknown";
          try {
            g = await getFullscreenState();
          } catch {
            g = "failed";
          }
          const x = g === "failed" || (g === "unknown" && !isFullscreenAvailable()) ? BLIND_ENABLED_TEXT + FULLSCREEN_HINT_TEXT : BLIND_ENABLED_TEXT;
          announce(x);
        })());
    }, []),
    f = React.useCallback(() => {
      announce(BLIND_ASK_TEXT);
    }, []);
  return (
    React.useEffect(() => {
      if (n || hasBlindModePref() || hasAskedBlindMode() || l.current || (e !== "title" && e !== "playing")) return;
      l.current = !0;
      const g = window.setTimeout(() => {
        (o(!0), announce(BLIND_ASK_TEXT));
      }, 900);
      return () => window.clearTimeout(g);
    }, [e, n]),
    React.useEffect(() => {
      if (!a) return;
      const g = (x) => {
        const m = x.target;
        m &&
          (m.closest('[data-testid="blind-ask-banner"]') ||
            m.closest('button, input, select, textarea, a, [role="button"], label') ||
            c());
      };
      return (
        document.addEventListener("pointerdown", g, !0),
        () => document.removeEventListener("pointerdown", g, !0)
      );
    }, [a, c]),
    {
      blindMode: n,
      setBlindMode: s,
      blindAsk: a,
      dismissBlindAsk: c,
      enableBlind: u,
      replayBlindAsk: f,
    }
  );
}

function useBlindAnnounce({
  game: e,
  phase: n,
  tab: s,
  blindMode: a,
  playerName: o,
  shopName: l,
  setPlayerName: c,
  setShopName: u,
}) {
  const f = React.useRef(!1);
  return (
    React.useEffect(() => {
      if (!e || n !== "playing" || !a || f.current || isSpeakingRecently()) return;
      f.current = !0;
      const g = window.setTimeout(() => {
        const x = TAB_DISPLAY_NAMES[s] ?? "";
        announce(`欢迎回到甜蜜物语蛋糕店！当前页面是${x}。`);
      }, 1300);
      return () => window.clearTimeout(g);
    }, [e, n, a, s]),
    React.useEffect(() => {
      if (n !== "title" || !a || isSpeakingRecently()) return;
      (o.trim() || c("店主"), l.trim() || u("甜蜜物语"));
      const g = window.setTimeout(() => {
        announce(
          "盲人游戏模式已开启。名字与店名已自动填写，屏幕下方有开始经营按钮，点击或使用读屏双击激活即可开始游戏。",
        );
      }, 900);
      return () => window.clearTimeout(g);
    }, [n, a, o, l, c, u]),
    { blindPlayedAnnounced: f }
  );
}

function getSpeechRecognitionCtor() {
  if (typeof window > "u") return null;
  const e = window,
    n = e.SpeechRecognition ?? e.webkitSpeechRecognition;
  return typeof n == "function" ? n : null;
}

function isSpeechRecognitionSupported() {
  return getSpeechRecognitionCtor() !== null;
}

const SPEECH_TIMEOUT_MS = 12e3;

function createSpeechRecognizer(e) {
  const n = getSpeechRecognitionCtor();
  if (!n) return { supported: !1, start: () => {}, stop: () => {}, abort: () => {} };
  let s = null,
    a = null,
    o = !1;
  const l = () => {
      a !== null && (window.clearTimeout(a), (a = null));
    },
    c = () => {
      const u = new n();
      return (
        (u.lang = "zh-CN"),
        (u.continuous = !1),
        (u.interimResults = !0),
        (u.maxAlternatives = 1),
        (u.onresult = (f) => {
          var x, m, p;
          l();
          let g = "";
          for (let y = f.resultIndex; y < f.results.length; y += 1) {
            const j = f.results[y],
              v = ((x = j == null ? void 0 : j[0]) == null ? void 0 : x.transcript) ?? "";
            if (j.isFinal) {
              const w = v.trim();
              w && ((m = e.onFinal) == null || m.call(e, w));
            } else g += v;
          }
          g.trim() && ((p = e.onInterim) == null || p.call(e, g.trim()));
        }),
        (u.onerror = (f) => {
          var m;
          const g = f.error ?? "";
          if (g === "aborted" || g === "no-match") return;
          let x = "unknown";
          (g === "not-allowed" || g === "service-not-allowed"
            ? (x = "not-allowed")
            : g === "no-speech"
              ? (x = "no-speech")
              : g === "network"
                ? (x = "network")
                : g === "audio-capture" && (x = "audio-capture"),
            (m = e.onError) == null || m.call(e, x));
        }),
        (u.onend = () => {
          var f;
          ((o = !1), l(), (f = e.onEnd) == null || f.call(e));
        }),
        u
      );
    };
  return {
    supported: !0,
    start: () => {
      var u;
      if (!o)
        try {
          ((s = c()),
            s.start(),
            (o = !0),
            l(),
            (a = window.setTimeout(() => {
              try {
                s == null || s.abort();
              } catch {}
            }, SPEECH_TIMEOUT_MS)));
        } catch {
          (u = e.onError) == null || u.call(e, "unknown");
        }
    },
    stop: () => {
      if (o)
        try {
          s == null || s.stop();
        } catch {}
    },
    abort: () => {
      if (o)
        try {
          s == null || s.abort();
        } catch {}
    },
  };
}
