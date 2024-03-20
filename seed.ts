import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { ja, en, Faker } from '@faker-js/faker';
import { faker as enFaker } from '@faker-js/faker/locale/en';
import { achievementPosts } from './seed_constants/achievement-posts';

export const faker = new Faker({
  locale: [ja, en],
});

faker.seed(1);
enFaker.seed(1);

async function main() {
  for (let id = 1; id <= 5; id++) {
    const date = faker.date.anytime();

    const data = {
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
    };

    await prisma.blogPost.upsert({
      where: {
        id,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
    });
  }

  for (const [i, post] of Object.entries(achievementPosts)) {
    const id = Number(i) + 1;

    const data = {
      ...post,
      sort_order: id,
    };

    await prisma.achievementPost.upsert({
      where: {
        id,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
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
