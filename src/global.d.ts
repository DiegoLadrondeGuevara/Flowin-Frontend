// global.d.ts
declare module 'sockjs-client' {
  export default SockJS;
}

// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeGlobals from 'vite-plugin-node-globals';

export default defineConfig({
  plugins: [
    react(),
    nodeGlobals(), // <--- importante
  ],
  define: {
    global: 'globalThis', // <- solución clave para el error
  },
});
