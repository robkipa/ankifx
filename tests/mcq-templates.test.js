const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function extractMCQFrontScript() {
    const html = fs.readFileSync(path.join(__dirname, '../build/card templates/ankifx_mcq_front.html'), 'utf8');
    const startIdx = html.indexOf('// User-definable constant');
    const endIdx = html.indexOf('</script>', startIdx);
    return html.substring(startIdx, endIdx);
}

function extractMCQBackScript() {
    const html = fs.readFileSync(path.join(__dirname, '../build/card templates/ankifx_mcq_back.html'), 'utf8');
    const startIdx = html.indexOf('"use strict";');
    const endIdx = html.indexOf('</script>', startIdx);
    return html.substring(startIdx, endIdx);
}

describe('MCQ Card Templates', () => {
    it('front script shuffles and stores state in sessionStorage', () => {
        const scriptCode = extractMCQFrontScript();

        const sessionStorageStore = {};
        const mockSessionStorage = {
            getItem: (key) => sessionStorageStore[key] || null,
            setItem: (key, val) => { sessionStorageStore[key] = String(val); },
            removeItem: (key) => { delete sessionStorageStore[key]; }
        };

        const elements = [];
        const optA = {
            getAttribute: (attr) => attr === 'data-letter' ? 'A' : '',
            classList: { add: () => {}, remove: () => {} },
            addEventListener: () => {}
        };
        const optB = {
            getAttribute: (attr) => attr === 'data-letter' ? 'B' : '',
            classList: { add: () => {}, remove: () => {} },
            addEventListener: () => {}
        };

        const box = {
            getAttribute: (attr) => attr === 'data-qtype' ? 'single' : '',
            classList: { add: () => {}, remove: () => {} },
            querySelectorAll: (selector) => {
                if (selector === '.afx-mcq-opt') return [optA, optB];
                return [];
            },
            appendChild: (el) => { elements.push(el); }
        };

        const mockContext = {
            document: {
                getElementById: (id) => {
                    if (id === 'afxMcqOptions') return box;
                    if (id === 'Card_Type') return { textContent: '1' }; // Standard MCQ
                    return null;
                },
                addEventListener: () => {},
                removeEventListener: () => {}
            },
            sessionStorage: mockSessionStorage,
            triggerAnkiFX: () => {},
            setTimeout: (cb) => cb(),
            console
        };

        vm.runInNewContext(scriptCode + '\nrun();', mockContext);

        // Verify that shuffled order was stored in sessionStorage
        assert.ok(sessionStorageStore['ankifx_mcq_shuffled_order']);
        const order = JSON.parse(sessionStorageStore['ankifx_mcq_shuffled_order']);
        assert.equal(order.length, 2);
        assert.ok(order.includes('A'));
        assert.ok(order.includes('B'));
    });

    it('back script grades options correctly based on selection and Correct answer', () => {
        const scriptCode = extractMCQBackScript();

        // Helper helper function to run test for a specific mode
        const runTestForMode = (mode) => {
            const sessionStorageStore = {
                'ankifx_mcq_shuffled_order': JSON.stringify(['B', 'A']),
                'ankifx_mcq_selected': JSON.stringify(['B'])
            };

            const mockSessionStorage = {
                getItem: (key) => sessionStorageStore[key] || null,
                setItem: (key, val) => { sessionStorageStore[key] = String(val); },
                removeItem: (key) => { delete sessionStorageStore[key]; }
            };

            const classesA = new Set();
            const classesB = new Set();
            let badgeTextA = '';
            let badgeTextB = '';

            const optA = {
                getAttribute: (attr) => attr === 'data-letter' ? 'A' : '',
                classList: {
                    add: (c) => classesA.add(c),
                    remove: (c) => classesA.delete(c)
                },
                querySelector: (sel) => sel === '.afx-mcq-badge' ? { set textContent(t) { badgeTextA = t; } } : null
            };

            const optB = {
                getAttribute: (attr) => attr === 'data-letter' ? 'B' : '',
                classList: {
                    add: (c) => classesB.add(c),
                    remove: (c) => classesB.delete(c)
                },
                querySelector: (sel) => sel === '.afx-mcq-badge' ? { set textContent(t) { badgeTextB = t; } } : null
            };

            const box = {
                classList: { add: () => {}, remove: () => {} },
                querySelectorAll: (sel) => sel === '.afx-mcq-opt' ? [optA, optB] : [],
                appendChild: () => {}
            };

            const mockContext = {
                document: {
                    getElementById: (id) => {
                        if (id === 'afxMcqOptions') return box;
                        if (id === 'Card_Type') return { textContent: '1' }; // Standard MCQ
                        if (id === 'Q_solutions') return { textContent: '0 1' }; // Solutions: A=0, B=1 (i.e. B is correct)
                        if (id === 'afx-mcq-correct-letters-line') return { style: { display: '' } };
                        if (id === 'afx-mcq-correct-letters-output') return { set textContent(t) {} };
                        return null;
                    },
                    readyState: 'complete'
                },
                sessionStorage: mockSessionStorage,
                setTimeout: (cb) => cb(),
                console
            };

            // Force the GRADING_COLOR_MODE variable to the desired mode for testing
            const testScript = scriptCode.replace(/var GRADING_COLOR_MODE = '[^']+';/, `var GRADING_COLOR_MODE = '${mode}';`);
            vm.runInNewContext(testScript, mockContext);

            return { classesA, classesB, badgeTextA, badgeTextB };
        };

        // Test 'all' mode:
        const allResult = runTestForMode('all');
        assert.ok(allResult.classesB.has('correct'));
        assert.ok(allResult.classesA.has('correct'));
        assert.equal(allResult.badgeTextB, 'YOUR ANSWER \u2713');
        assert.equal(allResult.badgeTextA, 'CORRECTLY UNSELECTED \u2713');

        // Test 'diff' mode:
        const diffResult = runTestForMode('diff');
        assert.ok(diffResult.classesB.has('correct'));
        assert.ok(!diffResult.classesA.has('correct'));
        assert.ok(!diffResult.classesA.has('wrong'));
        assert.equal(diffResult.badgeTextB, 'YOUR ANSWER \u2713');
        assert.equal(diffResult.badgeTextA, '');
    });

    it('back script grades Kprim option cards correctly', () => {
        const scriptCode = extractMCQBackScript();

        const sessionStorageStore = {
            'ankifx_mcq_shuffled_order': JSON.stringify(['B', 'A']),
            'ankifx_mcq_selected': JSON.stringify({ 'B': 1, 'A': 0 }) // user chose Yes for B, No for A
        };

        const mockSessionStorage = {
            getItem: (key) => sessionStorageStore[key] || null,
            setItem: (key, val) => { sessionStorageStore[key] = String(val); },
            removeItem: (key) => { delete sessionStorageStore[key]; }
        };

        const classesA = new Set();
        const classesB = new Set();
        let badgeTextA = '';
        let badgeTextB = '';

        const optA = {
            getAttribute: (attr) => attr === 'data-letter' ? 'A' : '',
            classList: {
                add: (c) => classesA.add(c),
                remove: (c) => classesA.delete(c)
            },
            appendChild: () => {},
            querySelector: (sel) => sel === '.afx-mcq-badge' ? { set textContent(t) { badgeTextA = t; } } : null
        };

        const optB = {
            getAttribute: (attr) => attr === 'data-letter' ? 'B' : '',
            classList: {
                add: (c) => classesB.add(c),
                remove: (c) => classesB.delete(c)
            },
            appendChild: () => {},
            querySelector: (sel) => sel === '.afx-mcq-badge' ? { set textContent(t) { badgeTextB = t; } } : null
        };

        const box = {
            classList: { add: () => {}, remove: () => {} },
            querySelectorAll: (sel) => sel === '.afx-mcq-opt' ? [optA, optB] : [],
            appendChild: () => {}
        };

        const mockContext = {
            document: {
                getElementById: (id) => {
                    if (id === 'afxMcqOptions') return box;
                    if (id === 'Card_Type') return { textContent: '0' }; // 0 is Kprim
                    if (id === 'Q_solutions') return { textContent: '1 0' }; // Correct solutions: A=1 (Yes), B=0 (No)
                    if (id === 'afx-mcq-correct-letters-line') return { style: { display: '' } };
                    if (id === 'afx-mcq-correct-letters-output') return { set textContent(t) {} };
                    return null;
                },
                createElement: (tag) => {
                    return {
                        className: '',
                        innerHTML: '',
                        querySelector: (sel) => {
                            return { classList: { add: () => {} } };
                        }
                    };
                },
                readyState: 'complete'
            },
            sessionStorage: mockSessionStorage,
            setTimeout: (cb) => cb(),
            console
        };

        vm.runInNewContext(scriptCode, mockContext);

        // A correct is 1 (Yes), user selected 0 (No). A is wrong.
        // B correct is 0 (No), user selected 1 (Yes). B is wrong.
        assert.ok(classesA.has('wrong'));
        assert.ok(classesB.has('wrong'));
    });

    it('front script honors enableShuffle/ENABLE_SHUFFLE configs', () => {
        const scriptCode = extractMCQFrontScript();

        const runWithConfig = (config) => {
            const sessionStorageStore = {};
            const mockSessionStorage = {
                getItem: (key) => sessionStorageStore[key] || null,
                setItem: (key, val) => { sessionStorageStore[key] = String(val); },
                removeItem: (key) => { delete sessionStorageStore[key]; }
            };

            const elements = [];
            const optA = {
                getAttribute: (attr) => attr === 'data-letter' ? 'A' : '',
                classList: { add: () => {}, remove: () => {} },
                addEventListener: () => {}
            };
            const optB = {
                getAttribute: (attr) => attr === 'data-letter' ? 'B' : '',
                classList: { add: () => {}, remove: () => {} },
                addEventListener: () => {}
            };

            const box = {
                getAttribute: (attr) => attr === 'data-qtype' ? 'single' : '',
                classList: { add: () => {}, remove: () => {} },
                querySelectorAll: (selector) => {
                    if (selector === '.afx-mcq-opt') return [optA, optB];
                    return [];
                },
                appendChild: (el) => { elements.push(el); }
            };

            const mockContext = {
                document: {
                    getElementById: (id) => {
                        if (id === 'afxMcqOptions') return box;
                        if (id === 'Card_Type') return { textContent: '1' }; // Standard MCQ
                        return null;
                    },
                    addEventListener: () => {},
                    removeEventListener: () => {}
                },
                sessionStorage: mockSessionStorage,
                triggerAnkiFX: () => {},
                setTimeout: (cb) => cb(),
                console,
                AnkiFX_Config: config
            };

            vm.runInNewContext(scriptCode + '\nrun();', mockContext);
            return sessionStorageStore;
        };

        // 1. If enableShuffle is false, it should disable shuffle
        const store1 = runWithConfig({ enableShuffle: false });
        assert.equal(store1['ankifx_mcq_shuffle_enabled'], 'false');

        // 2. If ENABLE_SHUFFLE is false (string), it should disable shuffle
        const store2 = runWithConfig({ ENABLE_SHUFFLE: 'false' });
        assert.equal(store2['ankifx_mcq_shuffle_enabled'], 'false');

        // 3. If undefined/unspecified, it should default to true (enabled)
        const store3 = runWithConfig({});
        assert.equal(store3['ankifx_mcq_shuffle_enabled'], 'true');
    });
});
