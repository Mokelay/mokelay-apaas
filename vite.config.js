import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteExternalsPlugin } from 'vite-plugin-externals';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 如果想要在其他电脑上访问本机的服务，可以打开以下 host 字段
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api': {
        target: 'http://mocks.com',
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: path.resolve(__dirname, 'src') + '/' },
      { find: /^@dsl\//, replacement: path.resolve(__dirname, 'dsl') + '/' },
    ],
  },
  build: {
    outDir: './build',
    // sourcemap: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1024 * 5,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  plugins: [
    react(),
    // external 依赖包
    // viteExternalsPlugin(
    //   {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    //   },
    //   {
    //     disableInServe: true,
    //   },
    // ),
  ],
});
