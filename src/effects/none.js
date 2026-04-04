import { Marquee } from './marquee.js';

let animationId = null;
let currentW, currentH;

export const effect = {
    id: 'none',
    name: 'None',
    run: runNone,
    stop: stopNone,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
    }
};

export function runNone(contexts, marqueeText, position = 'bottom') {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;

    // 1. Detect Anki Theme (Night Mode)
    const isNightMode = document.body.classList.contains('nightMode') || 
                        document.body.classList.contains('night_mode') ||
                        window.matchMedia('(prefers-color-scheme: dark)').matches;

    // 2. Apply theme-specific colors
    if (isNightMode) {
        document.documentElement.style.setProperty('--afx-body-bg', '#2c2c2c', 'important');
        document.documentElement.style.setProperty('--afx-body-color', '#ffffff', 'important');
    } else {
        document.documentElement.style.setProperty('--afx-body-bg', '#f5f5f5', 'important');
        document.documentElement.style.setProperty('--afx-body-color', '#000000', 'important');
    }

    // 3. Initialize Marquee
    const marquee = new Marquee(marqueeText, position, {
        color: isNightMode ? '#ffffff' : '#000000',
        shadowColor: isNightMode ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
        shadowBlur: 5
    });

    function render() {
        ctx.clearRect(0, 0, currentW, currentH);
        marquee.render(ctx, currentW, currentH);
        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    return marquee;
}

export function stopNone() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    document.documentElement.style.removeProperty('--afx-body-bg');
    document.documentElement.style.removeProperty('--afx-body-color');
}
