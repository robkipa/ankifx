import { Marquee } from './marquee.js';

let animationId = null;

export const effect = {
    id: 'none',
    name: 'None',
    run: runNone,
    stop: stopNone
};

export function runNone(container, marqueeText, position = 'bottom') {
    // 1. Force transparency to reveal Anki card background
    document.documentElement.style.setProperty('--afx-body-bg', 'transparent');
    document.documentElement.style.setProperty('--afx-none-bg', 'transparent');

    // 2. Eruda Integration for mobile debugging
    if (!window.eruda) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script.onload = () => {
            if (window.eruda) window.eruda.init();
        };
        document.head.appendChild(script);
    } else {
        try { window.eruda.init(); } catch(e) {}
    }

    // 3. Create a clean transparent canvas for the marquee
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        const rect = container.getBoundingClientRect();
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 4. Initialize Marquee
    const marquee = new Marquee(marqueeText, position, {
        color: '#ffffff',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    });

    function render() {
        ctx.clearRect(0, 0, w, h);
        marquee.render(ctx, w, h);
        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    // Return the marquee instance so the engine can control its enabled state
    return marquee;
}

export function stopNone() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    // Restore defaults when switching away
    document.documentElement.style.removeProperty('--afx-body-bg');
    document.documentElement.style.removeProperty('--afx-none-bg');
    
    // Hide Eruda if it exists, to keep the UI clean when switching back to animations
    if (window.eruda) {
        try { window.eruda.hide(); } catch(e) {}
    }
}
