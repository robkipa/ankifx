import { Marquee } from './marquee.js';

let animationId = null;
let currentW, currentH;

export const effect = {
    id: 'geometry',
    name: 'Geometry',
    run: runGeometry,
    stop: stopGeometry,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
    }
};

export function runGeometry(contexts, marqueeText, position = 'bottom') {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;

    let time = 0;

    const marquee = new Marquee(marqueeText, position, {
        colorFn: (time, i) => `hsl(${(time * 120 + i * 4) % 360}, 100%, 55%)`,
        shadowColor: 'inherit',
        shadowBlur: 15
    });

    function render() {
        time += 0.012;

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = 'rgba(2, 2, 5, 0.3)';
        ctx.fillRect(0, 0, currentW, currentH);

        ctx.globalCompositeOperation = 'lighter';
        const cx = currentW / 2;
        const cy = currentH / 2;
        const maxRadius = Math.max(currentW, currentH) * 0.85;

        for (let i = 0; i < 35; i++) {
            const t = time + i * 0.05;
            const radius = (Math.sin(t * 0.8) * 0.5 + 0.5) * maxRadius + (i * 12);

            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(Math.sin(time * 0.3) * Math.PI + (i * 0.06));
            ctx.scale(
                Math.sin(time * 0.5 + i * 0.1) * 0.4 + 0.8,
                Math.cos(time * 0.4 + i * 0.1) * 0.4 + 0.8
            );

            ctx.beginPath();
            for (let j = 0; j <= 8; j++) {
                const angle = (j / 8) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            const hue = (time * 50 + i * 10) % 360;
            ctx.strokeStyle = `hsla(${hue}, 95%, 65%, 0.6)`;
            ctx.lineWidth = 4.0;
            ctx.stroke();
            ctx.restore();
        }

        ctx.globalCompositeOperation = 'source-over';
        marquee.render(ctx, currentW, currentH);
        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
    return marquee;
}

export function stopGeometry() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}