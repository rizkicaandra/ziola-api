import { Global, Module } from '@nestjs/common';
import { ResponseGeneratorService } from './responses';
import { CommonUtils, ExceptionUtils, PaginationUtil } from './utils';
import { BcryptHelper, CommonHelper, CryptoHelper, JwtHelper } from './helpers';

@Global()
@Module({
  imports: [],
  providers: [
    ResponseGeneratorService,
    ExceptionUtils,
    PaginationUtil,
    CommonHelper,
    BcryptHelper,
    CryptoHelper,
    JwtHelper,
    CommonUtils,
  ],
  exports: [
    ResponseGeneratorService,
    ExceptionUtils,
    PaginationUtil,
    CommonHelper,
    BcryptHelper,
    CryptoHelper,
    JwtHelper,
    CommonUtils,
  ],
})
export class CoreModule {}
