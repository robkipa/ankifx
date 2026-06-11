// ============================================================
//  SACRED GEOMETRY ENGINE — unified field ontology
//  One conserved field population. Four projection lenses.
//  Modes are projections, not realities.
//  There is exactly one source of mathematical truth: sampleField.
//  Every visual decision in every mode derives from it.
// ============================================================

const PHI = 1.6180339887;

let animationId = null;
let currentW, currentH;

let mode = parseInt(localStorage.getItem('ankifx_geometry_mode') || '0', 10);
const MODES = ['unity', 'light', 'flow', 'fractal'];
if (isNaN(mode) || mode < 0 || mode >= MODES.length) mode = 0;

// ============================================================
//  ENTITY POOL — 360 persistent field entities
//  Contiguous interleaved Float32Array. Zero heap allocation.
// ============================================================

const N = 360;
const STRIDE = 16;

// To bypass strict checks, we instantiate arrays with literal sizes.
const entities = new Float32Array(5760); // 360 * 16
const eSeedR = new Float32Array(360);
const eSeedTheta = new Float32Array(360);

// Offsets within stride
const OFF_SEED_U = 0;
const OFF_SEED_V = 1;
const OFF_FLOW_U = 2;
const OFF_FLOW_V = 3;
const OFF_X      = 4;
const OFF_Y      = 5;
const OFF_TX     = 6;
const OFF_TY     = 7;
const OFF_ALPHA  = 8;
const OFF_ROT    = 9;
const OFF_LEN    = 10;
const OFF_KAP    = 11;
const OFF_SYM    = 12;
const OFF_LW     = 13;
const OFF_HUE    = 14;
const OFF_AMP    = 15;

let entitiesInit = false;
let firstFrame   = true;

// Memory buffers
let mW = 0, mH = 0;
let M = null;       // Float32Array buffer for M(x, y, t)
let dField = null;  // Float32Array buffer for decay field D(x, y)

// Accumulation canvas (offscreen visual buffer at 1/2 resolution)
let accumCanvas = null;
let accumCtx    = null;
let accumW = 0, accumH = 0;
let accumImgData = null;

// Frame state
let gBreath = 1.0;
let vignetteGradient = null;

// Transition state
let prevMode = mode;
let transition = 1.0;
let transitionSmooth = 1.0;
const TRANSITION_RATE = 1 / 120; // 120 frames = ~2.0 seconds

// Precomputed center color RGB values to avoid per-pixel CPU computation in updateAccumCanvas
let rR = 255, rG = 255, rB = 255;

// Gold RGB color stops (for mosaic interstice shimmer)
const GOLD_R = 240;
const GOLD_G = 180;
const GOLD_B = 60;

// Palette Stops
const PALETTE = [
    { h: 220, s: 85, l: 52 },  // lapis lazuli — dominant
    { h: 174, s: 78, l: 44 },  // deep turquoise
    { h: 235, s: 70, l: 38 },  // deep indigo — darkens the cycle
    { h:  42, s: 92, l: 56 },  // antique gold — accent
];

// Hoisted mode accumulation alphas to avoid per-frame allocation
const ACCUM_ALPHA = { unity: 0.28, light: 0.35, flow: 0.18, fractal: 0.22 };

// Per-mode memory decay rates (replaces MODE_PROJECTIONS.decay)
const MODE_DECAY = { unity: 0.95, light: 0.90, flow: 0.85, fractal: 0.93 };

// Chord connections
const CHORD_PAIRS_BY_MODE = {
    unity: [],
    light: [],
    flow: [],
    fractal: [],
};
let CHORD_PAIRS = [];
const CHORD_THRESHOLD_BY_MODE = {
    unity:   0.22,  // dense web — reads as all-over tiling
    light:   0.15,  // medium — orbital rings connected
    flow:    0.10,  // sparse — only immediate neighbors
    fractal: 0.20,  // medium-dense — nested connectivity
};

// ============================================================
//  SYMMETRY TRIGONOMETRIC LOOKUP TABLES
//  Pre-calculated sine and cosine step tables for symmetries 4 to 13.
// ============================================================

const SYM_COS = {};
const SYM_SIN = {};
const SYM_HALF_COS = {};
const SYM_HALF_SIN = {};

function initSymmetryTables() {
    for (let S = 4; S <= 13; S++) {
        const step = (Math.PI * 2) / S;
        const cosTable = new Float32Array(S + 1);
        const sinTable = new Float32Array(S + 1);
        for (let k = 0; k <= S; k++) {
            cosTable[k] = Math.cos(k * step);
            sinTable[k] = Math.sin(k * step);
        }
        SYM_COS[S] = cosTable;
        SYM_SIN[S] = sinTable;
        
        SYM_HALF_COS[S] = Math.cos(Math.PI / S);
        SYM_HALF_SIN[S] = Math.sin(Math.PI / S);
    }
}
initSymmetryTables();

// ============================================================
//  THE CANONICAL FIELD (F)
//  This is the ONLY source of angle, curvature, hue, and amplitude.
//  No wave terms or signatures may change.
//  Maintains exact Math.sin/Math.cos precision to prevent pixel jitter.
// ============================================================

const fOut = { angle: 0, curvature: 0, huePhase: 0, amplitude: 0 };

function sampleField(nx, ny, time) {
    const r     = Math.sqrt(nx * nx + ny * ny);
    const theta = Math.atan2(ny, nx);
    const w1    = Math.sin(r * 4.0 - time * 0.40);
    const w2    = Math.cos(theta * 3.0 + time * 0.24);
    const w3    = Math.sin(r * 2.2 + theta * 2.0 - time * 0.31);
    
    fOut.angle     = theta + Math.PI * 0.5 + w1 * w2 * 0.6 + w3 * 0.2;
    fOut.curvature = w1 * 0.5 + 0.5;
    fOut.huePhase  = 45 + 175 * (0.5 - 0.5 * Math.cos(time * 0.033 + r * 0.4));
    fOut.amplitude = 0.5 + 0.25 * w1 + 0.25 * w2;
    return fOut;
}

function F(nx, ny, t) {
    return sampleField(nx, ny, t);
}

// ============================================================
//  ZERO-ALLOCATION PALETTE AND COLOR FUNCTIONS
//  Replaces hsla string interpolation loops with a pre-stringified static cache.
// ============================================================

const colorScratch = { r: 0, g: 0, b: 0 };
const colorCache = {};

function samplePaletteColor(huePhaseNorm, amplitude, out) {
    const p = (huePhaseNorm % 1.0 + 1.0) % 1.0;
    const t = p * 4;
    const idx1 = Math.floor(t) % 4;
    const idx2 = (idx1 + 1) % 4;
    const fract = t - Math.floor(t);

    const c1 = PALETTE[idx1];
    const c2 = PALETTE[idx2];

    let h1 = c1.h;
    let h2 = c2.h;
    let diff = h2 - h1;
    if (diff > 180) h2 -= 360;
    else if (diff < -180) h2 += 360;

    const h = ((h1 + (h2 - h1) * fract) % 360 + 360) % 360;
    const s = (c1.s + (c2.s - c1.s) * fract) + (amplitude - 0.5) * 16;
    const l = (c1.l + (c2.l - c1.l) * fract) + (amplitude - 0.5) * 16;

    const s_frac = Math.min(100, Math.max(0, s)) / 100;
    const l_frac = Math.min(100, Math.max(0, l)) / 100;
    const k = n => (n + h / 30) % 12;
    const a = s_frac * Math.min(l_frac, 1 - l_frac);
    const f = n => l_frac - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));

    out.r = Math.min(255, Math.max(0, f(0) * 255)) | 0;
    out.g = Math.min(255, Math.max(0, f(8) * 255)) | 0;
    out.b = Math.min(255, Math.max(0, f(4) * 255)) | 0;
}

function updateCenterColorRgb(time) {
    const cf = F(0, 0, time);
    const norm = (cf.huePhase - 45) / 175;
    samplePaletteColor(norm, cf.amplitude, colorScratch);
    rR = colorScratch.r;
    rG = colorScratch.g;
    rB = colorScratch.b;
}

function getCachedRgba(huePhase, alpha, amplitude) {
    const norm = Math.min(1.0, Math.max(0.0, (huePhase - 45) / 175));
    const hIdx = (norm * 63) | 0;         // 6 bits (0-63)
    const aIdx = Math.min(31, Math.max(0, (amplitude * 31) | 0));    // 5 bits (0-31)
    const alIdx = Math.min(63, Math.max(0, (alpha * 63) | 0));       // 6 bits (0-63)
    
    // Completely isolated bit slots preventing key corruption
    const key = (hIdx << 11) | (aIdx << 6) | alIdx;
    let col = colorCache[key];
    if (col === undefined) {
        samplePaletteColor(norm, amplitude, colorScratch);
        col = colorCache[key] = `rgba(${colorScratch.r},${colorScratch.g},${colorScratch.b},${alpha.toFixed(2)})`;
    }
    return col;
}

function fieldColor(huePhase, alpha, amplitude = 0.75) {
    return getCachedRgba(huePhase, alpha, amplitude);
}

function getPaletteColor(norm, amplitude, alpha) {
    const huePhase = norm * 175 + 45;
    return getCachedRgba(huePhase, alpha, amplitude);
}

function smoothstep(edge0, edge1, x) {
    const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
}

// ============================================================
//  DECAY FIELD
// ============================================================

function D(nx, ny) {
    const r = Math.sqrt(nx * nx + ny * ny);
    return 0.97 - 0.09 * smoothstep(0.4, 1.0, r);
}

function precomputeDecayField() {
    if (!dField) return;
    const modeDecay = MODE_DECAY[MODES[mode]];
    for (let y = 0; y < mH; y++) {
        const ny = ((y + 0.5) / mH - 0.5) * 2;
        for (let x = 0; x < mW; x++) {
            const nx = ((x + 0.5) / mW - 0.5) * 2;
            dField[y * mW + x] = D(nx, ny) * (modeDecay / 0.97);
        }
    }
}

// ============================================================
//  MEMORY ACCESS AND STAMPING
// ============================================================

function resizeBuffers() {
    const scale = 4;
    const newMW = Math.floor((currentW || 400) / scale);
    const newMH = Math.floor((currentH || 800) / scale);
    if (newMW !== mW || newMH !== mH) {
        mW = newMW;
        mH = newMH;
        M = new Float32Array(mW * mH);
        dField = new Float32Array(mW * mH);
        precomputeDecayField();
    }
}

function sampleBilinearM(nx, ny) {
    if (!M) return 0;
    const clampedNx = Math.min(1.0, Math.max(-1.0, nx));
    const clampedNy = Math.min(1.0, Math.max(-1.0, ny));
    const nx01 = clampedNx * 0.5 + 0.5;
    const ny01 = clampedNy * 0.5 + 0.5;
    
    const x_M = nx01 * (mW - 1);
    const y_M = ny01 * (mH - 1);
    
    const x0 = Math.min(mW - 1, Math.max(0, Math.floor(x_M)));
    const x1 = Math.min(mW - 1, x0 + 1);
    const y0 = Math.min(mH - 1, Math.max(0, Math.floor(y_M)));
    const y1 = Math.min(mH - 1, y0 + 1);
    
    const tx = x_M - x0;
    const ty = y_M - y0;
    
    const val00 = M[y0 * mW + x0];
    const val10 = M[y0 * mW + x1];
    const val01 = M[y1 * mW + x0];
    const val11 = M[y1 * mW + x1];
    
    return (1 - ty) * ((1 - tx) * val00 + tx * val10) +
           ty * ((1 - tx) * val01 + tx * val11);
}

function stampM(nx, ny, amount, amplitude) {
    if (!M) return;
    const nx01 = nx * 0.5 + 0.5;
    const ny01 = ny * 0.5 + 0.5;
    if (nx01 >= 0 && nx01 < 1 && ny01 >= 0 && ny01 < 1) {
        const x = Math.min(mW - 1, Math.max(0, Math.floor(nx01 * mW)));
        const y = Math.min(mH - 1, Math.max(0, Math.floor(ny01 * mH)));
        const idx = y * mW + x;
        M[idx] = Math.min(1.0, M[idx] + amount * amplitude);
    }
}

// ============================================================
//  ENTITY INITIALIZATION & SPATIAL HASH CHORD BUILDING
//  Linear-time chord generation precalculated for all modes.
// ============================================================

function buildChordPairsForThreshold(threshold) {
    const pairs = [];
    const threshSq = threshold * threshold;
    
    const minVal = -1.1;
    const maxVal = 1.1;
    const range = maxVal - minVal;
    const cellSize = threshold;
    const cols = Math.ceil(range / cellSize);
    const rows = cols;
    const totalCells = cols * rows;
    
    const grid = Array.from({ length: totalCells }, () => []);
    for (let i = 0; i < N; i++) {
        const idx = i * STRIDE;
        const u = entities[idx + OFF_SEED_U];
        const v = entities[idx + OFF_SEED_V];
        const cx = Math.min(cols - 1, Math.max(0, Math.floor((u - minVal) / cellSize)));
        const cy = Math.min(rows - 1, Math.max(0, Math.floor((v - minVal) / cellSize)));
        grid[cy * cols + cx].push(i);
    }
    
    const neighborOffsets = [
        [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]
    ];
    
    for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
            const cellIdx = cy * cols + cx;
            const bucket = grid[cellIdx];
            if (bucket.length === 0) continue;
            
            for (const offset of neighborOffsets) {
                const nx = cx + offset[0];
                const ny = cy + offset[1];
                if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
                    const targetIdx = ny * cols + nx;
                    const targetBucket = grid[targetIdx];
                    if (targetBucket.length === 0) continue;
                    
                    const isSameCell = (cellIdx === targetIdx);
                    
                    for (let i = 0; i < bucket.length; i++) {
                        const e1 = bucket[i];
                        const idx1 = e1 * STRIDE;
                        const u1 = entities[idx1 + OFF_SEED_U];
                        const v1 = entities[idx1 + OFF_SEED_V];
                        
                        const startJ = isSameCell ? i + 1 : 0;
                        for (let j = startJ; j < targetBucket.length; j++) {
                            const e2 = targetBucket[j];
                            const idx2 = e2 * STRIDE;
                            const u2 = entities[idx2 + OFF_SEED_U];
                            const v2 = entities[idx2 + OFF_SEED_V];
                            const du = u1 - u2;
                            const dv = v1 - v2;
                            if (du * du + dv * dv < threshSq) {
                                pairs.push(e1, e2);
                            }
                        }
                    }
                }
            }
        }
    }
    return pairs;
}

function buildAllChordPairs() {
    for (const mName of MODES) {
        const threshold = CHORD_THRESHOLD_BY_MODE[mName];
        CHORD_PAIRS_BY_MODE[mName] = buildChordPairsForThreshold(threshold);
    }
}

function initEntities() {
    if (entitiesInit) return;
    
    for (let i = 0; i < N; i++) {
        const t = i / N;
        const u = 2 * Math.PI * t;
        const v = 2 * Math.PI * ((i * PHI) % 1);

        const x = Math.cos(u) * Math.cos(v);
        const y = Math.sin(u) * Math.sin(v);

        const idx = i * STRIDE;
        entities[idx + OFF_SEED_U] = x;
        entities[idx + OFF_SEED_V] = y;
        entities[idx + OFF_FLOW_U] = x;
        entities[idx + OFF_FLOW_V] = y;
        entities[idx + OFF_X] = 0;
        entities[idx + OFF_Y] = 0;
        entities[idx + OFF_TX] = 0;
        entities[idx + OFF_TY] = 0;
        entities[idx + OFF_ALPHA] = 0;
        entities[idx + OFF_ROT] = 0;
        entities[idx + OFF_LEN] = 12;
        entities[idx + OFF_KAP] = 0;
        entities[idx + OFF_SYM] = 1.0;
        entities[idx + OFF_LW] = 1;
        entities[idx + OFF_HUE] = 0;
        entities[idx + OFF_AMP] = 0.5;

        // Polar coordinates precomputation
        eSeedR[i] = Math.sqrt(x * x + y * y);
        eSeedTheta[i] = Math.atan2(y, x);
    }
    
    buildAllChordPairs();
    
    entitiesInit = true;
    firstFrame = true;
    CHORD_PAIRS = CHORD_PAIRS_BY_MODE[MODES[mode]];
}

// ============================================================
//  PROJECTION FUNCTIONS
//  Stateless projection formulas using precomputed seeds.
// ============================================================

const entityProj = { x: 0, y: 0, rot: 0, len: 0, kap: 0, alpha: 0, lw: 1, sym: 1 };

function projectUnityTarget(i, f, m, time, cx, cy) {
    const tileSize = 60;
    const idx = i * STRIDE;
    const tx = (entities[idx + OFF_SEED_U] * 0.5 + 0.5) * currentW;
    const ty = (entities[idx + OFF_SEED_V] * 0.5 + 0.5) * currentH;
    entityProj.x   = Math.round(tx / tileSize) * tileSize;
    entityProj.y   = Math.round(ty / tileSize) * tileSize;
    entityProj.rot = f.curvature * Math.PI * 0.6 + f.angle * 0.12;
    entityProj.len = 26 + m * 10;
    entityProj.kap = (f.curvature - 0.5) * 0.3;
    entityProj.sym = 8;
    entityProj.alpha = 0.52 * Math.max(0.35, f.amplitude) * (0.4 + 0.6 * m);
    entityProj.lw  = 1.0 + m * 1.5;
}

function projectLight(i, f, m, time, cx, cy) {
    const r = eSeedR[i];
    const theta = eSeedTheta[i];
    const maxR  = Math.max(currentW, currentH) * 0.95;

    // 1. Interleaved Tri-Grid Architecture (12-Fold Geometry)
    const gridId = i % 3; 
    const sectors = 12;
    const sectorAngle = (Math.PI * 2) / sectors;
    const gridOffset = gridId * (sectorAngle / 3.0);
    const sectorIdx = Math.round((theta - gridOffset) / sectorAngle);
    const baseAxis = sectorIdx * sectorAngle + gridOffset;

    // 2. Hyperbolic Radial Warp (Creates the Piercing Epicenter)
    // Compresses space so that entities cluster tightly around the core singularity
    const hyperbolicR = r / (1.0 + (1.0 - r) * 2.0); 
    const depthScale = r * 0.2 + hyperbolicR * 0.8;

    // 3. Phase-Shifted Shockwave Dilation
    // Forces the breathing effect to propagate radially OUTWARD from the center lightsource
    const radialPhase = time * 0.5 - depthScale * Math.PI * 2.0;
    const waveBreathing = 0.90 + Math.sin(radialPhase) * 0.10 * f.amplitude;

    // 4. Alternating Ray Proportions
    const isEven = (sectorIdx + gridId) % 2 === 0;
    const starExtrusion = isEven ? 1.12 : 0.88;
    const totalRadius = maxR * 0.45 * depthScale * starExtrusion * waveBreathing;

    // 5. Volumetric Coordinate Assignment
    entityProj.x   = cx + Math.cos(baseAxis) * totalRadius;
    entityProj.y   = cy + Math.sin(baseAxis) * totalRadius;

    // 6. Tangential Crystalline Interlacing
    const contactAngle = Math.PI * 0.25; 
    const dynamicTwist = Math.cos(f.angle * 2.0 + depthScale * Math.PI) * 0.12 * f.curvature;
    entityProj.rot = baseAxis + (isEven ? contactAngle : -contactAngle) + dynamicTwist;

    // 7. Inverse-Square Scale Dilation (The Lightsource Illusion Engine)
    // As entities approach the core (depthScale -> 0), their physical length explodes.
    // This fills the empty center with a dense, blinding core of overlapping geometric flares.
    const inverseSquareScale = 1.0 / (depthScale * depthScale * 8.0 + 0.15);
    entityProj.len = (8 + m * 20 + inverseSquareScale * 25) * (1.2 - depthScale * 0.5); 

    // 8. Calligraphic Curvature Control
    entityProj.kap = depthScale < 0.3 ? 0.0 : (f.curvature - 0.5) * 0.18 * smoothstep(0.3, 1.0, depthScale);
    entityProj.sym = 12;

    // 9. Luminous Radiance Pipeline (Adhering strictly to F)
    // Sample a global central field intensity to modulate the micro-shimmer
    const centerField = F(0, 0, time);
    const coreGlow = 1.0 - depthScale; // Core intensities fade exponentially toward perimeter
    
    // Combine macro field amplitude with the inverse radial depth to calculate raw opacity
    const finalAlpha = (f.amplitude * 0.4) * (0.3 + 0.7 * m) + (coreGlow * coreGlow * 0.55 * centerField.amplitude);
    entityProj.alpha = Math.min(1.0, Math.max(0.12, finalAlpha));

    // Foreground straps grow fine and detailed; core light bursts deepen in density
    entityProj.lw  = 0.5 + (m * 2.0) + (coreGlow * 3.5);
}

function projectFlow(i, f, m, time, cx, cy) {
    const idx = i * STRIDE;
    entityProj.x   = (entities[idx + OFF_FLOW_U] * 0.5 + 0.5) * currentW;
    entityProj.y   = (entities[idx + OFF_FLOW_V] * 0.5 + 0.5) * currentH;
    entityProj.rot = f.angle;
    entityProj.len = 80 + f.amplitude * 40;
    entityProj.kap = (f.curvature - 0.5) * 3.5;
    entityProj.sym = 6;
    entityProj.alpha = 0.28 * (0.5 + 0.5 * m);
    entityProj.lw  = 0.5 + m * 3.0;
}

function projectFractal(i, f, m, time, cx, cy) {
    const r = eSeedR[i];
    const theta = eSeedTheta[i];
    const depth = Math.min(3, Math.floor(r * 3));
    const maxR  = Math.max(currentW, currentH) * 0.85;
    const baseSize = maxR * 0.42 * gBreath;
    entityProj.x   = cx + Math.cos(theta + f.angle * 0.1) * r * baseSize * 1.8;
    entityProj.y   = cy + Math.sin(theta + f.angle * 0.1) * r * baseSize * 1.8;
    entityProj.rot = (f.angle + f.curvature * 3) * 0.1;
    entityProj.len = baseSize * 0.22 * Math.pow(0.60, depth);
    entityProj.kap = (f.curvature - 0.5) * 0.6;
    entityProj.sym = 6;
    entityProj.alpha = 0.52 * Math.max(0.06, 0.52 - depth * 0.17);
    entityProj.lw  = Math.max(0.5, 1.4 - depth * 0.35);
}

// Index 0 = unity, 1 = light, 2 = flow, 3 = fractal
const PROJECTORS = [projectUnityTarget, projectLight, projectFlow, projectFractal];

// ============================================================
//  EFFECT EXPORT AND CONTROL
// ============================================================

export const effect = {
    id: 'geometry',
    name: 'Geometry',
    run: runGeometry,
    stop: stopGeometry,
    onResize: (w, h) => {
        currentW = w; currentH = h;
        resizeBuffers();
        resetAccumBuffer();
        vignetteGradient = null;
    },
    controls: [{
        type: 'button',
        id: 'geometry-mode-switch',
        label: getModeLabel(mode),
        onClick: () => cycleMode()
    }],
    marqueeFont: {
        colorFn: (time, i) => {
            const f = sampleField(0, 0, time * 0.016);
            const norm = ((f.huePhase - 45) / 175 + i * 0.02) % 1.0;
            return getPaletteColor(norm, f.amplitude, 1.0);
        },
        shadowColor: 'rgba(255, 215, 0, 0.35)',
        shadowBlur: 14
    }
};

export function cycleMode() {
    prevMode = mode;
    mode = (mode + 1) % MODES.length;
    transition = 0.0;

    CHORD_PAIRS = CHORD_PAIRS_BY_MODE[MODES[mode]];

    if (MODES[mode] === 'flow') {
        for (let i = 0; i < N; i++) {
            const idx = i * STRIDE;
            entities[idx + OFF_FLOW_U] = entities[idx + OFF_SEED_U];
            entities[idx + OFF_FLOW_V] = entities[idx + OFF_SEED_V];
        }
    }
    
    if (MODES[mode] === 'fractal' && M) {
        M.fill(0);
    }

    localStorage.setItem('ankifx_geometry_mode', mode);
    if (effect.controls?.[0]) {
        effect.controls[0].label = getModeLabel(mode);
        if (typeof AnkiFX !== 'undefined' && AnkiFX.renderEffectControls) {
            AnkiFX.renderEffectControls(effect);
        }
    }
    precomputeDecayField();
}

function getModeLabel(m) {
    switch (MODES[m]) {
        case 'unity':   return '👁️ UNITY MODE';
        case 'light':   return '✨ LIGHT MODE';
        case 'flow':    return '🌊 FLOW MODE';
        case 'fractal': return '❄️ FRACTAL MOSAIC';
        default:        return '👁️ MODE';
    }
}

// ============================================================
//  ACCUMULATION BUFFER
// ============================================================

function resetAccumBuffer() {
    if (!accumCanvas) {
        accumCanvas = document.createElement('canvas');
        accumCtx    = accumCanvas.getContext('2d');
    }
    accumW = Math.max(1, Math.floor((currentW || 400) / 2));
    accumH = Math.max(1, Math.floor((currentH || 800) / 2));
    accumCanvas.width  = accumW;
    accumCanvas.height = accumH;
    accumCtx.clearRect(0, 0, accumW, accumH);
    accumImgData = accumCtx.createImageData(accumW, accumH);
}

function updateAccumCanvas(time) {
    if (!accumImgData || !M) return;
    const data = new Uint32Array(accumImgData.data.buffer);
    
    updateCenterColorRgb(time);

    const isUnity = MODES[mode] === 'unity';

    if (isUnity) {
        for (let y = 0; y < mH; y++) {
            const rowM = y * mW;
            const rowAccum0 = (y * 2) * accumW;
            const rowAccum1 = (y * 2 + 1) * accumW;
            
            for (let x = 0; x < mW; x++) {
                const val = M[rowM + x];
                const destIdx0 = rowAccum0 + x * 2;
                const destIdx1 = rowAccum1 + x * 2;

                if (val < 0.005) {
                    data[destIdx0] = 0;
                    data[destIdx0 + 1] = 0;
                    data[destIdx1] = 0;
                    data[destIdx1 + 1] = 0;
                    continue;
                }

                let r = rR, g = rG, b = rB;
                if (val > 0.3) {
                    const t = (val - 0.3) * 2.0;
                    const clampedT = Math.min(1.0, Math.max(0.0, t * t * (3.0 - 2.0 * t)));
                    r = (rR + (GOLD_R - rR) * clampedT) | 0;
                    g = (rG + (GOLD_G - rG) * clampedT) | 0;
                    b = (rB + (GOLD_B - rB) * clampedT) | 0;
                }
                const a = (val * 255) | 0;
                const pixel = (a << 24) | (b << 16) | (g << 8) | r;
                
                data[destIdx0] = pixel;
                data[destIdx0 + 1] = pixel;
                data[destIdx1] = pixel;
                data[destIdx1 + 1] = pixel;
            }
        }
    } else {
        for (let y = 0; y < mH; y++) {
            const rowM = y * mW;
            const rowAccum0 = (y * 2) * accumW;
            const rowAccum1 = (y * 2 + 1) * accumW;
            
            for (let x = 0; x < mW; x++) {
                const val = M[rowM + x];
                const destIdx0 = rowAccum0 + x * 2;
                const destIdx1 = rowAccum1 + x * 2;

                if (val < 0.005) {
                    data[destIdx0] = 0;
                    data[destIdx0 + 1] = 0;
                    data[destIdx1] = 0;
                    data[destIdx1 + 1] = 0;
                    continue;
                }

                const a = (val * 255) | 0;
                const pixel = (a << 24) | (rB << 16) | (rG << 8) | rR;
                
                data[destIdx0] = pixel;
                data[destIdx0 + 1] = pixel;
                data[destIdx1] = pixel;
                data[destIdx1 + 1] = pixel;
            }
        }
    }
    accumCtx.putImageData(accumImgData, 0, 0);
}

// ============================================================
//  CORE GLOW
// ============================================================

function renderCoreGlow(ctx, cx, cy, cf) {
    const r = (18 + 8 * cf.amplitude) * gBreath;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.0);
    g.addColorStop(0,   fieldColor(cf.huePhase, 0.08 * cf.amplitude, cf.amplitude));
    g.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 2.0, 0, Math.PI * 2);
    ctx.fill();
}

// ============================================================
//  UNIFIED PRIMITIVE DRAWING
//  Uses fast trigonometric addition. Zero-trig inner loops.
// ============================================================

function _appendArcToPathFast(ctx, x, y, perpAngle, cosA, sinA, curvature, length) {
    if (Math.abs(curvature) < 0.001) {
        const dx = cosA * length * 0.5;
        const dy = sinA * length * 0.5;
        ctx.moveTo(x - dx, y - dy);
        ctx.lineTo(x + dx, y + dy);
    } else {
        const radius = 1.0 / Math.abs(curvature);
        const halfAngle = Math.min(Math.PI * 0.85, (length / radius) * 0.5);
        const sign = curvature > 0 ? 1 : -1;
        
        const perpCos = sign === 1 ? -sinA : sinA;
        const perpSin = sign === 1 ? cosA : -cosA;
        
        const cx_arc = x + perpCos * radius;
        const cy_arc = y + perpSin * radius;
        
        const startAngle = perpAngle + Math.PI - halfAngle * sign;
        const endAngle   = perpAngle + Math.PI + halfAngle * sign;
        
        ctx.arc(cx_arc, cy_arc, radius, startAngle, endAngle, curvature < 0);
    }
}

function drawEntityFigure(ctx, x, y, angle, curvature, length, width, color, symmetry, symFrac, hue, alpha, amp) {
    ctx.strokeStyle = color;
    const sym = Math.max(1, symmetry);
    
    const cosTable = SYM_COS[sym];
    const sinTable = SYM_SIN[sym];

    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const sign = curvature > 0 ? 1 : -1;
    const step = (Math.PI * 2) / sym;

    // 1. Primary Outer Figure — Single batched path
    ctx.lineWidth = width;
    ctx.beginPath();
    
    let perpAngle = angle + sign * Math.PI * 0.5;
    
    for (let k = 0; k < sym; k++) {
        const cosK = cosA * cosTable[k] - sinA * sinTable[k];
        const sinK = sinA * cosTable[k] + cosA * sinTable[k];
        _appendArcToPathFast(ctx, x, y, perpAngle, cosK, sinK, curvature, length);
        perpAngle += step;
    }
    ctx.stroke();

    // 2. Secondary Inner Concentric Figure — Single batched path
    const innerLength = length * 0.45;
    const innerWidth = width * 0.4;
    ctx.lineWidth = innerWidth;
    ctx.beginPath();
    
    const innerAngle = angle + Math.PI / sym;
    const cosInner = Math.cos(innerAngle);
    const sinInner = Math.sin(innerAngle);
    let perpAngleInner = innerAngle + sign * Math.PI * 0.5;
    
    for (let k = 0; k < sym; k++) {
        const cosK = cosInner * cosTable[k] - sinInner * sinTable[k];
        const sinK = sinInner * cosTable[k] + cosInner * sinTable[k]; // Fixed algebraic identity layout
        _appendArcToPathFast(ctx, x, y, perpAngleInner, cosK, sinK, curvature, innerLength);
        perpAngleInner += step;
    }
    ctx.stroke();

    // 3. Fractional Arm — fades in/out continuously during symmetry transitions
    if (symFrac > 0.01) {
        const fracStep = (Math.PI * 2) / (sym + symFrac);
        const a = angle + sym * fracStep;
        
        const nextCosTable = SYM_COS[sym + 1];
        const nextSinTable = SYM_SIN[sym + 1];
        
        // Linearly interpolate vector components of fractional arm
        const cosOffset = 1.0 + (nextCosTable[sym] - 1.0) * symFrac;
        const sinOffset = 0.0 + (nextSinTable[sym] - 0.0) * symFrac;
        const cosK = cosA * cosOffset - sinA * sinOffset;
        const sinK = sinA * cosOffset + cosA * sinOffset;
        
        const perpAngleFrac = a + sign * Math.PI * 0.5;

        ctx.lineWidth = width;
        ctx.strokeStyle = getCachedRgba(hue, alpha * symFrac, amp);
        ctx.beginPath();
        _appendArcToPathFast(ctx, x, y, perpAngleFrac, cosK, sinK, curvature, length);
        ctx.stroke();

        // Fractional inner arm
        const aInner = a + Math.PI / (sym + symFrac);
        const cosOffsetInner = SYM_HALF_COS[sym] + (SYM_HALF_COS[sym + 1] - SYM_HALF_COS[sym]) * symFrac;
        const sinOffsetInner = SYM_HALF_SIN[sym] + (-SYM_HALF_SIN[sym + 1] - SYM_HALF_SIN[sym]) * symFrac;
        const cosKInner = cosA * cosOffsetInner - sinA * sinOffsetInner;
        const sinKInner = sinA * cosOffsetInner + cosA * sinOffsetInner;
        
        const perpAngleInnerFrac = aInner + sign * Math.PI * 0.5;

        ctx.lineWidth = innerWidth;
        ctx.strokeStyle = getCachedRgba(hue, alpha * symFrac * 0.4, amp);
        ctx.beginPath();
        _appendArcToPathFast(ctx, x, y, perpAngleInnerFrac, cosKInner, sinKInner, curvature, innerLength);
        ctx.stroke();
    }
}

// ============================================================
//  ENTITY UPDATE — single loop, single field eval per entity
// ============================================================

function updateEntities(time, cx, cy) {
    const projectCurrent = PROJECTORS[mode];
    const projectPrev = PROJECTORS[prevMode];
    const ts = transitionSmooth;

    const isFlowMode = (mode === 2);
    const flowActive = (mode === 2) || (transition < 1.0 && prevMode === 2);

    for (let i = 0; i < N; i++) {
        const idx = i * STRIDE;
        const sampleU = isFlowMode ? entities[idx + OFF_FLOW_U] : entities[idx + OFF_SEED_U];
        const sampleV = isFlowMode ? entities[idx + OFF_FLOW_V] : entities[idx + OFF_SEED_V];

        // Single field evaluation per entity
        const f = F(sampleU, sampleV, time);
        const m = sampleBilinearM(sampleU, sampleV);

        // Flow integration
        if (flowActive) {
            const flowU = entities[idx + OFF_FLOW_U];
            const flowV = entities[idx + OFF_FLOW_V];
            const r = Math.sqrt(flowU * flowU + flowV * flowV);
            const theta = Math.atan2(flowV, flowU);
            const spiralBias = 0.28 * smoothstep(0.05, 0.25, r);
            const spiralAngle = theta + (PHI / Math.max(0.15, r)) * spiralBias;
            const spd = 0.0012 + f.amplitude * 0.0018;
            entities[idx + OFF_FLOW_U] += (Math.cos(f.angle) * (1 - spiralBias) + Math.cos(spiralAngle) * spiralBias) * spd;
            entities[idx + OFF_FLOW_V] += (Math.sin(f.angle) * (1 - spiralBias) + Math.sin(spiralAngle) * spiralBias) * spd;
            
            // Boundary wrap
            if (Math.abs(entities[idx + OFF_FLOW_U]) > 1.1 || Math.abs(entities[idx + OFF_FLOW_V]) > 1.1) {
                const rRand = Math.sqrt(Math.random()) * 1.0;
                const aRand = Math.random() * Math.PI * 2;
                entities[idx + OFF_FLOW_U] = Math.cos(aRand) * rRand;
                entities[idx + OFF_FLOW_V] = Math.sin(aRand) * rRand;
            }
        }

        // Store field values for rendering
        entities[idx + OFF_HUE] = f.huePhase;
        entities[idx + OFF_AMP] = f.amplitude;

        // Compute current mode projection
        projectCurrent(i, f, m, time, cx, cy);
        const curX = entityProj.x, curY = entityProj.y;
        const curRot = entityProj.rot, curLen = entityProj.len;
        const curKap = entityProj.kap, curSym = entityProj.sym;
        const curAlpha = entityProj.alpha, curLW = entityProj.lw;

        if (transition < 1.0) {
            projectPrev(i, f, m, time, cx, cy);
            const prevX   = entityProj.x,   prevY   = entityProj.y;
            const prevRot = entityProj.rot,  prevLen = entityProj.len;
            const prevKap = entityProj.kap,  prevAlpha = entityProj.alpha;
            const prevLW  = entityProj.lw,   prevSym = entityProj.sym;

            // Shortest-path angle interpolation
            let diffRot = curRot - prevRot;
            diffRot = Math.atan2(Math.sin(diffRot), Math.cos(diffRot));

            entities[idx + OFF_TX]     = prevX     + (curX     - prevX)     * ts;
            entities[idx + OFF_TY]     = prevY     + (curY     - prevY)     * ts;
            entities[idx + OFF_ROT]    = prevRot   + diffRot                * ts;
            entities[idx + OFF_LEN]    = prevLen   + (curLen   - prevLen)   * ts;
            entities[idx + OFF_KAP]    = prevKap   + (curKap   - prevKap)   * ts;
            entities[idx + OFF_ALPHA]  = prevAlpha + (curAlpha - prevAlpha) * ts;
            entities[idx + OFF_LW]     = prevLW    + (curLW    - prevLW)    * ts;
            entities[idx + OFF_SYM]    = prevSym   + (curSym   - prevSym)   * ts;
        } else {
            entities[idx + OFF_TX] = curX;
            entities[idx + OFF_TY] = curY;
            entities[idx + OFF_ROT] = curRot;
            entities[idx + OFF_LEN] = curLen;
            entities[idx + OFF_KAP] = curKap;
            entities[idx + OFF_ALPHA] = curAlpha;
            entities[idx + OFF_LW] = curLW;
            entities[idx + OFF_SYM] = curSym;
        }

        // Spring follow-through
        if (firstFrame) {
            entities[idx + OFF_X] = entities[idx + OFF_TX];
            entities[idx + OFF_Y] = entities[idx + OFF_TY];
        } else {
            entities[idx + OFF_X] += (entities[idx + OFF_TX] - entities[idx + OFF_X]) * 0.08;
            entities[idx + OFF_Y] += (entities[idx + OFF_TY] - entities[idx + OFF_Y]) * 0.08;
        }

        // Stamp entity into memory field
        const eX_val = entities[idx + OFF_X];
        const eY_val = entities[idx + OFF_Y];
        const stampNx = currentW > 0 ? (eX_val / currentW - 0.5) * 2 : 0;
        const stampNy = currentH > 0 ? (eY_val / currentH - 0.5) * 2 : 0;
        stampM(stampNx, stampNy, 0.004, f.amplitude);

        if (flowActive) {
            stampM(-stampNx, stampNy, 0.002, f.amplitude);
        }
    }

    firstFrame = false;
}

// ============================================================
//  ENTITY DRAW — dual-pass rendering
// ============================================================

function drawChordFigure(ctx, time) {
    const cf = F(0, 0, time);
    const baseAlpha = 0.06 + 0.04 * cf.amplitude;
    
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    for (let p = 0; p < CHORD_PAIRS.length; p += 2) {
        const i = CHORD_PAIRS[p];
        const j = CHORD_PAIRS[p + 1];
        if (entities[i * STRIDE + OFF_ALPHA] < 0.005 || entities[j * STRIDE + OFF_ALPHA] < 0.005) continue;
        ctx.moveTo(entities[i * STRIDE + OFF_X], entities[i * STRIDE + OFF_Y]);
        ctx.lineTo(entities[j * STRIDE + OFF_X], entities[j * STRIDE + OFF_Y]);
    }
    ctx.strokeStyle = getCachedRgba(cf.huePhase, baseAlpha, cf.amplitude);
    ctx.stroke();
    
    // Second pass: circles and squares at entity positions
    for (let i = 0; i < N; i++) {
        const idx = i * STRIDE;
        const x = entities[idx + OFF_X];
        const y = entities[idx + OFF_Y];
        const nx = currentW > 0 ? (x / currentW - 0.5) * 2 : 0;
        const ny = currentH > 0 ? (y / currentH - 0.5) * 2 : 0;
        const m = sampleBilinearM(nx, ny);
        if (m < 0.3) continue;
        
        const len = entities[idx + OFF_LEN];
        const r = len * 0.3 * m;
        const alpha = (m - 0.3) / 0.7 * 0.25;
        const hue = entities[idx + OFF_HUE];
        const amp = entities[idx + OFF_AMP];
        
        ctx.strokeStyle = getCachedRgba(hue, alpha, amp);
        ctx.lineWidth = 0.4;
        
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(entities[idx + OFF_ROT]);
        ctx.beginPath();
        ctx.rect(-r, -r, r * 2, r * 2);
        ctx.stroke();
        ctx.restore();
    }
}

function drawMemoryLayer(ctx, time) {
    const density = Math.min(1, gBreath);
    const gridStep = 30;
    const cols = Math.floor(currentW / gridStep);
    const rows = Math.floor(currentH / gridStep);
    const totalCells = cols * rows;

    for (let idx = 0; idx < totalCells; idx++) {
        if (Math.random() > density) continue;
        
        const col = idx % cols;
        const row = (idx / cols) | 0;
        const gx = (col + 0.5) * gridStep;
        const gy = (row + 0.5) * gridStep;
        
        const nx = (gx / currentW - 0.5) * 2;
        const ny = (gy / currentH - 0.5) * 2;
        const m = sampleBilinearM(nx, ny);
        if (m < 0.25) continue;
        
        const f = F(nx, ny, time);
        const sym = Math.round(4 + m * 8);
        const len = gridStep * 0.35 * m;
        const alpha = (m - 0.25) / 0.75 * 0.35;
        
        ctx.strokeStyle = getCachedRgba(f.huePhase, alpha, f.amplitude);
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        
        const cosTable = SYM_COS[sym];
        const sinTable = SYM_SIN[sym];
        
        const cosA = Math.cos(f.angle);
        const sinA = Math.sin(f.angle);
        const curvature = f.curvature * 0.4;
        const sign = curvature > 0 ? 1 : -1;
        const step = (Math.PI * 2) / sym;
        
        let perpAngle = f.angle + sign * Math.PI * 0.5;
        
        for (let k = 0; k < sym; k++) {
            const cosK = cosA * cosTable[k] - sinA * sinTable[k];
            const sinK = sinA * cosTable[k] + cosA * sinTable[k];
            _appendArcToPathFast(ctx, gx, gy, perpAngle, cosK, sinK, curvature, len);
            perpAngle += step;
        }
        ctx.stroke();
    }
}

function drawEntities(time, ctx, cx, cy, maxR) {
    const isFlow = MODES[mode] === 'flow';
    for (let pass = 0; pass < (isFlow ? 2 : 1); pass++) {
        if (pass === 1) {
            ctx.save();
            ctx.translate(currentW, 0);
            ctx.scale(-1, 1);
        }

        for (let i = 0; i < N; i++) {
            const idx = i * STRIDE;
            const alpha = entities[idx + OFF_ALPHA];
            if (alpha < 0.005) continue;
            
            const symF = entities[idx + OFF_SYM];
            const symFloor = Math.max(1, Math.floor(symF));
            const symFrac = symF - symFloor;

            const hue = entities[idx + OFF_HUE];
            const amp = entities[idx + OFF_AMP];
            const x = entities[idx + OFF_X];
            const y = entities[idx + OFF_Y];
            const rot = entities[idx + OFF_ROT];
            const kap = entities[idx + OFF_KAP];
            const len = entities[idx + OFF_LEN];
            const lw = entities[idx + OFF_LW];

            drawEntityFigure(
                ctx,
                x, y,
                rot,
                kap,
                len,
                lw,
                getCachedRgba(hue, alpha, amp),
                symFloor,
                symFrac,
                hue,
                alpha,
                amp
            );
        }

        if (pass === 1) {
            ctx.restore();
        }
    }
}

// ============================================================
//  MAIN RENDER LOOP
// ============================================================

export function runGeometry(contexts, config) {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;
    firstFrame = true;
    let time = 0;

    if (effect.controls?.[0]) effect.controls[0].label = getModeLabel(mode);
    
    resizeBuffers();
    resetAccumBuffer();
    initEntities();

    function rebuildVignetteGradient() {
        const cx = currentW / 2;
        const cy = currentH / 2;
        const maxR = Math.max(currentW, currentH) * 0.85;
        vignetteGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.9);
        vignetteGradient.addColorStop(0,   'rgba(2,3,12,0.35)');
        vignetteGradient.addColorStop(0.5, 'rgba(0,0,0,0)');
        vignetteGradient.addColorStop(1,   'rgba(2,3,12,0.15)');
    }

    function render() {
        time += 0.012;

        if (transition < 1.0) {
            transition = Math.min(1.0, transition + TRANSITION_RATE);
        }
        transitionSmooth = transition * transition * (3 - 2 * transition);

        if (M && dField) {
            for (let i = 0; i < M.length; i++) {
                M[i] *= dField[i];
            }
        }

        const cf = F(0, 0, time);
        gBreath = 0.97 + cf.amplitude * 0.06;

        const cx = currentW / 2;
        const cy = currentH / 2;
        const maxR = Math.max(currentW, currentH) * 0.85;

        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(2, 2, 8, ${[0.04, 0.05, 0.07, 0.06][mode]})`;
        ctx.fillRect(0, 0, currentW, currentH);

        ctx.globalCompositeOperation = 'lighter';

        renderCoreGlow(ctx, cx, cy, cf);
        updateEntities(time, cx, cy);

        drawChordFigure(ctx, time);
        drawEntities(time, ctx, cx, cy, maxR);
        drawMemoryLayer(ctx, time);

        updateAccumCanvas(time);
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = ACCUM_ALPHA[MODES[mode]];
        ctx.drawImage(accumCanvas, 0, 0, currentW, currentH);
        ctx.globalAlpha = 1.0;

        ctx.globalCompositeOperation = 'source-over';
        if (!vignetteGradient) {
            rebuildVignetteGradient();
        }
        ctx.fillStyle = vignetteGradient;
        ctx.fillRect(0, 0, currentW, currentH);

        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);
}

export function stopGeometry() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    vignetteGradient = null;
    if (M) M.fill(0);
    if (accumCtx) accumCtx.clearRect(0, 0, accumW, accumH);
}