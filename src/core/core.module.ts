import { Global, Module } from '@nestjs/common';
import { ResponseGeneratorService } from './responses';
import { ExceptionUtils, PaginationUtil } from './utils';
import { BcryptHelper, CommonHelper } from './helpers';

@Global()
@Module({
  providers: [
    ResponseGeneratorService,
    ExceptionUtils,
    PaginationUtil,
    CommonHelper,
    BcryptHelper,
  ],
  exports: [
    ResponseGeneratorService,
    ExceptionUtils,
    PaginationUtil,
    CommonHelper,
    BcryptHelper,
  ],
})
export class CoreModule {}
