import { EFFECTS } from '../effects/registry.js';
import { Marquee } from '../effects/marquee.js';
import { Jukebox } from './jukebox.js';
import styles from './afx_styles.css';

export class AnkiFX {
    static init(templateOptions = {}) {


        // --- UNIFIED CONFIG MERGER ---
        const config = {
            deckTitle: "AnkiFX Deck",
            deckAuthor: "Anonymous",
            termsText: "No terms provided.",
            sources: [],
            marquee: "ANKIFX ENGINE INITIALIZED ...",
            defaultEffect: "geometry",
            debug: false,
            countdown: 30,
            marqueePosition: 'top',
            ...(window.AnkiFX_Config || {}),
            ...templateOptions
        };

        // --- CONFIG HARDENING ---
        if (!Array.isArray(config.sources)) config.sources = [];
        const parsedCountdown = parseInt(config.countdown, 10);
        config.countdown = isNaN(parsedCountdown) ? 30 : Math.max(0, parsedCountdown);

        // Check if there's a configfile error / missing terms
        config.isConfigFileError = typeof config.termsText !== 'string' || 
                                   config.termsText.trim() === "" ||
                                   config.termsText === "No terms provided.";

        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
                
                // IMPORTANT: Refresh configurations even if we skip full init
                this.defaultMarqueeText = config.marquee;
                if (this.marquee) {
                    this.marquee.setText(config.marquee);
                    this.marquee.setPosition(config.marqueePosition);
                }
                
                // Refresh title if it exists
                const titleEl = document.getElementById('afx-deck-title');
                if (titleEl) titleEl.textContent = config.deckTitle;

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
            if (eff && eff.preferredTrack) this.EFFECT_SONG_MAP[id] = eff.preferredTrack;
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

        // Pass isMobile and config down to the UI injector
        const { overlay, background } = this.injectUI(config, isMobile, activeEffect);

        // Viewport Tuner System
        this.initTuner(config.debug, activeEffect);

        // Named handler to avoid duplicate listeners on window
        if (this._layoutHandler) {
            window.removeEventListener('orientationchange', this._layoutHandler);
            window.removeEventListener('resize', this._layoutHandler);
        }

        this._layoutHandler = () => {
            setTimeout(() => {
                this.handleResize();
                this.updateTuner();
            }, 50);
        };

        window.addEventListener('orientationchange', this._layoutHandler);
        window.addEventListener('resize', this._layoutHandler);

        // Initial resize/setup
        this.handleResize();

        // --- UNIFIED MARQUEE INIT ---
        if (!this.marquee) {
            this.marquee = new Marquee(config.marquee, config.marqueePosition);
            this.startMarqueeLoop();
        } else {
            this.marquee.setText(config.marquee);
            this.marquee.setPosition(config.marqueePosition);
        }

        this.startEffect(config, background, config.marqueePosition, activeEffect);

        // Initialize Marquee state from persistence
        const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
        if (this.marquee) {
            this.marquee.enabled = marqueeEnabled;
        }
    }


    static injectCSS() {
        if (document.getElementById('ankifx-styles')) return;
        const style = document.createElement('style');
        style.id = 'ankifx-styles';
        style.textContent = styles;
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

        // --- TUNER PROPAGATION STOPPER ---
        ['touchstart', 'touchend', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'click'].forEach(evt => {
            tuner.addEventListener(evt, (e) => e.stopPropagation(), { passive: false });
        });

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

        // Re-trigger resize on effects if they have custom resize logic
        if (this.currentEffectId && EFFECTS[this.currentEffectId]?.onResize) {
            EFFECTS[this.currentEffectId].onResize(this.width, this.height, this.dpr);
        }
    }

    static handleResize() {
        const background = document.getElementById('ankifx-background');
        if (!background || !this.sharedGL || !this.shared2D || !this.sharedMarquee) return;

        const rect = background.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        this.dpr = window.devicePixelRatio || 1;

        // Resize GL Canvas
        this.sharedGL.width = this.width * this.dpr;
        this.sharedGL.height = this.height * this.dpr;
        this.sharedGL.style.width = this.width + 'px';
        this.sharedGL.style.height = this.height + 'px';

        // Resize 2D Canvas
        this.shared2D.width = this.width * this.dpr;
        this.shared2D.height = this.height * this.dpr;
        this.shared2D.style.width = this.width + 'px';
        this.shared2D.style.height = this.height + 'px';

        // Resize Marquee Canvas
        this.sharedMarquee.width = this.width * this.dpr;
        this.sharedMarquee.height = this.height * this.dpr;
        this.sharedMarquee.style.width = this.width + 'px';
        this.sharedMarquee.style.height = this.height + 'px';

        // Global context resets
        if (this.glContext) {
            this.glContext.viewport(0, 0, this.sharedGL.width, this.sharedGL.height);
        }
        if (this.ctx2D) {
            this.ctx2D.setTransform(1, 0, 0, 1, 0, 0);
            this.ctx2D.scale(this.dpr, this.dpr);
        }
        if (this.ctxMarquee) {
            this.ctxMarquee.setTransform(1, 0, 0, 1, 0, 0);
            this.ctxMarquee.scale(this.dpr, this.dpr);
        }

        // Notify active effect
        if (this.currentEffectId && EFFECTS[this.currentEffectId]?.onResize) {
            EFFECTS[this.currentEffectId].onResize(this.width, this.height, this.dpr);
        }
    }

    static injectUI(config, isMobile, activeEffect) {
        const overlay = document.createElement('div');
        overlay.id = 'ankifx-overlay';

        if (config.debug) {
            overlay.classList.add('afx-debug-active');
        }


        // Space allocation for marquee
        const screenWidth = window.innerWidth || document.documentElement.clientWidth || 800;
        const scale = screenWidth < 480 ? 0.65 : (screenWidth < 768 ? 0.8 : 1.0);
        const marqueeSpace = Math.max(55, Math.ceil(85 * scale));

        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isIOS) {
            if (config.marqueePosition === 'top') {
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

        const marqueeStatusLabel = isSmallScreen ? textPrefix.trim() : (marqueeEnabled ? `${textPrefix}ON` : `${textPrefix}OFF`);
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
            .filter(e => e.id !== 'debug' || config.debug) // Only show debug if flag is true
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

        let hasAgreedSession = false;
        try {
            hasAgreedSession = sessionStorage.getItem(`ankifx_agreed_${config.deckTitle}`) === 'true';
        } catch (e) {}

        const hasTerms = config.termsText && config.termsText.trim() !== "" && !hasAgreedSession;
        let dialogHtml = "";

        if (hasTerms) {
            let sourcesHtml = config.sources.map(s => `<li>${s}</li>`).join('');
            dialogHtml = `
                <div class="afx-dialog">
                    <div class="afx-terms">
                        <h3>${config.deckTitle}</h3>
                        ${config.deckAuthor ? `<h4 style="margin: -10px 0 15px 0; opacity: 0.7; font-size: 0.9rem;">by ${config.deckAuthor}</h4>` : ''}
                        <p>${config.termsText}</p>
                        ${config.sources && config.sources.length > 0 ? `
                            <p><strong>Sources:</strong></p>
                            <ul>${sourcesHtml}</ul>
                        ` : ''}
                    </div>
                    <div class="afx-action-row">
                        <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                    </div>
                </div>
            `;
        }

        overlay.innerHTML = dialogHtml;

        // Inject corner controls (Toggles & Picker) directly into overlay
        const tempContainer = document.createElement('div');
        tempContainer.innerHTML = dualControlHtml + pickerStackHtml;
        while (tempContainer.firstChild) {
            overlay.appendChild(tempContainer.firstChild);
        }

        const background = document.createElement('div');
        background.id = 'ankifx-background';
        document.body.appendChild(background);

        // Persistent Canvas Creation
        this.sharedGL = document.createElement('canvas');
        this.sharedGL.id = 'afx-shared-gl';
        this.sharedGL.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
        background.appendChild(this.sharedGL);

        this.shared2D = document.createElement('canvas');
        this.shared2D.id = 'afx-shared-2d';
        this.shared2D.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';
        background.appendChild(this.shared2D);

        this.sharedMarquee = document.createElement('canvas');
        this.sharedMarquee.id = 'afx-shared-marquee';
        this.sharedMarquee.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 5;';
        background.appendChild(this.sharedMarquee);

        this.glContext = this.sharedGL.getContext('webgl', { alpha: false, antialias: false });
        this.ctx2D = this.shared2D.getContext('2d');
        this.ctxMarquee = this.sharedMarquee.getContext('2d');

        document.body.appendChild(overlay);

        // Inject playback buttons
        const btnBack = document.createElement('button');
        btnBack.id = 'afx-btn-back';
        btnBack.className = 'afx-playback-btn';
        btnBack.textContent = '⏮️';

        const btnSkip = document.createElement('button');
        btnSkip.id = 'afx-btn-skip';
        btnSkip.className = 'afx-playback-btn';
        btnSkip.textContent = '⏭️';

        overlay.appendChild(btnBack);
        overlay.appendChild(btnSkip);

        // --- UNIVERSAL PROPAGATION STOPPER (AnkiMobile Fix) ---
        const stopProps = (e) => {
            const isAgreed = overlay.classList.contains('afx-agreed-state');
            const isInteractive = e.target.closest('button, input, select, .afx-slider, .afx-toggle, .afx-playback-btn, select option');

            // 1. Before Agreement: Protect the entire screen from accidental flips
            if (!isAgreed) {
                e.stopPropagation();
            }
            // 2. After Agreement: Only protect UI controls; empty space remains flippable
            else if (isInteractive) {
                e.stopPropagation();
            }
        };
        ['touchstart', 'touchend', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'click'].forEach(evt => {
            overlay.addEventListener(evt, stopProps, { passive: false });
        });

        // Logic Bindings
        const btn = document.getElementById('afx-consent-btn');

        if (hasTerms && btn) {
            let countdown = config.countdown;

            // Skip countdown if debug mode is active or there is a configfile error
            if (config.debug || config.isConfigFileError) countdown = 0;

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

            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!btn.disabled) {
                    this.agree(overlay, config.deckTitle);
                }
            });
        } else {
            // Auto-agree if no terms
            this.agree(overlay, config.deckTitle);
        }

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
                    if (AnkiFX.marquee) AnkiFX.marquee.setText(str);
                },
                onError: (msg) => {
                    config.marquee = msg;
                    if (AnkiFX.marquee) AnkiFX.marquee.setText(msg);
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
                    if (AnkiFX.marquee) AnkiFX.marquee.setText(AnkiFX.defaultMarqueeText);
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
                textStatus.textContent = isSmallScreen ? textPrefix.trim() : (isEnabled ? `${textPrefix}ON` : `${textPrefix}OFF`);
                if (AnkiFX.marquee) {
                    AnkiFX.marquee.enabled = isEnabled;
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

                // Clear both canvases for the new effect
                if (this.ctx2D) this.ctx2D.clearRect(0, 0, this.width, this.height);
                if (this.glContext) {
                    this.glContext.clearColor(0, 0, 0, 0);
                    this.glContext.clear(this.glContext.COLOR_BUFFER_BIT);
                }

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
                AnkiFX.startEffect(config, background, config.marqueePosition, newEffect);


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
                    if (this.ctx2D) this.ctx2D.clearRect(0, 0, this.width, this.height);
                    AnkiFX.startEffect(config, background, config.marqueePosition, 'julia');
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
            const sharedContexts = {
                gl: this.glContext,
                ctx2d: this.ctx2D,
                canvasGL: this.sharedGL,
                canvas2D: this.shared2D,
                width: this.width,
                height: this.height,
                dpr: this.dpr
            };
            this.currentEffectId = activeEffect;

            // Apply effect-specific class to HTML for styling (e.g., afx-effect-none)
            const html = document.documentElement;
            Array.from(html.classList).forEach(c => {
                if (c.startsWith('afx-effect-')) html.classList.remove(c);
            });
            html.classList.add(`afx-effect-${activeEffect}`);

            // Apply effect-specific marquee styling
            if (this.marquee) {
                this.marquee.updateStyles(effect.marqueeFont || {});
            }

            effect.run(sharedContexts, config);

            // Respect toggle state on new effect start
            const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
            if (this.marquee) {
                this.marquee.enabled = marqueeEnabled;
            }
        }
    }

    static agree(overlay, deckTitle) {
        overlay.classList.add('afx-agreed-state');
        document.documentElement.classList.add('afx-agreed');
        document.documentElement.classList.remove('afx-scroll-lock');

        if (deckTitle) {
            try {
                sessionStorage.setItem(`ankifx_agreed_${deckTitle}`, 'true');
            } catch (e) {}
        }

        // Ensure the "qa" element is above the background
        const qa = document.getElementById("qa");
        if (qa) {
            qa.style.position = "relative";
            qa.style.zIndex = "10";
        }
    }

    static startMarqueeLoop() {
        if (this.marqueeInterval) return;

        const tick = () => {
            if (this.marquee && this.ctxMarquee) {
                this.ctxMarquee.clearRect(0, 0, this.width, this.height);
                this.marquee.render(this.ctxMarquee, this.width, this.height);
            }
            this.marqueeInterval = requestAnimationFrame(tick);
        };
        this.marqueeInterval = requestAnimationFrame(tick);
    }
}

AnkiFX.marquee = null;
AnkiFX.jukebox = null;
AnkiFX.defaultMarqueeText = null;
AnkiFX.sharedGL = null;
AnkiFX.shared2D = null;
AnkiFX.sharedMarquee = null;
AnkiFX.glContext = null;
AnkiFX.ctx2D = null;
AnkiFX.ctxMarquee = null;
AnkiFX.currentEffectId = null;
AnkiFX.dpr = 1;
AnkiFX.width = 0;
AnkiFX.height = 0;
AnkiFX.marqueeInterval = null;
AnkiFX._layoutHandler = null;

