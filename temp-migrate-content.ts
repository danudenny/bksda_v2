import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const announcements = await prisma.announcement.findMany({
    where: { href: { not: null } },
  });

  for (const announcement of announcements) {
    if (announcement.href) {
      await prisma.announcement.update({
        where: { id: announcement.id },
        data: { content: announcement.href },
      });
    }
  }

  console.log('Data migration complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
