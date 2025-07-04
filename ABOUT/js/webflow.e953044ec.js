/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var $_ = Object.create;
  var on = Object.defineProperty;
  var Q_ = Object.getOwnPropertyDescriptor;
  var Z_ = Object.getOwnPropertyNames;
  var J_ = Object.getPrototypeOf,
    eb = Object.prototype.hasOwnProperty;
  var ye = (e, t) => () => (e && (t = e((e = 0))), t);
  var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Ge = (e, t) => {
      for (var r in t) on(e, r, { get: t[r], enumerable: !0 });
    },
    Ns = (e, t, r, n) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of Z_(t))
          !eb.call(e, i) &&
            i !== r &&
            on(e, i, {
              get: () => t[i],
              enumerable: !(n = Q_(t, i)) || n.enumerable,
            });
      return e;
    };
  var fe = (e, t, r) => (
      (r = e != null ? $_(J_(e)) : {}),
      Ns(
        t || !e || !e.__esModule
          ? on(r, "default", { value: e, enumerable: !0 })
          : r,
        e,
      )
    ),
    nt = (e) => Ns(on({}, "__esModule", { value: !0 }), e);
  var Ps = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let n = function (a) {
          let u = window.getComputedStyle(a, null),
            d = u.getPropertyValue("position"),
            h = u.getPropertyValue("overflow"),
            f = u.getPropertyValue("display");
          ((!d || d === "static") && (a.style.position = "relative"),
            h !== "hidden" && (a.style.overflow = "hidden"),
            (!f || f === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill"));
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            d = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let h in d)
            u.getPropertyValue(h) !== d[h] && (a.style[h] = d[h]);
        },
        o = function (a) {
          let u = a.parentNode;
          (n(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px")));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let d = a[u].nodeName.toLowerCase();
            if (d === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              d === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      (document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s));
    })();
  });
  var qs = c(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(n) {
        Webflow.env("design") ||
          ($("video").each(function () {
            n && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            n ? r($(this)) : t($(this));
          }));
      }
      function t(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function r(n) {
        n.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let n = window.matchMedia("(prefers-reduced-motion: reduce)");
        (n.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          n.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                (r(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    }));
              } else (s.pause(), t(o));
          }));
      });
    })();
  });
  var Ci = c(() => {
    "use strict";
    window.tram = (function (e) {
      function t(l, E) {
        var T = new v.Bare();
        return T.init(l, E);
      }
      function r(l) {
        return l.replace(/[A-Z]/g, function (E) {
          return "-" + E.toLowerCase();
        });
      }
      function n(l) {
        var E = parseInt(l.slice(1), 16),
          T = (E >> 16) & 255,
          S = (E >> 8) & 255,
          I = 255 & E;
        return [T, S, I];
      }
      function i(l, E, T) {
        return (
          "#" + ((1 << 24) | (l << 16) | (E << 8) | T).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, E) {
        d("Type warning: Expected: [" + l + "] Got: [" + typeof E + "] " + E);
      }
      function a(l, E, T) {
        d("Units do not match [" + l + "]: " + E + ", " + T);
      }
      function u(l, E, T) {
        if ((E !== void 0 && (T = E), l === void 0)) return T;
        var S = T;
        return (
          Be.test(l) || !De.test(l)
            ? (S = parseInt(l, 10))
            : De.test(l) && (S = 1e3 * parseFloat(l)),
          0 > S && (S = 0),
          S === S ? S : T
        );
      }
      function d(l) {
        ue.debug && window && window.console.warn(l);
      }
      function h(l) {
        for (var E = -1, T = l ? l.length : 0, S = []; ++E < T; ) {
          var I = l[E];
          I && S.push(I);
        }
        return S;
      }
      var f = (function (l, E, T) {
          function S(ae) {
            return typeof ae == "object";
          }
          function I(ae) {
            return typeof ae == "function";
          }
          function C() {}
          function Q(ae, ge) {
            function H() {
              var Le = new se();
              return (I(Le.init) && Le.init.apply(Le, arguments), Le);
            }
            function se() {}
            (ge === T && ((ge = ae), (ae = Object)), (H.Bare = se));
            var ce,
              Ie = (C[l] = ae[l]),
              rt = (se[l] = H[l] = new C());
            return (
              (rt.constructor = H),
              (H.mixin = function (Le) {
                return ((se[l] = H[l] = Q(H, Le)[l]), H);
              }),
              (H.open = function (Le) {
                if (
                  ((ce = {}),
                  I(Le) ? (ce = Le.call(H, rt, Ie, H, ae)) : S(Le) && (ce = Le),
                  S(ce))
                )
                  for (var yr in ce) E.call(ce, yr) && (rt[yr] = ce[yr]);
                return (I(rt.init) || (rt.init = ae), H);
              }),
              H.open(ge)
            );
          }
          return Q;
        })("prototype", {}.hasOwnProperty),
        m = {
          ease: [
            "ease",
            function (l, E, T, S) {
              var I = (l /= S) * l,
                C = I * l;
              return (
                E +
                T * (-2.75 * C * I + 11 * I * I + -15.5 * C + 8 * I + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, E, T, S) {
              var I = (l /= S) * l,
                C = I * l;
              return E + T * (-1 * C * I + 3 * I * I + -3 * C + 2 * I);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, E, T, S) {
              var I = (l /= S) * l,
                C = I * l;
              return (
                E +
                T * (0.3 * C * I + -1.6 * I * I + 2.2 * C + -1.8 * I + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, E, T, S) {
              var I = (l /= S) * l,
                C = I * l;
              return E + T * (2 * C * I + -5 * I * I + 2 * C + 2 * I);
            },
          ],
          linear: [
            "linear",
            function (l, E, T, S) {
              return (T * l) / S + E;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, E, T, S) {
              return T * (l /= S) * l + E;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, E, T, S) {
              return -T * (l /= S) * (l - 2) + E;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, E, T, S) {
              return (l /= S / 2) < 1
                ? (T / 2) * l * l + E
                : (-T / 2) * (--l * (l - 2) - 1) + E;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, E, T, S) {
              return T * (l /= S) * l * l + E;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, E, T, S) {
              return T * ((l = l / S - 1) * l * l + 1) + E;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, E, T, S) {
              return (l /= S / 2) < 1
                ? (T / 2) * l * l * l + E
                : (T / 2) * ((l -= 2) * l * l + 2) + E;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, E, T, S) {
              return T * (l /= S) * l * l * l + E;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, E, T, S) {
              return -T * ((l = l / S - 1) * l * l * l - 1) + E;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, E, T, S) {
              return (l /= S / 2) < 1
                ? (T / 2) * l * l * l * l + E
                : (-T / 2) * ((l -= 2) * l * l * l - 2) + E;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, E, T, S) {
              return T * (l /= S) * l * l * l * l + E;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, E, T, S) {
              return T * ((l = l / S - 1) * l * l * l * l + 1) + E;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, E, T, S) {
              return (l /= S / 2) < 1
                ? (T / 2) * l * l * l * l * l + E
                : (T / 2) * ((l -= 2) * l * l * l * l + 2) + E;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, E, T, S) {
              return -T * Math.cos((l / S) * (Math.PI / 2)) + T + E;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, E, T, S) {
              return T * Math.sin((l / S) * (Math.PI / 2)) + E;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, E, T, S) {
              return (-T / 2) * (Math.cos((Math.PI * l) / S) - 1) + E;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, E, T, S) {
              return l === 0 ? E : T * Math.pow(2, 10 * (l / S - 1)) + E;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, E, T, S) {
              return l === S
                ? E + T
                : T * (-Math.pow(2, (-10 * l) / S) + 1) + E;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, E, T, S) {
              return l === 0
                ? E
                : l === S
                  ? E + T
                  : (l /= S / 2) < 1
                    ? (T / 2) * Math.pow(2, 10 * (l - 1)) + E
                    : (T / 2) * (-Math.pow(2, -10 * --l) + 2) + E;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, E, T, S) {
              return -T * (Math.sqrt(1 - (l /= S) * l) - 1) + E;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, E, T, S) {
              return T * Math.sqrt(1 - (l = l / S - 1) * l) + E;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, E, T, S) {
              return (l /= S / 2) < 1
                ? (-T / 2) * (Math.sqrt(1 - l * l) - 1) + E
                : (T / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + E;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, E, T, S, I) {
              return (
                I === void 0 && (I = 1.70158),
                T * (l /= S) * l * ((I + 1) * l - I) + E
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, E, T, S, I) {
              return (
                I === void 0 && (I = 1.70158),
                T * ((l = l / S - 1) * l * ((I + 1) * l + I) + 1) + E
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, E, T, S, I) {
              return (
                I === void 0 && (I = 1.70158),
                (l /= S / 2) < 1
                  ? (T / 2) * l * l * (((I *= 1.525) + 1) * l - I) + E
                  : (T / 2) *
                      ((l -= 2) * l * (((I *= 1.525) + 1) * l + I) + 2) +
                    E
              );
            },
          ],
        },
        p = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        g = document,
        _ = window,
        O = "bkwld-tram",
        w = /[\-\.0-9]/g,
        R = /[A-Z]/,
        A = "number",
        N = /^(rgb|#)/,
        P = /(em|cm|mm|in|pt|pc|px)$/,
        L = /(em|cm|mm|in|pt|pc|px|%)$/,
        X = /(deg|rad|turn)$/,
        B = "unitless",
        j = /(all|none) 0s ease 0s/,
        Z = /^(width|height)$/,
        ie = " ",
        D = g.createElement("a"),
        x = ["Webkit", "Moz", "O", "ms"],
        q = ["-webkit-", "-moz-", "-o-", "-ms-"],
        W = function (l) {
          if (l in D.style) return { dom: l, css: l };
          var E,
            T,
            S = "",
            I = l.split("-");
          for (E = 0; E < I.length; E++)
            S += I[E].charAt(0).toUpperCase() + I[E].slice(1);
          for (E = 0; E < x.length; E++)
            if (((T = x[E] + S), T in D.style))
              return { dom: T, css: q[E] + l };
        },
        F = (t.support = {
          bind: Function.prototype.bind,
          transform: W("transform"),
          transition: W("transition"),
          backface: W("backface-visibility"),
          timing: W("transition-timing-function"),
        });
      if (F.transition) {
        var J = F.timing.dom;
        if (((D.style[J] = m["ease-in-back"][0]), !D.style[J]))
          for (var ne in p) m[ne][0] = p[ne];
      }
      var M = (t.frame = (function () {
          var l =
            _.requestAnimationFrame ||
            _.webkitRequestAnimationFrame ||
            _.mozRequestAnimationFrame ||
            _.oRequestAnimationFrame ||
            _.msRequestAnimationFrame;
          return l && F.bind
            ? l.bind(_)
            : function (E) {
                _.setTimeout(E, 16);
              };
        })()),
        G = (t.now = (function () {
          var l = _.performance,
            E = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return E && F.bind
            ? E.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        K = f(function (l) {
          function E(re, le) {
            var Ee = h(("" + re).split(ie)),
              pe = Ee[0];
            le = le || {};
            var Ne = k[pe];
            if (!Ne) return d("Unsupported property: " + pe);
            if (!le.weak || !this.props[pe]) {
              var ze = Ne[0],
                Fe = this.props[pe];
              return (
                Fe || (Fe = this.props[pe] = new ze.Bare()),
                Fe.init(this.$el, Ee, Ne, le),
                Fe
              );
            }
          }
          function T(re, le, Ee) {
            if (re) {
              var pe = typeof re;
              if (
                (le ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                pe == "number" && le)
              )
                return (
                  (this.timer = new ee({
                    duration: re,
                    context: this,
                    complete: C,
                  })),
                  void (this.active = !0)
                );
              if (pe == "string" && le) {
                switch (re) {
                  case "hide":
                    H.call(this);
                    break;
                  case "stop":
                    Q.call(this);
                    break;
                  case "redraw":
                    se.call(this);
                    break;
                  default:
                    E.call(this, re, Ee && Ee[1]);
                }
                return C.call(this);
              }
              if (pe == "function") return void re.call(this, this);
              if (pe == "object") {
                var Ne = 0;
                (rt.call(
                  this,
                  re,
                  function (Te, Y_) {
                    (Te.span > Ne && (Ne = Te.span), Te.stop(), Te.animate(Y_));
                  },
                  function (Te) {
                    "wait" in Te && (Ne = u(Te.wait, 0));
                  },
                ),
                  Ie.call(this),
                  Ne > 0 &&
                    ((this.timer = new ee({ duration: Ne, context: this })),
                    (this.active = !0),
                    le && (this.timer.complete = C)));
                var ze = this,
                  Fe = !1,
                  nn = {};
                M(function () {
                  (rt.call(ze, re, function (Te) {
                    Te.active && ((Fe = !0), (nn[Te.name] = Te.nextStyle));
                  }),
                    Fe && ze.$el.css(nn));
                });
              }
            }
          }
          function S(re) {
            ((re = u(re, 0)),
              this.active
                ? this.queue.push({ options: re })
                : ((this.timer = new ee({
                    duration: re,
                    context: this,
                    complete: C,
                  })),
                  (this.active = !0)));
          }
          function I(re) {
            return this.active
              ? (this.queue.push({ options: re, args: arguments }),
                void (this.timer.complete = C))
              : d(
                  "No active transition timer. Use start() or wait() before then().",
                );
          }
          function C() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var re = this.queue.shift();
              T.call(this, re.options, !0, re.args);
            }
          }
          function Q(re) {
            (this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1));
            var le;
            (typeof re == "string"
              ? ((le = {}), (le[re] = 1))
              : (le = typeof re == "object" && re != null ? re : this.props),
              rt.call(this, le, Le),
              Ie.call(this));
          }
          function ae(re) {
            (Q.call(this, re), rt.call(this, re, yr, z_));
          }
          function ge(re) {
            (typeof re != "string" && (re = "block"),
              (this.el.style.display = re));
          }
          function H() {
            (Q.call(this), (this.el.style.display = "none"));
          }
          function se() {
            this.el.offsetHeight;
          }
          function ce() {
            (Q.call(this),
              e.removeData(this.el, O),
              (this.$el = this.el = null));
          }
          function Ie() {
            var re,
              le,
              Ee = [];
            this.upstream && Ee.push(this.upstream);
            for (re in this.props)
              ((le = this.props[re]), le.active && Ee.push(le.string));
            ((Ee = Ee.join(",")),
              this.style !== Ee &&
                ((this.style = Ee), (this.el.style[F.transition.dom] = Ee)));
          }
          function rt(re, le, Ee) {
            var pe,
              Ne,
              ze,
              Fe,
              nn = le !== Le,
              Te = {};
            for (pe in re)
              ((ze = re[pe]),
                pe in de
                  ? (Te.transform || (Te.transform = {}),
                    (Te.transform[pe] = ze))
                  : (R.test(pe) && (pe = r(pe)),
                    pe in k
                      ? (Te[pe] = ze)
                      : (Fe || (Fe = {}), (Fe[pe] = ze))));
            for (pe in Te) {
              if (((ze = Te[pe]), (Ne = this.props[pe]), !Ne)) {
                if (!nn) continue;
                Ne = E.call(this, pe);
              }
              le.call(this, Ne, ze);
            }
            Ee && Fe && Ee.call(this, Fe);
          }
          function Le(re) {
            re.stop();
          }
          function yr(re, le) {
            re.set(le);
          }
          function z_(re) {
            this.$el.css(re);
          }
          function je(re, le) {
            l[re] = function () {
              return this.children
                ? K_.call(this, le, arguments)
                : (this.el && le.apply(this, arguments), this);
            };
          }
          function K_(re, le) {
            var Ee,
              pe = this.children.length;
            for (Ee = 0; pe > Ee; Ee++) re.apply(this.children[Ee], le);
            return this;
          }
          ((l.init = function (re) {
            if (
              ((this.$el = e(re)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ue.keepInherited && !ue.fallback)
            ) {
              var le = V(this.el, "transition");
              le && !j.test(le) && (this.upstream = le);
            }
            F.backface &&
              ue.hideBackface &&
              y(this.el, F.backface.css, "hidden");
          }),
            je("add", E),
            je("start", T),
            je("wait", S),
            je("then", I),
            je("next", C),
            je("stop", Q),
            je("set", ae),
            je("show", ge),
            je("hide", H),
            je("redraw", se),
            je("destroy", ce));
        }),
        v = f(K, function (l) {
          function E(T, S) {
            var I = e.data(T, O) || e.data(T, O, new K.Bare());
            return (I.el || I.init(T), S ? I.start(S) : I);
          }
          l.init = function (T, S) {
            var I = e(T);
            if (!I.length) return this;
            if (I.length === 1) return E(I[0], S);
            var C = [];
            return (
              I.each(function (Q, ae) {
                C.push(E(ae, S));
              }),
              (this.children = C),
              this
            );
          };
        }),
        b = f(function (l) {
          function E() {
            var C = this.get();
            this.update("auto");
            var Q = this.get();
            return (this.update(C), Q);
          }
          function T(C, Q, ae) {
            return (Q !== void 0 && (ae = Q), C in m ? C : ae);
          }
          function S(C) {
            var Q = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(C);
            return (Q ? i(Q[1], Q[2], Q[3]) : C).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3",
            );
          }
          var I = { duration: 500, ease: "ease", delay: 0 };
          ((l.init = function (C, Q, ae, ge) {
            ((this.$el = C), (this.el = C[0]));
            var H = Q[0];
            (ae[2] && (H = ae[2]),
              z[H] && (H = z[H]),
              (this.name = H),
              (this.type = ae[1]),
              (this.duration = u(Q[1], this.duration, I.duration)),
              (this.ease = T(Q[2], this.ease, I.ease)),
              (this.delay = u(Q[3], this.delay, I.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = Z.test(this.name)),
              (this.unit = ge.unit || this.unit || ue.defaultUnit),
              (this.angle = ge.angle || this.angle || ue.defaultAngle),
              ue.fallback || ge.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    ie +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? ie + m[this.ease][0] : "") +
                    (this.delay ? ie + this.delay + "ms" : ""))));
          }),
            (l.set = function (C) {
              ((C = this.convert(C, this.type)), this.update(C), this.redraw());
            }),
            (l.transition = function (C) {
              ((this.active = !0),
                (C = this.convert(C, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  C == "auto" && (C = E.call(this))),
                (this.nextStyle = C));
            }),
            (l.fallback = function (C) {
              var Q =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              ((C = this.convert(C, this.type)),
                this.auto &&
                  (Q == "auto" && (Q = this.convert(this.get(), this.type)),
                  C == "auto" && (C = E.call(this))),
                (this.tween = new Y({
                  from: Q,
                  to: C,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                })));
            }),
            (l.get = function () {
              return V(this.el, this.name);
            }),
            (l.update = function (C) {
              y(this.el, this.name, C);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                y(this.el, this.name, this.get()));
              var C = this.tween;
              C && C.context && C.destroy();
            }),
            (l.convert = function (C, Q) {
              if (C == "auto" && this.auto) return C;
              var ae,
                ge = typeof C == "number",
                H = typeof C == "string";
              switch (Q) {
                case A:
                  if (ge) return C;
                  if (H && C.replace(w, "") === "") return +C;
                  ae = "number(unitless)";
                  break;
                case N:
                  if (H) {
                    if (C === "" && this.original) return this.original;
                    if (Q.test(C))
                      return C.charAt(0) == "#" && C.length == 7 ? C : S(C);
                  }
                  ae = "hex or rgb string";
                  break;
                case P:
                  if (ge) return C + this.unit;
                  if (H && Q.test(C)) return C;
                  ae = "number(px) or string(unit)";
                  break;
                case L:
                  if (ge) return C + this.unit;
                  if (H && Q.test(C)) return C;
                  ae = "number(px) or string(unit or %)";
                  break;
                case X:
                  if (ge) return C + this.angle;
                  if (H && Q.test(C)) return C;
                  ae = "number(deg) or string(angle)";
                  break;
                case B:
                  if (ge || (H && L.test(C))) return C;
                  ae = "number(unitless) or string(unit or %)";
              }
              return (s(ae, C), C);
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            }));
        }),
        U = f(b, function (l, E) {
          l.init = function () {
            (E.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), N)));
          };
        }),
        te = f(b, function (l, E) {
          ((l.init = function () {
            (E.init.apply(this, arguments), (this.animate = this.fallback));
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (T) {
              this.$el[this.name](T);
            }));
        }),
        oe = f(b, function (l, E) {
          function T(S, I) {
            var C, Q, ae, ge, H;
            for (C in S)
              ((ge = de[C]),
                (ae = ge[0]),
                (Q = ge[1] || C),
                (H = this.convert(S[C], ae)),
                I.call(this, Q, H, ae));
          }
          ((l.init = function () {
            (E.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                de.perspective &&
                  ue.perspective &&
                  ((this.current.perspective = ue.perspective),
                  y(this.el, this.name, this.style(this.current)),
                  this.redraw())));
          }),
            (l.set = function (S) {
              (T.call(this, S, function (I, C) {
                this.current[I] = C;
              }),
                y(this.el, this.name, this.style(this.current)),
                this.redraw());
            }),
            (l.transition = function (S) {
              var I = this.values(S);
              this.tween = new be({
                current: this.current,
                values: I,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var C,
                Q = {};
              for (C in this.current) Q[C] = C in I ? I[C] : this.current[C];
              ((this.active = !0), (this.nextStyle = this.style(Q)));
            }),
            (l.fallback = function (S) {
              var I = this.values(S);
              this.tween = new be({
                current: this.current,
                values: I,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              y(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (S) {
              var I,
                C = "";
              for (I in S) C += I + "(" + S[I] + ") ";
              return C;
            }),
            (l.values = function (S) {
              var I,
                C = {};
              return (
                T.call(this, S, function (Q, ae, ge) {
                  ((C[Q] = ae),
                    this.current[Q] === void 0 &&
                      ((I = 0),
                      ~Q.indexOf("scale") && (I = 1),
                      (this.current[Q] = this.convert(I, ge))));
                }),
                C
              );
            }));
        }),
        Y = f(function (l) {
          function E(H) {
            ae.push(H) === 1 && M(T);
          }
          function T() {
            var H,
              se,
              ce,
              Ie = ae.length;
            if (Ie)
              for (M(T), se = G(), H = Ie; H--; )
                ((ce = ae[H]), ce && ce.render(se));
          }
          function S(H) {
            var se,
              ce = e.inArray(H, ae);
            ce >= 0 &&
              ((se = ae.slice(ce + 1)),
              (ae.length = ce),
              se.length && (ae = ae.concat(se)));
          }
          function I(H) {
            return Math.round(H * ge) / ge;
          }
          function C(H, se, ce) {
            return i(
              H[0] + ce * (se[0] - H[0]),
              H[1] + ce * (se[1] - H[1]),
              H[2] + ce * (se[2] - H[2]),
            );
          }
          var Q = { ease: m.ease[1], from: 0, to: 1 };
          ((l.init = function (H) {
            ((this.duration = H.duration || 0), (this.delay = H.delay || 0));
            var se = H.ease || Q.ease;
            (m[se] && (se = m[se][1]),
              typeof se != "function" && (se = Q.ease),
              (this.ease = se),
              (this.update = H.update || o),
              (this.complete = H.complete || o),
              (this.context = H.context || this),
              (this.name = H.name));
            var ce = H.from,
              Ie = H.to;
            (ce === void 0 && (ce = Q.from),
              Ie === void 0 && (Ie = Q.to),
              (this.unit = H.unit || ""),
              typeof ce == "number" && typeof Ie == "number"
                ? ((this.begin = ce), (this.change = Ie - ce))
                : this.format(Ie, ce),
              (this.value = this.begin + this.unit),
              (this.start = G()),
              H.autoplay !== !1 && this.play());
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = G()), (this.active = !0), E(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), S(this));
            }),
            (l.render = function (H) {
              var se,
                ce = H - this.start;
              if (this.delay) {
                if (ce <= this.delay) return;
                ce -= this.delay;
              }
              if (ce < this.duration) {
                var Ie = this.ease(ce, 0, 1, this.duration);
                return (
                  (se = this.startRGB
                    ? C(this.startRGB, this.endRGB, Ie)
                    : I(this.begin + Ie * this.change)),
                  (this.value = se + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              ((se = this.endHex || this.begin + this.change),
                (this.value = se + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy());
            }),
            (l.format = function (H, se) {
              if (((se += ""), (H += ""), H.charAt(0) == "#"))
                return (
                  (this.startRGB = n(se)),
                  (this.endRGB = n(H)),
                  (this.endHex = H),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var ce = se.replace(w, ""),
                  Ie = H.replace(w, "");
                (ce !== Ie && a("tween", se, H), (this.unit = ce));
              }
              ((se = parseFloat(se)),
                (H = parseFloat(H)),
                (this.begin = this.value = se),
                (this.change = H - se));
            }),
            (l.destroy = function () {
              (this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o));
            }));
          var ae = [],
            ge = 1e3;
        }),
        ee = f(Y, function (l) {
          ((l.init = function (E) {
            ((this.duration = E.duration || 0),
              (this.complete = E.complete || o),
              (this.context = E.context),
              this.play());
          }),
            (l.render = function (E) {
              var T = E - this.start;
              T < this.duration ||
                (this.complete.call(this.context), this.destroy());
            }));
        }),
        be = f(Y, function (l, E) {
          ((l.init = function (T) {
            ((this.context = T.context),
              (this.update = T.update),
              (this.tweens = []),
              (this.current = T.current));
            var S, I;
            for (S in T.values)
              ((I = T.values[S]),
                this.current[S] !== I &&
                  this.tweens.push(
                    new Y({
                      name: S,
                      from: this.current[S],
                      to: I,
                      duration: T.duration,
                      delay: T.delay,
                      ease: T.ease,
                      autoplay: !1,
                    }),
                  ));
            this.play();
          }),
            (l.render = function (T) {
              var S,
                I,
                C = this.tweens.length,
                Q = !1;
              for (S = C; S--; )
                ((I = this.tweens[S]),
                  I.context &&
                    (I.render(T), (this.current[I.name] = I.value), (Q = !0)));
              return Q
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((E.destroy.call(this), this.tweens)) {
                var T,
                  S = this.tweens.length;
                for (T = S; T--; ) this.tweens[T].destroy();
                ((this.tweens = null), (this.current = null));
              }
            }));
        }),
        ue = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !F.transition,
          agentTests: [],
        });
      ((t.fallback = function (l) {
        if (!F.transition) return (ue.fallback = !0);
        ue.agentTests.push("(" + l + ")");
        var E = new RegExp(ue.agentTests.join("|"), "i");
        ue.fallback = E.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new Y(l);
        }),
        (t.delay = function (l, E, T) {
          return new ee({ complete: E, duration: l, context: T });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        }));
      var y = e.style,
        V = e.css,
        z = { transform: F.transform && F.transform.css },
        k = {
          color: [U, N],
          background: [U, N, "background-color"],
          "outline-color": [U, N],
          "border-color": [U, N],
          "border-top-color": [U, N],
          "border-right-color": [U, N],
          "border-bottom-color": [U, N],
          "border-left-color": [U, N],
          "border-width": [b, P],
          "border-top-width": [b, P],
          "border-right-width": [b, P],
          "border-bottom-width": [b, P],
          "border-left-width": [b, P],
          "border-spacing": [b, P],
          "letter-spacing": [b, P],
          margin: [b, P],
          "margin-top": [b, P],
          "margin-right": [b, P],
          "margin-bottom": [b, P],
          "margin-left": [b, P],
          padding: [b, P],
          "padding-top": [b, P],
          "padding-right": [b, P],
          "padding-bottom": [b, P],
          "padding-left": [b, P],
          "outline-width": [b, P],
          opacity: [b, A],
          top: [b, L],
          right: [b, L],
          bottom: [b, L],
          left: [b, L],
          "font-size": [b, L],
          "text-indent": [b, L],
          "word-spacing": [b, L],
          width: [b, L],
          "min-width": [b, L],
          "max-width": [b, L],
          height: [b, L],
          "min-height": [b, L],
          "max-height": [b, L],
          "line-height": [b, B],
          "scroll-top": [te, A, "scrollTop"],
          "scroll-left": [te, A, "scrollLeft"],
        },
        de = {};
      (F.transform &&
        ((k.transform = [oe]),
        (de = {
          x: [L, "translateX"],
          y: [L, "translateY"],
          rotate: [X],
          rotateX: [X],
          rotateY: [X],
          scale: [A],
          scaleX: [A],
          scaleY: [A],
          skew: [X],
          skewX: [X],
          skewY: [X],
        })),
        F.transform &&
          F.backface &&
          ((de.z = [L, "translateZ"]),
          (de.rotateZ = [X]),
          (de.scaleZ = [A]),
          (de.perspective = [P])));
      var Be = /ms/,
        De = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var Ds = c((KH, Ms) => {
    "use strict";
    var tb = window.$,
      rb = Ci() && tb.tram;
    Ms.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        r = Array.prototype,
        n = Object.prototype,
        i = Function.prototype,
        o = r.push,
        s = r.slice,
        a = r.concat,
        u = n.toString,
        d = n.hasOwnProperty,
        h = r.forEach,
        f = r.map,
        m = r.reduce,
        p = r.reduceRight,
        g = r.filter,
        _ = r.every,
        O = r.some,
        w = r.indexOf,
        R = r.lastIndexOf,
        A = Array.isArray,
        N = Object.keys,
        P = i.bind,
        L =
          (e.each =
          e.forEach =
            function (x, q, W) {
              if (x == null) return x;
              if (h && x.forEach === h) x.forEach(q, W);
              else if (x.length === +x.length) {
                for (var F = 0, J = x.length; F < J; F++)
                  if (q.call(W, x[F], F, x) === t) return;
              } else
                for (var ne = e.keys(x), F = 0, J = ne.length; F < J; F++)
                  if (q.call(W, x[ne[F]], ne[F], x) === t) return;
              return x;
            });
      ((e.map = e.collect =
        function (x, q, W) {
          var F = [];
          return x == null
            ? F
            : f && x.map === f
              ? x.map(q, W)
              : (L(x, function (J, ne, M) {
                  F.push(q.call(W, J, ne, M));
                }),
                F);
        }),
        (e.find = e.detect =
          function (x, q, W) {
            var F;
            return (
              X(x, function (J, ne, M) {
                if (q.call(W, J, ne, M)) return ((F = J), !0);
              }),
              F
            );
          }),
        (e.filter = e.select =
          function (x, q, W) {
            var F = [];
            return x == null
              ? F
              : g && x.filter === g
                ? x.filter(q, W)
                : (L(x, function (J, ne, M) {
                    q.call(W, J, ne, M) && F.push(J);
                  }),
                  F);
          }));
      var X =
        (e.some =
        e.any =
          function (x, q, W) {
            q || (q = e.identity);
            var F = !1;
            return x == null
              ? F
              : O && x.some === O
                ? x.some(q, W)
                : (L(x, function (J, ne, M) {
                    if (F || (F = q.call(W, J, ne, M))) return t;
                  }),
                  !!F);
          });
      ((e.contains = e.include =
        function (x, q) {
          return x == null
            ? !1
            : w && x.indexOf === w
              ? x.indexOf(q) != -1
              : X(x, function (W) {
                  return W === q;
                });
        }),
        (e.delay = function (x, q) {
          var W = s.call(arguments, 2);
          return setTimeout(function () {
            return x.apply(null, W);
          }, q);
        }),
        (e.defer = function (x) {
          return e.delay.apply(e, [x, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (x) {
          var q, W, F;
          return function () {
            q ||
              ((q = !0),
              (W = arguments),
              (F = this),
              rb.frame(function () {
                ((q = !1), x.apply(F, W));
              }));
          };
        }),
        (e.debounce = function (x, q, W) {
          var F,
            J,
            ne,
            M,
            G,
            K = function () {
              var v = e.now() - M;
              v < q
                ? (F = setTimeout(K, q - v))
                : ((F = null), W || ((G = x.apply(ne, J)), (ne = J = null)));
            };
          return function () {
            ((ne = this), (J = arguments), (M = e.now()));
            var v = W && !F;
            return (
              F || (F = setTimeout(K, q)),
              v && ((G = x.apply(ne, J)), (ne = J = null)),
              G
            );
          };
        }),
        (e.defaults = function (x) {
          if (!e.isObject(x)) return x;
          for (var q = 1, W = arguments.length; q < W; q++) {
            var F = arguments[q];
            for (var J in F) x[J] === void 0 && (x[J] = F[J]);
          }
          return x;
        }),
        (e.keys = function (x) {
          if (!e.isObject(x)) return [];
          if (N) return N(x);
          var q = [];
          for (var W in x) e.has(x, W) && q.push(W);
          return q;
        }),
        (e.has = function (x, q) {
          return d.call(x, q);
        }),
        (e.isObject = function (x) {
          return x === Object(x);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        }));
      var B = /(.)^/,
        j = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        Z = /\\|'|\r|\n|\u2028|\u2029/g,
        ie = function (x) {
          return "\\" + j[x];
        },
        D = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (x, q, W) {
          (!q && W && (q = W), (q = e.defaults({}, q, e.templateSettings)));
          var F = RegExp(
              [
                (q.escape || B).source,
                (q.interpolate || B).source,
                (q.evaluate || B).source,
              ].join("|") + "|$",
              "g",
            ),
            J = 0,
            ne = "__p+='";
          (x.replace(F, function (v, b, U, te, oe) {
            return (
              (ne += x.slice(J, oe).replace(Z, ie)),
              (J = oe + v.length),
              b
                ? (ne +=
                    `'+
((__t=(` +
                    b +
                    `))==null?'':_.escape(__t))+
'`)
                : U
                  ? (ne +=
                      `'+
((__t=(` +
                      U +
                      `))==null?'':__t)+
'`)
                  : te &&
                    (ne +=
                      `';
` +
                      te +
                      `
__p+='`),
              v
            );
          }),
            (ne += `';
`));
          var M = q.variable;
          if (M) {
            if (!D.test(M))
              throw new Error("variable is not a bare identifier: " + M);
          } else
            ((ne =
              `with(obj||{}){
` +
              ne +
              `}
`),
              (M = "obj"));
          ne =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
` +
            ne +
            `return __p;
`;
          var G;
          try {
            G = new Function(q.variable || "obj", "_", ne);
          } catch (v) {
            throw ((v.source = ne), v);
          }
          var K = function (v) {
            return G.call(this, v, e);
          };
          return (
            (K.source =
              "function(" +
              M +
              `){
` +
              ne +
              "}"),
            K
          );
        }),
        e
      );
    })();
  });
  var We = c((YH, Xs) => {
    "use strict";
    var he = {},
      Vt = {},
      Ut = [],
      Li = window.Webflow || [],
      Et = window.jQuery,
      Ye = Et(window),
      nb = Et(document),
      it = Et.isFunction,
      Ke = (he._ = Ds()),
      Gs = (he.tram = Ci() && Et.tram),
      sn = !1,
      Ni = !1;
    Gs.config.hideBackface = !1;
    Gs.config.keepInherited = !0;
    he.define = function (e, t, r) {
      Vt[e] && Us(Vt[e]);
      var n = (Vt[e] = t(Et, Ke, r) || {});
      return (Vs(n), n);
    };
    he.require = function (e) {
      return Vt[e];
    };
    function Vs(e) {
      (he.env() &&
        (it(e.design) && Ye.on("__wf_design", e.design),
        it(e.preview) && Ye.on("__wf_preview", e.preview)),
        it(e.destroy) && Ye.on("__wf_destroy", e.destroy),
        e.ready && it(e.ready) && ib(e));
    }
    function ib(e) {
      if (sn) {
        e.ready();
        return;
      }
      Ke.contains(Ut, e.ready) || Ut.push(e.ready);
    }
    function Us(e) {
      (it(e.design) && Ye.off("__wf_design", e.design),
        it(e.preview) && Ye.off("__wf_preview", e.preview),
        it(e.destroy) && Ye.off("__wf_destroy", e.destroy),
        e.ready && it(e.ready) && ob(e));
    }
    function ob(e) {
      Ut = Ke.filter(Ut, function (t) {
        return t !== e.ready;
      });
    }
    he.push = function (e) {
      if (sn) {
        it(e) && e();
        return;
      }
      Li.push(e);
    };
    he.env = function (e) {
      var t = window.__wf_design,
        r = typeof t < "u";
      if (!e) return r;
      if (e === "design") return r && t;
      if (e === "preview") return r && !t;
      if (e === "slug") return r && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var an = navigator.userAgent.toLowerCase(),
      Hs = (he.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      ab = (he.env.chrome =
        /chrome/.test(an) &&
        /Google/.test(navigator.vendor) &&
        parseInt(an.match(/chrome\/(\d+)\./)[1], 10)),
      sb = (he.env.ios = /(ipod|iphone|ipad)/.test(an));
    he.env.safari = /safari/.test(an) && !ab && !sb;
    var Ri;
    Hs &&
      nb.on("touchstart mousedown", function (e) {
        Ri = e.target;
      });
    he.validClick = Hs
      ? function (e) {
          return e === Ri || Et.contains(e, Ri);
        }
      : function () {
          return !0;
        };
    var Ws = "resize.webflow orientationchange.webflow load.webflow",
      ub = "scroll.webflow " + Ws;
    he.resize = Pi(Ye, Ws);
    he.scroll = Pi(Ye, ub);
    he.redraw = Pi();
    function Pi(e, t) {
      var r = [],
        n = {};
      return (
        (n.up = Ke.throttle(function (i) {
          Ke.each(r, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, n.up),
        (n.on = function (i) {
          typeof i == "function" && (Ke.contains(r, i) || r.push(i));
        }),
        (n.off = function (i) {
          if (!arguments.length) {
            r = [];
            return;
          }
          r = Ke.filter(r, function (o) {
            return o !== i;
          });
        }),
        n
      );
    }
    he.location = function (e) {
      window.location = e;
    };
    he.env() && (he.location = function () {});
    he.ready = function () {
      ((sn = !0), Ni ? cb() : Ke.each(Ut, Fs), Ke.each(Li, Fs), he.resize.up());
    };
    function Fs(e) {
      it(e) && e();
    }
    function cb() {
      ((Ni = !1), Ke.each(Vt, Vs));
    }
    var St;
    he.load = function (e) {
      St.then(e);
    };
    function ks() {
      (St && (St.reject(), Ye.off("load", St.resolve)),
        (St = new Et.Deferred()),
        Ye.on("load", St.resolve));
    }
    he.destroy = function (e) {
      ((e = e || {}),
        (Ni = !0),
        Ye.triggerHandler("__wf_destroy"),
        e.domready != null && (sn = e.domready),
        Ke.each(Vt, Us),
        he.resize.off(),
        he.scroll.off(),
        he.redraw.off(),
        (Ut = []),
        (Li = []),
        St.state() === "pending" && ks());
    };
    Et(he.ready);
    ks();
    Xs.exports = window.Webflow = he;
  });
  var zs = c(($H, js) => {
    "use strict";
    var Bs = We();
    Bs.define(
      "brand",
      (js.exports = function (e) {
        var t = {},
          r = document,
          n = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          d;
        t.ready = function () {
          var p = n.attr("data-wf-status"),
            g = n.attr("data-wf-domain") || "";
          (/\.webflow\.io$/i.test(g) && s.hostname !== g && (p = !0),
            p &&
              !a &&
              ((d = d || f()),
              m(),
              setTimeout(m, 500),
              e(r).off(u, h).on(u, h)));
        };
        function h() {
          var p =
            r.fullScreen ||
            r.mozFullScreen ||
            r.webkitIsFullScreen ||
            r.msFullscreenElement ||
            !!r.webkitFullscreenElement;
          e(d).attr("style", p ? "display: none !important;" : "");
        }
        function m() {
          var p = i.children(o),
            g = p.length && p.get(0) === d,
            _ = Bs.env("editor");
          if (g) {
            _ && p.remove();
            return;
          }
          (p.length && p.remove(), _ || i.append(d));
        }
        return t;
      }),
    );
  });
  var Ys = c((QH, Ks) => {
    "use strict";
    var qi = We();
    qi.define(
      "edit",
      (Ks.exports = function (e, t, r) {
        if (
          ((r = r || {}),
          (qi.env("test") || qi.env("frame")) && !r.fixture && !lb())
        )
          return { exit: 1 };
        var n = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          d = r.load || m,
          h = !1;
        try {
          h =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        h
          ? d()
          : s.search
            ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
                /\?edit$/.test(s.href)) &&
              d()
            : i.on(a, f).triggerHandler(a);
        function f() {
          u || (/\?edit/.test(s.hash) && d());
        }
        function m() {
          ((u = !0),
            (window.WebflowEditor = !0),
            i.off(a, f),
            R(function (N) {
              e.ajax({
                url: w("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: p(N),
              });
            }));
        }
        function p(N) {
          return function (P) {
            if (!P) {
              console.error("Could not load editor data");
              return;
            }
            ((P.thirdPartyCookiesSupported = N),
              g(O(P.bugReporterScriptPath), function () {
                g(O(P.scriptPath), function () {
                  window.WebflowEditor(P);
                });
              }));
          };
        }
        function g(N, P) {
          e.ajax({ type: "GET", url: N, dataType: "script", cache: !0 }).then(
            P,
            _,
          );
        }
        function _(N, P, L) {
          throw (console.error("Could not load editor script: " + P), L);
        }
        function O(N) {
          return N.indexOf("//") >= 0
            ? N
            : w("https://editor-api.webflow.com" + N);
        }
        function w(N) {
          return N.replace(/([^:])\/\//g, "$1/");
        }
        function R(N) {
          var P = window.document.createElement("iframe");
          ((P.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (P.style.display = "none"),
            (P.sandbox = "allow-scripts allow-same-origin"));
          var L = function (X) {
            X.data === "WF_third_party_cookies_unsupported"
              ? (A(P, L), N(!1))
              : X.data === "WF_third_party_cookies_supported" &&
                (A(P, L), N(!0));
          };
          ((P.onerror = function () {
            (A(P, L), N(!1));
          }),
            window.addEventListener("message", L, !1),
            window.document.body.appendChild(P));
        }
        function A(N, P) {
          (window.removeEventListener("message", P, !1), N.remove());
        }
        return n;
      }),
    );
    function lb() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Qs = c((ZH, $s) => {
    "use strict";
    var fb = We();
    fb.define(
      "focus-visible",
      ($s.exports = function () {
        function e(r) {
          var n = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(A) {
            return !!(
              A &&
              A !== document &&
              A.nodeName !== "HTML" &&
              A.nodeName !== "BODY" &&
              "classList" in A &&
              "contains" in A.classList
            );
          }
          function u(A) {
            var N = A.type,
              P = A.tagName;
            return !!(
              (P === "INPUT" && s[N] && !A.readOnly) ||
              (P === "TEXTAREA" && !A.readOnly) ||
              A.isContentEditable
            );
          }
          function d(A) {
            A.getAttribute("data-wf-focus-visible") ||
              A.setAttribute("data-wf-focus-visible", "true");
          }
          function h(A) {
            A.getAttribute("data-wf-focus-visible") &&
              A.removeAttribute("data-wf-focus-visible");
          }
          function f(A) {
            A.metaKey ||
              A.altKey ||
              A.ctrlKey ||
              (a(r.activeElement) && d(r.activeElement), (n = !0));
          }
          function m() {
            n = !1;
          }
          function p(A) {
            a(A.target) && (n || u(A.target)) && d(A.target);
          }
          function g(A) {
            a(A.target) &&
              A.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              h(A.target));
          }
          function _() {
            document.visibilityState === "hidden" && (i && (n = !0), O());
          }
          function O() {
            (document.addEventListener("mousemove", R),
              document.addEventListener("mousedown", R),
              document.addEventListener("mouseup", R),
              document.addEventListener("pointermove", R),
              document.addEventListener("pointerdown", R),
              document.addEventListener("pointerup", R),
              document.addEventListener("touchmove", R),
              document.addEventListener("touchstart", R),
              document.addEventListener("touchend", R));
          }
          function w() {
            (document.removeEventListener("mousemove", R),
              document.removeEventListener("mousedown", R),
              document.removeEventListener("mouseup", R),
              document.removeEventListener("pointermove", R),
              document.removeEventListener("pointerdown", R),
              document.removeEventListener("pointerup", R),
              document.removeEventListener("touchmove", R),
              document.removeEventListener("touchstart", R),
              document.removeEventListener("touchend", R));
          }
          function R(A) {
            (A.target.nodeName && A.target.nodeName.toLowerCase() === "html") ||
              ((n = !1), w());
          }
          (document.addEventListener("keydown", f, !0),
            document.addEventListener("mousedown", m, !0),
            document.addEventListener("pointerdown", m, !0),
            document.addEventListener("touchstart", m, !0),
            document.addEventListener("visibilitychange", _, !0),
            O(),
            r.addEventListener("focus", p, !0),
            r.addEventListener("blur", g, !0));
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      }),
    );
  });
  var eu = c((JH, Js) => {
    "use strict";
    var Zs = We();
    Zs.define(
      "focus",
      (Js.exports = function () {
        var e = [],
          t = !1;
        function r(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function n(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          n(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Zs.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", r, !0),
            document.addEventListener("click", r, !0));
        }
        return { ready: o };
      }),
    );
  });
  var nu = c((eW, ru) => {
    "use strict";
    var Mi = window.jQuery,
      ot = {},
      un = [],
      tu = ".w-ix",
      cn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Mi(t).triggerHandler(ot.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Mi(t).triggerHandler(ot.types.OUTRO));
        },
      };
    ot.triggers = {};
    ot.types = { INTRO: "w-ix-intro" + tu, OUTRO: "w-ix-outro" + tu };
    ot.init = function () {
      for (var e = un.length, t = 0; t < e; t++) {
        var r = un[t];
        r[0](0, r[1]);
      }
      ((un = []), Mi.extend(ot.triggers, cn));
    };
    ot.async = function () {
      for (var e in cn) {
        var t = cn[e];
        cn.hasOwnProperty(e) &&
          (ot.triggers[e] = function (r, n) {
            un.push([t, n]);
          });
      }
    };
    ot.async();
    ru.exports = ot;
  });
  var Fi = c((tW, au) => {
    "use strict";
    var Di = nu();
    function iu(e, t) {
      var r = document.createEvent("CustomEvent");
      (r.initCustomEvent(t, !0, !0, null), e.dispatchEvent(r));
    }
    var db = window.jQuery,
      ln = {},
      ou = ".w-ix",
      pb = {
        reset: function (e, t) {
          Di.triggers.reset(e, t);
        },
        intro: function (e, t) {
          (Di.triggers.intro(e, t), iu(t, "COMPONENT_ACTIVE"));
        },
        outro: function (e, t) {
          (Di.triggers.outro(e, t), iu(t, "COMPONENT_INACTIVE"));
        },
      };
    ln.triggers = {};
    ln.types = { INTRO: "w-ix-intro" + ou, OUTRO: "w-ix-outro" + ou };
    db.extend(ln.triggers, pb);
    au.exports = ln;
  });
  var su = c((rW, dt) => {
    function Gi(e) {
      return (
        (dt.exports = Gi =
          typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (t) {
                return typeof t;
              }
            : function (t) {
                return t &&
                  typeof Symbol == "function" &&
                  t.constructor === Symbol &&
                  t !== Symbol.prototype
                  ? "symbol"
                  : typeof t;
              }),
        (dt.exports.__esModule = !0),
        (dt.exports.default = dt.exports),
        Gi(e)
      );
    }
    ((dt.exports = Gi),
      (dt.exports.__esModule = !0),
      (dt.exports.default = dt.exports));
  });
  var fn = c((nW, mr) => {
    var hb = su().default;
    function uu(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        r = new WeakMap();
      return (uu = function (i) {
        return i ? r : t;
      })(e);
    }
    function gb(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (hb(e) !== "object" && typeof e != "function"))
        return { default: e };
      var r = uu(t);
      if (r && r.has(e)) return r.get(e);
      var n = {},
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(n, o, s)
            : (n[o] = e[o]);
        }
      return ((n.default = e), r && r.set(e, n), n);
    }
    ((mr.exports = gb),
      (mr.exports.__esModule = !0),
      (mr.exports.default = mr.exports));
  });
  var cu = c((iW, Er) => {
    function vb(e) {
      return e && e.__esModule ? e : { default: e };
    }
    ((Er.exports = vb),
      (Er.exports.__esModule = !0),
      (Er.exports.default = Er.exports));
  });
  var me = c((oW, lu) => {
    var dn = function (e) {
      return e && e.Math == Math && e;
    };
    lu.exports =
      dn(typeof globalThis == "object" && globalThis) ||
      dn(typeof window == "object" && window) ||
      dn(typeof self == "object" && self) ||
      dn(typeof global == "object" && global) ||
      (function () {
        return this;
      })() ||
      Function("return this")();
  });
  var Ht = c((aW, fu) => {
    fu.exports = function (e) {
      try {
        return !!e();
      } catch {
        return !0;
      }
    };
  });
  var Ct = c((sW, du) => {
    var yb = Ht();
    du.exports = !yb(function () {
      return (
        Object.defineProperty({}, 1, {
          get: function () {
            return 7;
          },
        })[1] != 7
      );
    });
  });
  var pn = c((uW, pu) => {
    var _r = Function.prototype.call;
    pu.exports = _r.bind
      ? _r.bind(_r)
      : function () {
          return _r.apply(_r, arguments);
        };
  });
  var yu = c((vu) => {
    "use strict";
    var hu = {}.propertyIsEnumerable,
      gu = Object.getOwnPropertyDescriptor,
      mb = gu && !hu.call({ 1: 2 }, 1);
    vu.f = mb
      ? function (t) {
          var r = gu(this, t);
          return !!r && r.enumerable;
        }
      : hu;
  });
  var Vi = c((lW, mu) => {
    mu.exports = function (e, t) {
      return {
        enumerable: !(e & 1),
        configurable: !(e & 2),
        writable: !(e & 4),
        value: t,
      };
    };
  });
  var $e = c((fW, _u) => {
    var Eu = Function.prototype,
      Ui = Eu.bind,
      Hi = Eu.call,
      Eb = Ui && Ui.bind(Hi);
    _u.exports = Ui
      ? function (e) {
          return e && Eb(Hi, e);
        }
      : function (e) {
          return (
            e &&
            function () {
              return Hi.apply(e, arguments);
            }
          );
        };
  });
  var Tu = c((dW, Iu) => {
    var bu = $e(),
      _b = bu({}.toString),
      bb = bu("".slice);
    Iu.exports = function (e) {
      return bb(_b(e), 8, -1);
    };
  });
  var xu = c((pW, wu) => {
    var Ib = me(),
      Tb = $e(),
      wb = Ht(),
      xb = Tu(),
      Wi = Ib.Object,
      Ob = Tb("".split);
    wu.exports = wb(function () {
      return !Wi("z").propertyIsEnumerable(0);
    })
      ? function (e) {
          return xb(e) == "String" ? Ob(e, "") : Wi(e);
        }
      : Wi;
  });
  var ki = c((hW, Ou) => {
    var Ab = me(),
      Sb = Ab.TypeError;
    Ou.exports = function (e) {
      if (e == null) throw Sb("Can't call method on " + e);
      return e;
    };
  });
  var br = c((gW, Au) => {
    var Cb = xu(),
      Rb = ki();
    Au.exports = function (e) {
      return Cb(Rb(e));
    };
  });
  var at = c((vW, Su) => {
    Su.exports = function (e) {
      return typeof e == "function";
    };
  });
  var Wt = c((yW, Cu) => {
    var Lb = at();
    Cu.exports = function (e) {
      return typeof e == "object" ? e !== null : Lb(e);
    };
  });
  var Ir = c((mW, Ru) => {
    var Xi = me(),
      Nb = at(),
      Pb = function (e) {
        return Nb(e) ? e : void 0;
      };
    Ru.exports = function (e, t) {
      return arguments.length < 2 ? Pb(Xi[e]) : Xi[e] && Xi[e][t];
    };
  });
  var Nu = c((EW, Lu) => {
    var qb = $e();
    Lu.exports = qb({}.isPrototypeOf);
  });
  var qu = c((_W, Pu) => {
    var Mb = Ir();
    Pu.exports = Mb("navigator", "userAgent") || "";
  });
  var Hu = c((bW, Uu) => {
    var Vu = me(),
      Bi = qu(),
      Mu = Vu.process,
      Du = Vu.Deno,
      Fu = (Mu && Mu.versions) || (Du && Du.version),
      Gu = Fu && Fu.v8,
      Qe,
      hn;
    Gu &&
      ((Qe = Gu.split(".")),
      (hn = Qe[0] > 0 && Qe[0] < 4 ? 1 : +(Qe[0] + Qe[1])));
    !hn &&
      Bi &&
      ((Qe = Bi.match(/Edge\/(\d+)/)),
      (!Qe || Qe[1] >= 74) &&
        ((Qe = Bi.match(/Chrome\/(\d+)/)), Qe && (hn = +Qe[1])));
    Uu.exports = hn;
  });
  var ji = c((IW, ku) => {
    var Wu = Hu(),
      Db = Ht();
    ku.exports =
      !!Object.getOwnPropertySymbols &&
      !Db(function () {
        var e = Symbol();
        return (
          !String(e) ||
          !(Object(e) instanceof Symbol) ||
          (!Symbol.sham && Wu && Wu < 41)
        );
      });
  });
  var zi = c((TW, Xu) => {
    var Fb = ji();
    Xu.exports = Fb && !Symbol.sham && typeof Symbol.iterator == "symbol";
  });
  var Ki = c((wW, Bu) => {
    var Gb = me(),
      Vb = Ir(),
      Ub = at(),
      Hb = Nu(),
      Wb = zi(),
      kb = Gb.Object;
    Bu.exports = Wb
      ? function (e) {
          return typeof e == "symbol";
        }
      : function (e) {
          var t = Vb("Symbol");
          return Ub(t) && Hb(t.prototype, kb(e));
        };
  });
  var zu = c((xW, ju) => {
    var Xb = me(),
      Bb = Xb.String;
    ju.exports = function (e) {
      try {
        return Bb(e);
      } catch {
        return "Object";
      }
    };
  });
  var Yu = c((OW, Ku) => {
    var jb = me(),
      zb = at(),
      Kb = zu(),
      Yb = jb.TypeError;
    Ku.exports = function (e) {
      if (zb(e)) return e;
      throw Yb(Kb(e) + " is not a function");
    };
  });
  var Qu = c((AW, $u) => {
    var $b = Yu();
    $u.exports = function (e, t) {
      var r = e[t];
      return r == null ? void 0 : $b(r);
    };
  });
  var Ju = c((SW, Zu) => {
    var Qb = me(),
      Yi = pn(),
      $i = at(),
      Qi = Wt(),
      Zb = Qb.TypeError;
    Zu.exports = function (e, t) {
      var r, n;
      if (
        (t === "string" && $i((r = e.toString)) && !Qi((n = Yi(r, e)))) ||
        ($i((r = e.valueOf)) && !Qi((n = Yi(r, e)))) ||
        (t !== "string" && $i((r = e.toString)) && !Qi((n = Yi(r, e))))
      )
        return n;
      throw Zb("Can't convert object to primitive value");
    };
  });
  var tc = c((CW, ec) => {
    ec.exports = !1;
  });
  var gn = c((RW, nc) => {
    var rc = me(),
      Jb = Object.defineProperty;
    nc.exports = function (e, t) {
      try {
        Jb(rc, e, { value: t, configurable: !0, writable: !0 });
      } catch {
        rc[e] = t;
      }
      return t;
    };
  });
  var vn = c((LW, oc) => {
    var eI = me(),
      tI = gn(),
      ic = "__core-js_shared__",
      rI = eI[ic] || tI(ic, {});
    oc.exports = rI;
  });
  var Zi = c((NW, sc) => {
    var nI = tc(),
      ac = vn();
    (sc.exports = function (e, t) {
      return ac[e] || (ac[e] = t !== void 0 ? t : {});
    })("versions", []).push({
      version: "3.19.0",
      mode: nI ? "pure" : "global",
      copyright: "\xA9 2021 Denis Pushkarev (zloirock.ru)",
    });
  });
  var cc = c((PW, uc) => {
    var iI = me(),
      oI = ki(),
      aI = iI.Object;
    uc.exports = function (e) {
      return aI(oI(e));
    };
  });
  var _t = c((qW, lc) => {
    var sI = $e(),
      uI = cc(),
      cI = sI({}.hasOwnProperty);
    lc.exports =
      Object.hasOwn ||
      function (t, r) {
        return cI(uI(t), r);
      };
  });
  var Ji = c((MW, fc) => {
    var lI = $e(),
      fI = 0,
      dI = Math.random(),
      pI = lI((1).toString);
    fc.exports = function (e) {
      return "Symbol(" + (e === void 0 ? "" : e) + ")_" + pI(++fI + dI, 36);
    };
  });
  var eo = c((DW, vc) => {
    var hI = me(),
      gI = Zi(),
      dc = _t(),
      vI = Ji(),
      pc = ji(),
      gc = zi(),
      kt = gI("wks"),
      Rt = hI.Symbol,
      hc = Rt && Rt.for,
      yI = gc ? Rt : (Rt && Rt.withoutSetter) || vI;
    vc.exports = function (e) {
      if (!dc(kt, e) || !(pc || typeof kt[e] == "string")) {
        var t = "Symbol." + e;
        pc && dc(Rt, e)
          ? (kt[e] = Rt[e])
          : gc && hc
            ? (kt[e] = hc(t))
            : (kt[e] = yI(t));
      }
      return kt[e];
    };
  });
  var _c = c((FW, Ec) => {
    var mI = me(),
      EI = pn(),
      yc = Wt(),
      mc = Ki(),
      _I = Qu(),
      bI = Ju(),
      II = eo(),
      TI = mI.TypeError,
      wI = II("toPrimitive");
    Ec.exports = function (e, t) {
      if (!yc(e) || mc(e)) return e;
      var r = _I(e, wI),
        n;
      if (r) {
        if (
          (t === void 0 && (t = "default"), (n = EI(r, e, t)), !yc(n) || mc(n))
        )
          return n;
        throw TI("Can't convert object to primitive value");
      }
      return (t === void 0 && (t = "number"), bI(e, t));
    };
  });
  var to = c((GW, bc) => {
    var xI = _c(),
      OI = Ki();
    bc.exports = function (e) {
      var t = xI(e, "string");
      return OI(t) ? t : t + "";
    };
  });
  var no = c((VW, Tc) => {
    var AI = me(),
      Ic = Wt(),
      ro = AI.document,
      SI = Ic(ro) && Ic(ro.createElement);
    Tc.exports = function (e) {
      return SI ? ro.createElement(e) : {};
    };
  });
  var io = c((UW, wc) => {
    var CI = Ct(),
      RI = Ht(),
      LI = no();
    wc.exports =
      !CI &&
      !RI(function () {
        return (
          Object.defineProperty(LI("div"), "a", {
            get: function () {
              return 7;
            },
          }).a != 7
        );
      });
  });
  var oo = c((Oc) => {
    var NI = Ct(),
      PI = pn(),
      qI = yu(),
      MI = Vi(),
      DI = br(),
      FI = to(),
      GI = _t(),
      VI = io(),
      xc = Object.getOwnPropertyDescriptor;
    Oc.f = NI
      ? xc
      : function (t, r) {
          if (((t = DI(t)), (r = FI(r)), VI))
            try {
              return xc(t, r);
            } catch {}
          if (GI(t, r)) return MI(!PI(qI.f, t, r), t[r]);
        };
  });
  var Tr = c((WW, Sc) => {
    var Ac = me(),
      UI = Wt(),
      HI = Ac.String,
      WI = Ac.TypeError;
    Sc.exports = function (e) {
      if (UI(e)) return e;
      throw WI(HI(e) + " is not an object");
    };
  });
  var wr = c((Lc) => {
    var kI = me(),
      XI = Ct(),
      BI = io(),
      Cc = Tr(),
      jI = to(),
      zI = kI.TypeError,
      Rc = Object.defineProperty;
    Lc.f = XI
      ? Rc
      : function (t, r, n) {
          if ((Cc(t), (r = jI(r)), Cc(n), BI))
            try {
              return Rc(t, r, n);
            } catch {}
          if ("get" in n || "set" in n) throw zI("Accessors not supported");
          return ("value" in n && (t[r] = n.value), t);
        };
  });
  var yn = c((XW, Nc) => {
    var KI = Ct(),
      YI = wr(),
      $I = Vi();
    Nc.exports = KI
      ? function (e, t, r) {
          return YI.f(e, t, $I(1, r));
        }
      : function (e, t, r) {
          return ((e[t] = r), e);
        };
  });
  var so = c((BW, Pc) => {
    var QI = $e(),
      ZI = at(),
      ao = vn(),
      JI = QI(Function.toString);
    ZI(ao.inspectSource) ||
      (ao.inspectSource = function (e) {
        return JI(e);
      });
    Pc.exports = ao.inspectSource;
  });
  var Dc = c((jW, Mc) => {
    var eT = me(),
      tT = at(),
      rT = so(),
      qc = eT.WeakMap;
    Mc.exports = tT(qc) && /native code/.test(rT(qc));
  });
  var uo = c((zW, Gc) => {
    var nT = Zi(),
      iT = Ji(),
      Fc = nT("keys");
    Gc.exports = function (e) {
      return Fc[e] || (Fc[e] = iT(e));
    };
  });
  var mn = c((KW, Vc) => {
    Vc.exports = {};
  });
  var Bc = c((YW, Xc) => {
    var oT = Dc(),
      kc = me(),
      co = $e(),
      aT = Wt(),
      sT = yn(),
      lo = _t(),
      fo = vn(),
      uT = uo(),
      cT = mn(),
      Uc = "Object already initialized",
      ho = kc.TypeError,
      lT = kc.WeakMap,
      En,
      xr,
      _n,
      fT = function (e) {
        return _n(e) ? xr(e) : En(e, {});
      },
      dT = function (e) {
        return function (t) {
          var r;
          if (!aT(t) || (r = xr(t)).type !== e)
            throw ho("Incompatible receiver, " + e + " required");
          return r;
        };
      };
    oT || fo.state
      ? ((bt = fo.state || (fo.state = new lT())),
        (Hc = co(bt.get)),
        (po = co(bt.has)),
        (Wc = co(bt.set)),
        (En = function (e, t) {
          if (po(bt, e)) throw new ho(Uc);
          return ((t.facade = e), Wc(bt, e, t), t);
        }),
        (xr = function (e) {
          return Hc(bt, e) || {};
        }),
        (_n = function (e) {
          return po(bt, e);
        }))
      : ((Lt = uT("state")),
        (cT[Lt] = !0),
        (En = function (e, t) {
          if (lo(e, Lt)) throw new ho(Uc);
          return ((t.facade = e), sT(e, Lt, t), t);
        }),
        (xr = function (e) {
          return lo(e, Lt) ? e[Lt] : {};
        }),
        (_n = function (e) {
          return lo(e, Lt);
        }));
    var bt, Hc, po, Wc, Lt;
    Xc.exports = { set: En, get: xr, has: _n, enforce: fT, getterFor: dT };
  });
  var Kc = c(($W, zc) => {
    var go = Ct(),
      pT = _t(),
      jc = Function.prototype,
      hT = go && Object.getOwnPropertyDescriptor,
      vo = pT(jc, "name"),
      gT = vo && function () {}.name === "something",
      vT = vo && (!go || (go && hT(jc, "name").configurable));
    zc.exports = { EXISTS: vo, PROPER: gT, CONFIGURABLE: vT };
  });
  var Jc = c((QW, Zc) => {
    var yT = me(),
      Yc = at(),
      mT = _t(),
      $c = yn(),
      ET = gn(),
      _T = so(),
      Qc = Bc(),
      bT = Kc().CONFIGURABLE,
      IT = Qc.get,
      TT = Qc.enforce,
      wT = String(String).split("String");
    (Zc.exports = function (e, t, r, n) {
      var i = n ? !!n.unsafe : !1,
        o = n ? !!n.enumerable : !1,
        s = n ? !!n.noTargetGet : !1,
        a = n && n.name !== void 0 ? n.name : t,
        u;
      if (
        (Yc(r) &&
          (String(a).slice(0, 7) === "Symbol(" &&
            (a = "[" + String(a).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
          (!mT(r, "name") || (bT && r.name !== a)) && $c(r, "name", a),
          (u = TT(r)),
          u.source || (u.source = wT.join(typeof a == "string" ? a : ""))),
        e === yT)
      ) {
        o ? (e[t] = r) : ET(t, r);
        return;
      } else i ? !s && e[t] && (o = !0) : delete e[t];
      o ? (e[t] = r) : $c(e, t, r);
    })(Function.prototype, "toString", function () {
      return (Yc(this) && IT(this).source) || _T(this);
    });
  });
  var yo = c((ZW, el) => {
    var xT = Math.ceil,
      OT = Math.floor;
    el.exports = function (e) {
      var t = +e;
      return t !== t || t === 0 ? 0 : (t > 0 ? OT : xT)(t);
    };
  });
  var rl = c((JW, tl) => {
    var AT = yo(),
      ST = Math.max,
      CT = Math.min;
    tl.exports = function (e, t) {
      var r = AT(e);
      return r < 0 ? ST(r + t, 0) : CT(r, t);
    };
  });
  var il = c((ek, nl) => {
    var RT = yo(),
      LT = Math.min;
    nl.exports = function (e) {
      return e > 0 ? LT(RT(e), 9007199254740991) : 0;
    };
  });
  var al = c((tk, ol) => {
    var NT = il();
    ol.exports = function (e) {
      return NT(e.length);
    };
  });
  var mo = c((rk, ul) => {
    var PT = br(),
      qT = rl(),
      MT = al(),
      sl = function (e) {
        return function (t, r, n) {
          var i = PT(t),
            o = MT(i),
            s = qT(n, o),
            a;
          if (e && r != r) {
            for (; o > s; ) if (((a = i[s++]), a != a)) return !0;
          } else
            for (; o > s; s++)
              if ((e || s in i) && i[s] === r) return e || s || 0;
          return !e && -1;
        };
      };
    ul.exports = { includes: sl(!0), indexOf: sl(!1) };
  });
  var _o = c((nk, ll) => {
    var DT = $e(),
      Eo = _t(),
      FT = br(),
      GT = mo().indexOf,
      VT = mn(),
      cl = DT([].push);
    ll.exports = function (e, t) {
      var r = FT(e),
        n = 0,
        i = [],
        o;
      for (o in r) !Eo(VT, o) && Eo(r, o) && cl(i, o);
      for (; t.length > n; ) Eo(r, (o = t[n++])) && (~GT(i, o) || cl(i, o));
      return i;
    };
  });
  var bn = c((ik, fl) => {
    fl.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];
  });
  var pl = c((dl) => {
    var UT = _o(),
      HT = bn(),
      WT = HT.concat("length", "prototype");
    dl.f =
      Object.getOwnPropertyNames ||
      function (t) {
        return UT(t, WT);
      };
  });
  var gl = c((hl) => {
    hl.f = Object.getOwnPropertySymbols;
  });
  var yl = c((sk, vl) => {
    var kT = Ir(),
      XT = $e(),
      BT = pl(),
      jT = gl(),
      zT = Tr(),
      KT = XT([].concat);
    vl.exports =
      kT("Reflect", "ownKeys") ||
      function (t) {
        var r = BT.f(zT(t)),
          n = jT.f;
        return n ? KT(r, n(t)) : r;
      };
  });
  var El = c((uk, ml) => {
    var YT = _t(),
      $T = yl(),
      QT = oo(),
      ZT = wr();
    ml.exports = function (e, t) {
      for (var r = $T(t), n = ZT.f, i = QT.f, o = 0; o < r.length; o++) {
        var s = r[o];
        YT(e, s) || n(e, s, i(t, s));
      }
    };
  });
  var bl = c((ck, _l) => {
    var JT = Ht(),
      ew = at(),
      tw = /#|\.prototype\./,
      Or = function (e, t) {
        var r = nw[rw(e)];
        return r == ow ? !0 : r == iw ? !1 : ew(t) ? JT(t) : !!t;
      },
      rw = (Or.normalize = function (e) {
        return String(e).replace(tw, ".").toLowerCase();
      }),
      nw = (Or.data = {}),
      iw = (Or.NATIVE = "N"),
      ow = (Or.POLYFILL = "P");
    _l.exports = Or;
  });
  var Tl = c((lk, Il) => {
    var bo = me(),
      aw = oo().f,
      sw = yn(),
      uw = Jc(),
      cw = gn(),
      lw = El(),
      fw = bl();
    Il.exports = function (e, t) {
      var r = e.target,
        n = e.global,
        i = e.stat,
        o,
        s,
        a,
        u,
        d,
        h;
      if (
        (n
          ? (s = bo)
          : i
            ? (s = bo[r] || cw(r, {}))
            : (s = (bo[r] || {}).prototype),
        s)
      )
        for (a in t) {
          if (
            ((d = t[a]),
            e.noTargetGet ? ((h = aw(s, a)), (u = h && h.value)) : (u = s[a]),
            (o = fw(n ? a : r + (i ? "." : "#") + a, e.forced)),
            !o && u !== void 0)
          ) {
            if (typeof d == typeof u) continue;
            lw(d, u);
          }
          ((e.sham || (u && u.sham)) && sw(d, "sham", !0), uw(s, a, d, e));
        }
    };
  });
  var xl = c((fk, wl) => {
    var dw = _o(),
      pw = bn();
    wl.exports =
      Object.keys ||
      function (t) {
        return dw(t, pw);
      };
  });
  var Al = c((dk, Ol) => {
    var hw = Ct(),
      gw = wr(),
      vw = Tr(),
      yw = br(),
      mw = xl();
    Ol.exports = hw
      ? Object.defineProperties
      : function (t, r) {
          vw(t);
          for (var n = yw(r), i = mw(r), o = i.length, s = 0, a; o > s; )
            gw.f(t, (a = i[s++]), n[a]);
          return t;
        };
  });
  var Cl = c((pk, Sl) => {
    var Ew = Ir();
    Sl.exports = Ew("document", "documentElement");
  });
  var Fl = c((hk, Dl) => {
    var _w = Tr(),
      bw = Al(),
      Rl = bn(),
      Iw = mn(),
      Tw = Cl(),
      ww = no(),
      xw = uo(),
      Ll = ">",
      Nl = "<",
      To = "prototype",
      wo = "script",
      ql = xw("IE_PROTO"),
      Io = function () {},
      Ml = function (e) {
        return Nl + wo + Ll + e + Nl + "/" + wo + Ll;
      },
      Pl = function (e) {
        (e.write(Ml("")), e.close());
        var t = e.parentWindow.Object;
        return ((e = null), t);
      },
      Ow = function () {
        var e = ww("iframe"),
          t = "java" + wo + ":",
          r;
        return (
          (e.style.display = "none"),
          Tw.appendChild(e),
          (e.src = String(t)),
          (r = e.contentWindow.document),
          r.open(),
          r.write(Ml("document.F=Object")),
          r.close(),
          r.F
        );
      },
      In,
      Tn = function () {
        try {
          In = new ActiveXObject("htmlfile");
        } catch {}
        Tn =
          typeof document < "u"
            ? document.domain && In
              ? Pl(In)
              : Ow()
            : Pl(In);
        for (var e = Rl.length; e--; ) delete Tn[To][Rl[e]];
        return Tn();
      };
    Iw[ql] = !0;
    Dl.exports =
      Object.create ||
      function (t, r) {
        var n;
        return (
          t !== null
            ? ((Io[To] = _w(t)), (n = new Io()), (Io[To] = null), (n[ql] = t))
            : (n = Tn()),
          r === void 0 ? n : bw(n, r)
        );
      };
  });
  var Vl = c((gk, Gl) => {
    var Aw = eo(),
      Sw = Fl(),
      Cw = wr(),
      xo = Aw("unscopables"),
      Oo = Array.prototype;
    Oo[xo] == null && Cw.f(Oo, xo, { configurable: !0, value: Sw(null) });
    Gl.exports = function (e) {
      Oo[xo][e] = !0;
    };
  });
  var Ul = c(() => {
    "use strict";
    var Rw = Tl(),
      Lw = mo().includes,
      Nw = Vl();
    Rw(
      { target: "Array", proto: !0 },
      {
        includes: function (t) {
          return Lw(this, t, arguments.length > 1 ? arguments[1] : void 0);
        },
      },
    );
    Nw("includes");
  });
  var Wl = c((mk, Hl) => {
    var Pw = me(),
      qw = $e();
    Hl.exports = function (e, t) {
      return qw(Pw[e].prototype[t]);
    };
  });
  var Xl = c((Ek, kl) => {
    Ul();
    var Mw = Wl();
    kl.exports = Mw("Array", "includes");
  });
  var jl = c((_k, Bl) => {
    var Dw = Xl();
    Bl.exports = Dw;
  });
  var Kl = c((bk, zl) => {
    var Fw = jl();
    zl.exports = Fw;
  });
  var Ao = c((Ik, Yl) => {
    var Gw =
      typeof global == "object" && global && global.Object === Object && global;
    Yl.exports = Gw;
  });
  var Ze = c((Tk, $l) => {
    var Vw = Ao(),
      Uw = typeof self == "object" && self && self.Object === Object && self,
      Hw = Vw || Uw || Function("return this")();
    $l.exports = Hw;
  });
  var Xt = c((wk, Ql) => {
    var Ww = Ze(),
      kw = Ww.Symbol;
    Ql.exports = kw;
  });
  var tf = c((xk, ef) => {
    var Zl = Xt(),
      Jl = Object.prototype,
      Xw = Jl.hasOwnProperty,
      Bw = Jl.toString,
      Ar = Zl ? Zl.toStringTag : void 0;
    function jw(e) {
      var t = Xw.call(e, Ar),
        r = e[Ar];
      try {
        e[Ar] = void 0;
        var n = !0;
      } catch {}
      var i = Bw.call(e);
      return (n && (t ? (e[Ar] = r) : delete e[Ar]), i);
    }
    ef.exports = jw;
  });
  var nf = c((Ok, rf) => {
    var zw = Object.prototype,
      Kw = zw.toString;
    function Yw(e) {
      return Kw.call(e);
    }
    rf.exports = Yw;
  });
  var It = c((Ak, sf) => {
    var of = Xt(),
      $w = tf(),
      Qw = nf(),
      Zw = "[object Null]",
      Jw = "[object Undefined]",
      af = of ? of.toStringTag : void 0;
    function ex(e) {
      return e == null
        ? e === void 0
          ? Jw
          : Zw
        : af && af in Object(e)
          ? $w(e)
          : Qw(e);
    }
    sf.exports = ex;
  });
  var So = c((Sk, uf) => {
    function tx(e, t) {
      return function (r) {
        return e(t(r));
      };
    }
    uf.exports = tx;
  });
  var Co = c((Ck, cf) => {
    var rx = So(),
      nx = rx(Object.getPrototypeOf, Object);
    cf.exports = nx;
  });
  var pt = c((Rk, lf) => {
    function ix(e) {
      return e != null && typeof e == "object";
    }
    lf.exports = ix;
  });
  var Ro = c((Lk, df) => {
    var ox = It(),
      ax = Co(),
      sx = pt(),
      ux = "[object Object]",
      cx = Function.prototype,
      lx = Object.prototype,
      ff = cx.toString,
      fx = lx.hasOwnProperty,
      dx = ff.call(Object);
    function px(e) {
      if (!sx(e) || ox(e) != ux) return !1;
      var t = ax(e);
      if (t === null) return !0;
      var r = fx.call(t, "constructor") && t.constructor;
      return typeof r == "function" && r instanceof r && ff.call(r) == dx;
    }
    df.exports = px;
  });
  var pf = c((Lo) => {
    "use strict";
    Object.defineProperty(Lo, "__esModule", { value: !0 });
    Lo.default = hx;
    function hx(e) {
      var t,
        r = e.Symbol;
      return (
        typeof r == "function"
          ? r.observable
            ? (t = r.observable)
            : ((t = r("observable")), (r.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var hf = c((Po, No) => {
    "use strict";
    Object.defineProperty(Po, "__esModule", { value: !0 });
    var gx = pf(),
      vx = yx(gx);
    function yx(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var Bt;
    typeof self < "u"
      ? (Bt = self)
      : typeof window < "u"
        ? (Bt = window)
        : typeof global < "u"
          ? (Bt = global)
          : typeof No < "u"
            ? (Bt = No)
            : (Bt = Function("return this")());
    var mx = (0, vx.default)(Bt);
    Po.default = mx;
  });
  var qo = c((Sr) => {
    "use strict";
    Sr.__esModule = !0;
    Sr.ActionTypes = void 0;
    Sr.default = mf;
    var Ex = Ro(),
      _x = yf(Ex),
      bx = hf(),
      gf = yf(bx);
    function yf(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var vf = (Sr.ActionTypes = { INIT: "@@redux/INIT" });
    function mf(e, t, r) {
      var n;
      if (
        (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
        typeof r < "u")
      ) {
        if (typeof r != "function")
          throw new Error("Expected the enhancer to be a function.");
        return r(mf)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function d() {
        a === s && (a = s.slice());
      }
      function h() {
        return o;
      }
      function f(_) {
        if (typeof _ != "function")
          throw new Error("Expected listener to be a function.");
        var O = !0;
        return (
          d(),
          a.push(_),
          function () {
            if (O) {
              ((O = !1), d());
              var R = a.indexOf(_);
              a.splice(R, 1);
            }
          }
        );
      }
      function m(_) {
        if (!(0, _x.default)(_))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions.",
          );
        if (typeof _.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?',
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          ((u = !0), (o = i(o, _)));
        } finally {
          u = !1;
        }
        for (var O = (s = a), w = 0; w < O.length; w++) O[w]();
        return _;
      }
      function p(_) {
        if (typeof _ != "function")
          throw new Error("Expected the nextReducer to be a function.");
        ((i = _), m({ type: vf.INIT }));
      }
      function g() {
        var _,
          O = f;
        return (
          (_ = {
            subscribe: function (R) {
              if (typeof R != "object")
                throw new TypeError("Expected the observer to be an object.");
              function A() {
                R.next && R.next(h());
              }
              A();
              var N = O(A);
              return { unsubscribe: N };
            },
          }),
          (_[gf.default] = function () {
            return this;
          }),
          _
        );
      }
      return (
        m({ type: vf.INIT }),
        (n = { dispatch: m, subscribe: f, getState: h, replaceReducer: p }),
        (n[gf.default] = g),
        n
      );
    }
  });
  var Do = c((Mo) => {
    "use strict";
    Mo.__esModule = !0;
    Mo.default = Ix;
    function Ix(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var bf = c((Fo) => {
    "use strict";
    Fo.__esModule = !0;
    Fo.default = Ax;
    var Ef = qo(),
      Tx = Ro(),
      Mk = _f(Tx),
      wx = Do(),
      Dk = _f(wx);
    function _f(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function xx(e, t) {
      var r = t && t.type,
        n = (r && '"' + r.toString() + '"') || "an action";
      return (
        "Given action " +
        n +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Ox(e) {
      Object.keys(e).forEach(function (t) {
        var r = e[t],
          n = r(void 0, { type: Ef.ActionTypes.INIT });
        if (typeof n > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.',
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof r(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                Ef.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.",
          );
      });
    }
    function Ax(e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        typeof e[i] == "function" && (r[i] = e[i]);
      }
      var o = Object.keys(r);
      if (!1) var s;
      var a;
      try {
        Ox(r);
      } catch (u) {
        a = u;
      }
      return function () {
        var d =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          h = arguments[1];
        if (a) throw a;
        if (!1) var f;
        for (var m = !1, p = {}, g = 0; g < o.length; g++) {
          var _ = o[g],
            O = r[_],
            w = d[_],
            R = O(w, h);
          if (typeof R > "u") {
            var A = xx(_, h);
            throw new Error(A);
          }
          ((p[_] = R), (m = m || R !== w));
        }
        return m ? p : d;
      };
    }
  });
  var Tf = c((Go) => {
    "use strict";
    Go.__esModule = !0;
    Go.default = Sx;
    function If(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Sx(e, t) {
      if (typeof e == "function") return If(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?',
        );
      for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
        var o = r[i],
          s = e[o];
        typeof s == "function" && (n[o] = If(s, t));
      }
      return n;
    }
  });
  var Uo = c((Vo) => {
    "use strict";
    Vo.__esModule = !0;
    Vo.default = Cx;
    function Cx() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var n = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(
          function (o, s) {
            return s(o);
          },
          n.apply(void 0, arguments),
        );
      };
    }
  });
  var wf = c((Ho) => {
    "use strict";
    Ho.__esModule = !0;
    var Rx =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = arguments[t];
          for (var n in r)
            Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
        }
        return e;
      };
    Ho.default = qx;
    var Lx = Uo(),
      Nx = Px(Lx);
    function Px(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function qx() {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
        t[r] = arguments[r];
      return function (n) {
        return function (i, o, s) {
          var a = n(i, o, s),
            u = a.dispatch,
            d = [],
            h = {
              getState: a.getState,
              dispatch: function (m) {
                return u(m);
              },
            };
          return (
            (d = t.map(function (f) {
              return f(h);
            })),
            (u = Nx.default.apply(void 0, d)(a.dispatch)),
            Rx({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Wo = c((ke) => {
    "use strict";
    ke.__esModule = !0;
    ke.compose =
      ke.applyMiddleware =
      ke.bindActionCreators =
      ke.combineReducers =
      ke.createStore =
        void 0;
    var Mx = qo(),
      Dx = jt(Mx),
      Fx = bf(),
      Gx = jt(Fx),
      Vx = Tf(),
      Ux = jt(Vx),
      Hx = wf(),
      Wx = jt(Hx),
      kx = Uo(),
      Xx = jt(kx),
      Bx = Do(),
      Hk = jt(Bx);
    function jt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    ke.createStore = Dx.default;
    ke.combineReducers = Gx.default;
    ke.bindActionCreators = Ux.default;
    ke.applyMiddleware = Wx.default;
    ke.compose = Xx.default;
  });
  var Je,
    ko,
    st,
    jx,
    zx,
    Xo,
    Kx,
    xf = ye(() => {
      "use strict";
      ((Je = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (ko = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (st = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (jx = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (zx = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Xo = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (Kx = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        }));
    });
  var Xe,
    Yx,
    Bo = ye(() => {
      "use strict";
      ((Xe = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (Yx = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        }));
    });
  var $x,
    Of = ye(() => {
      "use strict";
      $x = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var Qx,
    Zx,
    Jx,
    eO,
    tO,
    rO,
    nO,
    jo,
    Af = ye(() => {
      "use strict";
      Bo();
      (({
        TRANSFORM_MOVE: Qx,
        TRANSFORM_SCALE: Zx,
        TRANSFORM_ROTATE: Jx,
        TRANSFORM_SKEW: eO,
        STYLE_SIZE: tO,
        STYLE_FILTER: rO,
        STYLE_FONT_VARIATION: nO,
      } = Xe),
        (jo = {
          [Qx]: !0,
          [Zx]: !0,
          [Jx]: !0,
          [eO]: !0,
          [tO]: !0,
          [rO]: !0,
          [nO]: !0,
        }));
    });
  var we = {};
  Ge(we, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => _O,
    IX2_ANIMATION_FRAME_CHANGED: () => hO,
    IX2_CLEAR_REQUESTED: () => fO,
    IX2_ELEMENT_STATE_CHANGED: () => EO,
    IX2_EVENT_LISTENER_ADDED: () => dO,
    IX2_EVENT_STATE_CHANGED: () => pO,
    IX2_INSTANCE_ADDED: () => vO,
    IX2_INSTANCE_REMOVED: () => mO,
    IX2_INSTANCE_STARTED: () => yO,
    IX2_MEDIA_QUERIES_DEFINED: () => IO,
    IX2_PARAMETER_CHANGED: () => gO,
    IX2_PLAYBACK_REQUESTED: () => cO,
    IX2_PREVIEW_REQUESTED: () => uO,
    IX2_RAW_DATA_IMPORTED: () => iO,
    IX2_SESSION_INITIALIZED: () => oO,
    IX2_SESSION_STARTED: () => aO,
    IX2_SESSION_STOPPED: () => sO,
    IX2_STOP_REQUESTED: () => lO,
    IX2_TEST_FRAME_RENDERED: () => TO,
    IX2_VIEWPORT_WIDTH_CHANGED: () => bO,
  });
  var iO,
    oO,
    aO,
    sO,
    uO,
    cO,
    lO,
    fO,
    dO,
    pO,
    hO,
    gO,
    vO,
    yO,
    mO,
    EO,
    _O,
    bO,
    IO,
    TO,
    Sf = ye(() => {
      "use strict";
      ((iO = "IX2_RAW_DATA_IMPORTED"),
        (oO = "IX2_SESSION_INITIALIZED"),
        (aO = "IX2_SESSION_STARTED"),
        (sO = "IX2_SESSION_STOPPED"),
        (uO = "IX2_PREVIEW_REQUESTED"),
        (cO = "IX2_PLAYBACK_REQUESTED"),
        (lO = "IX2_STOP_REQUESTED"),
        (fO = "IX2_CLEAR_REQUESTED"),
        (dO = "IX2_EVENT_LISTENER_ADDED"),
        (pO = "IX2_EVENT_STATE_CHANGED"),
        (hO = "IX2_ANIMATION_FRAME_CHANGED"),
        (gO = "IX2_PARAMETER_CHANGED"),
        (vO = "IX2_INSTANCE_ADDED"),
        (yO = "IX2_INSTANCE_STARTED"),
        (mO = "IX2_INSTANCE_REMOVED"),
        (EO = "IX2_ELEMENT_STATE_CHANGED"),
        (_O = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (bO = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (IO = "IX2_MEDIA_QUERIES_DEFINED"),
        (TO = "IX2_TEST_FRAME_RENDERED"));
    });
  var Re = {};
  Ge(Re, {
    ABSTRACT_NODE: () => bA,
    AUTO: () => lA,
    BACKGROUND: () => iA,
    BACKGROUND_COLOR: () => nA,
    BAR_DELIMITER: () => pA,
    BORDER_COLOR: () => oA,
    BOUNDARY_SELECTOR: () => SO,
    CHILDREN: () => hA,
    COLON_DELIMITER: () => dA,
    COLOR: () => aA,
    COMMA_DELIMITER: () => fA,
    CONFIG_UNIT: () => DO,
    CONFIG_VALUE: () => NO,
    CONFIG_X_UNIT: () => PO,
    CONFIG_X_VALUE: () => CO,
    CONFIG_Y_UNIT: () => qO,
    CONFIG_Y_VALUE: () => RO,
    CONFIG_Z_UNIT: () => MO,
    CONFIG_Z_VALUE: () => LO,
    DISPLAY: () => sA,
    FILTER: () => JO,
    FLEX: () => uA,
    FONT_VARIATION_SETTINGS: () => eA,
    HEIGHT: () => rA,
    HTML_ELEMENT: () => EA,
    IMMEDIATE_CHILDREN: () => gA,
    IX2_ID_DELIMITER: () => wO,
    OPACITY: () => ZO,
    PARENT: () => yA,
    PLAIN_OBJECT: () => _A,
    PRESERVE_3D: () => mA,
    RENDER_GENERAL: () => TA,
    RENDER_PLUGIN: () => xA,
    RENDER_STYLE: () => wA,
    RENDER_TRANSFORM: () => IA,
    ROTATE_X: () => jO,
    ROTATE_Y: () => zO,
    ROTATE_Z: () => KO,
    SCALE_3D: () => BO,
    SCALE_X: () => WO,
    SCALE_Y: () => kO,
    SCALE_Z: () => XO,
    SIBLINGS: () => vA,
    SKEW: () => YO,
    SKEW_X: () => $O,
    SKEW_Y: () => QO,
    TRANSFORM: () => FO,
    TRANSLATE_3D: () => HO,
    TRANSLATE_X: () => GO,
    TRANSLATE_Y: () => VO,
    TRANSLATE_Z: () => UO,
    WF_PAGE: () => xO,
    WIDTH: () => tA,
    WILL_CHANGE: () => cA,
    W_MOD_IX: () => AO,
    W_MOD_JS: () => OO,
  });
  var wO,
    xO,
    OO,
    AO,
    SO,
    CO,
    RO,
    LO,
    NO,
    PO,
    qO,
    MO,
    DO,
    FO,
    GO,
    VO,
    UO,
    HO,
    WO,
    kO,
    XO,
    BO,
    jO,
    zO,
    KO,
    YO,
    $O,
    QO,
    ZO,
    JO,
    eA,
    tA,
    rA,
    nA,
    iA,
    oA,
    aA,
    sA,
    uA,
    cA,
    lA,
    fA,
    dA,
    pA,
    hA,
    gA,
    vA,
    yA,
    mA,
    EA,
    _A,
    bA,
    IA,
    TA,
    wA,
    xA,
    Cf = ye(() => {
      "use strict";
      ((wO = "|"),
        (xO = "data-wf-page"),
        (OO = "w-mod-js"),
        (AO = "w-mod-ix"),
        (SO = ".w-dyn-item"),
        (CO = "xValue"),
        (RO = "yValue"),
        (LO = "zValue"),
        (NO = "value"),
        (PO = "xUnit"),
        (qO = "yUnit"),
        (MO = "zUnit"),
        (DO = "unit"),
        (FO = "transform"),
        (GO = "translateX"),
        (VO = "translateY"),
        (UO = "translateZ"),
        (HO = "translate3d"),
        (WO = "scaleX"),
        (kO = "scaleY"),
        (XO = "scaleZ"),
        (BO = "scale3d"),
        (jO = "rotateX"),
        (zO = "rotateY"),
        (KO = "rotateZ"),
        (YO = "skew"),
        ($O = "skewX"),
        (QO = "skewY"),
        (ZO = "opacity"),
        (JO = "filter"),
        (eA = "font-variation-settings"),
        (tA = "width"),
        (rA = "height"),
        (nA = "backgroundColor"),
        (iA = "background"),
        (oA = "borderColor"),
        (aA = "color"),
        (sA = "display"),
        (uA = "flex"),
        (cA = "willChange"),
        (lA = "AUTO"),
        (fA = ","),
        (dA = ":"),
        (pA = "|"),
        (hA = "CHILDREN"),
        (gA = "IMMEDIATE_CHILDREN"),
        (vA = "SIBLINGS"),
        (yA = "PARENT"),
        (mA = "preserve-3d"),
        (EA = "HTML_ELEMENT"),
        (_A = "PLAIN_OBJECT"),
        (bA = "ABSTRACT_NODE"),
        (IA = "RENDER_TRANSFORM"),
        (TA = "RENDER_GENERAL"),
        (wA = "RENDER_STYLE"),
        (xA = "RENDER_PLUGIN"));
    });
  var Rf = {};
  Ge(Rf, {
    ActionAppliesTo: () => Yx,
    ActionTypeConsts: () => Xe,
    EventAppliesTo: () => ko,
    EventBasedOn: () => st,
    EventContinuousMouseAxes: () => jx,
    EventLimitAffectedElements: () => zx,
    EventTypeConsts: () => Je,
    IX2EngineActionTypes: () => we,
    IX2EngineConstants: () => Re,
    InteractionTypeConsts: () => $x,
    QuickEffectDirectionConsts: () => Kx,
    QuickEffectIds: () => Xo,
    ReducedMotionTypes: () => jo,
  });
  var Ve = ye(() => {
    "use strict";
    xf();
    Bo();
    Of();
    Af();
    Sf();
    Cf();
  });
  var OA,
    Lf,
    Nf = ye(() => {
      "use strict";
      Ve();
      (({ IX2_RAW_DATA_IMPORTED: OA } = we),
        (Lf = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case OA:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        }));
    });
  var zt = c((_e) => {
    "use strict";
    Object.defineProperty(_e, "__esModule", { value: !0 });
    var AA =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    _e.clone = xn;
    _e.addLast = Mf;
    _e.addFirst = Df;
    _e.removeLast = Ff;
    _e.removeFirst = Gf;
    _e.insert = Vf;
    _e.removeAt = Uf;
    _e.replaceAt = Hf;
    _e.getIn = On;
    _e.set = An;
    _e.setIn = Sn;
    _e.update = kf;
    _e.updateIn = Xf;
    _e.merge = Bf;
    _e.mergeDeep = jf;
    _e.mergeIn = zf;
    _e.omit = Kf;
    _e.addDefaults = Yf;
    var Pf = "INVALID_ARGS";
    function qf(e) {
      throw new Error(e);
    }
    function zo(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var SA = {}.hasOwnProperty;
    function xn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = zo(e), r = {}, n = 0; n < t.length; n++) {
        var i = t[n];
        r[i] = e[i];
      }
      return r;
    }
    function Ue(e, t, r) {
      var n = r;
      n == null && qf(Pf);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var d = s[u];
        if (d != null) {
          var h = zo(d);
          if (h.length)
            for (var f = 0; f <= h.length; f++) {
              var m = h[f];
              if (!(e && n[m] !== void 0)) {
                var p = d[m];
                (t && wn(n[m]) && wn(p) && (p = Ue(e, t, n[m], p)),
                  !(p === void 0 || p === n[m]) &&
                    (i || ((i = !0), (n = xn(n))), (n[m] = p)));
              }
            }
        }
      }
      return n;
    }
    function wn(e) {
      var t = typeof e > "u" ? "undefined" : AA(e);
      return e != null && (t === "object" || t === "function");
    }
    function Mf(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function Df(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function Ff(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Gf(e) {
      return e.length ? e.slice(1) : e;
    }
    function Vf(e, t, r) {
      return e
        .slice(0, t)
        .concat(Array.isArray(r) ? r : [r])
        .concat(e.slice(t));
    }
    function Uf(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Hf(e, t, r) {
      if (e[t] === r) return e;
      for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
      return ((i[t] = r), i);
    }
    function On(e, t) {
      if ((!Array.isArray(t) && qf(Pf), e != null)) {
        for (var r = e, n = 0; n < t.length; n++) {
          var i = t[n];
          if (((r = r?.[i]), r === void 0)) return r;
        }
        return r;
      }
    }
    function An(e, t, r) {
      var n = typeof t == "number" ? [] : {},
        i = e ?? n;
      if (i[t] === r) return i;
      var o = xn(i);
      return ((o[t] = r), o);
    }
    function Wf(e, t, r, n) {
      var i = void 0,
        o = t[n];
      if (n === t.length - 1) i = r;
      else {
        var s =
          wn(e) && wn(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
        i = Wf(s, t, r, n + 1);
      }
      return An(e, o, i);
    }
    function Sn(e, t, r) {
      return t.length ? Wf(e, t, r, 0) : r;
    }
    function kf(e, t, r) {
      var n = e?.[t],
        i = r(n);
      return An(e, t, i);
    }
    function Xf(e, t, r) {
      var n = On(e, t),
        i = r(n);
      return Sn(e, t, i);
    }
    function Bf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ue.call.apply(Ue, [null, !1, !1, e, t, r, n, i, o].concat(a))
        : Ue(!1, !1, e, t, r, n, i, o);
    }
    function jf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ue.call.apply(Ue, [null, !1, !0, e, t, r, n, i, o].concat(a))
        : Ue(!1, !0, e, t, r, n, i, o);
    }
    function zf(e, t, r, n, i, o, s) {
      var a = On(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          d = arguments.length,
          h = Array(d > 7 ? d - 7 : 0),
          f = 7;
        f < d;
        f++
      )
        h[f - 7] = arguments[f];
      return (
        h.length
          ? (u = Ue.call.apply(Ue, [null, !1, !1, a, r, n, i, o, s].concat(h)))
          : (u = Ue(!1, !1, a, r, n, i, o, s)),
        Sn(e, t, u)
      );
    }
    function Kf(e, t) {
      for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
        if (SA.call(e, r[i])) {
          n = !0;
          break;
        }
      if (!n) return e;
      for (var o = {}, s = zo(e), a = 0; a < s.length; a++) {
        var u = s[a];
        r.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function Yf(e, t, r, n, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Ue.call.apply(Ue, [null, !0, !1, e, t, r, n, i, o].concat(a))
        : Ue(!0, !1, e, t, r, n, i, o);
    }
    var CA = {
      clone: xn,
      addLast: Mf,
      addFirst: Df,
      removeLast: Ff,
      removeFirst: Gf,
      insert: Vf,
      removeAt: Uf,
      replaceAt: Hf,
      getIn: On,
      set: An,
      setIn: Sn,
      update: kf,
      updateIn: Xf,
      merge: Bf,
      mergeDeep: jf,
      mergeIn: zf,
      omit: Kf,
      addDefaults: Yf,
    };
    _e.default = CA;
  });
  var Qf,
    RA,
    LA,
    NA,
    PA,
    qA,
    $f,
    Zf,
    Jf = ye(() => {
      "use strict";
      Ve();
      ((Qf = fe(zt())),
        ({
          IX2_PREVIEW_REQUESTED: RA,
          IX2_PLAYBACK_REQUESTED: LA,
          IX2_STOP_REQUESTED: NA,
          IX2_CLEAR_REQUESTED: PA,
        } = we),
        (qA = { preview: {}, playback: {}, stop: {}, clear: {} }),
        ($f = Object.create(null, {
          [RA]: { value: "preview" },
          [LA]: { value: "playback" },
          [NA]: { value: "stop" },
          [PA]: { value: "clear" },
        })),
        (Zf = (e = qA, t) => {
          if (t.type in $f) {
            let r = [$f[t.type]];
            return (0, Qf.setIn)(e, [r], { ...t.payload });
          }
          return e;
        }));
    });
  var Pe,
    MA,
    DA,
    FA,
    GA,
    VA,
    UA,
    HA,
    WA,
    kA,
    XA,
    ed,
    BA,
    td,
    rd = ye(() => {
      "use strict";
      Ve();
      ((Pe = fe(zt())),
        ({
          IX2_SESSION_INITIALIZED: MA,
          IX2_SESSION_STARTED: DA,
          IX2_TEST_FRAME_RENDERED: FA,
          IX2_SESSION_STOPPED: GA,
          IX2_EVENT_LISTENER_ADDED: VA,
          IX2_EVENT_STATE_CHANGED: UA,
          IX2_ANIMATION_FRAME_CHANGED: HA,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: WA,
          IX2_VIEWPORT_WIDTH_CHANGED: kA,
          IX2_MEDIA_QUERIES_DEFINED: XA,
        } = we),
        (ed = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (BA = 20),
        (td = (e = ed, t) => {
          switch (t.type) {
            case MA: {
              let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
              return (0, Pe.merge)(e, {
                hasBoundaryNodes: r,
                reducedMotion: n,
              });
            }
            case DA:
              return (0, Pe.set)(e, "active", !0);
            case FA: {
              let {
                payload: { step: r = BA },
              } = t;
              return (0, Pe.set)(e, "tick", e.tick + r);
            }
            case GA:
              return ed;
            case HA: {
              let {
                payload: { now: r },
              } = t;
              return (0, Pe.set)(e, "tick", r);
            }
            case VA: {
              let r = (0, Pe.addLast)(e.eventListeners, t.payload);
              return (0, Pe.set)(e, "eventListeners", r);
            }
            case UA: {
              let { stateKey: r, newState: n } = t.payload;
              return (0, Pe.setIn)(e, ["eventState", r], n);
            }
            case WA: {
              let { actionListId: r, isPlaying: n } = t.payload;
              return (0, Pe.setIn)(e, ["playbackState", r], n);
            }
            case kA: {
              let { width: r, mediaQueries: n } = t.payload,
                i = n.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: d } = n[s];
                if (r >= u && r <= d) {
                  o = a;
                  break;
                }
              }
              return (0, Pe.merge)(e, { viewportWidth: r, mediaQueryKey: o });
            }
            case XA:
              return (0, Pe.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        }));
    });
  var id = c((oX, nd) => {
    function jA() {
      ((this.__data__ = []), (this.size = 0));
    }
    nd.exports = jA;
  });
  var Cn = c((aX, od) => {
    function zA(e, t) {
      return e === t || (e !== e && t !== t);
    }
    od.exports = zA;
  });
  var Cr = c((sX, ad) => {
    var KA = Cn();
    function YA(e, t) {
      for (var r = e.length; r--; ) if (KA(e[r][0], t)) return r;
      return -1;
    }
    ad.exports = YA;
  });
  var ud = c((uX, sd) => {
    var $A = Cr(),
      QA = Array.prototype,
      ZA = QA.splice;
    function JA(e) {
      var t = this.__data__,
        r = $A(t, e);
      if (r < 0) return !1;
      var n = t.length - 1;
      return (r == n ? t.pop() : ZA.call(t, r, 1), --this.size, !0);
    }
    sd.exports = JA;
  });
  var ld = c((cX, cd) => {
    var eS = Cr();
    function tS(e) {
      var t = this.__data__,
        r = eS(t, e);
      return r < 0 ? void 0 : t[r][1];
    }
    cd.exports = tS;
  });
  var dd = c((lX, fd) => {
    var rS = Cr();
    function nS(e) {
      return rS(this.__data__, e) > -1;
    }
    fd.exports = nS;
  });
  var hd = c((fX, pd) => {
    var iS = Cr();
    function oS(e, t) {
      var r = this.__data__,
        n = iS(r, e);
      return (n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this);
    }
    pd.exports = oS;
  });
  var Rr = c((dX, gd) => {
    var aS = id(),
      sS = ud(),
      uS = ld(),
      cS = dd(),
      lS = hd();
    function Kt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Kt.prototype.clear = aS;
    Kt.prototype.delete = sS;
    Kt.prototype.get = uS;
    Kt.prototype.has = cS;
    Kt.prototype.set = lS;
    gd.exports = Kt;
  });
  var yd = c((pX, vd) => {
    var fS = Rr();
    function dS() {
      ((this.__data__ = new fS()), (this.size = 0));
    }
    vd.exports = dS;
  });
  var Ed = c((hX, md) => {
    function pS(e) {
      var t = this.__data__,
        r = t.delete(e);
      return ((this.size = t.size), r);
    }
    md.exports = pS;
  });
  var bd = c((gX, _d) => {
    function hS(e) {
      return this.__data__.get(e);
    }
    _d.exports = hS;
  });
  var Td = c((vX, Id) => {
    function gS(e) {
      return this.__data__.has(e);
    }
    Id.exports = gS;
  });
  var ut = c((yX, wd) => {
    function vS(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    wd.exports = vS;
  });
  var Ko = c((mX, xd) => {
    var yS = It(),
      mS = ut(),
      ES = "[object AsyncFunction]",
      _S = "[object Function]",
      bS = "[object GeneratorFunction]",
      IS = "[object Proxy]";
    function TS(e) {
      if (!mS(e)) return !1;
      var t = yS(e);
      return t == _S || t == bS || t == ES || t == IS;
    }
    xd.exports = TS;
  });
  var Ad = c((EX, Od) => {
    var wS = Ze(),
      xS = wS["__core-js_shared__"];
    Od.exports = xS;
  });
  var Rd = c((_X, Cd) => {
    var Yo = Ad(),
      Sd = (function () {
        var e = /[^.]+$/.exec((Yo && Yo.keys && Yo.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function OS(e) {
      return !!Sd && Sd in e;
    }
    Cd.exports = OS;
  });
  var $o = c((bX, Ld) => {
    var AS = Function.prototype,
      SS = AS.toString;
    function CS(e) {
      if (e != null) {
        try {
          return SS.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    Ld.exports = CS;
  });
  var Pd = c((IX, Nd) => {
    var RS = Ko(),
      LS = Rd(),
      NS = ut(),
      PS = $o(),
      qS = /[\\^$.*+?()[\]{}|]/g,
      MS = /^\[object .+?Constructor\]$/,
      DS = Function.prototype,
      FS = Object.prototype,
      GS = DS.toString,
      VS = FS.hasOwnProperty,
      US = RegExp(
        "^" +
          GS.call(VS)
            .replace(qS, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?",
            ) +
          "$",
      );
    function HS(e) {
      if (!NS(e) || LS(e)) return !1;
      var t = RS(e) ? US : MS;
      return t.test(PS(e));
    }
    Nd.exports = HS;
  });
  var Md = c((TX, qd) => {
    function WS(e, t) {
      return e?.[t];
    }
    qd.exports = WS;
  });
  var Tt = c((wX, Dd) => {
    var kS = Pd(),
      XS = Md();
    function BS(e, t) {
      var r = XS(e, t);
      return kS(r) ? r : void 0;
    }
    Dd.exports = BS;
  });
  var Rn = c((xX, Fd) => {
    var jS = Tt(),
      zS = Ze(),
      KS = jS(zS, "Map");
    Fd.exports = KS;
  });
  var Lr = c((OX, Gd) => {
    var YS = Tt(),
      $S = YS(Object, "create");
    Gd.exports = $S;
  });
  var Hd = c((AX, Ud) => {
    var Vd = Lr();
    function QS() {
      ((this.__data__ = Vd ? Vd(null) : {}), (this.size = 0));
    }
    Ud.exports = QS;
  });
  var kd = c((SX, Wd) => {
    function ZS(e) {
      var t = this.has(e) && delete this.__data__[e];
      return ((this.size -= t ? 1 : 0), t);
    }
    Wd.exports = ZS;
  });
  var Bd = c((CX, Xd) => {
    var JS = Lr(),
      e0 = "__lodash_hash_undefined__",
      t0 = Object.prototype,
      r0 = t0.hasOwnProperty;
    function n0(e) {
      var t = this.__data__;
      if (JS) {
        var r = t[e];
        return r === e0 ? void 0 : r;
      }
      return r0.call(t, e) ? t[e] : void 0;
    }
    Xd.exports = n0;
  });
  var zd = c((RX, jd) => {
    var i0 = Lr(),
      o0 = Object.prototype,
      a0 = o0.hasOwnProperty;
    function s0(e) {
      var t = this.__data__;
      return i0 ? t[e] !== void 0 : a0.call(t, e);
    }
    jd.exports = s0;
  });
  var Yd = c((LX, Kd) => {
    var u0 = Lr(),
      c0 = "__lodash_hash_undefined__";
    function l0(e, t) {
      var r = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (r[e] = u0 && t === void 0 ? c0 : t),
        this
      );
    }
    Kd.exports = l0;
  });
  var Qd = c((NX, $d) => {
    var f0 = Hd(),
      d0 = kd(),
      p0 = Bd(),
      h0 = zd(),
      g0 = Yd();
    function Yt(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    Yt.prototype.clear = f0;
    Yt.prototype.delete = d0;
    Yt.prototype.get = p0;
    Yt.prototype.has = h0;
    Yt.prototype.set = g0;
    $d.exports = Yt;
  });
  var ep = c((PX, Jd) => {
    var Zd = Qd(),
      v0 = Rr(),
      y0 = Rn();
    function m0() {
      ((this.size = 0),
        (this.__data__ = {
          hash: new Zd(),
          map: new (y0 || v0)(),
          string: new Zd(),
        }));
    }
    Jd.exports = m0;
  });
  var rp = c((qX, tp) => {
    function E0(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    tp.exports = E0;
  });
  var Nr = c((MX, np) => {
    var _0 = rp();
    function b0(e, t) {
      var r = e.__data__;
      return _0(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
    }
    np.exports = b0;
  });
  var op = c((DX, ip) => {
    var I0 = Nr();
    function T0(e) {
      var t = I0(this, e).delete(e);
      return ((this.size -= t ? 1 : 0), t);
    }
    ip.exports = T0;
  });
  var sp = c((FX, ap) => {
    var w0 = Nr();
    function x0(e) {
      return w0(this, e).get(e);
    }
    ap.exports = x0;
  });
  var cp = c((GX, up) => {
    var O0 = Nr();
    function A0(e) {
      return O0(this, e).has(e);
    }
    up.exports = A0;
  });
  var fp = c((VX, lp) => {
    var S0 = Nr();
    function C0(e, t) {
      var r = S0(this, e),
        n = r.size;
      return (r.set(e, t), (this.size += r.size == n ? 0 : 1), this);
    }
    lp.exports = C0;
  });
  var Ln = c((UX, dp) => {
    var R0 = ep(),
      L0 = op(),
      N0 = sp(),
      P0 = cp(),
      q0 = fp();
    function $t(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.clear(); ++t < r; ) {
        var n = e[t];
        this.set(n[0], n[1]);
      }
    }
    $t.prototype.clear = R0;
    $t.prototype.delete = L0;
    $t.prototype.get = N0;
    $t.prototype.has = P0;
    $t.prototype.set = q0;
    dp.exports = $t;
  });
  var hp = c((HX, pp) => {
    var M0 = Rr(),
      D0 = Rn(),
      F0 = Ln(),
      G0 = 200;
    function V0(e, t) {
      var r = this.__data__;
      if (r instanceof M0) {
        var n = r.__data__;
        if (!D0 || n.length < G0 - 1)
          return (n.push([e, t]), (this.size = ++r.size), this);
        r = this.__data__ = new F0(n);
      }
      return (r.set(e, t), (this.size = r.size), this);
    }
    pp.exports = V0;
  });
  var Qo = c((WX, gp) => {
    var U0 = Rr(),
      H0 = yd(),
      W0 = Ed(),
      k0 = bd(),
      X0 = Td(),
      B0 = hp();
    function Qt(e) {
      var t = (this.__data__ = new U0(e));
      this.size = t.size;
    }
    Qt.prototype.clear = H0;
    Qt.prototype.delete = W0;
    Qt.prototype.get = k0;
    Qt.prototype.has = X0;
    Qt.prototype.set = B0;
    gp.exports = Qt;
  });
  var yp = c((kX, vp) => {
    var j0 = "__lodash_hash_undefined__";
    function z0(e) {
      return (this.__data__.set(e, j0), this);
    }
    vp.exports = z0;
  });
  var Ep = c((XX, mp) => {
    function K0(e) {
      return this.__data__.has(e);
    }
    mp.exports = K0;
  });
  var bp = c((BX, _p) => {
    var Y0 = Ln(),
      $0 = yp(),
      Q0 = Ep();
    function Nn(e) {
      var t = -1,
        r = e == null ? 0 : e.length;
      for (this.__data__ = new Y0(); ++t < r; ) this.add(e[t]);
    }
    Nn.prototype.add = Nn.prototype.push = $0;
    Nn.prototype.has = Q0;
    _p.exports = Nn;
  });
  var Tp = c((jX, Ip) => {
    function Z0(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
        if (t(e[r], r, e)) return !0;
      return !1;
    }
    Ip.exports = Z0;
  });
  var xp = c((zX, wp) => {
    function J0(e, t) {
      return e.has(t);
    }
    wp.exports = J0;
  });
  var Zo = c((KX, Op) => {
    var eC = bp(),
      tC = Tp(),
      rC = xp(),
      nC = 1,
      iC = 2;
    function oC(e, t, r, n, i, o) {
      var s = r & nC,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var d = o.get(e),
        h = o.get(t);
      if (d && h) return d == t && h == e;
      var f = -1,
        m = !0,
        p = r & iC ? new eC() : void 0;
      for (o.set(e, t), o.set(t, e); ++f < a; ) {
        var g = e[f],
          _ = t[f];
        if (n) var O = s ? n(_, g, f, t, e, o) : n(g, _, f, e, t, o);
        if (O !== void 0) {
          if (O) continue;
          m = !1;
          break;
        }
        if (p) {
          if (
            !tC(t, function (w, R) {
              if (!rC(p, R) && (g === w || i(g, w, r, n, o))) return p.push(R);
            })
          ) {
            m = !1;
            break;
          }
        } else if (!(g === _ || i(g, _, r, n, o))) {
          m = !1;
          break;
        }
      }
      return (o.delete(e), o.delete(t), m);
    }
    Op.exports = oC;
  });
  var Sp = c((YX, Ap) => {
    var aC = Ze(),
      sC = aC.Uint8Array;
    Ap.exports = sC;
  });
  var Rp = c(($X, Cp) => {
    function uC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n, i) {
          r[++t] = [i, n];
        }),
        r
      );
    }
    Cp.exports = uC;
  });
  var Np = c((QX, Lp) => {
    function cC(e) {
      var t = -1,
        r = Array(e.size);
      return (
        e.forEach(function (n) {
          r[++t] = n;
        }),
        r
      );
    }
    Lp.exports = cC;
  });
  var Fp = c((ZX, Dp) => {
    var Pp = Xt(),
      qp = Sp(),
      lC = Cn(),
      fC = Zo(),
      dC = Rp(),
      pC = Np(),
      hC = 1,
      gC = 2,
      vC = "[object Boolean]",
      yC = "[object Date]",
      mC = "[object Error]",
      EC = "[object Map]",
      _C = "[object Number]",
      bC = "[object RegExp]",
      IC = "[object Set]",
      TC = "[object String]",
      wC = "[object Symbol]",
      xC = "[object ArrayBuffer]",
      OC = "[object DataView]",
      Mp = Pp ? Pp.prototype : void 0,
      Jo = Mp ? Mp.valueOf : void 0;
    function AC(e, t, r, n, i, o, s) {
      switch (r) {
        case OC:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          ((e = e.buffer), (t = t.buffer));
        case xC:
          return !(e.byteLength != t.byteLength || !o(new qp(e), new qp(t)));
        case vC:
        case yC:
        case _C:
          return lC(+e, +t);
        case mC:
          return e.name == t.name && e.message == t.message;
        case bC:
        case TC:
          return e == t + "";
        case EC:
          var a = dC;
        case IC:
          var u = n & hC;
          if ((a || (a = pC), e.size != t.size && !u)) return !1;
          var d = s.get(e);
          if (d) return d == t;
          ((n |= gC), s.set(e, t));
          var h = fC(a(e), a(t), n, i, o, s);
          return (s.delete(e), h);
        case wC:
          if (Jo) return Jo.call(e) == Jo.call(t);
      }
      return !1;
    }
    Dp.exports = AC;
  });
  var Pn = c((JX, Gp) => {
    function SC(e, t) {
      for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
      return e;
    }
    Gp.exports = SC;
  });
  var Oe = c((eB, Vp) => {
    var CC = Array.isArray;
    Vp.exports = CC;
  });
  var ea = c((tB, Up) => {
    var RC = Pn(),
      LC = Oe();
    function NC(e, t, r) {
      var n = t(e);
      return LC(e) ? n : RC(n, r(e));
    }
    Up.exports = NC;
  });
  var Wp = c((rB, Hp) => {
    function PC(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
        var s = e[r];
        t(s, r, e) && (o[i++] = s);
      }
      return o;
    }
    Hp.exports = PC;
  });
  var ta = c((nB, kp) => {
    function qC() {
      return [];
    }
    kp.exports = qC;
  });
  var ra = c((iB, Bp) => {
    var MC = Wp(),
      DC = ta(),
      FC = Object.prototype,
      GC = FC.propertyIsEnumerable,
      Xp = Object.getOwnPropertySymbols,
      VC = Xp
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                MC(Xp(e), function (t) {
                  return GC.call(e, t);
                }));
          }
        : DC;
    Bp.exports = VC;
  });
  var zp = c((oB, jp) => {
    function UC(e, t) {
      for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
      return n;
    }
    jp.exports = UC;
  });
  var Yp = c((aB, Kp) => {
    var HC = It(),
      WC = pt(),
      kC = "[object Arguments]";
    function XC(e) {
      return WC(e) && HC(e) == kC;
    }
    Kp.exports = XC;
  });
  var Pr = c((sB, Zp) => {
    var $p = Yp(),
      BC = pt(),
      Qp = Object.prototype,
      jC = Qp.hasOwnProperty,
      zC = Qp.propertyIsEnumerable,
      KC = $p(
        (function () {
          return arguments;
        })(),
      )
        ? $p
        : function (e) {
            return BC(e) && jC.call(e, "callee") && !zC.call(e, "callee");
          };
    Zp.exports = KC;
  });
  var eh = c((uB, Jp) => {
    function YC() {
      return !1;
    }
    Jp.exports = YC;
  });
  var qn = c((qr, Zt) => {
    var $C = Ze(),
      QC = eh(),
      nh = typeof qr == "object" && qr && !qr.nodeType && qr,
      th = nh && typeof Zt == "object" && Zt && !Zt.nodeType && Zt,
      ZC = th && th.exports === nh,
      rh = ZC ? $C.Buffer : void 0,
      JC = rh ? rh.isBuffer : void 0,
      eR = JC || QC;
    Zt.exports = eR;
  });
  var Mn = c((cB, ih) => {
    var tR = 9007199254740991,
      rR = /^(?:0|[1-9]\d*)$/;
    function nR(e, t) {
      var r = typeof e;
      return (
        (t = t ?? tR),
        !!t &&
          (r == "number" || (r != "symbol" && rR.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    ih.exports = nR;
  });
  var Dn = c((lB, oh) => {
    var iR = 9007199254740991;
    function oR(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= iR;
    }
    oh.exports = oR;
  });
  var sh = c((fB, ah) => {
    var aR = It(),
      sR = Dn(),
      uR = pt(),
      cR = "[object Arguments]",
      lR = "[object Array]",
      fR = "[object Boolean]",
      dR = "[object Date]",
      pR = "[object Error]",
      hR = "[object Function]",
      gR = "[object Map]",
      vR = "[object Number]",
      yR = "[object Object]",
      mR = "[object RegExp]",
      ER = "[object Set]",
      _R = "[object String]",
      bR = "[object WeakMap]",
      IR = "[object ArrayBuffer]",
      TR = "[object DataView]",
      wR = "[object Float32Array]",
      xR = "[object Float64Array]",
      OR = "[object Int8Array]",
      AR = "[object Int16Array]",
      SR = "[object Int32Array]",
      CR = "[object Uint8Array]",
      RR = "[object Uint8ClampedArray]",
      LR = "[object Uint16Array]",
      NR = "[object Uint32Array]",
      ve = {};
    ve[wR] =
      ve[xR] =
      ve[OR] =
      ve[AR] =
      ve[SR] =
      ve[CR] =
      ve[RR] =
      ve[LR] =
      ve[NR] =
        !0;
    ve[cR] =
      ve[lR] =
      ve[IR] =
      ve[fR] =
      ve[TR] =
      ve[dR] =
      ve[pR] =
      ve[hR] =
      ve[gR] =
      ve[vR] =
      ve[yR] =
      ve[mR] =
      ve[ER] =
      ve[_R] =
      ve[bR] =
        !1;
    function PR(e) {
      return uR(e) && sR(e.length) && !!ve[aR(e)];
    }
    ah.exports = PR;
  });
  var ch = c((dB, uh) => {
    function qR(e) {
      return function (t) {
        return e(t);
      };
    }
    uh.exports = qR;
  });
  var fh = c((Mr, Jt) => {
    var MR = Ao(),
      lh = typeof Mr == "object" && Mr && !Mr.nodeType && Mr,
      Dr = lh && typeof Jt == "object" && Jt && !Jt.nodeType && Jt,
      DR = Dr && Dr.exports === lh,
      na = DR && MR.process,
      FR = (function () {
        try {
          var e = Dr && Dr.require && Dr.require("util").types;
          return e || (na && na.binding && na.binding("util"));
        } catch {}
      })();
    Jt.exports = FR;
  });
  var Fn = c((pB, hh) => {
    var GR = sh(),
      VR = ch(),
      dh = fh(),
      ph = dh && dh.isTypedArray,
      UR = ph ? VR(ph) : GR;
    hh.exports = UR;
  });
  var ia = c((hB, gh) => {
    var HR = zp(),
      WR = Pr(),
      kR = Oe(),
      XR = qn(),
      BR = Mn(),
      jR = Fn(),
      zR = Object.prototype,
      KR = zR.hasOwnProperty;
    function YR(e, t) {
      var r = kR(e),
        n = !r && WR(e),
        i = !r && !n && XR(e),
        o = !r && !n && !i && jR(e),
        s = r || n || i || o,
        a = s ? HR(e.length, String) : [],
        u = a.length;
      for (var d in e)
        (t || KR.call(e, d)) &&
          !(
            s &&
            (d == "length" ||
              (i && (d == "offset" || d == "parent")) ||
              (o &&
                (d == "buffer" || d == "byteLength" || d == "byteOffset")) ||
              BR(d, u))
          ) &&
          a.push(d);
      return a;
    }
    gh.exports = YR;
  });
  var Gn = c((gB, vh) => {
    var $R = Object.prototype;
    function QR(e) {
      var t = e && e.constructor,
        r = (typeof t == "function" && t.prototype) || $R;
      return e === r;
    }
    vh.exports = QR;
  });
  var mh = c((vB, yh) => {
    var ZR = So(),
      JR = ZR(Object.keys, Object);
    yh.exports = JR;
  });
  var Vn = c((yB, Eh) => {
    var eL = Gn(),
      tL = mh(),
      rL = Object.prototype,
      nL = rL.hasOwnProperty;
    function iL(e) {
      if (!eL(e)) return tL(e);
      var t = [];
      for (var r in Object(e)) nL.call(e, r) && r != "constructor" && t.push(r);
      return t;
    }
    Eh.exports = iL;
  });
  var Nt = c((mB, _h) => {
    var oL = Ko(),
      aL = Dn();
    function sL(e) {
      return e != null && aL(e.length) && !oL(e);
    }
    _h.exports = sL;
  });
  var Fr = c((EB, bh) => {
    var uL = ia(),
      cL = Vn(),
      lL = Nt();
    function fL(e) {
      return lL(e) ? uL(e) : cL(e);
    }
    bh.exports = fL;
  });
  var Th = c((_B, Ih) => {
    var dL = ea(),
      pL = ra(),
      hL = Fr();
    function gL(e) {
      return dL(e, hL, pL);
    }
    Ih.exports = gL;
  });
  var Oh = c((bB, xh) => {
    var wh = Th(),
      vL = 1,
      yL = Object.prototype,
      mL = yL.hasOwnProperty;
    function EL(e, t, r, n, i, o) {
      var s = r & vL,
        a = wh(e),
        u = a.length,
        d = wh(t),
        h = d.length;
      if (u != h && !s) return !1;
      for (var f = u; f--; ) {
        var m = a[f];
        if (!(s ? m in t : mL.call(t, m))) return !1;
      }
      var p = o.get(e),
        g = o.get(t);
      if (p && g) return p == t && g == e;
      var _ = !0;
      (o.set(e, t), o.set(t, e));
      for (var O = s; ++f < u; ) {
        m = a[f];
        var w = e[m],
          R = t[m];
        if (n) var A = s ? n(R, w, m, t, e, o) : n(w, R, m, e, t, o);
        if (!(A === void 0 ? w === R || i(w, R, r, n, o) : A)) {
          _ = !1;
          break;
        }
        O || (O = m == "constructor");
      }
      if (_ && !O) {
        var N = e.constructor,
          P = t.constructor;
        N != P &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof N == "function" &&
            N instanceof N &&
            typeof P == "function" &&
            P instanceof P
          ) &&
          (_ = !1);
      }
      return (o.delete(e), o.delete(t), _);
    }
    xh.exports = EL;
  });
  var Sh = c((IB, Ah) => {
    var _L = Tt(),
      bL = Ze(),
      IL = _L(bL, "DataView");
    Ah.exports = IL;
  });
  var Rh = c((TB, Ch) => {
    var TL = Tt(),
      wL = Ze(),
      xL = TL(wL, "Promise");
    Ch.exports = xL;
  });
  var Nh = c((wB, Lh) => {
    var OL = Tt(),
      AL = Ze(),
      SL = OL(AL, "Set");
    Lh.exports = SL;
  });
  var oa = c((xB, Ph) => {
    var CL = Tt(),
      RL = Ze(),
      LL = CL(RL, "WeakMap");
    Ph.exports = LL;
  });
  var Un = c((OB, Uh) => {
    var aa = Sh(),
      sa = Rn(),
      ua = Rh(),
      ca = Nh(),
      la = oa(),
      Vh = It(),
      er = $o(),
      qh = "[object Map]",
      NL = "[object Object]",
      Mh = "[object Promise]",
      Dh = "[object Set]",
      Fh = "[object WeakMap]",
      Gh = "[object DataView]",
      PL = er(aa),
      qL = er(sa),
      ML = er(ua),
      DL = er(ca),
      FL = er(la),
      Pt = Vh;
    ((aa && Pt(new aa(new ArrayBuffer(1))) != Gh) ||
      (sa && Pt(new sa()) != qh) ||
      (ua && Pt(ua.resolve()) != Mh) ||
      (ca && Pt(new ca()) != Dh) ||
      (la && Pt(new la()) != Fh)) &&
      (Pt = function (e) {
        var t = Vh(e),
          r = t == NL ? e.constructor : void 0,
          n = r ? er(r) : "";
        if (n)
          switch (n) {
            case PL:
              return Gh;
            case qL:
              return qh;
            case ML:
              return Mh;
            case DL:
              return Dh;
            case FL:
              return Fh;
          }
        return t;
      });
    Uh.exports = Pt;
  });
  var Kh = c((AB, zh) => {
    var fa = Qo(),
      GL = Zo(),
      VL = Fp(),
      UL = Oh(),
      Hh = Un(),
      Wh = Oe(),
      kh = qn(),
      HL = Fn(),
      WL = 1,
      Xh = "[object Arguments]",
      Bh = "[object Array]",
      Hn = "[object Object]",
      kL = Object.prototype,
      jh = kL.hasOwnProperty;
    function XL(e, t, r, n, i, o) {
      var s = Wh(e),
        a = Wh(t),
        u = s ? Bh : Hh(e),
        d = a ? Bh : Hh(t);
      ((u = u == Xh ? Hn : u), (d = d == Xh ? Hn : d));
      var h = u == Hn,
        f = d == Hn,
        m = u == d;
      if (m && kh(e)) {
        if (!kh(t)) return !1;
        ((s = !0), (h = !1));
      }
      if (m && !h)
        return (
          o || (o = new fa()),
          s || HL(e) ? GL(e, t, r, n, i, o) : VL(e, t, u, r, n, i, o)
        );
      if (!(r & WL)) {
        var p = h && jh.call(e, "__wrapped__"),
          g = f && jh.call(t, "__wrapped__");
        if (p || g) {
          var _ = p ? e.value() : e,
            O = g ? t.value() : t;
          return (o || (o = new fa()), i(_, O, r, n, o));
        }
      }
      return m ? (o || (o = new fa()), UL(e, t, r, n, i, o)) : !1;
    }
    zh.exports = XL;
  });
  var da = c((SB, Qh) => {
    var BL = Kh(),
      Yh = pt();
    function $h(e, t, r, n, i) {
      return e === t
        ? !0
        : e == null || t == null || (!Yh(e) && !Yh(t))
          ? e !== e && t !== t
          : BL(e, t, r, n, $h, i);
    }
    Qh.exports = $h;
  });
  var Jh = c((CB, Zh) => {
    var jL = Qo(),
      zL = da(),
      KL = 1,
      YL = 2;
    function $L(e, t, r, n) {
      var i = r.length,
        o = i,
        s = !n;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = r[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = r[i];
        var u = a[0],
          d = e[u],
          h = a[1];
        if (s && a[2]) {
          if (d === void 0 && !(u in e)) return !1;
        } else {
          var f = new jL();
          if (n) var m = n(d, h, u, e, t, f);
          if (!(m === void 0 ? zL(h, d, KL | YL, n, f) : m)) return !1;
        }
      }
      return !0;
    }
    Zh.exports = $L;
  });
  var pa = c((RB, eg) => {
    var QL = ut();
    function ZL(e) {
      return e === e && !QL(e);
    }
    eg.exports = ZL;
  });
  var rg = c((LB, tg) => {
    var JL = pa(),
      eN = Fr();
    function tN(e) {
      for (var t = eN(e), r = t.length; r--; ) {
        var n = t[r],
          i = e[n];
        t[r] = [n, i, JL(i)];
      }
      return t;
    }
    tg.exports = tN;
  });
  var ha = c((NB, ng) => {
    function rN(e, t) {
      return function (r) {
        return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
      };
    }
    ng.exports = rN;
  });
  var og = c((PB, ig) => {
    var nN = Jh(),
      iN = rg(),
      oN = ha();
    function aN(e) {
      var t = iN(e);
      return t.length == 1 && t[0][2]
        ? oN(t[0][0], t[0][1])
        : function (r) {
            return r === e || nN(r, e, t);
          };
    }
    ig.exports = aN;
  });
  var Gr = c((qB, ag) => {
    var sN = It(),
      uN = pt(),
      cN = "[object Symbol]";
    function lN(e) {
      return typeof e == "symbol" || (uN(e) && sN(e) == cN);
    }
    ag.exports = lN;
  });
  var Wn = c((MB, sg) => {
    var fN = Oe(),
      dN = Gr(),
      pN = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      hN = /^\w*$/;
    function gN(e, t) {
      if (fN(e)) return !1;
      var r = typeof e;
      return r == "number" ||
        r == "symbol" ||
        r == "boolean" ||
        e == null ||
        dN(e)
        ? !0
        : hN.test(e) || !pN.test(e) || (t != null && e in Object(t));
    }
    sg.exports = gN;
  });
  var lg = c((DB, cg) => {
    var ug = Ln(),
      vN = "Expected a function";
    function ga(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(vN);
      var r = function () {
        var n = arguments,
          i = t ? t.apply(this, n) : n[0],
          o = r.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, n);
        return ((r.cache = o.set(i, s) || o), s);
      };
      return ((r.cache = new (ga.Cache || ug)()), r);
    }
    ga.Cache = ug;
    cg.exports = ga;
  });
  var dg = c((FB, fg) => {
    var yN = lg(),
      mN = 500;
    function EN(e) {
      var t = yN(e, function (n) {
          return (r.size === mN && r.clear(), n);
        }),
        r = t.cache;
      return t;
    }
    fg.exports = EN;
  });
  var hg = c((GB, pg) => {
    var _N = dg(),
      bN =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      IN = /\\(\\)?/g,
      TN = _N(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(bN, function (r, n, i, o) {
            t.push(i ? o.replace(IN, "$1") : n || r);
          }),
          t
        );
      });
    pg.exports = TN;
  });
  var va = c((VB, gg) => {
    function wN(e, t) {
      for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
        i[r] = t(e[r], r, e);
      return i;
    }
    gg.exports = wN;
  });
  var bg = c((UB, _g) => {
    var vg = Xt(),
      xN = va(),
      ON = Oe(),
      AN = Gr(),
      SN = 1 / 0,
      yg = vg ? vg.prototype : void 0,
      mg = yg ? yg.toString : void 0;
    function Eg(e) {
      if (typeof e == "string") return e;
      if (ON(e)) return xN(e, Eg) + "";
      if (AN(e)) return mg ? mg.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -SN ? "-0" : t;
    }
    _g.exports = Eg;
  });
  var Tg = c((HB, Ig) => {
    var CN = bg();
    function RN(e) {
      return e == null ? "" : CN(e);
    }
    Ig.exports = RN;
  });
  var Vr = c((WB, wg) => {
    var LN = Oe(),
      NN = Wn(),
      PN = hg(),
      qN = Tg();
    function MN(e, t) {
      return LN(e) ? e : NN(e, t) ? [e] : PN(qN(e));
    }
    wg.exports = MN;
  });
  var tr = c((kB, xg) => {
    var DN = Gr(),
      FN = 1 / 0;
    function GN(e) {
      if (typeof e == "string" || DN(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -FN ? "-0" : t;
    }
    xg.exports = GN;
  });
  var kn = c((XB, Og) => {
    var VN = Vr(),
      UN = tr();
    function HN(e, t) {
      t = VN(t, e);
      for (var r = 0, n = t.length; e != null && r < n; ) e = e[UN(t[r++])];
      return r && r == n ? e : void 0;
    }
    Og.exports = HN;
  });
  var Xn = c((BB, Ag) => {
    var WN = kn();
    function kN(e, t, r) {
      var n = e == null ? void 0 : WN(e, t);
      return n === void 0 ? r : n;
    }
    Ag.exports = kN;
  });
  var Cg = c((jB, Sg) => {
    function XN(e, t) {
      return e != null && t in Object(e);
    }
    Sg.exports = XN;
  });
  var Lg = c((zB, Rg) => {
    var BN = Vr(),
      jN = Pr(),
      zN = Oe(),
      KN = Mn(),
      YN = Dn(),
      $N = tr();
    function QN(e, t, r) {
      t = BN(t, e);
      for (var n = -1, i = t.length, o = !1; ++n < i; ) {
        var s = $N(t[n]);
        if (!(o = e != null && r(e, s))) break;
        e = e[s];
      }
      return o || ++n != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && YN(i) && KN(s, i) && (zN(e) || jN(e)));
    }
    Rg.exports = QN;
  });
  var Pg = c((KB, Ng) => {
    var ZN = Cg(),
      JN = Lg();
    function eP(e, t) {
      return e != null && JN(e, t, ZN);
    }
    Ng.exports = eP;
  });
  var Mg = c((YB, qg) => {
    var tP = da(),
      rP = Xn(),
      nP = Pg(),
      iP = Wn(),
      oP = pa(),
      aP = ha(),
      sP = tr(),
      uP = 1,
      cP = 2;
    function lP(e, t) {
      return iP(e) && oP(t)
        ? aP(sP(e), t)
        : function (r) {
            var n = rP(r, e);
            return n === void 0 && n === t ? nP(r, e) : tP(t, n, uP | cP);
          };
    }
    qg.exports = lP;
  });
  var Bn = c(($B, Dg) => {
    function fP(e) {
      return e;
    }
    Dg.exports = fP;
  });
  var ya = c((QB, Fg) => {
    function dP(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Fg.exports = dP;
  });
  var Vg = c((ZB, Gg) => {
    var pP = kn();
    function hP(e) {
      return function (t) {
        return pP(t, e);
      };
    }
    Gg.exports = hP;
  });
  var Hg = c((JB, Ug) => {
    var gP = ya(),
      vP = Vg(),
      yP = Wn(),
      mP = tr();
    function EP(e) {
      return yP(e) ? gP(mP(e)) : vP(e);
    }
    Ug.exports = EP;
  });
  var wt = c((e5, Wg) => {
    var _P = og(),
      bP = Mg(),
      IP = Bn(),
      TP = Oe(),
      wP = Hg();
    function xP(e) {
      return typeof e == "function"
        ? e
        : e == null
          ? IP
          : typeof e == "object"
            ? TP(e)
              ? bP(e[0], e[1])
              : _P(e)
            : wP(e);
    }
    Wg.exports = xP;
  });
  var ma = c((t5, kg) => {
    var OP = wt(),
      AP = Nt(),
      SP = Fr();
    function CP(e) {
      return function (t, r, n) {
        var i = Object(t);
        if (!AP(t)) {
          var o = OP(r, 3);
          ((t = SP(t)),
            (r = function (a) {
              return o(i[a], a, i);
            }));
        }
        var s = e(t, r, n);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    kg.exports = CP;
  });
  var Ea = c((r5, Xg) => {
    function RP(e, t, r, n) {
      for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Xg.exports = RP;
  });
  var jg = c((n5, Bg) => {
    var LP = /\s/;
    function NP(e) {
      for (var t = e.length; t-- && LP.test(e.charAt(t)); );
      return t;
    }
    Bg.exports = NP;
  });
  var Kg = c((i5, zg) => {
    var PP = jg(),
      qP = /^\s+/;
    function MP(e) {
      return e && e.slice(0, PP(e) + 1).replace(qP, "");
    }
    zg.exports = MP;
  });
  var jn = c((o5, Qg) => {
    var DP = Kg(),
      Yg = ut(),
      FP = Gr(),
      $g = 0 / 0,
      GP = /^[-+]0x[0-9a-f]+$/i,
      VP = /^0b[01]+$/i,
      UP = /^0o[0-7]+$/i,
      HP = parseInt;
    function WP(e) {
      if (typeof e == "number") return e;
      if (FP(e)) return $g;
      if (Yg(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Yg(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = DP(e);
      var r = VP.test(e);
      return r || UP.test(e) ? HP(e.slice(2), r ? 2 : 8) : GP.test(e) ? $g : +e;
    }
    Qg.exports = WP;
  });
  var ev = c((a5, Jg) => {
    var kP = jn(),
      Zg = 1 / 0,
      XP = 17976931348623157e292;
    function BP(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = kP(e)), e === Zg || e === -Zg)) {
        var t = e < 0 ? -1 : 1;
        return t * XP;
      }
      return e === e ? e : 0;
    }
    Jg.exports = BP;
  });
  var _a = c((s5, tv) => {
    var jP = ev();
    function zP(e) {
      var t = jP(e),
        r = t % 1;
      return t === t ? (r ? t - r : t) : 0;
    }
    tv.exports = zP;
  });
  var nv = c((u5, rv) => {
    var KP = Ea(),
      YP = wt(),
      $P = _a(),
      QP = Math.max;
    function ZP(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = r == null ? 0 : $P(r);
      return (i < 0 && (i = QP(n + i, 0)), KP(e, YP(t, 3), i));
    }
    rv.exports = ZP;
  });
  var ba = c((c5, iv) => {
    var JP = ma(),
      eq = nv(),
      tq = JP(eq);
    iv.exports = tq;
  });
  var sv = {};
  Ge(sv, {
    ELEMENT_MATCHES: () => rq,
    FLEX_PREFIXED: () => Ia,
    IS_BROWSER_ENV: () => et,
    TRANSFORM_PREFIXED: () => xt,
    TRANSFORM_STYLE_PREFIXED: () => Kn,
    withBrowser: () => zn,
  });
  var av,
    et,
    zn,
    rq,
    Ia,
    xt,
    ov,
    Kn,
    Yn = ye(() => {
      "use strict";
      ((av = fe(ba())),
        (et = typeof window < "u"),
        (zn = (e, t) => (et ? e() : t)),
        (rq = zn(() =>
          (0, av.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype,
          ),
        )),
        (Ia = zn(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            r = "";
          try {
            let { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return r;
          } catch {
            return r;
          }
        }, "flex")),
        (xt = zn(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              r = "Transform",
              { length: n } = t;
            for (let i = 0; i < n; i++) {
              let o = t[i] + r;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (ov = xt.split("transform")[0]),
        (Kn = ov ? ov + "TransformStyle" : "transformStyle"));
    });
  var Ta = c((l5, dv) => {
    var nq = 4,
      iq = 0.001,
      oq = 1e-7,
      aq = 10,
      Ur = 11,
      $n = 1 / (Ur - 1),
      sq = typeof Float32Array == "function";
    function uv(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function cv(e, t) {
      return 3 * t - 6 * e;
    }
    function lv(e) {
      return 3 * e;
    }
    function Qn(e, t, r) {
      return ((uv(t, r) * e + cv(t, r)) * e + lv(t)) * e;
    }
    function fv(e, t, r) {
      return 3 * uv(t, r) * e * e + 2 * cv(t, r) * e + lv(t);
    }
    function uq(e, t, r, n, i) {
      var o,
        s,
        a = 0;
      do
        ((s = t + (r - t) / 2),
          (o = Qn(s, n, i) - e),
          o > 0 ? (r = s) : (t = s));
      while (Math.abs(o) > oq && ++a < aq);
      return s;
    }
    function cq(e, t, r, n) {
      for (var i = 0; i < nq; ++i) {
        var o = fv(t, r, n);
        if (o === 0) return t;
        var s = Qn(t, r, n) - e;
        t -= s / o;
      }
      return t;
    }
    dv.exports = function (t, r, n, i) {
      if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = sq ? new Float32Array(Ur) : new Array(Ur);
      if (t !== r || n !== i)
        for (var s = 0; s < Ur; ++s) o[s] = Qn(s * $n, t, n);
      function a(u) {
        for (var d = 0, h = 1, f = Ur - 1; h !== f && o[h] <= u; ++h) d += $n;
        --h;
        var m = (u - o[h]) / (o[h + 1] - o[h]),
          p = d + m * $n,
          g = fv(p, t, n);
        return g >= iq ? cq(u, p, t, n) : g === 0 ? p : uq(u, d, d + $n, t, n);
      }
      return function (d) {
        return t === r && n === i
          ? d
          : d === 0
            ? 0
            : d === 1
              ? 1
              : Qn(a(d), r, i);
      };
    };
  });
  var Wr = {};
  Ge(Wr, {
    bounce: () => Bq,
    bouncePast: () => jq,
    ease: () => lq,
    easeIn: () => fq,
    easeInOut: () => pq,
    easeOut: () => dq,
    inBack: () => Dq,
    inCirc: () => Nq,
    inCubic: () => yq,
    inElastic: () => Vq,
    inExpo: () => Cq,
    inOutBack: () => Gq,
    inOutCirc: () => qq,
    inOutCubic: () => Eq,
    inOutElastic: () => Hq,
    inOutExpo: () => Lq,
    inOutQuad: () => vq,
    inOutQuart: () => Iq,
    inOutQuint: () => xq,
    inOutSine: () => Sq,
    inQuad: () => hq,
    inQuart: () => _q,
    inQuint: () => Tq,
    inSine: () => Oq,
    outBack: () => Fq,
    outBounce: () => Mq,
    outCirc: () => Pq,
    outCubic: () => mq,
    outElastic: () => Uq,
    outExpo: () => Rq,
    outQuad: () => gq,
    outQuart: () => bq,
    outQuint: () => wq,
    outSine: () => Aq,
    swingFrom: () => kq,
    swingFromTo: () => Wq,
    swingTo: () => Xq,
  });
  function hq(e) {
    return Math.pow(e, 2);
  }
  function gq(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function vq(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function yq(e) {
    return Math.pow(e, 3);
  }
  function mq(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function Eq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function _q(e) {
    return Math.pow(e, 4);
  }
  function bq(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function Iq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function Tq(e) {
    return Math.pow(e, 5);
  }
  function wq(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function xq(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function Oq(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function Aq(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function Sq(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function Cq(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function Rq(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function Lq(e) {
    return e === 0
      ? 0
      : e === 1
        ? 1
        : (e /= 0.5) < 1
          ? 0.5 * Math.pow(2, 10 * (e - 1))
          : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function Nq(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function Pq(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function qq(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function Mq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function Dq(e) {
    let t = ht;
    return e * e * ((t + 1) * e - t);
  }
  function Fq(e) {
    let t = ht;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Gq(e) {
    let t = ht;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function Vq(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          -(
            n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r)
          ));
  }
  function Uq(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : e === 1
        ? 1
        : (r || (r = 0.3),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) +
            1);
  }
  function Hq(e) {
    let t = ht,
      r = 0,
      n = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
        ? 1
        : (r || (r = 0.3 * 1.5),
          n < 1
            ? ((n = 1), (t = r / 4))
            : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
          e < 1
            ? -0.5 *
              (n *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r))
            : n *
                Math.pow(2, -10 * (e -= 1)) *
                Math.sin(((e - t) * (2 * Math.PI)) / r) *
                0.5 +
              1);
  }
  function Wq(e) {
    let t = ht;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function kq(e) {
    let t = ht;
    return e * e * ((t + 1) * e - t);
  }
  function Xq(e) {
    let t = ht;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function Bq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
        ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
        : e < 2.5 / 2.75
          ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
          : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function jq(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
        ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
        : e < 2.5 / 2.75
          ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
          : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var Hr,
    ht,
    lq,
    fq,
    dq,
    pq,
    wa = ye(() => {
      "use strict";
      ((Hr = fe(Ta())),
        (ht = 1.70158),
        (lq = (0, Hr.default)(0.25, 0.1, 0.25, 1)),
        (fq = (0, Hr.default)(0.42, 0, 1, 1)),
        (dq = (0, Hr.default)(0, 0, 0.58, 1)),
        (pq = (0, Hr.default)(0.42, 0, 0.58, 1)));
    });
  var hv = {};
  Ge(hv, {
    applyEasing: () => Kq,
    createBezierEasing: () => zq,
    optimizeFloat: () => kr,
  });
  function kr(e, t = 5, r = 10) {
    let n = Math.pow(r, t),
      i = Number(Math.round(e * n) / n);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function zq(e) {
    return (0, pv.default)(...e);
  }
  function Kq(e, t, r) {
    return t === 0
      ? 0
      : t === 1
        ? 1
        : kr(r ? (t > 0 ? r(t) : t) : t > 0 && e && Wr[e] ? Wr[e](t) : t);
  }
  var pv,
    xa = ye(() => {
      "use strict";
      wa();
      pv = fe(Ta());
    });
  var yv = {};
  Ge(yv, {
    createElementState: () => vv,
    ixElements: () => uM,
    mergeActionState: () => Oa,
  });
  function vv(e, t, r, n, i) {
    let o =
      r === Yq ? (0, rr.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, rr.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
  }
  function Oa(e, t, r, n, i) {
    let o = lM(i);
    return (0, rr.mergeIn)(e, [t, sM, r], n, o);
  }
  function lM(e) {
    let { config: t } = e;
    return cM.reduce((r, n) => {
      let i = n[0],
        o = n[1],
        s = t[i],
        a = t[o];
      return (s != null && a != null && (r[o] = a), r);
    }, {});
  }
  var rr,
    d5,
    Yq,
    p5,
    $q,
    Qq,
    Zq,
    Jq,
    eM,
    tM,
    rM,
    nM,
    iM,
    oM,
    aM,
    gv,
    sM,
    uM,
    cM,
    mv = ye(() => {
      "use strict";
      rr = fe(zt());
      Ve();
      (({
        HTML_ELEMENT: d5,
        PLAIN_OBJECT: Yq,
        ABSTRACT_NODE: p5,
        CONFIG_X_VALUE: $q,
        CONFIG_Y_VALUE: Qq,
        CONFIG_Z_VALUE: Zq,
        CONFIG_VALUE: Jq,
        CONFIG_X_UNIT: eM,
        CONFIG_Y_UNIT: tM,
        CONFIG_Z_UNIT: rM,
        CONFIG_UNIT: nM,
      } = Re),
        ({
          IX2_SESSION_STOPPED: iM,
          IX2_INSTANCE_ADDED: oM,
          IX2_ELEMENT_STATE_CHANGED: aM,
        } = we),
        (gv = {}),
        (sM = "refState"),
        (uM = (e = gv, t = {}) => {
          switch (t.type) {
            case iM:
              return gv;
            case oM: {
              let {
                  elementId: r,
                  element: n,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, rr.getIn)(u, [r, n]) !== n && (u = vv(u, n, s, r, o)),
                Oa(u, r, a, i, o)
              );
            }
            case aM: {
              let {
                elementId: r,
                actionTypeId: n,
                current: i,
                actionItem: o,
              } = t.payload;
              return Oa(e, r, n, i, o);
            }
            default:
              return e;
          }
        }));
      cM = [
        [$q, eM],
        [Qq, tM],
        [Zq, rM],
        [Jq, nM],
      ];
    });
  var Ev = c((Ae) => {
    "use strict";
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    Ae.renderPlugin =
      Ae.getPluginOrigin =
      Ae.getPluginDuration =
      Ae.getPluginDestination =
      Ae.getPluginConfig =
      Ae.createPluginInstance =
      Ae.clearPlugin =
        void 0;
    var fM = (e) => e.value;
    Ae.getPluginConfig = fM;
    var dM = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    };
    Ae.getPluginDuration = dM;
    var pM = (e) => e || { value: 0 };
    Ae.getPluginOrigin = pM;
    var hM = (e) => ({ value: e.value });
    Ae.getPluginDestination = hM;
    var gM = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return (t.stop(), t.setSubframe(!0), t);
    };
    Ae.createPluginInstance = gM;
    var vM = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    };
    Ae.renderPlugin = vM;
    var yM = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
    Ae.clearPlugin = yM;
  });
  var bv = c((Se) => {
    "use strict";
    Object.defineProperty(Se, "__esModule", { value: !0 });
    Se.renderPlugin =
      Se.getPluginOrigin =
      Se.getPluginDuration =
      Se.getPluginDestination =
      Se.getPluginConfig =
      Se.createPluginInstance =
      Se.clearPlugin =
        void 0;
    var mM = (e) => document.querySelector(`[data-w-id="${e}"]`),
      EM = () => window.Webflow.require("spline"),
      _M = (e, t) => e.filter((r) => !t.includes(r)),
      bM = (e, t) => e.value[t];
    Se.getPluginConfig = bM;
    var IM = () => null;
    Se.getPluginDuration = IM;
    var _v = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      TM = (e, t) => {
        let r = t.config.value,
          n = Object.keys(r);
        if (e) {
          let o = Object.keys(e),
            s = _M(n, o);
          return s.length ? s.reduce((u, d) => ((u[d] = _v[d]), u), e) : e;
        }
        return n.reduce((o, s) => ((o[s] = _v[s]), o), {});
      };
    Se.getPluginOrigin = TM;
    var wM = (e) => e.value;
    Se.getPluginDestination = wM;
    var xM = (e, t) => {
      var r, n;
      let i =
        t == null ||
        (r = t.config) === null ||
        r === void 0 ||
        (n = r.target) === null ||
        n === void 0
          ? void 0
          : n.pluginElement;
      return i ? mM(i) : null;
    };
    Se.createPluginInstance = xM;
    var OM = (e, t, r) => {
      let n = EM(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        s = (a) => {
          if (!a) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && a.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: d } = t;
          (d.positionX != null && (u.position.x = d.positionX),
            d.positionY != null && (u.position.y = d.positionY),
            d.positionZ != null && (u.position.z = d.positionZ),
            d.rotationX != null && (u.rotation.x = d.rotationX),
            d.rotationY != null && (u.rotation.y = d.rotationY),
            d.rotationZ != null && (u.rotation.z = d.rotationZ),
            d.scaleX != null && (u.scale.x = d.scaleX),
            d.scaleY != null && (u.scale.y = d.scaleY),
            d.scaleZ != null && (u.scale.z = d.scaleZ));
        };
      i ? s(i.spline) : n.setLoadHandler(e, s);
    };
    Se.renderPlugin = OM;
    var AM = () => null;
    Se.clearPlugin = AM;
  });
  var Tv = c((xe) => {
    "use strict";
    Object.defineProperty(xe, "__esModule", { value: !0 });
    xe.getPluginOrigin =
      xe.getPluginDuration =
      xe.getPluginDestination =
      xe.getPluginConfig =
      xe.createPluginInstance =
      xe.clearPlugin =
        void 0;
    xe.normalizeColor = Iv;
    xe.renderPlugin = void 0;
    function Iv(e) {
      let t,
        r,
        n,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase();
      if (o.startsWith("#")) {
        let s = o.substring(1);
        s.length === 3
          ? ((t = parseInt(s[0] + s[0], 16)),
            (r = parseInt(s[1] + s[1], 16)),
            (n = parseInt(s[2] + s[2], 16)))
          : s.length === 6 &&
            ((t = parseInt(s.substring(0, 2), 16)),
            (r = parseInt(s.substring(2, 4), 16)),
            (n = parseInt(s.substring(4, 6), 16)));
      } else if (o.startsWith("rgba")) {
        let s = o.match(/rgba\(([^)]+)\)/)[1].split(",");
        ((t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10)),
          (i = parseFloat(s[3])));
      } else if (o.startsWith("rgb")) {
        let s = o.match(/rgb\(([^)]+)\)/)[1].split(",");
        ((t = parseInt(s[0], 10)),
          (r = parseInt(s[1], 10)),
          (n = parseInt(s[2], 10)));
      } else if (o.startsWith("hsla")) {
        let s = o.match(/hsla\(([^)]+)\)/)[1].split(","),
          a = parseFloat(s[0]),
          u = parseFloat(s[1].replace("%", "")) / 100,
          d = parseFloat(s[2].replace("%", "")) / 100;
        i = parseFloat(s[3]);
        let h = (1 - Math.abs(2 * d - 1)) * u,
          f = h * (1 - Math.abs(((a / 60) % 2) - 1)),
          m = d - h / 2,
          p,
          g,
          _;
        (a >= 0 && a < 60
          ? ((p = h), (g = f), (_ = 0))
          : a >= 60 && a < 120
            ? ((p = f), (g = h), (_ = 0))
            : a >= 120 && a < 180
              ? ((p = 0), (g = h), (_ = f))
              : a >= 180 && a < 240
                ? ((p = 0), (g = f), (_ = h))
                : a >= 240 && a < 300
                  ? ((p = f), (g = 0), (_ = h))
                  : ((p = h), (g = 0), (_ = f)),
          (t = Math.round((p + m) * 255)),
          (r = Math.round((g + m) * 255)),
          (n = Math.round((_ + m) * 255)));
      } else if (o.startsWith("hsl")) {
        let s = o.match(/hsl\(([^)]+)\)/)[1].split(","),
          a = parseFloat(s[0]),
          u = parseFloat(s[1].replace("%", "")) / 100,
          d = parseFloat(s[2].replace("%", "")) / 100,
          h = (1 - Math.abs(2 * d - 1)) * u,
          f = h * (1 - Math.abs(((a / 60) % 2) - 1)),
          m = d - h / 2,
          p,
          g,
          _;
        (a >= 0 && a < 60
          ? ((p = h), (g = f), (_ = 0))
          : a >= 60 && a < 120
            ? ((p = f), (g = h), (_ = 0))
            : a >= 120 && a < 180
              ? ((p = 0), (g = h), (_ = f))
              : a >= 180 && a < 240
                ? ((p = 0), (g = f), (_ = h))
                : a >= 240 && a < 300
                  ? ((p = f), (g = 0), (_ = h))
                  : ((p = h), (g = 0), (_ = f)),
          (t = Math.round((p + m) * 255)),
          (r = Math.round((g + m) * 255)),
          (n = Math.round((_ + m) * 255)));
      }
      return (
        (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n)) && `${e}`,
        { red: t, green: r, blue: n, alpha: i }
      );
    }
    var SM = (e, t) => e.value[t];
    xe.getPluginConfig = SM;
    var CM = () => null;
    xe.getPluginDuration = CM;
    var RM = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null) return Iv(i);
    };
    xe.getPluginOrigin = RM;
    var LM = (e) => e.value;
    xe.getPluginDestination = LM;
    var NM = () => null;
    xe.createPluginInstance = NM;
    var PM = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: s, red: a, green: u, blue: d, alpha: h } = o,
        f;
      (s != null && (f = s + i),
        a != null &&
          d != null &&
          u != null &&
          h != null &&
          (f = `rgba(${a}, ${u}, ${d}, ${h})`),
        f != null && document.documentElement.style.setProperty(n, f));
    };
    xe.renderPlugin = PM;
    var qM = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
    xe.clearPlugin = qM;
  });
  var wv = c((Zn) => {
    "use strict";
    var Sa = fn().default;
    Object.defineProperty(Zn, "__esModule", { value: !0 });
    Zn.pluginMethodMap = void 0;
    var Aa = (Ve(), nt(Rf)),
      MM = Sa(Ev()),
      DM = Sa(bv()),
      FM = Sa(Tv()),
      y5 = (Zn.pluginMethodMap = new Map([
        [Aa.ActionTypeConsts.PLUGIN_LOTTIE, { ...MM }],
        [Aa.ActionTypeConsts.PLUGIN_SPLINE, { ...DM }],
        [Aa.ActionTypeConsts.PLUGIN_VARIABLE, { ...FM }],
      ]));
  });
  var xv = {};
  Ge(xv, {
    clearPlugin: () => qa,
    createPluginInstance: () => VM,
    getPluginConfig: () => Ra,
    getPluginDestination: () => Na,
    getPluginDuration: () => GM,
    getPluginOrigin: () => La,
    isPluginType: () => qt,
    renderPlugin: () => Pa,
  });
  function qt(e) {
    return Ca.pluginMethodMap.has(e);
  }
  var Ca,
    Mt,
    Ra,
    La,
    GM,
    Na,
    VM,
    Pa,
    qa,
    Ma = ye(() => {
      "use strict";
      Yn();
      Ca = fe(wv());
      ((Mt = (e) => (t) => {
        if (!et) return () => null;
        let r = Ca.pluginMethodMap.get(t);
        if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
        let n = r[e];
        if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
        return n;
      }),
        (Ra = Mt("getPluginConfig")),
        (La = Mt("getPluginOrigin")),
        (GM = Mt("getPluginDuration")),
        (Na = Mt("getPluginDestination")),
        (VM = Mt("createPluginInstance")),
        (Pa = Mt("renderPlugin")),
        (qa = Mt("clearPlugin")));
    });
  var Av = c((_5, Ov) => {
    function UM(e, t) {
      return e == null || e !== e ? t : e;
    }
    Ov.exports = UM;
  });
  var Cv = c((b5, Sv) => {
    function HM(e, t, r, n) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
      return r;
    }
    Sv.exports = HM;
  });
  var Lv = c((I5, Rv) => {
    function WM(e) {
      return function (t, r, n) {
        for (var i = -1, o = Object(t), s = n(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (r(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Rv.exports = WM;
  });
  var Pv = c((T5, Nv) => {
    var kM = Lv(),
      XM = kM();
    Nv.exports = XM;
  });
  var Da = c((w5, qv) => {
    var BM = Pv(),
      jM = Fr();
    function zM(e, t) {
      return e && BM(e, t, jM);
    }
    qv.exports = zM;
  });
  var Dv = c((x5, Mv) => {
    var KM = Nt();
    function YM(e, t) {
      return function (r, n) {
        if (r == null) return r;
        if (!KM(r)) return e(r, n);
        for (
          var i = r.length, o = t ? i : -1, s = Object(r);
          (t ? o-- : ++o < i) && n(s[o], o, s) !== !1;

        );
        return r;
      };
    }
    Mv.exports = YM;
  });
  var Fa = c((O5, Fv) => {
    var $M = Da(),
      QM = Dv(),
      ZM = QM($M);
    Fv.exports = ZM;
  });
  var Vv = c((A5, Gv) => {
    function JM(e, t, r, n, i) {
      return (
        i(e, function (o, s, a) {
          r = n ? ((n = !1), o) : t(r, o, s, a);
        }),
        r
      );
    }
    Gv.exports = JM;
  });
  var Hv = c((S5, Uv) => {
    var e1 = Cv(),
      t1 = Fa(),
      r1 = wt(),
      n1 = Vv(),
      i1 = Oe();
    function o1(e, t, r) {
      var n = i1(e) ? e1 : n1,
        i = arguments.length < 3;
      return n(e, r1(t, 4), r, i, t1);
    }
    Uv.exports = o1;
  });
  var kv = c((C5, Wv) => {
    var a1 = Ea(),
      s1 = wt(),
      u1 = _a(),
      c1 = Math.max,
      l1 = Math.min;
    function f1(e, t, r) {
      var n = e == null ? 0 : e.length;
      if (!n) return -1;
      var i = n - 1;
      return (
        r !== void 0 &&
          ((i = u1(r)), (i = r < 0 ? c1(n + i, 0) : l1(i, n - 1))),
        a1(e, s1(t, 3), i, !0)
      );
    }
    Wv.exports = f1;
  });
  var Bv = c((R5, Xv) => {
    var d1 = ma(),
      p1 = kv(),
      h1 = d1(p1);
    Xv.exports = h1;
  });
  function jv(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function v1(e, t) {
    if (jv(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (let i = 0; i < r.length; i++)
      if (!g1.call(t, r[i]) || !jv(e[r[i]], t[r[i]])) return !1;
    return !0;
  }
  var g1,
    Ga,
    zv = ye(() => {
      "use strict";
      g1 = Object.prototype.hasOwnProperty;
      Ga = v1;
    });
  var ly = {};
  Ge(ly, {
    cleanupHTMLElement: () => pD,
    clearAllStyles: () => dD,
    clearObjectCache: () => P1,
    getActionListProgress: () => gD,
    getAffectedElements: () => ka,
    getComputedStyle: () => H1,
    getDestinationValues: () => K1,
    getElementId: () => F1,
    getInstanceId: () => M1,
    getInstanceOrigin: () => X1,
    getItemConfigByKey: () => z1,
    getMaxDurationItemIndex: () => cy,
    getNamespacedParameterId: () => mD,
    getRenderType: () => ay,
    getStyleProp: () => Y1,
    mediaQueriesEqual: () => _D,
    observeStore: () => U1,
    reduceListToGroup: () => vD,
    reifyState: () => G1,
    renderHTMLElement: () => $1,
    shallowEqual: () => Ga,
    shouldAllowMediaQuery: () => ED,
    shouldNamespaceEventParameter: () => yD,
    stringifyTarget: () => bD,
  });
  function P1() {
    Jn.clear();
  }
  function M1() {
    return "i" + q1++;
  }
  function F1(e, t) {
    for (let r in e) {
      let n = e[r];
      if (n && n.ref === t) return n.id;
    }
    return "e" + D1++;
  }
  function G1({ events: e, actionLists: t, site: r } = {}) {
    let n = (0, ni.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return (s[u] || (s[u] = {}), (s[u][a.id] = a), s);
        },
        {},
      ),
      i = r && r.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: n,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function U1({ store: e, select: t, onChange: r, comparator: n = V1 }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let d = t(i());
      if (d == null) {
        s();
        return;
      }
      n(d, a) || ((a = d), r(a, e));
    }
    return s;
  }
  function $v(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: r,
        objectId: n,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function ka({
    config: e,
    event: t,
    eventTarget: r,
    elementRoot: n,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (D, x) =>
          D.concat(
            ka({
              config: { target: x },
              event: t,
              eventTarget: r,
              elementRoot: n,
              elementApi: i,
            }),
          ),
        [],
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: d,
        getSiblingElements: h,
        matchSelector: f,
        elementContains: m,
        isSiblingNode: p,
      } = i,
      { target: g } = e;
    if (!g) return [];
    let {
      id: _,
      objectId: O,
      selector: w,
      selectorGuids: R,
      appliesTo: A,
      useEventTarget: N,
    } = $v(g);
    if (O) return [Jn.has(O) ? Jn.get(O) : Jn.set(O, {}).get(O)];
    if (A === ko.PAGE) {
      let D = s(_);
      return D ? [D] : [];
    }
    let L = (t?.action?.config?.affectedElements ?? {})[_ || w] || {},
      X = !!(L.id || L.selector),
      B,
      j,
      Z,
      ie = t && a($v(t.target));
    if (
      (X
        ? ((B = L.limitAffectedElements), (j = ie), (Z = a(L)))
        : (j = Z = a({ id: _, selector: w, selectorGuids: R })),
      t && N)
    ) {
      let D = r && (Z || N === !0) ? [r] : u(ie);
      if (Z) {
        if (N === R1) return u(Z).filter((x) => D.some((q) => m(x, q)));
        if (N === Kv) return u(Z).filter((x) => D.some((q) => m(q, x)));
        if (N === Yv) return u(Z).filter((x) => D.some((q) => p(q, x)));
      }
      return D;
    }
    return j == null || Z == null
      ? []
      : et && n
        ? u(Z).filter((D) => n.contains(D))
        : B === Kv
          ? u(j, Z)
          : B === C1
            ? d(u(j)).filter(f(Z))
            : B === Yv
              ? h(u(j)).filter(f(Z))
              : u(Z);
  }
  function H1({ element: e, actionItem: t }) {
    if (!et) return {};
    let { actionTypeId: r } = t;
    switch (r) {
      case sr:
      case ur:
      case cr:
      case lr:
      case oi:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function X1(e, t = {}, r = {}, n, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = n;
    if (qt(s)) return La(s)(t[s], n);
    switch (n.actionTypeId) {
      case ir:
      case or:
      case ar:
      case zr:
        return t[n.actionTypeId] || Xa[n.actionTypeId];
      case Kr:
        return W1(t[n.actionTypeId], n.config.filters);
      case Yr:
        return k1(t[n.actionTypeId], n.config.fontVariations);
      case ny:
        return { value: (0, gt.default)(parseFloat(o(e, ti)), 1) };
      case sr: {
        let a = o(e, ct),
          u = o(e, lt),
          d,
          h;
        return (
          n.config.widthUnit === Ot
            ? (d = Qv.test(a) ? parseFloat(a) : parseFloat(r.width))
            : (d = (0, gt.default)(parseFloat(a), parseFloat(r.width))),
          n.config.heightUnit === Ot
            ? (h = Qv.test(u) ? parseFloat(u) : parseFloat(r.height))
            : (h = (0, gt.default)(parseFloat(u), parseFloat(r.height))),
          { widthValue: d, heightValue: h }
        );
      }
      case ur:
      case cr:
      case lr:
        return cD({
          element: e,
          actionTypeId: n.actionTypeId,
          computedStyle: r,
          getStyle: o,
        });
      case oi:
        return { value: (0, gt.default)(o(e, ri), r.display) };
      case N1:
        return t[n.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function K1({ element: e, actionItem: t, elementApi: r }) {
    if (qt(t.actionTypeId)) return Na(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case ir:
      case or:
      case ar:
      case zr: {
        let { xValue: n, yValue: i, zValue: o } = t.config;
        return { xValue: n, yValue: i, zValue: o };
      }
      case sr: {
        let { getStyle: n, setStyle: i, getProperty: o } = r,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: d } = t.config;
        if (!et) return { widthValue: u, heightValue: d };
        if (s === Ot) {
          let h = n(e, ct);
          (i(e, ct, ""), (u = o(e, "offsetWidth")), i(e, ct, h));
        }
        if (a === Ot) {
          let h = n(e, lt);
          (i(e, lt, ""), (d = o(e, "offsetHeight")), i(e, lt, h));
        }
        return { widthValue: u, heightValue: d };
      }
      case ur:
      case cr:
      case lr: {
        let { rValue: n, gValue: i, bValue: o, aValue: s } = t.config;
        return { rValue: n, gValue: i, bValue: o, aValue: s };
      }
      case Kr:
        return t.config.filters.reduce(B1, {});
      case Yr:
        return t.config.fontVariations.reduce(j1, {});
      default: {
        let { value: n } = t.config;
        return { value: n };
      }
    }
  }
  function ay(e) {
    if (/^TRANSFORM_/.test(e)) return ty;
    if (/^STYLE_/.test(e)) return Ha;
    if (/^GENERAL_/.test(e)) return Ua;
    if (/^PLUGIN_/.test(e)) return ry;
  }
  function Y1(e, t) {
    return e === Ha ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function $1(e, t, r, n, i, o, s, a, u) {
    switch (a) {
      case ty:
        return tD(e, t, r, i, s);
      case Ha:
        return lD(e, t, r, i, o, s);
      case Ua:
        return fD(e, i, s);
      case ry: {
        let { actionTypeId: d } = i;
        if (qt(d)) return Pa(d)(u, t, i);
      }
    }
  }
  function tD(e, t, r, n, i) {
    let o = eD
        .map((a) => {
          let u = Xa[a],
            {
              xValue: d = u.xValue,
              yValue: h = u.yValue,
              zValue: f = u.zValue,
              xUnit: m = "",
              yUnit: p = "",
              zUnit: g = "",
            } = t[a] || {};
          switch (a) {
            case ir:
              return `${E1}(${d}${m}, ${h}${p}, ${f}${g})`;
            case or:
              return `${_1}(${d}${m}, ${h}${p}, ${f}${g})`;
            case ar:
              return `${b1}(${d}${m}) ${I1}(${h}${p}) ${T1}(${f}${g})`;
            case zr:
              return `${w1}(${d}${m}, ${h}${p})`;
            default:
              return "";
          }
        })
        .join(" "),
      { setStyle: s } = i;
    (Dt(e, xt, i), s(e, xt, o), iD(n, r) && s(e, Kn, x1));
  }
  function rD(e, t, r, n) {
    let i = (0, ni.default)(t, (s, a, u) => `${s} ${u}(${a}${J1(u, r)})`, ""),
      { setStyle: o } = n;
    (Dt(e, Xr, n), o(e, Xr, i));
  }
  function nD(e, t, r, n) {
    let i = (0, ni.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        [],
      ).join(", "),
      { setStyle: o } = n;
    (Dt(e, Br, n), o(e, Br, i));
  }
  function iD({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
    return (
      (e === ir && n !== void 0) ||
      (e === or && n !== void 0) ||
      (e === ar && (t !== void 0 || r !== void 0))
    );
  }
  function uD(e, t) {
    let r = e.exec(t);
    return r ? r[1] : "";
  }
  function cD({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
    let i = Wa[t],
      o = n(e, i),
      s = aD.test(o) ? o : r[i],
      a = uD(sD, s).split(jr);
    return {
      rValue: (0, gt.default)(parseInt(a[0], 10), 255),
      gValue: (0, gt.default)(parseInt(a[1], 10), 255),
      bValue: (0, gt.default)(parseInt(a[2], 10), 255),
      aValue: (0, gt.default)(parseFloat(a[3]), 1),
    };
  }
  function lD(e, t, r, n, i, o) {
    let { setStyle: s } = o;
    switch (n.actionTypeId) {
      case sr: {
        let { widthUnit: a = "", heightUnit: u = "" } = n.config,
          { widthValue: d, heightValue: h } = r;
        (d !== void 0 &&
          (a === Ot && (a = "px"), Dt(e, ct, o), s(e, ct, d + a)),
          h !== void 0 &&
            (u === Ot && (u = "px"), Dt(e, lt, o), s(e, lt, h + u)));
        break;
      }
      case Kr: {
        rD(e, r, n.config, o);
        break;
      }
      case Yr: {
        nD(e, r, n.config, o);
        break;
      }
      case ur:
      case cr:
      case lr: {
        let a = Wa[n.actionTypeId],
          u = Math.round(r.rValue),
          d = Math.round(r.gValue),
          h = Math.round(r.bValue),
          f = r.aValue;
        (Dt(e, a, o),
          s(
            e,
            a,
            f >= 1 ? `rgb(${u},${d},${h})` : `rgba(${u},${d},${h},${f})`,
          ));
        break;
      }
      default: {
        let { unit: a = "" } = n.config;
        (Dt(e, i, o), s(e, i, r.value + a));
        break;
      }
    }
  }
  function fD(e, t, r) {
    let { setStyle: n } = r;
    switch (t.actionTypeId) {
      case oi: {
        let { value: i } = t.config;
        i === O1 && et ? n(e, ri, Ia) : n(e, ri, i);
        return;
      }
    }
  }
  function Dt(e, t, r) {
    if (!et) return;
    let n = oy[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, nr);
    if (!s) {
      o(e, nr, n);
      return;
    }
    let a = s.split(jr).map(iy);
    a.indexOf(n) === -1 && o(e, nr, a.concat(n).join(jr));
  }
  function sy(e, t, r) {
    if (!et) return;
    let n = oy[t];
    if (!n) return;
    let { getStyle: i, setStyle: o } = r,
      s = i(e, nr);
    !s ||
      s.indexOf(n) === -1 ||
      o(
        e,
        nr,
        s
          .split(jr)
          .map(iy)
          .filter((a) => a !== n)
          .join(jr),
      );
  }
  function dD({ store: e, elementApi: t }) {
    let { ixData: r } = e.getState(),
      { events: n = {}, actionLists: i = {} } = r;
    (Object.keys(n).forEach((o) => {
      let s = n[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        d = i[u];
      d && Zv({ actionList: d, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Zv({ actionList: i[o], elementApi: t });
      }));
  }
  function Zv({ actionList: e = {}, event: t, elementApi: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e;
    (n &&
      n.forEach((o) => {
        Jv({ actionGroup: o, event: t, elementApi: r });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Jv({ actionGroup: a, event: t, elementApi: r });
          });
        }));
  }
  function Jv({ actionGroup: e, event: t, elementApi: r }) {
    let { actionItems: n } = e;
    n.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      (qt(o)
        ? (a = (u) => qa(o)(u, i))
        : (a = uy({ effect: hD, actionTypeId: o, elementApi: r })),
        ka({ config: s, event: t, elementApi: r }).forEach(a));
    });
  }
  function pD(e, t, r) {
    let { setStyle: n, getStyle: i } = r,
      { actionTypeId: o } = t;
    if (o === sr) {
      let { config: s } = t;
      (s.widthUnit === Ot && n(e, ct, ""), s.heightUnit === Ot && n(e, lt, ""));
    }
    i(e, nr) && uy({ effect: sy, actionTypeId: o, elementApi: r })(e);
  }
  function hD(e, t, r) {
    let { setStyle: n } = r;
    (sy(e, t, r), n(e, t, ""), t === xt && n(e, Kn, ""));
  }
  function cy(e) {
    let t = 0,
      r = 0;
    return (
      e.forEach((n, i) => {
        let { config: o } = n,
          s = o.delay + o.duration;
        s >= t && ((t = s), (r = i));
      }),
      r
    );
  }
  function gD(e, t) {
    let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      r.forEach((u, d) => {
        if (n && d === 0) return;
        let { actionItems: h } = u,
          f = h[cy(h)],
          { config: m, actionTypeId: p } = f;
        i.id === f.id && (a = s + o);
        let g = ay(p) === Ua ? 0 : m.duration;
        s += m.delay + g;
      }),
      s > 0 ? kr(a / s) : 0
    );
  }
  function vD({ actionList: e, actionItemId: t, rawData: r }) {
    let { actionItemGroups: n, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, ii.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      n && n.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: d }) => d.some(s));
        }),
      (0, ii.setIn)(r, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function yD(e, { basedOn: t }) {
    return (
      (e === Je.SCROLLING_IN_VIEW && (t === st.ELEMENT || t == null)) ||
      (e === Je.MOUSE_MOVE && t === st.ELEMENT)
    );
  }
  function mD(e, t) {
    return e + L1 + t;
  }
  function ED(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function _D(e, t) {
    return Ga(e && e.sort(), t && t.sort());
  }
  function bD(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + Va + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
    return t + Va + r + Va + n;
  }
  var gt,
    ni,
    ei,
    ii,
    y1,
    m1,
    E1,
    _1,
    b1,
    I1,
    T1,
    w1,
    x1,
    O1,
    ti,
    Xr,
    Br,
    ct,
    lt,
    ey,
    A1,
    S1,
    Kv,
    C1,
    Yv,
    R1,
    ri,
    nr,
    Ot,
    jr,
    L1,
    Va,
    ty,
    Ua,
    Ha,
    ry,
    ir,
    or,
    ar,
    zr,
    ny,
    Kr,
    Yr,
    sr,
    ur,
    cr,
    lr,
    oi,
    N1,
    iy,
    Wa,
    oy,
    Jn,
    q1,
    D1,
    V1,
    Qv,
    W1,
    k1,
    B1,
    j1,
    z1,
    Xa,
    Q1,
    Z1,
    J1,
    eD,
    oD,
    aD,
    sD,
    uy,
    fy = ye(() => {
      "use strict";
      ((gt = fe(Av())), (ni = fe(Hv())), (ei = fe(Bv())), (ii = fe(zt())));
      Ve();
      zv();
      xa();
      Ma();
      Yn();
      (({
        BACKGROUND: y1,
        TRANSFORM: m1,
        TRANSLATE_3D: E1,
        SCALE_3D: _1,
        ROTATE_X: b1,
        ROTATE_Y: I1,
        ROTATE_Z: T1,
        SKEW: w1,
        PRESERVE_3D: x1,
        FLEX: O1,
        OPACITY: ti,
        FILTER: Xr,
        FONT_VARIATION_SETTINGS: Br,
        WIDTH: ct,
        HEIGHT: lt,
        BACKGROUND_COLOR: ey,
        BORDER_COLOR: A1,
        COLOR: S1,
        CHILDREN: Kv,
        IMMEDIATE_CHILDREN: C1,
        SIBLINGS: Yv,
        PARENT: R1,
        DISPLAY: ri,
        WILL_CHANGE: nr,
        AUTO: Ot,
        COMMA_DELIMITER: jr,
        COLON_DELIMITER: L1,
        BAR_DELIMITER: Va,
        RENDER_TRANSFORM: ty,
        RENDER_GENERAL: Ua,
        RENDER_STYLE: Ha,
        RENDER_PLUGIN: ry,
      } = Re),
        ({
          TRANSFORM_MOVE: ir,
          TRANSFORM_SCALE: or,
          TRANSFORM_ROTATE: ar,
          TRANSFORM_SKEW: zr,
          STYLE_OPACITY: ny,
          STYLE_FILTER: Kr,
          STYLE_FONT_VARIATION: Yr,
          STYLE_SIZE: sr,
          STYLE_BACKGROUND_COLOR: ur,
          STYLE_BORDER: cr,
          STYLE_TEXT_COLOR: lr,
          GENERAL_DISPLAY: oi,
          OBJECT_VALUE: N1,
        } = Xe),
        (iy = (e) => e.trim()),
        (Wa = Object.freeze({ [ur]: ey, [cr]: A1, [lr]: S1 })),
        (oy = Object.freeze({
          [xt]: m1,
          [ey]: y1,
          [ti]: ti,
          [Xr]: Xr,
          [ct]: ct,
          [lt]: lt,
          [Br]: Br,
        })),
        (Jn = new Map()));
      q1 = 1;
      D1 = 1;
      V1 = (e, t) => e === t;
      ((Qv = /px/),
        (W1 = (e, t) =>
          t.reduce(
            (r, n) => (r[n.type] == null && (r[n.type] = Q1[n.type]), r),
            e || {},
          )),
        (k1 = (e, t) =>
          t.reduce(
            (r, n) => (
              r[n.type] == null &&
                (r[n.type] = Z1[n.type] || n.defaultValue || 0),
              r
            ),
            e || {},
          )));
      ((B1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (j1 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (z1 = (e, t, r) => {
          if (qt(e)) return Ra(e)(r, t);
          switch (e) {
            case Kr: {
              let n = (0, ei.default)(r.filters, ({ type: i }) => i === t);
              return n ? n.value : 0;
            }
            case Yr: {
              let n = (0, ei.default)(
                r.fontVariations,
                ({ type: i }) => i === t,
              );
              return n ? n.value : 0;
            }
            default:
              return r[t];
          }
        }));
      ((Xa = {
        [ir]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [or]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [ar]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [zr]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (Q1 = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (Z1 = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (J1 = (e, t) => {
          let r = (0, ei.default)(t.filters, ({ type: n }) => n === e);
          if (r && r.unit) return r.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (eD = Object.keys(Xa)));
      ((oD = "\\(([^)]+)\\)"), (aD = /^rgb/), (sD = RegExp(`rgba?${oD}`)));
      uy =
        ({ effect: e, actionTypeId: t, elementApi: r }) =>
        (n) => {
          switch (t) {
            case ir:
            case or:
            case ar:
            case zr:
              e(n, xt, r);
              break;
            case Kr:
              e(n, Xr, r);
              break;
            case Yr:
              e(n, Br, r);
              break;
            case ny:
              e(n, ti, r);
              break;
            case sr:
              (e(n, ct, r), e(n, lt, r));
              break;
            case ur:
            case cr:
            case lr:
              e(n, Wa[t], r);
              break;
            case oi:
              e(n, ri, r);
              break;
          }
        };
    });
  var Ft = c((qe) => {
    "use strict";
    var fr = fn().default;
    Object.defineProperty(qe, "__esModule", { value: !0 });
    qe.IX2VanillaUtils =
      qe.IX2VanillaPlugins =
      qe.IX2ElementsReducer =
      qe.IX2Easings =
      qe.IX2EasingUtils =
      qe.IX2BrowserSupport =
        void 0;
    var ID = fr((Yn(), nt(sv)));
    qe.IX2BrowserSupport = ID;
    var TD = fr((wa(), nt(Wr)));
    qe.IX2Easings = TD;
    var wD = fr((xa(), nt(hv)));
    qe.IX2EasingUtils = wD;
    var xD = fr((mv(), nt(yv)));
    qe.IX2ElementsReducer = xD;
    var OD = fr((Ma(), nt(xv)));
    qe.IX2VanillaPlugins = OD;
    var AD = fr((fy(), nt(ly)));
    qe.IX2VanillaUtils = AD;
  });
  var si,
    vt,
    SD,
    CD,
    RD,
    LD,
    ND,
    PD,
    ai,
    dy,
    qD,
    MD,
    Ba,
    DD,
    FD,
    GD,
    VD,
    py,
    hy = ye(() => {
      "use strict";
      Ve();
      ((si = fe(Ft())),
        (vt = fe(zt())),
        ({
          IX2_RAW_DATA_IMPORTED: SD,
          IX2_SESSION_STOPPED: CD,
          IX2_INSTANCE_ADDED: RD,
          IX2_INSTANCE_STARTED: LD,
          IX2_INSTANCE_REMOVED: ND,
          IX2_ANIMATION_FRAME_CHANGED: PD,
        } = we),
        ({
          optimizeFloat: ai,
          applyEasing: dy,
          createBezierEasing: qD,
        } = si.IX2EasingUtils),
        ({ RENDER_GENERAL: MD } = Re),
        ({
          getItemConfigByKey: Ba,
          getRenderType: DD,
          getStyleProp: FD,
        } = si.IX2VanillaUtils),
        (GD = (e, t) => {
          let {
              position: r,
              parameterId: n,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: d,
              skipMotion: h,
              skipToValue: f,
            } = e,
            { parameters: m } = t.payload,
            p = Math.max(1 - s, 0.01),
            g = m[n];
          g == null && ((p = 1), (g = a));
          let _ = Math.max(g, 0) || 0,
            O = ai(_ - r),
            w = h ? f : ai(r + O * p),
            R = w * 100;
          if (w === r && e.current) return e;
          let A, N, P, L;
          for (let B = 0, { length: j } = i; B < j; B++) {
            let { keyframe: Z, actionItems: ie } = i[B];
            if ((B === 0 && (A = ie[0]), R >= Z)) {
              A = ie[0];
              let D = i[B + 1],
                x = D && R !== Z;
              ((N = x ? D.actionItems[0] : null),
                x && ((P = Z / 100), (L = (D.keyframe - Z) / 100)));
            }
          }
          let X = {};
          if (A && !N)
            for (let B = 0, { length: j } = o; B < j; B++) {
              let Z = o[B];
              X[Z] = Ba(u, Z, A.config);
            }
          else if (A && N && P !== void 0 && L !== void 0) {
            let B = (w - P) / L,
              j = A.config.easing,
              Z = dy(j, B, d);
            for (let ie = 0, { length: D } = o; ie < D; ie++) {
              let x = o[ie],
                q = Ba(u, x, A.config),
                J = (Ba(u, x, N.config) - q) * Z + q;
              X[x] = J;
            }
          }
          return (0, vt.merge)(e, { position: w, current: X });
        }),
        (VD = (e, t) => {
          let {
              active: r,
              origin: n,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: d,
              destinationKeys: h,
              pluginDuration: f,
              instanceDelay: m,
              customEasingFn: p,
              skipMotion: g,
            } = e,
            _ = u.config.easing,
            { duration: O, delay: w } = u.config;
          (f != null && (O = f),
            (w = m ?? w),
            s === MD ? (O = 0) : (o || g) && (O = w = 0));
          let { now: R } = t.payload;
          if (r && n) {
            let A = R - (i + w);
            if (a) {
              let B = R - i,
                j = O + w,
                Z = ai(Math.min(Math.max(0, B / j), 1));
              e = (0, vt.set)(e, "verboseTimeElapsed", j * Z);
            }
            if (A < 0) return e;
            let N = ai(Math.min(Math.max(0, A / O), 1)),
              P = dy(_, N, p),
              L = {},
              X = null;
            return (
              h.length &&
                (X = h.reduce((B, j) => {
                  let Z = d[j],
                    ie = parseFloat(n[j]) || 0,
                    x = (parseFloat(Z) - ie) * P + ie;
                  return ((B[j] = x), B);
                }, {})),
              (L.current = X),
              (L.position = N),
              N === 1 && ((L.active = !1), (L.complete = !0)),
              (0, vt.merge)(e, L)
            );
          }
          return e;
        }),
        (py = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case SD:
              return t.payload.ixInstances || Object.freeze({});
            case CD:
              return Object.freeze({});
            case RD: {
              let {
                  instanceId: r,
                  elementId: n,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: d,
                  isCarrier: h,
                  origin: f,
                  destination: m,
                  immediate: p,
                  verbose: g,
                  continuous: _,
                  parameterId: O,
                  actionGroups: w,
                  smoothing: R,
                  restingValue: A,
                  pluginInstance: N,
                  pluginDuration: P,
                  instanceDelay: L,
                  skipMotion: X,
                  skipToValue: B,
                } = t.payload,
                { actionTypeId: j } = i,
                Z = DD(j),
                ie = FD(Z, j),
                D = Object.keys(m).filter(
                  (q) => m[q] != null && typeof m[q] != "string",
                ),
                { easing: x } = i.config;
              return (0, vt.set)(e, r, {
                id: r,
                elementId: n,
                active: !1,
                position: 0,
                start: 0,
                origin: f,
                destination: m,
                destinationKeys: D,
                immediate: p,
                verbose: g,
                current: null,
                actionItem: i,
                actionTypeId: j,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: d,
                renderType: Z,
                isCarrier: h,
                styleProp: ie,
                continuous: _,
                parameterId: O,
                actionGroups: w,
                smoothing: R,
                restingValue: A,
                pluginInstance: N,
                pluginDuration: P,
                instanceDelay: L,
                skipMotion: X,
                skipToValue: B,
                customEasingFn:
                  Array.isArray(x) && x.length === 4 ? qD(x) : void 0,
              });
            }
            case LD: {
              let { instanceId: r, time: n } = t.payload;
              return (0, vt.mergeIn)(e, [r], {
                active: !0,
                complete: !1,
                start: n,
              });
            }
            case ND: {
              let { instanceId: r } = t.payload;
              if (!e[r]) return e;
              let n = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== r && (n[a] = e[a]);
              }
              return n;
            }
            case PD: {
              let r = e,
                n = Object.keys(e),
                { length: i } = n;
              for (let o = 0; o < i; o++) {
                let s = n[o],
                  a = e[s],
                  u = a.continuous ? GD : VD;
                r = (0, vt.set)(r, s, u(a, t));
              }
              return r;
            }
            default:
              return e;
          }
        }));
    });
  var UD,
    HD,
    WD,
    gy,
    vy = ye(() => {
      "use strict";
      Ve();
      (({
        IX2_RAW_DATA_IMPORTED: UD,
        IX2_SESSION_STOPPED: HD,
        IX2_PARAMETER_CHANGED: WD,
      } = we),
        (gy = (e = {}, t) => {
          switch (t.type) {
            case UD:
              return t.payload.ixParameters || {};
            case HD:
              return {};
            case WD: {
              let { key: r, value: n } = t.payload;
              return ((e[r] = n), e);
            }
            default:
              return e;
          }
        }));
    });
  var Ey = {};
  Ge(Ey, { default: () => XD });
  var yy,
    my,
    kD,
    XD,
    _y = ye(() => {
      "use strict";
      yy = fe(Wo());
      Nf();
      Jf();
      rd();
      my = fe(Ft());
      hy();
      vy();
      (({ ixElements: kD } = my.IX2ElementsReducer),
        (XD = (0, yy.combineReducers)({
          ixData: Lf,
          ixRequest: Zf,
          ixSession: td,
          ixElements: kD,
          ixInstances: py,
          ixParameters: gy,
        })));
    });
  var Iy = c((z5, by) => {
    var BD = It(),
      jD = Oe(),
      zD = pt(),
      KD = "[object String]";
    function YD(e) {
      return typeof e == "string" || (!jD(e) && zD(e) && BD(e) == KD);
    }
    by.exports = YD;
  });
  var wy = c((K5, Ty) => {
    var $D = ya(),
      QD = $D("length");
    Ty.exports = QD;
  });
  var Oy = c((Y5, xy) => {
    var ZD = "\\ud800-\\udfff",
      JD = "\\u0300-\\u036f",
      eF = "\\ufe20-\\ufe2f",
      tF = "\\u20d0-\\u20ff",
      rF = JD + eF + tF,
      nF = "\\ufe0e\\ufe0f",
      iF = "\\u200d",
      oF = RegExp("[" + iF + ZD + rF + nF + "]");
    function aF(e) {
      return oF.test(e);
    }
    xy.exports = aF;
  });
  var My = c(($5, qy) => {
    var Sy = "\\ud800-\\udfff",
      sF = "\\u0300-\\u036f",
      uF = "\\ufe20-\\ufe2f",
      cF = "\\u20d0-\\u20ff",
      lF = sF + uF + cF,
      fF = "\\ufe0e\\ufe0f",
      dF = "[" + Sy + "]",
      ja = "[" + lF + "]",
      za = "\\ud83c[\\udffb-\\udfff]",
      pF = "(?:" + ja + "|" + za + ")",
      Cy = "[^" + Sy + "]",
      Ry = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Ly = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      hF = "\\u200d",
      Ny = pF + "?",
      Py = "[" + fF + "]?",
      gF = "(?:" + hF + "(?:" + [Cy, Ry, Ly].join("|") + ")" + Py + Ny + ")*",
      vF = Py + Ny + gF,
      yF = "(?:" + [Cy + ja + "?", ja, Ry, Ly, dF].join("|") + ")",
      Ay = RegExp(za + "(?=" + za + ")|" + yF + vF, "g");
    function mF(e) {
      for (var t = (Ay.lastIndex = 0); Ay.test(e); ) ++t;
      return t;
    }
    qy.exports = mF;
  });
  var Fy = c((Q5, Dy) => {
    var EF = wy(),
      _F = Oy(),
      bF = My();
    function IF(e) {
      return _F(e) ? bF(e) : EF(e);
    }
    Dy.exports = IF;
  });
  var Vy = c((Z5, Gy) => {
    var TF = Vn(),
      wF = Un(),
      xF = Nt(),
      OF = Iy(),
      AF = Fy(),
      SF = "[object Map]",
      CF = "[object Set]";
    function RF(e) {
      if (e == null) return 0;
      if (xF(e)) return OF(e) ? AF(e) : e.length;
      var t = wF(e);
      return t == SF || t == CF ? e.size : TF(e).length;
    }
    Gy.exports = RF;
  });
  var Hy = c((J5, Uy) => {
    var LF = "Expected a function";
    function NF(e) {
      if (typeof e != "function") throw new TypeError(LF);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Uy.exports = NF;
  });
  var Ka = c((ej, Wy) => {
    var PF = Tt(),
      qF = (function () {
        try {
          var e = PF(Object, "defineProperty");
          return (e({}, "", {}), e);
        } catch {}
      })();
    Wy.exports = qF;
  });
  var Ya = c((tj, Xy) => {
    var ky = Ka();
    function MF(e, t, r) {
      t == "__proto__" && ky
        ? ky(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
        : (e[t] = r);
    }
    Xy.exports = MF;
  });
  var jy = c((rj, By) => {
    var DF = Ya(),
      FF = Cn(),
      GF = Object.prototype,
      VF = GF.hasOwnProperty;
    function UF(e, t, r) {
      var n = e[t];
      (!(VF.call(e, t) && FF(n, r)) || (r === void 0 && !(t in e))) &&
        DF(e, t, r);
    }
    By.exports = UF;
  });
  var Yy = c((nj, Ky) => {
    var HF = jy(),
      WF = Vr(),
      kF = Mn(),
      zy = ut(),
      XF = tr();
    function BF(e, t, r, n) {
      if (!zy(e)) return e;
      t = WF(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = XF(t[i]),
          d = r;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var h = a[u];
          ((d = n ? n(h, u, a) : void 0),
            d === void 0 && (d = zy(h) ? h : kF(t[i + 1]) ? [] : {}));
        }
        (HF(a, u, d), (a = a[u]));
      }
      return e;
    }
    Ky.exports = BF;
  });
  var Qy = c((ij, $y) => {
    var jF = kn(),
      zF = Yy(),
      KF = Vr();
    function YF(e, t, r) {
      for (var n = -1, i = t.length, o = {}; ++n < i; ) {
        var s = t[n],
          a = jF(e, s);
        r(a, s) && zF(o, KF(s, e), a);
      }
      return o;
    }
    $y.exports = YF;
  });
  var Jy = c((oj, Zy) => {
    var $F = Pn(),
      QF = Co(),
      ZF = ra(),
      JF = ta(),
      e2 = Object.getOwnPropertySymbols,
      t2 = e2
        ? function (e) {
            for (var t = []; e; ) ($F(t, ZF(e)), (e = QF(e)));
            return t;
          }
        : JF;
    Zy.exports = t2;
  });
  var tm = c((aj, em) => {
    function r2(e) {
      var t = [];
      if (e != null) for (var r in Object(e)) t.push(r);
      return t;
    }
    em.exports = r2;
  });
  var nm = c((sj, rm) => {
    var n2 = ut(),
      i2 = Gn(),
      o2 = tm(),
      a2 = Object.prototype,
      s2 = a2.hasOwnProperty;
    function u2(e) {
      if (!n2(e)) return o2(e);
      var t = i2(e),
        r = [];
      for (var n in e)
        (n == "constructor" && (t || !s2.call(e, n))) || r.push(n);
      return r;
    }
    rm.exports = u2;
  });
  var om = c((uj, im) => {
    var c2 = ia(),
      l2 = nm(),
      f2 = Nt();
    function d2(e) {
      return f2(e) ? c2(e, !0) : l2(e);
    }
    im.exports = d2;
  });
  var sm = c((cj, am) => {
    var p2 = ea(),
      h2 = Jy(),
      g2 = om();
    function v2(e) {
      return p2(e, g2, h2);
    }
    am.exports = v2;
  });
  var cm = c((lj, um) => {
    var y2 = va(),
      m2 = wt(),
      E2 = Qy(),
      _2 = sm();
    function b2(e, t) {
      if (e == null) return {};
      var r = y2(_2(e), function (n) {
        return [n];
      });
      return (
        (t = m2(t)),
        E2(e, r, function (n, i) {
          return t(n, i[0]);
        })
      );
    }
    um.exports = b2;
  });
  var fm = c((fj, lm) => {
    var I2 = wt(),
      T2 = Hy(),
      w2 = cm();
    function x2(e, t) {
      return w2(e, T2(I2(t)));
    }
    lm.exports = x2;
  });
  var pm = c((dj, dm) => {
    var O2 = Vn(),
      A2 = Un(),
      S2 = Pr(),
      C2 = Oe(),
      R2 = Nt(),
      L2 = qn(),
      N2 = Gn(),
      P2 = Fn(),
      q2 = "[object Map]",
      M2 = "[object Set]",
      D2 = Object.prototype,
      F2 = D2.hasOwnProperty;
    function G2(e) {
      if (e == null) return !0;
      if (
        R2(e) &&
        (C2(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          L2(e) ||
          P2(e) ||
          S2(e))
      )
        return !e.length;
      var t = A2(e);
      if (t == q2 || t == M2) return !e.size;
      if (N2(e)) return !O2(e).length;
      for (var r in e) if (F2.call(e, r)) return !1;
      return !0;
    }
    dm.exports = G2;
  });
  var gm = c((pj, hm) => {
    var V2 = Ya(),
      U2 = Da(),
      H2 = wt();
    function W2(e, t) {
      var r = {};
      return (
        (t = H2(t, 3)),
        U2(e, function (n, i, o) {
          V2(r, i, t(n, i, o));
        }),
        r
      );
    }
    hm.exports = W2;
  });
  var ym = c((hj, vm) => {
    function k2(e, t) {
      for (
        var r = -1, n = e == null ? 0 : e.length;
        ++r < n && t(e[r], r, e) !== !1;

      );
      return e;
    }
    vm.exports = k2;
  });
  var Em = c((gj, mm) => {
    var X2 = Bn();
    function B2(e) {
      return typeof e == "function" ? e : X2;
    }
    mm.exports = B2;
  });
  var bm = c((vj, _m) => {
    var j2 = ym(),
      z2 = Fa(),
      K2 = Em(),
      Y2 = Oe();
    function $2(e, t) {
      var r = Y2(e) ? j2 : z2;
      return r(e, K2(t));
    }
    _m.exports = $2;
  });
  var Tm = c((yj, Im) => {
    var Q2 = Ze(),
      Z2 = function () {
        return Q2.Date.now();
      };
    Im.exports = Z2;
  });
  var Om = c((mj, xm) => {
    var J2 = ut(),
      $a = Tm(),
      wm = jn(),
      eG = "Expected a function",
      tG = Math.max,
      rG = Math.min;
    function nG(e, t, r) {
      var n,
        i,
        o,
        s,
        a,
        u,
        d = 0,
        h = !1,
        f = !1,
        m = !0;
      if (typeof e != "function") throw new TypeError(eG);
      ((t = wm(t) || 0),
        J2(r) &&
          ((h = !!r.leading),
          (f = "maxWait" in r),
          (o = f ? tG(wm(r.maxWait) || 0, t) : o),
          (m = "trailing" in r ? !!r.trailing : m)));
      function p(L) {
        var X = n,
          B = i;
        return ((n = i = void 0), (d = L), (s = e.apply(B, X)), s);
      }
      function g(L) {
        return ((d = L), (a = setTimeout(w, t)), h ? p(L) : s);
      }
      function _(L) {
        var X = L - u,
          B = L - d,
          j = t - X;
        return f ? rG(j, o - B) : j;
      }
      function O(L) {
        var X = L - u,
          B = L - d;
        return u === void 0 || X >= t || X < 0 || (f && B >= o);
      }
      function w() {
        var L = $a();
        if (O(L)) return R(L);
        a = setTimeout(w, _(L));
      }
      function R(L) {
        return ((a = void 0), m && n ? p(L) : ((n = i = void 0), s));
      }
      function A() {
        (a !== void 0 && clearTimeout(a), (d = 0), (n = u = i = a = void 0));
      }
      function N() {
        return a === void 0 ? s : R($a());
      }
      function P() {
        var L = $a(),
          X = O(L);
        if (((n = arguments), (i = this), (u = L), X)) {
          if (a === void 0) return g(u);
          if (f) return (clearTimeout(a), (a = setTimeout(w, t)), p(u));
        }
        return (a === void 0 && (a = setTimeout(w, t)), s);
      }
      return ((P.cancel = A), (P.flush = N), P);
    }
    xm.exports = nG;
  });
  var Sm = c((Ej, Am) => {
    var iG = Om(),
      oG = ut(),
      aG = "Expected a function";
    function sG(e, t, r) {
      var n = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(aG);
      return (
        oG(r) &&
          ((n = "leading" in r ? !!r.leading : n),
          (i = "trailing" in r ? !!r.trailing : i)),
        iG(e, t, { leading: n, maxWait: t, trailing: i })
      );
    }
    Am.exports = sG;
  });
  var Rm = {};
  Ge(Rm, {
    actionListPlaybackChanged: () => pr,
    animationFrameChanged: () => ci,
    clearRequested: () => NG,
    elementStateChanged: () => is,
    eventListenerAdded: () => ui,
    eventStateChanged: () => ts,
    instanceAdded: () => rs,
    instanceRemoved: () => ns,
    instanceStarted: () => li,
    mediaQueriesDefined: () => as,
    parameterChanged: () => dr,
    playbackRequested: () => RG,
    previewRequested: () => CG,
    rawDataImported: () => Qa,
    sessionInitialized: () => Za,
    sessionStarted: () => Ja,
    sessionStopped: () => es,
    stopRequested: () => LG,
    testFrameRendered: () => PG,
    viewportWidthChanged: () => os,
  });
  var Cm,
    uG,
    cG,
    lG,
    fG,
    dG,
    pG,
    hG,
    gG,
    vG,
    yG,
    mG,
    EG,
    _G,
    bG,
    IG,
    TG,
    wG,
    xG,
    OG,
    AG,
    SG,
    Qa,
    Za,
    Ja,
    es,
    CG,
    RG,
    LG,
    NG,
    ui,
    PG,
    ts,
    ci,
    dr,
    rs,
    li,
    ns,
    is,
    pr,
    os,
    as,
    fi = ye(() => {
      "use strict";
      Ve();
      ((Cm = fe(Ft())),
        ({
          IX2_RAW_DATA_IMPORTED: uG,
          IX2_SESSION_INITIALIZED: cG,
          IX2_SESSION_STARTED: lG,
          IX2_SESSION_STOPPED: fG,
          IX2_PREVIEW_REQUESTED: dG,
          IX2_PLAYBACK_REQUESTED: pG,
          IX2_STOP_REQUESTED: hG,
          IX2_CLEAR_REQUESTED: gG,
          IX2_EVENT_LISTENER_ADDED: vG,
          IX2_TEST_FRAME_RENDERED: yG,
          IX2_EVENT_STATE_CHANGED: mG,
          IX2_ANIMATION_FRAME_CHANGED: EG,
          IX2_PARAMETER_CHANGED: _G,
          IX2_INSTANCE_ADDED: bG,
          IX2_INSTANCE_STARTED: IG,
          IX2_INSTANCE_REMOVED: TG,
          IX2_ELEMENT_STATE_CHANGED: wG,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: xG,
          IX2_VIEWPORT_WIDTH_CHANGED: OG,
          IX2_MEDIA_QUERIES_DEFINED: AG,
        } = we),
        ({ reifyState: SG } = Cm.IX2VanillaUtils),
        (Qa = (e) => ({ type: uG, payload: { ...SG(e) } })),
        (Za = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: cG,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Ja = () => ({ type: lG })),
        (es = () => ({ type: fG })),
        (CG = ({ rawData: e, defer: t }) => ({
          type: dG,
          payload: { defer: t, rawData: e },
        })),
        (RG = ({
          actionTypeId: e = Xe.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: r,
          eventId: n,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: pG,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: r,
            testManual: s,
            eventId: n,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (LG = (e) => ({ type: hG, payload: { actionListId: e } })),
        (NG = () => ({ type: gG })),
        (ui = (e, t) => ({
          type: vG,
          payload: { target: e, listenerParams: t },
        })),
        (PG = (e = 1) => ({ type: yG, payload: { step: e } })),
        (ts = (e, t) => ({ type: mG, payload: { stateKey: e, newState: t } })),
        (ci = (e, t) => ({ type: EG, payload: { now: e, parameters: t } })),
        (dr = (e, t) => ({ type: _G, payload: { key: e, value: t } })),
        (rs = (e) => ({ type: bG, payload: { ...e } })),
        (li = (e, t) => ({ type: IG, payload: { instanceId: e, time: t } })),
        (ns = (e) => ({ type: TG, payload: { instanceId: e } })),
        (is = (e, t, r, n) => ({
          type: wG,
          payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
        })),
        (pr = ({ actionListId: e, isPlaying: t }) => ({
          type: xG,
          payload: { actionListId: e, isPlaying: t },
        })),
        (os = ({ width: e, mediaQueries: t }) => ({
          type: OG,
          payload: { width: e, mediaQueries: t },
        })),
        (as = () => ({ type: AG })));
    });
  var Me = {};
  Ge(Me, {
    elementContains: () => cs,
    getChildElements: () => kG,
    getClosestElement: () => $r,
    getProperty: () => GG,
    getQuerySelector: () => us,
    getRefType: () => ls,
    getSiblingElements: () => XG,
    getStyle: () => FG,
    getValidDocument: () => UG,
    isSiblingNode: () => WG,
    matchSelector: () => VG,
    queryDocument: () => HG,
    setStyle: () => DG,
  });
  function DG(e, t, r) {
    e.style[t] = r;
  }
  function FG(e, t) {
    return e.style[t];
  }
  function GG(e, t) {
    return e[t];
  }
  function VG(e) {
    return (t) => t[ss](e);
  }
  function us({ id: e, selector: t }) {
    if (e) {
      let r = e;
      if (e.indexOf(Lm) !== -1) {
        let n = e.split(Lm),
          i = n[0];
        if (((r = n[1]), i !== document.documentElement.getAttribute(Pm)))
          return null;
      }
      return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
    }
    return t;
  }
  function UG(e) {
    return e == null || e === document.documentElement.getAttribute(Pm)
      ? document
      : null;
  }
  function HG(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e),
    );
  }
  function cs(e, t) {
    return e.contains(t);
  }
  function WG(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function kG(e) {
    let t = [];
    for (let r = 0, { length: n } = e || []; r < n; r++) {
      let { children: i } = e[r],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function XG(e = []) {
    let t = [],
      r = [];
    for (let n = 0, { length: i } = e; n < i; n++) {
      let { parentNode: o } = e[n];
      if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
        continue;
      r.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        (e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling));
    }
    return t;
  }
  function ls(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? qG
        : MG
      : null;
  }
  var Nm,
    ss,
    Lm,
    qG,
    MG,
    Pm,
    $r,
    qm = ye(() => {
      "use strict";
      Nm = fe(Ft());
      Ve();
      (({ ELEMENT_MATCHES: ss } = Nm.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Lm,
          HTML_ELEMENT: qG,
          PLAIN_OBJECT: MG,
          WF_PAGE: Pm,
        } = Re));
      $r = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let r = e;
            do {
              if (r[ss] && r[ss](t)) return r;
              r = r.parentNode;
            } while (r != null);
            return null;
          };
    });
  var fs = c((Ij, Dm) => {
    var BG = ut(),
      Mm = Object.create,
      jG = (function () {
        function e() {}
        return function (t) {
          if (!BG(t)) return {};
          if (Mm) return Mm(t);
          e.prototype = t;
          var r = new e();
          return ((e.prototype = void 0), r);
        };
      })();
    Dm.exports = jG;
  });
  var di = c((Tj, Fm) => {
    function zG() {}
    Fm.exports = zG;
  });
  var hi = c((wj, Gm) => {
    var KG = fs(),
      YG = di();
    function pi(e, t) {
      ((this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0));
    }
    pi.prototype = KG(YG.prototype);
    pi.prototype.constructor = pi;
    Gm.exports = pi;
  });
  var Wm = c((xj, Hm) => {
    var Vm = Xt(),
      $G = Pr(),
      QG = Oe(),
      Um = Vm ? Vm.isConcatSpreadable : void 0;
    function ZG(e) {
      return QG(e) || $G(e) || !!(Um && e && e[Um]);
    }
    Hm.exports = ZG;
  });
  var Bm = c((Oj, Xm) => {
    var JG = Pn(),
      eV = Wm();
    function km(e, t, r, n, i) {
      var o = -1,
        s = e.length;
      for (r || (r = eV), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && r(a)
          ? t > 1
            ? km(a, t - 1, r, n, i)
            : JG(i, a)
          : n || (i[i.length] = a);
      }
      return i;
    }
    Xm.exports = km;
  });
  var zm = c((Aj, jm) => {
    var tV = Bm();
    function rV(e) {
      var t = e == null ? 0 : e.length;
      return t ? tV(e, 1) : [];
    }
    jm.exports = rV;
  });
  var Ym = c((Sj, Km) => {
    function nV(e, t, r) {
      switch (r.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, r[0]);
        case 2:
          return e.call(t, r[0], r[1]);
        case 3:
          return e.call(t, r[0], r[1], r[2]);
      }
      return e.apply(t, r);
    }
    Km.exports = nV;
  });
  var Zm = c((Cj, Qm) => {
    var iV = Ym(),
      $m = Math.max;
    function oV(e, t, r) {
      return (
        (t = $m(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var n = arguments, i = -1, o = $m(n.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = n[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = n[i];
          return ((a[t] = r(s)), iV(e, this, a));
        }
      );
    }
    Qm.exports = oV;
  });
  var eE = c((Rj, Jm) => {
    function aV(e) {
      return function () {
        return e;
      };
    }
    Jm.exports = aV;
  });
  var nE = c((Lj, rE) => {
    var sV = eE(),
      tE = Ka(),
      uV = Bn(),
      cV = tE
        ? function (e, t) {
            return tE(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: sV(t),
              writable: !0,
            });
          }
        : uV;
    rE.exports = cV;
  });
  var oE = c((Nj, iE) => {
    var lV = 800,
      fV = 16,
      dV = Date.now;
    function pV(e) {
      var t = 0,
        r = 0;
      return function () {
        var n = dV(),
          i = fV - (n - r);
        if (((r = n), i > 0)) {
          if (++t >= lV) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    iE.exports = pV;
  });
  var sE = c((Pj, aE) => {
    var hV = nE(),
      gV = oE(),
      vV = gV(hV);
    aE.exports = vV;
  });
  var cE = c((qj, uE) => {
    var yV = zm(),
      mV = Zm(),
      EV = sE();
    function _V(e) {
      return EV(mV(e, void 0, yV), e + "");
    }
    uE.exports = _V;
  });
  var dE = c((Mj, fE) => {
    var lE = oa(),
      bV = lE && new lE();
    fE.exports = bV;
  });
  var hE = c((Dj, pE) => {
    function IV() {}
    pE.exports = IV;
  });
  var ds = c((Fj, vE) => {
    var gE = dE(),
      TV = hE(),
      wV = gE
        ? function (e) {
            return gE.get(e);
          }
        : TV;
    vE.exports = wV;
  });
  var mE = c((Gj, yE) => {
    var xV = {};
    yE.exports = xV;
  });
  var ps = c((Vj, _E) => {
    var EE = mE(),
      OV = Object.prototype,
      AV = OV.hasOwnProperty;
    function SV(e) {
      for (
        var t = e.name + "", r = EE[t], n = AV.call(EE, t) ? r.length : 0;
        n--;

      ) {
        var i = r[n],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    _E.exports = SV;
  });
  var vi = c((Uj, bE) => {
    var CV = fs(),
      RV = di(),
      LV = 4294967295;
    function gi(e) {
      ((this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = LV),
        (this.__views__ = []));
    }
    gi.prototype = CV(RV.prototype);
    gi.prototype.constructor = gi;
    bE.exports = gi;
  });
  var TE = c((Hj, IE) => {
    function NV(e, t) {
      var r = -1,
        n = e.length;
      for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
      return t;
    }
    IE.exports = NV;
  });
  var xE = c((Wj, wE) => {
    var PV = vi(),
      qV = hi(),
      MV = TE();
    function DV(e) {
      if (e instanceof PV) return e.clone();
      var t = new qV(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = MV(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    wE.exports = DV;
  });
  var SE = c((kj, AE) => {
    var FV = vi(),
      OE = hi(),
      GV = di(),
      VV = Oe(),
      UV = pt(),
      HV = xE(),
      WV = Object.prototype,
      kV = WV.hasOwnProperty;
    function yi(e) {
      if (UV(e) && !VV(e) && !(e instanceof FV)) {
        if (e instanceof OE) return e;
        if (kV.call(e, "__wrapped__")) return HV(e);
      }
      return new OE(e);
    }
    yi.prototype = GV.prototype;
    yi.prototype.constructor = yi;
    AE.exports = yi;
  });
  var RE = c((Xj, CE) => {
    var XV = vi(),
      BV = ds(),
      jV = ps(),
      zV = SE();
    function KV(e) {
      var t = jV(e),
        r = zV[t];
      if (typeof r != "function" || !(t in XV.prototype)) return !1;
      if (e === r) return !0;
      var n = BV(r);
      return !!n && e === n[0];
    }
    CE.exports = KV;
  });
  var qE = c((Bj, PE) => {
    var LE = hi(),
      YV = cE(),
      $V = ds(),
      hs = ps(),
      QV = Oe(),
      NE = RE(),
      ZV = "Expected a function",
      JV = 8,
      eU = 32,
      tU = 128,
      rU = 256;
    function nU(e) {
      return YV(function (t) {
        var r = t.length,
          n = r,
          i = LE.prototype.thru;
        for (e && t.reverse(); n--; ) {
          var o = t[n];
          if (typeof o != "function") throw new TypeError(ZV);
          if (i && !s && hs(o) == "wrapper") var s = new LE([], !0);
        }
        for (n = s ? n : r; ++n < r; ) {
          o = t[n];
          var a = hs(o),
            u = a == "wrapper" ? $V(o) : void 0;
          u &&
          NE(u[0]) &&
          u[1] == (tU | JV | eU | rU) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[hs(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && NE(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var d = arguments,
            h = d[0];
          if (s && d.length == 1 && QV(h)) return s.plant(h).value();
          for (var f = 0, m = r ? t[f].apply(this, d) : h; ++f < r; )
            m = t[f].call(this, m);
          return m;
        };
      });
    }
    PE.exports = nU;
  });
  var DE = c((jj, ME) => {
    var iU = qE(),
      oU = iU();
    ME.exports = oU;
  });
  var GE = c((zj, FE) => {
    function aU(e, t, r) {
      return (
        e === e &&
          (r !== void 0 && (e = e <= r ? e : r),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    FE.exports = aU;
  });
  var UE = c((Kj, VE) => {
    var sU = GE(),
      gs = jn();
    function uU(e, t, r) {
      return (
        r === void 0 && ((r = t), (t = void 0)),
        r !== void 0 && ((r = gs(r)), (r = r === r ? r : 0)),
        t !== void 0 && ((t = gs(t)), (t = t === t ? t : 0)),
        sU(gs(e), t, r)
      );
    }
    VE.exports = uU;
  });
  var YE,
    $E,
    QE,
    ZE,
    cU,
    lU,
    fU,
    dU,
    pU,
    hU,
    gU,
    vU,
    yU,
    mU,
    EU,
    _U,
    bU,
    IU,
    TU,
    JE,
    e_,
    wU,
    xU,
    OU,
    t_,
    AU,
    SU,
    r_,
    CU,
    vs,
    n_,
    HE,
    WE,
    i_,
    Zr,
    RU,
    ft,
    o_,
    LU,
    He,
    tt,
    Jr,
    a_,
    ys,
    kE,
    ms,
    NU,
    Qr,
    PU,
    qU,
    MU,
    s_,
    XE,
    DU,
    BE,
    FU,
    GU,
    VU,
    jE,
    mi,
    Ei,
    zE,
    KE,
    u_,
    c_ = ye(() => {
      "use strict";
      ((YE = fe(DE())), ($E = fe(Xn())), (QE = fe(UE())));
      Ve();
      Es();
      fi();
      ((ZE = fe(Ft())),
        ({
          MOUSE_CLICK: cU,
          MOUSE_SECOND_CLICK: lU,
          MOUSE_DOWN: fU,
          MOUSE_UP: dU,
          MOUSE_OVER: pU,
          MOUSE_OUT: hU,
          DROPDOWN_CLOSE: gU,
          DROPDOWN_OPEN: vU,
          SLIDER_ACTIVE: yU,
          SLIDER_INACTIVE: mU,
          TAB_ACTIVE: EU,
          TAB_INACTIVE: _U,
          NAVBAR_CLOSE: bU,
          NAVBAR_OPEN: IU,
          MOUSE_MOVE: TU,
          PAGE_SCROLL_DOWN: JE,
          SCROLL_INTO_VIEW: e_,
          SCROLL_OUT_OF_VIEW: wU,
          PAGE_SCROLL_UP: xU,
          SCROLLING_IN_VIEW: OU,
          PAGE_FINISH: t_,
          ECOMMERCE_CART_CLOSE: AU,
          ECOMMERCE_CART_OPEN: SU,
          PAGE_START: r_,
          PAGE_SCROLL: CU,
        } = Je),
        (vs = "COMPONENT_ACTIVE"),
        (n_ = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: HE } = Re),
        ({ getNamespacedParameterId: WE } = ZE.IX2VanillaUtils),
        (i_ = (e) => (t) => (typeof t == "object" && e(t) ? !0 : t)),
        (Zr = i_(({ element: e, nativeEvent: t }) => e === t.target)),
        (RU = i_(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (ft = (0, YE.default)([Zr, RU])),
        (o_ = (e, t) => {
          if (t) {
            let { ixData: r } = e.getState(),
              { events: n } = r,
              i = n[t];
            if (i && !NU[i.eventTypeId]) return i;
          }
          return null;
        }),
        (LU = ({ store: e, event: t }) => {
          let { action: r } = t,
            { autoStopEventId: n } = r.config;
          return !!o_(e, n);
        }),
        (He = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            d = o_(e, u);
          return (
            d &&
              hr({
                store: e,
                eventId: u,
                eventTarget: r,
                eventStateKey: u + HE + n.split(HE)[1],
                actionListId: (0, $E.default)(d, "action.config.actionListId"),
              }),
            hr({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            en({
              store: e,
              eventId: s,
              eventTarget: r,
              eventStateKey: n,
              actionListId: a,
            }),
            i
          );
        }),
        (tt = (e, t) => (r, n) => (e(r, n) === !0 ? t(r, n) : n)),
        (Jr = { handler: tt(ft, He) }),
        (a_ = { ...Jr, types: [vs, n_].join(" ") }),
        (ys = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (kE = "mouseover mouseout"),
        (ms = { types: ys }),
        (NU = { PAGE_START: r_, PAGE_FINISH: t_ }),
        (Qr = (() => {
          let e = window.pageXOffset !== void 0,
            r =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : r.scrollLeft,
            scrollTop: e ? window.pageYOffset : r.scrollTop,
            stiffScrollTop: (0, QE.default)(
              e ? window.pageYOffset : r.scrollTop,
              0,
              r.scrollHeight - window.innerHeight,
            ),
            scrollWidth: r.scrollWidth,
            scrollHeight: r.scrollHeight,
            clientWidth: r.clientWidth,
            clientHeight: r.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (PU = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (qU = ({ element: e, nativeEvent: t }) => {
          let { type: r, target: n, relatedTarget: i } = t,
            o = e.contains(n);
          if (r === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(r === "mouseout" && o && s);
        }),
        (MU = (e) => {
          let {
              element: t,
              event: { config: r },
            } = e,
            { clientWidth: n, clientHeight: i } = Qr(),
            o = r.scrollOffsetValue,
            u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return PU(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: n,
            bottom: i - u,
          });
        }),
        (s_ = (e) => (t, r) => {
          let { type: n } = t.nativeEvent,
            i = [vs, n_].indexOf(n) !== -1 ? n === vs : r.isActive,
            o = { ...r, isActive: i };
          return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
        }),
        (XE = (e) => (t, r) => {
          let n = { elementHovered: qU(t) };
          return (
            ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
              e(t, n)) ||
            n
          );
        }),
        (DU = (e) => (t, r) => {
          let n = { ...r, elementVisible: MU(t) };
          return (
            ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
              e(t, n)) ||
            n
          );
        }),
        (BE =
          (e) =>
          (t, r = {}) => {
            let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = Qr(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: d } = s,
              h = d === "PX",
              f = i - o,
              m = Number((n / f).toFixed(2));
            if (r && r.percentTop === m) return r;
            let p = (h ? u : (o * (u || 0)) / 100) / f,
              g,
              _,
              O = 0;
            r &&
              ((g = m > r.percentTop),
              (_ = r.scrollingDown !== g),
              (O = _ ? m : r.anchorTop));
            let w = a === JE ? m >= O + p : m <= O - p,
              R = {
                ...r,
                percentTop: m,
                inBounds: w,
                anchorTop: O,
                scrollingDown: g,
              };
            return (r && w && (_ || R.inBounds !== r.inBounds) && e(t, R)) || R;
          }),
        (FU = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (GU = (e) => (t, r) => {
          let n = { finished: document.readyState === "complete" };
          return (n.finished && !(r && r.finshed) && e(t), n);
        }),
        (VU = (e) => (t, r) => {
          let n = { started: !0 };
          return (r || e(t), n);
        }),
        (jE =
          (e) =>
          (t, r = { clickCount: 0 }) => {
            let n = { clickCount: (r.clickCount % 2) + 1 };
            return (n.clickCount !== r.clickCount && e(t, n)) || n;
          }),
        (mi = (e = !0) => ({
          ...a_,
          handler: tt(
            e ? ft : Zr,
            s_((t, r) => (r.isActive ? Jr.handler(t, r) : r)),
          ),
        })),
        (Ei = (e = !0) => ({
          ...a_,
          handler: tt(
            e ? ft : Zr,
            s_((t, r) => (r.isActive ? r : Jr.handler(t, r))),
          ),
        })),
        (zE = {
          ...ms,
          handler: DU((e, t) => {
            let { elementVisible: r } = t,
              { event: n, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[n.action.config.autoStopEventId] && t.triggered
              ? t
              : (n.eventTypeId === e_) === r
                ? (He(e), { ...t, triggered: !0 })
                : t;
          }),
        }),
        (KE = 0.05),
        (u_ = {
          [yU]: mi(),
          [mU]: Ei(),
          [vU]: mi(),
          [gU]: Ei(),
          [IU]: mi(!1),
          [bU]: Ei(!1),
          [EU]: mi(),
          [_U]: Ei(),
          [SU]: { types: "ecommerce-cart-open", handler: tt(ft, He) },
          [AU]: { types: "ecommerce-cart-close", handler: tt(ft, He) },
          [cU]: {
            types: "click",
            handler: tt(
              ft,
              jE((e, { clickCount: t }) => {
                LU(e) ? t === 1 && He(e) : He(e);
              }),
            ),
          },
          [lU]: {
            types: "click",
            handler: tt(
              ft,
              jE((e, { clickCount: t }) => {
                t === 2 && He(e);
              }),
            ),
          },
          [fU]: { ...Jr, types: "mousedown" },
          [dU]: { ...Jr, types: "mouseup" },
          [pU]: {
            types: kE,
            handler: tt(
              ft,
              XE((e, t) => {
                t.elementHovered && He(e);
              }),
            ),
          },
          [hU]: {
            types: kE,
            handler: tt(
              ft,
              XE((e, t) => {
                t.elementHovered || He(e);
              }),
            ),
          },
          [TU]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: r,
                nativeEvent: n,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 },
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: d,
                  restingState: h = 0,
                } = r,
                {
                  clientX: f = o.clientX,
                  clientY: m = o.clientY,
                  pageX: p = o.pageX,
                  pageY: g = o.pageY,
                } = n,
                _ = a === "X_AXIS",
                O = n.type === "mouseout",
                w = h / 100,
                R = u,
                A = !1;
              switch (s) {
                case st.VIEWPORT: {
                  w = _
                    ? Math.min(f, window.innerWidth) / window.innerWidth
                    : Math.min(m, window.innerHeight) / window.innerHeight;
                  break;
                }
                case st.PAGE: {
                  let {
                    scrollLeft: N,
                    scrollTop: P,
                    scrollWidth: L,
                    scrollHeight: X,
                  } = Qr();
                  w = _ ? Math.min(N + p, L) / L : Math.min(P + g, X) / X;
                  break;
                }
                case st.ELEMENT:
                default: {
                  R = WE(i, u);
                  let N = n.type.indexOf("mouse") === 0;
                  if (N && ft({ element: t, nativeEvent: n }) !== !0) break;
                  let P = t.getBoundingClientRect(),
                    { left: L, top: X, width: B, height: j } = P;
                  if (!N && !FU({ left: f, top: m }, P)) break;
                  ((A = !0), (w = _ ? (f - L) / B : (m - X) / j));
                  break;
                }
              }
              return (
                O && (w > 1 - KE || w < KE) && (w = Math.round(w)),
                (s !== st.ELEMENT || A || A !== o.elementHovered) &&
                  ((w = d ? 1 - w : w), e.dispatch(dr(R, w))),
                {
                  elementHovered: A,
                  clientX: f,
                  clientY: m,
                  pageX: p,
                  pageY: g,
                }
              );
            },
          },
          [CU]: {
            types: ys,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: r, reverse: n } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = Qr(),
                a = i / (o - s);
              ((a = n ? 1 - a : a), e.dispatch(dr(r, a)));
            },
          },
          [OU]: {
            types: ys,
            handler: (
              { element: e, store: t, eventConfig: r, eventStateKey: n },
              i = { scrollPercent: 0 },
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: d,
                } = Qr(),
                {
                  basedOn: h,
                  selectedAxis: f,
                  continuousParameterGroupId: m,
                  startsEntering: p,
                  startsExiting: g,
                  addEndOffset: _,
                  addStartOffset: O,
                  addOffsetValue: w = 0,
                  endOffsetValue: R = 0,
                } = r,
                A = f === "X_AXIS";
              if (h === st.VIEWPORT) {
                let N = A ? o / a : s / u;
                return (
                  N !== i.scrollPercent && t.dispatch(dr(m, N)),
                  { scrollPercent: N }
                );
              } else {
                let N = WE(n, m),
                  P = e.getBoundingClientRect(),
                  L = (O ? w : 0) / 100,
                  X = (_ ? R : 0) / 100;
                ((L = p ? L : 1 - L), (X = g ? X : 1 - X));
                let B = P.top + Math.min(P.height * L, d),
                  Z = P.top + P.height * X - B,
                  ie = Math.min(d + Z, u),
                  x = Math.min(Math.max(0, d - B), ie) / ie;
                return (
                  x !== i.scrollPercent && t.dispatch(dr(N, x)),
                  { scrollPercent: x }
                );
              }
            },
          },
          [e_]: zE,
          [wU]: zE,
          [JE]: {
            ...ms,
            handler: BE((e, t) => {
              t.scrollingDown && He(e);
            }),
          },
          [xU]: {
            ...ms,
            handler: BE((e, t) => {
              t.scrollingDown || He(e);
            }),
          },
          [t_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(Zr, GU(He)),
          },
          [r_]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: tt(Zr, VU(He)),
          },
        }));
    });
  var O_ = {};
  Ge(O_, {
    observeRequests: () => oH,
    startActionGroup: () => en,
    startEngine: () => xi,
    stopActionGroup: () => hr,
    stopAllActionGroups: () => T_,
    stopEngine: () => Oi,
  });
  function oH(e) {
    (Gt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: uH }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: cH }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: lH }),
      Gt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: fH }));
  }
  function aH(e) {
    Gt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        (Oi(e),
          E_({ store: e, elementApi: Me }),
          xi({ store: e, allowEvents: !0 }),
          __());
      },
    });
  }
  function sH(e, t) {
    let r = Gt({
      store: e,
      select: ({ ixSession: n }) => n.tick,
      onChange: (n) => {
        (t(n), r());
      },
    });
  }
  function uH({ rawData: e, defer: t }, r) {
    let n = () => {
      (xi({ store: r, rawData: e, allowEvents: !0 }), __());
    };
    t ? setTimeout(n, 0) : n();
  }
  function __() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function cH(e, t) {
    let {
        actionTypeId: r,
        actionListId: n,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: d = !0,
      } = e,
      { rawData: h } = e;
    if (n && i && h && a) {
      let f = h.actionLists[n];
      f && (h = KU({ actionList: f, actionItemId: i, rawData: h }));
    }
    if (
      (xi({ store: t, rawData: h, allowEvents: s, testManual: u }),
      (n && r === Xe.GENERAL_START_ACTION) || _s(r))
    ) {
      (hr({ store: t, actionListId: n }),
        I_({ store: t, actionListId: n, eventId: o }));
      let f = en({
        store: t,
        eventId: o,
        actionListId: n,
        immediate: a,
        verbose: d,
      });
      d && f && t.dispatch(pr({ actionListId: n, isPlaying: !a }));
    }
  }
  function lH({ actionListId: e }, t) {
    (e ? hr({ store: t, actionListId: e }) : T_({ store: t }), Oi(t));
  }
  function fH(e, t) {
    (Oi(t), E_({ store: t, elementApi: Me }));
  }
  function xi({ store: e, rawData: t, allowEvents: r, testManual: n }) {
    let { ixSession: i } = e.getState();
    (t && e.dispatch(Qa(t)),
      i.active ||
        (e.dispatch(
          Za({
            hasBoundaryNodes: !!document.querySelector(bi),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          }),
        ),
        r &&
          (yH(e), dH(), e.getState().ixSession.hasDefinedMediaQueries && aH(e)),
        e.dispatch(Ja()),
        pH(e, n)));
  }
  function dH() {
    let { documentElement: e } = document;
    e.className.indexOf(l_) === -1 && (e.className += ` ${l_}`);
  }
  function pH(e, t) {
    let r = (n) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(ci(n, o)), t ? sH(e, r) : requestAnimationFrame(r));
    };
    r(window.performance.now());
  }
  function Oi(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: r } = t;
      (r.forEach(hH), ZU(), e.dispatch(es()));
    }
  }
  function hH({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function gH({
    store: e,
    eventStateKey: t,
    eventTarget: r,
    eventId: n,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: d, ixSession: h } = e.getState(),
      { events: f } = d,
      m = f[n],
      { eventTypeId: p } = m,
      g = {},
      _ = {},
      O = [],
      { continuousActionGroups: w } = s,
      { id: R } = s;
    YU(p, i) && (R = $U(t, R));
    let A = h.hasBoundaryNodes && r ? $r(r, bi) : null;
    (w.forEach((N) => {
      let { keyframe: P, actionItems: L } = N;
      L.forEach((X) => {
        let { actionTypeId: B } = X,
          { target: j } = X.config;
        if (!j) return;
        let Z = j.boundaryMode ? A : null,
          ie = JU(j) + bs + B;
        if (((_[ie] = vH(_[ie], P, X)), !g[ie])) {
          g[ie] = !0;
          let { config: D } = X;
          Ii({
            config: D,
            event: m,
            eventTarget: r,
            elementRoot: Z,
            elementApi: Me,
          }).forEach((x) => {
            O.push({ element: x, key: ie });
          });
        }
      });
    }),
      O.forEach(({ element: N, key: P }) => {
        let L = _[P],
          X = (0, yt.default)(L, "[0].actionItems[0]", {}),
          { actionTypeId: B } = X,
          j = wi(B) ? Ts(B)(N, X) : null,
          Z = Is({ element: N, actionItem: X, elementApi: Me }, j);
        ws({
          store: e,
          element: N,
          eventId: n,
          actionListId: o,
          actionItem: X,
          destination: Z,
          continuous: !0,
          parameterId: R,
          actionGroups: L,
          smoothing: a,
          restingValue: u,
          pluginInstance: j,
        });
      }));
  }
  function vH(e = [], t, r) {
    let n = [...e],
      i;
    return (
      n.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
      n[i].actionItems.push(r),
      n
    );
  }
  function yH(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: r } = t;
    (b_(e),
      (0, gr.default)(r, (i, o) => {
        let s = u_[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        TH({ logic: s, store: e, events: i });
      }));
    let { ixSession: n } = e.getState();
    n.eventListeners.length && EH(e);
  }
  function EH(e) {
    let t = () => {
      b_(e);
    };
    (mH.forEach((r) => {
      (window.addEventListener(r, t), e.dispatch(ui(window, [r, t])));
    }),
      t());
  }
  function b_(e) {
    let { ixSession: t, ixData: r } = e.getState(),
      n = window.innerWidth;
    if (n !== t.viewportWidth) {
      let { mediaQueries: i } = r;
      e.dispatch(os({ width: n, mediaQueries: i }));
    }
  }
  function TH({ logic: e, store: t, events: r }) {
    wH(r);
    let { types: n, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = _H(r, IH);
    if (!(0, p_.default)(a)) return;
    (0, gr.default)(a, (f, m) => {
      let p = r[m],
        { action: g, id: _, mediaQueries: O = o.mediaQueryKeys } = p,
        { actionListId: w } = g.config;
      (eH(O, o.mediaQueryKeys) || t.dispatch(as()),
        g.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(p.config) ? p.config : [p.config]).forEach((A) => {
            let { continuousParameterGroupId: N } = A,
              P = (0, yt.default)(s, `${w}.continuousParameterGroups`, []),
              L = (0, d_.default)(P, ({ id: j }) => j === N),
              X = (A.smoothing || 0) / 100,
              B = (A.restingState || 0) / 100;
            L &&
              f.forEach((j, Z) => {
                let ie = _ + bs + Z;
                gH({
                  store: t,
                  eventStateKey: ie,
                  eventTarget: j,
                  eventId: _,
                  eventConfig: A,
                  actionListId: w,
                  parameterGroup: L,
                  smoothing: X,
                  restingValue: B,
                });
              });
          }),
        (g.actionTypeId === Xe.GENERAL_START_ACTION || _s(g.actionTypeId)) &&
          I_({ store: t, actionListId: w, eventId: _ }));
    });
    let u = (f) => {
        let { ixSession: m } = t.getState();
        bH(a, (p, g, _) => {
          let O = r[g],
            w = m.eventState[_],
            { action: R, mediaQueries: A = o.mediaQueryKeys } = O;
          if (!Ti(A, m.mediaQueryKey)) return;
          let N = (P = {}) => {
            let L = i(
              {
                store: t,
                element: p,
                event: O,
                eventConfig: P,
                nativeEvent: f,
                eventStateKey: _,
              },
              w,
            );
            tH(L, w) || t.dispatch(ts(_, L));
          };
          R.actionTypeId === Xe.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(O.config) ? O.config : [O.config]).forEach(N)
            : N();
        });
      },
      d = (0, y_.default)(u, iH),
      h = ({ target: f = document, types: m, throttle: p }) => {
        m.split(" ")
          .filter(Boolean)
          .forEach((g) => {
            let _ = p ? d : u;
            (f.addEventListener(g, _), t.dispatch(ui(f, [g, _])));
          });
      };
    Array.isArray(n) ? n.forEach(h) : typeof n == "string" && h(e);
  }
  function wH(e) {
    if (!nH) return;
    let t = {},
      r = "";
    for (let n in e) {
      let { eventTypeId: i, target: o } = e[n],
        s = us(o);
      t[s] ||
        ((i === Je.MOUSE_CLICK || i === Je.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (r += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (r) {
      let n = document.createElement("style");
      ((n.textContent = r), document.body.appendChild(n));
    }
  }
  function I_({ store: e, actionListId: t, eventId: r }) {
    let { ixData: n, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = n,
      a = s[r],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let d = (0, yt.default)(u, "actionItemGroups[0].actionItems", []),
        h = (0, yt.default)(a, "mediaQueries", n.mediaQueryKeys);
      if (!Ti(h, i.mediaQueryKey)) return;
      d.forEach((f) => {
        let { config: m, actionTypeId: p } = f,
          g =
            m?.target?.useEventTarget === !0 && m?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : m,
          _ = Ii({ config: g, event: a, elementApi: Me }),
          O = wi(p);
        _.forEach((w) => {
          let R = O ? Ts(p)(w, f) : null;
          ws({
            destination: Is({ element: w, actionItem: f, elementApi: Me }, R),
            immediate: !0,
            store: e,
            element: w,
            eventId: r,
            actionItem: f,
            actionListId: t,
            pluginInstance: R,
          });
        });
      });
    }
  }
  function T_({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, gr.default)(t, (r) => {
      if (!r.continuous) {
        let { actionListId: n, verbose: i } = r;
        (xs(r, e), i && e.dispatch(pr({ actionListId: n, isPlaying: !1 })));
      }
    });
  }
  function hr({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && r ? $r(r, bi) : null;
    (0, gr.default)(o, (u) => {
      let d = (0, yt.default)(u, "actionItem.config.target.boundaryMode"),
        h = n ? u.eventStateKey === n : !0;
      if (u.actionListId === i && u.eventId === t && h) {
        if (a && d && !cs(a, u.element)) return;
        (xs(u, e),
          u.verbose && e.dispatch(pr({ actionListId: i, isPlaying: !1 })));
      }
    });
  }
  function en({
    store: e,
    eventId: t,
    eventTarget: r,
    eventStateKey: n,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: d } = e.getState(),
      { events: h } = u,
      f = h[t] || {},
      { mediaQueries: m = u.mediaQueryKeys } = f,
      p = (0, yt.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: g, useFirstGroupAsInitialState: _ } = p;
    if (!g || !g.length) return !1;
    (o >= g.length && (0, yt.default)(f, "config.loop") && (o = 0),
      o === 0 && _ && o++);
    let w =
        (o === 0 || (o === 1 && _)) && _s(f.action?.actionTypeId)
          ? f.config.delay
          : void 0,
      R = (0, yt.default)(g, [o, "actionItems"], []);
    if (!R.length || !Ti(m, d.mediaQueryKey)) return !1;
    let A = d.hasBoundaryNodes && r ? $r(r, bi) : null,
      N = BU(R),
      P = !1;
    return (
      R.forEach((L, X) => {
        let { config: B, actionTypeId: j } = L,
          Z = wi(j),
          { target: ie } = B;
        if (!ie) return;
        let D = ie.boundaryMode ? A : null;
        Ii({
          config: B,
          event: f,
          eventTarget: r,
          elementRoot: D,
          elementApi: Me,
        }).forEach((q, W) => {
          let F = Z ? Ts(j)(q, L) : null,
            J = Z ? rH(j)(q, L) : null;
          P = !0;
          let ne = N === X && W === 0,
            M = jU({ element: q, actionItem: L }),
            G = Is({ element: q, actionItem: L, elementApi: Me }, F);
          ws({
            store: e,
            element: q,
            actionItem: L,
            eventId: t,
            eventTarget: r,
            eventStateKey: n,
            actionListId: i,
            groupIndex: o,
            isCarrier: ne,
            computedStyle: M,
            destination: G,
            immediate: s,
            verbose: a,
            pluginInstance: F,
            pluginDuration: J,
            instanceDelay: w,
          });
        });
      }),
      P
    );
  }
  function ws(e) {
    let { store: t, computedStyle: r, ...n } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: d,
        eventId: h,
      } = n,
      f = !u,
      m = kU(),
      { ixElements: p, ixSession: g, ixData: _ } = t.getState(),
      O = WU(p, i),
      { refState: w } = p[O] || {},
      R = ls(i),
      A = g.reducedMotion && jo[o.actionTypeId],
      N;
    if (A && u)
      switch (_.events[h]?.eventTypeId) {
        case Je.MOUSE_MOVE:
        case Je.MOUSE_MOVE_IN_VIEWPORT:
          N = d;
          break;
        default:
          N = 0.5;
          break;
      }
    let P = zU(i, w, r, o, Me, a);
    if (
      (t.dispatch(
        rs({
          instanceId: m,
          elementId: O,
          origin: P,
          refType: R,
          skipMotion: A,
          skipToValue: N,
          ...n,
        }),
      ),
      w_(document.body, "ix2-animation-started", m),
      s)
    ) {
      xH(t, m);
      return;
    }
    (Gt({ store: t, select: ({ ixInstances: L }) => L[m], onChange: x_ }),
      f && t.dispatch(li(m, g.tick)));
  }
  function xs(e, t) {
    w_(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: r, actionItem: n } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[r] || {};
    (s === m_ && QU(o, n, Me), t.dispatch(ns(e.id)));
  }
  function w_(e, t, r) {
    let n = document.createEvent("CustomEvent");
    (n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n));
  }
  function xH(e, t) {
    let { ixParameters: r } = e.getState();
    (e.dispatch(li(t, 0)), e.dispatch(ci(performance.now(), r)));
    let { ixInstances: n } = e.getState();
    x_(n[t], e);
  }
  function x_(e, t) {
    let {
        active: r,
        continuous: n,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: d,
        groupIndex: h,
        eventId: f,
        eventTarget: m,
        eventStateKey: p,
        actionListId: g,
        isCarrier: _,
        styleProp: O,
        verbose: w,
        pluginInstance: R,
      } = e,
      { ixData: A, ixSession: N } = t.getState(),
      { events: P } = A,
      L = P[f] || {},
      { mediaQueries: X = A.mediaQueryKeys } = L;
    if (Ti(X, N.mediaQueryKey) && (n || r || i)) {
      if (d || (u === HU && i)) {
        t.dispatch(is(o, a, d, s));
        let { ixElements: B } = t.getState(),
          { ref: j, refType: Z, refState: ie } = B[o] || {},
          D = ie && ie[a];
        (Z === m_ || wi(a)) && XU(j, ie, D, f, s, O, Me, u, R);
      }
      if (i) {
        if (_) {
          let B = en({
            store: t,
            eventId: f,
            eventTarget: m,
            eventStateKey: p,
            actionListId: g,
            groupIndex: h + 1,
            verbose: w,
          });
          w && !B && t.dispatch(pr({ actionListId: g, isPlaying: !1 }));
        }
        xs(e, t);
      }
    }
  }
  var d_,
    yt,
    p_,
    h_,
    g_,
    v_,
    gr,
    y_,
    _i,
    UU,
    _s,
    bs,
    bi,
    m_,
    HU,
    l_,
    Ii,
    WU,
    Is,
    Gt,
    kU,
    XU,
    E_,
    BU,
    jU,
    zU,
    KU,
    YU,
    $U,
    Ti,
    QU,
    ZU,
    JU,
    eH,
    tH,
    wi,
    Ts,
    rH,
    f_,
    nH,
    iH,
    mH,
    _H,
    bH,
    IH,
    Es = ye(() => {
      "use strict";
      ((d_ = fe(ba())),
        (yt = fe(Xn())),
        (p_ = fe(Vy())),
        (h_ = fe(fm())),
        (g_ = fe(pm())),
        (v_ = fe(gm())),
        (gr = fe(bm())),
        (y_ = fe(Sm())));
      Ve();
      _i = fe(Ft());
      fi();
      qm();
      c_();
      ((UU = Object.keys(Xo)),
        (_s = (e) => UU.includes(e)),
        ({
          COLON_DELIMITER: bs,
          BOUNDARY_SELECTOR: bi,
          HTML_ELEMENT: m_,
          RENDER_GENERAL: HU,
          W_MOD_IX: l_,
        } = Re),
        ({
          getAffectedElements: Ii,
          getElementId: WU,
          getDestinationValues: Is,
          observeStore: Gt,
          getInstanceId: kU,
          renderHTMLElement: XU,
          clearAllStyles: E_,
          getMaxDurationItemIndex: BU,
          getComputedStyle: jU,
          getInstanceOrigin: zU,
          reduceListToGroup: KU,
          shouldNamespaceEventParameter: YU,
          getNamespacedParameterId: $U,
          shouldAllowMediaQuery: Ti,
          cleanupHTMLElement: QU,
          clearObjectCache: ZU,
          stringifyTarget: JU,
          mediaQueriesEqual: eH,
          shallowEqual: tH,
        } = _i.IX2VanillaUtils),
        ({
          isPluginType: wi,
          createPluginInstance: Ts,
          getPluginDuration: rH,
        } = _i.IX2VanillaPlugins),
        (f_ = navigator.userAgent),
        (nH = f_.match(/iPad/i) || f_.match(/iPhone/)),
        (iH = 12));
      mH = ["resize", "orientationchange"];
      ((_H = (e, t) => (0, h_.default)((0, v_.default)(e, t), g_.default)),
        (bH = (e, t) => {
          (0, gr.default)(e, (r, n) => {
            r.forEach((i, o) => {
              let s = n + bs + o;
              t(i, n, s);
            });
          });
        }),
        (IH = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Ii({ config: t, elementApi: Me });
        }));
    });
  var S_ = c((mt) => {
    "use strict";
    var OH = fn().default,
      AH = cu().default;
    Object.defineProperty(mt, "__esModule", { value: !0 });
    mt.actions = void 0;
    mt.destroy = A_;
    mt.init = NH;
    mt.setEnv = LH;
    mt.store = void 0;
    Kl();
    var SH = Wo(),
      CH = AH((_y(), nt(Ey))),
      Os = (Es(), nt(O_)),
      RH = OH((fi(), nt(Rm)));
    mt.actions = RH;
    var As = (mt.store = (0, SH.createStore)(CH.default));
    function LH(e) {
      e() && (0, Os.observeRequests)(As);
    }
    function NH(e) {
      (A_(), (0, Os.startEngine)({ store: As, rawData: e, allowEvents: !0 }));
    }
    function A_() {
      (0, Os.stopEngine)(As);
    }
  });
  var N_ = c((nz, L_) => {
    "use strict";
    var C_ = We(),
      R_ = S_();
    R_.setEnv(C_.env);
    C_.define(
      "ix2",
      (L_.exports = function () {
        return R_;
      }),
    );
  });
  var q_ = c((iz, P_) => {
    "use strict";
    var vr = We();
    vr.define(
      "links",
      (P_.exports = function (e, t) {
        var r = {},
          n = e(window),
          i,
          o = vr.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          d = /index\.(html|php)$/,
          h = /\/$/,
          f,
          m;
        r.ready = r.design = r.preview = p;
        function p() {
          ((i = o && vr.env("design")),
            (m = vr.env("slug") || s.pathname || ""),
            vr.scroll.off(_),
            (f = []));
          for (var w = document.links, R = 0; R < w.length; ++R) g(w[R]);
          f.length && (vr.scroll.on(_), _());
        }
        function g(w) {
          if (!(w.dataset && w.dataset.wfCurrentLocale)) {
            var R =
              (i && w.getAttribute("href-disabled")) || w.getAttribute("href");
            if (((a.href = R), !(R.indexOf(":") >= 0))) {
              var A = e(w);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var N = e(a.hash);
                N.length && f.push({ link: A, sec: N, active: !1 });
                return;
              }
              if (!(R === "#" || R === "")) {
                var P =
                  a.href === s.href || R === m || (d.test(R) && h.test(m));
                O(A, u, P);
              }
            }
          }
        }
        function _() {
          var w = n.scrollTop(),
            R = n.height();
          t.each(f, function (A) {
            if (
              !(
                A.link[0] &&
                A.link[0].dataset &&
                A.link[0].dataset.wfCurrentLocale
              )
            ) {
              var N = A.link,
                P = A.sec,
                L = P.offset().top,
                X = P.outerHeight(),
                B = R * 0.5,
                j = P.is(":visible") && L + X - B >= w && L + B <= w + R;
              A.active !== j && ((A.active = j), O(N, u, j));
            }
          });
        }
        function O(w, R, A) {
          var N = w.hasClass(R);
          (A && N) || (!A && !N) || (A ? w.addClass(R) : w.removeClass(R));
        }
        return r;
      }),
    );
  });
  var D_ = c((oz, M_) => {
    "use strict";
    var Ai = We();
    Ai.define(
      "scroll",
      (M_.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          r = window.location,
          n = g() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (D) {
              window.setTimeout(D, 15);
            },
          u = Ai.env("editor") ? ".w-editor-body" : "body",
          d =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          h = 'a[href="#"]',
          f = 'a[href*="#"]:not(.w-tab-link):not(' + h + ")",
          m = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          p = document.createElement("style");
        p.appendChild(document.createTextNode(m));
        function g() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
        function O(D) {
          return _.test(D.hash) && D.host + D.pathname === r.host + r.pathname;
        }
        let w =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function R() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            w.matches
          );
        }
        function A(D, x) {
          var q;
          switch (x) {
            case "add":
              ((q = D.attr("tabindex")),
                q
                  ? D.attr("data-wf-tabindex-swap", q)
                  : D.attr("tabindex", "-1"));
              break;
            case "remove":
              ((q = D.attr("data-wf-tabindex-swap")),
                q
                  ? (D.attr("tabindex", q),
                    D.removeAttr("data-wf-tabindex-swap"))
                  : D.removeAttr("tabindex"));
              break;
          }
          D.toggleClass("wf-force-outline-none", x === "add");
        }
        function N(D) {
          var x = D.currentTarget;
          if (
            !(
              Ai.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(x.className))
            )
          ) {
            var q = O(x) ? x.hash : "";
            if (q !== "") {
              var W = e(q);
              W.length &&
                (D && (D.preventDefault(), D.stopPropagation()),
                P(q, D),
                window.setTimeout(
                  function () {
                    L(W, function () {
                      (A(W, "add"),
                        W.get(0).focus({ preventScroll: !0 }),
                        A(W, "remove"));
                    });
                  },
                  D ? 0 : 300,
                ));
            }
          }
        }
        function P(D) {
          if (
            r.hash !== D &&
            n &&
            n.pushState &&
            !(Ai.env.chrome && r.protocol === "file:")
          ) {
            var x = n.state && n.state.hash;
            x !== D && n.pushState({ hash: D }, "", D);
          }
        }
        function L(D, x) {
          var q = i.scrollTop(),
            W = X(D);
          if (q !== W) {
            var F = B(D, q, W),
              J = Date.now(),
              ne = function () {
                var M = Date.now() - J;
                (window.scroll(0, j(q, W, M, F)),
                  M <= F ? a(ne) : typeof x == "function" && x());
              };
            a(ne);
          }
        }
        function X(D) {
          var x = e(d),
            q = x.css("position") === "fixed" ? x.outerHeight() : 0,
            W = D.offset().top - q;
          if (D.data("scroll") === "mid") {
            var F = i.height() - q,
              J = D.outerHeight();
            J < F && (W -= Math.round((F - J) / 2));
          }
          return W;
        }
        function B(D, x, q) {
          if (R()) return 0;
          var W = 1;
          return (
            s.add(D).each(function (F, J) {
              var ne = parseFloat(J.getAttribute("data-scroll-time"));
              !isNaN(ne) && ne >= 0 && (W = ne);
            }),
            (472.143 * Math.log(Math.abs(x - q) + 125) - 2e3) * W
          );
        }
        function j(D, x, q, W) {
          return q > W ? x : D + (x - D) * Z(q / W);
        }
        function Z(D) {
          return D < 0.5
            ? 4 * D * D * D
            : (D - 1) * (2 * D - 2) * (2 * D - 2) + 1;
        }
        function ie() {
          var { WF_CLICK_EMPTY: D, WF_CLICK_SCROLL: x } = t;
          (o.on(x, f, N),
            o.on(D, h, function (q) {
              q.preventDefault();
            }),
            document.head.insertBefore(p, document.head.firstChild));
        }
        return { ready: ie };
      }),
    );
  });
  var G_ = c((az, F_) => {
    "use strict";
    var PH = We();
    PH.define(
      "touch",
      (F_.exports = function (e) {
        var t = {},
          r = window.getSelection;
        ((e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o),
              o ? new n(o) : null
            );
          }));
        function n(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            d,
            h;
          (o.addEventListener("touchstart", f, !1),
            o.addEventListener("touchmove", m, !1),
            o.addEventListener("touchend", p, !1),
            o.addEventListener("touchcancel", g, !1),
            o.addEventListener("mousedown", f, !1),
            o.addEventListener("mousemove", m, !1),
            o.addEventListener("mouseup", p, !1),
            o.addEventListener("mouseout", g, !1));
          function f(O) {
            var w = O.touches;
            (w && w.length > 1) ||
              ((s = !0),
              w ? ((a = !0), (d = w[0].clientX)) : (d = O.clientX),
              (h = d));
          }
          function m(O) {
            if (s) {
              if (a && O.type === "mousemove") {
                (O.preventDefault(), O.stopPropagation());
                return;
              }
              var w = O.touches,
                R = w ? w[0].clientX : O.clientX,
                A = R - h;
              ((h = R),
                Math.abs(A) > u &&
                  r &&
                  String(r()) === "" &&
                  (i("swipe", O, { direction: A > 0 ? "right" : "left" }),
                  g()));
            }
          }
          function p(O) {
            if (s && ((s = !1), a && O.type === "mouseup")) {
              (O.preventDefault(), O.stopPropagation(), (a = !1));
              return;
            }
          }
          function g() {
            s = !1;
          }
          function _() {
            (o.removeEventListener("touchstart", f, !1),
              o.removeEventListener("touchmove", m, !1),
              o.removeEventListener("touchend", p, !1),
              o.removeEventListener("touchcancel", g, !1),
              o.removeEventListener("mousedown", f, !1),
              o.removeEventListener("mousemove", m, !1),
              o.removeEventListener("mouseup", p, !1),
              o.removeEventListener("mouseout", g, !1),
              (o = null));
          }
          this.destroy = _;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return ((t.instance = t.init(document)), t);
      }),
    );
  });
  var V_ = c((Ss) => {
    "use strict";
    Object.defineProperty(Ss, "__esModule", { value: !0 });
    Ss.default = qH;
    function qH(e, t, r, n, i, o, s, a, u, d, h, f, m) {
      return function (p) {
        e(p);
        var g = p.form,
          _ = {
            name: g.attr("data-name") || g.attr("name") || "Untitled Form",
            pageId: g.attr("data-wf-page-id") || "",
            elementId: g.attr("data-wf-element-id") || "",
            source: t.href,
            test: r.env(),
            fields: {},
            fileUploads: {},
            dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(
              g.html(),
            ),
            trackingCookies: n(),
          };
        let O = g.attr("data-wf-flow");
        (O && (_.wfFlow = O), i(p));
        var w = o(g, _.fields);
        if (w) return s(w);
        if (((_.fileUploads = a(g)), u(p), !d)) {
          h(p);
          return;
        }
        f.ajax({
          url: m,
          type: "POST",
          data: _,
          dataType: "json",
          crossDomain: !0,
        })
          .done(function (R) {
            (R && R.code === 200 && (p.success = !0), h(p));
          })
          .fail(function () {
            h(p);
          });
      };
    }
  });
  var H_ = c((uz, U_) => {
    "use strict";
    var Si = We();
    Si.define(
      "forms",
      (U_.exports = function (e, t) {
        var r = {},
          n = e(document),
          i,
          o = window.location,
          s = window.XDomainRequest && !window.atob,
          a = ".w-form",
          u,
          d = /e(-)?mail/i,
          h = /^\S+@\S+$/,
          f = window.alert,
          m = Si.env(),
          p,
          g,
          _,
          O = /list-manage[1-9]?.com/i,
          w = t.debounce(function () {
            f(
              "Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.",
            );
          }, 100);
        r.ready =
          r.design =
          r.preview =
            function () {
              (R(), !m && !p && N());
            };
        function R() {
          ((u = e("html").attr("data-wf-site")),
            (g = "https://webflow.com/api/v1/form/" + u),
            s &&
              g.indexOf("https://webflow.com") >= 0 &&
              (g = g.replace(
                "https://webflow.com",
                "https://formdata.webflow.com",
              )),
            (_ = `${g}/signFile`),
            (i = e(a + " form")),
            i.length && i.each(A));
        }
        function A(M, G) {
          var K = e(G),
            v = e.data(G, a);
          (v || (v = e.data(G, a, { form: K })), P(v));
          var b = K.closest("div.w-form");
          ((v.done = b.find("> .w-form-done")),
            (v.fail = b.find("> .w-form-fail")),
            (v.fileUploads = b.find(".w-file-upload")),
            v.fileUploads.each(function (oe) {
              F(oe, v);
            }));
          var U =
            v.form.attr("aria-label") || v.form.attr("data-name") || "Form";
          (v.done.attr("aria-label") || v.form.attr("aria-label", U),
            v.done.attr("tabindex", "-1"),
            v.done.attr("role", "region"),
            v.done.attr("aria-label") ||
              v.done.attr("aria-label", U + " success"),
            v.fail.attr("tabindex", "-1"),
            v.fail.attr("role", "region"),
            v.fail.attr("aria-label") ||
              v.fail.attr("aria-label", U + " failure"));
          var te = (v.action = K.attr("action"));
          if (
            ((v.handler = null),
            (v.redirect = K.attr("data-redirect")),
            O.test(te))
          ) {
            v.handler = x;
            return;
          }
          if (!te) {
            if (u) {
              v.handler = (() => {
                let oe = V_().default;
                return oe(P, o, Si, Z, W, X, f, B, L, u, q, e, g);
              })();
              return;
            }
            w();
          }
        }
        function N() {
          ((p = !0),
            n.on("submit", a + " form", function (oe) {
              var Y = e.data(this, a);
              Y.handler && ((Y.evt = oe), Y.handler(Y));
            }));
          let M = ".w-checkbox-input",
            G = ".w-radio-input",
            K = "w--redirected-checked",
            v = "w--redirected-focus",
            b = "w--redirected-focus-visible",
            U = ":focus-visible, [data-wf-focus-visible]",
            te = [
              ["checkbox", M],
              ["radio", G],
            ];
          (n.on(
            "change",
            a + ' form input[type="checkbox"]:not(' + M + ")",
            (oe) => {
              e(oe.target).siblings(M).toggleClass(K);
            },
          ),
            n.on("change", a + ' form input[type="radio"]', (oe) => {
              e(`input[name="${oe.target.name}"]:not(${M})`).map((ee, be) =>
                e(be).siblings(G).removeClass(K),
              );
              let Y = e(oe.target);
              Y.hasClass("w-radio-input") || Y.siblings(G).addClass(K);
            }),
            te.forEach(([oe, Y]) => {
              (n.on(
                "focus",
                a + ` form input[type="${oe}"]:not(` + Y + ")",
                (ee) => {
                  (e(ee.target).siblings(Y).addClass(v),
                    e(ee.target).filter(U).siblings(Y).addClass(b));
                },
              ),
                n.on(
                  "blur",
                  a + ` form input[type="${oe}"]:not(` + Y + ")",
                  (ee) => {
                    e(ee.target).siblings(Y).removeClass(`${v} ${b}`);
                  },
                ));
            }));
        }
        function P(M) {
          var G = (M.btn = M.form.find(':input[type="submit"]'));
          ((M.wait = M.btn.attr("data-wait") || null),
            (M.success = !1),
            G.prop("disabled", !1),
            M.label && G.val(M.label));
        }
        function L(M) {
          var G = M.btn,
            K = M.wait;
          (G.prop("disabled", !0), K && ((M.label = G.val()), G.val(K)));
        }
        function X(M, G) {
          var K = null;
          return (
            (G = G || {}),
            M.find(':input:not([type="submit"]):not([type="file"])').each(
              function (v, b) {
                var U = e(b),
                  te = U.attr("type"),
                  oe =
                    U.attr("data-name") || U.attr("name") || "Field " + (v + 1),
                  Y = U.val();
                if (te === "checkbox") Y = U.is(":checked");
                else if (te === "radio") {
                  if (G[oe] === null || typeof G[oe] == "string") return;
                  Y =
                    M.find(
                      'input[name="' + U.attr("name") + '"]:checked',
                    ).val() || null;
                }
                (typeof Y == "string" && (Y = e.trim(Y)),
                  (G[oe] = Y),
                  (K = K || ie(U, te, oe, Y)));
              },
            ),
            K
          );
        }
        function B(M) {
          var G = {};
          return (
            M.find(':input[type="file"]').each(function (K, v) {
              var b = e(v),
                U = b.attr("data-name") || b.attr("name") || "File " + (K + 1),
                te = b.attr("data-value");
              (typeof te == "string" && (te = e.trim(te)), (G[U] = te));
            }),
            G
          );
        }
        let j = { _mkto_trk: "marketo" };
        function Z() {
          return document.cookie.split("; ").reduce(function (G, K) {
            let v = K.split("="),
              b = v[0];
            if (b in j) {
              let U = j[b],
                te = v.slice(1).join("=");
              G[U] = te;
            }
            return G;
          }, {});
        }
        function ie(M, G, K, v) {
          var b = null;
          return (
            G === "password"
              ? (b = "Passwords cannot be submitted.")
              : M.attr("required")
                ? v
                  ? d.test(M.attr("type")) &&
                    (h.test(v) ||
                      (b = "Please enter a valid email address for: " + K))
                  : (b = "Please fill out the required field: " + K)
                : K === "g-recaptcha-response" &&
                  !v &&
                  (b = "Please confirm you\u2019re not a robot."),
            b
          );
        }
        function D(M) {
          (W(M), q(M));
        }
        function x(M) {
          P(M);
          var G = M.form,
            K = {};
          if (/^https/.test(o.href) && !/^https/.test(M.action)) {
            G.attr("method", "post");
            return;
          }
          W(M);
          var v = X(G, K);
          if (v) return f(v);
          L(M);
          var b;
          (t.each(K, function (Y, ee) {
            (d.test(ee) && (K.EMAIL = Y),
              /^((full[ _-]?)?name)$/i.test(ee) && (b = Y),
              /^(first[ _-]?name)$/i.test(ee) && (K.FNAME = Y),
              /^(last[ _-]?name)$/i.test(ee) && (K.LNAME = Y));
          }),
            b &&
              !K.FNAME &&
              ((b = b.split(" ")),
              (K.FNAME = b[0]),
              (K.LNAME = K.LNAME || b[1])));
          var U = M.action.replace("/post?", "/post-json?") + "&c=?",
            te = U.indexOf("u=") + 2;
          te = U.substring(te, U.indexOf("&", te));
          var oe = U.indexOf("id=") + 3;
          ((oe = U.substring(oe, U.indexOf("&", oe))),
            (K["b_" + te + "_" + oe] = ""),
            e
              .ajax({ url: U, data: K, dataType: "jsonp" })
              .done(function (Y) {
                ((M.success = Y.result === "success" || /already/.test(Y.msg)),
                  M.success || console.info("MailChimp error: " + Y.msg),
                  q(M));
              })
              .fail(function () {
                q(M);
              }));
        }
        function q(M) {
          var G = M.form,
            K = M.redirect,
            v = M.success;
          if (v && K) {
            Si.location(K);
            return;
          }
          (M.done.toggle(v),
            M.fail.toggle(!v),
            v ? M.done.focus() : M.fail.focus(),
            G.toggle(!v),
            P(M));
        }
        function W(M) {
          (M.evt && M.evt.preventDefault(), (M.evt = null));
        }
        function F(M, G) {
          if (!G.fileUploads || !G.fileUploads[M]) return;
          var K,
            v = e(G.fileUploads[M]),
            b = v.find("> .w-file-upload-default"),
            U = v.find("> .w-file-upload-uploading"),
            te = v.find("> .w-file-upload-success"),
            oe = v.find("> .w-file-upload-error"),
            Y = b.find(".w-file-upload-input"),
            ee = b.find(".w-file-upload-label"),
            be = ee.children(),
            ue = oe.find(".w-file-upload-error-msg"),
            y = te.find(".w-file-upload-file"),
            V = te.find(".w-file-remove-link"),
            z = y.find(".w-file-upload-file-name"),
            k = ue.attr("data-w-size-error"),
            de = ue.attr("data-w-type-error"),
            Be = ue.attr("data-w-generic-error");
          if (
            (m ||
              ee.on("click keydown", function (I) {
                (I.type === "keydown" && I.which !== 13 && I.which !== 32) ||
                  (I.preventDefault(), Y.click());
              }),
            ee.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"),
            V.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"),
            m)
          )
            (Y.on("click", function (I) {
              I.preventDefault();
            }),
              ee.on("click", function (I) {
                I.preventDefault();
              }),
              be.on("click", function (I) {
                I.preventDefault();
              }));
          else {
            (V.on("click keydown", function (I) {
              if (I.type === "keydown") {
                if (I.which !== 13 && I.which !== 32) return;
                I.preventDefault();
              }
              (Y.removeAttr("data-value"),
                Y.val(""),
                z.html(""),
                b.toggle(!0),
                te.toggle(!1),
                ee.focus());
            }),
              Y.on("change", function (I) {
                ((K = I.target && I.target.files && I.target.files[0]),
                  K &&
                    (b.toggle(!1),
                    oe.toggle(!1),
                    U.toggle(!0),
                    U.focus(),
                    z.text(K.name),
                    S() || L(G),
                    (G.fileUploads[M].uploading = !0),
                    J(K, E)));
              }));
            var De = ee.outerHeight();
            (Y.height(De), Y.width(1));
          }
          function l(I) {
            var C = I.responseJSON && I.responseJSON.msg,
              Q = Be;
            (typeof C == "string" && C.indexOf("InvalidFileTypeError") === 0
              ? (Q = de)
              : typeof C == "string" &&
                C.indexOf("MaxFileSizeError") === 0 &&
                (Q = k),
              ue.text(Q),
              Y.removeAttr("data-value"),
              Y.val(""),
              U.toggle(!1),
              b.toggle(!0),
              oe.toggle(!0),
              oe.focus(),
              (G.fileUploads[M].uploading = !1),
              S() || P(G));
          }
          function E(I, C) {
            if (I) return l(I);
            var Q = C.fileName,
              ae = C.postData,
              ge = C.fileId,
              H = C.s3Url;
            (Y.attr("data-value", ge), ne(H, ae, K, Q, T));
          }
          function T(I) {
            if (I) return l(I);
            (U.toggle(!1),
              te.css("display", "inline-block"),
              te.focus(),
              (G.fileUploads[M].uploading = !1),
              S() || P(G));
          }
          function S() {
            var I = (G.fileUploads && G.fileUploads.toArray()) || [];
            return I.some(function (C) {
              return C.uploading;
            });
          }
        }
        function J(M, G) {
          var K = new URLSearchParams({ name: M.name, size: M.size });
          e.ajax({ type: "GET", url: `${_}?${K}`, crossDomain: !0 })
            .done(function (v) {
              G(null, v);
            })
            .fail(function (v) {
              G(v);
            });
        }
        function ne(M, G, K, v, b) {
          var U = new FormData();
          for (var te in G) U.append(te, G[te]);
          (U.append("file", K, v),
            e
              .ajax({
                type: "POST",
                url: M,
                data: U,
                processData: !1,
                contentType: !1,
              })
              .done(function () {
                b(null);
              })
              .fail(function (oe) {
                b(oe);
              }));
        }
        return r;
      }),
    );
  });
  var X_ = c((cz, k_) => {
    "use strict";
    var Cs = We(),
      W_ = "w-condition-invisible",
      MH = "." + W_;
    function DH(e) {
      return e.filter(function (t) {
        return !rn(t);
      });
    }
    function rn(e) {
      return !!(e.$el && e.$el.closest(MH).length);
    }
    function Rs(e, t) {
      for (var r = e; r >= 0; r--) if (!rn(t[r])) return r;
      return -1;
    }
    function Ls(e, t) {
      for (var r = e; r <= t.length - 1; r++) if (!rn(t[r])) return r;
      return -1;
    }
    function FH(e, t) {
      return Rs(e - 1, t) === -1;
    }
    function GH(e, t) {
      return Ls(e + 1, t) === -1;
    }
    function tn(e, t) {
      e.attr("aria-label") || e.attr("aria-label", t);
    }
    function VH(e, t, r, n) {
      var i = r.tram,
        o = Array.isArray,
        s = "w-lightbox",
        a = s + "-",
        u = /(^|\s+)/g,
        d = [],
        h,
        f,
        m,
        p = [];
      function g(v, b) {
        return (
          (d = o(v) ? v : [v]),
          f || g.build(),
          DH(d).length > 1 &&
            ((f.items = f.empty),
            d.forEach(function (U, te) {
              var oe = G("thumbnail"),
                Y = G("item")
                  .prop("tabIndex", 0)
                  .attr("aria-controls", "w-lightbox-view")
                  .attr("role", "tab")
                  .append(oe);
              (tn(Y, `show item ${te + 1} of ${d.length}`),
                rn(U) && Y.addClass(W_),
                (f.items = f.items.add(Y)),
                Z(U.thumbnailUrl || U.url, function (ee) {
                  (ee.prop("width") > ee.prop("height")
                    ? F(ee, "wide")
                    : F(ee, "tall"),
                    oe.append(F(ee, "thumbnail-image")));
                }));
            }),
            f.strip.empty().append(f.items),
            F(f.content, "group")),
          i(J(f.lightbox, "hide").trigger("focus"))
            .add("opacity .3s")
            .start({ opacity: 1 }),
          F(f.html, "noscroll"),
          g.show(b || 0)
        );
      }
      ((g.build = function () {
        return (
          g.destroy(),
          (f = { html: r(t.documentElement), empty: r() }),
          (f.arrowLeft = G("control left inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.arrowRight = G("control right inactive")
            .attr("role", "button")
            .attr("aria-hidden", !0)
            .attr("aria-controls", "w-lightbox-view")),
          (f.close = G("control close").attr("role", "button")),
          tn(f.arrowLeft, "previous image"),
          tn(f.arrowRight, "next image"),
          tn(f.close, "close lightbox"),
          (f.spinner = G("spinner")
            .attr("role", "progressbar")
            .attr("aria-live", "polite")
            .attr("aria-hidden", !1)
            .attr("aria-busy", !0)
            .attr("aria-valuemin", 0)
            .attr("aria-valuemax", 100)
            .attr("aria-valuenow", 0)
            .attr("aria-valuetext", "Loading image")),
          (f.strip = G("strip").attr("role", "tablist")),
          (m = new x(f.spinner, q("hide"))),
          (f.content = G("content").append(
            f.spinner,
            f.arrowLeft,
            f.arrowRight,
            f.close,
          )),
          (f.container = G("container").append(f.content, f.strip)),
          (f.lightbox = G("backdrop hide").append(f.container)),
          f.strip.on("click", W("item"), A),
          f.content
            .on("swipe", N)
            .on("click", W("left"), O)
            .on("click", W("right"), w)
            .on("click", W("close"), R)
            .on("click", W("image, caption"), w),
          f.container.on("click", W("view"), R).on("dragstart", W("img"), L),
          f.lightbox.on("keydown", X).on("focusin", P),
          r(n).append(f.lightbox),
          g
        );
      }),
        (g.destroy = function () {
          f && (J(f.html, "noscroll"), f.lightbox.remove(), (f = void 0));
        }),
        (g.show = function (v) {
          if (v !== h) {
            var b = d[v];
            if (!b) return g.hide();
            if (rn(b)) {
              if (v < h) {
                var U = Rs(v - 1, d);
                v = U > -1 ? U : v;
              } else {
                var te = Ls(v + 1, d);
                v = te > -1 ? te : v;
              }
              b = d[v];
            }
            var oe = h;
            ((h = v),
              f.spinner
                .attr("aria-hidden", !1)
                .attr("aria-busy", !0)
                .attr("aria-valuenow", 0)
                .attr("aria-valuetext", "Loading image"),
              m.show());
            var Y = (b.html && K(b.width, b.height)) || b.url;
            return (
              Z(Y, function (ee) {
                if (v !== h) return;
                var be = G("figure", "figure").append(F(ee, "image")),
                  ue = G("frame").append(be),
                  y = G("view")
                    .prop("tabIndex", 0)
                    .attr("id", "w-lightbox-view")
                    .append(ue),
                  V,
                  z;
                (b.html &&
                  ((V = r(b.html)),
                  (z = V.is("iframe")),
                  z && V.on("load", k),
                  be.append(F(V, "embed"))),
                  b.caption &&
                    be.append(G("caption", "figcaption").text(b.caption)),
                  f.spinner.before(y),
                  z || k());
                function k() {
                  if (
                    (f.spinner
                      .attr("aria-hidden", !0)
                      .attr("aria-busy", !1)
                      .attr("aria-valuenow", 100)
                      .attr("aria-valuetext", "Loaded image"),
                    m.hide(),
                    v !== h)
                  ) {
                    y.remove();
                    return;
                  }
                  let de = FH(v, d);
                  (ne(f.arrowLeft, "inactive", de),
                    M(f.arrowLeft, de),
                    de && f.arrowLeft.is(":focus") && f.arrowRight.focus());
                  let Be = GH(v, d);
                  if (
                    (ne(f.arrowRight, "inactive", Be),
                    M(f.arrowRight, Be),
                    Be && f.arrowRight.is(":focus") && f.arrowLeft.focus(),
                    f.view
                      ? (i(f.view)
                          .add("opacity .3s")
                          .start({ opacity: 0 })
                          .then(ie(f.view)),
                        i(y)
                          .add("opacity .3s")
                          .add("transform .3s")
                          .set({ x: v > oe ? "80px" : "-80px" })
                          .start({ opacity: 1, x: 0 }))
                      : y.css("opacity", 1),
                    (f.view = y),
                    f.view.prop("tabIndex", 0),
                    f.items)
                  ) {
                    (J(f.items, "active"), f.items.removeAttr("aria-selected"));
                    var De = f.items.eq(v);
                    (F(De, "active"), De.attr("aria-selected", !0), D(De));
                  }
                }
              }),
              f.close.prop("tabIndex", 0),
              r(":focus").addClass("active-lightbox"),
              p.length === 0 &&
                (r("body")
                  .children()
                  .each(function () {
                    r(this).hasClass("w-lightbox-backdrop") ||
                      r(this).is("script") ||
                      (p.push({
                        node: r(this),
                        hidden: r(this).attr("aria-hidden"),
                        tabIndex: r(this).attr("tabIndex"),
                      }),
                      r(this).attr("aria-hidden", !0).attr("tabIndex", -1));
                  }),
                f.close.focus()),
              g
            );
          }
        }),
        (g.hide = function () {
          return (
            i(f.lightbox).add("opacity .3s").start({ opacity: 0 }).then(j),
            g
          );
        }),
        (g.prev = function () {
          var v = Rs(h - 1, d);
          v > -1 && g.show(v);
        }),
        (g.next = function () {
          var v = Ls(h + 1, d);
          v > -1 && g.show(v);
        }));
      function _(v) {
        return function (b) {
          this === b.target && (b.stopPropagation(), b.preventDefault(), v());
        };
      }
      var O = _(g.prev),
        w = _(g.next),
        R = _(g.hide),
        A = function (v) {
          var b = r(this).index();
          (v.preventDefault(), g.show(b));
        },
        N = function (v, b) {
          (v.preventDefault(),
            b.direction === "left"
              ? g.next()
              : b.direction === "right" && g.prev());
        },
        P = function () {
          this.focus();
        };
      function L(v) {
        v.preventDefault();
      }
      function X(v) {
        var b = v.keyCode;
        b === 27 || B(b, "close")
          ? g.hide()
          : b === 37 || B(b, "left")
            ? g.prev()
            : b === 39 || B(b, "right")
              ? g.next()
              : B(b, "item") && r(":focus").click();
      }
      function B(v, b) {
        if (v !== 13 && v !== 32) return !1;
        var U = r(":focus").attr("class"),
          te = q(b).trim();
        return U.includes(te);
      }
      function j() {
        f &&
          (f.strip.scrollLeft(0).empty(),
          J(f.html, "noscroll"),
          F(f.lightbox, "hide"),
          f.view && f.view.remove(),
          J(f.content, "group"),
          F(f.arrowLeft, "inactive"),
          F(f.arrowRight, "inactive"),
          (h = f.view = void 0),
          p.forEach(function (v) {
            var b = v.node;
            b &&
              (v.hidden
                ? b.attr("aria-hidden", v.hidden)
                : b.removeAttr("aria-hidden"),
              v.tabIndex
                ? b.attr("tabIndex", v.tabIndex)
                : b.removeAttr("tabIndex"));
          }),
          (p = []),
          r(".active-lightbox").removeClass("active-lightbox").focus());
      }
      function Z(v, b) {
        var U = G("img", "img");
        return (
          U.one("load", function () {
            b(U);
          }),
          U.attr("src", v),
          U
        );
      }
      function ie(v) {
        return function () {
          v.remove();
        };
      }
      function D(v) {
        var b = v.get(0),
          U = f.strip.get(0),
          te = b.offsetLeft,
          oe = b.clientWidth,
          Y = U.scrollLeft,
          ee = U.clientWidth,
          be = U.scrollWidth - ee,
          ue;
        (te < Y
          ? (ue = Math.max(0, te + oe - ee))
          : te + oe > ee + Y && (ue = Math.min(te, be)),
          ue != null &&
            i(f.strip).add("scroll-left 500ms").start({ "scroll-left": ue }));
      }
      function x(v, b, U) {
        ((this.$element = v),
          (this.className = b),
          (this.delay = U || 200),
          this.hide());
      }
      ((x.prototype.show = function () {
        var v = this;
        v.timeoutId ||
          (v.timeoutId = setTimeout(function () {
            (v.$element.removeClass(v.className), delete v.timeoutId);
          }, v.delay));
      }),
        (x.prototype.hide = function () {
          var v = this;
          if (v.timeoutId) {
            (clearTimeout(v.timeoutId), delete v.timeoutId);
            return;
          }
          v.$element.addClass(v.className);
        }));
      function q(v, b) {
        return v.replace(u, (b ? " ." : " ") + a);
      }
      function W(v) {
        return q(v, !0);
      }
      function F(v, b) {
        return v.addClass(q(b));
      }
      function J(v, b) {
        return v.removeClass(q(b));
      }
      function ne(v, b, U) {
        return v.toggleClass(q(b), U);
      }
      function M(v, b) {
        return v.attr("aria-hidden", b).attr("tabIndex", b ? -1 : 0);
      }
      function G(v, b) {
        return F(r(t.createElement(b || "div")), v);
      }
      function K(v, b) {
        var U =
          '<svg xmlns="http://www.w3.org/2000/svg" width="' +
          v +
          '" height="' +
          b +
          '"/>';
        return "data:image/svg+xml;charset=utf-8," + encodeURI(U);
      }
      return (
        (function () {
          var v = e.navigator.userAgent,
            b = /(iPhone|iPad|iPod);[^OS]*OS (\d)/,
            U = v.match(b),
            te = v.indexOf("Android ") > -1 && v.indexOf("Chrome") === -1;
          if (!te && (!U || U[2] > 7)) return;
          var oe = t.createElement("style");
          (t.head.appendChild(oe), e.addEventListener("resize", Y, !0));
          function Y() {
            var ee = e.innerHeight,
              be = e.innerWidth,
              ue =
                ".w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                ee +
                "px}.w-lightbox-view {width:" +
                be +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.86 * ee +
                "px}.w-lightbox-image {max-width:" +
                be +
                "px;max-height:" +
                ee +
                "px}.w-lightbox-group .w-lightbox-image {max-height:" +
                0.86 * ee +
                "px}.w-lightbox-strip {padding: 0 " +
                0.01 * ee +
                "px}.w-lightbox-item {width:" +
                0.1 * ee +
                "px;padding:" +
                0.02 * ee +
                "px " +
                0.01 * ee +
                "px}.w-lightbox-thumbnail {height:" +
                0.1 * ee +
                "px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:" +
                0.96 * ee +
                "px}.w-lightbox-content {margin-top:" +
                0.02 * ee +
                "px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:" +
                0.84 * ee +
                "px}.w-lightbox-image {max-width:" +
                0.96 * be +
                "px;max-height:" +
                0.96 * ee +
                "px}.w-lightbox-group .w-lightbox-image {max-width:" +
                0.823 * be +
                "px;max-height:" +
                0.84 * ee +
                "px}}";
            oe.textContent = ue;
          }
          Y();
        })(),
        g
      );
    }
    Cs.define(
      "lightbox",
      (k_.exports = function (e) {
        var t = {},
          r = Cs.env(),
          n = VH(window, document, e, r ? "#lightbox-mountpoint" : "body"),
          i = e(document),
          o,
          s,
          a = ".w-lightbox",
          u;
        t.ready = t.design = t.preview = d;
        function d() {
          ((s = r && Cs.env("design")),
            n.destroy(),
            (u = {}),
            (o = i.find(a)),
            o.webflowLightBox(),
            o.each(function () {
              (tn(e(this), "open lightbox"),
                e(this).attr("aria-haspopup", "dialog"));
            }));
        }
        jQuery.fn.extend({
          webflowLightBox: function () {
            var p = this;
            e.each(p, function (g, _) {
              var O = e.data(_, a);
              (O ||
                (O = e.data(_, a, {
                  el: e(_),
                  mode: "images",
                  images: [],
                  embed: "",
                })),
                O.el.off(a),
                h(O),
                s
                  ? O.el.on("setting" + a, h.bind(null, O))
                  : O.el.on("click" + a, f(O)).on("click" + a, function (w) {
                      w.preventDefault();
                    }));
            });
          },
        });
        function h(p) {
          var g = p.el.children(".w-json").html(),
            _,
            O;
          if (!g) {
            p.items = [];
            return;
          }
          try {
            g = JSON.parse(g);
          } catch (w) {
            console.error("Malformed lightbox JSON configuration.", w);
          }
          (m(g),
            g.items.forEach(function (w) {
              w.$el = p.el;
            }),
            (_ = g.group),
            _
              ? ((O = u[_]),
                O || (O = u[_] = []),
                (p.items = O),
                g.items.length &&
                  ((p.index = O.length), O.push.apply(O, g.items)))
              : ((p.items = g.items), (p.index = 0)));
        }
        function f(p) {
          return function () {
            p.items.length && n(p.items, p.index || 0);
          };
        }
        function m(p) {
          (p.images &&
            (p.images.forEach(function (g) {
              g.type = "image";
            }),
            (p.items = p.images)),
            p.embed && ((p.embed.type = "video"), (p.items = [p.embed])),
            p.groupId && (p.group = p.groupId));
        }
        return t;
      }),
    );
  });
  var j_ = c((lz, B_) => {
    "use strict";
    var At = We(),
      UH = Fi(),
      Ce = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    At.define(
      "navbar",
      (B_.exports = function (e, t) {
        var r = {},
          n = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          d,
          h,
          f = At.env(),
          m = '<div class="w-nav-overlay" data-wf-ignore />',
          p = ".w-nav",
          g = "w--open",
          _ = "w--nav-dropdown-open",
          O = "w--nav-dropdown-toggle-open",
          w = "w--nav-dropdown-list-open",
          R = "w--nav-link-open",
          A = UH.triggers,
          N = e();
        ((r.ready = r.design = r.preview = P),
          (r.destroy = function () {
            ((N = e()), L(), u && u.length && u.each(Z));
          }));
        function P() {
          ((d = f && At.env("design")),
            (h = At.env("editor")),
            (a = e(document.body)),
            (u = o.find(p)),
            u.length && (u.each(j), L(), X()));
        }
        function L() {
          At.resize.off(B);
        }
        function X() {
          At.resize.on(B);
        }
        function B() {
          u.each(b);
        }
        function j(y, V) {
          var z = e(V),
            k = e.data(V, p);
          (k ||
            (k = e.data(V, p, {
              open: !1,
              el: z,
              config: {},
              selectedIdx: -1,
            })),
            (k.menu = z.find(".w-nav-menu")),
            (k.links = k.menu.find(".w-nav-link")),
            (k.dropdowns = k.menu.find(".w-dropdown")),
            (k.dropdownToggle = k.menu.find(".w-dropdown-toggle")),
            (k.dropdownList = k.menu.find(".w-dropdown-list")),
            (k.button = z.find(".w-nav-button")),
            (k.container = z.find(".w-container")),
            (k.overlayContainerId = "w-nav-overlay-" + y),
            (k.outside = K(k)));
          var de = z.find(".w-nav-brand");
          (de &&
            de.attr("href") === "/" &&
            de.attr("aria-label") == null &&
            de.attr("aria-label", "home"),
            k.button.attr("style", "-webkit-user-select: text;"),
            k.button.attr("aria-label") == null &&
              k.button.attr("aria-label", "menu"),
            k.button.attr("role", "button"),
            k.button.attr("tabindex", "0"),
            k.button.attr("aria-controls", k.overlayContainerId),
            k.button.attr("aria-haspopup", "menu"),
            k.button.attr("aria-expanded", "false"),
            k.el.off(p),
            k.button.off(p),
            k.menu.off(p),
            x(k),
            d
              ? (ie(k), k.el.on("setting" + p, q(k)))
              : (D(k),
                k.button.on("click" + p, M(k)),
                k.menu.on("click" + p, "a", G(k)),
                k.button.on("keydown" + p, W(k)),
                k.el.on("keydown" + p, F(k))),
            b(y, V));
        }
        function Z(y, V) {
          var z = e.data(V, p);
          z && (ie(z), e.removeData(V, p));
        }
        function ie(y) {
          y.overlay && (ue(y, !0), y.overlay.remove(), (y.overlay = null));
        }
        function D(y) {
          y.overlay ||
            ((y.overlay = e(m).appendTo(y.el)),
            y.overlay.attr("id", y.overlayContainerId),
            (y.parent = y.menu.parent()),
            ue(y, !0));
        }
        function x(y) {
          var V = {},
            z = y.config || {},
            k = (V.animation = y.el.attr("data-animation") || "default");
          ((V.animOver = /^over/.test(k)),
            (V.animDirect = /left$/.test(k) ? -1 : 1),
            z.animation !== k && y.open && t.defer(ne, y),
            (V.easing = y.el.attr("data-easing") || "ease"),
            (V.easing2 = y.el.attr("data-easing2") || "ease"));
          var de = y.el.attr("data-duration");
          ((V.duration = de != null ? Number(de) : 400),
            (V.docHeight = y.el.attr("data-doc-height")),
            (y.config = V));
        }
        function q(y) {
          return function (V, z) {
            z = z || {};
            var k = i.width();
            (x(y),
              z.open === !0 && ee(y, !0),
              z.open === !1 && ue(y, !0),
              y.open &&
                t.defer(function () {
                  k !== i.width() && ne(y);
                }));
          };
        }
        function W(y) {
          return function (V) {
            switch (V.keyCode) {
              case Ce.SPACE:
              case Ce.ENTER:
                return (M(y)(), V.preventDefault(), V.stopPropagation());
              case Ce.ESCAPE:
                return (ue(y), V.preventDefault(), V.stopPropagation());
              case Ce.ARROW_RIGHT:
              case Ce.ARROW_DOWN:
              case Ce.HOME:
              case Ce.END:
                return y.open
                  ? (V.keyCode === Ce.END
                      ? (y.selectedIdx = y.links.length - 1)
                      : (y.selectedIdx = 0),
                    J(y),
                    V.preventDefault(),
                    V.stopPropagation())
                  : (V.preventDefault(), V.stopPropagation());
            }
          };
        }
        function F(y) {
          return function (V) {
            if (y.open)
              switch (
                ((y.selectedIdx = y.links.index(document.activeElement)),
                V.keyCode)
              ) {
                case Ce.HOME:
                case Ce.END:
                  return (
                    V.keyCode === Ce.END
                      ? (y.selectedIdx = y.links.length - 1)
                      : (y.selectedIdx = 0),
                    J(y),
                    V.preventDefault(),
                    V.stopPropagation()
                  );
                case Ce.ESCAPE:
                  return (
                    ue(y),
                    y.button.focus(),
                    V.preventDefault(),
                    V.stopPropagation()
                  );
                case Ce.ARROW_LEFT:
                case Ce.ARROW_UP:
                  return (
                    (y.selectedIdx = Math.max(-1, y.selectedIdx - 1)),
                    J(y),
                    V.preventDefault(),
                    V.stopPropagation()
                  );
                case Ce.ARROW_RIGHT:
                case Ce.ARROW_DOWN:
                  return (
                    (y.selectedIdx = Math.min(
                      y.links.length - 1,
                      y.selectedIdx + 1,
                    )),
                    J(y),
                    V.preventDefault(),
                    V.stopPropagation()
                  );
              }
          };
        }
        function J(y) {
          if (y.links[y.selectedIdx]) {
            var V = y.links[y.selectedIdx];
            (V.focus(), G(V));
          }
        }
        function ne(y) {
          y.open && (ue(y, !0), ee(y, !0));
        }
        function M(y) {
          return s(function () {
            y.open ? ue(y) : ee(y);
          });
        }
        function G(y) {
          return function (V) {
            var z = e(this),
              k = z.attr("href");
            if (!At.validClick(V.currentTarget)) {
              V.preventDefault();
              return;
            }
            k && k.indexOf("#") === 0 && y.open && ue(y);
          };
        }
        function K(y) {
          return (
            y.outside && o.off("click" + p, y.outside),
            function (V) {
              var z = e(V.target);
              (h && z.closest(".w-editor-bem-EditorOverlay").length) || v(y, z);
            }
          );
        }
        var v = s(function (y, V) {
          if (y.open) {
            var z = V.closest(".w-nav-menu");
            y.menu.is(z) || ue(y);
          }
        });
        function b(y, V) {
          var z = e.data(V, p),
            k = (z.collapsed = z.button.css("display") !== "none");
          if ((z.open && !k && !d && ue(z, !0), z.container.length)) {
            var de = te(z);
            (z.links.each(de), z.dropdowns.each(de));
          }
          z.open && be(z);
        }
        var U = "max-width";
        function te(y) {
          var V = y.container.css(U);
          return (
            V === "none" && (V = ""),
            function (z, k) {
              ((k = e(k)), k.css(U, ""), k.css(U) === "none" && k.css(U, V));
            }
          );
        }
        function oe(y, V) {
          V.setAttribute("data-nav-menu-open", "");
        }
        function Y(y, V) {
          V.removeAttribute("data-nav-menu-open");
        }
        function ee(y, V) {
          if (y.open) return;
          ((y.open = !0),
            y.menu.each(oe),
            y.links.addClass(R),
            y.dropdowns.addClass(_),
            y.dropdownToggle.addClass(O),
            y.dropdownList.addClass(w),
            y.button.addClass(g));
          var z = y.config,
            k = z.animation;
          (k === "none" || !n.support.transform || z.duration <= 0) && (V = !0);
          var de = be(y),
            Be = y.menu.outerHeight(!0),
            De = y.menu.outerWidth(!0),
            l = y.el.height(),
            E = y.el[0];
          if (
            (b(0, E),
            A.intro(0, E),
            At.redraw.up(),
            d || o.on("click" + p, y.outside),
            V)
          ) {
            I();
            return;
          }
          var T = "transform " + z.duration + "ms " + z.easing;
          if (
            (y.overlay &&
              ((N = y.menu.prev()), y.overlay.show().append(y.menu)),
            z.animOver)
          ) {
            (n(y.menu)
              .add(T)
              .set({ x: z.animDirect * De, height: de })
              .start({ x: 0 })
              .then(I),
              y.overlay && y.overlay.width(De));
            return;
          }
          var S = l + Be;
          n(y.menu).add(T).set({ y: -S }).start({ y: 0 }).then(I);
          function I() {
            y.button.attr("aria-expanded", "true");
          }
        }
        function be(y) {
          var V = y.config,
            z = V.docHeight ? o.height() : a.height();
          return (
            V.animOver
              ? y.menu.height(z)
              : y.el.css("position") !== "fixed" && (z -= y.el.outerHeight(!0)),
            y.overlay && y.overlay.height(z),
            z
          );
        }
        function ue(y, V) {
          if (!y.open) return;
          ((y.open = !1), y.button.removeClass(g));
          var z = y.config;
          if (
            ((z.animation === "none" ||
              !n.support.transform ||
              z.duration <= 0) &&
              (V = !0),
            A.outro(0, y.el[0]),
            o.off("click" + p, y.outside),
            V)
          ) {
            (n(y.menu).stop(), E());
            return;
          }
          var k = "transform " + z.duration + "ms " + z.easing2,
            de = y.menu.outerHeight(!0),
            Be = y.menu.outerWidth(!0),
            De = y.el.height();
          if (z.animOver) {
            n(y.menu)
              .add(k)
              .start({ x: Be * z.animDirect })
              .then(E);
            return;
          }
          var l = De + de;
          n(y.menu).add(k).start({ y: -l }).then(E);
          function E() {
            (y.menu.height(""),
              n(y.menu).set({ x: 0, y: 0 }),
              y.menu.each(Y),
              y.links.removeClass(R),
              y.dropdowns.removeClass(_),
              y.dropdownToggle.removeClass(O),
              y.dropdownList.removeClass(w),
              y.overlay &&
                y.overlay.children().length &&
                (N.length ? y.menu.insertAfter(N) : y.menu.prependTo(y.parent),
                y.overlay.attr("style", "").hide()),
              y.el.triggerHandler("w-close"),
              y.button.attr("aria-expanded", "false"));
          }
        }
        return r;
      }),
    );
  });
  Ps();
  qs();
  zs();
  Ys();
  Qs();
  eu();
  Fi();
  N_();
  q_();
  D_();
  G_();
  H_();
  X_();
  j_();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 * _.each
 * _.map
 * _.find
 * _.filter
 * _.any
 * _.contains
 * _.delay
 * _.defer
 * _.throttle (webflow)
 * _.debounce
 * _.keys
 * _.has
 * _.now
 * _.template (webflow: upgraded to 1.13.6)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa36a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa36a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690556646824,
    },
    "e-2": {
      id: "e-2",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa36a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa36a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690556646824,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa36f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa36f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690558269997,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa36f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa36f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690558269997,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa377",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa377",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690558596967,
    },
    "e-10": {
      id: "e-10",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-9",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa377",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa377",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690558596967,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-12",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa37c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa37c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690558630155,
    },
    "e-12": {
      id: "e-12",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-11",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "51f55c35-564f-f3e5-96da-749c327aa37c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "51f55c35-564f-f3e5-96da-749c327aa37c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690558630155,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690651806510,
    },
    "e-45": {
      id: "e-45",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-46",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|1432f09f-54a5-4efa-2128-202f176202a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|1432f09f-54a5-4efa-2128-202f176202a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690654438558,
    },
    "e-47": {
      id: "e-47",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-48",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|9550c5e2-3fef-13ac-90fb-a5f6b678ff26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|9550c5e2-3fef-13ac-90fb-a5f6b678ff26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690654439207,
    },
    "e-49": {
      id: "e-49",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-50",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690708336104,
    },
    "e-51": {
      id: "e-51",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-52",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690708821313,
    },
    "e-53": {
      id: "e-53",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-54",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690708998402,
    },
    "e-55": {
      id: "e-55",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-56",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690709035654,
    },
    "e-57": {
      id: "e-57",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-58",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690709071087,
    },
    "e-59": {
      id: "e-59",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-60",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690709123518,
    },
    "e-61": {
      id: "e-61",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-62",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-63": {
      id: "e-63",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-64",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562|1432f09f-54a5-4efa-2128-202f176202a4",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562|1432f09f-54a5-4efa-2128-202f176202a4",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-65": {
      id: "e-65",
      name: "",
      animationType: "preset",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-66",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562|9550c5e2-3fef-13ac-90fb-a5f6b678ff26",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562|9550c5e2-3fef-13ac-90fb-a5f6b678ff26",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-67": {
      id: "e-67",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-68",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-69": {
      id: "e-69",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-16",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-70",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-71": {
      id: "e-71",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-17",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-72",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-73": {
      id: "e-73",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-74",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-75": {
      id: "e-75",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-19",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-76",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-77": {
      id: "e-77",
      name: "",
      animationType: "preset",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-78",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690710454507,
    },
    "e-79": {
      id: "e-79",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-80",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|b9c95c08-a63d-9c45-eef6-dcb98a345cd3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|b9c95c08-a63d-9c45-eef6-dcb98a345cd3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711036472,
    },
    "e-80": {
      id: "e-80",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-79",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|b9c95c08-a63d-9c45-eef6-dcb98a345cd3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|b9c95c08-a63d-9c45-eef6-dcb98a345cd3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711036501,
    },
    "e-81": {
      id: "e-81",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-82",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|b5d7e1f9-a582-3059-be8a-421711aac49f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|b5d7e1f9-a582-3059-be8a-421711aac49f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711047081,
    },
    "e-82": {
      id: "e-82",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-81",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|b5d7e1f9-a582-3059-be8a-421711aac49f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|b5d7e1f9-a582-3059-be8a-421711aac49f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711047110,
    },
    "e-83": {
      id: "e-83",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-84",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|f336ecc2-6794-9cd8-024e-452e804da981",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|f336ecc2-6794-9cd8-024e-452e804da981",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711062949,
    },
    "e-84": {
      id: "e-84",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-83",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|f336ecc2-6794-9cd8-024e-452e804da981",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|f336ecc2-6794-9cd8-024e-452e804da981",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711062949,
    },
    "e-85": {
      id: "e-85",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-86",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|4bea2c1f-f76f-cca1-8eac-d3d3d2c6cf88",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|4bea2c1f-f76f-cca1-8eac-d3d3d2c6cf88",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711074898,
    },
    "e-86": {
      id: "e-86",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-85",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|4bea2c1f-f76f-cca1-8eac-d3d3d2c6cf88",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|4bea2c1f-f76f-cca1-8eac-d3d3d2c6cf88",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711074899,
    },
    "e-87": {
      id: "e-87",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-88",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|c66937aa-2147-3170-126e-64d2816473db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|c66937aa-2147-3170-126e-64d2816473db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711088264,
    },
    "e-88": {
      id: "e-88",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-87",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|c66937aa-2147-3170-126e-64d2816473db",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|c66937aa-2147-3170-126e-64d2816473db",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711088265,
    },
    "e-89": {
      id: "e-89",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-90",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|bf8efc8b-f9c6-9ef5-e5a5-4ff2cf8f7232",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|bf8efc8b-f9c6-9ef5-e5a5-4ff2cf8f7232",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711099286,
    },
    "e-90": {
      id: "e-90",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-89",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c383974e1c7df81ca46da3|bf8efc8b-f9c6-9ef5-e5a5-4ff2cf8f7232",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c383974e1c7df81ca46da3|bf8efc8b-f9c6-9ef5-e5a5-4ff2cf8f7232",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690711099315,
    },
    "e-91": {
      id: "e-91",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-92",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690712436561,
    },
    "e-93": {
      id: "e-93",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-94",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690712744748,
    },
    "e-95": {
      id: "e-95",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-96",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690712787212,
    },
    "e-97": {
      id: "e-97",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-24",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-98",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690713323522,
    },
    "e-99": {
      id: "e-99",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-25",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-100",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690713405389,
    },
    "e-101": {
      id: "e-101",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-102",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690713441682,
    },
    "e-103": {
      id: "e-103",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-104",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c631b6111fbd713e5b9562",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c631b6111fbd713e5b9562",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1690714601357,
    },
    "e-115": {
      id: "e-115",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691008636285,
    },
    "e-116": {
      id: "e-116",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-117",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691008888598,
    },
    "e-117": {
      id: "e-117",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-116",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691008888598,
    },
    "e-118": {
      id: "e-118",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-119",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009424745,
    },
    "e-119": {
      id: "e-119",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-118",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009424745,
    },
    "e-120": {
      id: "e-120",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009424745,
    },
    "e-121": {
      id: "e-121",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-122",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009507322,
    },
    "e-122": {
      id: "e-122",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-121",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009507322,
    },
    "e-123": {
      id: "e-123",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009507322,
    },
    "e-124": {
      id: "e-124",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-125",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009508241,
    },
    "e-125": {
      id: "e-125",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-124",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009508241,
    },
    "e-126": {
      id: "e-126",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009508241,
    },
    "e-127": {
      id: "e-127",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-128",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009510387,
    },
    "e-128": {
      id: "e-128",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-127",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009510387,
    },
    "e-129": {
      id: "e-129",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009510387,
    },
    "e-130": {
      id: "e-130",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-131",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009510596,
    },
    "e-131": {
      id: "e-131",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-130",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009510596,
    },
    "e-132": {
      id: "e-132",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009510596,
    },
    "e-133": {
      id: "e-133",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-134",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009511457,
    },
    "e-134": {
      id: "e-134",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-133",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009511457,
    },
    "e-135": {
      id: "e-135",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009511457,
    },
    "e-136": {
      id: "e-136",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-137",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009511684,
    },
    "e-137": {
      id: "e-137",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-136",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691009511684,
    },
    "e-138": {
      id: "e-138",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691009511684,
    },
    "e-141": {
      id: "e-141",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-142": {
      id: "e-142",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-143",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-143": {
      id: "e-143",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-142",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-144": {
      id: "e-144",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-145",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-145": {
      id: "e-145",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-144",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-146": {
      id: "e-146",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-147": {
      id: "e-147",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-148",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-148": {
      id: "e-148",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-147",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-149": {
      id: "e-149",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-150": {
      id: "e-150",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-151",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-151": {
      id: "e-151",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-150",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-152": {
      id: "e-152",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-153": {
      id: "e-153",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-154",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-154": {
      id: "e-154",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-153",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-155": {
      id: "e-155",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-156": {
      id: "e-156",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-157",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-157": {
      id: "e-157",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-156",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-158": {
      id: "e-158",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-159": {
      id: "e-159",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-160",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-160": {
      id: "e-160",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-159",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-161": {
      id: "e-161",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-162": {
      id: "e-162",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-163",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-163": {
      id: "e-163",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-162",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010030529,
    },
    "e-164": {
      id: "e-164",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010030529,
    },
    "e-167": {
      id: "e-167",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-168": {
      id: "e-168",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-169",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-169": {
      id: "e-169",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-168",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|28e76dd3-681f-702d-f40c-ffa919148c4d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|28e76dd3-681f-702d-f40c-ffa919148c4d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-170": {
      id: "e-170",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-171",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-171": {
      id: "e-171",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-170",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-172": {
      id: "e-172",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|60131a16-e2cc-91f6-0086-3c9649c886ca",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|60131a16-e2cc-91f6-0086-3c9649c886ca",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-173": {
      id: "e-173",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-174",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-174": {
      id: "e-174",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-173",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-175": {
      id: "e-175",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|2db71b7c-2866-8f23-38a7-2e706ce4da9a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-176": {
      id: "e-176",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-177",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-177": {
      id: "e-177",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-176",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-178": {
      id: "e-178",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|018d6cf2-088b-cc9d-d714-5972a7b48bd0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-179": {
      id: "e-179",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-180",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-180": {
      id: "e-180",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-179",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-181": {
      id: "e-181",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|9e9554ca-0a2b-f000-bad4-3c6fce657d54",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-182": {
      id: "e-182",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-183",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-183": {
      id: "e-183",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-182",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-184": {
      id: "e-184",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|694606fa-8195-fb9c-2182-e691e76349e0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|694606fa-8195-fb9c-2182-e691e76349e0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-185": {
      id: "e-185",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-186",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-186": {
      id: "e-186",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-185",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-187": {
      id: "e-187",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|54e6138e-91cd-dc37-6c09-6f5cbdc6f376",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-188": {
      id: "e-188",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-189",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-189": {
      id: "e-189",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-188",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691010747546,
    },
    "e-190": {
      id: "e-190",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|2ef72eaa-cf52-3eeb-faf5-3142a0c920da",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691010747546,
    },
    "e-217": {
      id: "e-217",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caca4d9df5b751c7f518ac|01b8c1c9-ed58-5af0-0ad7-bcad16090e97",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caca4d9df5b751c7f518ac|01b8c1c9-ed58-5af0-0ad7-bcad16090e97",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691011814672,
    },
    "e-218": {
      id: "e-218",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-219",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caca4d9df5b751c7f518ac|01b8c1c9-ed58-5af0-0ad7-bcad16090e97",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caca4d9df5b751c7f518ac|01b8c1c9-ed58-5af0-0ad7-bcad16090e97",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691011814672,
    },
    "e-219": {
      id: "e-219",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-218",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caca4d9df5b751c7f518ac|01b8c1c9-ed58-5af0-0ad7-bcad16090e97",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caca4d9df5b751c7f518ac|01b8c1c9-ed58-5af0-0ad7-bcad16090e97",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691011814672,
    },
    "e-246": {
      id: "e-246",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-247",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cace500af0e12261b4884d|1ca3854d-d832-a317-5908-31a8a03399af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cace500af0e12261b4884d|1ca3854d-d832-a317-5908-31a8a03399af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691012938481,
    },
    "e-247": {
      id: "e-247",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-246",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cace500af0e12261b4884d|1ca3854d-d832-a317-5908-31a8a03399af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cace500af0e12261b4884d|1ca3854d-d832-a317-5908-31a8a03399af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691012938481,
    },
    "e-248": {
      id: "e-248",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cace500af0e12261b4884d|1ca3854d-d832-a317-5908-31a8a03399af",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cace500af0e12261b4884d|1ca3854d-d832-a317-5908-31a8a03399af",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691012938481,
    },
    "e-275": {
      id: "e-275",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-276",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cad0a72357e58e3ab1a9de|89ee1472-501d-822d-2060-c64873bc955a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cad0a72357e58e3ab1a9de|89ee1472-501d-822d-2060-c64873bc955a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691013477057,
    },
    "e-276": {
      id: "e-276",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-275",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cad0a72357e58e3ab1a9de|89ee1472-501d-822d-2060-c64873bc955a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cad0a72357e58e3ab1a9de|89ee1472-501d-822d-2060-c64873bc955a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691013477057,
    },
    "e-277": {
      id: "e-277",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cad0a72357e58e3ab1a9de|89ee1472-501d-822d-2060-c64873bc955a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cad0a72357e58e3ab1a9de|89ee1472-501d-822d-2060-c64873bc955a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691013477057,
    },
    "e-304": {
      id: "e-304",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|78593bbd-e768-5239-3e23-2a35aaaf2b10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|78593bbd-e768-5239-3e23-2a35aaaf2b10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068178926,
    },
    "e-305": {
      id: "e-305",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-306",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|78593bbd-e768-5239-3e23-2a35aaaf2b10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|78593bbd-e768-5239-3e23-2a35aaaf2b10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068196890,
    },
    "e-306": {
      id: "e-306",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-305",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|78593bbd-e768-5239-3e23-2a35aaaf2b10",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|78593bbd-e768-5239-3e23-2a35aaaf2b10",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068196920,
    },
    "e-307": {
      id: "e-307",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|35595009-4ff5-2e23-d5dd-e5597d480415",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|35595009-4ff5-2e23-d5dd-e5597d480415",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068330509,
    },
    "e-308": {
      id: "e-308",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-309",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|35595009-4ff5-2e23-d5dd-e5597d480415",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|35595009-4ff5-2e23-d5dd-e5597d480415",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068330509,
    },
    "e-309": {
      id: "e-309",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-308",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|35595009-4ff5-2e23-d5dd-e5597d480415",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|35595009-4ff5-2e23-d5dd-e5597d480415",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068330509,
    },
    "e-310": {
      id: "e-310",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|ed3ebd20-4e52-0e92-77be-c39df55b897b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|ed3ebd20-4e52-0e92-77be-c39df55b897b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068342965,
    },
    "e-311": {
      id: "e-311",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-312",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|ed3ebd20-4e52-0e92-77be-c39df55b897b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|ed3ebd20-4e52-0e92-77be-c39df55b897b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068342965,
    },
    "e-312": {
      id: "e-312",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-311",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|ed3ebd20-4e52-0e92-77be-c39df55b897b",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|ed3ebd20-4e52-0e92-77be-c39df55b897b",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068342965,
    },
    "e-313": {
      id: "e-313",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|fdbfb7f3-0e0d-0d48-55bc-8a9a1d24890e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|fdbfb7f3-0e0d-0d48-55bc-8a9a1d24890e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068343451,
    },
    "e-314": {
      id: "e-314",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-315",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|fdbfb7f3-0e0d-0d48-55bc-8a9a1d24890e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|fdbfb7f3-0e0d-0d48-55bc-8a9a1d24890e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068343451,
    },
    "e-315": {
      id: "e-315",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-314",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|fdbfb7f3-0e0d-0d48-55bc-8a9a1d24890e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|fdbfb7f3-0e0d-0d48-55bc-8a9a1d24890e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068343451,
    },
    "e-316": {
      id: "e-316",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|fe6d5ba9-0113-e0d8-468b-49b63fe9ac6a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|fe6d5ba9-0113-e0d8-468b-49b63fe9ac6a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068343724,
    },
    "e-317": {
      id: "e-317",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-318",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|fe6d5ba9-0113-e0d8-468b-49b63fe9ac6a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|fe6d5ba9-0113-e0d8-468b-49b63fe9ac6a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068343724,
    },
    "e-318": {
      id: "e-318",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-317",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|fe6d5ba9-0113-e0d8-468b-49b63fe9ac6a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|fe6d5ba9-0113-e0d8-468b-49b63fe9ac6a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068343724,
    },
    "e-319": {
      id: "e-319",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|56dbc24c-6ac6-5c85-0103-3fd3e5cd3cfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|56dbc24c-6ac6-5c85-0103-3fd3e5cd3cfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068343887,
    },
    "e-320": {
      id: "e-320",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-321",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|56dbc24c-6ac6-5c85-0103-3fd3e5cd3cfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|56dbc24c-6ac6-5c85-0103-3fd3e5cd3cfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068343887,
    },
    "e-321": {
      id: "e-321",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-320",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|56dbc24c-6ac6-5c85-0103-3fd3e5cd3cfe",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|56dbc24c-6ac6-5c85-0103-3fd3e5cd3cfe",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068343887,
    },
    "e-322": {
      id: "e-322",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|c3c930ed-333a-2cb6-7386-8e6790ea0418",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|c3c930ed-333a-2cb6-7386-8e6790ea0418",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068344468,
    },
    "e-323": {
      id: "e-323",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-324",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|c3c930ed-333a-2cb6-7386-8e6790ea0418",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|c3c930ed-333a-2cb6-7386-8e6790ea0418",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068344468,
    },
    "e-324": {
      id: "e-324",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-323",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|c3c930ed-333a-2cb6-7386-8e6790ea0418",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|c3c930ed-333a-2cb6-7386-8e6790ea0418",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068344468,
    },
    "e-325": {
      id: "e-325",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|9ec16941-9e7c-cbac-d465-bd5d4d74d5e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|9ec16941-9e7c-cbac-d465-bd5d4d74d5e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068344835,
    },
    "e-326": {
      id: "e-326",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-327",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|9ec16941-9e7c-cbac-d465-bd5d4d74d5e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|9ec16941-9e7c-cbac-d465-bd5d4d74d5e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068344835,
    },
    "e-327": {
      id: "e-327",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-326",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|9ec16941-9e7c-cbac-d465-bd5d4d74d5e1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|9ec16941-9e7c-cbac-d465-bd5d4d74d5e1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068344835,
    },
    "e-354": {
      id: "e-354",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|ffce18da-b9cb-b41d-e8a7-8e645e22075a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|ffce18da-b9cb-b41d-e8a7-8e645e22075a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068794037,
    },
    "e-355": {
      id: "e-355",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-356",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|ffce18da-b9cb-b41d-e8a7-8e645e22075a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|ffce18da-b9cb-b41d-e8a7-8e645e22075a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068794037,
    },
    "e-356": {
      id: "e-356",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-355",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|ffce18da-b9cb-b41d-e8a7-8e645e22075a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|ffce18da-b9cb-b41d-e8a7-8e645e22075a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068794037,
    },
    "e-357": {
      id: "e-357",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-358",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|95c46241-fe70-5a7c-ce74-47ff1d08544c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|95c46241-fe70-5a7c-ce74-47ff1d08544c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068868978,
    },
    "e-358": {
      id: "e-358",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-357",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|95c46241-fe70-5a7c-ce74-47ff1d08544c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|95c46241-fe70-5a7c-ce74-47ff1d08544c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068868978,
    },
    "e-359": {
      id: "e-359",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|95c46241-fe70-5a7c-ce74-47ff1d08544c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|95c46241-fe70-5a7c-ce74-47ff1d08544c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068868978,
    },
    "e-360": {
      id: "e-360",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-361",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|f48019fc-64c6-6f48-5a89-6249df2eb066",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|f48019fc-64c6-6f48-5a89-6249df2eb066",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068869540,
    },
    "e-361": {
      id: "e-361",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-360",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|f48019fc-64c6-6f48-5a89-6249df2eb066",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|f48019fc-64c6-6f48-5a89-6249df2eb066",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068869540,
    },
    "e-362": {
      id: "e-362",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|f48019fc-64c6-6f48-5a89-6249df2eb066",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|f48019fc-64c6-6f48-5a89-6249df2eb066",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068869540,
    },
    "e-363": {
      id: "e-363",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-364",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|9b65f807-ff51-14c2-94cf-d51d7ab96993",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|9b65f807-ff51-14c2-94cf-d51d7ab96993",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068869765,
    },
    "e-364": {
      id: "e-364",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-363",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|9b65f807-ff51-14c2-94cf-d51d7ab96993",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|9b65f807-ff51-14c2-94cf-d51d7ab96993",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068869765,
    },
    "e-365": {
      id: "e-365",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|9b65f807-ff51-14c2-94cf-d51d7ab96993",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|9b65f807-ff51-14c2-94cf-d51d7ab96993",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068869765,
    },
    "e-366": {
      id: "e-366",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-367",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|51180470-2797-b676-faea-2d0edb002499",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|51180470-2797-b676-faea-2d0edb002499",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068873091,
    },
    "e-367": {
      id: "e-367",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-366",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|51180470-2797-b676-faea-2d0edb002499",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|51180470-2797-b676-faea-2d0edb002499",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068873091,
    },
    "e-368": {
      id: "e-368",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|51180470-2797-b676-faea-2d0edb002499",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|51180470-2797-b676-faea-2d0edb002499",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068873091,
    },
    "e-369": {
      id: "e-369",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-370",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|dc1ea4ba-2cbe-1e0b-73a7-58c4e191ecea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|dc1ea4ba-2cbe-1e0b-73a7-58c4e191ecea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068874611,
    },
    "e-370": {
      id: "e-370",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-369",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|dc1ea4ba-2cbe-1e0b-73a7-58c4e191ecea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|dc1ea4ba-2cbe-1e0b-73a7-58c4e191ecea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068874611,
    },
    "e-371": {
      id: "e-371",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|dc1ea4ba-2cbe-1e0b-73a7-58c4e191ecea",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|dc1ea4ba-2cbe-1e0b-73a7-58c4e191ecea",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068874611,
    },
    "e-372": {
      id: "e-372",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-373",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|52d89851-0a2b-8281-89f5-f5581aebab55",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|52d89851-0a2b-8281-89f5-f5581aebab55",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068875218,
    },
    "e-373": {
      id: "e-373",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-372",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|52d89851-0a2b-8281-89f5-f5581aebab55",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|52d89851-0a2b-8281-89f5-f5581aebab55",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068875218,
    },
    "e-374": {
      id: "e-374",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|52d89851-0a2b-8281-89f5-f5581aebab55",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|52d89851-0a2b-8281-89f5-f5581aebab55",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068875218,
    },
    "e-375": {
      id: "e-375",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-376",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|d4345dab-6932-bdf9-5a3c-959f59b56951",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|d4345dab-6932-bdf9-5a3c-959f59b56951",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068875571,
    },
    "e-376": {
      id: "e-376",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-375",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|d4345dab-6932-bdf9-5a3c-959f59b56951",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|d4345dab-6932-bdf9-5a3c-959f59b56951",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691068875571,
    },
    "e-377": {
      id: "e-377",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|d4345dab-6932-bdf9-5a3c-959f59b56951",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|d4345dab-6932-bdf9-5a3c-959f59b56951",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691068875571,
    },
    "e-404": {
      id: "e-404",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|a01193b2-a173-38c8-f3d0-1a185308ba6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|a01193b2-a173-38c8-f3d0-1a185308ba6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069256380,
    },
    "e-405": {
      id: "e-405",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-406",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|a01193b2-a173-38c8-f3d0-1a185308ba6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|a01193b2-a173-38c8-f3d0-1a185308ba6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069256380,
    },
    "e-406": {
      id: "e-406",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-405",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|a01193b2-a173-38c8-f3d0-1a185308ba6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|a01193b2-a173-38c8-f3d0-1a185308ba6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069256380,
    },
    "e-407": {
      id: "e-407",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|93abd775-5625-6f6c-0f0f-47e487803e70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|93abd775-5625-6f6c-0f0f-47e487803e70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069291444,
    },
    "e-408": {
      id: "e-408",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-409",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|93abd775-5625-6f6c-0f0f-47e487803e70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|93abd775-5625-6f6c-0f0f-47e487803e70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069291444,
    },
    "e-409": {
      id: "e-409",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-408",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|93abd775-5625-6f6c-0f0f-47e487803e70",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|93abd775-5625-6f6c-0f0f-47e487803e70",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069291444,
    },
    "e-410": {
      id: "e-410",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|19119138-4d0b-4b80-b8b3-47039be4a6d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|19119138-4d0b-4b80-b8b3-47039be4a6d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069291656,
    },
    "e-411": {
      id: "e-411",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-412",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|19119138-4d0b-4b80-b8b3-47039be4a6d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|19119138-4d0b-4b80-b8b3-47039be4a6d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069291656,
    },
    "e-412": {
      id: "e-412",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-411",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|19119138-4d0b-4b80-b8b3-47039be4a6d7",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|19119138-4d0b-4b80-b8b3-47039be4a6d7",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069291656,
    },
    "e-413": {
      id: "e-413",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|e9228b73-e8c5-0695-a084-119a40c5281c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|e9228b73-e8c5-0695-a084-119a40c5281c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069291841,
    },
    "e-414": {
      id: "e-414",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-415",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|e9228b73-e8c5-0695-a084-119a40c5281c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|e9228b73-e8c5-0695-a084-119a40c5281c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069291841,
    },
    "e-415": {
      id: "e-415",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-414",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|e9228b73-e8c5-0695-a084-119a40c5281c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|e9228b73-e8c5-0695-a084-119a40c5281c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069291841,
    },
    "e-416": {
      id: "e-416",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|1c3b532a-2e30-44ee-a643-f1461341bf1a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|1c3b532a-2e30-44ee-a643-f1461341bf1a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069293349,
    },
    "e-417": {
      id: "e-417",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-418",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|1c3b532a-2e30-44ee-a643-f1461341bf1a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|1c3b532a-2e30-44ee-a643-f1461341bf1a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069293349,
    },
    "e-418": {
      id: "e-418",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-417",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|1c3b532a-2e30-44ee-a643-f1461341bf1a",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|1c3b532a-2e30-44ee-a643-f1461341bf1a",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069293349,
    },
    "e-419": {
      id: "e-419",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|544b688f-d467-6747-e7d7-888f833c1c6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|544b688f-d467-6747-e7d7-888f833c1c6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069293664,
    },
    "e-420": {
      id: "e-420",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-421",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|544b688f-d467-6747-e7d7-888f833c1c6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|544b688f-d467-6747-e7d7-888f833c1c6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069293664,
    },
    "e-421": {
      id: "e-421",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-420",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|544b688f-d467-6747-e7d7-888f833c1c6c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|544b688f-d467-6747-e7d7-888f833c1c6c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069293664,
    },
    "e-422": {
      id: "e-422",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|a3d4b7c0-3222-54e4-fc7e-cc6cd1b386cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|a3d4b7c0-3222-54e4-fc7e-cc6cd1b386cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069294429,
    },
    "e-423": {
      id: "e-423",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-424",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|a3d4b7c0-3222-54e4-fc7e-cc6cd1b386cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|a3d4b7c0-3222-54e4-fc7e-cc6cd1b386cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069294429,
    },
    "e-424": {
      id: "e-424",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-423",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|a3d4b7c0-3222-54e4-fc7e-cc6cd1b386cd",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|a3d4b7c0-3222-54e4-fc7e-cc6cd1b386cd",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069294429,
    },
    "e-425": {
      id: "e-425",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_MOVE",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-29", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|9374aeb4-61e3-4b75-3cd6-55c3ed99697c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|9374aeb4-61e3-4b75-3cd6-55c3ed99697c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-29-p",
          selectedAxis: "X_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
        {
          continuousParameterGroupId: "a-29-p-2",
          selectedAxis: "Y_AXIS",
          basedOn: "ELEMENT",
          reverse: false,
          smoothing: 95,
          restingState: 50,
        },
      ],
      createdOn: 1691069294764,
    },
    "e-426": {
      id: "e-426",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-427",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|9374aeb4-61e3-4b75-3cd6-55c3ed99697c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|9374aeb4-61e3-4b75-3cd6-55c3ed99697c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069294764,
    },
    "e-427": {
      id: "e-427",
      name: "",
      animationType: "preset",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-31",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-426",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|9374aeb4-61e3-4b75-3cd6-55c3ed99697c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|9374aeb4-61e3-4b75-3cd6-55c3ed99697c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691069294764,
    },
    "e-482": {
      id: "e-482",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-483",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbc09577d68a51e97305d6|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbc09577d68a51e97305d6|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691343916951,
    },
    "e-484": {
      id: "e-484",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-485",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cfb436d3768d39b75e95b6|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cfb436d3768d39b75e95b6|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344268015,
    },
    "e-486": {
      id: "e-486",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-487",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cfb436d3768d39b75e95b6|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cfb436d3768d39b75e95b6|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344275940,
    },
    "e-488": {
      id: "e-488",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-489",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c8dd6ce4679436a501fef8|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c8dd6ce4679436a501fef8|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344309329,
    },
    "e-490": {
      id: "e-490",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-491",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c8dd6ce4679436a501fef8|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c8dd6ce4679436a501fef8|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344318810,
    },
    "e-492": {
      id: "e-492",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-493",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "ef2baa8f-fa15-715e-ca23-592e2441581e",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "ef2baa8f-fa15-715e-ca23-592e2441581e",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344374732,
    },
    "e-494": {
      id: "e-494",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-495",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c91706f9378691ebf9af15|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c91706f9378691ebf9af15|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344409966,
    },
    "e-496": {
      id: "e-496",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-497",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c91706f9378691ebf9af15|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c91706f9378691ebf9af15|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344414885,
    },
    "e-498": {
      id: "e-498",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-499",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c91ecbc0474de6a01f58cb|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c91ecbc0474de6a01f58cb|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344455753,
    },
    "e-500": {
      id: "e-500",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-501",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c91ecbc0474de6a01f58cb|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c91ecbc0474de6a01f58cb|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344463037,
    },
    "e-502": {
      id: "e-502",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-503",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344534411,
    },
    "e-504": {
      id: "e-504",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-505",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caaec479d140e243676192|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caaec479d140e243676192|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344539800,
    },
    "e-506": {
      id: "e-506",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-507",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caca4d9df5b751c7f518ac|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caca4d9df5b751c7f518ac|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344573050,
    },
    "e-508": {
      id: "e-508",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-509",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64caca4d9df5b751c7f518ac|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64caca4d9df5b751c7f518ac|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344583017,
    },
    "e-510": {
      id: "e-510",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-511",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344602408,
    },
    "e-512": {
      id: "e-512",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-513",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba65ccec256e2e3e543f8|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba65ccec256e2e3e543f8|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344608947,
    },
    "e-514": {
      id: "e-514",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-515",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344631698,
    },
    "e-516": {
      id: "e-516",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-517",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac3ee4a57a9fde4331b50|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac3ee4a57a9fde4331b50|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344683364,
    },
    "e-518": {
      id: "e-518",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-519",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cace500af0e12261b4884d|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cace500af0e12261b4884d|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344718069,
    },
    "e-520": {
      id: "e-520",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-521",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cace500af0e12261b4884d|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cace500af0e12261b4884d|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344724370,
    },
    "e-522": {
      id: "e-522",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-523",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344735549,
    },
    "e-524": {
      id: "e-524",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-525",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cba9446b542a2d3a3cefa7|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cba9446b542a2d3a3cefa7|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344743102,
    },
    "e-526": {
      id: "e-526",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-527",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cac6bb9df5b751c7f0955d|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cac6bb9df5b751c7f0955d|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344759068,
    },
    "e-528": {
      id: "e-528",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-529",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cad0a72357e58e3ab1a9de|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cad0a72357e58e3ab1a9de|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344781112,
    },
    "e-530": {
      id: "e-530",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-531",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbab21383cd9406e776af4|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbab21383cd9406e776af4|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344792918,
    },
    "e-532": {
      id: "e-532",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-533",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbb716b2a069391500bdc5|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbb716b2a069391500bdc5|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344806410,
    },
    "e-534": {
      id: "e-534",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-535",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbb716b2a069391500bdc5|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbb716b2a069391500bdc5|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344811791,
    },
    "e-536": {
      id: "e-536",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-537",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbd40e0ef07a44807e819e|7b180746-2d5d-bb5a-3f9c-2551dc5cee3f",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbd40e0ef07a44807e819e|7b180746-2d5d-bb5a-3f9c-2551dc5cee3f",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344839024,
    },
    "e-538": {
      id: "e-538",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-539",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cbcaa0abc5e1eecbef5890|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cbcaa0abc5e1eecbef5890|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344855805,
    },
    "e-540": {
      id: "e-540",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-541",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd0b5c02d6112362a6c169|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd0b5c02d6112362a6c169|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344873034,
    },
    "e-542": {
      id: "e-542",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-543",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd0b5c02d6112362a6c169|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd0b5c02d6112362a6c169|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344878628,
    },
    "e-544": {
      id: "e-544",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-545",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd122b10bb114001139241|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd122b10bb114001139241|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344891441,
    },
    "e-546": {
      id: "e-546",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-547",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd122b10bb114001139241|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd122b10bb114001139241|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344898101,
    },
    "e-548": {
      id: "e-548",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-549",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd172f7909dd405a70fb02|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd172f7909dd405a70fb02|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344910508,
    },
    "e-550": {
      id: "e-550",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-551",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd172f7909dd405a70fb02|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd172f7909dd405a70fb02|47fe705f-ad91-7e1e-b3c2-f54ffecfb0fb",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344916275,
    },
    "e-552": {
      id: "e-552",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-553",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c934424940e5af19e59121|390ec792-8614-ce12-f427-eb9a1ce50d5d",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c934424940e5af19e59121|390ec792-8614-ce12-f427-eb9a1ce50d5d",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344928261,
    },
    "e-554": {
      id: "e-554",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-555",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64c934424940e5af19e59121|620b1527-59d9-5978-7e10-f901a02e99b3",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64c934424940e5af19e59121|620b1527-59d9-5978-7e10-f901a02e99b3",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344935820,
    },
    "e-556": {
      id: "e-556",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-557",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd0574ae835b49fc67bce9|64cd0574ae835b49fc67bcfeaN",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd0574ae835b49fc67bce9|64cd0574ae835b49fc67bcfeaN",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344956783,
    },
    "e-558": {
      id: "e-558",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-34",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-559",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "64cd03fd53b8a0b1516c7d49|64cd03fd53b8a0b1516c7d4caN",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "64cd03fd53b8a0b1516c7d49|64cd03fd53b8a0b1516c7d4caN",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 0,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1691344967348,
    },
  },
  actionLists: {
    "a-3": {
      id: "a-3",
      title: "Underline - On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".underline",
                  selectorGuids: ["c61de68f-3234-2dff-a347-9fef5419929b"],
                },
                xValue: -105,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-3-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".underline",
                  selectorGuids: ["c61de68f-3234-2dff-a347-9fef5419929b"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690556649741,
    },
    "a-4": {
      id: "a-4",
      title: "Underline - Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".underline",
                  selectorGuids: ["c61de68f-3234-2dff-a347-9fef5419929b"],
                },
                xValue: 105,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".underline",
                  selectorGuids: ["c61de68f-3234-2dff-a347-9fef5419929b"],
                },
                xValue: -105,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1690556649741,
    },
    "a-13": {
      id: "a-13",
      title: "Preload Navbar",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".block-info",
                  selectorGuids: ["79379aca-423e-333b-4a91-1a7857b32c4a"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-13-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["e710639b-d766-09cf-e2d2-35441d2255c9"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-13-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 700,
                easing: "ease",
                duration: 1400,
                target: {
                  selector: ".block-info",
                  selectorGuids: ["79379aca-423e-333b-4a91-1a7857b32c4a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-13-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 700,
                easing: "ease",
                duration: 1400,
                target: {
                  selector: ".navbar",
                  selectorGuids: ["e710639b-d766-09cf-e2d2-35441d2255c9"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690651810737,
    },
    "a-20": {
      id: "a-20",
      title: "Letter 6 - View 0.45s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-6",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "41046823-0793-51de-c515-4ee6c2e5c120",
                  ],
                },
                xValue: 7,
                yValue: 70,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-20-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-6",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "41046823-0793-51de-c515-4ee6c2e5c120",
                  ],
                },
                xValue: 3,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-20-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-6",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "41046823-0793-51de-c515-4ee6c2e5c120",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-20-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 450,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-6",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "41046823-0793-51de-c515-4ee6c2e5c120",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-20-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 450,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-6",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "41046823-0793-51de-c515-4ee6c2e5c120",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-20-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 450,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-6",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "41046823-0793-51de-c515-4ee6c2e5c120",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-15": {
      id: "a-15",
      title: "Letter 1 - View 0.20s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-1",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "88367be4-6fc0-d1ce-e1e0-6f6e7d5f6377",
                  ],
                },
                xValue: 7,
                yValue: 70,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-15-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-1",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "88367be4-6fc0-d1ce-e1e0-6f6e7d5f6377",
                  ],
                },
                xValue: 3,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-15-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-1",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "88367be4-6fc0-d1ce-e1e0-6f6e7d5f6377",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-15-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-1",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "88367be4-6fc0-d1ce-e1e0-6f6e7d5f6377",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-15-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 200,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-1",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "88367be4-6fc0-d1ce-e1e0-6f6e7d5f6377",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-15-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-1",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "88367be4-6fc0-d1ce-e1e0-6f6e7d5f6377",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-16": {
      id: "a-16",
      title: "Letter 2 - View 0.25s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-16-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-2",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "a1ecde12-f63e-90db-d1d0-2b230b62bfb2",
                  ],
                },
                xValue: 7,
                yValue: 70,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-16-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-2",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "a1ecde12-f63e-90db-d1d0-2b230b62bfb2",
                  ],
                },
                xValue: 3,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-2",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "a1ecde12-f63e-90db-d1d0-2b230b62bfb2",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-16-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 250,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-2",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "a1ecde12-f63e-90db-d1d0-2b230b62bfb2",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-16-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 250,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-2",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "a1ecde12-f63e-90db-d1d0-2b230b62bfb2",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-16-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 250,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-2",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "a1ecde12-f63e-90db-d1d0-2b230b62bfb2",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-17": {
      id: "a-17",
      title: "Letter 3 - View 0.30s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-17-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-3",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "50df462a-9be9-aca4-f88a-ce18f7f96759",
                  ],
                },
                xValue: 7,
                yValue: 70,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-17-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-3",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "50df462a-9be9-aca4-f88a-ce18f7f96759",
                  ],
                },
                xValue: 3,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-3",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "50df462a-9be9-aca4-f88a-ce18f7f96759",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-17-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 300,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-3",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "50df462a-9be9-aca4-f88a-ce18f7f96759",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-17-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 300,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-3",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "50df462a-9be9-aca4-f88a-ce18f7f96759",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-17-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 300,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-3",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "50df462a-9be9-aca4-f88a-ce18f7f96759",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-18": {
      id: "a-18",
      title: "Letter 4 - View 0.35s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-4",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "f8af0263-8672-f2fe-80d0-1cb2367eefd7",
                  ],
                },
                xValue: 7,
                yValue: 70,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-4",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "f8af0263-8672-f2fe-80d0-1cb2367eefd7",
                  ],
                },
                xValue: 3,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-4",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "f8af0263-8672-f2fe-80d0-1cb2367eefd7",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-18-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 350,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-4",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "f8af0263-8672-f2fe-80d0-1cb2367eefd7",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 350,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-4",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "f8af0263-8672-f2fe-80d0-1cb2367eefd7",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-18-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 350,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-4",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "f8af0263-8672-f2fe-80d0-1cb2367eefd7",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-19": {
      id: "a-19",
      title: "Letter 5 - View 0.40s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-19-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-5",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "d61aea5c-e1f9-59cf-9ad9-c98949b0c4d2",
                  ],
                },
                xValue: 7,
                yValue: 70,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-19-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-5",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "d61aea5c-e1f9-59cf-9ad9-c98949b0c4d2",
                  ],
                },
                xValue: 3,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-19-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".letter.preload-5",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "d61aea5c-e1f9-59cf-9ad9-c98949b0c4d2",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-19-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 400,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-5",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "d61aea5c-e1f9-59cf-9ad9-c98949b0c4d2",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-19-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 400,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-5",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "d61aea5c-e1f9-59cf-9ad9-c98949b0c4d2",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-19-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 400,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".letter.preload-5",
                  selectorGuids: [
                    "a9804c77-aaaa-fe1b-d236-04893529a7be",
                    "d61aea5c-e1f9-59cf-9ad9-c98949b0c4d2",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-11": {
      id: "a-11",
      title: "Background Video - On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".bg-video-letter",
                  selectorGuids: ["3a656374-1844-0666-a69d-10596662c093"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-11-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".bg-video-letter",
                  selectorGuids: ["3a656374-1844-0666-a69d-10596662c093"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".bg-video-letter",
                  selectorGuids: ["3a656374-1844-0666-a69d-10596662c093"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".bg-video-letter",
                  selectorGuids: ["3a656374-1844-0666-a69d-10596662c093"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690644825424,
    },
    "a-12": {
      id: "a-12",
      title: "Background Video - Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 500,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".bg-video-letter",
                  selectorGuids: ["3a656374-1844-0666-a69d-10596662c093"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-12-n-2",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".bg-video-letter",
                  selectorGuids: ["3a656374-1844-0666-a69d-10596662c093"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1690644825424,
    },
    "a-21": {
      id: "a-21",
      title: "BG Video 1 - View 1.50s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-1",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "efc32c0c-f074-aa59-fd0d-3c4b03fac6fc",
                  ],
                },
                xValue: 7,
                yValue: 50,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-21-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-1",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "efc32c0c-f074-aa59-fd0d-3c4b03fac6fc",
                  ],
                },
                xValue: 6,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-21-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-1",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "efc32c0c-f074-aa59-fd0d-3c4b03fac6fc",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-21-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1500,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-1",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "efc32c0c-f074-aa59-fd0d-3c4b03fac6fc",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-21-n-6",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1500,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-1",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "efc32c0c-f074-aa59-fd0d-3c4b03fac6fc",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-21-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1500,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-1",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "efc32c0c-f074-aa59-fd0d-3c4b03fac6fc",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-22": {
      id: "a-22",
      title: "BG Video 2 - View 1.55s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-2",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "00a33249-413f-9370-f4e3-eea377768332",
                  ],
                },
                xValue: 7,
                yValue: 50,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-22-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-2",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "00a33249-413f-9370-f4e3-eea377768332",
                  ],
                },
                xValue: 6,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-22-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-2",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "00a33249-413f-9370-f4e3-eea377768332",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-22-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1550,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-2",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "00a33249-413f-9370-f4e3-eea377768332",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-22-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1550,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-2",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "00a33249-413f-9370-f4e3-eea377768332",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-22-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1550,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-2",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "00a33249-413f-9370-f4e3-eea377768332",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-23": {
      id: "a-23",
      title: "BG Video 3 - View 1.60s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-3",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "223575f5-4178-051a-8957-96c982b0c344",
                  ],
                },
                xValue: 7,
                yValue: 50,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-23-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-3",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "223575f5-4178-051a-8957-96c982b0c344",
                  ],
                },
                xValue: 6,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-23-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-3",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "223575f5-4178-051a-8957-96c982b0c344",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1600,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-3",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "223575f5-4178-051a-8957-96c982b0c344",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-23-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1600,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-3",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "223575f5-4178-051a-8957-96c982b0c344",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-23-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1600,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-3",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "223575f5-4178-051a-8957-96c982b0c344",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-24": {
      id: "a-24",
      title: "BG Video 4 - View 1.65s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-24-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-4",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "d43cffd4-1bdc-20d5-8f5c-efa9974bb46e",
                  ],
                },
                xValue: 7,
                yValue: 50,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-24-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-4",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "d43cffd4-1bdc-20d5-8f5c-efa9974bb46e",
                  ],
                },
                xValue: 6,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-24-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-4",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "d43cffd4-1bdc-20d5-8f5c-efa9974bb46e",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-24-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1650,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-4",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "d43cffd4-1bdc-20d5-8f5c-efa9974bb46e",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-24-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1650,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-4",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "d43cffd4-1bdc-20d5-8f5c-efa9974bb46e",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-24-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1650,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-4",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "d43cffd4-1bdc-20d5-8f5c-efa9974bb46e",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-25": {
      id: "a-25",
      title: "BG Video 5 - View 1.70s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-25-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-5",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "aab13fee-4839-67c2-58d5-e459fbd19dce",
                  ],
                },
                xValue: 7,
                yValue: 50,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-5",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "aab13fee-4839-67c2-58d5-e459fbd19dce",
                  ],
                },
                xValue: 6,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-5",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "aab13fee-4839-67c2-58d5-e459fbd19dce",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-25-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1700,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-5",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "aab13fee-4839-67c2-58d5-e459fbd19dce",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-25-n-4",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1700,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-5",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "aab13fee-4839-67c2-58d5-e459fbd19dce",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-25-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1700,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-5",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "aab13fee-4839-67c2-58d5-e459fbd19dce",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-26": {
      id: "a-26",
      title: "BG Video 6 - View 1.75s",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-6",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "2c8826bb-f0ca-8022-4aaf-44f46489ffe4",
                  ],
                },
                xValue: 7,
                yValue: 50,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-6",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "2c8826bb-f0ca-8022-4aaf-44f46489ffe4",
                  ],
                },
                xValue: 6,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".bg-video-letter.preload-6",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "2c8826bb-f0ca-8022-4aaf-44f46489ffe4",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1750,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-6",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "2c8826bb-f0ca-8022-4aaf-44f46489ffe4",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-26-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1750,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-6",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "2c8826bb-f0ca-8022-4aaf-44f46489ffe4",
                  ],
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-5",
              actionTypeId: "TRANSFORM_ROTATE",
              config: {
                delay: 1750,
                easing: "outQuad",
                duration: 1000,
                target: {
                  selector: ".bg-video-letter.preload-6",
                  selectorGuids: [
                    "3a656374-1844-0666-a69d-10596662c093",
                    "2c8826bb-f0ca-8022-4aaf-44f46489ffe4",
                  ],
                },
                xValue: 0,
                yValue: 0,
                zValue: null,
                xUnit: "deg",
                yUnit: "deg",
                zUnit: "deg",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-27": {
      id: "a-27",
      title: "Preload Wrapper Letter Extra",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n-5",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".wrapper-letter.extra",
                  selectorGuids: [
                    "0e9cdc9f-9740-719a-4695-e3ab16b6ab33",
                    "02ca1133-7a0e-1239-da5e-92d7f4056a78",
                  ],
                },
                widthValue: 60,
                widthUnit: "%",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 1500,
                easing: "ease",
                duration: 1700,
                target: {
                  selector: ".wrapper-letter.extra",
                  selectorGuids: [
                    "0e9cdc9f-9740-719a-4695-e3ab16b6ab33",
                    "02ca1133-7a0e-1239-da5e-92d7f4056a78",
                  ],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1690636157302,
    },
    "a-29": {
      id: "a-29",
      title: "Arrow Move",
      continuousParameterGroups: [
        {
          id: "a-29-p",
          type: "MOUSE_X",
          parameterLabel: "Mouse X",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-29-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".block-arrow",
                      selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                    },
                    xValue: -50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-29-n-3",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".arrow",
                      selectorGuids: ["dba57da2-2bba-3e0d-7f8b-6ba8375bbdbc"],
                    },
                    xValue: -35,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-29-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".block-arrow",
                      selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                    },
                    xValue: 50,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-29-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".arrow",
                      selectorGuids: ["dba57da2-2bba-3e0d-7f8b-6ba8375bbdbc"],
                    },
                    xValue: 35,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
        {
          id: "a-29-p-2",
          type: "MOUSE_Y",
          parameterLabel: "Mouse Y",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-29-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".block-arrow",
                      selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                    },
                    yValue: -50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-29-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".arrow",
                      selectorGuids: ["dba57da2-2bba-3e0d-7f8b-6ba8375bbdbc"],
                    },
                    yValue: -35,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-29-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".block-arrow",
                      selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                    },
                    yValue: 50,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-29-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".arrow",
                      selectorGuids: ["dba57da2-2bba-3e0d-7f8b-6ba8375bbdbc"],
                    },
                    yValue: 35,
                    xUnit: "PX",
                    yUnit: "%",
                    zUnit: "PX",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1691008638807,
    },
    "a-30": {
      id: "a-30",
      title: "Arrow - On",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-30-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".block-arrow",
                  selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".block-arrow",
                  selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691008892866,
    },
    "a-31": {
      id: "a-31",
      title: "Arrow - Out",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-31-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "outQuad",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".block-arrow",
                  selectorGuids: ["1f0e5760-15ef-e2c4-4f4c-2181830c16c8"],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1691008892866,
    },
    "a-34": {
      id: "a-34",
      title: "Preload",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-34-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: true,
                  id: "64cbc09577d68a51e97305d6|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-34-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 200,
                easing: "ease",
                duration: 1400,
                target: {
                  useEventTarget: true,
                  id: "64cbc09577d68a51e97305d6|8d1538cf-5b1c-7145-c1d0-ff8522a17fbc",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1691343922401,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
