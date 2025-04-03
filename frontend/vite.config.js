import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  //base: '/website_382e5be3/',
  plugins: [react()],
})
