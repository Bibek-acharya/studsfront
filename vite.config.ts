import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    server: {
      port: 3000,
      host: "0.0.0.0",
      cors: true,
      middlewareMode: false,
      proxy: {
        "/api": {
          target: env.VITE_BACKEND_URL || "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
        "/uploads": {
          target: env.VITE_BACKEND_URL || "http://localhost:8080",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react") || id.includes("scheduler")) {
                return "vendor-react";
              }
              return "vendor";
            }

            if (id.includes("/components/Education/")) {
              return "education";
            }
            if (id.includes("/components/Jobs/")) {
              return "jobs";
            }
            if (id.includes("/components/Resume/")) {
              return "resume";
            }
            if (id.includes("/components/News/") || id.includes("/components/Blog/") || id.includes("/components/Events/")) {
              return "content";
            }
            if (id.includes("/components/Partner/") || id.includes("/components/Advertise/") || id.includes("/components/Services/")) {
              return "partner-services";
            }
            if (id.includes("/components/Auth/") || id.includes("/components/Onboarding/") || id.includes("/services/AuthContext")) {
              return "auth-onboarding";
            }
            if (id.includes("/components/Rewards/")) {
              return "rewards";
            }

            return undefined;
          },
        },
      },
    },
  };
});
