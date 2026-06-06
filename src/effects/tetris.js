let animationId = null;
let currentW, currentH;
let topInset = 0;
let visibleH = 0;
let game = null;

const margin = 0;

function buildGame() {
    if (currentW === undefined || currentH === undefined) return;
    const safeVisibleH = Math.max(100, visibleH);
    // Cell size: aim for ~25 columns across the width, min 14px
    const cellSize = Math.max(14, Math.floor(currentW / 25));
    const cols = Math.floor(currentW / cellSize);
    const rows = Math.floor(safeVisibleH / cellSize);
    game = new TetrisGame(cols, rows, cellSize);
}

export const effect = {
    id: 'tetris',
    name: 'Tetris',
    run: runTetris,
    stop: stopTetris,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
        const docEl = document.documentElement;
        const style = docEl ? getComputedStyle(docEl) : null;
        topInset = style ? (parseInt(style.getPropertyValue('--io-header')) || 0) : 0;
        visibleH = h - topInset;
        buildGame();
    },
    preferredTrack: { title: "WinTask 3", trackTitle: "Whoopees Tetris" },
    marqueeFont: {
        color: '#f0f0f0',
        shadowColor: '#a000f0',
        shadowBlur: 12,
        outline: '#000'
    }
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
        // Compute AI destination target strictly once upon spawning to offload frame-rendering updates!
        this._selectTarget();
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

    // AI: pick a placement that balances height, holes, and lines cleared
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

                // Score based on heuristic
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

        return (aggHeight * -0.51) + (lines * 0.76) + (holes * -0.35) + (bumpiness * -0.18) + (Math.random() * 0.1);
    }

    _isBoardFull() {
        for (let r = 0; r < 3; r++) {
            if (this.board[r].some(c => c !== null)) return true;
        }
        return false;
    }

    _explodeBoard(offsetX, offsetY) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c]) {
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

        // 1) Horizontal Movement
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
        const isAligned = this.current.x === this.current.targetX;
        let gravityThreshold = Math.max(4, 40 - (this.level - 1) * 3);
        if (isAligned) {
            gravityThreshold = 1; // Fast fall!
        }

        this.dropCounter++;
        if (this.dropCounter >= gravityThreshold) {
            this.dropCounter = 0;
            
            if (this._fits(this.current.shape, this.current.x, this.current.y + 1)) {
                this.current.y++;
            } else {
                this._lock();

                if (this._isBoardFull()) {
                    this._explodeBoard(offsetX, offsetY);
                    this.exploding = true;
                    this.explodeTimer = 0;
                } else {
                    this._spawnPiece();
                }
            }
        }
    }

    // Aggressively optimized batched drawing: Fills are batched by color, and 3D highlights/shadows are batched into exactly 2 path operations!
    draw(ctx, offsetX, offsetY) {
        const cs = this.cellSize;
        const cellsByColor = {};
        
        // 1. Collect all filled board cells
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const color = this.board[r][c];
                if (color) {
                    if (!cellsByColor[color]) cellsByColor[color] = [];
                    cellsByColor[color].push({
                        px: offsetX + c * cs,
                        py: offsetY + r * cs,
                        alpha: this.exploding ? Math.max(0, 1 - this.explodeTimer / 40) : 1
                    });
                }
            }
        }

        // 2. Collect active piece cells (if not exploding)
        if (!this.exploding && this.current) {
            const { shape, x, y, color } = this.current;
            if (color) {
                if (!cellsByColor[color]) cellsByColor[color] = [];
                for (let r = 0; r < shape.length; r++) {
                    for (let c = 0; c < shape[r].length; c++) {
                        if (shape[r][c]) {
                            cellsByColor[color].push({
                                px: offsetX + (x + c) * cs,
                                py: offsetY + (y + r) * cs,
                                alpha: 1
                            });
                        }
                    }
                }
            }
        }

        // 3. Batch draw block fills (set fillStyle once per color)
        for (const color in cellsByColor) {
            const cells = cellsByColor[color];
            ctx.fillStyle = color;
            cells.forEach(cell => {
                ctx.globalAlpha = cell.alpha;
                ctx.fillRect(cell.px + 1, cell.py + 1, cs - 2, cs - 2);
            });
        }
        ctx.globalAlpha = 1;

        // 4. Batch draw all highlights (white bevels) in exactly ONE unified path operation!
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (const color in cellsByColor) {
            cellsByColor[color].forEach(cell => {
                ctx.globalAlpha = cell.alpha;
                const px = cell.px;
                const py = cell.py;
                ctx.moveTo(px + 1, py + cs - 2);
                ctx.lineTo(px + 1, py + 1);
                ctx.lineTo(px + cs - 2, py + 1);
            });
        }
        ctx.stroke();

        // 5. Batch draw all shadows (black bevels) in exactly ONE unified path operation!
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.beginPath();
        for (const color in cellsByColor) {
            cellsByColor[color].forEach(cell => {
                ctx.globalAlpha = cell.alpha;
                const px = cell.px;
                const py = cell.py;
                ctx.moveTo(px + 1, py + cs - 1);
                ctx.lineTo(px + cs - 1, py + cs - 1);
                ctx.lineTo(px + cs - 1, py + 1);
            });
        }
        ctx.stroke();

        ctx.globalAlpha = 1;

        // 6. Draw particles
        ctx.save();
        this.particles.forEach(p => p.draw(ctx));
        ctx.restore();
        ctx.globalAlpha = 1;
    }
}

// ─── Public API ───────────────────────────────────────────────────────────────
export function runTetris(contexts, config) {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;
    topInset = contexts.topInset || 0;
    visibleH = contexts.visibleHeight || currentH;

    buildGame();

    function render() {
        // Dark semi-transparent background
        ctx.fillStyle = 'rgba(8, 6, 18, 0.92)';
        ctx.fillRect(0, 0, currentW, currentH);

        // Highly optimized batched line path stroke for drawing grid lines instantly in 1 call!
        ctx.strokeStyle = 'rgba(255,255,255,0.04)';
        ctx.lineWidth = 0.5;
        if (game) {
            const cs = game.cellSize;
            const ox = Math.floor((currentW - game.cols * cs) / 2);
            const oy = topInset + (visibleH - game.rows * cs);

            ctx.beginPath();
            for (let c = 0; c <= game.cols; c++) {
                ctx.moveTo(ox + c * cs, oy);
                ctx.lineTo(ox + c * cs, oy + game.rows * cs);
            }
            for (let r = 0; r <= game.rows; r++) {
                ctx.moveTo(ox, oy + r * cs);
                ctx.lineTo(ox + game.cols * cs, oy + r * cs);
            }
            ctx.stroke();

            // Step the simulation every frame
            game.step(ox, oy);

            game.draw(ctx, ox, oy);
        }

        animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);
}

export function stopTetris() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
