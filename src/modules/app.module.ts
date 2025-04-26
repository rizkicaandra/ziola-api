import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user';
import { CoreModule } from 'src/core/core.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/core/filters';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    UserModule,
    CoreModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
