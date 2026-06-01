// --- EFFECT DEFINITION ---

let stars = [];
let ff = null;
let tileSize = 60;
let tileRatio = 1.5;

export const effect = {
    id: 'aurora',
    name: 'Aurora',
    run: runAurora,
    stop: stopAurora,
    drawOverlay: drawOverlay,
    onResize: (w, h) => {
        const style = getComputedStyle(document.documentElement);
        const topInset = parseInt(style.getPropertyValue('--io-header')) || 0;
        const visibleH = h - topInset;

        currentW = w / 8;
        currentH = visibleH / 8;
        if (ff) {
            const localTileSize = tileSize / 8;
            const cols = Math.ceil(currentW / localTileSize);
            const rows = Math.ceil(currentH / (localTileSize * tileRatio));
            ff.w = cols;
            ff.h = rows;
            ff.build();
        }

        if (currentCanvas) {
            currentCanvas.style.width = currentW + 'px';
            currentCanvas.style.height = currentH + 'px';
            currentCanvas.style.position = 'absolute';
            currentCanvas.style.top = topInset + 'px';
            currentCanvas.style.left = '0';
            currentCanvas.style.transform = 'scale(8)';
            currentCanvas.style.transformOrigin = 'top left';
        }
    },
    marqueeFont: {
        color: '#E0FFFF',
        shadowColor: 'rgba(0,128,128,0.8)',
        shadowBlur: 10
    }
};

let animationId = null;
let currentW, currentH;
let currentCanvas = null;
let time = 0;
let lastStep = 0;
let mouse = { x: -1000, y: -1000 };

// --- HELPERS ---

class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    setAngle(angle) {
        const len = this.getLength() || 1;
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;
    }
    setLength(len) {
        const angle = Math.atan2(this.y, this.x);
        this.x = Math.cos(angle) * len;
        this.y = Math.sin(angle) * len;
    }
    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    addTo(v) {
        this.x += v.x;
        this.y += v.y;
    }
}

// Compact Simplex Noise (3D)
const noise = (() => {
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256).map(() => Math.random() * 256);
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    function dot(g, x, y, z) { return g[0] * x + g[1] * y + g[2] * z; }
    
    return {
        simplex3: (xin, yin, zin) => {
            let n0, n1, n2, n3;
            const F3 = 1.0 / 3.0, G3 = 1.0 / 6.0;
            let s = (xin + yin + zin) * F3;
            let i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
            let t = (i + j + k) * G3;
            let x0 = xin - i + t, y0 = yin - j + t, z0 = zin - k + t;
            let i1, j1, k1, i2, j2, k2;
            if (x0 >= y0) {
                if (y0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
                else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
                else { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
            } else {
                if (y0 < z0) { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
                else if (x0 < z0) { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
                else { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
            }
            let x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
            let x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3;
            let x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3;
            let ii = i & 255, jj = j & 255, kk = k & 255;
            let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
            if (t0 < 0) n0 = 0.0; else { t0 *= t0; n0 = t0 * t0 * dot(grad3[perm[ii + perm[jj + perm[kk]]] % 12], x0, y0, z0); }
            let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
            if (t1 < 0) n1 = 0.0; else { t1 *= t1; n1 = t1 * t1 * dot(grad3[perm[ii + i1 + perm[jj + j1 + perm[kk + k1]]] % 12], x1, y1, z1); }
            let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
            if (t2 < 0) n2 = 0.0; else { t2 *= t2; n2 = t2 * t2 * dot(grad3[perm[ii + i2 + perm[jj + j2 + perm[kk + k2]]] % 12], x2, y2, z2); }
            let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
            if (t3 < 0) n3 = 0.0; else { t3 *= t3; n3 = t3 * t3 * dot(grad3[perm[ii + 1 + perm[jj + 1 + perm[kk + 1]]] % 12], x3, y3, z3); }
            return 32.0 * (n0 + n1 + n2 + n3);
        }
    };
})();

// --- FLOW FIELD ---

class FlowField {
    constructor(w, h, settings = {}) {
        this.settings = { frequency: 0.1, ...settings };
        this.w = w;
        this.h = h;
        this.time = 0;
        this.build();
    }
    
    build() {
        this.cols = Math.ceil(this.w);
        this.rows = Math.ceil(this.h);
        this.field = new Array(this.cols);
        for (let x = 0; x < this.cols; x++) {
            this.field[x] = new Array(this.rows);
            for (let y = 0; y < this.rows; y++) {
                this.field[x][y] = new Vector(0, 0);
            }
        }
    }
    
    update(delta) {
        this.time += delta;
        const updateTime = this.time * this.settings.frequency / 1000;
        for (let x = 0; x < this.field.length; x++) {
            for (let y = 0; y < this.field[x].length; y++) {
                const angle = noise.simplex3(x/20, y/20, updateTime) * Math.PI * 2;
                const length = noise.simplex3(x/10 + 40000, y/10 + 40000, updateTime);
                this.field[x][y].setAngle(angle);
                this.field[x][y].setLength(length);
                
                if (typeof this.manipulateVector === 'function') {
                    this.manipulateVector(this.field[x][y], x, y);
                }
                
                if (typeof this.onDraw === 'function') {
                    this.onDraw(this.field[x][y], x, y);
                }
            }
        }
    }
}

function initStars() {
    stars = [];
    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            size: 0.5 + Math.random() * 1.3,
            opacity: 0.15 + Math.random() * 0.75,
            blinkSpeed: 0.001 + Math.random() * 0.002,
            blinkOffset: Math.random() * Math.PI * 2
        });
    }
}

function updateMouse(e) {
    if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    } else {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
}

export function runAurora(contexts, config) {
    const ctx = contexts.ctx2d;
    
    currentCanvas = contexts.canvas2D;
    currentCanvas.classList.add('afx-aurora-active');

    const topInset = contexts.topInset || 0;
    const visibleH = contexts.visibleHeight || contexts.height;

    // Set internal dimensions to 1/8th for the low quality buffer effect
    currentW = contexts.width / 8;
    currentH = visibleH / 8;
    
    currentCanvas.width = currentW * contexts.dpr;
    currentCanvas.height = currentH * contexts.dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(contexts.dpr, contexts.dpr);

    // Apply GPU-accelerated lowres scale transform constrained precisely to the visible bounds
    currentCanvas.style.width = currentW + 'px';
    currentCanvas.style.height = currentH + 'px';
    currentCanvas.style.position = 'absolute';
    currentCanvas.style.top = topInset + 'px';
    currentCanvas.style.left = '0';
    currentCanvas.style.transform = 'scale(8)';
    currentCanvas.style.transformOrigin = 'top left';

    initStars();
    
    // Scale tileSize down for the low-res coordinate system
    const localTileSize = tileSize / 8;
    const cols = Math.ceil(currentW / localTileSize);
    const rows = Math.ceil(currentH / (localTileSize * tileRatio));
    
    ff = new FlowField(cols, rows, { frequency: 0.1 });
    
    const ctxScale = {
        x: currentW / cols,
        y: currentH / rows
    };
    const heightColorScaling = 255 / rows;

    ff.onDraw = (vector, x, y) => {
        const xmove = vector.getLength() * Math.abs(vector.x);
        const ymove = vector.getLength() * Math.abs(vector.y);
        
        // Northern Lights Color Mapping
        const red = Math.round((-20 * xmove) + (80 * ymove) + (50 - (0.6 * y * heightColorScaling)));
        const green = Math.round((180 * xmove) + (20 * ymove) - 60 + (0.4 * y * heightColorScaling));
        const blue = Math.round((50 * xmove) + (30 * ymove) + (40 - (0.5 * y * heightColorScaling)) + (0.5 * y * heightColorScaling));
        
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
        ctx.fillRect(x * ctxScale.x, y * ctxScale.y, ctxScale.x + 0.5, ctxScale.y + 0.5);
    };

    ff.manipulateVector = (vector, x, y) => {
        const pos = {
            x: (x * ctxScale.x) + (0.5 * ctxScale.x),
            y: (y * ctxScale.y) + (0.5 * ctxScale.y)
        };
        
        const mouseX = mouse.x / 8;
        const mouseY = mouse.y / 8;

        const mouseEffect = new Vector(
            (mouseX - pos.x) / currentW,
            (mouseY - pos.y) / currentH
        );
            
        vector.addTo(mouseEffect);
        if (vector.getLength() > 1) vector.setLength(1);
    };

    time = 0;
    lastStep = 0;

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('touchstart', updateMouse);
    window.addEventListener('touchmove', updateMouse);

    function render(timestamp) {
        if (!lastStep) lastStep = timestamp;
        const delta = timestamp - lastStep;
        lastStep = timestamp;

        // Clear once per frame
        ctx.fillStyle = '#020b1a';
        ctx.fillRect(0, 0, currentW, currentH);

        // Update and Render FlowField
        ff.update(delta);

        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
}

export function drawOverlay(ctx, w, h, timestamp) {
    // Render Stars crisp & twinkling on the high-resolution overlay canvas strictly within the visible document
    const style = getComputedStyle(document.documentElement);
    const topInset = parseInt(style.getPropertyValue('--io-header')) || 0;
    const visibleH = h - topInset;

    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        const blink = (Math.sin(timestamp * star.blinkSpeed + star.blinkOffset) + 1) / 2;
        ctx.globalAlpha = star.opacity * blink;
        ctx.beginPath();
        const starY = topInset + star.y * visibleH;
        ctx.arc(star.x * w, starY, star.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1.0;
}

export function stopAurora() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    window.removeEventListener('mousemove', updateMouse);
    window.removeEventListener('touchstart', updateMouse);
    window.removeEventListener('touchmove', updateMouse);

    if (currentCanvas) {
        currentCanvas.classList.remove('afx-aurora-active');
        currentCanvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
        currentCanvas = null;
    }

    const AFX = window.AnkiFX;
    if (AFX && typeof AFX.handleResize === 'function') {
        AFX.handleResize();
    }
}
