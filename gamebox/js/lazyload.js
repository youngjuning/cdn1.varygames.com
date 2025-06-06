/*!Lazy Load 2.0.0-rc.2 - MIT license - Copyright 2007-2019 Mika Tuupola*/ ! function (t, e) {
    "object" == typeof exports ? module.exports = e(t) : "function" == typeof define && define.amd ? define([], e) : t.LazyLoad = e(t)
}("undefined" != typeof global ? global : this.window || this.global, function (t) {
    "use strict";

    function e(t, e) {
        this.settings = s(r, e || {}), this.images = t || document.querySelectorAll(this.settings.selector), this.observer = null, this.init()
    }
    "function" == typeof define && define.amd && (t = window);
    const r = {
            src: "data-src",
            srcset: "data-srcset",
            selector: ".lazyload",
            root: null,
            rootMargin: "0px",
            threshold: 0
        },
        s = function () {
            let t = {},
                e = !1,
                r = 0,
                o = arguments.length;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], r++);
            for (; r < o; r++) ! function (r) {
                for (let o in r) Object.prototype.hasOwnProperty.call(r, o) && (e && "[object Object]" === Object.prototype.toString.call(r[o]) ? t[o] = s(!0, t[o], r[o]) : t[o] = r[o])
            }(arguments[r]);
            return t
        };
    if (e.prototype = {
            init: function () {
                if (!t.IntersectionObserver) return void this.loadImages();
                let e = this,
                    r = {
                        root: this.settings.root,
                        rootMargin: this.settings.rootMargin,
                        threshold: [this.settings.threshold]
                    };
                this.observer = new IntersectionObserver(function (t) {
                    Array.prototype.forEach.call(t, function (t) {
                        if (t.isIntersecting) {
                            e.observer.unobserve(t.target);
                            let r = t.target.getAttribute(e.settings.src),
                                s = t.target.getAttribute(e.settings.srcset);
                            "img" === t.target.tagName.toLowerCase() ? (r && (t.target.src = r), s && (t.target.srcset = s)) : t.target.style.backgroundImage = "url(" + r + ")"
                        }
                    })
                }, r), Array.prototype.forEach.call(this.images, function (t) {
                    e.observer.observe(t)
                })
            },
            loadAndDestroy: function () {
                this.settings && (this.loadImages(), this.destroy())
            },
            loadImages: function () {
                if (!this.settings) return;
                let t = this;
                Array.prototype.forEach.call(this.images, function (e) {
                    let r = e.getAttribute(t.settings.src),
                        s = e.getAttribute(t.settings.srcset);
                    "img" === e.tagName.toLowerCase() ? (r && (e.src = r), s && (e.srcset = s)) : e.style.backgroundImage = "url('" + r + "')"
                })
            },
            destroy: function () {
                this.settings && (this.observer.disconnect(), this.settings = null)
            }
        }, t.lazyload = function (t, r) {
            return new e(t, r)
        }, t.jQuery) {
        const r = t.jQuery;
        r.fn.lazyload = function (t) {
            return t = t || {}, t.attribute = t.attribute || "data-src", new e(r.makeArray(this), t), this
        }
    }
    return e
});