
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
    },
    marqueeFont: {
        color: '#ffffff',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    }
};

export function runNone(contexts, config) {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;

    // Theme handling is now purely CSS-based via .afx-effect-none on HTML element
    // and Anki's native .nightMode class.

    function render() {
        ctx.clearRect(0, 0, currentW, currentH);
        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
}

export function stopNone() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
