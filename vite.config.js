import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig(() => {
  return {
    build: {
      outDir: "build",
      commonjsOptions: {
        esmExternals: true,
        transformMixedEsModules: true,
      },
      rollupOptions: {
        external: (id) => {
          // Don't bundle WASM files, let them be served as static assets
          return id.includes('.wasm');
        }
      }
    },
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      exclude: ["@zama-fhe/relayer-sdk"],
      include: ["ethers"],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    resolve: {
      dedupe: ['ethers'],
      alias: {
        'ethers': 'ethers'
      }
    },
    server: {
      headers: {
        "Cross-Origin-Embedder-Policy": "require-corp",
        "Cross-Origin-Opener-Policy": "same-origin",
      },
      fs: {
        allow: [".."],
      },
    },
    assetsInclude: ['**/*.wasm'],
    plugins: [react(), eslint()],
  };
});
