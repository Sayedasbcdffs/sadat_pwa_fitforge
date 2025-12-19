import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { quasar, transformAssetUrls } from "@quasar/vite-plugin";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      "/test": "http://localhost:3000/",
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: "/src/quasar-variables.sass",
    }),

    VitePWA({
      registerType: "autoUpdate",
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      manifest: {
        name: "FitForge Gym",
        short_name: "FitForge",
        description: "Mobile-ready gym companion PWA mit Workbox.",
        start_url: "/",
        display: "standalone",
        theme_color: "#0f1629",
        background_color: "#f5f7fb",
        icons: [
          {
            src: "/icon/sadat_logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 16x16",
            type: "image/x-icon",
          },
          {
            src: "/icon/fitforge-logo.svg",
            sizes: "180x60",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
        navigateFallback: "/",
        suppressWarnings: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
