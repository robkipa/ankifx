import { Marquee } from './marquee.js';

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
        { name: 'Seahorse Spiral', cRe: -0.74543, cIm: 0.11301, zoomDepth: 12.0, targetX: -0.529406, targetY: 0.072863 },
    ]
};

let currentMouseListener = null;
let currentMouseMoveListener = null;
let mousePos = { x: 0, y: 0 };
let juliaState = {
    cRe: -0.800,
    cIm: 0.156,
    zoomDepth: 10.0,
    targetX: -0.527503,
    targetY: 0.075912,
    speed: parseFloat(localStorage.getItem('ankifx_julia_speed')) || 0.15
};

export function runJulia(contexts, marqueeText, position = 'bottom', config = {}) {
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
            float maxIter = 200.0 + 60.0 * log(zoom);

            for(float i = 0.0; i < 1000.0; i++) {
                if (i >= maxIter) break;
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + u_c;
                if(dot(z, z) > 64.0) break; 
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
    if (config.debug) {
        const pickerStack = document.getElementById('afx-controls-stack-right');
        if (pickerStack) {
            debugInfoEl = document.createElement('div');
            debugInfoEl.id = 'afx-julia-debug-info';
            debugInfoEl.className = 'afx-control-row julia-debug-el';
            debugInfoEl.style.cssText = 'height: 20px !important; margin-bottom: 2px; pointer-events: none; justify-content: flex-end; opacity: 0.8; font-size: 11px !important; color: #ff00ff;';
            debugInfoEl.textContent = 'HOVER TO SEE TARGET COORDS';
            pickerStack.prepend(debugInfoEl);

            const createSlider = (label, key, min, max, step, precision = 3) => {
                const row = document.createElement('div');
                row.className = 'afx-control-row julia-tuner-row julia-debug-el';
                row.style.cssText = 'height: 24px !important; margin-bottom: 2px; gap: 8px; justify-content: flex-end; font-size: 10px !important; color: #00ffff;';
                
                const val = juliaState[key];
                row.innerHTML = `
                    <span>${label}:</span>
                    <input type="range" class="julia-slider" data-key="${key}" min="${min}" max="${max}" step="${step}" value="${val}" style="width: 70px; accent-color: #00ffff; cursor: pointer;">
                    <input type="number" class="julia-val" data-key="${key}" step="${step}" value="${val.toFixed(precision)}" style="width: 70px; background: rgba(0,0,0,0.4); border: 1px solid #00ffff; color: #00ffff; font-size: 10px !important; padding: 2px 4px; border-radius: 3px; outline: none;">
                `;

                const slider = row.querySelector('.julia-slider');
                const numInput = row.querySelector('.julia-val');

                const updateVal = (newVal, skipInput = false) => {
                    juliaState[key] = parseFloat(newVal);
                    if (!skipInput) numInput.value = juliaState[key].toFixed(precision);
                    slider.value = juliaState[key];
                    if (key === 'speed') localStorage.setItem('ankifx_julia_speed', juliaState[key]);
                };

                slider.oninput = (e) => updateVal(e.target.value);
                numInput.oninput = (e) => updateVal(e.target.value, true);
                
                return row;
            };

            juliaState.cRe = config.cRe !== undefined ? config.cRe : -0.8;
            juliaState.cIm = config.cIm !== undefined ? config.cIm : 0.156;
            juliaState.zoomDepth = config.zoomDepth !== undefined ? config.zoomDepth : 10.0;
            juliaState.targetX = config.targetX !== undefined ? config.targetX : -0.527503;
            juliaState.targetY = config.targetY !== undefined ? config.targetY : 0.075912;

            pickerStack.prepend(createSlider('SPD', 'speed', 0.005, 0.3, 0.005, 3));
            pickerStack.prepend(createSlider('T-Y', 'targetY', -2.0, 2.0, 0.0001, 6));
            pickerStack.prepend(createSlider('T-X', 'targetX', -2.0, 2.0, 0.0001, 6));
            pickerStack.prepend(createSlider('ZOOM', 'zoomDepth', 2.0, 25.0, 0.1, 1));
            pickerStack.prepend(createSlider('C-IM', 'cIm', -1.0, 1.0, 0.001, 6));
            pickerStack.prepend(createSlider('C-RE', 'cRe', -1.5, 1.0, 0.001, 6));
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
            if (e.target.closest('.afx-controls-stack') || e.target.closest('.afx-dialog') || e.target.closest('.afx-dual-control-stack')) return;
            const currentTime = (performance.now() * 0.001) - startTime;
            const { tx, ty } = getCoordsAt(e.clientX, e.clientY, currentTime);
            juliaState.targetX = tx;
            juliaState.targetY = ty;
            ['targetX', 'targetY'].forEach(key => {
                const slider = document.querySelector(`.julia-slider[data-key="${key}"]`);
                const numInput = document.querySelector(`.julia-val[data-key="${key}"]`);
                if (slider) slider.value = juliaState[key];
                if (numInput) numInput.value = juliaState[key].toFixed(6);
            });
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

    const marquee = new Marquee(marqueeText, position, { color: '#FFF', outline: '#000' });
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
        marquee.render(ctx, currentW, currentH);

        if (debugInfoEl && getCoordsAt) {
            const currentTime = (performance.now() * 0.001) - startTime;
            const { tx, ty } = getCoordsAt(mousePos.x, mousePos.y, currentTime);
            debugInfoEl.textContent = `TARGET X: ${tx.toFixed(6)}, Y: ${ty.toFixed(6)}`;
        }
        animationId = requestAnimationFrame(render);
    }

    render();
    return marquee;
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