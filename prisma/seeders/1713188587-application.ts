import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const data: Prisma.ApplicationCreateManyInput[] = [
    {
      code: 'ZAP',
      nameId: 'ZIOLA PORTAL',
      nameEn: 'ZIOLA PORTAL',
    },
    {
      code: 'ZAS',
      nameId: 'ZIOLA ADMIN SUITE',
      nameEn: 'ZIOLA ADMIN SUITE',
    },
  ];

  await prisma.application.createMany({
    data,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log('error seeders application :>> ', error);
    await prisma.$disconnect();
    process.exit(1);
  });
