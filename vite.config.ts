import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/role/regiter": {
        target: "http://43.138.198.247:8080/role/regiter",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/role\/regiter/, ""),
      },
      "/role/updateUserInfo": {
        target: "http://43.138.198.247:8080/role/updateUserInfo",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/role\/updateUserInfo/, ""),
      },
    },
  },
});
