import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const data: Prisma.ApplicationCreateManyInput[] = [
    {
      code: 'RVP',
      nameId: 'ROCKET VOUCHER PORTAL',
      nameEn: 'ROCKET VOUCHER PORTAL',
    },
    {
      code: 'RVA',
      nameId: 'ROCKET VOUCHER ADMIN SUITE',
      nameEn: 'ROCKET VOUCHER ADMIN SUITE',
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
