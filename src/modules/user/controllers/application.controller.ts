import { Controller, Get, Param, Query } from '@nestjs/common';
import { ResponseGeneratorService } from 'src/core/responses';
import { ApplicationService } from '../services/applications.service';
import { FindApplicationByCodeParam, FindApplicationQuery } from '../dto';

@Controller('applications')
export class ApplicationController {
  constructor(
    private readonly applicationService: ApplicationService,
    private readonly response: ResponseGeneratorService,
  ) {}

  @Get()
  async findAll() {
    const applications = await this.applicationService.findAll();

    return this.response.success(applications);
  }

  @Get(':code')
  async findOneByCode(
    @Query() { isNotFound }: FindApplicationQuery,
    @Param() { applicationCode }: FindApplicationByCodeParam,
  ) {
    const application = await this.applicationService.findOneByCode({
      applicationCode,
      isNotFound,
    });

    return this.response.success(application);
  }
}
