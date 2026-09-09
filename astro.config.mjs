import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const env = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), 'PUBLIC_');
const site = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || 'https://normalfood.pl';

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap({ filter: (page) => !page.endsWith('/404') })],
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
