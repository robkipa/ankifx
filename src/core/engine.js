import { EFFECTS } from '../effects/registry.js';
import { Marquee } from '../effects/marquee.js';
import styles from './afx_styles.css';
import { mergeAndHardenConfig, resolveActiveEffect, tryRestoreAgreedSession } from './config-merge.js';
import { startEffect } from './effect-lifecycle.js';
import { attachCardObserver, attachDockResizeObserver, attachLayoutHandlers, reparentNativeElements } from './layout-handlers.js';
import { startMarqueeLoop } from './marquee-loop.js';
import { handleResize, initViewportMonitoring } from './viewport.js';
import { injectOverlayUI } from './ui/overlay.js';
import { renderEffectControls, setControlValue } from './ui/controls.js';
import { isMarqueeEnabled } from './platform.js';

// --- Managed DOM element IDs (shared between init teardown and destroy) ---
const MANAGED_ELEMENT_IDS = [
    'ankifx-overlay', 'ankifx-background',
    'afx-btn-back', 'afx-btn-skip', 'afx-bottom-dock', 'afx-top-dock'
];

// --- Module-scoped singleton state ---
const state = {
    marquee: null,
    jukebox: null,
    sharedGL: null,
    shared2D: null,
    sharedMarquee: null,
    glContext: null,
    ctx2D: null,
    ctxMarquee: null,
    currentEffectId: null,
    dpr: 1,
    width: 0,
    height: 0,
    marqueeInterval: null,
    defaultMarqueeText: null,
    EFFECT_SONG_MAP: {},
    _layoutHandler: null,
    _resizeTimeout: null,
    _resizeInterval: null,
    observer: null,
    dockObserver: null,
    initialized: false,
};

// --- Core lifecycle ---

function init(templateOptions = {}) {
    console.log(`[AnkiFX] Init → v${AnkiFX.version} (${AnkiFX.source})`);

    const config = mergeAndHardenConfig(templateOptions);

    if (document.getElementById('ankifx-overlay')) {
        if (tryRestoreAgreedSession(state, config)) {
            state.initialized = true;
            return;
        }
    }

    document.documentElement.classList.remove('afx-scroll-lock');
    document.documentElement.classList.remove('afx-agreed');

    MANAGED_ELEMENT_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });

    state.defaultMarqueeText = config.marquee;

    state.EFFECT_SONG_MAP = {};
    Object.entries(EFFECTS).forEach(([id, eff]) => {
        if (eff && eff.preferredTrack) state.EFFECT_SONG_MAP[id] = eff.preferredTrack;
    });

    injectCSS();

    const activeEffect = resolveActiveEffect(config);
    const { background } = injectOverlayUI(state, config, activeEffect);

    attachDockResizeObserver(state);
    attachLayoutHandlers(state);
    handleResize(state);
    initViewportMonitoring(state);

    if (!state.marquee) {
        state.marquee = new Marquee(config.marquee, config.marqueePosition);
        startMarqueeLoop(state);
    } else {
        state.marquee.setText(config.marquee);
        state.marquee.setPosition(config.marqueePosition);
    }

    startEffect(state, config, background, config.marqueePosition, activeEffect);

    if (state.marquee) {
        state.marquee.enabled = isMarqueeEnabled();
    }

    state.initialized = true;
    attachCardObserver(state);
    reparentNativeElements();

    const scheduleCheck = window.requestIdleCallback || function (cb) { setTimeout(cb, 0); };
    scheduleCheck(() => {
        detectLegacyTemplate();
    });
}

function injectCSS() {
    if (document.getElementById('ankifx-styles')) return;
    const el = document.createElement('style');
    el.id = 'ankifx-styles';
    el.textContent = styles;
    document.head.appendChild(el);
}

function agree(overlay, deckTitle) {
    overlay.classList.add('afx-agreed-state');
    document.documentElement.classList.add('afx-agreed');
    document.documentElement.classList.remove('afx-scroll-lock');

    if (deckTitle) {
        try {
            localStorage.setItem(`ankifx_agreed_${deckTitle}`, 'true');
        } catch (e) { }
    }

    reparentNativeElements();
}

function destroy() {
    if (state.currentEffectId && EFFECTS[state.currentEffectId]?.stop) {
        EFFECTS[state.currentEffectId].stop();
    }

    if (state.jukebox) {
        state.jukebox.stop();
        state.jukebox = null;
    }

    if (state.marqueeInterval) {
        cancelAnimationFrame(state.marqueeInterval);
        state.marqueeInterval = null;
    }
    state.marquee = null;

    // Restore native Anki elements to body before removing overlay
    const flag = document.getElementById('_flag');
    const mark = document.getElementById('_mark');
    if (flag) document.body.appendChild(flag);
    if (mark) document.body.appendChild(mark);

    MANAGED_ELEMENT_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.remove();
    });

    const styleEl = document.getElementById('ankifx-styles');
    if (styleEl) styleEl.remove();

    document.documentElement.style.removeProperty('--afx-viewport-height');
    document.documentElement.style.removeProperty('--afx-dock-height');

    document.documentElement.classList.remove('afx-scroll-lock');
    document.documentElement.classList.remove('afx-agreed');
    Array.from(document.documentElement.classList).forEach(c => {
        if (c.startsWith('afx-effect-')) {
            document.documentElement.classList.remove(c);
        }
    });

    window.AnkiFX_Config = null;

    if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
    }

    if (state.dockObserver) {
        state.dockObserver.disconnect();
        state.dockObserver = null;
    }

    if (state._layoutHandler) {
        window.removeEventListener('orientationchange', state._layoutHandler);
        window.removeEventListener('resize', state._layoutHandler);
        state._layoutHandler = null;
    }
    if (state._resizeTimeout) {
        clearTimeout(state._resizeTimeout);
        state._resizeTimeout = null;
    }
    if (state._resizeInterval) {
        clearInterval(state._resizeInterval);
        state._resizeInterval = null;
    }

    state.currentEffectId = null;
    state.initialized = false;

    const legacyToast = document.getElementById('afx-legacy-toast');
    if (legacyToast) legacyToast.remove();

    console.log('[AnkiFX] Destroyed.');
}

// --- Legacy template migration detection and toast system ---
const inMemoryStorage = {};

function getSessionValue(key) {
    try {
        if (typeof sessionStorage !== 'undefined') {
            return sessionStorage.getItem(key);
        }
    } catch (e) { }
    return null;
}

function getLocalValue(key) {
    try {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(key);
        }
    } catch (e) { }
    return null;
}

function setSessionValue(key, val) {
    try {
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem(key, val);
            return true;
        }
    } catch (e) { }
    return false;
}

function setLocalValue(key, val) {
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, val);
            return true;
        }
    } catch (e) { }
    return false;
}

function isToastShown(templateName) {
    const key = `afx_legacy_toast_${templateName}`;

    const sessionVal = getSessionValue(key);
    if (sessionVal !== null) {
        return sessionVal === 'true';
    }

    const localVal = getLocalValue(key);
    if (localVal !== null) {
        return localVal === 'true';
    }

    return !!inMemoryStorage[key];
}

function setToastShown(templateName) {
    const key = `afx_legacy_toast_${templateName}`;

    if (setSessionValue(key, 'true')) {
        return;
    }
    if (setLocalValue(key, 'true')) {
        return;
    }
    inMemoryStorage[key] = true;
}

export function detectLegacyTemplate() {
    if (!window.AnkiFX || !window.AnkiFX.initialized) return;

    const metaEl = document.getElementById('ankifx-template-meta');
    let isLegacy = false;
    let templateName = 'unknown';

    if (!metaEl) {
        isLegacy = true;
    } else {
        const name = metaEl.getAttribute('data-template-name');
        const version = metaEl.getAttribute('data-template-version');

        if (!name) {
            isLegacy = true;
        } else {
            templateName = name.trim();
        }

        if (!version || version.trim() === '') {
            isLegacy = true;
        }
    }

    if (isLegacy) {
        showLegacyMigrationToast(templateName);
    }
}

export function showLegacyMigrationToast(templateName = 'unknown') {
    if (isToastShown(templateName)) return;
    if (document.getElementById('afx-legacy-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'afx-legacy-toast';
    toast.className = 'afx-legacy-toast-container';

    toast.innerHTML = `
        <div class="afx-legacy-toast-content">
            <div class="afx-legacy-toast-title">Legacy Template Detected</div>
            <div>
                An update is required for full AnkiFX compatibility.<br>
                Please see the <a class="afx-legacy-toast-link" href="https://github.com/robkipa/ankifx/blob/dev/docs/template-migration-guide.md" target="_blank">Template Update Guide</a> for step-by-step instructions.
            </div>
        </div>
        <button class="afx-legacy-toast-close" title="Dismiss">&times;</button>
    `;

    // Save persistence immediately upon display
    setToastShown(templateName);

    const closeBtn = toast.querySelector('.afx-legacy-toast-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toast.classList.remove('afx-legacy-visible');
        setTimeout(() => {
            toast.remove();
        }, 400);
    });

    const link = toast.querySelector('.afx-legacy-toast-link');
    if (link) {
        link.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Prevent touch/click event propagation to block card flips/mcq interactions
    const stopProps = (e) => e.stopPropagation();
    ['touchstart', 'touchend', 'mousedown', 'mouseup', 'click'].forEach((evt) => {
        toast.addEventListener(evt, stopProps, { passive: true });
    });

    document.body.appendChild(toast);

    // Trigger visual entry animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.classList.add('afx-legacy-visible');
        });
    });
}

// --- Source detection ---
let detectedSource = 'local';
try {
    let scriptUrl = (typeof __ankifx_script_src === 'string') ? __ankifx_script_src : '';
    if (!scriptUrl) {
        const stack = new Error().stack || '';
        const matches = stack.match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);
        if (matches && matches.length > 0) {
            for (let i = 0; i < matches.length; i++) {
                if (matches[i].includes('ankifx')) {
                    scriptUrl = matches[i];
                    break;
                }
            }
        }
    }
    if (scriptUrl) {
        if (scriptUrl.includes('cdn.jsdelivr.net') || scriptUrl.includes('github') || scriptUrl.includes('rawgit') || scriptUrl.includes('githack')) {
            detectedSource = 'remote';
        } else {
            detectedSource = 'local';
        }
    }
} catch (e) {
    detectedSource = 'detection-failed';
}

const _version = process.env.ANKIFX_VERSION || '1.0.0-dev';
const _buildDate = process.env.BUILD_DATE || 'development';
const _source = detectedSource;

// --- Public API (assigned to window.AnkiFX by index.js) ---
export const AnkiFX = {
    init,
    destroy,
    agree,
    injectCSS,
    handleResize: () => handleResize(state),
    startEffect: (config, container, position, activeEffect) => startEffect(state, config, container, position, activeEffect),
    startMarqueeLoop: () => startMarqueeLoop(state),
    renderEffectControls,
    setControlValue,
    detectLegacyTemplate,
    showLegacyMigrationToast,
    get version() { return _version; },
    get buildDate() { return _buildDate; },
    get source() { return _source; },
    get marquee() { return state.marquee; },
    set marquee(v) { state.marquee = v; },
    get jukebox() { return state.jukebox; },
    set jukebox(v) { state.jukebox = v; },
    get currentEffectId() { return state.currentEffectId; },
    get defaultMarqueeText() { return state.defaultMarqueeText; },
    get EFFECT_SONG_MAP() { return state.EFFECT_SONG_MAP; },
    get initialized() { return !!state.initialized; },
};
