import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import path from 'node:path';
import { glob } from 'glob';
import liveReload from 'vite-plugin-live-reload';
import copy from 'rollup-plugin-copy';
import postcssUrl from 'postcss-url';

const htmlEntries = {};
glob.sync('./**/*.html', { ignore: ['dist/**', 'node_modules/**'] }).forEach((file) => {
  const relativePath = path.relative(__dirname, file).replace(/\\/g, '/');
  htmlEntries[relativePath] = path.resolve(file);
});
console.log('htmlEntries:', htmlEntries);

export default defineConfig({
  base: './',
  plugins: [
    liveReload(['./layout/**/*.ejs', './pages/**/*.ejs', './*.html']),
    ViteEjsPlugin(),
    copy({
      targets: [
        { src: 'Plugin/bootstrap/**/*', dest: 'dist/Plugin/bootstrap' },
        { src: 'Plugin/quill/**/*', dest: 'dist/Plugin/quill' },
        { src: 'Plugin/datatables/**/*', dest: 'dist/Plugin/datatables' },
      ],
    }),
  ],
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [postcssUrl({ url: 'rebase' })],
    },
  },
  server: {
    open: './worklist.html',
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      Plugin: path.resolve(__dirname, 'Plugin'),
    },
  },
  optimizeDeps: {
    entries: [], // 關閉依賴預建掃描
  },
  build: {
    minify: false,
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 0,
    outDir: 'dist',
    rollupOptions: {
      input: htmlEntries,
      output: {
        entryFileNames: 'assets/js/[name].js',
        // 停止動態 chunk 分離
        manualChunks: undefined,
        chunkFileNames: undefined,
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    sourcemap: false,
  },
});
