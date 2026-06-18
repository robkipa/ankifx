import { Jukebox } from '../jukebox.js';
import { isSmallScreen } from '../platform.js';

/**
 * Audio toggle, jukebox creation, and Music on/off handler.
 */
export function bindAudioControls(state, config, overlay) {
    const audioToggle = document.getElementById('afx-audio-toggle');
    if (!audioToggle) return;

    const status = document.getElementById('afx-music-status');

    // Sync initial state
    if (audioToggle.checked) {
        overlay.classList.add('afx-music-playing');
    }

    if (state.jukebox) {
        try {
            state.jukebox.stop();
        } catch (e) {
            console.warn('[AnkiFX] Error stopping old jukebox:', e.message);
        }
    }

    state.jukebox = new Jukebox({
        onTrackChange: (track) => {
            const str = `NOW PLAYING: ${track.artist} - ${track.title} - ${track.trackTitle}`;
            config.marquee = str;
            if (state.marquee) state.marquee.setText(str);
        },
        onError: (msg) => {
            config.marquee = msg;
            if (state.marquee) state.marquee.setText(msg);
        }
    });

    audioToggle.addEventListener('change', (e) => {
        const turnOn = e.target.checked;
        const small = isSmallScreen();

        if (turnOn) {
            overlay.classList.add('afx-music-active');
            overlay.classList.add('afx-music-playing');
            status.innerHTML = small ? '🔊' : '🔊 MUSIC: ON';

            // Unlock Web Audio context
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                window.neoart = window.neoart || {};
                if (!window.neoart.audioContext) window.neoart.audioContext = new AudioCtx();
            }
            if (window.neoart.audioContext && window.neoart.audioContext.state === 'suspended') {
                window.neoart.audioContext.resume();
            }

            // Play effect-specific song if not hardcoded in config
            const activeEffect = localStorage.getItem('ankifx_preferred_effect') || config.defaultEffect || 'geometry';
            const targetTrack = config.trackTitle || state.EFFECT_SONG_MAP[activeEffect] || null;
            state.jukebox.playNext(targetTrack);
        } else {
            overlay.classList.remove('afx-music-active');
            overlay.classList.remove('afx-music-playing');
            status.innerHTML = small ? '🔇' : '🔇 MUSIC: OFF';
            state.jukebox.stop();
            config.marquee = state.defaultMarqueeText;
            if (state.marquee) state.marquee.setText(state.defaultMarqueeText);
        }
    });

    // Navigation Bindings (back/skip)
    const btnBack = document.getElementById('afx-btn-back');
    const btnSkip = document.getElementById('afx-btn-skip');
    if (btnBack) btnBack.addEventListener('click', (e) => { e.stopPropagation(); if (state.jukebox && state.jukebox.isPlaying) state.jukebox.playPrevious(); });
    if (btnSkip) btnSkip.addEventListener('click', (e) => { e.stopPropagation(); if (state.jukebox && state.jukebox.isPlaying) state.jukebox.playNext(); });
}
