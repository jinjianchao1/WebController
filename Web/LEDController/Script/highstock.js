/*
 Highstock JS v5.0.2 (2016-10-26)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
 */
(function (N, a) {
    "object" === typeof module && module.exports ? module.exports = N.document ? a(N) : a : N.Highcharts = a(N)
})("undefined" !== typeof window ? window : this, function (N) {
    N = function () {
        var a = window, C = a.document, A = a.navigator && a.navigator.userAgent || "", E = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, H = /(edge|msie|trident)/i.test(A) && !window.opera, w = !E, k = /Firefox/.test(A), l = k && 4 > parseInt(A.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "5.0.2",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: l,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: H,
            isWebKit: /AppleWebKit/.test(A),
            isFirefox: k,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(A),
            SVG_NS: "http://www.w3.org/2000/svg",
            idCounter: 0,
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: E,
            vml: w,
            win: a,
            charts: [],
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            }
        }
    }();
    (function (a) {
        var C = [], A = a.charts, E = a.doc, H = a.win;
        a.error = function (a, k) {
            a = "Highcharts error #" +
                a + ": www.highcharts.com/errors/" + a;
            if (k)throw Error(a);
            H.console && console.log(a)
        };
        a.Fx = function (a, k, l) {
            this.options = k;
            this.elem = a;
            this.prop = l
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], k = this.paths[1], l = [], r = this.now, q = a.length, h;
                if (1 === r)l = this.toD; else if (q === k.length && 1 > r)for (; q--;)h = parseFloat(a[q]), l[q] = isNaN(h) ? a[q] : r * parseFloat(k[q] - h) + h; else l = k;
                this.elem.attr("d", l)
            }, update: function () {
                var a = this.elem, k = this.prop, l = this.now, r = this.options.step;
                if (this[k + "Setter"])this[k + "Setter"]();
                else a.attr ? a.element && a.attr(k, l) : a.style[k] = l + this.unit;
                r && r.call(a, l, this)
            }, run: function (a, k, l) {
                var w = this, q = function (a) {
                    return q.stopped ? !1 : w.step(a)
                }, h;
                this.startTime = +new Date;
                this.start = a;
                this.end = k;
                this.unit = l;
                this.now = this.start;
                this.pos = 0;
                q.elem = this.elem;
                q() && 1 === C.push(q) && (q.timerId = setInterval(function () {
                    for (h = 0; h < C.length; h++)C[h]() || C.splice(h--, 1);
                    C.length || clearInterval(q.timerId)
                }, 13))
            }, step: function (a) {
                var k = +new Date, l, w = this.options;
                l = this.elem;
                var q = w.complete, h = w.duration,
                    n = w.curAnim, c;
                if (l.attr && !l.element)l = !1; else if (a || k >= h + this.startTime) {
                    this.now = this.end;
                    this.pos = 1;
                    this.update();
                    a = n[this.prop] = !0;
                    for (c in n)!0 !== n[c] && (a = !1);
                    a && q && q.call(l);
                    l = !1
                } else this.pos = w.easing((k - this.startTime) / h), this.now = this.start + (this.end - this.start) * this.pos, this.update(), l = !0;
                return l
            }, initPath: function (w, k, l) {
                function r(a) {
                    for (b = a.length; b--;)"M" !== a[b] && "L" !== a[b] || a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2])
                }

                function q(a, d) {
                    for (; a.length < f;) {
                        a[0] = d[f - a.length];
                        var e = a.slice(0,
                            z);
                        [].splice.apply(a, [0, 0].concat(e));
                        p && (e = a.slice(a.length - z), [].splice.apply(a, [a.length, 0].concat(e)), b--)
                    }
                    a[0] = "M"
                }

                function h(a, d) {
                    for (var b = (f - a.length) / z; 0 < b && b--;)e = a.slice().splice(a.length / K - z, z * K), e[0] = d[f - z - b * z], m && (e[z - 6] = e[z - 2], e[z - 5] = e[z - 1]), [].splice.apply(a, [a.length / K, 0].concat(e)), p && b--
                }

                k = k || "";
                var n, c = w.startX, g = w.endX, m = -1 < k.indexOf("C"), z = m ? 7 : 3, f, e, b;
                k = k.split(" ");
                l = l.slice();
                var p = w.isArea, K = p ? 2 : 1, d;
                m && (r(k), r(l));
                if (c && g) {
                    for (b = 0; b < c.length; b++)if (c[b] === g[0]) {
                        n = b;
                        break
                    } else if (c[0] ===
                        g[g.length - c.length + b]) {
                        n = b;
                        d = !0;
                        break
                    }
                    void 0 === n && (k = [])
                }
                k.length && a.isNumber(n) && (f = l.length + n * K * z, d ? (q(k, l), h(l, k)) : (q(l, k), h(k, l)));
                return [k, l]
            }
        };
        a.extend = function (a, k) {
            var l;
            a || (a = {});
            for (l in k)a[l] = k[l];
            return a
        };
        a.merge = function () {
            var w, k = arguments, l, r = {}, q = function (h, n) {
                var c, g;
                "object" !== typeof h && (h = {});
                for (g in n)n.hasOwnProperty(g) && (c = n[g], a.isObject(c, !0) && "renderTo" !== g && "number" !== typeof c.nodeType ? h[g] = q(h[g] || {}, c) : h[g] = n[g]);
                return h
            };
            !0 === k[0] && (r = k[1], k = Array.prototype.slice.call(k,
                2));
            l = k.length;
            for (w = 0; w < l; w++)r = q(r, k[w]);
            return r
        };
        a.pInt = function (a, k) {
            return parseInt(a, k || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (w, k) {
            return w && "object" === typeof w && (!k || !a.isArray(w))
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function (a, k) {
            for (var l = a.length; l--;)if (a[l] === k) {
                a.splice(l, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !==
                a && null !== a
        };
        a.attr = function (w, k, l) {
            var r, q;
            if (a.isString(k))a.defined(l) ? w.setAttribute(k, l) : w && w.getAttribute && (q = w.getAttribute(k)); else if (a.defined(k) && a.isObject(k))for (r in k)w.setAttribute(r, k[r]);
            return q
        };
        a.splat = function (w) {
            return a.isArray(w) ? w : [w]
        };
        a.syncTimeout = function (a, k, l) {
            if (k)return setTimeout(a, k, l);
            a.call(0, l)
        };
        a.pick = function () {
            var a = arguments, k, l, r = a.length;
            for (k = 0; k < r; k++)if (l = a[k], void 0 !== l && null !== l)return l
        };
        a.css = function (w, k) {
            a.isMS && !a.svg && k && void 0 !== k.opacity && (k.filter =
                "alpha(opacity\x3d" + 100 * k.opacity + ")");
            a.extend(w.style, k)
        };
        a.createElement = function (w, k, l, r, q) {
            w = E.createElement(w);
            var h = a.css;
            k && a.extend(w, k);
            q && h(w, {padding: 0, border: "none", margin: 0});
            l && h(w, l);
            r && r.appendChild(w);
            return w
        };
        a.extendClass = function (w, k) {
            var l = function () {
            };
            l.prototype = new w;
            a.extend(l.prototype, k);
            return l
        };
        a.pad = function (a, k, l) {
            return Array((k || 2) + 1 - String(a).length).join(l || 0) + a
        };
        a.relativeLength = function (a, k) {
            return /%$/.test(a) ? k * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function (a,
                           k, l) {
            var r = a[k];
            a[k] = function () {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(r);
                return l.apply(this, a)
            }
        };
        a.getTZOffset = function (w) {
            var k = a.Date;
            return 6E4 * (k.hcGetTimezoneOffset && k.hcGetTimezoneOffset(w) || k.hcTimezoneOffset || 0)
        };
        a.dateFormat = function (w, k, l) {
            if (!a.defined(k) || isNaN(k))return a.defaultOptions.lang.invalidDate || "";
            w = a.pick(w, "%Y-%m-%d %H:%M:%S");
            var r = a.Date, q = new r(k - a.getTZOffset(k)), h, n = q[r.hcGetHours](), c = q[r.hcGetDay](), g = q[r.hcGetDate](), m = q[r.hcGetMonth](), z = q[r.hcGetFullYear](),
                f = a.defaultOptions.lang, e = f.weekdays, b = f.shortWeekdays, p = a.pad, r = a.extend({
                    a: b ? b[c] : e[c].substr(0, 3),
                    A: e[c],
                    d: p(g),
                    e: p(g, 2, " "),
                    w: c,
                    b: f.shortMonths[m],
                    B: f.months[m],
                    m: p(m + 1),
                    y: z.toString().substr(2, 2),
                    Y: z,
                    H: p(n),
                    k: n,
                    I: p(n % 12 || 12),
                    l: n % 12 || 12,
                    M: p(q[r.hcGetMinutes]()),
                    p: 12 > n ? "AM" : "PM",
                    P: 12 > n ? "am" : "pm",
                    S: p(q.getSeconds()),
                    L: p(Math.round(k % 1E3), 3)
                }, a.dateFormats);
            for (h in r)for (; -1 !== w.indexOf("%" + h);)w = w.replace("%" + h, "function" === typeof r[h] ? r[h](k) : r[h]);
            return l ? w.substr(0, 1).toUpperCase() + w.substr(1) :
                w
        };
        a.formatSingle = function (w, k) {
            var l = /\.([0-9])/, r = a.defaultOptions.lang;
            /f$/.test(w) ? (l = (l = w.match(l)) ? l[1] : -1, null !== k && (k = a.numberFormat(k, l, r.decimalPoint, -1 < w.indexOf(",") ? r.thousandsSep : ""))) : k = a.dateFormat(w, k);
            return k
        };
        a.format = function (w, k) {
            for (var l = "{", r = !1, q, h, n, c, g = [], m; w;) {
                l = w.indexOf(l);
                if (-1 === l)break;
                q = w.slice(0, l);
                if (r) {
                    q = q.split(":");
                    h = q.shift().split(".");
                    c = h.length;
                    m = k;
                    for (n = 0; n < c; n++)m = m[h[n]];
                    q.length && (m = a.formatSingle(q.join(":"), m));
                    g.push(m)
                } else g.push(q);
                w = w.slice(l +
                    1);
                l = (r = !r) ? "}" : "{"
            }
            g.push(w);
            return g.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (w, k, l, r, q) {
            var h, n = w;
            l = a.pick(l, 1);
            h = w / l;
            k || (k = [1, 2, 2.5, 5, 10], !1 === r && (1 === l ? k = [1, 2, 5, 10] : .1 >= l && (k = [1 / l])));
            for (r = 0; r < k.length && !(n = k[r], q && n * l >= w || !q && h <= (k[r] + (k[r + 1] || k[r])) / 2); r++);
            return n * l
        };
        a.stableSort = function (a, k) {
            var l = a.length, r, q;
            for (q = 0; q < l; q++)a[q].safeI = q;
            a.sort(function (a, n) {
                r = k(a, n);
                return 0 === r ? a.safeI - n.safeI : r
            });
            for (q =
                     0; q < l; q++)delete a[q].safeI
        };
        a.arrayMin = function (a) {
            for (var k = a.length, l = a[0]; k--;)a[k] < l && (l = a[k]);
            return l
        };
        a.arrayMax = function (a) {
            for (var k = a.length, l = a[0]; k--;)a[k] > l && (l = a[k]);
            return l
        };
        a.destroyObjectProperties = function (a, k) {
            for (var l in a)a[l] && a[l] !== k && a[l].destroy && a[l].destroy(), delete a[l]
        };
        a.discardElement = function (w) {
            var k = a.garbageBin;
            k || (k = a.createElement("div"));
            w && k.appendChild(w);
            k.innerHTML = ""
        };
        a.correctFloat = function (a, k) {
            return parseFloat(a.toPrecision(k || 14))
        };
        a.setAnimation =
            function (w, k) {
                k.renderer.globalAnimation = a.pick(w, k.options.chart.animation, !0)
            };
        a.animObject = function (w) {
            return a.isObject(w) ? a.merge(w) : {duration: w ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (w, k, l, r) {
            w = +w || 0;
            k = +k;
            var q = a.defaultOptions.lang, h = (w.toString().split(".")[1] || "").length, n, c, g = Math.abs(w);
            -1 === k ? k = Math.min(h, 20) : a.isNumber(k) || (k = 2);
            n = String(a.pInt(g.toFixed(k)));
            c = 3 < n.length ? n.length % 3 :
                0;
            l = a.pick(l, q.decimalPoint);
            r = a.pick(r, q.thousandsSep);
            w = (0 > w ? "-" : "") + (c ? n.substr(0, c) + r : "");
            w += n.substr(c).replace(/(\d{3})(?=\d)/g, "$1" + r);
            k && (r = Math.abs(g - n + Math.pow(10, -Math.max(k, h) - 1)), w += l + r.toFixed(k).slice(2));
            return w
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (w, k) {
            return "width" === k ? Math.min(w.offsetWidth, w.scrollWidth) - a.getStyle(w, "padding-left") - a.getStyle(w, "padding-right") : "height" === k ? Math.min(w.offsetHeight, w.scrollHeight) - a.getStyle(w,
                "padding-top") - a.getStyle(w, "padding-bottom") : (w = H.getComputedStyle(w, void 0)) && a.pInt(w.getPropertyValue(k))
        };
        a.inArray = function (a, k) {
            return k.indexOf ? k.indexOf(a) : [].indexOf.call(k, a)
        };
        a.grep = function (a, k) {
            return [].filter.call(a, k)
        };
        a.map = function (a, k) {
            for (var l = [], r = 0, q = a.length; r < q; r++)l[r] = k.call(a[r], a[r], r, a);
            return l
        };
        a.offset = function (a) {
            var k = E.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (H.pageYOffset || k.scrollTop) - (k.clientTop || 0),
                left: a.left + (H.pageXOffset || k.scrollLeft) -
                (k.clientLeft || 0)
            }
        };
        a.stop = function (a) {
            for (var k = C.length; k--;)C[k].elem === a && (C[k].stopped = !0)
        };
        a.each = function (a, k, l) {
            return Array.prototype.forEach.call(a, k, l)
        };
        a.addEvent = function (a, k, l) {
            function r(h) {
                h.target = h.srcElement || H;
                l.call(a, h)
            }

            var q = a.hcEvents = a.hcEvents || {};
            a.addEventListener ? a.addEventListener(k, l, !1) : a.attachEvent && (a.hcEventsIE || (a.hcEventsIE = {}), a.hcEventsIE[l.toString()] = r, a.attachEvent("on" + k, r));
            q[k] || (q[k] = []);
            q[k].push(l)
        };
        a.removeEvent = function (w, k, l) {
            function r(a, c) {
                w.removeEventListener ?
                    w.removeEventListener(a, c, !1) : w.attachEvent && (c = w.hcEventsIE[c.toString()], w.detachEvent("on" + a, c))
            }

            function q() {
                var a, c;
                if (w.nodeName)for (c in k ? (a = {}, a[k] = !0) : a = n, a)if (n[c])for (a = n[c].length; a--;)r(c, n[c][a])
            }

            var h, n = w.hcEvents, c;
            n && (k ? (h = n[k] || [], l ? (c = a.inArray(l, h), -1 < c && (h.splice(c, 1), n[k] = h), r(k, l)) : (q(), n[k] = [])) : (q(), w.hcEvents = {}))
        };
        a.fireEvent = function (w, k, l, r) {
            var q;
            q = w.hcEvents;
            var h, n;
            l = l || {};
            if (E.createEvent && (w.dispatchEvent || w.fireEvent))q = E.createEvent("Events"), q.initEvent(k, !0,
                !0), a.extend(q, l), w.dispatchEvent ? w.dispatchEvent(q) : w.fireEvent(k, q); else if (q)for (q = q[k] || [], h = q.length, l.target || a.extend(l, {
                preventDefault: function () {
                    l.defaultPrevented = !0
                }, target: w, type: k
            }), k = 0; k < h; k++)(n = q[k]) && !1 === n.call(w, l) && l.preventDefault();
            r && !l.defaultPrevented && r(l)
        };
        a.animate = function (w, k, l) {
            var r, q = "", h, n, c;
            a.isObject(l) || (r = arguments, l = {duration: r[2], easing: r[3], complete: r[4]});
            a.isNumber(l.duration) || (l.duration = 400);
            l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] ||
            Math.easeInOutSine;
            l.curAnim = a.merge(k);
            for (c in k)n = new a.Fx(w, l, c), h = null, "d" === c ? (n.paths = n.initPath(w, w.d, k.d), n.toD = k.d, r = 0, h = 1) : w.attr ? r = w.attr(c) : (r = parseFloat(a.getStyle(w, c)) || 0, "opacity" !== c && (q = "px")), h || (h = k[c]), h.match && h.match("px") && (h = h.replace(/px/g, "")), n.run(r, h, q)
        };
        a.seriesType = function (w, k, l, r, q) {
            var h = a.getOptions(), n = a.seriesTypes;
            h.plotOptions[w] = a.merge(h.plotOptions[k], l);
            n[w] = a.extendClass(n[k] || function () {
                }, r);
            n[w].prototype.type = w;
            q && (n[w].prototype.pointClass = a.extendClass(a.Point,
                q));
            return n[w]
        };
        H.jQuery && (H.jQuery.fn.highcharts = function () {
            var w = [].slice.call(arguments);
            if (this[0])return w[0] ? (new (a[a.isString(w[0]) ? w.shift() : "Chart"])(this[0], w[0], w[1]), this) : A[a.attr(this[0], "data-highcharts-chart")]
        });
        E && !E.defaultView && (a.getStyle = function (w, k) {
            var l = {width: "clientWidth", height: "clientHeight"}[k];
            if (w.style[k])return a.pInt(w.style[k]);
            "opacity" === k && (k = "filter");
            if (l)return w.style.zoom = 1, Math.max(w[l] - 2 * a.getStyle(w, "padding"), 0);
            w = w.currentStyle[k.replace(/\-(\w)/g,
                function (a, q) {
                    return q.toUpperCase()
                })];
            "filter" === k && (w = w.replace(/alpha\(opacity=([0-9]+)\)/, function (a, q) {
                return q / 100
            }));
            return "" === w ? 1 : a.pInt(w)
        });
        Array.prototype.forEach || (a.each = function (a, k, l) {
            for (var r = 0, q = a.length; r < q; r++)if (!1 === k.call(l, a[r], r, a))return r
        });
        Array.prototype.indexOf || (a.inArray = function (a, k) {
            var l, r = 0;
            if (k)for (l = k.length; r < l; r++)if (k[r] === a)return r;
            return -1
        });
        Array.prototype.filter || (a.grep = function (a, k) {
            for (var l = [], r = 0, q = a.length; r < q; r++)k(a[r], r) && l.push(a[r]);
            return l
        })
    })(N);
    (function (a) {
        var C = a.each, A = a.isNumber, E = a.map, H = a.merge, w = a.pInt;
        a.Color = function (k) {
            if (!(this instanceof a.Color))return new a.Color(k);
            this.init(k)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [w(a[1]), w(a[2]), w(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/, parse: function (a) {
                    return [w(a[1], 16), w(a[2], 16), w(a[3], 16), 1]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [w(a[1]), w(a[2]), w(a[3]), 1]
                }
            }], names: {white: "#ffffff", black: "#000000"}, init: function (k) {
                var l, r, q, h;
                if ((this.input = k = this.names[k] || k) && k.stops)this.stops = E(k.stops, function (h) {
                    return new a.Color(h[1])
                }); else for (q = this.parsers.length; q-- && !r;)h = this.parsers[q], (l = h.regex.exec(k)) && (r = h.parse(l));
                this.rgba = r || []
            }, get: function (a) {
                var l = this.input, k = this.rgba, q;
                this.stops ? (q = H(l), q.stops = [].concat(q.stops), C(this.stops, function (h, n) {
                    q.stops[n] = [q.stops[n][0], h.get(a)]
                })) : q = k &&
                A(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : l;
                return q
            }, brighten: function (a) {
                var l, k = this.rgba;
                if (this.stops)C(this.stops, function (q) {
                    q.brighten(a)
                }); else if (A(a) && 0 !== a)for (l = 0; 3 > l; l++)k[l] += w(255 * a), 0 > k[l] && (k[l] = 0), 255 < k[l] && (k[l] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function (k) {
            return new a.Color(k)
        }
    })(N);
    (function (a) {
        var C, A, E = a.addEvent, H = a.animate, w = a.attr, k = a.charts, l = a.color, r = a.css, q = a.createElement,
            h = a.defined, n = a.deg2rad, c = a.destroyObjectProperties, g = a.doc, m = a.each, z = a.extend, f = a.erase, e = a.grep, b = a.hasTouch, p = a.isArray, K = a.isFirefox, d = a.isMS, F = a.isObject, t = a.isString, v = a.isWebKit, y = a.merge, I = a.noop, G = a.pick, x = a.pInt, D = a.removeEvent, M = a.stop, u = a.svg, J = a.SVG_NS, O = a.symbolSizes, Q = a.win;
        C = a.SVGElement = function () {
            return this
        };
        C.prototype = {
            opacity: 1,
            SVG_NS: J,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textDecoration textOverflow textShadow".split(" "),
            init: function (a,
                            d) {
                this.element = "span" === d ? q(d) : g.createElementNS(this.SVG_NS, d);
                this.renderer = a
            },
            animate: function (a, d, u) {
                d = G(d, this.renderer.globalAnimation, !0);
                M(this);
                d ? (u && (d.complete = u), H(this, a, d)) : this.attr(a, null, u);
                return this
            },
            colorGradient: function (B, d, u) {
                var L = this.renderer, b, e, f, J, c, t, g, x, D, v, F, G = [], P;
                B.linearGradient ? e = "linearGradient" : B.radialGradient && (e = "radialGradient");
                if (e) {
                    f = B[e];
                    c = L.gradients;
                    g = B.stops;
                    v = u.radialReference;
                    p(f) && (B[e] = f = {x1: f[0], y1: f[1], x2: f[2], y2: f[3], gradientUnits: "userSpaceOnUse"});
                    "radialGradient" === e && v && !h(f.gradientUnits) && (J = f, f = y(f, L.getRadialAttr(v, J), {gradientUnits: "userSpaceOnUse"}));
                    for (F in f)"id" !== F && G.push(F, f[F]);
                    for (F in g)G.push(g[F]);
                    G = G.join(",");
                    c[G] ? v = c[G].attr("id") : (f.id = v = "highcharts-" + a.idCounter++, c[G] = t = L.createElement(e).attr(f).add(L.defs), t.radAttr = J, t.stops = [], m(g, function (B) {
                        0 === B[1].indexOf("rgba") ? (b = a.color(B[1]), x = b.get("rgb"), D = b.get("a")) : (x = B[1], D = 1);
                        B = L.createElement("stop").attr({offset: B[0], "stop-color": x, "stop-opacity": D}).add(t);
                        t.stops.push(B)
                    }));
                    P = "url(" + L.url + "#" + v + ")";
                    u.setAttribute(d, P);
                    u.gradient = G;
                    B.toString = function () {
                        return P
                    }
                }
            },
            applyTextShadow: function (a) {
                var B = this.element, u, b = -1 !== a.indexOf("contrast"), e = {}, f = this.renderer.forExport, J = this.renderer.forExport || void 0 !== B.style.textShadow && !d;
                b && (e.textShadow = a = a.replace(/contrast/g, this.renderer.getContrast(B.style.fill)));
                if (v || f)e.textRendering = "geometricPrecision";
                J ? this.css(e) : (this.fakeTS = !0, this.ySetter = this.xSetter, u = [].slice.call(B.getElementsByTagName("tspan")), m(a.split(/\s?,\s?/g),
                    function (a) {
                        var d = B.firstChild, L, b;
                        a = a.split(" ");
                        L = a[a.length - 1];
                        (b = a[a.length - 2]) && m(u, function (a, u) {
                            0 === u && (a.setAttribute("x", B.getAttribute("x")), u = B.getAttribute("y"), a.setAttribute("y", u || 0), null === u && B.setAttribute("y", 0));
                            a = a.cloneNode(1);
                            w(a, {
                                "class": "highcharts-text-shadow",
                                fill: L,
                                stroke: L,
                                "stroke-opacity": 1 / Math.max(x(b), 3),
                                "stroke-width": b,
                                "stroke-linejoin": "round"
                            });
                            B.insertBefore(a, d)
                        })
                    }))
            },
            attr: function (a, d, u) {
                var B, L = this.element, b, e = this, f;
                "string" === typeof a && void 0 !== d && (B = a, a =
                {}, a[B] = d);
                if ("string" === typeof a)e = (this[a + "Getter"] || this._defaultGetter).call(this, a, L); else {
                    for (B in a)d = a[B], f = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(B) && (b || (this.symbolAttr(a), b = !0), f = !0), !this.rotation || "x" !== B && "y" !== B || (this.doTransform = !0), f || (f = this[B + "Setter"] || this._defaultSetter, f.call(this, d, B, L), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(B) && this.updateShadows(B, d, f));
                    this.doTransform && (this.updateTransform(),
                        this.doTransform = !1)
                }
                u && u();
                return e
            },
            updateShadows: function (a, d, u) {
                for (var B = this.shadows, L = B.length; L--;)u.call(B[L], "height" === a ? Math.max(d - (B[L].cutHeight || 0), 0) : "d" === a ? this.d : d, a, B[L])
            },
            addClass: function (a, d) {
                var B = this.attr("class") || "";
                -1 === B.indexOf(a) && (d || (a = (B + (B ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== w(this.element, "class").indexOf(a)
            },
            removeClass: function (a) {
                w(this.element, "class", (w(this.element, "class") || "").replace(a, ""));
                return this
            },
            symbolAttr: function (a) {
                var B = this;
                m("x y r start end width height innerR anchorX anchorY".split(" "), function (d) {
                    B[d] = G(a[d], B[d])
                });
                B.attr({d: B.renderer.symbols[B.symbolName](B.x, B.y, B.width, B.height, B)})
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, d) {
                var B, u = {}, L;
                d = d || a.strokeWidth || 0;
                L = Math.round(d) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + L;
                a.y = Math.floor(a.y || this.y || 0) + L;
                a.width = Math.floor((a.width || this.width || 0) - 2 *
                    L);
                a.height = Math.floor((a.height || this.height || 0) - 2 * L);
                h(a.strokeWidth) && (a.strokeWidth = d);
                for (B in a)this[B] !== a[B] && (this[B] = u[B] = a[B]);
                return u
            },
            css: function (a) {
                var B = this.styles, b = {}, e = this.element, f, J, c = "";
                f = !B;
                a && a.color && (a.fill = a.color);
                if (B)for (J in a)a[J] !== B[J] && (b[J] = a[J], f = !0);
                if (f) {
                    f = this.textWidth = a && a.width && "text" === e.nodeName.toLowerCase() && x(a.width) || this.textWidth;
                    B && (a = z(B, b));
                    this.styles = a;
                    f && !u && this.renderer.forExport && delete a.width;
                    if (d && !u)r(this.element, a); else {
                        B = function (a,
                                      B) {
                            return "-" + B.toLowerCase()
                        };
                        for (J in a)c += J.replace(/([A-Z])/g, B) + ":" + a[J] + ";";
                        w(e, "style", c)
                    }
                    this.added && f && this.renderer.buildText(this)
                }
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, d) {
                var B = this, u = B.element;
                b && "click" === a ? (u.ontouchstart = function (a) {
                    B.touchEventFired = Date.now();
                    a.preventDefault();
                    d.call(u, a)
                }, u.onclick = function (a) {
                    (-1 === Q.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (B.touchEventFired || 0)) && d.call(u, a)
                }) : u["on" + a] = d;
                return this
            },
            setRadialReference: function (a) {
                var B = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                B && B.radAttr && B.animate(this.renderer.getRadialAttr(a, B.radAttr));
                return this
            },
            translate: function (a, d) {
                return this.attr({translateX: a, translateY: d})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, d = this.translateY || 0, u = this.scaleX, b = this.scaleY, f = this.inverted, e = this.rotation, J = this.element;
                f && (a += this.attr("width"),
                    d += this.attr("height"));
                a = ["translate(" + a + "," + d + ")"];
                f ? a.push("rotate(90) scale(-1,1)") : e && a.push("rotate(" + e + " " + (J.getAttribute("x") || 0) + " " + (J.getAttribute("y") || 0) + ")");
                (h(u) || h(b)) && a.push("scale(" + G(u, 1) + " " + G(b, 1) + ")");
                a.length && J.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, d, u) {
                var B, b, L, e, J = {};
                b = this.renderer;
                L = b.alignedObjects;
                var c, p;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = d, !u || t(u))this.alignTo =
                        B = u || "renderer", f(L, this), L.push(this), u = null
                } else a = this.alignOptions, d = this.alignByTranslate, B = this.alignTo;
                u = G(u, b[B], b);
                B = a.align;
                b = a.verticalAlign;
                L = (u.x || 0) + (a.x || 0);
                e = (u.y || 0) + (a.y || 0);
                "right" === B ? c = 1 : "center" === B && (c = 2);
                c && (L += (u.width - (a.width || 0)) / c);
                J[d ? "translateX" : "x"] = Math.round(L);
                "bottom" === b ? p = 1 : "middle" === b && (p = 2);
                p && (e += (u.height - (a.height || 0)) / p);
                J[d ? "translateY" : "y"] = Math.round(e);
                this[this.placed ? "animate" : "attr"](J);
                this.placed = !0;
                this.alignAttr = J;
                return this
            },
            getBBox: function (a,
                               u) {
                var B, b = this.renderer, L, e = this.element, f = this.styles, J, c = this.textStr, p, t = e.style, g, x = b.cache, D = b.cacheKeys, v;
                u = G(u, this.rotation);
                L = u * n;
                J = f && f.fontSize;
                void 0 !== c && (v = c.toString().replace(/[0-9]/g, "0") + ["", u || 0, J, e.style.width].join());
                v && !a && (B = x[v]);
                if (!B) {
                    if (e.namespaceURI === this.SVG_NS || b.forExport) {
                        try {
                            g = this.fakeTS && function (a) {
                                    m(e.querySelectorAll(".highcharts-text-shadow"), function (d) {
                                        d.style.display = a
                                    })
                                }, K && t.textShadow ? (p = t.textShadow, t.textShadow = "") : g && g("none"), B = e.getBBox ? z({}, e.getBBox()) :
                            {width: e.offsetWidth, height: e.offsetHeight}, p ? t.textShadow = p : g && g("")
                        } catch (U) {
                        }
                        if (!B || 0 > B.width)B = {width: 0, height: 0}
                    } else B = this.htmlGetBBox();
                    b.isSVG && (a = B.width, b = B.height, d && f && "11px" === f.fontSize && "16.9" === b.toPrecision(3) && (B.height = b = 14), u && (B.width = Math.abs(b * Math.sin(L)) + Math.abs(a * Math.cos(L)), B.height = Math.abs(b * Math.cos(L)) + Math.abs(a * Math.sin(L))));
                    if (v && 0 < B.height) {
                        for (; 250 < D.length;)delete x[D.shift()];
                        x[v] || D.push(v);
                        x[v] = B
                    }
                }
                return B
            },
            show: function (a) {
                return this.attr({
                    visibility: a ?
                        "inherit" : "visible"
                })
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var d = this;
                d.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        d.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var d = this.renderer, B = this.element, u;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && d.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex)u = this.zIndexSetter();
                u || (a ? a.element : d.box).appendChild(B);
                if (this.onAdd)this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var d =
                    a.parentNode;
                d && d.removeChild(a)
            },
            destroy: function () {
                var a = this.element || {}, d = this.renderer.isSVG && "SPAN" === a.nodeName && this.parentGroup, u, b;
                a.onclick = a.onmouseout = a.onmouseover = a.onmousemove = a.point = null;
                M(this);
                this.clipPath && (this.clipPath = this.clipPath.destroy());
                if (this.stops) {
                    for (b = 0; b < this.stops.length; b++)this.stops[b] = this.stops[b].destroy();
                    this.stops = null
                }
                this.safeRemoveChild(a);
                for (this.destroyShadows(); d && d.div && 0 === d.div.childNodes.length;)a = d.parentGroup, this.safeRemoveChild(d.div),
                    delete d.div, d = a;
                this.alignTo && f(this.renderer.alignedObjects, this);
                for (u in this)delete this[u];
                return null
            },
            shadow: function (a, d, u) {
                var B = [], b, e, f = this.element, L, J, c, p;
                if (!a)this.destroyShadows(); else if (!this.shadows) {
                    J = G(a.width, 3);
                    c = (a.opacity || .15) / J;
                    p = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
                    for (b = 1; b <= J; b++)e = f.cloneNode(0), L = 2 * J + 1 - 2 * b, w(e, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": c * b,
                        "stroke-width": L,
                        transform: "translate" + p,
                        fill: "none"
                    }), u &&
                    (w(e, "height", Math.max(w(e, "height") - L, 0)), e.cutHeight = L), d ? d.element.appendChild(e) : f.parentNode.insertBefore(e, f), B.push(e);
                    this.shadows = B
                }
                return this
            },
            destroyShadows: function () {
                m(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = G(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, d, u) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                u.setAttribute(d, a);
                this[d] = a
            },
            dashstyleSetter: function (a) {
                var d, u = this["stroke-width"];
                "inherit" === u && (u = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (d = a.length; d--;)a[d] = x(a[d]) *
                        u;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, d, u) {
                this[d] = a;
                u.setAttribute(d, a)
            },
            titleSetter: function (a) {
                var d = this.element.getElementsByTagName("title")[0];
                d || (d = g.createElementNS(this.SVG_NS, "title"), this.element.appendChild(d));
                d.firstChild && d.removeChild(d.firstChild);
                d.appendChild(g.createTextNode(String(G(a), "").replace(/<[^>]*>/g,
                    "")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, d, u) {
                "string" === typeof a ? u.setAttribute(d, a) : a && this.colorGradient(a, d, u)
            },
            visibilitySetter: function (a, d, u) {
                "inherit" === a ? u.removeAttribute(d) : u.setAttribute(d, a)
            },
            zIndexSetter: function (a, d) {
                var u = this.renderer, B = this.parentGroup, b = (B || u).element || u.box, e, f = this.element, J;
                e = this.added;
                var c;
                h(a) && (f.zIndex = a, a = +a, this[d] === a && (e = !1), this[d] = a);
                if (e) {
                    (a =
                        this.zIndex) && B && (B.handleZ = !0);
                    d = b.childNodes;
                    for (c = 0; c < d.length && !J; c++)B = d[c], e = B.zIndex, B !== f && (x(e) > a || !h(a) && h(e) || 0 > a && !h(e) && b !== u.box) && (b.insertBefore(f, B), J = !0);
                    J || b.appendChild(f)
                }
                return J
            },
            _defaultSetter: function (a, d, u) {
                u.setAttribute(d, a)
            }
        };
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function (a, d) {
            this[d] = a;
            this.doTransform = !0
        };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, d, u) {
            this[d] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", u), u.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === d && 0 === a && this.hasStroke && (u.removeAttribute("stroke"), this.hasStroke = !1)
        };
        A = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        A.prototype = {
            Element: C, SVG_NS: J, init: function (a, d, u, b, e, f) {
                var B;
                b = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(b));
                B = b.element;
                a.appendChild(B);
                -1 === a.innerHTML.indexOf("xmlns") && w(B, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = B;
                this.boxWrapper = b;
                this.alignedObjects = [];
                this.url = (K || v) && g.getElementsByTagName("base").length ? Q.location.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(g.createTextNode("Created with Highstock 5.0.2"));
                this.defs = this.createElement("defs").add();
                this.allowHTML =
                    f;
                this.forExport = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(d, u, !1);
                var J;
                K && a.getBoundingClientRect && (this.subPixelFix = d = function () {
                    r(a, {left: 0, top: 0});
                    J = a.getBoundingClientRect();
                    r(a, {left: Math.ceil(J.left) - J.left + "px", top: Math.ceil(J.top) - J.top + "px"})
                }, d(), E(Q, "resize", d))
            }, getStyle: function (a) {
                return this.style = z({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            }, setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            }, destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                c(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.subPixelFix && D(Q, "resize", this.subPixelFix);
                return this.alignedObjects = null
            }, createElement: function (a) {
                var d = new this.Element;
                d.init(this, a);
                return d
            }, draw: I, getRadialAttr: function (a, d) {
                return {cx: a[0] - a[2] / 2 + d.cx * a[2], cy: a[1] - a[2] / 2 + d.cy * a[2], r: d.r * a[2]}
            }, buildText: function (a) {
                for (var d =
                    a.element, b = this, B = b.forExport, f = G(a.textStr, "").toString(), c = -1 !== f.indexOf("\x3c"), p = d.childNodes, t, D, v, y, F = w(d, "x"), h = a.styles, z = a.textWidth, Q = h && h.lineHeight, n = h && h.textShadow, M = h && "ellipsis" === h.textOverflow, I = p.length, O = z && !a.added && this.box, q = function (a) {
                    var d;
                    d = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : h && h.fontSize || b.style.fontSize || 12;
                    return Q ? x(Q) : b.fontMetrics(d, a).h
                }; I--;)d.removeChild(p[I]);
                c || n || M || z || -1 !== f.indexOf(" ") ? (t = /<.*class="([^"]+)".*>/, D = /<.*style="([^"]+)".*>/,
                    v = /<.*href="(http[^"]+)".*>/, O && O.appendChild(d), f = c ? f.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [f], f = e(f, function (a) {
                    return "" !== a
                }), m(f, function (e, f) {
                    var c, p = 0;
                    e = e.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                    c = e.split("|||");
                    m(c, function (e) {
                        if ("" !== e || 1 === c.length) {
                            var x =
                            {}, L = g.createElementNS(b.SVG_NS, "tspan"), m, G;
                            t.test(e) && (m = e.match(t)[1], w(L, "class", m));
                            D.test(e) && (G = e.match(D)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), w(L, "style", G));
                            v.test(e) && !B && (w(L, "onclick", 'location.href\x3d"' + e.match(v)[1] + '"'), r(L, {cursor: "pointer"}));
                            e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                            if (" " !== e) {
                                L.appendChild(g.createTextNode(e));
                                p ? x.dx = 0 : f && null !== F && (x.x = F);
                                w(L, x);
                                d.appendChild(L);
                                !p && f && (!u && B && r(L, {display: "block"}), w(L, "dy",
                                    q(L)));
                                if (z) {
                                    x = e.replace(/([^\^])-/g, "$1- ").split(" ");
                                    m = "nowrap" === h.whiteSpace;
                                    for (var Q = 1 < c.length || f || 1 < x.length && !m, n, I, P = [], O = q(L), l = a.rotation, K = e, k = K.length; (Q || M) && (x.length || P.length);)a.rotation = 0, n = a.getBBox(!0), I = n.width, !u && b.forExport && (I = b.measureSpanWidth(L.firstChild.data, a.styles)), n = I > z, void 0 === y && (y = n), M && y ? (k /= 2, "" === K || !n && .5 > k ? x = [] : (K = e.substring(0, K.length + (n ? -1 : 1) * Math.ceil(k)), x = [K + (3 < z ? "\u2026" : "")], L.removeChild(L.firstChild))) : n && 1 !== x.length ? (L.removeChild(L.firstChild),
                                        P.unshift(x.pop())) : (x = P, P = [], x.length && !m && (L = g.createElementNS(J, "tspan"), w(L, {
                                        dy: O,
                                        x: F
                                    }), G && w(L, "style", G), d.appendChild(L)), I > z && (z = I)), x.length && L.appendChild(g.createTextNode(x.join(" ").replace(/- /g, "-")));
                                    a.rotation = l
                                }
                                p++
                            }
                        }
                    })
                }), y && a.attr("title", a.textStr), O && O.removeChild(d), n && a.applyTextShadow && a.applyTextShadow(n)) : d.appendChild(g.createTextNode(f.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            }, getContrast: function (a) {
                a = l(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            }, button: function (a,
                                 u, b, e, f, J, c, p, t) {
                var B = this.label(a, u, b, t, null, null, null, null, "button"), L = 0;
                B.attr(y({padding: 8, r: 2}, f));
                var x, g, D, v;
                f = y({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                }, f);
                x = f.style;
                delete f.style;
                J = y(f, {fill: "#e6e6e6"}, J);
                g = J.style;
                delete J.style;
                c = y(f, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, c);
                D = c.style;
                delete c.style;
                p = y(f, {style: {color: "#cccccc"}}, p);
                v = p.style;
                delete p.style;
                E(B.element, d ? "mouseover" : "mouseenter",
                    function () {
                        3 !== L && B.setState(1)
                    });
                E(B.element, d ? "mouseout" : "mouseleave", function () {
                    3 !== L && B.setState(L)
                });
                B.setState = function (a) {
                    1 !== a && (B.state = L = a);
                    B.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    B.attr([f, J, c, p][a || 0]).css([x, g, D, v][a || 0])
                };
                B.attr(f).css(z({cursor: "default"}, x));
                return B.on("click", function (a) {
                    3 !== L && e.call(B, a)
                })
            }, crispLine: function (a, d) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - d % 2 /
                    2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + d % 2 / 2);
                return a
            }, path: function (a) {
                var d = {fill: "none"};
                p(a) ? d.d = a : F(a) && z(d, a);
                return this.createElement("path").attr(d)
            }, circle: function (a, d, u) {
                a = F(a) ? a : {x: a, y: d, r: u};
                d = this.createElement("circle");
                d.xSetter = d.ySetter = function (a, d, u) {
                    u.setAttribute("c" + d, a)
                };
                return d.attr(a)
            }, arc: function (a, d, u, b, e, f) {
                F(a) && (d = a.y, u = a.r, b = a.innerR, e = a.start, f = a.end, a = a.x);
                a = this.symbol("arc", a || 0, d || 0, u || 0, u || 0, {innerR: b || 0, start: e || 0, end: f || 0});
                a.r = u;
                return a
            }, rect: function (a,
                               d, u, b, e, f) {
                e = F(a) ? a.r : e;
                var J = this.createElement("rect");
                a = F(a) ? a : void 0 === a ? {} : {x: a, y: d, width: Math.max(u, 0), height: Math.max(b, 0)};
                void 0 !== f && (a.strokeWidth = f, a = J.crisp(a));
                a.fill = "none";
                e && (a.r = e);
                J.rSetter = function (a, d, u) {
                    w(u, {rx: a, ry: a})
                };
                return J.attr(a)
            }, setSize: function (a, d, u) {
                var b = this.alignedObjects, e = b.length;
                this.width = a;
                this.height = d;
                for (this.boxWrapper.animate({width: a, height: d}, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    }, duration: G(u, !0) ?
                        void 0 : 0
                }); e--;)b[e].align()
            }, g: function (a) {
                var d = this.createElement("g");
                return a ? d.attr({"class": "highcharts-" + a}) : d
            }, image: function (a, d, u, b, e) {
                var f = {preserveAspectRatio: "none"};
                1 < arguments.length && z(f, {x: d, y: u, width: b, height: e});
                f = this.createElement("image").attr(f);
                f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
                return f
            }, symbol: function (a, d, u, b, e, f) {
                var J = this, c, p = this.symbols[a], B = h(d) && p && p(Math.round(d), Math.round(u),
                        b, e, f), t = /^url\((.*?)\)$/, x, L;
                p ? (c = this.path(B), c.attr("fill", "none"), z(c, {
                    symbolName: a,
                    x: d,
                    y: u,
                    width: b,
                    height: e
                }), f && z(c, f)) : t.test(a) && (x = a.match(t)[1], c = this.image(x), c.imgwidth = G(O[x] && O[x].width, f && f.width), c.imgheight = G(O[x] && O[x].height, f && f.height), L = function () {
                    c.attr({width: c.width, height: c.height})
                }, m(["width", "height"], function (a) {
                    c[a + "Setter"] = function (a, d) {
                        var u = {}, b = this["img" + d], e = "width" === d ? "translateX" : "translateY";
                        this[d] = a;
                        h(b) && (this.element && this.element.setAttribute(d, b), this.alignByTranslate ||
                        (u[e] = ((this[d] || 0) - b) / 2, this.attr(u)))
                    }
                }), h(d) && c.attr({
                    x: d,
                    y: u
                }), c.isImg = !0, h(c.imgwidth) && h(c.imgheight) ? L() : (c.attr({
                    width: 0,
                    height: 0
                }), q("img", {
                    onload: function () {
                        var a = k[J.chartIndex];
                        0 === this.width && (r(this, {position: "absolute", top: "-999em"}), g.body.appendChild(this));
                        O[x] = {width: this.width, height: this.height};
                        c.imgwidth = this.width;
                        c.imgheight = this.height;
                        c.element && L();
                        this.parentNode && this.parentNode.removeChild(this);
                        J.imgCount--;
                        if (!J.imgCount && a && a.onload)a.onload()
                    }, src: x
                }), this.imgCount++));
                return c
            }, symbols: {
                circle: function (a, d, u, b) {
                    var e = .166 * u;
                    return ["M", a + u / 2, d, "C", a + u + e, d, a + u + e, d + b, a + u / 2, d + b, "C", a - e, d + b, a - e, d, a + u / 2, d, "Z"]
                }, square: function (a, d, u, b) {
                    return ["M", a, d, "L", a + u, d, a + u, d + b, a, d + b, "Z"]
                }, triangle: function (a, d, u, b) {
                    return ["M", a + u / 2, d, "L", a + u, d + b, a, d + b, "Z"]
                }, "triangle-down": function (a, d, u, b) {
                    return ["M", a, d, "L", a + u, d, a + u / 2, d + b, "Z"]
                }, diamond: function (a, d, u, b) {
                    return ["M", a + u / 2, d, "L", a + u, d + b / 2, a + u / 2, d + b, a, d + b / 2, "Z"]
                }, arc: function (a, d, u, b, e) {
                    var f = e.start;
                    u = e.r || u || b;
                    var J = e.end - .001;
                    b = e.innerR;
                    var c = e.open, p = Math.cos(f), x = Math.sin(f), t = Math.cos(J), J = Math.sin(J);
                    e = e.end - f < Math.PI ? 0 : 1;
                    return ["M", a + u * p, d + u * x, "A", u, u, 0, e, 1, a + u * t, d + u * J, c ? "M" : "L", a + b * t, d + b * J, "A", b, b, 0, e, 0, a + b * p, d + b * x, c ? "" : "Z"]
                }, callout: function (a, d, u, b, e) {
                    var f = Math.min(e && e.r || 0, u, b), J = f + 6, c = e && e.anchorX;
                    e = e && e.anchorY;
                    var p;
                    p = ["M", a + f, d, "L", a + u - f, d, "C", a + u, d, a + u, d, a + u, d + f, "L", a + u, d + b - f, "C", a + u, d + b, a + u, d + b, a + u - f, d + b, "L", a + f, d + b, "C", a, d + b, a, d + b, a, d + b - f, "L", a, d + f, "C", a, d, a, d, a + f, d];
                    c && c > u && e > d + J && e < d + b - J ? p.splice(13,
                        3, "L", a + u, e - 6, a + u + 6, e, a + u, e + 6, a + u, d + b - f) : c && 0 > c && e > d + J && e < d + b - J ? p.splice(33, 3, "L", a, e + 6, a - 6, e, a, e - 6, a, d + f) : e && e > b && c > a + J && c < a + u - J ? p.splice(23, 3, "L", c + 6, d + b, c, d + b + 6, c - 6, d + b, a + f, d + b) : e && 0 > e && c > a + J && c < a + u - J && p.splice(3, 3, "L", c - 6, d, c, d - 6, c + 6, d, u - f, d);
                    return p
                }
            }, clipRect: function (d, u, b, e) {
                var f = "highcharts-" + a.idCounter++, c = this.createElement("clipPath").attr({id: f}).add(this.defs);
                d = this.rect(d, u, b, e, 0).add(c);
                d.id = f;
                d.clipPath = c;
                d.count = 0;
                return d
            }, text: function (a, d, b, e) {
                var f = !u && this.forExport, c = {};
                if (e && (this.allowHTML || !this.forExport))return this.html(a, d, b);
                c.x = Math.round(d || 0);
                b && (c.y = Math.round(b));
                if (a || 0 === a)c.text = a;
                a = this.createElement("text").attr(c);
                f && a.css({position: "absolute"});
                e || (a.xSetter = function (a, d, u) {
                    var b = u.getElementsByTagName("tspan"), e, f = u.getAttribute(d), c;
                    for (c = 0; c < b.length; c++)e = b[c], e.getAttribute(d) === f && e.setAttribute(d, a);
                    u.setAttribute(d, a)
                });
                return a
            }, fontMetrics: function (a, d) {
                a = a || this.style && this.style.fontSize;
                a = /px/.test(a) ? x(a) : /em/.test(a) ? 12 * parseFloat(a) :
                    12;
                d = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: d, b: Math.round(.8 * d), f: a}
            }, rotCorr: function (a, d, u) {
                var b = a;
                d && u && (b = Math.max(b * Math.cos(d * n), 4));
                return {x: -a / 3 * Math.sin(d * n), y: b}
            }, label: function (a, d, u, b, e, f, c, J, p) {
                var x = this, t = x.g("button" !== p && "label"), g = t.text = x.text("", 0, 0, c).attr({zIndex: 1}), v, F, G = 0, B = 3, L = 0, n, Q, I, M, O, q = {}, K, l, k = /^url\((.*?)\)$/.test(b), P = k, r, S, w, R;
                p && t.addClass("highcharts-" + p);
                P = k;
                r = function () {
                    return (K || 0) % 2 / 2
                };
                S = function () {
                    var a = g.element.style, d = {};
                    F = (void 0 === n || void 0 === Q || O) && h(g.textStr) &&
                        g.getBBox();
                    t.width = (n || F.width || 0) + 2 * B + L;
                    t.height = (Q || F.height || 0) + 2 * B;
                    l = B + x.fontMetrics(a && a.fontSize, g).b;
                    P && (v || (t.box = v = x.symbols[b] || k ? x.symbol(b) : x.rect(), v.addClass(("button" === p ? "" : "highcharts-label-box") + (p ? " highcharts-" + p + "-box" : "")), v.add(t), a = r(), d.x = a, d.y = (J ? -l : 0) + a), d.width = Math.round(t.width), d.height = Math.round(t.height), v.attr(z(d, q)), q = {})
                };
                w = function () {
                    var a = L + B, d;
                    d = J ? 0 : l;
                    h(n) && F && ("center" === O || "right" === O) && (a += {center: .5, right: 1}[O] * (n - F.width));
                    if (a !== g.x || d !== g.y)g.attr("x",
                        a), void 0 !== d && g.attr("y", d);
                    g.x = a;
                    g.y = d
                };
                R = function (a, d) {
                    v ? v.attr(a, d) : q[a] = d
                };
                t.onAdd = function () {
                    g.add(t);
                    t.attr({text: a || 0 === a ? a : "", x: d, y: u});
                    v && h(e) && t.attr({anchorX: e, anchorY: f})
                };
                t.widthSetter = function (a) {
                    n = a
                };
                t.heightSetter = function (a) {
                    Q = a
                };
                t["text-alignSetter"] = function (a) {
                    O = a
                };
                t.paddingSetter = function (a) {
                    h(a) && a !== B && (B = t.padding = a, w())
                };
                t.paddingLeftSetter = function (a) {
                    h(a) && a !== L && (L = a, w())
                };
                t.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== G && (G = a, F && t.attr({x: I}))
                };
                t.textSetter =
                    function (a) {
                        void 0 !== a && g.textSetter(a);
                        S();
                        w()
                    };
                t["stroke-widthSetter"] = function (a, d) {
                    a && (P = !0);
                    K = this["stroke-width"] = a;
                    R(d, a)
                };
                t.strokeSetter = t.fillSetter = t.rSetter = function (a, d) {
                    "fill" === d && a && (P = !0);
                    R(d, a)
                };
                t.anchorXSetter = function (a, d) {
                    e = a;
                    R(d, Math.round(a) - r() - I)
                };
                t.anchorYSetter = function (a, d) {
                    f = a;
                    R(d, a - M)
                };
                t.xSetter = function (a) {
                    t.x = a;
                    G && (a -= G * ((n || F.width) + 2 * B));
                    I = Math.round(a);
                    t.attr("translateX", I)
                };
                t.ySetter = function (a) {
                    M = t.y = Math.round(a);
                    t.attr("translateY", M)
                };
                var T = t.css;
                return z(t,
                    {
                        css: function (a) {
                            if (a) {
                                var d = {};
                                a = y(a);
                                m(t.textProps, function (u) {
                                    void 0 !== a[u] && (d[u] = a[u], delete a[u])
                                });
                                g.css(d)
                            }
                            return T.call(t, a)
                        }, getBBox: function () {
                        return {width: F.width + 2 * B, height: F.height + 2 * B, x: F.x - B, y: F.y - B}
                    }, shadow: function (a) {
                        a && (S(), v && v.shadow(a));
                        return t
                    }, destroy: function () {
                        D(t.element, "mouseenter");
                        D(t.element, "mouseleave");
                        g && (g = g.destroy());
                        v && (v = v.destroy());
                        C.prototype.destroy.call(t);
                        t = x = S = w = R = null
                    }
                    })
            }
        };
        a.Renderer = A
    })(N);
    (function (a) {
        var C = a.attr, A = a.createElement, E = a.css, H = a.defined,
            w = a.each, k = a.extend, l = a.isFirefox, r = a.isMS, q = a.isWebKit, h = a.pInt, n = a.SVGRenderer, c = a.win, g = a.wrap;
        k(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = this.element;
                if (c = a && "SPAN" === c.tagName && a.width)delete a.width, this.textWidth = c, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = k(this.styles, a);
                E(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight
                }
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, c = this.element, f = this.translateX || 0, e = this.translateY || 0, b = this.x || 0, p = this.y || 0, g = this.textAlign || "left", d = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[g], F = this.styles;
                    E(c, {marginLeft: f, marginTop: e});
                    this.shadows && w(this.shadows, function (a) {
                        E(a, {marginLeft: f + 1, marginTop: e + 1})
                    });
                    this.inverted && w(c.childNodes, function (d) {
                        a.invertChild(d, c)
                    });
                    if ("SPAN" === c.tagName) {
                        var t = this.rotation, v = h(this.textWidth),
                            y = F && F.whiteSpace, n = [t, g, c.innerHTML, this.textWidth, this.textAlign].join();
                        n !== this.cTT && (F = a.fontMetrics(c.style.fontSize).b, H(t) && this.setSpanRotation(t, d, F), E(c, {
                            width: "",
                            whiteSpace: y || "nowrap"
                        }), c.offsetWidth > v && /[ \-]/.test(c.textContent || c.innerText) && E(c, {
                            width: v + "px",
                            display: "block",
                            whiteSpace: y || "normal"
                        }), this.getSpanCorrection(c.offsetWidth, F, d, t, g));
                        E(c, {left: b + (this.xCorr || 0) + "px", top: p + (this.yCorr || 0) + "px"});
                        q && (F = c.offsetHeight);
                        this.cTT = n
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a,
                                          g, f) {
                var e = {}, b = r ? "-ms-transform" : q ? "-webkit-transform" : l ? "MozTransform" : c.opera ? "-o-transform" : "";
                e[b] = e.transform = "rotate(" + a + "deg)";
                e[b + (l ? "Origin" : "-origin")] = e.transformOrigin = 100 * g + "% " + f + "px";
                E(this.element, e)
            }, getSpanCorrection: function (a, c, f) {
                this.xCorr = -a * f;
                this.yCorr = -c
            }
        });
        k(n.prototype, {
            html: function (a, c, f) {
                var e = this.createElement("span"), b = e.element, p = e.renderer, m = p.isSVG, d = function (a, d) {
                    w(["opacity", "visibility"], function (b) {
                        g(a, b + "Setter", function (a, b, e, f) {
                            a.call(this, b, e, f);
                            d[e] =
                                b
                        })
                    })
                };
                e.textSetter = function (a) {
                    a !== b.innerHTML && delete this.bBox;
                    b.innerHTML = this.textStr = a;
                    e.htmlUpdateTransform()
                };
                m && d(e, e.element.style);
                e.xSetter = e.ySetter = e.alignSetter = e.rotationSetter = function (a, d) {
                    "align" === d && (d = "textAlign");
                    e[d] = a;
                    e.htmlUpdateTransform()
                };
                e.attr({text: a, x: Math.round(c), y: Math.round(f)}).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                b.style.whiteSpace = "nowrap";
                e.css = e.htmlCss;
                m && (e.add = function (a) {
                    var f, c = p.box.parentNode, g = [];
                    if (this.parentGroup = a) {
                        if (f = a.div, !f) {
                            for (; a;)g.push(a), a = a.parentGroup;
                            w(g.reverse(), function (a) {
                                var b, e = C(a.element, "class");
                                e && (e = {className: e});
                                f = a.div = a.div || A("div", e, {
                                        position: "absolute",
                                        left: (a.translateX || 0) + "px",
                                        top: (a.translateY || 0) + "px",
                                        display: a.display,
                                        opacity: a.opacity,
                                        pointerEvents: a.styles && a.styles.pointerEvents
                                    }, f || c);
                                b = f.style;
                                k(a, {
                                    translateXSetter: function (d, e) {
                                        b.left = d + "px";
                                        a[e] = d;
                                        a.doTransform = !0
                                    }, translateYSetter: function (d, e) {
                                        b.top = d + "px";
                                        a[e] = d;
                                        a.doTransform = !0
                                    }
                                });
                                d(a, b)
                            })
                        }
                    } else f =
                        c;
                    f.appendChild(b);
                    e.added = !0;
                    e.alignOnAdd && e.htmlUpdateTransform();
                    return e
                });
                return e
            }
        })
    })(N);
    (function (a) {
        var C, A, E = a.createElement, H = a.css, w = a.defined, k = a.deg2rad, l = a.discardElement, r = a.doc, q = a.each, h = a.erase, n = a.extend;
        C = a.extendClass;
        var c = a.isArray, g = a.isNumber, m = a.isObject, z = a.merge;
        A = a.noop;
        var f = a.pick, e = a.pInt, b = a.SVGElement, p = a.SVGRenderer, K = a.win;
        a.svg || (A = {
            docMode8: r && 8 === r.documentMode, init: function (a, b) {
                var d = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'], e = ["position: ", "absolute", ";"],
                    f = "div" === b;
                ("shape" === b || f) && e.push("left:0;top:0;width:1px;height:1px;");
                e.push("visibility: ", f ? "hidden" : "visible");
                d.push(' style\x3d"', e.join(""), '"/\x3e');
                b && (d = f || "span" === b || "img" === b ? d.join("") : a.prepVML(d), this.element = E(d));
                this.renderer = a
            }, add: function (a) {
                var d = this.renderer, b = this.element, e = d.box, f = a && a.inverted, e = a ? a.element || a : e;
                a && (this.parentGroup = a);
                f && d.invertChild(b, e);
                e.appendChild(b);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd)this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            }, updateTransform: b.prototype.htmlUpdateTransform, setSpanRotation: function () {
                var a = this.rotation, b = Math.cos(a * k), e = Math.sin(a * k);
                H(this.element, {filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -e, ", M21\x3d", e, ", M22\x3d", b, ", sizingMethod\x3d'auto expand')"].join("") : "none"})
            }, getSpanCorrection: function (a, b, e, c, p) {
                var d = c ? Math.cos(c * k) : 1, g = c ? Math.sin(c * k) : 0, t = f(this.elemHeight, this.element.offsetHeight), D;
                this.xCorr =
                    0 > d && -a;
                this.yCorr = 0 > g && -t;
                D = 0 > d * g;
                this.xCorr += g * b * (D ? 1 - e : e);
                this.yCorr -= d * b * (c ? D ? e : 1 - e : 1);
                p && "left" !== p && (this.xCorr -= a * e * (0 > d ? -1 : 1), c && (this.yCorr -= t * e * (0 > g ? -1 : 1)), H(this.element, {textAlign: p}))
            }, pathToVML: function (a) {
                for (var d = a.length, b = []; d--;)g(a[d]) ? b[d] = Math.round(10 * a[d]) - 5 : "Z" === a[d] ? b[d] = "x" : (b[d] = a[d], !a.isArc || "wa" !== a[d] && "at" !== a[d] || (b[d + 5] === b[d + 7] && (b[d + 7] += a[d + 7] > a[d + 5] ? 1 : -1), b[d + 6] === b[d + 8] && (b[d + 8] += a[d + 8] > a[d + 6] ? 1 : -1)));
                return b.join(" ") || "x"
            }, clip: function (a) {
                var d = this, b;
                a ? (b = a.members, h(b, d), b.push(d), d.destroyClip = function () {
                    h(b, d)
                }, a = a.getCSS(d)) : (d.destroyClip && d.destroyClip(), a = {clip: d.docMode8 ? "inherit" : "rect(auto)"});
                return d.css(a)
            }, css: b.prototype.htmlCss, safeRemoveChild: function (a) {
                a.parentNode && l(a)
            }, destroy: function () {
                this.destroyClip && this.destroyClip();
                return b.prototype.destroy.apply(this)
            }, on: function (a, b) {
                this.element["on" + a] = function () {
                    var a = K.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            }, cutOffPath: function (a, b) {
                var d;
                a = a.split(/[ ,]/);
                d = a.length;
                if (9 === d || 11 === d)a[d - 4] = a[d - 2] = e(a[d - 2]) - 10 * b;
                return a.join(" ")
            }, shadow: function (a, b, c) {
                var d = [], p, g = this.element, t = this.renderer, x, D = g.style, m, u = g.path, J, F, h, B;
                u && "string" !== typeof u.value && (u = "x");
                F = u;
                if (a) {
                    h = f(a.width, 3);
                    B = (a.opacity || .15) / h;
                    for (p = 1; 3 >= p; p++)J = 2 * h + 1 - 2 * p, c && (F = this.cutOffPath(u.value, J + .5)), m = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"', J, '" filled\x3d"false" path\x3d"', F, '" coordsize\x3d"10 10" style\x3d"', g.style.cssText, '" /\x3e'], x = E(t.prepVML(m), null, {
                        left: e(D.left) +
                        f(a.offsetX, 1), top: e(D.top) + f(a.offsetY, 1)
                    }), c && (x.cutOff = J + 1), m = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', B * p, '"/\x3e'], E(t.prepVML(m), null, null, x), b ? b.element.appendChild(x) : g.parentNode.insertBefore(x, g), d.push(x);
                    this.shadows = d
                }
                return this
            }, updateShadows: A, setAttr: function (a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            }, classSetter: function (a) {
                (this.added ? this.element : this).className = a
            }, dashstyleSetter: function (a, b, e) {
                (e.getElementsByTagName("stroke")[0] ||
                E(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, e))[b] = a || "solid";
                this[b] = a
            }, dSetter: function (a, b, e) {
                var d = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                e.path = a = this.pathToVML(a);
                if (d)for (e = d.length; e--;)d[e].path = d[e].cutOff ? this.cutOffPath(a, d[e].cutOff) : a;
                this.setAttr(b, a)
            }, fillSetter: function (a, b, e) {
                var d = e.nodeName;
                "SPAN" === d ? e.style.color = a : "IMG" !== d && (e.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, e, b, this)))
            }, "fill-opacitySetter": function (a, b, e) {
                E(this.renderer.prepVML(["\x3c",
                    b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, e)
            }, opacitySetter: A, rotationSetter: function (a, b, e) {
                e = e.style;
                this[b] = e[b] = a;
                e.left = -Math.round(Math.sin(a * k) + 1) + "px";
                e.top = Math.round(Math.cos(a * k)) + "px"
            }, strokeSetter: function (a, b, e) {
                this.setAttr("strokecolor", this.renderer.color(a, e, b, this))
            }, "stroke-widthSetter": function (a, b, e) {
                e.stroked = !!a;
                this[b] = a;
                g(a) && (a += "px");
                this.setAttr("strokeweight", a)
            }, titleSetter: function (a, b) {
                this.setAttr(b, a)
            }, visibilitySetter: function (a, b, e) {
                "inherit" === a &&
                (a = "visible");
                this.shadows && q(this.shadows, function (d) {
                    d.style[b] = a
                });
                "DIV" === e.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (e.style[b] = a ? "visible" : "hidden"), b = "top");
                e.style[b] = a
            }, xSetter: function (a, b, e) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : e.style[b] = a
            }, zIndexSetter: function (a, b, e) {
                e.style[b] = a
            }
        }, A["stroke-opacitySetter"] = A["fill-opacitySetter"], a.VMLElement = A = C(b, A), A.prototype.ySetter = A.prototype.widthSetter = A.prototype.heightSetter =
            A.prototype.xSetter, A = {
            Element: A, isIE8: -1 < K.navigator.userAgent.indexOf("MSIE 8.0"), init: function (a, b, e) {
                var d, f;
                this.alignedObjects = [];
                d = this.createElement("div").css({position: "relative"});
                f = d.element;
                a.appendChild(d.element);
                this.isVML = !0;
                this.box = f;
                this.boxWrapper = d;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b, e, !1);
                if (!r.namespaces.hcv) {
                    r.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        r.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (I) {
                        r.styleSheets[0].cssText +=
                            "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            }, isHidden: function () {
                return !this.box.offsetWidth
            }, clipRect: function (a, b, e, f) {
                var d = this.createElement(), c = m(a);
                return n(d, {
                    members: [],
                    count: 0,
                    left: (c ? a.x : a) + 1,
                    top: (c ? a.y : b) + 1,
                    width: (c ? a.width : e) - 1,
                    height: (c ? a.height : f) - 1,
                    getCSS: function (a) {
                        var d = a.element, b = d.nodeName, e = a.inverted, u = this.top - ("shape" === b ? d.offsetTop : 0), f = this.left, d = f + this.width, c = u + this.height, u = {
                            clip: "rect(" + Math.round(e ?
                                f : u) + "px," + Math.round(e ? c : d) + "px," + Math.round(e ? d : c) + "px," + Math.round(e ? u : f) + "px)"
                        };
                        !e && a.docMode8 && "DIV" === b && n(u, {width: d + "px", height: c + "px"});
                        return u
                    },
                    updateClipping: function () {
                        q(d.members, function (a) {
                            a.element && a.css(d.getCSS(a))
                        })
                    }
                })
            }, color: function (d, b, e, f) {
                var c = this, p, g = /^rgba/, x, D, t = "none";
                d && d.linearGradient ? D = "gradient" : d && d.radialGradient && (D = "pattern");
                if (D) {
                    var u, J, v = d.linearGradient || d.radialGradient, m, B, L, h, F, n = "";
                    d = d.stops;
                    var z, l = [], k = function () {
                        x = ['\x3cfill colors\x3d"' + l.join(",") +
                        '" opacity\x3d"', L, '" o:opacity2\x3d"', B, '" type\x3d"', D, '" ', n, 'focus\x3d"100%" method\x3d"any" /\x3e'];
                        E(c.prepVML(x), null, null, b)
                    };
                    m = d[0];
                    z = d[d.length - 1];
                    0 < m[0] && d.unshift([0, m[1]]);
                    1 > z[0] && d.push([1, z[1]]);
                    q(d, function (d, b) {
                        g.test(d[1]) ? (p = a.color(d[1]), u = p.get("rgb"), J = p.get("a")) : (u = d[1], J = 1);
                        l.push(100 * d[0] + "% " + u);
                        b ? (L = J, h = u) : (B = J, F = u)
                    });
                    if ("fill" === e)if ("gradient" === D)e = v.x1 || v[0] || 0, d = v.y1 || v[1] || 0, m = v.x2 || v[2] || 0, v = v.y2 || v[3] || 0, n = 'angle\x3d"' + (90 - 180 * Math.atan((v - d) / (m - e)) / Math.PI) + '"',
                        k(); else {
                        var t = v.r, K = 2 * t, r = 2 * t, w = v.cx, A = v.cy, C = b.radialReference, H, t = function () {
                            C && (H = f.getBBox(), w += (C[0] - H.x) / H.width - .5, A += (C[1] - H.y) / H.height - .5, K *= C[2] / H.width, r *= C[2] / H.height);
                            n = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + K + "," + r + '" origin\x3d"0.5,0.5" position\x3d"' + w + "," + A + '" color2\x3d"' + F + '" ';
                            k()
                        };
                        f.added ? t() : f.onAdd = t;
                        t = h
                    } else t = u
                } else g.test(d) && "IMG" !== b.tagName ? (p = a.color(d), f[e + "-opacitySetter"](p.get("a"), e, b), t = p.get("rgb")) : (t = b.getElementsByTagName(e),
                t.length && (t[0].opacity = 1, t[0].type = "solid"), t = d);
                return t
            }, prepVML: function (a) {
                var d = this.isIE8;
                a = a.join("");
                d ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') : a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                return a
            }, text: p.prototype.html, path: function (a) {
                var d = {coordsize: "10 10"};
                c(a) ? d.d =
                    a : m(a) && n(d, a);
                return this.createElement("shape").attr(d)
            }, circle: function (a, b, e) {
                var d = this.symbol("circle");
                m(a) && (e = a.r, b = a.y, a = a.x);
                d.isCircle = !0;
                d.r = e;
                return d.attr({x: a, y: b})
            }, g: function (a) {
                var d;
                a && (d = {className: "highcharts-" + a, "class": "highcharts-" + a});
                return this.createElement("div").attr(d)
            }, image: function (a, b, e, f, c) {
                var d = this.createElement("img").attr({src: a});
                1 < arguments.length && d.attr({x: b, y: e, width: f, height: c});
                return d
            }, createElement: function (a) {
                return "rect" === a ? this.symbol(a) : p.prototype.createElement.call(this,
                    a)
            }, invertChild: function (a, b) {
                var d = this;
                b = b.style;
                var f = "IMG" === a.tagName && a.style;
                H(a, {
                    flip: "x",
                    left: e(b.width) - (f ? e(f.top) : 1),
                    top: e(b.height) - (f ? e(f.left) : 1),
                    rotation: -90
                });
                q(a.childNodes, function (b) {
                    d.invertChild(b, a)
                })
            }, symbols: {
                arc: function (a, b, e, f, c) {
                    var d = c.start, p = c.end, g = c.r || e || f;
                    e = c.innerR;
                    f = Math.cos(d);
                    var D = Math.sin(d), t = Math.cos(p), u = Math.sin(p);
                    if (0 === p - d)return ["x"];
                    d = ["wa", a - g, b - g, a + g, b + g, a + g * f, b + g * D, a + g * t, b + g * u];
                    c.open && !e && d.push("e", "M", a, b);
                    d.push("at", a - e, b - e, a + e, b + e, a + e * t,
                        b + e * u, a + e * f, b + e * D, "x", "e");
                    d.isArc = !0;
                    return d
                }, circle: function (a, b, e, f, c) {
                    c && w(c.r) && (e = f = 2 * c.r);
                    c && c.isCircle && (a -= e / 2, b -= f / 2);
                    return ["wa", a, b, a + e, b + f, a + e, b + f / 2, a + e, b + f / 2, "e"]
                }, rect: function (a, b, e, f, c) {
                    return p.prototype.symbols[w(c) && c.r ? "callout" : "square"].call(0, a, b, e, f, c)
                }
            }
        }, a.VMLRenderer = C = function () {
            this.init.apply(this, arguments)
        }, C.prototype = z(p.prototype, A), a.Renderer = C);
        p.prototype.measureSpanWidth = function (a, b) {
            var d = r.createElement("span");
            a = r.createTextNode(a);
            d.appendChild(a);
            H(d,
                b);
            this.box.appendChild(d);
            b = d.offsetWidth;
            l(d);
            return b
        }
    })(N);
    (function (a) {
        function C() {
            var r = a.defaultOptions.global, q, h = r.useUTC, n = h ? "getUTC" : "get", c = h ? "setUTC" : "set";
            a.Date = q = r.Date || l.Date;
            q.hcTimezoneOffset = h && r.timezoneOffset;
            q.hcGetTimezoneOffset = h && r.getTimezoneOffset;
            q.hcMakeTime = function (a, c, n, f, e, b) {
                var p;
                h ? (p = q.UTC.apply(0, arguments), p += H(p)) : p = (new q(a, c, k(n, 1), k(f, 0), k(e, 0), k(b, 0))).getTime();
                return p
            };
            E("Minutes Hours Day Date Month FullYear".split(" "), function (a) {
                q["hcGet" + a] = n +
                    a
            });
            E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function (a) {
                q["hcSet" + a] = c + a
            })
        }

        var A = a.color, E = a.each, H = a.getTZOffset, w = a.merge, k = a.pick, l = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {useUTC: !0, VMLRadialGradientURL: "http://code.highcharts.com/5.0.2/gfx/vml-radial-gradient.png"},
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 20}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {color: "#333333", fontSize: "18px"},
                widthAdjust: -44
            },
            subtitle: {text: "", align: "center", style: {color: "#666666"}, widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px", fontWeight: "bold"
                },
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#cccccc"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: A("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (l) {
            a.defaultOptions = w(!0, a.defaultOptions, l);
            C();
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        C()
    })(N);
    (function (a) {
        var C =
            a.arrayMax, A = a.arrayMin, E = a.defined, H = a.destroyObjectProperties, w = a.each, k = a.erase, l = a.merge, r = a.pick;
        a.PlotLineOrBand = function (a, h) {
            this.axis = a;
            h && (this.options = h, this.id = h.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var a = this, h = a.axis, n = h.horiz, c = a.options, g = c.label, m = a.label, z = c.to, f = c.from, e = c.value, b = E(f) && E(z), p = E(e), k = a.svgElem, d = !k, F = [], t, v = c.color, y = r(c.zIndex, 0), I = c.events, F = {"class": "highcharts-plot-" + (b ? "band " : "line ") + (c.className || "")}, G = {}, x = h.chart.renderer, D = b ? "bands" : "lines",
                    M = h.log2lin;
                h.isLog && (f = M(f), z = M(z), e = M(e));
                p ? (F = {
                    stroke: v,
                    "stroke-width": c.width
                }, c.dashStyle && (F.dashstyle = c.dashStyle)) : b && (v && (F.fill = v), c.borderWidth && (F.stroke = c.borderColor, F["stroke-width"] = c.borderWidth));
                G.zIndex = y;
                D += "-" + y;
                (v = h[D]) || (h[D] = v = x.g("plot-" + D).attr(G).add());
                d && (a.svgElem = k = x.path().attr(F).add(v));
                if (p)F = h.getPlotLinePath(e, k.strokeWidth()); else if (b)F = h.getPlotBandPath(f, z, c); else return;
                if (d && F && F.length) {
                    if (k.attr({d: F}), I)for (t in c = function (d) {
                        k.on(d, function (b) {
                            I[d].apply(a,
                                [b])
                        })
                    }, I)c(t)
                } else k && (F ? (k.show(), k.animate({d: F})) : (k.hide(), m && (a.label = m = m.destroy())));
                g && E(g.text) && F && F.length && 0 < h.width && 0 < h.height && !F.flat ? (g = l({
                    align: n && b && "center",
                    x: n ? !b && 4 : 10,
                    verticalAlign: !n && b && "middle",
                    y: n ? b ? 16 : 10 : b ? 6 : -4,
                    rotation: n && !b && 90
                }, g), this.renderLabel(g, F, b, y)) : m && m.hide();
                return a
            }, renderLabel: function (a, h, n, c) {
                var g = this.label, m = this.axis.chart.renderer;
                g || (g = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (n ? "band" : "line") + "-label " + (a.className ||
                    "")
                }, g.zIndex = c, this.label = g = m.text(a.text, 0, 0, a.useHTML).attr(g).add(), g.css(a.style));
                c = [h[1], h[4], n ? h[6] : h[1]];
                h = [h[2], h[5], n ? h[7] : h[2]];
                n = A(c);
                m = A(h);
                g.align(a, !1, {x: n, y: m, width: C(c) - n, height: C(h) - m});
                g.show()
            }, destroy: function () {
                k(this.axis.plotLinesAndBands, this);
                delete this.axis;
                H(this)
            }
        };
        a.AxisPlotLineOrBandExtension = {
            getPlotBandPath: function (a, h) {
                h = this.getPlotLinePath(h, null, null, !0);
                (a = this.getPlotLinePath(a, null, null, !0)) && h ? (a.flat = a.toString() === h.toString(), a.push(h[4], h[5], h[1], h[2])) :
                    a = null;
                return a
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }, addPlotBandOrLine: function (k, h) {
                var n = (new a.PlotLineOrBand(this, k)).render(), c = this.userOptions;
                n && (h && (c[h] = c[h] || [], c[h].push(k)), this.plotLinesAndBands.push(n));
                return n
            }, removePlotBandOrLine: function (a) {
                for (var h = this.plotLinesAndBands, n = this.options, c = this.userOptions, g = h.length; g--;)h[g].id === a && h[g].destroy();
                w([n.plotLines || [], c.plotLines ||
                [], n.plotBands || [], c.plotBands || []], function (c) {
                    for (g = c.length; g--;)c[g].id === a && k(c, c[g])
                })
            }
        }
    })(N);
    (function (a) {
        var C = a.correctFloat, A = a.defined, E = a.destroyObjectProperties, H = a.isNumber, w = a.merge, k = a.pick, l = a.stop, r = a.deg2rad;
        a.Tick = function (a, h, n, c) {
            this.axis = a;
            this.pos = h;
            this.type = n || "";
            this.isNew = !0;
            n || c || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, h = a.options, n = a.chart, c = a.categories, g = a.names, m = this.pos, z = h.labels, f = a.tickPositions, e = m === f[0], b = m === f[f.length - 1], g =
                    c ? k(c[m], g[m], m) : m, c = this.label, f = f.info, p;
                a.isDatetimeAxis && f && (p = h.dateTimeLabelFormats[f.higherRanks[m] || f.unitName]);
                this.isFirst = e;
                this.isLast = b;
                h = a.labelFormatter.call({
                    axis: a,
                    chart: n,
                    isFirst: e,
                    isLast: b,
                    dateTimeLabelFormat: p,
                    value: a.isLog ? C(a.lin2log(g)) : g
                });
                A(c) ? c && c.attr({text: h}) : (this.labelLength = (this.label = c = A(h) && z.enabled ? n.renderer.text(h, 0, 0, z.useHTML).css(w(z.style)).add(a.labelGroup) : null) && c.getBBox().width, this.rotation = 0)
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ?
                    "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var h = this.axis, n = a.x, c = h.chart.chartWidth, g = h.chart.spacing, m = k(h.labelLeft, Math.min(h.pos, g[3])), g = k(h.labelRight, Math.max(h.pos + h.len, c - g[1])), z = this.label, f = this.rotation, e = {
                    left: 0,
                    center: .5,
                    right: 1
                }[h.labelAlign], b = z.getBBox().width, p = h.getSlotWidth(), l = p, d = 1, F, t = {};
                if (f)0 > f && n - e * b < m ? F = Math.round(n / Math.cos(f * r) - m) : 0 < f && n + e * b > g && (F = Math.round((c - n) / Math.cos(f * r))); else if (c = n + (1 - e) * b, n - e * b < m ? l = a.x + l * (1 - e) - m : c > g && (l = g - a.x + l * e, d = -1), l = Math.min(p,
                        l), l < p && "center" === h.labelAlign && (a.x += d * (p - l - e * (p - Math.min(b, l)))), b > l || h.autoRotation && (z.styles || {}).width)F = l;
                F && (t.width = F, (h.options.labels.style || {}).textOverflow || (t.textOverflow = "ellipsis"), z.css(t))
            }, getPosition: function (a, h, n, c) {
                var g = this.axis, m = g.chart, z = c && m.oldChartHeight || m.chartHeight;
                return {
                    x: a ? g.translate(h + n, null, null, c) + g.transB : g.left + g.offset + (g.opposite ? (c && m.oldChartWidth || m.chartWidth) - g.right - g.left : 0),
                    y: a ? z - g.bottom + g.offset - (g.opposite ? g.height : 0) : z - g.translate(h + n, null,
                        null, c) - g.transB
                }
            }, getLabelPosition: function (a, h, n, c, g, m, z, f) {
                var e = this.axis, b = e.transA, p = e.reversed, l = e.staggerLines, d = e.tickRotCorr || {
                        x: 0,
                        y: 0
                    }, F = g.y;
                A(F) || (F = 0 === e.side ? n.rotation ? -8 : -n.getBBox().height : 2 === e.side ? d.y + 8 : Math.cos(n.rotation * r) * (d.y - n.getBBox(!1, 0).height / 2));
                a = a + g.x + d.x - (m && c ? m * b * (p ? -1 : 1) : 0);
                h = h + F - (m && !c ? m * b * (p ? 1 : -1) : 0);
                l && (n = z / (f || 1) % l, e.opposite && (n = l - n - 1), h += e.labelOffset / l * n);
                return {x: a, y: Math.round(h)}
            }, getMarkPath: function (a, h, n, c, g, m) {
                return m.crispLine(["M", a, h, "L", a + (g ?
                    0 : -n), h + (g ? n : 0)], c)
            }, render: function (a, h, n) {
                var c = this.axis, g = c.options, m = c.chart.renderer, z = c.horiz, f = this.type, e = this.label, b = this.pos, p = g.labels, K = this.gridLine, d = f ? f + "Tick" : "tick", F = c.tickSize(d), t = this.mark, v = !t, y = p.step, I = {}, G = !0, x = c.tickmarkOffset, D = this.getPosition(z, b, x, h), M = D.x, D = D.y, u = z && M === c.pos + c.len || !z && D === c.pos ? -1 : 1, J = f ? f + "Grid" : "grid", O = g[J + "LineWidth"], Q = g[J + "LineColor"], B = g[J + "LineDashStyle"], J = k(g[d + "Width"], !f && c.isXAxis ? 1 : 0), d = g[d + "Color"];
                n = k(n, 1);
                this.isActive = !0;
                K || (I.stroke =
                    Q, I["stroke-width"] = O, B && (I.dashstyle = B), f || (I.zIndex = 1), h && (I.opacity = 0), this.gridLine = K = m.path().attr(I).addClass("highcharts-" + (f ? f + "-" : "") + "grid-line").add(c.gridGroup));
                if (!h && K && (b = c.getPlotLinePath(b + x, K.strokeWidth() * u, h, !0)))K[this.isNew ? "attr" : "animate"]({
                    d: b,
                    opacity: n
                });
                F && (c.opposite && (F[0] = -F[0]), v && (this.mark = t = m.path().addClass("highcharts-" + (f ? f + "-" : "") + "tick").add(c.axisGroup), t.attr({
                    stroke: d,
                    "stroke-width": J
                })), t[v ? "attr" : "animate"]({
                    d: this.getMarkPath(M, D, F[0], t.strokeWidth() *
                        u, z, m), opacity: n
                }));
                e && H(M) && (e.xy = D = this.getLabelPosition(M, D, e, z, p, x, a, y), this.isFirst && !this.isLast && !k(g.showFirstLabel, 1) || this.isLast && !this.isFirst && !k(g.showLastLabel, 1) ? G = !1 : !z || c.isRadial || p.step || p.rotation || h || 0 === n || this.handleOverflow(D), y && a % y && (G = !1), G && H(D.y) ? (D.opacity = n, e[this.isNew ? "attr" : "animate"](D)) : (l(e), e.attr("y", -9999)), this.isNew = !1)
            }, destroy: function () {
                E(this, this.axis)
            }
        }
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.animObject, E = a.arrayMax, H = a.arrayMin, w = a.AxisPlotLineOrBandExtension,
            k = a.color, l = a.correctFloat, r = a.defaultOptions, q = a.defined, h = a.deg2rad, n = a.destroyObjectProperties, c = a.each, g = a.error, m = a.extend, z = a.fireEvent, f = a.format, e = a.getMagnitude, b = a.grep, p = a.inArray, K = a.isArray, d = a.isNumber, F = a.isString, t = a.merge, v = a.normalizeTickInterval, y = a.pick, I = a.PlotLineOrBand, G = a.removeEvent, x = a.splat, D = a.syncTimeout, M = a.Tick;
        a.Axis = function () {
            this.init.apply(this, arguments)
        };
        a.Axis.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L", second: "%H:%M:%S", minute: "%H:%M",
                    hour: "%H:%M", day: "%e. %b", week: "%e. %b", month: "%b '%y", year: "%Y"
                },
                endOnTick: !1,
                labels: {enabled: !0, style: {color: "#666666", cursor: "default", fontSize: "11px"}, x: 0},
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    enabled: !1,
                    formatter: function () {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {x: -15},
                title: {rotation: 270}
            },
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            init: function (a, d) {
                var b = d.isX;
                this.chart = a;
                this.horiz = a.inverted ? !b : b;
                this.isXAxis = b;
                this.coll = this.coll || (b ? "xAxis" : "yAxis");
                this.opposite = d.opposite;
                this.side = d.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
                this.setOptions(d);
                var e = this.options, u = e.type;
                this.labelFormatter = e.labels.formatter || this.defaultLabelFormatter;
                this.userOptions = d;
                this.minPixelPadding = 0;
                this.reversed = e.reversed;
                this.visible = !1 !== e.visible;
                this.zoomEnabled = !1 !== e.zoomEnabled;
                this.hasNames = "category" === u || !0 === e.categories;
                this.categories = e.categories || this.hasNames;
                this.names = this.names || [];
                this.isLog = "logarithmic" === u;
                this.isDatetimeAxis = "datetime" === u;
                this.isLinked = q(e.linkedTo);
                this.ticks = {};
                this.labelEdge = [];
                this.minorTicks = {};
                this.plotLinesAndBands = [];
                this.alternateBands =
                {};
                this.len = 0;
                this.minRange = this.userMinRange = e.minRange || e.maxZoom;
                this.range = e.range;
                this.offset = e.offset || 0;
                this.stacks = {};
                this.oldStacks = {};
                this.stacksTouched = 0;
                this.min = this.max = null;
                this.crosshair = y(e.crosshair, x(a.options.tooltip.crosshairs)[b ? 0 : 1], !1);
                var f;
                d = this.options.events;
                -1 === p(this, a.axes) && (b ? a.axes.splice(a.xAxis.length, 0, this) : a.axes.push(this), a[this.coll].push(this));
                this.series = this.series || [];
                a.inverted && b && void 0 === this.reversed && (this.reversed = !0);
                this.removePlotLine = this.removePlotBand =
                    this.removePlotBandOrLine;
                for (f in d)C(this, f, d[f]);
                this.isLog && (this.val2lin = this.log2lin, this.lin2val = this.lin2log)
            },
            setOptions: function (a) {
                this.options = t(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], t(r[this.coll], a))
            },
            defaultLabelFormatter: function () {
                var d = this.axis, b = this.value, e = d.categories, c = this.dateTimeLabelFormat, p = r.lang.numericSymbols, g = p &&
                    p.length, x, D = d.options.labels.format, d = d.isLog ? b : d.tickInterval;
                if (D)x = f(D, this); else if (e)x = b; else if (c)x = a.dateFormat(c, b); else if (g && 1E3 <= d)for (; g-- && void 0 === x;)e = Math.pow(1E3, g + 1), d >= e && 0 === 10 * b % e && null !== p[g] && 0 !== b && (x = a.numberFormat(b / e, -1) + p[g]);
                void 0 === x && (x = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return x
            },
            getSeriesExtremes: function () {
                var a = this, e = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks &&
                a.buildStacks();
                c(a.series, function (u) {
                    if (u.visible || !e.options.chart.ignoreHiddenSeries) {
                        var f = u.options, c = f.threshold, p;
                        a.hasVisibleSeries = !0;
                        a.isLog && 0 >= c && (c = null);
                        if (a.isXAxis)f = u.xData, f.length && (u = H(f), d(u) || u instanceof Date || (f = b(f, function (a) {
                            return d(a)
                        }), u = H(f)), a.dataMin = Math.min(y(a.dataMin, f[0]), u), a.dataMax = Math.max(y(a.dataMax, f[0]), E(f))); else if (u.getExtremes(), p = u.dataMax, u = u.dataMin, q(u) && q(p) && (a.dataMin = Math.min(y(a.dataMin, u), u), a.dataMax = Math.max(y(a.dataMax, p), p)), q(c) &&
                            (a.threshold = c), !f.softThreshold || a.isLog)a.softThreshold = !1
                    }
                })
            },
            translate: function (a, b, e, f, c, p) {
                var u = this.linkedParent || this, J = 1, g = 0, x = f ? u.oldTransA : u.transA;
                f = f ? u.oldMin : u.min;
                var D = u.minPixelPadding;
                c = (u.isOrdinal || u.isBroken || u.isLog && c) && u.lin2val;
                x || (x = u.transA);
                e && (J *= -1, g = u.len);
                u.reversed && (J *= -1, g -= J * (u.sector || u.len));
                b ? (a = (a * J + g - D) / x + f, c && (a = u.lin2val(a))) : (c && (a = u.val2lin(a)), "between" === p && (p = .5), a = J * (a - f) * x + g + J * D + (d(p) ? x * p * u.pointRange : 0));
                return a
            },
            toPixels: function (a, d) {
                return this.translate(a,
                        !1, !this.horiz, null, !0) + (d ? 0 : this.pos)
            },
            toValue: function (a, d) {
                return this.translate(a - (d ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, b, e, f, c) {
                var u = this.chart, p = this.left, J = this.top, g, x, D = e && u.oldChartHeight || u.chartHeight, t = e && u.oldChartWidth || u.chartWidth, v;
                g = this.transB;
                var m = function (a, d, b) {
                    if (a < d || a > b)f ? a = Math.min(Math.max(d, a), b) : v = !0;
                    return a
                };
                c = y(c, this.translate(a, null, null, e));
                a = e = Math.round(c + g);
                g = x = Math.round(D - c - g);
                d(c) ? this.horiz ? (g = J, x = D - this.bottom, a = e = m(a, p, p +
                    this.width)) : (a = p, e = t - this.right, g = x = m(g, J, J + this.height)) : v = !0;
                return v && !f ? null : u.renderer.crispLine(["M", a, g, "L", e, x], b || 1)
            },
            getLinearTickPositions: function (a, b, e) {
                var u, f = l(Math.floor(b / a) * a), c = l(Math.ceil(e / a) * a), p = [];
                if (b === e && d(b))return [b];
                for (b = f; b <= c;) {
                    p.push(b);
                    b = l(b + a);
                    if (b === u)break;
                    u = b
                }
                return p
            },
            getMinorTickPositions: function () {
                var a = this.options, d = this.tickPositions, b = this.minorTickInterval, e = [], f, c = this.pointRangePadding || 0;
                f = this.min - c;
                var c = this.max + c, p = c - f;
                if (p && p / b < this.len / 3)if (this.isLog)for (c =
                                                                      d.length, f = 1; f < c; f++)e = e.concat(this.getLogTickPositions(b, d[f - 1], d[f], !0)); else if (this.isDatetimeAxis && "auto" === a.minorTickInterval)e = e.concat(this.getTimeTicks(this.normalizeTimeTickInterval(b), f, c, a.startOfWeek)); else for (d = f + (d[0] - f) % b; d <= c; d += b)e.push(d);
                0 !== e.length && this.trimTicks(e, a.startOnTick, a.endOnTick);
                return e
            },
            adjustForMinRange: function () {
                var a = this.options, d = this.min, b = this.max, e, f = this.dataMax - this.dataMin >= this.minRange, p, g, x, D, t, v;
                this.isXAxis && void 0 === this.minRange && !this.isLog &&
                (q(a.min) || q(a.max) ? this.minRange = null : (c(this.series, function (a) {
                    D = a.xData;
                    for (g = t = a.xIncrement ? 1 : D.length - 1; 0 < g; g--)if (x = D[g] - D[g - 1], void 0 === p || x < p)p = x
                }), this.minRange = Math.min(5 * p, this.dataMax - this.dataMin)));
                b - d < this.minRange && (v = this.minRange, e = (v - b + d) / 2, e = [d - e, y(a.min, d - e)], f && (e[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), d = E(e), b = [d + v, y(a.max, d + v)], f && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = H(b), b - d < v && (e[0] = b - v, e[1] = y(a.min, b - v), d = E(e)));
                this.min = d;
                this.max =
                    b
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : c(this.series, function (d) {
                    var b = d.closestPointRange;
                    !d.noSharedTooltip && q(b) && (a = q(a) ? Math.min(a, b) : b)
                });
                return a
            },
            nameToX: function (a) {
                var d = K(this.categories), b = d ? this.categories : this.names, e = a.options.x, u;
                a.series.requireSorting = !1;
                q(e) || (e = !1 === this.options.uniqueNames ? a.series.autoIncrement() : p(a.name, b));
                -1 === e ? d || (u = b.length) : u = e;
                this.names[u] = a.name;
                return u
            },
            updateNames: function () {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, c(this.series || [], function (d) {
                    if (!d.points || d.isDirtyData)d.processData(), d.generatePoints();
                    c(d.points, function (b, e) {
                        var u;
                        b.options && void 0 === b.options.x && (u = a.nameToX(b), u !== b.x && (b.x = u, d.xData[e] = u))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var d = this, b = d.max - d.min, e = d.axisPointRange || 0, u, f = 0, p = 0, g = d.linkedParent, x = !!d.categories, D = d.transA, v = d.isXAxis;
                if (v || x || e)g ? (f = g.minPointOffset, p = g.pointRangePadding) : (u = d.getClosest(), c(d.series, function (a) {
                    var b = x ? 1 : v ? y(a.options.pointRange, u, 0) : d.axisPointRange ||
                    0;
                    a = a.options.pointPlacement;
                    e = Math.max(e, b);
                    d.single || (f = Math.max(f, F(a) ? 0 : b / 2), p = Math.max(p, "on" === a ? 0 : b))
                })), g = d.ordinalSlope && u ? d.ordinalSlope / u : 1, d.minPointOffset = f *= g, d.pointRangePadding = p *= g, d.pointRange = Math.min(e, b), v && (d.closestPointRange = u);
                a && (d.oldTransA = D);
                d.translationSlope = d.transA = D = d.len / (b + p || 1);
                d.transB = d.horiz ? d.left : d.bottom;
                d.minPixelPadding = D * f
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (a) {
                var b = this, u = b.chart, f = b.options, p = b.isLog, x = b.log2lin,
                    D = b.isDatetimeAxis, t = b.isXAxis, m = b.isLinked, G = f.maxPadding, h = f.minPadding, n = f.tickInterval, F = f.tickPixelInterval, k = b.categories, M = b.threshold, I = b.softThreshold, K, r, w, A;
                D || k || m || this.getTickAmount();
                w = y(b.userMin, f.min);
                A = y(b.userMax, f.max);
                m ? (b.linkedParent = u[b.coll][f.linkedTo], u = b.linkedParent.getExtremes(), b.min = y(u.min, u.dataMin), b.max = y(u.max, u.dataMax), f.type !== b.linkedParent.options.type && g(11, 1)) : (!I && q(M) && (b.dataMin >= M ? (K = M, h = 0) : b.dataMax <= M && (r = M, G = 0)), b.min = y(w, K, b.dataMin), b.max = y(A,
                    r, b.dataMax));
                p && (!a && 0 >= Math.min(b.min, y(b.dataMin, b.min)) && g(10, 1), b.min = l(x(b.min), 15), b.max = l(x(b.max), 15));
                b.range && q(b.max) && (b.userMin = b.min = w = Math.max(b.min, b.minFromRange()), b.userMax = A = b.max, b.range = null);
                z(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(k || b.axisPointRange || b.usePercentage || m) && q(b.min) && q(b.max) && (x = b.max - b.min) && (!q(w) && h && (b.min -= x * h), !q(A) && G && (b.max += x * G));
                d(f.floor) ? b.min = Math.max(b.min, f.floor) : d(f.softMin) && (b.min = Math.min(b.min, f.softMin));
                d(f.ceiling) ? b.max = Math.min(b.max, f.ceiling) : d(f.softMax) && (b.max = Math.max(b.max, f.softMax));
                I && q(b.dataMin) && (M = M || 0, !q(w) && b.min < M && b.dataMin >= M ? b.min = M : !q(A) && b.max > M && b.dataMax <= M && (b.max = M));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : m && !n && F === b.linkedParent.options.tickPixelInterval ? n = b.linkedParent.tickInterval : y(n, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, k ? 1 : (b.max - b.min) * F / Math.max(b.len, F));
                t && !a && c(b.series, function (a) {
                    a.processData(b.min !==
                        b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !n && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                a = y(f.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !n && b.tickInterval < a && (b.tickInterval = a);
                D || p || n || (b.tickInterval = v(b.tickInterval, null, e(b.tickInterval), y(f.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max &&
                9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a = this.options, b, d = a.tickPositions, e = a.tickPositioner, f = a.startOnTick, c = a.endOnTick, p;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.tickPositions = b = d && d.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
                    a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()]), this.tickPositions = b, e && (e = e.apply(this, [this.min, this.max]))) && (this.tickPositions = b = e);
                this.isLinked || (this.trimTicks(b, f, c), this.min === this.max && q(this.min) && !this.tickAmount && (p = !0, this.min -= .5, this.max += .5), this.single = p, d || e || this.adjustTickAmount())
            },
            trimTicks: function (a, b, d) {
                var e = a[0], f = a[a.length - 1], u = this.minPointOffset || 0;
                if (b)this.min = e; else for (; this.min - u > a[0];)a.shift();
                if (d)this.max = f; else for (; this.max + u < a[a.length - 1];)a.pop();
                0 === a.length && q(e) && a.push((f + e) / 2)
            },
            alignToOthers: function () {
                var a = {}, b, d = this.options;
                !1 !== this.chart.options.chart.alignTicks && !1 !== d.alignTicks && c(this.chart[this.coll], function (d) {
                    var e = d.options, e = [d.horiz ? e.left : e.top, e.width, e.height, e.pane].join();
                    d.series.length && (a[e] ? b = !0 : a[e] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a =
                    this.options, b = a.tickAmount, d = a.tickPixelInterval;
                !q(a.tickInterval) && this.len < d && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / d) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval, b = this.tickPositions, d = this.tickAmount, e = this.finalTickAmt, f = b && b.length;
                if (f < d) {
                    for (; b.length < d;)b.push(l(b[b.length - 1] + a));
                    this.transA *= (f - 1) / (d - 1);
                    this.max = b[b.length - 1]
                } else f > d && (this.tickInterval *=
                    2, this.setTickPositions());
                if (q(e)) {
                    for (a = d = b.length; a--;)(3 === e && 1 === a % 2 || 2 >= e && 0 < a && a < d - 1) && b.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                c(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty)a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks &&
                this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function (a, b, d, e, f) {
                var u = this, p = u.chart;
                d = y(d, !0);
                c(u.series, function (a) {
                    delete a.kdTree
                });
                f = m(f, {min: a, max: b});
                z(u, "setExtremes", f, function () {
                    u.userMin = a;
                    u.userMax = b;
                    u.eventArgs = f;
                    d && p.redraw(e)
                })
            },
            zoom: function (a, b) {
                var d = this.dataMin,
                    e = this.dataMax, f = this.options, u = Math.min(d, y(f.min, d)), f = Math.max(e, y(f.max, e));
                if (a !== this.min || b !== this.max)this.allowZoomOutside || (q(d) && a <= u && (a = u), q(e) && b >= f && (b = f)), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var a = this.chart, b = this.options, d = b.offsetLeft || 0, e = this.horiz, f = y(b.width, a.plotWidth - d + (b.offsetRight || 0)), c = y(b.height, a.plotHeight), p = y(b.top, a.plotTop), b = y(b.left, a.plotLeft + d), d = /%$/;
                d.test(c) && (c = Math.round(parseFloat(c) /
                    100 * a.plotHeight));
                d.test(p) && (p = Math.round(parseFloat(p) / 100 * a.plotHeight + a.plotTop));
                this.left = b;
                this.top = p;
                this.width = f;
                this.height = c;
                this.bottom = a.chartHeight - c - p;
                this.right = a.chartWidth - f - b;
                this.len = Math.max(e ? f : c, 0);
                this.pos = e ? b : p
            },
            getExtremes: function () {
                var a = this.isLog, b = this.lin2log;
                return {
                    min: a ? l(b(this.min)) : this.min,
                    max: a ? l(b(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, d = this.lin2log,
                    e = b ? d(this.min) : this.min, b = b ? d(this.max) : this.max;
                null === a ? a = e : e > a ? a = e : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (y(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, d = b[a + "Length"], e = y(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (e && d)return "inside" === b[a + "Position"] && (d = -d), [d, e]
            },
            labelMetrics: function () {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize,
                    this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, d = this.tickInterval, e = d, f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / d), p, g = a.rotation, x = this.labelMetrics(), D, v = Number.MAX_VALUE, t, m = function (a) {
                    a /= f || 1;
                    a = 1 < a ? Math.ceil(a) : 1;
                    return a * d
                };
                b ? (t = !a.staggerLines && !a.step && (q(g) ? [g] : f < y(a.autoRotationLimit, 80) && a.autoRotation)) && c(t, function (a) {
                    var b;
                    if (a === g || a && -90 <= a && 90 >= a)D = m(Math.abs(x.h / Math.sin(h * a))), b = D + Math.abs(a / 360), b < v && (v = b, p = a, e = D)
                }) :
                a.step || (e = m(x.h));
                this.autoRotation = t;
                this.labelRotation = y(p, g);
                return e
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz, d = this.options.labels, e = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), f = a.margin[3];
                return b && 2 > (d.step || 0) && !d.rotation && (this.staggerLines || 1) * a.plotWidth / e || !b && (f && f - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, d = this.tickPositions, e = this.ticks, f = this.options.labels, p = this.horiz, g = this.getSlotWidth(), x = Math.max(1,
                    Math.round(g - 2 * (f.padding || 5))), D = {}, v = this.labelMetrics(), m = f.style && f.style.textOverflow, y, G = 0, h, n;
                F(f.rotation) || (D.rotation = f.rotation || 0);
                c(d, function (a) {
                    (a = e[a]) && a.labelLength > G && (G = a.labelLength)
                });
                this.maxLabelLength = G;
                if (this.autoRotation)G > x && G > v.h ? D.rotation = this.labelRotation : this.labelRotation = 0; else if (g && (y = {width: x + "px"}, !m))for (y.textOverflow = "clip", h = d.length; !p && h--;)if (n = d[h], x = e[n].label)x.styles && "ellipsis" === x.styles.textOverflow ? x.css({textOverflow: "clip"}) : e[n].labelLength >
                g && x.css({width: g + "px"}), x.getBBox().height > this.len / d.length - (v.h - v.f) && (x.specCss = {textOverflow: "ellipsis"});
                D.rotation && (y = {width: (G > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"}, m || (y.textOverflow = "ellipsis"));
                if (this.labelAlign = f.align || this.autoLabelAlign(this.labelRotation))D.align = this.labelAlign;
                c(d, function (a) {
                    var b = (a = e[a]) && a.label;
                    b && (b.attr(D), y && b.css(t(y, b.specCss)), delete b.specCss, a.rotation = D.rotation)
                });
                this.tickRotCorr = b.rotCorr(v.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || q(this.min) && q(this.max) && !!this.tickPositions
            },
            getOffset: function () {
                var a = this, b = a.chart, d = b.renderer, e = a.options, f = a.tickPositions, p = a.ticks, g = a.horiz, x = a.side, D = b.inverted ? [1, 0, 3, 2][x] : x, v, t, m = 0, G, h = 0, n = e.title, z = e.labels, F = 0, l = a.opposite, k = b.axisOffset, b = b.clipOffset, I = [-1, 1, 1, -1][x], K, r = e.className, w = a.axisParent, A = this.tickSize("tick");
                v = a.hasData();
                a.showAxis = t = v || y(e.showEmpty, !0);
                a.staggerLines = a.horiz && z.staggerLines;
                a.axisGroup || (a.gridGroup =
                    d.g("grid").attr({zIndex: e.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (r || "")).add(w), a.axisGroup = d.g("axis").attr({zIndex: e.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (r || "")).add(w), a.labelGroup = d.g("axis-labels").attr({zIndex: z.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (r || "")).add(w));
                if (v || a.isLinked)c(f, function (b) {
                    p[b] ? p[b].addLabel() : p[b] = new M(a, b)
                }), a.renderUnsquish(), !1 === z.reserveSpace || 0 !== x && 2 !== x && {1: "left", 3: "right"}[x] !==
                a.labelAlign && "center" !== a.labelAlign || c(f, function (a) {
                    F = Math.max(p[a].getLabelSize(), F)
                }), a.staggerLines && (F *= a.staggerLines, a.labelOffset = F * (a.opposite ? -1 : 1)); else for (K in p)p[K].destroy(), delete p[K];
                n && n.text && !1 !== n.enabled && (a.axisTitle || ((K = n.textAlign) || (K = (g ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: l ? "right" : "left",
                    middle: "center",
                    high: l ? "left" : "right"
                })[n.align]), a.axisTitle = d.text(n.text, 0, 0, n.useHTML).attr({
                    zIndex: 7,
                    rotation: n.rotation || 0,
                    align: K
                }).addClass("highcharts-axis-title").css(n.style).add(a.axisGroup),
                    a.axisTitle.isNew = !0), t && (m = a.axisTitle.getBBox()[g ? "height" : "width"], G = n.offset, h = q(G) ? 0 : y(n.margin, g ? 5 : 10)), a.axisTitle[t ? "show" : "hide"](!0));
                a.renderLine();
                a.offset = I * y(e.offset, k[x]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                d = 0 === x ? -a.labelMetrics().h : 2 === x ? a.tickRotCorr.y : 0;
                h = Math.abs(F) + h;
                F && (h = h - d + I * (g ? y(z.y, a.tickRotCorr.y + 8 * I) : z.x));
                a.axisTitleMargin = y(G, h);
                k[x] = Math.max(k[x], a.axisTitleMargin + m + I * a.offset, h, v && f.length && A ? A[0] : 0);
                e = e.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[D] =
                    Math.max(b[D], e)
            },
            getLinePath: function (a) {
                var b = this.chart, d = this.opposite, e = this.offset, f = this.horiz, c = this.left + (d ? this.width : 0) + e, e = b.chartHeight - this.bottom - (d ? this.height : 0) + e;
                d && (a *= -1);
                return b.renderer.crispLine(["M", f ? this.left : c, f ? e : this.top, "L", f ? b.chartWidth - this.right : c, f ? e : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth, zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, d = this.top, e = this.len, f = this.options.title, c = a ? b : d, p = this.opposite, g = this.offset, x = f.x || 0, D = f.y || 0, v = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, this.axisTitle).f, e = {
                    low: c + (a ? 0 : e),
                    middle: c + e / 2,
                    high: c + (a ? e : 0)
                }[f.align], b = (a ? d + this.height : b) + (a ? 1 : -1) * (p ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? v : 0);
                return {
                    x: a ? e + x : b + (p ? this.width : 0) + g + x,
                    y: a ? b + D - (p ? this.height : 0) + g : e + D
                }
            },
            render: function () {
                var a =
                    this, b = a.chart, e = b.renderer, f = a.options, p = a.isLog, g = a.lin2log, x = a.isLinked, v = a.tickPositions, t = a.axisTitle, m = a.ticks, y = a.minorTicks, G = a.alternateBands, h = f.stackLabels, n = f.alternateGridColor, z = a.tickmarkOffset, F = a.axisLine, l = b.hasRendered && d(a.oldMin), k = a.showAxis, K = A(e.globalAnimation), r, q;
                a.labelEdge.length = 0;
                a.overlap = !1;
                c([m, y, G], function (a) {
                    for (var b in a)a[b].isActive = !1
                });
                if (a.hasData() || x)a.minorTickInterval && !a.categories && c(a.getMinorTickPositions(), function (b) {
                    y[b] || (y[b] = new M(a, b, "minor"));
                    l && y[b].isNew && y[b].render(null, !0);
                    y[b].render(null, !1, 1)
                }), v.length && (c(v, function (b, d) {
                    if (!x || b >= a.min && b <= a.max)m[b] || (m[b] = new M(a, b)), l && m[b].isNew && m[b].render(d, !0, .1), m[b].render(d)
                }), z && (0 === a.min || a.single) && (m[-1] || (m[-1] = new M(a, -1, null, !0)), m[-1].render(-1))), n && c(v, function (d, e) {
                    q = void 0 !== v[e + 1] ? v[e + 1] + z : a.max - z;
                    0 === e % 2 && d < a.max && q <= a.max + (b.polar ? -z : z) && (G[d] || (G[d] = new I(a)), r = d + z, G[d].options = {
                        from: p ? g(r) : r,
                        to: p ? g(q) : q,
                        color: n
                    }, G[d].render(), G[d].isActive = !0)
                }), a._addedPlotLB ||
                (c((f.plotLines || []).concat(f.plotBands || []), function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0);
                c([m, y, G], function (a) {
                    var d, e, f = [], c = K.duration;
                    for (d in a)a[d].isActive || (a[d].render(d, !1, 0), a[d].isActive = !1, f.push(d));
                    D(function () {
                        for (e = f.length; e--;)a[f[e]] && !a[f[e]].isActive && (a[f[e]].destroy(), delete a[f[e]])
                    }, a !== G && b.hasRendered && c ? c : 0)
                });
                F && (F[F.isPlaced ? "animate" : "attr"]({d: this.getLinePath(F.strokeWidth())}), F.isPlaced = !0, F[k ? "show" : "hide"](!0));
                t && k && (t[t.isNew ? "attr" : "animate"](a.getTitlePosition()),
                    t.isNew = !1);
                h && h.enabled && a.renderStackTotals();
                a.isDirty = !1
            },
            redraw: function () {
                this.visible && (this.render(), c(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                c(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            destroy: function (a) {
                var b = this, d = b.stacks, e, f = b.plotLinesAndBands, g;
                a || G(b);
                for (e in d)n(d[e]), d[e] = null;
                c([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                    n(a)
                });
                if (f)for (a = f.length; a--;)f[a].destroy();
                c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function (a) {
                    b[a] &&
                    (b[a] = b[a].destroy())
                });
                f = "extKey hcEvents names series userMax userMin".split(" ");
                for (g in b)b.hasOwnProperty(g) && -1 === p(g, f) && delete b[g]
            },
            drawCrosshair: function (a, b) {
                var d, e = this.crosshair, f = y(e.snap, !0), c, p = this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (q(b) || !f) ? (f ? q(b) && (c = this.isXAxis ? b.plotX : this.len - b.plotY) : c = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), q(c) && (d = this.getPlotLinePath(b && (this.isXAxis ? b.x : y(b.stackY, b.y)), null, null, null, c) || null), q(d) ? (b =
                    this.categories && !this.isRadial, p || (this.cross = p = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (b ? "category " : "thin ") + e.className).attr({zIndex: y(e.zIndex, 2)}).add(), p.attr({
                    stroke: e.color || (b ? k("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": y(e.width, 1)
                }), e.dashStyle && p.attr({dashstyle: e.dashStyle})), p.show().attr({d: d}), b && !e.width && p.attr({"stroke-width": this.transA}), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function () {
                this.cross &&
                this.cross.hide()
            }
        };
        m(a.Axis.prototype, w)
    })(N);
    (function (a) {
        var C = a.Axis, A = a.Date, E = a.dateFormat, H = a.defaultOptions, w = a.defined, k = a.each, l = a.extend, r = a.getMagnitude, q = a.getTZOffset, h = a.normalizeTickInterval, n = a.pick, c = a.timeUnits;
        C.prototype.getTimeTicks = function (a, m, h, f) {
            var e = [], b = {}, p = H.global.useUTC, g, d = new A(m - q(m)), z, t = A.hcMakeTime, v = a.unitRange, y = a.count, I;
            if (w(m)) {
                d[A.hcSetMilliseconds](v >= c.second ? 0 : y * Math.floor(d.getMilliseconds() / y));
                if (v >= c.second)d[A.hcSetSeconds](v >= c.minute ? 0 : y * Math.floor(d.getSeconds() /
                    y));
                if (v >= c.minute)d[A.hcSetMinutes](v >= c.hour ? 0 : y * Math.floor(d[A.hcGetMinutes]() / y));
                v >= c.hour && (d[A.hcSetHours](v >= c.day ? 0 : y * Math.floor(d[A.hcGetHours]() / y)), z = d[A.hcGetHours]());
                if (v >= c.day)d[A.hcSetDate](v >= c.month ? 1 : y * Math.floor(d[A.hcGetDate]() / y));
                v >= c.month && (d[A.hcSetMonth](v >= c.year ? 0 : y * Math.floor(d[A.hcGetMonth]() / y)), g = d[A.hcGetFullYear]());
                if (v >= c.year)d[A.hcSetFullYear](g - g % y);
                if (v === c.week)d[A.hcSetDate](d[A.hcGetDate]() - d[A.hcGetDay]() + n(f, 1));
                f = 1;
                if (A.hcTimezoneOffset || A.hcGetTimezoneOffset)I =
                    (!p || !!A.hcGetTimezoneOffset) && (h - m > 4 * c.month || q(m) !== q(h)), d = d.getTime(), d = new A(d + q(d));
                g = d[A.hcGetFullYear]();
                m = d.getTime();
                p = d[A.hcGetMonth]();
                for (d = d[A.hcGetDate](); m < h;)e.push(m), m = v === c.year ? t(g + f * y, 0) : v === c.month ? t(g, p + f * y) : !I || v !== c.day && v !== c.week ? I && v === c.hour ? t(g, p, d, z + f * y) : m + v * y : t(g, p, d + f * y * (v === c.day ? 1 : 7)), f++;
                e.push(m);
                v <= c.hour && k(e, function (a) {
                    "000000000" === E("%H%M%S%L", a) && (b[a] = "day")
                })
            }
            e.info = l(a, {higherRanks: b, totalRange: v * y});
            return e
        };
        C.prototype.normalizeTimeTickInterval = function (a,
                                                          m) {
            var g = m || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            m = g[g.length - 1];
            var f = c[m[0]], e = m[1], b;
            for (b = 0; b < g.length && !(m = g[b], f = c[m[0]], e = m[1], g[b + 1] && a <= (f * e[e.length - 1] + c[g[b + 1][0]]) / 2); b++);
            f === c.year && a < 5 * f && (e = [1, 2, 5]);
            a = h(a / f, e, "year" === m[0] ? Math.max(r(a / f), 1) : 1);
            return {unitRange: f, count: a, unitName: m[0]}
        }
    })(N);
    (function (a) {
        var C = a.Axis, A = a.getMagnitude,
            E = a.map, H = a.normalizeTickInterval, w = a.pick;
        C.prototype.getLogTickPositions = function (a, l, r, q) {
            var h = this.options, n = this.len, c = this.lin2log, g = this.log2lin, m = [];
            q || (this._minorAutoInterval = null);
            if (.5 <= a)a = Math.round(a), m = this.getLinearTickPositions(a, l, r); else if (.08 <= a)for (var n = Math.floor(l), z, f, e, b, p, h = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; n < r + 1 && !p; n++)for (f = h.length, z = 0; z < f && !p; z++)e = g(c(n) * h[z]), e > l && (!q || b <= r) && void 0 !== b && m.push(b), b > r && (p = !0), b = e; else l = c(l), r = c(r), a = h[q ? "minorTickInterval" :
                "tickInterval"], a = w("auto" === a ? null : a, this._minorAutoInterval, h.tickPixelInterval / (q ? 5 : 1) * (r - l) / ((q ? n / this.tickPositions.length : n) || 1)), a = H(a, null, A(a)), m = E(this.getLinearTickPositions(a, l, r), g), q || (this._minorAutoInterval = a / 5);
            q || (this.tickInterval = a);
            return m
        };
        C.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(N);
    (function (a) {
        var C = a.dateFormat, A = a.each, E = a.extend, H = a.format, w = a.isNumber, k = a.map, l = a.merge, r = a.pick, q = a.splat, h = a.stop,
            n = a.syncTimeout, c = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, c) {
                this.chart = a;
                this.options = c;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = c.split && !a.inverted;
                this.shared = c.shared || this.split
            }, cleanSplit: function (a) {
                A(this.chart.series, function (c) {
                    var g = c && c.tt;
                    g && (!g.isActive || a ? c.tt = g.destroy() : g.isActive = !1)
                })
            }, getLabel: function () {
                var a = this.chart.renderer, c = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") :
                    (this.label = a.label("", 0, 0, c.shape || "callout", null, null, c.useHTML, null, "tooltip").attr({
                        padding: c.padding,
                        r: c.borderRadius
                    }), this.label.attr({
                        fill: c.backgroundColor,
                        "stroke-width": c.borderWidth
                    }).css(c.style).shadow(c.shadow)), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                this.init(this.chart, l(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            }, move: function (a, c, h, f) {
                var e = this, b = e.now, p = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - b.x) || 1 < Math.abs(c - b.y)), g = e.followPointer || 1 < e.len;
                E(b, {
                    x: p ? (2 * b.x + a) / 3 : a,
                    y: p ? (b.y + c) / 2 : c,
                    anchorX: g ? void 0 : p ? (2 * b.anchorX + h) / 3 : h,
                    anchorY: g ? void 0 : p ? (b.anchorY + f) / 2 : f
                });
                e.getLabel().attr(b);
                p && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    e && e.move(a, c, h, f)
                }, 32))
            }, hide: function (a) {
                var c = this;
                clearTimeout(this.hideTimer);
                a = r(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = n(function () {
                    c.getLabel()[a ? "fadeOut" : "hide"]();
                    c.isHidden = !0
                }, a))
            }, getAnchor: function (a, c) {
                var g, f = this.chart, e = f.inverted, b = f.plotTop, p = f.plotLeft, m = 0, d = 0, h, t;
                a = q(a);
                g = a[0].tooltipPos;
                this.followPointer && c && (void 0 === c.chartX && (c = f.pointer.normalize(c)), g = [c.chartX - f.plotLeft, c.chartY - b]);
                g || (A(a, function (a) {
                    h = a.series.yAxis;
                    t = a.series.xAxis;
                    m += a.plotX + (!e && t ? t.left - p : 0);
                    d += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && h ? h.top -
                        b : 0)
                }), m /= a.length, d /= a.length, g = [e ? f.plotWidth - d : m, this.shared && !e && 1 < a.length && c ? c.chartY - b : e ? f.plotHeight - m : d]);
                return k(g, Math.round)
            }, getPosition: function (a, c, h) {
                var f = this.chart, e = this.distance, b = {}, p = h.h || 0, g, d = ["y", f.chartHeight, c, h.plotY + f.plotTop, f.plotTop, f.plotTop + f.plotHeight], m = ["x", f.chartWidth, a, h.plotX + f.plotLeft, f.plotLeft, f.plotLeft + f.plotWidth], t = !this.followPointer && r(h.ttBelow, !f.inverted === !!h.negative), v = function (a, d, f, c, g, v) {
                    var x = f < c - e, u = c + e + f < d, D = c - e - f;
                    c += e;
                    if (t && u)b[a] =
                        c; else if (!t && x)b[a] = D; else if (x)b[a] = Math.min(v - f, 0 > D - p ? D : D - p); else if (u)b[a] = Math.max(g, c + p + f > d ? c : c + p); else return !1
                }, y = function (a, d, f, c) {
                    var p;
                    c < e || c > d - e ? p = !1 : b[a] = c < f / 2 ? 1 : c > d - f / 2 ? d - f - 2 : c - f / 2;
                    return p
                }, n = function (a) {
                    var b = d;
                    d = m;
                    m = b;
                    g = a
                }, G = function () {
                    !1 !== v.apply(0, d) ? !1 !== y.apply(0, m) || g || (n(!0), G()) : g ? b.x = b.y = 0 : (n(!0), G())
                };
                (f.inverted || 1 < this.len) && n();
                G();
                return b
            }, defaultFormatter: function (a) {
                var c = this.points || q(this), g;
                g = [a.tooltipFooterHeaderFormatter(c[0])];
                g = g.concat(a.bodyFormatter(c));
                g.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return g
            }, refresh: function (a, c) {
                var g = this.chart, f = this.getLabel(), e = this.options, b, p, m = {}, d, n = [];
                d = e.formatter || this.defaultFormatter;
                var m = g.hoverPoints, t = this.shared;
                clearTimeout(this.hideTimer);
                this.followPointer = q(a)[0].series.tooltipOptions.followPointer;
                p = this.getAnchor(a, c);
                c = p[0];
                b = p[1];
                !t || a.series && a.series.noSharedTooltip ? m = a.getLabelConfig() : (g.hoverPoints = a, m && A(m, function (a) {
                    a.setState()
                }), A(a, function (a) {
                    a.setState("hover");
                    n.push(a.getLabelConfig())
                }),
                    m = {x: a[0].category, y: a[0].y}, m.points = n, this.len = n.length, a = a[0]);
                d = d.call(m, this);
                m = a.series;
                this.distance = r(m.tooltipOptions.distance, 16);
                !1 === d ? this.hide() : (this.isHidden && (h(f), f.attr({opacity: 1}).show()), this.split ? this.renderSplit(d, g.hoverPoints) : (f.attr({text: d.join ? d.join("") : d}), f.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + r(a.colorIndex, m.colorIndex)), f.attr({stroke: e.borderColor || a.color || m.color || "#666666"}), this.updatePosition({
                    plotX: c, plotY: b, negative: a.negative,
                    ttBelow: a.ttBelow, h: p[2] || 0
                })), this.isHidden = !1)
            }, renderSplit: function (c, m) {
                var g = this, f = [], e = this.chart, b = e.renderer, p = !0, h = this.options, d, n = this.getLabel();
                A(c.slice(0, c.length - 1), function (a, c) {
                    c = m[c - 1] || {isHeader: !0, plotX: m[0].plotX};
                    var t = c.series || g, v = t.tt, G = c.series || {}, x = "highcharts-color-" + r(c.colorIndex, G.colorIndex, "none");
                    v || (t.tt = v = b.label(null, null, null, c.isHeader && "callout").addClass("highcharts-tooltip-box " + x).attr({
                        padding: h.padding, r: h.borderRadius, fill: h.backgroundColor, stroke: c.color ||
                        G.color || "#333333", "stroke-width": h.borderWidth
                    }).add(n), c.series && (v.connector = b.path().addClass("highcharts-tooltip-connector " + x).attr({
                        "stroke-width": G.options.lineWidth || 2,
                        stroke: c.color || G.color || "#666666"
                    }).add(v)));
                    v.isActive = !0;
                    v.attr({text: a});
                    a = v.getBBox();
                    G = a.width + v.strokeWidth();
                    c.isHeader ? (d = a.height, G = Math.max(0, Math.min(c.plotX + e.plotLeft - G / 2, e.chartWidth - G))) : G = c.plotX + e.plotLeft - r(h.distance, 16) - G;
                    0 > G && (p = !1);
                    a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                    a -= e.plotTop;
                    f.push({
                        target: c.isHeader ? e.plotHeight + d : a,
                        rank: c.isHeader ? 1 : 0,
                        size: t.tt.getBBox().height + 1,
                        point: c,
                        x: G,
                        tt: v
                    })
                });
                this.cleanSplit();
                a.distribute(f, e.plotHeight + d);
                A(f, function (a) {
                    var b = a.point, d = a.tt, f;
                    f = {
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: p || b.isHeader ? a.x : b.plotX + e.plotLeft + r(h.distance, 16),
                        y: a.pos + e.plotTop
                    };
                    b.isHeader && (f.anchorX = b.plotX + e.plotLeft, f.anchorY = f.y - 100);
                    d.attr(f);
                    b.isHeader || d.connector.attr({
                        d: ["M", b.plotX + e.plotLeft - f.x, b.plotY + b.series.yAxis.pos - f.y, "L", (p ? -1 : 1) * r(h.distance,
                            16) + b.plotX + e.plotLeft - f.x, a.pos + e.plotTop + d.getBBox().height / 2 - f.y]
                    })
                })
            }, updatePosition: function (a) {
                var c = this.chart, g = this.getLabel(), g = (this.options.positioner || this.getPosition).call(this, g.width, g.height, a);
                this.move(Math.round(g.x), Math.round(g.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            }, getXDateFormat: function (a, m, h) {
                var f;
                m = m.dateTimeLabelFormats;
                var e = h && h.closestPointRange, b, p = {
                    millisecond: 15,
                    second: 12,
                    minute: 9,
                    hour: 6,
                    day: 3
                }, g, d = "millisecond";
                if (e) {
                    g = C("%m-%d %H:%M:%S.%L", a.x);
                    for (b in c) {
                        if (e ===
                            c.week && +C("%w", a.x) === h.options.startOfWeek && "00:00:00.000" === g.substr(6)) {
                            b = "week";
                            break
                        }
                        if (c[b] > e) {
                            b = d;
                            break
                        }
                        if (p[b] && g.substr(p[b]) !== "01-01 00:00:00.000".substr(p[b]))break;
                        "week" !== b && (d = b)
                    }
                    b && (f = m[b])
                } else f = m.day;
                return f || m.year
            }, tooltipFooterHeaderFormatter: function (a, c) {
                var g = c ? "footer" : "header";
                c = a.series;
                var f = c.tooltipOptions, e = f.xDateFormat, b = c.xAxis, p = b && "datetime" === b.options.type && w(a.key), g = f[g + "Format"];
                p && !e && (e = this.getXDateFormat(a, f, b));
                p && e && (g = g.replace("{point.key}", "{point.key:" +
                    e + "}"));
                return H(g, {point: a, series: c})
            }, bodyFormatter: function (a) {
                return k(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c.pointFormatter || a.point.tooltipFormatter).call(a.point, c.pointFormat)
                })
            }
        }
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.attr, E = a.charts, H = a.color, w = a.css, k = a.defined, l = a.doc, r = a.each, q = a.extend, h = a.fireEvent, n = a.offset, c = a.pick, g = a.removeEvent, m = a.splat, z = a.Tooltip, f = a.win;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, b) {
                this.options = b;
                this.chart =
                    a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                z && b.tooltip.enabled && (a.tooltip = new z(a, b.tooltip), this.followTouchMove = c(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function () {
                var a = this.chart, b = a.options.chart.zoomType, f = /x/.test(b), b = /y/.test(b), a = a.inverted;
                this.zoomX = f;
                this.zoomY = b;
                this.zoomHor = f && !a || b && a;
                this.zoomVert = b && !a || f && a;
                this.hasZoom = f || b
            }, normalize: function (a, b) {
                var e, c;
                a = a || f.event;
                a.target || (a.target = a.srcElement);
                c = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = n(this.chart.container));
                void 0 === c.pageX ? (e = Math.max(a.x, a.clientX - b.left), b = a.y) : (e = c.pageX - b.left, b = c.pageY - b.top);
                return q(a, {chartX: Math.round(e), chartY: Math.round(b)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                r(this.chart.axes, function (e) {
                    b[e.isXAxis ? "xAxis" : "yAxis"].push({axis: e, value: e.toValue(a[e.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, runPointActions: function (e) {
                var b = this.chart, f =
                    b.series, g = b.tooltip, d = g ? g.shared : !1, h = !0, t = b.hoverPoint, v = b.hoverSeries, y, m, G, x = [], D;
                if (!d && !v)for (y = 0; y < f.length; y++)if (f[y].directTouch || !f[y].options.stickyTracking)f = [];
                v && (d ? v.noSharedTooltip : v.directTouch) && t ? x = [t] : (d || !v || v.options.stickyTracking || (f = [v]), r(f, function (a) {
                    m = a.noSharedTooltip && d;
                    G = !d && a.directTouch;
                    a.visible && !m && !G && c(a.options.enableMouseTracking, !0) && (D = a.searchPoint(e, !m && 1 === a.kdDimensions)) && D.series && x.push(D)
                }), x.sort(function (a, b) {
                    var e = a.distX - b.distX, f = a.dist - b.dist;
                    return 0 !== e && d ? e : 0 !== f ? f : a.series.group.zIndex > b.series.group.zIndex ? -1 : 1
                }));
                if (d)for (y = x.length; y--;)(x[y].x !== x[0].x || x[y].series.noSharedTooltip) && x.splice(y, 1);
                if (x[0] && (x[0] !== this.prevKDPoint || g && g.isHidden)) {
                    if (d && !x[0].series.noSharedTooltip) {
                        for (y = 0; y < x.length; y++)x[y].onMouseOver(e, x[y] !== (v && v.directTouch && t || x[0]));
                        x.length && g && g.refresh(x.sort(function (a, b) {
                            return a.series.index - b.series.index
                        }), e)
                    } else if (g && g.refresh(x[0], e), !v || !v.directTouch)x[0].onMouseOver(e);
                    this.prevKDPoint =
                        x[0];
                    h = !1
                }
                h && (f = v && v.tooltipOptions.followPointer, g && f && !g.isHidden && (f = g.getAnchor([{}], e), g.updatePosition({
                    plotX: f[0],
                    plotY: f[1]
                })));
                this._onDocumentMouseMove || (this._onDocumentMouseMove = function (b) {
                    if (E[a.hoverChartIndex])E[a.hoverChartIndex].pointer.onDocumentMouseMove(b)
                }, C(l, "mousemove", this._onDocumentMouseMove));
                r(d ? x : [c(t, x[0])], function (a) {
                    r(b.axes, function (b) {
                        (!a || a.series && a.series[b.coll] === b) && b.drawCrosshair(e, a)
                    })
                })
            }, reset: function (a, b) {
                var e = this.chart, f = e.hoverSeries, d = e.hoverPoint,
                    c = e.hoverPoints, t = e.tooltip, v = t && t.shared ? c : d;
                a && v && r(m(v), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a)t && v && (t.refresh(v), d && (d.setState(d.state, !0), r(e.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, d)
                }))); else {
                    if (d)d.onMouseOut();
                    c && r(c, function (a) {
                        a.setState()
                    });
                    if (f)f.onMouseOut();
                    t && t.hide(b);
                    this._onDocumentMouseMove && (g(l, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null);
                    r(e.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = this.prevKDPoint = e.hoverPoints =
                        e.hoverPoint = null
                }
            }, scaleGroups: function (a, b) {
                var e = this.chart, f;
                r(e.series, function (d) {
                    f = a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(f), d.markerGroup && (d.markerGroup.attr(f), d.markerGroup.clip(b ? e.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(f))
                });
                e.clipRect.attr(b || e.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart,
                    e = b.options.chart, f = a.chartX, d = a.chartY, c = this.zoomHor, g = this.zoomVert, v = b.plotLeft, m = b.plotTop, h = b.plotWidth, G = b.plotHeight, x, D = this.selectionMarker, n = this.mouseDownX, u = this.mouseDownY, l = e.panKey && a[e.panKey + "Key"];
                D && D.touch || (f < v ? f = v : f > v + h && (f = v + h), d < m ? d = m : d > m + G && (d = m + G), this.hasDragged = Math.sqrt(Math.pow(n - f, 2) + Math.pow(u - d, 2)), 10 < this.hasDragged && (x = b.isInsidePlot(n - v, u - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) && x && !l && !D && (this.selectionMarker = D = b.renderer.rect(v, m, c ? 1 : h, g ? 1 : G, 0).attr({
                    fill: e.selectionMarkerFill ||
                    H("#335cad").setOpacity(.25).get(), "class": "highcharts-selection-marker", zIndex: 7
                }).add()), D && c && (f -= n, D.attr({
                    width: Math.abs(f),
                    x: (0 < f ? 0 : f) + n
                })), D && g && (f = d - u, D.attr({
                    height: Math.abs(f),
                    y: (0 < f ? 0 : f) + u
                })), x && !D && e.panning && b.pan(a, e.panning)))
            }, drop: function (a) {
                var b = this, e = this.chart, f = this.hasPinched;
                if (this.selectionMarker) {
                    var d = {
                        originalEvent: a,
                        xAxis: [],
                        yAxis: []
                    }, c = this.selectionMarker, g = c.attr ? c.attr("x") : c.x, v = c.attr ? c.attr("y") : c.y, m = c.attr ? c.attr("width") : c.width, n = c.attr ? c.attr("height") :
                        c.height, G;
                    if (this.hasDragged || f)r(e.axes, function (e) {
                        if (e.zoomEnabled && k(e.min) && (f || b[{xAxis: "zoomX", yAxis: "zoomY"}[e.coll]])) {
                            var c = e.horiz, p = "touchend" === a.type ? e.minPixelPadding : 0, x = e.toValue((c ? g : v) + p), c = e.toValue((c ? g + m : v + n) - p);
                            d[e.coll].push({axis: e, min: Math.min(x, c), max: Math.max(x, c)});
                            G = !0
                        }
                    }), G && h(e, "selection", d, function (a) {
                        e.zoom(q(a, f ? {animation: !1} : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    f && this.scaleGroups()
                }
                e && (w(e.container, {cursor: e._cursor}), e.cancelClick = 10 <
                    this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                this.zoomOption();
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            }, onDocumentMouseUp: function (e) {
                E[a.hoverChartIndex] && E[a.hoverChartIndex].pointer.drop(e)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, e = this.chartPosition;
                a = this.normalize(a, e);
                !e || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function (e) {
                var b = E[a.hoverChartIndex];
                b && (e.relatedTarget || e.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            }, onContainerMouseMove: function (e) {
                var b = this.chart;
                k(a.hoverChartIndex) && E[a.hoverChartIndex] && E[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                e = this.normalize(e);
                e.returnValue = !1;
                "mousedown" === b.mouseIsDown && this.drag(e);
                !this.inClass(e.target, "highcharts-tracker") && !b.isInsidePlot(e.chartX - b.plotLeft, e.chartY - b.plotTop) || b.openMenu || this.runPointActions(e)
            },
            inClass: function (a, b) {
                for (var e; a;) {
                    if (e = A(a, "class")) {
                        if (-1 !== e.indexOf(b))return !0;
                        if (-1 !== e.indexOf("highcharts-container"))return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a || b.options.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker")))b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart, e = b.hoverPoint, f = b.plotLeft, d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (h(e.series, "click", q(a, {point: e})), b.hoverPoint && e.firePointEvent("click", a)) : (q(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - f, a.chartY - d) && h(b, "click", a)))
            }, setDOMEvents: function () {
                var e = this, b = e.chart.container;
                b.onmousedown = function (a) {
                    e.onContainerMouseDown(a)
                };
                b.onmousemove = function (a) {
                    e.onContainerMouseMove(a)
                };
                b.onclick = function (a) {
                    e.onContainerClick(a)
                };
                C(b, "mouseleave", e.onContainerMouseLeave);
                1 === a.chartCount &&
                C(l, "mouseup", e.onDocumentMouseUp);
                a.hasTouch && (b.ontouchstart = function (a) {
                    e.onContainerTouchStart(a)
                }, b.ontouchmove = function (a) {
                    e.onContainerTouchMove(a)
                }, 1 === a.chartCount && C(l, "touchend", e.onDocumentTouchEnd))
            }, destroy: function () {
                var e;
                g(this.chart.container, "mouseleave", this.onContainerMouseLeave);
                a.chartCount || (g(l, "mouseup", this.onDocumentMouseUp), g(l, "touchend", this.onDocumentTouchEnd));
                clearInterval(this.tooltipTimeout);
                for (e in this)this[e] = null
            }
        }
    })(N);
    (function (a) {
        var C = a.charts, A = a.each,
            E = a.extend, H = a.map, w = a.noop, k = a.pick;
        E(a.Pointer.prototype, {
            pinchTranslate: function (a, k, q, h, n, c) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, a, k, q, h, n, c);
                (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, a, k, q, h, n, c)
            }, pinchTranslateDirection: function (a, k, q, h, n, c, g, m) {
                var l = this.chart, f = a ? "x" : "y", e = a ? "X" : "Y", b = "chart" + e, p = a ? "width" : "height", r = l["plot" + (a ? "Left" : "Top")], d, F, t = m || 1, v = l.inverted, y = l.bounds[a ? "h" : "v"], I = 1 === k.length, G = k[0][b], x = q[0][b], D = !I && k[1][b], M =
                    !I && q[1][b], u;
                q = function () {
                    !I && 20 < Math.abs(G - D) && (t = m || Math.abs(x - M) / Math.abs(G - D));
                    F = (r - x) / t + G;
                    d = l["plot" + (a ? "Width" : "Height")] / t
                };
                q();
                k = F;
                k < y.min ? (k = y.min, u = !0) : k + d > y.max && (k = y.max - d, u = !0);
                u ? (x -= .8 * (x - g[f][0]), I || (M -= .8 * (M - g[f][1])), q()) : g[f] = [x, M];
                v || (c[f] = F - r, c[p] = d);
                c = v ? 1 / t : t;
                n[p] = d;
                n[f] = k;
                h[v ? a ? "scaleY" : "scaleX" : "scale" + e] = t;
                h["translate" + e] = c * r + (x - c * G)
            }, pinch: function (a) {
                var l = this, q = l.chart, h = l.pinchDown, n = a.touches, c = n.length, g = l.lastValidTouch, m = l.hasZoom, z = l.selectionMarker, f = {}, e = 1 ===
                    c && (l.inClass(a.target, "highcharts-tracker") && q.runTrackerClick || l.runChartClick), b = {};
                1 < c && (l.initiated = !0);
                m && l.initiated && !e && a.preventDefault();
                H(n, function (a) {
                    return l.normalize(a)
                });
                "touchstart" === a.type ? (A(n, function (a, b) {
                    h[b] = {chartX: a.chartX, chartY: a.chartY}
                }), g.x = [h[0].chartX, h[1] && h[1].chartX], g.y = [h[0].chartY, h[1] && h[1].chartY], A(q.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = q.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, e = a.toPixels(k(a.options.min, a.dataMin)), f = a.toPixels(k(a.options.max,
                            a.dataMax)), c = Math.max(e, f);
                        b.min = Math.min(a.pos, Math.min(e, f) - d);
                        b.max = Math.max(a.pos + a.len, c + d)
                    }
                }), l.res = !0) : h.length && (z || (l.selectionMarker = z = E({
                    destroy: w,
                    touch: !0
                }, q.plotBox)), l.pinchTranslate(h, n, f, z, b, g), l.hasPinched = m, l.scaleGroups(f, b), !m && l.followTouchMove && 1 === c ? this.runPointActions(l.normalize(a)) : l.res && (l.res = !1, this.reset(!1, 0)))
            }, touch: function (l, r) {
                var q = this.chart, h;
                a.hoverChartIndex = q.index;
                1 === l.touches.length ? (l = this.normalize(l), q.isInsidePlot(l.chartX - q.plotLeft, l.chartY - q.plotTop) && !q.openMenu ? (r && this.runPointActions(l), "touchmove" === l.type && (r = this.pinchDown, h = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - l.chartX, 2) + Math.pow(r[0].chartY - l.chartY, 2)) : !1), k(h, !0) && this.pinch(l)) : r && this.reset()) : 2 === l.touches.length && this.pinch(l)
            }, onContainerTouchStart: function (a) {
                this.zoomOption();
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (l) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(l)
            }
        })
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.charts,
            E = a.css, H = a.doc, w = a.extend, k = a.noop, l = a.Pointer, r = a.removeEvent, q = a.win, h = a.wrap;
        if (q.PointerEvent || q.MSPointerEvent) {
            var n = {}, c = !!q.PointerEvent, g = function () {
                var a, f = [];
                f.item = function (a) {
                    return this[a]
                };
                for (a in n)n.hasOwnProperty(a) && f.push({pageX: n[a].pageX, pageY: n[a].pageY, target: n[a].target});
                return f
            }, m = function (c, f, e, b) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !A[a.hoverChartIndex] || (b(c), b = A[a.hoverChartIndex].pointer, b[f]({
                    type: e, target: c.currentTarget, preventDefault: k,
                    touches: g()
                }))
            };
            w(l.prototype, {
                onContainerPointerDown: function (a) {
                    m(a, "onContainerTouchStart", "touchstart", function (a) {
                        n[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    m(a, "onContainerTouchMove", "touchmove", function (a) {
                        n[a.pointerId] = {pageX: a.pageX, pageY: a.pageY};
                        n[a.pointerId].target || (n[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    m(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete n[a.pointerId]
                    })
                }, batchMSEvents: function (a) {
                    a(this.chart.container,
                        c ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, c ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(H, c ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            h(l.prototype, "init", function (a, f, e) {
                a.call(this, f, e);
                this.hasZoom && E(f.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            h(l.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            h(l.prototype, "destroy", function (a) {
                this.batchMSEvents(r);
                a.call(this)
            })
        }
    })(N);
    (function (a) {
        var C, A = a.addEvent, E = a.css, H = a.discardElement, w = a.defined, k = a.each, l = a.extend, r = a.isFirefox, q = a.marginNames, h = a.merge, n = a.pick, c = a.setAnimation, g = a.stableSort, m = a.win, z = a.wrap;
        C = a.Legend = function (a, e) {
            this.init(a, e)
        };
        C.prototype = {
            init: function (a, e) {
                this.chart = a;
                this.setOptions(e);
                e.enabled && (this.render(), A(this.chart, "endResize", function () {
                    this.legend.positionCheckboxes()
                }))
            }, setOptions: function (a) {
                var e = n(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle =
                    h(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.initialItemX = this.padding = e;
                this.initialItemY = e - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = n(a.symbolWidth, 16);
                this.pages = []
            }, update: function (a, e) {
                var b = this.chart;
                this.setOptions(h(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                n(e, !0) && b.redraw()
            }, colorizeItem: function (a, e) {
                a.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var b = this.options, f = a.legendItem, c = a.legendLine,
                    d = a.legendSymbol, g = this.itemHiddenStyle.color, b = e ? b.itemStyle.color : g, t = e ? a.color || g : g, v = a.options && a.options.marker, m = {fill: t}, h;
                f && f.css({fill: b, color: b});
                c && c.attr({stroke: t});
                if (d) {
                    if (v && d.isMarker && (m = a.pointAttribs(), !e))for (h in m)m[h] = g;
                    d.attr(m)
                }
            }, positionItem: function (a) {
                var e = this.options, b = e.symbolPadding, e = !e.rtl, c = a._legendItemPos, f = c[0], c = c[1], d = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(e ? f : this.legendWidth - f - 2 * b - 4, c);
                d && (d.x = f, d.y = c)
            }, destroyItem: function (a) {
                var e = a.checkbox;
                k(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                    a[b] && (a[b] = a[b].destroy())
                });
                e && H(a.checkbox)
            }, destroy: function () {
                var a = this.group, e = this.box;
                e && (this.box = e.destroy());
                k(this.getAllItems(), function (a) {
                    k(["legendItem", "legendGroup"], function (b) {
                        a[b] && (a[b] = a[b].destroy())
                    })
                });
                a && (this.group = a.destroy())
            }, positionCheckboxes: function (a) {
                var e = this.group.alignAttr, b, c = this.clipHeight || this.legendHeight, f = this.titleHeight;
                e && (b = e.translateY, k(this.allItems, function (d) {
                    var g = d.checkbox,
                        p;
                    g && (p = b + f + g.y + (a || 0) + 3, E(g, {
                        left: e.translateX + d.checkboxOffset + g.x - 20 + "px",
                        top: p + "px",
                        display: p > b - 6 && p < b + c - 6 ? "" : "none"
                    }))
                }))
            }, renderTitle: function () {
                var a = this.padding, e = this.options.title, b = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({zIndex: 1}).css(e.style).add(this.group)), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: b}));
                this.titleHeight = b
            }, setText: function (c) {
                var e =
                    this.options;
                c.legendItem.attr({text: e.labelFormat ? a.format(e.labelFormat, c) : e.labelFormatter.call(c)})
            }, renderItem: function (a) {
                var e = this.chart, b = e.renderer, c = this.options, f = "horizontal" === c.layout, d = this.symbolWidth, g = c.symbolPadding, m = this.itemStyle, v = this.itemHiddenStyle, y = this.padding, l = f ? n(c.itemDistance, 20) : 0, G = !c.rtl, x = c.width, D = c.itemMarginBottom || 0, k = this.itemMarginTop, u = this.initialItemX, z = a.legendItem, q = !a.series, r = !q && a.series.drawLegendSymbol ? a.series : a, B = r.options, B = this.createCheckboxForItem &&
                    B && B.showCheckbox, L = c.useHTML;
                z || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + r.type + "-series highcharts-color-" + a.colorIndex + " " + (a.options.className || "") + (q ? "highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup), a.legendItem = z = b.text("", G ? d + g : -g, this.baseline || 0, L).css(h(a.visible ? m : v)).attr({
                    align: G ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (m = m.fontSize, this.fontMetrics = b.fontMetrics(m, z), this.baseline = this.fontMetrics.f + 3 + k, z.attr("y", this.baseline)),
                    r.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, z, L), B && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                b = z.getBBox();
                d = a.checkboxOffset = c.itemWidth || a.legendItemWidth || d + g + b.width + l + (B ? 20 : 0);
                this.itemHeight = g = Math.round(a.legendItemHeight || b.height);
                f && this.itemX - u + d > (x || e.chartWidth - 2 * y - u - c.x) && (this.itemX = u, this.itemY += k + this.lastLineHeight + D, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, d);
                this.lastItemY = k + this.itemY + D;
                this.lastLineHeight =
                    Math.max(g, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                f ? this.itemX += d : (this.itemY += k + g + D, this.lastLineHeight = g);
                this.offsetWidth = x || Math.max((f ? this.itemX - u - l : d) + y, this.offsetWidth)
            }, getAllItems: function () {
                var a = [];
                k(this.chart.series, function (e) {
                    var b = e && e.options;
                    e && n(b.showInLegend, w(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(e.legendItems || ("point" === b.legendType ? e.data : e)))
                });
                return a
            }, adjustMargins: function (a, e) {
                var b = this.chart, c = this.options, f = c.align.charAt(0) + c.verticalAlign.charAt(0) +
                    c.layout.charAt(0);
                c.floating || k([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (d, g) {
                    d.test(f) && !w(a[g]) && (b[q[g]] = Math.max(b[q[g]], b.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * c[g % 2 ? "x" : "y"] + n(c.margin, 12) + e[g]))
                })
            }, render: function () {
                var a = this, e = a.chart, b = e.renderer, c = a.group, m, d, h, t, v = a.box, n = a.options, z = a.padding;
                a.itemX = a.initialItemX;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                c || (a.group = c = b.g("legend").attr({zIndex: 7}).add(), a.contentGroup =
                    b.g().attr({zIndex: 1}).add(c), a.scrollGroup = b.g().add(a.contentGroup));
                a.renderTitle();
                m = a.getAllItems();
                g(m, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                n.reversed && m.reverse();
                a.allItems = m;
                a.display = d = !!m.length;
                a.lastLineHeight = 0;
                k(m, function (b) {
                    a.renderItem(b)
                });
                h = (n.width || a.offsetWidth) + z;
                t = a.lastItemY + a.lastLineHeight + a.titleHeight;
                t = a.handleOverflow(t);
                t += z;
                v || (a.box = v = b.rect().addClass("highcharts-legend-box").attr({r: n.borderRadius}).add(c),
                    v.isNew = !0);
                v.attr({
                    stroke: n.borderColor,
                    "stroke-width": n.borderWidth || 0,
                    fill: n.backgroundColor || "none"
                }).shadow(n.shadow);
                0 < h && 0 < t && (v[v.isNew ? "attr" : "animate"](v.crisp({
                    x: 0,
                    y: 0,
                    width: h,
                    height: t
                }, v.strokeWidth())), v.isNew = !1);
                v[d ? "show" : "hide"]();
                a.legendWidth = h;
                a.legendHeight = t;
                k(m, function (b) {
                    a.positionItem(b)
                });
                d && c.align(l({width: h, height: t}, n), !0, "spacingBox");
                e.isResizing || this.positionCheckboxes()
            }, handleOverflow: function (a) {
                var e = this, b = this.chart, c = b.renderer, f = this.options, d = f.y, d = b.spacingBox.height +
                    ("top" === f.verticalAlign ? -d : d) - this.padding, g = f.maxHeight, m, v = this.clipRect, h = f.navigation, l = n(h.animation, !0), G = h.arrowSize || 12, x = this.nav, D = this.pages, M = this.padding, u, z = this.allItems, q = function (a) {
                    v.attr({height: a});
                    e.contentGroup.div && (e.contentGroup.div.style.clip = "rect(" + M + "px,9999px," + (M + a) + "px,0)")
                };
                "horizontal" === f.layout && (d /= 2);
                g && (d = Math.min(d, g));
                D.length = 0;
                a > d && !1 !== h.enabled ? (this.clipHeight = m = Math.max(d - 20 - this.titleHeight - M, 0), this.currentPage = n(this.currentPage, 1), this.fullHeight =
                    a, k(z, function (a, b) {
                    var d = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var e = D.length;
                    if (!e || d - D[e - 1] > m && (u || d) !== D[e - 1])D.push(u || d), e++;
                    b === z.length - 1 && d + a - D[e - 1] > m && D.push(d);
                    d !== u && (u = d)
                }), v || (v = e.clipRect = c.clipRect(0, M, 9999, 0), e.contentGroup.clip(v)), q(m), x || (this.nav = x = c.g().attr({zIndex: 1}).add(this.group), this.up = c.symbol("triangle", 0, 0, G, G).on("click", function () {
                    e.scroll(-1, l)
                }).add(x), this.pager = c.text("", 15, 10).addClass("highcharts-legend-navigation").css(h.style).add(x),
                    this.down = c.symbol("triangle-down", 0, 0, G, G).on("click", function () {
                        e.scroll(1, l)
                    }).add(x)), e.scroll(0), a = d) : x && (q(b.chartHeight), x.hide(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                return a
            }, scroll: function (a, e) {
                var b = this.pages, f = b.length;
                a = this.currentPage + a;
                var g = this.clipHeight, d = this.options.navigation, m = this.pager, h = this.padding;
                a > f && (a = f);
                0 < a && (void 0 !== e && c(e, this.chart), this.nav.attr({
                    translateX: h,
                    translateY: g + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    "class": 1 ===
                    a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), m.attr({text: a + "/" + f}), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                }), this.up.attr({fill: 1 === a ? d.inactiveColor : d.activeColor}).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({fill: a === f ? d.inactiveColor : d.activeColor}).css({cursor: a === f ? "default" : "pointer"}), e = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: e}), this.currentPage =
                    a, this.positionCheckboxes(e))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, e) {
                var b = a.options, c = b.symbolHeight || a.fontMetrics.f, b = b.squareSymbol;
                e.legendSymbol = this.chart.renderer.rect(b ? (a.symbolWidth - c) / 2 : 0, a.baseline - c + 1, b ? c : a.symbolWidth, c, n(a.options.symbolRadius, c / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(e.legendGroup)
            }, drawLineMarker: function (a) {
                var e = this.options, b = e.marker, c = a.symbolWidth, f = this.chart.renderer, d = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var g;
                g = {"stroke-width": e.lineWidth || 0};
                e.dashStyle && (g.dashstyle = e.dashStyle);
                this.legendLine = f.path(["M", 0, a, "L", c, a]).addClass("highcharts-graph").attr(g).add(d);
                b && !1 !== b.enabled && (e = 0 === this.symbol.indexOf("url") ? 0 : b.radius, this.legendSymbol = b = f.symbol(this.symbol, c / 2 - e, a - e, 2 * e, 2 * e, b).addClass("highcharts-point").add(d), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(m.navigator.userAgent) || r) && z(C.prototype, "positionItem", function (a, e) {
            var b = this, c = function () {
                e._legendItemPos && a.call(b, e)
            };
            c();
            setTimeout(c)
        })
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.animate, E = a.animObject, H = a.attr, w = a.doc, k = a.Axis, l = a.createElement, r = a.defaultOptions, q = a.discardElement, h = a.charts, n = a.css, c = a.defined, g = a.each, m = a.error, z = a.extend, f = a.fireEvent, e = a.getStyle, b = a.grep, p = a.isNumber, K = a.isObject, d = a.isString, F = a.Legend, t = a.marginNames, v = a.merge, y = a.Pointer, I = a.pick, G = a.pInt, x = a.removeEvent, D = a.seriesTypes, M = a.splat, u = a.svg, J = a.syncTimeout, O = a.win, Q = a.Renderer, B = a.Chart = function () {
            this.getArgs.apply(this, arguments)
        };
        a.chart = function (a,
                            b, d) {
            return new B(a, b, d)
        };
        B.prototype = {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (d(a[0]) || a[0].nodeName)this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, d) {
                var e, c = b.series;
                b.series = null;
                e = v(r, b);
                e.series = b.series = c;
                this.userOptions = b;
                this.respRules = [];
                b = e.chart;
                c = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {h: {}, v: {}};
                this.callback = d;
                this.isResizing = 0;
                this.options = e;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var f;
                this.index = h.length;
                h.push(this);
                a.chartCount++;
                if (c)for (f in c)C(this, f, c[f]);
                this.xAxis = [];
                this.yAxis = [];
                this.pointCount = this.colorCounter = this.symbolCounter = 0;
                this.firstRender()
            }, initSeries: function (a) {
                var b = this.options.chart;
                (b = D[a.type || b.type || b.defaultSeriesType]) || m(17, !0);
                b = new b;
                b.init(this, a);
                return b
            }, isInsidePlot: function (a, b, d) {
                var e = d ? b : a;
                a = d ? a : b;
                return 0 <= e && e <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                var d = this.axes, e = this.series, c = this.pointer, x = this.legend, u = this.isDirtyLegend,
                    p, D, m = this.hasCartesianSeries, h = this.isDirtyBox, v = e.length, t = v, G = this.renderer, n = G.isHidden(), y = [];
                a.setAnimation(b, this);
                n && this.cloneRenderTo();
                for (this.layOutTitles(); t--;)if (b = e[t], b.options.stacking && (p = !0, b.isDirty)) {
                    D = !0;
                    break
                }
                if (D)for (t = v; t--;)b = e[t], b.options.stacking && (b.isDirty = !0);
                g(e, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), u = !0);
                    a.isDirtyData && f(a, "updatedData")
                });
                u && x.options.enabled && (x.render(), this.isDirtyLegend = !1);
                p && this.getStacks();
                m && g(d, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                m && (g(d, function (a) {
                    a.isDirty && (h = !0)
                }), g(d, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, y.push(function () {
                        f(a, "afterSetExtremes", z(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (h || p) && a.redraw()
                }));
                h && this.drawChartBox();
                g(e, function (a) {
                    (h || a.isDirty) && a.visible && a.redraw()
                });
                c && c.reset(!0);
                G.draw();
                f(this, "redraw");
                n && this.cloneRenderTo(!0);
                g(y, function (a) {
                    a.call()
                })
            }, get: function (a) {
                var b = this.axes, d = this.series,
                    e, c;
                for (e = 0; e < b.length; e++)if (b[e].options.id === a)return b[e];
                for (e = 0; e < d.length; e++)if (d[e].options.id === a)return d[e];
                for (e = 0; e < d.length; e++)for (c = d[e].points || [], b = 0; b < c.length; b++)if (c[b].id === a)return c[b];
                return null
            }, getAxes: function () {
                var a = this, b = this.options, d = b.xAxis = M(b.xAxis || {}), b = b.yAxis = M(b.yAxis || {});
                g(d, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                g(b, function (a, b) {
                    a.index = b
                });
                d = d.concat(b);
                g(d, function (b) {
                    new k(a, b)
                })
            }, getSelectedPoints: function () {
                var a = [];
                g(this.series, function (d) {
                    a = a.concat(b(d.points ||
                        [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return b(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, d) {
                var e = this, c = e.options, f;
                f = c.title = v(c.title, a);
                c = c.subtitle = v(c.subtitle, b);
                g([["title", a, f], ["subtitle", b, c]], function (a, b) {
                    var d = a[0], c = e[d], f = a[1];
                    a = a[2];
                    c && f && (e[d] = c = c.destroy());
                    a && a.text && !c && (e[d] = e.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + d,
                        zIndex: a.zIndex || 4
                    }).add(), e[d].update = function (a) {
                        e.setTitle(!b &&
                            a, b && a)
                    }, e[d].css(a.style))
                });
                e.layOutTitles(d)
            }, layOutTitles: function (a) {
                var b = 0, d, e = this.renderer, c = this.spacingBox;
                g(["title", "subtitle"], function (a) {
                    var d = this[a], f = this.options[a], g;
                    d && (g = f.style.fontSize, g = e.fontMetrics(g, d).b, d.css({width: (f.width || c.width + f.widthAdjust) + "px"}).align(z({y: b + g + ("title" === a ? -3 : 2)}, f), !1, "spacingBox"), f.floating || f.verticalAlign || (b = Math.ceil(b + d.getBBox().height)))
                }, this);
                d = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && d && (this.isDirtyBox = d, this.hasRendered &&
                I(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var a = this.options.chart, b = a.width, a = a.height, d = this.renderToClone || this.renderTo;
                c(b) || (this.containerWidth = e(d, "width"));
                c(a) || (this.containerHeight = e(d, "height"));
                this.chartWidth = Math.max(0, b || this.containerWidth || 600);
                this.chartHeight = Math.max(0, I(a, 19 < this.containerHeight ? this.containerHeight : 400))
            }, cloneRenderTo: function (a) {
                var b = this.renderToClone, d = this.container;
                if (a) {
                    if (b) {
                        for (; b.childNodes.length;)this.renderTo.appendChild(b.firstChild);
                        q(b);
                        delete this.renderToClone
                    }
                } else d && d.parentNode === this.renderTo && this.renderTo.removeChild(d), this.renderToClone = b = this.renderTo.cloneNode(0), n(b, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), b.style.setProperty && b.style.setProperty("display", "block", "important"), w.body.appendChild(b), d && b.appendChild(d)
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, e = this.options, c = e.chart, f, g;
                b = this.renderTo;
                var x = "highcharts-" + a.idCounter++,
                    u;
                b || (this.renderTo = b = c.renderTo);
                d(b) && (this.renderTo = b = w.getElementById(b));
                b || m(13, !0);
                f = G(H(b, "data-highcharts-chart"));
                p(f) && h[f] && h[f].hasRendered && h[f].destroy();
                H(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                c.skipClone || b.offsetWidth || this.cloneRenderTo();
                this.getChartSize();
                f = this.chartWidth;
                g = this.chartHeight;
                u = z({
                    position: "relative",
                    overflow: "hidden",
                    width: f + "px",
                    height: g + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, c.style);
                this.container = b = l("div", {id: x}, u, this.renderToClone || b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[c.renderer] || Q)(b, f, g, null, c.forExport, e.exporting && e.exporting.allowHTML);
                this.setClassName(c.className);
                this.renderer.setStyle(c.style);
                this.renderer.chartIndex = this.index
            }, getMargins: function (a) {
                var b = this.spacing, d = this.margin, e = this.titleOffset;
                this.resetMargins();
                e && !c(d[0]) && (this.plotTop = Math.max(this.plotTop, e + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(d,
                    b);
                this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], d = a.margin;
                a.hasCartesianSeries && g(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                g(t, function (e, f) {
                    c(d[f]) || (a[e] += b[f])
                });
                a.setChartSize()
            }, reflow: function (a) {
                var b = this, d = b.options.chart, f = b.renderTo, g = c(d.width), x = d.width || e(f, "width"), d = d.height || e(f, "height"), f = a ? a.target : O;
                if (!g && !b.isPrinting && x && d && (f === O || f === w)) {
                    if (x !== b.containerWidth || d !== b.containerHeight)clearTimeout(b.reflowTimeout), b.reflowTimeout = J(function () {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    b.containerWidth = x;
                    b.containerHeight = d
                }
            }, initReflow: function () {
                var a = this, b = function (b) {
                    a.reflow(b)
                };
                C(O, "resize", b);
                C(a, "destroy", function () {
                    x(O, "resize", b)
                })
            }, setSize: function (b, d, e) {
                var c = this, x = c.renderer;
                c.isResizing += 1;
                a.setAnimation(e, c);
                c.oldChartHeight = c.chartHeight;
                c.oldChartWidth = c.chartWidth;
                void 0 !==
                b && (c.options.chart.width = b);
                void 0 !== d && (c.options.chart.height = d);
                c.getChartSize();
                b = x.globalAnimation;
                (b ? A : n)(c.container, {width: c.chartWidth + "px", height: c.chartHeight + "px"}, b);
                c.setChartSize(!0);
                x.setSize(c.chartWidth, c.chartHeight, e);
                g(c.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                c.isDirtyLegend = !0;
                c.isDirtyBox = !0;
                c.layOutTitles();
                c.getMargins();
                c.setResponsive && c.setResponsive(!1);
                c.redraw(e);
                c.oldChartHeight = null;
                f(c, "resize");
                J(function () {
                        c && f(c, "endResize", null, function () {
                            --c.isResizing
                        })
                    },
                    E(b).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, d = this.renderer, c = this.chartWidth, e = this.chartHeight, f = this.options.chart, x = this.spacing, u = this.clipOffset, p, D, m, h;
                this.plotLeft = p = Math.round(this.plotLeft);
                this.plotTop = D = Math.round(this.plotTop);
                this.plotWidth = m = Math.max(0, Math.round(c - p - this.marginRight));
                this.plotHeight = h = Math.max(0, Math.round(e - D - this.marginBottom));
                this.plotSizeX = b ? h : m;
                this.plotSizeY = b ? m : h;
                this.plotBorderWidth = f.plotBorderWidth || 0;
                this.spacingBox = d.spacingBox = {
                    x: x[3],
                    y: x[0], width: c - x[3] - x[1], height: e - x[0] - x[2]
                };
                this.plotBox = d.plotBox = {x: p, y: D, width: m, height: h};
                c = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(c, u[3]) / 2);
                d = Math.ceil(Math.max(c, u[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: d,
                    width: Math.floor(this.plotSizeX - Math.max(c, u[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(c, u[2]) / 2 - d))
                };
                a || g(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                g(["margin", "spacing"], function (d) {
                    var c =
                        b[d], e = K(c) ? c : [c, c, c, c];
                    g(["Top", "Right", "Bottom", "Left"], function (c, f) {
                        a[d][f] = I(b[d + c], e[f])
                    })
                });
                g(t, function (b, d) {
                    a[b] = I(a.margin[d], a.spacing[d])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a = this.options.chart, b = this.renderer, d = this.chartWidth, c = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, x, u = this.plotBGImage, p = a.backgroundColor, D = a.plotBackgroundColor, m = a.plotBackgroundImage, h, v = this.plotLeft, t = this.plotTop, G = this.plotWidth,
                    n = this.plotHeight, y = this.plotBox, l = this.clipRect, k = this.clipBox, B = "animate";
                e || (this.chartBackground = e = b.rect().addClass("highcharts-background").add(), B = "attr");
                x = a.borderWidth || 0;
                h = x + (a.shadow ? 8 : 0);
                p = {fill: p || "none"};
                if (x || e["stroke-width"])p.stroke = a.borderColor, p["stroke-width"] = x;
                e.attr(p).shadow(a.shadow);
                e[B]({x: h / 2, y: h / 2, width: d - h - x % 2, height: c - h - x % 2, r: a.borderRadius});
                B = "animate";
                f || (B = "attr", this.plotBackground = f = b.rect().addClass("highcharts-plot-background").add());
                f[B](y);
                f.attr({
                    fill: D ||
                    "none"
                }).shadow(a.plotShadow);
                m && (u ? u.animate(y) : this.plotBGImage = b.image(m, v, t, G, n).add());
                l ? l.animate({width: k.width, height: k.height}) : this.clipRect = b.clipRect(k);
                B = "animate";
                g || (B = "attr", this.plotBorder = g = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                g.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                g[B](g.crisp({x: v, y: t, width: G, height: n}, -g.strokeWidth()));
                this.isDirtyBox = !1
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, d, c = a.options.series,
                    e, f;
                g(["inverted", "angular", "polar"], function (g) {
                    d = D[b.type || b.defaultSeriesType];
                    f = b[g] || d && d.prototype[g];
                    for (e = c && c.length; !f && e--;)(d = D[c[e].type]) && d.prototype[g] && (f = !0);
                    a[g] = f
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                g(b, function (a) {
                    a.linkedSeries.length = 0
                });
                g(b, function (b) {
                    var c = b.options.linkedTo;
                    d(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = I(b.options.visible, c.options.visible, b.visible))
                })
            }, renderSeries: function () {
                g(this.series,
                    function (a) {
                        a.translate();
                        a.render()
                    })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && g(b.items, function (d) {
                    var c = z(b.style, d.style), e = G(c.left) + a.plotLeft, f = G(c.top) + a.plotTop + 12;
                    delete c.left;
                    delete c.top;
                    a.renderer.text(d.html, e, f).attr({zIndex: 2}).css(c).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, d = this.options, c, e, f;
                this.setTitle();
                this.legend = new F(this, d.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                d = this.plotWidth;
                c = this.plotHeight -=
                    21;
                g(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                e = 1.1 < d / this.plotWidth;
                f = 1.05 < c / this.plotHeight;
                if (e || f)g(a, function (a) {
                    (a.horiz && e || !a.horiz && f) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && g(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b =
                    this;
                a = v(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (O.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }, destroy: function () {
                var b = this, d = b.axes, c = b.series, e = b.container, u, p = e && e.parentNode;
                f(b, "destroy");
                h[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                x(b);
                for (u = d.length; u--;)d[u] = d[u].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (u = c.length; u--;)c[u] = c[u].destroy();
                g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var d = b[a];
                    d && d.destroy && (b[a] = d.destroy())
                });
                e && (e.innerHTML = "", x(e), p && q(e));
                for (u in b)delete b[u]
            }, isReadyToRender: function () {
                var a =
                    this;
                return u || O != O.top || "complete" === w.readyState ? !0 : (w.attachEvent("onreadystatechange", function () {
                    w.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === w.readyState && a.firstRender()
                }), !1)
            }, firstRender: function () {
                var a = this, b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    f(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    g(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    f(a, "beforeRender");
                    y && (a.pointer = new y(a, b));
                    a.render();
                    a.renderer.draw();
                    if (!a.renderer.imgCount &&
                        a.onload)a.onload();
                    a.cloneRenderTo(!0)
                }
            }, onload: function () {
                g([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                f(this, "load");
                !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        }
    })(N);
    (function (a) {
        var C, A = a.each, E = a.extend, H = a.erase, w = a.fireEvent, k = a.format, l = a.isArray, r = a.isNumber, q = a.pick, h = a.removeEvent;
        C = a.Point = function () {
        };
        C.prototype = {
            init: function (a, c, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(c, g);
                a.options.colorByPoint ?
                    (c = a.options.colors || a.chart.options.colors, this.color = this.color || c[a.colorCounter], c = c.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === c && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = q(this.colorIndex, g);
                a.chart.pointCount++;
                return this
            }, applyOptions: function (a, c) {
                var g = this.series, m = g.options.pointValKey || g.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                E(this, a);
                this.options = this.options ? E(this.options, a) : a;
                a.group && delete this.group;
                m && (this.y = this[m]);
                this.isNull = q(this.isValid && !this.isValid(), null === this.x || !r(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === c ? g.autoIncrement(this) : c);
                return this
            }, optionsToObject: function (a) {
                var c = {}, g = this.series, m = g.options.keys, h = m || g.pointArrayMap || ["y"], f = h.length, e = 0, b = 0;
                if (r(a) || null === a)c[h[0]] = a; else if (l(a))for (!m && a.length > f && (g = typeof a[0], "string" === g ? c.name = a[0] : "number" === g && (c.x = a[0]), e++); b < f;)m && void 0 ===
                a[e] || (c[h[b]] = a[e]), e++, b++; else"object" === typeof a && (c = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return c
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "")
            }, getZone: function () {
                var a = this.series, c = a.zones, a = a.zoneAxis ||
                    "y", g = 0, m;
                for (m = c[g]; this[a] >= m.value;)m = c[++g];
                m && m.color && !this.options.color && (this.color = m.color);
                return m
            }, destroy: function () {
                var a = this.series.chart, c = a.hoverPoints, g;
                a.pointCount--;
                c && (this.setState(), H(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint)this.onMouseOut();
                if (this.graphic || this.dataLabel)h(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (g in this)this[g] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper",
                    "connector", "shadowGroup"], c, g = 6; g--;)c = a[g], this[c] && (this[c] = this[c].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var c = this.series, g = c.tooltipOptions, m = q(g.valueDecimals, ""), h = g.valuePrefix || "", f = g.valueSuffix || "";
                A(c.pointArrayMap || ["y"], function (c) {
                    c = "{point." + c;
                    if (h || f)a = a.replace(c + "}", h + c + "}" + f);
                    a = a.replace(c +
                        "}", c + ":,." + m + "f}")
                });
                return k(a, {point: this, series: this.series})
            }, firePointEvent: function (a, c, g) {
                var m = this, h = this.series.options;
                (h.point.events[a] || m.options && m.options.events && m.options.events[a]) && this.importEvents();
                "click" === a && h.allowPointSelect && (g = function (a) {
                    m.select && m.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                w(this, a, c, g)
            }, visible: !0
        }
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.animObject, E = a.arrayMax, H = a.arrayMin, w = a.correctFloat, k = a.Date, l = a.defaultOptions, r = a.defaultPlotOptions,
            q = a.defined, h = a.each, n = a.erase, c = a.error, g = a.extend, m = a.fireEvent, z = a.grep, f = a.isArray, e = a.isNumber, b = a.isString, p = a.merge, K = a.pick, d = a.removeEvent, F = a.splat, t = a.stableSort, v = a.SVGElement, y = a.syncTimeout, I = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {duration: 1E3},
            events: {},
            marker: {
                lineWidth: 0, lineColor: "#ffffff", radius: 4, states: {
                    hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1}, select: {
                        fillColor: "#cccccc", lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {events: {}},
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textShadow: "1px 1px contrast, -1px -1px contrast, -1px 1px contrast, 1px -1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {hover: {lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}}, select: {marker: {}}},
            stickyTracking: !0,
            turboThreshold: 1E3
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var d = this, c, e, f = a.series, x = function (a, b) {
                    return K(a.options.index, a._i) - K(b.options.index, b._i)
                };
                d.chart = a;
                d.options = b = d.setOptions(b);
                d.linkedSeries = [];
                d.bindAxes();
                g(d, {name: b.name, state: "", visible: !1 !== b.visible, selected: !0 === b.selected});
                e = b.events;
                for (c in e)C(d, c, e[c]);
                if (e && e.click || b.point && b.point.events && b.point.events.click ||
                    b.allowPointSelect)a.runTrackerClick = !0;
                d.getColor();
                d.getSymbol();
                h(d.parallelArrays, function (a) {
                    d[a + "Data"] = []
                });
                d.setData(b.data, !1);
                d.isCartesian && (a.hasCartesianSeries = !0);
                f.push(d);
                d._i = f.length - 1;
                t(f, x);
                this.yAxis && t(this.yAxis.series, x);
                h(f, function (a, b) {
                    a.index = b;
                    a.name = a.name || "Series " + (b + 1)
                })
            },
            bindAxes: function () {
                var a = this, b = a.options, d = a.chart, e;
                h(a.axisTypes || [], function (f) {
                    h(d[f], function (d) {
                        e = d.options;
                        if (b[f] === e.index || void 0 !== b[f] && b[f] === e.id || void 0 === b[f] && 0 === e.index)d.series.push(a),
                            a[f] = d, d.isDirty = !0
                    });
                    a[f] || a.optionalAxis === f || c(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var d = a.series, c = arguments, f = e(b) ? function (c) {
                    var e = "y" === c && d.toYData ? d.toYData(a) : a[c];
                    d[c + "Data"][b] = e
                } : function (a) {
                    Array.prototype[b].apply(d[a + "Data"], Array.prototype.slice.call(c, 2))
                };
                h(d.parallelArrays, f)
            },
            autoIncrement: function () {
                var a = this.options, b = this.xIncrement, d, c = a.pointIntervalUnit, b = K(b, a.pointStart, 0);
                this.pointInterval = d = K(this.pointInterval, a.pointInterval, 1);
                c && (a = new k(b), "day" === c ?
                    a = +a[k.hcSetDate](a[k.hcGetDate]() + d) : "month" === c ? a = +a[k.hcSetMonth](a[k.hcGetMonth]() + d) : "year" === c && (a = +a[k.hcSetFullYear](a[k.hcGetFullYear]() + d)), d = a - b);
                this.xIncrement = b + d;
                return b
            },
            setOptions: function (a) {
                var b = this.chart, d = b.options.plotOptions, b = b.userOptions || {}, c = b.plotOptions || {}, e = d[this.type];
                this.userOptions = a;
                d = p(e, d.series, a);
                this.tooltipOptions = p(l.tooltip, l.plotOptions[this.type].tooltip, b.tooltip, c.series && c.series.tooltip, c[this.type] && c[this.type].tooltip, a.tooltip);
                null === e.marker && delete d.marker;
                this.zoneAxis = d.zoneAxis;
                a = this.zones = (d.zones || []).slice();
                !d.negativeColor && !d.negativeFillColor || d.zones || a.push({
                    value: d[this.zoneAxis + "Threshold"] || d.threshold || 0,
                    className: "highcharts-negative",
                    color: d.negativeColor,
                    fillColor: d.negativeFillColor
                });
                a.length && q(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
                return d
            },
            getCyclic: function (a, b, d) {
                var c, e = this.userOptions, f = a + "Index", g = a + "Counter", x = d ? d.length : K(this.chart.options.chart[a + "Count"], this.chart[a +
                "Count"]);
                b || (c = K(e[f], e["_" + f]), q(c) || (e["_" + f] = c = this.chart[g] % x, this.chart[g] += 1), d && (b = d[c]));
                void 0 !== c && (this[f] = c);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || r[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function (a, d, g, p) {
                var x = this, m = x.points, v = m && m.length ||
                    0, t, D = x.options, y = x.chart, G = null, n = x.xAxis, l = D.turboThreshold, k = this.xData, z = this.yData, F = (t = x.pointArrayMap) && t.length;
                a = a || [];
                t = a.length;
                d = K(d, !0);
                if (!1 !== p && t && v === t && !x.cropped && !x.hasGroupedData && x.visible)h(a, function (a, b) {
                    m[b].update && a !== D.data[b] && m[b].update(a, !1, null, !1)
                }); else {
                    x.xIncrement = null;
                    x.colorCounter = 0;
                    h(this.parallelArrays, function (a) {
                        x[a + "Data"].length = 0
                    });
                    if (l && t > l) {
                        for (g = 0; null === G && g < t;)G = a[g], g++;
                        if (e(G))for (g = 0; g < t; g++)k[g] = this.autoIncrement(), z[g] = a[g]; else if (f(G))if (F)for (g =
                                                                                                                               0; g < t; g++)G = a[g], k[g] = G[0], z[g] = G.slice(1, F + 1); else for (g = 0; g < t; g++)G = a[g], k[g] = G[0], z[g] = G[1]; else c(12)
                    } else for (g = 0; g < t; g++)void 0 !== a[g] && (G = {series: x}, x.pointClass.prototype.applyOptions.apply(G, [a[g]]), x.updateParallelArrays(G, g));
                    b(z[0]) && c(14, !0);
                    x.data = [];
                    x.options.data = x.userOptions.data = a;
                    for (g = v; g--;)m[g] && m[g].destroy && m[g].destroy();
                    n && (n.minRange = n.userMinRange);
                    x.isDirty = y.isDirtyBox = !0;
                    x.isDirtyData = !!m;
                    g = !1
                }
                "point" === D.legendType && (this.processData(), this.generatePoints());
                d && y.redraw(g)
            },
            processData: function (a) {
                var b = this.xData, d = this.yData, e = b.length, f;
                f = 0;
                var g, p, m = this.xAxis, h, v = this.options;
                h = v.cropThreshold;
                var t = this.getExtremesFromAll || v.getExtremesFromAll, y = this.isCartesian, v = m && m.val2lin, G = m && m.isLog, n, l;
                if (y && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !a)return !1;
                m && (a = m.getExtremes(), n = a.min, l = a.max);
                if (y && this.sorted && !t && (!h || e > h || this.forceCrop))if (b[e - 1] < n || b[0] > l)b = [], d = []; else if (b[0] < n || b[e - 1] > l)f = this.cropData(this.xData, this.yData, n, l), b = f.xData, d = f.yData,
                    f = f.start, g = !0;
                for (h = b.length || 1; --h;)e = G ? v(b[h]) - v(b[h - 1]) : b[h] - b[h - 1], 0 < e && (void 0 === p || e < p) ? p = e : 0 > e && this.requireSorting && c(15);
                this.cropped = g;
                this.cropStart = f;
                this.processedXData = b;
                this.processedYData = d;
                this.closestPointRange = p
            },
            cropData: function (a, b, d, c) {
                var e = a.length, f = 0, g = e, x = K(this.cropShoulder, 1), p;
                for (p = 0; p < e; p++)if (a[p] >= d) {
                    f = Math.max(0, p - x);
                    break
                }
                for (d = p; d < e; d++)if (a[d] > c) {
                    g = d + x;
                    break
                }
                return {xData: a.slice(f, g), yData: b.slice(f, g), start: f, end: g}
            },
            generatePoints: function () {
                var a = this.options.data,
                    b = this.data, d, c = this.processedXData, e = this.processedYData, f = this.pointClass, g = c.length, p = this.cropStart || 0, m, h = this.hasGroupedData, v, t = [], y;
                b || h || (b = [], b.length = a.length, b = this.data = b);
                for (y = 0; y < g; y++)m = p + y, h ? (t[y] = (new f).init(this, [c[y]].concat(F(e[y]))), t[y].dataGroup = this.groupMap[y]) : (b[m] ? v = b[m] : void 0 !== a[m] && (b[m] = v = (new f).init(this, a[m], c[y])), t[y] = v), t[y].index = m;
                if (b && (g !== (d = b.length) || h))for (y = 0; y < d; y++)y !== p || h || (y += g), b[y] && (b[y].destroyElements(), b[y].plotX = void 0);
                this.data = b;
                this.points =
                    t
            },
            getExtremes: function (a) {
                var b = this.yAxis, d = this.processedXData, c, g = [], p = 0;
                c = this.xAxis.getExtremes();
                var m = c.min, h = c.max, v, t, y, n;
                a = a || this.stackedYData || this.processedYData || [];
                c = a.length;
                for (n = 0; n < c; n++)if (t = d[n], y = a[n], v = (e(y, !0) || f(y)) && (!b.isLog || y.length || 0 < y), t = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[n + 1] || t) >= m && (d[n - 1] || t) <= h, v && t)if (v = y.length)for (; v--;)null !== y[v] && (g[p++] = y[v]); else g[p++] = y;
                this.dataMin = H(g);
                this.dataMax = E(g)
            },
            translate: function () {
                this.processedXData ||
                this.processData();
                this.generatePoints();
                for (var a = this.options, b = a.stacking, d = this.xAxis, c = d.categories, f = this.yAxis, g = this.points, p = g.length, m = !!this.modifyValue, h = a.pointPlacement, v = "between" === h || e(h), t = a.threshold, y = a.startFromThreshold ? t : 0, n, l, k, z, F = Number.MAX_VALUE, a = 0; a < p; a++) {
                    var I = g[a], r = I.x, A = I.y;
                    l = I.low;
                    var C = b && f.stacks[(this.negStacks && A < (y ? 0 : t) ? "-" : "") + this.stackKey], E;
                    f.isLog && null !== A && 0 >= A && (I.isNull = !0);
                    I.plotX = n = w(Math.min(Math.max(-1E5, d.translate(r, 0, 0, 0, 1, h, "flags" === this.type)),
                        1E5));
                    b && this.visible && !I.isNull && C && C[r] && (z = this.getStackIndicator(z, r, this.index), E = C[r], A = E.points[z.key], l = A[0], A = A[1], l === y && z.key === C[r].base && (l = K(t, f.min)), f.isLog && 0 >= l && (l = null), I.total = I.stackTotal = E.total, I.percentage = E.total && I.y / E.total * 100, I.stackY = A, E.setOffset(this.pointXOffset || 0, this.barW || 0));
                    I.yBottom = q(l) ? f.translate(l, 0, 1, 0, 1) : null;
                    m && (A = this.modifyValue(A, I));
                    I.plotY = l = "number" === typeof A && Infinity !== A ? Math.min(Math.max(-1E5, f.translate(A, 0, 1, 0, 1)), 1E5) : void 0;
                    I.isInside =
                        void 0 !== l && 0 <= l && l <= f.len && 0 <= n && n <= d.len;
                    I.clientX = v ? w(d.translate(r, 0, 0, 0, 1, h)) : n;
                    I.negative = I.y < (t || 0);
                    I.category = c && void 0 !== c[I.x] ? c[I.x] : I.x;
                    I.isNull || (void 0 !== k && (F = Math.min(F, Math.abs(n - k))), k = n)
                }
                this.closestPointRangePx = F
            },
            getValidPoints: function (a, b) {
                var d = this.chart;
                return z(a || this.points || [], function (a) {
                    return b && !d.isInsidePlot(a.plotX, a.plotY, d.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart, d = this.options, c = b.renderer, e = b.inverted, f = this.clipBox, g = f || b.clipBox, p = this.sharedClipKey ||
                    ["_sharedClip", a && a.duration, a && a.easing, g.height, d.xAxis, d.yAxis].join(), m = b[p], h = b[p + "m"];
                m || (a && (g.width = 0, b[p + "m"] = h = c.clipRect(-99, e ? -b.plotLeft : -b.plotTop, 99, e ? b.chartWidth : b.chartHeight)), b[p] = m = c.clipRect(g), m.count = {length: 0});
                a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                !1 !== d.clip && (this.group.clip(a || f ? m : b.clipRect), this.markerGroup.clip(h), this.sharedClipKey = p);
                a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && p && b[p] && (f ||
                (b[p] = b[p].destroy()), b[p + "m"] && (b[p + "m"] = b[p + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart, d = A(this.options.animation), c;
                a ? this.setClip(d) : (c = this.sharedClipKey, (a = b[c]) && a.animate({width: b.plotSizeX}, d), b[c + "m"] && b[c + "m"].animate({width: b.plotSizeX + 99}, d), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                m(this, "afterAnimate")
            },
            drawPoints: function () {
                var a = this.points, b = this.chart, d, c, f, g, p = this.options.marker, m, h, v, t, y = this.markerGroup, n = K(p.enabled, this.xAxis.isRadial ? !0 : null,
                    this.closestPointRangePx > 2 * p.radius);
                if (!1 !== p.enabled || this._hasPointMarkers)for (c = a.length; c--;)f = a[c], d = f.plotY, g = f.graphic, m = f.marker || {}, h = !!f.marker, v = n && void 0 === m.enabled || m.enabled, t = f.isInside, v && e(d) && null !== f.y ? (d = K(m.symbol, this.symbol), f.hasImage = 0 === d.indexOf("url"), v = this.markerAttribs(f, f.selected && "select"), g ? g[t ? "show" : "hide"](!0).animate(v) : t && (0 < v.width || f.hasImage) && (f.graphic = g = b.renderer.symbol(d, v.x, v.y, v.width, v.height, h ? m : p).add(y)), g && g.attr(this.pointAttribs(f, f.selected &&
                    "select")), g && g.addClass(f.getClassName(), !0)) : g && (f.graphic = g.destroy())
            },
            markerAttribs: function (a, b) {
                var d = this.options.marker, c = a && a.options, e = c && c.marker || {}, c = K(e.radius, d.radius);
                b && (d = d.states[b], b = e.states && e.states[b], c = K(b && b.radius, d && d.radius, c + (d && d.radiusPlus || 0)));
                a.hasImage && (c = 0);
                a = {x: Math.floor(a.plotX) - c, y: a.plotY - c};
                c && (a.width = a.height = 2 * c);
                return a
            },
            pointAttribs: function (a, b) {
                var d = this.options.marker, c = a && a.options, e = c && c.marker || {}, f = d.lineWidth, g = this.color, c = c && c.color, p =
                    a && a.color, m;
                a && this.zones.length && (a = a.getZone()) && a.color && (m = a.color);
                g = c || m || p || g;
                m = e.fillColor || d.fillColor || g;
                g = e.lineColor || d.lineColor || g;
                b && (d = d.states[b], b = e.states && e.states[b] || {}, f = d.lineWidth || f + d.lineWidthPlus, m = b.fillColor || d.fillColor || m, g = b.lineColor || d.lineColor || g);
                return {stroke: g, "stroke-width": f, fill: m}
            },
            destroy: function () {
                var a = this, b = a.chart, c = /AppleWebKit\/533/.test(I.navigator.userAgent), e, f = a.data || [], g, p, t;
                m(a, "destroy");
                d(a);
                h(a.axisTypes || [], function (b) {
                    (t = a[b]) && t.series &&
                    (n(t.series, a), t.isDirty = t.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (e = f.length; e--;)(g = f[e]) && g.destroy && g.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                for (p in a)a[p] instanceof v && !a[p].survive && (e = c && "group" === p ? "hide" : "destroy", a[p][e]());
                b.hoverSeries === a && (b.hoverSeries = null);
                n(b.series, a);
                for (p in a)delete a[p]
            },
            getGraphPath: function (a, b, d) {
                var c = this, e = c.options, f = e.step, g, p = [], m = [], v;
                a = a || c.points;
                (g = a.reversed) && a.reverse();
                (f = {right: 1, center: 2}[f] || f &&
                    3) && g && (f = 4 - f);
                !e.connectNulls || b || d || (a = this.getValidPoints(a));
                h(a, function (g, h) {
                    var t = g.plotX, x = g.plotY, u = a[h - 1];
                    (g.leftCliff || u && u.rightCliff) && !d && (v = !0);
                    g.isNull && !q(b) && 0 < h ? v = !e.connectNulls : g.isNull && !b ? v = !0 : (0 === h || v ? h = ["M", g.plotX, g.plotY] : c.getPointSpline ? h = c.getPointSpline(a, g, h) : f ? (h = 1 === f ? ["L", u.plotX, x] : 2 === f ? ["L", (u.plotX + t) / 2, u.plotY, "L", (u.plotX + t) / 2, x] : ["L", t, u.plotY], h.push("L", t, x)) : h = ["L", t, x], m.push(g.x), f && m.push(g.x), p.push.apply(p, h), v = !1)
                });
                p.xMap = m;
                return c.graphPath = p
            },
            drawGraph: function () {
                var a = this, b = this.options, d = (this.gappedPath || this.getGraphPath).call(this), c = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]];
                h(this.zones, function (d, e) {
                    c.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (d.className || ""), d.color || a.color, d.dashStyle || b.dashStyle])
                });
                h(c, function (c, e) {
                    var f = c[0], g = a[f];
                    g ? (g.endX = d.xMap, g.animate({d: d})) : d.length && (a[f] = a.chart.renderer.path(d).addClass(c[1]).attr({zIndex: 1}).add(a.group), g = {
                        stroke: c[2],
                        "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none"
                    }, c[3] ? g.dashstyle = c[3] : "square" !== b.linecap && (g["stroke-linecap"] = g["stroke-linejoin"] = "round"), g = a[f].attr(g).shadow(2 > e && b.shadow));
                    g && (g.startX = d.xMap, g.isArea = d.isArea)
                })
            },
            applyZones: function () {
                var a = this, b = this.chart, d = b.renderer, c = this.zones, e, f, g = this.clips || [], p, m = this.graph, v = this.area, t = Math.max(b.chartWidth, b.chartHeight), y = this[(this.zoneAxis || "y") + "Axis"], n, l, k = b.inverted, z, I, F, q, r = !1;
                c.length && (m || v) && y && void 0 !== y.min && (l =
                    y.reversed, z = y.horiz, m && m.hide(), v && v.hide(), n = y.getExtremes(), h(c, function (c, h) {
                    e = l ? z ? b.plotWidth : 0 : z ? 0 : y.toPixels(n.min);
                    e = Math.min(Math.max(K(f, e), 0), t);
                    f = Math.min(Math.max(Math.round(y.toPixels(K(c.value, n.max), !0)), 0), t);
                    r && (e = f = y.toPixels(n.max));
                    I = Math.abs(e - f);
                    F = Math.min(e, f);
                    q = Math.max(e, f);
                    y.isXAxis ? (p = {
                        x: k ? q : F,
                        y: 0,
                        width: I,
                        height: t
                    }, z || (p.x = b.plotHeight - p.x)) : (p = {
                        x: 0,
                        y: k ? q : F,
                        width: t,
                        height: I
                    }, z && (p.y = b.plotWidth - p.y));
                    k && d.isVML && (p = y.isXAxis ? {x: 0, y: l ? F : q, height: p.width, width: b.chartWidth} :
                    {x: p.y - b.plotLeft - b.spacingBox.x, y: 0, width: p.height, height: b.chartHeight});
                    g[h] ? g[h].animate(p) : (g[h] = d.clipRect(p), m && a["zone-graph-" + h].clip(g[h]), v && a["zone-area-" + h].clip(g[h]));
                    r = c.value > n.max
                }), this.clips = g)
            },
            invertGroups: function (a) {
                function b() {
                    var b = {width: c.yAxis.len, height: c.xAxis.len};
                    h(["group", "markerGroup"], function (d) {
                        c[d] && c[d].attr(b).invert(a)
                    })
                }

                var c = this, e = c.chart;
                c.xAxis && (C(e, "resize", b), C(c, "destroy", function () {
                    d(e, "resize", b)
                }), b(a), c.invertGroups = b)
            },
            plotGroup: function (a,
                                 b, d, c, e) {
                var f = this[a], g = !f;
                g && (this[a] = f = this.chart.renderer.g(b).attr({zIndex: c || .1}).add(e), f.addClass("highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || "")));
                f.attr({visibility: d})[g ? "attr" : "animate"](this.getPlotBox());
                return f
            },
            getPlotBox: function () {
                var a = this.chart, b = this.xAxis, d = this.yAxis;
                a.inverted && (b = d, d = this.xAxis);
                return {translateX: b ? b.left : a.plotLeft, translateY: d ? d.top : a.plotTop, scaleX: 1, scaleY: 1}
            },
            render: function () {
                var a =
                    this, b = a.chart, d, c = a.options, e = !!a.animate && b.renderer.isSVG && A(c.animation).duration, f = a.visible ? "inherit" : "hidden", g = c.zIndex, p = a.hasRendered, m = b.seriesGroup, h = b.inverted;
                d = a.plotGroup("group", "series", f, g, m);
                a.markerGroup = a.plotGroup("markerGroup", "markers", f, g, m);
                e && a.animate(!0);
                d.inverted = a.isCartesian ? h : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(h);
                !1 === c.clip || a.sharedClipKey || p || d.clip(b.clipRect);
                e && a.animate();
                p || (a.animationTimeout = y(function () {
                    a.afterAnimate()
                }, e));
                a.isDirty = a.isDirtyData = !1;
                a.hasRendered = !0
            },
            redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData, d = this.group, c = this.xAxis, e = this.yAxis;
                d && (a.inverted && d.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), d.animate({translateX: K(c && c.left, a.plotLeft), translateY: K(e && e.top, a.plotTop)}));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdDimensions: 1,
            kdAxisArray: ["clientX",
                "plotY"],
            searchPoint: function (a, b) {
                var d = this.xAxis, c = this.yAxis, e = this.chart.inverted;
                return this.searchKDTree({
                    clientX: e ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                    plotY: e ? c.len - a.chartX + c.pos : a.chartY - c.pos
                }, b)
            },
            buildKDTree: function () {
                function a(d, c, e) {
                    var f, g;
                    if (g = d && d.length)return f = b.kdAxisArray[c % e], d.sort(function (a, b) {
                        return a[f] - b[f]
                    }), g = Math.floor(g / 2), {
                        point: d[g],
                        left: a(d.slice(0, g), c + 1, e),
                        right: a(d.slice(g + 1), c + 1, e)
                    }
                }

                var b = this, d = b.kdDimensions;
                delete b.kdTree;
                y(function () {
                    b.kdTree = a(b.getValidPoints(null,
                        !b.directTouch), d, d)
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function (a, b) {
                function d(a, b, p, m) {
                    var h = b.point, v = c.kdAxisArray[p % m], t, y, x = h;
                    y = q(a[e]) && q(h[e]) ? Math.pow(a[e] - h[e], 2) : null;
                    t = q(a[f]) && q(h[f]) ? Math.pow(a[f] - h[f], 2) : null;
                    t = (y || 0) + (t || 0);
                    h.dist = q(t) ? Math.sqrt(t) : Number.MAX_VALUE;
                    h.distX = q(y) ? Math.sqrt(y) : Number.MAX_VALUE;
                    v = a[v] - h[v];
                    t = 0 > v ? "left" : "right";
                    y = 0 > v ? "right" : "left";
                    b[t] && (t = d(a, b[t], p + 1, m), x = t[g] < x[g] ? t : h);
                    b[y] && Math.sqrt(v * v) < x[g] && (a = d(a, b[y], p + 1, m), x = a[g] < x[g] ? a : x);
                    return x
                }

                var c =
                    this, e = this.kdAxisArray[0], f = this.kdAxisArray[1], g = b ? "distX" : "dist";
                this.kdTree || this.buildKDTree();
                if (this.kdTree)return d(a, this.kdTree, this.kdDimensions, this.kdDimensions)
            }
        })
    })(N);
    (function (a) {
        function C(a, n, c, g, m) {
            var h = a.chart.inverted;
            this.axis = a;
            this.isNegative = c;
            this.options = n;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = m;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: n.align || (h ? c ? "left" : "right" : "center"),
                verticalAlign: n.verticalAlign || (h ? "middle" : c ? "bottom" : "top"),
                y: q(n.y,
                    h ? 4 : c ? 14 : -6),
                x: q(n.x, h ? c ? -6 : 6 : 0)
            };
            this.textAlign = n.textAlign || (h ? c ? "right" : "left" : "center")
        }

        var A = a.Axis, E = a.Chart, H = a.correctFloat, w = a.defined, k = a.destroyObjectProperties, l = a.each, r = a.format, q = a.pick;
        a = a.Series;
        C.prototype = {
            destroy: function () {
                k(this, this.axis)
            }, render: function (a) {
                var h = this.options, c = h.format, c = c ? r(c, this) : h.formatter.call(this);
                this.label ? this.label.attr({
                    text: c,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(c, null, null, h.useHTML).css(h.style).attr({
                    align: this.textAlign,
                    rotation: h.rotation, visibility: "hidden"
                }).add(a)
            }, setOffset: function (a, n) {
                var c = this.axis, g = c.chart, m = g.inverted, h = c.reversed, h = this.isNegative && !h || !this.isNegative && h, f = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = Math.abs(f - c);
                a = g.xAxis[0].translate(this.x) + a;
                var e = g.plotHeight, m = {
                    x: m ? h ? f : f - c : a,
                    y: m ? e - a - n : h ? e - f - c : e - f,
                    width: m ? c : n,
                    height: m ? n : c
                };
                if (n = this.label)n.align(this.alignOptions, null, m), m = n.alignAttr, n[!1 === this.options.crop || g.isInsidePlot(m.x, m.y) ? "show" : "hide"](!0)
            }
        };
        E.prototype.getStacks = function () {
            var a = this;
            l(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            l(a.series, function (h) {
                !h.options.stacking || !0 !== h.visible && !1 !== a.options.chart.ignoreHiddenSeries || (h.stackKey = h.type + q(h.options.stack, ""))
            })
        };
        A.prototype.buildStacks = function () {
            var a = this.series, n, c = q(this.options.reversedStacks, !0), g = a.length, m;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (m = g; m--;)a[c ? m : g - m - 1].setStackedPoints();
                for (m = g; m--;)n = a[c ? m : g - m - 1], n.setStackCliffs &&
                n.setStackCliffs();
                if (this.usePercentage)for (m = 0; m < g; m++)a[m].setPercentStacks()
            }
        };
        A.prototype.renderStackTotals = function () {
            var a = this.chart, n = a.renderer, c = this.stacks, g, m, l = this.stackTotalGroup;
            l || (this.stackTotalGroup = l = n.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            l.translate(a.plotLeft, a.plotTop);
            for (g in c)for (m in a = c[g], a)a[m].render(l)
        };
        A.prototype.resetStacks = function () {
            var a = this.stacks, l, c;
            if (!this.isXAxis)for (l in a)for (c in a[l])a[l][c].touched < this.stacksTouched ? (a[l][c].destroy(),
                delete a[l][c]) : (a[l][c].total = null, a[l][c].cum = 0)
        };
        A.prototype.cleanStacks = function () {
            var a, l, c;
            if (!this.isXAxis)for (l in this.oldStacks && (a = this.stacks = this.oldStacks), a)for (c in a[l])a[l][c].cum = a[l][c].total
        };
        a.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData, l = this.processedYData, c = [], g = l.length, m = this.options, k = m.threshold, f = m.startFromThreshold ? k : 0, e = m.stack, m = m.stacking, b = this.stackKey,
                    p = "-" + b, r = this.negStacks, d = this.yAxis, F = d.stacks, t = d.oldStacks, v, y, I, G, x, D, M;
                d.stacksTouched += 1;
                for (x = 0; x < g; x++)D = a[x], M = l[x], v = this.getStackIndicator(v, D, this.index), G = v.key, I = (y = r && M < (f ? 0 : k)) ? p : b, F[I] || (F[I] = {}), F[I][D] || (t[I] && t[I][D] ? (F[I][D] = t[I][D], F[I][D].total = null) : F[I][D] = new C(d, d.options.stackLabels, y, D, e)), I = F[I][D], null !== M && (I.points[G] = I.points[this.index] = [q(I.cum, f)], w(I.cum) || (I.base = G), I.touched = d.stacksTouched, 0 < v.index && !1 === this.singleStacks && (I.points[G][0] = I.points[this.index +
                "," + D + ",0"][0])), "percent" === m ? (y = y ? b : p, r && F[y] && F[y][D] ? (y = F[y][D], I.total = y.total = Math.max(y.total, I.total) + Math.abs(M) || 0) : I.total = H(I.total + (Math.abs(M) || 0))) : I.total = H(I.total + (M || 0)), I.cum = q(I.cum, f) + (M || 0), null !== M && (I.points[G].push(I.cum), c[x] = I.cum);
                "percent" === m && (d.usePercentage = !0);
                this.stackedYData = c;
                d.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function () {
            var a = this, n = a.stackKey, c = a.yAxis.stacks, g = a.processedXData, m;
            l([n, "-" + n], function (h) {
                for (var f = g.length, e, b; f--;)if (e = g[f], m = a.getStackIndicator(m,
                        e, a.index, h), e = (b = c[h] && c[h][e]) && b.points[m.key])b = b.total ? 100 / b.total : 0, e[0] = H(e[0] * b), e[1] = H(e[1] * b), a.stackedYData[f] = e[1]
            })
        };
        a.prototype.getStackIndicator = function (a, l, c, g) {
            !w(a) || a.x !== l || g && a.key !== g ? a = {x: l, index: 0, key: g} : a.index++;
            a.key = [c, l, a.index].join();
            return a
        }
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.animate, E = a.Axis, H = a.createElement, w = a.css, k = a.defined, l = a.each, r = a.erase, q = a.extend, h = a.fireEvent, n = a.inArray, c = a.isNumber, g = a.isObject, m = a.merge, z = a.pick, f = a.Point, e = a.Series, b = a.seriesTypes,
            p = a.setAnimation, K = a.splat;
        q(a.Chart.prototype, {
            addSeries: function (a, b, c) {
                var d, e = this;
                a && (b = z(b, !0), h(e, "addSeries", {options: a}, function () {
                    d = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    b && e.redraw(c)
                }));
                return d
            },
            addAxis: function (a, b, c, e) {
                var d = b ? "xAxis" : "yAxis", f = this.options;
                a = m(a, {index: this[d].length, isX: b});
                new E(this, a);
                f[d] = K(f[d] || {});
                f[d].push(a);
                z(c, !0) && this.redraw(e)
            },
            showLoading: function (a) {
                var b = this, d = b.options, c = b.loadingDiv, e = d.loading, f = function () {
                    c && w(c, {
                        left: b.plotLeft +
                        "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px"
                    })
                };
                c || (b.loadingDiv = c = H("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = H("span", {className: "highcharts-loading-inner"}, null, c), C(b, "redraw", f));
                c.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || d.lang.loading;
                w(c, q(e.style, {zIndex: 10}));
                w(b.loadingSpan, e.labelStyle);
                b.loadingShown || (w(c, {opacity: 0, display: ""}), A(c, {opacity: e.style.opacity || .5}, {
                    duration: e.showDuration ||
                    0
                }));
                b.loadingShown = !0;
                f()
            },
            hideLoading: function () {
                var a = this.options, b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", A(b, {opacity: 0}, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        w(b, {display: "none"})
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: ["chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions"],
            update: function (a, b) {
                var d, e = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, f = a.chart, g, p;
                if (f) {
                    m(!0, this.options.chart, f);
                    "className" in f && this.setClassName(f.className);
                    if ("inverted" in f || "polar" in f)this.propFromSeries(), g = !0;
                    for (d in f)f.hasOwnProperty(d) && (-1 !== n("chart." + d, this.propsRequireUpdateSeries) && (p = !0), -1 !== n(d, this.propsRequireDirtyBox) && (this.isDirtyBox = !0));
                    "style" in
                    f && this.renderer.setStyle(f.style)
                }
                for (d in a) {
                    if (this[d] && "function" === typeof this[d].update)this[d].update(a[d], !1); else if ("function" === typeof this[e[d]])this[e[d]](a[d]);
                    "chart" !== d && -1 !== n(d, this.propsRequireUpdateSeries) && (p = !0)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && m(!0, this.options.plotOptions, a.plotOptions);
                l(["xAxis", "yAxis", "series"], function (b) {
                    a[b] && l(K(a[b]), function (a) {
                        var d = k(a.id) && this.get(a.id) || this[b][0];
                        d && d.coll === b && d.update(a, !1)
                    }, this)
                }, this);
                g && l(this.axes,
                    function (a) {
                        a.update({}, !1)
                    });
                p && l(this.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && m(!0, this.options.loading, a.loading);
                d = f && f.width;
                f = f && f.height;
                c(d) && d !== this.chartWidth || c(f) && f !== this.chartHeight ? this.setSize(d, f) : z(b, !0) && this.redraw()
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        q(f.prototype, {
            update: function (a, b, c, e) {
                function d() {
                    f.applyOptions(a);
                    null === f.y && m && (f.graphic = m.destroy());
                    g(a, !0) && (m && m.element && a && a.marker && a.marker.symbol && (f.graphic = m.destroy()), a && a.dataLabels &&
                    f.dataLabel && (f.dataLabel = f.dataLabel.destroy()));
                    h = f.index;
                    p.updateParallelArrays(f, h);
                    t.data[h] = g(t.data[h], !0) ? f.options : a;
                    p.isDirty = p.isDirtyData = !0;
                    !p.fixedBox && p.hasCartesianSeries && (v.isDirtyBox = !0);
                    "point" === t.legendType && (v.isDirtyLegend = !0);
                    b && v.redraw(c)
                }

                var f = this, p = f.series, m = f.graphic, h, v = p.chart, t = p.options;
                b = z(b, !0);
                !1 === e ? d() : f.firePointEvent("update", {options: a}, d)
            }, remove: function (a, b) {
                this.series.removePoint(n(this, this.series.data), a, b)
            }
        });
        q(e.prototype, {
            addPoint: function (a, b,
                                c, e) {
                var d = this.options, f = this.data, g = this.chart, p = this.xAxis && this.xAxis.names, m = d.data, h, v, t = this.xData, l, n;
                b = z(b, !0);
                h = {series: this};
                this.pointClass.prototype.applyOptions.apply(h, [a]);
                n = h.x;
                l = t.length;
                if (this.requireSorting && n < t[l - 1])for (v = !0; l && t[l - 1] > n;)l--;
                this.updateParallelArrays(h, "splice", l, 0, 0);
                this.updateParallelArrays(h, l);
                p && h.name && (p[n] = h.name);
                m.splice(l, 0, a);
                v && (this.data.splice(l, 0, null), this.processData());
                "point" === d.legendType && this.generatePoints();
                c && (f[0] && f[0].remove ? f[0].remove(!1) :
                    (f.shift(), this.updateParallelArrays(h, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && g.redraw(e)
            }, removePoint: function (a, b, c) {
                var d = this, e = d.data, f = e[a], g = d.points, m = d.chart, h = function () {
                    g && g.length === e.length && g.splice(a, 1);
                    e.splice(a, 1);
                    d.options.data.splice(a, 1);
                    d.updateParallelArrays(f || {series: d}, "splice", a, 1);
                    f && f.destroy();
                    d.isDirty = !0;
                    d.isDirtyData = !0;
                    b && m.redraw()
                };
                p(c, m);
                b = z(b, !0);
                f ? f.firePointEvent("remove", null, h) : h()
            }, remove: function (a, b, c) {
                function d() {
                    e.destroy();
                    f.isDirtyLegend =
                        f.isDirtyBox = !0;
                    f.linkSeries();
                    z(a, !0) && f.redraw(b)
                }

                var e = this, f = e.chart;
                !1 !== c ? h(e, "remove", null, d) : d()
            }, update: function (a, c) {
                var d = this, e = this.chart, f = this.userOptions, g = this.type, p = a.type || f.type || e.options.chart.type, h = b[g].prototype, n = ["group", "markerGroup", "dataLabelsGroup"], k;
                if (p && p !== g || void 0 !== a.zIndex)n.length = 0;
                l(n, function (a) {
                    n[a] = d[a];
                    delete d[a]
                });
                a = m(f, {animation: !1, index: this.index, pointStart: this.xData[0]}, {data: this.options.data}, a);
                this.remove(!1, null, !1);
                for (k in h)this[k] = void 0;
                q(this, b[p || g].prototype);
                l(n, function (a) {
                    d[a] = n[a]
                });
                this.init(e, a);
                e.linkSeries();
                z(c, !0) && e.redraw(!1)
            }
        });
        q(E.prototype, {
            update: function (a, b) {
                var d = this.chart;
                a = d.options[this.coll][this.options.index] = m(this.userOptions, a);
                this.destroy(!0);
                this.init(d, q(a, {events: void 0}));
                d.isDirtyBox = !0;
                z(b, !0) && d.redraw()
            }, remove: function (a) {
                for (var b = this.chart, d = this.coll, c = this.series, e = c.length; e--;)c[e] && c[e].remove(!1);
                r(b.axes, this);
                r(b[d], this);
                b.options[d].splice(this.options.index, 1);
                l(b[d], function (a,
                                  b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                z(a, !0) && b.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(N);
    (function (a) {
        var C = a.color, A = a.each, E = a.map, H = a.pick, w = a.Series, k = a.seriesType;
        k("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function () {
                var a = [], k = [], q = this.xAxis, h = this.yAxis, n = h.stacks[this.stackKey], c = {}, g = this.points, m = this.index, z = h.series, f = z.length, e, b = H(h.options.reversedStacks,
                    !0) ? 1 : -1, p, w;
                if (this.options.stacking) {
                    for (p = 0; p < g.length; p++)c[g[p].x] = g[p];
                    for (w in n)null !== n[w].total && k.push(w);
                    k.sort(function (a, b) {
                        return a - b
                    });
                    e = E(z, function () {
                        return this.visible
                    });
                    A(k, function (d, g) {
                        var t = 0, v, l;
                        if (c[d] && !c[d].isNull)a.push(c[d]), A([-1, 1], function (a) {
                            var h = 1 === a ? "rightNull" : "leftNull", t = 0, y = n[k[g + a]];
                            if (y)for (p = m; 0 <= p && p < f;)v = y.points[p], v || (p === m ? c[d][h] = !0 : e[p] && (l = n[d].points[p]) && (t -= l[1] - l[0])), p += b;
                            c[d][1 === a ? "rightCliff" : "leftCliff"] = t
                        }); else {
                            for (p = m; 0 <= p && p < f;) {
                                if (v =
                                        n[d].points[p]) {
                                    t = v[1];
                                    break
                                }
                                p += b
                            }
                            t = h.toPixels(t, !0);
                            a.push({isNull: !0, plotX: q.toPixels(d, !0), plotY: t, yBottom: t})
                        }
                    })
                }
                return a
            }, getGraphPath: function (a) {
                var l = w.prototype.getGraphPath, k = this.options, h = k.stacking, n = this.yAxis, c, g, m = [], z = [], f = this.index, e, b = n.stacks[this.stackKey], p = k.threshold, K = n.getThreshold(k.threshold), d, k = k.connectNulls || "percent" === h, F = function (d, c, g) {
                    var v = a[d];
                    d = h && b[v.x].points[f];
                    var t = v[g + "Null"] || 0;
                    g = v[g + "Cliff"] || 0;
                    var x, l, v = !0;
                    g || t ? (x = (t ? d[0] : d[1]) + g, l = d[0] + g, v = !!t) : !h &&
                    a[c] && a[c].isNull && (x = l = p);
                    void 0 !== x && (z.push({
                        plotX: e,
                        plotY: null === x ? K : n.getThreshold(x),
                        isNull: v
                    }), m.push({plotX: e, plotY: null === l ? K : n.getThreshold(l), doCurve: !1}))
                };
                a = a || this.points;
                h && (a = this.getStackPoints());
                for (c = 0; c < a.length; c++)if (g = a[c].isNull, e = H(a[c].rectPlotX, a[c].plotX), d = H(a[c].yBottom, K), !g || k)k || F(c, c - 1, "left"), g && !h && k || (z.push(a[c]), m.push({
                    x: c,
                    plotX: e,
                    plotY: d
                })), k || F(c, c + 1, "right");
                c = l.call(this, z, !0, !0);
                m.reversed = !0;
                g = l.call(this, m, !0, !0);
                g.length && (g[0] = "L");
                g = c.concat(g);
                l =
                    l.call(this, z, !1, k);
                g.xMap = c.xMap;
                this.areaPath = g;
                return l
            }, drawGraph: function () {
                this.areaPath = [];
                w.prototype.drawGraph.apply(this);
                var a = this, k = this.areaPath, q = this.options, h = [["area", "highcharts-area", this.color, q.fillColor]];
                A(this.zones, function (l, c) {
                    h.push(["zone-area-" + c, "highcharts-area highcharts-zone-area-" + c + " " + l.className, l.color || a.color, l.fillColor || q.fillColor])
                });
                A(h, function (h) {
                    var c = h[0], g = a[c];
                    g ? (g.endX = k.xMap, g.animate({d: k})) : (g = a[c] = a.chart.renderer.path(k).addClass(h[1]).attr({
                        fill: H(h[3],
                            C(h[2]).setOpacity(H(q.fillOpacity, .75)).get()), zIndex: 0
                    }).add(a.group), g.isArea = !0);
                    g.startX = k.xMap;
                    g.shiftUnit = q.step ? 2 : 1
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(N);
    (function (a) {
        var C = a.extendClass, A = a.merge, E = a.pick, H = a.Series, w = a.seriesTypes;
        a.defaultPlotOptions.spline = A(a.defaultPlotOptions.line);
        w.spline = C(H, {
            type: "spline", getPointSpline: function (a, l, r) {
                var k = l.plotX, h = l.plotY, n = a[r - 1];
                r = a[r + 1];
                var c, g, m, z;
                if (n && !n.isNull && !1 !== n.doCurve && r && !r.isNull && !1 !== r.doCurve) {
                    a = n.plotY;
                    m = r.plotX;
                    r = r.plotY;
                    var f = 0;
                    c = (1.5 * k + n.plotX) / 2.5;
                    g = (1.5 * h + a) / 2.5;
                    m = (1.5 * k + m) / 2.5;
                    z = (1.5 * h + r) / 2.5;
                    m !== c && (f = (z - g) * (m - k) / (m - c) + h - z);
                    g += f;
                    z += f;
                    g > a && g > h ? (g = Math.max(a, h), z = 2 * h - g) : g < a && g < h && (g = Math.min(a, h), z = 2 * h - g);
                    z > r && z > h ? (z = Math.max(r, h), g = 2 * h - z) : z < r && z < h && (z = Math.min(r, h), g = 2 * h - z);
                    l.rightContX = m;
                    l.rightContY = z
                }
                l = ["C", E(n.rightContX, n.plotX), E(n.rightContY, n.plotY), E(c, k), E(g, h), k, h];
                n.rightContX = n.rightContY = null;
                return l
            }
        })
    })(N);
    (function (a) {
        var C = a.seriesTypes.area.prototype, A = a.seriesType;
        A("areaspline",
            "spline", a.defaultPlotOptions.area, {
                getStackPoints: C.getStackPoints,
                getGraphPath: C.getGraphPath,
                setStackCliffs: C.setStackCliffs,
                drawGraph: C.drawGraph,
                drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
            })
    })(N);
    (function (a) {
        var C = a.animObject, A = a.color, E = a.each, H = a.extend, w = a.isNumber, k = a.merge, l = a.pick, r = a.Series, q = a.seriesType, h = a.stop, n = a.svg;
        q("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1, brightness: .1,
                    shadow: !1
                }, select: {color: "#cccccc", borderColor: "#000000", shadow: !1}
            },
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                r.prototype.init.apply(this, arguments);
                var a = this, g = a.chart;
                g.hasRendered && E(g.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a =
                    this, g = a.options, m = a.xAxis, h = a.yAxis, f = m.reversed, e, b = {}, p = 0;
                !1 === g.grouping ? p = 1 : E(a.chart.series, function (d) {
                    var c = d.options, f = d.yAxis, g;
                    d.type === a.type && d.visible && h.len === f.len && h.pos === f.pos && (c.stacking ? (e = d.stackKey, void 0 === b[e] && (b[e] = p++), g = b[e]) : !1 !== c.grouping && (g = p++), d.columnIndex = g)
                });
                var k = Math.min(Math.abs(m.transA) * (m.ordinalSlope || g.pointRange || m.closestPointRange || m.tickInterval || 1), m.len), d = k * g.groupPadding, n = (k - 2 * d) / p, g = Math.min(g.maxPointWidth || m.len, l(g.pointWidth, n * (1 - 2 * g.pointPadding)));
                a.columnMetrics = {
                    width: g,
                    offset: (n - g) / 2 + (d + ((a.columnIndex || 0) + (f ? 1 : 0)) * n - k / 2) * (f ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, g, m, h) {
                var c = this.chart, e = this.borderWidth, b = -(e % 2 ? .5 : 0), e = e % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (e += 1);
                m = Math.round(a + m) + b;
                a = Math.round(a) + b;
                h = Math.round(g + h) + e;
                b = .5 >= Math.abs(g) && .5 < h;
                g = Math.round(g) + e;
                h -= g;
                b && h && (--g, h += 1);
                return {x: a, y: g, width: m - a, height: h}
            },
            translate: function () {
                var a = this, g = a.chart, m = a.options, h = a.dense = 2 > a.closestPointRange * a.xAxis.transA, h = a.borderWidth =
                    l(m.borderWidth, h ? 0 : 1), f = a.yAxis, e = a.translatedThreshold = f.getThreshold(m.threshold), b = l(m.minPointLength, 5), p = a.getColumnMetrics(), k = p.width, d = a.barW = Math.max(k, 1 + 2 * h), n = a.pointXOffset = p.offset;
                g.inverted && (e -= .5);
                m.pointPadding && (d = Math.ceil(d));
                r.prototype.translate.apply(a);
                E(a.points, function (c) {
                    var p = l(c.yBottom, e), m = 999 + Math.abs(p), m = Math.min(Math.max(-m, c.plotY), f.len + m), h = c.plotX + n, t = d, x = Math.min(m, p), D, z = Math.max(m, p) - x;
                    Math.abs(z) < b && b && (z = b, D = !f.reversed && !c.negative || f.reversed && c.negative,
                        x = Math.abs(x - e) > b ? p - b : e - (D ? b : 0));
                    c.barX = h;
                    c.pointWidth = k;
                    c.tooltipPos = g.inverted ? [f.len + f.pos - g.plotLeft - m, a.xAxis.len - h - t / 2, z] : [h + t / 2, m + f.pos - g.plotTop, z];
                    c.shapeType = "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [c.plotX, f.len / 2, 0, 0] : [h, x, t, z])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, g) {
                var c = this.options, h = this.pointAttrToOptions || {}, f = h.stroke ||
                    "borderColor", e = h["stroke-width"] || "borderWidth", b = a && a.color || this.color, p = a[f] || c[f] || this.color || b, h = c.dashStyle, l;
                a && this.zones.length && (b = (b = a.getZone()) && b.color || a.options.color || this.color);
                g && (g = c.states[g], l = g.brightness, b = g.color || void 0 !== l && A(b).brighten(g.brightness).get() || b, p = g[f] || p, h = g.dashStyle || h);
                a = {fill: b, stroke: p, "stroke-width": a[e] || c[e] || this[e] || 0};
                c.borderRadius && (a.r = c.borderRadius);
                h && (a.dashstyle = h);
                return a
            },
            drawPoints: function () {
                var a = this, g = this.chart, m = a.options,
                    l = g.renderer, f = m.animationLimit || 250, e;
                E(a.points, function (b) {
                    var c = b.graphic;
                    w(b.plotY) && null !== b.y ? (e = b.shapeArgs, c ? (h(c), c[g.pointCount < f ? "animate" : "attr"](k(e))) : b.graphic = c = l[b.shapeType](e).attr({"class": b.getClassName()}).add(b.group || a.group), c.attr(a.pointAttribs(b, b.selected && "select")).shadow(m.shadow, null, m.stacking && !m.borderRadius)) : c && (b.graphic = c.destroy())
                })
            },
            animate: function (a) {
                var c = this, h = this.yAxis, l = c.options, f = this.chart.inverted, e = {};
                n && (a ? (e.scaleY = .001, a = Math.min(h.pos + h.len,
                    Math.max(h.pos, h.toPixels(l.threshold))), f ? e.translateX = a - h.len : e.translateY = a, c.group.attr(e)) : (e[f ? "translateX" : "translateY"] = h.pos, c.group.animate(e, H(C(c.options.animation), {
                    step: function (a, e) {
                        c.group.attr({scaleY: Math.max(.001, e.pos)})
                    }
                })), c.animate = null))
            },
            remove: function () {
                var a = this, g = a.chart;
                g.hasRendered && E(g.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                r.prototype.remove.apply(a, arguments)
            }
        })
    })(N);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(N);
    (function (a) {
        var C =
            a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            marker: {enabled: !0},
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            kdDimensions: 2,
            drawGraph: function () {
                this.options.lineWidth &&
                C.prototype.drawGraph.call(this)
            }
        })
    })(N);
    (function (a) {
        var C = a.pick, A = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, H = this.chart, w = 2 * (a.slicedOffset || 0), k = H.plotWidth - 2 * w, H = H.plotHeight - 2 * w, l = a.center, l = [C(l[0], "50%"), C(l[1], "50%"), a.size || "100%", a.innerSize || 0], r = Math.min(k, H), q, h;
                for (q = 0; 4 > q; ++q)h = l[q], a = 2 > q || 2 === q && /%$/.test(h), l[q] = A(h, [k, H, r, l[2]][q]) + (a ? w : 0);
                l[3] > l[2] && (l[3] = l[2]);
                return l
            }
        }
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.defined, E = a.each, H = a.extend,
            w = a.inArray, k = a.noop, l = a.pick, r = a.Point, q = a.Series, h = a.seriesType, n = a.setAnimation;
        h("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30, enabled: !0, formatter: function () {
                    return null === this.y ? void 0 : this.point.name
                }, x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0},
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {hover: {brightness: .1, shadow: !1}}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this, h = c.points, l = c.startAngleRad;
                a || (E(h, function (a) {
                    var e = a.graphic, b = a.shapeArgs;
                    e && (e.attr({r: a.startR || c.center[3] / 2, start: l, end: l}), e.animate({
                        r: b.r,
                        start: b.start,
                        end: b.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a, g = 0, h = this.points, l = h.length, f, e = this.options.ignoreHiddenPoint;
                for (a = 0; a < l; a++)f = h[a], 0 > f.y &&
                (f.y = null), g += e && !f.visible ? 0 : f.y;
                this.total = g;
                for (a = 0; a < l; a++)f = h[a], f.percentage = 0 < g && (f.visible || !e) ? f.y / g * 100 : 0, f.total = g
            },
            generatePoints: function () {
                q.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0, h = this.options, k = h.slicedOffset, f = k + (h.borderWidth || 0), e, b, p, n = h.startAngle || 0, d = this.startAngleRad = Math.PI / 180 * (n - 90), n = (this.endAngleRad = Math.PI / 180 * (l(h.endAngle, n + 360) - 90)) - d, q = this.points, t = h.dataLabels.distance, h = h.ignoreHiddenPoint,
                    v, y = q.length, r;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, d) {
                    p = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + t), 1));
                    return a[0] + (d ? -1 : 1) * Math.cos(p) * (a[2] / 2 + t)
                };
                for (v = 0; v < y; v++) {
                    r = q[v];
                    e = d + c * n;
                    if (!h || r.visible)c += r.percentage / 100;
                    b = d + c * n;
                    r.shapeType = "arc";
                    r.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * e) / 1E3,
                        end: Math.round(1E3 * b) / 1E3
                    };
                    p = (b + e) / 2;
                    p > 1.5 * Math.PI ? p -= 2 * Math.PI : p < -Math.PI / 2 && (p += 2 * Math.PI);
                    r.slicedTranslation = {
                        translateX: Math.round(Math.cos(p) * k), translateY: Math.round(Math.sin(p) *
                            k)
                    };
                    e = Math.cos(p) * a[2] / 2;
                    b = Math.sin(p) * a[2] / 2;
                    r.tooltipPos = [a[0] + .7 * e, a[1] + .7 * b];
                    r.half = p < -Math.PI / 2 || p > Math.PI / 2 ? 1 : 0;
                    r.angle = p;
                    f = Math.min(f, t / 5);
                    r.labelPos = [a[0] + e + Math.cos(p) * t, a[1] + b + Math.sin(p) * t, a[0] + e + Math.cos(p) * f, a[1] + b + Math.sin(p) * f, a[0] + e, a[1] + b, 0 > t ? "center" : r.half ? "right" : "left", p]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this, g = a.chart.renderer, h, l, f, e, b = a.options.shadow;
                b && !a.shadowGroup && (a.shadowGroup = g.g("shadow").add(a.group));
                E(a.points, function (c) {
                    if (null !== c.y) {
                        l = c.graphic;
                        e = c.shapeArgs;
                        h = c.sliced ? c.slicedTranslation : {};
                        var p = c.shadowGroup;
                        b && !p && (p = c.shadowGroup = g.g("shadow").add(a.shadowGroup));
                        p && p.attr(h);
                        f = a.pointAttribs(c, c.selected && "select");
                        l ? l.setRadialReference(a.center).attr(f).animate(H(e, h)) : (c.graphic = l = g[c.shapeType](e).addClass(c.getClassName()).setRadialReference(a.center).attr(h).add(a.group), c.visible || l.attr({visibility: "hidden"}), l.attr(f).attr({"stroke-linejoin": "round"}).shadow(b, p))
                    }
                })
            },
            searchPoint: k,
            sortByAngle: function (a, g) {
                a.sort(function (a,
                                 c) {
                    return void 0 !== a.angle && (c.angle - a.angle) * g
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: k
        }, {
            init: function () {
                r.prototype.init.apply(this, arguments);
                var a = this, g;
                a.name = l(a.name, "Slice");
                g = function (c) {
                    a.slice("select" === c.type)
                };
                C(a, "select", g);
                C(a, "unselect", g);
                return a
            }, setVisible: function (a, g) {
                var c = this, h = c.series, f = h.chart, e = h.options.ignoreHiddenPoint;
                g = l(g, e);
                a !== c.visible && (c.visible = c.options.visible = a = void 0 === a ? !c.visible :
                    a, h.options.data[w(c, h.data)] = c.options, E(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (c[b])c[b][a ? "show" : "hide"](!0)
                }), c.legendItem && f.legend.colorizeItem(c, a), a || "hover" !== c.state || c.setState(""), e && (h.isDirty = !0), g && f.redraw())
            }, slice: function (a, g, h) {
                var c = this.series;
                n(h, c.chart);
                l(g, !0);
                this.sliced = this.options.sliced = a = A(a) ? a : !this.sliced;
                c.options.data[w(this, c.data)] = this.options;
                a = a ? this.slicedTranslation : {translateX: 0, translateY: 0};
                this.graphic.animate(a);
                this.shadowGroup &&
                this.shadowGroup.animate(a)
            }, haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.arrayMax, E = a.defined, H = a.each, w = a.extend, k = a.format, l = a.map, r = a.merge, q = a.noop, h = a.pick, n = a.relativeLength, c = a.Series, g = a.seriesTypes, m = a.stableSort, z = a.stop;
        a.distribute = function (a, c) {
            function b(a, b) {
                return a.target - b.target
            }

            var e, f = !0, d = a,
                g = [], h;
            h = 0;
            for (e = a.length; e--;)h += a[e].size;
            if (h > c) {
                m(a, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (h = e = 0; h <= c;)h += a[e].size, e++;
                g = a.splice(e - 1, a.length)
            }
            m(a, b);
            for (a = l(a, function (a) {
                return {size: a.size, targets: [a.target]}
            }); f;) {
                for (e = a.length; e--;)f = a[e], h = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, h - f.size / 2), c - f.size);
                e = a.length;
                for (f = !1; e--;)0 < e && a[e - 1].pos + a[e - 1].size > a[e].pos && (a[e - 1].size += a[e].size, a[e - 1].targets = a[e - 1].targets.concat(a[e].targets),
                a[e - 1].pos + a[e - 1].size > c && (a[e - 1].pos = c - a[e - 1].size), a.splice(e, 1), f = !0)
            }
            e = 0;
            H(a, function (a) {
                var b = 0;
                H(a.targets, function () {
                    d[e].pos = a.pos + b;
                    b += d[e].size;
                    e++
                })
            });
            d.push.apply(d, g);
            m(d, b)
        };
        c.prototype.drawDataLabels = function () {
            var a = this, c = a.options, b = c.dataLabels, g = a.points, m, d, l = a.hasRendered || 0, t, v, y = h(b.defer, !0), n = a.chart.renderer;
            if (b.enabled || a._hasPointLabels)a.dlProcessOptions && a.dlProcessOptions(b), v = a.plotGroup("dataLabelsGroup", "data-labels", y && !l ? "hidden" : "visible", b.zIndex || 6), y && (v.attr({opacity: +l}),
            l || C(a, "afterAnimate", function () {
                a.visible && v.show(!0);
                v[c.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), d = b, H(g, function (e) {
                var f, g = e.dataLabel, p, l, y = e.connector, q = !0, z, B = {};
                m = e.dlOptions || e.options && e.options.dataLabels;
                f = h(m && m.enabled, d.enabled) && null !== e.y;
                if (g && !f)e.dataLabel = g.destroy(); else if (f) {
                    b = r(d, m);
                    z = b.style;
                    f = b.rotation;
                    p = e.getLabelConfig();
                    t = b.format ? k(b.format, p) : b.formatter.call(p, b);
                    z.color = h(b.color, z.color, a.color, "#000000");
                    if (g)E(t) ? (g.attr({text: t}), q = !1) : (e.dataLabel =
                        g = g.destroy(), y && (e.connector = y.destroy())); else if (E(t)) {
                        g = {
                            fill: b.backgroundColor,
                            stroke: b.borderColor,
                            "stroke-width": b.borderWidth,
                            r: b.borderRadius || 0,
                            rotation: f,
                            padding: b.padding,
                            zIndex: 1
                        };
                        "contrast" === z.color && (B.color = b.inside || 0 > b.distance || c.stacking ? n.getContrast(e.color || a.color) : "#000000");
                        c.cursor && (B.cursor = c.cursor);
                        for (l in g)void 0 === g[l] && delete g[l];
                        g = e.dataLabel = n[f ? "text" : "label"](t, 0, -9999, b.shape, null, null, b.useHTML, null, "data-label").attr(g);
                        g.addClass("highcharts-data-label-color-" +
                            e.colorIndex + " " + (b.className || ""));
                        g.css(w(z, B));
                        g.add(v);
                        g.shadow(b.shadow)
                    }
                    g && a.alignDataLabel(e, g, b, null, q)
                }
            })
        };
        c.prototype.alignDataLabel = function (a, c, b, g, m) {
            var d = this.chart, e = d.inverted, f = h(a.plotX, -9999), p = h(a.plotY, -9999), l = c.getBBox(), n, k = b.rotation, x = b.align, D = this.visible && (a.series.forceDL || d.isInsidePlot(f, Math.round(p), e) || g && d.isInsidePlot(f, e ? g.x + 1 : g.y + g.height - 1, e)), q = "justify" === h(b.overflow, "justify");
            D && (n = b.style.fontSize, n = d.renderer.fontMetrics(n, c).b, g = w({
                x: e ? d.plotWidth -
                p : f, y: Math.round(e ? d.plotHeight - f : p), width: 0, height: 0
            }, g), w(b, {
                width: l.width,
                height: l.height
            }), k ? (q = !1, e = d.renderer.rotCorr(n, k), e = {
                x: g.x + b.x + g.width / 2 + e.x,
                y: g.y + b.y + {top: 0, middle: .5, bottom: 1}[b.verticalAlign] * g.height
            }, c[m ? "attr" : "animate"](e).attr({align: x}), f = (k + 720) % 360, f = 180 < f && 360 > f, "left" === x ? e.y -= f ? l.height : 0 : "center" === x ? (e.x -= l.width / 2, e.y -= l.height / 2) : "right" === x && (e.x -= l.width, e.y -= f ? 0 : l.height)) : (c.align(b, null, g), e = c.alignAttr), q ? this.justifyDataLabel(c, b, e, l, g, m) : h(b.crop, !0) && (D = d.isInsidePlot(e.x,
                    e.y) && d.isInsidePlot(e.x + l.width, e.y + l.height)), b.shape && !k && c.attr({
                anchorX: a.plotX,
                anchorY: a.plotY
            }));
            D || (z(c), c.attr({y: -9999}), c.placed = !1)
        };
        c.prototype.justifyDataLabel = function (a, e, b, c, g, d) {
            var f = this.chart, h = e.align, p = e.verticalAlign, m, l, n = a.box ? 0 : a.padding || 0;
            m = b.x + n;
            0 > m && ("right" === h ? e.align = "left" : e.x = -m, l = !0);
            m = b.x + c.width - n;
            m > f.plotWidth && ("left" === h ? e.align = "right" : e.x = f.plotWidth - m, l = !0);
            m = b.y + n;
            0 > m && ("bottom" === p ? e.verticalAlign = "top" : e.y = -m, l = !0);
            m = b.y + c.height - n;
            m > f.plotHeight && ("top" ===
            p ? e.verticalAlign = "bottom" : e.y = f.plotHeight - m, l = !0);
            l && (a.placed = !d, a.align(e, null, g))
        };
        g.pie && (g.pie.prototype.drawDataLabels = function () {
            var f = this, e = f.data, b, g = f.chart, m = f.options.dataLabels, d = h(m.connectorPadding, 10), n = h(m.connectorWidth, 1), t = g.plotWidth, v = g.plotHeight, k, q = m.distance, r = f.center, x = r[2] / 2, D = r[1], z = 0 < q, u, w, C, E, B = [[], []], L, P, R, S, T = [0, 0, 0, 0];
            f.visible && (m.enabled || f._hasPointLabels) && (c.prototype.drawDataLabels.apply(f), H(e, function (a) {
                a.dataLabel && a.visible && (B[a.half].push(a), a.dataLabel._pos =
                    null)
            }), H(B, function (e, c) {
                var h, p, k = e.length, n, y, B;
                if (k)for (f.sortByAngle(e, c - .5), 0 < q && (h = Math.max(0, D - x - q), p = Math.min(D + x + q, g.plotHeight), n = l(e, function (a) {
                    if (a.dataLabel)return B = a.dataLabel.getBBox().height || 21, {
                        target: a.labelPos[1] - h + B / 2,
                        size: B,
                        rank: a.y
                    }
                }), a.distribute(n, p + B - h)), S = 0; S < k; S++)b = e[S], C = b.labelPos, u = b.dataLabel, R = !1 === b.visible ? "hidden" : "inherit", y = C[1], n ? void 0 === n[S].pos ? R = "hidden" : (E = n[S].size, P = h + n[S].pos) : P = y, L = m.justify ? r[0] + (c ? -1 : 1) * (x + q) : f.getX(P < h + 2 || P > p - 2 ? y : P, c), u._attr =
                {visibility: R, align: C[6]}, u._pos = {
                    x: L + m.x + ({left: d, right: -d}[C[6]] || 0),
                    y: P + m.y - 10
                }, C.x = L, C.y = P, null === f.options.size && (w = u.width, L - w < d ? T[3] = Math.max(Math.round(w - L + d), T[3]) : L + w > t - d && (T[1] = Math.max(Math.round(L + w - t + d), T[1])), 0 > P - E / 2 ? T[0] = Math.max(Math.round(-P + E / 2), T[0]) : P + E / 2 > v && (T[2] = Math.max(Math.round(P + E / 2 - v), T[2])))
            }), 0 === A(T) || this.verifyDataLabelOverflow(T)) && (this.placeDataLabels(), z && n && H(this.points, function (a) {
                var b;
                k = a.connector;
                if ((u = a.dataLabel) && u._pos && a.visible) {
                    R = u._attr.visibility;
                    if (b = !k)a.connector = k = g.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(f.dataLabelsGroup), k.attr({
                        "stroke-width": n,
                        stroke: m.connectorColor || a.color || "#666666"
                    });
                    k[b ? "attr" : "animate"]({d: f.connectorPath(a.labelPos)});
                    k.attr("visibility", R)
                } else k && (a.connector = k.destroy())
            }))
        }, g.pie.prototype.connectorPath = function (a) {
            var e = a.x, b = a.y;
            return h(this.options.softConnector, !0) ? ["M", e + ("left" === a[6] ? 5 : -5), b, "C", e, b, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4],
                a[5]] : ["M", e + ("left" === a[6] ? 5 : -5), b, "L", a[2], a[3], "L", a[4], a[5]]
        }, g.pie.prototype.placeDataLabels = function () {
            H(this.points, function (a) {
                var e = a.dataLabel;
                e && a.visible && ((a = e._pos) ? (e.attr(e._attr), e[e.moved ? "animate" : "attr"](a), e.moved = !0) : e && e.attr({y: -9999}))
            })
        }, g.pie.prototype.alignDataLabel = q, g.pie.prototype.verifyDataLabelOverflow = function (a) {
            var e = this.center, b = this.options, c = b.center, f = b.minSize || 80, d, g;
            null !== c[0] ? d = Math.max(e[2] - Math.max(a[1], a[3]), f) : (d = Math.max(e[2] - a[1] - a[3], f), e[0] += (a[3] -
                a[1]) / 2);
            null !== c[1] ? d = Math.max(Math.min(d, e[2] - Math.max(a[0], a[2])), f) : (d = Math.max(Math.min(d, e[2] - a[0] - a[2]), f), e[1] += (a[0] - a[2]) / 2);
            d < e[2] ? (e[2] = d, e[3] = Math.min(n(b.innerSize || 0, d), d), this.translate(e), this.drawDataLabels && this.drawDataLabels()) : g = !0;
            return g
        });
        g.column && (g.column.prototype.alignDataLabel = function (a, e, b, g, m) {
            var d = this.chart.inverted, f = a.series, p = a.dlBox || a.shapeArgs, l = h(a.below, a.plotY > h(this.translatedThreshold, f.yAxis.len)), n = h(b.inside, !!this.options.stacking);
            p && (g = r(p), 0 >
            g.y && (g.height += g.y, g.y = 0), p = g.y + g.height - f.yAxis.len, 0 < p && (g.height -= p), d && (g = {
                x: f.yAxis.len - g.y - g.height,
                y: f.xAxis.len - g.x - g.width,
                width: g.height,
                height: g.width
            }), n || (d ? (g.x += l ? 0 : g.width, g.width = 0) : (g.y += l ? g.height : 0, g.height = 0)));
            b.align = h(b.align, !d || n ? "center" : l ? "right" : "left");
            b.verticalAlign = h(b.verticalAlign, d || n ? "middle" : l ? "top" : "bottom");
            c.prototype.alignDataLabel.call(this, a, e, b, g, m)
        })
    })(N);
    (function (a) {
        var C = a.Chart, A = a.each, E = a.pick, H = a.addEvent;
        C.prototype.callbacks.push(function (a) {
            function k() {
                var l =
                    [];
                A(a.series, function (a) {
                    var k = a.options.dataLabels, h = a.dataLabelCollections || ["dataLabel"];
                    (k.enabled || a._hasPointLabels) && !k.allowOverlap && a.visible && A(h, function (h) {
                        A(a.points, function (a) {
                            a[h] && (a[h].labelrank = E(a.labelrank, a.shapeArgs && a.shapeArgs.height), l.push(a[h]))
                        })
                    })
                });
                a.hideOverlappingLabels(l)
            }

            k();
            H(a, "redraw", k)
        });
        C.prototype.hideOverlappingLabels = function (a) {
            var k = a.length, l, r, q, h, n, c, g, m, z, f = function (a, b, c, f, d, g, h, m) {
                return !(d > a + c || d + h < a || g > b + f || g + m < b)
            };
            for (r = 0; r < k; r++)if (l = a[r])l.oldOpacity =
                l.opacity, l.newOpacity = 1;
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < k; r++)for (q = a[r], l = r + 1; l < k; ++l)if (h = a[l], q && h && q.placed && h.placed && 0 !== q.newOpacity && 0 !== h.newOpacity && (n = q.alignAttr, c = h.alignAttr, g = q.parentGroup, m = h.parentGroup, z = 2 * (q.box ? 0 : q.padding), n = f(n.x + g.translateX, n.y + g.translateY, q.width - z, q.height - z, c.x + m.translateX, c.y + m.translateY, h.width - z, h.height - z)))(q.labelrank < h.labelrank ? q : h).newOpacity = 0;
            A(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !==
                c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.Chart, E = a.createElement, H = a.css, w = a.defaultOptions, k = a.defaultPlotOptions, l = a.each, r = a.extend, q = a.fireEvent, h = a.hasTouch, n = a.inArray, c = a.isObject, g = a.Legend, m = a.merge, z = a.pick, f = a.Point, e = a.Series, b = a.seriesTypes, p = a.svg, K;
        K = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart, c = b.pointer, e = function (a) {
                    for (var d =
                        a.target, c; d && !c;)c = d.point, d = d.parentNode;
                    if (void 0 !== c && c !== b.hoverPoint)c.onMouseOver(a)
                };
                l(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.element.point = a)
                });
                a._hasTracking || (l(a.trackerGroups, function (b) {
                    if (a[b]) {
                        a[b].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function (a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (h)a[b].on("touchstart", e);
                        a.options.cursor && a[b].css(H).css({cursor: a.options.cursor})
                    }
                }), a._hasTracking = !0)
            }, drawTrackerGraph: function () {
                var a =
                    this, b = a.options, c = b.trackByArea, e = [].concat(c ? a.areaPath : a.graphPath), f = e.length, g = a.chart, m = g.pointer, x = g.renderer, n = g.options.tooltip.snap, k = a.tracker, u, q = function () {
                    if (g.hoverSeries !== a)a.onMouseOver()
                }, r = "rgba(192,192,192," + (p ? .0001 : .002) + ")";
                if (f && !c)for (u = f + 1; u--;)"M" === e[u] && e.splice(u + 1, 0, e[u + 1] - n, e[u + 2], "L"), (u && "M" === e[u] || u === f) && e.splice(u, 0, "L", e[u - 2] + n, e[u - 1]);
                k ? k.attr({d: e}) : a.graph && (a.tracker = x.path(e).attr({
                    "stroke-linejoin": "round", visibility: a.visible ? "visible" : "hidden", stroke: r,
                    fill: c ? r : "none", "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * n), zIndex: 2
                }).add(a.group), l([a.tracker, a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", q).on("mouseout", function (a) {
                        m.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({cursor: b.cursor});
                    if (h)a.on("touchstart", q)
                }))
            }
        };
        b.column && (b.column.prototype.drawTracker = K.drawTrackerPoint);
        b.pie && (b.pie.prototype.drawTracker = K.drawTrackerPoint);
        b.scatter && (b.scatter.prototype.drawTracker = K.drawTrackerPoint);
        r(g.prototype, {
            setItemEvents: function (a,
                                     b, c) {
                var d = this, e = d.chart, f = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.seriesGroup.addClass(f);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(a.visible ? d.itemStyle : d.itemHiddenStyle);
                    e.seriesGroup.removeClass(f);
                    a.setState()
                }).on("click", function (b) {
                    var d = function () {
                        a.setVisible && a.setVisible()
                    };
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, d) : q(a, "legendItemClick", b, d)
                })
            },
            createCheckboxForItem: function (a) {
                a.checkbox = E("input", {
                    type: "checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function (b) {
                    q(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        w.legend.itemStyle.cursor = "pointer";
        r(A.prototype, {
            showResetZoom: function () {
                var a = this, b = w.lang, c = a.options.chart.resetZoomButton, e = c.theme, f = e.states, g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton =
                    a.renderer.button(b.resetZoom, null, null, function () {
                        a.zoomOut()
                    }, e, f && f.hover).attr({
                        align: c.position.align,
                        title: b.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
            }, zoomOut: function () {
                var a = this;
                q(a, "selection", {resetSelection: !0}, function () {
                    a.zoom()
                })
            }, zoom: function (a) {
                var b, d = this.pointer, e = !1, f;
                !a || a.resetSelection ? l(this.axes, function (a) {
                    b = a.zoom()
                }) : l(a.xAxis.concat(a.yAxis), function (a) {
                    var c = a.axis, f = c.isXAxis;
                    if (d[f ? "zoomX" : "zoomY"] || d[f ? "pinchX" : "pinchY"])b =
                        c.zoom(a.min, a.max), c.displayBtn && (e = !0)
                });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && c(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(z(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, b) {
                var d = this, c = d.hoverPoints, e;
                c && l(c, function (a) {
                    a.setState()
                });
                l("xy" === b ? [1, 0] : [1], function (b) {
                    b = d[b ? "xAxis" : "yAxis"][0];
                    var c = b.horiz, f = a[c ? "chartX" : "chartY"], c = c ? "mouseDownX" : "mouseDownY", g = d[c], h = (b.pointRange || 0) / 2, m = b.getExtremes(), p = b.toValue(g - f, !0) + h, h =
                        b.toValue(g + b.len - f, !0) - h, g = g > f;
                    b.series.length && (g || p > Math.min(m.dataMin, m.min)) && (!g || h < Math.max(m.dataMax, m.max)) && (b.setExtremes(p, h, !1, !1, {trigger: "pan"}), e = !0);
                    d[c] = f
                });
                e && d.redraw(!1);
                H(d.container, {cursor: "move"})
            }
        });
        r(f.prototype, {
            select: function (a, b) {
                var d = this, c = d.series, e = c.chart;
                a = z(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    d.selected = d.options.selected = a;
                    c.options.data[n(d, c.data)] = d.options;
                    d.setState(a && "select");
                    b || l(e.getSelectedPoints(), function (a) {
                        a.selected &&
                        a !== d && (a.selected = a.options.selected = !1, c.options.data[n(a, c.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a, b) {
                var d = this.series, c = d.chart, e = c.tooltip, f = c.hoverPoint;
                if (this.series) {
                    if (!b) {
                        if (f && f !== this)f.onMouseOut();
                        if (c.hoverSeries !== d)d.onMouseOver();
                        c.hoverPoint = this
                    }
                    !e || e.shared && !d.noSharedTooltip ? e || this.setState("hover") : (this.setState("hover"), e.refresh(this, a));
                    this.firePointEvent("mouseOver")
                }
            }, onMouseOut: function () {
                var a = this.series.chart,
                    b = a.hoverPoints;
                this.firePointEvent("mouseOut");
                b && -1 !== n(this, b) || (this.setState(), a.hoverPoint = null)
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var a = m(this.series.options.point, this.options).events, b;
                    this.events = a;
                    for (b in a)C(this, b, a[b]);
                    this.hasImportedEvents = !0
                }
            }, setState: function (b, c) {
                var d = Math.floor(this.plotX), e = this.plotY, f = this.series, g = f.options.states[b] || {}, h = k[f.type].marker && f.options.marker, m = h && !1 === h.enabled, p = h && h.states && h.states[b] || {}, l = !1 === p.enabled, n = f.stateMarkerGraphic,
                    q = this.marker || {}, w = f.chart, F = f.halo, B;
                b = b || "";
                if (!(b === this.state && !c || this.selected && "select" !== b || !1 === g.enabled || b && (l || m && !1 === p.enabled) || b && q.states && q.states[b] && !1 === q.states[b].enabled)) {
                    h && f.markerAttribs && (B = f.markerAttribs(this, b));
                    if (this.graphic)this.state && this.graphic.removeClass("highcharts-point-" + this.state), b && this.graphic.addClass("highcharts-point-" + b), this.graphic.attr(f.pointAttribs(this, b)), B && this.graphic.animate(B, z(w.options.chart.animation, p.animation, h.animation)), n &&
                    n.hide(); else {
                        if (b && p) {
                            h = q.symbol || f.symbol;
                            n && n.currentSymbol !== h && (n = n.destroy());
                            if (n)n[c ? "animate" : "attr"]({
                                x: B.x,
                                y: B.y
                            }); else h && (f.stateMarkerGraphic = n = w.renderer.symbol(h, B.x, B.y, B.width, B.height).add(f.markerGroup), n.currentSymbol = h);
                            n && n.attr(f.pointAttribs(this, b))
                        }
                        n && (n[b && w.isInsidePlot(d, e, w.inverted) ? "show" : "hide"](), n.element.point = this)
                    }
                    (d = g.halo) && d.size ? (F || (f.halo = F = w.renderer.path().add(f.markerGroup || f.group)), a.stop(F), F[c ? "animate" : "attr"]({d: this.haloPath(d.size)}), F.attr({
                        "class": "highcharts-halo highcharts-color-" +
                        z(this.colorIndex, f.colorIndex)
                    }), F.attr(r({
                        fill: this.color || f.color,
                        "fill-opacity": d.opacity,
                        zIndex: -1
                    }, d.attributes))) : F && F.animate({d: this.haloPath(0)});
                    this.state = b
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        r(e.prototype, {
            onMouseOver: function () {
                var a = this.chart, b = a.hoverSeries;
                if (b && b !== this)b.onMouseOut();
                this.options.events.mouseOver && q(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a =
                    this.options, b = this.chart, c = b.tooltip, e = b.hoverPoint;
                b.hoverSeries = null;
                if (e)e.onMouseOut();
                this && a.events.mouseOut && q(this, "mouseOut");
                !c || a.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this, d = b.options, c = b.graph, e = d.states, f = d.lineWidth, d = 0;
                a = a || "";
                if (b.state !== a && (l([b.group, b.markerGroup], function (d) {
                        d && (b.state && d.removeClass("highcharts-series-" + b.state), a && d.addClass("highcharts-series-" + a))
                    }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a &&
                    (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), c && !c.dashstyle))for (e = {"stroke-width": f}, c.attr(e); b["zone-graph-" + d];)b["zone-graph-" + d].attr(e), d += 1
            }, setVisible: function (a, b) {
                var d = this, c = d.chart, e = d.legendItem, f, g = c.options.chart.ignoreHiddenSeries, h = d.visible;
                f = (d.visible = a = d.options.visible = d.userOptions.visible = void 0 === a ? !h : a) ? "show" : "hide";
                l(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (d[a])d[a][f]()
                });
                if (c.hoverSeries === d || (c.hoverPoint && c.hoverPoint.series) === d)d.onMouseOut();
                e && c.legend.colorizeItem(d, a);
                d.isDirty = !0;
                d.options.stacking && l(c.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                l(d.linkedSeries, function (b) {
                    b.setVisible(a, !1)
                });
                g && (c.isDirtyBox = !0);
                !1 !== b && c.redraw();
                q(d, f)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                q(this, a ? "select" : "unselect")
            }, drawTracker: K.drawTrackerGraph
        })
    })(N);
    (function (a) {
        var C = a.Chart,
            A = a.each, E = a.inArray, H = a.isObject, w = a.pick, k = a.splat;
        C.prototype.setResponsive = function (a) {
            var l = this.options.responsive;
            l && l.rules && A(l.rules, function (l) {
                this.matchResponsiveRule(l, a)
            }, this)
        };
        C.prototype.matchResponsiveRule = function (l, k) {
            var q = this.respRules, h = l.condition, n;
            n = l.callback || function () {
                    return this.chartWidth <= w(h.maxWidth, Number.MAX_VALUE) && this.chartHeight <= w(h.maxHeight, Number.MAX_VALUE) && this.chartWidth >= w(h.minWidth, 0) && this.chartHeight >= w(h.minHeight, 0)
                };
            void 0 === l._id && (l._id =
                a.idCounter++);
            n = n.call(this);
            !q[l._id] && n ? l.chartOptions && (q[l._id] = this.currentOptions(l.chartOptions), this.update(l.chartOptions, k)) : q[l._id] && !n && (this.update(q[l._id], k), delete q[l._id])
        };
        C.prototype.currentOptions = function (a) {
            function l(a, n, c) {
                var g, h;
                for (g in a)if (-1 < E(g, ["series", "xAxis", "yAxis"]))for (a[g] = k(a[g]), c[g] = [], h = 0; h < a[g].length; h++)c[g][h] = {}, l(a[g][h], n[g][h], c[g][h]); else H(a[g]) ? (c[g] = {}, l(a[g], n[g] || {}, c[g])) : c[g] = n[g] || null
            }

            var q = {};
            l(a, this.options, q);
            return q
        }
    })(N);
    (function (a) {
        var C =
            a.addEvent, A = a.Axis, E = a.Chart, H = a.css, w = a.dateFormat, k = a.defined, l = a.each, r = a.extend, q = a.noop, h = a.Series, n = a.timeUnits;
        a = a.wrap;
        a(h.prototype, "init", function (a) {
            var c;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (c = this.xAxis) && c.options.ordinal && C(this, "updatedData", function () {
                delete c.ordinalIndex
            })
        });
        a(A.prototype, "getTimeTicks", function (a, g, h, l, f, e, b, p) {
            var c = 0, d, m, t = {}, v, y, q, r = [], x = -Number.MAX_VALUE, D = this.options.tickPixelInterval;
            if (!this.options.ordinal && !this.options.breaks || !e ||
                3 > e.length || void 0 === h)return a.call(this, g, h, l, f);
            y = e.length;
            for (d = 0; d < y; d++) {
                q = d && e[d - 1] > l;
                e[d] < h && (c = d);
                if (d === y - 1 || e[d + 1] - e[d] > 5 * b || q) {
                    if (e[d] > x) {
                        for (m = a.call(this, g, e[c], e[d], f); m.length && m[0] <= x;)m.shift();
                        m.length && (x = m[m.length - 1]);
                        r = r.concat(m)
                    }
                    c = d + 1
                }
                if (q)break
            }
            a = m.info;
            if (p && a.unitRange <= n.hour) {
                d = r.length - 1;
                for (c = 1; c < d; c++)w("%d", r[c]) !== w("%d", r[c - 1]) && (t[r[c]] = "day", v = !0);
                v && (t[r[0]] = "day");
                a.higherRanks = t
            }
            r.info = a;
            if (p && k(D)) {
                p = a = r.length;
                d = [];
                var z;
                for (v = []; p--;)c = this.translate(r[p]),
                z && (v[p] = z - c), d[p] = z = c;
                v.sort();
                v = v[Math.floor(v.length / 2)];
                v < .6 * D && (v = null);
                p = r[a - 1] > l ? a - 1 : a;
                for (z = void 0; p--;)c = d[p], l = z - c, z && l < .8 * D && (null === v || l < .8 * v) ? (t[r[p]] && !t[r[p + 1]] ? (l = p + 1, z = c) : l = p, r.splice(l, 1)) : z = c
            }
            return r
        });
        r(A.prototype, {
            beforeSetTickPositions: function () {
                var a, g = [], h = !1, n, f = this.getExtremes(), e = f.min, b = f.max, p, k = this.isXAxis && !!this.options.breaks, f = this.options.ordinal, d = this.chart.options.chart.ignoreHiddenSeries;
                if (f || k) {
                    l(this.series, function (b, c) {
                        if (!(d && !1 === b.visible || !1 ===
                            b.takeOrdinalPosition && !k) && (g = g.concat(b.processedXData), a = g.length, g.sort(function (a, b) {
                                return a - b
                            }), a))for (c = a - 1; c--;)g[c] === g[c + 1] && g.splice(c, 1)
                    });
                    a = g.length;
                    if (2 < a) {
                        n = g[1] - g[0];
                        for (p = a - 1; p-- && !h;)g[p + 1] - g[p] !== n && (h = !0);
                        !this.options.keepOrdinalPadding && (g[0] - e > n || b - g[g.length - 1] > n) && (h = !0)
                    }
                    h ? (this.ordinalPositions = g, n = this.val2lin(Math.max(e, g[0]), !0), p = Math.max(this.val2lin(Math.min(b, g[g.length - 1]), !0), 1), this.ordinalSlope = b = (b - e) / (p - n), this.ordinalOffset = e - n * b) : this.ordinalPositions = this.ordinalSlope =
                        this.ordinalOffset = void 0
                }
                this.isOrdinal = f && h;
                this.groupIntervalFactor = null
            }, val2lin: function (a, g) {
                var c = this.ordinalPositions;
                if (c) {
                    var h = c.length, f, e;
                    for (f = h; f--;)if (c[f] === a) {
                        e = f;
                        break
                    }
                    for (f = h - 1; f--;)if (a > c[f] || 0 === f) {
                        a = (a - c[f]) / (c[f + 1] - c[f]);
                        e = f + a;
                        break
                    }
                    g = g ? e : this.ordinalSlope * (e || 0) + this.ordinalOffset
                } else g = a;
                return g
            }, lin2val: function (a, g) {
                var c = this.ordinalPositions;
                if (c) {
                    var h = this.ordinalSlope, f = this.ordinalOffset, e = c.length - 1, b;
                    if (g)0 > a ? a = c[0] : a > e ? a = c[e] : (e = Math.floor(a), b = a - e); else for (; e--;)if (g =
                            h * e + f, a >= g) {
                        h = h * (e + 1) + f;
                        b = (a - g) / (h - g);
                        break
                    }
                    return void 0 !== b && void 0 !== c[e] ? c[e] + (b ? b * (c[e + 1] - c[e]) : 0) : a
                }
                return a
            }, getExtendedPositions: function () {
                var a = this.chart, g = this.series[0].currentDataGrouping, h = this.ordinalIndex, n = g ? g.count + g.unitName : "raw", f = this.getExtremes(), e, b;
                h || (h = this.ordinalIndex = {});
                h[n] || (e = {
                    series: [], chart: a, getExtremes: function () {
                        return {min: f.dataMin, max: f.dataMax}
                    }, options: {ordinal: !0}, val2lin: A.prototype.val2lin
                }, l(this.series, function (c) {
                    b = {
                        xAxis: e, xData: c.xData, chart: a,
                        destroyGroupedData: q
                    };
                    b.options = {
                        dataGrouping: g ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [[g.unitName, [g.count]]]
                        } : {enabled: !1}
                    };
                    c.processData.apply(b);
                    e.series.push(b)
                }), this.beforeSetTickPositions.apply(e), h[n] = e.ordinalPositions);
                return h[n]
            }, getGroupIntervalFactor: function (a, g, h) {
                var c;
                h = h.processedXData;
                var f = h.length, e = [];
                c = this.groupIntervalFactor;
                if (!c) {
                    for (c = 0; c < f - 1; c++)e[c] = h[c + 1] - h[c];
                    e.sort(function (a, c) {
                        return a - c
                    });
                    e = e[Math.floor(f / 2)];
                    a = Math.max(a, h[0]);
                    g = Math.min(g, h[f - 1]);
                    this.groupIntervalFactor = c = f * e / (g - a)
                }
                return c
            }, postProcessTickInterval: function (a) {
                var c = this.ordinalSlope;
                return c ? this.options.breaks ? this.closestPointRange : a / (c / this.closestPointRange) : a
            }
        });
        a(E.prototype, "pan", function (a, g) {
            var c = this.xAxis[0], h = g.chartX, f = !1;
            if (c.options.ordinal && c.series.length) {
                var e = this.mouseDownX, b = c.getExtremes(), p = b.dataMax, n = b.min, d = b.max, k = this.hoverPoints, t = c.closestPointRange, e = (e - h) / (c.translationSlope * (c.ordinalSlope || t)), v = {ordinalPositions: c.getExtendedPositions()},
                    t = c.lin2val, y = c.val2lin, q;
                v.ordinalPositions ? 1 < Math.abs(e) && (k && l(k, function (a) {
                    a.setState()
                }), 0 > e ? (k = v, q = c.ordinalPositions ? c : v) : (k = c.ordinalPositions ? c : v, q = v), v = q.ordinalPositions, p > v[v.length - 1] && v.push(p), this.fixedRange = d - n, e = c.toFixedRange(null, null, t.apply(k, [y.apply(k, [n, !0]) + e, !0]), t.apply(q, [y.apply(q, [d, !0]) + e, !0])), e.min >= Math.min(b.dataMin, n) && e.max <= Math.max(p, d) && c.setExtremes(e.min, e.max, !0, !1, {trigger: "pan"}), this.mouseDownX = h, H(this.container, {cursor: "move"})) : f = !0
            } else f = !0;
            f &&
            a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        h.prototype.gappedPath = function () {
            var a = this.options.gapSize, g = this.points.slice(), h = g.length - 1;
            if (a && 0 < h)for (; h--;)g[h + 1].x - g[h].x > this.closestPointRange * a && g.splice(h + 1, 0, {isNull: !0});
            return this.getGraphPath(g)
        }
    })(N);
    (function (a) {
        function C() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function A(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, E(this.pointArrayMap, ["y"]))
        }

        var E = a.pick, H = a.wrap, w = a.each, k = a.extend,
            l = a.fireEvent, r = a.Axis, q = a.Series;
        k(r.prototype, {
            isInBreak: function (a, l) {
                var c = a.repeat || Infinity, g = a.from, h = a.to - a.from;
                l = l >= g ? (l - g) % c : c - (g - l) % c;
                return a.inclusive ? l <= h : l < h && 0 !== l
            }, isInAnyBreak: function (a, l) {
                var c = this.options.breaks, g = c && c.length, h, n, f;
                if (g) {
                    for (; g--;)this.isInBreak(c[g], a) && (h = !0, n || (n = E(c[g].showPoints, this.isXAxis ? !1 : !0)));
                    f = h && l ? h && !n : h
                }
                return f
            }
        });
        H(r.prototype, "setTickPositions", function (a) {
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (this.options.breaks) {
                var h =
                    this.tickPositions, c = this.tickPositions.info, g = [], l;
                for (l = 0; l < h.length; l++)this.isInAnyBreak(h[l]) || g.push(h[l]);
                this.tickPositions = g;
                this.tickPositions.info = c
            }
        });
        H(r.prototype, "init", function (a, n, c) {
            c.breaks && c.breaks.length && (c.ordinal = !1);
            a.call(this, n, c);
            if (this.options.breaks) {
                var g = this;
                g.isBroken = !0;
                this.val2lin = function (a) {
                    var c = a, f, e;
                    for (e = 0; e < g.breakArray.length; e++)if (f = g.breakArray[e], f.to <= a)c -= f.len; else if (f.from >= a)break; else if (g.isInBreak(f, a)) {
                        c -= a - f.from;
                        break
                    }
                    return c
                };
                this.lin2val =
                    function (a) {
                        var c, f;
                        for (f = 0; f < g.breakArray.length && !(c = g.breakArray[f], c.from >= a); f++)c.to < a ? a += c.len : g.isInBreak(c, a) && (a += c.len);
                        return a
                    };
                this.setExtremes = function (a, c, f, e, b) {
                    for (; this.isInAnyBreak(a);)a -= this.closestPointRange;
                    for (; this.isInAnyBreak(c);)c -= this.closestPointRange;
                    r.prototype.setExtremes.call(this, a, c, f, e, b)
                };
                this.setAxisTranslation = function (a) {
                    r.prototype.setAxisTranslation.call(this, a);
                    var c = g.options.breaks;
                    a = [];
                    var f = [], e = 0, b, h, m = g.userMin || g.min, d = g.userMax || g.max, n, k;
                    for (k in c)h =
                        c[k], b = h.repeat || Infinity, g.isInBreak(h, m) && (m += h.to % b - m % b), g.isInBreak(h, d) && (d -= d % b - h.from % b);
                    for (k in c) {
                        h = c[k];
                        n = h.from;
                        for (b = h.repeat || Infinity; n - b > m;)n -= b;
                        for (; n < m;)n += b;
                        for (; n < d; n += b)a.push({value: n, move: "in"}), a.push({
                            value: n + (h.to - h.from),
                            move: "out",
                            size: h.breakSize
                        })
                    }
                    a.sort(function (a, b) {
                        return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                    });
                    c = 0;
                    n = m;
                    for (k in a)h = a[k], c += "in" === h.move ? 1 : -1, 1 === c && "in" === h.move && (n = h.value), 0 === c && (f.push({
                        from: n, to: h.value, len: h.value -
                        n - (h.size || 0)
                    }), e += h.value - n - (h.size || 0));
                    g.breakArray = f;
                    l(g, "afterBreaks");
                    g.transA *= (d - g.min) / (d - m - e);
                    g.min = m;
                    g.max = d
                }
            }
        });
        H(q.prototype, "generatePoints", function (a) {
            a.apply(this, C(arguments));
            var h = this.xAxis, c = this.yAxis, g = this.points, l, k = g.length, f = this.options.connectNulls, e;
            if (h && c && (h.options.breaks || c.options.breaks))for (; k--;)l = g[k], e = null === l.y && !1 === f, e || !h.isInAnyBreak(l.x, !0) && !c.isInAnyBreak(l.y, !0) || (g.splice(k, 1), this.data[k] && this.data[k].destroyElements())
        });
        a.Series.prototype.drawBreaks =
            function (a, n) {
                var c = this, g = c.points, h, k, f, e;
                w(n, function (b) {
                    h = a.breakArray || [];
                    k = a.isXAxis ? a.min : E(c.options.threshold, a.min);
                    w(g, function (c) {
                        e = E(c["stack" + b.toUpperCase()], c[b]);
                        w(h, function (b) {
                            f = !1;
                            if (k < b.from && e > b.to || k > b.from && e < b.from)f = "pointBreak"; else if (k < b.from && e > b.from && e < b.to || k > b.from && e > b.to && e < b.from)f = "pointInBreak";
                            f && l(a, f, {point: c, brk: b})
                        })
                    })
                })
            };
        H(a.seriesTypes.column.prototype, "drawPoints", A);
        H(a.Series.prototype, "drawPoints", A)
    })(N);
    (function (a) {
        var C = a.arrayMax, A = a.arrayMin,
            E = a.Axis, H = a.defaultPlotOptions, w = a.defined, k = a.each, l = a.error, r = a.extend, q = a.format, h = a.isNumber, n = a.merge, c = a.pick, g = a.Point, m = a.Tooltip, z = a.wrap, f = a.Series.prototype, e = f.processData, b = f.generatePoints, p = f.destroy, K = {
                approximation: "average", groupPixelWidth: 2, dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M",
                        "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["星期 %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            }, d = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {approximation: "sum", groupPixelWidth: 10},
                arearange: {approximation: "range"},
                areasplinerange: {approximation: "range"},
                columnrange: {approximation: "range", groupPixelWidth: 10},
                candlestick: {approximation: "ohlc", groupPixelWidth: 10},
                ohlc: {approximation: "ohlc", groupPixelWidth: 5}
            },
            F = a.defaultDataGroupingUnits = [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1]], ["week", [1]], ["month", [1, 3, 6]], ["year", null]], t = {
                sum: function (a) {
                    var b = a.length, d;
                    if (!b && a.hasNulls)d = null; else if (b)for (d = 0; b--;)d += a[b];
                    return d
                }, average: function (a) {
                    var b = a.length;
                    a = t.sum(a);
                    h(a) && b && (a /= b);
                    return a
                }, open: function (a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                }, high: function (a) {
                    return a.length ? C(a) : a.hasNulls ?
                        null : void 0
                }, low: function (a) {
                    return a.length ? A(a) : a.hasNulls ? null : void 0
                }, close: function (a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                }, ohlc: function (a, b, d, c) {
                    a = t.open(a);
                    b = t.high(b);
                    d = t.low(d);
                    c = t.close(c);
                    if (h(a) || h(b) || h(d) || h(c))return [a, b, d, c]
                }, range: function (a, b) {
                    a = t.low(a);
                    b = t.high(b);
                    if (h(a) || h(b))return [a, b]
                }
            };
        f.groupData = function (a, b, d, c) {
            var e = this.data, f = this.options.data, g = [], p = [], l = [], m = a.length, n, k, v = !!b, q = [[], [], [], []];
            c = "function" === typeof c ? c : t[c];
            var y = this.pointArrayMap,
                r = y && y.length, w, z = 0;
            for (w = k = 0; w <= m && !(a[w] >= d[0]); w++);
            for (w; w <= m; w++) {
                for (; (void 0 !== d[z + 1] && a[w] >= d[z + 1] || w === m) && (n = d[z], this.dataGroupInfo = {
                    start: k,
                    length: q[0].length
                }, k = c.apply(this, q), void 0 !== k && (g.push(n), p.push(k), l.push(this.dataGroupInfo)), k = w, q[0] = [], q[1] = [], q[2] = [], q[3] = [], z += 1, w !== m););
                if (w === m)break;
                if (y) {
                    n = this.cropStart + w;
                    n = e && e[n] || this.pointClass.prototype.applyOptions.apply({series: this}, [f[n]]);
                    var I, G;
                    for (I = 0; I < r; I++)G = n[y[I]], h(G) ? q[I].push(G) : null === G && (q[I].hasNulls = !0)
                } else n =
                    v ? b[w] : null, h(n) ? q[0].push(n) : null === n && (q[0].hasNulls = !0)
            }
            return [g, p, l]
        };
        f.processData = function () {
            var a = this.chart, b = this.options.dataGrouping, d = !1 !== this.allowDG && b && c(b.enabled, a.options._stock), g = this.visible || !a.options.chart.ignoreHiddenSeries, h;
            this.forceCrop = d;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== e.apply(this, arguments) && d && g) {
                this.destroyGroupedData();
                var p = this.processedXData, l = this.processedYData, m = a.plotSizeX, a = this.xAxis, n = a.options.ordinal, k = this.groupPixelWidth = a.getGroupPixelWidth &&
                    a.getGroupPixelWidth();
                if (k) {
                    this.isDirty = h = !0;
                    g = a.getExtremes();
                    d = g.min;
                    g = g.max;
                    n = n && a.getGroupIntervalFactor(d, g, this) || 1;
                    m = k * (g - d) / m * n;
                    k = a.getTimeTicks(a.normalizeTimeTickInterval(m, b.units || F), Math.min(d, p[0]), Math.max(g, p[p.length - 1]), a.options.startOfWeek, p, this.closestPointRange);
                    p = f.groupData.apply(this, [p, l, k, b.approximation]);
                    l = p[0];
                    n = p[1];
                    if (b.smoothed) {
                        b = l.length - 1;
                        for (l[b] = Math.min(l[b], g); b-- && 0 < b;)l[b] += m / 2;
                        l[0] = Math.max(l[0], d)
                    }
                    this.currentDataGrouping = k.info;
                    this.closestPointRange =
                        k.info.totalRange;
                    this.groupMap = p[2];
                    w(l[0]) && l[0] < a.dataMin && (a.min === a.dataMin && (a.min = l[0]), a.dataMin = l[0]);
                    this.processedXData = l;
                    this.processedYData = n
                } else this.currentDataGrouping = this.groupMap = null;
                this.hasGroupedData = h
            }
        };
        f.destroyGroupedData = function () {
            var a = this.groupedData;
            k(a || [], function (b, d) {
                b && (a[d] = b.destroy ? b.destroy() : null)
            });
            this.groupedData = null
        };
        f.generatePoints = function () {
            b.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        z(g.prototype,
            "update", function (a) {
                this.dataGroup ? l(24) : a.apply(this, [].slice.call(arguments, 1))
            });
        z(m.prototype, "tooltipFooterHeaderFormatter", function (b, d, c) {
            var e = d.series, f = e.tooltipOptions, g = e.options.dataGrouping, p = f.xDateFormat, l, m = e.xAxis, n = a.dateFormat;
            return m && "datetime" === m.options.type && g && h(d.key) ? (b = e.currentDataGrouping, g = g.dateTimeLabelFormats, b ? (m = g[b.unitName], 1 === b.count ? p = m[0] : (p = m[1], l = m[2])) : !p && g && (p = this.getXDateFormat(d, f, m)), p = n(p, d.key), l && (p += n(l, d.key + b.totalRange - 1)), q(f[(c ? "footer" :
                "header") + "Format"], {point: r(d.point, {key: p}), series: e})) : b.call(this, d, c)
        });
        f.destroy = function () {
            for (var a = this.groupedData || [], b = a.length; b--;)a[b] && a[b].destroy();
            p.apply(this)
        };
        z(f, "setOptions", function (a, b) {
            a = a.call(this, b);
            var c = this.type, e = this.chart.options.plotOptions, f = H[c].dataGrouping;
            d[c] && (f || (f = n(K, d[c])), a.dataGrouping = n(f, e.series && e.series.dataGrouping, e[c].dataGrouping, b.dataGrouping));
            this.chart.options._stock && (this.requireSorting = !0);
            return a
        });
        z(E.prototype, "setScale", function (a) {
            a.call(this);
            k(this.series, function (a) {
                a.hasProcessed = !1
            })
        });
        E.prototype.getGroupPixelWidth = function () {
            var a = this.series, b = a.length, d, c = 0, e = !1, f;
            for (d = b; d--;)(f = a[d].options.dataGrouping) && (c = Math.max(c, f.groupPixelWidth));
            for (d = b; d--;)(f = a[d].options.dataGrouping) && a[d].hasProcessed && (b = (a[d].processedXData || a[d].data).length, a[d].groupPixelWidth || b > this.chart.plotSizeX / c || b && f.forced) && (e = !0);
            return e ? c : 0
        };
        E.prototype.setDataGrouping = function (a, b) {
            var d;
            b = c(b, !0);
            a || (a = {forced: !1, units: null});
            if (this instanceof
                E)for (d = this.series.length; d--;)this.series[d].update({dataGrouping: a}, !1); else k(this.chart.options.series, function (b) {
                b.dataGrouping = a
            }, !1);
            b && this.chart.redraw()
        }
    })(N);
    (function (a) {
        var C = a.each, A = a.Point, E = a.seriesType, H = a.seriesTypes;
        E("ohlc", "column", {
            lineWidth: 1,
            tooltip: {pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'},
            threshold: null,
            states: {hover: {lineWidth: 3}}
        }, {
            pointArrayMap: ["open", "high", "low", "close"], toYData: function (a) {
                return [a.open, a.high, a.low, a.close]
            }, pointValKey: "high", pointAttribs: function (a, k) {
                k = H.column.prototype.pointAttribs.call(this, a, k);
                var l = this.options;
                delete k.fill;
                k["stroke-width"] = l.lineWidth;
                k.stroke = a.options.color || (a.open < a.close ? l.upColor || this.color : this.color);
                return k
            }, translate: function () {
                var a = this, k = a.yAxis, l = !!a.modifyValue, r = ["plotOpen", "yBottom", "plotClose"];
                H.column.prototype.translate.apply(a);
                C(a.points, function (q) {
                    C([q.open, q.low, q.close], function (h, n) {
                        null !== h && (l && (h = a.modifyValue(h)), q[r[n]] = k.toPixels(h, !0))
                    })
                })
            }, drawPoints: function () {
                var a = this, k = a.chart;
                C(a.points, function (l) {
                    var r, q, h, n, c = l.graphic, g, m = !c;
                    void 0 !== l.plotY && (c || (l.graphic = c = k.renderer.path().add(a.group)), c.attr(a.pointAttribs(l, l.selected && "select")), q = c.strokeWidth() % 2 / 2, g = Math.round(l.plotX) - q, h = Math.round(l.shapeArgs.width / 2), n = ["M", g, Math.round(l.yBottom), "L", g, Math.round(l.plotY)], null !== l.open && (r = Math.round(l.plotOpen) +
                        q, n.push("M", g, r, "L", g - h, r)), null !== l.close && (r = Math.round(l.plotClose) + q, n.push("M", g, r, "L", g + h, r)), c[m ? "attr" : "animate"]({d: n}).addClass(l.getClassName(), !0))
                })
            }, animate: null
        }, {
            getClassName: function () {
                return A.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
        })
    })(N);
    (function (a) {
        var C = a.defaultPlotOptions, A = a.each, E = a.merge, H = a.seriesType, w = a.seriesTypes;
        H("candlestick", "ohlc", E(C.column, {
            states: {hover: {lineWidth: 2}}, tooltip: C.ohlc.tooltip,
            threshold: null, lineColor: "#000000", lineWidth: 1, upColor: "#ffffff"
        }), {
            pointAttribs: function (a, l) {
                var k = w.column.prototype.pointAttribs.call(this, a, l), q = this.options, h = a.open < a.close, n = q.lineColor || this.color;
                k["stroke-width"] = q.lineWidth;
                k.fill = a.options.color || (h ? q.upColor || this.color : this.color);
                k.stroke = a.lineColor || (h ? q.upLineColor || n : n);
                l && (a = q.states[l], k.fill = a.color || k.fill, k.stroke = a.stroke || k.stroke);
                return k
            }, drawPoints: function () {
                var a = this, l = a.chart;
                A(a.points, function (k) {
                    var q = k.graphic,
                        h, n, c, g, m, r, f, e = !q;
                    void 0 !== k.plotY && (q || (k.graphic = q = l.renderer.path().add(a.group)), q.attr(a.pointAttribs(k, k.selected && "select")).shadow(a.options.shadow), m = q.strokeWidth() % 2 / 2, r = Math.round(k.plotX) - m, h = k.plotOpen, n = k.plotClose, c = Math.min(h, n), h = Math.max(h, n), f = Math.round(k.shapeArgs.width / 2), n = Math.round(c) !== Math.round(k.plotY), g = h !== k.yBottom, c = Math.round(c) + m, h = Math.round(h) + m, m = [], m.push("M", r - f, h, "L", r - f, c, "L", r + f, c, "L", r + f, h, "Z", "M", r, c, "L", r, n ? Math.round(k.plotY) : c, "M", r, h, "L", r, g ? Math.round(k.yBottom) :
                        h), q[e ? "attr" : "animate"]({d: m}).addClass(k.getClassName(), !0))
                })
            }
        })
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.each, E = a.merge, H = a.noop, w = a.Renderer, k = a.seriesType, l = a.seriesTypes, r = a.TrackerMixin, q = a.VMLRenderer, h = a.SVGRenderer.prototype.symbols;
        k("flags", "column", {
            pointRange: 0,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {pointFormat: "{point.text}\x3cbr/\x3e"},
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {hover: {lineColor: "#000000", fillColor: "#ccd6eb"}},
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: a.Series.prototype.init,
            pointAttribs: function (a, c) {
                var g = this.options, h = a && a.color || this.color, l = g.lineColor;
                a = a && a.lineWidth;
                var f = g.fillColor;
                c && (f = g.states[c].fillColor, l = g.states[c].lineColor, a = g.states[c].lineWidth);
                return {fill: f || h, stroke: l || h, "stroke-width": a || g.lineWidth || 0}
            },
            translate: function () {
                l.column.prototype.translate.apply(this);
                var a = this.options, c = this.chart,
                    g = this.points, h = g.length - 1, k, f, e = a.onSeries;
                k = e && c.get(e);
                var a = a.onKey || "y", e = k && k.options.step, b = k && k.points, p = b && b.length, q = this.xAxis, d = q.getExtremes(), r = 0, t, v, y;
                if (k && k.visible && p)for (r = (k.pointXOffset || 0) + (k.barW || 0) / 2, k = k.currentDataGrouping, v = b[p - 1].x + (k ? k.totalRange : 0), g.sort(function (a, b) {
                    return a.x - b.x
                }), a = "plot" + a[0].toUpperCase() + a.substr(1); p-- && g[h] && !(k = g[h], t = b[p], t.x <= k.x && void 0 !== t[a] && (k.x <= v && (k.plotY = t[a], t.x < k.x && !e && (y = b[p + 1]) && void 0 !== y[a] && (k.plotY += (k.x - t.x) / (y.x - t.x) *
                    (y[a] - t[a]))), h--, p++, 0 > h)););
                A(g, function (a, b) {
                    var e;
                    void 0 === a.plotY && (a.x >= d.min && a.x <= d.max ? a.plotY = c.chartHeight - q.bottom - (q.opposite ? q.height : 0) + q.offset - c.plotTop : a.shapeArgs = {});
                    a.plotX += r;
                    (f = g[b - 1]) && f.plotX === a.plotX && (void 0 === f.stackIndex && (f.stackIndex = 0), e = f.stackIndex + 1);
                    a.stackIndex = e
                })
            },
            drawPoints: function () {
                var a = this.points, c = this.chart, g = c.renderer, h, l, f = this.options, e = f.y, b, p, k, d, q, t, v, r = this.yAxis;
                for (p = a.length; p--;)k = a[p], v = k.plotX > this.xAxis.len, h = k.plotX, d = k.stackIndex, b =
                    k.options.shape || f.shape, l = k.plotY, void 0 !== l && (l = k.plotY + e - (void 0 !== d && d * f.stackDistance)), q = d ? void 0 : k.plotX, t = d ? void 0 : k.plotY, d = k.graphic, void 0 !== l && 0 <= h && !v ? (d || (d = k.graphic = g.label("", null, null, b, null, null, f.useHTML).attr(this.pointAttribs(k)).css(E(f.style, k.style)).attr({
                    align: "flag" === b ? "left" : "center",
                    width: f.width,
                    height: f.height,
                    "text-align": f.textAlign
                }).addClass("highcharts-point").add(this.markerGroup), d.shadow(f.shadow)), 0 < h && (h -= d.strokeWidth() % 2), d.attr({
                    text: k.options.title ||
                    f.title || "A", x: h, y: l, anchorX: q, anchorY: t
                }), k.tooltipPos = c.inverted ? [r.len + r.pos - c.plotLeft - l, this.xAxis.len - h] : [h, l]) : d && (k.graphic = d.destroy())
            },
            drawTracker: function () {
                var a = this.points;
                r.drawTrackerPoint.apply(this);
                A(a, function (c) {
                    var g = c.graphic;
                    g && C(g.element, "mouseover", function () {
                        0 < c.stackIndex && !c.raised && (c._y = g.y, g.attr({y: c._y - 8}), c.raised = !0);
                        A(a, function (a) {
                            a !== c && a.raised && a.graphic && (a.graphic.attr({y: a._y}), a.raised = !1)
                        })
                    })
                })
            },
            animate: H,
            buildKDTree: H,
            setClip: H
        });
        h.flag = function (a,
                           c, g, h, l) {
            return ["M", l && l.anchorX || a, l && l.anchorY || c, "L", a, c + h, a, c, a + g, c, a + g, c + h, a, c + h, "Z"]
        };
        A(["circle", "square"], function (a) {
            h[a + "pin"] = function (c, g, l, k, f) {
                var e = f && f.anchorX;
                f = f && f.anchorY;
                "circle" === a && k > l && (c -= Math.round((k - l) / 2), l = k);
                c = h[a](c, g, l, k);
                e && f && c.push("M", e, g > f ? g : g + k, "L", e, f);
                return c
            }
        });
        w === q && A(["flag", "circlepin", "squarepin"], function (a) {
            q.prototype.symbols[a] = h[a]
        })
    })(N);
    (function (a) {
        function C(a, c, e) {
            this.init(a, c, e)
        }

        var A = a.addEvent, E = a.Axis, H = a.correctFloat, w = a.defaultOptions,
            k = a.defined, l = a.destroyObjectProperties, r = a.doc, q = a.each, h = a.fireEvent, n = a.hasTouch, c = a.isTouchDevice, g = a.merge, m = a.pick, z = a.removeEvent, f = a.wrap, e = {
                height: c ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: a.svg && !c,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            };
        w.scrollbar = g(!0, e, w.scrollbar);
        C.prototype = {
            init: function (a, c, f) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = c;
                this.options = g(e, c);
                this.chart = f;
                this.size = m(this.options.size, this.options.height);
                c.enabled && (this.render(), this.initEvents(), this.addEvents())
            }, render: function () {
                var a = this.renderer, c = this.options, e = this.size, d;
                this.group = d = a.g("scrollbar").attr({zIndex: c.zIndex, translateY: -99999}).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: c.trackBorderRadius || 0, height: e, width: e
                }).add(d);
                this.track.attr({
                    fill: c.trackBackgroundColor,
                    stroke: c.trackBorderColor,
                    "stroke-width": c.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({y: -this.trackBorderWidth % 2 / 2});
                this.scrollbarGroup = a.g().add(d);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: e,
                    width: e,
                    r: c.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(this.swapXY(["M", -3, e / 4, "L", -3, 2 * e / 3, "M", 0, e / 4, "L",
                    0, 2 * e / 3, "M", 3, e / 4, "L", 3, 2 * e / 3], c.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                this.scrollbar.attr({
                    fill: c.barBackgroundColor,
                    stroke: c.barBorderColor,
                    "stroke-width": c.barBorderWidth
                });
                this.scrollbarRifles.attr({stroke: c.rifleColor, "stroke-width": 1});
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            }, position: function (a,
                                   c, e, d) {
                var b = this.options.vertical, f = 0, g = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = c + this.trackBorderWidth;
                this.width = e;
                this.xOffset = this.height = d;
                this.yOffset = f;
                b ? (this.width = this.yOffset = e = f = this.size, this.xOffset = c = 0, this.barWidth = d - 2 * e, this.x = a += this.options.margin) : (this.height = this.xOffset = d = c = this.size, this.barWidth = e - 2 * d, this.y += this.options.margin);
                this.group[g]({translateX: a, translateY: this.y});
                this.track[g]({width: e, height: d});
                this.scrollbarButtons[1].attr({
                    translateX: b ? 0 : e - c, translateY: b ?
                    d - f : 0
                })
            }, drawScrollbarButton: function (a) {
                var b = this.renderer, c = this.scrollbarButtons, d = this.options, e = this.size, f;
                f = b.g().add(this.group);
                c.push(f);
                f = b.rect().addClass("highcharts-scrollbar-button").add(f);
                f.attr({
                    stroke: d.buttonBorderColor,
                    "stroke-width": d.buttonBorderWidth,
                    fill: d.buttonBackgroundColor
                });
                f.attr(f.crisp({
                    x: -.5,
                    y: -.5,
                    width: e + 1,
                    height: e + 1,
                    r: d.buttonBorderRadius
                }, f.strokeWidth()));
                f = b.path(this.swapXY(["M", e / 2 + (a ? -1 : 1), e / 2 - 3, "L", e / 2 + (a ? -1 : 1), e / 2 + 3, "L", e / 2 + (a ? 2 : -2), e / 2], d.vertical)).addClass("highcharts-scrollbar-arrow").add(c[a]);
                f.attr({fill: d.buttonArrowColor})
            }, swapXY: function (a, c) {
                var b = a.length, d;
                if (c)for (c = 0; c < b; c += 3)d = a[c + 1], a[c + 1] = a[c + 2], a[c + 2] = d;
                return a
            }, setRange: function (a, c) {
                var b = this.options, d = b.vertical, e = b.minWidth, f = this.barWidth, g, h, l = this.rendered && !this.hasDragged ? "animate" : "attr";
                k(f) && (a = Math.max(a, 0), g = f * a, this.calculatedWidth = h = H(f * Math.min(c, 1) - g), h < e && (g = (f - e + h) * a, h = e), e = Math.floor(g + this.xOffset + this.yOffset), f = h / 2 - .5, this.from = a, this.to = c, d ? (this.scrollbarGroup[l]({translateY: e}), this.scrollbar[l]({height: h}),
                    this.scrollbarRifles[l]({translateY: f}), this.scrollbarTop = e, this.scrollbarLeft = 0) : (this.scrollbarGroup[l]({translateX: e}), this.scrollbar[l]({width: h}), this.scrollbarRifles[l]({translateX: f}), this.scrollbarLeft = e, this.scrollbarTop = 0), 12 >= h ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === b.showFull && (0 >= a && 1 <= c ? this.group.hide() : this.group.show()), this.rendered = !0)
            }, initEvents: function () {
                var a = this;
                a.mouseMoveHandler = function (b) {
                    var c = a.chart.pointer.normalize(b), d = a.options.vertical ?
                        "chartY" : "chartX", e = a.initPositions;
                    !a.grabbedCenter || b.touches && 0 === b.touches[0][d] || (c = a.cursorToScrollbarPosition(c)[d], d = a[d], d = c - d, a.hasDragged = !0, a.updatePosition(e[0] + d, e[1] + d), a.hasDragged && h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    }))
                };
                a.mouseUpHandler = function (b) {
                    a.hasDragged && h(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function (b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function (b) {
                    var c = H(a.to - a.from) * a.options.step;
                    a.updatePosition(H(a.from - c), H(a.to - c));
                    h(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                };
                a.buttonToMaxClick = function (b) {
                    var c = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + c, a.to + c);
                    h(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                };
                a.trackClick = function (b) {
                    var c = a.chart.pointer.normalize(b),
                        d = a.to - a.from, e = a.y + a.scrollbarTop, f = a.x + a.scrollbarLeft;
                    a.options.vertical && c.chartY > e || !a.options.vertical && c.chartX > f ? a.updatePosition(a.from + d, a.to + d) : a.updatePosition(a.from - d, a.to - d);
                    h(a, "changed", {from: a.from, to: a.to, trigger: "scrollbar", DOMEvent: b})
                }
            }, cursorToScrollbarPosition: function (a) {
                var b = this.options, b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
                }
            }, updatePosition: function (a,
                                         c) {
                1 < c && (a = H(1 - H(c - a)), c = 1);
                0 > a && (c = H(c - a), a = 0);
                this.from = a;
                this.to = c
            }, update: function (a) {
                this.destroy();
                this.init(this.chart.renderer, g(!0, this.options, a), this.chart)
            }, addEvents: function () {
                var a = this.options.inverted ? [1, 0] : [0, 1], c = this.scrollbarButtons, e = this.scrollbarGroup.element, d = this.mouseDownHandler, f = this.mouseMoveHandler, g = this.mouseUpHandler, a = [[c[a[0]].element, "click", this.buttonToMinClick], [c[a[1]].element, "click", this.buttonToMaxClick], [this.track.element, "click", this.trackClick], [e,
                    "mousedown", d], [r, "mousemove", f], [r, "mouseup", g]];
                n && a.push([e, "touchstart", d], [r, "touchmove", f], [r, "touchend", g]);
                q(a, function (a) {
                    A.apply(null, a)
                });
                this._events = a
            }, removeEvents: function () {
                q(this._events, function (a) {
                    z.apply(null, a)
                });
                this._events = void 0
            }, destroy: function () {
                var a = this.chart.scroller;
                this.removeEvents();
                q(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function (a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && (a.scrollbar = null, l(a.scrollbarButtons))
            }
        };
        f(E.prototype, "init", function (a) {
            var b = this;
            a.apply(b, [].slice.call(arguments, 1));
            b.options.scrollbar && b.options.scrollbar.enabled && (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new C(b.chart.renderer, b.options.scrollbar, b.chart), A(b.scrollbar, "changed", function (a) {
                var c = Math.min(m(b.options.min, b.min), b.min, b.dataMin), e = Math.max(m(b.options.max, b.max), b.max, b.dataMax) - c, f;
                b.horiz && !b.reversed || !b.horiz && b.reversed ? (f = c + e * this.to, c += e * this.from) : (f =
                    c + e * (1 - this.from), c += e * (1 - this.to));
                b.setExtremes(c, f, !0, !1, a)
            }))
        });
        f(E.prototype, "render", function (a) {
            var b = Math.min(m(this.options.min, this.min), this.min, this.dataMin), c = Math.max(m(this.options.max, this.max), this.max, this.dataMax), d = this.scrollbar, e;
            a.apply(this, [].slice.call(arguments, 1));
            d && (this.horiz ? d.position(this.left, this.top + this.height + this.offset + 2 + (this.opposite ? 0 : this.axisTitleMargin), this.width, this.height) : d.position(this.left + this.width + 2 + this.offset + (this.opposite ? this.axisTitleMargin :
                    0), this.top, this.width, this.height), isNaN(b) || isNaN(c) || !k(this.min) || !k(this.max) ? d.setRange(0, 0) : (e = (this.min - b) / (c - b), b = (this.max - b) / (c - b), this.horiz && !this.reversed || !this.horiz && this.reversed ? d.setRange(e, b) : d.setRange(1 - b, 1 - e)))
        });
        f(E.prototype, "getOffset", function (a) {
            var b = this.horiz ? 2 : 1, c = this.scrollbar;
            a.apply(this, [].slice.call(arguments, 1));
            c && (this.chart.axisOffset[b] += c.size + c.options.margin)
        });
        f(E.prototype, "destroy", function (a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, [].slice.call(arguments, 1))
        });
        a.Scrollbar = C
    })(N);
    (function (a) {
        function C(a) {
            this.init(a)
        }

        var A = a.addEvent, E = a.Axis, H = a.Chart, w = a.color, k = a.defaultOptions, l = a.defined, r = a.destroyObjectProperties, q = a.doc, h = a.each, n = a.erase, c = a.error, g = a.extend, m = a.grep, z = a.hasTouch, f = a.isNumber, e = a.isObject, b = a.isTouchDevice, p = a.merge, K = a.pick, d = a.removeEvent, F = a.Scrollbar, t = a.Series, v = a.seriesTypes, y = a.wrap, I = [].concat(a.defaultDataGroupingUnits), G = function (a) {
            var b = m(arguments, f);
            if (b.length)return Math[a].apply(0,
                b)
        };
        I[4] = ["day", [1, 2, 3, 4]];
        I[5] = ["week", [1, 2, 3]];
        v = void 0 === v.areaspline ? "line" : "areaspline";
        g(k, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {backgroundColor: "#f2f2f2", borderColor: "#999999"},
                maskFill: w("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: v,
                    color: "#335cad",
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {approximation: "average", enabled: !0, groupPixelWidth: 2, smoothed: !0, units: I},
                    dataLabels: {enabled: !1, zIndex: 2},
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {enabled: !1},
                    pointRange: 0,
                    shadow: !1,
                    threshold: null
                },
                xAxis: {
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {align: "left", style: {color: "#999999"}, x: 3, y: -4},
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {enabled: !1},
                    crosshair: !1,
                    title: {text: null},
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        C.prototype = {
            drawHandle: function (a, b) {
                var c = this.chart.renderer, d = this.handles;
                this.rendered || (d[b] = c.path(["M", -4.5, .5, "L", 3.5, .5, 3.5, 15.5, -4.5, 15.5, -4.5, .5, "M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12]).attr({zIndex: 10 - b}).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][b]).add(), c = this.navigatorOptions.handles, d[b].attr({
                    fill: c.backgroundColor,
                    stroke: c.borderColor,
                    "stroke-width": 1
                }).css({cursor: "ew-resize"}));
                d[b][this.rendered && !this.hasDragged ? "animate" : "attr"]({
                    translateX: this.scrollerLeft +
                    this.scrollbarHeight + parseInt(a, 10), translateY: this.top + this.height / 2 - 8
                })
            }, update: function (a) {
                this.destroy();
                p(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            }, render: function (a, b, c, d) {
                var e = this.chart, g = e.renderer, h, k, m, n;
                n = this.scrollbarHeight;
                var p = this.xAxis, u = this.navigatorOptions, x = u.maskInside, t = this.height, q = this.top, v = this.navigatorEnabled, r = this.outlineHeight, w;
                w = this.rendered;
                if (f(a) && f(b) && (!this.hasDragged || l(c)) && (this.navigatorLeft = h = K(p.left, e.plotLeft + n), this.navigatorWidth =
                        k = K(p.len, e.plotWidth - 2 * n), this.scrollerLeft = m = h - n, this.scrollerWidth = n = n = k + 2 * n, c = K(c, p.translate(a)), d = K(d, p.translate(b)), f(c) && Infinity !== Math.abs(c) || (c = 0, d = n), !(p.translate(d, !0) - p.translate(c, !0) < e.xAxis[0].minRange))) {
                    this.zoomedMax = Math.min(Math.max(c, d, 0), k);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(c, d), 0), k);
                    this.range = this.zoomedMax - this.zoomedMin;
                    b = Math.round(this.zoomedMax);
                    a = Math.round(this.zoomedMin);
                    !w && v && (this.navigatorGroup = c = g.g("navigator").attr({zIndex: 3}).add(),
                        this.leftShade = g.rect().addClass("highcharts-navigator-mask" + (x ? "-inside" : "")).attr({fill: u.maskFill}).css(x && {cursor: "ew-resize"}).add(c), x || (this.rightShade = g.rect().addClass("highcharts-navigator-mask").attr({fill: u.maskFill}).add(c)), this.outline = g.path().addClass("highcharts-navigator-outline").attr({
                        "stroke-width": u.outlineWidth,
                        stroke: u.outlineColor
                    }).add(c));
                    if (v) {
                        g = w && !this.hasDragged ? "animate" : "attr";
                        x = this.outline.strokeWidth();
                        x /= 2;
                        w = q + x;
                        this.leftShade[g](u.maskInside ? {
                            x: h + a, y: q, width: b -
                            a, height: t
                        } : {x: h, y: q, width: a, height: t});
                        if (this.rightShade)this.rightShade[g]({x: h + b, y: q, width: k - b, height: t});
                        this.outline[g]({d: ["M", m, w, "L", h + a - x, w, h + a - x, w + r, "L", h + b - x, w + r, "L", h + b - x, w, m + n, w].concat(u.maskInside ? ["M", h + a + x, w, "L", h + b - x, w] : [])});
                        this.drawHandle(a + x, 0);
                        this.drawHandle(b + x, 1)
                    }
                    this.scrollbar && (this.scrollbar.hasDragged = this.hasDragged, this.scrollbar.position(this.scrollerLeft, this.top + (v ? this.height : -this.scrollbarHeight), this.scrollerWidth, this.scrollbarHeight), this.scrollbar.setRange(a /
                        k, b / k));
                    this.rendered = !0
                }
            }, addEvents: function () {
                var a = this.chart, b = a.container, c = this.mouseDownHandler, d = this.mouseMoveHandler, e = this.mouseUpHandler, f;
                f = [[b, "mousedown", c], [b, "mousemove", d], [q, "mouseup", e]];
                z && f.push([b, "touchstart", c], [b, "touchmove", d], [q, "touchend", e]);
                h(f, function (a) {
                    A.apply(null, a)
                });
                this._events = f;
                this.series && this.series[0] && A(this.series[0].xAxis, "foundExtremes", function () {
                    a.scroller.modifyNavigatorAxisExtremes()
                });
                A(a, "redraw", function () {
                    var a = this.scroller, b = a && (a.baseSeries &&
                        a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min, b.max)
                })
            }, removeEvents: function () {
                this._events && (h(this._events, function (a) {
                    d.apply(null, a)
                }), this._events = void 0);
                this.removeBaseSeriesEvents()
            }, removeBaseSeriesEvents: function () {
                var a = this.baseSeries || [];
                this.navigatorEnabled && a[0] && !1 !== this.navigatorOptions.adaptToUpdatedData && (h(a, function (a) {
                    d(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && d(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            },
            init: function (a) {
                var c = a.options, d = c.navigator, e = d.enabled, c = c.scrollbar, f = c.enabled, g = e ? d.height : 0, h = f ? c.height : 0;
                this.handles = [];
                this.scrollbarButtons = [];
                this.elementsToDestroy = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = g;
                this.scrollbarHeight = h;
                this.scrollbarEnabled = f;
                this.navigatorEnabled = e;
                this.navigatorOptions = d;
                this.scrollbarOptions = c;
                this.outlineHeight = g + h;
                var k = this, m, n, e = k.baseSeries;
                k.mouseDownHandler = function (c) {
                    c = a.pointer.normalize(c);
                    var d = k.zoomedMin, e = k.zoomedMax, f = k.top, h = k.scrollerLeft,
                        l = k.scrollerWidth, p = k.navigatorLeft, u = k.navigatorWidth, x = k.scrollbarPad || 0, t = k.range, q = c.chartX, v = c.chartY;
                    c = a.xAxis[0];
                    var r, w = b ? 10 : 7;
                    v > f && v < f + g && (Math.abs(q - d - p) < w ? (k.grabbedLeft = !0, k.otherHandlePos = e, k.fixedExtreme = c.max, a.fixedRange = null) : Math.abs(q - e - p) < w ? (k.grabbedRight = !0, k.otherHandlePos = d, k.fixedExtreme = c.min, a.fixedRange = null) : q > p + d - x && q < p + e + x ? (k.grabbedCenter = q, k.fixedWidth = t, n = q - d) : q > h && q < h + l && (e = q - p - t / 2, 0 > e ? e = 0 : e + t >= u && (e = u - t, r = k.getUnionExtremes().dataMax), e !== d && (k.fixedWidth = t, d = m.toFixedRange(e,
                        e + t, null, r), c.setExtremes(d.min, d.max, !0, null, {trigger: "navigator"}))))
                };
                k.mouseMoveHandler = function (b) {
                    var c = k.scrollbarHeight, d = k.navigatorLeft, e = k.navigatorWidth, f = k.scrollerLeft, g = k.scrollerWidth, h = k.range, l;
                    b.touches && 0 === b.touches[0].pageX || (b = a.pointer.normalize(b), l = b.chartX, l < d ? l = d : l > f + g - c && (l = f + g - c), k.grabbedLeft ? (k.hasDragged = !0, k.render(0, 0, l - d, k.otherHandlePos)) : k.grabbedRight ? (k.hasDragged = !0, k.render(0, 0, k.otherHandlePos, l - d)) : k.grabbedCenter && (k.hasDragged = !0, l < n ? l = n : l > e + n - h && (l = e +
                        n - h), k.render(0, 0, l - n, l - n + h)), k.hasDragged && k.scrollbar && k.scrollbar.options.liveRedraw && (b.DOMType = b.type, setTimeout(function () {
                        k.mouseUpHandler(b)
                    }, 0)))
                };
                k.mouseUpHandler = function (b) {
                    var c, d, e = b.DOMEvent || b;
                    if (k.hasDragged || "scrollbar" === b.trigger)k.zoomedMin === k.otherHandlePos ? c = k.fixedExtreme : k.zoomedMax === k.otherHandlePos && (d = k.fixedExtreme), k.zoomedMax === k.navigatorWidth && (d = k.getUnionExtremes().dataMax), c = m.toFixedRange(k.zoomedMin, k.zoomedMax, c, d), l(c.min) && a.xAxis[0].setExtremes(c.min, c.max,
                        !0, k.hasDragged ? !1 : null, {trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: e});
                    "mousemove" !== b.DOMType && (k.grabbedLeft = k.grabbedRight = k.grabbedCenter = k.fixedWidth = k.fixedExtreme = k.otherHandlePos = k.hasDragged = n = null)
                };
                var c = a.xAxis.length, f = a.yAxis.length, x = e && e[0] && e[0].xAxis || a.xAxis[0];
                a.extraBottomMargin = k.outlineHeight + d.margin;
                a.isDirtyBox = !0;
                k.navigatorEnabled ? (k.xAxis = m = new E(a, p({
                    breaks: x.options.breaks,
                    ordinal: x.options.ordinal
                }, d.xAxis, {
                    id: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    isX: !0,
                    type: "datetime",
                    index: c,
                    height: g,
                    offset: 0,
                    offsetLeft: h,
                    offsetRight: -h,
                    keepOrdinalPadding: !0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: 0,
                    maxPadding: 0,
                    zoomEnabled: !1
                })), k.yAxis = new E(a, p(d.yAxis, {
                    id: "navigator-y-axis",
                    alignTicks: !1,
                    height: g,
                    offset: 0,
                    index: f,
                    zoomEnabled: !1
                })), e || d.series.data ? k.addBaseSeries() : 0 === a.series.length && y(a, "redraw", function (b, c) {
                    0 < a.series.length && !k.series && (k.setBaseSeries(), a.redraw = b);
                    b.call(a, c)
                })) : k.xAxis = m = {
                    translate: function (b, c) {
                        var d = a.xAxis[0], e = d.getExtremes(),
                            f = a.plotWidth - 2 * h, g = G("min", d.options.min, e.dataMin), d = G("max", d.options.max, e.dataMax) - g;
                        return c ? b * d / f + g : f * (b - g) / d
                    }, toFixedRange: E.prototype.toFixedRange, fake: !0
                };
                a.options.scrollbar.enabled && (a.scrollbar = k.scrollbar = new F(a.renderer, p(a.options.scrollbar, {margin: k.navigatorEnabled ? 0 : 10}), a), A(k.scrollbar, "changed", function (b) {
                    var c = k.navigatorWidth, d = c * this.to, c = c * this.from;
                    k.hasDragged = k.scrollbar.hasDragged;
                    k.render(0, 0, c, d);
                    (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function () {
                        k.mouseUpHandler(b)
                    })
                }));
                k.addBaseSeriesEvents();
                k.addEvents()
            }, getUnionExtremes: function (a) {
                var b = this.chart.xAxis[0], c = this.xAxis, d = c.options, e = b.options, f;
                a && null === b.dataMin || (f = {
                    dataMin: K(d && d.min, G("min", e.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: K(d && d.max, G("max", e.max, b.dataMax, c.dataMax, c.max))
                });
                return f
            }, setBaseSeries: function (a) {
                var b = this.chart, c = this.baseSeries = [];
                a = a || b.options && b.options.navigator.baseSeries || 0;
                this.series && (this.removeBaseSeriesEvents(), h(this.series, function (a) {
                    a.remove()
                }));
                h(b.series ||
                    [], function (b, d) {
                    (b.options.showInNavigator || (d === a || b.options.id === a) && !1 !== b.options.showInNavigator) && c.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.addBaseSeries()
            }, addBaseSeries: function () {
                var a = this, b = a.chart, c = a.series = [], d = a.baseSeries, e, f, g = a.navigatorOptions.series, k, l = {
                    enableMouseTracking: !1,
                    group: "nav",
                    padXAxis: !1,
                    xAxis: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    showInLegend: !1,
                    stacking: !1,
                    isInternal: !0,
                    visible: !0
                };
                d ? h(d, function (d, h) {
                    l.name = "Navigator " + (h + 1);
                    e = d.options || {};
                    k = e.navigatorOptions ||
                        {};
                    f = p(e, l, g, k);
                    h = k.data || g.data;
                    a.hasNavigatorData = a.hasNavigatorData || !!h;
                    f.data = h || e.data && e.data.slice(0);
                    d.navigatorSeries = b.initSeries(f);
                    c.push(d.navigatorSeries)
                }) : (f = p(g, l), f.data = g.data, a.hasNavigatorData = !!f.data, c.push(b.initSeries(f)));
                this.addBaseSeriesEvents()
            }, addBaseSeriesEvents: function () {
                var a = this, b = a.baseSeries || [];
                b[0] && b[0].xAxis && A(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                !1 !== this.navigatorOptions.adaptToUpdatedData && h(b, function (b) {
                    b.xAxis && (A(b, "updatedData",
                        this.updatedDataHandler), b.userOptions.events = g(b.userOptions.event, {updatedData: this.updatedDataHandler}));
                    A(b, "remove", function () {
                        this.navigatorSeries && (n(a.series, this.navigatorSeries), this.navigatorSeries.remove(), delete this.navigatorSeries)
                    })
                }, this)
            }, modifyNavigatorAxisExtremes: function () {
                var a = this.xAxis, b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) || b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            }, modifyBaseAxisExtremes: function () {
                var a = this.chart.scroller, b = this.getExtremes(),
                    c = b.dataMin, d = b.dataMax, b = b.max - b.min, e = a.stickToMin, g = a.stickToMax, h, k, l = a.series && a.series[0], m = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (e && (k = c, h = k + b), g && (h = d, e || (k = Math.max(h - b, l && l.xData ? l.xData[0] : -Number.MAX_VALUE))), m && (e || g) && f(k) && (this.min = this.userMin = k, this.max = this.userMax = h));
                a.stickToMin = a.stickToMax = null
            }, updatedDataHandler: function () {
                var a = this.chart.scroller, b = this.navigatorSeries;
                a.stickToMin = f(this.xAxis.min) && this.xAxis.min <= this.xData[0];
                a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.navigatorWidth);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            }, destroy: function () {
                this.removeEvents();
                this.xAxis && (n(this.chart.xAxis, this.xAxis), n(this.chart.axes, this.xAxis));
                this.yAxis && (n(this.chart.yAxis, this.yAxis), n(this.chart.axes, this.yAxis));
                h(this.series || [], function (a) {
                    a.destroy && a.destroy()
                });
                h("series xAxis yAxis leftShade rightShade outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "),
                    function (a) {
                        this[a] && this[a].destroy && this[a].destroy();
                        this[a] = null
                    }, this);
                h([this.handles, this.elementsToDestroy], function (a) {
                    r(a)
                }, this)
            }
        };
        a.Navigator = C;
        y(E.prototype, "zoom", function (a, b, c) {
            var d = this.chart, e = d.options, f = e.chart.zoomType, g = e.navigator, e = e.rangeSelector, h;
            this.isXAxis && (g && g.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? h = !1 : "xy" === f && (d = this.previousZoom, l(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !==
            h ? h : a.call(this, b, c)
        });
        y(H.prototype, "init", function (a, b, c) {
            A(this, "beforeRender", function () {
                var a = this.options;
                if (a.navigator.enabled || a.scrollbar.enabled)this.scroller = this.navigator = new C(this)
            });
            a.call(this, b, c)
        });
        y(H.prototype, "getMargins", function (a) {
            var b = this.legend, c = b.options, d = this.scroller, e, f;
            a.apply(this, [].slice.call(arguments, 1));
            d && (e = d.xAxis, f = d.yAxis, d.top = d.navigatorOptions.top || this.chartHeight - d.height - d.scrollbarHeight - this.spacing[2] - ("bottom" === c.verticalAlign && c.enabled && !c.floating ? b.legendHeight + K(c.margin, 10) : 0), e && f && (e.options.top = f.options.top = d.top, e.setAxisSize(), f.setAxisSize()))
        });
        y(t.prototype, "addPoint", function (a, b, d, f, g) {
            var h = this.options.turboThreshold;
            h && this.xData.length > h && e(b, !0) && this.chart.scroller && c(20, !0);
            a.call(this, b, d, f, g)
        });
        y(H.prototype, "addSeries", function (a, b, c, d) {
            a = a.call(this, b, !1, d);
            this.scroller && this.scroller.setBaseSeries();
            K(c, !0) && this.redraw();
            return a
        });
        y(t.prototype, "update", function (a, b, c) {
            a.call(this, b, !1);
            this.chart.scroller &&
            this.chart.scroller.setBaseSeries();
            K(c, !0) && this.chart.redraw()
        })
    })(N);
    (function (a) {
        function C(a) {
            this.init(a)
        }

        var A = a.addEvent, E = a.Axis, H = a.Chart, w = a.css, k = a.createElement, l = a.dateFormat, r = a.defaultOptions, q = a.defined, h = a.destroyObjectProperties, n = a.discardElement, c = a.each, g = a.extend, m = a.fireEvent, z = a.Date, f = a.isNumber, e = a.merge, b = a.pick, p = a.pInt, K = a.removeEvent, d = a.splat, F = a.wrap;
        g(r, {
            rangeSelector: {
                buttonTheme: {"stroke-width": 0, width: 28, height: 18, padding: 2, zIndex: 7},
                height: 35,
                inputPosition: {align: "right"},
                labelStyle: {color: "#666666"}
            }
        });
        r.lang = e(r.lang, {rangeSelectorZoom: "缩放", rangeSelectorFrom: "从", rangeSelectorTo: "到"});
        C.prototype = {
            clickButton: function (a, e) {
                var g = this, h = g.selected, k = g.chart, l = g.buttons, m = g.buttonOptions[a], n = k.xAxis[0], p = k.scroller && k.scroller.getUnionExtremes() || n || {}, q = p.dataMin, t = p.dataMax, v, r = n && Math.round(Math.min(n.max, b(t, n.max))), w = m.type, C, p = m._range, F, H, K, N = m.dataGrouping;
                if (null !== q && null !== t && a !== g.selected) {
                    k.fixedRange = p;
                    N && (this.forcedDataGrouping = !0, E.prototype.setDataGrouping.call(n ||
                        {chart: this.chart}, N, !1));
                    if ("month" === w || "year" === w)n ? (w = {
                        range: m,
                        max: r,
                        dataMin: q,
                        dataMax: t
                    }, v = n.minFromRange.call(w), f(w.newMax) && (r = w.newMax)) : p = m; else if (p)v = Math.max(r - p, q), r = Math.min(v + p, t); else if ("ytd" === w)if (n)void 0 === t && (q = Number.MAX_VALUE, t = Number.MIN_VALUE, c(k.series, function (a) {
                        a = a.xData;
                        q = Math.min(a[0], q);
                        t = Math.max(a[a.length - 1], t)
                    }), e = !1), r = new z(t), v = r[z.hcGetFullYear](), v = F = Math.max(q || 0, z.UTC(v, 0, 1)), r = r.getTime(), r = Math.min(t || r, r); else {
                        A(k, "beforeRender", function () {
                            g.clickButton(a)
                        });
                        return
                    } else"all" === w && n && (v = q, r = t);
                    l[h] && l[h].setState(0);
                    l[a] && (l[a].setState(2), g.lastSelected = a);
                    n ? (n.setExtremes(v, r, b(e, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: m
                    }), g.setSelected(a)) : (C = d(k.options.xAxis)[0], K = C.range, C.range = p, H = C.min, C.min = F, g.setSelected(a), A(k, "load", function () {
                        C.range = K;
                        C.min = H
                    }))
                }
            },
            setSelected: function (a) {
                this.selected = this.options.selected = a
            },
            defaultButtons: [{type: "month", count: 1, text: "1m"}, {
                type: "month",
                count: 3,
                text: "3m"
            }, {type: "month", count: 6, text: "6m"},
                {type: "ytd", text: "YTD"}, {type: "year", count: 1, text: "1y"}, {type: "all", text: "All"}],
            init: function (a) {
                var b = this, d = a.options.rangeSelector, e = d.buttons || [].concat(b.defaultButtons), f = d.selected, g = b.blurInputs = function () {
                    var a = b.minInput, c = b.maxInput;
                    a && a.blur && m(a, "blur");
                    c && c.blur && m(c, "blur")
                };
                b.chart = a;
                b.options = d;
                b.buttons = [];
                a.extraTopMargin = d.height;
                b.buttonOptions = e;
                A(a.container, "mousedown", g);
                A(a, "resize", g);
                c(e, b.computeButtonRange);
                void 0 !== f && e[f] && this.clickButton(f, !1);
                A(a, "load", function () {
                    A(a.xAxis[0],
                        "setExtremes", function (c) {
                            this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== c.trigger && "updatedData" !== c.trigger && b.forcedDataGrouping && this.setDataGrouping(!1, !1)
                        });
                    A(a.xAxis[0], "afterSetExtremes", function () {
                        b.updateButtonStates(!0)
                    })
                })
            },
            updateButtonStates: function (a) {
                var b = this, d = this.chart, e = d.xAxis[0], f = d.scroller && d.scroller.getUnionExtremes() || e, g = f.dataMin, h = f.dataMax, k = b.selected, l = b.options.allButtonsEnabled, m = b.buttons;
                a && d.fixedRange !== Math.round(e.max - e.min) && (m[k] && m[k].setState(0),
                    b.setSelected(null));
                c(b.buttonOptions, function (a, c) {
                    var f = Math.round(e.max - e.min), n = a._range, p = a.type, q = a.count || 1, u = n > h - g, t = n < e.minRange;
                    a = "all" === a.type && e.max - e.min >= h - g && 2 !== m[c].state;
                    var v = d.renderer.forExport && c === k, n = n === f, r = !e.hasVisibleSeries;
                    ("month" === p || "year" === p) && f >= 864E5 * {
                        month: 28,
                        year: 365
                    }[p] * q && f <= 864E5 * {month: 31, year: 366}[p] * q && (n = !0);
                    v || n && c !== k && c === b.lastSelected ? (b.setSelected(c), m[c].setState(2)) : !l && (u || t || a || r) ? m[c].setState(3) : 3 === m[c].state && m[c].setState(0)
                })
            },
            computeButtonRange: function (a) {
                var b =
                    a.type, c = a.count || 1, d = {
                    millisecond: 1,
                    second: 1E3,
                    minute: 6E4,
                    hour: 36E5,
                    day: 864E5,
                    week: 6048E5
                };
                if (d[b])a._range = d[b] * c; else if ("month" === b || "year" === b)a._range = 864E5 * {
                        month: 30,
                        year: 365
                    }[b] * c
            },
            setInputValue: function (a, b) {
                var c = this.chart.options.rangeSelector, d = this[a + "Input"];
                q(b) && (d.previousValue = d.HCTime, d.HCTime = b);
                d.value = l(c.inputEditDateFormat || "%Y-%m-%d", d.HCTime);
                this[a + "DateBox"].attr({text: l(c.inputDateFormat || "%b %e, %Y", d.HCTime)})
            },
            showInput: function (a) {
                var b = this.inputGroup, c = this[a + "DateBox"];
                w(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY + "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function (a) {
                w(this[a + "Input"], {border: 0, width: "1px", height: "1px"});
                this.setInputValue(a)
            },
            drawInput: function (a) {
                function b() {
                    var a = t.value, b = (m.inputDateParser || Date.parse)(a), e = d.xAxis[0], g = d.scroller && d.scroller.xAxis ? d.scroller.xAxis : e, h = g.dataMin, g = g.dataMax;
                    b !== t.previousValue && (t.previousValue = b, f(b) || (b = a.split("-"), b = Date.UTC(p(b[0]), p(b[1]) -
                        1, p(b[2]))), f(b) && (r.global.useUTC || (b += 6E4 * (new Date).getTimezoneOffset()), q ? b > c.maxInput.HCTime ? b = void 0 : b < h && (b = h) : b < c.minInput.HCTime ? b = void 0 : b > g && (b = g), void 0 !== b && e.setExtremes(q ? b : e.min, q ? e.max : b, void 0, void 0, {trigger: "rangeSelectorInput"})))
                }

                var c = this, d = c.chart, h = d.renderer.style || {}, l = d.renderer, m = d.options.rangeSelector, n = c.div, q = "min" === a, t, z, A = this.inputGroup;
                this[a + "Label"] = z = l.label(r.lang[q ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({padding: 2}).add(A);
                A.offset += z.width + 5;
                this[a + "DateBox"] = l = l.label("", A.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: m.inputBoxWidth || 90,
                    height: m.inputBoxHeight || 17,
                    stroke: m.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1,
                    "text-align": "center"
                }).on("click", function () {
                    c.showInput(a);
                    c[a + "Input"].focus()
                }).add(A);
                A.offset += l.width + (q ? 10 : 0);
                this[a + "Input"] = t = k("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {top: d.plotTop + "px"}, n);
                z.css(e(h, m.labelStyle));
                l.css(e({color: "#333333"},
                    h, m.inputStyle));
                w(t, g({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: h.fontSize,
                    fontFamily: h.fontFamily,
                    left: "-9em"
                }, m.inputStyle));
                t.onfocus = function () {
                    c.showInput(a)
                };
                t.onblur = function () {
                    c.hideInput(a)
                };
                t.onchange = b;
                t.onkeypress = function (a) {
                    13 === a.keyCode && b()
                }
            },
            getPosition: function () {
                var a = this.chart, c = a.options.rangeSelector, a = b((c.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - c.height);
                return {buttonTop: a, inputTop: a - 10}
            },
            render: function (a, d) {
                var e =
                    this, f = e.chart, h = f.renderer, l = f.container, m = f.options, n = m.exporting && !1 !== m.exporting.enabled && m.navigation && m.navigation.buttonOptions, p = m.rangeSelector, t = e.buttons, m = r.lang, v = e.div, v = e.inputGroup, w = p.buttonTheme, z = p.buttonPosition || {}, A = p.inputEnabled, C = w && w.states, E = f.plotLeft, F, H = this.getPosition(), K = e.group, N = e.rendered;
                !1 !== p.enabled && (N || (e.group = K = h.g("range-selector-buttons").add(), e.zoomText = h.text(m.rangeSelectorZoom, b(z.x, E), 15).css(p.labelStyle).add(K), F = b(z.x, E) + e.zoomText.getBBox().width +
                    5, c(e.buttonOptions, function (a, c) {
                    t[c] = h.button(a.text, F, 0, function () {
                        e.clickButton(c);
                        e.isActive = !0
                    }, w, C && C.hover, C && C.select, C && C.disabled).attr({"text-align": "center"}).add(K);
                    F += t[c].width + b(p.buttonSpacing, 5);
                    e.selected === c && t[c].setState(2)
                }), e.updateButtonStates(), !1 !== A && (e.div = v = k("div", null, {
                    position: "relative",
                    height: 0,
                    zIndex: 1
                }), l.parentNode.insertBefore(v, l), e.inputGroup = v = h.g("input-group").add(), v.offset = 0, e.drawInput("min"), e.drawInput("max"))), K[N ? "animate" : "attr"]({translateY: H.buttonTop}),
                !1 !== A && (v.align(g({
                    y: H.inputTop,
                    width: v.offset,
                    x: n && H.inputTop < (n.y || 0) + n.height - f.spacing[0] ? -40 : 0
                }, p.inputPosition), !0, f.spacingBox), q(A) || (f = K.getBBox(), v[v.alignAttr.translateX < f.x + f.width + 10 ? "hide" : "show"]()), e.setInputValue("min", a), e.setInputValue("max", d)), e.rendered = !0)
            },
            update: function (a) {
                var b = this.chart;
                e(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b)
            },
            destroy: function () {
                var a = this.minInput, b = this.maxInput, c = this.chart, d = this.blurInputs, e;
                K(c.container, "mousedown", d);
                K(c, "resize",
                    d);
                h(this.buttons);
                a && (a.onfocus = a.onblur = a.onchange = null);
                b && (b.onfocus = b.onblur = b.onchange = null);
                for (e in this)this[e] && "chart" !== e && (this[e].destroy ? this[e].destroy() : this[e].nodeType && n(this[e])), this[e] !== C.prototype[e] && (this[e] = null)
            }
        };
        E.prototype.toFixedRange = function (a, c, d, e) {
            var g = this.chart && this.chart.fixedRange;
            a = b(d, this.translate(a, !0));
            c = b(e, this.translate(c, !0));
            d = g && (c - a) / g;
            .7 < d && 1.3 > d && (e ? a = c - g : c = a + g);
            f(a) || (a = c = void 0);
            return {min: a, max: c}
        };
        E.prototype.minFromRange = function () {
            var a =
                this.range, c = {month: "Month", year: "FullYear"}[a.type], d, e = this.max, g, h, k = function (a, b) {
                var d = new Date(a);
                d["set" + c](d["get" + c]() + b);
                return d.getTime() - a
            };
            f(a) ? (d = this.max - a, h = a) : d = e + k(e, -a.count);
            g = b(this.dataMin, Number.MIN_VALUE);
            f(d) || (d = g);
            d <= g && (d = g, void 0 === h && (h = k(d, a.count)), this.newMax = Math.min(d + h, this.dataMax));
            f(e) || (d = void 0);
            return d
        };
        F(H.prototype, "init", function (a, b, c) {
            A(this, "init", function () {
                this.options.rangeSelector.enabled && (this.rangeSelector = new C(this))
            });
            a.call(this, b, c)
        });
        a.RangeSelector = C
    })(N);
    (function (a) {
        var C = a.addEvent, A = a.isNumber, E = a.removeEvent;
        a.Chart.prototype.callbacks.push(function (a) {
            function w() {
                l = a.xAxis[0].getExtremes();
                A(l.min) && q.render(l.min, l.max)
            }

            function k(a) {
                q.render(a.min, a.max)
            }

            var l, r = a.scroller, q = a.rangeSelector;
            r && (l = a.xAxis[0].getExtremes(), r.render(l.min, l.max));
            q && (C(a.xAxis[0], "afterSetExtremes", k), C(a, "redraw", w), w());
            C(a, "destroy", function () {
                q && (E(a, "redraw", w), E(a.xAxis[0], "afterSetExtremes", k))
            })
        })
    })(N);
    (function (a) {
        var C = a.arrayMax,
            A = a.arrayMin, E = a.Axis, H = a.Chart, w = a.defined, k = a.each, l = a.extend, r = a.format, q = a.inArray, h = a.isNumber, n = a.isString, c = a.map, g = a.merge, m = a.pick, z = a.Point, f = a.Pointer, e = a.Renderer, b = a.Series, p = a.splat, K = a.stop, d = a.SVGRenderer, F = a.VMLRenderer, t = a.wrap, v = b.prototype, y = v.init, I = v.processData, G = z.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function (a, b, d) {
            var e = n(a) || a.nodeName, f = arguments[e ? 1 : 0], h = f.series, k, l = m(f.navigator && f.navigator.enabled, !0) ? {
                startOnTick: !1,
                endOnTick: !1
            } : null, q = {
                marker: {
                    enabled: !1,
                    radius: 2
                }
            }, r = {shadow: !1, borderWidth: 0};
            f.xAxis = c(p(f.xAxis || {}), function (a) {
                return g({
                    minPadding: 0,
                    maxPadding: 0,
                    ordinal: !0,
                    title: {text: null},
                    labels: {overflow: "justify"},
                    showLastLabel: !0
                }, a, {type: "datetime", categories: null}, l)
            });
            f.yAxis = c(p(f.yAxis || {}), function (a) {
                k = m(a.opposite, !0);
                return g({labels: {y: -2}, opposite: k, showLastLabel: !1, title: {text: null}}, a)
            });
            f.series = null;
            f = g({
                chart: {panning: !0, pinchType: "x"},
                navigator: {enabled: !0},
                scrollbar: {enabled: !0},
                rangeSelector: {enabled: !0},
                title: {
                    text: null,
                    style: {fontSize: "16px"}
                },
                tooltip: {shared: !0, crosshairs: !0},
                legend: {enabled: !1},
                plotOptions: {
                    line: q,
                    spline: q,
                    area: q,
                    areaspline: q,
                    arearange: q,
                    areasplinerange: q,
                    column: r,
                    columnrange: r,
                    candlestick: r,
                    ohlc: r
                }
            }, f, {_stock: !0, chart: {inverted: !1}});
            f.series = h;
            return e ? new H(a, f, d) : new H(f, b)
        };
        t(f.prototype, "init", function (a, b, c) {
            var d = c.chart.pinchType || "";
            a.call(this, b, c);
            this.pinchX = this.pinchHor = -1 !== d.indexOf("x");
            this.pinchY = this.pinchVert = -1 !== d.indexOf("y");
            this.hasZoom = this.hasZoom || this.pinchHor ||
                this.pinchVert
        });
        t(E.prototype, "autoLabelAlign", function (a) {
            var b = this.chart, c = this.options, b = b._labelPanes = b._labelPanes || {}, d = this.options.labels;
            return this.chart.options._stock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x && (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = 1, "right") : a.call(this, [].slice.call(arguments, 1))
        });
        t(E.prototype, "getPlotLinePath", function (a, b, d, e, f, g) {
            var l = this, p = this.isLinked && !this.series ? this.linkedParent.series : this.series, u = l.chart, r = u.renderer,
                t = l.left, x = l.top, v, y, z, D, A = [], C = [], E, F;
            if ("colorAxis" === l.coll)return a.apply(this, [].slice.call(arguments, 1));
            C = function (a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = l.options[b];
                return h(a) ? [u[b][a]] : n(a) ? [u.get(a)] : c(p, function (a) {
                    return a[b]
                })
            }(l.coll);
            k(l.isXAxis ? u.yAxis : u.xAxis, function (a) {
                if (w(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis", b = w(a.options[b]) ? u[b][a.options[b]] : u[b][0];
                    l === b && C.push(a)
                }
            });
            E = C.length ? [] : [l.isXAxis ? u.yAxis[0] : u.xAxis[0]];
            k(C,
                function (a) {
                    -1 === q(a, E) && E.push(a)
                });
            F = m(g, l.translate(b, null, null, e));
            h(F) && (l.horiz ? k(E, function (a) {
                var b;
                y = a.pos;
                D = y + a.len;
                v = z = Math.round(F + l.transB);
                if (v < t || v > t + l.width)f ? v = z = Math.min(Math.max(t, v), t + l.width) : b = !0;
                b || A.push("M", v, y, "L", z, D)
            }) : k(E, function (a) {
                var b;
                v = a.pos;
                z = v + a.len;
                y = D = Math.round(x + l.height - F);
                if (y < x || y > x + l.height)f ? y = D = Math.min(Math.max(x, y), l.top + l.height) : b = !0;
                b || A.push("M", v, y, "L", z, D)
            }));
            return 0 < A.length ? r.crispPolyLine(A, d || 1) : null
        });
        E.prototype.getPlotBandPath = function (a,
                                                b) {
            b = this.getPlotLinePath(b, null, null, !0);
            a = this.getPlotLinePath(a, null, null, !0);
            var c = [], d;
            if (a && b && a.toString() !== b.toString())for (d = 0; d < a.length; d += 6)c.push("M", a[d + 1], a[d + 2], "L", a[d + 4], a[d + 5], b[d + 4], b[d + 5], b[d + 1], b[d + 2]); else c = null;
            return c
        };
        d.prototype.crispPolyLine = function (a, b) {
            var c;
            for (c = 0; c < a.length; c += 6)a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 / 2);
            return a
        };
        e === F && (F.prototype.crispPolyLine = d.prototype.crispPolyLine);
        t(E.prototype, "hideCrosshair", function (a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        t(E.prototype, "drawCrosshair", function (a, b, c) {
            var d, e;
            a.call(this, b, c);
            if (w(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                a = this.chart;
                var f = this.options.crosshair.label, g = this.horiz;
                d = this.opposite;
                e = this.left;
                var h = this.top, k = this.crossLabel, n, p = f.format, q = "", t = "inside" === this.options.tickPosition, v = !1 !== this.crosshair.snap, x = 0;
                b || (b = this.cross && this.cross.e);
                n = g ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                k || (k = this.crossLabel = a.renderer.label(null, null, null, f.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                    align: f.align || n,
                    padding: m(f.padding, 8),
                    r: m(f.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup), k.attr({
                    fill: f.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                    stroke: f.borderColor || "",
                    "stroke-width": f.borderWidth ||
                    0
                }).css(l({color: "#ffffff", fontWeight: "normal", fontSize: "11px", textAlign: "center"}, f.style)));
                g ? (n = v ? c.plotX + e : b.chartX, h += d ? 0 : this.height) : (n = d ? this.width + e : 0, h = v ? c.plotY + h : b.chartY);
                p || f.formatter || (this.isDatetimeAxis && (q = "%b %d, %Y"), p = "{value" + (q ? ":" + q : "") + "}");
                b = v ? c[this.isXAxis ? "x" : "y"] : this.toValue(g ? b.chartX : b.chartY);
                k.attr({text: p ? r(p, {value: b}) : f.formatter.call(this, b), x: n, y: h, visibility: "visible"});
                b = k.getBBox();
                if (g) {
                    if (t && !d || !t && d)h = k.y - b.height
                } else h = k.y - b.height / 2;
                g ? (d = e - b.x, e =
                    e + this.width - b.x) : (d = "left" === this.labelAlign ? e : 0, e = "right" === this.labelAlign ? e + this.width : a.chartWidth);
                k.translateX < d && (x = d - k.translateX);
                k.translateX + b.width >= e && (x = -(k.translateX + b.width - e));
                k.attr({
                    x: n + x,
                    y: h,
                    anchorX: g ? n : this.opposite ? 0 : a.chartWidth,
                    anchorY: g ? this.opposite ? a.chartHeight : 0 : h + b.height / 2
                })
            }
        });
        v.init = function () {
            y.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        v.setCompare = function (a) {
            this.modifyValue = "value" === a || "percent" === a ? function (b, c) {
                var d = this.compareValue;
                if (void 0 !==
                    b && void 0 !== d)return b = "value" === a ? b - d : b = b / d * 100 - 100, c && (c.change = b), b
            } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        v.processData = function () {
            var a, b = -1, c, d, e, f;
            I.apply(this, arguments);
            if (this.xAxis && this.processedYData)for (c = this.processedXData, d = this.processedYData, e = d.length, this.pointArrayMap && (b = q("close", this.pointArrayMap), -1 === b && (b = q(this.pointValKey || "y", this.pointArrayMap))), a = 0; a < e - 1; a++)if (f = -1 < b ? d[a][b] : d[a], h(f) && c[a + 1] >= this.xAxis.min && 0 !== f) {
                this.compareValue =
                    f;
                break
            }
        };
        t(v, "getExtremes", function (a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = A(b), this.dataMax = C(b))
        });
        E.prototype.setCompare = function (a, b) {
            this.isXAxis || (k(this.series, function (b) {
                b.setCompare(a)
            }), m(b, !0) && this.chart.redraw())
        };
        z.prototype.tooltipFormatter = function (b) {
            b = b.replace("{point.change}", (0 < this.change ? "+" : "") + a.numberFormat(this.change, m(this.series.tooltipOptions.changeDecimals,
                    2)));
            return G.apply(this, [b])
        };
        t(b.prototype, "render", function (a) {
            this.chart.options._stock && this.xAxis && (!this.clipBox && this.animate ? (this.clipBox = g(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? (K(this.chart[this.sharedClipKey]), this.chart[this.sharedClipKey].attr({
                width: this.xAxis.len,
                height: this.yAxis.len
            })) : this.clipBox && (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
            a.call(this)
        })
    })(N);
    return N
});
