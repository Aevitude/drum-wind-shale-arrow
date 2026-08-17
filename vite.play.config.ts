import path from "node:path";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  root: path.resolve("play"),
  publicDir: path.resolve("public"),
  plugins: [tailwindcss(), viteReact()],
  resolve: {
    tsconfigPaths: true,
    alias: { "@": path.resolve("src") },
  },
  build: {
    outDir: path.resolve("docs"),
    emptyOutDir: true,
  },
});
