import { z } from "astro/zod"
import { defineCollection } from "astro:content"
import { notionLoader, notionPageSchema } from "notion-astro-loader"
import { transformedPropertySchema } from "notion-astro-loader/schemas"

const projects = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_DATABASE_ID
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
