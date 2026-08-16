import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/",

  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    sourcemap: true,
  },

  ssr: {
    noExternal: [
      "framer-motion",
      "react-hot-toast",
      "@vercel/analytics",
    ],
  },
});