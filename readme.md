# AnkiFX 🪄

**A modular, high-performance visual rendering and audio engine for Anki flashcards.**

## 📖 Project Overview

AnkiFX is a modular visual rendering and retro tracker-audio engine for Anki card templates.

Honestly, it started as a fun side project powered entirely by AI "vibe coding" (and burning through free Gemini credits) to see how far we could push modern WebGL, Canvas2D, and JS tracker-audio contexts inside a mobile-optimized Anki WebView. Originally built to cure the boredom of native templates and add some serious aesthetic flair to impress classmates, it turned out to be too fun not to share.

Now, the project is open to the public so anyone can inject stunning, high-performance background visualizers, retro keygen music, and interactive overlays directly into their Anki flashcards. Your templates remain completely clean, merely loading a deck-specific **Configuration Payload** and the global **AnkiFX Engine**.


### Core Features
*   **Unified Canvas Architecture**: Uses a persistent, HDPi-compliant `WebGL` and `Canvas2D` context system. Background effects switch instantly without recreating the canvas or losing study focus.
*   **Dynamic Effect Registry**: Effects are auto-discovered during the build process and registered via an auto-generated `registry.js`. Adding a new effect is as simple as dropping a `.js` file into `src/effects/`.
*   **Auto-Maximizing Viewport Sizing**: An engine-level auto-calibration system designed to solve complex iOS/AnkiMobile viewport height and offset issues. It dynamically adjusts the `--afx-viewport-height` CSS variable based on the native `--io-header` to guarantee perfect edge-to-edge rendering behind Anki's native UI bars.
    *   **Debug Mode**: Setting `debug: true` in your deck configuration payload enables the **DEBUG** effect, which opens a comprehensive real-time dashboard on mobile and desktop:
        *   **AnkiFX Version**: Displays the active engine version, source, build date, and evaluation history.
        *   **Viewport & Layout**: Displays window, screen, and document viewport metrics in real-time.
        *   **Chronological Loader Logs**: Lists template loading events and error logs.
        *   **LocalStorage Viewer**: Displays sorted key-value pairs of localStorage in real-time, showing direct evidence of preferences and terms agreement.
        *   **Console Logs (Full-Width)**: A custom scrollable panel capturing console outputs (`log`, `warn`, `error`, etc.), unhandled exceptions, and unhandled promise rejections, complete with level filtering and a global-scope JavaScript execution command line.
*   **Canvas Visualizers**: Thirteen high-performance background effects:
    *   *Aurora*: Organic, noise-based northern lights simulation (optimized for mobile).
    *   *ECG*: Blood-red cardiac monitor visualizer effect with PQRST waveforms, phosphor fade trail, alternating arrhythmias (including AV blocks, STEMI, AFib, Flutter, and Torsades), and an interactive trigger toggle button.
    *   *Fire*: Classic demoscene doom-fire simulation.
    *   *Geometry*: Sacred geometry engine utilizing a unified field ontology, driving four distinct projection modes (Unity, Light, Flow, and Fractal Mosaic).
    *   *Julia Set*: Animated fractal with a built-in **Preset Picker**.
    *   *Mandelbrot*: Zooming progressive fractal with tuning parameters.
    *   *Matrix*: Cyberpunk digital rain.
    *   *None*: A nightmode-aware, battery-efficient fallback.
    *   *Gradient*: Stripe-like WebGL noise gradient with interactive dynamic luminance contrast-adjusting card text and randomized color control.
    *   *Lava Lamp*: Highly responsive and satisfying WebGL fluid simulation.
    *   *Starfield*: Multi-layer parallax star field.
    *   *Tetris*: Fully functional background Tetris simulation.
    *   *Debug*: Diagnostic effect for viewport calibration.
*   **Keygen Jukebox**: Pure JavaScript tracker music player powered by [`funkymed-flod-module-player`](https://www.npmjs.com/package/funkymed-flod-module-player).
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
 │   │   ├─ engine.js             # AnkiFX orchestration (init, destroy, agree)
 │   │   ├─ config-merge.js       # Config merge + active effect resolution
 │   │   ├─ viewport.js            # Viewport resize + DPR
 │   │   ├─ effect-lifecycle.js   # startEffect + shared contexts
 │   │   ├─ ui/overlay.js         # Terms dialog, dock, canvases
 │   │   ├─ jukebox.js            # Keygen Jukebox: fetch, decode, history traversal
 │   │   └─ afx_styles.css        # Centralized styling (bundled via esbuild)
 │   ├─ effects/
 │   │   ├─ registry.js           # 🤖 AUTO-GENERATED: Mapping of all effect modules
 │   │   ├─ marquee.js            # Shared engine-managed text ticker
 │   │   ├─ [effect_name].js      # Individual visual effects (Fire, Julia, etc.)
 │   │   └─ ...
 │   └─ index.js                  # Entry point, bundles to window.AnkiFX
 ├─ configs/
 │   ├─ _afx_defaults.json        # Publicly shared configuration template
 │   └─ _afx_*.json               # [GIT-IGNORED] Your private deck configurations
 ├─ build/                        # Compiled "Anki Simulator" folder
 │   ├─ _ankifx.js                # Combined, minified engine + CSS
 │   ├─ _afx_defaults.json        # Compiled default config file
 │   └─ configs/                  # [GIT-IGNORED] Untracked compiled deck overrides
 ├─ build.js                      # esbuild pipeline with JSON validation, base64 encoding & merging
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
    Open `build/card templates/ankifx_basic_front.html` or `build/card templates/ankifx_basic_back.html` in your browser (e.g., using VS Code's Live Server, or `npx serve build`) to preview changes in real-time.
4.  **Local Anki Auto-Copy (Optional)**:
    To automatically copy compiled build files directly to your Anki `collection.media` folder on every build or save:
    * Create a private, git-ignored `ankifx.local.json` in the root:
      ```json
      {
        "ankiMediaDir": "/path/to/Anki2/User/collection.media"
      }
      ```
    * Run `npm run build:local` (one-time build + copy) or `npm run watch:local` (watch + auto-copy on save).

---

## ⚙️ Configuration & Custom Deck Styling (For End Users)

AnkiFX utilizes a deck-specific configuration payload to populate attribution details, terms and conditions, a scrolling marquee text, and startup visualizer preferences.

With our unified card design, **you no longer need separate Note Types for different decks.** Instead, a single Note Type is dynamically customized on a per-deck basis using the mandatory `AnkiFXConfig` note field.

### 1. The Mandatory `AnkiFXConfig` note field
To configure a deck to use a custom payload, your Note Type **must** contain a field named `AnkiFXConfig`. 

- **For Custom Configurations (e.g. Medicine):** Set the `AnkiFXConfig` field directly to your compiled JSON payload (which you can copy from your compiled `/build/configs/` folder, where `termsText` is automatically base64-encoded for secure rendering and privacy):
  ```json
  {
      "deckTitle": "Medicine Study Deck",
      "termsText": "PGRpdiBzdHlsZT0idGV4dC1hbGlnbjpjZW50ZXI7Ij7wn6epPC9kaXY+",
      "marquee": "MEDICINE STUDY MODE ACTIVE ...",
      "defaultEffect": "ecg"
  }
  ```
- **For the Default/Example Config:** Leave the `AnkiFXConfig` field blank. It will automatically load the default fallback `_afx_defaults.json` config.

> [!IMPORTANT]
> **No more file clutter & image tags:** Since configurations are stored directly in your note database via the `AnkiFXConfig` field, you **no longer need custom `.js` config files in collection.media**, nor do you need to tag invisible images to force syncing. Synchronization is completely automatic!

---

### 2. Creating Private Deck Configurations
To customize AnkiFX for a specific deck:
1. Create a new strict JSON file under `configs/` prefixed with `_afx_` (e.g., `configs/_afx_medicine.json`).
2. Populate it using strict JSON (keys and string values in double quotes).
*   **Git Protection**: All files under `configs/` matching `_afx_*.json` (except the public `_afx_defaults.json`) are git-ignored to prevent accidental leaks of private credentials.
*   **Deck Merging**: Custom configs only need to specify fields they want to override. During `npm run build`, overrides are automatically merged over `_afx_defaults.json` and saved in `build/configs/`.

---

### 3. Terms Disclaimer & Base64 Compiling
*   **HTML in JSON (Array of Strings)**: To make editing multiline HTML inside strict JSON highly readable, the `termsText` field is authored as a JSON array of strings, which are merged automatically with newlines during compilation.
*   **Build-time Base64 Encoding & Privacy**: During local builds, `build.js` validates your JSON files, joins the `termsText` array with newlines, and **automatically base64-encodes the HTML**. This creates a secure, robust JSON payload that is 100% resilient to Anki WebView encoding glitches, and has the brilliant benefit of **obfuscating deck disclaimers, references, and author credits for privacy** (keeping them secure from casual lookups in the compiled deck files).
*   **Runtime Decoding**: At runtime on the card, the loader script automatically runs `atob()` to decode the base64 string back into pure HTML before passing it to the visualizer overlay.
*   **Forced Read Countdown**: Specifying `countdown` (seconds) locks the "I AGREE" button, forcing users to wait and read.

---

### 4. Tips for Formatting Your Terms
Since `termsText` is authored as HTML strings (or a JSON array of strings merged at build time), you can embed standard HTML tags:
*   **Styled alerts**: Use `<em style="color: #ff9999;">` to draw attention to disclaimers.
*   **Lists & Structuring**: Use standard `<ul>` and `<li>` to present guidelines.
*   **Logos**: Embed web links (`<img src="...">`) to brand your deck visually.

---

### 5. Configuration Template (`_afx_defaults.json`)

Below is the default configuration template showcasing all available parameters (in strict JSON with the array-of-strings formatting):

```json
{
  "deckTitle": "AnkiFX Example Deck",
  "deckAuthor": "Anonymous Creator",
  "termsText": [
    "<div style=\"text-align:center; margin-bottom: 1rem;\">",
    "    <span style=\"font-size: 3rem;\">🪄</span>",
    "</div>",
    "Welcome to the <strong>AnkiFX</strong> demonstration config. ",
    "This modal is completely optional and can be used for attribution, ",
    "instructions, or just a stylish welcome screen.",
    "<ul style=\"margin-top: 1rem; padding-left: 1.5rem; text-align: left;\">",
    "    <li>All effects are performance-optimized for mobile.</li>",
    "    <li>Music is provided via the Keygen Jukebox.</li>",
    "    <li>Toggle debug: true in configs to reveal debug utilities.</li>",
    "</ul>",
    "<p><strong>Sources:</strong></p>",
    "<ul>",
    "    <li>AnkiFX Core Engine</li>",
    "    <li>Community Effects Registry</li>",
    "</ul>"
  ],
  "marquee": "GREETINGS FROM ANKIFX ... A MODULAR VISUAL ENGINE FOR ANKI ... TRY SWITCHING EFFECTS IN THE BOTTOM RIGHT ... ENJOY THE TRACKER MUSIC ... STAY FOCUSED ... STUDY HARD ...",
  "defaultEffect": "geometry",
  "debug": false,
  "countdown": 30,
  "marqueePosition": "top"
}
```

---

## 🚀 Deployment to Anki (For End Users)

AnkiFX supports both **local media loading** and **remote CDN loading**. We highly recommend using the **Resilient Hybrid Deployment** model. It loads the local engine backup first to ensure offline capability, but overrides it with the remote CDN version if online—always giving priority to the latest remote code updates.

The engine's secure assignment logic protects the global `window.AnkiFX` reference. Even if the local script executes with a delay (due to native iOS/WKWebView custom-protocol file latency on AnkiMobile), the engine detects that a remote version is already active and safely declines to overwrite it.

### Step-by-Step Hybrid Deployment

1. Run `npm run build`.
2. Copy `_ankifx.js` and `_afx_defaults.json` from the `build/` directory to your Anki `collection.media` folder.
3. Paste the following robust loader script into your Anki Card Front Template:

```html
<!-- Hidden container for the custom Note field -->
<div id="afx-config-field" style="display: none !important;">{{AnkiFXConfig}}</div>

<script>
    window.AnkiFX_BOOTSTRAP = window.AnkiFX_BOOTSTRAP || {
        cdn: "https://cdn.jsdelivr.net/gh/robkipa/ankifx@v1/build/_ankifx.js",
        manifest: "https://cdn.jsdelivr.net/gh/robkipa/ankifx@v1/build/_afx_version.json"
    };

    window.AnkiFX_Loader_Logs = window.AnkiFX_Loader_Logs || [];
    window.afxLog = function (msg, level) {
        var prefixed = msg.indexOf("[Card Template]") === 0 ? msg : "[Card Template] " + msg;
        window.AnkiFX_Loader_Logs.push({ msg: prefixed, level: level || 'info' });
    };
    var afxLog = window.afxLog;

    (function () {
        var fieldContainer = document.getElementById("afx-config-field");
        var configText = fieldContainer ? fieldContainer.textContent.trim() : "";
        var parsed = false;

        function decodeConfig(config) {
            if (config && typeof config.termsText === 'string') {
                try {
                    config.termsText = decodeURIComponent(escape(atob(config.termsText)));
                } catch (e) {
                    console.error("[Card Template] Failed to decode termsText base64 string.", e);
                }
            }
            return config;
        }

        if (configText) {
            // Replace non-breaking spaces (\u00a0) with standard spaces to prevent JSON.parse syntax errors from Anki copy-paste
            configText = configText.replace(/\u00a0/g, ' ');
            // Resiliently strip trailing commas from JSON objects/arrays to prevent standard JSON.parse parsing failures
            configText = configText.replace(/,(\s*[\]}])/g, '$1').trim();
            try {
                window.AnkiFX_Config = decodeConfig(JSON.parse(configText));
                parsed = true;
            } catch (e) {
                console.error("[Card Template] Failed to parse embedded AnkiFXConfig JSON. Falling back to _afx_defaults.json. Error:", e);
            }
        }

        if (!parsed) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "_afx_defaults.json", true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200 || xhr.status === 0) {
                        try {
                            window.AnkiFX_Config = decodeConfig(JSON.parse(xhr.responseText));
                        } catch (err) {
                            console.error("[Card Template] Failed to parse fallback _afx_defaults.json.", err);
                            window.AnkiFX_Config = null;
                        }
                    } else {
                        console.error("[Card Template] Failed to load fallback _afx_defaults.json. Status: " + xhr.status);
                        window.AnkiFX_Config = null;
                    }
                }
            };
            xhr.send();
        }
    })();
</script>

<!-- Load the local offline engine backup first (static load is 100% mobile-resilient and CORS-safe) -->
<script src="_ankifx.js" onerror="console.warn('[Card Template] Local engine backup not found in collection.media.')"></script>

<!-- Load the latest remote engine CDN (parsed sequentially, overrides local global if online) -->
<script>
    (function() {
        var isRemoteActive = window.AnkiFX && window.AnkiFX.source === 'remote';
        if (!isRemoteActive && !document.getElementById('ankifx-engine-script')) {
            var script = document.createElement('script');
            script.id = 'ankifx-engine-script';
            script.src = window.AnkiFX_BOOTSTRAP.cdn;
            script.onerror = function() { console.warn('[Card Template] CDN failed to load, using local engine.'); };
            document.head.appendChild(script);
        }
    })();
</script>

<script>
    (function () {
        var remoteScript = document.getElementById('ankifx-engine-script');
        if (remoteScript) {
            if (window.AnkiFX && window.AnkiFX.source === 'remote') {
                window.AnkiFX_Remote_Status = "loaded";
                afxLog("Remote CDN engine script loaded synchronously.", "success");
            } else if (window.AnkiFX_Remote_Status === "loaded" || window.AnkiFX_Remote_Status === "failed") {
                if (window.AnkiFX_Remote_Status === "loaded") {
                    afxLog("Remote CDN engine script already successfully loaded.", "success");
                } else {
                    afxLog("Remote CDN engine script fetch already failed (skipping re-fetch, using local fallback).", "info");
                }
            } else {
                window.AnkiFX_Remote_Status = "pending";
                afxLog("Remote CDN engine script download pending...", "pending");
                remoteScript.addEventListener('load', function () {
                    window.AnkiFX_Remote_Status = "loaded";
                    afxLog("Remote CDN engine script loaded asynchronously.", "success");
                    if (typeof triggerAnkiFX === 'function') triggerAnkiFX();
                });
                remoteScript.addEventListener('error', function () {
                    window.AnkiFX_Remote_Status = "failed";
                    afxLog("Remote CDN engine script failed to load (falling back to local engine).", "warn");
                    if (typeof triggerAnkiFX === 'function') triggerAnkiFX();
                });
            }
        } else if (window.AnkiFX && window.AnkiFX.source === 'remote') {
            window.AnkiFX_Remote_Status = "loaded";
            afxLog("Remote CDN engine script already active in window context.", "success");
        }
    })();
</script>

<script>
    afxLog("Template loaded.", "info");

    // Closure-scoped flags to prevent duplicate execution within the same card's lifecycle
    var contentInitialized = false;
    var ankiFXInitialized = false;

    /**
     * Resilient Polling AnkiFX Loader
     * Periodically polls for ready dependencies to bypass asynchronous WKWebView execution lags.
     */
    function triggerAnkiFX(attempts = 0) {
        window.AnkiFX_Loader_Logs = window.AnkiFX_Loader_Logs || [];
        if (attempts === 0) {
            afxLog("AnkiFX loader triggered.", "info");
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
                    afxLog("Waiting for remote CDN script (Attempt " + attempts + ", status=" + remoteStatus + ")...", "pending");
                }
                setTimeout(() => triggerAnkiFX(attempts + 1), 50);
                return;
            }
            // 1. First initialize AnkiFX if it is loaded
            if (!ankiFXInitialized) {
                try {
                    afxLog("Initializing AnkiFX engine (Source: " + (AnkiFX.source || 'local') + ", Version: " + (AnkiFX.version || '1.0.0') + ")...", "info");
                    ankiFXInitialized = true;
                    AnkiFX.init();
                    afxLog("AnkiFX engine initialized successfully.", "success");
                } catch (e) {
                    afxLog("AnkiFX engine initialization failed: " + e.message, "error");
                    console.error("AnkiFX Start Error:", e);
                }
            }

            // 2. Then run the card's native content/table generator
            if (!contentInitialized) {
                try {
                    afxLog("Executing card rendering logic...", "info");
                    contentInitialized = true;
                    run();
                    afxLog("Card rendered successfully.", "success");
                } catch (e) {
                    afxLog("Card rendering logic failed: " + e.message, "error");
                    console.error("Card Content Run Error:", e);
                }
            }
        } else if (attempts < 60) { // Poll for ~3 seconds
            if (attempts % 10 === 0) {
                afxLog("Polling (Attempt " + attempts + ": AnkiFX=" + hasAnkiFX + ", run=" + hasRun + ", Config=" + hasConfig + ")...", "pending");
            }
            setTimeout(() => triggerAnkiFX(attempts + 1), 50);
        } else {
            const err = "Loader timed out after 3.0s. AnkiFX: " + (hasAnkiFX ? "Loaded" : "FAILED") + ", run(): " + (hasRun ? "Defined" : "UNDEFINED") + ", Config: " + (hasConfig ? "Loaded" : "FAILED");
            afxLog(err, "error");
            console.error(err);
            // Graceful fallback: always execute card content even if loader fails/timeouts
            if (hasRun && !contentInitialized) {
                try {
                    afxLog("Loader timeout fallback: Executing card rendering logic...", "warn");
                    contentInitialized = true;
                    run();
                } catch (runErr) {
                    console.error("AnkiFX Fallback Card Content Run Error:", runErr);
                }
            }
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
<img src="_afx_defaults.json" style="display:none !important;">
```

And your Back templates should include:

```html
<div id="afx-config-field" style="display: none !important;">{{AnkiFXConfig}}</div>
<div class="ankifx-card" style="display:none;"></div>
<img src="_ankifx.js" style="display:none !important;">
<img src="_afx_defaults.json" style="display:none !important;">
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
*   **Mobile Event Blocker**: Overlay controls use delegated tap blocking; effect code must not capture card flips after terms are accepted (see `docs/effect-api.md`).

Refer to [`.cursorrules`](.cursorrules), [`docs/effect-api.md`](docs/effect-api.md), and [`.agents/workflows/effect-authoring.md`](.agents/workflows/effect-authoring.md) for interfaces and authoring checklists.