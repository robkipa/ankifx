# AnkiFX effect API

## Required export

Each file in `src/effects/*.js` (not `marquee.js`, not `registry.js`, not `lib/`) must export:

```javascript
export const effect = {
  id: 'my_effect',       // must match filename (without .js)
  name: 'Human Name',
  run(contexts, config) { ... },
  stop() { ... },
};
```

Build validates `id`, `run`, and `stop` at compile time.

## Optional fields

| Field | Purpose |
|--------|---------|
| `preferredTrack` | string or `{ title, trackTitle, artist? }` for jukebox |
| `onResize(w, h, dpr)` | Called when viewport size changes |
| `drawOverlay(ctx, w, h, timestamp)` | Draw on marquee canvas (e.g. aurora stars) |
| `marqueeFont` | object or `{ colorFn(time, charIdx) }` for marquee styling |
| `controls` | declarative dock controls (see below) |
| `presets` | used by Julia UI |

## `contexts` object (passed to `run`)

| Key | Type | Notes |
|-----|------|--------|
| `gl` | WebGLRenderingContext | Shared context from engine |
| `ctx2d` | CanvasRenderingContext2D | Shared 2D context |
| `canvasGL` | HTMLCanvasElement | Same element as `sharedGL` |
| `canvas2D` | HTMLCanvasElement | Same element as `shared2D` |
| `width` | number | CSS pixels |
| `height` | number | CSS pixels |
| `dpr` | number | Effect-specific cap (fractals may differ) |
| `topInset` | number | `--io-header` px |
| `visibleHeight` | number | `height - topInset` |
| `visibleBounds` | `{ top, bottom }` | Safe drawing region |

**Gradient only:** keep using `contexts.canvasGL` + `contexts.gl` as today — do not create a new canvas.

## Declarative `controls`

Types: `toggle`, `slider`, `button`, `select`.

Sync programmatic values without re-triggering handlers:

```javascript
AnkiFX.setControlValue('my_slider', 15.5);
```

## Mobile taps

- Overlay UI: engine delegates `stopPropagation` on interactive targets.
- Effect-level `window` listeners (drag, etc.): use `{ passive: true }` where possible; avoid capturing taps over the card Q/A area.

## Registry

Never edit `src/effects/registry.js`. Run `npm run build` or `npm run watch`. Note that subdirectories under `src/effects/` (such as `src/effects/lib/`) are automatically ignored by the build script compiler and excluded from the effects registry.

## WebGL Shader Resource Safety

To prevent severe GPU shader compiler resource and memory leaks in WebKit WebViews (such as AnkiMobile on iOS):

1. **Detach and Delete Shaders**: Immediately after compiling shaders and successfully linking the shader program with `gl.linkProgram(program)`, you must detach and delete both the vertex and fragment shaders:
   ```javascript
   gl.attachShader(program, vs);
   gl.attachShader(program, fs);
   gl.linkProgram(program);

   if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
       // Detach and delete immediately after successful linking
       gl.detachShader(program, vs);
       gl.detachShader(program, fs);
       gl.deleteShader(vs);
       gl.deleteShader(fs);
   }
   ```
2. **Release Resources on Stop**: In the `stop()` method, delete all created WebGL programs, textures, and buffers:
   ```javascript
   stop() {
       if (this.program) {
           gl.deleteProgram(this.program);
           this.program = null;
       }
       // Delete other WebGL resources (buffers, textures, etc.)
   }
   ```
