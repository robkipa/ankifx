import { EFFECTS } from '../effects/registry.js';
import { Jukebox } from './jukebox.js';

export class AnkiFX {
    static activeMarquee = null;
    static jukebox = null;
    static defaultMarqueeText = null;

    static init(options = {}) {
        const config = window.AnkiFX_Config || {
            courseName: "Unknown Course",
            termsText: "No terms provided.",
            sources: [],
            marquee: "NO CONFIG FOUND",
            defaultEffect: "geometry"
        };

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Debug flag defaults to false unless explicitly passed
        const debug = options.debug === true;

        if (!isMobile && options.forceShow !== true && !debug) {
            // return; 
        }

        // Check if Anki flipped the card and overlay is already running
        if (document.getElementById('ankifx-overlay')) {
            const overlay = document.getElementById('ankifx-overlay');
            
            // If we are already agreed, we don't show the disclaimer again
            if (overlay.classList.contains('afx-agreed-state')) {
                const qa = document.getElementById("qa");
                if (qa) {
                    qa.style.position = "relative";
                    qa.style.zIndex = "10";
                }
                return;
            }
        }

        // New session / First launch: Clear old UI and reset agreed state
        document.documentElement.classList.remove('afx-scroll-lock');
        document.documentElement.classList.remove('afx-agreed');
        
        // Remove existing elements to prevent duplicates
        ['ankifx-overlay', 'ankifx-background', 'afx-tuner-ui', 'afx-btn-back', 'afx-btn-skip'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        this.defaultMarqueeText = config.marquee;
        
        // --- RESTORED: Build the song map from registry ---
        this.EFFECT_SONG_MAP = {};
        Object.entries(EFFECTS).forEach(([id, eff]) => {
            if (eff.preferredTrack) this.EFFECT_SONG_MAP[id] = eff.preferredTrack;
        });

        this.injectCSS();
        
        // Resolve active effect (Card Config > Preference > Default)
        const cardDefault = window.AnkiFX_Config?.defaultEffect;
        let activeEffect;

        if (cardDefault) {
            activeEffect = cardDefault;
            localStorage.setItem('ankifx_preferred_effect', activeEffect);
        } else {
            activeEffect = localStorage.getItem('ankifx_preferred_effect') || config.defaultEffect || 'geometry';
        }

        // Pass isMobile and debug down to the UI injector
        const { overlay, background } = this.injectUI(config, options, isMobile, debug, activeEffect);
        
        // Viewport Tuner System (Must be after UI injection if we want it in Body)
        this.initTuner(debug, activeEffect);
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.updateTuner(), 100);
        });
        window.addEventListener('resize', () => {
             // Subtle delay so Anki/iOS can settle their layout
             setTimeout(() => this.updateTuner(), 50);
        });
        this.startEffect(config, background, options.marqueePosition, activeEffect);
        
        // Initialize Marquee state from persistence
        const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
        if (this.activeMarquee) {
            this.activeMarquee.enabled = marqueeEnabled;
        }
    }

    static injectCSS() {
        if (document.getElementById('ankifx-styles')) return;
        const style = document.createElement('style');
        style.id = 'ankifx-styles';
        style.textContent = `
            :root {
                --afx-bg-color: rgba(10, 10, 15, 0.25);
                --afx-text-color: #f0f0f0;
                --afx-accent: #ff00ff;
                --tuner-height: 100dvh;
            }

            html, body {
                margin: 0 !important; padding: 0 !important;
                width: 100% !important;
                height: var(--tuner-height) !important;
                min-height: var(--tuner-height) !important;
                overflow: hidden !important;
                background-color: #000 !important;
                position: relative !important;
            }

            .card {
                margin: 0 !important; padding: 0 !important;
                width: 100% !important;
                height: var(--tuner-height) !important;
                overflow: hidden !important;
                background: transparent !important;
                box-shadow: none !important;
                position: relative !important;
            }

            #qa {
                position: relative !important;
                z-index: 5 !important;
                width: 100% !important;
                height: 100% !important;
                margin: 0 !important; padding: 0 !important;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch !important;
            }

            body > *, #content, #container, #outer, #top-bar, #bottom-bar {
                padding-bottom: 0 !important;
                margin-bottom: 0 !important;
            }

            #ankifx-background {
                position: fixed; top: 0; left: 0; width: 100%; height: var(--tuner-height);
                z-index: 1; pointer-events: none;
                background-color: var(--afx-bg-color, black);
                touch-action: none;
            }

            #ankifx-overlay {
                position: fixed; top: 0; left: 0; width: 100%; height: var(--tuner-height);
                z-index: 100; display: flex; flex-direction: column; 
                justify-content: center; align-items: center;
                background: rgba(0,0,0,0.25);
                transition: background 0.5s ease, opacity 0.5s ease; padding: 2rem; box-sizing: border-box;
                color: #fff;
            }

            /* --- GLOBAL VISIBILITY RULES --- */
            #afx-btn-back, #afx-btn-skip, .afx-dual-control-stack, #afx-controls-stack-right {
                display: none !important;
            }

            /* Back/Skip only visible when music is playing */
            #ankifx-overlay:not(.afx-music-playing) #afx-btn-back,
            #ankifx-overlay:not(.afx-music-playing) #afx-btn-skip {
                display: none !important;
            }

            /* Nav buttons only visible if agreed AND music is ON */
            .afx-agreed-state.afx-bgm-active #afx-btn-back,
            .afx-agreed-state.afx-bgm-active #afx-btn-skip {
                display: flex !important;
            }

            /* --- AGREED STATE: SHOW CONTROLS --- */
            .afx-agreed-state {
                background: transparent !important;
                backdrop-filter: none !important;
                -webkit-backdrop-filter: none !important;
                pointer-events: none !important;
            }

            .afx-agreed-state .afx-dialog {
                display: none !important;
            }

            /* Reveal corner controls only after agreement */
            .afx-agreed-state .afx-dual-control-stack,
            .afx-agreed-state #afx-controls-stack-right {
                display: flex !important;
                pointer-events: auto !important;
                position: fixed !important;
                z-index: 10001 !important;
                flex-direction: column;
                gap: 8px;
            }
            
            /* Navigation buttons (top corners) */
            #afx-btn-back, #afx-btn-skip {
                pointer-events: auto !important;
                position: fixed !important;
                z-index: 10001 !important;
            }

            /* Precise Pinned Positioning */
            #afx-btn-back { top: 20px; left: 20px; }
            #afx-btn-skip { top: 20px; right: 20px; }
            
            .afx-dual-control-stack { 
                bottom: 20px; left: 20px; 
                align-items: flex-start;
                background: transparent !important; border: none !important; box-shadow: none !important;
                padding: 0 !important;
            }

            #afx-controls-stack-right {
                bottom: 20px; right: 20px;
                align-items: flex-end;
            }

            #afx-effect-selector-container, .afx-control-row { 
                background: rgba(0,0,0,0.7); 
                border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); 
                overflow: hidden; 
                height: 32px !important;
                box-sizing: border-box !important;
                display: flex;
                align-items: center;
                padding: 0 10px !important;
            }
            #afx-controls-stack-right .afx-effect-selector-container {
                width: auto;
                min-width: 140px;
                max-width: 280px;
            }

            @media (max-width: 480px) {
                .afx-dual-control-stack {
                    gap: 5px; /* Tighter gap on mobile */
                }
            }

            @media (max-width: 768px) {
                #afx-btn-back { top: calc(10px + env(safe-area-inset-top)) !important; left: calc(10px + env(safe-area-inset-left)) !important; }
                #afx-btn-skip { top: calc(10px + env(safe-area-inset-top)) !important; right: calc(10px + env(safe-area-inset-right)) !important; }
                .afx-dual-control-stack { bottom: calc(10px + env(safe-area-inset-bottom)) !important; left: calc(10px + env(safe-area-inset-left)) !important; }
                #afx-controls-stack-right { bottom: calc(10px + env(safe-area-inset-bottom)) !important; right: calc(10px + env(safe-area-inset-right)) !important; }
            }

            .afx-dialog {
                background: rgba(25,25,30,0.96); border: 1px solid rgba(255,255,255,0.15);
                border-radius: 24px; padding: 1.5rem; max-width: 850px; width: 90%;
                box-shadow: 0 30px 80px rgba(0,0,0,0.8); display: flex; flex-direction: column;
                align-items: center; text-align: center; position: relative;
                max-height: 90vh; overflow: hidden !important; pointer-events: auto !important;
            }

            .afx-terms {
                font-family: 'Courier New', monospace; background: rgba(0,0,0,0.4);
                padding: 1.2rem; border-radius: 16px; margin-bottom: 1rem;
                width: 100%; max-height: 400px; overflow-y: auto;
                line-height: 1.7; border: 1px solid rgba(255,255,255,0.05);
                font-size: 1.1rem; color: #ccc;
            }

            .afx-btn, .afx-playback-btn, #afx-effect-selector, .afx-control-row {
                font-family: 'Courier New', Courier, monospace !important;
                font-size: 13px !important;
                font-weight: bold !important;
            }

            .afx-btn {
                padding: 10px 30px; border-radius: 12px; border: none; cursor: pointer;
                transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;
                font-size: 15px !important; /* Disclaimer button stays slightly bigger */
            }
            .afx-btn:disabled { background: #444; color: #888; cursor: not-allowed; }
            .afx-btn:not(:disabled) { background: #28a745; color: white; box-shadow: 0 4px 15px rgba(40,167,69,0.3); }
            .afx-btn:not(:disabled):hover { transform: scale(1.05); background: #2fb34d; }

            .afx-control-row {
                width: fit-content;
                height: 28px;
                box-sizing: border-box;
                padding: 0 10px;
                display: flex;
                align-items: center;
                gap: 10px; color: white;
            }

            #afx-effect-selector, .afx-sub-picker {
                background: transparent; color: white; border: none; padding: 0 !important; margin: 0 !important;
                font-family: 'Courier New', monospace; font-weight: bold; cursor: pointer; outline: none; appearance: auto;
                width: 100%; height: 100%;
            }
            #afx-effect-selector option, .afx-sub-picker option {
                background: #1a1a1a !important;
                color: #ffffff !important;
                padding: 12px !important;
                font-family: 'Courier New', monospace !important;
            }

            .afx-playback-btn {
                width: 38px; height: 38px; border-radius: 10px;
                background: rgba(0,0,0,0.7); border: 1px solid rgba(255,255,255,0.2);
                color: white; display: flex; align-items: center; justify-content: center;
                cursor: pointer; transition: 0.2s;
            }

            .afx-toggle { position: relative; width: 28px; height: 15px; }
            .afx-toggle input { opacity: 0; width: 0; height: 0; }
            .afx-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: #444; border-radius: 20px; transition: 0.4s; }
            .afx-slider:before { position: absolute; content: ""; height: 11px; width: 11px; left: 2px; bottom: 2px; background: white; border-radius: 50%; transition: 0.4s; }
            input:checked + .afx-slider { background: #28a745; }
            input:checked + .afx-slider:before { transform: translateX(13px); }

            #afx-tuner-ui {
                position: fixed; top: 20px; right: 20px; z-index: 99999;
                background: rgba(10,10,15,0.95); border: 1px solid var(--afx-accent);
                padding: 15px; border-radius: 15px; font-family: 'Courier New', monospace;
                color: white; display: none !important; width: 240px; box-shadow: 0 0 30px rgba(255,0,255,0.2);
                pointer-events: auto !important; box-sizing: border-box;
                flex-direction: column; align-items: center; text-align: center;
            }
            /* Only show tuner when BOTH active (debug effect selected) AND agreed (disclaimer accepted) */
            html.afx-agreed #afx-tuner-ui.active { display: flex !important; }

            #afx-tuner-ui input { width: 100%; margin: 12px 0; accent-color: var(--afx-accent); }
            #afx-tuner-ui .val { font-weight: bold; color: var(--afx-accent); }
            #afx-tuner-ui .stat { font-size: 10px; opacity: 0.7; margin-top: 4px; display: block; }
        `;
        document.head.appendChild(style);
    }

    static initTuner(debug, activeEffect) {
        if (!debug) return;
        if (document.getElementById('afx-tuner-ui')) return;
        
        const tuner = document.createElement('div');
        tuner.id = 'afx-tuner-ui';
        
        // Only show if debug effect is active
        if (activeEffect === 'debug') tuner.classList.add('active');

        const savedOffset = localStorage.getItem('ankifx_tuner_offset');
        const style = getComputedStyle(document.documentElement);
        const header = parseInt(style.getPropertyValue('--io-header')) || 0;
        
        // If never touched, default to -header
        const initialOffset = savedOffset !== null ? parseInt(savedOffset) : -header;
        this.tunerAutoUpdate = savedOffset === null;
        
        tuner.innerHTML = `
            <div style="font-weight: bold; color: #ff00ff; margin-bottom: 5px;">VIEWPORT TUNER</div>
            <input type="range" id="afx-tuner-range" min="-300" max="300" value="${initialOffset}">
            <div style="margin: 5px 0 10px;">OFFSET: <span id="afx-tuner-offset-val" class="val">0</span>px</div>
            <div style="font-size: 10px; opacity: 0.7; margin-bottom: 15px; line-height: 1.4;">
                IO-HEADER: <span id="afx-tuner-header-val">0</span>px<br>
                TOTAL ADJ: <span id="afx-tuner-total-val" class="val">0</span>px
            </div>
            <button id="afx-debug-clear-storage" style="display: block; width: 100%; background: #441111; color: #ff5555; border: 1px solid #ff5555; font-family: 'Courier New', monospace; padding: 8px; cursor: pointer; border-radius: 8px; font-size: 11px; font-weight: bold; box-sizing: border-box; transition: 0.2s;">CLEAR LOCALSTORAGE</button>
        `;
        document.body.appendChild(tuner);

        const slider = document.getElementById('afx-tuner-range');
        slider.oninput = () => {
            this.tunerAutoUpdate = false;
            localStorage.setItem('ankifx_tuner_offset', slider.value);
            this.updateTuner();
        };

        const clearBtn = document.getElementById('afx-debug-clear-storage');
        if (clearBtn) {
            clearBtn.onclick = () => {
                if (confirm('Clear ALL AnkiFX local storage?')) {
                    localStorage.clear();
                    location.reload();
                }
            };
        }

        // Initial update
        this.updateTuner();

        // Monitor --io-header for changes (e.g. AnkiMobile delayed set)
        let lastHeader = header;
        const monitorIv = setInterval(() => {
            const currentStyle = getComputedStyle(document.documentElement);
            const currentHeader = parseInt(currentStyle.getPropertyValue('--io-header')) || 0;
            if (currentHeader !== lastHeader) {
                lastHeader = currentHeader;
                if (this.tunerAutoUpdate) {
                    slider.value = -currentHeader;
                }
                this.updateTuner();
            }
        }, 50);

        // Stop monitoring after 2 seconds (enough for AnkiMobile to settle)
        setTimeout(() => {
            clearInterval(monitorIv);
        }, 2000);
    }

    static updateTuner() {
        const slider = document.getElementById('afx-tuner-range');
        const offsetVal = document.getElementById('afx-tuner-offset-val');
        const headerVal = document.getElementById('afx-tuner-header-val');
        const totalVal = document.getElementById('afx-tuner-total-val');
        
        if (!slider) return;

        const offset = parseInt(slider.value);
        offsetVal.innerText = offset >= 0 ? `+${offset}` : offset;

        const style = getComputedStyle(document.documentElement);
        const header = parseInt(style.getPropertyValue('--io-header')) || 0;
        headerVal.innerText = header;

        const total = offset + header;
        totalVal.innerText = total;

        document.documentElement.style.setProperty('--tuner-height', `calc(100dvh + ${total}px)`);

        // Re-trigger resize on effects
        Object.values(EFFECTS).forEach(eff => {
            if (eff.resize) eff.resize();
        });
    }

    static injectUI(config, options, isMobile, debug, activeEffect) {
        const overlay = document.createElement('div');
        overlay.id = 'ankifx-overlay';

        if (debug) {
            overlay.classList.add('afx-debug-active');
        }

        // Space allocation for marquee
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || 800;
        const scale = screenWidth < 480 ? 0.65 : (screenWidth < 768 ? 0.8 : 1.0);
        const marqueeSpace = Math.max(55, Math.ceil(85 * scale)); 

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isIOS) {
            if (options.marqueePosition === 'top') {
                overlay.style.paddingTop = `calc(1rem + ${marqueeSpace}px)`;
            } else {
                overlay.style.paddingBottom = `calc(1rem + ${marqueeSpace}px)`;
            }
        }

        const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
        const juliaPresets = EFFECTS['julia']?.presets || [];
        const isSmallScreen = screenWidth < 480;
        
        // --- Labels with Mobile Shortening ---
        const textPrefix = isSmallScreen ? '📜 ' : '📜 TEXT: ';
        const bgmPrefix = isSmallScreen ? '' : ' BGM: '; 
        
        const marqueeStatusLabel = marqueeEnabled ? `${textPrefix}ON` : `${textPrefix}OFF`;
        const bgmStatusOff = isSmallScreen ? '🔇' : `🔇${bgmPrefix}OFF`;
        const bgmStatusOn = isSmallScreen ? '🔊' : `🔊${bgmPrefix}ON`;

        let dualControlHtml = `
            <div class="afx-dual-control-stack">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${marqueeEnabled ? 'checked' : ''}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${marqueeStatusLabel}</span>
                </div>
                <div id="afx-bgm-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-bgm-status">${bgmStatusOff}</span>
                </div>
            </div>
        `;

        const effPrefix = isSmallScreen ? '🎨 ' : '[ Effect: ';
        const effSuffix = isSmallScreen ? '' : ' ]';

        const effectOptions = Object.values(EFFECTS)
            .filter(e => e.id !== 'debug' || debug) // Only show debug if flag is true
            .map(e => `
                <option value="${e.id}" ${activeEffect === e.id ? 'selected' : ''}>
                    ${effPrefix}${e.name}${effSuffix}
                </option>
            `).join('');

        const juliaPrefix = isSmallScreen ? '💠 ' : '[ Preset: ';
        const juliaSuffix = isSmallScreen ? '' : ' ]';

        const juliaOptions = juliaPresets.map((p, i) => `
            <option value="${i}">${juliaPrefix}${p.name}${juliaSuffix}</option>
        `).join('');

        let juliaSelectorHtml = `
            <div id="afx-julia-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0; display: ${activeEffect === 'julia' ? 'flex' : 'none'};">
                <select id="afx-julia-selector" class="afx-sub-picker">
                    ${juliaOptions}
                </select>
            </div>
        `;

        let effectSelectorHtml = `
            <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0;">
                <select id="afx-effect-selector">
                    ${effectOptions}
                </select>
            </div>
        `;

        let pickerStackHtml = `
            <div id="afx-controls-stack-right" class="afx-controls-stack">
                ${juliaSelectorHtml}
                ${effectSelectorHtml}
            </div>
        `;

        let sourcesHtml = config.sources.map(s => `<li>${s}</li>`).join('');

        overlay.innerHTML = `
            <div class="afx-dialog">
                <div class="afx-terms">
                    <h3>${config.courseName}</h3>
                    <p>${config.termsText}</p>
                    <p><strong>Sources:</strong></p>
                    <ul>${sourcesHtml}</ul>
                </div>
                <div class="afx-action-row">
                    <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                </div>
            </div>
        `;

        // Inject corner controls (Toggles & Picker) directly into overlay
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = dualControlHtml + pickerStackHtml;
        while (tempContainer.firstChild) {
            overlay.appendChild(tempContainer.firstChild);
        }

        const background = document.createElement('div');
        background.id = 'ankifx-background';
        document.body.appendChild(background);

        document.body.appendChild(overlay);

        // Inject playback buttons
        const btnBack = document.createElement('button');
        btnBack.id = 'afx-btn-back';
        btnBack.className = 'afx-playback-btn';
        btnBack.textContent = '⏪';

        const btnSkip = document.createElement('button');
        btnSkip.id = 'afx-btn-skip';
        btnSkip.className = 'afx-playback-btn';
        btnSkip.textContent = '⏭\uFE0F';

        overlay.appendChild(btnBack);
        overlay.appendChild(btnSkip);

        // Logic Bindings
        const btn = document.getElementById('afx-consent-btn');
        let countdown = options.countdown || 0;

        // Skip countdown if debug mode is active
        if (debug) countdown = 0;

        if (countdown > 0) {
            btn.textContent = `( ${countdown} )`;
            const iv = setInterval(() => {
                countdown--;
                btn.textContent = `( ${countdown} )`;
                if (countdown <= 0) {
                    clearInterval(iv);
                    btn.textContent = `I AGREE`;
                    btn.disabled = false;
                }
            }, 1000);
        } else {
            btn.textContent = `I AGREE`;
            btn.disabled = false;
        }

        overlay.addEventListener('click', (e) => e.stopPropagation());
        overlay.addEventListener('touchstart', (e) => e.stopPropagation(), { passive: true });

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!btn.disabled) {
                overlay.classList.add('afx-agreed-state');
                document.documentElement.classList.add('afx-agreed');
                document.documentElement.classList.remove('afx-scroll-lock');
                
                // Ensure the "qa" element is above the background
                const qa = document.getElementById("qa");
                if (qa) {
                    qa.style.position = "relative";
                    qa.style.zIndex = "10";
                }
            }
        });

        // Audio Bindings
        const audioToggle = document.getElementById('afx-audio-toggle');
        if (audioToggle) {
            const status = document.getElementById('afx-bgm-status');
            
            // Sync initial state
            if (audioToggle.checked) {
                overlay.classList.add('afx-music-playing');
            }

            AnkiFX.jukebox = new Jukebox({
                onTrackChange: (track) => {
                    const str = `NOW PLAYING: ${track.artist} - ${track.title} - ${track.trackTitle}`;
                    config.marquee = str;
                    if (AnkiFX.activeMarquee) AnkiFX.activeMarquee.setText(str);
                },
                onError: (msg) => {
                    config.marquee = msg;
                    if (AnkiFX.activeMarquee) AnkiFX.activeMarquee.setText(msg);
                }
            });

            audioToggle.addEventListener('change', (e) => {
                const turnOn = e.target.checked;
                if (turnOn) {
                    overlay.classList.add('afx-bgm-active');
                    overlay.classList.add('afx-music-playing');
                    status.innerHTML = isSmallScreen ? '🔊' : '🔊 BGM: ON';
                    status.style.color = "#ff6b6b";

                    // Unlock Web Audio context
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (AudioCtx) {
                        window.neoart = window.neoart || {};
                        if (!window.neoart.audioContext) window.neoart.audioContext = new AudioCtx();
                    }
                    if (window.neoart.audioContext && window.neoart.audioContext.state === 'suspended') {
                        window.neoart.audioContext.resume();
                    }

                    // --- RESTORED: Play effect-specific song if not hardcoded in config ---
                    const activeEffect = localStorage.getItem('ankifx_preferred_effect') || config.defaultEffect || 'geometry';
                    const targetTrack = config.trackTitle || AnkiFX.EFFECT_SONG_MAP[activeEffect] || null;
                    AnkiFX.jukebox.playNext(targetTrack);
                } else {
                    overlay.classList.remove('afx-bgm-active');
                    overlay.classList.remove('afx-music-playing');
                    status.innerHTML = isSmallScreen ? '🔇' : '🔇 BGM: OFF';
                    status.style.color = "#fff";
                    AnkiFX.jukebox.stop();
                    config.marquee = AnkiFX.defaultMarqueeText;
                    if (AnkiFX.activeMarquee) AnkiFX.activeMarquee.setText(AnkiFX.defaultMarqueeText);
                }
            });
        }

        // Text Toggle Binding
        const textToggle = document.getElementById('afx-text-toggle');
        if (textToggle) {
            const textStatus = document.getElementById('afx-text-status');
            textToggle.addEventListener('change', (e) => {
                const isEnabled = e.target.checked;
                localStorage.setItem('ankifx_marquee_enabled', isEnabled);
                const textPrefix = isSmallScreen ? '📜 ' : '📜 TEXT: ';
                textStatus.textContent = isEnabled ? `${textPrefix}ON` : `${textPrefix}OFF`;
                if (AnkiFX.activeMarquee) {
                    AnkiFX.activeMarquee.enabled = isEnabled;
                }
            });
        }

        // Navigation Bindings
        btnBack.addEventListener('click', (e) => { e.stopPropagation(); if (AnkiFX.jukebox) AnkiFX.jukebox.playPrevious(); });
        btnSkip.addEventListener('click', (e) => { e.stopPropagation(); if (AnkiFX.jukebox) AnkiFX.jukebox.playNext(); });

        // Effect Selector Binding
        const effectSelector = document.getElementById('afx-effect-selector');
        const juliaSelectorContainer = document.getElementById('afx-julia-selector-container');
        const juliaSelector = document.getElementById('afx-julia-selector');

        if (effectSelector) {
            effectSelector.addEventListener('change', (e) => {
                const newEffect = e.target.value;
                localStorage.setItem('ankifx_preferred_effect', newEffect);
                
                Object.values(EFFECTS).forEach(eff => eff.stop());
                const canvases = document.querySelectorAll('#ankifx-background canvas, #ankifx-overlay canvas');
                canvases.forEach(c => c.remove());

                config.defaultEffect = newEffect;
                const tuner = document.getElementById('afx-tuner-ui');

                // Toggle sub-pickers
                if (juliaSelectorContainer) {
                    juliaSelectorContainer.style.display = newEffect === 'julia' ? 'flex' : 'none';
                }

                if (newEffect === 'debug') {
                    overlay.classList.add('afx-debug-active');
                    if (tuner) tuner.classList.add('active');
                } else {
                    overlay.classList.remove('afx-debug-active');
                    if (tuner) tuner.classList.remove('active');
                }
                AnkiFX.startEffect(config, background, options.marqueePosition, newEffect);

                // --- RESTORED: Associated Song Switcher ---
                if (AnkiFX.jukebox && AnkiFX.jukebox.isPlaying) {
                    const targetTrack = config.trackTitle || AnkiFX.EFFECT_SONG_MAP[newEffect] || null;
                    const currentTrack = AnkiFX.jukebox.currentTrack;
                    
                    let isNewTrack = false;
                    if (targetTrack) {
                        if (typeof targetTrack === 'string') {
                            isNewTrack = !currentTrack || currentTrack.title.toLowerCase() !== targetTrack.toLowerCase();
                        } else {
                            // Target is object { title, trackTitle, artist }
                            isNewTrack = !currentTrack || 
                                         (targetTrack.title && currentTrack.title.toLowerCase() !== targetTrack.title.toLowerCase()) ||
                                         (targetTrack.trackTitle && currentTrack.trackTitle.toLowerCase() !== targetTrack.trackTitle.toLowerCase()) ||
                                         (targetTrack.artist && (currentTrack.artist || "").toLowerCase() !== targetTrack.artist.toLowerCase());
                        }
                    }
                    
                    if (isNewTrack) {
                        AnkiFX.jukebox.playNext(targetTrack);
                    }
                }
            });
        }

        // Julia Sub-Picker Binding
        if (juliaSelector) {
            juliaSelector.addEventListener('change', (e) => {
                const presetIndex = parseInt(e.target.value);
                const preset = EFFECTS['julia'].presets[presetIndex];
                if (preset) {
                    // Update current config with preset coordinates
                    Object.assign(config, preset);
                    
                    // Restart Julia effect
                    EFFECTS['julia'].stop();
                    const canvases = document.querySelectorAll('#ankifx-background canvas, #ankifx-overlay canvas');
                    canvases.forEach(c => c.remove());
                    AnkiFX.startEffect(config, background, options.marqueePosition, 'julia');
                }
            });
        }

        return { overlay, background };
    }

    static startEffect(config, container, position, activeEffect) {
        // Use resolved activeEffect
        if (activeEffect === 'debug') {
            container.classList.add('afx-debug-active');
        } else {
            container.classList.remove('afx-debug-active');
        }

        const effect = EFFECTS[activeEffect];
        if (effect) {
            AnkiFX.activeMarquee = effect.run(container, config.marquee, position, config);
            
            // Respect toggle state on new effect start
            const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
            if (AnkiFX.activeMarquee) {
                AnkiFX.activeMarquee.enabled = marqueeEnabled;
            }
        }
    }
}