# Changelog

All notable changes to the AnkiFX project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2] - 2026-06-22

### Added
- **Tappable-First Architecture**: Replaced the manual event propagation intercept architecture with a declarative `.tappable` routing system, making overlays, notices, audio controls, consents, and debug panel natively prevent card-flips on AnkiMobile.
- **Desktop & AnkiWeb Compatibility**: Introduced a centralized document-level click listener that intercepts interactive targets (native buttons, inputs, links, and `.tappable` controls) and stops propagation only for non-mobile platforms.
- **Robust Integration Test Suite**: Added a comprehensive DOM integration suite in `tests/tappable.test.js` to simulate and assert click propagation, `.tappable` container-level tap routing, and frame scheduling.

### Changed
- **Removed stopPropagation Blocks**: Safely removed 16 manual `e.stopPropagation()` and `e.stopImmediatePropagation()` calls across core controllers (consent, audio-controls, visualizers, debug panel, legacy notifications, and MCQ templates) to restore natural event bubbling.

## [1.0.1] - 2026-06-18

This is the initial release of AnkiFX, a visual and interactive engine for Anki cards. It introduces responsive WebGL/Canvas2D background effects, interactive card styling, and retro audio support without impacting native Anki scheduling.

### Basic Features
- **Interactive Card Templates**: Standardized layouts for Single Choice, Multiple Choice, and Kprim question types with user-interactive options, option shuffling, and automatic grading.
- **Dynamic Background Visualizer**: A multi-layered, high-performance rendering pipeline with 14 visualizer effects (such as Quantum, Aurora, Mandelbrot, Julia Set, and Tetris).
- **Retro Keygen Jukebox**: Built-in audio tracker player using Web Audio for playing retro keygen chiptunes with built-in playback controls.
- **Progressive Hybrid Loader**: A fallback-safe loader that renders card content immediately to avoid visual lag, then asynchronously initializes/updates the visualizer and media scripts.
- **Automatic Lifecycle Management**: Mutation observers that automatically clean up active rendering loops, audio contexts, and event listeners when switching between cards.

### Added
- **Quantum Engine**: Unified multi-mode quantum visualizer engine with toroidal field projection, radial standing-wave quantization, harmonic symmetry transitions, and adaptive flow dynamics.
- **Session-Storage State Persistence**: Complete rewrite of card templates to use native `sessionStorage` for selection state persistence across card flips, replacing the deprecated `anki-persistence` library.
- **Legacy Template Migration Toast**: Automatic detection of legacy templates (missing `ankifx-template-meta`) at idle time, triggering a non-blocking migration toast that links to the migration guide.
- **Dynamic Hints**: Interactive card templates show instructions customized to the specific question type (Kprim, Multiple Choice, Single Choice).
- **Planet Toggle in Starfield**: Interactive control to toggle the visibility of planets in the Starfield background effect.
- **Jukebox & Audio Controls**: Standardized Keygen Jukebox audio engine with automatic transitions, track queuing, and unified volume/mute handlers.
- **Persistent Diagnostics Logging**: Debug logs, loader logs, and evaluation history are persisted across page reloads via `sessionStorage` for easier troubleshooting.
- **Responsive Top Dock**: Scoped and clean layout handler that repositions native flags/marks dynamically into the control group, avoiding global viewport layout breaking.

### Changed
- **Kprim Button Labels**: Yes / No option labels updated to **True** / **False** to align with academic and standard Kprim testing guidelines.
- **MCQ Back Default Grading Mode**: Changed default `GRADING_COLOR_MODE` from `'all'` to `'diff'` to reduce visual clutter by only highlighting incorrect selections and missed correct answers.
- **Visual Styles & Glassmorphism**: Updated option containers to use frosted glass panels with `backdrop-filter: blur(12px)` and text shadows for maximum readability against active WebGL backgrounds.
- **Mobile-Ready DPR Limits**: Device Pixel Ratio is capped at 1.5× for WebGL and 2.0× for Canvas2D to guarantee 60 FPS rendering on mobile WebView hardware.

### Fixed
- **WebGL GPU Shader Memory Leaks**: Prevented WebGL memory leaks by explicitly detaching and deleting compiled fragment and vertex shaders after program linking.
- **Notice Banner DOM XSS**: Escaped template update notice HTML using an entity escape utility before injecting it into the DOM.
- **Jukebox Interval & Stream Leaks**: Ensured `jukebox.stop()` is called during engine re-initialization to prevent orphan intervals and overlapping audio playback.
- **AnkiDroid Scroll Lock & Coordinate Rounding**: Fixed scrolling issues and rounded canvas/mouse coordinates in the debug effect to prevent sub-pixel layout shifting.
- **Card Loader Flash**: Redesigned template loader around progressive enhancement and immediate content rendering, eliminating the black-screen flash.
- **Redundant Script Injections**: Blocked duplicate engine script execution when a remote CDN instance is already active.
- **Null Reference Guards**: Wrapped early execution engine hooks to safely guard `getComputedStyle(document.documentElement)` calls when the DOM is not yet fully parsed.

## [1.0.0-beta] - 2026-06-07

### Added
- **Unified Canvas Architecture**: Introduces persistent HDPi-compliant WebGL and Canvas2D rendering layers, enabling smooth transition between visual effects without context loss.
- **Dynamic Effect Registry**: Automated compiler system that auto-discovers and registers background visualizers at build time.
- **Auto-Calibrating Viewport Monitoring**: Dynamic offset sizing to guarantee pixel-perfect edge-to-edge backgrounds behind AnkiMobile's status bars (`--io-header` integration).
- **Thirteen Visualizer Effects**: Highly optimized, mobile-ready effects (Aurora, ECG with Arrhythmia modes, Doom Fire, 3D Geometry, Julia Set, Mandelbrot, Matrix, None, Stripe Gradient, Lavalamp WebGL, Starfield, Tetris, and Viewport Diagnostics).
- **Keygen Jukebox**: Pure JS Amiga/retro tracker music engine (`funkymed-flod-module-player`) featuring 50-track navigation history, preferred-track associations, and automatic completion transitions.
- **Attribution & Consent Overlay**: Standardized base64-encoded disclaimer overlays featuring a lock-out read timer.
- **Automatic Lifecycle Cleanup**: Observes DOM mutations and calls `destroy()` to release audio contexts and animation loops when navigating away from AnkiFX cards.
- **Template Update Checks**: Decentralized Meta Layer versioning manifest queries to alert users when a newer HTML template version is available.
- **GitHub Actions Integration**: Automated tag-driven release workflow containing build diff verification and release asset packaging.

### Fixed
- **DOM XSS Vulnerability**: Patched unsanitized manifest rendering in the update banner using a lightweight entity escape system.
- **Memory & Resource Leaks**: Resolved overlapping animation frame rendering loops on repeated initialization, event listeners remaining bound to window objects, and unreleased WebGL shader compile leaks.
- **Jukebox Intercepts & Overlaps**: Stopped completion intervals and audio streams prior to re-instantiating the audio context on card transitions.
- **Notice Banner Persistency**: Restored update notices and legacy template toast visibility during session restorations.
- **Build Output Contamination**: Implemented automatic cleanup of the `build/configs/` directory to wipe out stale override files.
- **Documentation Mismatch**: Aligned installation logs and CDN script URLs to target the stable `@v1` branch.


