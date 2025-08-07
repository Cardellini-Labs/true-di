import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    'true-di': 'src/index.ts',
  },
  globalName: 'TrueDI',
  format: ['iife'],
  outExtension() {
    return {
      js: '.min.js',
    };
  },
  dts: false,
  minify: true,
  splitting: false,
  sourcemap: true,
  outDir: 'dist/build',
});
