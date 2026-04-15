import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), VueSetupExtend()],
  server: {
    // 核心配置：指定监听的地址为 127.0.0.1
    host: "127.0.0.1",
    // 可选：保留你原本的端口配置，默认是 5173
    port: 5173,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
