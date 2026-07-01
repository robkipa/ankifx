import { EFFECTS } from '../effects/registry.js';

/**
 * Determines whether the marquee rAF loop needs to run.
 * Returns true if any of:
 *   1. Marquee is enabled AND has non-empty text (scrolling text animation)
 *   2. Active effect provides a drawOverlay function (e.g. aurora star twinkle)
 */
export function needsMarqueeLoop(state) {
    // Check for active drawOverlay on current effect
    if (state.currentEffectId && EFFECTS[state.currentEffectId]?.drawOverlay) {
        return true;
    }

    // Check for enabled marquee with text content
    if (state.marquee && state.marquee.enabled && state.marquee.text) {
        return true;
    }

    return false;
}

/**
 * Re-evaluates whether the marquee loop should be running and
 * starts or stops it accordingly.
 */
export function evaluateMarqueeLoop(state) {
    if (needsMarqueeLoop(state)) {
        startMarqueeLoop(state);
    } else {
        stopMarqueeLoop(state);
    }
}

/**
 * Starts the marquee/overlay rAF loop if not already running.
 * Only call this when needsMarqueeLoop() returns true.
 */
export function startMarqueeLoop(state) {
    if (state.marqueeInterval) return;

    let lastTime = 0;
    let frameCount = 0;

    const tick = (timestamp) => {
        if (timestamp === undefined) timestamp = performance.now();
        if (!lastTime) lastTime = timestamp;
        frameCount++;
        if (timestamp - lastTime >= 1000) {
            const fpsEl = document.getElementById('afx-global-fps');
            if (fpsEl) {
                fpsEl.textContent = `FPS: ${frameCount}`;
            }
            frameCount = 0;
            lastTime = timestamp;
        }

        if (state.marquee && state.ctxMarquee) {
            state.ctxMarquee.clearRect(0, 0, state.width, state.height);

            // Allow active effect to draw full-resolution overlays (e.g. stars) on top of blurred canvas
            if (state.currentEffectId && EFFECTS[state.currentEffectId]?.drawOverlay) {
                try {
                    EFFECTS[state.currentEffectId].drawOverlay(state.ctxMarquee, state.width, state.height, timestamp);
                } catch (e) {
                    console.error('[AnkiFX] drawOverlay error: ' + e.message);
                }
            }

            state.marquee.render(state.ctxMarquee, state.width, state.height);
        }
        state.marqueeInterval = requestAnimationFrame(tick);
    };
    state.marqueeInterval = requestAnimationFrame(tick);
}

/**
 * Stops the marquee rAF loop if it is currently running.
 */
export function stopMarqueeLoop(state) {
    if (state.marqueeInterval) {
        cancelAnimationFrame(state.marqueeInterval);
        state.marqueeInterval = null;
    }

    // Clear the FPS counter since we're idle
    const fpsEl = document.getElementById('afx-global-fps');
    if (fpsEl) {
        fpsEl.textContent = '';
    }
}
