import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        theme_color: "#f28705",
        background_color: "#531aa5",
        display: "standalone",
        scope: "/",
        start_url: "/",
        short_name: "Hamster Clicker",
        description: "Hamster Clicker Game",
        name: "Hamster Clicker",
        icons: [
          {
            src: "hamster.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "hamster.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "hamster.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "hamster.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Game",
            description: "Game Page",
            url: "/",
            icons: [
              {
                src: "hamster.png",
                sizes: "512x512",
              },
            ],
          },
          {
            name: "About",
            description: "About Page",
            url: "/about",
            icons: [
              {
                src: "hamster.png",
                sizes: "512x512",
              },
            ],
          },
          {
            name: "Settings",
            description: "Settings Page",
            url: "/settings",
            icons: [
              {
                src: "hamster.png",
                sizes: "512x512",
              },
            ],
          },
        ],
      },
    }),
  ],
});
