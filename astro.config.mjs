/* imports */
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://lockey.lokkeestudios.com/",
  integrations: [
    tailwind({
      config: { path: "./tailwind.config.js" },
    }),
  ],
});
