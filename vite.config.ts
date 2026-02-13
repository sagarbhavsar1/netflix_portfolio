import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    envPrefix: 'REACT_APP_', // keeps existing REACT_APP_ env vars working
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'build', // match CRA's output dir for Vercel compatibility
        sourcemap: true,
    },
});
