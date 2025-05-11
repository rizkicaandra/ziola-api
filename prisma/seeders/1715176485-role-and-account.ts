import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
async function main() {
  await prisma.userRole.create({
    data: {
      code: 'RADM',
      name: 'ROOT ADMINISTRATOR',
      applicationCode: 'ZAS',
    },
  });

  await prisma.userAccount.create({
    data: {
      name: 'rizki candra',
      email: 'caca@gmail.com',
      phone: '081313432343',
      password: await bcrypt.hash('!q2w3e4R', 10),
      applicationCode: 'ZAS',
      userRoleId: 1,
      status: 'ACT',
      createdBy: 'super root admin',
      updatedBy: 'super root admin',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit();
  });
