// @ts-check
import { defineConfig, envField } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import icon from "astro-icon"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import siteConfig from "./src/site.config"

import sentry from "@sentry/astro"

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      NOTION_TOKEN: envField.string({
        context: "server",
        access: "secret"
      }),
      NOTION_DATABASE_ID: envField.string({
        context: "server",
        access: "secret"
      }),
      SENTRY_AUTH_TOKEN: envField.string({
        context: "server",
        access: "secret"
      })
    }
  },
  integrations: [
    react(),
    sitemap(),
    icon({
      iconDir: "src/assets/icons"
    }),
    sentry({
      sourceMapsUploadOptions: {
        project: "johnsoderholm",
        authToken: process.env.SENTRY_AUTH_TOKEN!,
        telemetry: false
      }
    })
  ]
})
