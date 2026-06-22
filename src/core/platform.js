/**
 * Platform detection and shared viewport helpers.
 */

export function isMobileUserAgent() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isIOSDevice() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent)
        || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}

// --- DPR caps ---

export function getGlDprCap() {
    return Math.min(window.devicePixelRatio || 1, 1.5);
}

export function getCanvasDprCap() {
    return Math.min(window.devicePixelRatio || 1, 2);
}

export function effectDprFor(activeEffectId, canvasDpr) {
    const glDpr = getGlDprCap();
    return (activeEffectId === 'mandelbrot' || activeEffectId === 'julia') ? glDpr : canvasDpr;
}

// --- AnkiMobile CSS variable offsets ---

export function getAnkiMobileOffsets() {
    const docEl = document.documentElement;
    const style = docEl ? getComputedStyle(docEl) : null;
    return {
        ioHeader: style ? (parseInt(style.getPropertyValue('--io-header')) || 0) : 0,
        topInset: style ? (parseInt(style.getPropertyValue('--top-inset')) || 0) : 0,
        bottomInset: style ? (parseInt(style.getPropertyValue('--bottom-inset')) || 0) : 0,
    };
}

export function isMarqueeEnabled() {
    return localStorage.getItem('ankifx_marquee_enabled') !== 'false';
}

export function isCardEnabled() {
    return localStorage.getItem('ankifx_card_enabled') !== 'false';
}

export function isSmallScreen() {
    return (window.innerWidth || document.documentElement.clientWidth || 800) < 480;
}

export function markTappable(el) {
    if (el && !el.classList.contains('tappable')) {
        el.classList.add('tappable');
    }
    return el;
}

export function isInteractiveTarget(target) {
    if (!target) return false;
    return !!target.closest(
        '.tappable, button, input, select, textarea, a, summary, video, audio'
    );
}
