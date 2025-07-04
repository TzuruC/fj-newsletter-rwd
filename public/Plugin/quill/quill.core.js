/*! For license information please see quill.core.js.LICENSE.txt */
!(function (t, e) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = e())
        : 'function' == typeof define && define.amd
        ? define([], e)
        : 'object' == typeof exports
        ? (exports.Quill = e())
        : (t.Quill = e());
})(self, function () {
    return (function () {
        var t = {
                9698: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Ay: function () {
                            return c;
                        },
                        Ji: function () {
                            return h;
                        },
                        zo: function () {
                            return u;
                        },
                    });
                    var r = n(6003),
                        i = n(5232),
                        s = n.n(i),
                        o = n(3036),
                        l = n(4850),
                        a = n(5508);
                    class c extends r.BlockBlot {
                        cache = {};
                        delta() {
                            return (
                                null == this.cache.delta &&
                                    (this.cache.delta = (function (t) {
                                        let e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                                        return t
                                            .descendants(r.LeafBlot)
                                            .reduce(
                                                (t, n) => (0 === n.length() ? t : t.insert(n.value(), h(n, {}, e))),
                                                new (s())()
                                            )
                                            .insert('\n', h(t));
                                    })(this)),
                                this.cache.delta
                            );
                        }
                        deleteAt(t, e) {
                            super.deleteAt(t, e), (this.cache = {});
                        }
                        formatAt(t, e, n, i) {
                            e <= 0 ||
                                (this.scroll.query(n, r.Scope.BLOCK)
                                    ? t + e === this.length() && this.format(n, i)
                                    : super.formatAt(t, Math.min(e, this.length() - t - 1), n, i),
                                (this.cache = {}));
                        }
                        insertAt(t, e, n) {
                            if (null != n) return super.insertAt(t, e, n), void (this.cache = {});
                            if (0 === e.length) return;
                            const r = e.split('\n'),
                                i = r.shift();
                            i.length > 0 &&
                                (t < this.length() - 1 || null == this.children.tail
                                    ? super.insertAt(Math.min(t, this.length() - 1), i)
                                    : this.children.tail.insertAt(this.children.tail.length(), i),
                                (this.cache = {}));
                            let s = this;
                            r.reduce((t, e) => ((s = s.split(t, !0)), s.insertAt(0, e), e.length), t + i.length);
                        }
                        insertBefore(t, e) {
                            const { head: n } = this.children;
                            super.insertBefore(t, e), n instanceof o.A && n.remove(), (this.cache = {});
                        }
                        length() {
                            return (
                                null == this.cache.length && (this.cache.length = super.length() + 1), this.cache.length
                            );
                        }
                        moveChildren(t, e) {
                            super.moveChildren(t, e), (this.cache = {});
                        }
                        optimize(t) {
                            super.optimize(t), (this.cache = {});
                        }
                        path(t) {
                            return super.path(t, !0);
                        }
                        removeChild(t) {
                            super.removeChild(t), (this.cache = {});
                        }
                        split(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            if (e && (0 === t || t >= this.length() - 1)) {
                                const e = this.clone();
                                return 0 === t
                                    ? (this.parent.insertBefore(e, this), this)
                                    : (this.parent.insertBefore(e, this.next), e);
                            }
                            const n = super.split(t, e);
                            return (this.cache = {}), n;
                        }
                    }
                    (c.blotName = 'block'),
                        (c.tagName = 'P'),
                        (c.defaultChild = o.A),
                        (c.allowedChildren = [o.A, l.A, r.EmbedBlot, a.A]);
                    class u extends r.EmbedBlot {
                        attach() {
                            super.attach(), (this.attributes = new r.AttributorStore(this.domNode));
                        }
                        delta() {
                            return new (s())().insert(this.value(), { ...this.formats(), ...this.attributes.values() });
                        }
                        format(t, e) {
                            const n = this.scroll.query(t, r.Scope.BLOCK_ATTRIBUTE);
                            null != n && this.attributes.attribute(n, e);
                        }
                        formatAt(t, e, n, r) {
                            this.format(n, r);
                        }
                        insertAt(t, e, n) {
                            if (null != n) return void super.insertAt(t, e, n);
                            const r = e.split('\n'),
                                i = r.pop(),
                                s = r.map((t) => {
                                    const e = this.scroll.create(c.blotName);
                                    return e.insertAt(0, t), e;
                                }),
                                o = this.split(t);
                            s.forEach((t) => {
                                this.parent.insertBefore(t, o);
                            }),
                                i && this.parent.insertBefore(this.scroll.create('text', i), o);
                        }
                    }
                    function h(t) {
                        let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                            n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2];
                        return null == t
                            ? e
                            : ('formats' in t &&
                                  'function' == typeof t.formats &&
                                  ((e = { ...e, ...t.formats() }), n && delete e['code-token']),
                              null == t.parent ||
                              'scroll' === t.parent.statics.blotName ||
                              t.parent.statics.scope !== t.statics.scope
                                  ? e
                                  : h(t.parent, e, n));
                    }
                    u.scope = r.Scope.BLOCK_BLOT;
                },
                3036: function (t, e, n) {
                    'use strict';
                    var r = n(6003);
                    class i extends r.EmbedBlot {
                        static value() {}
                        optimize() {
                            (this.prev || this.next) && this.remove();
                        }
                        length() {
                            return 0;
                        }
                        value() {
                            return '';
                        }
                    }
                    (i.blotName = 'break'), (i.tagName = 'BR'), (e.A = i);
                },
                580: function (t, e, n) {
                    'use strict';
                    var r = n(6003);
                    class i extends r.ContainerBlot {}
                    e.A = i;
                },
                4541: function (t, e, n) {
                    'use strict';
                    var r = n(6003),
                        i = n(5508);
                    class s extends r.EmbedBlot {
                        static blotName = 'cursor';
                        static className = 'ql-cursor';
                        static tagName = 'span';
                        static CONTENTS = '\ufeff';
                        static value() {}
                        constructor(t, e, n) {
                            super(t, e),
                                (this.selection = n),
                                (this.textNode = document.createTextNode(s.CONTENTS)),
                                this.domNode.appendChild(this.textNode),
                                (this.savedLength = 0);
                        }
                        detach() {
                            null != this.parent && this.parent.removeChild(this);
                        }
                        format(t, e) {
                            if (0 !== this.savedLength) return void super.format(t, e);
                            let n = this,
                                i = 0;
                            for (; null != n && n.statics.scope !== r.Scope.BLOCK_BLOT; )
                                (i += n.offset(n.parent)), (n = n.parent);
                            null != n &&
                                ((this.savedLength = s.CONTENTS.length),
                                n.optimize(),
                                n.formatAt(i, s.CONTENTS.length, t, e),
                                (this.savedLength = 0));
                        }
                        index(t, e) {
                            return t === this.textNode ? 0 : super.index(t, e);
                        }
                        length() {
                            return this.savedLength;
                        }
                        position() {
                            return [this.textNode, this.textNode.data.length];
                        }
                        remove() {
                            super.remove(), (this.parent = null);
                        }
                        restore() {
                            if (this.selection.composing || null == this.parent) return null;
                            const t = this.selection.getNativeRange();
                            for (; null != this.domNode.lastChild && this.domNode.lastChild !== this.textNode; )
                                this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                            const e = this.prev instanceof i.A ? this.prev : null,
                                n = e ? e.length() : 0,
                                r = this.next instanceof i.A ? this.next : null,
                                o = r ? r.text : '',
                                { textNode: l } = this,
                                a = l.data.split(s.CONTENTS).join('');
                            let c;
                            if (((l.data = s.CONTENTS), e))
                                (c = e), (a || r) && (e.insertAt(e.length(), a + o), r && r.remove());
                            else if (r) (c = r), r.insertAt(0, a);
                            else {
                                const t = document.createTextNode(a);
                                (c = this.scroll.create(t)), this.parent.insertBefore(c, this);
                            }
                            if ((this.remove(), t)) {
                                const i = (t, i) =>
                                        e && t === e.domNode
                                            ? i
                                            : t === l
                                            ? n + i - 1
                                            : r && t === r.domNode
                                            ? n + a.length + i
                                            : null,
                                    s = i(t.start.node, t.start.offset),
                                    o = i(t.end.node, t.end.offset);
                                if (null !== s && null !== o)
                                    return { startNode: c.domNode, startOffset: s, endNode: c.domNode, endOffset: o };
                            }
                            return null;
                        }
                        update(t, e) {
                            if (t.some((t) => 'characterData' === t.type && t.target === this.textNode)) {
                                const t = this.restore();
                                t && (e.range = t);
                            }
                        }
                        optimize(t) {
                            super.optimize(t);
                            let { parent: e } = this;
                            for (; e; ) {
                                if ('A' === e.domNode.tagName) {
                                    (this.savedLength = s.CONTENTS.length),
                                        e.isolate(this.offset(e), this.length()).unwrap(),
                                        (this.savedLength = 0);
                                    break;
                                }
                                e = e.parent;
                            }
                        }
                        value() {
                            return '';
                        }
                    }
                    e.A = s;
                },
                746: function (t, e, n) {
                    'use strict';
                    var r = n(6003),
                        i = n(5508);
                    const s = '\ufeff';
                    class o extends r.EmbedBlot {
                        constructor(t, e) {
                            super(t, e),
                                (this.contentNode = document.createElement('span')),
                                this.contentNode.setAttribute('contenteditable', 'false'),
                                Array.from(this.domNode.childNodes).forEach((t) => {
                                    this.contentNode.appendChild(t);
                                }),
                                (this.leftGuard = document.createTextNode(s)),
                                (this.rightGuard = document.createTextNode(s)),
                                this.domNode.appendChild(this.leftGuard),
                                this.domNode.appendChild(this.contentNode),
                                this.domNode.appendChild(this.rightGuard);
                        }
                        index(t, e) {
                            return t === this.leftGuard ? 0 : t === this.rightGuard ? 1 : super.index(t, e);
                        }
                        restore(t) {
                            let e,
                                n = null;
                            const r = t.data.split(s).join('');
                            if (t === this.leftGuard)
                                if (this.prev instanceof i.A) {
                                    const t = this.prev.length();
                                    this.prev.insertAt(t, r),
                                        (n = { startNode: this.prev.domNode, startOffset: t + r.length });
                                } else
                                    (e = document.createTextNode(r)),
                                        this.parent.insertBefore(this.scroll.create(e), this),
                                        (n = { startNode: e, startOffset: r.length });
                            else
                                t === this.rightGuard &&
                                    (this.next instanceof i.A
                                        ? (this.next.insertAt(0, r),
                                          (n = { startNode: this.next.domNode, startOffset: r.length }))
                                        : ((e = document.createTextNode(r)),
                                          this.parent.insertBefore(this.scroll.create(e), this.next),
                                          (n = { startNode: e, startOffset: r.length })));
                            return (t.data = s), n;
                        }
                        update(t, e) {
                            t.forEach((t) => {
                                if (
                                    'characterData' === t.type &&
                                    (t.target === this.leftGuard || t.target === this.rightGuard)
                                ) {
                                    const n = this.restore(t.target);
                                    n && (e.range = n);
                                }
                            });
                        }
                    }
                    e.A = o;
                },
                4850: function (t, e, n) {
                    'use strict';
                    var r = n(6003),
                        i = n(3036),
                        s = n(5508);
                    class o extends r.InlineBlot {
                        static allowedChildren = [o, i.A, r.EmbedBlot, s.A];
                        static order = [
                            'cursor',
                            'inline',
                            'link',
                            'underline',
                            'strike',
                            'italic',
                            'bold',
                            'script',
                            'code',
                        ];
                        static compare(t, e) {
                            const n = o.order.indexOf(t),
                                r = o.order.indexOf(e);
                            return n >= 0 || r >= 0 ? n - r : t === e ? 0 : t < e ? -1 : 1;
                        }
                        formatAt(t, e, n, i) {
                            if (o.compare(this.statics.blotName, n) < 0 && this.scroll.query(n, r.Scope.BLOT)) {
                                const r = this.isolate(t, e);
                                i && r.wrap(n, i);
                            } else super.formatAt(t, e, n, i);
                        }
                        optimize(t) {
                            if (
                                (super.optimize(t),
                                this.parent instanceof o &&
                                    o.compare(this.statics.blotName, this.parent.statics.blotName) > 0)
                            ) {
                                const t = this.parent.isolate(this.offset(), this.length());
                                this.moveChildren(t), t.wrap(this);
                            }
                        }
                    }
                    e.A = o;
                },
                5508: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return i;
                        },
                        X: function () {
                            return s;
                        },
                    });
                    var r = n(6003);
                    class i extends r.TextBlot {}
                    function s(t) {
                        return t.replace(
                            /[&<>"']/g,
                            (t) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[t])
                        );
                    }
                },
                5374: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return o;
                        },
                    });
                    var r = n(8920),
                        i = n(7356);
                    const s = (0, n(6078).A)('quill:events');
                    ['selectionchange', 'mousedown', 'mouseup', 'click'].forEach((t) => {
                        document.addEventListener(t, function () {
                            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                            Array.from(document.querySelectorAll('.ql-container')).forEach((t) => {
                                const n = i.A.get(t);
                                n && n.emitter && n.emitter.handleDOM(...e);
                            });
                        });
                    });
                    var o = class extends r {
                        static events = {
                            EDITOR_CHANGE: 'editor-change',
                            SCROLL_BEFORE_UPDATE: 'scroll-before-update',
                            SCROLL_BLOT_MOUNT: 'scroll-blot-mount',
                            SCROLL_BLOT_UNMOUNT: 'scroll-blot-unmount',
                            SCROLL_OPTIMIZE: 'scroll-optimize',
                            SCROLL_UPDATE: 'scroll-update',
                            SCROLL_EMBED_UPDATE: 'scroll-embed-update',
                            SELECTION_CHANGE: 'selection-change',
                            TEXT_CHANGE: 'text-change',
                            COMPOSITION_BEFORE_START: 'composition-before-start',
                            COMPOSITION_START: 'composition-start',
                            COMPOSITION_BEFORE_END: 'composition-before-end',
                            COMPOSITION_END: 'composition-end',
                        };
                        static sources = { API: 'api', SILENT: 'silent', USER: 'user' };
                        constructor() {
                            super(), (this.domListeners = {}), this.on('error', s.error);
                        }
                        emit() {
                            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
                            return s.log.call(s, ...e), super.emit(...e);
                        }
                        handleDOM(t) {
                            for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++)
                                n[r - 1] = arguments[r];
                            (this.domListeners[t.type] || []).forEach((e) => {
                                let { node: r, handler: i } = e;
                                (t.target === r || r.contains(t.target)) && i(t, ...n);
                            });
                        }
                        listenDOM(t, e, n) {
                            this.domListeners[t] || (this.domListeners[t] = []),
                                this.domListeners[t].push({ node: e, handler: n });
                        }
                    };
                },
                7356: function (t, e) {
                    'use strict';
                    e.A = new WeakMap();
                },
                6078: function (t, e) {
                    'use strict';
                    const n = ['error', 'warn', 'log', 'info'];
                    let r = 'warn';
                    function i(t) {
                        if (r && n.indexOf(t) <= n.indexOf(r)) {
                            for (var e = arguments.length, i = new Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++)
                                i[s - 1] = arguments[s];
                            console[t](...i);
                        }
                    }
                    function s(t) {
                        return n.reduce((e, n) => ((e[n] = i.bind(console, n, t)), e), {});
                    }
                    (s.level = (t) => {
                        r = t;
                    }),
                        (i.level = s.level),
                        (e.A = s);
                },
                4266: function (t, e) {
                    'use strict';
                    e.A = class {
                        static DEFAULTS = {};
                        constructor(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            (this.quill = t), (this.options = e);
                        }
                    };
                },
                6142: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Ay: function () {
                            return q;
                        },
                    });
                    var r = n(8347),
                        i = n(6003),
                        s = n(5232),
                        o = n.n(s),
                        l = n(3707),
                        a = n(5123),
                        c = n(9698),
                        u = n(3036),
                        h = n(4541),
                        f = n(5508),
                        d = n(8298);
                    const p = /^[ -~]*$/;
                    function g(t, e, n) {
                        if (0 === t.length) {
                            const [t] = y(n.pop());
                            return e <= 0 ? `</li></${t}>` : `</li></${t}>${g([], e - 1, n)}`;
                        }
                        const [{ child: r, offset: i, length: s, indent: o, type: l }, ...a] = t,
                            [c, u] = y(l);
                        if (o > e)
                            return (
                                n.push(l),
                                o === e + 1 ? `<${c}><li${u}>${m(r, i, s)}${g(a, o, n)}` : `<${c}><li>${g(t, e + 1, n)}`
                            );
                        const h = n[n.length - 1];
                        if (o === e && l === h) return `</li><li${u}>${m(r, i, s)}${g(a, o, n)}`;
                        const [f] = y(n.pop());
                        return `</li></${f}>${g(t, e - 1, n)}`;
                    }
                    function m(t, e, n) {
                        let r = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                        if ('html' in t && 'function' == typeof t.html) return t.html(e, n);
                        if (t instanceof f.A) return (0, f.X)(t.value().slice(e, e + n));
                        if (t instanceof i.ParentBlot) {
                            if ('list-container' === t.statics.blotName) {
                                const r = [];
                                return (
                                    t.children.forEachAt(e, n, (t, e, n) => {
                                        const i = 'formats' in t && 'function' == typeof t.formats ? t.formats() : {};
                                        r.push({ child: t, offset: e, length: n, indent: i.indent || 0, type: i.list });
                                    }),
                                    g(r, -1, [])
                                );
                            }
                            const i = [];
                            if (
                                (t.children.forEachAt(e, n, (t, e, n) => {
                                    i.push(m(t, e, n));
                                }),
                                r || 'list' === t.statics.blotName)
                            )
                                return i.join('');
                            const { outerHTML: s, innerHTML: o } = t.domNode,
                                [l, a] = s.split(`>${o}<`);
                            return '<table' === l
                                ? `<table style="border: 1px solid #000;">${i.join('')}<${a}`
                                : `${l}>${i.join('')}<${a}`;
                        }
                        return t.domNode instanceof Element ? t.domNode.outerHTML : '';
                    }
                    function b(t, e) {
                        return Object.keys(e).reduce((n, r) => {
                            if (null == t[r]) return n;
                            const i = e[r];
                            return (
                                i === t[r]
                                    ? (n[r] = i)
                                    : Array.isArray(i)
                                    ? i.indexOf(t[r]) < 0
                                        ? (n[r] = i.concat([t[r]]))
                                        : (n[r] = i)
                                    : (n[r] = [i, t[r]]),
                                n
                            );
                        }, {});
                    }
                    function y(t) {
                        const e = 'ordered' === t ? 'ol' : 'ul';
                        switch (t) {
                            case 'checked':
                                return [e, ' data-list="checked"'];
                            case 'unchecked':
                                return [e, ' data-list="unchecked"'];
                            default:
                                return [e, ''];
                        }
                    }
                    function v(t) {
                        return t.reduce((t, e) => {
                            if ('string' == typeof e.insert) {
                                const n = e.insert.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
                                return t.insert(n, e.attributes);
                            }
                            return t.push(e);
                        }, new (o())());
                    }
                    function A(t, e) {
                        let { index: n, length: r } = t;
                        return new d.Q(n + e, r);
                    }
                    var N = class {
                            constructor(t) {
                                (this.scroll = t), (this.delta = this.getDelta());
                            }
                            applyDelta(t) {
                                this.scroll.update();
                                let e = this.scroll.length();
                                this.scroll.batchStart();
                                const n = v(t),
                                    l = new (o())();
                                return (
                                    (function (t) {
                                        const e = [];
                                        return (
                                            t.forEach((t) => {
                                                'string' == typeof t.insert
                                                    ? t.insert.split('\n').forEach((n, r) => {
                                                          r && e.push({ insert: '\n', attributes: t.attributes }),
                                                              n && e.push({ insert: n, attributes: t.attributes });
                                                      })
                                                    : e.push(t);
                                            }),
                                            e
                                        );
                                    })(n.ops.slice()).reduce((t, n) => {
                                        const o = s.Op.length(n);
                                        let a = n.attributes || {},
                                            u = !1,
                                            h = !1;
                                        if (null != n.insert) {
                                            if ((l.retain(o), 'string' == typeof n.insert)) {
                                                const o = n.insert;
                                                (h =
                                                    !o.endsWith('\n') &&
                                                    (e <= t || !!this.scroll.descendant(c.zo, t)[0])),
                                                    this.scroll.insertAt(t, o);
                                                const [l, u] = this.scroll.line(t);
                                                let f = (0, r.A)({}, (0, c.Ji)(l));
                                                if (l instanceof c.Ay) {
                                                    const [t] = l.descendant(i.LeafBlot, u);
                                                    t && (f = (0, r.A)(f, (0, c.Ji)(t)));
                                                }
                                                a = s.AttributeMap.diff(f, a) || {};
                                            } else if ('object' == typeof n.insert) {
                                                const o = Object.keys(n.insert)[0];
                                                if (null == o) return t;
                                                const l = null != this.scroll.query(o, i.Scope.INLINE);
                                                if (l) (e <= t || this.scroll.descendant(c.zo, t)[0]) && (h = !0);
                                                else if (t > 0) {
                                                    const [e, n] = this.scroll.descendant(i.LeafBlot, t - 1);
                                                    e instanceof f.A
                                                        ? '\n' !== e.value()[n] && (u = !0)
                                                        : e instanceof i.EmbedBlot &&
                                                          e.statics.scope === i.Scope.INLINE_BLOT &&
                                                          (u = !0);
                                                }
                                                if ((this.scroll.insertAt(t, o, n.insert[o]), l)) {
                                                    const [e] = this.scroll.descendant(i.LeafBlot, t);
                                                    if (e) {
                                                        const t = (0, r.A)({}, (0, c.Ji)(e));
                                                        a = s.AttributeMap.diff(t, a) || {};
                                                    }
                                                }
                                            }
                                            e += o;
                                        } else if ((l.push(n), null !== n.retain && 'object' == typeof n.retain)) {
                                            const e = Object.keys(n.retain)[0];
                                            if (null == e) return t;
                                            this.scroll.updateEmbedAt(t, e, n.retain[e]);
                                        }
                                        Object.keys(a).forEach((e) => {
                                            this.scroll.formatAt(t, o, e, a[e]);
                                        });
                                        const d = u ? 1 : 0,
                                            p = h ? 1 : 0;
                                        return (e += d + p), l.retain(d), l.delete(p), t + o + d + p;
                                    }, 0),
                                    l.reduce(
                                        (t, e) =>
                                            'number' == typeof e.delete
                                                ? (this.scroll.deleteAt(t, e.delete), t)
                                                : t + s.Op.length(e),
                                        0
                                    ),
                                    this.scroll.batchEnd(),
                                    this.scroll.optimize(),
                                    this.update(n)
                                );
                            }
                            deleteText(t, e) {
                                return this.scroll.deleteAt(t, e), this.update(new (o())().retain(t).delete(e));
                            }
                            formatLine(t, e) {
                                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                this.scroll.update(),
                                    Object.keys(n).forEach((r) => {
                                        this.scroll.lines(t, Math.max(e, 1)).forEach((t) => {
                                            t.format(r, n[r]);
                                        });
                                    }),
                                    this.scroll.optimize();
                                const r = new (o())().retain(t).retain(e, (0, l.A)(n));
                                return this.update(r);
                            }
                            formatText(t, e) {
                                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                Object.keys(n).forEach((r) => {
                                    this.scroll.formatAt(t, e, r, n[r]);
                                });
                                const r = new (o())().retain(t).retain(e, (0, l.A)(n));
                                return this.update(r);
                            }
                            getContents(t, e) {
                                return this.delta.slice(t, t + e);
                            }
                            getDelta() {
                                return this.scroll.lines().reduce((t, e) => t.concat(e.delta()), new (o())());
                            }
                            getFormat(t) {
                                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                    n = [],
                                    r = [];
                                0 === e
                                    ? this.scroll.path(t).forEach((t) => {
                                          const [e] = t;
                                          e instanceof c.Ay ? n.push(e) : e instanceof i.LeafBlot && r.push(e);
                                      })
                                    : ((n = this.scroll.lines(t, e)), (r = this.scroll.descendants(i.LeafBlot, t, e)));
                                const [s, o] = [n, r].map((t) => {
                                    const e = t.shift();
                                    if (null == e) return {};
                                    let n = (0, c.Ji)(e);
                                    for (; Object.keys(n).length > 0; ) {
                                        const e = t.shift();
                                        if (null == e) return n;
                                        n = b((0, c.Ji)(e), n);
                                    }
                                    return n;
                                });
                                return { ...s, ...o };
                            }
                            getHTML(t, e) {
                                const [n, r] = this.scroll.line(t);
                                if (n) {
                                    const i = n.length();
                                    return n.length() >= r + e && (0 !== r || e !== i)
                                        ? m(n, r, e, !0)
                                        : m(this.scroll, t, e, !0);
                                }
                                return '';
                            }
                            getText(t, e) {
                                return this.getContents(t, e)
                                    .filter((t) => 'string' == typeof t.insert)
                                    .map((t) => t.insert)
                                    .join('');
                            }
                            insertContents(t, e) {
                                const n = v(e),
                                    r = new (o())().retain(t).concat(n);
                                return this.scroll.insertContents(t, n), this.update(r);
                            }
                            insertEmbed(t, e, n) {
                                return (
                                    this.scroll.insertAt(t, e, n), this.update(new (o())().retain(t).insert({ [e]: n }))
                                );
                            }
                            insertText(t, e) {
                                let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                return (
                                    (e = e.replace(/\r\n/g, '\n').replace(/\r/g, '\n')),
                                    this.scroll.insertAt(t, e),
                                    Object.keys(n).forEach((r) => {
                                        this.scroll.formatAt(t, e.length, r, n[r]);
                                    }),
                                    this.update(new (o())().retain(t).insert(e, (0, l.A)(n)))
                                );
                            }
                            isBlank() {
                                if (0 === this.scroll.children.length) return !0;
                                if (this.scroll.children.length > 1) return !1;
                                const t = this.scroll.children.head;
                                if (t?.statics.blotName !== c.Ay.blotName) return !1;
                                const e = t;
                                return !(e.children.length > 1) && e.children.head instanceof u.A;
                            }
                            removeFormat(t, e) {
                                const n = this.getText(t, e),
                                    [r, i] = this.scroll.line(t + e);
                                let s = 0,
                                    l = new (o())();
                                null != r &&
                                    ((s = r.length() - i),
                                    (l = r
                                        .delta()
                                        .slice(i, i + s - 1)
                                        .insert('\n')));
                                const a = this.getContents(t, e + s).diff(new (o())().insert(n).concat(l)),
                                    c = new (o())().retain(t).concat(a);
                                return this.applyDelta(c);
                            }
                            update(t) {
                                let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0;
                                const r = this.delta;
                                if (
                                    1 === e.length &&
                                    'characterData' === e[0].type &&
                                    e[0].target.data.match(p) &&
                                    this.scroll.find(e[0].target)
                                ) {
                                    const i = this.scroll.find(e[0].target),
                                        s = (0, c.Ji)(i),
                                        l = i.offset(this.scroll),
                                        a = e[0].oldValue.replace(h.A.CONTENTS, ''),
                                        u = new (o())().insert(a),
                                        f = new (o())().insert(i.value()),
                                        d = n && { oldRange: A(n.oldRange, -l), newRange: A(n.newRange, -l) };
                                    (t = new (o())()
                                        .retain(l)
                                        .concat(u.diff(f, d))
                                        .reduce((t, e) => (e.insert ? t.insert(e.insert, s) : t.push(e)), new (o())())),
                                        (this.delta = r.compose(t));
                                } else
                                    (this.delta = this.getDelta()),
                                        (t && (0, a.A)(r.compose(t), this.delta)) || (t = r.diff(this.delta, n));
                                return t;
                            }
                        },
                        E = n(5374),
                        _ = n(7356),
                        x = n(6078),
                        w = n(4266),
                        O = n(746),
                        j = class {
                            isComposing = !1;
                            constructor(t, e) {
                                (this.scroll = t), (this.emitter = e), this.setupListeners();
                            }
                            setupListeners() {
                                this.scroll.domNode.addEventListener('compositionstart', (t) => {
                                    this.isComposing || this.handleCompositionStart(t);
                                }),
                                    this.scroll.domNode.addEventListener('compositionend', (t) => {
                                        this.isComposing &&
                                            queueMicrotask(() => {
                                                this.handleCompositionEnd(t);
                                            });
                                    });
                            }
                            handleCompositionStart(t) {
                                const e = t.target instanceof Node ? this.scroll.find(t.target, !0) : null;
                                !e ||
                                    e instanceof O.A ||
                                    (this.emitter.emit(E.A.events.COMPOSITION_BEFORE_START, t),
                                    this.scroll.batchStart(),
                                    this.emitter.emit(E.A.events.COMPOSITION_START, t),
                                    (this.isComposing = !0));
                            }
                            handleCompositionEnd(t) {
                                this.emitter.emit(E.A.events.COMPOSITION_BEFORE_END, t),
                                    this.scroll.batchEnd(),
                                    this.emitter.emit(E.A.events.COMPOSITION_END, t),
                                    (this.isComposing = !1);
                            }
                        },
                        S = n(9609);
                    const L = (t) => {
                            const e = t.getBoundingClientRect(),
                                n = ('offsetWidth' in t && Math.abs(e.width) / t.offsetWidth) || 1,
                                r = ('offsetHeight' in t && Math.abs(e.height) / t.offsetHeight) || 1;
                            return {
                                top: e.top,
                                right: e.left + t.clientWidth * n,
                                bottom: e.top + t.clientHeight * r,
                                left: e.left,
                            };
                        },
                        T = (t) => {
                            const e = parseInt(t, 10);
                            return Number.isNaN(e) ? 0 : e;
                        },
                        k = (t, e, n, r, i, s) =>
                            t < n && e > r
                                ? 0
                                : t < n
                                ? -(n - t + i)
                                : e > r
                                ? e - t > r - n
                                    ? t + i - n
                                    : e - r + s
                                : 0;
                    const C = ['block', 'break', 'cursor', 'inline', 'scroll', 'text'];
                    const R = (0, x.A)('quill'),
                        B = new i.Registry();
                    i.ParentBlot.uiClass = 'ql-ui';
                    class q {
                        static DEFAULTS = {
                            bounds: null,
                            modules: { clipboard: !0, keyboard: !0, history: !0, uploader: !0 },
                            placeholder: '',
                            readOnly: !1,
                            registry: B,
                            theme: 'default',
                        };
                        static events = E.A.events;
                        static sources = E.A.sources;
                        static version = '2.0.2';
                        static imports = { delta: o(), parchment: i, 'core/module': w.A, 'core/theme': S.A };
                        static debug(t) {
                            !0 === t && (t = 'log'), x.A.level(t);
                        }
                        static find(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            return _.A.get(t) || B.find(t, e);
                        }
                        static import(t) {
                            return (
                                null == this.imports[t] &&
                                    R.error(`Cannot import ${t}. Are you sure it was registered?`),
                                this.imports[t]
                            );
                        }
                        static register() {
                            if ('string' != typeof (arguments.length <= 0 ? void 0 : arguments[0])) {
                                const t = arguments.length <= 0 ? void 0 : arguments[0],
                                    e = !!(arguments.length <= 1 ? void 0 : arguments[1]),
                                    n = 'attrName' in t ? t.attrName : t.blotName;
                                'string' == typeof n
                                    ? this.register(`formats/${n}`, t, e)
                                    : Object.keys(t).forEach((n) => {
                                          this.register(n, t[n], e);
                                      });
                            } else {
                                const t = arguments.length <= 0 ? void 0 : arguments[0],
                                    e = arguments.length <= 1 ? void 0 : arguments[1],
                                    n = !!(arguments.length <= 2 ? void 0 : arguments[2]);
                                null == this.imports[t] || n || R.warn(`Overwriting ${t} with`, e),
                                    (this.imports[t] = e),
                                    (t.startsWith('blots/') || t.startsWith('formats/')) &&
                                        e &&
                                        'boolean' != typeof e &&
                                        'abstract' !== e.blotName &&
                                        B.register(e),
                                    'function' == typeof e.register && e.register(B);
                            }
                        }
                        constructor(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (
                                ((this.options = (function (t, e) {
                                    const n = I(t);
                                    if (!n) throw new Error('Invalid Quill container');
                                    const s =
                                        !e.theme || e.theme === q.DEFAULTS.theme ? S.A : q.import(`themes/${e.theme}`);
                                    if (!s) throw new Error(`Invalid theme ${e.theme}. Did you register it?`);
                                    const { modules: o, ...l } = q.DEFAULTS,
                                        { modules: a, ...c } = s.DEFAULTS;
                                    let u = M(e.modules);
                                    null != u &&
                                        u.toolbar &&
                                        u.toolbar.constructor !== Object &&
                                        (u = { ...u, toolbar: { container: u.toolbar } });
                                    const h = (0, r.A)({}, M(o), M(a), u),
                                        f = { ...l, ...D(c), ...D(e) };
                                    let d = e.registry;
                                    return (
                                        d
                                            ? e.formats &&
                                              R.warn('Ignoring "formats" option because "registry" is specified')
                                            : (d = e.formats
                                                  ? ((t, e, n) => {
                                                        const r = new i.Registry();
                                                        return (
                                                            C.forEach((t) => {
                                                                const n = e.query(t);
                                                                n && r.register(n);
                                                            }),
                                                            t.forEach((t) => {
                                                                let i = e.query(t);
                                                                i ||
                                                                    n.error(
                                                                        `Cannot register "${t}" specified in "formats" config. Are you sure it was registered?`
                                                                    );
                                                                let s = 0;
                                                                for (; i; )
                                                                    if (
                                                                        (r.register(i),
                                                                        (i =
                                                                            'blotName' in i
                                                                                ? i.requiredContainer ?? null
                                                                                : null),
                                                                        (s += 1),
                                                                        s > 100)
                                                                    ) {
                                                                        n.error(
                                                                            `Cycle detected in registering blot requiredContainer: "${t}"`
                                                                        );
                                                                        break;
                                                                    }
                                                            }),
                                                            r
                                                        );
                                                    })(e.formats, f.registry, R)
                                                  : f.registry),
                                        {
                                            ...f,
                                            registry: d,
                                            container: n,
                                            theme: s,
                                            modules: Object.entries(h).reduce((t, e) => {
                                                let [n, i] = e;
                                                if (!i) return t;
                                                const s = q.import(`modules/${n}`);
                                                return null == s
                                                    ? (R.error(
                                                          `Cannot load ${n} module. Are you sure you registered it?`
                                                      ),
                                                      t)
                                                    : { ...t, [n]: (0, r.A)({}, s.DEFAULTS || {}, i) };
                                            }, {}),
                                            bounds: I(f.bounds),
                                        }
                                    );
                                })(t, e)),
                                (this.container = this.options.container),
                                null == this.container)
                            )
                                return void R.error('Invalid Quill container', t);
                            this.options.debug && q.debug(this.options.debug);
                            const n = this.container.innerHTML.trim();
                            this.container.classList.add('ql-container'),
                                (this.container.innerHTML = ''),
                                _.A.set(this.container, this),
                                (this.root = this.addContainer('ql-editor')),
                                this.root.classList.add('ql-blank'),
                                (this.emitter = new E.A());
                            const s = i.ScrollBlot.blotName,
                                l = this.options.registry.query(s);
                            if (!l || !('blotName' in l))
                                throw new Error(`Cannot initialize Quill without "${s}" blot`);
                            if (
                                ((this.scroll = new l(this.options.registry, this.root, { emitter: this.emitter })),
                                (this.editor = new N(this.scroll)),
                                (this.selection = new d.A(this.scroll, this.emitter)),
                                (this.composition = new j(this.scroll, this.emitter)),
                                (this.theme = new this.options.theme(this, this.options)),
                                (this.keyboard = this.theme.addModule('keyboard')),
                                (this.clipboard = this.theme.addModule('clipboard')),
                                (this.history = this.theme.addModule('history')),
                                (this.uploader = this.theme.addModule('uploader')),
                                this.theme.addModule('input'),
                                this.theme.addModule('uiNode'),
                                this.theme.init(),
                                this.emitter.on(E.A.events.EDITOR_CHANGE, (t) => {
                                    t === E.A.events.TEXT_CHANGE &&
                                        this.root.classList.toggle('ql-blank', this.editor.isBlank());
                                }),
                                this.emitter.on(E.A.events.SCROLL_UPDATE, (t, e) => {
                                    const n = this.selection.lastRange,
                                        [r] = this.selection.getRange(),
                                        i = n && r ? { oldRange: n, newRange: r } : void 0;
                                    U.call(this, () => this.editor.update(null, e, i), t);
                                }),
                                this.emitter.on(E.A.events.SCROLL_EMBED_UPDATE, (t, e) => {
                                    const n = this.selection.lastRange,
                                        [r] = this.selection.getRange(),
                                        i = n && r ? { oldRange: n, newRange: r } : void 0;
                                    U.call(
                                        this,
                                        () => {
                                            const n = new (o())()
                                                .retain(t.offset(this))
                                                .retain({ [t.statics.blotName]: e });
                                            return this.editor.update(n, [], i);
                                        },
                                        q.sources.USER
                                    );
                                }),
                                n)
                            ) {
                                const t = this.clipboard.convert({ html: `${n}<p><br></p>`, text: '\n' });
                                this.setContents(t);
                            }
                            this.history.clear(),
                                this.options.placeholder &&
                                    this.root.setAttribute('data-placeholder', this.options.placeholder),
                                this.options.readOnly && this.disable(),
                                (this.allowReadOnlyEdits = !1);
                        }
                        addContainer(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                            if ('string' == typeof t) {
                                const e = t;
                                (t = document.createElement('div')).classList.add(e);
                            }
                            return this.container.insertBefore(t, e), t;
                        }
                        blur() {
                            this.selection.setRange(null);
                        }
                        deleteText(t, e, n) {
                            return (
                                ([t, e, , n] = P(t, e, n)),
                                U.call(this, () => this.editor.deleteText(t, e), n, t, -1 * e)
                            );
                        }
                        disable() {
                            this.enable(!1);
                        }
                        editReadOnly(t) {
                            this.allowReadOnlyEdits = !0;
                            const e = t();
                            return (this.allowReadOnlyEdits = !1), e;
                        }
                        enable() {
                            let t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                            this.scroll.enable(t), this.container.classList.toggle('ql-disabled', !t);
                        }
                        focus() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.selection.focus(), t.preventScroll || this.scrollSelectionIntoView();
                        }
                        format(t, e) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : E.A.sources.API;
                            return U.call(
                                this,
                                () => {
                                    const n = this.getSelection(!0);
                                    let r = new (o())();
                                    if (null == n) return r;
                                    if (this.scroll.query(t, i.Scope.BLOCK))
                                        r = this.editor.formatLine(n.index, n.length, { [t]: e });
                                    else {
                                        if (0 === n.length) return this.selection.format(t, e), r;
                                        r = this.editor.formatText(n.index, n.length, { [t]: e });
                                    }
                                    return this.setSelection(n, E.A.sources.SILENT), r;
                                },
                                n
                            );
                        }
                        formatLine(t, e, n, r, i) {
                            let s;
                            return (
                                ([t, e, s, i] = P(t, e, n, r, i)),
                                U.call(this, () => this.editor.formatLine(t, e, s), i, t, 0)
                            );
                        }
                        formatText(t, e, n, r, i) {
                            let s;
                            return (
                                ([t, e, s, i] = P(t, e, n, r, i)),
                                U.call(this, () => this.editor.formatText(t, e, s), i, t, 0)
                            );
                        }
                        getBounds(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                                n = null;
                            if (
                                ((n =
                                    'number' == typeof t
                                        ? this.selection.getBounds(t, e)
                                        : this.selection.getBounds(t.index, t.length)),
                                !n)
                            )
                                return null;
                            const r = this.container.getBoundingClientRect();
                            return {
                                bottom: n.bottom - r.top,
                                height: n.height,
                                left: n.left - r.left,
                                right: n.right - r.left,
                                top: n.top - r.top,
                                width: n.width,
                            };
                        }
                        getContents() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                e =
                                    arguments.length > 1 && void 0 !== arguments[1]
                                        ? arguments[1]
                                        : this.getLength() - t;
                            return ([t, e] = P(t, e)), this.editor.getContents(t, e);
                        }
                        getFormat() {
                            let t =
                                    arguments.length > 0 && void 0 !== arguments[0]
                                        ? arguments[0]
                                        : this.getSelection(!0),
                                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            return 'number' == typeof t
                                ? this.editor.getFormat(t, e)
                                : this.editor.getFormat(t.index, t.length);
                        }
                        getIndex(t) {
                            return t.offset(this.scroll);
                        }
                        getLength() {
                            return this.scroll.length();
                        }
                        getLeaf(t) {
                            return this.scroll.leaf(t);
                        }
                        getLine(t) {
                            return this.scroll.line(t);
                        }
                        getLines() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
                            return 'number' != typeof t
                                ? this.scroll.lines(t.index, t.length)
                                : this.scroll.lines(t, e);
                        }
                        getModule(t) {
                            return this.theme.modules[t];
                        }
                        getSelection() {
                            return (
                                arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.focus(),
                                this.update(),
                                this.selection.getRange()[0]
                            );
                        }
                        getSemanticHTML() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = arguments.length > 1 ? arguments[1] : void 0;
                            return (
                                'number' == typeof t && (e = e ?? this.getLength() - t),
                                ([t, e] = P(t, e)),
                                this.editor.getHTML(t, e)
                            );
                        }
                        getText() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                                e = arguments.length > 1 ? arguments[1] : void 0;
                            return (
                                'number' == typeof t && (e = e ?? this.getLength() - t),
                                ([t, e] = P(t, e)),
                                this.editor.getText(t, e)
                            );
                        }
                        hasFocus() {
                            return this.selection.hasFocus();
                        }
                        insertEmbed(t, e, n) {
                            let r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : q.sources.API;
                            return U.call(this, () => this.editor.insertEmbed(t, e, n), r, t);
                        }
                        insertText(t, e, n, r, i) {
                            let s;
                            return (
                                ([t, , s, i] = P(t, 0, n, r, i)),
                                U.call(this, () => this.editor.insertText(t, e, s), i, t, e.length)
                            );
                        }
                        isEnabled() {
                            return this.scroll.isEnabled();
                        }
                        off() {
                            return this.emitter.off(...arguments);
                        }
                        on() {
                            return this.emitter.on(...arguments);
                        }
                        once() {
                            return this.emitter.once(...arguments);
                        }
                        removeFormat(t, e, n) {
                            return ([t, e, , n] = P(t, e, n)), U.call(this, () => this.editor.removeFormat(t, e), n, t);
                        }
                        scrollRectIntoView(t) {
                            ((t, e) => {
                                const n = t.ownerDocument;
                                let r = e,
                                    i = t;
                                for (; i; ) {
                                    const t = i === n.body,
                                        e = t
                                            ? {
                                                  top: 0,
                                                  right: window.visualViewport?.width ?? n.documentElement.clientWidth,
                                                  bottom:
                                                      window.visualViewport?.height ?? n.documentElement.clientHeight,
                                                  left: 0,
                                              }
                                            : L(i),
                                        o = getComputedStyle(i),
                                        l = k(
                                            r.left,
                                            r.right,
                                            e.left,
                                            e.right,
                                            T(o.scrollPaddingLeft),
                                            T(o.scrollPaddingRight)
                                        ),
                                        a = k(
                                            r.top,
                                            r.bottom,
                                            e.top,
                                            e.bottom,
                                            T(o.scrollPaddingTop),
                                            T(o.scrollPaddingBottom)
                                        );
                                    if (l || a)
                                        if (t) n.defaultView?.scrollBy(l, a);
                                        else {
                                            const { scrollLeft: t, scrollTop: e } = i;
                                            a && (i.scrollTop += a), l && (i.scrollLeft += l);
                                            const n = i.scrollLeft - t,
                                                s = i.scrollTop - e;
                                            r = {
                                                left: r.left - n,
                                                top: r.top - s,
                                                right: r.right - n,
                                                bottom: r.bottom - s,
                                            };
                                        }
                                    i =
                                        t || 'fixed' === o.position
                                            ? null
                                            : (s = i).parentElement || s.getRootNode().host || null;
                                }
                                var s;
                            })(this.root, t);
                        }
                        scrollIntoView() {
                            console.warn(
                                'Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead.'
                            ),
                                this.scrollSelectionIntoView();
                        }
                        scrollSelectionIntoView() {
                            const t = this.selection.lastRange,
                                e = t && this.selection.getBounds(t.index, t.length);
                            e && this.scrollRectIntoView(e);
                        }
                        setContents(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : E.A.sources.API;
                            return U.call(
                                this,
                                () => {
                                    t = new (o())(t);
                                    const e = this.getLength(),
                                        n = this.editor.deleteText(0, e),
                                        r = this.editor.insertContents(0, t),
                                        i = this.editor.deleteText(this.getLength() - 1, 1);
                                    return n.compose(r).compose(i);
                                },
                                e
                            );
                        }
                        setSelection(t, e, n) {
                            null == t
                                ? this.selection.setRange(null, e || q.sources.API)
                                : (([t, e, , n] = P(t, e, n)),
                                  this.selection.setRange(new d.Q(Math.max(0, t), e), n),
                                  n !== E.A.sources.SILENT && this.scrollSelectionIntoView());
                        }
                        setText(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : E.A.sources.API;
                            const n = new (o())().insert(t);
                            return this.setContents(n, e);
                        }
                        update() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : E.A.sources.USER;
                            const e = this.scroll.update(t);
                            return this.selection.update(t), e;
                        }
                        updateContents(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : E.A.sources.API;
                            return U.call(this, () => ((t = new (o())(t)), this.editor.applyDelta(t)), e, !0);
                        }
                    }
                    function I(t) {
                        return 'string' == typeof t ? document.querySelector(t) : t;
                    }
                    function M(t) {
                        return Object.entries(t ?? {}).reduce((t, e) => {
                            let [n, r] = e;
                            return { ...t, [n]: !0 === r ? {} : r };
                        }, {});
                    }
                    function D(t) {
                        return Object.fromEntries(Object.entries(t).filter((t) => void 0 !== t[1]));
                    }
                    function U(t, e, n, r) {
                        if (!this.isEnabled() && e === E.A.sources.USER && !this.allowReadOnlyEdits) return new (o())();
                        let i = null == n ? null : this.getSelection();
                        const s = this.editor.delta,
                            l = t();
                        if (
                            (null != i &&
                                (!0 === n && (n = i.index),
                                null == r ? (i = z(i, l, e)) : 0 !== r && (i = z(i, n, r, e)),
                                this.setSelection(i, E.A.sources.SILENT)),
                            l.length() > 0)
                        ) {
                            const t = [E.A.events.TEXT_CHANGE, l, s, e];
                            this.emitter.emit(E.A.events.EDITOR_CHANGE, ...t),
                                e !== E.A.sources.SILENT && this.emitter.emit(...t);
                        }
                        return l;
                    }
                    function P(t, e, n, r, i) {
                        let s = {};
                        return (
                            'number' == typeof t.index && 'number' == typeof t.length
                                ? 'number' != typeof e
                                    ? ((i = r), (r = n), (n = e), (e = t.length), (t = t.index))
                                    : ((e = t.length), (t = t.index))
                                : 'number' != typeof e && ((i = r), (r = n), (n = e), (e = 0)),
                            'object' == typeof n
                                ? ((s = n), (i = r))
                                : 'string' == typeof n && (null != r ? (s[n] = r) : (i = n)),
                            [t, e, s, (i = i || E.A.sources.API)]
                        );
                    }
                    function z(t, e, n, r) {
                        const i = 'number' == typeof n ? n : 0;
                        if (null == t) return null;
                        let s, o;
                        return (
                            e && 'function' == typeof e.transformPosition
                                ? ([s, o] = [t.index, t.index + t.length].map((t) =>
                                      e.transformPosition(t, r !== E.A.sources.USER)
                                  ))
                                : ([s, o] = [t.index, t.index + t.length].map((t) =>
                                      t < e || (t === e && r === E.A.sources.USER)
                                          ? t
                                          : i >= 0
                                          ? t + i
                                          : Math.max(e, t + i)
                                  )),
                            new d.Q(s, o - s)
                        );
                    }
                },
                8298: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Q: function () {
                            return a;
                        },
                    });
                    var r = n(6003),
                        i = n(5123),
                        s = n(3707),
                        o = n(5374);
                    const l = (0, n(6078).A)('quill:selection');
                    class a {
                        constructor(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            (this.index = t), (this.length = e);
                        }
                    }
                    function c(t, e) {
                        try {
                            e.parentNode;
                        } catch (t) {
                            return !1;
                        }
                        return t.contains(e);
                    }
                    e.A = class {
                        constructor(t, e) {
                            (this.emitter = e),
                                (this.scroll = t),
                                (this.composing = !1),
                                (this.mouseDown = !1),
                                (this.root = this.scroll.domNode),
                                (this.cursor = this.scroll.create('cursor', this)),
                                (this.savedRange = new a(0, 0)),
                                (this.lastRange = this.savedRange),
                                (this.lastNative = null),
                                this.handleComposition(),
                                this.handleDragging(),
                                this.emitter.listenDOM('selectionchange', document, () => {
                                    this.mouseDown ||
                                        this.composing ||
                                        setTimeout(this.update.bind(this, o.A.sources.USER), 1);
                                }),
                                this.emitter.on(o.A.events.SCROLL_BEFORE_UPDATE, () => {
                                    if (!this.hasFocus()) return;
                                    const t = this.getNativeRange();
                                    null != t &&
                                        t.start.node !== this.cursor.textNode &&
                                        this.emitter.once(o.A.events.SCROLL_UPDATE, (e, n) => {
                                            try {
                                                this.root.contains(t.start.node) &&
                                                    this.root.contains(t.end.node) &&
                                                    this.setNativeRange(
                                                        t.start.node,
                                                        t.start.offset,
                                                        t.end.node,
                                                        t.end.offset
                                                    );
                                                const r = n.some(
                                                    (t) =>
                                                        'characterData' === t.type ||
                                                        'childList' === t.type ||
                                                        ('attributes' === t.type && t.target === this.root)
                                                );
                                                this.update(r ? o.A.sources.SILENT : e);
                                            } catch (t) {}
                                        });
                                }),
                                this.emitter.on(o.A.events.SCROLL_OPTIMIZE, (t, e) => {
                                    if (e.range) {
                                        const { startNode: t, startOffset: n, endNode: r, endOffset: i } = e.range;
                                        this.setNativeRange(t, n, r, i), this.update(o.A.sources.SILENT);
                                    }
                                }),
                                this.update(o.A.sources.SILENT);
                        }
                        handleComposition() {
                            this.emitter.on(o.A.events.COMPOSITION_BEFORE_START, () => {
                                this.composing = !0;
                            }),
                                this.emitter.on(o.A.events.COMPOSITION_END, () => {
                                    if (((this.composing = !1), this.cursor.parent)) {
                                        const t = this.cursor.restore();
                                        if (!t) return;
                                        setTimeout(() => {
                                            this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
                                        }, 1);
                                    }
                                });
                        }
                        handleDragging() {
                            this.emitter.listenDOM('mousedown', document.body, () => {
                                this.mouseDown = !0;
                            }),
                                this.emitter.listenDOM('mouseup', document.body, () => {
                                    (this.mouseDown = !1), this.update(o.A.sources.USER);
                                });
                        }
                        focus() {
                            this.hasFocus() || (this.root.focus({ preventScroll: !0 }), this.setRange(this.savedRange));
                        }
                        format(t, e) {
                            this.scroll.update();
                            const n = this.getNativeRange();
                            if (null != n && n.native.collapsed && !this.scroll.query(t, r.Scope.BLOCK)) {
                                if (n.start.node !== this.cursor.textNode) {
                                    const t = this.scroll.find(n.start.node, !1);
                                    if (null == t) return;
                                    if (t instanceof r.LeafBlot) {
                                        const e = t.split(n.start.offset);
                                        t.parent.insertBefore(this.cursor, e);
                                    } else t.insertBefore(this.cursor, n.start.node);
                                    this.cursor.attach();
                                }
                                this.cursor.format(t, e),
                                    this.scroll.optimize(),
                                    this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length),
                                    this.update();
                            }
                        }
                        getBounds(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                            const n = this.scroll.length();
                            let r;
                            (t = Math.min(t, n - 1)), (e = Math.min(t + e, n - 1) - t);
                            let [i, s] = this.scroll.leaf(t);
                            if (null == i) return null;
                            if (e > 0 && s === i.length()) {
                                const [e] = this.scroll.leaf(t + 1);
                                if (e) {
                                    const [n] = this.scroll.line(t),
                                        [r] = this.scroll.line(t + 1);
                                    n === r && ((i = e), (s = 0));
                                }
                            }
                            [r, s] = i.position(s, !0);
                            const o = document.createRange();
                            if (e > 0)
                                return (
                                    o.setStart(r, s),
                                    ([i, s] = this.scroll.leaf(t + e)),
                                    null == i
                                        ? null
                                        : (([r, s] = i.position(s, !0)), o.setEnd(r, s), o.getBoundingClientRect())
                                );
                            let l,
                                a = 'left';
                            if (r instanceof Text) {
                                if (!r.data.length) return null;
                                s < r.data.length
                                    ? (o.setStart(r, s), o.setEnd(r, s + 1))
                                    : (o.setStart(r, s - 1), o.setEnd(r, s), (a = 'right')),
                                    (l = o.getBoundingClientRect());
                            } else {
                                if (!(i.domNode instanceof Element)) return null;
                                (l = i.domNode.getBoundingClientRect()), s > 0 && (a = 'right');
                            }
                            return {
                                bottom: l.top + l.height,
                                height: l.height,
                                left: l[a],
                                right: l[a],
                                top: l.top,
                                width: 0,
                            };
                        }
                        getNativeRange() {
                            const t = document.getSelection();
                            if (null == t || t.rangeCount <= 0) return null;
                            const e = t.getRangeAt(0);
                            if (null == e) return null;
                            const n = this.normalizeNative(e);
                            return l.info('getNativeRange', n), n;
                        }
                        getRange() {
                            const t = this.scroll.domNode;
                            if ('isConnected' in t && !t.isConnected) return [null, null];
                            const e = this.getNativeRange();
                            return null == e ? [null, null] : [this.normalizedToRange(e), e];
                        }
                        hasFocus() {
                            return (
                                document.activeElement === this.root ||
                                (null != document.activeElement && c(this.root, document.activeElement))
                            );
                        }
                        normalizedToRange(t) {
                            const e = [[t.start.node, t.start.offset]];
                            t.native.collapsed || e.push([t.end.node, t.end.offset]);
                            const n = e.map((t) => {
                                    const [e, n] = t,
                                        i = this.scroll.find(e, !0),
                                        s = i.offset(this.scroll);
                                    return 0 === n ? s : i instanceof r.LeafBlot ? s + i.index(e, n) : s + i.length();
                                }),
                                i = Math.min(Math.max(...n), this.scroll.length() - 1),
                                s = Math.min(i, ...n);
                            return new a(s, i - s);
                        }
                        normalizeNative(t) {
                            if (!c(this.root, t.startContainer) || (!t.collapsed && !c(this.root, t.endContainer)))
                                return null;
                            const e = {
                                start: { node: t.startContainer, offset: t.startOffset },
                                end: { node: t.endContainer, offset: t.endOffset },
                                native: t,
                            };
                            return (
                                [e.start, e.end].forEach((t) => {
                                    let { node: e, offset: n } = t;
                                    for (; !(e instanceof Text) && e.childNodes.length > 0; )
                                        if (e.childNodes.length > n) (e = e.childNodes[n]), (n = 0);
                                        else {
                                            if (e.childNodes.length !== n) break;
                                            (e = e.lastChild),
                                                (n =
                                                    e instanceof Text
                                                        ? e.data.length
                                                        : e.childNodes.length > 0
                                                        ? e.childNodes.length
                                                        : e.childNodes.length + 1);
                                        }
                                    (t.node = e), (t.offset = n);
                                }),
                                e
                            );
                        }
                        rangeToNative(t) {
                            const e = this.scroll.length(),
                                n = (t, n) => {
                                    t = Math.min(e - 1, t);
                                    const [r, i] = this.scroll.leaf(t);
                                    return r ? r.position(i, n) : [null, -1];
                                };
                            return [...n(t.index, !1), ...n(t.index + t.length, !0)];
                        }
                        setNativeRange(t, e) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t,
                                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e,
                                i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                            if (
                                (l.info('setNativeRange', t, e, n, r),
                                null != t &&
                                    (null == this.root.parentNode || null == t.parentNode || null == n.parentNode))
                            )
                                return;
                            const s = document.getSelection();
                            if (null != s)
                                if (null != t) {
                                    this.hasFocus() || this.root.focus({ preventScroll: !0 });
                                    const { native: o } = this.getNativeRange() || {};
                                    if (
                                        null == o ||
                                        i ||
                                        t !== o.startContainer ||
                                        e !== o.startOffset ||
                                        n !== o.endContainer ||
                                        r !== o.endOffset
                                    ) {
                                        t instanceof Element &&
                                            'BR' === t.tagName &&
                                            ((e = Array.from(t.parentNode.childNodes).indexOf(t)), (t = t.parentNode)),
                                            n instanceof Element &&
                                                'BR' === n.tagName &&
                                                ((r = Array.from(n.parentNode.childNodes).indexOf(n)),
                                                (n = n.parentNode));
                                        const i = document.createRange();
                                        i.setStart(t, e), i.setEnd(n, r), s.removeAllRanges(), s.addRange(i);
                                    }
                                } else s.removeAllRanges(), this.root.blur();
                        }
                        setRange(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : o.A.sources.API;
                            if (('string' == typeof e && ((n = e), (e = !1)), l.info('setRange', t), null != t)) {
                                const n = this.rangeToNative(t);
                                this.setNativeRange(...n, e);
                            } else this.setNativeRange(null);
                            this.update(n);
                        }
                        update() {
                            let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o.A.sources.USER;
                            const e = this.lastRange,
                                [n, r] = this.getRange();
                            if (
                                ((this.lastRange = n),
                                (this.lastNative = r),
                                null != this.lastRange && (this.savedRange = this.lastRange),
                                !(0, i.A)(e, this.lastRange))
                            ) {
                                if (
                                    !this.composing &&
                                    null != r &&
                                    r.native.collapsed &&
                                    r.start.node !== this.cursor.textNode
                                ) {
                                    const t = this.cursor.restore();
                                    t && this.setNativeRange(t.startNode, t.startOffset, t.endNode, t.endOffset);
                                }
                                const n = [o.A.events.SELECTION_CHANGE, (0, s.A)(this.lastRange), (0, s.A)(e), t];
                                this.emitter.emit(o.A.events.EDITOR_CHANGE, ...n),
                                    t !== o.A.sources.SILENT && this.emitter.emit(...n);
                            }
                        }
                    };
                },
                9609: function (t, e) {
                    'use strict';
                    class n {
                        static DEFAULTS = { modules: {} };
                        static themes = { default: n };
                        modules = {};
                        constructor(t, e) {
                            (this.quill = t), (this.options = e);
                        }
                        init() {
                            Object.keys(this.options.modules).forEach((t) => {
                                null == this.modules[t] && this.addModule(t);
                            });
                        }
                        addModule(t) {
                            const e = this.quill.constructor.import(`modules/${t}`);
                            return (
                                (this.modules[t] = new e(this.quill, this.options.modules[t] || {})), this.modules[t]
                            );
                        }
                    }
                    e.A = n;
                },
                8276: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Hu: function () {
                            return o;
                        },
                        gS: function () {
                            return s;
                        },
                    });
                    var r = n(6003);
                    const i = { scope: r.Scope.BLOCK, whitelist: ['right', 'center', 'justify'] },
                        s = new r.Attributor('align', 'align', i),
                        o =
                            (new r.ClassAttributor('align', 'ql-align', i),
                            new r.StyleAttributor('align', 'text-align', i));
                },
                9541: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        s: function () {
                            return s;
                        },
                    });
                    var r = n(6003),
                        i = n(8638);
                    new r.ClassAttributor('background', 'ql-bg', { scope: r.Scope.INLINE });
                    const s = new i.a2('background', 'background-color', { scope: r.Scope.INLINE });
                },
                9404: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Ay: function () {
                            return h;
                        },
                    });
                    var r = n(9698),
                        i = n(3036),
                        s = n(4541),
                        o = n(4850),
                        l = n(5508),
                        a = n(580),
                        c = n(6142);
                    class u extends a.A {
                        static create(t) {
                            const e = super.create(t);
                            return e.setAttribute('spellcheck', 'false'), e;
                        }
                        code(t, e) {
                            return this.children
                                .map((t) => (t.length() <= 1 ? '' : t.domNode.innerText))
                                .join('\n')
                                .slice(t, t + e);
                        }
                        html(t, e) {
                            return `<pre>\n${(0, l.X)(this.code(t, e))}\n</pre>`;
                        }
                    }
                    class h extends r.Ay {
                        static TAB = '  ';
                        static register() {
                            c.Ay.register(u);
                        }
                    }
                    class f extends o.A {}
                    (f.blotName = 'code'),
                        (f.tagName = 'CODE'),
                        (h.blotName = 'code-block'),
                        (h.className = 'ql-code-block'),
                        (h.tagName = 'DIV'),
                        (u.blotName = 'code-block-container'),
                        (u.className = 'ql-code-block-container'),
                        (u.tagName = 'DIV'),
                        (u.allowedChildren = [h]),
                        (h.allowedChildren = [l.A, i.A, s.A]),
                        (h.requiredContainer = u);
                },
                8638: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        JM: function () {
                            return s;
                        },
                        a2: function () {
                            return i;
                        },
                    });
                    var r = n(6003);
                    class i extends r.StyleAttributor {
                        value(t) {
                            let e = super.value(t);
                            return e.startsWith('rgb(')
                                ? ((e = e.replace(/^[^\d]+/, '').replace(/[^\d]+$/, '')),
                                  `#${e
                                      .split(',')
                                      .map((t) => `00${parseInt(t, 10).toString(16)}`.slice(-2))
                                      .join('')}`)
                                : e;
                        }
                    }
                    new r.ClassAttributor('color', 'ql-color', { scope: r.Scope.INLINE });
                    const s = new i('color', 'color', { scope: r.Scope.INLINE });
                },
                7912: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Mc: function () {
                            return s;
                        },
                        VL: function () {
                            return o;
                        },
                    });
                    var r = n(6003);
                    const i = { scope: r.Scope.BLOCK, whitelist: ['rtl'] },
                        s = new r.Attributor('direction', 'dir', i),
                        o =
                            (new r.ClassAttributor('direction', 'ql-direction', i),
                            new r.StyleAttributor('direction', 'direction', i));
                },
                6772: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        z: function () {
                            return o;
                        },
                    });
                    var r = n(6003);
                    const i = { scope: r.Scope.INLINE, whitelist: ['serif', 'monospace'] };
                    new r.ClassAttributor('font', 'ql-font', i);
                    class s extends r.StyleAttributor {
                        value(t) {
                            return super.value(t).replace(/["']/g, '');
                        }
                    }
                    const o = new s('font', 'font-family', i);
                },
                664: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        r: function () {
                            return i;
                        },
                    });
                    var r = n(6003);
                    new r.ClassAttributor('size', 'ql-size', {
                        scope: r.Scope.INLINE,
                        whitelist: ['small', 'large', 'huge'],
                    });
                    const i = new r.StyleAttributor('size', 'font-size', {
                        scope: r.Scope.INLINE,
                        whitelist: ['10px', '18px', '32px'],
                    });
                },
                584: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Ay: function () {
                            return L;
                        },
                    });
                    var r = n(6003),
                        i = n(5232),
                        s = n.n(i),
                        o = n(9698),
                        l = n(6078),
                        a = n(4266),
                        c = n(6142),
                        u = n(8276),
                        h = n(9541),
                        f = n(9404),
                        d = n(8638),
                        p = n(7912),
                        g = n(6772),
                        m = n(664),
                        b = n(8123);
                    const y = /font-weight:\s*normal/,
                        v = ['P', 'OL', 'UL'],
                        A = (t) => t && v.includes(t.tagName),
                        N = /\bmso-list:[^;]*ignore/i,
                        E = /\bmso-list:[^;]*\bl(\d+)/i,
                        _ = /\bmso-list:[^;]*\blevel(\d+)/i,
                        x = [
                            function (t) {
                                'urn:schemas-microsoft-com:office:word' === t.documentElement.getAttribute('xmlns:w') &&
                                    ((t) => {
                                        const e = Array.from(t.querySelectorAll('[style*=mso-list]')),
                                            n = [],
                                            r = [];
                                        e.forEach((t) => {
                                            (t.getAttribute('style') || '').match(N) ? n.push(t) : r.push(t);
                                        }),
                                            n.forEach((t) => t.parentNode?.removeChild(t));
                                        const i = t.documentElement.innerHTML,
                                            s = r
                                                .map((t) =>
                                                    ((t, e) => {
                                                        const n = t.getAttribute('style'),
                                                            r = n?.match(E);
                                                        if (!r) return null;
                                                        const i = Number(r[1]),
                                                            s = n?.match(_),
                                                            o = s ? Number(s[1]) : 1,
                                                            l = new RegExp(
                                                                `@list l${i}:level${o}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`,
                                                                'i'
                                                            ),
                                                            a = e.match(l);
                                                        return {
                                                            id: i,
                                                            indent: o,
                                                            type: a && 'bullet' === a[1] ? 'bullet' : 'ordered',
                                                            element: t,
                                                        };
                                                    })(t, i)
                                                )
                                                .filter((t) => t);
                                        for (; s.length; ) {
                                            const t = [];
                                            let e = s.shift();
                                            for (; e; )
                                                t.push(e),
                                                    (e =
                                                        s.length &&
                                                        s[0]?.element === e.element.nextElementSibling &&
                                                        s[0].id === e.id
                                                            ? s.shift()
                                                            : null);
                                            const n = document.createElement('ul');
                                            t.forEach((t) => {
                                                const e = document.createElement('li');
                                                e.setAttribute('data-list', t.type),
                                                    t.indent > 1 &&
                                                        e.setAttribute('class', 'ql-indent-' + (t.indent - 1)),
                                                    (e.innerHTML = t.element.innerHTML),
                                                    n.appendChild(e);
                                            });
                                            const r = t[0]?.element,
                                                { parentNode: i } = r ?? {};
                                            r && i?.replaceChild(n, r),
                                                t.slice(1).forEach((t) => {
                                                    let { element: e } = t;
                                                    i?.removeChild(e);
                                                });
                                        }
                                    })(t);
                            },
                            function (t) {
                                t.querySelector('[id^="docs-internal-guid-"]') &&
                                    (((t) => {
                                        Array.from(t.querySelectorAll('b[style*="font-weight"]'))
                                            .filter((t) => t.getAttribute('style')?.match(y))
                                            .forEach((e) => {
                                                const n = t.createDocumentFragment();
                                                n.append(...e.childNodes), e.parentNode?.replaceChild(n, e);
                                            });
                                    })(t),
                                    ((t) => {
                                        Array.from(t.querySelectorAll('br'))
                                            .filter((t) => A(t.previousElementSibling) && A(t.nextElementSibling))
                                            .forEach((t) => {
                                                t.parentNode?.removeChild(t);
                                            });
                                    })(t));
                            },
                        ];
                    const w = (0, l.A)('quill:clipboard'),
                        O = [
                            [
                                Node.TEXT_NODE,
                                function (t, e, n) {
                                    let r = t.data;
                                    if ('O:P' === t.parentElement?.tagName) return e.insert(r.trim());
                                    if (!B(t)) {
                                        if (
                                            0 === r.trim().length &&
                                            r.includes('\n') &&
                                            !(function (t, e) {
                                                return (
                                                    t.previousElementSibling &&
                                                    t.nextElementSibling &&
                                                    !C(t.previousElementSibling, e) &&
                                                    !C(t.nextElementSibling, e)
                                                );
                                            })(t, n)
                                        )
                                            return e;
                                        const i = (t, e) => {
                                            const n = e.replace(/[^\u00a0]/g, '');
                                            return n.length < 1 && t ? ' ' : n;
                                        };
                                        (r = r.replace(/\r\n/g, ' ').replace(/\n/g, ' ')),
                                            (r = r.replace(/\s\s+/g, i.bind(i, !0))),
                                            ((null == t.previousSibling &&
                                                null != t.parentElement &&
                                                C(t.parentElement, n)) ||
                                                (t.previousSibling instanceof Element && C(t.previousSibling, n))) &&
                                                (r = r.replace(/^\s+/, i.bind(i, !1))),
                                            ((null == t.nextSibling &&
                                                null != t.parentElement &&
                                                C(t.parentElement, n)) ||
                                                (t.nextSibling instanceof Element && C(t.nextSibling, n))) &&
                                                (r = r.replace(/\s+$/, i.bind(i, !1)));
                                    }
                                    return e.insert(r);
                                },
                            ],
                            [Node.TEXT_NODE, M],
                            [
                                'br',
                                function (t, e) {
                                    return k(e, '\n') || e.insert('\n'), e;
                                },
                            ],
                            [Node.ELEMENT_NODE, M],
                            [
                                Node.ELEMENT_NODE,
                                function (t, e, n) {
                                    const i = n.query(t);
                                    if (null == i) return e;
                                    if (i.prototype instanceof r.EmbedBlot) {
                                        const e = {},
                                            r = i.value(t);
                                        if (null != r)
                                            return (e[i.blotName] = r), new (s())().insert(e, i.formats(t, n));
                                    } else if (
                                        (i.prototype instanceof r.BlockBlot && !k(e, '\n') && e.insert('\n'),
                                        'blotName' in i && 'formats' in i && 'function' == typeof i.formats)
                                    )
                                        return T(e, i.blotName, i.formats(t, n), n);
                                    return e;
                                },
                            ],
                            [
                                Node.ELEMENT_NODE,
                                function (t, e, n) {
                                    const i = r.Attributor.keys(t),
                                        s = r.ClassAttributor.keys(t),
                                        o = r.StyleAttributor.keys(t),
                                        l = {};
                                    return (
                                        i
                                            .concat(s)
                                            .concat(o)
                                            .forEach((e) => {
                                                let i = n.query(e, r.Scope.ATTRIBUTE);
                                                (null != i && ((l[i.attrName] = i.value(t)), l[i.attrName])) ||
                                                    ((i = j[e]),
                                                    null == i ||
                                                        (i.attrName !== e && i.keyName !== e) ||
                                                        (l[i.attrName] = i.value(t) || void 0),
                                                    (i = S[e]),
                                                    null == i ||
                                                        (i.attrName !== e && i.keyName !== e) ||
                                                        ((i = S[e]), (l[i.attrName] = i.value(t) || void 0)));
                                            }),
                                        Object.entries(l).reduce((t, e) => {
                                            let [r, i] = e;
                                            return T(t, r, i, n);
                                        }, e)
                                    );
                                },
                            ],
                            [
                                Node.ELEMENT_NODE,
                                function (t, e, n) {
                                    const r = {},
                                        i = t.style || {};
                                    return (
                                        'italic' === i.fontStyle && (r.italic = !0),
                                        'underline' === i.textDecoration && (r.underline = !0),
                                        'line-through' === i.textDecoration && (r.strike = !0),
                                        (i.fontWeight?.startsWith('bold') || parseInt(i.fontWeight, 10) >= 700) &&
                                            (r.bold = !0),
                                        (e = Object.entries(r).reduce((t, e) => {
                                            let [r, i] = e;
                                            return T(t, r, i, n);
                                        }, e)),
                                        parseFloat(i.textIndent || 0) > 0 ? new (s())().insert('\t').concat(e) : e
                                    );
                                },
                            ],
                            [
                                'li',
                                function (t, e, n) {
                                    const r = n.query(t);
                                    if (null == r || 'list' !== r.blotName || !k(e, '\n')) return e;
                                    let i = -1,
                                        o = t.parentNode;
                                    for (; null != o; )
                                        ['OL', 'UL'].includes(o.tagName) && (i += 1), (o = o.parentNode);
                                    return i <= 0
                                        ? e
                                        : e.reduce(
                                              (t, e) =>
                                                  e.insert
                                                      ? e.attributes && 'number' == typeof e.attributes.indent
                                                          ? t.push(e)
                                                          : t.insert(e.insert, { indent: i, ...(e.attributes || {}) })
                                                      : t,
                                              new (s())()
                                          );
                                },
                            ],
                            [
                                'ol, ul',
                                function (t, e, n) {
                                    const r = t;
                                    let i = 'OL' === r.tagName ? 'ordered' : 'bullet';
                                    const s = r.getAttribute('data-checked');
                                    return s && (i = 'true' === s ? 'checked' : 'unchecked'), T(e, 'list', i, n);
                                },
                            ],
                            [
                                'pre',
                                function (t, e, n) {
                                    const r = n.query('code-block');
                                    return T(
                                        e,
                                        'code-block',
                                        !r || !('formats' in r) || 'function' != typeof r.formats || r.formats(t, n),
                                        n
                                    );
                                },
                            ],
                            [
                                'tr',
                                function (t, e, n) {
                                    const r =
                                        'TABLE' === t.parentElement?.tagName
                                            ? t.parentElement
                                            : t.parentElement?.parentElement;
                                    return null != r
                                        ? T(e, 'table', Array.from(r.querySelectorAll('tr')).indexOf(t) + 1, n)
                                        : e;
                                },
                            ],
                            ['b', I('bold')],
                            ['i', I('italic')],
                            ['strike', I('strike')],
                            [
                                'style',
                                function () {
                                    return new (s())();
                                },
                            ],
                        ],
                        j = [u.gS, p.Mc].reduce((t, e) => ((t[e.keyName] = e), t), {}),
                        S = [u.Hu, h.s, d.JM, p.VL, g.z, m.r].reduce((t, e) => ((t[e.keyName] = e), t), {});
                    class L extends a.A {
                        static DEFAULTS = { matchers: [] };
                        constructor(t, e) {
                            super(t, e),
                                this.quill.root.addEventListener('copy', (t) => this.onCaptureCopy(t, !1)),
                                this.quill.root.addEventListener('cut', (t) => this.onCaptureCopy(t, !0)),
                                this.quill.root.addEventListener('paste', this.onCapturePaste.bind(this)),
                                (this.matchers = []),
                                O.concat(this.options.matchers ?? []).forEach((t) => {
                                    let [e, n] = t;
                                    this.addMatcher(e, n);
                                });
                        }
                        addMatcher(t, e) {
                            this.matchers.push([t, e]);
                        }
                        convert(t) {
                            let { html: e, text: n } = t,
                                r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (r[f.Ay.blotName])
                                return new (s())().insert(n || '', { [f.Ay.blotName]: r[f.Ay.blotName] });
                            if (!e) return new (s())().insert(n || '', r);
                            const i = this.convertHTML(e);
                            return k(i, '\n') && (null == i.ops[i.ops.length - 1].attributes || r.table)
                                ? i.compose(new (s())().retain(i.length() - 1).delete(1))
                                : i;
                        }
                        normalizeHTML(t) {
                            ((t) => {
                                t.documentElement &&
                                    x.forEach((e) => {
                                        e(t);
                                    });
                            })(t);
                        }
                        convertHTML(t) {
                            const e = new DOMParser().parseFromString(t, 'text/html');
                            this.normalizeHTML(e);
                            const n = e.body,
                                r = new WeakMap(),
                                [i, s] = this.prepareMatching(n, r);
                            return q(this.quill.scroll, n, i, s, r);
                        }
                        dangerouslyPasteHTML(t, e) {
                            let n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : c.Ay.sources.API;
                            if ('string' == typeof t) {
                                const n = this.convert({ html: t, text: '' });
                                this.quill.setContents(n, e), this.quill.setSelection(0, c.Ay.sources.SILENT);
                            } else {
                                const r = this.convert({ html: e, text: '' });
                                this.quill.updateContents(new (s())().retain(t).concat(r), n),
                                    this.quill.setSelection(t + r.length(), c.Ay.sources.SILENT);
                            }
                        }
                        onCaptureCopy(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                            if (t.defaultPrevented) return;
                            t.preventDefault();
                            const [n] = this.quill.selection.getRange();
                            if (null == n) return;
                            const { html: r, text: i } = this.onCopy(n, e);
                            t.clipboardData?.setData('text/plain', i),
                                t.clipboardData?.setData('text/html', r),
                                e && (0, b.Xo)({ range: n, quill: this.quill });
                        }
                        normalizeURIList(t) {
                            return t
                                .split(/\r?\n/)
                                .filter((t) => '#' !== t[0])
                                .join('\n');
                        }
                        onCapturePaste(t) {
                            if (t.defaultPrevented || !this.quill.isEnabled()) return;
                            t.preventDefault();
                            const e = this.quill.getSelection(!0);
                            if (null == e) return;
                            const n = t.clipboardData?.getData('text/html');
                            let r = t.clipboardData?.getData('text/plain');
                            if (!n && !r) {
                                const e = t.clipboardData?.getData('text/uri-list');
                                e && (r = this.normalizeURIList(e));
                            }
                            const i = Array.from(t.clipboardData?.files || []);
                            if (!n && i.length > 0) this.quill.uploader.upload(e, i);
                            else {
                                if (n && i.length > 0) {
                                    const t = new DOMParser().parseFromString(n, 'text/html');
                                    if (1 === t.body.childElementCount && 'IMG' === t.body.firstElementChild?.tagName)
                                        return void this.quill.uploader.upload(e, i);
                                }
                                this.onPaste(e, { html: n, text: r });
                            }
                        }
                        onCopy(t) {
                            const e = this.quill.getText(t);
                            return { html: this.quill.getSemanticHTML(t), text: e };
                        }
                        onPaste(t, e) {
                            let { text: n, html: r } = e;
                            const i = this.quill.getFormat(t.index),
                                o = this.convert({ text: n, html: r }, i);
                            w.log('onPaste', o, { text: n, html: r });
                            const l = new (s())().retain(t.index).delete(t.length).concat(o);
                            this.quill.updateContents(l, c.Ay.sources.USER),
                                this.quill.setSelection(l.length() - t.length, c.Ay.sources.SILENT),
                                this.quill.scrollSelectionIntoView();
                        }
                        prepareMatching(t, e) {
                            const n = [],
                                r = [];
                            return (
                                this.matchers.forEach((i) => {
                                    const [s, o] = i;
                                    switch (s) {
                                        case Node.TEXT_NODE:
                                            r.push(o);
                                            break;
                                        case Node.ELEMENT_NODE:
                                            n.push(o);
                                            break;
                                        default:
                                            Array.from(t.querySelectorAll(s)).forEach((t) => {
                                                if (e.has(t)) {
                                                    const n = e.get(t);
                                                    n?.push(o);
                                                } else e.set(t, [o]);
                                            });
                                    }
                                }),
                                [n, r]
                            );
                        }
                    }
                    function T(t, e, n, r) {
                        return r.query(e)
                            ? t.reduce((t, r) => {
                                  if (!r.insert) return t;
                                  if (r.attributes && r.attributes[e]) return t.push(r);
                                  const i = n ? { [e]: n } : {};
                                  return t.insert(r.insert, { ...i, ...r.attributes });
                              }, new (s())())
                            : t;
                    }
                    function k(t, e) {
                        let n = '';
                        for (let r = t.ops.length - 1; r >= 0 && n.length < e.length; --r) {
                            const e = t.ops[r];
                            if ('string' != typeof e.insert) break;
                            n = e.insert + n;
                        }
                        return n.slice(-1 * e.length) === e;
                    }
                    function C(t, e) {
                        if (!(t instanceof Element)) return !1;
                        const n = e.query(t);
                        return (
                            !(n && n.prototype instanceof r.EmbedBlot) &&
                            [
                                'address',
                                'article',
                                'blockquote',
                                'canvas',
                                'dd',
                                'div',
                                'dl',
                                'dt',
                                'fieldset',
                                'figcaption',
                                'figure',
                                'footer',
                                'form',
                                'h1',
                                'h2',
                                'h3',
                                'h4',
                                'h5',
                                'h6',
                                'header',
                                'iframe',
                                'li',
                                'main',
                                'nav',
                                'ol',
                                'output',
                                'p',
                                'pre',
                                'section',
                                'table',
                                'td',
                                'tr',
                                'ul',
                                'video',
                            ].includes(t.tagName.toLowerCase())
                        );
                    }
                    const R = new WeakMap();
                    function B(t) {
                        return (
                            null != t &&
                            (R.has(t) || ('PRE' === t.tagName ? R.set(t, !0) : R.set(t, B(t.parentNode))), R.get(t))
                        );
                    }
                    function q(t, e, n, r, i) {
                        return e.nodeType === e.TEXT_NODE
                            ? r.reduce((n, r) => r(e, n, t), new (s())())
                            : e.nodeType === e.ELEMENT_NODE
                            ? Array.from(e.childNodes || []).reduce((s, o) => {
                                  let l = q(t, o, n, r, i);
                                  return (
                                      o.nodeType === e.ELEMENT_NODE &&
                                          ((l = n.reduce((e, n) => n(o, e, t), l)),
                                          (l = (i.get(o) || []).reduce((e, n) => n(o, e, t), l))),
                                      s.concat(l)
                                  );
                              }, new (s())())
                            : new (s())();
                    }
                    function I(t) {
                        return (e, n, r) => T(n, t, !0, r);
                    }
                    function M(t, e, n) {
                        if (!k(e, '\n')) {
                            if (C(t, n) && (t.childNodes.length > 0 || t instanceof HTMLParagraphElement))
                                return e.insert('\n');
                            if (e.length() > 0 && t.nextSibling) {
                                let r = t.nextSibling;
                                for (; null != r; ) {
                                    if (C(r, n)) return e.insert('\n');
                                    const t = n.query(r);
                                    if (t && t.prototype instanceof o.zo) return e.insert('\n');
                                    r = r.firstChild;
                                }
                            }
                        }
                        return e;
                    }
                },
                8123: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        Ay: function () {
                            return d;
                        },
                        Xo: function () {
                            return v;
                        },
                    });
                    var r = n(5123),
                        i = n(3707),
                        s = n(5232),
                        o = n.n(s),
                        l = n(6003),
                        a = n(6142),
                        c = n(6078),
                        u = n(4266);
                    const h = (0, c.A)('quill:keyboard'),
                        f = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey';
                    class d extends u.A {
                        static match(t, e) {
                            return (
                                !['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(
                                    (n) => !!e[n] !== t[n] && null !== e[n]
                                ) &&
                                (e.key === t.key || e.key === t.which)
                            );
                        }
                        constructor(t, e) {
                            super(t, e),
                                (this.bindings = {}),
                                Object.keys(this.options.bindings).forEach((t) => {
                                    this.options.bindings[t] && this.addBinding(this.options.bindings[t]);
                                }),
                                this.addBinding({ key: 'Enter', shiftKey: null }, this.handleEnter),
                                this.addBinding({ key: 'Enter', metaKey: null, ctrlKey: null, altKey: null }, () => {}),
                                /Firefox/i.test(navigator.userAgent)
                                    ? (this.addBinding({ key: 'Backspace' }, { collapsed: !0 }, this.handleBackspace),
                                      this.addBinding({ key: 'Delete' }, { collapsed: !0 }, this.handleDelete))
                                    : (this.addBinding(
                                          { key: 'Backspace' },
                                          { collapsed: !0, prefix: /^.?$/ },
                                          this.handleBackspace
                                      ),
                                      this.addBinding(
                                          { key: 'Delete' },
                                          { collapsed: !0, suffix: /^.?$/ },
                                          this.handleDelete
                                      )),
                                this.addBinding({ key: 'Backspace' }, { collapsed: !1 }, this.handleDeleteRange),
                                this.addBinding({ key: 'Delete' }, { collapsed: !1 }, this.handleDeleteRange),
                                this.addBinding(
                                    { key: 'Backspace', altKey: null, ctrlKey: null, metaKey: null, shiftKey: null },
                                    { collapsed: !0, offset: 0 },
                                    this.handleBackspace
                                ),
                                this.listen();
                        }
                        addBinding(t) {
                            let e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            const r = (function (t) {
                                if ('string' == typeof t || 'number' == typeof t) t = { key: t };
                                else {
                                    if ('object' != typeof t) return null;
                                    t = (0, i.A)(t);
                                }
                                return t.shortKey && ((t[f] = t.shortKey), delete t.shortKey), t;
                            })(t);
                            null != r
                                ? ('function' == typeof e && (e = { handler: e }),
                                  'function' == typeof n && (n = { handler: n }),
                                  (Array.isArray(r.key) ? r.key : [r.key]).forEach((t) => {
                                      const i = { ...r, key: t, ...e, ...n };
                                      (this.bindings[i.key] = this.bindings[i.key] || []), this.bindings[i.key].push(i);
                                  }))
                                : h.warn('Attempted to add invalid keyboard binding', r);
                        }
                        listen() {
                            this.quill.root.addEventListener('keydown', (t) => {
                                if (t.defaultPrevented || t.isComposing) return;
                                if (229 === t.keyCode && ('Enter' === t.key || 'Backspace' === t.key)) return;
                                const e = (this.bindings[t.key] || [])
                                    .concat(this.bindings[t.which] || [])
                                    .filter((e) => d.match(t, e));
                                if (0 === e.length) return;
                                const n = a.Ay.find(t.target, !0);
                                if (n && n.scroll !== this.quill.scroll) return;
                                const i = this.quill.getSelection();
                                if (null == i || !this.quill.hasFocus()) return;
                                const [s, o] = this.quill.getLine(i.index),
                                    [c, u] = this.quill.getLeaf(i.index),
                                    [h, f] = 0 === i.length ? [c, u] : this.quill.getLeaf(i.index + i.length),
                                    p = c instanceof l.TextBlot ? c.value().slice(0, u) : '',
                                    g = h instanceof l.TextBlot ? h.value().slice(f) : '',
                                    m = {
                                        collapsed: 0 === i.length,
                                        empty: 0 === i.length && s.length() <= 1,
                                        format: this.quill.getFormat(i),
                                        line: s,
                                        offset: o,
                                        prefix: p,
                                        suffix: g,
                                        event: t,
                                    };
                                e.some((t) => {
                                    if (null != t.collapsed && t.collapsed !== m.collapsed) return !1;
                                    if (null != t.empty && t.empty !== m.empty) return !1;
                                    if (null != t.offset && t.offset !== m.offset) return !1;
                                    if (Array.isArray(t.format)) {
                                        if (t.format.every((t) => null == m.format[t])) return !1;
                                    } else if (
                                        'object' == typeof t.format &&
                                        !Object.keys(t.format).every((e) =>
                                            !0 === t.format[e]
                                                ? null != m.format[e]
                                                : !1 === t.format[e]
                                                ? null == m.format[e]
                                                : (0, r.A)(t.format[e], m.format[e])
                                        )
                                    )
                                        return !1;
                                    return !(
                                        (null != t.prefix && !t.prefix.test(m.prefix)) ||
                                        (null != t.suffix && !t.suffix.test(m.suffix)) ||
                                        !0 === t.handler.call(this, i, m, t)
                                    );
                                }) && t.preventDefault();
                            });
                        }
                        handleBackspace(t, e) {
                            const n = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
                            if (0 === t.index || this.quill.getLength() <= 1) return;
                            let r = {};
                            const [i] = this.quill.getLine(t.index);
                            let l = new (o())().retain(t.index - n).delete(n);
                            if (0 === e.offset) {
                                const [e] = this.quill.getLine(t.index - 1);
                                if (e && !('block' === e.statics.blotName && e.length() <= 1)) {
                                    const e = i.formats(),
                                        n = this.quill.getFormat(t.index - 1, 1);
                                    if (((r = s.AttributeMap.diff(e, n) || {}), Object.keys(r).length > 0)) {
                                        const e = new (o())().retain(t.index + i.length() - 2).retain(1, r);
                                        l = l.compose(e);
                                    }
                                }
                            }
                            this.quill.updateContents(l, a.Ay.sources.USER), this.quill.focus();
                        }
                        handleDelete(t, e) {
                            const n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
                            if (t.index >= this.quill.getLength() - n) return;
                            let r = {};
                            const [i] = this.quill.getLine(t.index);
                            let l = new (o())().retain(t.index).delete(n);
                            if (e.offset >= i.length() - 1) {
                                const [e] = this.quill.getLine(t.index + 1);
                                if (e) {
                                    const n = i.formats(),
                                        o = this.quill.getFormat(t.index, 1);
                                    (r = s.AttributeMap.diff(n, o) || {}),
                                        Object.keys(r).length > 0 && (l = l.retain(e.length() - 1).retain(1, r));
                                }
                            }
                            this.quill.updateContents(l, a.Ay.sources.USER), this.quill.focus();
                        }
                        handleDeleteRange(t) {
                            v({ range: t, quill: this.quill }), this.quill.focus();
                        }
                        handleEnter(t, e) {
                            const n = Object.keys(e.format).reduce(
                                    (t, n) => (
                                        this.quill.scroll.query(n, l.Scope.BLOCK) &&
                                            !Array.isArray(e.format[n]) &&
                                            (t[n] = e.format[n]),
                                        t
                                    ),
                                    {}
                                ),
                                r = new (o())().retain(t.index).delete(t.length).insert('\n', n);
                            this.quill.updateContents(r, a.Ay.sources.USER),
                                this.quill.setSelection(t.index + 1, a.Ay.sources.SILENT),
                                this.quill.focus();
                        }
                    }
                    const p = {
                        bindings: {
                            bold: b('bold'),
                            italic: b('italic'),
                            underline: b('underline'),
                            indent: {
                                key: 'Tab',
                                format: ['blockquote', 'indent', 'list'],
                                handler(t, e) {
                                    return (
                                        !(!e.collapsed || 0 === e.offset) ||
                                        (this.quill.format('indent', '+1', a.Ay.sources.USER), !1)
                                    );
                                },
                            },
                            outdent: {
                                key: 'Tab',
                                shiftKey: !0,
                                format: ['blockquote', 'indent', 'list'],
                                handler(t, e) {
                                    return (
                                        !(!e.collapsed || 0 === e.offset) ||
                                        (this.quill.format('indent', '-1', a.Ay.sources.USER), !1)
                                    );
                                },
                            },
                            'outdent backspace': {
                                key: 'Backspace',
                                collapsed: !0,
                                shiftKey: null,
                                metaKey: null,
                                ctrlKey: null,
                                altKey: null,
                                format: ['indent', 'list'],
                                offset: 0,
                                handler(t, e) {
                                    null != e.format.indent
                                        ? this.quill.format('indent', '-1', a.Ay.sources.USER)
                                        : null != e.format.list && this.quill.format('list', !1, a.Ay.sources.USER);
                                },
                            },
                            'indent code-block': g(!0),
                            'outdent code-block': g(!1),
                            'remove tab': {
                                key: 'Tab',
                                shiftKey: !0,
                                collapsed: !0,
                                prefix: /\t$/,
                                handler(t) {
                                    this.quill.deleteText(t.index - 1, 1, a.Ay.sources.USER);
                                },
                            },
                            tab: {
                                key: 'Tab',
                                handler(t, e) {
                                    if (e.format.table) return !0;
                                    this.quill.history.cutoff();
                                    const n = new (o())().retain(t.index).delete(t.length).insert('\t');
                                    return (
                                        this.quill.updateContents(n, a.Ay.sources.USER),
                                        this.quill.history.cutoff(),
                                        this.quill.setSelection(t.index + 1, a.Ay.sources.SILENT),
                                        !1
                                    );
                                },
                            },
                            'blockquote empty enter': {
                                key: 'Enter',
                                collapsed: !0,
                                format: ['blockquote'],
                                empty: !0,
                                handler() {
                                    this.quill.format('blockquote', !1, a.Ay.sources.USER);
                                },
                            },
                            'list empty enter': {
                                key: 'Enter',
                                collapsed: !0,
                                format: ['list'],
                                empty: !0,
                                handler(t, e) {
                                    const n = { list: !1 };
                                    e.format.indent && (n.indent = !1),
                                        this.quill.formatLine(t.index, t.length, n, a.Ay.sources.USER);
                                },
                            },
                            'checklist enter': {
                                key: 'Enter',
                                collapsed: !0,
                                format: { list: 'checked' },
                                handler(t) {
                                    const [e, n] = this.quill.getLine(t.index),
                                        r = { ...e.formats(), list: 'checked' },
                                        i = new (o())()
                                            .retain(t.index)
                                            .insert('\n', r)
                                            .retain(e.length() - n - 1)
                                            .retain(1, { list: 'unchecked' });
                                    this.quill.updateContents(i, a.Ay.sources.USER),
                                        this.quill.setSelection(t.index + 1, a.Ay.sources.SILENT),
                                        this.quill.scrollSelectionIntoView();
                                },
                            },
                            'header enter': {
                                key: 'Enter',
                                collapsed: !0,
                                format: ['header'],
                                suffix: /^$/,
                                handler(t, e) {
                                    const [n, r] = this.quill.getLine(t.index),
                                        i = new (o())()
                                            .retain(t.index)
                                            .insert('\n', e.format)
                                            .retain(n.length() - r - 1)
                                            .retain(1, { header: null });
                                    this.quill.updateContents(i, a.Ay.sources.USER),
                                        this.quill.setSelection(t.index + 1, a.Ay.sources.SILENT),
                                        this.quill.scrollSelectionIntoView();
                                },
                            },
                            'table backspace': {
                                key: 'Backspace',
                                format: ['table'],
                                collapsed: !0,
                                offset: 0,
                                handler() {},
                            },
                            'table delete': {
                                key: 'Delete',
                                format: ['table'],
                                collapsed: !0,
                                suffix: /^$/,
                                handler() {},
                            },
                            'table enter': {
                                key: 'Enter',
                                shiftKey: null,
                                format: ['table'],
                                handler(t) {
                                    const e = this.quill.getModule('table');
                                    if (e) {
                                        const [n, r, i, s] = e.getTable(t),
                                            l = (function (t, e, n, r) {
                                                return null == e.prev && null == e.next
                                                    ? null == n.prev && null == n.next
                                                        ? 0 === r
                                                            ? -1
                                                            : 1
                                                        : null == n.prev
                                                        ? -1
                                                        : 1
                                                    : null == e.prev
                                                    ? -1
                                                    : null == e.next
                                                    ? 1
                                                    : null;
                                            })(0, r, i, s);
                                        if (null == l) return;
                                        let c = n.offset();
                                        if (l < 0) {
                                            const e = new (o())().retain(c).insert('\n');
                                            this.quill.updateContents(e, a.Ay.sources.USER),
                                                this.quill.setSelection(t.index + 1, t.length, a.Ay.sources.SILENT);
                                        } else if (l > 0) {
                                            c += n.length();
                                            const t = new (o())().retain(c).insert('\n');
                                            this.quill.updateContents(t, a.Ay.sources.USER),
                                                this.quill.setSelection(c, a.Ay.sources.USER);
                                        }
                                    }
                                },
                            },
                            'table tab': {
                                key: 'Tab',
                                shiftKey: null,
                                format: ['table'],
                                handler(t, e) {
                                    const { event: n, line: r } = e,
                                        i = r.offset(this.quill.scroll);
                                    n.shiftKey
                                        ? this.quill.setSelection(i - 1, a.Ay.sources.USER)
                                        : this.quill.setSelection(i + r.length(), a.Ay.sources.USER);
                                },
                            },
                            'list autofill': {
                                key: ' ',
                                shiftKey: null,
                                collapsed: !0,
                                format: { 'code-block': !1, blockquote: !1, table: !1 },
                                prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                                handler(t, e) {
                                    if (null == this.quill.scroll.query('list')) return !0;
                                    const { length: n } = e.prefix,
                                        [r, i] = this.quill.getLine(t.index);
                                    if (i > n) return !0;
                                    let s;
                                    switch (e.prefix.trim()) {
                                        case '[]':
                                        case '[ ]':
                                            s = 'unchecked';
                                            break;
                                        case '[x]':
                                            s = 'checked';
                                            break;
                                        case '-':
                                        case '*':
                                            s = 'bullet';
                                            break;
                                        default:
                                            s = 'ordered';
                                    }
                                    this.quill.insertText(t.index, ' ', a.Ay.sources.USER), this.quill.history.cutoff();
                                    const l = new (o())()
                                        .retain(t.index - i)
                                        .delete(n + 1)
                                        .retain(r.length() - 2 - i)
                                        .retain(1, { list: s });
                                    return (
                                        this.quill.updateContents(l, a.Ay.sources.USER),
                                        this.quill.history.cutoff(),
                                        this.quill.setSelection(t.index - n, a.Ay.sources.SILENT),
                                        !1
                                    );
                                },
                            },
                            'code exit': {
                                key: 'Enter',
                                collapsed: !0,
                                format: ['code-block'],
                                prefix: /^$/,
                                suffix: /^\s*$/,
                                handler(t) {
                                    const [e, n] = this.quill.getLine(t.index);
                                    let r = 2,
                                        i = e;
                                    for (; null != i && i.length() <= 1 && i.formats()['code-block']; )
                                        if (((i = i.prev), (r -= 1), r <= 0)) {
                                            const r = new (o())()
                                                .retain(t.index + e.length() - n - 2)
                                                .retain(1, { 'code-block': null })
                                                .delete(1);
                                            return (
                                                this.quill.updateContents(r, a.Ay.sources.USER),
                                                this.quill.setSelection(t.index - 1, a.Ay.sources.SILENT),
                                                !1
                                            );
                                        }
                                    return !0;
                                },
                            },
                            'embed left': m('ArrowLeft', !1),
                            'embed left shift': m('ArrowLeft', !0),
                            'embed right': m('ArrowRight', !1),
                            'embed right shift': m('ArrowRight', !0),
                            'table down': y(!1),
                            'table up': y(!0),
                        },
                    };
                    function g(t) {
                        return {
                            key: 'Tab',
                            shiftKey: !t,
                            format: { 'code-block': !0 },
                            handler(e, n) {
                                let { event: r } = n;
                                const i = this.quill.scroll.query('code-block'),
                                    { TAB: s } = i;
                                if (0 === e.length && !r.shiftKey)
                                    return (
                                        this.quill.insertText(e.index, s, a.Ay.sources.USER),
                                        void this.quill.setSelection(e.index + s.length, a.Ay.sources.SILENT)
                                    );
                                const o = 0 === e.length ? this.quill.getLines(e.index, 1) : this.quill.getLines(e);
                                let { index: l, length: c } = e;
                                o.forEach((e, n) => {
                                    t
                                        ? (e.insertAt(0, s), 0 === n ? (l += s.length) : (c += s.length))
                                        : e.domNode.textContent.startsWith(s) &&
                                          (e.deleteAt(0, s.length), 0 === n ? (l -= s.length) : (c -= s.length));
                                }),
                                    this.quill.update(a.Ay.sources.USER),
                                    this.quill.setSelection(l, c, a.Ay.sources.SILENT);
                            },
                        };
                    }
                    function m(t, e) {
                        return {
                            key: t,
                            shiftKey: e,
                            altKey: null,
                            ['ArrowLeft' === t ? 'prefix' : 'suffix']: /^$/,
                            handler(n) {
                                let { index: r } = n;
                                'ArrowRight' === t && (r += n.length + 1);
                                const [i] = this.quill.getLeaf(r);
                                return !(
                                    i instanceof l.EmbedBlot &&
                                    ('ArrowLeft' === t
                                        ? e
                                            ? this.quill.setSelection(n.index - 1, n.length + 1, a.Ay.sources.USER)
                                            : this.quill.setSelection(n.index - 1, a.Ay.sources.USER)
                                        : e
                                        ? this.quill.setSelection(n.index, n.length + 1, a.Ay.sources.USER)
                                        : this.quill.setSelection(n.index + n.length + 1, a.Ay.sources.USER),
                                    1)
                                );
                            },
                        };
                    }
                    function b(t) {
                        return {
                            key: t[0],
                            shortKey: !0,
                            handler(e, n) {
                                this.quill.format(t, !n.format[t], a.Ay.sources.USER);
                            },
                        };
                    }
                    function y(t) {
                        return {
                            key: t ? 'ArrowUp' : 'ArrowDown',
                            collapsed: !0,
                            format: ['table'],
                            handler(e, n) {
                                const r = t ? 'prev' : 'next',
                                    i = n.line,
                                    s = i.parent[r];
                                if (null != s) {
                                    if ('table-row' === s.statics.blotName) {
                                        let t = s.children.head,
                                            e = i;
                                        for (; null != e.prev; ) (e = e.prev), (t = t.next);
                                        const r = t.offset(this.quill.scroll) + Math.min(n.offset, t.length() - 1);
                                        this.quill.setSelection(r, 0, a.Ay.sources.USER);
                                    }
                                } else {
                                    const e = i.table()[r];
                                    null != e &&
                                        (t
                                            ? this.quill.setSelection(
                                                  e.offset(this.quill.scroll) + e.length() - 1,
                                                  0,
                                                  a.Ay.sources.USER
                                              )
                                            : this.quill.setSelection(
                                                  e.offset(this.quill.scroll),
                                                  0,
                                                  a.Ay.sources.USER
                                              ));
                                }
                                return !1;
                            },
                        };
                    }
                    function v(t) {
                        let { quill: e, range: n } = t;
                        const r = e.getLines(n);
                        let i = {};
                        if (r.length > 1) {
                            const t = r[0].formats(),
                                e = r[r.length - 1].formats();
                            i = s.AttributeMap.diff(e, t) || {};
                        }
                        e.deleteText(n, a.Ay.sources.USER),
                            Object.keys(i).length > 0 && e.formatLine(n.index, 1, i, a.Ay.sources.USER),
                            e.setSelection(n.index, a.Ay.sources.SILENT);
                    }
                    d.DEFAULTS = p;
                },
                8920: function (t) {
                    'use strict';
                    var e = Object.prototype.hasOwnProperty,
                        n = '~';
                    function r() {}
                    function i(t, e, n) {
                        (this.fn = t), (this.context = e), (this.once = n || !1);
                    }
                    function s(t, e, r, s, o) {
                        if ('function' != typeof r) throw new TypeError('The listener must be a function');
                        var l = new i(r, s || t, o),
                            a = n ? n + e : e;
                        return (
                            t._events[a]
                                ? t._events[a].fn
                                    ? (t._events[a] = [t._events[a], l])
                                    : t._events[a].push(l)
                                : ((t._events[a] = l), t._eventsCount++),
                            t
                        );
                    }
                    function o(t, e) {
                        0 == --t._eventsCount ? (t._events = new r()) : delete t._events[e];
                    }
                    function l() {
                        (this._events = new r()), (this._eventsCount = 0);
                    }
                    Object.create && ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1)),
                        (l.prototype.eventNames = function () {
                            var t,
                                r,
                                i = [];
                            if (0 === this._eventsCount) return i;
                            for (r in (t = this._events)) e.call(t, r) && i.push(n ? r.slice(1) : r);
                            return Object.getOwnPropertySymbols ? i.concat(Object.getOwnPropertySymbols(t)) : i;
                        }),
                        (l.prototype.listeners = function (t) {
                            var e = n ? n + t : t,
                                r = this._events[e];
                            if (!r) return [];
                            if (r.fn) return [r.fn];
                            for (var i = 0, s = r.length, o = new Array(s); i < s; i++) o[i] = r[i].fn;
                            return o;
                        }),
                        (l.prototype.listenerCount = function (t) {
                            var e = n ? n + t : t,
                                r = this._events[e];
                            return r ? (r.fn ? 1 : r.length) : 0;
                        }),
                        (l.prototype.emit = function (t, e, r, i, s, o) {
                            var l = n ? n + t : t;
                            if (!this._events[l]) return !1;
                            var a,
                                c,
                                u = this._events[l],
                                h = arguments.length;
                            if (u.fn) {
                                switch ((u.once && this.removeListener(t, u.fn, void 0, !0), h)) {
                                    case 1:
                                        return u.fn.call(u.context), !0;
                                    case 2:
                                        return u.fn.call(u.context, e), !0;
                                    case 3:
                                        return u.fn.call(u.context, e, r), !0;
                                    case 4:
                                        return u.fn.call(u.context, e, r, i), !0;
                                    case 5:
                                        return u.fn.call(u.context, e, r, i, s), !0;
                                    case 6:
                                        return u.fn.call(u.context, e, r, i, s, o), !0;
                                }
                                for (c = 1, a = new Array(h - 1); c < h; c++) a[c - 1] = arguments[c];
                                u.fn.apply(u.context, a);
                            } else {
                                var f,
                                    d = u.length;
                                for (c = 0; c < d; c++)
                                    switch ((u[c].once && this.removeListener(t, u[c].fn, void 0, !0), h)) {
                                        case 1:
                                            u[c].fn.call(u[c].context);
                                            break;
                                        case 2:
                                            u[c].fn.call(u[c].context, e);
                                            break;
                                        case 3:
                                            u[c].fn.call(u[c].context, e, r);
                                            break;
                                        case 4:
                                            u[c].fn.call(u[c].context, e, r, i);
                                            break;
                                        default:
                                            if (!a)
                                                for (f = 1, a = new Array(h - 1); f < h; f++) a[f - 1] = arguments[f];
                                            u[c].fn.apply(u[c].context, a);
                                    }
                            }
                            return !0;
                        }),
                        (l.prototype.on = function (t, e, n) {
                            return s(this, t, e, n, !1);
                        }),
                        (l.prototype.once = function (t, e, n) {
                            return s(this, t, e, n, !0);
                        }),
                        (l.prototype.removeListener = function (t, e, r, i) {
                            var s = n ? n + t : t;
                            if (!this._events[s]) return this;
                            if (!e) return o(this, s), this;
                            var l = this._events[s];
                            if (l.fn) l.fn !== e || (i && !l.once) || (r && l.context !== r) || o(this, s);
                            else {
                                for (var a = 0, c = [], u = l.length; a < u; a++)
                                    (l[a].fn !== e || (i && !l[a].once) || (r && l[a].context !== r)) && c.push(l[a]);
                                c.length ? (this._events[s] = 1 === c.length ? c[0] : c) : o(this, s);
                            }
                            return this;
                        }),
                        (l.prototype.removeAllListeners = function (t) {
                            var e;
                            return (
                                t
                                    ? ((e = n ? n + t : t), this._events[e] && o(this, e))
                                    : ((this._events = new r()), (this._eventsCount = 0)),
                                this
                            );
                        }),
                        (l.prototype.off = l.prototype.removeListener),
                        (l.prototype.addListener = l.prototype.on),
                        (l.prefixed = n),
                        (l.EventEmitter = l),
                        (t.exports = l);
                },
                5090: function (t) {
                    var e = -1,
                        n = 1,
                        r = 0;
                    function i(t, g, m, b, y) {
                        if (t === g) return t ? [[r, t]] : [];
                        if (null != m) {
                            var A = (function (t, e, n) {
                                var r = 'number' == typeof n ? { index: n, length: 0 } : n.oldRange,
                                    i = 'number' == typeof n ? null : n.newRange,
                                    s = t.length,
                                    o = e.length;
                                if (0 === r.length && (null === i || 0 === i.length)) {
                                    var l = r.index,
                                        a = t.slice(0, l),
                                        c = t.slice(l),
                                        u = i ? i.index : null,
                                        h = l + o - s;
                                    if ((null === u || u === h) && !(h < 0 || h > o)) {
                                        var f = e.slice(0, h);
                                        if ((g = e.slice(h)) === c) {
                                            var d = Math.min(l, h);
                                            if ((b = a.slice(0, d)) === (A = f.slice(0, d)))
                                                return v(b, a.slice(d), f.slice(d), c);
                                        }
                                    }
                                    if (null === u || u === l) {
                                        var p = l,
                                            g = ((f = e.slice(0, p)), e.slice(p));
                                        if (f === a) {
                                            var m = Math.min(s - p, o - p);
                                            if ((y = c.slice(c.length - m)) === (N = g.slice(g.length - m)))
                                                return v(a, c.slice(0, c.length - m), g.slice(0, g.length - m), y);
                                        }
                                    }
                                }
                                if (r.length > 0 && i && 0 === i.length) {
                                    var b = t.slice(0, r.index),
                                        y = t.slice(r.index + r.length);
                                    if (!(o < (d = b.length) + (m = y.length))) {
                                        var A = e.slice(0, d),
                                            N = e.slice(o - m);
                                        if (b === A && y === N) return v(b, t.slice(d, s - m), e.slice(d, o - m), y);
                                    }
                                }
                                return null;
                            })(t, g, m);
                            if (A) return A;
                        }
                        var N = o(t, g),
                            E = t.substring(0, N);
                        N = a((t = t.substring(N)), (g = g.substring(N)));
                        var _ = t.substring(t.length - N),
                            x = (function (t, l) {
                                var c;
                                if (!t) return [[n, l]];
                                if (!l) return [[e, t]];
                                var u = t.length > l.length ? t : l,
                                    h = t.length > l.length ? l : t,
                                    f = u.indexOf(h);
                                if (-1 !== f)
                                    return (
                                        (c = [
                                            [n, u.substring(0, f)],
                                            [r, h],
                                            [n, u.substring(f + h.length)],
                                        ]),
                                        t.length > l.length && (c[0][0] = c[2][0] = e),
                                        c
                                    );
                                if (1 === h.length)
                                    return [
                                        [e, t],
                                        [n, l],
                                    ];
                                var d = (function (t, e) {
                                    var n = t.length > e.length ? t : e,
                                        r = t.length > e.length ? e : t;
                                    if (n.length < 4 || 2 * r.length < n.length) return null;
                                    function i(t, e, n) {
                                        for (
                                            var r,
                                                i,
                                                s,
                                                l,
                                                c = t.substring(n, n + Math.floor(t.length / 4)),
                                                u = -1,
                                                h = '';
                                            -1 !== (u = e.indexOf(c, u + 1));

                                        ) {
                                            var f = o(t.substring(n), e.substring(u)),
                                                d = a(t.substring(0, n), e.substring(0, u));
                                            h.length < d + f &&
                                                ((h = e.substring(u - d, u) + e.substring(u, u + f)),
                                                (r = t.substring(0, n - d)),
                                                (i = t.substring(n + f)),
                                                (s = e.substring(0, u - d)),
                                                (l = e.substring(u + f)));
                                        }
                                        return 2 * h.length >= t.length ? [r, i, s, l, h] : null;
                                    }
                                    var s,
                                        l,
                                        c,
                                        u,
                                        h,
                                        f = i(n, r, Math.ceil(n.length / 4)),
                                        d = i(n, r, Math.ceil(n.length / 2));
                                    return f || d
                                        ? ((s = d ? (f && f[4].length > d[4].length ? f : d) : f),
                                          t.length > e.length
                                              ? ((l = s[0]), (c = s[1]), (u = s[2]), (h = s[3]))
                                              : ((u = s[0]), (h = s[1]), (l = s[2]), (c = s[3])),
                                          [l, c, u, h, s[4]])
                                        : null;
                                })(t, l);
                                if (d) {
                                    var p = d[0],
                                        g = d[1],
                                        m = d[2],
                                        b = d[3],
                                        y = d[4],
                                        v = i(p, m),
                                        A = i(g, b);
                                    return v.concat([[r, y]], A);
                                }
                                return (function (t, r) {
                                    for (
                                        var i = t.length,
                                            o = r.length,
                                            l = Math.ceil((i + o) / 2),
                                            a = l,
                                            c = 2 * l,
                                            u = new Array(c),
                                            h = new Array(c),
                                            f = 0;
                                        f < c;
                                        f++
                                    )
                                        (u[f] = -1), (h[f] = -1);
                                    (u[a + 1] = 0), (h[a + 1] = 0);
                                    for (var d = i - o, p = d % 2 != 0, g = 0, m = 0, b = 0, y = 0, v = 0; v < l; v++) {
                                        for (var A = -v + g; A <= v - m; A += 2) {
                                            for (
                                                var N = a + A,
                                                    E =
                                                        (j =
                                                            A === -v || (A !== v && u[N - 1] < u[N + 1])
                                                                ? u[N + 1]
                                                                : u[N - 1] + 1) - A;
                                                j < i && E < o && t.charAt(j) === r.charAt(E);

                                            )
                                                j++, E++;
                                            if (((u[N] = j), j > i)) m += 2;
                                            else if (E > o) g += 2;
                                            else if (
                                                p &&
                                                (w = a + d - A) >= 0 &&
                                                w < c &&
                                                -1 !== h[w] &&
                                                j >= (x = i - h[w])
                                            )
                                                return s(t, r, j, E);
                                        }
                                        for (var _ = -v + b; _ <= v - y; _ += 2) {
                                            for (
                                                var x,
                                                    w = a + _,
                                                    O =
                                                        (x =
                                                            _ === -v || (_ !== v && h[w - 1] < h[w + 1])
                                                                ? h[w + 1]
                                                                : h[w - 1] + 1) - _;
                                                x < i && O < o && t.charAt(i - x - 1) === r.charAt(o - O - 1);

                                            )
                                                x++, O++;
                                            if (((h[w] = x), x > i)) y += 2;
                                            else if (O > o) b += 2;
                                            else if (!p) {
                                                var j;
                                                if ((N = a + d - _) >= 0 && N < c && -1 !== u[N])
                                                    if (((E = a + (j = u[N]) - N), j >= (x = i - x)))
                                                        return s(t, r, j, E);
                                            }
                                        }
                                    }
                                    return [
                                        [e, t],
                                        [n, r],
                                    ];
                                })(t, l);
                            })((t = t.substring(0, t.length - N)), (g = g.substring(0, g.length - N)));
                        return (
                            E && x.unshift([r, E]),
                            _ && x.push([r, _]),
                            p(x, y),
                            b &&
                                (function (t) {
                                    for (
                                        var i = !1, s = [], o = 0, g = null, m = 0, b = 0, y = 0, v = 0, A = 0;
                                        m < t.length;

                                    )
                                        t[m][0] == r
                                            ? ((s[o++] = m), (b = v), (y = A), (v = 0), (A = 0), (g = t[m][1]))
                                            : (t[m][0] == n ? (v += t[m][1].length) : (A += t[m][1].length),
                                              g &&
                                                  g.length <= Math.max(b, y) &&
                                                  g.length <= Math.max(v, A) &&
                                                  (t.splice(s[o - 1], 0, [e, g]),
                                                  (t[s[o - 1] + 1][0] = n),
                                                  o--,
                                                  (m = --o > 0 ? s[o - 1] : -1),
                                                  (b = 0),
                                                  (y = 0),
                                                  (v = 0),
                                                  (A = 0),
                                                  (g = null),
                                                  (i = !0))),
                                            m++;
                                    for (
                                        i && p(t),
                                            (function (t) {
                                                function e(t, e) {
                                                    if (!t || !e) return 6;
                                                    var n = t.charAt(t.length - 1),
                                                        r = e.charAt(0),
                                                        i = n.match(c),
                                                        s = r.match(c),
                                                        o = i && n.match(u),
                                                        l = s && r.match(u),
                                                        a = o && n.match(h),
                                                        p = l && r.match(h),
                                                        g = a && t.match(f),
                                                        m = p && e.match(d);
                                                    return g || m
                                                        ? 5
                                                        : a || p
                                                        ? 4
                                                        : i && !o && l
                                                        ? 3
                                                        : o || l
                                                        ? 2
                                                        : i || s
                                                        ? 1
                                                        : 0;
                                                }
                                                for (var n = 1; n < t.length - 1; ) {
                                                    if (t[n - 1][0] == r && t[n + 1][0] == r) {
                                                        var i = t[n - 1][1],
                                                            s = t[n][1],
                                                            o = t[n + 1][1],
                                                            l = a(i, s);
                                                        if (l) {
                                                            var p = s.substring(s.length - l);
                                                            (i = i.substring(0, i.length - l)),
                                                                (s = p + s.substring(0, s.length - l)),
                                                                (o = p + o);
                                                        }
                                                        for (
                                                            var g = i, m = s, b = o, y = e(i, s) + e(s, o);
                                                            s.charAt(0) === o.charAt(0);

                                                        ) {
                                                            (i += s.charAt(0)),
                                                                (s = s.substring(1) + o.charAt(0)),
                                                                (o = o.substring(1));
                                                            var v = e(i, s) + e(s, o);
                                                            v >= y && ((y = v), (g = i), (m = s), (b = o));
                                                        }
                                                        t[n - 1][1] != g &&
                                                            (g ? (t[n - 1][1] = g) : (t.splice(n - 1, 1), n--),
                                                            (t[n][1] = m),
                                                            b ? (t[n + 1][1] = b) : (t.splice(n + 1, 1), n--));
                                                    }
                                                    n++;
                                                }
                                            })(t),
                                            m = 1;
                                        m < t.length;

                                    ) {
                                        if (t[m - 1][0] == e && t[m][0] == n) {
                                            var N = t[m - 1][1],
                                                E = t[m][1],
                                                _ = l(N, E),
                                                x = l(E, N);
                                            _ >= x
                                                ? (_ >= N.length / 2 || _ >= E.length / 2) &&
                                                  (t.splice(m, 0, [r, E.substring(0, _)]),
                                                  (t[m - 1][1] = N.substring(0, N.length - _)),
                                                  (t[m + 1][1] = E.substring(_)),
                                                  m++)
                                                : (x >= N.length / 2 || x >= E.length / 2) &&
                                                  (t.splice(m, 0, [r, N.substring(0, x)]),
                                                  (t[m - 1][0] = n),
                                                  (t[m - 1][1] = E.substring(0, E.length - x)),
                                                  (t[m + 1][0] = e),
                                                  (t[m + 1][1] = N.substring(x)),
                                                  m++),
                                                m++;
                                        }
                                        m++;
                                    }
                                })(x),
                            x
                        );
                    }
                    function s(t, e, n, r) {
                        var s = t.substring(0, n),
                            o = e.substring(0, r),
                            l = t.substring(n),
                            a = e.substring(r),
                            c = i(s, o),
                            u = i(l, a);
                        return c.concat(u);
                    }
                    function o(t, e) {
                        if (!t || !e || t.charAt(0) !== e.charAt(0)) return 0;
                        for (var n = 0, r = Math.min(t.length, e.length), i = r, s = 0; n < i; )
                            t.substring(s, i) == e.substring(s, i) ? (s = n = i) : (r = i),
                                (i = Math.floor((r - n) / 2 + n));
                        return g(t.charCodeAt(i - 1)) && i--, i;
                    }
                    function l(t, e) {
                        var n = t.length,
                            r = e.length;
                        if (0 == n || 0 == r) return 0;
                        n > r ? (t = t.substring(n - r)) : n < r && (e = e.substring(0, n));
                        var i = Math.min(n, r);
                        if (t == e) return i;
                        for (var s = 0, o = 1; ; ) {
                            var l = t.substring(i - o),
                                a = e.indexOf(l);
                            if (-1 == a) return s;
                            (o += a), (0 != a && t.substring(i - o) != e.substring(0, o)) || ((s = o), o++);
                        }
                    }
                    function a(t, e) {
                        if (!t || !e || t.slice(-1) !== e.slice(-1)) return 0;
                        for (var n = 0, r = Math.min(t.length, e.length), i = r, s = 0; n < i; )
                            t.substring(t.length - i, t.length - s) == e.substring(e.length - i, e.length - s)
                                ? (s = n = i)
                                : (r = i),
                                (i = Math.floor((r - n) / 2 + n));
                        return m(t.charCodeAt(t.length - i)) && i--, i;
                    }
                    var c = /[^a-zA-Z0-9]/,
                        u = /\s/,
                        h = /[\r\n]/,
                        f = /\n\r?\n$/,
                        d = /^\r?\n\r?\n/;
                    function p(t, i) {
                        t.push([r, '']);
                        for (var s, l = 0, c = 0, u = 0, h = '', f = ''; l < t.length; )
                            if (l < t.length - 1 && !t[l][1]) t.splice(l, 1);
                            else
                                switch (t[l][0]) {
                                    case n:
                                        u++, (f += t[l][1]), l++;
                                        break;
                                    case e:
                                        c++, (h += t[l][1]), l++;
                                        break;
                                    case r:
                                        var d = l - u - c - 1;
                                        if (i) {
                                            if (d >= 0 && y(t[d][1])) {
                                                var g = t[d][1].slice(-1);
                                                if (
                                                    ((t[d][1] = t[d][1].slice(0, -1)),
                                                    (h = g + h),
                                                    (f = g + f),
                                                    !t[d][1])
                                                ) {
                                                    t.splice(d, 1), l--;
                                                    var m = d - 1;
                                                    t[m] && t[m][0] === n && (u++, (f = t[m][1] + f), m--),
                                                        t[m] && t[m][0] === e && (c++, (h = t[m][1] + h), m--),
                                                        (d = m);
                                                }
                                            }
                                            b(t[l][1]) &&
                                                ((g = t[l][1].charAt(0)),
                                                (t[l][1] = t[l][1].slice(1)),
                                                (h += g),
                                                (f += g));
                                        }
                                        if (l < t.length - 1 && !t[l][1]) {
                                            t.splice(l, 1);
                                            break;
                                        }
                                        if (h.length > 0 || f.length > 0) {
                                            h.length > 0 &&
                                                f.length > 0 &&
                                                (0 !== (s = o(f, h)) &&
                                                    (d >= 0
                                                        ? (t[d][1] += f.substring(0, s))
                                                        : (t.splice(0, 0, [r, f.substring(0, s)]), l++),
                                                    (f = f.substring(s)),
                                                    (h = h.substring(s))),
                                                0 !== (s = a(f, h)) &&
                                                    ((t[l][1] = f.substring(f.length - s) + t[l][1]),
                                                    (f = f.substring(0, f.length - s)),
                                                    (h = h.substring(0, h.length - s))));
                                            var v = u + c;
                                            0 === h.length && 0 === f.length
                                                ? (t.splice(l - v, v), (l -= v))
                                                : 0 === h.length
                                                ? (t.splice(l - v, v, [n, f]), (l = l - v + 1))
                                                : 0 === f.length
                                                ? (t.splice(l - v, v, [e, h]), (l = l - v + 1))
                                                : (t.splice(l - v, v, [e, h], [n, f]), (l = l - v + 2));
                                        }
                                        0 !== l && t[l - 1][0] === r ? ((t[l - 1][1] += t[l][1]), t.splice(l, 1)) : l++,
                                            (u = 0),
                                            (c = 0),
                                            (h = ''),
                                            (f = '');
                                }
                        '' === t[t.length - 1][1] && t.pop();
                        var A = !1;
                        for (l = 1; l < t.length - 1; )
                            t[l - 1][0] === r &&
                                t[l + 1][0] === r &&
                                (t[l][1].substring(t[l][1].length - t[l - 1][1].length) === t[l - 1][1]
                                    ? ((t[l][1] =
                                          t[l - 1][1] + t[l][1].substring(0, t[l][1].length - t[l - 1][1].length)),
                                      (t[l + 1][1] = t[l - 1][1] + t[l + 1][1]),
                                      t.splice(l - 1, 1),
                                      (A = !0))
                                    : t[l][1].substring(0, t[l + 1][1].length) == t[l + 1][1] &&
                                      ((t[l - 1][1] += t[l + 1][1]),
                                      (t[l][1] = t[l][1].substring(t[l + 1][1].length) + t[l + 1][1]),
                                      t.splice(l + 1, 1),
                                      (A = !0))),
                                l++;
                        A && p(t, i);
                    }
                    function g(t) {
                        return t >= 55296 && t <= 56319;
                    }
                    function m(t) {
                        return t >= 56320 && t <= 57343;
                    }
                    function b(t) {
                        return m(t.charCodeAt(0));
                    }
                    function y(t) {
                        return g(t.charCodeAt(t.length - 1));
                    }
                    function v(t, i, s, o) {
                        return y(t) || b(o)
                            ? null
                            : (function (t) {
                                  for (var e = [], n = 0; n < t.length; n++) t[n][1].length > 0 && e.push(t[n]);
                                  return e;
                              })([
                                  [r, t],
                                  [e, i],
                                  [n, s],
                                  [r, o],
                              ]);
                    }
                    function A(t, e, n, r) {
                        return i(t, e, n, r, !0);
                    }
                    (A.INSERT = n), (A.DELETE = e), (A.EQUAL = r), (t.exports = A);
                },
                9629: function (t, e, n) {
                    t = n.nmd(t);
                    var r = '__lodash_hash_undefined__',
                        i = 9007199254740991,
                        s = '[object Arguments]',
                        o = '[object Boolean]',
                        l = '[object Date]',
                        a = '[object Function]',
                        c = '[object GeneratorFunction]',
                        u = '[object Map]',
                        h = '[object Number]',
                        f = '[object Object]',
                        d = '[object Promise]',
                        p = '[object RegExp]',
                        g = '[object Set]',
                        m = '[object String]',
                        b = '[object Symbol]',
                        y = '[object WeakMap]',
                        v = '[object ArrayBuffer]',
                        A = '[object DataView]',
                        N = '[object Float32Array]',
                        E = '[object Float64Array]',
                        _ = '[object Int8Array]',
                        x = '[object Int16Array]',
                        w = '[object Int32Array]',
                        O = '[object Uint8Array]',
                        j = '[object Uint8ClampedArray]',
                        S = '[object Uint16Array]',
                        L = '[object Uint32Array]',
                        T = /\w*$/,
                        k = /^\[object .+?Constructor\]$/,
                        C = /^(?:0|[1-9]\d*)$/,
                        R = {};
                    (R[s] =
                        R['[object Array]'] =
                        R[v] =
                        R[A] =
                        R[o] =
                        R[l] =
                        R[N] =
                        R[E] =
                        R[_] =
                        R[x] =
                        R[w] =
                        R[u] =
                        R[h] =
                        R[f] =
                        R[p] =
                        R[g] =
                        R[m] =
                        R[b] =
                        R[O] =
                        R[j] =
                        R[S] =
                        R[L] =
                            !0),
                        (R['[object Error]'] = R[a] = R[y] = !1);
                    var B = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g,
                        q = 'object' == typeof self && self && self.Object === Object && self,
                        I = B || q || Function('return this')(),
                        M = e && !e.nodeType && e,
                        D = M && t && !t.nodeType && t,
                        U = D && D.exports === M;
                    function P(t, e) {
                        return t.set(e[0], e[1]), t;
                    }
                    function z(t, e) {
                        return t.add(e), t;
                    }
                    function F(t, e, n, r) {
                        var i = -1,
                            s = t ? t.length : 0;
                        for (r && s && (n = t[++i]); ++i < s; ) n = e(n, t[i], i, t);
                        return n;
                    }
                    function $(t) {
                        var e = !1;
                        if (null != t && 'function' != typeof t.toString)
                            try {
                                e = !!(t + '');
                            } catch (t) {}
                        return e;
                    }
                    function K(t) {
                        var e = -1,
                            n = Array(t.size);
                        return (
                            t.forEach(function (t, r) {
                                n[++e] = [r, t];
                            }),
                            n
                        );
                    }
                    function V(t, e) {
                        return function (n) {
                            return t(e(n));
                        };
                    }
                    function H(t) {
                        var e = -1,
                            n = Array(t.size);
                        return (
                            t.forEach(function (t) {
                                n[++e] = t;
                            }),
                            n
                        );
                    }
                    var W,
                        G = Array.prototype,
                        X = Function.prototype,
                        Q = Object.prototype,
                        J = I['__core-js_shared__'],
                        Y = (W = /[^.]+$/.exec((J && J.keys && J.keys.IE_PROTO) || '')) ? 'Symbol(src)_1.' + W : '',
                        Z = X.toString,
                        tt = Q.hasOwnProperty,
                        et = Q.toString,
                        nt = RegExp(
                            '^' +
                                Z.call(tt)
                                    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                                '$'
                        ),
                        rt = U ? I.Buffer : void 0,
                        it = I.Symbol,
                        st = I.Uint8Array,
                        ot = V(Object.getPrototypeOf, Object),
                        lt = Object.create,
                        at = Q.propertyIsEnumerable,
                        ct = G.splice,
                        ut = Object.getOwnPropertySymbols,
                        ht = rt ? rt.isBuffer : void 0,
                        ft = V(Object.keys, Object),
                        dt = It(I, 'DataView'),
                        pt = It(I, 'Map'),
                        gt = It(I, 'Promise'),
                        mt = It(I, 'Set'),
                        bt = It(I, 'WeakMap'),
                        yt = It(Object, 'create'),
                        vt = zt(dt),
                        At = zt(pt),
                        Nt = zt(gt),
                        Et = zt(mt),
                        _t = zt(bt),
                        xt = it ? it.prototype : void 0,
                        wt = xt ? xt.valueOf : void 0;
                    function Ot(t) {
                        var e = -1,
                            n = t ? t.length : 0;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    function jt(t) {
                        var e = -1,
                            n = t ? t.length : 0;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    function St(t) {
                        var e = -1,
                            n = t ? t.length : 0;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    function Lt(t) {
                        this.__data__ = new jt(t);
                    }
                    function Tt(t, e, n) {
                        var r = t[e];
                        (tt.call(t, e) && Ft(r, n) && (void 0 !== n || e in t)) || (t[e] = n);
                    }
                    function kt(t, e) {
                        for (var n = t.length; n--; ) if (Ft(t[n][0], e)) return n;
                        return -1;
                    }
                    function Ct(t, e, n, r, i, d, y) {
                        var k;
                        if ((r && (k = d ? r(t, i, d, y) : r(t)), void 0 !== k)) return k;
                        if (!Wt(t)) return t;
                        var C = $t(t);
                        if (C) {
                            if (
                                ((k = (function (t) {
                                    var e = t.length,
                                        n = t.constructor(e);
                                    return (
                                        e &&
                                            'string' == typeof t[0] &&
                                            tt.call(t, 'index') &&
                                            ((n.index = t.index), (n.input = t.input)),
                                        n
                                    );
                                })(t)),
                                !e)
                            )
                                return (function (t, e) {
                                    var n = -1,
                                        r = t.length;
                                    for (e || (e = Array(r)); ++n < r; ) e[n] = t[n];
                                    return e;
                                })(t, k);
                        } else {
                            var B = Dt(t),
                                q = B == a || B == c;
                            if (Vt(t))
                                return (function (t, e) {
                                    if (e) return t.slice();
                                    var n = new t.constructor(t.length);
                                    return t.copy(n), n;
                                })(t, e);
                            if (B == f || B == s || (q && !d)) {
                                if ($(t)) return d ? t : {};
                                if (
                                    ((k = (function (t) {
                                        return 'function' != typeof t.constructor || Pt(t)
                                            ? {}
                                            : Wt((e = ot(t)))
                                            ? lt(e)
                                            : {};
                                        var e;
                                    })(q ? {} : t)),
                                    !e)
                                )
                                    return (function (t, e) {
                                        return Bt(t, Mt(t), e);
                                    })(
                                        t,
                                        (function (t, e) {
                                            return t && Bt(e, Gt(e), t);
                                        })(k, t)
                                    );
                            } else {
                                if (!R[B]) return d ? t : {};
                                k = (function (t, e, n, r) {
                                    var i,
                                        s = t.constructor;
                                    switch (e) {
                                        case v:
                                            return Rt(t);
                                        case o:
                                        case l:
                                            return new s(+t);
                                        case A:
                                            return (function (t, e) {
                                                var n = e ? Rt(t.buffer) : t.buffer;
                                                return new t.constructor(n, t.byteOffset, t.byteLength);
                                            })(t, r);
                                        case N:
                                        case E:
                                        case _:
                                        case x:
                                        case w:
                                        case O:
                                        case j:
                                        case S:
                                        case L:
                                            return (function (t, e) {
                                                var n = e ? Rt(t.buffer) : t.buffer;
                                                return new t.constructor(n, t.byteOffset, t.length);
                                            })(t, r);
                                        case u:
                                            return (function (t, e, n) {
                                                return F(e ? n(K(t), !0) : K(t), P, new t.constructor());
                                            })(t, r, n);
                                        case h:
                                        case m:
                                            return new s(t);
                                        case p:
                                            return (function (t) {
                                                var e = new t.constructor(t.source, T.exec(t));
                                                return (e.lastIndex = t.lastIndex), e;
                                            })(t);
                                        case g:
                                            return (function (t, e, n) {
                                                return F(e ? n(H(t), !0) : H(t), z, new t.constructor());
                                            })(t, r, n);
                                        case b:
                                            return (i = t), wt ? Object(wt.call(i)) : {};
                                    }
                                })(t, B, Ct, e);
                            }
                        }
                        y || (y = new Lt());
                        var I = y.get(t);
                        if (I) return I;
                        if ((y.set(t, k), !C))
                            var M = n
                                ? (function (t) {
                                      return (function (t, e, n) {
                                          var r = e(t);
                                          return $t(t)
                                              ? r
                                              : (function (t, e) {
                                                    for (var n = -1, r = e.length, i = t.length; ++n < r; )
                                                        t[i + n] = e[n];
                                                    return t;
                                                })(r, n(t));
                                      })(t, Gt, Mt);
                                  })(t)
                                : Gt(t);
                        return (
                            (function (t, e) {
                                for (var n = -1, r = t ? t.length : 0; ++n < r && !1 !== e(t[n], n); );
                            })(M || t, function (i, s) {
                                M && (i = t[(s = i)]), Tt(k, s, Ct(i, e, n, r, s, t, y));
                            }),
                            k
                        );
                    }
                    function Rt(t) {
                        var e = new t.constructor(t.byteLength);
                        return new st(e).set(new st(t)), e;
                    }
                    function Bt(t, e, n, r) {
                        n || (n = {});
                        for (var i = -1, s = e.length; ++i < s; ) {
                            var o = e[i],
                                l = r ? r(n[o], t[o], o, n, t) : void 0;
                            Tt(n, o, void 0 === l ? t[o] : l);
                        }
                        return n;
                    }
                    function qt(t, e) {
                        var n,
                            r,
                            i = t.__data__;
                        return (
                            'string' == (r = typeof (n = e)) || 'number' == r || 'symbol' == r || 'boolean' == r
                                ? '__proto__' !== n
                                : null === n
                        )
                            ? i['string' == typeof e ? 'string' : 'hash']
                            : i.map;
                    }
                    function It(t, e) {
                        var n = (function (t, e) {
                            return null == t ? void 0 : t[e];
                        })(t, e);
                        return (function (t) {
                            return !(!Wt(t) || ((e = t), Y && Y in e)) && (Ht(t) || $(t) ? nt : k).test(zt(t));
                            var e;
                        })(n)
                            ? n
                            : void 0;
                    }
                    (Ot.prototype.clear = function () {
                        this.__data__ = yt ? yt(null) : {};
                    }),
                        (Ot.prototype.delete = function (t) {
                            return this.has(t) && delete this.__data__[t];
                        }),
                        (Ot.prototype.get = function (t) {
                            var e = this.__data__;
                            if (yt) {
                                var n = e[t];
                                return n === r ? void 0 : n;
                            }
                            return tt.call(e, t) ? e[t] : void 0;
                        }),
                        (Ot.prototype.has = function (t) {
                            var e = this.__data__;
                            return yt ? void 0 !== e[t] : tt.call(e, t);
                        }),
                        (Ot.prototype.set = function (t, e) {
                            return (this.__data__[t] = yt && void 0 === e ? r : e), this;
                        }),
                        (jt.prototype.clear = function () {
                            this.__data__ = [];
                        }),
                        (jt.prototype.delete = function (t) {
                            var e = this.__data__,
                                n = kt(e, t);
                            return !(n < 0 || (n == e.length - 1 ? e.pop() : ct.call(e, n, 1), 0));
                        }),
                        (jt.prototype.get = function (t) {
                            var e = this.__data__,
                                n = kt(e, t);
                            return n < 0 ? void 0 : e[n][1];
                        }),
                        (jt.prototype.has = function (t) {
                            return kt(this.__data__, t) > -1;
                        }),
                        (jt.prototype.set = function (t, e) {
                            var n = this.__data__,
                                r = kt(n, t);
                            return r < 0 ? n.push([t, e]) : (n[r][1] = e), this;
                        }),
                        (St.prototype.clear = function () {
                            this.__data__ = { hash: new Ot(), map: new (pt || jt)(), string: new Ot() };
                        }),
                        (St.prototype.delete = function (t) {
                            return qt(this, t).delete(t);
                        }),
                        (St.prototype.get = function (t) {
                            return qt(this, t).get(t);
                        }),
                        (St.prototype.has = function (t) {
                            return qt(this, t).has(t);
                        }),
                        (St.prototype.set = function (t, e) {
                            return qt(this, t).set(t, e), this;
                        }),
                        (Lt.prototype.clear = function () {
                            this.__data__ = new jt();
                        }),
                        (Lt.prototype.delete = function (t) {
                            return this.__data__.delete(t);
                        }),
                        (Lt.prototype.get = function (t) {
                            return this.__data__.get(t);
                        }),
                        (Lt.prototype.has = function (t) {
                            return this.__data__.has(t);
                        }),
                        (Lt.prototype.set = function (t, e) {
                            var n = this.__data__;
                            if (n instanceof jt) {
                                var r = n.__data__;
                                if (!pt || r.length < 199) return r.push([t, e]), this;
                                n = this.__data__ = new St(r);
                            }
                            return n.set(t, e), this;
                        });
                    var Mt = ut
                            ? V(ut, Object)
                            : function () {
                                  return [];
                              },
                        Dt = function (t) {
                            return et.call(t);
                        };
                    function Ut(t, e) {
                        return (
                            !!(e = null == e ? i : e) &&
                            ('number' == typeof t || C.test(t)) &&
                            t > -1 &&
                            t % 1 == 0 &&
                            t < e
                        );
                    }
                    function Pt(t) {
                        var e = t && t.constructor;
                        return t === (('function' == typeof e && e.prototype) || Q);
                    }
                    function zt(t) {
                        if (null != t) {
                            try {
                                return Z.call(t);
                            } catch (t) {}
                            try {
                                return t + '';
                            } catch (t) {}
                        }
                        return '';
                    }
                    function Ft(t, e) {
                        return t === e || (t != t && e != e);
                    }
                    ((dt && Dt(new dt(new ArrayBuffer(1))) != A) ||
                        (pt && Dt(new pt()) != u) ||
                        (gt && Dt(gt.resolve()) != d) ||
                        (mt && Dt(new mt()) != g) ||
                        (bt && Dt(new bt()) != y)) &&
                        (Dt = function (t) {
                            var e = et.call(t),
                                n = e == f ? t.constructor : void 0,
                                r = n ? zt(n) : void 0;
                            if (r)
                                switch (r) {
                                    case vt:
                                        return A;
                                    case At:
                                        return u;
                                    case Nt:
                                        return d;
                                    case Et:
                                        return g;
                                    case _t:
                                        return y;
                                }
                            return e;
                        });
                    var $t = Array.isArray;
                    function Kt(t) {
                        return (
                            null != t &&
                            (function (t) {
                                return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= i;
                            })(t.length) &&
                            !Ht(t)
                        );
                    }
                    var Vt =
                        ht ||
                        function () {
                            return !1;
                        };
                    function Ht(t) {
                        var e = Wt(t) ? et.call(t) : '';
                        return e == a || e == c;
                    }
                    function Wt(t) {
                        var e = typeof t;
                        return !!t && ('object' == e || 'function' == e);
                    }
                    function Gt(t) {
                        return Kt(t)
                            ? (function (t, e) {
                                  var n =
                                          $t(t) ||
                                          (function (t) {
                                              return (
                                                  (function (t) {
                                                      return (
                                                          (function (t) {
                                                              return !!t && 'object' == typeof t;
                                                          })(t) && Kt(t)
                                                      );
                                                  })(t) &&
                                                  tt.call(t, 'callee') &&
                                                  (!at.call(t, 'callee') || et.call(t) == s)
                                              );
                                          })(t)
                                              ? (function (t, e) {
                                                    for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
                                                    return r;
                                                })(t.length, String)
                                              : [],
                                      r = n.length,
                                      i = !!r;
                                  for (var o in t)
                                      (!e && !tt.call(t, o)) || (i && ('length' == o || Ut(o, r))) || n.push(o);
                                  return n;
                              })(t)
                            : (function (t) {
                                  if (!Pt(t)) return ft(t);
                                  var e = [];
                                  for (var n in Object(t)) tt.call(t, n) && 'constructor' != n && e.push(n);
                                  return e;
                              })(t);
                    }
                    t.exports = function (t) {
                        return Ct(t, !0, !0);
                    };
                },
                4162: function (t, e, n) {
                    t = n.nmd(t);
                    var r = '__lodash_hash_undefined__',
                        i = 1,
                        s = 2,
                        o = 9007199254740991,
                        l = '[object Arguments]',
                        a = '[object Array]',
                        c = '[object AsyncFunction]',
                        u = '[object Boolean]',
                        h = '[object Date]',
                        f = '[object Error]',
                        d = '[object Function]',
                        p = '[object GeneratorFunction]',
                        g = '[object Map]',
                        m = '[object Number]',
                        b = '[object Null]',
                        y = '[object Object]',
                        v = '[object Promise]',
                        A = '[object Proxy]',
                        N = '[object RegExp]',
                        E = '[object Set]',
                        _ = '[object String]',
                        x = '[object Undefined]',
                        w = '[object WeakMap]',
                        O = '[object ArrayBuffer]',
                        j = '[object DataView]',
                        S = /^\[object .+?Constructor\]$/,
                        L = /^(?:0|[1-9]\d*)$/,
                        T = {};
                    (T['[object Float32Array]'] =
                        T['[object Float64Array]'] =
                        T['[object Int8Array]'] =
                        T['[object Int16Array]'] =
                        T['[object Int32Array]'] =
                        T['[object Uint8Array]'] =
                        T['[object Uint8ClampedArray]'] =
                        T['[object Uint16Array]'] =
                        T['[object Uint32Array]'] =
                            !0),
                        (T[l] =
                            T[a] =
                            T[O] =
                            T[u] =
                            T[j] =
                            T[h] =
                            T[f] =
                            T[d] =
                            T[g] =
                            T[m] =
                            T[y] =
                            T[N] =
                            T[E] =
                            T[_] =
                            T[w] =
                                !1);
                    var k = 'object' == typeof n.g && n.g && n.g.Object === Object && n.g,
                        C = 'object' == typeof self && self && self.Object === Object && self,
                        R = k || C || Function('return this')(),
                        B = e && !e.nodeType && e,
                        q = B && t && !t.nodeType && t,
                        I = q && q.exports === B,
                        M = I && k.process,
                        D = (function () {
                            try {
                                return M && M.binding && M.binding('util');
                            } catch (t) {}
                        })(),
                        U = D && D.isTypedArray;
                    function P(t, e) {
                        for (var n = -1, r = null == t ? 0 : t.length; ++n < r; ) if (e(t[n], n, t)) return !0;
                        return !1;
                    }
                    function z(t) {
                        var e = -1,
                            n = Array(t.size);
                        return (
                            t.forEach(function (t, r) {
                                n[++e] = [r, t];
                            }),
                            n
                        );
                    }
                    function F(t) {
                        var e = -1,
                            n = Array(t.size);
                        return (
                            t.forEach(function (t) {
                                n[++e] = t;
                            }),
                            n
                        );
                    }
                    var $,
                        K,
                        V,
                        H = Array.prototype,
                        W = Function.prototype,
                        G = Object.prototype,
                        X = R['__core-js_shared__'],
                        Q = W.toString,
                        J = G.hasOwnProperty,
                        Y = ($ = /[^.]+$/.exec((X && X.keys && X.keys.IE_PROTO) || '')) ? 'Symbol(src)_1.' + $ : '',
                        Z = G.toString,
                        tt = RegExp(
                            '^' +
                                Q.call(J)
                                    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                                '$'
                        ),
                        et = I ? R.Buffer : void 0,
                        nt = R.Symbol,
                        rt = R.Uint8Array,
                        it = G.propertyIsEnumerable,
                        st = H.splice,
                        ot = nt ? nt.toStringTag : void 0,
                        lt = Object.getOwnPropertySymbols,
                        at = et ? et.isBuffer : void 0,
                        ct =
                            ((K = Object.keys),
                            (V = Object),
                            function (t) {
                                return K(V(t));
                            }),
                        ut = qt(R, 'DataView'),
                        ht = qt(R, 'Map'),
                        ft = qt(R, 'Promise'),
                        dt = qt(R, 'Set'),
                        pt = qt(R, 'WeakMap'),
                        gt = qt(Object, 'create'),
                        mt = Ut(ut),
                        bt = Ut(ht),
                        yt = Ut(ft),
                        vt = Ut(dt),
                        At = Ut(pt),
                        Nt = nt ? nt.prototype : void 0,
                        Et = Nt ? Nt.valueOf : void 0;
                    function _t(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    function xt(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    function wt(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    function Ot(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.__data__ = new wt(); ++e < n; ) this.add(t[e]);
                    }
                    function jt(t) {
                        var e = (this.__data__ = new xt(t));
                        this.size = e.size;
                    }
                    function St(t, e) {
                        for (var n = t.length; n--; ) if (Pt(t[n][0], e)) return n;
                        return -1;
                    }
                    function Lt(t) {
                        return null == t
                            ? void 0 === t
                                ? x
                                : b
                            : ot && ot in Object(t)
                            ? (function (t) {
                                  var e = J.call(t, ot),
                                      n = t[ot];
                                  try {
                                      t[ot] = void 0;
                                      var r = !0;
                                  } catch (t) {}
                                  var i = Z.call(t);
                                  return r && (e ? (t[ot] = n) : delete t[ot]), i;
                              })(t)
                            : (function (t) {
                                  return Z.call(t);
                              })(t);
                    }
                    function Tt(t) {
                        return Wt(t) && Lt(t) == l;
                    }
                    function kt(t, e, n, r, o) {
                        return (
                            t === e ||
                            (null == t || null == e || (!Wt(t) && !Wt(e))
                                ? t != t && e != e
                                : (function (t, e, n, r, o, c) {
                                      var d = Ft(t),
                                          p = Ft(e),
                                          b = d ? a : Mt(t),
                                          v = p ? a : Mt(e),
                                          A = (b = b == l ? y : b) == y,
                                          x = (v = v == l ? y : v) == y,
                                          w = b == v;
                                      if (w && $t(t)) {
                                          if (!$t(e)) return !1;
                                          (d = !0), (A = !1);
                                      }
                                      if (w && !A)
                                          return (
                                              c || (c = new jt()),
                                              d || Gt(t)
                                                  ? Ct(t, e, n, r, o, c)
                                                  : (function (t, e, n, r, o, l, a) {
                                                        switch (n) {
                                                            case j:
                                                                if (
                                                                    t.byteLength != e.byteLength ||
                                                                    t.byteOffset != e.byteOffset
                                                                )
                                                                    return !1;
                                                                (t = t.buffer), (e = e.buffer);
                                                            case O:
                                                                return !(
                                                                    t.byteLength != e.byteLength ||
                                                                    !l(new rt(t), new rt(e))
                                                                );
                                                            case u:
                                                            case h:
                                                            case m:
                                                                return Pt(+t, +e);
                                                            case f:
                                                                return t.name == e.name && t.message == e.message;
                                                            case N:
                                                            case _:
                                                                return t == e + '';
                                                            case g:
                                                                var c = z;
                                                            case E:
                                                                var d = r & i;
                                                                if ((c || (c = F), t.size != e.size && !d)) return !1;
                                                                var p = a.get(t);
                                                                if (p) return p == e;
                                                                (r |= s), a.set(t, e);
                                                                var b = Ct(c(t), c(e), r, o, l, a);
                                                                return a.delete(t), b;
                                                            case '[object Symbol]':
                                                                if (Et) return Et.call(t) == Et.call(e);
                                                        }
                                                        return !1;
                                                    })(t, e, b, n, r, o, c)
                                          );
                                      if (!(n & i)) {
                                          var S = A && J.call(t, '__wrapped__'),
                                              L = x && J.call(e, '__wrapped__');
                                          if (S || L) {
                                              var T = S ? t.value() : t,
                                                  k = L ? e.value() : e;
                                              return c || (c = new jt()), o(T, k, n, r, c);
                                          }
                                      }
                                      return (
                                          !!w &&
                                          (c || (c = new jt()),
                                          (function (t, e, n, r, s, o) {
                                              var l = n & i,
                                                  a = Rt(t),
                                                  c = a.length;
                                              if (c != Rt(e).length && !l) return !1;
                                              for (var u = c; u--; ) {
                                                  var h = a[u];
                                                  if (!(l ? h in e : J.call(e, h))) return !1;
                                              }
                                              var f = o.get(t);
                                              if (f && o.get(e)) return f == e;
                                              var d = !0;
                                              o.set(t, e), o.set(e, t);
                                              for (var p = l; ++u < c; ) {
                                                  var g = t[(h = a[u])],
                                                      m = e[h];
                                                  if (r) var b = l ? r(m, g, h, e, t, o) : r(g, m, h, t, e, o);
                                                  if (!(void 0 === b ? g === m || s(g, m, n, r, o) : b)) {
                                                      d = !1;
                                                      break;
                                                  }
                                                  p || (p = 'constructor' == h);
                                              }
                                              if (d && !p) {
                                                  var y = t.constructor,
                                                      v = e.constructor;
                                                  y == v ||
                                                      !('constructor' in t) ||
                                                      !('constructor' in e) ||
                                                      ('function' == typeof y &&
                                                          y instanceof y &&
                                                          'function' == typeof v &&
                                                          v instanceof v) ||
                                                      (d = !1);
                                              }
                                              return o.delete(t), o.delete(e), d;
                                          })(t, e, n, r, o, c))
                                      );
                                  })(t, e, n, r, kt, o))
                        );
                    }
                    function Ct(t, e, n, r, o, l) {
                        var a = n & i,
                            c = t.length,
                            u = e.length;
                        if (c != u && !(a && u > c)) return !1;
                        var h = l.get(t);
                        if (h && l.get(e)) return h == e;
                        var f = -1,
                            d = !0,
                            p = n & s ? new Ot() : void 0;
                        for (l.set(t, e), l.set(e, t); ++f < c; ) {
                            var g = t[f],
                                m = e[f];
                            if (r) var b = a ? r(m, g, f, e, t, l) : r(g, m, f, t, e, l);
                            if (void 0 !== b) {
                                if (b) continue;
                                d = !1;
                                break;
                            }
                            if (p) {
                                if (
                                    !P(e, function (t, e) {
                                        if (((i = e), !p.has(i) && (g === t || o(g, t, n, r, l)))) return p.push(e);
                                        var i;
                                    })
                                ) {
                                    d = !1;
                                    break;
                                }
                            } else if (g !== m && !o(g, m, n, r, l)) {
                                d = !1;
                                break;
                            }
                        }
                        return l.delete(t), l.delete(e), d;
                    }
                    function Rt(t) {
                        return (function (t, e, n) {
                            var r = e(t);
                            return Ft(t)
                                ? r
                                : (function (t, e) {
                                      for (var n = -1, r = e.length, i = t.length; ++n < r; ) t[i + n] = e[n];
                                      return t;
                                  })(r, n(t));
                        })(t, Xt, It);
                    }
                    function Bt(t, e) {
                        var n,
                            r,
                            i = t.__data__;
                        return (
                            'string' == (r = typeof (n = e)) || 'number' == r || 'symbol' == r || 'boolean' == r
                                ? '__proto__' !== n
                                : null === n
                        )
                            ? i['string' == typeof e ? 'string' : 'hash']
                            : i.map;
                    }
                    function qt(t, e) {
                        var n = (function (t, e) {
                            return null == t ? void 0 : t[e];
                        })(t, e);
                        return (function (t) {
                            return (
                                !(
                                    !Ht(t) ||
                                    (function (t) {
                                        return !!Y && Y in t;
                                    })(t)
                                ) && (Kt(t) ? tt : S).test(Ut(t))
                            );
                        })(n)
                            ? n
                            : void 0;
                    }
                    (_t.prototype.clear = function () {
                        (this.__data__ = gt ? gt(null) : {}), (this.size = 0);
                    }),
                        (_t.prototype.delete = function (t) {
                            var e = this.has(t) && delete this.__data__[t];
                            return (this.size -= e ? 1 : 0), e;
                        }),
                        (_t.prototype.get = function (t) {
                            var e = this.__data__;
                            if (gt) {
                                var n = e[t];
                                return n === r ? void 0 : n;
                            }
                            return J.call(e, t) ? e[t] : void 0;
                        }),
                        (_t.prototype.has = function (t) {
                            var e = this.__data__;
                            return gt ? void 0 !== e[t] : J.call(e, t);
                        }),
                        (_t.prototype.set = function (t, e) {
                            var n = this.__data__;
                            return (this.size += this.has(t) ? 0 : 1), (n[t] = gt && void 0 === e ? r : e), this;
                        }),
                        (xt.prototype.clear = function () {
                            (this.__data__ = []), (this.size = 0);
                        }),
                        (xt.prototype.delete = function (t) {
                            var e = this.__data__,
                                n = St(e, t);
                            return !(n < 0 || (n == e.length - 1 ? e.pop() : st.call(e, n, 1), --this.size, 0));
                        }),
                        (xt.prototype.get = function (t) {
                            var e = this.__data__,
                                n = St(e, t);
                            return n < 0 ? void 0 : e[n][1];
                        }),
                        (xt.prototype.has = function (t) {
                            return St(this.__data__, t) > -1;
                        }),
                        (xt.prototype.set = function (t, e) {
                            var n = this.__data__,
                                r = St(n, t);
                            return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
                        }),
                        (wt.prototype.clear = function () {
                            (this.size = 0),
                                (this.__data__ = { hash: new _t(), map: new (ht || xt)(), string: new _t() });
                        }),
                        (wt.prototype.delete = function (t) {
                            var e = Bt(this, t).delete(t);
                            return (this.size -= e ? 1 : 0), e;
                        }),
                        (wt.prototype.get = function (t) {
                            return Bt(this, t).get(t);
                        }),
                        (wt.prototype.has = function (t) {
                            return Bt(this, t).has(t);
                        }),
                        (wt.prototype.set = function (t, e) {
                            var n = Bt(this, t),
                                r = n.size;
                            return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
                        }),
                        (Ot.prototype.add = Ot.prototype.push =
                            function (t) {
                                return this.__data__.set(t, r), this;
                            }),
                        (Ot.prototype.has = function (t) {
                            return this.__data__.has(t);
                        }),
                        (jt.prototype.clear = function () {
                            (this.__data__ = new xt()), (this.size = 0);
                        }),
                        (jt.prototype.delete = function (t) {
                            var e = this.__data__,
                                n = e.delete(t);
                            return (this.size = e.size), n;
                        }),
                        (jt.prototype.get = function (t) {
                            return this.__data__.get(t);
                        }),
                        (jt.prototype.has = function (t) {
                            return this.__data__.has(t);
                        }),
                        (jt.prototype.set = function (t, e) {
                            var n = this.__data__;
                            if (n instanceof xt) {
                                var r = n.__data__;
                                if (!ht || r.length < 199) return r.push([t, e]), (this.size = ++n.size), this;
                                n = this.__data__ = new wt(r);
                            }
                            return n.set(t, e), (this.size = n.size), this;
                        });
                    var It = lt
                            ? function (t) {
                                  return null == t
                                      ? []
                                      : ((t = Object(t)),
                                        (function (e, n) {
                                            for (var r = -1, i = null == e ? 0 : e.length, s = 0, o = []; ++r < i; ) {
                                                var l = e[r];
                                                (a = l), it.call(t, a) && (o[s++] = l);
                                            }
                                            var a;
                                            return o;
                                        })(lt(t)));
                              }
                            : function () {
                                  return [];
                              },
                        Mt = Lt;
                    function Dt(t, e) {
                        return (
                            !!(e = null == e ? o : e) &&
                            ('number' == typeof t || L.test(t)) &&
                            t > -1 &&
                            t % 1 == 0 &&
                            t < e
                        );
                    }
                    function Ut(t) {
                        if (null != t) {
                            try {
                                return Q.call(t);
                            } catch (t) {}
                            try {
                                return t + '';
                            } catch (t) {}
                        }
                        return '';
                    }
                    function Pt(t, e) {
                        return t === e || (t != t && e != e);
                    }
                    ((ut && Mt(new ut(new ArrayBuffer(1))) != j) ||
                        (ht && Mt(new ht()) != g) ||
                        (ft && Mt(ft.resolve()) != v) ||
                        (dt && Mt(new dt()) != E) ||
                        (pt && Mt(new pt()) != w)) &&
                        (Mt = function (t) {
                            var e = Lt(t),
                                n = e == y ? t.constructor : void 0,
                                r = n ? Ut(n) : '';
                            if (r)
                                switch (r) {
                                    case mt:
                                        return j;
                                    case bt:
                                        return g;
                                    case yt:
                                        return v;
                                    case vt:
                                        return E;
                                    case At:
                                        return w;
                                }
                            return e;
                        });
                    var zt = Tt(
                            (function () {
                                return arguments;
                            })()
                        )
                            ? Tt
                            : function (t) {
                                  return Wt(t) && J.call(t, 'callee') && !it.call(t, 'callee');
                              },
                        Ft = Array.isArray,
                        $t =
                            at ||
                            function () {
                                return !1;
                            };
                    function Kt(t) {
                        if (!Ht(t)) return !1;
                        var e = Lt(t);
                        return e == d || e == p || e == c || e == A;
                    }
                    function Vt(t) {
                        return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= o;
                    }
                    function Ht(t) {
                        var e = typeof t;
                        return null != t && ('object' == e || 'function' == e);
                    }
                    function Wt(t) {
                        return null != t && 'object' == typeof t;
                    }
                    var Gt = U
                        ? (function (t) {
                              return function (e) {
                                  return t(e);
                              };
                          })(U)
                        : function (t) {
                              return Wt(t) && Vt(t.length) && !!T[Lt(t)];
                          };
                    function Xt(t) {
                        return null != (e = t) && Vt(e.length) && !Kt(e)
                            ? (function (t, e) {
                                  var n = Ft(t),
                                      r = !n && zt(t),
                                      i = !n && !r && $t(t),
                                      s = !n && !r && !i && Gt(t),
                                      o = n || r || i || s,
                                      l = o
                                          ? (function (t, e) {
                                                for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
                                                return r;
                                            })(t.length, String)
                                          : [],
                                      a = l.length;
                                  for (var c in t)
                                      (!e && !J.call(t, c)) ||
                                          (o &&
                                              ('length' == c ||
                                                  (i && ('offset' == c || 'parent' == c)) ||
                                                  (s && ('buffer' == c || 'byteLength' == c || 'byteOffset' == c)) ||
                                                  Dt(c, a))) ||
                                          l.push(c);
                                  return l;
                              })(t)
                            : (function (t) {
                                  if (
                                      ((n = (e = t) && e.constructor),
                                      e !== (('function' == typeof n && n.prototype) || G))
                                  )
                                      return ct(t);
                                  var e,
                                      n,
                                      r = [];
                                  for (var i in Object(t)) J.call(t, i) && 'constructor' != i && r.push(i);
                                  return r;
                              })(t);
                        var e;
                    }
                    t.exports = function (t, e) {
                        return kt(t, e);
                    };
                },
                1270: function (t, e, n) {
                    'use strict';
                    Object.defineProperty(e, '__esModule', { value: !0 });
                    const r = n(9629),
                        i = n(4162);
                    var s;
                    !(function (t) {
                        (t.compose = function (t = {}, e = {}, n = !1) {
                            'object' != typeof t && (t = {}), 'object' != typeof e && (e = {});
                            let i = r(e);
                            n || (i = Object.keys(i).reduce((t, e) => (null != i[e] && (t[e] = i[e]), t), {}));
                            for (const n in t) void 0 !== t[n] && void 0 === e[n] && (i[n] = t[n]);
                            return Object.keys(i).length > 0 ? i : void 0;
                        }),
                            (t.diff = function (t = {}, e = {}) {
                                'object' != typeof t && (t = {}), 'object' != typeof e && (e = {});
                                const n = Object.keys(t)
                                    .concat(Object.keys(e))
                                    .reduce((n, r) => (i(t[r], e[r]) || (n[r] = void 0 === e[r] ? null : e[r]), n), {});
                                return Object.keys(n).length > 0 ? n : void 0;
                            }),
                            (t.invert = function (t = {}, e = {}) {
                                t = t || {};
                                const n = Object.keys(e).reduce(
                                    (n, r) => (e[r] !== t[r] && void 0 !== t[r] && (n[r] = e[r]), n),
                                    {}
                                );
                                return Object.keys(t).reduce(
                                    (n, r) => (t[r] !== e[r] && void 0 === e[r] && (n[r] = null), n),
                                    n
                                );
                            }),
                            (t.transform = function (t, e, n = !1) {
                                if ('object' != typeof t) return e;
                                if ('object' != typeof e) return;
                                if (!n) return e;
                                const r = Object.keys(e).reduce((n, r) => (void 0 === t[r] && (n[r] = e[r]), n), {});
                                return Object.keys(r).length > 0 ? r : void 0;
                            });
                    })(s || (s = {})),
                        (e.default = s);
                },
                5232: function (t, e, n) {
                    'use strict';
                    Object.defineProperty(e, '__esModule', { value: !0 }),
                        (e.AttributeMap = e.OpIterator = e.Op = void 0);
                    const r = n(5090),
                        i = n(9629),
                        s = n(4162),
                        o = n(1270);
                    e.AttributeMap = o.default;
                    const l = n(4123);
                    e.Op = l.default;
                    const a = n(7033);
                    e.OpIterator = a.default;
                    const c = String.fromCharCode(0),
                        u = (t, e) => {
                            if ('object' != typeof t || null === t) throw new Error('cannot retain a ' + typeof t);
                            if ('object' != typeof e || null === e) throw new Error('cannot retain a ' + typeof e);
                            const n = Object.keys(t)[0];
                            if (!n || n !== Object.keys(e)[0])
                                throw new Error(`embed types not matched: ${n} != ${Object.keys(e)[0]}`);
                            return [n, t[n], e[n]];
                        };
                    class h {
                        constructor(t) {
                            Array.isArray(t)
                                ? (this.ops = t)
                                : null != t && Array.isArray(t.ops)
                                ? (this.ops = t.ops)
                                : (this.ops = []);
                        }
                        static registerEmbed(t, e) {
                            this.handlers[t] = e;
                        }
                        static unregisterEmbed(t) {
                            delete this.handlers[t];
                        }
                        static getHandler(t) {
                            const e = this.handlers[t];
                            if (!e) throw new Error(`no handlers for embed type "${t}"`);
                            return e;
                        }
                        insert(t, e) {
                            const n = {};
                            return 'string' == typeof t && 0 === t.length
                                ? this
                                : ((n.insert = t),
                                  null != e && 'object' == typeof e && Object.keys(e).length > 0 && (n.attributes = e),
                                  this.push(n));
                        }
                        delete(t) {
                            return t <= 0 ? this : this.push({ delete: t });
                        }
                        retain(t, e) {
                            if ('number' == typeof t && t <= 0) return this;
                            const n = { retain: t };
                            return (
                                null != e && 'object' == typeof e && Object.keys(e).length > 0 && (n.attributes = e),
                                this.push(n)
                            );
                        }
                        push(t) {
                            let e = this.ops.length,
                                n = this.ops[e - 1];
                            if (((t = i(t)), 'object' == typeof n)) {
                                if ('number' == typeof t.delete && 'number' == typeof n.delete)
                                    return (this.ops[e - 1] = { delete: n.delete + t.delete }), this;
                                if (
                                    'number' == typeof n.delete &&
                                    null != t.insert &&
                                    ((e -= 1), (n = this.ops[e - 1]), 'object' != typeof n)
                                )
                                    return this.ops.unshift(t), this;
                                if (s(t.attributes, n.attributes)) {
                                    if ('string' == typeof t.insert && 'string' == typeof n.insert)
                                        return (
                                            (this.ops[e - 1] = { insert: n.insert + t.insert }),
                                            'object' == typeof t.attributes &&
                                                (this.ops[e - 1].attributes = t.attributes),
                                            this
                                        );
                                    if ('number' == typeof t.retain && 'number' == typeof n.retain)
                                        return (
                                            (this.ops[e - 1] = { retain: n.retain + t.retain }),
                                            'object' == typeof t.attributes &&
                                                (this.ops[e - 1].attributes = t.attributes),
                                            this
                                        );
                                }
                            }
                            return e === this.ops.length ? this.ops.push(t) : this.ops.splice(e, 0, t), this;
                        }
                        chop() {
                            const t = this.ops[this.ops.length - 1];
                            return t && 'number' == typeof t.retain && !t.attributes && this.ops.pop(), this;
                        }
                        filter(t) {
                            return this.ops.filter(t);
                        }
                        forEach(t) {
                            this.ops.forEach(t);
                        }
                        map(t) {
                            return this.ops.map(t);
                        }
                        partition(t) {
                            const e = [],
                                n = [];
                            return (
                                this.forEach((r) => {
                                    (t(r) ? e : n).push(r);
                                }),
                                [e, n]
                            );
                        }
                        reduce(t, e) {
                            return this.ops.reduce(t, e);
                        }
                        changeLength() {
                            return this.reduce(
                                (t, e) => (e.insert ? t + l.default.length(e) : e.delete ? t - e.delete : t),
                                0
                            );
                        }
                        length() {
                            return this.reduce((t, e) => t + l.default.length(e), 0);
                        }
                        slice(t = 0, e = 1 / 0) {
                            const n = [],
                                r = new a.default(this.ops);
                            let i = 0;
                            for (; i < e && r.hasNext(); ) {
                                let s;
                                i < t ? (s = r.next(t - i)) : ((s = r.next(e - i)), n.push(s)),
                                    (i += l.default.length(s));
                            }
                            return new h(n);
                        }
                        compose(t) {
                            const e = new a.default(this.ops),
                                n = new a.default(t.ops),
                                r = [],
                                i = n.peek();
                            if (null != i && 'number' == typeof i.retain && null == i.attributes) {
                                let t = i.retain;
                                for (; 'insert' === e.peekType() && e.peekLength() <= t; )
                                    (t -= e.peekLength()), r.push(e.next());
                                i.retain - t > 0 && n.next(i.retain - t);
                            }
                            const l = new h(r);
                            for (; e.hasNext() || n.hasNext(); )
                                if ('insert' === n.peekType()) l.push(n.next());
                                else if ('delete' === e.peekType()) l.push(e.next());
                                else {
                                    const t = Math.min(e.peekLength(), n.peekLength()),
                                        r = e.next(t),
                                        i = n.next(t);
                                    if (i.retain) {
                                        const a = {};
                                        if ('number' == typeof r.retain)
                                            a.retain = 'number' == typeof i.retain ? t : i.retain;
                                        else if ('number' == typeof i.retain)
                                            null == r.retain ? (a.insert = r.insert) : (a.retain = r.retain);
                                        else {
                                            const t = null == r.retain ? 'insert' : 'retain',
                                                [e, n, s] = u(r[t], i.retain),
                                                o = h.getHandler(e);
                                            a[t] = { [e]: o.compose(n, s, 'retain' === t) };
                                        }
                                        const c = o.default.compose(
                                            r.attributes,
                                            i.attributes,
                                            'number' == typeof r.retain
                                        );
                                        if (
                                            (c && (a.attributes = c),
                                            l.push(a),
                                            !n.hasNext() && s(l.ops[l.ops.length - 1], a))
                                        ) {
                                            const t = new h(e.rest());
                                            return l.concat(t).chop();
                                        }
                                    } else
                                        'number' == typeof i.delete &&
                                            ('number' == typeof r.retain ||
                                                ('object' == typeof r.retain && null !== r.retain)) &&
                                            l.push(i);
                                }
                            return l.chop();
                        }
                        concat(t) {
                            const e = new h(this.ops.slice());
                            return t.ops.length > 0 && (e.push(t.ops[0]), (e.ops = e.ops.concat(t.ops.slice(1)))), e;
                        }
                        diff(t, e) {
                            if (this.ops === t.ops) return new h();
                            const n = [this, t].map((e) =>
                                    e
                                        .map((n) => {
                                            if (null != n.insert) return 'string' == typeof n.insert ? n.insert : c;
                                            throw new Error(
                                                'diff() called ' + (e === t ? 'on' : 'with') + ' non-document'
                                            );
                                        })
                                        .join('')
                                ),
                                i = new h(),
                                l = r(n[0], n[1], e, !0),
                                u = new a.default(this.ops),
                                f = new a.default(t.ops);
                            return (
                                l.forEach((t) => {
                                    let e = t[1].length;
                                    for (; e > 0; ) {
                                        let n = 0;
                                        switch (t[0]) {
                                            case r.INSERT:
                                                (n = Math.min(f.peekLength(), e)), i.push(f.next(n));
                                                break;
                                            case r.DELETE:
                                                (n = Math.min(e, u.peekLength())), u.next(n), i.delete(n);
                                                break;
                                            case r.EQUAL:
                                                n = Math.min(u.peekLength(), f.peekLength(), e);
                                                const t = u.next(n),
                                                    l = f.next(n);
                                                s(t.insert, l.insert)
                                                    ? i.retain(n, o.default.diff(t.attributes, l.attributes))
                                                    : i.push(l).delete(n);
                                        }
                                        e -= n;
                                    }
                                }),
                                i.chop()
                            );
                        }
                        eachLine(t, e = '\n') {
                            const n = new a.default(this.ops);
                            let r = new h(),
                                i = 0;
                            for (; n.hasNext(); ) {
                                if ('insert' !== n.peekType()) return;
                                const s = n.peek(),
                                    o = l.default.length(s) - n.peekLength(),
                                    a = 'string' == typeof s.insert ? s.insert.indexOf(e, o) - o : -1;
                                if (a < 0) r.push(n.next());
                                else if (a > 0) r.push(n.next(a));
                                else {
                                    if (!1 === t(r, n.next(1).attributes || {}, i)) return;
                                    (i += 1), (r = new h());
                                }
                            }
                            r.length() > 0 && t(r, {}, i);
                        }
                        invert(t) {
                            const e = new h();
                            return (
                                this.reduce((n, r) => {
                                    if (r.insert) e.delete(l.default.length(r));
                                    else {
                                        if ('number' == typeof r.retain && null == r.attributes)
                                            return e.retain(r.retain), n + r.retain;
                                        if (r.delete || 'number' == typeof r.retain) {
                                            const i = r.delete || r.retain;
                                            return (
                                                t.slice(n, n + i).forEach((t) => {
                                                    r.delete
                                                        ? e.push(t)
                                                        : r.retain &&
                                                          r.attributes &&
                                                          e.retain(
                                                              l.default.length(t),
                                                              o.default.invert(r.attributes, t.attributes)
                                                          );
                                                }),
                                                n + i
                                            );
                                        }
                                        if ('object' == typeof r.retain && null !== r.retain) {
                                            const i = t.slice(n, n + 1),
                                                s = new a.default(i.ops).next(),
                                                [l, c, f] = u(r.retain, s.insert),
                                                d = h.getHandler(l);
                                            return (
                                                e.retain(
                                                    { [l]: d.invert(c, f) },
                                                    o.default.invert(r.attributes, s.attributes)
                                                ),
                                                n + 1
                                            );
                                        }
                                    }
                                    return n;
                                }, 0),
                                e.chop()
                            );
                        }
                        transform(t, e = !1) {
                            if (((e = !!e), 'number' == typeof t)) return this.transformPosition(t, e);
                            const n = t,
                                r = new a.default(this.ops),
                                i = new a.default(n.ops),
                                s = new h();
                            for (; r.hasNext() || i.hasNext(); )
                                if ('insert' !== r.peekType() || (!e && 'insert' === i.peekType()))
                                    if ('insert' === i.peekType()) s.push(i.next());
                                    else {
                                        const t = Math.min(r.peekLength(), i.peekLength()),
                                            n = r.next(t),
                                            l = i.next(t);
                                        if (n.delete) continue;
                                        if (l.delete) s.push(l);
                                        else {
                                            const r = n.retain,
                                                i = l.retain;
                                            let a = 'object' == typeof i && null !== i ? i : t;
                                            if (
                                                'object' == typeof r &&
                                                null !== r &&
                                                'object' == typeof i &&
                                                null !== i
                                            ) {
                                                const t = Object.keys(r)[0];
                                                if (t === Object.keys(i)[0]) {
                                                    const n = h.getHandler(t);
                                                    n && (a = { [t]: n.transform(r[t], i[t], e) });
                                                }
                                            }
                                            s.retain(a, o.default.transform(n.attributes, l.attributes, e));
                                        }
                                    }
                                else s.retain(l.default.length(r.next()));
                            return s.chop();
                        }
                        transformPosition(t, e = !1) {
                            e = !!e;
                            const n = new a.default(this.ops);
                            let r = 0;
                            for (; n.hasNext() && r <= t; ) {
                                const i = n.peekLength(),
                                    s = n.peekType();
                                n.next(),
                                    'delete' !== s
                                        ? ('insert' === s && (r < t || !e) && (t += i), (r += i))
                                        : (t -= Math.min(i, t - r));
                            }
                            return t;
                        }
                    }
                    (h.Op = l.default),
                        (h.OpIterator = a.default),
                        (h.AttributeMap = o.default),
                        (h.handlers = {}),
                        (e.default = h),
                        (t.exports = h),
                        (t.exports.default = h);
                },
                4123: function (t, e) {
                    'use strict';
                    var n;
                    Object.defineProperty(e, '__esModule', { value: !0 }),
                        (function (t) {
                            t.length = function (t) {
                                return 'number' == typeof t.delete
                                    ? t.delete
                                    : 'number' == typeof t.retain
                                    ? t.retain
                                    : 'object' == typeof t.retain && null !== t.retain
                                    ? 1
                                    : 'string' == typeof t.insert
                                    ? t.insert.length
                                    : 1;
                            };
                        })(n || (n = {})),
                        (e.default = n);
                },
                7033: function (t, e, n) {
                    'use strict';
                    Object.defineProperty(e, '__esModule', { value: !0 });
                    const r = n(4123);
                    e.default = class {
                        constructor(t) {
                            (this.ops = t), (this.index = 0), (this.offset = 0);
                        }
                        hasNext() {
                            return this.peekLength() < 1 / 0;
                        }
                        next(t) {
                            t || (t = 1 / 0);
                            const e = this.ops[this.index];
                            if (e) {
                                const n = this.offset,
                                    i = r.default.length(e);
                                if (
                                    (t >= i - n
                                        ? ((t = i - n), (this.index += 1), (this.offset = 0))
                                        : (this.offset += t),
                                    'number' == typeof e.delete)
                                )
                                    return { delete: t };
                                {
                                    const r = {};
                                    return (
                                        e.attributes && (r.attributes = e.attributes),
                                        'number' == typeof e.retain
                                            ? (r.retain = t)
                                            : 'object' == typeof e.retain && null !== e.retain
                                            ? (r.retain = e.retain)
                                            : 'string' == typeof e.insert
                                            ? (r.insert = e.insert.substr(n, t))
                                            : (r.insert = e.insert),
                                        r
                                    );
                                }
                            }
                            return { retain: 1 / 0 };
                        }
                        peek() {
                            return this.ops[this.index];
                        }
                        peekLength() {
                            return this.ops[this.index] ? r.default.length(this.ops[this.index]) - this.offset : 1 / 0;
                        }
                        peekType() {
                            const t = this.ops[this.index];
                            return t
                                ? 'number' == typeof t.delete
                                    ? 'delete'
                                    : 'number' == typeof t.retain || ('object' == typeof t.retain && null !== t.retain)
                                    ? 'retain'
                                    : 'insert'
                                : 'retain';
                        }
                        rest() {
                            if (this.hasNext()) {
                                if (0 === this.offset) return this.ops.slice(this.index);
                                {
                                    const t = this.offset,
                                        e = this.index,
                                        n = this.next(),
                                        r = this.ops.slice(this.index);
                                    return (this.offset = t), (this.index = e), [n].concat(r);
                                }
                            }
                            return [];
                        }
                    };
                },
                8820: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return l;
                        },
                    });
                    var r = n(8138),
                        i = function (t, e) {
                            for (var n = t.length; n--; ) if ((0, r.A)(t[n][0], e)) return n;
                            return -1;
                        },
                        s = Array.prototype.splice;
                    function o(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    (o.prototype.clear = function () {
                        (this.__data__ = []), (this.size = 0);
                    }),
                        (o.prototype.delete = function (t) {
                            var e = this.__data__,
                                n = i(e, t);
                            return !(n < 0 || (n == e.length - 1 ? e.pop() : s.call(e, n, 1), --this.size, 0));
                        }),
                        (o.prototype.get = function (t) {
                            var e = this.__data__,
                                n = i(e, t);
                            return n < 0 ? void 0 : e[n][1];
                        }),
                        (o.prototype.has = function (t) {
                            return i(this.__data__, t) > -1;
                        }),
                        (o.prototype.set = function (t, e) {
                            var n = this.__data__,
                                r = i(n, t);
                            return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this;
                        });
                    var l = o;
                },
                2461: function (t, e, n) {
                    'use strict';
                    var r = n(2281),
                        i = n(5507),
                        s = (0, r.A)(i.A, 'Map');
                    e.A = s;
                },
                3558: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return f;
                        },
                    });
                    var r = (0, n(2281).A)(Object, 'create'),
                        i = Object.prototype.hasOwnProperty,
                        s = Object.prototype.hasOwnProperty;
                    function o(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    (o.prototype.clear = function () {
                        (this.__data__ = r ? r(null) : {}), (this.size = 0);
                    }),
                        (o.prototype.delete = function (t) {
                            var e = this.has(t) && delete this.__data__[t];
                            return (this.size -= e ? 1 : 0), e;
                        }),
                        (o.prototype.get = function (t) {
                            var e = this.__data__;
                            if (r) {
                                var n = e[t];
                                return '__lodash_hash_undefined__' === n ? void 0 : n;
                            }
                            return i.call(e, t) ? e[t] : void 0;
                        }),
                        (o.prototype.has = function (t) {
                            var e = this.__data__;
                            return r ? void 0 !== e[t] : s.call(e, t);
                        }),
                        (o.prototype.set = function (t, e) {
                            var n = this.__data__;
                            return (
                                (this.size += this.has(t) ? 0 : 1),
                                (n[t] = r && void 0 === e ? '__lodash_hash_undefined__' : e),
                                this
                            );
                        });
                    var l = o,
                        a = n(8820),
                        c = n(2461),
                        u = function (t, e) {
                            var n,
                                r,
                                i = t.__data__;
                            return (
                                'string' == (r = typeof (n = e)) || 'number' == r || 'symbol' == r || 'boolean' == r
                                    ? '__proto__' !== n
                                    : null === n
                            )
                                ? i['string' == typeof e ? 'string' : 'hash']
                                : i.map;
                        };
                    function h(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.clear(); ++e < n; ) {
                            var r = t[e];
                            this.set(r[0], r[1]);
                        }
                    }
                    (h.prototype.clear = function () {
                        (this.size = 0), (this.__data__ = { hash: new l(), map: new (c.A || a.A)(), string: new l() });
                    }),
                        (h.prototype.delete = function (t) {
                            var e = u(this, t).delete(t);
                            return (this.size -= e ? 1 : 0), e;
                        }),
                        (h.prototype.get = function (t) {
                            return u(this, t).get(t);
                        }),
                        (h.prototype.has = function (t) {
                            return u(this, t).has(t);
                        }),
                        (h.prototype.set = function (t, e) {
                            var n = u(this, t),
                                r = n.size;
                            return n.set(t, e), (this.size += n.size == r ? 0 : 1), this;
                        });
                    var f = h;
                },
                2673: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return l;
                        },
                    });
                    var r = n(8820),
                        i = n(2461),
                        s = n(3558);
                    function o(t) {
                        var e = (this.__data__ = new r.A(t));
                        this.size = e.size;
                    }
                    (o.prototype.clear = function () {
                        (this.__data__ = new r.A()), (this.size = 0);
                    }),
                        (o.prototype.delete = function (t) {
                            var e = this.__data__,
                                n = e.delete(t);
                            return (this.size = e.size), n;
                        }),
                        (o.prototype.get = function (t) {
                            return this.__data__.get(t);
                        }),
                        (o.prototype.has = function (t) {
                            return this.__data__.has(t);
                        }),
                        (o.prototype.set = function (t, e) {
                            var n = this.__data__;
                            if (n instanceof r.A) {
                                var o = n.__data__;
                                if (!i.A || o.length < 199) return o.push([t, e]), (this.size = ++n.size), this;
                                n = this.__data__ = new s.A(o);
                            }
                            return n.set(t, e), (this.size = n.size), this;
                        });
                    var l = o;
                },
                439: function (t, e, n) {
                    'use strict';
                    var r = n(5507).A.Symbol;
                    e.A = r;
                },
                7218: function (t, e, n) {
                    'use strict';
                    var r = n(5507).A.Uint8Array;
                    e.A = r;
                },
                6753: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return c;
                        },
                    });
                    var r = n(8412),
                        i = n(723),
                        s = n(776),
                        o = n(3767),
                        l = n(5755),
                        a = Object.prototype.hasOwnProperty,
                        c = function (t, e) {
                            var n = (0, i.A)(t),
                                c = !n && (0, r.A)(t),
                                u = !n && !c && (0, s.A)(t),
                                h = !n && !c && !u && (0, l.A)(t),
                                f = n || c || u || h,
                                d = f
                                    ? (function (t, e) {
                                          for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n);
                                          return r;
                                      })(t.length, String)
                                    : [],
                                p = d.length;
                            for (var g in t)
                                (!e && !a.call(t, g)) ||
                                    (f &&
                                        ('length' == g ||
                                            (u && ('offset' == g || 'parent' == g)) ||
                                            (h && ('buffer' == g || 'byteLength' == g || 'byteOffset' == g)) ||
                                            (0, o.A)(g, p))) ||
                                    d.push(g);
                            return d;
                        };
                },
                802: function (t, e) {
                    'use strict';
                    e.A = function (t, e) {
                        for (var n = -1, r = e.length, i = t.length; ++n < r; ) t[i + n] = e[n];
                        return t;
                    };
                },
                6437: function (t, e, n) {
                    'use strict';
                    var r = n(6770),
                        i = n(8138),
                        s = Object.prototype.hasOwnProperty;
                    e.A = function (t, e, n) {
                        var o = t[e];
                        (s.call(t, e) && (0, i.A)(o, n) && (void 0 !== n || e in t)) || (0, r.A)(t, e, n);
                    };
                },
                6770: function (t, e, n) {
                    'use strict';
                    var r = n(7889);
                    e.A = function (t, e, n) {
                        '__proto__' == e && r.A
                            ? (0, r.A)(t, e, { configurable: !0, enumerable: !0, value: n, writable: !0 })
                            : (t[e] = n);
                    };
                },
                1381: function (t, e, n) {
                    'use strict';
                    var r = n(802),
                        i = n(723);
                    e.A = function (t, e, n) {
                        var s = e(t);
                        return (0, i.A)(t) ? s : (0, r.A)(s, n(t));
                    };
                },
                2159: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return u;
                        },
                    });
                    var r = n(439),
                        i = Object.prototype,
                        s = i.hasOwnProperty,
                        o = i.toString,
                        l = r.A ? r.A.toStringTag : void 0,
                        a = Object.prototype.toString,
                        c = r.A ? r.A.toStringTag : void 0,
                        u = function (t) {
                            return null == t
                                ? void 0 === t
                                    ? '[object Undefined]'
                                    : '[object Null]'
                                : c && c in Object(t)
                                ? (function (t) {
                                      var e = s.call(t, l),
                                          n = t[l];
                                      try {
                                          t[l] = void 0;
                                          var r = !0;
                                      } catch (t) {}
                                      var i = o.call(t);
                                      return r && (e ? (t[l] = n) : delete t[l]), i;
                                  })(t)
                                : (function (t) {
                                      return a.call(t);
                                  })(t);
                        };
                },
                5771: function (t, e) {
                    'use strict';
                    e.A = function (t) {
                        return function (e) {
                            return t(e);
                        };
                    };
                },
                2899: function (t, e, n) {
                    'use strict';
                    var r = n(7218);
                    e.A = function (t) {
                        var e = new t.constructor(t.byteLength);
                        return new r.A(e).set(new r.A(t)), e;
                    };
                },
                3812: function (t, e, n) {
                    'use strict';
                    var r = n(5507),
                        i = 'object' == typeof exports && exports && !exports.nodeType && exports,
                        s = i && 'object' == typeof module && module && !module.nodeType && module,
                        o = s && s.exports === i ? r.A.Buffer : void 0,
                        l = o ? o.allocUnsafe : void 0;
                    e.A = function (t, e) {
                        if (e) return t.slice();
                        var n = t.length,
                            r = l ? l(n) : new t.constructor(n);
                        return t.copy(r), r;
                    };
                },
                1827: function (t, e, n) {
                    'use strict';
                    var r = n(2899);
                    e.A = function (t, e) {
                        var n = e ? (0, r.A)(t.buffer) : t.buffer;
                        return new t.constructor(n, t.byteOffset, t.length);
                    };
                },
                4405: function (t, e) {
                    'use strict';
                    e.A = function (t, e) {
                        var n = -1,
                            r = t.length;
                        for (e || (e = Array(r)); ++n < r; ) e[n] = t[n];
                        return e;
                    };
                },
                9601: function (t, e, n) {
                    'use strict';
                    var r = n(6437),
                        i = n(6770);
                    e.A = function (t, e, n, s) {
                        var o = !n;
                        n || (n = {});
                        for (var l = -1, a = e.length; ++l < a; ) {
                            var c = e[l],
                                u = s ? s(n[c], t[c], c, n, t) : void 0;
                            void 0 === u && (u = t[c]), o ? (0, i.A)(n, c, u) : (0, r.A)(n, c, u);
                        }
                        return n;
                    };
                },
                7889: function (t, e, n) {
                    'use strict';
                    var r = n(2281),
                        i = (function () {
                            try {
                                var t = (0, r.A)(Object, 'defineProperty');
                                return t({}, '', {}), t;
                            } catch (t) {}
                        })();
                    e.A = i;
                },
                9646: function (t, e) {
                    'use strict';
                    var n = 'object' == typeof global && global && global.Object === Object && global;
                    e.A = n;
                },
                2816: function (t, e, n) {
                    'use strict';
                    var r = n(1381),
                        i = n(9844),
                        s = n(3169);
                    e.A = function (t) {
                        return (0, r.A)(t, s.A, i.A);
                    };
                },
                2281: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return m;
                        },
                    });
                    var r,
                        i = n(7572),
                        s = n(5507).A['__core-js_shared__'],
                        o = (r = /[^.]+$/.exec((s && s.keys && s.keys.IE_PROTO) || '')) ? 'Symbol(src)_1.' + r : '',
                        l = n(659),
                        a = n(1543),
                        c = /^\[object .+?Constructor\]$/,
                        u = Function.prototype,
                        h = Object.prototype,
                        f = u.toString,
                        d = h.hasOwnProperty,
                        p = RegExp(
                            '^' +
                                f
                                    .call(d)
                                    .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                                    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                                '$'
                        ),
                        g = function (t) {
                            return !(!(0, l.A)(t) || ((e = t), o && o in e)) && ((0, i.A)(t) ? p : c).test((0, a.A)(t));
                            var e;
                        },
                        m = function (t, e) {
                            var n = (function (t, e) {
                                return null == t ? void 0 : t[e];
                            })(t, e);
                            return g(n) ? n : void 0;
                        };
                },
                8769: function (t, e, n) {
                    'use strict';
                    var r = (0, n(2217).A)(Object.getPrototypeOf, Object);
                    e.A = r;
                },
                9844: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return o;
                        },
                    });
                    var r = n(6935),
                        i = Object.prototype.propertyIsEnumerable,
                        s = Object.getOwnPropertySymbols,
                        o = s
                            ? function (t) {
                                  return null == t
                                      ? []
                                      : ((t = Object(t)),
                                        (function (t, e) {
                                            for (var n = -1, r = null == t ? 0 : t.length, i = 0, s = []; ++n < r; ) {
                                                var o = t[n];
                                                e(o, n, t) && (s[i++] = o);
                                            }
                                            return s;
                                        })(s(t), function (e) {
                                            return i.call(t, e);
                                        }));
                              }
                            : r.A;
                },
                7995: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return _;
                        },
                    });
                    var r = n(2281),
                        i = n(5507),
                        s = (0, r.A)(i.A, 'DataView'),
                        o = n(2461),
                        l = (0, r.A)(i.A, 'Promise'),
                        a = (0, r.A)(i.A, 'Set'),
                        c = (0, r.A)(i.A, 'WeakMap'),
                        u = n(2159),
                        h = n(1543),
                        f = '[object Map]',
                        d = '[object Promise]',
                        p = '[object Set]',
                        g = '[object WeakMap]',
                        m = '[object DataView]',
                        b = (0, h.A)(s),
                        y = (0, h.A)(o.A),
                        v = (0, h.A)(l),
                        A = (0, h.A)(a),
                        N = (0, h.A)(c),
                        E = u.A;
                    ((s && E(new s(new ArrayBuffer(1))) != m) ||
                        (o.A && E(new o.A()) != f) ||
                        (l && E(l.resolve()) != d) ||
                        (a && E(new a()) != p) ||
                        (c && E(new c()) != g)) &&
                        (E = function (t) {
                            var e = (0, u.A)(t),
                                n = '[object Object]' == e ? t.constructor : void 0,
                                r = n ? (0, h.A)(n) : '';
                            if (r)
                                switch (r) {
                                    case b:
                                        return m;
                                    case y:
                                        return f;
                                    case v:
                                        return d;
                                    case A:
                                        return p;
                                    case N:
                                        return g;
                                }
                            return e;
                        });
                    var _ = E;
                },
                1683: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return a;
                        },
                    });
                    var r = n(659),
                        i = Object.create,
                        s = (function () {
                            function t() {}
                            return function (e) {
                                if (!(0, r.A)(e)) return {};
                                if (i) return i(e);
                                t.prototype = e;
                                var n = new t();
                                return (t.prototype = void 0), n;
                            };
                        })(),
                        o = n(8769),
                        l = n(501),
                        a = function (t) {
                            return 'function' != typeof t.constructor || (0, l.A)(t) ? {} : s((0, o.A)(t));
                        };
                },
                3767: function (t, e) {
                    'use strict';
                    var n = /^(?:0|[1-9]\d*)$/;
                    e.A = function (t, e) {
                        var r = typeof t;
                        return (
                            !!(e = null == e ? 9007199254740991 : e) &&
                            ('number' == r || ('symbol' != r && n.test(t))) &&
                            t > -1 &&
                            t % 1 == 0 &&
                            t < e
                        );
                    };
                },
                501: function (t, e) {
                    'use strict';
                    var n = Object.prototype;
                    e.A = function (t) {
                        var e = t && t.constructor;
                        return t === (('function' == typeof e && e.prototype) || n);
                    };
                },
                8795: function (t, e, n) {
                    'use strict';
                    var r = n(9646),
                        i = 'object' == typeof exports && exports && !exports.nodeType && exports,
                        s = i && 'object' == typeof module && module && !module.nodeType && module,
                        o = s && s.exports === i && r.A.process,
                        l = (function () {
                            try {
                                return (
                                    (s && s.require && s.require('util').types) || (o && o.binding && o.binding('util'))
                                );
                            } catch (t) {}
                        })();
                    e.A = l;
                },
                2217: function (t, e) {
                    'use strict';
                    e.A = function (t, e) {
                        return function (n) {
                            return t(e(n));
                        };
                    };
                },
                5507: function (t, e, n) {
                    'use strict';
                    var r = n(9646),
                        i = 'object' == typeof self && self && self.Object === Object && self,
                        s = r.A || i || Function('return this')();
                    e.A = s;
                },
                1543: function (t, e) {
                    'use strict';
                    var n = Function.prototype.toString;
                    e.A = function (t) {
                        if (null != t) {
                            try {
                                return n.call(t);
                            } catch (t) {}
                            try {
                                return t + '';
                            } catch (t) {}
                        }
                        return '';
                    };
                },
                3707: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return $;
                        },
                    });
                    var r = n(2673),
                        i = n(6437),
                        s = n(9601),
                        o = n(3169),
                        l = n(2624),
                        a = n(3812),
                        c = n(4405),
                        u = n(9844),
                        h = n(802),
                        f = n(8769),
                        d = n(6935),
                        p = Object.getOwnPropertySymbols
                            ? function (t) {
                                  for (var e = []; t; ) (0, h.A)(e, (0, u.A)(t)), (t = (0, f.A)(t));
                                  return e;
                              }
                            : d.A,
                        g = n(2816),
                        m = n(1381),
                        b = function (t) {
                            return (0, m.A)(t, l.A, p);
                        },
                        y = n(7995),
                        v = Object.prototype.hasOwnProperty,
                        A = n(2899),
                        N = /\w*$/,
                        E = n(439),
                        _ = E.A ? E.A.prototype : void 0,
                        x = _ ? _.valueOf : void 0,
                        w = n(1827),
                        O = function (t, e, n) {
                            var r,
                                i,
                                s,
                                o = t.constructor;
                            switch (e) {
                                case '[object ArrayBuffer]':
                                    return (0, A.A)(t);
                                case '[object Boolean]':
                                case '[object Date]':
                                    return new o(+t);
                                case '[object DataView]':
                                    return (function (t, e) {
                                        var n = e ? (0, A.A)(t.buffer) : t.buffer;
                                        return new t.constructor(n, t.byteOffset, t.byteLength);
                                    })(t, n);
                                case '[object Float32Array]':
                                case '[object Float64Array]':
                                case '[object Int8Array]':
                                case '[object Int16Array]':
                                case '[object Int32Array]':
                                case '[object Uint8Array]':
                                case '[object Uint8ClampedArray]':
                                case '[object Uint16Array]':
                                case '[object Uint32Array]':
                                    return (0, w.A)(t, n);
                                case '[object Map]':
                                case '[object Set]':
                                    return new o();
                                case '[object Number]':
                                case '[object String]':
                                    return new o(t);
                                case '[object RegExp]':
                                    return (
                                        ((s = new (i = t).constructor(i.source, N.exec(i))).lastIndex = i.lastIndex), s
                                    );
                                case '[object Symbol]':
                                    return (r = t), x ? Object(x.call(r)) : {};
                            }
                        },
                        j = n(1683),
                        S = n(723),
                        L = n(776),
                        T = n(7948),
                        k = n(5771),
                        C = n(8795),
                        R = C.A && C.A.isMap,
                        B = R
                            ? (0, k.A)(R)
                            : function (t) {
                                  return (0, T.A)(t) && '[object Map]' == (0, y.A)(t);
                              },
                        q = n(659),
                        I = C.A && C.A.isSet,
                        M = I
                            ? (0, k.A)(I)
                            : function (t) {
                                  return (0, T.A)(t) && '[object Set]' == (0, y.A)(t);
                              },
                        D = '[object Arguments]',
                        U = '[object Function]',
                        P = '[object Object]',
                        z = {};
                    (z[D] =
                        z['[object Array]'] =
                        z['[object ArrayBuffer]'] =
                        z['[object DataView]'] =
                        z['[object Boolean]'] =
                        z['[object Date]'] =
                        z['[object Float32Array]'] =
                        z['[object Float64Array]'] =
                        z['[object Int8Array]'] =
                        z['[object Int16Array]'] =
                        z['[object Int32Array]'] =
                        z['[object Map]'] =
                        z['[object Number]'] =
                        z[P] =
                        z['[object RegExp]'] =
                        z['[object Set]'] =
                        z['[object String]'] =
                        z['[object Symbol]'] =
                        z['[object Uint8Array]'] =
                        z['[object Uint8ClampedArray]'] =
                        z['[object Uint16Array]'] =
                        z['[object Uint32Array]'] =
                            !0),
                        (z['[object Error]'] = z[U] = z['[object WeakMap]'] = !1);
                    var F = function t(e, n, h, f, d, m) {
                            var A,
                                N = 1 & n,
                                E = 2 & n,
                                _ = 4 & n;
                            if ((h && (A = d ? h(e, f, d, m) : h(e)), void 0 !== A)) return A;
                            if (!(0, q.A)(e)) return e;
                            var x = (0, S.A)(e);
                            if (x) {
                                if (
                                    ((A = (function (t) {
                                        var e = t.length,
                                            n = new t.constructor(e);
                                        return (
                                            e &&
                                                'string' == typeof t[0] &&
                                                v.call(t, 'index') &&
                                                ((n.index = t.index), (n.input = t.input)),
                                            n
                                        );
                                    })(e)),
                                    !N)
                                )
                                    return (0, c.A)(e, A);
                            } else {
                                var w = (0, y.A)(e),
                                    T = w == U || '[object GeneratorFunction]' == w;
                                if ((0, L.A)(e)) return (0, a.A)(e, N);
                                if (w == P || w == D || (T && !d)) {
                                    if (((A = E || T ? {} : (0, j.A)(e)), !N))
                                        return E
                                            ? (function (t, e) {
                                                  return (0, s.A)(t, p(t), e);
                                              })(
                                                  e,
                                                  (function (t, e) {
                                                      return t && (0, s.A)(e, (0, l.A)(e), t);
                                                  })(A, e)
                                              )
                                            : (function (t, e) {
                                                  return (0, s.A)(t, (0, u.A)(t), e);
                                              })(
                                                  e,
                                                  (function (t, e) {
                                                      return t && (0, s.A)(e, (0, o.A)(e), t);
                                                  })(A, e)
                                              );
                                } else {
                                    if (!z[w]) return d ? e : {};
                                    A = O(e, w, N);
                                }
                            }
                            m || (m = new r.A());
                            var k = m.get(e);
                            if (k) return k;
                            m.set(e, A),
                                M(e)
                                    ? e.forEach(function (r) {
                                          A.add(t(r, n, h, r, e, m));
                                      })
                                    : B(e) &&
                                      e.forEach(function (r, i) {
                                          A.set(i, t(r, n, h, i, e, m));
                                      });
                            var C = _ ? (E ? b : g.A) : E ? l.A : o.A,
                                R = x ? void 0 : C(e);
                            return (
                                (function (t, e) {
                                    for (var n = -1, r = null == t ? 0 : t.length; ++n < r && !1 !== e(t[n], n, t); );
                                })(R || e, function (r, s) {
                                    R && (r = e[(s = r)]), (0, i.A)(A, s, t(r, n, h, s, e, m));
                                }),
                                A
                            );
                        },
                        $ = function (t) {
                            return F(t, 5);
                        };
                },
                8138: function (t, e) {
                    'use strict';
                    e.A = function (t, e) {
                        return t === e || (t != t && e != e);
                    };
                },
                8412: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return u;
                        },
                    });
                    var r = n(2159),
                        i = n(7948),
                        s = function (t) {
                            return (0, i.A)(t) && '[object Arguments]' == (0, r.A)(t);
                        },
                        o = Object.prototype,
                        l = o.hasOwnProperty,
                        a = o.propertyIsEnumerable,
                        c = s(
                            (function () {
                                return arguments;
                            })()
                        )
                            ? s
                            : function (t) {
                                  return (0, i.A)(t) && l.call(t, 'callee') && !a.call(t, 'callee');
                              },
                        u = c;
                },
                723: function (t, e) {
                    'use strict';
                    var n = Array.isArray;
                    e.A = n;
                },
                3628: function (t, e, n) {
                    'use strict';
                    var r = n(7572),
                        i = n(1628);
                    e.A = function (t) {
                        return null != t && (0, i.A)(t.length) && !(0, r.A)(t);
                    };
                },
                776: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return l;
                        },
                    });
                    var r = n(5507),
                        i = 'object' == typeof exports && exports && !exports.nodeType && exports,
                        s = i && 'object' == typeof module && module && !module.nodeType && module,
                        o = s && s.exports === i ? r.A.Buffer : void 0,
                        l =
                            (o ? o.isBuffer : void 0) ||
                            function () {
                                return !1;
                            };
                },
                5123: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return L;
                        },
                    });
                    var r = n(2673),
                        i = n(3558);
                    function s(t) {
                        var e = -1,
                            n = null == t ? 0 : t.length;
                        for (this.__data__ = new i.A(); ++e < n; ) this.add(t[e]);
                    }
                    (s.prototype.add = s.prototype.push =
                        function (t) {
                            return this.__data__.set(t, '__lodash_hash_undefined__'), this;
                        }),
                        (s.prototype.has = function (t) {
                            return this.__data__.has(t);
                        });
                    var o = s,
                        l = function (t, e) {
                            for (var n = -1, r = null == t ? 0 : t.length; ++n < r; ) if (e(t[n], n, t)) return !0;
                            return !1;
                        },
                        a = function (t, e, n, r, i, s) {
                            var a = 1 & n,
                                c = t.length,
                                u = e.length;
                            if (c != u && !(a && u > c)) return !1;
                            var h = s.get(t),
                                f = s.get(e);
                            if (h && f) return h == e && f == t;
                            var d = -1,
                                p = !0,
                                g = 2 & n ? new o() : void 0;
                            for (s.set(t, e), s.set(e, t); ++d < c; ) {
                                var m = t[d],
                                    b = e[d];
                                if (r) var y = a ? r(b, m, d, e, t, s) : r(m, b, d, t, e, s);
                                if (void 0 !== y) {
                                    if (y) continue;
                                    p = !1;
                                    break;
                                }
                                if (g) {
                                    if (
                                        !l(e, function (t, e) {
                                            if (((o = e), !g.has(o) && (m === t || i(m, t, n, r, s)))) return g.push(e);
                                            var o;
                                        })
                                    ) {
                                        p = !1;
                                        break;
                                    }
                                } else if (m !== b && !i(m, b, n, r, s)) {
                                    p = !1;
                                    break;
                                }
                            }
                            return s.delete(t), s.delete(e), p;
                        },
                        c = n(439),
                        u = n(7218),
                        h = n(8138),
                        f = function (t) {
                            var e = -1,
                                n = Array(t.size);
                            return (
                                t.forEach(function (t, r) {
                                    n[++e] = [r, t];
                                }),
                                n
                            );
                        },
                        d = function (t) {
                            var e = -1,
                                n = Array(t.size);
                            return (
                                t.forEach(function (t) {
                                    n[++e] = t;
                                }),
                                n
                            );
                        },
                        p = c.A ? c.A.prototype : void 0,
                        g = p ? p.valueOf : void 0,
                        m = n(2816),
                        b = Object.prototype.hasOwnProperty,
                        y = n(7995),
                        v = n(723),
                        A = n(776),
                        N = n(5755),
                        E = '[object Arguments]',
                        _ = '[object Array]',
                        x = '[object Object]',
                        w = Object.prototype.hasOwnProperty,
                        O = function (t, e, n, i, s, o) {
                            var l = (0, v.A)(t),
                                c = (0, v.A)(e),
                                p = l ? _ : (0, y.A)(t),
                                O = c ? _ : (0, y.A)(e),
                                j = (p = p == E ? x : p) == x,
                                S = (O = O == E ? x : O) == x,
                                L = p == O;
                            if (L && (0, A.A)(t)) {
                                if (!(0, A.A)(e)) return !1;
                                (l = !0), (j = !1);
                            }
                            if (L && !j)
                                return (
                                    o || (o = new r.A()),
                                    l || (0, N.A)(t)
                                        ? a(t, e, n, i, s, o)
                                        : (function (t, e, n, r, i, s, o) {
                                              switch (n) {
                                                  case '[object DataView]':
                                                      if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset)
                                                          return !1;
                                                      (t = t.buffer), (e = e.buffer);
                                                  case '[object ArrayBuffer]':
                                                      return !(
                                                          t.byteLength != e.byteLength || !s(new u.A(t), new u.A(e))
                                                      );
                                                  case '[object Boolean]':
                                                  case '[object Date]':
                                                  case '[object Number]':
                                                      return (0, h.A)(+t, +e);
                                                  case '[object Error]':
                                                      return t.name == e.name && t.message == e.message;
                                                  case '[object RegExp]':
                                                  case '[object String]':
                                                      return t == e + '';
                                                  case '[object Map]':
                                                      var l = f;
                                                  case '[object Set]':
                                                      var c = 1 & r;
                                                      if ((l || (l = d), t.size != e.size && !c)) return !1;
                                                      var p = o.get(t);
                                                      if (p) return p == e;
                                                      (r |= 2), o.set(t, e);
                                                      var m = a(l(t), l(e), r, i, s, o);
                                                      return o.delete(t), m;
                                                  case '[object Symbol]':
                                                      if (g) return g.call(t) == g.call(e);
                                              }
                                              return !1;
                                          })(t, e, p, n, i, s, o)
                                );
                            if (!(1 & n)) {
                                var T = j && w.call(t, '__wrapped__'),
                                    k = S && w.call(e, '__wrapped__');
                                if (T || k) {
                                    var C = T ? t.value() : t,
                                        R = k ? e.value() : e;
                                    return o || (o = new r.A()), s(C, R, n, i, o);
                                }
                            }
                            return (
                                !!L &&
                                (o || (o = new r.A()),
                                (function (t, e, n, r, i, s) {
                                    var o = 1 & n,
                                        l = (0, m.A)(t),
                                        a = l.length;
                                    if (a != (0, m.A)(e).length && !o) return !1;
                                    for (var c = a; c--; ) {
                                        var u = l[c];
                                        if (!(o ? u in e : b.call(e, u))) return !1;
                                    }
                                    var h = s.get(t),
                                        f = s.get(e);
                                    if (h && f) return h == e && f == t;
                                    var d = !0;
                                    s.set(t, e), s.set(e, t);
                                    for (var p = o; ++c < a; ) {
                                        var g = t[(u = l[c])],
                                            y = e[u];
                                        if (r) var v = o ? r(y, g, u, e, t, s) : r(g, y, u, t, e, s);
                                        if (!(void 0 === v ? g === y || i(g, y, n, r, s) : v)) {
                                            d = !1;
                                            break;
                                        }
                                        p || (p = 'constructor' == u);
                                    }
                                    if (d && !p) {
                                        var A = t.constructor,
                                            N = e.constructor;
                                        A == N ||
                                            !('constructor' in t) ||
                                            !('constructor' in e) ||
                                            ('function' == typeof A &&
                                                A instanceof A &&
                                                'function' == typeof N &&
                                                N instanceof N) ||
                                            (d = !1);
                                    }
                                    return s.delete(t), s.delete(e), d;
                                })(t, e, n, i, s, o))
                            );
                        },
                        j = n(7948),
                        S = function t(e, n, r, i, s) {
                            return (
                                e === n ||
                                (null == e || null == n || (!(0, j.A)(e) && !(0, j.A)(n))
                                    ? e != e && n != n
                                    : O(e, n, r, i, t, s))
                            );
                        },
                        L = function (t, e) {
                            return S(t, e);
                        };
                },
                7572: function (t, e, n) {
                    'use strict';
                    var r = n(2159),
                        i = n(659);
                    e.A = function (t) {
                        if (!(0, i.A)(t)) return !1;
                        var e = (0, r.A)(t);
                        return (
                            '[object Function]' == e ||
                            '[object GeneratorFunction]' == e ||
                            '[object AsyncFunction]' == e ||
                            '[object Proxy]' == e
                        );
                    };
                },
                1628: function (t, e) {
                    'use strict';
                    e.A = function (t) {
                        return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= 9007199254740991;
                    };
                },
                659: function (t, e) {
                    'use strict';
                    e.A = function (t) {
                        var e = typeof t;
                        return null != t && ('object' == e || 'function' == e);
                    };
                },
                7948: function (t, e) {
                    'use strict';
                    e.A = function (t) {
                        return null != t && 'object' == typeof t;
                    };
                },
                5755: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return u;
                        },
                    });
                    var r = n(2159),
                        i = n(1628),
                        s = n(7948),
                        o = {};
                    (o['[object Float32Array]'] =
                        o['[object Float64Array]'] =
                        o['[object Int8Array]'] =
                        o['[object Int16Array]'] =
                        o['[object Int32Array]'] =
                        o['[object Uint8Array]'] =
                        o['[object Uint8ClampedArray]'] =
                        o['[object Uint16Array]'] =
                        o['[object Uint32Array]'] =
                            !0),
                        (o['[object Arguments]'] =
                            o['[object Array]'] =
                            o['[object ArrayBuffer]'] =
                            o['[object Boolean]'] =
                            o['[object DataView]'] =
                            o['[object Date]'] =
                            o['[object Error]'] =
                            o['[object Function]'] =
                            o['[object Map]'] =
                            o['[object Number]'] =
                            o['[object Object]'] =
                            o['[object RegExp]'] =
                            o['[object Set]'] =
                            o['[object String]'] =
                            o['[object WeakMap]'] =
                                !1);
                    var l = n(5771),
                        a = n(8795),
                        c = a.A && a.A.isTypedArray,
                        u = c
                            ? (0, l.A)(c)
                            : function (t) {
                                  return (0, s.A)(t) && (0, i.A)(t.length) && !!o[(0, r.A)(t)];
                              };
                },
                3169: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return a;
                        },
                    });
                    var r = n(6753),
                        i = n(501),
                        s = (0, n(2217).A)(Object.keys, Object),
                        o = Object.prototype.hasOwnProperty,
                        l = n(3628),
                        a = function (t) {
                            return (0, l.A)(t)
                                ? (0, r.A)(t)
                                : (function (t) {
                                      if (!(0, i.A)(t)) return s(t);
                                      var e = [];
                                      for (var n in Object(t)) o.call(t, n) && 'constructor' != n && e.push(n);
                                      return e;
                                  })(t);
                        };
                },
                2624: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return c;
                        },
                    });
                    var r = n(6753),
                        i = n(659),
                        s = n(501),
                        o = Object.prototype.hasOwnProperty,
                        l = function (t) {
                            if (!(0, i.A)(t))
                                return (function (t) {
                                    var e = [];
                                    if (null != t) for (var n in Object(t)) e.push(n);
                                    return e;
                                })(t);
                            var e = (0, s.A)(t),
                                n = [];
                            for (var r in t) ('constructor' != r || (!e && o.call(t, r))) && n.push(r);
                            return n;
                        },
                        a = n(3628),
                        c = function (t) {
                            return (0, a.A)(t) ? (0, r.A)(t, !0) : l(t);
                        };
                },
                8347: function (t, e, n) {
                    'use strict';
                    n.d(e, {
                        A: function () {
                            return K;
                        },
                    });
                    var r,
                        i,
                        s,
                        o,
                        l = n(2673),
                        a = n(6770),
                        c = n(8138),
                        u = function (t, e, n) {
                            ((void 0 !== n && !(0, c.A)(t[e], n)) || (void 0 === n && !(e in t))) && (0, a.A)(t, e, n);
                        },
                        h = function (t, e, n) {
                            for (var r = -1, i = Object(t), s = n(t), o = s.length; o--; ) {
                                var l = s[++r];
                                if (!1 === e(i[l], l, i)) break;
                            }
                            return t;
                        },
                        f = n(3812),
                        d = n(1827),
                        p = n(4405),
                        g = n(1683),
                        m = n(8412),
                        b = n(723),
                        y = n(3628),
                        v = n(7948),
                        A = n(776),
                        N = n(7572),
                        E = n(659),
                        _ = n(2159),
                        x = n(8769),
                        w = Function.prototype,
                        O = Object.prototype,
                        j = w.toString,
                        S = O.hasOwnProperty,
                        L = j.call(Object),
                        T = n(5755),
                        k = function (t, e) {
                            if (('constructor' !== e || 'function' != typeof t[e]) && '__proto__' != e) return t[e];
                        },
                        C = n(9601),
                        R = n(2624),
                        B = function (t, e, n, r, i, s, o) {
                            var l,
                                a = k(t, n),
                                c = k(e, n),
                                h = o.get(c);
                            if (h) u(t, n, h);
                            else {
                                var w = s ? s(a, c, n + '', t, e, o) : void 0,
                                    O = void 0 === w;
                                if (O) {
                                    var B = (0, b.A)(c),
                                        q = !B && (0, A.A)(c),
                                        I = !B && !q && (0, T.A)(c);
                                    (w = c),
                                        B || q || I
                                            ? (0, b.A)(a)
                                                ? (w = a)
                                                : ((l = a),
                                                  (0, v.A)(l) && (0, y.A)(l)
                                                      ? (w = (0, p.A)(a))
                                                      : q
                                                      ? ((O = !1), (w = (0, f.A)(c, !0)))
                                                      : I
                                                      ? ((O = !1), (w = (0, d.A)(c, !0)))
                                                      : (w = []))
                                            : (function (t) {
                                                  if (!(0, v.A)(t) || '[object Object]' != (0, _.A)(t)) return !1;
                                                  var e = (0, x.A)(t);
                                                  if (null === e) return !0;
                                                  var n = S.call(e, 'constructor') && e.constructor;
                                                  return 'function' == typeof n && n instanceof n && j.call(n) == L;
                                              })(c) || (0, m.A)(c)
                                            ? ((w = a),
                                              (0, m.A)(a)
                                                  ? (w = (function (t) {
                                                        return (0, C.A)(t, (0, R.A)(t));
                                                    })(a))
                                                  : ((0, E.A)(a) && !(0, N.A)(a)) || (w = (0, g.A)(c)))
                                            : (O = !1);
                                }
                                O && (o.set(c, w), i(w, c, r, s, o), o.delete(c)), u(t, n, w);
                            }
                        },
                        q = function t(e, n, r, i, s) {
                            e !== n &&
                                h(
                                    n,
                                    function (o, a) {
                                        if ((s || (s = new l.A()), (0, E.A)(o))) B(e, n, a, r, t, i, s);
                                        else {
                                            var c = i ? i(k(e, a), o, a + '', e, n, s) : void 0;
                                            void 0 === c && (c = o), u(e, a, c);
                                        }
                                    },
                                    R.A
                                );
                        },
                        I = function (t) {
                            return t;
                        },
                        M = Math.max,
                        D = n(7889),
                        U = D.A
                            ? function (t, e) {
                                  return (0, D.A)(t, 'toString', {
                                      configurable: !0,
                                      enumerable: !1,
                                      value:
                                          ((n = e),
                                          function () {
                                              return n;
                                          }),
                                      writable: !0,
                                  });
                                  var n;
                              }
                            : I,
                        P = Date.now,
                        z =
                            ((r = U),
                            (i = 0),
                            (s = 0),
                            function () {
                                var t = P(),
                                    e = 16 - (t - s);
                                if (((s = t), e > 0)) {
                                    if (++i >= 800) return arguments[0];
                                } else i = 0;
                                return r.apply(void 0, arguments);
                            }),
                        F = function (t, e) {
                            return z(
                                (function (t, e, n) {
                                    return (
                                        (e = M(void 0 === e ? t.length - 1 : e, 0)),
                                        function () {
                                            for (
                                                var r = arguments, i = -1, s = M(r.length - e, 0), o = Array(s);
                                                ++i < s;

                                            )
                                                o[i] = r[e + i];
                                            i = -1;
                                            for (var l = Array(e + 1); ++i < e; ) l[i] = r[i];
                                            return (
                                                (l[e] = n(o)),
                                                (function (t, e, n) {
                                                    switch (n.length) {
                                                        case 0:
                                                            return t.call(e);
                                                        case 1:
                                                            return t.call(e, n[0]);
                                                        case 2:
                                                            return t.call(e, n[0], n[1]);
                                                        case 3:
                                                            return t.call(e, n[0], n[1], n[2]);
                                                    }
                                                    return t.apply(e, n);
                                                })(t, this, l)
                                            );
                                        }
                                    );
                                })(t, e, I),
                                t + ''
                            );
                        },
                        $ = n(3767),
                        K =
                            ((o = function (t, e, n) {
                                q(t, e, n);
                            }),
                            F(function (t, e) {
                                var n = -1,
                                    r = e.length,
                                    i = r > 1 ? e[r - 1] : void 0,
                                    s = r > 2 ? e[2] : void 0;
                                for (
                                    i = o.length > 3 && 'function' == typeof i ? (r--, i) : void 0,
                                        s &&
                                            (function (t, e, n) {
                                                if (!(0, E.A)(n)) return !1;
                                                var r = typeof e;
                                                return (
                                                    !!('number' == r
                                                        ? (0, y.A)(n) && (0, $.A)(e, n.length)
                                                        : 'string' == r && (e in n)) && (0, c.A)(n[e], t)
                                                );
                                            })(e[0], e[1], s) &&
                                            ((i = r < 3 ? void 0 : i), (r = 1)),
                                        t = Object(t);
                                    ++n < r;

                                ) {
                                    var l = e[n];
                                    l && o(t, l, n);
                                }
                                return t;
                            }));
                },
                6935: function (t, e) {
                    'use strict';
                    e.A = function () {
                        return [];
                    };
                },
                6003: function (t, e, n) {
                    'use strict';
                    n.r(e),
                        n.d(e, {
                            Attributor: function () {
                                return i;
                            },
                            AttributorStore: function () {
                                return f;
                            },
                            BlockBlot: function () {
                                return x;
                            },
                            ClassAttributor: function () {
                                return c;
                            },
                            ContainerBlot: function () {
                                return O;
                            },
                            EmbedBlot: function () {
                                return j;
                            },
                            InlineBlot: function () {
                                return E;
                            },
                            LeafBlot: function () {
                                return m;
                            },
                            ParentBlot: function () {
                                return A;
                            },
                            Registry: function () {
                                return l;
                            },
                            Scope: function () {
                                return r;
                            },
                            ScrollBlot: function () {
                                return T;
                            },
                            StyleAttributor: function () {
                                return h;
                            },
                            TextBlot: function () {
                                return C;
                            },
                        });
                    var r = ((t) => (
                        (t[(t.TYPE = 3)] = 'TYPE'),
                        (t[(t.LEVEL = 12)] = 'LEVEL'),
                        (t[(t.ATTRIBUTE = 13)] = 'ATTRIBUTE'),
                        (t[(t.BLOT = 14)] = 'BLOT'),
                        (t[(t.INLINE = 7)] = 'INLINE'),
                        (t[(t.BLOCK = 11)] = 'BLOCK'),
                        (t[(t.BLOCK_BLOT = 10)] = 'BLOCK_BLOT'),
                        (t[(t.INLINE_BLOT = 6)] = 'INLINE_BLOT'),
                        (t[(t.BLOCK_ATTRIBUTE = 9)] = 'BLOCK_ATTRIBUTE'),
                        (t[(t.INLINE_ATTRIBUTE = 5)] = 'INLINE_ATTRIBUTE'),
                        (t[(t.ANY = 15)] = 'ANY'),
                        t
                    ))(r || {});
                    class i {
                        constructor(t, e, n = {}) {
                            (this.attrName = t), (this.keyName = e);
                            const i = r.TYPE & r.ATTRIBUTE;
                            (this.scope = null != n.scope ? (n.scope & r.LEVEL) | i : r.ATTRIBUTE),
                                null != n.whitelist && (this.whitelist = n.whitelist);
                        }
                        static keys(t) {
                            return Array.from(t.attributes).map((t) => t.name);
                        }
                        add(t, e) {
                            return !!this.canAdd(t, e) && (t.setAttribute(this.keyName, e), !0);
                        }
                        canAdd(t, e) {
                            return (
                                null == this.whitelist ||
                                ('string' == typeof e
                                    ? this.whitelist.indexOf(e.replace(/["']/g, '')) > -1
                                    : this.whitelist.indexOf(e) > -1)
                            );
                        }
                        remove(t) {
                            t.removeAttribute(this.keyName);
                        }
                        value(t) {
                            const e = t.getAttribute(this.keyName);
                            return this.canAdd(t, e) && e ? e : '';
                        }
                    }
                    class s extends Error {
                        constructor(t) {
                            super((t = '[Parchment] ' + t)), (this.message = t), (this.name = this.constructor.name);
                        }
                    }
                    const o = class t {
                        constructor() {
                            (this.attributes = {}), (this.classes = {}), (this.tags = {}), (this.types = {});
                        }
                        static find(t, e = !1) {
                            if (null == t) return null;
                            if (this.blots.has(t)) return this.blots.get(t) || null;
                            if (e) {
                                let n = null;
                                try {
                                    n = t.parentNode;
                                } catch {
                                    return null;
                                }
                                return this.find(n, e);
                            }
                            return null;
                        }
                        create(e, n, r) {
                            const i = this.query(n);
                            if (null == i) throw new s(`Unable to create ${n} blot`);
                            const o = i,
                                l = n instanceof Node || n.nodeType === Node.TEXT_NODE ? n : o.create(r),
                                a = new o(e, l, r);
                            return t.blots.set(a.domNode, a), a;
                        }
                        find(e, n = !1) {
                            return t.find(e, n);
                        }
                        query(t, e = r.ANY) {
                            let n;
                            return (
                                'string' == typeof t
                                    ? (n = this.types[t] || this.attributes[t])
                                    : t instanceof Text || t.nodeType === Node.TEXT_NODE
                                    ? (n = this.types.text)
                                    : 'number' == typeof t
                                    ? t & r.LEVEL & r.BLOCK
                                        ? (n = this.types.block)
                                        : t & r.LEVEL & r.INLINE && (n = this.types.inline)
                                    : t instanceof Element &&
                                      ((t.getAttribute('class') || '')
                                          .split(/\s+/)
                                          .some((t) => ((n = this.classes[t]), !!n)),
                                      (n = n || this.tags[t.tagName])),
                                null == n
                                    ? null
                                    : 'scope' in n && e & r.LEVEL & n.scope && e & r.TYPE & n.scope
                                    ? n
                                    : null
                            );
                        }
                        register(...t) {
                            return t.map((t) => {
                                const e = 'blotName' in t,
                                    n = 'attrName' in t;
                                if (!e && !n) throw new s('Invalid definition');
                                if (e && 'abstract' === t.blotName) throw new s('Cannot register abstract class');
                                const r = e ? t.blotName : n ? t.attrName : void 0;
                                return (
                                    (this.types[r] = t),
                                    n
                                        ? 'string' == typeof t.keyName && (this.attributes[t.keyName] = t)
                                        : e &&
                                          (t.className && (this.classes[t.className] = t),
                                          t.tagName &&
                                              (Array.isArray(t.tagName)
                                                  ? (t.tagName = t.tagName.map((t) => t.toUpperCase()))
                                                  : (t.tagName = t.tagName.toUpperCase()),
                                              (Array.isArray(t.tagName) ? t.tagName : [t.tagName]).forEach((e) => {
                                                  (null == this.tags[e] || null == t.className) && (this.tags[e] = t);
                                              }))),
                                    t
                                );
                            });
                        }
                    };
                    o.blots = new WeakMap();
                    let l = o;
                    function a(t, e) {
                        return (t.getAttribute('class') || '').split(/\s+/).filter((t) => 0 === t.indexOf(`${e}-`));
                    }
                    const c = class extends i {
                        static keys(t) {
                            return (t.getAttribute('class') || '')
                                .split(/\s+/)
                                .map((t) => t.split('-').slice(0, -1).join('-'));
                        }
                        add(t, e) {
                            return !!this.canAdd(t, e) && (this.remove(t), t.classList.add(`${this.keyName}-${e}`), !0);
                        }
                        remove(t) {
                            a(t, this.keyName).forEach((e) => {
                                t.classList.remove(e);
                            }),
                                0 === t.classList.length && t.removeAttribute('class');
                        }
                        value(t) {
                            const e = (a(t, this.keyName)[0] || '').slice(this.keyName.length + 1);
                            return this.canAdd(t, e) ? e : '';
                        }
                    };
                    function u(t) {
                        const e = t.split('-'),
                            n = e
                                .slice(1)
                                .map((t) => t[0].toUpperCase() + t.slice(1))
                                .join('');
                        return e[0] + n;
                    }
                    const h = class extends i {
                            static keys(t) {
                                return (t.getAttribute('style') || '').split(';').map((t) => t.split(':')[0].trim());
                            }
                            add(t, e) {
                                return !!this.canAdd(t, e) && ((t.style[u(this.keyName)] = e), !0);
                            }
                            remove(t) {
                                (t.style[u(this.keyName)] = ''), t.getAttribute('style') || t.removeAttribute('style');
                            }
                            value(t) {
                                const e = t.style[u(this.keyName)];
                                return this.canAdd(t, e) ? e : '';
                            }
                        },
                        f = class {
                            constructor(t) {
                                (this.attributes = {}), (this.domNode = t), this.build();
                            }
                            attribute(t, e) {
                                e
                                    ? t.add(this.domNode, e) &&
                                      (null != t.value(this.domNode)
                                          ? (this.attributes[t.attrName] = t)
                                          : delete this.attributes[t.attrName])
                                    : (t.remove(this.domNode), delete this.attributes[t.attrName]);
                            }
                            build() {
                                this.attributes = {};
                                const t = l.find(this.domNode);
                                if (null == t) return;
                                const e = i.keys(this.domNode),
                                    n = c.keys(this.domNode),
                                    s = h.keys(this.domNode);
                                e.concat(n)
                                    .concat(s)
                                    .forEach((e) => {
                                        const n = t.scroll.query(e, r.ATTRIBUTE);
                                        n instanceof i && (this.attributes[n.attrName] = n);
                                    });
                            }
                            copy(t) {
                                Object.keys(this.attributes).forEach((e) => {
                                    const n = this.attributes[e].value(this.domNode);
                                    t.format(e, n);
                                });
                            }
                            move(t) {
                                this.copy(t),
                                    Object.keys(this.attributes).forEach((t) => {
                                        this.attributes[t].remove(this.domNode);
                                    }),
                                    (this.attributes = {});
                            }
                            values() {
                                return Object.keys(this.attributes).reduce(
                                    (t, e) => ((t[e] = this.attributes[e].value(this.domNode)), t),
                                    {}
                                );
                            }
                        },
                        d = class {
                            constructor(t, e) {
                                (this.scroll = t),
                                    (this.domNode = e),
                                    l.blots.set(e, this),
                                    (this.prev = null),
                                    (this.next = null);
                            }
                            static create(t) {
                                if (null == this.tagName) throw new s('Blot definition missing tagName');
                                let e, n;
                                return (
                                    Array.isArray(this.tagName)
                                        ? ('string' == typeof t
                                              ? ((n = t.toUpperCase()),
                                                parseInt(n, 10).toString() === n && (n = parseInt(n, 10)))
                                              : 'number' == typeof t && (n = t),
                                          (e =
                                              'number' == typeof n
                                                  ? document.createElement(this.tagName[n - 1])
                                                  : n && this.tagName.indexOf(n) > -1
                                                  ? document.createElement(n)
                                                  : document.createElement(this.tagName[0])))
                                        : (e = document.createElement(this.tagName)),
                                    this.className && e.classList.add(this.className),
                                    e
                                );
                            }
                            get statics() {
                                return this.constructor;
                            }
                            attach() {}
                            clone() {
                                const t = this.domNode.cloneNode(!1);
                                return this.scroll.create(t);
                            }
                            detach() {
                                null != this.parent && this.parent.removeChild(this), l.blots.delete(this.domNode);
                            }
                            deleteAt(t, e) {
                                this.isolate(t, e).remove();
                            }
                            formatAt(t, e, n, i) {
                                const s = this.isolate(t, e);
                                if (null != this.scroll.query(n, r.BLOT) && i) s.wrap(n, i);
                                else if (null != this.scroll.query(n, r.ATTRIBUTE)) {
                                    const t = this.scroll.create(this.statics.scope);
                                    s.wrap(t), t.format(n, i);
                                }
                            }
                            insertAt(t, e, n) {
                                const r = null == n ? this.scroll.create('text', e) : this.scroll.create(e, n),
                                    i = this.split(t);
                                this.parent.insertBefore(r, i || void 0);
                            }
                            isolate(t, e) {
                                const n = this.split(t);
                                if (null == n) throw new Error('Attempt to isolate at end');
                                return n.split(e), n;
                            }
                            length() {
                                return 1;
                            }
                            offset(t = this.parent) {
                                return null == this.parent || this === t
                                    ? 0
                                    : this.parent.children.offset(this) + this.parent.offset(t);
                            }
                            optimize(t) {
                                this.statics.requiredContainer &&
                                    !(this.parent instanceof this.statics.requiredContainer) &&
                                    this.wrap(this.statics.requiredContainer.blotName);
                            }
                            remove() {
                                null != this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode),
                                    this.detach();
                            }
                            replaceWith(t, e) {
                                const n = 'string' == typeof t ? this.scroll.create(t, e) : t;
                                return (
                                    null != this.parent &&
                                        (this.parent.insertBefore(n, this.next || void 0), this.remove()),
                                    n
                                );
                            }
                            split(t, e) {
                                return 0 === t ? this : this.next;
                            }
                            update(t, e) {}
                            wrap(t, e) {
                                const n = 'string' == typeof t ? this.scroll.create(t, e) : t;
                                if (
                                    (null != this.parent && this.parent.insertBefore(n, this.next || void 0),
                                    'function' != typeof n.appendChild)
                                )
                                    throw new s(`Cannot wrap ${t}`);
                                return n.appendChild(this), n;
                            }
                        };
                    d.blotName = 'abstract';
                    let p = d;
                    const g = class extends p {
                        static value(t) {
                            return !0;
                        }
                        index(t, e) {
                            return this.domNode === t ||
                                this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY
                                ? Math.min(e, 1)
                                : -1;
                        }
                        position(t, e) {
                            let n = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
                            return t > 0 && (n += 1), [this.parent.domNode, n];
                        }
                        value() {
                            return { [this.statics.blotName]: this.statics.value(this.domNode) || !0 };
                        }
                    };
                    g.scope = r.INLINE_BLOT;
                    const m = g;
                    class b {
                        constructor() {
                            (this.head = null), (this.tail = null), (this.length = 0);
                        }
                        append(...t) {
                            if ((this.insertBefore(t[0], null), t.length > 1)) {
                                const e = t.slice(1);
                                this.append(...e);
                            }
                        }
                        at(t) {
                            const e = this.iterator();
                            let n = e();
                            for (; n && t > 0; ) (t -= 1), (n = e());
                            return n;
                        }
                        contains(t) {
                            const e = this.iterator();
                            let n = e();
                            for (; n; ) {
                                if (n === t) return !0;
                                n = e();
                            }
                            return !1;
                        }
                        indexOf(t) {
                            const e = this.iterator();
                            let n = e(),
                                r = 0;
                            for (; n; ) {
                                if (n === t) return r;
                                (r += 1), (n = e());
                            }
                            return -1;
                        }
                        insertBefore(t, e) {
                            null != t &&
                                (this.remove(t),
                                (t.next = e),
                                null != e
                                    ? ((t.prev = e.prev),
                                      null != e.prev && (e.prev.next = t),
                                      (e.prev = t),
                                      e === this.head && (this.head = t))
                                    : null != this.tail
                                    ? ((this.tail.next = t), (t.prev = this.tail), (this.tail = t))
                                    : ((t.prev = null), (this.head = this.tail = t)),
                                (this.length += 1));
                        }
                        offset(t) {
                            let e = 0,
                                n = this.head;
                            for (; null != n; ) {
                                if (n === t) return e;
                                (e += n.length()), (n = n.next);
                            }
                            return -1;
                        }
                        remove(t) {
                            this.contains(t) &&
                                (null != t.prev && (t.prev.next = t.next),
                                null != t.next && (t.next.prev = t.prev),
                                t === this.head && (this.head = t.next),
                                t === this.tail && (this.tail = t.prev),
                                (this.length -= 1));
                        }
                        iterator(t = this.head) {
                            return () => {
                                const e = t;
                                return null != t && (t = t.next), e;
                            };
                        }
                        find(t, e = !1) {
                            const n = this.iterator();
                            let r = n();
                            for (; r; ) {
                                const i = r.length();
                                if (t < i || (e && t === i && (null == r.next || 0 !== r.next.length()))) return [r, t];
                                (t -= i), (r = n());
                            }
                            return [null, 0];
                        }
                        forEach(t) {
                            const e = this.iterator();
                            let n = e();
                            for (; n; ) t(n), (n = e());
                        }
                        forEachAt(t, e, n) {
                            if (e <= 0) return;
                            const [r, i] = this.find(t);
                            let s = t - i;
                            const o = this.iterator(r);
                            let l = o();
                            for (; l && s < t + e; ) {
                                const r = l.length();
                                t > s ? n(l, t - s, Math.min(e, s + r - t)) : n(l, 0, Math.min(r, t + e - s)),
                                    (s += r),
                                    (l = o());
                            }
                        }
                        map(t) {
                            return this.reduce((e, n) => (e.push(t(n)), e), []);
                        }
                        reduce(t, e) {
                            const n = this.iterator();
                            let r = n();
                            for (; r; ) (e = t(e, r)), (r = n());
                            return e;
                        }
                    }
                    function y(t, e) {
                        const n = e.find(t);
                        if (n) return n;
                        try {
                            return e.create(t);
                        } catch {
                            const n = e.create(r.INLINE);
                            return (
                                Array.from(t.childNodes).forEach((t) => {
                                    n.domNode.appendChild(t);
                                }),
                                t.parentNode && t.parentNode.replaceChild(n.domNode, t),
                                n.attach(),
                                n
                            );
                        }
                    }
                    const v = class t extends p {
                        constructor(t, e) {
                            super(t, e), (this.uiNode = null), this.build();
                        }
                        appendChild(t) {
                            this.insertBefore(t);
                        }
                        attach() {
                            super.attach(),
                                this.children.forEach((t) => {
                                    t.attach();
                                });
                        }
                        attachUI(e) {
                            null != this.uiNode && this.uiNode.remove(),
                                (this.uiNode = e),
                                t.uiClass && this.uiNode.classList.add(t.uiClass),
                                this.uiNode.setAttribute('contenteditable', 'false'),
                                this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
                        }
                        build() {
                            (this.children = new b()),
                                Array.from(this.domNode.childNodes)
                                    .filter((t) => t !== this.uiNode)
                                    .reverse()
                                    .forEach((t) => {
                                        try {
                                            const e = y(t, this.scroll);
                                            this.insertBefore(e, this.children.head || void 0);
                                        } catch (t) {
                                            if (t instanceof s) return;
                                            throw t;
                                        }
                                    });
                        }
                        deleteAt(t, e) {
                            if (0 === t && e === this.length()) return this.remove();
                            this.children.forEachAt(t, e, (t, e, n) => {
                                t.deleteAt(e, n);
                            });
                        }
                        descendant(e, n = 0) {
                            const [r, i] = this.children.find(n);
                            return (null == e.blotName && e(r)) || (null != e.blotName && r instanceof e)
                                ? [r, i]
                                : r instanceof t
                                ? r.descendant(e, i)
                                : [null, -1];
                        }
                        descendants(e, n = 0, r = Number.MAX_VALUE) {
                            let i = [],
                                s = r;
                            return (
                                this.children.forEachAt(n, r, (n, r, o) => {
                                    ((null == e.blotName && e(n)) || (null != e.blotName && n instanceof e)) &&
                                        i.push(n),
                                        n instanceof t && (i = i.concat(n.descendants(e, r, s))),
                                        (s -= o);
                                }),
                                i
                            );
                        }
                        detach() {
                            this.children.forEach((t) => {
                                t.detach();
                            }),
                                super.detach();
                        }
                        enforceAllowedChildren() {
                            let e = !1;
                            this.children.forEach((n) => {
                                e ||
                                    this.statics.allowedChildren.some((t) => n instanceof t) ||
                                    (n.statics.scope === r.BLOCK_BLOT
                                        ? (null != n.next && this.splitAfter(n),
                                          null != n.prev && this.splitAfter(n.prev),
                                          n.parent.unwrap(),
                                          (e = !0))
                                        : n instanceof t
                                        ? n.unwrap()
                                        : n.remove());
                            });
                        }
                        formatAt(t, e, n, r) {
                            this.children.forEachAt(t, e, (t, e, i) => {
                                t.formatAt(e, i, n, r);
                            });
                        }
                        insertAt(t, e, n) {
                            const [r, i] = this.children.find(t);
                            if (r) r.insertAt(i, e, n);
                            else {
                                const t = null == n ? this.scroll.create('text', e) : this.scroll.create(e, n);
                                this.appendChild(t);
                            }
                        }
                        insertBefore(t, e) {
                            null != t.parent && t.parent.children.remove(t);
                            let n = null;
                            this.children.insertBefore(t, e || null),
                                (t.parent = this),
                                null != e && (n = e.domNode),
                                (this.domNode.parentNode !== t.domNode || this.domNode.nextSibling !== n) &&
                                    this.domNode.insertBefore(t.domNode, n),
                                t.attach();
                        }
                        length() {
                            return this.children.reduce((t, e) => t + e.length(), 0);
                        }
                        moveChildren(t, e) {
                            this.children.forEach((n) => {
                                t.insertBefore(n, e);
                            });
                        }
                        optimize(t) {
                            if (
                                (super.optimize(t),
                                this.enforceAllowedChildren(),
                                null != this.uiNode &&
                                    this.uiNode !== this.domNode.firstChild &&
                                    this.domNode.insertBefore(this.uiNode, this.domNode.firstChild),
                                0 === this.children.length)
                            )
                                if (null != this.statics.defaultChild) {
                                    const t = this.scroll.create(this.statics.defaultChild.blotName);
                                    this.appendChild(t);
                                } else this.remove();
                        }
                        path(e, n = !1) {
                            const [r, i] = this.children.find(e, n),
                                s = [[this, e]];
                            return r instanceof t ? s.concat(r.path(i, n)) : (null != r && s.push([r, i]), s);
                        }
                        removeChild(t) {
                            this.children.remove(t);
                        }
                        replaceWith(e, n) {
                            const r = 'string' == typeof e ? this.scroll.create(e, n) : e;
                            return r instanceof t && this.moveChildren(r), super.replaceWith(r);
                        }
                        split(t, e = !1) {
                            if (!e) {
                                if (0 === t) return this;
                                if (t === this.length()) return this.next;
                            }
                            const n = this.clone();
                            return (
                                this.parent && this.parent.insertBefore(n, this.next || void 0),
                                this.children.forEachAt(t, this.length(), (t, r, i) => {
                                    const s = t.split(r, e);
                                    null != s && n.appendChild(s);
                                }),
                                n
                            );
                        }
                        splitAfter(t) {
                            const e = this.clone();
                            for (; null != t.next; ) e.appendChild(t.next);
                            return this.parent && this.parent.insertBefore(e, this.next || void 0), e;
                        }
                        unwrap() {
                            this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
                        }
                        update(t, e) {
                            const n = [],
                                r = [];
                            t.forEach((t) => {
                                t.target === this.domNode &&
                                    'childList' === t.type &&
                                    (n.push(...t.addedNodes), r.push(...t.removedNodes));
                            }),
                                r.forEach((t) => {
                                    if (
                                        null != t.parentNode &&
                                        'IFRAME' !== t.tagName &&
                                        document.body.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY
                                    )
                                        return;
                                    const e = this.scroll.find(t);
                                    null != e &&
                                        (null == e.domNode.parentNode || e.domNode.parentNode === this.domNode) &&
                                        e.detach();
                                }),
                                n
                                    .filter((t) => t.parentNode === this.domNode && t !== this.uiNode)
                                    .sort((t, e) =>
                                        t === e
                                            ? 0
                                            : t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING
                                            ? 1
                                            : -1
                                    )
                                    .forEach((t) => {
                                        let e = null;
                                        null != t.nextSibling && (e = this.scroll.find(t.nextSibling));
                                        const n = y(t, this.scroll);
                                        (n.next !== e || null == n.next) &&
                                            (null != n.parent && n.parent.removeChild(this),
                                            this.insertBefore(n, e || void 0));
                                    }),
                                this.enforceAllowedChildren();
                        }
                    };
                    v.uiClass = '';
                    const A = v,
                        N = class t extends A {
                            static create(t) {
                                return super.create(t);
                            }
                            static formats(e, n) {
                                const r = n.query(t.blotName);
                                if (null == r || e.tagName !== r.tagName) {
                                    if ('string' == typeof this.tagName) return !0;
                                    if (Array.isArray(this.tagName)) return e.tagName.toLowerCase();
                                }
                            }
                            constructor(t, e) {
                                super(t, e), (this.attributes = new f(this.domNode));
                            }
                            format(e, n) {
                                if (e !== this.statics.blotName || n) {
                                    const t = this.scroll.query(e, r.INLINE);
                                    if (null == t) return;
                                    t instanceof i
                                        ? this.attributes.attribute(t, n)
                                        : n &&
                                          (e !== this.statics.blotName || this.formats()[e] !== n) &&
                                          this.replaceWith(e, n);
                                } else
                                    this.children.forEach((e) => {
                                        e instanceof t || (e = e.wrap(t.blotName, !0)), this.attributes.copy(e);
                                    }),
                                        this.unwrap();
                            }
                            formats() {
                                const t = this.attributes.values(),
                                    e = this.statics.formats(this.domNode, this.scroll);
                                return null != e && (t[this.statics.blotName] = e), t;
                            }
                            formatAt(t, e, n, i) {
                                null != this.formats()[n] || this.scroll.query(n, r.ATTRIBUTE)
                                    ? this.isolate(t, e).format(n, i)
                                    : super.formatAt(t, e, n, i);
                            }
                            optimize(e) {
                                super.optimize(e);
                                const n = this.formats();
                                if (0 === Object.keys(n).length) return this.unwrap();
                                const r = this.next;
                                r instanceof t &&
                                    r.prev === this &&
                                    (function (t, e) {
                                        if (Object.keys(t).length !== Object.keys(e).length) return !1;
                                        for (const n in t) if (t[n] !== e[n]) return !1;
                                        return !0;
                                    })(n, r.formats()) &&
                                    (r.moveChildren(this), r.remove());
                            }
                            replaceWith(t, e) {
                                const n = super.replaceWith(t, e);
                                return this.attributes.copy(n), n;
                            }
                            update(t, e) {
                                super.update(t, e),
                                    t.some((t) => t.target === this.domNode && 'attributes' === t.type) &&
                                        this.attributes.build();
                            }
                            wrap(e, n) {
                                const r = super.wrap(e, n);
                                return r instanceof t && this.attributes.move(r), r;
                            }
                        };
                    (N.allowedChildren = [N, m]),
                        (N.blotName = 'inline'),
                        (N.scope = r.INLINE_BLOT),
                        (N.tagName = 'SPAN');
                    const E = N,
                        _ = class t extends A {
                            static create(t) {
                                return super.create(t);
                            }
                            static formats(e, n) {
                                const r = n.query(t.blotName);
                                if (null == r || e.tagName !== r.tagName) {
                                    if ('string' == typeof this.tagName) return !0;
                                    if (Array.isArray(this.tagName)) return e.tagName.toLowerCase();
                                }
                            }
                            constructor(t, e) {
                                super(t, e), (this.attributes = new f(this.domNode));
                            }
                            format(e, n) {
                                const s = this.scroll.query(e, r.BLOCK);
                                null != s &&
                                    (s instanceof i
                                        ? this.attributes.attribute(s, n)
                                        : e !== this.statics.blotName || n
                                        ? n &&
                                          (e !== this.statics.blotName || this.formats()[e] !== n) &&
                                          this.replaceWith(e, n)
                                        : this.replaceWith(t.blotName));
                            }
                            formats() {
                                const t = this.attributes.values(),
                                    e = this.statics.formats(this.domNode, this.scroll);
                                return null != e && (t[this.statics.blotName] = e), t;
                            }
                            formatAt(t, e, n, i) {
                                null != this.scroll.query(n, r.BLOCK) ? this.format(n, i) : super.formatAt(t, e, n, i);
                            }
                            insertAt(t, e, n) {
                                if (null == n || null != this.scroll.query(e, r.INLINE)) super.insertAt(t, e, n);
                                else {
                                    const r = this.split(t);
                                    if (null == r) throw new Error('Attempt to insertAt after block boundaries');
                                    {
                                        const t = this.scroll.create(e, n);
                                        r.parent.insertBefore(t, r);
                                    }
                                }
                            }
                            replaceWith(t, e) {
                                const n = super.replaceWith(t, e);
                                return this.attributes.copy(n), n;
                            }
                            update(t, e) {
                                super.update(t, e),
                                    t.some((t) => t.target === this.domNode && 'attributes' === t.type) &&
                                        this.attributes.build();
                            }
                        };
                    (_.blotName = 'block'),
                        (_.scope = r.BLOCK_BLOT),
                        (_.tagName = 'P'),
                        (_.allowedChildren = [E, _, m]);
                    const x = _,
                        w = class extends A {
                            checkMerge() {
                                return null !== this.next && this.next.statics.blotName === this.statics.blotName;
                            }
                            deleteAt(t, e) {
                                super.deleteAt(t, e), this.enforceAllowedChildren();
                            }
                            formatAt(t, e, n, r) {
                                super.formatAt(t, e, n, r), this.enforceAllowedChildren();
                            }
                            insertAt(t, e, n) {
                                super.insertAt(t, e, n), this.enforceAllowedChildren();
                            }
                            optimize(t) {
                                super.optimize(t),
                                    this.children.length > 0 &&
                                        null != this.next &&
                                        this.checkMerge() &&
                                        (this.next.moveChildren(this), this.next.remove());
                            }
                        };
                    (w.blotName = 'container'), (w.scope = r.BLOCK_BLOT);
                    const O = w,
                        j = class extends m {
                            static formats(t, e) {}
                            format(t, e) {
                                super.formatAt(0, this.length(), t, e);
                            }
                            formatAt(t, e, n, r) {
                                0 === t && e === this.length() ? this.format(n, r) : super.formatAt(t, e, n, r);
                            }
                            formats() {
                                return this.statics.formats(this.domNode, this.scroll);
                            }
                        },
                        S = {
                            attributes: !0,
                            characterData: !0,
                            characterDataOldValue: !0,
                            childList: !0,
                            subtree: !0,
                        },
                        L = class extends A {
                            constructor(t, e) {
                                super(null, e),
                                    (this.registry = t),
                                    (this.scroll = this),
                                    this.build(),
                                    (this.observer = new MutationObserver((t) => {
                                        this.update(t);
                                    })),
                                    this.observer.observe(this.domNode, S),
                                    this.attach();
                            }
                            create(t, e) {
                                return this.registry.create(this, t, e);
                            }
                            find(t, e = !1) {
                                const n = this.registry.find(t, e);
                                return n
                                    ? n.scroll === this
                                        ? n
                                        : e
                                        ? this.find(n.scroll.domNode.parentNode, !0)
                                        : null
                                    : null;
                            }
                            query(t, e = r.ANY) {
                                return this.registry.query(t, e);
                            }
                            register(...t) {
                                return this.registry.register(...t);
                            }
                            build() {
                                null != this.scroll && super.build();
                            }
                            detach() {
                                super.detach(), this.observer.disconnect();
                            }
                            deleteAt(t, e) {
                                this.update(),
                                    0 === t && e === this.length()
                                        ? this.children.forEach((t) => {
                                              t.remove();
                                          })
                                        : super.deleteAt(t, e);
                            }
                            formatAt(t, e, n, r) {
                                this.update(), super.formatAt(t, e, n, r);
                            }
                            insertAt(t, e, n) {
                                this.update(), super.insertAt(t, e, n);
                            }
                            optimize(t = [], e = {}) {
                                super.optimize(e);
                                const n = e.mutationsMap || new WeakMap();
                                let r = Array.from(this.observer.takeRecords());
                                for (; r.length > 0; ) t.push(r.pop());
                                const i = (t, e = !0) => {
                                        null == t ||
                                            t === this ||
                                            (null != t.domNode.parentNode &&
                                                (n.has(t.domNode) || n.set(t.domNode, []), e && i(t.parent)));
                                    },
                                    s = (t) => {
                                        n.has(t.domNode) &&
                                            (t instanceof A && t.children.forEach(s),
                                            n.delete(t.domNode),
                                            t.optimize(e));
                                    };
                                let o = t;
                                for (let e = 0; o.length > 0; e += 1) {
                                    if (e >= 100) throw new Error('[Parchment] Maximum optimize iterations reached');
                                    for (
                                        o.forEach((t) => {
                                            const e = this.find(t.target, !0);
                                            null != e &&
                                                (e.domNode === t.target &&
                                                    ('childList' === t.type
                                                        ? (i(this.find(t.previousSibling, !1)),
                                                          Array.from(t.addedNodes).forEach((t) => {
                                                              const e = this.find(t, !1);
                                                              i(e, !1),
                                                                  e instanceof A &&
                                                                      e.children.forEach((t) => {
                                                                          i(t, !1);
                                                                      });
                                                          }))
                                                        : 'attributes' === t.type && i(e.prev)),
                                                i(e));
                                        }),
                                            this.children.forEach(s),
                                            o = Array.from(this.observer.takeRecords()),
                                            r = o.slice();
                                        r.length > 0;

                                    )
                                        t.push(r.pop());
                                }
                            }
                            update(t, e = {}) {
                                t = t || this.observer.takeRecords();
                                const n = new WeakMap();
                                t
                                    .map((t) => {
                                        const e = this.find(t.target, !0);
                                        return null == e
                                            ? null
                                            : n.has(e.domNode)
                                            ? (n.get(e.domNode).push(t), null)
                                            : (n.set(e.domNode, [t]), e);
                                    })
                                    .forEach((t) => {
                                        null != t &&
                                            t !== this &&
                                            n.has(t.domNode) &&
                                            t.update(n.get(t.domNode) || [], e);
                                    }),
                                    (e.mutationsMap = n),
                                    n.has(this.domNode) && super.update(n.get(this.domNode), e),
                                    this.optimize(t, e);
                            }
                        };
                    (L.blotName = 'scroll'),
                        (L.defaultChild = x),
                        (L.allowedChildren = [x, O]),
                        (L.scope = r.BLOCK_BLOT),
                        (L.tagName = 'DIV');
                    const T = L,
                        k = class t extends m {
                            static create(t) {
                                return document.createTextNode(t);
                            }
                            static value(t) {
                                return t.data;
                            }
                            constructor(t, e) {
                                super(t, e), (this.text = this.statics.value(this.domNode));
                            }
                            deleteAt(t, e) {
                                this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
                            }
                            index(t, e) {
                                return this.domNode === t ? e : -1;
                            }
                            insertAt(t, e, n) {
                                null == n
                                    ? ((this.text = this.text.slice(0, t) + e + this.text.slice(t)),
                                      (this.domNode.data = this.text))
                                    : super.insertAt(t, e, n);
                            }
                            length() {
                                return this.text.length;
                            }
                            optimize(e) {
                                super.optimize(e),
                                    (this.text = this.statics.value(this.domNode)),
                                    0 === this.text.length
                                        ? this.remove()
                                        : this.next instanceof t &&
                                          this.next.prev === this &&
                                          (this.insertAt(this.length(), this.next.value()), this.next.remove());
                            }
                            position(t, e = !1) {
                                return [this.domNode, t];
                            }
                            split(t, e = !1) {
                                if (!e) {
                                    if (0 === t) return this;
                                    if (t === this.length()) return this.next;
                                }
                                const n = this.scroll.create(this.domNode.splitText(t));
                                return (
                                    this.parent.insertBefore(n, this.next || void 0),
                                    (this.text = this.statics.value(this.domNode)),
                                    n
                                );
                            }
                            update(t, e) {
                                t.some((t) => 'characterData' === t.type && t.target === this.domNode) &&
                                    (this.text = this.statics.value(this.domNode));
                            }
                            value() {
                                return this.text;
                            }
                        };
                    (k.blotName = 'text'), (k.scope = r.INLINE_BLOT);
                    const C = k;
                },
            },
            e = {};
        function n(r) {
            var i = e[r];
            if (void 0 !== i) return i.exports;
            var s = (e[r] = { id: r, loaded: !1, exports: {} });
            return t[r](s, s.exports, n), (s.loaded = !0), s.exports;
        }
        (n.n = function (t) {
            var e =
                t && t.__esModule
                    ? function () {
                          return t.default;
                      }
                    : function () {
                          return t;
                      };
            return n.d(e, { a: e }), e;
        }),
            (n.d = function (t, e) {
                for (var r in e) n.o(e, r) && !n.o(t, r) && Object.defineProperty(t, r, { enumerable: !0, get: e[r] });
            }),
            (n.g = (function () {
                if ('object' == typeof globalThis) return globalThis;
                try {
                    return this || new Function('return this')();
                } catch (t) {
                    if ('object' == typeof window) return window;
                }
            })()),
            (n.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (n.r = function (t) {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(t, '__esModule', { value: !0 });
            }),
            (n.nmd = function (t) {
                return (t.paths = []), t.children || (t.children = []), t;
            });
        var r = {};
        return (
            (function () {
                'use strict';
                n.d(r, {
                    default: function () {
                        return R;
                    },
                });
                var t = n(6142),
                    e = n(9698),
                    i = n(3036),
                    s = n(580),
                    o = n(4541),
                    l = n(746),
                    a = n(4850),
                    c = n(6003),
                    u = n(5232),
                    h = n.n(u),
                    f = n(5374);
                function d(t) {
                    return t instanceof e.Ay || t instanceof e.zo;
                }
                function p(t) {
                    return 'function' == typeof t.updateContent;
                }
                class g extends c.ScrollBlot {
                    static blotName = 'scroll';
                    static className = 'ql-editor';
                    static tagName = 'DIV';
                    static defaultChild = e.Ay;
                    static allowedChildren = [e.Ay, e.zo, s.A];
                    constructor(t, e, n) {
                        let { emitter: r } = n;
                        super(t, e),
                            (this.emitter = r),
                            (this.batch = !1),
                            this.optimize(),
                            this.enable(),
                            this.domNode.addEventListener('dragstart', (t) => this.handleDragStart(t));
                    }
                    batchStart() {
                        Array.isArray(this.batch) || (this.batch = []);
                    }
                    batchEnd() {
                        if (!this.batch) return;
                        const t = this.batch;
                        (this.batch = !1), this.update(t);
                    }
                    emitMount(t) {
                        this.emitter.emit(f.A.events.SCROLL_BLOT_MOUNT, t);
                    }
                    emitUnmount(t) {
                        this.emitter.emit(f.A.events.SCROLL_BLOT_UNMOUNT, t);
                    }
                    emitEmbedUpdate(t, e) {
                        this.emitter.emit(f.A.events.SCROLL_EMBED_UPDATE, t, e);
                    }
                    deleteAt(t, n) {
                        const [r, s] = this.line(t),
                            [o] = this.line(t + n);
                        if ((super.deleteAt(t, n), null != o && r !== o && s > 0)) {
                            if (r instanceof e.zo || o instanceof e.zo) return void this.optimize();
                            const t = o.children.head instanceof i.A ? null : o.children.head;
                            r.moveChildren(o, t), r.remove();
                        }
                        this.optimize();
                    }
                    enable() {
                        let t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                        this.domNode.setAttribute('contenteditable', t ? 'true' : 'false');
                    }
                    formatAt(t, e, n, r) {
                        super.formatAt(t, e, n, r), this.optimize();
                    }
                    insertAt(t, e, n) {
                        if (t >= this.length())
                            if (null == n || null == this.scroll.query(e, c.Scope.BLOCK)) {
                                const t = this.scroll.create(this.statics.defaultChild.blotName);
                                this.appendChild(t),
                                    null == n && e.endsWith('\n')
                                        ? t.insertAt(0, e.slice(0, -1), n)
                                        : t.insertAt(0, e, n);
                            } else {
                                const t = this.scroll.create(e, n);
                                this.appendChild(t);
                            }
                        else super.insertAt(t, e, n);
                        this.optimize();
                    }
                    insertBefore(t, e) {
                        if (t.statics.scope === c.Scope.INLINE_BLOT) {
                            const n = this.scroll.create(this.statics.defaultChild.blotName);
                            n.appendChild(t), super.insertBefore(n, e);
                        } else super.insertBefore(t, e);
                    }
                    insertContents(t, n) {
                        const r = this.deltaToRenderBlocks(n.concat(new (h())().insert('\n'))),
                            i = r.pop();
                        if (null == i) return;
                        this.batchStart();
                        const s = r.shift();
                        if (s) {
                            const n =
                                    'block' === s.type &&
                                    (0 === s.delta.length() || (!this.descendant(e.zo, t)[0] && t < this.length())),
                                r = 'block' === s.type ? s.delta : new (h())().insert({ [s.key]: s.value });
                            m(this, t, r);
                            const i = 'block' === s.type ? 1 : 0,
                                o = t + r.length() + i;
                            n && this.insertAt(o - 1, '\n');
                            const l = (0, e.Ji)(this.line(t)[0]),
                                a = u.AttributeMap.diff(l, s.attributes) || {};
                            Object.keys(a).forEach((t) => {
                                this.formatAt(o - 1, 1, t, a[t]);
                            }),
                                (t = o);
                        }
                        let [o, l] = this.children.find(t);
                        r.length &&
                            (o && ((o = o.split(l)), (l = 0)),
                            r.forEach((t) => {
                                if ('block' === t.type) m(this.createBlock(t.attributes, o || void 0), 0, t.delta);
                                else {
                                    const e = this.create(t.key, t.value);
                                    this.insertBefore(e, o || void 0),
                                        Object.keys(t.attributes).forEach((n) => {
                                            e.format(n, t.attributes[n]);
                                        });
                                }
                            })),
                            'block' === i.type &&
                                i.delta.length() &&
                                m(this, o ? o.offset(o.scroll) + l : this.length(), i.delta),
                            this.batchEnd(),
                            this.optimize();
                    }
                    isEnabled() {
                        return 'true' === this.domNode.getAttribute('contenteditable');
                    }
                    leaf(t) {
                        const e = this.path(t).pop();
                        if (!e) return [null, -1];
                        const [n, r] = e;
                        return n instanceof c.LeafBlot ? [n, r] : [null, -1];
                    }
                    line(t) {
                        return t === this.length() ? this.line(t - 1) : this.descendant(d, t);
                    }
                    lines() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
                        const n = (t, e, r) => {
                            let i = [],
                                s = r;
                            return (
                                t.children.forEachAt(e, r, (t, e, r) => {
                                    d(t) ? i.push(t) : t instanceof c.ContainerBlot && (i = i.concat(n(t, e, s))),
                                        (s -= r);
                                }),
                                i
                            );
                        };
                        return n(this, t, e);
                    }
                    optimize() {
                        let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        this.batch ||
                            (super.optimize(t, e), t.length > 0 && this.emitter.emit(f.A.events.SCROLL_OPTIMIZE, t, e));
                    }
                    path(t) {
                        return super.path(t).slice(1);
                    }
                    remove() {}
                    update(t) {
                        if (this.batch) return void (Array.isArray(t) && (this.batch = this.batch.concat(t)));
                        let e = f.A.sources.USER;
                        'string' == typeof t && (e = t),
                            Array.isArray(t) || (t = this.observer.takeRecords()),
                            (t = t.filter((t) => {
                                let { target: e } = t;
                                const n = this.find(e, !0);
                                return n && !p(n);
                            })).length > 0 && this.emitter.emit(f.A.events.SCROLL_BEFORE_UPDATE, e, t),
                            super.update(t.concat([])),
                            t.length > 0 && this.emitter.emit(f.A.events.SCROLL_UPDATE, e, t);
                    }
                    updateEmbedAt(t, n, r) {
                        const [i] = this.descendant((t) => t instanceof e.zo, t);
                        i && i.statics.blotName === n && p(i) && i.updateContent(r);
                    }
                    handleDragStart(t) {
                        t.preventDefault();
                    }
                    deltaToRenderBlocks(t) {
                        const e = [];
                        let n = new (h())();
                        return (
                            t.forEach((t) => {
                                const r = t?.insert;
                                if (r)
                                    if ('string' == typeof r) {
                                        const i = r.split('\n');
                                        i.slice(0, -1).forEach((r) => {
                                            n.insert(r, t.attributes),
                                                e.push({ type: 'block', delta: n, attributes: t.attributes ?? {} }),
                                                (n = new (h())());
                                        });
                                        const s = i[i.length - 1];
                                        s && n.insert(s, t.attributes);
                                    } else {
                                        const i = Object.keys(r)[0];
                                        if (!i) return;
                                        this.query(i, c.Scope.INLINE)
                                            ? n.push(t)
                                            : (n.length() && e.push({ type: 'block', delta: n, attributes: {} }),
                                              (n = new (h())()),
                                              e.push({
                                                  type: 'blockEmbed',
                                                  key: i,
                                                  value: r[i],
                                                  attributes: t.attributes ?? {},
                                              }));
                                    }
                            }),
                            n.length() && e.push({ type: 'block', delta: n, attributes: {} }),
                            e
                        );
                    }
                    createBlock(t, e) {
                        let n;
                        const r = {};
                        Object.entries(t).forEach((t) => {
                            let [e, i] = t;
                            null != this.query(e, c.Scope.BLOCK & c.Scope.BLOT) ? (n = e) : (r[e] = i);
                        });
                        const i = this.create(n || this.statics.defaultChild.blotName, n ? t[n] : void 0);
                        this.insertBefore(i, e || void 0);
                        const s = i.length();
                        return (
                            Object.entries(r).forEach((t) => {
                                let [e, n] = t;
                                i.formatAt(0, s, e, n);
                            }),
                            i
                        );
                    }
                }
                function m(t, n, r) {
                    r.reduce((n, r) => {
                        const i = u.Op.length(r);
                        let s = r.attributes || {};
                        if (null != r.insert)
                            if ('string' == typeof r.insert) {
                                const i = r.insert;
                                t.insertAt(n, i);
                                const [o] = t.descendant(c.LeafBlot, n),
                                    l = (0, e.Ji)(o);
                                s = u.AttributeMap.diff(l, s) || {};
                            } else if ('object' == typeof r.insert) {
                                const i = Object.keys(r.insert)[0];
                                if (null == i) return n;
                                if ((t.insertAt(n, i, r.insert[i]), null != t.scroll.query(i, c.Scope.INLINE))) {
                                    const [r] = t.descendant(c.LeafBlot, n),
                                        i = (0, e.Ji)(r);
                                    s = u.AttributeMap.diff(i, s) || {};
                                }
                            }
                        return (
                            Object.keys(s).forEach((e) => {
                                t.formatAt(n, i, e, s[e]);
                            }),
                            n + i
                        );
                    }, n);
                }
                var b = g,
                    y = n(5508),
                    v = n(584),
                    A = n(4266);
                class N extends A.A {
                    static DEFAULTS = { delay: 1e3, maxStack: 100, userOnly: !1 };
                    lastRecorded = 0;
                    ignoreChange = !1;
                    stack = { undo: [], redo: [] };
                    currentRange = null;
                    constructor(e, n) {
                        super(e, n),
                            this.quill.on(t.Ay.events.EDITOR_CHANGE, (e, n, r, i) => {
                                e === t.Ay.events.SELECTION_CHANGE
                                    ? n && i !== t.Ay.sources.SILENT && (this.currentRange = n)
                                    : e === t.Ay.events.TEXT_CHANGE &&
                                      (this.ignoreChange ||
                                          (this.options.userOnly && i !== t.Ay.sources.USER
                                              ? this.transform(n)
                                              : this.record(n, r)),
                                      (this.currentRange = _(this.currentRange, n)));
                            }),
                            this.quill.keyboard.addBinding({ key: 'z', shortKey: !0 }, this.undo.bind(this)),
                            this.quill.keyboard.addBinding(
                                { key: ['z', 'Z'], shortKey: !0, shiftKey: !0 },
                                this.redo.bind(this)
                            ),
                            /Win/i.test(navigator.platform) &&
                                this.quill.keyboard.addBinding({ key: 'y', shortKey: !0 }, this.redo.bind(this)),
                            this.quill.root.addEventListener('beforeinput', (t) => {
                                'historyUndo' === t.inputType
                                    ? (this.undo(), t.preventDefault())
                                    : 'historyRedo' === t.inputType && (this.redo(), t.preventDefault());
                            });
                    }
                    change(e, n) {
                        if (0 === this.stack[e].length) return;
                        const r = this.stack[e].pop();
                        if (!r) return;
                        const i = this.quill.getContents(),
                            s = r.delta.invert(i);
                        this.stack[n].push({ delta: s, range: _(r.range, s) }),
                            (this.lastRecorded = 0),
                            (this.ignoreChange = !0),
                            this.quill.updateContents(r.delta, t.Ay.sources.USER),
                            (this.ignoreChange = !1),
                            this.restoreSelection(r);
                    }
                    clear() {
                        this.stack = { undo: [], redo: [] };
                    }
                    cutoff() {
                        this.lastRecorded = 0;
                    }
                    record(t, e) {
                        if (0 === t.ops.length) return;
                        this.stack.redo = [];
                        let n = t.invert(e),
                            r = this.currentRange;
                        const i = Date.now();
                        if (this.lastRecorded + this.options.delay > i && this.stack.undo.length > 0) {
                            const t = this.stack.undo.pop();
                            t && ((n = n.compose(t.delta)), (r = t.range));
                        } else this.lastRecorded = i;
                        0 !== n.length() &&
                            (this.stack.undo.push({ delta: n, range: r }),
                            this.stack.undo.length > this.options.maxStack && this.stack.undo.shift());
                    }
                    redo() {
                        this.change('redo', 'undo');
                    }
                    transform(t) {
                        E(this.stack.undo, t), E(this.stack.redo, t);
                    }
                    undo() {
                        this.change('undo', 'redo');
                    }
                    restoreSelection(e) {
                        if (e.range) this.quill.setSelection(e.range, t.Ay.sources.USER);
                        else {
                            const n = (function (t, e) {
                                const n = e.reduce((t, e) => t + (e.delete || 0), 0);
                                let r = e.length() - n;
                                return (
                                    (function (t, e) {
                                        const n = e.ops[e.ops.length - 1];
                                        return (
                                            null != n &&
                                            (null != n.insert
                                                ? 'string' == typeof n.insert && n.insert.endsWith('\n')
                                                : null != n.attributes &&
                                                  Object.keys(n.attributes).some(
                                                      (e) => null != t.query(e, c.Scope.BLOCK)
                                                  ))
                                        );
                                    })(t, e) && (r -= 1),
                                    r
                                );
                            })(this.quill.scroll, e.delta);
                            this.quill.setSelection(n, t.Ay.sources.USER);
                        }
                    }
                }
                function E(t, e) {
                    let n = e;
                    for (let e = t.length - 1; e >= 0; e -= 1) {
                        const r = t[e];
                        (t[e] = { delta: n.transform(r.delta, !0), range: r.range && _(r.range, n) }),
                            (n = r.delta.transform(n)),
                            0 === t[e].delta.length() && t.splice(e, 1);
                    }
                }
                function _(t, e) {
                    if (!t) return t;
                    const n = e.transformPosition(t.index);
                    return { index: n, length: e.transformPosition(t.index + t.length) - n };
                }
                var x = n(8123);
                class w extends A.A {
                    constructor(t, e) {
                        super(t, e),
                            t.root.addEventListener('drop', (e) => {
                                e.preventDefault();
                                let n = null;
                                if (document.caretRangeFromPoint)
                                    n = document.caretRangeFromPoint(e.clientX, e.clientY);
                                else if (document.caretPositionFromPoint) {
                                    const t = document.caretPositionFromPoint(e.clientX, e.clientY);
                                    (n = document.createRange()),
                                        n.setStart(t.offsetNode, t.offset),
                                        n.setEnd(t.offsetNode, t.offset);
                                }
                                const r = n && t.selection.normalizeNative(n);
                                if (r) {
                                    const n = t.selection.normalizedToRange(r);
                                    e.dataTransfer?.files && this.upload(n, e.dataTransfer.files);
                                }
                            });
                    }
                    upload(t, e) {
                        const n = [];
                        Array.from(e).forEach((t) => {
                            t && this.options.mimetypes?.includes(t.type) && n.push(t);
                        }),
                            n.length > 0 && this.options.handler.call(this, t, n);
                    }
                }
                w.DEFAULTS = {
                    mimetypes: ['image/png', 'image/jpeg'],
                    handler(t, e) {
                        if (!this.quill.scroll.query('image')) return;
                        const n = e.map(
                            (t) =>
                                new Promise((e) => {
                                    const n = new FileReader();
                                    (n.onload = () => {
                                        e(n.result);
                                    }),
                                        n.readAsDataURL(t);
                                })
                        );
                        Promise.all(n).then((e) => {
                            const n = e.reduce(
                                (t, e) => t.insert({ image: e }),
                                new (h())().retain(t.index).delete(t.length)
                            );
                            this.quill.updateContents(n, f.A.sources.USER),
                                this.quill.setSelection(t.index + e.length, f.A.sources.SILENT);
                        });
                    },
                };
                var O = w;
                const j = ['insertText', 'insertReplacementText'];
                class S extends A.A {
                    constructor(e, n) {
                        super(e, n),
                            e.root.addEventListener('beforeinput', (t) => {
                                this.handleBeforeInput(t);
                            }),
                            /Android/i.test(navigator.userAgent) ||
                                e.on(t.Ay.events.COMPOSITION_BEFORE_START, () => {
                                    this.handleCompositionStart();
                                });
                    }
                    deleteRange(t) {
                        (0, x.Xo)({ range: t, quill: this.quill });
                    }
                    replaceText(e) {
                        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
                        if (0 === e.length) return !1;
                        if (n) {
                            const r = this.quill.getFormat(e.index, 1);
                            this.deleteRange(e),
                                this.quill.updateContents(new (h())().retain(e.index).insert(n, r), t.Ay.sources.USER);
                        } else this.deleteRange(e);
                        return this.quill.setSelection(e.index + n.length, 0, t.Ay.sources.SILENT), !0;
                    }
                    handleBeforeInput(t) {
                        if (this.quill.composition.isComposing || t.defaultPrevented || !j.includes(t.inputType))
                            return;
                        const e = t.getTargetRanges ? t.getTargetRanges()[0] : null;
                        if (!e || !0 === e.collapsed) return;
                        const n = (function (t) {
                            return 'string' == typeof t.data
                                ? t.data
                                : t.dataTransfer?.types.includes('text/plain')
                                ? t.dataTransfer.getData('text/plain')
                                : null;
                        })(t);
                        if (null == n) return;
                        const r = this.quill.selection.normalizeNative(e),
                            i = r ? this.quill.selection.normalizedToRange(r) : null;
                        i && this.replaceText(i, n) && t.preventDefault();
                    }
                    handleCompositionStart() {
                        const t = this.quill.getSelection();
                        t && this.replaceText(t);
                    }
                }
                var L = S;
                const T = /Mac/i.test(navigator.platform);
                class k extends A.A {
                    isListening = !1;
                    selectionChangeDeadline = 0;
                    constructor(t, e) {
                        super(t, e), this.handleArrowKeys(), this.handleNavigationShortcuts();
                    }
                    handleArrowKeys() {
                        this.quill.keyboard.addBinding({
                            key: ['ArrowLeft', 'ArrowRight'],
                            offset: 0,
                            shiftKey: null,
                            handler(e, n) {
                                let { line: r, event: i } = n;
                                if (!(r instanceof c.ParentBlot && r.uiNode)) return !0;
                                const s = 'rtl' === getComputedStyle(r.domNode).direction;
                                return (
                                    !!((s && 'ArrowRight' !== i.key) || (!s && 'ArrowLeft' !== i.key)) ||
                                    (this.quill.setSelection(
                                        e.index - 1,
                                        e.length + (i.shiftKey ? 1 : 0),
                                        t.Ay.sources.USER
                                    ),
                                    !1)
                                );
                            },
                        });
                    }
                    handleNavigationShortcuts() {
                        this.quill.root.addEventListener('keydown', (t) => {
                            !t.defaultPrevented &&
                                ((t) =>
                                    'ArrowLeft' === t.key ||
                                    'ArrowRight' === t.key ||
                                    'ArrowUp' === t.key ||
                                    'ArrowDown' === t.key ||
                                    'Home' === t.key ||
                                    !(!T || 'a' !== t.key || !0 !== t.ctrlKey))(t) &&
                                this.ensureListeningToSelectionChange();
                        });
                    }
                    ensureListeningToSelectionChange() {
                        (this.selectionChangeDeadline = Date.now() + 100),
                            this.isListening ||
                                ((this.isListening = !0),
                                document.addEventListener(
                                    'selectionchange',
                                    () => {
                                        (this.isListening = !1),
                                            Date.now() <= this.selectionChangeDeadline && this.handleSelectionChange();
                                    },
                                    { once: !0 }
                                ));
                    }
                    handleSelectionChange() {
                        const t = document.getSelection();
                        if (!t) return;
                        const e = t.getRangeAt(0);
                        if (!0 !== e.collapsed || 0 !== e.startOffset) return;
                        const n = this.quill.scroll.find(e.startContainer);
                        if (!(n instanceof c.ParentBlot && n.uiNode)) return;
                        const r = document.createRange();
                        r.setStartAfter(n.uiNode), r.setEndAfter(n.uiNode), t.removeAllRanges(), t.addRange(r);
                    }
                }
                var C = k;
                t.Ay.register({
                    'blots/block': e.Ay,
                    'blots/block/embed': e.zo,
                    'blots/break': i.A,
                    'blots/container': s.A,
                    'blots/cursor': o.A,
                    'blots/embed': l.A,
                    'blots/inline': a.A,
                    'blots/scroll': b,
                    'blots/text': y.A,
                    'modules/clipboard': v.Ay,
                    'modules/history': N,
                    'modules/keyboard': x.Ay,
                    'modules/uploader': O,
                    'modules/input': L,
                    'modules/uiNode': C,
                });
                var R = t.Ay;
            })(),
            r.default
        );
    })();
});
//# sourceMappingURL=quill.core.js.map
