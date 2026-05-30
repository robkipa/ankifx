let animationId = null;
let currentW = 0, currentH = 0;
let gl = null;
let program = null;
let blobs = [];
let lastTime = 0;
let positionBuffer = null;

let mouse = { x: -1000, y: -1000, dx: 0, dy: 0, down: false };
let canvasEl = null;

export const effect = {
    id: 'lavalamp',
    name: 'Lava Lamp',
    run: runLavalamp,
    stop: stopLavalamp,
    onResize: handleResize,
    marqueeFont: {
        color: '#ffccaa',
        shadowColor: 'rgba(255, 100, 0, 0.8)',
        shadowBlur: 10
    }
};

const MAX_BLOBS = 6;

class LavaBlob {
    constructor(x, y, radius, h) {
        this.pos = { x, y };
        // Small initial upward nudge in pixels/second (px/s)
        this.vel = { x: 0, y: -(Math.random() * 0.6 + 0.3) };
        this.radius = radius;
        
        // Spawn temperature based on position — cold if near bottom (about to heat up)
        // This ensures the simulation starts in a realistic pooled state
        const normalizedY = y / h;
        this.temperature = 0.15 + normalizedY * 0.3 + Math.random() * 0.15;
        
        this.buoyancy = 0;
        this.noiseOffset = Math.random() * 1000;
        
        // Smoothed speed for stable axis-aligned stretching
        this.smoothSpeedY = 0;
    }

    update(dt, w, h) {
        // Slower thermal rates — longer dwell at base building up energy
        if (this.pos.y > h * 0.80) {        // catches submerged blobs at bottom
            this.temperature += 0.05 * dt;   // was 0.09 — takes longer to heat fully
        } else if (this.pos.y > h * 0.60) {
            this.temperature += 0.02 * dt;   // was 0.03
        } else if (this.pos.y < h * 0.20) { // catches ceiling-absorbed blobs at top
            this.temperature -= 0.04 * dt;   // was 0.05
        } else if (this.pos.y < h * 0.40) {
            this.temperature -= 0.015 * dt;  // was 0.02
        }
        // In the middle, temperature is perfectly preserved (thermal inertia)

        this.temperature = Math.max(0, Math.min(1, this.temperature));

        // Buoyancy increases with heat: hot = positive (rises), cold = negative (sinks)
        // Wider buoyancy range — more force once threshold is crossed
        this.buoyancy = this.temperature * 4.0 - 2.0;  // was 3.4 - 1.7 (now -2.0 to +2.0)

        // Vertical movement with convective force in px/s^2 (consistent units)
        this.vel.y -= this.buoyancy * 10.0 * dt;   // was 6.0 — faster transit when detached

        // Horizontal turbulence (ultra slow, subtle drift)
        const nx = Math.sin(this.noiseOffset + lastTime * 0.0002) * 0.1;
        this.vel.x += nx * dt * 0.3;  // 5x less lateral drift
        
        // Gentle center-seeking when thermally neutral (hovering Column)
        const neutrality = 1.0 - Math.min(Math.abs(this.buoyancy) / 0.8, 1.0);
        const centerPull = (w * 0.5 - this.pos.x) * 0.003 * neutrality;
        this.vel.x += centerPull * dt;
        
        // Container boundaries: proportional pushes in px/s^2 (soft containment)
        // Left/Right walls
        if (this.pos.x < this.radius) {
            this.vel.x += (this.radius - this.pos.x) * 2.0 * dt;  // softer bounce
        }
        if (this.pos.x > w - this.radius) {
            this.vel.x -= (this.pos.x - (w - this.radius)) * 2.0 * dt;
        }
        // Ceiling (top boundary - let them go completely off-screen for perfect top cap absorption)
        const topBound = -this.radius * 0.5;
        if (this.pos.y < topBound) {
            this.vel.y += (topBound - this.pos.y) * 8.0 * dt;
        }
        // Floor (bottom boundary - let them submerge 150% into the base to fully merge/absorb)
        const bottomBound = h + this.radius * 0.5;
        if (this.pos.y > bottomBound) {
            this.vel.y -= (this.pos.y - bottomBound) * 8.0 * dt;
        }

        // Viscous drag - split drag by axis (heavy lateral viscosity vs free vertical rise)
        const lateralDrag = Math.pow(0.97, dt * 60);
        this.vel.x *= lateralDrag;
        
        // Threshold-based drag: drag is much lower when blob is freely traveling
        const absB = Math.abs(this.buoyancy);
        const detached = absB > 0.8; // threshold for free movement (temp > 0.7 or < 0.3)
        const verticalDrag = detached
            ? Math.pow(0.994, dt * 60)   // nearly free travel — fast transit
            : Math.pow(0.975, dt * 60);  // pooling state — high viscosity holds it
        this.vel.y *= verticalDrag;
        
        // Near-boundary settling: damp only horizontal velocity near boundaries, never vertical
        // Vertical must stay free so buoyancy can extract the blob
        const floorProximity = Math.max(0, (this.pos.y - (h * 0.82)) / (h * 0.18));
        const ceilingProximity = Math.max(0, ((h * 0.18) - this.pos.y) / (h * 0.18));
        const lateralDamping = Math.pow(0.88, dt * 60 * (floorProximity + ceilingProximity));
        this.vel.x *= lateralDamping;

        // Interaction (converted to px/s impact) - push mostly vertically
        if (mouse.down) {
            const dx = this.pos.x - mouse.x;
            const dy = this.pos.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200) {
                const force = (200 - dist) / 200;
                this.vel.x += (mouse.dx * force * 1.5);
                this.vel.y += (mouse.dy * force * 8.0);
            }
        }

        // Smooth speed Y for stable, axis-aligned stretch
        this.smoothSpeedY += (Math.abs(this.vel.y) - this.smoothSpeedY) * (1.0 - Math.pow(0.05, dt));

        // Apply velocity directly (in px/s, removing * 60)
        this.pos.x += this.vel.x * dt;
        this.pos.y += this.vel.y * dt;
    }
}

const vsSource = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
        vUv = aPosition * 0.5 + 0.5;
        // Match canvas 2D coordinates (Y=0 is top)
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`;

const fsSource = `
    precision highp float;
    varying vec2 vUv;
    
    uniform vec2 uResolution;
    uniform float uTime;
    
    uniform vec4 uBlobs[${MAX_BLOBS}]; // x, y, radius, stretch
    uniform float uBlobTemp[${MAX_BLOBS}]; // temperature
    
    // Polynomial smooth minimum
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    float map(vec2 p) {
        float d = 10000.0;
        for (int i = 0; i < ${MAX_BLOBS}; i++) {
            float stretchY = max(uBlobs[i].w, 0.85);
            vec2 lp = p - uBlobs[i].xy;
            // Squash coordinate space: compress Y by stretchY, expand X to preserve area
            // This deforms the metric, not the SDF, so gradients stay well-behaved
            lp.x *= sqrt(stretchY);
            lp.y /= sqrt(stretchY);
            float blob = length(lp) - uBlobs[i].z;
            d = smin(d, blob, 60.0);
        }
        
        // Base merging constraint
        float floorDist = uResolution.y - p.y;
        d = smin(d, floorDist - 35.0, 120.0);
        
        return d;
    }
    
    vec3 calcNormal(vec2 p, float d) {
        vec2 e = vec2(1.0, 0.0);
        vec3 n = vec3(
            map(p + e.xy) - d,
            map(p + e.yx) - d,
            4.0 - min(0.0, d) * 0.5 // Flatten the center to remove sharp 'nipples'
        );
        return normalize(n);
    }
    
    void main() {
        vec2 p = vUv * uResolution;
        float d = map(p);
        
        // Background gradient
        vec3 bg = mix(vec3(0.08, 0.01, 0.0), vec3(0.2, 0.04, 0.0), vUv.y);
        
        // Lava Palette
        vec3 lavaBase = vec3(0.8, 0.15, 0.0);
        vec3 lavaHot = vec3(1.0, 0.6, 0.1);
        
        // Continuous soft subsurface glow around blobs
        float glow = exp(-max(0.0, d) * 0.02);
        vec3 glowBg = bg + vec3(0.95, 0.35, 0.0) * glow * 0.45;
        
        // Soft edge anti-aliasing
        float alpha = smoothstep(3.0, -3.0, d);
        
        if (d > 3.0) {
            gl_FragColor = vec4(glowBg, 1.0);
            return;
        }
        
        vec3 n = calcNormal(p, d);
        
        // Lighting setup
        vec3 lightDir = normalize(vec3(0.0, 1.0, 0.5)); // Warm base light
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        
        float diff = max(dot(n, lightDir), 0.0);
        
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(n, halfDir), 0.0), 32.0);
        
        // Thickness-based translucency inside the lava (d < 0)
        float thickness = abs(d);
        float translucency = exp(-thickness * 0.008);
        
        // Glowing orange-white inside thin filaments/necks, deep red in bodies
        vec3 dynamicLavaBase = mix(vec3(0.6, 0.05, 0.0), vec3(1.0, 0.55, 0.05), translucency);
        
        // Color mapping
        vec3 col = mix(dynamicLavaBase, lavaHot, diff);
        col += vec3(1.0, 0.9, 0.6) * spec * 0.7; // Highlights
        
        // Ambient rim light
        float rim = 1.0 - max(dot(n, viewDir), 0.0);
        col += vec3(0.9, 0.2, 0.0) * pow(rim, 3.0) * 0.8;
        
        // Blend lava directly with the glowing background (no black borders!)
        vec3 finalCol = mix(glowBg, col, alpha);
        
        gl_FragColor = vec4(finalCol, 1.0);
    }
`;

function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function initWebGL() {
    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    
    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        return false;
    }
    
    gl.useProgram(program);
    
    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const posAttr = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
    
    program.uResolution = gl.getUniformLocation(program, 'uResolution');
    program.uTime = gl.getUniformLocation(program, 'uTime');
    program.uBlobs = gl.getUniformLocation(program, 'uBlobs');
    program.uBlobTemp = gl.getUniformLocation(program, 'uBlobTemp');
    
    return true;
}

export function runLavalamp(contexts, config) {
    gl = contexts.gl;
    canvasEl = contexts.canvasGL;
    currentW = contexts.width;
    currentH = contexts.height;
    
    if (!gl) {
        console.error("WebGL context required for Lava Lamp");
        return;
    }
    
    if (!initWebGL()) return;
    
    // Initialize simulation
    blobs = [];
    let attempts = 0;
    while (blobs.length < MAX_BLOBS && attempts < 200) {
        attempts++;
        const radius = 70 + Math.random() * 60; // slightly smaller range
        const x = radius + Math.random() * (currentW - radius * 2);
        const y = radius + Math.random() * (currentH - radius * 2);
        
        // Check against already-placed blobs
        let overlaps = false;
        for (const b of blobs) {
            const dx = b.pos.x - x;
            const dy = b.pos.y - y;
            if (Math.sqrt(dx*dx + dy*dy) < b.radius + radius + 10) {
                overlaps = true;
                break;
            }
        }
        if (!overlaps) blobs.push(new LavaBlob(x, y, radius, currentH));
    }
    // Fallback if space is extremely tight (e.g. very small window)
    while (blobs.length < MAX_BLOBS) {
        const radius = 70 + Math.random() * 60;
        const x = radius + Math.random() * (currentW - radius * 2);
        const y = radius + Math.random() * (currentH - radius * 2);
        blobs.push(new LavaBlob(x, y, radius, currentH));
    }
    
    lastTime = performance.now();
    
    // Bind interaction events
    bindEvents();
    
    animationId = requestAnimationFrame(render);
}

function handleResize(w, h, dpr) {
    currentW = w;
    currentH = h;
    if (gl) {
        gl.viewport(0, 0, w * dpr, h * dpr);
    }
}

function render(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.05); // cap dt
    lastTime = now;
    
    // Update simulation
    const blobData = new Float32Array(MAX_BLOBS * 4);
    const tempData = new Float32Array(MAX_BLOBS);
    
    for (let i = 0; i < MAX_BLOBS; i++) {
        blobs[i].update(dt, currentW, currentH);
    }
    
    // Pack data for shader upload
    for (let i = 0; i < MAX_BLOBS; i++) {
        const b = blobs[i];
        
        // Stretch based on smoothed Y speed (always axis-aligned)
        const stretch = Math.max(0.85, 
            1.0 +
            Math.min(b.smoothSpeedY * 0.028, 0.7) *
            (0.4 + b.temperature * 0.6)
        );
        
        blobData[i * 4 + 0] = b.pos.x;
        blobData[i * 4 + 1] = b.pos.y;
        blobData[i * 4 + 2] = b.radius;
        blobData[i * 4 + 3] = stretch;
        
        tempData[i] = b.temperature;
    }
    
    // Render WebGL
    gl.useProgram(program);
    gl.uniform2f(program.uResolution, currentW, currentH);
    gl.uniform1f(program.uTime, now * 0.001);
    gl.uniform4fv(program.uBlobs, blobData);
    gl.uniform1fv(program.uBlobTemp, tempData);
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    
    // Reset mouse deltas
    mouse.dx = 0;
    mouse.dy = 0;
    
    animationId = requestAnimationFrame(render);
}

function handlePointer(e) {
    const rect = canvasEl.getBoundingClientRect();
    const touch = e.touches ? e.touches[0] : e;
    
    const newX = touch.clientX - rect.left;
    const newY = touch.clientY - rect.top;
    
    // Only calculate dragging delta on drag events, skipping the cold-start click/touchstart coordinates
    if (mouse.down && e.type !== 'mousedown' && e.type !== 'touchstart') {
        const dx = newX - mouse.x;
        const dy = newY - mouse.y;
        
        // Cap the maximum delta to prevent multi-touch jumps or glitch flings
        if (Math.abs(dx) < 150 && Math.abs(dy) < 150) {
            mouse.dx = dx;
            mouse.dy = dy;
        }
    }
    
    mouse.x = newX;
    mouse.y = newY;
}

function handleDown(e) {
    // Reset deltas first to avoid any leakage from previous states
    mouse.dx = 0;
    mouse.dy = 0;
    mouse.down = true;
    handlePointer(e);
}

function handleUp() {
    mouse.down = false;
}

function bindEvents() {
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('mouseup', handleUp);
    
    window.addEventListener('touchstart', handleDown, { passive: true });
    window.addEventListener('touchmove', handlePointer, { passive: true });
    window.addEventListener('touchend', handleUp);
}

function unbindEvents() {
    window.removeEventListener('mousedown', handleDown);
    window.removeEventListener('mousemove', handlePointer);
    window.removeEventListener('mouseup', handleUp);
    
    window.removeEventListener('touchstart', handleDown);
    window.removeEventListener('touchmove', handlePointer);
    window.removeEventListener('touchend', handleUp);
}

export function stopLavalamp() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    unbindEvents();
    
    if (gl) {
        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Optional: cleanup shaders/buffers
        if (program) gl.deleteProgram(program);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        program = null;
        positionBuffer = null;
    }
}
