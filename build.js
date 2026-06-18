// ⚡ Automated Git Versioning Bundle Compiler
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const { validateConfig, compileConfig } = require('./scripts/validate-config.js');

const isWatch = process.argv.includes('--watch');
const isLocal = process.argv.includes('--local');
const isLocalOnly = process.argv.includes('--local-only');
const buildDir = path.join(__dirname, 'build');

function copyLocal() {
    const localConfigPath = path.join(__dirname, 'ankifx.local.json');
    if (!fs.existsSync(localConfigPath)) {
        console.error('\n⚠️  ankifx.local.json was not found.');
        console.error('Please create ankifx.local.json in the project root with the following format:');
        console.error(JSON.stringify({ ankiMediaDir: "/path/to/collection.media" }, null, 4));
        console.error('');
        process.exit(1);
    }

    const localConfig = JSON.parse(fs.readFileSync(localConfigPath, 'utf8'));
    if (!localConfig.ankiMediaDir) {
        console.error('\n⚠️  ankifx.local.json is missing the "ankiMediaDir" field.');
        process.exit(1);
    }

    const targetDir = localConfig.ankiMediaDir;
    if (!fs.existsSync(targetDir)) {
        console.error(`\n⚠️  The target directory "${targetDir}" does not exist. Please check your path.`);
        process.exit(1);
    }

    const srcJs = path.join(buildDir, '_ankifx.js');
    const destJs = path.join(targetDir, '_ankifx.js');
    if (fs.existsSync(srcJs)) {
        fs.copyFileSync(srcJs, destJs);
        console.log(`🚀 Copied build/_ankifx.js to local media directory.`);
    } else {
        console.warn(`⚠️  Could not find build/_ankifx.js to copy.`);
    }

    const srcJson = path.join(buildDir, '_afx_defaults.json');
    const destJson = path.join(targetDir, '_afx_defaults.json');
    if (fs.existsSync(srcJson)) {
        fs.copyFileSync(srcJson, destJson);
        console.log(`🚀 Copied build/_afx_defaults.json to local media directory.`);
    } else {
        console.warn(`⚠️  Could not find build/_afx_defaults.json to copy.`);
    }

    const srcVersion = path.join(buildDir, '_afx_version.json');
    const destVersion = path.join(targetDir, '_afx_version.json');
    if (fs.existsSync(srcVersion)) {
        fs.copyFileSync(srcVersion, destVersion);
        console.log(`🚀 Copied build/_afx_version.json to local media directory.`);
    }
}

if (isLocalOnly) {
    copyLocal();
    process.exit(0);
}

// 1. Plugin to discover and register effects
const effectsRegistryPlugin = {
    name: 'effects-registry',
    setup(build) {
        build.onStart(() => {
            try {
                const effectsDir = path.join(__dirname, 'src', 'effects');
                const registryPath = path.join(effectsDir, 'registry.js');
                
                const files = fs.readdirSync(effectsDir)
                    .filter(f => f.endsWith('.js') && f !== 'marquee.js' && f !== 'registry.js');
                
                let imports = '';
                let entries = '';
                
                files.forEach((file, idx) => {
                    const id = file.replace('.js', '');
                    const filePath = path.join(effectsDir, file);
                    const source = fs.readFileSync(filePath, 'utf8');
                    if (!/export const effect\s*=/.test(source)) {
                        throw new Error(`Effect file ${file} must export "export const effect = { ... }"`);
                    }
                    const idMatch = source.match(/^\s*id:\s*['"]([^'"]+)['"]/m);
                    if (!idMatch) {
                        throw new Error(`Effect file ${file} is missing effect.id`);
                    }
                    if (idMatch[1] !== id) {
                        throw new Error(`Effect file ${file}: effect.id "${idMatch[1]}" must match filename "${id}"`);
                    }
                    if (!/run\s*:/.test(source) || !/stop\s*:/.test(source)) {
                        throw new Error(`Effect file ${file} must define run and stop`);
                    }
                    const varName = `eff${idx}`;
                    imports += `import { effect as ${varName} } from './${file}';\n`;
                    entries += `    '${id}': ${varName},\n`;
                });
                
                const content = `// 🤖 AUTO-GENERATED - DO NOT EDIT\n${imports}\nexport const EFFECTS = {\n${entries}};\n`;
                fs.writeFileSync(registryPath, content);
                console.log(`✨ Generated effects registry with ${files.length} effects.`);
            } catch (err) {
                console.error('⚠️ Error generating effects registry:', err.message);
                process.exit(1);
            }
        });
    },
};

// 2. Plugin to build and compile the JSON configs
const compileConfigsPlugin = {
    name: 'compile-configs',
    setup(build) {
        build.onEnd(result => {
            if (result.errors.length > 0) return;

            // Ensure build/ folder exists
            if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

            // Ensure build/configs/ folder exists and is clear (untracked)
            const buildConfigsDir = path.join(buildDir, 'configs');
            if (fs.existsSync(buildConfigsDir)) {
                // Clear any existing config files to prevent orphaned config leaks
                const existingConfigs = fs.readdirSync(buildConfigsDir);
                for (const file of existingConfigs) {
                    try {
                        fs.unlinkSync(path.join(buildConfigsDir, file));
                    } catch (e) {}
                }
            } else {
                fs.mkdirSync(buildConfigsDir, { recursive: true });
            }

            try {
                const configsDir = path.join(__dirname, 'configs');
                const defaultPath = path.join(configsDir, '_afx_defaults.json');

                if (!fs.existsSync(defaultPath)) {
                    throw new Error('Required configuration file configs/_afx_defaults.json is missing!');
                }

                // 1. Process default configuration
                const defaultsRaw = fs.readFileSync(defaultPath, 'utf8');
                const defaultsObj = JSON.parse(defaultsRaw);
                validateConfig(defaultsObj, '_afx_defaults.json');
                
                const defaultsCompiled = compileConfig(defaultsObj);
                fs.writeFileSync(
                    path.join(buildDir, '_afx_defaults.json'),
                    JSON.stringify(defaultsCompiled, null, 2),
                    'utf8'
                );
                console.log('✅ Compiled build/_afx_defaults.json successfully.');

                // Copy version manifest directly
                const versionPath = path.join(configsDir, '_afx_version.json');
                if (fs.existsSync(versionPath)) {
                    fs.copyFileSync(versionPath, path.join(buildDir, '_afx_version.json'));
                    console.log('✅ Copied configs/_afx_version.json to build/_afx_version.json successfully.');
                }

                // 2. Auto-discover and compile deck-specific overrides
                const otherConfigs = fs.readdirSync(configsDir)
                    .filter(f => f.startsWith('_afx_') && f.endsWith('.json') && f !== '_afx_defaults.json' && f !== '_afx_version.json');

                for (const file of otherConfigs) {
                    const filePath = path.join(configsDir, file);
                    const fileRaw = fs.readFileSync(filePath, 'utf8');
                    const fileObj = JSON.parse(fileRaw);
                    
                    // Validate override before merge
                    validateConfig(fileObj, file);

                    // Merge: Override defaults with deck-specific options
                    const mergedObj = {
                        ...defaultsObj,
                        ...fileObj
                    };

                    const mergedCompiled = compileConfig(mergedObj);
                    fs.writeFileSync(
                        path.join(buildConfigsDir, file),
                        JSON.stringify(mergedCompiled, null, 2),
                        'utf8'
                    );
                }

                if (otherConfigs.length > 0) {
                    console.log(`📁 Deck overrides compiled to build/configs/ folder. (${otherConfigs.length} config${otherConfigs.length > 1 ? 's' : ''}: ${otherConfigs.join(', ')})`);
                } else {
                    console.log('📁 Deck overrides compiled to build/configs/ folder. (no custom overrides found)');
                }

                // 3. Handle local copy if requested
                if (isLocal) {
                    copyLocal();
                }
            } catch (err) {
                console.error('⚠️ Error processing configuration files:', err.message);
                process.exit(1); // Fail the build process explicitly if validation/parsing fails
            }
        });
    },
};

// 3. Run the build
async function runBuild() {
    let gitCommit = 'unknown';
    let isRelease = false;
    try {
        const { execSync } = require('child_process');
        let exactTag = '';
        try {
            exactTag = execSync('git describe --tags --exact-match 2>/dev/null').toString().trim();
        } catch (e) {}

        if (
            exactTag === `v${pkg.version}` ||
            exactTag === pkg.version ||
            process.env.RELEASE === 'true' ||
            process.env.GITHUB_REF_NAME === `v${pkg.version}` ||
            process.env.GITHUB_REF_NAME === pkg.version
        ) {
            isRelease = true;
        }

        const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
        const isDirty = execSync('git status --porcelain').toString().trim() !== '';
        gitCommit = isDirty ? `${commitHash}+` : commitHash;
    } catch (e) {
        // Fallback gracefully if Git is not available
    }

    const versionString = isRelease ? pkg.version : `${pkg.version}-${gitCommit}`;

    const ctx = await esbuild.context({
        entryPoints: ['src/index.js'],
        bundle: true,
        minify: true,
        // 🚀 SIMPLIFICATION: Output the engine directly into the build folder
        outfile: 'build/_ankifx.js',
        format: 'iife',
        loader: { '.css': 'text' },
        // Capture document.currentScript OUTSIDE the IIFE, before any module code.
        // This is the only reliable way on iOS WKWebView where document.currentScript
        // becomes null by the time esbuild's hoisted import code finishes running.
        banner: {
            js: 'var __ankifx_script_src=(document.currentScript&&document.currentScript.src)||"";'
        },
        define: {
            'process.env.ANKIFX_VERSION': JSON.stringify(versionString),
            'process.env.BUILD_DATE': JSON.stringify(new Date().toISOString())
        },
        plugins: [effectsRegistryPlugin, compileConfigsPlugin]
    });

    if (isWatch) {
        await ctx.watch();
        console.log('👀 Watching for changes... (Save a file to trigger rebuild)');
    } else {
        await ctx.rebuild();
        console.log('⚡ Build complete: build/_ankifx.js ready.');
        ctx.dispose();
    }
}

runBuild().catch(() => process.exit(1));