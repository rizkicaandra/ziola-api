import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { ResponseGeneratorService } from 'src/core/responses';
import { FindApplicationByCodeDto } from '../dto';
import { AppErrorCode } from 'src/core/enums';

@Injectable()
export class ApplicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly response: ResponseGeneratorService,
  ) {}

  async findAll() {
    return await this.prisma.application.findMany();
  }

  async findOneByCode(applicationDto: FindApplicationByCodeDto) {
    const application = await this.prisma.application.findFirst({
      where: {
        code: {
          contains: applicationDto.applicationCode,
          mode: 'insensitive',
        },
      },
    });

    if (!application && applicationDto.isNotFound)
      throw this.response.notFound(AppErrorCode.APPLICATION_NOT_FOUND);

    return application;
  }
}
