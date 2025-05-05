import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path, { resolve } from "path";

export default defineConfig(() => {
  return {
    base: "",
    plugins: [tsconfigPaths()],
    server: {
      host: "0.0.0.0",
      port: 3000,
      open: process.env.BROWSER_OPEN !== "false" ? "/" : undefined,
    },
    clearScreen: false,
    build: {
      assetsDir: ".",
      rollupOptions: {
        output: {
          dir: "build",
          entryFileNames: "[name].js",
        },
      },
    },
    resolve: {
      alias: {
        "@public": path.resolve(__dirname, "public/assets"),
      },
    },
  };
});
