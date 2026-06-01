# AnkiFX 🪄

**A modular, high-performance visual rendering and audio engine for Anki flashcards.**

## 📖 Project Overview

AnkiFX is a modular visual rendering and retro tracker-audio engine for Anki card templates.

Honestly, it started as a fun side project powered entirely by AI "vibe coding" (and burning through free Gemini credits) to see how far we could push modern WebGL, Canvas2D, and JS tracker-audio contexts inside a mobile-optimized Anki WebView. Originally built to cure the boredom of native templates and add some serious aesthetic flair to impress classmates, it turned out to be too fun not to share. 

Now, the project is open to the public so anyone can inject stunning, high-performance background visualizers, retro keygen music, and interactive overlays directly into their Anki flashcards. Your templates remain completely clean, merely loading a deck-specific **Configuration Payload** and the global **AnkiFX Engine**.


### Core Features
*   **Unified Canvas Architecture**: Uses a persistent, HDPi-compliant `WebGL` and `Canvas2D` context system. Background effects switch instantly without recreating the canvas or losing study focus.
*   **Dynamic Effect Registry**: Effects are auto-discovered during the build process and registered via an auto-generated `registry.js`. Adding a new effect is as simple as dropping a `.js` file into `src/effects/`.
*   **Auto-Maximizing Viewport Sizing**: An engine-level auto-calibration system designed to solve complex iOS/AnkiMobile viewport height and offset issues. It dynamically adjusts the `--tuner-height` CSS variable based on the native `--io-header` to guarantee perfect edge-to-edge rendering behind Anki's native UI bars.
    *   **Debug Mode**: Setting `debug: true` in your deck configuration payload displays a styled **Clear Storage** button directly inside the control deck (above the effect picker, visible only when the 'Debug' effect is active) to clear your local storage preferences in one tap.
*   **Canvas Visualizers**: Thirteen high-performance background effects:
    *   *Aurora*: Organic, noise-based northern lights simulation (optimized for mobile).
    *   *ECG*: Blood-red cardiac monitor visualizer effect with PQRST waveforms, phosphor fade trail, alternating arrhythmias (including AV blocks, STEMI, AFib, Flutter, and Torsades), and an interactive trigger toggle button.
    *   *Fire*: Classic demoscene doom-fire simulation.
    *   *Geometry*: 3D demoscene geometry + scrolling marquee.
    *   *Julia Set*: Animated fractal with a built-in **Preset Picker**.
    *   *Mandelbrot*: Zooming progressive fractal with tuning parameters.
    *   *Matrix*: Cyberpunk digital rain.
    *   *None*: A nightmode-aware, battery-efficient fallback.
    *   *Gradient*: Stripe-like WebGL noise gradient with interactive dynamic luminance contrast-adjusting card text and randomized color control.
    *   *Lava Lamp*: Highly responsive and satisfying WebGL fluid simulation.
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

## 🛠️ Development & Build System

### Getting Started

To edit visual effects, customize layouts, or compile the codebase locally:

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/robkipa/ankifx.git
    cd ankifx
    npm install
    ```
2.  **Start the Compiler**:
    ```bash
    npm run watch
    ```
3.  **Live Preview**:
    Open `build/card_front_example.html` or `build/card_back_example.html` in your browser (e.g., using VS Code's Live Server, or `npx serve build`) to preview changes in real-time.


---

## ⚙️ Configuration & Custom Deck Styling (For End Users)

AnkiFX utilizes a deck-specific configuration payload to populate attribution details, terms and conditions, a scrolling marquee text, and startup visualizer preferences.

With our unified card design, **you no longer need separate Note Types for different decks.** Instead, a single Note Type is dynamically customized on a per-deck basis using the mandatory `AfxConfig` note field.

### 1. The Mandatory `AfxConfig` note field
To configure a deck to use a custom payload, your Note Type **must** contain a field named `AfxConfig`. 

- **For Custom Configurations (e.g. Medicine):** Set the `AfxConfig` field to point to your custom script via a hidden `<img>` tag:
  ```html
  <img src="_afx_medicine.js" style="display: none !important;">
  ```
- **For the Default/Example Config:** Leave the `AfxConfig` field blank. It will automatically load the default `_afx_example.js` config.

> [!IMPORTANT]
> **Why this HTML tag is required inside the field:** Anki's media engine scans note fields to determine which files to sync to mobile (AnkiMobile/AnkiDroid) or package in `.apkg` deck exports. Storing your config file inside a hidden `<img>` tag directly in this field ensures Anki **automatically syncs it and permanently protects it from being deleted** during "Check Media" cleanups, with zero manual list-tracking in card templates!

---

### 2. Creating Private Deck Configurations
To customize AnkiFX for a specific deck:
1. Create a new JavaScript file under `configs/` prefixed with `_afx_` (e.g., `configs/_afx_medicine.js`).
2. Populate it using the `window.AnkiFX_Config` object format (shown in the template below).
*   **Git Protection**: All files under `configs/` matching `_afx_*.js` (except the public `_afx_example.js`) are git-ignored to prevent accidental leaks of private credentials.

---

### 3. Terms Disclaimer & Countdown Lockout
*   **Disclaimer Modal**: Populating `termsText` in your config triggers an overlay modal on card load. If empty, the engine boots instantly into visualizers.
*   **Forced Read Countdown**: Specifying `countdown` (seconds) locks the "I AGREE" button, forcing users to wait and read.

---

### 4. Tips for Formatting Your Terms
Since `termsText` is a template literal, you can embed standard HTML tags:
*   **Styled alerts**: Use `<em style="color: #ff9999;">` to draw attention to disclaimers.
*   **Lists & Structuring**: Use standard `<ul>` and `<li>` to present guidelines.
*   **Logos**: Embed web links (`<img src="...">`) to brand your deck visually.

---

### 5. Configuration Template (`_afx_example.js`)

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
            <li>Toggle debug: true in configs to reveal developer clear-storage utilities.</li>
        </ul>
    `,

    // Automatically formatted into the "Sources" section at the bottom of the terms
    sources: [
        "AnkiFX Core Engine",
        "Community Effects Registry"
    ],

    // Scrolling text at the top/bottom of your screens
    marquee: "GREETINGS FROM ANKIFX ... A MODULAR VISUAL ENGINE FOR ANKI ... TRY SWITCHING EFFECTS IN THE BOTTOM RIGHT ...",

    // Default visualizer on boot (e.g. geometry, fire, aurora, julia, lavalamp, none)
    defaultEffect: "geometry",

    // --- OPTIONAL PREFERENCES ---

    // debug: false,           // Set to true to bypass disclaimer countdowns and reveal developer utilities (like Clear Storage)
    // countdown: 30,          // Time in seconds the user must wait before they can click "I AGREE"
    // marqueePosition: "top", // Position of the text ticker: "top" or "bottom"
};
```

---

## 🚀 Deployment to Anki (For End Users)

AnkiFX supports both **local media loading** and **remote CDN loading**. We highly recommend using the **Resilient Hybrid Deployment** model. It loads the local engine backup first to ensure offline capability, but overrides it with the remote CDN version if online—always giving priority to the latest remote code updates.

The engine's secure assignment logic protects the global `window.AnkiFX` reference. Even if the local script executes with a delay (due to native iOS/WKWebView custom-protocol file latency on AnkiMobile), the engine detects that a remote version is already active and safely declines to overwrite it.

### Step-by-Step Hybrid Deployment

1. Run `npm run build`.
2. Copy `_ankifx.js`, `_afx_example.js`, and your customized config payloads (e.g. `_afx_medicine.js`) from the `build/` directory to your Anki `collection.media` folder.
3. Paste the following robust loader script into your Anki Card Front Template:

```html
<!-- Hidden container for the custom Note field -->
<div id="afx-config-field" style="display: none !important;">{{AfxConfig}}</div>

<script>
    (function() {
        var fieldContainer = document.getElementById("afx-config-field");
        var imgElement = fieldContainer ? fieldContainer.querySelector("img") : null;
        var configScript = "_afx_example.js"; // Default fallback
        
        if (imgElement) {
            var rawSrc = imgElement.getAttribute("src") || "";
            var filename = rawSrc.substring(rawSrc.lastIndexOf('/') + 1);
            if (filename && filename.startsWith("_afx_") && filename.endsWith(".js")) {
                configScript = filename;
            }
        }
        
        // Dynamically load the resolved configuration script
        var script = document.createElement('script');
        script.src = configScript;
        script.onerror = function() {
            console.warn("AnkiFX: Config script '" + configScript + "' failed to load. Falling back to default.");
            var fallback = document.createElement('script');
            fallback.src = "_afx_example.js";
            document.head.appendChild(fallback);
        };
        document.head.appendChild(script);
    })();
</script>

<!-- Load the local offline engine backup first (static load is 100% mobile-resilient and CORS-safe) -->
<script src="_ankifx.js" onerror="console.warn('AnkiFX: Local engine backup not found in collection.media.')"></script>

<!-- Load the latest remote engine CDN (parsed sequentially, overrides local global if online) -->
<script id="ankifx-engine-script" src="https://cdn.jsdelivr.net/gh/robkipa/ankifx@latest/build/_ankifx.js" onerror="console.warn('AnkiFX: CDN failed to load, using local engine.')"></script>

<script>
    (function() {
        window.AnkiFX_Loader_Logs = window.AnkiFX_Loader_Logs || [];
        var remoteScript = document.getElementById('ankifx-engine-script');
        if (remoteScript) {
            if (window.AnkiFX && window.AnkiFX.source === 'remote') {
                window.AnkiFX_Remote_Status = "loaded";
                window.AnkiFX_Loader_Logs.push("Remote engine script loaded (sync).");
            } else {
                window.AnkiFX_Remote_Status = "pending";
                window.AnkiFX_Loader_Logs.push("Remote engine script pending...");
                remoteScript.addEventListener('load', function() {
                    window.AnkiFX_Remote_Status = "loaded";
                    window.AnkiFX_Loader_Logs.push("Remote engine script onload fired (async).");
                    if (typeof triggerAnkiFX === 'function') triggerAnkiFX();
                });
                remoteScript.addEventListener('error', function() {
                    window.AnkiFX_Remote_Status = "failed";
                    window.AnkiFX_Loader_Logs.push("Remote engine script onerror fired (async).");
                    if (typeof triggerAnkiFX === 'function') triggerAnkiFX();
                });
            }
        }
    })();
</script>

<script>
    // Closure-scoped flags to prevent duplicate execution within the same card's lifecycle
    var contentInitialized = false;
    var ankiFXInitialized = false;

    /**
     * Resilient Polling AnkiFX Loader
     * Periodically polls for ready dependencies to bypass asynchronous WKWebView execution lags.
     * Prefers the remote CDN engine over the local engine, checking status up to 800ms.
     */
    function triggerAnkiFX(attempts = 0) {
        window.AnkiFX_Loader_Logs = window.AnkiFX_Loader_Logs || [];
        if (attempts === 0) {
            window.AnkiFX_Loader_Logs.push("triggerAnkiFX called.");
        }

        const remoteScriptExists = !!document.getElementById('ankifx-engine-script');
        const remoteStatus = window.AnkiFX_Remote_Status || (remoteScriptExists ? "pending" : "none");

        const hasAnkiFX = typeof AnkiFX !== 'undefined';
        const hasRun = typeof run === 'function';
        const hasConfig = typeof AnkiFX_Config !== 'undefined';

        if (hasAnkiFX && hasRun && hasConfig) {
            // Wait for remote engine to finish loading or fail (up to 800ms)
            const isWaitingForRemote = (remoteStatus === "pending") && (attempts < 16);
            if (isWaitingForRemote) {
                if (attempts % 5 === 0) {
                    window.AnkiFX_Loader_Logs.push("Waiting for remote script (Attempt " + attempts + ", status=" + remoteStatus + ")...");
                }
                setTimeout(() => triggerAnkiFX(attempts + 1), 50);
                return;
            }
            
            // 1. First initialize AnkiFX if it is loaded
            if (!ankiFXInitialized) {
                try {
                    window.AnkiFX_Loader_Logs.push("Initializing AnkiFX engine (Source: " + (AnkiFX.source || 'local') + ", Version: " + (AnkiFX.version || '1.0.0') + ")...");
                    ankiFXInitialized = true;
                    AnkiFX.init();
                    window.AnkiFX_Loader_Logs.push("AnkiFX.init() success.");
                } catch (e) {
                    window.AnkiFX_Loader_Logs.push("AnkiFX init error: " + e.message);
                    console.error("AnkiFX Start Error:", e);
                }
            }

            // 2. Then run the card's native content/table generator
            if (!contentInitialized) {
                try {
                    window.AnkiFX_Loader_Logs.push("Running card content run()...");
                    contentInitialized = true;
                    run();
                    window.AnkiFX_Loader_Logs.push("Card content run() success.");
                } catch (e) {
                    window.AnkiFX_Loader_Logs.push("Card content error: " + e.message);
                    console.error("Card Content Run Error:", e);
                }
            }
        } else if (attempts < 60) { // Poll for ~3 seconds
            if (attempts % 10 === 0) {
                window.AnkiFX_Loader_Logs.push("Polling (Attempt " + attempts + ": AnkiFX=" + hasAnkiFX + ", run=" + hasRun + ", Config=" + hasConfig + ")...");
            }
            setTimeout(() => triggerAnkiFX(attempts + 1), 50);
        } else {
            const err = "Loader timed out after 3.0s. AnkiFX: " + (hasAnkiFX ? "Loaded" : "FAILED") + ", run(): " + (hasRun ? "Defined" : "UNDEFINED") + ", Config: " + (hasConfig ? "Loaded" : "FAILED");
            window.AnkiFX_Loader_Logs.push(err);
            console.error(err);
        }
    }

    // --- FINAL EXECUTION TRIGGER ---
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        triggerAnkiFX();
    } else {
        document.addEventListener('DOMContentLoaded', triggerAnkiFX);
    }
</script>
```

### 🔄 Active Card Lifecycle & Auto-Cleanup (`.ankifx-card`)

To ensure seamless card transitions and prevent performance degradation on standard cards, AnkiFX implements an automatic active-card detection and cleanup system. 

#### Why it is required:
Anki does not perform a full browser/WebView reload when navigating between flashcards; instead, it dynamically swaps the HTML content inside the `#qa` wrapper. To prevent background visualizers, high-frequency render loops (WebGL/Canvas2D), and jukebox tracker-audio from running indefinitely when navigating to a non-AnkiFX card, the engine needs a way to detect when a card transition has occurred.

#### How it works:
1. **Mutation Observer**: The engine installs a global `MutationObserver` on `document.documentElement` to watch for DOM transitions.
2. **Presence Check**: On every DOM shift, the observer looks for a hidden element with the class `ankifx-card` inside the `#qa` container.
3. **Auto-Destroy**: If `<div class="ankifx-card" style="display:none;"></div>` is **not** found, the engine immediately calls `AnkiFX.destroy()`, safely tearing down animation frames, stopping audio playbacks, and releasing resources.

#### Mandatory Template Tags:
Every AnkiFX card template Front **must** include these exact tags somewhere in the HTML (preferably at the bottom of the card body):

```html
<!-- Mandatory marker for AnkiFX card detection and auto-cleanup -->
<div class="ankifx-card" style="display:none;"></div>

<!-- Keep these statically in your template so Anki packages and syncs basic engines -->
<img src="_ankifx.js" style="display:none !important;">
<img src="_afx_example.js" style="display:none !important;">
```

And your Back templates should include:

```html
<div id="afx-config-field" style="display: none !important;">{{AfxConfig}}</div>
<div class="ankifx-card" style="display:none;"></div>
<img src="_ankifx.js" style="display:none !important;">
<img src="_afx_example.js" style="display:none !important;">
```

---

## 🎨 How to Build Your Own Effects (For Developers)

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
        // - contexts.width / contexts.height: Scaled canvas dimensions (aligned to visible doc bottom)
        // - contexts.dpr: Device Pixel Ratio
        // - contexts.topInset: Pixel height of Anki's top status bar/header (--io-header)
        // - contexts.visibleWidth / contexts.visibleHeight: True visible dimensions (excluding safe insets)
        // - contexts.visibleBounds: Object { top: contexts.topInset, bottom: contexts.height }
    },

    stop() {
        // Cleanup logic. Stop requestAnimationFrame loops here.
    },

    onResize(w, h, dpr) {
        // Optional: Handle layout changes (AnkiMobile orientation switch)
    },

    // --- Declarative Controls Schema ---
    // Instead of building custom DOM selectors or buttons, describe your UI controls declaratively here.
    // The engine automatically generates, mounts, styles, and cleans them up.
    controls: [
        {
            type: "toggle",
            id: "my_toggle",
            label: "TEXT",
            value: true,
            onChange: (isChecked) => {
                console.log("Toggle state:", isChecked);
            }
        },
        {
            type: "slider",
            id: "my_slider",
            label: "ZOOM",
            min: 1.0,
            max: 20.0,
            step: 0.1,
            value: 10.0,
            onChange: (val) => {
                console.log("Slider value:", val);
            }
        },
        {
            type: "button",
            id: "my_btn",
            label: "🎨 RANDOMIZE",
            onClick: () => {
                console.log("Button clicked!");
            }
        },
        {
            type: "select",
            id: "my_select",
            label: "PRESET",
            options: [
                { value: "0", text: "Preset A" },
                { value: "1", text: "Preset B" }
            ],
            value: "0",
            onChange: (selectedVal) => {
                console.log("Selected preset index:", selectedVal);
            }
        }
    ]
};
```

#### Programmatic UI Control Updates
If you change coordinates, variables, or state programmatically (e.g. by dragging on a canvas), sync the state to the UI seamlessly without circular trigger loops using the global engine updater:
```javascript
AnkiFX.setControlValue('my_slider', 15.5);
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