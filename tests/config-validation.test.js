const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { validateConfig, compileConfig } = require('../scripts/validate-config.js');

describe('validateConfig', () => {
    it('accepts a minimal valid config', () => {
        validateConfig({
            deckTitle: 'Test',
            termsText: 'ok',
            marquee: 'hello',
            defaultEffect: 'none',
        }, 'test.json');
    });

    it('rejects missing deckTitle', () => {
        assert.throws(() => validateConfig({
            termsText: 'x',
            marquee: 'y',
            defaultEffect: 'none',
        }, 'bad.json'), /deckTitle/);
    });

    it('accepts termsText as string array', () => {
        validateConfig({
            deckTitle: 'T',
            termsText: ['<p>a</p>', '<p>b</p>'],
            marquee: 'm',
            defaultEffect: 'geometry',
        }, 'arr.json');
    });

    it('accepts config without termsText', () => {
        validateConfig({
            deckTitle: 'T',
            marquee: 'm',
            defaultEffect: 'none',
        }, 'noterms.json');
    });
});

describe('compileConfig', () => {
    it('base64-encodes termsText', () => {
        const out = compileConfig({
            deckTitle: 'T',
            termsText: '<b>hi</b>',
            marquee: 'm',
            defaultEffect: 'none',
        });
        assert.equal(typeof out.termsText, 'string');
        assert.equal(Buffer.from(out.termsText, 'base64').toString('utf8'), '<b>hi</b>');
    });

    it('handles missing termsText gracefully', () => {
        const out = compileConfig({
            deckTitle: 'T',
            marquee: 'm',
            defaultEffect: 'none',
        });
        assert.equal(out.termsText, '');
    });
});
