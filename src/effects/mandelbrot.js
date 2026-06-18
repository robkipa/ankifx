import { createFullscreenProgram } from '../core/webgl-utils.js';

export const effect = {
    id: 'mandelbrot',
    name: 'Mandelbrot',
    isWebGL: true,
    createInstance(contexts, config) {
        activeInstance = new MandelbrotInstance(contexts, config);
        return activeInstance;
    },
    run: runMandelbrot,
    stop: stopMandelbrot,
    onResize: (w, h, dpr) => {
        if (activeInstance) {
            activeInstance.resize(w, h, dpr);
        }
    },
    preferredTrack: { title: "Acoustica Power Bundle 4", trackTitle: "AiR" },
    marqueeFont: {
        color: '#FFF',
        outline: '#000'
    }
};

let mandelbrotState = {
    targetX: -0.743643887037151,
    targetY: 0.131825904205330,
    zoomDepth: 11.0,
    speed: parseFloat(localStorage.getItem('ankifx_mandelbrot_speed')) || 0.15
};

const vsSource = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fsSource = `
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_speed;
    uniform float u_zoomDepth;
    uniform vec2 u_target;

    vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 0.7, 0.4);
        vec3 d = vec3(0.0, 0.15, 0.20);
        return a + b * cos(6.28318 * (c * t + d));
    }

    float easeInOutCubic(float x) {
        return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        float cycle = mod(u_time * u_speed / max(u_zoomDepth, 1.0), 2.0);
        float progress = cycle > 1.0 ? 2.0 - cycle : cycle;
        float easedProgress = easeInOutCubic(progress);
        
        float zoom = exp(easedProgress * u_zoomDepth);
        vec2 c = u_target + uv * (2.5 / zoom);
        vec2 z = vec2(0.0);
        float iter = 0.0;
        
        float maxIter = clamp(150.0 + 65.0 * log(zoom), 150.0, 500.0);
        const float ABSOLUTE_MAX = 500.0;

        for(float i = 0.0; i < ABSOLUTE_MAX; i++) {
            if (i >= maxIter) break;
            z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
            if(dot(z, z) > 16.0) break; 
            iter++;
        }

        vec3 col = vec3(0.0);
        if(iter < maxIter - 1.0) {
            float smoothIter = iter - log2(max(1.0, log2(dot(z, z)))) + 3.0;
            float colorMap = fract(smoothIter * 0.03 - u_time * 0.2);
            col = palette(colorMap);
        }

        vec2 normUv = gl_FragCoord.xy / u_resolution.xy;
        float vignette = clamp(1.0 - length(normUv - 0.5) * 1.2, 0.0, 1.0);
        vignette = smoothstep(0.0, 1.0, vignette);
        col *= mix(0.2, 1.0, vignette);

        gl_FragColor = vec4(col, 1.0);
    }
`;

class MandelbrotInstance {
    constructor(contexts, config) {
        this.contexts = contexts;
        this.config = config;
        this.destroyed = false;
        this.gl = null;
        this.activeProgram = null;
        this.activeBuffer = null;
        this.resLoc = null;
        this.timeLoc = null;
        this.speedLoc = null;
        this.zoomDepthLoc = null;
        this.targetLoc = null;
        
        this.currentW = contexts.width;
        this.currentH = contexts.height;
        this.dpr = contexts.dpr;
        
        this.debugInfoEl = null;
        this.getCoordsAt = null;
        this.currentMouseListener = null;
        this.currentMouseMoveListener = null;
        this.mousePos = { x: 0, y: 0 };
        this.startTime = performance.now() * 0.001;
        this.animationId = null;
    }

    init(gl) {
        this.gl = gl;
        const webglObj = createFullscreenProgram(gl, vsSource, fsSource);
        if (!webglObj) {
            throw new Error('[Mandelbrot] Shader program compilation failed');
        }
        
        this.activeProgram = webglObj.program;
        this.activeBuffer = webglObj.buffer;

        this.timeLoc = gl.getUniformLocation(this.activeProgram, "u_time");
        this.speedLoc = gl.getUniformLocation(this.activeProgram, "u_speed");
        this.zoomDepthLoc = gl.getUniformLocation(this.activeProgram, "u_zoomDepth");
        this.targetLoc = gl.getUniformLocation(this.activeProgram, "u_target");
        this.resLoc = gl.getUniformLocation(this.activeProgram, "u_resolution");

        gl.uniform2f(this.resLoc, this.currentW * this.dpr, this.currentH * this.dpr);

        if (this.config.debug) {
            effect.controls = [
                {
                    type: 'slider',
                    id: 'mandelbrot-zoomDepth',
                    label: 'ZOOM',
                    min: 2.0,
                    max: 25.0,
                    step: 0.1,
                    value: mandelbrotState.zoomDepth,
                    onChange: (v) => { mandelbrotState.zoomDepth = v; }
                },
                {
                    type: 'slider',
                    id: 'mandelbrot-targetX',
                    label: 'T-X',
                    min: -2.5,
                    max: 1.0,
                    step: 0.0001,
                    value: mandelbrotState.targetX,
                    onChange: (v) => { mandelbrotState.targetX = v; }
                },
                {
                    type: 'slider',
                    id: 'mandelbrot-targetY',
                    label: 'T-Y',
                    min: -1.5,
                    max: 1.5,
                    step: 0.0001,
                    value: mandelbrotState.targetY,
                    onChange: (v) => { mandelbrotState.targetY = v; }
                },
                {
                    type: 'slider',
                    id: 'mandelbrot-speed',
                    label: 'SPD',
                    min: 0.005,
                    max: 0.3,
                    step: 0.005,
                    value: mandelbrotState.speed,
                    onChange: (v) => {
                        mandelbrotState.speed = v;
                        localStorage.setItem('ankifx_mandelbrot_speed', v);
                    }
                }
            ];

            const container = document.getElementById('afx-effect-controls-container');
            if (container) {
                this.debugInfoEl = document.createElement('div');
                this.debugInfoEl.id = 'afx-mandelbrot-debug-info';
                this.debugInfoEl.className = 'afx-control-row mandelbrot-debug-el';
                this.debugInfoEl.style.cssText = 'height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;';
                this.debugInfoEl.textContent = 'HOVER TO SEE TARGET COORDS';
                container.prepend(this.debugInfoEl);
            }

            this.getCoordsAt = (screenX, screenY, currentTime) => {
                const cycle = (currentTime * mandelbrotState.speed / Math.max(mandelbrotState.zoomDepth, 1.0)) % 2.0;
                const progress = cycle > 1.0 ? 2.0 - cycle : cycle;
                const easedProgress = progress < 0.5 ? 4.0 * Math.pow(progress, 3.0) : 1.0 - Math.pow(-2.0 * progress + 2.0, 3.0) / 2.0;
                const zoom = Math.exp(easedProgress * mandelbrotState.zoomDepth);
                
                const uvX = (screenX - this.currentW / 2) / this.currentH;
                const uvY = (this.currentH / 2 - screenY) / this.currentH;
                
                return {
                    tx: mandelbrotState.targetX + uvX * (2.5 / zoom),
                    ty: mandelbrotState.targetY + uvY * (2.5 / zoom)
                };
            };

            const handleMouseDown = (e) => {
                if (e.target.closest('#afx-bottom-dock') || e.target.closest('.afx-dialog')) return;
                const currentTime = (performance.now() * 0.001) - this.startTime;
                const { tx, ty } = this.getCoordsAt(e.clientX, e.clientY, currentTime);
                mandelbrotState.targetX = tx;
                mandelbrotState.targetY = ty;
                if (typeof AnkiFX !== 'undefined' && AnkiFX.setControlValue) {
                    AnkiFX.setControlValue('mandelbrot-targetX', tx);
                    AnkiFX.setControlValue('mandelbrot-targetY', ty);
                }
            };
            window.addEventListener('mousedown', handleMouseDown);
            this.currentMouseListener = handleMouseDown;

            const handleMouseMove = (e) => {
                this.mousePos.x = e.clientX;
                this.mousePos.y = e.clientY;
            };
            window.addEventListener('mousemove', handleMouseMove);
            this.currentMouseMoveListener = handleMouseMove; 
        } else {
            effect.controls = [];
        }

        this.animationId = requestAnimationFrame(this.loop);
    }

    loop = () => {
        if (this.destroyed) return;
        if (typeof window !== 'undefined' && window.AnkiFX && window.AnkiFX.currentEffectId !== 'mandelbrot') return;
        
        if (window.AnkiFX && window.AnkiFX.isContextLost) {
            this.animationId = requestAnimationFrame(this.loop);
            return;
        }

        try {
            this.render();
            this.animationId = requestAnimationFrame(this.loop);
        } catch (err) {
            console.error('[AnkiFX/Mandelbrot] Render execution crash:', err);
            if (window.AnkiFX && typeof window.AnkiFX.onRenderFailure === 'function') {
                window.AnkiFX.onRenderFailure(err);
            }
        }
    };

    render() {
        const gl = this.gl;
        const ctx = this.contexts.ctx2d;
        if (!gl || this.destroyed) return;

        const time = performance.now() * 0.001 - this.startTime;
        gl.uniform1f(this.timeLoc, time);
        gl.uniform1f(this.speedLoc, mandelbrotState.speed);
        gl.uniform1f(this.zoomDepthLoc, mandelbrotState.zoomDepth);
        gl.uniform2f(this.targetLoc, mandelbrotState.targetX, mandelbrotState.targetY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        if (ctx) ctx.clearRect(0, 0, this.currentW, this.currentH);
        
        if (this.debugInfoEl && this.getCoordsAt) {
            const currentTime = (performance.now() * 0.001) - this.startTime;
            const { tx, ty } = this.getCoordsAt(this.mousePos.x, this.mousePos.y, currentTime);
            this.debugInfoEl.textContent = `TARGET X: ${tx.toFixed(6)}, Y: ${ty.toFixed(6)}`;
        }
    }

    resize(w, h, dpr) {
        this.currentW = w;
        this.currentH = h;
        this.dpr = dpr;
        if (this.gl && this.resLoc) {
            this.gl.uniform2f(this.resLoc, w * dpr, h * dpr);
        }
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

        if (this.currentMouseListener) {
            window.removeEventListener('mousedown', this.currentMouseListener);
            this.currentMouseListener = null;
        }
        if (this.currentMouseMoveListener) {
            window.removeEventListener('mousemove', this.currentMouseMoveListener);
            this.currentMouseMoveListener = null;
        }
        document.querySelectorAll('.mandelbrot-debug-el').forEach(el => el.remove());

        const gl = this.gl;
        if (gl) {
            try {
                if (this.activeProgram) gl.deleteProgram(this.activeProgram);
                if (this.activeBuffer) gl.deleteBuffer(this.activeBuffer);
            } catch (err) {
                console.error('[AnkiFX/Mandelbrot] Error deleting GPU state:', err);
            }
        }

        this.gl = null;
        this.activeProgram = null;
        this.activeBuffer = null;
        this.resLoc = null;
    }

    onContextLost() {
        this.gl = null;
        this.activeProgram = null;
        this.activeBuffer = null;
    }

    onContextRestored(gl) {
        this.gl = gl;
        this.init(gl);
    }
}

let activeInstance = null;

export function runMandelbrot(contexts, config = {}) {
    if (activeInstance) {
        activeInstance.destroy();
    }
    activeInstance = new MandelbrotInstance(contexts, config);
    activeInstance.init(contexts.gl);
}

export function stopMandelbrot() {
    if (activeInstance) {
        activeInstance.destroy();
        activeInstance = null;
    }
}