import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Generate a single self-contained HTML file; skip per-chunk sourcemaps in
    // production to keep the output smaller. Production errors still carry the
    // bundled code location.
    sourcemap: false,
    // Modern engines support top-level await, native ESM and class fields —
    // avoids transpiling features that all evergreen browsers already ship.
    target: "es2020",
    // Keep minification aggressive; esbuild handles it during the single-file
    // inline build. Bumping the warning limit silences false positives on the
    // large inlined hero asset.
    chunkSizeWarningLimit: 1500,
    cssMinify: "esbuild",
    rollupOptions: {
      output: {
        // Strip the inline dynamic-import polyfill noise for modern targets.
        inlineDynamicImports: true,
      },
    },
  },
});
