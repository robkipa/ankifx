window.AnkiFX_Config = {
    deckTitle: "AnkiFX Example Deck",
    deckAuthor: "Anonymous Creator",

    // This is the optional disclaimer. 
    // If you remove 'termsText', the engine will boot directly into effects.
    termsText: `
        <div style="text-align:center; margin-bottom: 1rem;">
            <span style="font-size: 3rem;">🪄</span>
        </div>
        Welcome to the <strong>AnkiFX</strong> demonstration config. 
        This modal is completely optional and can be used for attribution, 
        instructions, or just a stylish welcome screen.
        <ul style="margin-top: 1rem; padding-left: 1.5rem; text-align: left;">
            <li>All effects are performance-optimized for mobile.</li>
            <li>Music is provided via the Keygen Jukebox (v2).</li>
            <li>Use the Viewport Tuner in 'debug' mode to calibrate layout.</li>
        </ul>
    `,

    sources: [
        "AnkiFX Core Engine",
        "Community Effects Registry"
    ],

    marquee: "GREETINGS FROM ANKIFX ... A MODULAR VISUAL ENGINE FOR ANKI ... TRY SWITCHING EFFECTS IN THE BOTTOM RIGHT ... ENJOY THE TRACKER MUSIC ... STAY FOCUSED ... STUDY HARD ...",

    defaultEffect: "geometry",

    // --- OPTIONAL PREFERENCES ---

    // debug: false,           // Set to true to bypass disclaimer countdowns and show the Viewport Tuner
    // countdown: 30,          // Time in seconds the user must wait before they can click "I AGREE" on the terms disclaimer (if termsText is active)
    // marqueePosition: "top", // Position of the text ticker: "top" or "bottom"
};

