import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/832401306_calculator_frontend/' : '/',
  plugins: [react()],
}))
