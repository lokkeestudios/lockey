import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lockey.lokkeestudios.com/',
  integrations: [
    react(),
    tailwind({
      config: { path: './tailwind.config.js' },
    }),
  ],
});
