import { Marquee } from './marquee.js';

let animationId = null;
let currentW, currentH;
const fontSize = 16;
let columns = [];

function initColumns() {
    const colCount = Math.floor(currentW / fontSize);
    columns = [];
    for(let i = 0; i < colCount; i++) {
        columns[i] = Math.random() * -100; // start offscreen
    }
}

export const effect = {
    id: 'matrix',
    name: 'Matrix',
    run: runMatrix,
    stop: stopMatrix,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
        initColumns();
    },
    preferredTrack: { trackTitle: "nightfall" }
};

export function runMatrix(contexts, marqueeText, position = 'bottom') {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;
    
    initColumns();

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*]*";

    const marquee = new Marquee(marqueeText, position, {
        color: '#0F0',
        shadowColor: '#0F0',
        shadowBlur: 10
    });

    function render() {
        // Fade out previous frame giving a glowing trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, currentW, currentH);

        ctx.fillStyle = '#0F0'; // matrix green
        ctx.font = fontSize + 'px monospace';

        for(let i = 0; i < columns.length; i++) {
            if (columns[i] > 0 || Math.random() > 0.95) {
                const char = chars.charAt(Math.floor(Math.random() * chars.length));
                const py = columns[i] * fontSize;
                
                ctx.fillText(char, i * fontSize, py);
                
                if (py > currentH && Math.random() > 0.975) {
                    columns[i] = 0;
                }
                columns[i]++;
            } else {
                columns[i] += 0.5; // wait for start delay
            }
        }

        // Marquee
        marquee.render(ctx, currentW, currentH);

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
