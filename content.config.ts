import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const seoSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional()
  })
  .optional()

const articleSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  body: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'data',
      source: 'blog/**/*.{yml,yaml}',
      schema: z.object({
        seo: seoSchema,
        content: articleSchema
      })
    }),
  }
})
