import { Marquee } from './marquee.js';

let animationId = null;

export const effect = {
    id: 'matrix',
    name: 'Matrix',
    run: runMatrix,
    stop: stopMatrix,
    preferredTrack: { trackTitle: "nightfall" }
};

export function runMatrix(container, marqueeText, position = 'bottom') {
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
    
    // Matrix effect state
    const columns = [];
    const fontSize = 16;
    let time = 0;

    function resize() {
        w = canvas.width = container.clientWidth;
        h = canvas.height = container.clientHeight;
        
        const colCount = Math.floor(w / fontSize);
        for(let i = 0; i < colCount; i++) {
            columns[i] = Math.random() * -100; // start offscreen
        }
    }
    window.addEventListener('resize', resize);
    resize();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";

    const marquee = new Marquee(marqueeText, position, {
        color: '#0F0',
        shadowColor: '#0F0',
        shadowBlur: 10
    });

    function render() {
        // Fade out previous frame giving a glowing trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#0F0'; // matrix green
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < columns.length; i++) {
            if (columns[i] > 0 || Math.random() > 0.95) {
                const char = chars.charAt(Math.floor(Math.random() * chars.length));
                const py = columns[i] * fontSize;
                
                ctx.fillText(char, i * fontSize, py);
                
                if (py > h && Math.random() > 0.975) {
                    columns[i] = 0;
                }
                columns[i]++;
            } else {
                columns[i] += 0.5; // wait for start delay
            }
        }

        // Marquee
        marquee.render(ctx, w, h);

        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
    return marquee;
}

export function stopMatrix() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
