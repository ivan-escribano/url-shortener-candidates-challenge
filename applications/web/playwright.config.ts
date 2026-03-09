import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // Actualizado: serial para evitar interferencias entre tests que comparten DB
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
