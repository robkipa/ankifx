import { Marquee } from './marquee.js';

let animationId = null;

export const effect = {
    id: 'none',
    name: 'None',
    run: runNone,
    stop: stopNone
};

export function runNone(container, marqueeText, position = 'bottom') {
    // 1. Force transparency to reveal Anki card background
    document.documentElement.style.setProperty('--afx-body-bg', 'transparent');
    document.documentElement.style.setProperty('--afx-none-bg', 'transparent');

    const scanForWhiteBackgrounds = () => {
        console.log("🔍 [AnkiFX Debug] Detailed DOM Scan...");
        
        const structural = ['html', 'body', '.card', '.iphone', '.mobile', '#qa', '#content', '#container', '#outer'];
        structural.forEach(sel => {
            const el = document.querySelector(sel);
            if (el) {
                const style = window.getComputedStyle(el);
                console.log(`[Structural] ${sel}: bg='${style.backgroundColor}', img='${style.backgroundImage}', opacity='${style.opacity}', zIndex='${style.zIndex}'`);
            }
        });

        const results = [];
        const all = document.querySelectorAll('*');
        
        const isLight = (color) => {
            if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return false;
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                const r = parseInt(match[1]);
                const g = parseInt(match[2]);
                const b = parseInt(match[3]);
                return r > 200 && g > 200 && b > 200; // Check for any "light" color (not just pure white)
            }
            return false;
        };

        all.forEach(el => {
            if (el.closest('.eruda-container')) return;
            const style = window.getComputedStyle(el);
            const rect = el.getBoundingClientRect();
            
            // Check for light colors
            if (isLight(style.backgroundColor) || isLight(style.backgroundImage)) {
                results.push({
                    tag: el.tagName,
                    id: el.id,
                    classes: el.className,
                    bg: style.backgroundColor,
                    img: style.backgroundImage,
                    element: el
                });
            }
            
            // Check for full-screen elements
            if (rect.width > window.innerWidth * 0.9 && rect.height > window.innerHeight * 0.9) {
                console.log(`[FullSize] ${el.tagName}${el.id ? '#' + el.id : ''}.${el.className}: bg='${style.backgroundColor}', zIndex='${style.zIndex}', display='${style.display}'`);
            }
        });
        
        if (results.length > 0) {
            console.warn(`⚠️ [AnkiFX Debug] Found ${results.length} light-colored elements:`);
            results.forEach(r => {
                const selector = `${r.tag}${r.id ? '#' + r.id : ''}${r.classes ? '.' + r.classes.toString().split(' ').join('.') : ''}`;
                console.log(`- %c${selector}`, 'color: #ff00ff; font-weight: bold;', r.bg, r.element);
            });
        }
    };

    // 2. Eruda Integration
    if (!window.eruda) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/eruda';
        script.onload = () => {
            if (window.eruda) {
                window.eruda.init();
                window.eruda.position({ x: 20, y: 20 });
                setTimeout(scanForWhiteBackgrounds, 1000);
            }
        };
        document.head.appendChild(script);
    } else {
        try { 
            window.eruda.init(); 
            window.eruda.position({ x: 20, y: 20 });
            setTimeout(scanForWhiteBackgrounds, 1000);
        } catch(e) {}
    }

    // 3. Create a clean transparent canvas for the marquee
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

    function resize() {
        const rect = container.getBoundingClientRect();
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
    }
    window.addEventListener('resize', resize);
    resize();

    // 4. Initialize Marquee
    const marquee = new Marquee(marqueeText, position, {
        color: '#ffffff',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    });

    function render() {
        ctx.clearRect(0, 0, w, h);
        marquee.render(ctx, w, h);
        animationId = requestAnimationFrame(render);
    }
    animationId = requestAnimationFrame(render);

    // Return the marquee instance so the engine can control its enabled state
    return marquee;
}

export function stopNone() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    // Restore defaults when switching away
    document.documentElement.style.removeProperty('--afx-body-bg');
    document.documentElement.style.removeProperty('--afx-none-bg');
    
    // Hide Eruda if it exists, to keep the UI clean when switching back to animations
    if (window.eruda) {
        try { window.eruda.hide(); } catch(e) {}
    }
}
