import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { UserModuleService } from '../services';
import { ResponseGeneratorService } from 'src/core/responses';
import { FindUserModuleByCodeParam, FindUserStatusQuery } from '../dto';
import { SuiteGuard } from 'src/core/guards';

@Controller('user-modules')
@UseGuards(SuiteGuard)
export class UserModuleController {
  constructor(
    private readonly userModuleService: UserModuleService,
    private readonly response: ResponseGeneratorService,
  ) {}

  @Get()
  async findAll() {
    const userModules = await this.userModuleService.findAll();

    return this.response.success(userModules);
  }

  @Get(':userModuleCode')
  async findOneByCode(
    @Param() { userModuleCode }: FindUserModuleByCodeParam,
    @Query() { isNotFound }: FindUserStatusQuery,
  ) {
    const userModule = await this.userModuleService.findOneByCode({
      userModuleCode,
      isNotFound,
    });

    return this.response.success(userModule);
  }
}
