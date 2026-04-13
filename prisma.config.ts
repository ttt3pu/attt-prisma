import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
})
