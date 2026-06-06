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

// --- Shared localStorage getters ---

export function isMarqueeEnabled() {
    return localStorage.getItem('ankifx_marquee_enabled') !== 'false';
}

export function isSmallScreen() {
    return (window.innerWidth || document.documentElement.clientWidth || 800) < 480;
}
