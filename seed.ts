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
  const slugs = faker.helpers.uniqueArray(enFaker.lorem.slug, 5);

  for (const slug of slugs) {
    const date = faker.date.anytime();

    await prisma.blogPost.create({
      data: {
        title: faker.lorem.words(),
        slug,
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
