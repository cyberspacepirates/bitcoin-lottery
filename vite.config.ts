import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "./index.html",
        education: "./education.html",
      },
    },
  },
  plugins: [
    wasm(),
    topLevelAwait(),
    nodePolyfills({ globals: { Buffer: true } }),
    react(),
  ],
});
