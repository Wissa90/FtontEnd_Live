// This file is used to configure Vite, a build tool for modern web projects.
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
});
