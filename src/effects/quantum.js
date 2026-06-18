import { createFullscreenProgram } from '../core/webgl-utils.js';

// ============================================================
//  QUANTUM ENGINE — WebGL 1.0 Port
// ============================================================

const PHI = 1.6180339887;
const PI = Math.PI;
const PI_2 = Math.PI * 2;
const HALF_PI = Math.PI * 0.5;
const N = 360;
const STRIDE_INST = 9;

const OFF_SEED_U = 0;
const OFF_SEED_V = 1;
const OFF_FLOW_U = 2;
const OFF_FLOW_V = 3;
const OFF_X = 4;
const OFF_Y = 5;
const OFF_TX = 6;
const OFF_TY = 7;
const OFF_ALPHA = 8;
const OFF_ROT = 9;
const OFF_LEN = 10;
const OFF_KAP = 11;
const OFF_SYM = 12;
const OFF_LW = 13;
const OFF_HUE = 14;
const OFF_AMP = 15;

const TRANSITION_RATE = 1 / 240;
const ACCUM_ALPHA = { unity: 0.28, flow: 0.18 };
const MODE_DECAY = { unity: 0.95, flow: 0.85 };
const MODE_BG_OPACITY = { unity: 0.04, flow: 0.07 };
const CHORD_PAIRS_BY_MODE = { unity: [], flow: [] };

const PALETTE = [
    { h: 220, s: 85, l: 52 },
    { h: 174, s: 78, l: 44 },
    { h: 235, s: 70, l: 38 },
    { h: 42, s: 92, l: 56 }
];

const MODES = ['unity', 'flow'];

// Mode variable remains module-scoped for cross-session state persistence as per original code
let mode = parseInt(localStorage.getItem('ankifx_quantum_mode') || '0', 10);
if (isNaN(mode) || mode < 0 || mode >= MODES.length) mode = 0;
let prevMode = mode;

// ============================================================
//  WEBGL SHADERS
// ============================================================

const VS_QUAD = `
attribute vec2 position;
varying vec2 v_uv;
void main() {
    v_uv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FS_DECAY = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_decay;
varying vec2 v_uv;
void main() {
    float r = length(v_uv * 2.0 - 1.0);
    float d = 0.97 - 0.09 * smoothstep(0.4, 1.0, r);
    float tex = texture2D(u_tex, v_uv).r;
    gl_FragColor = vec4(tex * d * (u_decay / 0.97), 0.0, 0.0, 1.0);
}
`;

const VS_STAMP = `
attribute vec2 a_pos;
attribute float a_amp;
uniform vec2 u_resolution;
uniform float u_mirrorX;
varying float v_amp;
void main() {
    vec2 pos = a_pos;
    if (u_mirrorX > 0.5) pos.x = u_resolution.x - pos.x;
    vec2 uv = pos / u_resolution;
    gl_Position = vec4(uv.x * 2.0 - 1.0, uv.y * 2.0 - 1.0, 0.0, 1.0);
    gl_PointSize = 2.0;
    v_amp = a_amp;
}
`;

const FS_STAMP = `
precision mediump float;
varying float v_amp;
uniform float u_amount;
void main() {
    gl_FragColor = vec4(u_amount * v_amp, 0.0, 0.0, 1.0);
}
`;

const VS_ENTITY = `
attribute vec3 a_geom;
attribute vec2 a_pos;
attribute float a_rot;
attribute float a_kap;
attribute float a_len;
attribute float a_alpha;
attribute float a_sym;
attribute float a_hue;
attribute float a_amp;

uniform vec2 u_resolution;
uniform sampler2D u_memoryTex;
uniform float u_time;
uniform float u_mode;
uniform float u_isMemoryLayer;
uniform float u_mirrorX;

varying vec3 v_color;
varying float v_alpha;

vec3 hsv2rgb(float h, float s, float l) {
    float h_norm = h / 360.0;
    vec3 rgb = clamp(abs(mod(h_norm * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return l + s * (rgb - 0.5) * (1.0 - abs(2.0 * l - 1.0));
}

void main() {
    v_color = vec3(0.0);
    v_alpha = 0.0;
    
    vec2 res = max(u_resolution, vec2(1.0));
    vec2 uv = a_pos / res;
    float m = texture2D(u_memoryTex, vec2(uv.x, uv.y)).r;

    float len = a_len;
    float alpha = a_alpha;
    float sym = a_sym;
    float rot = a_rot;
    float kap = a_kap;
    float hue = a_hue;
    float amp = a_amp;

    bool isActive = true;

    if (u_isMemoryLayer > 0.5) {
        if (m < 0.25) {
            isActive = false;
        } else {
            vec2 nxny = (uv - 0.5) * 2.0;
            float r = length(nxny);
            float theta = atan(nxny.y, nxny.x);
            float w1 = sin(r * 4.0 - u_time * 0.40);
            float w2 = cos(theta * 3.0 + u_time * 0.24);
            float w3 = sin(r * 2.2 + theta * 2.0 - u_time * 0.31);

            rot = theta + 1.5707963 + w1 * w2 * 0.6 + w3 * 0.2;
            kap = (w1 * 0.5 + 0.5) * 0.4;
            hue = 45.0 + 175.0 * (0.5 - 0.5 * cos(u_time * 0.033 + r * 0.4));
            amp = 0.5 + 0.25 * w1 + 0.25 * w2;
            
            sym = floor(4.0 + m * 8.0);
            len = 30.0 * 0.35 * m;
            alpha = (m - 0.25) / 0.75 * 0.35;
        }
    } else {
        if (u_mode < 0.5) {
            len += m * 10.0;
            alpha *= (1.0 + 1.5 * m);
        } else {
            alpha *= (1.0 + m);
        }
    }

    if (alpha < 0.005) {
        isActive = false;
    }

    float k = a_geom.x;
    float isInner = a_geom.y;
    float t = a_geom.z;

    float symFloor = floor(sym);
    float symFrac = fract(sym);

    float activeAlpha = alpha;
    float armAngle = rot + k * (6.28318530718 / max(1.0, symFloor));
    float lengthScale = 1.0;

    if (abs(k - symFloor) < 0.01) {
        if (symFrac > 0.01) {
            float fracStep = 6.28318530718 / max(1.0, sym);
            armAngle = rot + symFloor * fracStep;
            activeAlpha *= symFrac;
        } else {
            isActive = false;
        }
    } else if (k > symFloor + 0.01) {
        isActive = false;
    }

    if (isInner > 0.5) {
        armAngle += 3.14159265359 / max(1.0, abs(k - symFloor) < 0.01 ? sym : symFloor);
        lengthScale = 0.45;
        activeAlpha *= 0.4;
    }

    if (!isActive) {
        gl_Position = vec4(-2.0, -2.0, -2.0, 1.0);
        return;
    }

    float signKap = sign(kap);
    if (abs(signKap) < 0.01) signKap = 1.0;
    float perpAngle = armAngle + signKap * 1.57079632679;

    float cosA = cos(armAngle);
    float sinA = sin(armAngle);

    vec2 pos = vec2(0.0);
    float absKap = abs(kap);

    if (absKap < 0.001) {
        float dx = cosA * len * lengthScale * 0.5;
        float dy = sinA * len * lengthScale * 0.5;
        pos = a_pos + vec2(dx, dy) * (t - 0.5) * 2.0;
    } else {
        float radius = 1.0 / max(0.001, absKap);
        float halfAngle = min(2.66896259092, (len * lengthScale / radius) * 0.5);
        
        float perpCos = signKap == 1.0 ? -sinA : sinA;
        float perpSin = signKap == 1.0 ? cosA : -cosA;
        
        vec2 cx_arc = a_pos + vec2(perpCos, perpSin) * radius;
        
        float startAngle = perpAngle + 3.14159265359 - halfAngle * signKap;
        float endAngle = perpAngle + 3.14159265359 + halfAngle * signKap;
        
        float currentAngle = mix(startAngle, endAngle, t);
        pos = cx_arc + vec2(cos(currentAngle), sin(currentAngle)) * radius;
    }

    if (u_mirrorX > 0.5) {
        pos.x = res.x - pos.x;
    }
    gl_Position = vec4((pos.x / res.x) * 2.0 - 1.0, 1.0 - (pos.y / res.y) * 2.0, 0.0, 1.0);
    
    float normHue = clamp((hue - 45.0) / 175.0, 0.0, 1.0);
    vec3 c1 = vec3(220.0, 0.85, 0.52);
    vec3 c2 = vec3(174.0, 0.78, 0.44);
    vec3 c3 = vec3(235.0, 0.70, 0.38);
    vec3 c4 = vec3(42.0, 0.92, 0.56);
    
    float p = fract(normHue);
    float tf = p * 4.0;
    float idx = floor(tf);
    float fractT = fract(tf);
    
    vec3 colA = c1, colB = c2;
    if (idx < 0.5) { colA = c1; colB = c2; }
    else if (idx < 1.5) { colA = c2; colB = c3; }
    else if (idx < 2.5) { colA = c3; colB = c4; }
    else { colA = c4; colB = c1; }
    
    float hDiff = colB.x - colA.x;
    if (hDiff > 180.0) colB.x -= 360.0;
    else if (hDiff < -180.0) colB.x += 360.0;
    
    float outH = mod(colA.x + hDiff * fractT, 360.0);
    float outS = clamp(colA.y + (colB.y - colA.y) * fractT + (amp - 0.5) * 0.16, 0.0, 1.0);
    float outL = clamp(colA.z + (colB.z - colA.z) * fractT + (amp - 0.5) * 0.16, 0.0, 1.0);
    
    v_color = hsv2rgb(outH, outS, outL);
    v_alpha = activeAlpha;
}
`;

const FS_ENTITY = `
precision mediump float;
varying vec3 v_color;
varying float v_alpha;
void main() {
    gl_FragColor = vec4(v_color * v_alpha, v_alpha);
}
`;

const VS_CHORD = `
attribute vec2 a_pos;
attribute float a_alpha;
uniform vec2 u_resolution;
uniform vec4 u_color;
varying vec4 v_color;
void main() {
    gl_Position = vec4((a_pos.x / u_resolution.x) * 2.0 - 1.0, 1.0 - (a_pos.y / u_resolution.y) * 2.0, 0.0, 1.0);
    v_color = u_color;
    if (a_alpha < 0.005) {
        v_color.a = 0.0;
    }
}
`;

const FS_CHORD = `
precision mediump float;
varying vec4 v_color;
void main() {
    gl_FragColor = vec4(v_color.rgb * v_color.a, v_color.a);
}
`;

const FS_COMPOSITE = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_alpha;
uniform float u_isUnity;
uniform vec3 u_centerColor;
varying vec2 v_uv;

void main() {
    float m = texture2D(u_tex, vec2(v_uv.x, 1.0 - v_uv.y)).r;
    if (m < 0.005) {
        gl_FragColor = vec4(0.0);
        return;
    }
    vec3 col = u_centerColor;
    if (u_isUnity > 0.5 && m > 0.3) {
        float t = (m - 0.3) * 2.0;
        float ct = clamp(t * t * (3.0 - 2.0 * t), 0.0, 1.0);
        col = mix(u_centerColor, vec3(240.0/255.0, 180.0/255.0, 60.0/255.0), ct);
    }
    gl_FragColor = vec4(col * m * u_alpha, m * u_alpha);
}
`;

const FS_GLOW = `
precision mediump float;
uniform vec2 u_resolution;
uniform vec3 u_color;
uniform float u_radius;
uniform float u_alphaBase;
varying vec2 v_uv;
void main() {
    vec2 px = v_uv * u_resolution;
    vec2 center = u_resolution * 0.5;
    float dist = length(px - center);
    if (dist > u_radius * 2.0) discard;
    float t = clamp(1.0 - dist / (u_radius * 2.0), 0.0, 1.0);
    float alpha = u_alphaBase * t;
    gl_FragColor = vec4(u_color * alpha, alpha);
}
`;

const FS_FADE = `
precision mediump float;
uniform sampler2D u_tex;
uniform float u_fade;
varying vec2 v_uv;
void main() {
    vec4 tex = texture2D(u_tex, v_uv);
    vec4 fadeCol = vec4(2.0/255.0, 2.0/255.0, 8.0/255.0, u_fade);
    gl_FragColor = mix(tex, fadeCol, u_fade);
}
`;

const FS_COPY = `
precision mediump float;
uniform sampler2D u_tex;
varying vec2 v_uv;
void main() {
    gl_FragColor = texture2D(u_tex, v_uv);
}
`;

const FS_VIGNETTE = `
precision mediump float;
uniform vec2 u_resolution;
varying vec2 v_uv;
void main() {
    vec2 px = v_uv * u_resolution;
    vec2 center = u_resolution * 0.5;
    float maxR = max(u_resolution.x, u_resolution.y) * 0.85 * 0.9;
    float dist = length(px - center);
    float t = clamp(dist / maxR, 0.0, 1.0);
    
    vec4 col0 = vec4(2.0/255.0, 3.0/255.0, 12.0/255.0, 0.35);
    vec4 col5 = vec4(0.0);
    vec4 col1 = vec4(2.0/255.0, 3.0/255.0, 12.0/255.0, 0.15);
    
    vec4 outCol;
    if (t < 0.5) {
        float mixT = t / 0.5;
        outCol = mix(col0, col5, mixT);
    } else {
        float mixT = (t - 0.5) / 0.5;
        outCol = mix(col5, col1, mixT);
    }
    gl_FragColor = vec4(outCol.rgb * outCol.a, outCol.a);
}
`;

// ============================================================
//  QUANTUM EFFECT INSTANCE
// ============================================================

export class QuantumEffectInstance {
    constructor(contexts, config) {
        this.contexts = contexts;
        this.config = config;
        this.destroyed = false;
        
        this.gl = null;
        this.ext = null;
        this.progEntity = null; this.progChord = null; this.progStamp = null;
        this.decayObj = null; this.compositeObj = null; this.glowObj = null;
        this.fadeObj = null; this.copyObj = null; this.vignetteObj = null;
        this.progDecay = null; this.progComposite = null; this.progGlow = null;
        this.progFade = null; this.progCopy = null; this.progVignette = null;
        this.instanceBuffer = null; this.entityGeomVBO = null; this.chordIBO = null; this.memoryGridVBO = null;
        this.fboA = null; this.fboB = null; this.screenFboA = null; this.screenFboB = null;
        this.mW = 0; this.mH = 0;
        this.geomCount = 0;
        this.memoryGridCount = 0;

        this.currentW = contexts.width;
        this.currentH = contexts.height;
        this.dpr = contexts.dpr;
        this.fbosNeedClear = true;
        this.time = 0;
        this.wasFlowActive = true;

        this.activeAttributes = new Uint8Array(16);
        this.activeDivisors = new Int32Array(16).fill(-1);

        this.gridCols = 18;
        this.gridRows = 20;

        this.entities = new Float32Array(N * 16);
        this.eSeedR = new Float32Array(N);
        this.eSeedTheta = new Float32Array(N);
        this.entityGridMap = new Int32Array(N);
        for (let i = 0; i < N; i++) this.entityGridMap[i] = i;

        this.instanceData = new Float32Array(N * STRIDE_INST);

        this.entitiesInit = false;
        this.firstFrame = true;

        this.transition = 1.0;
        this.transitionSmooth = 1.0;
        
        this.CHORD_PAIRS = [];
        this.chordCount = 0;
        
        this.memoryGridData = null; // Reused Float32Array to avoid per-frame GC pressure
        this.animationId = null;

        this.f_angle = 0;
        this.f_curvature = 0;
        this.f_huePhase = 0;
        this.f_amplitude = 0;
        this.crgb = { r: 0, g: 0, b: 0 };
    }

    init(gl) {
        this.gl = gl;
        this.ext = gl.getExtension('ANGLE_instanced_arrays');
        if (!this.ext) {
            console.error('[AnkiFX/Quantum] ANGLE_instanced_arrays missing!');
            throw new Error('ANGLE_instanced_arrays extension not supported');
        }

        this.progEntity = this.createProgram(VS_ENTITY, FS_ENTITY, 'ENTITY');
        this.progChord = this.createProgram(VS_CHORD, FS_CHORD, 'CHORD');
        this.progStamp = this.createProgram(VS_STAMP, FS_STAMP, 'STAMP');

        this.decayObj = createFullscreenProgram(gl, VS_QUAD, FS_DECAY);
        this.progDecay = this.decayObj.program;

        this.compositeObj = createFullscreenProgram(gl, VS_QUAD, FS_COMPOSITE);
        this.progComposite = this.compositeObj.program;

        this.glowObj = createFullscreenProgram(gl, VS_QUAD, FS_GLOW);
        this.progGlow = this.glowObj.program;

        this.fadeObj = createFullscreenProgram(gl, VS_QUAD, FS_FADE);
        this.progFade = this.fadeObj.program;

        this.copyObj = createFullscreenProgram(gl, VS_QUAD, FS_COPY);
        this.progCopy = this.copyObj.program;

        this.vignetteObj = createFullscreenProgram(gl, VS_QUAD, FS_VIGNETTE);
        this.progVignette = this.vignetteObj.program;

        this.cacheProgram(this.progEntity, 
            ['u_resolution', 'u_time', 'u_mode', 'u_memoryTex', 'u_isMemoryLayer', 'u_mirrorX'],
            ['a_geom', 'a_pos', 'a_rot', 'a_kap', 'a_len', 'a_alpha', 'a_sym', 'a_hue', 'a_amp']
        );
        this.cacheProgram(this.progChord,
            ['u_color', 'u_resolution'],
            ['a_pos', 'a_alpha']
        );
        this.cacheProgram(this.progStamp,
            ['u_resolution', 'u_mirrorX', 'u_amount'],
            ['a_pos', 'a_amp']
        );
        this.cacheProgram(this.progDecay,
            ['u_tex', 'u_decay'],
            ['position']
        );
        this.cacheProgram(this.progComposite,
            ['u_tex', 'u_alpha', 'u_isUnity', 'u_centerColor'],
            ['position']
        );
        this.cacheProgram(this.progGlow,
            ['u_resolution', 'u_color', 'u_radius', 'u_alphaBase'],
            ['position']
        );
        this.cacheProgram(this.progFade,
            ['u_tex', 'u_fade'],
            ['position']
        );
        this.cacheProgram(this.progCopy,
            ['u_tex'],
            ['position']
        );
        this.cacheProgram(this.progVignette,
            ['u_resolution'],
            ['position']
        );

        this.instanceBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.instanceData.byteLength, gl.DYNAMIC_DRAW);

        this.chordIBO = gl.createBuffer();

        this.entityGeomVBO = gl.createBuffer();
        const MAX_ARMS = 14;
        const VERTS_PER_ARC = 16;
        const geomData = new Float32Array(MAX_ARMS * 2 * VERTS_PER_ARC * 2 * 3);
        let gIdx = 0;
        for (let arm = 0; arm < MAX_ARMS; arm++) {
            for (let type = 0; type < 2; type++) {
                for (let i = 0; i < VERTS_PER_ARC; i++) {
                    const t1 = i / VERTS_PER_ARC;
                    const t2 = (i + 1) / VERTS_PER_ARC;
                    geomData[gIdx++] = arm; geomData[gIdx++] = type; geomData[gIdx++] = t1;
                    geomData[gIdx++] = arm; geomData[gIdx++] = type; geomData[gIdx++] = t2;
                }
            }
        }
        this.geomCount = geomData.length / 3;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.entityGeomVBO);
        gl.bufferData(gl.ARRAY_BUFFER, geomData, gl.STATIC_DRAW);

        this.activeAttributes.fill(0);
        this.activeDivisors.fill(-1);

        this.resizeFBOs(gl);
        this.resizeScreenFBOs(gl);
        this.updateMemoryGrid(gl);
        this.initEntities();

        this.animationId = requestAnimationFrame(this.loop);
    }

    loop = (now) => {
        if (this.destroyed) return;
        if (typeof window !== 'undefined' && window.AnkiFX && window.AnkiFX.currentEffectId !== 'quantum') return;
        
        // Timing & Safety checks
        if (window.AnkiFX && window.AnkiFX.isContextLost) {
            this.animationId = requestAnimationFrame(this.loop);
            return;
        }

        try {
            this.render();
            this.animationId = requestAnimationFrame(this.loop);
        } catch (err) {
            console.error('[AnkiFX/Quantum] Render loop execution crash:', err);
            // Propagate up to engine failure counter if running under AnkiFX orchestration
            if (window.AnkiFX && typeof window.AnkiFX.onRenderFailure === 'function') {
                window.AnkiFX.onRenderFailure(err);
            }
        }
    };

    resize(w, h, dp) {
        this.currentW = w; this.currentH = h; this.dpr = dp;
        this.updateGridDimensions();
        if (this.gl) {
            this.resizeFBOs(this.gl);
            this.resizeScreenFBOs(this.gl);
            this.updateMemoryGrid(this.gl);
        }
    }

    compileShader(type, source, name = 'shader', typeName = 'shader') {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            console.error(`${name} ${typeName} compile error:\n`, log);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    createProgram(vsSource, fsSource, name = 'shader') {
        const gl = this.gl;
        const vs = this.compileShader(gl.VERTEX_SHADER, vsSource, name, 'vertex');
        if (!vs) {
            throw new Error(`${name}: vertex shader failed to compile`);
        }
        const fs = this.compileShader(gl.FRAGMENT_SHADER, fsSource, name, 'fragment');
        if (!fs) {
            gl.deleteShader(vs);
            throw new Error(`${name}: fragment shader failed to compile`);
        }
        const prog = gl.createProgram();
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.linkProgram(prog);

        gl.detachShader(prog, vs);
        gl.detachShader(prog, fs);
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            console.error(`${name} link error:`);
            console.error(gl.getProgramInfoLog(prog));
            gl.deleteProgram(prog);
            return null;
        }
        return prog;
    }

    createFBO(w, h) {
        const gl = this.gl;
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        return { tex, fbo, w, h };
    }

    getGridDimensions(w, h) {
        let bestCols = 18;
        let bestRows = 20;
        let bestDiff = Infinity;
        const aspect = w / h;
        for (let c = 1; c <= N; c++) {
            if (N % c === 0) {
                const r = N / c;
                const diff = Math.abs((c / r) - aspect);
                if (diff < bestDiff) {
                    bestDiff = diff;
                    bestRows = r;
                }
            }
        }
        bestCols = N / bestRows;
        return { cols: bestCols, rows: bestRows };
    }

    buildUnityGridChords(cols, rows) {
        const pairs = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const i = r * cols + c;
                if (c + 1 < cols) pairs.push(i, r * cols + (c + 1));
                if (r + 1 < rows) pairs.push(i, (r + 1) * cols + c);
                if (c + 1 < cols && r + 1 < rows) pairs.push(i, (r + 1) * cols + (c + 1));
                if (c - 1 >= 0 && r + 1 < rows) pairs.push(i, (r + 1) * cols + (c - 1));
            }
        }
        return pairs;
    }

    updateGridDimensions() {
        const w = this.currentW || 400;
        const h = this.currentH || 800;
        const { cols, rows } = this.getGridDimensions(w, h);
        this.gridCols = cols;
        this.gridRows = rows;
        CHORD_PAIRS_BY_MODE.unity = this.buildUnityGridChords(this.gridCols, this.gridRows);
        if (MODES[mode] === 'unity') {
            this.updateUnityChordsMapping();
            this.chordCount = this.CHORD_PAIRS.length;
            this.updateChordIBO();
        }
    }

    updateChordIBO() {
        if (!this.gl || !this.chordIBO) return;
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.chordIBO);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.CHORD_PAIRS), this.gl.DYNAMIC_DRAW);
    }

    evaluateF_from_r_theta(r, theta, time) {
        const w1 = Math.sin(r * 4.0 - time * 0.40);
        const w2 = Math.cos(theta * 3.0 + time * 0.24);
        const w3 = Math.sin(r * 2.2 + theta * 2.0 - time * 0.31);
        this.f_angle = theta + HALF_PI + w1 * w2 * 0.6 + w3 * 0.2;
        this.f_curvature = w1 * 0.5 + 0.5;
        this.f_huePhase = 45.0 + 175.0 * (0.5 - 0.5 * Math.cos(time * 0.033 + r * 0.4));
        this.f_amplitude = 0.5 + 0.25 * w1 + 0.25 * w2;
    }

    evaluateF(nx, ny, time) {
        const r = Math.sqrt(nx * nx + ny * ny);
        const theta = Math.atan2(ny, nx);
        this.evaluateF_from_r_theta(r, theta, time);
    }

    initEntities() {
        if (this.entitiesInit) return;
        for (let i = 0; i < N; i++) {
            const t = i / N;
            const u = PI_2 * t;
            const v = PI_2 * ((i * PHI) % 1);
            const x = Math.cos(u) * Math.cos(v);
            const y = Math.sin(u) * Math.sin(v);

            const idx = i * 16;
            this.entities[idx + OFF_SEED_U] = x;
            this.entities[idx + OFF_SEED_V] = y;
            this.entities[idx + OFF_FLOW_U] = x;
            this.entities[idx + OFF_FLOW_V] = y;
            this.entities[idx + OFF_X] = 0;
            this.entities[idx + OFF_Y] = 0;
            this.entities[idx + OFF_TX] = 0;
            this.entities[idx + OFF_TY] = 0;
            this.entities[idx + OFF_ALPHA] = 0;
            this.entities[idx + OFF_ROT] = 0;
            this.entities[idx + OFF_LEN] = 12;
            this.entities[idx + OFF_KAP] = 0;
            this.entities[idx + OFF_SYM] = 1.0;
            this.entities[idx + OFF_LW] = 1;
            this.entities[idx + OFF_HUE] = 0;
            this.entities[idx + OFF_AMP] = 0.5;

            this.eSeedR[i] = Math.sqrt(x * x + y * y);
            this.eSeedTheta[i] = Math.atan2(y, x);
        }
        this.updateGridDimensions();
        this.entitiesInit = true;
        this.firstFrame = true;
        for (let i = 0; i < N; i++) {
            this.entityGridMap[i] = i;
        }
        if (MODES[mode] === 'unity') {
            this.updateUnityChordsMapping();
            this.chordCount = this.CHORD_PAIRS.length;
        } else {
            this.CHORD_PAIRS = [];
            this.chordCount = 0;
        }
        this.updateChordIBO();
    }

    matchEntitiesToGrid() {
        const gridPositions = [];
        const w = this.currentW || 400;
        const h = this.currentH || 800;
        for (let r = 0; r < this.gridRows; r++) {
            for (let c = 0; c < this.gridCols; c++) {
                const gx = (c + 0.5) * (w / this.gridCols);
                const gy = (r + 0.5) * (h / this.gridRows);
                gridPositions.push({ x: gx, y: gy, idx: r * this.gridCols + c });
            }
        }

        const pairs = [];
        for (let i = 0; i < N; i++) {
            const idx = i * 16;
            const ex = this.entities[idx + OFF_X];
            const ey = this.entities[idx + OFF_Y];
            for (let g = 0; g < N; g++) {
                const gp = gridPositions[g];
                const dx = ex - gp.x;
                const dy = ey - gp.y;
                const distSq = dx * dx + dy * dy;
                pairs.push({ entityIdx: i, gridIdx: gp.idx, distSq });
            }
        }

        pairs.sort((a, b) => a.distSq - b.distSq);

        const entityAssigned = new Uint8Array(N);
        const gridAssigned = new Uint8Array(N);
        let assignedCount = 0;

        for (let p = 0; p < pairs.length; p++) {
            const { entityIdx, gridIdx } = pairs[p];
            if (!entityAssigned[entityIdx] && !gridAssigned[gridIdx]) {
                this.entityGridMap[entityIdx] = gridIdx;
                entityAssigned[entityIdx] = 1;
                gridAssigned[gridIdx] = 1;
                assignedCount++;
                if (assignedCount === N) break;
            }
        }
    }

    updateUnityChordsMapping() {
        const invMap = new Int32Array(N);
        for (let i = 0; i < N; i++) {
            invMap[this.entityGridMap[i]] = i;
        }
        const basePairs = CHORD_PAIRS_BY_MODE.unity;
        const mappedPairs = [];
        for (let i = 0; i < basePairs.length; i += 2) {
            const g1 = basePairs[i];
            const g2 = basePairs[i + 1];
            mappedPairs.push(invMap[g1], invMap[g2]);
        }
        this.CHORD_PAIRS = mappedPairs;
    }

    matchEntitiesToFlowOrbits() {
        const flowPositions = [];
        for (let f = 0; f < N; f++) {
            const idx = f * 16;
            const su = this.entities[idx + OFF_SEED_U];
            const sv = this.entities[idx + OFF_SEED_V];
            const fx = (su * 0.5 + 0.5) * this.currentW;
            const fy = (sv * 0.5 + 0.5) * this.currentH;
            flowPositions.push({ x: fx, y: fy, idx: f });
        }

        const pairs = [];
        for (let i = 0; i < N; i++) {
            const idx = i * 16;
            const ex = this.entities[idx + OFF_X];
            const ey = this.entities[idx + OFF_Y];
            for (let f = 0; f < N; f++) {
                const fp = flowPositions[f];
                const dx = ex - fp.x;
                const dy = ey - fp.y;
                const distSq = dx * dx + dy * dy;
                pairs.push({ entityIdx: i, flowIdx: fp.idx, distSq });
            }
        }

        pairs.sort((a, b) => a.distSq - b.distSq);

        const entityAssigned = new Uint8Array(N);
        const flowAssigned = new Uint8Array(N);
        let assignedCount = 0;

        for (let p = 0; p < pairs.length; p++) {
            const { entityIdx, flowIdx } = pairs[p];
            if (!entityAssigned[entityIdx] && !flowAssigned[flowIdx]) {
                const idx = entityIdx * 16;
                this.entities[idx + OFF_FLOW_U] = this.entities[flowIdx * 16 + OFF_SEED_U];
                this.entities[idx + OFF_FLOW_V] = this.entities[flowIdx * 16 + OFF_SEED_V];
                entityAssigned[entityIdx] = 1;
                flowAssigned[flowIdx] = 1;
                assignedCount++;
                if (assignedCount === N) break;
            }
        }
    }

    cycleMode() {
        this.fbosNeedClear = true;
        prevMode = mode;
        mode = (mode + 1) % MODES.length;
        this.transition = 0.0;
        if (MODES[mode] === 'unity') {
            this.matchEntitiesToGrid();
            this.updateUnityChordsMapping();
        } else {
            this.CHORD_PAIRS = [];
        }
        this.updateChordIBO();

        if (MODES[mode] === 'flow') {
            this.matchEntitiesToFlowOrbits();
        }
        localStorage.setItem('ankifx_quantum_mode', mode);
        if (effect.controls?.[0]) {
            effect.controls[0].label = getModeLabel(mode);
            if (typeof AnkiFX !== 'undefined' && AnkiFX.renderEffectControls) {
                AnkiFX.renderEffectControls(effect);
            }
        }
    }

    resizeFBOs(gl) {
        const scale = 4;
        const newMW = Math.floor(this.currentW / scale);
        const newMH = Math.floor(this.currentH / scale);
        if (newMW !== this.mW || newMH !== this.mH) {
            this.mW = newMW; this.mH = newMH;
            if (this.fboA) gl.deleteFramebuffer(this.fboA.fbo);
            if (this.fboB) gl.deleteFramebuffer(this.fboB.fbo);
            if (this.fboA) gl.deleteTexture(this.fboA.tex);
            if (this.fboB) gl.deleteTexture(this.fboB.tex);
            this.fboA = this.createFBO(this.mW, this.mH);
            this.fboB = this.createFBO(this.mW, this.mH);
        }
    }

    resizeScreenFBOs(gl) {
        const w = gl.canvas.width;
        const h = gl.canvas.height;
        if (!this.screenFboA || this.screenFboA.w !== w || this.screenFboA.h !== h) {
            if (this.screenFboA) gl.deleteFramebuffer(this.screenFboA.fbo);
            if (this.screenFboB) gl.deleteFramebuffer(this.screenFboB.fbo);
            if (this.screenFboA) gl.deleteTexture(this.screenFboA.tex);
            if (this.screenFboB) gl.deleteTexture(this.screenFboB.tex);
            this.screenFboA = this.createFBO(w, h);
            this.screenFboB = this.createFBO(w, h);
        }
    }

    updateMemoryGrid(gl) {
        const gridStep = 30;
        const cols = Math.floor(this.currentW / gridStep);
        const rows = Math.floor(this.currentH / gridStep);
        const total = cols * rows;
        
        if (!this.memoryGridData || this.memoryGridData.length < total * 2) {
            this.memoryGridData = new Float32Array(total * 2);
        }
        
        for (let i = 0; i < total; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            this.memoryGridData[i * 2] = (col + 0.5) * gridStep;
            this.memoryGridData[i * 2 + 1] = (row + 0.5) * gridStep;
        }
        if (!this.memoryGridVBO) this.memoryGridVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.memoryGridVBO);
        gl.bufferData(gl.ARRAY_BUFFER, this.memoryGridData.subarray(0, total * 2), gl.STATIC_DRAW);
        this.memoryGridCount = total;
    }

    clearFBOsDirect(gl) {
        if (!gl) return;
        gl.disable(gl.SCISSOR_TEST);
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        const fbos = [this.fboA, this.fboB, this.screenFboA, this.screenFboB];
        for (let i = 0; i < fbos.length; i++) {
            const f = fbos[i];
            if (f && f.fbo) {
                gl.bindFramebuffer(gl.FRAMEBUFFER, f.fbo);
                gl.clear(gl.COLOR_BUFFER_BIT);
            }
        }
    }

    updatePaletteColorRgb(huePhase, amplitude) {
        const norm = Math.min(1.0, Math.max(0.0, (huePhase - 45.0) / 175.0));
        const p = (norm % 1.0 + 1.0) % 1.0;
        const t = p * 4;
        const idx1 = Math.floor(t) % 4;
        const idx2 = (idx1 + 1) % 4;
        const fract = t - Math.floor(t);

        const c1 = PALETTE[idx1];
        const c2 = PALETTE[idx2];
        let h1 = c1.h; let h2 = c2.h;
        let diff = h2 - h1;
        if (diff > 180) h2 -= 360;
        else if (diff < -180) h2 += 360;

        const h = ((h1 + (h2 - h1) * fract) % 360 + 360) % 360;
        const s = (c1.s + (c2.s - c1.s) * fract) + (amplitude - 0.5) * 16;
        const l = (c1.l + (c2.l - c1.l) * fract) + (amplitude - 0.5) * 16;

        const s_frac = Math.min(100, Math.max(0, s)) / 100;
        const l_frac = Math.min(100, Math.max(0, l)) / 100;
        
        const h_30 = h / 30;
        const a = s_frac * Math.min(l_frac, 1.0 - l_frac);
        
        const k0 = h_30 % 12;
        this.crgb.r = l_frac - a * Math.max(-1.0, Math.min(k0 - 3.0, 9.0 - k0, 1.0));
        
        const k8 = (8.0 + h_30) % 12;
        this.crgb.g = l_frac - a * Math.max(-1.0, Math.min(k8 - 3.0, 9.0 - k8, 1.0));
        
        const k4 = (4.0 + h_30) % 12;
        this.crgb.b = l_frac - a * Math.max(-1.0, Math.min(k4 - 3.0, 9.0 - k4, 1.0));
    }

    cacheProgram(prog, uniformsList, attribsList) {
        if (!prog) return;
        const gl = this.gl;
        prog.uniforms = {};
        for (let i = 0; i < uniformsList.length; i++) {
            const name = uniformsList[i];
            prog.uniforms[name] = gl.getUniformLocation(prog, name);
        }
        prog.attribs = {};
        for (let i = 0; i < attribsList.length; i++) {
            const name = attribsList[i];
            prog.attribs[name] = gl.getAttribLocation(prog, name);
        }
    }

    setupAttrib(loc, size, stride, offset, divisor) {
        if (loc < 0) return;
        const gl = this.gl;
        
        if (this.activeAttributes[loc] === 0) {
            gl.enableVertexAttribArray(loc);
            this.activeAttributes[loc] = 1;
        }
        
        gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, offset);
        
        if (this.activeDivisors[loc] !== divisor) {
            this.ext.vertexAttribDivisorANGLE(loc, divisor);
            this.activeDivisors[loc] = divisor;
        }
    }

    setupQuadAttributes(prog, buffer) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const loc = prog.attribs.position;
        if (loc >= 0) {
            this.setupAttrib(loc, 2, 8, 0, 0);
        }
        for (let i = 0; i < 16; i++) {
            if (i !== loc && this.activeAttributes[i] === 1) {
                gl.disableVertexAttribArray(i);
                this.activeAttributes[i] = 0;
                if (this.activeDivisors[i] !== 0) {
                    this.ext.vertexAttribDivisorANGLE(i, 0);
                    this.activeDivisors[i] = 0;
                }
            }
        }
    }

    setupStampAttributes() {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        const locPos = this.progStamp.attribs.a_pos;
        const locAmp = this.progStamp.attribs.a_amp;
        if (locPos >= 0) this.setupAttrib(locPos, 2, 36, 0, 0);
        if (locAmp >= 0) this.setupAttrib(locAmp, 1, 36, 32, 0);
        
        for (let i = 0; i < 16; i++) {
            if (i !== locPos && i !== locAmp && this.activeAttributes[i] === 1) {
                gl.disableVertexAttribArray(i);
                this.activeAttributes[i] = 0;
                if (this.activeDivisors[i] !== 0) {
                    this.ext.vertexAttribDivisorANGLE(i, 0);
                    this.activeDivisors[i] = 0;
                }
            }
        }
    }

    setupChordAttributes() {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        const locPos = this.progChord.attribs.a_pos;
        const locAlpha = this.progChord.attribs.a_alpha;
        if (locPos >= 0) this.setupAttrib(locPos, 2, 36, 0, 0);
        if (locAlpha >= 0) this.setupAttrib(locAlpha, 1, 36, 20, 0);
        
        for (let i = 0; i < 16; i++) {
            if (i !== locPos && i !== locAlpha && this.activeAttributes[i] === 1) {
                gl.disableVertexAttribArray(i);
                this.activeAttributes[i] = 0;
                if (this.activeDivisors[i] !== 0) {
                    this.ext.vertexAttribDivisorANGLE(i, 0);
                    this.activeDivisors[i] = 0;
                }
            }
        }
    }

    setupEntityAttributes(isMemoryLayer) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.entityGeomVBO);
        const locGeom = this.progEntity.attribs.a_geom;
        if (locGeom >= 0) this.setupAttrib(locGeom, 3, 12, 0, 0);
        
        const locPos = this.progEntity.attribs.a_pos;
        const locRot = this.progEntity.attribs.a_rot;
        const locKap = this.progEntity.attribs.a_kap;
        const locLen = this.progEntity.attribs.a_len;
        const locAlpha = this.progEntity.attribs.a_alpha;
        const locSym = this.progEntity.attribs.a_sym;
        const locHue = this.progEntity.attribs.a_hue;
        const locAmp = this.progEntity.attribs.a_amp;
        
        if (!isMemoryLayer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
            if (locPos >= 0) this.setupAttrib(locPos, 2, 36, 0, 1);
            if (locRot >= 0) this.setupAttrib(locRot, 1, 36, 8, 1);
            if (locKap >= 0) this.setupAttrib(locKap, 1, 36, 12, 1);
            if (locLen >= 0) this.setupAttrib(locLen, 1, 36, 16, 1);
            if (locAlpha >= 0) this.setupAttrib(locAlpha, 1, 36, 20, 1);
            if (locSym >= 0) this.setupAttrib(locSym, 1, 36, 24, 1);
            if (locHue >= 0) this.setupAttrib(locHue, 1, 36, 28, 1);
            if (locAmp >= 0) this.setupAttrib(locAmp, 1, 36, 32, 1);
            
            for (let i = 0; i < 16; i++) {
                if (i !== locGeom && i !== locPos && i !== locRot && i !== locKap &&
                    i !== locLen && i !== locAlpha && i !== locSym && i !== locHue && i !== locAmp &&
                    this.activeAttributes[i] === 1) {
                    gl.disableVertexAttribArray(i);
                    this.activeAttributes[i] = 0;
                    if (this.activeDivisors[i] !== 0) {
                        this.ext.vertexAttribDivisorANGLE(i, 0);
                        this.activeDivisors[i] = 0;
                    }
                }
            }
        } else {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.memoryGridVBO);
            if (locPos >= 0) this.setupAttrib(locPos, 2, 8, 0, 0);
            
            for (let i = 0; i < 16; i++) {
                if (i !== locGeom && i !== locPos && this.activeAttributes[i] === 1) {
                    gl.disableVertexAttribArray(i);
                    this.activeAttributes[i] = 0;
                    if (this.activeDivisors[i] !== 0) {
                        this.ext.vertexAttribDivisorANGLE(i, 0);
                        this.activeDivisors[i] = 0;
                    }
                }
            }
        }
    }

    render() {
        const gl = this.gl;
        if (!gl || this.destroyed) return;

        this.time += 0.012;
        if (this.transition < 1.0) this.transition = Math.min(1.0, this.transition + TRANSITION_RATE);
        this.transitionSmooth = this.transition * this.transition * (3 - 2 * this.transition);

        // CF is the center evaluation for palette and glow
        this.evaluateF_from_r_theta(0.0, 0.0, this.time);
        const cf_huePhase = this.f_huePhase;
        const cf_amplitude = this.f_amplitude;

        const flowActive = (MODES[mode] === 'flow') || (this.transition < 1.0 && MODES[prevMode] === 'flow');
        const ts = this.transitionSmooth;

        // Loop over entities to update orbits and project them
        for (let i = 0; i < N; i++) {
            const idx = i * 16;
            
            // Declare local projection variables
            let curX = 0, curY = 0, curRot = 0, curLen = 0, curKap = 0, curAlpha = 0, curSym = 0;
            let prevX = 0, prevY = 0, prevRot = 0, prevLen = 0, prevKap = 0, prevAlpha = 0, prevSym = 0;

            if (this.transition < 1.0) {
                // TRANSITION IS ACTIVE
                
                // A. Project Current Mode
                if (mode === 0) { // Current = Unity
                    this.evaluateF_from_r_theta(this.eSeedR[i], this.eSeedTheta[i], this.time);
                    const mapped = this.entityGridMap[i];
                    const col = mapped % this.gridCols;
                    const row = Math.floor(mapped / this.gridCols);
                    curX = (col + 0.5) * (this.currentW / this.gridCols);
                    curY = (row + 0.5) * (this.currentH / this.gridRows);
                    curRot = this.f_curvature * PI * 0.6 + this.f_angle * 0.12;
                    curLen = 26.0;
                    curKap = (this.f_curvature - 0.5) * 0.3;
                    curSym = 8.0;
                    curAlpha = 0.52 * Math.max(0.35, this.f_amplitude) * 0.4;
                } else { // Current = Flow
                    const flowU = this.entities[idx + OFF_FLOW_U];
                    const flowV = this.entities[idx + OFF_FLOW_V];
                    const r = Math.sqrt(flowU * flowU + flowV * flowV);
                    const theta = Math.atan2(flowV, flowU);
                    this.evaluateF_from_r_theta(r, theta, this.time);

                    const spiralBias = 0.28 * smoothstep(0.05, 0.25, r);
                    const spiralAngle = theta + (PHI / Math.max(0.15, r)) * spiralBias;
                    const spd = 0.0012 + this.f_amplitude * 0.0018;
                    this.entities[idx + OFF_FLOW_U] += (Math.cos(this.f_angle) * (1.0 - spiralBias) + Math.cos(spiralAngle) * spiralBias) * spd;
                    this.entities[idx + OFF_FLOW_V] += (Math.sin(this.f_angle) * (1.0 - spiralBias) + Math.sin(spiralAngle) * spiralBias) * spd;

                    if (Math.abs(this.entities[idx + OFF_FLOW_U]) > 1.1 || Math.abs(this.entities[idx + OFF_FLOW_V]) > 1.1) {
                        const rRand = Math.sqrt(Math.random());
                        const aRand = Math.random() * PI_2;
                        this.entities[idx + OFF_FLOW_U] = Math.cos(aRand) * rRand;
                        this.entities[idx + OFF_FLOW_V] = Math.sin(aRand) * rRand;
                    }

                    curX = (this.entities[idx + OFF_FLOW_U] * 0.5 + 0.5) * this.currentW;
                    curY = (this.entities[idx + OFF_FLOW_V] * 0.5 + 0.5) * this.currentH;
                    curRot = this.f_angle;
                    curLen = 80.0 + this.f_amplitude * 40.0;
                    curKap = (this.f_curvature - 0.5) * 3.5;
                    curSym = 6.0;
                    curAlpha = 0.28 * 0.5;
                }

                // B. Project Previous Mode
                if (prevMode === 0) { // Previous = Unity
                    this.evaluateF_from_r_theta(this.eSeedR[i], this.eSeedTheta[i], this.time);
                    const mapped = this.entityGridMap[i];
                    const col = mapped % this.gridCols;
                    const row = Math.floor(mapped / this.gridCols);
                    prevX = (col + 0.5) * (this.currentW / this.gridCols);
                    prevY = (row + 0.5) * (this.currentH / this.gridRows);
                    prevRot = this.f_curvature * PI * 0.6 + this.f_angle * 0.12;
                    prevLen = 26.0;
                    prevKap = (this.f_curvature - 0.5) * 0.3;
                    prevSym = 8.0;
                    prevAlpha = 0.52 * Math.max(0.35, this.f_amplitude) * 0.4;
                } else { // Previous = Flow
                    const flowU = this.entities[idx + OFF_FLOW_U];
                    const flowV = this.entities[idx + OFF_FLOW_V];
                    const r = Math.sqrt(flowU * flowU + flowV * flowV);
                    const theta = Math.atan2(flowV, flowU);
                    this.evaluateF_from_r_theta(r, theta, this.time);

                    if (mode === 0) { // Physics wasn't updated in current mode block because current is unity
                        const spiralBias = 0.28 * smoothstep(0.05, 0.25, r);
                        const spiralAngle = theta + (PHI / Math.max(0.15, r)) * spiralBias;
                        const spd = 0.0012 + this.f_amplitude * 0.0018;
                        this.entities[idx + OFF_FLOW_U] += (Math.cos(this.f_angle) * (1.0 - spiralBias) + Math.cos(spiralAngle) * spiralBias) * spd;
                        this.entities[idx + OFF_FLOW_V] += (Math.sin(this.f_angle) * (1.0 - spiralBias) + Math.sin(spiralAngle) * spiralBias) * spd;

                        if (Math.abs(this.entities[idx + OFF_FLOW_U]) > 1.1 || Math.abs(this.entities[idx + OFF_FLOW_V]) > 1.1) {
                            const rRand = Math.sqrt(Math.random());
                            const aRand = Math.random() * PI_2;
                            this.entities[idx + OFF_FLOW_U] = Math.cos(aRand) * rRand;
                            this.entities[idx + OFF_FLOW_V] = Math.sin(aRand) * rRand;
                        }
                    }

                    prevX = (this.entities[idx + OFF_FLOW_U] * 0.5 + 0.5) * this.currentW;
                    prevY = (this.entities[idx + OFF_FLOW_V] * 0.5 + 0.5) * this.currentH;
                    prevRot = this.f_angle;
                    prevLen = 80.0 + this.f_amplitude * 40.0;
                    prevKap = (this.f_curvature - 0.5) * 3.5;
                    prevSym = 6.0;
                    prevAlpha = 0.28 * 0.5;
                }

                // C. Interpolate rot
                let diffRot = curRot - prevRot;
                diffRot = Math.atan2(Math.sin(diffRot), Math.cos(diffRot));

                this.entities[idx + OFF_TX] = prevX + (curX - prevX) * ts;
                this.entities[idx + OFF_TY] = prevY + (curY - prevY) * ts;
                this.entities[idx + OFF_ROT] = prevRot + diffRot * ts;
                this.entities[idx + OFF_LEN] = prevLen + (curLen - prevLen) * ts;
                this.entities[idx + OFF_KAP] = prevKap + (curKap - prevKap) * ts;
                this.entities[idx + OFF_ALPHA] = prevAlpha + (curAlpha - prevAlpha) * ts;
                this.entities[idx + OFF_SYM] = prevSym + (curSym - prevSym) * ts;
            } else {
                // TRANSITION COMPLETED (NO INTERPOLATION)
                if (mode === 0) { // Unity
                    this.evaluateF_from_r_theta(this.eSeedR[i], this.eSeedTheta[i], this.time);
                    const mapped = this.entityGridMap[i];
                    const col = mapped % this.gridCols;
                    const row = Math.floor(mapped / this.gridCols);
                    curX = (col + 0.5) * (this.currentW / this.gridCols);
                    curY = (row + 0.5) * (this.currentH / this.gridRows);
                    curRot = this.f_curvature * PI * 0.6 + this.f_angle * 0.12;
                    curLen = 26.0;
                    curKap = (this.f_curvature - 0.5) * 0.3;
                    curSym = 8.0;
                    curAlpha = 0.52 * Math.max(0.35, this.f_amplitude) * 0.4;
                } else { // Flow
                    const flowU = this.entities[idx + OFF_FLOW_U];
                    const flowV = this.entities[idx + OFF_FLOW_V];
                    const r = Math.sqrt(flowU * flowU + flowV * flowV);
                    const theta = Math.atan2(flowV, flowU);
                    this.evaluateF_from_r_theta(r, theta, this.time);

                    // Physics update
                    const spiralBias = 0.28 * smoothstep(0.05, 0.25, r);
                    const spiralAngle = theta + (PHI / Math.max(0.15, r)) * spiralBias;
                    const spd = 0.0012 + this.f_amplitude * 0.0018;
                    this.entities[idx + OFF_FLOW_U] += (Math.cos(this.f_angle) * (1.0 - spiralBias) + Math.cos(spiralAngle) * spiralBias) * spd;
                    this.entities[idx + OFF_FLOW_V] += (Math.sin(this.f_angle) * (1.0 - spiralBias) + Math.sin(spiralAngle) * spiralBias) * spd;

                    if (Math.abs(this.entities[idx + OFF_FLOW_U]) > 1.1 || Math.abs(this.entities[idx + OFF_FLOW_V]) > 1.1) {
                        const rRand = Math.sqrt(Math.random());
                        const aRand = Math.random() * PI_2;
                        this.entities[idx + OFF_FLOW_U] = Math.cos(aRand) * rRand;
                        this.entities[idx + OFF_FLOW_V] = Math.sin(aRand) * rRand;
                    }

                    curX = (this.entities[idx + OFF_FLOW_U] * 0.5 + 0.5) * this.currentW;
                    curY = (this.entities[idx + OFF_FLOW_V] * 0.5 + 0.5) * this.currentH;
                    curRot = this.f_angle;
                    curLen = 80.0 + this.f_amplitude * 40.0;
                    curKap = (this.f_curvature - 0.5) * 3.5;
                    curSym = 6.0;
                    curAlpha = 0.28 * 0.5;
                }

                this.entities[idx + OFF_TX] = curX;
                this.entities[idx + OFF_TY] = curY;
                this.entities[idx + OFF_ROT] = curRot;
                this.entities[idx + OFF_LEN] = curLen;
                this.entities[idx + OFF_KAP] = curKap;
                this.entities[idx + OFF_ALPHA] = curAlpha;
                this.entities[idx + OFF_SYM] = curSym;
            }

            if (this.firstFrame) {
                this.entities[idx + OFF_X] = this.entities[idx + OFF_TX];
                this.entities[idx + OFF_Y] = this.entities[idx + OFF_TY];
            } else {
                this.entities[idx + OFF_X] += (this.entities[idx + OFF_TX] - this.entities[idx + OFF_X]) * 0.08;
                this.entities[idx + OFF_Y] += (this.entities[idx + OFF_TY] - this.entities[idx + OFF_Y]) * 0.08;
            }

            const instIdx = i * STRIDE_INST;
            this.instanceData[instIdx + 0] = this.entities[idx + OFF_X];
            this.instanceData[instIdx + 1] = this.entities[idx + OFF_Y];
            this.instanceData[instIdx + 2] = this.entities[idx + OFF_ROT];
            this.instanceData[instIdx + 3] = this.entities[idx + OFF_KAP];
            this.instanceData[instIdx + 4] = this.entities[idx + OFF_LEN];
            this.instanceData[instIdx + 5] = this.entities[idx + OFF_ALPHA];
            this.instanceData[instIdx + 6] = this.entities[idx + OFF_SYM];
            this.instanceData[instIdx + 7] = this.f_huePhase;
            this.instanceData[instIdx + 8] = this.f_amplitude;
        }
        this.firstFrame = false;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.instanceBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.instanceData);

        if (flowActive) {
            if (this.chordCount !== 0) {
                this.CHORD_PAIRS = [];
                this.chordCount = 0;
                this.updateChordIBO();
            }
        } else if (MODES[mode] === 'unity' && (this.chordCount === 0 || this.wasFlowActive)) {
            this.fbosNeedClear = true; // Clear buffers on entering unity
            this.updateUnityChordsMapping();
            this.chordCount = this.CHORD_PAIRS.length;
            this.updateChordIBO();
        }
        this.wasFlowActive = flowActive;

        if (this.fbosNeedClear) {
            this.clearFBOsDirect(gl);
            this.fbosNeedClear = false;
        }

        // FBO Decay Pass
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboB.fbo);
        gl.viewport(0, 0, this.mW, this.mH);
        gl.disable(gl.BLEND);
        gl.useProgram(this.progDecay);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.fboA.tex);
        gl.uniform1i(this.progDecay.uniforms.u_tex, 0);
        gl.uniform1f(this.progDecay.uniforms.u_decay, MODE_DECAY[MODES[mode]]);
        this.setupQuadAttributes(this.progDecay, this.decayObj.buffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // FBO Stamp Pass
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);
        gl.useProgram(this.progStamp);
        gl.uniform2f(this.progStamp.uniforms.u_resolution, this.currentW, this.currentH);
        gl.uniform1f(this.progStamp.uniforms.u_mirrorX, 0.0);
        gl.uniform1f(this.progStamp.uniforms.u_amount, 0.004);
        this.setupStampAttributes();
        gl.drawArrays(gl.POINTS, 0, N);
        if (flowActive) {
            gl.uniform1f(this.progStamp.uniforms.u_mirrorX, 1.0);
            gl.uniform1f(this.progStamp.uniforms.u_amount, 0.002);
            gl.drawArrays(gl.POINTS, 0, N);
        }
        gl.disable(gl.BLEND);
        
        // Swap buffers
        const temp = this.fboA; this.fboA = this.fboB; this.fboB = temp;

        // Screen Fade Pass
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.screenFboB.fbo);
        gl.viewport(0, 0, this.screenFboB.w, this.screenFboB.h);
        gl.useProgram(this.progFade);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.screenFboA.tex);
        gl.uniform1i(this.progFade.uniforms.u_tex, 0);
        gl.uniform1f(this.progFade.uniforms.u_fade, MODE_BG_OPACITY[MODES[mode]]);
        this.setupQuadAttributes(this.progFade, this.fadeObj.buffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);

        const actualDpr = gl.canvas.width / this.currentW;

        // A. Glow Pass
        gl.useProgram(this.progGlow);
        gl.uniform2f(this.progGlow.uniforms.u_resolution, gl.canvas.width, gl.canvas.height);
        this.updatePaletteColorRgb(cf_huePhase, cf_amplitude);
        gl.uniform3f(this.progGlow.uniforms.u_color, this.crgb.r, this.crgb.g, this.crgb.b);
        const radiusGlow = (18 + 8 * cf_amplitude) * (0.97 + cf_amplitude * 0.06);
        gl.uniform1f(this.progGlow.uniforms.u_radius, radiusGlow * actualDpr);
        gl.uniform1f(this.progGlow.uniforms.u_alphaBase, 0.08 * cf_amplitude);
        this.setupQuadAttributes(this.progGlow, this.glowObj.buffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // B. Chords Pass (Skip if chordCount is 0)
        if (MODES[mode] === 'unity' && this.chordCount > 0) {
            gl.useProgram(this.progChord);
            const chordSettleFactor = smoothstep(0.9, 1.0, this.transition);
            const c_alpha = (0.06 + 0.04 * cf_amplitude) * chordSettleFactor;
            gl.uniform4f(this.progChord.uniforms.u_color, this.crgb.r, this.crgb.g, this.crgb.b, c_alpha);
            gl.uniform2f(this.progChord.uniforms.u_resolution, this.currentW, this.currentH);
            this.setupChordAttributes();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.chordIBO);
            gl.drawElements(gl.LINES, this.chordCount, gl.UNSIGNED_SHORT, 0);
        }

        // C. Entities Rendering
        gl.useProgram(this.progEntity);
        gl.uniform2f(this.progEntity.uniforms.u_resolution, this.currentW, this.currentH);
        gl.uniform1f(this.progEntity.uniforms.u_time, this.time);
        gl.uniform1f(this.progEntity.uniforms.u_mode, mode);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.fboA.tex);
        gl.uniform1i(this.progEntity.uniforms.u_memoryTex, 0);

        this.setupEntityAttributes(false);
        gl.uniform1f(this.progEntity.uniforms.u_isMemoryLayer, 0.0);
        gl.uniform1f(this.progEntity.uniforms.u_mirrorX, 0.0);
        this.ext.drawArraysInstancedANGLE(gl.LINES, 0, this.geomCount, N);

        if (flowActive) {
            gl.uniform1f(this.progEntity.uniforms.u_mirrorX, 1.0);
            this.ext.drawArraysInstancedANGLE(gl.LINES, 0, this.geomCount, N);
        }

        // D. Memory Layer Rendering
        gl.uniform1f(this.progEntity.uniforms.u_isMemoryLayer, 1.0);
        gl.uniform1f(this.progEntity.uniforms.u_mirrorX, 0.0);
        this.setupEntityAttributes(true);
        this.ext.drawArraysInstancedANGLE(gl.LINES, 0, this.geomCount, this.memoryGridCount);

        // 4. Compositing Footprints to Screen
        gl.useProgram(this.progComposite);
        gl.uniform1f(this.progComposite.uniforms.u_alpha, ACCUM_ALPHA[MODES[mode]]);
        gl.uniform1f(this.progComposite.uniforms.u_isUnity, MODES[mode] === 'unity' ? 1.0 : 0.0);
        gl.uniform3f(this.progComposite.uniforms.u_centerColor, this.crgb.r, this.crgb.g, this.crgb.b);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.fboA.tex);
        this.setupQuadAttributes(this.progComposite, this.compositeObj.buffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Swap screen buffers
        const tmp = this.screenFboA; this.screenFboA = this.screenFboB; this.screenFboB = tmp;

        // Render screen texture to canvas
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.disable(gl.BLEND);
        gl.useProgram(this.progCopy);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.screenFboA.tex);
        this.setupQuadAttributes(this.progCopy, this.copyObj.buffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        // Vignette Overlay
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.useProgram(this.progVignette);
        gl.uniform2f(this.progVignette.uniforms.u_resolution, gl.canvas.width, gl.canvas.height);
        this.setupQuadAttributes(this.progVignette, this.vignetteObj.buffer);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;

        if (currentInstance === this) {
            currentInstance = null;
        }
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        const gl = this.gl;
        if (gl) {
            try {
                if (this.instanceBuffer) gl.deleteBuffer(this.instanceBuffer);
                if (this.entityGeomVBO) gl.deleteBuffer(this.entityGeomVBO);
                if (this.chordIBO) gl.deleteBuffer(this.chordIBO);
                if (this.memoryGridVBO) gl.deleteBuffer(this.memoryGridVBO);

                if (this.decayObj && this.decayObj.buffer) gl.deleteBuffer(this.decayObj.buffer);
                if (this.compositeObj && this.compositeObj.buffer) gl.deleteBuffer(this.compositeObj.buffer);
                if (this.glowObj && this.glowObj.buffer) gl.deleteBuffer(this.glowObj.buffer);
                if (this.fadeObj && this.fadeObj.buffer) gl.deleteBuffer(this.fadeObj.buffer);
                if (this.copyObj && this.copyObj.buffer) gl.deleteBuffer(this.copyObj.buffer);
                if (this.vignetteObj && this.vignetteObj.buffer) gl.deleteBuffer(this.vignetteObj.buffer);

                if (this.fboA) { gl.deleteFramebuffer(this.fboA.fbo); gl.deleteTexture(this.fboA.tex); }
                if (this.fboB) { gl.deleteFramebuffer(this.fboB.fbo); gl.deleteTexture(this.fboB.tex); }
                if (this.screenFboA) { gl.deleteFramebuffer(this.screenFboA.fbo); gl.deleteTexture(this.screenFboA.tex); }
                if (this.screenFboB) { gl.deleteFramebuffer(this.screenFboB.fbo); gl.deleteTexture(this.screenFboB.tex); }

                if (this.progEntity) gl.deleteProgram(this.progEntity);
                if (this.progChord) gl.deleteProgram(this.progChord);
                if (this.progStamp) gl.deleteProgram(this.progStamp);
                if (this.progDecay) gl.deleteProgram(this.progDecay);
                if (this.progComposite) gl.deleteProgram(this.progComposite);
                if (this.progGlow) gl.deleteProgram(this.progGlow);
                if (this.progFade) gl.deleteProgram(this.progFade);
                if (this.progCopy) gl.deleteProgram(this.progCopy);
                if (this.progVignette) gl.deleteProgram(this.progVignette);
            } catch (err) {
                console.error('[AnkiFX/Quantum] Error releasing GPU resources in destroy:', err);
            }
        }

        this.gl = null;
        this.ext = null;
        this.progEntity = null; this.progChord = null; this.progStamp = null;
        this.decayObj = null; this.compositeObj = null; this.glowObj = null;
        this.fadeObj = null; this.copyObj = null; this.vignetteObj = null;
        this.progDecay = null; this.progComposite = null; this.progGlow = null;
        this.progFade = null; this.progCopy = null; this.progVignette = null;
        this.instanceBuffer = null; this.entityGeomVBO = null; this.chordIBO = null; this.memoryGridVBO = null;
        this.fboA = null; this.fboB = null; this.screenFboA = null; this.screenFboB = null;
    }

    onContextLost() {
        this.gl = null;
        this.ext = null;
        this.progEntity = null; this.progChord = null; this.progStamp = null;
        this.decayObj = null; this.compositeObj = null; this.glowObj = null;
        this.fadeObj = null; this.copyObj = null; this.vignetteObj = null;
        this.progDecay = null; this.progComposite = null; this.progGlow = null;
        this.progFade = null; this.progCopy = null; this.progVignette = null;
        this.instanceBuffer = null; this.entityGeomVBO = null; this.chordIBO = null; this.memoryGridVBO = null;
        this.fboA = null; this.fboB = null; this.screenFboA = null; this.screenFboB = null;
    }

    onContextRestored(gl) {
        this.gl = gl;
        this.init(gl);
    }
}

// Global active instance pointer for backwards-compatibility run/stop delegate wrappers
let currentInstance = null;

export function runQuantum(contexts, config) {
    if (currentInstance) {
        currentInstance.destroy();
    }
    currentInstance = new QuantumEffectInstance(contexts, config);
    currentInstance.init(contexts.gl);
}

export function stopQuantum() {
    if (currentInstance) {
        currentInstance.destroy();
        currentInstance = null;
    }
}

export const effect = {
    id: 'quantum',
    name: 'Quantum',
    isWebGL: true,
    createInstance(contexts, config) {
        currentInstance = new QuantumEffectInstance(contexts, config);
        return currentInstance;
    },
    run: runQuantum,
    stop: stopQuantum,
    onResize: (w, h, dp) => {
        if (currentInstance) {
            currentInstance.resize(w, h, dp);
        }
    },
    controls: [{
        type: 'button',
        id: 'quantum-mode-switch',
        label: getModeLabel(mode),
        onClick: () => {
            if (currentInstance) {
                currentInstance.cycleMode();
            }
        }
    }],
    marqueeFont: {
        colorFn: (time, i) => {
            // Use static field evaluator safely
            const r = 0, theta = 0;
            const w1 = Math.sin(r * 4.0 - time * 0.016 * 0.40);
            const w2 = Math.cos(theta * 3.0 + time * 0.016 * 0.24);
            const w3 = Math.sin(r * 2.2 + theta * 2.0 - time * 0.016 * 0.31);
            const f_huePhase = 45.0 + 175.0 * (0.5 - 0.5 * Math.cos(time * 0.016 * 0.033 + r * 0.4));
            const f_amplitude = 0.5 + 0.25 * w1 + 0.25 * w2;

            const norm = ((f_huePhase - 45) / 175 + i * 0.02) % 1.0;
            return `hsl(${norm * 360}, ${70 + f_amplitude * 30}%, 60%)`;
        },
        shadowColor: 'rgba(255, 215, 0, 0.35)',
        shadowBlur: 14
    }
};

function getModeLabel(m) {
    switch (MODES[m]) {
        case 'unity': return '👁️ UNITY MODE';
        case 'flow': return '🌊 FLOW MODE';
        default: return '👁️ MODE';
    }
}

function smoothstep(edge0, edge1, x) {
    const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

// Mode variable remains module-scoped for cross-session state persistence as per original code