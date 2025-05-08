import { Global, Module } from '@nestjs/common';
import { ResponseGeneratorService } from './responses';
import { ExceptionUtils, PaginationUtil } from './utils';

@Global()
@Module({
  providers: [ResponseGeneratorService, ExceptionUtils, PaginationUtil],
  exports: [ResponseGeneratorService, ExceptionUtils, PaginationUtil],
})
export class CoreModule {}
