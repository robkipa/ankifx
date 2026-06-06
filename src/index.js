import { AnkiFX } from './core/engine.js';

// Record evaluation history chronologically
window.AnkiFX_Eval_History = window.AnkiFX_Eval_History || [];

const currentEngine = window.AnkiFX;
const incomingVersion = AnkiFX.version;
const activeVersion = currentEngine && currentEngine.version;
const isAlreadyInitialized = currentEngine && currentEngine.initialized;

let isIgnored = false;
let ignoreReason = '';

const isNewer = !currentEngine || isNewerVersion(incomingVersion, activeVersion);

if (isNewer) {
    if (isAlreadyInitialized) {
        console.info(
            `[AnkiFX] Newer engine version v${incomingVersion} (${AnkiFX.source}) loaded late. ` +
            `Upgrading and replacing active engine v${activeVersion} (${currentEngine.source})...`
        );
        window.AnkiFX_Loader_Logs = window.AnkiFX_Loader_Logs || [];
        window.AnkiFX_Loader_Logs.push({
            msg: `[Loader] Late takeover triggered: Upgrading active engine from v${activeVersion} to v${incomingVersion}...`,
            level: 'info'
        });
        try {
            currentEngine.destroy();
            window.AnkiFX_Loader_Logs.push({
                msg: `[Loader] Active engine v${activeVersion} destroyed successfully.`,
                level: 'success'
            });
        } catch (e) {
            console.error(`[AnkiFX] Error destroying old engine: ${e.message}`);
            window.AnkiFX_Loader_Logs.push({
                msg: `[Loader] Error destroying active engine: ${e.message}`,
                level: 'error'
            });
        }
        window.AnkiFX = AnkiFX;
        try {
            window.AnkiFX.init(window.AnkiFX_Config);
            window.AnkiFX_Loader_Logs.push({
                msg: `[Loader] Upgraded AnkiFX engine to v${incomingVersion} successfully.`,
                level: 'success'
            });
        } catch (e) {
            console.error(`[AnkiFX] Error initializing upgraded engine: ${e.message}`);
            window.AnkiFX_Loader_Logs.push({
                msg: `[Loader] Upgraded AnkiFX engine initialization failed: ${e.message}`,
                level: 'error'
            });
        }
    } else {
        window.AnkiFX = AnkiFX;
    }
} else {
    isIgnored = true;
    ignoreReason = `ignored (older or equal version: active=${activeVersion}, incoming=${incomingVersion})`;
    console.info(
        `[AnkiFX] Incoming engine v${incomingVersion} is not newer than active engine v${activeVersion}. Ignoring.`
    );
}

window.AnkiFX_Eval_History.push({
    source: AnkiFX.source,
    version: AnkiFX.version,
    buildDate: AnkiFX.buildDate,
    time: new Date().toLocaleTimeString(),
    status: isIgnored ? ignoreReason : 'active'
});

function isNewerVersion(incoming, current) {
    // Clean version strings (strip trailing commit hash like 1.0.0-f3a2b -> 1.0.0)
    const clean = (v) => String(v).split('-')[0];
    const a = clean(incoming).split('.').map(Number);
    const b = clean(current).split('.').map(Number);
    for (let i = 0; i < 3; i++) {
        if ((a[i] || 0) > (b[i] || 0)) return true;
        if ((a[i] || 0) < (b[i] || 0)) return false;
    }
    return false; // equal or older -> keep local
}