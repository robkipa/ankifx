let animationId = null;
let currentW, currentH;
let debugContainer = null;

const maxCapturedLogs = 200;
const capturedLogs = [];
let onLogAdded = null;
let currentFilter = 'all';

const layoutMetrics = {
    ioHeaderHeight: null,
    topInset: null,
    bottomInset: null,
    viewportHeight: null,
    visibleHeight: 0,
    isLandscape: false
};

function refreshLayoutMetrics() {
    const docEl = document.documentElement;
    const style = docEl ? getComputedStyle(docEl) : null;
    
    const parseCSSVal = (s, prop) => {
        if (!s) return null;
        const val = s.getPropertyValue(prop);
        if (!val || val.trim() === '') return null;
        const parsed = parseInt(val, 10);
        return isNaN(parsed) ? null : parsed;
    };

    layoutMetrics.ioHeaderHeight = parseCSSVal(style, '--io-header');
    layoutMetrics.topInset = parseCSSVal(style, '--top-inset');
    layoutMetrics.bottomInset = parseCSSVal(style, '--bottom-inset');
    
    const bgEl = document.getElementById('ankifx-background');
    layoutMetrics.viewportHeight = bgEl ? Math.round(bgEl.getBoundingClientRect().height) : null;
    layoutMetrics.isLandscape = window.innerWidth > window.innerHeight;
    layoutMetrics.visibleHeight = (docEl ? docEl.clientHeight : window.innerHeight) + (layoutMetrics.ioHeaderHeight || 0);
}

// Global Console Interceptor setup
const captureLog = (type, args) => {
    // Only capture if debug mode is active in the current config
    if (!window.AnkiFX_Config?.debug) return;

    const message = args.map(arg => {
        if (arg === null) return 'null';
        if (arg === undefined) return 'undefined';
        if (typeof arg === 'object') {
            try {
                return JSON.stringify(arg);
            } catch (e) {
                return String(arg);
            }
        }
        return String(arg);
    }).join(' ');

    capturedLogs.push({
        type,
        message,
        timestamp: new Date().toLocaleTimeString()
    });

    if (capturedLogs.length > maxCapturedLogs) {
        capturedLogs.shift();
    }

    if (onLogAdded) {
        onLogAdded();
    }
};

// Install console intercept exactly once.
// We snapshot native methods right here — immediately before overwriting them —
// so they are guaranteed to be (a) defined by the host and (b) not yet wrapped.
// Capturing earlier (module top-level) risks undefined methods on WKWebView;
// using lazy getters risks infinite recursion once console.* is overwritten.
if (typeof window !== 'undefined' && !window.__console_intercepted__) {
    const _log = console.log && console.log.bind(console) || (() => { });
    const _warn = console.warn && console.warn.bind(console) || (() => { });
    const _error = console.error && console.error.bind(console) || (() => { });
    const _info = console.info && console.info.bind(console) || (() => { });
    const _debug = console.debug && console.debug.bind(console) || (() => { });

    console.log = (...args) => { _log(...args); captureLog('log', args); };
    console.warn = (...args) => { _warn(...args); captureLog('warn', args); };
    console.error = (...args) => { _error(...args); captureLog('error', args); };
    console.info = (...args) => { _info(...args); captureLog('info', args); };
    console.debug = (...args) => { _debug(...args); captureLog('debug', args); };

    window.addEventListener('error', (event) => {
        if (!window.AnkiFX_Config?.debug) return;
        let errMsg = event.message;
        if (event.error) {
            const name = event.error.name || 'Error';
            const message = event.error.message || event.message || '';
            const stack = event.error.stack || '';
            if (stack && !stack.includes(message)) {
                errMsg = `${name}: ${message}\n${stack}`;
            } else {
                errMsg = stack || `${name}: ${message}`;
            }
        }
        captureLog('error', [errMsg]);
    });

    window.addEventListener('unhandledrejection', (event) => {
        if (!window.AnkiFX_Config?.debug) return;
        captureLog('error', [`Unhandled Promise Rejection: ${event.reason}`]);
    });

    window.__console_intercepted__ = true;
}

export const effect = {
    id: 'debug',
    name: 'DEBUG',
    run: runDebug,
    stop: stopDebug,
    onResize: (w, h) => {
        currentW = w;
        currentH = h;
        refreshLayoutMetrics();
    },
    marqueeFont: {
        color: '#00ff00',
        shadowColor: 'rgba(0,0,0,0.8)',
        shadowBlur: 5
    },
    controls: [
        {
            type: 'button',
            id: 'copy-logs-btn',
            label: '📋 COPY LOGS',
            onClick: () => {
                copyLogsToClipboard();
            }
        },
        {
            type: 'button',
            id: 'clear-storage-btn',
            label: '🧹 CLEAR STORAGE',
            onClick: () => {
                if (confirm('Clear ALL AnkiFX local storage?')) {
                    localStorage.clear();
                    location.reload();
                }
            }
        }
    ]
};

export function runDebug(contexts, config) {
    // Prevent duplicate containers (failsafe)
    if (debugContainer) {
        debugContainer.remove();
        debugContainer = null;
    }

    const actualDpr = contexts.dpr || 1;
    currentW = contexts.width;
    currentH = contexts.height;

    refreshLayoutMetrics();

    // Create main container
    debugContainer = document.createElement('div');
    debugContainer.className = 'afx-debug-container';

    // Columns structure
    const cols = document.createElement('div');
    cols.className = 'afx-debug-columns';
    debugContainer.appendChild(cols);

    const leftCol = document.createElement('div');
    leftCol.className = 'afx-debug-left-col';
    cols.appendChild(leftCol);

    const rightCol = document.createElement('div');
    rightCol.className = 'afx-debug-right-col';
    cols.appendChild(rightCol);

    // Left Column Panels
    // 1. Engine Diagnostics & History Combined (at the top)
    const diagnosticsPanel = document.createElement('div');
    diagnosticsPanel.className = 'afx-debug-panel diagnostics';
    diagnosticsPanel.innerHTML = '<h3>AnkiFX Version</h3>';
    const diagnosticsContent = document.createElement('div');
    diagnosticsContent.className = 'afx-debug-content';
    diagnosticsPanel.appendChild(diagnosticsContent);
    leftCol.appendChild(diagnosticsPanel);

    // 2. Viewport & Layout Info (below Diagnostics)
    const viewportPanel = document.createElement('div');
    viewportPanel.className = 'afx-debug-panel viewport-info';
    viewportPanel.innerHTML = '<h3>Viewport & Layout</h3>';
    const viewportContent = document.createElement('pre');
    viewportContent.className = 'afx-debug-content';
    viewportPanel.appendChild(viewportContent);
    leftCol.appendChild(viewportPanel);

    // Right Column Panels
    // 3. Chronological Loader Logs (at the top of right column)
    const logsPanel = document.createElement('div');
    logsPanel.className = 'afx-debug-panel logs';
    logsPanel.innerHTML = '<h3>Chronological Loader Logs</h3>';
    const logsContent = document.createElement('div');
    logsContent.className = 'afx-debug-content';
    logsPanel.appendChild(logsContent);
    rightCol.appendChild(logsPanel);

    // 4. LocalStorage Viewer Panel (below Chronological Loader Logs)
    const localStoragePanel = document.createElement('div');
    localStoragePanel.className = 'afx-debug-panel localstorage-viewer';
    localStoragePanel.innerHTML = '<h3>LocalStorage</h3>';
    const storageContent = document.createElement('div');
    storageContent.className = 'afx-debug-content';
    localStoragePanel.appendChild(storageContent);
    rightCol.appendChild(localStoragePanel);

    // Bottom: Console Logs (Full Width)
    const consolePanel = document.createElement('div');
    consolePanel.className = 'afx-debug-panel console-logs';
    consolePanel.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255, 255, 255, 0.15); padding-bottom: 4px; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <h3 style="margin: 0; border: none; padding: 0; color: #ff5555;">Console Logs</h3>
            <div style="display: flex; gap: 6px; align-items: center;">
                <button class="afx-console-filter-btn active" data-filter="all" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">ALL</button>
                <button class="afx-console-filter-btn" data-filter="log" style="background: rgba(255,255,255,0.05); border: 1px solid transparent; color: #888; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">LOG</button>
                <button class="afx-console-filter-btn" data-filter="warn" style="background: rgba(255,255,255,0.05); border: 1px solid transparent; color: #888; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">WARN</button>
                <button class="afx-console-filter-btn" data-filter="error" style="background: rgba(255,255,255,0.05); border: 1px solid transparent; color: #888; font-size: 10px; padding: 2px 6px; border-radius: 4px; cursor: pointer; font-family: monospace;">ERROR</button>
                <button id="afx-clear-console-btn" style="background: rgba(255, 85, 85, 0.2); border: 1px solid rgba(255, 85, 85, 0.4); color: #ff5555; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; cursor: pointer; margin-left: 10px; font-family: monospace;">CLEAR</button>
            </div>
        </div>
        <div id="afx-console-log-list" class="afx-debug-content" style="max-height: 250px; overflow-y: auto; font-family: monospace; margin-bottom: 8px;"></div>
        <div style="display: flex; gap: 8px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 8px; align-items: center;">
            <span style="color: #00ffff; font-weight: bold; font-family: monospace;">&gt;</span>
            <input type="text" id="afx-console-input" placeholder="Execute JS (e.g. window.location.href)" style="flex: 1; background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.2); color: #fff; font-family: monospace; font-size: 11px; padding: 4px 8px; border-radius: 4px; outline: none; box-sizing: border-box;">
            <button id="afx-console-exec-btn" style="background: #28a745; color: #fff; border: none; font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-family: monospace;">EXEC</button>
        </div>
    `;
    debugContainer.appendChild(consolePanel);

    // Spacer to prevent overlap with Anki bottom review bar and dock (WebKit flex padding bug fix)
    const bottomSpacer = document.createElement('div');
    bottomSpacer.style.height = 'calc(var(--bottom-inset, 0px) + var(--afx-dock-height, 0px) + 20px)';
    bottomSpacer.style.flexShrink = '0';
    bottomSpacer.style.pointerEvents = 'none';
    debugContainer.appendChild(bottomSpacer);

    // Console Event Bindings
    const filterBtns = consolePanel.querySelectorAll('.afx-console-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.background = 'rgba(255,255,255,0.05)';
                b.style.borderColor = 'transparent';
                b.style.color = '#888';
            });
            btn.classList.add('active');
            btn.style.background = 'rgba(255,255,255,0.15)';
            btn.style.borderColor = 'rgba(255,255,255,0.25)';
            btn.style.color = '#fff';
            currentFilter = btn.getAttribute('data-filter');
        });
    });

    const clearConsoleBtn = consolePanel.querySelector('#afx-clear-console-btn');
    if (clearConsoleBtn) {
        clearConsoleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            capturedLogs.length = 0;
        });
    }

    const execInput = consolePanel.querySelector('#afx-console-input');
    const execBtn = consolePanel.querySelector('#afx-console-exec-btn');

    const executeInput = () => {
        if (!execInput) return;
        const code = execInput.value.trim();
        if (!code) return;

        // Log the command itself
        captureLog('log', [`> ${code}`]);

        try {
            // Run eval in global scope
            const result = (0, eval)(code);
            captureLog('info', ['=>', result]);
        } catch (err) {
            captureLog('error', [err.stack || err.message || err]);
        }

        execInput.value = '';
        execInput.focus();
    };

    if (execBtn && execInput) {
        // Prevent key events from bubbling up to Anki
        ['keydown', 'keyup', 'keypress'].forEach(evtType => {
            execInput.addEventListener(evtType, (e) => {
                e.stopPropagation();
            });
        });

        execInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                executeInput();
            }
        });

        execBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            executeInput();
        });
    }

    // Append main container to ankifx-overlay (so it participates in overlay stacking context)
    const overlayEl = document.getElementById('ankifx-overlay') || document.body;
    overlayEl.appendChild(debugContainer);

    const parentEl = document.getElementById('ankifx-background') || document.body;

    // Corner Markers
    const corners = {
        topLeft: document.createElement('div'),
        topRight: document.createElement('div'),
        bottomLeft: document.createElement('div'),
        bottomRight: document.createElement('div')
    };
    corners.topLeft.className = 'afx-debug-corner top-left';
    corners.topRight.className = 'afx-debug-corner top-right';
    corners.bottomLeft.className = 'afx-debug-corner bottom-left';
    corners.bottomRight.className = 'afx-debug-corner bottom-right';
    corners.bottomLeft.style.bottom = 'auto';
    corners.bottomRight.style.bottom = 'auto';

    Object.values(corners).forEach(el => parentEl.appendChild(el));

    // Lines & Labels
    const visibleLine = document.createElement('div');
    visibleLine.className = 'afx-debug-line visible-bottom';
    const visibleLabel = document.createElement('span');
    visibleLabel.className = 'afx-debug-line-label';
    visibleLabel.textContent = '--- VISIBLE DOCUMENT BOTTOM ---';
    visibleLine.appendChild(visibleLabel);
    parentEl.appendChild(visibleLine);

    let lastTime = 0;
    let frameCount = 0;
    let fps = 0;

    // Reconciliation cache keys to prevent unneeded writes
    let lastViewportText = '';
    let lastDiagnosticsText = '';
    let lastLogsKey = '';
    let lastCornersText = '';
    let lastConsoleKey = '';
    let lastLocalStorageKey = '';

    function render(timestamp) {
        if (timestamp === undefined) timestamp = performance.now();
        if (!lastTime) lastTime = timestamp;
        frameCount++;
        if (timestamp - lastTime >= 1000) {
            fps = frameCount;
            frameCount = 0;
            lastTime = timestamp;
        }

        // Draw dark background on 2D canvas
        const ctx = contexts.ctx2d;
        ctx.clearRect(0, 0, currentW, currentH);
        ctx.fillStyle = '#050508';
        ctx.fillRect(0, 0, currentW, currentH);

        const visibleH = layoutMetrics.visibleHeight;

        // Update Viewport & Layout Metrics
        const formatMetric = (val) => val !== null ? `${val}px` : 'N/A';
        const ioHeaderDisp = formatMetric(layoutMetrics.ioHeaderHeight);
        const topInsetDisp = formatMetric(layoutMetrics.topInset);
        const bottomInsetDisp = formatMetric(layoutMetrics.bottomInset);
        const viewportHeightDisp = formatMetric(layoutMetrics.viewportHeight);
        const ioHeaderVal = layoutMetrics.ioHeaderHeight || 0;

        const viewportText = [
            `window:               ${window.innerWidth}x${window.innerHeight}`,
            `screen:               ${screen.width}x${screen.height}`,
            `doc:                  ${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
            `orient:               ${window.orientation || 'N/A'}`,
            `dpr (native|engine):  (${window.devicePixelRatio}|${actualDpr})`,
            `--io-header:          ${ioHeaderDisp}`,
            `--top-inset:          ${topInsetDisp}`,
            `--bottom-inset:       ${bottomInsetDisp}`,
            `--afx-viewport-height: calc(100dvh + ${ioHeaderVal}px) = ${viewportHeightDisp}`,
            `isLandscape:          ${layoutMetrics.isLandscape}`
        ].join('\n');

        if (viewportText !== lastViewportText) {
            viewportContent.textContent = viewportText;
            lastViewportText = viewportText;
        }

        // Update Diagnostics & History Combined
        const history = window.AnkiFX_Eval_History || [];
        const historyKey = JSON.stringify(history);
        const diagnosticsText = [
            `Version:  ${window.AnkiFX?.version || '1.0.0-dev'}`,
            `Source:   ${window.AnkiFX?.source || 'unknown'}`,
            `Built:    ${window.AnkiFX?.buildDate || 'development'}`
        ].join('\n');

        const combinedDiagnosticsKey = diagnosticsText + '_' + historyKey;
        if (combinedDiagnosticsKey !== lastDiagnosticsText) {
            diagnosticsContent.innerHTML = '';

            // Render basic diagnostics
            const metricsPre = document.createElement('pre');
            metricsPre.style.margin = '0 0 10px 0';
            metricsPre.style.fontFamily = 'inherit';
            metricsPre.style.fontSize = 'inherit';
            metricsPre.textContent = diagnosticsText;
            diagnosticsContent.appendChild(metricsPre);

            // Divider line
            const divider = document.createElement('div');
            divider.style.borderTop = '1px dashed rgba(255,255,255,0.15)';
            divider.style.margin = '10px 0';
            diagnosticsContent.appendChild(divider);

            // Title
            const historyTitle = document.createElement('div');
            historyTitle.textContent = 'EVALUATION HISTORY:';
            historyTitle.style.fontWeight = 'bold';
            historyTitle.style.color = '#00ffff';
            historyTitle.style.marginBottom = '6px';
            historyTitle.style.fontSize = '11px';
            diagnosticsContent.appendChild(historyTitle);

            // History logs
            const historyList = document.createElement('div');
            if (history.length === 0) {
                const emptyMsg = document.createElement('div');
                emptyMsg.textContent = '(No evaluation history captured)';
                emptyMsg.style.color = '#888';
                emptyMsg.style.fontStyle = 'italic';
                historyList.appendChild(emptyMsg);
            } else {
                history.slice(-3).forEach((h, idx) => {
                    const line = document.createElement('div');
                    line.textContent = `[${idx + 1}] ${h.source} (${h.version}) @ ${h.time} - ${h.status}`;
                    line.style.color = h.status === 'active' ? '#55ff55' : '#ffaa55';
                    line.style.fontSize = '11px';
                    historyList.appendChild(line);
                });
            }
            diagnosticsContent.appendChild(historyList);

            lastDiagnosticsText = combinedDiagnosticsKey;
        }

        // Update Loader Logs
        const logs = window.AnkiFX_Loader_Logs || [];
        const logsKey = JSON.stringify(logs);
        if (logsKey !== lastLogsKey) {
            logsContent.innerHTML = '';
            if (logs.length === 0) {
                const emptyMsg = document.createElement('div');
                emptyMsg.textContent = '(No logs captured by template loader)';
                emptyMsg.style.color = '#888';
                emptyMsg.style.fontStyle = 'italic';
                logsContent.appendChild(emptyMsg);
            } else {
                // Level → { color, badge } map. Handles structured { msg, level } objects
                // and falls back gracefully for legacy plain strings.
                const LEVEL_STYLE = {
                    success: { color: '#55ff55', badge: '✓' },
                    error: { color: '#ff5555', badge: '✗' },
                    warn: { color: '#ffaa55', badge: '!' },
                    pending: { color: '#888888', badge: '…' },
                    info: { color: '#dddddd', badge: '·' },
                };

                logs.forEach((log, idx) => {
                    const isObj = log && typeof log === 'object';
                    const msg = isObj ? log.msg : String(log);
                    const style = LEVEL_STYLE[isObj ? log.level : 'info'] || LEVEL_STYLE.info;

                    const line = document.createElement('div');
                    line.style.cssText = 'display: flex; gap: 6px; align-items: baseline; font-size: 11px; margin-bottom: 3px; padding-bottom: 2px; border-bottom: 1px solid rgba(255,255,255,0.04);';

                    const stepSpan = document.createElement('span');
                    stepSpan.textContent = `[${String(idx + 1).padStart(2, '0')}]`;
                    stepSpan.style.cssText = 'color: #555; flex-shrink: 0; font-size: 10px;';

                    const badgeSpan = document.createElement('span');
                    badgeSpan.textContent = style.badge;
                    badgeSpan.style.cssText = `color: ${style.color}; flex-shrink: 0; font-weight: bold; width: 10px;`;

                    const msgSpan = document.createElement('span');
                    msgSpan.textContent = msg;
                    msgSpan.style.cssText = `color: ${style.color}; word-break: break-word;`;

                    line.appendChild(stepSpan);
                    line.appendChild(badgeSpan);
                    line.appendChild(msgSpan);
                    logsContent.appendChild(line);
                });
            }
            lastLogsKey = logsKey;
        }

        // Update LocalStorage Viewer Panel
        const storageItems = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            storageItems[key] = localStorage.getItem(key);
        }
        const localStorageKey = JSON.stringify(storageItems);
        if (localStorageKey !== lastLocalStorageKey) {
            storageContent.innerHTML = '';
            const keys = Object.keys(storageItems).sort();
            if (keys.length === 0) {
                const emptyMsg = document.createElement('div');
                emptyMsg.textContent = '(LocalStorage is empty)';
                emptyMsg.style.color = '#888';
                emptyMsg.style.fontStyle = 'italic';
                emptyMsg.style.fontSize = '11px';
                storageContent.appendChild(emptyMsg);
            } else {
                keys.forEach(k => {
                    const row = document.createElement('div');
                    row.style.cssText = 'display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 2px;';

                    const keySpan = document.createElement('span');
                    keySpan.textContent = k;
                    keySpan.style.color = '#ffaa55';
                    keySpan.style.wordBreak = 'break-all';
                    keySpan.style.marginRight = '8px';

                    const valSpan = document.createElement('span');
                    valSpan.textContent = storageItems[k];
                    valSpan.style.color = '#00ffff';
                    valSpan.style.wordBreak = 'break-all';
                    valSpan.style.textAlign = 'right';

                    row.appendChild(keySpan);
                    row.appendChild(valSpan);
                    storageContent.appendChild(row);
                });
            }
            lastLocalStorageKey = localStorageKey;
        }

        // Update Console Logs Panel
        const filteredLogs = capturedLogs.filter(log => {
            if (currentFilter === 'all') return true;
            return log.type === currentFilter;
        });
        const consoleKey = currentFilter + '_' + JSON.stringify(filteredLogs);
        if (consoleKey !== lastConsoleKey) {
            const listEl = document.getElementById('afx-console-log-list');
            if (listEl) {
                listEl.innerHTML = '';
                if (filteredLogs.length === 0) {
                    const emptyMsg = document.createElement('div');
                    emptyMsg.textContent = `(No logs in category: ${currentFilter})`;
                    emptyMsg.style.color = '#888';
                    emptyMsg.style.fontStyle = 'italic';
                    emptyMsg.style.fontSize = '11px';
                    listEl.appendChild(emptyMsg);
                } else {
                    filteredLogs.forEach(log => {
                        const line = document.createElement('div');
                        line.style.marginBottom = '4px';
                        line.style.fontSize = '11px';
                        line.style.borderBottom = '1px solid rgba(255,255,255,0.03)';
                        line.style.paddingBottom = '2px';

                        const timeSpan = document.createElement('span');
                        timeSpan.textContent = `[${log.timestamp}] `;
                        timeSpan.style.color = '#888';
                        line.appendChild(timeSpan);

                        const msgSpan = document.createElement('span');
                        msgSpan.textContent = log.message;
                        if (log.type === 'error') {
                            msgSpan.style.color = '#ff5555';
                        } else if (log.type === 'warn') {
                            msgSpan.style.color = '#ffaa55';
                        } else if (log.type === 'info' || log.type === 'debug') {
                            msgSpan.style.color = '#00ffff';
                        } else {
                            msgSpan.style.color = '#ffffff';
                        }
                        line.appendChild(msgSpan);

                        listEl.appendChild(line);
                    });
                    // Auto-scroll to bottom
                    listEl.scrollTop = listEl.scrollHeight;
                }
            }
            lastConsoleKey = consoleKey;
        }

        // Update Corner Markers text
        const cornersText = `${currentW}x${visibleH}`;
        if (cornersText !== lastCornersText) {
            corners.topLeft.textContent = `(0,0)`;
            corners.topRight.textContent = `(${currentW},0)`;
            corners.bottomLeft.textContent = `(0,${visibleH})`;
            corners.bottomRight.textContent = `(${currentW},${visibleH})`;
            corners.bottomLeft.style.top = `${visibleH - 18}px`;
            corners.bottomRight.style.top = `${visibleH - 18}px`;
            lastCornersText = cornersText;
        }

        // Update Line Positions
        visibleLine.style.top = `${visibleH}px`;

        animationId = requestAnimationFrame(render);
    }

    render();
}

export function stopDebug() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
    if (debugContainer) {
        debugContainer.remove();
        debugContainer = null;
    }
    // Clean up corners and visible line from parentEl
    document.querySelectorAll('.afx-debug-corner, .afx-debug-line').forEach(el => el.remove());
}

function copyLogsToClipboard() {
    const container = document.querySelector('.afx-debug-container');
    if (!container) return;

    let text = '=== ANKIFX DEBUG LOGS ===\n\n';

    const panels = container.querySelectorAll('.afx-debug-panel');
    panels.forEach(panel => {
        const title = panel.querySelector('h3')?.textContent || '';
        const contentEl = panel.querySelector('.afx-debug-content');
        if (contentEl) {
            text += `--- ${title.toUpperCase()} ---\n`;
            text += contentEl.innerText || contentEl.textContent || '';
            text += '\n\n';
        }
    });

    const writeToClipboard = () => {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text.trim();
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.opacity = '0';
            textArea.style.pointerEvents = 'none';
            document.body.appendChild(textArea);

            textArea.focus();
            textArea.select();

            const success = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (success) {
                return Promise.resolve();
            }
        } catch (e) {
            // silent fallback
        }

        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            return navigator.clipboard.writeText(text.trim());
        } else {
            return Promise.reject(new Error('No copy method succeeded or is available'));
        }
    };

    writeToClipboard().then(() => {
        const btn = document.getElementById('afx-control-copy-logs-btn');
        if (btn) {
            const oldLabel = btn.textContent;
            btn.textContent = '✅ COPIED!';
            setTimeout(() => {
                btn.textContent = oldLabel;
            }, 1500);
        }
    }).catch(err => {
        const btn = document.getElementById('afx-control-copy-logs-btn');
        if (btn) {
            const oldLabel = btn.textContent;
            btn.textContent = '❌ ERROR';
            setTimeout(() => {
                btn.textContent = oldLabel;
            }, 1500);
        }
    });
}
