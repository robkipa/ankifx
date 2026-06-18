import { handleResize } from './viewport.js';
import { getAnkiMobileOffsets } from './platform.js';

export function attachLayoutHandlers(state) {
    if (state._layoutHandler) {
        window.removeEventListener('orientationchange', state._layoutHandler);
        window.removeEventListener('resize', state._layoutHandler);
    }
    if (state._resizeTimeout) clearTimeout(state._resizeTimeout);
    if (state._resizeInterval) clearInterval(state._resizeInterval);

    state._layoutHandler = () => {
        if (state._resizeTimeout) clearTimeout(state._resizeTimeout);
        if (state._resizeInterval) clearInterval(state._resizeInterval);

        handleResize(state);

        state._resizeTimeout = setTimeout(() => {
            handleResize(state);
        }, 100);

        // Monitor for delayed AnkiMobile relayout (orientation changes settle slowly)
        let elapsed = 0;
        let lastW = state.width;
        let lastH = state.height;

        state._resizeInterval = setInterval(() => {
            elapsed += 100;
            if (elapsed >= 1500) {
                clearInterval(state._resizeInterval);
                return;
            }

            const offsets = getAnkiMobileOffsets();
            const background = document.getElementById('ankifx-background');
            const rect = background ? background.getBoundingClientRect() : null;
            const currentW = rect ? rect.width : window.innerWidth;
            const currentH = document.documentElement.clientHeight + offsets.ioHeader;

            if (currentW !== lastW || currentH !== lastH) {
                lastW = currentW;
                lastH = currentH;
                handleResize(state);
            }
        }, 100);
    };

    window.addEventListener('orientationchange', state._layoutHandler);
    window.addEventListener('resize', state._layoutHandler);
}

export function attachDockResizeObserver(state) {
    const dock = document.getElementById('afx-bottom-dock');
    if (!dock) return;

    state.dockObserver = new ResizeObserver(() => {
        const rect = dock.getBoundingClientRect();
        document.documentElement.style.setProperty('--afx-dock-height', `${rect.height}px`);
    });
    state.dockObserver.observe(dock);
}

export function attachCardObserver(state) {
    if (state.observer) return;

    state._observerTimeout = null;
    state.observer = new MutationObserver(() => {
        if (state._observerTimeout) {
            clearTimeout(state._observerTimeout);
        }
        state._observerTimeout = setTimeout(() => {
            state._observerTimeout = null;
            const qa = document.getElementById('qa');
            const hasAnkiFX = qa ? !!qa.querySelector('.ankifx-card') : false;
            if (!hasAnkiFX) {
                // Card transitioned away — tear down engine
                if (typeof state === 'object' && window.AnkiFX) {
                    window.AnkiFX.destroy();
                }
            } else {
                // Card still active — ensure native elements are parented correctly
                reparentNativeElements(state);
            }
        }, 20);
    });
    state.observer.observe(document.documentElement, { childList: true, subtree: true });
}

/**
 * One-time re-parenting of Anki native _flag and _mark elements into the
 * top dock groups. Called from init(), agree(), and the card observer —
 * NOT from the per-frame marquee loop.
 */
export function reparentNativeElements(state) {
    const hasObserver = state && state.observer;
    if (hasObserver) {
        state.observer.disconnect();
    }

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

    if (hasObserver) {
        state.observer.observe(document.documentElement, { childList: true, subtree: true });
    }
}
