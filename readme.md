# AnkiFX 🪄

**A modular, highly-performant visual rendering and audio engine for Anki flashcards.**

## 📖 Project Overview

AnkiFX solves a core problem with Anki template design: separating dynamic UI/canvas effects from the raw flashcard data. Because Anki uses a single, global `collection.media` folder and isolates Deck Descriptions from Card Templates, updating visual themes or disclaimer text for different medical classes used to require manually editing HTML/CSS across multiple Anki templates.

AnkiFX abstracts the visual layer into a standalone JavaScript engine. Anki templates remain nearly empty, merely loading a deck-specific **Configuration Payload** and the global **AnkiFX Engine**.

### Core Features
* **Zero-Template Clutter:** CSS and DOM elements are injected dynamically by the engine.
* **Canvas Visualizers:** Seven background effects switchable in real-time: *Geometry*, *Starfield*, *Plasma*, *Matrix*, *Mandelbrot*, *Julia Set*, and *Tetris*. The user's preferred effect is persisted to `localStorage`.
* **Keygen Jukebox:** Pure JavaScript tracker music player powered by [`funkymed-flod-module-player`](https://www.npmjs.com/package/funkymed-flod-module-player). Streams `.xm`, `.mod`, `.s3m`, and `.it` files from the [`michioxd/keygen-music`](https://github.com/michioxd/keygen-music) GitHub repository. No Wasm, no bundled audio assets.
  * Configs can specify a `trackTitle` to attempt to play a specific track on start; if not found, a random one is selected.
  * Gracefully fails offline: marquee updates to `NO INTERNET OR BLOCKED ... TRY AGAIN?` without breaking the rest of the UI.
  * Back (`⏮️`) and Skip (`⏭️`) playback controls appear when BGM is active. On mobile they float in the marquee zone; on desktop/iPad they sit in the bottom control row.
  * 50-track history stack with cursor-based back/forward traversal (like a browser's history).
  * Async race conditions on rapid skip are eliminated via a generation counter (`_opId`).
* **Glassmorphism UI:** Built-in "Terms of Service" consent overlay with a countdown timer and blur-backdrop effects.
* **Mobile-First:** Fully wired for AnkiMobile (iOS WKWebView) and AnkiDroid, including:
  * `e.stopPropagation()` shielding on all interactive elements to prevent accidental card flips.
  * iOS Web Audio API unlock pattern (synchronous `AudioContext` creation + `resume()` inside the user-triggered event).
  * Note: iOS physical **ringer switch** must be unmuted for Web Audio API output (this is an Apple hardware constraint, not a bug).

---

## 🏗️ Architecture

The project is split into three main components:

1. **The Engine (`src/`)**: The agnostic JavaScript core. It reads configs, builds the UI, injects CSS, and runs the canvas animations and Jukebox.
2. **The Configs (`configs/`)**: Deck-specific payloads (e.g., `_afx_pathomorphology.js`). These define the course name, terms text, sources, marquee text, default effect, and optional `trackTitle` for the Jukebox.
3. **The Templates (`templates/`)**: The tiny HTML/CSS snippets actually pasted into the Anki app.

### Directory Structure
```text
ankifx/
 ├─ src/
 │   ├─ core/
 │   │   ├─ engine.js             # Core AnkiFX class, DOM/CSS injection, mobile logic
 │   │   └─ jukebox.js            # Keygen Jukebox: fetch, decode, play, history traversal
 │   ├─ effects/
 │   │   ├─ geometry.js           # Demoscene geometry + scrolling marquee
 │   │   ├─ starfield.js          # Starfield parallax
 │   │   ├─ plasma.js             # Plasma wave canvas
 │   │   ├─ matrix.js             # Matrix rain
 │   │   ├─ mandelbrot.js         # Mandelbrot fractal (progressive render)
 │   │   ├─ julia.js              # Julia set fractal (animated)
 │   │   └─ marquee.js            # Shared reusable Marquee class (used by all effects)
 │   └─ index.js                  # Entry point, bundles to window.AnkiFX
 ├─ configs/
 │   ├─ _afx_pathomorphology.js   # Config payload for Pathomorphology
 │   └─ _afx_pathophysiology.js   # Config payload for Pathophysiology
 │   └─ _afx_[subject].js         # Add new configs here — build.js picks them up automatically
 ├─ build/                        # Auto-generated. The "Anki Simulator" folder.
 │   ├─ _ankifx.js                # The compiled, minified engine
 │   ├─ _afx_pathomorphology.js   # Copied from configs/ by build.js
 │   ├─ _afx_pathophysiology.js   # Copied from configs/ by build.js
 │   └─ templates/
 │       ├─ card_front.html       # HTML for a custom Anki card type (AllInOne kprim mc/sc based)
 │       ├─ card_styling.css      # Minimal CSS for the card type
 │       └─ deck_description.html # HTML for the Anki deck description
 ├─ package.json
 └─ build.js                      # esbuild script + auto-config sync plugin
```

---

## 🛠️ Local Development & Build System

Because Chrome strictly blocks CORS for `file:///` URLs, we cannot test the engine by double-clicking an HTML file. We must use a local web server (e.g., VS Code Live Server).

Furthermore, real Anki dumps all files into a flat `collection.media` folder. To replicate this locally without making a mess of the source code, we use a custom `esbuild` script.

### Running the Dev Environment
1. Run `npm install` (requires Node.js).
2. Run `npm run watch` for hot-reload, or `npm run build` for a one-off build.

### What `build.js` does automatically:
1. Bundles `src/` into a minified `build/_ankifx.js`.
2. **Auto-discovers** every `configs/_afx_*.js` file and copies all of them into `build/`. No manual registration needed — just drop a new config in `configs/` and rebuild.
3. *Result:* Open `build/deck_description.html` or `build/card_front.html` via Live Server (`http://127.0.0.1:5500`) and test hot-reloaded changes exactly as they will behave in Anki.

### 📜 Local Version Tracking
This project uses Git for local version control. 
- Branches follow the `feat/[branch-name]` or `fix/[branch-name]` pattern.
- The `main` branch represents the stable version.
- See `.agents/workflows/git-feature-workflow.md` for the automated AI workflow details.

### Adding a New Course Config
1. Create `configs/_afx_[subject].js` (copy an existing one as a template).
2. Set the required fields:
   ```js
   window.AnkiFX_Config = {
       courseName: "...",
       termsText: `...`,
       sources: ["..."],
       marquee: "...",
       defaultEffect: "geometry",   // geometry | starfield | plasma | matrix | mandelbrot | julia
       trackTitle: "..."            // Optional: match a title in michioxd/keygen-music index.json
   };
   ```
3. Run `npm run build`. The new config is automatically copied to `build/`.
4. In Anki, load the config before the engine in your card template (see Templates section).

---

## 🤖 Rules for LLMs and AI Assistants (READ CAREFULLY)

If you are an AI generating code for this project, you **must** adhere to the following constraints:

1. **Do NOT put CSS in the Anki Templates:** All AnkiFX styling must be injected via `document.createElement('style')` inside `src/core/engine.js`. Anki HTML templates should remain minimal, handling only native Anki field logic.
2. **Respect Mobile Event Bubbling:** AnkiMobile and AnkiDroid use a global tap listener to flip the card. Any injected UI elements **must** call `e.stopPropagation()` on both `click` and `touchstart` events. Forgetting this will cause the UI to prematurely reveal the flashcard answer.
3. **No `<audio>` tags or local audio files:** All background music is handled exclusively by the `Jukebox` class in `src/core/jukebox.js`. Do not add `audioSrc` fields to configs or re-introduce `<audio>` elements.
4. **iOS Web Audio unlock pattern:** The `AudioContext` must be created and `.resume()`-d synchronously inside a user-triggered event handler *before* any `await` calls. Failing to do this will silently block audio on iPhones.
5. **Anki Flat Directory Constraint:** When writing paths for Anki deployment, assume all files (`_ankifx.js`, configs) live in the exact same directory (`collection.media`).
6. **Config Independence:** The engine (`_ankifx.js`) must never contain hardcoded course names, professor names, or terms. It must always read from the globally attached `window.AnkiFX_Config` object.
7. **Async race protection:** Any method in `Jukebox` that performs `await` operations must use the `_opId` generation counter pattern to guard against stale async chains from rapid user interactions.
8. **Git Branching Workflow:** Before starting any new feature or fix, always create a new feature branch (e.g., `feat/marquee-fixes`). Never work directly on `main`. Merge back to `main` only after the task is verified.

---

## 🚀 Deployment to Anki

When development is complete and you are ready to update the live flashcards:
1. Run `npm run build`.
2. Open the `build/` folder.
3. Drag `_ankifx.js` and your desired `_afx_[subject].js` config(s) into your Anki `collection.media` folder.
4. Paste the code from `templates/card_front.html` and `templates/deck_description.html` into their respective places in the Anki app.
5. The card template must load the config **before** the engine:
   ```html
   <script src="_afx_pathomorphology.js"></script>
   <script src="_ankifx.js"></script>
   ```