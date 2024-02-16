# attt-prisma

## Commands

### Generate types and etc (Execute after changing models)

```sh
pnpm prisma generate
```

### Create migration

```sh
npx prisma migrate dev --name migration_file_name
```

### Reset Data

```sh
pnpm prisma migrate reset
```

### View DB data in browser

```sh
pnpm prisma studio
```

## DATABASE_URL

To prevent SSL/TTS errors, `sslaccept` option must be added.

```sh
DATABASE_URL='mysql://id:pass@aws.connect.psdb.cloud/attt?sslaccept=strict'
```
