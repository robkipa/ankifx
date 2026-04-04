import { Marquee } from './marquee.js';

let animationId = null;
let currentW, currentH;

export const effect = {
    id: 'debug',
    name: 'DEBUG',
    run: runDebug,
    stop: stopDebug,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
    }
};

export function runDebug(contexts, marqueeText, position = 'bottom') {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;

    const marquee = new Marquee(marqueeText, position, {
        color: '#00ff00',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    });

    function render() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, currentW, currentH);

        // Subgrid (10px)
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= currentW; x += 10) {
            ctx.moveTo(x, 0); ctx.lineTo(x, currentH);
        }
        for (let y = 0; y <= currentH; y += 10) {
            ctx.moveTo(0, y); ctx.lineTo(currentW, y);
        }
        ctx.stroke();

        // Minor Grid (50px)
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= currentW; x += 50) {
            ctx.moveTo(x, 0); ctx.lineTo(x, currentH);
        }
        for (let y = 0; y <= currentH; y += 50) {
            ctx.moveTo(0, y); ctx.lineTo(currentW, y);
        }
        ctx.stroke();

        // Major Grid (100px)
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= currentW; x += 100) {
            ctx.moveTo(x, 0); ctx.lineTo(x, currentH);
        }
        for (let y = 0; y <= currentH; y += 100) {
            ctx.moveTo(0, y); ctx.lineTo(currentW, y);
        }
        ctx.stroke();

        // Draw Labels (every 50px)
        ctx.font = '9px monospace';
        for (let x = 0; x <= currentW; x += 50) {
            for (let y = 0; y <= currentH; y += 50) {
                const isMajor = (x % 100 === 0 && y % 100 === 0);
                ctx.fillStyle = isMajor ? '#0f0' : '#080';
                ctx.fillText(`${x},${y}`, x + 2, y + 10);
            }
        }

        // Current Crosshair (Center)
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentW / 2, 0); ctx.lineTo(currentW / 2, currentH);
        ctx.moveTo(0, currentH / 2); ctx.lineTo(currentW, currentH / 2);
        ctx.stroke();
        ctx.fillStyle = '#0ff';
        ctx.fillText(`CENTER: ${Math.floor(currentW/2)},${Math.floor(currentH/2)}`, currentW/2 + 5, currentH/2 - 5);

        // Draw Viewport Info
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px monospace';
        const info = [
            `window: ${window.innerWidth}x${window.innerHeight}`,
            `screen: ${screen.width}x${screen.height}`,
            `dpr: ${window.devicePixelRatio}`,
            `doc: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
            `orient: ${window.orientation || 'N/A'}`
        ];
        info.forEach((text, i) => {
            ctx.fillText(text, 20, 100 + i * 20);
        });

        // Corner Markers
        ctx.fillStyle = '#f0f';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`(0,0)`, 5, 15);
        ctx.fillText(`(${currentW},0)`, currentW - 65, 15);
        ctx.fillText(`(0,${currentH})`, 5, currentH - 5);
        ctx.fillText(`(${currentW},${currentH})`, currentW - 65, currentH - 5);

        // Bottom Edge Warning
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, currentH - 2);
        ctx.lineTo(currentW, currentH - 2);
        ctx.stroke();
        
        ctx.fillStyle = '#f00';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('--- CANVAS BOTTOM ---', currentW / 2, currentH - 10);
        ctx.textAlign = 'left';

        // Right Edge Warning
        ctx.beginPath();
        ctx.moveTo(currentW - 2, 0);
        ctx.lineTo(currentW - 2, currentH);
        ctx.stroke();

        // Overlay marquee
        marquee.render(ctx, currentW, currentH);

        animationId = requestAnimationFrame(render);
    }

    render();
    return marquee;
}

export function stopDebug() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
