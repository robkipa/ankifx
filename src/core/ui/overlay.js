import { EFFECTS } from '../../effects/registry.js';
import { isIOSDevice, isMarqueeEnabled, isCardEnabled, isSmallScreen, markTappable } from '../platform.js';
import { bindConsent } from './consent.js';
import { bindAudioControls } from './audio-controls.js';
import { bindEffectSelector } from './effect-selector.js';

export function injectOverlayUI(state, config, activeEffect) {
    const overlay = document.createElement('div');
    overlay.id = 'ankifx-overlay';
    markTappable(overlay);

    if (config.debug) {
        overlay.classList.add('afx-debug-active');
    }

    // Space allocation for marquee
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || 800;
    const scale = screenWidth < 480 ? 0.65 : (screenWidth < 768 ? 0.8 : 1.0);
    const marqueeSpace = Math.max(55, Math.ceil(85 * scale));

    if (isIOSDevice()) {
        if (config.marqueePosition === 'top') {
            overlay.style.paddingTop = `calc(1rem + ${marqueeSpace}px)`;
        } else {
            overlay.style.paddingBottom = `calc(1rem + ${marqueeSpace}px)`;
        }
    }

    const marqueeEnabled = isMarqueeEnabled();
    const cardEnabled = isCardEnabled();
    const small = isSmallScreen();

    // --- Labels with Mobile Shortening ---
    const textPrefix = small ? '📜 ' : '📜 TEXT: ';
    const musicPrefix = small ? '' : ' MUSIC: ';
    const cardPrefix = small ? '🎴 ' : '🎴 CARD: ';

    const marqueeStatusLabel = small ? textPrefix.trim() : (marqueeEnabled ? `${textPrefix}ON` : `${textPrefix}OFF`);
    const musicStatusOff = small ? '🔇' : `🔇${musicPrefix}OFF`;
    const cardStatusLabel = small ? cardPrefix.trim() : (cardEnabled ? `${cardPrefix}ON` : `${cardPrefix}OFF`);

    const effPrefix = small ? '🎨 ' : '[ Effect: ';
    const effSuffix = small ? '' : ' ]';

    const effectOptions = Object.values(EFFECTS)
        .filter(e => e.id !== 'debug' || config.debug)
        .map(e => `
            <option value="${e.id}" ${activeEffect === e.id ? 'selected' : ''}>
                ${effPrefix}${e.name}${effSuffix}
            </option>
        `).join('');

    const dockHtml = `
        <div id="afx-bottom-dock" class="tappable">
            <div class="afx-control-group-left">
                <div class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-text-toggle" ${marqueeEnabled ? 'checked' : ''}><span class="afx-slider"></span></label>
                    <span id="afx-text-status">${marqueeStatusLabel}</span>
                </div>
                <div id="afx-music-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-audio-toggle"><span class="afx-slider"></span></label>
                    <span id="afx-music-status">${musicStatusOff}</span>
                </div>
                <div id="afx-card-container" class="afx-control-row">
                    <label class="afx-toggle"><input type="checkbox" id="afx-card-toggle" ${cardEnabled ? 'checked' : ''}><span class="afx-slider"></span></label>
                    <span id="afx-card-status">${cardStatusLabel}</span>
                </div>
            </div>

            <div class="afx-control-group-right">
                <div id="afx-effect-controls-container"></div>
                <div id="afx-effect-selector-container" class="afx-control-row afx-effect-selector-container">
                    <select id="afx-effect-selector" class="afx-select">
                        ${effectOptions}
                    </select>
                </div>
            </div>
        </div>
    `;

    // --- Terms dialog ---
    let hasAgreedSession = false;
    try {
        hasAgreedSession = localStorage.getItem(`ankifx_agreed_${config.deckTitle}`) === 'true';
    } catch (e) { }

    const hasTerms = config.termsText && typeof config.termsText === 'string' && config.termsText.trim() !== "" && !hasAgreedSession;

    if (hasTerms) {
        overlay.innerHTML = `
            <div class="afx-dialog tappable">
                <div class="afx-terms">
                    <h3>${config.deckTitle}</h3>
                    ${config.deckAuthor ? `<h4 class="afx-deck-author">by ${config.deckAuthor}</h4>` : ''}
                    ${config.termsText}
                </div>
                <div class="afx-action-row">
                    <button id="afx-consent-btn" class="afx-btn" disabled>I AGREE</button>
                </div>
            </div>
        `;
    }

    // Inject dock HTML into overlay
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = dockHtml;
    while (tempContainer.firstChild) {
        overlay.appendChild(tempContainer.firstChild);
    }

    // --- Background + shared canvases ---
    const background = document.createElement('div');
    background.id = 'ankifx-background';
    document.body.appendChild(background);

    state.sharedGL = document.createElement('canvas');
    state.sharedGL.id = 'afx-shared-gl';
    state.sharedGL.className = 'afx-shared-canvas';
    background.appendChild(state.sharedGL);

    state.shared2D = document.createElement('canvas');
    state.shared2D.id = 'afx-shared-2d';
    state.shared2D.className = 'afx-shared-canvas';
    background.appendChild(state.shared2D);

    state.sharedMarquee = document.createElement('canvas');
    state.sharedMarquee.id = 'afx-shared-marquee';
    state.sharedMarquee.className = 'afx-shared-canvas afx-shared-marquee-canvas';
    background.appendChild(state.sharedMarquee);

    state.glContext = state.sharedGL.getContext('webgl', { alpha: false, antialias: false });
    state.ctx2D = state.shared2D.getContext('2d');
    state.ctxMarquee = state.sharedMarquee.getContext('2d');

    document.body.appendChild(overlay);

    // --- Top dock ---
    const topDock = document.createElement('div');
    topDock.id = 'afx-top-dock';
    markTappable(topDock);

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
        fpsEl.className = 'afx-global-fps';
        fpsEl.textContent = 'FPS: --';
        topLeftGroup.appendChild(fpsEl);
    }

    topDock.appendChild(topLeftGroup);
    topDock.appendChild(topRightGroup);
    overlay.appendChild(topDock);


    // --- Bind logic modules ---
    const btn = document.getElementById('afx-consent-btn');
    if (hasTerms && btn) {
        bindConsent(state, config, overlay, btn);
    } else {
        // Auto-agree if no terms
        window.AnkiFX.agree(overlay, config.deckTitle);
    }

    bindAudioControls(state, config, overlay);

    // Text Toggle Binding
    const textToggle = document.getElementById('afx-text-toggle');
    if (textToggle) {
        const textStatus = document.getElementById('afx-text-status');
        textToggle.addEventListener('change', (e) => {
            const isEnabled = e.target.checked;
            const small = isSmallScreen();
            localStorage.setItem('ankifx_marquee_enabled', isEnabled);
            const prefix = small ? '📜 ' : '📜 TEXT: ';
            textStatus.textContent = small ? prefix.trim() : (isEnabled ? `${prefix}ON` : `${prefix}OFF`);
            if (state.marquee) {
                state.marquee.enabled = isEnabled;
            }
        });
    }

    // Card Toggle Binding
    const cardToggle = document.getElementById('afx-card-toggle');
    if (cardToggle) {
        const cardStatus = document.getElementById('afx-card-status');
        const applyCardVisibility = (enabled) => {
            const small = isSmallScreen();
            const prefix = small ? '🎴 ' : '🎴 CARD: ';
            cardStatus.textContent = small ? prefix.trim() : (enabled ? `${prefix}ON` : `${prefix}OFF`);
            document.documentElement.classList.toggle('afx-card-hidden', !enabled);
        };
        applyCardVisibility(cardEnabled);

        cardToggle.addEventListener('change', (e) => {
            const isEnabled = e.target.checked;
            localStorage.setItem('ankifx_card_enabled', isEnabled);
            applyCardVisibility(isEnabled);
        });
    }

    bindEffectSelector(state, config, overlay, background);

    return { overlay, background };
}
