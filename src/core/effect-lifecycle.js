import { EFFECTS } from '../effects/registry.js';
import { renderEffectControls } from './ui/controls.js';
import { effectDprFor, getAnkiMobileOffsets, isMarqueeEnabled } from './platform.js';

export function startEffect(state, config, container, position, activeEffect) {
    // Apply debug class
    if (activeEffect === 'debug') {
        container.classList.add('afx-debug-active');
    } else {
        container.classList.remove('afx-debug-active');
    }

    // Apply effect-specific class to HTML for styling (e.g., afx-effect-none)
    const html = document.documentElement;
    Array.from(html.classList).forEach(c => {
        if (c.startsWith('afx-effect-')) html.classList.remove(c);
    });
    html.classList.add(`afx-effect-${activeEffect}`);

    // Clean up previous active effect instance first!
    if (state.effectInstance) {
        if (typeof state.effectInstance.destroy === 'function') {
            try {
                state.effectInstance.destroy();
            } catch (err) {
                console.error('[AnkiFX] Error destroying previous active effect instance:', err);
            }
        }
        state.effectInstance = null;
    }

    // Call stop() on any old effect for Canvas 2D backward compatibility
    Object.values(EFFECTS).forEach(eff => {
        if (eff.id !== activeEffect && typeof eff.stop === 'function') {
            try {
                eff.stop();
            } catch (err) {}
        }
    });

    state.currentEffectId = activeEffect;

    const effect = EFFECTS[activeEffect];
    if (effect) {
        const offsets = getAnkiMobileOffsets();
        const dpr = effectDprFor(activeEffect, state.dpr);
        const sharedContexts = {
            gl: state.glContext,
            ctx2d: state.ctx2D,
            canvasGL: state.sharedGL,
            canvas2D: state.shared2D,
            width: state.width,
            height: state.height,
            dpr: dpr,
            topInset: offsets.ioHeader,
            visibleWidth: state.width,
            visibleHeight: state.height - offsets.ioHeader,
            visibleBounds: {
                top: offsets.ioHeader,
                bottom: state.height
            }
        };

        // Apply effect-specific marquee styling
        if (state.marquee) {
            state.marquee.updateStyles(effect.marqueeFont || {});
        }

        // Validate lifecycle contract if it's WebGL
        if (effect.isWebGL) {
            try {
                if (typeof effect.createInstance === 'function') {
                    state.effectInstance = effect.createInstance(sharedContexts, config);
                } else {
                    state.effectInstance = effect;
                }
            } catch (err) {
                console.error(`[AnkiFX] Error instantiating WebGL effect ${activeEffect}:`, err);
                startEffect(state, config, container, position, 'none');
                return;
            }

            const required = ['init', 'render', 'destroy', 'onContextLost', 'onContextRestored'];
            let isValid = true;
            for (const method of required) {
                if (!state.effectInstance || typeof state.effectInstance[method] !== 'function') {
                    console.error(`[AnkiFX] WebGL Effect contract validation failed for ${effect.id}: missing or invalid ${method}`);
                    isValid = false;
                    break;
                }
            }

            if (!isValid) {
                if (state.effectInstance && typeof state.effectInstance.destroy === 'function') {
                    try { state.effectInstance.destroy(); } catch (e) {}
                }
                state.effectInstance = null;
                // Fallback to none effect to prevent silent crash
                startEffect(state, config, container, position, 'none');
                return;
            }

            try {
                state.effectInstance.init(state.glContext);
            } catch (err) {
                console.error(`[AnkiFX] Error initializing WebGL effect ${activeEffect}:`, err);
                if (state.effectInstance && typeof state.effectInstance.destroy === 'function') {
                    try { state.effectInstance.destroy(); } catch (e) {}
                }
                state.effectInstance = null;
                startEffect(state, config, container, position, 'none');
                return;
            }
        } else {
            // Standard Canvas 2D effect
            effect.run(sharedContexts, config);
        }

        // Render dynamic controls for the active effect
        renderEffectControls(effect);

        // Respect toggle state on new effect start
        if (state.marquee) {
            state.marquee.enabled = isMarqueeEnabled();
        }
    } else {
        // Apply standard default marquee styling if no active effect
        if (state.marquee) {
            state.marquee.updateStyles({});
        }

        // Clear any dynamic controls from previous effect
        renderEffectControls(null);
    }
}

