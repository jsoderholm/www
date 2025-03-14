// @ts-check
import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import siteConfig from "./src/config/site.config"

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap(),
    icon({
      iconDir: "src/assets/icons"
    })
  ]
})
