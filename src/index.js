import { AnkiFX } from './core/engine.js';
import { isNewerVersion, isNewerBuildDate } from './core/version.js';

// Record evaluation history chronologically
let initialEvalHistory = [];
try {
    const stored = sessionStorage.getItem('ankifx_eval_history');
    if (stored) {
        initialEvalHistory = JSON.parse(stored);
    }
} catch (e) {}
window.AnkiFX_Eval_History = window.AnkiFX_Eval_History || initialEvalHistory;

let initialLoaderLogs = [];
try {
    const stored = sessionStorage.getItem('ankifx_loader_logs');
    if (stored) {
        initialLoaderLogs = JSON.parse(stored);
    }
} catch (e) {}
window.AnkiFX_Loader_Logs = window.AnkiFX_Loader_Logs || initialLoaderLogs;

const pushLoaderLog = (log) => {
    window.AnkiFX_Loader_Logs.push(log);
    try {
        sessionStorage.setItem('ankifx_loader_logs', JSON.stringify(window.AnkiFX_Loader_Logs));
    } catch (e) {}
};

const currentEngine = window.AnkiFX;
const incomingVersion = AnkiFX.version;
const activeVersion = currentEngine && currentEngine.version;
const isAlreadyInitialized = currentEngine && currentEngine.initialized;

let isIgnored = false;
let ignoreReason = '';

const isVersionNewer = !currentEngine || isNewerVersion(incomingVersion, activeVersion);
const isVersionEqual = currentEngine && !isNewerVersion(incomingVersion, activeVersion) && !isNewerVersion(activeVersion, incomingVersion);
const isBuildNewer = isVersionEqual && isNewerBuildDate(AnkiFX.buildDate, currentEngine && currentEngine.buildDate);

const isNewer = isVersionNewer || isBuildNewer;

if (isNewer) {
    if (isAlreadyInitialized) {
        console.info(
            `[Loader] Newer engine version v${incomingVersion} (${AnkiFX.source}) loaded late. ` +
            `Upgrading and replacing active engine v${activeVersion} (${currentEngine.source})...`
        );
        pushLoaderLog({
            msg: `[Loader] Late takeover triggered: Upgrading active engine from v${activeVersion} to v${incomingVersion}...`,
            level: 'info'
        });
        const savedConfig = window.AnkiFX_Config;
        try {
            currentEngine.destroy();
            pushLoaderLog({
                msg: `[Loader] Active engine v${activeVersion} destroyed successfully.`,
                level: 'success'
            });
        } catch (e) {
            console.error(`[Loader] Error destroying old engine: ${e.message}`);
            pushLoaderLog({
                msg: `[Loader] Error destroying active engine: ${e.message}`,
                level: 'error'
            });
        }
        if (savedConfig) {
            window.AnkiFX_Config = savedConfig;
        }
        window.AnkiFX = AnkiFX;
        try {
            window.AnkiFX.init(window.AnkiFX_Config);
            pushLoaderLog({
                msg: `[Loader] Upgraded AnkiFX engine to v${incomingVersion} successfully.`,
                level: 'success'
            });
        } catch (e) {
            console.error(`[Loader] Error initializing upgraded engine: ${e.message}`);
            pushLoaderLog({
                msg: `[Loader] Upgraded AnkiFX engine initialization failed: ${e.message}`,
                level: 'error'
            });
        }
    } else {
        if (currentEngine) {
            console.info(
                `[Loader] Newer engine version v${incomingVersion} (${AnkiFX.source}) replacing ` +
                `uninitialized engine v${activeVersion} (${currentEngine.source}).`
            );
            pushLoaderLog({
                msg: `[Loader] Pre-init takeover: Replacing local v${activeVersion} with remote v${incomingVersion}...`,
                level: 'info'
            });
        }
        window.AnkiFX = AnkiFX;
    }
} else {
    isIgnored = true;
    const activeBuild = currentEngine && currentEngine.buildDate ? currentEngine.buildDate : 'unknown';
    const incomingBuild = AnkiFX.buildDate || 'unknown';
    ignoreReason = `ignored (older or equal version and build: active=${activeVersion}@${activeBuild}, incoming=${incomingVersion}@${incomingBuild})`;
    console.info(
        `[Loader] Incoming engine v${incomingVersion} (built ${incomingBuild}) is not newer than active engine v${activeVersion} (built ${activeBuild}). Ignoring.`
    );
}

window.AnkiFX_Eval_History.push({
    source: AnkiFX.source,
    version: AnkiFX.version,
    buildDate: AnkiFX.buildDate,
    time: new Date().toLocaleTimeString(),
    status: isIgnored ? ignoreReason : 'active'
});
try {
    sessionStorage.setItem('ankifx_eval_history', JSON.stringify(window.AnkiFX_Eval_History));
} catch (e) {}