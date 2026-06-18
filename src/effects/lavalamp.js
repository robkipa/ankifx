import { getShaderPrecision } from '../core/webgl-utils.js';

const MAX_BLOBS = 6;

class LavaBlob {
    constructor(x, y, radius, h) {
        this.pos = { x, y };
        this.vel = { x: 0, y: -(Math.random() * 0.6 + 0.3) };
        this.radius = radius;
        
        const normalizedY = y / h;
        this.temperature = 0.15 + normalizedY * 0.3 + Math.random() * 0.15;
        
        this.buoyancy = 0;
        this.noiseOffset = Math.random() * 1000;
        this.smoothSpeedY = 0;
    }

    update(dt, w, h, time, mouse) {
        if (this.pos.y > h * 0.80) {
            this.temperature += 0.05 * dt;
        } else if (this.pos.y > h * 0.60) {
            this.temperature += 0.02 * dt;
        } else if (this.pos.y < h * 0.20) {
            this.temperature -= 0.04 * dt;
        } else if (this.pos.y < h * 0.40) {
            this.temperature -= 0.015 * dt;
        }

        this.temperature = Math.max(0, Math.min(1, this.temperature));
        this.buoyancy = this.temperature * 4.0 - 2.0;
        this.vel.y -= this.buoyancy * 10.0 * dt;

        const nx = Math.sin(this.noiseOffset + time * 0.0002) * 0.1;
        this.vel.x += nx * dt * 0.3;
        
        const neutrality = 1.0 - Math.min(Math.abs(this.buoyancy) / 0.8, 1.0);
        const centerPull = (w * 0.5 - this.pos.x) * 0.003 * neutrality;
        this.vel.x += centerPull * dt;
        
        if (this.pos.x < this.radius) {
            this.vel.x += (this.radius - this.pos.x) * 2.0 * dt;
        }
        if (this.pos.x > w - this.radius) {
            this.vel.x -= (this.pos.x - (w - this.radius)) * 2.0 * dt;
        }
        const topBound = -this.radius * 0.5;
        if (this.pos.y < topBound) {
            this.vel.y += (topBound - this.pos.y) * 8.0 * dt;
        }
        const bottomBound = h + this.radius * 0.5;
        if (this.pos.y > bottomBound) {
            this.vel.y -= (this.pos.y - bottomBound) * 8.0 * dt;
        }

        const lateralDrag = Math.pow(0.97, dt * 60);
        this.vel.x *= lateralDrag;
        
        const absB = Math.abs(this.buoyancy);
        const detached = absB > 0.8;
        const verticalDrag = detached
            ? Math.pow(0.994, dt * 60)
            : Math.pow(0.975, dt * 60);
        this.vel.y *= verticalDrag;
        
        const floorProximity = Math.max(0, (this.pos.y - (h * 0.82)) / (h * 0.18));
        const ceilingProximity = Math.max(0, ((h * 0.18) - this.pos.y) / (h * 0.18));
        const lateralDamping = Math.pow(0.88, dt * 60 * (floorProximity + ceilingProximity));
        this.vel.x *= lateralDamping;

        this.smoothSpeedY += (Math.abs(this.vel.y) - this.smoothSpeedY) * (1.0 - Math.pow(0.05, dt));

        if (mouse && mouse.down) {
            const dx = this.pos.x - mouse.x;
            const dy = this.pos.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                const force = (200 - dist) / 200;
                this.vel.x += (mouse.dx * force * 1.5);
                this.vel.y += (mouse.dy * force * 8.0);
            }
        }

        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
    }
}

const vsSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const fsSource = `
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${MAX_BLOBS}];
    uniform float uBlobTemp[${MAX_BLOBS}];
    
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${MAX_BLOBS}; i++) {
            float stretchY = max(uBlobs[i].w, 0.85);
            vec2 lp = p - uBlobs[i].xy;
            lp.x *= sqrt(stretchY);
            lp.y /= sqrt(stretchY);
            float blob = length(lp) - uBlobs[i].z;
            d = smin(d, blob, 60.0);
        }
        
        float floorDist = uResolution.y - p.y;
        d = smin(d, floorDist - 35.0, 120.0);
        
        return d;
    }
    
    vec3 calcNormal(vec2 p, float d) {
        vec2 e = vec2(1.0, 0.0);
        vec3 n = vec3(
            map(p + e.xy) - d,
            map(p + e.yx) - d,
            4.0 - min(0.0, d) * 0.5
        );
        return normalize(n);
    }
    
    void main() {
        vec2 p = vUv * uResolution;
        float d = map(p);
        
        vec3 bg = mix(vec3(0.08, 0.01, 0.0), vec3(0.2, 0.04, 0.0), vUv.y);
        float glow = exp(-max(0.0, d) * 0.02);
        vec3 glowBg = bg + vec3(0.95, 0.35, 0.0) * glow * 0.45;
        vec3 lavaHot = vec3(1.0, 0.6, 0.1);
        
        float alpha = smoothstep(3.0, -3.0, d);
        
        if (d > 3.0) {
            gl_FragColor = vec4(glowBg, 1.0);
            return;
        }
        
        vec3 n = calcNormal(p, d);
        vec3 lightDir = normalize(vec3(0.0, 1.0, 0.5));
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        
        float diff = max(dot(n, lightDir), 0.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(n, halfDir), 0.0), 32.0);
        
        float thickness = abs(d);
        float translucency = exp(-thickness * 0.008);
        vec3 dynamicLavaBase = mix(vec3(0.6, 0.05, 0.0), vec3(1.0, 0.55, 0.05), translucency);
        
        vec3 col = mix(dynamicLavaBase, lavaHot, diff);
        col += vec3(1.0, 0.9, 0.6) * spec * 0.7;
        
        float rim = 1.0 - max(dot(n, viewDir), 0.0);
        col += vec3(0.9, 0.2, 0.0) * pow(rim, 3.0) * 0.8;
        
        vec3 finalCol = mix(glowBg, col, alpha);
        gl_FragColor = vec4(finalCol, 1.0);
    }
`;

class LavalampInstance {
    constructor(contexts, config) {
        this.contexts = contexts;
        this.config = config;
        this.destroyed = false;
        
        this.gl = null;
        this.program = null;
        this.positionBuffer = null;
        this.blobs = [];
        this.lastTime = 0;
        this.currentW = contexts.width;
        this.currentH = contexts.height;
        this.canvasEl = contexts.canvasGL;
        
        this.mouse = { x: -1000, y: -1000, dx: 0, dy: 0, down: false };
        this.animationId = null;

        // Preallocate arrays inside instance to avoid per-frame GC pressure
        this.blobData = new Float32Array(MAX_BLOBS * 4);
        this.tempData = new Float32Array(MAX_BLOBS);
    }

    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('[LavaLamp/WebGL] Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    init(gl) {
        this.gl = gl;
        const vs = this.compileShader(gl.VERTEX_SHADER, vsSource);
        
        // Dynamically inject resolved precision into FS
        const cleanedFs = fsSource.replace(/\bprecision\s+(highp|mediump|lowp)\s+float\s*;/gim, '');
        const precision = getShaderPrecision(gl);
        const finalFs = `precision ${precision} float;\n` + cleanedFs;

        const fs = this.compileShader(gl.FRAGMENT_SHADER, finalFs);
        if (!vs || !fs) return;
        
        this.program = gl.createProgram();
        gl.attachShader(this.program, vs);
        gl.attachShader(this.program, fs);
        gl.linkProgram(this.program);
        
        gl.detachShader(this.program, vs);
        gl.detachShader(this.program, fs);
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('[LavaLamp/WebGL] Program link error:', gl.getProgramInfoLog(this.program));
            gl.deleteProgram(this.program);
            return;
        }
        
        gl.useProgram(this.program);
        
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        const positions = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
            -1.0,  1.0,
             1.0, -1.0,
             1.0,  1.0
        ]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
        
        const posAttr = gl.getAttribLocation(this.program, 'aPosition');
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
        
        this.program.uResolution = gl.getUniformLocation(this.program, 'uResolution');
        this.program.uTime = gl.getUniformLocation(this.program, 'uTime');
        this.program.uBlobs = gl.getUniformLocation(this.program, 'uBlobs');
        this.program.uBlobTemp = gl.getUniformLocation(this.program, 'uBlobTemp');
        
        // Initialize simulation
        this.blobs = [];
        let attempts = 0;
        while (this.blobs.length < MAX_BLOBS && attempts < 200) {
            attempts++;
            const radius = 70 + Math.random() * 60;
            const x = radius + Math.random() * (this.currentW - radius * 2);
            const y = radius + Math.random() * (this.currentH - radius * 2);
            
            let overlaps = false;
            for (const b of this.blobs) {
                const dx = b.pos.x - x;
                const dy = b.pos.y - y;
                if (Math.sqrt(dx*dx + dy*dy) < b.radius + radius + 10) {
                    overlaps = true;
                    break;
                }
            }
            if (!overlaps) this.blobs.push(new LavaBlob(x, y, radius, this.currentH));
        }
        while (this.blobs.length < MAX_BLOBS) {
            const radius = 70 + Math.random() * 60;
            const x = radius + Math.random() * (this.currentW - radius * 2);
            const y = radius + Math.random() * (this.currentH - radius * 2);
            this.blobs.push(new LavaBlob(x, y, radius, this.currentH));
        }
        
        this.lastTime = performance.now();
        
        this.bindEvents();
        this.animationId = requestAnimationFrame(this.loop);
    }

    loop = (now) => {
        if (this.destroyed) return;
        if (typeof window !== 'undefined' && window.AnkiFX && window.AnkiFX.currentEffectId !== 'lavalamp') return;

        if (window.AnkiFX && window.AnkiFX.isContextLost) {
            this.animationId = requestAnimationFrame(this.loop);
            return;
        }

        try {
            this.render(now);
            this.animationId = requestAnimationFrame(this.loop);
        } catch (err) {
            console.error('[AnkiFX/Lavalamp] Render loop execution crash:', err);
            if (window.AnkiFX && typeof window.AnkiFX.onRenderFailure === 'function') {
                window.AnkiFX.onRenderFailure(err);
            }
        }
    };

    render(now) {
        const gl = this.gl;
        if (!gl || this.destroyed) return;

        const dt = Math.min((now - this.lastTime) / 1000, 0.05);
        this.lastTime = now;
        
        for (let i = 0; i < MAX_BLOBS; i++) {
            this.blobs[i].update(dt, this.currentW, this.currentH, now, this.mouse);
        }
        
        for (let i = 0; i < MAX_BLOBS; i++) {
            const b = this.blobs[i];
            
            const stretch = Math.max(0.85, 
                1.0 +
                Math.min(b.smoothSpeedY * 0.028, 0.7) *
                (0.4 + b.temperature * 0.6)
            );
            
            this.blobData[i * 4 + 0] = b.pos.x;
            this.blobData[i * 4 + 1] = b.pos.y;
            this.blobData[i * 4 + 2] = b.radius;
            this.blobData[i * 4 + 3] = stretch;
            
            this.tempData[i] = b.temperature;
        }
        
        gl.useProgram(this.program);
        gl.uniform2f(this.program.uResolution, this.currentW, this.currentH);
        gl.uniform1f(this.program.uTime, now * 0.001);
        gl.uniform4fv(this.program.uBlobs, this.blobData);
        gl.uniform1fv(this.program.uBlobTemp, this.tempData);
        
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        
        this.mouse.dx = 0;
        this.mouse.dy = 0;
    }

    resize(w, h, dpr) {
        this.currentW = w;
        this.currentH = h;
        if (this.gl) {
            this.gl.viewport(0, 0, w * dpr, h * dpr);
        }
    }

    handlePointer = (e) => {
        if (!this.canvasEl) return;
        const rect = this.canvasEl.getBoundingClientRect();
        const touch = e.touches ? e.touches[0] : e;
        
        const newX = touch.clientX - rect.left;
        const newY = touch.clientY - rect.top;
        
        if (this.mouse.down && e.type !== 'mousedown' && e.type !== 'touchstart') {
            const dx = newX - this.mouse.x;
            const dy = newY - this.mouse.y;
            
            if (Math.abs(dx) < 150 && Math.abs(dy) < 150) {
                this.mouse.dx = dx;
                this.mouse.dy = dy;
            }
        }
        
        this.mouse.x = newX;
        this.mouse.y = newY;
    };

    handleDown = (e) => {
        this.mouse.dx = 0;
        this.mouse.dy = 0;
        this.mouse.down = true;
        this.handlePointer(e);
    };

    handleUp = () => {
        this.mouse.down = false;
    };

    bindEvents() {
        window.addEventListener('mousedown', this.handleDown);
        window.addEventListener('mousemove', this.handlePointer);
        window.addEventListener('mouseup', this.handleUp);
        
        window.addEventListener('touchstart', this.handleDown, { passive: true });
        window.addEventListener('touchmove', this.handlePointer, { passive: true });
        window.addEventListener('touchend', this.handleUp);
    }

    unbindEvents() {
        window.removeEventListener('mousedown', this.handleDown);
        window.removeEventListener('mousemove', this.handlePointer);
        window.removeEventListener('mouseup', this.handleUp);
        
        window.removeEventListener('touchstart', this.handleDown);
        window.removeEventListener('touchmove', this.handlePointer);
        window.removeEventListener('touchend', this.handleUp);
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;

        if (activeInstance === this) {
            activeInstance = null;
        }

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.unbindEvents();
        
        const gl = this.gl;
        if (gl) {
            try {
                gl.clearColor(0,0,0,0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                if (this.program) gl.deleteProgram(this.program);
                if (this.positionBuffer) gl.deleteBuffer(this.positionBuffer);
            } catch (err) {
                console.error('[AnkiFX/Lavalamp] Error deleting GPU state:', err);
            }
        }
        this.gl = null;
        this.program = null;
        this.positionBuffer = null;
    }

    onContextLost() {
        this.gl = null;
        this.program = null;
        this.positionBuffer = null;
    }

    onContextRestored(gl) {
        this.gl = gl;
        this.init(gl);
    }
}

let activeInstance = null;

export function runLavalamp(contexts, config) {
    if (activeInstance) {
        activeInstance.destroy();
    }
    activeInstance = new LavalampInstance(contexts, config);
    activeInstance.init(contexts.gl);
}

export function stopLavalamp() {
    if (activeInstance) {
        activeInstance.destroy();
        activeInstance = null;
    }
}

export const effect = {
    id: 'lavalamp',
    name: 'Lava Lamp',
    isWebGL: true,
    createInstance(contexts, config) {
        activeInstance = new LavalampInstance(contexts, config);
        return activeInstance;
    },
    run: runLavalamp,
    stop: stopLavalamp,
    onResize: (w, h, dpr) => {
        if (activeInstance) {
            activeInstance.resize(w, h, dpr);
        }
    },
    marqueeFont: {
        color: '#ffccaa',
        shadowColor: 'rgba(255, 100, 0, 0.8)',
        shadowBlur: 10
    }
};
