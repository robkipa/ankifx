
let animationId = null;
let currentW, currentH;

export const effect = {
    id: 'ecg',
    name: 'ECG Monitor',
    run: runECG,
    stop: stopECG,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
    },
    marqueeFont: {
        color: '#FF1A1A',
        shadowColor: '#CC0000',
        shadowBlur: 15,
    }
};

export function runECG(contexts, config) {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;

    const rightGroup = document.getElementById('afx-top-group-right');
    let ecgPanel = document.getElementById('afx-ecg-panel');
    if (!ecgPanel && rightGroup) {
        ecgPanel = document.createElement('div');
        ecgPanel.id = 'afx-ecg-panel';
        rightGroup.insertBefore(ecgPanel, rightGroup.firstChild);
    }

    const initialRhythm = localStorage.getItem('ankifx_ecg_rhythm') || 'sinus';
    effect.controls = [
        {
            type: 'button',
            id: 'ecg-trigger',
            label: initialRhythm === 'sinus' ? '⚡ TRIGGER ARRHYTHMIA' : '💚 RESTORE SINUS',
            onClick: () => {
                const current = localStorage.getItem('ankifx_ecg_rhythm') || 'sinus';
                let next;
                if (current === 'sinus') {
                    const rhythms = ['first_degree', 'mobitz_1', 'mobitz_2', 'third_degree', 'st_elevation', 'afib', 'a_flutter', 'torsades'];
                    next = rhythms[Math.floor(Math.random() * rhythms.length)];
                } else {
                    next = 'sinus';
                }
                localStorage.setItem('ankifx_ecg_rhythm', next);
                localStorage.setItem('ankifx_ecg_trigger_time', Date.now());
            }
        }
    ];

    // --- Configuration ---
    const SWEEP_SPEED_PX_PER_S = 200;       // pixels per second sweep speed
    const GAP_WIDTH = 40;                    // dark gap ahead of sweep cursor
    const FADE_LENGTH = 120;                 // phosphor fade trail length in pixels
    const GRID_MAJOR = 25;                   // major gridline spacing
    const GRID_MINOR = 5;                    // minor gridline spacing

    // --- State ---
    const traceBuffer = new Float32Array(4096); // circular Y-value buffer (normalized 0-1)
    let traceLength = 0;                        // how many pixels written so far
    let sweepX = 0;                             // current sweep X position (fractional)
    let time = 0;                               // elapsed time in seconds
    let lastFrameTime = 0;

    // Continuous non-wrapping phase accumulators (eliminates interpolation discontinuities)
    let beatPhase = 0;                          // continuous sinus/1st/Mobitz/STEMI phase
    let atrialPhase = 0;                        // continuous dissociated P-wave phase (3rd degree)
    let ventricularPhase = 0;                   // continuous dissociated QRS-T phase (3rd degree)
    
    // AFib irregular interval generator
    let afibNextBpm = 100;                      // next BPM target in AFib
    let afibNextCycleDuration = 0.6;            // phase-duration for next irregular cycle

    // BPM & UI pulse state
    let bpmDisplay = 72;
    let bpmPulseAlpha = 0;
    let currentRhythm = 'sinus';
    let nextRhythmTime = 25 + Math.random() * 15; // cycle every 25-40 seconds
    let lastTriggerTime = 0;

    // Arrhythmia list for sequential auto-cycling alternating with sinus
    const arrhythmiaList = ['first_degree', 'mobitz_1', 'mobitz_2', 'third_degree', 'st_elevation', 'afib', 'a_flutter', 'torsades'];
    let arrhythmiaIndex = 0;

    // Ensure buffer covers canvas width
    function ensureBuffer() {
        if (traceLength < currentW) {
            traceLength = currentW;
        }
    }

    // --- Piecewise Gaussian Waveform Generator ---
    const gauss = (x, mu, sigma, amp) => amp * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));

    // Normal sinus P wave
    function getPWave(t) {
        return gauss(t, 0.15, 0.03, 0.12);
    }

    // Prolonged PR interval P wave (shifted left)
    function getFirstDegreePWave(t) {
        return gauss(t, 0.03, 0.03, 0.12);
    }

    // Mobitz 1 progressive P waves (gradually shifts earlier relative to QRS at 0.36)
    function getMobitz1PWave(t, beatIndex) {
        const step = beatIndex % 4;
        if (step === 0) return gauss(t, 0.17, 0.03, 0.12); // PR = 0.19 (normal-ish)
        if (step === 1) return gauss(t, 0.10, 0.03, 0.12); // PR = 0.26 (prolonged)
        if (step === 2) return gauss(t, 0.03, 0.03, 0.12); // PR = 0.33 (marked prolongation)
        return gauss(t, 0.15, 0.03, 0.12);                 // dropped beat - draw standard P
    }

    // Mobitz 2 constant prolonged P wave
    function getMobitz2PWave(t) {
        return gauss(t, 0.08, 0.03, 0.12); // PR = 0.28 (constant prolongation)
    }

    // AFib: Chaotic baseline with rapid fibrillatory f-waves (amplitude ~0.05, no actual P wave)
    function getAFibBaseline(t) {
        return 0.035 * Math.sin(t * Math.PI * 40) + 
               0.015 * Math.sin(t * Math.PI * 96) + 
               0.008 * Math.sin(t * Math.PI * 176);
    }

    // Atrial Flutter: Sawtooth baseline F-waves (4 flutter waves per ventricular cycle)
    function getFlutterBaseline(t) {
        const saw = (t * 4) % 1.0;
        return 0.085 * (saw - 0.5); // classic downward-sloping sawtooth shape
    }

    // Torsades de Pointes: broad, polymorphic Ventricular Tachycardia wave
    function getTorsadesWaveform(t, absoluteTime) {
        // Continuous, broad polymorphic QRS complexes (no flat baseline)
        const vTach = Math.sin(t * Math.PI * 2) * 0.58 + 
                      Math.sin(t * Math.PI * 4) * 0.16;

        // Dynamic sinusoidal twisting envelope around the baseline
        const twist = Math.sin(absoluteTime * 1.2);
        return vTach * twist;
    }

    // Normal QRS + T waves
    function getQRSTWave(t, stElevation = false) {
        let y = 0;
        y += gauss(t, 0.33, 0.008, -0.08);  // Q dip
        y += gauss(t, 0.36, 0.012, 1.0);    // R spike
        y += gauss(t, 0.39, 0.008, -0.12);  // S dip

        if (stElevation) {
            y += gauss(t, 0.46, 0.07, 0.38); // elevated ST segment connecting S to T
        }

        y += gauss(t, 0.56, 0.04, 0.22);    // T wave
        return y;
    }

    // Evaluates the full trace amplitude at a specific time/accumulated phase
    function evaluateWaveform(accumPhase, rhythmType, absoluteTime) {
        const t = accumPhase % 1.0;
        const beatIndex = Math.floor(accumPhase);

        if (rhythmType === 'sinus') {
            return getPWave(t) + getQRSTWave(t, false);
        }

        if (rhythmType === 'first_degree') {
            return getFirstDegreePWave(t) + getQRSTWave(t, false);
        }

        if (rhythmType === 'mobitz_1') {
            const step = beatIndex % 4;
            if (step === 3) {
                // Dropped beat: P wave only, no QRS/T
                return getMobitz1PWave(t, beatIndex);
            }
            return getMobitz1PWave(t, beatIndex) + getQRSTWave(t, false);
        }

        if (rhythmType === 'mobitz_2') {
            const step = beatIndex % 3;
            if (step === 2) {
                // Dropped beat: P wave only
                return getMobitz2PWave(t);
            }
            return getMobitz2PWave(t) + getQRSTWave(t, false);
        }

        if (rhythmType === 'st_elevation') {
            return getPWave(t) + getQRSTWave(t, true);
        }

        if (rhythmType === 'afib') {
            // Chaotic f-wave baseline + standard QRS
            return getAFibBaseline(t) + getQRSTWave(t, false);
        }

        if (rhythmType === 'a_flutter') {
            // Sawtooth flutter baseline + standard QRS (regular 4:1 conduction)
            return getFlutterBaseline(t) + getQRSTWave(t, false);
        }

        if (rhythmType === 'torsades') {
            return getTorsadesWaveform(t, absoluteTime);
        }

        return 0;
    }

    // Evaluates 3rd degree Complete AV Block (dissociated P and QRS-T at separate pacing rates)
    function evaluateDissociated(aPhase, vPhase) {
        const ap = aPhase % 1.0;
        const vp = vPhase % 1.0;

        // P waves pace regularly at atrial rate
        const p = gauss(ap, 0.15, 0.03, 0.12);

        // Ventricular QRS + T waves pace regularly at slower escape rate (escape complexes have normal shapes)
        const qrst = gauss(vp, 0.33, 0.008, -0.08) + // Q
                     gauss(vp, 0.36, 0.012, 1.0) +  // R
                     gauss(vp, 0.39, 0.008, -0.12) + // S
                     gauss(vp, 0.56, 0.04, 0.22);    // T

        return p + qrst;
    }

    // --- Grid Drawing ---
    function drawGrid() {
        // Minor gridlines
        ctx.strokeStyle = 'rgba(60, 0, 0, 0.15)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        for (let x = 0; x < currentW; x += GRID_MINOR) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, currentH);
        }
        for (let y = 0; y < currentH; y += GRID_MINOR) {
            ctx.moveTo(0, y);
            ctx.lineTo(currentW, y);
        }
        ctx.stroke();

        // Major gridlines
        ctx.strokeStyle = 'rgba(80, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < currentW; x += GRID_MAJOR) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, currentH);
        }
        for (let y = 0; y < currentH; y += GRID_MAJOR) {
            ctx.moveTo(0, y);
            ctx.lineTo(currentW, y);
        }
        ctx.stroke();
    }

    // --- Heart Rate & Rhythm Panel (DOM-based) ---
    function updateECGPanelDOM() {
        if (!ecgPanel) return;
        const baseAlpha = 0.5 + bpmPulseAlpha * 0.5;
        ecgPanel.style.opacity = baseAlpha;

        let rhythmLabel = 'SINUS RHYTHM';
        if (currentRhythm === 'first_degree') rhythmLabel = '1° AV BLOCK';
        else if (currentRhythm === 'mobitz_1') rhythmLabel = '2° AV (MOBITZ 1)';
        else if (currentRhythm === 'mobitz_2') rhythmLabel = '2° AV (MOBITZ 2)';
        else if (currentRhythm === 'third_degree') rhythmLabel = '3° AV BLOCK';
        else if (currentRhythm === 'st_elevation') rhythmLabel = 'ST ELEVATION';
        else if (currentRhythm === 'afib') rhythmLabel = 'ATRIAL FIBRILLATION';
        else if (currentRhythm === 'a_flutter') rhythmLabel = 'ATRIAL FLUTTER';
        else if (currentRhythm === 'torsades') rhythmLabel = 'TORSADES DE POINTES';

        ecgPanel.innerHTML = `
            <div class="afx-ecg-bpm">♥ ${bpmDisplay} BPM</div>
            <div class="afx-ecg-rhythm">${rhythmLabel}</div>
        `;
    }

    // --- Main Render ---
    function render(timestamp) {
        if (!lastFrameTime) lastFrameTime = timestamp;
        const dt = Math.min((timestamp - lastFrameTime) / 1000, 0.05); // cap at 50ms
        lastFrameTime = timestamp;
        time += dt;

        ensureBuffer();

        // 1. Query current rhythm and trigger times from localStorage
        const storedRhythm = localStorage.getItem('ankifx_ecg_rhythm') || 'sinus';
        const triggerTime = parseInt(localStorage.getItem('ankifx_ecg_trigger_time') || '0');

                // Check if user clicked manual trigger button
        if (triggerTime > lastTriggerTime) {
            lastTriggerTime = triggerTime;
            currentRhythm = storedRhythm;
            nextRhythmTime = time + 25 + Math.random() * 15; // Reset auto-cycle timer
            
            // Resync arrhythmiaIndex to follow manual choice in sequential cycle
            if (currentRhythm !== 'sinus') {
                const idx = arrhythmiaList.indexOf(currentRhythm);
                if (idx !== -1) {
                    arrhythmiaIndex = (idx + 1) % arrhythmiaList.length;
                }
            }

            // Immediately randomize next beat targets if triggering AFib
            if (currentRhythm === 'afib') {
                afibNextBpm = 70 + Math.floor(Math.random() * 60);
                afibNextCycleDuration = 60 / afibNextBpm;
            }

            // Update declarative button label and force rerender
            if (effect.controls && effect.controls[0]) {
                effect.controls[0].label = currentRhythm === 'sinus' ? '⚡ TRIGGER ARRHYTHMIA' : '💚 RESTORE SINUS';
                AnkiFX.renderEffectControls(effect);
            }
        }

        // 2. Auto-cycle rhythms sequentially (Sinus -> Arrhythmia 1 -> Sinus -> Arrhythmia 2...)
        if (time >= nextRhythmTime) {
            if (currentRhythm === 'sinus') {
                currentRhythm = arrhythmiaList[arrhythmiaIndex];
                arrhythmiaIndex = (arrhythmiaIndex + 1) % arrhythmiaList.length;
            } else {
                currentRhythm = 'sinus';
            }
            localStorage.setItem('ankifx_ecg_rhythm', currentRhythm);
            nextRhythmTime = time + 25 + Math.random() * 15; // set next auto-cycle duration
            
            if (currentRhythm === 'afib') {
                afibNextBpm = 70 + Math.floor(Math.random() * 60);
                afibNextCycleDuration = 60 / afibNextBpm;
            }

            // Update declarative button label and force rerender
            if (effect.controls && effect.controls[0]) {
                effect.controls[0].label = currentRhythm === 'sinus' ? '⚡ TRIGGER ARRHYTHMIA' : '💚 RESTORE SINUS';
                AnkiFX.renderEffectControls(effect);
            }
        }

        // 3. Define pacing details for each rhythm
        let bpmTarget = 72;
        if (currentRhythm === 'third_degree') {
            bpmTarget = 35; // complete escape rate
        } else if (currentRhythm === 'mobitz_1' || currentRhythm === 'mobitz_2') {
            bpmTarget = 68;
        } else if (currentRhythm === 'afib') {
            bpmTarget = afibNextBpm; // irregular irregular pace
        } else if (currentRhythm === 'a_flutter') {
            bpmTarget = 75;  // regular 4:1 block
        } else if (currentRhythm === 'torsades') {
            bpmTarget = 220; // rapid polymorphic V-Tach
        }

        const cycleDuration = currentRhythm === 'afib' ? afibNextCycleDuration : (60 / bpmTarget);

        // Save current phase states before advancing
        const prevBeatPhase = beatPhase;
        const prevAtrialPhase = atrialPhase;
        const prevVentricularPhase = ventricularPhase;

        // Advance phases based on active rhythm (phases grow continuously without wrapping)
        if (currentRhythm === 'third_degree') {
            atrialPhase += dt / (60 / 88);
            ventricularPhase += dt / (60 / bpmTarget);
        } else {
            beatPhase += dt / cycleDuration;
        }

        // --- Handle irregular beat recalculations at cycle completions ---
        if (currentRhythm !== 'third_degree') {
            const prevCycleInt = Math.floor(prevBeatPhase);
            const currentCycleInt = Math.floor(beatPhase);
            if (currentCycleInt > prevCycleInt) {
                // Beat completed! If AFib is active, recalculate next cycle rate immediately
                if (currentRhythm === 'afib') {
                    afibNextBpm = 70 + Math.floor(Math.random() * 65); // Irregularly irregular rate [70 - 135 BPM]
                    afibNextCycleDuration = 60 / afibNextBpm;
                }
            }
        }

        // --- Handle BPM display updates and pulse glows (robust continuous threshold crossing) ---
        if (currentRhythm === 'third_degree') {
            if (Math.floor(prevVentricularPhase - 0.36) < Math.floor(ventricularPhase - 0.36)) {
                bpmPulseAlpha = 1.0;
                bpmDisplay = bpmTarget + Math.floor(Math.random() * 3) - 1;
            }
        } else {
            if (Math.floor(prevBeatPhase - 0.36) < Math.floor(beatPhase - 0.36)) {
                const currentBeatIndex = Math.floor(beatPhase - 0.36);
                let isDropped = false;

                if (currentRhythm === 'mobitz_1') {
                    isDropped = (currentBeatIndex % 4 === 3);
                } else if (currentRhythm === 'mobitz_2') {
                    isDropped = (currentBeatIndex % 3 === 2);
                }

                // Heart rate indicator only pulses and updates if QRS complex is not dropped!
                if (!isDropped) {
                    bpmPulseAlpha = 1.0;
                    bpmDisplay = Math.floor(bpmTarget);
                    
                    // Minor HR flicker unless rapid Torsades or regular flutter
                    if (currentRhythm !== 'torsades' && currentRhythm !== 'a_flutter') {
                        bpmDisplay += Math.floor(Math.random() * 5) - 2;
                    }
                }
            }
        }

        bpmPulseAlpha = Math.max(0, bpmPulseAlpha - dt * 4);

        // --- Write trace buffer (completely smooth continuous sampling) ---
        const pxAdvance = SWEEP_SPEED_PX_PER_S * dt;
        const newSweepX = sweepX + pxAdvance;

        const startPx = Math.floor(sweepX);
        const endPx = Math.floor(newSweepX);

        for (let px = startPx; px <= endPx; px++) {
            const idx = px % currentW;
            const pxFraction = (px - sweepX) / pxAdvance;

            if (currentRhythm === 'third_degree') {
                const aPhase = prevAtrialPhase + (atrialPhase - prevAtrialPhase) * pxFraction;
                const vPhase = prevVentricularPhase + (ventricularPhase - prevVentricularPhase) * pxFraction;
                traceBuffer[idx] = evaluateDissociated(aPhase, vPhase);
            } else {
                const bPhase = prevBeatPhase + (beatPhase - prevBeatPhase) * pxFraction;
                traceBuffer[idx] = evaluateWaveform(bPhase, currentRhythm, time);
            }
        }

        sweepX = newSweepX;
        if (sweepX >= currentW) {
            sweepX -= currentW;
        }

        // === DRAW ===

        // 1. Black background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, currentW, currentH);

        // 2. Grid
        drawGrid();

        // 3. ECG Trace drawing (High-Performance Triple-Pass CRT Glowing Renderer)
        const baselineY = currentH * 0.55;
        const amplitude = currentH * 0.35;
        const sweepPx = Math.floor(sweepX) % currentW;

        // Path batch segment step (4px step size provides flawless, continuous curves with zero color gaps)
        const segmentSize = 4;

        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw in three passes to simulate a volumetric neon electron beam (volumetric halo, core glow, hot beam core)
        for (let pass = 0; pass < 3; pass++) {
            if (pass === 0) {
                ctx.lineWidth = 15;                // Volumetric ambient halo
                ctx.strokeStyle = 'rgb(200, 0, 0)'; // Deep crimson halo
            } else if (pass === 1) {
                ctx.lineWidth = 7.0;               // Core neon glow
                ctx.strokeStyle = 'rgb(255, 15, 15)'; // Rich vibrant medical red
            } else {
                ctx.lineWidth = 2.4;               // Hot electron beam center
                ctx.strokeStyle = 'rgb(255, 175, 175)'; // Saturated white-red core
            }

            for (let i = 0; i < currentW; i += segmentSize) {
                // Calculate distance behind sweep head for the start of the segment
                let dist = sweepPx - i;
                if (dist < 0) dist += currentW;

                // Skip if the segment is in the gap ahead of the sweep
                if (dist > currentW - GAP_WIDTH) continue;

                // Skip if fully faded
                let alpha = 1.0;
                const fadeStart = currentW - GAP_WIDTH - FADE_LENGTH;
                if (dist > fadeStart) {
                    alpha = 1.0 - (dist - fadeStart) / FADE_LENGTH;
                    alpha = Math.max(0, alpha);
                }
                if (alpha <= 0) continue;

                // Near-sweep glow boost
                let glowBoost = 0;
                if (dist < 12) {
                    glowBoost = 1.0 - dist / 12;
                }

                // Determine transparency for this pass
                if (pass === 0) {
                    // Volumetric ambient halo (ultra-soft, thick)
                    ctx.globalAlpha = alpha * (0.07 + glowBoost * 0.13);
                } else if (pass === 1) {
                    // Core neon glow (moderate thickness)
                    ctx.globalAlpha = alpha * (0.28 + glowBoost * 0.32);
                } else {
                    // Hot beam core (thin, intense, solid)
                    ctx.globalAlpha = alpha * (0.85 + glowBoost * 0.15);
                }

                // Render segment path
                ctx.beginPath();
                const startY = baselineY - traceBuffer[i] * amplitude;
                ctx.moveTo(i, startY);

                const endLimit = Math.min(i + segmentSize, currentW);
                for (let next = i + 1; next < endLimit; next++) {
                    const nextY = baselineY - traceBuffer[next] * amplitude;
                    ctx.lineTo(next, nextY);
                }

                // Bridge to next segment cleanly
                if (endLimit < currentW) {
                    const nextY = baselineY - traceBuffer[endLimit] * amplitude;
                    ctx.lineTo(endLimit, nextY);
                }
                ctx.stroke();
            }
        }

        ctx.globalAlpha = 1.0;
        ctx.restore();

        // 4. Sweep cursor line
        ctx.save();
        const cursorGrad = ctx.createLinearGradient(sweepPx - 3, 0, sweepPx + 3, 0);
        cursorGrad.addColorStop(0, 'rgba(255, 0, 0, 0)');
        cursorGrad.addColorStop(0.5, 'rgba(255, 50, 50, 0.4)');
        cursorGrad.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = cursorGrad;
        ctx.fillRect(sweepPx - 3, 0, 6, currentH);
        ctx.restore();

        // 5. Updating ECG Panel overlays in DOM
        updateECGPanelDOM();

        animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);
}

export function stopECG() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    const ecgPanel = document.getElementById('afx-ecg-panel');
    if (ecgPanel) ecgPanel.remove();
}
