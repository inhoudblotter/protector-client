import { defineConfig } from "vite";
import { preact } from "@preact/preset-vite";
import path from "path";

export default defineConfig({
  build: {
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["./src/**/*.jsx"],
  },
  server: {
    hmr: false,
  },
  plugins: [preact()],
});
