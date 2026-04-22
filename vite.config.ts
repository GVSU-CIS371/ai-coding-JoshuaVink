import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

const repoName = 'ai-coding-JoshuaVink';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? `/${repoName}/` : '/',
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}));
