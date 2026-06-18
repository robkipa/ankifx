import { EFFECTS } from '../effects/registry.js';

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
