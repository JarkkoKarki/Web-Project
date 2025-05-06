import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/Web-Project-Frontend/', // Add this line for GitHub Pages deployment
  plugins: [react(), tailwindcss()],
});
