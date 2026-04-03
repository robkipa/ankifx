import { Marquee } from './marquee.js';

let animationId = null;

export const effect = {
    id: 'plasma',
    name: 'Plasma',
    run: runPlasma,
    stop: stopPlasma
};

export function runPlasma(container, marqueeText, position = 'bottom') {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: false });
    let w, h;

    function resize() {
        w = canvas.width = container.clientWidth;
        h = canvas.height = container.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let time = 0;

    const marquee = new Marquee(marqueeText, position, {
        color: '#ffffff',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    });

    function render() {
        time += 0.05;
        
        // Render plasma using blocks for performance
        const blockSize = 15;
        const cols = Math.ceil(w / blockSize);
        const rows = Math.ceil(h / blockSize);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = x * blockSize;
                const cy = y * blockSize;

                const v1 = Math.sin(cx * 0.005 + time);
                const v2 = Math.sin(cy * 0.005 + time);
                const v3 = Math.sin((cx + cy) * 0.005 + time);
                const v4 = Math.sin(Math.sqrt(cx * cx + cy * cy) * 0.005 + time);
                
                const value = v1 + v2 + v3 + v4; // roughly -4 to 4
                // Map value to hue + saturation (warm retro gradients)
                const hue = Math.floor((value + 4) * 45); 

                ctx.fillStyle = `hsl(${hue}, 80%, 40%)`;
                ctx.fillRect(cx, cy, blockSize, blockSize);
            }
        }

        // Marquee
        marquee.render(ctx, w, h);

        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
    return marquee;
}

export function stopPlasma() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
