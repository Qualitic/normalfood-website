import { defineConfig } from '@playwright/test';
const port = process.env['NORMALFOOD_PREVIEW_PORT'] || '4321';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  outputDir: '.artifacts/playwright',
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:${port}`, browserName: 'chromium', trace: 'retain-on-failure' },
  webServer: {
    command: `npm run preview -- --port ${port}`,
    // Keep Astro 7 attached to Playwright instead of auto-detaching in agent environments.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env['CI'],
  },
});
