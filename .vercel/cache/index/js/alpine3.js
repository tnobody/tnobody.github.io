(() => {
  var Ve = !1,
    He = !1,
    ee = [];
  function Rt(e) {
    Xr(e);
  }
  function Xr(e) {
    ee.includes(e) || ee.push(e), en();
  }
  function en() {
    !He && !Ve && ((Ve = !0), queueMicrotask(tn));
  }
  function tn() {
    (Ve = !1), (He = !0);
    for (let e = 0; e < ee.length; e++) ee[e]();
    (ee.length = 0), (He = !1);
  }
  var O,
    k,
    G,
    qe,
    Ue = !0;
  function Mt(e) {
    (Ue = !1), e(), (Ue = !0);
  }
  function Nt(e) {
    (O = e.reactive),
      (G = e.release),
      (k = (t) =>
        e.effect(t, {
          scheduler: (r) => {
            Ue ? Rt(r) : r();
          },
        })),
      (qe = e.raw);
  }
  function We(e) {
    k = e;
  }
  function kt(e) {
    let t = () => {};
    return [
      (n) => {
        let i = k(n);
        e._x_effects ||
          ((e._x_effects = new Set()),
          (e._x_runEffects = () => {
            e._x_effects.forEach((o) => o());
          })),
          e._x_effects.add(i),
          (t = () => {
            i !== void 0 && (e._x_effects.delete(i), G(i));
          });
      },
      () => {
        t();
      },
    ];
  }
  var Pt = [],
    It = [],
    Dt = [];
  function $t(e) {
    Dt.push(e);
  }
  function Lt(e) {
    It.push(e);
  }
  function jt(e) {
    Pt.push(e);
  }
  function Ft(e, t, r) {
    e._x_attributeCleanups || (e._x_attributeCleanups = {}),
      e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
      e._x_attributeCleanups[t].push(r);
  }
  function Ge(e, t) {
    !e._x_attributeCleanups ||
      Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
        (t === void 0 || t.includes(r)) &&
          (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
      });
  }
  var Je = new MutationObserver(Ye),
    Ze = !1;
  function Qe() {
    Je.observe(document, {
      subtree: !0,
      childList: !0,
      attributes: !0,
      attributeOldValue: !0,
    }),
      (Ze = !0);
  }
  function nn() {
    rn(), Je.disconnect(), (Ze = !1);
  }
  var te = [],
    Xe = !1;
  function rn() {
    (te = te.concat(Je.takeRecords())),
      te.length &&
        !Xe &&
        ((Xe = !0),
        queueMicrotask(() => {
          on(), (Xe = !1);
        }));
  }
  function on() {
    Ye(te), (te.length = 0);
  }
  function m(e) {
    if (!Ze) return e();
    nn();
    let t = e();
    return Qe(), t;
  }
  var et = !1,
    he = [];
  function Kt() {
    et = !0;
  }
  function zt() {
    (et = !1), Ye(he), (he = []);
  }
  function Ye(e) {
    if (et) {
      he = he.concat(e);
      return;
    }
    let t = [],
      r = [],
      n = new Map(),
      i = new Map();
    for (let o = 0; o < e.length; o++)
      if (
        !e[o].target._x_ignoreMutationObserver &&
        (e[o].type === "childList" &&
          (e[o].addedNodes.forEach((s) => s.nodeType === 1 && t.push(s)),
          e[o].removedNodes.forEach((s) => s.nodeType === 1 && r.push(s))),
        e[o].type === "attributes")
      ) {
        let s = e[o].target,
          a = e[o].attributeName,
          c = e[o].oldValue,
          l = () => {
            n.has(s) || n.set(s, []),
              n.get(s).push({ name: a, value: s.getAttribute(a) });
          },
          u = () => {
            i.has(s) || i.set(s, []), i.get(s).push(a);
          };
        s.hasAttribute(a) && c === null
          ? l()
          : s.hasAttribute(a)
          ? (u(), l())
          : u();
      }
    i.forEach((o, s) => {
      Ge(s, o);
    }),
      n.forEach((o, s) => {
        Pt.forEach((a) => a(s, o));
      });
    for (let o of r) t.includes(o) || It.forEach((s) => s(o));
    t.forEach((o) => {
      (o._x_ignoreSelf = !0), (o._x_ignore = !0);
    });
    for (let o of t)
      r.includes(o) ||
        !o.isConnected ||
        (delete o._x_ignoreSelf,
        delete o._x_ignore,
        Dt.forEach((s) => s(o)),
        (o._x_ignore = !0),
        (o._x_ignoreSelf = !0));
    t.forEach((o) => {
      delete o._x_ignoreSelf, delete o._x_ignore;
    }),
      (t = null),
      (r = null),
      (n = null),
      (i = null);
  }
  function _e(e) {
    return I(P(e));
  }
  function C(e, t, r) {
    return (
      (e._x_dataStack = [t, ...P(r || e)]),
      () => {
        e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
      }
    );
  }
  function tt(e, t) {
    let r = e._x_dataStack[0];
    Object.entries(t).forEach(([n, i]) => {
      r[n] = i;
    });
  }
  function P(e) {
    return e._x_dataStack
      ? e._x_dataStack
      : typeof ShadowRoot == "function" && e instanceof ShadowRoot
      ? P(e.host)
      : e.parentNode
      ? P(e.parentNode)
      : [];
  }
  function I(e) {
    let t = new Proxy(
      {},
      {
        ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
        has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
        get: (r, n) =>
          (e.find((i) => {
            if (i.hasOwnProperty(n)) {
              let o = Object.getOwnPropertyDescriptor(i, n);
              if (
                (o.get && o.get._x_alreadyBound) ||
                (o.set && o.set._x_alreadyBound)
              )
                return !0;
              if ((o.get || o.set) && o.enumerable) {
                let s = o.get,
                  a = o.set,
                  c = o;
                (s = s && s.bind(t)),
                  (a = a && a.bind(t)),
                  s && (s._x_alreadyBound = !0),
                  a && (a._x_alreadyBound = !0),
                  Object.defineProperty(i, n, { ...c, get: s, set: a });
              }
              return !0;
            }
            return !1;
          }) || {})[n],
        set: (r, n, i) => {
          let o = e.find((s) => s.hasOwnProperty(n));
          return o ? (o[n] = i) : (e[e.length - 1][n] = i), !0;
        },
      }
    );
    return t;
  }
  function ge(e) {
    let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
      r = (n, i = "") => {
        Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
          ([o, { value: s, enumerable: a }]) => {
            if (a === !1 || s === void 0) return;
            let c = i === "" ? o : `${i}.${o}`;
            typeof s == "object" && s !== null && s._x_interceptor
              ? (n[o] = s.initialize(e, c, o))
              : t(s) && s !== n && !(s instanceof Element) && r(s, c);
          }
        );
      };
    return r(e);
  }
  function xe(e, t = () => {}) {
    let r = {
      initialValue: void 0,
      _x_interceptor: !0,
      initialize(n, i, o) {
        return e(
          this.initialValue,
          () => sn(n, i),
          (s) => rt(n, i, s),
          i,
          o
        );
      },
    };
    return (
      t(r),
      (n) => {
        if (typeof n == "object" && n !== null && n._x_interceptor) {
          let i = r.initialize.bind(r);
          r.initialize = (o, s, a) => {
            let c = n.initialize(o, s, a);
            return (r.initialValue = c), i(o, s, a);
          };
        } else r.initialValue = n;
        return r;
      }
    );
  }
  function sn(e, t) {
    return t.split(".").reduce((r, n) => r[n], e);
  }
  function rt(e, t, r) {
    if ((typeof t == "string" && (t = t.split(".")), t.length === 1))
      e[t[0]] = r;
    else {
      if (t.length === 0) throw error;
      return e[t[0]] || (e[t[0]] = {}), rt(e[t[0]], t.slice(1), r);
    }
  }
  var Bt = {};
  function y(e, t) {
    Bt[e] = t;
  }
  function re(e, t) {
    return (
      Object.entries(Bt).forEach(([r, n]) => {
        Object.defineProperty(e, `$${r}`, {
          get() {
            return n(t, { Alpine: R, interceptor: xe });
          },
          enumerable: !1,
        });
      }),
      e
    );
  }
  function Vt(e, t, r, ...n) {
    try {
      return r(...n);
    } catch (i) {
      Y(i, e, t);
    }
  }
  function Y(e, t, r = void 0) {
    Object.assign(e, { el: t, expression: r }),
      console.warn(
        `Alpine Expression Error: ${e.message}

${
  r
    ? 'Expression: "' +
      r +
      `"

`
    : ""
}`,
        t
      ),
      setTimeout(() => {
        throw e;
      }, 0);
  }
  function w(e, t, r = {}) {
    let n;
    return h(e, t)((i) => (n = i), r), n;
  }
  function h(...e) {
    return Ht(...e);
  }
  var Ht = nt;
  function qt(e) {
    Ht = e;
  }
  function nt(e, t) {
    let r = {};
    re(r, e);
    let n = [r, ...P(e)];
    if (typeof t == "function") return an(n, t);
    let i = cn(n, t, e);
    return Vt.bind(null, e, t, i);
  }
  function an(e, t) {
    return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
      let o = t.apply(I([n, ...e]), i);
      ye(r, o);
    };
  }
  var it = {};
  function ln(e, t) {
    if (it[e]) return it[e];
    let r = Object.getPrototypeOf(async function () {}).constructor,
      n =
        /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
          ? `(() => { ${e} })()`
          : e,
      o = (() => {
        try {
          return new r(
            ["__self", "scope"],
            `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
          );
        } catch (s) {
          return Y(s, t, e), Promise.resolve();
        }
      })();
    return (it[e] = o), o;
  }
  function cn(e, t, r) {
    let n = ln(t, r);
    return (i = () => {}, { scope: o = {}, params: s = [] } = {}) => {
      (n.result = void 0), (n.finished = !1);
      let a = I([o, ...e]);
      if (typeof n == "function") {
        let c = n(n, a).catch((l) => Y(l, r, t));
        n.finished
          ? (ye(i, n.result, a, s, r), (n.result = void 0))
          : c
              .then((l) => {
                ye(i, l, a, s, r);
              })
              .catch((l) => Y(l, r, t))
              .finally(() => (n.result = void 0));
      }
    };
  }
  function ye(e, t, r, n, i) {
    if (typeof t == "function") {
      let o = t.apply(r, n);
      o instanceof Promise
        ? o.then((s) => ye(e, s, r, n)).catch((s) => Y(s, i, t))
        : e(o);
    } else e(t);
  }
  var ot = "x-";
  function E(e = "") {
    return ot + e;
  }
  function Ut(e) {
    ot = e;
  }
  var Wt = {};
  function p(e, t) {
    Wt[e] = t;
  }
  function ne(e, t, r) {
    let n = {};
    return Array.from(t)
      .map(Gt((o, s) => (n[o] = s)))
      .filter(Yt)
      .map(fn(n, r))
      .sort(dn)
      .map((o) => un(e, o));
  }
  function Jt(e) {
    return Array.from(e)
      .map(Gt())
      .filter((t) => !Yt(t));
  }
  var st = !1,
    ie = new Map(),
    Zt = Symbol();
  function Qt(e) {
    st = !0;
    let t = Symbol();
    (Zt = t), ie.set(t, []);
    let r = () => {
        for (; ie.get(t).length; ) ie.get(t).shift()();
        ie.delete(t);
      },
      n = () => {
        (st = !1), r();
      };
    e(r), n();
  }
  function un(e, t) {
    let r = () => {},
      n = Wt[t.type] || r,
      i = [],
      o = (d) => i.push(d),
      [s, a] = kt(e);
    i.push(a);
    let c = {
        Alpine: R,
        effect: s,
        cleanup: o,
        evaluateLater: h.bind(h, e),
        evaluate: w.bind(w, e),
      },
      l = () => i.forEach((d) => d());
    Ft(e, t.original, l);
    let u = () => {
      e._x_ignore ||
        e._x_ignoreSelf ||
        (n.inline && n.inline(e, t, c),
        (n = n.bind(n, e, t, c)),
        st ? ie.get(Zt).push(n) : n());
    };
    return (u.runCleanups = l), u;
  }
  var be =
      (e, t) =>
      ({ name: r, value: n }) => (
        r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }
      ),
    ve = (e) => e;
  function Gt(e = () => {}) {
    return ({ name: t, value: r }) => {
      let { name: n, value: i } = Xt.reduce((o, s) => s(o), {
        name: t,
        value: r,
      });
      return n !== t && e(n, t), { name: n, value: i };
    };
  }
  var Xt = [];
  function J(e) {
    Xt.push(e);
  }
  function Yt({ name: e }) {
    return er().test(e);
  }
  var er = () => new RegExp(`^${ot}([^:^.]+)\\b`);
  function fn(e, t) {
    return ({ name: r, value: n }) => {
      let i = r.match(er()),
        o = r.match(/:([a-zA-Z0-9\-:]+)/),
        s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
        a = t || e[r] || r;
      return {
        type: i ? i[1] : null,
        value: o ? o[1] : null,
        modifiers: s.map((c) => c.replace(".", "")),
        expression: n,
        original: a,
      };
    };
  }
  var at = "DEFAULT",
    we = [
      "ignore",
      "ref",
      "data",
      "id",
      "bind",
      "init",
      "for",
      "model",
      "transition",
      "show",
      "if",
      at,
      "teleport",
      "element",
    ];
  function dn(e, t) {
    let r = we.indexOf(e.type) === -1 ? at : e.type,
      n = we.indexOf(t.type) === -1 ? at : t.type;
    return we.indexOf(r) - we.indexOf(n);
  }
  function K(e, t, r = {}) {
    e.dispatchEvent(
      new CustomEvent(t, {
        detail: r,
        bubbles: !0,
        composed: !0,
        cancelable: !0,
      })
    );
  }
  var ct = [],
    lt = !1;
  function Se(e) {
    ct.push(e),
      queueMicrotask(() => {
        lt ||
          setTimeout(() => {
            Ee();
          });
      });
  }
  function Ee() {
    for (lt = !1; ct.length; ) ct.shift()();
  }
  function tr() {
    lt = !0;
  }
  function D(e, t) {
    if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
      Array.from(e.children).forEach((i) => D(i, t));
      return;
    }
    let r = !1;
    if ((t(e, () => (r = !0)), r)) return;
    let n = e.firstElementChild;
    for (; n; ) D(n, t, !1), (n = n.nextElementSibling);
  }
  function z(e, ...t) {
    console.warn(`Alpine Warning: ${e}`, ...t);
  }
  function nr() {
    document.body ||
      z(
        "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
      ),
      K(document, "alpine:init"),
      K(document, "alpine:initializing"),
      Qe(),
      $t((t) => S(t, D)),
      Lt((t) => pn(t)),
      jt((t, r) => {
        ne(t, r).forEach((n) => n());
      });
    let e = (t) => !B(t.parentElement, !0);
    Array.from(document.querySelectorAll(rr()))
      .filter(e)
      .forEach((t) => {
        S(t);
      }),
      K(document, "alpine:initialized");
  }
  var ut = [],
    ir = [];
  function or() {
    return ut.map((e) => e());
  }
  function rr() {
    return ut.concat(ir).map((e) => e());
  }
  function Ae(e) {
    ut.push(e);
  }
  function Oe(e) {
    ir.push(e);
  }
  function B(e, t = !1) {
    return Z(e, (r) => {
      if ((t ? rr() : or()).some((i) => r.matches(i))) return !0;
    });
  }
  function Z(e, t) {
    if (!!e) {
      if (t(e)) return e;
      if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
        return Z(e.parentElement, t);
    }
  }
  function sr(e) {
    return or().some((t) => e.matches(t));
  }
  function S(e, t = D) {
    Qt(() => {
      t(e, (r, n) => {
        ne(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
      });
    });
  }
  function pn(e) {
    D(e, (t) => Ge(t));
  }
  function oe(e, t) {
    return Array.isArray(t)
      ? ar(e, t.join(" "))
      : typeof t == "object" && t !== null
      ? mn(e, t)
      : typeof t == "function"
      ? oe(e, t())
      : ar(e, t);
  }
  function ar(e, t) {
    let r = (o) => o.split(" ").filter(Boolean),
      n = (o) =>
        o
          .split(" ")
          .filter((s) => !e.classList.contains(s))
          .filter(Boolean),
      i = (o) => (
        e.classList.add(...o),
        () => {
          e.classList.remove(...o);
        }
      );
    return (t = t === !0 ? (t = "") : t || ""), i(n(t));
  }
  function mn(e, t) {
    let r = (a) => a.split(" ").filter(Boolean),
      n = Object.entries(t)
        .flatMap(([a, c]) => (c ? r(a) : !1))
        .filter(Boolean),
      i = Object.entries(t)
        .flatMap(([a, c]) => (c ? !1 : r(a)))
        .filter(Boolean),
      o = [],
      s = [];
    return (
      i.forEach((a) => {
        e.classList.contains(a) && (e.classList.remove(a), s.push(a));
      }),
      n.forEach((a) => {
        e.classList.contains(a) || (e.classList.add(a), o.push(a));
      }),
      () => {
        s.forEach((a) => e.classList.add(a)),
          o.forEach((a) => e.classList.remove(a));
      }
    );
  }
  function V(e, t) {
    return typeof t == "object" && t !== null ? hn(e, t) : _n(e, t);
  }
  function hn(e, t) {
    let r = {};
    return (
      Object.entries(t).forEach(([n, i]) => {
        (r[n] = e.style[n]), e.style.setProperty(gn(n), i);
      }),
      setTimeout(() => {
        e.style.length === 0 && e.removeAttribute("style");
      }),
      () => {
        V(e, r);
      }
    );
  }
  function _n(e, t) {
    let r = e.getAttribute("style", t);
    return (
      e.setAttribute("style", t),
      () => {
        e.setAttribute("style", r || "");
      }
    );
  }
  function gn(e) {
    return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  function se(e, t = () => {}) {
    let r = !1;
    return function () {
      r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
    };
  }
  p(
    "transition",
    (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
      typeof n == "function" && (n = i(n)), n ? xn(e, n, t) : yn(e, r, t);
    }
  );
  function xn(e, t, r) {
    cr(e, oe, ""),
      {
        enter: (i) => {
          e._x_transition.enter.during = i;
        },
        "enter-start": (i) => {
          e._x_transition.enter.start = i;
        },
        "enter-end": (i) => {
          e._x_transition.enter.end = i;
        },
        leave: (i) => {
          e._x_transition.leave.during = i;
        },
        "leave-start": (i) => {
          e._x_transition.leave.start = i;
        },
        "leave-end": (i) => {
          e._x_transition.leave.end = i;
        },
      }[r](t);
  }
  function yn(e, t, r) {
    cr(e, V);
    let n = !t.includes("in") && !t.includes("out") && !r,
      i = n || t.includes("in") || ["enter"].includes(r),
      o = n || t.includes("out") || ["leave"].includes(r);
    t.includes("in") && !n && (t = t.filter((g, b) => b < t.indexOf("out"))),
      t.includes("out") && !n && (t = t.filter((g, b) => b > t.indexOf("out")));
    let s = !t.includes("opacity") && !t.includes("scale"),
      a = s || t.includes("opacity"),
      c = s || t.includes("scale"),
      l = a ? 0 : 1,
      u = c ? ae(t, "scale", 95) / 100 : 1,
      d = ae(t, "delay", 0),
      x = ae(t, "origin", "center"),
      N = "opacity, transform",
      U = ae(t, "duration", 150) / 1e3,
      pe = ae(t, "duration", 75) / 1e3,
      f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
    i &&
      ((e._x_transition.enter.during = {
        transformOrigin: x,
        transitionDelay: d,
        transitionProperty: N,
        transitionDuration: `${U}s`,
        transitionTimingFunction: f,
      }),
      (e._x_transition.enter.start = { opacity: l, transform: `scale(${u})` }),
      (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
      o &&
        ((e._x_transition.leave.during = {
          transformOrigin: x,
          transitionDelay: d,
          transitionProperty: N,
          transitionDuration: `${pe}s`,
          transitionTimingFunction: f,
        }),
        (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
        (e._x_transition.leave.end = { opacity: l, transform: `scale(${u})` }));
  }
  function cr(e, t, r = {}) {
    e._x_transition ||
      (e._x_transition = {
        enter: { during: r, start: r, end: r },
        leave: { during: r, start: r, end: r },
        in(n = () => {}, i = () => {}) {
          Te(
            e,
            t,
            {
              during: this.enter.during,
              start: this.enter.start,
              end: this.enter.end,
            },
            n,
            i
          );
        },
        out(n = () => {}, i = () => {}) {
          Te(
            e,
            t,
            {
              during: this.leave.during,
              start: this.leave.start,
              end: this.leave.end,
            },
            n,
            i
          );
        },
      });
  }
  window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
    e,
    t,
    r,
    n
  ) {
    let i = () => {
      document.visibilityState === "visible"
        ? requestAnimationFrame(r)
        : setTimeout(r);
    };
    if (t) {
      e._x_transition && (e._x_transition.enter || e._x_transition.leave)
        ? e._x_transition.enter &&
          (Object.entries(e._x_transition.enter.during).length ||
            Object.entries(e._x_transition.enter.start).length ||
            Object.entries(e._x_transition.enter.end).length)
          ? e._x_transition.in(r)
          : i()
        : e._x_transition
        ? e._x_transition.in(r)
        : i();
      return;
    }
    (e._x_hidePromise = e._x_transition
      ? new Promise((o, s) => {
          e._x_transition.out(
            () => {},
            () => o(n)
          ),
            e._x_transitioning.beforeCancel(() =>
              s({ isFromCancelledTransition: !0 })
            );
        })
      : Promise.resolve(n)),
      queueMicrotask(() => {
        let o = lr(e);
        o
          ? (o._x_hideChildren || (o._x_hideChildren = []),
            o._x_hideChildren.push(e))
          : queueMicrotask(() => {
              let s = (a) => {
                let c = Promise.all([
                  a._x_hidePromise,
                  ...(a._x_hideChildren || []).map(s),
                ]).then(([l]) => l());
                return delete a._x_hidePromise, delete a._x_hideChildren, c;
              };
              s(e).catch((a) => {
                if (!a.isFromCancelledTransition) throw a;
              });
            });
      });
  };
  function lr(e) {
    let t = e.parentNode;
    if (!!t) return t._x_hidePromise ? t : lr(t);
  }
  function Te(
    e,
    t,
    { during: r, start: n, end: i } = {},
    o = () => {},
    s = () => {}
  ) {
    if (
      (e._x_transitioning && e._x_transitioning.cancel(),
      Object.keys(r).length === 0 &&
        Object.keys(n).length === 0 &&
        Object.keys(i).length === 0)
    ) {
      o(), s();
      return;
    }
    let a, c, l;
    bn(e, {
      start() {
        a = t(e, n);
      },
      during() {
        c = t(e, r);
      },
      before: o,
      end() {
        a(), (l = t(e, i));
      },
      after: s,
      cleanup() {
        c(), l();
      },
    });
  }
  function bn(e, t) {
    let r,
      n,
      i,
      o = se(() => {
        m(() => {
          (r = !0),
            n || t.before(),
            i || (t.end(), Ee()),
            t.after(),
            e.isConnected && t.cleanup(),
            delete e._x_transitioning;
        });
      });
    (e._x_transitioning = {
      beforeCancels: [],
      beforeCancel(s) {
        this.beforeCancels.push(s);
      },
      cancel: se(function () {
        for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
        o();
      }),
      finish: o,
    }),
      m(() => {
        t.start(), t.during();
      }),
      tr(),
      requestAnimationFrame(() => {
        if (r) return;
        let s =
            Number(
              getComputedStyle(e)
                .transitionDuration.replace(/,.*/, "")
                .replace("s", "")
            ) * 1e3,
          a =
            Number(
              getComputedStyle(e)
                .transitionDelay.replace(/,.*/, "")
                .replace("s", "")
            ) * 1e3;
        s === 0 &&
          (s =
            Number(getComputedStyle(e).animationDuration.replace("s", "")) *
            1e3),
          m(() => {
            t.before();
          }),
          (n = !0),
          requestAnimationFrame(() => {
            r ||
              (m(() => {
                t.end();
              }),
              Ee(),
              setTimeout(e._x_transitioning.finish, s + a),
              (i = !0));
          });
      });
  }
  function ae(e, t, r) {
    if (e.indexOf(t) === -1) return r;
    let n = e[e.indexOf(t) + 1];
    if (!n || (t === "scale" && isNaN(n))) return r;
    if (t === "duration") {
      let i = n.match(/([0-9]+)ms/);
      if (i) return i[1];
    }
    return t === "origin" &&
      ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
      ? [n, e[e.indexOf(t) + 2]].join(" ")
      : n;
  }
  var ft = !1;
  function $(e, t = () => {}) {
    return (...r) => (ft ? t(...r) : e(...r));
  }
  function ur(e, t) {
    t._x_dataStack || (t._x_dataStack = e._x_dataStack),
      (ft = !0),
      wn(() => {
        vn(t);
      }),
      (ft = !1);
  }
  function vn(e) {
    let t = !1;
    S(e, (n, i) => {
      D(n, (o, s) => {
        if (t && sr(o)) return s();
        (t = !0), i(o, s);
      });
    });
  }
  function wn(e) {
    let t = k;
    We((r, n) => {
      let i = t(r);
      return G(i), () => {};
    }),
      e(),
      We(t);
  }
  function ce(e, t, r, n = []) {
    switch (
      (e._x_bindings || (e._x_bindings = O({})),
      (e._x_bindings[t] = r),
      (t = n.includes("camel") ? Tn(t) : t),
      t)
    ) {
      case "value":
        En(e, r);
        break;
      case "style":
        An(e, r);
        break;
      case "class":
        Sn(e, r);
        break;
      default:
        On(e, t, r);
        break;
    }
  }
  function En(e, t) {
    if (e.type === "radio")
      e.attributes.value === void 0 && (e.value = t),
        window.fromModel && (e.checked = fr(e.value, t));
    else if (e.type === "checkbox")
      Number.isInteger(t)
        ? (e.value = t)
        : !Number.isInteger(t) &&
          !Array.isArray(t) &&
          typeof t != "boolean" &&
          ![null, void 0].includes(t)
        ? (e.value = String(t))
        : Array.isArray(t)
        ? (e.checked = t.some((r) => fr(r, e.value)))
        : (e.checked = !!t);
    else if (e.tagName === "SELECT") Cn(e, t);
    else {
      if (e.value === t) return;
      e.value = t;
    }
  }
  function Sn(e, t) {
    e._x_undoAddedClasses && e._x_undoAddedClasses(),
      (e._x_undoAddedClasses = oe(e, t));
  }
  function An(e, t) {
    e._x_undoAddedStyles && e._x_undoAddedStyles(),
      (e._x_undoAddedStyles = V(e, t));
  }
  function On(e, t, r) {
    [null, void 0, !1].includes(r) && Mn(t)
      ? e.removeAttribute(t)
      : (dr(t) && (r = t), Rn(e, t, r));
  }
  function Rn(e, t, r) {
    e.getAttribute(t) != r && e.setAttribute(t, r);
  }
  function Cn(e, t) {
    let r = [].concat(t).map((n) => n + "");
    Array.from(e.options).forEach((n) => {
      n.selected = r.includes(n.value);
    });
  }
  function Tn(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
  }
  function fr(e, t) {
    return e == t;
  }
  function dr(e) {
    return [
      "disabled",
      "checked",
      "required",
      "readonly",
      "hidden",
      "open",
      "selected",
      "autofocus",
      "itemscope",
      "multiple",
      "novalidate",
      "allowfullscreen",
      "allowpaymentrequest",
      "formnovalidate",
      "autoplay",
      "controls",
      "loop",
      "muted",
      "playsinline",
      "default",
      "ismap",
      "reversed",
      "async",
      "defer",
      "nomodule",
    ].includes(e);
  }
  function Mn(e) {
    return ![
      "aria-pressed",
      "aria-checked",
      "aria-expanded",
      "aria-selected",
    ].includes(e);
  }
  function pr(e, t, r) {
    if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
    let n = e.getAttribute(t);
    return n === null
      ? typeof r == "function"
        ? r()
        : r
      : dr(t)
      ? !![t, "true"].includes(n)
      : n === ""
      ? !0
      : n;
  }
  function Ce(e, t) {
    var r;
    return function () {
      var n = this,
        i = arguments,
        o = function () {
          (r = null), e.apply(n, i);
        };
      clearTimeout(r), (r = setTimeout(o, t));
    };
  }
  function Re(e, t) {
    let r;
    return function () {
      let n = this,
        i = arguments;
      r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t));
    };
  }
  function mr(e) {
    e(R);
  }
  var H = {},
    hr = !1;
  function _r(e, t) {
    if ((hr || ((H = O(H)), (hr = !0)), t === void 0)) return H[e];
    (H[e] = t),
      typeof t == "object" &&
        t !== null &&
        t.hasOwnProperty("init") &&
        typeof t.init == "function" &&
        H[e].init(),
      ge(H[e]);
  }
  function gr() {
    return H;
  }
  var xr = {};
  function yr(e, t) {
    xr[e] = typeof t != "function" ? () => t : t;
  }
  function br(e) {
    return (
      Object.entries(xr).forEach(([t, r]) => {
        Object.defineProperty(e, t, {
          get() {
            return (...n) => r(...n);
          },
        });
      }),
      e
    );
  }
  var vr = {};
  function wr(e, t) {
    vr[e] = t;
  }
  function Er(e, t) {
    return (
      Object.entries(vr).forEach(([r, n]) => {
        Object.defineProperty(e, r, {
          get() {
            return (...i) => n.bind(t)(...i);
          },
          enumerable: !1,
        });
      }),
      e
    );
  }
  var Nn = {
      get reactive() {
        return O;
      },
      get release() {
        return G;
      },
      get effect() {
        return k;
      },
      get raw() {
        return qe;
      },
      version: "3.8.1",
      flushAndStopDeferringMutations: zt,
      disableEffectScheduling: Mt,
      setReactivityEngine: Nt,
      closestDataStack: P,
      skipDuringClone: $,
      addRootSelector: Ae,
      addInitSelector: Oe,
      addScopeToNode: C,
      deferMutations: Kt,
      mapAttributes: J,
      evaluateLater: h,
      setEvaluator: qt,
      mergeProxies: I,
      findClosest: Z,
      closestRoot: B,
      interceptor: xe,
      transition: Te,
      setStyles: V,
      mutateDom: m,
      directive: p,
      throttle: Re,
      debounce: Ce,
      evaluate: w,
      initTree: S,
      nextTick: Se,
      prefixed: E,
      prefix: Ut,
      plugin: mr,
      magic: y,
      store: _r,
      start: nr,
      clone: ur,
      bound: pr,
      $data: _e,
      data: wr,
      bind: yr,
    },
    R = Nn;
  function dt(e, t) {
    let r = Object.create(null),
      n = e.split(",");
    for (let i = 0; i < n.length; i++) r[n[i]] = !0;
    return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
  }
  var Wo = {
      [1]: "TEXT",
      [2]: "CLASS",
      [4]: "STYLE",
      [8]: "PROPS",
      [16]: "FULL_PROPS",
      [32]: "HYDRATE_EVENTS",
      [64]: "STABLE_FRAGMENT",
      [128]: "KEYED_FRAGMENT",
      [256]: "UNKEYED_FRAGMENT",
      [512]: "NEED_PATCH",
      [1024]: "DYNAMIC_SLOTS",
      [2048]: "DEV_ROOT_FRAGMENT",
      [-1]: "HOISTED",
      [-2]: "BAIL",
    },
    Go = { [1]: "STABLE", [2]: "DYNAMIC", [3]: "FORWARDED" };
  var kn =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var Yo = dt(
    kn +
      ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected"
  );
  var Sr = Object.freeze({}),
    Jo = Object.freeze([]);
  var pt = Object.assign;
  var Pn = Object.prototype.hasOwnProperty,
    le = (e, t) => Pn.call(e, t),
    L = Array.isArray,
    Q = (e) => Ar(e) === "[object Map]";
  var In = (e) => typeof e == "string",
    Me = (e) => typeof e == "symbol",
    ue = (e) => e !== null && typeof e == "object";
  var Dn = Object.prototype.toString,
    Ar = (e) => Dn.call(e),
    mt = (e) => Ar(e).slice(8, -1);
  var Ne = (e) =>
    In(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
  var ke = (e) => {
      let t = Object.create(null);
      return (r) => t[r] || (t[r] = e(r));
    },
    $n = /-(\w)/g,
    Zo = ke((e) => e.replace($n, (t, r) => (r ? r.toUpperCase() : ""))),
    Ln = /\B([A-Z])/g,
    Qo = ke((e) => e.replace(Ln, "-$1").toLowerCase()),
    ht = ke((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Xo = ke((e) => (e ? `on${ht(e)}` : "")),
    _t = (e, t) => e !== t && (e === e || t === t);
  var gt = new WeakMap(),
    fe = [],
    M,
    q = Symbol("iterate"),
    xt = Symbol("Map key iterate");
  function jn(e) {
    return e && e._isEffect === !0;
  }
  function Or(e, t = Sr) {
    jn(e) && (e = e.raw);
    let r = Fn(e, t);
    return t.lazy || r(), r;
  }
  function Cr(e) {
    e.active &&
      (Tr(e), e.options.onStop && e.options.onStop(), (e.active = !1));
  }
  var Kn = 0;
  function Fn(e, t) {
    let r = function () {
      if (!r.active) return e();
      if (!fe.includes(r)) {
        Tr(r);
        try {
          return zn(), fe.push(r), (M = r), e();
        } finally {
          fe.pop(), Rr(), (M = fe[fe.length - 1]);
        }
      }
    };
    return (
      (r.id = Kn++),
      (r.allowRecurse = !!t.allowRecurse),
      (r._isEffect = !0),
      (r.active = !0),
      (r.raw = e),
      (r.deps = []),
      (r.options = t),
      r
    );
  }
  function Tr(e) {
    let { deps: t } = e;
    if (t.length) {
      for (let r = 0; r < t.length; r++) t[r].delete(e);
      t.length = 0;
    }
  }
  var X = !0,
    yt = [];
  function Bn() {
    yt.push(X), (X = !1);
  }
  function zn() {
    yt.push(X), (X = !0);
  }
  function Rr() {
    let e = yt.pop();
    X = e === void 0 ? !0 : e;
  }
  function T(e, t, r) {
    if (!X || M === void 0) return;
    let n = gt.get(e);
    n || gt.set(e, (n = new Map()));
    let i = n.get(r);
    i || n.set(r, (i = new Set())),
      i.has(M) ||
        (i.add(M),
        M.deps.push(i),
        M.options.onTrack &&
          M.options.onTrack({ effect: M, target: e, type: t, key: r }));
  }
  function j(e, t, r, n, i, o) {
    let s = gt.get(e);
    if (!s) return;
    let a = new Set(),
      c = (u) => {
        u &&
          u.forEach((d) => {
            (d !== M || d.allowRecurse) && a.add(d);
          });
      };
    if (t === "clear") s.forEach(c);
    else if (r === "length" && L(e))
      s.forEach((u, d) => {
        (d === "length" || d >= n) && c(u);
      });
    else
      switch ((r !== void 0 && c(s.get(r)), t)) {
        case "add":
          L(e)
            ? Ne(r) && c(s.get("length"))
            : (c(s.get(q)), Q(e) && c(s.get(xt)));
          break;
        case "delete":
          L(e) || (c(s.get(q)), Q(e) && c(s.get(xt)));
          break;
        case "set":
          Q(e) && c(s.get(q));
          break;
      }
    let l = (u) => {
      u.options.onTrigger &&
        u.options.onTrigger({
          effect: u,
          target: e,
          key: r,
          type: t,
          newValue: n,
          oldValue: i,
          oldTarget: o,
        }),
        u.options.scheduler ? u.options.scheduler(u) : u();
    };
    a.forEach(l);
  }
  var Vn = dt("__proto__,__v_isRef,__isVue"),
    Mr = new Set(
      Object.getOwnPropertyNames(Symbol)
        .map((e) => Symbol[e])
        .filter(Me)
    ),
    Hn = Pe(),
    qn = Pe(!1, !0),
    Un = Pe(!0),
    Wn = Pe(!0, !0),
    Ie = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    let t = Array.prototype[e];
    Ie[e] = function (...r) {
      let n = _(this);
      for (let o = 0, s = this.length; o < s; o++) T(n, "get", o + "");
      let i = t.apply(n, r);
      return i === -1 || i === !1 ? t.apply(n, r.map(_)) : i;
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    let t = Array.prototype[e];
    Ie[e] = function (...r) {
      Bn();
      let n = t.apply(this, r);
      return Rr(), n;
    };
  });
  function Pe(e = !1, t = !1) {
    return function (n, i, o) {
      if (i === "__v_isReactive") return !e;
      if (i === "__v_isReadonly") return e;
      if (i === "__v_raw" && o === (e ? (t ? Yn : kr) : t ? Gn : Nr).get(n))
        return n;
      let s = L(n);
      if (!e && s && le(Ie, i)) return Reflect.get(Ie, i, o);
      let a = Reflect.get(n, i, o);
      return (Me(i) ? Mr.has(i) : Vn(i)) || (e || T(n, "get", i), t)
        ? a
        : bt(a)
        ? !s || !Ne(i)
          ? a.value
          : a
        : ue(a)
        ? e
          ? Pr(a)
          : De(a)
        : a;
    };
  }
  var Jn = Ir(),
    Zn = Ir(!0);
  function Ir(e = !1) {
    return function (r, n, i, o) {
      let s = r[n];
      if (!e && ((i = _(i)), (s = _(s)), !L(r) && bt(s) && !bt(i)))
        return (s.value = i), !0;
      let a = L(r) && Ne(n) ? Number(n) < r.length : le(r, n),
        c = Reflect.set(r, n, i, o);
      return (
        r === _(o) &&
          (a ? _t(i, s) && j(r, "set", n, i, s) : j(r, "add", n, i)),
        c
      );
    };
  }
  function Qn(e, t) {
    let r = le(e, t),
      n = e[t],
      i = Reflect.deleteProperty(e, t);
    return i && r && j(e, "delete", t, void 0, n), i;
  }
  function Xn(e, t) {
    let r = Reflect.has(e, t);
    return (!Me(t) || !Mr.has(t)) && T(e, "has", t), r;
  }
  function ei(e) {
    return T(e, "iterate", L(e) ? "length" : q), Reflect.ownKeys(e);
  }
  var Dr = { get: Hn, set: Jn, deleteProperty: Qn, has: Xn, ownKeys: ei },
    $r = {
      get: Un,
      set(e, t) {
        return (
          console.warn(
            `Set operation on key "${String(t)}" failed: target is readonly.`,
            e
          ),
          !0
        );
      },
      deleteProperty(e, t) {
        return (
          console.warn(
            `Delete operation on key "${String(
              t
            )}" failed: target is readonly.`,
            e
          ),
          !0
        );
      },
    },
    os = pt({}, Dr, { get: qn, set: Zn }),
    ss = pt({}, $r, { get: Wn }),
    vt = (e) => (ue(e) ? De(e) : e),
    wt = (e) => (ue(e) ? Pr(e) : e),
    Et = (e) => e,
    $e = (e) => Reflect.getPrototypeOf(e);
  function Le(e, t, r = !1, n = !1) {
    e = e.__v_raw;
    let i = _(e),
      o = _(t);
    t !== o && !r && T(i, "get", t), !r && T(i, "get", o);
    let { has: s } = $e(i),
      a = n ? Et : r ? wt : vt;
    if (s.call(i, t)) return a(e.get(t));
    if (s.call(i, o)) return a(e.get(o));
    e !== i && e.get(t);
  }
  function je(e, t = !1) {
    let r = this.__v_raw,
      n = _(r),
      i = _(e);
    return (
      e !== i && !t && T(n, "has", e),
      !t && T(n, "has", i),
      e === i ? r.has(e) : r.has(e) || r.has(i)
    );
  }
  function Fe(e, t = !1) {
    return (
      (e = e.__v_raw), !t && T(_(e), "iterate", q), Reflect.get(e, "size", e)
    );
  }
  function Lr(e) {
    e = _(e);
    let t = _(this);
    return $e(t).has.call(t, e) || (t.add(e), j(t, "add", e, e)), this;
  }
  function Fr(e, t) {
    t = _(t);
    let r = _(this),
      { has: n, get: i } = $e(r),
      o = n.call(r, e);
    o ? jr(r, n, e) : ((e = _(e)), (o = n.call(r, e)));
    let s = i.call(r, e);
    return (
      r.set(e, t),
      o ? _t(t, s) && j(r, "set", e, t, s) : j(r, "add", e, t),
      this
    );
  }
  function Kr(e) {
    let t = _(this),
      { has: r, get: n } = $e(t),
      i = r.call(t, e);
    i ? jr(t, r, e) : ((e = _(e)), (i = r.call(t, e)));
    let o = n ? n.call(t, e) : void 0,
      s = t.delete(e);
    return i && j(t, "delete", e, void 0, o), s;
  }
  function zr() {
    let e = _(this),
      t = e.size !== 0,
      r = Q(e) ? new Map(e) : new Set(e),
      n = e.clear();
    return t && j(e, "clear", void 0, void 0, r), n;
  }
  function Ke(e, t) {
    return function (n, i) {
      let o = this,
        s = o.__v_raw,
        a = _(s),
        c = t ? Et : e ? wt : vt;
      return (
        !e && T(a, "iterate", q), s.forEach((l, u) => n.call(i, c(l), c(u), o))
      );
    };
  }
  function ze(e, t, r) {
    return function (...n) {
      let i = this.__v_raw,
        o = _(i),
        s = Q(o),
        a = e === "entries" || (e === Symbol.iterator && s),
        c = e === "keys" && s,
        l = i[e](...n),
        u = r ? Et : t ? wt : vt;
      return (
        !t && T(o, "iterate", c ? xt : q),
        {
          next() {
            let { value: d, done: x } = l.next();
            return x
              ? { value: d, done: x }
              : { value: a ? [u(d[0]), u(d[1])] : u(d), done: x };
          },
          [Symbol.iterator]() {
            return this;
          },
        }
      );
    };
  }
  function F(e) {
    return function (...t) {
      {
        let r = t[0] ? `on key "${t[0]}" ` : "";
        console.warn(
          `${ht(e)} operation ${r}failed: target is readonly.`,
          _(this)
        );
      }
      return e === "delete" ? !1 : this;
    };
  }
  var Br = {
      get(e) {
        return Le(this, e);
      },
      get size() {
        return Fe(this);
      },
      has: je,
      add: Lr,
      set: Fr,
      delete: Kr,
      clear: zr,
      forEach: Ke(!1, !1),
    },
    Vr = {
      get(e) {
        return Le(this, e, !1, !0);
      },
      get size() {
        return Fe(this);
      },
      has: je,
      add: Lr,
      set: Fr,
      delete: Kr,
      clear: zr,
      forEach: Ke(!1, !0),
    },
    Hr = {
      get(e) {
        return Le(this, e, !0);
      },
      get size() {
        return Fe(this, !0);
      },
      has(e) {
        return je.call(this, e, !0);
      },
      add: F("add"),
      set: F("set"),
      delete: F("delete"),
      clear: F("clear"),
      forEach: Ke(!0, !1),
    },
    qr = {
      get(e) {
        return Le(this, e, !0, !0);
      },
      get size() {
        return Fe(this, !0);
      },
      has(e) {
        return je.call(this, e, !0);
      },
      add: F("add"),
      set: F("set"),
      delete: F("delete"),
      clear: F("clear"),
      forEach: Ke(!0, !0),
    },
    ti = ["keys", "values", "entries", Symbol.iterator];
  ti.forEach((e) => {
    (Br[e] = ze(e, !1, !1)),
      (Hr[e] = ze(e, !0, !1)),
      (Vr[e] = ze(e, !1, !0)),
      (qr[e] = ze(e, !0, !0));
  });
  function Be(e, t) {
    let r = t ? (e ? qr : Vr) : e ? Hr : Br;
    return (n, i, o) =>
      i === "__v_isReactive"
        ? !e
        : i === "__v_isReadonly"
        ? e
        : i === "__v_raw"
        ? n
        : Reflect.get(le(r, i) && i in n ? r : n, i, o);
  }
  var ri = { get: Be(!1, !1) },
    as = { get: Be(!1, !0) },
    ni = { get: Be(!0, !1) },
    cs = { get: Be(!0, !0) };
  function jr(e, t, r) {
    let n = _(r);
    if (n !== r && t.call(e, n)) {
      let i = mt(e);
      console.warn(
        `Reactive ${i} contains both the raw and reactive versions of the same object${
          i === "Map" ? " as keys" : ""
        }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
      );
    }
  }
  var Nr = new WeakMap(),
    Gn = new WeakMap(),
    kr = new WeakMap(),
    Yn = new WeakMap();
  function ii(e) {
    switch (e) {
      case "Object":
      case "Array":
        return 1;
      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;
      default:
        return 0;
    }
  }
  function oi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : ii(mt(e));
  }
  function De(e) {
    return e && e.__v_isReadonly ? e : Ur(e, !1, Dr, ri, Nr);
  }
  function Pr(e) {
    return Ur(e, !0, $r, ni, kr);
  }
  function Ur(e, t, r, n, i) {
    if (!ue(e))
      return console.warn(`value cannot be made reactive: ${String(e)}`), e;
    if (e.__v_raw && !(t && e.__v_isReactive)) return e;
    let o = i.get(e);
    if (o) return o;
    let s = oi(e);
    if (s === 0) return e;
    let a = new Proxy(e, s === 2 ? n : r);
    return i.set(e, a), a;
  }
  function _(e) {
    return (e && _(e.__v_raw)) || e;
  }
  function bt(e) {
    return Boolean(e && e.__v_isRef === !0);
  }
  y("nextTick", () => Se);
  y("dispatch", (e) => K.bind(K, e));
  y("watch", (e) => (t, r) => {
    let n = h(e, t),
      i = !0,
      o;
    k(() =>
      n((s) => {
        JSON.stringify(s),
          i
            ? (o = s)
            : queueMicrotask(() => {
                r(s, o), (o = s);
              }),
          (i = !1);
      })
    );
  });
  y("store", gr);
  y("data", (e) => _e(e));
  y("root", (e) => B(e));
  y(
    "refs",
    (e) => (e._x_refs_proxy || (e._x_refs_proxy = I(si(e))), e._x_refs_proxy)
  );
  function si(e) {
    let t = [],
      r = e;
    for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
    return t;
  }
  var St = {};
  function At(e) {
    return St[e] || (St[e] = 0), ++St[e];
  }
  function Wr(e, t) {
    return Z(e, (r) => {
      if (r._x_ids && r._x_ids[t]) return !0;
    });
  }
  function Gr(e, t) {
    e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = At(t));
  }
  y("id", (e) => (t, r = null) => {
    let n = Wr(e, t),
      i = n ? n._x_ids[t] : At(t);
    return r ? `${t}-${i}-${r}` : `${t}-${i}`;
  });
  y("el", (e) => e);
  p("teleport", (e, { expression: t }, { cleanup: r }) => {
    e.tagName.toLowerCase() !== "template" &&
      z("x-teleport can only be used on a <template> tag", e);
    let n = document.querySelector(t);
    n || z(`Cannot find x-teleport element for selector: "${t}"`);
    let i = e.content.cloneNode(!0).firstElementChild;
    (e._x_teleport = i),
      (i._x_teleportBack = e),
      e._x_forwardEvents &&
        e._x_forwardEvents.forEach((o) => {
          i.addEventListener(o, (s) => {
            s.stopPropagation(), e.dispatchEvent(new s.constructor(s.type, s));
          });
        }),
      C(i, {}, e),
      m(() => {
        n.appendChild(i), S(i), (i._x_ignore = !0);
      }),
      r(() => i.remove());
  });
  var Yr = () => {};
  Yr.inline = (e, { modifiers: t }, { cleanup: r }) => {
    t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
      r(() => {
        t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
      });
  };
  p("ignore", Yr);
  p("effect", (e, { expression: t }, { effect: r }) => r(h(e, t)));
  function de(e, t, r, n) {
    let i = e,
      o = (c) => n(c),
      s = {},
      a = (c, l) => (u) => l(c, u);
    if (
      (r.includes("dot") && (t = ai(t)),
      r.includes("camel") && (t = ci(t)),
      r.includes("passive") && (s.passive = !0),
      r.includes("capture") && (s.capture = !0),
      r.includes("window") && (i = window),
      r.includes("document") && (i = document),
      r.includes("prevent") &&
        (o = a(o, (c, l) => {
          l.preventDefault(), c(l);
        })),
      r.includes("stop") &&
        (o = a(o, (c, l) => {
          l.stopPropagation(), c(l);
        })),
      r.includes("self") &&
        (o = a(o, (c, l) => {
          l.target === e && c(l);
        })),
      (r.includes("away") || r.includes("outside")) &&
        ((i = document),
        (o = a(o, (c, l) => {
          e.contains(l.target) ||
            (e.offsetWidth < 1 && e.offsetHeight < 1) ||
            (e._x_isShown !== !1 && c(l));
        }))),
      (o = a(o, (c, l) => {
        (li(t) && ui(l, r)) || c(l);
      })),
      r.includes("debounce"))
    ) {
      let c = r[r.indexOf("debounce") + 1] || "invalid-wait",
        l = Ot(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
      o = Ce(o, l);
    }
    if (r.includes("throttle")) {
      let c = r[r.indexOf("throttle") + 1] || "invalid-wait",
        l = Ot(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
      o = Re(o, l);
    }
    return (
      r.includes("once") &&
        (o = a(o, (c, l) => {
          c(l), i.removeEventListener(t, o, s);
        })),
      i.addEventListener(t, o, s),
      () => {
        i.removeEventListener(t, o, s);
      }
    );
  }
  function ai(e) {
    return e.replace(/-/g, ".");
  }
  function ci(e) {
    return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
  }
  function Ot(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function fi(e) {
    return e
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/[_\s]/, "-")
      .toLowerCase();
  }
  function li(e) {
    return ["keydown", "keyup"].includes(e);
  }
  function ui(e, t) {
    let r = t.filter(
      (o) => !["window", "document", "prevent", "stop", "once"].includes(o)
    );
    if (r.includes("debounce")) {
      let o = r.indexOf("debounce");
      r.splice(o, Ot((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
    }
    if (r.length === 0 || (r.length === 1 && Jr(e.key).includes(r[0])))
      return !1;
    let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
      r.includes(o)
    );
    return (
      (r = r.filter((o) => !i.includes(o))),
      !(
        i.length > 0 &&
        i.filter(
          (s) => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])
        ).length === i.length &&
        Jr(e.key).includes(r[0])
      )
    );
  }
  function Jr(e) {
    if (!e) return [];
    e = fi(e);
    let t = {
      ctrl: "control",
      slash: "/",
      space: "-",
      spacebar: "-",
      cmd: "meta",
      esc: "escape",
      up: "arrow-up",
      down: "arrow-down",
      left: "arrow-left",
      right: "arrow-right",
      period: ".",
      equal: "=",
    };
    return (
      (t[e] = e),
      Object.keys(t)
        .map((r) => {
          if (t[r] === e) return r;
        })
        .filter((r) => r)
    );
  }
  p(
    "model",
    (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
      let o = h(e, r),
        s = `${r} = rightSideOfExpression($event, ${r})`,
        a = h(e, s);
      var c =
        e.tagName.toLowerCase() === "select" ||
        ["checkbox", "radio"].includes(e.type) ||
        t.includes("lazy")
          ? "change"
          : "input";
      let l = di(e, t, r),
        u = de(e, c, t, (x) => {
          a(() => {}, { scope: { $event: x, rightSideOfExpression: l } });
        });
      i(() => u());
      let d = h(e, `${r} = __placeholder`);
      (e._x_model = {
        get() {
          let x;
          return o((N) => (x = N)), x;
        },
        set(x) {
          d(() => {}, { scope: { __placeholder: x } });
        },
      }),
        (e._x_forceModelUpdate = () => {
          o((x) => {
            x === void 0 && r.match(/\./) && (x = ""),
              (window.fromModel = !0),
              m(() => ce(e, "value", x)),
              delete window.fromModel;
          });
        }),
        n(() => {
          (t.includes("unintrusive") && document.activeElement.isSameNode(e)) ||
            e._x_forceModelUpdate();
        });
    }
  );
  function di(e, t, r) {
    return (
      e.type === "radio" &&
        m(() => {
          e.hasAttribute("name") || e.setAttribute("name", r);
        }),
      (n, i) =>
        m(() => {
          if (n instanceof CustomEvent && n.detail !== void 0)
            return n.detail || n.target.value;
          if (e.type === "checkbox")
            if (Array.isArray(i)) {
              let o = t.includes("number")
                ? Tt(n.target.value)
                : n.target.value;
              return n.target.checked
                ? i.concat([o])
                : i.filter((s) => !pi(s, o));
            } else return n.target.checked;
          else {
            if (e.tagName.toLowerCase() === "select" && e.multiple)
              return t.includes("number")
                ? Array.from(n.target.selectedOptions).map((o) => {
                    let s = o.value || o.text;
                    return Tt(s);
                  })
                : Array.from(n.target.selectedOptions).map(
                    (o) => o.value || o.text
                  );
            {
              let o = n.target.value;
              return t.includes("number")
                ? Tt(o)
                : t.includes("trim")
                ? o.trim()
                : o;
            }
          }
        })
    );
  }
  function Tt(e) {
    let t = e ? parseFloat(e) : null;
    return mi(t) ? t : e;
  }
  function pi(e, t) {
    return e == t;
  }
  function mi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  p("cloak", (e) =>
    queueMicrotask(() => m(() => e.removeAttribute(E("cloak"))))
  );
  Oe(() => `[${E("init")}]`);
  p(
    "init",
    $((e, { expression: t }) =>
      typeof t == "string" ? !!t.trim() && w(e, t, {}, !1) : w(e, t, {}, !1)
    )
  );
  p("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t);
    r(() => {
      i((o) => {
        m(() => {
          e.textContent = o;
        });
      });
    });
  });
  p("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
    let i = n(t);
    r(() => {
      i((o) => {
        e.innerHTML = o;
      });
    });
  });
  J(be(":", ve(E("bind:"))));
  p(
    "bind",
    (
      e,
      { value: t, modifiers: r, expression: n, original: i },
      { effect: o }
    ) => {
      if (!t) return hi(e, n, i, o);
      if (t === "key") return _i(e, n);
      let s = h(e, n);
      o(() =>
        s((a) => {
          a === void 0 && n.match(/\./) && (a = ""), m(() => ce(e, t, a, r));
        })
      );
    }
  );
  function hi(e, t, r, n) {
    let i = {};
    br(i);
    let o = h(e, t),
      s = [];
    for (; s.length; ) s.pop()();
    o(
      (a) => {
        let c = Object.entries(a).map(([u, d]) => ({ name: u, value: d })),
          l = Jt(c);
        (c = c.map((u) =>
          l.find((d) => d.name === u.name)
            ? { name: `x-bind:${u.name}`, value: `"${u.value}"` }
            : u
        )),
          ne(e, c, r).map((u) => {
            s.push(u.runCleanups), u();
          });
      },
      { scope: i }
    );
  }
  function _i(e, t) {
    e._x_keyExpression = t;
  }
  Ae(() => `[${E("data")}]`);
  p(
    "data",
    $((e, { expression: t }, { cleanup: r }) => {
      t = t === "" ? "{}" : t;
      let n = {};
      re(n, e);
      let i = {};
      Er(i, n);
      let o = w(e, t, { scope: i });
      o === void 0 && (o = {}), re(o, e);
      let s = O(o);
      ge(s);
      let a = C(e, s);
      s.init && w(e, s.init),
        r(() => {
          a(), s.destroy && w(e, s.destroy);
        });
    })
  );
  p("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
    let i = h(e, r),
      o = () =>
        m(() => {
          (e.style.display = "none"), (e._x_isShown = !1);
        }),
      s = () =>
        m(() => {
          e.style.length === 1 && e.style.display === "none"
            ? e.removeAttribute("style")
            : e.style.removeProperty("display"),
            (e._x_isShown = !0);
        }),
      a = () => setTimeout(s),
      c = se(
        (d) => (d ? s() : o()),
        (d) => {
          typeof e._x_toggleAndCascadeWithTransitions == "function"
            ? e._x_toggleAndCascadeWithTransitions(e, d, s, o)
            : d
            ? a()
            : o();
        }
      ),
      l,
      u = !0;
    n(() =>
      i((d) => {
        (!u && d === l) ||
          (t.includes("immediate") && (d ? a() : o()), c(d), (l = d), (u = !1));
      })
    );
  });
  p("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = xi(t),
      o = h(e, i.items),
      s = h(e, e._x_keyExpression || "index");
    (e._x_prevKeys = []),
      (e._x_lookup = {}),
      r(() => gi(e, i, o, s)),
      n(() => {
        Object.values(e._x_lookup).forEach((a) => a.remove()),
          delete e._x_prevKeys,
          delete e._x_lookup;
      });
  });
  function gi(e, t, r, n) {
    let i = (s) => typeof s == "object" && !Array.isArray(s),
      o = e;
    r((s) => {
      yi(s) && s >= 0 && (s = Array.from(Array(s).keys(), (f) => f + 1)),
        s === void 0 && (s = []);
      let a = e._x_lookup,
        c = e._x_prevKeys,
        l = [],
        u = [];
      if (i(s))
        s = Object.entries(s).map(([f, g]) => {
          let b = Zr(t, g, f, s);
          n((v) => u.push(v), { scope: { index: f, ...b } }), l.push(b);
        });
      else
        for (let f = 0; f < s.length; f++) {
          let g = Zr(t, s[f], f, s);
          n((b) => u.push(b), { scope: { index: f, ...g } }), l.push(g);
        }
      let d = [],
        x = [],
        N = [],
        U = [];
      for (let f = 0; f < c.length; f++) {
        let g = c[f];
        u.indexOf(g) === -1 && N.push(g);
      }
      c = c.filter((f) => !N.includes(f));
      let pe = "template";
      for (let f = 0; f < u.length; f++) {
        let g = u[f],
          b = c.indexOf(g);
        if (b === -1) c.splice(f, 0, g), d.push([pe, f]);
        else if (b !== f) {
          let v = c.splice(f, 1)[0],
            A = c.splice(b - 1, 1)[0];
          c.splice(f, 0, A), c.splice(b, 0, v), x.push([v, A]);
        } else U.push(g);
        pe = g;
      }
      for (let f = 0; f < N.length; f++) {
        let g = N[f];
        a[g].remove(), (a[g] = null), delete a[g];
      }
      for (let f = 0; f < x.length; f++) {
        let [g, b] = x[f],
          v = a[g],
          A = a[b],
          W = document.createElement("div");
        m(() => {
          A.after(W),
            v.after(A),
            A._x_currentIfEl && A.after(A._x_currentIfEl),
            W.before(v),
            v._x_currentIfEl && v.after(v._x_currentIfEl),
            W.remove();
        }),
          tt(A, l[u.indexOf(b)]);
      }
      for (let f = 0; f < d.length; f++) {
        let [g, b] = d[f],
          v = g === "template" ? o : a[g];
        v._x_currentIfEl && (v = v._x_currentIfEl);
        let A = l[b],
          W = u[b],
          me = document.importNode(o.content, !0).firstElementChild;
        C(me, O(A), o),
          m(() => {
            v.after(me), S(me);
          }),
          typeof W == "object" &&
            z(
              "x-for key cannot be an object, it must be a string or an integer",
              o
            ),
          (a[W] = me);
      }
      for (let f = 0; f < U.length; f++) tt(a[U[f]], l[u.indexOf(U[f])]);
      o._x_prevKeys = u;
    });
  }
  function xi(e) {
    let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
      r = /^\s*\(|\)\s*$/g,
      n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
      i = e.match(n);
    if (!i) return;
    let o = {};
    o.items = i[2].trim();
    let s = i[1].replace(r, "").trim(),
      a = s.match(t);
    return (
      a
        ? ((o.item = s.replace(t, "").trim()),
          (o.index = a[1].trim()),
          a[2] && (o.collection = a[2].trim()))
        : (o.item = s),
      o
    );
  }
  function Zr(e, t, r, n) {
    let i = {};
    return (
      /^\[.*\]$/.test(e.item) && Array.isArray(t)
        ? e.item
            .replace("[", "")
            .replace("]", "")
            .split(",")
            .map((s) => s.trim())
            .forEach((s, a) => {
              i[s] = t[a];
            })
        : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
        ? e.item
            .replace("{", "")
            .replace("}", "")
            .split(",")
            .map((s) => s.trim())
            .forEach((s) => {
              i[s] = t[s];
            })
        : (i[e.item] = t),
      e.index && (i[e.index] = r),
      e.collection && (i[e.collection] = n),
      i
    );
  }
  function yi(e) {
    return !Array.isArray(e) && !isNaN(e);
  }
  function Qr() {}
  Qr.inline = (e, { expression: t }, { cleanup: r }) => {
    let n = B(e);
    n._x_refs || (n._x_refs = {}),
      (n._x_refs[t] = e),
      r(() => delete n._x_refs[t]);
  };
  p("ref", Qr);
  p("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
    let i = h(e, t),
      o = () => {
        if (e._x_currentIfEl) return e._x_currentIfEl;
        let a = e.content.cloneNode(!0).firstElementChild;
        return (
          C(a, {}, e),
          m(() => {
            e.after(a), S(a);
          }),
          (e._x_currentIfEl = a),
          (e._x_undoIf = () => {
            a.remove(), delete e._x_currentIfEl;
          }),
          a
        );
      },
      s = () => {
        !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf);
      };
    r(() =>
      i((a) => {
        a ? o() : s();
      })
    ),
      n(() => e._x_undoIf && e._x_undoIf());
  });
  p("id", (e, { expression: t }, { evaluate: r }) => {
    r(t).forEach((i) => Gr(e, i));
  });
  J(be("@", ve(E("on:"))));
  p(
    "on",
    $((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
      let o = n ? h(e, n) : () => {};
      e.tagName.toLowerCase() === "template" &&
        (e._x_forwardEvents || (e._x_forwardEvents = []),
        e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
      let s = de(e, t, r, (a) => {
        o(() => {}, { scope: { $event: a }, params: [a] });
      });
      i(() => s());
    })
  );
  R.setEvaluator(nt);
  R.setReactivityEngine({ reactive: De, effect: Or, release: Cr, raw: _ });
  var Ct = R;
  window.Alpine = Ct;
  queueMicrotask(() => {
    Ct.start();
  });
})();