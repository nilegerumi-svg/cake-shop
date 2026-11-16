function loadHowler() {
  return (
    howlerLoaded ||
      ((howlerLoaded = 1),
      (function (e) {
        (function () {
          var n = function () {
            this.init();
          };
          n.prototype = {
            init: function () {
              var m = this || s;
              return (
                (m._counter = 1e3),
                (m._html5AudioPool = []),
                (m.html5PoolSize = 10),
                (m._codecs = {}),
                (m._howls = []),
                (m._muted = !1),
                (m._volume = 1),
                (m._canPlayEvent = "canplaythrough"),
                (m._navigator = typeof window < "u" && window.navigator ? window.navigator : null),
                (m.masterGain = null),
                (m.noAudio = !1),
                (m.usingWebAudio = !0),
                (m.autoSuspend = !0),
                (m.ctx = null),
                (m.autoUnlock = !0),
                m._setup(),
                m
              );
            },
            volume: function (m) {
              var p = this || s;
              if (((m = parseFloat(m)), p.ctx || x(), typeof m < "u" && m >= 0 && m <= 1)) {
                if (((p._volume = m), p._muted)) return p;
                p.usingWebAudio && p.masterGain.gain.setValueAtTime(m, s.ctx.currentTime);
                for (var y = 0; y < p._howls.length; y++)
                  if (!p._howls[y]._webAudio)
                    for (var j = p._howls[y]._getSoundIds(), v = 0; v < j.length; v++) {
                      var w = p._howls[y]._soundById(j[v]);
                      w && w._node && (w._node.volume = w._volume * m);
                    }
                return p;
              }
              return p._volume;
            },
            mute: function (m) {
              var p = this || s;
              (p.ctx || x(),
                (p._muted = m),
                p.usingWebAudio &&
                  p.masterGain.gain.setValueAtTime(m ? 0 : p._volume, s.ctx.currentTime));
              for (var y = 0; y < p._howls.length; y++)
                if (!p._howls[y]._webAudio)
                  for (var j = p._howls[y]._getSoundIds(), v = 0; v < j.length; v++) {
                    var w = p._howls[y]._soundById(j[v]);
                    w && w._node && (w._node.muted = m ? !0 : w._muted);
                  }
              return p;
            },
            stop: function () {
              for (var m = this || s, p = 0; p < m._howls.length; p++) m._howls[p].stop();
              return m;
            },
            unload: function () {
              for (var m = this || s, p = m._howls.length - 1; p >= 0; p--) m._howls[p].unload();
              return (
                m.usingWebAudio &&
                  m.ctx &&
                  typeof m.ctx.close < "u" &&
                  (m.ctx.close(), (m.ctx = null), x()),
                m
              );
            },
            codecs: function (m) {
              return (this || s)._codecs[m.replace(/^x-/, "")];
            },
            _setup: function () {
              var m = this || s;
              if (
                ((m.state = (m.ctx && m.ctx.state) || "suspended"),
                m._autoSuspend(),
                !m.usingWebAudio)
              )
                if (typeof Audio < "u")
                  try {
                    var p = new Audio();
                    typeof p.oncanplaythrough > "u" && (m._canPlayEvent = "canplay");
                  } catch {
                    m.noAudio = !0;
                  }
                else m.noAudio = !0;
              try {
                var p = new Audio();
                p.muted && (m.noAudio = !0);
              } catch {}
              return (m.noAudio || m._setupCodecs(), m);
            },
            _setupCodecs: function () {
              var m = this || s,
                p = null;
              try {
                p = typeof Audio < "u" ? new Audio() : null;
              } catch {
                return m;
              }
              if (!p || typeof p.canPlayType != "function") return m;
              var y = p.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                j = m._navigator ? m._navigator.userAgent : "",
                v = j.match(/OPR\/(\d+)/g),
                w = v && parseInt(v[0].split("/")[1], 10) < 33,
                N = j.indexOf("Safari") !== -1 && j.indexOf("Chrome") === -1,
                S = j.match(/Version\/(.*?) /),
                C = N && S && parseInt(S[1], 10) < 15;
              return (
                (m._codecs = {
                  mp3: !!(!w && (y || p.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                  mpeg: !!y,
                  opus: !!p.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                  ogg: !!p.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                  oga: !!p.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                  wav: !!(
                    p.canPlayType('audio/wav; codecs="1"') || p.canPlayType("audio/wav")
                  ).replace(/^no$/, ""),
                  aac: !!p.canPlayType("audio/aac;").replace(/^no$/, ""),
                  caf: !!p.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                  m4a: !!(
                    p.canPlayType("audio/x-m4a;") ||
                    p.canPlayType("audio/m4a;") ||
                    p.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  m4b: !!(
                    p.canPlayType("audio/x-m4b;") ||
                    p.canPlayType("audio/m4b;") ||
                    p.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  mp4: !!(
                    p.canPlayType("audio/x-mp4;") ||
                    p.canPlayType("audio/mp4;") ||
                    p.canPlayType("audio/aac;")
                  ).replace(/^no$/, ""),
                  weba: !!(!C && p.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                  webm: !!(!C && p.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                  dolby: !!p.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                  flac: !!(p.canPlayType("audio/x-flac;") || p.canPlayType("audio/flac;")).replace(
                    /^no$/,
                    "",
                  ),
                }),
                m
              );
            },
            _unlockAudio: function () {
              var m = this || s;
              if (!(m._audioUnlocked || !m.ctx)) {
                ((m._audioUnlocked = !1),
                  (m.autoUnlock = !1),
                  !m._mobileUnloaded &&
                    m.ctx.sampleRate !== 44100 &&
                    ((m._mobileUnloaded = !0), m.unload()),
                  (m._scratchBuffer = m.ctx.createBuffer(1, 1, 22050)));
                var p = function (y) {
                  for (; m._html5AudioPool.length < m.html5PoolSize;)
                    try {
                      var j = new Audio();
                      ((j._unlocked = !0), m._releaseHtml5Audio(j));
                    } catch {
                      m.noAudio = !0;
                      break;
                    }
                  for (var v = 0; v < m._howls.length; v++)
                    if (!m._howls[v]._webAudio)
                      for (var w = m._howls[v]._getSoundIds(), N = 0; N < w.length; N++) {
                        var S = m._howls[v]._soundById(w[N]);
                        S &&
                          S._node &&
                          !S._node._unlocked &&
                          ((S._node._unlocked = !0), S._node.load());
                      }
                  m._autoResume();
                  var C = m.ctx.createBufferSource();
                  ((C.buffer = m._scratchBuffer),
                    C.connect(m.ctx.destination),
                    typeof C.start > "u" ? C.noteOn(0) : C.start(0),
                    typeof m.ctx.resume == "function" && m.ctx.resume(),
                    (C.onended = function () {
                      (C.disconnect(0),
                        (m._audioUnlocked = !0),
                        document.removeEventListener("touchstart", p, !0),
                        document.removeEventListener("touchend", p, !0),
                        document.removeEventListener("click", p, !0),
                        document.removeEventListener("keydown", p, !0));
                      for (var V = 0; V < m._howls.length; V++) m._howls[V]._emit("unlock");
                    }));
                };
                return (
                  document.addEventListener("touchstart", p, !0),
                  document.addEventListener("touchend", p, !0),
                  document.addEventListener("click", p, !0),
                  document.addEventListener("keydown", p, !0),
                  m
                );
              }
            },
            _obtainHtml5Audio: function () {
              var m = this || s;
              if (m._html5AudioPool.length) return m._html5AudioPool.pop();
              var p = new Audio().play();
              return (
                p &&
                  typeof Promise < "u" &&
                  (p instanceof Promise || typeof p.then == "function") &&
                  p.catch(function () {
                    console.warn(
                      "HTML5 Audio pool exhausted, returning potentially locked audio object.",
                    );
                  }),
                new Audio()
              );
            },
            _releaseHtml5Audio: function (m) {
              var p = this || s;
              return (m._unlocked && p._html5AudioPool.push(m), p);
            },
            _autoSuspend: function () {
              var m = this;
              if (!(!m.autoSuspend || !m.ctx || typeof m.ctx.suspend > "u" || !s.usingWebAudio)) {
                for (var p = 0; p < m._howls.length; p++)
                  if (m._howls[p]._webAudio) {
                    for (var y = 0; y < m._howls[p]._sounds.length; y++)
                      if (!m._howls[p]._sounds[y]._paused) return m;
                  }
                return (
                  m._suspendTimer && clearTimeout(m._suspendTimer),
                  (m._suspendTimer = setTimeout(function () {
                    if (m.autoSuspend) {
                      ((m._suspendTimer = null), (m.state = "suspending"));
                      var j = function () {
                        ((m.state = "suspended"),
                          m._resumeAfterSuspend && (delete m._resumeAfterSuspend, m._autoResume()));
                      };
                      m.ctx.suspend().then(j, j);
                    }
                  }, 3e4)),
                  m
                );
              }
            },
            _autoResume: function () {
              var m = this;
              if (!(!m.ctx || typeof m.ctx.resume > "u" || !s.usingWebAudio))
                return (
                  m.state === "running" && m.ctx.state !== "interrupted" && m._suspendTimer
                    ? (clearTimeout(m._suspendTimer), (m._suspendTimer = null))
                    : m.state === "suspended" ||
                        (m.state === "running" && m.ctx.state === "interrupted")
                      ? (m.ctx.resume().then(function () {
                          m.state = "running";
                          for (var p = 0; p < m._howls.length; p++) m._howls[p]._emit("resume");
                        }),
                        m._suspendTimer &&
                          (clearTimeout(m._suspendTimer), (m._suspendTimer = null)))
                      : m.state === "suspending" && (m._resumeAfterSuspend = !0),
                  m
                );
            },
          };
          var s = new n(),
            a = function (m) {
              var p = this;
              if (!m.src || m.src.length === 0) {
                console.error("An array of source files must be passed with any new Howl.");
                return;
              }
              p.init(m);
            };
          a.prototype = {
            init: function (m) {
              var p = this;
              return (
                s.ctx || x(),
                (p._autoplay = m.autoplay || !1),
                (p._format = typeof m.format != "string" ? m.format : [m.format]),
                (p._html5 = m.html5 || !1),
                (p._muted = m.mute || !1),
                (p._loop = m.loop || !1),
                (p._pool = m.pool || 5),
                (p._preload =
                  typeof m.preload == "boolean" || m.preload === "metadata" ? m.preload : !0),
                (p._rate = m.rate || 1),
                (p._sprite = m.sprite || {}),
                (p._src = typeof m.src != "string" ? m.src : [m.src]),
                (p._volume = m.volume !== void 0 ? m.volume : 1),
                (p._xhr = {
                  method: m.xhr && m.xhr.method ? m.xhr.method : "GET",
                  headers: m.xhr && m.xhr.headers ? m.xhr.headers : null,
                  withCredentials: m.xhr && m.xhr.withCredentials ? m.xhr.withCredentials : !1,
                }),
                (p._duration = 0),
                (p._state = "unloaded"),
                (p._sounds = []),
                (p._endTimers = {}),
                (p._queue = []),
                (p._playLock = !1),
                (p._onend = m.onend ? [{ fn: m.onend }] : []),
                (p._onfade = m.onfade ? [{ fn: m.onfade }] : []),
                (p._onload = m.onload ? [{ fn: m.onload }] : []),
                (p._onloaderror = m.onloaderror ? [{ fn: m.onloaderror }] : []),
                (p._onplayerror = m.onplayerror ? [{ fn: m.onplayerror }] : []),
                (p._onpause = m.onpause ? [{ fn: m.onpause }] : []),
                (p._onplay = m.onplay ? [{ fn: m.onplay }] : []),
                (p._onstop = m.onstop ? [{ fn: m.onstop }] : []),
                (p._onmute = m.onmute ? [{ fn: m.onmute }] : []),
                (p._onvolume = m.onvolume ? [{ fn: m.onvolume }] : []),
                (p._onrate = m.onrate ? [{ fn: m.onrate }] : []),
                (p._onseek = m.onseek ? [{ fn: m.onseek }] : []),
                (p._onunlock = m.onunlock ? [{ fn: m.onunlock }] : []),
                (p._onresume = []),
                (p._webAudio = s.usingWebAudio && !p._html5),
                typeof s.ctx < "u" && s.ctx && s.autoUnlock && s._unlockAudio(),
                s._howls.push(p),
                p._autoplay &&
                  p._queue.push({
                    event: "play",
                    action: function () {
                      p.play();
                    },
                  }),
                p._preload && p._preload !== "none" && p.load(),
                p
              );
            },
            load: function () {
              var m = this,
                p = null;
              if (s.noAudio) {
                m._emit("loaderror", null, "No audio support.");
                return;
              }
              typeof m._src == "string" && (m._src = [m._src]);
              for (var y = 0; y < m._src.length; y++) {
                var j, v;
                if (m._format && m._format[y]) j = m._format[y];
                else {
                  if (((v = m._src[y]), typeof v != "string")) {
                    m._emit(
                      "loaderror",
                      null,
                      "Non-string found in selected audio sources - ignoring.",
                    );
                    continue;
                  }
                  ((j = /^data:audio\/([^;,]+);/i.exec(v)),
                    j || (j = /\.([^.]+)$/.exec(v.split("?", 1)[0])),
                    j && (j = j[1].toLowerCase()));
                }
                if (
                  (j ||
                    console.warn(
                      'No file extension was found. Consider using the "format" property or specify an extension.',
                    ),
                  j && s.codecs(j))
                ) {
                  p = m._src[y];
                  break;
                }
              }
              if (!p) {
                m._emit("loaderror", null, "No codec support for selected audio sources.");
                return;
              }
              return (
                (m._src = p),
                (m._state = "loading"),
                window.location.protocol === "https:" &&
                  p.slice(0, 5) === "http:" &&
                  ((m._html5 = !0), (m._webAudio = !1)),
                new o(m),
                m._webAudio && c(m),
                m
              );
            },
            play: function (m, p) {
              var y = this,
                j = null;
              if (typeof m == "number") ((j = m), (m = null));
              else {
                if (typeof m == "string" && y._state === "loaded" && !y._sprite[m]) return null;
                if (typeof m > "u" && ((m = "__default"), !y._playLock)) {
                  for (var v = 0, w = 0; w < y._sounds.length; w++)
                    y._sounds[w]._paused && !y._sounds[w]._ended && (v++, (j = y._sounds[w]._id));
                  v === 1 ? (m = null) : (j = null);
                }
              }
              var N = j ? y._soundById(j) : y._inactiveSound();
              if (!N) return null;
              if ((j && !m && (m = N._sprite || "__default"), y._state !== "loaded")) {
                ((N._sprite = m), (N._ended = !1));
                var S = N._id;
                return (
                  y._queue.push({
                    event: "play",
                    action: function () {
                      y.play(S);
                    },
                  }),
                  S
                );
              }
              if (j && !N._paused) return (p || y._loadQueue("play"), N._id);
              y._webAudio && s._autoResume();
              var C = Math.max(0, N._seek > 0 ? N._seek : y._sprite[m][0] / 1e3),
                V = Math.max(0, (y._sprite[m][0] + y._sprite[m][1]) / 1e3 - C),
                E = (V * 1e3) / Math.abs(N._rate),
                F = y._sprite[m][0] / 1e3,
                J = (y._sprite[m][0] + y._sprite[m][1]) / 1e3;
              ((N._sprite = m), (N._ended = !1));
              var H = function () {
                ((N._paused = !1),
                  (N._seek = C),
                  (N._start = F),
                  (N._stop = J),
                  (N._loop = !!(N._loop || y._sprite[m][2])));
              };
              if (C >= J) {
                y._ended(N);
                return;
              }
              var R = N._node;
              if (y._webAudio) {
                var se = function () {
                  ((y._playLock = !1), H(), y._refreshBuffer(N));
                  var ye = N._muted || y._muted ? 0 : N._volume;
                  (R.gain.setValueAtTime(ye, s.ctx.currentTime),
                    (N._playStart = s.ctx.currentTime),
                    typeof R.bufferSource.start > "u"
                      ? N._loop
                        ? R.bufferSource.noteGrainOn(0, C, 86400)
                        : R.bufferSource.noteGrainOn(0, C, V)
                      : N._loop
                        ? R.bufferSource.start(0, C, 86400)
                        : R.bufferSource.start(0, C, V),
                    E !== 1 / 0 && (y._endTimers[N._id] = setTimeout(y._ended.bind(y, N), E)),
                    p ||
                      setTimeout(function () {
                        (y._emit("play", N._id), y._loadQueue());
                      }, 0));
                };
                s.state === "running" && s.ctx.state !== "interrupted"
                  ? se()
                  : ((y._playLock = !0), y.once("resume", se), y._clearTimer(N._id));
              } else {
                var be = function () {
                  ((R.currentTime = C),
                    (R.muted = N._muted || y._muted || s._muted || R.muted),
                    (R.volume = N._volume * s.volume()),
                    (R.playbackRate = N._rate));
                  try {
                    var ye = R.play();
                    if (
                      (ye &&
                      typeof Promise < "u" &&
                      (ye instanceof Promise || typeof ye.then == "function")
                        ? ((y._playLock = !0),
                          H(),
                          ye
                            .then(function () {
                              ((y._playLock = !1),
                                (R._unlocked = !0),
                                p ? y._loadQueue() : y._emit("play", N._id));
                            })
                            .catch(function () {
                              ((y._playLock = !1),
                                y._emit(
                                  "playerror",
                                  N._id,
                                  "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.",
                                ),
                                (N._ended = !0),
                                (N._paused = !0));
                            }))
                        : p || ((y._playLock = !1), H(), y._emit("play", N._id)),
                      (R.playbackRate = N._rate),
                      R.paused)
                    ) {
                      y._emit(
                        "playerror",
                        N._id,
                        "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.",
                      );
                      return;
                    }
                    m !== "__default" || N._loop
                      ? (y._endTimers[N._id] = setTimeout(y._ended.bind(y, N), E))
                      : ((y._endTimers[N._id] = function () {
                          (y._ended(N), R.removeEventListener("ended", y._endTimers[N._id], !1));
                        }),
                        R.addEventListener("ended", y._endTimers[N._id], !1));
                  } catch (P) {
                    y._emit("playerror", N._id, P);
                  }
                };
                R.src ===
                  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" &&
                  ((R.src = y._src), R.load());
                var Ie = (window && window.ejecta) || (!R.readyState && s._navigator.isCocoonJS);
                if (R.readyState >= 3 || Ie) be();
                else {
                  ((y._playLock = !0), (y._state = "loading"));
                  var xe = function () {
                    ((y._state = "loaded"), be(), R.removeEventListener(s._canPlayEvent, xe, !1));
                  };
                  (R.addEventListener(s._canPlayEvent, xe, !1), y._clearTimer(N._id));
                }
              }
              return N._id;
            },
            pause: function (m) {
              var p = this;
              if (p._state !== "loaded" || p._playLock)
                return (
                  p._queue.push({
                    event: "pause",
                    action: function () {
                      p.pause(m);
                    },
                  }),
                  p
                );
              for (var y = p._getSoundIds(m), j = 0; j < y.length; j++) {
                p._clearTimer(y[j]);
                var v = p._soundById(y[j]);
                if (
                  v &&
                  !v._paused &&
                  ((v._seek = p.seek(y[j])),
                  (v._rateSeek = 0),
                  (v._paused = !0),
                  p._stopFade(y[j]),
                  v._node)
                )
                  if (p._webAudio) {
                    if (!v._node.bufferSource) continue;
                    (typeof v._node.bufferSource.stop > "u"
                      ? v._node.bufferSource.noteOff(0)
                      : v._node.bufferSource.stop(0),
                      p._cleanBuffer(v._node));
                  } else
                    (!isNaN(v._node.duration) || v._node.duration === 1 / 0) && v._node.pause();
                arguments[1] || p._emit("pause", v ? v._id : null);
              }
              return p;
            },
            stop: function (m, p) {
              var y = this;
              if (y._state !== "loaded" || y._playLock)
                return (
                  y._queue.push({
                    event: "stop",
                    action: function () {
                      y.stop(m);
                    },
                  }),
                  y
                );
              for (var j = y._getSoundIds(m), v = 0; v < j.length; v++) {
                y._clearTimer(j[v]);
                var w = y._soundById(j[v]);
                w &&
                  ((w._seek = w._start || 0),
                  (w._rateSeek = 0),
                  (w._paused = !0),
                  (w._ended = !0),
                  y._stopFade(j[v]),
                  w._node &&
                    (y._webAudio
                      ? w._node.bufferSource &&
                        (typeof w._node.bufferSource.stop > "u"
                          ? w._node.bufferSource.noteOff(0)
                          : w._node.bufferSource.stop(0),
                        y._cleanBuffer(w._node))
                      : (!isNaN(w._node.duration) || w._node.duration === 1 / 0) &&
                        ((w._node.currentTime = w._start || 0),
                        w._node.pause(),
                        w._node.duration === 1 / 0 && y._clearSound(w._node))),
                  p || y._emit("stop", w._id));
              }
              return y;
            },
            mute: function (m, p) {
              var y = this;
              if (y._state !== "loaded" || y._playLock)
                return (
                  y._queue.push({
                    event: "mute",
                    action: function () {
                      y.mute(m, p);
                    },
                  }),
                  y
                );
              if (typeof p > "u")
                if (typeof m == "boolean") y._muted = m;
                else return y._muted;
              for (var j = y._getSoundIds(p), v = 0; v < j.length; v++) {
                var w = y._soundById(j[v]);
                w &&
                  ((w._muted = m),
                  w._interval && y._stopFade(w._id),
                  y._webAudio && w._node
                    ? w._node.gain.setValueAtTime(m ? 0 : w._volume, s.ctx.currentTime)
                    : w._node && (w._node.muted = s._muted ? !0 : m),
                  y._emit("mute", w._id));
              }
              return y;
            },
            volume: function () {
              var m = this,
                p = arguments,
                y,
                j;
              if (p.length === 0) return m._volume;
              if (p.length === 1 || (p.length === 2 && typeof p[1] > "u")) {
                var v = m._getSoundIds(),
                  w = v.indexOf(p[0]);
                w >= 0 ? (j = parseInt(p[0], 10)) : (y = parseFloat(p[0]));
              } else p.length >= 2 && ((y = parseFloat(p[0])), (j = parseInt(p[1], 10)));
              var N;
              if (typeof y < "u" && y >= 0 && y <= 1) {
                if (m._state !== "loaded" || m._playLock)
                  return (
                    m._queue.push({
                      event: "volume",
                      action: function () {
                        m.volume.apply(m, p);
                      },
                    }),
                    m
                  );
                (typeof j > "u" && (m._volume = y), (j = m._getSoundIds(j)));
                for (var S = 0; S < j.length; S++)
                  ((N = m._soundById(j[S])),
                    N &&
                      ((N._volume = y),
                      p[2] || m._stopFade(j[S]),
                      m._webAudio && N._node && !N._muted
                        ? N._node.gain.setValueAtTime(y, s.ctx.currentTime)
                        : N._node && !N._muted && (N._node.volume = y * s.volume()),
                      m._emit("volume", N._id)));
              } else return ((N = j ? m._soundById(j) : m._sounds[0]), N ? N._volume : 0);
              return m;
            },
            fade: function (m, p, y, j) {
              var v = this;
              if (v._state !== "loaded" || v._playLock)
                return (
                  v._queue.push({
                    event: "fade",
                    action: function () {
                      v.fade(m, p, y, j);
                    },
                  }),
                  v
                );
              ((m = Math.min(Math.max(0, parseFloat(m)), 1)),
                (p = Math.min(Math.max(0, parseFloat(p)), 1)),
                (y = parseFloat(y)),
                v.volume(m, j));
              for (var w = v._getSoundIds(j), N = 0; N < w.length; N++) {
                var S = v._soundById(w[N]);
                if (S) {
                  if ((j || v._stopFade(w[N]), v._webAudio && !S._muted)) {
                    var C = s.ctx.currentTime,
                      V = C + y / 1e3;
                    ((S._volume = m),
                      S._node.gain.setValueAtTime(m, C),
                      S._node.gain.linearRampToValueAtTime(p, V));
                  }
                  v._startFadeInterval(S, m, p, y, w[N], typeof j > "u");
                }
              }
              return v;
            },
            _startFadeInterval: function (m, p, y, j, v, w) {
              var N = this,
                S = p,
                C = y - p,
                V = Math.abs(C / 0.01),
                E = Math.max(4, V > 0 ? j / V : j),
                F = Date.now();
              ((m._fadeTo = y),
                (m._interval = setInterval(function () {
                  var J = (Date.now() - F) / j;
                  ((F = Date.now()),
                    (S += C * J),
                    (S = Math.round(S * 100) / 100),
                    C < 0 ? (S = Math.max(y, S)) : (S = Math.min(y, S)),
                    N._webAudio ? (m._volume = S) : N.volume(S, m._id, !0),
                    w && (N._volume = S),
                    ((y < p && S <= y) || (y > p && S >= y)) &&
                      (clearInterval(m._interval),
                      (m._interval = null),
                      (m._fadeTo = null),
                      N.volume(y, m._id),
                      N._emit("fade", m._id)));
                }, E)));
            },
            _stopFade: function (m) {
              var p = this,
                y = p._soundById(m);
              return (
                y &&
                  y._interval &&
                  (p._webAudio && y._node.gain.cancelScheduledValues(s.ctx.currentTime),
                  clearInterval(y._interval),
                  (y._interval = null),
                  p.volume(y._fadeTo, m),
                  (y._fadeTo = null),
                  p._emit("fade", m)),
                p
              );
            },
            loop: function () {
              var m = this,
                p = arguments,
                y,
                j,
                v;
              if (p.length === 0) return m._loop;
              if (p.length === 1)
                if (typeof p[0] == "boolean") ((y = p[0]), (m._loop = y));
                else return ((v = m._soundById(parseInt(p[0], 10))), v ? v._loop : !1);
              else p.length === 2 && ((y = p[0]), (j = parseInt(p[1], 10)));
              for (var w = m._getSoundIds(j), N = 0; N < w.length; N++)
                ((v = m._soundById(w[N])),
                  v &&
                    ((v._loop = y),
                    m._webAudio &&
                      v._node &&
                      v._node.bufferSource &&
                      ((v._node.bufferSource.loop = y),
                      y &&
                        ((v._node.bufferSource.loopStart = v._start || 0),
                        (v._node.bufferSource.loopEnd = v._stop),
                        m.playing(w[N]) && (m.pause(w[N], !0), m.play(w[N], !0))))));
              return m;
            },
            rate: function () {
              var m = this,
                p = arguments,
                y,
                j;
              if (p.length === 0) j = m._sounds[0]._id;
              else if (p.length === 1) {
                var v = m._getSoundIds(),
                  w = v.indexOf(p[0]);
                w >= 0 ? (j = parseInt(p[0], 10)) : (y = parseFloat(p[0]));
              } else p.length === 2 && ((y = parseFloat(p[0])), (j = parseInt(p[1], 10)));
              var N;
              if (typeof y == "number") {
                if (m._state !== "loaded" || m._playLock)
                  return (
                    m._queue.push({
                      event: "rate",
                      action: function () {
                        m.rate.apply(m, p);
                      },
                    }),
                    m
                  );
                (typeof j > "u" && (m._rate = y), (j = m._getSoundIds(j)));
                for (var S = 0; S < j.length; S++)
                  if (((N = m._soundById(j[S])), N)) {
                    (m.playing(j[S]) &&
                      ((N._rateSeek = m.seek(j[S])),
                      (N._playStart = m._webAudio ? s.ctx.currentTime : N._playStart)),
                      (N._rate = y),
                      m._webAudio && N._node && N._node.bufferSource
                        ? N._node.bufferSource.playbackRate.setValueAtTime(y, s.ctx.currentTime)
                        : N._node && (N._node.playbackRate = y));
                    var C = m.seek(j[S]),
                      V = (m._sprite[N._sprite][0] + m._sprite[N._sprite][1]) / 1e3 - C,
                      E = (V * 1e3) / Math.abs(N._rate);
                    ((m._endTimers[j[S]] || !N._paused) &&
                      (m._clearTimer(j[S]),
                      (m._endTimers[j[S]] = setTimeout(m._ended.bind(m, N), E))),
                      m._emit("rate", N._id));
                  }
              } else return ((N = m._soundById(j)), N ? N._rate : m._rate);
              return m;
            },
            seek: function () {
              var m = this,
                p = arguments,
                y,
                j;
              if (p.length === 0) m._sounds.length && (j = m._sounds[0]._id);
              else if (p.length === 1) {
                var v = m._getSoundIds(),
                  w = v.indexOf(p[0]);
                w >= 0
                  ? (j = parseInt(p[0], 10))
                  : m._sounds.length && ((j = m._sounds[0]._id), (y = parseFloat(p[0])));
              } else p.length === 2 && ((y = parseFloat(p[0])), (j = parseInt(p[1], 10)));
              if (typeof j > "u") return 0;
              if (typeof y == "number" && (m._state !== "loaded" || m._playLock))
                return (
                  m._queue.push({
                    event: "seek",
                    action: function () {
                      m.seek.apply(m, p);
                    },
                  }),
                  m
                );
              var N = m._soundById(j);
              if (N)
                if (typeof y == "number" && y >= 0) {
                  var S = m.playing(j);
                  (S && m.pause(j, !0),
                    (N._seek = y),
                    (N._ended = !1),
                    m._clearTimer(j),
                    !m._webAudio &&
                      N._node &&
                      !isNaN(N._node.duration) &&
                      (N._node.currentTime = y));
                  var C = function () {
                    (S && m.play(j, !0), m._emit("seek", j));
                  };
                  if (S && !m._webAudio) {
                    var V = function () {
                      m._playLock ? setTimeout(V, 0) : C();
                    };
                    setTimeout(V, 0);
                  } else C();
                } else if (m._webAudio) {
                  var E = m.playing(j) ? s.ctx.currentTime - N._playStart : 0,
                    F = N._rateSeek ? N._rateSeek - N._seek : 0;
                  return N._seek + (F + E * Math.abs(N._rate));
                } else return N._node.currentTime;
              return m;
            },
            playing: function (m) {
              var p = this;
              if (typeof m == "number") {
                var y = p._soundById(m);
                return y ? !y._paused : !1;
              }
              for (var j = 0; j < p._sounds.length; j++) if (!p._sounds[j]._paused) return !0;
              return !1;
            },
            duration: function (m) {
              var p = this,
                y = p._duration,
                j = p._soundById(m);
              return (j && (y = p._sprite[j._sprite][1] / 1e3), y);
            },
            state: function () {
              return this._state;
            },
            unload: function () {
              for (var m = this, p = m._sounds, y = 0; y < p.length; y++)
                (p[y]._paused || m.stop(p[y]._id),
                  m._webAudio ||
                    (m._clearSound(p[y]._node),
                    p[y]._node.removeEventListener("error", p[y]._errorFn, !1),
                    p[y]._node.removeEventListener(s._canPlayEvent, p[y]._loadFn, !1),
                    p[y]._node.removeEventListener("ended", p[y]._endFn, !1),
                    s._releaseHtml5Audio(p[y]._node)),
                  delete p[y]._node,
                  m._clearTimer(p[y]._id));
              var j = s._howls.indexOf(m);
              j >= 0 && s._howls.splice(j, 1);
              var v = !0;
              for (y = 0; y < s._howls.length; y++)
                if (s._howls[y]._src === m._src || m._src.indexOf(s._howls[y]._src) >= 0) {
                  v = !1;
                  break;
                }
              return (
                l && v && delete l[m._src],
                (s.noAudio = !1),
                (m._state = "unloaded"),
                (m._sounds = []),
                (m = null),
                null
              );
            },
            on: function (m, p, y, j) {
              var v = this,
                w = v["_on" + m];
              return (
                typeof p == "function" && w.push(j ? { id: y, fn: p, once: j } : { id: y, fn: p }),
                v
              );
            },
            off: function (m, p, y) {
              var j = this,
                v = j["_on" + m],
                w = 0;
              if ((typeof p == "number" && ((y = p), (p = null)), p || y))
                for (w = 0; w < v.length; w++) {
                  var N = y === v[w].id;
                  if ((p === v[w].fn && N) || (!p && N)) {
                    v.splice(w, 1);
                    break;
                  }
                }
              else if (m) j["_on" + m] = [];
              else {
                var S = Object.keys(j);
                for (w = 0; w < S.length; w++)
                  S[w].indexOf("_on") === 0 && Array.isArray(j[S[w]]) && (j[S[w]] = []);
              }
              return j;
            },
            once: function (m, p, y) {
              var j = this;
              return (j.on(m, p, y, 1), j);
            },
            _emit: function (m, p, y) {
              for (var j = this, v = j["_on" + m], w = v.length - 1; w >= 0; w--)
                (!v[w].id || v[w].id === p || m === "load") &&
                  (setTimeout(
                    function (N) {
                      N.call(this, p, y);
                    }.bind(j, v[w].fn),
                    0,
                  ),
                  v[w].once && j.off(m, v[w].fn, v[w].id));
              return (j._loadQueue(m), j);
            },
            _loadQueue: function (m) {
              var p = this;
              if (p._queue.length > 0) {
                var y = p._queue[0];
                (y.event === m && (p._queue.shift(), p._loadQueue()), m || y.action());
              }
              return p;
            },
            _ended: function (m) {
              var p = this,
                y = m._sprite;
              if (
                !p._webAudio &&
                m._node &&
                !m._node.paused &&
                !m._node.ended &&
                m._node.currentTime < m._stop
              )
                return (setTimeout(p._ended.bind(p, m), 100), p);
              var j = !!(m._loop || p._sprite[y][2]);
              if (
                (p._emit("end", m._id),
                !p._webAudio && j && p.stop(m._id, !0).play(m._id),
                p._webAudio && j)
              ) {
                (p._emit("play", m._id),
                  (m._seek = m._start || 0),
                  (m._rateSeek = 0),
                  (m._playStart = s.ctx.currentTime));
                var v = ((m._stop - m._start) * 1e3) / Math.abs(m._rate);
                p._endTimers[m._id] = setTimeout(p._ended.bind(p, m), v);
              }
              return (
                p._webAudio &&
                  !j &&
                  ((m._paused = !0),
                  (m._ended = !0),
                  (m._seek = m._start || 0),
                  (m._rateSeek = 0),
                  p._clearTimer(m._id),
                  p._cleanBuffer(m._node),
                  s._autoSuspend()),
                !p._webAudio && !j && p.stop(m._id, !0),
                p
              );
            },
            _clearTimer: function (m) {
              var p = this;
              if (p._endTimers[m]) {
                if (typeof p._endTimers[m] != "function") clearTimeout(p._endTimers[m]);
                else {
                  var y = p._soundById(m);
                  y && y._node && y._node.removeEventListener("ended", p._endTimers[m], !1);
                }
                delete p._endTimers[m];
              }
              return p;
            },
            _soundById: function (m) {
              for (var p = this, y = 0; y < p._sounds.length; y++)
                if (m === p._sounds[y]._id) return p._sounds[y];
              return null;
            },
            _inactiveSound: function () {
              var m = this;
              m._drain();
              for (var p = 0; p < m._sounds.length; p++)
                if (m._sounds[p]._ended) return m._sounds[p].reset();
              return new o(m);
            },
            _drain: function () {
              var m = this,
                p = m._pool,
                y = 0,
                j = 0;
              if (!(m._sounds.length < p)) {
                for (j = 0; j < m._sounds.length; j++) m._sounds[j]._ended && y++;
                for (j = m._sounds.length - 1; j >= 0; j--) {
                  if (y <= p) return;
                  m._sounds[j]._ended &&
                    (m._webAudio && m._sounds[j]._node && m._sounds[j]._node.disconnect(0),
                    m._sounds.splice(j, 1),
                    y--);
                }
              }
            },
            _getSoundIds: function (m) {
              var p = this;
              if (typeof m > "u") {
                for (var y = [], j = 0; j < p._sounds.length; j++) y.push(p._sounds[j]._id);
                return y;
              } else return [m];
            },
            _refreshBuffer: function (m) {
              var p = this;
              return (
                (m._node.bufferSource = s.ctx.createBufferSource()),
                (m._node.bufferSource.buffer = l[p._src]),
                m._panner
                  ? m._node.bufferSource.connect(m._panner)
                  : m._node.bufferSource.connect(m._node),
                (m._node.bufferSource.loop = m._loop),
                m._loop &&
                  ((m._node.bufferSource.loopStart = m._start || 0),
                  (m._node.bufferSource.loopEnd = m._stop || 0)),
                m._node.bufferSource.playbackRate.setValueAtTime(m._rate, s.ctx.currentTime),
                p
              );
            },
            _cleanBuffer: function (m) {
              var p = this,
                y = s._navigator && s._navigator.vendor.indexOf("Apple") >= 0;
              if (!m.bufferSource) return p;
              if (
                s._scratchBuffer &&
                m.bufferSource &&
                ((m.bufferSource.onended = null), m.bufferSource.disconnect(0), y)
              )
                try {
                  m.bufferSource.buffer = s._scratchBuffer;
                } catch {}
              return ((m.bufferSource = null), p);
            },
            _clearSound: function (m) {
              var p = /MSIE |Trident\//.test(s._navigator && s._navigator.userAgent);
              p ||
                (m.src =
                  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
            },
          };
          var o = function (m) {
            ((this._parent = m), this.init());
          };
          o.prototype = {
            init: function () {
              var m = this,
                p = m._parent;
              return (
                (m._muted = p._muted),
                (m._loop = p._loop),
                (m._volume = p._volume),
                (m._rate = p._rate),
                (m._seek = 0),
                (m._paused = !0),
                (m._ended = !0),
                (m._sprite = "__default"),
                (m._id = ++s._counter),
                p._sounds.push(m),
                m.create(),
                m
              );
            },
            create: function () {
              var m = this,
                p = m._parent,
                y = s._muted || m._muted || m._parent._muted ? 0 : m._volume;
              return (
                p._webAudio
                  ? ((m._node =
                      typeof s.ctx.createGain > "u" ? s.ctx.createGainNode() : s.ctx.createGain()),
                    m._node.gain.setValueAtTime(y, s.ctx.currentTime),
                    (m._node.paused = !0),
                    m._node.connect(s.masterGain))
                  : s.noAudio ||
                    ((m._node = s._obtainHtml5Audio()),
                    (m._errorFn = m._errorListener.bind(m)),
                    m._node.addEventListener("error", m._errorFn, !1),
                    (m._loadFn = m._loadListener.bind(m)),
                    m._node.addEventListener(s._canPlayEvent, m._loadFn, !1),
                    (m._endFn = m._endListener.bind(m)),
                    m._node.addEventListener("ended", m._endFn, !1),
                    (m._node.src = p._src),
                    (m._node.preload = p._preload === !0 ? "auto" : p._preload),
                    (m._node.volume = y * s.volume()),
                    m._node.load()),
                m
              );
            },
            reset: function () {
              var m = this,
                p = m._parent;
              return (
                (m._muted = p._muted),
                (m._loop = p._loop),
                (m._volume = p._volume),
                (m._rate = p._rate),
                (m._seek = 0),
                (m._rateSeek = 0),
                (m._paused = !0),
                (m._ended = !0),
                (m._sprite = "__default"),
                (m._id = ++s._counter),
                m
              );
            },
            _errorListener: function () {
              var m = this;
              (m._parent._emit("loaderror", m._id, m._node.error ? m._node.error.code : 0),
                m._node.removeEventListener("error", m._errorFn, !1));
            },
            _loadListener: function () {
              var m = this,
                p = m._parent;
              ((p._duration = Math.ceil(m._node.duration * 10) / 10),
                Object.keys(p._sprite).length === 0 &&
                  (p._sprite = { __default: [0, p._duration * 1e3] }),
                p._state !== "loaded" && ((p._state = "loaded"), p._emit("load"), p._loadQueue()),
                m._node.removeEventListener(s._canPlayEvent, m._loadFn, !1));
            },
            _endListener: function () {
              var m = this,
                p = m._parent;
              (p._duration === 1 / 0 &&
                ((p._duration = Math.ceil(m._node.duration * 10) / 10),
                p._sprite.__default[1] === 1 / 0 && (p._sprite.__default[1] = p._duration * 1e3),
                p._ended(m)),
                m._node.removeEventListener("ended", m._endFn, !1));
            },
          };
          var l = {},
            c = function (m) {
              var p = m._src;
              if (l[p]) {
                ((m._duration = l[p].duration), g(m));
                return;
              }
              if (/^data:[^;]+;base64,/.test(p)) {
                for (
                  var y = atob(p.split(",")[1]), j = new Uint8Array(y.length), v = 0;
                  v < y.length;
                  ++v
                )
                  j[v] = y.charCodeAt(v);
                f(j.buffer, m);
              } else {
                var w = new XMLHttpRequest();
                (w.open(m._xhr.method, p, !0),
                  (w.withCredentials = m._xhr.withCredentials),
                  (w.responseType = "arraybuffer"),
                  m._xhr.headers &&
                    Object.keys(m._xhr.headers).forEach(function (N) {
                      w.setRequestHeader(N, m._xhr.headers[N]);
                    }),
                  (w.onload = function () {
                    var N = (w.status + "")[0];
                    if (N !== "0" && N !== "2" && N !== "3") {
                      m._emit(
                        "loaderror",
                        null,
                        "Failed loading audio file with status: " + w.status + ".",
                      );
                      return;
                    }
                    f(w.response, m);
                  }),
                  (w.onerror = function () {
                    m._webAudio &&
                      ((m._html5 = !0),
                      (m._webAudio = !1),
                      (m._sounds = []),
                      delete l[p],
                      m.load());
                  }),
                  u(w));
              }
            },
            u = function (m) {
              try {
                m.send();
              } catch {
                m.onerror();
              }
            },
            f = function (m, p) {
              var y = function () {
                  p._emit("loaderror", null, "Decoding audio data failed.");
                },
                j = function (v) {
                  v && p._sounds.length > 0 ? ((l[p._src] = v), g(p, v)) : y();
                };
              typeof Promise < "u" && s.ctx.decodeAudioData.length === 1
                ? s.ctx.decodeAudioData(m).then(j).catch(y)
                : s.ctx.decodeAudioData(m, j, y);
            },
            g = function (m, p) {
              (p && !m._duration && (m._duration = p.duration),
                Object.keys(m._sprite).length === 0 &&
                  (m._sprite = { __default: [0, m._duration * 1e3] }),
                m._state !== "loaded" && ((m._state = "loaded"), m._emit("load"), m._loadQueue()));
            },
            x = function () {
              if (s.usingWebAudio) {
                try {
                  typeof AudioContext < "u"
                    ? (s.ctx = new AudioContext())
                    : typeof webkitAudioContext < "u"
                      ? (s.ctx = new webkitAudioContext())
                      : (s.usingWebAudio = !1);
                } catch {
                  s.usingWebAudio = !1;
                }
                s.ctx || (s.usingWebAudio = !1);
                var m = /iP(hone|od|ad)/.test(s._navigator && s._navigator.platform),
                  p = s._navigator && s._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                  y = p ? parseInt(p[1], 10) : null;
                if (m && y && y < 9) {
                  var j = /safari/.test(s._navigator && s._navigator.userAgent.toLowerCase());
                  s._navigator && !j && (s.usingWebAudio = !1);
                }
                (s.usingWebAudio &&
                  ((s.masterGain =
                    typeof s.ctx.createGain > "u" ? s.ctx.createGainNode() : s.ctx.createGain()),
                  s.masterGain.gain.setValueAtTime(s._muted ? 0 : s._volume, s.ctx.currentTime),
                  s.masterGain.connect(s.ctx.destination)),
                  s._setup());
              }
            };
          ((e.Howler = s),
            (e.Howl = a),
            typeof GLOBAL_OBJECT < "u"
              ? ((GLOBAL_OBJECT.HowlerGlobal = n), (GLOBAL_OBJECT.Howler = s), (GLOBAL_OBJECT.Howl = a), (GLOBAL_OBJECT.Sound = o))
              : typeof window < "u" &&
                ((window.HowlerGlobal = n),
                (window.Howler = s),
                (window.Howl = a),
                (window.Sound = o)));
        })();
        (function () {
          ((HowlerGlobal.prototype._pos = [0, 0, 0]),
            (HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0]),
            (HowlerGlobal.prototype.stereo = function (s) {
              var a = this;
              if (!a.ctx || !a.ctx.listener) return a;
              for (var o = a._howls.length - 1; o >= 0; o--) a._howls[o].stereo(s);
              return a;
            }),
            (HowlerGlobal.prototype.pos = function (s, a, o) {
              var l = this;
              if (!l.ctx || !l.ctx.listener) return l;
              if (
                ((a = typeof a != "number" ? l._pos[1] : a),
                (o = typeof o != "number" ? l._pos[2] : o),
                typeof s == "number")
              )
                ((l._pos = [s, a, o]),
                  typeof l.ctx.listener.positionX < "u"
                    ? (l.ctx.listener.positionX.setTargetAtTime(
                        l._pos[0],
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      l.ctx.listener.positionY.setTargetAtTime(
                        l._pos[1],
                        Howler.ctx.currentTime,
                        0.1,
                      ),
                      l.ctx.listener.positionZ.setTargetAtTime(
                        l._pos[2],
                        Howler.ctx.currentTime,
                        0.1,
                      ))
                    : l.ctx.listener.setPosition(l._pos[0], l._pos[1], l._pos[2]));
              else return l._pos;
              return l;
            }),
            (HowlerGlobal.prototype.orientation = function (s, a, o, l, c, u) {
              var f = this;
              if (!f.ctx || !f.ctx.listener) return f;
              var g = f._orientation;
              if (
                ((a = typeof a != "number" ? g[1] : a),
                (o = typeof o != "number" ? g[2] : o),
                (l = typeof l != "number" ? g[3] : l),
                (c = typeof c != "number" ? g[4] : c),
                (u = typeof u != "number" ? g[5] : u),
                typeof s == "number")
              )
                ((f._orientation = [s, a, o, l, c, u]),
                  typeof f.ctx.listener.forwardX < "u"
                    ? (f.ctx.listener.forwardX.setTargetAtTime(s, Howler.ctx.currentTime, 0.1),
                      f.ctx.listener.forwardY.setTargetAtTime(a, Howler.ctx.currentTime, 0.1),
                      f.ctx.listener.forwardZ.setTargetAtTime(o, Howler.ctx.currentTime, 0.1),
                      f.ctx.listener.upX.setTargetAtTime(l, Howler.ctx.currentTime, 0.1),
                      f.ctx.listener.upY.setTargetAtTime(c, Howler.ctx.currentTime, 0.1),
                      f.ctx.listener.upZ.setTargetAtTime(u, Howler.ctx.currentTime, 0.1))
                    : f.ctx.listener.setOrientation(s, a, o, l, c, u));
              else return g;
              return f;
            }),
            (Howl.prototype.init = (function (s) {
              return function (a) {
                var o = this;
                return (
                  (o._orientation = a.orientation || [1, 0, 0]),
                  (o._stereo = a.stereo || null),
                  (o._pos = a.pos || null),
                  (o._pannerAttr = {
                    coneInnerAngle: typeof a.coneInnerAngle < "u" ? a.coneInnerAngle : 360,
                    coneOuterAngle: typeof a.coneOuterAngle < "u" ? a.coneOuterAngle : 360,
                    coneOuterGain: typeof a.coneOuterGain < "u" ? a.coneOuterGain : 0,
                    distanceModel: typeof a.distanceModel < "u" ? a.distanceModel : "inverse",
                    maxDistance: typeof a.maxDistance < "u" ? a.maxDistance : 1e4,
                    panningModel: typeof a.panningModel < "u" ? a.panningModel : "HRTF",
                    refDistance: typeof a.refDistance < "u" ? a.refDistance : 1,
                    rolloffFactor: typeof a.rolloffFactor < "u" ? a.rolloffFactor : 1,
                  }),
                  (o._onstereo = a.onstereo ? [{ fn: a.onstereo }] : []),
                  (o._onpos = a.onpos ? [{ fn: a.onpos }] : []),
                  (o._onorientation = a.onorientation ? [{ fn: a.onorientation }] : []),
                  s.call(this, a)
                );
              };
            })(Howl.prototype.init)),
            (Howl.prototype.stereo = function (s, a) {
              var o = this;
              if (!o._webAudio) return o;
              if (o._state !== "loaded")
                return (
                  o._queue.push({
                    event: "stereo",
                    action: function () {
                      o.stereo(s, a);
                    },
                  }),
                  o
                );
              var l = typeof Howler.ctx.createStereoPanner > "u" ? "spatial" : "stereo";
              if (typeof a > "u")
                if (typeof s == "number") ((o._stereo = s), (o._pos = [s, 0, 0]));
                else return o._stereo;
              for (var c = o._getSoundIds(a), u = 0; u < c.length; u++) {
                var f = o._soundById(c[u]);
                if (f)
                  if (typeof s == "number")
                    ((f._stereo = s),
                      (f._pos = [s, 0, 0]),
                      f._node &&
                        ((f._pannerAttr.panningModel = "equalpower"),
                        (!f._panner || !f._panner.pan) && n(f, l),
                        l === "spatial"
                          ? typeof f._panner.positionX < "u"
                            ? (f._panner.positionX.setValueAtTime(s, Howler.ctx.currentTime),
                              f._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime),
                              f._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime))
                            : f._panner.setPosition(s, 0, 0)
                          : f._panner.pan.setValueAtTime(s, Howler.ctx.currentTime)),
                      o._emit("stereo", f._id));
                  else return f._stereo;
              }
              return o;
            }),
            (Howl.prototype.pos = function (s, a, o, l) {
              var c = this;
              if (!c._webAudio) return c;
              if (c._state !== "loaded")
                return (
                  c._queue.push({
                    event: "pos",
                    action: function () {
                      c.pos(s, a, o, l);
                    },
                  }),
                  c
                );
              if (
                ((a = typeof a != "number" ? 0 : a),
                (o = typeof o != "number" ? -0.5 : o),
                typeof l > "u")
              )
                if (typeof s == "number") c._pos = [s, a, o];
                else return c._pos;
              for (var u = c._getSoundIds(l), f = 0; f < u.length; f++) {
                var g = c._soundById(u[f]);
                if (g)
                  if (typeof s == "number")
                    ((g._pos = [s, a, o]),
                      g._node &&
                        ((!g._panner || g._panner.pan) && n(g, "spatial"),
                        typeof g._panner.positionX < "u"
                          ? (g._panner.positionX.setValueAtTime(s, Howler.ctx.currentTime),
                            g._panner.positionY.setValueAtTime(a, Howler.ctx.currentTime),
                            g._panner.positionZ.setValueAtTime(o, Howler.ctx.currentTime))
                          : g._panner.setPosition(s, a, o)),
                      c._emit("pos", g._id));
                  else return g._pos;
              }
              return c;
            }),
            (Howl.prototype.orientation = function (s, a, o, l) {
              var c = this;
              if (!c._webAudio) return c;
              if (c._state !== "loaded")
                return (
                  c._queue.push({
                    event: "orientation",
                    action: function () {
                      c.orientation(s, a, o, l);
                    },
                  }),
                  c
                );
              if (
                ((a = typeof a != "number" ? c._orientation[1] : a),
                (o = typeof o != "number" ? c._orientation[2] : o),
                typeof l > "u")
              )
                if (typeof s == "number") c._orientation = [s, a, o];
                else return c._orientation;
              for (var u = c._getSoundIds(l), f = 0; f < u.length; f++) {
                var g = c._soundById(u[f]);
                if (g)
                  if (typeof s == "number")
                    ((g._orientation = [s, a, o]),
                      g._node &&
                        (g._panner ||
                          (g._pos || (g._pos = c._pos || [0, 0, -0.5]), n(g, "spatial")),
                        typeof g._panner.orientationX < "u"
                          ? (g._panner.orientationX.setValueAtTime(s, Howler.ctx.currentTime),
                            g._panner.orientationY.setValueAtTime(a, Howler.ctx.currentTime),
                            g._panner.orientationZ.setValueAtTime(o, Howler.ctx.currentTime))
                          : g._panner.setOrientation(s, a, o)),
                      c._emit("orientation", g._id));
                  else return g._orientation;
              }
              return c;
            }),
            (Howl.prototype.pannerAttr = function () {
              var s = this,
                a = arguments,
                o,
                l,
                c;
              if (!s._webAudio) return s;
              if (a.length === 0) return s._pannerAttr;
              if (a.length === 1)
                if (typeof a[0] == "object")
                  ((o = a[0]),
                    typeof l > "u" &&
                      (o.pannerAttr ||
                        (o.pannerAttr = {
                          coneInnerAngle: o.coneInnerAngle,
                          coneOuterAngle: o.coneOuterAngle,
                          coneOuterGain: o.coneOuterGain,
                          distanceModel: o.distanceModel,
                          maxDistance: o.maxDistance,
                          refDistance: o.refDistance,
                          rolloffFactor: o.rolloffFactor,
                          panningModel: o.panningModel,
                        }),
                      (s._pannerAttr = {
                        coneInnerAngle:
                          typeof o.pannerAttr.coneInnerAngle < "u"
                            ? o.pannerAttr.coneInnerAngle
                            : s._coneInnerAngle,
                        coneOuterAngle:
                          typeof o.pannerAttr.coneOuterAngle < "u"
                            ? o.pannerAttr.coneOuterAngle
                            : s._coneOuterAngle,
                        coneOuterGain:
                          typeof o.pannerAttr.coneOuterGain < "u"
                            ? o.pannerAttr.coneOuterGain
                            : s._coneOuterGain,
                        distanceModel:
                          typeof o.pannerAttr.distanceModel < "u"
                            ? o.pannerAttr.distanceModel
                            : s._distanceModel,
                        maxDistance:
                          typeof o.pannerAttr.maxDistance < "u"
                            ? o.pannerAttr.maxDistance
                            : s._maxDistance,
                        refDistance:
                          typeof o.pannerAttr.refDistance < "u"
                            ? o.pannerAttr.refDistance
                            : s._refDistance,
                        rolloffFactor:
                          typeof o.pannerAttr.rolloffFactor < "u"
                            ? o.pannerAttr.rolloffFactor
                            : s._rolloffFactor,
                        panningModel:
                          typeof o.pannerAttr.panningModel < "u"
                            ? o.pannerAttr.panningModel
                            : s._panningModel,
                      })));
                else
                  return (
                    (c = s._soundById(parseInt(a[0], 10))),
                    c ? c._pannerAttr : s._pannerAttr
                  );
              else a.length === 2 && ((o = a[0]), (l = parseInt(a[1], 10)));
              for (var u = s._getSoundIds(l), f = 0; f < u.length; f++)
                if (((c = s._soundById(u[f])), c)) {
                  var g = c._pannerAttr;
                  g = {
                    coneInnerAngle:
                      typeof o.coneInnerAngle < "u" ? o.coneInnerAngle : g.coneInnerAngle,
                    coneOuterAngle:
                      typeof o.coneOuterAngle < "u" ? o.coneOuterAngle : g.coneOuterAngle,
                    coneOuterGain: typeof o.coneOuterGain < "u" ? o.coneOuterGain : g.coneOuterGain,
                    distanceModel: typeof o.distanceModel < "u" ? o.distanceModel : g.distanceModel,
                    maxDistance: typeof o.maxDistance < "u" ? o.maxDistance : g.maxDistance,
                    refDistance: typeof o.refDistance < "u" ? o.refDistance : g.refDistance,
                    rolloffFactor: typeof o.rolloffFactor < "u" ? o.rolloffFactor : g.rolloffFactor,
                    panningModel: typeof o.panningModel < "u" ? o.panningModel : g.panningModel,
                  };
                  var x = c._panner;
                  (x ||
                    (c._pos || (c._pos = s._pos || [0, 0, -0.5]), n(c, "spatial"), (x = c._panner)),
                    (x.coneInnerAngle = g.coneInnerAngle),
                    (x.coneOuterAngle = g.coneOuterAngle),
                    (x.coneOuterGain = g.coneOuterGain),
                    (x.distanceModel = g.distanceModel),
                    (x.maxDistance = g.maxDistance),
                    (x.refDistance = g.refDistance),
                    (x.rolloffFactor = g.rolloffFactor),
                    (x.panningModel = g.panningModel));
                }
              return s;
            }),
            (Sound.prototype.init = (function (s) {
              return function () {
                var a = this,
                  o = a._parent;
                ((a._orientation = o._orientation),
                  (a._stereo = o._stereo),
                  (a._pos = o._pos),
                  (a._pannerAttr = o._pannerAttr),
                  s.call(this),
                  a._stereo
                    ? o.stereo(a._stereo)
                    : a._pos && o.pos(a._pos[0], a._pos[1], a._pos[2], a._id));
              };
            })(Sound.prototype.init)),
            (Sound.prototype.reset = (function (s) {
              return function () {
                var a = this,
                  o = a._parent;
                return (
                  (a._orientation = o._orientation),
                  (a._stereo = o._stereo),
                  (a._pos = o._pos),
                  (a._pannerAttr = o._pannerAttr),
                  a._stereo
                    ? o.stereo(a._stereo)
                    : a._pos
                      ? o.pos(a._pos[0], a._pos[1], a._pos[2], a._id)
                      : a._panner &&
                        (a._panner.disconnect(0), (a._panner = void 0), o._refreshBuffer(a)),
                  s.call(this)
                );
              };
            })(Sound.prototype.reset)));
          var n = function (s, a) {
            ((a = a || "spatial"),
              a === "spatial"
                ? ((s._panner = Howler.ctx.createPanner()),
                  (s._panner.coneInnerAngle = s._pannerAttr.coneInnerAngle),
                  (s._panner.coneOuterAngle = s._pannerAttr.coneOuterAngle),
                  (s._panner.coneOuterGain = s._pannerAttr.coneOuterGain),
                  (s._panner.distanceModel = s._pannerAttr.distanceModel),
                  (s._panner.maxDistance = s._pannerAttr.maxDistance),
                  (s._panner.refDistance = s._pannerAttr.refDistance),
                  (s._panner.rolloffFactor = s._pannerAttr.rolloffFactor),
                  (s._panner.panningModel = s._pannerAttr.panningModel),
                  typeof s._panner.positionX < "u"
                    ? (s._panner.positionX.setValueAtTime(s._pos[0], Howler.ctx.currentTime),
                      s._panner.positionY.setValueAtTime(s._pos[1], Howler.ctx.currentTime),
                      s._panner.positionZ.setValueAtTime(s._pos[2], Howler.ctx.currentTime))
                    : s._panner.setPosition(s._pos[0], s._pos[1], s._pos[2]),
                  typeof s._panner.orientationX < "u"
                    ? (s._panner.orientationX.setValueAtTime(
                        s._orientation[0],
                        Howler.ctx.currentTime,
                      ),
                      s._panner.orientationY.setValueAtTime(
                        s._orientation[1],
                        Howler.ctx.currentTime,
                      ),
                      s._panner.orientationZ.setValueAtTime(
                        s._orientation[2],
                        Howler.ctx.currentTime,
                      ))
                    : s._panner.setOrientation(
                        s._orientation[0],
                        s._orientation[1],
                        s._orientation[2],
                      ))
                : ((s._panner = Howler.ctx.createStereoPanner()),
                  s._panner.pan.setValueAtTime(s._stereo, Howler.ctx.currentTime)),
              s._panner.connect(s._node),
              s._paused || s._parent.pause(s._id, !0).play(s._id, !0));
          };
        })();
      })(Xu)),
    Xu
  );
}
