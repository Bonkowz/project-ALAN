import { defineConfig, loadEnv } from 'vite'; // Import loadEnv
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => { // Destructure 'mode' from the function argument
  // Load environment variables based on the current mode (e.g., 'development', 'production')
  // process.cwd() gets the current working directory where Vite looks for .env files.
  // 'VITE_' specifies that only variables prefixed with VITE_ should be loaded.
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      proxy: {
        '/auth': {
          // Use the 'env' object to access your environment variable
          target: env.VITE_REACT_APP_BACKEND_BASEURL,
          changeOrigin: true,
          // You might need a rewrite rule depending on your backend's API structure.
          // For example, if your backend's auth endpoint is just '/auth'
          // and not '/api/auth', you might not need a rewrite.
          // If your backend's auth endpoint is '/api/auth', and you proxy '/auth'
          // then you might want to rewrite it:
          // rewrite: (path) => path.replace(/^\/auth/, '/api/auth'),
        },
      },
    },
  };
});