/**
 * Shared deck JSON validation (Node build + tests).
 * NOTE: CommonJS for Node build.js compatibility — source modules use ESM.
 */
function validateConfig(config, filename) {
    const required = ['deckTitle', 'marquee', 'defaultEffect'];
    for (const field of required) {
        if (config[field] === undefined) {
            throw new Error(`Config validation error in ${filename}: Missing required field "${field}"`);
        }
    }
    if (typeof config.deckTitle !== 'string') throw new Error(`Config validation error in ${filename}: "deckTitle" must be a string`);
    if (typeof config.marquee !== 'string') throw new Error(`Config validation error in ${filename}: "marquee" must be a string`);
    if (typeof config.defaultEffect !== 'string') throw new Error(`Config validation error in ${filename}: "defaultEffect" must be a string`);

    if (config.termsText !== undefined) {
        if (!Array.isArray(config.termsText) && typeof config.termsText !== 'string') {
            throw new Error(`Config validation error in ${filename}: "termsText" must be a string or an array of strings`);
        }
        if (Array.isArray(config.termsText)) {
            for (let i = 0; i < config.termsText.length; i++) {
                if (typeof config.termsText[i] !== 'string') {
                    throw new Error(`Config validation error in ${filename}: "termsText[${i}]" must be a string`);
                }
            }
        }
    }

    if (config.debug !== undefined && typeof config.debug !== 'boolean') throw new Error(`Config validation error in ${filename}: "debug" must be a boolean`);
    if (config.countdown !== undefined && typeof config.countdown !== 'number') throw new Error(`Config validation error in ${filename}: "countdown" must be a number`);
    if (config.marqueePosition !== undefined && config.marqueePosition !== 'top' && config.marqueePosition !== 'bottom') {
        throw new Error(`Config validation error in ${filename}: "marqueePosition" must be "top" or "bottom"`);
    }
}

function compileConfig(config) {
    const compiled = { ...config };
    let termsStr = '';
    if (Array.isArray(compiled.termsText)) {
        termsStr = compiled.termsText.join('\n');
    } else {
        termsStr = compiled.termsText || '';
    }
    compiled.termsText = Buffer.from(termsStr, 'utf8').toString('base64');
    return compiled;
}

module.exports = { validateConfig, compileConfig };
