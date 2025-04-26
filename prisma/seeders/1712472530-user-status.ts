import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const data: Prisma.UserStatusCreateManyInput[] = [
    {
      code: 'ACT',
      nameEn: 'ACTIVE',
      nameId: 'AKTIF',
    },
    {
      code: 'ICT',
      nameEn: 'INACTIVE',
      nameId: 'NON-AKTIF',
    },
    {
      code: 'SUS',
      nameEn: 'SUSPENDED',
      nameId: 'DITANGGUHKAN',
    },
    {
      code: 'DEL',
      nameEn: 'DELETED',
      nameId: 'DIHAPUS',
    },
    {
      code: 'BLK',
      nameEn: 'BLOCKED',
      nameId: 'DIBLOKIR',
    },
  ];

  await prisma.userStatus.createMany({
    data,
  });
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
