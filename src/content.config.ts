import { z } from "astro/zod"
import { defineCollection } from "astro:content"
import { NOTION_DATABASE_ID, NOTION_TOKEN } from "astro:env/server"
import { notionLoader, notionPageSchema } from "notion-astro-loader"
import { transformedPropertySchema } from "notion-astro-loader/schemas"

const projects = defineCollection({
  loader: notionLoader({
    auth: NOTION_TOKEN,
    database_id: NOTION_DATABASE_ID
  }),
  schema: notionPageSchema({
    properties: z.object({
      Title: transformedPropertySchema.title,
      Description: transformedPropertySchema.rich_text,
      URL: transformedPropertySchema.url,
      Date: transformedPropertySchema.date,
      Created: transformedPropertySchema.created_time
    })
  })
})

export const collections = { projects }
