# Changelog

All notable changes to the AnkiFX project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-07

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
