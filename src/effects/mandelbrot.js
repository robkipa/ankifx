import { Marquee } from './marquee.js';

let animationId = null;
let activeWrapper = null;
let currentResizeListener = null;

export const effect = {
    id: 'mandelbrot',
    name: 'Mandelbrot',
    run: runMandelbrot,
    stop: stopMandelbrot,
    preferredTrack: { title: "Acoustica Power Bundle 4", trackTitle: "AiR" }
};

export function runMandelbrot(container, marqueeText, position = 'bottom') {
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
            vec2 target = vec2(-0.743643887037151, 0.131825904205330);

            // 3. Cinematic Zoom & Coordinate Logic
            // Sync with Julia: One-way slow dive that locks at max depth
            float zoomDepth = 13.0; 
            float progress = clamp(u_time * 0.025 / max(zoomDepth, 1.0), 0.0, 1.0);
            float easedProgress = easeOutCubic(progress);
            
            float zoom = exp(easedProgress * zoomDepth);
            vec2 c = target + uv * (2.5 / zoom);
            vec2 z = vec2(0.0);
            float iter = 0.0;
            
            // Dynamic Iterations: Saves GPU when zoomed out, adds detail when zoomed in
            float maxIter = clamp(150.0 + 65.0 * log(zoom), 150.0, 1000.0);
            const float ABSOLUTE_MAX = 1000.0;

            // Fractal Loop
            for(float i = 0.0; i < ABSOLUTE_MAX; i++) {
                if (i >= maxIter) break;
                z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
                if(dot(z, z) > 256.0) break; 
                iter++;
            }

            vec3 col = vec3(0.0);

            if(iter < maxIter - 1.0) {
                // Smooth Shading & Coloring
                float smoothIter = iter - log2(max(1.0, log2(dot(z, z)))) + 4.0;
                float colorMap = fract(smoothIter * 0.03 - u_time * 0.2);
                col = palette(colorMap);
            }

            // Vignette Effect
            vec2 normUv = gl_FragCoord.xy / u_resolution.xy;
            float vignette = clamp(1.0 - length(normUv - 0.5) * 1.2, 0.0, 1.0);
            vignette = smoothstep(0.0, 1.0, vignette);
            col *= mix(0.2, 1.0, vignette); // Darken edges

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

    // 3. Viewport & Resize Management (High-DPI Support)
    let w, h;
    function resize() {
        w = container.clientWidth;
        h = container.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        
        glCanvas.width = w * dpr;
        glCanvas.height = h * dpr;
        textCanvas.width = w * dpr;
        textCanvas.height = h * dpr;

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

    // 4. Main Render Loop (Frame-rate independent)
    const startTime = performance.now() * 0.001;
    
    function render() {
        const time = performance.now() * 0.001 - startTime;

        // Render Fractal (GPU)
        gl.uniform1f(timeLoc, time);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Render Marquee (CPU)
        ctx.clearRect(0, 0, w, h);
        marquee.render(ctx, w, h);

        animationId = requestAnimationFrame(render);
    }

    render();
    return marquee;
}

export function stopMandelbrot() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (activeWrapper) {
        // Prevent lingering listeners
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