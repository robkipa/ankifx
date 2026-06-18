import { createFullscreenProgram } from '../core/webgl-utils.js';

export const effect = {
    id: 'julia',
    name: 'Julia Set',
    isWebGL: true,
    createInstance(contexts, config) {
        activeInstance = new JuliaInstance(contexts, config);
        return activeInstance;
    },
    run: runJulia,
    stop: stopJulia,
    onResize: (w, h, dpr) => {
        if (activeInstance) {
            activeInstance.resize(w, h, dpr);
        }
    },
    preferredTrack: { title: "Acoustica Power Bundle 4", trackTitle: "AiR" },
    presets: [
        { name: 'Black Hole', cRe: -0.8, cIm: 0.156, zoomDepth: 8, targetX: -0.086441, targetY: -0.239323 },
        { name: 'Electric Lightning', cRe: 0.285, cIm: 0.013, zoomDepth: 6.0, targetX: -0.106662, targetY: 0.656613 },
        { name: 'Golden Dragon', cRe: -0.4, cIm: 0.6, zoomDepth: 9.0, targetX: -0.042175, targetY: -0.036744 },
        { name: 'Filigree', cRe: -0.70176, cIm: -0.3842, zoomDepth: 10.5, targetX: -0.096904, targetY: -0.656621 },
        { name: 'Fractal Storm', cRe: -0.7269, cIm: 0.1889, zoomDepth: 10.5, targetX: -0.237086, targetY: 0.547981 },
        { name: 'Seahorse Spiral', cRe: -0.74543, cIm: 0.11301, zoomDepth: 7.5, targetX: -0.529406, targetY: 0.072863 },
    ],
    marqueeFont: {
        color: '#FFF',
        outline: '#000'
    }
};

let juliaState = {
    presetIndex: 0,
    cRe: -0.8,
    cIm: 0.156,
    zoomDepth: 8.0,
    targetX: -0.086441,
    targetY: -0.239323,
    speed: parseFloat(localStorage.getItem('ankifx_julia_speed')) || 0.15
};

const vsSource = `
    attribute vec2 position;
    void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fsSource = `
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_speed;
    uniform vec2 u_c; 
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
        float scale = 2.2 / zoom;
        vec2 z = u_target + uv * scale;

        float angle = easedProgress * 3.14159 * 0.5;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        z = u_target + rot * (z - u_target);

        float iter = 0.0;
        float maxIter = clamp(200.0 + 60.0 * log(zoom), 200.0, 500.0);

        for(float i = 0.0; i < 500.0; i++) {
            if (i >= maxIter) break;
            z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + u_c;
            if(dot(z, z) > 16.0) break; 
            iter++;
        }

        vec3 col = vec3(0.0);
        if(iter < maxIter - 1.0) {
            float smoothIter = iter + 1.0 - log(log(dot(z, z))) / log(2.0);
            float colorMap = fract(smoothIter * 0.03 - u_time * 0.1);
            col = palette(colorMap);
        }

        vec2 normUv = gl_FragCoord.xy / u_resolution.xy;
        float vignette = clamp(1.0 - length(normUv - 0.5) * 1.2, 0.0, 1.0);
        vignette = smoothstep(0.0, 1.0, vignette);
        col *= mix(0.3, 1.0, vignette);

        gl_FragColor = vec4(col, 1.0);
    }
`;

class JuliaInstance {
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
        this.cLoc = null;
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
            throw new Error('[Julia] Shader program compilation failed');
        }

        this.activeProgram = webglObj.program;
        this.activeBuffer = webglObj.buffer;

        this.timeLoc = gl.getUniformLocation(this.activeProgram, "u_time");
        this.speedLoc = gl.getUniformLocation(this.activeProgram, "u_speed");
        this.resLoc = gl.getUniformLocation(this.activeProgram, "u_resolution");
        this.cLoc = gl.getUniformLocation(this.activeProgram, "u_c");
        this.zoomDepthLoc = gl.getUniformLocation(this.activeProgram, "u_zoomDepth");
        this.targetLoc = gl.getUniformLocation(this.activeProgram, "u_target");

        gl.uniform2f(this.resLoc, this.currentW * this.dpr, this.currentH * this.dpr);

        const isSmallScreen = this.currentW < 480;
        const savedPresetIndex = parseInt(localStorage.getItem('ankifx_julia_preset_index') || '0', 10);
        juliaState.presetIndex = savedPresetIndex;
        const activePreset = effect.presets[savedPresetIndex] || effect.presets[0];

        juliaState.cRe = this.config.cRe !== undefined ? this.config.cRe : activePreset.cRe;
        juliaState.cIm = this.config.cIm !== undefined ? this.config.cIm : activePreset.cIm;
        juliaState.zoomDepth = this.config.zoomDepth !== undefined ? this.config.zoomDepth : activePreset.zoomDepth;
        juliaState.targetX = this.config.targetX !== undefined ? this.config.targetX : activePreset.targetX;
        juliaState.targetY = this.config.targetY !== undefined ? this.config.targetY : activePreset.targetY;

        const juliaPresetControl = {
            type: 'select',
            id: 'julia-preset',
            label: 'PRESET',
            options: effect.presets.map((p, i) => ({ value: i, text: (isSmallScreen ? '💠 ' : '[ Preset: ') + p.name + (isSmallScreen ? '' : ' ]') })),
            value: juliaState.presetIndex,
            onChange: (val) => {
                const presetIndex = parseInt(val);
                localStorage.setItem('ankifx_julia_preset_index', presetIndex);
                juliaState.presetIndex = presetIndex;
                const preset = effect.presets[presetIndex];
                if (preset) {
                    Object.assign(this.config, preset);
                    juliaState.cRe = preset.cRe;
                    juliaState.cIm = preset.cIm;
                    juliaState.zoomDepth = preset.zoomDepth;
                    juliaState.targetX = preset.targetX;
                    juliaState.targetY = preset.targetY;
                    
                    if (this.config.debug && typeof AnkiFX !== 'undefined') {
                        AnkiFX.setControlValue('julia-cRe', preset.cRe);
                        AnkiFX.setControlValue('julia-cIm', preset.cIm);
                        AnkiFX.setControlValue('julia-zoomDepth', preset.zoomDepth);
                        AnkiFX.setControlValue('julia-targetX', preset.targetX);
                        AnkiFX.setControlValue('julia-targetY', preset.targetY);
                    }
                    
                    this.destroy();
                    if (this.contexts.ctx2d) this.contexts.ctx2d.clearRect(0, 0, this.currentW, this.currentH);
                    if (typeof AnkiFX !== 'undefined' && AnkiFX.startEffect) {
                        AnkiFX.startEffect(this.config, document.getElementById('ankifx-background'), this.config.marqueePosition, 'julia');
                    }
                }
            }
        };

        if (this.config.debug) {
            effect.controls = [];
        } else {
            effect.controls = [juliaPresetControl];
        }

        if (this.config.debug) {
            effect.controls.push(
                {
                    type: 'slider',
                    id: 'julia-cRe',
                    label: 'C-RE',
                    min: -1.5,
                    max: 1.0,
                    step: 0.001,
                    value: juliaState.cRe,
                    onChange: (v) => { juliaState.cRe = v; }
                },
                {
                    type: 'slider',
                    id: 'julia-cIm',
                    label: 'C-IM',
                    min: -1.0,
                    max: 1.0,
                    step: 0.001,
                    value: juliaState.cIm,
                    onChange: (v) => { juliaState.cIm = v; }
                },
                {
                    type: 'slider',
                    id: 'julia-zoomDepth',
                    label: 'ZOOM',
                    min: 2.0,
                    max: 25.0,
                    step: 0.1,
                    value: juliaState.zoomDepth,
                    onChange: (v) => { juliaState.zoomDepth = v; }
                },
                {
                    type: 'slider',
                    id: 'julia-targetX',
                    label: 'T-X',
                    min: -2.0,
                    max: 2.0,
                    step: 0.0001,
                    value: juliaState.targetX,
                    onChange: (v) => { juliaState.targetX = v; }
                },
                {
                    type: 'slider',
                    id: 'julia-targetY',
                    label: 'T-Y',
                    min: -2.0,
                    max: 2.0,
                    step: 0.0001,
                    value: juliaState.targetY,
                    onChange: (v) => { juliaState.targetY = v; }
                },
                {
                    type: 'slider',
                    id: 'julia-speed',
                    label: 'SPD',
                    min: 0.005,
                    max: 0.3,
                    step: 0.005,
                    value: juliaState.speed,
                    onChange: (v) => {
                        juliaState.speed = v;
                        localStorage.setItem('ankifx_julia_speed', v);
                    }
                }
            );
            effect.controls.push(juliaPresetControl);

            const container = document.getElementById('afx-effect-controls-container');
            if (container) {
                this.debugInfoEl = document.createElement('div');
                this.debugInfoEl.id = 'afx-julia-debug-info';
                this.debugInfoEl.className = 'afx-control-row julia-debug-el';
                this.debugInfoEl.style.cssText = 'height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;';
                this.debugInfoEl.textContent = 'HOVER TO SEE TARGET COORDS';
                container.prepend(this.debugInfoEl);
            }

            this.getCoordsAt = (screenX, screenY, currentTime) => {
                const cycle = (currentTime * juliaState.speed / Math.max(juliaState.zoomDepth, 1.0)) % 2.0;
                const progress = cycle > 1.0 ? 2.0 - cycle : cycle;
                const easedProgress = progress < 0.5 ? 4.0 * Math.pow(progress, 3.0) : 1.0 - Math.pow(-2.0 * progress + 2.0, 3.0) / 2.0;
                const zoom = Math.exp(easedProgress * juliaState.zoomDepth);
                const scale = 2.2 / zoom;
                const angle = easedProgress * Math.PI * 0.5;
                
                const uvX = (screenX - this.currentW / 2) / this.currentH;
                const uvY = (this.currentH / 2 - screenY) / this.currentH;
                
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const dx = (cosA * uvX + sinA * uvY) * scale;
                const dy = (-sinA * uvX + cosA * uvY) * scale;
                
                return { tx: juliaState.targetX + dx, ty: juliaState.targetY + dy };
            };

            const handleMouseDown = (e) => {
                if (e.target.closest('#afx-bottom-dock') || e.target.closest('.afx-dialog')) return;
                const currentTime = (performance.now() * 0.001) - this.startTime;
                const { tx, ty } = this.getCoordsAt(e.clientX, e.clientY, currentTime);
                juliaState.targetX = tx;
                juliaState.targetY = ty;
                if (typeof AnkiFX !== 'undefined' && AnkiFX.setControlValue) {
                    AnkiFX.setControlValue('julia-targetX', tx);
                    AnkiFX.setControlValue('julia-targetY', ty);
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
        }

        this.animationId = requestAnimationFrame(this.loop);
    }

    loop = () => {
        if (this.destroyed) return;
        if (typeof window !== 'undefined' && window.AnkiFX && window.AnkiFX.currentEffectId !== 'julia') return;
        
        if (window.AnkiFX && window.AnkiFX.isContextLost) {
            this.animationId = requestAnimationFrame(this.loop);
            return;
        }

        try {
            this.render();
            this.animationId = requestAnimationFrame(this.loop);
        } catch (err) {
            console.error('[AnkiFX/Julia] Render execution crash:', err);
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
        gl.uniform1f(this.speedLoc, juliaState.speed);
        gl.uniform2f(this.cLoc, juliaState.cRe, juliaState.cIm);
        gl.uniform1f(this.zoomDepthLoc, juliaState.zoomDepth);
        gl.uniform2f(this.targetLoc, juliaState.targetX, juliaState.targetY);
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
        document.querySelectorAll('.julia-debug-el').forEach(el => el.remove());

        const gl = this.gl;
        if (gl) {
            try {
                if (this.activeProgram) gl.deleteProgram(this.activeProgram);
                if (this.activeBuffer) gl.deleteBuffer(this.activeBuffer);
            } catch (err) {
                console.error('[AnkiFX/Julia] Error deleting GPU state:', err);
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

export function runJulia(contexts, config = {}) {
    if (activeInstance) {
        activeInstance.destroy();
    }
    activeInstance = new JuliaInstance(contexts, config);
    activeInstance.init(contexts.gl);
}

export function stopJulia() {
    if (activeInstance) {
        activeInstance.destroy();
        activeInstance = null;
    }
}