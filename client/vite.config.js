import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
    {
      name: 'vite-plugin-json',
      transform(src, id) {
        if (id.endsWith('.json')) {
          return {
            code: `export default ${src}`,
            map: null
          };
        }
      }
    },
  ],
})
