import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://liad-dev.com',
  output: "hybrid",
  adapter: cloudflare()
});