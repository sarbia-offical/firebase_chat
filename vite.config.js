/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-05-30 18:01:43
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-06 11:15:44
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from "path";
import { resolve } from "path";
const pathSrc = path.resolve(__dirname, "./src");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  server: {
    host: '0.0.0.0'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                        @import "./src/styles/reset.scss";
                        @import "./src/styles/mixins.scss"; 
                        @import "./src/styles/function.scss";
                        @import "./src/styles/fragment.scss";`
      }
    }
  }
})
