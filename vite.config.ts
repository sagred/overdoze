import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import path from 'path';
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";


const manifestForPlugIn = {
  registerType:'prompt',
  includeAssests:['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest:{
    name:"React-vite-app",
    short_name:"react-vite-app",
    description:"I am a simple vite app",
    icons:[{
      src: '/android-chrome-192x192.png',
      sizes:'192x192',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src:'/android-chrome-512x512.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'favicon'
    },
    {
      src: '/apple-touch-icon.png',
      sizes:'180x180',
      type:'image/png',
      purpose:'apple touch icon',
    },
    {
      src: '/maskable_icon.png',
      sizes:'512x512',
      type:'image/png',
      purpose:'any maskable',
    }
  ],
  theme_color:'#000000',
  background_color:'#000000',
  display:"standalone",
  scope:'/',
  start_url:"/",
  orientation:'portrait'
  }
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [nodePolyfills(), react(), VitePWA(manifestForPlugIn)],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: [
        resolve(__dirname, "test/setup/setup.ts"),
        resolve(__dirname, "test/setup/resizeObserverMock.ts"),
      ],
    },
    base: mode === "production" ? "/vechain-dapp-kit/react/" : "/",
  };
});

