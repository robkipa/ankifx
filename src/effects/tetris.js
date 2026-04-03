import { Marquee } from './marquee.js';

let animationId = null;
export const effect = {
    id: 'tetris',
    name: 'Tetris',
    run: runTetris,
    stop: stopTetris,
    preferredTrack: { title: "WinTask 3", trackTitle: "Whoopees Tetris" }
};

// ─── Tetromino definitions (each rotation) ────────────────────────────────────
const TETROMINOES = {
    I: {
        shapes: [
            [[1,1,1,1]],
            [[1],[1],[1],[1]]
        ],
        color: '#00f0f0'
    },
    O: {
        shapes: [
            [[1,1],[1,1]]
        ],
        color: '#f0f000'
    },
    T: {
        shapes: [
            [[0,1,0],[1,1,1]],
            [[1,0],[1,1],[1,0]],
            [[1,1,1],[0,1,0]],
            [[0,1],[1,1],[0,1]]
        ],
        color: '#a000f0'
    },
    S: {
        shapes: [
            [[0,1,1],[1,1,0]],
            [[1,0],[1,1],[0,1]]
        ],
        color: '#00f000'
    },
    Z: {
        shapes: [
            [[1,1,0],[0,1,1]],
            [[0,1],[1,1],[1,0]]
        ],
        color: '#f00000'
    },
    J: {
        shapes: [
            [[1,0,0],[1,1,1]],
            [[1,1],[1,0],[1,0]],
            [[1,1,1],[0,0,1]],
            [[0,1],[0,1],[1,1]]
        ],
        color: '#0000f0'
    },
    L: {
        shapes: [
            [[0,0,1],[1,1,1]],
            [[1,0],[1,0],[1,1]],
            [[1,1,1],[1,0,0]],
            [[1,1],[0,1],[0,1]]
        ],
        color: '#f0a000'
    }
};

const PIECE_KEYS = Object.keys(TETROMINOES);

// ─── Particle ─────────────────────────────────────────────────────────────────
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.7) * 14;
        this.gravity = 0.45;
        this.life = 1.0;
        this.decay = 0.012 + Math.random() * 0.018;
        this.size = 1 + Math.random() * 2.5;
    }
    update() {
        this.vx *= 0.985;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
    }
    draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// ─── Tetris game state ────────────────────────────────────────────────────────
class TetrisGame {
    constructor(cols, rows, cellSize) {
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.board = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.particles = [];
        this.exploding = false;
        this.explodeTimer = 0;
        this.EXPLODE_DURATION = 120; // frames before restart

        // Speed & Level state
        this.level = 1;
        this.linesTotal = 0;
        this.dropCounter = 0;
        this.moveCounter = 0;

        this._spawnPiece();
    }

    _randomPiece() {
        const key = PIECE_KEYS[Math.floor(Math.random() * PIECE_KEYS.length)];
        const def = TETROMINOES[key];
        const rotIdx = Math.floor(Math.random() * def.shapes.length);
        return {
            shape: def.shapes[rotIdx],
            color: def.color,
            key,
            rotIdx,
            def
        };
    }

    _spawnPiece() {
        const p = this._randomPiece();
        this.current = {
            ...p,
            x: Math.floor((this.cols - p.shape[0].length) / 2),
            y: 0
        };
    }

    _fits(shape, px, py) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (!shape[r][c]) continue;
                const nx = px + c;
                const ny = py + r;
                if (nx < 0 || nx >= this.cols || ny >= this.rows) return false;
                if (ny >= 0 && this.board[ny][nx] !== null) return false;
            }
        }
        return true;
    }

    _lock() {
        const { shape, x, y, color } = this.current;
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (!shape[r][c]) continue;
                const ny = y + r;
                const nx = x + c;
                if (ny >= 0 && ny < this.rows && nx >= 0 && nx < this.cols) {
                    this.board[ny][nx] = color;
                }
            }
        }
        this._clearRows();
    }

    _clearRows() {
        let rowsCleared = 0;
        for (let r = this.rows - 1; r >= 0; r--) {
            if (this.board[r].every(cell => cell !== null)) {
                this.board.splice(r, 1);
                this.board.unshift(Array(this.cols).fill(null));
                rowsCleared++;
                r++; // check the same row index again as the above row shifted down
            }
        }
        
        if (rowsCleared > 0) {
            this.linesTotal += rowsCleared;
            // Level up every 10 lines
            this.level = Math.floor(this.linesTotal / 10) + 1;
        }

        return rowsCleared;
    }

    // Better AI: pick a placement that balances height, holes, and lines cleared
    _choosePlacement() {
        const { def } = this.current;
        let bestScore = -Infinity;
        let bestX = this.current.x;
        let bestRot = this.current.rotIdx;

        for (let ri = 0; ri < def.shapes.length; ri++) {
            const shape = def.shapes[ri];
            const w = shape[0].length;
            for (let tx = 0; tx <= this.cols - w; tx++) {
                // Drop to lowest valid position
                let ty = 0;
                while (this._fits(shape, tx, ty + 1)) ty++;

                if (!this._fits(shape, tx, ty)) continue;

                // Score based on human-like heuristic
                const score = this._getHeuristicScore(shape, tx, ty);
                if (score > bestScore) {
                    bestScore = score;
                    bestX = tx;
                    bestRot = ri;
                }
            }
        }
        return { x: bestX, rotIdx: bestRot };
    }

    _getHeuristicScore(shape, px, py) {
        // Simulate placing the piece on a temp board
        const sim = this.board.map(r => [...r]);
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[r].length; c++) {
                if (!shape[r][c]) continue;
                const ny = py + r;
                const nx = px + c;
                if (ny >= 0 && ny < this.rows) sim[ny][nx] = 'X';
            }
        }

        // 1) Complete lines
        let lines = 0;
        for (let r = 0; r < this.rows; r++) {
            if (sim[r].every(cell => cell !== null)) lines++;
        }

        // 2) Aggregate Height
        const colHeights = Array(this.cols).fill(0);
        let aggHeight = 0;
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows; r++) {
                if (sim[r][c] !== null) {
                    colHeights[c] = this.rows - r;
                    aggHeight += colHeights[c];
                    break;
                }
            }
        }

        // 3) Holes
        let holes = 0;
        for (let c = 0; c < this.cols; c++) {
            let filling = false;
            for (let r = 0; r < this.rows; r++) {
                if (sim[r][c] !== null) filling = true;
                else if (filling) holes++;
            }
        }

        // 4) Bumpiness
        let bumpiness = 0;
        for (let c = 0; c < this.cols - 1; c++) {
            bumpiness += Math.abs(colHeights[c] - colHeights[c + 1]);
        }

        // Standard weights for a competent Tetris AI (simplified)
        // aggHeight (-0.5), lines (+0.7), holes (-0.35), bumpiness (-0.18)
        return (aggHeight * -0.51) + (lines * 0.76) + (holes * -0.35) + (bumpiness * -0.18) + (Math.random() * 0.1);
    }

    _isBoardFull() {
        // Consider full if the top 3 rows have any filled cell
        for (let r = 0; r < 3; r++) {
            if (this.board[r].some(c => c !== null)) return true;
        }
        return false;
    }

    _explodeBoard(offsetX, offsetY) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c]) {
                    // Spawn several particles per cell
                    const cx = offsetX + c * this.cellSize + this.cellSize / 2;
                    const cy = offsetY + r * this.cellSize + this.cellSize / 2;
                    const count = 4 + Math.floor(Math.random() * 4);
                    for (let i = 0; i < count; i++) {
                        this.particles.push(new Particle(cx, cy, this.board[r][c]));
                    }
                }
            }
        }
    }

    _reset() {
        this.board = Array.from({ length: this.rows }, () => Array(this.cols).fill(null));
        this.exploding = false;
        this.explodeTimer = 0;
        this.particles = [];
        this._spawnPiece();
        this._selectTarget();
    }

    _selectTarget() {
        const { x, rotIdx } = this._choosePlacement();
        const def = this.current.def;
        this.current.rotIdx = rotIdx;
        this.current.shape = def.shapes[rotIdx];
        this.current.targetX = x;
        this.current.y = 0;
        this.current.x = Math.floor((this.cols - this.current.shape[0].length) / 2);
    }

    // Called every frame
    step(offsetX, offsetY) {
        if (this.exploding) {
            this.explodeTimer++;
            this.particles = this.particles.filter(p => p.life > 0);
            this.particles.forEach(p => p.update());
            if (this.explodeTimer >= this.EXPLODE_DURATION) {
                this._reset();
            }
            return;
        }

        if (!this.current.targetX && this.current.targetX !== 0) {
            this._selectTarget();
        }

        // 1) Horizontal Movement & Rotation "Readying"
        // AI moves and rotates pieces quickly (every 2 frames)
        this.moveCounter++;
        if (this.moveCounter >= 2) {
            this.moveCounter = 0;
            if (this.current.x < this.current.targetX) {
                if (this._fits(this.current.shape, this.current.x + 1, this.current.y)) {
                    this.current.x++;
                }
            } else if (this.current.x > this.current.targetX) {
                if (this._fits(this.current.shape, this.current.x - 1, this.current.y)) {
                    this.current.x--;
                }
            }
        }

        // 2) Gravity / Vertical Fall
        // Determine drop speed based on level and AI readiness
        const isAligned = this.current.x === this.current.targetX;
        
        // Base gravity: starts slow (40 frames/step) and speeds up per level
        let gravityThreshold = Math.max(4, 40 - (this.level - 1) * 3);
        
        // Strategic Speed-up: If aligned, drop MUCH faster (like original game "hard drop")
        if (isAligned) {
            gravityThreshold = 1; // Fast fall!
        }

        this.dropCounter++;
        if (this.dropCounter >= gravityThreshold) {
            this.dropCounter = 0;
            
            // Drop one row
            if (this._fits(this.current.shape, this.current.x, this.current.y + 1)) {
                this.current.y++;
            } else {
                // Lock piece
                this._lock();

                if (this._isBoardFull()) {
                    // Trigger explosion
                    this._explodeBoard(offsetX, offsetY);
                    this.exploding = true;
                    this.explodeTimer = 0;
                } else {
                    this._spawnPiece();
                    this._selectTarget();
                }
            }
        }
    }

    draw(ctx, offsetX, offsetY) {
        const cs = this.cellSize;

        // Draw board
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const color = this.board[r][c];
                if (color) {
                    this._drawCell(ctx, offsetX + c * cs, offsetY + r * cs, cs, color,
                        this.exploding ? Math.max(0, 1 - this.explodeTimer / 40) : 1);
                }
            }
        }

        // Draw active piece (not during explosion)
        if (!this.exploding && this.current) {
            const { shape, x, y, color } = this.current;
            for (let r = 0; r < shape.length; r++) {
                for (let c = 0; c < shape[r].length; c++) {
                    if (shape[r][c]) {
                        this._drawCell(ctx, offsetX + (x + c) * cs, offsetY + (y + r) * cs, cs, color, 1);
                    }
                }
            }
        }

        // Draw particles
        ctx.save();
        this.particles.forEach(p => p.draw(ctx));
        ctx.restore();
        ctx.globalAlpha = 1;
    }

    _drawCell(ctx, px, py, cs, color, alpha) {
        ctx.globalAlpha = alpha;
        // Main fill
        ctx.fillStyle = color;
        ctx.fillRect(px + 1, py + 1, cs - 2, cs - 2);

        // Bright top-left highlight
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(px + 1, py + 1, cs - 2, 3);
        ctx.fillRect(px + 1, py + 1, 3, cs - 2);

        // Dark bottom-right shadow
        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.fillRect(px + 1, py + cs - 4, cs - 2, 3);
        ctx.fillRect(px + cs - 4, py + 1, 3, cs - 2);

        ctx.globalAlpha = 1;
    }
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function runTetris(container, marqueeText, position = 'bottom') {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h;
    let game = null;
    let frameCount = 0;

    // Simulation logic is now handled per-frame inside game.step()
    // instead of hopping every N frames globally.

    function buildGame() {
        // Cell size: aim for ~25 columns across the width, min 14px
        const cellSize = Math.max(14, Math.floor(w / 25));
        const cols = Math.floor(w / cellSize);
        const rows = Math.floor(h / cellSize);
        game = new TetrisGame(cols, rows, cellSize);
        game._selectTarget();
    }

    function resize() {
        w = canvas.width = container.clientWidth;
        h = canvas.height = container.clientHeight;
        buildGame();
    }

    window.addEventListener('resize', resize);
    resize();

    const marquee = new Marquee(marqueeText, position, {
        color: '#f0f0f0',
        shadowColor: '#a000f0',
        shadowBlur: 12,
        outline: '#000'
    });

    function render() {
        // Dark semi-transparent background
        ctx.fillStyle = 'rgba(8, 6, 18, 0.92)';
        ctx.fillRect(0, 0, w, h);

        // Subtle grid lines
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 0.5;
        if (game) {
            const cs = game.cellSize;
            const ox = Math.floor((w - game.cols * cs) / 2);
            const oy = Math.floor((h - game.rows * cs) / 2);

            for (let c = 0; c <= game.cols; c++) {
                ctx.beginPath();
                ctx.moveTo(ox + c * cs, oy);
                ctx.lineTo(ox + c * cs, oy + game.rows * cs);
                ctx.stroke();
            }
            for (let r = 0; r <= game.rows; r++) {
                ctx.beginPath();
                ctx.moveTo(ox, oy + r * cs);
                ctx.lineTo(ox + game.cols * cs, oy + r * cs);
                ctx.stroke();
            }

            // Step the simulation every frame
            // Internal counters in game.step() handle the speed
            game.step(ox, oy);

            game.draw(ctx, ox, oy);
        }

        marquee.render(ctx, w, h);

        animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);
    return marquee;
}

export function stopTetris() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
