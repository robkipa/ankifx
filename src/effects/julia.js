import { Marquee } from './marquee.js';

let animationId = null;
let activeWrapper = null;
let currentResizeListener = null;

export const effect = {
    id: 'julia',
    name: 'Julia Set',
    run: runJulia,
    stop: stopJulia,
    preferredTrack: { title: "Acoustica Power Bundle 4", trackTitle: "AiR" },
    presets: [
        { name: 'Rabbit Core', cRe: -0.123, cIm: 0.745, zoomDepth: 5.0, targetX: -0.122, targetY: 0.744 },
        { name: 'Seahorse Spiral', cRe: -0.74543, cIm: 0.11301, zoomDepth: 12.0, targetX: -0.5299, targetY: 0.0739 },
        { name: 'Electric Lightning', cRe: 0.285, cIm: 0.013, zoomDepth: 6.0, targetX: -0.11, targetY: 0.65 },
        { name: 'Filigree', cRe: -0.70176, cIm: -0.3842, zoomDepth: 11.5, targetX: -0.08, targetY: -0.68 },
        { name: 'Fractal Storm', cRe: -0.7269, cIm: 0.1889, zoomDepth: 10.5, targetX: -0.22, targetY: 0.56 },
        { name: 'Black Hole', cRe: -0.8, cIm: 0.156, zoomDepth: 13, targetX: -0.531184, targetY: 0.078512 }
    ]
};

export function runJulia(container, marqueeText, position = 'bottom', config = {}) {
    const initialCRe = config.cRe !== undefined ? config.cRe : -0.8;
    const initialCIm = config.cIm !== undefined ? config.cIm : 0.156;
    const zoomDepth = config.zoomDepth !== undefined ? config.zoomDepth : 10.8;
    const targetX = config.targetX !== undefined ? config.targetX : -0.5273;
    const targetY = config.targetY !== undefined ? config.targetY : 0.0757;

    // 1. Dual-Canvas Setup
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; pointer-events: none;';
    container.appendChild(wrapper);
    activeWrapper = wrapper;

    const glCanvas = document.createElement('canvas');
    glCanvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
    wrapper.appendChild(glCanvas);

    const textCanvas = document.createElement('canvas');
    textCanvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%;';
    wrapper.appendChild(textCanvas);

    const gl = glCanvas.getContext('webgl', { alpha: false, antialias: false });
    const ctx = textCanvas.getContext('2d');

    // 2. WebGL Shaders
    const vsSource = `
        attribute vec2 position;
        void main() { gl_Position = vec4(position, 0.0, 1.0); }
    `;

    const fsSource = `
        precision highp float;
        uniform vec2 u_resolution;
        uniform float u_time;
        uniform vec2 u_c; 
        uniform float u_zoomDepth;
        uniform vec2 u_target;

        // Majestic Deep-Gold Palette
        vec3 palette(float t) {
            vec3 a = vec3(0.5, 0.5, 0.5);
            vec3 b = vec3(0.5, 0.5, 0.5);
            vec3 c = vec3(1.0, 0.7, 0.4);
            vec3 d = vec3(0.0, 0.15, 0.20);
            return a + b * cos(6.28318 * (c * t + d));
        }

        // Cubic Easing for cinematic approach
        float easeOutCubic(float x) {
            return 1.0 - pow(1.0 - x, 3.0);
        }

        void main() {
            vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
            
            // 3. Cinematic Zoom & Coordinate Logic
            // Map time to a 0.0 -> 1.0 progress limit
            float progress = clamp(u_time * 0.025 / max(u_zoomDepth, 1.0), 0.0, 1.0);
            float easedProgress = easeOutCubic(progress);
            
            float zoom = exp(easedProgress * u_zoomDepth);
            float scale = 2.2 / zoom;
            vec2 z = u_target + uv * scale;

            // 4. Camera Rotation (Slows down as zoom finishes)
            float angle = easedProgress * 3.14159 * 0.5; // 90 degree rotation over full zoom
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            z = u_target + rot * (z - u_target);

            float iter = 0.0;
            float maxIter = 200.0 + 60.0 * log(zoom);

            // 5. Fractal Iteration Loop
            for(float i = 0.0; i < 1000.0; i++) {
                if (i >= maxIter) break;
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + u_c;
                if(dot(z, z) > 64.0) break; 
                iter++;
            }

            vec3 col = vec3(0.0);

            if(iter < maxIter - 1.0) {
                // 6. Smooth Shading & Coloring
                float smoothIter = iter + 1.0 - log(log(dot(z, z))) / log(2.0);
                float colorMap = fract(smoothIter * 0.03 - u_time * 0.1);
                col = palette(colorMap);
            }

            // 7. Vignette Effect
            vec2 normUv = gl_FragCoord.xy / u_resolution.xy;
            float vignette = clamp(1.0 - length(normUv - 0.5) * 1.2, 0.0, 1.0);
            vignette = smoothstep(0.0, 1.0, vignette);
            col *= mix(0.3, 1.0, vignette); // Darken edges slightly

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

    // Buffer Binding
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const cLoc = gl.getUniformLocation(program, "u_c");
    const zoomDepthLoc = gl.getUniformLocation(program, "u_zoomDepth");
    const targetLoc = gl.getUniformLocation(program, "u_target");

    // 8. Viewport & Resize Management (with High-DPI support)
    let w, h;
    function resize() {
        w = container.clientWidth;
        h = container.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        
        // Scale physical canvas pixels for Retina/High-DPI
        glCanvas.width = w * dpr;
        glCanvas.height = h * dpr;
        textCanvas.width = w * dpr;
        textCanvas.height = h * dpr;

        // Reset context scale for the 2D marquee
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        
        gl.viewport(0, 0, w * dpr, h * dpr);
        gl.uniform2f(resLoc, w * dpr, h * dpr);
    }
    window.addEventListener('resize', resize);
    currentResizeListener = resize;
    resize();

    const marquee = new Marquee(marqueeText, position, {
        color: '#FFF',
        outline: '#000'
    });

    // 9. Main Render Loop
    const startTime = performance.now() * 0.001;
    function render() {
        const time = performance.now() * 0.001 - startTime;

        // 9.1 Render Julia Set
        gl.uniform1f(timeLoc, time);
        gl.uniform2f(cLoc, initialCRe, initialCIm);
        gl.uniform1f(zoomDepthLoc, zoomDepth);
        gl.uniform2f(targetLoc, targetX, targetY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // 9.2 Render Marquee
        ctx.clearRect(0, 0, w, h);
        // We pass logical w, h because we already scaled the 2D context by DPR
        marquee.render(ctx, w, h);

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
    
    if (activeWrapper) {
        if (currentResizeListener) {
            window.removeEventListener('resize', currentResizeListener);
            currentResizeListener = null;
        }        
        // Safely force WebGL to drop the context, preventing GPU memory leaks
        const glCanvas = activeWrapper.querySelector('canvas');
        if (glCanvas) {
            const gl = glCanvas.getContext('webgl');
            const loseContext = gl?.getExtension('WEBGL_lose_context');
            if (loseContext) loseContext.loseContext();
        }

        activeWrapper.remove();
        activeWrapper = null;
    }
}