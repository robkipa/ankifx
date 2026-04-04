import { Marquee } from './marquee.js';

let animationId = null;
let currentW, currentH;

export const effect = {
    id: 'fire',
    name: 'Doom Fire',
    run: runFire,
    stop: stopFire,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
    },
    preferredTrack: { title: "Doom 3 BFG Edition", trackTitle: "DOOM E1M1" }
};

const FIRE_PALETTE = [
    [0x07,0x07,0x07], [0x1F,0x07,0x07], [0x2F,0x0F,0x07], [0x47,0x0F,0x07],
    [0x57,0x17,0x07], [0x67,0x1F,0x07], [0x77,0x1F,0x07], [0x8F,0x27,0x07],
    [0x9F,0x2F,0x07], [0xAF,0x3F,0x07], [0xBF,0x47,0x07], [0xC7,0x47,0x07],
    [0xDF,0x4F,0x07], [0xDF,0x57,0x07], [0xDF,0x57,0x07], [0xD7,0x5F,0x07],
    [0xD7,0x5F,0x07], [0xD7,0x67,0x0F], [0xCF,0x6F,0x0F], [0xCF,0x77,0x0F],
    [0xCF,0x7F,0x0F], [0xCF,0x87,0x17], [0xC7,0x87,0x17], [0xC7,0x8F,0x17],
    [0xC7,0x97,0x1F], [0xBF,0x9F,0x1F], [0xBF,0x9F,0x1F], [0xBF,0xA7,0x27],
    [0xBF,0xA7,0x27], [0xBF,0xAF,0x2F], [0xB7,0xAF,0x2F], [0xB7,0xB7,0x2F],
    [0xB7,0xB7,0x37], [0xCF,0xCF,0x6F], [0xDF,0xDF,0x9F], [0xEF,0xEF,0xC7],
    [0xFF,0xFF,0xFF]
];

export function runFire(contexts, marqueeText, position = 'bottom') {
    const ctx = contexts.ctx2d;
    currentW = contexts.width;
    currentH = contexts.height;
    
    // Internal resolution for the fire effect (320px wide, height proportional)
    const fireWidth = 320;
    const fireHeight = 168; // Doom original height-ish
    
    const firePixels = new Uint8Array(fireWidth * fireHeight);
    const imageData = ctx.createImageData(fireWidth, fireHeight);
    const data = imageData.data;

    // Offscreen canvas for low-res rendering
    const offscreen = document.createElement('canvas');
    offscreen.width = fireWidth;
    offscreen.height = fireHeight;
    const offCtx = offscreen.getContext('2d');

    function initFire() {
        firePixels.fill(0);
        // Set bottom row to white (maximum fire)
        for (let i = 0; i < fireWidth; i++) {
            firePixels[(fireHeight - 1) * fireWidth + i] = 36;
        }
    }

    function spreadFire(src) {
        const pixel = firePixels[src];
        if (pixel === 0) {
            firePixels[src - fireWidth] = 0;
        } else {
            const randIdx = Math.floor(Math.random() * 3);
            const dst = src - randIdx + 1;
            firePixels[dst - fireWidth] = pixel - (randIdx & 1);
        }
    }

    function doFire() {
        for (let x = 0; x < fireWidth; x++) {
            for (let y = 1; y < fireHeight; y++) {
                spreadFire(y * fireWidth + x);
            }
        }
    }

    function updateImageData() {
        for (let i = 0; i < firePixels.length; i++) {
            const colorIdx = firePixels[i];
            const rgb = FIRE_PALETTE[colorIdx];
            const pixelIdx = i * 4;
            data[pixelIdx] = rgb[0];
            data[pixelIdx + 1] = rgb[1];
            data[pixelIdx + 2] = rgb[2];
            data[pixelIdx + 3] = 255;
        }
    }

    initFire();

    const marquee = new Marquee(marqueeText, position, {
        color: '#ffffff',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    });

    function render() {
        doFire();
        updateImageData();
        
        // Put low-res fire into the scaled canvas
        offCtx.putImageData(imageData, 0, 0);
        
        ctx.save();
        // Disable smoothing for pixelated look
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, currentW, currentH);
        ctx.restore();

        // Overlay marquee
        marquee.render(ctx, currentW, currentH);
        
        animationId = requestAnimationFrame(render);
    }

    animationId = requestAnimationFrame(render);
    return marquee;
}

export function stopFire() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}
