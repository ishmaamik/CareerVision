import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(), // Add this plugin
    tailwindcss(),
  ],
  
  optimizeDeps: {
    // Prevent Vite from trying to pre-bundle Quill (causes issues)
    exclude: ['quill'],
    include: ['quill-delta', 'eventemitter3'],
  },
  
  
})