const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const bundlePath = path.join(__dirname, '..', 'build', '_ankifx.js');
const engineCode = fs.readFileSync(bundlePath, 'utf8');

function createMockContext(domState = {}) {
    const sessionStorageStore = {};
    const localStorageStore = {};

    const mockSessionStorage = {
        getItem: (key) => {
            if (domState.sessionStorageFail && key.startsWith('afx_legacy_toast_')) {
                throw new Error('SecurityError: sessionStorage is disabled');
            }
            return sessionStorageStore[key] || null;
        },
        setItem: (key, val) => {
            if (domState.sessionStorageFail && key.startsWith('afx_legacy_toast_')) {
                throw new Error('SecurityError: sessionStorage is disabled');
            }
            sessionStorageStore[key] = String(val);
        },
        clear: () => { for (let k in sessionStorageStore) delete sessionStorageStore[k]; }
    };

    const mockLocalStorage = {
        getItem: (key) => {
            if (domState.localStorageFail && key.startsWith('afx_legacy_toast_')) {
                throw new Error('SecurityError: localStorage is disabled');
            }
            return localStorageStore[key] || null;
        },
        setItem: (key, val) => {
            if (domState.localStorageFail && key.startsWith('afx_legacy_toast_')) {
                throw new Error('SecurityError: localStorage is disabled');
            }
            localStorageStore[key] = String(val);
        },
        clear: () => { for (let k in localStorageStore) delete localStorageStore[k]; }
    };

    const appendedBodyElements = [];
    const appendedHeadElements = [];

    const mockDocument = {
        currentScript: { src: 'http://localhost/_ankifx.js' },
        getElementById: (id) => {
            if (id === 'ankifx-template-meta') {
                if (domState.metaExists === false) return null;
                return {
                    getAttribute: (attr) => {
                        if (attr === 'data-template-name') return domState.metaName !== undefined ? domState.metaName : 'front_mcq';
                        if (attr === 'data-template-version') return domState.metaVersion !== undefined ? domState.metaVersion : '1.0.0';
                        return null;
                    }
                };
            }
            if (id === 'afx-legacy-toast') {
                return appendedBodyElements.find(el => el.id === 'afx-legacy-toast') || null;
            }
            if (id === '_flag' || id === '_mark') {
                return { parentNode: { removeChild: () => {} } };
            }
            return null;
        },
        createElement: (tag) => {
            const el = {
                tagName: tag.toUpperCase(),
                id: '',
                className: '',
                innerHTML: '',
                textContent: '',
                classList: {
                    classes: new Set(),
                    add: function(cls) { el.classList.classes.add(cls); el.className = Array.from(el.classList.classes).join(' '); },
                    remove: function(cls) { el.classList.classes.delete(cls); el.className = Array.from(el.classList.classes).join(' '); },
                    contains: function(cls) { return el.classList.classes.has(cls); }
                },
                listeners: {},
                addEventListener: function(evt, cb) {
                    el.listeners[evt] = el.listeners[evt] || [];
                    el.listeners[evt].push(cb);
                },
                appendChild: (child) => {
                    el.children = el.children || [];
                    el.children.push(child);
                    child.parentElement = el;
                },
                getBoundingClientRect: () => ({
                    width: 100,
                    height: 50,
                    top: 0,
                    left: 0,
                    right: 100,
                    bottom: 50
                }),
                getContext: () => ({
                    fillRect: () => {},
                    clearRect: () => {},
                    getImageData: () => ({ data: [] }),
                    putImageData: () => {},
                    createImageData: () => ({ data: [] }),
                    drawImage: () => {},
                    beginPath: () => {},
                    arc: () => {},
                    fill: () => {},
                    stroke: () => {},
                    fillText: () => {},
                    measureText: () => ({ width: 100 }),
                    getExtension: (name) => {
                        if (name === 'WEBGL_lose_context') {
                            return { loseContext: () => {} };
                        }
                        return null;
                    }
                }),
                querySelector: (selector) => {
                    if (selector === '.afx-legacy-toast-close') {
                        return el.closeBtn;
                    }
                    if (selector === '.afx-legacy-toast-link') {
                        return el.linkBtn;
                    }
                    return null;
                },
                remove: () => {
                    const idx = appendedBodyElements.indexOf(el);
                    if (idx !== -1) appendedBodyElements.splice(idx, 1);
                    const headIdx = appendedHeadElements.indexOf(el);
                    if (headIdx !== -1) appendedHeadElements.splice(headIdx, 1);
                },
                closeBtn: {
                    listeners: {},
                    addEventListener: function(evt, cb) {
                        this.listeners[evt] = this.listeners[evt] || [];
                        this.listeners[evt].push(cb);
                    }
                },
                linkBtn: {
                    listeners: {},
                    addEventListener: function(evt, cb) {
                        this.listeners[evt] = this.listeners[evt] || [];
                        this.listeners[evt].push(cb);
                    }
                }
            };
            return el;
        },
        body: {
            appendChild: (el) => {
                appendedBodyElements.push(el);
            }
        },
        head: {
            appendChild: (el) => {
                appendedHeadElements.push(el);
            }
        },
        documentElement: {
            classList: {
                classes: new Set(),
                add: function(cls) { this.classes.add(cls); },
                remove: function(cls) { this.classes.delete(cls); },
                contains: function(cls) { return this.classes.has(cls); },
                forEach: function(cb) { this.classes.forEach(cb); }
            },
            style: {
                removeProperty: () => {}
            }
        }
    };

    const rafs = [];
    const mockWindow = {
        AnkiFX_Config: { defaultEffect: 'none' },
        AnkiFX_Eval_History: [],
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
        CustomEvent: class {
            constructor(type, init) {
                this.type = type;
                this.detail = init ? init.detail : null;
            }
        },
        cancelAnimationFrame: (id) => {
            if (id > 0 && id <= rafs.length) {
                rafs[id - 1] = null;
            }
        },
        requestAnimationFrame: (cb) => {
            rafs.push(cb);
            return rafs.length;
        },
        requestIdleCallback: (cb) => { cb(); },
        navigator: { userAgent: 'Mozilla/5.0' },
        getComputedStyle: () => ({
            getPropertyValue: () => ''
        })
    };

    const context = {
        window: mockWindow,
        document: mockDocument,
        sessionStorage: mockSessionStorage,
        localStorage: mockLocalStorage,
        navigator: mockWindow.navigator,
        getComputedStyle: mockWindow.getComputedStyle,
        requestAnimationFrame: mockWindow.requestAnimationFrame,
        cancelAnimationFrame: mockWindow.cancelAnimationFrame,
        CustomEvent: mockWindow.CustomEvent,
        ResizeObserver: class {
            observe() {}
            unobserve() {}
            disconnect() {}
        },
        MutationObserver: class {
            constructor(callback) { this.callback = callback; }
            observe() {}
            disconnect() {}
        },
        console: { log: () => {}, warn: () => {}, info: () => {}, error: () => {} },
        process: { env: {} },
        setTimeout: (cb) => cb(),
        clearTimeout: () => {},
        setInterval: (cb) => { cb(); return 123; },
        clearInterval: () => {},
        performance: global.performance || { now: () => Date.now() },
    };
    context.window.document = mockDocument;

    vm.createContext(context);
    vm.runInContext(engineCode, context);

    function flushRafs() {
        for (let i = 0; i < 3; i++) {
            const current = [...rafs];
            rafs.length = 0;
            current.forEach(cb => {
                if (typeof cb === 'function') cb();
            });
        }
    }

    return {
        context,
        appendedBodyElements,
        appendedHeadElements,
        sessionStorageStore,
        localStorageStore,
        flushRafs
    };
}

describe('Legacy Template Migration Toast System', () => {
    it('does NOT trigger toast on valid template metadata', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: true,
            metaName: 'front_mcq',
            metaVersion: '1.2.3'
        });

        // Initialize engine
        context.window.AnkiFX.init();
        flushRafs();

        // Toast should not be present
        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.equal(toast, undefined, 'Toast should not be shown for modern/complete template');
    });

    it('triggers toast if metadata element is completely missing', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: false
        });

        // Initialize engine
        context.window.AnkiFX.init();
        flushRafs();

        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast, 'Toast should be displayed when metadata tag is missing');
        assert.ok(toast.innerHTML.includes('Legacy Template Detected'));
        assert.ok(toast.classList.contains('afx-legacy-visible'));
    });

    it('triggers toast if version attribute is missing or empty', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: true,
            metaName: 'front_mcq',
            metaVersion: ''
        });

        context.window.AnkiFX.init();
        flushRafs();

        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast, 'Toast should be displayed when template version is empty');
    });

    it('triggers toast if template name attribute is missing or empty', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: true,
            metaName: '',
            metaVersion: '1.0.0'
        });

        context.window.AnkiFX.init();
        flushRafs();

        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast, 'Toast should be displayed when template name is empty');
    });

    it('honors sessionStorage persistence and shows only once', () => {
        const { context, appendedBodyElements, sessionStorageStore, flushRafs } = createMockContext({
            metaExists: false
        });

        // First run
        context.window.AnkiFX.init();
        flushRafs();
        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast);
        assert.equal(sessionStorageStore['afx_legacy_toast_unknown'], undefined);

        // Click close to set sessionStorage
        const clickHandlers = toast.closeBtn.listeners['click'] || [];
        assert.equal(clickHandlers.length, 1);
        clickHandlers[0]({ stopPropagation: () => {} });
        assert.equal(sessionStorageStore['afx_legacy_toast_unknown'], 'true');

        // Destroy and run again - it shouldn't show because session key is set
        context.window.AnkiFX.destroy();
        appendedBodyElements.length = 0;

        context.window.AnkiFX.init();
        flushRafs();
        const toastSecond = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.equal(toastSecond, undefined, 'Should not show toast twice if sessionStorage has key');
    });

    it('falls back to in-memory tracking if sessionStorage fails', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: false,
            sessionStorageFail: true
        });

        // First run should trigger toast and not crash
        assert.doesNotThrow(() => {
            context.window.AnkiFX.init();
            flushRafs();
        });
        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast);

        // Click close to set in-memory flag
        const clickHandlers = toast.closeBtn.listeners['click'] || [];
        assert.equal(clickHandlers.length, 1);
        clickHandlers[0]({ stopPropagation: () => {} });

        // Destroy and init again. The in-memory tracking should prevent duplicate toast.
        context.window.AnkiFX.destroy();
        appendedBodyElements.length = 0;

        context.window.AnkiFX.init();
        flushRafs();
        const toastSecond = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.equal(toastSecond, undefined, 'Should not show toast twice on page reload when falling back to in-memory');
    });

    it('dismisses the toast when click listener triggers on close button', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: false
        });

        context.window.AnkiFX.init();
        flushRafs();
        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast);
        assert.ok(toast.classList.contains('afx-legacy-visible'));

        // Trigger close button click
        const clickHandlers = toast.closeBtn.listeners['click'] || [];
        assert.equal(clickHandlers.length, 1);

        const mockEvent = { stopPropagation: () => {} };
        clickHandlers[0](mockEvent);

        // Transition classes are removed, element is removed after timeout
        assert.ok(!toast.classList.contains('afx-legacy-visible'));
        const toastAfter = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.equal(toastAfter, undefined, 'Toast should be removed from DOM on close');
    });

    it('sets the legacy toast container as tappable to prevent card flips', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: false
        });

        context.window.AnkiFX.init();
        flushRafs();
        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast);
        assert.ok(toast.classList.contains('tappable'), 'Toast container must have tappable class');
    });

    it('removes toast element on destroy() if it exists in the DOM', () => {
        const { context, appendedBodyElements, flushRafs } = createMockContext({
            metaExists: false
        });

        context.window.AnkiFX.init();
        flushRafs();
        const toast = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.ok(toast);

        context.window.AnkiFX.destroy();
        const toastAfter = appendedBodyElements.find(el => el.id === 'afx-legacy-toast');
        assert.equal(toastAfter, undefined, 'Toast element must be removed on destroy');
    });
});
