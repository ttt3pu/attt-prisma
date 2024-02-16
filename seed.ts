import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { ja, en, Faker } from '@faker-js/faker';
import { faker as enFaker } from '@faker-js/faker/locale/en';

export const faker = new Faker({
  locale: [ja, en],
});

faker.seed(1);
enFaker.seed(1);

async function main() {
  for (let id = 1; id <= 5; id++) {
    const date = faker.date.anytime();

    await prisma.blogPost.upsert({
      where: {
        id,
      },
      create: {
        title: faker.lorem.words(),
        content: `
## h2
**太字**

### h3

記事コンテンツ[文中リンク](https://google.com)

<https://example.com>

- foo
- bar

1. foo
1. bar
        `,
        created_at: date,
        updated_at: date,
        published_at: date,
      },
      update: {},
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
