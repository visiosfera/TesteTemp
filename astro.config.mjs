import node from "@astrojs/node";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import pwa from "@vite-pwa/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    server: {
      fs: {
        allow: ["../.."],
      },
    },
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    pwa({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      includeAssets: ["pwa/**", "favicon.svg", "robots.txt"],
      devOptions: {
        enabled: true,
      },
      manifest: {
        id: "/",
        name: "Astro",
        short_name: "Astro",
        start_url: "/",
        display: "standalone",
        display_override: ["window-controls-overlay", "standalone"],
        background_color: "#2FB999",
        theme_color: "#2FB999",
        description: "Astro PWA",
        icons: [
          {
            src: "./pwa/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./pwa/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "./pwa/screenshots/mobile/1.jpg",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "./pwa/screenshots/mobile/2.jpg",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "./pwa/screenshots/mobile/3.jpg",
            sizes: "1080x1920",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "./pwa/screenshots/pc/1.jpg",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "./pwa/screenshots/pc/2.jpg",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "./pwa/screenshots/pc/3.jpg",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "./pwa/screenshots/pc/4.jpg",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
          {
            src: "./pwa/screenshots/pc/5.jpg",
            sizes: "1366x768",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
});
