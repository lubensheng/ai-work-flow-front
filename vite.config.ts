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
      "/llmConfig/": {
        target: "http://43.138.198.247:8080/llmConfig/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/llmConfig/, ""),
      },
      "/flow/": {
        target: "http://43.138.198.247:8080/flow/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/flow/, ""),
      },
      "/agent/": {
        target: "http://43.138.198.247:3000/agent/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/agent/, ""),
      },
      "/flowExecute/": {
        target: "http://localhost:8080/flowExecute/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/flowExecute/, ""),
      },
    },
  },
});
