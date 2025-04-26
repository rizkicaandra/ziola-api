import { Global, Module } from '@nestjs/common';
import { ResponseGeneratorService } from './responses';
import { ExceptionUtils } from './utils';

@Global()
@Module({
  providers: [ResponseGeneratorService, ExceptionUtils],
  exports: [ResponseGeneratorService, ExceptionUtils],
})
export class CoreModule {}
