
let animationId = null;
let currentW, currentH;
let resLoc;
let glCtx;

export const effect = {
    id: 'julia',
    name: 'Julia Set',
    run: runJulia,
    stop: stopJulia,
    onResize: (w, h, dpr) => {
        currentW = w;
        currentH = h;
        if (glCtx && resLoc) {
            glCtx.uniform2f(resLoc, w * dpr, h * dpr);
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

let currentMouseListener = null;
let currentMouseMoveListener = null;
let mousePos = { x: 0, y: 0 };

const defaultPresetIndex = parseInt(localStorage.getItem('ankifx_julia_preset_index') || '0', 10);
const defaultPreset = effect.presets[defaultPresetIndex] || effect.presets[0];

let juliaState = {
    presetIndex: defaultPresetIndex,
    cRe: defaultPreset.cRe,
    cIm: defaultPreset.cIm,
    zoomDepth: defaultPreset.zoomDepth,
    targetX: defaultPreset.targetX,
    targetY: defaultPreset.targetY,
    speed: parseFloat(localStorage.getItem('ankifx_julia_speed')) || 0.15
};

export function runJulia(contexts, config = {}) {
    glCtx = contexts.gl;
    const gl = contexts.gl;
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;
    const dpr = contexts.dpr;

    // 2. WebGL Shaders (Keeping sources as is)
    const vsSource = `
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fsSource = `
        precision highp float;
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

    function compileShader(type, source) {
        const s = gl.createShader(type);
        gl.shaderSource(s, source);
        gl.compileShader(s);
        return s;
    }

    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const speedLoc = gl.getUniformLocation(program, "u_speed");
    resLoc = gl.getUniformLocation(program, "u_resolution");
    const cLoc = gl.getUniformLocation(program, "u_c");
    const zoomDepthLoc = gl.getUniformLocation(program, "u_zoomDepth");
    const targetLoc = gl.getUniformLocation(program, "u_target");

    // Initialize resolution uniform
    gl.uniform2f(resLoc, currentW * dpr, currentH * dpr);
    
    // 8.5 Debug Tuning Panel
    let debugInfoEl = null;
    let getCoordsAt = null;

    const isSmallScreen = currentW < 480;
    
    // Initialize coordinate states from saved preset
    const savedPresetIndex = parseInt(localStorage.getItem('ankifx_julia_preset_index') || '0', 10);
    juliaState.presetIndex = savedPresetIndex;
    const activePreset = effect.presets[savedPresetIndex] || effect.presets[0];

    juliaState.cRe = config.cRe !== undefined ? config.cRe : activePreset.cRe;
    juliaState.cIm = config.cIm !== undefined ? config.cIm : activePreset.cIm;
    juliaState.zoomDepth = config.zoomDepth !== undefined ? config.zoomDepth : activePreset.zoomDepth;
    juliaState.targetX = config.targetX !== undefined ? config.targetX : activePreset.targetX;
    juliaState.targetY = config.targetY !== undefined ? config.targetY : activePreset.targetY;

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
                Object.assign(config, preset);
                juliaState.cRe = preset.cRe;
                juliaState.cIm = preset.cIm;
                juliaState.zoomDepth = preset.zoomDepth;
                juliaState.targetX = preset.targetX;
                juliaState.targetY = preset.targetY;
                
                if (config.debug) {
                    AnkiFX.setControlValue('julia-cRe', preset.cRe);
                    AnkiFX.setControlValue('julia-cIm', preset.cIm);
                    AnkiFX.setControlValue('julia-zoomDepth', preset.zoomDepth);
                    AnkiFX.setControlValue('julia-targetX', preset.targetX);
                    AnkiFX.setControlValue('julia-targetY', preset.targetY);
                }
                
                effect.stop();
                if (contexts.ctx2d) contexts.ctx2d.clearRect(0, 0, currentW, currentH);
                AnkiFX.startEffect(config, document.getElementById('ankifx-background'), config.marqueePosition, 'julia');
            }
        }
    };

    if (config.debug) {
        effect.controls = [];
    } else {
        effect.controls = [juliaPresetControl];
    }

    if (config.debug) {
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

        // We can render and prepend the hover coordinate reader dynamically
        const container = document.getElementById('afx-effect-controls-container');
        if (container) {
            debugInfoEl = document.createElement('div');
            debugInfoEl.id = 'afx-julia-debug-info';
            debugInfoEl.className = 'afx-control-row julia-debug-el';
            debugInfoEl.style.cssText = 'height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff; border: none; background: transparent;';
            debugInfoEl.textContent = 'HOVER TO SEE TARGET COORDS';
            container.prepend(debugInfoEl);
        }

        getCoordsAt = (screenX, screenY, currentTime) => {
            const cycle = (currentTime * juliaState.speed / Math.max(juliaState.zoomDepth, 1.0)) % 2.0;
            const progress = cycle > 1.0 ? 2.0 - cycle : cycle;
            const easedProgress = progress < 0.5 ? 4.0 * Math.pow(progress, 3.0) : 1.0 - Math.pow(-2.0 * progress + 2.0, 3.0) / 2.0;
            const zoom = Math.exp(easedProgress * juliaState.zoomDepth);
            const scale = 2.2 / zoom;
            const angle = easedProgress * Math.PI * 0.5;
            
            const uvX = (screenX - currentW / 2) / currentH;
            const uvY = (currentH / 2 - screenY) / currentH;
            
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);
            const dx = (cosA * uvX + sinA * uvY) * scale;
            const dy = (-sinA * uvX + cosA * uvY) * scale;
            
            return { tx: juliaState.targetX + dx, ty: juliaState.targetY + dy };
        };

        const handleMouseDown = (e) => {
            if (e.target.closest('#afx-controls-dock') || e.target.closest('.afx-dialog')) return;
            const currentTime = (performance.now() * 0.001) - startTime;
            const { tx, ty } = getCoordsAt(e.clientX, e.clientY, currentTime);
            juliaState.targetX = tx;
            juliaState.targetY = ty;
            AnkiFX.setControlValue('julia-targetX', tx);
            AnkiFX.setControlValue('julia-targetY', ty);
        };
        window.addEventListener('mousedown', handleMouseDown);
        currentMouseListener = handleMouseDown;

        const handleMouseMove = (e) => {
            mousePos.x = e.clientX;
            mousePos.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        currentMouseMoveListener = handleMouseMove; 
    }

    const startTime = performance.now() * 0.001;

    function render() {
        const time = performance.now() * 0.001 - startTime;
        gl.uniform1f(timeLoc, time);
        gl.uniform1f(speedLoc, juliaState.speed);
        gl.uniform2f(cLoc, juliaState.cRe, juliaState.cIm);
        gl.uniform1f(zoomDepthLoc, juliaState.zoomDepth);
        gl.uniform2f(targetLoc, juliaState.targetX, juliaState.targetY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        ctx.clearRect(0, 0, currentW, currentH);

        if (debugInfoEl && getCoordsAt) {
            const currentTime = (performance.now() * 0.001) - startTime;
            const { tx, ty } = getCoordsAt(mousePos.x, mousePos.y, currentTime);
            debugInfoEl.textContent = `TARGET X: ${tx.toFixed(6)}, Y: ${ty.toFixed(6)}`;
        }
        animationId = requestAnimationFrame(render);
    }

    render();
}

export function stopJulia() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (currentMouseListener) {
        window.removeEventListener('mousedown', currentMouseListener);
        currentMouseListener = null;
    }
    if (currentMouseMoveListener) {
        window.removeEventListener('mousemove', currentMouseMoveListener);
        currentMouseMoveListener = null;
    }
    document.querySelectorAll('.julia-debug-el').forEach(el => el.remove());
    glCtx = null;
    resLoc = null;
}