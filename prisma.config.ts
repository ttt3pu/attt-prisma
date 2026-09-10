import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: './schema.prisma',
  migrations: {
    seed: 'tsx seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
    shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
  },
})
