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
            // Ensure the agreed state is maintained across card flips
            const overlay = document.getElementById('ankifx-overlay');
            const background = document.getElementById('ankifx-background');
            
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

        this.defaultMarqueeText = config.marquee;
        
        // --- RESTORED: Build the song map from registry ---
        this.EFFECT_SONG_MAP = {};
        Object.entries(EFFECTS).forEach(([id, eff]) => {
            if (eff.preferredTrack) this.EFFECT_SONG_MAP[id] = eff.preferredTrack;
        });

        this.injectCSS();

        // Lock scroll and zero out margins to prevent the 10px top gap in AnkiMobile
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isIOS) {
            document.documentElement.classList.add('afx-scroll-lock');
        }

        // Pass isMobile and debug down to the UI injector
        const { overlay, background } = this.injectUI(config, options, isMobile, debug);
        this.startEffect(config, background, options.marqueePosition);
        
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
            }
            
            #ankifx-background {
                position: fixed; top: 0; left: 0; right: 0; bottom: 0;
                z-index: -1;
                background-color: var(--afx-bg-color, black);
            }
            
            #ankifx-overlay { 
                position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
                width: 100vw; height: 100vh;
                height: 100dvh; height: -webkit-fill-available;
                background: rgba(0,0,0,0.6); z-index: 9999; display: flex; 
                align-items: center; justify-content: center; padding: 1rem; 
                overflow: hidden; font-family: arial; box-sizing: border-box;
                transition: background-color 0.5s;
            }
            
            /* Hide controls initially in the disclaimer */
            .afx-dual-control-stack,
            .afx-effect-selector-container,
            .afx-playback-btn {
                display: none !important;
            }
            
            .afx-agreed-state {
                background: transparent !important;
                pointer-events: none; /* Let clicks pass to Anki card */
            }
            .afx-agreed-state .afx-dialog {
                background: transparent !important; border: none !important; box-shadow: none !important;
                backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
                padding: 0 !important; max-width: none !important; width: 100% !important; height: 100% !important;
                pointer-events: none;
            }
            .afx-agreed-state .afx-terms,
            .afx-agreed-state #afx-consent-btn {
                display: none !important;
            }
            .afx-agreed-state .afx-action-row {
                position: static; margin: 0; padding: 0; pointer-events: none;
            }
            
            /* Show and position controls after agree */
            .afx-agreed-state .afx-dual-control-stack,
            .afx-agreed-state .afx-effect-selector-container {
                display: flex !important;
                pointer-events: auto;
            }
            
            /* Playback buttons only show if BGM is active */
            .afx-agreed-state.afx-bgm-active .afx-playback-btn {
                display: flex !important;
                pointer-events: auto;
            }
            
            .afx-agreed-state #afx-btn-back {
                position: fixed !important; top: 10px !important; left: 10px !important; margin: 0; z-index: 10000;
            }
            .afx-agreed-state #afx-btn-skip {
                position: fixed !important; top: 10px !important; right: 10px !important; margin: 0; z-index: 10000;
            }
            .afx-agreed-state .afx-dual-control-stack {
                position: fixed !important; bottom: 10px !important; left: 10px !important; 
                margin: 0; z-index: 10000; padding: 0.6rem; background: rgba(0,0,0,0.5); 
                border-radius: 8px; flex-direction: column !important; align-items: flex-start !important;
            }
            .afx-agreed-state #afx-effect-selector-container {
                position: fixed !important; bottom: 10px !important; right: 10px !important; 
                top: auto !important;
                margin: 0; z-index: 10000; padding: 0; background: rgba(0,0,0,0.5); 
                border-radius: 8px; width: auto;
            }
            
            html.afx-scroll-lock, html.afx-scroll-lock body {
                margin: 0 !important; padding: 0 !important;
                overflow: hidden !important;
                height: 100% !important;
                width: 100% !important;
            }
            
            .afx-dialog { 
                display: flex; flex-direction: column;
                background-color: var(--afx-bg-color, rgba(10, 10, 15, 0.25));
                color: var(--afx-text-color, #f0f0f0);
                padding: 2rem; border-radius: 16px; max-width: 800px; width: 100%;
                max-height: 100%; overflow-y: auto;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
                border: 1px solid rgba(255, 255, 255, 0.15); box-sizing: border-box;
                text-align: center; position: relative; z-index: 10;
            }
            
            .afx-terms { 
                font-family: 'Courier New', monospace; 
                background: linear-gradient(135deg, rgba(20,20,25,0.4), rgba(5,5,10,0.2)); 
                color: #fff; padding: 1.5em; border-radius: 12px; line-height: 1.6; 
                border: 1px solid rgba(255,255,255,0.05); overflow-y: auto; 
                flex-shrink: 1; text-align: left; 
            }
            
            .afx-terms h3 { margin-top: 0; text-align: center; color: #ff6b6b; text-shadow: 0 2px 10px rgba(255,50,50,0.8); }
            
            .afx-action-row {
                display: flex; justify-content: center; align-items: stretch;
                margin-top: 1.5rem; gap: 1rem; flex-wrap: wrap; width: 100%;
            }

            .afx-btn { 
                margin: 0; padding: 0.8rem 2rem; font-size: 1.1rem; 
                font-weight: bold; color: #fff; border-radius: 8px; 
                border: 1px solid rgba(255,255,255,0.4); backdrop-filter: blur(5px); 
                transition: 0.3s; width: fit-content; flex-shrink: 0; 
                display: flex; align-items: center; justify-content: center;
            }
            
            .afx-btn:disabled { background: rgba(100,100,100,0.5); cursor: not-allowed; }
            .afx-btn:not(:disabled) { background: rgba(40,167,69,0.85); cursor: pointer; }
            .afx-btn:not(:disabled):hover { background: #33cc77; transform: scale(0.95); }

            .afx-control-row { 
                display: flex; gap: 12px; color: #fff; font-family: 'Courier New', monospace; 
                font-weight: bold; background: rgba(0,0,0,0.4); padding: 0.8rem 1.2rem; 
                border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); align-items: center;
                backdrop-filter: blur(5px); font-size: 0.9rem; box-sizing: border-box;
            }

            .afx-dual-control-stack {
                display: flex; flex-direction: column; gap: 8px;
            }
            .afx-dual-control-stack .afx-control-row {
                padding: 0.5rem 1rem; min-width: 140px; justify-content: space-between;
            }

            #afx-effect-selector {
                background: transparent; color: #fff; border: none; font-family: 'Courier New', monospace;
                font-weight: bold; outline: none; cursor: pointer; text-align: center; font-size: 0.9rem;
                padding: 0.8rem 1.2rem; appearance: auto; -webkit-appearance: auto;
            }

            .afx-playback-btn {
                background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.2);
                border-radius: 50%; width: 36px; height: 36px; display: none;
                align-items: center; justify-content: center; cursor: pointer;
                backdrop-filter: blur(5px); font-size: 1rem; transition: 0.3s;
                margin: 0; padding: 0; outline: none; flex-shrink: 0;
            }
            .afx-playback-btn:hover { background: rgba(255,255,255,0.1); transform: scale(1.1); }
            
            #afx-effect-selector option {
                background: #222; color: #fff;
            }
            
            .afx-toggle { position: relative; width: 34px; height: 18px; }
            .afx-toggle input { opacity: 0; width: 0; height: 0; }
            
            .afx-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.3); border-radius: 20px; transition: 0.4s; }
            .afx-slider:before { position: absolute; content: ""; height: 12px; width: 12px; left: 3px; bottom: 3px; background: white; border-radius: 50%; transition: 0.4s; }
            
            .afx-toggle input:checked + .afx-slider { background: #ff3c3c; }
            .afx-toggle input:checked + .afx-slider:before { transform: translateX(16px); }
            
            @media screen and (max-width: 768px) {
                .afx-dialog { padding: 1.5rem; }
            }
            @media screen and (max-width: 480px) {
                .afx-dialog { padding: 1.2rem; }
                .afx-terms { font-size: 0.8rem; padding: 1rem; }
                .afx-terms h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
                .afx-action-row { margin-top: 1rem; gap: 0.4rem; flex-wrap: nowrap; align-items: center; justify-content: center; }
                .afx-btn { font-size: 0.95rem; padding: 0.4rem 0.8rem; line-height: 1.1; flex-shrink: 1; text-align: center; }
                .afx-control-row { padding: 0.4rem 0.5rem; font-size: 0.8rem; flex-shrink: 1; gap: 6px; }
                #afx-effect-selector { padding: 0.4rem 0.5rem; }
                .desktop-only { display: none; }
            }
            
            /* Debug State Styles - Only apply transparency/hiding if already agreed */
            #ankifx-overlay.afx-debug-active.afx-agreed-state .afx-dialog {
                background: transparent; border: none; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; padding: 0;
            }
            #ankifx-overlay.afx-debug-active .afx-effect-selector-container {
                position: fixed; top: 1rem; right: 1rem; width: auto; z-index: 10001;
                background: rgba(0,0,0,0.7); border: 1px solid #ff0000; border-radius: 8px;
            }
            /* Hide selector in disclaimer unless agreed */
            #ankifx-overlay:not(.afx-agreed-state) .afx-effect-selector-container {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    static injectUI(config, options, isMobile, debug) {
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

        const savedEffect = localStorage.getItem('ankifx_preferred_effect');
        const activeEffect = savedEffect || config.defaultEffect || 'geometry';

        const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
        const marqueeStatusLabel = marqueeEnabled ? '📜 TEXT: ON' : '📜 TEXT: OFF';

        let dualControlHtml = `
            <div class="afx-dual-control-stack">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${marqueeEnabled ? 'checked' : ''}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${marqueeStatusLabel}</span>
                </div>
                <div id="afx-bgm-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-bgm-status">🔇<span class="desktop-only"> BGM: OFF</span></span>
                </div>
            </div>
        `;

        const isSmallScreen = screenWidth < 480;
        const effPrefix = isSmallScreen ? '🎨 ' : '[ Effect: ';
        const effSuffix = isSmallScreen ? '' : ' ]';

        const effectOptions = Object.values(EFFECTS)
            .filter(e => e.id !== 'debug' || debug) // Only show debug if flag is true
            .map(e => `
                <option value="${e.id}" ${activeEffect === e.id ? 'selected' : ''}>
                    ${effPrefix}${e.name}${effSuffix}
                </option>
            `).join('');

        let effectSelectorHtml = `
            <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0;">
                <select id="afx-effect-selector">
                    ${effectOptions}
                </select>
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
                    ${dualControlHtml}
                    <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                    ${effectSelectorHtml}
                </div>
            </div>
        `;

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

        if (isSmallScreen) {
            Object.assign(btnBack.style, { position: 'fixed', top: '10px', left: '10px', zIndex: '10000',
                width: '44px', height: '44px', background: 'rgba(0,0,0,0.5)', fontSize: '1.2rem',
                border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' });
            Object.assign(btnSkip.style, { position: 'fixed', top: '10px', right: '10px', zIndex: '10000',
                width: '44px', height: '44px', background: 'rgba(0,0,0,0.5)', fontSize: '1.2rem',
                border: '1px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' });
            overlay.appendChild(btnBack);
            overlay.appendChild(btnSkip);
        } else {
            const actionRow = overlay.querySelector('.afx-action-row');
            actionRow.prepend(btnBack);
            actionRow.append(btnSkip);
        }

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
                    status.innerHTML = '🔊<span class="desktop-only"> BGM: ON</span>';
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
                    status.innerHTML = '🔇<span class="desktop-only"> BGM: OFF</span>';
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
                textStatus.textContent = isEnabled ? '📜 TEXT: ON' : '📜 TEXT: OFF';
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
        if (effectSelector) {
            effectSelector.addEventListener('change', (e) => {
                const newEffect = e.target.value;
                localStorage.setItem('ankifx_preferred_effect', newEffect);
                
                Object.values(EFFECTS).forEach(eff => eff.stop());
                const canvases = document.querySelectorAll('#ankifx-background canvas, #ankifx-overlay canvas');
                canvases.forEach(c => c.remove());

                config.defaultEffect = newEffect;
                if (newEffect === 'debug') {
                    overlay.classList.add('afx-debug-active');
                } else {
                    overlay.classList.remove('afx-debug-active');
                }
                AnkiFX.startEffect(config, background, options.marqueePosition);

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

        return { overlay, background };
    }

    static startEffect(config, container, position) {
        const savedEffect = localStorage.getItem('ankifx_preferred_effect');
        const activeEffect = savedEffect || config.defaultEffect || 'geometry';

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