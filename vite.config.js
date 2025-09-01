import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: [
      'z4kossco4gs0sowcc8ssscow.168.231.121.95.sslip.io',
      'marchehealthcare.org',
      'www.marchehealthcare.org'
    ]
  }
})
