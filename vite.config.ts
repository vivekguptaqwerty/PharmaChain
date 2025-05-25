import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Add React plugin for better JSX/TSX handling
    tailwindcss(),
  ],
  build: {
    outDir: 'dist', // Explicitly set output directory (optional, as it's the default)
  },
});