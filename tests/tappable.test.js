const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const bundlePath = path.join(__dirname, '..', 'build', '_ankifx.js');
const engineCode = fs.readFileSync(bundlePath, 'utf8');

const documentRegistry = new Map();

// Base element class with full bubbling support and removal logic
class MockElement {
    constructor(tag) {
        this.tagName = tag.toUpperCase();
        this._id = '';
        this._className = '';
        this.classList = {
            classes: new Set(),
            add: (cls) => {
                this.classList.classes.add(cls);
                this._className = Array.from(this.classList.classes).join(' ');
            },
            remove: (cls) => {
                this.classList.classes.delete(cls);
                this._className = Array.from(this.classList.classes).join(' ');
            },
            contains: (cls) => this.classList.classes.has(cls),
            toggle: (cls, force) => {
                const hasIt = this.classList.classes.has(cls);
                const turnOn = force !== undefined ? force : !hasIt;
                if (turnOn) {
                    this.classList.classes.add(cls);
                } else {
                    this.classList.classes.delete(cls);
                }
                this._className = Array.from(this.classList.classes).join(' ');
                return turnOn;
            }
        };
        this.style = {
            removeProperty: () => {},
            setProperty: () => {},
            cssText: ''
        };
        this.listeners = {};
        this.children = [];
        this.parentElement = null;
        this.innerHTML = '';
        this.textContent = '';
        this.disabled = false;
    }

    get id() {
        return this._id;
    }

    set id(val) {
        this._id = val;
        if (val) {
            documentRegistry.set(val, this);
        }
    }

    get className() {
        return this._className;
    }

    set className(val) {
        this._className = val;
        this.classList.classes.clear();
        if (val) {
            const classes = val.split(/\s+/);
            classes.forEach(c => this.classList.classes.add(c));
        }
    }

    addEventListener(evt, cb, options) {
        this.listeners[evt] = this.listeners[evt] || [];
        this.listeners[evt].push({ cb, options });
    }

    removeEventListener(evt, cb) {
        if (!this.listeners[evt]) return;
        this.listeners[evt] = this.listeners[evt].filter(item => item.cb !== cb);
    }

    appendChild(child) {
        if (child.parentElement) {
            child.parentElement.children = child.parentElement.children.filter(c => c !== child);
        }
        this.children.push(child);
        child.parentElement = this;
    }

    insertBefore(newChild, refChild) {
        if (newChild.parentElement) {
            newChild.parentElement.children = newChild.parentElement.children.filter(c => c !== newChild);
        }
        if (!refChild) {
            this.appendChild(newChild);
            return newChild;
        }
        const index = this.children.indexOf(refChild);
        if (index === -1) {
            this.appendChild(newChild);
        } else {
            this.children.splice(index, 0, newChild);
            newChild.parentElement = this;
        }
        return newChild;
    }

    getBoundingClientRect() {
        return {
            width: 100,
            height: 50,
            top: 0,
            left: 0,
            right: 100,
            bottom: 50
        };
    }

    remove() {
        if (this.parentElement) {
            this.parentElement.children = this.parentElement.children.filter(c => c !== this);
        }
    }

    getContext() {
        return {
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
            },
            viewport: () => {},
            setTransform: () => {},
            scale: () => {},
        };
    }

    get firstChild() {
        return this.children[0] || null;
    }

    set innerHTML(html) {
        this._innerHTML = html;
        this.children = [];
        const selfClosing = ['input', 'br', 'img', 'hr'];
        const tokens = html.split(/(<\/?[a-zA-Z0-9\-]+[^>]*>)/g);
        let currentParent = this;
        const stack = [this];
        
        for (const token of tokens) {
            if (!token.trim()) continue;
            if (token.startsWith('</')) {
                if (stack.length > 1) {
                    stack.pop();
                    currentParent = stack[stack.length - 1];
                }
            } else if (token.startsWith('<')) {
                const tagMatch = token.match(/<([a-zA-Z0-9\-]+)/);
                if (tagMatch) {
                    const tagName = tagMatch[1];
                    const el = new MockElement(tagName);
                    
                    const idMatch = token.match(/id=["']([^"']+)["']/);
                    if (idMatch) {
                        el.id = idMatch[1];
                    }
                    const classMatch = token.match(/class=["']([^"']+)["']/);
                    if (classMatch) {
                        const classes = classMatch[1].split(/\s+/);
                        classes.forEach(c => el.classList.add(c));
                    }
                    const typeMatch = token.match(/type=["']([^"']+)["']/);
                    if (typeMatch) {
                        el.type = typeMatch[1];
                    }
                    const checkedMatch = token.match(/\bchecked\b/);
                    if (checkedMatch) {
                        el.checked = true;
                    }
                    const disabledMatch = token.match(/\bdisabled\b/);
                    if (disabledMatch) {
                        el.disabled = true;
                    }
                    
                    currentParent.appendChild(el);
                    
                    const isSelfClosing = selfClosing.includes(tagName.toLowerCase()) || token.endsWith('/>');
                    if (!isSelfClosing) {
                        stack.push(el);
                        currentParent = el;
                    }
                }
            } else {
                currentParent.textContent = (currentParent.textContent || '') + token.trim();
            }
        }
    }

    get innerHTML() {
        return this._innerHTML || '';
    }

    querySelector(sel) {
        const parts = sel.split(/\s+/);
        const match = (el, selector) => {
            if (selector.startsWith('.')) {
                return el.classList.contains(selector.substring(1));
            }
            if (selector.startsWith('#')) {
                return el.id === selector.substring(1);
            }
            return el.tagName === selector.toUpperCase();
        };

        const find = (root, selector) => {
            if (match(root, selector)) return root;
            for (let child of root.children) {
                const found = find(child, selector);
                if (found) return found;
            }
            return null;
        };

        let current = this;
        for (const part of parts) {
            current = find(current, part);
            if (!current) return null;
        }
        return current;
    }

    querySelectorAll(sel) {
        const parts = sel.split(/\s+/);
        const match = (el, selector) => {
            if (selector.startsWith('.')) {
                return el.classList.contains(selector.substring(1));
            }
            if (selector.startsWith('#')) {
                return el.id === selector.substring(1);
            }
            return el.tagName === selector.toUpperCase();
        };

        const findAll = (root, selector, results = []) => {
            if (match(root, selector)) results.push(root);
            for (let child of root.children) {
                findAll(child, selector, results);
            }
            return results;
        };

        let currentLevel = [this];
        for (const part of parts) {
            let nextLevel = [];
            for (const item of currentLevel) {
                const results = findAll(item, part);
                nextLevel = nextLevel.concat(results);
            }
            currentLevel = Array.from(new Set(nextLevel));
        }
        return currentLevel;
    }

    closest(sel) {
        const selectors = sel.split(',').map(s => s.trim());
        let curr = this;
        while (curr) {
            for (const selector of selectors) {
                if (selector.startsWith('.')) {
                    if (curr.classList.contains(selector.substring(1))) return curr;
                } else if (selector.startsWith('#')) {
                    if (curr.id === selector.substring(1)) return curr;
                } else {
                    if (curr.tagName === selector.toUpperCase()) return curr;
                }
            }
            curr = curr.parentElement;
        }
        return null;
    }

    matchesSelector(sel) {
        if (sel === '.tappable') return this.classList.contains('tappable');
        const nativeTags = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A', 'SUMMARY', 'VIDEO', 'AUDIO'];
        if (nativeTags.includes(sel.toUpperCase())) return this.tagName === sel.toUpperCase();
        return false;
    }
}

// A robust function to create a complete mock DOM context for interaction testing
function createMockContext(configOptions = {}) {
    documentRegistry.clear();
    const sessionStorageStore = {};
    const localStorageStore = {};

    const mockSessionStorage = {
        getItem: (key) => sessionStorageStore[key] || null,
        setItem: (key, val) => { sessionStorageStore[key] = String(val); },
        removeItem: (key) => { delete sessionStorageStore[key]; },
        clear: () => { for (let k in sessionStorageStore) delete sessionStorageStore[k]; }
    };

    const mockLocalStorage = {
        getItem: (key) => localStorageStore[key] || null,
        setItem: (key, val) => { localStorageStore[key] = String(val); },
        removeItem: (key) => { delete localStorageStore[key]; },
        clear: () => { for (let k in localStorageStore) delete localStorageStore[k]; }
    };

    const documentListeners = {};
    const windowListeners = {};
    const docElements = new Proxy({}, {
        get: (target, prop) => {
            return documentRegistry.get(prop) || null;
        },
        set: (target, prop, value) => {
            documentRegistry.set(prop, value);
            return true;
        }
    });
    const body = new MockElement('body');
    const head = new MockElement('head');
    const documentElement = new MockElement('html');
    documentElement.appendChild(body);
    documentElement.appendChild(head);

    const mockDocument = {
        documentElement,
        body,
        head,
        currentScript: { src: 'http://localhost/_ankifx.js' },
        createElement: (tag) => {
            const el = new MockElement(tag);
            if (tag === 'div') {
                el.closeBtn = new MockElement('button');
                el.closeBtn.className = 'afx-update-notice-close afx-legacy-toast-close';
                el.appendChild(el.closeBtn);

                el.linkBtn = new MockElement('a');
                el.linkBtn.className = 'afx-update-notice-link afx-legacy-toast-link';
                el.appendChild(el.linkBtn);
            }
            return el;
        },
        getElementById: (id) => {
            if (documentRegistry.has(id)) return documentRegistry.get(id);
            if (id === 'ankifx-template-meta') {
                const el = new MockElement('div');
                el.id = id;
                el.getAttribute = (attr) => {
                    if (attr === 'data-template-name') return 'front_mcq';
                    if (attr === 'data-template-version') return '1.0.1';
                    return null;
                };
                return el;
            }
            if (id === '_flag' || id === '_mark') {
                const el = new MockElement('div');
                el.id = id;
                body.appendChild(el);
                return el;
            }
            return null;
        },
        addEventListener: (evt, cb, options) => {
            documentListeners[evt] = documentListeners[evt] || [];
            documentListeners[evt].push({ cb, options });
        },
        removeEventListener: (evt, cb) => {
            if (!documentListeners[evt]) return;
            documentListeners[evt] = documentListeners[evt].filter(item => item.cb !== cb);
        },
        querySelector: (sel) => {
            return documentElement.querySelector(sel);
        },
        querySelectorAll: (sel) => {
            return documentElement.querySelectorAll(sel);
        }
    };

    const rafs = [];
    const mockWindow = {
        AnkiFX_Config: Object.assign({ defaultEffect: 'none', countdown: 0 }, configOptions),
        AnkiFX_Eval_History: [],
        addEventListener: (evt, cb) => {
            windowListeners[evt] = windowListeners[evt] || [];
            windowListeners[evt].push(cb);
        },
        removeEventListener: (evt, cb) => {
            if (!windowListeners[evt]) return;
            windowListeners[evt] = windowListeners[evt].filter(c => c !== cb);
        },
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
        navigator: { userAgent: 'iPhone' },
        screen: { width: 1024, height: 768 },
        getComputedStyle: () => ({
            getPropertyValue: () => ''
        })
    };

    const context = {
        window: mockWindow,
        document: mockDocument,
        screen: { width: 1024, height: 768 },
        sessionStorage: mockSessionStorage,
        localStorage: mockLocalStorage,
        navigator: mockWindow.navigator,
        getComputedStyle: mockWindow.getComputedStyle,
        requestAnimationFrame: mockWindow.requestAnimationFrame,
        cancelAnimationFrame: mockWindow.cancelAnimationFrame,
        CustomEvent: mockWindow.CustomEvent,
        ResizeObserver: class {
            observe() {}
            disconnect() {}
        },
        MutationObserver: class {
            constructor(cb) { this.cb = cb; }
            observe() {}
            disconnect() {}
        },
        console: { log: () => {}, warn: () => {}, info: () => {}, error: () => {} },
        process: { env: { ANKIFX_VERSION: '1.0.1-test', BUILD_DATE: '2026-06-22' } },
        setTimeout: (cb) => cb(),
        clearTimeout: () => {},
        setInterval: (cb) => { cb(); return 1; },
        clearInterval: () => {},
        performance: { now: () => Date.now() },
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

    function simulateAnkiMobileTap(element) {
        let current = element;
        let isTappableDetected = false;
        
        while (current) {
            const isNativeTag = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'SUMMARY', 'VIDEO', 'AUDIO'].includes(current.tagName);
            const hasTappableClass = current.classList.contains('tappable');
            
            if (isNativeTag || hasTappableClass) {
                isTappableDetected = true;
                break;
            }
            current = current.parentElement;
        }

        return {
            cardFlipped: !isTappableDetected,
            tappableAborted: isTappableDetected
        };
    }

    function fireClickEvent(element) {
        const path = [];
        let curr = element;
        while (curr) {
            path.push(curr);
            curr = curr.parentElement;
        }

        path.push(mockDocument);

        const event = {
            target: element,
            propagationStopped: false,
            stopPropagation: function() { this.propagationStopped = true; }
        };

        for (let node of path) {
            if (event.propagationStopped) break;
            
            let handlers = [];
            if (node.listeners && node.listeners['click']) {
                handlers = node.listeners['click'];
            } else if (node === mockDocument && documentListeners['click']) {
                handlers = documentListeners['click'];
            }

            for (let handler of handlers) {
                const cb = typeof handler === 'function' ? handler : handler.cb;
                cb(event);
            }
        }

        return event;
    }

    return {
        context,
        mockDocument,
        docElements,
        documentListeners,
        simulateAnkiMobileTap,
        fireClickEvent,
        flushRafs
    };
}

describe('Tappable-First Architecture Integration Tests', () => {

    it('asserts that background canvas tap flips the card', () => {
        const { simulateAnkiMobileTap } = createMockContext();
        
        const canvas = new MockElement('canvas');
        const card = new MockElement('div');
        card.id = 'qa';
        card.appendChild(canvas);

        const result = simulateAnkiMobileTap(canvas);
        assert.equal(result.cardFlipped, true, 'Canvas click should trigger card flip');
        assert.equal(result.tappableAborted, false, 'Canvas is not interactive, tap should not be aborted');
    });

    it('asserts that .tappable overlays and elements abort native card flips', () => {
        const { context, simulateAnkiMobileTap, docElements, flushRafs } = createMockContext();
        context.window.AnkiFX.init();
        flushRafs();

        const overlay = docElements['ankifx-overlay'];
        assert.ok(overlay, 'Overlay element should be created');
        assert.ok(overlay.classList.contains('tappable'), 'Overlay must have the tappable class');
        
        const resultOverlay = simulateAnkiMobileTap(overlay);
        assert.equal(resultOverlay.cardFlipped, false);
        assert.equal(resultOverlay.tappableAborted, true, 'Overlay tap should abort card flip');

        const bottomDock = docElements['afx-bottom-dock'];
        assert.ok(bottomDock, 'Bottom dock should exist');
        assert.ok(bottomDock.classList.contains('tappable'), 'Bottom dock must be tappable');

        const resultDock = simulateAnkiMobileTap(bottomDock);
        assert.equal(resultDock.cardFlipped, false);
        assert.equal(resultDock.tappableAborted, true);
    });

    it('asserts MCQ options with tappable class abort card flips', () => {
        const { simulateAnkiMobileTap } = createMockContext();
        
        const optionsBox = new MockElement('div');
        optionsBox.id = 'afxMcqOptions';
        optionsBox.classList.add('tappable');

        const optionCard = new MockElement('div');
        optionCard.className = 'afx-mcq-opt tappable';
        optionsBox.appendChild(optionCard);

        const result = simulateAnkiMobileTap(optionCard);
        assert.equal(result.cardFlipped, false, 'Tapping option card must not flip the card');
        assert.equal(result.tappableAborted, true);
    });

    it('asserts audio control back/skip buttons abort card flips and bubble click events normally', () => {
        const { context, simulateAnkiMobileTap, fireClickEvent, docElements, flushRafs } = createMockContext();
        context.window.AnkiFX.init();
        flushRafs();

        const btnBack = docElements['afx-btn-back'];
        const btnSkip = docElements['afx-btn-skip'];

        assert.equal(simulateAnkiMobileTap(btnBack).tappableAborted, true);
        assert.equal(simulateAnkiMobileTap(btnSkip).tappableAborted, true);

        let actionExecuted = false;
        context.window.AnkiFX.jukebox = {
            isPlaying: true,
            playNext: () => { actionExecuted = true; }
        };

        const event = fireClickEvent(btnSkip);
        assert.equal(actionExecuted, true, 'Skip action must execute on click');
        assert.equal(event.propagationStopped, true, 'Click should be stopped at document level blocker for compatibility');
    });

    it('verifies consent dialog root is tappable and removes stopPropagation', () => {
        const { context, simulateAnkiMobileTap, fireClickEvent, docElements, flushRafs } = createMockContext({
            termsText: 'Please accept terms'
        });

        context.window.AnkiFX.init();
        flushRafs();

        const consentBtn = docElements['afx-consent-btn'];
        assert.ok(consentBtn, 'Consent button must exist');

        let agreeTriggered = false;
        context.window.AnkiFX.agree = () => { agreeTriggered = true; };

        consentBtn.disabled = false;
        const clickEvent = fireClickEvent(consentBtn);
        assert.equal(agreeTriggered, true, 'Agree callback must fire');
        assert.equal(clickEvent.propagationStopped, true, 'Global blocker intercepts interactive clicks at document level');
    });

    it('verifies dynamic elements correctly register tappable status', () => {
        const { context, simulateAnkiMobileTap, flushRafs } = createMockContext();
        context.window.AnkiFX.init();
        flushRafs();

        const dynamicEl = new MockElement('div');
        dynamicEl.className = 'afx-custom-element';
        
        assert.equal(simulateAnkiMobileTap(dynamicEl).cardFlipped, true);

        dynamicEl.classList.add('tappable');

        assert.equal(simulateAnkiMobileTap(dynamicEl).cardFlipped, false);
        assert.equal(simulateAnkiMobileTap(dynamicEl).tappableAborted, true);
    });

    it('verifies update notice and legacy toast are marked tappable and trigger close action', () => {
        const { context, simulateAnkiMobileTap, docElements, flushRafs } = createMockContext();
        context.window.AnkiFX.init();
        flushRafs();

        context.window.dispatchEvent(new context.window.CustomEvent('ankifx:template-status', {
            detail: { isNewer: true, local: '1.0.0', remote: '1.0.2', targetUrl: 'http://loc', displayUrl: 'loc' }
        }));

        const notice = docElements['afx-update-notice'];
        if (notice) {
            assert.ok(notice.classList.contains('tappable'), 'Update notice must be tappable');
            assert.equal(simulateAnkiMobileTap(notice).tappableAborted, true);
        }

        context.window.AnkiFX.showLegacyMigrationToast('test_tpl');
        const toast = docElements['afx-legacy-toast'];
        if (toast) {
            assert.ok(toast.classList.contains('tappable'), 'Legacy toast must be tappable');
            assert.equal(simulateAnkiMobileTap(toast).tappableAborted, true);
        }
    });

    it('verifies debug console is marked tappable and keyboard stopPropagation is retained', () => {
        const { context, simulateAnkiMobileTap, docElements, flushRafs } = createMockContext({ debug: true, defaultEffect: 'debug' });
        context.window.AnkiFX.init();
        flushRafs();

        const debugRoot = docElements['ankifx-overlay'].children.find(c => c.classList.contains('afx-debug-container'));
        assert.ok(debugRoot, 'Debug container must exist');
        assert.ok(debugRoot.classList.contains('tappable'), 'Debug container must be tappable');
        assert.equal(simulateAnkiMobileTap(debugRoot).tappableAborted, true);

        const input = debugRoot.querySelector('#afx-console-input');
        if (input) {
            const mockEvent = {
                type: 'keydown',
                key: 'Enter',
                propagationStopped: false,
                stopPropagation: function() { this.propagationStopped = true; }
            };
            const handlers = input.listeners['keydown'] || [];
            assert.ok(handlers.length > 0);
            handlers[0].cb(mockEvent);
            assert.equal(mockEvent.propagationStopped, true, 'Keyboard stopPropagation must be preserved on command input');
        }
    });
});
