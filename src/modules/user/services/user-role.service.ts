import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { ResponseGeneratorService } from 'src/core/responses';
import {
  CreateUserRoleDto,
  FindUserRoleByIdDto,
  FindUserRoleDto,
  FindUserRoleInternalDto,
  UpdateUserRoleDto,
} from '../dto';
import { ApplicationService } from './applications.service';
import { AppErrorCode } from 'src/core/enums';
import { Prisma } from '@prisma/client';
import { PaginationUtil } from 'src/core/utils';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseGeneratorService,
    private readonly applicationService: ApplicationService,
    private readonly paginationUtil: PaginationUtil,
  ) {}

  async create(createDto: CreateUserRoleDto) {
    await Promise.all([
      this.applicationService.findOneByCode({
        applicationCode: createDto.applicationCode,
        isNotFound: true,
      }),
      this.findOneInternal({
        select: {
          code: true,
          name: true,
        },
        where: {
          OR: [
            {
              code: {
                equals: createDto.userRoleCode,
                mode: 'insensitive',
              },
            },
            {
              name: {
                equals: createDto.name,
                mode: 'insensitive',
              },
            },
          ],
        },
        isExist: true,
      }),
    ]);

    const permissionCreateMany: Prisma.UserPermissionCreateManyInput[] = [];
    for (const permissionDto of createDto.userPermissions) {
      permissionCreateMany.push({
        userModuleCode: permissionDto.userModuleCode,
        userSubmoduleCode: permissionDto.userSubmoduleCode,
        action: Object.assign(permissionDto.action),
      });
    }

    const role = await this.prisma.userRole.create({
      data: {
        code: createDto.userRoleCode,
        name: createDto.name,
        applicationCode: createDto.applicationCode,
        userPermissions: {
          createMany: {
            data: permissionCreateMany,
          },
        },
      },
    });

    return role;
  }

  async findOneInternal(findOneDto: FindUserRoleInternalDto) {
    const role = await this.prisma.userRole.findFirst({
      where: findOneDto.where,
      select: findOneDto.select ?? { code: true, name: true },
    });

    // check not found condition
    if (!role && findOneDto.isNotFound)
      throw this.response.notFound(AppErrorCode.USER_ROLE_NOT_FOUND);

    // check not exists condition
    if (role && findOneDto.isExist)
      throw this.response.badRequest(
        `The role code:'${role.code}' or name:'${role.name}' is already exists.`,
      );

    return role;
  }

  async findAll(findAllDto: FindUserRoleDto) {
    let options: Prisma.UserRoleFindManyArgs = {
      where: {
        OR: [
          {
            code: {
              contains: findAllDto.search,
              mode: 'insensitive',
            },
          },
          {
            name: {
              contains: findAllDto.search,
              mode: 'insensitive',
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    };

    const optionsCount: Prisma.UserRoleCountArgs = {
      where: options.where,
    };

    options = this.paginationUtil.applyPagination(findAllDto, options);

    const [userRoles, total] = await Promise.all([
      await this.prisma.userRole.findMany(options),
      await this.prisma.userRole.count(optionsCount),
    ]);

    return {
      total,
      items: userRoles,
    };
  }

  async findOneById(findOneDto: FindUserRoleByIdDto) {
    const role = await this.prisma.userRole.findFirst({
      select: {
        code: true,
        name: true,
        applicationCode: true,
        userPermissions: {
          select: {
            id: true,
            userModuleCode: true,
            userSubmoduleCode: true,
            action: true,
          },
        },
      },
      where: {
        id: {
          equals: findOneDto.userRoleId,
        },
      },
    });

    if (!role && findOneDto.isNotFound)
      throw this.response.notFound(AppErrorCode.USER_ROLE_NOT_FOUND);

    return role;
  }

  async updateById(updateDto: UpdateUserRoleDto) {
    const [lastRole] = await Promise.all([
      this.findOneInternal({
        select: {
          code: true,
          name: true,
          userPermissions: true,
        },
        where: {
          id: {
            equals: updateDto.userRoleId,
          },
        },
      }),
      this.findOneInternal({
        select: {
          code: true,
          name: true,
        },
        where: {
          code: {
            equals: updateDto.userRoleCode,
            mode: 'insensitive',
          },
          name: {
            equals: updateDto.name,
            mode: 'insensitive',
          },
          id: {
            not: updateDto.userRoleId,
          },
        },
        isExist: true,
      }),
    ]);

    // setup permission data to insert, update, delete into db
    const permissionCreateMany: Prisma.UserPermissionCreateManyInput[] = [];
    const permissionUpdate: Prisma.UserPermissionUpdateArgs[] = [];
    const permissionDeleteMany: number[] = [];

    for (const permissionUpdateDto of updateDto.userPermissions) {
      const isPermissionExists = lastRole?.userPermissions.find(
        (permission) =>
          permission.id === permissionUpdateDto.userPermissionId ||
          permission.userSubmoduleCode ===
            permissionUpdateDto.userSubmoduleCode,
      );

      if (isPermissionExists) {
        permissionUpdate.push({
          data: {
            action: Object.assign(permissionUpdateDto.action),
          },
          where: {
            id: isPermissionExists.id,
          },
        });
      }

      if (!isPermissionExists) {
        permissionCreateMany.push({
          userModuleCode: permissionUpdateDto.userModuleCode,
          userSubmoduleCode: permissionUpdateDto.userSubmoduleCode,
          action: Object.assign(permissionUpdateDto.action),
        });
      }
    }

    for (const permissionRole of lastRole?.userPermissions ?? []) {
      const isPermissionExists = updateDto.userPermissions.find(
        (dto) =>
          dto.userPermissionId === permissionRole.id ||
          dto.userSubmoduleCode === permissionRole.userSubmoduleCode,
      );

      if (!isPermissionExists) permissionDeleteMany.push(permissionRole.id);
    }

    console.log('permissionCreateMany :>> ', permissionCreateMany);
    console.log('permissionDeleteMany :>> ', permissionDeleteMany);

    // processing data role into db
    await this.prisma.$transaction(async (tx) => {
      await tx.userRole.update({
        data: {
          code: updateDto.userRoleCode,
          name: updateDto.name,
          userPermissions: {
            createMany: {
              data: permissionCreateMany,
            },
            deleteMany: {
              id: {
                in: permissionDeleteMany,
              },
            },
          },
        },
        where: {
          id: updateDto.userRoleId,
        },
      });

      for (const permission of permissionUpdate) {
        await tx.userPermission.update(permission);
      }
    });

    const updatedRole = await this.findOneById({
      userRoleId: updateDto.userRoleId,
    });

    return updatedRole;
  }
}
