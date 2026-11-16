await window.__cakeDataReady;

var GLOBAL_OBJECT =
    typeof globalThis < "u"
      ? globalThis
      : typeof window < "u"
        ? window
        : typeof global < "u"
          ? global
          : typeof self < "u"
            ? self
            : {},
  reactJsxModule = { exports: {} },
  reactJsxExports = {},
  reactCache = { exports: {} },
  reactExports = {};

var reactModuleLoaded;

function createReactNamespace() {
  if (reactModuleLoaded) return reactExports;
  reactModuleLoaded = 1;
  var e = Symbol.for("react.element"),
    n = Symbol.for("react.portal"),
    s = Symbol.for("react.fragment"),
    a = Symbol.for("react.strict_mode"),
    o = Symbol.for("react.profiler"),
    l = Symbol.for("react.provider"),
    c = Symbol.for("react.context"),
    u = Symbol.for("react.forward_ref"),
    f = Symbol.for("react.suspense"),
    g = Symbol.for("react.memo"),
    x = Symbol.for("react.lazy"),
    m = Symbol.iterator;
  function p(I) {
    return I === null || typeof I != "object"
      ? null
      : ((I = (m && I[m]) || I["@@iterator"]), typeof I == "function" ? I : null);
  }
  var y = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    j = Object.assign,
    v = {};
  function w(I, U, fe) {
    ((this.props = I), (this.context = U), (this.refs = v), (this.updater = fe || y));
  }
  ((w.prototype.isReactComponent = {}),
    (w.prototype.setState = function (I, U) {
      if (typeof I != "object" && typeof I != "function" && I != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, I, U, "setState");
    }),
    (w.prototype.forceUpdate = function (I) {
      this.updater.enqueueForceUpdate(this, I, "forceUpdate");
    }));
  function N() {}
  N.prototype = w.prototype;
  function S(I, U, fe) {
    ((this.props = I), (this.context = U), (this.refs = v), (this.updater = fe || y));
  }
  var C = (S.prototype = new N());
  ((C.constructor = S), j(C, w.prototype), (C.isPureReactComponent = !0));
  var V = Array.isArray,
    E = Object.prototype.hasOwnProperty,
    F = { current: null },
    J = { key: !0, ref: !0, __self: !0, __source: !0 };
  function H(I, U, fe) {
    var ve,
      Ae = {},
      Ne = null,
      Te = null;
    if (U != null)
      for (ve in (U.ref !== void 0 && (Te = U.ref), U.key !== void 0 && (Ne = "" + U.key), U))
        E.call(U, ve) && !J.hasOwnProperty(ve) && (Ae[ve] = U[ve]);
    var Se = arguments.length - 2;
    if (Se === 1) Ae.children = fe;
    else if (1 < Se) {
      for (var Oe = Array(Se), nt = 0; nt < Se; nt++) Oe[nt] = arguments[nt + 2];
      Ae.children = Oe;
    }
    if (I && I.defaultProps)
      for (ve in ((Se = I.defaultProps), Se)) Ae[ve] === void 0 && (Ae[ve] = Se[ve]);
    return { $$typeof: e, type: I, key: Ne, ref: Te, props: Ae, _owner: F.current };
  }
  function R(I, U) {
    return { $$typeof: e, type: I.type, key: U, ref: I.ref, props: I.props, _owner: I._owner };
  }
  function se(I) {
    return typeof I == "object" && I !== null && I.$$typeof === e;
  }
  function be(I) {
    var U = { "=": "=0", ":": "=2" };
    return (
      "$" +
      I.replace(/[=:]/g, function (fe) {
        return U[fe];
      })
    );
  }
  var Ie = /\/+/g;
  function xe(I, U) {
    return typeof I == "object" && I !== null && I.key != null ? be("" + I.key) : U.toString(36);
  }
  function ye(I, U, fe, ve, Ae) {
    var Ne = typeof I;
    (Ne === "undefined" || Ne === "boolean") && (I = null);
    var Te = !1;
    if (I === null) Te = !0;
    else
      switch (Ne) {
        case "string":
        case "number":
          Te = !0;
          break;
        case "object":
          switch (I.$$typeof) {
            case e:
            case n:
              Te = !0;
          }
      }
    if (Te)
      return (
        (Te = I),
        (Ae = Ae(Te)),
        (I = ve === "" ? "." + xe(Te, 0) : ve),
        V(Ae)
          ? ((fe = ""),
            I != null && (fe = I.replace(Ie, "$&/") + "/"),
            ye(Ae, U, fe, "", function (nt) {
              return nt;
            }))
          : Ae != null &&
            (se(Ae) &&
              (Ae = R(
                Ae,
                fe +
                  (!Ae.key || (Te && Te.key === Ae.key)
                    ? ""
                    : ("" + Ae.key).replace(Ie, "$&/") + "/") +
                  I,
              )),
            U.push(Ae)),
        1
      );
    if (((Te = 0), (ve = ve === "" ? "." : ve + ":"), V(I)))
      for (var Se = 0; Se < I.length; Se++) {
        Ne = I[Se];
        var Oe = ve + xe(Ne, Se);
        Te += ye(Ne, U, fe, Oe, Ae);
      }
    else if (((Oe = p(I)), typeof Oe == "function"))
      for (I = Oe.call(I), Se = 0; !(Ne = I.next()).done;)
        ((Ne = Ne.value), (Oe = ve + xe(Ne, Se++)), (Te += ye(Ne, U, fe, Oe, Ae)));
    else if (Ne === "object")
      throw (
        (U = String(I)),
        Error(
          "Objects are not valid as a React child (found: " +
            (U === "[object Object]" ? "object with keys {" + Object.keys(I).join(", ") + "}" : U) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    return Te;
  }
  function P(I, U, fe) {
    if (I == null) return I;
    var ve = [],
      Ae = 0;
    return (
      ye(I, ve, "", "", function (Ne) {
        return U.call(fe, Ne, Ae++);
      }),
      ve
    );
  }
  function ne(I) {
    if (I._status === -1) {
      var U = I._result;
      ((U = U()),
        U.then(
          function (fe) {
            (I._status === 0 || I._status === -1) && ((I._status = 1), (I._result = fe));
          },
          function (fe) {
            (I._status === 0 || I._status === -1) && ((I._status = 2), (I._result = fe));
          },
        ),
        I._status === -1 && ((I._status = 0), (I._result = U)));
    }
    if (I._status === 1) return I._result.default;
    throw I._result;
  }
  var D = { current: null },
    O = { transition: null },
    K = { ReactCurrentDispatcher: D, ReactCurrentBatchConfig: O, ReactCurrentOwner: F };
  function Y() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return (
    (reactExports.Children = {
      map: P,
      forEach: function (I, U, fe) {
        P(
          I,
          function () {
            U.apply(this, arguments);
          },
          fe,
        );
      },
      count: function (I) {
        var U = 0;
        return (
          P(I, function () {
            U++;
          }),
          U
        );
      },
      toArray: function (I) {
        return (
          P(I, function (U) {
            return U;
          }) || []
        );
      },
      only: function (I) {
        if (!se(I))
          throw Error("React.Children.only expected to receive a single React element child.");
        return I;
      },
    }),
    (reactExports.Component = w),
    (reactExports.Fragment = s),
    (reactExports.Profiler = o),
    (reactExports.PureComponent = S),
    (reactExports.StrictMode = a),
    (reactExports.Suspense = f),
    (reactExports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = K),
    (reactExports.act = Y),
    (reactExports.cloneElement = function (I, U, fe) {
      if (I == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            I +
            ".",
        );
      var ve = j({}, I.props),
        Ae = I.key,
        Ne = I.ref,
        Te = I._owner;
      if (U != null) {
        if (
          (U.ref !== void 0 && ((Ne = U.ref), (Te = F.current)),
          U.key !== void 0 && (Ae = "" + U.key),
          I.type && I.type.defaultProps)
        )
          var Se = I.type.defaultProps;
        for (Oe in U)
          E.call(U, Oe) &&
            !J.hasOwnProperty(Oe) &&
            (ve[Oe] = U[Oe] === void 0 && Se !== void 0 ? Se[Oe] : U[Oe]);
      }
      var Oe = arguments.length - 2;
      if (Oe === 1) ve.children = fe;
      else if (1 < Oe) {
        Se = Array(Oe);
        for (var nt = 0; nt < Oe; nt++) Se[nt] = arguments[nt + 2];
        ve.children = Se;
      }
      return { $$typeof: e, type: I.type, key: Ae, ref: Ne, props: ve, _owner: Te };
    }),
    (reactExports.createContext = function (I) {
      return (
        (I = {
          $$typeof: c,
          _currentValue: I,
          _currentValue2: I,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (I.Provider = { $$typeof: l, _context: I }),
        (I.Consumer = I)
      );
    }),
    (reactExports.createElement = H),
    (reactExports.createFactory = function (I) {
      var U = H.bind(null, I);
      return ((U.type = I), U);
    }),
    (reactExports.createRef = function () {
      return { current: null };
    }),
    (reactExports.forwardRef = function (I) {
      return { $$typeof: u, render: I };
    }),
    (reactExports.isValidElement = se),
    (reactExports.lazy = function (I) {
      return { $$typeof: x, _payload: { _status: -1, _result: I }, _init: ne };
    }),
    (reactExports.memo = function (I, U) {
      return { $$typeof: g, type: I, compare: U === void 0 ? null : U };
    }),
    (reactExports.startTransition = function (I) {
      var U = O.transition;
      O.transition = {};
      try {
        I();
      } finally {
        O.transition = U;
      }
    }),
    (reactExports.unstable_act = Y),
    (reactExports.useCallback = function (I, U) {
      return D.current.useCallback(I, U);
    }),
    (reactExports.useContext = function (I) {
      return D.current.useContext(I);
    }),
    (reactExports.useDebugValue = function () {}),
    (reactExports.useDeferredValue = function (I) {
      return D.current.useDeferredValue(I);
    }),
    (reactExports.useEffect = function (I, U) {
      return D.current.useEffect(I, U);
    }),
    (reactExports.useId = function () {
      return D.current.useId();
    }),
    (reactExports.useImperativeHandle = function (I, U, fe) {
      return D.current.useImperativeHandle(I, U, fe);
    }),
    (reactExports.useInsertionEffect = function (I, U) {
      return D.current.useInsertionEffect(I, U);
    }),
    (reactExports.useLayoutEffect = function (I, U) {
      return D.current.useLayoutEffect(I, U);
    }),
    (reactExports.useMemo = function (I, U) {
      return D.current.useMemo(I, U);
    }),
    (reactExports.useReducer = function (I, U, fe) {
      return D.current.useReducer(I, U, fe);
    }),
    (reactExports.useRef = function (I) {
      return D.current.useRef(I);
    }),
    (reactExports.useState = function (I) {
      return D.current.useState(I);
    }),
    (reactExports.useSyncExternalStore = function (I, U, fe) {
      return D.current.useSyncExternalStore(I, U, fe);
    }),
    (reactExports.useTransition = function () {
      return D.current.useTransition();
    }),
    (reactExports.version = "18.3.1"),
    reactExports
  );
}

var reactNamespaceLoaded;

function getReactNamespace() {
  return (reactNamespaceLoaded || ((reactNamespaceLoaded = 1), (reactCache.exports = createReactNamespace())), reactCache.exports);
}

var jsxRuntimeLoaded;

function createJsxRuntime() {
  if (jsxRuntimeLoaded) return reactJsxExports;
  jsxRuntimeLoaded = 1;
  var e = getReactNamespace(),
    n = Symbol.for("react.element"),
    s = Symbol.for("react.fragment"),
    a = Object.prototype.hasOwnProperty,
    o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    l = { key: !0, ref: !0, __self: !0, __source: !0 };
  function c(u, f, g) {
    var x,
      m = {},
      p = null,
      y = null;
    (g !== void 0 && (p = "" + g),
      f.key !== void 0 && (p = "" + f.key),
      f.ref !== void 0 && (y = f.ref));
    for (x in f) a.call(f, x) && !l.hasOwnProperty(x) && (m[x] = f[x]);
    if (u && u.defaultProps) for (x in ((f = u.defaultProps), f)) m[x] === void 0 && (m[x] = f[x]);
    return { $$typeof: n, type: u, key: p, ref: y, props: m, _owner: o.current };
  }
  return ((reactJsxExports.Fragment = s), (reactJsxExports.jsx = c), (reactJsxExports.jsxs = c), reactJsxExports);
}

var jsxModuleLoaded;

function getJsxRuntime() {
  return (jsxModuleLoaded || ((jsxModuleLoaded = 1), (reactJsxModule.exports = createJsxRuntime())), reactJsxModule.exports);
}

var jsxRuntime = getJsxRuntime(),
  React = getReactNamespace(),
  reactDomExports = {},
  reactDomModule = { exports: {} },
  reactDomDevExports = {},
  reactDomDevModule = { exports: {} },
  reactDomDevCache = {};

var reactDomDevLoaded;

function createReactDomDev() {
  return (
    reactDomDevLoaded ||
      ((reactDomDevLoaded = 1),
      (function (e) {
        function n(O, K) {
          var Y = O.length;
          O.push(K);
          e: for (; 0 < Y;) {
            var I = (Y - 1) >>> 1,
              U = O[I];
            if (0 < o(U, K)) ((O[I] = K), (O[Y] = U), (Y = I));
            else break e;
          }
        }
        function s(O) {
          return O.length === 0 ? null : O[0];
        }
        function a(O) {
          if (O.length === 0) return null;
          var K = O[0],
            Y = O.pop();
          if (Y !== K) {
            O[0] = Y;
            e: for (var I = 0, U = O.length, fe = U >>> 1; I < fe;) {
              var ve = 2 * (I + 1) - 1,
                Ae = O[ve],
                Ne = ve + 1,
                Te = O[Ne];
              if (0 > o(Ae, Y))
                Ne < U && 0 > o(Te, Ae)
                  ? ((O[I] = Te), (O[Ne] = Y), (I = Ne))
                  : ((O[I] = Ae), (O[ve] = Y), (I = ve));
              else if (Ne < U && 0 > o(Te, Y)) ((O[I] = Te), (O[Ne] = Y), (I = Ne));
              else break e;
            }
          }
          return K;
        }
        function o(O, K) {
          var Y = O.sortIndex - K.sortIndex;
          return Y !== 0 ? Y : O.id - K.id;
        }
        if (typeof performance == "object" && typeof performance.now == "function") {
          var l = performance;
          e.unstable_now = function () {
            return l.now();
          };
        } else {
          var c = Date,
            u = c.now();
          e.unstable_now = function () {
            return c.now() - u;
          };
        }
        var f = [],
          g = [],
          x = 1,
          m = null,
          p = 3,
          y = !1,
          j = !1,
          v = !1,
          w = typeof setTimeout == "function" ? setTimeout : null,
          N = typeof clearTimeout == "function" ? clearTimeout : null,
          S = typeof setImmediate < "u" ? setImmediate : null;
        typeof navigator < "u" &&
          navigator.scheduling !== void 0 &&
          navigator.scheduling.isInputPending !== void 0 &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        function C(O) {
          for (var K = s(g); K !== null;) {
            if (K.callback === null) a(g);
            else if (K.startTime <= O) (a(g), (K.sortIndex = K.expirationTime), n(f, K));
            else break;
            K = s(g);
          }
        }
        function V(O) {
          if (((v = !1), C(O), !j))
            if (s(f) !== null) ((j = !0), ne(E));
            else {
              var K = s(g);
              K !== null && D(V, K.startTime - O);
            }
        }
        function E(O, K) {
          ((j = !1), v && ((v = !1), N(H), (H = -1)), (y = !0));
          var Y = p;
          try {
            for (C(K), m = s(f); m !== null && (!(m.expirationTime > K) || (O && !be()));) {
              var I = m.callback;
              if (typeof I == "function") {
                ((m.callback = null), (p = m.priorityLevel));
                var U = I(m.expirationTime <= K);
                ((K = e.unstable_now()),
                  typeof U == "function" ? (m.callback = U) : m === s(f) && a(f),
                  C(K));
              } else a(f);
              m = s(f);
            }
            if (m !== null) var fe = !0;
            else {
              var ve = s(g);
              (ve !== null && D(V, ve.startTime - K), (fe = !1));
            }
            return fe;
          } finally {
            ((m = null), (p = Y), (y = !1));
          }
        }
        var F = !1,
          J = null,
          H = -1,
          R = 5,
          se = -1;
        function be() {
          return !(e.unstable_now() - se < R);
        }
        function Ie() {
          if (J !== null) {
            var O = e.unstable_now();
            se = O;
            var K = !0;
            try {
              K = J(!0, O);
            } finally {
              K ? xe() : ((F = !1), (J = null));
            }
          } else F = !1;
        }
        var xe;
        if (typeof S == "function")
          xe = function () {
            S(Ie);
          };
        else if (typeof MessageChannel < "u") {
          var ye = new MessageChannel(),
            P = ye.port2;
          ((ye.port1.onmessage = Ie),
            (xe = function () {
              P.postMessage(null);
            }));
        } else
          xe = function () {
            w(Ie, 0);
          };
        function ne(O) {
          ((J = O), F || ((F = !0), xe()));
        }
        function D(O, K) {
          H = w(function () {
            O(e.unstable_now());
          }, K);
        }
        ((e.unstable_IdlePriority = 5),
          (e.unstable_ImmediatePriority = 1),
          (e.unstable_LowPriority = 4),
          (e.unstable_NormalPriority = 3),
          (e.unstable_Profiling = null),
          (e.unstable_UserBlockingPriority = 2),
          (e.unstable_cancelCallback = function (O) {
            O.callback = null;
          }),
          (e.unstable_continueExecution = function () {
            j || y || ((j = !0), ne(E));
          }),
          (e.unstable_forceFrameRate = function (O) {
            0 > O || 125 < O
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (R = 0 < O ? Math.floor(1e3 / O) : 5);
          }),
          (e.unstable_getCurrentPriorityLevel = function () {
            return p;
          }),
          (e.unstable_getFirstCallbackNode = function () {
            return s(f);
          }),
          (e.unstable_next = function (O) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var K = 3;
                break;
              default:
                K = p;
            }
            var Y = p;
            p = K;
            try {
              return O();
            } finally {
              p = Y;
            }
          }),
          (e.unstable_pauseExecution = function () {}),
          (e.unstable_requestPaint = function () {}),
          (e.unstable_runWithPriority = function (O, K) {
            switch (O) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                O = 3;
            }
            var Y = p;
            p = O;
            try {
              return K();
            } finally {
              p = Y;
            }
          }),
          (e.unstable_scheduleCallback = function (O, K, Y) {
            var I = e.unstable_now();
            switch (
              (typeof Y == "object" && Y !== null
                ? ((Y = Y.delay), (Y = typeof Y == "number" && 0 < Y ? I + Y : I))
                : (Y = I),
              O)
            ) {
              case 1:
                var U = -1;
                break;
              case 2:
                U = 250;
                break;
              case 5:
                U = 1073741823;
                break;
              case 4:
                U = 1e4;
                break;
              default:
                U = 5e3;
            }
            return (
              (U = Y + U),
              (O = {
                id: x++,
                callback: K,
                priorityLevel: O,
                startTime: Y,
                expirationTime: U,
                sortIndex: -1,
              }),
              Y > I
                ? ((O.sortIndex = Y),
                  n(g, O),
                  s(f) === null && O === s(g) && (v ? (N(H), (H = -1)) : (v = !0), D(V, Y - I)))
                : ((O.sortIndex = U), n(f, O), j || y || ((j = !0), ne(E))),
              O
            );
          }),
          (e.unstable_shouldYield = be),
          (e.unstable_wrapCallback = function (O) {
            var K = p;
            return function () {
              var Y = p;
              p = K;
              try {
                return O.apply(this, arguments);
              } finally {
                p = Y;
              }
            };
          }));
      })(reactDomDevCache)),
    reactDomDevCache
  );
}

var reactDomDevModuleLoaded;

function getReactDomDev() {
  return (reactDomDevModuleLoaded || ((reactDomDevModuleLoaded = 1), (reactDomDevModule.exports = createReactDomDev())), reactDomDevModule.exports);
}

var reactDomLoaded;
