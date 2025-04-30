import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserStatusService } from '../services';
import { ResponseGeneratorService } from 'src/core/responses';
import { FindUserStatusByCodeParam, FindUserStatusQuery } from '../dto';

@Controller('user-statuses')
export class UserStatusController {
  constructor(
    private readonly userStatusService: UserStatusService,
    private readonly response: ResponseGeneratorService,
  ) {}

  @Get()
  async findAll() {
    const statues = await this.userStatusService.findAll();

    return this.response.success(statues);
  }

  @Get(':code')
  async findOneByCode(
    @Param() { code }: FindUserStatusByCodeParam,
    @Query() { isNotFound }: FindUserStatusQuery,
  ) {
    const status = await this.userStatusService.findOneByCode({
      code,
      isNotFound,
    });

    return this.response.success(status);
  }
}
