export function getShaderPrecision(gl) {
    if (typeof gl.getShaderPrecisionFormat === 'function') {
        try {
            const format = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
            if (format && format.precision > 0) {
                return 'highp';
            }
        } catch (e) {}
    }
    return 'mediump';
}

/**
 * Shared fullscreen quad program helper for fractal effects.
 * Does not manage viewport/DPR — callers set uniforms after creation.
 */
export function createFullscreenProgram(gl, vsSource, fsSource) {
    function compileShader(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('[AnkiFX/WebGL] Shader compile error:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    
    // Dynamically inject precision into fragment shader
    const cleanedFs = fsSource.replace(/\bprecision\s+(highp|mediump|lowp)\s+float\s*;/gim, '');
    const precision = getShaderPrecision(gl);
    const finalFs = `precision ${precision} float;\n` + cleanedFs;

    const fs = compileShader(gl.FRAGMENT_SHADER, finalFs);
    if (!vs || !fs) {
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
        return null;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    // Detach and delete shaders immediately after linking to prevent leaks.
    gl.detachShader(program, vs);
    gl.detachShader(program, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('[AnkiFX/WebGL] Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }

    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    
    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    
    return { program, buffer };
}

