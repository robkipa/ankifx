export class Marquee {
    constructor(text = '', position = 'bottom', options = {}) {
        this.text = text;
        this.position = position;
        
        // Unified style options
        this.color = options.color || '#FFF';
        this.outline = options.outline || null;
        this.shadowColor = options.shadowColor || null;
        this.shadowBlur = options.shadowBlur || 0;
        this.colorFn = options.colorFn || null; // dynamic color: (time, i) => string

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
        this.enabled = true;
    }

    setText(text) {
        this.text = text;
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
                
                if (this.shadowColor) {
                    // allows dynamic coloring
                    ctx.shadowColor = this.shadowColor === 'inherit' ? ctx.fillStyle : this.shadowColor;
                    ctx.shadowBlur = this.shadowBlur;
                } else {
                    ctx.shadowBlur = 0;
                }

                if (this.outline) {
                    ctx.strokeText(char, xPos, yPos);
                }

                ctx.fillText(char, xPos, yPos);
                
                if (this.shadowColor) {
                    ctx.shadowBlur = 0;
                }
            }
        }
    }
}
