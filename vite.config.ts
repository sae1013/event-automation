import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars'

// https://vitejs.dev/config/
export default defineConfig({
  server: {

  },
  plugins: [react()],

})

