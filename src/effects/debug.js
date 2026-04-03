import { Marquee } from './marquee.js';

let animationId = null;

export const effect = {
    id: 'debug',
    name: 'DEBUG',
    run: runDebug,
    stop: stopDebug
};

export function runDebug(container, marqueeText, position = 'bottom') {
    const canvas = document.createElement('canvas');
    canvas.id = 'afx-debug-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%'; 
    canvas.style.height = '100%'; 
    canvas.style.zIndex = '-1';
    canvas.style.backgroundColor = '#000';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
        w = canvas.width = container.clientWidth;
        h = canvas.height = container.clientHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    const marquee = new Marquee(marqueeText, position, {
        color: '#00ff00',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    });

    function render() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);

        // Subgrid (10px)
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 10) {
            ctx.moveTo(x, 0); ctx.lineTo(x, h);
        }
        for (let y = 0; y <= h; y += 10) {
            ctx.moveTo(0, y); ctx.lineTo(w, y);
        }
        ctx.stroke();

        // Minor Grid (50px)
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 50) {
            ctx.moveTo(x, 0); ctx.lineTo(x, h);
        }
        for (let y = 0; y <= h; y += 50) {
            ctx.moveTo(0, y); ctx.lineTo(w, y);
        }
        ctx.stroke();

        // Major Grid (100px)
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 100) {
            ctx.moveTo(x, 0); ctx.lineTo(x, h);
        }
        for (let y = 0; y <= h; y += 100) {
            ctx.moveTo(0, y); ctx.lineTo(w, y);
        }
        ctx.stroke();

        // Draw Labels (every 50px)
        ctx.font = '9px monospace';
        for (let x = 0; x <= w; x += 50) {
            for (let y = 0; y <= h; y += 50) {
                const isMajor = (x % 100 === 0 && y % 100 === 0);
                ctx.fillStyle = isMajor ? '#0f0' : '#080';
                ctx.fillText(`${x},${y}`, x + 2, y + 10);
            }
        }

        // Current Crosshair (Center)
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h);
        ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.fillStyle = '#0ff';
        ctx.fillText(`CENTER: ${Math.floor(w/2)},${Math.floor(h/2)}`, w/2 + 5, h/2 - 5);

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
        ctx.fillText(`(${w},0)`, w - 65, 15);
        ctx.fillText(`(0,${h})`, 5, h - 5);
        ctx.fillText(`(${w},${h})`, w - 65, h - 5);

        // Bottom Edge Warning
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, h - 2);
        ctx.lineTo(w, h - 2);
        ctx.stroke();
        
        ctx.fillStyle = '#f00';
        ctx.font = 'bold 18px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('--- CANVAS BOTTOM ---', w / 2, h - 10);
        ctx.textAlign = 'left';

        // Right Edge Warning
        ctx.beginPath();
        ctx.moveTo(w - 2, 0);
        ctx.lineTo(w - 2, h);
        ctx.stroke();

        // Overlay marquee
        marquee.render(ctx, w, h);

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
