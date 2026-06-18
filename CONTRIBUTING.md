# Contributing to AnkiFX 🪄

Thank you for your interest in contributing to AnkiFX! This guide outlines the workflow, coding standards, and architectural contracts required to maintain the quality and performance of this visual engine.

---

## 1. Development Setup

To get started with local development:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/robkipa/ankifx.git
   cd ankifx
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start the Compiler**:
   ```bash
   npm run watch
   ```
   *This launches an `esbuild` watcher that compiles JavaScript and CSS changes dynamically into the `build/` directory.*
4. **Run the Test Suite**:
   ```bash
   npm test
   ```
5. **Local Anki Sync (Optional)**:
   Create a git-ignored `ankifx.local.json` file in the root to auto-copy compiled builds to your local Anki profile on save:
   ```json
   {
     "ankiMediaDir": "/path/to/Anki2/User/collection.media"
   }
   ```
   Then run `npm run watch:local`.

---

## 2. Git & Branching Workflow

We follow a strict local branching and version matching strategy:

- **Branching**: Always create a feature branch (`feat/[name]`) or bugfix branch (`fix/[name]`) from the latest `main` branch. Never commit directly to `main`.
- **Conventional Commits**: Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
  - `feat: ...` for new features or visual effects.
  - `fix: ...` for bug fixes.
  - `chore: ...` for build system or dependency updates.
  - `refactor: ...` for cleanups that do not change external behavior.
  - `docs: ...` for documentation changes.
- **Canonical Build Pipeline**: The repository uses a `.git/hooks/post-commit` script to compile and commit tracked build outputs atomically (`build/_ankifx.js`, default configs, card templates). Let the hook manage these compiled files — never stage custom edits to files inside `build/` manually.

---

## 3. Coding Standards & Guidelines

### Styling & CSS Boundaries
- Do **not** inline CSS styles in `engine.js` or directly inside the card HTML templates.
- Define all styles, frames, custom modals, and overrides inside [**`src/core/afx_styles.css`**](file:///Users/robertkipa/Projects/ankifx/src/core/afx_styles.css). This file is bundled as a text string during compile.

### WebGL Shader Safety (Critical)
To prevent GPU shader compiler leaks and memory crashes in iOS WebKit / AnkiMobile WebViews:
1. **Immediate Detach & Delete**: Vertex and fragment shaders must be detached (`gl.detachShader(program, shader)`) and deleted (`gl.deleteShader(shader)`) *immediately* after the program compiles and links successfully (`gl.linkProgram`).
2. **Release Resources on Stop**: In your effect's `stop()` hook, always delete all WebGL programs, buffers, and textures to return the shared WebGL context to a clean state.

### Security & HTML Escaping
- Never inject dynamic or user-controlled strings directly into the DOM using `innerHTML` or string interpolation without escaping.
- Use the standard `escapeHTML(str)` helper to sanitize text for DOM insertion to prevent Cross-Site Scripting (XSS) issues in cards.

### Logging Subsystems
All console logs must include a bracketed subsystem prefix so they are filterable in the diagnostic panel. Use the following prefixes:
- Core engine: `[AnkiFX]`
- WebGL utils (shared): `[AnkiFX/WebGL]`
- Jukebox: `[Jukebox]`
- Lava Lamp: `[LavaLamp/WebGL]`
- Stripe Gradient: `[Gradient/WebGL]`
- Custom templates: `[Card Template]`
- Version loader: `[Loader]`

---

## 4. How to Write a Custom Visual Effect

1. **Create the File**: Add your file under `src/effects/` (e.g. `src/effects/my_effect.js`).
2. **Export the Contract**: Your module must export an `effect` object with the following interface:
   ```javascript
   export const effect = {
       id: 'my_effect',           // Unique ID matching the filename
       name: 'MY COOL EFFECT',    // User-facing display name in the UI dock
       preferredTrack: 'song.mod',// Optional: jukebox track file name to play
       
       run(contexts, config) {
           // Initialization. Use shared contexts:
           // contexts.gl (WebGL), contexts.ctx2d (Canvas2D)
           // contexts.width, contexts.height (Scaled viewport size)
       },
       
       stop() {
           // Shutdown. Cancel animation frames, detach events, free GPU resources.
       },
       
       onResize(w, h, dpr) {
           // Optional: Adjust sizes upon device rotation or resize.
       },
       
       // Declarative controls (Engine auto-generates UI buttons/toggles/sliders)
       controls: [
           {
               type: "slider",
               id: "speed",
               label: "SPEED",
               min: 0.1,
               max: 5.0,
               value: 1.0,
               onChange: (val) => { /* Update effect variables */ }
           }
       ]
   };
   ```
3. **Compile**: Run `npm run build`. The registry builder will automatically scan the folder, add your effect to `src/effects/registry.js`, and bundle it into `build/_ankifx.js` so it's instantly available inside the card picker.
