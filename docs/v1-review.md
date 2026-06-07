# AnkiFX — Pre-v1.0.0 Codebase Review Report (Post-Audit Status: RESOLVED)

This pre-release review of the `dev` branch of AnkiFX (`github.com/robkipa/ankifx`) identifies blockers, improvements, hygiene items, and documentation gaps that were identified and successfully resolved prior to tagging version `v1.0.0`.

---

## Blockers (🔴)

### 1. Hardcoded CDN URL Points to `@dev` Branch
* **Reference**: [ankifx_mcq_front.html:L16](file:///Users/robertkipa/Projects/ankifx/build/card%20templates/ankifx_mcq_front.html#L16) & [ankifx_basic_front.html:L9](file:///Users/robertkipa/Projects/ankifx/build/card%20templates/ankifx_basic_front.html#L9)
* **Problem**: The CDN script URL was hardcoded to target the `@dev` branch on GitHub instead of the stable `@latest` or `@v1` tag.
* **Status**: **RESOLVED** in commit [`03e2b39`](https://github.com/robkipa/ankifx/commit/03e2b39) — The CDN paths have been updated to reference the stable `@v1` release branch on the jsDelivr CDN (`https://cdn.jsdelivr.net/gh/robkipa/ankifx@v1/...`).

### 2. Inconsistent Version Gating/Comparison Logic
* **Reference**: [index.js:L77-L86](file:///Users/robertkipa/Projects/ankifx/src/index.js#L77-L86) vs [ankifx_mcq_front.html:L90-L110](file:///Users/robertkipa/Projects/ankifx/build/card%20templates/ankifx_mcq_front.html#L90-L110)
* **Problem**: The template loader used a robust version comparator that handles pre-releases (`alpha`, `beta`, `rc`), but the runtime bundle's takeover logic in `index.js` (`isNewerVersion`) stripped everything after the hyphen, causing it to incorrectly ignore upgrades from beta/RC versions to stable versions.
* **Status**: **RESOLVED** in commit [`03e2b39`](https://github.com/robkipa/ankifx/commit/03e2b39) — Ported the exact semantic version parsing and comparison logic from the templates into the bundle's `index.js` loader, ensuring parity and 100% correct takeover actions.

---

## Should Fix Before v1 (🟡)

### 1. Layout Thrashing in `aurora.js` and `debug.js` Render Loops
* **Reference**: [aurora.js:L294-L295](file:///Users/robertkipa/Projects/ankifx/src/effects/aurora.js#L294-L295) & [debug.js:L350-L354](file:///Users/robertkipa/Projects/ankifx/src/effects/debug.js#L350-L354)
* **Problem**: Calling `getComputedStyle` inside a 60fps render loop to read `--io-header` forced the browser to perform synchronous layout recalculation, leading to severe layout thrashing and frame drops.
* **Status**: **RESOLVED** in commit [`835ae3a`](https://github.com/robkipa/ankifx/commit/835ae3a) — Extracted all layout metrics reads into `onResize` handlers and cached them in module scope variables.

### 2. UI Thread Freezes during Procedural Texture Generation
* **Reference**: [starfield.js:L130-L167](file:///Users/robertkipa/Projects/ankifx/src/effects/starfield.js#L130-L167)
* **Problem**: Generating a 256x256 procedural planet texture via 65,536 iterations of fractal Brownian motion (fBm) noise on the main thread when a planet resets caused a noticeable freeze (stutter) on mobile devices.
* **Status**: **RESOLVED** in commit [`835ae3a`](https://github.com/robkipa/ankifx/commit/835ae3a) — Optimized planet texture creation algorithms and reduced texture iterations to maintain a stable 60fps.

### 3. ECG Panel DOM Churn via `innerHTML` Writes on Every Frame
* **Reference**: [ecg.js:L278-L281](file:///Users/robertkipa/Projects/ankifx/src/effects/ecg.js#L278-L281)
* **Problem**: The ECG effect wrote to `innerHTML` of the ECG status panel on every single frame, causing unnecessary DOM tree parsing and rendering overhead since the BPM and rhythm values only change once a second or on rhythm transition.
* **Status**: **RESOLVED** in commit [`835ae3a`](https://github.com/robkipa/ankifx/commit/835ae3a) — Cached the last rendered values and only update `innerHTML` when the rhythm or the BPM text actually changes.

### 4. Excessive Canvas State Changes inside Marquee Loop
* **Reference**: [marquee.js:L91-L107](file:///Users/robertkipa/Projects/ankifx/src/effects/marquee.js#L91-L107)
* **Problem**: Setting and resetting `ctx.shadowColor` and `ctx.shadowBlur` inside the loop for every single character caused heavy canvas context state updates.
* **Status**: **RESOLVED** in commit [`835ae3a`](https://github.com/robkipa/ankifx/commit/835ae3a) — Moved the canvas shadow properties assignments outside the character loop, applying state updates only when colors actually differ.

### 5. Missing Package Metadata in `package.json`
* **Reference**: [package.json:L1-L20](file:///Users/robertkipa/Projects/ankifx/package.json#L1-L20)
* **Problem**: `package.json` was missing standard metadata fields like `"license"`, `"repository"`, `"bugs"`, and `"keywords"`.
* **Status**: **RESOLVED** in commit [`03e2b39`](https://github.com/robkipa/ankifx/commit/03e2b39) — Added standard fields (including CC0 license, repository URL, bug tracker, and keywords) to `package.json`.

---

## Nice to Have / Post-v1 Issues (🟢)

### 1. Build Configs Directory is Never Cleaned
* **Reference**: [build.js:L121-L126](file:///Users/robertkipa/Projects/ankifx/build.js#L121-L126)
* **Problem**: `build.js` did not clean `build/configs/` before merging configurations, leaving stale, renamed, or deleted configs lingering in the final build directory.
* **Status**: **RESOLVED** in commit [`70a9970`](https://github.com/robkipa/ankifx/commit/70a9970) — Added automated clean step in `build.js` to clear out `build/configs/` before merging configs.

### 2. Excessive Star Count in Starfield Effect
* **Reference**: [starfield.js:L29](file:///Users/robertkipa/Projects/ankifx/src/effects/starfield.js#L29)
* **Problem**: Drawing 8,000 stars on the main thread via Canvas2D caused heavy rendering workloads and degraded performance on lower-end mobile WebViews.
* **Status**: **RESOLVED** in commit [`835ae3a`](https://github.com/robkipa/ankifx/commit/835ae3a) — Reduced star count limit to a mobile-friendly maximum of 1,000 stars.

### 3. Log Prefix Inconsistency in HTML Templates
* **Reference**: [ankifx_mcq_front.html:L371-L373](file:///Users/robertkipa/Projects/ankifx/build/card%20templates/ankifx_mcq_front.html#L371-L373) & [ankifx_basic_front.html:L370-L372](file:///Users/robertkipa/Projects/ankifx/build/card%20templates/ankifx_basic_front.html#L370-L372)
* **Problem**: The templates specified `afxLog(msg, level)` but did not prepend `"[Card Template] "` as defined in the bracketed subsystem prefix rules in `.cursorrules`.
* **Status**: **RESOLVED** in commit [`03e2b39`](https://github.com/robkipa/ankifx/commit/03e2b39) — Updated the template-level `afxLog` to automatically prefix all logs with `"[Card Template] "`.

---

## Dead Code / Files to Remove

### 1. Stale Config File `_afx_immunology.json` in Build Directory
* **Reference**: [build/configs/_afx_immunology.json](file:///Users/robertkipa/Projects/ankifx/build/configs/_afx_immunology.json)
* **Problem**: This file had no matching source configuration in `configs/` and was a leftover artifact.
* **Status**: **RESOLVED** in commit [`03e2b39`](https://github.com/robkipa/ankifx/commit/03e2b39) — Stale file was deleted, and directory cleaning prevents this from happening in future builds.

---

## Documentation Gaps

### 1. Missing `CHANGELOG.md`
* **Reference**: Root Directory
* **Problem**: No changelog existed to document features, modifications, and bug fixes since initial development.
* **Status**: **RESOLVED** in commit [`a772325`](https://github.com/robkipa/ankifx/commit/a772325) — Created `CHANGELOG.md` listing all features and fixes.

### 2. Missing `CONTRIBUTING.md`
* **Reference**: Root Directory
* **Problem**: No contribution guidelines were defined for commit formats or custom effects.
* **Status**: **RESOLVED** in commit [`690b888`](https://github.com/robkipa/ankifx/commit/690b888) — Created a comprehensive `CONTRIBUTING.md` document detailing setup, workflows, guidelines, and API specs.

---

# Go / No-Go Recommendation

### **Recommendation: GO 🚀**

**Reasoning**: All blockers, should-fixes, dead code, and documentation gap items have been fully resolved. The repository is in a stable state ready for public release.