const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const isWatch = process.argv.includes('--watch');
const buildDir = path.join(__dirname, 'build');

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
                    const varName = `eff${idx}`;
                    imports += `import { effect as ${varName} } from './${file}';\n`;
                    entries += `    '${id}': ${varName},\n`;
                });
                
                const content = `// 🤖 AUTO-GENERATED - DO NOT EDIT\n${imports}\nexport const EFFECTS = {\n${entries}};\n`;
                fs.writeFileSync(registryPath, content);
                console.log(`✨ Generated effects registry with ${files.length} effects.`);
            } catch (err) {
                console.error('⚠️ Error generating effects registry:', err.message);
            }
        });
    },
};

// 2. Plugin to copy only the static assets
const copyStaticFilesPlugin = {
    name: 'copy-static-files',
    setup(build) {
        build.onEnd(result => {
            if (result.errors.length > 0) return;

            // Ensure build/ folder exists
            if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

            try {
                // Auto-discover and sync all config files matching _afx_*.js
                const configsDir = path.join(__dirname, 'configs');
                const configs = fs.readdirSync(configsDir)
                    .filter(f => f.startsWith('_afx_') && f.endsWith('.js'));

                for (const file of configs) {
                    fs.copyFileSync(
                        path.join(configsDir, file),
                        path.join(buildDir, file)
                    );
                }

                if (configs.length > 0) {
                    console.log(`📁 Static files synced to build/ folder. (${configs.length} config${configs.length > 1 ? 's' : ''}: ${configs.join(', ')})`);
                } else {
                    console.log('📁 Static files synced to build/ folder. (no configs found)');
                }
            } catch (err) {
                console.error('⚠️ Error copying static files:', err.message);
            }
        });
    },
};

// 2. Run the build
async function runBuild() {
    const ctx = await esbuild.context({
        entryPoints: ['src/index.js'],
        bundle: true,
        minify: true,
        // 🚀 SIMPLIFICATION: Output the engine directly into the build folder
        outfile: 'build/_ankifx.js',
        format: 'iife',
        plugins: [effectsRegistryPlugin, copyStaticFilesPlugin]
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