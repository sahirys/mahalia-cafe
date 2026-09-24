import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite. Vercel la detecta automáticamente.
export default defineConfig({
  plugins: [react()],
});
