const esbuild = require("./node_modules/esbuild/lib/main.js");

const { watch } = require('chokidar');

let mode = process.env.NODE_ENV || 'development';

function prodBuild() {
    esbuild.build({
        entryPoints: ['./src/app.ts'],
        bundle: true,
        sourcemap : false,
        target : "ES2015",
        minify : true,
        outfile: './dist/app.js',
        tsconfig: './tsconfig.json'
    })
        .then(() => {
            console.log("Built!")
            process.exit(0)
        })
        .catch(() => {
            console.log('Fail during build.')
            process.exit(1)
        });
}

function devBuild() {
    esbuild.build({
        entryPoints: ['./src/app.ts'],
        bundle: true,
        sourcemap : true,
        target : "ES2015",
        minify : false,
        outfile: './dist/app.js',
        tsconfig: './tsconfig.json'
    })
        .then(() => console.log("Built!"))
        .catch(() => {
            console.log('Fail during build.')
            process.exit(1)
        });
}

if (mode === 'development') {
    console.log('Development mode');
    devBuild();
} else {
    console.log('Production mode');
    prodBuild();
}

watch('./src/**/*.ts', {})
    .on('change', (path) => {
        if(mode === 'development') {
            devBuild();
        } else {
            prodBuild();
        }
    });