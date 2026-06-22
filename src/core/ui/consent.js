/**
 * Consent countdown timer and "I AGREE" button binding.
 */
export function bindConsent(state, config, overlay, btn) {
    let countdown = config.countdown;

    // Skip countdown if debug mode is active or there is a config file error
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
        if (!btn.disabled) {
            window.AnkiFX.agree(overlay, config.deckTitle);
        }
    });
}
