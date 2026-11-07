import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CHANGED: forward every /api request to Apache (XAMPP), so no CORS is needed
  server: {
    proxy: {
      "/api": "http://localhost",
    },
  },
});
