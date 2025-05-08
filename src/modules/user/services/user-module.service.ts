import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { AppErrorCode } from 'src/core/enums';
import { ResponseGeneratorService } from 'src/core/responses';
import { FindUserModuleByCodeDto } from '../dto';

@Injectable()
export class UserModuleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseGeneratorService,
  ) {}

  async findAll() {
    return this.prisma.userModule.findMany({
      select: {
        code: true,
        nameId: true,
        nameEn: true,
        description: true,
        userSubmodules: {
          select: {
            code: true,
            nameId: true,
            nameEn: true,
            description: true,
          },
        },
      },
    });
  }

  async findOneByCode({ userModuleCode, isNotFound }: FindUserModuleByCodeDto) {
    const userModule = await this.prisma.userModule.findFirst({
      select: {
        code: true,
        nameId: true,
        nameEn: true,
        description: true,
        userSubmodules: {
          select: {
            code: true,
            nameId: true,
            nameEn: true,
            description: true,
          },
        },
      },
      where: {
        code: userModuleCode,
      },
    });

    if (!userModule && isNotFound)
      throw this.response.notFound(AppErrorCode.USER_MODULE_NOT_FOUND);

    return userModule;
  }
}
