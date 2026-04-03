import { Marquee } from './marquee.js';

let animationId = null;

export const effect = {
    id: 'starfield',
    name: 'Starfield',
    run: runStarfield,
    stop: stopStarfield,
    preferredTrack: { trackTitle: "star wars title" }
};

export function runStarfield(container, marqueeText, position = 'bottom') {
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
    let time = 0;

    const stars = [];
    const numStars = 50000; // MUCH more dense
    
    // --- COMPACT SIMPLEX NOISE ENGINE ---
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256).map(() => Math.random() * 256);
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
    const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    function dot(g, x, y, z) { return g[0] * x + g[1] * y + g[2] * z; }
    function noise3D(xin, yin, zin) {
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
    
    function fBm(x, y, z, octaves = 3) {
        let v = 0, a = 0.5;
        for (let i = 0; i < octaves; i++) {
            v += noise3D(x, y, z) * a;
            x *= 2; y *= 2; z *= 2; a *= 0.5;
        }
        return v;
    }

    class Planet {
        constructor() {
            this.active = false;
            this.nextSpawn = Date.now() + 2000;
        }

        reset() {
            const angle = Math.random() * Math.PI * 2;
            const dist = 0.2 + Math.random() * 0.4;
            this.x = Math.cos(angle) * w * dist;
            this.y = Math.sin(angle) * h * dist;
            this.z = w;
            this.sizeBase = 80 + Math.random() * 120;
            this.speed = 0.8;
            this.active = true;
            this.type = 1 + Math.floor(Math.random() * 2); // Only Gas Giants (1) and Ringed (2)
            
            // Randomly select an aesthetic palette template
            const templates = [
                { name: 'ice', baseH: 190 + Math.random()*40, sat: 60, l: 70 },
                { name: 'inferno', baseH: Math.random()*40, sat: 80, l: 60 },
                { name: 'toxic', baseH: 80 + Math.random()*40, sat: 70, l: 60 },
                { name: 'ethereal', baseH: 260 + Math.random()*40, sat: 60, l: 75 },
                { name: 'classic', baseH: 30 + Math.random()*20, sat: 50, l: 80 }
            ];
            const template = templates[Math.floor(Math.random() * templates.length)];
            this.generateGasGiantTexture(template);

            if (this.type === 2) {
                this.rings = Array.from({ length: 4 }, (_, i) => ({ r1: 1.6 + i * 0.2, opacity: 0.2 + Math.random() * 0.4 }));
            }
        }

        hslToRgb(h, s, l) {
            h /= 360; s /= 100; l /= 100;
            let r, g, b;
            if (s === 0) r = g = b = l;
            else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                const hue2rgb = (t) => {
                    if (t < 0) t += 1; if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                r = hue2rgb(h + 1/3); g = hue2rgb(h); b = hue2rgb(h - 1/3);
            }
            return { r: r * 255, g: g * 255, b: b * 255 };
        }

        generateGasGiantTexture(template) {
            const tex = document.createElement('canvas'); tex.width = tex.height = 256;
            const tctx = tex.getContext('2d');
            const data = tctx.createImageData(256, 256);
            
            const h = template.baseH;
            const cA = this.hslToRgb(h, template.sat, template.l);
            const cB = this.hslToRgb((h + 20) % 360, template.sat + 10, template.l - 10);
            const cC = this.hslToRgb((h - 40 + 360) % 360, template.sat + 20, template.l - 15);
            const cD = this.hslToRgb((h + 60) % 360, template.sat - 20, template.l + 10);
            
            const mix = (c1, c2, f) => ({ r: c1.r + (c2.r - c1.r) * f, g: c1.g + (c2.g - c1.g) * f, b: c1.b + (c2.b - c1.b) * f });
            const s = Math.random() * 1000;

            for (let y = 0; y < 256; y++) {
                for (let x = 0; x < 256; x++) {
                    const py = y / 256 * 10, px = x / 256 * 10;
                    let turb = Math.abs(fBm(0, py * 0.4, s, 3));
                    const offsetY = py + fBm(px * 0.5, py * 0.5, s) * turb * 4;
                    const offsetX = px + fBm(py * 0.5, px * 0.5, s + 50) * turb * 2;
                    const n1 = (fBm(0, offsetY * 0.8, s + 100, 4) + 1) / 2;
                    const n2 = (fBm(offsetX * 0.1, offsetY * 1.5, s + 200, 2) + 1) / 2;
                    
                    let finalColor = mix(cB, cA, n1);
                    if (n1 > 0.7) finalColor = mix(finalColor, cD, (n1 - 0.7) * 2);
                    if (n2 > 0.6) finalColor = mix(finalColor, cC, (n2 - 0.6) * 1.5);

                    let brightness = 1.0 + (fBm(offsetX, offsetY, s + 300, 2) * 0.2); 
                    const idx = (y * 256 + x) * 4;
                    data.data[idx] = Math.min(255, finalColor.r * brightness);
                    data.data[idx+1] = Math.min(255, finalColor.g * brightness);
                    data.data[idx+2] = Math.min(255, finalColor.b * brightness);
                    data.data[idx+3] = 255;
                }
            }
            tctx.putImageData(data, 0, 0);
            this.textureCanvas = tex;
        }

        update() {
            if (!this.active) { if (Date.now() > this.nextSpawn) this.reset(); return; }
            this.z -= this.speed;
            if (this.z <= 0) { this.active = false; this.nextSpawn = Date.now(); }
        }

        draw(ctx) {
            if (!this.active) return;
            const k = (w / 2) / this.z;
            const px = this.x * k + w / 2, py = this.y * k + h / 2;
            const size = (1 - this.z / w) * this.sizeBase;
            if (px < -size * 3 || px > w + size * 3 || py < -size * 3 || py > h + size * 3) return;

            ctx.save();
            ctx.translate(px, py);
            if (this.type === 2) { this.drawRings(ctx, size, true); ctx.globalAlpha = 1.0; }

            const glow = ctx.createRadialGradient(0, 0, size * 0.9, 0, 0, size * 1.5);
            glow.addColorStop(0, 'rgba(255, 255, 255, 0.15)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2); ctx.fill();

            ctx.save();
            ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.clip();
            ctx.globalAlpha = 1.0;
            ctx.drawImage(this.textureCanvas, -size, -size, size * 2, size * 2);

            const shading = ctx.createRadialGradient(-size * 0.5, -size * 0.5, size * 0.1, 0, 0, size);
            shading.addColorStop(0, 'rgba(255, 255, 255, 0.25)'); 
            shading.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
            shading.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
            ctx.fillStyle = shading; ctx.fillRect(-size, -size, size * 2, size * 2);
            ctx.restore();

            const rim = ctx.createRadialGradient(0, 0, size * 0.7, 0, 0, size);
            rim.addColorStop(1, 'rgba(255,255,255,0.4)'); rim.addColorStop(0.8, 'rgba(255,255,255,0)');
            ctx.fillStyle = rim; ctx.beginPath(); ctx.arc(0, 0, size, 0, Math.PI * 2); ctx.fill();

            if (this.type === 2) { this.drawRings(ctx, size, false); ctx.globalAlpha = 1.0; }
            ctx.restore();
        }

        drawRings(ctx, size, behind) {
            ctx.save();
            const tilt = Math.PI / 8;
            for (const ring of this.rings) {
                ctx.globalAlpha = ring.opacity;
                ctx.strokeStyle = '#E6E6FA'; ctx.lineWidth = size * 0.15;
                ctx.beginPath(); ctx.ellipse(0, 0, ring.r1 * size, ring.r1 * 0.3 * size, tilt, 0, Math.PI * 2); ctx.stroke();
            }
            ctx.restore();
        }
    }

    const planet = new Planet();

    function resize() {
        w = canvas.width = container.clientWidth;
        h = canvas.height = container.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Initialize stars with proper 3D coordinates and colors
    const starColors = ['#FFFFFF', '#FFE4B5', '#E0FFFF', '#FFF0F5', '#F0F8FF'];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: (Math.random() - 0.5) * w * 4,
            y: (Math.random() - 0.5) * h * 4,
            z: Math.random() * w,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            sizeBase: 1.5 + Math.random() * 2
        });
    }

    const marquee = new Marquee(marqueeText, position, {
        color: '#FFE81F', // Star Wars Yellow
        shadowColor: '#FFE81F',
        shadowBlur: 20,
        outline: '#000'
    });

    function render() {
        // Deep space with dark blue tint
        ctx.fillStyle = 'rgba(5, 5, 12, 1)';
        ctx.fillRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;

        time += 0.01;
        planet.update();
        planet.draw(ctx);

        for (let i = 0; i < numStars; i++) {
            const star = stars[i];
            const prevZ = star.z;
            star.z -= 4;

            if (star.z <= 0) {
                star.x = (Math.random() - 0.5) * w * 4;
                star.y = (Math.random() - 0.5) * h * 4;
                star.z = w;
                continue;
            }

            const k = (w / 2) / star.z;
            const px = star.x * k + cx;
            const py = star.y * k + cy;

            if (px >= 0 && px <= w && py >= 0 && py <= h) {
                const depth = 1 - star.z / w;
                const size = depth * star.sizeBase;
                
                // LOD Optimization: Distant stars use fast fillRect
                if (depth < 0.3) {
                    ctx.globalAlpha = depth * 2;
                    ctx.fillStyle = star.color;
                    ctx.fillRect(px, py, Math.max(1, size), Math.max(1, size));
                    continue;
                }

                ctx.globalAlpha = depth;
                ctx.fillStyle = star.color;
                ctx.strokeStyle = star.color;
                
                // Motion blur (stretch) - only for closer stars
                const pk = (w / 2) / prevZ;
                const ppx = star.x * pk + cx;
                const ppy = star.y * pk + cy;
                
                ctx.lineWidth = size;
                ctx.beginPath();
                ctx.moveTo(ppx, ppy);
                ctx.lineTo(px, py);
                ctx.stroke();
                
                // Head of the star
                ctx.beginPath();
                ctx.arc(px, py, size / 2, 0, Math.PI * 2);
                ctx.fill();
                
                // Shiny glow for very close stars
                if (depth > 0.8) {
                    ctx.globalAlpha = (depth - 0.8) * 3;
                    ctx.beginPath();
                    ctx.arc(px, py, size * 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        ctx.globalAlpha = 1.0;

        // Marquee
        marquee.render(ctx, w, h);

        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
    return marquee;
}

export function stopStarfield() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
