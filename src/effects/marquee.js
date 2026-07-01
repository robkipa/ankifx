export class Marquee {
    constructor(text = '', position = 'bottom', options = {}) {
        this._text = text;
        this.position = position;
        this.applyStyles(options);

        // State
        this.time = 0;
        this.textX = 0;
        this.initialized = false;

        // Base dimensions for scaling
        this.baseCharWidth = 15;
        this.baseFontSize = 24;
        this.baseVelocity = 2.8;
        this.baseBounce = 12;
        this.fontFamily = '"Courier New", monospace';
        this.fontWeight = 'bold';
        this._enabled = true;

        /** @type {Function|null} Called when enabled or text changes */
        this.onChange = null;
    }

    get enabled() { return this._enabled; }
    set enabled(v) {
        const changed = this._enabled !== v;
        this._enabled = v;
        if (changed && typeof this.onChange === 'function') this.onChange();
    }

    get text() { return this._text; }
    set text(v) {
        const changed = this._text !== v;
        this._text = v;
        if (changed && typeof this.onChange === 'function') this.onChange();
    }

    applyStyles(options = {}) {
        this.color = options.color || '#FFF';
        this.outline = options.outline || null;
        this.shadowColor = options.shadowColor || null;
        this.shadowBlur = options.shadowBlur || 0;
        this.colorFn = options.colorFn || null;
    }

    updateStyles(options = {}) {
        this.applyStyles(options);
    }

    setText(text) {
        this.text = text;
    }

    setPosition(position) {
        this.position = position;
    }

    render(ctx, w, h) {
        if (!this.enabled) return;

        if (!this.initialized) {
            this.textX = w;
            this.initialized = true;
        }

        // Determine scale factor based on container width
        const scale = w < 480 ? 0.65 : (w < 768 ? 0.8 : 1.0);
        
        const currentFontSize = Math.max(12, Math.floor(this.baseFontSize * scale));
        const currentBounce = this.baseBounce * scale;
        const currentCharWidth = this.baseCharWidth * scale;
        const currentVelocity = this.baseVelocity * scale;

        this.time += 0.012;

        if (!this.text) return; // Defensive check
        const totalTextWidth = this.text.length * currentCharWidth;
        this.textX -= currentVelocity;
        
        if (this.textX < -(totalTextWidth + (w * 1.1))) {
            this.textX = w;
        }

        ctx.font = `${this.fontWeight} ${currentFontSize}px ${this.fontFamily}`;
        ctx.lineJoin = 'round';
        
        if (this.outline) {
            ctx.lineWidth = 4;
            ctx.strokeStyle = this.outline;
        }

        const hasStaticShadow = this.shadowColor && this.shadowColor !== 'inherit';
        if (hasStaticShadow) {
            ctx.shadowColor = this.shadowColor;
            ctx.shadowBlur = this.shadowBlur;
        } else if (!this.shadowColor) {
            ctx.shadowBlur = 0;
        }

        const paddingTop = 50 * scale;
        const paddingBottom = 32 * scale;
        const yBase = (this.position === 'bottom') ? (h - paddingBottom) : paddingTop;

        for (let i = 0; i < this.text.length; i++) {
            const char = this.text[i];
            const xPos = this.textX + (i * currentCharWidth);

            // Optimization: only render visible chars
            if (xPos > -40 && xPos < w + 40) {
                // Unified bounce logic
                const yPos = yBase + Math.sin(this.time * 4 + i * 0.1) * currentBounce;

                ctx.fillStyle = this.colorFn ? this.colorFn(this.time, i) : this.color;
                
                if (this.shadowColor === 'inherit') {
                    ctx.shadowColor = ctx.fillStyle;
                    ctx.shadowBlur = this.shadowBlur;
                }

                if (this.outline) {
                    ctx.strokeText(char, xPos, yPos);
                }

                ctx.fillText(char, xPos, yPos);
                
                if (this.shadowColor === 'inherit') {
                    ctx.shadowBlur = 0;
                }
            }
        }

        // Clean up context shadow state if we applied static shadow
        if (hasStaticShadow) {
            ctx.shadowBlur = 0;
        }
    }
}
