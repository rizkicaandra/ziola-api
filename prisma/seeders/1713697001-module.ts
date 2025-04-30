import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const modules: Prisma.UserModuleCreateManyInput[] = [
    {
      code: 'UM',
      nameEn: 'User Management',
      nameId: 'Manajemen Pengguna',
      description: 'Modules handle operation related to user',
    },
  ];

  const submodules: Prisma.UserSubmoduleCreateManyInput[] = [
    {
      code: 'USSA',
      nameEn: 'User Status',
      nameId: 'Status Pengguna',
      description: 'Store status data for user',
      userModuleCode: 'UM',
    },
    {
      code: 'SUDU',
      nameEn: 'Module',
      nameId: 'Modul',
      description:
        'Store module and submodule data for user permission or role',
      userModuleCode: 'UM',
    },
    {
      code: 'ROLE',
      nameEn: 'Role',
      nameId: 'Peran',
      description: 'Store role data for user',
      userModuleCode: 'UM',
    },
    {
      code: 'USER',
      nameEn: 'User',
      nameId: 'Pengguna',
      description:
        'Store user data that cointains user-role, user-module-access, and detail biodata',
      userModuleCode: 'UM',
    },
  ];

  await prisma.userModule.createMany({
    data: modules,
  });
  await prisma.userSubmodule.createMany({
    data: submodules,
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
