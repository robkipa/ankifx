const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

describe('build smoke', () => {
    it('produces build/_ankifx.js', () => {
        execSync('node build.js', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
        const out = path.join(__dirname, '..', 'build', '_ankifx.js');
        assert.ok(fs.existsSync(out));
        assert.ok(fs.statSync(out).size > 10000);
    });

    it('registry lists expected effect ids', () => {
        const registry = fs.readFileSync(path.join(__dirname, '..', 'src', 'effects', 'registry.js'), 'utf8');
        assert.match(registry, /'gradient':/);
        assert.match(registry, /'julia':/);
        assert.doesNotMatch(registry, /stripe-gradient-lib/);
    });

    it('destroy() does not reference tuner state or throw', () => {
        const bundlePath = path.join(__dirname, '..', 'build', '_ankifx.js');
        const code = fs.readFileSync(bundlePath, 'utf8');

        // Mock minimal DOM
        const mockWindow = {
            AnkiFX_Eval_History: [],
            addEventListener: () => {},
            removeEventListener: () => {},
            cancelAnimationFrame: () => {},
        };
        const mockDocument = {
            currentScript: { src: 'http://localhost/ankifx.js' },
            getElementById: (id) => {
                if (id === '_flag' || id === '_mark') {
                    return { parentNode: { removeChild: () => {} } };
                }
                return null;
            },
            createElement: () => ({ textContent: '', id: '' }),
            head: { appendChild: () => {} },
            body: { appendChild: () => {} },
            documentElement: {
                classList: {
                    remove: () => {},
                    forEach: (cb) => {
                        cb('afx-effect-none');
                    }
                },
                style: {
                    removeProperty: (name) => {
                        assert.ok(name !== '--tuner-height', 'Should not remove tuner height variable');
                    }
                }
            }
        };

        const context = {
            window: mockWindow,
            document: mockDocument,
            console: { log: () => {}, warn: () => {} },
            process: { env: {} },
            localStorage: {
                getItem: () => null,
                setItem: () => {},
            },
            cancelAnimationFrame: () => {},
        };
        context.window.document = mockDocument;

        const vm = require('node:vm');
        vm.createContext(context);
        vm.runInContext(code, context);

        assert.ok(context.window.AnkiFX);
        assert.equal(typeof context.window.AnkiFX.destroy, 'function');

        // Run destroy and verify it doesn't throw and does not reference tuner
        assert.doesNotThrow(() => {
            context.window.AnkiFX.destroy();
        });
    });

    it('destroy() clears MCQ sessionStorage keys', () => {
        const bundlePath = path.join(__dirname, '..', 'build', '_ankifx.js');
        const code = fs.readFileSync(bundlePath, 'utf8');

        const sessionStorageStore = {
            'ankifx_mcq_selected': '["A"]',
            'ankifx_mcq_shuffled_order': '["B","A"]',
            'ankifx_mcq_question_text': 'Question?',
            'ankifx_mcq_shuffle_enabled': 'true',
            'other_key': 'preserve_me'
        };

        const mockSessionStorage = {
            getItem: (key) => sessionStorageStore[key] || null,
            setItem: (key, val) => { sessionStorageStore[key] = String(val); },
            removeItem: (key) => { delete sessionStorageStore[key]; }
        };

        // Mock minimal DOM
        const mockWindow = {
            AnkiFX_Eval_History: [],
            addEventListener: () => {},
            removeEventListener: () => {},
            cancelAnimationFrame: () => {},
        };
        const mockDocument = {
            currentScript: { src: 'http://localhost/ankifx.js' },
            getElementById: (id) => {
                if (id === '_flag' || id === '_mark') {
                    return { parentNode: { removeChild: () => {} } };
                }
                return null;
            },
            createElement: () => ({ textContent: '', id: '' }),
            head: { appendChild: () => {} },
            body: { appendChild: () => {} },
            documentElement: {
                classList: {
                    remove: () => {},
                    forEach: (cb) => {
                        cb('afx-effect-none');
                    }
                },
                style: {
                    removeProperty: () => {}
                }
            }
        };

        const context = {
            window: mockWindow,
            document: mockDocument,
            sessionStorage: mockSessionStorage,
            console: { log: () => {}, warn: () => {} },
            process: { env: {} },
            localStorage: {
                getItem: () => null,
                setItem: () => {},
            },
            cancelAnimationFrame: () => {},
        };
        context.window.document = mockDocument;

        const vm = require('node:vm');
        vm.createContext(context);
        vm.runInContext(code, context);

        assert.ok(context.window.AnkiFX);
        assert.equal(typeof context.window.AnkiFX.destroy, 'function');

        // Run destroy
        context.window.AnkiFX.destroy();

        // Verify MCQ keys are cleared
        assert.equal(sessionStorageStore['ankifx_mcq_selected'], undefined);
        assert.equal(sessionStorageStore['ankifx_mcq_shuffled_order'], undefined);
        assert.equal(sessionStorageStore['ankifx_mcq_question_text'], undefined);
        assert.equal(sessionStorageStore['ankifx_mcq_shuffle_enabled'], undefined);

        // Verify other keys are preserved
        assert.equal(sessionStorageStore['other_key'], 'preserve_me');
    });
});

