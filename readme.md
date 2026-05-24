# AnkiFX 🪄

**A modular, high-performance visual rendering and audio engine for Anki flashcards.**

## 📖 Project Overview

AnkiFX is a modular visual rendering and retro tracker-audio engine for Anki card templates.

Honestly, it started as a fun side project powered entirely by AI "vibe coding" (and burning through free Gemini credits) to see how far we could push modern WebGL, Canvas2D, and JS tracker-audio contexts inside a mobile-optimized Anki WebView. Originally built to cure the boredom of native templates and add some serious aesthetic flair to impress classmates, it turned out to be too fun not to share. 

Now, the project is open to the public so anyone can inject stunning, high-performance background visualizers, retro keygen music, and interactive overlays directly into their Anki flashcards. Your templates remain completely clean, merely loading a deck-specific **Configuration Payload** and the global **AnkiFX Engine**.


### Core Features
*   **Unified Canvas Architecture**: Uses a persistent, HDPi-compliant `WebGL` and `Canvas2D` context system. Background effects switch instantly without recreating the canvas or losing study focus.
*   **Dynamic Effect Registry**: Effects are auto-discovered during the build process and registered via an auto-generated `registry.js`. Adding a new effect is as simple as dropping a `.js` file into `src/effects/`.
*   **Viewport Tuner System**: A real-time layout debugger designed to solve iOS/AnkiMobile viewport height and offset issues. Adjust the `--tuner-height` dynamically to ensure edge-to-edge rendering behind Anki's native UI bars.
    *   **Debug Mode**: The tuner requires setting `debug: true` in your deck configuration payload and selecting the `Debug` effect in the UI.
*   **Canvas Visualizers**: Eleven high-performance background effects:
    *   *Aurora*: Organic, noise-based northern lights simulation (optimized for mobile).
    *   *Fire*: Classic demoscene doom-fire simulation.
    *   *Geometry*: 3D demoscene geometry + scrolling marquee.
    *   *Julia Set*: Animated fractal with a built-in **Preset Picker**.
    *   *Mandelbrot*: Zooming progressive fractal with tuning parameters.
    *   *Matrix*: Cyberpunk digital rain.
    *   *None*: A nightmode-aware, battery-efficient fallback.
    *   *Plasma*: Animated wave interference patterns.
    *   *Starfield*: Multi-layer parallax star field.
    *   *Tetris*: Fully functional background Tetris simulation.
    *   *Debug*: Diagnostic effect for viewport calibration.
*   **Keygen Jukebox (v2)**: Pure JavaScript tracker music player powered by [`funkymed-flod-module-player`](https://www.npmjs.com/package/funkymed-flod-module-player).
    *   **Effect-Music Association**: Effects can specify a `preferredTrack` to automatically switch to a thematically appropriate track.
    *   **Playback History**: 50-track stack with navigation (`⏮️` / `⏭️`) and async race protection.
*   **Modular Attribution Dialog**: A built-in modal for deck attribution and terms of service. It's strictly opt-in; if no `termsText` is provided in the config, the engine boots directly into effects.
*   **Mobile-First Design**: Optimized for AnkiMobile (iOS) and AnkiDroid:
    *   `e.stopPropagation()` on all UI interaction to prevent accidental card flips.
    *   Aggressive iOS Web Audio unlock patterns.
    *   HDPi/Retina scaling for crisp rendering on mobile screens.

---

## 🏗️ Architecture

The project is structured to separate core engine logic from visual effects and deck configurations.

### Directory Structure
```text
ankifx/
 ├─ src/
 │   ├─ core/
 │   │   ├─ engine.js             # Core AnkiFX class, DOM/Canvas management, Mobile logic
 │   │   ├─ jukebox.js            # Keygen Jukebox: fetch, decode, history traversal
 │   │   └─ afx_styles.css        # Centralized styling (bundled via esbuild)
 │   ├─ effects/
 │   │   ├─ registry.js           # 🤖 AUTO-GENERATED: Mapping of all effect modules
 │   │   ├─ marquee.js            # Shared engine-managed text ticker
 │   │   ├─ [effect_name].js      # Individual visual effects (Fire, Julia, etc.)
 │   │   └─ ...
 │   └─ index.js                  # Entry point, bundles to window.AnkiFX
 ├─ configs/
 │   ├─ _afx_example.js           # Publicly shared configuration template
 │   └─ _afx_*.js                 # [GIT-IGNORED] Your private deck configurations
 ├─ build/                        # Compiled "Anki Simulator" folder
 │   ├─ _ankifx.js                # Combined, minified engine + CSS
 │   └─ _afx_*.js                 # Synced config files
 ├─ build.js                      # esbuild pipeline with auto-registry & config sync
 └─ package.json
```

---

## 🛠️ Local Development & Build System

The project uses `esbuild` to bundle multiple JavaScript modules and CSS into a single `_ankifx.js` file suitable for Anki's flat directory structure.

### Getting Started & Running the Dev Environment

To edit visual effects, customize layouts, or compile the codebase locally, clone this repository:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/robkipa/ankifx.git
    cd ankifx
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the build/watch loop**:
    ```bash
    npm run watch
    ```
    *This starts a persistent esbuild context that auto-rebuilds the engine and refreshes the effects registry whenever you save a file.*
4.  **Preview inside the Anki Simulator**:
    Open `build/card_front_example.html` or `build/card_back_example.html` via a local server (e.g., VS Code's Live Server extension, or `npx serve build` in your terminal) to preview effects and debug in real-time.


### Build Pipeline Features:
1.  **Auto-Registry**: Scans `src/effects/` and rebuilds `registry.js` automatically.
2.  **Config Sync**: Monitors `configs/` and copies all `_afx_*.js` files to the `build/` folder.
3.  **CSS Injection**: Styles from `afx_styles.css` are bundled as a text string and injected on engine initialization.

---

## ⚙️ Configuration & Custom Deck Styling

AnkiFX utilizes a deck-specific configuration payload to populate the attribution details, terms and conditions, scrolling marquee text, and initial effect preferences.

### 1. Creating Private Deck Configurations
To customize AnkiFX for a specific deck:
1. Create a new JavaScript file under `configs/` prefixed with `_afx_` (e.g., `configs/_afx_my_deck.js`).
2. Populate it using the `window.AnkiFX_Config` object format (shown below).
3. **Git Protection**: The build system is pre-configured to automatically discover and sync your config files into the `build/` directory for Anki media export. However, all `configs/_afx_*.js` (except `_afx_example.js`) are strictly ignored in `.gitignore`. This protects private deck questions, university course details, or proprietary content from accidentally being committed to public GitHub repositories.

### 2. Terms Disclaimer & Countdown Lockout
AnkiFX supports an opt-in modal overlay for licenses, terms of service, or general deck attributions:
* **Attribution Dialog Activation**: If the `termsText` property is present and populated in your config, the overlay will trigger on card load. If `termsText` is omitted or left as an empty string, the disclaimer is bypassed entirely, booting the engine instantly into your chosen background effect.
* **Forced Read Countdown**: You can specify a lockout duration (in seconds) via the `countdown` property. The "I AGREE" button will remain locked, showing a live counter, forcing users to wait and read the notices before proceeding.

### 3. Tips for Formatting & Styling Your Terms
Because `termsText` is defined inside a backtick (`` ` ``) template literal, you can embed rich, multi-line HTML tags directly:
* **Styled Alerts**: Use inline styles or classes like `<em style="color: #ff9999;">` to draw attention to critical disclaimers.
* **List Formatting**: Use standard `<ul>` and `<li style="margin-bottom: 0.75rem;">` to structure rules, instructions, or features cleanly.
* **Logos & Badges**: Embed favicons, course logos, or badges using web links (`<img src="..." style="max-width: 64px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.4));">`) to make your deck presentation feel premium.
* **Attribution**: Highlight contributors using emojis (`👤`, `🪄`) and neat header margins to thank deck creators.

### 4. Configuration Template (`_afx_example.js`)

Below is the standard configuration template showcasing all available parameters:

```javascript
window.AnkiFX_Config = {
    deckTitle: "AnkiFX Example Deck",
    deckAuthor: "Anonymous Creator",

    // The optional disclaimer text. Remove or set to "" to skip the modal entirely.
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

    // Automatically formatted into the "Sources" section at the bottom of the terms
    sources: [
        "AnkiFX Core Engine",
        "Community Effects Registry"
    ],

    // Scrolling text at the top/bottom of your screens
    marquee: "GREETINGS FROM ANKIFX ... A MODULAR VISUAL ENGINE FOR ANKI ... TRY SWITCHING EFFECTS IN THE BOTTOM RIGHT ...",

    // Default visualizer on boot (e.g. geometry, fire, aurora, julia, none)
    defaultEffect: "geometry",

    // --- OPTIONAL PREFERENCES ---

    // debug: false,           // Set to true to bypass disclaimer countdowns and show the Viewport Tuner
    // countdown: 30,          // Time in seconds the user must wait before they can click "I AGREE"
    // marqueePosition: "top", // Position of the text ticker: "top" or "bottom"
};
```

---

## 🎨 How to Build Your Own Effects

AnkiFX is designed for extensibility. To add a new visual effect:

1.  **Create a new file** in `src/effects/your_effect.js`.
2.  **Export an `effect` object** with the following interface:

```javascript
export const effect = {
    id: 'your_effect',         // Unique ID for the effect
    name: 'MY COOL EFFECT',    // Display name in the UI
    preferredTrack: 'track.mod', // Optional: Auto-switch jukebox to this track

    run(contexts, config) {
        // Entry point. 'contexts' provides shared access to:
        // - contexts.gl: WebGL context (afx-shared-gl)
        // - contexts.ctx2d: Canvas2D context (afx-shared-2d)
        // - contexts.width / contexts.height: Scaled dimensions
        // - contexts.dpr: Device Pixel Ratio
    },

    stop() {
        // Cleanup logic. Stop requestAnimationFrame loops here.
    },

    onResize(w, h, dpr) {
        // Optional: Handle layout changes (AnkiMobile orientation switch)
    }
};
```

3.  **Run the build**: The registry system will automatically detect your new file and include it in the `_ankifx.js` bundle. Switch to it instantly via the in-card effect picker.

---

## 🤖 AI-Agent Ready (Vibe Coding)

This repository is built for seamless AI-assisted development ("vibe coding"). If you are an AI assistant (such as Cursor, Windsurf, or a custom agent) working in this codebase, you **must** parse and adhere to the unified boundaries and standards configured in [`.cursorrules`](.cursorrules) at the root of this project.

### Key AI Guardrails (Quick Summary)
*   **Zero Inline CSS**: All styling must live in `src/core/afx_styles.css`.
*   **Auto-Registry**: Do not edit `registry.js` manually; it is compiled via `build.js`.
*   **Git Lifecycle**: Git branches are strictly isolated. All task branches must stem from `main` and use Conventional Commits.
*   **Mobile Event Blocker**: Interactive controls must call `e.stopPropagation()` on both `click` and touch events to block premature card flips.

Refer to [`.cursorrules`](.cursorrules) for full architectural interfaces and styling tokens.


---


## 🚀 Deployment to Anki

AnkiFX supports both **local media loading** and **remote CDN loading**. Since it's open-source, you are completely free to choose whichever method fits your distribution goals:

*   **Local Loading (100% Offline-Ready)**: Keeps your deck completely offline-ready by placing all assets (`_ankifx.js` and configs) inside Anki's local `collection.media` folder.
*   **Remote CDN Loading (Auto-Updates)**: Pulls the latest compiled engine directly from the jsDelivr CDN, ensuring your card templates automatically receive all future visualizer updates.
*   *Note: The built templates (`build/card_front_example.html` and `build/card_back_example.html`) are pre-configured to use the remote CDN loader with a hybrid local fallback, ensuring resiliency even when users are offline.*

### Step-by-Step Local Deployment

1.  Run `npm run build`.
2.  Copy `_ankifx.js` and your customized `_afx_[my_deck].js` config from `build/` to your Anki `collection.media` folder.
3.  Ensure your card template loads the config **before** the engine, and utilizes a robust, race-safe loader with a DOM readiness trigger to prevent initialization timing errors on mobile devices:
    ```html
    <script src="_afx_my_deck.js" onerror="console.error('AnkiFX Error: Failed to load config script. Verify file is present in collection.media.')"></script>
    <script src="_ankifx.js" onerror="console.error('AnkiFX Error: Failed to load main engine. Verify file is present in collection.media.')"></script>
    <script>
        /**
         * Robust AnkiFX Loader & Trigger
         * Prevents mobile race conditions, polls for engine readiness, and manages DOM execution boundaries.
         */
        function triggerAnkiFX(attempts = 0) {
            if (typeof AnkiFX !== 'undefined') {
                try {
                    // Initialize the engine (preferences like debug & countdown are loaded automatically from configs)
                    AnkiFX.init();
                    
                    // Trigger your custom card question generators or logic here (if any):
                    if (typeof run === 'function') run();
                } catch (e) {
                    console.error("AnkiFX Start Error:", e);
                }
            } else if (attempts < 50) { // Poll for up to 2.5 seconds to account for mobile async file delays
                setTimeout(() => triggerAnkiFX(attempts + 1), 50);
            } else {
                console.error("AnkiFX Error: Loader timed out. _ankifx.js is missing or corrupt.");
            }
        }

        // --- FINAL EXECUTION TRIGGER ---
        // Runs immediately if DOM is already parsed; otherwise listens for readiness
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            triggerAnkiFX();
        } else {
            document.addEventListener('DOMContentLoaded', triggerAnkiFX);
        }
    </script>
    ```