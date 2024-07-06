
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import virtual from '@rollup/plugin-virtual';

export default defineConfig({
  plugins: [
    react(),
    virtual({
      'bootstrap/dist/css/bootstrap.min.css': `
        @import url('/path/to/bootstrap/dist/css/bootstrap.min.css');
      `
    })
  ],
  server: {
    port: 3000
  }
});
