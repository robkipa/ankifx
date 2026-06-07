const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// --- Helper to extract the Meta Layer Versioning script from an HTML template ---
function extractVersioningScript(filePath) {
    const html = fs.readFileSync(filePath, 'utf8');
    // Find the script tag immediately following #afx-update-banner-root
    const marker = 'id="afx-update-banner-root"></div>';
    const markerIdx = html.indexOf(marker);
    if (markerIdx === -1) throw new Error('Could not find update banner root in ' + filePath);

    const startScriptIdx = html.indexOf('<script>', markerIdx);
    const endScriptIdx = html.indexOf('</script>', startScriptIdx);
    if (startScriptIdx === -1 || endScriptIdx === -1) {
        throw new Error('Could not find script block after banner root in ' + filePath);
    }

    return html.substring(startScriptIdx + 8, endScriptIdx);
}

describe('Template Versioning System - Pure Logic', () => {
    let isNewer;

    it('extracts and parses comparison logic correctly', () => {
        const scriptCode = extractVersioningScript(path.join(__dirname, '../build/card templates/ankifx_mcq_front.html'));

        // Expose internal functions by locating the end of requestIdleCallback callback and injecting assignments
        const iifeIdx = scriptCode.lastIndexOf('})();');
        if (iifeIdx === -1) throw new Error('Could not find end of IIFE');
        const cbCloseIdx = scriptCode.lastIndexOf('});', iifeIdx);
        if (cbCloseIdx === -1) throw new Error('Could not find requestIdleCallback callback closing');

        const modifiedScript = scriptCode.substring(0, cbCloseIdx) +
            'window.parseVersion = parseVersion; window.isNewer = isNewer;\n});' +
            scriptCode.substring(cbCloseIdx + 3);

        const mockWindow = {
            requestIdleCallback: (cb) => cb(),
            requestAnimationFrame: (cb) => cb(),
            fetch: () => new Promise(() => { }), // Return pending promise to prevent network activity or XHR fallback
            AbortController: global.AbortController || function () { this.signal = {}; },
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => {}
        };
        mockWindow.window = mockWindow;

        const mockContext = {
            window: mockWindow,
            document: {
                getElementById: (id) => {
                    if (id === 'ankifx-template-meta') {
                        return {
                            getAttribute: (attr) => {
                                if (attr === 'data-template-version') return '1.0.0';
                                if (attr === 'data-template-name') return 'front_mcq';
                                return '';
                            }
                        };
                    }
                    return null;
                }
            },
            sessionStorage: { getItem: () => null }, // Do not dismiss so requestIdleCallback completes and registers functions
            localStorage: { getItem: () => null },
            setTimeout: () => { },
            clearTimeout: () => { },
            AbortController: global.AbortController || function () { this.signal = {}; },
            CustomEvent: class {
                constructor(type, init) {
                    this.type = type;
                    this.detail = init ? init.detail : null;
                }
            }
        };

        vm.runInNewContext(modifiedScript, mockContext);

        isNewer = mockContext.window.isNewer;
        assert.equal(typeof isNewer, 'function');
    });

    describe('isNewer semantic version comparison', () => {
        it('compares standard components correctly', () => {
            assert.ok(isNewer('1.2.0', '1.10.0'), '1.10.0 is newer than 1.2.0');
            assert.ok(!isNewer('1.10.0', '1.2.0'), '1.2.0 is not newer than 1.10.0');
            assert.ok(!isNewer('1.2.0', '1.2.0'), 'Equal versions are not newer');
        });

        it('handles missing components', () => {
            assert.ok(isNewer('1.2', '1.2.1'), '1.2.1 is newer than 1.2');
            assert.ok(!isNewer('1.2.1', '1.2'), '1.2 is not newer than 1.2.1');
            assert.ok(!isNewer('1.2', '1.2'), 'Equal versions with missing patch are not newer');
        });

        it('ignores leading v and build tags', () => {
            assert.ok(isNewer('v1.0.0', 'v1.0.1+build.123'), 'Build tag is ignored');
            assert.ok(!isNewer('v1.0.1+build.123', 'v1.0.1'), 'Build tags are equal');
        });

        it('respects pre-release tag hierarchy (alpha < beta < rc < stable)', () => {
            assert.ok(isNewer('1.0.0-alpha', '1.0.0-beta'), 'beta is newer than alpha');
            assert.ok(isNewer('1.0.0-beta', '1.0.0-rc'), 'rc is newer than beta');
            assert.ok(isNewer('1.0.0-rc', '1.0.0'), 'stable is newer than rc');
            assert.ok(!isNewer('1.0.0', '1.0.0-rc'), 'rc is older than stable');
            assert.ok(!isNewer('1.0.0-beta', '1.0.0-alpha'), 'alpha is older than beta');
        });

        it('compares pre-release numbers', () => {
            assert.ok(isNewer('1.0.0-beta.1', '1.0.0-beta.2'), 'beta.2 is newer than beta.1');
            assert.ok(!isNewer('1.0.0-beta.2', '1.0.0-beta.1'), 'beta.1 is older than beta.2');
        });

        it('handles invalid versions safely', () => {
            assert.equal(isNewer('invalid', '1.0.0'), true, 'Invalid is treated as 0.0.0, so 1.0.0 is newer');
            assert.equal(isNewer('1.0.0', 'invalid'), false, 'invalid is 0.0.0, which is older');
            assert.doesNotThrow(() => isNewer(null, undefined));
        });
    });
});

describe('Template Versioning System - DOM & Network Integration', () => {
    it('dispatches template status event when remote version is newer', (t) => {
        return new Promise((resolve, reject) => {
            const scriptCode = extractVersioningScript(path.join(__dirname, '../build/card templates/ankifx_mcq_front.html'));

            let eventDispatched = false;

            const mockWindow = {
                requestIdleCallback: (cb) => cb(),
                requestAnimationFrame: (cb) => cb(),
                fetch: (url) => {
                    try {
                        assert.ok(url.includes('_afx_version.json'));
                    } catch (e) {
                        reject(e);
                    }
                    return Promise.resolve({
                        status: 200,
                        text: () => Promise.resolve(JSON.stringify({
                            latestTemplateVersion: "1.1.0",
                            templates: {
                                front_mcq: "1.1.0"
                            },
                            changelog: "New visual themes"
                        }))
                    });
                },
                AbortController: global.AbortController || function () {
                    this.signal = {};
                },
                dispatchEvent: (event) => {
                    if (event && event.type === 'ankifx:template-status') {
                        try {
                            eventDispatched = true;
                            const status = event.detail;
                            assert.equal(status.name, 'front_mcq');
                            assert.equal(status.local, '1.0.0');
                            assert.equal(status.remote, '1.1.0');
                            assert.equal(status.isNewer, true);
                            assert.equal(status.changelog, 'New visual themes');
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    }
                },
                addEventListener: (evt, listener) => {
                    mockWindow.listeners = mockWindow.listeners || {};
                    mockWindow.listeners[evt] = mockWindow.listeners[evt] || [];
                    mockWindow.listeners[evt].push(listener);
                }
            };
            mockWindow.window = mockWindow;

            const mockContext = {
                window: mockWindow,
                document: {
                    getElementById: (id) => {
                        if (id === 'ankifx-template-meta') {
                            return {
                                getAttribute: (attr) => {
                                    if (attr === 'data-template-version') return '1.0.0'; // Local is older
                                    if (attr === 'data-template-name') return 'front_mcq';
                                    return '';
                                }
                            };
                        }
                        return null;
                    }
                },
                sessionStorage: {
                    getItem: () => null,
                    setItem: () => { }
                },
                localStorage: {
                    getItem: () => null,
                    setItem: () => { }
                },
                setTimeout: (cb) => cb(),
                clearTimeout: () => { },
                AbortController: global.AbortController || function () {
                    this.signal = {};
                },
                XMLHttpRequest: class {
                    open() { }
                    send() { }
                    abort() { }
                },
                CustomEvent: class {
                    constructor(type, init) {
                        this.type = type;
                        this.detail = init ? init.detail : null;
                    }
                }
            };

            try {
                vm.runInNewContext(scriptCode, mockContext);
            } catch (e) {
                reject(e);
            }
        });
    });

    it('fails silently and does not dispatch event if network is unreachable', (t) => {
        return new Promise((resolve, reject) => {
            const scriptCode = extractVersioningScript(path.join(__dirname, '../build/card templates/ankifx_mcq_front.html'));

            let eventDispatched = false;

            const mockWindow = {
                requestIdleCallback: (cb) => cb(),
                requestAnimationFrame: (cb) => cb(),
                fetch: () => Promise.reject(new Error('Network offline')),
                AbortController: global.AbortController || function () {
                    this.signal = {};
                },
                dispatchEvent: (event) => {
                    if (event && event.type === 'ankifx:template-status') {
                        eventDispatched = true;
                    }
                },
                addEventListener: () => {}
            };
            mockWindow.window = mockWindow;

            const mockContext = {
                window: mockWindow,
                document: {
                    getElementById: (id) => {
                        if (id === 'ankifx-template-meta') {
                            return {
                                getAttribute: (attr) => {
                                    if (attr === 'data-template-version') return '1.0.0';
                                    if (attr === 'data-template-name') return 'front_mcq';
                                    return '';
                                }
                            };
                        }
                        return null;
                    }
                },
                sessionStorage: { getItem: () => null },
                localStorage: { getItem: () => null },
                setTimeout: (cb) => cb(),
                clearTimeout: () => { },
                AbortController: global.AbortController || function () {
                    this.signal = {};
                },
                XMLHttpRequest: class {
                    open() { }
                    send() {
                        if (this.onerror) {
                            try {
                                this.onerror();
                            } catch (e) {
                                reject(e);
                            }
                        }
                    }
                    abort() { }
                },
                CustomEvent: class {
                    constructor(type, init) {
                        this.type = type;
                        this.detail = init ? init.detail : null;
                    }
                }
            };

            try {
                vm.runInNewContext(scriptCode, mockContext);

                // Wait a tick to confirm no event was dispatched
                setTimeout(() => {
                    try {
                        assert.ok(!eventDispatched, 'Event should not be dispatched if network fails');
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                }, 10);
            } catch (e) {
                reject(e);
            }
        });
    });

    it('handles malformed JSON response gracefully without event dispatch or crash', (t) => {
        return new Promise((resolve, reject) => {
            const scriptCode = extractVersioningScript(path.join(__dirname, '../build/card templates/ankifx_mcq_front.html'));

            let eventDispatched = false;

            const mockWindow = {
                requestIdleCallback: (cb) => cb(),
                requestAnimationFrame: (cb) => cb(),
                fetch: () => Promise.resolve({
                    status: 200,
                    text: () => Promise.resolve('{invalid json}')
                }),
                AbortController: global.AbortController || function () {
                    this.signal = {};
                },
                dispatchEvent: (event) => {
                    if (event && event.type === 'ankifx:template-status') {
                        eventDispatched = true;
                    }
                },
                addEventListener: () => {}
            };
            mockWindow.window = mockWindow;

            const mockContext = {
                window: mockWindow,
                document: {
                    getElementById: (id) => ({
                        getAttribute: (attr) => attr === 'data-template-version' ? '1.0.0' : 'front_mcq'
                    })
                },
                sessionStorage: { getItem: () => null },
                localStorage: { getItem: () => null },
                setTimeout: (cb) => cb(),
                clearTimeout: () => {},
                AbortController: global.AbortController || function () { this.signal = {}; },
                CustomEvent: class {
                    constructor(type, init) {
                        this.type = type;
                        this.detail = init ? init.detail : null;
                    }
                }
            };

            try {
                vm.runInNewContext(scriptCode, mockContext);
                setTimeout(() => {
                    try {
                        assert.ok(!eventDispatched, 'Event should not be dispatched for malformed JSON');
                        resolve();
                    } catch (e) {
                        reject(e);
                    }
                }, 10);
            } catch (e) {
                reject(e);
            }
        });
    });

    it('re-dispatches template status event when requested by late-loading engine', (t) => {
        return new Promise((resolve, reject) => {
            const scriptCode = extractVersioningScript(path.join(__dirname, '../build/card templates/ankifx_mcq_front.html'));

            let eventCount = 0;
            let capturedStatus = null;

            const mockWindow = {
                requestIdleCallback: (cb) => cb(),
                requestAnimationFrame: (cb) => cb(),
                fetch: () => Promise.resolve({
                    status: 200,
                    text: () => Promise.resolve(JSON.stringify({
                        latestTemplateVersion: "1.1.0",
                        templates: { front_mcq: "1.1.0" }
                    }))
                }),
                AbortController: global.AbortController || function () { this.signal = {}; },
                dispatchEvent: (event) => {
                    if (event && event.type === 'ankifx:template-status') {
                        eventCount++;
                        capturedStatus = event.detail;
                        if (eventCount === 2) {
                            try {
                                assert.equal(capturedStatus.isNewer, true);
                                assert.equal(capturedStatus.remote, '1.1.0');
                                resolve();
                            } catch (e) {
                                reject(e);
                            }
                        }
                    }
                },
                addEventListener: (evt, listener) => {
                    mockWindow.listeners = mockWindow.listeners || {};
                    mockWindow.listeners[evt] = mockWindow.listeners[evt] || [];
                    mockWindow.listeners[evt].push(listener);
                }
            };
            mockWindow.window = mockWindow;

            const mockContext = {
                window: mockWindow,
                document: {
                    getElementById: (id) => ({
                        getAttribute: (attr) => attr === 'data-template-version' ? '1.0.0' : 'front_mcq'
                    })
                },
                sessionStorage: { getItem: () => null },
                localStorage: { getItem: () => null },
                setTimeout: (cb) => cb(),
                clearTimeout: () => {},
                AbortController: global.AbortController || function () { this.signal = {}; },
                CustomEvent: class {
                    constructor(type, init) {
                        this.type = type;
                        this.detail = init ? init.detail : null;
                    }
                }
            };

            try {
                vm.runInNewContext(scriptCode, mockContext);

                // Wait for the first fetch and event dispatch
                setTimeout(() => {
                    try {
                        assert.equal(eventCount, 1, 'First event should be dispatched after fetch');
                        
                        // Fire request status event
                        const requestHandlers = mockWindow.listeners['ankifx:request-template-status'] || [];
                        assert.ok(requestHandlers.length > 0, 'Should have registered request handler');
                        
                        requestHandlers.forEach(handler => handler());
                    } catch (e) {
                        reject(e);
                    }
                }, 20);
            } catch (e) {
                reject(e);
            }
        });
    });
});
