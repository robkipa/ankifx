import { EFFECTS } from '../effects/registry.js';
import { getAnkiMobileOffsets, getCanvasDprCap } from './platform.js';

const DEFAULT_CONFIG = {
    deckTitle: "AnkiFX Deck",
    deckAuthor: "Anonymous",
    termsText: "No terms provided.",
    sources: [],
    marquee: "ANKIFX ENGINE INITIALIZED ...",
    defaultEffect: "geometry",
    debug: false,
    countdown: 30,
    marqueePosition: 'top',
};

export function mergeAndHardenConfig(templateOptions = {}) {
    const config = {
        ...DEFAULT_CONFIG,
        ...(window.AnkiFX_Config || {}),
        ...templateOptions,
    };

    if (!Array.isArray(config.sources)) config.sources = [];
    const parsedCountdown = parseInt(config.countdown, 10);
    config.countdown = isNaN(parsedCountdown) ? 30 : Math.max(0, parsedCountdown);

    config.isConfigFileError = typeof config.termsText !== 'string'
        || config.termsText.trim() === ""
        || config.termsText === "No terms provided.";

    return config;
}

export function resolveActiveEffect(config) {
    const cardDefault = window.AnkiFX_Config?.defaultEffect;
    let activeEffect;

    if (cardDefault) {
        activeEffect = cardDefault;
        localStorage.setItem('ankifx_preferred_effect', activeEffect);
    } else {
        activeEffect = localStorage.getItem('ankifx_preferred_effect') || config.defaultEffect || 'geometry';
    }

    if (!EFFECTS[activeEffect]) {
        console.warn(`[AnkiFX] Unknown effect "${activeEffect}" — falling back to "${config.defaultEffect || 'geometry'}".`);
        activeEffect = config.defaultEffect || 'geometry';
        if (!EFFECTS[activeEffect]) {
            activeEffect = Object.keys(EFFECTS)[0] || 'geometry';
        }
        localStorage.setItem('ankifx_preferred_effect', activeEffect);
    }

    return activeEffect;
}

/** @returns {boolean} true if init should stop early (agreed session restored) */
export function tryRestoreAgreedSession(state, config) {
    const overlay = document.getElementById('ankifx-overlay');
    if (!overlay || !overlay.classList.contains('afx-agreed-state')) {
        return false;
    }

    // Canvas references may have been lost — re-acquire
    if (!state.sharedGL) state.sharedGL = document.getElementById('afx-shared-gl');
    if (!state.shared2D) state.shared2D = document.getElementById('afx-shared-2d');
    if (!state.sharedMarquee) state.sharedMarquee = document.getElementById('afx-shared-marquee');

    if (state.sharedGL && !state.glContext) {
        state.glContext = state.sharedGL.getContext('webgl', { alpha: false, antialias: false });
    }
    if (state.shared2D && !state.ctx2D) {
        state.ctx2D = state.shared2D.getContext('2d');
    }
    if (state.sharedMarquee && !state.ctxMarquee) {
        state.ctxMarquee = state.sharedMarquee.getContext('2d');
    }

    const background = document.getElementById('ankifx-background');
    if (background) {
        const rect = background.getBoundingClientRect();
        state.width = rect.width;
        const offsets = getAnkiMobileOffsets();
        state.height = document.documentElement.clientHeight + offsets.ioHeader;
        state.dpr = getCanvasDprCap();
    }

    if (!state.currentEffectId) {
        const activeClass = Array.from(document.documentElement.classList).find(c => c.startsWith('afx-effect-'));
        if (activeClass) {
            state.currentEffectId = activeClass.replace('afx-effect-', '');
        }
    }

    state.defaultMarqueeText = config.marquee;
    if (state.marquee) {
        state.marquee.setText(config.marquee);
        state.marquee.setPosition(config.marqueePosition);
    }

    const titleEl = document.getElementById('afx-deck-title');
    if (titleEl) titleEl.textContent = config.deckTitle;

    return true;
}
