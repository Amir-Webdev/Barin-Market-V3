import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          // Default meta tags (can be overridden per route)
          title: "بارین مارکت  ",
          description: "به فروشگاه بارین مارکت خوش آمدید",
          keywords: "ecommerce, barin, بارین,فروشگاه",
        },
      },
    }),
  ],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
