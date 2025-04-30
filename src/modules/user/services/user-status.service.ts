import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { ResponseGeneratorService } from 'src/core/responses';
import { AppErrorCode } from 'src/core/enums';
import { FindUserStatusByCodeDto } from '../dto';

@Injectable()
export class UserStatusService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseGeneratorService,
  ) {}

  async findAll() {
    return this.prisma.userStatus.findMany();
  }

  async findOneByCode(statusDto: FindUserStatusByCodeDto) {
    const userStatus = await this.prisma.userStatus.findFirst({
      where: {
        code: {
          contains: statusDto.code,
          mode: 'insensitive',
        },
      },
    });

    if (!userStatus && statusDto.isNotFound)
      throw this.response.notFound(AppErrorCode.USER_STATUS_NOT_FOUND);

    return userStatus;
  }
}
