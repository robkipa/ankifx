
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
    },
    marqueeFont: {
        color: '#00ff00',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    }
};

export function runDebug(contexts, config) {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;




    function render() {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, currentW, currentH);




        // Draw Viewport Info
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px monospace';
        const info = [
            `window: ${window.innerWidth}x${window.innerHeight}`,
            `screen: ${screen.width}x${screen.height}`,
            `dpr: ${window.devicePixelRatio}`,
            `doc: ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
            `orient: ${window.orientation || 'N/A'}`
        ];
        info.forEach((text, i) => {
            ctx.fillText(text, 20, 90 + i * 18);
        });

        // Draw AnkiFX Engine Diagnostics
        ctx.fillStyle = '#0f0';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('--- AnkiFX DIAGNOSTICS ---', 20, 195);
        ctx.fillStyle = '#fff';
        ctx.font = '12px monospace';
        ctx.fillText(`Version:  ${window.AnkiFX?.version || '1.0.0-dev'}`, 20, 215);
        ctx.fillText(`Source:   ${window.AnkiFX?.source || 'unknown'}`, 20, 230);
        ctx.fillText(`Built:    ${window.AnkiFX?.buildDate || 'development'}`, 20, 245);

        // Draw Engine Evaluation History
        ctx.fillStyle = '#0ff';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('--- ENGINE EVALUATION HISTORY ---', 20, 265);

        const history = window.AnkiFX_Eval_History || [];
        if (history.length === 0) {
            ctx.fillStyle = '#888';
            ctx.font = 'italic 12px monospace';
            ctx.fillText('(No evaluation history captured)', 20, 282);
        } else {
            ctx.font = '11px monospace';
            history.slice(-3).forEach((h, idx) => {
                ctx.fillStyle = h.status === 'active' ? '#55ff55' : '#ffaa55';
                ctx.fillText(`[${idx + 1}] ${h.source} (${h.version}) @ ${h.time} - ${h.status}`, 20, 282 + idx * 15);
            });
        }

        // Draw Chronological Loader Logs
        ctx.fillStyle = '#0ff';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('--- CHRONOLOGICAL LOADER LOGS ---', 20, 335);

        const logs = window.AnkiFX_Loader_Logs || [];
        if (logs.length === 0) {
            ctx.fillStyle = '#888';
            ctx.font = 'italic 12px monospace';
            ctx.fillText('(No logs captured by template loader)', 20, 355);
        } else {
            ctx.font = '11px monospace';
            logs.slice(-12).forEach((log, idx) => {
                const isError = log.includes('fail') || log.includes('Error') || log.includes('offline') || log.includes('warn');
                ctx.fillStyle = isError ? '#ff5555' : '#55ff55';
                ctx.fillText(`[${idx + 1}] ${log}`, 20, 355 + idx * 16);
            });
        }

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

        animationId = requestAnimationFrame(render);
    }

    render();
}

export function stopDebug() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
