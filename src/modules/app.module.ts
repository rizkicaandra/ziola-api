import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user';
import { CoreModule } from 'src/core';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/core/filters';
import { MailerModule } from './mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    UserModule,
    CoreModule,
    MailerModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
