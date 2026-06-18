// --- Stripe WebGl Gradient — AnkiFX effect adapter ---
import { Gradient, bindGradientEffect } from './lib/stripe-gradient-lib.js';

class GradientEffectInstance {
    constructor(contexts, config) {
        this.contexts = contexts;
        this.config = config;
        this.gradient = null;
        this.destroyed = false;
    }

    init(gl) {
        if (this.destroyed) return;
        this.gradient = new Gradient(
            this.contexts.canvasGL,
            gl,
            this.contexts.width,
            this.contexts.height
        );
        this.gradient.conf.playing = true;
        this.gradient.last = 0;
        this.gradient.animationId = requestAnimationFrame(this.gradient.animate);
    }

    render() {
        // Stripe gradient uses its own internal requestAnimationFrame loop,
        // so render() is a no-op as the loop handles rendering dynamically.
    }

    resize(w, h, dpr) {
        if (this.gradient) {
            this.gradient.width = w;
            this.gradient.height = h;
            this.gradient.resize();
        }
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;

        if (this.gradient) {
            this.gradient.destroy();
            this.gradient = null;
        }
        document.documentElement.style.removeProperty('--afx-body-color');
        document.documentElement.style.removeProperty('--afx-text-shadow');
    }

    onContextLost() {
        if (this.gradient) {
            this.gradient.onContextLost();
        }
    }

    onContextRestored(gl) {
        if (this.destroyed) return;
        if (this.gradient) {
            this.gradient.onContextRestored(gl);
        }
    }
}

let activeInstance = null;

export const effect = {
    id: 'gradient',
    name: 'Gradient',
    isWebGL: true,
    controls: [
        {
            type: 'button',
            id: 'gradient-randomize',
            label: '🎨 RANDOMIZE',
            onClick: () => {
                if (activeInstance && activeInstance.gradient) {
                    activeInstance.gradient.randomizeColors();
                }
            }
        }
    ],
    createInstance(contexts, config) {
        activeInstance = new GradientEffectInstance(contexts, config);
        return activeInstance;
    },
    run: (contexts, config) => {
        if (activeInstance) {
            activeInstance.destroy();
        }
        activeInstance = new GradientEffectInstance(contexts, config);
        activeInstance.init(contexts.gl);
    },
    stop: () => {
        if (activeInstance) {
            activeInstance.destroy();
            activeInstance = null;
        }
    },
    onResize: (w, h, dpr) => {
        if (activeInstance) {
            activeInstance.resize(w, h, dpr);
        }
    },
    marqueeFont: {
        color: '#E6E6FA',
        shadowColor: 'rgba(230, 230, 250, 0.6)',
        shadowBlur: 8
    }
};

bindGradientEffect(effect);

