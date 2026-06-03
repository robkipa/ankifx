import { EFFECTS } from '../effects/registry.js';
import { Marquee } from '../effects/marquee.js';
import { Jukebox } from './jukebox.js';
import styles from './afx_styles.css';

export class AnkiFX {
    static init(templateOptions = {}) {
        console.log("AnkiFX: Initialized.");


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

                // Restore persistent Canvas and WebGL contexts if null (Anki script re-evaluation)
                if (!this.sharedGL) this.sharedGL = document.getElementById('afx-shared-gl');
                if (!this.shared2D) this.shared2D = document.getElementById('afx-shared-2d');
                if (!this.sharedMarquee) this.sharedMarquee = document.getElementById('afx-shared-marquee');
                
                if (this.sharedGL && !this.glContext) {
                    this.glContext = this.sharedGL.getContext('webgl', { alpha: false, antialias: false });
                }
                if (this.shared2D && !this.ctx2D) {
                    this.ctx2D = this.shared2D.getContext('2d');
                }
                if (this.sharedMarquee && !this.ctxMarquee) {
                    this.ctxMarquee = this.sharedMarquee.getContext('2d');
                }
                
                // Restore dimensions from persistent background rect
                const background = document.getElementById('ankifx-background');
                if (background) {
                    const rect = background.getBoundingClientRect();
                    this.width = rect.width;
                    const style = getComputedStyle(document.documentElement);
                    const ioHeader = parseInt(style.getPropertyValue('--io-header')) || 0;
                    this.height = document.documentElement.clientHeight + ioHeader;
                    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
                }

                // Restore active effect tracking
                if (!this.currentEffectId) {
                    const activeClass = Array.from(document.documentElement.classList).find(c => c.startsWith('afx-effect-'));
                    if (activeClass) {
                        this.currentEffectId = activeClass.replace('afx-effect-', '');
                    }
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

        // --- HARDEN AGAINST STALE/INVALID EFFECTS (e.g. renamed 'plasma' to 'lavalamp') ---
        if (!EFFECTS[activeEffect]) {
            console.warn(`AnkiFX: Stale or invalid activeEffect "${activeEffect}" detected. Falling back to default.`);
            activeEffect = config.defaultEffect || 'geometry';
            if (!EFFECTS[activeEffect]) {
                activeEffect = Object.keys(EFFECTS)[0] || 'geometry';
            }
            localStorage.setItem('ankifx_preferred_effect', activeEffect);
        }

                // Pass isMobile and config down to the UI injector
        const { overlay, background } = this.injectUI(config, isMobile, activeEffect);

        // --- NEW: ResizeObserver for dynamic safe bottom dock height ---
        const dock = document.getElementById('afx-bottom-dock');
        if (dock) {
            this.dockObserver = new ResizeObserver(() => {
                const rect = dock.getBoundingClientRect();
                document.documentElement.style.setProperty('--afx-dock-height', `${rect.height}px`);
            });
            this.dockObserver.observe(dock);
        }

        // Viewport Tuner System
        this.initTuner(config.debug, activeEffect);

        // Named handler to avoid duplicate listeners on window
        if (this._layoutHandler) {
            window.removeEventListener('orientationchange', this._layoutHandler);
            window.removeEventListener('resize', this._layoutHandler);
        }
        if (this._resizeTimeout) clearTimeout(this._resizeTimeout);
        if (this._resizeInterval) clearInterval(this._resizeInterval);

        this._layoutHandler = () => {
            if (this._resizeTimeout) clearTimeout(this._resizeTimeout);
            if (this._resizeInterval) clearInterval(this._resizeInterval);

            // Initial immediate update
            this.handleResize();
            this.updateTuner();

            // Run a delayed update shortly after to capture the immediate change
            this._resizeTimeout = setTimeout(() => {
                this.handleResize();
                this.updateTuner();
            }, 100);

            // Poll for 1.5 seconds to capture the transition settling (especially for AnkiMobile rotation)
            let elapsed = 0;
            let lastW = this.width;
            let lastH = this.height;
            const initialStyle = getComputedStyle(document.documentElement);
            let lastHeader = parseInt(initialStyle.getPropertyValue('--io-header')) || 0;

            this._resizeInterval = setInterval(() => {
                elapsed += 100;
                if (elapsed >= 1500) {
                    clearInterval(this._resizeInterval);
                    return;
                }

                const currentStyle = getComputedStyle(document.documentElement);
                const currentHeader = parseInt(currentStyle.getPropertyValue('--io-header')) || 0;
                const background = document.getElementById('ankifx-background');
                const rect = background ? background.getBoundingClientRect() : null;
                const currentW = rect ? rect.width : window.innerWidth;
                const currentH = rect ? rect.height : window.innerHeight;

                if (currentW !== lastW || currentH !== lastH || currentHeader !== lastHeader) {
                    lastW = currentW;
                    lastH = currentH;
                    lastHeader = currentHeader;
                    
                    if (this.tunerAutoUpdate) {
                        this.tunerOffset = 0;
                    }
                    this.handleResize();
                    this.updateTuner();
                }
            }, 100);
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

        // Setup observer to auto-detect transition to non-AnkiFX cards
        if (!AnkiFX.observer) {
            AnkiFX.observer = new MutationObserver(() => {
                // Wait a microtask to let the DOM settle
                setTimeout(() => {
                    const qa = document.getElementById('qa');
                    const hasAnkiFX = qa ? !!qa.querySelector('.ankifx-card') : false;
                    if (!hasAnkiFX) {
                        AnkiFX.destroy();
                    }
                }, 20);
            });
            AnkiFX.observer.observe(document.documentElement, { childList: true, subtree: true });
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
        const savedOffset = localStorage.getItem('ankifx_tuner_offset');
        const style = getComputedStyle(document.documentElement);
        const header = parseInt(style.getPropertyValue('--io-header')) || 0;

        const initialOffset = savedOffset !== null ? parseInt(savedOffset) : 0;
        this.tunerOffset = initialOffset;
        this.tunerAutoUpdate = savedOffset === null;

        if (debug && !document.getElementById('afx-tuner-ui')) {
            const tuner = document.createElement('div');
            tuner.id = 'afx-tuner-ui';
            if (activeEffect === 'debug') tuner.classList.add('active');

            tuner.innerHTML = `
                <div style="font-weight: bold; color: #ff00ff; margin-bottom: 5px;">VIEWPORT TUNER</div>
                <input type="range" id="afx-tuner-range" min="-300" max="300" value="${initialOffset}">
                <div style="margin: 5px 0 10px;">OFFSET: <span id="afx-tuner-offset-val" class="val">0</span>px</div>
                <div style="font-size: 10px; opacity: 0.7; margin-bottom: 5px; line-height: 1.4;">
                    IO-HEADER: <span id="afx-tuner-header-val">0</span>px<br>
                    TOTAL ADJ: <span id="afx-tuner-total-val" class="val">0</span>px
                </div>
            `;
                        const stack = document.querySelector('#afx-bottom-dock .afx-control-group-right');
            const selectorContainer = document.getElementById('afx-effect-selector-container');
            if (stack) {
                if (selectorContainer) {
                    stack.insertBefore(tuner, selectorContainer);
                } else {
                    stack.appendChild(tuner);
                }
            } else {
                document.body.appendChild(tuner);
            }

            // Stop propagation on tuner
            ['touchstart', 'touchend', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'click'].forEach(evt => {
                tuner.addEventListener(evt, (e) => e.stopPropagation(), { passive: false });
            });

            const slider = document.getElementById('afx-tuner-range');
            slider.oninput = () => {
                this.tunerAutoUpdate = false;
                this.tunerOffset = parseInt(slider.value);
                localStorage.setItem('ankifx_tuner_offset', slider.value);
                this.updateTuner();
            };
        }

        // Initial update
        this.updateTuner();

        // Monitor --io-header and layout dimensions for changes (e.g. AnkiMobile delayed set/squeeze)
        let lastHeader = header;
        let lastWinHeight = window.innerHeight;
        let lastDocHeight = document.documentElement.clientHeight;

        const monitorIv = setInterval(() => {
            const currentStyle = getComputedStyle(document.documentElement);
            const currentHeader = parseInt(currentStyle.getPropertyValue('--io-header')) || 0;
            const currentWinHeight = window.innerHeight;
            const currentDocHeight = document.documentElement.clientHeight;

            if (currentHeader !== lastHeader || currentWinHeight !== lastWinHeight || currentDocHeight !== lastDocHeight) {
                lastHeader = currentHeader;
                lastWinHeight = currentWinHeight;
                lastDocHeight = currentDocHeight;

                if (this.tunerAutoUpdate) {
                    this.tunerOffset = 0;
                    const slider = document.getElementById('afx-tuner-range');
                    if (slider) slider.value = 0;
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
        const savedOffset = localStorage.getItem('ankifx_tuner_offset');
        const style = getComputedStyle(document.documentElement);
        const header = parseInt(style.getPropertyValue('--io-header')) || 0;

        const offset = this.tunerOffset !== undefined ? this.tunerOffset : (savedOffset !== null ? parseInt(savedOffset) : 0);
        
        const total = offset + header;

        // Update tuner UI values if visible
        const offsetVal = document.getElementById('afx-tuner-offset-val');
        const headerVal = document.getElementById('afx-tuner-header-val');
        const totalVal = document.getElementById('afx-tuner-total-val');
        const slider = document.getElementById('afx-tuner-range');

        if (slider) {
            slider.value = offset;
        }
        if (offsetVal) {
            offsetVal.innerText = offset >= 0 ? `+${offset}` : offset;
        }
        if (headerVal) {
            headerVal.innerText = header;
        }
        if (totalVal) {
            totalVal.innerText = total >= 0 ? `+${total}` : total;
        }

        // Restore pristine 6c1ab7a9581a20544b286fa1612295a16c43b63d tuner height to ensure the canvas perfectly matches the visible document bounds
        document.documentElement.style.setProperty('--tuner-height', `calc(100dvh + ${total}px)`);

        // Dynamically compute the EXACT bottom covered height (winHeight - docHeight) to offset controls overlay only when actually overlayed
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.clientHeight;
        const bottomCovered = Math.max(0, winHeight - docHeight);
        document.documentElement.style.setProperty('--afx-bottom-offset', `${bottomCovered}px`);

        // Trigger immediate canvas resizing based on new tuner-height bounding rect
        this.handleResize();

        // Re-trigger resize on effects if they have custom resize logic
        if (this.currentEffectId && EFFECTS[this.currentEffectId]?.onResize) {
            const glDpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const effectDpr = (this.currentEffectId === 'mandelbrot' || this.currentEffectId === 'julia') ? glDpr : this.dpr;
            EFFECTS[this.currentEffectId].onResize(this.width, this.height, effectDpr);
        }
    }

    static handleResize() {
        const background = document.getElementById('ankifx-background');
        if (!background || !this.sharedGL || !this.shared2D || !this.sharedMarquee) return;

        const rect = background.getBoundingClientRect();
        this.width = rect.width;

        const style = getComputedStyle(document.documentElement);
        const ioHeader = parseInt(style.getPropertyValue('--io-header')) || 0;
        this.height = document.documentElement.clientHeight + ioHeader; // Lock globally to visible document bottom bounds!
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        const glDpr = Math.min(window.devicePixelRatio || 1, 1.5);

        // Resize GL Canvas
        this.sharedGL.width = this.width * glDpr;
        this.sharedGL.height = this.height * glDpr;
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
            const effectDpr = (this.currentEffectId === 'mandelbrot' || this.currentEffectId === 'julia') ? glDpr : this.dpr;
            EFFECTS[this.currentEffectId].onResize(this.width, this.height, effectDpr);
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

                const effPrefix = isSmallScreen ? '🎨 ' : '[ Effect: ';
        const effSuffix = isSmallScreen ? '' : ' ]';

        const effectOptions = Object.values(EFFECTS)
            .filter(e => e.id !== 'debug' || config.debug) // Only show debug if flag is true
            .map(e => `
                <option value="${e.id}" ${activeEffect === e.id ? 'selected' : ''}>
                    ${effPrefix}${e.name}${effSuffix}
                </option>
            `).join('');

        let dockHtml = `
            <div id="afx-bottom-dock">
                <div class="afx-control-group-left">
                    <div class="afx-control-row">
                        <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${marqueeEnabled ? 'checked' : ''}><span class="afx-slider"></span></label>
                        <span id="afx-text-status">${marqueeStatusLabel}</span>
                    </div>
                    <div id="afx-bgm-container" class="afx-control-row">
                        <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                        <span id="afx-bgm-status">${bgmStatusOff}</span>
                    </div>
                </div>
                <div class="afx-control-group-right">
                    <div id="afx-effect-controls-container"></div>
                    <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container" style="padding: 0;">
                        <select id="afx-effect-selector" class="afx-select">
                            ${effectOptions}
                        </select>
                    </div>
                </div>
            </div>
        `;

        let hasAgreedSession = false;
        try {
            hasAgreedSession = localStorage.getItem(`ankifx_agreed_${config.deckTitle}`) === 'true';
        } catch (e) { }

        const hasTerms = config.termsText && config.termsText.trim() !== "" && !hasAgreedSession;
        let dialogHtml = "";

        if (hasTerms) {
            dialogHtml = `
                <div class="afx-dialog">
                    <div class="afx-terms">
                        <h3>${config.deckTitle}</h3>
                        ${config.deckAuthor ? `<h4 style="margin: -10px 0 15px 0; opacity: 0.7; font-size: 0.9rem;">by ${config.deckAuthor}</h4>` : ''}
                        ${config.termsText}
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
        tempContainer.innerHTML = dockHtml;
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

        // Inject structured top dock layout
        const topDock = document.createElement('div');
        topDock.id = 'afx-top-dock';

        const topLeftGroup = document.createElement('div');
        topLeftGroup.className = 'afx-top-group-left';
        topLeftGroup.id = 'afx-top-group-left';

        const topRightGroup = document.createElement('div');
        topRightGroup.className = 'afx-top-group-right';
        topRightGroup.id = 'afx-top-group-right';

        const btnBack = document.createElement('button');
        btnBack.id = 'afx-btn-back';
        btnBack.className = 'afx-playback-btn';
        btnBack.textContent = '⏮️';

        const btnSkip = document.createElement('button');
        btnSkip.id = 'afx-btn-skip';
        btnSkip.className = 'afx-playback-btn';
        btnSkip.textContent = '⏭️';

        topLeftGroup.appendChild(btnBack);
        topRightGroup.appendChild(btnSkip);

        if (config.debug) {
            const fpsEl = document.createElement('div');
            fpsEl.id = 'afx-global-fps';
            fpsEl.style.cssText = 'color: #0f0; font-family: monospace; font-size: 14px; font-weight: bold; text-shadow: 1px 1px 2px #000; pointer-events: none;';
            fpsEl.textContent = 'FPS: --';
            topLeftGroup.appendChild(fpsEl);
        }

        topDock.appendChild(topLeftGroup);
        topDock.appendChild(topRightGroup);
        overlay.appendChild(topDock);

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

        return { overlay, background };
    }

    static startEffect(config, container, position, activeEffect) {
        // Use resolved activeEffect
        if (activeEffect === 'debug') {
            container.classList.add('afx-debug-active');
        } else {
            container.classList.remove('afx-debug-active');
        }

        // Apply effect-specific class to HTML for styling (e.g., afx-effect-none)
        const html = document.documentElement;
        Array.from(html.classList).forEach(c => {
            if (c.startsWith('afx-effect-')) html.classList.remove(c);
        });
        html.classList.add(`afx-effect-${activeEffect}`);

        this.currentEffectId = activeEffect;

        const effect = EFFECTS[activeEffect];
        if (effect) {
            const glDpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const effectDpr = (activeEffect === 'mandelbrot' || activeEffect === 'julia') ? glDpr : this.dpr;
            const style = getComputedStyle(document.documentElement);
            const ioHeader = parseInt(style.getPropertyValue('--io-header')) || 0;
            const sharedContexts = {
                gl: this.glContext,
                ctx2d: this.ctx2D,
                canvasGL: this.sharedGL,
                canvas2D: this.shared2D,
                width: this.width,
                height: this.height,
                dpr: effectDpr,
                // --- EXPLICIT VISIBLE BOUNDS FOR EFFECTS ---
                topInset: ioHeader,
                visibleWidth: this.width,
                visibleHeight: this.height - ioHeader,
                visibleBounds: {
                    top: ioHeader,
                    bottom: this.height
                }
            };

            // Apply effect-specific marquee styling
            if (this.marquee) {
                this.marquee.updateStyles(effect.marqueeFont || {});
            }

            effect.run(sharedContexts, config);

            // Render Dynamic Controls for the active effect
            this.renderEffectControls(effect);

            // Respect toggle state on new effect start
            const marqueeEnabled = localStorage.getItem('ankifx_marquee_enabled') !== 'false';
            if (this.marquee) {
                this.marquee.enabled = marqueeEnabled;
            }
        } else {
            // Apply standard default marquee styling if no active effect
            if (this.marquee) {
                this.marquee.updateStyles({});
            }

            // Clear any dynamic controls from previous effect
            this.renderEffectControls(null);
        }
    }

    static agree(overlay, deckTitle) {
        overlay.classList.add('afx-agreed-state');
        document.documentElement.classList.add('afx-agreed');
        document.documentElement.classList.remove('afx-scroll-lock');

        if (deckTitle) {
            try {
                localStorage.setItem(`ankifx_agreed_${deckTitle}`, 'true');
            } catch (e) { }
        }

        // Ensure the "qa" element is above the background
        const qa = document.getElementById("qa");
        if (qa) {
            qa.style.position = "relative";
            qa.style.zIndex = "10";
        }
    }

    static destroy() {
        // Stop current effect
        if (this.currentEffectId && EFFECTS[this.currentEffectId]?.stop) {
            EFFECTS[this.currentEffectId].stop();
        }

        // Stop jukebox
        if (this.jukebox) {
            this.jukebox.stop();
            this.jukebox = null;
        }

        // Stop marquee loop
        if (this.marqueeInterval) {
            cancelAnimationFrame(this.marqueeInterval);
            this.marqueeInterval = null;
        }
        if (this.marquee) {
            this.marquee = null;
        }

        // Move native elements back to body before destroying the container
        const flag = document.getElementById('_flag');
        const mark = document.getElementById('_mark');
        if (flag) document.body.appendChild(flag);
        if (mark) document.body.appendChild(mark);

        // Clean up DOM elements
        ['ankifx-overlay', 'ankifx-background', 'afx-tuner-ui', 'afx-btn-back', 'afx-btn-skip', 'afx-bottom-dock', 'afx-top-dock'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.remove();
        });

        // Clean up injected stylesheets
        const styleEl = document.getElementById('ankifx-styles');
        if (styleEl) {
            styleEl.remove();
        }

        // Clean up inline styles from html and qa
        document.documentElement.style.removeProperty('--tuner-height');
        document.documentElement.style.removeProperty('--afx-dock-height');
        const qa = document.getElementById('qa');
        if (qa) {
            qa.style.position = '';
            qa.style.zIndex = '';
        }

        // Clean up HTML/body classes
        document.documentElement.classList.remove('afx-scroll-lock');
        document.documentElement.classList.remove('afx-agreed');
        Array.from(document.documentElement.classList).forEach(c => {
            if (c.startsWith('afx-effect-')) {
                document.documentElement.classList.remove(c);
            }
        });

        // Clean up window references
        window.AnkiFX_Config = null;

        // Disconnect observer
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }

        if (this.dockObserver) {
            this.dockObserver.disconnect();
            this.dockObserver = null;
        }

        console.log("AnkiFX: Destroyed.");
    }

    static startMarqueeLoop() {
        if (this.marqueeInterval) return;

        let lastTime = 0;
        let frameCount = 0;

        const tick = (timestamp) => {
            if (timestamp === undefined) timestamp = performance.now();
            if (!lastTime) lastTime = timestamp;
            frameCount++;
            if (timestamp - lastTime >= 1000) {
                const fpsEl = document.getElementById('afx-global-fps');
                if (fpsEl) {
                    fpsEl.textContent = `FPS: ${frameCount} | Engine DPR: ${this.dpr}`;
                }
                frameCount = 0;
                lastTime = timestamp;
            }

            // Move native flag/mark into top dock groups if present
            const flag = document.getElementById('_flag');
            const mark = document.getElementById('_mark');
            const leftGroup = document.getElementById('afx-top-group-left');
            const rightGroup = document.getElementById('afx-top-group-right');
            const btnSkip = document.getElementById('afx-btn-skip');

            if (mark && leftGroup) {
                const fpsEl = document.getElementById('afx-global-fps');
                if (fpsEl && mark.nextSibling !== fpsEl) {
                    leftGroup.insertBefore(mark, fpsEl);
                } else if (!fpsEl && mark.parentElement !== leftGroup) {
                    leftGroup.appendChild(mark);
                }
            }
            if (flag && rightGroup && flag.parentElement !== rightGroup) {
                rightGroup.insertBefore(flag, btnSkip);
            }
            if (this.marquee && this.ctxMarquee) {
                this.ctxMarquee.clearRect(0, 0, this.width, this.height);
                
                // Allow active effect to draw full-resolution overlays (e.g. stars) on top of blurred canvas
                if (this.currentEffectId && EFFECTS[this.currentEffectId]?.drawOverlay) {
                    try {
                        EFFECTS[this.currentEffectId].drawOverlay(this.ctxMarquee, this.width, this.height, timestamp);
                    } catch (e) {
                        console.error("AnkiFX overlay error:", e);
                    }
                }

                this.marquee.render(this.ctxMarquee, this.width, this.height);
            }
            this.marqueeInterval = requestAnimationFrame(tick);
        };
        this.marqueeInterval = requestAnimationFrame(tick);
    }

    static renderEffectControls(effect) {
        const container = document.getElementById('afx-effect-controls-container');
        if (!container) return;

        // Clear existing controls
        container.innerHTML = '';

        if (!effect || !effect.controls || effect.controls.length === 0) return;

        effect.controls.forEach(control => {
            const row = document.createElement('div');
            row.className = 'afx-control-row';
            row.id = `afx-control-container-${control.id}`;

            if (control.type === 'toggle') {
                row.innerHTML = `
                    <label class="afx-toggle">
                        <input type="checkbox" id="afx-control-${control.id}" ${control.value ? 'checked' : ''}>
                        <span class="afx-slider"></span>
                    </label>
                    <span id="afx-control-label-${control.id}">${control.label}</span>
                `;
                const input = row.querySelector('input');
                input.addEventListener('change', (e) => {
                    if (control.onChange) control.onChange(e.target.checked);
                });
            } 
            else if (control.type === 'slider') {
                row.classList.add('afx-slider-row');
                const step = control.step || 1;
                const precision = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;
                row.innerHTML = `
                    <span class="afx-slider-label">${control.label}:</span>
                    <input type="range" id="afx-control-${control.id}" class="afx-range-slider" min="${control.min}" max="${control.max}" step="${step}" value="${control.value}">
                    <span id="afx-control-val-${control.id}" class="afx-slider-val-text">${control.value.toFixed(precision)}</span>
                `;
                const input = row.querySelector('input');
                const valText = row.querySelector('.afx-slider-val-text');
                input.addEventListener('input', (e) => {
                    const val = parseFloat(e.target.value);
                    valText.innerText = val.toFixed(precision);
                    if (control.onChange) control.onChange(val);
                });
            }
            else if (control.type === 'button') {
                row.style.padding = '0';
                row.innerHTML = `
                    <button id="afx-control-${control.id}" class="afx-action-btn">
                        ${control.label}
                    </button>
                `;
                const btn = row.querySelector('button');
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (control.onClick) control.onClick();
                });
            }
            else if (control.type === 'select') {
                row.style.padding = '0';
                const optionsHtml = (control.options || []).map(opt => {
                    const val = typeof opt === 'object' ? opt.value : opt;
                    const text = typeof opt === 'object' ? opt.text : opt;
                    const sel = val == control.value ? 'selected' : '';
                    return `<option value="${val}" ${sel}>${text}</option>`;
                }).join('');

                row.innerHTML = `
                    <select id="afx-control-${control.id}" class="afx-select">
                        ${optionsHtml}
                    </select>
                `;
                const select = row.querySelector('select');
                select.addEventListener('change', (e) => {
                    if (control.onChange) control.onChange(e.target.value);
                });
            }

            container.appendChild(row);
        });
    }

    static setControlValue(id, value) {
        const input = document.getElementById(`afx-control-${id}`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = !!value;
            } else {
                input.value = value;
            }
        }
        const valText = document.getElementById(`afx-control-val-${id}`);
        if (valText) {
            const stepStr = input ? input.step : '';
            const precision = (stepStr && stepStr.includes('.')) ? stepStr.split('.')[1].length : 0;
            valText.innerText = typeof value === 'number' ? value.toFixed(precision || (value % 1 === 0 ? 0 : 4)) : value;
        }
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
AnkiFX.observer = null;
// Source detection uses __ankifx_script_src, set by the esbuild banner
// OUTSIDE the IIFE — before any module code runs.
let detectedSource = 'local';
try {
    let scriptUrl = (typeof __ankifx_script_src === 'string') ? __ankifx_script_src : '';
    if (!scriptUrl) {
        // Fallback: try error stack trace
        const stack = new Error().stack || '';
        const matches = stack.match(/(https?:\/\/[^\s)\n:]+|file:\/\/[^\s)\n:]+)/g);
        if (matches && matches.length > 0) {
            for (let i = 0; i < matches.length; i++) {
                if (matches[i].includes('ankifx')) {
                    scriptUrl = matches[i];
                    break;
                }
            }
        }
    }
    if (scriptUrl) {
        if (scriptUrl.includes('cdn.jsdelivr.net') || scriptUrl.includes('github') || scriptUrl.includes('rawgit') || scriptUrl.includes('githack')) {
            detectedSource = 'remote';
        } else {
            detectedSource = 'local';
        }
    }
} catch (e) {
    detectedSource = 'detection-failed';
}

AnkiFX.version = process.env.ANKIFX_VERSION || '1.0.0-dev';
AnkiFX.buildDate = process.env.BUILD_DATE || 'development';
AnkiFX.source = detectedSource;



